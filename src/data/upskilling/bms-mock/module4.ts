import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule4: StandardMockQuestion[] = [
  // ── 4.1 Lighting control ──────────────────────────────────────────────
  {
    id: 4001,
    question:
      'A BMS digital output switches a car park lighting contactor. Why is a digital input from an auxiliary contact on that contactor worth adding?',
    options: [
      'It lets the BMS dim the car park lighting in steps',
      'It proves the contactor actually pulled in',
      'It reports which luminaire on the circuit has failed',
      'It supplies the contactor coil if the output fails',
    ],
    correctAnswer: 1,
    explanation:
      'Without feedback the BMS only knows what it asked for, not what happened: a stuck contactor or a tripped MCB looks the same as lights that are on. The auxiliary contact proves the contactor operated. It cannot report single luminaire failures, which needs per-fitting addressing such as DALI.',
    section: '4.1',
    difficulty: 'basic',
    topic: 'Switched lighting feedback',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4002,
    question:
      'For control gear on one DALI bus, how many groups are available, and how many scenes does each driver store?',
    options: [
      '16 groups, and 16 scenes per driver',
      '64 groups, and 16 scenes per driver',
      '16 groups, and 64 scenes per driver',
      '128 groups, and 16 scenes per driver',
    ],
    correctAnswer: 0,
    explanation:
      'Control gear has 16 groups, and a driver can be in any combination of them; each driver stores 16 scenes. The 64 is the number of control gear addresses, and 128 is the total of control gear and control device addresses, so neither is a group count.',
    section: '4.1',
    difficulty: 'basic',
    topic: 'DALI groups and scenes',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4003,
    question:
      'A tenant moves a partition on an open-plan floor lit by DALI, and two former zones now need to dim as one. What does the change normally involve?',
    options: [
      'Running a new control pair between the two zones',
      'Swapping the drivers for twin-channel versions',
      'Changing the group assignments in software',
      'Adding a second bus power supply to the floor',
    ],
    correctAnswer: 2,
    explanation:
      'On DALI the grouping lives in the software, not the cable, so rezoning is done by changing groups at commissioning level. New control cables would be the answer on a 1–10 V system, where the grouping is fixed by the wiring.',
    section: '4.1',
    difficulty: 'intermediate',
    topic: 'Rezoning with DALI groups',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4004,
    question:
      'A refurbishment brings a new DALI controller into a building, but one area keeps its existing 1–10 V luminaires. How are those fittings usually brought under the controller?',
    options: [
      'Their 1–10 V control pairs are wired straight onto the DALI bus',
      'Their control pairs are changed to screened cable on a DALI output',
      'They are powered from the 24 V AUX supply defined for DALI+',
      'A DALI device that converts commands to a 1–10 V output is used',
    ],
    correctAnswer: 3,
    explanation:
      'DALI has a device type that converts its commands to a 1–10 V output, which is how existing analogue fittings are sometimes brought under a DALI controller. A 1–10 V pair is not a DALI bus, changing the cable changes nothing about the signal, and AUX supplies are not DALI devices and do not connect to the bus.',
    section: '4.1',
    difficulty: 'intermediate',
    topic: '1–10 V and DALI',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4005,
    question:
      'During a fit-out, the DALI emergency luminaires were put into inhibit while supplies were switched on and off. What must be confirmed before the building is occupied?',
    options: [
      'That every luminaire has completed a duration test while inhibited',
      'That no emergency luminaire is still in inhibit mode',
      'That inhibit has been set to clear itself at the next mains failure',
      'That the BMS gateway can switch inhibit on during a real power cut',
    ],
    correctAnswer: 1,
    explanation:
      'With inhibit received, a mains failure sends the luminaire to rest mode instead of emergency mode, so an escape route could stay dark. An inhibit sent over DALI times out after a period, but a hardwired inhibit input or a controller that keeps re-sending the command holds it in place. Inhibit is a temporary state that someone owns, and handover should confirm none is left inhibited. The BMS is not the emergency lighting’s safety path.',
    section: '4.1',
    difficulty: 'intermediate',
    topic: 'Emergency inhibit mode',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4006,
    question:
      'A refurbishment keeps an existing first-version DALI controller, and the client wants occupancy sensors from a different maker added to the bus. What is the realistic expectation?',
    options: [
      'They will work, since any DALI product shares one bus',
      'They may not work: first-version sensors were proprietary',
      'They will work once a second bus power supply is added',
      'They will work if the bus is changed to screened cable',
    ],
    correctAnswer: 1,
    explanation:
      'Under the first version of DALI, controllers, sensors and buttons were proprietary, so they generally had to come from one maker. DALI-2 added standard input device types (Parts 303 and 304) so different makers can share a bus, and even then the controller must support them. A second bus supply does nothing for compatibility and could breach the 250 mA limit. Screening is not part of the cable recommendation.',
    section: '4.1',
    difficulty: 'intermediate',
    topic: 'DALI-2 interoperability',
    category: 'Lighting, access, blinds and metering',
  },

  // ── 4.2 Daylight and presence detection ───────────────────────────────
  {
    id: 4007,
    question: 'Why is a PIR occupancy sensor described as “passive”?',
    options: [
      'It emits nothing and only receives heat radiation',
      'It needs no supply because it is powered by its lens',
      'It reports to a controller rather than switching lights',
      'It only switches lighting off and never switches it on',
    ],
    correctAnswer: 0,
    explanation:
      'Passive infrared sensors transmit nothing; they only receive the infrared given off by warm bodies. A microwave sensor is the active type, sending out a low-power radio signal. Reporting to a controller is a DALI-2 input device role, not what “passive” means.',
    section: '4.2',
    difficulty: 'basic',
    topic: 'PIR operation',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4008,
    question:
      'From 24 March 2027, the 2026 edition of Approved Document L expects fixed external lighting on new buildings to switch off automatically in daylight and when the building is not in operational use at night. Which lighting is an exception?',
    options: [
      'Any luminaire drawing more than 4 W each',
      'Lighting already on a BMS time schedule',
      'Lighting essential for safety',
      'Lighting on buildings under 1000 m²',
    ],
    correctAnswer: 2,
    explanation:
      'Paragraph 5.75 of the 2026 edition excepts lighting that is essential for safety or security, and luminaires (or groups on one sensor) drawing less than 4 W, not more. A BMS schedule is a means of control, not an exception, and the 1000 m² figure belongs to metering, not external lighting.',
    section: '4.2',
    difficulty: 'basic',
    topic: 'External lighting controls',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4009,
    question:
      'A dual-technology sensor was fitted in a small office to stop the lights coming on for people in the corridor, but they still do. The sensor is not faulty. What setting should you check?',
    options: [
      'Whether the hold time has been set below the 20 minute limit',
      'Whether the light sensor target has been set too low',
      'Whether the sensor has been put into absence detection mode',
      'Whether switch-on is set to need only one technology',
    ],
    correctAnswer: 3,
    explanation:
      'Dual technology cuts false triggering when both methods must agree before switching on. If it is set so either one can switch on, it inherits the false triggers of both, including a microwave element seeing through the wall. The hold time affects switch-off, not false switch-on.',
    section: '4.2',
    difficulty: 'intermediate',
    topic: 'Dual-technology sensors',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4010,
    question:
      'A photo-switched zone of non-dimmable lighting flicks off and back on every time a cloud passes. What is most likely missing from its set-up?',
    options: [
      'A longer occupancy hold time on the sensor',
      'A deadband between the off and on levels',
      'A DALI-2 extended fade time on each driver',
      'A constant illuminance factor',
    ],
    correctAnswer: 1,
    explanation:
      'Photo-switching needs a gap between the level at which it switches off and the level at which it switches back on, or it cycles around the threshold. Fade times only apply to dimming, and constant illuminance compensates for luminaire ageing, not daylight.',
    section: '4.2',
    difficulty: 'intermediate',
    topic: 'Photo-switching deadband',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4011,
    question:
      'On a deep-plan floor, one row of desks is 4 m from a wall with windows, and the core is 12 m from any window under a solid roof. For the LENI calculation, which area is treated as having adequate daylight for dimming credit?',
    options: [
      'Only the row of desks within 6 m of the window wall',
      'Both areas, as long as each has its own light sensor',
      'Neither area, because the floor is deep-plan overall',
      'Only the core, because it has the most stable light',
    ],
    correctAnswer: 0,
    explanation:
      'For LENI, areas within 6 m of a wall with a window, or under a roof that is at least 10% rooflights, are treated as having adequate daylight. The core meets neither test, and fitting a sensor does not create daylight. This is why the window row is usually its own control zone.',
    section: '4.2',
    difficulty: 'intermediate',
    topic: 'Daylight zones and LENI',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4012,
    question:
      'In every room one engineer commissioned, the lights go off a few seconds after people stop moving. Rooms done by a colleague with the same sensors are fine, and both followed the same hold time schedule. What is the most likely cause?',
    options: [
      'The sensors in those rooms are microwave rather than PIR',
      'Those rooms have been set to absence instead of presence',
      'The sensors were left in walk-test mode at handover',
      'The luminaires in those rooms are on the wrong DALI group',
    ],
    correctAnswer: 2,
    explanation:
      'Walk-test mode uses a very short hold time, and taking sensors out of it is an easy step to forget. A pattern that follows one engineer, with the same schedule and hardware, points at that step. Absence detection changes how lights switch on, not how quickly they go off, and a wrong group would affect which lights respond, not the timing.',
    section: '4.2',
    difficulty: 'advanced',
    topic: 'Sensor commissioning',
    category: 'Lighting, access, blinds and metering',
  },

  // ── 4.3 Access control interfaces ─────────────────────────────────────
  {
    id: 4013,
    question:
      'On an access-controlled door, which device decides whether a presented card is valid?',
    options: [
      'The card reader beside the door',
      'The door controller',
      'The BMS outstation',
      'The door position switch',
    ],
    correctAnswer: 1,
    explanation:
      'The reader reads the credential and passes it on; it does not make the decision. The door controller checks it, drives the lock and watches the door. The BMS plays no part in who may pass, and the door contact only reports whether the door is shut.',
    section: '4.3',
    difficulty: 'basic',
    topic: 'Access door components',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4014,
    question:
      'Checking a BMS points schedule, what type should almost all of the access control points be?',
    options: [
      'Inputs, because the BMS only monitors the doors',
      'Outputs, so the BMS can release doors on demand',
      'Analogue outputs, to set the lock holding current',
      'One input and one output for each controlled door',
    ],
    correctAnswer: 0,
    explanation:
      'The BMS is a window onto the access system: it monitors door held, door forced, faults and tamper. An output to a door deserves a question before it is wired, because the BMS should never be the reason a door opens.',
    section: '4.3',
    difficulty: 'basic',
    topic: 'Monitor, not control',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4015,
    question:
      'You need to isolate an access control power supply to work on it. What should you do before switching it off?',
    options: [
      'Nothing extra, because the standby battery keeps all doors working',
      'Put the access points on the BMS into hand so no alarms are logged',
      'Ask the BMS engineer to hold the locks closed through an output',
      'Tell the site, as fail-safe locks on it may release their doors',
    ],
    correctAnswer: 3,
    explanation:
      'Switching off an access power supply can unlock a set of doors, because fail-safe locks need power to hold. Find out which locks are fail-safe and tell the site first. The battery only delays release, and using a BMS output on locks puts the BMS where it should never be.',
    section: '4.3',
    difficulty: 'intermediate',
    topic: 'Fail-safe locks and isolation',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4016,
    question:
      'A large site has 150 controlled doors and the client wants their status on the BMS. Hardwired relay outputs are the only interface in the specification. What is the sensible approach?',
    options: [
      'A relay and BMS input for every alarm on every one of the doors',
      'Relays that take their supply from each lock, so wiring is shorter',
      'Summary alarms, such as any door forced in one block, per relay',
      'A single relay that changes state whenever any door is opened',
    ],
    correctAnswer: 2,
    explanation:
      'Hardwiring is limited by the number of relays and inputs, so on a large site it suits summary alarms such as “any door forced in block A”. Per-door detail is what a high-level interface is for. Picking up the lock supply brings a foreign voltage into the outstation, and one relay for every door opening carries no useful alarm meaning.',
    section: '4.3',
    difficulty: 'intermediate',
    topic: 'Hardwired interface limits',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4017,
    question:
      'During the access interface point-to-point test, you lift one wire of the door forced input and the BMS stays quiet. Opening the door without a release does raise the alarm. What does this tell you, and what follows?',
    options: [
      'The contact closes on alarm; it should be closed when healthy',
      'The interface works; a quiet BMS shows the cable is screened',
      'The BMS input is faulty and the outstation card needs changing',
      'The access engineer has the door held timer set too long',
    ],
    correctAnswer: 0,
    explanation:
      'The fail-noisy check exists for this. If lifting a wire leaves the BMS quiet, the contact sense is wrong: a cut cable would look like a healthy door. The contact should be closed when healthy and open on alarm. The input clearly works, since a real forced door is reported, and the held timer has nothing to do with a forced alarm.',
    section: '4.3',
    difficulty: 'advanced',
    topic: 'Fail-noisy contacts',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4018,
    question:
      'A specification asks for each card holder’s name and entry time to be passed to the BMS so heating can follow occupancy. The access system can supply it. What is the better course?',
    options: [
      'Pass the full records, but only over a read-only interface',
      'Raise it, and propose counts or an occupied flag per zone',
      'Pass the records, and delete them from the BMS each night',
      'Pass the records to the BMS cloud platform for analytics',
    ],
    correctAnswer: 1,
    explanation:
      'Card transactions record a named person at a place and time, which is sensitive and not needed to run plant. The BMS needs to know a zone is occupied, not who is in it, so counts or a flag by zone are enough. Read-only protects the doors but does nothing about the personal data, and pushing it to the cloud spreads it further. It is a data protection question for the client.',
    section: '4.3',
    difficulty: 'advanced',
    topic: 'Occupancy data from access',
    category: 'Lighting, access, blinds and metering',
  },

  // ── 4.4 Blinds and shading ────────────────────────────────────────────
  {
    id: 4019,
    question:
      'In the usual descriptions of BS EN ISO 52120-1, motorised blinds under automatic control sit with which building automation class?',
    options: ['Class A', 'Class B', 'Class C', 'Class D'],
    correctAnswer: 1,
    explanation:
      'Motorised blinds under manual control sit with class C, automatically controlled blinds with class B, and blinds integrated with lighting and HVAC with class A. A class A specification is asking for combined control, not just automatic blinds.',
    section: '4.4',
    difficulty: 'basic',
    topic: 'BACS classes for shading',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4020,
    question:
      'In a common blind priority order, where does a central maintenance or window cleaning command sit?',
    options: [
      'Above weather protection',
      'Below automatic sun control',
      'Level with the occupant override',
      'Just below weather protection',
    ],
    correctAnswer: 3,
    explanation:
      'A common order from highest is weather protection, then maintenance and cleaning, then occupant override, then automatic control. Maintenance outranks occupants and sun tracking, but nothing outranks weather protection.',
    section: '4.4',
    difficulty: 'basic',
    topic: 'Override priorities',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4021,
    question:
      'Which control arrangement makes it physically impossible to feed both the up and down lives of a 230 V tubular blind motor?',
    options: [
      'Two one-way switches mounted side by side on one plate',
      'Two BMS outputs with a software rule against both on',
      'A run relay feeding a changeover relay for direction',
      'Two interposing relays with a delay in the strategy',
    ],
    correctAnswer: 2,
    explanation:
      'The changeover contact can only be in one position, so whatever the controller does, only one direction can be fed. Two separate outputs rely on the program, and a welded contact or a programming slip will close both sooner or later. Two ordinary one-way switches are not an interlocked blind switch.',
    section: '4.4',
    difficulty: 'intermediate',
    topic: 'Blind motor interlocking',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4022,
    question:
      'A client wants six 230 V tubular blind motors in a boardroom to run from one up/stop/down switch. What should decide how you wire it?',
    options: [
      'The motor maker’s rules on paralleling motors',
      'The current rating of the switch against six motors',
      'The length of the cable run to the farthest motor',
      'Whether the blinds are internal or external types',
    ],
    correctAnswer: 0,
    explanation:
      'Many tubular motors must not have their direction conductors paralleled with another motor’s on one switch or relay output. The instructions will say whether a group control unit, or one output per motor, is needed. Switch rating and cable length matter, but neither makes paralleling acceptable if the maker forbids it.',
    section: '4.4',
    difficulty: 'intermediate',
    topic: 'Grouping blind motors',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4023,
    question:
      'On every bright morning, the east facade blinds come down about an hour after direct sun first reaches the windows. On overcast mornings they correctly stay up. What should you check first?',
    options: [
      'The wind sensor’s hold-off period after high wind',
      'The lower limit setting on each of the east motors',
      'The expiry time on the occupant override buttons',
      'The controller’s clock and location settings',
    ],
    correctAnswer: 3,
    explanation:
      'The solar sensor is clearly telling sun from cloud, so the part that is wrong is the calculation of where the sun is, which depends on the date, time and location being right. A consistent time offset points at those settings. Motor limits affect where a blind stops, not when it moves.',
    section: '4.4',
    difficulty: 'intermediate',
    topic: 'Sun tracking',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4024,
    question:
      'During commissioning you simulate high wind. The west facade external blinds retract, but the south facade blinds drive fully down. The shading controller shows the same wind command on both. What is the most likely fault?',
    options: [
      'The south facade wind limit has been set higher than the west',
      'The south solar sensor is outranking the wind protection',
      'The up and down conductors are reversed on the south motors',
      'An occupant override on the south facade has not yet expired',
    ],
    correctAnswer: 2,
    explanation:
      'Both facades received the same retract command, so the south motors are going the wrong way: reversed direction conductors, the commonest blind commissioning fault and the most dangerous when wind protection drives it. A higher wind limit would leave them where they were, not lower them, and weather protection outranks both sun logic and occupants.',
    section: '4.4',
    difficulty: 'advanced',
    topic: 'Direction and weather protection',
    category: 'Lighting, access, blinds and metering',
  },

  // ── 4.5 Metering and sub-metering ─────────────────────────────────────
  {
    id: 4025,
    question: 'What range of addresses can a slave meter use on a Modbus RTU serial line?',
    options: ['1 to 247', '0 to 64', '1 to 128', '0 to 255'],
    correctAnswer: 0,
    explanation:
      'Each Modbus RTU slave has its own unique address between 1 and 247, and the master polls them in turn. 64 and 128 are DALI address figures, not Modbus.',
    section: '4.5',
    difficulty: 'basic',
    topic: 'Modbus addressing',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4026,
    question: 'Where in an installation are a building’s sub-meters normally fitted?',
    options: [
      'On the supply side, just ahead of the fiscal meter',
      'Inside the supplier’s fiscal meter enclosure',
      'On the building side, at boards or outgoing ways',
      'On every final circuit at the point of use',
    ],
    correctAnswer: 2,
    explanation:
      'Everything up to and including the fiscal meter belongs to the supplier or their meter operator. Sub-meters go on the building side, after the main switch, normally at distribution boards or on the outgoing ways feeding each end use. Sub-metering does not mean a meter on every circuit.',
    section: '4.5',
    difficulty: 'basic',
    topic: 'Fiscal and sub-meters',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4027,
    question:
      'A CT-connected meter on a distribution board reads exactly half the current that a clamp meter shows, on all three phases. Power and current agree with each other on each phase. What is the likeliest cause?',
    options: [
      'One CT has been fitted facing the wrong way',
      'The pulse value at the BMS is set too low',
      'The RS-485 bus has a terminator missing',
      'The CT ratio set is lower than fitted',
    ],
    correctAnswer: 3,
    explanation:
      'An even, fixed error on every phase points at the CT ratio setting: a meter told it has 200:5 CTs when 400:5 are fitted reads half the real current. A reversed CT affects one phase’s power, not all three currents, and pulse value or bus termination affect how readings reach the BMS, not what the meter itself measures.',
    section: '4.5',
    difficulty: 'intermediate',
    topic: 'CT ratio setting',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4028,
    question:
      'A pulse meter’s BMS total under-reads against the meter register by an amount that varies, and the gap is worst during busy periods. The pulse value matches. What should you check?',
    options: [
      'That the meter’s CTs are paired with their own phases',
      'That the pulse is on an input set up to count pulses',
      'That the meter has a unique Modbus address on the bus',
      'That the CT secondary has a shorting link fitted',
    ],
    correctAnswer: 1,
    explanation:
      'An ordinary digital input that is only scanned now and then can miss short pulses, so the total quietly under-reads, and more so when pulses come quickly. A wrong pulse value would give a fixed ratio, which has been ruled out. Addresses and CT pairing do not affect a pulse count.',
    section: '4.5',
    difficulty: 'intermediate',
    topic: 'Pulse counting inputs',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4029,
    question:
      'Rerouting containment in a plant room serving a communal heating network, you find a heat meter calculator in the way. What should happen before it is moved?',
    options: [
      'Nothing special, as heat meters are only used for BMS trends',
      'Its M-Bus address must be reset to the factory default first',
      'The network operator must know, as it may be a regulated device',
      'Its flow sensor should be swapped to a pulse type at the same time',
    ],
    correctAnswer: 2,
    explanation:
      'Heat meters on heat networks fall under the Heat Network (Metering and Billing) Regulations 2014, and the duties sit with the heat supplier. A meter there may be a regulated device, so do not move, swap or disconnect one without the operator knowing. Resetting its address would break its reading on the bus.',
    section: '4.5',
    difficulty: 'intermediate',
    topic: 'Heat network meters',
    category: 'Lighting, access, blinds and metering',
  },
  {
    id: 4030,
    question:
      'At handover of a new single-tenant office in England, the electricity sub-meters together record only about 60% of what the main meter recorded over the same week. Each sub-meter has been proved against its own display. What is the right view?',
    options: [
      'A large gap needs explaining, as a big load is not on any meter',
      'Normal, because sub-meters always read below the main meter',
      'The main meter is over-reading and the supplier should be called',
      'Acceptable, as long as the sub-meter total is not above the main',
    ],
    correctAnswer: 0,
    explanation:
      'A total a little below the main meter can be normal, since small loads may be unmetered, but a large unexplained gap means something significant is not on any meter. It also falls well short of the expectation that at least 90% of each fuel’s yearly use can be attributed to an end use. Blaming the fiscal meter first is the expensive mistake.',
    section: '4.5',
    difficulty: 'advanced',
    topic: 'Meter tree reconciliation',
    category: 'Lighting, access, blinds and metering',
  },
];
