/**
 * BMS Module 7 · Section 3 — Addressing and point mapping
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches the two identities every BMS point
 * carries (where it lives on the network, and what it means), point naming conventions, device
 * addresses on Modbus and BACnet networks, setting addresses with DIP and rotary switches,
 * duplicate address faults, mapping physical terminals to software points, and keeping the
 * points schedule and the labels on site true — with the electrician's part made explicit. The old
 * page's invented case study (a two-week handover delay), its unsourced KNX address format and
 * its "factory default address of 1" claim are gone; Modbus and BACnet addressing rules now come
 * from the protocol documents themselves.
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

const TITLE = 'Addressing and point mapping | BMS Module 7.3 | Elec-Mate';
const DESCRIPTION =
  'Point naming, Modbus and BACnet device addresses, DIP switch settings, duplicate address faults, and mapping terminals to software points so labels match the schedule.';

const outcomes = [
  'Explain why every BMS point needs both a network address and a consistent, documented name',
  'Read and apply a point naming convention, and say what makes one good or poor',
  'State the Modbus slave address range and the BACnet rule for device instances, and set a device address from DIP or rotary switches',
  'Recognise the symptoms of a duplicate address on a bus and find the cause methodically',
  'Trace a point from the field device, through the cable and terminal, to the software point and its name',
  'Label cables and terminals so they match the points schedule, and feed site changes back so the documents stay true',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On a Modbus RTU bus, which addresses can you give to the individual meters and controllers you are connecting?',
    options: [
      'Any number from 0 to 255, as long as each one is different',
      '0 to 247, with 0 kept for the master',
      '1 to 247, each one different on that bus',
      '1 to 255, with the master on 1',
    ],
    correctIndex: 2,
    explanation:
      'Individual slave devices take addresses from 1 to 247 and each must be unique on the bus. Address 0 is not for the master: it is the broadcast address, which every slave listens to and none replies to. The master has no address of its own, and 248 to 255 are reserved.',
  },
  {
    id: 2,
    question:
      'Six new Modbus meters go on an existing bus and suddenly none of the meters on that bus will answer reliably. What is the first thing to check?',
    options: [
      'Whether two or more devices now share the same address',
      'Whether the head-end graphics have been updated for them',
      'Whether the new meters have been calibrated on site',
      'Whether the BMS licence covers all of the extra points',
    ],
    correctIndex: 0,
    explanation:
      'A duplicate address can upset the whole serial bus, not just the two devices involved, and the master can lose contact with every slave. New devices arriving all on the same factory setting is the classic cause. Graphics and licences would not stop existing meters answering.',
  },
  {
    id: 3,
    question: 'What does a BACnet device instance number have to be?',
    options: [
      'Unique within the controller it sits on',
      'Equal to the last part of the device’s IP address',
      'The same as the Modbus address of any gateway',
      'Unique across the entire BACnet network',
    ],
    correctIndex: 3,
    explanation:
      'The device instance must be configurable on site and unique across the whole BACnet network the device is installed on, not just on its own segment. Tying it to the IP address is a local habit some sites use, not a rule, and it breaks down when devices sit on MS/TP behind a router.',
  },
  {
    id: 4,
    question:
      'A device uses binary-weighted DIP switches. Switches worth 1, 2 and 8 are ON and the rest are OFF. Assuming the switches read the way the device’s own table says, what address is set?',
    options: ['10', '11', '12', '13'],
    correctIndex: 1,
    explanation:
      'With binary weighting the address is the sum of the switches that are ON: 1 + 2 + 8 = 11. The trap is assuming every manufacturer numbers the bank the same way. Some count from the other end or add an offset, so you always work from the table in that device’s instructions.',
  },
  {
    id: 5,
    question:
      'Why does the industry push for a naming convention to be agreed at the start of a job?',
    options: [
      'Because the controller will not accept any point that has no name',
      'Because renaming points later is slow, costly work',
      'Because BS 7671 sets out the required format for point names',
      'Because the names decide the network address of each device',
    ],
    correctIndex: 1,
    explanation:
      'Unstructured names can be fixed later, but the work is significant and is often charged point by point. BS 7671 says nothing about point names, and a name is separate from the network address: the address finds the device, the name says what the point means.',
  },
  {
    id: 6,
    question:
      'During point-to-point checks, the supply air temperature on the graphic rises when you warm the return air sensor. Where is the fault most likely to be?',
    options: [
      'A failed temperature sensor that has drifted out of range',
      'A duplicate network address on the air handling unit controller',
      'The PID settings in the control strategy for the heating valve',
      'Two sensors swapped at the terminals or in the mapping',
    ],
    correctIndex: 3,
    explanation:
      'The sensor clearly works, because the reading responds. It is just showing up under the wrong name, so the physical-to-software map is wrong somewhere: crossed cables at the terminals, or the points configured the wrong way round. A duplicate address would affect a whole device, not swap two readings.',
  },
  {
    id: 7,
    question:
      'You move a fan status input to a spare terminal because the original channel is damaged. What else must happen?',
    options: [
      'Remap the software point, and update the points schedule and cable markers',
      'Nothing more, as long as the fan status still shows correctly on the graphic',
      'Only the cable marker needs changing, because the software follows the wire',
      'The controls engineer reloads the strategy and the drawings stay as they are',
    ],
    correctIndex: 0,
    explanation:
      'The point only works again once the software is remapped to the new channel, and the documents and labels must follow or the next person will trace the wrong terminal. A graphic that looks right today does not stop the drawings lying tomorrow.',
  },
  {
    id: 8,
    question: 'On a BACnet/IP network, what acts as the device’s MAC address?',
    options: [
      'The device instance number',
      'The object name of the device',
      'The IP address together with the UDP port',
      'A number set on DIP switches inside the controller',
    ],
    correctIndex: 2,
    explanation:
      'On BACnet/IP, the IP address and the UDP port between them stand in for the MAC address. The device instance is a separate identity: BACnet keeps a one-to-one link between each device instance and its network number and MAC address pair, which is why devices can find each other by instance even if the address changes.',
  },
  {
    id: 9,
    question:
      'Where is the best place to fix the label for a duct temperature sensor that will be replaced at some point?',
    options: [
      'On the sensor housing itself, so that it can never be separated from the sensor',
      'Inside the controller panel only, where it is protected from damage and dirt',
      'On the ceiling tile below it, so that it can be seen from the floor',
      'On a plate next to it, with a plain description and the schematic reference',
    ],
    correctIndex: 3,
    explanation:
      'A plate next to the sensor survives a replacement, and carrying both a plain description and the schematic reference ties the device on the duct to the drawings and the points schedule. A label on the housing goes in the bin with the old sensor. Concealed sensors also need their positions marked and recorded.',
  },
  {
    id: 10,
    question:
      'What is the electrician’s most useful contribution to point mapping on a BMS installation?',
    options: [
      'Writing the point names and descriptions in the controller software',
      'Choosing the network addresses for every device on each of the buses',
      'Marking cables and terminals to match the schedule, and recording changes',
      'Deciding the control strategy and setpoints for each item of plant',
    ],
    correctIndex: 2,
    explanation:
      'Software, addresses and strategy normally belong to the controls engineer, although you may set addresses they give you. What only the installer can do is make sure the physical side matches the schedule: the right cable on the right terminal, marked with the right reference, and every change marked up.',
  },
];

const BMSModule7Section3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 3"
        title="Addressing and point mapping"
        backTo="/study-centre/upskilling/bms-module-7"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          How a BMS knows which device is which, how a wire on a terminal becomes a named point on a
          screen, and how to keep the drawings, the software and the labels on site telling the same
          story.
        </p>

        <TLDR
          points={[
            'Every point has two identities: an address that finds the device on the network, and a name that says what the point means. Both have to be right.',
            'A naming convention agreed at the start, documented and used on every system, is far cheaper than renaming hundreds of points later.',
            'Modbus slaves take addresses 1 to 247, each unique on the bus, with 0 kept for broadcast. A BACnet device instance must be unique across the whole BACnet network.',
            'Two devices on one address can take down a whole Modbus bus. Factory default addresses left unchanged are the usual cause.',
            'The electrician makes the physical side match the points schedule: the right cable on the right terminal, marked with the schedule reference, and every change written back.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The chain from sensor to screen</ContentEyebrow>

        <ConceptBlock
          title="Every point has an address and a meaning"
          plainEnglish="The address tells the BMS where to look. The name tells people what they are looking at. Get either wrong and the screen shows a confident, wrong answer."
          onSite="When a reading on the head end looks odd, ask two separate questions: is the BMS talking to the right device, and is this value the thing its name says it is?"
        >
          <p>
            A supply air temperature reading on a graphic has travelled a long way. It started as a
            sensor in a duct, went along a cable to a terminal on a controller input, was turned
            into a number by that input&rsquo;s configuration, became a software point with a name,
            and was then picked up across the network by the head end, which found the controller by
            its address. Alarms, trends, schedules and energy reports all hang off that one point.
          </p>
          <p>That gives you a chain with several links, and each one is a place for a mistake:</p>
          <ul>
            <li>
              <strong>Field device to cable:</strong> the right sensor, in the right place, on the
              right cable.
            </li>
            <li>
              <strong>Cable to terminal:</strong> the right cores landed on the right input channel.
            </li>
            <li>
              <strong>Terminal to software point:</strong> the channel configured as the right type
              of input, with the right range, and linked to the right point.
            </li>
            <li>
              <strong>Software point to name:</strong> the point carrying a name that tells everyone
              exactly what it is and where.
            </li>
            <li>
              <strong>Device to network:</strong> the controller or meter carrying a unique address,
              so the head end reads the device it thinks it is reading.
            </li>
          </ul>
          <p>
            Addressing is about the last link. Point mapping is about the middle three. The first
            two links are where the electrician lives, and they are where most mapping faults are
            actually made.
          </p>
        </ConceptBlock>

        <Pullquote>
          A BMS never says it does not know. If the wiring and the map disagree, it shows you a
          number anyway, under the wrong name, and everyone downstream believes it.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Naming conventions</ContentEyebrow>

        <ConceptBlock
          title="A point name is a short sentence, built the same way every time"
          plainEnglish="A good name tells you where the point is, which piece of plant it belongs to, and what it measures or does, in the same order on every point in the building."
          onSite="Ask for the project naming convention before you start marking cables. If nobody can show you one, raise it. It is far easier to agree now than to fix later."
        >
          <p>
            A naming convention is simply an agreed pattern for building point names. Most follow
            the same logic, working from the general to the particular: the site or building, then
            the plant item, then the thing being measured or controlled, then sometimes the type of
            point. Something like <strong>B03-AHU11-SAT</strong> for building 3, air handling unit
            11, supply air temperature, or <strong>B03-AHU11-SF-RUN</strong> for the supply fan run
            command on the same unit.
          </p>
          <p>The exact letters matter far less than the consistency. A good convention:</p>
          <ul>
            <li>
              <strong>Uses one pattern everywhere:</strong> the heating, the ventilation, the meters
              and any third-party plant brought in through a gateway, not one style per contractor.
            </li>
            <li>
              <strong>Gives one meaning to each abbreviation:</strong> if SAT means supply air
              temperature on one unit, it means exactly that on every unit.
            </li>
            <li>
              <strong>Is written down:</strong> with a key to every abbreviation, in the
              specification and later in the handover documents.
            </li>
            <li>
              <strong>Matches the drawings:</strong> the plant reference in the name is the same one
              painted on the plant and printed on the schematic.
            </li>
            <li>
              <strong>Sorts sensibly:</strong> so a list of points groups by building and plant item
              on its own, which makes trending and fault finding faster.
            </li>
          </ul>
          <p>
            Poor naming is one of those decisions that looks free at the start and costs later.
            Unstructured names can be converted afterwards, but it is slow, detailed work and is
            often priced per point. That is why industry guidance now asks for a convention to be
            agreed at design stage and applied from day one, even on a simple system.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Reference numbers, names and tags"
          plainEnglish="Most projects give each point a short reference number and a readable name. Newer systems may add tags that a computer can read as well as a person."
          onSite="The short reference on the points schedule is usually the best thing to put on your cable markers, because it is unique and it is printed on every drawing."
        >
          <p>
            A points schedule normally carries a short <strong>reference</strong> for each point
            alongside its full <strong>name</strong>. A typical line gives the reference, a
            descriptive name such as &ldquo;AH11 supply air temp&rdquo;, the point type (input or
            output, and what kind), the operating range, and the drawing it appears on. The
            reference is compact enough to print on a cable marker; the name is what an operator
            reads on the screen.
          </p>
          <p>
            On larger and more ambitious systems you will also hear about{' '}
            <strong>semantic tagging</strong>, using schemes such as Project Haystack or Brick.
            Instead of relying on a person to decode a name, each point carries standard tags
            describing what it is (a temperature, on supply air, on an air handling unit) so that
            analytics software can find and use it automatically. You will not configure tagging as
            an electrician, but a clean, consistent naming convention is what makes tagging possible
            later, and a messy one is what makes it expensive.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-3-naming"
          question="Two contractors on one site name their points differently: one uses B1-AHU2-SAT, the other uses SupplyTemp_AHU_2_Bldg1. Both systems work. What is the real problem?"
          options={[
            'The second style is too long for most controllers to store, so names will be cut short',
            'There is no problem at all, as long as each system works properly on its own',
            'BS 7671 requires a single naming format to be used across any one installation',
            'Nobody can rely on one pattern, so finding, trending and integrating points gets harder',
          ]}
          correctIndex={3}
          explanation="Both names are readable, but two patterns on one site means every search, report and alarm list has to cope with both, and any later integration has to map them by hand. Consistency across all systems is the whole point of a convention. BS 7671 has nothing to say about point names."
        />

        <SectionRule />
        <ContentEyebrow>Device and network addresses</ContentEyebrow>

        <ConceptBlock
          title="Modbus: one master, slaves numbered 1 to 247"
          plainEnglish="On a Modbus serial bus each meter or device gets its own number from 1 to 247. Nobody else on that bus can have the same number. The master that asks the questions does not need a number at all."
          onSite="Write the address on the device label and in the address register as you set it. A meter behind a locked riser door is a long walk to check later."
        >
          <p>
            Modbus serial line works on a master and slaves principle. One master, usually the BMS
            controller or a gateway, starts every exchange. The slaves, such as energy meters,
            drives and packaged plant controllers, only ever speak when asked, and never talk to
            each other.
          </p>
          <p>The addressing rules are short and strict:</p>
          <ul>
            <li>
              <strong>1 to 247</strong> are the individual slave addresses. Each slave on a bus must
              have one, and it must be unique on that bus.
            </li>
            <li>
              <strong>0</strong> is the broadcast address. A message sent to 0 goes to every slave,
              is always a write, and gets no reply. Never give a device address 0.
            </li>
            <li>
              <strong>248 to 255</strong> are reserved. Do not use them.
            </li>
            <li>
              <strong>The master has no address.</strong> Only the slaves are numbered.
            </li>
          </ul>
          <p>
            The address of each slave is carried in every message. When the master wants meter 12,
            it puts 12 in the address field; meter 12 answers and puts its own address in the reply
            so the master knows who replied. If the master asks for an address that nobody has,
            nothing answers and the master gives up after its response timeout. That is worth
            remembering: a point stuck in a communications fault may simply be asking for an address
            that does not exist on that bus.
          </p>
          <p>
            Uniqueness is per bus. Two separate RS-485 buses on two separate ports can each have a
            meter at address 5 without any clash, because the master talks to each bus on its own.
            That is also why the address register must record which bus, or which port, each device
            sits on.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="BACnet: a device instance that is unique everywhere"
          plainEnglish="Every BACnet controller carries an identity number, the device instance, that no other BACnet device on the whole network may share. It also has a network address, which can change; the instance is how other devices find it."
          onSite="Ask the controls engineer for the device instance and the MS/TP address for anything you are setting up. They come from the network design, not from whatever the box arrived with."
        >
          <p>
            Every BACnet device contains a device object, and that object carries an instance
            number. BACnet requires that number to be set on site and to be unique across the entire
            BACnet network the device is installed on. Not unique on its own cable, not unique in
            its own plantroom: unique on the whole network, which on a campus can mean several
            buildings.
          </p>
          <p>
            Alongside the instance, each device also has a place on the network: a network number
            and a MAC address on that network. On an MS/TP segment, which runs over RS-485 wiring,
            the MAC address is a small number set on the device. On BACnet/IP, the device&rsquo;s IP
            address and UDP port together act as its MAC address. BACnet keeps a one-to-one link
            between each device instance and its network number and MAC pair.
          </p>
          <p>
            In practice most devices remember each other by instance and look the rest up when
            needed: a head end sends &ldquo;who is device X&rdquo; and only device X answers, giving
            its current network number and MAC address. That is very convenient right up until two
            devices share an instance, at which point the head end can be talking to the wrong
            controller without any obvious sign.
          </p>
          <p>
            Inside each device, every input, output and value is an object with its own identifier
            and a name. Every object must carry an identifier, a name and a type, which is why the
            naming convention reaches all the way down into the controller.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Setting addresses on site</ContentEyebrow>

        <ConceptBlock
          title="DIP switches, rotary switches and software tools"
          plainEnglish="Addresses are set either with tiny switches on the device or with a keypad, display or laptop tool. The switches are read from the manufacturer's table, never by guesswork."
          onSite="Photograph the switch bank after you set it, with the device label in shot. It costs nothing and settles arguments at commissioning."
        >
          <p>You will meet three common ways of setting a device address:</p>
          <ul>
            <li>
              <strong>DIP switches:</strong> a row of small on/off switches. On many devices they
              are binary-weighted, so the address is the sum of the values of the switches set to
              ON. With switches worth 1, 2, 4, 8, 16 and so on, address 13 is 8 + 4 + 1.
            </li>
            <li>
              <strong>Rotary switches:</strong> one or more small dials, often one for tens and one
              for units, set with a small screwdriver. Easy to read, easy to knock.
            </li>
            <li>
              <strong>Keypad, display or software:</strong> the address is entered on the
              device&rsquo;s own menu, or from a laptop or phone app, and stored in memory.
            </li>
          </ul>
          <p>
            The dangerous assumption is that every manufacturer does it the same way. Some number
            the switch bank from the other end. Some add an offset. Some use one switch for a
            different setting such as termination or baud rate. Some devices only read their
            switches when they power up, so changing the switches on a live device does nothing
            until it restarts. Always set the address from the table in that device&rsquo;s own
            instructions, and follow its instructions on when the new address is taken up.
          </p>
          <p>
            Wherever the address is set, do three things at the same time: set it, mark it on the
            device label, and enter it in the address register against the device&rsquo;s location
            and the bus or network it sits on. If one of those three is missing, the job is not
            finished.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-3-dip"
          question="You need to set address 22 on a meter whose DIP switches are binary-weighted 1, 2, 4, 8, 16, 32 and 64, read the way its instructions show. Which switches go ON?"
          options={['2, 4 and 16', '2, 4, 8 and 16', '1, 4 and 16', '4, 8 and 16']}
          correctIndex={0}
          explanation="16 + 4 + 2 = 22, so the 2, 4 and 16 switches go ON and the rest stay OFF. Each weight can only be used once. 1 + 4 + 16 is 21, 2 + 4 + 8 + 16 is 30, and 4 + 8 + 16 is 28. Before you set anything, check the instructions for which end of the bank is the 1."
        />

        <SectionRule />
        <ContentEyebrow>When two devices share an address</ContentEyebrow>

        <ConceptBlock
          title="Duplicate addresses do not fail politely"
          plainEnglish="If two devices answer to the same number, their replies can collide. On a Modbus bus that can stop the master talking to everything on the bus, not just the two culprits."
          onSite="When a bus that was fine goes bad straight after new devices are added, suspect duplicate addresses first and the new devices before the old ones."
        >
          <p>
            On a Modbus serial bus, a duplicate address is not a small local fault. Both devices
            think the question is for them, both try to answer, and the replies collide on the pair.
            The protocol guidance treats this as serious enough that manufacturers are asked to
            print a warning about it: the whole bus can behave abnormally, and the master may be
            unable to communicate with any of the slaves on it.
          </p>
          <p>Typical symptoms on the head end:</p>
          <ul>
            <li>Every device on one bus in communications fault at once.</li>
            <li>
              Readings that come and go, or a value that jumps between two plausible figures as
              first one device and then the other gets its reply through.
            </li>
            <li>
              A meter showing another meter&rsquo;s figures, because only one of the pair is
              answering reliably.
            </li>
          </ul>
          <p>
            On BACnet the effect is different but just as confusing. Two devices with the same
            instance both answer the &ldquo;who is&rdquo; request, so the head end may bind to
            either. Points can appear to belong to the wrong controller, and commands can go to the
            wrong plant.
          </p>
          <p>
            The commonest cause is simple: several identical devices arrive with the same factory
            address and nobody changes them. The cure is method. Compare the device labels with the
            address register. If that does not find it, split the bus: with the bus isolated, open
            the trunk part-way along at a terminal, fit a temporary terminator at the new end, and
            see whether the near half comes back. Keep halving. Afterwards, remove the temporary
            terminator and check that termination and polarity are back as drawn.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Leaving every new device on its factory address"
          whatHappens="A batch of meters or fan coil controllers is installed and wired neatly, all still on the address they shipped with. The first time the bus is powered with the master connected, nothing on it communicates. Commissioning stalls while someone works round the building opening every ceiling tile and riser door to find and reset each device."
          doInstead="Get the address schedule from the controls engineer before first fix. Set each device's address as you install it, mark it on the device label, and enter it in the register against the location and bus. Then the first power-up tests the wiring, not the addressing."
        />

        <SectionRule />
        <ContentEyebrow>From terminal to software point</ContentEyebrow>

        <ConceptBlock
          title="The points schedule is the map between copper and software"
          plainEnglish="The points schedule lists every input and output the BMS has. Each line ties one physical thing on site to one terminal on a controller and one point in the software."
          onSite="Keep a copy of the schedule for the panel you are wiring on you while you terminate. Tick each line as you land it."
        >
          <p>
            The points schedule defines the physical scope of the BMS. Each line describes a point
            by its function: what is being monitored or controlled, and over what range. A good
            schedule, or the controller I/O list built from it, gives you for every point:
          </p>
          <ul>
            <li>the point reference and name;</li>
            <li>
              the point type: analogue input, digital input, analogue output or digital output;
            </li>
            <li>
              the signal: a thermistor or other resistance sensor, 0&ndash;10 V, 4&ndash;20 mA,
              volt-free contact, relay output;
            </li>
            <li>the operating range, such as an air temperature range or on/off;</li>
            <li>the controller, the I/O module and the terminal numbers;</li>
            <li>the drawing or schematic the point appears on.</li>
          </ul>
          <p>
            Point mapping is the job of making that line true in both directions. On the physical
            side, the cable from that device lands on exactly those terminals. On the software side,
            the controls engineer configures that input channel as the right type and range and
            links it to the point with that name. If the input is set up for 0&ndash;10 V and the
            device on it is a 4&ndash;20 mA transmitter, or the channel expects one type of
            thermistor and gets another, the point will read, but it will read wrongly.
          </p>
          <p>
            Every mapped point is then proved individually. Point-to-point checking, covered in
            section 7.5, means changing something at the field device, such as warming a sensor or
            operating a contact, and confirming that the right point on the right controller, with
            the right name, responds by the right amount. Nothing about this step scales: each
            physical point is checked on its own.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-3-mapping"
          question="A fan trip input shows 'tripped' on the graphic while the fan is plainly running healthily. The cable and terminal match the schedule. What is the most likely cause?"
          options={[
            'A duplicate network address on the controller that serves the fan',
            'The input is configured with the wrong sense, open where it should be closed',
            'The point name is too long for the graphic, so the wrong state is shown',
            'The overload on the fan starter has failed and needs to be replaced now',
          ]}
          correctIndex={1}
          explanation="The wiring checks out against the schedule, so look at the software side of the map: an input configured with the wrong sense shows the opposite state. A duplicate address would upset the whole device, not one status. Confirm with the contact itself before anyone touches the overload."
        />

        <Scenario
          title="Two temperatures the wrong way round"
          situation="During point-to-point checks on a new air handling unit, you warm the return air sensor with your hand and the supply air temperature on the graphic climbs. The control strategy has been running on this for a week, and the controls engineer has been chasing an unstable heating valve that nobody can tune."
          whatToDo="Stop and trace before changing anything. Check the cable markers at both sensors against the schedule references, then check which terminals each cable lands on against the I/O list. Here the two sensor cables had been landed on each other's terminals. Swap the cores back so the terminals match the schedule, rather than swapping the points in software, then repeat the test on both sensors and record it."
          whyItMatters="The heating loop was controlling on the return air while believing it was the supply, so no amount of tuning would ever have fixed it. Fixing it at the terminals keeps the drawings, the labels and the software in agreement. Fixing it in software would leave a panel whose wiring no longer matches its own documents."
        />

        <SectionRule />
        <ContentEyebrow>Keeping it true</ContentEyebrow>

        <ConceptBlock
          title="The points schedule and the labels have to survive the job, and the next one"
          plainEnglish="Drawings and labels are only useful if they are still right after every change. A points schedule that was true at handover and wrong a year later is worse than none, because people trust it."
          onSite="Any change you make on site, however small, goes on a marked-up drawing the same day and to the controls engineer before you leave."
        >
          <p>
            A BMS changes throughout its life. Spare channels get used, sensors get replaced and
            moved, plant is added, and points are remapped when an input fails. Each change is a
            chance for the site and the documents to drift apart. Good practice keeps them together:
          </p>
          <ul>
            <li>
              <strong>Every cable terminated and identified.</strong> Commissioning checks on a
              controller panel include confirming that every cable is terminated and marked.
            </li>
            <li>
              <strong>Documents kept in the outstation.</strong> A wallet in each controller panel
              holding its wiring diagram, points schedule and control strategy, so the next person
              starts from the truth.
            </li>
            <li>
              <strong>Labels that stay put.</strong> Panel labels fixed mechanically with rivets or
              screws rather than adhesive, which gives up in a warm panel.
            </li>
            <li>
              <strong>Field devices labelled where they can be found.</strong> A label plate fixed
              next to each sensor, carrying a plain description and the reference from the
              schematic. Not on the sensor itself, because the label then leaves with the old sensor
              when it is replaced.
            </li>
            <li>
              <strong>Hidden devices recorded.</strong> Sensors above ceilings or in shafts have
              their positions marked visibly and recorded in the site documents.
            </li>
            <li>
              <strong>Labels checked against the screen.</strong> Commissioning should confirm that
              each field device&rsquo;s label agrees with what is shown at the controller and on the
              head end graphics.
            </li>
          </ul>
          <p>
            The single most useful habit is closing the loop on changes. If a point moves terminal,
            three things change together: the software map, the points schedule and the cable
            marker. Change one without the other two and you have built tomorrow&rsquo;s fault.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The electrician&rsquo;s part</ContentEyebrow>

        <ConceptBlock
          title="Cable and terminal labelling that matches the points schedule"
          plainEnglish="You do not write the software, but you build the half of the map that the software depends on. Your cable markers should read the same as the points schedule."
          onSite="Before you strip a single core, check that the cable reference, the schedule line and the terminal number on the I/O drawing all agree. If they do not, ask before you terminate."
        >
          <p>
            On most BMS jobs the controls engineer owns the addresses, names and software, and the
            electrician owns the cables, the containment and the terminations. That split makes your
            labelling the bridge between the two. Work to these rules:
          </p>
          <ul>
            <li>
              <strong>Use the schedule reference.</strong> Mark each cable at both ends with the
              point reference or cable number from the points schedule, not an improvised
              description.
            </li>
            <li>
              <strong>Number the cores to the terminals.</strong> Core markers or ferrules should
              match the terminal numbers on the controller I/O drawing, so anyone can check a
              termination without tracing it.
            </li>
            <li>
              <strong>Land to the drawing, not to convenience.</strong> If the drawing says input 7,
              it goes on input 7, even if input 6 is closer and also free.
            </li>
            <li>
              <strong>Keep polarity and screens as drawn.</strong> A 4&ndash;20 mA loop or a
              communications pair with its cores reversed may look like a mapping fault. Screens are
              terminated as the manufacturer and the drawing say.
            </li>
            <li>
              <strong>Set and record addresses you are given.</strong> Where you fit and address
              devices, set the address from the schedule, mark it on the device and record it.
            </li>
            <li>
              <strong>Mark up every deviation.</strong> A sensor moved a metre, a cable rerouted, a
              spare terminal used: it all goes on the marked-up drawings, which become the as-fitted
              record at handover.
            </li>
          </ul>
          <p>
            None of this is glamorous, and all of it shows. On a job where the labels match the
            schedule, point-to-point checks run steadily and faults are found at the panel. On a job
            where they do not, every fault starts with somebody tracing a cable by hand.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-3-labelling"
          question="The points schedule reference for a chilled water flow sensor is TW07. What should the cable markers at both ends of its cable carry?"
          options={[
            'A plain description such as "CHW flow sensor", written out in full on each end',
            'The circuit number of the final circuit that supplies the controller panel',
            'TW07, matching the schedule, with cores numbered to the terminals',
            'Nothing at the field end, as long as the controller end is clearly labelled',
          ]}
          correctIndex={2}
          explanation="Using the schedule reference at both ends ties the cable straight to its line in the points schedule, the I/O drawing and the software point. A free-text description drifts from the documents and can be ambiguous. Marking only one end leaves the field end to be traced by hand later."
        />

        <CommonMistake
          title="Fixing a mapping fault in software and leaving the wiring as it is"
          whatHappens="Two cables are found crossed at a controller. It is quicker to swap the two points in the software than to swap the cores, so that is what happens. The graphic now reads correctly, but the terminal numbers no longer match the I/O drawing. A year later a sensor fails, the maintenance engineer follows the drawing, tests the wrong cable and replaces a healthy sensor."
          doInstead="Correct the wiring so the site matches the documents, then re-test both points. If a change really has to be made the other way, update the points schedule, the I/O drawing and the cable markers together, and make sure the controls engineer records it."
        />

        <SectionRule />

        <FAQ
          items={[
            {
              question: 'Is it my job to set device addresses, or the controls engineer’s?',
              answer:
                'It varies by contract. The controls engineer normally decides the addresses as part of the network design. On many jobs the installer sets them on site, because that is the person standing at the device. Either way, get the address schedule in writing, set it exactly, mark it on the device and record it. Never pick addresses yourself.',
            },
            {
              question: 'Can I reuse a Modbus address on a different bus?',
              answer:
                'Yes. Uniqueness applies on each bus. Two separate RS-485 buses on separate ports can each have a device at the same address with no clash. That is exactly why the address register has to record the bus or port for each device, as well as the number.',
            },
            {
              question: 'Do BACnet device instances have to match the IP address?',
              answer:
                'No. The rule is that each device instance is unique across the whole BACnet network. Some sites build instances from a building or floor number to make them easy to read, which is fine as a local convention. Follow the scheme the controls engineer gives you.',
            },
            {
              question: 'The drawings are already wrong when I arrive. What do I do?',
              answer:
                'Do not quietly work around them. Mark up what you actually find, tell the controls engineer or the person who issued the drawings, and get agreement before you terminate. Your marked-up drawings are often the only accurate record the client will end up with.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Every point needs a unique address for its device and a clear, consistent name. The address finds it; the name says what it is.',
            'Agree and document a naming convention at the start and use it on every system on the site. Renaming later is slow and costly.',
            'Modbus slaves use addresses 1 to 247, unique on each bus. Address 0 is broadcast, 248 to 255 are reserved, and the master has none.',
            'A BACnet device instance must be unique across the whole BACnet network, separately from its network number and MAC address.',
            'Set addresses from the device’s own table, mark them on the device and record them with location and bus. Factory defaults left in place cause duplicate address faults.',
            'The points schedule ties each device to one terminal and one software point. Prove every point individually.',
            'Cable markers carry the schedule reference, cores match the terminal numbers, and every change updates the software, the points schedule and the labels together.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-7-section-2"
          prevLabel="Control logic"
          nextHref="/study-centre/upskilling/bms-module-7-section-4"
          nextLabel="Controller set-up and software"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule7Section3;
