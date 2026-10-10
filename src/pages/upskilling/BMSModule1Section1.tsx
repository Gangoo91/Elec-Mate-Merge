/**
 * BMS Module 1 · Section 1 — What a building management system is
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the shape of every BMS an
 * electrician will meet: the three levels (management, automation, field), the outstation that
 * holds the control logic and keeps running without the network, the head end
 * that people look at, and the point as the unit everything is counted in. It also untangles
 * BMS, BEMS, BACS and BAS, and says plainly what a BMS is not — it is not the life-safety path
 * for fire. The old page carried an unsourced energy-savings percentage (in the body and as
 * a quiz answer), listed fire alarm and emergency lighting control as BMS core functions, and
 * gave unsourced decade ranges for "traditional" controls; all of that is gone.
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

const TITLE = 'What a building management system is | BMS Module 1.1 | Elec-Mate';
const DESCRIPTION =
  'What a BMS actually is: the management, automation and field levels, outstations, the head end, points, and how BMS, BEMS and BACS differ. Written for UK electricians.';

const outcomes = [
  'Describe a building management system in one sentence, in terms an electrician can check on site',
  'Name the three levels of a BMS (management, automation and field) and place any device you find into one of them',
  'Explain what an outstation does, and why plant keeps running when the head end or the network goes down',
  'Say what the head end is for, and what it should never be relied on to do',
  'Define a point, tell a hardwired point from a network point, and read the four basic point types',
  'Use BMS, BEMS, BACS and BAS correctly, and recognise which one a specification or regulation is using',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'You are asked to describe a BMS to an apprentice in one sentence. Which description is most accurate?',
    options: [
      'A PC in the plant room that switches every item of plant on and off directly from its screen',
      'Networked controllers wired to sensors and plant, with a head end on top',
      'A fire and security system that also happens to run the heating and lighting',
      'A software package that produces energy reports from the monthly utility bills',
    ],
    correctIndex: 1,
    explanation:
      'A BMS is a system of controllers wired to field devices and joined by a network, with a head end for people to use. The tempting first option is wrong because the PC is not what switches the plant: the outstations hold the logic and drive the outputs. Fire and security are separate systems a BMS may monitor, not part of its core job.',
  },
  {
    id: 2,
    question:
      'The head-end PC in the estates office has been switched off for a week while it is replaced. What happens to the boilers and air handling units?',
    options: [
      'They stop, because the head end sends every start and stop command to each item of plant',
      'They run flat out, because without the head end the outstations have no setpoints',
      'They drop back to Hand at each motor starter until the PC is replaced',
      'They carry on, because the outstations hold their own logic and schedules',
    ],
    correctIndex: 3,
    explanation:
      'Each outstation stores its own control strategy, schedules and setpoints, so the plant carries on. What is lost is the window onto it: no graphics, no alarms reaching the office and gaps in the trend logs. Plant that stops when the head end stops is a sign of a badly designed system, not normal behaviour.',
  },
  {
    id: 3,
    question: 'Which item belongs at the field level of a BMS?',
    options: [
      'A duct temperature sensor wired back to an outstation',
      'The operator workstation showing the plant graphics to staff',
      'A DDC outstation in the plant room control panel',
      'The server that stores the trend logs for the whole site',
    ],
    correctIndex: 0,
    explanation:
      'The field level is the hardware in contact with the plant and the spaces: sensors, actuators, switches and the like. The outstation is the automation level, and the workstation and server are the management level. A useful test is whether the device touches the air, water or plant directly.',
  },
  {
    id: 4,
    question: 'In BMS terms, what is a point?',
    options: [
      'Any terminal on the outstation, whether it is in use or still left spare',
      'A setpoint entered at the head end by the facilities manager',
      'One signal the system reads or writes, such as a sensor value or a command',
      'The network address that is given to each outstation when it is commissioned',
    ],
    correctIndex: 2,
    explanation:
      'A point is one piece of information the BMS reads or writes: one temperature, one run status, one valve command. A spare terminal is capacity, not a point, until something is wired to it and configured. Setpoints and addresses matter, but they are not what the word means.',
  },
  {
    id: 5,
    question:
      'A pump has a "run" command from the BMS and a separate "running" signal back from a current relay. How many points is that, and of what kind?',
    options: [
      'One point, because it is one pump and one item on the points schedule',
      'Two analogue inputs, one for the command and one for the running status',
      'Two points: a digital output for the command and a digital input for the status',
      'One digital output only, because the running status is already implied by the command',
    ],
    correctIndex: 2,
    explanation:
      'Command and status are separate points. The command is a digital output and the proof of running is a digital input. Treating them as one is how a BMS ends up reporting a pump as running because it was told to run, when in fact its overload has tripped.',
  },
  {
    id: 6,
    question:
      'A specification says the contractor will supply a "BEMS". What should you take that to mean?',
    options: [
      'A building management system where energy management is the main purpose',
      'A different kind of system that has no controllers or outstations in it',
      'A system that is required to use one particular communication protocol',
      'A metering system that records energy use but cannot control any of the plant',
    ],
    correctIndex: 0,
    explanation:
      'BEMS and BMS describe the same kind of system and are often used interchangeably. BEMS is the term people reach for when energy management is the main purpose. It does not imply a protocol, and a BEMS still controls plant, it is not just a set of meters.',
  },
  {
    id: 7,
    question:
      'A small fan coil controller on the network looks after one unit and has its own built-in logic. What is it usually called?',
    options: [
      'A head-end workstation',
      'A protocol gateway',
      'A field sensor module',
      'A unitary controller',
    ],
    correctIndex: 3,
    explanation:
      'A unitary controller is a small outstation dedicated to one item of plant and joined to the same network. It is not a field sensor, because it makes decisions, and it is not a gateway, because it is not translating between protocols. Many unitary controllers on one floor are normal on a fan coil job.',
  },
  {
    id: 8,
    question:
      'On a site visit you notice the fire alarm panel is wired to the BMS through a volt-free contact. What is the normal UK arrangement?',
    options: [
      'The BMS shuts down the smoke control fans as soon as it sees that contact change state',
      'The fire alarm system carries out the safety actions; the BMS monitors the status',
      'The BMS releases the fire doors, because it has more spare outputs available in the panel',
      'The contact lets the BMS silence the fire alarm sounders out of hours',
    ],
    correctIndex: 1,
    explanation:
      'Life-safety actions such as plant shutdown, door release and smoke control are driven by the fire detection and alarm system and its own interfaces. The BMS watches the alarm status and may do non-safety follow-up, such as logging the event. Making the BMS the safety path would put a fire action at the mercy of software, a network and a head end.',
  },
  {
    id: 9,
    question:
      'Which of these is the management level of a BMS doing, rather than the automation level?',
    options: [
      'Running the PID loop that holds the AHU supply air temperature at setpoint',
      'Collecting alarms from every outstation and showing them to an operator',
      'Measuring the return water temperature on the heating circuit',
      'Driving a valve actuator with a 0–10 V signal from the outstation',
    ],
    correctIndex: 1,
    explanation:
      'Gathering alarms from the whole site and presenting them to people is a management-level job. The control loop and the valve output are automation-level work done by the outstation, and the temperature measurement is the field level. The head end shows the loop; the outstation runs it.',
  },
  {
    id: 10,
    question:
      'A tenant asks you to "add the new extract fan to the BMS". What is the first useful question to ask?',
    options: [
      'Which make of PC the head end runs on, and which software version it has',
      'Whether the building has a fire alarm system, and which company maintains it',
      'Which points it needs: status and fault only, or start and stop control too',
      'Whether the fan is on the same floor of the building as the head end',
    ],
    correctIndex: 2,
    explanation:
      'Adding plant to a BMS means adding points, so the first question is which ones: monitoring only, or monitoring and control. That decides the wiring, the spare I/O needed at the outstation and the controls engineer’s configuration work. The head end’s PC and its location make no difference to the field wiring.',
  },
];

const BMSModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 1"
        title="What a building management system is"
        backTo="/study-centre/upskilling/bms-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Before you can wire, test or fault-find a BMS you need a picture of how one is put
          together. This page gives you that picture, and the words controls engineers use for each
          part of it.
        </p>

        <TLDR
          points={[
            'A BMS is a network of controllers (outstations) wired to sensors and plant, with a head end on top for people to use.',
            'Every BMS has three levels: management (the head end), automation (the outstations) and field (sensors, actuators, contacts).',
            'The outstation holds the control logic. Lose the head end or the network and the plant should keep running.',
            'Everything on a BMS is counted in points: one point is one signal the system reads or writes.',
            'BMS, BEMS, BACS and BAS describe the same family of system. The fire alarm acts on a fire; the BMS only watches.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Start with one sentence</ContentEyebrow>

        <ConceptBlock
          title="What a BMS actually is"
          plainEnglish="A BMS is a set of small computers in control panels around the building, each wired to the sensors and plant nearby, all joined by a network to a screen where people can see and adjust what is going on."
          onSite="When someone says &lsquo;the BMS&rsquo;, ask which part they mean. The screen in the estates office, the panel in the plant room and the sensor in the duct are all &lsquo;the BMS&rsquo; to a building user, and they fail in completely different ways."
        >
          <p>
            A <strong>building management system</strong> is a computer-based control system that
            monitors and controls the engineering services in a building, or across a group of
            buildings. Heating, ventilation and air conditioning are its core work. Depending on the
            site it may also switch lighting, read meters, and watch over systems it does not
            control, such as lifts, generators or the fire alarm.
          </p>
          <p>It is not one box. A BMS is made up of three kinds of thing working together:</p>
          <ul>
            <li>
              <strong>Controllers</strong>, usually called <strong>outstations</strong> in the UK,
              which sit in control panels near the plant and do the actual controlling.
            </li>
            <li>
              <strong>Field devices</strong> (sensors, actuators, switches and contacts) wired to
              those controllers.
            </li>
            <li>
              A <strong>network and a head end</strong> that tie the controllers together and give
              people a single place to see the whole site, change settings and receive alarms.
            </li>
          </ul>
          <p>
            The idea underneath it is the same one you already know from a room thermostat:
            something measures, something decides, something acts. A BMS does that for hundreds or
            thousands of measurements at once, on a time schedule, with a record of what happened
            and an alarm when something goes wrong.
          </p>
          <p>
            Early systems did little more than supervise: they watched plant that was controlled by
            separate thermostats and time clocks, and raised an alarm when something stopped. Today
            the same network usually does the controlling as well, and often brings in information
            from other building systems. When you work on an older building, expect to find both
            kinds side by side.
          </p>
        </ConceptBlock>

        <Pullquote>
          A BMS is a network of small controllers, each running its own part of the building, with a
          screen on top so people can see the whole.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>The shape of every system</ContentEyebrow>

        <ConceptBlock
          title="Three levels: management, automation and field"
          plainEnglish="Top: the screens and servers people use. Middle: the controllers that make the decisions. Bottom: the sensors and actuators that touch the plant. Every BMS, old or new, any manufacturer, has these three levels."
          onSite="When you find an unfamiliar device in a riser or a ceiling void, place it in a level first. That tells you what it is likely to be connected to, who configures it, and what stops working if it fails."
        >
          <p>
            Controls engineers describe a BMS in three levels. The names vary a little between
            manufacturers, but the split is always the same, and it is the single most useful idea
            on this page.
          </p>
          <ul>
            <li>
              <strong>Management level.</strong> The head end: operator workstations, servers, web
              interfaces. This is where people look at graphics, change schedules and setpoints,
              receive alarms, review trend logs and pull energy reports. It supervises; it does not
              normally do the controlling.
            </li>
            <li>
              <strong>Automation level.</strong> The outstations and controllers. Each one reads its
              inputs, runs its control strategy and drives its outputs. This is where the decisions
              are made: when the boiler fires, how far a valve opens, when a fan steps up speed.
            </li>
            <li>
              <strong>Field level.</strong> The devices in contact with the plant and the spaces:
              temperature and humidity sensors, pressure switches, valve and damper actuators,
              current relays, auxiliary contacts in starters, meters. Field devices measure or act;
              they do not decide.
            </li>
          </ul>
          <p>
            Each level talks to the one next to it. Field devices are normally wired straight back
            to an outstation, terminal by terminal. Outstations talk to each other and to the head
            end over a communications network. Different manufacturers have used different
            communication methods at each level, which is why systems from two suppliers often need
            a gateway before they can share data. Protocols such as BACnet, Modbus, KNX, LonWorks,
            M-Bus and DALI each have their own module later in this course.
          </p>
          <p>
            For an electrician the field level is where most of the hours go: cable, containment,
            terminations and the power supplies to the panels. Knowing the other two levels exist is
            what stops you being surprised when a perfectly wired sensor still shows the wrong value
            on the screen.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-1-levels"
          question="A damper actuator on a fresh air duct, a DDC outstation in the AHU control panel, and a web page showing the AHU graphic. Which order puts them field, automation, management?"
          options={[
            'Outstation, actuator, web page',
            'Web page, outstation, actuator',
            'Actuator, outstation, web page',
            'Actuator, web page, outstation',
          ]}
          correctIndex={2}
          explanation="The actuator touches the plant, so it is the field level. The outstation runs the AHU strategy, so it is the automation level. The web page is how people see and adjust it, so it is the management level. If the web page went down, the outstation would still be driving the actuator."
        />

        <SectionRule />
        <ContentEyebrow>Where the decisions are made</ContentEyebrow>

        <ConceptBlock
          title="The outstation is the brain, not the head end"
          plainEnglish="The outstation is a small industrial computer in the control panel. Inputs come in, a stored control strategy works out what to do, and outputs go out to the plant. It keeps doing that whether or not anyone is watching."
          onSite="In a plant room control panel the outstation is usually easy to pick out: a controller with rows of numbered I/O terminals, a network connection and often a small display or status lights. The motor starters, contactors and isolators around it are the power side; the outstation is the brain."
        >
          <p>
            An <strong>outstation</strong> is a microprocessor-based controller that runs
            configurable software. The controls engineer builds a control strategy for it by linking
            standard function blocks together: time schedules, optimisers, compensators, PID loops,
            logic. Once loaded, the strategy lives in the outstation itself. You will also hear the
            terms <strong>DDC controller</strong> (direct digital control) and plain{' '}
            <strong>controller</strong>; on most UK sites they mean the same thing.
          </p>
          <p>
            Inputs and outputs are wired to each outstation. Typical inputs are the on/off status of
            plant and readings from sensors measuring temperature, humidity, pressure or air
            velocity. Typical outputs are on/off commands to plant and modulating signals to valve
            and damper actuators. Analogue signals on BMS field wiring are commonly 0–10 V or 4–20
            mA; Section 2.1 deals with both properly.
          </p>
          <p>
            Because each outstation holds its own logic, the control is <strong>distributed</strong>
            . That design has practical consequences you will rely on:
          </p>
          <ul>
            <li>A failed outstation affects only the plant wired to it, not the whole building.</li>
            <li>
              Field devices are wired only as far as the nearest outstation, not back to a central
              room, which keeps cable runs short.
            </li>
            <li>
              The system grows by adding outstations to the network, or by adding I/O expansion to
              an outstation that has room for it.
            </li>
            <li>
              The plant keeps running if the head end or the network is lost. Schedules, setpoints
              and safety logic in the outstation carry on.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Not every controller is a full outstation"
          plainEnglish="Big plant gets a big outstation. Small, repeated plant (fan coils, VAV boxes, heat pumps) often gets its own small controller on the same network. Some packaged plant comes with a controller of its own that the BMS only enables."
          onSite="On a refurbishment, find out early which controllers belong to the BMS installer and which arrived inside the plant from its manufacturer. That decides who configures what, and who you call when it misbehaves."
        >
          <p>You will meet three kinds of controller at the automation level:</p>
          <ul>
            <li>
              <strong>Outstations</strong> (sometimes called plant controllers or building
              controllers): larger units, usually in a plant room panel, running a whole air
              handling unit, boiler house or chiller plant.
            </li>
            <li>
              <strong>Unitary controllers</strong>: small controllers dedicated to one item of
              plant, such as a fan coil unit or a VAV box, joined to the same network. A single
              office floor may have dozens.
            </li>
            <li>
              <strong>Stand-alone controllers</strong>: controllers that are not on the BMS network
              at all, often supplied inside packaged plant. The BMS may still switch them on and off
              with a digital output on a time schedule and read back a status or fault signal, but
              it does not see inside them.
            </li>
          </ul>
          <p>
            That last case matters on site. If a packaged chiller or a boiler sequence controller
            has its own logic, the BMS is only giving it permission to run. When it will not run,
            the fault may be in the BMS enable signal, or entirely within the plant&rsquo;s own
            controls, and the two are often looked after by different people.
          </p>
        </ConceptBlock>

        <Scenario
          title="The head end died on Friday, and nobody noticed until Wednesday"
          situation="A secondary school&rsquo;s BMS head end is a PC in the site manager&rsquo;s office. It fails over a weekend. The heating, hot water and ventilation run normally for the next three days, and the problem only comes to light when the site manager tries to extend the heating hours for a parents&rsquo; evening and cannot get into the system."
          whatToDo="Confirm the plant is being controlled from the outstations: check their status lights and local displays, and check that the plant follows its normal schedule. Report the head end failure to the controls contractor so the PC can be replaced and the system reloaded from a backup. In the meantime, schedule or setpoint changes can only be made at the outstation itself, by someone who has the software and knows the strategy."
          whyItMatters="This is distributed control doing its job. The cost was not lost heating; it was three days with no alarms reaching anyone and a gap in the trend logs. If a boiler had locked out during those three days, the outstation would have known but nobody would have been told. A head end failure is not an emergency for the plant, but it is a blind spot for the people responsible for it."
        />

        <SectionRule />
        <ContentEyebrow>What people look at</ContentEyebrow>

        <ConceptBlock
          title="The head end"
          plainEnglish="The head end is the window onto the BMS. It shows the plant, collects alarms, keeps the history and lets authorised people change settings. It is the part users see, and the part they assume is the whole system."
          onSite="Be careful what you change from a graphic. A setpoint changed or a point put in &lsquo;manual&rsquo; on the head end goes straight down to the outstation and stays there until someone changes it back. Note anything you override, and hand it back on auto."
        >
          <p>
            The <strong>head end</strong> is the management level. You will also hear it called the{' '}
            <strong>supervisor</strong>, the <strong>front end</strong> or the central station; this
            course uses head end throughout. On older sites it is a dedicated PC; on newer ones it
            is usually a server that people reach through a web browser. Whatever its form, it gives
            the site:
          </p>
          <ul>
            <li>
              <strong>Graphics</strong>: schematics of each plant item with live values, so an
              operator can see what is running and what the readings are.
            </li>
            <li>
              <strong>Alarms</strong>: collected from every outstation, graded by how urgent they
              are, and passed to the people who need to act.
            </li>
            <li>
              <strong>Trend logs</strong>: a stored history of sensor values and outputs over time.
              This is how you answer &lsquo;what was the boiler doing at three this morning&rsquo;.
            </li>
            <li>
              <strong>Schedules and setpoints</strong>: occupancy times, holiday periods and target
              values that are then sent down to the outstations.
            </li>
            <li>
              <strong>Configuration and reports</strong>: engineering access to the outstations, and
              energy and maintenance reporting.
            </li>
          </ul>
          <p>
            Notice what is missing from that list: running the plant. In a well-designed system the
            head end never sits in the control path. It reads from the outstations and writes
            settings to them, but every start, stop and valve movement is decided in the outstation.
            That is why a BMS can be upgraded, rebooted or replaced at the management level without
            the building going cold.
          </p>
          <p>
            Two practical points follow. First, the head end holds things the outstations do not:
            the graphics, the alarm routing, the trend history and often the master copy of every
            strategy. Somebody should hold a current backup, and you should know who before you work
            on or near it. Second, the head end is increasingly reachable from outside the building
            for remote support. That convenience is also a security risk, which Section 5.6 returns
            to.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Treating the graphic as proof"
          whatHappens="A graphic shows an AHU supply fan as running and a sensible supply temperature, so the job is signed off. In fact the fan is tripped. The graphic is showing the BMS run command, not a proof-of-running signal, and the temperature sensor has been left hanging in the plant room rather than fitted in the duct. The screen looks healthy while the plant is not."
          doInstead="Treat the head end as a report of what the outstation believes. Before you trust a value, know which point it comes from: a command or a status, a real sensor or a fixed value. When it matters, check the plant itself (look at the fan, measure at the terminals, read the outstation&rsquo;s own display) and only then sign off."
        />

        <SectionRule />
        <ContentEyebrow>The unit everything is counted in</ContentEyebrow>

        <ConceptBlock
          title="Points: one signal, one name"
          plainEnglish="A point is one thing the BMS knows or one thing it can do. A temperature reading is a point. A pump run command is a point. Whether the pump is actually running is another point."
          onSite="Every BMS job is described in points before anyone pulls a cable. If you are pricing or planning the wiring, ask for the points schedule. It tells you exactly what has to be wired to each outstation, and what each wire is for."
        >
          <p>
            A <strong>point</strong> is a single source or destination of data in the system: one
            value read in, or one command sent out. Points are how BMS jobs are specified, priced,
            wired, commissioned and handed over, so it pays to think in them early.
          </p>
          <p>
            <strong>Hardwired points</strong> arrive on outstation terminals and come in four basic
            types, which Section 2.1 covers in detail:
          </p>
          <ul>
            <li>
              <strong>Digital input (DI):</strong> an on/off state read in. A run status from a
              current relay, a filter alarm from a pressure switch, a fault contact from a starter.
            </li>
            <li>
              <strong>Digital output (DO):</strong> an on/off command sent out. Start a pump, enable
              a boiler, switch a lighting contactor.
            </li>
            <li>
              <strong>Analogue input (AI):</strong> a varying value read in. A temperature, a
              humidity, a pressure.
            </li>
            <li>
              <strong>Analogue output (AO):</strong> a varying command sent out. A valve position, a
              damper position, a speed reference to a drive.
            </li>
          </ul>
          <p>
            Not every point has a wire. <strong>Network points</strong> (often called integration or
            virtual points) arrive over a data connection rather than a terminal: values read from a
            chiller&rsquo;s own controller over a protocol link, readings from a meter on a data
            bus, or values calculated inside the outstation. They count as points just the same, and
            they need checking just the same.
          </p>
          <p>
            The document that lists them all is the <strong>points schedule</strong> (some sites
            call it the points list or I/O list). For every point it gives what the point is for,
            what is being monitored or controlled, and the range it works over. Keep it true: a
            points schedule that no longer matches the wiring is the start of most long
            fault-finding days.
          </p>
          <p>
            Points also drive the work. Each hardwired point is a cable run, two or more
            terminations, a label, a test and a line on the commissioning sheet. Each network point
            is configuration and a check that the value is the right one. When a job grows by
            &lsquo;just a few more points&rsquo;, that is real cable, real I/O capacity and real
            commissioning time.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-1-points"
          question="An AHU frost thermostat is wired to the BMS so the operator can see when it has tripped. What type of point is that?"
          options={['Analogue input', 'Digital output', 'Analogue output', 'Digital input']}
          correctIndex={3}
          explanation="A thermostat contact is either made or broken, so the BMS reads it as an on/off state coming in: a digital input. It would only be an analogue input if the BMS were reading a varying temperature value. Outputs go from the BMS to the plant, not the other way."
        />

        <SectionRule />
        <ContentEyebrow>Four names, one family</ContentEyebrow>

        <ConceptBlock
          title="BMS, BEMS, BACS and BAS"
          plainEnglish="They are all names for the same family of system. Which one you hear tells you more about who is talking (a facilities manager, an energy consultant, a standards writer) than about the hardware."
          onSite="Do not let the acronym on a tender decide the scope. Read what it actually asks to be monitored, controlled, logged and reported."
        >
          <p>You will see four terms used, sometimes in the same document:</p>
          <ul>
            <li>
              <strong>BMS: building management system.</strong> The everyday UK term on site and in
              the trade. Older documents sometimes say EMS (energy management system) for the same
              thing.
            </li>
            <li>
              <strong>BEMS: building energy management system.</strong> The same kind of system, and
              often used interchangeably with BMS. People choose BEMS when energy management is the
              main purpose: monitoring, logging and cutting energy use rather than just keeping
              people comfortable.
            </li>
            <li>
              <strong>BACS: building automation and control system.</strong> The term used in
              standards and regulations. The <strong>BS EN ISO 16484</strong> series is the
              standards family for BACS systems and products, and <strong>BS EN ISO 52120-1</strong>{' '}
              grades how much a BACS contributes to a building&rsquo;s energy performance, in
              classes from A (high energy performance) to D (non energy-efficient). Section 1.5
              covers both.
            </li>
            <li>
              <strong>BAS: building automation system.</strong> Common in manufacturers&rsquo;
              literature and in material written outside the UK. Same family again.
            </li>
          </ul>
          <p>
            The difference that matters on site is not the name but the scope. A system sold as a
            BEMS on a small building may do little more than time schedules and meter logging. A BMS
            on a hospital may run hundreds of plant items and monitor dozens of other systems. Read
            the specification and the points schedule, not the acronym.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L, Volume 2 (England)"
          clause="A new building with a space heating or air-conditioning system of effective rated output greater than 180 kW should have a building automation and control system installed. In an existing building above that size, a BACS that is being installed or replaced should meet the specification paragraphs. That is paragraphs 6.66–6.67 and 6.72–6.73 of the 2021 edition, which is in force now, and paragraphs 5.76–5.77 and 5.84–5.85 of the 2026 edition, which takes effect on 24 March 2027."
          meaning="The Building Regulations guidance in England uses the term BACS, not BMS. It is statutory guidance, not law in itself, but above the threshold a BMS is an expected part of the building rather than an optional extra. Wales and Scotland set their own thresholds; Section 1.5 sets out all three."
          cite="ADL Vol 2 (2021) paras 6.66–6.67, 6.72–6.73; ADL Vol 2 (2026, takes effect 24 March 2027) paras 5.76–5.77, 5.84–5.85"
        />

        <InlineCheck
          id="bms-1-1-terms"
          question="A building regulations document requires a 'building automation and control system'. A tender for the same job calls it a 'BMS'. What follows?"
          options={[
            'They are two separate systems, so both must be installed',
            'Same family of system; the specification sets the scope',
            'A BACS only covers metering, so the BMS is extra scope',
            'The tender is wrong and must be reissued to say BACS',
          ]}
          correctIndex={1}
          explanation="BACS is the term used in standards and regulations, and BMS is the everyday one. They describe the same family of system, so nothing needs installing twice and the tender does not need reissuing. A BACS includes controllers, not just meters. What the system has to do comes from the specification and the points schedule."
        />

        <SectionRule />
        <ContentEyebrow>Knowing the edges</ContentEyebrow>

        <ConceptBlock
          title="What a BMS is not"
          plainEnglish="A BMS watches a lot of systems it does not control. The fire alarm, the lifts and the security system each do their own job; the BMS gives people one place to see their status."
          onSite="If a drawing shows a BMS output driving a fire damper, a smoke fan or a door release with no fire alarm interface in the path, stop and ask. In UK practice those actions come from the fire alarm system and its own interfaces."
        >
          <p>
            A modern BMS often shows the status of many other systems: fire alarm, lifts,
            generators, UPS, access control, medical gas alarms on a hospital site. It is easy to
            assume that because the BMS can see them, it controls them. Usually it does not, and for
            the safety systems it must not.
          </p>
          <ul>
            <li>
              <strong>Fire and life safety.</strong> Plant shutdown on fire, door release and smoke
              control are driven by the fire detection and alarm system and its own interfaces. The
              BMS monitors the fire alarm status and may carry out follow-up actions that are not
              life-safety related. Section 6.5 covers this interface in full.
            </li>
            <li>
              <strong>Lifts.</strong> The BMS can usefully monitor lift status and faults. It should
              not be able to influence the lift controls.
            </li>
            <li>
              <strong>Hardwired plant safeties.</strong> High-limit thermostats, the frost
              thermostat that protects an air handling unit coil, and similar safety devices on
              plant should not depend on software to act. (Frost protection of the building as a
              whole, bringing on pumps and boilers in cold weather, is a normal BMS routine. The
              coil frost thermostat is a safety device.) Section 3.6 deals with which safeties must
              stay hardwired.
            </li>
          </ul>
          <p>
            None of this makes the BMS less important. It makes it the right tool for the right job:
            control and supervision of building services, with a clear and deliberate boundary
            around anything that keeps people safe.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Moving a hardwired safety into software because the BMS can already see it"
          whatHappens="On a refurbishment, the high-limit thermostat on a boiler is taken out because the BMS already reads the flow temperature and can raise an alarm. The boiler is now protected only if the sensor, the outstation and its strategy are all working at the moment the temperature runs away, and an alarm on a screen does not stop anything."
          doInstead="Leave hardwired safeties hardwired, in the circuit they protect. If the BMS needs to know a safety has tripped, give it a monitoring input from the device. If a drawing or a request removes a safety device, query it with the designer before you touch it."
        />

        <SectionRule />
        <ContentEyebrow>Where the electrician fits</ContentEyebrow>

        <ConceptBlock
          title="Reading a BMS on your first walk round"
          plainEnglish="You do not need the software to understand a BMS. A walk round with a torch and the drawings tells you where the outstations are, what they are wired to and how they are joined up."
          onSite="Start at the plant room panel, find the outstation, and follow one point out to the plant and one link back to the network. Ten minutes doing that tells you more than an hour reading the specification."
        >
          <p>
            Most of the physical BMS is electrical work. Control panels need power supplies and
            protective devices. Outstations need wiring to every sensor, actuator and contact. The
            network needs cable and containment between panels. Plant needs power, with the BMS
            commands and status signals brought in through interposing relays and auxiliary
            contacts. Section 1.6 sets out where the electrician&rsquo;s work ends and the controls
            engineer&rsquo;s begins.
          </p>
          <p>On a first visit to an unfamiliar site, look for:</p>
          <ul>
            <li>
              <strong>The panels</strong>: each plant room or riser panel usually has an outstation,
              with its I/O terminals labelled to match the points schedule.
            </li>
            <li>
              <strong>The field devices</strong>: sensors in ducts, pipes and rooms, actuators on
              valves and dampers, current relays and contacts in the starters.
            </li>
            <li>
              <strong>The network</strong>: the data cabling linking outstations together and to the
              head end, and any gateways bringing in third-party plant.
            </li>
            <li>
              <strong>The head end</strong>: where it is, who logs in to it, and who holds the
              backups.
            </li>
          </ul>
          <p>
            With those four in your head, every BMS looks broadly the same, whoever made it. The
            rest of this module covers what a BMS connects to, why buildings have one, where you
            will meet one, the standards around them and how to work on them safely.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-1-boundary"
          question="A packaged boiler has its own sequence controller. The BMS sends it a run enable and reads back a fault contact. The boiler will not fire, and the BMS shows the enable as on. Where should you look first?"
          options={[
            'At the head end schedule, as it decides when the boiler runs',
            'At the BMS network, as a comms fault would stop the boiler',
            'At the boiler’s enable terminals, then its own controls',
            'At the outstation’s analogue outputs to the burner',
          ]}
          correctIndex={2}
          explanation="The BMS only gives a stand-alone controller permission to run. Prove the enable actually arrives at the boiler terminals. If it does, the fault is in the boiler&rsquo;s own controls, which may belong to another contractor. The head end is not in the control path, a network fault would not normally stop an outstation output, and the outstation does not drive the burner at all."
        />

        <FAQ
          items={[
            {
              question: 'Does every commercial building have a BMS?',
              answer:
                'No. Small buildings often run on stand-alone controls: time clocks, room thermostats and packaged plant controllers. In England, Approved Document L expects a building automation and control system where a heating or air-conditioning system has an effective rated output over 180 kW. Wales and Scotland set their own thresholds, which Section 1.5 covers.',
            },
            {
              question: 'Is the head end the same as the BMS?',
              answer:
                'No. The head end is the management level: the screens, servers and software that people use. The control is done in the outstations. A site can lose its head end and keep running, although nobody will see alarms or be able to change settings remotely until it is back.',
            },
            {
              question: 'Do I need the manufacturer’s software to work on a BMS?',
              answer:
                'For the electrical work, no. Panels, field wiring, containment and power supplies are standard electrical work done to drawings and a points schedule. Loading strategies, changing configuration and commissioning the logic are controls engineering tasks and need the manufacturer’s tools and training.',
            },
            {
              question: 'Can the BMS switch off plant when the fire alarm goes off?',
              answer:
                'In UK practice, fire-initiated actions such as plant shutdown, door release and smoke control come from the fire detection and alarm system and its own interfaces. The BMS monitors the fire alarm status and may carry out non-safety follow-up actions. It should not be the life-safety path.',
            },
            {
              question: 'What is the difference between a point and a terminal?',
              answer:
                'A terminal is a physical connection on the outstation. A point is a configured piece of data: one value read or one command written. A hardwired point uses a terminal; a network point arrives over a data link and uses none. Spare terminals are spare capacity, not points.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A BMS is a network of outstations wired to field devices, with a head end on top for people to use. It is not a single box.',
            'Three levels: management (head end), automation (outstations and controllers) and field (sensors, actuators, contacts). Place any device in a level first.',
            'The outstation holds the control strategy. Lose the head end or the network and the plant should carry on; what you lose is visibility and alarms.',
            'The head end shows what the outstation believes. Check command against status, and the plant itself, before you trust a graphic.',
            'Everything is counted in points: DI, DO, AI and AO on terminals, plus network points over data links. The points schedule is the job.',
            'BMS, BEMS, BACS and BAS name the same family of system. Regulations and standards say BACS; the scope comes from the specification.',
            'The BMS monitors fire alarms and lifts. The fire alarm system, not the BMS, carries out life-safety actions.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-1"
          prevLabel="Module 1: What a BMS is, and the rules around it"
          nextHref="/study-centre/upskilling/bms-module-1-section-2"
          nextLabel="What a BMS controls and connects to"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule1Section1;
