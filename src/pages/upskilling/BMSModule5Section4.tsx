/**
 * BMS Module 5 · Section 4 — KNX, LonWorks, M-Bus and DALI as networks
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page treats the four "other" building
 * networks side by side: what each one is for, how it is wired and powered, what topology it
 * allows, where an electrician meets it, and the handful of installation details that decide
 * whether it works on the day. KNX figures come only from the verified GROUNDED FACTS
 * (nominal 30 V DC supply, about 29 V on the bus, devices 21–30 V DC, SELV, 0.8 mm solid
 * twisted pair, 350 m supply-to-device, 1000 m per line segment); LonWorks TP/FT-10 and DALI
 * figures come from grepped source lines; M-Bus stays at concept level. The old page covered
 * KNX only and taught a wrong bus voltage, a wrong supply distance, a device-per-line limit and a cable
 * part number as fact. All of that is gone.
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

const TITLE = 'KNX, LonWorks, M-Bus and DALI as networks | BMS Module 5.4 | Elec-Mate';
const DESCRIPTION =
  'How KNX, LonWorks, M-Bus and DALI networks are wired, powered and laid out, where you meet each in buildings, and the details an electrician must get right.';

const outcomes = [
  'Say what job each of KNX, LonWorks, M-Bus and DALI is built for, and where you are likely to meet it',
  'Describe how a KNX twisted pair line is powered and check it against the verified voltage and length limits',
  'Terminate a LonWorks free topology or bus topology segment correctly and explain why the two differ',
  'Explain what an M-Bus network does and how its meter data usually reaches the BMS',
  'Wire a DALI line within its bus current, cable and distance limits, and avoid a closed loop',
  'Apply Regulation 528.1 when a bus shares a cable or containment route with mains circuits',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'You measure a KNX line at a device in the far corner of the floor and read 20 V DC. What does that tell you?',
    options: [
      'Nothing useful, because some voltage drop along a KNX line is normal and harmless',
      'The bus is healthy, because any KNX reading above 12 V is inside the working range',
      'The device is below its specified range, so look at cable length, joints and supply',
      'The power supply is set wrong and should be turned up to deliver 36 V on the line',
    ],
    correctIndex: 2,
    explanation:
      'KNX bus devices are specified to work between 21 V and 30 V DC, and a healthy line sits at about 29 V near the supply. 20 V is below the bottom of the range, so look for excess cable between supply and device, a poor joint or an overloaded supply. Turning the supply up is not the answer: it is nominally 30 V and that is its ceiling.',
  },
  {
    id: 2,
    question:
      'On a KNX line, what is the longest run of cable allowed between the bus power supply and any device on it?',
    options: [
      '350 m between the supply and any device',
      '500 m between the supply and any device',
      '1000 m between the supply and any device',
      'There is no limit as long as the total stays under 1000 m',
    ],
    correctIndex: 0,
    explanation:
      'The verified limits are 350 m of cable from the supply to any device and 1000 m of cable in total in one line segment. They are two separate checks: a line can be well under 1000 m in total and still fail because the supply sits at one end with a device more than 350 m away.',
  },
  {
    id: 3,
    question:
      'A LonWorks TP/FT-10 segment uses link power, with every device powered from the network. Up to how many devices can that segment carry?',
    options: ['32', '64', '128', '247'],
    correctIndex: 2,
    explanation:
      'A TP/FT-10 segment can carry up to 128 link-powered devices, or up to 64 devices that have their own local power. 32 is the RS-485 Modbus figure for one segment without a repeater, and 247 is the top of the Modbus slave address range.',
  },
  {
    id: 4,
    question:
      'Why is LonWorks free topology wiring quicker to install than an RS-485 style bus such as Modbus RTU?',
    options: [
      'Because it needs no terminator and no attention to cable type',
      'Because you can branch or star the cable where it is convenient',
      'Because it carries mains power and data on the same pair',
      'Because every device can be wired with any length of spur',
    ],
    correctIndex: 1,
    explanation:
      'An RS-485 style bus must be daisy-chained from device to device. Free topology lets you branch and star the pair where the building makes it convenient, within the length limits for the cable used. It still needs one terminator and a qualified cable type, and it does not carry mains.',
  },
  {
    id: 5,
    question:
      'A replacement LonWorks controller has been fitted and wired correctly, but the BMS cannot see it. What is the most likely missing step?',
    options: [
      'The polarity of the two network wires needs reversing at the controller terminals',
      'The terminator needs moving from the supply end to the new controller',
      'The new device has not been commissioned and bound into the network by the tool',
      'The controller needs its own separate bus power supply before it will talk',
    ],
    correctIndex: 2,
    explanation:
      'Each LonWorks device has a unique Neuron ID from the factory, but it only joins the network once a network tool commissions it and binds its network variables to the devices it should talk to. The TP/FT-10 pair is not polarity sensitive, so swapping the wires does nothing, and the terminator does not need to move.',
  },
  {
    id: 6,
    question:
      'A KNX push-button switches a row of lights. How does its command reach the light actuator?',
    options: [
      'A central master polls the button, then commands the actuator',
      'It is sent to a group address the actuator listens to',
      'The bus supply relays it on to every device on the line',
      'The BMS head end receives it and passes it to the actuator',
    ],
    correctIndex: 1,
    explanation:
      'KNX is decentralised. The button sends a message to a group address, and every actuator set up to listen to that group acts on it. No master polls the line. The bus supply only powers the bus, and the BMS head end is not in the path.',
  },
  {
    id: 7,
    question:
      'A DALI line has a 250 mA bus supply built into the application controller. The contractor wants to add a second 250 mA supply to "strengthen" the bus. What do you say?',
    options: [
      'Fine, because two supplies give the line redundancy if one fails',
      'Fine, as long as both supplies are connected with the same polarity',
      'Fine, provided the second supply is at the far end of the line',
      'No, because the total from all bus supplies must not exceed 250 mA',
    ],
    correctIndex: 3,
    explanation:
      'The combined current from every bus power supply on a DALI line must stay at or below 250 mA. Adding a second full-size supply breaks that rule whatever its position or polarity. If the devices need more bus current than the supply can give, the answer is a second DALI line, not a second supply on the same one.',
  },
  {
    id: 8,
    question:
      'You are wiring a DALI line in 1.5 mm² cable as a star from a central controller. Which check matters most for distance?',
    options: [
      'That the total length of every branch added together is under 300 m',
      'That no two devices are more than 300 m apart along the cable',
      'That no single branch is longer than 100 m from the controller',
      'That the cable is screened and the screen earthed at both ends',
    ],
    correctIndex: 1,
    explanation:
      'With 1.5 mm² cable and a full 250 mA supply, the recommended limit is 300 m between the two devices furthest apart on the bus. Total cable can exceed 300 m in a star, as long as that rule is kept. Branch length on its own is not the rule, and screening is not part of the DALI wiring guidance.',
  },
  {
    id: 9,
    question:
      'A KNX bus cable and a 230 V lighting circuit are to run in the same trunking compartment. What does BS 7671 Regulation 528.1 require?',
    options: [
      'Nothing, because the KNX bus is SELV and therefore exempt from segregation',
      'A fixed separation distance, set by BS 7671, along the whole run',
      'Segregate, or use a permitted method for the shared route',
      'That the KNX cable is replaced with mains-rated singles in conduit',
    ],
    correctIndex: 2,
    explanation:
      'The SELV bus is normally a Band I circuit and the lighting Band II, so they may not share a wiring system unless a permitted method is used, for example every cable insulated for the highest voltage present or a separate compartment. SELV is the reason the bus is Band I, not an exemption. BS 7671 itself sets no separation distance for this.',
  },
  {
    id: 10,
    question:
      'A client asks which of these four networks the BMS head end usually talks to directly. What is the honest answer?',
    options: [
      'None directly: each reaches it through a gateway or controller',
      'All four, because the BMS head end speaks every building protocol natively',
      'Only DALI, because lighting is the largest load the BMS has to manage',
      'Only M-Bus, because the meters are wired straight to the head end PC',
    ],
    correctIndex: 0,
    explanation:
      'On most sites the head end speaks BACnet or Modbus, and KNX, LonWorks, M-Bus and DALI each reach it through a gateway, router or controller that translates. That is why the next section is about gateways: the translation point is where data, and faults, most often go missing.',
  },
];

const BMSModule5Section4 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 4"
        title="KNX, LonWorks, M-Bus and DALI as networks"
        backTo="/study-centre/upskilling/bms-module-5"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Four networks you will meet beside BACnet and Modbus: what each one is for, how it is
          wired and powered, and what the electrician has to get right for it to work.
        </p>

        <TLDR
          points={[
            'KNX is a room and building control bus, mostly lighting, blinds and heating. Power and data share one SELV twisted pair, fed by a bus supply of nominally 30 V DC.',
            'LonWorks is a peer-to-peer control network found on many existing BMS installations. Its TP/FT-10 channel can be wired in free topology with one terminator, or as a bus with two.',
            'M-Bus exists to read meters. A master reads each meter in turn, and the values reach the BMS through a gateway or controller.',
            'DALI is a lighting network: up to 64 control gear and 64 control devices on a two-wire line, with no more than 250 mA of bus supply and no closed loops.',
            'Each has limits on cable, distance, power and topology. Getting those right is the electrician’s job, and the commissioning engineer cannot fix them in software.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Four networks, four jobs</ContentEyebrow>

        <ConceptBlock
          title="Why a building has more than one network"
          plainEnglish="Each of these networks was built for one kind of job. A building often has several of them, joined to the BMS at a few translation points."
          onSite="On a new job, ask early which networks are on the drawings and who commissions each one. The answer tells you which cable, which supplies and which terminators you are responsible for."
        >
          <p>
            Sections 5.2 and 5.3 covered BACnet and Modbus, the two protocols a BMS head end most
            often speaks. Below and beside them sit networks that were designed for narrower jobs
            and are very good at them. You will rarely find a building that uses only one.
          </p>
          <ul>
            <li>
              <strong>KNX</strong> controls rooms and floors: lighting, blinds, heating valves,
              presence detection, wall panels. Devices talk to each other directly, so a switch can
              operate a light without a central controller in the middle.
            </li>
            <li>
              <strong>LonWorks</strong> is a general control network, used for plant controllers,
              terminal units and lighting, and common on BMS installations of an earlier generation.
              Like KNX, its devices exchange data peer to peer.
            </li>
            <li>
              <strong>M-Bus</strong> is a meter reading bus. It does no control at all. Its job is
              to gather readings from heat, water, gas and electricity meters.
            </li>
            <li>
              <strong>DALI</strong> is a lighting network. It addresses each driver individually,
              groups them, recalls scenes, and reports lamp and emergency status back.
            </li>
          </ul>
          <p>
            None of the four is better than the others in general. Each fits a particular duty, and
            the commonest arrangement is a BACnet or Modbus backbone for the BMS, with KNX, DALI,
            LonWorks or M-Bus networks connected to it through gateways and controllers. Section 5.5
            covers that translation. This page is about the networks themselves, and the physical
            details that make or break them.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-4-which-network"
          question="A client wants every tenant's heat and water use collected automatically for recharging. Which of the four networks is built for that job?"
          options={[
            'KNX, because it already runs the room controls on each floor',
            'DALI, because its controllers report energy data to the BMS',
            'M-Bus, because it was designed for reading meters remotely',
            'LonWorks, because its devices share data peer to peer',
          ]}
          correctIndex={2}
          explanation="Reading meters is what M-Bus is for, and heat and water meters with M-Bus ports are common. KNX and LonWorks are control networks, and DALI reports lighting data only. Any of them could be made to carry some meter data through gateways, but none of them is the natural fit."
        />

        <Pullquote>
          A protocol is only as good as the cable it runs on. Most network faults on these systems
          are wiring, power or topology faults that no amount of software will fix.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>KNX</ContentEyebrow>

        <ConceptBlock
          title="KNX twisted pair: power and data on one pair"
          plainEnglish="A KNX line is one twisted pair that carries both the power for the devices and the messages between them. A dedicated supply puts about 29 V on it, and every device takes its power and its data from that pair."
          onSite="Measure at the supply first, then at the furthest device. A healthy line reads close to 29 V near the supply. A device below 21 V is outside its working range."
        >
          <p>
            Most KNX you will install is the twisted pair version, KNX TP. The bus is a pair of 0.8
            mm solid-core conductors, twisted together, and it is fed by a dedicated KNX bus power
            supply. The supply is nominally 30 V DC and you will normally measure about 29 V on the
            bus. Bus devices are specified to work anywhere between 21 V and 30 V DC.
          </p>
          <p>
            The bus is SELV. In BS 7671 terms that normally makes it a Band I circuit, which decides
            how it may share a cable route with mains wiring (see the last part of this page).
          </p>
          <p>
            Because devices take their power from the bus, the supply has to be big enough for the
            devices on its line, and the cable has to be short enough that the voltage at the far
            device is still inside the working range. That is what the length limits below protect.
          </p>
          <p>
            KNX devices are decentralised. A push-button sends a message to a group address, and
            every actuator set up to listen to that group acts on it. There is no master polling the
            line. The setting up, giving each device its own address and linking it to its groups,
            is done with the KNX commissioning software by whoever holds the project file.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-4-knx-voltage"
          question="An old drawing note gives the KNX bus a lower voltage than you find. You measure 29 V at the supply. What should you conclude?"
          options={[
            'The supply is faulty and over-voltage, so isolate it before the devices are damaged',
            'The reading is normal for a KNX line and the drawing note is wrong',
            'A second supply has been connected in parallel and needs finding',
            'The meter is reading high and should be checked against a known source',
          ]}
          correctIndex={1}
          explanation="A KNX bus supply is nominally 30 V DC and about 29 V on the bus is normal. Old drawings and training sometimes quote a lower figure, and they are wrong. Do not turn the supply down, and do not condemn it for a correct reading."
        />

        <ConceptBlock
          title="KNX lines and the two length limits"
          plainEnglish="Two numbers decide every KNX line: no device more than 350 m of cable from the supply, and no more than 1000 m of cable in the whole line segment."
          onSite="Before you pull cable, find the supply position on the drawing and walk the route to the furthest device. If the drawing does not show the supply position, ask, because it decides the 350 m check."
        >
          <p>
            A KNX installation is built from lines. Each line has its own bus power supply, and
            lines are joined into larger systems by couplers, under a topology that the KNX designer
            sets out. Your job is to build each line to the drawing and keep it within the limits.
          </p>
          <ul>
            <li>
              <strong>350 m</strong> is the most cable allowed between the bus power supply and any
              device on the line. Measure along the cable, not on the plan.
            </li>
            <li>
              <strong>1000 m</strong> is the most cable allowed in total in one line segment, every
              branch included.
            </li>
          </ul>
          <p>
            They are two separate checks, and a line can pass one and fail the other. A short line
            with the supply at one end can still put a far device beyond 350 m of cable. A line with
            the supply in the middle can keep every device close and still go over 1000 m in total
            once every branch is added up.
          </p>
          <p>
            Do not add your own figures. The number of devices a line can carry, and the reasons
            behind the topology rules, are for the KNX designer and the product data. If a change on
            site means adding devices or cable to a line, raise it rather than extend it quietly.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Fitting the KNX supply wherever the panel has space"
          whatHappens="The bus supply goes in the riser cupboard at one end of the floor because there was a spare DIN rail. The line passes the 1000 m total, but the devices at the far end are more than 350 m of cable from the supply. They work on a warm afternoon with few devices active, then drop off or behave oddly when the line is loaded."
          doInstead="Treat the supply position as part of the design. Measure cable length from the supply to the furthest device before first fix, keep it within 350 m, and keep the whole segment within 1000 m. If the panel position cannot meet that, go back to the designer before the cable is pulled."
        />

        <SectionRule />
        <ContentEyebrow>LonWorks</ContentEyebrow>

        <ConceptBlock
          title="LonWorks: channels, the Neuron ID and TP/FT-10 wiring"
          plainEnglish="A LonWorks network is made of channels joined by routers. Each device has a unique ID from the factory, and a network tool links the devices so they share the data they need."
          onSite="When you replace a LonWorks device, wiring it in is only half the job. The new device must be commissioned with the network tool before the rest of the system can see it, so plan that with the controls engineer."
        >
          <p>
            LonWorks is built on an open control network protocol that has been published as an
            international standard. The physical medium is called a <strong>channel</strong>: a
            twisted pair cable, a power line or an IP network. Channels are joined by{' '}
            <strong>routers</strong>, which pass messages between them and can stop traffic crossing
            that does not need to. That lets one network span a whole site and several kinds of
            media.
          </p>
          <p>
            Every LonWorks device carries a 48-bit <strong>Neuron ID</strong>, set at manufacture
            and unique to that device. The network tool uses it to find the device during
            installation, often when someone presses the device&rsquo;s service pin, and then gives
            the device its logical address on the network.
          </p>
          <p>
            Devices share data through <strong>network variables</strong>. A switch has an output
            variable and a lighting controller has an input variable of the matching type; the tool
            links the two in a step called <strong>binding</strong>. After that the switch talks to
            the light directly. Replace the switch with an occupancy sensor of the same output type
            and the lighting controller does not need to change.
          </p>
          <p>
            The channel you will meet most in buildings is <strong>TP/FT-10</strong>, a twisted pair
            channel running at 78.125 kbps. Its wiring rules are what follow.
          </p>
          <p>
            <strong>TP/FT-10 wiring: free topology or bus.</strong> Before anything else, find out
            from the drawing which of the two the segment is meant to be. The termination differs,
            and a mismatch is a common reason for a segment that drops devices.
          </p>
          <p>
            An RS-485 network such as Modbus RTU has to be daisy-chained, device to device. TP/FT-10
            does not. In <strong>free topology</strong> the pair can branch, star or mix the two
            where the building makes that convenient. The transceivers are polarity insensitive, so
            the two cores can go to either terminal.
          </p>
          <p>Free topology and bus topology are terminated differently:</p>
          <ul>
            <li>
              <strong>Free topology:</strong> one terminator only, and it can be fitted anywhere on
              the segment.
            </li>
            <li>
              <strong>Doubly terminated bus:</strong> one terminator at each end of the bus, with
              stubs to each device of no more than 3 m.
            </li>
          </ul>
          <p>
            The two are not the same part. A free topology terminator and a bus terminator have
            different values, so fit the type the segment is designed for.
          </p>
          <p>
            The two layouts also have different length limits, which depend on the cable type. As an
            example, for JY(St)Y 2×2×0.8 cable without link power, a free topology segment allows
            250 m from any device to any other device and 450 m of cable in total; the same cable
            wired as a doubly terminated bus allows a 900 m bus. Other cable types have their own
            figures, so check the product data for the cable you are actually using.
          </p>
          <p>
            A segment can carry up to 64 devices that have their own local power, or up to 128 if
            they are link powered. With <strong>link power</strong>, a central 48 V DC supply feeds
            the pair through an interface module and each device takes its power from the network.
            Where screened cable is used, the screen is earthed at the termination through a
            capacitor with a bleed resistor, rather than solidly.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-4-lon-termination"
          question="A LonWorks TP/FT-10 segment wired as a free topology has a terminator at each of its two furthest points. Devices drop on and off. What is the first fix?"
          options={[
            'Swap the two network cores at every device to correct the polarity',
            'Add a third terminator at the busiest branch to share the load',
            'Remove one terminator so the segment has a single termination',
            'Replace the cable with screened cable earthed at both ends',
          ]}
          correctIndex={2}
          explanation="Free topology takes one terminator only. Two terminators belong on a doubly terminated bus. TP/FT-10 is polarity insensitive, so swapping cores changes nothing, and adding terminators makes the problem worse."
        />

        <Scenario
          title="Replacing a failed LonWorks controller on an existing BMS"
          situation="A fan coil controller on the third floor of an office has failed, and the site's BMS uses LonWorks on a TP/FT-10 segment that runs through the ceiling void. The client has sourced a like-for-like replacement and asks you to swap it over before the tenants arrive on Monday. The old controller still has its network pair, its local supply and its field wiring in place."
          whatToDo="Isolate and lock off the controller supply, photograph and label every terminal, then swap the controller like for like. Do not move or remove anything else on the segment, including any terminator you find nearby, because a free topology segment has only one and it may be in this ceiling. Note the Neuron ID printed on the new controller. Then tell the controls engineer or integrator that the device is in place: it has to be commissioned and its network variables bound with the network tool before the BMS will see it or the fan coil will respond to the room sensor."
          whyItMatters="A LonWorks device does not join the network just because it is wired in. If the commissioning step is not booked, the fan coil sits idle or in a default state on Monday morning and the fault gets blamed on the new controller. Recording the Neuron ID and flagging the hand-off turns a two-visit job into a planned one."
        />

        <SectionRule />
        <ContentEyebrow>M-Bus</ContentEyebrow>

        <ConceptBlock
          title="M-Bus: a bus for reading meters"
          plainEnglish="M-Bus collects readings from meters. A master device asks each meter for its reading in turn, and passes the values on to the BMS or the energy system."
          onSite="When you fit an M-Bus meter, record its address and serial number on the meter schedule as you go. A meter nobody can identify on the bus is a meter nobody reads."
        >
          <p>
            M-Bus, short for meter bus, was designed to read utility meters remotely: heat meters,
            water meters, gas meters and electricity meters. It carries no control at all. A master
            device, often a dedicated M-Bus master or a controller with an M-Bus port, reads each
            meter in turn by its address and holds the values for whatever system needs them.
          </p>
          <p>
            You will meet it most on sites with heat networks, landlord and tenant sub-metering, and
            larger energy monitoring schemes. Section 4.5 covers why buildings meter and the choice
            between pulse, M-Bus and Modbus meters. Here, the point is how it fits the network
            picture: the BMS rarely talks to M-Bus meters directly. It reads them through a gateway
            or a controller that translates the meter data into points the BMS understands.
          </p>
          <p>
            What the electrician must get right is the same as for any bus: the cable type and route
            the meter and master data require, a clear and permanent address for every meter, and a
            schedule that ties each address to a real meter in a real location. When an energy
            report looks wrong, that schedule is the first thing anyone checks.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-4-mbus-schedule"
          question="An energy report shows the first floor using heat at night while the second floor shows none. Both floors have M-Bus heat meters. What do you check first?"
          options={[
            'That the meter schedule ties each M-Bus address to the right meter location',
            'That the M-Bus meters have been bound to the room controllers with a network tool',
            'That the DALI bus supply on each floor is within its 250 mA limit',
            'That the M-Bus cable has a terminator fitted at each end of the run',
          ]}
          correctIndex={0}
          explanation="A swapped address or schedule entry makes one floor's consumption appear on the other's line, which fits this symptom exactly. M-Bus meters are read by a master, not bound like LonWorks devices, and DALI has nothing to do with heat metering."
        />

        <SectionRule />
        <ContentEyebrow>DALI</ContentEyebrow>

        <ConceptBlock
          title="DALI as a network: addresses, bus supply and wiring"
          plainEnglish="A DALI line is a two-wire bus that lets a controller talk to every driver and sensor on it individually, in groups or all at once. It needs its own bus power supply, limited to 250 mA in total."
          onSite="Check how many bus supplies are on the line before you energise it. Many application controllers and some drivers have one built in, and it is easy to end up with two."
        >
          <p>
            Section 4.1 covered DALI as lighting control. As a network, the picture is this. One
            DALI line can address up to <strong>64 control gear</strong> (drivers, ballasts) and up
            to <strong>64 control devices</strong> (application controllers and input devices such
            as sensors and push-buttons). Control gear can be placed in any of
            <strong> 16 groups</strong>, and each piece of control gear can store up to 16 scenes.
          </p>
          <p>
            The <strong>application controller</strong> is the brain of the line: it reads the
            sensors and buttons and sends commands to the gear. Input devices report events but do
            not switch lights themselves. Since DALI-2, controllers and input devices from different
            makers are tested to work together, which matters when you are asked to add a sensor to
            an existing line.
          </p>
          <p>
            The bus must be powered before anything can communicate. The bus voltage is typically
            around 16 V, and the combined current of every bus power supply on the line must not
            exceed <strong>250 mA</strong>. Bus supplies can be separate units or built into a
            controller or a driver, so count them all. If the devices on a line need more bus
            current than one supply can give, start a second line.
          </p>
          <p>
            The BMS normally reaches DALI through an application controller or gateway that speaks
            BACnet, Modbus or KNX upwards. That is how lamp failures, emergency test results and
            energy data reach the head end.
          </p>
          <p>
            One safety point sets DALI apart from KNX. <strong>The DALI line is not SELV.</strong>{' '}
            The pair may run beside the mains or within a multicore mains cable, and it is treated
            as part of the mains wiring for insulation and isolation. Switching off the lighting
            circuit does not necessarily make the DALI bus dead, because the bus supply can be fed
            from somewhere else, such as a controller in the riser. Prove it dead before you work on
            it.
          </p>
          <p>
            <strong>DALI wiring.</strong> The bus is a pair of wires that carries both the data and
            a little power for bus-powered devices such as sensors and push-buttons. The wiring
            rules are short:
          </p>
          <ul>
            <li>
              <strong>Cable:</strong> 1.5 mm² is the recommended size, with the two bus cores kept
              next to each other. The cores are not SELV, so they need insulation rated for the
              mains voltage, never bell wire or data cable.
            </li>
            <li>
              <strong>Distance:</strong> with 1.5 mm² cable and a full 250 mA supply, no more than
              300 m of cable between the two devices furthest apart on the line.
            </li>
            <li>
              <strong>Topology:</strong> daisy chain, star, or a mix of the two. Do not close the
              cable into a loop.
            </li>
            <li>
              <strong>Polarity:</strong> the cores can go to either terminal, apart from a device
              containing a bus supply, where DA+ and DA− must be observed.
            </li>
          </ul>
          <p>
            The 300 m limit is about the furthest pair of devices, not the total. A star with the
            controller and supply in the middle and each branch 100 m long puts no two devices more
            than 200 m apart, even though the total cable is well over 300 m. Push that idea to an
            extreme, though, and other cable effects take over, so very large stars still need a
            designer&rsquo;s eye.
          </p>
          <p>
            Lighting designers are advised to leave spare capacity on each line rather than fill all
            64 gear addresses at handover. If you are asked to add fittings to a line, check what is
            already on it first.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-4-dali-loop"
          question="To 'make it more reliable', a DALI line in an open plan office has been run as a ring, returning to the controller. What should happen?"
          options={[
            'Leave it, because a ring gives the bus two paths if one is cut',
            'Leave it, as long as the total cable length is under 600 m',
            'Add a second 250 mA supply at the far side of the ring',
            'Break the ring so the line is a chain, star or mix of the two',
          ]}
          correctIndex={3}
          explanation="A closed loop should not be used on a DALI line. Break it into a chain, a star or a combination, and check the furthest-apart devices are within 300 m along the cable. A second supply would also break the 250 mA limit."
        />

        <Pullquote>
          On a DALI line, count the bus supplies before you count anything else. One too many is the
          fault that looks like everything else.
        </Pullquote>

        <CommonMistake
          title="Counting only the bus supply you can see"
          whatHappens="A DALI line is wired with a standalone bus supply in the lighting control panel. The application controller chosen later also has a bus supply built in, and so does one of the emergency drivers. Nobody counts them, the combined supply current goes well past 250 mA, and the line behaves erratically during commissioning."
          doInstead="Before the line is energised, list every device on it and check the product data for a built-in bus supply. Add up the supply currents and keep the total at or below 250 mA, disabling or leaving out supplies as the data allows. Observe DA+ and DA− on any device that carries a supply, and record which device is supplying the line."
        />

        <SectionRule />
        <ContentEyebrow>Sharing a route with mains</ContentEyebrow>

        <ConceptBlock
          title="Bus cables, mains cables and Regulation 528.1"
          plainEnglish="A SELV signalling bus and a mains circuit can share a cable route only if they are kept apart, or one of the methods BS 7671 allows is used. DALI is not SELV and is treated as mains wiring. Check the cable insulation before you put anything together."
          onSite="Look at the insulation rating printed on the bus cable and on the device data. If it is not rated for the highest voltage in the trunking, it needs its own compartment or route."
        >
          <p>
            All four networks are control and signalling circuits, and most of them end up near
            mains wiring: KNX actuators sit beside the lighting circuits they switch, DALI drivers
            are inside luminaires on a 230 V supply, and meters sit on the circuits they measure. In
            BS 7671 terms a SELV bus such as KNX is normally a Band I circuit and the mains a Band
            II circuit. DALI is different: the DALI line is not SELV, so it is treated as part of
            the mains wiring and its cores need insulation rated for the mains voltage. That is why
            it can run within a multicore mains cable with the luminaire supply, because every core
            is insulated for the highest voltage present. For any other bus that is not SELV, ask
            the designer how it is classed.
          </p>
          <p>
            Regulation 528.1 does not ban them from sharing a route. It says a Band I circuit must
            not be contained in the same wiring system as a Band II circuit unless one of the
            permitted methods is used. The two you will use most are a separate compartment or
            conduit system for the bus, or cables insulated for the highest voltage present.
          </p>
          <p>
            Regulation 444.4.10 also applies BS EN 50174-1 and BS EN 50174-2 (with BS EN 50310 for
            bonding networks) to control, signalling and communication circuits in a building.
            Separation distances between power and data cabling are set out in BS EN 50174-2, not in
            BS 7671, so take them from the project specification rather than from memory.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 528.1"
          meaning="A Band I circuit (such as a SELV KNX bus) must not share a wiring system with a Band II circuit, and neither may share with a circuit above low voltage, unless a permitted method is used: for example every cable insulated for the highest voltage present, a separate conduit, trunking or ducting system, or for a multicore cable an earthed metal screen between the Band I and Band II cores."
          cite="Segregate, or use one of the permitted methods"
        />

        <Scenario
          title="A hotel refurbishment with three networks in one ceiling"
          situation="You are second-fixing the bedroom corridor of a hotel refurbishment. The ceiling void carries a KNX line for room controls and blinds, a DALI line for corridor lighting fed from a controller in the floor riser, and M-Bus cable to the heat meters in each riser cupboard. The mains lighting circuits share the same cable basket. The DALI controller has a built-in bus supply, and the luminaire supplier has also sent a standalone DALI bus supply 'in case it is needed'."
          whatToDo="Take each network in turn. For KNX, confirm the bus supply position and measure cable length to the furthest room panel against 350 m, and the line total against 1000 m. For DALI, leave the spare supply in its box, because the controller already supplies the line and the total must stay at or below 250 mA; check that the corridor run is a chain or star with no loop and that the furthest devices are within 300 m along the cable. For M-Bus, label every meter with its address and record it on the meter schedule. Then check the cable basket: where the KNX and M-Bus cables lie with mains cables, confirm they are insulated for the highest voltage present, or give them a separate compartment. The DALI pair is not SELV, so it needs mains-rated cable whatever route it takes."
          whyItMatters="Each of these networks will be commissioned by a different specialist, and none of them can fix a wiring or power fault in software. A second DALI supply, a KNX device beyond 350 m or an unlabelled meter all look like commissioning problems on the day, and all of them are the electrician's to prevent."
        />

        <SectionRule />
        <ContentEyebrow>Side by side</ContentEyebrow>

        <ConceptBlock
          title="What the electrician must get right on each"
          plainEnglish="Every network has a short list of things that decide whether it works. Learn the list for each, and check them before you hand over."
          onSite="Write the key figures for each network on the job sheet before first fix. It is much easier to place a supply or a terminator correctly than to move it after the ceiling is closed."
        >
          <ul>
            <li>
              <strong>KNX TP:</strong> 0.8 mm solid-core twisted pair; a dedicated bus supply of
              nominally 30 V DC (about 29 V on the bus, devices 21–30 V); SELV; no more than 350 m
              of cable from supply to any device and 1000 m in a line segment.
            </li>
            <li>
              <strong>LonWorks TP/FT-10:</strong> polarity insensitive; free topology with one
              terminator anywhere, or a doubly terminated bus with a terminator at each end and
              stubs of no more than 3 m; length limits depend on cable type and layout; up to 64
              locally powered or 128 link-powered devices per segment; every new device commissioned
              and bound with the network tool.
            </li>
            <li>
              <strong>M-Bus:</strong> a meter reading bus with a master reading each meter by
              address; follow the meter and master data for cable and wiring; record every address
              against a real meter.
            </li>
            <li>
              <strong>DALI:</strong> not SELV, so mains-rated cable and insulation, and treated as
              part of the mains wiring for isolation; 1.5 mm² recommended; 300 m between the
              furthest-apart devices with a full 250 mA supply; total bus supply current never above
              250 mA; chain or star, never a loop; 64 control gear and 64 control devices per line;
              observe DA+ and DA− only on a device with a bus supply.
            </li>
          </ul>
          <p>
            Where you meet them is just as useful to know. KNX turns up most in offices, hotels,
            schools and higher-end homes, usually for lighting, blinds and room heating. LonWorks is
            most often found on existing sites, in plant controllers, terminal units and lighting
            from an earlier generation of BMS, so expect to maintain and extend it more than install
            it from new. M-Bus sits wherever heat, water or energy is metered for billing or
            monitoring, especially on heat networks. DALI is in almost any modern commercial
            lighting scheme, and is also how many emergency lighting systems report their test
            results.
          </p>
          <p>
            The common thread is that every one of these limits is physical. A wrong terminator, an
            extra supply or an over-long run will defeat the best commissioning engineer, and the
            symptoms, devices dropping in and out, usually point at the software first. Getting the
            physical layer right is the most useful thing the electrician brings to a networked
            building.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can I use ordinary twin and earth or alarm cable for a KNX line?',
              answer:
                'Use cable that meets the KNX specification for the bus: 0.8 mm solid-core twisted pair, as named on the drawing. Twin and earth is not a twisted pair, and the length limits assume the specified cable. If the drawing names a cable, use that one.',
            },
            {
              question: 'Is DALI cable the same as mains cable?',
              answer:
                'Not the same circuit, but it needs the same insulation. DALI is not SELV, so the two DALI cores must be insulated for mains voltage, and they are often run as two cores of a multicore mains cable with the luminaire supply. Use cable rated for the highest voltage present, follow the device data, and never use bell wire or data cable for a DALI line. Treat the cores as live until proved dead, even with the lighting circuit off.',
            },
            {
              question: 'Do I need to programme KNX, LonWorks or DALI devices myself?',
              answer:
                'Usually not. Each has its own commissioning tool and the programming normally sits with a specialist integrator. Your part is to build the network to the drawing, within its limits, and to record what you installed and where. Ask before pressing programming or service buttons on a live system.',
            },
            {
              question: 'How do I tell which network a cable in the ceiling belongs to?',
              answer:
                'Often you cannot from the cable alone, which is why labelling matters. Label every bus cable at both ends and at junctions with the network and line or segment it belongs to, and mark terminators and bus supplies on the as-fitted drawings. The next person to fault-find will rely on it.',
            },
            {
              question: 'Why does the BMS not just talk to all of these directly?',
              answer:
                'Each network was designed for its own job and speaks its own language. The BMS head end usually speaks BACnet or Modbus, so a gateway, router or controller translates in between. That translation point is the subject of the next section.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'KNX, LonWorks, M-Bus and DALI each do one kind of job well, and most buildings use more than one alongside a BACnet or Modbus BMS.',
            'KNX TP is a SELV twisted pair fed by a nominally 30 V DC bus supply, with about 29 V on the bus and devices working from 21 to 30 V. Keep every device within 350 m of cable from the supply and each line segment within 1000 m.',
            'LonWorks TP/FT-10 is polarity insensitive. Free topology takes one terminator anywhere; a doubly terminated bus takes one at each end. Length limits depend on cable and layout.',
            'M-Bus is for reading meters. Record every meter address against a real meter, because that schedule is what makes the data usable.',
            'DALI allows 64 control gear and 64 control devices per line, a total bus supply of 250 mA at most, and 300 m between the furthest-apart devices on 1.5 mm² cable. No closed loops. DALI is not SELV: mains-rated insulation, and prove it dead separately from the lighting circuit.',
            'Where a bus shares a route with mains, Regulation 528.1 applies: segregate, or use a permitted method such as insulating for the highest voltage present.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-5-section-3"
          prevLabel="Modbus RTU and Modbus TCP"
          nextHref="/study-centre/upskilling/bms-module-5-section-5"
          nextLabel="Gateways and integration"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule5Section4;
