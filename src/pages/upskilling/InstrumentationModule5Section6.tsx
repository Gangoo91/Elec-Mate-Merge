/**
 * Module 5 · Section 6 — Examples: HVAC, pressure systems and motor speed control
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar. Closes Module 5.
 *
 * 🔴 THE FRAMING. A closing section that merely restates the module is wasted.
 * This one puts the whole module to work on three loops an electrician will
 * actually meet, and the point is that THE SAME SMALL SET OF QUESTIONS
 * produces different answers on each:
 *
 *   - what type of process is it?      (5.1)
 *   - what direction of action?        (5.2)
 *   - which control terms does it need? (5.3)
 *   - what will it look like when wrong? (5.4)
 *   - what does good mean here?         (5.5)
 *
 * The three examples are chosen to be genuinely different rather than three
 * versions of the same thing:
 *   HVAC        — self-regulating, slow, heavily lagged, clean signal → PI(D)
 *   PRESSURE    — fast, often noisy, sometimes integrating (gas in a vessel)
 *   MOTOR SPEED — near-instant response, no lag, and the case where the "loop"
 *                 is often already closed INSIDE the drive
 *
 * 🔴 The motor speed example carries the most useful surprise for this
 * audience: a VSD running in closed-loop speed control has its own internal
 * loop, so an outer process loop cascades onto it — and cascade only works if
 * the inner loop is substantially faster than the outer one.
 *
 * Sources: this section is applied synthesis of Module 5 §§1–5 and their
 * sources rather than new source material. Cascade structure and the
 * inner/outer speed requirement follow from Kuphaldt §29.1 and the process
 * dynamics of §30.1; nothing here asserts a figure that is not derived in an
 * earlier section of this module.
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
  'Examples: HVAC, pressure systems and motor speed control | Instrumentation Module 5.6 | Elec-Mate';
const DESCRIPTION =
  'The whole module applied to three loops an electrician actually meets — a heavily lagged HVAC loop, a fast and often noisy pressure loop, and a motor speed loop where the control is already closed inside the drive.';

const outcomes = [
  'Apply the same five questions to any unfamiliar control loop',
  'Explain why a heavily lagged HVAC loop tolerates derivative action',
  'Say why a fast pressure loop usually should not have derivative',
  'Distinguish a gas pressure loop from a liquid pressure loop in control terms',
  '🔴 Explain what a drive’s internal speed loop is and why an outer loop cascades onto it',
  '🔴 State the requirement that makes a cascade arrangement work',
  'Recognise when a control problem belongs to the drive rather than to the process loop',
  'Choose a sensible starting point for an unfamiliar loop and justify it',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A room temperature loop responds over tens of minutes with no measurable dead time and a clean signal. What does that suggest about derivative action?',
    options: [
      'Derivative is a reasonable candidate — heavily lagged, clean measurements are where it works best',
      'Derivative is essential on all HVAC loops',
      'Derivative will cause the loop to oscillate',
      'Derivative should never be used on temperature',
    ],
    correctIndex: 0,
    explanation:
      'Derivative works well on processes dominated by large lag times, and its main disadvantage — noise amplification — does not apply to a clean, slowly changing signal. Those are precisely the conditions a well-installed room temperature measurement provides.',
  },
  {
    id: 2,
    question: 'Why is a room temperature loop a self-regulating process?',
    options: [
      'Because the thermostat switches it off',
      'Because heat losses rise as the room warms, so it settles at a new steady temperature for any fixed heat input',
      'Because the controller has integral action',
      'Because the room is insulated',
    ],
    correctIndex: 1,
    explanation:
      'For a fixed heat input the room warms until losses to outside match that input, then stops. Settling naturally at a new value for a fixed output is the definition of a self-regulating process — and it means the loop requires integral action to remove the offset that proportional alone would leave.',
  },
  {
    id: 3,
    question:
      'A liquid pressure loop on a pump discharge responds almost instantly and the measurement is visibly noisy. Which terms are appropriate?',
    options: [
      'Proportional only',
      'Full PID, to control it tightly',
      'Proportional and integral, with no derivative — the noise would be amplified',
      'Derivative only',
    ],
    correctIndex: 2,
    explanation:
      'Fast plus noisy is the worst combination for derivative, which amplifies noise and works best on slow lagged processes. PI is the standard answer, and integral has the useful property of largely ignoring noise because it averages over time.',
  },
  {
    id: 4,
    question:
      'Gas pressure in a closed vessel with a fixed inlet and a throttled outlet behaves how, in control terms?',
    options: [
      'Runaway — it accelerates away',
      'It has no consistent behaviour',
      'Self-regulating — it settles at a new pressure',
      'Integrating — any imbalance between inflow and outflow makes the pressure ramp',
    ],
    correctIndex: 3,
    explanation:
      'It is a mass balance in a fixed volume, exactly like level in a tank. If more gas goes in than comes out the pressure ramps and keeps ramping. That makes it an integrating process, so it wants strong proportional action and little integral — the opposite of what a liquid pressure loop usually wants.',
  },
  {
    id: 5,
    question:
      '🔴 A variable speed drive is running in closed-loop speed control with encoder feedback. A process controller sends it a speed setpoint. What arrangement is this?',
    options: [
      'Cascade control — the process controller’s output is the setpoint of the drive’s internal speed loop',
      'Open-loop control',
      'Split-range control',
      'Feedforward control',
    ],
    correctIndex: 0,
    explanation:
      'One controller’s output becoming another controller’s setpoint is the definition of cascade. The drive closes the fast inner loop on speed; the process controller closes the slower outer loop on whatever the process actually cares about, such as flow, level or pressure.',
  },
  {
    id: 6,
    question: '🔴 What makes a cascade arrangement work?',
    options: [
      'The two controllers must have identical tuning',
      'The inner loop must be substantially faster than the outer loop',
      'The outer loop must be faster than the inner one',
      'Both loops must control the same variable',
    ],
    correctIndex: 1,
    explanation:
      'The outer loop assumes the inner one delivers what it asks for essentially immediately. If the inner loop is comparable in speed, the two interact and fight each other, producing an oscillation neither loop shows a fault in on its own. A rule of several times faster is the usual expectation.',
  },
  {
    id: 7,
    question:
      'A flow loop controlling a pump via a VSD hunts. The drive is in closed-loop speed control. Where should you look first?',
    options: [
      'The pump’s mechanical condition',
      'The flow controller’s tuning',
      'Whether the drive’s internal speed loop is fast enough and correctly tuned, since the outer loop depends on it',
      'The flow transmitter’s calibration',
    ],
    correctIndex: 2,
    explanation:
      'A cascade fails from the inside out. If the inner speed loop is sluggish or itself oscillating, the outer flow loop cannot behave however it is tuned. Tuning the outer loop first is the common mistake, and it wastes time while the actual fault sits one level down.',
  },
  {
    id: 8,
    question: 'What is the common thread between all three examples in this section?',
    options: [
      'They all require derivative action',
      'They are all integrating processes',
      'They all use the same tuning constants',
      'The same small set of questions — process type, direction of action, terms needed, and what good means — produces different answers on each',
    ],
    correctIndex: 3,
    explanation:
      'That is the point of working three genuinely different loops. The method transfers even though none of the answers do, which is what makes it useful on the next loop you meet rather than only on these three.',
  },
];

const InstrumentationModule5Section6 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 6"
        title="Worked examples"
        backTo="/electrician/upskilling/instrumentation-module-5"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Three loops you will actually meet. The same five questions on each — and three different
          sets of answers.
        </p>

        <TLDR
          points={[
            'Five questions handle any unfamiliar loop: what type of process, which direction of action, which terms, what it looks like when wrong, and what good means here.',
            'Liquid pressure on a pump discharge: fast, often noisy, and self-regulating. PI, and no derivative.',
            'So “pressure control” is not one problem. The fluid decides which one you have.',
            '🔴 Motor speed: a drive in closed-loop speed control has already closed a fast loop inside itself.',
            '🔴 Cascade works only if the inner loop is substantially faster than the outer one.',
            'The answers differ on all three. The method does not, which is what makes it worth having.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>The five questions</ContentEyebrow>

        <ConceptBlock
          title="What to ask about any loop you have not met before"
          plainEnglish="Five questions, answered from the plant rather than the control system, and you know most of what you need."
          onSite="Works on a loop you have never seen, in a process you do not understand, in about five minutes."
        >
          <p>
            Module 5 has produced a small set of questions that between them characterise a control
            loop. This section runs them on three quite different loops, and the useful observation
            is that <strong>the questions are the same every time and the answers never are</strong>
            .
          </p>
          <ol>
            <li>
              <strong>What type of process is it?</strong> Self-regulating, integrating or runaway
              &mdash; which tells you what it does unattended and which terms it needs. (Section 1)
            </li>
            <li>
              <strong>What direction of action does it need?</strong> Run the thought experiment
              from the plant. (Section 2)
            </li>
            <li>
              <strong>Which terms does it want?</strong> Follow from the process type, the lag, the
              dead time and the noise. (Section 3)
            </li>
            <li>
              <strong>What will it look like when it goes wrong?</strong> So you recognise it rather
              than diagnose it from scratch. (Section 4)
            </li>
            <li>
              <strong>What does good mean here?</strong> Which of the four attributes this loop is
              actually judged on. (Section 5)
            </li>
          </ol>
          <p>
            Take them in that order and each answer narrows the next. The three examples below are
            deliberately chosen to be different from one another in every respect that matters.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Example 1 — HVAC room temperature</ContentEyebrow>

        <ConceptBlock
          title="Slow, clean and heavily lagged"
          plainEnglish="A big thermal mass warmed gradually, measured cleanly, changing over tens of minutes. Almost the opposite of a flow loop."
          onSite="The most forgiving loop in this section, and the one where derivative is actually worth considering."
        >
          <p>Run the five questions.</p>
          <p>
            <strong>Process type.</strong> Self-regulating. For a fixed heat input the room warms
            until losses to the outside match the input, then settles. That settling is what makes
            it self-regulating &mdash; and Section 3 established that self-regulating processes{' '}
            <strong>absolutely require integral action</strong>, because proportional alone would
            leave a permanent offset that changes with the weather.
          </p>
          <p>
            <strong>Direction of action.</strong> Imagine the room getting too warm. It needs less
            heat, so a heating valve that opens on an increasing signal must close, so the output
            must decrease. Rising process variable, falling output: reverse acting. Note that a
            cooling loop on the same room would be direct acting, which is Section 2&rsquo;s point
            about the same measurement needing opposite actions.
          </p>
          <p>
            <strong>Terms.</strong> Integral is required. Proportional is straightforward. And this
            is one of the few loops where <strong>derivative is genuinely worth considering</strong>
            , because both of its preconditions are met: the process is dominated by large lag
            times, which is exactly what derivative helps with, and the measurement is clean and
            slow, so there is little noise for it to amplify.
          </p>
          <p>
            <strong>What it looks like wrong.</strong> Long, slow cycles over tens of minutes point
            at excessive integral, and Section 4&rsquo;s frequency clue agrees &mdash; integral
            dominates at low frequencies. A steady offset that never closes points at integral being
            absent or far too slow.
          </p>
          <p>
            <strong>What good means.</strong> Comfort, which usually means a stable temperature
            rather than a fast response, and minimal offset. Nobody notices a room reaching setpoint
            two minutes later; everybody notices a room that swings.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The dead-time trap in a building"
          plainEnglish="Where the sensor is decides how well the loop can ever work, and it is often decided by whoever found a convenient wall."
          onSite="Before tuning any HVAC loop, find out where the sensor actually is and what else is near it."
        >
          <p>
            HVAC loops are unusually prone to a problem Section 1 warned about, and it is almost
            always an installation decision rather than a control one.
          </p>
          <p>
            A sensor mounted a long way from where the conditioned air enters, or in a poorly
            circulated corner, introduces <strong>transport delay</strong> &mdash; genuine dead time
            between the plant responding and the sensor detecting it. The controller then
            over-corrects through the blind period, and the loop swings regardless of tuning.
          </p>
          <p>
            Worse, a sensor placed where something else affects it &mdash; in sunlight, above a
            radiator, next to a door, near equipment that generates heat &mdash; is measuring
            something that is not the room. The loop then controls that spot faithfully while the
            space it is supposed to serve does whatever it likes.
          </p>
          <p>
            🔴 Neither of those is a tuning problem, and Section 4&rsquo;s list applies:{' '}
            <strong>
              a badly located sensor will absorb unlimited tuning effort and remain badly located.
            </strong>{' '}
            It is worth establishing where the sensor is before agreeing that a loop needs tuning at
            all.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Example 2 — pressure</ContentEyebrow>

        <ConceptBlock
          title="Two different problems sharing a name"
          plainEnglish="Pressure in a liquid system and pressure in a gas system behave completely differently, and want opposite tuning."
          onSite="Ask what the fluid is before assuming anything about a pressure loop."
        >
          <p>
            &ldquo;Pressure control&rdquo; describes two processes with almost nothing in common,
            and the distinction is the fluid.
          </p>
          <p>
            <strong>Liquid pressure</strong> &mdash; on a pump discharge, say. Liquids are
            essentially incompressible, so the response to a valve movement is close to immediate.
            There is very little lag and very little capacity to absorb a disturbance. This is a{' '}
            <strong>fast, self-regulating</strong> process, and the measurement is frequently noisy
            because pump discharge is turbulent &mdash; which is exactly the situation Module 3
            Section 3 used to introduce damping.
          </p>
          <p>
            <strong>Gas pressure in a fixed volume</strong> &mdash; a receiver or a closed vessel
            with gas entering and leaving. Here pressure is a mass balance: more in than out and the
            pressure rises, and keeps rising. That is an <strong>integrating process</strong>,
            behaving exactly like the tank level in Section 1.
          </p>
          <AppendixTable
            caption="The same word, two processes"
            headers={['', 'Liquid pressure', 'Gas pressure in a fixed volume']}
            rows={[
              ['Process type', 'Self-regulating', 'Integrating'],
              ['Speed', 'Very fast — almost no lag', 'Slower, set by volume and flows'],
              ['Noise', 'Often significant', 'Usually less'],
              [
                'Terms',
                'PI — derivative would amplify the noise',
                'Strong P, little I — integral guarantees overshoot',
              ],
              ['In manual', 'Settles at a new pressure', '🔴 Ramps until something opens or fails'],
            ]}
            notes="Section 3's rule holds in both columns: self-regulating needs integral, integrating is ideally proportional."
          />
          <p>
            The bottom row is the one that matters operationally. A liquid pressure loop left in
            manual finds a new resting pressure; a gas pressure loop in a fixed volume does not.
            That is Section 1&rsquo;s manual-mode warning arriving on a loop nobody thinks of as a
            level loop.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-6-pressure"
          question="A pump discharge pressure loop is noisy and hunts. Somebody suggests adding derivative action to catch the swings sooner. Good idea?"
          options={[
            'Yes, provided the gain is reduced at the same time',
            'Only if the integral action is removed',
            'Yes — derivative anticipates and will reduce the hunting',
            'No — the loop is fast and the signal is noisy, which is the combination derivative handles worst',
          ]}
          correctIndex={3}
          explanation="Derivative works well on slow, heavily lagged, clean processes. A pump discharge pressure loop is the opposite on all three counts. The derivative contribution from the turbulence noise would swamp anything useful and drive the valve continuously. Reduce the gain, and address the noise at source if it matters."
        />

        <SectionRule />
        <ContentEyebrow>🔴 Example 3 — motor speed</ContentEyebrow>

        <ConceptBlock
          title="The loop that is already closed before you get there"
          plainEnglish="A drive running in closed-loop speed control is a complete control loop in its own right, inside the box. Anything you add sits on top of it."
          onSite="Find out first whether the drive is in open-loop or closed-loop speed control. It changes what you are dealing with."
        >
          <p>
            Motor speed is where an electrician&rsquo;s existing knowledge and this module meet, and
            it contains a structural point worth having clearly.
          </p>
          <p>
            A variable speed drive can run in two quite different ways. In simple terms it either
            sets an output based on a demand without checking the result &mdash; which is Section
            1&rsquo;s open-loop control &mdash; or it takes feedback of actual shaft speed and
            regulates to a speed setpoint, which is a genuine closed loop with its own controller
            and its own tuning, sitting inside the drive.
          </p>
          <p>
            Now consider what happens when that drive is used to control something else. A flow
            controller measures flow, calculates an output, and sends it to the drive as a{' '}
            <strong>speed setpoint</strong>.
          </p>
          <p>
            🔴 That arrangement has a name.{' '}
            <strong>
              One controller&rsquo;s output becoming another controller&rsquo;s setpoint is cascade
              control
            </strong>
            , which Section 2 mentioned and deferred. The drive closes a fast inner loop on speed;
            the flow controller closes a slower outer loop on the thing the process actually cares
            about.
          </p>
          <p>
            Cascade is genuinely useful. The inner loop deals with disturbances belonging to the
            motor and its supply &mdash; load changes, voltage variation, slip &mdash; before they
            ever reach the flow. The outer controller can then treat the drive as a device that
            simply delivers the speed it is asked for.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-6-cascade"
          question="A drive is configured with a 10 second acceleration ramp. It sits under a flow loop that responds in about 3 seconds. What is the consequence?"
          options={[
            'The inner loop is slower than the outer one, so the cascade requirement is broken and the two will fight',
            'None — ramp rates only affect starting from rest',
            'The flow loop will simply respond more slowly',
            'The drive will trip on overcurrent',
          ]}
          correctIndex={0}
          explanation="A ramp rate applies to every speed change, not just to starting. With the inner loop taking 10 seconds to deliver what the outer loop asked for in 3, the outer loop corrects into a delay it cannot see — the cascade requirement is inverted, and the result is a sustained oscillation with neither loop showing a fault on its own."
        />

        <ConceptBlock
          title="🔴 What makes a cascade work, and how it fails"
          plainEnglish="The outer loop trusts the inner one to be quick. If the inner loop is not much faster, the two fight each other."
          onSite="Diagnose a cascade from the inside out. The outer loop cannot be better than the inner one allows."
        >
          <p>
            Cascade rests on one requirement, and it is easy to state:{' '}
            <strong>the inner loop must be substantially faster than the outer loop.</strong>
          </p>
          <p>
            The reason is Section 1&rsquo;s dead-time argument in a different form. The outer
            controller assumes that when it asks for a speed, the speed arrives essentially
            immediately. If the inner loop takes a comparable time to respond, that delay behaves
            like dead time to the outer loop &mdash; it corrects, sees nothing happen, corrects
            harder, and overshoots when the inner loop finally catches up.
          </p>
          <p>
            Worse, the two loops can end up driving each other, producing a sustained oscillation in
            which <strong>neither loop shows a fault when examined on its own</strong>. Each is
            responding correctly to what it sees; what is wrong is the relationship between them.
          </p>
          <p>Two consequences follow for diagnosis:</p>
          <ul>
            <li>
              <strong>Check the inner loop first.</strong> A sluggish or oscillating speed loop
              inside the drive makes the outer loop impossible to tune, and tuning the outer loop is
              the common first move and a waste of an afternoon.
            </li>
            <li>
              <strong>Tune inner before outer.</strong> The outer loop is being tuned against the
              behaviour of the inner one, so changing the inner tuning afterwards invalidates the
              outer tuning.
            </li>
          </ul>
          <p>
            It is worth adding that on many practical drive applications the inner loop is fast
            enough that none of this ever becomes visible &mdash; a speed loop settling in a
            fraction of a second under a flow loop that responds over seconds is comfortably within
            the rule. The point is to know the requirement exists, so that when a cascade does
            misbehave you look in the right place.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Tuning the process loop when the fault is in the drive"
          whatHappens={
            <>
              <p>
                A flow, pressure or level loop driven by a VSD is hunting. The process controller is
                the visible, accessible thing, so it gets tuned &mdash; repeatedly, in both
                directions, with no lasting improvement.
              </p>
              <p>
                Meanwhile the drive&rsquo;s own speed loop may be poorly tuned, may have a ramp rate
                configured that makes it far slower than anyone assumes, may have lost its encoder
                feedback and reverted to a less accurate mode, or may be current-limiting and
                therefore unable to deliver the speed it is being asked for at all.
              </p>
              <p>
                🔴 In each of those cases the outer loop is being asked to control through something
                that is not doing what it promises, and no amount of outer tuning addresses it.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Establish what the drive is actually doing before touching the process controller.
                Is it in open-loop or closed-loop speed control? Does it have feedback, and is that
                feedback healthy? What ramp rates are configured? Is it limiting on current?
              </p>
              <p>
                Then test the inner loop on its own terms: give the drive a speed setpoint step in
                local control and watch how quickly and cleanly it gets there. That is an open-loop
                step test on the inner loop, exactly as Section 1 described, and it answers the
                question directly.
              </p>
              <p>
                A ramp rate is worth singling out because it is so often the answer and so rarely
                suspected. A drive configured to accelerate over several seconds &mdash; entirely
                sensible for a motor starting from rest &mdash; is also applying that ramp to every
                small correction the outer loop asks for, which makes the inner loop far slower than
                the cascade requires.
              </p>
            </>
          }
        />

        <Scenario
          title="A pressure loop, a VSD and three days of tuning"
          situation={
            <>
              <p>
                A booster set maintains water pressure using a pump on a variable speed drive. The
                pressure cycles slowly — about a fifteen-second period — and has done since a drive
                was replaced. The pressure controller has been retuned repeatedly.
              </p>
              <p>
                The pressure transmitter reads correctly against a test gauge. The pump and valve
                are mechanically sound.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Two facts point the same way before any test is done. The problem began when the
                drive was replaced, and repeated tuning of the outer loop has not helped. Section
                4&rsquo;s rule applies: repeated tuning with no improvement is itself evidence that
                tuning is not the answer.
              </p>
              <p>
                Treat it as a cascade and diagnose from the inside. Put the drive in local control
                and step its speed setpoint. If it takes several seconds to settle, or overshoots
                and rings, the inner loop is too slow or badly tuned for the outer loop to work
                above it &mdash; and a fifteen-second cycle is entirely consistent with an inner
                loop responding in seconds.
              </p>
              <p>
                Check the acceleration and deceleration ramp rates first. A replacement drive
                commissioned with default or conservatively long ramps will behave exactly like
                this, and it is a configuration difference that no visual inspection reveals.
              </p>
              <p>
                Also confirm the feedback arrangement matches the original. A drive replaced like
                for like in every respect except that it is running in open-loop speed control where
                the original had encoder feedback will be less accurate and less prompt, and nothing
                external shows it.
              </p>
              <p>
                Once the inner loop is right, retune the outer loop &mdash; and not before, because
                any outer tuning done now is tuned against the wrong inner behaviour.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Three days went into the accessible thing. The cause was one level down, in a device
                most people would not think of as a controller at all &mdash; and it was introduced
                by a like-for-like replacement that changed nothing anyone recorded.
              </p>
              <p>
                For an electrician this is the most transferable example in the module, because
                drives are equipment you already work on. Recognising that a drive in closed-loop
                speed control <em>is</em> a control loop, with all the properties this module
                describes, is what makes the connection.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Comparing the three</ContentEyebrow>

        <ConceptBlock
          title="Same questions, different answers"
          plainEnglish="Set them side by side and the value of asking rather than assuming becomes obvious."
          onSite="If you can fill this table in for a loop you have not met, you know enough to start."
        >
          <AppendixTable
            caption="The five questions across three loops"
            headers={['', 'HVAC room temperature', 'Liquid pressure', 'Motor speed (inner loop)']}
            rows={[
              [
                'Process type',
                'Self-regulating',
                'Self-regulating',
                'Fast, effectively self-regulating',
              ],
              [
                'Speed',
                'Very slow — tens of minutes',
                'Very fast — near immediate',
                'Fast — sub-second',
              ],
              ['Noise', 'Low', 'Often high', 'Depends on feedback quality'],
              ['Terms', 'PI, and D is worth considering', 'PI, no D', 'Set within the drive'],
              [
                'Typical fault',
                'Sensor location and dead time',
                'Noise and excessive gain',
                'Ramp rates and feedback mode',
              ],
              [
                'What good means',
                'Stability and comfort',
                'Steady pressure without valve wear',
                'Fast, clean response for the outer loop',
              ],
            ]}
            notes="Two of the three are self-regulating and want completely different tuning, because speed and noise differ. Process type alone is not the whole answer."
          />
          <p>
            That last note matters.{' '}
            <strong>
              The process type tells you which terms are unavoidable; the speed, lag, dead time and
              noise tell you how hard you may push them.
            </strong>{' '}
            Both HVAC and liquid pressure are self-regulating and both need integral, and beyond
            that they have almost nothing in common.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-6-transfer"
          question="You meet an unfamiliar loop controlling humidity in a large hall. What is the first question to answer?"
          options={[
            'What tuning constants does it currently have?',
            'What type of process is it — does it settle, ramp or accelerate for a fixed output?',
            'Which manufacturer made the controller?',
            'What is the setpoint?',
          ]}
          correctIndex={1}
          explanation="Process type comes first because it determines what the loop does unattended and which control terms it cannot do without. A large hall has substantial capacity and losses that rise with humidity, so it will very likely be self-regulating and slow — which already tells you it needs integral and may tolerate derivative, before you have looked at a single setting."
        />

        <ConceptBlock
          title="Where Module 5 leaves you"
          plainEnglish="You are not a control engineer. You are someone who can tell whether a control problem is a control problem, and describe it accurately to whoever fixes it."
          onSite="That is a genuinely useful position, and it is more than most people on a plant can do."
        >
          <p>
            Module 5 has not made anybody a tuning specialist, and it has provided something more
            immediately useful:
          </p>
          <ul>
            <li>
              You can tell a control problem from a measurement problem, a mechanical problem, or a
              configuration problem &mdash; which is Section 4&rsquo;s list.
            </li>
            <li>
              You can identify a wrong direction of action, which is the one fault that makes things
              actively worse.
            </li>
            <li>
              You can read a PV and output trend together and say which control action is
              misbehaving.
            </li>
            <li>You know which questions to ask operations before disturbing anything.</li>
            <li>You know when to stop adjusting and say the loop cannot meet the requirement.</li>
          </ul>
          <p>
            There is one more thing worth naming explicitly, because it runs through every section
            of this module and it is easy to lose among the detail.{' '}
            <strong>A control loop is only ever as good as the measurement it is built on.</strong>{' '}
            Every technique here &mdash; the direction of action, the three terms, the phase test,
            the tuning objective &mdash; assumes the process variable is telling the truth. Module 3
            showed how a signal degrades on its way to the controller and Module 4 showed how a
            measurement can be confidently wrong.
          </p>
          <p>
            So a control problem should always prompt one question before any of the five:{' '}
            <em>is the measurement right?</em> A loop chasing a bad reading will do exactly what it
            was designed to do and drive the plant somewhere it should not be, and no amount of
            control knowledge will diagnose that from inside the control system.
          </p>
          <p>
            Module 6 goes to calibration, which is the discipline behind the measurements every one
            of these loops depends on. Module 7 goes to the loops themselves as wiring &mdash; the
            4&ndash;20 mA circuits Module 3 described, designed and installed properly. And Module 8
            brings the whole lot together as fault finding.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is a thermostat a control loop?',
              answer:
                'It is closed loop, and it is not a PID loop — it is on/off control, sometimes called bang-bang. It measures, compares against a setpoint and acts, so the feedback structure from Section 1 applies. What it lacks is any proportionality: the output is fully on or fully off, so the process necessarily cycles about setpoint rather than settling on it. Deadband is added deliberately to stop it switching too frequently, which is why a room on a simple thermostat drifts between two temperatures rather than holding one.',
            },
            {
              question: 'Should a VSD always run in closed-loop speed control?',
              answer:
                'No — it depends on whether the accuracy is needed and whether feedback is available. Open-loop speed control is simpler, needs no encoder, and is entirely adequate on many pump and fan applications where the outer process loop is correcting anyway. What matters is knowing which mode is in use, because the cascade reasoning in this section only applies to the closed-loop case, and because a drive that has silently reverted from one to the other behaves differently.',
            },
            {
              question: 'Why do fan and pump loops often behave better than expected?',
              answer:
                'Because the outer process loop is frequently correcting for whatever the drive gets slightly wrong. A flow loop closing round a pump does not much care whether the pump ran at exactly the requested speed — it cares about flow, and it will adjust the speed demand until the flow is right. That is the general strength of cascade: the outer loop cleans up the inner loop’s errors, provided the inner loop is fast enough to be worth having.',
            },
            {
              question: 'How do I know if a building sensor is badly located?',
              answer:
                'Compare it against a portable instrument in the space the loop is supposed to serve, at a few different times of day. A sensor reading consistently different from the occupied space, or one whose difference varies with sun, occupancy or nearby equipment, is telling you where the problem is. It is a measurement question rather than a control one, and Module 4 covers making that comparison properly.',
            },
            {
              question: 'Can cascade be used with more than two loops?',
              answer:
                'It can, and the same requirement applies at every level — each inner loop must be substantially faster than the one above it. In practice more than two or three levels becomes hard to justify and hard to diagnose, because a fault at the innermost level propagates upwards and every loop above it looks wrong. The diagnostic order stays the same: innermost first.',
            },
            {
              question: 'What if the outer loop and the inner loop are tuned by different people?',
              answer:
                'That is a common situation on drive applications — a drive commissioning engineer sets the speed loop and an instrument technician tunes the process loop — and it is a good reason to record both. The outer tuning is only valid for the inner behaviour it was tuned against, so a later change to drive parameters can degrade a process loop that nobody touched. Recording what was set, and when, is what makes that traceable, which is Module 4 Section 5 applied to configuration.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Five questions characterise any unfamiliar loop: process type, direction of action, terms needed, failure signature, and what good means here.',
            'HVAC room temperature is self-regulating, very slow, heavily lagged and clean — one of the few loops where derivative genuinely earns its place.',
            'It requires integral, like every self-regulating process, or it settles off setpoint as the weather changes.',
            '🔴 A badly located HVAC sensor introduces dead time or measures the wrong thing, and no tuning will fix either.',
            'Liquid pressure is fast, often noisy and self-regulating: PI, and derivative would amplify the turbulence.',
            'Gas pressure in a fixed volume is integrating, like tank level — strong proportional, little integral, and it ramps in manual.',
            'So “pressure control” is two different problems, and the fluid decides which one you have.',
            '🔴 A drive in closed-loop speed control is already a complete control loop, closed inside the drive.',
            '🔴 A process controller sending it a speed setpoint is cascade control — one controller’s output as another’s setpoint.',
            '🔴 Cascade requires the inner loop to be substantially faster than the outer one, or the two fight and neither looks faulty alone.',
            'Diagnose and tune a cascade from the inside out. Outer tuning is only valid for the inner behaviour it was tuned against.',
            'Drive ramp rates and feedback mode are the usual hidden causes when a process loop on a VSD misbehaves.',
            'Two of the three examples are self-regulating and want completely different tuning — process type tells you which terms are unavoidable, not how hard to push them.',
            'The method transfers even though none of the answers do. That is what makes it useful on the next loop.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 5.6" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Tuning and stability
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next module <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Calibration methods
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule5Section6;
