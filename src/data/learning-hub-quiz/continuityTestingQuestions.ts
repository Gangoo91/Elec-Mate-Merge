import { QuizQuestion } from '@/types/quiz';

export const continuityTestingQuestions: QuizQuestion[] = [
  {
    id: 'ct-1',
    question: 'What is the purpose of continuity testing of protective conductors?',
    options: [
      'To measure voltage drop',
      'To verify a continuous path for fault current to the MET',
      'To test the insulation resistance',
      'To measure power consumption'
    ],
    correctAnswer: 1,
    explanation: 'Continuity testing verifies that protective conductors provide a continuous low-resistance path for fault current to flow back to the MET, enabling protective devices to operate.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-2',
    question: 'What test voltage is used for continuity testing?',
    options: [
      '500V DC',
      '250V DC',
      '4-24V DC or AC no-load voltage',
      '230V AC'
    ],
    correctAnswer: 2,
    explanation: 'Continuity testing uses a low voltage source of 4-24V DC or AC (no-load) with a test current of at least 200mA.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-3',
    question: 'What is the R1+R2 value used for?',
    options: [
      'Calculating insulation resistance',
      'Calculating earth fault loop impedance (Zs)',
      'Determining cable colour',
      'Measuring power factor'
    ],
    correctAnswer: 1,
    explanation: 'The R1+R2 value (line and CPC resistance) is added to Ze to calculate Zs (earth fault loop impedance): Zs = Ze + (R1+R2).',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-4',
    question: 'What minimum test current is required for continuity testing?',
    options: [
      '50mA',
      '100mA',
      '200mA',
      '500mA'
    ],
    correctAnswer: 2,
    explanation: 'The test instrument must be capable of delivering a test current of at least 200mA to ensure reliable measurements.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-5',
    question: 'When testing ring final circuit continuity, what is the first step?',
    options: [
      'Connect L1 to L2',
      'Identify and verify the ring topology (L-L, N-N, CPC-CPC)',
      'Measure insulation resistance',
      'Connect to supply'
    ],
    correctAnswer: 1,
    explanation: 'The first step is to identify all conductors of the ring and verify the ring topology by measuring end-to-end resistance of each conductor (L1-L2, N1-N2, CPC1-CPC2).',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-6',
    question: 'In a correctly wired ring final circuit, what should the L-L, N-N, and CPC-CPC end-to-end readings show?',
    options: [
      'All exactly the same',
      'L-L and N-N similar, CPC may be higher',
      'CPC always lowest',
      'All readings should be infinite'
    ],
    correctAnswer: 1,
    explanation: 'L-L and N-N should be similar (same conductor size). CPC may be higher if it\'s a reduced size conductor (e.g., 1.5mm² in a 2.5mm² ring).',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-7',
    question: 'After cross-connecting conductors in a ring circuit test, what should readings at each socket show?',
    options: [
      'Increasing values towards the middle',
      'Substantially the same at every point',
      'Decreasing values from the board',
      'Zero at every point'
    ],
    correctAnswer: 1,
    explanation: 'With L1 connected to N2 and N1 to L2, the readings at every socket should be substantially the same, confirming the ring has no interconnections or breaks.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-8',
    question: 'What does a significantly higher reading at one socket in a ring circuit test indicate?',
    options: [
      'Normal variation',
      'A possible break or high-resistance joint',
      'Correct polarity',
      'Reduced current capacity'
    ],
    correctAnswer: 1,
    explanation: 'A significantly higher reading at one point suggests a break in the ring, high-resistance joint, or incorrect wiring that should be investigated.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-9',
    question: 'Before starting continuity testing, what must be done?',
    options: [
      'Connect to the supply',
      'Ensure the circuit is isolated and proved dead',
      'Turn on all appliances',
      'Measure the voltage'
    ],
    correctAnswer: 1,
    explanation: 'The circuit must be safely isolated and proved dead using an approved voltage indicator before any continuity testing.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.1'
  },
  {
    id: 'ct-10',
    question: 'Why must test leads be zeroed (nulled) before continuity testing?',
    options: [
      'To warm up the instrument',
      'To subtract lead resistance from readings',
      'To increase test voltage',
      'To calibrate for AC testing'
    ],
    correctAnswer: 1,
    explanation: 'Zeroing the test leads subtracts their resistance from subsequent readings, ensuring measurements reflect only the circuit under test.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-11',
    question: 'What R1+R2 reading would you expect for a 20m circuit using 2.5mm²/1.5mm² flat twin cable?',
    options: [
      'Less than 0.1 ohm',
      'Approximately 0.5-0.6 ohm',
      'More than 5 ohms',
      'Exactly 1 ohm'
    ],
    correctAnswer: 1,
    explanation: 'Using resistance values from BS 7671 tables (approx. 7.41 + 12.1 = 19.51 mΩ/m at 20°C), a 20m circuit would give approximately 0.4-0.6 ohm depending on temperature.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-12',
    question: 'What does a very low (near zero) resistance on a ring circuit end-to-end test indicate?',
    options: [
      'Excellent wiring',
      'A possible short circuit or bridge',
      'New cable installation',
      'High-quality connections'
    ],
    correctAnswer: 1,
    explanation: 'An unexpectedly low reading could indicate a short circuit between conductors or an unintended bridge/interconnection that bypasses the ring.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-13',
    question: 'For radial circuits, how is continuity of the CPC tested?',
    options: [
      'From MET to each outlet',
      'Between line and neutral',
      'At the supply only',
      'No test required for radials'
    ],
    correctAnswer: 0,
    explanation: 'For radial circuits, CPC continuity is tested from the MET (or distribution board earth bar) to the earth terminal at each point on the circuit.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-14',
    question: 'What is the purpose of the R2 measurement?',
    options: [
      'To measure neutral resistance',
      'To determine CPC resistance for Zs calculation',
      'To test the line conductor only',
      'To measure insulation quality'
    ],
    correctAnswer: 1,
    explanation: 'R2 is the resistance of the CPC (circuit protective conductor), needed along with R1 to calculate R1+R2 for earth fault loop impedance calculations.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-15',
    question: 'What test result would indicate a probable interconnection (spur) in a ring circuit?',
    options: [
      'Equal readings throughout',
      'One socket showing half the expected value',
      'All sockets showing infinite readings',
      'Random fluctuating values'
    ],
    correctAnswer: 1,
    explanation: 'An interconnection creates a parallel path. A socket showing approximately half the expected resistance value suggests it\'s connected to both legs of the ring (a bridge/spur).',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-16',
    question: 'What is the maximum resistance generally acceptable for main protective bonding conductors?',
    options: [
      '10 ohms',
      '0.05 ohms (50 milliohms)',
      '1 ohm',
      '5 ohms'
    ],
    correctAnswer: 1,
    explanation: 'Main bonding conductors should have very low resistance, typically less than 0.05 ohms, to ensure effective equipotential bonding.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:543.2'
  },
  {
    id: 'ct-17',
    question: 'What could cause inconsistent continuity readings on a circuit?',
    options: [
      'Stable temperature',
      'Loose connections or corroded terminals',
      'Using calibrated equipment',
      'New installation'
    ],
    correctAnswer: 1,
    explanation: 'Loose connections, corroded terminals, or damaged conductors can cause inconsistent readings and should be investigated and rectified.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:526'
  },
  {
    id: 'ct-18',
    question: 'When should supplementary bonding conductor continuity be tested?',
    options: [
      'Never required',
      'When supplementary bonding is installed, e.g., in bathrooms',
      'Only on new installations',
      'Only on three-phase supplies'
    ],
    correctAnswer: 1,
    explanation: 'Where supplementary bonding is installed (e.g., bathrooms where required), the continuity of these conductors must be verified.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:415.2'
  },
  {
    id: 'ct-19',
    question: 'What is a "wander lead" test used for in continuity testing?',
    options: [
      'Testing moving equipment',
      'Long-reach testing from DB to distant points',
      'Testing portable appliances',
      'Measuring voltage fluctuations'
    ],
    correctAnswer: 1,
    explanation: 'A wander lead is a long test lead used to measure continuity from the distribution board to distant points in an installation, such as R1+R2 to the furthest point.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-20',
    question: 'Why might temperature affect continuity test readings?',
    options: [
      'Instruments don\'t work in cold conditions',
      'Conductor resistance increases with temperature',
      'Temperature has no effect on resistance',
      'Cold reduces all readings to zero'
    ],
    correctAnswer: 1,
    explanation: 'Conductor resistance increases with temperature. Readings taken at ambient temperature must be adjusted when comparing to BS 7671 values, which are given at a reference temperature.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-21',
    question: 'What must be disconnected before testing continuity of the earthing conductor?',
    options: [
      'All circuits at the DB',
      'The earthing conductor from the MET',
      'The main switch only',
      'Nothing - test live'
    ],
    correctAnswer: 1,
    explanation: 'When testing continuity of the earthing conductor, it may need to be disconnected from the MET to avoid parallel paths affecting the reading (especially when measuring Ze).',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-22',
    question: 'What reading format is typically used for recording R1+R2 values?',
    options: [
      'Kilohms',
      'Ohms to two decimal places',
      'Megohms',
      'Millivolts'
    ],
    correctAnswer: 1,
    explanation: 'R1+R2 values are typically small (less than a few ohms) and are recorded in ohms to two decimal places for accuracy.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-23',
    question: 'What additional check should be made when testing ring final circuits?',
    options: [
      'Checking circuit breaker rating',
      'Verifying all spurs are correctly connected',
      'Measuring supply voltage',
      'Testing RCD operation'
    ],
    correctAnswer: 1,
    explanation: 'Ring circuit testing should also verify that any spurs are correctly connected and don\'t exceed the permitted number and load.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:433.1'
  },
  {
    id: 'ct-24',
    question: 'What is the formula to calculate expected R1+R2 at the far end of a circuit?',
    options: [
      'Cable length × mΩ/m values for both conductors',
      'Circuit breaker rating × cable length',
      'Voltage × current',
      'Ze × Zs'
    ],
    correctAnswer: 0,
    explanation: 'Expected R1+R2 = cable length (m) × (R1 mΩ/m + R2 mΩ/m), using tabulated resistance values adjusted for operating temperature if required.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-25',
    question: 'What indicates a successful ring final circuit test has been completed?',
    options: [
      'One reading only taken',
      'End-to-end tests complete, cross-connected tests show uniform readings',
      'Only CPC readings taken',
      'Visual inspection only'
    ],
    correctAnswer: 1,
    explanation: 'A complete ring test includes: end-to-end readings for L, N, and CPC; cross-connected tests showing uniform readings at each point; confirming no breaks or interconnections.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-26',
    question: 'What is the resistance value per metre for a 2.5mm² copper conductor at 20°C?',
    options: [
      '18.10 mΩ/m',
      '7.41 mΩ/m',
      '12.10 mΩ/m',
      '1.83 mΩ/m'
    ],
    correctAnswer: 1,
    explanation: 'The resistance of 2.5mm² copper conductor is approximately 7.41 mΩ/m at 20°C according to BS 7671 Table I1.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-27',
    question: 'What is the resistance value per metre for a 1.5mm² copper conductor at 20°C?',
    options: [
      '7.41 mΩ/m',
      '12.10 mΩ/m',
      '18.10 mΩ/m',
      '4.61 mΩ/m'
    ],
    correctAnswer: 1,
    explanation: 'The resistance of 1.5mm² copper conductor is approximately 12.10 mΩ/m at 20°C according to BS 7671 Table I1.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-28',
    question: 'Why is the R1+R2 figure important for circuit design verification?',
    options: [
      'It determines cable colour',
      'It confirms the circuit will disconnect within required time under fault',
      'It sets the RCD rating',
      'It determines socket outlet positions'
    ],
    correctAnswer: 1,
    explanation: 'The R1+R2 value when added to Ze gives Zs. This must be low enough to ensure the protective device operates within the required disconnection time during an earth fault.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:411.3.2'
  },
  {
    id: 'ct-29',
    question: 'What action should be taken if R1+R2 reading is unexpectedly high?',
    options: [
      'Record the value and continue',
      'Investigate for loose connections or wrong conductor size',
      'Increase the test voltage',
      'Accept it if below 10 ohms'
    ],
    correctAnswer: 1,
    explanation: 'An unexpectedly high R1+R2 reading could indicate loose connections, damaged conductors, or incorrect conductor size and must be investigated.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-30',
    question: 'In what units are resistance values typically given in BS 7671 tables?',
    options: [
      'Ohms per kilometre',
      'Milliohms per metre (mΩ/m)',
      'Kiloohms per metre',
      'Microohms per centimetre'
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 tables typically give conductor resistance values in milliohms per metre (mΩ/m) for practical calculations.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-31',
    question: 'What is the combined R1+R2 value per metre for 2.5mm²/1.5mm² twin and earth cable?',
    options: [
      '7.41 mΩ/m',
      '12.10 mΩ/m',
      '19.51 mΩ/m (7.41+12.10)',
      '4.61 mΩ/m'
    ],
    correctAnswer: 2,
    explanation: 'For 2.5mm²/1.5mm² cable, R1+R2 = 7.41 + 12.10 = 19.51 mΩ/m (combining line and CPC resistance values).',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-32',
    question: 'What multiplier is applied to convert 20°C resistance values to 70°C operating temperature?',
    options: [
      '0.8',
      '1.04',
      '1.20',
      '2.00'
    ],
    correctAnswer: 2,
    explanation: 'A multiplier of 1.20 is typically applied to convert conductor resistance from 20°C reference temperature to 70°C operating temperature.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:Table I1'
  },
  {
    id: 'ct-33',
    question: 'What is the resistance value per metre for a 4.0mm² copper conductor at 20°C?',
    options: [
      '7.41 mΩ/m',
      '4.61 mΩ/m',
      '3.08 mΩ/m',
      '12.10 mΩ/m'
    ],
    correctAnswer: 1,
    explanation: 'The resistance of 4.0mm² copper conductor is approximately 4.61 mΩ/m at 20°C.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-34',
    question: 'When testing the continuity of a long radial circuit, where should the measurement be taken?',
    options: [
      'Only at the distribution board',
      'At the furthest point from the distribution board',
      'At the midpoint of the circuit',
      'At the first accessory only'
    ],
    correctAnswer: 1,
    explanation: 'The furthest point gives the highest R1+R2 value, which represents the worst-case scenario for earth fault loop impedance.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-35',
    question: 'What could cause a reading of OL (open loop) during continuity testing?',
    options: [
      'Short circuit',
      'Broken conductor, open circuit, or disconnection',
      'Normal circuit operation',
      'Low battery in meter'
    ],
    correctAnswer: 1,
    explanation: 'An OL (open loop or over limit) reading indicates no continuous path - possibly a broken conductor, disconnected terminal, or open circuit.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-36',
    question: 'Why should all circuit loads be disconnected before continuity testing?',
    options: [
      'To save energy',
      'To prevent parallel paths affecting readings',
      'To protect the test instrument',
      'Loads have no effect on testing'
    ],
    correctAnswer: 1,
    explanation: 'Connected loads may provide parallel paths for test current, giving false (lower) readings that don\'t reflect the actual conductor resistance.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-37',
    question: 'What does "Method 1" refer to in ring final circuit testing?',
    options: [
      'Testing with power on',
      'Cross-connection method for confirming ring continuity',
      'Visual inspection only',
      'Single reading at one socket'
    ],
    correctAnswer: 1,
    explanation: 'Method 1 is the cross-connection technique: measuring end-to-end, then cross-connecting L1-N2 and N1-L2 to verify uniform readings at each socket.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3:Appendix E'
  },
  {
    id: 'ct-38',
    question: 'What type of test instrument is required for continuity testing?',
    options: [
      'Standard multimeter',
      'Low resistance ohmmeter with 200mA minimum test current',
      'Insulation tester',
      'Clamp meter'
    ],
    correctAnswer: 1,
    explanation: 'A low resistance ohmmeter capable of delivering at least 200mA test current is required to make reliable continuity measurements.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-39',
    question: 'When testing main bonding conductor continuity, where are measurements taken?',
    options: [
      'At the service valve only',
      'From MET to the connection point on the service (gas, water)',
      'At the consumer unit only',
      'Between live conductors'
    ],
    correctAnswer: 1,
    explanation: 'Main bonding continuity is measured from the MET to the bonding clamp connection point on gas, water, or other metallic services.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:544.1'
  },
  {
    id: 'ct-40',
    question: 'What is the purpose of testing CPC continuity at each point on a circuit?',
    options: [
      'To check cable colours',
      'To verify protective conductor is present and connected at each point',
      'To measure voltage',
      'To test the supply fuse'
    ],
    correctAnswer: 1,
    explanation: 'Testing at each point confirms the CPC provides a continuous earth fault path to every accessory on the circuit.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-41',
    question: 'What should be checked if ring circuit cross-connected readings vary significantly between sockets?',
    options: [
      'Battery level in test meter',
      'Possible break in ring, interconnection, or wiring error',
      'Time of day',
      'Socket brand compatibility'
    ],
    correctAnswer: 1,
    explanation: 'Significant variation suggests a wiring fault such as a break in the ring, incorrect connection, or unintended interconnection.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.2'
  },
  {
    id: 'ct-42',
    question: 'What is the resistance value per metre for a 6.0mm² copper conductor at 20°C?',
    options: [
      '4.61 mΩ/m',
      '3.08 mΩ/m',
      '7.41 mΩ/m',
      '1.83 mΩ/m'
    ],
    correctAnswer: 1,
    explanation: 'The resistance of 6.0mm² copper conductor is approximately 3.08 mΩ/m at 20°C.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-43',
    question: 'What documentation is required for continuity test results?',
    options: [
      'Verbal confirmation only',
      'Recorded values on test schedule/certificate',
      'Photograph of meter display',
      'No documentation required'
    ],
    correctAnswer: 1,
    explanation: 'Continuity test results must be recorded on the appropriate test schedule or electrical installation certificate.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:Part 6'
  },
  {
    id: 'ct-44',
    question: 'For a 30m lighting circuit using 1.5mm²/1.0mm² cable, what is the approximate expected R1+R2?',
    options: [
      '0.25 ohms',
      '0.91 ohms',
      '2.5 ohms',
      '0.05 ohms'
    ],
    correctAnswer: 1,
    explanation: 'Using resistance values (12.10 + 18.10 = 30.20 mΩ/m), 30m × 30.20 mΩ/m = 906 mΩ ≈ 0.91 ohms.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-45',
    question: 'What effect does a steel conduit system have on continuity testing?',
    options: [
      'No effect on testing',
      'The conduit may be used as CPC if verified for continuity',
      'Steel conduit prevents testing',
      'Higher test voltage required'
    ],
    correctAnswer: 1,
    explanation: 'Steel conduit can serve as the CPC if its continuity is verified and it meets resistance requirements. All joints must provide reliable electrical continuity.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:543.2'
  },
  {
    id: 'ct-46',
    question: 'What is the resistance value per metre for a 10mm² copper conductor at 20°C?',
    options: [
      '3.08 mΩ/m',
      '1.83 mΩ/m',
      '4.61 mΩ/m',
      '7.41 mΩ/m'
    ],
    correctAnswer: 1,
    explanation: 'The resistance of 10mm² copper conductor is approximately 1.83 mΩ/m at 20°C.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table I1'
  },
  {
    id: 'ct-47',
    question: 'What is the correct procedure if continuity cannot be established on a circuit?',
    options: [
      'Assume the circuit is safe',
      'Identify and rectify the fault before proceeding',
      'Use a higher test current',
      'Record as "not tested"'
    ],
    correctAnswer: 1,
    explanation: 'If continuity cannot be established, the fault must be identified and rectified. The circuit cannot be certified as safe without satisfactory continuity.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'ct-48',
    question: 'What is the maximum permitted R1+R2 value for a circuit protected by a 32A Type B MCB (Zs max 1.37Ω)?',
    options: [
      'R1+R2 is unlimited',
      'R1+R2 = Zs max - Ze (e.g., if Ze=0.35Ω, max R1+R2 ≈ 1.02Ω)',
      'Always 0.5 ohms',
      '10 ohms'
    ],
    correctAnswer: 1,
    explanation: 'Maximum R1+R2 = Zs(max) - Ze. For a 32A Type B MCB with Zs max 1.37Ω and typical Ze of 0.35Ω, maximum R1+R2 would be approximately 1.02Ω.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:Table 41.3'
  },
  {
    id: 'ct-49',
    question: 'Why is it important to test continuity of protective conductors before energising?',
    options: [
      'To warm up the cables',
      'To ensure fault protection is functional before live testing',
      'Testing after energising gives better results',
      'It makes no difference when testing occurs'
    ],
    correctAnswer: 1,
    explanation: 'Continuity testing before energising confirms the protective conductor provides an effective fault current path, ensuring automatic disconnection will function if needed.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.1'
  },
  {
    id: 'ct-50',
    question: 'When testing earth electrode resistance with the "fall of potential" method, what is being verified?',
    options: [
      'CPC continuity only',
      'The resistance of the earth electrode to general mass of earth',
      'Insulation resistance of the electrode',
      'Voltage at the electrode'
    ],
    correctAnswer: 1,
    explanation: 'The fall of potential method measures the resistance between the earth electrode and the general mass of earth, essential for TT system earth fault protection.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.7'
  }
];
