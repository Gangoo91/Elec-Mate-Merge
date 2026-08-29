/**
 * Module 5 · Section 2 — Components of a control loop: PV, setpoint, output
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING. Module 1 Section 3 already NAMES the elements of a loop and
 * covers PV, setpoint, error and percent-of-span. Re-listing them would waste
 * the learner's time. So this page is the practical layer M1.3 stops at:
 *
 *   1. The three numbers on a faceplate as a DIAGNOSTIC. PV, SP and OUT read
 *      together localise a fault to a part of the loop before you touch it.
 *   2. 🔴 DIRECTION OF ACTION — direct vs reverse. M1.3 does not cover this at
 *      all, and it is the single most consequential configuration item in a
 *      loop: get it backwards and the loop is POSITIVE feedback. It does not
 *      control badly, it drives the process away as hard as it can.
 *   3. 🔴 THE THOUGHT EXPERIMENT for determining it: imagine PV rising, work out
 *      which way OUT must move to bring it back. That derives the answer rather
 *      than memorising it.
 *   4. 🔴 TWO THINGS FLIP IT: what the final element throttles (heating vs
 *      cooling) and the valve's fail action (air-to-open vs air-to-close).
 *      Swapping a valve for one with the opposite fail action REQUIRES the
 *      controller to be reconfigured — a genuine and dangerous site trap.
 *   5. Bumpless transfer, and why a mode change should not step the output.
 *
 * Point 4 also links back to Module 3 Section 1's fail-safe direction argument,
 * which is the same principle seen from the valve end.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §6.3 (direction of action, the thought-experiment method, and the ATO/ATC and
 * steam/coolant cases that reverse it), §13.2 (PV and output signals being
 * inversely related on a reverse-acting controller) and §29.11.2 (bumpless
 * auto/manual transfer and why a mode change must not disturb the process).
 * Extracted to scratchpad/src/m5_feedback.txt. Held in ~/Desktop/hav/
 * instrumentation.
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
  'Components of a control loop: PV, setpoint, output | Instrumentation Module 5.2 | Elec-Mate';
const DESCRIPTION =
  'Reading PV, setpoint and output together as a diagnostic, and the direction of controller action — how to derive it with a thought experiment, what flips it, and why getting it backwards turns a control loop into positive feedback.';

const outcomes = [
  'Read PV, setpoint and output together and say which part of a loop is at fault',
  'Explain what direct action and reverse action mean for a controller',
  '🔴 Determine the required action using a thought experiment rather than a rule',
  'Say why the same process can need either action depending on what the valve throttles',
  '🔴 Explain why a valve’s fail action changes the controller action required',
  'Describe what happens to a loop configured with the wrong action',
  'Say what bumpless transfer is and why a mode change should not disturb the process',
  'Explain what output limits are for and what they cannot do',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A loop faceplate shows PV 62 °C, SP 60 °C and OUT 100 per cent, and the PV is still rising. What does that combination tell you?',
    options: [
      'The controller is doing all it can and the problem is downstream of it — the final control element or the process',
      'The transmitter has failed',
      'The setpoint is wrong',
      'The controller is tuned too aggressively',
    ],
    correctIndex: 0,
    explanation:
      'The controller has recognised the error and driven its output to the limit, so its logic and direction of action are working. If the process still moves the wrong way, the fault is beyond the controller: a valve that is not moving, a failed actuator, or a disturbance larger than the valve can handle.',
  },
  {
    id: 2,
    question: 'What does a reverse-acting controller do?',
    options: [
      'It reverses the sense of the transmitter signal',
      'Its output decreases as the process variable increases',
      'It runs the loop backwards through the process',
      'It inverts the setpoint',
    ],
    correctIndex: 1,
    explanation:
      'Direct action means an increasing process variable produces an increasing output. Reverse action means an increasing process variable produces a decreasing output. On a reverse-acting loop it is entirely normal for the PV and output signals to move in opposite directions.',
  },
  {
    id: 3,
    question:
      '🔴 A tank is heated by a steam valve that opens on increasing signal. Temperature rises above setpoint. What must the controller output do, and what action is that?',
    options: [
      'Stay where it is until the error grows',
      'Increase, which is direct action',
      'Decrease, which is reverse action',
      'Increase, which is reverse action',
    ],
    correctIndex: 2,
    explanation:
      'Too hot means less steam is needed. The valve opens on increasing signal, so less steam means a lower output. An increasing process variable requiring a decreasing output is reverse action. This thought experiment — imagine the PV rising, work out which way the output must go — settles the question for any loop.',
  },
  {
    id: 4,
    question:
      'The same tank, but the valve now throttles coolant rather than steam. What action does the controller need?',
    options: [
      'Reverse action, as before',
      'Direct action, because a rising temperature now needs the valve to open further',
      'The action does not change',
      'It depends on the setpoint',
    ],
    correctIndex: 1,
    explanation:
      'Nothing about the measurement changed, but the meaning of a larger output did. More coolant now corrects a high temperature, so a rising process variable requires a rising output — direct action. The action depends on the whole path from output to process, not on the measurement alone.',
  },
  {
    id: 5,
    question:
      '🔴 A steam valve is replaced with one of the opposite fail action — air-to-close instead of air-to-open. What else must change?',
    options: [
      'The setpoint must be adjusted',
      'Nothing, provided the valve is the same size',
      'The controller’s direction of action must be reversed',
      'The transmitter must be re-ranged',
    ],
    correctIndex: 2,
    explanation:
      'On an air-to-close valve a larger signal closes the valve, so reducing steam now needs an increasing output rather than a decreasing one. The required controller action flips with it. Changing the valve without reconfiguring the controller leaves the loop with the wrong action.',
  },
  {
    id: 6,
    question: '🔴 What happens to a loop configured with the wrong direction of action?',
    options: [
      'It holds the process at a constant offset',
      'It oscillates evenly about setpoint',
      'It controls sluggishly and needs retuning',
      'It becomes positive feedback and drives the process away from setpoint as hard as it can',
    ],
    correctIndex: 3,
    explanation:
      'Every correction now makes the error larger, which produces a bigger correction in the same wrong direction. The loop saturates its output and stays there. This is not poor control — it is the opposite of control, and it is why the action is checked before a loop is ever put in automatic.',
  },
  {
    id: 7,
    question: 'What is bumpless transfer?',
    options: [
      'Arranging that switching between automatic and manual does not make the output jump',
      'A way of changing setpoint gradually',
      'A technique for eliminating valve stiction',
      'A method of smoothing a noisy process variable',
    ],
    correctIndex: 0,
    explanation:
      'Without it, the output can step suddenly when the mode changes, and the final control element steps with it — disturbing a process that was perfectly settled. The whole point of the feature is that changing mode should be a decision about who is in charge, not an event the process experiences.',
  },
  {
    id: 8,
    question: 'What is an output limit for?',
    options: [
      'To stop the process variable exceeding a safe value',
      'To restrict how far the controller may drive the final control element',
      'To prevent the setpoint being set too high',
      'To limit how quickly the process variable can change',
    ],
    correctIndex: 1,
    explanation:
      'It constrains the controller’s output, not the process. That is a useful distinction: a limit can stop a valve being driven fully open, but it cannot stop the process variable going somewhere it should not if a disturbance takes it there. It is not a protective device.',
  },
];

const InstrumentationModule5Section2 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 2"
        title="Components of a loop"
        backTo="/electrician/upskilling/instrumentation-module-5"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Three numbers, and one configuration item that decides whether the loop controls the
          process or destroys it.
        </p>

        <TLDR
          points={[
            'Module 1 Section 3 named the parts of a loop. This section is about what you actually see and set.',
            'PV, setpoint and output are three numbers on a faceplate — and read together they localise a fault before you touch anything.',
            'PV at setpoint with the output at a limit is a different problem from PV off setpoint with the output mid-range.',
            '🔴 Direction of action: direct means output rises as PV rises; reverse means output falls as PV rises.',
            '🔴 Derive it with a thought experiment — imagine the PV rising, and work out which way the output must move to bring it back.',
            'The action depends on the whole path from output to process, not on the measurement. The same tank needs opposite actions for a steam valve and a coolant valve.',
            '🔴 A valve’s fail action changes it too. Swap an air-to-open valve for an air-to-close one and the controller must be reversed.',
            '🔴 Wrong action is not poor control. It is positive feedback — every correction enlarges the error, and the output saturates.',
            'Bumpless transfer means switching between auto and manual does not step the output and disturb a settled process.',
            'Output limits constrain the controller, not the process. They are not a protective device.',
            'A setpoint can come from an operator, from a remote source, or from another controller — which is cascade, and Section 6 returns to it.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Three numbers, read together</ContentEyebrow>

        <ConceptBlock
          title="The faceplate is a diagnostic instrument"
          plainEnglish="PV is what the process is doing. SP is what you asked for. OUT is what the controller is doing about it. Any two of those explain the third."
          onSite="Read all three before forming a theory. Most loop faults announce themselves in the combination rather than in any single number."
        >
          <p>Every loop controller, whatever its age or technology, presents three values:</p>
          <ul>
            <li>
              <strong>PV</strong> &mdash; the process variable, what the measurement says is
              happening.
            </li>
            <li>
              <strong>SP</strong> &mdash; the setpoint, what you have asked for.
            </li>
            <li>
              <strong>OUT</strong> &mdash; the controller&rsquo;s output, what it is doing to the
              final control element about the difference.
            </li>
          </ul>
          <p>
            Module 1 Section 3 covered what these are. What is worth adding is that{' '}
            <strong>the three of them together are a diagnostic</strong>, and reading them as a set
            localises a fault to part of the loop before any test equipment comes out.
          </p>
          <AppendixTable
            caption="Reading the three together"
            headers={['What you see', 'What it suggests']}
            rows={[
              [
                'PV at SP, OUT steady mid-range',
                'A healthy loop doing its job. Nothing to investigate',
              ],
              [
                'PV off SP, OUT at 0% or 100%',
                'The controller is doing all it can — look downstream at the valve, or at a disturbance too big for it',
              ],
              [
                'PV off SP, OUT steady mid-range',
                'The controller is not responding to the error — check the mode, and check it is not in manual',
              ],
              [
                'PV off SP and moving further away, OUT chasing it',
                '🔴 Suspect the direction of action before anything else',
              ],
              [
                'PV steady, OUT swinging',
                'The output is not reaching the process — a stuck valve, or a broken output path',
              ],
              [
                'PV swinging, OUT swinging in step',
                'A tuning or dead-time problem — Sections 4 and 5',
              ],
            ]}
            notes="None of this requires instruments. It is available from the screen, and it decides where to go next."
          />
          <p>
            The fourth row is the one this section is really about, because it is the only fault on
            that list where the loop is making things actively worse.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Direction of action</ContentEyebrow>

        <ConceptBlock
          title="Which way should the output move?"
          plainEnglish="When the measurement goes up, should the controller push its output up or down? There is no universal answer — it depends on the plant."
          onSite="This is a configuration setting, and it is the first thing to verify on a loop that is behaving badly rather than merely imperfectly."
        >
          <p>
            A general-purpose controller can be configured to act in either of two directions while
            in automatic:
          </p>
          <ul>
            <li>
              <strong>Direct action</strong> &mdash; an increasing process variable produces an{' '}
              <em>increasing</em> output.
            </li>
            <li>
              <strong>Reverse action</strong> &mdash; an increasing process variable produces a{' '}
              <em>decreasing</em> output.
            </li>
          </ul>
          <p>
            Neither is the default and neither is more correct. Which one a given loop needs depends
            on the plant it is wired into, and it has to be worked out rather than assumed.
          </p>
          <p>
            One consequence is worth having straight away, because it saves confusion at a
            faceplate. On a reverse-acting loop it is entirely normal for the PV and the output to{' '}
            <strong>move in opposite directions</strong>. The two signals represent different
            variables and there is no reason to expect them to track each other. A rising PV with a
            falling output is not a fault; on many loops it is exactly what correct operation looks
            like.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 The thought experiment — deriving the answer"
          plainEnglish="Imagine the measurement rising. Work out what the final control element would have to do to bring it back. Then work out which way the output has to move to make the element do that."
          onSite="Works on any loop, in about twenty seconds, without reference to anything but the plant in front of you."
        >
          <p>
            The reliable way to identify the required direction of action is to run a short thought
            experiment: <strong>imagine the process variable increasing</strong>, then determine
            which way the controller&rsquo;s output must change to bring it back to setpoint, given
            what the final control element actually does to the process.
          </p>
          <p>
            Work one properly. A vessel is heated by steam through a valve that opens on an
            increasing signal.
          </p>
          <ul>
            <li>
              <strong>Imagine the temperature rising</strong> above setpoint &mdash; perhaps the
              feed arrived warmer than usual.
            </li>
            <li>
              <strong>What does the process need?</strong> Less heat. So less steam.
            </li>
            <li>
              <strong>What does the valve need to do?</strong> Close further.
            </li>
            <li>
              <strong>What signal closes it?</strong> The valve opens on an increasing signal, so
              closing it requires a <em>decreasing</em> signal.
            </li>
            <li>
              <strong>Conclusion.</strong> An increasing process variable requires a decreasing
              output, which is <strong>reverse action</strong>.
            </li>
          </ul>
          <p>
            Notice that the chain runs from the process backwards to the controller, and that every
            step is a physical question about the plant rather than a matter of convention. That is
            what makes it reliable:{' '}
            <strong>
              you are not remembering which processes are reverse-acting, you are deriving it from
              what the equipment does.
            </strong>
          </p>
        </ConceptBlock>

        <Pullquote>
          There is no such thing as a reverse-acting process. There is only a controller whose
          action has been matched to what the valve and the process actually do.
        </Pullquote>

        <ConceptBlock
          title="Two things flip the answer"
          plainEnglish="Change what the valve throttles, or change which way the valve responds to its signal, and the required controller action reverses."
          onSite="Both are things that get changed on a plant without anybody thinking about the controller."
        >
          <p>
            Run the same thought experiment with two things altered and it produces opposite
            answers. Neither alteration touches the measurement.
          </p>
          <p>
            <strong>First: what the final control element throttles.</strong> Suppose the pipework
            is changed so the valve throttles coolant rather than steam. Now a rising temperature
            needs the valve to open <em>further</em>, which needs an increasing output &mdash; so
            the controller must be <strong>direct-acting</strong>. Same vessel, same transmitter,
            same setpoint, opposite action.
          </p>
          <p>
            <strong>Second: the valve&rsquo;s fail action.</strong> Keep the steam valve, but
            replace it with an air-to-close type rather than air-to-open. Reducing steam now
            requires <em>more</em> signal, because more air pressure pushes this valve further
            closed. So a rising temperature requires an increasing output, and the controller must
            be <strong>direct-acting</strong> again.
          </p>
          <AppendixTable
            caption="Same vessel, same measurement — four combinations"
            headers={['Final control element', 'Valve action', 'Required controller action']}
            rows={[
              ['Steam (heating)', 'Air-to-open', 'Reverse'],
              ['Steam (heating)', 'Air-to-close', 'Direct'],
              ['Coolant (cooling)', 'Air-to-open', 'Direct'],
              ['Coolant (cooling)', 'Air-to-close', 'Reverse'],
            ]}
            notes="Each row is the thought experiment run through. Two reversals cancel, which is why the fourth row returns to reverse action."
          />
          <p>
            🔴 The second column is the dangerous one, because a valve&rsquo;s fail action is chosen
            for <em>safety</em> reasons, and safety requirements change. Module 3 Section 1 made the
            argument from the signal end: arrange things so the failure and the safe condition point
            the same way. A valve specified to fail closed on loss of air is that principle applied
            to the final control element.
          </p>
          <p>
            So a legitimate, well-reasoned safety change to a valve{' '}
            <strong>silently creates a requirement to reconfigure the controller</strong>. Nothing
            about the new valve announces it, and the loop will be left in a state that looks
            entirely normal until it is put into automatic.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-2-action"
          question="A pressure loop vents to atmosphere through a valve that opens on increasing signal. Pressure rises above setpoint. What action does the controller need?"
          options={[
            'Reverse — a rising PV needs a falling output',
            'Direct — a rising PV needs the vent valve to open further, which needs a rising output',
            'Either, provided the tuning is correct',
            'It depends on the fail action only',
          ]}
          correctIndex={1}
          explanation="Run the experiment: pressure too high → need to vent more → open the valve further → the valve opens on an increasing signal → output must increase. A rising process variable requiring a rising output is direct action. Note this is the opposite of the heating example, because venting relieves the process rather than driving it."
        />

        <SectionRule />
        <ContentEyebrow>When it is wrong</ContentEyebrow>

        <CommonMistake
          title="🔴 Treating a loop that runs to a limit as a tuning problem"
          whatHappens={
            <>
              <p>
                A loop is put into automatic and immediately drives its output hard to 0 or 100 per
                cent and stays there, with the process variable heading steadily away from setpoint.
                The response is to reduce the gain, and then reduce it again.
              </p>
              <p>
                Tuning will not touch this, because it is not a tuning fault. With the direction of
                action set wrongly, the loop is <strong>positive feedback</strong>: the controller
                reads an error, moves its output the wrong way, which makes the error larger, which
                produces a larger movement in the same wrong direction. It saturates within seconds
                and sits there.
              </p>
              <p>
                Reducing the gain only makes it saturate more slowly. The loop is not controlling
                badly &mdash; <strong>it is doing the exact opposite of controlling</strong>, as
                fast as its settings allow.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Recognise the signature: output pinned at a limit, process variable moving away from
                setpoint rather than towards it, immediately on going into automatic. That
                combination is direction of action until proven otherwise.
              </p>
              <p>
                Put the loop back in manual to stop it, then run the thought experiment from the
                plant &mdash; what the element throttles, which way it responds to its signal, and
                therefore which way the output must move. Compare that with what the controller is
                configured for.
              </p>
              <p>
                And check the action after <em>any</em> change to the final control element, the
                pipework or the transmitter. Each of those can flip the requirement without anything
                in the control system changing at all.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Changing hands without disturbing anything</ContentEyebrow>

        <ConceptBlock
          title="Bumpless transfer"
          plainEnglish="Switching between automatic and manual should change who decides the output, not the output itself."
          onSite="If the process bumps every time somebody changes mode, that is a fault worth reporting rather than a quirk to live with."
        >
          <p>
            Module 1 Section 3 explained what changes when a controller is switched to manual: the
            calculation stops and the output becomes whatever the operator sets. That raises an
            obvious practical problem.
          </p>
          <p>
            If the controller was outputting 43 per cent in automatic and the operator&rsquo;s
            manual setting happens to be at 70 per cent, then the moment of switching produces a{' '}
            <strong>sudden step in the output</strong>. The final control element steps with it, and
            a process that was perfectly settled is disturbed &mdash; by nothing more than a change
            of who is in charge.
          </p>
          <p>
            <strong>Bumpless transfer</strong> is the provision that prevents this. However it is
            implemented, the principle is the same: the incoming mode is brought into agreement with
            the outgoing one before the changeover, so the output does not move at the moment of the
            switch.
          </p>
          <p>
            On older pneumatic controllers this was a manual procedure &mdash; the operator adjusted
            an output regulator until a balance indicator showed no difference between the two
            sides, and only then moved the transfer switch. Modern controllers do the equivalent
            automatically, tracking the manual setting to the current output so the two always
            agree.
          </p>
          <p>
            It is worth knowing the principle rather than just the feature, because it explains a
            related behaviour: when a loop is in manual, a well-designed controller keeps its
            internal calculation aligned with the actual output, so that returning to automatic does
            not produce a jump either. A loop that bumps on the way back into automatic is telling
            you something about how that tracking is configured.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Output limits, and what they are not"
          plainEnglish="You can stop the controller driving the valve past a certain point. That is a limit on the controller, not on the process."
          onSite="Useful. Not a protection device, and it should never be described as one."
        >
          <p>
            Most controllers allow the output to be constrained &mdash; a minimum, a maximum, or
            both. There are good reasons to use them: keeping a valve from closing fully so a
            minimum flow is maintained, or preventing an output from driving equipment beyond a
            sensible operating point.
          </p>
          <p>
            The important distinction is what is being limited.{' '}
            <strong>
              An output limit constrains what the controller may ask for. It does not constrain what
              the process may do.
            </strong>{' '}
            If a disturbance takes the process variable somewhere dangerous, an output limit has no
            opinion about it whatever &mdash; it only ever restricted the controller.
          </p>
          <p>
            That matters because output limits are occasionally described as though they were
            protective. They are not. Protection against a process reaching an unsafe condition is a
            separate function with separate equipment, and Module 8 covers where the boundary sits.
          </p>
          <p>
            One practical side effect is worth anticipating. A controller sitting at an output limit
            has an error it cannot correct, and if it has integral action that error keeps
            accumulating with nothing to show for it. That is windup, and Section 3 deals with it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-2-bumpless"
          question="An operator switches a settled loop from automatic to manual and the process visibly steps. What does that indicate?"
          options={[
            'The loop was badly tuned in automatic',
            'Bumpless transfer is not working — the manual setting did not match the output at the moment of the switch',
            'The transmitter has drifted',
            'The setpoint was changed at the same time',
          ]}
          correctIndex={1}
          explanation="The process was settled, so nothing about it changed. What changed was the output, at the instant of the switch, because the manual station was sitting at a different value from the controller. Changing mode should be a decision about who is in charge, not an event the process experiences."
        />

        <SectionRule />
        <ContentEyebrow>Setpoints and limits</ContentEyebrow>

        <ConceptBlock
          title="Where a setpoint comes from"
          plainEnglish="Usually an operator types it. Sometimes another system sends it. Sometimes another controller calculates it."
          onSite="Check the setpoint source before assuming somebody set it wrongly."
        >
          <p>
            The setpoint is treated as a fixed number typed in by an operator, and often it is. Two
            other arrangements are common enough to recognise:
          </p>
          <ul>
            <li>
              <strong>Remote setpoint</strong> &mdash; the value arrives as a signal from elsewhere,
              so a supervisory system or a schedule can move it without anyone at the faceplate.
            </li>
            <li>
              <strong>Cascade</strong> &mdash; the setpoint is the{' '}
              <em>output of another controller</em>. One loop decides what the other loop should aim
              for.
            </li>
          </ul>
          <p>
            Cascade is a genuine control strategy rather than a wiring convenience, and Section 6
            returns to it with a worked example. What matters here is simply that{' '}
            <strong>a setpoint moving on its own is not necessarily a fault</strong>. If a loop is
            on remote or cascade setpoint, the setpoint moving is the system working as designed,
            and the question becomes what is moving it.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What to check before putting a loop into automatic"
          plainEnglish="A short list, worked from the plant rather than the screen. It takes a couple of minutes and it catches the faults that matter."
          onSite="Especially after any change to the valve, the pipework, the transmitter or the controller configuration."
        >
          <ul>
            <li>
              <strong>Direction of action.</strong> Run the thought experiment from the plant, then
              compare with what the controller is set to. This is first because it is the only item
              on the list where being wrong makes things actively worse.
            </li>
            <li>
              <strong>What the final element actually does.</strong> Confirm which way the valve
              moves for a manual output change &mdash; do not infer it from the tag or from what was
              there before.
            </li>
            <li>
              <strong>The transmitter range.</strong> Module 3 Section 2 showed what a range
              mismatch does: everything reads plausibly and everything is wrong. The setpoint means
              nothing until the range is known.
            </li>
            <li>
              <strong>Output limits.</strong> Know what they are set to, so that an output sitting
              at a limit is recognised as a limit rather than a coincidence.
            </li>
            <li>
              <strong>The setpoint source.</strong> Local, remote or cascade &mdash; so that a
              setpoint moving is understood rather than investigated.
            </li>
          </ul>
          <p>
            Then make the transfer itself deliberately.{' '}
            <strong>Watch the first correction rather than walking away from it</strong>
            &mdash; the first few seconds after a loop goes into automatic reveal a wrong direction
            of action immediately, and that is the cheapest moment to catch it.
          </p>
        </ConceptBlock>

        <Scenario
          title="A newly replaced valve, and a loop that will not stay in automatic"
          situation={
            <>
              <p>
                A steam valve on a heating loop was replaced during a shutdown. Since restart, the
                loop cannot be left in automatic: within seconds of switching, the output runs to
                100 per cent and the temperature climbs away from setpoint. In manual it is entirely
                controllable, and the operators are running it that way.
              </p>
              <p>
                The transmitter has been checked and reads correctly. The valve strokes fully and
                responds to a manual output change.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Read the signature first. Output pinned at a limit, process variable moving{' '}
                <em>away</em> from setpoint, immediately on going to automatic, with everything
                healthy in manual. That is direction of action, and it should be checked before
                anything else is touched.
              </p>
              <p>
                The timing points straight at the cause. Nothing in the control system changed
                &mdash; a valve did. So establish what the new valve does that the old one did not,
                and the fail action is the first thing to confirm: if the replacement is
                air-to-close where the original was air-to-open, the required controller action has
                reversed.
              </p>
              <p>
                Run the thought experiment on the plant as it is now. Temperature too high, so less
                steam, so the valve must close, so &mdash; on an air-to-close valve &mdash; the
                signal must <em>increase</em>. A rising process variable requiring a rising output
                is direct action, and the controller is almost certainly still configured for
                reverse.
              </p>
              <p>
                Reconfigure the action, confirm the valve now moves the correct way for a manual
                output change, and only then return the loop to automatic &mdash; watching the first
                correction closely rather than walking away.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Running the loop in manual was a sensible short-term response, and Section 1
                explains why it is not a resting state: on a self-regulating process it holds, but
                the loop is doing nothing about load changes and somebody has to watch it.
              </p>
              <p>
                The wider lesson is that a change with excellent reasons behind it &mdash; a valve
                fail action chosen for safety &mdash; created an obligation somewhere else that
                nothing flagged. Mechanical changes to a final control element are control system
                changes, whether or not anybody records them as such.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="Why the output is the honest number"
          plainEnglish="The process variable tells you what is happening. The output tells you how hard the loop is working to keep it that way — which is often the more useful of the two."
          onSite="A trend of the output is an early-warning trace. It moves before the process variable has to."
        >
          <p>
            Operators watch the process variable, and understandably so &mdash; it is the thing the
            plant cares about. But a loop holding setpoint perfectly tells you almost nothing on its
            own, because{' '}
            <strong>
              a loop working easily and a loop working desperately look identical on the PV
            </strong>
            .
          </p>
          <p>
            The output separates them. A steam valve that used to sit at 40 per cent and now sits at
            75 per cent to hold the same temperature is reporting something real: more heat is being
            lost, or less is being delivered, or the process has changed. The temperature has not
            moved at all, and will not, until the output runs out of range.
          </p>
          <p>
            That is why{' '}
            <strong>the output is worth trending as well as the process variable</strong>. It gives
            warning while the loop still has authority left, rather than at the moment it runs out.
            Fouling on a heat exchanger, a valve gradually passing, a filter blinding, a drifting
            supply pressure &mdash; all of these appear on the output long before they appear on the
            measurement.
          </p>
          <p>
            It connects directly to Module 4 Section 5. A record of where the output sits under
            known conditions is a baseline, and the value of a baseline is precisely that it can be
            compared against later.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is there a shortcut for remembering which loops are reverse-acting?',
              answer:
                'Rules of thumb circulate — heating loops are reverse, cooling loops are direct — and they are right often enough to be dangerous. They assume a particular valve action, and they say nothing about the case where the pipework was changed or the valve replaced. The thought experiment takes twenty seconds, works on any loop, and is derived from the plant in front of you rather than from a generalisation about plants.',
            },
            {
              question: 'What if the transmitter is reverse-acting as well?',
              answer:
                'Then it flips the requirement again, exactly as the valve does. The principle is the same: work through the whole path from the controller output, via the final control element, through the process, back through the transmitter, and ask whether the loop as a whole opposes a deviation. Anything in that path that inverts the sense changes what the controller must do, and two inversions cancel.',
            },
            {
              question: 'Can the action be checked without putting the loop in automatic?',
              answer:
                'The requirement can. Work out from the plant what the action ought to be, then read what the controller is configured for and compare. That is a desk check and it is the safe order to do things in. Confirming behaviour by putting the loop into automatic and watching is the last step, not the first — and on any loop where a wrong-way excursion matters, it deserves a hand on the mode switch.',
            },
            {
              question: 'Why does the output not sit still when the process is at setpoint?',
              answer:
                'Because holding a process at setpoint usually requires continuous effort, not zero effort. A heating loop at setpoint still needs steam to replace the heat being lost. The output settles at whatever value balances the process, which is rarely a round number and moves as conditions change. An output resting at zero when the PV is at setpoint is more likely to indicate that nothing is being demanded of the loop at all.',
            },
            {
              question: 'Should a loop be left in manual if it will not behave in automatic?',
              answer:
                'As a short-term measure with somebody watching, that is reasonable and often the right call. As a resting state it depends entirely on the process type from Section 1 — manual is a holding position on a self-regulating process and a countdown on an integrating or runaway one. Either way it is a decision to record and hand over, not one to leave for the next shift to discover.',
            },
            {
              question: 'Does a digital controller still have a direction of action setting?',
              answer:
                'Yes, and it is usually a single configuration parameter — direct or reverse, sometimes expressed as the sign of the gain. The technology has changed and the physical question has not: the loop still has to oppose a deviation rather than reinforce it, and something still has to be told which way that is. A negative gain in some systems is the same setting wearing different clothes.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Module 1 Section 3 named the parts of a loop. This section is the practical layer: what you read, and what you configure.',
            'PV, SP and OUT read together localise a fault before any test equipment comes out.',
            'PV off setpoint with the output at a limit means the controller has done all it can — look downstream.',
            'PV off setpoint with the output steady mid-range means the controller is not acting — check the mode.',
            '🔴 Direct action: output rises as PV rises. Reverse action: output falls as PV rises.',
            'On a reverse-acting loop the PV and output moving in opposite directions is normal, not a fault.',
            '🔴 Derive the action with a thought experiment: imagine the PV rising, and work backwards from the process to the output.',
            'The action depends on the whole path from output to process. A steam valve and a coolant valve on the same vessel need opposite actions.',
            '🔴 A valve’s fail action flips it too. Air-to-open and air-to-close require opposite controller actions for the same duty.',
            '🔴 A safety-driven valve change silently creates a requirement to reconfigure the controller, and nothing announces it.',
            '🔴 Wrong action is positive feedback: every correction enlarges the error and the output saturates. It is the opposite of control, not bad control.',
            'The signature is an output pinned at a limit with the PV moving away from setpoint, immediately on going to automatic.',
            'Bumpless transfer keeps the output from stepping when the mode changes — a mode change should not be an event the process experiences.',
            'Output limits constrain the controller, not the process. They are not protective devices.',
            'A setpoint can be local, remote, or the output of another controller. A setpoint that moves on its own is not necessarily a fault.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 5.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Open and closed loop
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">PID basics</span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule5Section2;
