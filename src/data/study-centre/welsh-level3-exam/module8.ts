/**
 * Final paper — Module 8: Fault diagnosis and rectification.
 *
 * Forty-five questions closing the paper. Fault diagnosis is structurally
 * more dangerous than installation, because the fault itself may have made
 * hazards the installation never had — a borrowed neutral, an open PEN,
 * stored energy that survives isolation — so the safety questions here are
 * weighted accordingly.
 *
 * The seven canonical fault types, the diagnostic stages and the boundary of
 * apprentice competence all come from the module's own teaching; every
 * regulation cited was checked.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Dangers and safe working during fault diagnosis ─────────
  {
    id: 356,
    question:
      'Why is fault diagnosis structurally more dangerous than installation work?',
    options: [
      'Because it is usually carried out under time pressure with the customer present',
      'Because the fault itself may have created hazards the installation never had',
      'Because diagnosis requires live working, which installation does not',
      'Because it is more often carried out alone than installation work is',
    ],
    correctAnswer: 1,
    explanation:
      'The installation you are working on is no longer the installation that was designed: a borrowed neutral, induced voltage, a compromised CPC or an open PEN can all be present, and none of them announces itself. Time pressure and lone working are real aggravating factors rather than the structural reason, and diagnosis does not require live working — dead working remains the default under EAWR Regulation 13.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'intermediate',
    topic: 'Why diagnosis is different',
    reference: 'Module 8, Section 1 — Fault diagnosis is structurally more dangerous',
  },
  {
    id: 357,
    question:
      'Before starting work on a TN-C-S supply, what reading should be taken at the cut-out and why?',
    options: [
      'Line to earth, to confirm the supply polarity',
      'Neutral to earth — more than a few volts suggests an open PEN, which a normal RCD will not detect',
      'Line to neutral, to confirm the supply is within the ESQCR tolerance',
      'Earth to earth electrode, to confirm the bonding is continuous',
    ],
    correctAnswer: 1,
    explanation:
      'An open PEN is the supply-side hazard a normal RCD does not see, and a neutral-to-earth voltage at the cut-out is the diagnostic for it — anything more than a few volts means stop. Line to earth and line to neutral confirm the supply is present and within tolerance, which tells you nothing about the PEN. And a TN-C-S installation has no installation electrode to test against.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'advanced',
    topic: 'Open PEN',
    reference: 'Module 8, Section 1 — Supply-side hazards',
  },
  {
    id: 358,
    question:
      'What is a borrowed neutral, and why does it matter during fault diagnosis?',
    options: [
      'A neutral shared between two circuits — it can make a circuit you have isolated still live',
      'A neutral connected to earth at a point other than the origin — it raises the earth potential',
      'A neutral of smaller cross-sectional area than the line conductor — it overheats under harmonic load',
      'A neutral used as a protective conductor — it removes fault protection from the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'A borrowed neutral takes the return for one circuit through another circuit’s neutral, so isolating your circuit at the board leaves a live conductor in the accessory you have opened — it is the classic "I thought it was dead" cause of electrician shock, and it is why you prove dead at the work point rather than at the board. The other three describe a neutral-earth fault, an undersized neutral and a PEN arrangement: all real conditions, none of them this one.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'advanced',
    topic: 'Borrowed neutrals',
    reference: 'BS 7671 Regulation 314.4',
  },
  {
    id: 359,
    question:
      'A drive and a capacitor bank have been isolated. What remains a hazard, and how is it addressed?',
    options: [
      'Nothing — isolation removes all stored energy from the equipment',
      'Stored energy in the capacitors — discharge through a resistor and verify with a meter',
      'Stored energy in the capacitors — short the terminals with an insulated screwdriver',
      'Residual magnetism in the motor windings — rotate the shaft to dissipate it',
    ],
    correctAnswer: 1,
    explanation:
      'Capacitors, drives, UPS batteries and thermal stores all hold energy after isolation, and the safe route is a controlled discharge through a resistor followed by verification with the meter. Shorting with a screwdriver dumps that energy as an arc across the tool and the terminals — it damages both and can injure you. Residual magnetism is not a stored-energy hazard of this kind.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'intermediate',
    topic: 'Stored energy',
    reference: 'Module 8, Section 1 — Stored energy',
  },
  {
    id: 360,
    question:
      'Where should you prove dead when investigating a fault?',
    options: [
      'At the distribution board, immediately after opening the protective device',
      'At the point of work, before anything is disturbed',
      'At the nearest accessible socket-outlet on the same circuit',
      'At both the board and the work point, in that order',
    ],
    correctAnswer: 1,
    explanation:
      'At the point where you are going to put your hands — because a borrowed neutral, a backfeed or a mis-identified circuit all produce a dead reading at the board and a live conductor where you are working. The nearest socket is a different point again. Proving at the board as well is no bad thing, but it is the reading at the work point that keeps you alive.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'basic',
    topic: 'Proving dead at the work point',
    reference: 'HSE GS38 · EAWR 1989 Regulation 13',
  },
  {
    id: 361,
    question:
      'A senior colleague asks you, as an apprentice, to act as the safety cover for their live working. What is the right response?',
    options: [
      'Accept, since observing does not require the competence that the work does',
      'Accept, provided you have completed safe isolation training',
      'Decline politely, suggest a prop to hold the item instead, and escalate if pressed',
      'Accept, but only if a permit to work has been issued for the task',
    ],
    correctAnswer: 2,
    explanation:
      'The cover person’s role is observation and, if it goes wrong, rescue — which is exactly the situation that demands the most competence, not the least. Declining is the correct answer and the suggestion of a mechanical alternative keeps it constructive; escalating if pressed is part of the same duty. Isolation training and a permit both address other things and neither makes an apprentice the right person to pull somebody off a live conductor.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'intermediate',
    topic: 'The limits of apprentice scope',
    reference: 'EAWR 1989 Regulation 16',
  },
  {
    id: 362,
    question:
      'Why does a generic RAMS not satisfy MHSWR Regulation 3 for a fault investigation?',
    options: [
      'Because a fault investigation is always higher risk than installation work',
      'Because the outcome is not yet known, so the assessment cannot be suitable and sufficient in advance',
      'Because MHSWR requires a separate RAMS for every operative on site',
      'Because fault investigation falls under EAWR rather than MHSWR',
    ],
    correctAnswer: 1,
    explanation:
      'You are going somewhere to find out what is wrong, so a document written before anyone knew what was wrong cannot be suitable and sufficient for it — which is why the dynamic assessment on the day carries so much of the weight in diagnosis. Fault work is not automatically higher risk than every installation task, MHSWR does not require a per-operative document, and both sets of regulations apply at once.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'advanced',
    topic: 'RAMS for diagnosis',
    reference: 'MHSWR 1999 Regulation 3',
  },
  {
    id: 363,
    question:
      'A fault is reported in an area classified as a hazardous zone under DSEAR. What does that change?',
    options: [
      'Nothing, provided the atmosphere is tested and found below the lower explosive limit first',
      'Intrinsically safe instruments are required, and hot work needs a permit',
      'Standard instruments may be used once the area has been mechanically ventilated',
      'Instruments are unrestricted, but the work must be carried out by two people',
    ],
    correctAnswer: 1,
    explanation:
      'A classified zone — gas Zone 0, 1 or 2, or dust Zone 20, 21 or 22 — means an instrument must be intrinsically safe, because an ordinary one can produce the spark or the surface temperature that ignites the atmosphere, and any hot work needs its own permit. A reading below the LEL is a snapshot rather than a guarantee for the duration of the work, and ventilation reduces the risk without reclassifying the zone. A second person is a control for other hazards and does nothing about an ignition source.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'advanced',
    topic: 'Hazardous area classification',
    reference: 'DSEAR 2002 · Module 8, Section 1 — ATEX zones',
  },
  {
    id: 364,
    question:
      'Why must motor local isolators be switched off before restoring an upstream supply?',
    options: [
      'To prevent the inrush current of several motors coinciding and tripping the upstream device',
      'To prevent auto-restart of motors on supply restoration, which is a major cause of post-fault injuries',
      'To allow the insulation resistance of each motor to be tested independently',
      'To comply with the requirement that isolation be secured at the nearest point to the load',
    ],
    correctAnswer: 1,
    explanation:
      'A motor that restarts by itself when the supply comes back is a mechanical danger to anybody who has approached it during the outage, and PUWER requires the local isolators off before upstream restoration. Coincident inrush is a real design consideration but not the safety reason, testing is a separate activity, and there is no general requirement to secure isolation at the point nearest the load.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'advanced',
    topic: 'Restoring supply safely',
    reference: 'PUWER 1998 · BS 7671 Regulation 552.1.3',
  },
  {
    id: 365,
    question:
      'You find a fluorescent luminaire with a ballast capacitor after isolating the circuit. What is the safe approach?',
    options: [
      'Proceed immediately — isolation has removed the supply, so the capacitor cannot hold charge',
      'Wait about a minute, verify with the meter, and discharge through a 5 to 10 kΩ resistor if needed',
      'Short the capacitor terminals with a screwdriver blade to guarantee it is discharged',
      'Cut the capacitor leads, which discharges it as the conductors part',
    ],
    correctAnswer: 1,
    explanation:
      'Wait, verify with the meter, and discharge through a resistor if it has held charge. Assuming isolation has emptied the capacitor is the assumption the hazard depends on. Shorting with a screwdriver arcs across the tool, and cutting the leads puts the discharge through the cutters and your hand rather than through a resistor.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'intermediate',
    topic: 'Capacitor discharge',
    reference: 'Module 8, Section 1 — Stored energy',
  },
  {
    id: 366,
    question:
      'You are asked to investigate a fault on a lift control panel. What is the correct position?',
    options: [
      'Proceed, since the electrical supply to the panel is within an electrician’s scope',
      'Coordinate with the lift contractor — lifts are specialised plant under LOLER and PUWER',
      'Proceed after isolating the lift at the main switch and posting a notice at each landing',
      'Refer it to the building’s responsible person under the Fire Safety Order',
    ],
    correctAnswer: 1,
    explanation:
      'Lifts and escalators are specialised plant governed by LOLER and PUWER and maintained under their own regime — the electrician coordinates with the lift contractor rather than intervening in the control equipment. Isolating and posting notices manages the supply but does not make the panel yours to work on. The Fire Safety Order responsible person is the route for fire alarm and emergency lighting isolation, a different system.',
    section: 'Dangers and safe working during fault diagnosis',
    difficulty: 'advanced',
    topic: 'Specialised plant',
    reference: 'LOLER 1998 · PUWER 1998',
  },

  // ── Section 2 · Fault information, causes and common locations ──────────
  {
    id: 367,
    question:
      'How should a customer’s description of a fault be treated?',
    options: [
      'As fact, since they have observed the installation over time',
      'As a starting hypothesis to be verified by measurement',
      'As unreliable, and set aside in favour of a full test sequence',
      'As sufficient to determine the fault where the description is detailed',
    ],
    correctAnswer: 1,
    explanation:
      'A structured interview — what, when, where, how long, what they tried, what changed — is the primary diagnostic tool and five minutes of it saves thirty minutes of misdirected testing. But descriptions are approximately right rather than exactly right, so they set the hypothesis and measurement settles it. Treating them as fact imports an untested diagnosis; discarding them throws away the most useful information on site.',
    section: 'Fault information, causes and common locations',
    difficulty: 'intermediate',
    topic: 'The customer interview',
    reference: 'Module 8, Section 2 — Structured customer interview',
  },
  {
    id: 368,
    question:
      'A customer reports a smell of burning plastic near the board. How is this treated?',
    options: [
      'As a routine call-out, investigated in the normal sequence',
      'As urgent — a high-resistance joint at the char point, with a fire risk window open now',
      'As a likely equipment smell, investigated only if it recurs',
      'As a symptom to be correlated with load before any action is taken',
    ],
    correctAnswer: 1,
    explanation:
      'A burning plastic smell is always urgent: something is hot enough to char, which means a high-resistance joint that is already at the fire-risk stage. Isolate immediately and investigate on the same visit. Waiting for it to recur, or correlating it with load first, leaves the condition in service. Correlation with load is a useful diagnostic afterwards, not a reason to delay.',
    section: 'Fault information, causes and common locations',
    difficulty: 'intermediate',
    topic: 'Urgent symptoms',
    reference: 'Module 8, Section 2 — Interpreting symptoms',
  },
  {
    id: 369,
    question:
      'What are the seven canonical fault types?',
    options: [
      'Open circuit, short circuit, earth fault, high-resistance joint, insulation failure, transient voltage, excess current',
      'Open circuit, short circuit, earth fault, overload, undervoltage, overvoltage, harmonics',
      'Wiring fault, equipment fault, control fault, supply fault, mechanical fault, thermal fault, environmental fault',
      'Continuity, insulation, polarity, loop impedance, RCD, functional, mechanical',
    ],
    correctAnswer: 0,
    explanation:
      'Each of those seven has a meter signature, a designated protective device and a consequence, which is what makes the classification useful. The second list mixes fault types with supply quality phenomena; the third classifies by where the fault is rather than what it is; and the fourth is the test sequence, which is how you find faults rather than what the faults are.',
    section: 'Fault information, causes and common locations',
    difficulty: 'intermediate',
    topic: 'Classifying faults',
    reference: 'Module 8, Section 2 — Seven canonical fault types',
  },
  {
    id: 370,
    question:
      'Which fault type is described as the most damaging, and why?',
    options: [
      'Short circuit, because of the very high current it draws',
      'Earth fault, because it presents a shock risk to people',
      'High-resistance joint, because it is silent, unprotected by overcurrent devices, and ignites buildings',
      'Transient overvoltage, because it destroys connected electronic equipment',
    ],
    correctAnswer: 2,
    explanation:
      'A high-resistance joint draws no more current than the circuit normally does, so no overcurrent device sees it, and it quietly gets hotter until something ignites. A short circuit is violent but operates the protective device. An uncleared earth fault is the most fatal, which is a different superlative. And a transient destroys equipment rather than the building.',
    section: 'Fault information, causes and common locations',
    difficulty: 'advanced',
    topic: 'High-resistance joints',
    reference: 'Module 8, Section 2 — Fault types',
  },
  {
    id: 371,
    question:
      'How does a high-resistance joint reveal itself, given that it draws no excess current?',
    options: [
      'By an insulation resistance reading below 1 MΩ on the affected circuit',
      'By voltage drop under load, and by thermal imaging',
      'By an earth fault loop impedance reading above the tabulated maximum',
      'By operating the RCD when the load is applied',
    ],
    correctAnswer: 1,
    explanation:
      'The joint only shows up when current flows through it: the volt drop across it under load, and the heat it produces, are the two signatures. Insulation resistance measures the path between conductors and earth, which a series joint does not affect. A loop impedance reading can be elevated if the joint is in the fault path, but that is not where most of them are, and an RCD looks for residual current, not resistance.',
    section: 'Fault information, causes and common locations',
    difficulty: 'advanced',
    topic: 'Finding a high-resistance joint',
    reference: 'Module 8, Section 2 — Fault signatures',
  },
  {
    id: 372,
    question:
      'A circuit-breaker has tripped. What should you do before resetting it?',
    options: [
      'Reset it once — if it holds, the trip was a transient and no further action is needed',
      'Test the circuit — a tripped device is a symptom, and resetting without testing is the root of repeat call-outs',
      'Reset it and monitor the circuit under load for the remainder of the visit',
      'Replace the device, since a trip indicates the device has operated at the end of its life',
    ],
    correctAnswer: 1,
    explanation:
      'A trip is the protection doing its job and it is telling you something. Resetting to see what happens tests the fault by re-applying it, and if it holds you have learned nothing except that the fault is intermittent — which is the classic repeat call-out. Monitoring afterwards has the same problem, and a device that trips is working rather than failing.',
    section: 'Fault information, causes and common locations',
    difficulty: 'basic',
    topic: 'Never just reset',
    reference: 'Module 8, Section 2 — Fault types',
  },
  {
    id: 373,
    question:
      'Where do most faults occur in a fixed installation?',
    options: [
      'In the cable, where mechanical damage or thermal ageing has occurred',
      'At terminations — busbars, back-boxes and joints',
      'In the protective devices, through mechanical and electrical wear',
      'At the origin, where the highest fault energy is present',
    ],
    correctAnswer: 1,
    explanation:
      'Terminations — the consumer unit busbar, socket back-terminals and junction boxes are the three high-frequency locations, and Regulation 526.1 is the regulation behind all of them. Cable in a correctly installed run rarely fails on its own; switchgear does age but is a much smaller share; and the origin sees the highest fault energy without being where faults usually start.',
    section: 'Fault information, causes and common locations',
    difficulty: 'intermediate',
    topic: 'Where faults are',
    reference: 'BS 7671 Regulation 526.1',
  },
  {
    id: 374,
    question:
      'A motor hums but does not start, and runs normally if the shaft is turned by hand. What is the likely fault?',
    options: [
      'A failed start or run capacitor',
      'An open circuit in one winding',
      'A seized bearing',
      'Low supply voltage at the terminals',
    ],
    correctAnswer: 0,
    explanation:
      'That symptom pattern is the signature of a failed capacitor on a single-phase motor: the machine has no rotating field to start from, but once it is turning it will run. Confirm with a capacitance test and replace if outside about ±10 per cent of rated value. An open winding would stop it running at all, a seized bearing would prevent you turning it by hand, and low voltage would affect running as well as starting.',
    section: 'Fault information, causes and common locations',
    difficulty: 'intermediate',
    topic: 'Single-phase motor faults',
    reference: 'Module 8, Section 2 — Common equipment faults',
  },
  {
    id: 375,
    question:
      'An immersion heater circuit trips its RCD. What is the dominant fault and how is it confirmed?',
    options: [
      'A failed thermostat — confirmed by continuity across the contacts',
      'An earth fault in the element — confirmed by insulation resistance from the element terminals to its body at 500 V',
      'A high-resistance joint at the switch — confirmed by voltage drop under load',
      'Cumulative leakage from other circuits on the same RCD — confirmed by a leakage clamp',
    ],
    correctAnswer: 1,
    explanation:
      'Element insulation breakdown to the sheath is the dominant immersion-circuit fault: test from the element terminals to its body at 500 V, and below 1 MΩ confirms it. Replace, retest and recommission — and never dry-fire a new element, so restore the water before energising. A thermostat failure stops the heating rather than tripping an RCD; the other two are real faults in other circumstances but not the dominant one here.',
    section: 'Fault information, causes and common locations',
    difficulty: 'advanced',
    topic: 'Immersion heater faults',
    reference: 'Module 8, Section 2 — Common equipment faults',
  },
  {
    id: 376,
    question:
      'A customer reports that their LED lights flicker on a dimmer. What is the first thing to establish?',
    options: [
      'Whether the supply voltage is within the ESQCR tolerance',
      'Whether the flicker stops with the dimmer bypassed — an incompatibility rather than an installation fault',
      'Whether the circuit has a shared neutral with another lighting circuit',
      'Whether the insulation resistance of the lighting circuit is below 1 MΩ',
    ],
    correctAnswer: 1,
    explanation:
      'LED and dimmer incompatibility is the dominant cause, and bypassing the dimmer settles it in two minutes — then check the manufacturer’s compatibility chart and replace the dimmer or the driver as a matched pair. Supply voltage, shared neutrals and insulation resistance are all worth knowing and all take longer to establish, so they come after the cheap test that eliminates the most likely cause.',
    section: 'Fault information, causes and common locations',
    difficulty: 'intermediate',
    topic: 'Lighting faults',
    reference: 'Module 8, Section 2 — Common equipment faults',
  },
  {
    id: 377,
    question:
      'An EV charge point trips intermittently. What is the dominant cause on a shared RCD?',
    options: [
      'A fault in the vehicle’s on-board charger',
      'Cumulative leakage from other circuits sharing the same RCD',
      'A failed control pilot signal in the charge point',
      'Voltage fluctuation on the incoming supply',
    ],
    correctAnswer: 1,
    explanation:
      'Standing leakage from several circuits adds up until the charge point’s own leakage pushes the total over the threshold — clamp the upstream device with a leakage clamp meter to confirm, and the fix is a dedicated RCD for the charging circuit. The vehicle, the control pilot and the supply are all genuine fault categories, and the point of the diagnostic discipline here is to rule them out in order rather than replacing the wallbox first.',
    section: 'Fault information, causes and common locations',
    difficulty: 'advanced',
    topic: 'EV charger trips',
    reference: 'BS 7671 Regulation 722.531.3',
  },
  {
    id: 378,
    question:
      'A fault appears on an EV installation. How should the investigation be structured?',
    options: [
      'Replace the wallbox first, since it is the most complex component',
      'Rule out the wiring, then the charge point, then the vehicle handshake, in order',
      'Start with the vehicle, since the customer’s equipment is outside your scope',
      'Test the supply first, since a supply fault would affect other circuits too',
    ],
    correctAnswer: 1,
    explanation:
      'Faults split three ways — the wiring, which is yours; the charger, which is the manufacturer’s; and the vehicle handshake, which is the customer’s — and you work through them in that order so the boundary is established before anybody is asked to pay for a replacement. Replacing the wallbox first is the expensive guess. Starting at the vehicle inverts the order, and a supply fault affecting other circuits would have shown up as a different complaint.',
    section: 'Fault information, causes and common locations',
    difficulty: 'intermediate',
    topic: 'Structuring an EV investigation',
    reference: 'Module 8, Section 2 — EV charger faults',
  },

  // ── Section 3 · A logical approach to fault finding ─────────────────────
  {
    id: 379,
    question:
      'Which stage of the seven-stage diagnostic process has the greatest effect on how long the job takes?',
    options: [
      'Collecting symptoms, because incomplete information invalidates everything after it',
      'Formulating the hypothesis, because it drives the test plan',
      'Executing the tests, because that is where the time is physically spent',
      'Executing the fix, because rework doubles the labour',
    ],
    correctAnswer: 1,
    explanation:
      'The hypothesis is what turns a test plan from random testing into targeted testing — thirty minutes against four hours. Collecting symptoms feeds it and matters enormously, but the leverage sits in what you do with them. Test execution is where the time is spent, which is precisely why the stage that decides which tests to run governs it. Rework is a consequence of a wrong hypothesis rather than a separate cause.',
    section: 'A logical approach to fault finding',
    difficulty: 'intermediate',
    topic: 'The diagnostic process',
    reference: 'Module 8, Section 3 — Seven stages',
  },
  {
    id: 380,
    question:
      'What is the difference between a symptom and a fault?',
    options: [
      'A symptom is reported by the customer; a fault is found by the electrician',
      'A symptom is what is noticed; a fault is the underlying engineering condition',
      'A symptom is intermittent; a fault is permanent',
      'A symptom affects one circuit; a fault affects the installation',
    ],
    correctAnswer: 1,
    explanation:
      'Diagnosis is the mapping between the two — one fault can produce several symptoms and one symptom can come from several faults, which is why you cannot work from the symptom alone. Who noticed it, whether it is intermittent and how far it spreads are all properties a symptom or a fault may have, and none of them is the distinction.',
    section: 'A logical approach to fault finding',
    difficulty: 'basic',
    topic: 'Symptoms and faults',
    reference: 'Module 8, Section 3 — Diagnosis as a structured process',
  },
  {
    id: 381,
    question:
      'In what order should tests be selected during a diagnosis?',
    options: [
      'In the BS 7671 Regulation 643 sequence, every time',
      'Safety first, then discrimination, then cost — dead before live, most-narrowing first, quick before slow',
      'Cheapest first, working up to the most expensive',
      'Live tests first, since they can be carried out without disturbing the installation',
    ],
    correctAnswer: 1,
    explanation:
      'Three criteria in that order: safety decides dead before live, discrimination puts the test that halves the possibilities first, and cost breaks the tie between equally informative tests. The full Regulation 643 sequence is the commissioning sequence and is deliberately not what a targeted diagnosis runs. Cost alone ignores what each test tells you, and putting live tests first inverts the safety criterion.',
    section: 'A logical approach to fault finding',
    difficulty: 'advanced',
    topic: 'Ordering the tests',
    reference: 'Module 8, Section 3 — Test ordering',
  },
  {
    id: 382,
    question:
      'Roughly what proportion of faults does a careful visual inspection catch before any instrument is used?',
    options: [
      'About 10 per cent',
      'About 30 per cent',
      'About 60 per cent',
      'About 90 per cent',
    ],
    correctAnswer: 1,
    explanation:
      'Around 30 per cent — scorched terminals, water marks and signs of past faults are all visible to somebody who looks before reaching for a meter. Ten per cent undersells it enough that people skip the stage; 60 and 90 per cent oversell it enough that they stop looking once they have found something, which is how a second fault gets missed.',
    section: 'A logical approach to fault finding',
    difficulty: 'intermediate',
    topic: 'Visual inspection in diagnosis',
    reference: 'Module 8, Section 3 — Seven stages',
  },
  {
    id: 383,
    question:
      'You are looking for a break in a ring final circuit. What technique finds it in the fewest measurements?',
    options: [
      'Testing each socket in turn from the board',
      'Half-split — divide the ring, test, and repeat on the half that contains the fault',
      'Testing from both ends and comparing the two readings',
      'Thermal imaging along the accessible sections of the run',
    ],
    correctAnswer: 1,
    explanation:
      'A binary search finds the break in about log₂(n) measurements rather than n — on a twelve-socket ring that is four tests instead of twelve. Working socket by socket is the linear approach the technique replaces. Comparing readings from both ends narrows it to a side rather than a point, and thermal imaging finds heat, which an open circuit does not produce.',
    section: 'A logical approach to fault finding',
    difficulty: 'advanced',
    topic: 'Half-split technique',
    reference: 'Module 8, Section 3 — Half-split',
  },
  {
    id: 384,
    question:
      'A test result does not match your hypothesis. What should happen?',
    options: [
      'Repeat the test, since an anomalous reading usually indicates instrument error',
      'Update the hypothesis and revise the test plan — keep iterating until it explains all the evidence',
      'Set the result aside and continue with the planned tests',
      'Proceed on the hypothesis, since one result rarely overturns a considered diagnosis',
    ],
    correctAnswer: 1,
    explanation:
      'The loop between hypothesis, test plan, execution and analysis is iterative by design: a result that does not fit is information, and the hypothesis changes to accommodate it. Repeating the test is worth doing once but treating every inconvenient reading as instrument error is how people test their way to the wrong answer. Setting it aside or pressing on both discard the most useful reading you have taken.',
    section: 'A logical approach to fault finding',
    difficulty: 'intermediate',
    topic: 'Iterating the hypothesis',
    reference: 'Module 8, Section 3 — Diagnosis as a structured process',
  },
  {
    id: 385,
    question:
      'What are the three levels of confidence in a test instrument, and what does each provide?',
    options: [
      'Calibration against a UKAS reference, field verification against another instrument, and a daily function check',
      'Manufacturer specification, annual service, and a visual inspection',
      'Type approval, batch testing, and a pre-use check',
      'Laboratory calibration, factory reset, and a self-test routine',
    ],
    correctAnswer: 0,
    explanation:
      'Formal calibration gives traceability to a national standard, field verification confirms two instruments agree, and the function check is the daily go or no-go. Each answers a different question and none substitutes for the others. Manufacturer specification, type approval and a factory reset are all properties of the instrument rather than evidence about the one in your hand today.',
    section: 'A logical approach to fault finding',
    difficulty: 'advanced',
    topic: 'Instrument confidence',
    reference: 'Module 8, Section 3 — Calibration, verification, function check',
  },
  {
    id: 386,
    question:
      'Why is supply identification the first technical step in a diagnosis?',
    options: [
      'Because the certificate requires the earthing arrangement to be recorded',
      'Because each arrangement has different fault characteristics, Ze ranges and expected Zs values',
      'Because the supply must be confirmed present before any other test is meaningful',
      'Because the distributor must be notified of any fault on their side of the cut-out',
    ],
    correctAnswer: 1,
    explanation:
      'What counts as a normal reading depends entirely on whether you are on TN-S, TN-C-S, TT or IT, so identifying the arrangement by visual check plus a Ze measurement sets the expectations everything else is judged against. Recording it on the certificate and confirming the supply is live are both true and neither is why it comes first, and notifying the distributor follows a finding rather than preceding the investigation.',
    section: 'A logical approach to fault finding',
    difficulty: 'intermediate',
    topic: 'Identifying the supply',
    reference: 'Module 8, Section 3 — Identify the supply at the cut-out',
  },
  {
    id: 387,
    question:
      'How does fault-diagnosis testing differ from the Regulation 643 commissioning sequence?',
    options: [
      'It uses the same sequence but on fewer circuits',
      'It is hypothesis-driven and targeted rather than a full sequence',
      'It omits the dead tests, since the fault is usually found live',
      'It requires a different set of instruments',
    ],
    correctAnswer: 1,
    explanation:
      'Diagnosis tests to answer a specific question; commissioning tests to prove the whole installation against a standard. Running a subset of the commissioning sequence still tests in a fixed order rather than following the evidence. Dead tests are very much part of diagnosis, and the instruments are the same ones — what changes is which test you reach for and why.',
    section: 'A logical approach to fault finding',
    difficulty: 'intermediate',
    topic: 'Targeted testing',
    reference: 'Module 8, Section 3 — Fault-diagnosis testing',
  },
  {
    id: 388,
    question:
      'What six factors decide whether to repair or replace?',
    options: [
      'Cost, parts availability, reliability, compliance, schedule, and warranty or insurance',
      'Cost, age, appearance, customer preference, warranty, and manufacturer support',
      'Safety, cost, time, materials, labour, and disposal',
      'Compliance, cost, competence, access, programme, and certification',
    ],
    correctAnswer: 0,
    explanation:
      'Those six, with a rough cost threshold of 60 to 70 per cent of replacement tipping the decision towards replacing. Compliance can force replacement on its own where the existing device falls below current requirements. The other lists mix in factors that are either consequences of the decision or not decision criteria at all — appearance and disposal among them.',
    section: 'A logical approach to fault finding',
    difficulty: 'advanced',
    topic: 'Repair or replace',
    reference: 'Module 8, Section 3 — Repair vs replace',
  },
  {
    id: 389,
    question:
      'Who decides between two compliant remedial options, and who decides which options are compliant?',
    options: [
      'The customer decides both, since they are paying',
      'The firm makes the safety decision on which options are compliant; the customer makes the commercial choice between them',
      'The firm decides both, since it carries the professional responsibility',
      'The duty holder decides both, on the firm’s written recommendation',
    ],
    correctAnswer: 1,
    explanation:
      'The two decisions are different in kind and must not be merged: which options are safe and compliant is an engineering judgement the firm owns, and which of those compliant options to buy is the customer’s. Letting the customer into the first decision is how a non-compliant option gets chosen on price; taking the second away from them removes a choice that is legitimately theirs.',
    section: 'A logical approach to fault finding',
    difficulty: 'intermediate',
    topic: 'Who decides',
    reference: 'Module 8, Section 3 — Repair vs replace',
  },

  // ── Section 4 · Repair, replacement, retesting and handover ─────────────
  {
    id: 390,
    question:
      'Which tests must be carried out on a circuit after rectification?',
    options: [
      'Insulation resistance and a functional check',
      'Continuity, insulation resistance, polarity, earth fault loop impedance, and RCD trip time where the circuit is RCD-protected',
      'Only the test that originally failed, repeated to confirm the fix',
      'A full Regulation 643 sequence on every circuit in the installation',
    ],
    correctAnswer: 1,
    explanation:
      'The Regulation 643 set on the affected circuit — that is what proves the fix worked rather than merely appearing to. Two tests are not enough to establish the circuit is sound. Repeating only the failed test misses anything the repair itself disturbed. And re-testing the whole installation is disproportionate to a single-circuit rectification.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'intermediate',
    topic: 'Post-rectification testing',
    reference: 'BS 7671 Regulation 643',
  },
  {
    id: 391,
    question:
      'What makes the post-rectification record evidentially useful?',
    options: [
      'The corrected reading, recorded against the circuit',
      'The pre-rectification failed reading and the post-rectification corrected reading, as a pair',
      'A photograph of the repaired component',
      'The date and time the rectification was completed',
    ],
    correctAnswer: 1,
    explanation:
      'The before-and-after pair is the proof: the failed reading establishes there was a fault and the corrected reading establishes it is gone. A corrected reading on its own shows the circuit is now sound without showing you fixed anything. A photograph and a timestamp both support the record and neither demonstrates the electrical outcome.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'intermediate',
    topic: 'Recording the rectification',
    reference: 'Module 8, Section 4 — Post-rectification retest',
  },
  {
    id: 392,
    question:
      'A new fault appears during the post-rectification retest. How should it be treated?',
    options: [
      'As pre-existing, since the original fault has been corrected',
      'As a new diagnostic problem, investigated in its own right',
      'As an artefact of the repair, resolved by repeating the retest',
      'As outside the call-out scope, and noted for a future visit',
    ],
    correctAnswer: 1,
    explanation:
      'New faults at retest are not unusual and each one gets investigated properly — dismissing it as something that must have been there before is the response that leaves a fault in service under your signature. Repeating the test without investigating assumes the result is wrong. And whether it is within the original scope is a commercial question that comes after establishing what it is.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'advanced',
    topic: 'New findings at retest',
    reference: 'Module 8, Section 4 — Post-rectification retest',
  },
  {
    id: 393,
    question:
      'You find a fault you cannot correct today. What does your duty become?',
    options: [
      'To report it to the duty holder and arrange a return visit',
      'To make sure it cannot cause harm before somebody else deals with it',
      'To isolate the whole installation until it can be rectified',
      'To record it on the job sheet and complete the work you were called out for',
    ],
    correctAnswer: 1,
    explanation:
      'The duty changes shape rather than going away: verify, identify the failure mode, make safe, document, then rectify within your competence or escalate. Reporting and a return visit are part of that but they do not by themselves make the condition safe in the meantime. Isolating everything is wider than most faults require, and completing the original job while leaving a danger in service is the failure the whole procedure exists to prevent.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'intermediate',
    topic: 'When you cannot rectify',
    reference: 'Module 8, Section 4 — The duty changes shape',
  },
  {
    id: 394,
    question:
      'How widely should an isolation be made when leaving a fault in a made-safe condition?',
    options: [
      'At the origin, so nothing can be inadvertently restored',
      'As narrowly as the fault allows and as widely as it requires, at a point you can physically secure',
      'At the circuit protective device in every case, since that is the designed isolation point',
      'Wherever the duty holder prefers, since they will manage the installation until rectification',
    ],
    correctAnswer: 1,
    explanation:
      'Narrow enough not to disable more of the installation than necessary, wide enough to actually contain the fault, and at a point you can lock — having accounted for any other source of supply and proved dead. Always isolating at the origin punishes the whole building for one fault. The circuit device is not always securable or always sufficient. And the duty holder’s preference cannot make an inadequate isolation adequate.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'advanced',
    topic: 'Scope of a make-safe isolation',
    reference: 'Module 8, Section 4 — Make safe',
  },
  {
    id: 395,
    question:
      'What secures an isolation left in place for somebody else to deal with?',
    options: [
      'A clear out-of-service notice carrying the date and the name of the person who isolated it',
      'A lock-off, plus that notice — a label informs, only the lock prevents',
      'An entry in the job sheet and a verbal briefing to the duty holder',
      'Removal of the protective device, retained by the person who isolated it',
    ],
    correctAnswer: 1,
    explanation:
      'Both: the lock is what physically stops re-energisation and the notice is what tells the next person what has happened and who to ring. A notice on its own relies on everybody reading and obeying it. A job sheet entry and a briefing reach only the people who were there. And removing a device leaves an opening somebody can fit another device into.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'intermediate',
    topic: 'Securing a make-safe',
    reference: 'Module 8, Section 4 — The duty changes shape',
  },
  {
    id: 396,
    question:
      'A customer declines the recommended remedial work. How is that handled?',
    options: [
      'Record the refusal and take no further action, since the decision is theirs',
      'Record the recommendation, the response and date, the implications briefed, and your professional position — and never leave a Code 1 condition in service',
      'Refuse to issue any certification until the work is authorised',
      'Carry out the work anyway, since safety overrides the customer’s commercial preference',
    ],
    correctAnswer: 1,
    explanation:
      'Document all four elements, because a refusal you recorded properly is a decision the customer made with the facts, and a refusal you noted in one line is an argument waiting to happen. The one thing a refusal can never do is leave a Code 1 in service — there the firm’s duty overrides the preference, and you make safe and escalate. Withholding certification for work you did do, or carrying out unauthorised work, are both the wrong response.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'advanced',
    topic: 'Declined recommendations',
    reference: 'Module 8, Section 4 — Handover, variations and acceptance',
  },
  {
    id: 397,
    question:
      'When should a variation be recorded?',
    options: [
      'Before the work is done, with the authorisation named and dated',
      'At the point of invoicing, with the revised total explained',
      'On completion, once the actual cost is known',
      'Only where the change increases the price by a material amount',
    ],
    correctAnswer: 0,
    explanation:
      'Before, with the original scope and price, what changed and why, the revised scope and price, the authorisation with date and medium, and any schedule impact. Different equipment is a variation even where the price barely moves, so a materiality threshold misses a class of change the customer is entitled to know about. Recording it at invoicing or on completion presents a decision already taken.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'intermediate',
    topic: 'Variations',
    reference: 'Module 8, Section 4 — Handover, variations and acceptance',
  },
  {
    id: 398,
    question:
      'What does a customer’s signature at hand-back represent?',
    options: [
      'Approval of the engineering work carried out',
      'A receipt for the documents handed over',
      'Acceptance that no further remedial work is required',
      'Confirmation that the certification has been read and understood',
    ],
    correctAnswer: 1,
    explanation:
      'It is a receipt — a record that the handover happened and the documents changed hands. It is not an endorsement of the engineering, which the customer is in no position to judge, and it is certainly not a waiver of outstanding remedial work. If they decline to sign, note that and email the certificate; the contractor declarations are what carry the evidential weight.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'intermediate',
    topic: 'Hand-back',
    reference: 'Module 8, Section 4 — Handover, variations and acceptance',
  },
  {
    id: 399,
    question:
      'You remove several failed fluorescent tubes during a rectification. How are they dealt with?',
    options: [
      'As general waste, once broken down to fit the van',
      'As hazardous waste — transported intact, with a consignment note retained for three years',
      'As WEEE, returned to the wholesaler under the Distributor Take-Back Scheme',
      'As the customer’s waste, left on site for their own disposal',
    ],
    correctAnswer: 1,
    explanation:
      'Fluorescent tubes contain mercury and are hazardous waste: never smashed, transported intact, with a hazardous waste consignment note retained for three years. Breaking them releases the mercury and is itself an offence. The WEEE take-back route covers failed devices and accessories rather than mercury-bearing lamps. And the section 34 duty of care travels with the producer, so leaving them with the customer does not discharge it.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'advanced',
    topic: 'Waste from rectification',
    reference: 'Hazardous Waste Regulations 2005 · EPA 1990 Section 34',
  },
  {
    id: 400,
    question:
      'What is the first step of the five-step customer hand-back?',
    options: [
      'Hand over the certificate and the schedules',
      'Demonstrate that the original symptom is gone',
      'Explain what was found and what was done',
      'Agree the next steps and any outstanding recommendations',
    ],
    correctAnswer: 1,
    explanation:
      'Demonstrate first — thirty seconds showing the symptom has gone turns the customer from an uncertain bystander into somebody who has seen for themselves that the problem is fixed. Everything else lands better after that. The walk-through, the documents, the plain-English explanation and the next steps all follow, and handing over paperwork to somebody who is not yet sure the fault is cured is the version of this that satisfies nobody.',
    section: 'Repair, replacement, retesting and handover',
    difficulty: 'basic',
    topic: 'Customer hand-back',
    reference: 'Module 8, Section 4 — Customer hand-back',
  },
];

export const MODULE_8_QUESTIONS = bank('Fault diagnosis', QUESTIONS);
