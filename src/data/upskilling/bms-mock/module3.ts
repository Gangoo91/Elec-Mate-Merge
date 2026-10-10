import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule3: StandardMockQuestion[] = [
  // ── 3.1 The plant a BMS runs ─────────────────────────────────────────
  {
    id: 3001,
    question:
      'Sorting a building’s plant into source, distribution and terminal layers, which of these is a terminal unit?',
    options: [
      'The dry cooler on the roof rejecting heat from the chiller',
      'The secondary pump on the chilled water circuit',
      'A chilled beam in an office ceiling',
      'The gas boiler feeding the heating header',
    ],
    correctAnswer: 2,
    explanation:
      'Terminal units deliver heating or cooling to the space: radiators, fan coils, VAV boxes, chilled beams and the coils in an AHU. The pump is distribution, because it moves the water. The dry cooler is tempting because it sits at the far end of a pipe, but it belongs with the chiller on the source side, rejecting the heat the chiller removes.',
    section: '3.1',
    difficulty: 'basic',
    topic: 'Source, distribution and terminal',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3002,
    question:
      'Why is it good practice to label a pair of pumps A and B on the panel and drawings, rather than duty and standby?',
    options: [
      'Duty and standby roles swap over in service',
      'Letters take up less room on a panel fascia',
      'The standby pump is never wired back to the BMS',
      'Only pump A is given a run status input',
    ],
    correctAnswer: 0,
    explanation:
      'Duty rotates on a schedule or on hours run, and changes over automatically when the duty pump fails, so a label saying “duty” is wrong half the time. Both pumps normally have their own run command and status or trip, so the idea that the standby is not wired to the BMS is false; it has to be, or the BMS could not bring it in.',
    section: '3.1',
    difficulty: 'basic',
    topic: 'Duty and standby pumps',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3003,
    question:
      'A controls strategy switches a modulating air-source heat pump on and off at full output from a BMS thermostat, ignoring the unit’s own modulation. What does the heat pump controls table in the 2026 edition of Approved Document L (in force from 24 March 2027) say about this?',
    options: [
      'It is preferred, because on/off running reduces defrost cycles',
      'It is required, so the BMS can supervise compressor protection',
      'It is acceptable provided the BMS takes over the defrost control',
      'Added controls should not take away the unit’s own functions',
    ],
    correctAnswer: 3,
    explanation:
      'Table 5.2 of the 2026 edition says any extra controls should add function without removing what the manufacturer’s controls already do, including the unit’s ability to modulate. That is good practice under the 2021 edition in force now, too. Compressor protection and defrost stay on board the heat pump; the BMS is not meant to take them over, which rules out the options that hand those jobs to the BMS.',
    section: '3.1',
    difficulty: 'intermediate',
    topic: 'Heat pump controls',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3004,
    question:
      'Two identical boilers run in sequence on a BMS and no faults have been logged. One shows 8,000 hours run and the other 900. What does this most likely point to?',
    options: [
      'The second boiler has a burner fault that stops it firing',
      'Lead boiler rotation has stopped, or was never set up',
      'The weather compensation curve has been set too steep',
      'The common header temperature sensor is reading high',
    ],
    correctAnswer: 1,
    explanation:
      'Sequencing should rotate which boiler leads so running time evens out. One boiler doing nearly all the hours with nothing in the fault log is the classic sign the rotation is not working. A burner fault would normally be reported by the boiler’s own controls as a fault, and the question says none has been logged.',
    section: '3.1',
    difficulty: 'intermediate',
    topic: 'Boiler sequencing and rotation',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3005,
    question:
      'After ceiling works on a VAV floor, every box on the system starts misbehaving at the same time and the AHU supply fan speed becomes erratic. Each box controller tests correctly on its own. Where should you look first?',
    options: [
      'Each box airflow sensor in turn, starting at the far end',
      'The room temperature sensors on the affected floor',
      'The supply duct static pressure sensor and its tubing',
      'The chilled water flow proving switch at the chiller',
    ],
    correctAnswer: 2,
    explanation:
      'On a VAV system the AHU fan holds supply duct pressure, and every box depends on it. A badly sited sensor or a split tube makes the whole system misbehave together, which matches a fault that appeared everywhere at once after work in the ceiling. Checking box sensors one by one is tempting, but individual faults would not explain every box failing together.',
    section: '3.1',
    difficulty: 'advanced',
    topic: 'VAV and duct static pressure',
    category: 'Controlling heating, ventilation and air conditioning',
  },

  // ── 3.2 Control loops ────────────────────────────────────────────────
  {
    id: 3006,
    question: 'In a BMS control loop, what is meant by the “error”?',
    options: [
      'A fault code raised when the sensor reads open circuit',
      'The output signal sent to the valve or damper actuator',
      'The weather or occupancy pushing the measured value around',
      'The difference between measured value and setpoint',
    ],
    correctAnswer: 3,
    explanation:
      'The controller compares the measured value with its setpoint, and the difference is the error; it then works out an output from that error. Weather, sun and occupancy pushing the measurement around are the load, which is a different term, though it is the load that creates the error in the first place.',
    section: '3.2',
    difficulty: 'basic',
    topic: 'Parts of a control loop',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3007,
    question:
      'A BMS controller sets integral action as an integral (reset) time. What does a shorter integral time give?',
    options: [
      'Faster, stronger integral action',
      'Slower, gentler integral action',
      'Integral action switched off',
      'A wider proportional band setting',
    ],
    correctAnswer: 0,
    explanation:
      'Set as a time (minutes per repeat), a short integral time means fast, strong integral action; a long one means slow and gentle. Some controllers set it as a rate (repeats per minute) instead, where a bigger number is stronger, so it is easy to read backwards, which is why “slower, gentler” is the tempting wrong answer. Integral time is a separate setting from the proportional band.',
    section: '3.2',
    difficulty: 'basic',
    topic: 'Integral action settings',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3008,
    question:
      'A loop that works well with a gain of 2 is being set up on a controller that expresses the same setting as a proportional band. Which band describes the same controller?',
    options: ['2 per cent', '20 per cent', '50 per cent', '200 per cent'],
    correctAnswer: 2,
    explanation:
      'Gain and proportional band are two ways of saying the same thing, one the reciprocal of the other. With a gain of 2, a 5 per cent change in measurement moves the output 10 per cent, which is a proportional band of 50 per cent. Copying the number 2 straight across would give an extremely aggressive controller.',
    section: '3.2',
    difficulty: 'intermediate',
    topic: 'Gain and proportional band',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3009,
    question:
      'A supply air loop on a heating valve is configured reverse acting, as the schematic shows. On site you find the actuator fitted closes the valve on a rising signal. What should happen at commissioning?',
    options: [
      'Leave it reverse acting, as heating valves are always reverse',
      'Check the action against the real valve and set it to suit',
      'Add derivative action so the loop can correct for the actuator',
      'Swap the heating and cooling outputs in the sequence block',
    ],
    correctAnswer: 1,
    explanation:
      'The direction of action depends on the hardware as well as the plant. An actuator that closes on a rising signal flips the answer, which is why controllers let the action be chosen in configuration and why it must be checked against the real valve, not assumed from the schematic. “Heating valves are always reverse” is the trap: it is true only for a valve that opens on a rising signal.',
    section: '3.2',
    difficulty: 'intermediate',
    topic: 'Direct and reverse action',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3010,
    question:
      'On a newly commissioned AHU, the trend shows that as the supply air warms, the chilled water valve output drives to 0 per cent and stays there while the air keeps warming. The sensor reads correctly and the valve follows its signal. What is the most likely cause?',
    options: [
      'Integral windup carried over from the overnight shutdown',
      'Derivative action reacting to a noisy supply air sensor',
      'Proportional offset caused by a heavy cooling load',
      'The loop’s direction of action is set the wrong way',
    ],
    correctAnswer: 3,
    explanation:
      'A cooling valve should open as the air warms (direct action). An output pinned at one end while the measurement runs away in the same direction is the signature of a loop set the wrong way round. Windup also shows an output pinned at a limit, but it comes from plant that cannot keep up, and here the loop is actively closing the valve that would cure the error.',
    section: '3.2',
    difficulty: 'advanced',
    topic: 'Reading a loop on a trend',
    category: 'Controlling heating, ventilation and air conditioning',
  },

  // ── 3.3 Time and occupancy ───────────────────────────────────────────
  {
    id: 3011,
    question:
      'Which part of a building’s time control is most likely to go out of date without any alarm or obvious symptom?',
    options: [
      'The weekly programme for the main AHU',
      'The exception schedule or closure calendar',
      'The clock on a centrally synchronised network',
      'The optimiser’s maximum pre-heat limit',
    ],
    correctAnswer: 1,
    explanation:
      'The weekly programme keeps working whether or not anyone looks after it; the holiday list does not. Exception schedules and calendars go stale because nothing alarms when next year’s dates are missing, and nobody notices until the bill arrives. A centrally synchronised clock is kept right by the supervisor or time server.',
    section: '3.3',
    difficulty: 'basic',
    topic: 'Exception schedules and calendars',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3012,
    question: 'What is night setback?',
    options: [
      'Holding a lower heating setpoint out of occupied hours',
      'Switching the heating off and leaving a frost routine on guard',
      'Starting the heating later on mild mornings than on cold ones',
      'Bringing in cool outside air overnight to cool the structure',
    ],
    correctAnswer: 0,
    explanation:
      'Night setback keeps the heating running to a lower target out of hours so the building does not cool too far to recover by morning. Switching off with a frost routine is the other common choice, not setback. Starting later on mild mornings is optimum start, and cooling the structure overnight is a night purge.',
    section: '3.3',
    difficulty: 'basic',
    topic: 'Night setback',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3013,
    question:
      'During its first few weeks, a newly commissioned optimiser starts the heating at noticeably different times and the space sometimes reaches target late. The sensors check out. What is the likely explanation to give the client?',
    options: [
      'The weekly programme has been entered on the wrong days',
      'The handover to weather compensation is set too short',
      'It is still learning from each morning’s result',
      'The closure calendar still holds last year’s dates',
    ],
    correctAnswer: 2,
    explanation:
      'Most optimisers compare each morning when the space reached target with when it should have, and adjust their calculation. A new optimiser, or one whose learning has been reset, takes a while to settle, and that is worth explaining before the client rings. A wrong weekly programme or stale calendar would show as plant running on the wrong days, not as varying start times.',
    section: '3.3',
    difficulty: 'intermediate',
    topic: 'Optimum start learning',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3014,
    question:
      'A room’s override push button has failed. The strategy reads it as a timed override, and the only spare in the van is a latching key switch. What is the risk of fitting the key switch?',
    options: [
      'The input card will be damaged by the continuous contact',
      'The BMS will no longer be able to see the input change',
      'The override will time out sooner than it did before',
      'The zone may stay occupied for as long as it is left on',
    ],
    correctAnswer: 3,
    explanation:
      'Whether the input is momentary or maintained changes how the strategy treats it. A maintained contact on an input written for a push button can hold the zone on indefinitely, which is a common cause of plant running all night. The BMS will still see the contact change, so the input is not the problem; the behaviour behind it is.',
    section: '3.3',
    difficulty: 'intermediate',
    topic: 'Occupancy overrides',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3015,
    question:
      'Trends show an office optimiser starting at its maximum pre-heat limit every Monday, with the space reaching target an hour after people arrive. The sensors have been checked and read correctly. The client suggests moving the occupied start from 08:00 to 06:00. What is the better course?',
    options: [
      'Raise that zone’s maximum pre-heat limit; keep the true times',
      'Move the occupied start to 06:00 on every weekday, as suggested',
      'Raise the space setpoint so the plant works harder on Mondays',
      'Disable self-learning so the optimiser stops changing the start time',
    ],
    correctAnswer: 0,
    explanation:
      'With the sensors proved, the cap on pre-heat is what stops the optimiser recovering from the weekend, so raising it for that zone fixes the cause. Moving the occupied time earlier makes the optimiser, ventilation and lighting chase comfort hours early every day, adding hours of running nobody is in for. Raising the setpoint answers “how much” when the problem is “when”.',
    section: '3.3',
    difficulty: 'advanced',
    topic: 'Optimiser settings',
    category: 'Controlling heating, ventilation and air conditioning',
  },

  // ── 3.4 Demand-based control and load management ────────────────────
  {
    id: 3016,
    question: 'How does a variable speed drive change the speed of an AC fan or pump motor?',
    options: [
      'By partly closing a damper or valve in front of the running motor',
      'By changing the frequency of the supply it feeds to the motor',
      'By switching the motor windings between star and delta',
      'By selecting one of several fixed speeds through relays',
    ],
    correctAnswer: 1,
    explanation:
      'A VSD varies the frequency of the supply to the motor, adjusting voltage and current to control torque. Throttling with a damper or valve leaves the motor at full speed working against a restriction, which is exactly the waste a drive avoids. Fixed speed steps through relays describe a multi-speed unit, not a drive.',
    section: '3.4',
    difficulty: 'basic',
    topic: 'Variable speed drives',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3017,
    question:
      'In a space where the air is spoilt mainly by cleaning products and fumes rather than by the people in it, which sensor best suits demand-controlled ventilation?',
    options: [
      'A CO2 sensor on an open wall',
      'A ceiling presence detector',
      'A mixed-gas or VOC sensor',
      'A duct static pressure sensor',
    ],
    correctAnswer: 2,
    explanation:
      'A mixed-gas or VOC sensor responds to a range of gases, including odours and fumes, and suits spaces where the pollution is not mainly from occupants. CO2 is the tempting answer, but it tracks people breathing out, so it would miss fumes from cleaning products. A presence detector only says whether someone is there.',
    section: '3.4',
    difficulty: 'basic',
    topic: 'CO2 and air-quality sensing',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3018,
    question:
      'You are wiring the contactor for a load in a BMS shed group. If the outstation loses power, what state should the contactor normally fail to?',
    options: [
      'Off, until the BMS is restored and restores it',
      'Cycling on and off at the group’s maximum off-time',
      'Tripped, with the supply breaker opening to protect it',
      'On, running normally as the design intends',
    ],
    correctAnswer: 3,
    explanation:
      'For most sheddable loads the design wants them on and running normally if the BMS output fails, and that is chosen with normally closed or normally open contacts at the design stage. Failing off would leave loads shed indefinitely whenever the BMS is down, which is exactly what a shed scheme must not do.',
    section: '3.4',
    difficulty: 'intermediate',
    topic: 'Load shedding wiring',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3019,
    question:
      'A VAV supply fan hunts. The duct pressure sensor is wired straight to the drive, and the BMS only sends the drive an enable. Where does fault finding on the control loop start?',
    options: [
      'At the drive’s own PID settings and its sensor wiring',
      'At the outstation PI loop that holds the duct pressure',
      'At the BMS 0–10 V speed reference output to the drive',
      'At the airflow loops inside each of the VAV boxes',
    ],
    correctAnswer: 0,
    explanation:
      'There are two common ways to close the loop: in the BMS outstation, or in the drive’s own PID function with the sensor wired to the drive. Here the drive holds the setpoint, so that is where the loop lives. Looking at a BMS PI loop or speed reference that is not in use is the trap of assuming which arrangement was built.',
    section: '3.4',
    difficulty: 'intermediate',
    topic: 'Controlling a drive from the BMS',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3020,
    question:
      'An AHU runs duct pressure reset based on VAV box damper positions. After a network change, box data stops updating at the AHU controller, and that afternoon a zone at the far end of the system is starved of air while the rest are fine. What is the most likely cause?',
    options: [
      'The supply fan drive has tripped out on its motor overload',
      'The far zone’s VAV damper has failed fully open',
      'The reset used stale data and dropped the setpoint too far',
      'The CO2 sensor in the far zone has drifted and now reads well high',
    ],
    correctAnswer: 2,
    explanation:
      'Reset routines depend on the AHU controller reading the boxes. With missing or stale data, a reset can hold the pressure high or, worse, drop it too far and starve a zone, and the worst-placed zone suffers first. A tripped fan would starve every zone, and a damper stuck open lets more air in, not less.',
    section: '3.4',
    difficulty: 'advanced',
    topic: 'Pressure reset',
    category: 'Controlling heating, ventilation and air conditioning',
  },

  // ── 3.5 Overrides, frost protection and seasonal change ──────────────
  {
    id: 3021,
    question:
      'In a well-designed starter panel, what does turning the Hand/Off/Auto selector to Hand cut out?',
    options: [
      'The BMS enable and the motor overload',
      'The BMS enable and nothing else',
      'Every contact in the coil circuit',
      'The fire stop, but not the overload',
    ],
    correctAnswer: 1,
    explanation:
      'In a well-designed panel Hand bypasses the BMS enable only. The fire stop, overload, emergency stop and hardwired plant safeties sit before the switch and still act in Hand. A panel where Hand skips a safety device has a defect that should be reported.',
    section: '3.5',
    difficulty: 'basic',
    topic: 'Hand/Off/Auto',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3022,
    question:
      'To test some logic, an engineer overrode a space temperature input to a typed-in value and forgot to release it. What will the plant do from then on?',
    options: [
      'Control against a fixed number unrelated to the room',
      'Raise a sensor fault alarm because the value is frozen',
      'Ignore the typed value at the next controller scan',
      'Shut the zone down until the sensor is replaced',
    ],
    correctAnswer: 0,
    explanation:
      'An overridden input makes the strategy use the typed value instead of the sensor, so the plant is controlled against a number that has nothing to do with the room. It also masks faults: a sensor that fails behind the override goes unnoticed. Nothing about an override clears itself unless it was applied as a timed override.',
    section: '3.5',
    difficulty: 'intermediate',
    topic: 'Head end overrides',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3023,
    question:
      'During a long summer shutdown, a heating pump briefly runs every so often although no heating is called and the weather is warm. What is the most likely routine?',
    options: [
      'Stage one of the frost protection routine',
      'Building protection against condensation',
      'Optimum start pre-heating the building',
      'Plant protection against seized pumps',
    ],
    correctAnswer: 3,
    explanation:
      'Plant protection runs idle plant for short periods during a long shutdown so pumps and valves do not seize. Frost stage one is triggered by outside air reaching the frost setpoint, which a warm summer does not do, and building protection works on a low room temperature, bringing the heating on, not briefly running a pump.',
    section: '3.5',
    difficulty: 'intermediate',
    topic: 'Plant protection',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3024,
    question:
      'On a spring afternoon, a room served by a two-pipe fan coil asks for cooling but receives warm air. What is the most likely cause?',
    options: [
      'The neutral zone between setpoints is too wide',
      'Optimum stop has switched the cooling off early',
      'Changeover has left heating water in the coil',
      'The fan coil valve loop has been set direct acting',
    ],
    correctAnswer: 2,
    explanation:
      'A two-pipe unit has one coil for both duties, so the changeover signal decides whether heating or chilled water is in it. A wrong changeover gives a room heat when it asked for cooling, and the transition season is where this happens. A wide neutral zone only lets the room float; it does not deliver heat.',
    section: '3.5',
    difficulty: 'intermediate',
    topic: 'Seasonal changeover',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3025,
    question:
      'On a changeable spring day, automatic changeover flips a building between heating and cooling modes several times an hour. What is most likely missing?',
    options: [
      'A gap and a time delay on the changeover switching',
      'A higher frost setpoint on the outside air sensor',
      'Optimum stop on the heating plant in the afternoons',
      'Derivative action on the room temperature loops',
    ],
    correctAnswer: 0,
    explanation:
      'Automatic changeover on outside temperature needs a gap between the switching points and a time delay, so the plant does not flip back and forth on a changeable day. The frost setpoint, optimum stop and loop tuning do not decide which mode the building is in.',
    section: '3.5',
    difficulty: 'advanced',
    topic: 'Seasonal changeover',
    category: 'Controlling heating, ventilation and air conditioning',
  },

  // ── 3.6 Plant safety interlocks and shutdowns ────────────────────────
  {
    id: 3026,
    question:
      'A fan is proved by a current sensing relay on its motor lead. Which fault can that relay miss?',
    options: [
      'A tripped motor overload in the starter',
      'A dead motor drawing no current at all',
      'A blown fuse in the control circuit',
      'A snapped belt with the motor turning',
    ],
    correctAnswer: 3,
    explanation:
      'A current relay proves the motor is drawing current, so it catches a tripped overload, a dead motor or a lost control supply. With a snapped belt the motor still turns and draws current while no air moves. A differential pressure or airflow switch, which sees the air itself, would catch it.',
    section: '3.6',
    difficulty: 'basic',
    topic: 'Fan and pump proving',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3027,
    question:
      'A client wants the BMS to say exactly which safety tripped an AHU, not just “fan failed”. How should you provide that?',
    options: [
      'A spare volt-free contact or separate status input from each safety',
      'Route each safety through a BMS input and let the strategy stop the fan',
      'Infer it from the mismatch between fan command and fan status',
      'Read the high-limit value from the supply air control sensor',
    ],
    correctAnswer: 0,
    explanation:
      'Status should be kept separate from protection: each safety stays in the hardwired chain, and a spare volt-free contact or separate input copies its state to the BMS. Routing the safety itself through a BMS input and output makes the protection depend on software. A command and status mismatch only tells you the fan failed, not which device caused it.',
    section: '3.6',
    difficulty: 'intermediate',
    topic: 'Monitoring safeties',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3028,
    question:
      'You have opened the main isolator on an AHU starter panel that carries BMS wiring. Why can you not assume every circuit in the safety chain is now dead?',
    options: [
      'The control transformer stores enough charge to hold contactors in',
      'The outstation back-feeds the panel through its 0–10 V analogue outputs',
      'Separate control, relay and fire alarm interface supplies may remain',
      'Hardwired safeties are always fed from an uninterruptible supply',
    ],
    correctAnswer: 2,
    explanation:
      'A starter panel with BMS wiring can carry a separate control supply, interposing relays fed from the outstation and fire alarm interface circuits from another panel altogether, so opening the main isolator may not kill every circuit. The other options invent mechanisms that are not the reason; the real point is multiple supplies from different sources.',
    section: '3.6',
    difficulty: 'intermediate',
    topic: 'Safe isolation of control panels',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3029,
    question:
      'A pump trips on its overload three times within an hour, and the BMS strategy now holds it off with an alarm instead of trying again. Is that correct behaviour?',
    options: [
      'No, the BMS should keep re-sending the start command until it runs',
      'Yes, it stops the cycling while the overload still protects',
      'No, the BMS should reset the overload remotely and restart',
      'Yes, because the trip counter now replaces the overload',
    ],
    correctAnswer: 1,
    explanation:
      'A trip counter that holds plant off after repeated trips is a sensible software feature: it stops the motor being cycled into a fault, while the hardwired overload still does the protecting. Hammering the start, or resetting a hardwired safety remotely, is the strategy fighting its safeties. The counter adds to the protection; it does not replace it.',
    section: '3.6',
    difficulty: 'intermediate',
    topic: 'Restart after a trip',
    category: 'Controlling heating, ventilation and air conditioning',
  },
  {
    id: 3030,
    question:
      'To prove an electric heater battery airflow interlock at commissioning, a colleague suggests forcing the BMS airflow status point to “no flow” and watching the heater drop out. What is wrong with that test?',
    options: [
      'It proves the software only; operate the airflow switch',
      'Nothing, as long as the forced point is released at the end',
      'It should be done with the heater selector in Auto only',
      'It needs the fire alarm engineer present to witness it',
    ],
    correctAnswer: 0,
    explanation:
      'Simulating by forcing a BMS point proves the software, not the wiring. The airflow interlock is in the heater contactor coil circuit, so it is proved by operating the device for real and confirming the heater cannot run in every selector position, including Hand. Releasing the forced point afterwards is good practice but does not make it a test of the hardwired safety.',
    section: '3.6',
    difficulty: 'advanced',
    topic: 'Testing interlocks',
    category: 'Controlling heating, ventilation and air conditioning',
  },
];
