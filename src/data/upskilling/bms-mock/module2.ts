import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule2: StandardMockQuestion[] = [
  {
    id: 2001,
    question:
      'A heating zone on the head end shows an “occupied setpoint” beside its room temperature, but you cannot find a terminal for it anywhere on the outstation. Why?',
    options: [
      'It is wired through an expansion module elsewhere',
      'It is a soft point held only in the software',
      'It is a pulse input totalled by the outstation',
      'It is a digital input wired back from the room',
    ],
    correctAnswer: 1,
    explanation:
      'Setpoints, calculated values, timers and values read across a network are soft (internal or virtual) points. They appear on the head end like wired points but never touch a terminal. An expansion module would still give the point a physical terminal, so hunting for one wastes time when the value only exists in the controller’s software.',
    section: '2.1',
    difficulty: 'basic',
    topic: 'Hardware and soft points',
    category: 'Field devices and signals',
  },
  {
    id: 2002,
    question:
      'A duct static pressure transmitter ranged 0 to 500 Pa on 4–20 mA is sending 16 mA. What pressure should the head end show?',
    options: ['400 Pa', '250 Pa', '375 Pa', '300 Pa'],
    correctAnswer: 2,
    explanation:
      'Take off the 4 mA live zero: 16 minus 4 is 12 mA. Divide by the 16 mA span: 12 ÷ 16 is 75 % of range, and 75 % of 500 Pa is 375 Pa. 400 Pa comes from treating 16 mA as sixteen-twentieths of range, and 300 Pa from removing the 4 mA but still dividing by 20 instead of the 16 mA span.',
    section: '2.1',
    difficulty: 'intermediate',
    topic: 'Scaling 4–20 mA',
    category: 'Field devices and signals',
  },
  {
    id: 2003,
    question:
      'The head end shows a supply fan’s run status on while its start command is off. What does that pattern usually point to?',
    options: [
      'Someone has put the fan in Hand at the starter',
      'The status input has been scaled incorrectly',
      'The network link to the head end has dropped',
      'The fan has failed to start on its last command',
    ],
    correctAnswer: 0,
    explanation:
      'The outstation compares command and status both ways. Command on with no status is a fail to start; status on with the command off usually means the plant has been put in Hand, so it is running with the BMS out of the circuit. A digital status is not scaled, and a failed start would show the opposite pattern: command on, status off.',
    section: '2.1',
    difficulty: 'intermediate',
    topic: 'Command and status',
    category: 'Field devices and signals',
  },
  {
    id: 2004,
    question:
      'A week after a gas meter pulse input is commissioned, the BMS total has risen ten times faster than the meter’s own register. What is the most likely cause?',
    options: [
      'The pulse contact is normally closed, not open',
      'The input needs a 4–20 mA live zero to count',
      'The meter’s contact is wet rather than volt-free',
      'The pulse value set in the BMS is wrong',
    ],
    correctAnswer: 3,
    explanation:
      'The outstation counts pulses and multiplies by the pulse value, the amount each pulse represents, which has to be set to match the meter. A steady factor-of-ten error is the signature of a wrong pulse value. A pulse input is a digital input, so a live zero does not apply, and a wet contact would give damage or erratic counting rather than a clean multiple.',
    section: '2.1',
    difficulty: 'intermediate',
    topic: 'Pulse inputs',
    category: 'Field devices and signals',
  },
  {
    id: 2005,
    question:
      'A strategy must raise an alarm when an air handling unit fails or is isolated. The panel drawing feeds the outstation from that unit’s own starter control circuit. What is the right judgement?',
    options: [
      'It is acceptable, because the outstation logs its own loss of supply',
      'It needs querying, as the controller dies with the plant it watches',
      'It is required, because Section 557 says the supplies must be shared',
      'It is acceptable, provided the inputs are isolated by optocouplers',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 557 allows an auxiliary circuit’s supply to be dependent on, or independent of, the main circuit according to its function. A controller that must report the plant failing generally cannot share that plant’s supply, because it goes dark at the very moment it is needed. Section 557 does not require sharing, and input isolation protects against transients, not loss of supply.',
    section: '2.1',
    difficulty: 'advanced',
    topic: 'Fail-safe supplies',
    category: 'Field devices and signals',
  },
  {
    id: 2006,
    question: 'What happens to the resistance of a PT1000 element as its temperature rises?',
    options: [
      'It rises steadily, by about 3.85 Ω per °C',
      'It falls sharply, along a curved response',
      'It rises sharply, along a curved response',
      'It falls steadily, by about 0.385 Ω per °C',
    ],
    correctAnswer: 0,
    explanation:
      'Platinum sensors have a positive, close to linear response: a PT1000 is 1000 Ω at 0 °C and rises by about 3.85 Ω per °C (a PT100 by about 0.385 Ω per °C). A falling, strongly curved response is the NTC thermistor, which works the opposite way round.',
    section: '2.2',
    difficulty: 'basic',
    topic: 'Platinum resistance sensors',
    category: 'Field devices and signals',
  },
  {
    id: 2007,
    question:
      'A PT1000 immersion sensor on a heating flow suddenly reads far hotter than the boiler could ever make the water. Which fault fits best?',
    options: [
      'The two sensor cores have shorted to each other',
      'The sensor has slipped partly out of its pocket',
      'A core has broken, so the input is open circuit',
      'The cable run has been extended by several metres',
    ],
    correctAnswer: 2,
    explanation:
      'A platinum sensor’s resistance rises with temperature, so an open circuit looks like a huge resistance and reads as extreme heat. A short reads as extreme cold, the reverse of a thermistor. A sensor out of its pocket reads towards the surrounding air, and a little extra cable on a PT1000 adds only a small warm offset, not an impossible value.',
    section: '2.2',
    difficulty: 'intermediate',
    topic: 'Sensor fault signatures',
    category: 'Field devices and signals',
  },
  {
    id: 2008,
    question:
      'A duct humidity sensor sits a short way downstream of a humidifier. The humidifier keeps shutting off while the space is still dry. What is the likely cause?',
    options: [
      'The sensor needs a separate temperature element',
      'The duct needs an averaging humidity sensor',
      'The humidifier is oversized for the duct',
      'The sensor is reading carried-over droplets',
    ],
    correctAnswer: 3,
    explanation:
      'Downstream of a humidifier the sensor must measure moisture held in the air, not spray carried over from the humidifier. Too close, it reads the droplets as high humidity and shuts the humidifier off early. It needs siting where any carry-over has been absorbed. Humidity sensors already include a temperature element, and an averaging sensor at the same spot would still see the spray.',
    section: '2.2',
    difficulty: 'intermediate',
    topic: 'Humidity sensors',
    category: 'Field devices and signals',
  },
  {
    id: 2009,
    question: 'Which of these field devices needs a supply as well as its signal cores?',
    options: [
      'A two-wire NTC room thermistor',
      'A three-wire PT100 pipe sensor',
      'A duct-mounted CO2 sensor',
      'A four-wire PT1000 duct sensor',
    ],
    correctAnswer: 2,
    explanation:
      'A CO2 sensor contains electronics, so it is an active transmitter that needs its own supply and sends a scaled 0–10 V or 4–20 mA signal. Thermistors and platinum sensors are passive resistive elements with no supply: the extra cores on three- and four-wire platinum sensors are there to deal with lead resistance, not to power them.',
    section: '2.2',
    difficulty: 'basic',
    topic: 'Passive and active sensors',
    category: 'Field devices and signals',
  },
  {
    id: 2010,
    question: 'What does a three-port diverting valve do?',
    options: [
      'Blends two incoming flows into one outlet',
      'Sends part of one inlet flow round the load',
      'Throttles the only path, so system flow falls',
      'Switches one coil between hot and chilled',
    ],
    correctAnswer: 1,
    explanation:
      'A diverting valve has one inlet and two outlets, and controls the load by sending part of the incoming flow round it instead of through it. Blending two inlets into one outlet is a mixing valve, throttling is a two-port valve, and switching a coil between hot and chilled circuits is a six-way valve.',
    section: '2.3',
    difficulty: 'basic',
    topic: 'Valve circuits',
    category: 'Field devices and signals',
  },
  {
    id: 2011,
    question:
      'A fan coil with a PICV warms up although its valve shows 0%. A colleague suggests turning the PICV pre-setting down until the coil stays cold. What should happen instead?',
    options: [
      'Prove the actuator truly closes, then report it',
      'Turn the pre-setting down, as it limits the flow',
      'Set the actuator to reverse acting and retest',
      'Raise the pump speed so the valve seats firmly',
    ],
    correctAnswer: 0,
    explanation:
      'Heat with the valve at 0% is let-by. Command it shut, check the actuator reaches its end stop and the stem has fully travelled, and report it if the coil still warms. The pre-setting is the commissioning engineer’s maximum-flow setting and is left alone. More pump pressure raises the differential across the valve, which makes closing it harder, not easier.',
    section: '2.3',
    difficulty: 'intermediate',
    topic: 'Let-by and PICVs',
    category: 'Field devices and signals',
  },
  {
    id: 2012,
    question:
      'A heating valve has a 3-point actuator with no position feedback. Over several weeks the room control drifts, as if the valve is not where the BMS thinks it is. Why can this happen?',
    options: [
      'A 0–10 V signal loses accuracy on long cables',
      'The spring return has slowly lost its tension',
      'The valve authority rises as the valve wears',
      'Position is estimated from drive time alone',
    ],
    correctAnswer: 3,
    explanation:
      'A 3-point actuator is pulsed open or closed by two digital outputs, and the outstation estimates position from how long it has driven each way. That estimate drifts unless the actuator is driven to an end stop now and then or has position feedback. There is no 0–10 V signal on a 3-point actuator, and spring return only acts on loss of power.',
    section: '2.3',
    difficulty: 'intermediate',
    topic: '3-point actuators',
    category: 'Field devices and signals',
  },
  {
    id: 2013,
    question:
      'A heating loop sits cold. The head end shows the valve commanded to 30%, but the spindle does not move as the command changes. The controls engineer wants to retune the loop. What should you check first?',
    options: [
      'Whether the valve is oversized for the circuit',
      'Whether the actuator is left in manual override',
      'Whether the PICV pre-setting has been moved',
      'Whether the outstation needs a larger output card',
    ],
    correctAnswer: 1,
    explanation:
      'An actuator declutched for a fault or a flush and never re-engaged ignores every BMS command, while the head end carries on showing the commanded position. When a loop will not respond, check each actuator for override before anyone changes software. An oversized valve still moves, just with poor control, and a pre-setting limits maximum flow rather than stopping the spindle.',
    section: '2.3',
    difficulty: 'advanced',
    topic: 'Manual override',
    category: 'Field devices and signals',
  },
  {
    id: 2014,
    question:
      'A space is heated by ceiling radiant panels. What type of sensor is normally used to control them?',
    options: [
      'A standard wall air sensor at about 1.5 m',
      'A black bulb sensor in sight of a panel',
      'A surface sensor clamped to the panel itself',
      'A duct sensor in the extract air from the space',
    ],
    correctAnswer: 1,
    explanation:
      'Radiant panels warm people and surfaces more than the air, so a radiant (black bulb) sensor with a line of sight to the panel is used, though not placed right beside a radiant source. An air sensor misses the radiant effect, a sensor on the panel reads the panel, and extract air reflects the air, not the radiant comfort.',
    section: '2.4',
    difficulty: 'intermediate',
    topic: 'Radiant heating sensors',
    category: 'Field devices and signals',
  },
  {
    id: 2015,
    question:
      'An outside air sensor has been fixed on the wall just above an extract louvre. What effect is that most likely to have on the building?',
    options: [
      'Heating is under-driven, because outside reads too warm',
      'Frost protection runs too often, as outside reads cold',
      'Compensation is unaffected, as it uses flow temperature',
      'Only the trend log is affected, not the plant control',
    ],
    correctAnswer: 0,
    explanation:
      'Warm air leaving the louvre rises past the sensor, so the BMS thinks it is a milder day than it is. One outside reading often sets the heating curve, frost protection and optimum start for the whole building, so the building is under-heated and frost protection is delayed. Weather compensation is driven by the outside reading, so it is directly affected.',
    section: '2.4',
    difficulty: 'intermediate',
    topic: 'Outdoor sensor siting',
    category: 'Field devices and signals',
  },
  {
    id: 2016,
    question:
      'A room sensor on a bare concrete column lags behind the air temperature in the mornings and reads low through the winter. Its cable route is sealed. What is the fix?',
    options: [
      'Apply a fixed offset in the outstation',
      'Change the sensor for a PT1000 type',
      'Raise the setpoint to compensate',
      'Mount it on an insulated backing',
    ],
    correctAnswer: 3,
    explanation:
      'On a solid concrete or steel surface the sensor reads the mass of the wall rather than the air, so it needs a thermally insulated backing. An offset or a raised setpoint only suits a steady error, and this one moves with the weather and the time of day. Changing the element type does nothing about what the sensor is touching.',
    section: '2.4',
    difficulty: 'intermediate',
    topic: 'Room sensor installation',
    category: 'Field devices and signals',
  },
  {
    id: 2017,
    question:
      'On three maintenance visits, a well-sited duct sensor’s as-found error was 0.3 °C, then 0.8 °C, then 1.6 °C, each time corrected with an offset. What is the sensible conclusion?',
    options: [
      'It is fine, because the offset brings it back each time',
      'It is drifting faster each visit and likely to fail',
      'It is badly sited, so it should be moved in the duct',
      'It shows the reference instrument needs recalibrating',
    ],
    correctAnswer: 1,
    explanation:
      'Recording as-found and as-left is what makes this visible: comparing as-found values over visits shows how fast a sensor is drifting, and one that drifts more each time is usually heading for failure. An offset is for a steady error on a well-sited sensor, not a growing one. Moving a well-sited sensor solves nothing.',
    section: '2.4',
    difficulty: 'advanced',
    topic: 'Calibration records',
    category: 'Field devices and signals',
  },
  {
    id: 2018,
    question:
      'A boiler has its own stand-alone compensator that is not on the BMS network. How does the BMS usually control it?',
    options: [
      'Enables it from a digital output on a schedule',
      'Writes new setpoints to it over the network',
      'Drives its burner directly with an analogue output',
      'Replaces its control loop with a BMS PID block',
    ],
    correctAnswer: 0,
    explanation:
      'A stand-alone controller is set up for its application and left to run. The BMS typically enables it with a digital output on a time schedule and may read back a run or fault contact: the BMS decides when, the packaged controls decide how. With no network connection there is nothing to write setpoints to.',
    section: '2.5',
    difficulty: 'basic',
    topic: 'Controller types',
    category: 'Field devices and signals',
  },
  {
    id: 2019,
    question:
      'Two digital output channels share one common terminal. One is to switch a 24 V interposing relay coil, the other a 230 V relay coil. What should happen?',
    options: [
      'Wire both, as the common only carries return current',
      'Fuse the common at the lower of the two coil ratings',
      'Use different commons, changing the schedule first',
      'Feed the common from mains and step the relay down',
    ],
    correctAnswer: 2,
    explanation:
      'Channels on one common share whatever supply is on it. Two channels needing different supplies need different commons, and the points schedule should be changed before you wire. Mixing them puts one supply where the other was expected, with results from a dead relay to a damaged controller, and it brings mains onto a terminal block that carries SELV or PELV wiring. A fuse does nothing about the wrong voltage reaching a coil.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Output commons',
    category: 'Field devices and signals',
  },
  {
    id: 2020,
    question:
      'A BMS is specified to integrate other building services and grow later. Roughly how much controller I/O does industry guidance suggest leaving spare?',
    options: ['About 5%', 'About 10–20%', 'About 50%', 'About 20–30%'],
    correctAnswer: 3,
    explanation:
      'Industry guidance on delivering BEMS projects suggests roughly 10–20% spare I/O on a basic system and roughly 20–30% where the system is expected to integrate other services and grow. 10–20% is the basic-system figure, so it undershoots here. Spare channels also need panel space and spare terminals to be useful.',
    section: '2.5',
    difficulty: 'basic',
    topic: 'Spare I/O',
    category: 'Field devices and signals',
  },
  {
    id: 2021,
    question:
      'Field cables that land on an outstation need insulation resistance testing. What should happen first?',
    options: [
      'Disconnect them, or follow the maker’s instructions',
      'Test them connected, as inputs are optically isolated',
      'Test at 250 V connected, as that suits electronics',
      'Link every input to earth to protect the electronics',
    ],
    correctAnswer: 0,
    explanation:
      'Outstation inputs and outputs are electronics, so disconnect the field cables or follow the manufacturer’s instructions before testing. Optocouplers protect against transients, not a test voltage. A lower test voltage still reaches the electronics, and linking inputs to earth is not a method any manufacturer gives.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Insulation testing outstation cabling',
    category: 'Field devices and signals',
  },
  {
    id: 2022,
    question: 'On a screened twisted pair, what does the earthed screen mainly deal with?',
    options: [
      'Electric-field (capacitive) pick-up',
      'Magnetic-field (inductive) pick-up',
      'Voltage lost along the cable cores',
      'Resistance added by long cable runs',
    ],
    correctAnswer: 0,
    explanation:
      'The earthed screen intercepts electric-field coupling and gives it a path to earth instead of into the signal cores. Screening does little against magnetic fields; the twist handles those by cancelling the voltage induced in each small loop. Neither the screen nor the twist changes voltage drop or cable resistance.',
    section: '2.6',
    difficulty: 'basic',
    topic: 'Screens and twisting',
    category: 'Field devices and signals',
  },
  {
    id: 2023,
    question:
      'An outside air temperature transmitter ranged −20 to +40 °C on 4–20 mA is sending 16 mA. What temperature does that represent?',
    options: ['+30 °C', '+25 °C', '+28 °C', '+16 °C'],
    correctAnswer: 1,
    explanation:
      '(16 − 4) ÷ 16 is 75 % of range. The span is 60 degrees, so 75 % is 45 degrees above the bottom of −20 °C: +25 °C. +28 °C comes from dividing 16 by 20 and forgetting the live zero, and +30 °C from taking 75 % of the top figure rather than of the whole span.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Scaling with an offset range',
    category: 'Field devices and signals',
  },
  {
    id: 2024,
    question:
      'In an outstation panel you find a 250 Ω resistor across the terminals of a voltage input that has a 4–20 mA sensor on it. What should you do?',
    options: [
      'Remove it, as it will load the sensor down',
      'Move it in series with the loop instead',
      'Replace it with a link to cut the losses',
      'Leave it, as it turns current into volts',
    ],
    correctAnswer: 3,
    explanation:
      'A current input is often read as the voltage across a precision resistor, and 250 Ω turns 4–20 mA into 1–5 V so a voltage input can accept the loop. It is part of the measurement, not a forgotten component. Removing it or linking it out leaves the input with no voltage that represents the signal.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Current loops',
    category: 'Field devices and signals',
  },
  {
    id: 2025,
    question:
      'A local indicator and a long extra run of thin cable were added to an existing loop-powered 4–20 mA pressure loop. It now reads correctly at low pressure but goes wrong near the top of the range. What is the likely cause?',
    options: [
      'The screen has been earthed at both ends',
      'The live zero has shifted up to 8 mA',
      'The transmitter is short of loop voltage',
      'The indicator has reversed the polarity',
    ],
    correctAnswer: 2,
    explanation:
      'A loop-powered transmitter needs a minimum voltage across its terminals. Every device and length of cable in series takes some of the available voltage, and more so as the current rises towards 20 mA, so the transmitter is starved near the top of the scale. That voltage budget is the controls engineer’s check. An earth loop gives noise across the range, and reversed polarity would stop the loop working at all.',
    section: '2.6',
    difficulty: 'advanced',
    topic: 'Loop voltage budget',
    category: 'Field devices and signals',
  },
  {
    id: 2026,
    question:
      'A BMS analogue sensor cable has to cross the route of a drive’s motor output cable. What is the best way to do it?',
    options: [
      'Cross at right angles, then keep them apart',
      'Run alongside it in the same tray for support',
      'Cable-tie it to the drive cable to fix the gap',
      'Share the drive cable’s steel conduit briefly',
    ],
    correctAnswer: 0,
    explanation:
      'Coupling is weakest with distance and with the least length running side by side, so crossing at right angles keeps it small. Long parallel runs in the same tray are the worst case, and drive output cables are a well-known source of noise. The drive’s steel conduit is there to contain its noise, not to share with a signal cable.',
    section: '2.6',
    difficulty: 'basic',
    topic: 'Cable routing',
    category: 'Field devices and signals',
  },
  {
    id: 2027,
    question:
      'A fan starter selector is turned to Off before work on the motor terminals. Is that enough?',
    options: [
      'Yes, Off removes the supply from the motor',
      'Yes, provided the BMS command is also off',
      'Only if the BMS run status also shows off',
      'No, isolate, lock off and prove dead first',
    ],
    correctAnswer: 3,
    explanation:
      'Off only breaks the contactor coil circuit, so the contactor drops out, but the main contacts, the motor terminals and the control circuit may all still be live. It is not isolation. Before working on the motor or starter, isolate at the proper point, lock it off and prove dead. A BMS command or status says nothing about whether conductors are live.',
    section: '2.7',
    difficulty: 'basic',
    topic: 'Hand/Off/Auto',
    category: 'Field devices and signals',
  },
  {
    id: 2028,
    question:
      'A transistor digital output driving a DC interposing relay coil has failed twice in a month. The relay base has no built-in suppression. What is the most likely cause and fix?',
    options: [
      'Coil draws too much current; fit a larger relay',
      'Coil switch-off spikes; fit a suppression diode',
      'Earth loop on the screen; earth it at one end',
      'Coil supply too low; feed it from the mains',
    ],
    correctAnswer: 1,
    explanation:
      'When a DC coil de-energises, its collapsing magnetic field can produce a spike of hundreds of volts that destroys the transistor switching it. A diode across the coil, fitted the opposite way to the supply so it only conducts on the spike, prevents it. A larger relay usually has a larger coil, and putting mains on an outstation output is exactly what the interposing relay exists to avoid.',
    section: '2.7',
    difficulty: 'advanced',
    topic: 'Interposing relays',
    category: 'Field devices and signals',
  },
  {
    id: 2029,
    question:
      'A supply fan drive takes its run command, speed and diagnostics over Modbus. What should still be provided separately?',
    options: [
      'A 0–10 V speed reference wired as a backup',
      'A contactor auxiliary contact for run status',
      'Hard-wired stops and a set comms-loss action',
      'A second Modbus link to carry the fault code',
    ],
    correctAnswer: 2,
    explanation:
      'A network can carry the run command, speed, actual speed, current and fault codes over far fewer wires, but a comms failure can then stop the plant. The drive needs a deliberately chosen behaviour on loss of comms, and emergency and fire stops still go to hard-wired terminals that act whatever the network is doing. The fault code already travels over Modbus.',
    section: '2.7',
    difficulty: 'intermediate',
    topic: 'Networked drives',
    category: 'Field devices and signals',
  },
  {
    id: 2030,
    question:
      'In Auto, a direct-on-line fan with no seal-in contact in its Auto leg starts and drops out straight away every morning. The BMS digital output is set to pulse for one second. What is wrong?',
    options: [
      'The output should be maintained, not pulsed',
      'The overload is set below the motor current',
      'The Auto leg needs a seal-in contact adding',
      'The fan needs a star-delta starter instead',
    ],
    correctAnswer: 0,
    explanation:
      'In Auto the BMS command is normally a maintained contact, closed for as long as the plant should run; open it and the contactor drops out. A pulsed output only suits a panel designed for pulsed start and stop. Adding a seal-in would leave the BMS unable to stop the fan, and an overload trip would need a reset rather than restarting every morning.',
    section: '2.7',
    difficulty: 'intermediate',
    topic: 'Starter interface',
    category: 'Field devices and signals',
  },
];
