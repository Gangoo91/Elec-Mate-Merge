/**
 * BMS Module 5 · Section 3 — Modbus RTU and Modbus TCP
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches Modbus the way an
 * electrician meets it: one master polling many slaves, four data tables and the handful of
 * function codes that read and write them, the off-by-one between a manual's register
 * numbers and the address on the wire, and above all the RS-485 bus itself — three
 * conductors, a daisy-chained trunk with short drops, a terminator at each end and nowhere
 * else, biasing in one place, and the faults installers cause and then have to find. Modbus
 * TCP is covered as the same messages carried on Ethernet, with port 502 and the unit
 * identifier explained. The old page taught 120 ohm terminators as the rule, a baud-rate
 * versus distance table, invented speed comparisons and "32 devices max" as a hard ceiling;
 * every figure now comes from the official Modbus specifications with its meaning intact.
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

const TITLE = 'Modbus RTU and Modbus TCP | BMS Module 5.3 | Elec-Mate';
const DESCRIPTION =
  'Modbus for electricians: masters and slaves, registers and function codes, RS-485 daisy chains, termination, biasing, register offsets, port 502 and common wiring faults.';

const outcomes = [
  'Explain how a Modbus master polls its slaves, and why a silent device only shows up as a time-out',
  'Name the four Modbus data tables and match the common function codes to them',
  'Explain why a register number in a manual can be one higher than the address the BMS sends',
  'Wire an RS-485 Modbus RTU bus correctly: three conductors, daisy chain, short drops, screen and common earthed once',
  'Place line terminations and biasing correctly, and prove the terminations with a meter',
  'Describe what changes with Modbus TCP, including port 502 and the unit identifier behind a gateway',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A Modbus RTU slave on a chain of meters has been switched off. How does the BMS controller find out?',
    options: [
      'The slave’s last reply carries a power-fail exception code',
      'Its request goes unanswered and the response time-out runs out',
      'The next slave on the trunk reports a CRC error to the master',
      'The master’s comms LED turns red as soon as the supply is lost',
    ],
    correctIndex: 1,
    explanation:
      'Slaves never speak unless asked, and never talk to each other. The master sends its request, waits, and logs an error when nothing comes back within the response time-out. There is no power-fail exception. Neighbouring slaves cannot report on another device. An LED shows the master’s own traffic, not another device’s supply.',
  },
  {
    id: 2,
    question:
      'A meter manual lists a value as holding register 1, numbered from 1. What address does the request on the wire carry?',
    options: [
      '0, because addresses in the message start at zero',
      '1, because the message always uses the manual number',
      '2, because the function code takes the first slot',
      'It depends on the baud rate set on the meter',
    ],
    correctIndex: 0,
    explanation:
      'The Modbus data model numbers items from 1, but the address inside the message counts from 0, so item 1 is sent as address 0. Some manuals list the numbered item, some list the address. Getting this wrong reads the register next door rather than raising an error.',
  },
  {
    id: 3,
    question: 'Which pair of function codes reads 16-bit registers?',
    options: ['01 and 02', '05 and 15', '06 and 16', '03 and 04'],
    correctIndex: 3,
    explanation:
      '03 reads holding registers and 04 reads input registers. 01 and 02 read single bits (coils and discrete inputs). 05 and 15 write coils; 06 and 16 write registers. Reads that come back as exception 01 often mean the device does not support the code you chose.',
  },
  {
    id: 4,
    question:
      'You are adding a meter to the middle of an RS-485 trunk. Where does its line termination go?',
    options: [
      'On the new meter, so that every device is matched to the cable',
      'Nowhere, as only the two ends of the trunk are terminated',
      'At the master and at the new meter, replacing the old far-end one',
      'On the drop cable between the trunk and the new meter',
    ],
    correctIndex: 1,
    explanation:
      'A terminator belongs near each end of the trunk and nowhere else: no more than two on a pair, and never on a drop cable. A meter added mid-run is left unterminated. Fitting one to every device loads the line and is a classic cause of a bus that worked until the last few meters went on.',
  },
  {
    id: 5,
    question: 'Where should line biasing (the pull-up and pull-down resistors) be fitted?',
    options: [
      'At every slave that has a biasing switch, so that the line is held firmly',
      'At both ends of the trunk, alongside the line terminations',
      'At one place for the whole bus, usually the master',
      'Only on the drop cables, never on the trunk',
    ],
    correctIndex: 2,
    explanation:
      'Biasing holds the idle line in a known state. It is fitted once for the whole bus, normally at the master, and every other device has its biasing switched off. Enabling it on several slaves stacks resistors in parallel and loads the line.',
  },
  {
    id: 6,
    question:
      'With the bus powered down, you measure across D0 and D1 at the master and read close to the value of one 150 ohm terminator. What does that suggest?',
    options: [
      'One terminator is missing or disconnected',
      'Both terminators are fitted and the bus is healthy',
      'A third terminator has been fitted somewhere mid-run',
      'D0 and D1 are shorted together at a slave',
    ],
    correctIndex: 0,
    explanation:
      'Two 150 ohm terminators in parallel read about half of one, around 75 ohms. Reading the full value of one means the meter is seeing only one of them, so the other end is open or unfitted. A third would read lower still, and a short would read near zero. Device loads and biasing shift these readings a little, so look for the pattern, not an exact figure.',
  },
  {
    id: 7,
    question:
      'An integrator sends Modbus TCP requests to a gateway at one IP address to read three RS-485 meters behind it. How does the gateway know which meter is wanted?',
    options: [
      'Each meter is given its own TCP port number on the gateway',
      'The gateway reads all three and returns whichever answers first',
      'The meters each take an IP address from the building network',
      'The unit identifier carries the meter’s slave address',
    ],
    correctIndex: 3,
    explanation:
      'On Modbus TCP the IP address finds the gateway, and the one-byte unit identifier carries the serial slave address of the device behind it. Talking straight to a TCP device, the unit identifier is not needed and 0xFF is the recommended value.',
  },
  {
    id: 8,
    question:
      'Five new heat meters go onto an existing bus, all straight out of the box. Comms to the old devices become erratic. What do you check first?',
    options: [
      'The firmware version of the BMS head end',
      'That each new meter has its own unique slave address',
      'Whether the screen is earthed at both ends of every cable',
      'That the meters are wired in a star from the panel',
    ],
    correctIndex: 1,
    explanation:
      'New devices of one type often leave the factory at the same address. Two slaves at one address both answer the same request and their replies collide, which corrupts traffic for that address and can upset the bus. Earthing the screen at both ends and star wiring are faults in their own right, not fixes.',
  },
  {
    id: 9,
    question: 'Which statement about the RS-485 common conductor is right?',
    options: [
      'It is optional on a two-wire bus because the pair carries the data',
      'It should be connected to protective earth at every device',
      'It must link every device, and be earthed at one point only',
      'It replaces the cable screen, so the screen can be left off',
    ],
    correctIndex: 2,
    explanation:
      '"Two-wire" describes the data pair, but a third conductor, the common, has to run to every device as well. It is connected to protective earth at one point only, usually at the master. The screen is a separate requirement: the cable must be screened, with the screen earthed at one end.',
  },
  {
    id: 10,
    question:
      'A meter on a new bus is set to 9600 baud with no parity and two stop bits. Every other device uses 19200 baud, even parity. What happens?',
    options: [
      'That meter never replies to any request',
      'The master slows down to 9600 baud to suit the meter',
      'The meter answers but its values are scaled wrongly',
      'Nothing, as the RTU mode makes the settings automatic',
    ],
    correctIndex: 0,
    explanation:
      'All devices on one serial line must share the same transmission mode and serial settings. A device at the wrong baud rate or parity sees noise, not requests, so it never replies and shows as a time-out. Nothing on the bus negotiates the settings for you; you set them on each device.',
  },
];

const BMSModule5Section3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 3"
        title="Modbus RTU and Modbus TCP"
        backTo="/study-centre/upskilling/bms-module-5"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          The protocol behind most meters, drives and plant controllers you will connect to a BMS,
          and the RS-485 wiring rules that decide whether it works on the day.
        </p>

        <TLDR
          points={[
            'Modbus is ask-and-answer: one master polls, each slave replies only to its own address, and slaves never talk to each other. A dead device shows only as a time-out.',
            'Data lives in four tables: coils and discrete inputs (single bits), holding and input registers (16-bit words). Function codes 01 to 06, 15 and 16 do most of the work.',
            'Manuals number registers from 1; the message counts from 0. Get it wrong and you read the register next door without any error.',
            'RTU on RS-485 needs a twisted pair plus a common, daisy-chained, short drops, a terminator near each end and nowhere else, and biasing in one place only.',
            'Modbus TCP carries the same requests on Ethernet to port 502. Behind a gateway, the unit identifier carries the serial slave address.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Who talks, and when</ContentEyebrow>

        <ConceptBlock
          title="One master asks, slaves answer"
          plainEnglish="The BMS controller goes round the devices one at a time asking for readings. A device that is not asked says nothing, and a device that cannot answer simply stays quiet."
          onSite="When a meter shows as offline on the BMS, nothing told the controller it had gone. The controller asked, waited, gave up and flagged it. That is why a comms alarm can lag behind the actual fault."
        >
          <p>
            On a serial line Modbus is strictly master and slave. There is one master on the bus at
            any time, usually the BMS outstation or a gateway, and it starts every exchange. Each
            slave has its own address and replies only when that address is in the request. Slaves
            never start a conversation and never talk to each other, and the master handles one
            transaction at a time.
          </p>
          <p>
            Serial slave addresses run from 1 to 247. Address 0 is broadcast: every slave acts on
            it, nobody replies, and it can only be used for writing. Addresses 248 to 255 are
            reserved. In practice you will rarely see a bus anywhere near 247 devices, for wiring
            reasons covered further down this page.
          </p>
          <p>
            After a request the master starts a response time-out. If no valid reply arrives before
            it runs out, the master logs an error and may retry. The specification leaves the value
            to the application but describes one second to several seconds as typical at 9600 baud.
            Multiply that by a few dead meters and you can see why one faulty device slows the
            polling of every healthy one on the same bus.
          </p>
          <p>
            The newer protocol specification uses the words client and server for the same idea: the
            client asks, the server answers. On site you will hear both. A BMS outstation polling
            meters is the master or client; the meters are slaves or servers.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-3-polling"
          question="Two Modbus energy meters on the same RS-485 bus need to share a reading. How does that happen?"
          options={[
            'The first meter sends the value straight to the second',
            'The master reads one and writes the value to the other',
            'Both meters read each other on the broadcast address',
            'It cannot happen on Modbus under any circumstances',
          ]}
          correctIndex={1}
          explanation="Slaves never talk to each other. If one device needs a value from another, the master has to read it from the first and write it to the second. Broadcast is write-only and gets no replies, so it cannot be used to read anything."
        />

        <SectionRule />
        <ContentEyebrow>What is inside a device</ContentEyebrow>

        <ConceptBlock
          title="Four tables, and the function codes that read and write them"
          plainEnglish="A Modbus device keeps its data in four lists. Two hold on/off bits, two hold numbers. Each request names the list, where to start and how many to fetch."
          onSite="The device manual's Modbus table is the document you need. It tells you which table a value is in, its number, how it is scaled and whether you can write to it. Ask for it before first fix, not on commissioning day."
        >
          <p>
            Every Modbus device presents its data as four tables. Discrete inputs are single bits
            you can only read, such as a status contact. Coils are single bits you can read and
            write, such as a run command. Input registers are 16-bit words you can only read, such
            as a measured temperature. Holding registers are 16-bit words you can read and write,
            such as a setpoint, though many devices also put their readings there.
          </p>
          <p>
            Each table can hold up to 65,536 items, but a device only uses what its maker chose to
            map. How the tables relate to the real inputs, outputs and settings inside the device is
            entirely up to the manufacturer, which is why there is no shortcut round the manual.
          </p>
          <p>
            A request names the job by function code. The ones you will meet on almost every BMS job
            are:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>01</strong> read coils, <strong>02</strong> read discrete inputs
            </li>
            <li>
              <strong>03</strong> read holding registers, <strong>04</strong> read input registers
            </li>
            <li>
              <strong>05</strong> write a single coil, <strong>15</strong> write multiple coils
            </li>
            <li>
              <strong>06</strong> write a single register, <strong>16</strong> write multiple
              registers
            </li>
          </ul>
          <p>
            A single read of holding or input registers can fetch between 1 and 125 of them, so a
            controller can pull a whole block of meter values in one request rather than asking for
            each in turn.
          </p>
          <p>
            When a device cannot do what was asked, it sends back an exception code rather than
            data. The ones worth recognising are <strong>01</strong> (the device does not accept
            that function code), <strong>02</strong> (the address, or the address plus the quantity,
            runs past what the device has), and <strong>04</strong> (the device hit a fault it could
            not recover from). Gateways add two more: <strong>0A</strong> means the gateway could
            not route the request, usually a configuration or overload problem, and{' '}
            <strong>0B</strong> means the device behind the gateway did not reply, which usually
            means it is not there.
          </p>
        </ConceptBlock>

        <Pullquote>
          An exception is good news compared with silence. It proves the wiring, the address and the
          serial settings are right, and points straight at the request.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>The register number problem</ContentEyebrow>

        <ConceptBlock
          title="Numbered from 1 in the manual, addressed from 0 on the wire"
          plainEnglish="The first register is called number 1 but is sent as address 0. If the manual gives one and the BMS expects the other, you read the wrong value."
          onSite="Before mapping a whole meter, read one value you can check by eye, such as voltage or a setpoint shown on the device's own display. If the BMS shows a different but plausible number, you are almost certainly one register out."
        >
          <p>
            The Modbus data model numbers the items in each table from 1. The address carried in the
            actual message counts from 0. The protocol specification spells it out: registers
            numbered 1 to 16 are sent as addresses 0 to 15. So item number 1 in a table is address
            0, item 10 is address 9, and so on.
          </p>
          <p>
            Device manuals are not consistent about which they print. Some list the item number,
            some list the address on the wire, and some add their own conventions on top. BMS
            software is equally inconsistent: some ask for the number and subtract one for you,
            others want the raw address. Neither side is wrong. The trouble starts when the two
            assume different things.
          </p>
          <p>
            What makes this dangerous is that an off-by-one rarely produces an error. Asking for the
            register next door is a perfectly valid request, so the device returns a perfectly valid
            number that happens to belong to something else. An error only appears when the shift
            pushes the request past the end of the table. The specification gives the example: on a
            device with 100 registers, addressed 0 to 99, asking for 4 registers from address 96
            works, but asking for 5 from address 96 would need an address 100 that does not exist,
            so the device returns exception 02.
          </p>
          <p>
            A register holds 16 bits, which as an unsigned whole number is 0 to 65,535. Values that
            need more range, such as a running energy total, or that carry decimals, are often
            spread across two registers or stored with a scaling factor. The manual tells you the
            format, the order of the two halves and the scaling. If a reading looks wildly wrong but
            changes in step with the real value, suspect the format before the wiring.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Typing the manual's register number straight into the BMS"
          whatHappens="The engineer enters each value exactly as printed in the meter's Modbus table. The integration software also subtracts one. Every point reads the register before the one intended: the voltage point shows a current, the energy total looks like a frequency, and nothing raises an alarm because every request is valid."
          doInstead="Find out whether the manual lists numbers counted from 1 or addresses counted from 0, and whether your software expects one or the other. Prove it on one point you can read on the device's own display before mapping the rest, and record the convention on the points schedule for whoever comes next."
        />

        <InlineCheck
          id="bms-5-3-offset"
          question="A setpoint on an air handling unit controller reads 21.0 on its own display, but the BMS shows 3.0. Comms are healthy and other values update. What is the most likely cause?"
          options={[
            'The RS-485 terminators are missing',
            'The baud rate on the controller is wrong',
            'The point is mapped to the wrong register or format',
            'The controller is using the broadcast address',
          ]}
          correctIndex={2}
          explanation="If comms were broken, nothing would update at all. A valid but wrong number from a healthy device points at mapping: the wrong register through the off-by-one, or the right register read with the wrong scaling or format. Check against the manual's convention."
        />

        <SectionRule />
        <ContentEyebrow>Modbus RTU on RS-485</ContentEyebrow>

        <ConceptBlock
          title="Three conductors, and settings that must match"
          plainEnglish="The data travels on a twisted pair, but a third wire, the common, has to go to every device too. Every device on the bus must also be set to the same speed and format."
          onSite="Label the terminals by the names in each device's manual, not by colour or by what the last panel used. Write the D0, D1 and common terminal names for every device on the drawings before you pull a cable. And if the drawing shows a junction box with cables fanning out to several meters, it is a star, not a bus: re-route it as one run in and one run out of each device."
        >
          <p>
            Modbus RTU is the serial form of Modbus, and on building services it almost always runs
            on RS-485 two-wire. The two data conductors are a balanced twisted pair, named D0 and D1
            in the Modbus specification. You will also see them marked A and B, with D0
            corresponding to A and D1 to B, though manufacturers are not consistent about it and
            some swap the letters. Go by the manual for each device, not the letter on the terminal.
          </p>
          <p>
            &ldquo;Two-wire&rdquo; is misleading. A third conductor, the common, must link every
            device on the bus. It gives all the transceivers a shared reference, and leaving it out
            is a common reason a bus works on the bench and fails on site. The specification wants
            the common connected to protective earth at one point only for the whole bus, normally
            at the master.
          </p>
          <p>
            The cable must be screened, with the screen connected to protective earth at one end. To
            cut down wiring errors the specification recommends a colour code: yellow for D1, brown
            for D0, grey for the common. Use it where you choose the cores, and record on the
            drawings when you have not. A four-pair Category 5 cable can be used, up to a shorter
            trunk length than proper RS-485 cable, but watch the warning that comes with it:
            plugging a crossed patch lead into a two-wire Modbus system can damage equipment.
          </p>
          <p>
            Every device on one serial line must share the same transmission mode and serial
            settings. RTU mode is the default. Every device must support 9600 and 19,200 baud, with
            19,200 the default. Even parity is the default; odd parity or no parity may be offered,
            and no parity uses two stop bits instead of one. A device that differs on any of these
            cannot read the requests, so it never answers.
          </p>
          <p>
            In RTU mode a message has no start or end character. The receiving device knows a
            message is complete when the line goes quiet for at least three and a half character
            times, and it treats a gap of more than one and a half character times in the middle of
            a message as a broken frame. Each message also ends with a CRC, a check value worked out
            over the whole message; if it does not match, the device throws the message away and
            says nothing. That is why noise on the pair shows up as missed replies and time-outs
            rather than as wrong numbers.
          </p>
          <p>
            <strong>A daisy chain with short drops.</strong> RS-485 is one long cable from device to
            device, with each device connected along the way. It is not a star, and it is not a
            ring.
          </p>
          <p>
            A Modbus RTU bus is one trunk cable with devices connected along it, either directly by
            looping in and out of each device, which is the daisy chain, or by a short drop cable
            from a tap on the trunk. Drops must be short: never more than 20 m. Where one tap feeds
            several drops, they share a budget: 40 m divided by the number of drops, each.
          </p>
          <p>
            The specification does not give one maximum trunk length, because it depends on baud
            rate, cable, how many devices are connected and whether the system is two-wire or
            four-wire. It gives one reference point: at up to 9600 baud, with conductors of AWG 26
            or heavier (the American wire gauge data cable is usually sold by), the trunk can be up
            to 1000 m. AWG 24 is described as always sufficient for that length. A Category 5 cable
            is good for up to 600 m. Treat those as ceilings, not targets.
          </p>
          <p>
            On device count, 32 devices on one RS-485 Modbus segment without a repeater is always
            allowed. Some devices place a lighter load on the line and their documentation will say
            how many may share a segment; take the figure from the documents, not from memory.
            Beyond that, a repeater splits the system into separate segments, each wired and
            terminated as a bus in its own right.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Wiring RS-485 as a star from the panel"
          whatHappens="To save cable, the installer runs a separate cable from the BMS panel to each meter, all landed on the same two terminals. Each run is a long branch with an unterminated end. Signals reflect back down every branch, and the bus works with two meters, then falls over intermittently as more are added, usually on the far ones first."
          doInstead="Run one trunk from the master, looping in and out of each device, with the last device at the far end. If a device has to sit off the route, use a tap and a drop kept well inside the 20 m limit. Draw the route on the drawings before first fix."
        />

        <SectionRule />
        <ContentEyebrow>Termination and biasing</ContentEyebrow>

        <ConceptBlock
          title="A terminator near each end, and nowhere else"
          plainEnglish="Each end of the cable needs a resistor across the pair to stop the signal bouncing back. Two in total, one at each end, whatever the number of devices."
          onSite="Many devices have a termination switch or jumper. On a new bus, check every one: on at the two end devices, off at all the others. Most come with it in whatever position the factory chose, not the one your bus needs. The same goes for biasing: a slave whose manual says the line needs biasing is not the one that should provide it."
        >
          <p>
            When the signal reaches the end of the cable, any mismatch makes part of it reflect back
            along the pair and corrupt what follows. A line termination at each end of the trunk
            absorbs it. Both ends need one because data travels in both directions. A pair must
            never have more than two, and a drop cable must never have one.
          </p>
          <p>
            The termination goes across the pair, between D0 and D1. The specification allows a 150
            ohm resistor rated 0.5 W. Where the line is also biased, it describes a better choice: a
            120 ohm resistor rated 0.25 W in series with a 1 nF capacitor rated at least 10 V.
            Termination on equipment you buy is often built in and selected by a switch; use that
            rather than adding a loose resistor on top of it.
          </p>
          <p>
            Termination belongs to the ends of the cable, not to the master. If the master sits in
            the middle of the run, it is not terminated; the two physical ends are.
          </p>
          <p>
            <strong>Biasing holds the idle line steady, once.</strong> Between messages nobody is
            driving the pair, so it can float and pick up noise. Biasing gently pulls it into a
            known resting state. It is done at one place on the bus.
          </p>
          <p>
            When nothing is transmitting, the pair is not driven and is open to interference. Some
            receivers need the line held in a defined idle state, which is what line polarisation,
            usually called biasing, does. The documentation for each Modbus device should say
            whether it needs biasing and whether it can provide it.
          </p>
          <p>
            If any device on the bus needs it, one pair of resistors does the job for the whole bus:
            a pull-up from D1 to a 5 V supply and a pull-down from D0 to the common, each between
            450 and 650 ohms. They are fitted at one place only, usually at the master, and every
            other device must have its biasing turned off. Higher values in that range let more
            devices share the line. Biasing does cost capacity: the specification reduces the
            maximum number of devices by four when it is fitted.
          </p>
          <p>
            Biasing switched on at several slaves puts those resistors in parallel and drags the
            line harder than intended. Like extra terminators, it is invisible on a drawing and only
            shows up as comms that degrade as devices are added.
          </p>
        </ConceptBlock>

        <Pullquote>
          Two terminators, one biasing point, one earth for the common, one earthed end per screen.
          Most Modbus wiring faults are a count that has gone wrong.
        </Pullquote>

        <InlineCheck
          id="bms-5-3-termination"
          question="A trunk runs from the BMS controller in the plant room to six heat meters, with meter 6 at the far end. Which devices should have termination switched on?"
          options={[
            'All six meters, so each one is matched',
            'The controller and meter 6',
            'Meter 6 only, because the controller is the master',
            'Meters 1 and 6, the first and last slaves',
          ]}
          correctIndex={1}
          explanation="Termination goes near each end of the trunk. Here the ends are the controller and meter 6. The master is not exempt because it is the master; it is terminated because it sits at one end. Meter 1 is mid-run once the trunk continues past it."
        />

        <SectionRule />
        <ContentEyebrow>Modbus TCP</ContentEyebrow>

        <ConceptBlock
          title="The same messages, carried on Ethernet"
          plainEnglish="Modbus TCP is the same requests and answers sent over the building's IP network instead of an RS-485 pair. Devices are found by IP address, and the old slave address becomes the unit identifier."
          onSite="When an integrator asks for a meter's IP address, port and unit ID, they need all three. If it sits behind an RS-485 gateway, the unit ID is that meter's serial address."
        >
          <p>
            Modbus TCP keeps the function codes, the four tables and the register addressing exactly
            as they are on a serial line. What changes is the wrapping. A 7-byte header goes in
            front of each request. It carries a transaction number so replies can be matched to
            requests, a length, and a one-byte unit identifier in place of the serial slave address.
            The serial CRC is dropped, because TCP and Ethernet do their own error checking.
          </p>
          <p>
            Requests go to TCP port 502, which is registered for Modbus. A device must listen on 502
            by default. Some let you set another port as well, but 502 should still be available
            alongside it. A firewall or managed switch that blocks 502 stops Modbus TCP dead while
            everything else on the network carries on.
          </p>
          <p>
            The unit identifier matters most with a gateway. The IP address reaches the gateway; the
            unit identifier tells it which serial device behind it the request is for, using that
            device&rsquo;s slave address of 1 to 247. When you talk straight to a device on the IP
            network, the unit identifier is not needed: 0xFF is the recommended value, and 0 is
            accepted too. A gateway is also a second place for things to go wrong: its serial side
            still needs everything on this page about RS-485.
          </p>
          <p>
            The specification treats access control as something a device may add when the situation
            calls for it, not something every device has. Do not assume a Modbus TCP device protects
            itself. Keep it on the controls network, not the open office one; network design and
            security are covered in Section 6 of this module.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-3-tcp"
          question="A Modbus TCP chiller controller sits on the controls network. Ping works, but the BMS gets no Modbus replies. Which is the likeliest place to look?"
          options={[
            'The RS-485 termination switch on the chiller board',
            'The parity and baud settings on the chiller',
            'Whether TCP port 502 is being blocked or changed',
            'The chiller’s serial slave address setting',
          ]}
          correctIndex={2}
          explanation="A working ping proves the IP path, so Ethernet and addressing are fine. Termination and parity are serial settings that do not apply on TCP. A blocked or changed port 502 would stop Modbus while leaving ping working. The unit identifier only matters if the request has to pass through a gateway."
        />

        <SectionRule />
        <ContentEyebrow>Before first fix</ContentEyebrow>

        <ConceptBlock
          title="What the device documents must tell you"
          plainEnglish="Every Modbus device's paperwork should answer a short list of wiring questions. Get those answers for every device before the cable goes in, not when the integrator arrives."
          onSite="Build a one-page bus sheet for each RS-485 run: device, location, terminal names, address, baud, parity, termination on or off, biasing on or off. Fill it in as you go and hand it over with the as-fitted drawings."
        >
          <p>
            The Modbus serial specification puts a duty on manufacturers to document the things an
            installer needs. The terminal names D0, D1 and common are meant to be used in the user
            guide and cabling guide so devices from different makers can be connected without
            guesswork. Each device should say whether it needs line biasing and whether it can
            provide it. A device designed to load the line lightly enough to allow more than 32 on a
            segment must say how many are allowed.
          </p>
          <p>
            From that, and from the Modbus table in the manual, you can plan the bus on paper. Put
            the devices in route order and decide which two are the ends. Decide where biasing
            lives, normally the master. Allocate a unique address to every slave, check each device
            can run at the chosen baud rate and parity, and check the count against the device
            documentation and the effect of biasing. If the numbers do not fit on one segment, plan
            a repeater or a second bus now.
          </p>
          <p>
            Connectors are a trap on mixed systems. Some Modbus devices use RJ45 or 9-pin D-type
            sockets, and so do other field buses and some ordinary input and output circuits. A lead
            that fits is not proof that it belongs there, so follow the pin-out in the manual and
            label the sockets.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-3-planning"
          question="Planning a bus of 30 meters, you find the master must provide biasing because two meters need it. What should you check before committing to one segment?"
          options={[
            'Nothing, as 32 devices is always allowed, so 30 will fit',
            'That the bus is wired in a star so the biasing reaches every meter',
            'Whether 30 still fits once biasing cuts the maximum',
            'That every meter also has its own biasing switched on',
          ]}
          correctIndex={2}
          explanation="Thirty-two devices without a repeater is the figure for an unbiased line. With biasing fitted, the specification reduces the maximum by four, so 30 meters plus the master no longer fits that baseline. Check the device documentation for a higher figure, or plan a repeater. Biasing at every meter and star wiring are both faults."
        />

        <SectionRule />
        <ContentEyebrow>Faults you cause, and faults you find</ContentEyebrow>

        <ConceptBlock
          title="The installation faults behind most dead Modbus buses"
          plainEnglish="Nearly every RS-485 fault on a BMS job comes back to wiring or settings: the pair reversed, the ends wrongly terminated, a missing common, two devices with one address, or one device on the wrong speed."
          onSite="Before you call the integrator, walk the bus with the drawing: route, terminations, biasing, addresses, settings. It is quicker than a site visit from the software side, and usually it is one of these."
        >
          <p>The faults installers create most often are:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>D0 and D1 swapped</strong> at one device, often because its A and B are
              labelled the other way round. That device goes silent while the rest work.
            </li>
            <li>
              <strong>Terminations wrong</strong>: none fitted, a third one switched on mid-run, or
              one left on a device that used to be at the end before the bus was extended.
            </li>
            <li>
              <strong>Star or long spurs</strong> instead of a daisy chain, or a drop well past the
              20 m limit.
            </li>
            <li>
              <strong>Common not connected</strong>, the common earthed at several points instead of
              one, or cable screens earthed at both ends.
            </li>
            <li>
              <strong>Duplicate addresses</strong> from new devices left at their factory address.
            </li>
            <li>
              <strong>Mismatched settings</strong>: one device on a different baud rate or parity.
            </li>
            <li>
              <strong>The data cable run tight against power cables</strong>, especially the output
              cables from variable speed drives, where it picks up interference.
            </li>
          </ul>
          <p>
            For finding them, start with what the devices tell you. The specification requires a
            communication LED that lights while a frame is being sent or received, usually yellow,
            and recommends a red error LED that is lit steadily for an internal fault and flashes
            for a communication or configuration fault. A device whose comms LED flickers in step
            with the polling is hearing the bus; one that never flickers is not, which points at its
            wiring or its settings.
          </p>
          <p>
            With the bus isolated and devices powered down, a meter across D0 and D1 at one end
            gives a quick check of the terminations. Two 150 ohm terminators in parallel read about
            half of one, around 75 ohms. Reading the full value of one means the other end is open
            or unterminated; reading much lower suggests extra terminators, or a short. Device loads
            and biasing shift these figures, so judge the pattern rather than an exact number.
            Termination built with a series capacitor will not show on a DC resistance reading at
            all, so know which type is fitted before you start.
          </p>
          <p>
            Keep the multimeter on its resistance range for this. Never put an insulation resistance
            tester on a Modbus trunk with devices connected, because the RS-485 transceivers can be
            destroyed. Where an insulation test is wanted on SELV or PELV signal wiring, disconnect
            every device at both ends of the section first; BS 7671 Table 64 sets 250 V DC with a
            minimum of 0.5 MΩ.
          </p>
          <p>
            When one bad device or cable section drags the whole bus down, split the problem. With
            the bus isolated, break the trunk part-way along, fit a temporary terminator at the new
            end and see whether the near half comes back. Keep halving towards the fault. Restore
            the original terminations afterwards and check them again; a temporary terminator left
            in place is the next fault.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 Regulation 444.4.10"
          clause="BS EN 50174-1, BS EN 50174-2 and BS EN 50310 shall be applied for control, signalling and communication circuits within a building."
          meaning="An RS-485 Modbus bus is a communication circuit, so the separation of data cabling from power cabling follows BS EN 50174-2, not a figure in BS 7671. Separately, Regulation 528.1 requires circuits of different voltage bands to be segregated or to use one of its permitted methods. In practice: plan the Modbus route away from drive output cables and power runs, and check the separation against BS EN 50174-2."
          cite="Regulation 444.4.10; Regulation 528.1"
        />

        <Scenario
          title="Six new meters, and a bus that used to work"
          situation="A tenant fit-out adds six sub-meters to an existing Modbus RTU bus that ran four meters on the landlord's side for years. The last of the old meters had termination switched on. The installer loops the new meters on beyond it, sets each to the address on the schedule and turns on the termination switch at every new meter, reading the manual's advice to terminate the end device as applying to all of them. On power-up the old meters still read, most of the time; the new ones drop in and out."
          whatToDo="Map the trunk from the master to the true far end. Switch termination off at the old end meter, which is now mid-run, and at every new meter except the last one on the run. Confirm the master end is terminated. With the bus powered down, check across D0 and D1 for two terminators in parallel. Then confirm the new meters' addresses are unique against the existing four, their baud rate and parity match the rest, and biasing is enabled only at the master. Watch each meter's comms LED during a polling cycle."
          whyItMatters="An extended bus inherits the old one's settings. The terminator that was right at the old end becomes a fault once the trunk carries on past it, and enthusiastic termination at every new device loads the line so heavily that signals no longer reach reliably. Nothing on a drawing shows a termination switch position, so record them on the as-fitted schematic."
        />

        <FAQ
          items={[
            {
              question: 'Is it always 120 ohm resistors at each end?',
              answer:
                'Not according to the Modbus serial specification. It allows a 150 ohm resistor rated 0.5 W across the pair, and describes 120 ohms in series with a 1 nF capacitor as a better choice where the line is biased. Many devices have termination built in on a switch; use that and follow the device manual.',
            },
            {
              question: 'Can I use spare pairs in a Cat 6 data cable for an RS-485 bus?',
              answer:
                'The specification allows Category 5 cable for RS-485 Modbus up to 600 m, using one pair for D0 and D1 and a third conductor for the common. Keep it as a dedicated, screened run, not spare pairs in a cable carrying the office network, and never plug a crossed patch lead into a two-wire Modbus port, which can cause damage.',
            },
            {
              question:
                'A meter shows a healthy display but reads offline on the BMS. Where do I start?',
              answer:
                'Watch its comms LED while the master polls. If it never flickers, the meter is not hearing the bus: check its D0, D1 and common terminations, then its address, baud rate and parity against the rest. If it flickers but the BMS still times out, look at the address and the register mapping. A display that works only proves the meter has power.',
            },
            {
              question: 'How many devices can I put on one RS-485 bus?',
              answer:
                'Thirty-two on one segment without a repeater is always allowed. Some devices load the line less and are documented for more; take that number from the device documentation. Biasing reduces the maximum by four. Beyond that, use a repeater and treat each segment as its own bus with its own two terminations.',
            },
            {
              question: 'Does Modbus TCP still need termination and biasing?',
              answer:
                'Not on the Ethernet side; it is ordinary IP networking on port 502. But where a gateway connects TCP to serial devices, its RS-485 side is a normal Modbus RTU bus and needs everything on this page.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'One master polls; slaves answer only their own address and never each other. A dead or misconfigured device shows only as a time-out.',
            'Four tables: coils and discrete inputs are bits, holding and input registers are 16-bit words. Read with 01 to 04, write with 05, 06, 15 and 16.',
            'Item numbers start at 1, message addresses at 0. An off-by-one reads the wrong value without an error, so prove one point before mapping the rest.',
            'RS-485 needs the pair plus a common to every device, daisy-chained, with drops never over 20 m, screen earthed at one end and common earthed once.',
            'Terminate near each end of the trunk only, never more than two and never on a drop. Bias at one place, usually the master.',
            'Every device on a serial bus needs a unique address and the same baud rate, parity and mode.',
            'Modbus TCP uses port 502. Behind a gateway, the unit identifier carries the serial slave address.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-5-section-2"
          prevLabel="BACnet"
          nextHref="/study-centre/upskilling/bms-module-5-section-4"
          nextLabel="KNX, LonWorks, M-Bus and DALI as networks"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule5Section3;
