/**
 * BMS Module 3 · Section 2 — Control loops
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches how a BMS loop holds a measured value
 * at a setpoint: the loop and its direction of action, on/off control with a switching
 * differential, the neutral zone between heating and cooling, then proportional, integral and
 * derivative action taught as behaviours (no equations), what a badly tuned or mechanically
 * faulty loop looks like on a trend, and cascade and sequence control as you meet them on AHUs,
 * fan coils and VAV boxes. The old page placed a differential-pressure sensor at the pump
 * discharge, gave a 200–400 kPa setpoint and quoted accuracy figures for each control type; all
 * of that has been dropped, along with its description of on/off switching points.
 */
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PrevNext } from '@/components/study-centre/course-kit';
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Control loops | BMS Module 3.2 | Elec-Mate';
const DESCRIPTION =
  'How a BMS holds temperature and pressure at setpoint: on/off and deadband, proportional, integral and derivative action, cascade and sequence control, and tuning faults.';

const outcomes = [
  'Name the parts of a control loop on a BMS drawing and say whether a loop should be direct or reverse acting',
  'Explain why on/off control needs a switching differential, and why heating and cooling need a neutral zone between them',
  'Describe what proportional, integral and derivative action each do, in plain words, using HVAC examples',
  'Recognise offset, hunting and integral windup on a trend log, and say what usually causes each',
  'Separate a tuning problem from a mechanical or wiring fault before anyone touches the loop settings',
  'Explain cascade and sequence control as you meet them on air handling units, fan coils and VAV boxes',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A heating coil valve is driven by a supply air temperature loop. As the supply air gets warmer, the output to the valve should fall. How is that loop described?',
    options: [
      'Direct acting, because the valve is a heating valve',
      'Proportional only, because it follows the temperature',
      'Reverse acting: rising measurement, falling output',
      'Open loop, because the valve has no feedback of its own',
    ],
    correctIndex: 2,
    explanation:
      'Direction of action is about the relationship between measurement and output, not the type of plant. A rising temperature needs less heat, so the output must fall: reverse action. A chilled water valve on the same AHU would be direct acting, because a rising temperature needs more cooling.',
  },
  {
    id: 2,
    question:
      'A frost thermostat set with almost no differential is chattering the pump on and off every few seconds. What is the right fix?',
    options: [
      'Widen the gap between switch-on and switch-off',
      'Fit a faster sensor so the stat sees each change sooner',
      'Add derivative action so the stat anticipates change',
      'Raise the setpoint so the stat trips less often',
    ],
    correctIndex: 0,
    explanation:
      'With two switching points close together, the smallest wobble crosses both and the plant short-cycles. A wider differential gives a definite gap to travel before the state changes again. A faster sensor makes the chatter worse, and moving the setpoint just moves the chatter.',
  },
  {
    id: 3,
    question:
      'A proportional-only loop settles with a small standing offset. Someone turns the gain up a long way to remove it. What is the likely result?',
    options: [
      'The offset is removed completely and the loop stays steady',
      'The offset shrinks, but the loop starts to swing',
      'The offset grows, because a higher gain makes the loop slower',
      'Nothing changes, because gain only affects on/off control',
    ],
    correctIndex: 1,
    explanation:
      'More gain gives a bigger output for the same error, so the offset shrinks. Pushed too far, though, the controller over-corrects and the loop starts to swing. Removing offset properly needs integral action, not more gain.',
  },
  {
    id: 4,
    question: 'What does integral action add to a loop?',
    options: [
      'A fixed extra output that is added all the time',
      'An output that keeps moving while any error remains',
      'A brake that slows the approach towards setpoint',
      'A delay before the loop is allowed to respond at all',
    ],
    correctIndex: 1,
    explanation:
      'Integral is the impatient part of the controller: it keeps pushing the output while the measurement stays away from setpoint, which is how it removes offset. The brake that slows the approach is derivative action, not integral.',
  },
  {
    id: 5,
    question:
      'On a cold Monday the boiler plant is struggling and the heating valve has been fully open for an hour. When the space finally reaches setpoint, it overshoots badly before the valve begins to close. What is the most likely cause?',
    options: [
      'The valve actuator was set for the wrong rotation',
      'Integral windup while the output was saturated',
      'Too much derivative action on the space loop',
      'The proportional band has been set far too wide',
    ],
    correctIndex: 1,
    explanation:
      'While the plant could not keep up, the integral term kept accumulating error and drove the output as far as it could go. Once the space reached setpoint, the stored error had to be cancelled by an error in the other direction before the output came back, so the space overshot. Anti-windup features exist for exactly this.',
  },
  {
    id: 6,
    question:
      'A trend shows a fan coil valve stepping open, stopping, stepping closed and stopping, with the room temperature cycling either side of setpoint. The tuning has not changed in years. What do you check first?',
    options: [
      'The integral setting, because it must be too aggressive',
      'Whether derivative action has been switched on',
      'The valve and actuator for sticking or slack',
      'The head end graphics for a display fault',
    ],
    correctIndex: 2,
    explanation:
      'Stick-then-jump movement with cycling either side of setpoint is the signature of a valve or actuator that will not move smoothly. Integral action keeps trying to correct an error the valve cannot respond to finely, so the loop hunts. Fix the mechanical fault before anyone retunes.',
  },
  {
    id: 7,
    question:
      'Some controllers calculate derivative from the measurement rather than from the error. What does that avoid?',
    options: [
      'A kick in the output when the setpoint is changed',
      'Offset building up when the load on the loop changes',
      'Integral windup while the plant output is saturated',
      'Chatter from noise on the measured value signal',
    ],
    correctIndex: 0,
    explanation:
      'A setpoint step is a sudden change in the error but not in the measurement, so derivative on the measurement does not kick the output when somebody changes the setpoint. It does nothing about noise, because the noise is in the measurement itself. Offset and windup are matters for proportional and integral action.',
  },
  {
    id: 8,
    question:
      'In a VAV system, the room temperature controller sets the airflow target for the box, and a second controller holds the box airflow at that target. What is this arrangement called?',
    options: [
      'Sequence control',
      'On/off control with a differential',
      'Feedforward control',
      'Cascade control',
    ],
    correctIndex: 3,
    explanation:
      'One controller’s output becomes the setpoint of another, and the inner loop measures something that responds faster than the outer one. That is cascade control. Sequence control is one output driving several devices in turn.',
  },
  {
    id: 9,
    question:
      'An AHU has one temperature controller driving the heating valve, the mixing dampers and the cooling valve in turn. What should happen near the middle of the controller output?',
    options: [
      'Heating and cooling both open a little to steady the temperature',
      'The dampers close fully to protect the coils',
      'Neither heating nor cooling is open, so the two never run together',
      'The cooling valve takes over and the heating valve stays at its last position',
    ],
    correctIndex: 2,
    explanation:
      'The point of a sequence is that one stage finishes before the next starts. Heating and cooling open from opposite ends of the output, with a band in the middle where neither is open. Any overlap means the plant heats and cools the same air at once.',
  },
  {
    id: 10,
    question:
      'A loop is oscillating after a controls engineer changed its settings. In general terms, what usually causes a loop to swing like this?',
    options: [
      'Gain too low and integral too slow',
      'Gain too high or integral too fast',
      'The derivative term switched off',
      'The setpoint being too close to the measurement',
    ],
    correctIndex: 1,
    explanation:
      'Too much gain or too much integral makes the controller over-correct, so the measurement swings past setpoint one way and then the other. Too little of both produces the opposite symptom: a loop that is slow and sluggish. Leaving derivative off does not make a loop oscillate.',
  },
];

