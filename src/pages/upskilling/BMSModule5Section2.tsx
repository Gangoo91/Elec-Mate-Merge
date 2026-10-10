/**
 * BMS Module 5 · Section 2 — BACnet
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches BACnet the way an electrician meets
 * it on site: devices and their device instance numbers, objects (an analogue input for a room
 * temperature, a binary output for a fan command), properties, the services one device uses to
 * ask another for something, the 16-level command priority array, and the two network types
 * that matter in UK buildings — BACnet/IP at network level and MS/TP over RS-485 at field
 * level, joined by routers. Ends with what the installer must get right on an MS/TP trunk.
 * The old page taught a fixed devices-per-segment figure and a fixed-length device ID format,
 * both wrong, and quoted cable lengths in a way the sources do not support; all of that is
 * gone. No device counts, address ranges or baud rates are stated.
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

const TITLE = 'BACnet | BMS Module 5.2 | Elec-Mate';
const DESCRIPTION =
  'BACnet for electricians: devices, instance numbers, objects, properties and services, command priority, BACnet/IP versus MS/TP, and wiring an MS/TP trunk properly.';

const outcomes = [
  'Explain what BACnet standardises and what it leaves to each manufacturer',
  'Describe a BACnet device, its Device object and why its device instance must be unique across the whole site',
  'Name the objects behind real points (a room temperature, a fan command, a setpoint) and read an identifier such as AI-1',
  'Say what a property is, what a service is, and how ReadProperty, WriteProperty, change of value and Who-Is / I-Am are used',
  'Explain the 16-level priority array and why an operator override can be left behind after commissioning',
  'Tell BACnet/IP from MS/TP, say where each is used, and list what an installer must get right on an MS/TP trunk',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Two controllers on different floors are both set to device instance 3001. What is the likely result?',
    options: [
      'Nothing at all, as instance numbers only need to be unique on each floor of a building',
      'The router renumbers one of them automatically on start-up',
      'The head end cannot tell them apart, so data goes astray',
      'Both devices share their points, which is how load sharing is done',
    ],
    correctIndex: 2,
    explanation:
      'The device instance has to be unique across the whole BACnet internetwork, not just one segment or floor. Discovery replies come back from whichever device answers to that number, so the head end binds to the wrong box or flips between the two. Routers pass messages on; they do not fix duplicate numbering.',
  },
  {
    id: 2,
    question:
      'A room temperature sensor is wired to a controller input. Which BACnet object normally represents it?',
    options: [
      'An analogue input object',
      'A binary output object',
      'A time schedule object',
      'The controller’s device object',
    ],
    correctIndex: 0,
    explanation:
      'A temperature is a continuously variable measured value coming into the controller, so it is an analogue input (shown as AI). A binary output is a two-state command going out, such as a fan start. The device object describes the controller as a whole, not one point on it.',
  },
  {
    id: 3,
    question: 'What is the difference between an object and a property in BACnet?',
    options: [
      'Objects are the physical controllers; properties are the cables and terminals between them',
      'Objects can only be read; properties can only be written',
      'Properties are proprietary extras; objects are the standard part',
      'An object models one item; its properties hold its details',
    ],
    correctIndex: 3,
    explanation:
      'An object models one thing (an input, an output, a setpoint, a schedule), and every object is a collection of properties, each with an identifier and a value. Present value is one property among several. Some properties are read-only, some writable, and standard objects can still carry vendor-specific properties.',
  },
  {
    id: 4,
    question:
      'Every slot in the priority array of a commandable fan output has been relinquished. What sets the fan’s present value now?',
    options: [
      'The last value that was written to any slot',
      'The value held at priority 16 by default',
      'The object’s relinquish default property',
      'The head end, which must write a new command',
    ],
    correctIndex: 2,
    explanation:
      'When every slot is empty, present value falls back to the relinquish default property. Relinquishing writes a null, so no earlier value is kept. Priority 16 is only the slot a write lands in when no priority is given, and it is empty too here. The head end does not have to write anything for the object to have a value.',
  },
  {
    id: 5,
    question:
      'A client sends a WriteProperty request with no priority given. What priority does BACnet apply?',
    options: [
      'Priority 1, so that the write always wins',
      'Priority 8, the operator level',
      'Priority 16, the least important',
      'The write is rejected until a priority is supplied',
    ],
    correctIndex: 2,
    explanation:
      'With no priority in the request, the write defaults to 16, the least important level. That is why a write from a test tool can appear to do nothing: something else is holding the point at a more important level. Priority 1 is the most important, not the default.',
  },
  {
    id: 6,
    question: 'Where are you most likely to find MS/TP in a building?',
    options: [
      'On the field bus to room controllers on a floor',
      'Between buildings on a campus over the client’s IT network',
      'On the internet link to the controls contractor’s office',
      'Inside a single controller, between its main processor and its own I/O',
    ],
    correctIndex: 0,
    explanation:
      'MS/TP runs over RS-485 twisted pair and is the low-cost choice for unitary and application-specific controllers: fan coils, VAV boxes, small plant controllers. Links between buildings and to the wider network use BACnet/IP over Ethernet, with routers joining the two.',
  },
  {
    id: 7,
    question:
      'BACnet/IP devices sit on two separate IP subnets and discovery only finds devices on one of them. Why?',
    options: [
      'BACnet/IP cannot run on more than one IP subnet in the same building at all',
      'The MS/TP termination resistors have been left out',
      'Each subnet needs its own device instance range',
      'Broadcasts do not cross subnets without a BBMD',
    ],
    correctIndex: 3,
    explanation:
      'Discovery relies on broadcast messages, and IP routing does not pass broadcasts between subnets. A BACnet Broadcast Management Device (often a function inside a larger controller or router) forwards them. Instance numbers must be unique site-wide anyway, and MS/TP termination has nothing to do with IP.',
  },
  {
    id: 8,
    question: 'How does a device on an MS/TP trunk get permission to start a conversation?',
    options: [
      'It waits until the line has been quiet for a fixed time and then transmits',
      'It must hold the token, which is passed between master devices in turn',
      'The router polls each device in address order',
      'Any device may transmit at any time and collisions are retried',
    ],
    correctIndex: 1,
    explanation:
      'MS/TP is master-slave / token passing. Masters pass a small token message between them and only the holder may start an exchange; slave devices only answer requests from masters. That is why one misconfigured or noisy device can disrupt the whole trunk: it breaks the token passing for everyone.',
  },
  {
    id: 9,
    question:
      'A new MS/TP trunk is run as a star from the controller, with a spur to each fan coil unit. What is wrong?',
    options: [
      'RS-485 needs one daisy-chained trunk, terminated at each end',
      'Nothing, as RS-485 is designed for star wiring from a central controller',
      'Stars are fine as long as every single spur is fitted with its own termination',
      'Only the cable colour matters, so the layout is irrelevant',
    ],
    correctIndex: 0,
    explanation:
      'An RS-485 bus is one trunk that goes in and out of each device, with a termination at each physical end. A star creates several ends and reflections; terminating every spur loads the line far more than the transceivers expect. Rewire as a chain, or follow the manufacturer’s approved repeater arrangement.',
  },
  {
    id: 10,
    question:
      'A fire signal must stop an air handling unit. The BACnet priority list has slots labelled for life safety. How should this be done in UK practice?',
    options: [
      'Write the stop at priority 1 from the BMS head end, which is exactly what that slot is for',
      'Use priority 8 so the operator can see and release it',
      'The fire alarm system stops it through its own interface; the BMS monitors',
      'Rely on the time schedule object to turn the air handling plant off',
    ],
    correctIndex: 2,
    explanation:
      'The priority slots exist in the protocol, but in UK practice plant shutdown on fire is carried out by the fire system and its own interfaces, and the fire signal must override every manual and automatic command in the plant logic. The BMS watches the fire alarm status and may do non-life-safety follow-up. A data write is never the life-safety path.',
  },
];

const BMSModule5Section2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 2"
        title="BACnet"
        backTo="/study-centre/upskilling/bms-module-5"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          The open protocol most UK building controls now speak: how it describes a building, how
          devices ask each other for things, and what you must get right when you wire it.
        </p>

        <TLDR
          points={[
            'BACnet is an open ANSI and ISO standard for building automation data. It standardises how devices describe and exchange information, not how they are programmed.',
            'Every BACnet device has one Device object, and its device instance number must be unique across the whole site, not just on its own floor or trunk.',
            'Information is held in objects (an analogue input for a room temperature, a binary output for a fan command); each object is a set of properties, and present value is one of them.',
            'Devices talk using services such as ReadProperty, WriteProperty, change of value and Who-Is / I-Am. Commands are ranked 1 to 16, and the most important non-empty slot wins.',
            'BACnet/IP runs on Ethernet at network level; MS/TP runs on RS-485 twisted pair at field level. Routers join them, and the MS/TP trunk is where wiring discipline matters most.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What BACnet is</ContentEyebrow>

        <ConceptBlock
          title="A shared language, not a shared brain"
          plainEnglish="BACnet lets controllers from different manufacturers understand each other's data. It does not make them interchangeable, and it does not write the control strategy for you."
          onSite="When a specification says 'BACnet throughout', that tells you how the boxes will talk. It tells you nothing about who programs them, what points they carry or whether they will actually do what the client wants."
        >
          <p>
            BACnet stands for Building Automation and Control Network. It is a data communication
            protocol written specifically for building services: heating, ventilation and air
            conditioning first, but also lighting, metering, lifts, access and fire panels where
            those systems offer a BACnet interface.
          </p>
          <p>
            It began life in 1987 under ASHRAE, the American heating and air conditioning
            engineers&rsquo; society, became an ANSI standard in 1995 and an ISO standard in 2003.
            It is maintained by an open committee, which is part of why so many manufacturers
            support it and why you will meet it on most new commercial jobs in the UK.
          </p>
          <p>
            The important thing to grasp early is what it standardises and what it does not. BACnet
            defines a common way to <strong>describe</strong> information inside a controller, a
            common set of <strong>requests</strong> one device can make of another, and several ways
            of <strong>carrying</strong> those requests over cable. It does not standardise how a
            controller is programmed, and it does not promise plug-and-play: swapping one
            manufacturer&rsquo;s controller for another&rsquo;s still means re-engineering the point
            list and the logic.
          </p>
          <p>
            Hold on to that three-part split: information, requests, transport. The rest of this
            page takes them one at a time, and nearly every BACnet fault you will chase on site
            lives in one of the three.
          </p>
        </ConceptBlock>

        <Pullquote>
          BACnet tells two controllers how to ask each other a question. It does not tell either of
          them what to do with the answer.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Devices and instance numbers</ContentEyebrow>

        <ConceptBlock
          title="Every device has one Device object, and one number that must never repeat"
          plainEnglish="Each controller carries a name badge called its device instance. Two controllers with the same badge on one site is a fault, however far apart they are."
          onSite="Before anything is powered up, get the device instance register from the controls contractor and label each controller with its number. It is far easier to check a label than to find a duplicate by trial and error later."
        >
          <p>
            A <strong>BACnet device</strong> is usually a microprocessor-based controller, a gateway
            or an operator interface: anything with software that understands the protocol. A room
            controller on a fan coil unit is a device. So is the plant controller in the air
            handling unit panel, and so is the head-end PC.
          </p>
          <p>
            Every device contains exactly one <strong>Device object</strong>. It holds information
            about the device itself: its identifier, its name, the vendor and model, and so on. The
            number part of that identifier is the <strong>device instance</strong>, and it is the
            number the rest of the system uses to find the device.
          </p>
          <p>
            Two rules matter. First, the device instance must be set in the field. It is not fixed
            at the factory, because the factory cannot know what else is on your site. Second, it
            must be <strong>unique across the entire BACnet internetwork</strong>: every floor,
            every plant room and every building linked to the same system. A trunk on the third
            floor and a trunk in the basement are different cables, but if they are routed onto one
            BACnet system they share one numbering scheme.
          </p>
          <p>
            Separately, each device also has an address on its own cable, its MAC address. On
            BACnet, the combination of network number and MAC address must also be unique, and each
            device instance maps to exactly one such pair. So there are two numbers to get right per
            device: a local address on its segment, and a device instance that is unique site-wide.
            Mixing the two up is a common commissioning error.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-2-instance"
          question="You are fitting replacement controllers to two fan coil units on different floors, each on its own MS/TP trunk. Both trunks are routed to the same head end. Which statement is correct?"
          options={[
            'Each trunk can reuse device instances, because they are separate cables',
            'Instances must be unique site-wide; MAC addresses only per trunk',
            'Device instances and MAC addresses are the same number, so both trunks must use different ranges',
            'The head end assigns device instances automatically when the controllers power up',
          ]}
          correctIndex={1}
          explanation="The device instance has to be unique across the whole BACnet internetwork. The MAC address is the device's address on its own segment, and it is the network number plus MAC address pair that has to be unique, so the same MAC can appear on two different trunks. Instance numbers are configured in the field, not handed out by the head end."
        />

        <SectionRule />
        <ContentEyebrow>Objects</ContentEyebrow>

        <ConceptBlock
          title="Objects: how BACnet describes the points on a controller"
          plainEnglish="Inside a BACnet controller, every input, output, setpoint, schedule and alarm is wrapped up as an object. The object type tells you what sort of thing it is; the instance number tells you which one."
          onSite="When a commissioning engineer says 'AI-3 is reading open circuit', they mean the third analogue input object on that controller. Learn the short codes and you can follow the conversation on the laptop screen."
        >
          <p>
            Everything a BACnet device knows is modelled as one or more <strong>objects</strong>. An
            object can stand for a physical point wired to a terminal, or for something that only
            exists in software, such as a setpoint, a calculation, a time schedule or a trend log.
            The standard defines dozens of object types, so that a temperature looks the same to
            every manufacturer&rsquo;s head end, and it also lets manufacturers add their own object
            types, which other vendors may not understand as well.
          </p>
          <p>The ones you will meet constantly on HVAC work:</p>
          <ul>
            <li>
              <strong>Analogue input (AI):</strong> a measured value coming in. A room temperature
              sensor on a fan coil controller is an AI. So is a duct pressure transmitter or a CO
              <sub>2</sub> sensor.
            </li>
            <li>
              <strong>Analogue output (AO):</strong> a variable command going out. The signal to a
              heating valve actuator or a drive speed reference.
            </li>
            <li>
              <strong>Binary input (BI):</strong> a two-state signal coming in. A fan proving
              switch, a filter pressure switch, a volt-free fault contact from a boiler.
            </li>
            <li>
              <strong>Binary output (BO):</strong> a two-state command going out. The relay output
              that energises the supply fan contactor is a BO.
            </li>
            <li>
              <strong>Analogue value and binary value (AV, BV):</strong> software points with no
              terminal behind them. A room setpoint or an occupied/unoccupied flag usually lives
              here.
            </li>
            <li>
              <strong>Schedule, calendar, trend log and notification class:</strong> the objects
              that hold time programmes, holiday dates, logged history and alarm routing.
            </li>
          </ul>
          <p>
            Every object has an <strong>object identifier</strong>: a single number that packs
            together the object type and its instance number on that device. Software shows it in a
            readable form such as AI-1 or BO-4. Note that an object&rsquo;s instance only has to be
            unique within its own device; every controller on the site can have an AI-1. The device
            instance is the one that must be unique site-wide.
          </p>
          <p>
            Software objects do real work. A schedule object holds a weekly programme of times and
            values, plus exceptions for holidays and special days, and is usually set up to write
            its value to other objects when it changes, such as the binary output for an air
            handling unit, for instance. A trend log object samples a point at an interval and
            stores the history inside the controller, so the head end can collect it in bulk rather
            than polling every point all day.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-2-objects"
          question="A fan coil controller energises the fan relay and also reads a fan airflow proving switch. Which pair of objects represents those two points?"
          options={[
            'Analogue output for the fan relay, analogue input for the proving switch',
            'Binary value for the relay, schedule for the switch',
            'Binary output for the relay, binary input for the switch',
            'Device object for the relay, analogue value for the switch',
          ]}
          correctIndex={2}
          explanation="The relay is a two-state command leaving the controller, so it is a binary output. The proving switch is a two-state signal arriving at the controller, so it is a binary input. Analogue objects are for continuously variable values such as temperatures and valve positions; value objects are software points with no terminal behind them."
        />

        <SectionRule />
        <ContentEyebrow>Properties</ContentEyebrow>

        <ConceptBlock
          title="Properties: the details inside each object"
          plainEnglish="An object is a folder; its properties are the pages inside. The page everyone looks at first is the present value: the current temperature, or whether the fan output is on."
          onSite="If a room temperature reads correctly on the controller's own display but wrongly on the head end, look at the properties, not just the value. An object left out of service, or with the wrong units, will show you a number that is not what the sensor is saying."
        >
          <p>
            Each object is described by a set of <strong>properties</strong>. A property has an
            identifier (a code that says which property it is) and a value. The standard says which
            properties every object of a given type must have and which are optional, and
            manufacturers can add proprietary ones on top.
          </p>
          <p>For the room temperature analogue input, the properties you would look at include:</p>
          <ul>
            <li>
              <strong>Object name:</strong> the text label, such as a floor, zone and point
              description. Good naming conventions make a head end readable; poor ones make it a
              guessing game.
            </li>
            <li>
              <strong>Present value:</strong> the live reading, in this case the temperature.
            </li>
            <li>
              Descriptive and status properties: engineering units, status flags and whether the
              point has been taken out of service for testing.
            </li>
          </ul>
          <p>
            Properties are either <strong>read-only</strong> or <strong>read/write</strong>. You can
            read the present value of a temperature input but not overwrite the physics. You can
            write a new value to a setpoint, and on output objects you can write a command. That
            distinction is what lets a head end, an operator panel and another controller all look
            at the same point safely.
          </p>
          <p>
            For a binary output driving a supply fan, present value is the command itself: active
            means energise the relay, inactive means release it. Commandable objects like this also
            carry two more properties, a <strong>priority array</strong> and a{' '}
            <strong>relinquish default</strong>, which decide who wins when several sources want to
            control the same fan. That gets its own section below, because it causes a large share
            of &ldquo;the BMS will not turn it off&rdquo; call-outs.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Services</ContentEyebrow>

        <ConceptBlock
          title="Services: the requests one device makes of another"
          plainEnglish="A service is a standard question or instruction. 'Tell me this value.' 'Set this value.' 'Let me know when it changes.' 'Who is device 3001?'"
          onSite="When a commissioning engineer runs a discovery and a controller does not appear, the Who-Is request was sent but no I-Am came back. That narrows the fault to the device, its addressing, or the cable between."
        >
          <p>
            Objects and properties describe the information. <strong>Services</strong> are the
            formal requests one BACnet device sends another to get something done. The device asking
            is the <strong>client</strong>; the device holding the data is the{' '}
            <strong>server</strong>. A head end is mostly a client; a field controller is mostly a
            server, although controllers often act as clients too when they share data with each
            other.
          </p>
          <p>The services grouped by what they do:</p>
          <ul>
            <li>
              <strong>Object access:</strong> read, write, create and delete. ReadProperty fetches a
              value; WriteProperty changes one, such as a new setpoint or a fan command.
            </li>
            <li>
              <strong>Device management:</strong> discovery, time synchronisation, restarting a
              device, backing up and restoring its database.
            </li>
            <li>
              <strong>Alarm and event:</strong> notifications when something goes into alarm or
              changes state, sent to whichever recipients the alarm routing names.
            </li>
            <li>
              <strong>File transfer:</strong> moving trend data and programs.
            </li>
            <li>
              <strong>Virtual terminal:</strong> a text-based operator interface, rarely seen now.
            </li>
          </ul>
          <p>
            Three services are worth knowing by name. <strong>Change of value (COV)</strong> lets a
            client subscribe to a point and be told only when it moves by more than a set amount,
            instead of polling it constantly; it saves a lot of traffic on a busy trunk, but a
            controller can only hold so many subscriptions, and clients have to renew them.{' '}
            <strong>Who-Is and I-Am</strong> are how devices find each other: a client broadcasts
            &ldquo;who is device X&rdquo; and only device X replies with its network number and
            address. <strong>Who-Has</strong> does the same for a named object.
          </p>
          <p>
            Whatever network carries them, the messages are the same. A WriteProperty to a fan
            output means exactly the same thing on an Ethernet backbone as it does on a twisted pair
            under a raised floor. That is what lets routers join different network types without
            translating anything.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-2-services"
          question="The head end runs a device discovery and every controller on a trunk replies except one. Which service exchange has failed for that controller?"
          options={[
            'ReadProperty and its reply',
            'Change of value subscription and notification',
            'WriteProperty and its acknowledgement',
            'Who-Is and I-Am',
          ]}
          correctIndex={3}
          explanation="Discovery uses the Who-Is broadcast, and each device that matches answers with I-Am, giving its network number and address. A missing I-Am points to the device being unpowered, misaddressed, wrongly numbered, or cut off by a cabling fault. ReadProperty and COV only come into play once the device has been found."
        />

        <SectionRule />
        <ContentEyebrow>Command priority</ContentEyebrow>

        <ConceptBlock
          title="Sixteen slots, and the most important one wins"
          plainEnglish="A commandable output keeps a list of 16 slots. Anyone who commands it writes into a slot. The output obeys the most important slot that has something in it, and falls back to a default when they are all empty."
          onSite="When an output refuses to follow its schedule, open its priority array. Nine times out of ten there is a value sat in a more important slot that somebody forgot to release."
        >
          <p>
            Several things may want to control the same supply fan: a time schedule, an optimiser,
            an operator at the head end, a frost protection routine. If every write simply overwrote
            the last one, the fan would follow whoever spoke most recently. That is in fact what
            happens on an object that does not support prioritisation.
          </p>
          <p>
            Commandable objects work differently. A WriteProperty can carry a{' '}
            <strong>priority from 1 to 16</strong>, where 1 is the most important. If no priority is
            given, the write goes in at 16, the least important. The value is stored in that slot of
            the <strong>priority array</strong>. The object then looks down the array from slot 1
            and takes the first one that is not empty as its present value. Lower-priority values
            are kept, not lost; they simply wait.
          </p>
          <p>
            When a source no longer needs control it <strong>relinquishes</strong> its slot by
            writing a null to it. The object looks down the array again. If every slot is empty, the
            present value falls back to the <strong>relinquish default</strong> property.
          </p>
          <p>
            Each site can decide what each level means, but the standard recommends a convention,
            and most systems follow it: 1 manual life safety, 2 automatic life safety, 5 critical
            equipment control, 6 minimum on/off, 8 manual operator, and the remaining levels left
            available, with 16 as the default. So an operator override normally sits at 8, above a
            schedule writing at a lower-importance level.
          </p>
          <p>
            Those first two slots carry the words &ldquo;life safety&rdquo;, and that is easy to
            misread. In UK practice, plant shutdown on fire, smoke control and door release are
            carried out by the fire detection and alarm system through its own interfaces. The fire
            signal must take priority over every manual and automatic command in the plant logic,
            and no hand or override route may run a fan the fire strategy has stopped. The BMS
            monitors the fire alarm status and may carry out non-life-safety follow-up actions. A
            BACnet write is not the life-safety path.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-2-priority"
          question="A heating pump output has a schedule writing 'off' at priority 16 and an operator 'on' still sitting at priority 8. What does the pump do, and what clears it?"
          options={[
            'It turns off, because the schedule wrote to the point most recently',
            'It runs until priority 8 is relinquished',
            'It alternates between on and off as each write arrives',
            'It runs until midnight, when the array clears itself',
          ]}
          correctIndex={1}
          explanation="The object takes its present value from the most important non-empty slot. Priority 8 is more important than 16, so the pump runs regardless of the schedule. It only drops back to the schedule when the operator level is relinquished with a null write. Nothing clears the array on a timer."
        />

        <CommonMistake
          title="Leaving operator overrides in place at handover"
          whatHappens="During commissioning, outputs are forced on and off from a laptop or the head end to prove wiring and rotation. Those writes sit at the operator level. Nobody releases them, so weeks later the plant ignores its time programme, runs all night, and the client blames the controls."
          doInstead="Make 'all manual overrides released' a line on the commissioning sheet. Before handover, check the priority array on every commandable output you touched, relinquish anything left at the operator level, and confirm each point is back under automatic control."
        />

        <SectionRule />
        <ContentEyebrow>Getting the message there</ContentEyebrow>

        <ConceptBlock
          title="BACnet/IP at network level, MS/TP at field level"
          plainEnglish="The fast, more expensive backbone is BACnet over ordinary Ethernet and IP. Out on the floors, the cheap twisted-pair bus to the room controllers is MS/TP. A router sits between them."
          onSite="A typical new office: plant controllers and the head end on BACnet/IP via network switches, and on each floor an MS/TP trunk from a router to the fan coil or VAV controllers. Your cable schedule will usually show both."
        >
          <p>
            The 2012 edition of the standard defines seven network types that can carry BACnet
            messages. Two dominate in UK buildings.
          </p>
          <p>
            <strong>BACnet/IP</strong> carries BACnet messages over UDP/IP, so devices plug straight
            into Ethernet switches and can use existing IP infrastructure, VLANs and wide area
            links. It is fast and is the most expensive option per device, which is why it is
            normally used for supervisory controllers, plant controllers and the head end rather
            than for every room unit.
          </p>
          <p>
            <strong>MS/TP</strong> (master-slave / token passing) uses EIA-485 signalling (what most
            people call RS-485) over twisted pair. It is the lowest-cost option and the most common
            BACnet network for unitary and application-specific controllers: fan coils, VAV boxes,
            small packaged plant. Masters pass a token between them, and only the device holding the
            token may start an exchange; slaves only answer when a master asks. One badly behaved
            device can therefore upset the whole trunk.
          </p>
          <p>
            A <strong>BACnet router</strong> links two different network types, for example
            BACnet/IP to MS/TP, and passes messages across without altering their content. It may be
            a separate box or built into a plant controller. Each network behind a router has its
            own network number.
          </p>
          <p>
            One IP-specific point catches people out. Discovery and several other operations use
            broadcast messages, and IP routing does not carry broadcasts from one subnet to another.
            Where BACnet/IP devices sit on more than one IP subnet, a{' '}
            <strong>BACnet Broadcast Management Device (BBMD)</strong> function is needed to pass
            them across. It is often built into a larger controller or router, but not always, and
            agreeing subnets and BBMD placement is a conversation with the client&rsquo;s IT team,
            covered further in Section 5.6.
          </p>
        </ConceptBlock>

        <Scenario
          title="Half the floor drops off after a fit-out"
          situation="A Cat A fit-out on the second floor of an occupied office has moved partitions and ceiling grid. When the BMS is restored, the head end shows about half of the floor's fan coil controllers as offline. The rest of the building is fine. The MS/TP trunk on that floor was disconnected and re-made by the fit-out electricians to suit the new ceiling."
          whatToDo="Start from the router and walk the trunk. Check it is still one chain in and out of each controller, with no new spurs where a unit was relocated. Check the two conductors have the same polarity at every terminal. Check the termination is still at each physical end of the trunk and has not been left in the middle where the old end used to be. Check the screen has been carried through each joint. Then check addresses: a relocated controller swapped with a spare may carry a duplicate MAC address or device instance."
          whyItMatters="MS/TP faults rarely affect one device neatly. A reversed pair, a missing termination or a duplicate address can disturb the token for everything downstream, which is why a fit-out on one floor can make a whole trunk look dead. Methodical checking from the router outwards finds it quickly; swapping controllers at random does not."
        />

        <SectionRule />
        <ContentEyebrow>Wiring an MS/TP trunk</ContentEyebrow>

        <ConceptBlock
          title="What the installer must get right"
          plainEnglish="MS/TP is an RS-485 bus. Run it as one chain, terminate the two ends, keep the screen continuous, keep the polarity consistent, and segregate it from power cables. Then record every address."
          onSite="Follow the controller manufacturer's MS/TP installation instructions for cable type, termination and screen earthing. They take precedence over general guidance, and they differ between products."
        >
          <p>
            MS/TP uses the same RS-485 physical layer you will meet again for Modbus RTU in Section
            5.3, and the same layout discipline applies. The protocol on top is different; the
            copper does not care.
          </p>
          <ul>
            <li>
              <strong>Daisy chain, not star.</strong> The trunk runs in to each controller and out
              again to the next. No star from a central point, and no long spurs to units that were
              moved. If the layout really needs branches, that is a job for a repeater or a second
              router, specified by the controls designer.
            </li>
            <li>
              <strong>Terminate the two ends only.</strong> RS-485 needs a line termination at each
              physical end of the trunk to stop signal reflections. Never in the middle, never on a
              spur. Many controllers have a switch or jumper for this; make sure it is on at the two
              end devices and off on every other one.
            </li>
            <li>
              <strong>Screen continuity.</strong> Use the screened twisted-pair cable the
              manufacturer specifies, carry the screen through every device or joint, and earth it
              where the manufacturer&rsquo;s instructions say, typically at one point, not at every
              controller.
            </li>
            <li>
              <strong>Consistent polarity.</strong> The two conductors must land on the same
              terminal at every device. One reversed controller can disrupt the trunk.
            </li>
            <li>
              <strong>Matching settings.</strong> Every device on an MS/TP trunk must run at the
              same data rate. Some detect it automatically, many do not, and one device set
              differently can upset the trunk. Set master MAC addresses in the range the controls
              engineer gives you.
            </li>
            <li>
              <strong>Addresses recorded.</strong> Every controller needs a MAC address unique on
              its trunk and a device instance unique on the site. Label them and hand the record to
              the controls contractor.
            </li>
          </ul>
          <p>
            This page deliberately gives no figures for cable length, device numbers per trunk or
            data rate. Those depend on the cable, the transceivers and the speed chosen, and the
            controller manufacturer&rsquo;s data sheet is where they belong. If a trunk is long or
            heavily loaded, ask the controls designer to confirm it before you pull the cable.
          </p>
          <p>
            Before the controls engineer arrives, do the electrician&rsquo;s part of the proving.
            Check continuity of each conductor and the screen end to end, check there is no short
            between the pair or from either conductor to the screen. Do this with every controller
            disconnected at both ends of the section. Never put an insulation resistance tester on a
            bus cable with devices connected, because the transceivers can be destroyed. Where an
            insulation test is wanted on SELV or PELV signal wiring, BS 7671 Table 64 sets 250 V DC
            with a minimum of 0.5 MΩ. Then confirm the terminations are set only at the two end
            devices, and mark up a drawing showing the actual order of the controllers on the chain.
            That drawing is what lets someone find a fault on a trunk years later without lifting
            every ceiling tile on the floor.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 528.1"
          meaning="An MS/TP trunk is a Band I circuit. It must not share a wiring system with Band II circuits unless one of the permitted methods is used, for example a separate compartment or containment, or insulation rated for the highest voltage present. Segregate it, or use a permitted method; BS 7671 does not set a separation distance of its own."
          cite="BS 7671:2018+A4:2026, Regulation 528.1"
        />

        <CommonMistake
          title="Copying a controller's configuration and keeping its device instance"
          whatHappens="To save time, an engineer clones the configuration of a working fan coil controller onto ten new ones. The device instance comes across with it. The head end now finds several devices answering to one number, binds to whichever replied last, and points appear and disappear at random."
          doInstead="Treat the device instance as part of the labelling, not the configuration. Set it from the site register on every controller after any copy or replacement, and run a discovery to confirm each number appears exactly once."
        />

        <SectionRule />
        <ContentEyebrow>Checking what a product supports</ContentEyebrow>

        <ConceptBlock
          title="'BACnet compatible' is not a specification"
          plainEnglish="Two BACnet products can both be genuine and still not do what you need together. The product's BACnet data sheet tells you exactly which parts of the standard it supports."
          onSite="If a client asks you to supply a meter, drive or packaged unit that will 'talk to the BMS on BACnet', ask the controls contractor which data sheet details they need before you order it."
        >
          <p>
            BACnet is large, and no device supports all of it. A smart sensor may only answer
            ReadProperty requests; a building controller may host schedules, trend logs and alarm
            routing for a whole floor. To make that visible, each product should come with a{' '}
            <strong>Protocol Implementation Conformance Statement (PICS):</strong> a standard BACnet
            data sheet listing the device profile it conforms to, the object types and services it
            supports, and which network types it can use.
          </p>
          <p>
            Device profiles have short names you will see on data sheets: building controller,
            advanced application controller, application-specific controller, smart sensor, smart
            actuator and operator workstation. The groups of supported features are described in
            standard building blocks, so two data sheets can be compared line by line. Products can
            also be independently tested and listed, which gives the controls designer more
            confidence that what the data sheet claims is what the product does.
          </p>
          <p>
            For an electrician the practical point is simple: the network type matters to you (is it
            an RS-485 terminal or an Ethernet port), and the rest matters to the controls designer.
            Do not assume that a product will join an MS/TP trunk because it says BACnet on the box.
            Some products only offer BACnet/IP, and some only offer it as a paid option.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Do I need to understand BACnet to wire an MS/TP trunk?',
              answer:
                'You do not need to program it, but you do need to understand enough to install it properly: one daisy-chained trunk, terminations at the two ends only, a continuous screen earthed as the manufacturer says, consistent polarity, segregation from Band II cables, and a record of every MAC address and device instance. Most MS/TP faults on handover are installation faults, not software ones.',
            },
            {
              question: 'How many controllers can go on one MS/TP trunk, and how long can it be?',
              answer:
                'That depends on the controllers, the cable and the data rate chosen, so take the figures from the controller manufacturer’s installation data rather than a rule of thumb. If a trunk is long or busy, ask the controls designer to confirm the layout before the cable goes in. Splitting a large floor across two trunks and routers is common and usually cheaper than chasing intermittent faults later.',
            },
            {
              question: 'What is the difference between a BACnet router and a gateway?',
              answer:
                'A router joins two BACnet network types, such as BACnet/IP and MS/TP, and passes BACnet messages across unchanged. A gateway translates between BACnet and a different protocol, such as Modbus, so something is mapped and something can be lost. Gateways are covered in Section 5.5.',
            },
            {
              question: 'Is BACnet/IP the same as putting the BMS on the office network?',
              answer:
                'It uses the same kind of Ethernet and IP equipment, but whether it shares the client’s network is a design decision with security consequences. Many sites keep the BMS on its own network or VLAN. Subnets and BBMD placement need agreeing with the client’s IT team. Section 5.6 covers network design and cyber security.',
            },
            {
              question:
                'Can the BMS use the life-safety priority levels to shut plant down on fire?',
              answer:
                'The slots exist in the protocol, but in UK practice fire actions such as plant shutdown, smoke control and door release are driven by the fire detection and alarm system through its own interfaces. The fire signal must override every manual and automatic command. The BMS monitors fire alarm status and may do non-life-safety follow-up.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'BACnet standardises how devices describe information, ask for things and carry messages, not how controllers are programmed.',
            'Every device has one Device object, and its device instance must be unique across the whole site. The MAC address only has to be unique on its own trunk.',
            'Points are objects: a room temperature is an analogue input, a fan command is a binary output, a setpoint is usually an analogue value. Present value is one property among several.',
            'Services are the requests between devices: ReadProperty, WriteProperty, change of value subscriptions, and Who-Is / I-Am for discovery.',
            'Commandable outputs obey the most important non-empty slot of a 16-level priority array; release operator overrides before handover.',
            'BACnet/IP runs on Ethernet at network level and needs a BBMD across subnets; MS/TP runs on RS-485 at field level; routers join them without changing the message.',
            'On MS/TP: daisy chain, terminate the two ends only, keep the screen continuous and polarity consistent, match the data rate on every device, segregate from Band II, and record every address. Never insulation test the trunk with devices connected.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-5-section-1"
          prevLabel="How BMS devices talk"
          nextHref="/study-centre/upskilling/bms-module-5-section-3"
          nextLabel="Modbus RTU and Modbus TCP"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule5Section2;
