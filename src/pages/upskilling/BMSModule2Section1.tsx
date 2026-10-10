/**
 * BMS Module 2 · Section 1 — Points: digital and analogue, inputs and outputs
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches the four hardware point types (DI, DO,
 * AI, AO) from the controller's point of view, volt-free contacts and what "normally open" really
 * means, the difference between a command and a status and why proving matters, how 0–10 V and
 * 4–20 mA analogue signals are scaled and why a live zero exposes a broken wire, and fail-safe
 * thinking for every point. The old page carried an invented "300 mm" separation rule, a "3 mm
 * from mains" figure presented as BS 7671, made-up drive, accuracy and stroke-time figures,
 * US spelling throughout, and an energy-saving claim with no source; all of that has gone.
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

const TITLE = 'Points: digital and analogue, inputs and outputs | BMS Module 2.1 | Elec-Mate';
const DESCRIPTION =
  'BMS points explained for electricians: digital and analogue inputs and outputs, volt-free contacts, status versus command, live zero and fail-safe wiring.';

const outcomes = [
  'Name the four hardware point types (DI, DO, AI, AO) and say which way the signal travels in each',
  'Explain what a volt-free contact is, and why "normally closed" describes the switch at rest rather than the plant running normally',
  'Tell a command from a status, and explain why a BMS needs both to prove that plant has actually started',
  'Scale a 0–10 V or 4–20 mA signal to engineering units, and explain how a live zero reveals a broken wire',
  'Decide what each point should do when a wire breaks or the controller loses power, and wire it accordingly',
  'Recognise where the BMS only monitors a system, such as a fire alarm, and must not be the path that acts',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An auxiliary contact on a supply fan contactor is wired back to the outstation so the head end can show whether the fan is running. What type of point is it?',
    options: [
      'A digital output, because it is on the fan starter',
      'An analogue input, because it reports the fan condition',
      'A digital input, because it reports one of two states',
      'A soft point, because no sensor is involved',
    ],
    correctIndex: 2,
    explanation:
      'Point types are named from the controller. Information travelling into the outstation is an input, and a contact that is either made or broken is digital, so this is a digital input. It sits in the starter, which makes people call it an output, but the output is the separate point that energises the contactor coil.',
  },
  {
    id: 2,
    question:
      'The controls drawing marks a digital input as "volt-free". What should be connected to those terminals?',
    options: [
      'A clean contact with no supply of its own behind it',
      'A contact switching the control supply from the starter panel',
      'Any contact, provided its own supply is extra-low voltage',
      'A 0–10 V signal that jumps between its two ends of range',
    ],
    correctIndex: 0,
    explanation:
      'A volt-free (dry) contact carries no voltage of its own. The input supplies a small sensing voltage and simply detects whether the contact is open or closed. Landing a contact that already carries a supply, even a low one, puts a foreign voltage onto the input and can damage it, which is why commissioning checks confirm each volt-free contact really is volt-free.',
  },
  {
    id: 3,
    question:
      'A low-flow switch on a chilled water main has normally closed contacts. With the pumps running and flow established, what state are the contacts in?',
    options: [
      'Closed, because the plant is running normally',
      'Closed, because NC contacts only change on a fault',
      'It depends on how the outstation input is configured',
      'Open, because flow is holding the switch operated',
    ],
    correctIndex: 3,
    explanation:
      '"Normally" describes the switch at rest, with no stimulus. Healthy flow is the stimulus, so it holds the contacts open. They only return to their rest state, closed, when flow falls away. Reading "normally closed" as "closed when the plant is normal" is the classic mistake. It is also why, for an alarm, you would normally land the other contact. Wired to the NO pair, healthy flow holds the input closed and a broken wire looks like an alarm. The NC example shows what "normally" means, not how to wire a protection input.',
  },
  {
    id: 4,
    question:
      'The head end shows a supply fan commanded on and its run status on, but the space is stuffy and the fan is cold. What is the most likely weakness in the design?',
    options: [
      'The digital output has failed and is stuck closed',
      'The status comes from the contactor, not from proof of airflow',
      'The fan should have an analogue output instead of a digital one',
      'The outstation has not been scanning its inputs',
    ],
    correctIndex: 1,
    explanation:
      'An auxiliary contact on the contactor proves the contactor pulled in, nothing more. A snapped belt, a tripped isolator downstream or a seized motor all leave that contact made. A differential pressure switch across the fan proves air is moving, which is what the BMS actually needs to know.',
  },
  {
    id: 5,
    question:
      'A pressure transmitter ranged 0 to 10 bar gives 4–20 mA into an analogue input. The input reads 12 mA. What pressure should the head end display?',
    options: ['6 bar', '12 bar', '5 bar', '4 bar'],
    correctIndex: 2,
    explanation:
      'The span is 16 mA (20 minus 4). 12 mA is 8 mA above the live zero, and 8 is half of 16, so the reading is half of range: 5 bar. Treating 12 mA as 12/20ths of range (6 bar) forgets that the scale starts at 4 mA, not zero.',
  },
  {
    id: 6,
    question:
      'The same 4–20 mA input suddenly reads 0 mA. What does that tell you that a 0–10 V input reading 0 V could not?',
    options: [
      'That the loop has failed, not that pressure is low',
      'That the pressure has fallen to exactly zero bar',
      'That the transmitter has been over-ranged and latched',
      'Nothing more; both readings mean exactly the same thing',
    ],
    correctIndex: 0,
    explanation:
      'With a live zero, the bottom of the measuring range is 4 mA, so no current at all can only mean a fault: a broken wire, a lost supply or a dead transmitter. On a 0–10 V input, 0 V is also a legitimate bottom-of-range reading, so a broken wire can sit there looking perfectly believable.',
  },
  {
    id: 7,
    question:
      'A heating valve actuator has a 0–10 V control input and a 0–10 V position feedback. How many points, and of what type, does it use on the outstation?',
    options: [
      'Two analogue outputs, one for each of the two signals',
      'One analogue output only; the feedback stays inside the actuator',
      'One digital output for the command and one analogue input',
      'One analogue output and one analogue input',
    ],
    correctIndex: 3,
    explanation:
      'The command leaves the controller, so it is an analogue output. The feedback comes back into the controller, so it is an analogue input. Both being 0–10 V says nothing about direction; you must read which terminal is driving and which is listening.',
  },
  {
    id: 8,
    question:
      'A frost thermostat on an air handling unit is wired to a BMS digital input. Which contact arrangement gives the safer failure mode?',
    options: [
      'Contacts that close on frost, so the input only changes on frost',
      'Contacts that open on frost, so a broken wire raises the alarm',
      'Either, because the outstation checks every input on every scan',
      'Contacts that close on frost, paralleled onto a spare input as well',
    ],
    correctIndex: 1,
    explanation:
      'If the healthy state holds the circuit closed, a cut cable or a loose terminal opens it and looks exactly like the alarm. The fault announces itself. With contacts that close on frost, a broken wire looks like "no frost" for ever, and the protection fails silently. Scanning frequently does not help if the wire is not there.',
  },
  {
    id: 9,
    question:
      'The fire alarm panel provides a relay contact that changes state on fire, and the client asks for it to go to the BMS. What is the right role for the BMS?',
    options: [
      'Stop the air handling units, since the BMS already runs them',
      'Release the fire doors, since it already has outputs nearby',
      'Monitor and log it; the fire system does the shutdowns',
      'Act as a backup shutdown path in case the fire panel fails',
    ],
    correctIndex: 2,
    explanation:
      'In UK practice the fire detection and alarm system and its own interfaces carry out plant shutdown, door release and smoke control. The BMS normally monitors fire status as a digital input and may do non-life-safety follow-up. Making the BMS the shutdown or backup path puts a life-safety function on a system not designed for it.',
  },
  {
    id: 10,
    question:
      'At commissioning you force a digital output on from the head end and the right pump starts. What has that test proved?',
    options: [
      'The command path to the pump works; its status needs its own check',
      'That the whole pump control strategy is working as it was designed',
      'That every input associated with the pump is wired and scaled correctly',
      'That the pump will fail safe if the outstation loses its power supply',
    ],
    correctIndex: 0,
    explanation:
      'Driving an output proves one path: command, wiring, interposing relay or contactor, plant. The status input still needs its own check, by watching it change when the plant starts and stops. Strategy, failure modes and other inputs are separate tests; one good start does not cover them.',
  },
];

const BMSModule2Section1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 1"
        title="Points: digital and analogue, inputs and outputs"
        backTo="/study-centre/upskilling/bms-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This section covers the four kinds of point you land on an outstation, which way each
          signal travels, and what each one should do when something breaks. On site, those answers
          decide how you wire, label and test every terminal.
        </p>

        <TLDR
          points={[
            'A point is one signal crossing between the plant and the controller. Hardware points come in four kinds: digital input, digital output, analogue input and analogue output.',
            'Inputs and outputs are named from the controller. Into the outstation is an input; out of it is an output. Where the device sits does not change that.',
            'Digital means two states. Most digital inputs are volt-free contacts, and "normally closed" describes the switch at rest, not the plant running as it should.',
            'A command is what the BMS asked for; a status is what the plant did. Without a proper status you cannot prove anything started.',
            'Analogue points carry a value, usually 0–10 V or 4–20 mA. The live zero on 4–20 mA means a broken wire shows up instead of hiding. Decide how every point should fail before you wire it.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What a point is</ContentEyebrow>

        <ConceptBlock
          title="A point is one signal, crossing one boundary"
          plainEnglish="Each thing the BMS can see or do is a point. One fan might have four or five of them: a start command, a run status, a trip alarm, a Hand/Auto indication and an airflow proof."
          onSite="When someone says a controller is 'full', they mean its terminals are all used. Points are what you count, price and test, one at a time."
        >
          <p>
            In Section 1.1 you met the outstation: the controller in the plant room panel that runs
            the strategy for its plant. Everything it knows about the world, and everything it can
            do to the world, passes through its terminals. Each of those signals is a{' '}
            <strong>point</strong>.
          </p>
          <p>
            The ones you wire are <strong>hardware points</strong>, sometimes called physical or
            hardwired points. The controller also holds <strong>soft points</strong> (internal or
            virtual points): setpoints, calculated values, timers, values read across a network from
            another device. Soft points never touch a terminal, but they appear on the same head
            end, so it is worth knowing which is which before you go looking for a wire that does
            not exist.
          </p>
          <p>Hardware points come in four kinds, made from two simple questions:</p>
          <ul>
            <li>
              <strong>Which way does the signal travel?</strong> Into the controller is an{' '}
              <strong>input</strong>. Out of the controller is an <strong>output</strong>.
            </li>
            <li>
              <strong>What does the signal carry?</strong> Two states only (on/off, open/closed,
              healthy/alarm) is <strong>digital</strong>. A value anywhere across a range is{' '}
              <strong>analogue</strong>.
            </li>
          </ul>
          <p>
            Put those together and you get the four abbreviations printed above the terminals and on
            every points schedule: <strong>DI</strong>, <strong>DO</strong>, <strong>AI</strong> and{' '}
            <strong>AO</strong>. Some manufacturers say binary instead of digital (BI, BO), and you
            will see that on BACnet head ends in Section 5.2 (BACnet). It means the same thing.
          </p>
          <p>
            There is one more you will meet early: the <strong>pulse input</strong>. Gas,
            electricity and water meters often give out a pulse per unit used. The outstation counts
            the pulses, keeps a running total and scales it into units such as kWh or cubic metres.
            Electrically it is a digital input that changes state very often; the counting is what
            makes it different.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Name the point from the controller, never from the device"
          plainEnglish="Stand where the outstation stands. If the signal is coming towards you, it is an input. If you are sending it out, it is an output."
          onSite="Starters, actuators and drives often have both inputs and outputs of their own. Their 'input' terminal is usually wired to a BMS output. Label from the BMS side or the schedule and the wiring will disagree."
        >
          <p>
            This sounds obvious until you stand in front of a variable speed drive. The drive has
            terminals marked as its own inputs: an enable input and a speed reference input. Both
            are fed from the BMS, so on the BMS they are a <strong>digital output</strong> and an{' '}
            <strong>analogue output</strong>. The drive&rsquo;s own relay, marked as an output, that
            closes when it is running or faulted lands on a BMS <strong>digital input</strong>.
          </p>
          <p>
            Every points schedule, terminal label and head-end graphic in the building is written
            from the controller&rsquo;s side. Read the device manual for what the terminal does, and
            the points schedule for what it is called.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-1-direction"
          question="A variable speed drive has a relay output that closes when the drive trips. It is wired back to the BMS. On the points schedule, what is it?"
          options={['A digital output', 'A digital input', 'An analogue input', 'A soft point']}
          correctIndex={1}
          explanation="The relay is an output on the drive, but the signal travels into the outstation, so to the BMS it is an input. It has two states, tripped or healthy, so it is digital. Points are always named from the controller's side."
        />

        <SectionRule />
        <ContentEyebrow>Digital inputs</ContentEyebrow>

        <ConceptBlock
          title="Digital inputs: is it on, is it open, is it in alarm?"
          plainEnglish="A digital input asks one yes-or-no question about the plant. The answer comes from a contact being made or broken."
          onSite="Before you land a digital input, find out whether the contact is clean or already carries a supply. Ask the panel builder or read the starter drawing; do not assume."
        >
          <p>
            Digital inputs tell the BMS the state of things. The usual sources in a plant room are:
          </p>
          <ul>
            <li>
              <strong>Run status</strong>: an auxiliary contact on a contactor, a drive&rsquo;s run
              relay, or better, a switch that proves the plant is doing its job (more on that
              below).
            </li>
            <li>
              <strong>Trip and fault alarms</strong>: an overload auxiliary, a drive fault relay, a
              boiler lockout contact.
            </li>
            <li>
              <strong>Process switches</strong>: switches that change over at a set value. A
              differential pressure switch across a filter or fan, a frost thermostat, a low water
              level switch, a flow switch.
            </li>
            <li>
              <strong>Selector positions</strong>: a Hand/Off/Auto selector telling the BMS whether
              it is actually in charge of the plant.
            </li>
            <li>
              <strong>Signals from other systems</strong>: a fire alarm status relay, a
              generator-running contact, a door contact from the access system.
            </li>
          </ul>
          <p>
            The input itself has to be matched to what you connect to it. Most BMS digital inputs
            expect a <strong>volt-free contact</strong>, also called a dry contact: a contact with
            no supply of its own. The outstation puts a small sensing voltage across the pair and
            simply detects whether current can flow. The opposite, a <strong>wet</strong> or powered
            contact, already has a supply behind it, for example a contact switching the control
            voltage inside a starter panel. Some inputs are built to accept a powered signal; many
            are not. The terminal label and the controller data sheet decide, not habit.
          </p>
          <p>
            Some controllers isolate their digital inputs from the processor with optocouplers. Many
            universal inputs are not isolated at all and share the controller&rsquo;s 0 V reference.
            Either way, a mains-derived voltage on a terminal designed for a clean contact will do
            damage, and on a non-isolated input it can reach every other input on the same
            reference.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="'Normally closed' means at rest, not 'when the plant is normal'"
          plainEnglish="A switch's normal state is how its contacts sit when nothing is pushing on them. A flow switch is labelled with no flow, a pressure switch with no pressure."
          onSite="When a status reads backwards on the head end, check the contact first. Swapping NO for NC at the device, or inverting the point in software, are both fixes, but only one of them is written down where the next engineer will look."
        >
          <p>
            Contacts are sold as <strong>normally open</strong> (NO) or{' '}
            <strong>normally closed</strong> (NC), and many devices have both plus a common, as a
            changeover. The word &ldquo;normally&rdquo; trips up experienced electricians, because
            it describes the switch with no stimulus applied: the button not pressed, the diaphragm
            with no pressure on it, the paddle with no water pushing it.
          </p>
          <p>
            The manufacturer has no idea how you will use the switch, so it can only label it at
            rest. Take a flow switch used to raise a low-flow alarm, fitted with NC contacts. With
            the pumps running and water flowing, the flow holds the contacts <em>open</em>. They
            only fall back to their &ldquo;normal&rdquo; closed state when flow is lost, which is
            exactly the abnormal condition you wanted to catch. Normal for the switch and normal for
            the plant are opposites here. It is also why, for an alarm, you would normally land the
            other contact. Wired to the NO pair, healthy flow holds the input closed and a broken
            wire looks like an alarm. The NC example shows what &ldquo;normally&rdquo; means, not
            how to wire a protection input.
          </p>
          <p>
            Drawings always show contacts in their at-rest state, regardless of what the plant is
            usually doing. Read the drawing that way, then work out what the input will actually see
            when the plant is healthy. That second answer is what you set the point&rsquo;s normal
            state to on the BMS.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsRelays}
          topic="Watch · How a relay contact actually switches"
          caption="Watch for the coil, the common, and the normally open and normally closed contacts changing over. Every digital input and output on this page is one of those contacts, at the plant end or the BMS end."
        />

        <InlineCheck
          id="bms-2-1-normal-state"
          question="A differential pressure switch across a supply fan has NO contacts and proves airflow. With the fan running and moving air, what does the BMS digital input see?"
          options={[
            'Open, as NO contacts stay open in service',
            'Closed, as air pressure holds it operated',
            'Open, as the switch only closes on a fault',
            'Closed only while the starter is in Hand',
          ]}
          correctIndex={1}
          explanation="At rest, with no pressure difference, the NO contacts are open. A running fan creates the pressure difference that operates the switch and closes the contacts, so 'air proven' is a closed contact. Reading 'normally open' as 'open in service' is the classic mistake. If the belt snaps, the pressure falls away and the contacts return to open."
        />

        <SectionRule />
        <ContentEyebrow>Digital outputs</ContentEyebrow>

        <ConceptBlock
          title="Digital outputs: the BMS asks, a relay does the heavy lifting"
          plainEnglish="A digital output is the BMS switching something on or off. It is a small contact or transistor inside the controller, and it is never meant to carry the motor current."
          onSite="Look at the contact rating printed by the output terminals before you land anything. Then use it to drive an interposing relay coil, not the load."
        >
          <p>
            Digital outputs are how the BMS starts and stops plant and opens or closes simple
            devices: start a pump, enable a boiler, start a fan, energise a two-position damper
            actuator, switch a lighting contactor. In almost every case the output switches
            equipment <strong>through a contactor or relay</strong>, not directly.
          </p>
          <p>
            The output stage on an outstation is either a small relay or a semiconductor switch (a
            transistor for DC, a triac for AC). Either way it is rated for a control coil, not a
            motor. The usual arrangement is:
          </p>
          <ul>
            <li>The BMS digital output energises an interposing relay in the control panel.</li>
            <li>
              The interposing relay&rsquo;s contact sits in the starter&rsquo;s auto circuit and
              pulls in the contactor.
            </li>
            <li>The contactor switches the motor, with its overload protection in the starter.</li>
          </ul>
          <p>
            The interposing relay does more than protect the output. It separates the BMS circuit
            from the panel&rsquo;s control voltage, gives you a clear point to isolate and test, and
            lets the starter&rsquo;s safety chain sit between the BMS and the motor. Section 2.7
            goes through that plant interface in detail.
          </p>
          <p>
            Not every digital output starts plant. Some <strong>enable</strong> another controller:
            a boiler with its own controls, a packaged chiller, a stand-alone heating compensator.
            The BMS decides <em>when</em> it may run; the packaged controls decide <em>how</em>.
            Knowing which kind of output you are wiring tells you who to call when the plant does
            something odd.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Command and status</ContentEyebrow>

        <ConceptBlock
          title="A command is a request. A status is the evidence."
          plainEnglish="The BMS turning an output on only proves the BMS wanted the fan to run. A separate input has to tell it whether the fan actually did."
          onSite="On a points schedule, every start command should have a status beside it. If it does not, ask why before you install it."
        >
          <p>
            Every piece of controlled plant needs at least two points: the <strong>command</strong>{' '}
            (a digital output saying &ldquo;run&rdquo;) and the <strong>status</strong> (a digital
            input saying &ldquo;it is running&rdquo;). They look alike on a graphic and they mean
            entirely different things. A command can be on while the plant is stopped by a tripped
            overload, a starter left in off, a broken belt or a failed motor.
          </p>
          <p>
            The outstation compares the two. If it commands a fan on and the status has not followed
            within a set delay, it raises a <strong>fail to start</strong> alarm and, where the
            strategy has one, brings in the standby. The same check works in reverse: status on with
            command off usually means somebody has put the plant in Hand.
          </p>
          <p>
            That makes the <em>quality</em> of the status the important design choice. The options,
            roughly from weakest to strongest proof:
          </p>
          <ul>
            <li>
              <strong>Contactor auxiliary</strong>: proves the contactor pulled in. Says nothing
              about the motor, the drive belt or the air.
            </li>
            <li>
              <strong>Drive run relay or current sensing</strong>: proves the motor is drawing power
              or the drive is outputting. Better, and it can catch a snapped belt if its trip point
              is set above no-load current, but a slipping belt still passes.
            </li>
            <li>
              <strong>Process proof</strong>: a differential pressure switch across a fan or pump,
              or a flow switch in the pipe. Proves the plant is doing its job.
            </li>
          </ul>
          <p>
            Which one is right is a design decision, and it should be on the points schedule. Your
            job on site is to fit what is specified, land it on the input the schedule names, and
            make sure it changes state when the plant starts and stops.
          </p>
        </ConceptBlock>

        <Pullquote>
          The command tells you what the BMS wanted. The status tells you what happened. Only the
          status is evidence.
        </Pullquote>

        <Scenario
          title="The fan that ran all night without moving any air"
          situation="An office floor complains of stale air every morning. The head end shows the air handling unit supply fan commanded on from early morning and its run status on, with no alarms. The plant room tells a different story: the fan motor is turning, but the drive belt has snapped and the fan wheel is still. The run status is wired from an auxiliary contact on the starter contactor."
          whatToDo="Prove the status chain before blaming the strategy. The auxiliary contact is made because the contactor is in, so the BMS has nothing to disagree with. Report that the status point cannot detect a failure downstream of the contactor and recommend a differential pressure switch across the fan as the run proof, wired to the existing digital input or a spare one, with the points schedule and graphic updated to match. Replace the belt, then test: start the fan, watch the input change; remove the belt or isolate the fan, and confirm the BMS raises a fail-to-start alarm."
          whyItMatters="A status that cannot fail is not a status. Every alarm and standby changeover built on it is blind to the most common mechanical faults on the plant, and the head end will keep reporting a healthy fan to the building manager until a person walks in and listens."
        />

        <SectionRule />
        <ContentEyebrow>Analogue inputs</ContentEyebrow>

        <ConceptBlock
          title="Analogue inputs carry a value, and the controller scales it"
          plainEnglish="An analogue input is a dial rather than a switch. The signal moves smoothly across a range, and the outstation turns it into degrees, pascals or percent."
          onSite="An analogue input that reads a believable but wrong number is far harder to spot than a digital input stuck on. Check the range set in the controller against the range printed on the transmitter."
        >
          <p>
            Analogue inputs tell the BMS <em>how much</em>: a temperature, a humidity, a pressure, a
            CO2 level, a valve position. The signal arrives in one of three main forms:
          </p>
          <ul>
            <li>
              <strong>Resistance</strong>: the sensing element wired straight to the input. A
              thermistor or a platinum resistance sensor changes its resistance with temperature,
              and the input measures it. Section 2.2 covers the sensor types.
            </li>
            <li>
              <strong>Voltage</strong>: usually 0–10 V DC from a transmitter, where the voltage
              rises in proportion to the measured value.
            </li>
            <li>
              <strong>Current</strong>: usually 4–20 mA, where the current through the loop carries
              the value.
            </li>
          </ul>
          <p>
            The input on its own only sees volts, milliamps or ohms. The outstation software holds
            the <strong>scaling</strong>: the engineering value at the bottom and the top of the
            signal range. It also holds limits, so a reading outside a sensible band raises an
            alarm. A 0–10 V humidity transmitter ranged 0 to 100 %RH and a 0–10 V transmitter ranged
            0 to 50 °C produce the same voltages; only the scaling tells them apart.
          </p>
          <p>
            Many modern controllers have <strong>universal inputs</strong> that can be configured
            for resistance, voltage, current or a digital contact. That is handy, but it means the
            terminal does not tell you what the input is set up for. The configuration does. Wire a
            4–20 mA transmitter to an input still configured for 0–10 V and the reading will be
            wrong, not absent.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Scaling a 4–20 mA signal, and why the 4 matters"
          plainEnglish="On 4–20 mA, 4 mA is the bottom of the range, not zero current. If the current ever drops to nothing, the BMS knows the loop has failed rather than the reading being low."
          onSite="Measuring a 4–20 mA loop means putting your meter in series with it, or using a clamp meter made for milliamp loops. Section 7.7 covers loop testing properly."
        >
          <p>
            The 4–20 mA signal has a <strong>live zero</strong>. The bottom of the measuring range
            is 4 mA, the top is 20 mA, and the span between them is 16 mA. To turn a current into a
            percentage of range, take off the 4 mA first and divide by the 16 mA span:
          </p>
          <ul>
            <li>4 mA is 0 % of range.</li>
            <li>12 mA is 8 mA above the zero, half of the 16 mA span: 50 % of range.</li>
            <li>20 mA is 100 % of range.</li>
          </ul>
          <p>
            So a duct static pressure transmitter ranged 0 to 500 Pa that sends 12 mA is reading 250
            Pa. The common error is to treat 12 mA as twelve-twentieths of the range, which gives
            the wrong answer because it forgets the scale starts at 4 mA.
          </p>
          <p>
            The live zero is a fault detector built into the signal. A healthy 4–20 mA loop never
            reads below the bottom of its range, so a reading of zero current can only mean the loop
            is broken: a cut cable, a loose terminal, a lost supply or a dead transmitter. The
            outstation can alarm on it and the strategy can respond.
          </p>
          <p>
            A 0–10 V signal has no live zero. 0 V is a legitimate reading at the bottom of the
            range, and it is also what a broken wire produces. A 0–10 V outside air sensor with a
            snapped core can sit at its bottom-of-range value looking entirely believable. That
            difference is one reason current loops are often chosen for signals that matter; Section
            2.6 covers the wiring side and the other reasons current loops are used.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-1-scaling"
          question="A chilled water flow temperature transmitter is ranged 0 to 20 °C on 4–20 mA. The input reads 8 mA. What temperature is it reporting?"
          options={['8 °C', '5 °C', '4 °C', '10 °C']}
          correctIndex={1}
          explanation="Take off the live zero: 8 minus 4 is 4 mA. The span is 16 mA, so 4 mA is a quarter of range. A quarter of 20 °C is 5 °C. Answering 8 °C reads the milliamps straight as degrees, and 4 °C forgets that 4 mA is the bottom of range, not a quarter of it."
        />

        <SectionRule />
        <ContentEyebrow>Analogue outputs</ContentEyebrow>

        <ConceptBlock
          title="Analogue outputs: position and speed, not just on and off"
          plainEnglish="An analogue output lets the BMS ask for 'a bit more' or 'a bit less': a valve 40 % open, a fan at part speed. The device works out how to get there."
          onSite="Before you land an analogue output, check the actuator or drive is set to accept the same signal type, and which way round it acts: does 10 V mean fully open or fully closed?"
        >
          <p>Analogue outputs drive modulating devices. The two you will wire most often are:</p>
          <ul>
            <li>
              <strong>Valve and damper actuators</strong>: a 0–10 V signal where, typically, the
              actuator moves in proportion to the voltage. Many also give back a position feedback
              signal.
            </li>
            <li>
              <strong>Variable speed drives</strong>: a speed reference, often 0–10 V or 4–20 mA,
              alongside a separate digital output that enables the drive to run.
            </li>
          </ul>
          <p>
            Two points of care. First, the <strong>action</strong> of the device. Most actuators can
            be set to direct or reverse acting, and a heating valve that opens as the BMS asks it to
            close will fight the control loop for ever. Set it to the specification and prove it at
            both ends of range. Second, <strong>position feedback</strong>. If the actuator reports
            where it actually is, that feedback is an analogue input, a separate point on the
            schedule. The BMS can use it to confirm the valve went where it was sent, which is the
            analogue version of command and status.
          </p>
          <p>
            Not every modulating actuator uses an analogue output. Some are driven by two digital
            outputs, one to drive open and one to drive closed, with the controller timing how long
            each is on. Section 2.3 covers actuator types and how they are wired.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-1-point-types"
          question="An air handling unit needs: start the supply fan, set its speed, know it is moving air, and know the heating valve position. Which set of points does that need?"
          options={[
            'Two DOs and two AIs',
            'One DO, one AO and two DIs',
            'One DO, one AO, one DI and one AI',
            'One AO, one DI and two AIs',
          ]}
          correctIndex={2}
          explanation="Start is a command out with two states: a DO. Speed is a value out: an AO. Airflow proof is a two-state signal coming in, from a differential pressure switch: a DI. Valve position is a value coming in: an AI. Direction first, then two states or a range."
        />

        <SectionRule />
        <ContentEyebrow>Fail-safe thinking</ContentEyebrow>

        <ConceptBlock
          title="Decide how every point should fail, then wire it that way"
          plainEnglish="Wires break, terminals loosen and controllers lose power. Choose the wiring so that when that happens, the plant ends up safe and the BMS can tell something is wrong."
          onSite="For each point, ask two questions before you land it: what does the BMS see if this wire falls off, and what does the plant do if this controller goes dark?"
        >
          <p>
            A broken wire on a digital input looks exactly like an open contact. So the question for
            every alarm and protection input is: which state should a broken wire look like? For
            anything protecting plant or people, the answer is the alarm state. That means choosing
            contacts that are <strong>closed when healthy</strong> and open on alarm. A cut cable, a
            loose terminal or a lost supply then announces itself. Wire the same frost thermostat or
            high-limit the other way round and a broken wire looks like &ldquo;all fine&rdquo;
            indefinitely.
          </p>
          <p>The same thinking runs through the other point types:</p>
          <ul>
            <li>
              <strong>Analogue inputs</strong>: a 4–20 mA live zero lets the BMS tell a broken loop
              from a low reading. On 0–10 V, consider what the strategy does with a reading stuck at
              the bottom of range.
            </li>
            <li>
              <strong>Digital outputs</strong>: when the outstation loses power, its outputs drop
              out. Work out what the plant does then. Some plant should stop; some, such as frost
              protection pumps, may need a different arrangement. That is a design decision, made
              deliberately.
            </li>
            <li>
              <strong>Analogue outputs</strong>: a lost signal usually means the device sees its
              bottom of range. A spring-return actuator goes to a defined position when its power is
              removed. Check which position is specified, and prove it at commissioning.
            </li>
          </ul>
          <p>
            Some protections must not depend on the BMS at all. A fan&rsquo;s fire shutdown is the
            clearest case. The fire detection and alarm system and its own interfaces carry that
            out, wired so they act upstream of the BMS, and a fire signal has to override every hand
            and automatic command. The BMS typically <strong>monitors</strong> the fire status as a
            digital input, for logging and for non-life-safety follow-up. It is not the path that
            stops the fan.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 Section 557"
          clause="Section 557 covers auxiliary circuits, which include control, signalling and measurement circuits. The supply for an auxiliary circuit may be dependent on, or independent of, the main circuit, according to the function the auxiliary circuit has to perform."
          meaning={
            <>
              <p>
                The field wiring between an outstation and its devices is auxiliary circuitry, so
                Section 557 applies to it, alongside the rest of BS 7671 (Regulations 528.1 and
                444.4.10 included). Wiring inside a control panel built to the BS EN 61439 series is
                covered by that standard instead.
              </p>
              <p>
                The dependent or independent choice is fail-safe thinking at the supply level.
                Should this controller and its points die with the plant it serves, or keep
                reporting when that plant is isolated? A controller that must raise an alarm when
                its plant fails generally cannot share that plant&rsquo;s supply. Either can be
                right; the point is that somebody decides on purpose.
              </p>
            </>
          }
          cite="Verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <CommonMistake
          title="Landing a powered contact on a volt-free input"
          whatHappens="A boiler lockout signal is taken from a terminal in the boiler's own control panel. It looks like a contact, but it switches the boiler's control supply. It goes straight onto a BMS digital input marked volt-free. The input is damaged or the reading is erratic, and the boiler panel now has an unexpected path into the BMS that nobody will think to isolate."
          doInstead="Confirm a contact is genuinely volt-free before you land it, with the manufacturer's drawing and a meter. If the source only offers a powered signal, fit an interposing relay so its coil takes the powered signal and its clean contact goes to the BMS. Label it, and show it on the drawings, so the next person knows there is another supply in the panel."
        />

        <CommonMistake
          title="Wiring a safety input so that a broken wire looks healthy"
          whatHappens="A frost thermostat is wired with contacts that close on frost, because 'normally open' sounded right. Months later a terminal works loose. The input sits open, the BMS reads 'no frost', and on the first hard night the coil freezes with no alarm."
          doInstead="For any alarm or protection input, use contacts that are closed in the healthy condition, so an open circuit means alarm. Set the BMS point's normal state to match and test it by lifting a wire: the alarm should come up."
        />

        <SectionRule />
        <ContentEyebrow>Proving points</ContentEyebrow>

        <ConceptBlock
          title="Every point gets tested on its own, end to end"
          plainEnglish="Point-to-point testing means checking every input and output, one at a time, from the device in the plant to the value on the screen."
          onSite="Keep a marked-up copy of the points schedule as you go. A tick by each point, with what you saw, is worth more than any amount of 'all tested OK'."
        >
          <p>
            Before any strategy is trusted, each hardware point is proved individually. Your part is
            usually the field end, working with the controls engineer at the outstation or head end.
            The checks, by type:
          </p>
          <ul>
            <li>
              <strong>Digital inputs</strong>: operate the device, or simulate it, and confirm the
              right point changes on the BMS and nothing else does. Confirm each volt-free contact
              really is volt-free, and that it sits in the correct open or closed state for a
              healthy plant.
            </li>
            <li>
              <strong>Digital outputs</strong>: drive the output from the head end and confirm the
              right item of plant responds, then watch its status follow.
            </li>
            <li>
              <strong>Analogue inputs</strong>: compare the BMS reading with a reference measurement
              or a simulated signal at more than one point in the range, so a scaling error cannot
              hide.
            </li>
            <li>
              <strong>Analogue outputs</strong>: command the bottom, middle and top of range and
              watch the valve, damper or drive follow, including the direction of action. Remove
              power from spring-return actuators and confirm they reach the specified position.
            </li>
            <li>
              <strong>Pulse inputs</strong>: confirm the BMS total moves in step with the
              meter&rsquo;s own register.
            </li>
          </ul>
          <p>
            Section 7.5 covers commissioning as a whole. The habit to build now is simple: a point
            is finished only when it has been seen to work, from both ends, and recorded, not when
            the last wire goes in.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can I tell from the terminal whether a point is digital or analogue?',
              answer:
                'On older or fixed-function controllers, usually yes: the terminals are grouped and labelled DI, DO, AI and AO. On controllers with universal inputs or outputs, no. The same terminal can be set up as a contact input, a 0–10 V input, a 4–20 mA input or a resistance input, so the configuration and the points schedule are what decide. Check both before you land a wire.',
            },
            {
              question: 'Is a pulse input from a meter digital or analogue?',
              answer:
                'Electrically it is digital: a contact or transistor switching on and off. What makes it different is that the outstation counts the pulses and totals them, rather than just reporting the current state. The pulse value (how much each pulse represents) has to be set in the BMS to match the meter, and getting it wrong is a common reason for meter totals that do not match the meter.',
            },
            {
              question: 'Why not just use 0–10 V for everything, since it is simpler to measure?',
              answer:
                '0–10 V is perfectly good for many short runs inside a plant room, and plenty of actuators and sensors use it. Its main weakness is that a broken wire can look like a genuine bottom-of-range reading. For signals that matter, 4–20 mA is often specified so that a failed loop shows up. Section 2.6 covers the wiring side and the other reasons current loops are chosen.',
            },
            {
              question: 'Who decides whether a contact is normally open or normally closed?',
              answer:
                'The designer, on the points schedule or the controls drawings. If it is not stated, ask; do not choose on site without telling anyone. Whatever is chosen, the BMS point has to be configured to match, so the controls engineer needs to know what you have wired. A mismatch shows up as a point that reads backwards.',
            },
            {
              question:
                'The fire alarm relay goes to a BMS input. Does that make the BMS part of the fire system?',
              answer:
                'No. The BMS is monitoring the fire status, as it would any other digital input. Plant shutdown, door release and smoke control on fire are carried out by the fire detection and alarm system and its own interfaces. The BMS may record the event and do non-life-safety follow-up, but it must not be the path that does the life-safety work.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A point is one signal crossing between the plant and the controller. Hardware points are DI, DO, AI or AO; soft points live only in the software.',
            'Name points from the controller. Into the outstation is an input, out of it is an output, whatever the device calls its own terminals.',
            'Most digital inputs want a volt-free contact. "Normally open" and "normally closed" describe the switch at rest, which may be the opposite of the plant running normally.',
            'Digital outputs switch plant through interposing relays and contactors, never directly.',
            'Every command needs a status, and the best status proves the plant is doing its job, not just that a contactor pulled in.',
            'On 4–20 mA, take off the 4 mA live zero and divide by the 16 mA span. Zero current means a broken loop; 0 V on 0–10 V could be either.',
            'Decide how each point should fail before wiring it. Safety inputs are closed when healthy, and fire shutdowns are done by the fire system, not the BMS.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-2"
          prevLabel="Module 2: Field devices and signals"
          nextHref="/study-centre/upskilling/bms-module-2-section-2"
          nextLabel="Sensors"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule2Section1;
