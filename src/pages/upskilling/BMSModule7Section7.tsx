/**
 * BMS Module 7 · Section 7 — Fault finding on a BMS
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. A new page with no predecessor: the last
 * lesson in the course, and the one that pulls the rest of it together. It teaches a
 * repeatable method rather than a list of faults — confirm the symptom with the person who
 * reported it, read the alarms and trends, follow the point from the head end to the
 * controller to the field device, and split the problem in half until it has nowhere left to
 * hide. It covers measuring a 4–20 mA loop (in series, or with a clamp meter that reads
 * milliamps) and a 0–10 V signal (across the input), the faults that turn up again and again
 * (open and short circuit sensors, uncoupled actuators, Hand/Off/Auto left in Hand, overrides
 * left on, schedule and holiday errors, RS-485 termination, polarity, biasing and duplicate
 * addresses), safe working on panels with more than one source of supply and plant that can
 * restart on its own, and where the electrician hands over to the controls engineer.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fault finding on a BMS | BMS Module 7.7 | Elec-Mate';
const DESCRIPTION =
  'A repeatable BMS fault-finding method: confirm the symptom, read alarms and trends, follow the point out to the field, measure 4–20 mA and 0–10 V signals safely.';

const outcomes = [
  'Use a repeatable method on any BMS fault: confirm the symptom, read alarms and trends, then follow the point from the head end to the controller to the field device',
  'Split a fault in half to decide whether it lies in the device, the wiring, the controller input or the software',
  'Measure a 4–20 mA loop correctly (in series by breaking the loop, with a clamp meter that reads milliamps, or without breaking it at test terminals) and measure a 0–10 V signal across the input',
  'Recognise the common BMS faults: sensors reading open or short circuit, actuators stuck or uncoupled, Hand/Off/Auto left in Hand, overrides left in place, and schedule or holiday errors',
  'Diagnose RS-485 comms faults from the pattern of devices that drop out: termination, biasing, polarity, duplicate addresses and cable breaks',
  'Work safely on control panels with more than one source of supply and on plant that can restart without warning, and know when to call the controls engineer',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A facilities manager reports that "the heating is broken on the third floor". What should you do before opening any panel?',
    options: [
      'Replace the room sensor, since that is the most common cause',
      'Put the heating pump in Hand so the floor warms up',
      'Ask what they see, where, since when, and what changed',
      'Restart the outstation that serves the third floor',
    ],
    correctIndex: 2,
    explanation:
      '"Broken" can mean too cold, too hot, noisy, or one radiator. Pinning down the symptom, the place, the time it started and what changed recently tells you where to look. Putting the pump in Hand masks the fault and creates a new one; restarting an outstation destroys evidence and may restart plant.',
  },
  {
    id: 2,
    question:
      'A space temperature reads correctly on the head end and at the controller input, but the room is plainly much colder than shown. Where is the fault most likely to be?',
    options: [
      'At the sensor: its position or the device itself',
      'In the head end graphics, which are showing a stale value',
      'In the network between the controller and the head end',
      'In the controller scaling, which needs changing in software',
    ],
    correctIndex: 0,
    explanation:
      'The head end and the controller agree, so the network and the scaling are passing the signal faithfully. The disagreement is between the signal and the real room, which puts the problem at the sensor: a failed device, or one mounted where it does not see the room air. Changing the scaling to "fix" it would hide a field fault.',
  },
  {
    id: 3,
    question:
      'You need to measure the current in a 4–20 mA loop with an ordinary multimeter. What does that involve?',
    options: [
      'Setting the meter to mA and probing across the input terminals',
      'Setting the meter to DC volts and probing across the transmitter',
      'Measuring the loop resistance with the supply disconnected',
      'Breaking the loop and inserting the meter in series',
    ],
    correctIndex: 3,
    explanation:
      'With an ordinary meter and no test terminals on the loop, current is measured in series, so the loop must be opened and the meter inserted on its milliamp range. A meter on its current range is close to a short circuit, so probing it across the input terminals bypasses the input rather than measuring the loop. Opening the loop interrupts the signal, so the controller and anyone watching need warning first.',
  },
  {
    id: 4,
    question:
      'A pressure transmitter on a 4–20 mA loop has a pair of terminals marked Test. What are they for?',
    options: [
      'Connecting a milliammeter to read loop current without breaking the loop',
      'Injecting a test voltage to check the insulation of the loop cable',
      'Linking out the transmitter so the controller reads a fixed 20 mA',
      'Connecting a voltmeter to read the loop supply at the transmitter',
    ],
    correctIndex: 0,
    explanation:
      'Test terminals sit across a diode inside the transmitter. A milliammeter connected across them carries the whole loop current, and when it is removed the diode carries it again, so the signal is never interrupted. They are not for insulation testing, which would damage the electronics, and they do not link out or fix the signal. Elsewhere in the loop, a meter on its milliamp range across terminals shorts the input.',
  },
  {
    id: 5,
    question:
      'A heating valve is commanded to 100% on the head end, the 0–10 V output measures correctly at the actuator terminals, but the flow temperature does not move. What should you check next?',
    options: [
      'The controller output card, as it may be faulty',
      'Whether the actuator moves and is coupled to the valve',
      'The PID tuning, as the loop may be too slow to respond',
      'The head end, as the command may not have reached the controller',
    ],
    correctIndex: 1,
    explanation:
      'The signal has been proved at the actuator terminals, so the controller, the output and the wiring are all doing their job. Next is the device: is the actuator driving, is it coupled to the spindle, is its manual override engaged, is the valve seized? Tuning and the head end are upstream of a point you have already proved.',
  },
  {
    id: 6,
    question:
      'An AHU supply fan runs through the night although the time programme says it should be off. Which is the most likely cause to check first?',
    options: [
      'A failed fan motor contactor that has welded closed',
      'A comms fault between the outstation and the head end',
      'A wrong supply air temperature setpoint',
      'A switch left in Hand, or an override left on',
    ],
    correctIndex: 3,
    explanation:
      'Plant that runs outside its programme has usually been told to by someone: a local switch left in Hand after maintenance, or a software override that was never released. Check both, and the holiday and exception schedules, before suspecting hardware. A welded contactor is possible but far less common, and a comms fault would not normally start a fan.',
  },
  {
    id: 7,
    question:
      'On an RS-485 network, every device beyond a certain point drops offline at once, while those nearer the controller keep working. What does that pattern point to?',
    options: [
      'A cable break or bad joint at about that point',
      'A duplicate address on one of the devices that still works',
      'A wrong baud rate set on the controller itself',
      'Too much traffic on the network from the head end',
    ],
    correctIndex: 0,
    explanation:
      'When everything downstream of one place fails together, the cable is telling you where to look: a broken conductor, a loose daisy-chain terminal or a disturbed joint near that point. A wrong baud rate on the controller would take out every device, and a duplicate address usually causes erratic, intermittent behaviour rather than a clean cut-off.',
  },
  {
    id: 8,
    question: 'Where should line terminations sit on a two-wire RS-485 trunk?',
    options: [
      'At every device, so each one sees a matched line',
      'Only at the controller end, because that is where the signal starts',
      'At the two ends of the trunk, and never on a spur',
      'On every spur cable, at the device end',
    ],
    correctIndex: 2,
    explanation:
      'The trunk is terminated at its two ends because signals travel in both directions, and no more than two terminations are allowed on one pair. Terminating every device or every spur loads the line and causes the very comms errors you are trying to clear. Terminating one end only leaves reflections at the other.',
  },
  {
    id: 9,
    question:
      'You are about to work in a BMS control panel. You have isolated the main incoming supply and proved it dead. What else must you consider?',
    options: [
      'Nothing more, as the panel is safe once the main supply is proved dead',
      'Other supplies: relay feeds, a UPS, plant interlocks',
      'Only the 24 V control supply, which is always independent',
      'Only whether the outstation has a battery backup for its memory',
    ],
    correctIndex: 1,
    explanation:
      'A BMS panel can carry voltages that come from elsewhere: relay contacts switching plant fed from another board, a separate supply to the controller, a UPS, or interlock circuits from other panels. Each must be identified and isolated or proved safe before you touch it. The 24 V supply is not always independent, and a memory battery is not the hazard here.',
  },
  {
    id: 10,
    question:
      'You have proved the sensor, the wiring and the controller input healthy, but the controller still drives the valve the wrong way. What is the right next step?',
    options: [
      'Reverse the wiring at the actuator so the valve moves correctly',
      'Change the control strategy yourself using the engineer login',
      'Leave the valve in Hand at a fixed position and close the job',
      'Record what you proved and pass it to the controls engineer',
    ],
    correctIndex: 3,
    explanation:
      'Once the field side is proved, a wrong action is in the software (control direction, sequence or scaling), which is the controls engineer’s work. Hand over your measurements so they start from proven facts. Swapping wires to make the software look right leaves a hidden fault for the next person, and leaving it in Hand creates a new one.',
  },
];

const BMSModule7Section7 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 7"
        title="Fault finding on a BMS"
        backTo="/study-centre/upskilling/bms-module-7"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          A method that works on any BMS fault: start with the person, read what the system already
          knows, then follow the point out to the field and halve the problem until you find it.
        </p>

        <TLDR
          points={[
            'Confirm the symptom with the person who reported it before you touch anything. "The heating is broken" is not a fault description.',
            'Read the alarms and trends first. The BMS has usually recorded when the fault started and what changed at the same moment.',
            'Follow the point outward: head end, then controller, then field device. Wherever two stages disagree, the fault is between them.',
            'Measure a 4–20 mA loop in series (break the loop) or with a clamp meter that reads milliamps; measure 0–10 V across the input. 0 mA on a 4–20 mA loop means a broken loop.',
            'Most faults are ordinary: a sensor open or short, an actuator uncoupled, a switch left in Hand, an override left on, a wrong holiday date, an RS-485 termination or address problem.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Before the tools come out</ContentEyebrow>

        <ConceptBlock
          title="Confirm the symptom with the person who reported it"
          plainEnglish="Find out exactly what is wrong, where, since when, and what changed. Five minutes of questions saves an afternoon of looking in the wrong place."
          onSite="Go and stand in the room, or look at the plant, with the person who complained. Seeing the symptom yourself is the first test, and it is free."
        >
          <p>
            Fault reports arrive second-hand and vague. &ldquo;The heating is broken&rdquo; might
            mean one office is cold, a whole floor is cold, the radiators are hot but the room is
            not, or a fan is noisy. Each of those starts somewhere different, so the first job is to
            turn the report into a fault description you could hand to someone else.
          </p>
          <p>Ask, and write down the answers:</p>
          <ul>
            <li>
              <strong>What exactly</strong> do they see, hear or feel? Too hot, too cold, stuffy,
              lights on all night, plant tripped, an alarm on the screen?
            </li>
            <li>
              <strong>Where:</strong> one room, one zone, one floor, the whole building? A single
              room points to a local device; a whole floor points to plant, a controller or a
              network.
            </li>
            <li>
              <strong>When:</strong> all the time, first thing in the morning, only at weekends,
              only on hot afternoons? A pattern in time is often a pattern in the time programme.
            </li>
            <li>
              <strong>Since when</strong>, and <strong>what changed</strong>? A fit-out, a
              maintenance visit, a power cut, a software update, the clocks going back. Faults
              rarely appear on a day when nothing happened.
            </li>
          </ul>
          <p>
            Then see it for yourself. A complaint you cannot reproduce may be real but intermittent,
            which changes how you hunt for it; or it may be a comfort issue rather than a fault,
            which is a different conversation.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Read the alarms and the trends before you pick up a screwdriver"
          plainEnglish="The BMS has been watching the building the whole time. Ask it what happened before you start opening panels."
          onSite="Pull up the trend for the problem point alongside the things that should move with it: the setpoint, the valve or damper command, the plant enable. Faults show up as lines that stop agreeing."
        >
          <p>
            Before anything else, look at what the system already holds. The{' '}
            <strong>alarm log</strong> tells you what the BMS noticed and when: a sensor fault, a
            device offline, a high or low limit, a plant failure. The time stamp on the first alarm
            is often the most useful number you will find all day, because it lets you ask what else
            happened at that moment.
          </p>
          <p>
            <strong>Trends</strong> show behaviour over time, and that is where most faults give
            themselves away. A few patterns worth recognising:
          </p>
          <ul>
            <li>
              A reading that goes <strong>flat</strong> at one value while the building clearly
              changes: a stuck sensor, a lost comms value being held, or a point in manual.
            </li>
            <li>
              A reading that <strong>jumps</strong> to the top or bottom of its range and stays
              there: typically an open or short circuit on the sensor or its wiring.
            </li>
            <li>
              A command that moves while the result does not: the valve is told to open fully and
              the temperature never changes. The signal is going out; something past it is not
              responding.
            </li>
            <li>
              A loop that <strong>hunts</strong> up and down around its setpoint: a tuning or
              actuator problem, usually one for the controls engineer.
            </li>
            <li>
              Plant that starts and stops at the <strong>wrong times:</strong> the time programme, a
              holiday or exception schedule, or the controller clock.
            </li>
          </ul>
          <p>
            Check the list of <strong>overrides</strong> and points in manual at the same time. Most
            head ends can show every point that is currently overridden; that list is short on a
            well-run site and very informative on a badly run one.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-7-trends"
          question="A trend shows a room temperature sitting perfectly flat at the same value for three days while every neighbouring room rises and falls normally. What does that suggest?"
          options={[
            'The room is very well insulated and holds its temperature',
            'The point is stuck, held after a comms loss, or in manual',
            'The heating in that room is controlling perfectly to setpoint',
            'The trend log interval has been set too long',
          ]}
          correctIndex={1}
          explanation="Real rooms move. A dead-flat line while neighbours rise and fall means the value is not live: a sensor stuck, a value held by the head end after the device stopped reporting, or a point left in manual at a fixed value. Check the point status before trusting the number."
        />

        <SectionRule />
        <ContentEyebrow>Follow the point out to the field</ContentEyebrow>

        <ConceptBlock
          title="Head end, then controller, then field device"
          plainEnglish="Check the value in three places, working outward. Where two places disagree, the fault sits between them."
          onSite="Write the three readings side by side in your notebook. It keeps you honest, and it is exactly what the controls engineer will want if you hand the job on."
        >
          <p>
            Every point is a chain: the field device, its wiring, the controller input or output,
            the software that scales and uses it, the network, and the head end that displays it.
            Any link can fail while the others look healthy. The quickest way to find the broken
            link is to check the same point at three stages, working from the screen outward:
          </p>
          <ul>
            <li>
              <strong>At the head end.</strong> What does the point say, what is its status (normal,
              fault, offline, overridden), and when did it last update?
            </li>
            <li>
              <strong>At the controller.</strong> Using the controller display, a service tool or a
              laptop on the local port, what does the controller itself see on that input or send on
              that output? If the head end and the controller disagree, the problem is in the
              network or the head end, not the field.
            </li>
            <li>
              <strong>At the field device.</strong> Measure the real signal at the device terminals
              and compare it with the real conditions: a calibrated thermometer next to the sensor,
              your eyes on the damper. If the controller and the device agree but the real world
              does not, the device itself is wrong.
            </li>
          </ul>
          <p>
            For an output, run the chain the other way: what does the head end command, what does
            the controller output, what arrives at the actuator, and does the actuator move the
            thing it is meant to move?
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Split the problem in half"
          plainEnglish="Every measurement should cut the list of suspects in half. Device, wiring, input, software: find out which half the fault is in, then halve again."
          onSite="Measuring at a midpoint, such as a marshalling terminal or a junction box, often saves a walk to the far end of the building."
        >
          <p>
            Once you know which point is wrong, there are four places the fault can live: the{' '}
            <strong>device</strong>, the <strong>wiring</strong>, the{' '}
            <strong>controller input or output</strong>, and the <strong>software</strong>{' '}
            (configuration, scaling, logic). A good measurement rules out half of them at once.
          </p>
          <ul>
            <li>
              Measure the signal at the controller terminals. If it is correct there but the
              controller reads it wrongly, the fault is in the input or the software, and the field
              side is cleared.
            </li>
            <li>
              If the signal is wrong at the controller, measure it at the device. Correct at the
              device and wrong at the controller means the wiring. Wrong at the device means the
              device.
            </li>
            <li>
              For a passive sensor, disconnect it and measure it directly. A healthy reading at the
              sensor but a wrong one at the controller is a wiring or termination problem.
            </li>
            <li>
              Where you can, substitute: a known resistance in place of a sensor, a calibrator in
              place of a transmitter. If the controller reads the substitute correctly, the input
              and software are proved.
            </li>
          </ul>
          <p>
            The discipline is to change one thing at a time and to measure rather than guess. Swap
            three parts at once and the fault may clear, but you will not know which part was bad or
            whether you have created a second fault.
          </p>
        </ConceptBlock>

        <Pullquote>
          A wrong number on a screen is a claim made by a chain of devices. Check the chain one link
          at a time, from the screen outward, and the fault will be between the last place that
          agreed and the first place that did not.
        </Pullquote>

        <Scenario
          title="Cold offices every Monday, and no hardware fault at all"
          situation="An office manager reports that the second floor is cold every Monday morning until about lunchtime, then fine for the rest of the week. Maintenance have already replaced one room sensor and the problem has not changed."
          whatToDo="Start with the questions: it is the whole floor, only Mondays, and it began after the late spring bank holiday. On the head end, the trend for the second-floor zones shows the heating starting much later on Mondays than on other days. The weekly time programme is the same every day, so you look at the exception and holiday schedule: the bank holiday entry was set up as a recurring weekly exception instead of a single date, so every Monday the zone runs the reduced programme. You record the finding and pass it to the controls engineer or the site's authorised operator to correct, then check the trend the following Monday."
          whyItMatters="The symptom pointed at time, and time faults live in schedules, not sensors. Replacing the sensor cost a visit and a part and proved nothing because nobody asked when the fault happened. The trend and the schedule found it without a single measurement."
        />

        <SectionRule />
        <ContentEyebrow>Safe working throughout</ContentEyebrow>

        <ConceptBlock
          title="Panels with more than one supply, and plant that starts on its own"
          plainEnglish="A BMS panel can be dead on its main switch and still have live terminals inside, and plant you are working on can start because the BMS told it to."
          onSite="Before you open a panel, read the drawings for every supply that enters it. Before you work on plant, stop the BMS from being able to start it, not just the plant from running now."
        >
          <p>
            Section 1.6 covered the hazards; fault finding is where you meet them most. Much BMS
            fault finding means measuring in panels that are live, and the Electricity at Work
            Regulations 1989 expect you to work dead unless live work is justified: it must be
            unreasonable for the circuit to be dead, reasonable to work on or near it live, and
            suitable precautions must be taken to prevent injury. Use probes and leads that meet HSE
            GS38. Treat every terminal as possibly at 230 V until you have proved otherwise: relay
            outputs switching contactor coils, and 230 V actuator or damper supplies, often sit on
            the same rail as 24 V and 0–10 V inputs. Keep these in front of you:
          </p>
          <ul>
            <li>
              <strong>Other sources of supply.</strong> A BMS panel often contains circuits fed from
              somewhere else: volt-free relay contacts switching plant that is supplied from another
              board, interlock circuits from motor control panels, a separate supply to the
              controller, or a UPS. Isolating the panel main switch does not make these dead.
              Identify each one from the drawings and the labels, isolate or prove it, and never
              assume a terminal is safe because the panel isolator is off.
            </li>
            <li>
              <strong>Plant that can restart.</strong> A fan, pump or compressor that is stopped may
              only be stopped because the BMS has not asked it to run yet. The time programme, an
              optimum start, frost protection or an alarm reset can bring it on while your hands are
              in it. Isolate and lock off the plant itself at its local isolator, not just the BMS
              command.
            </li>
            <li>
              <strong>Stored and generated energy.</strong> Drives store energy. After isolating a
              variable speed drive, wait at least the discharge time printed on it and prove dead at
              its terminals before touching the drive or the motor cables. A fan can also be turned
              by draught from other plant, and an EC or permanent-magnet motor turned by its load
              generates voltage at its own terminals, so stop and secure the impeller as well as
              isolating it.
            </li>
            <li>
              <strong>Interrupting signals affects the building.</strong> Lifting a sensor wire or
              breaking a loop changes what the controller sees, and the controller will act on it:
              open a valve fully, start a boiler, raise an alarm that wakes someone up. Tell the
              site, and put the affected loop or output into a safe held state before you disconnect
              anything.
            </li>
            <li>
              <strong>Fire priority stays intact.</strong> Whatever you override or hold for
              testing, never create a path that could run a fan or reopen a damper the fire strategy
              has stopped. The fire signal has to win over every manual and automatic command.
            </li>
          </ul>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 Section 557"
          clause="Section 557 covers auxiliary circuits (control, signalling and measurement). The supply for an auxiliary circuit may be dependent on, or independent of, the main circuit, according to its function."
          meaning={
            <>
              <p>
                This is why a BMS panel can still be live after you have isolated the plant it
                controls, or dead when you expected it to be live. Whether a control circuit is fed
                from the main circuit or separately was a design choice, and you need to know which
                before you work on it.
              </p>
              <p>
                Read the schematic for the panel, find every auxiliary supply that enters it, and
                prove each one dead at the point of work.
              </p>
            </>
          }
          cite="Section 557 and Regulation 557.3.1 context, verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <InlineCheck
          id="bms-7-7-restart"
          question="You need to change a belt on an AHU supply fan. The BMS shows the fan off and outside its time programme. What makes it safe to work on?"
          options={[
            'The BMS shows it off, and the programme will not start it',
            'Overriding the fan off on the head end for the duration',
            'Isolating and locking off the fan at its local isolator, and proving it dead',
            'Asking the site to tell you if anyone changes the programme',
          ]}
          correctIndex={2}
          explanation="The BMS can start the fan at any time: frost protection, an optimum start, an alarm reset or someone releasing the override. Only isolating the fan itself, locking it off and proving it dead protects you. A head-end override is a software state that anyone with access can change."
        />

        <SectionRule />
        <ContentEyebrow>Measuring the signal</ContentEyebrow>

        <ConceptBlock
          title="Measuring a 4–20 mA loop: in series, or with a milliamp clamp"
          plainEnglish="Current is measured by putting the meter in the path of the current. That means opening the loop, so warn people first, or using a clamp meter that is sensitive enough to read milliamps."
          onSite="Before you break a loop, put the controller output or the plant it drives into a safe held state and tell the site. The value will drop to nothing while the loop is open, and the controller will react to that."
        >
          <p>
            A 4–20 mA signal is carried by the current in the loop, so current is what you measure.
            With an ordinary multimeter that means <strong>breaking the loop:</strong> lifting one
            wire at a terminal, and connecting the meter <strong>in series</strong> on its milliamp
            range, so the loop current flows through it.
          </p>
          <p>
            Opening the loop interrupts the signal twice: once when you lift the wire, once when you
            remove the meter. Each time, the controller sees the signal disappear. Before you do it:
          </p>
          <ul>
            <li>Tell the site and anyone who watches the alarms that the point will drop out.</li>
            <li>
              If the signal is a measurement feeding a control loop, put that loop or its output
              into manual or a held value so the controller does not drive the plant in response to
              a vanished reading.
            </li>
            <li>
              If the signal is a command to an actuator, decide what position the valve or damper
              should sit at while the signal is broken, and hold it there.
            </li>
          </ul>
          <p>
            The alternative is a <strong>clamp meter rated for milliamps</strong>. These use a
            sensitive Hall-effect sensor that can read the small DC current in a single loop
            conductor without breaking anything. Zero the meter before clamping on, holding it in
            the same orientation you will measure in, and keep it away from strong magnetic fields
            such as large motors or transformers, which can upset the reading. An ordinary AC/DC
            clamp meter for load currents will not resolve a few milliamps.
          </p>
          <p>
            There are two more ways to read loop current without breaking the loop. Some
            transmitters have an extra pair of terminals marked <strong>Test</strong>, with a diode
            already fitted inside. A milliammeter connected across those terminals carries the whole
            loop current while it is connected, and the diode carries it again when the meter is
            removed, so the signal is never interrupted. A test diode can also be fitted in the loop
            at a junction box or terminal strip for the same purpose. This only works at terminals
            made for it: anywhere else, a meter on its milliamp range across terminals shorts the
            input, as the common mistake below shows.
          </p>
          <p>
            Some controller inputs read a 4–20 mA loop as a voltage across a precision resistor at
            the input. Where the manufacturer gives the resistor value, you can measure the voltage
            across the input with nothing disconnected and turn it into current with Ohm&rsquo;s
            law. A 250 ohm resistor, for example, gives 1 to 5 V for 4 to 20 mA.
          </p>
          <p>
            Interpreting the reading is simple. 4 mA is the bottom of the range and 20 mA the top,
            so the midpoint, 12 mA, is half range. Because the range starts at 4 rather than 0, a
            reading of <strong>0 mA is not a valid value:</strong> it means the loop is broken: a
            wire off, a blown loop fuse, a failed transmitter or no loop supply. That live zero is
            one of the main reasons 4–20 mA is used.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Measuring 0–10 V, and checking passive sensors"
          plainEnglish="A voltage signal is measured across the controller input, with nothing disconnected. A passive sensor such as a thermistor is checked by disconnecting it and measuring its resistance."
          onSite="Carry the sensor manufacturer's resistance table, or have it on your phone. A resistance reading means nothing until you can compare it with the temperature it should represent."
        >
          <p>
            A <strong>0–10 V</strong> signal is measured with the meter on DC volts,{' '}
            <strong>across the input terminals:</strong> signal and common, with the circuit left
            connected and working. Nothing is broken, so the controller carries on as normal. Work
            out what voltage you expect for the conditions you can see (half range should be about 5
            V), then compare. Measure at both the controller and the device: a correct voltage at
            the device and a low one at the controller suggests a poor termination or a damaged
            cable.
          </p>
          <p>
            Unlike 4–20 mA, a 0–10 V signal has no live zero. A broken wire reads 0 V, which the
            controller treats as a genuine minimum. And on 24 V AC actuators the signal common is
            usually the same conductor as one leg of the 24 V supply. If an actuator&rsquo;s two
            supply legs are swapped, or several actuators on one transformer do not share the same
            leg as the controller common, readings shift, actuators misbehave and controller outputs
            can be damaged. Check each actuator&rsquo;s supply legs and common against the wiring
            diagram.
          </p>
          <p>
            Many BMS temperature sensors are <strong>passive:</strong> a thermistor or a platinum
            resistance element whose resistance changes with temperature, read directly by the
            controller input. To check one, isolate the input, disconnect the sensor, and measure
            its resistance. Compare the reading with the manufacturer&rsquo;s table for the actual
            temperature, measured with a calibrated thermometer beside it.
          </p>
          <p>
            Know which way your sensor goes, because it tells you what an open or short circuit will
            look like on the screen:
          </p>
          <ul>
            <li>
              A <strong>negative temperature coefficient (NTC) thermistor</strong> falls in
              resistance as it warms. An open circuit looks like an enormous resistance, so the
              point reads very cold; a short circuit reads very hot.
            </li>
            <li>
              A <strong>platinum resistance element</strong> rises in resistance as it warms. An
              open circuit reads very hot; a short reads very cold. Extra resistance in long or
              poorly terminated cable makes it read slightly high.
            </li>
          </ul>
          <p>
            Many controllers report a point that has gone right to the end of its range as a sensor
            fault rather than a temperature, which is exactly the clue you are after.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Probing a current loop with the meter on its milliamp range"
          whatHappens="An electrician sets the meter to mA and puts the probes across the input terminals, as if measuring voltage. On its current range the meter is close to a short circuit, so it bypasses the controller input instead of measuring the loop. The controller sees the signal vanish, the plant reacts, and the meter's fuse may blow, while the number on the meter means nothing."
          doInstead="Decide first what you are measuring. For current, break the loop and put the meter in series, after warning the site and holding the loop, or use a clamp meter rated for milliamps. For voltage, set the meter to DC volts and measure across the terminals. Never move the probes on to a circuit while the meter is still on a current range."
        />

        <InlineCheck
          id="bms-7-7-ntc"
          question="A room temperature point suddenly shows a reading far colder than anything possible in the building and the controller flags a sensor fault. The sensor is an NTC thermistor. What is the most likely fault?"
          options={[
            'An open circuit in the sensor or its wiring',
            'A short circuit across the sensor terminals',
            'A wrong setpoint entered on the head end',
            'A duplicate address on the comms network',
          ]}
          correctIndex={0}
          explanation="An NTC thermistor's resistance falls as it warms, so very high resistance means very cold. An open circuit looks like infinite resistance, which the controller reads as an impossibly low temperature. A short would read impossibly hot. A setpoint or address problem would not change the measured value in this way."
        />

        <SectionRule />
        <ContentEyebrow>The faults you will meet again and again</ContentEyebrow>

        <ConceptBlock
          title="Sensors and actuators"
          plainEnglish="Sensors fail open, fail short, or tell the truth about the wrong place. Actuators get stuck, get uncoupled, or get left in manual."
          onSite="When you find an actuator, check three things before you blame the controls: is it moving, is it coupled to the spindle or shaft, and is its manual override engaged?"
        >
          <p>
            <strong>Sensors reading open or short circuit</strong> show up as values jammed at the
            end of the range, or as a sensor fault alarm. The cause is usually a loose terminal, a
            damaged cable (often after other trades have been working nearby), water in a junction
            box, or a failed element.
          </p>
          <p>
            <strong>Sensors telling the truth about the wrong thing</strong> are harder, because the
            reading is plausible. A room sensor in direct sun or next to a printer, a duct sensor
            not fully inserted, an immersion sensor whose pocket is a poor fit so it reads the pipe
            rather than the water. The signal is perfect; the measurement is wrong. Compare with a
            calibrated thermometer and look at where the sensor actually is.
          </p>
          <p>
            <strong>Actuators stuck or uncoupled.</strong> A valve or damper actuator can drive
            happily while the coupling to the spindle or shaft has slipped, so the command and the
            actuator indicator agree but the valve does not move. Valves seize after long periods in
            one position. Many actuators have a manual override or a declutch button which, if left
            engaged after maintenance, stops automatic control. Watch the actuator while the command
            changes, and look at the valve or damper itself, not just the actuator.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Hand, overrides, schedules and holidays"
          plainEnglish="A large share of BMS &lsquo;faults&rsquo; are the system doing exactly what it was told, by someone who forgot to change it back."
          onSite="Before you leave any job, look for anything you put in Hand or overrode and put it back to Auto. Then check the head end override list to make sure."
        >
          <p>
            <strong>Hand/Off/Auto switches left in Hand</strong> are a classic. Somebody runs a pump
            in Hand during maintenance or a breakdown and walks away. The pump now runs regardless
            of the BMS (night, weekend, holiday) and the head end may still show the command as off.
            Equally, a switch left in Off stops plant the BMS thinks it is running. Check the panel
            switch positions against what the BMS expects.
          </p>
          <p>
            <strong>Software overrides left in place</strong> do the same from the head end: a point
            forced on, off, or to a fixed value to test something or to keep a complaining occupant
            happy. Overrides do not expire unless they were set to, and they can sit there for
            months. Most head ends can list them all; read that list on every visit.
          </p>
          <p>
            <strong>Schedule and holiday errors</strong> cause plant to run at the wrong times. Look
            for a holiday entered for the wrong year or as a recurring date, an exception schedule
            nobody removed, a time programme copied from another zone, or a controller clock that
            has drifted or not followed the change between summer time and winter time. Time-shaped
            symptoms (every Monday, every weekend, an hour out) point here first.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Leaving your own override behind"
          whatHappens="During fault finding, an electrician overrides a heating valve to 100% to prove the actuator, and puts a pump in Hand to check rotation. The fault is found and fixed, the job is signed off, and the valve and pump stay as they were. The building overheats for a fortnight and the next fault call is about the fix."
          doInstead="Keep a written list of every switch you move and every point you override, as you do it. Before you leave, work back through the list, return each to Auto, and check the head end override list shows nothing of yours. Tell the site what you changed and what you put back."
        />

        <SectionRule />
        <ContentEyebrow>Comms faults</ContentEyebrow>

        <ConceptBlock
          title="Termination, biasing, polarity, addresses and breaks"
          plainEnglish="On an RS-485 network, read the pattern of what has dropped out. Everything past one point means a break; erratic faults across the whole run suggest termination, biasing or a duplicate address; one device that never talks suggests its own address, polarity or settings."
          onSite="Before you change anything on a comms bus, photograph the terminals and the device settings. Comms faults are often made worse by well-meant changes nobody recorded."
        >
          <p>
            Field networks such as Modbus and BACnet MS/TP usually run on RS-485 twisted pair,
            daisy-chained from device to device. Most comms faults on them come down to a short
            list:
          </p>
          <ul>
            <li>
              <strong>Termination.</strong> The trunk is terminated at its two ends, and only there:
              no more than two terminations on one pair, and none on a spur. A missing terminator,
              or one left switched on at a device in the middle of the run after it was extended,
              causes reflections and intermittent errors.
            </li>
            <li>
              <strong>Biasing (line polarisation).</strong> When nobody is transmitting, the pair is
              not driven and can pick up noise. Some networks need bias resistors to hold the line
              in a known idle state. Where biasing is used it is applied at one place for the whole
              bus, usually at the master, and nowhere else. Bias switched on at several devices is a
              common cause of a network that will not settle.
            </li>
            <li>
              <strong>Polarity.</strong> The two data conductors must go to the matching terminal at
              every device. One device with its pair reversed will not communicate and can disturb
              the others. Manufacturers label these terminals differently, so check each
              device&rsquo;s documentation rather than trusting the letters.
            </li>
            <li>
              <strong>Duplicate addresses.</strong> Every device on a segment needs its own address.
              On Modbus serial line, slaves take addresses from 1 to 247, with 0 reserved for
              broadcast. Two devices with the same address answer the same request and corrupt each
              other, giving erratic, intermittent faults that are maddening until you check.
            </li>
            <li>
              <strong>Settings.</strong> Every device on the bus has to use the same speed and
              character format (parity and stop bits) as the master. A replacement device out of the
              box will often be at its factory default rather than the site setting.
            </li>
            <li>
              <strong>Cable breaks and poor joints.</strong> A broken conductor or a loose
              daisy-chain terminal cuts off everything beyond it. Screens that are broken, or
              earthed at several points, let interference in.
            </li>
          </ul>
          <p>
            Split the network in half just as you would a point. With the bus isolated, open the
            trunk at a midpoint, fit a temporary terminator at the new end, and see which half the
            problem follows. Keep halving until you have found the device or the length of cable
            responsible, then remove the temporary terminator and check the original terminations
            again.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-7-comms"
          question="A Modbus network that worked for years has started dropping devices at random since a new heat meter was added. What should you check first on the new meter?"
          options={[
            'The cable length from the meter to the nearest device on the bus',
            'Its address, speed and parity, and whether its terminator is on',
            'Whether its reading agrees with the main incoming supply meter',
            'The firmware version installed on the BMS master controller',
          ]}
          correctIndex={1}
          explanation="The change coincides with the new device, so start there. A replacement or new device often arrives with a default address that duplicates one already on the bus, the wrong speed or parity, or its own terminator or bias switched on. Any of those can disturb the whole network rather than just the new meter."
        />

        <Scenario
          title="An AHU heating valve driven wide open, and a sensor reading impossibly cold"
          situation="Overnight, the head end raised a sensor fault on an air handling unit's supply air temperature. By morning the heating valve has been driven fully open, the occupied floor is too warm, and the duty engineer has acknowledged the alarm without investigating. The sensor is an NTC thermistor wired back to the AHU control panel through a junction box in the plant room."
          whatToDo="Confirm with the engineer what they saw and when, then read the trend: the supply air reading dropped in a single step to the bottom of its range at a time when a contractor was working in the plant room. That pattern says open circuit, not a real change. You hold the heating output at a safe fixed value with the site's agreement so the floor stops overheating. At the controller the input reads open circuit. At the junction box you isolate the input and measure the sensor side: the resistance is sensible for the duct temperature, so the sensor is healthy. Measuring back towards the panel finds the fault: a conductor pulled out of its terminal where the contractor disturbed the cable. You re-terminate it, check the reading against a thermometer in the duct, release the held output back to auto, and record the fault, the cause and the time."
          whyItMatters="The jump to the end of the range on the trend pointed at the wiring before anyone opened a panel, and the time stamp pointed at the contractor. Splitting at the junction box cleared the sensor in one measurement. Holding the output before you started stopped the fault getting worse while you found it, and releasing it at the end stopped your fix leaving a new fault behind."
        />

        <SectionRule />
        <ContentEyebrow>Knowing where your job ends</ContentEyebrow>

        <ConceptBlock
          title="When to call the controls engineer"
          plainEnglish="Prove the field side: devices, wiring, signals, supplies. When the field side is right and the system still does the wrong thing, the fault is in software, and that is the controls engineer's work."
          onSite="Give them facts, not opinions: the point, the readings at each stage, what you proved and how. A good hand-over turns a day's visit into an hour's."
        >
          <p>
            An electrician on a BMS fault can do a great deal: confirm the symptom, read alarms and
            trends, check field devices, measure signals, find and fix wiring faults, replace
            like-for-like sensors and actuators, and clear hand switches and simple overrides with
            the site&rsquo;s agreement. Call the controls engineer when:
          </p>
          <ul>
            <li>
              The field side is proved healthy and the controller still acts wrongly: the wrong
              direction, the wrong sequence, a loop that hunts. That is strategy, scaling or tuning.
            </li>
            <li>
              The fix needs a change to the control strategy, a setpoint the specification controls,
              a schedule you are not authorised to edit, or a controller restore from backup.
            </li>
            <li>A device needs addressing or configuring beyond what you are trained to do.</li>
            <li>
              The network fault is in the IP side, a gateway or the head end, rather than the cable
              and terminations.
            </li>
            <li>
              You would need a password or access level you have not been given. Using someone
              else&rsquo;s login to get round that is never the answer.
            </li>
          </ul>
          <p>
            Whatever you find, record it: the fault as reported, what you measured and where, what
            you changed, what you put back. A record of observed defects and the corrective action
            taken, with dates, is part of running a BMS properly, and it is what lets the next
            person (or you, in six months) start from facts instead of starting again.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsFaultFinding}
          topic="Watch · fault finding as a method"
          caption="Different system, same discipline: prove the symptom, think before you test, split the circuit, and change one thing at a time. The method on this page is the same approach applied to a BMS."
        />

        <FAQ
          items={[
            {
              question: 'Do I need a special meter for BMS fault finding?',
              answer:
                'A good multimeter that reads DC milliamps, DC volts and resistance will do most of it. A clamp meter that resolves milliamps saves breaking loops, a calibrated thermometer lets you check temperature sensors against reality, and a loop calibrator that can simulate a 4–20 mA or 0–10 V signal makes it easy to prove a controller input. Above all you need the points schedule and the panel drawings.',
            },
            {
              question: 'Can I just reset or restart the outstation to clear a fault?',
              answer:
                'Not as a first step. A restart wipes the evidence (the controller state, sometimes the local alarm history) and can start or stop plant as it comes back. If a restart does clear the fault, you still do not know why it happened. Restore and restart are controls engineer decisions, made with a current backup to hand.',
            },
            {
              question:
                'The site wants the heating back now. Is it acceptable to put the plant in Hand?',
              answer:
                'Not as your own decision. Hand bypasses the BMS, so any safety function the BMS was carrying, such as limits or frost protection, may not act. If the site and the controls engineer decide to run plant in Hand for a short time, that is their decision: it is agreed, labelled on the panel and logged, and the fault still gets a proper fix. What is never acceptable is leaving plant in Hand silently.',
            },
            {
              question:
                'Why is the head end showing a value when the device is plainly disconnected?',
              answer:
                'Many systems hold the last good value when a device stops reporting, and some only flag the point as offline or stale in a status field. That is why you always check the point status and last-update time, not just the number, and why a dead-flat trend is suspicious.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Start with the person: what, where, when, since when and what changed. Then see the symptom for yourself.',
            'Read the alarm log, the trends and the override list before you open a panel. Time-shaped symptoms usually mean schedules, holidays or clocks.',
            'Follow the point from the head end to the controller to the field device. The fault lies between the last stage that agreed and the first that did not.',
            'Measure 4–20 mA in series by breaking the loop, after warning the site and holding the loop, or with a clamp meter that reads milliamps. 0 mA means a broken loop. Measure 0–10 V across the input.',
            'Common faults are ordinary: sensors open or short, sensors in the wrong place, actuators uncoupled or left in manual, hand switches left in Hand, overrides left on.',
            'On RS-485, termination at both ends only, biasing at one place, matching polarity, unique addresses and matching settings clear most comms faults.',
            'Isolate every supply in a panel and lock off plant at its own isolator. Prove the field side, record what you found, and hand software faults to the controls engineer.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-7-section-6"
          prevLabel="Handover"
          nextHref="/study-centre/upskilling/bms-mock-exam"
          nextLabel="Mock exam: 30 questions, 45 minutes"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule7Section7;
