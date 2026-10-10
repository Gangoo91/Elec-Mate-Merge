/**
 * BMS Module 6 · Section 2 — Trend logging
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches what to log and why
 * (a loop is logged as process value, setpoint and output together, with plant status
 * alongside), interval logging against change-of-value logging, where trend data actually
 * lives (a finite buffer in the outstation, collected by the head end), how to read a trend
 * methodically, the shapes that give common faults away (a hunting loop, a sticking valve,
 * plant running out of hours, a sensor that has flatlined) and how trends become
 * commissioning evidence. The old page ("Trend logging and historical data") carried fixed
 * logging intervals per point type, data retention periods, a school "saving £3,000" story
 * and an invented CO2 case study with ppm figures. All of that is gone; trend shapes are
 * described in words and no statistics are used.
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
  RegsCallout,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Trend logging | BMS Module 6.2 | Elec-Mate';
const DESCRIPTION =
  'What to trend on a BMS, interval versus change-of-value logging, outstation and head end storage, and reading trends to find hunting loops, stuck valves and dead sensors.';

const outcomes = [
  'Choose which points to trend for a given question, and log a control loop as process value, setpoint and output together',
  'Explain the difference between interval logging and change-of-value logging, and pick the right one for a point',
  'Describe where trend data is held, from the outstation buffer to the head end, and what happens when collection fails',
  'Read a trend methodically: time axis, scale, related points, then the shape',
  'Recognise the trend shapes of a hunting loop, a sticking valve, plant running out of hours and a flatlined sensor',
  'Use trend logs as commissioning and handover evidence that the plant does what the specification says',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'After the clocks go forward in spring, trends show an AHU starting an hour away from its schedule, though the plant runs normally. What do you check first?',
    options: [
      'Whether the outstation clock changed with the clocks',
      'Whether optimum start has learned a new start time',
      'Whether the AHU starter has been left in Hand',
      'Whether the trend interval was changed recently',
    ],
    correctIndex: 0,
    explanation:
      'A trend is only as good as its timestamps. An outstation clock that did not change in spring makes plant appear to run an hour off schedule, so out-of-hours running can appear or vanish on paper. An exact one-hour shift starting at the clock change points to the clock, not to optimum start, Hand selection or logging settings.',
  },
  {
    id: 2,
    question:
      'A chilled water valve output is trended by change of value with a large increment. The trend shows long flat steps. What is the honest reading of that trend?',
    options: [
      'Moves smaller than the increment are not stored, so steps may hide activity',
      'The valve is sticking, because the trend shows it only ever moving in large steps',
      'The controller is tuned correctly, because the output holds steady between changes',
      'The outstation has lost communication with the head end for long periods',
    ],
    correctIndex: 0,
    explanation:
      'With change-of-value logging, nothing is stored until the value moves by more than the set increment. A coarse increment turns a smoothly modulating output into a staircase. Before blaming the valve or praising the tuning, check how the log is configured.',
  },
  {
    id: 3,
    question:
      'Why is trend data usually sampled and stored in the outstations rather than polled point by point from the head end?',
    options: [
      'Because the head end has no real-time clock, so it cannot timestamp samples',
      'Because outstations keep their data permanently and the head end does not',
      'Because a head end can only display data that it has sampled for itself',
      'Because central polling of every point does not scale as points are added',
    ],
    correctIndex: 3,
    explanation:
      'Pulling every sample across the network to one central machine gets heavier with every point added. Sampling locally spreads that load, and the head end collects the stored samples in bulk. Outstation storage is the short-term part of the chain, not the permanent record.',
  },
  {
    id: 4,
    question:
      'A site network was down for a long weekend. On Tuesday the head end trend for an AHU has a gap. What should you check first?',
    options: [
      'Whether the temperature sensor failed at some point over the weekend',
      'Whether the outstation buffer kept the samples, or overwrote them',
      'Whether the AHU was switched off at its local isolator for maintenance',
      'Whether an operator changed the trend interval during the outage',
    ],
    correctIndex: 1,
    explanation:
      'The outstation keeps logging while the network is down, but its storage is finite. If it held enough, the head end fills the gap on the next collection. If the buffer filled, the oldest samples are gone, depending on how the log is configured. A failed sensor would show as a flat or pinned line, not a gap.',
  },
  {
    id: 5,
    question:
      'A supply air temperature swings steadily above and below setpoint all day, and the heating valve output swings fully open and shut in step with it. What does this shape most likely show?',
    options: [
      'A sensor that has failed and is now reading as an open circuit',
      'Plant running outside its occupied hours on the time schedule',
      'A hunting loop, usually from control settings that are too aggressive',
      'Normal operation, because the average temperature sits close to setpoint',
    ],
    correctIndex: 2,
    explanation:
      'A regular, repeating swing in both the process value and the output is a hunting loop. The average being near setpoint does not make it healthy: the valve and actuator are wearing out and the space sees the swing. Too-aggressive tuning is the usual cause, so it goes to the controls engineer to retune.',
  },
  {
    id: 6,
    question:
      'You step a valve output by hand. The temperature answers each step in the same direction, but every time you reverse direction nothing happens for a while. What does that show?',
    options: [
      'Slack or friction in the valve or actuator',
      'Control settings that are too aggressive for the loop',
      'A sensor placed too far downstream of the coil',
      'A change-of-value increment set too coarse',
    ],
    correctIndex: 0,
    explanation:
      'A pause at every reversal, with normal response otherwise, is a dead band caused by mechanical slack or friction in the final element. Aggressive tuning causes a regular swing, not a pause on reversal. Sensor position and logging settings would not depend on the direction of travel.',
  },
  {
    id: 7,
    question:
      'A room temperature trend is a perfectly straight line for three weeks in a busy office. What is the right conclusion?',
    options: [
      'Control is excellent, because the temperature never moved at all',
      'The setpoint must have been locked at one value by an operator',
      'The trend interval is too long to show any change in temperature',
      'The reading is suspect until the sensor and wiring are checked',
    ],
    correctIndex: 3,
    explanation:
      'Real rooms move: people arrive, the sun comes round, the heating cycles. A dead straight line over weeks points to a failed sensor, a broken connection, a value held by an override, or a point that stopped updating. Check the device and the point before believing the number.',
  },
  {
    id: 8,
    question:
      'You suspect a car park extract fan is running overnight. Which trend proves it one way or the other?',
    options: [
      'The fan speed command overlaid on the outside air temperature trend',
      'Fan run status against its time schedule over several nights',
      'The fan motor hours run, read once at the end of the month',
      'The alarm log for the fan over the whole of the past week',
    ],
    correctIndex: 1,
    explanation:
      'A run status trend against the schedule shows exactly when the fan ran and whether that matched the intended hours, night by night. A command only shows what the BMS asked for, not what the fan did. A single hours-run reading shows a total, not when the hours happened.',
  },
  {
    id: 9,
    question:
      'At commissioning, you want evidence that a weather compensator is working. What should be logged?',
    options: [
      'The boiler run status and the number of boiler starts each day',
      'The room temperature only, so the client can see comfort levels',
      'Outside, compensated flow and room temperatures together',
      'The pump run status and the pump hours run over the test',
    ],
    correctIndex: 2,
    explanation:
      'A compensator varies the flow temperature with outside temperature, so the evidence has to show both moving together, plus the room temperature to prove the space was still satisfied. Boiler starts and pump hours say nothing about whether compensation is doing its job.',
  },
  {
    id: 10,
    question:
      'A transmitter has been heavily damped to give a smooth trend. Why can that be a problem?',
    options: [
      'Its smooth trend may hide real swings the controller reacts to',
      'Damping increases the outstation storage needed for the trend log',
      'A damped signal cannot be logged by the change-of-value method',
      'Damping makes the sensor read high right across its whole range',
    ],
    correctIndex: 0,
    explanation:
      'Damping slows the signal down. The trend looks calm, but the controller is acting on a delayed picture of the process, which can cause the very overshoot and instability the smooth line conceals. Use as little damping as gives stable, readable control.',
  },
];

const BMSModule6Section2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 2"
        title="Trend logging"
        backTo="/study-centre/upskilling/bms-module-6"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          What to record, how often, where the data ends up, and how to read the line on the screen
          so it tells you what the plant has really been doing.
        </p>

        <TLDR
          points={[
            'A trend log records a point over time with a timestamp on every sample. It is how you answer "what was it doing at three in the morning?" without being there.',
            'Log a loop as a set: what it measured, what it was aiming for, and what it did about it, with the plant status alongside. One point on its own rarely explains a fault.',
            'Interval logging samples on a fixed clock. Change-of-value logging stores a sample only when the value moves by a set amount. Each has blind spots you need to know about.',
            'Trend data is usually held first in the outstation, which has limited room, and then collected by the head end. If collection fails for long enough, data is lost.',
            'Faults have shapes: a hunting loop swings, a sticking valve makes a sawtooth, out-of-hours running shows up against the schedule, and a dead sensor goes flat. Trends are also your best commissioning evidence.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What a trend is, and what to log</ContentEyebrow>

        <ConceptBlock
          title="A trend log is the plant's memory, so decide what it should remember"
          plainEnglish="The BMS writes down a value, and the time it wrote it down, again and again. Decide what you are trying to find out first, then log everything that could explain it. Logging a single temperature and hoping is how you end up with a nice graph and no answer."
          onSite="When you are called to a complaint that happened overnight or last week, the trend is the only witness, so ask for it before you open a panel. When a controls engineer asks you to set up or check a trend, ask what question it is meant to answer: it changes which points matter and how often they need sampling."
        >
          <p>
            Every value the BMS knows about can be logged: a real point wired to a sensor or a
            contactor, or a soft point that only exists in the software, such as a calculated
            setpoint or a loop output. Each stored sample is a value and a timestamp. Plotted
            against time, the samples make a trend.
          </p>
          <p>
            A log can run continuously, for the life of the system, or it can be set up for a fixed
            period to answer a particular question and then removed. Both are normal. A building
            with a handful of permanent logs on its key plant, and short-term logs added when a
            problem needs investigating, is a well-run building.
          </p>
          <p>
            The point to hold onto is that the BMS controls in real time, but people investigate
            after the event. The head end shows you what is happening now. Only the trend shows you
            what happened when the complaint was made, and that is usually what you need.
          </p>
          <p>
            <strong>What to log.</strong> Logging costs outstation storage and network traffic, so
            it pays to be deliberate. Logging every point on a site at a short interval &lsquo;just
            in case&rsquo; produces more data than anyone will read, and can crowd out the logs that
            matter. The useful groups are:
          </p>
          <ul>
            <li>
              <strong>Control loops, as a set.</strong> The measured value (the process value), the
              setpoint, and the controller output to the valve, damper or drive. A loop logged as
              one point cannot be diagnosed. With all three on the same graph you can see whether
              the controller is doing its job and whether the plant is answering it.
            </li>
            <li>
              <strong>Plant status against command.</strong> The run command the BMS sent and the
              run status that came back, ideally from a proving device such as a differential
              pressure switch or a flow switch rather than a contactor auxiliary. The gap between
              the two is where many faults live.
            </li>
            <li>
              <strong>The things that drive load.</strong> Outside air temperature, occupancy or
              time schedule state, and where fitted, CO2. These explain why a loop is working hard.
            </li>
            <li>
              <strong>Energy and run data.</strong> Meter readings, hours run and number of starts.
              Hours run and starts can feed planned maintenance, so plant is serviced on what it has
              actually done rather than on the calendar.
            </li>
          </ul>
          <p>
            Short-term investigation logs should be removed once they have served their purpose.
            Dozens of forgotten logs fill storage, slow collection and bury the trends that matter.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-2-loop-set"
          question="A VAV box is not holding its room temperature. Which trend set lets you tell a control problem from a plant problem?"
          options={[
            'Room temperature, outside air temperature and the time schedule',
            'Room temperature, setpoint, damper output and measured airflow',
            'AHU run status, the time schedule and the supply air temperature',
            'Room temperature alone, logged at a much shorter interval',
          ]}
          correctIndex={1}
          explanation="Process value, setpoint and output show whether the controller is responding. The airflow reading shows whether moving the damper actually changes anything. If the output drives the damper open and airflow does not rise, the problem is in the plant, not the control. The other sets explain load or timing, not the loop."
        />

        <SectionRule />
        <ContentEyebrow>How often to record</ContentEyebrow>

        <ConceptBlock
          title="Interval or change of value: two ways to decide when to record"
          plainEnglish="Interval logging writes the value down every so many minutes, whether it has changed or not. Change-of-value logging only writes it down when it moves by more than a set amount, or when a switch changes state."
          onSite="Before you read anything into a trend, find out how it is logged. A line that looks smooth may be widely spaced samples joined up by the graphing software, and on a change-of-value trend a long flat line means either nothing changed or nothing was reported. Those are very different things, and the trend alone cannot tell you which."
        >
          <p>
            <strong>Interval logging</strong> takes a sample at a set period. It suits analogue
            values that drift continuously, such as temperatures and pressures, and it gives a
            regular time axis, so two trends can be lined up and compared sample for sample. It also
            makes it obvious when data is missing, because there is a hole where a sample should be.
          </p>
          <p>
            The interval has to match the speed of the thing you are watching. Slow things, like a
            room temperature or the water in a large heating circuit, can be sampled slowly. Fast
            things, like supply air temperature after a heating coil or a duct static pressure under
            a variable speed fan, need short intervals. If the interval is longer than the swing you
            are hunting for, the samples land at random points on the swing and the trend can look
            like noise, or even look steady. A trend can only show detail it actually recorded.
          </p>
          <p>
            Short intervals across a whole site, though, fill storage quickly and load the network.
            The usual compromise is a sensible permanent interval on key points, and a temporary
            short-interval log on the loop you are investigating.
          </p>
          <p>
            <strong>Change-of-value logging</strong>, usually shortened to COV, stores a new sample
            when the value has moved by more than a set increment since the last one, or, for a
            digital point, when it changes state. It is efficient: values that sit still cost
            nothing, and a pump starting or a filter alarm appearing is caught at the moment it
            happens rather than at the next tick of a clock. For on and off points, COV is usually
            the right choice.
          </p>
          <p>It has two blind spots you must know about:</p>
          <ul>
            <li>
              <strong>The increment hides small movements.</strong> Set it too coarse and a smoothly
              modulating valve looks like a staircase, or a slow drift never registers at all. Set
              it too fine on a noisy signal and it logs almost as much as a very short interval
              would.
            </li>
            <li>
              <strong>Silence is ambiguous.</strong> If the value really did not change, nothing is
              stored. If the device stopped reporting, nothing is stored either. Some systems add a
              periodic refresh so that a quiet point still writes a sample now and then, which
              removes the doubt.
            </li>
          </ul>
          <p>
            Many systems let you choose per point, and some combine the two. As a rule of thumb:
            interval logging for analogue values you want to compare and analyse, change of value
            for digital states and events, and always know which one you are looking at.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-2-cov"
          question="A pump status point is logged by change of value. The trend shows the pump running continuously since Friday, with no samples since. Is the pump definitely still running?"
          options={[
            'Yes, because change of value would have recorded it stopping',
            'Yes, because the trend would show a gap if communications had failed',
            'No, because change of value only records analogue points',
            'Not definitely; a lost connection would also produce no new samples',
          ]}
          correctIndex={3}
          explanation="With change of value, both 'nothing changed' and 'nothing was reported' leave the same silence. Check the live value and the communication status of the device, or look for a periodic refresh sample, before trusting a long quiet stretch."
        />

        <SectionRule />
        <ContentEyebrow>Where the data lives</ContentEyebrow>

        <ConceptBlock
          title="Outstation first, head end second"
          plainEnglish="The controller in the plant room keeps a short diary. Every so often the central computer comes along and copies it into the long-term record."
          onSite="If you power down or replace an outstation, ask whether its stored trend data has been collected first. Anything not yet copied to the head end can go with it."
        >
          <p>
            Pulling every sample of every point across the network to one central machine works on a
            small site and falls over on a large one, because the traffic grows with every point
            added. So in most systems the outstations do the sampling and hold the samples locally.
            The head end then collects them in bulk, either on a routine or when an outstation
            signals that its log is getting full.
          </p>
          <p>
            That split matters for two reasons. First, outstation storage is limited. It is sized
            for days or weeks of recent data, not years, and what happens when it fills depends on
            configuration: typically the oldest samples are overwritten, or the log stops. Second,
            the outstation keeps logging when the network is down, so a short outage normally leaves
            no gap once collection resumes. A long outage can.
          </p>
          <p>
            The head end is where trends become a long-term record. It stores, retrieves and
            displays logged data, and it should be able to archive, condense or delete old data and
            export it in a format other software can read, such as a spreadsheet file. On newer
            systems the long-term store may sit on a server or in a cloud service rather than the
            head end PC, but the principle is the same.
          </p>
          <p>
            One more thing every sample depends on: the clock. A trend is only as good as its
            timestamps. If an outstation clock has drifted, or has not changed with the clocks in
            spring and autumn, its trends will not line up with other plant or with the schedule,
            and out-of-hours running can appear or vanish on paper.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Assuming the head end has everything"
          whatHappens="A log is set up on an outstation, but collection to the head end was never configured, or the outstation has been offline for weeks. Months later someone goes looking for the history of a recurring fault and finds the outstation buffer has been overwriting itself the whole time. The evidence that would have explained the fault no longer exists."
          doInstead="When a log is created, check that it appears at the head end and that new samples arrive there. After any outage, outstation replacement or software reload, confirm collection has resumed. Treat the outstation buffer as a holding area, never as the record."
        />

        <SectionRule />
        <ContentEyebrow>Reading a trend</ContentEyebrow>

        <ConceptBlock
          title="Read the axes before you read the line"
          plainEnglish="Before deciding what the line means, check what you are actually looking at: the time span, the scale, and which points are on the graph."
          onSite="Most wrong conclusions from trends come from a squashed time axis or an auto-scaled vertical axis, not from the plant."
        >
          <p>A repeatable way to read any trend:</p>
          <ul>
            <li>
              <strong>Time axis.</strong> What period is shown, and is it the period of the
              complaint? A week squeezed onto one screen hides everything that happens inside an
              hour.
            </li>
            <li>
              <strong>Vertical scale.</strong> Many trend viewers auto-scale. A swing of a fraction
              of a degree can fill the screen and look alarming; a large swing on a wide scale can
              look flat. Read the numbers on the axis.
            </li>
            <li>
              <strong>Logging method.</strong> Interval or change of value, and at what setting.
              This tells you what the trend could and could not have caught.
            </li>
            <li>
              <strong>Related points.</strong> Put the process value, setpoint, output and plant
              status on the same time base. A temperature drop means little until you see the valve
              was shut, or the pump had stopped.
            </li>
            <li>
              <strong>A fair comparison.</strong> Compare like with like: a Monday with a Monday, a
              cold week with a cold week. Plant behaves differently at weekends and in mild weather,
              and that difference is not a fault.
            </li>
            <li>
              <strong>Then the shape.</strong> Look at a whole day or week first to see the normal
              pattern, then zoom in on the moment things went wrong.
            </li>
          </ul>
          <p>
            Know what normal looks like for the plant. A busy controller output with a steady
            process value is not a fault: the controller is doing its job, adjusting to changes in
            load so the space does not see them. The worry is the other way round, when the process
            value wanders and the output is not responding, or responding without effect.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-2-scale"
          question="A colleague shows you a room temperature trend that fills the screen from top to bottom with jagged peaks and says the loop is wildly unstable. What do you check before agreeing?"
          options={[
            'Whether the room has an occupancy sensor fitted',
            'Whether the trend is logged by interval or change of value',
            'Whether the outstation clock is correct',
            'The numbers on the vertical axis, in case it has auto-scaled a tiny swing',
          ]}
          correctIndex={3}
          explanation="Auto-scaling stretches whatever range the data covers to fill the graph, so a swing of a fraction of a degree can look dramatic. Read the axis values first. The logging method and clock matter too, but neither turns a small swing into a large one."
        />

        <CommonMistake
          title="Chasing a busy controller output"
          whatHappens="Someone sees a valve output trend moving up and down all day and decides the valve or the controller is faulty. The actuator is changed, or the loop is detuned to calm the output down. The room temperature, which was steady before, now drifts every time the load changes."
          doInstead="Judge the loop by the process value against setpoint first. A busy output with a steady process value is a controller absorbing changes in load, which is its job. Only look further when the process value is wandering, swinging, or failing to follow the output."
        />

        <Pullquote>
          A trend never lies about what was recorded. It can easily mislead about what happened.
          Know the interval, the scale and the logging method before you trust the shape.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Fault shapes</ContentEyebrow>

        <ConceptBlock
          title="Loop faults: the hunting loop and the sticking valve"
          plainEnglish="A hunting loop keeps swinging above and below where it should be, with the valve or damper swinging in step. A sticking valve is different: the controller keeps asking for a bit more, nothing happens, then the valve jumps too far and the whole thing repeats the other way."
          onSite="You will often hear a hunting loop before you see the trend: an actuator that never stops moving, or a fan that keeps speeding up and slowing down. If a loop shows the sticking pattern, test the valve and actuator in the field: drive the output by hand in small steps and watch whether the stem follows each step or only moves after several."
        >
          <p>
            <strong>The hunting loop.</strong> On the trend, the process value oscillates around the
            setpoint in a regular rhythm, and the output swings in step with it, often from fully
            open to fully shut. The average may sit close to setpoint, which is why hunting is easy
            to dismiss. It should not be: the actuator, valve and drive are working constantly,
            wearing out early, and the space or the downstream plant feels every swing.
          </p>
          <p>
            The usual cause is control settings that are too aggressive for the plant, which is a
            job for the controls engineer to retune. But check the simple things first, because some
            of them are yours: a sensor in the wrong place, too far from the coil so the loop reacts
            late, or an oversized valve that makes a big change for a small movement. Both make a
            loop much harder to hold steady, and retuning only partly hides them.
          </p>
          <p>
            Beware the opposite trap too. A transmitter that has been heavily damped gives a
            pleasingly smooth trend, but the controller is then acting on a delayed version of the
            truth. The loop can overshoot and swing while the trend looks calm, because the trend
            only shows what the damped signal reported.
          </p>
          <p>
            <strong>The sticking valve.</strong> Friction in a valve stem, a seized spindle or a
            slipping actuator linkage gives a distinctive shape. The controller output ramps slowly
            in one direction while the process value stays still. Then the valve breaks free, the
            process value jumps, overshoots the setpoint, and the output begins ramping the other
            way. The output becomes a sawtooth; the process value moves in steps rather than
            smoothly.
          </p>
          <p>
            A related clue shows up if the output is stepped by hand: the process value answers
            every change in the same direction, but each time the direction reverses there is a
            pause before anything happens. That dead band at every reversal is mechanical slack or
            friction in the final element.
          </p>
          <p>
            Retuning will not cure a sticking valve; it just changes the rhythm. A valve that never
            moves at all is the extreme case: the output goes to its limit and stays there while the
            process value ignores it entirely.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-2-sticking"
          question="On a heating coil loop, the valve output climbs for several minutes while supply air temperature is flat, then the temperature leaps past setpoint and the output starts falling. The cycle repeats. What do you check first?"
          options={[
            'The loop tuning, because the controller is too aggressive',
            'The supply air sensor calibration',
            'The valve and actuator, for friction or a slipping linkage',
            'The time schedule for the air handling unit',
          ]}
          correctIndex={2}
          explanation="An output that ramps with no response and then a sudden jump is stick-then-slip in the final element. The tuning is not the root cause and retuning only changes the timing. Exercise the valve by hand and watch the stem."
        />

        <CommonMistake
          title="Retuning a loop that has a mechanical fault"
          whatHappens="A loop that cycles is handed to the controls engineer for retuning. The settings are softened until the swinging is slower, and the job is closed. The real cause, a valve sticking on its spindle or an actuator slipping on its linkage, is still there, and the loop still never settles."
          doInstead="Look at the shape before anyone touches the tuning. A smooth, regular swing in both process value and output points to tuning. A sawtooth output with a stepping process value points to the valve or actuator, which needs a mechanical check in the plant room first."
        />

        <ConceptBlock
          title="Plant running out of hours"
          plainEnglish="Put the plant run status next to the time schedule. If the plant runs when the schedule says off, something is keeping it on."
          onSite="Look at several nights and a weekend, not one night. A fault that happens on Saturdays only, or only on cold nights, is a clue in itself."
        >
          <p>
            This is the trend that most often pays for itself. Overlay the run status of a boiler,
            AHU, fan or pump on its occupancy schedule, and over a week the pattern is obvious: the
            plant should start and stop with the schedule, perhaps a little earlier where optimum
            start is used. Running well outside that, night after night, is waste.
          </p>
          <p>Common reasons, and how the trend helps tell them apart:</p>
          <ul>
            <li>
              <strong>Override left on.</strong> The run status ignores the schedule completely and
              the command shows a manual value. Often a Hand/Off/Auto selector left in Hand, or a
              software override nobody cleared.
            </li>
            <li>
              <strong>Schedule wrong.</strong> The plant follows a schedule exactly, but it is the
              wrong one: a holiday not entered, clocks not changed, or times set for a tenant who
              has gone.
            </li>
            <li>
              <strong>A protection function doing its job.</strong> Plant that starts on cold nights
              and stops when it warms is often frost protection, which is correct. The outside
              temperature trend shows it.
            </li>
            <li>
              <strong>Status without command.</strong> The BMS command is off but the run status
              says running. The plant is being held on by something outside the BMS, or the status
              signal itself is wrong. Either way, it is worth a site visit.
            </li>
          </ul>
        </ConceptBlock>

        <Scenario
          title="An office AHU that never seems to switch off"
          situation="A facilities manager says the main air handling unit in a four-storey office can be heard running at night. The head end shows it off when anyone checks during the day. You are asked to look at it before the controls engineer's next visit."
          whatToDo="Set up, or ask for, a trend of the AHU run command, run status from the airflow switch, the time schedule state and outside air temperature, at a short enough interval to see starts and stops. Leave it a week. If command and status both follow a pattern that starts every night at the same time, the schedule is wrong. If status shows running while the command is off, go to the starter panel: check the hand/off/auto switch and any local timer or override, and whether the airflow switch is giving a true status. If it only runs on cold nights, check the outside temperature against the frost settings before calling it a fault."
          whyItMatters="A spot check during the day can never catch a night-time fault, and guessing leads to the wrong fix. A week of the right points on one graph turns 'it seems to run at night' into a known cause, and gives the controls engineer something firm to act on."
        />

        <ConceptBlock
          title="The flatlined sensor"
          plainEnglish="A real temperature or pressure always wanders a little. A line that is dead straight for days, or stuck at the very top or bottom of the scale, usually means the reading is not real."
          onSite="When you are sent to a sensor because its trend has gone flat, check the field wiring and terminations, the supply where the sensor needs one, and the input configuration at the outstation, then compare against a calibrated reference instrument."
        >
          <p>Several faults produce a flat line, and each looks slightly different:</p>
          <ul>
            <li>
              <strong>Pinned at a range limit.</strong> An open or short circuit on a sensor input
              typically drives the reading to one end of its range, or to a value the outstation
              treats as invalid. The trend drops or jumps to that value and sits there.
            </li>
            <li>
              <strong>Frozen at a plausible value.</strong> The point has stopped updating, or an
              override is holding it, and the last good value is repeated. This is the dangerous
              one, because the number looks believable. The give-away is the absence of any movement
              at all where the real quantity would vary.
            </li>
            <li>
              <strong>Never right in the first place.</strong> A sensor that was never powered or
              connected, or an input configured for the wrong sensor type, can give a steady value
              from the day of installation.
            </li>
          </ul>
          <p>
            A simple protection is to give important sensors high and low limits, so that a reading
            outside the believable range raises an alarm or a service message. That catches pinned
            values. Frozen values are caught by people who know what normal looks like and notice
            when the line stops breathing.
          </p>
          <p>
            When you have fixed a sensor fault, look at the trend again a day later. A line that has
            started to move with occupancy and weather is the confirmation that the repair worked
            and the point is reporting the real quantity, not just a different steady number.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-2-flatline"
          question="A return air temperature trend suddenly drops to the bottom of its scale at 10:42 and stays there. Nothing else on the AHU changed. What is the most likely cause?"
          options={[
            'The return air temperature really fell, and the heating needs checking',
            'A fault on the sensor circuit, such as a broken connection, has pinned the reading',
            'The trend has switched to change-of-value logging',
            'The head end has stopped collecting data from the outstation',
          ]}
          correctIndex={1}
          explanation="A real return air temperature cannot fall to the end of the scale in an instant with the rest of the plant unchanged. A sudden jump to a range limit that then sits dead still is the signature of a sensor circuit fault. A collection failure would leave a gap, not a pinned value."
        />

        <SectionRule />
        <ContentEyebrow>Trends as evidence</ContentEyebrow>

        <ConceptBlock
          title="Trends prove the plant does what the specification says"
          plainEnglish="Instead of saying the controls work, show a graph of them working, with the right points, over long enough to be convincing."
          onSite="When you finish a job that affects a loop, a short trend of the loop settling back to setpoint is the best proof you can leave. It protects you as much as it reassures the client."
        >
          <p>
            Point-to-point testing proves each signal arrives in the right place. Functional testing
            proves the plant does the right thing when it is asked. Trends prove it keeps doing it,
            under real conditions, over time. Good commissioning uses all three. Examples of trend
            evidence:
          </p>
          <ul>
            <li>
              <strong>Weather compensation.</strong> Outside temperature, the compensated flow
              temperature and room temperature logged together show the flow temperature following
              the weather while the rooms stay comfortable.
            </li>
            <li>
              <strong>Fresh air control.</strong> CO2 or airflow logged alongside the fresh air
              damper position shows ventilation responding to occupancy.
            </li>
            <li>
              <strong>Sequencing.</strong> Run status of each boiler, chiller or pump shows lead and
              lag units starting and stopping in the right order, rotation of the lead unit, and
              standby taking over when a unit trips.
            </li>
            <li>
              <strong>Loop stability.</strong> Each key loop settling to setpoint after a change,
              without hunting, is the plain evidence that tuning is acceptable.
            </li>
            <li>
              <strong>Time control.</strong> Plant run status against the schedule over a week shows
              the programme is set correctly, holidays included.
            </li>
          </ul>
          <p>
            The trending system itself is also checked at commissioning: logs are set up as
            specified, the clock is right, data arrives at the head end and can be displayed and
            archived. A record of how each trend log is configured belongs in the handover pack, so
            the next engineer knows what is being recorded and how.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L, Volume 2 (England, 2021 edition, in force now)"
          clause="In a new building whose heating, air-conditioning or combined system has an effective rated output above 180 kW, a building automation and control system should be installed (para 6.66). In an existing building of that size, a system that is being installed or replaced should meet the same specification (para 6.67). Para 6.72 then says the system should comply with BS EN ISO 16484, continuously monitor, log and analyse energy use and allow it to be adjusted, and detect losses in efficiency of the heating, ventilation and air conditioning. From 24 March 2027 the 2026 edition takes over, with the same rules at paras 5.76, 5.77 and 5.84 to 5.85."
          meaning="On these buildings, logging energy and plant data is not an optional extra; it is part of what the system is expected to do. Trend logs that are set up, collected and actually looked at are how that expectation is met in practice. The 2021 edition notes that a BS EN 15232 Class A system meets these points. The 2026 edition names BS EN ISO 52120-1 instead, which has already replaced EN 15232 as a standard. Specifying by class means you can check after installation that functions such as trend logging are really in place and working."
          cite="ADL Vol 2 (2021) paras 6.66, 6.67, 6.72; from 24 March 2027, ADL Vol 2 (2026) paras 5.76, 5.77, 5.84–5.85"
        />

        <Scenario
          title="Handing over a heating system with proof"
          situation="You have completed the electrical side of a plant room refit at a primary school: new pumps, new valve actuators, new sensors, all wired back to an existing outstation. The controls engineer has done the point-to-point and functional tests. The head teacher wants to know the heating will work properly when the weather turns."
          whatToDo="Agree with the controls engineer a set of trends to run through the first cold spell: outside temperature, compensated flow temperature, a few representative classroom temperatures, pump run status and the valve outputs, plus the boiler and pump run status against the school's time schedule. Confirm the logs appear at the head end and new samples arrive. After a week, review them together: flow following the weather, classrooms reaching temperature by the start of the day, no hunting on the valves, and plant off at night and at the weekend."
          whyItMatters="A one-off test on a mild afternoon proves the wiring, not the performance. A week of trends shows the system working in the conditions it was built for, gives the school something they can understand, and gives everyone a known-good baseline to compare against if a complaint comes in later."
        />

        <FAQ
          items={[
            {
              question: 'How often should I set the logging interval?',
              answer:
                'There is no single right number. Match the interval to how quickly the quantity changes and to the question you are asking: slow values like room temperatures can be sampled slowly, fast loops like supply air temperature or duct pressure need short intervals while you investigate them. Check the specification for the site, and remember that short intervals across many points fill outstation storage and load the network.',
            },
            {
              question: 'Can I set up trend logs myself, or is that the controls engineer’s job?',
              answer:
                'That depends on the site, your access level and what you have been trained on. On many systems operators are expected to create and remove short-term logs, and doing so does not change the control strategy. If you are not authorised on the head end, ask the controls engineer for the points and interval you need. Either way, do not delete or change existing permanent logs without agreement.',
            },
            {
              question:
                'Why does the trend show a straight line between two points with nothing in between?',
              answer:
                'Most trend viewers join samples with a straight line. If the logging is change of value, or the interval is long, there may be no samples in that stretch at all, so the straight line is drawn by the software, not recorded by the plant. Turn on sample markers if the viewer has them, and check the logging method before reading anything into the gap.',
            },
            {
              question: 'How long is trend data kept?',
              answer:
                'It depends on the specification for the site and on how the head end is set up to archive, condense or delete old data. The outstation only holds recent samples; the long-term record is whatever the head end, server or cloud service keeps. If history matters for a job, such as proving how plant behaved over last winter, check what is actually retained before you rely on it.',
            },
            {
              question: 'Can I get trend data out of the BMS to analyse it elsewhere?',
              answer:
                'Usually yes. Head end software is normally able to export logged data in a form other programs can read, such as a spreadsheet file, and newer systems may offer access for analytics software. Check the timestamps and units survive the export, and that you know which time zone and clock change setting the data uses.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Trend logs record values with timestamps so you can see what plant did when nobody was watching. Decide the question first, then choose the points.',
            'Log a control loop as process value, setpoint and output together, with plant command and proven status alongside. One point on its own rarely explains a fault.',
            'Interval logging gives a regular, comparable record but misses anything faster than the interval. Change-of-value logging is efficient but hides movements below its increment, and its silence is ambiguous.',
            'Outstations hold recent samples in limited storage; the head end collects them into the long-term record. Confirm collection is working, and keep clocks right.',
            'Learn the shapes: a regular swing is a hunting loop, a sawtooth output with a stepping value is a sticking valve, run status off the schedule is out-of-hours running, and a dead straight or pinned line is a suspect sensor.',
            'A smooth trend is not automatically a good one. Heavy damping, coarse logging and auto-scaling can all hide real behaviour.',
            'Trends are commissioning and handover evidence. Record how each log is set up and hand that over with the system.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-6-section-1"
          prevLabel="Alarms"
          nextHref="/study-centre/upskilling/bms-module-6-section-3"
          nextLabel="Graphics and dashboards"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule6Section2;
