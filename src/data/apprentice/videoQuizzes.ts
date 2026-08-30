/**
 * Video Quizzes
 *
 * Hand-written 3-question checks for the learning-path and spotlight videos.
 * Each quiz tests what the video actually teaches — no trick questions, one
 * clearly-correct answer, and a one-line explanation shown after answering.
 *
 * Keyed by YouTube video id (must exist in curatedVideos.ts).
 */

export interface VideoQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const videoQuizzes: Record<string, VideoQuizQuestion[]> = {
  mc979OhitAg: [
    {
      question: 'What actually flows around a circuit to make electricity work?',
      options: ['Atoms themselves', 'Protons', 'Free electrons', 'Neutrons'],
      correctIndex: 2,
      explanation:
        'Free electrons in the outer shell of conductor atoms are pushed along by the supply — that flow is electric current.',
    },
    {
      question: 'Why is copper such a good conductor?',
      options: [
        'It has no electrons at all',
        'It has a loosely-held free electron that can move easily',
        'It is magnetic',
        'Its electrons are locked tightly in place',
      ],
      correctIndex: 1,
      explanation:
        'Copper atoms hold their outer electron loosely, so it takes very little pressure to get electrons moving.',
    },
    {
      question: 'What does an insulator do in a cable?',
      options: [
        'Reduces the resistance of the copper',
        'Generates voltage',
        'Speeds the electrons up',
        'Stops current escaping by holding its electrons tightly',
      ],
      correctIndex: 3,
      explanation:
        'Insulator atoms grip their electrons tightly, so current cannot flow through them — it stays in the conductor.',
    },
  ],
  w82aSjLuD_8: [
    {
      question: 'Voltage is best described as…',
      options: [
        'The number of atoms in a conductor',
        'The pressure or potential difference pushing electrons around a circuit',
        'The heat produced in a cable',
        'The flow of electrons',
      ],
      correctIndex: 1,
      explanation:
        'Voltage is electrical pressure — the potential difference between two points that pushes current through a circuit.',
    },
    {
      question: 'Can a voltage exist when no current is flowing?',
      options: [
        'Only in DC circuits',
        'No — voltage only exists while current flows',
        'Yes — like pressure in a pipe with the valve shut, it can be measured with nothing flowing',
        'Only across a switch',
      ],
      correctIndex: 2,
      explanation:
        "Paul's water analogy: you can measure pressure in a closed pipe, and a battery on an open switch still has voltage across it.",
    },
    {
      question: 'With no potential difference across a circuit, what happens?',
      options: [
        'No current flows',
        'Resistance falls to zero',
        'The voltage increases on its own',
        'Current flows faster',
      ],
      correctIndex: 0,
      explanation:
        'Current only flows when a potential difference exists to push it — no difference, no flow.',
    },
  ],
  kcL2_D33k3o: [
    {
      question: 'What is the key difference between AC and DC?',
      options: [
        'DC only exists in three-phase systems',
        'AC alternates direction; DC flows in one direction only',
        'AC is always safer than DC',
        'AC flows in one direction only; DC alternates',
      ],
      correctIndex: 1,
      explanation:
        'Alternating current changes direction many times a second; direct current flows one way, like from a battery.',
    },
    {
      question: 'How does a fuse protect a circuit?',
      options: [
        'It diverts current to earth',
        'Its element melts and breaks the circuit when too much current flows',
        'It trips a switch magnetically',
        'It lowers the voltage',
      ],
      correctIndex: 1,
      explanation:
        'Excess current heats the fuse element until it melts, breaking the circuit — a fuse works once and must be replaced.',
    },
    {
      question: 'In a copper wire with no voltage applied, what do the free electrons do?',
      options: [
        'They leave the conductor',
        'They move randomly in all directions, which is not a current',
        'They all flow one way',
        'They stop completely',
      ],
      correctIndex: 1,
      explanation:
        'Free electrons drift between atoms at random; only an applied voltage makes them all move the same way, which is current.',
    },
  ],
  HsLLq6Rm5tU: [
    {
      question: "Ohm's law states that…",
      options: ['V = I × R', 'V = I ÷ R', 'V = R ÷ I', 'V = I + R'],
      correctIndex: 0,
      explanation: 'Voltage equals current multiplied by resistance: V = I × R.',
    },
    {
      question: 'A 230 V circuit has a resistance of 23 Ω. What current flows?',
      options: ['1 A', '23 A', '10 A', '100 A'],
      correctIndex: 2,
      explanation: 'I = V ÷ R = 230 ÷ 23 = 10 A.',
    },
    {
      question: 'If resistance increases and voltage stays the same, what happens to current?',
      options: ['It stays the same', 'It reverses direction', 'It decreases', 'It increases'],
      correctIndex: 2,
      explanation: 'Current and resistance are inversely related — more resistance, less current.',
    },
  ],
  VV6tZ3Aqfuc: [
    {
      question: 'In a DC series circuit, the current…',
      options: [
        'Only flows through the largest resistor',
        'Splits equally between components',
        'Is the same through every component',
        'Is different through each component',
      ],
      correctIndex: 2,
      explanation:
        'There is only one path in a series circuit, so the same current flows through everything.',
    },
    {
      question: 'How do you find the total resistance of resistors in series?',
      options: [
        'Take the largest value only',
        'Add them together',
        'Use product over sum',
        'Multiply them together',
      ],
      correctIndex: 1,
      explanation: 'Series resistances simply add: Rt = R1 + R2 + R3…',
    },
    {
      question: 'What happens to the supply voltage in a series circuit?',
      options: [
        'It doubles at each component',
        'Each component gets the full supply voltage',
        'It is shared across the components, adding up to the supply total',
        'It is only present at the last component',
      ],
      correctIndex: 2,
      explanation: 'The voltage drops across each component add up to the total supply voltage.',
    },
  ],
  '5uyJezQNSHw': [
    {
      question: 'In a DC parallel circuit, the voltage across each branch is…',
      options: [
        'Shared between the branches',
        'Always half the supply',
        'The same as the supply voltage',
        'Zero in all but one branch',
      ],
      correctIndex: 2,
      explanation:
        'Every parallel branch sits directly across the supply, so each sees full voltage.',
    },
    {
      question: 'What happens to total resistance as you add more parallel branches?',
      options: ['It becomes infinite', 'It increases', 'It stays the same', 'It decreases'],
      correctIndex: 3,
      explanation:
        'More branches means more paths for current, so the combined resistance falls — always below the smallest branch.',
    },
    {
      question: 'How does current behave in a parallel circuit?',
      options: [
        'It only flows in the first branch',
        'It divides between branches, with more current through lower resistance',
        'It is the same in every branch regardless of resistance',
        'It stops at the junction',
      ],
      correctIndex: 1,
      explanation:
        'Current splits at the junctions — each branch draws what its resistance allows, and the branch currents add up to the total.',
    },
  ],
  OUcKJuMSSW4: [
    {
      question: 'What is the frequency of the UK mains supply?',
      options: ['50 Hz', '60 Hz', '100 Hz', '25 Hz'],
      correctIndex: 0,
      explanation: 'UK alternating current completes 50 full cycles every second — 50 Hz.',
    },
    {
      question: 'On a 50 Hz supply, how many times per second does the polarity reverse?',
      options: ['100', '120', '60', '50'],
      correctIndex: 0,
      explanation:
        'Each cycle has a positive and a negative half, so 50 cycles per second means the polarity reverses 100 times a second.',
    },
    {
      question: 'What creates the sine wave in a basic AC generator?',
      options: [
        'A rotating magnet whose field passes the coils, varying in intensity and polarity',
        'A switch opening and closing',
        'Friction in the bearings',
        'A battery being reversed by hand',
      ],
      correctIndex: 0,
      explanation:
        'As the magnet rotates, each coil sees the field rise to a maximum, fall to zero, then repeat with the opposite polarity — tracing a sine wave.',
    },
  ],
  W0_1xRqT8uU: [
    {
      question: 'A single-phase supply uses which conductors?',
      options: ['Three lines only', 'Two earths', 'Line and neutral', 'Line, line and line'],
      correctIndex: 2,
      explanation:
        'Single phase is one line conductor and a neutral, giving 230 V between them in the UK.',
    },
    {
      question: 'Why are neighbouring houses often connected to different phases of the supply?',
      options: [
        'To give some houses a higher voltage',
        'To balance the demand across the transformer',
        'Because each phase has a different frequency',
        'To reduce the number of cables needed',
      ],
      correctIndex: 1,
      explanation:
        'Alternating which phase each property takes spreads the load evenly across the three phases on the transformer.',
    },
    {
      question: 'Where would you typically find a single-phase supply?',
      options: [
        'A national grid substation',
        'A steel rolling mill',
        'A typical UK house',
        'A railway traction system',
      ],
      correctIndex: 2,
      explanation: 'Most UK domestic properties are supplied single-phase at 230 V.',
    },
  ],
  '4oRT7PoXSS0': [
    {
      question: 'How far apart are the three phases in a three-phase supply?',
      options: ['360°', '90°', '120°', '180°'],
      correctIndex: 2,
      explanation: 'The three windings are physically and electrically 120° apart.',
    },
    {
      question: 'What happens in the coils as the magnet rotates past them?',
      options: [
        'The electrons leave the coil entirely',
        'Nothing until the magnet stops',
        'The coils become permanently magnetised',
        'The changing field pushes then pulls the free electrons, so current flows first one way then the other',
      ],
      correctIndex: 3,
      explanation:
        "The rotating field's positive half pushes electrons one way and the negative half pulls them back — that alternation is AC.",
    },
    {
      question: 'What advantage does three phase give over single phase for larger equipment?',
      options: [
        'It uses only one conductor',
        'It removes the need for a neutral in every case',
        'The phases overlap so power delivery does not drop away between peaks, supplying much more power',
        'It runs at a higher frequency',
      ],
      correctIndex: 2,
      explanation:
        'With three phases spaced out, as one falls another rises — so the supply keeps delivering rather than dropping to zero each half cycle.',
    },
  ],
  YMJzWC_e_Uw: [
    {
      question: 'What is the correct sequence for proving a circuit dead?',
      options: [
        'Test the circuit twice with any meter',
        'Test the circuit, then walk away',
        'Prove the tester on a known source, test the circuit, prove the tester again',
        'Ask someone else to check it',
      ],
      correctIndex: 2,
      explanation:
        'Prove–test–prove: verify your voltage indicator works before AND after testing, so a dead tester cannot fool you.',
    },
    {
      question:
        'When locking off a single circuit, why must the dead testing be done at the point of work rather than at the board?',
      options: [
        'The regulations forbid testing at a board',
        'Because a live can be introduced into the circuit elsewhere in the building — a borrowed neutral, for example',
        'Because the tester will not reach the board',
        'It is quicker at the socket',
      ],
      correctIndex: 1,
      explanation:
        'Isolating at the MCB proves nothing about what has been introduced further along the circuit; prove it dead where you are actually working.',
    },
    {
      question: 'When safely isolating, where should you test for voltage?',
      options: [
        'Only at the distribution board',
        'Line to neutral only',
        'Earth to earth',
        'Between all conductors — line to neutral, line to earth and neutral to earth',
      ],
      correctIndex: 3,
      explanation:
        'Test between every combination of conductors — a circuit can still be live on one leg even when another reads dead.',
    },
  ],
  qUJ8carxtIM: [
    {
      question: 'Which group of tests must always come first?',
      options: [
        'The order does not matter',
        'Dead tests, before the supply is energised',
        'Live tests, because they are quicker',
        'RCD tests',
      ],
      correctIndex: 1,
      explanation:
        'Dead tests (continuity, insulation resistance, polarity) come first — you must prove the installation safe before energising for live tests.',
    },
    {
      question: 'Which dead test is carried out first?',
      options: [
        'Insulation resistance',
        'Continuity of protective conductors',
        'Earth fault loop impedance',
        'RCD trip time',
      ],
      correctIndex: 1,
      explanation:
        'Continuity of protective conductors comes first — every later test and the safety of the installation rely on the CPC actually being connected.',
    },
    {
      question: 'Which test does Craig place second in the correct sequence?',
      options: [
        'Earth fault loop impedance',
        'Polarity',
        'Insulation resistance',
        'Continuity of ring final circuit conductors',
      ],
      correctIndex: 3,
      explanation:
        'His order runs continuity of protective conductors, then continuity of ring final conductors, then insulation resistance, then polarity.',
    },
  ],
  'K7-FxWD87Kg': [
    {
      question: 'What is the first step of the ring final continuity test?',
      options: [
        'Measure insulation resistance',
        'Measure end-to-end resistance of the line, neutral and CPC loops',
        'Cross-connect line and neutral',
        'Plug a tester into any socket',
      ],
      correctIndex: 1,
      explanation:
        'Step 1 measures the end-to-end resistance of each leg of the ring: r1 (line), rn (neutral) and r2 (CPC).',
    },
    {
      question:
        'After cross-connecting line and neutral, readings at each socket on the ring should be…',
      options: [
        'Roughly the same at every socket, about (r1 + rn) ÷ 4',
        'Higher at each socket as you move round',
        'Zero everywhere',
        'Double at the last socket',
      ],
      correctIndex: 0,
      explanation:
        'A healthy cross-connected ring gives substantially the same reading at every socket — around a quarter of r1 + rn.',
    },
    {
      question:
        'In step two of the ring final test, how are the conductors connected at the board?',
      options: [
        'Incoming line to outgoing neutral and vice versa, forming a figure of eight',
        'All four ends twisted together',
        'Left exactly as found',
        'Line to line and neutral to neutral',
      ],
      correctIndex: 0,
      explanation:
        'Cross-connecting line and neutral makes the figure of eight, so every socket should then read substantially the same.',
    },
  ],
  NNfyTU1QoYI: [
    {
      question: 'How is the expected R1+Rn value calculated from the end-to-end readings?',
      options: [
        'Add r1 and rn, then divide by four',
        'Take the larger of the two',
        'Multiply r1 by rn',
        'Add r1 and rn and divide by two',
      ],
      correctIndex: 0,
      explanation:
        'With four conductors involved in the figure of eight, r1 plus rn divided by four gives the value you should measure at each socket.',
    },
    {
      question: 'In a healthy ring, how should the r1 and rn end-to-end readings compare?',
      options: [
        'r1 should read zero',
        'They should always differ by exactly 1 Ω',
        'rn should be ten times r1',
        'They should be substantially the same (same size conductors)',
      ],
      correctIndex: 3,
      explanation:
        'Line and neutral are the same CSA run over the same route, so their end-to-end resistances should closely match.',
    },
    {
      question: 'Which figure from the ring test is recorded as R1+R2 on the schedule?',
      options: [
        'The r2 end-to-end value on its own',
        'The highest reading obtained at a socket during the line–CPC cross-connected step',
        'The lowest reading found anywhere',
        'The sum of all socket readings',
      ],
      correctIndex: 1,
      explanation:
        'With line and CPC cross-connected, the highest socket reading is the circuit R1+R2 used for Zs verification.',
    },
  ],
  sWvtpLZsAEE: [
    {
      question:
        'Under Amendment 2, when may insulation resistance be tested at 250 V DC rather than 500 V DC?',
      options: [
        "On any circuit, at the tester's discretion",
        'Never — 500 V DC is always required',
        'Only on SELV circuits',
        'After equipment is connected, provided the cables were tested at 500 V DC before connection',
      ],
      correctIndex: 3,
      explanation:
        'The reduced voltage applies after connection of equipment, and only if the cables themselves were already tested at 500 V DC.',
    },
    {
      question: 'What is the minimum acceptable insulation resistance for a 230/400 V circuit?',
      options: ['2.0 MΩ', '0.1 MΩ', '0.5 MΩ', '1.0 MΩ'],
      correctIndex: 3,
      explanation:
        'BS 7671 requires at least 1.0 MΩ — though a healthy installation normally reads far higher.',
    },
    {
      question: 'Before using the reduced 250 V DC test, what must you check?',
      options: [
        'That it is a lighting circuit',
        'That the circuit is over 20 m long',
        "That the manufacturer's instructions allow it",
        'That the RCD has been tested',
      ],
      correctIndex: 2,
      explanation:
        "Craig is explicit: the reduced test voltage is only used where the manufacturer's instructions permit it.",
    },
  ],
  'CSMpfjSQK-g': [
    {
      question: 'What is Ze?',
      options: [
        'The resistance of the final circuit',
        'The external earth fault loop impedance at the origin of the installation',
        'The RCD trip time',
        'The voltage at the cut-out',
      ],
      correctIndex: 1,
      explanation:
        'Ze is the earth fault loop impedance external to the installation, measured at the origin.',
    },
    {
      question: 'What makes it safe to remove the main earthing conductor for this test?',
      options: [
        'Rubber gloves are worn',
        'The board has been safely isolated and locked off first',
        'The earthing conductor is never live',
        'It is only removed after the test',
      ],
      correctIndex: 1,
      explanation:
        'Safe isolation and lock-off come first — though note the incoming line and neutral terminals remain live throughout the Ze test.',
    },
    {
      question: 'What is a typical maximum declared Ze for a TN-C-S (PME) supply?',
      options: ['0.35 Ω', '0.8 Ω', '21 Ω', '200 Ω'],
      correctIndex: 0,
      explanation:
        'Distributors typically declare up to 0.35 Ω for TN-C-S; TN-S is typically up to 0.8 Ω.',
    },
  ],
  w5183J4bOHA: [
    {
      question: 'What is the difference between Ze and PFC?',
      options: [
        'They are the same measurement',
        'Ze is a loop impedance in ohms; PFC is a prospective fault current in amps or kA',
        'Ze only exists on TT systems',
        'PFC is measured with the power off',
      ],
      correctIndex: 1,
      explanation:
        'Ze measures impedance of the earth fault path; PFC is the current that would flow under a fault — related, but different quantities and different tests.',
    },
    {
      question: 'Why can these two tests not be carried out at the same time?',
      options: [
        'One is a dead test and one is live',
        'The tester cannot display two results',
        'They need different supply voltages',
        'The main earthing conductor is removed for one and reconnected for the other',
      ],
      correctIndex: 3,
      explanation:
        'One is measured with the main earth removed; the other needs it back in, so the same connection cannot serve both.',
    },
    {
      question: 'With the main earthing conductor reconnected, what is the meter now seeing?',
      options: [
        'Nothing — the reading is invalid',
        'Just the neutral',
        'Only the circuit conductors',
        'The parallel earth paths as well',
      ],
      correctIndex: 3,
      explanation:
        'Putting the main earth back brings the parallel paths into the measurement, which is exactly why the two results differ.',
    },
  ],
  UwBo23MUJT4: [
    {
      question: 'What does Zs represent?',
      options: [
        'The insulation resistance of the circuit',
        'The total earth fault loop impedance of a circuit: Ze + R1 + R2',
        'The RCD rating',
        'The supply frequency',
      ],
      correctIndex: 1,
      explanation:
        'Zs is the complete loop the fault current travels: external impedance Ze plus the circuit conductors R1 + R2.',
    },
    {
      question: 'Why must Zs be low enough?',
      options: [
        'To reduce the electricity bill',
        'So enough fault current flows to trip the protective device within the required disconnection time',
        'To stop the meter spinning backwards',
        'To keep voltage drop below 5%',
      ],
      correctIndex: 1,
      explanation:
        'A low loop impedance lets a big fault current flow instantly, forcing the device to disconnect fast enough to prevent electric shock.',
    },
    {
      question: 'Zs can be verified by direct measurement or by…',
      options: [
        'Guessing from the cable colour',
        'Adding the measured R1+R2 to Ze',
        'Reading the MCB rating',
        'Doubling the Ze value',
      ],
      correctIndex: 1,
      explanation:
        'Zs = Ze + (R1 + R2) — so measured dead-test values can verify the loop without a live test at every point.',
    },
  ],
  xeRinYRrXmM: [
    {
      question: "In Craig's shortcut, what is the 'magic number' used to find maximum Zs?",
      options: ['230', '80', '44', '1.37'],
      correctIndex: 2,
      explanation:
        'He divides 44 by the device rating — 44 ÷ 32 gives 1.37 Ω for a 32 A type B, matching the tabulated value.',
    },
    {
      question: 'Using the shortcut, how do you get the type C value from the type B value?',
      options: ['It is the same', 'Multiply by two', 'Add 0.5', 'Divide it by two'],
      correctIndex: 3,
      explanation:
        'A type C needs more fault current to operate, so the permitted loop impedance is halved.',
    },
    {
      question: 'What is the maximum Zs for a 32 A type B device at 230 V?',
      options: ['1.37 Ω', '0.35 Ω', '1.10 Ω', '2.30 Ω'],
      correctIndex: 0,
      explanation:
        '44 ÷ 32 = 1.37 Ω, which is exactly the tabulated figure — the 80% site value would be 1.10 Ω.',
    },
  ],
  DJn8KIQkApo: [
    {
      question: 'Where is the schedule of inspections found?',
      options: [
        'In the On-Site Guide',
        'On the electrical installation certificate',
        'On the consumer unit label',
        "In the manufacturer's instructions",
      ],
      correctIndex: 1,
      explanation:
        'It forms part of the electrical installation certificate, condensed in recent editions to around fourteen items.',
    },
    {
      question: 'What is the schedule of inspections?',
      options: [
        'A price list for the job',
        'A list of tools required',
        'The order of live tests',
        'The certificate checklist recording which items were inspected and found acceptable',
      ],
      correctIndex: 3,
      explanation:
        'It is the formal record on the certificate of every inspection item checked — marked acceptable, unacceptable or not applicable.',
    },
    {
      question: 'What sort of things does inspection pick up that testing cannot?',
      options: [
        'Insulation resistance values',
        'RCD trip times',
        'Earth loop impedance',
        'Visible issues like missing blanks, poor terminations, wrong cable supports or missing labels',
      ],
      correctIndex: 3,
      explanation:
        'Instruments cannot see a missing grommet or an unsupported cable — visual inspection catches the physical defects.',
    },
  ],
  SoMlwlFnNeQ: [
    {
      question: 'What is the core purpose of the NVQ portfolio?',
      options: [
        'To replace the AM2 assessment',
        'To evidence real work you have carried out competently on site',
        'To prove classroom attendance',
        'To collect manufacturer datasheets',
      ],
      correctIndex: 1,
      explanation:
        'The NVQ is a competence qualification — your portfolio proves with real site evidence that you can do the job.',
    },
    {
      question: 'What does the book actually cover?',
      options: [
        'Business and pricing',
        'Only the AM2',
        'The Level 2 and Level 3 diplomas',
        'The NVQ performance units and on-site assessment',
      ],
      correctIndex: 3,
      explanation:
        'Craig is clear it is about the NVQ performance units and on-site assessment, not the classroom diplomas.',
    },
    {
      question: 'What makes a single job especially valuable as portfolio evidence?',
      options: [
        'Someone else did the difficult parts',
        'It required no photographs',
        'It covers multiple criteria — install, terminate, test — in one well-documented piece of work',
        'It was quick to finish',
      ],
      correctIndex: 2,
      explanation:
        'One thorough, well-evidenced job can tick many criteria at once — far better than lots of thin fragments.',
    },
  ],
  oo0DM7YgHzQ: [
    {
      question: 'What is a skillscan?',
      options: [
        'The final exam',
        'An eye test for colour vision',
        'A self-assessment of your experience against the NVQ units, done at the start',
        'A test of your maths skills',
      ],
      correctIndex: 2,
      explanation:
        'The skillscan maps what you have already done against the standard, so you and your assessor can see the gaps.',
    },
    {
      question: 'What are the two parts of the skillscan?',
      options: [
        'An online quiz and a site visit',
        'A CV and a reference',
        'The form you complete, and an interview based on your answers',
        'A written exam and a practical test',
      ],
      correctIndex: 2,
      explanation:
        'You fill in the form first, then sit an interview on the answers you gave — which is why honest answers matter.',
    },
    {
      question: 'When completing a skillscan, you should be…',
      options: [
        'Brief — leave most of it blank',
        'Generous — tick everything to look good',
        'Honest — overclaiming hides gaps that will surface at assessment',
        'Anonymous',
      ],
      correctIndex: 2,
      explanation:
        'An honest skillscan is a planning tool; inflating it only delays finding out what you actually still need to do.',
    },
  ],
  Kxz0eg8qWwI: [
    {
      question: 'What are the essential (performance) criteria in an NVQ unit?',
      options: [
        'Optional extras for a distinction',
        'Written exam questions',
        'Suggestions your assessor can waive',
        'The specific things you must evidence doing — every one must be covered',
      ],
      correctIndex: 3,
      explanation:
        'Performance criteria are mandatory — each one must be demonstrably evidenced before the unit can be signed off.',
    },
    {
      question: 'How many containment types must be evidenced for this NVQ?',
      options: ['Three', 'All of them', 'Five', 'Four'],
      correctIndex: 2,
      explanation:
        'Five from the mandatory list — tray, metal conduit, metal trunking, PVC conduit and PVC trunking.',
    },
    {
      question: 'What happens if one criterion in a unit has no evidence?',
      options: [
        'The assessor fills it in for you',
        'The unit cannot be signed off until that gap is evidenced',
        'It is carried into the next qualification',
        'The unit can still be completed',
      ],
      correctIndex: 1,
      explanation:
        'Units are all-or-nothing — a single unevidenced criterion holds the whole unit open.',
    },
  ],
  XU8qy9O4r9E: [
    {
      question: 'What does NVQ unit 312 (2357) / 002 (1605) actually cover?',
      options: [
        'Health and safety on site',
        'Design of electrical installations',
        'Inspection, testing and commissioning',
        'Environmental legislation and protection',
      ],
      correctIndex: 3,
      explanation:
        'This unit is the environmental one — the Environmental Protection Act, hazardous waste and pollution control legislation.',
    },
    {
      question:
        'Craig calls this the most failed unit. What does he say the assessment mainly requires?',
      options: [
        'Reading the supplied document and giving examples from it',
        'Practical installation work',
        'A full written dissertation',
        'Memorising every regulation number',
      ],
      correctIndex: 0,
      explanation:
        'He is blunt that the answers are in the document provided — it is largely a reading and comprehension exercise.',
    },
    {
      question: 'Which of these is legislation covered by this unit?',
      options: [
        'The Building Regulations Part L',
        'BS 7671 Chapter 41',
        'The Electricity at Work Regulations only',
        'The Hazardous Waste Regulations',
      ],
      correctIndex: 3,
      explanation:
        'The unit covers environmental law including hazardous waste, pollution prevention and control of pollution.',
    },
  ],
  A_g9ghHxcz0: [
    {
      question: 'What two documents does Craig say work together for photo evidence?',
      options: [
        'The photos-relating-to-assessment guide and the photo guide',
        'The certificate and the schedule',
        'The regulations and the On-Site Guide',
        'A risk assessment and a method statement',
      ],
      correctIndex: 0,
      explanation: 'They were written in tandem and cover every unit, whichever NVQ you are on.',
    },
    {
      question: 'Where were these guides sent to learners?',
      options: [
        'They must be bought separately',
        'By post',
        'On a USB stick',
        'Through their OneFile emails',
      ],
      correctIndex: 3,
      explanation:
        'Everything he refers to has already been issued through OneFile — candidates just need to use it.',
    },
    {
      question: 'Do the photo guides differ between the 1605 and the 2357?',
      options: [
        'Yes, completely different sets',
        'No — all units are covered, so it does not matter which NVQ you are on',
        'Only for Level 2',
        'Only for the environmental unit',
      ],
      correctIndex: 1,
      explanation:
        'He built them to cover all units precisely so the same guidance works across both qualifications.',
    },
  ],
  DNtogbWMe_o: [
    {
      question: 'Why does OneFile need photos numbered correctly?',
      options: [
        'It sorts by a number algorithm, so bad numbering scatters the pictures',
        'Numbers are used for billing',
        'It rejects unnumbered files',
        'The assessor cannot open them otherwise',
      ],
      correctIndex: 0,
      explanation:
        'OneFile orders on the number, so inconsistent numbering leaves related photos all over the place.',
    },
    {
      question: 'Which evidence does Craig say does NOT need numbering?',
      options: [
        'The testing evidence',
        'Units 01, 02 and 03',
        'The PD evidence',
        'Every photograph',
      ],
      correctIndex: 1,
      explanation:
        'Those units just need a short description by the thumbnail; the PD evidence is what must be numbered.',
    },
    {
      question: 'Should unit numbers be added in front of the photo numbers?',
      options: [
        'Only for PD1',
        'Only on the 2357',
        'Yes, always',
        'No — putting 04 or 05 in front breaks the numbering system',
      ],
      correctIndex: 3,
      explanation: 'He is explicit that prefixing the unit number scrambles the sort order.',
    },
  ],
  'OXTPWLR-EHQ': [
    {
      question: 'What is OneFile?',
      options: [
        'The e-portfolio platform where NVQ evidence is uploaded and assessed',
        'A cable management system',
        'A test instrument brand',
        'A type of consumer unit',
      ],
      correctIndex: 0,
      explanation:
        'OneFile is the online portfolio system — evidence is uploaded, mapped to criteria and reviewed by your assessor there.',
    },
    {
      question: 'In OneFile, how is an uploaded photo given its label?',
      options: [
        'The filename is used automatically',
        'Labels cannot be added at all',
        'By emailing the assessor separately',
        'You edit it in OneFile using the pencil button',
      ],
      correctIndex: 3,
      explanation:
        'The label is added inside OneFile after upload, using the edit (pencil) control on the picture.',
    },
    {
      question: 'How does Craig organise evidence within OneFile?',
      options: [
        'In an external cloud drive',
        'Everything in one long list',
        'By date only',
        'Folders created per unit under assessment evidence',
      ],
      correctIndex: 3,
      explanation:
        'He creates a folder per unit inside assessment evidence, so each piece of evidence lands where the assessor expects it.',
    },
  ],
  'pF-IbFsbPVQ': [
    {
      question: 'Why is witness testimony often considered weak NVQ evidence?',
      options: [
        'Witnesses write too much',
        'Assessors cannot read handwriting',
        'It is someone else’s word rather than direct, verifiable proof of your own work',
        'It is too expensive',
      ],
      correctIndex: 2,
      explanation:
        'A statement says you did the work; photos, certificates and observation show it — direct evidence always beats second-hand.',
    },
    {
      question: "What did Craig's due diligence on the witness testimony reveal?",
      options: [
        'The company named on it did not exist on Companies House',
        'The dates were a year out',
        'The witness had the wrong qualification',
        'The signature was unreadable',
      ],
      correctIndex: 0,
      explanation:
        'A simple Companies House search showed the employer was fictitious — which is why he will not accept testimony as evidence.',
    },
    {
      question: 'What is the stronger alternative to relying on witness statements?',
      options: [
        'A longer written account',
        'Direct evidence — staged photos of you working, your test results, and assessor observation',
        'More witness statements',
        'A verbal promise',
      ],
      correctIndex: 1,
      explanation:
        'Build the portfolio on evidence an assessor can verify with their own eyes — testimony at most supports it.',
    },
  ],
  Ft_UdvFOvts: [
    {
      question: 'What does George do first when preparing for assessment?',
      options: [
        'Memorise the whole regulations book',
        'Revise the night before',
        'Ask other candidates what came up',
        'Look at the criteria he will be assessed against',
      ],
      correctIndex: 3,
      explanation:
        'Starting from the assessment criteria tells you what to study — everything else follows from that.',
    },
    {
      question: 'During an assessment discussion, what are assessors listening for?',
      options: [
        'Speed of speech',
        'Long silences',
        'Understanding — why you did it that way, what the regulations required, what you would do differently',
        'Word-for-word regulation numbers only',
      ],
      correctIndex: 2,
      explanation:
        'Competence is shown by understanding decisions, not reciting — explain the reasoning behind your work.',
    },
    {
      question: 'How does George check he genuinely knows the material?',
      options: [
        'He asks his employer to quiz him',
        'He tests himself online',
        'He re-reads his notes repeatedly',
        'He practises explaining it out loud without looking at his notes',
      ],
      correctIndex: 3,
      explanation:
        'If he can explain it aloud unaided, he knows he understands it rather than just recognises it.',
    },
  ],
  qthuFLNSrlg: [
    {
      question:
        'What is the relationship between line voltage and phase voltage in a star-connected UK supply?',
      options: [
        'Line = phase × √3 (400 V ≈ 230 V × 1.732)',
        'Line = phase ÷ 2',
        'Line = phase × 2',
        'They are always equal',
      ],
      correctIndex: 0,
      explanation: 'The √3 factor links them: 230 V line-to-neutral gives 400 V line-to-line.',
    },
    {
      question: 'Where does the single phase voltage at a socket come from?',
      options: [
        'A connection between one phase (one coil) and the neutral',
        'Two phases connected together',
        'All three phases combined',
        'The earth conductor',
      ],
      correctIndex: 0,
      explanation:
        'A single phase supply takes one coil of the generator or transformer, measured against neutral.',
    },
    {
      question: 'Why does the measured voltage at a socket vary through the day?',
      options: [
        'The frequency changes hourly',
        'The meter is faulty',
        'Because of the earth connection',
        'Losses in the wiring and normal variation in the supply',
      ],
      correctIndex: 3,
      explanation:
        'Logging over 24 hours showed it drifting by several volts — cable losses and changing demand both play a part.',
    },
  ],
  u0SsejDCVkU: [
    {
      question: 'A three-phase transformer changes voltage using…',
      options: [
        'Semiconductor switching',
        'Chemical reactions',
        'Sliding contacts',
        'Electromagnetic induction between primary and secondary windings on a shared core',
      ],
      correctIndex: 3,
      explanation:
        'Alternating flux in the core induces voltage in the secondary windings — the turns ratio sets the voltage change.',
    },
    {
      question: 'Why is the distribution secondary usually star-connected?',
      options: [
        'Star uses less copper in all cases',
        'Star removes the need for an earth',
        'Star provides a neutral point, giving both 400 V and 230 V supplies',
        'Delta cannot carry current',
      ],
      correctIndex: 2,
      explanation:
        'The star point becomes the neutral — letting one transformer serve three-phase 400 V and single-phase 230 V customers.',
    },
    {
      question: 'What sets the voltage ratio of a transformer?',
      options: [
        'The core colour',
        'The ratio of turns between primary and secondary windings',
        'The cable size on the primary',
        'The frequency alone',
      ],
      correctIndex: 1,
      explanation: 'Voltage transforms in proportion to the turns ratio of the windings.',
    },
  ],
  '59HBoIXzX_c': [
    {
      question: 'What makes the rotor of an induction motor turn?',
      options: [
        'The stator’s rotating magnetic field inducing currents in the rotor, which create their own opposing field',
        'Permanent magnets on the stator',
        'A mechanical crank',
        'Brushes feeding it current directly',
      ],
      correctIndex: 0,
      explanation:
        'The rotating stator field induces currents in the rotor bars; those currents create a field that chases the stator field — no brushes needed.',
    },
    {
      question: 'What is slip in an induction motor?',
      options: [
        'The motor sliding on its mounts',
        'The rotor running slightly slower than the rotating field',
        'The bearings wearing out',
        'A loss of supply',
      ],
      correctIndex: 1,
      explanation:
        'The rotor must lag the synchronous speed slightly — without that difference no current would be induced and no torque produced.',
    },
    {
      question: 'What is the fan on the back of an induction motor for?',
      options: [
        'Cooling the load it drives',
        'Filtering dust from the windings',
        'Providing extra torque',
        'Blowing ambient air over the casing to stop the motor overheating',
      ],
      correctIndex: 3,
      explanation:
        'If it runs too hot the insulation on the internal coils melts, short circuits and destroys the motor — the fan and casing fins carry that heat away.',
    },
  ],
  h89TTwlNnpY: [
    {
      question: 'Why use a star-delta starter on a large motor?',
      options: [
        'To reduce the very high starting current by beginning in star',
        'To convert the motor to single phase',
        'To make the motor run backwards',
        'To increase the starting torque',
      ],
      correctIndex: 0,
      explanation:
        'Direct-on-line starting draws a huge inrush; starting in star cuts the current (and torque) to about a third.',
    },
    {
      question: 'In star, the voltage across each motor winding is…',
      options: [
        'Line voltage divided by √3 — about 230 V',
        'The full 400 V line voltage',
        'Zero',
        'Double the line voltage',
      ],
      correctIndex: 0,
      explanation:
        'Star connection puts each winding between line and the star point — 400 ÷ √3 ≈ 230 V.',
    },
    {
      question: 'When does the starter switch from star to delta?',
      options: [
        'Immediately at switch-on',
        'Only if a fault occurs',
        'It never switches',
        'Once the motor has run up to speed, so it then develops full power',
      ],
      correctIndex: 3,
      explanation:
        'After run-up, the changeover to delta applies full line voltage across each winding for normal running.',
    },
  ],
  yEPe7RDtkgo: [
    {
      question: 'How does a VFD control the speed of an AC motor?',
      options: [
        'By changing the number of poles mechanically',
        'By adding resistance in series',
        'By varying the frequency (and voltage) supplied to the motor',
        'By weakening the shaft coupling',
      ],
      correctIndex: 2,
      explanation:
        'Motor speed follows supply frequency — the drive synthesises a variable-frequency output to set any speed.',
    },
    {
      question: 'What are the three internal stages of a typical VFD?',
      options: [
        'Fuse, switch, lamp',
        'Transformer → battery → relay',
        'Rectifier → DC bus → inverter',
        'Filter → thermostat → contactor',
      ],
      correctIndex: 2,
      explanation:
        'Incoming AC is rectified to DC, smoothed on the DC bus, then switched back into variable-frequency AC by the inverter stage.',
    },
    {
      question: 'What problem with fixed-speed compressors does a VFD solve?',
      options: [
        'They cannot be earthed',
        'They need three phases',
        'They only switch on and off, giving poor control and high inrush currents',
        'They run backwards',
      ],
      correctIndex: 2,
      explanation:
        'Varying the speed matches output to demand instead of cycling flat out and off, which is where the energy saving comes from.',
    },
  ],
  QykwWs3L1W8: [
    {
      question: 'Fundamentally, what does a heat pump do?',
      options: [
        'Burns fuel to create heat',
        'Stores heat in batteries',
        'Moves existing heat from outside to inside using a refrigeration cycle',
        'Generates electricity from heat',
      ],
      correctIndex: 2,
      explanation:
        'A heat pump is a refrigerator in reverse — it moves heat rather than creating it, which is why it beats direct electric heating.',
    },
    {
      question: 'Which component lets a heat pump provide both heating and cooling?',
      options: [
        'The filter drier',
        'The compressor alone',
        'The reversing valve',
        'The expansion valve',
      ],
      correctIndex: 2,
      explanation:
        'The reversing valve swaps the direction of refrigerant flow, turning the indoor coil from a condenser into an evaporator.',
    },
    {
      question: 'How can a heat pump extract heat from cold winter air?',
      options: [
        'It stores summer heat',
        'It uses an immersion heater instead',
        'Its refrigerant boils at very low temperatures, so even cold air holds usable heat',
        'It cannot work below 15°C',
      ],
      correctIndex: 2,
      explanation:
        'The refrigerant evaporates well below 0°C — cold outside air is still warm enough to boil it and be pumped indoors.',
    },
  ],
  G53tTKoakcY: [
    {
      question: 'In which component does the refrigerant absorb heat from outside?',
      options: ['The expansion valve', 'The evaporator', 'The compressor', 'The condenser'],
      correctIndex: 1,
      explanation:
        'The evaporator is where the low-pressure refrigerant boils, soaking up heat from the outside air.',
    },
    {
      question: 'What does the compressor do to the refrigerant?',
      options: [
        'Raises its pressure and therefore its temperature',
        'Cools it down',
        'Turns it back to liquid directly',
        'Filters it',
      ],
      correctIndex: 0,
      explanation:
        'Compressing the vapour concentrates its heat energy — the hot high-pressure gas can then release heat indoors.',
    },
    {
      question: 'Where does the refrigerant give up its heat to the heating system?',
      options: ['The filter drier', 'The condenser', 'The reversing valve', 'The evaporator'],
      correctIndex: 1,
      explanation:
        'In the condenser the hot refrigerant condenses back to liquid, transferring its heat to the water or air circuit.',
    },
  ],
  U3iL172VjAc: [
    {
      question: 'What does SCOP measure?',
      options: [
        'Installation time',
        'The refrigerant weight',
        'The noise level of the unit',
        'Seasonal efficiency — average heat output per unit of electricity across the whole year',
      ],
      correctIndex: 3,
      explanation:
        'SCOP averages the COP over a full heating season, giving a more honest efficiency figure than a single test point.',
    },
    {
      question: 'What is the efficiency of a direct electric resistance heater?',
      options: ['300%', '85%', 'Around 60%', '100%'],
      correctIndex: 3,
      explanation:
        'Resistance heating turns electricity straight into heat, so you get exactly what you put in and no more — which is the benchmark heat pumps beat.',
    },
    {
      question: 'Why do heat pumps favour larger radiators or underfloor heating?',
      options: [
        'Small radiators explode',
        'For appearance',
        'Underfloor heating needs no controls',
        'They run at lower flow temperatures, so bigger emitter surfaces are needed to deliver the same heat',
      ],
      correctIndex: 3,
      explanation:
        'Lower flow temperature is where heat pumps are efficient — larger emitters compensate by radiating over more area.',
    },
  ],
  Yxt72aDjFgY: [
    {
      question: 'What do solar PV cells produce?',
      options: ['Hot water', 'Direct current', 'Alternating current', 'Gas'],
      correctIndex: 1,
      explanation:
        'The photovoltaic effect produces DC — an inverter then converts it to AC for the home and grid.',
    },
    {
      question: 'What happens when light hits a PV cell?',
      options: [
        'Nothing until night time',
        'Photons knock electrons free across the silicon junction, creating current',
        'The cell heats water directly',
        'The glass generates static',
      ],
      correctIndex: 1,
      explanation:
        'Photon energy frees electrons at the semiconductor junction — the cell’s electric field drives them round the external circuit.',
    },
    {
      question: 'Why are panels connected in series strings?',
      options: [
        'To make them easier to clean',
        'Because parallel is impossible',
        'To add their voltages to a level the inverter works efficiently with',
        'To reduce the voltage',
      ],
      correctIndex: 2,
      explanation:
        'Series connection sums panel voltages — strings reach the operating window the inverter needs.',
    },
  ],
  iIqhAX0I7lI: [
    {
      question: 'What does a power inverter do?',
      options: [
        'Stores electricity',
        'Steps voltage down only',
        'Converts AC to DC',
        'Converts DC to AC',
      ],
      correctIndex: 3,
      explanation:
        'An inverter turns DC (from batteries or solar) into AC for normal appliances and grid connection.',
    },
    {
      question: 'How does an inverter create an AC output from steady DC?',
      options: [
        'By using a transformer alone',
        'By rapidly switching the DC on and off in patterns (PWM) that build a sine-shaped output',
        'By spinning a generator',
        'By heating a filament',
      ],
      correctIndex: 1,
      explanation:
        'Fast electronic switching with pulse-width modulation approximates the sine wave, then filtering smooths it.',
    },
    {
      question: 'Why do solar panels and batteries need an inverter?',
      options: [
        'They produce DC, but household appliances run on AC',
        'They produce too much voltage',
        'They cannot be earthed otherwise',
        'They generate at the wrong frequency',
      ],
      correctIndex: 0,
      explanation:
        'Panels and batteries give direct current; sockets and appliances expect alternating current, so it has to be converted.',
    },
  ],
  Hf875eOVrVI: [
    {
      question: 'A wind turbine converts what into electricity?',
      options: ['The kinetic energy of moving air', 'Sunlight', 'Heat in the air', 'Humidity'],
      correctIndex: 0,
      explanation: 'Moving air turns the aerodynamic blades; the rotation drives a generator.',
    },
    {
      question: 'How do turbine blades actually capture the wind’s energy?',
      options: [
        'The wind simply pushes them like a sail',
        'Static electricity from friction',
        'They are aerofoils — lift generated by air flowing over their shape turns the rotor',
        'Magnets in the blade tips',
      ],
      correctIndex: 2,
      explanation:
        'Blades work like aircraft wings — lift, not simple push, is what spins a modern turbine efficiently.',
    },
    {
      question: 'Why are large wind turbines mounted so high?',
      options: [
        'To keep them out of reach',
        'To reduce the foundation size',
        'To make maintenance easier',
        'Because wind is faster and less turbulent higher up, and big blades need the clearance',
      ],
      correctIndex: 3,
      explanation:
        'Wind speed is the largest influence on output, and it rises with height — which is also why the biggest turbines go offshore.',
    },
  ],
  '7r9HvWQyWcs': [
    {
      question: 'What is actually inside the solar hot water panel?',
      options: [
        'Compressed air',
        'Nothing — it heats the roof directly',
        'Copper pipes containing a refrigerant with a very low boiling point',
        'Water on its way to the taps',
      ],
      correctIndex: 2,
      explanation:
        'Craig is blunt that the panel is not full of tap water — it is copper pipework carrying a refrigerant that boils at around 38°C.',
    },
    {
      question: 'How does the collected heat reach the taps?',
      options: [
        'By electric cable',
        'It does not — the panels only heat the roof',
        'Hot panel water flows straight to the taps',
        'The heated transfer fluid passes through a coil in the cylinder, heating the stored water indirectly',
      ],
      correctIndex: 3,
      explanation:
        'A pumped closed loop carries heat from the collector to a coil heat-exchanger inside the hot water cylinder.',
    },
    {
      question: 'How does the collected heat get into the stored water?',
      options: [
        'An immersion heater does all the work',
        'The copper pipe passes through the cylinder and acts as a heating element',
        'The tank sits on the roof',
        'The panel water flows straight to the taps',
      ],
      correctIndex: 1,
      explanation:
        'The pipe entering the tank behaves like a heating element, warming the cold water around it — the two never mix.',
    },
  ],
  '4lAyzRxsbDc': [
    {
      question: 'To measure voltage, the multimeter leads are connected…',
      options: [
        'Through a fuse first',
        'To earth only',
        'In series with the load',
        'In parallel, across the two points being measured',
      ],
      correctIndex: 3,
      explanation:
        'Voltage is a difference between two points — the meter sits across them, in parallel.',
    },
    {
      question: 'To measure current, the meter must be connected…',
      options: [
        'In series, so the circuit current flows through the meter',
        'It cannot measure current',
        'Between line and earth',
        'In parallel across the supply',
      ],
      correctIndex: 0,
      explanation:
        'Current must pass through the meter to be counted — that means breaking into the circuit and wiring it in series.',
    },
    {
      question: 'Before measuring resistance with a multimeter, the circuit must be…',
      options: [
        'Earthed at both ends',
        'Live, for an accurate reading',
        'Dead and isolated — the meter supplies its own test current',
        'Running at full load',
      ],
      correctIndex: 2,
      explanation:
        'Ohms ranges inject a small test current; measuring a live circuit gives false readings and can damage the meter.',
    },
  ],
  'J6w-ASh6eKw': [
    {
      question: 'What does the main switch in a consumer unit do?',
      options: [
        'Boosts the voltage',
        'Measures energy use',
        'Disconnects the whole installation from the supply',
        'Protects one lighting circuit',
      ],
      correctIndex: 2,
      explanation:
        'The double-pole main switch isolates every circuit in the installation at once.',
    },
    {
      question: 'What is the job of an MCB?',
      options: [
        'To convert AC to DC',
        'To protect its circuit against overload and short-circuit current',
        'To detect earth leakage',
        'To store energy',
      ],
      correctIndex: 1,
      explanation:
        'The miniature circuit breaker trips on overcurrent — thermal for overload, magnetic for short circuit.',
    },
    {
      question: 'What does a 30 mA RCD protect against that an MCB cannot?',
      options: [
        'Electric shock, by detecting small leakage currents to earth and tripping fast',
        'High bills',
        'Voltage surges',
        'Overloaded cables',
      ],
      correctIndex: 0,
      explanation:
        'An RCD compares line and neutral current — a tiny imbalance flowing to earth (possibly through a person) trips it in milliseconds.',
    },
  ],
  'E-1G_4kh5Rk': [
    {
      question: 'A sustainable price for a job must cover…',
      options: [
        'Labour only',
        'Materials, labour, overheads AND profit',
        'Whatever the customer offers',
        'Materials only',
      ],
      correctIndex: 1,
      explanation:
        'Forgetting overheads (van, insurance, tools, admin) or profit means working for less than it costs to exist.',
    },
    {
      question: 'What do the guests say customers already have in their heads about price?',
      options: [
        'An accurate idea of trade costs',
        'Nothing at all',
        "A 'going rate' from nowhere in particular, with the bar set very low",
        'That electricians are always cheap',
      ],
      correctIndex: 2,
      explanation:
        'Their point is that customers arrive with an invented going rate, and too many electricians price down to meet it.',
    },
    {
      question: 'Why is copying another electrician’s day rate a poor pricing strategy?',
      options: [
        'Day rates never change',
        'It is illegal',
        'Their overheads, costs and circumstances differ from yours — their rate may not even cover your costs',
        'Customers prefer random pricing',
      ],
      correctIndex: 2,
      explanation:
        'Price from YOUR numbers — your costs, your overheads, your target income — not someone else’s guess.',
    },
  ],
  '4FS4XZv5puY': [
    {
      question: 'Before going self-employed, what is the most important thing to have in place?',
      options: [
        'A large social media following',
        'Money set aside to cover the gap before invoices get paid',
        'A brand new van',
        'The cheapest prices in your area',
      ],
      correctIndex: 1,
      explanation:
        'Cash flow, not turnover, sinks new trade businesses — work done in month one may not be paid until month two or three.',
    },
    {
      question:
        'Which of these is a cost employed electricians rarely see, but the self-employed must cover?',
      options: [
        'Public liability insurance, tools, van, accountant and pension',
        'VAT on their own wages',
        "Their employer's corporation tax",
        "The cost of electricity in a customer's home",
      ],
      correctIndex: 0,
      explanation:
        'Every overhead an employer used to absorb becomes yours — and all of it has to come out of your day rate.',
    },
    {
      question: 'What does Ben say college never taught him?',
      options: [
        'How to read the regulations',
        'How to wire a consumer unit',
        'Safe isolation',
        'The business side — quotes, invoices, VAT, self-assessment and insurances',
      ],
      correctIndex: 3,
      explanation:
        'College covers the electrical work; nobody teaches the paperwork and money side that running your own business demands.',
    },
  ],
  q34ymc1fAzk: [
    {
      question: 'What is the key legal difference between a sole trader and a limited company?',
      options: [
        'Only limited companies can employ people',
        'Sole traders pay no tax',
        'Sole traders cannot buy materials on account',
        'A limited company is a separate legal entity, so personal liability is limited',
      ],
      correctIndex: 3,
      explanation:
        'A sole trader and their business are legally the same person; a limited company is separate, which limits personal liability.',
    },
    {
      question: 'What does Chris give as the main benefit of trading as a limited company?',
      options: [
        "Your personal assets are not at risk in the way a sole trader's are",
        'No paperwork at all',
        'Lower VAT',
        'Automatic access to bigger contracts',
      ],
      correctIndex: 0,
      explanation:
        "Their example is blunt: if a job went badly wrong, a sole trader's own house could be at risk — though they also note director's guarantees have closed the old escape routes.",
    },
    {
      question: 'What is the honest downside of running a limited company?',
      options: [
        'You lose the right to insurance',
        'More admin — filings, accounts and stricter record-keeping',
        'You cannot do domestic work',
        'You must register for VAT immediately',
      ],
      correctIndex: 1,
      explanation:
        'The tax position can be better, but it comes with real administrative obligations and usually accountancy costs.',
    },
  ],
  e0RdT_zgY9s: [
    {
      question: 'In this calculator, over how many weeks of the year is the target income spread?',
      options: ['40 weeks', '46 weeks', '52 weeks', '12 months exactly'],
      correctIndex: 1,
      explanation:
        'He works on 46 weeks, not 52, so holidays and downtime are allowed for in the rate.',
    },
    {
      question: 'Which costs must an hourly rate cover before any of it becomes wages?',
      options: [
        'Only the cost of your apprentice',
        'Nothing — overheads come out of profit',
        'Only the materials for the job',
        'Van, fuel, insurance, tools, phone, accountant, training and holiday cover',
      ],
      correctIndex: 3,
      explanation:
        'Every overhead has to be recovered across your chargeable hours, otherwise you are funding the business from your own wage.',
    },
    {
      question: 'Which of these does the calculator count as a monthly overhead?',
      options: [
        "The customer's materials",
        'Only fuel',
        'Your holiday pay alone',
        'Van hire, van insurance, public liability and scheme registration',
      ],
      correctIndex: 3,
      explanation:
        'He works through fuel, van, insurance, public liability, Part P registration and software — all of it has to be recovered by the hourly rate.',
    },
  ],
  TcjhnxbM4ug: [
    {
      question: 'Why is a self-employed day rate not comparable to an employed day rate?',
      options: [
        'The self-employed rate must fund holiday, sick pay, pension, tools, insurance and downtime',
        'There is no difference at all',
        'Self-employed work is always easier',
        'Employed electricians pay their own insurance',
      ],
      correctIndex: 0,
      explanation:
        'An employer funds a great deal that never appears on a payslip — self-employment moves all of it onto your rate.',
    },
    {
      question: 'What does unpaid time off mean for how you price?',
      options: [
        'It has no effect on pricing',
        'Customers should be billed for your holidays separately',
        'You should work every day of the year',
        'Holidays and quiet weeks must be built into the rate you charge for working weeks',
      ],
      correctIndex: 3,
      explanation:
        'You are only earning on the weeks you work, so those weeks have to carry the ones you do not.',
    },
    {
      question: 'What is the risk of pricing below your true cost to stay busy?',
      options: [
        'You build a reputation for quality',
        'Your insurance premium falls',
        'You end up working full-time while going backwards financially',
        'It automatically leads to bigger jobs',
      ],
      correctIndex: 2,
      explanation:
        'Being busy and being profitable are different things — underpricing simply means working harder for less.',
    },
  ],
  RMJiJmrXhaM: [
    {
      question: 'What is step one of his quoting process?',
      options: [
        'Visit the site and understand exactly what the customer wants, taking notes and photos',
        'Order the materials',
        'Send a rough price by text',
        'Work out your labour rate',
      ],
      correctIndex: 0,
      explanation:
        'Everything else is guesswork until you have actually seen the job and recorded what is being asked for.',
    },
    {
      question: 'Why should a quote state exactly what is and is not included?',
      options: [
        'So the scope is agreed up front and extras are not assumed to be free',
        'To make the document longer',
        'So the customer cannot compare prices',
        'It is a legal requirement for all quotes',
      ],
      correctIndex: 0,
      explanation:
        'A clear scope protects both sides — it is how you avoid doing work you never priced for.',
    },
    {
      question: 'Why does he say to add extra hours on a longer job?',
      options: [
        'Because things never go to plan and something always comes up',
        'To slow the job down',
        'To pad the price',
        'Because customers expect it',
      ],
      correctIndex: 0,
      explanation:
        "He builds in contingency deliberately — a couple of weeks' work will throw up something unforeseen.",
    },
  ],
  PtdMwhYCnnQ: [
    {
      question: 'What is the main purpose of taking a deposit?',
      options: [
        'It increases the total price of the job',
        'It is required by BS 7671',
        'It replaces the need for a written quote',
        'It covers your materials and proves the customer is committed',
      ],
      correctIndex: 3,
      explanation:
        'A deposit funds the materials you buy up front and confirms the customer intends to go ahead.',
    },
    {
      question: 'What is the risk of buying all materials for a large job with your own money?',
      options: [
        'Materials are always cheaper that way',
        'There is no risk if the customer seems friendly',
        "Your cash is tied up in someone else's job, and you carry the loss if they cancel or refuse to pay",
        'It voids your insurance',
      ],
      correctIndex: 2,
      explanation:
        "You become the customer's lender — with none of the protections an actual lender would insist on.",
    },
    {
      question: 'How should deposits and payment terms be agreed?',
      options: [
        'In writing before work starts, so there is no dispute later',
        'After the work is finished',
        'Only when the customer asks',
        'Verbally, to keep things friendly',
      ],
      correctIndex: 0,
      explanation:
        'Written terms agreed up front are what you fall back on if a payment goes wrong.',
    },
  ],
  Qwx1yo5DH48: [
    {
      question: "What happened with the £90 invoice in Ben's story?",
      options: [
        'It was paid immediately',
        'The customer disputed the work',
        'He wrote it off',
        'It was forgotten for three or four months before he chased it',
      ],
      correctIndex: 3,
      explanation:
        'Being busy, he lost track of it — which is exactly how small unpaid invoices quietly become old ones.',
    },
    {
      question: 'What does Ben say the real cost of chasing that money was?',
      options: [
        'The bank charges',
        'The cost of a solicitor',
        'The fuel to get there',
        'The time it took out of his working day',
      ],
      correctIndex: 3,
      explanation:
        'Even when you eventually get paid, the hours spent chasing are hours you were not earning.',
    },
    {
      question: 'What habit reduces the number of non-paying customers in the first place?',
      options: [
        'Taking deposits, agreeing terms in writing and invoicing promptly',
        'Only working for people you know',
        'Always accepting cash only',
        'Never issuing written quotes',
      ],
      correctIndex: 0,
      explanation:
        'Most payment problems are prevented at the start of the job, not solved at the end of it.',
    },
  ],
  '3F0pkpxtTBM': [
    {
      question: 'Where does most work come from for a new electrical business?',
      options: [
        'National advertising campaigns',
        'Cold calling large contractors',
        'Buying the cheapest leads available',
        'Recommendations, repeat customers and local visibility',
      ],
      correctIndex: 3,
      explanation:
        'Word of mouth and local presence outperform paid advertising for most domestic trade businesses.',
    },
    {
      question: 'Why is doing a good job on small work still worth the effort?',
      options: [
        'Because small jobs are legally simpler',
        "Today's small job is often the source of tomorrow's rewire, recommendation or review",
        'It reduces your insurance premium',
        'Small jobs are always the most profitable',
      ],
      correctIndex: 1,
      explanation: 'Customers judge you on the small job and remember you for the big one.',
    },
    {
      question: 'What makes other trades a valuable source of work?',
      options: [
        'They will do your paperwork',
        'They are legally obliged to refer work',
        'They can insure your business',
        'Builders, kitchen fitters and plumbers meet customers who need an electrician, and pass work both ways',
      ],
      correctIndex: 3,
      explanation:
        'Building relationships with other trades creates a steady, cost-free referral stream.',
    },
  ],
  UlXKeKe6kjI: [
    {
      question: 'What is the point of setting up a Google Business Profile?',
      options: [
        'It removes the need for reviews',
        'It replaces the need for insurance',
        'It appears when local people search for an electrician near them',
        'It guarantees the top position in all searches',
      ],
      correctIndex: 2,
      explanation:
        'Local search is where most domestic customers start, and the profile is what puts you in that result.',
    },
    {
      question: 'What opening hours does he recommend setting on the Google Business Profile?',
      options: [
        'Only the hours you actually work',
        'Weekdays nine to five',
        'Leave the hours blank',
        'Open 24 hours, since you can choose whether to answer the phone',
      ],
      correctIndex: 3,
      explanation:
        'His view is that 24-hour opening keeps you visible to anyone searching, and you simply do not answer when you are not working.',
    },
    {
      question: 'What does Ben recommend using as the profile picture?',
      options: [
        'No picture at all',
        'Your company logo',
        'A photo of yourself, ideally next to your van',
        'A stock image of a consumer unit',
      ],
      correctIndex: 2,
      explanation:
        'A friendly face next to a sign-written van builds trust, because customers can see who is turning up.',
    },
  ],
  _HVrlzxevo0: [
    {
      question: 'Why do online reviews matter so much for a trade business?',
      options: [
        'Customers use them to decide who to trust before they ever make contact',
        'They increase your hourly rate automatically',
        'They replace the need for qualifications',
        'They are required to register as an electrician',
      ],
      correctIndex: 0,
      explanation:
        'Reviews are the modern version of a personal recommendation — they do the selling before you speak to anyone.',
    },
    {
      question: 'When is the best time to ask a customer for a review?',
      options: [
        'Only if they complain',
        'Several months later',
        'Straight after completing the job, while they are pleased with the work',
        'Before starting the work',
      ],
      correctIndex: 2,
      explanation:
        'Satisfaction fades quickly — asking while the job is fresh gets far more responses.',
    },
    {
      question: 'What is the best way to handle a negative review?',
      options: [
        'Reply angrily to defend yourself',
        'Demand it be removed',
        'Reply calmly and professionally, offering to put things right',
        'Ignore it completely',
      ],
      correctIndex: 2,
      explanation:
        'Future customers read the reply as much as the review — a measured response often reads better than a perfect record.',
    },
  ],
  '0ydD5bpgmss': [
    {
      question:
        'In this walkthrough, how are the upstairs and downstairs socket circuits arranged?',
      options: [
        'Fed from the lighting circuit',
        'Everything on one single ring',
        'As separate circuits, so upstairs and downstairs are not on the same one',
        'An individual radial to every socket',
      ],
      correctIndex: 2,
      explanation:
        'Splitting the floors means one fault or trip does not take out the sockets throughout the whole house.',
    },
    {
      question: 'What cable size does he run for a dedicated kitchen appliance circuit?',
      options: ['1.0 mm²', '16 mm²', '4 mm²', '1.5 mm²'],
      correctIndex: 2,
      explanation:
        'He runs 4 mm² for the dedicated kitchen socket supply feeding heavy appliances like the washing machine and tumble dryer.',
    },
    {
      question: 'Why do the oven and hob get their own circuits?',
      options: [
        'Because sockets are not permitted in kitchens',
        'So they can share the lighting circuit',
        'Because they are high-demand fixed appliances that warrant dedicated supplies',
        'To reduce the total number of circuits',
      ],
      correctIndex: 2,
      explanation:
        'Large fixed appliances get dedicated circuits rather than competing with the socket circuits.',
    },
  ],
  Nlbdf2EpNK4: [
    {
      question: 'What makes a ring final circuit a ring?',
      options: [
        'It only supplies one room',
        'It uses 1.5 mm² cable',
        'It has two protective devices',
        'The line, neutral and CPC each form a complete loop back to the same terminals in the board',
      ],
      correctIndex: 3,
      explanation:
        'Both ends of every conductor return to the same terminals, giving current two paths around the ring.',
    },
    {
      question: 'What is the risk when adding sockets to an existing ring?',
      options: [
        'The voltage will double',
        'Accidentally breaking the ring or creating an interconnection so it no longer behaves as a ring',
        'The circuit will trip immediately',
        'Nothing — a ring cannot be damaged by additions',
      ],
      correctIndex: 1,
      explanation:
        'A badly-made connection can leave the ring open or bridged, which the ring final test is designed to reveal.',
    },
    {
      question: 'What should be done after altering a ring final circuit?',
      options: [
        'Re-test the ring to confirm it is still continuous and correctly connected',
        'Nothing, if the sockets work',
        'Increase the breaker to 40 A',
        'Change the consumer unit',
      ],
      correctIndex: 0,
      explanation:
        'Any alteration must be tested and certified — a working socket does not prove the ring is intact.',
    },
  ],
  '8_eqJSnvHSg': [
    {
      question: 'Where must an unfused spur be connected to a ring final circuit?',
      options: [
        'Only at the furthest socket',
        'At a socket on the ring, a joint in the ring, or the origin at the board',
        'Only at the consumer unit',
        'From any convenient point, including another spur',
      ],
      correctIndex: 1,
      explanation:
        'A spur must come off the ring itself — connecting one to another spur is what the rule prohibits.',
    },
    {
      question: 'Why is a spur taken from another spur a problem?',
      options: [
        'The load is carried by a single 2.5 mm² leg with no second path, unlike the ring itself',
        'It makes the ring longer',
        'Spurs are never permitted on ring circuits',
        'It cannot physically be wired',
      ],
      correctIndex: 0,
      explanation:
        'The ring shares current over two paths; a cascaded spur puts everything on one unprotected leg.',
    },
    {
      question: 'How many unfused spurs may be taken from one socket on the ring?',
      options: ['One', 'As many as needed', 'None at all', 'Two'],
      correctIndex: 0,
      explanation:
        'The rule referred to in the video is one spur per socket on the ring — which is also why a spur off a spur is out.',
    },
  ],
  '4csv_ofVcwA': [
    {
      question: 'In a loop-in lighting circuit, what is at the ceiling rose?',
      options: [
        'The circuit protective device',
        'Only the switch wire',
        'The permanent line, neutral, switch wire and CPC connections',
        'Nothing but the lamp holder',
      ],
      correctIndex: 2,
      explanation:
        'The rose is where the loop-in connections are made — permanent line, neutral, the switched line and earths.',
    },
    {
      question: 'What must the switch wire be identified with at both ends?',
      options: [
        'Brown sleeving or marking, because it is a line conductor',
        'Green and yellow sleeving',
        'Blue tape',
        'Nothing — its colour is obvious',
      ],
      correctIndex: 0,
      explanation:
        'A blue or black conductor used as a switch line must be marked brown so nobody mistakes it for a neutral.',
    },
    {
      question: 'How did he establish the fault was the switch and not the ceiling rose?',
      options: [
        'The customer told him',
        'He guessed from the age of the fitting',
        'He found a supply present at the rose, so the fault had to be further along at the switch',
        'He replaced both anyway',
      ],
      correctIndex: 2,
      explanation:
        'Testing at the rose showed the supply arriving, which pointed straight at the switch the customer had blamed on the light.',
    },
  ],
  J_NIKnY1SEc: [
    {
      question: 'When replacing a ceiling rose, what is the critical first step?',
      options: [
        'Identify and label the loop, switch wire and feed before disconnecting anything',
        'Cut all the conductors to the same length',
        'Remove the earth conductors',
        'Turn the lamp on to check it works',
      ],
      correctIndex: 0,
      explanation:
        'Once the conductors are out of the old rose, the only way to identify them is by testing — labelling first saves a great deal of time.',
    },
    {
      question: 'How does he keep track of which conductor is the switch live?',
      options: [
        'He cuts only that one, so it is identifiable afterwards',
        'He photographs it',
        'He relies on the colours',
        'He labels every conductor',
      ],
      correctIndex: 0,
      explanation:
        'One deliberately shortened conductor is unmistakable once everything is out of the old rose.',
    },
    {
      question: 'What existing defects did he find at this rose?',
      options: [
        'Nothing — it was sound',
        'The rose was on the wrong circuit',
        'The cable was undersized',
        'The earth was not connected, and a smoke detector had been fed from it',
      ],
      correctIndex: 3,
      explanation:
        'A disconnected earth and an unexpected smoke detector feed — both found only because he opened it up properly.',
    },
  ],
  llWDQDfz_GI: [
    {
      question: 'Which cable is needed between two two-way switches?',
      options: ['Flexible cord', 'Three core and earth', 'Single core only', 'Twin and earth'],
      correctIndex: 1,
      explanation:
        'Two-way switching needs two strappers plus the common, so three core and earth is the correct cable.',
    },
    {
      question: 'What are the two conductors between the switches called?',
      options: ['Loops', 'Neutrals', 'Strappers', 'Earths'],
      correctIndex: 2,
      explanation:
        'The two conductors linking the switches are the strappers; the third connects to common.',
    },
    {
      question: 'Why is twin and earth not suitable between two-way switches?',
      options: [
        'It is too expensive',
        'It is not rated for lighting',
        'It only has two conductors plus CPC, one short of what the arrangement needs',
        'It cannot be concealed in walls',
      ],
      correctIndex: 2,
      explanation:
        'You need three current-carrying conductors between the switches, and twin and earth provides only two.',
    },
  ],
  PeJw7OgKPlk: [
    {
      question: 'What is an intermediate switch used for?',
      options: [
        'Protecting against earth faults',
        'Dimming a lamp',
        'Adding a third or further switching position to a two-way arrangement',
        'Isolating the circuit',
      ],
      correctIndex: 2,
      explanation:
        'Intermediate switches sit between two two-way switches so a light can be controlled from three or more places.',
    },
    {
      question: 'Where does an intermediate switch connect?',
      options: [
        'In series with the lamp',
        'Into the strappers between the two two-way switches',
        'At the consumer unit',
        'Directly to the neutral',
      ],
      correctIndex: 1,
      explanation:
        'It breaks into the pair of strappers and crosses them over, which is what changes the switching state.',
    },
    {
      question: 'How many terminals does an intermediate switch have?',
      options: ['Four', 'Two', 'Three', 'Six'],
      correctIndex: 0,
      explanation:
        'L1, L1, L2 and L2 — the two pairs the strappers pass through, while the common runs straight between the two-way switches.',
    },
  ],
  S2TvCu7WIQ0: [
    {
      question: 'Why is a fan usually supplied through a fused connection unit?',
      options: [
        'Because fans need three phases',
        'So the small fan supply cable and the fan itself are protected at a suitable low rating',
        'To make it run faster',
        'It is purely cosmetic',
      ],
      correctIndex: 1,
      explanation:
        "The lighting circuit device is too coarse for a fan's small supply — the FCU fuse provides local protection.",
    },
    {
      question: 'What does a fan with an overrun timer need that a basic fan does not?',
      options: [
        'A separate consumer unit',
        'A three core supply providing both a switched and a permanent line',
        'A neutral only',
        'An earth rod',
      ],
      correctIndex: 1,
      explanation:
        'The timer needs a permanent supply to keep running after the switched line drops, plus the switched line to trigger it.',
    },
    {
      question: 'Why must a fan circuit in a bathroom be capable of isolation?',
      options: [
        'To allow the fan to reverse',
        'Because fans are not allowed in bathrooms',
        'To save energy',
        'So it can be worked on safely, including the permanent line to a timer fan',
      ],
      correctIndex: 3,
      explanation:
        'A timer fan stays live from its permanent feed even with the light off — proper isolation is essential before working on it.',
    },
  ],
  q9Ne2BrKFv8: [
    {
      question: 'What does an RCBO combine in one device?',
      options: [
        'Overcurrent protection and residual current protection for a single circuit',
        'A transformer and a fuse',
        'Two circuit breakers',
        'A meter and a switch',
      ],
      correctIndex: 0,
      explanation:
        'An RCBO gives one circuit both its overcurrent device and its own RCD protection.',
    },
    {
      question: 'What is the main advantage of RCBOs over a shared RCD?',
      options: [
        'They are cheaper',
        'They need no testing',
        'An earth fault affects only that circuit, rather than tripping everything on a shared RCD',
        'They remove the need for earthing',
      ],
      correctIndex: 2,
      explanation:
        'With RCBOs a single fault takes out one circuit — the freezer and the lights are not lost with it.',
    },
    {
      question: 'What else does he add that the old board did not have?',
      options: [
        'A second consumer unit',
        'An earth rod',
        'A separate isolator for the board',
        'A surge protection device',
      ],
      correctIndex: 2,
      explanation:
        'The old 16th edition dual-RCD board had no isolator, so one goes in as part of the upgrade.',
    },
  ],
  SeRVnHJrxoo: [
    {
      question: 'What does the pre-inspection checklist prompt you to record about the earthing?',
      options: [
        'Nothing — it is checked afterwards',
        'Whether it is TN-S, TN-C-S or TT, and whether main earthing and gas and water bonding are present',
        'Only the cable colour',
        'Just the length of the earthing conductor',
      ],
      correctIndex: 1,
      explanation:
        'He has been caught out before by missing gas bonding off a quote, which is precisely what the checklist prevents.',
    },
    {
      question: 'What should be recorded before disconnecting the old board?',
      options: [
        'Circuit identification, existing test results and the earthing and bonding arrangements',
        "Only the customer's phone number",
        'The make of the old board only',
        'Nothing, it slows the job',
      ],
      correctIndex: 0,
      explanation:
        'You cannot reinstate what you did not record — labelling and testing first is what makes the reinstatement reliable.',
    },
    {
      question: 'What must be verified about earthing and main bonding during a board change?',
      options: [
        'Nothing — it is outside the scope',
        'That they are present, correctly sized and connected to the required services',
        'That they are painted green',
        'Only that an earth wire exists somewhere',
      ],
      correctIndex: 1,
      explanation:
        'A board change is the moment to confirm the earthing conductor and main bonding are adequate for the supply type.',
    },
  ],
  'G7G1d-aQyxw': [
    {
      question: 'What is used to stop PVC conduit collapsing when bent?',
      options: [
        'Water poured through it',
        'A bending spring inserted inside the conduit',
        'A hacksaw cut on the inside',
        'Nothing — it bends cleanly cold',
      ],
      correctIndex: 1,
      explanation: 'The spring supports the wall from inside so the bend keeps its bore.',
    },
    {
      question: 'Where should the spring be positioned?',
      options: [
        'At the very end of the conduit',
        'Outside the conduit',
        'Centred at the point of the bend',
        'Anywhere along the length',
      ],
      correctIndex: 2,
      explanation:
        'The spring must sit exactly where the bend will form, or the conduit kinks either side of it.',
    },
    {
      question: 'What makes PVC conduit easier to bend in cold weather?',
      options: [
        'Freezing it',
        'Bending it faster',
        'Cutting a slot in it',
        'Warming it gently first',
      ],
      correctIndex: 3,
      explanation: 'Cold PVC is brittle; gentle warmth makes it far more forgiving.',
    },
  ],
  sfrMhHpjJMM: [
    {
      question: 'What is the first item he fits from the gland pack?',
      options: ['The locking nut', 'The shroud, cut to length', 'The earth tag', 'The lock ring'],
      correctIndex: 1,
      explanation:
        'He sizes and slides the shroud on first, because it cannot go on once the gland is made off.',
    },
    {
      question: 'Why must an SWA gland be correctly tightened onto the armour?',
      options: [
        'It does not need tightening',
        'Only to stop water ingress',
        'So the armour is properly clamped for earth continuity and mechanical retention',
        'To keep the cable straight',
      ],
      correctIndex: 2,
      explanation: 'A loose gland means an unreliable earth path and a cable that can pull out.',
    },
    {
      question: 'How is the steel wire armour cut to length?',
      options: [
        'By rotating the gland so it scores right around the armour until it breaks off cleanly',
        'It is left full length',
        'With side cutters, strand by strand',
        'With a hacksaw across the whole cable',
      ],
      correctIndex: 0,
      explanation:
        'Tightening and rotating scores a clean line around the armour, so it comes away neatly without damaging the cores.',
    },
  ],
  oJ0UTrc4Vnk: [
    {
      question: 'What is a resin joint used for?',
      options: [
        'Terminating into a consumer unit',
        'Supporting cables',
        'Joining conduit',
        'Making a durable, sealed joint on buried or exposed cable',
      ],
      correctIndex: 3,
      explanation:
        'Resin encapsulates the joint, sealing it against moisture and mechanical damage.',
    },
    {
      question: 'Why does he take care over how the conductors sit before pouring the resin?',
      options: [
        'To use less resin',
        'So it sits neatly in the shell and does not push the box apart',
        'To make it easier to undo later',
        'Because the resin will not set otherwise',
      ],
      correctIndex: 1,
      explanation:
        'A tidy, well-positioned joint fits the shell properly — a crowded one can force the box open.',
    },
    {
      question: 'What is essential when mixing two-part resin?',
      options: [
        'Warming it to boiling',
        'Mixing it thoroughly in the correct ratio, and pouring before it starts to cure',
        'Using only half the hardener',
        'Adding water',
      ],
      correctIndex: 1,
      explanation: 'Wrong ratio or poor mixing leaves the resin soft, and it will not seal.',
    },
  ],
  OeA88OMKXgg: [
    {
      question: 'What does he do before touching the existing three-phase isolator?',
      options: [
        'Proves it dead — testing the earth and all three phases',
        'Removes the enclosure lid only',
        "Checks the manufacturer's data",
        'Photographs the label',
      ],
      correctIndex: 0,
      explanation:
        'He tests earth and L1, L2 and L3 for voltage before going anywhere near it, having already pulled the cables at the far end.',
    },
    {
      question: 'What must be confirmed before working on an isolator to be installed?',
      options: [
        'The colour of the enclosure',
        'That it is raining',
        'Nothing, if it is new',
        'That the supply is safely isolated and proved dead',
      ],
      correctIndex: 3,
      explanation:
        'Safe isolation comes first on any work, including new equipment fed from a live supply.',
    },
    {
      question: 'Why is he fitting an isolator to this three-phase socket at all?',
      options: [
        'So the supply to it can be isolated, rather than relying on unplugging',
        'The regulations require one on every socket',
        'To convert it to single phase',
        'To increase the current rating',
      ],
      correctIndex: 0,
      explanation:
        "The point of the job is a means of isolation — he did not want the machine's only isolation to be pulling the plug out.",
    },
  ],
  NbGlM2zRQBM: [
    {
      question: 'What does a contactor do?',
      options: [
        'Converts AC to DC',
        'Measures current',
        'Reduces voltage',
        'Switches a load using an electromagnetic coil, allowing remote or automatic control',
      ],
      correctIndex: 3,
      explanation:
        'Energising the coil pulls the contacts closed, so a small control signal switches a large load.',
    },
    {
      question:
        'What is the advantage of switching a load with a contactor rather than a manual switch?',
      options: [
        'It removes the need for protection',
        'Contactors never fail',
        'The load can be controlled remotely or automatically, and the control circuit can be low current',
        'It reduces the load current',
      ],
      correctIndex: 2,
      explanation:
        'The control circuit is separate from the power circuit, which is what enables automation.',
    },
    {
      question: 'In this build, what does the 6 A circuit actually do?',
      options: [
        'It powers the lighting',
        'It is the control circuit that energises the contactor coil',
        'It supplies the heater directly',
        'It provides the earth',
      ],
      correctIndex: 1,
      explanation:
        'The light switch on the small 6 A control circuit operates the coil, and the contactor then switches the much larger heater supply.',
    },
  ],
  jN7o7xvO6Pc: [
    {
      question: 'How are the windings connected in a star (wye) configuration?',
      options: [
        'In a closed loop end to end',
        'All three ends joined at a common star point',
        'In parallel across one phase',
        'In series with each other',
      ],
      correctIndex: 1,
      explanation: 'Each winding runs from a line terminal to a shared star point.',
    },
    {
      question: 'How are the windings connected in delta?',
      options: [
        'One winding only',
        'End to end forming a closed loop, with lines connected at the junctions',
        'In series with a resistor',
        'To a common neutral',
      ],
      correctIndex: 1,
      explanation: 'Delta forms a triangle, with each line connected to a corner.',
    },
    {
      question: 'Why does a motor terminal box have links?',
      options: [
        'So the same motor can be connected in star or delta as required',
        'To identify the phases',
        'For decoration',
        'To provide earthing',
      ],
      correctIndex: 0,
      explanation:
        'The link arrangement selects the winding configuration for the supply voltage and starting method.',
    },
  ],
  w3Hfj2kMrGo: [
    {
      question: 'What do all temperature sensors have in common?',
      options: [
        'They only work above 0°C',
        'They need no calibration',
        'They all use mercury',
        'They convert a temperature into an electrical signal that a controller can read',
      ],
      correctIndex: 3,
      explanation:
        'Whatever the type, the job is turning temperature into something measurable electrically.',
    },
    {
      question: 'How does a traditional liquid thermometer indicate temperature?',
      options: [
        'The liquid expands with heat and rises up a marked column',
        'A coil generates a voltage',
        'A crystal changes colour',
        'A bimetallic strip bends',
      ],
      correctIndex: 0,
      explanation:
        'Paul starts with the thermometer as the simplest case: heat expands the liquid, and the marked column converts height into a temperature.',
    },
    {
      question: 'What is a key selection factor for a temperature sensor?',
      options: [
        'Its colour',
        'The temperature range and accuracy needed for the application',
        "The manufacturer's logo",
        'The length of its cable only',
      ],
      correctIndex: 1,
      explanation: 'Range, accuracy and response time decide which sensor type suits the job.',
    },
  ],
  v7NUi88Lxi8: [
    {
      question: 'What physical effect does a thermocouple rely on?',
      options: [
        'A resistance that changes with heat',
        'Expansion of a liquid',
        'Two dissimilar metals joined together producing a small voltage that varies with temperature',
        'Magnetic attraction',
      ],
      correctIndex: 2,
      explanation:
        'The junction of two different metals generates a millivolt signal proportional to temperature difference.',
    },
    {
      question: 'How is a thermocouple constructed?',
      options: [
        'A single wire wound into a coil',
        'A sealed glass tube of liquid',
        'A resistor bonded to a plate',
        'Two different metals joined at one end, with the other ends going to a terminal block',
      ],
      correctIndex: 3,
      explanation:
        'Joining two dissimilar metals creates the measuring junction; the voltage between the free ends changes with temperature.',
    },
    {
      question: 'What does the demonstration with a flame show?',
      options: [
        'A small voltage appears when the junction is heated and falls away when the heat is removed',
        'Current flows without any voltage',
        'The multimeter is damaged by heat',
        'The voltage stays constant',
      ],
      correctIndex: 0,
      explanation:
        'Heating the junction generates a very small voltage that disappears as it cools — that is the whole working principle.',
    },
  ],
  BbmocfETTFo: [
    {
      question: 'What does a solenoid convert electrical energy into?',
      options: ['Light', 'Linear mechanical movement', 'Sound', 'Heat only'],
      correctIndex: 1,
      explanation: 'Energising the coil pulls a ferrous plunger, producing straight-line motion.',
    },
    {
      question: 'Where are solenoids commonly found in building services?',
      options: [
        'In cable joints',
        'Only in motors',
        'In light fittings',
        'In valves, locks and actuators that must open or close on a signal',
      ],
      correctIndex: 3,
      explanation:
        'Solenoid valves and actuators are how a control system physically moves something.',
    },
    {
      question: 'What happens when a solenoid coil is de-energised?',
      options: [
        'The device must be reset manually',
        'The coil reverses polarity',
        'The plunger stays where it is permanently',
        'A spring usually returns the plunger to its rest position',
      ],
      correctIndex: 3,
      explanation:
        'Most solenoids are spring-returned, which is what makes them fail to a known state.',
    },
  ],
  GPW7P9rbZRI: [
    {
      question: 'What is the most recognised route into the electrical trade in the UK?',
      options: [
        'Watching videos only',
        'An apprenticeship combining on-site experience with college study',
        'Buying a tool kit',
        'A weekend course',
      ],
      correctIndex: 1,
      explanation:
        'An apprenticeship gives you both the qualifications and the site experience employers want.',
    },
    {
      question: 'Why is on-site experience essential regardless of route?',
      options: [
        'Only to make friends',
        'To get a discount on tools',
        'It is not — classroom work is enough',
        'Because competence is proved by real work, and the NVQ requires evidence of it',
      ],
      correctIndex: 3,
      explanation:
        'Qualifications certify knowledge; the portfolio proves you can actually do the job.',
    },
    {
      question: 'What is a realistic first step for someone with no experience?',
      options: [
        'Start your own business immediately',
        "Get a labouring or mate's position with an electrical firm while studying",
        'Skip qualifications entirely',
        'Buy a van',
      ],
      correctIndex: 1,
      explanation:
        'Getting on site in any capacity opens the door to an apprenticeship far faster than applying cold.',
    },
  ],
  GI4gev4NmXM: [
    {
      question: 'What does an apprenticeship offer that a short course does not?',
      options: [
        'A shorter time commitment',
        'Paid employment plus the on-site experience needed to complete the NVQ',
        'Instant qualification',
        'No exams',
      ],
      correctIndex: 1,
      explanation:
        'The employment is the point — it supplies the evidence the qualification demands.',
    },
    {
      question: 'What is the common limitation of a fast-track training course?',
      options: [
        'They can deliver classroom units but cannot provide the site experience competence requires',
        'They cover no theory',
        'They are always free',
        'They take too long',
      ],
      correctIndex: 0,
      explanation: 'A course can teach you; only real work can evidence competence.',
    },
    {
      question: 'What should you check before paying for any training?',
      options: [
        'Only the price',
        'The colour of the workbook',
        'Whether the qualification is recognised and what it actually leads to',
        'The car park',
      ],
      correctIndex: 2,
      explanation: 'Recognition and the onward route matter far more than the certificate itself.',
    },
  ],
  lWyqLTYqsKs: [
    {
      question: 'What is a warning sign of a poor-value training offer?',
      options: [
        'It is delivered in a college',
        'It includes assessments',
        'Promises of full qualification in an unrealistically short time with no site experience',
        'It mentions the NVQ',
      ],
      correctIndex: 2,
      explanation:
        'Competence cannot be fast-tracked past the evidence requirement, whatever is promised.',
    },
    {
      question: 'What did the scammer in this video offer?',
      options: [
        'A full gold card with certificates for £1,500, with no exams, in five working days',
        'Free college enrolment',
        'A discounted 18th Edition course',
        'A genuine apprenticeship place',
      ],
      correctIndex: 0,
      explanation:
        'No exams, no assessment, five days — an offer that could only ever produce a fake.',
    },
    {
      question: 'What was the giveaway that this was a scam?',
      options: [
        'He never asked about apprenticeships or experience, and promised qualifications with no exams at all',
        'He had no phone number',
        'The price was too high',
        'He only accepted cash',
      ],
      correctIndex: 0,
      explanation:
        'Genuine qualifications require assessment; anyone selling the paperwork alone is selling something worthless and dangerous.',
    },
  ],
  I7mVB9tD94A: [
    {
      question: 'What is the usual route described for becoming a qualified electrician?',
      options: [
        'A short intensive course',
        'Level 3 only, with no site work',
        'Self-study followed by an exam',
        'An apprenticeship of roughly three to five years, taking NVQ Level 2 then Level 3',
      ],
      correctIndex: 3,
      explanation:
        "The 'time served' route is an apprenticeship, working up through the NVQ levels.",
    },
    {
      question: 'Where does the AM2 sit in the qualification route?',
      options: [
        'At the very beginning',
        'Before any college work',
        'It is optional throughout',
        'At the end, as the independent practical assessment',
      ],
      correctIndex: 3,
      explanation: 'It is the final independent check of practical competence.',
    },
    {
      question: 'What form does the AM2 take?',
      options: [
        'An online multiple-choice paper',
        'A written essay',
        'A practical assessment of around three days in a college environment',
        'A workplace interview',
      ],
      correctIndex: 2,
      explanation:
        'It is the practical assessment at the end of the apprenticeship, taken over about three days.',
    },
  ],
  hTaWu5jKd14: [
    {
      question: 'Which skill is rarely taught at college but essential on site?',
      options: [
        "Ohm's law",
        'Exam revision',
        'Cable calculations',
        'Communicating with customers and other trades',
      ],
      correctIndex: 3,
      explanation: 'Much of the job is dealing with people — customers, builders and other trades.',
    },
    {
      question: 'What does Ben say about the skills that make a good electrician?',
      options: [
        'They matter less than qualifications',
        'They are learned over time rather than appearing overnight',
        'They come only from college',
        'You either have them or you do not',
      ],
      correctIndex: 1,
      explanation:
        'His framing is that these seven skills are built gradually — which is also why feeling lost early on is normal.',
    },
    {
      question: 'What does he say about telling a customer how long the power will be off?',
      options: [
        'Never discuss timings with customers',
        'Often you genuinely cannot say, so do not over-commit',
        'Always promise a fixed time',
        'Quote double whatever you think',
      ],
      correctIndex: 1,
      explanation:
        'His point is that jobs are unpredictable — committing to a precise time you cannot control causes trouble.',
    },
  ],
  qID4Jm6X70A: [
    {
      question: 'Why did Ben record this particular episode?',
      options: [
        'Because people kept asking questions he had assumed were too simple to cover',
        'To advertise a course',
        'To review a product',
        'Because a customer complained',
      ],
      correctIndex: 0,
      explanation:
        'Twenty-odd years in, the things he finds obvious are exactly the things newer electricians are stuck on.',
    },
    {
      question: 'What does he encourage anyone struggling in business to do?',
      options: [
        'Lower their prices',
        'Work more hours',
        'Give up self-employment',
        'Ask someone who has already done it',
      ],
      correctIndex: 3,
      explanation:
        'His whole point is that the answer usually exists — someone further along has already solved it.',
    },
    {
      question: 'What is a practical first step to reduce pressure?',
      options: [
        'Work weekends as well',
        'Reviewing the diary and pricing so you can do fewer, better-paid jobs',
        'Ignore it',
        'Take on more work',
      ],
      correctIndex: 1,
      explanation: 'Fixing the rate is often what makes reducing the hours possible.',
    },
  ],
  KHJvmLD0lQY: [
    {
      question: 'Where does Ben say work stress usually comes from?',
      options: [
        'The paperwork',
        'The regulations',
        'Customers and other trades on site, all wanting the work done without the power going off',
        'The weather',
      ],
      correctIndex: 2,
      explanation:
        'The pressure is mostly people-driven — everyone wants it finished and nobody wants to be inconvenienced.',
    },
    {
      question: 'What does he say about walking off site and turning your phone off?',
      options: [
        'It only makes things worse, because your reputation suffers and the return is more stressful',
        'Nobody would notice',
        'It is perfectly acceptable weekly',
        'It is the best way to cope',
      ],
      correctIndex: 0,
      explanation: 'Avoidance postpones the problem and adds a damaged reputation to it.',
    },
    {
      question: 'Why is time away from the phone important?',
      options: [
        'To save battery',
        'It is not',
        'Because constant availability means never actually stopping, which is what wears people down',
        'So customers cannot reach you ever',
      ],
      correctIndex: 2,
      explanation: 'Boundaries around contact are what turn evenings back into rest.',
    },
  ],
  F7TR8xkOOuw: [
    {
      question: 'What is the warning sign that work has taken over?',
      options: [
        'Taking holidays',
        'Turning down work',
        'Finishing on time',
        'Family and personal life consistently getting only what is left over',
      ],
      correctIndex: 3,
      explanation: 'If everything else gets the leftovers, the balance has already gone.',
    },
    {
      question: 'What question does Ben use to put work in perspective?',
      options: [
        'If you died tomorrow, would your customers look after your family?',
        'How much are you worth per hour?',
        'What would you do with a lottery win?',
        'Which trade earns the most?',
      ],
      correctIndex: 0,
      explanation:
        'His blunt framing: the customers you keep answering the phone for would not be there for the people you actually work to support.',
    },
    {
      question: 'What practical boundary helps most?',
      options: [
        'Answering the phone at all hours',
        'Never taking holidays',
        'Setting and sticking to finish times and non-working days',
        'Working every weekend',
      ],
      correctIndex: 2,
      explanation: 'A boundary only works if it is actually held to.',
    },
  ],
  nCtNqXMuA6A: [
    {
      question: "In BS 7671, what does 'shall' indicate?",
      options: [
        'A suggestion',
        'An option',
        'Something prohibited',
        'A requirement that must be met for compliance',
      ],
      correctIndex: 3,
      explanation: "'Shall' marks a mandatory requirement of the standard.",
    },
    {
      question: 'What does a clause worded as a recommendation indicate?',
      options: [
        'An error in the book',
        'Good practice that is advised rather than mandatory',
        "A requirement identical to 'shall'",
        'A prohibition',
      ],
      correctIndex: 1,
      explanation:
        'Recommendations are advisory — worth following, but not compliance requirements in the same way.',
    },
    {
      question: 'Why does the exact wording of a regulation matter so much?',
      options: [
        'Because whether something is required or merely advised changes what compliance means',
        'It does not — the meaning is always obvious',
        'Only lawyers care',
        'Wording changes every year',
      ],
      correctIndex: 0,
      explanation:
        "Reading 'shall' as 'should', or the reverse, leads directly to non-compliant or over-engineered work.",
    },
  ],
  G1QTK0TexuE: [
    {
      question: 'Why is Part 2 of BS 7671 important?',
      options: [
        'It defines the terms used throughout the rest of the standard',
        'It is only an index',
        'It contains the tables',
        'It lists manufacturers',
      ],
      correctIndex: 0,
      explanation:
        'Every requirement depends on precisely what its terms mean, and Part 2 sets those meanings.',
    },
    {
      question:
        'What can happen if you apply an everyday meaning instead of the Part 2 definition?',
      options: [
        'The book becomes invalid',
        'It always gives the same result',
        'Nothing',
        "You may apply a regulation incorrectly, because the standard's meaning can be narrower or wider",
      ],
      correctIndex: 3,
      explanation: 'Defined terms in the standard often differ from casual trade usage.',
    },
    {
      question: 'How should Part 2 be used in practice?',
      options: [
        'Ignored unless in an exam',
        'Read once and forgotten',
        'Only by designers',
        'Consulted whenever a regulation turns on a defined term',
      ],
      correctIndex: 3,
      explanation: 'Checking the definition is often what settles an argument about a regulation.',
    },
  ],
  i_FYg1rPKfQ: [
    {
      question: 'What is the risk of quoting a regulation number from memory?',
      options: [
        'Regulation numbers and content change between amendments, so a misquote undermines your position',
        'None',
        'It is illegal',
        'Numbers never change',
      ],
      correctIndex: 0,
      explanation:
        'Amendments renumber and reword — always check the current book before quoting it.',
    },
    {
      question: 'What outdated figure did the learner quote in the assessment?',
      options: ['230 volts', '240 volts', '415 volts', '250 volts'],
      correctIndex: 1,
      explanation:
        'Quoting 240 V dates you — the nominal single-phase voltage has been declared as 230 V since 1995, and the assessor will explore it.',
    },
    {
      question: 'What is the safest habit when discussing regulations on site?',
      options: [
        'Rely on what a colleague said',
        'Argue confidently from memory',
        'Look it up in the current edition before asserting it',
        'Quote social media',
      ],
      correctIndex: 2,
      explanation: 'Opening the book takes a minute and settles it properly.',
    },
  ],
  '0HxB5vx5QdI': [
    {
      question: 'Regulation 521.10.202 requires cables to be adequately supported against what?',
      options: ['Vibration', 'Voltage drop', 'Theft', 'Premature collapse in the event of fire'],
      correctIndex: 3,
      explanation:
        'The concern is cables falling and obstructing escape or hindering firefighters when supports fail in a fire.',
    },
    {
      question: 'Where does this requirement apply?',
      options: [
        'Throughout the electrical installation',
        'Escape routes only',
        'Outdoors only',
        'Commercial premises only',
      ],
      correctIndex: 0,
      explanation:
        'The earlier escape-routes-only limitation was removed — it now applies across the installation.',
    },
    {
      question: 'What is the common misunderstanding about this regulation?',
      options: [
        'That it bans plastic trunking',
        'That it applies to plastic conduit only',
        'That it requires every cable to be re-clipped annually',
        'That it only applies in escape routes, which is no longer the case',
      ],
      correctIndex: 3,
      explanation: 'Many still apply the old escape-route limitation that has since been removed.',
    },
  ],
  Dl982L_MO4A: [
    {
      question: 'What does the first digit of an IP rating describe?',
      options: [
        'Operating temperature',
        'Protection against water',
        'Impact resistance',
        'Protection against solid objects and dust',
      ],
      correctIndex: 3,
      explanation:
        'The first numeral covers solid foreign bodies, from large objects down to dust.',
    },
    {
      question: 'What does the second digit describe?',
      options: [
        'Voltage rating',
        'Cable size',
        'Corrosion resistance',
        'Protection against ingress of water',
      ],
      correctIndex: 3,
      explanation: 'The second numeral covers water, from dripping through to immersion.',
    },
    {
      question: 'According to BS 7671, what does IP stand for?',
      options: [
        'Internal Protection',
        'Impact Protection',
        'International Protection',
        'Ingress Protection',
      ],
      correctIndex: 2,
      explanation:
        "Craig shows it in the book: BS 7671 and the On-Site Guide both define IP as International Protection, despite 'ingress protection' being widely taught.",
    },
  ],
  '6j0TCs95_Os': [
    {
      question: 'What are containment capacity factors used for?',
      options: [
        'Measuring earth resistance',
        'Calculating voltage drop',
        'Determining how many cables of a given size will fit in a conduit or trunking',
        'Sizing protective devices',
      ],
      correctIndex: 2,
      explanation:
        'Cable factors and containment factors are compared to check the fill is acceptable.',
    },
    {
      question: 'Which table is used for the conduit containment factors in the worked example?',
      options: [
        'Table 4D1A in BS 7671',
        'Table 41.3',
        'Table E4 in the On-Site Guide',
        'Appendix 15',
      ],
      correctIndex: 2,
      explanation:
        'The example runs three 4 mm² singles in 20 mm conduit over 3 m with two bends, using Appendix E, Table E4.',
    },
    {
      question: 'How is the check carried out?',
      options: [
        'By comparing the total cable factor against the containment factor for that size and run',
        'By weighing the cables',
        'By measuring the current',
        'By eye',
      ],
      correctIndex: 0,
      explanation:
        'Add up the cable factors and compare with the factor for the containment being used.',
    },
  ],
  YFBQS0qfGRY: [
    {
      question: 'In a circuit with an MCB and an RCD, which device provides fault protection?',
      options: ['The RCD', 'Neither — the earthing does', 'The MCB', 'Both equally'],
      correctIndex: 2,
      explanation:
        "Craig's example: the MCB gives fault protection, the RCD adds additional protection, and an RCBO combines both in one device.",
    },
    {
      question: 'What is additional protection typically provided by?',
      options: [
        'Double insulation alone',
        'A 30 mA RCD',
        'An isolating switch',
        'A 100 A main fuse',
      ],
      correctIndex: 1,
      explanation:
        'A 30 mA RCD provides additional protection where basic and fault protection may not be enough.',
    },
    {
      question: "Why is additional protection described as 'additional'?",
      options: [
        'It replaces fault protection',
        'It is a further layer for situations such as user error or damaged cables, not a substitute for the other measures',
        'It applies only outdoors',
        'It is optional decoration',
      ],
      correctIndex: 1,
      explanation: 'It backs up the primary measures rather than replacing them.',
    },
  ],
  '11U0dYKbugE': [
    {
      question:
        'For an installation supplied directly from a public low voltage distribution system, the recommended maximum voltage drop for lighting is:',
      options: ['8%', '6%', '3%', '5%'],
      correctIndex: 2,
      explanation:
        'BS 7671 recommends 3% for lighting and 5% for other uses on a public LV supply.',
    },
    {
      question: 'Where do you find the millivolts per amp per metre figure for a cable?',
      options: [
        'In the voltage drop tables in the regulations, such as Table 4D1B',
        'In the On-Site Guide index',
        'On the cable drum',
        'From the manufacturer only',
      ],
      correctIndex: 0,
      explanation:
        'He works from Table 4D1B on page 449 — a 2.5 mm² cable clipped direct in free air gives 18 mV/A/m.',
    },
    {
      question: 'What is the mV/A/m figure for a 2.5 mm² cable clipped direct in free air?',
      options: ['44', '29', '11', '18'],
      correctIndex: 3,
      explanation: 'That 18 is the figure he then uses in the voltage drop calculation.',
    },
  ],
  M3FXIrzZYXU: [
    {
      question: 'What does the adiabatic equation check?',
      options: [
        'The load current of the circuit',
        'The voltage drop of a circuit',
        'The insulation resistance',
        'That a protective conductor can withstand the fault current for the disconnection time without excessive temperature rise',
      ],
      correctIndex: 3,
      explanation: 'It verifies the CPC will survive the energy let through during a fault.',
    },
    {
      question: 'Which values are needed to apply it?',
      options: [
        "The customer's postcode",
        'Cable colour and length only',
        'Fault current, disconnection time and the material factor k',
        'The number of sockets',
      ],
      correctIndex: 2,
      explanation:
        'S = √(I²t)/k — fault current, time and the k factor for the conductor and insulation.',
    },
    {
      question: 'What does the result of the calculation give you?',
      options: [
        'The maximum circuit length',
        'The required RCD rating',
        'The voltage drop',
        'The minimum acceptable cross-sectional area for the protective conductor',
      ],
      correctIndex: 3,
      explanation: 'It produces the smallest CPC size that will safely survive the fault.',
    },
  ],
  tf_eoKXkSaM: [
    {
      question: 'What is an earth fault?',
      options: [
        'A fault between line and neutral',
        'A fault between a line conductor and earth or an exposed-conductive-part',
        'An overload on the circuit',
        'A break in the neutral',
      ],
      correctIndex: 1,
      explanation:
        'Current finds a path to earth, which is what makes exposed metalwork dangerous.',
    },
    {
      question: 'What is a short circuit fault?',
      options: [
        'A circuit that is too short',
        'A high resistance joint',
        'Any fault involving earth',
        'A fault between live conductors, such as line to neutral',
      ],
      correctIndex: 3,
      explanation:
        'A short circuit is a direct fault between live conductors, producing very high current.',
    },
    {
      question: 'What does Craig point out about the conductor most people call the earth?',
      options: [
        'It is the same as the neutral',
        'It is properly the CPC — the circuit protective conductor',
        'It carries the load current',
        'It is not needed in modern circuits',
      ],
      correctIndex: 1,
      explanation:
        'He is precise about the terminology because Part 2 definitions are what the fault descriptions rest on.',
    },
  ],
  '8-cqeD84-0s': [
    {
      question: 'What is the 0.05 ohm figure associated with?',
      options: [
        'Insulation resistance minimum',
        'Guidance on the acceptable resistance of a main protective bonding conductor',
        'RCD trip current',
        'The maximum Zs of a circuit',
      ],
      correctIndex: 1,
      explanation:
        'It is the widely used guidance figure for the resistance of a main bonding conductor connection.',
    },
    {
      question: 'Where does he get the resistivity of copper figure from?',
      options: [
        'The On-Site Guide',
        'The regulations index',
        "The manufacturer's data sheet",
        'An online calculator',
      ],
      correctIndex: 0,
      explanation:
        'He works the calculation from the copper resistivity given in the On-Site Guide — and is candid that the method is not written down anywhere.',
    },
    {
      question:
        'What does the video use to check whether a bonding conductor meets the 0.05 ohm figure?',
      options: [
        'A rule of thumb based on fuse size',
        'A megohmmeter reading',
        'The resistivity of copper from the On-Site Guide, against run length and CSA',
        "The manufacturer's data plate",
      ],
      correctIndex: 2,
      explanation:
        'He works it from the copper resistivity figures in the On-Site Guide — a longer run needs a larger CSA to stay under 0.05 ohm.',
    },
  ],
  hmlZ_2E3IMY: [
    {
      question: 'What change does Amendment 2 permit for insulation resistance testing?',
      options: [
        'Testing at 1000 V DC on all circuits',
        'Testing with the supply connected',
        'A 250 V DC test after equipment is connected, provided cables were tested at 500 V DC beforehand',
        'Abolishing insulation resistance testing',
      ],
      correctIndex: 2,
      explanation:
        'It allows the reduced 250 V DC test once equipment is connected, so long as the cables were proved at 500 V DC first.',
    },
    {
      question: 'Which stage of testing is this video about?',
      options: [
        'Initial verification — the first ever test of a circuit',
        'Fault finding',
        'Periodic inspection',
        'Commissioning of equipment only',
      ],
      correctIndex: 0,
      explanation:
        'He is specifically covering initial verification under Amendment 2, which is where the resets he is seeing go wrong.',
    },
    {
      question: 'When is the 500 V DC test carried out under this approach?',
      options: [
        'At the same time as the RCD test',
        'Only if a fault is suspected',
        'At the end of first fix, with nothing connected',
        'After all equipment is connected',
      ],
      correctIndex: 2,
      explanation:
        'Cables are proved at 500 V DC at first fix; the reduced 250 V test only comes later, once equipment is connected.',
    },
  ],
  '0dDlPS3YI2s': [
    {
      question: 'What did the customer report that pointed to a high resistance joint?',
      options: [
        'Flickering lights only',
        'Intermittent operation — things working sometimes and not others',
        'A burning smell',
        'A tripped RCD every morning',
      ],
      correctIndex: 1,
      explanation:
        'Intermittent, hard-to-pin-down behaviour is the classic signature of a joint that is nearly, but not quite, open.',
    },
    {
      question: 'How did the electrician narrow down where the fault was?',
      options: [
        'He checked the consumer unit only',
        'He rewired the circuit',
        'He replaced every socket',
        'He split the ring at its midpoint and tested each way',
      ],
      correctIndex: 3,
      explanation:
        'An end-to-end reading of 4.07 ohms told him something was badly wrong; halving the ring found which side it was on.',
    },
    {
      question: 'What commonly causes a high resistance joint?',
      options: [
        'Using a torque screwdriver',
        'Loose terminations, corrosion or conductor damage under the screw',
        'Cable that is too thick',
        'Too many earths',
      ],
      correctIndex: 1,
      explanation: 'Most are made at installation and simply get worse with thermal cycling.',
    },
  ],
  '9B_vldcsBZs': [
    {
      question: 'What does scorching or burn marking around a terminal usually indicate?',
      options: [
        'Recent cleaning',
        'A loose or high resistance connection that has been generating heat',
        'Normal operation',
        'Correct torque',
      ],
      correctIndex: 1,
      explanation: 'Heat marks mean the joint has been running hot — an immediate concern.',
    },
    {
      question: 'What is signified by an EICR code C1?',
      options: [
        'Satisfactory',
        'Improvement recommended',
        'Further investigation required',
        'Danger present — immediate action required',
      ],
      correctIndex: 3,
      explanation:
        'C1 means there is a risk of injury present and it must be made safe immediately.',
    },
    {
      question: 'What does Ben do first when starting an EICR?',
      options: [
        'Test the RCDs',
        'A visual inspection',
        'Isolate the whole board',
        'Fill in the certificate',
      ],
      correctIndex: 1,
      explanation:
        'He works to a set sequence and it starts with looking — the visual inspection comes before any instrument is used.',
    },
  ],
  '9XaKKR9gi9s': [
    {
      question: 'What is the purpose of an EICR?',
      options: [
        'To report on the condition of an existing installation against the current standard',
        'To install new circuits',
        'To price up work',
        'To register an installation',
      ],
      correctIndex: 0,
      explanation: 'It records the condition of what is there, coded against BS 7671.',
    },
    {
      question: 'What is an EICR, as Ben describes it?',
      options: [
        'A quick look round to price up work',
        'A certificate for new work',
        'A thorough inspection of the whole property reporting its electrical condition',
        "A landlord's insurance document",
      ],
      correctIndex: 2,
      explanation:
        'It reports the actual condition of the installation — which is why turning up, glancing round and invoicing is fraud.',
    },
    {
      question: 'What does he say some people do that makes him angry?',
      options: [
        'Refuse landlord work',
        'Use the wrong tester',
        'Charge too little',
        'Issue an EICR certificate without carrying out any work',
      ],
      correctIndex: 3,
      explanation:
        'Issuing a report for a property nobody has inspected puts tenants at risk and undercuts everyone doing it properly.',
    },
  ],
  'j5o-kLN_mk4': [
    {
      question: 'What is the first step in systematic fault finding?',
      options: [
        'Turn everything off and on',
        'Gather information — what changed, what the symptoms are and when they occur',
        'Rewire the circuit',
        'Start replacing components',
      ],
      correctIndex: 1,
      explanation:
        'Understanding the symptom properly is what narrows the search before you touch anything.',
    },
    {
      question: 'What did Ben do first on the intermittently tripping boiler job?',
      options: [
        'Changed the RCD',
        'Tested the whole installation',
        'Replaced the PCB',
        'Talked to the customer about exactly when and how it tripped',
      ],
      correctIndex: 3,
      explanation:
        "The customer's account — that it went off when the oven was switched on — reframed the whole diagnosis.",
    },
    {
      question: 'What did that conversation reveal?',
      options: [
        'The supply was at fault',
        'The boiler was faulty after all',
        'There was water ingress',
        'It tripped when the oven was switched on, pointing at another circuit on the shared RCD',
      ],
      correctIndex: 3,
      explanation:
        'On a dual-RCD board, a fault on any circuit sharing that RCD takes the boiler down with it.',
    },
  ],
  'hfwBK-NCdJE': [
    {
      question: 'What is the main drawback of a split-load consumer unit?',
      options: [
        'It has no main switch',
        'It costs more than RCBOs',
        'It cannot be earthed',
        'One RCD serves several circuits, so a single fault disconnects all of them',
      ],
      correctIndex: 3,
      explanation:
        'Shared RCD protection means an earth fault on one circuit takes out everything on that side.',
    },
    {
      question: 'Why can shared RCDs cause nuisance tripping?',
      options: [
        'Because the small standing leakage of several circuits adds up and can approach the trip threshold',
        'RCDs are unreliable',
        'Only in new installations',
        'They are too sensitive to voltage',
      ],
      correctIndex: 0,
      explanation:
        'Cumulative leakage from many circuits can trip an RCD with no actual fault present.',
    },
    {
      question: 'What is the preferred alternative?',
      options: [
        'Individual RCBOs so each circuit has its own overcurrent and residual protection',
        'No RCD protection',
        'A single main RCD for everything',
        'A larger split-load board',
      ],
      correctIndex: 0,
      explanation: 'RCBOs isolate faults to the affected circuit only.',
    },
  ],
  jewxN1fHFXI: [
    {
      question: 'What is the advantage of interlinked smoke alarms?',
      options: [
        'They never need testing',
        'When one detects smoke, all of them sound, warning the whole property',
        'They replace the need for escape routes',
        'They use less power',
      ],
      correctIndex: 1,
      explanation:
        'An alarm in an unoccupied part of the house is useless unless it wakes people elsewhere.',
    },
    {
      question: 'Why did Ben advise leaving the redundant fire alarm cables in place?',
      options: [
        'They are safely terminated in a box and could be reused if mains alarms are refitted',
        'The customer refused',
        'They were too difficult to remove',
        'They carried another circuit',
      ],
      correctIndex: 0,
      explanation:
        'Removing usable cabling that is safely terminated and isolated achieves nothing except cost.',
    },
    {
      question: 'What had the previous owner done to the alarm system?',
      options: [
        'Swapped the mains-powered alarms for battery ones, leaving the cabling unused',
        'Added extra detectors',
        'Rewired it in singles',
        'Removed the alarms entirely',
      ],
      correctIndex: 0,
      explanation:
        'The wiring was left in place and turned off at the board, which is why the cables showed as redundant on the report.',
    },
  ],
  VGj32euYZ2c: [
    {
      question: "What causes a circuit breaker's overload function to operate?",
      options: [
        'An earth fault',
        'An instant surge in current',
        "Load being slowly added until the breaker's rating is exceeded",
        'A loss of neutral',
      ],
      correctIndex: 2,
      explanation:
        'Overload is the gradual case — keep adding load and eventually it exceeds the rating and the breaker flips.',
    },
    {
      question: 'How does a breaker respond to a short circuit?',
      options: [
        'It does not operate',
        'The magnetic element operates almost instantly on the very high current',
        'Slowly, over several minutes',
        'It waits for the RCD',
      ],
      correctIndex: 1,
      explanation: 'The magnetic trip gives near-instant operation at high fault currents.',
    },
    {
      question: 'What is the European equivalent of a North American GFCI?',
      options: ['An RCD', 'An isolator', 'An MCB', 'A fuse'],
      correctIndex: 0,
      explanation:
        'Both compare the current going out with the current coming back, and disconnect if they do not match.',
    },
  ],
  X4EUwTwZ110: [
    {
      question: 'What does a capacitor store?',
      options: [
        'Current in a coil',
        'Heat',
        'Magnetic flux',
        'Energy in an electric field between its plates',
      ],
      correctIndex: 3,
      explanation: 'Charge accumulates on the plates, storing energy in the field between them.',
    },
    {
      question: 'How does a capacitor behave in a DC circuit once fully charged?',
      options: [
        'It reverses polarity',
        'It short circuits',
        'It blocks further current flow',
        'It conducts freely',
      ],
      correctIndex: 2,
      explanation:
        'Once charged to the supply voltage, no more current flows — a capacitor blocks steady DC.',
    },
    {
      question: 'Why can a capacitor be dangerous after the supply is removed?',
      options: [
        'It releases gas',
        'It can hold a charge and give a shock until safely discharged',
        'It gets extremely cold',
        'It becomes magnetic',
      ],
      correctIndex: 1,
      explanation: 'Always treat a large capacitor as live until it has been proved discharged.',
    },
  ],
  UchitHGF4n8: [
    {
      question: 'What is required for a transformer to work?',
      options: [
        'A mechanical drive',
        'A permanent magnet only',
        'An alternating (changing) current producing a changing magnetic field',
        'A steady DC supply',
      ],
      correctIndex: 2,
      explanation:
        'Only a changing flux induces a voltage in the secondary, which is why transformers need AC.',
    },
    {
      question: 'What sets the output voltage of a transformer?',
      options: [
        'The core colour',
        'The length of the cable',
        'The ratio of primary to secondary turns',
        'The ambient temperature',
      ],
      correctIndex: 2,
      explanation: 'Voltage transforms in proportion to the turns ratio.',
    },
    {
      question: 'In an ideal step-down transformer, what happens to the current?',
      options: [
        'It rises as the voltage falls, since power in equals power out',
        'It stays identical',
        'It falls with the voltage',
        'It becomes DC',
      ],
      correctIndex: 0,
      explanation: 'Power is conserved, so lower secondary voltage means higher secondary current.',
    },
  ],
  '50bXZPtDpmU': [
    {
      question: 'Which wiring fault is most associated with electrical fires?',
      options: [
        'Cables that are too large',
        'Loose terminations creating heat at a high resistance connection',
        'Too many earths',
        'Correctly torqued terminals',
      ],
      correctIndex: 1,
      explanation:
        'Loose connections heat up under load and are a leading cause of electrical fires.',
    },
    {
      question: 'Why do loose connections get progressively worse?',
      options: [
        'They do not change',
        'Heating and cooling cycles loosen them further, increasing resistance and heat',
        'They tighten themselves',
        'Only in cold weather',
      ],
      correctIndex: 1,
      explanation: 'It is a runaway process — more heat causes more looseness causes more heat.',
    },
    {
      question: 'What reduces the risk at the point of installation?',
      options: [
        "Terminating correctly to the manufacturer's torque setting and checking conductor preparation",
        'Leaving conductors long',
        'Using more insulating tape',
        'Working faster',
      ],
      correctIndex: 0,
      explanation:
        'A properly prepared and correctly torqued termination is what prevents the whole failure mode.',
    },
  ],
  'r5EyINV-lJo': [
    {
      question: 'What is a sign that a meter may have been tampered with?',
      options: [
        'A meter in a cupboard',
        'Broken or missing seals, unusual wiring around the meter, or signs of heat damage',
        'A new meter seal',
        'A digital display',
      ],
      correctIndex: 1,
      explanation: 'Interference usually leaves physical traces around the seals and tails.',
    },
    {
      question: 'Why is meter tampering dangerous as well as illegal?',
      options: [
        'Unprotected or badly made connections upstream of the main fuse can cause fire and electrocution',
        'It is only a billing issue',
        'It is not dangerous',
        'Only for the meter operator',
      ],
      correctIndex: 0,
      explanation:
        'Work upstream of the cut-out has no protection and enormous fault energy available.',
    },
    {
      question: 'According to this video, what makes a tampered meter dangerous?',
      options: [
        'It only affects the billing',
        'The work is done by unqualified people using whatever cable they can find',
        'Tampering always causes an immediate explosion',
        'The meter reads slightly fast',
      ],
      correctIndex: 1,
      explanation:
        'The danger comes from who does it and how — untrained people making unprotected connections with unsuitable cable.',
    },
  ],
  TvFbyzcXJV8: [
    {
      question: 'Why do manufacturers specify a torque setting for terminals?',
      options: [
        'Only for large cables',
        'To sell torque tools',
        'Because both under- and over-tightening cause failure, and the specified figure is the tested optimum',
        'It is a recommendation nobody follows',
      ],
      correctIndex: 2,
      explanation: 'The figure is what the terminal was designed and tested to perform at.',
    },
    {
      question: 'What torque setting do the MCBs in this board call for?',
      options: ['0.8 N·m', '2.5 N·m', '1.2 N·m', '5.0 N·m'],
      correctIndex: 1,
      explanation:
        'The board is marked 2.5 N·m for the MCBs and the terminals at the bottom, and the driver clicks once it reaches it.',
    },
    {
      question: 'Why is a torque screwdriver better than judgement by feel?',
      options: [
        'It is faster',
        'It is required by law',
        'It gives a repeatable, verifiable result that does not vary with the person or the day',
        'It looks professional',
      ],
      correctIndex: 2,
      explanation:
        'Feel varies enormously between people and even between terminals on the same board.',
    },
  ],
  WraH1MZ98mg: [
    {
      question: 'What does a roof tooth do that a slate rip does not?',
      options: [
        'It lifts the whole slate',
        'It seals the flashing',
        'It drags the nails out',
        'It cuts the nails, rather than dragging them',
      ],
      correctIndex: 3,
      explanation:
        'The roof tooth works like a hacksaw blade to cut the fixing nails; the older slate rip drags them out instead.',
    },
    {
      question: 'Why is a galvanised nail more of a problem than a copper or aluminium one?',
      options: [
        'It reacts with the flashing',
        'It rusts into the hook',
        'It is harder, so ripping it out tends to damage the brittle slate',
        'It cannot be cut at all',
      ],
      correctIndex: 2,
      explanation:
        'Copper and aluminium are softer. A galvanised nail resists, and the hole in the slate opens up and breaks as it pulls through.',
    },
    {
      question: 'Why can the slate not simply be put back once a hook is fitted?',
      options: [
        'The slate would be too heavy',
        'There would be nothing to stop water running around the hook — a flashing is needed',
        'Building control forbids it',
        'The hook needs painting first',
      ],
      correctIndex: 1,
      explanation:
        'The flashing fits between the slates and shrouds the hook, carrying water off and around it.',
    },
  ],
  u_8IOoyAqu4: [
    {
      question: 'How should fine-stranded DC cable be prepared for the isolator terminal?',
      options: [
        'Tinned with solder',
        'Doubled back on itself',
        'Twisted by hand',
        'Crimped into a ferrule so every strand is captured',
      ],
      correctIndex: 3,
      explanation:
        'A properly crimped ferrule stops strands splaying out and gives a reliable connection in the cage clamp.',
    },
    {
      question: 'For an outdoor DC isolator, which cable entry should be used?',
      options: ['Rear entry', 'Either, it makes no difference', 'Top entry', 'Bottom entry only'],
      correctIndex: 3,
      explanation: 'Outdoors it is bottom entry only — top entry invites water into the enclosure.',
    },
    {
      question: 'What is the consequence of a poor DC termination?',
      options: [
        'Hot spots and high resistance points at the connection',
        'Nothing, DC is low risk',
        'The voltage doubles',
        'The isolator will not close',
      ],
      correctIndex: 0,
      explanation:
        'High resistance at the termination generates heat, which is the real danger behind the DC isolator debate.',
    },
  ],
  '-BNxwVQfVyk': [
    {
      question: 'When sizing an array from panel dimensions, what must be added?',
      options: [
        'A fixed 100 mm per panel',
        'The thickness of the rail only',
        'Nothing — panels butt together',
        'Spacing of roughly 20 to 40 mm between panels, depending on the mounting system',
      ],
      correctIndex: 3,
      explanation:
        'Each gap between panels adds 20–40 mm, so the array is always larger than the panel dimensions alone suggest.',
    },
    {
      question: 'What edge clearance does he aim for around the array?',
      options: [
        'Exactly 100 mm',
        'Half a panel width',
        'About 400 mm where possible',
        'No clearance needed',
      ],
      correctIndex: 2,
      explanation:
        'MCS guidance drives keeping a good margin — around 400 mm — away from ridges and edges, which also helps with wind uplift.',
    },
    {
      question: 'Why sketch the layout by hand when design software is available?',
      options: [
        'Software is not accurate enough to use',
        'Because software costs too much',
        'It is a regulatory requirement',
        'To verify what the software is telling you is thereabouts right',
      ],
      correctIndex: 3,
      explanation:
        'He uses the sketch as a sanity check against the software output rather than as a replacement for it.',
    },
  ],
  pdl2r1zTw9g: [
    {
      question: 'What determines where the roof hooks are positioned?',
      options: [
        'Wherever the tiles lift easiest',
        'They must align with the rail positions, which suit the panel layout and edge distances',
        'At fixed 1 m centres regardless',
        'Directly under each panel corner only',
      ],
      correctIndex: 1,
      explanation:
        'Hook positions follow the rails, which in turn follow the panel layout set out in part one.',
    },
    {
      question: 'What is done to the tiles where a hook passes through?',
      options: [
        'They are drilled from below',
        'They are left untouched',
        'They are replaced with lead',
        'They are ground out, working at an extraction point to control dust',
      ],
      correctIndex: 3,
      explanation:
        'The tiles are ground to clear the hook, done at the extraction area to keep dust out of the workspace.',
    },
    {
      question: 'When Nathan positioned hooks differently from Mark, what happened?',
      options: [
        'He was told to redo it',
        'The work was rejected',
        'He checked before carrying on, and the different position was perfectly acceptable',
        'The panels would not fit',
      ],
      correctIndex: 2,
      explanation:
        'There is more than one workable hooking position — and checking rather than assuming is the habit worth copying.',
    },
  ],
};

/** Quiz for a video, or null when none exists. */
export function getVideoQuiz(videoId: string): VideoQuizQuestion[] | null {
  return videoQuizzes[videoId] ?? null;
}

/** Number of videos that have a quiz (for badges/labels). */
export const quizVideoCount = Object.keys(videoQuizzes).length;
