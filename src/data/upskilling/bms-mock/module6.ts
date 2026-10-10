import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule6: StandardMockQuestion[] = [
  // ---------------- 6.1 Alarms ----------------
  {
    id: 6001,
    question:
      'A chiller was decommissioned months ago, but its fault alarm still sits active in the alarm list. What is the right action?',
    options: [
      'Leave it, as everyone already knows the chiller is out of use',
      'Acknowledge it each morning so it stays in the history',
      'Take the point out of service formally, recording why',
      'Raise its priority so the decommissioning is finished faster',
    ],
    correctAnswer: 2,
    explanation:
      'Standing alarms clutter the list and make genuine new alarms harder to spot. Plant that is not coming back should have its point taken out of service formally, with a record of why. Leaving it, or acknowledging it daily, trains people to ignore the list.',
    section: '6.1',
    difficulty: 'basic',
    topic: 'Standing alarms',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6002,
    question:
      'A duct temperature sensor has high and low alarm limits set just outside anything the real air temperature could ever reach. Which family of alarm is that set up to catch?',
    options: [
      'Out-of-limits on the real supply air temperature',
      'Sensor failure, such as an open circuit',
      'Command and status mismatch on the supply fan',
      'Maintenance due on the filter upstream of it',
    ],
    correctAnswer: 1,
    explanation:
      'A reading far beyond the physical range almost certainly means the sensor has gone open or short circuit, not that a real event has happened. Limits placed there catch a failed sensor. Out-of-limits alarms sit inside the real range, where an abnormal but genuine value would land.',
    section: '6.1',
    difficulty: 'basic',
    topic: 'Sources of alarms',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6003,
    question:
      'A duty heating pump fails. On site A the standby pump has started and proved flow. On site B the standby is out of service. How should the two alarms be prioritised?',
    options: [
      'High on both sites, because a pump failure is always serious',
      'Medium on both sites, because it is the same plant item failing',
      'High on site A, because both pumps have now been called on',
      'Medium on site A and high on site B, where nothing is running',
    ],
    correctAnswer: 3,
    explanation:
      'Priority comes from consequence and time to act. With the standby proven, nothing bad happens if nobody responds for a few hours, so it is medium. With no standby, heat is lost and somebody must act soon, so it is high. Priority belongs to the situation, not to the name of the plant item.',
    section: '6.1',
    difficulty: 'intermediate',
    topic: 'Alarm priorities',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6004,
    question:
      'An AHU supply fan fails. Moments later the same AHU raises a low supply air temperature alarm. What should a well-configured system do with the second alarm?',
    options: [
      'Delete it, since it only repeats what the fan alarm already says',
      'Suppress it while the fan alarm is active, but still log it in order',
      'Raise it to high priority, as two alarms must point to a bigger fault',
      'Send it to the duty engineer separately from the fan failure alarm',
    ],
    correctAnswer: 1,
    explanation:
      'The low temperature is a consequence of the fan failure, not a second fault, so consequential alarm suppression holds it back while the parent alarm is active. Suppressing is fine; losing is not, so it should still reach the log in the right time order. Deleting it is the tempting wrong answer because it throws away the record.',
    section: '6.1',
    difficulty: 'intermediate',
    topic: 'Alarm floods and suppression',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6005,
    question:
      'At commissioning, a pump trip input shows “fault” on the head end while the pump is healthy. A colleague suggests moving the core from the normally closed to the normally open terminal so the point reads correctly. What is the better course?',
    options: [
      'Move the core, so that the head end matches the plant on the day',
      'Invert the input in software so the point reads healthy now',
      'Check the wiring and contact against the points schedule first',
      'Inhibit the alarm until the controls engineer next visits site',
    ],
    correctAnswer: 2,
    explanation:
      'Trip and fault inputs are normally chosen to be closed when healthy, so a broken wire or lost supply shows as an alarm. Swapping to the other contact to make it read right on the day can leave a point that shows healthy with a cut cable. Wire to the points schedule and find out why it disagrees; do not swap contacts or hide it in software.',
    section: '6.1',
    difficulty: 'advanced',
    topic: 'Wiring alarm inputs',
    category: 'Alarms, data and monitoring',
  },

  // ---------------- 6.2 Trend logging ----------------
  {
    id: 6006,
    question:
      'What typically happens when an outstation’s trend storage fills before the head end has collected it?',
    options: [
      'The outstation sends every stored sample straight to the alarm list',
      'The outstation pauses the plant until collection has resumed',
      'The head end rebuilds the missing samples from the graphics',
      'Depending on set-up, the oldest are overwritten or logging stops',
    ],
    correctAnswer: 3,
    explanation:
      'Outstation storage is finite and sized for recent data, not years. What happens when it fills depends on configuration: typically the oldest samples are overwritten, or the log stops. Nothing can rebuild samples that were never collected, which is why the outstation buffer is a holding area, never the record.',
    section: '6.2',
    difficulty: 'basic',
    topic: 'Where trend data lives',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6007,
    question: 'Which logging method usually suits a digital point such as a fan run status?',
    options: [
      'Change of value, catching each change of state as it happens',
      'Interval logging at a long period, to save outstation storage space',
      'Interval logging at the shortest period the outstation allows',
      'No logging, because digital points cannot be trended at all',
    ],
    correctAnswer: 0,
    explanation:
      'Change-of-value logging stores a sample when a digital point changes state, so a fan starting or stopping is caught at the moment it happens and a point sitting still costs nothing. A long interval could miss short runs entirely, and a very short interval fills storage for no gain.',
    section: '6.2',
    difficulty: 'basic',
    topic: 'Interval and change-of-value logging',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6008,
    question:
      'Occupants complain that supply air swings between warm and cool, but the permanent trend of supply air temperature after the heating coil looks steady. The log uses a long interval. What is the sensible next step?',
    options: [
      'Close the complaint, as the trend shows the loop is stable',
      'Replace the supply air sensor, as it must be reading wrongly',
      'Add a temporary short-interval log on that loop and review it',
      'Change every point on the site to the shortest interval possible',
    ],
    correctAnswer: 2,
    explanation:
      'If the interval is longer than the swing, the samples land at random points on it and the trend can look like noise or even steady. Supply air after a coil is a fast quantity. A temporary short-interval log on the loop under investigation is the usual compromise; doing it site-wide fills storage and loads the network.',
    section: '6.2',
    difficulty: 'intermediate',
    topic: 'Choosing a logging interval',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6009,
    question:
      'A trend shows a heating valve output moving up and down all day, while the room temperature stays close to its setpoint throughout. What does that most likely show?',
    options: [
      'A faulty actuator that should be replaced at the next visit',
      'A controller absorbing load changes, which is its job',
      'A hunting loop that needs detuning to calm the output',
      'A room sensor that has stopped updating its reading',
    ],
    correctAnswer: 1,
    explanation:
      'Judge a loop by the process value against setpoint first. A busy output with a steady process value is the controller adjusting to changes in load so the space does not see them. Detuning it to calm the output is the tempting mistake; the room then drifts every time the load changes. Hunting shows as the process value swinging too.',
    section: '6.2',
    difficulty: 'intermediate',
    topic: 'Reading a trend',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6010,
    question:
      'A week-long trend shows an AHU starting on some nights but not others, with command and run status both on together. The outside air temperature trend shows those were the coldest nights. What is the best reading?',
    options: [
      'An override left on at the head end, which needs clearing first',
      'A wrong time schedule, which needs correcting on the head end',
      'A faulty airflow switch giving a false run status on cold nights',
      'Likely frost protection; check it against outside temperature',
    ],
    correctAnswer: 3,
    explanation:
      'Plant that starts on cold nights and stops when it warms is often frost protection doing its job, which is correct. Check the outside temperature against the frost settings before calling it a fault. An override would ignore the weather, a wrong schedule would repeat at the same time every night, and command and status agreeing argues against a false status.',
    section: '6.2',
    difficulty: 'advanced',
    topic: 'Out-of-hours running',
    category: 'Alarms, data and monitoring',
  },

  // ---------------- 6.3 Graphics and dashboards ----------------
  {
    id: 6011,
    question:
      'The head-end PC is shut down for a software update. What normally happens to control of the plant?',
    options: [
      'It carries on, because the strategies run in the controllers',
      'It stops, because the head end sends every plant command',
      'It falls back to hand on every starter until the PC returns',
      'It holds every output at its last known value until the PC returns',
    ],
    correctAnswer: 0,
    explanation:
      'The head end is where people view and adjust the system; it normally does very little controlling. The strategies run in the outstations and controllers, which carry on whether anyone is looking or not. What you lose while it is down is visibility, adjustment and override from that screen.',
    section: '6.3',
    difficulty: 'basic',
    topic: 'What the head end does',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6012,
    question:
      'Why should a word or symbol such as FAULT, OFF or HAND always go with a status colour on a graphic?',
    options: [
      'Because colours cannot be stored in the points schedule',
      'Because the word is what raises the alarm at the head end',
      'Because people see colour differently and screens are often poor',
      'Because colours change between the operator and the engineer levels',
    ],
    correctAnswer: 2,
    explanation:
      'Colour is the fastest way to draw the eye, but it should never be the only cue. People do not all see colour the same way, and screens in plant rooms are often poor. The colour scheme should also be the same across the site and written down where operators can see it.',
    section: '6.3',
    difficulty: 'basic',
    topic: 'Colour and status on graphics',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6013,
    question:
      'A fan’s run status on the graphic comes from an auxiliary contact on its contactor. The fan belt snaps while the fan is commanded on. What will the graphic most likely show?',
    options: [
      'Fail to start, because air has stopped moving through the unit',
      'A sensor fault flag on the supply air temperature point',
      'Commanded on but not proven, raised as an alarm after a delay',
      'Running as normal, because the contactor is still pulled in',
    ],
    correctAnswer: 3,
    explanation:
      'An auxiliary contact proves the contactor pulled in; it does not prove the belt is on the fan. With the contactor still in, the status stays “running”. A differential pressure switch across the fan would prove air is moving and would have shown the mismatch. Knowing which device the site uses tells you how much to read into a green fan.',
    section: '6.3',
    difficulty: 'intermediate',
    topic: 'Command and status',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6014,
    question:
      'A dashboard figure for total building electricity has dropped sharply overnight with no change in how the building is used. What should you do before discussing what it means?',
    options: [
      'Trace the figure back to the meter points behind it',
      'Report the drop to the client as an energy saving this month',
      'Ask for the dashboard to be rebuilt on a different page layout',
      'Wait a month to see whether the new lower figure holds steady',
    ],
    correctAnswer: 0,
    explanation:
      'Dashboard figures are often calculated from several points. A sub-meter left out of a total, a wrong pulse value or a failed point produces a clean-looking figure that is simply wrong. Drill down to the points behind it first. Reporting it as a saving is the tempting error: the data may not be real.',
    section: '6.3',
    difficulty: 'intermediate',
    topic: 'Dashboards and calculated values',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6015,
    question:
      'A month after handover, an AHU supply air temperature on the graphic has shown a steady, believable value for weeks while the heating coil valve output sits pinned at one end. The override summary lists that sensor point. What is the most likely explanation?',
    options: [
      'The heating valve has seized, so the actuator needs replacing now',
      'An override is holding the sensor value; release it and check',
      'The loop is tuned too aggressively and needs a retune',
      'The graphic is linked to the wrong point and needs relinking',
    ],
    correctAnswer: 1,
    explanation:
      'A sensor value overridden to a fixed number to get a loop running during commissioning is a known trap: the graphic shows a sensible temperature and the real sensor may never be checked again. The loop is controlling to a fake value. Release the override, then compare the real reading with a calibrated instrument. The override summary is the clue that rules out the other answers.',
    section: '6.3',
    difficulty: 'advanced',
    topic: 'Overrides',
    category: 'Alarms, data and monitoring',
  },

  // ---------------- 6.4 Energy monitoring and reporting ----------------
  {
    id: 6016,
    question:
      'Approved Document L (England, 2021 edition) para 5.17 asks for each fuel to be sub-metered by end use well enough that what share of its yearly consumption can be put down to a particular use?',
    options: ['At least 50%', 'At least 75%', 'At least 90%', 'All of it, 100%'],
    correctAnswer: 2,
    explanation:
      'Para 5.17 (para 4.19 in the 2026 edition, from 24 March 2027) aims for at least 90% of each fuel’s yearly consumption to be attributable to a particular use, such as heating, lighting or cooling. It also asks for each tenant’s use to be measured and renewable outputs to be monitored separately.',
    section: '6.4',
    difficulty: 'basic',
    topic: 'Sub-metering requirements',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6017,
    question: 'On a daily electricity load profile, what do the “shoulders” show?',
    options: [
      'The lowest level the building settles to when it is empty',
      'When use rises in the morning and falls in the evening',
      'The highest demand of the day and what was running then',
      'The share of the day’s energy used by heating and cooling',
    ],
    correctAnswer: 1,
    explanation:
      'The shoulders are when consumption rises in the morning and falls in the evening, compared with the hours the building is actually used. The floor is the baseload and the peak is the highest demand. Shoulders well outside the occupied hours are an early sign of plant starting too early or running too late.',
    section: '6.4',
    difficulty: 'basic',
    topic: 'Reading a load profile',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6018,
    question:
      'A heat meter was replaced on a Tuesday. The next monthly report shows a huge negative consumption for that day. What is the likely cause, and what should happen?',
    options: [
      'The new meter is faulty and should be sent back to the maker',
      'The building exported heat that day, so the figure is genuine',
      'The degree day data for that day was missing from the report',
      'The new meter started at a different reading; mark the step',
    ],
    correctAnswer: 3,
    explanation:
      'Accumulating meters roll over or reset, and a replaced meter starts from a different register value. That appears as a huge step, which analysis software treats as real consumption unless somebody marks it. Telling the controls engineer when a meter is replaced lets the jump be marked and the scaling checked.',
    section: '6.4',
    difficulty: 'intermediate',
    topic: 'Meter data quality',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6019,
    question:
      'You are fitting CTs for a new CT-connected sub-meter that the BMS will read. Which check does most to make sure the BMS data is right?',
    options: [
      'CTs on the right phases, right way round, ratio set in the meter',
      'CTs fitted as close to the outstation as the cable route allows',
      'The meter labelled after commissioning, once the data looks right',
      'The pulse output wired to the outstation before the CTs are fitted',
    ],
    correctAnswer: 0,
    explanation:
      'A CT-connected meter depends on the CT ratio being set and the CTs fitted the right way round on the right phases. A reversed CT or one on the wrong phase gives numbers that look plausible and are wrong. Labels should match what the meter really serves from the start, not be fitted to suit the data.',
    section: '6.4',
    difficulty: 'intermediate',
    topic: 'Meters and the electrician’s part',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6020,
    question:
      'Gas use this January is clearly lower than last January. A controls change was made in the autumn and the client wants the report to credit it. Degree days show this January was much milder. What should the report do?',
    options: [
      'Credit the fall to the controls change, as the meters show it',
      'Compare use per degree day before crediting anything to the change',
      'State a percentage saving, since before and after totals both exist',
      'Leave the fall out, as January gas use always varies too much',
    ],
    correctAnswer: 1,
    explanation:
      'Heating demand follows the weather, so a milder month uses less gas in a healthy building. Normalising against degree days shows whether use per unit of cold weather really changed. Crediting the change from raw totals lets the weather take the credit, and a saving figure should only be stated if it was measured that way, with the method given.',
    section: '6.4',
    difficulty: 'advanced',
    topic: 'Comparing like with like',
    category: 'Alarms, data and monitoring',
  },

  // ---------------- 6.5 Fire alarm and life safety interfaces ----------------
  {
    id: 6021,
    question:
      'Which code of practice covers how a fire alarm signal operates other fire protection measures, such as door release and smoke control?',
    options: ['BS 5839-1', 'The BS 7273 series', 'BS 7671 Section 557', 'BS EN 50174-2'],
    correctAnswer: 1,
    explanation:
      'The BS 7273 series covers the operation of fire protection measures by a fire alarm signal. BS 5839-1 is the code of practice for fire detection and alarm systems in non-domestic buildings themselves. Both are written for fire specialists; the fire strategy and the fire alarm designer decide what operates what.',
    section: '6.5',
    difficulty: 'basic',
    topic: 'Fire codes of practice',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6022,
    question:
      'A drawing shows an AHU fire stop as a contact that closes on fire to energise a stop relay. Compared with the usual arrangement, what is its weakness?',
    options: [
      'It lets the BMS reset the stop relay from the head end',
      'It needs a second volt-free contact to tell the BMS',
      'It stops the plant every time a terminal works loose',
      'A broken wire means the stop never happens, unnoticed',
    ],
    correctAnswer: 3,
    explanation:
      'The usual fire stop is a contact closed in normal conditions that opens on fire, wired in series in the control circuit, so a cut cable or loose terminal stops the plant: a safe nuisance that gets noticed. A contact that closes on fire can fail silently. The designer decides the arrangement, but you should know which one fails safe.',
    section: '6.5',
    difficulty: 'intermediate',
    topic: 'Fail-safe fire stop wiring',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6023,
    question:
      'An AHU fan runs on a variable speed drive. On fire, the only thing that happens is that the BMS enable to the drive is removed. What is the risk?',
    options: [
      'The drive can still be started from its own keypad during a fire',
      'The drive will trip on overcurrent when the enable is removed',
      'The BMS will log the fire event against the wrong plant item',
      'The fan will run on at minimum speed until the fire alarm is reset',
    ],
    correctAnswer: 0,
    explanation:
      'A drive stopped only by removing the BMS enable or speed reference can still be run from its own keypad, and the stop depends on the BMS. A fire signal must take priority over every hand and automatic command, so the fire stop goes where the drive designer and fire alarm designer have agreed it will stop the drive regardless of how it is commanded.',
    section: '6.5',
    difficulty: 'intermediate',
    topic: 'Fire priority',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6024,
    question:
      'Tracing an existing AHU’s fire interface, you find the interface contact goes only to a BMS digital input, and a line in the strategy stops the fan on fire. The fire interface is outside your scope. What should you do?',
    options: [
      'Leave it, as it has worked at every fire drill so far',
      'Move the fire stop into the starter yourself while you are there',
      'Report it in writing to the client and the responsible person',
      'Add a second BMS rule so the fan also stops on comms loss',
    ],
    correctAnswer: 2,
    explanation:
      'A fire stop that lives only in BMS code fails when the outstation is offline, when an operator overrides the fan, or when the starter is put in Hand. Anything relying on the BMS for a life-safety action is reported to the client and the building’s responsible person in writing, even if it is outside your scope. Rewiring the fire interface without the fire alarm designer is not yours to do.',
    section: '6.5',
    difficulty: 'intermediate',
    topic: 'Existing fire interfaces',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6025,
    question:
      'An AHU will not start because its fire interface contact has failed open. The building manager asks you to link out the fire terminals in the starter “just until the part arrives”. What do you do?',
    options: [
      'Fit the link, and label it clearly with today’s date',
      'Fit the link, and add a BMS alarm to remind you to remove it',
      'Report it as a fire alarm fault, not a plant fault',
      'Run the fan from a BMS override until the part arrives',
    ],
    correctAnswer: 2,
    explanation:
      'An open fire stop is a fire alarm fault, not a plant fault. It goes to the building’s responsible person and the fire alarm contractor, who decide what temporary measures are acceptable under the fire strategy. A link, however well labelled, means the AHU no longer stops on fire. A BMS override cannot run it anyway, because the open fire contact breaks the control circuit downstream of the BMS.',
    section: '6.5',
    difficulty: 'advanced',
    topic: 'Never bridge a fire stop',
    category: 'Alarms, data and monitoring',
  },

  // ---------------- 6.6 Remote access and monitoring ----------------
  {
    id: 6026,
    question: 'Which of these best describes bureau monitoring of a BMS?',
    options: [
      'A supplier engineer dials in to load a corrected control strategy',
      'The BMS sends an email to the duty engineer when an alarm is raised',
      'A head end in the plant room shows alarms to whoever walks past',
      'One centre watches many sites and escalates what it cannot handle',
    ],
    correctAnswer: 3,
    explanation:
      'Bureau monitoring is a controls company or specialist centre watching many sites from one place, dealing with routine alarms and escalating the rest. Loading a strategy is support and diagnostics, and an email to the duty engineer is alarm notification. A screen nobody watches is what remote monitoring exists to replace.',
    section: '6.6',
    difficulty: 'basic',
    topic: 'What remote monitoring is for',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6027,
    question:
      'A client’s new remote access gateway lets suppliers in with a named account and a long password only. What should be added for access from outside?',
    options: [
      'A hard-to-phish second factor, like an authenticator app',
      'A shared engineer account so every supplier uses one route',
      'A forwarded port to the head end as a backup way in',
      'A password changed once a year by the controls contractor',
    ],
    correctAnswer: 0,
    explanation:
      'A good password on its own is no longer enough for access from outside. A second factor of a type that is hard to phish, such as an authenticator app or a security key, should be required on the broker or gateway. A shared account destroys the meaning of the log, and a forwarded port puts the BMS on the open internet.',
    section: '6.6',
    difficulty: 'intermediate',
    topic: 'Strong authentication',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6028,
    question:
      'You are terminating new data outlets for BMS panels. The controls engineer suggests patching them into the nearest general office network switch to save a cable run. What should you do?',
    options: [
      'Patch them in as asked, as the controls engineer owns the BMS',
      'Confirm with the client’s IT team which network the BMS joins',
      'Patch them in and set up a firewall rule on the switch yourself',
      'Leave them unpatched and hand the outlets over as complete',
    ],
    correctAnswer: 1,
    explanation:
      'BMS traffic is normally kept on its own network or segment, separate from the office network, and patching into the wrong place can undo that segmentation. Find out whose network each point joins and label outlets as BMS. Configuring switches and firewalls is for the client’s IT team and the controls contractor, not the electrician.',
    section: '6.6',
    difficulty: 'intermediate',
    topic: 'Network points and cabling',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6029,
    question: 'At handover of a BMS with remote access, which task belongs on the checklist?',
    options: [
      'Change every default password and remove test accounts',
      "Leave the commissioning engineer's account active for support",
      'Keep a forwarded port open until the defects period ends',
      'Share one engineer login among all of the suppliers',
    ],
    correctAnswer: 0,
    explanation:
      'At handover, default passwords should all have been changed, test accounts removed, and any remote connection outside the agreed arrangement taken out. Leftover commissioning accounts and forwarded ports are open doors, and a shared login makes the access log meaningless.',
    section: '6.6',
    difficulty: 'intermediate',
    topic: 'Remote access at handover',
    category: 'Alarms, data and monitoring',
  },
  {
    id: 6030,
    question:
      'During a boiler room refurbishment you find the boiler fault alarm leaves site through an old GSM text-message unit. The client asks you to fit an identical new unit. What is the better response?',
    options: [
      'Fit the identical unit, as it has sent alarms reliably for years',
      'Fit it, and add a second identical unit as a backup alarm path',
      'Raise it, so the alarm moves to the agreed, supported route',
      'Remove it, and rely on the head end alarm list from now on',
    ],
    correctAnswer: 2,
    explanation:
      'Legacy mobile networks are being switched off and older units may stop sending without warning, so a like-for-like swap, or two of them, carries the same risk. Raise it with the client and controls contractor so the alarm path moves to the agreed, supported route, and make sure loss of that route is itself alarmed. Relying on a screen nobody watches out of hours defeats the purpose.',
    section: '6.6',
    difficulty: 'advanced',
    topic: 'Legacy alarm paths',
    category: 'Alarms, data and monitoring',
  },
];
