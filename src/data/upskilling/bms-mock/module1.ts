import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule1: StandardMockQuestion[] = [
  // ── 1.1 What a building management system is ──────────────────────────
  {
    id: 1001,
    question: 'Which of these sits at the automation level of a BMS?',
    options: [
      'A current relay fitted inside a fan motor starter',
      'A web interface that staff use to change the schedules',
      'A plant controller running the boiler house strategy',
      'A pressure switch fitted across an AHU filter bank',
    ],
    correctAnswer: 2,
    explanation:
      'The automation level is where decisions are made: the outstations and plant controllers that read inputs, run the strategy and drive outputs. The current relay and the filter pressure switch touch the plant, so they are field devices. The web interface is tempting because it is where settings change, but it is the management level: it sends settings down, it does not do the controlling.',
    section: '1.1',
    difficulty: 'basic',
    topic: 'Three levels of a BMS',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1002,
    question:
      'The BMS sends a varying speed reference to the drive on a supply fan. What type of point is that?',
    options: [
      'An analogue output to the drive',
      'A digital input from the drive',
      'An analogue input from the drive',
      'A digital output to the drive',
    ],
    correctAnswer: 0,
    explanation:
      'A varying command sent out from the BMS is an analogue output, in the same family as a valve or damper position. A digital output is tempting because it also goes out to the plant, but it is only an on/off command such as start or enable. Inputs come into the BMS from the plant, not the other way.',
    section: '1.1',
    difficulty: 'basic',
    topic: 'Point types',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1003,
    question:
      'A packaged chiller has its own controller that is not on the BMS network. The BMS enables it from a digital output and reads a fault contact. The facilities manager wants its refrigerant pressures on the graphics. What is the position?',
    options: [
      'The values already sit in the outstation and just need adding to the graphic',
      'The head end can poll the chiller controller for them over the BMS network',
      'The fault contact can be rescaled in the outstation to show each pressure',
      'The BMS only sees what is wired to it, so those values are not available',
    ],
    correctAnswer: 3,
    explanation:
      'A stand-alone controller is not on the BMS network, so the BMS only gets the enable it sends and the status or fault signals wired back; it does not see inside the plant. Polling over the network is tempting, but the chiller is not on that network. A fault contact is an on/off digital input and cannot carry a varying value.',
    section: '1.1',
    difficulty: 'intermediate',
    topic: 'Stand-alone controllers',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1004,
    question:
      'Readings from a heat meter reach the outstation over a data bus rather than on terminals. How should they be treated on the job?',
    options: [
      'As spare capacity, because no outstation terminal is used for them',
      'As network points, which count and need checking like any other',
      'As hardwired analogue inputs, each needing its own cable test',
      'As head-end data, which is left off the points schedule altogether',
    ],
    correctAnswer: 1,
    explanation:
      'Values that arrive over a data connection are network (integration or virtual) points. They count as points and need checking just the same: configuration, and a check that the value is the right one. Calling them spare capacity confuses points with terminals; spare terminals are capacity, but these values are configured data the system relies on.',
    section: '1.1',
    difficulty: 'intermediate',
    topic: 'Network points',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1005,
    question:
      'One of six outstations in an office fails overnight. In the morning AHU 2 has stopped, but the boilers and the other AHUs are running normally. The facilities manager asks whether the whole BMS is about to fail. What is the accurate answer?',
    options: [
      'Yes, because one failed outstation soon stops the network',
      'No; control is spread out, so only its own plant is hit',
      'Yes, because the head end now has no route to the boilers',
      'No, because the head end has taken over AHU 2’s control',
    ],
    correctAnswer: 1,
    explanation:
      'Each outstation holds its own strategy, so control is distributed and a failed outstation affects only the plant wired to it. The other outstations carry on. The head end is not in the control path: it cannot take over AHU 2, and the boilers do not depend on it to run.',
    section: '1.1',
    difficulty: 'advanced',
    topic: 'Distributed control',
    category: 'What a BMS is, and the rules around it',
  },

  // ── 1.2 What a BMS controls and connects to ────────────────────────────
  {
    id: 1006,
    question:
      'Which of these is normally enabled and supervised by the BMS, rather than controlled directly or only monitored?',
    options: [
      'A fan coil unit with its own unitary controller',
      'A packaged heat pump with its own controller',
      'An intruder alarm panel reporting set and unset',
      'A gas meter sending pulses to a digital input',
    ],
    correctAnswer: 1,
    explanation:
      'Packaged boilers, chillers and heat pumps keep their own controllers: the BMS says when, the plant decides how. A fan coil unit is usually controlled directly by its small controller on the BMS network. The intruder alarm is monitor-only, and the gas meter is read for data.',
    section: '1.2',
    difficulty: 'basic',
    topic: 'Control or monitor',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1007,
    question:
      'Why are volt-free contacts used for signals between a BMS and another contractor’s system?',
    options: [
      'They can carry enough current to start plant motors directly',
      'They let the BMS power the other system’s control circuits',
      'They remove the need for any separate proof of running signal',
      'They let one system signal the other without joining supplies',
    ],
    correctAnswer: 3,
    explanation:
      'The two systems usually run at different voltages and come from different contractors. A volt-free contact lets one signal the other without connecting their supplies together. It does not make isolation simpler, because the contact still carries whichever system’s voltage is wired across it. It does not power the other system, and a command still needs a separate proof of running.',
    section: '1.2',
    difficulty: 'basic',
    topic: 'Volt-free interfaces',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1008,
    question:
      'A DALI lighting system reports to the BMS, including the emergency fittings and their test results. What part does the BMS play in the emergency lighting working?',
    options: [
      'None; it may monitor fittings and tests, but they do not rely on it',
      'It feeds the emergency fittings from the outstation’s own UPS supply',
      'It switches the emergency fittings on when it detects a mains failure',
      'It has to run the tests, or the emergency fittings will not operate',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting sits apart, with its own supply and its own testing regime. The BMS, or a DALI system reporting to it, may monitor the fittings and their test results but plays no part in making them work. Switching them on at mains failure is tempting, but that would make a safety system depend on the BMS.',
    section: '1.2',
    difficulty: 'intermediate',
    topic: 'Emergency lighting',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1009,
    question:
      'The external blinds on a south façade stay up through bright afternoons and the offices behind them overheat. The wind sensor is wired and working. Which commissioning fault is a common cause?',
    options: [
      'The blinds are being retracted by a high-wind signal',
      'The blind motors need a data link rather than outputs',
      'The solar sensor serving that zone is on another façade',
      'The occupancy detectors are overriding the blind control',
    ],
    correctAnswer: 2,
    explanation:
      'Solar sensors have to be on the façade of the zone they serve. A sensor on the north wall telling the south blinds what to do is a common commissioning fault, and the blinds never see the sun. A high-wind retract is tempting, but the wind sensor is working and a wind retract would not follow the sun. Outputs or a data link can both drive blinds.',
    section: '1.2',
    difficulty: 'intermediate',
    topic: 'Blinds and shading',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1010,
    question:
      'The BMS sheds low-priority loads to stay under a demand limit. On a busy afternoon one load in the shed group was kept off so long that it caused a problem for the occupants. Which setting deals with this while keeping the load in the scheme?',
    options: [
      'A lower demand limit, so that shedding starts earlier in the interval',
      'A minimum time on for each of the other loads in the shed group',
      'Removing that load’s meter from the demand prediction altogether',
      'A maximum time off for that load, after which it is restored',
    ],
    correctAnswer: 3,
    explanation:
      'Each shed load can be given a maximum time off and a minimum time on, so nothing is left off long enough to cause a problem. A maximum time off on the affected load is the direct fix. A lower demand limit is tempting but would shed more often and make the problem worse. A minimum time on for the other loads does not limit how long this one stays off.',
    section: '1.2',
    difficulty: 'advanced',
    topic: 'Load shedding',
    category: 'What a BMS is, and the rules around it',
  },

  // ── 1.3 Why buildings have one ─────────────────────────────────────────
  {
    id: 1011,
    question: 'Which list gives the four reasons a client pays for a BMS?',
    options: [
      'Comfort, energy, maintenance and compliance',
      'Comfort, security, fire safety and energy use',
      'Energy, lighting, access control and compliance',
      'Maintenance, fire safety, lifts and comfort',
    ],
    correctAnswer: 0,
    explanation:
      'A building has a BMS for comfort, energy, maintenance and compliance, and one set of controls serves all four. Fire safety, lifts and access are systems the BMS may watch, but they act on their own; they are not reasons the BMS exists.',
    section: '1.3',
    difficulty: 'basic',
    topic: 'The four reasons',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1012,
    question:
      'A meeting room’s ventilation currently follows presence detection. The designer wants it to follow CO2 sensors instead. Which change is that?',
    options: [
      'From schedule-driven control to occupancy-driven control',
      'From demand-driven control to schedule-driven control',
      'From occupancy-driven control to demand-driven control',
      'From Class A ventilation control down to Class B',
    ],
    correctAnswer: 2,
    explanation:
      'Presence detection is occupancy-driven; CO2 or air quality sensing is demand-driven, which measures what the room actually needs. In BS EN ISO 52120-1 terms that is a step from the Class B approach to the Class A approach, so “Class A down to Class B” has the direction backwards. A fixed time programme is the schedule-driven approach.',
    section: '1.3',
    difficulty: 'intermediate',
    topic: 'Ventilation control',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1013,
    question:
      'On a mild spring day the heating flow temperature is just as high as it is in January. Which control function is most likely missing or not working?',
    options: [
      'Duty rotation',
      'Weather compensation',
      'Holiday programme',
      'Run-hour totalisation',
    ],
    correctAnswer: 1,
    explanation:
      'Weather compensation lowers the heating flow temperature as it gets milder outside, and Approved Document L asks for it where appropriate and technically feasible. A holiday programme is tempting because it also saves energy, but it decides when the plant runs, not how hot the flow is.',
    section: '1.3',
    difficulty: 'intermediate',
    topic: 'Where energy is wasted',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1014,
    question:
      'Staff say an office is always cold, but the BMS shows the zone at setpoint. The room sensor is fixed on the wall directly above a radiator. What is the sound first step?',
    options: [
      'Raise the zone setpoint a few degrees until the complaints stop',
      'Extend the heating time programme for that zone into the evening',
      'Ask for the boiler controls on the central plant to be replaced',
      'Check the sensor against a calibrated thermometer and its siting',
    ],
    correctAnswer: 3,
    explanation:
      'A sensor above a heat source reads the radiator, not the room. Compare it with a calibrated thermometer at desk height and look at where it is fixed; if it is badly sited, it is the sensor that should move. Raising the setpoint is tempting but only moves the complaint: the room will overheat when conditions change.',
    section: '1.3',
    difficulty: 'intermediate',
    topic: 'Comfort complaints',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1015,
    question:
      'You are pricing lighting work. In the plant room two pumps and an AHU are switched to Hand at the BMS panel, a timeclock has been added to run the heating, and the head end has been unplugged for years. The client asks you to put everything back to Auto while you are there. What is the soundest course?',
    options: [
      'Report it, and leave the switches until a controls survey finds why',
      'Switch it all to Auto now, since Auto is where the benefits come from',
      'Take out the added timeclock so that the BMS has sole control again',
      'Say nothing about it, as it falls outside the lighting work you priced',
    ],
    correctAnswer: 0,
    explanation:
      'Plant is often put in Hand to get round a real fault, such as a failed sensor or a lost strategy. Switching it back to Auto without a controls engineer could bring that fault straight back. Report what you found and suggest a survey. Returning to Auto is tempting because the benefits only arrive in Auto, but that should follow the diagnosis, not replace it.',
    section: '1.3',
    difficulty: 'advanced',
    topic: 'Plant left in Hand',
    category: 'What a BMS is, and the rules around it',
  },

  // ── 1.4 Where you will meet a BMS ──────────────────────────────────────
  {
    id: 1016,
    question:
      'The same outstations and sensors turn up in every type of building. Which four things change from one building type to the next?',
    options: [
      'Outstation make, cable type, protocol and sensor range',
      'Wiring method, terminal type, voltage and labelling',
      'Criticality, cable type, network protocol and ownership',
      'Criticality, hours, environment and hygiene, ownership',
    ],
    correctAnswer: 3,
    explanation:
      'What changes between sites is how critical the plant is, the hours it runs, the environmental and hygiene demands of the space, and who owns which part of the system. The hardware and how you terminate it stay the same, which is why the options built around cable, protocol and wiring are wrong.',
    section: '1.4',
    difficulty: 'basic',
    topic: 'What changes between sites',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1017,
    question:
      'During the summer holiday you plan a BMS panel shutdown in a university research building. Part of the panel serves fume cupboards and laboratory freezers. How should you treat that part?',
    options: [
      'As ordinary teaching space, because the term has now ended',
      'As a critical site, since it needs alarms day and night all year',
      'As outside the BMS, because laboratory plant has its own controls',
      'As safe to isolate, as nobody occupies the building in holidays',
    ],
    correctAnswer: 1,
    explanation:
      'Laboratories are the exception within education. Fume cupboards, controlled environments and freezers need monitoring and alarms day and night, term time or not, so they are treated like a critical site. The holiday is tempting as a reason to isolate freely, but that reasoning only applies to the empty teaching space.',
    section: '1.4',
    difficulty: 'intermediate',
    topic: 'Education sites',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1018,
    question:
      'You are wiring a tenant’s fit-out in a multi-let office. The fan coil controllers on the floor are the tenant’s; the roof AHU serving several floors is the landlord’s. Which request can the tenant’s project manager properly give you?',
    options: [
      'Run the roof AHU until 10 pm on weekdays for their late shift',
      'Raise the supply air setpoint on the roof AHU for their floor',
      'Connect the new fan coil controllers on their own floor',
      'Extend the time programme of the outstation running the AHU',
    ],
    correctAnswer: 2,
    explanation:
      'In a tenanted building the tenant may own the controls in their own space, while the landlord usually runs the central plant and the controls that serve it. The fan coil work is within the tenant’s scope. Anything that changes the roof AHU or its outstation affects other tenants and the service charge, so it goes to the landlord’s facilities manager.',
    section: '1.4',
    difficulty: 'intermediate',
    topic: 'Landlord and tenant',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1019,
    question:
      'Before starting work in a supermarket plant room, what should you find out about the refrigeration?',
    options: [
      'Whether it has its own controls the BMS only watches, and who runs it',
      'Whether the chilled cabinets can be switched off while you are working',
      'Which outstation in the plant room runs the sales floor lighting',
      'Whether the chain’s central head end is located inside this store',
    ],
    correctAnswer: 0,
    explanation:
      'Refrigeration often has its own dedicated controls, with the BMS watching temperatures and alarms. Which arrangement the store has decides who you call if a cabinet alarms while you are working. Switching cabinets off puts perishable stock at risk, and where the head end sits does not change who looks after the refrigeration.',
    section: '1.4',
    difficulty: 'intermediate',
    topic: 'Retail and refrigeration',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1020,
    question:
      'A data centre’s site team says two of its four cooling units are needed at the current load. One unit is already out for maintenance. You are asked to isolate the controls of a second unit for twenty minutes. What should you do?',
    options: [
      'Go ahead, because two units will still be running and two is enough',
      'Hold off and agree it with the site team, as no spare would remain',
      'Go ahead quickly and restore it before the room has time to heat up',
      'Ask the BMS operator to silence the cooling alarms while you work',
    ],
    correctAnswer: 1,
    explanation:
      'Data centres are built on redundancy so that one unit can fail or be maintained safely. Taking out a second unit would leave exactly the load requirement and nothing spare, so a further failure becomes an incident. “Two is enough” is tempting arithmetic, but it ignores the redundancy the design depends on. Racing the clock and silencing alarms both make it worse.',
    section: '1.4',
    difficulty: 'advanced',
    topic: 'Critical sites and redundancy',
    category: 'What a BMS is, and the rules around it',
  },

  // ── 1.5 Standards and regulations ──────────────────────────────────────
  {
    id: 1021,
    question:
      'A non-domestic project is in Scotland. What effective rated output does the Scottish guidance use as the trigger for a building automation and control system?',
    options: ['180 kW', '250 kW', '290 kW', '1000 kW'],
    correctAnswer: 2,
    explanation:
      'The guidance supporting the Scottish building standards for non-domestic building services uses 290 kW. 180 kW is tempting because it is the England figure, and the figure Wales moves to on 4 March 2027, but it is not the Scottish one.',
    section: '1.5',
    difficulty: 'basic',
    topic: 'UK thresholds',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1022,
    question:
      'A specification names both BS EN ISO 16484 and BS EN ISO 52120-1. How do the two standards divide the work?',
    options: [
      '16484 covers the system and its protocol; 52120-1 grades its energy',
      '16484 grades energy classes A to D; 52120-1 sets the BACnet protocol',
      'They are the same standard, under its old and its new number',
      '16484 covers fire alarm interfaces; 52120-1 covers lighting only',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN ISO 16484 is the series about the building automation and control system itself: the equipment, its functions and the BACnet communication protocol. BS EN ISO 52120-1 grades which energy-saving functions the system performs, in classes A to D. Treating them as old and new numbers for one standard is the tempting mistake: it is EN 15232 that 52120-1 replaced.',
    section: '1.5',
    difficulty: 'basic',
    topic: 'BS EN ISO 16484',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1023,
    question:
      'Commissioning of the fixed building services on a new building in England has just been completed. Who should receive the notice of completion of commissioning, and when?',
    options: [
      'The controls contractor only, at the end of the defects period',
      'The building owner only, inside the log book a year after handover',
      'The electricity network operator, within thirty days of completion',
      'Building control and the owner, normally within five days',
    ],
    correctAnswer: 3,
    explanation:
      'The notice goes to both the building control body and the building owner, and should normally be given within five days of commissioning being completed. The log book is tempting because the commissioning records do end up there, but that is a separate requirement from the notice.',
    section: '1.5',
    difficulty: 'intermediate',
    topic: 'Commissioning notice',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1024,
    question:
      'Approved Document L notes that a Class A system meets its BACS functions. A client concludes that Class A is compulsory on every building over 180 kW. What is the accurate reply?',
    options: [
      'Yes; any lower class means the building fails the Building Regulations',
      'No; Class A is one recognised way to show the functions are present',
      'No; the classes only apply to buildings in Scotland and Wales',
      'Yes, but only where the floor area is greater than 1000 m²',
    ],
    correctAnswer: 1,
    explanation:
      'The approved document lists the functions the system should provide and notes that a Class A system meets them. That makes Class A a recognised way of showing compliance, not a requirement in itself. Reading it as compulsory is the tempting mistake; a contract or specification can make a class binding, but the guidance does not.',
    section: '1.5',
    difficulty: 'intermediate',
    topic: 'BS EN ISO 52120-1 classes',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1025,
    question:
      'A new office in England has 120 kW of primary boilers, 40 kW of heating coils in the AHU that warms the offices, 30 kW of secondary heaters in reception and a 50 kW boiler kept only as breakdown backup. Is the 180 kW trigger exceeded?',
    options: [
      'Yes: 240 kW, because every boiler and heater on site is counted',
      'No: 160 kW, because secondary space heating is left out of the total',
      'Yes: 190 kW, counting the comfort heating and leaving out the backup',
      'No: 120 kW, because only the primary boilers count towards the total',
    ],
    correctAnswer: 2,
    explanation:
      'Effective rated output includes primary space heating, heating combined with ventilation and secondary space heating: 120 + 40 + 30 = 190 kW, which is over 180 kW. Plant kept only as emergency or occasional backup is left out. The 240 kW answer reaches the right “yes” by the wrong route, and leaving out the secondary heaters or the AHU coils wrongly puts the building under the line.',
    section: '1.5',
    difficulty: 'advanced',
    topic: 'Effective rated output',
    category: 'What a BMS is, and the rules around it',
  },

  // ── 1.6 The electrician’s role and working safely ──────────────────────
  {
    id: 1026,
    question:
      'On a typical BMS job, which task belongs to the controls specialist rather than the electrician?',
    options: [
      'Installing tray and trunking for the control cabling',
      'Writing the control strategy and loading the software',
      'Identifying every core at both ends of the field wiring',
      'Running the submains and final circuits to the panels',
    ],
    correctAnswer: 1,
    explanation:
      'The controls specialist designs the strategy, writes and loads the software and commissions the system. Containment, power to panels and identifying cores are electrical work. The exact split is set by the contract, but strategy and software stay with the controls engineer unless your contract and training say otherwise.',
    section: '1.6',
    difficulty: 'basic',
    topic: 'Who does what',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1027,
    question:
      'Which hazard in a plant control panel can remain even after every supply to it has been removed?',
    options: [
      'Stored charge in the variable speed drives',
      'The secondary of the controls transformer',
      'The coils of the interposing relays',
      'The contacts of the Hand/Off/Auto switches',
    ],
    correctAnswer: 0,
    explanation:
      'Variable speed drives hold charge after their supply is removed, so you follow the drive manufacturer’s instructions on how long to wait and how to prove it discharged. The transformer secondary and relay coils are tempting, but they are fed from supplies; once those supplies are isolated, they are dead.',
    section: '1.6',
    difficulty: 'basic',
    topic: 'Sources in a control panel',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1028,
    question:
      'You are about to insulation resistance test the control and field wiring you installed on a BMS job. What should be agreed with the controls engineer first?',
    options: [
      'That the test voltage is doubled for every screened cable',
      'That the outstation stays connected to log the test results',
      'That the plant is left in Hand for the duration of the tests',
      'Which electronic devices come off, and who puts them back',
    ],
    correctAnswer: 3,
    explanation:
      'Outstation inputs, drives, electronic sensors and network devices can be damaged by an insulation resistance test, so they are disconnected or the test is arranged around them. Agree which, record it, and make sure they go back correctly. Leaving the outstation connected is the tempting wrong choice, because it exposes the very device the test can damage.',
    section: '1.6',
    difficulty: 'intermediate',
    topic: 'Testing around controls',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1029,
    question:
      'On a cold evening you are about to work on a heating pump. The BMS shows it stopped and its time schedule off. Why is that not enough to work on it?',
    options: [
      'The BMS display usually lags several minutes behind the plant',
      'The pump is controlled only by the schedule in summer months',
      'A frost routine can start it if the outside temperature drops',
      'The head end restarts every pump once an hour to stop seizing',
    ],
    correctAnswer: 2,
    explanation:
      'Plant under BMS control can start on its own: a frost protection routine, an operator command, a restart after a power interruption or someone turning a Hand/Off/Auto switch. A stopped pump with its schedule off is still controlled, not isolated. Lock off the local isolator and the panel supply and prove dead.',
    section: '1.6',
    difficulty: 'intermediate',
    topic: 'Control is not isolation',
    category: 'What a BMS is, and the rules around it',
  },
  {
    id: 1030,
    question:
      'A designer is deciding how to supply the outstation in an AHU panel. The client wants plant-failure alarms to keep reaching the estates team even when the AHU supply has tripped. Which arrangement suits, and what does it mean for isolation?',
    options: [
      'Independent; isolating the AHU circuit leaves the outstation live',
      'Dependent supply; the outstation then keeps reporting after a trip',
      'Independent supply; the panel main isolator then makes both dead',
      'Dependent supply; the outstation then needs its own lockable isolator',
    ],
    correctAnswer: 0,
    explanation:
      'Under Section 557 an auxiliary circuit’s supply is dependent or independent according to its function. An outstation that must keep reporting when plant supplies trip needs an independent supply, which means it is a second source in the panel: isolating the main circuit does not make it dead. A dependent supply would die with the AHU, which is exactly what the client does not want.',
    section: '1.6',
    difficulty: 'advanced',
    topic: 'Auxiliary circuit supplies',
    category: 'What a BMS is, and the rules around it',
  },
];
