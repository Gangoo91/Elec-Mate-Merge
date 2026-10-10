/**
 * BMS Module 5 · Section 1 — How BMS devices talk
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page gives the big picture before the
 * protocol pages: why devices in a building management system have to exchange data at all,
 * the two things any link needs agreement on (the wiring and the language), serial field buses
 * against IP networks, how the two are layered in a typical building, routers against gateways,
 * and open against proprietary protocols, tied to the Approved Document L interoperability
 * expectation and BS 7671 Regulation 444.4.10. Protocol detail is left to 5.2 to 5.4.
 * The old page carried a "Quick reference" of RS-485 and Ethernet length figures and protocol
 * "selection" rules with no source, a list of "OSI model relevance" bullets that taught nothing,
 * and a quiz with options pasted from unrelated courses; all of that is gone.
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

const TITLE = 'How BMS devices talk | BMS Module 5.1 | Elec-Mate';
const DESCRIPTION =
  'Field buses and IP networks, serial and Ethernet, open and proprietary protocols: why a BMS only works when devices agree on both the wiring and the language.';

const outcomes = [
  'Explain why controllers, meters and plant in a BMS need to exchange data, and what breaks when they cannot',
  'Separate the two agreements every link needs: the physical connection and the protocol carried over it',
  'Tell a serial field bus apart from an IP network on site, and say what each is normally used for',
  'Describe how field buses and an IP backbone are layered in a typical building, and the difference between a router and a gateway',
  'Explain the difference between open and proprietary protocols, and why it matters to the building owner years after handover',
  'Recognise the parts of network installation that are the electrician’s responsibility, and where to hand over to the controls engineer',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new controller is added to a working RS-485 bus. Its protocol and address are right and the trunk is terminated at both ends, yet only the new controller stays silent. What physical fault is most likely?',
    options: [
      'The bus needs a third terminator at the new device',
      'The cable screen is earthed at one end only',
      'Its two data lines are crossed at its terminals',
      'The bus speed is too slow for one more device',
    ],
    correctIndex: 2,
    explanation:
      'The two RS-485 data lines are labelled and not interchangeable. Crossing them at one device silences that device while the others keep working. A third terminator would load the whole line, not just one device. Earthing the screen at one end is a normal practice where the maker calls for it. Adding one device does not make the bus speed wrong.',
  },
  {
    id: 2,
    question: 'Which description best fits a typical serial field bus in a BMS?',
    options: [
      'One twisted pair chained device to device: cheap, slow, good over distance',
      'A star of patch leads back to a switch, with one switch port for every device',
      'A wireless mesh between controllers that needs no data cabling of any kind',
      'A fibre link that is used only between separate buildings on a large campus',
    ],
    correctIndex: 0,
    explanation:
      'Field buses are usually a single twisted pair chained from device to device. The star of patch leads to a switch describes an Ethernet IP network, which is a different layer of the system. Fibre and wireless have their places, but they are not what a field bus normally looks like.',
  },
  {
    id: 3,
    question: 'On a Modbus RS-485 trunk, where does the line termination belong?',
    options: [
      'At every single device connected to the trunk',
      'Only at the master, wherever it sits on the cable',
      'At the midpoint of the cable, to balance the line',
      'Near each of the two physical ends of the trunk',
    ],
    correctIndex: 3,
    explanation:
      'The trunk is terminated at its two ends, to stop signals reflecting back along the line. Terminating at every device loads the bus down, and terminating at the master only works if the master happens to sit at an end.',
  },
  {
    id: 4,
    question:
      'A building has BACnet/IP controllers on its Ethernet network and BACnet MS/TP controllers on twisted pair. What joins the two so they can share data?',
    options: [
      'A gateway that translates BACnet into Modbus and back again',
      'A BACnet router, passing the messages across unchanged',
      'An Ethernet switch with a spare port on the plant room side',
      'A repeater fitted at the far end of the MS/TP trunk cable',
    ],
    correctIndex: 1,
    explanation:
      'Both sides already speak BACnet; only the wiring differs. A router passes the same messages between the two network types without altering them. A gateway is needed when the languages differ, which is not the case here. A switch and a repeater each work within one type of network.',
  },
  {
    id: 5,
    question: 'What makes a protocol “open” in the sense used on BMS projects?',
    options: [
      'Its rules are published, so any maker can build products to use it',
      'It has no passwords or security of any kind built into the protocol',
      'It only works over the internet rather than over local site wiring',
      'One manufacturer supplies it and gives the set-up software away free',
    ],
    correctIndex: 0,
    explanation:
      'Open means the rules are published and anyone can implement them, so equipment from different makers can share data. It says nothing about security, and it does not mean internet only. A single maker’s protocol remains proprietary even if the software is free.',
  },
  {
    id: 6,
    question:
      'Why can a proprietary protocol become a problem for a building owner several years after handover?',
    options: [
      'Proprietary systems stop working as soon as the warranty runs out',
      'Proprietary protocols can never be wired on a twisted-pair cable',
      'Repairs and additions are tied to one maker and its installers',
      'BS 7671 does not permit proprietary protocols in new installations',
    ],
    correctIndex: 2,
    explanation:
      'The risk is lock-in: every addition and repair has to go back to one supply chain, and it is costly to undo later. Nothing stops working on a date, many proprietary buses do use twisted pair, and BS 7671 does not rule on protocols at all.',
  },
  {
    id: 7,
    question:
      'Paragraph 6.72 of Approved Document L, Volume 2 (England, 2021 edition) lists what a qualifying building automation and control system should do. Which of these is one of its expectations?',
    options: [
      'It should use one named protocol throughout the whole building',
      'It should be supplied and maintained by a single manufacturer',
      'It should run on a separate fibre network from the IT system',
      'It should interoperate with services from different makers',
    ],
    correctIndex: 3,
    explanation:
      'Paragraph 6.72(d) expects the system to communicate with the fixed building services it connects to and to work across different makers, devices and technologies (the same expectation becomes paragraph 5.84(d) in the 2026 edition, from 24 March 2027). It does not name a protocol, demand a single supplier or set a cabling medium.',
  },
  {
    id: 8,
    question:
      'You are asked to run the cable for a new BMS field bus. What should set the cable type and the way it is wired?',
    options: [
      'Whatever spare multicore cable is left over on the van',
      'The controls specification and the maker’s instructions',
      'The cheapest cable that will physically fit the terminals',
      'The same cable as the lighting circuits on the same job',
    ],
    correctIndex: 1,
    explanation:
      'Data buses care about the pair, the screen and the topology, and the manufacturer and specification say what is needed. A spare multicore or lighting cable may carry voltage perfectly and still corrupt data on a long run near drives.',
  },
  {
    id: 9,
    question:
      'Which BS 7671 regulation points you to BS EN 50174-1 and -2 for control, signalling and communication cabling inside a building?',
    options: [
      'Regulation 444.4.10',
      'Regulation 411.3.4',
      'Regulation 557.3.1',
      'Regulation 528.1',
    ],
    correctIndex: 0,
    explanation:
      'Regulation 444.4.10 requires BS EN 50174-1 and BS EN 50174-2 (with BS EN 50310 for bonding networks) to be applied to these circuits, and the separation guidance lives in those standards. Regulation 528.1 deals with voltage bands sharing a wiring system, and 557.3.1 with the supply to auxiliary circuits; both matter on BMS jobs, but neither is the pointer asked for.',
  },
  {
    id: 10,
    question:
      'On which kind of network can a sensor pass its value straight to the device that uses it, with no central device asking first?',
    options: [
      'Modbus serial, where slaves answer when polled',
      'BACnet MS/TP, through a slave device on the trunk',
      'LonWorks, where devices work peer to peer',
      'M-Bus, where the master reads each meter in turn',
    ],
    correctIndex: 2,
    explanation:
      'LonWorks devices can send messages directly to each other, so a sensor can pass its value straight to the device that uses it. A Modbus slave only replies when the master asks. MS/TP slaves only answer masters, and only the token holder starts an exchange. An M-Bus master reads each meter in turn.',
  },
];

const BMSModule5Section1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 1"
        title="How BMS devices talk"
        backTo="/study-centre/upskilling/bms-module-5"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Before BACnet, Modbus or KNX in detail: the cables, the languages, and why a BMS only
          works when every device agrees on both.
        </p>

        <TLDR
          points={[
            'A BMS is a set of controllers, meters and plant that share data. If they cannot exchange it, you have a collection of local controls, not a system.',
            'Every link needs two agreements: the physical connection (cable, signal, topology) and the protocol (the language the messages are written in). Either one wrong and nothing useful passes.',
            'Field buses are usually serial twisted pair chained device to device: cheap, slow and good over distance. IP networks run on Ethernet through switches: fast, flexible and usually shared with other systems.',
            'Most buildings layer the two: an IP backbone at the top, serial field buses below it, joined by routers (same language) or gateways (translating between languages).',
            'Open protocols are published so any maker can use them. Proprietary ones belong to one maker, and the choice decides who can extend or repair the system for its whole life.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why devices need to talk</ContentEyebrow>

        <ConceptBlock
          title="A controller on its own is not a building management system"
          plainEnglish="A single controller can run its own plant. It only becomes part of a BMS when it shares what it knows and takes instructions from the rest of the system."
          onSite="When a client says the BMS has stopped working, the plant is often still running on its local controller. What has stopped is the conversation between devices."
        >
          <p>
            Section 1.1 described a BMS in three levels: field devices at the bottom, controllers
            (outstations) in the middle, and the head end at the top. Each level is only useful
            because information moves between them. A boiler controller wants the outside air
            temperature that a sensor on another controller is reading. An air handling unit needs
            to know whether the building is occupied, which comes from a schedule held somewhere
            else. An alarm raised in a plant room is worthless if it never reaches the screen the
            facilities team watches.
          </p>
          <p>
            Take the communication away and each controller keeps doing what it was last told, in
            isolation. Heating and cooling can end up fighting each other because neither knows what
            the other is doing. Faults go unreported until someone complains. Energy data cannot be
            collected, so nobody can see waste out of hours. The plant still runs; the system has
            gone.
          </p>
          <p>
            That is why the networks in a BMS deserve the same care as the power wiring. A poorly
            made bus connection does not trip anything or start a fire. It quietly turns a system
            back into a set of separate boxes, and it can take a long time for anyone to notice.
          </p>
          <p>
            It also explains why the same building can have several different networks. Plant
            controllers, meters, lighting and packaged equipment such as chillers often arrive from
            different suppliers, each with its own way of communicating. Part of the job of a BMS is
            to bring all of them into one view, and the rest of this module is about how that is
            done.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The two agreements</ContentEyebrow>

        <ConceptBlock
          title="Every link needs agreement on the wiring and on the language"
          plainEnglish="Two devices need a working connection between them, and they need to speak the same language over it. A good cable carrying the wrong language achieves nothing, and so does the right language on a broken cable."
          onSite="When a link will not work, ask the two questions separately. Is the signal physically getting there? Does the receiver understand it? They have different causes and different people who can fix them."
        >
          <p>
            Think of a telephone call. The line has to be connected and clear, and both people have
            to speak a language the other understands. A perfect line between an English speaker and
            someone who speaks only Japanese gets nowhere. Two fluent speakers on a dead line get
            nowhere either.
          </p>
          <p>
            Building networks split the same way. The <strong>physical side</strong> is everything
            an electrician can see and test: the cable type, the twisted pair, the screen, the
            terminations, the topology (how devices are strung together) and the electrical form of
            the signal. The <strong>protocol side</strong> is the agreed set of rules for what the
            messages mean: how a device is addressed, how a value is asked for, how it is sent back,
            and what happens when something goes wrong.
          </p>
          <p>
            The two are separate enough that one protocol can run over several kinds of wiring, and
            one kind of wiring can carry several protocols. BACnet, for example, is designed to be
            carried over several different network types, including Ethernet and a serial twisted
            pair, with the content of the message staying the same. The reverse also happens: the
            BACnet standard allows BACnet messages to travel over the transport layer of LonWorks,
            yet the two protocols still cannot understand each other. Same carrier, different
            language, no conversation.
          </p>
          <p>
            Most of this module is about the protocol side, because that is where BMS jobs get
            complicated. But a large share of the communication faults you will be called to are on
            the physical side, and those are squarely the electrician’s territory.
          </p>
        </ConceptBlock>

        <Pullquote>
          A cable that rings out perfectly can still carry nothing anyone understands. Ask whether
          the signal arrives, then ask whether it makes sense.
        </Pullquote>

        <InlineCheck
          id="bms-5-1-two-agreements"
          question="A meter and a controller are on a properly installed, correctly terminated serial bus, but the controller never reads the meter. The meter speaks M-Bus and the controller expects Modbus. Which agreement is missing?"
          options={[
            'The physical agreement, because the cable must be faulty',
            'Neither, because any two devices on one bus can share data',
            'The protocol agreement, because they speak different languages',
            'Both, because M-Bus can never be wired near Modbus',
          ]}
          correctIndex={2}
          explanation="The wiring is sound, so the physical side is not the problem. The two devices simply use different languages. Fixing it means a device that understands both (a gateway, covered in Section 5.5) or a meter with the right protocol, not re-running the cable."
        />

        <SectionRule />
        <ContentEyebrow>Serial field buses</ContentEyebrow>

        <ConceptBlock
          title="Field buses: one twisted pair, device to device"
          plainEnglish="A field bus is usually a single twisted-pair cable chained from one controller or device to the next. Data travels along it one bit after another, which is what serial means."
          onSite="If you open a plant controller and find a small screened twisted pair landed on terminals marked with letters such as A, B or D0, D1, with another pair leaving for the next unit, you are looking at a serial field bus."
        >
          <p>
            At the lower levels of a BMS, devices are numerous, cheap and spread around plant rooms,
            risers and ceiling voids. Giving each one its own run back to a central switch would be
            expensive, so most field buses use a single cable that loops from device to device. This
            is called a <strong>daisy chain</strong>, and the cable is often called the trunk.
          </p>
          <p>
            The most common electrical standard for these buses is RS-485 (formally EIA/TIA-485). It
            sends data as a difference in voltage between the two wires of a balanced twisted pair,
            which is why it copes well with electrical noise and longer cable runs. Modbus over
            serial line and BACnet MS/TP both normally use it. The Modbus serial line guide names
            the two-wire form as the usual one, with a third conductor, the common, linking every
            device as well. Every device must support 9600 and 19,200 bits per second, with 19,200
            the default; other speeds are optional (Section 5.3 has the detail).
          </p>
          <p>
            That is very slow next to an office network, and it does not need to be fast. A
            temperature reading or a valve position is a handful of bytes, and plant does not change
            from one millisecond to the next. What a field bus offers instead is low cost, simple
            wiring and good distance.
          </p>
          <p>Three physical habits of an RS-485 bus are worth knowing from the start:</p>
          <ul>
            <li>
              <strong>Topology matters.</strong> The trunk should run from device to device, with
              any connection off it kept short. Long spurs and star wiring are a common cause of
              unreliable comms.
            </li>
            <li>
              <strong>Both ends are terminated.</strong> A line termination sits near each of the
              two ends of the trunk to stop signals bouncing back along the cable. Not at every
              device, and not just at one end.
            </li>
            <li>
              <strong>The two data lines are not interchangeable.</strong> They are labelled, and
              crossing them at one device will stop that device communicating, however tidy the
              termination looks.
            </li>
          </ul>
          <p>
            Section 5.3 covers RS-485 wiring for Modbus properly, including biasing and the limits
            on length and device numbers. For now, the point is that a field bus has rules a power
            circuit does not.
          </p>
          <p>
            Do not assume those habits carry over to every bus, though. RS-485 is the most common
            physical layer, but it is not the only one you will meet, and a few examples show how
            much the rules can differ:
          </p>
          <ul>
            <li>
              <strong>LonWorks free topology twisted pair</strong> was designed to be wired in
              almost any layout, and it is insensitive to polarity. That is the opposite of RS-485
              in both respects.
            </li>
            <li>
              <strong>KNX twisted pair</strong> carries power for the bus devices as well as data,
              from a dedicated KNX bus power supply, and the bus is SELV.
            </li>
            <li>
              <strong>DALI</strong> is a lighting control bus with its own addressing; a single DALI
              bus has 64 addresses for control gear. Unlike KNX, the DALI line is not SELV, so it is
              treated as part of the mains wiring.
            </li>
            <li>
              <strong>M-Bus</strong> is used mainly for reading meters, such as heat and water
              meters.
            </li>
          </ul>
          <p>
            Section 5.4 covers these systems in more depth. The lesson for now is simple: the word
            &ldquo;bus&rdquo; does not tell you the wiring rules. The system does.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Who speaks when: masters, slaves, tokens and peers"
          plainEnglish="On a shared pair of wires, only one device can transmit at a time. Every protocol has a rule for deciding whose turn it is, and that rule explains a lot of what you see when fault-finding."
          onSite="A device that sits silent on a bus is not always faulty. On some systems it is waiting to be asked, and nobody has told the master to ask it."
        >
          <p>
            If two devices on an RS-485 pair try to transmit at once, the signals collide and both
            messages are lost. So a serial bus always has a rule about whose turn it is. The rule
            differs between protocols, and it shapes how the system behaves when something is wrong.
          </p>
          <ul>
            <li>
              <strong>Master and slave (Modbus serial).</strong> One master on the bus starts every
              exchange. It asks one slave a question and waits for the reply before moving on. A
              slave never transmits unless it has been asked, and slaves never talk to each other. A
              meter that has been wired and addressed perfectly will stay silent if the master has
              not been set up to poll it.
            </li>
            <li>
              <strong>Token passing (BACnet MS/TP).</strong> The master devices on the bus pass a
              short message, the token, from one to the next. Only the device holding the token may
              start a conversation. Slave devices, where used, only answer when a master asks them
              something.
            </li>
            <li>
              <strong>Peer to peer (LonWorks).</strong> Devices can send messages directly to each
              other without a central device asking first. A sensor can pass its value straight to
              the device that uses it, with no head end in between.
            </li>
          </ul>
          <p>
            On an IP network the switches manage the traffic, so many devices can talk at once. The
            protocol on top still has its own rules: Modbus TCP keeps the idea of one side asking
            and the other answering, now called client and server rather than master and slave.
            Sections 5.2 to 5.4 cover each protocol’s rules properly.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-1-who-speaks"
          question="A new energy meter on a Modbus RS-485 bus is wired, terminated and addressed correctly, yet it never appears on the head end. The comms light on the meter never flickers. What is worth checking first?"
          options={[
            'Whether the meter is broadcasting on the wrong channel',
            'Whether the master has been set up to poll that address',
            'Whether the meter is holding the token for too long',
            'Whether another slave is talking to the meter directly',
          ]}
          correctIndex={1}
          explanation="On Modbus serial the master starts every exchange and a slave only replies when asked. A meter nobody polls stays silent. Broadcasting, token holding and slave-to-slave traffic are not how Modbus serial works."
        />

        <InlineCheck
          id="bms-5-1-rs485-ends"
          question="You are extending an RS-485 trunk by adding one more controller beyond what used to be the last device. What happens to the line termination?"
          options={[
            'It stays where it is, because terminations never move once fitted',
            'It moves to the new end of the trunk, at or near the new last device',
            'A second termination is added at the new device, leaving the old one too',
            'It is removed altogether, because short buses do not need it',
          ]}
          correctIndex={1}
          explanation="Termination belongs at the physical ends of the trunk. Extending the cable moves one end, so the termination moves with it. Leaving the old one in place puts a termination mid-trunk, which loads the line and is a classic cause of intermittent faults after an extension."
        />

        <SectionRule />
        <ContentEyebrow>IP networks</ContentEyebrow>

        <ConceptBlock
          title="IP networks: Ethernet, switches and shared infrastructure"
          plainEnglish="At the upper levels, BMS devices increasingly sit on the same type of network as office computers: Ethernet cable to a switch, with each device given an IP address."
          onSite="A controller with an RJ45 socket and a patch lead to a switch, and an IP address in its set-up, is on an IP network. That network almost certainly belongs to someone other than you."
        >
          <p>
            An IP network is built from Ethernet links, each running from a device to a network
            switch, so the layout is a star rather than a chain. Links between floors or buildings
            are often fibre, and wireless also carries IP. What makes it an IP network is that every
            device has an address and messages can be routed between separate network segments.
          </p>
          <p>
            Several BMS protocols run over IP. <strong>BACnet/IP</strong> is used where controllers
            plug directly into Ethernet switches and is suited to existing network infrastructure.{' '}
            <strong>Modbus TCP</strong> carries Modbus messages over the same kind of network, and
            is reserved its own registered port, 502. Both are covered in later sections.
          </p>
          <p>
            Compared with a serial bus, an IP network is much faster and far more flexible. Adding a
            device means patching it into a switch rather than breaking into a trunk, and the head
            end can sit anywhere the network reaches. The trade-off is cost per device, and the fact
            that the network is shared. Once BMS controllers sit on a building’s IP network,
            questions arise about who owns that network, who is allowed to change it and how it is
            kept secure. Section 5.6 deals with those properly. Your part is to recognise that a BMS
            on IP is no longer just a controls matter.
          </p>
          <p>
            For an electrician the physical work looks familiar: structured cabling, patch panels,
            outlets and testing of each link. What changes is the paperwork and the permission. Each
            link needs to be recorded against the device it serves, and nothing should be connected
            to a network you do not control without the agreement of whoever runs it.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>How the layers fit together</ContentEyebrow>

        <ConceptBlock
          title="An IP backbone on top, serial field buses underneath"
          plainEnglish="Most buildings use both. Fast IP links carry data between main controllers and the head end; slower serial buses carry data out to the many smaller devices."
          onSite="On a riser or network drawing, look for the boxes where the two meet. Those routers and gateways are where a fault on one bus can hide a whole section of the building from the head end."
        >
          <p>
            A typical arrangement looks like this. The head end and the main plant controllers sit
            on an IP network, often described as the BMS backbone. Below each main controller, one
            or more serial buses run out to fan coil controllers, variable air volume boxes, meters,
            drives and packaged plant. Each serial bus collects data from a floor or a plant room
            and passes it up.
          </p>
          <p>Where two networks meet, one of two kinds of device joins them:</p>
          <ul>
            <li>
              <strong>A router</strong> connects two network types that carry the same protocol. A
              BACnet router between BACnet/IP and BACnet MS/TP passes messages from one to the other
              without altering what they say. Routers may be separate boxes or built into a
              controller.
            </li>
            <li>
              <strong>A gateway</strong> connects two networks that speak different protocols,
              translating between them: Modbus from a chiller into BACnet for the head end, for
              example. Translation always involves choices about which data is passed and how, and
              that is the subject of Section 5.5.
            </li>
          </ul>
          <p>
            The distinction matters when diagnosing faults. If a whole floor of devices drops off
            the head end at once, the bus or the router or gateway above it is the first suspect,
            not the individual devices.
          </p>
          <p>
            The network drawing, sometimes called the network architecture or riser schematic, is
            the document that shows all of this. It should show each controller, which network it
            sits on, every router and gateway, and the order of devices along each serial trunk,
            with the ends marked. If you are asked to install communication cabling and there is no
            such drawing, ask for one before you start. If you change the route or the order of
            devices on site, the drawing has to change with it, because the next person will
            fault-find from it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-1-router-gateway"
          question="A packaged chiller only speaks Modbus. The building’s head end only speaks BACnet. What is needed to bring the chiller onto the BMS?"
          options={[
            'A BACnet router, because it connects two network types',
            'A longer Ethernet patch lead to the nearest switch',
            'A second termination resistor on the chiller’s bus',
            'A gateway that translates between Modbus and BACnet',
          ]}
          correctIndex={3}
          explanation="The languages differ, so something has to translate. A BACnet router only joins networks that already carry BACnet. A patch lead or a termination would fix a physical problem, and this is a protocol problem."
        />

        <SectionRule />
        <ContentEyebrow>Open and proprietary</ContentEyebrow>

        <ConceptBlock
          title="Open protocols are published; proprietary ones belong to one maker"
          plainEnglish="An open protocol is a set of rules anyone can read and build to, so different makers’ equipment can share data. A proprietary one is controlled by a single manufacturer."
          onSite="When you are asked to add a device to an existing BMS, the first useful question is what protocol the system uses. The answer tells you who you will need to involve."
        >
          <p>
            BACnet, Modbus, KNX, LonWorks, M-Bus and DALI are all open in this sense: their rules
            are published and many manufacturers make compatible products. A proprietary protocol is
            one manufacturer’s own. It may work very well, and some older installations use nothing
            else, but only that maker, or installers it approves, can extend and maintain it.
          </p>
          <p>
            That choice has consequences long after handover. A building on a proprietary system is
            tied to one supply chain for every addition, repair and upgrade. Industry guidance
            treats protocol lock-in as one of the decisions that is very hard to reverse once made,
            alongside the choice of head end and the cabling layout. Moving off a proprietary system
            later commonly means replacing controllers and upgrading the network.
          </p>
          <p>
            Open does not mean automatic, though. Two devices can both claim BACnet or Modbus and
            still not share the data you expect, because each implements only some of what the
            protocol allows, and each maps its data in its own way. Before integrating, the controls
            engineer will ask for the manufacturer’s documentation of exactly what a device
            supports: for BACnet, its protocol implementation conformance statement (PICS); for
            Modbus, its register map. Sections 5.2 and 5.3 explain what those documents contain.
          </p>
        </ConceptBlock>

        <Pullquote>
          The protocol chosen on day one decides who can work on the system for the rest of its
          life. That is why the question is asked before the first controller is bought.
        </Pullquote>

        <RegsCallout
          source="Approved Document L, Volume 2 (England, 2021 edition, in force now)"
          clause="Paragraph 6.72(d), in summary: a qualifying building automation and control system should be able to communicate with the fixed building services connected to it, and should work with those services even where they come from different manufacturers and use different proprietary devices and technologies."
          meaning={
            <>
              <p>
                Interoperability is part of what the Approved Document expects of a qualifying
                building automation and control system, not an optional extra. It does not name a
                protocol, but a system that can only talk to one maker’s equipment sits awkwardly
                against it.
              </p>
              <p>
                The 2026 edition carries the same expectation as paragraph 5.84(d), from 24 March
                2027. Section 1.5 covered when the requirement applies, including the system
                threshold.
              </p>
            </>
          }
          cite="Approved Document L Vol 2 (2021), para 6.72(d)"
        />

        <SectionRule />
        <ContentEyebrow>The electrician’s part</ContentEyebrow>

        <ConceptBlock
          title="Most network faults start in the cable, the terminations or the routing"
          plainEnglish="The controls engineer sets up addresses and protocols. The electrician usually installs the cables those messages travel on, and that work decides whether the network will be reliable."
          onSite="Treat a bus cable as a signal circuit, not a power circuit. Follow the specification for cable type and screen, keep to the topology on the drawing, and record where the ends and terminations are."
        >
          <p>
            On most BMS projects the electrician installs containment, power to panels and plant,
            and some or all of the communication cabling. The physical side of every network passes
            through your hands, and with it most of the faults that later get blamed on software.
          </p>
          <p>Practical points that carry across every protocol:</p>
          <ul>
            <li>
              Use the cable the controls specification and the manufacturer call for. A spare
              multicore may carry a signal on the bench and fail on a long run near drives.
            </li>
            <li>
              Wire the topology on the drawing. Do not turn a daisy chain into a star because it
              saves a cable pull.
            </li>
            <li>
              Terminate screens and data conductors exactly as the manufacturer instructs, and keep
              the data line identities consistent at every device.
            </li>
            <li>
              Plan routes with separation from power cabling in mind, and where data and power share
              a wiring system, check how Regulation 528.1 on voltage bands is met.
            </li>
            <li>
              Label both ends of every bus cable and mark the trunk ends on the as-fitted drawings.
              The next person fault-finding will need to know where the line ends.
            </li>
          </ul>
          <p>
            Addressing, protocol settings and integration belong to the controls engineer. Your job
            is to hand them a physical network that works, and to be able to show it.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 444.4.10: within a building, BS EN 50174-1, BS EN 50174-2 and BS EN 50310 shall be applied for control, signalling and communication circuits."
          meaning={
            <>
              <p>
                BS 7671 hands the detailed rules for communication cabling to the BS EN 50174
                series, and that is where the separation distances between power and data cabling
                are set. BS 7671 itself does not give a single separation figure for control
                cabling, so be wary of anyone quoting one as a wiring regulation.
              </p>
              <p>
                Regulation 528.1 still applies alongside it: where circuits of different voltage
                bands share a wiring system, segregate them or use one of the permitted methods.
              </p>
            </>
          }
          cite="BS 7671:2018+A4:2026 Reg 444.4.10"
        />

        <CommonMistake
          title="Wiring a field bus like a power circuit"
          whatHappens="The bus cable is run in whatever spare multicore is to hand, teed off in junction boxes to reach devices on either side, and dropped in the same tray as the drive cables. Every device is wired, and on the first visit some of them respond. Within a week the head end shows devices dropping in and out, and the controls engineer spends days chasing what looks like a software fault."
          doInstead="Use the specified cable, keep the trunk running device to device with only short connections off it, terminate the two ends and nowhere else, keep the data line identities the same at every device, and route it with separation from power. Record the route and the ends on the as-fitted drawings."
        />

        <Scenario
          title="A new air handling unit on an old system"
          situation="During a refurbishment of a two-storey office, a replacement air handling unit arrives with its own controller. The data sheet shows a twisted-pair communication port. The existing BMS outstation in the plant room was installed many years ago and nobody on site knows what protocol it uses. The site manager asks you to “just wire it into the BMS”."
          whatToDo="Separate the two questions before pulling any cable. For the physical side, find out what the AHU port is (RS-485 or something else), what cable and topology its manufacturer requires, and where the nearest suitable bus or controller is. For the language side, find out what protocol the AHU controller speaks and what the existing BMS uses. That second answer usually needs the controls contractor and the system’s documentation. If they match, it may be a wiring job plus configuration by the controls engineer. If they do not, or the BMS is proprietary, it needs a gateway or a different approach, and the decision is not yours to make on site."
          whyItMatters="Two wires landed on two terminals will look finished and may do nothing. Asking both questions first stops you installing a link that can never work, and puts the integration decision with the people who are responsible for it."
        />

        <Scenario
          title="Plant controllers on the office network"
          situation="A client is fitting out a new floor and wants the BMS controllers for the new fan coil units and the floor’s air handling unit to use the Ethernet floor ports already installed for the office. The cabling is in, the patch panel is labelled, and there are spare ports on the switch. The site manager suggests you just patch the controllers in and leave the rest to the controls engineer."
          whatToDo="Do not patch anything in yet. Find out who owns and manages that network, which is usually the client’s IT team or their provider, and make sure the controls engineer and they have agreed how the BMS will connect: which ports, which network segment, and how addresses are given out. Install and test the physical links to the agreed points, label them, and record them on the as-fitted drawings."
          whyItMatters="Once plant controllers sit on a shared IP network, a change made by IT can take the BMS off line, and a weakness in the BMS can become a way into the business network. Those are questions for the network owner and the controls designer, covered in Section 5.6. Patching in first and asking later leaves them unanswered."
        />

        <CommonMistake
          title="Assuming that on the network means it will talk"
          whatHappens="A new meter with an Ethernet port is patched into the same switch as the BMS controllers. It gets a network link light and an IP address, so it is reported as connected. The head end never shows a reading, because the meter speaks one protocol and the head end has never been set up to ask it for anything."
          doInstead="A link light proves the physical side only. Confirm the protocol, and get the controls engineer to add the device to the system and map its points. Report the device as installed and powered with a network link, not as integrated, until it shows data at the head end."
        />

        <FAQ
          items={[
            {
              question: 'Do I need to understand protocols to install BMS cabling?',
              answer:
                'You do not need to configure them, but you need enough to recognise which kind of network you are wiring, because the physical rules differ. RS-485 cares about topology, termination and which data line is which; some other buses do not. Knowing the protocol also tells you who to ask when something does not communicate.',
            },
            {
              question: 'Can a BMS use the same Ethernet cabling as the office network?',
              answer:
                'It can share structured cabling and switches, and many modern systems do. Whether it should, and how, is a decision for the building owner, their IT team and the controls designer, because it affects security and who manages the network. Section 5.6 covers the options.',
            },
            {
              question: 'Is an open protocol always better than a proprietary one?',
              answer:
                'Not in every respect: a proprietary system can work very well within its own range. Open protocols give the owner choice of suppliers and make adding other makers’ equipment easier, which is why guidance and Approved Document L lean towards interoperability. Even with open protocols, devices have to be checked against each other before integration.',
            },
            {
              question:
                'The bus worked until I added one more device. What should I look at first?',
              answer:
                'Start with the physical changes you made. Did the extension move the end of the trunk, leaving the termination stranded mid-cable? Is the new device wired with its data lines the same way round as the others? Is it a spur rather than part of the chain? Only once the wiring is proved does it make sense to ask the controls engineer about addressing, such as two devices sharing an address.',
            },
            {
              question: 'What is the difference between a router and a gateway?',
              answer:
                'A router joins two network types that carry the same protocol, such as BACnet/IP and BACnet MS/TP, and passes messages unchanged. A gateway joins networks that use different protocols and translates between them. Gateways are covered in Section 5.5.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A BMS only behaves as a system while its devices can exchange data. Lose the communication and you are left with separate local controls.',
            'Every link needs two agreements: the physical connection and the protocol. Test them as two separate questions.',
            'Serial field buses, usually RS-485 twisted pair chained device to device, are cheap, slow and good over distance, with strict rules on topology and termination.',
            'IP networks use Ethernet to switches, are fast and flexible, and bring questions of ownership and security because they are shared.',
            'Routers join different networks carrying the same protocol; gateways translate between different protocols.',
            'Open protocols are published for any maker to use; proprietary ones tie the owner to one supply chain, and Approved Document L expects interoperability across makers.',
            'BS 7671 Regulation 444.4.10 points communication cabling to BS EN 50174-1 and -2, and Regulation 528.1 still governs voltage bands sharing a wiring system.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-5"
          prevLabel="Module 5: Networks and protocols"
          nextHref="/study-centre/upskilling/bms-module-5-section-2"
          nextLabel="BACnet"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule5Section1;
