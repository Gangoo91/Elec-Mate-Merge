/**
 * BMS Module 7 · Section 2 — Control logic
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches an electrician to READ a control
 * strategy, not to write one: what a function block is, Boolean AND/OR/NOT worked through on a
 * heating pump, timers and latches (with the seal-in contact as the bridge from starter
 * circuits), the inputs and outputs of a PID block including enable and integral wind-up, a
 * heat/cool sequence with a deadband, and the fire priority rule shown in logic — the fire
 * input sits last so nothing downstream can override it, while the hardwired fire stop in the
 * starter circuit (Modules 2.7 and 6.5) remains the real protection. The old page taught a
 * fan example in which a manual override was ORed in AFTER the fire interlock (so the override
 * could run a fan through a fire), carried an unsourced filter pressure figure and timer value,
 * and presented PID as maths rather than as a block with terminals to read. All of that has
 * gone.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Control logic | BMS Module 7.2 | Elec-Mate';
const DESCRIPTION =
  'Read a BMS control strategy: function blocks, AND/OR/NOT on real plant, timers, latches, PID block inputs and outputs, heat/cool deadbands and fire priority.';

const outcomes = [
  'Follow a function block diagram from field inputs on the left to the output point on the right, and say what each block does',
  'Work out the state of an AND, OR or NOT block from its inputs, and predict whether a pump or fan will run',
  'Tell an on-delay from an off-delay timer and a latch from a plain output, and say why each appears in plant logic',
  'Identify the setpoint, process variable, output and enable on a PID block, and explain integral wind-up when the enable is wrong',
  'Read a heat/cool sequence and check there is a deadband so heating and cooling never fight',
  'Show where the fire input must sit in a fan strategy, and explain why the hardwired fire stop in the starter circuit is still the real protection',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A heating pump block reads: RUN = (Heating demand OR Frost request) AND Auto AND NOT Trip. Heating demand is off, frost request is on, the selector is in Auto and there is no trip. What happens?',
    options: [
      'The pump stays off, because heating demand is off',
      'The pump stays off until someone acknowledges the frost alarm',
      'The pump runs, as the frost request satisfies the OR',
      'The pump runs in Hand only, because the strategy cannot decide',
    ],
    correctIndex: 2,
    explanation:
      'The OR block only needs one of its inputs true, and the frost request provides it. The AND then checks Auto (true) and NOT Trip (true, because there is no trip), so the output is true and the pump runs. Reading the OR as if it needed heating demand is the common slip.',
  },
  {
    id: 2,
    question: 'How does a BMS controller normally work through its function block diagram?',
    options: [
      'Reads inputs, runs the blocks in order, writes outputs, repeats',
      'Solves every block at the same instant whenever an input changes',
      'Runs each block only when the head end asks it for a value',
      'Writes each output the moment the block driving it has run',
    ],
    correctIndex: 0,
    explanation:
      'The controller reads its inputs, works through the blocks in an execution order, writes its outputs at the end of the pass, and repeats continuously. It does not solve the whole diagram at once and does not wait for the head end. Outputs are normally updated at the end of the pass, not part way through, which is why the last write to a point wins.',
  },
  {
    id: 3,
    question:
      'A supply fan is commanded on but its airflow switch has not proved. The strategy raises a fan fail alarm only after a delay. Which block gives that delay?',
    options: [
      'An off-delay timer placed on the fan run command',
      'A latch with its reset taken from the head end',
      'A NOT block placed on the airflow switch input',
      'An on-delay on "commanded but not proved"',
    ],
    correctIndex: 3,
    explanation:
      'The fan needs time to spin up and prove airflow, so the condition "commanded and not proved" must stay true for a set time before it counts. That is an on-delay. An off-delay holds something on after its input goes off, which is the opposite job.',
  },
  {
    id: 4,
    question:
      'Why does a fan fail alarm usually feed a latch rather than going straight to the output?',
    options: [
      'Latches use less controller memory than timers do, so are preferred',
      'So the fault holds the fan off until a person resets it',
      'Because an alarm cannot reach the head end without one',
      'So the fan restarts by itself as soon as airflow returns',
    ],
    correctIndex: 1,
    explanation:
      'Without a latch, stopping the fan clears the "commanded and not proved" condition, the alarm drops, the fan is commanded again and the cycle repeats. Latching the fault holds the plant off until a person has looked. Automatic restart is exactly what the latch prevents.',
  },
  {
    id: 5,
    question:
      'A PID block controlling an AHU heating valve has its enable tied to the time schedule only. The fan trips overnight while the schedule is on. What is the risk?',
    options: [
      'The valve drives fully closed and the coil is left to freeze',
      'The integral winds up and the valve opens hard on restart',
      'The setpoint resets itself and has to be entered again',
      'The process variable stops updating and shows a fault',
    ],
    correctIndex: 1,
    explanation:
      'With the fan off, the off-coil temperature never reaches setpoint, so a loop that is still enabled keeps adding integral and drives its output towards fully open. When the fan returns, the valve is already wide and the temperature overshoots until the integral unwinds. Tying the enable to fan proven prevents it.',
  },
  {
    id: 6,
    question:
      'Which pair of terminals on a PID block tells you how far the loop is from where it should be?',
    options: [
      'Enable and the output high limit',
      'Gain and integral time',
      'Enable and process variable',
      'Setpoint and process variable',
    ],
    correctIndex: 3,
    explanation:
      'The error the loop works on is the difference between setpoint (the target) and process variable (the measurement). Output is what the loop does about it, enable says whether it is allowed to act, and gain and integral time are tuning settings, not live values.',
  },
  {
    id: 7,
    question:
      'A room has a heating setpoint and a cooling setpoint. On the head end, the cooling setpoint has been set below the heating setpoint. What will you see?',
    options: [
      'Heating and cooling both active at once, fighting each other',
      'Neither heating nor cooling will ever run',
      'The controller will refuse the new setpoint and keep the old one',
      'Only cooling, because cooling always takes priority over heating',
    ],
    correctIndex: 0,
    explanation:
      'With the setpoints crossed there is a band of room temperature that is both below the heating setpoint and above the cooling setpoint, so both calls are made together. The deadband between them exists to stop exactly this. Most controllers will accept the entry, which is why you check.',
  },
  {
    id: 8,
    question:
      'In a fan strategy, why must the NOT-fire condition sit in the last block before the output?',
    options: [
      'Because the fire input is the slowest signal so is read last',
      'Because the controller scans its blocks in alphabetical order',
      'So no request or override joined later can bypass it',
      'So that the fire alarm panel can read back the fan status',
    ],
    correctIndex: 2,
    explanation:
      'Anything ORed in after the fire block is a path round it. If the fire condition is the final gate before the output, every request, including a head-end override, has to pass through it. The order of signals has nothing to do with scan speed or names.',
  },
  {
    id: 9,
    question:
      'The BMS strategy stops the supply fan on fire, and the logic has been proved at the witness test. Why is the hardwired fire stop in the starter circuit still needed?',
    options: [
      'Because the BMS cannot read a volt-free contact from a fire panel',
      'Because software logic is never allowed to switch fans at all',
      'Because the hardwired stop is only needed when in Hand mode',
      'Because the controller could be offline, forced or edited',
    ],
    correctIndex: 3,
    explanation:
      'The software stop is a second line. A controller can lose power, sit in a forced state, have its strategy changed or simply crash; the hardwired contact in the starter control circuit stops the fan regardless. It must cover hand mode too, but that is not its only job.',
  },
  {
    id: 10,
    question:
      'A fan strategy stops the supply fan on fire correctly. Reading on, you see the fan restarts by itself the moment the fire panel is reset. What should you do?',
    options: [
      'Nothing, because plant must always restart as soon as fire clears',
      'Check it against the cause and effect agreed with the fire engineer',
      'Add an off-delay so the fan waits a few minutes before it restarts',
      'Remove the restart, because only an operator may ever restart plant',
    ],
    correctIndex: 1,
    explanation:
      'Plant coming back the moment the fire panel resets may not be what the fire strategy wants. Whether it restarts in sequence or waits for an operator reset is decided in the cause and effect agreed with the fire alarm engineer, and the description of operation should say which. There is no "always" or "never" rule, and a delay is a guess, not an answer.',
  },
];

const BMSModule7Section2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 2"
        title="Control logic"
        backTo="/study-centre/upskilling/bms-module-7"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          How to read the logic inside a BMS controller, so you can tell what a pump or fan will do
          before you walk to the plant room.
        </p>

        <TLDR
          points={[
            'Most BMS strategies are drawn as function blocks: inputs on the left, outputs on the right, small boxes in between that each do one job.',
            'AND needs every input true, OR needs any one, NOT flips a signal. Most plant start logic is "a request OR another request, AND every permission, AND NOT a fault".',
            'Timers add patience (an on-delay before a fan fail counts) or run-on (an off-delay after plant stops). Latches hold a fault until someone resets it.',
            'A PID block takes a setpoint, a process variable and an enable, and gives an output. Enable it only when the plant can respond, or the integral winds up.',
            'Fire comes last in the logic so nothing can override it, but the hardwired fire stop in the starter circuit is the real protection. The software is the second line.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why an electrician reads logic</ContentEyebrow>

        <ConceptBlock
          title="You are not writing the strategy, but you need to read it"
          plainEnglish="The controls engineer writes the logic. You need to be able to look at it and say why a fan is or is not running."
          onSite="When plant does something odd, ask for the strategy printout or a screen of the live logic before you start pulling wires. Plenty of fault calls turn out to be a value in a block, not a fault in a cable."
        >
          <p>
            The design documents from Section 7.1 describe what the plant should do in words: the
            description of operation. Inside the controller, that description has been turned into a
            strategy, and on most BMS platforms the strategy is drawn as a{' '}
            <strong>function block diagram</strong>. It looks like a circuit drawing, and in many
            ways it reads like one.
          </p>
          <p>
            You will meet it at commissioning, when you are proving each point and someone asks why
            the output did not come on. You will meet it when a fault call says a pump will not
            start and the panel looks healthy. And you will meet it at a witness test, when the fire
            alarm engineer drops the fire signal and everyone watches to see what stops.
          </p>
          <p>
            Reading logic is a skill you already half have. If you can follow a starter control
            circuit, with its stop button in series, its start button and seal-in contact in
            parallel, and its overload contact breaking the coil, you can follow a function block
            diagram. The symbols change; the thinking does not.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Function blocks</ContentEyebrow>

        <ConceptBlock
          title="Boxes, lines and a direction of travel"
          plainEnglish="Each box does one small job. Lines carry a value from one box to the next. Read from left to right."
          onSite="Find the output point first (the fan or pump command), then trace backwards to the left. You will see every condition that has a say in whether it runs."
        >
          <p>
            A function block is a box with inputs on its left and one or more outputs on its right.
            Inside the box is a single job: combine two true/false signals, wait for a time, compare
            two numbers, run a control loop. The manufacturer supplies a library of these blocks and
            the controls engineer wires them together on screen.
          </p>
          <p>
            The lines between blocks are not cables. They are software connections that carry a
            value from one block&rsquo;s output to another block&rsquo;s input. The only real wiring
            is at the edges of the drawing: <strong>input points</strong> on the left (sensors,
            status contacts, the fire interface relay) and <strong>output points</strong> on the
            right (the relay that enables a starter, the analogue signal to a valve actuator).
          </p>
          <p>Two kinds of value travel along those lines:</p>
          <ul>
            <li>
              <strong>Digital (Boolean)</strong> values: true or false, on or off, 1 or 0. A run
              status, an alarm, a command.
            </li>
            <li>
              <strong>Analogue</strong> values: numbers. A temperature, a setpoint, a valve position
              in percent.
            </li>
          </ul>
          <p>
            Some blocks turn one kind into the other. A <strong>comparator</strong> takes two
            numbers and gives a true/false answer: is the outside air below the frost setpoint? A
            PID block takes numbers in and gives a number out. Knowing which kind of value is on a
            line tells you what to look for when you go online to the controller and see it live.
          </p>
          <p>
            <strong>Order matters: the controller works through the blocks in turn.</strong>
          </p>
          <p>
            A controller does not solve the whole diagram at once. It reads its inputs, works
            through the blocks in an execution order, then writes its outputs, and repeats that
            cycle continuously. The physical outputs are normally updated at the end of the pass,
            not part way through.
          </p>
          <p>
            That has a consequence you need to hold on to for the rest of this page. If two parts of
            a strategy write to the same output, the physical output follows whichever was written{' '}
            <strong>last</strong> in the pass. A good strategy avoids two writers to one point.
            Where there must be a final say, such as a fire shutdown, it is deliberately placed so
            that it is the last thing to touch the output.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-2-blocks"
          question="On a function block diagram, a line runs from a comparator to an AND block. What is on that line?"
          options={[
            'A true/false value produced by the comparator',
            'A common reference shared by both blocks',
            'A cable you must install between two outstations',
            'The temperature reading the comparator was given',
          ]}
          correctIndex={0}
          explanation="A comparator takes numbers in and gives a true/false answer out, and the AND block works on true/false inputs. The line is a software connection, not a cable. The temperature was on the line going into the comparator, not the one coming out."
        />

        <SectionRule />
        <ContentEyebrow>Boolean logic on real plant</ContentEyebrow>

        <ConceptBlock
          title="AND, OR and NOT are series, parallel and the normally closed contact"
          plainEnglish="AND is contacts in series. OR is contacts in parallel. NOT is a normally closed contact. You already know these."
          onSite="When a block confuses you, redraw it in your head as contacts feeding a relay coil. It nearly always becomes obvious."
        >
          <ul>
            <li>
              <strong>AND</strong>: the output is true only when every input is true. Like stop
              buttons and overload contacts in series with a coil, any one of them opening stops the
              lot. AND is where permissions live.
            </li>
            <li>
              <strong>OR</strong>: the output is true when any one input is true. Like several start
              contacts in parallel, any one of them will do. OR is where requests live.
            </li>
            <li>
              <strong>NOT</strong>: the output is the opposite of the input. Like a normally closed
              contact: it passes when the input is off and breaks when it comes on. NOT is how a
              fault or alarm becomes a permission (&ldquo;no trip&rdquo;, &ldquo;no fire&rdquo;).
            </li>
          </ul>
          <p>
            Before you trust any NOT, check what the input point actually means. A digital input can
            be configured as &ldquo;fire alarm active&rdquo; or as &ldquo;fire alarm healthy&rdquo;,
            depending on how the interface contact is wired and how the point is set up. Read it the
            wrong way round and you will predict the opposite of what the plant does. The points
            schedule and the point&rsquo;s live state tell you which it is.
          </p>
          <p>
            <strong>Worked example: a heating circulation pump.</strong>
          </p>
          <p>A typical description of operation for an LTHW circulation pump might say:</p>
          <ul>
            <li>
              Run the pump when there is a <strong>heating demand</strong> from the time schedule or
              optimum start, or when <strong>frost protection</strong> calls for circulation.
            </li>
            <li>
              Only run it when the Hand/Off/Auto selector is in <strong>Auto</strong> and the
              starter is <strong>not tripped</strong>.
            </li>
          </ul>
          <p>In blocks, that becomes:</p>
          <ul>
            <li>
              <strong>Block 1 (OR)</strong>: Request = Heating demand OR Frost request
            </li>
            <li>
              <strong>Block 2 (NOT)</strong>: No trip = NOT Trip
            </li>
            <li>
              <strong>Block 3 (AND)</strong>: Pump command = Request AND Auto AND No trip
            </li>
          </ul>
          <p>Now read four situations through it:</p>
          <ul>
            <li>
              <strong>Occupied morning, no faults.</strong> Heating demand true, so Request is true.
              Auto true, No trip true. Command true: the pump runs.
            </li>
            <li>
              <strong>Cold night, building unoccupied.</strong> Heating demand false, but the frost
              request is true, so Request is still true. Command true: the pump runs to keep water
              moving. If you only looked at the time schedule you would call this a fault. It is
              not.
            </li>
            <li>
              <strong>Daytime, overload tripped.</strong> Request true, Auto true, but Trip is true,
              so No trip is false and the AND fails. Command false: the controller stops asking for
              the pump, and the trip should raise an alarm.
            </li>
            <li>
              <strong>Daytime, selector left in Off.</strong> Request true, but Auto is false, so
              the command is false. The head end shows a demand and a pump that is not running. The
              fix is a walk to the panel, not a call to the controls engineer.
            </li>
          </ul>
          <p>
            Notice the shape:{' '}
            <strong>
              gather every reason to run with OR, then let every permission veto it with AND
            </strong>
            . When you find a request ORed in after the permissions instead, you have found
            something that can run the plant with a permission missing. That is the fire priority
            problem later on this page, in miniature.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-2-boolean"
          question="A pump strategy reads: Command = (Heating demand OR Frost request) AND Auto AND NOT Trip. Frost request is true, heating demand is false, the selector is in Auto and Trip is true. What does the controller do?"
          options={[
            'Runs the pump, because frost protection overrides a trip',
            'Runs the pump, because the OR block is satisfied',
            'Does not command the pump, because the AND fails on the trip',
            'Does not command the pump, because heating demand is false',
          ]}
          correctIndex={2}
          explanation="The OR is satisfied by the frost request, so there is a reason to run. But Trip is true, NOT Trip is false, and an AND with any false input is false. Permissions veto requests. Frost protection does not override a tripped starter in this strategy, and heating demand being off was never the reason."
        />

        <SectionRule />
        <ContentEyebrow>Timers and latches</ContentEyebrow>

        <ConceptBlock
          title="On-delay and off-delay: patience and run-on"
          plainEnglish="An on-delay waits before switching on. An off-delay waits before switching off."
          onSite="When a fan fail alarm comes up on every start and then clears, look at the on-delay feeding it. The delay is probably shorter than the time the fan takes to prove airflow."
        >
          <p>
            An <strong>on-delay timer</strong> only turns its output on once its input has been on
            continuously for the set time. If the input drops before the time is up, the timer
            starts again from nothing. You will see on-delays in two common places:
          </p>
          <ul>
            <li>
              <strong>Proving and fault detection.</strong> A fan is commanded on, but its airflow
              switch takes time to make. The strategy feeds &ldquo;commanded AND NOT proved&rdquo;
              into an on-delay, and only raises a fan fail when that has been true for longer than
              the fan should need.
            </li>
            <li>
              <strong>Staggered starts.</strong> Plant items are brought on one after another rather
              than all together, so the starting load is spread.
            </li>
          </ul>
          <p>
            An <strong>off-delay timer</strong> turns its output on as soon as its input comes on,
            and holds it on for the set time after the input goes off. The classic use is a pump
            run-on: the boiler or heat source stops, but the pump keeps circulating for a while to
            carry the residual heat away.
          </p>
          <p>
            Related to timers, many strategies enforce <strong>minimum on and off times</strong> or
            limit starts in a period, so that plant is not switched on and off repeatedly. That
            short cycling wears contactors and motors, and it is a common reason a pump does not
            start the instant you expect it to.
          </p>
          <p>
            <strong>Latches: the seal-in contact in software.</strong>
          </p>
          <p>
            You already know the latch. In a DOL starter, the auxiliary contact in parallel with the
            start button holds the contactor in after you let go. That is a seal-in, and a
            controller latch does the same job in software. A <strong>set/reset latch</strong> has a
            set input that turns the output on and a reset input that turns it off. The output stays
            where it was put until told otherwise.
          </p>
          <p>Latches earn their place on fault handling:</p>
          <ul>
            <li>
              Without a latch, a fan fail stops the fan, which clears &ldquo;commanded and not
              proved&rdquo;, which clears the fail, which lets the fan start again. The plant cycles
              on and off for as long as the fault exists.
            </li>
            <li>
              With a latch, the fan fail is held. The fan stays off and the alarm stays up until a
              person has looked and reset it.
            </li>
          </ul>
          <p>
            When reading a latch, check two things. First, what happens if set and reset are both
            true at the same time. Each block library decides which one wins (set-dominant or
            reset-dominant), and the drawing should make it clear. Second, what the latch does after
            a power cut. Some keep their state through a restart and some do not, and the
            description of operation should say how plant is meant to come back when power is
            restored.
          </p>
          <p>
            If plant has stopped and will not restart even though everything now looks healthy, look
            for a latched fault waiting for a reset on the head end or at the panel.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-2-timers"
          question="After the boiler stops, the primary pump keeps running for a few minutes and then stops by itself. Which block is most likely doing that?"
          options={[
            'An on-delay timer on the boiler enable',
            'A latch reset by the boiler run status',
            'A NOT block on the pump command',
            'An off-delay timer on the pump request',
          ]}
          correctIndex={3}
          explanation="An off-delay holds its output on for a set time after its input goes off, so the pump carries on after the boiler request ends and then stops. An on-delay acts at switch-on, not switch-off, and a latch would keep the pump running until something reset it."
        />

        <SectionRule />
        <ContentEyebrow>The PID block</ContentEyebrow>

        <ConceptBlock
          title="Four terminals to read: setpoint, process variable, output, enable"
          plainEnglish="The PID block compares where you are with where you want to be, and moves a valve or a fan speed to close the gap, but only while it is enabled."
          onSite="When a valve sits fully open or fully shut and the room is wrong, go online and read the four terminals of its PID block before blaming the actuator."
        >
          <p>
            Section 3.2 covered what proportional, integral and derivative action do. Here the job
            is reading the block on a strategy, and for that you need its terminals rather than its
            maths:
          </p>
          <ul>
            <li>
              <strong>Setpoint (SP)</strong>: the target, such as an off-coil air temperature. It
              may be a fixed value or come from another block (a reset schedule, an occupancy mode,
              a user adjustment).
            </li>
            <li>
              <strong>Process variable (PV)</strong>: the live measurement, usually straight from a
              sensor input point.
            </li>
            <li>
              <strong>Output (OUT)</strong>: what the loop asks for, normally as a percentage. It
              goes on to an analogue output to a valve actuator or a drive speed reference.
            </li>
            <li>
              <strong>Enable</strong> (sometimes shown as an auto/manual or run input): whether the
              loop is allowed to act. When it is off, the output goes to a fixed value set in the
              block, often fully closed or zero.
            </li>
          </ul>
          <p>
            Inside the block you will also find settings rather than live values: the gain, the
            integral time, sometimes a derivative time, output limits, and the{' '}
            <strong>action</strong>. A direct-acting loop drives its output up as the PV rises (a
            cooling valve: warmer air, more cooling). A reverse-acting loop drives its output down
            as the PV rises (a heating valve: warmer air, less heating). Get the action wrong and
            the loop drives the valve the wrong way, all the way to its end stop.
          </p>
          <p>
            <strong>Why the enable matters: integral wind-up.</strong>
          </p>
          <p>
            The integral part of a PID loop adds up error over time. That is how it removes the
            steady offset a proportional-only loop leaves behind. But it only makes sense while the
            plant can respond. If the fan is off, the off-coil temperature cannot reach setpoint
            however far the heating valve opens, so a loop that is still enabled keeps adding to its
            integral and pushes its output to the limit.
          </p>
          <p>
            When the fan restarts, the valve is already wide open. The air overshoots the setpoint,
            and stays high until the loop has spent the error it stored up. This is called{' '}
            <strong>integral wind-up</strong> (or reset wind-up).
          </p>
          <p>
            The cure in a BMS strategy is usually in the enable. Tie it to{' '}
            <strong>fan run proven</strong>, not just to the time schedule, so the loop is only
            working when air is moving across the coil. Many blocks also limit how far the integral
            can build. When you read a PID block, always trace where its enable comes from.
          </p>
          <p>
            An AHU that overshoots badly for a while after every start, then settles, is a classic
            sign of a loop enabled before the fan is proved.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsLatchingRelay}
          topic="Watch · a latch in hardware"
          caption="A latching relay holds its state until something resets it, which is exactly how a latch block behaves in a strategy. Compare the two: what sets it, what resets it, and what happens to it when power is lost."
        />

        <SectionRule />
        <ContentEyebrow>Sequences and deadbands</ContentEyebrow>

        <ConceptBlock
          title="Heat, then nothing, then cool"
          plainEnglish="Between the temperature where heating stops and the one where cooling starts, there should be a gap where the plant does neither. That gap is the deadband."
          onSite="On a fan coil or VAV box that seems to heat and cool at the same time, compare the heating and cooling setpoints on the head end first. Crossed or touching setpoints are a common cause."
        >
          <p>
            A <strong>sequence</strong> is logic that brings stages of plant in one after another as
            demand changes. On an AHU or fan coil serving a room that needs both heating and
            cooling, the sequence typically runs like this as the room gets warmer:
          </p>
          <ul>
            <li>Below the heating setpoint: heating valve modulates open, cooling valve shut.</li>
            <li>
              Between the heating and cooling setpoints: both valves shut. This is the{' '}
              <strong>deadband</strong>, and in it the plant uses no heating or cooling energy.
            </li>
            <li>Above the cooling setpoint: cooling valve modulates open, heating valve shut.</li>
          </ul>
          <p>
            On the strategy you will see this either as two loops with separate setpoints, or as one
            loop whose output is split, with the heating valve driven from one part of its range and
            the cooling valve from another. Either way, the thing to check when reading it is the
            same: <strong>there must always be a gap between heating and cooling</strong>. If the
            setpoints touch or cross, both can be active at once, each undoing the other, and the
            energy bill pays for both.
          </p>
          <p>
            Sequences also step plant. Multiple boilers or chillers are brought on in turn as load
            rises, with timers and minimum run times holding each stage before the next is called,
            and duty and standby swapping so that run hours are shared. When you are asked to prove
            a sequence at commissioning, you are checking that each stage comes in and drops out in
            the order the description of operation sets out.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Separate setpoints adjusted on their own"
          whatHappens="A user complains a room is cold, so someone raises the heating setpoint on the head end. Nobody touches the cooling setpoint. The heating setpoint now sits above the cooling one, and the fan coil heats and cools at the same time. The room feels no better and both the boiler and chiller work harder."
          doInstead="When you change one setpoint in a heat/cool sequence, read the other one too and keep the deadband between them. Where the strategy offers a single user adjustment that moves both together, use that instead of the individual setpoints."
        />

        <SectionRule />
        <ContentEyebrow>Fire priority in logic</ContentEyebrow>

        <ConceptBlock
          title="The fire condition is the last gate before the output"
          plainEnglish="Whatever else is in the strategy, the fire signal must be the final thing that decides whether the fan runs. Nothing can be joined in after it."
          onSite="On any fan strategy you are shown, find the output point and step one block back. If that block is not the fire gate, ask why."
        >
          <p>
            The rule is simple to state: a fire signal takes priority over every manual and
            automatic command in the plant logic. No hand request, head-end override, schedule,
            optimum start or frost routine may run a fan that the fire strategy has stopped. Not
            every fan stops on fire: smoke control fans are run by the fire system, and the cause
            and effect decides what each item of plant does. The logic on this page is for the fans
            the fire strategy stops.
          </p>
          <p>
            In logic, that means the fire condition sits <strong>last</strong>. Take a supply fan
            with several reasons to run:
          </p>
          <ul>
            <li>
              <strong>Wrong order.</strong> Fan = (Schedule AND NOT Fire) OR Head-end override. The
              fire gate only applies to the schedule. If someone has left the override on, the OR is
              satisfied and the fan runs through a fire.
            </li>
            <li>
              <strong>Right order.</strong> Request = Schedule OR Optimum start OR Head-end
              override. Permit = Auto AND NOT Trip. Fan = Request AND Permit AND NOT Fire. Every
              reason to run is gathered first, and the fire condition is the final AND before the
              output point.
            </li>
          </ul>
          <p>
            Because the controller writes its outputs after the pass and the last write wins, the
            same thinking applies to any other block that can write to the fan output, such as a
            separate override or a test routine. If it writes after the fire logic, it beats the
            fire logic. The fire gate must be the last word on the output, with nothing executed
            after it that touches that point.
          </p>
          <p>
            Check too whether the strategy latches the fire shutdown, and what the description of
            operation says about restart once the fire signal clears. Plant coming back by itself
            the moment the fire panel is reset may not be what the fire strategy wants. That is a
            question for the cause and effect agreed with the fire alarm engineer.
          </p>
        </ConceptBlock>

        <Pullquote>
          Requests first, permissions next, fire last. If anything is joined in after the fire gate,
          it is a path round it.
        </Pullquote>

        <ConceptBlock
          title="The software is the second line, not the first"
          plainEnglish="The BMS may also drop its own run command on fire as follow-up. The stop that matters is the fire alarm interface contact wired into the starter circuit."
          onSite="At a fire witness test, prove the hardwired stop with the selector in Hand as well as Auto. If the fan keeps running in Hand, the stop is wired in the wrong place."
        >
          <p>
            As Section 6.5 set out, in UK practice the fire detection and alarm system drives the
            fire actions through its own interfaces. The BMS watches the fire alarm status, and may
            tidy up afterwards in ways that are not life safety. It is not the life-safety path.
          </p>
          <p>
            Section 2.7 showed where that leaves the wiring. A contact from the fire alarm interface
            relay is wired into the <strong>starter control circuit</strong>, upstream of the BMS
            enable and in the part of the circuit that hand mode also depends on. When it opens, the
            contactor drops out whatever the selector is set to and whatever the controller is
            asking for. That is the real protection, and it acts at once. A drive&rsquo;s keypad or
            local mode must not be able to get round it either.
          </p>
          <p>
            The fire gate in the BMS strategy is a <strong>second line</strong>. It stops the
            controller asking for the fan, so plant does not fight the hardwired stop, the head end
            shows the right state, and nothing restarts by itself out of sequence. But software can
            be edited, a point can be left forced, a controller can lose power or communications.
            None of that should leave a fan able to run against the fire strategy, and with the
            hardwired stop in place none of it can.
          </p>
        </ConceptBlock>

        <Scenario
          title="The override that beat the fire signal"
          situation="At an office fit-out, the fire alarm engineer and the controls engineer are running the cause and effect witness test. The fire signal is applied for the zone. AHU-2 and AHU-3 supply fans both stop at once, because the hardwired fire contacts in their starter circuits open. But the head end still shows the BMS commanding AHU-3's fan on: it has a fan override set to on, left over from earlier balancing work."
          whatToDo="Do not sign off the BMS part of the test. Ask the controls engineer to open the AHU-3 fan strategy and trace back from the output. The override is ORed in after the AND NOT Fire block, so it bypasses the fire gate. The logic is reordered so the override joins the other requests and the fire condition is the last AND before the output. Clear the override, then repeat the test with the override set on deliberately to prove it can no longer beat the fire signal. Check the other AHU strategies for the same pattern, since they are often copied from one template."
          whyItMatters="The hardwired stop did its job, which is why it is there. Had either fan kept running for any time after the fire signal and stopped only later, that would have been a failed test of the hardwired stop, because it must act at once. Here the plant stopped, but the BMS was still commanding the fan, so the head end showed the wrong state, and a strategy that lets an override beat the fire signal is one fault away from relying on a single line of protection. Reading the logic found a problem that the plant on that day happened to cover."
        />

        <InlineCheck
          id="bms-7-2-fire"
          question="Which of these fan strategies meets the fire priority rule?"
          options={[
            'Fan = (Schedule AND NOT Fire) OR Override',
            'Fan = (Schedule OR Override) AND NOT Fire',
            'Fan = Schedule OR (Override AND NOT Fire)',
            'Fan = (Schedule OR NOT Fire) AND Override',
          ]}
          correctIndex={1}
          explanation="Only the second gathers every request first and then gates the result with NOT Fire, so nothing can run the fan with the fire signal active. The first and third each leave one request outside the fire gate. The fourth puts NOT Fire inside an OR, so with the schedule and override both on the fan runs straight through a fire."
        />

        <CommonMistake
          title="A test routine that runs after the fire gate"
          whatHappens="A controls engineer adds a block that exercises the supply fan for a few minutes each week to keep its bearings healthy. The block is placed at the end of the strategy and writes straight to the fan output. Because the last write in the pass wins, the weekly run would command the fan on even with the fire signal active. Nobody notices, because the fire gate itself is still drawn correctly."
          doInstead="When any block is added that writes to a fan or damper output, check where it sits in the execution order. Every request, including test and exercise routines, should feed the request side of the logic so the fire condition stays the last word on the output. Ask for the change to be proved with the fire signal applied."
        />

        <FAQ
          items={[
            {
              question: 'Will I be expected to change the logic myself?',
              answer:
                'Normally no. Strategies belong to the controls engineer, and changes should go through them with the backup and version control covered in Section 7.4. Your job is to read the logic well enough to explain what the plant is doing, find faults that are really in the field wiring or the panel, and spot something that looks wrong so it can be raised.',
            },
            {
              question:
                'The strategy is drawn as ladder, not function blocks. Does any of this apply?',
              answer:
                'Yes. Contacts in series are AND, contacts in parallel are OR, a normally closed contact is NOT, and timers and latches look much the same. The order of rungs matters in the same way the order of blocks does. The fire condition should still be the last thing that decides the output.',
            },
            {
              question:
                'Why does the head end show a fan commanded on when the BMS fire gate should have stopped it?',
              answer:
                'Usually because something writes to the output after the fire logic, such as an override or a separate block, or because the fire input point is configured the wrong way round. Trace back from the output and check the live state of the fire input against the fire panel. The hardwired stop in the starter should still have stopped the fan itself.',
            },
            {
              question: 'Do I need to understand the PID maths to commission a loop?',
              answer:
                'Not for your part of the job. You need to confirm the PV is reading correctly, the output drives the actuator the right way over its full stroke, and the enable comes from the right condition. Tuning the gain and integral time is the controls engineer’s work.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Read function block diagrams from the output point backwards: every condition that has a say in whether the plant runs is to the left of it.',
            'AND is series contacts (permissions), OR is parallel contacts (requests), NOT is a normally closed contact. Gather requests with OR, then let permissions veto with AND.',
            'On-delays add patience before a fault counts; off-delays give run-on after plant stops; latches hold a fault until someone resets it.',
            'A PID block has setpoint, process variable, output and enable. Enable it from fan run proven, not just the schedule, or the integral winds up.',
            'A heat/cool sequence must keep a deadband between heating and cooling setpoints. Crossed setpoints mean the plant fights itself.',
            'Fire sits last in the logic so no override or request can bypass it, and nothing that executes after it may write to the same output.',
            'The hardwired fire stop in the starter control circuit is the real protection in every mode. The BMS fire gate is the second line.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-7-section-1"
          prevLabel="Design documents"
          nextHref="/study-centre/upskilling/bms-module-7-section-3"
          nextLabel="Addressing and point mapping"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule7Section2;
