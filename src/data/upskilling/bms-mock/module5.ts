import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule5: StandardMockQuestion[] = [
  // ── 5.1 How BMS devices talk ─────────────────────────────────────────
  {
    id: 5001,
    question:
      'Every BMS link needs agreement on the physical side and on the protocol side. Which of these belongs to the physical side?',
    options: [
      'How a device is addressed in a message',
      'How a value is requested and sent back',
      'The topology the cable is strung in',
      'What happens when a message goes wrong',
    ],
    correctAnswer: 2,
    explanation:
      'The physical side is what an electrician can see and test: cable type, twisted pair, screen, terminations, topology and the electrical form of the signal. Addressing, requesting values and error handling are all rules of the protocol, the language the messages are written in, so they sit on the other side of the split.',
    section: '5.1',
    difficulty: 'basic',
    topic: 'Physical and protocol agreements',
    category: 'Networks and protocols',
  },
  {
    id: 5002,
    question:
      'Compared with a serial field bus, what is the main trade-off of putting BMS devices on an IP network?',
    options: [
      'Higher cost per device, and the network is shared',
      'Much slower data, though over far longer distances',
      'Strict termination at both ends of every Ethernet run',
      'Only one device may transmit at any one time',
    ],
    correctAnswer: 0,
    explanation:
      'IP networks are faster and more flexible, but cost more per device and are usually shared, which brings questions of ownership and security. Slow but good over distance describes the serial field bus, and end termination and one-talker-at-a-time are RS-485 bus habits; on IP the switches manage the traffic so many devices can talk at once.',
    section: '5.1',
    difficulty: 'basic',
    topic: 'Serial buses against IP networks',
    category: 'Networks and protocols',
  },
  {
    id: 5003,
    question:
      'On a building with an IP backbone and serial buses below it, every fan coil controller on the third floor drops off the head end at the same moment. Where should fault-finding start?',
    options: [
      'Each fan coil controller in turn, starting at the nearest one',
      'The head-end PC, since it is the only device common to all',
      'The room temperature sensors wired to each fan coil unit',
      'That floor’s bus and the router or gateway above it',
    ],
    correctAnswer: 3,
    explanation:
      'When a whole floor of devices disappears at once, the bus or the router or gateway joining it to the backbone is the first suspect, not the individual devices. The rest of the building still reports to the head end, so the head end is not the common factor, and sensors would not take the controllers themselves off line.',
    section: '5.1',
    difficulty: 'intermediate',
    topic: 'Layered networks and fault-finding',
    category: 'Networks and protocols',
  },
  {
    id: 5004,
    question:
      'A new meter with an Ethernet port is patched into the BMS switch. It shows a link light and has an IP address, but no reading appears at the head end. How should its status be reported?',
    options: [
      'Integrated, since the link light proves the meter is talking',
      'Installed and powered with a network link, not yet integrated',
      'Faulty, because a networked meter should show data at once',
      'Connected, but the patch lead must be replaced before sign-off',
    ],
    correctAnswer: 1,
    explanation:
      'A link light proves only the physical side. The meter may speak a protocol the head end has never been set up to ask for, so the controls engineer still has to add it and map its points. Calling it integrated or faulty both jump to a conclusion the evidence does not support, and the cable is not in question.',
    section: '5.1',
    difficulty: 'intermediate',
    topic: 'Link light against integration',
    category: 'Networks and protocols',
  },
  {
    id: 5005,
    question:
      'A replacement air handling unit arrives with a twisted-pair comms port. Nobody on site knows what protocol the old BMS outstation uses, and the site manager asks you to “just wire it into the BMS”. What is the right approach?',
    options: [
      'Land the AHU on the nearest existing bus and let the controls engineer sort out the rest later',
      'Establish the cable and topology the AHU needs, and get both protocols confirmed first',
      'Fit a gateway between the AHU and the outstation so the two will always understand',
      'Run a new Ethernet cable instead, because IP links avoid any protocol mismatch',
    ],
    correctAnswer: 1,
    explanation:
      'The two questions have to be separated before any cable is pulled: what the port needs physically, and whether the AHU and the BMS speak the same language, which usually needs the controls contractor and the system documents. Wiring first may produce a link that can never work. A gateway may or may not be needed, and that decision is not the electrician’s to make on site; Ethernet does not remove a protocol mismatch either.',
    section: '5.1',
    difficulty: 'advanced',
    topic: 'Adding plant to an existing BMS',
    category: 'Networks and protocols',
  },

  // ── 5.2 BACnet ──────────────────────────────────────────────────────
  {
    id: 5006,
    question: 'A specification says “BACnet throughout”. What does that actually guarantee?',
    options: [
      'That any maker’s controller can replace another with no re-engineering at all',
      'A common way for devices to describe data, make requests and carry them',
      'That every controller is programmed with the same control strategy',
      'That every device supports every object type in the standard',
    ],
    correctAnswer: 1,
    explanation:
      'BACnet standardises how information is described, how one device asks another for things and how the messages are carried. It does not standardise programming and does not promise plug-and-play: swapping one maker’s controller for another still means re-engineering the points and logic. No device supports all of BACnet, which is why each product has a PICS.',
    section: '5.2',
    difficulty: 'basic',
    topic: 'What BACnet standardises',
    category: 'Networks and protocols',
  },
  {
    id: 5007,
    question:
      'A volt-free fault contact from a boiler is wired to a BACnet controller terminal. Which object type normally represents it?',
    options: ['Binary input', 'Binary output', 'Analogue input', 'Binary value'],
    correctAnswer: 0,
    explanation:
      'A two-state signal coming into the controller is a binary input. A binary output is a two-state command going out, such as a fan relay. Analogue inputs carry continuously variable values such as temperatures, and value objects are software points with no terminal behind them.',
    section: '5.2',
    difficulty: 'basic',
    topic: 'BACnet object types',
    category: 'Networks and protocols',
  },
  {
    id: 5008,
    question:
      'Every controller on a BACnet site has an object shown as AI-1. A new engineer thinks this is a numbering clash. Is it?',
    options: [
      'Yes, every object instance must be unique across the whole site',
      'Yes, unless each controller sits on its own separate MS/TP trunk',
      'No, because the head end renumbers objects when it discovers them',
      'No, object instances need only be unique within their own device',
    ],
    correctAnswer: 3,
    explanation:
      'An object’s instance only has to be unique within the device that holds it, so every controller can have an AI-1. The number that must be unique site-wide is the device instance. Head ends do not renumber objects, and separate trunks make no difference to either rule.',
    section: '5.2',
    difficulty: 'intermediate',
    topic: 'Object and device instances',
    category: 'Networks and protocols',
  },
  {
    id: 5009,
    question:
      'To save time, ten new fan coil controllers are set up by copying the configuration of one that already works. On the head end, points now appear and disappear at random. What is the most likely cause?',
    options: [
      'The MS/TP trunk has been terminated at too many devices',
      'The schedule object was copied and is fighting the original',
      'The copied device instance is now shared by several controllers',
      'The copied controllers are all writing at the wrong priority level',
    ],
    correctAnswer: 2,
    explanation:
      'Cloning a configuration carries the device instance across with it. The head end then finds several devices answering to one number and binds to whichever replied last, so points come and go. The cure is to set each instance from the site register after any copy and run a discovery to confirm each appears once. A termination fault would cause comms errors rather than this pattern.',
    section: '5.2',
    difficulty: 'intermediate',
    topic: 'Duplicate device instances',
    category: 'Networks and protocols',
  },
  {
    id: 5010,
    question:
      'After a Cat A fit-out, about half of one floor’s MS/TP fan coil controllers show offline; the rest of the building is fine. The fit-out electricians re-made the trunk to suit the new ceiling. What is the best way to proceed?',
    options: [
      'Swap the offline controllers for spares one at a time until the floor comes back',
      'Ask the controls engineer to reload every controller’s software from a backup',
      'Walk the trunk from the router: chain, polarity, ends, screen, addresses',
      'Add a termination at each controller that was moved so every unit is matched',
    ],
    correctAnswer: 2,
    explanation:
      'MS/TP faults rarely affect one device neatly: a reversed pair, a stranded termination, a new spur or a duplicate address can disturb the token for everything downstream. Checking methodically from the router outwards finds it; swapping controllers at random does not, and a software reload ignores a wiring change that is the obvious suspect. Terminating every moved unit adds terminations mid-trunk and makes it worse.',
    section: '5.2',
    difficulty: 'advanced',
    topic: 'MS/TP fault-finding',
    category: 'Networks and protocols',
  },

  // ── 5.3 Modbus RTU and Modbus TCP ───────────────────────────────────
  {
    id: 5011,
    question: 'On a Modbus serial line, what is address 0 used for?',
    options: [
      'Broadcast: every slave acts on it, none replies, writes only',
      'The master’s own address, which every slave uses when replying',
      'A spare address reserved for the first slave on the trunk',
      'Reading every slave’s registers in a single request',
    ],
    correctAnswer: 0,
    explanation:
      'Address 0 is broadcast. Every slave acts on it but nobody replies, so it can only be used for writing, never for reading. Slave addresses run from 1 to 247, and 248 to 255 are reserved. The master does not have a slave address of its own.',
    section: '5.3',
    difficulty: 'basic',
    topic: 'Modbus addressing',
    category: 'Networks and protocols',
  },
  {
    id: 5012,
    question:
      'An integrator needs to send a new setpoint to one holding register on a drive. Which Modbus function code does that job?',
    options: ['03', '05', '06', '16'],
    correctAnswer: 2,
    explanation:
      '06 writes a single register. 03 reads holding registers, 05 writes a single coil (a bit, not a register), and 16 writes multiple registers. 16 would work for a block of values, but the code for one register is 06.',
    section: '5.3',
    difficulty: 'basic',
    topic: 'Function codes',
    category: 'Networks and protocols',
  },
  {
    id: 5013,
    question:
      'A Modbus RTU bus runs close to drive output cables. Noise is corrupting some frames. How does that usually show up at the BMS?',
    options: [
      'As wrong but believable values appearing on the affected points',
      'As exception code 02 returned by the affected devices',
      'As values exactly ten times too large on some meters',
      'As missed replies and time-outs on the affected devices',
    ],
    correctAnswer: 3,
    explanation:
      'Each RTU message ends with a CRC check value. If the CRC does not match, the receiving device throws the message away and says nothing, so noise shows up as missed replies and time-outs rather than wrong numbers. Exception 02 means an address out of range, and a neat ×10 error is a scaling fault.',
    section: '5.3',
    difficulty: 'intermediate',
    topic: 'RTU framing and CRC',
    category: 'Networks and protocols',
  },
  {
    id: 5014,
    question:
      'On a Modbus RTU trunk, one tap feeds four drop cables to meters mounted off the route. What is the longest each drop may be?',
    options: ['5 m', '10 m', '20 m', '40 m'],
    correctAnswer: 1,
    explanation:
      'Where one tap feeds several drops they share a budget of 40 m divided by the number of drops, so four drops get 10 m each. 20 m is the limit for a single drop on its own, and 40 m is the shared total, not the length of each.',
    section: '5.3',
    difficulty: 'intermediate',
    topic: 'Drop cable limits',
    category: 'Networks and protocols',
  },
  {
    id: 5015,
    question:
      'With a Modbus RTU bus isolated and powered down, you measure DC resistance across D0 and D1 and read no termination at all. The drawings say both ends use a 120 ohm resistor in series with a 1 nF capacitor. What do you conclude?',
    options: [
      'Nothing yet: this type of termination will not show on a DC reading',
      'Both terminations are missing and must be fitted before power-up',
      'D0 and D1 are reversed at one of the two end devices on the trunk',
      'The biasing resistors have been fitted in place of the terminations',
    ],
    correctAnswer: 0,
    explanation:
      'A termination built with a series capacitor blocks DC, so it does not appear on a resistance reading at all. That is why you need to know which type is fitted before testing. Condemning the terminations on this reading would be wrong; check them visually or by the device settings instead. Reversed conductors would not change a resistance reading across the pair.',
    section: '5.3',
    difficulty: 'advanced',
    topic: 'Proving terminations',
    category: 'Networks and protocols',
  },

  // ── 5.4 KNX, LonWorks, M-Bus and DALI ───────────────────────────────
  {
    id: 5016,
    question: 'What does the single twisted pair of a KNX TP line carry?',
    options: [
      'Data only, with each device powered from its own 230 V feed',
      'Both power and data, fed from a dedicated KNX bus supply',
      'Data only, with a second pair carrying 48 V DC to the devices',
      'Mains power, with the data superimposed on the supply cores',
    ],
    correctAnswer: 1,
    explanation:
      'A KNX TP line is one twisted pair carrying both the power for the bus devices and the messages between them, fed by a dedicated bus supply of nominally 30 V DC. The bus is SELV, not mains. The 48 V DC figure belongs to LonWorks link power, which is a different system.',
    section: '5.4',
    difficulty: 'basic',
    topic: 'KNX bus power',
    category: 'Networks and protocols',
  },
  {
    id: 5017,
    question: 'Control gear on one DALI line can be placed in up to how many groups?',
    options: ['4', '8', '64', '16'],
    correctAnswer: 3,
    explanation:
      'Control gear on a DALI line can be placed in any of 16 groups, and each piece of gear can store up to 16 scenes. 64 is the number of control gear addresses (and of control devices) on one line, which is the figure most often confused with it.',
    section: '5.4',
    difficulty: 'basic',
    topic: 'DALI addressing and groups',
    category: 'Networks and protocols',
  },
  {
    id: 5018,
    question:
      'A LonWorks TP/FT-10 segment is to be wired as a doubly terminated bus. What limit applies to the connection from the bus to each device?',
    options: [
      'Stubs of no more than 3 m to each device',
      'Drops of no more than 20 m to each device',
      'No limit, since TP/FT-10 allows free topology',
      'Each device must be looped in and out directly',
    ],
    correctAnswer: 0,
    explanation:
      'A doubly terminated TP/FT-10 bus has a terminator at each end and stubs of no more than 3 m to each device. The 20 m drop limit is a Modbus RTU figure. Free topology is a different layout with its own single terminator, and choosing the bus layout brings the stub limit with it.',
    section: '5.4',
    difficulty: 'intermediate',
    topic: 'LonWorks TP/FT-10 wiring',
    category: 'Networks and protocols',
  },
  {
    id: 5019,
    question:
      'You are second-fixing a DALI line. On which devices must the DA+ and DA− markings be observed?',
    options: [
      'On every driver and sensor connected to the line',
      'Only on the first and last devices on the line',
      'Only on a device that contains a bus supply',
      'On none, because DALI is polarity insensitive',
    ],
    correctAnswer: 2,
    explanation:
      'The DALI cores can go to either terminal on most devices, but where a device contains a bus power supply, DA+ and DA− must be observed. Saying none at all misses that exception, and DALI has no end-of-line rule that would single out the first and last devices.',
    section: '5.4',
    difficulty: 'intermediate',
    topic: 'DALI polarity',
    category: 'Networks and protocols',
  },
  {
    id: 5020,
    question:
      'A KNX line totals about 800 m of cable, with the bus supply in a riser at one end of the floor. Devices at the far end work on quiet afternoons but drop out when many devices are active. What is the most likely cause?',
    options: [
      'The far devices are more than 350 m of cable from the supply',
      'The line is over the 1000 m limit for a single line segment',
      'The line needs a terminator fitting at the far end of the run',
      'The bus cores are reversed at the devices at the far end',
    ],
    correctAnswer: 0,
    explanation:
      'At 800 m the line passes the 1000 m segment limit, but with the supply at one end the far devices can easily be beyond 350 m of cable from it. Under load the voltage there falls out of the working range. The two limits are separate checks, and a line can pass one and fail the other. Termination is not part of the KNX rules given here.',
    section: '5.4',
    difficulty: 'advanced',
    topic: 'KNX length limits',
    category: 'Networks and protocols',
  },

  // ── 5.5 Gateways and integration ────────────────────────────────────
  {
    id: 5021,
    question: 'Which of these jobs is done by a bridge rather than a router or a gateway?',
    options: [
      'Joining BACnet/IP to a BACnet MS/TP trunk',
      'Presenting a chiller’s Modbus data as BACnet',
      'Bringing M-Bus heat meters into a BACnet BMS',
      'Joining copper Ethernet to fibre Ethernet',
    ],
    correctAnswer: 3,
    explanation:
      'A bridge joins two data links and forwards traffic without looking inside it, such as copper Ethernet to fibre. BACnet/IP to MS/TP is a router job: same protocol, different network types. Modbus to BACnet and M-Bus to BACnet are gateway jobs, because the protocol changes and every point is rebuilt.',
    section: '5.5',
    difficulty: 'basic',
    topic: 'Bridge, router and gateway',
    category: 'Networks and protocols',
  },
  {
    id: 5022,
    question:
      'An outside air temperature integrated from a Modbus device reads sensibly during the day, but on frosty mornings the head end shows a huge positive number. What is the most likely cause?',
    options: [
      'A scale factor of 0.1 has been left out of the gateway mapping',
      'A signed value is being read by the gateway as unsigned',
      'The point is mapped one register off in the gateway',
      'The device is dropping off the bus in cold weather',
    ],
    correctAnswer: 1,
    explanation:
      'Some register maps hold values as signed numbers, and a negative temperature read as unsigned appears as a very large positive one. That fits a value that is fine above zero and absurd below it. A missing scale factor would be wrong all day, an off-by-one would show a different quantity, and a dropped device gives stale values or comms alarms.',
    section: '5.5',
    difficulty: 'intermediate',
    topic: 'Signed and unsigned values',
    category: 'Networks and protocols',
  },
  {
    id: 5023,
    question:
      'A meter’s energy total, held across two registers, shows a value at the head end that is wildly wrong and jumps about, while the meter’s own display climbs steadily. What should be suspected first?',
    options: [
      'A missing scale factor of 10, 100 or 1000 in the mapping',
      'A missing line termination at the end of the RS-485 trunk',
      'The two registers being combined in the wrong word order',
      'The meter answering to the wrong unit identifier on TCP',
    ],
    correctAnswer: 2,
    explanation:
      'Values too large for one register are split across two, and the order of the two words is set by the device maker. Read in the wrong order, the result is wildly wrong and jumps around. A missing scale factor gives a value exactly 10, 100 or 1000 times out, and a termination fault shows as errors and dropouts rather than a steady stream of nonsense.',
    section: '5.5',
    difficulty: 'intermediate',
    topic: 'Register word order',
    category: 'Networks and protocols',
  },
  {
    id: 5024,
    question:
      'A client asks for every register on a new packaged chiller to be made writable from the BMS “in case it is needed”. What is good practice?',
    options: [
      'Read-only by default; writable only with a stated reason and fallback',
      'Make them all writable, since BACnet priority will sort out any conflict',
      'Make them all writable, but only at BACnet priority 1 for safety',
      'Leave writing to the chiller supplier’s own remote access instead',
    ],
    correctAnswer: 0,
    explanation:
      'Third-party plant should be integrated read-only by default. A point is made writable only where the points schedule says why, what may write it and what the plant does if the BMS stops sending. BACnet priority cannot protect a Modbus register, which simply holds the last value written, and priority 1 is a life-safety slot that a BMS write should not be used for.',
    section: '5.5',
    difficulty: 'intermediate',
    topic: 'Write access',
    category: 'Networks and protocols',
  },
  {
    id: 5025,
    question:
      'Heat meters in a block of flats reach the BMS through an M-Bus gateway. Every meter shows online with sensible totals, but a resident’s disputed reading does not match the meter in their cupboard. What is the right response?',
    options: [
      'Correct that one flat’s entry in the gateway mapping and close the complaint there',
      'Replace the gateway, since it is the only device common to every meter',
      'Re-terminate the M-Bus cable at both ends and ask the resident to recheck',
      'Compare a sample of meters on site with the head end, then check all of them',
    ],
    correctAnswer: 3,
    explanation:
      'Every link is working, so the error is in the mapping, and only an end-to-end check against the physical meters will find it. Read the display and serial number at each meter and compare with the head end, then check every meter, not just the disputed one, and record the evidence against the points schedule. Fixing one entry leaves other swapped pairs in place, and the gateway and cabling are already shown to work.',
    section: '5.5',
    difficulty: 'advanced',
    topic: 'End-to-end testing',
    category: 'Networks and protocols',
  },

  // ── 5.6 Network design and cyber security ───────────────────────────
  {
    id: 5026,
    question:
      'Why is a networked device still using its factory default password treated as having no real password at all?',
    options: [
      'Factory passwords are always blank on BMS equipment',
      'Defaults are published in manuals and collected online',
      'Defaults expire automatically after the first restart',
      'A default password only works from the local service port',
    ],
    correctAnswer: 1,
    explanation:
      'Default usernames and passwords are printed in installation manuals that anyone can download and are collected online, so anyone who can reach the device can take it over. That applies to controllers, switches, gateways, meters and web pages alike. Defaults are not blank or time-limited, and they work over the network as well as locally.',
    section: '5.6',
    difficulty: 'basic',
    topic: 'Default credentials',
    category: 'Networks and protocols',
  },
  {
    id: 5027,
    question:
      'A colleague got a stubborn fan coil controller onto the head end by dropping a small unmanaged switch into the ceiling void and patching it to the nearest office floor outlet. What is wrong with that fix?',
    options: [
      'It leaves a back door to the office network that no drawing shows',
      'Nothing, provided the controller now appears on the head end',
      'Only that the switch should have been fitted inside the panel',
      'Only that the patch lead should be a different colour for the BMS',
    ],
    correctAnswer: 0,
    explanation:
      'The BMS now has an unrecorded connection onto the office network, and an unmanaged switch cannot keep the traffic apart. A connection that works is not the same as one that is right: the fault should be found, or the controls contractor and IT team asked which network and VLAN the controller belongs on. Moving the switch or changing lead colours does nothing to separate the traffic.',
    section: '5.6',
    difficulty: 'intermediate',
    topic: 'Segregation',
    category: 'Networks and protocols',
  },
  {
    id: 5028,
    question:
      'On a routine service visit you find a gateway still accepting its factory login. Changing passwords is not in your agreed work. What should you do?',
    options: [
      'Change it now and keep the new password noted on your job sheet',
      'Leave it, since the gateway is not on the open internet',
      'Report it in writing to the client and controls contractor',
      'Change it now to a password the whole team already knows',
    ],
    correctAnswer: 2,
    explanation:
      'Unless it is part of your agreed work, do not change it on the spot: the new credentials have to be recorded and handed to the right people, or nobody will be able to log in. Report it in writing so it is changed and recorded properly. Leaving it because the device is off the internet ignores anyone who reaches the BMS network, and a password the team shares is a shared login by another name.',
    section: '5.6',
    difficulty: 'intermediate',
    topic: 'Default credentials',
    category: 'Networks and protocols',
  },
  {
    id: 5029,
    question:
      'Why is the configuration of a BACnet broadcast management device (BBMD) part of the security picture on a segregated BMS?',
    options: [
      'It holds the master password for every BACnet controller',
      'Set up carelessly, it can carry BACnet traffic out of the segment',
      'It switches off BACnet broadcasts once handover is complete',
      'It is the device that encrypts all BACnet messages passing between subnets',
    ],
    correctAnswer: 1,
    explanation:
      'A BBMD passes BACnet broadcasts between IP subnets. Configured carelessly, it can carry BACnet traffic further than intended, including out of the BMS segment. It does not store passwords or encrypt messages, and broadcasts are still needed after handover for discovery. Its setup belongs to the controls engineer, but you should know it exists.',
    section: '5.6',
    difficulty: 'intermediate',
    topic: 'BBMDs and segregation',
    category: 'Networks and protocols',
  },
  {
    id: 5030,
    question:
      'After an overnight power cut, nobody can log in to a warehouse BMS head end. The only administrator account was shared, and its password was changed by an engineer who has since left. Once access is recovered by the manufacturer’s approved method, what should follow?',
    options: [
      'Reset it to the factory default so everyone can find the login in the manual',
      'Set a new shared password and fix a copy inside the head end cabinet door',
      'Give the controls contractor sole access, so that only one firm can change anything',
      'Named accounts for each person, owner-held admin access and a leavers process',
    ],
    correctAnswer: 3,
    explanation:
      'A single shared login is a single point of failure whether or not anyone meant harm. Rebuild with one named account per person, an administrator account whose credentials the owner holds and stores securely, and a written process for removing access when someone leaves. A factory default or a password taped in a cabinet recreates the weakness, and handing sole access to one firm leaves the owner locked out again if that relationship changes.',
    section: '5.6',
    difficulty: 'advanced',
    topic: 'Accounts and access recovery',
    category: 'Networks and protocols',
  },
];
