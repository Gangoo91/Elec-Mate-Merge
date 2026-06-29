import { QuizQuestion } from '@/types/quiz';

export const continuityTestingQuestions: QuizQuestion[] = [
  {
    id: 'ct-1',
    question: 'What is the purpose of continuity testing of protective conductors?',
    options: [
      'To verify a continuous low-resistance path for fault current to the MET',
      'To confirm the insulation resistance between live conductors and earth',
      'To prove the polarity of the line and neutral connections is correct',
      'To measure the prospective fault current available at the origin',
    ],
    correctAnswer: 0,
    explanation:
      'Continuity testing verifies that protective conductors provide a continuous low-resistance path for fault current to flow back to the MET, enabling protective devices to operate within the required disconnection time.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-2',
    question: 'What test voltage is used for continuity testing?',
    options: [
      '50-100V DC, the same as a low-range insulation test',
      '4-24V DC or AC no-load voltage',
      '230V AC drawn directly from the supply',
      '500V DC, matching the standard insulation test voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity testing uses a low no-load voltage source of 4-24V DC or AC, delivering a short-circuit test current of at least 200mA for reliable low-resistance measurements.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-3',
    question: 'What is the R1+R2 value used for?',
    options: [
      'Confirming the insulation resistance of the circuit conductors',
      'Verifying the polarity of the line conductor at each accessory',
      'Calculating earth fault loop impedance (Zs)',
      'Determining the prospective short-circuit current at the board',
    ],
    correctAnswer: 2,
    explanation:
      'The R1+R2 value (line plus CPC resistance) is added to Ze to calculate Zs (earth fault loop impedance): Zs = Ze + (R1+R2).',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-4',
    question: 'What minimum test current is required for continuity testing?',
    options: [
      '50mA',
      '100mA',
      '500mA',
      '200mA',
    ],
    correctAnswer: 3,
    explanation:
      'The test instrument must be capable of delivering a test current of at least 200mA to ensure reliable measurements.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-5',
    question: 'When testing ring final circuit continuity, what is the first step?',
    options: [
      'Identify each leg and measure the end-to-end resistance of L, N and CPC',
      'Cross-connect the line and neutral conductors at the board',
      'Measure the insulation resistance between line and earth',
      'Energise the circuit and record the Zs at the furthest socket',
    ],
    correctAnswer: 0,
    explanation:
      'The first step is to identify both legs of each conductor and measure the end-to-end resistance of line, neutral and CPC (L1-L2, N1-N2, CPC1-CPC2) before any cross-connection.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-6',
    question:
      'In a correctly wired ring final circuit, what should the L-L, N-N, and CPC-CPC end-to-end readings show?',
    options: [
      'All three readings should be identical to within 0.05Ω',
      'L-L and N-N similar, with the CPC reading higher',
      'The CPC reading should always be the lowest of the three',
      'All three should read close to zero ohms',
    ],
    correctAnswer: 1,
    explanation:
      "L-L and N-N should be similar (same conductor size). The CPC reading is typically higher because it is often a reduced-size conductor (e.g. 1.5mm² CPC in a 2.5mm² ring), giving roughly 1.67 times the resistance.",
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-7',
    question:
      'After cross-connecting conductors in a ring circuit test, what should readings at each socket show?',
    options: [
      'Increasing values towards the middle',
      'Decreasing values from the board',
      'Substantially the same at every point',
      'Zero at every point',
    ],
    correctAnswer: 2,
    explanation:
      'With L1 connected to N2 and N1 to L2, the readings at every socket should be substantially the same, confirming the ring has no interconnections or breaks.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-8',
    question:
      'What does a significantly higher reading at one socket in a ring circuit test indicate?',
    options: [
      'A correctly terminated spur on that socket',
      'A perfectly balanced ring with no faults',
      'An interconnection between the two legs of the ring',
      'A break in the ring or a high-resistance joint',
    ],
    correctAnswer: 3,
    explanation:
      'A significantly higher reading at one point suggests a break in the ring, a high-resistance (loose or corroded) joint, or incorrect wiring that should be investigated.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-9',
    question: 'Before starting continuity testing, what must be done?',
    options: [
      'Ensure the circuit is isolated and proved dead',
      'Energise the circuit to confirm the supply is present',
      'Measure the earth fault loop impedance at the origin',
      'Connect all final loads so readings reflect the full circuit',
    ],
    correctAnswer: 0,
    explanation:
      'The circuit must be safely isolated and proved dead using an approved voltage indicator (and proving unit) before any continuity testing, as it is a dead test.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.1',
  },
  {
    id: 'ct-10',
    question: 'Why must test leads be zeroed (nulled) before continuity testing?',
    options: [
      'To subtract lead resistance from readings',
      'To warm up the instrument',
      'To increase test voltage',
      'To calibrate for AC testing',
    ],
    correctAnswer: 0,
    explanation:
      'Zeroing the test leads subtracts their resistance from subsequent readings, ensuring measurements reflect only the circuit under test.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-11',
    question:
      'What R1+R2 reading would you expect for a 20m circuit using 2.5mm²/1.5mm² flat twin cable?',
    options: [
      'Approximately 1.5 ohm',
      'Approximately 0.05 ohm',
      'Approximately 0.15 ohm',
      'Approximately 0.39 ohm',
    ],
    correctAnswer: 3,
    explanation:
      'Using BS 7671 table values (7.41 + 12.10 = 19.51 mΩ/m at 20°C), 20m × 19.51 mΩ/m ≈ 390 mΩ, i.e. approximately 0.39 ohm.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-12',
    question:
      'What does a very low (near zero) resistance on a ring circuit end-to-end test indicate?',
    options: [
      'A correctly wired ring with a healthy CPC',
      'A high-resistance joint somewhere in the ring',
      'A short circuit or unintended bridge between conductors',
      'An open circuit at the consumer unit terminals',
    ],
    correctAnswer: 2,
    explanation:
      'An unexpectedly low end-to-end reading could indicate a short circuit between conductors or an unintended bridge/interconnection that bypasses part of the ring.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-13',
    question: 'For radial circuits, how is continuity of the CPC tested?',
    options: [
      'Between line and neutral',
      'From MET to each outlet',
      'At the supply only',
      'No test required for radials',
    ],
    correctAnswer: 1,
    explanation:
      'For radial circuits, CPC continuity is tested from the MET (or distribution board earth bar) to the earth terminal at each point on the circuit.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-14',
    question: 'What is the purpose of the R2 measurement?',
    options: [
      'To determine CPC resistance for Zs calculation',
      'To measure neutral resistance',
      'To test the line conductor only',
      'To measure insulation quality',
    ],
    correctAnswer: 0,
    explanation:
      'R2 is the resistance of the CPC (circuit protective conductor), needed along with R1 to calculate R1+R2 for earth fault loop impedance calculations.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-15',
    question:
      'What test result would indicate a probable interconnection (spur) in a ring circuit?',
    options: [
      'Equal readings throughout',
      'Random fluctuating values',
      'All sockets showing infinite readings',
      'One socket showing half the expected value',
    ],
    correctAnswer: 3,
    explanation:
      "An interconnection creates a parallel path. A socket showing approximately half the expected resistance value suggests it's connected to both legs of the ring (a bridge/spur).",
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-16',
    question:
      'What is the maximum resistance generally acceptable for main protective bonding conductors?',
    options: [
      '10 ohms',
      '1 ohm',
      '0.05 ohms (50 milliohms)',
      '5 ohms',
    ],
    correctAnswer: 2,
    explanation:
      'Main bonding conductors should have very low resistance, typically around 0.05 ohms; where instrument resolution limits accuracy a guideline acceptance of not exceeding 0.1 ohm is applied to confirm effective bonding.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:543.2',
  },
  {
    id: 'ct-17',
    question: 'What could cause inconsistent continuity readings on a circuit?',
    options: [
      'Test leads that have been correctly nulled',
      'Loose connections or corroded terminals',
      'An instrument with a 200mA test current',
      'A circuit that has been correctly isolated',
    ],
    correctAnswer: 1,
    explanation:
      'Loose connections, corroded terminals, or damaged conductors can cause inconsistent or fluctuating readings and should be investigated and rectified.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:526',
  },
  {
    id: 'ct-18',
    question: 'When should supplementary bonding conductor continuity be tested?',
    options: [
      'Where supplementary bonding is installed, such as in a bathroom',
      'Only on TT systems where the earth electrode is in use',
      'Only after the installation has been energised and loaded',
      'Only on circuits protected by a 30mA RCD',
    ],
    correctAnswer: 0,
    explanation:
      'Where supplementary bonding is installed (e.g. in a location containing a bath or shower where required), the continuity of these conductors must be verified.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:415.2',
  },
  {
    id: 'ct-19',
    question: 'What is a "wander lead" test used for in continuity testing?',
    options: [
      'Nulling the resistance of the instrument test leads',
      'Measuring insulation resistance between distant conductors',
      'Verifying polarity at the consumer unit only',
      'Long-reach testing from the board to distant points',
    ],
    correctAnswer: 3,
    explanation:
      'A wander lead is a long test lead used to measure continuity from the distribution board to distant points in an installation, such as R1+R2 to the furthest point of a circuit.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-20',
    question: 'Why might temperature affect continuity test readings?',
    options: [
      "Instruments don't work in cold conditions",
      'Cold reduces all readings to zero',
      'Temperature has no effect on resistance',
      'Conductor resistance increases with temperature',
    ],
    correctAnswer: 3,
    explanation:
      'Conductor resistance increases with temperature. Readings taken at ambient temperature must be adjusted when comparing to BS 7671 values, which are given at a reference temperature.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-21',
    question: 'What must be disconnected before testing continuity of the earthing conductor?',
    options: [
      'The earthing conductor from the MET',
      'All final circuit CPCs from the earth bar',
      'The main supply fuse at the cut-out',
      'The neutral conductor from the supply terminal',
    ],
    correctAnswer: 0,
    explanation:
      'When testing continuity of the earthing conductor, it may need to be disconnected from the MET to avoid parallel paths (via bonding to services) giving a falsely low reading.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-22',
    question: 'What reading format is typically used for recording R1+R2 values?',
    options: [
      'Megohms to one decimal place',
      'Ohms to two decimal places',
      'Kilohms to three decimal places',
      'Amperes to the nearest whole number',
    ],
    correctAnswer: 1,
    explanation:
      'R1+R2 values are typically small (less than a few ohms) and are recorded in ohms to two decimal places for accuracy on the test schedule.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-23',
    question: 'What additional check should be made when testing ring final circuits?',
    options: [
      'Measuring the insulation resistance leg by leg',
      'Recording the prospective fault current at each socket',
      'Verifying all spurs are correctly connected',
      'Confirming the supply voltage at the origin',
    ],
    correctAnswer: 2,
    explanation:
      "Ring circuit testing should also verify that any spurs are correctly connected and do not exceed the permitted number and load for the circuit.",
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:433.1',
  },
  {
    id: 'ct-24',
    question: 'What is the formula to calculate expected R1+R2 at the far end of a circuit?',
    options: [
      'Zs max minus Ze, ignoring the conductor lengths',
      'Ze multiplied by the number of accessories on the circuit',
      'The supply voltage divided by the prospective fault current',
      'Cable length × (R1 + R2) mΩ/m for both conductors',
    ],
    correctAnswer: 3,
    explanation:
      'Expected R1+R2 = cable length (m) × (R1 mΩ/m + R2 mΩ/m), using tabulated resistance values adjusted for operating temperature if required.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-25',
    question: 'What indicates a successful ring final circuit test has been completed?',
    options: [
      'End-to-end tests done and cross-connected tests show uniform readings',
      'The end-to-end CPC reading is exactly zero ohms',
      'One socket reads half the value of all the others',
      'The insulation resistance exceeds 1 megohm at every point',
    ],
    correctAnswer: 0,
    explanation:
      'A complete ring test includes: end-to-end readings for L, N, and CPC; cross-connected tests showing uniform readings at each point; confirming no breaks or interconnections.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-26',
    question: 'What is the resistance value per metre for a 2.5mm² copper conductor at 20°C?',
    options: [
      '18.10 mΩ/m',
      '7.41 mΩ/m',
      '12.10 mΩ/m',
      '1.83 mΩ/m',
    ],
    correctAnswer: 1,
    explanation:
      'The resistance of 2.5mm² copper conductor is approximately 7.41 mΩ/m at 20°C according to BS 7671 Table I1.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-27',
    question: 'What is the resistance value per metre for a 1.5mm² copper conductor at 20°C?',
    options: [
      '7.41 mΩ/m',
      '18.10 mΩ/m',
      '12.10 mΩ/m',
      '4.61 mΩ/m',
    ],
    correctAnswer: 2,
    explanation:
      'The resistance of 1.5mm² copper conductor is approximately 12.10 mΩ/m at 20°C according to BS 7671 Table I1.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-28',
    question: 'Why is the R1+R2 figure important for circuit design verification?',
    options: [
      'It confirms the insulation resistance meets the minimum value',
      'It verifies the polarity of every accessory on the circuit',
      'It proves the prospective fault current is below the breaking capacity',
      'It confirms the circuit will disconnect within the required time under fault',
    ],
    correctAnswer: 3,
    explanation:
      'R1+R2 added to Ze gives Zs. This must be low enough to ensure the protective device operates within the required disconnection time during an earth fault.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:411.3.2',
  },
  {
    id: 'ct-29',
    question: 'What action should be taken if R1+R2 reading is unexpectedly high?',
    options: [
      'Investigate for loose connections or the wrong conductor size',
      'Record the value and issue the certificate as satisfactory',
      'Reduce the instrument test current to confirm the reading',
      'Energise the circuit and re-measure under load',
    ],
    correctAnswer: 0,
    explanation:
      'An unexpectedly high R1+R2 reading could indicate loose connections, damaged conductors, or an incorrect (undersized) conductor and must be investigated before certification.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-30',
    question: 'In what units are resistance values typically given in BS 7671 tables?',
    options: [
      'Ohms per kilometre',
      'Kiloohms per metre',
      'Milliohms per metre (mΩ/m)',
      'Microohms per centimetre',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 tables typically give conductor resistance values in milliohms per metre (mΩ/m) for practical calculations.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-31',
    question: 'What is the combined R1+R2 value per metre for 2.5mm²/1.5mm² twin and earth cable?',
    options: [
      '7.41 mΩ/m',
      '19.51 mΩ/m (7.41+12.10)',
      '12.10 mΩ/m',
      '4.61 mΩ/m',
    ],
    correctAnswer: 1,
    explanation:
      'For 2.5mm²/1.5mm² cable, R1+R2 = 7.41 + 12.10 = 19.51 mΩ/m (combining line and CPC resistance values).',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-32',
    question:
      'What multiplier is applied to convert 20°C resistance values to 70°C operating temperature?',
    options: [
      '1.20',
      '1.04',
      '0.8',
      '2.00',
    ],
    correctAnswer: 0,
    explanation:
      'A multiplier of 1.20 is typically applied to convert conductor resistance from 20°C reference temperature to 70°C operating temperature.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:Table I1',
  },
  {
    id: 'ct-33',
    question: 'What is the resistance value per metre for a 4.0mm² copper conductor at 20°C?',
    options: [
      '7.41 mΩ/m',
      '12.10 mΩ/m',
      '3.08 mΩ/m',
      '4.61 mΩ/m',
    ],
    correctAnswer: 3,
    explanation: 'The resistance of 4.0mm² copper conductor is approximately 4.61 mΩ/m at 20°C.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-34',
    question:
      'When testing the continuity of a long radial circuit, where should the measurement be taken?',
    options: [
      'At the consumer unit terminals only',
      'At the midpoint of the circuit run',
      'At the furthest point from the distribution board',
      'At the first accessory on the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'The furthest point gives the highest R1+R2 value, which represents the worst-case scenario for earth fault loop impedance (Zs).',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-35',
    question: 'What could cause a reading of OL (open loop) during continuity testing?',
    options: [
      'A short circuit between line and neutral',
      'A broken conductor, open circuit, or disconnected terminal',
      'A perfectly continuous low-resistance path',
      'An interconnection between the legs of a ring',
    ],
    correctAnswer: 1,
    explanation:
      'An OL (open loop or over-limit) reading indicates no continuous path — possibly a broken conductor, a disconnected terminal, or an open circuit.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-36',
    question: 'Why should all circuit loads be disconnected before continuity testing?',
    options: [
      'To prevent parallel paths giving false low readings',
      'To stop the loads from being damaged by the test current',
      'To allow a higher test voltage to be applied safely',
      'To ensure the supply remains energised during the test',
    ],
    correctAnswer: 0,
    explanation:
      "Connected loads may provide parallel paths for the test current, giving false (lower) readings that do not reflect the actual conductor resistance.",
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-37',
    question: 'What does "Method 1" refer to in ring final circuit testing?',
    options: [
      'Measuring only the end-to-end CPC resistance',
      'Using a long wander lead from the board to each point',
      'Testing insulation resistance leg by leg',
      'The cross-connection technique for confirming ring continuity',
    ],
    correctAnswer: 3,
    explanation:
      'The cross-connection technique measures end-to-end first, then cross-connects L1-N2 and N1-L2 to verify uniform readings at each socket, confirming the ring is continuous.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3:Appendix E',
  },
  {
    id: 'ct-38',
    question: 'What type of test instrument is required for continuity testing?',
    options: [
      'An insulation resistance tester set to 500V DC',
      'A clamp meter capable of reading load current',
      'A low-resistance ohmmeter with at least 200mA test current',
      'An earth electrode tester using the fall-of-potential method',
    ],
    correctAnswer: 2,
    explanation:
      'A low-resistance ohmmeter (continuity range) capable of delivering at least 200mA short-circuit test current is required for reliable continuity measurements.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-39',
    question: 'When testing main bonding conductor continuity, where are measurements taken?',
    options: [
      'From the supply neutral to the consumer unit',
      'From the MET to the bonding clamp on the service (gas, water)',
      'From the furthest socket back to the distribution board',
      'From the earth electrode to the general mass of earth',
    ],
    correctAnswer: 1,
    explanation:
      'Main bonding continuity is measured from the MET to the bonding clamp connection point on gas, water, or other metallic services entering the building.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:544.1',
  },
  {
    id: 'ct-40',
    question: 'What is the purpose of testing CPC continuity at each point on a circuit?',
    options: [
      'To measure the insulation resistance at each accessory',
      'To verify the CPC is present and connected at every point',
      'To confirm the supply polarity at each accessory',
      'To record the prospective fault current at each point',
    ],
    correctAnswer: 1,
    explanation:
      'Testing at each point confirms the CPC provides a continuous earth fault path to every accessory on the circuit.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-41',
    question:
      'What should be checked if ring circuit cross-connected readings vary significantly between sockets?',
    options: [
      'The instrument needs recalibrating to the correct range',
      'The test leads were not nulled before testing',
      'A break in the ring, incorrect connection, or interconnection',
      'The supply voltage is fluctuating during the test',
    ],
    correctAnswer: 2,
    explanation:
      'Significant variation between sockets suggests a wiring fault such as a break in the ring, an incorrect connection, or an unintended interconnection.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2',
  },
  {
    id: 'ct-42',
    question: 'What is the resistance value per metre for a 6.0mm² copper conductor at 20°C?',
    options: [
      '7.41 mΩ/m',
      '4.61 mΩ/m',
      '1.83 mΩ/m',
      '3.08 mΩ/m',
    ],
    correctAnswer: 3,
    explanation: 'The resistance of 6.0mm² copper conductor is approximately 3.08 mΩ/m at 20°C.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-43',
    question: 'What documentation is required for continuity test results?',
    options: [
      'Recorded values on the schedule of test results / certificate',
      'A verbal report to the client only',
      'A note kept solely in the electrician\'s own diary',
      'No record is needed for dead tests',
    ],
    correctAnswer: 0,
    explanation:
      'Continuity test results must be recorded on the appropriate schedule of test results forming part of the electrical installation certificate or EICR.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:Part 6',
  },
  {
    id: 'ct-44',
    question:
      'For a 30m lighting circuit using 1.5mm²/1.0mm² cable, what is the approximate expected R1+R2?',
    options: [
      '0.25 ohms',
      '0.91 ohms',
      '0.05 ohms',
      '2.5 ohms',
    ],
    correctAnswer: 1,
    explanation:
      'Using resistance values (12.10 + 18.10 = 30.20 mΩ/m), 30m × 30.20 mΩ/m = 906 mΩ ≈ 0.91 ohms.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-45',
    question: 'What effect does a steel conduit system have on continuity testing?',
    options: [
      'The conduit must always be ignored as it cannot carry fault current',
      'Steel conduit invalidates any continuity measurement taken',
      'The conduit may serve as the CPC if its continuity is verified',
      'A separate CPC is forbidden where steel conduit is used',
    ],
    correctAnswer: 2,
    explanation:
      'Steel conduit can serve as the CPC if its continuity is verified and it meets resistance requirements; all joints must provide reliable, low-resistance electrical continuity.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:543.2',
  },
  {
    id: 'ct-46',
    question: 'What is the resistance value per metre for a 10mm² copper conductor at 20°C?',
    options: [
      '3.08 mΩ/m',
      '7.41 mΩ/m',
      '4.61 mΩ/m',
      '1.83 mΩ/m',
    ],
    correctAnswer: 3,
    explanation: 'The resistance of 10mm² copper conductor is approximately 1.83 mΩ/m at 20°C.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1',
  },
  {
    id: 'ct-47',
    question: 'What is the correct procedure if continuity cannot be established on a circuit?',
    options: [
      'Identify and rectify the fault before proceeding',
      'Energise the circuit and re-test under load',
      'Certify the circuit and note it as a limitation',
      'Increase the instrument test current and re-read',
    ],
    correctAnswer: 0,
    explanation:
      'If continuity cannot be established, the fault must be identified and rectified. The circuit cannot be certified as safe without satisfactory continuity.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1',
  },
  {
    id: 'ct-48',
    question:
      'What is the maximum permitted R1+R2 value for a circuit protected by a 32A Type B MCB (Zs max 1.37Ω)?',
    options: [
      'Approximately 1.72Ω (Zs max plus Ze)',
      'Approximately 1.02Ω (Zs max minus Ze)',
      'Approximately 1.37Ω (equal to Zs max)',
      'Approximately 0.35Ω (equal to Ze)',
    ],
    correctAnswer: 1,
    explanation:
      'Maximum R1+R2 = Zs(max) - Ze. For a 32A Type B MCB with Zs max 1.37Ω and a typical Ze of 0.35Ω, maximum R1+R2 ≈ 1.37 - 0.35 = 1.02Ω.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:Table 41.3',
  },
  {
    id: 'ct-49',
    question: 'Why is it important to test continuity of protective conductors before energising?',
    options: [
      'To confirm the insulation resistance before connection',
      'To measure the prospective fault current at the origin',
      'To ensure fault protection will function before live testing',
      'To verify the supply polarity at the consumer unit',
    ],
    correctAnswer: 2,
    explanation:
      'Continuity testing before energising confirms the protective conductor provides an effective fault current path, so automatic disconnection of supply will operate if a fault occurs.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.1',
  },
  {
    id: 'ct-50',
    question:
      'When testing earth electrode resistance with the "fall of potential" method, what is being verified?',
    options: [
      'The resistance of the earth electrode to the general mass of earth',
      'The resistance of the CPC from the board to the furthest point',
      'The earth fault loop impedance of the final circuit',
      'The insulation resistance between the electrode and earth',
    ],
    correctAnswer: 0,
    explanation:
      'The fall-of-potential method measures the resistance between the earth electrode and the general mass of earth, essential for verifying TT system earth fault protection.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.7',
  },
];