const BMSModule3Section2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 2"
        title="Control loops"
        backTo="/study-centre/upskilling/bms-module-3"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          How a BMS holds a temperature or a pressure where it should be, why loops misbehave, and
          how to tell a tuning problem from a fault you can fix with a spanner.
        </p>

        <TLDR
          points={[
            'Every loop is the same ring: measure, compare with the setpoint, drive an output, and let the plant respond. The loop must push the right way, which is what direct and reverse action describe.',
            'On/off control works when it has a switching differential. Heating and cooling need a neutral zone between them so they never fight.',
            'Proportional action reacts to how far off the measurement is, integral to how long it has been off, and derivative to how fast it is changing. Most loops you meet run as PI.',
            'Offset, hunting and windup each have a recognisable shape on a trend. Many loops that hunt have a mechanical fault, not bad tuning.',
            'Cascade control hands one loop’s output to another as its setpoint. Sequence control drives several devices from one output, in turn.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The loop</ContentEyebrow>

        <ConceptBlock
          title="Measure, compare, act, and the plant answers back"
          plainEnglish="A sensor tells the controller what is happening, the controller compares that with what is wanted, and it moves a valve, damper or fan speed to close the gap. Then it looks again."
          onSite="On a points schedule a loop usually shows as a group: an analogue input for the sensor, a setpoint, and an analogue output to the valve or drive. If one of the three is missing, ask how the loop closes."
        >
          <p>
            Module 1 called the outstation the place where decisions are made. Most of those
            decisions are made by control loops, and they all share one shape. A sensor measures
            something in the building. The controller holds a target for it, called the{' '}
            <strong>setpoint</strong>. The difference between the measured value and the setpoint is
            the <strong>error</strong>. The controller works out an <strong>output</strong> from
            that error and sends it to the device that can change things: a heating valve, a damper
            actuator, a fan or pump drive. The plant responds, the sensor sees the response, and the
            ring starts again.
          </p>
          <p>
            Because the measurement is fed back to the controller, this is called{' '}
            <strong>closed-loop</strong> or feedback control. Break any link in the ring (a sensor
            reading open circuit, an output not wired, an actuator with its coupling slipping) and
            the controller is working blind. It will keep calculating, often with great confidence,
            and nothing it calculates will reach the room.
          </p>
          <p>
            Two words matter here. The <strong>load</strong> is anything outside the controller’s
            hands that pushes the measured value around: the weather, the sun on a glazed façade, a
            meeting room filling up, the temperature of the water arriving from the boiler. The
            controller’s whole job is to keep correcting for the load. If nothing ever disturbed the
            space, there would be no need for a loop.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Direct and reverse action: the loop must push the right way"
          plainEnglish="Ask what the output must do if the measurement goes up. If it must go up too, the loop is direct acting. If it must come down, the loop is reverse acting."
          onSite="A loop set the wrong way round drives its valve fully open or fully shut and stays there. If an output sits at one end while the temperature runs away in the same direction, check the action before anything else."
        >
          <p>
            Every controller has to be told which way to push. The easy way to decide is a thought
            experiment: imagine the measured value rising, then ask which way the output must move
            to bring it back.
          </p>
          <ul>
            <li>
              <strong>Heating valve on supply air temperature.</strong> The air gets warmer, so less
              heat is wanted and the valve must close. Rising measurement, falling output:{' '}
              <strong>reverse action</strong>.
            </li>
            <li>
              <strong>Chilled water valve on the same AHU.</strong> The air gets warmer, so more
              cooling is wanted and the valve must open. Rising measurement, rising output:{' '}
              <strong>direct action</strong>.
            </li>
          </ul>
          <p>
            The answer also depends on the hardware. An actuator that closes on a rising signal, or
            a valve body that works the opposite way to the one drawn, flips the answer. This is why
            controllers let the action be chosen in configuration, and why the action has to be
            checked against the real valve during commissioning, not assumed from the schematic.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-2-action"
          question="A chiller’s leaving water temperature loop drives the compressor capacity. As the water gets warmer, what should the output do, and what is that called?"
          options={[
            'Fall, because the water needs less cooling: reverse action',
            'Rise, because more cooling is needed: direct action',
            'Stay still, because chillers control themselves',
            'Rise, because more cooling is needed: reverse action',
          ]}
          correctIndex={1}
          explanation="Warmer water needs more cooling, so capacity must rise as the measurement rises. Rising measurement with rising output is direct action. Calling it reverse action mixes up the label with the plant type."
        />

        <SectionRule />
        <ContentEyebrow>On/off control</ContentEyebrow>

        <ConceptBlock
          title="On/off control needs a gap between its switching points"
          plainEnglish="A thermostat that switches on and off at exactly the same temperature never settles. Give it a gap, on a bit below and off a bit above, and it switches cleanly."
          onSite="The gap goes by several names on site: differential, switching differential, hysteresis, or deadband. On a mechanical stat it is often a separate adjustment next to the setpoint."
        >
          <p>
            The simplest loop has only two output states: full on or full off. A boiler enable, a
            frost protection pump, an electric heater battery stage, an extract fan on a high
            temperature stat. For heating, the plant runs below the setpoint and stops above it; for
            an extract fan on a high-temperature stat it is the other way round.
          </p>
          <p>
            With a single switching point that does not work for long. The measurement is never
            perfectly steady, so near the setpoint it crosses back and forth constantly and the
            plant chatters. Contactors wear, compressors and burners short-cycle, and a motor that
            starts every few seconds runs hot. The cure is to separate the two switching points: the
            plant switches on at one value and does not switch off until the measurement has
            travelled to a second, different value. The distance between them is the{' '}
            <strong>differential</strong>.
          </p>
          <p>
            The price of the differential is that the measured value never sits still. It rises to
            the upper switching point, overshoots a little while the plant runs down, falls to the
            lower point, undershoots while the plant gets going, and repeats. For a frost stat or a
            plant room extract fan that is perfectly acceptable. For a laboratory or an office where
            people notice every swing, it is usually not, which is why modulating control exists.
            Every overshoot above the setpoint on a heating loop is also heat the building did not
            ask for.
          </p>
          <p>
            Choosing the differential is a balance. Too narrow and the plant short-cycles. Too wide
            and the space swings further than the occupants will tolerate. On an outstation the
            differential is a software setting, so it can be set precisely; on a mechanical stat it
            is partly down to friction in the mechanism and is less exact.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-2-differential"
          question="A heater battery stage on/off loop has its differential widened. What changes?"
          options={[
            'The stage switches more often and the temperature holds closer to setpoint',
            'The stage stops switching altogether',
            'The loop changes from reverse to direct action',
            'The stage switches less often, but the temperature swings further',
          ]}
          correctIndex={3}
          explanation="A wider gap means the temperature has further to travel before the state changes, so the stage cycles less and the space swings more. Narrowing it does the opposite, down to the point where the stage chatters."
        />

        <ConceptBlock
          title="The neutral zone: heating and cooling must never overlap"
          plainEnglish="Set the heating to stop well before the cooling starts. In the band between them, the room is allowed to drift and nothing runs."
          onSite="When a fan coil or chilled beam is heating and cooling at the same time, look first at the two setpoints and who set them. It is often two systems by two contractors with nobody owning the handshake between them."
        >
          <p>
            Many spaces can be heated and cooled: a four-pipe fan coil, an AHU with both coils, a
            room with radiators and a cooling unit. If the heating setpoint and the cooling setpoint
            are the same, or overlap, the two will fight. The radiator warms the room past the
            cooling setpoint, the cooling starts, pulls the room below the heating setpoint, and the
            heating comes back on. Both run, the room feels fine, and the energy is thrown away.
          </p>
          <p>
            The answer is a <strong>neutral zone</strong>, also called a deadband: a band of
            temperature between the heating and cooling setpoints in which neither runs. Below the
            band the heating works; above it the cooling works; inside it the space floats. The
            wider the neutral zone, the less chance of the two ever running together, and the less
            energy is spent holding a room at one exact temperature that nobody can feel.
          </p>
          <p>
            Good controls go further and interlock heating and cooling so they cannot run at once in
            the same space, even if somebody later narrows the setpoints. When the heating and the
            cooling were installed by different contractors on different controllers, that interlock
            is the thing most often missed, because each system works correctly on its own.
          </p>
        </ConceptBlock>

        <Scenario
          title="An office floor that is heating and cooling at once"
          situation="The tenant on the third floor of an office building complains the space feels fine but the energy bill has climbed since a fit-out. The perimeter has LTHW radiators on the BMS. The fit-out contractor added ceiling cassettes on their own controllers, each with a wall controller the occupants can adjust. Trends show the radiator valves open and the cassettes cooling for most of the afternoon."
          whatToDo="Do not chase either system on its own: each is doing what its controller asks. Put the radiator heating setpoint and the cassette cooling setpoints side by side and you will usually find them overlapping, or the cassettes set below the radiator setpoint by occupants. The fix is a neutral zone between the two, limits on how far occupants can move the cassette setpoint, and an interlock, via the BMS or a hardwired signal, so the cassettes cannot cool while the perimeter heating is running in the same zone. That is a controls engineer’s change, but your trend reading is what finds it."
          whyItMatters="Fighting plant hides well. Nobody is uncomfortable, nothing alarms, and every item of equipment passes a functional test. It only shows when somebody reads the trends together, which is a habit worth building early."
        />

        <SectionRule />
        <ContentEyebrow>Proportional action</ContentEyebrow>

        <ConceptBlock
          title="Proportional: how far off are we?"
          plainEnglish="The further the temperature is from setpoint, the further the valve opens. Small error, small nudge. Large error, large push. It reacts straight away."
          onSite="On the head end you may see this set as gain or as proportional band. They are two ways of saying the same thing, one the reciprocal of the other, so check which the controller uses before comparing settings between sites."
        >
          <p>
            A modulating loop can put its output anywhere between fully shut and fully open. The
            first and most basic way it decides where is <strong>proportional action</strong>: the
            output moves in step with the error. If the supply air is a little cool, the heating
            valve opens a little. If it is very cool, the valve opens a lot. The response is
            immediate: the moment the error changes, the output changes with it.
          </p>
          <p>
            How hard the controller reacts is set by the <strong>gain</strong>. A higher gain gives
            a bigger output change for the same error. Older controllers and many BMS packages
            express the same setting as a <strong>proportional band</strong>: the size of the error
            needed to drive the output from one end of its range to the other. A wide band is a
            gentle controller; a narrow band is an aggressive one. To put it in words rather than
            formulae: with a gain of 2, a 5 per cent change in the measurement moves the output 10
            per cent, and the same controller described as a proportional band would read 50 per
            cent. On many BMS outstations the band is entered in the units of the measurement, in
            kelvin for a temperature loop, rather than as a percentage. Either way, a wider band is
            a gentler loop.
          </p>
          <p>
            Proportional control is simple and stable, and on its own it is enough for some loops.
            But it has a built-in limitation that you will see on trends.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Offset: why proportional control alone settles off setpoint"
          plainEnglish="To hold the valve partly open, a proportional controller needs some error to work from. So it settles a little away from setpoint, and how far away depends on how hard the plant is working."
          onSite="Offset that changes with the weather, the time of day or the occupancy is a strong hint the loop has little or no integral action. A sensor fault does not usually track the load like that."
        >
          <p>
            Think about what proportional action means when the space is exactly at setpoint. The
            error is zero, so the proportional output is at its starting point. On a cold day the
            heating valve needs to be well open to hold the temperature. The only way a proportional
            controller can produce that bigger output is to have a bigger error. So the loop settles
            where the error is just large enough to keep the valve where the load needs it: below
            setpoint.
          </p>
          <p>
            That standing difference is called <strong>offset</strong>. On a mild day the load is
            smaller, the valve needs less opening, and the offset shrinks or reverses. Turning up
            the gain reduces the offset, but only up to a point: push it too far and the loop starts
            to swing. To get rid of offset properly, the controller needs something that keeps
            working for as long as an error remains. That is integral action.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-2-offset"
          question="A proportional-only LTHW flow temperature loop holds setpoint on a mild day but settles below it on a cold one. What would remove that standing error?"
          options={[
            'Narrowing the differential',
            'Switching the loop to direct action',
            'Adding integral action',
            'Adding derivative action',
          ]}
          correctIndex={2}
          explanation="The standing error is proportional offset, and it grows with load. Integral action keeps moving the output while any error remains, so it drives the valve to wherever the load needs and returns the flow temperature to setpoint. Derivative responds to speed of change and does nothing for a steady error."
        />

        <SectionRule />
        <ContentEyebrow>Integral action</ContentEyebrow>

        <ConceptBlock
          title="Integral: how long have we been off?"
          plainEnglish="If the temperature stays below setpoint, integral action keeps opening the valve a little more, and a little more, until the error has gone. It is the impatient part of the controller."
          onSite="Integral is labelled reset, integral time or reset rate. Set as a time (minutes per repeat), a shorter time means stronger integral action. Set as a rate (repeats per minute), a bigger number means stronger action. Check the units before you compare two controllers."
        >
          <p>
            Integral action adds up the error over time. A small error that persists builds into a
            large correction; a large error builds faster. While any error remains, the integral
            part keeps moving the output. It only stops moving when the measurement is back at
            setpoint. That is exactly what proportional action could not do, and it is why a
            proportional-plus-integral controller, <strong>PI</strong>, is the most common
            arrangement you will meet. It gives the immediate reaction of proportional action, and
            then integral finishes the job and removes the offset.
          </p>
          <p>
            The two settings interact, and they can work against each other. Strong gain with strong
            integral produces a loop that overshoots and swings for a long time before it settles.
            Weak gain with weak integral produces a loop that creeps towards setpoint so slowly that
            the occupants complain before it gets there. Somewhere between those is a loop that
            reaches setpoint briskly and settles with little overshoot. Finding that point is
            tuning, and on a BMS it is the controls engineer’s job.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Integral windup: storing up trouble while the plant cannot keep up"
          plainEnglish="If the valve is already fully open and the room still is not warm, integral action keeps adding up the error anyway. When the room finally gets there, all that stored-up error has to unwind, and the room overshoots."
          onSite="Look for an output pinned at 100 per cent for a long period followed by a big overshoot. Morning warm-up after a cold weekend, and plant that was off while the loop stayed live, are classic times for it."
        >
          <p>
            Integral action assumes that moving the output will eventually fix the error. Sometimes
            it cannot. The boiler plant may be undersized for a cold snap. The heating may be
            switched off by a time programme while the loop is still enabled. An actuator may have
            failed with the valve shut. In each case the error persists, and the integral term keeps
            accumulating it, driving the output to its limit and beyond in its own arithmetic.
          </p>
          <p>
            That is <strong>windup</strong>. When conditions change and the measurement finally
            reaches setpoint, the controller does not simply back off. It has stored a large amount
            of error, and that must be cancelled out by error in the opposite direction before the
            output comes away from its limit. The valve stays open well past setpoint, the space
            overshoots, and the loop may swing for some time afterwards.
          </p>
          <p>
            Most BMS controllers include anti-windup features: clamping the integral term when the
            output is at its limit, or holding the loop disabled while the plant it controls is not
            running. Whether they are enabled is a strategy setting. If you see a loop that behaves
            well all day but overshoots badly every Monday morning, windup is a good first suspect.
          </p>
        </ConceptBlock>

        <Pullquote>
          Proportional reacts to how far off the measurement is. Integral reacts to how long it has
          been off. Derivative reacts to how fast it is moving.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Derivative action</ContentEyebrow>

        <ConceptBlock
          title="Derivative: how fast is it changing?"
          plainEnglish="If the temperature is climbing quickly towards setpoint, derivative action eases off the valve early, like braking before a junction rather than at it. It works against rapid change."
          onSite="On most BMS loops the derivative setting will be zero. Do not take that as a fault. It is usually a deliberate choice."
        >
          <p>
            Derivative action looks at the rate at which the measurement is changing and pushes
            against it. If the supply air temperature is rising fast towards setpoint, derivative
            trims back the heating output before the setpoint is reached, so the temperature arrives
            gently instead of shooting past. Used well, it lets the other two terms be set more
            aggressively without overshoot, which suits steady, slow-responding plant with a clean
            measurement.
          </p>
          <p>
            The weakness is noise. Derivative cannot tell a genuine change from a jittery signal. A
            sensor in turbulent air just downstream of a fan, or a pressure signal that flickers,
            has a rate of change that jumps about all the time, and derivative turns that into an
            output that jumps about too. The valve or damper is driven back and forth for no
            benefit, which wears actuators and linkages. Because most real measurements carry some
            noise, derivative is frequently left out, and the loop runs as PI.
          </p>
          <p>
            Some controllers calculate derivative from the measurement only, not from the error.
            That stops a sudden setpoint change from kicking the output, because the setpoint jump
            is not a change in the measurement. You do not need to know which a controller uses, but
            you may see the option in its configuration.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-2-derivative"
          question="A duct static pressure loop runs as PID. The fan drive speed reference flickers constantly, although the average pressure is close to setpoint. What is the likely reason?"
          options={[
            'Integral windup from an earlier saturation',
            'Derivative reacting to pressure signal noise',
            'A proportional band set much too wide for the duct',
            'Proportional offset growing as the load changes',
          ]}
          correctIndex={1}
          explanation="Derivative responds to the rate of change of the measurement, and a noisy pressure signal changes rapidly all the time, so the output jitters while the average is fine. Windup shows as an output pinned at a limit. A wide band gives a gentle, sluggish loop. Offset is a steady error, not flicker."
        />

        <SectionRule />
        <ContentEyebrow>Reading a loop’s behaviour</ContentEyebrow>

        <ConceptBlock
          title="Sluggish, swinging or steady: what the trend tells you"
          plainEnglish="A loop that is too slow needs more push. A loop that swings needs less. But a loop that hunts with a stepping valve usually needs a mechanical repair, not new settings."
          onSite="Trend the measurement, the setpoint and the output on the same chart. Almost every loop problem is visible once the three are side by side, and almost none are visible from one of them on its own."
        >
          <p>
            You will rarely be asked to tune a loop. You will often be the person standing next to
            the plant when it misbehaves, and the most useful thing you can do is recognise the
            shape on the trend and rule out the faults that sit in your trade.
          </p>
          <ul>
            <li>
              <strong>Sluggish.</strong> The measurement creeps towards setpoint and takes far too
              long to recover from a disturbance. Typically too little gain, too little integral, or
              both.
            </li>
            <li>
              <strong>Swinging.</strong> The measurement overshoots, comes back, undershoots and
              keeps going in slowly decaying or steady waves. Typically too much gain or too much
              integral, or a sensor sited so far from the coil that the loop only sees each change
              long after it made it.
            </li>
            <li>
              <strong>Hunting with a stepping output.</strong> The valve moves in jumps, sits still,
              then jumps the other way, and the measurement cycles either side of setpoint. Usually
              a valve or actuator that will not move smoothly.
            </li>
            <li>
              <strong>Pinned at a limit.</strong> The output sits at 0 or 100 per cent while the
              measurement stays away from setpoint. The plant cannot do what is asked, the action is
              set the wrong way, or the output is not reaching the device.
            </li>
          </ul>
          <p>
            The third case deserves care. A valve with a sticky stem or an actuator with slack in
            its linkage will not move until the signal has changed far enough to overcome the
            friction, then jumps and sticks again. Integral action keeps trying to correct the small
            error the valve leaves behind, the valve jumps past the point it was aiming for, and the
            loop cycles indefinitely. No tuning cures that. The fix is the valve, the actuator or
            the coupling.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Rule out the field before anyone touches the settings"
          plainEnglish="Most loops that worked once and stopped working have not been mistuned. Something in the field has changed."
          onSite="When a controls engineer does tune a loop, they will often want it in manual and the output stepped by hand to watch how the plant responds. Agree with the building manager first, because the space will drift while the test runs."
        >
          <p>Before tuning is blamed, work round the loop the same way the signal travels:</p>
          <ul>
            <li>
              <strong>Sensor.</strong> Is it reading a believable value, and is it where the drawing
              says? A supply air sensor moved too close to a coil, or a room sensor on a sunny wall,
              gives the loop the wrong question to answer. Section 2.4 covered siting.
            </li>
            <li>
              <strong>Output.</strong> Does the signal at the actuator terminals match what the head
              end says it is sending? A broken core or a wrong termination can leave the actuator at
              a fixed position whatever the output reads.
            </li>
            <li>
              <strong>Actuator and valve.</strong> Does the valve follow the signal smoothly and
              through its full travel? Is the coupling tight on the spindle? Is it set for the right
              direction?
            </li>
            <li>
              <strong>Plant.</strong> Is there heat or cooling available? A loop cannot hold supply
              air temperature from a heating coil with no hot water behind it.
            </li>
          </ul>
          <p>
            Only when all four are proved is it a tuning question. That order matters, because
            retuning a loop to cope with a sticky valve or a misplaced sensor hides the fault, and
            the loop misbehaves again in a different season.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Retuning a loop to cover a mechanical fault"
          whatHappens="An AHU supply temperature loop starts hunting. Someone slows the integral right down and lowers the gain until the hunting stops. It looks fixed. In fact the heating valve actuator has a worn coupling and now the loop is so sluggish that it takes most of the morning to recover from start-up, and in summer the cooling loop on the same actuator type does the same thing."
          doInstead="Trend the output against the measurement and watch the valve move. If the output changes smoothly but the valve moves in steps, the fault is mechanical: repair or replace the actuator, coupling or valve and leave the tuning as it was. Record what you found so the controls engineer knows the settings were never the problem."
        />

        <SectionRule />
        <ContentEyebrow>Loops working together</ContentEyebrow>

        <ConceptBlock
          title="Cascade control: one loop sets the target for another"
          plainEnglish="An outer loop decides what it needs and hands that to an inner loop as its setpoint. The inner loop does the quick, fiddly work so the outer loop does not have to."
          onSite="On a schematic, cascade shows as a setpoint for one loop that is not a fixed number but comes from another loop’s output. If a supply temperature setpoint keeps moving on the head end, it may well be the output of a room or return air loop."
        >
          <p>
            In cascade control the output of one controller, the <strong>primary</strong> or outer
            loop, becomes the setpoint of another, the <strong>secondary</strong> or inner loop.
            Each measures something different about the same process. The arrangement works only if
            the inner loop responds faster than the outer one, so that it has finished each job
            before the outer loop asks for the next.
          </p>
          <p>Building services use it constantly:</p>
          <ul>
            <li>
              <strong>Room or return air temperature setting supply air temperature.</strong> The
              room responds slowly. The supply air responds within moments of the valve moving. So
              the room loop works out what supply temperature it needs, and the supply loop drives
              the coil valves to hold that. A change in the water temperature arriving at the coil
              is corrected by the supply loop before the room ever notices.
            </li>
            <li>
              <strong>VAV boxes.</strong> A pressure-independent VAV box has an airflow sensor and
              its own flow loop driving the damper. The room temperature loop sets the airflow
              target; the flow loop holds the airflow at that target regardless of how the duct
              pressure changes as other boxes open and close.
            </li>
          </ul>
          <p>
            For fault finding, cascade means you check the inner loop first. If the supply loop
            cannot hold its own setpoint, nothing the room loop does will help.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Sequence control: one output, several devices, in turn"
          plainEnglish="One temperature controller drives the heating, the free cooling and the mechanical cooling one after another, so the cheapest way of meeting the demand is always used first and heating and cooling never overlap."
          onSite="When you commission or check a sequenced AHU, step the controller output by hand across its range and watch each device take over from the last. Any point where two opposing devices are both open is a fault."
        >
          <p>
            An AHU often has a single supply temperature loop with one output, split across several
            devices. As demand for heat falls and demand for cooling rises, the output works through
            them in order: the heating valve closes, then the mixing dampers bring in more outside
            air to cool with, then the cooling valve opens. Each device has its own slice of the
            controller output. This is <strong>sequence control</strong>, sometimes called split
            range.
          </p>
          <p>
            Two limits sit on top of the sequence. While the space is occupied, the fresh air damper
            never closes below its minimum fresh air position, because that air is there for the
            people, not for temperature. And the damper stage only opens further for free cooling
            when the outside air is cooler than the air it replaces. On a hot day the strategy holds
            the dampers at minimum and goes straight to mechanical cooling.
          </p>
          <p>
            The important arrangement for heating and cooling is the one where the two valves work
            from opposite ends of the output and are both shut at the midpoint, so the air is either
            heated or cooled but never both. That gap in the middle is the same idea as the neutral
            zone earlier on this page, built into a single loop instead of two separate setpoints.
          </p>
          <p>
            Sequences are configured in software, so they can be wrong in software. Overlapping
            slices, a damper stage that never gets its turn, or a cooling valve wired to the heating
            output all produce plant that runs and passes a quick look, while wasting energy or
            failing to hold temperature at the edges of the season.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-2-cascade"
          question="A room loop is cascaded onto a supply air temperature loop. The room is too cold, and the supply air temperature is well below its own setpoint with the heating valve output at 100 per cent. Where do you look first?"
          options={[
            'The room loop tuning, as it is not asking for enough heat',
            'The neutral zone setting between the heating and cooling',
            'The room sensor siting, in case it is reading low',
            'The heating valve, actuator and hot water supply',
          ]}
          correctIndex={3}
          explanation="The room loop is asking for heat and the supply loop is trying its hardest, so the outer loop is doing its job. The inner loop cannot reach its setpoint even with the output at its limit, so the fault is between that output and the coil: the valve, the actuator, or no hot water arriving."
        />

        <SectionRule />

        <FAQ
          items={[
            {
              question: 'Will I be expected to tune PID loops as an electrician?',
              answer:
                'Not usually. Tuning belongs to the controls engineer who wrote the strategy. What you will do is wire and prove the sensor and output, check the actuator travels fully and in the right direction, and recognise when a loop problem is actually a field fault. That last part is where most loop problems are solved.',
            },
            {
              question: 'Why do so many BMS loops show zero for the derivative setting?',
              answer:
                'Because most measurements carry some noise, and derivative turns noise into a jittery output that wears valves and actuators. PI control removes offset and is easier to tune, so derivative is often left off on purpose. A zero there is not a fault.',
            },
            {
              question: 'Is deadband the same thing as differential?',
              answer:
                'The words get used loosely on site. Strictly, the differential is the gap between switch-on and switch-off on one on/off loop, and the neutral zone is the band between heating and cooling setpoints where neither runs. Both are called deadband by many people, so check what the person or the drawing means.',
            },
            {
              question:
                'The head end shows the valve being driven open, but the valve looks shut. What now?',
              answer:
                'Measure the signal at the actuator terminals and compare it with what the head end reports. If the signal is right and the valve has not moved, look at the actuator, its coupling and the valve. If the signal is wrong, work back along the cable to the output terminals. Do not touch the tuning until the output is proved to reach the valve.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Every loop measures, compares with a setpoint, drives an output and watches the plant respond. Check the action is set the right way for the real valve.',
            'On/off control needs a differential so it does not short-cycle. Heating and cooling need a neutral zone, and ideally an interlock, so they never run together.',
            'Proportional reacts to how far off, integral to how long, derivative to how fast. Most loops you meet are PI.',
            'Proportional alone leaves an offset that changes with load. Integral removes it but can wind up when the plant cannot keep up.',
            'Sluggish means too little action, swinging means too much, and a stepping output with hunting usually means a sticky valve or slack actuator.',
            'Prove the sensor, the output, the actuator and the plant before anyone retunes a loop.',
            'Cascade puts a fast inner loop under a slow outer one; check the inner loop first. Sequence control drives several devices from one output, with heating and cooling never overlapping.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-3-section-1"
          prevLabel="The plant a BMS runs"
          nextHref="/study-centre/upskilling/bms-module-3-section-3"
          nextLabel="Time and occupancy"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule3Section2;
