import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule7: StandardMockQuestion[] = [
  {
    id: 7001,
    question:
      'Before first fix you find that every input and output channel on one outstation is already allocated on the points schedule. Why is that worth raising?',
    options: [
      'Any extra point found on site will mean extra hardware',
      'The outstation will not start unless one channel is spare',
      'BS 7671 requires spare ways on every control panel',
      'The points schedule cannot be signed off as fitted',
    ],
    correctAnswer: 0,
    explanation:
      'A controller that is full on day one has no room for the extra point that almost always turns up on site, so that point means another module or controller. Controllers start whether or not a channel is spare, BS 7671 says nothing about spare BMS channels, and a full controller can still be recorded as fitted.',
    section: '7.1',
    difficulty: 'intermediate',
    topic: 'Cross-checking the design documents',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7002,
    question:
      'The points schedule shows an AHU supply fan run status taken from an auxiliary contact on the fan contactor. The fan belt snaps while the fan is running. What will the BMS see on that status point?',
    options: [
      'Not running, because airflow has stopped across the fan',
      'Still running, because the contactor is still pulled in',
      'A trip, because the overload operates when the belt breaks',
      'A comms fault, because the status contact has gone open',
    ],
    correctAnswer: 1,
    explanation:
      'An auxiliary contact proves only that the contactor pulled in. With the belt gone the motor still turns and the contactor stays in, so the status still reads running. A differential pressure switch across the fan would prove air is moving, which is why the schedule should say what kind of proof each status gives. Reading this as "not running" assumes the wrong type of proof.',
    section: '7.1',
    difficulty: 'intermediate',
    topic: 'Command and status points',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7003,
    question:
      'Cross-checking the documents before first fix, you find the description of operation enables the chiller only once chilled water flow is proven, but no flow proof point appears on the points schedule. What should you do?',
    options: [
      'Fit a flow switch of your own choice and add a row to the schedule',
      'Nothing, as the controls engineer can use the pump command instead',
      'Leave it, because the functional test will show whether it matters',
      'Raise it on the query list to the controls contractor first',
    ],
    correctAnswer: 3,
    explanation:
      'A sequence that needs a point the schedule does not list will fail its functional test, so the gap is raised on paper before installation, on one list to the controls contractor. Choosing and adding a device yourself is redesigning the system, and a pump command only proves what was asked for, not that water is flowing. Waiting for the functional test is the expensive way to find it.',
    section: '7.1',
    difficulty: 'intermediate',
    topic: 'Cross-checking the document set',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7004,
    question:
      'The starter wiring diagram for an AHU supply fan shows the fire interface contact wired in series with the BMS enable, in the auto leg only. The strategy also stops the fan on fire. What is the right response before you wire it?',
    options: [
      'Query it, so fire breaks the circuit ahead of the Hand/Off/Auto switch',
      'Wire it as drawn, because the BMS strategy already stops the fan on fire',
      'Wire it as drawn, but label the Hand position "not for use during a fire"',
      'Move the fire contact to a BMS digital input so the strategy can act on it',
    ],
    correctAnswer: 0,
    explanation:
      'With the fire contact only in the auto leg, a fan left in Hand keeps running through a fire. The fire contact must break the starter control circuit where neither the Hand/Off/Auto switch nor the BMS enable can bypass it, with a separate status contact to the BMS. Relying on the strategy is the tempting answer, but the software is only a second line and cannot act in Hand.',
    section: '7.1',
    difficulty: 'advanced',
    topic: 'Fire priority in the design documents',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7005,
    question:
      'On a fan fail latch, the set and reset inputs are both true at the same moment. What decides the output?',
    options: [
      'Whether the block is set-dominant or reset-dominant',
      'Whichever of the two inputs changed state most recently',
      'Nothing, as the controller always clears it so plant can run',
      'The head end, which asks the operator to pick one or the other',
    ],
    correctAnswer: 0,
    explanation:
      'Each block library decides which input wins when both are true, set-dominant or reset-dominant, and the drawing should make it clear. It is not decided by timing, there is no universal rule that a reset wins, and the head end is not asked.',
    section: '7.2',
    difficulty: 'intermediate',
    topic: 'Latches',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7006,
    question:
      'A fan strategy reads: Fan = (Schedule OR Override) AND Auto AND NOT Trip AND NOT Fire. The schedule is off, a head-end override is on, the selector is in Auto, there is no trip and the fire signal is active. What does the controller do?',
    options: [
      'Commands the fan on, because the override satisfies the OR',
      'Commands the fan on, because overrides beat the schedule',
      'Does not command the fan, because NOT Fire is false',
      'Does not command the fan, because the schedule is off',
    ],
    correctAnswer: 2,
    explanation:
      'The OR is satisfied by the override, so there is a reason to run, but the final AND needs every input true and NOT Fire is false while the fire signal is active. This is the right order: requests gathered first, fire as the last gate. Saying the fan runs because the OR is satisfied forgets that permissions veto requests; the schedule being off was never the reason.',
    section: '7.2',
    difficulty: 'intermediate',
    topic: 'Boolean logic and fire priority',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7007,
    question:
      'Every morning an AHU raises a fan fail alarm a few seconds after it starts, and the alarm then clears on its own. The fan and its airflow switch are healthy. What is the most likely cause in the strategy?',
    options: [
      'The latch on the fan fail has been set reset-dominant',
      'The off-delay on the fan command is set too long',
      'The PID block for the heating valve is not enabled',
      'The on-delay feeding the fan fail is set too short',
    ],
    correctAnswer: 3,
    explanation:
      'The fan fail is raised when "commanded AND NOT proved" has lasted longer than the on-delay. If the delay is shorter than the time the fan takes to prove airflow, the alarm comes up on every start and clears once the switch makes. An off-delay acts when the command goes off, not at start, and the heating loop has nothing to do with the fan fail.',
    section: '7.2',
    difficulty: 'intermediate',
    topic: 'Timers',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7008,
    question:
      'A newly loaded AHU heating valve loop opens the valve further as the off-coil temperature rises above setpoint, and ends up hard against its end stop. What is the most likely set-up fault?',
    options: [
      'The loop is direct-acting where it should be reverse-acting',
      'The integral time is set far too long for the size of the coil',
      'The enable is taken from the time schedule, not fan proven',
      'The setpoint has been entered in the wrong engineering units',
    ],
    correctAnswer: 0,
    explanation:
      'A heating valve loop should be reverse-acting: warmer air, less heating. A direct-acting loop drives its output up as the process variable rises, so the valve opens as the air warms and runs to its end stop. A long integral time makes the loop slow, not backwards, and an enable from the schedule causes wind-up at start-up rather than a reversed response.',
    section: '7.2',
    difficulty: 'intermediate',
    topic: 'PID action',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7009,
    question:
      'A fan strategy has its fire logic correctly placed, but a separate test routine also writes to the same fan output and executes after the fire logic in each pass. What is the consequence?',
    options: [
      'The test routine can run the fan in a fire, as the last write wins',
      'The fire logic still wins, because the controller treats fire as a safety input',
      'The controller raises a conflict alarm and stops the fan until it is reset',
      'Both writes are ANDed together, so the fan only runs if both ask for it',
    ],
    correctAnswer: 0,
    explanation:
      'The controller works through its blocks in order and the physical output follows whichever write came last in the pass. Anything that writes to the output after the fire logic beats the fire logic, so the fire gate must be the last word with nothing executed after it touching that point. A controller does not treat a point as a safety input just because of its name; the hardwired stop in the starter is what protects the building meanwhile.',
    section: '7.2',
    difficulty: 'advanced',
    topic: 'Execution order and fire priority',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7010,
    question: 'What does a device’s network address do that a point name does not?',
    options: [
      'Tells the operator what the point measures',
      'Sets the scaling of the controller input channel',
      'Lets the BMS find the device on the network',
      'Decides the order the points sort in a list',
    ],
    correctAnswer: 2,
    explanation:
      'Every point has two identities: the address finds the device on the network, and the name says what the point means. Telling the operator what the point is and sorting sensibly are jobs of the name, and scaling belongs to the input configuration.',
    section: '7.3',
    difficulty: 'basic',
    topic: 'Addresses and names',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7011,
    question:
      'A controller has two separate RS-485 Modbus buses on two separate ports. Each bus has an energy meter set to address 5. What does this mean?',
    options: [
      'A clash, so one of the meters must be readdressed at once',
      'A clash only if both meters are the same make and model',
      'No clash as long as the master is also given address 5',
      'No clash, but the register must record each meter’s bus',
    ],
    correctAnswer: 3,
    explanation:
      'Modbus addresses must be unique on each bus, and the master talks to each bus on its own, so the same address on two buses is fine. That is why the address register records which bus or port each device sits on, not just the number. The master has no address at all.',
    section: '7.3',
    difficulty: 'intermediate',
    topic: 'Modbus addressing',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7012,
    question:
      'You change the DIP switch address on a meter that is powered and running, but the master still only finds it at its old address. What is the most likely reason?',
    options: [
      'Some devices only read their switches when they power up',
      'The master holds on to every address it learns for a full day',
      'DIP switch addresses only take effect on BACnet networks',
      'Binary-weighted switches cannot be changed once first set',
    ],
    correctAnswer: 0,
    explanation:
      'Some devices only read their address switches when they power up, so changing them on a live device does nothing until it restarts. Follow the device’s instructions on when a new address is taken up. Masters do not hold addresses for a day, DIP switches are used on Modbus devices as much as BACnet ones, and they can be reset as often as needed.',
    section: '7.3',
    difficulty: 'intermediate',
    topic: 'Setting addresses',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7013,
    question:
      'After a second AHU controller is added to a BACnet network, the head end sometimes shows AHU-1 values on the AHU-2 graphic, and a command to AHU-2 has started AHU-1’s fan. Both controllers communicate. What is the most likely cause?',
    options: [
      'Two sensor cables crossed at the AHU-2 controller terminals',
      'Both controllers carrying the same BACnet device instance',
      'Point names on AHU-2 that do not follow the site convention',
      'A missing termination resistor at the end of the IP network',
    ],
    correctAnswer: 1,
    explanation:
      'When two devices share an instance, both answer the "who is" request and the head end may bind to either, so points appear under the wrong controller and commands go to the wrong plant. Crossed sensor cables would swap two readings, not send commands to a different unit. A naming fault would not redirect anything, and the device instance must be unique across the whole BACnet network.',
    section: '7.3',
    difficulty: 'advanced',
    topic: 'Duplicate BACnet device instances',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7014,
    question:
      'The controls engineer is about to download a strategy to an AHU outstation and restart it. What should everyone assume about the plant?',
    options: [
      'It may start or move, so treat it as live from the download',
      'It stays off until the strategy has been tested from the head end',
      'Outputs hold their last state until the engineer releases them',
      'Only analogue outputs can change; digital ones wait for a schedule',
    ],
    correctAnswer: 0,
    explanation:
      'When a strategy is loaded and the controller restarts, outputs can change state: a fan can start and a valve can drive open. Treat the plant as live from the moment the download starts, warn anyone working on it and have someone at the plant who can stop it locally. Nothing guarantees that outputs stay off or hold their last state.',
    section: '7.4',
    difficulty: 'basic',
    topic: 'Loading a strategy safely',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7015,
    question:
      'The controls engineer is due to load the strategy into a new outstation tomorrow. Its panel is currently fed from a temporary lead off the site distribution board. What should you do?',
    options: [
      'Leave it, since the controller only needs power for a short load',
      'Fit a plug-in UPS on the temporary lead so it rides through any dip',
      'Tell the engineer to load it over the network instead of locally',
      'Get the designed supply connected before loading starts',
    ],
    correctAnswer: 3,
    explanation:
      'A controller that loses power part way through a load can be left with a half-written program, so the supply should be the designed one, not a temporary lead that might be knocked out. Loading over the network does not change the risk at the controller, and improvising extra equipment is not the designed arrangement.',
    section: '7.4',
    difficulty: 'intermediate',
    topic: 'Conditions before loading',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7016,
    question:
      'At the end of a job, the only copies of the strategy backups are on the commissioning engineer’s laptop. What is the better arrangement?',
    options: [
      'Copy them to an open shared drive so anyone on site can reach them',
      'Leave them with the engineer, who will email them if they are needed',
      'Client and controls contractor each hold a copy, both kept secure',
      'Print each strategy and keep the printouts in the outstation panels',
    ],
    correctAnswer: 2,
    explanation:
      'A copy that lives only on one laptop leaves with that engineer. The client should hold a copy on site or in their own storage and the controls contractor another. The files describe the plant, the network and sometimes user accounts, so an open shared drive is the wrong place for them.',
    section: '7.4',
    difficulty: 'intermediate',
    topic: 'Backups',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7017,
    question:
      'You are fitting a replacement controller on an older BMS. Its label shows a newer firmware version than the controllers either side of it. What should you do?',
    options: [
      'Tell the controls engineer the version before networking it',
      'Connect it to the network, because newer firmware is always better',
      'Load the old controller’s strategy file into it from the site PC',
      'Return it and ask the supplier for one with the older firmware',
    ],
    correctAnswer: 0,
    explanation:
      'Newer firmware can change how an existing strategy behaves, and firmware and strategy decisions belong to the controls engineer. Mentioning the version before the unit goes on the network lets them check it. Loading a strategy file yourself is outside the electrician’s job, and assuming newer is always fine is the trap.',
    section: '7.4',
    difficulty: 'intermediate',
    topic: 'Firmware and version records',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7018,
    question:
      'In the usual order of BMS commissioning, which stage comes immediately before point-to-point testing?',
    options: [
      'Functional testing of the plant sequences',
      'Witnessing and formal acceptance by the client',
      'Seasonal commissioning of the cooling',
      'Pre-commissioning checks of the installation',
    ],
    correctAnswer: 3,
    explanation:
      'The order is: installation tested to BS 7671, plant and safeties ready, pre-commissioning checks, point-to-point testing, functional testing, witnessing and acceptance, then seasonal commissioning. Functional testing comes after point-to-point, because it relies on every point being proved first.',
    section: '7.5',
    difficulty: 'basic',
    topic: 'Commissioning sequence',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7019,
    question: 'How is an analogue temperature input proved during point-to-point testing?',
    options: [
      'Compare the BMS reading with a calibrated instrument at the sensor',
      'Check the reading against a similar sensor elsewhere in the building',
      'Confirm the head end shows a figure that looks reasonable for the day',
      'Measure the sensor resistance at the outstation and note the value',
    ],
    correctAnswer: 0,
    explanation:
      'Analogue inputs are compared with a calibrated test instrument at the sensor, in place where possible, under normal conditions. A neighbouring sensor or a plausible-looking figure proves nothing about this point, and a resistance noted at the outstation is not compared with anything real.',
    section: '7.5',
    difficulty: 'basic',
    topic: 'Point-to-point testing',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7020,
    question:
      'When proving a spring-return damper actuator point to point, which check applies because it is spring return?',
    options: [
      'That it drives the full travel when commanded from 0 to 100%',
      'That it moves in the right direction for an increasing signal',
      'That it goes to the right position when its supply is removed',
      'That the linkage is set correctly for rotation on the damper shaft',
    ],
    correctAnswer: 2,
    explanation:
      'Every analogue output is checked for direction, full travel, linkage and smooth movement. Spring return adds one more: with its supply removed, the damper or valve must go to its correct fail position. The other three are checks on any actuator, spring return or not.',
    section: '7.5',
    difficulty: 'intermediate',
    topic: 'Analogue outputs',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7021,
    question:
      'During point-to-point testing, you measure a voltage across a chiller status contact that the schedule describes as volt-free. The status still changes correctly on the head end. What is the right call?',
    options: [
      'Pass it, since the status changes on the correct point each time',
      'Fail it, make it safe and raise it, as it is not volt-free',
      'Pass it, and note the voltage in the comments column',
      'Fail it, and fit a fuse in the cable to limit the current',
    ],
    correctAnswer: 1,
    explanation:
      'A contact described as volt-free must really be volt-free. A foreign voltage on a low-voltage input is a safety issue for anyone working on that outstation and can damage the input, so the point fails until the cause is found and fixed. A status that changes correctly is the tempting reason to pass, and a note or an improvised fuse leaves the hazard in place.',
    section: '7.5',
    difficulty: 'advanced',
    topic: 'Volt-free contacts',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7022,
    question:
      'In England, under Regulation 40 of the Building Regulations 2010, how soon after the work is completed must the owner be given the information to run the building efficiently?',
    options: [
      'No later than five days',
      'No later than thirty days',
      'Before the first defects visit',
      'By the end of the first year',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 40 requires the person carrying out the work to give the owner the information no later than five days after completion. Approved Document L explains how, with the information collected in a building log book that includes the commissioning records.',
    section: '7.6',
    difficulty: 'basic',
    topic: 'Regulation 40 and the log book',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7023,
    question: 'In what form is the points schedule normally handed over to the client?',
    options: [
      'As a printout bound into the commissioning manual',
      'As a screenshot of the head-end points schedule',
      'As a locked PDF issued by the controls contractor',
      'As an editable spreadsheet the client can update',
    ],
    correctAnswer: 3,
    explanation:
      'The points schedule is the spine of the system and is normally handed over as an editable spreadsheet, so the client can keep it current as the system changes. A printout, screenshot or locked file cannot be kept up to date.',
    section: '7.6',
    difficulty: 'basic',
    topic: 'Points schedule at handover',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7024,
    question:
      'At handover, the client’s facilities manager asks you to write the BMS administrator password on a label inside the head-end cabinet "so it never gets lost". What should happen?',
    options: [
      'Write it on the label, as the cabinet is locked',
      'Pass it by a route the client’s IT team approves',
      'Leave the default in place, so it is never forgotten',
      'Put it in the O&M manual under the contacts page',
    ],
    correctAnswer: 1,
    explanation:
      'Administrator details go to the client by a secure route their IT team specifies, with a signature for receipt, and the manual says only where credentials are held and who manages them. A label or the manual gives full access to anyone who finds it, and default passwords must be changed before go-live.',
    section: '7.6',
    difficulty: 'intermediate',
    topic: 'Passwords and access',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7025,
    question:
      'The estates team was trained in handover week. Four months later the building’s maintenance contractor changes, and the new engineers have never seen the system. What does good practice expect?',
    options: [
      'The new engineers read the O&M manual, which counts as training',
      'Nothing, because training was delivered and signed for at handover',
      'Repeat sessions on their own system, added to the attendance record',
      'The estates manager briefs them from memory on the first day on site',
    ],
    correctAnswer: 2,
    explanation:
      'Staff change and much of what is learned at handover is forgotten, so repeat sessions are planned. Training is hands-on on the site’s own system, each operator shows they can use it, and the attendance record shows who was trained on what. A manual is not training, and a past signature does not cover new people.',
    section: '7.6',
    difficulty: 'intermediate',
    topic: 'Training',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7026,
    question: 'How do you measure a 0–10 V signal at a BMS controller input?',
    options: [
      'Lift the signal wire and put the meter in series on its mA range',
      'Disconnect the device and measure the resistance across its terminals',
      'Clamp a load-current clamp meter around the signal conductor',
      'Set the meter to DC volts and measure across signal and common',
    ],
    correctAnswer: 3,
    explanation:
      'A voltage signal is measured on DC volts across the input terminals, signal and common, with the circuit left connected and working. Breaking the loop and measuring in series is how a 4–20 mA current is measured, a resistance check is for passive sensors, and an ordinary load-current clamp will not read such a small signal.',
    section: '7.7',
    difficulty: 'basic',
    topic: 'Measuring 0–10 V',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7027,
    question: 'Where an RS-485 network uses biasing, where should it be applied?',
    options: [
      'At every device, so each one holds the line idle',
      'At one place only, usually at the master',
      'At both ends of the trunk, with the terminations',
      'At the end of every spur, at the device terminals',
    ],
    correctAnswer: 1,
    explanation:
      'Bias resistors hold the pair in a known idle state when nobody is transmitting, and where used they are applied at one place for the whole bus, usually the master, and nowhere else. Bias switched on at several devices is a common cause of a network that will not settle. Terminations, not bias, go at the two ends of the trunk.',
    section: '7.7',
    difficulty: 'basic',
    topic: 'RS-485 biasing',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7028,
    question:
      'A duct temperature point using a platinum resistance element suddenly drops to the bottom of its range, reading impossibly cold, and the controller flags a sensor fault. What is the most likely cause?',
    options: [
      'An open circuit in the sensor element or its wiring',
      'A short circuit across the sensor or its cores',
      'Slightly long cable adding a little resistance',
      'A duplicate address on the controller’s bus',
    ],
    correctAnswer: 1,
    explanation:
      'A platinum element rises in resistance as it warms, so a short circuit (near zero ohms) reads very cold and an open circuit reads very hot. Open circuit is the tempting answer because it is right for an NTC thermistor. Long cable only makes it read slightly high, and an address fault would not drive one value to the end of its range.',
    section: '7.7',
    difficulty: 'intermediate',
    topic: 'Sensor open and short circuits',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7029,
    question:
      'A space temperature on the head end has sat at 14 °C for six hours. The controller’s own display shows 22 °C and changing, and a thermometer in the room reads 22 °C. Where is the fault?',
    options: [
      'In the sensor, which has drifted and needs replacing',
      'In the wiring between the sensor and the controller',
      'On the network side, between controller and head end',
      'In the controller input scaling for that sensor point',
    ],
    correctAnswer: 2,
    explanation:
      'The sensor and the controller agree with the real room, so the field side and the input are healthy. The head end disagrees with the controller, which puts the fault in the network or the head end, often a last good value being held after the point stopped updating. Going out to the sensor is the tempting move but would waste the visit.',
    section: '7.7',
    difficulty: 'advanced',
    topic: 'Following the point outward',
    category: 'Design, installation, commissioning and handover',
  },
  {
    id: 7030,
    question:
      'You need to lift a supply air sensor wire that feeds the AHU heating loop so you can measure the sensor. What should you do first?',
    options: [
      'Tell the site, and hold the heating loop at a safe manual value',
      'Nothing, as the controller ignores an input that drops out briefly',
      'Switch the AHU to Hand so the loop carries on without the sensor',
      'Override the heating valve fully open so the coil cannot freeze',
    ],
    correctAnswer: 0,
    explanation:
      'Lifting a sensor wire changes what the controller sees, and it will act on it by driving a valve, starting plant or raising an alarm. Tell the site and put the affected loop or output into a safe held state first. A controller does not ignore a lost input, Hand bypasses the controls rather than holding them, and forcing the valve open wastes energy and can overheat the space.',
    section: '7.7',
    difficulty: 'advanced',
    topic: 'Interrupting signals safely',
    category: 'Design, installation, commissioning and handover',
  },
];
