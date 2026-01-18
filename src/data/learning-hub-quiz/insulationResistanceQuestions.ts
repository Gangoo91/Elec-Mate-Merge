import { QuizQuestion } from '@/types/quiz';

export const insulationResistanceQuestions: QuizQuestion[] = [
  {
    id: 'ir-1',
    question: 'What is the minimum acceptable insulation resistance for a 230V circuit?',
    options: [
      '0.5 MΩ',
      '1.0 MΩ',
      '2.0 MΩ',
      '0.25 MΩ'
    ],
    correctAnswer: 1,
    explanation: 'For circuits up to and including 500V (which includes 230V circuits), the minimum acceptable insulation resistance is 1.0 MΩ.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-2',
    question: 'What test voltage should be used for insulation resistance testing on 230V circuits?',
    options: [
      '250V DC',
      '500V DC',
      '1000V DC',
      '230V AC'
    ],
    correctAnswer: 1,
    explanation: 'For circuits with a nominal voltage up to 500V AC, a 500V DC test voltage is used for insulation resistance testing.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-3',
    question: 'What test voltage is used for SELV/PELV circuits?',
    options: [
      '500V DC',
      '250V DC',
      '1000V DC',
      '50V DC'
    ],
    correctAnswer: 1,
    explanation: 'SELV and PELV circuits (up to 50V) use a reduced test voltage of 250V DC to prevent damage to low-voltage equipment.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-4',
    question: 'What must be done to sensitive electronic equipment before insulation testing?',
    options: [
      'Connect to supply',
      'Disconnect or bypass',
      'Leave connected',
      'Cover with insulation'
    ],
    correctAnswer: 1,
    explanation: 'Sensitive electronic equipment must be disconnected or bypassed before insulation testing as the high test voltage (500V DC) can damage electronic components.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-5',
    question: 'What insulation resistance reading is typically expected from a new installation?',
    options: [
      'Exactly 1 MΩ',
      'Greater than 2 MΩ',
      'Greater than 200 MΩ',
      'Less than 0.5 MΩ'
    ],
    correctAnswer: 2,
    explanation: 'New installations typically yield insulation resistance values much higher than the minimum, often exceeding 200 MΩ. Low values should be investigated.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-6',
    question: 'What are the three tests performed for complete insulation resistance testing?',
    options: [
      'Live-Neutral, Live-Earth, Neutral-Earth',
      'Phase-Phase, Phase-Neutral, Neutral-Earth',
      'Live-CPC only',
      'Earth-Earth, Neutral-Neutral, Live-Live'
    ],
    correctAnswer: 0,
    explanation: 'Complete insulation testing requires three tests: Line to Neutral, Line to Earth (CPC), and Neutral to Earth, ensuring all conductor combinations are tested.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-7',
    question: 'Why should all switches be closed during insulation resistance testing?',
    options: [
      'To test switch operation',
      'To include all wiring in the test',
      'To increase the reading',
      'To protect equipment'
    ],
    correctAnswer: 1,
    explanation: 'Closing all switches ensures all wiring, including switch wires and downstream cables, is included in the insulation resistance test.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-8',
    question: 'What is the minimum insulation resistance for circuits operating above 500V?',
    options: [
      '0.5 MΩ',
      '1.0 MΩ',
      '2.0 MΩ',
      '5.0 MΩ'
    ],
    correctAnswer: 1,
    explanation: 'For circuits operating above 500V up to 1000V, the minimum acceptable insulation resistance remains 1.0 MΩ but is tested at 1000V DC.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-9',
    question: 'What should be done if the initial insulation resistance reading is below the minimum?',
    options: [
      'Accept the reading and continue',
      'Investigate and locate the fault',
      'Increase the test voltage',
      'Repeat the test multiple times'
    ],
    correctAnswer: 1,
    explanation: 'If the reading is below the minimum acceptable value, the fault must be investigated, located, and rectified before the installation can be commissioned.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-10',
    question: 'How long should the test voltage be applied for a stable reading?',
    options: [
      '1 second',
      '5 seconds',
      'Until the reading stabilises (typically 1 minute)',
      '10 minutes'
    ],
    correctAnswer: 2,
    explanation: 'The test voltage should be applied until the reading stabilises, which typically takes about one minute for an accurate measurement.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-11',
    question: 'What effect does moisture have on insulation resistance?',
    options: [
      'Increases the reading',
      'Decreases the reading',
      'No effect',
      'Stabilises the reading'
    ],
    correctAnswer: 1,
    explanation: 'Moisture significantly decreases insulation resistance by providing conductive paths. Damp conditions can cause low readings that improve when dried out.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-12',
    question: 'What should be linked together during insulation testing of a single circuit?',
    options: [
      'Line and Earth',
      'Line and Neutral conductors at the distribution board',
      'Earth and Neutral only',
      'All three conductors'
    ],
    correctAnswer: 1,
    explanation: 'For testing a single circuit, line and neutral can be linked at the DB and tested together to earth, simplifying the process while still checking for earth faults.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-13',
    question: 'What component commonly causes low insulation readings in lighting circuits?',
    options: [
      'The cable',
      'The switch',
      'The lampholder or luminaire',
      'The junction box'
    ],
    correctAnswer: 2,
    explanation: 'Lampholders and luminaires, particularly older or lower quality ones, often have reduced insulation and are a common cause of lower readings on lighting circuits.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-14',
    question: 'What is the minimum IR for SELV circuits?',
    options: [
      '0.25 MΩ',
      '0.5 MΩ',
      '1.0 MΩ',
      '2.0 MΩ'
    ],
    correctAnswer: 1,
    explanation: 'SELV and PELV circuits have a minimum insulation resistance requirement of 0.5 MΩ when tested at 250V DC.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-15',
    question: 'Why is insulation resistance tested with DC voltage rather than AC?',
    options: [
      'DC is safer',
      'DC provides stable readings without capacitive effects',
      'AC damages cables',
      'DC is required by law'
    ],
    correctAnswer: 1,
    explanation: 'DC testing avoids capacitive charging currents that would occur with AC, providing stable and accurate readings of true insulation resistance.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-16',
    question: 'What should be done with pilot and indicator lamps before IR testing?',
    options: [
      'Leave connected',
      'Disconnect or remove',
      'Connect to supply',
      'Cover with tape'
    ],
    correctAnswer: 1,
    explanation: 'Pilot and indicator lamps should be disconnected as they may be damaged by the test voltage and will also give false low readings.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-17',
    question: 'After IR testing, what must be done to safely discharge cables?',
    options: [
      'Leave to discharge naturally',
      'Discharge through the test instrument or suitable resistor',
      'Connect to supply briefly',
      'No discharge required'
    ],
    correctAnswer: 1,
    explanation: 'After testing, cables may hold a charge from the test voltage. They must be safely discharged through the test instrument or a suitable resistor before handling.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-18',
    question: 'What trend in IR readings during periodic testing indicates deterioration?',
    options: [
      'Increasing values',
      'Decreasing values over time',
      'Stable values',
      'Fluctuating values'
    ],
    correctAnswer: 1,
    explanation: 'Gradually decreasing insulation resistance over successive tests indicates deterioration of cable insulation that may eventually require replacement.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-19',
    question: 'What fault would cause a low L-N insulation resistance but acceptable L-E and N-E readings?',
    options: [
      'Earth fault',
      'Line to neutral fault (short circuit)',
      'Open circuit',
      'High resistance joint'
    ],
    correctAnswer: 1,
    explanation: 'A low L-N reading with acceptable L-E and N-E indicates breakdown of insulation between line and neutral conductors, potentially caused by damage, moisture, or contamination.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-20',
    question: 'What is the effect of cable length on insulation resistance readings?',
    options: [
      'No effect',
      'Longer cables give lower readings',
      'Longer cables give higher readings',
      'Only affects very short cables'
    ],
    correctAnswer: 1,
    explanation: 'Longer cables have more insulation surface area, effectively creating parallel resistances, resulting in lower overall insulation resistance readings.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-21',
    question: 'How should SPDs (Surge Protection Devices) be handled during IR testing?',
    options: [
      'Leave connected',
      'Disconnect or bypass',
      'Connect additional SPDs',
      'Increase test voltage'
    ],
    correctAnswer: 1,
    explanation: 'SPDs should be disconnected before IR testing as they have low impedance paths to earth that will cause low readings and may be damaged by the test voltage.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-22',
    question: 'What test is done first - continuity or insulation resistance?',
    options: [
      'Insulation resistance first',
      'Continuity first',
      'Either order is acceptable',
      'Both simultaneously'
    ],
    correctAnswer: 1,
    explanation: 'Continuity testing is performed before insulation resistance testing in the sequence of initial verification tests to confirm circuit integrity.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.1'
  },
  {
    id: 'ir-23',
    question: 'What causes the "polarisation index" effect during IR testing?',
    options: [
      'Battery condition',
      'Absorption of charge by insulation over time',
      'Temperature changes',
      'Test lead resistance'
    ],
    correctAnswer: 1,
    explanation: 'The polarisation index is the ratio of IR after 10 minutes to 1 minute. Good insulation shows increasing resistance over time as dielectric absorption stabilises.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-24',
    question: 'What is the typical IR value that would prompt investigation even if above minimum?',
    options: [
      '500 MΩ',
      '50 MΩ',
      '2 MΩ',
      '5 MΩ or below on new installations'
    ],
    correctAnswer: 3,
    explanation: 'While 1 MΩ is the minimum, values below 2-5 MΩ on new installations warrant investigation as they may indicate issues that will worsen over time.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-25',
    question: 'How should main switches be positioned during insulation testing of the whole installation?',
    options: [
      'Open (OFF)',
      'Closed (ON)',
      'Removed completely',
      'Either position'
    ],
    correctAnswer: 1,
    explanation: 'Main switches should be closed (ON) but with the supply isolated, to include the main switch wiring and all downstream circuits in the test.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-26',
    question: 'What test voltage is required for circuits operating between 500V and 1000V?',
    options: [
      '250V DC',
      '500V DC',
      '1000V DC',
      '2500V DC'
    ],
    correctAnswer: 2,
    explanation: 'Circuits with nominal voltages above 500V up to and including 1000V require testing at 1000V DC for insulation resistance.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-27',
    question: 'What could cause a gradually decreasing insulation resistance reading while applying test voltage?',
    options: [
      'Good quality insulation',
      'Capacitive charging',
      'Contamination or moisture absorption',
      'Test lead resistance'
    ],
    correctAnswer: 2,
    explanation: 'A gradually decreasing reading during test can indicate contamination, moisture absorption, or degraded insulation that worsens under electrical stress.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-28',
    question: 'How does temperature affect insulation resistance readings?',
    options: [
      'No effect',
      'Higher temperature = higher resistance',
      'Higher temperature = lower resistance',
      'Only affects readings below 0°C'
    ],
    correctAnswer: 2,
    explanation: 'Insulation resistance decreases with increasing temperature. This should be considered when comparing readings taken under different conditions.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-29',
    question: 'What should be verified before IR testing on EV charging equipment?',
    options: [
      'Vehicle is charging',
      'Specific manufacturer guidance and disconnection of control electronics',
      'EVCP is energised',
      'Standard testing applies with no precautions'
    ],
    correctAnswer: 1,
    explanation: 'EV charging equipment contains sensitive electronics. Manufacturer guidance must be followed and control circuits may need disconnection before IR testing.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:722'
  },
  {
    id: 'ir-30',
    question: 'What minimum IR value applies to circuits supplied at ELV (Extra-Low Voltage)?',
    options: [
      '0.25 MΩ',
      '0.5 MΩ',
      '1.0 MΩ',
      '2.0 MΩ'
    ],
    correctAnswer: 1,
    explanation: 'Circuits at ELV (SELV and PELV up to 50V) have a minimum IR requirement of 0.5 MΩ when tested at 250V DC.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:Table 64.3'
  },
  {
    id: 'ir-31',
    question: 'When testing individual circuits, which conductors should be grouped together for testing to earth?',
    options: [
      'Earth and neutral',
      'Line conductors only',
      'All live conductors (line and neutral) connected together',
      'Each conductor separately'
    ],
    correctAnswer: 2,
    explanation: 'For efficiency, all live conductors (L and N) can be connected together and tested as a group against earth, then separated for L-N testing.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-32',
    question: 'What type of instrument should be used for insulation resistance testing?',
    options: [
      'Standard multimeter',
      'Insulation resistance tester (megger) with appropriate voltage outputs',
      'Clamp meter',
      'Earth loop tester'
    ],
    correctAnswer: 1,
    explanation: 'A dedicated insulation resistance tester capable of outputting the required test voltages (250V, 500V, or 1000V DC) must be used.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-33',
    question: 'What action is required if a three-phase motor is connected to the circuit being tested?',
    options: [
      'Test with motor connected',
      'Disconnect the motor or test the circuit up to the motor terminals',
      'Reduce test voltage',
      'Extend test duration'
    ],
    correctAnswer: 1,
    explanation: 'Motors should be disconnected or the test performed to the terminal connections, as motor windings may give misleading readings or be damaged by test voltage.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-34',
    question: 'Which components are particularly susceptible to damage from 500V DC testing?',
    options: [
      'Cable terminations',
      'Socket outlets',
      'Electronic controls, dimmers, PIR sensors, and semiconductor devices',
      'Junction boxes'
    ],
    correctAnswer: 2,
    explanation: 'Electronic components like dimmers, PIR sensors, emergency lighting controls, and any semiconductor devices can be damaged by the 500V test voltage.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-35',
    question: 'What does a reading of "infinity" (∞) on an IR tester indicate?',
    options: [
      'Faulty tester',
      'No measurable leakage - excellent insulation',
      'Short circuit',
      'Open circuit in line conductor'
    ],
    correctAnswer: 1,
    explanation: 'An infinity reading indicates the insulation resistance is beyond the measurement range of the instrument - this represents excellent insulation with no measurable leakage.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-36',
    question: 'Why should all lamps be removed from their holders before IR testing?',
    options: [
      'To prevent glare',
      'To avoid damage to lamps and false low readings',
      'To save energy',
      'Lamps have no effect on testing'
    ],
    correctAnswer: 1,
    explanation: 'Lamps provide a low resistance path and will cause false low readings. The test voltage may also damage some lamp types.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-37',
    question: 'How should a multifunction tester be connected for an IR test between L-E?',
    options: [
      'Red to earth, black to line',
      'Red to line conductor, black to earth/CPC',
      'Both leads to line',
      'Both leads to earth'
    ],
    correctAnswer: 1,
    explanation: 'For L-E testing, connect the red (positive) lead to the line conductor and black (negative) lead to the earth or CPC.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-38',
    question: 'What precaution applies when testing IR on circuits connected to IT equipment?',
    options: [
      'Use higher test voltage',
      'Disconnect IT equipment; risk of damage from test voltage',
      'No precaution needed',
      'Test with equipment powered on'
    ],
    correctAnswer: 1,
    explanation: 'IT equipment contains sensitive electronics that can be damaged by 500V DC test voltage. Disconnect all IT equipment before testing.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-39',
    question: 'What is indicated by inconsistent IR readings during testing?',
    options: [
      'Normal variation',
      'Possible intermittent fault or deteriorating insulation',
      'Excellent insulation',
      'Battery issues in tester'
    ],
    correctAnswer: 1,
    explanation: 'Inconsistent or varying readings can indicate an intermittent fault, moisture ingress, or insulation that is deteriorating and requires investigation.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-40',
    question: 'What is the purpose of testing between L and N (live conductors)?',
    options: [
      'To check for earth faults',
      'To detect short circuits or reduced insulation between live conductors',
      'To measure cable length',
      'To verify polarity'
    ],
    correctAnswer: 1,
    explanation: 'L-N testing detects insulation breakdown between line and neutral, which could cause short circuits when the circuit is energised.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-41',
    question: 'What could cause an IR reading that initially rises then falls during testing?',
    options: [
      'Perfect insulation',
      'Moisture in cable or contamination being heated by test current',
      'Correct test procedure',
      'New cable installation'
    ],
    correctAnswer: 1,
    explanation: 'Rising then falling readings can indicate moisture or contamination that initially polarises then breaks down under sustained voltage application.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-42',
    question: 'When is it acceptable to test multiple circuits together?',
    options: [
      'Never - always test individually',
      'When testing the entire installation with all breakers closed',
      'Only on new installations',
      'Only on single-phase supplies'
    ],
    correctAnswer: 1,
    explanation: 'Multiple circuits can be tested together when performing an overall installation test with main switch closed and all circuit breakers on. If low, individual circuits must then be tested.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-43',
    question: 'What documentation is required when recording IR test results?',
    options: [
      'Verbal report only',
      'Test voltage used, readings for all tests (L-E, N-E, L-N), and circuit reference',
      'Total value only',
      'Only failed circuits need recording'
    ],
    correctAnswer: 1,
    explanation: 'Full documentation includes: test voltage used, individual readings for each test configuration, circuit reference number, and any equipment disconnected.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:Part 6'
  },
  {
    id: 'ir-44',
    question: 'How should RCBOs be handled during IR testing?',
    options: [
      'Leave in circuit',
      'Set to ON but check they don\'t affect readings',
      'Test may damage some types - consult manufacturer',
      'Always remove'
    ],
    correctAnswer: 2,
    explanation: 'Some RCBOs contain electronic components that may be damaged by IR test voltage. Check manufacturer guidance and consider testing up to the RCBO terminals.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-45',
    question: 'What is the relationship between cable insulation class and minimum IR values?',
    options: [
      'No relationship',
      'Higher class always means higher IR required',
      'Minimum IR values apply regardless of insulation class',
      'Class determines test voltage only'
    ],
    correctAnswer: 2,
    explanation: 'The minimum IR values in BS 7671 apply regardless of cable insulation class. The test voltage is determined by the circuit voltage, not insulation class.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:Table 64.3'
  },
  {
    id: 'ir-46',
    question: 'What is the minimum IR reading typically expected for mineral-insulated cable?',
    options: [
      'Lower than PVC cables',
      '1 MΩ exactly',
      'Very high - often hundreds of MΩ or more',
      'Not testable'
    ],
    correctAnswer: 2,
    explanation: 'Mineral insulated cable typically shows very high IR values (hundreds of MΩ or higher) due to the excellent insulation properties of magnesium oxide.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-47',
    question: 'What indicates a cable may have water ingress?',
    options: [
      'Very high IR reading',
      'IR reading that drops significantly over time under test',
      'Stable reading at minimum value',
      'Reading that slowly increases'
    ],
    correctAnswer: 1,
    explanation: 'Water ingress typically causes IR readings to drop significantly during testing as the moisture provides a conductive path that worsens under voltage.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-48',
    question: 'Why might an older installation have lower (but acceptable) IR values than a new one?',
    options: [
      'Testing error',
      'Natural ageing and degradation of insulation materials',
      'Different test equipment',
      'Cable routing differences'
    ],
    correctAnswer: 1,
    explanation: 'Insulation materials naturally degrade over time due to heat cycling, UV exposure, and oxidation, resulting in lower but often still acceptable IR values.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  },
  {
    id: 'ir-49',
    question: 'What test should be performed after IR testing and before energising?',
    options: [
      'Nothing - ready to energise',
      'Polarity verification and any remaining tests (Zs, RCD)',
      'Only visual inspection',
      'Repeat continuity'
    ],
    correctAnswer: 1,
    explanation: 'After IR testing, polarity must be verified before energising. Then earth fault loop impedance and RCD tests can be performed on the live installation.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.1'
  },
  {
    id: 'ir-50',
    question: 'What is the typical sequence for fault-finding when overall IR is low?',
    options: [
      'Replace all cables immediately',
      'Progressively isolate circuits until faulty circuit identified',
      'Increase test voltage until acceptable reading achieved',
      'Record low reading and continue'
    ],
    correctAnswer: 1,
    explanation: 'Start with all circuits, then progressively isolate (switch off) circuits one at a time until the IR reading improves significantly, identifying the faulty circuit.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.3.2'
  }
];
