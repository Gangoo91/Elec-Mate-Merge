import { QuizQuestion } from '@/types/quiz';

export const mockExamQuestions: QuizQuestion[] = [
  // Regulatory Knowledge (BS7671)
  {
    id: 1,
    question: 'Which regulation in BS 7671 covers initial verification?',
    options: ['Regulation 521.8', 'Regulation 643.1', 'Regulation 411.3.3', 'Regulation 314.1'],
    correctAnswer: 1,
    explanation:
      'Regulation 643.1 specifically covers the requirements for initial verification of electrical installations.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 2,
    question:
      'Which regulation requires that circuits supplying portable outdoor equipment be RCD protected?',
    options: ['Regulation 314.1', 'Regulation 643.1', 'Regulation 411.3.3', 'Regulation 521.8'],
    correctAnswer: 2,
    explanation:
      'Regulation 411.3.3 mandates RCD protection for circuits supplying portable outdoor equipment.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 3,
    question: 'What is the minimum acceptable insulation resistance value for a 230V circuit?',
    options: ['0.5 MΩ', '5 MΩ', '2 MΩ', '1 MΩ'],
    correctAnswer: 3,
    explanation:
      'BS 7671 requires a minimum insulation resistance of 1 MΩ for circuits up to 500V.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 4,
    question: 'What is the acceptable maximum disconnection time for a 30mA RCD on a TT system?',
    options: ['300 milliseconds', '200 milliseconds', '40 milliseconds', '5 seconds'],
    correctAnswer: 0,
    explanation:
      'For TT systems, the maximum disconnection time for RCDs is 300 milliseconds at rated residual current.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 5,
    question:
      'According to BS 7671, what is the maximum earth fault loop impedance (Zs) for a 32A Type B MCB?',
    options: ['1.10Ω', '1.37Ω', '1.44Ω', '2.19Ω'],
    correctAnswer: 1,
    explanation:
      'Table 41.3 gives a maximum Zs of 1.37Ω for a 32A Type B MCB at 230V (includes the Cmin factor of 0.95). 1.44Ω is the old pre-Cmin figure; 1.10Ω is the cold-measured site limit after applying the 0.80 rule-of-thumb factor.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },

  // Testing Procedures
  {
    id: 6,
    question: 'What test must be completed before applying insulation resistance testing?',
    options: [
      'Earth fault loop impedance measurement',
      'RCD operating-time verification',
      'Continuity of protective conductors',
      'Prospective fault current measurement',
    ],
    correctAnswer: 2,
    explanation:
      'Continuity of protective conductors is a dead test carried out before insulation resistance; loop impedance, RCD and PFC tests are all live tests performed later in the sequence.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 7,
    question: 'List the correct order of tests during initial verification:',
    options: [
      'Polarity, Continuity, Insulation, RCD, Earth loop, Functional',
      'Insulation, Continuity, RCD, Polarity, Earth loop, Functional',
      'RCD, Earth loop, Continuity, Insulation, Polarity, Functional',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
    ],
    correctAnswer: 3,
    explanation:
      'The correct sequence ensures each test builds on the previous, starting with continuity verification.',
    category: 'Inspection & Testing',
  },
  {
    id: 8,
    question:
      'How does BS 7671:2018+A4:2026 require the effectiveness of a 30mA RCD to be verified?',
    options: [
      'A single AC test at IΔn, whatever the RCD type',
      'A test at 5x IΔn on both half-cycles',
      'Tests at ½x, 1x and 5x IΔn in sequence',
      'The integral test button alone',
    ],
    correctAnswer: 0,
    explanation:
      'Amendment 4 deleted Table 3A (time/current performance criteria for RCDs) from Appendix 3. Regulation 643.8 now calls for a single alternating current test at the rated residual operating current, IΔn, regardless of RCD type — AC, A, F or B. A general non-delay device must operate within 300ms. The 5x IΔn test still has a place in fault-finding, but it is no longer part of the required verification.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 9,
    question: 'What test instrument is used to measure earth fault loop impedance?',
    options: [
      'RCD tester',
      'Loop impedance tester',
      'Continuity tester',
      'Insulation resistance tester',
    ],
    correctAnswer: 1,
    explanation:
      'A loop impedance tester or multifunction tester is specifically designed for Zs measurements.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 10,
    question: 'How do you verify that a voltage indicator is functioning correctly?',
    options: [
      'Check the calibration certificate is in date',
      'Compare its reading against a second meter',
      'Use a proving unit before and after testing',
      'Confirm the battery indicator shows full charge',
    ],
    correctAnswer: 2,
    explanation:
      'A dedicated proving unit should be used to prove a voltage indicator immediately before and after testing, confirming it works on a known source (GS38).',
    difficulty: 'intermediate'
  },

  // Inspection Sequencing
  {
    id: 11,
    question: 'During visual inspection, what should be checked first?',
    options: ['Circuit protection', 'Earthing arrangements', 'Cable routing', 'General safety'],
    correctAnswer: 3,
    explanation: 'General safety assessment should be the first priority during any inspection.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 12,
    question: 'When should dead testing be performed?',
    options: [
      'After visual inspection but before live testing',
      'Only after the installation has been energised',
      'Before any visual inspection is carried out',
      'At the same time as functional testing',
    ],
    correctAnswer: 0,
    explanation:
      'Dead testing should follow visual inspection but precede any live testing for safety.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 13,
    question: 'What is the purpose of verifying polarity on final circuits?',
    options: [
      'To confirm the earth fault loop impedance is low enough',
      'To ensure switches and fuses are in the line conductor only',
      'To prove the insulation resistance meets the minimum value',
      'To measure the prospective fault current at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity verification ensures single-pole switches, fuses and protective devices are connected in the line conductor, not the neutral.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 14,
    question: 'During inspection, cables should be checked for:',
    options: [
      'Correct phase rotation at the terminals',
      'Compliance with the manufacturer batch number',
      'Damage, routing and support',
      'Insulation resistance above 2 MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'Visual inspection of cables checks for physical damage, correct routing and adequate support; insulation resistance is a separate dead test, not a visual check.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 15,
    question: 'When inspecting a consumer unit, what should be verified first?',
    options: [
      'The measured Zs of each final circuit',
      'The RCD trip times at 1x and 5x IΔn',
      'The continuity of every protective conductor',
      'IP rating and general condition',
    ],
    correctAnswer: 3,
    explanation:
      'Visual inspection of the enclosure (IP rating, signs of overheating, general condition) precedes the detailed dead and live testing of individual circuits.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },

  // Safe Isolation
  {
    id: 16,
    question: 'Why must dead tests be carried out with the installation isolated?',
    options: [
      'To prevent electric shock and equipment damage',
      'To allow the cables to cool to ambient temperature',
      'To reduce the prospective fault current at the board',
      'To ensure the RCD does not trip during the test',
    ],
    correctAnswer: 0,
    explanation:
      'Isolation prevents electric shock to personnel and protects test instruments, which apply their own test voltage, from damage by the supply.',
    category: 'Safe Isolation',
  },
  {
    id: 17,
    question: 'What is the correct sequence for safe isolation?',
    options: [
      'Test, Isolate, Prove dead, Lock off',
      'Isolate, Test, Prove dead, Lock off',
      'Prove dead, Isolate, Test, Lock off',
      'Isolate, Lock off, Test, Prove dead',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation requires: Isolate, Test dead, Prove tester working, then Lock off if required.',
    category: 'Safe Isolation',
    difficulty: 'advanced'
  },
  {
    id: 18,
    question: 'When proving dead, the voltage indicator should be tested:',
    options: ['Once before use', 'Only if faulty', 'Before and after use', 'Once after use'],
    correctAnswer: 2,
    explanation: 'Voltage indicators must be proven on a known live source before and after use.',
    category: 'Safe Isolation',
    difficulty: 'basic'
  },
  {
    id: 19,
    question: 'What PPE is essential when carrying out live electrical testing?',
    options: [
      'A hard hat and steel toe-cap boots',
      'Hi-vis vest and ear defenders',
      'A dust mask and knee pads',
      'Safety glasses and insulated gloves',
    ],
    correctAnswer: 3,
    explanation:
      'Safety glasses and insulated gloves protect against arc flash and contact during live work; the other items address unrelated hazards.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 20,
    question: 'Before commencing work, what must be established about the installation?',
    options: [
      'Supply characteristics and earthing system',
      'The exact age of every cable installed',
      'The original installer of the consumer unit',
      'The energy supplier and tariff in use',
    ],
    correctAnswer: 0,
    explanation:
      'Knowing the supply characteristics (Uo, frequency) and earthing arrangement (TN-S, TN-C-S, TT) is fundamental to designing protection and working safely.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },

  // Fault Recognition
  {
    id: 21,
    question: 'What does a high Zs reading typically indicate?',
    options: [
      'Excessive prospective fault current',
      'High resistance in the earth fault path',
      'A neutral-to-earth fault on the circuit',
      'An oversized protective conductor',
    ],
    correctAnswer: 1,
    explanation:
      'A high Zs indicates high resistance in the earth fault loop, often from loose connections or an undersized/poorly connected CPC, which may prevent timely disconnection.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 22,
    question: 'What might cause insulation resistance values to read abnormally low?',
    options: [
      'Using too high a test voltage',
      'A protective conductor of large cross-section',
      'Damp conditions or connected loads not removed',
      'Testing a very short cable run',
    ],
    correctAnswer: 2,
    explanation:
      'Low insulation resistance commonly results from moisture, connected equipment giving a parallel path, or genuine insulation breakdown.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 23,
    question: 'During RCD testing, what would indicate a faulty RCD?',
    options: [
      'Trips within required time',
      'Trips at rated current',
      'Reset button functions',
      'Fails to trip at test current',
    ],
    correctAnswer: 3,
    explanation:
      'An RCD that fails to trip when test current is applied indicates a faulty device.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 24,
    question: 'When testing a ring final circuit, what indicates a break in the ring?',
    options: [
      'Infinite resistance reading',
      'All readings are identical',
      'Low resistance readings',
      'Normal continuity',
    ],
    correctAnswer: 0,
    explanation: 'An infinite resistance reading indicates an open circuit or break in the ring.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 25,
    question: 'You discover a protective conductor is not continuous. What action should you take?',
    options: [
      'Increase the protective device rating to compensate',
      'Record the defect and inform the responsible person',
      'Continue testing and note it on the next inspection',
      'Replace the conductor with a larger line conductor',
    ],
    correctAnswer: 1,
    explanation:
      'A discontinuous protective conductor is potentially dangerous; it must be recorded as a defect and the responsible person informed so it can be remedied.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },

  // Certificate Completion
  {
    id: 26,
    question: 'What certificate is required after a new consumer unit is installed?',
    options: [
      'Minor Electrical Installation Works Certificate',
      'Electrical Installation Condition Report (EICR)',
      'Electrical Installation Certificate (EIC)',
      'PAT testing certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Replacing a consumer unit is new work requiring an EIC; a MEIWC covers only minor additions/alterations not involving a new circuit, and an EICR assesses existing installations.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 27,
    question: 'What is the difference between an EIC and a MEIWC?',
    options: [
      'An EIC is for domestic work, a MEIWC for commercial',
      'An EIC is issued annually, a MEIWC only once',
      'An EIC needs no testing, a MEIWC requires full testing',
      'An EIC is for new work, a MEIWC for minor alterations',
    ],
    correctAnswer: 3,
    explanation:
      'An EIC covers new installations and additions of new circuits; a MEIWC covers minor alterations such as adding a socket to an existing circuit.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 28,
    question: 'Who is responsible for signing the inspection and testing section of an EIC?',
    options: [
      'The person who carried out the inspection and testing',
      'The client who ordered the work',
      'The building control body',
      'The distribution network operator',
    ],
    correctAnswer: 0,
    explanation:
      'The person who actually performed the inspection and testing must sign that section, confirming the results are their own.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 29,
    question:
      "What information is required in the 'extent of installation covered' section of an EICR?",
    options: [
      'The estimated value of the installation',
      'The specific areas and circuits inspected and tested',
      'The names of all previous occupiers',
      'The original date of installation only',
    ],
    correctAnswer: 1,
    explanation:
      'The extent section must specify exactly which areas and circuits were included in the inspection, so the report scope is unambiguous.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 30,
    question: 'In what circumstances should a Limitation be recorded on a certificate?',
    options: [
      'When the installation is fully accessible and tested',
      'When all test results are within acceptable limits',
      'When areas could not be accessed as agreed with the client',
      'When the client requests a discount on the work',
    ],
    correctAnswer: 2,
    explanation:
      'Limitations are recorded when agreed restrictions, such as inaccessible areas or occupied premises, prevent full inspection or testing.',
    category: 'Certification & Reporting',
    difficulty: 'basic'
  },

  // Observation Coding
  {
    id: 31,
    question: 'What coding would you give for no RCD protection on a socket in a domestic kitchen?',
    options: ['C1', 'FI', 'C3', 'C2'],
    correctAnswer: 3,
    explanation:
      'Missing RCD protection in a kitchen is potentially dangerous, warranting a C2 code.',
    difficulty: 'advanced'
  },
  {
    id: 32,
    question: "What does the observation code 'FI' mean?",
    options: [
      'Further Investigation required',
      'Fault Indicated on the supply',
      'Fully Insulated equipment',
      'Final Inspection completed',
    ],
    correctAnswer: 0,
    explanation:
      'FI indicates that Further Investigation is required without delay to determine the full extent of a potential safety issue.',
    category: 'Certification & Reporting',
    difficulty: 'basic'
  },
  {
    id: 33,
    question: 'During an EICR, you find a lighting circuit with no CPC. What code is applied?',
    options: ['C1', 'C2', 'C3', 'No code required'],
    correctAnswer: 1,
    explanation: 'A missing circuit protective conductor poses a potentially dangerous situation.',
    category: 'Certification & Reporting',
    difficulty: 'advanced'
  },
  {
    id: 34,
    question: 'What would warrant a C1 classification?',
    options: [
      'An improvement that is recommended but not essential',
      'A defect that is potentially dangerous over time',
      'Danger present - immediate action required',
      'A non-compliance with no safety implication',
    ],
    correctAnswer: 2,
    explanation:
      'C1 means danger is present and immediate remedial action is required; C2 is potentially dangerous and C3 is improvement recommended.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 35,
    question: 'A C3 observation indicates:',
    options: [
      'Immediate danger',
      'Potentially dangerous',
      'Satisfactory',
      'Improvement recommended',
    ],
    correctAnswer: 3,
    explanation:
      'C3 observations are for improvements recommended to enhance safety or compliance.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },

  // Additional Questions - Testing Procedures
  {
    id: 36,
    question: 'What is the test voltage for insulation resistance testing on SELV circuits?',
    options: ['250V DC', '500V DC', '1000V DC', '1500V DC'],
    correctAnswer: 0,
    explanation:
      'SELV circuits should be tested at 250V DC to avoid damage to low voltage equipment.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 37,
    question:
      'An instrument used for protective conductor continuity testing should be capable of delivering a short-circuit current of at least:',
    options: ['10mA', '200mA', '1A', '25mA'],
    correctAnswer: 1,
    explanation:
      'A low-resistance instrument should have a no-load voltage between 4V and 24V and a short-circuit current capability of not less than 200mA. That drive current is what makes a low-resistance reading reliable — it is the instrument capability, not a value you set.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 38,
    question: "Define the term 'Zs' and explain its significance:",
    options: [
      'Source impedance - determines voltage regulation',
      'Supply impedance - affects power factor',
      'Total earth fault loop impedance - ensures disconnection times',
      'Short circuit impedance - limits fault current',
    ],
    correctAnswer: 2,
    explanation:
      'Zs is the total earth fault loop impedance, critical for ensuring protective device operates within required time.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 39,
    question: "What does 'PFC' stand for and why is it measured?",
    options: [
      'Power Factor Correction - improves efficiency',
      'Protective Function Check - verifies safety',
      'Primary Feed Circuit - identifies supply',
      'Prospective Fault Current - confirms equipment rating',
    ],
    correctAnswer: 3,
    explanation:
      'PFC is Prospective Fault Current, measured to ensure equipment can safely interrupt fault currents.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 40,
    question: 'How is a ring final circuit tested for continuity?',
    options: [
      'Measure each leg end-to-end, then cross-connect and test',
      'Apply 500V DC between line and the protective conductor',
      'Measure the loop impedance at the furthest socket only',
      'Inject 1.5x the device rating and time the disconnection',
    ],
    correctAnswer: 0,
    explanation:
      'Each conductor leg (r1, rn, r2) is measured end-to-end, then line and CPC are cross-connected so every socket reads about (r1+r2)/4, confirming ring integrity and revealing spurs.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },

  // Advanced Regulatory Knowledge
  {
    id: 41,
    question: 'According to BS 7671, what is the maximum Zs for a 20A Type B MCB?',
    options: ['1.75Ω', '2.19Ω', '2.30Ω', '1.37Ω'],
    correctAnswer: 1,
    explanation:
      'Table 41.3 gives a maximum Zs of 2.19Ω for a 20A Type B MCB at 230V (includes the Cmin factor of 0.95). 2.30Ω is the old pre-Cmin figure.',
    difficulty: 'advanced'
  },
  {
    id: 42,
    question: 'RCD protection is required for all socket outlets up to what rating?',
    options: ['13A', '32A', '20A', '16A'],
    correctAnswer: 1,
    explanation:
      'Regulation 411.3.3 (BS 7671:2018+A4) requires additional RCD protection (≤30mA) for socket-outlets with a rated current not exceeding 32A; for dwellings there is no risk-assessment exemption.',
    category: 'Protection & Devices',
    difficulty: 'basic'
  },
  {
    id: 43,
    question:
      'The minimum cross-sectional area for a main earthing conductor in a domestic installation is:',
    options: ['4mm²', '6mm²', '16mm²', '10mm²'],
    correctAnswer: 3,
    explanation:
      'The minimum size for a main earthing conductor is typically 10mm² for domestic installations.',
    category: 'Earthing & Bonding',
    difficulty: 'advanced'
  },
  {
    id: 44,
    question: 'What is the required IP rating for equipment in bathroom Zone 1?',
    options: ['IPX4', 'IPX6', 'IPX5', 'IPX7'],
    correctAnswer: 0,
    explanation: 'Equipment in bathroom Zone 1 requires a minimum IP rating of IPX4.',
    category: 'Special Locations',
    difficulty: 'intermediate'
  },
  {
    id: 45,
    question: 'Supplementary bonding may be omitted in bathrooms if:',
    options: [
      'Metal parts are painted',
      'All circuits have RCD protection',
      'Only plastic fittings are used',
      'The bathroom is small',
    ],
    correctAnswer: 1,
    explanation:
      'Supplementary bonding may be omitted if all circuits in the location have RCD protection.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },

  // Testing Equipment and Calibration
  {
    id: 46,
    question: 'How often should test instruments be calibrated?',
    options: ['Every 6 months', 'Every 2 years', 'Annually', 'Monthly'],
    correctAnswer: 2,
    explanation: 'Test instruments should typically be calibrated annually to maintain accuracy.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 47,
    question: 'Before using a multimeter for voltage testing, you should:',
    options: [
      'Check battery level only',
      'Check the fuse rating',
      'Clean the probes',
      'Test on a known live source',
    ],
    correctAnswer: 3,
    explanation:
      'Always prove the meter works on a known live source before relying on a dead reading.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 48,
    question: 'The accuracy class required for earth fault loop impedance testers is:',
    options: ['Class 2', 'Class 1', 'Class 3', 'Class 4'],
    correctAnswer: 0,
    explanation: 'Earth fault loop impedance testers should be accuracy Class 2 or better.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 49,
    question: 'When measuring insulation resistance, connected equipment should be:',
    options: [
      'Left switched on to load the circuit',
      'Disconnected where practicable',
      'Tested at the same time at 1000V DC',
      'Earthed to the consumer unit',
    ],
    correctAnswer: 1,
    explanation: 'Connected equipment should be disconnected where practicable, as parallel paths through it can give misleadingly low readings or be damaged by the test voltage.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 50,
    question: 'What test current is used for RCD testing at normal tripping current?',
    options: ['15mA', '30mA', '100% of IΔn', '50% of IΔn'],
    correctAnswer: 2,
    explanation:
      'RCD testing at normal tripping current uses 100% of the rated residual current (IΔn).',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },

  // Documentation and Records
  {
    id: 51,
    question: 'What are the consequences of failing to document test results?',
    options: [
      'Faster completion with no real drawbacks',
      'Reduced calibration intervals for instruments',
      'Lower prospective fault current at the board',
      'Legal liability and non-compliance',
    ],
    correctAnswer: 3,
    explanation:
      'Failure to document results can lead to legal liability, regulatory non-compliance and rejection of the work, since the certificate is the formal record of safety.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 52,
    question: 'How long should electrical certificates be retained?',
    options: ['Life of installation', '5 years', '1 year', '10 years'],
    correctAnswer: 0,
    explanation: 'Electrical certificates should be retained for the life of the installation.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 53,
    question: 'Who should receive copies of the Electrical Installation Certificate?',
    options: [
      'Only the electrician who carried out the work',
      'The person ordering the work and relevant authorities',
      'The distribution network operator only',
      'The manufacturer of the consumer unit',
    ],
    correctAnswer: 1,
    explanation: 'A copy must be given to the person ordering the work, with notification to building control or the competent person scheme as relevant authorities.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 54,
    question: 'Schedule of Test Results should include:',
    options: [
      'Pass/fail only',
      'Estimated values',
      'Actual measured values',
      'Visual observations only',
    ],
    correctAnswer: 2,
    explanation: 'Schedules must include actual measured values, not just pass/fail indications.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 55,
    question: 'What information must be included on an EICR front page?',
    options: [
      'The cost breakdown of any remedial works',
      'The calibration dates of all test instruments',
      'A full schedule of every cable length measured',
      'Overall assessment and recommendations',
    ],
    correctAnswer: 3,
    explanation:
      'The EICR front page must state the overall assessment (satisfactory/unsatisfactory) and the recommended date or interval for the next inspection.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },

  // Specific Testing Scenarios
  {
    id: 56,
    question: 'When testing a two-way lighting circuit, what should be verified?',
    options: [
      'Correct operation from both switch positions',
      'That the line and neutral are interchangeable',
      'That both switches share a single strapper wire',
      'That the lamp stays on regardless of switch state',
    ],
    correctAnswer: 0,
    explanation:
      'A two-way circuit must switch the lamp correctly from either switch position, confirming the strappers and common connections are wired correctly.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 57,
    question: 'For testing solar PV installations, special consideration must be given to:',
    options: [
      'The absence of any earth connection on the DC side',
      'DC isolation and continued generation in daylight',
      'The need to test only at night for accuracy',
      'Phase rotation on the single-phase output',
    ],
    correctAnswer: 1,
    explanation:
      'PV arrays generate DC whenever there is light, so DC isolation procedures and awareness that the array cannot be made fully dead in daylight are essential.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 58,
    question: 'When testing an IT system, what additional test is required?',
    options: [
      'A second earth electrode resistance measurement',
      'A higher insulation resistance test voltage of 1000V',
      'Insulation monitoring device functional verification',
      'A repeat of the ring final continuity test',
    ],
    correctAnswer: 2,
    explanation:
      'In an IT system the first fault does not cause disconnection, so the insulation monitoring device that signals that first fault must be verified.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 59,
    question: 'What is the purpose of functional testing?',
    options: [
      'To measure the insulation resistance of each circuit',
      'To record the prospective fault current at the origin',
      'To confirm the earth fault loop impedance is low enough',
      'To verify operation of switches, isolators and controls',
    ],
    correctAnswer: 3,
    explanation:
      'Functional testing confirms that switchgear, isolators, controls and interlocks operate correctly and as intended in service.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 60,
    question: 'Emergency lighting systems should be tested:',
    options: [
      'By simulating mains failure to verify operation',
      'Only with the normal supply fully energised',
      'At 500V DC insulation resistance only',
      'By measuring phase rotation at the luminaire',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting must be tested by simulating loss of the normal supply, confirming the luminaires illuminate and run for their rated duration (BS 5266).',
    category: 'Design & Selection',
    difficulty: 'intermediate'
  },

  // Advanced Fault Finding
  {
    id: 61,
    question:
      "A socket outlet shows correct voltage but appliances won't work. The most likely cause is:",
    options: [
      'High earth loop impedance',
      'Open circuit neutral',
      'Low insulation resistance',
      'Correct wiring',
    ],
    correctAnswer: 1,
    explanation:
      'An open circuit neutral can show correct line to earth voltage but prevent appliance operation.',
  },
  {
    id: 62,
    question: 'Intermittent RCD tripping could indicate:',
    options: [
      'Correct operation',
      'High earth loop impedance',
      'Earth leakage or N-E fault',
      'Low insulation resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Intermittent RCD operation often indicates earth leakage or neutral-earth faults developing.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 63,
    question: 'What could cause low insulation resistance between live conductors?',
    options: [
      'An oversized circuit protective conductor',
      'A test voltage that is set too high',
      'A loose earth connection at the consumer unit',
      'Moisture ingress or cable damage',
    ],
    correctAnswer: 3,
    explanation:
      'Low insulation resistance between line and neutral typically results from moisture ingress, physical cable damage or deteriorated insulation.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 64,
    question: 'A lighting circuit with high Zs readings might have:',
    options: [
      'Loose or missing CPC connections',
      'An oversized protective device',
      'Too low a prospective fault current',
      'Excessive insulation resistance',
    ],
    correctAnswer: 0,
    explanation: 'High Zs on a lighting circuit often indicates loose, broken or missing CPC connections increasing the earth fault loop resistance.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 65,
    question: 'What indicates a spur on a ring final circuit during testing?',
    options: [
      'Identical readings at every socket on the ring',
      'One socket with a higher resistance reading',
      'An infinite reading at the consumer unit',
      'A zero reading between line and neutral',
    ],
    correctAnswer: 1,
    explanation: 'Sockets on the ring read approximately equal; a spur shows a noticeably higher reading because of the extra non-ring cable length to it.',
    category: 'Cables & Containment',
    difficulty: 'intermediate'
  },

  // Additional Regulatory and Safety
  {
    id: 66,
    question: 'The purpose of main protective bonding is to:',
    options: [
      'Limit the prospective fault current at the origin',
      'Provide a return path for normal load current',
      'Connect extraneous-conductive-parts to the main earth terminal',
      'Reduce the insulation resistance of the installation',
    ],
    correctAnswer: 2,
    explanation:
      'Main protective bonding connects extraneous-conductive-parts (water, gas, structural metalwork) to the main earthing terminal, limiting touch voltages during a fault.',
    category: 'Earthing & Bonding',
    difficulty: 'advanced'
  },
  {
    id: 67,
    question: 'An RCBO provides protection against:',
    options: [
      'Earth leakage only, like a standalone RCD',
      'Overcurrent only, like a standalone MCB',
      'Transient overvoltages, like an SPD',
      'Both overcurrent and earth leakage',
    ],
    correctAnswer: 3,
    explanation:
      'An RCBO combines the functions of an MCB (overload and short-circuit protection) and an RCD (residual/earth leakage protection) in a single device.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 68,
    question: 'The maximum length of 2.5mm² cable for a 32A ring final circuit is approximately:',
    options: ['100 metres', '70 metres', '50 metres', '120 metres'],
    correctAnswer: 0,
    explanation:
      'A 32A ring final in 2.5mm² cable should not exceed approximately 100 metres total cable length.',
    category: 'Cables & Containment',
    difficulty: 'intermediate'
  },
  {
    id: 69,
    question: 'Type B MCBs are designed to trip between:',
    options: ['1-2 times In', '3-5 times In', '5-10 times In', '10-20 times In'],
    correctAnswer: 1,
    explanation:
      'Type B MCBs are designed to trip magnetically between 3-5 times their rated current.',
    difficulty: 'advanced'
  },
  {
    id: 70,
    question: 'What is meant by prospective short circuit current?',
    options: [
      'The normal full-load current of the circuit',
      'The leakage current that operates the RCD',
      'Maximum current between live conductors during a fault',
      'The current measured during functional testing',
    ],
    correctAnswer: 2,
    explanation:
      'PSCC is the maximum current that would flow during a short circuit between live conductors, and determines the breaking capacity required of protective devices.',
    difficulty: 'intermediate'
  },

  // Final 30 Questions - Mixed Topics
  {
    id: 71,
    question:
      'For a circuit other than lighting, voltage drop should not exceed what percentage of nominal voltage?',
    options: ['3%', '15%', '10%', '5%'],
    correctAnswer: 3,
    explanation:
      'The recommended limits are 3% for lighting circuits and 5% for other uses (for an installation supplied directly from a public distribution network).',
    category: 'Cables & Containment',
    difficulty: 'intermediate'
  },
  {
    id: 72,
    question: 'What type of earthing system has the supply transformer star point earthed?',
    options: ['TN system', 'TT system', 'IT system', 'All systems'],
    correctAnswer: 0,
    explanation: 'TN systems have the supply transformer star point directly earthed.',
    category: 'Earthing & Bonding',
    difficulty: 'advanced'
  },
  {
    id: 73,
    question: 'The minimum approach distance to overhead lines up to 33kV is:',
    options: ['3 metres', '6 metres', '5 metres', '9 metres'],
    correctAnswer: 1,
    explanation: 'The minimum approach distance to overhead lines up to 33kV is 6 metres.',
    category: 'Safe Isolation',
    difficulty: 'advanced'
  },
  {
    id: 74,
    question: 'What protection is required for cables concealed in walls at depths less than 50mm?',
    options: [
      'At the origin of the installation',
      'Additional consideration for backup power sources',
      'RCD protection or mechanical protection',
      'Completely disconnect supply for maintenance',
    ],
    correctAnswer: 2,
    explanation:
      'Cables less than 50mm deep in walls require RCD protection or additional mechanical protection.',
    difficulty: 'intermediate'
  },
  {
    id: 75,
    question: 'The colour of the neutral conductor in flexible cords should be:',
    options: ['Green/Yellow', 'Black', 'Brown', 'Blue'],
    correctAnswer: 3,
    explanation: 'The neutral conductor in flexible cords should be blue.',
    difficulty: 'intermediate'
  },
  {
    id: 76,
    question:
      "What is the maximum rating for a plug and socket to be considered 'portable equipment'?",
    options: ['16A', '13A', '10A', '20A'],
    correctAnswer: 0,
    explanation: 'Portable equipment is typically limited to 16A maximum rating.',
    difficulty: 'advanced'
  },
  {
    id: 77,
    question: 'Fire barriers in cable routes should be provided at intervals not exceeding:',
    options: ['3m', '5m', '10m', '20m'],
    correctAnswer: 1,
    explanation:
      'Fire barriers should be provided at intervals not exceeding 5 metres in cable routes.',
    category: 'Cables & Containment',
    difficulty: 'advanced'
  },
  {
    id: 78,
    question: 'The purpose of SELV is to:',
    options: [
      'Increase fault current for faster disconnection',
      'Provide a functional earth for sensitive equipment',
      'Limit voltage to a safe level (≤50V AC)',
      'Allow circuits to operate without any protective device',
    ],
    correctAnswer: 2,
    explanation:
      'SELV (Separated Extra-Low Voltage) limits the voltage to a level considered safe for contact (≤50V AC), using electrical separation from earth and from higher voltages.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 79,
    question: 'What test is used to check polarity at a light switch?',
    options: [
      'Insulation resistance test at 500V DC',
      'Earth fault loop impedance measurement',
      'RCD trip-time test at 5x rated current',
      'Continuity testing through the switch to the lamp',
    ],
    correctAnswer: 3,
    explanation:
      'Polarity at a switch is verified by continuity testing, confirming the switch is connected in the line conductor and not the neutral.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 80,
    question: 'The touch voltage in accessible areas should not exceed:',
    options: ['50V', '25V', '110V', '230V'],
    correctAnswer: 0,
    explanation: 'Touch voltage should generally not exceed 50V in dry conditions for safety.',
    category: 'Design & Selection',
    difficulty: 'intermediate'
  },
  {
    id: 81,
    question: 'Class II equipment is characterized by:',
    options: [
      'An earth connection to its metal casing',
      'Double or reinforced insulation',
      'A dedicated earth electrode',
      'Reliance on supplementary bonding',
    ],
    correctAnswer: 1,
    explanation:
      'Class II equipment has double or reinforced insulation and no accessible earthed parts.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },
  {
    id: 82,
    question: 'Continuity of a ring final circuit is tested using:',
    options: [
      'A loop impedance tester on the live supply',
      'A 500V DC insulation resistance tester',
      'A low-resistance ohmmeter (≥200mA, ≤24V)',
      'An RCD tester at the rated residual current',
    ],
    correctAnswer: 2,
    explanation:
      'Continuity tests use a low-resistance ohmmeter delivering at least 200mA at no more than 24V open-circuit, with the circuit dead.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 83,
    question: 'What additional protection is generally required for socket outlets rated up to 32A?',
    options: [
      'Arc fault detection on every circuit',
      'Surge protection at each outlet',
      'Supplementary equipotential bonding',
      'RCD protection not exceeding 30mA',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 411.3.3 requires additional protection by a 30mA RCD for socket-outlets rated up to 32A unless a documented exception applies.',
  },
  {
    id: 84,
    question: 'The maximum operating temperature for PVC insulated cables is:',
    options: ['70°C', '85°C', '90°C', '60°C'],
    correctAnswer: 0,
    explanation: 'Standard PVC insulated cables have a maximum operating temperature of 70°C.',
    difficulty: 'advanced'
  },
  {
    id: 85,
    question: 'What is the purpose of applying diversity in electrical design?',
    options: [
      'To ensure every circuit is rated for full load at once',
      'To account for not all loads operating simultaneously',
      'To increase the prospective fault current for fast tripping',
      'To provide a second independent supply to the installation',
    ],
    correctAnswer: 1,
    explanation:
      'Diversity recognises that not all connected loads operate at full demand simultaneously, allowing economic sizing of the supply and main cables.',
    category: 'Design & Selection',
    difficulty: 'intermediate'
  },
  {
    id: 86,
    question: 'The minimum IP rating for equipment in outdoor locations is:',
    options: ['IP54', 'IP55', 'IP65', 'IP67'],
    correctAnswer: 2,
    explanation:
      'Outdoor equipment typically requires a minimum IP rating of IP65 for weather protection.',
    difficulty: 'advanced'
  },
  {
    id: 87,
    question: 'What type of cable should be used for an underground installation?',
    options: [
      'Standard flat twin-and-earth PVC cable',
      'Single-insulated tri-rated panel wire',
      'Unsheathed mineral-insulated conductors',
      'Armoured cable or cable in suitable conduit',
    ],
    correctAnswer: 3,
    explanation:
      'Underground runs need mechanical protection against penetration and ground movement, met by SWA armoured cable or cable drawn into suitable buried conduit/ducting.',
    category: 'Cables & Containment',
    difficulty: 'intermediate'
  },
  {
    id: 88,
    question: 'The purpose of an equipotential bonding system is to:',
    options: [
      'Ensure simultaneously accessible metalwork is at the same potential',
      'Carry the normal load current back to the supply',
      'Reduce the prospective fault current at the origin',
      'Raise the insulation resistance of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Equipotential bonding keeps simultaneously accessible conductive parts at substantially the same potential, preventing a dangerous voltage difference during a fault.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },
  {
    id: 89,
    question: 'What happens to the current-carrying capacity of cables when grouped together?',
    options: [
      'It is unaffected by grouping',
      'It decreases due to mutual heating effects',
      'It increases because heat is shared',
      'It must be doubled to allow for grouping',
    ],
    correctAnswer: 1,
    explanation:
      'Grouped cables cannot dissipate heat as freely, so a grouping rating factor (Cg) is applied to reduce their current-carrying capacity.',
    category: 'Cables & Containment',
    difficulty: 'advanced'
  },
  {
    id: 90,
    question: 'Discrimination (selectivity) between protective devices means:',
    options: [
      'All upstream and downstream devices trip together',
      'Only the device nearest the fault operates',
      'The main switch always trips first',
      'No device operates until the fault clears itself',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination ensures only the protective device immediately upstream of a fault operates, leaving the rest of the installation supplied.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 91,
    question:
      'What is the maximum earth fault loop impedance for a lighting circuit protected by a 6A Type B MCB?',
    options: ['15.3Ω', '7.67Ω', '11.5Ω', '7.28Ω'],
    correctAnswer: 3,
    explanation:
      'Table 41.3 gives a maximum Zs of 7.28Ω for a 6A Type B MCB at 230V (includes the Cmin factor of 0.95). 7.67Ω is the old pre-Cmin figure.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 92,
    question: 'In a PME (TN-C-S) supply, the installation earth is derived from:',
    options: [
      'The combined neutral and earth (PEN) conductor',
      'A local earth electrode at the installation',
      'A separate earth conductor run by the DNO',
      'The metallic water service pipe',
    ],
    correctAnswer: 0,
    explanation:
      'With PME the earthing terminal is connected to the supply PEN conductor, giving a low earth fault loop impedance; the trade-off is the open-PEN hazard.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },
  {
    id: 93,
    question: 'What should be done if an RCBO repeatedly trips?',
    options: [
      'Fit a higher-rated RCBO to stop the tripping',
      'Investigate the cause before resetting',
      'Bridge out the residual-current element',
      'Reset it several times until it holds in',
    ],
    correctAnswer: 1,
    explanation:
      'Repeated tripping indicates a genuine fault or excessive leakage that must be found and corrected; uprating or bypassing the device is dangerous.',
    category: 'Protection & Devices',
    difficulty: 'basic'
  },
  {
    id: 94,
    question:
      'The minimum cross-sectional area for protective conductors up to 16mm² line conductors is:',
    options: [
      '1.5mm² minimum',
      'Half the line conductor',
      'Same as line conductor',
      '2.5mm² minimum',
    ],
    correctAnswer: 2,
    explanation:
      'For line conductors up to 16mm², the protective conductor should be the same size.',
    difficulty: 'advanced'
  },
  {
    id: 95,
    question: 'What type of RCD should be used where there are electronic loads?',
    options: ['AC type', 'Any type', 'B type', 'A type'],
    correctAnswer: 3,
    explanation:
      'Type A RCDs should be used where electronic loads may produce DC components in earth fault current.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 96,
    question: 'The purpose of an isolation device is to:',
    options: [
      'Completely cut off the supply for safe maintenance',
      'Limit the fault current to a safe level',
      'Switch the circuit on and off in normal use',
      'Detect earth leakage and trip automatically',
    ],
    correctAnswer: 0,
    explanation:
      'An isolator provides secure disconnection of the supply to allow safe working; it is not designed for routine on-load switching.',
    category: 'Safe Isolation',
    difficulty: 'intermediate'
  },
  {
    id: 97,
    question: 'What is the maximum length of a 1.5mm² lighting circuit protected by a B10 MCB?',
    options: ['73m', '37m', '22m', '55m'],
    correctAnswer: 1,
    explanation:
      'A 1.5mm² lighting circuit with B10 MCB has a maximum length of approximately 37 metres.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 98,
    question: 'The frequency of supply in the UK is:',
    options: ['40Hz', '60Hz', '50Hz', '100Hz'],
    correctAnswer: 2,
    explanation: 'The UK mains supply frequency is 50Hz.',
    difficulty: 'intermediate'
  },
  {
    id: 99,
    question: 'What does an IP2X rating indicate?',
    options: [
      'Protection against low-pressure water jets',
      'Protection against total immersion in water',
      'Protection against dust ingress only',
      'Protection against finger contact',
    ],
    correctAnswer: 3,
    explanation:
      'The first characteristic numeral 2 means protection against solid objects ≥12.5mm, i.e. finger contact with hazardous live parts.',
    category: 'Design & Selection',
    difficulty: 'advanced'
  },
  {
    id: 100,
    question: 'The maximum current rating for domestic ring final circuits is:',
    options: ['32A', '25A', '30A', '20A'],
    correctAnswer: 0,
    explanation: 'Domestic ring final circuits are typically protected by 32A protective devices.',
    category: 'Cables & Containment',
    difficulty: 'intermediate'
  },

  // Advanced Regulatory Knowledge (Questions 101-115)
  {
    id: 101,
    question:
      'According to BS 7671, what is the maximum disconnection time for a TN system final circuit not exceeding 32A?',
    options: ['0.2 seconds', '0.4 seconds', '5 seconds', '1 second'],
    correctAnswer: 1,
    explanation:
      'For TN systems, final circuits not exceeding 32A must disconnect within 0.4 seconds according to Table 41.1 of BS 7671.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 102,
    question:
      'Which regulation in BS 7671 covers the selection and installation of devices for protection against electric shock?',
    options: ['Part 5', 'Part 7', 'Part 4', 'Part 6'],
    correctAnswer: 2,
    explanation:
      'Part 4 of BS 7671 covers protection for safety, including devices for protection against electric shock.',
    difficulty: 'intermediate'
  },
  {
    id: 103,
    question:
      'Under the CDM Regulations 2015, who must ensure electrical installation designs are coordinated?',
    options: ['Client', 'Principal contractor', 'CDM coordinator', 'Principal designer'],
    correctAnswer: 3,
    explanation:
      'The principal designer has the duty to coordinate design work and ensure designs are properly integrated under CDM 2015.',
    difficulty: 'advanced'
  },
  {
    id: 104,
    question: 'Building Regulations Part P notification is NOT required for:',
    options: [
      'Like-for-like accessory replacement',
      'Consumer unit replacement',
      'New circuit installation',
      'Bathroom electrical work',
    ],
    correctAnswer: 0,
    explanation:
      'Like-for-like replacement of accessories does not require Building Control notification under Part P.',
    difficulty: 'intermediate'
  },
  {
    id: 105,
    question: 'What is the minimum earth electrode resistance for a TT system?',
    options: ['200Ω', 'No specific requirement', '100Ω', '20Ω'],
    correctAnswer: 1,
    explanation:
      'BS 7671 does not specify a minimum earth electrode resistance; the requirement is that RCD protection operates correctly.',
    category: 'Earthing & Bonding',
    difficulty: 'advanced'
  },
  {
    id: 106,
    question:
      'According to Regulation 134.1.1, what must be selected to suit the characteristics of the circuit?',
    options: ['Cable size only', 'Accessories only', 'Protective devices', 'Installation method'],
    correctAnswer: 2,
    explanation:
      'Regulation 134.1.1 requires protective devices to be selected to suit the characteristics of the circuit they protect.',
    difficulty: 'advanced'
  },
  {
    id: 107,
    question: 'The Health and Safety at Work Act 1974 places duties on:',
    options: [
      'Employers only, not the workforce',
      'Employees only, not the employer',
      'The Health and Safety Executive alone',
      'Both employers and employees',
    ],
    correctAnswer: 3,
    explanation:
      'HSWA 1974 places duties on employers (to provide safe systems of work) and on employees (to take reasonable care and to cooperate).',
    difficulty: 'basic'
  },
  {
    id: 108,
    question: 'What is the maximum Zs for a C16 MCB according to BS 7671?',
    options: ['2.87Ω', '2.30Ω', '1.37Ω', '1.44Ω'],
    correctAnswer: 2,
    explanation:
      'A Type C MCB trips at 10×In, so for a C16: Zs = (Cmin × Uo)/Ia = (0.95 × 230)/160 = 1.37Ω per Table 41.3.',
    difficulty: 'advanced'
  },
  {
    id: 109,
    question: 'Special locations in BS 7671 are covered in which part?',
    options: ['Part 6', 'Part 7', 'Part 4', 'Part 5'],
    correctAnswer: 1,
    explanation:
      'Part 7 of BS 7671 covers special installations or locations with specific requirements.',
    difficulty: 'intermediate'
  },
  {
    id: 110,
    question: 'The Electricity Safety, Quality and Continuity Regulations 2002 primarily govern:',
    options: [
      'Installation standards',
      'Electrical contractors',
      'Distribution network operators',
      'Testing procedures',
    ],
    correctAnswer: 2,
    explanation:
      'ESQCR 2002 primarily regulates the safety and quality of public electricity supply networks operated by DNOs.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 111,
    question: 'Under BS 7671:2018+A4:2026, which regulation gives the maximum disconnection times for final circuits?',
    options: [
      'Regulation 411.3.2.2',
      'Regulation 411.3.1.1',
      'Regulation 411.3.1.2',
      'Regulation 411.4.204',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 411.3.2.2 holds the numeric maximum disconnection times, which Table 41.1 applies to final circuits up to 63 A with socket-outlets and up to 32 A supplying only fixed equipment. 411.3.1.1 is protective earthing and 411.3.1.2 is protective equipotential bonding.',
  },
  {
    id: 112,
    question: 'According to BS 7671, SELV systems must not exceed:',
    options: ['50V AC', '25V AC', '120V DC', '60V DC'],
    correctAnswer: 0,
    explanation:
      'SELV (Safety Extra Low Voltage) systems must not exceed 50V AC or 120V ripple-free DC under normal conditions.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 113,
    question: 'The Provision and Use of Work Equipment Regulations 1998 require:',
    options: [
      'All equipment to be replaced every five years',
      'Work equipment to be suitable and maintained',
      'Only PAT-tested equipment to be purchased',
      'Equipment to be insured against theft',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER requires work equipment to be suitable for its purpose, maintained in a safe condition, inspected and used only by trained persons.',
    difficulty: 'intermediate'
  },
  {
    id: 114,
    question: 'What classification is given to equipment that can be moved while energised?',
    options: ['Hand-held', 'Stationary', 'Portable', 'Moveable'],
    correctAnswer: 2,
    explanation:
      'Portable equipment is defined as equipment intended to be moved while energised or connected to the supply.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 115,
    question: 'According to BS 7671, secure isolation is best achieved by:',
    options: [
      'Switching off and posting a warning notice only',
      'Verbally informing others not to re-energise',
      'Relying on the RCD to prevent re-energisation',
      'Locking off the device or removing fuses/links',
    ],
    correctAnswer: 3,
    explanation:
      'Effective isolation requires physically securing the means of isolation by locking off or removing fuses/links so it cannot be inadvertently re-energised.',
    category: 'Safe Isolation',
    difficulty: 'basic'
  },

  // Advanced Testing Procedures (Questions 116-130)
  {
    id: 116,
    question:
      'When testing a three-phase installation, earth fault loop impedance should be measured between:',
    options: [
      'Each line and earth separately',
      'The line with the highest impedance and earth',
      'Any line and earth',
      'All lines together and earth',
    ],
    correctAnswer: 0,
    explanation:
      'Each line conductor must be tested separately to earth to identify any differences in impedance values.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 117,
    question: 'Insulation resistance should be tested between:',
    options: [
      'The line conductor and the protective device only',
      'Each live conductor and earth, then between live conductors',
      'The neutral and the main earthing terminal only',
      'Two adjacent socket-outlets on the same circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance is measured between all live conductors connected together and earth, and between live conductors, to prove the insulation throughout.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 118,
    question: 'When testing emergency lighting circuits, what additional test is required?',
    options: [
      'Standard electrical tests only',
      'Light output measurement',
      'Duration test and battery condition',
      'Switch operation only',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency lighting requires duration testing to verify operation time and battery condition assessment.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 119,
    question: 'For circuits with vulnerable electronic equipment, insulation resistance testing should be:',
    options: [
      'Carried out at 1000V to ensure a thorough test',
      'Skipped entirely to avoid any risk of damage',
      'Performed with all the equipment left connected',
      'Carried out at 250V with the equipment disconnected',
    ],
    correctAnswer: 3,
    explanation:
      'Where equipment may be damaged by the standard 500V test, it should be disconnected and the test carried out at a reduced 250V (BS 7671 643.3.2).',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 120,
    question: 'When measuring prospective fault current, the test should be applied:',
    options: [
      'Between live conductors and between each live conductor and earth',
      'Between the line conductor and the protective device casing',
      'Only at the furthest point of each final circuit',
      'Between two separate earth electrodes',
    ],
    correctAnswer: 0,
    explanation:
      'PFC is determined from the greater of the short-circuit value (between live conductors) and the earth fault value (live conductor to earth) at the relevant point.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 121,
    question: 'The fall-of-potential earth electrode resistance test requires:',
    options: [
      'A 500V DC insulation resistance tester',
      'A specialist tester with auxiliary current and potential electrodes',
      'A low-resistance ohmmeter connected across the electrode',
      'An RCD tester applied at the main earthing terminal',
    ],
    correctAnswer: 1,
    explanation:
      'The fall-of-potential method uses a dedicated earth electrode tester with auxiliary current (C) and potential (P) spikes positioned away from the electrode under test.',
    difficulty: 'advanced'
  },
  {
    id: 122,
    question:
      'When testing installations with photovoltaic systems, additional safety measures include:',
    options: [
      'Testing only the AC side, as the DC side is always safe',
      'Using AC-only rated instruments on the array',
      'DC and AC isolation with appropriately rated test equipment',
      'Disconnecting the array earth before any test',
    ],
    correctAnswer: 2,
    explanation:
      'PV systems require isolation and instruments rated for the array DC voltage as well as the AC side, since the DC side stays live in daylight.',
    difficulty: 'intermediate'
  },
  {
    id: 123,
    question: 'Functional testing of safety services must include:',
    options: [
      'Insulation resistance testing only',
      'A single test under normal supply conditions',
      'Visual inspection without any operation',
      'Operation under both normal and emergency conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Safety services must be proven to operate correctly under normal supply and on changeover to the emergency/standby source.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 124,
    question: 'When testing installations with inverters or UPS systems:',
    options: [
      'They may keep circuits live after mains isolation',
      'The DC side never needs to be considered',
      'No isolation is required as output is low voltage',
      'Phase rotation is irrelevant on any output',
    ],
    correctAnswer: 0,
    explanation:
      'Inverters and UPS units can back-feed and keep circuits live even when the mains is isolated, so all energy sources must be isolated before dead working.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 125,
    question: 'When verifying continuity of a ring final circuit, which cross-connection gives the R1+R2 recorded on the Schedule of Test Results?',
    options: [
      'Line to CPC (L1 to CPC2, L2 to CPC1)',
      'Line to neutral (L1 to N2, L2 to N1)',
      'Neutral to CPC (N1 to CPC2, N2 to CPC1)',
      'No cross-connection; measure each leg end to end',
    ],
    correctAnswer: 0,
    explanation:
      'GN3\'s step 3 cross-connects line to CPC and the reading at each socket is the R1+R2 for that outlet — the value recorded and used for Zs. Step 2 (line to neutral) proves the line and neutral legs but is not the certified R1+R2. Note R2 is the circuit protective conductor, never the neutral.',
    category: 'Inspection & Testing',
  },
  {
    id: 126,
    question: 'When testing circuits with surge protective devices (SPDs):',
    options: [
      'SPDs should remain connected',
      "SPDs don't affect testing",
      'SPDs must be disconnected before testing',
      'Special test equipment required',
    ],
    correctAnswer: 2,
    explanation:
      'SPDs must be disconnected before insulation resistance testing as they provide a path to earth.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 127,
    question: 'Phase rotation testing is required for:',
    options: [
      'Single-phase installations only',
      'Domestic installations',
      'Lighting circuits only',
      'Three-phase motor circuits',
    ],
    correctAnswer: 3,
    explanation:
      'Phase rotation must be verified for three-phase motor circuits to ensure correct direction of rotation.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 128,
    question: 'When testing circuits with capacitors:',
    options: [
      'Allow discharge time before testing',
      'Test immediately after isolation',
      "Capacitors don't affect testing",
      'Remove all capacitors',
    ],
    correctAnswer: 0,
    explanation:
      'Capacitors must be allowed to discharge safely before testing to prevent equipment damage and ensure safety.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 129,
    question: 'Verification of automatic disconnection of supply (ADS) requires measurement of:',
    options: [
      'Insulation resistance between live conductors',
      'Earth fault loop impedance and RCD operation',
      'Polarity at every accessory on the circuit',
      'Voltage drop under full design load',
    ],
    correctAnswer: 1,
    explanation:
      'ADS is verified by measuring Zs (to confirm the device will operate within the required time) and, where fitted, the RCD operating time.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 130,
    question: 'When testing fire alarm circuits, special consideration must be given to:',
    options: [
      'Duration test and battery condition',
      'High resistance connections or inadequate cable sizing',
      'Detection sensitivity and alarm functionality',
      'Customer information handling and smart device data',
    ],
    correctAnswer: 2,
    explanation:
      'Fire alarm systems require functional testing of detection devices and alarm functions beyond standard electrical tests.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },

  // RCD Advanced Topics (Questions 131-145)
  {
    id: 131,
    question: 'An RCD that trips at 15mA when tested at 30mA indicates:',
    options: [
      'Faulty RCD requiring replacement',
      'High sensitivity setting',
      'Incorrect test procedure',
      'Normal operation within tolerance',
    ],
    correctAnswer: 3,
    explanation:
      'RCDs should trip between 50% and 100% of rated current (15-30mA for a 30mA RCD), so 15mA is acceptable.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 132,
    question: 'Type A RCDs are designed to detect:',
    options: [
      'AC and pulsating DC residual currents',
      'DC residual currents only',
      'High frequency currents only',
      'AC residual currents only',
    ],
    correctAnswer: 0,
    explanation:
      'Type A RCDs can detect both sinusoidal AC and pulsating DC residual currents, making them suitable for electronic loads.',
    difficulty: 'advanced'
  },
  {
    id: 133,
    question: 'RCD discrimination (selectivity) is achieved by:',
    options: [
      'Fitting identical RCDs in series throughout',
      'Using different sensitivities and/or time delays',
      'Connecting all RCDs to a common neutral bar',
      'Increasing the prospective fault current upstream',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination requires the upstream RCD to have a higher rating and/or a time delay (S-type) so the downstream device clears the fault first.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 134,
    question: 'The cause of nuisance tripping in RCD-protected circuits is often:',
    options: [
      'An oversized circuit protective conductor',
      'Too high an insulation resistance reading',
      'Cumulative standing leakage current and EMI',
      'A low prospective fault current at the board',
    ],
    correctAnswer: 2,
    explanation:
      'Standing leakage from many connected appliances can accumulate towards the RCD threshold; EMI and filters add to it, causing unexpected tripping.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 135,
    question: 'When should a Type B RCD be specified?',
    options: [
      'On any standard domestic lighting circuit',
      'Where only sinusoidal AC residual current can occur',
      'On all circuits to save on device cost',
      'Where smooth DC residual current may occur (e.g. VSDs, EV chargers)',
    ],
    correctAnswer: 3,
    explanation:
      'A Type B RCD is needed where smooth DC residual currents may occur, such as with variable speed drives, some EV chargers and certain switched-mode supplies.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 136,
    question: 'The unwanted tripping of RCDs can be reduced by:',
    options: [
      'Dividing circuits across multiple RCDs to reduce cumulative leakage',
      'Fitting a single 30mA RCD to protect the whole board',
      'Increasing the rating of the main switch',
      'Removing the protective conductor from sensitive loads',
    ],
    correctAnswer: 0,
    explanation:
      'Splitting loads across several RCDs (or using RCBOs per circuit) reduces the standing leakage seen by each device, limiting unwanted tripping.',
    difficulty: 'intermediate'
  },
  {
    id: 137,
    question: 'RCD protection for socket-outlets may be omitted (other than in a dwelling) if:',
    options: [
      'The circuit is rated above 16A',
      'A documented risk assessment justifies omission',
      'The premises are occupied during the day only',
      'A standalone MCB is fitted instead',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 411.3.3 allows omission only in non-dwellings where a documented risk assessment determines RCD protection is not necessary.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 138,
    question: 'How often does the BS 7671 RCD notice advise the user to operate the test button?',
    options: [
      'Six-monthly by the user',
      'Annually, at the periodic inspection',
      'Quarterly, with the fire log',
      'Only when a fault is suspected',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 514.12.2 requires the RCD notice to advise the user to test six-monthly by pressing the test button, then to switch the device back on.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 139,
    question: 'When testing RCDs in IT systems:',
    options: [
      'No RCD test is ever required',
      'The same TN test method always applies directly',
      'The RCD must be tested at 500% only',
      'Special procedures apply due to the earthing arrangement',
    ],
    correctAnswer: 3,
    explanation:
      'IT systems have a high-impedance or unearthed source, so fault current paths differ and RCD verification must account for the earthing arrangement.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 140,
    question: 'An S-type (time-delayed) RCD is used to:',
    options: [
      'Achieve discrimination with downstream RCDs',
      'Provide faster tripping than a standard RCD',
      'Detect smooth DC residual currents',
      'Eliminate the need for overcurrent protection',
    ],
    correctAnswer: 0,
    explanation:
      'An S-type RCD has a built-in time delay so a downstream instantaneous RCD clears a fault first, giving discrimination and keeping other circuits supplied.',
    category: 'Protection & Devices',
  },
  {
    id: 141,
    question: 'At what test current should a 30mA RCD NOT trip, confirming it is not over-sensitive?',
    options: [
      '100% of rated residual current',
      '50% of rated residual current',
      '150% of rated residual current',
      '500% of rated residual current',
    ],
    correctAnswer: 1,
    explanation:
      'At 50% of IΔn (half-rated current) the RCD should not trip; it must then trip within the stated times at 100% and 500%.',
    difficulty: 'intermediate'
  },
  {
    id: 142,
    question:
      'RCDs protecting socket outlets in domestic premises must have a rating not exceeding:',
    options: ['10mA', '100mA', '30mA', '300mA'],
    correctAnswer: 2,
    explanation:
      'Domestic socket outlets require RCD protection not exceeding 30mA for additional protection against electric shock.',
    difficulty: 'intermediate'
  },
  {
    id: 143,
    question: 'When installing RCDs in circuits with high standing leakage currents:',
    options: [
      'Remove the RCD and rely on the MCB',
      'Connect several circuits to one 30mA RCD',
      'Reduce the protective conductor size',
      'Consider higher-rated RCDs or division into more circuits',
    ],
    correctAnswer: 3,
    explanation:
      'High-leakage circuits may need a higher-rated RCD (e.g. 100mA) where additional protection is not required, or splitting the load across more RCDs to maintain stability.',
    difficulty: 'basic'
  },
  {
    id: 144,
    question: 'The earth leakage current in a circuit protected by a 30mA RCD should not exceed:',
    options: ['9mA', '3mA', '15mA', '30mA'],
    correctAnswer: 0,
    explanation:
      'Combined earth leakage should not exceed 30% of RCD rating (9mA for 30mA RCD) to prevent nuisance tripping.',
    category: 'Protection & Devices',
    difficulty: 'advanced'
  },
  {
    id: 145,
    question: 'An RCBO combines the functions of:',
    options: [
      'An isolator and a surge protective device',
      'An RCD and overcurrent (MCB) protection',
      'A contactor and a time switch',
      'A main switch and an insulation monitor',
    ],
    correctAnswer: 1,
    explanation:
      'An RCBO (Residual Current Breaker with Overcurrent) provides residual current protection and overload/short-circuit protection in one device.',
    category: 'Protection & Devices',
  },

  // Earth Fault Loop Impedance Advanced (Questions 146-155)
  {
    id: 146,
    question: 'Temperature correction factors for Zs measurements are applied because:',
    options: [
      'Test instruments are temperature sensitive',
      'Protective devices are affected by temperature',
      'Cable resistance increases with temperature',
      'Safety margins are required',
    ],
    correctAnswer: 2,
    explanation:
      'Cable resistance increases with temperature, so measured values at ambient temperature must be corrected to operating temperature.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 147,
    question: 'The formula for calculating R1 + R2 in a ring final circuit is:',
    options: ['(r1 + r2) ÷ 2', 'r1 + r2', '(r1 × r2) ÷ (r1 + r2)', '(r1 + r2) ÷ 4'],
    correctAnswer: 3,
    explanation:
      'For a ring circuit, R1 + R2 = (r1 + r2) ÷ 4, where r1 and r2 are the resistance values of each leg of the ring.',
    category: 'Cables & Containment',
    difficulty: 'intermediate'
  },
  {
    id: 148,
    question: 'When Zs exceeds the maximum permitted value, the preferred solution is:',
    options: [
      'Improve the earth fault path or reduce cable length',
      'Increase the rating of the protective device',
      'Remove the RCD from the circuit',
      'Raise the supply voltage at the origin',
    ],
    correctAnswer: 0,
    explanation:
      'Excessive Zs should be reduced by improving the CPC/earthing or shortening the run; fitting an RCD that meets the disconnection time is the recognised alternative measure.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 149,
    question: 'The 0.8 (80%) rule-of-thumb applied to measured Zs accounts for:',
    options: [
      'A safety margin for instrument calibration drift',
      'The rise in conductor resistance at operating temperature',
      'The reduction in earth electrode resistance over time',
      'The tolerance band of the protective device',
    ],
    correctAnswer: 1,
    explanation:
      'Conductors are warmer in service than when tested cold, so a measured cold Zs is compared against 0.8 of the tabulated maximum to allow for the increase in resistance with temperature.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 150,
    question: 'In a TT system, the earth fault loop impedance comprises mainly:',
    options: [
      'The supply PEN conductor running back to the supply transformer',
      'The line conductor and the neutral return conductor only',
      'The installation electrode, the mass of earth and the supply electrode',
      'The internal resistance of the protective device only',
    ],
    correctAnswer: 2,
    explanation:
      'In TT the earth return is through the installation electrode, the general mass of earth and the supply earth electrode, giving a comparatively high Ze that usually demands RCD protection.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 151,
    question: 'The no-trip loop impedance test method is preferred because:',
    options: [
      'It gives a more accurate reading than a standard test',
      'It can be carried out on a dead circuit',
      'It also verifies insulation resistance at the same time',
      'It does not trip the RCD or interrupt the supply',
    ],
    correctAnswer: 3,
    explanation:
      'A no-trip loop test injects a low current so it measures Zs without operating the RCD, avoiding supply interruption to other users or critical equipment.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 152,
    question: 'External earth fault loop impedance (Ze) should be measured:',
    options: [
      'At the origin of the installation',
      'At the furthest socket-outlet on each final circuit',
      'At the midpoint of every ring final circuit',
      'At the load terminals of the largest appliance',
    ],
    correctAnswer: 0,
    explanation:
      'Ze is measured at the origin (main earthing terminal) to establish the baseline earth fault loop impedance.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 153,
    question: 'Zs at a point in a circuit can be calculated from the measured external loop impedance as:',
    options: ['Ze − (R1 + R2)', 'Ze + (R1 + R2)', 'Ze × (R1 + R2)', '(R1 + R2) ÷ Ze'],
    correctAnswer: 1,
    explanation:
      'Zs = Ze + (R1 + R2), the external loop impedance plus the resistance of the line and protective conductors of the circuit up to that point.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 154,
    question: 'High earth fault loop impedance readings may indicate:',
    options: [
      'An oversized line conductor',
      'Excessive prospective fault current',
      'Loose connections or poor earth continuity',
      'Too sensitive an RCD',
    ],
    correctAnswer: 2,
    explanation:
      'High Zs typically indicates loose connections, damaged conductors or an inadequate/poorly connected earth path.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 155,
    question: 'The earth fault loop impedance test effectively verifies:',
    options: [
      'The insulation resistance of the final circuit',
      'The polarity of every accessory',
      'The voltage drop under full load',
      'The complete earth fault path and CPC continuity',
    ],
    correctAnswer: 3,
    explanation:
      'A Zs measurement confirms the whole earth fault loop, including CPC continuity, has a low enough impedance for the protective device to operate in time.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },

  // Insulation Resistance Advanced (Questions 156-165)
  {
    id: 156,
    question: 'When testing insulation resistance on circuits with neon indicators:',
    options: [
      'Disconnect or short out neon indicators',
      'Test with indicators connected',
      'Use lower test voltage',
      'Test indicators separately',
    ],
    correctAnswer: 0,
    explanation:
      'Neon indicators should be disconnected or shorted out as they can give misleading low insulation readings.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 157,
    question: 'The test voltage for insulation resistance testing on 400V three-phase circuits is:',
    options: ['250V DC', '500V DC', '1000V DC', '1500V DC'],
    correctAnswer: 1,
    explanation: 'Circuits with nominal voltage between 50V and 500V should be tested at 500V DC.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 158,
    question: 'Under BS 7671:2018+A4:2026, how is the effectiveness of an RCD verified?',
    options: [
      'A single alternating current test at IΔn, whatever the RCD type',
      'Tests at ½x, 1x and 5x IΔn on both half-cycles',
      'A test at 5x IΔn on both half-cycles only',
      'The integral test button, operated twice',
    ],
    correctAnswer: 0,
    explanation:
      'Amendment 4 deleted Table 3A of Appendix 3. Verification is now an alternating current test at the rated residual operating current, IΔn, regardless of type — a general non-delay device must operate within 300 ms. The 5x test remains useful for fault-finding but is no longer part of the required sequence.',
    category: 'Inspection & Testing',
  },
  {
    id: 159,
    question: 'Low insulation resistance readings may be caused by:',
    options: [
      'Proper terminations',
      'Good installation practices',
      'New cable installation',
      'High temperature and humidity',
    ],
    correctAnswer: 3,
    explanation:
      'High temperature and humidity reduce insulation resistance by increasing conductivity through the insulation.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 160,
    question: 'When testing insulation resistance between live conductors:',
    options: [
      'All switches and control devices should be closed',
      'The protective conductor must be disconnected first',
      'The test voltage should be raised to 1500V DC',
      'The circuit must remain energised from the supply',
    ],
    correctAnswer: 0,
    explanation:
      'Switches and control devices should be closed (or links fitted) so the whole circuit insulation is tested; vulnerable electronic items are disconnected separately.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 161,
    question:
      'The minimum insulation resistance for motor circuits at 500V test voltage is typically:',
    options: ['0.5 MΩ', '1 MΩ', '2 MΩ', '5 MΩ'],
    correctAnswer: 1,
    explanation:
      'Motor circuits should achieve minimum 1 MΩ insulation resistance, though manufacturer specifications may vary.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 162,
    question: 'Step voltage testing for cable insulation involves:',
    options: [
      'Single voltage application',
      'Alternating test voltages',
      'Gradual voltage increase to test voltage',
      'Decreasing voltage steps',
    ],
    correctAnswer: 2,
    explanation:
      'Step voltage testing gradually increases voltage to detect insulation weaknesses before reaching full test voltage.',
    category: 'Inspection & Testing',
  },
  {
    id: 163,
    question: 'Insulation resistance testing should be performed:',
    options: [
      'Before initial energisation and periodically thereafter',
      'Once the installation has been in service for twelve months',
      'On energised circuits, so equipment can be left connected',
      'At each periodic inspection only, not at initial verification',
    ],
    correctAnswer: 0,
    explanation:
      'IR testing is carried out (dead) before energisation as part of initial verification and is repeated at periodic inspections.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 164,
    question: 'When insulation resistance is measured as infinity (∞):',
    options: [
      'Perfect insulation is indicated',
      'Test voltage is too low',
      'Test instrument is faulty',
      'The circuit has failed',
    ],
    correctAnswer: 0,
    explanation:
      "An infinity reading indicates insulation resistance exceeds the instrument's measurement range, showing excellent insulation.",
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 165,
    question: 'The absorption ratio for insulation testing is:',
    options: [
      '10-minute to 1-minute reading ratio',
      '1-minute to 30-second reading ratio',
      '30-second to 15-second reading ratio',
      '5-minute to 30-second reading ratio',
    ],
    correctAnswer: 1,
    explanation:
      'Absorption ratio is the 1-minute insulation resistance reading divided by the 30-second reading.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },

  // Protective Conductor Testing Advanced (Questions 166-175)
  {
    id: 166,
    question: 'The maximum resistance value for a protective conductor in a ring final circuit is:',
    options: [
      'Same as live conductors',
      'Double the live conductor resistance',
      '1.67 times the live conductor resistance',
      'Half the live conductor resistance',
    ],
    correctAnswer: 2,
    explanation:
      'For reduced CPC in ring circuits, maximum resistance is 1.67 times the line conductor resistance per BS 7671.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },
  {
    id: 167,
    question:
      'When testing protective conductor continuity in installations with multiple earth electrodes:',
    options: [
      'Visual inspection only',
      'Test the combined resistance',
      'Testing not required',
      'Test each electrode separately',
    ],
    correctAnswer: 3,
    explanation:
      'Each earth electrode should be tested separately to verify individual electrode effectiveness.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 168,
    question: 'The test current for main protective bonding conductor continuity should be:',
    options: [
      'Not less than 200mA',
      'Not less than 10mA',
      'Not less than the design current',
      'Not less than 10A',
    ],
    correctAnswer: 0,
    explanation:
      'Main protective bonding conductors should be tested with not less than 200mA test current to ensure reliable results.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 169,
    question: 'Supplementary bonding effectiveness can be verified by:',
    options: [
      'A 500V insulation resistance test between the parts',
      'Resistance measurement between bonded parts',
      'An earth fault loop impedance test at each part',
      'A visual check of the bonding label colour only',
    ],
    correctAnswer: 1,
    explanation:
      'Supplementary bonding should be verified by measuring resistance between simultaneously accessible exposed and extraneous conductive parts.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 170,
    question:
      'When testing the continuity of ring circuit protective conductors, readings should be:',
    options: [
      'Progressively higher towards the furthest point',
      'Infinite at every socket on the ring',
      'Approximately equal at each point with slight variation',
      'Exactly zero at every accessory',
    ],
    correctAnswer: 2,
    explanation:
      'After cross-connecting the ring, the CPC (R2) reading should be substantially the same at every socket, with only small variation; a marked rise indicates a spur.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 171,
    question: 'The cross-sectional area of a main protective bonding conductor is determined by:',
    options: [
      'Circuit protective conductor size',
      'Supply cable size',
      'Largest circuit cable size',
      'Main earthing conductor size',
    ],
    correctAnswer: 3,
    explanation:
      'Main protective bonding conductor size is based on the main earthing conductor size according to Table 54.8 in BS 7671.',
    category: 'Earthing & Bonding',
    difficulty: 'advanced'
  },
  {
    id: 172,
    question: 'Class II equipment should have:',
    options: [
      'No protective conductor connection',
      'Double protective conductor connection',
      'Temporary protective conductor',
      'Protective conductor connection',
    ],
    correctAnswer: 0,
    explanation:
      'Class II (double insulated) equipment must not have a protective conductor connection as it relies on insulation for protection.',
    difficulty: 'advanced'
  },
  {
    id: 173,
    question: 'When testing protective conductor continuity in armoured cables:',
    options: [
      'Test combined resistance only',
      'Test armour and internal CPC separately',
      'Armour testing not required',
      'Visual inspection sufficient',
    ],
    correctAnswer: 1,
    explanation:
      'Armoured cables require separate testing of the armour and any internal CPC to verify parallel path effectiveness.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 174,
    question: 'The protective conductor resistance in a radial circuit should be:',
    options: [
      'Always exactly equal to the line conductor resistance',
      'Always half the line conductor resistance regardless of size',
      'Related to line conductor resistance by cross-sectional area ratio',
      'Independent of the conductor cross-sectional areas',
    ],
    correctAnswer: 2,
    explanation:
      'CPC resistance relates to line conductor resistance by the ratio of their cross-sectional areas (R1/R2 = Area2/Area1).',
    category: 'Earthing & Bonding',
    difficulty: 'advanced'
  },
  {
    id: 175,
    question: 'Functional earth conductors should be tested for:',
    options: [
      'Their ability to carry full fault current',
      'Insulation resistance above 100 MΩ',
      'Correct phase rotation at the terminal',
      'Continuity and correct separation from protective conductors',
    ],
    correctAnswer: 3,
    explanation:
      'A functional earth provides correct operation of equipment, not shock protection, so it is checked for continuity and for being kept distinct from the protective earthing system.',
    difficulty: 'advanced'
  },

  // Certification and Documentation Advanced (Questions 176-190)
  {
    id: 176,
    question: 'An EICR must include a recommendation for the next inspection interval based on:',
    options: [
      'Installation type, use, and condition',
      'Insurance requirements',
      'Client preference only',
      'Standard 5-year period',
    ],
    correctAnswer: 0,
    explanation:
      'Next inspection interval should be determined by installation type, usage pattern, environment, and current condition.',
    difficulty: 'intermediate'
  },
  {
    id: 177,
    question: 'When limitations prevent full inspection, the EICR must:',
    options: [
      'Omit any mention of the limitation from the report',
      'State limitations and their potential impact on safety',
      'Automatically classify the installation as satisfactory',
      'Record the limited areas as if they had been tested',
    ],
    correctAnswer: 1,
    explanation:
      "Limitations must be clearly stated with explanation of their potential impact on the inspection's effectiveness.",
    category: 'Certification & Reporting',
    difficulty: 'basic'
  },
  {
    id: 178,
    question: "The 'extent and limitations' section of an EICR should specify:",
    options: [
      'The estimated cost of any remedial works needed',
      'Only the overall satisfactory or unsatisfactory result',
      'Areas inspected, limitations, and percentage of installation sampled',
      'The names of all previous owners of the property',
    ],
    correctAnswer: 2,
    explanation:
      'This section must detail exactly what was inspected, any limitations, and the percentage of the installation sampled.',
    category: 'Certification & Reporting',
    difficulty: 'basic'
  },
  {
    id: 179,
    question: "An EICR classification of 'Unsatisfactory' means:",
    options: [
      'Minor defects present',
      'Testing not possible',
      'Documentation incomplete',
      'C1 or C2 observations recorded',
    ],
    correctAnswer: 3,
    explanation:
      'Unsatisfactory classification indicates C1 (danger present) or C2 (potentially dangerous) observations exist.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 180,
    question: 'The person ordering an EICR should be advised without delay when:',
    options: [
      'A C1, C2 or FI observation is found',
      'Only C3 improvements are recommended',
      'All test results are within limits',
      'The next inspection date has passed',
    ],
    correctAnswer: 0,
    explanation:
      'C1 (danger present), C2 (potentially dangerous) and FI (further investigation) findings require the person ordering the report to be advised without delay.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 181,
    question: 'Schedule of Inspections forms part of:',
    options: ['EIC only', 'Both EIC and EICR', "Designer's records only", 'MEIWC only'],
    correctAnswer: 1,
    explanation:
      'Schedule of Inspections is required for both Electrical Installation Certificates and Electrical Installation Condition Reports.',
    category: 'Certification & Reporting',
  },
  {
    id: 182,
    question: "The 'Summary of the Installation' section must include:",
    options: [
      'The full schedule of every circuit test result obtained on site',
      'The cost and programme for any recommended remedial works',
      'Earthing arrangements, supply characteristics and main protective devices',
      'The names of all previous owners and occupiers of the property',
    ],
    correctAnswer: 2,
    explanation:
      'The supply characteristics and earthing summary records the earthing system type, supply parameters and details of the main switch/protective devices.',
    difficulty: 'advanced'
  },
  {
    id: 183,
    question: 'Distribution circuit details in Schedule of Test Results should show:',
    options: [
      'Only a pass or fail result recorded for each circuit',
      'The name of the manufacturer of each cable installed',
      'The estimated remaining service life of each circuit',
      'Circuit designation, cable details and protection characteristics',
    ],
    correctAnswer: 3,
    explanation:
      'Each distribution circuit entry records its designation, cable type/size, method of protection and the protective device characteristics.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 184,
    question: 'When test results fall outside acceptable limits:',
    options: [
      'Record actual values with deviation noted',
      'Round the values up so they fall within limits',
      'Leave the result blank and energise the circuit',
      'Record only a pass with no measured value',
    ],
    correctAnswer: 0,
    explanation:
      'Actual measured values must be recorded with clear indication that they exceed acceptable limits.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 185,
    question: 'The duty holder for electrical safety in commercial premises is typically:',
    options: [
      'The distribution network operator',
      'The building owner or person in control of the premises',
      'The original installing contractor indefinitely',
      'The manufacturer of the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Electricity at Work Regulations the duty holder is the person in control of the premises (owner, lessee or occupier).',
    difficulty: 'basic'
  },
  {
    id: 186,
    question: 'Competency for inspection and testing is demonstrated by:',
    options: [
      'Owning a calibrated multifunction tester',
      'Length of time served in the trade alone',
      'Knowledge, training, experience and understanding of hazards',
      'Membership of any trade body',
    ],
    correctAnswer: 2,
    explanation:
      'Competency combines relevant knowledge, training, practical experience and an understanding of the hazards and how to avoid them.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 187,
    question: 'Records of electrical maintenance should be kept for:',
    options: [
      'A maximum of twelve months after issue',
      'Until the next periodic inspection only',
      'No longer than is convenient for the duty holder',
      'The life of the installation plus a reasonable period',
    ],
    correctAnswer: 3,
    explanation:
      "Maintenance records should be retained for the installation's life plus a reasonable period afterwards to support safety and liability evidence.",
    difficulty: 'advanced'
  },
  {
    id: 188,
    question: 'When an EICR identifies immediate danger (C1), the inspector should:',
    options: [
      'Advise the person ordering the report without delay',
      'Wait until the report is formally issued',
      'Note it for the next periodic inspection',
      'Leave the decision entirely to the client',
    ],
    correctAnswer: 0,
    explanation:
      'A C1 (danger present) finding must be communicated to the duty holder without delay so prompt action can remove the danger.',
    category: 'Certification & Reporting',
    difficulty: 'basic'
  },
  {
    id: 189,
    question: 'The recommended interval between EICRs for commercial offices is typically:',
    options: ['3 years', '5 years', '10 years', '1 year'],
    correctAnswer: 1,
    explanation:
      'Commercial offices typically require EICR every 5 years, though this may vary based on risk assessment.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 190,
    question: 'An inspector must decline to issue a satisfactory certificate when:',
    options: [
      'A C3 improvement has been recommended',
      'Only minor cosmetic defects are present',
      'They cannot verify compliance due to limitations',
      'The client disputes the inspection fee',
    ],
    correctAnswer: 2,
    explanation:
      'Where limitations prevent the inspector verifying safety and compliance, a satisfactory certificate cannot be issued and the limitation must be recorded.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },

  // Fault Finding and Troubleshooting (Questions 191-200)
  {
    id: 191,
    question: 'A circuit that tests satisfactory when cold but fails when loaded indicates:',
    options: [
      'An oversized protective device',
      'Perfect insulation throughout the circuit',
      'A correctly terminated connection',
      'A high-resistance joint expanding under heat',
    ],
    correctAnswer: 3,
    explanation:
      'A connection that works cold but fails under load points to a high-resistance joint that heats and expands, breaking contact as the circuit warms.',
    difficulty: 'intermediate'
  },
  {
    id: 192,
    question: 'Intermittent RCD tripping without an obvious cause may be due to:',
    options: [
      'Accumulated earth leakage from multiple appliances',
      'An oversized circuit protective conductor',
      'Too low a prospective fault current',
      'Excessively high insulation resistance',
    ],
    correctAnswer: 0,
    explanation:
      'Many small standing leakage currents can sum towards the RCD threshold, so a transient appliance switching on can tip it over and trip the device.',
    category: 'Protection & Devices',
    difficulty: 'intermediate'
  },
  {
    id: 193,
    question: 'A systematic approach to fault finding should begin with:',
    options: [
      'Immediately replacing the protective device',
      'Gathering information and a visual inspection',
      'Energising the circuit to recreate the fault',
      'Dismantling the consumer unit completely',
    ],
    correctAnswer: 1,
    explanation:
      'Effective fault finding starts by gathering information about the symptoms and carrying out a thorough visual inspection before any testing.',
    difficulty: 'intermediate'
  },
  {
    id: 194,
    question: 'When earth fault loop impedance tests show inconsistent results:',
    options: [
      'Accept the lowest reading as correct',
      'Average the readings and record the mean',
      'Investigate for variable connections or parallel paths',
      'Repeat the test at a higher voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Inconsistent Zs readings point to intermittent connections or parallel earth paths and should be investigated rather than averaged away.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 195,
    question: 'A circuit showing normal insulation resistance but a tripping RCD indicates:',
    options: [
      'A short circuit between line and neutral',
      'An open-circuit protective conductor',
      'An oversized line conductor',
      'Earth leakage below the IR tester sensitivity',
    ],
    correctAnswer: 3,
    explanation:
      'A small leakage current can be too low to show on an insulation resistance test yet still enough to operate a sensitive 30mA RCD.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 196,
    question: 'Voltage readings that fall significantly under load suggest:',
    options: [
      'High-resistance connections or undersized conductors',
      'An oversized protective device for the load',
      'Excellent insulation resistance throughout',
      'A correctly sized supply cable and tight terminations',
    ],
    correctAnswer: 0,
    explanation:
      'A large voltage drop appearing only under load points to high-resistance joints or conductors too small for the current drawn.',
    difficulty: 'intermediate'
  },
  {
    id: 197,
    question: 'When troubleshooting control circuits, priority should be given to:',
    options: [
      'Lighting circuits',
      'Safety systems and interlocks',
      'Convenience outlets',
      'Power circuits first',
    ],
    correctAnswer: 1,
    explanation:
      'Safety systems and interlocks must be prioritised to prevent dangerous conditions during troubleshooting.',
    difficulty: 'basic'
  },
  {
    id: 198,
    question: 'A lost neutral in a three-phase system may cause:',
    options: [
      'A reduction in all phase voltages equally',
      'No effect because phases are balanced',
      'Voltage imbalance and damage to single-phase loads',
      'An immediate short circuit between phases',
    ],
    correctAnswer: 2,
    explanation:
      'Losing the neutral allows the star-point voltage to float, so single-phase loads see over- or under-voltage depending on phase loading, risking equipment damage.',
    difficulty: 'intermediate'
  },
  {
    id: 199,
    question: 'Detecting a series arc fault requires consideration of:',
    options: [
      'The earth fault loop impedance only',
      'The insulation resistance between live conductors',
      'The prospective fault current at the origin',
      'High-frequency current signatures and AFDD technology',
    ],
    correctAnswer: 3,
    explanation:
      'Series arcs do not raise current enough to trip an MCB, so AFDDs detect their characteristic high-frequency current signatures instead.',
    difficulty: 'advanced'
  },
  {
    id: 200,
    question: 'When fault symptoms appear only under specific operating conditions:',
    options: [
      'Attempt to replicate those conditions during testing',
      'Rely on the client\'s description without further testing',
      'Replace the consumer unit as a precaution',
      'Test only when the circuit is cold and unloaded',
    ],
    correctAnswer: 0,
    explanation:
      'Condition-specific faults must be diagnosed by reproducing the same operating conditions (load, temperature, time) under which they occur.',
    difficulty: 'advanced'
  },

  // Advanced Testing Scenarios (Questions 201-225)
  {
    id: 201,
    question:
      'When testing a 3-phase motor installation, what additional safety considerations apply?',
    options: [
      'Only single-pole isolation of the line conductor is needed',
      'Rotation direction check and phase sequence testing',
      'No isolation is required because each phase is only 230V',
      'The neutral may be left connected during isolation',
    ],
    correctAnswer: 1,
    explanation:
      '3-phase installations require phase sequence verification and rotation direction checks to prevent equipment damage.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 202,
    question:
      'In a swimming pool installation, what special earthing requirements must be verified?',
    options: [
      'A separate earth electrode dedicated to the pool pump only',
      'Removal of all bonding to avoid stray currents in the water',
      'Equipotential bonding of all conductive parts within zones',
      'A functional earth connection to the lighting transformer',
    ],
    correctAnswer: 2,
    explanation:
      'Pool installations require comprehensive equipotential bonding of all metallic parts within specified zones.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },
  {
    id: 203,
    question:
      'When testing circuits in a marina installation, what environmental factor must be considered?',
    options: [
      'The absence of any need for RCD protection on pontoons',
      'A consistently dry environment with negligible humidity',
      'A reduced earth fault loop impedance from the seawater path',
      'Moisture and salt corrosion effects on connections',
    ],
    correctAnswer: 3,
    explanation:
      'Marine environments cause accelerated corrosion requiring more frequent inspection and specialised protection.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 204,
    question:
      'During fault finding on a complex distribution board, what systematic approach should be used?',
    options: [
      'Work from supply to load, isolating sections systematically',
      'Replace every protective device on the board at once',
      'Energise all circuits together and watch for the first to trip',
      'Start at a random outlet and work outwards from there',
    ],
    correctAnswer: 0,
    explanation:
      'Systematic isolation from supply to load helps locate faults efficiently while maintaining safety.',
    difficulty: 'basic'
  },
  {
    id: 205,
    question: 'What limitation might prevent full testing of a hospital installation?',
    options: [
      'An unusually low prospective fault current at the origin',
      'Critical life support equipment that cannot be isolated',
      'The absence of any earthing arrangement to test against',
      'A requirement to test only at 250V on every circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Critical medical equipment may require alternative testing methods or recorded limitations.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 206,
    question: 'In a fire alarm system installation, what additional testing is required?',
    options: [
      'A 1000V insulation resistance test on the detection wiring',
      'Phase rotation testing of the single-phase sounder circuit',
      'Functional testing of detection and alarm systems',
      'A higher earth fault loop impedance limit than normal',
    ],
    correctAnswer: 2,
    explanation:
      'Fire alarm systems require both electrical verification and functional testing to BS 5839 standards.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 207,
    question:
      'When testing an installation with electronic equipment, what precaution is essential?',
    options: [
      'Raise the insulation test voltage to 1000V for accuracy',
      'Leave all equipment connected to load the test circuit',
      'Earth every electronic device to the consumer unit first',
      'Disconnect sensitive equipment before insulation testing',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic equipment can be damaged by high DC test voltages and must be disconnected.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 208,
    question: 'What is the preferred method for testing earth electrode resistance?',
    options: [
      'Fall of potential method using test electrodes',
      'A 500V DC insulation resistance test on the electrode',
      'An RCD trip-time test applied at the electrode',
      'A continuity test between line and the electrode',
    ],
    correctAnswer: 0,
    explanation:
      'The fall of potential method provides accurate earth electrode resistance measurement.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 209,
    question:
      'During testing of a theatre installation, what special consideration applies to dimmers?',
    options: [
      'They draw no current and therefore need no protection',
      'Electronic equipment protection and harmonic considerations',
      'They must be tested only at 1000V insulation voltage',
      'Their neutral may be shared freely with other circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Theatre dimmers contain sensitive electronics and can generate harmonics affecting other equipment.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 210,
    question: 'What testing challenge is presented by smart lighting systems?',
    options: [
      'They cannot be tested with any standard instrument',
      'They require a dedicated three-phase supply to operate',
      'Communication protocols and electronic component protection',
      'They are exempt from insulation resistance testing entirely',
    ],
    correctAnswer: 2,
    explanation:
      'Smart lighting involves communication systems and sensitive electronics requiring careful testing procedures.',
    category: 'Inspection & Testing',
  },
  {
    id: 211,
    question: 'In an agricultural installation, what environmental factor affects testing?',
    options: [
      'A consistently clean and dry indoor environment',
      'The complete absence of any livestock or machinery',
      'A reduced need for RCD protection on outbuildings',
      'Dust, moisture and corrosive substances',
    ],
    correctAnswer: 3,
    explanation:
      'Agricultural environments present harsh conditions requiring more frequent inspection and specialised protection.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 212,
    question: 'When testing IT earthing systems, what key difference applies?',
    options: [
      'First fault does not cause disconnection - monitoring required',
      'The supply neutral is solidly earthed at the origin',
      'No earth fault loop impedance test is ever needed',
      'Disconnection times are always faster than in a TN system',
    ],
    correctAnswer: 0,
    explanation:
      "IT systems use insulation monitoring as the first fault doesn't cause automatic disconnection.",
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 213,
    question: 'What is the significance of testing at different load conditions?',
    options: [
      'Insulation resistance changes greatly with the load current',
      'Temperature and voltage drop effects vary with load',
      'Polarity reverses when the circuit is fully loaded',
      'Earth electrode resistance falls as load increases',
    ],
    correctAnswer: 1,
    explanation:
      'Different load conditions affect voltage drop, temperature and protective device operation.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 214,
    question: 'During testing of a lift installation, what safety protocol is essential?',
    options: [
      'Testing the car while it is in normal passenger service',
      'Relying solely on the landing call buttons for isolation',
      'Coordination with lift engineer and mechanical isolation',
      'Leaving the motor room energised throughout the work',
    ],
    correctAnswer: 2,
    explanation:
      'Lift installations require coordination with mechanical systems and specialist engineers.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 215,
    question: 'What testing consideration applies to installations with solar PV systems?',
    options: [
      'The array can always be made fully dead at any time',
      'Only the AC output side needs to be considered',
      'A single AC isolation point makes the whole array safe',
      'DC isolation and dual energy source considerations',
    ],
    correctAnswer: 3,
    explanation:
      'PV systems require DC isolation and consideration of multiple energy sources during testing.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 216,
    question:
      'In a computer server room, what environmental monitoring is critical during testing?',
    options: [
      'Temperature and humidity control maintenance',
      'Phase rotation of the single-phase rack supplies',
      'Earth electrode resistance of the building lightning system',
      'The colour coding of the structured cabling only',
    ],
    correctAnswer: 0,
    explanation:
      'Server rooms require maintained environmental conditions to prevent equipment damage.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 217,
    question: 'What is the main challenge when testing emergency lighting systems?',
    options: [
      'The luminaires cannot be tested without the normal supply',
      'Testing must not compromise life safety during occupied periods',
      'The batteries must be fully discharged before any test',
      'Only a visual inspection of the fittings is permitted',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency lighting testing must maintain life safety while verifying system operation.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 218,
    question: 'During testing of a welding shop installation, what hazard must be considered?',
    options: [
      'A negligible load that needs no special consideration',
      'A purely resistive load with no transient effects',
      'High fault currents and electromagnetic interference',
      'A requirement to test only at extra-low voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Welding equipment generates high currents and electromagnetic interference affecting test equipment.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 219,
    question: 'What limitation might apply when testing heritage buildings?',
    options: [
      'A requirement to rewire the whole building before testing',
      'Unlimited access to all concealed wiring at all times',
      'An exemption from issuing any certificate at all',
      'Access restrictions and conservation requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Heritage buildings may have access restrictions and require conservation-aware testing methods.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 220,
    question: 'In a chemical plant installation, what additional safety consideration applies?',
    options: [
      'Explosion risk and chemical compatibility of equipment',
      'A reduced need for earthing because of the dry process',
      'A standard domestic IP rating is sufficient throughout',
      'No isolation is needed where equipment is sealed',
    ],
    correctAnswer: 0,
    explanation:
      'Chemical plants require explosion-proof equipment and chemical compatibility considerations.',
    difficulty: 'basic'
  },
  {
    id: 221,
    question: 'What challenge does testing flexible cables in moving machinery present?',
    options: [
      'They never require any continuity testing once installed',
      'Mechanical stress and flexing damage assessment',
      'They can only be tested at 1000V insulation voltage',
      'Their CPC may be omitted because they are flexible',
    ],
    correctAnswer: 1,
    explanation:
      'Flexible cables in moving machinery require assessment for mechanical stress and fatigue damage.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 222,
    question: 'During testing of a data centre UPS system, what coordination is required?',
    options: [
      'The UPS may simply be switched off without notice',
      'No coordination is needed as the output is low voltage',
      'UPS engineer present and backup power arrangements',
      'Only the incoming mains supply requires isolation',
    ],
    correctAnswer: 2,
    explanation:
      'UPS testing requires specialist coordination to maintain critical power supplies.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 223,
    question: 'What testing consideration applies to temporary installations?',
    options: [
      'They are exempt from inspection and testing entirely',
      'They need less protection than permanent installations',
      'They never require RCD protection on socket-outlets',
      'Enhanced protection and more frequent inspection',
    ],
    correctAnswer: 3,
    explanation:
      'Temporary installations require enhanced protection and more frequent testing due to their nature.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 224,
    question: 'In a school installation, what timing consideration affects testing?',
    options: [
      'Testing scheduled to avoid disrupting education',
      'Testing must always be done during occupied lesson times',
      'Testing can only be carried out at night under floodlight',
      'Testing must be completed within a single hour by law',
    ],
    correctAnswer: 0,
    explanation:
      'Educational facility testing must be scheduled to minimise disruption to teaching activities.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 225,
    question: 'What is the key challenge when fault-finding intermittent problems?',
    options: [
      'The fault is always present and easy to measure',
      'Reproducing fault conditions and systematic monitoring',
      'A single insulation resistance test always locates it',
      'The protective device will always indicate the cause',
    ],
    correctAnswer: 1,
    explanation:
      'Intermittent faults require systematic monitoring and recreation of fault conditions for diagnosis.',
    difficulty: 'intermediate'
  },

  // Modern Installation Technologies (Questions 226-250)
  {
    id: 226,
    question: 'What additional testing is required for EV charging point installations?',
    options: [
      'A 250V insulation test with the charger left connected',
      'Phase rotation testing of the single-phase charge point',
      'DC leakage testing and protective conductor current verification',
      'A reduced earth fault loop impedance limit of 0.1 ohms',
    ],
    correctAnswer: 2,
    explanation:
      'EV charging points require DC leakage testing and verification of protective conductor current limits.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 227,
    question: 'When testing smart home systems, what protocol compatibility must be verified?',
    options: [
      'The cable colour code used for the data wiring',
      'The earth electrode resistance of the building',
      'The prospective fault current at every smart device',
      'Communication protocols (WiFi, Zigbee, Z-Wave) and interference',
    ],
    correctAnswer: 3,
    explanation:
      'Smart home systems require verification of communication protocols and electromagnetic compatibility.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 228,
    question: 'What safety consideration applies to battery storage system testing?',
    options: [
      'DC isolation, thermal runaway risk and gas ventilation',
      'No isolation is needed because the voltage is low',
      'Only the AC inverter output presents any hazard',
      'The battery can be short-circuited safely to discharge it',
    ],
    correctAnswer: 0,
    explanation:
      'Battery systems present DC hazards, fire risks and require proper ventilation during testing.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 229,
    question: 'For heat pump installations, what electrical verification is essential?',
    options: [
      'A reduced insulation test voltage of 100V DC',
      'Phase rotation, starting current and defrost cycle operation',
      'Removal of all RCD protection from the supply',
      'A functional earth in place of a protective conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Heat pumps require phase rotation verification and defrost cycle electrical system checks.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 230,
    question: 'What testing consideration applies to LED lighting installations?',
    options: [
      'They must be tested at an increased 1000V to be thorough',
      'They draw no current so need no protective device',
      'Reduced insulation test voltage and driver protection',
      'Their drivers are immune to any insulation test voltage',
    ],
    correctAnswer: 2,
    explanation:
      'LED drivers contain sensitive electronics requiring reduced test voltages to prevent damage.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 231,
    question: 'When testing solar PV installations, what measurement is critical?',
    options: [
      'Only the AC frequency at the inverter output',
      'The phase rotation of the single-phase supply',
      'The earth electrode resistance of the array frame',
      'DC voltage, current and insulation resistance',
    ],
    correctAnswer: 3,
    explanation:
      'PV systems require comprehensive DC measurements and insulation testing for safety.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 232,
    question: 'What verification is required for smart meter installations?',
    options: [
      'Communication functionality and load profile accuracy',
      'A 500V insulation test across the meter terminals',
      'Phase rotation of the single-phase tails',
      'The earth electrode resistance of the meter board',
    ],
    correctAnswer: 0,
    explanation:
      'Smart meters require verification of communication systems and accurate load monitoring.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 233,
    question: 'For building management system (BMS) integration, what testing is needed?',
    options: [
      'Only a standard insulation resistance test on the wiring',
      'Communication protocols, sensor calibration and system response',
      'Phase rotation testing of every control output',
      'A reduced earth fault loop impedance on the data bus',
    ],
    correctAnswer: 1,
    explanation:
      'BMS systems require comprehensive testing of communication, sensors and control responses.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 234,
    question: 'What safety feature must be verified in EV charging installations?',
    options: [
      'A single-pole isolator on the line conductor only',
      'A functional earth in place of the protective conductor',
      'PEN fault detection and automatic disconnection',
      'A surge protective device fitted at the vehicle inlet',
    ],
    correctAnswer: 2,
    explanation: 'EV charging requires PEN fault detection to prevent dangerous touch voltages.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 235,
    question: 'When testing energy storage systems, what isolation procedure is critical?',
    options: [
      'Isolating the AC side alone makes the battery safe',
      'No isolation is required because the cells self-discharge',
      'A single line-conductor switch isolates the whole system',
      'DC isolation at multiple points and energy discharge verification',
    ],
    correctAnswer: 3,
    explanation:
      'Energy storage requires multiple isolation points and verification of energy discharge.',
    category: 'Safe Isolation',
  },
  {
    id: 236,
    question: 'What testing challenge is presented by wireless charging systems?',
    options: [
      'Electromagnetic field measurement and shielding verification',
      'A higher earth fault loop impedance limit than normal',
      'Phase rotation testing of the single-phase primary coil',
      'A 1000V insulation test across the air gap',
    ],
    correctAnswer: 0,
    explanation: 'Wireless charging requires EMF measurement and verification of safety shielding.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 237,
    question: 'For smart thermostats, what functionality verification is required?',
    options: [
      'The prospective fault current at the thermostat terminals',
      'Temperature sensing accuracy and communication protocols',
      'The earth electrode resistance of the heating system',
      'Phase rotation of the single-phase boiler supply',
    ],
    correctAnswer: 1,
    explanation:
      'Smart thermostats require verification of sensing accuracy and communication functionality.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 238,
    question: 'What consideration applies to testing micro-generation systems?',
    options: [
      'No connection agreement with the DNO is ever needed',
      'The generator may be left connected during isolation',
      'Export limitation and grid protection settings verification',
      'Only insulation resistance of the AC output matters',
    ],
    correctAnswer: 2,
    explanation:
      'Micro-generation requires verification of export controls and grid protection systems.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 239,
    question: 'When testing smart switches and dimmers, what protection is needed?',
    options: [
      'A higher 1000V insulation test to stress the electronics',
      'Removal of the protective conductor from the switch',
      'Phase rotation testing of the single-phase switch wire',
      'Electronic component protection and communication testing',
    ],
    correctAnswer: 3,
    explanation:
      'Smart switches contain electronics requiring protection and communication verification.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 240,
    question: 'What verification is required for home automation lighting systems?',
    options: [
      'Automated control sequences and emergency override function',
      'A 250V insulation test on the data control wiring',
      'Phase rotation of the single-phase lighting supply',
      'The earth electrode resistance of the lighting circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Automated lighting requires verification of control sequences and emergency override capability.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 241,
    question: 'For electric vehicle supply equipment (EVSE), what current monitoring is required?',
    options: [
      'Only the AC frequency at the supply terminals',
      'Pilot signal integrity and protective conductor current measurement',
      'The earth electrode resistance of the charge point',
      'Phase rotation of the single-phase vehicle inlet',
    ],
    correctAnswer: 1,
    explanation:
      'EVSE requires verification of pilot signals and protective conductor current limits.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 242,
    question: 'What testing consideration applies to power over Ethernet (PoE) systems?',
    options: [
      'A 500V insulation test between every data pair',
      'RCD protection at 30mA on the data cabling',
      'Power delivery limits and equipment protection verification',
      'An earth electrode dedicated to the network switch',
    ],
    correctAnswer: 2,
    explanation:
      'PoE systems require verification of power limits and connected equipment protection.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 243,
    question: 'When testing battery backup systems, what capacity verification is needed?',
    options: [
      'A 500V insulation test across the battery terminals',
      'Reading the rated capacity from the nameplate alone',
      'Measuring the open-circuit voltage with no load applied',
      'Load testing and autonomy time verification',
    ],
    correctAnswer: 3,
    explanation:
      'Battery backup requires load testing to verify actual autonomy time under realistic conditions.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 244,
    question: 'What safety verification is required for induction hob installations?',
    options: [
      'Electromagnetic field limits and cookware compatibility',
      'A reduced earth fault loop impedance of 0.1 ohms',
      'Phase rotation testing of the single-phase hob supply',
      'A 1000V insulation test on the induction coils',
    ],
    correctAnswer: 0,
    explanation:
      'Induction hobs require EMF measurement and verification of safe cooking environment.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 245,
    question: 'For smart security systems, what functional testing is essential?',
    options: [
      'A 1000V insulation test on the detector wiring only',
      'Alarm activation sequences and communication backup systems',
      'Phase rotation testing of the single-phase control panel',
      'The earth electrode resistance of the alarm bell box',
    ],
    correctAnswer: 1,
    explanation:
      'Security systems require verification of alarm sequences and backup communication paths.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 246,
    question:
      'What consideration applies to testing electric underfloor heating with smart controls?',
    options: [
      'The earth electrode resistance of the floor mat',
      'A reduced insulation test voltage of 100V DC',
      'Temperature sensor calibration and zone control verification',
      'Phase rotation of the single-phase heating supply',
    ],
    correctAnswer: 2,
    explanation:
      'Smart heating requires verification of sensor accuracy and zone control functionality.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 247,
    question: 'When testing renewable energy inverters, what protection verification is needed?',
    options: [
      'Only the AC output insulation resistance needs checking',
      'A reduced earth fault loop impedance on the DC side',
      'A functional earth in place of the protective conductor',
      'Anti-islanding protection and grid synchronisation',
    ],
    correctAnswer: 3,
    explanation:
      'Inverters require verification of grid protection and anti-islanding safety systems.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 248,
    question: 'What testing challenge is presented by electric towel rails with smart controls?',
    options: [
      'Temperature control accuracy and timer function verification',
      'A reduced earth fault loop impedance of 0.1 ohms',
      'A 1000V insulation test on the heating element',
      'Phase rotation of the single-phase rail supply',
    ],
    correctAnswer: 0,
    explanation:
      'Smart towel rails require verification of temperature control and programmable functions.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 249,
    question: 'For electric car charging cables, what additional testing is required?',
    options: [
      'Only a visual inspection of the connector housing',
      'Pilot wire integrity and in-cable control box function',
      'Phase rotation testing of the single-phase lead',
      'The earth electrode resistance at the vehicle inlet',
    ],
    correctAnswer: 1,
    explanation:
      'EV cables require verification of pilot wire signals and in-cable protection devices.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 250,
    question: 'What verification is needed for smart garage door systems?',
    options: [
      'A 1000V insulation test on the motor windings only',
      'Phase rotation testing of the single-phase door motor',
      'Safety sensors, obstruction detection and emergency release',
      'The earth electrode resistance of the garage structure',
    ],
    correctAnswer: 2,
    explanation:
      'Smart garage doors require comprehensive safety system verification including sensors and emergency functions.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },

  // Advanced Safety & Risk Assessment (Questions 251-275)
  {
    id: 251,
    question: 'What is the primary purpose of a risk assessment before electrical testing?',
    options: [
      'To estimate the cost of the testing work',
      'To select which certificate to issue',
      'To schedule the work around the client',
      'To identify hazards and implement control measures',
    ],
    correctAnswer: 3,
    explanation:
      'A risk assessment identifies the hazards of the task and sets the control measures needed to work safely.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 252,
    question: 'When working on installations above 1kV, what additional qualification is required?',
    options: [
      'High voltage competency certification',
      'No additional qualification',
      'Standard electrical qualification',
      'First aid training only',
    ],
    correctAnswer: 0,
    explanation: 'High voltage work requires specific competency certification and authorisation.',
    difficulty: 'basic'
  },
  {
    id: 253,
    question: 'What is the minimum safe approach distance for 11kV overhead lines?',
    options: ['1 metre', '3 metres', '2 metres', '5 metres'],
    correctAnswer: 1,
    explanation:
      'The minimum safe approach distance for 11kV overhead lines is 3 metres for unqualified persons.',
    category: 'Safe Isolation',
    difficulty: 'advanced'
  },
  {
    id: 254,
    question: 'Arc flash risk is highest when:',
    options: [
      'Working on an isolated and proved-dead circuit',
      'Carrying out insulation resistance testing',
      'Working live on equipment with high available fault current',
      'Measuring earth electrode resistance outdoors',
    ],
    correctAnswer: 2,
    explanation:
      'Arc flash energy rises with the available fault current, so the greatest risk is live work on high-energy equipment near the supply.',
    difficulty: 'advanced'
  },
  {
    id: 255,
    question: 'What PPE is specifically required for arc flash protection?',
    options: [
      'A standard hi-vis vest and hard hat',
      'Ordinary cotton overalls and safety boots',
      'A dust mask and disposable gloves',
      'Arc-rated clothing and a face shield',
    ],
    correctAnswer: 3,
    explanation:
      'Arc flash protection requires clothing and a face shield with an arc rating selected to exceed the calculated incident energy.',
    difficulty: 'intermediate'
  },
  {
    id: 256,
    question: 'When should a permit-to-work system be used?',
    options: [
      'For complex or high-risk electrical work',
      'For replacing a single light fitting',
      'For any work in a domestic dwelling',
      'For routine insulation resistance testing',
    ],
    correctAnswer: 0,
    explanation:
      'A permit-to-work formally controls complex or high-risk tasks, ensuring isolation and coordination before work begins.',
    difficulty: 'intermediate'
  },
  {
    id: 257,
    question:
      'What is the maximum recommended duration for emergency response after electric shock?',
    options: ['1 minute', '4 minutes', '30 seconds', '10 minutes'],
    correctAnswer: 1,
    explanation:
      'Brain damage from cardiac arrest begins after 4 minutes, making rapid response critical.',
    difficulty: 'advanced'
  },
  {
    id: 258,
    question: 'When working alone on electrical installations, what safety measure is essential?',
    options: [
      'Working faster to reduce the time spent on site',
      'Relying on a mobile phone with no agreed call schedule',
      'Regular check-in procedures and emergency contacts',
      'Leaving the area unsecured so help can reach you',
    ],
    correctAnswer: 2,
    explanation:
      'Lone working requires check-in procedures and emergency contact arrangements for safety.',
    difficulty: 'basic'
  },
  {
    id: 259,
    question: 'What environmental factor most increases electrical safety risk?',
    options: ['Bright sunlight', 'Windy conditions', 'High temperature', 'Wet or damp conditions'],
    correctAnswer: 3,
    explanation:
      'Moisture significantly reduces insulation effectiveness and increases shock risk.',
    difficulty: 'intermediate'
  },
  {
    id: 260,
    question: 'A method statement for electrical work must include:',
    options: [
      'Step-by-step procedures and the associated risk controls',
      'Only the names of the operatives involved',
      'A list of every test instrument owned',
      'The client billing and payment terms',
    ],
    correctAnswer: 0,
    explanation: 'A method statement sets out the sequence of work and the risk control measures so the task is carried out safely.',
    difficulty: 'intermediate'
  },
  {
    id: 261,
    question: 'What is the hierarchy of risk control in electrical safety?',
    options: [
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Elimination, substitution, engineering controls, administrative, PPE',
      'Between live conductors and between each live conductor and earth',
      'Access restrictions and conservation requirements',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy prioritises elimination and substitution over PPE as the last line of defence.',
    difficulty: 'advanced'
  },
  {
    id: 262,
    question: 'When is it acceptable to work live on electrical equipment?',
    options: [
      'Whenever it is quicker than isolating and proving dead',
      'On any circuit operating below 230V to earth',
      'Only when dead working is not practicable and it is properly risk assessed',
      'When the client requests it in order to avoid downtime on site',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Electricity at Work Regulations live working is only justified where it is unreasonable to work dead and suitable precautions are in place.',
    difficulty: 'basic'
  },
  {
    id: 263,
    question: 'What rescue equipment should be readily available during electrical testing?',
    options: [
      'Before initial energisation and periodically thereafter',
      'Overall assessment and recommendations',
      'RCD protection for all socket outlets',
      'Insulated rescue hooks and first aid equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Insulated rescue equipment and first aid supplies must be immediately available during electrical work.',
    category: 'Inspection & Testing',
    difficulty: 'advanced'
  },
  {
    id: 264,
    question: 'Electrical safety training must be updated:',
    options: [
      'Regularly, based on competency assessment',
      'Once on entry to the trade, then on change of employer',
      'On a fixed three-year cycle regardless of role or scope',
      'Following any reportable accident on the contractor\'s sites',
    ],
    correctAnswer: 0,
    explanation:
      'Safety training requires regular updates based on competency assessment and regulatory changes.',
  },
  {
    id: 265,
    question: 'What information must be included in electrical safety documentation?',
    options: [
      'Only the names of the operatives on site',
      'Hazard identification, risk assessment and control measures',
      'Just the calibration dates of the test instruments',
      'A list of every cable installed on the job',
    ],
    correctAnswer: 1,
    explanation:
      'Safety documentation must comprehensively address hazards, risks and control measures.',
    difficulty: 'intermediate'
  },
  {
    id: 266,
    question:
      'When working in confined spaces with electrical equipment, what additional risk applies?',
    options: [
      'Improved natural ventilation and easy escape',
      'A lower risk of electric shock than open areas',
      'Reduced oxygen levels and restricted escape routes',
      'No need for any additional risk assessment',
    ],
    correctAnswer: 2,
    explanation:
      'Confined spaces present additional risks of oxygen depletion and restricted emergency egress.',
    difficulty: 'intermediate'
  },
  {
    id: 267,
    question: 'What is the recommended maximum working time for detailed electrical work?',
    options: [
      'Work continuously until the task is fully complete',
      'No limit, provided enough coffee is available',
      'Twelve hours without a break to keep momentum',
      'Regular breaks to maintain concentration and safety',
    ],
    correctAnswer: 3,
    explanation:
      'Regular breaks are essential to maintain concentration and prevent safety-compromising fatigue.',
    difficulty: 'intermediate'
  },
  {
    id: 268,
    question: 'Emergency procedures for electrical incidents must include:',
    options: [
      'Safe isolation, first aid and evacuation arrangements',
      'A schedule of future inspection dates',
      'The calibration records of test instruments',
      'A full inventory of installed cables',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency procedures must cover making the area safe by isolation, summoning first aid and evacuating people as needed.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 269,
    question: 'What weather conditions require suspension of outdoor electrical work?',
    options: [
      'Light cloud cover and a gentle breeze',
      'Lightning risk and heavy precipitation',
      'Dry, mild and settled conditions',
      'Cool temperatures with good visibility',
    ],
    correctAnswer: 1,
    explanation:
      'Lightning and heavy rain significantly increase electrical safety risks requiring work suspension.',
    difficulty: 'intermediate'
  },
  {
    id: 270,
    question: 'Competency assessment for electrical workers must evaluate:',
    options: [
      'Only the number of years in the trade',
      'Membership of a trade body alone',
      'Knowledge, skills and safety understanding',
      'Ownership of a calibrated test instrument',
    ],
    correctAnswer: 2,
    explanation:
      'Competency assessment must comprehensively evaluate knowledge, practical skills and safety awareness.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 271,
    question: 'What communication is essential during complex electrical testing?',
    options: [
      'No communication, so each person works independently',
      'Only written notes left for the next shift',
      'Verbal instructions given once at the start of the day',
      'Clear coordination between team members and other trades',
    ],
    correctAnswer: 3,
    explanation:
      'Complex testing requires clear communication to coordinate activities and maintain safety.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 272,
    question: 'Incident reporting in electrical work must include:',
    options: [
      'All incidents, near misses and safety observations',
      'Incidents resulting in an injury requiring hospital treatment',
      'Events that are reportable to the HSE under RIDDOR',
      'Anything the client has asked to be recorded contractually',
    ],
    correctAnswer: 0,
    explanation:
      'Comprehensive incident reporting including near misses helps prevent future accidents.',
  },
  {
    id: 273,
    question: 'What verification is required before recommissioning electrical systems?',
    options: [
      'Only a quick visual glance at the consumer unit',
      'Complete testing sequence and safety system verification',
      'No verification, as the system worked before',
      'Just confirming the supply voltage is present',
    ],
    correctAnswer: 1,
    explanation:
      'Recommissioning requires complete verification of all safety systems and testing sequences.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 274,
    question: 'Safety barriers during electrical testing must:',
    options: [
      'Be removed as soon as the first test is taken',
      'Only be used on three-phase installations',
      'Prevent unauthorised access and clearly indicate hazards',
      'Carry the fault current during a short circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Safety barriers must effectively control access and clearly communicate hazards to others.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 275,
    question: 'What consideration applies to electrical work in healthcare facilities?',
    options: [
      'No special consideration beyond a domestic install',
      'Only the reception and office areas need attention',
      'A reduced standard of earthing in clinical areas',
      'Patient safety, life support systems and infection control',
    ],
    correctAnswer: 3,
    explanation:
      'Healthcare facilities require consideration of patient safety, critical systems and infection control procedures.',
    difficulty: 'basic'
  },

  // Regulatory Updates & Standards (Questions 276-300)
  {
    id: 276,
    question: 'The 18th Edition of BS 7671 introduced new requirements for:',
    options: [
      'Arc fault detection devices (AFDD) in certain circumstances',
      'Mandatory rewireable fuses on all final circuits',
      'A reduction in the minimum insulation resistance value',
      'Removal of RCD protection from socket-outlets',
    ],
    correctAnswer: 0,
    explanation:
      'The 18th Edition introduced requirements for AFDDs in specific applications like sleeping accommodation.',
    difficulty: 'intermediate'
  },
  {
    id: 277,
    question: 'Amendment 2 to BS 7671:2018 updated requirements for:',
    options: [
      'The abolition of the ring final circuit entirely',
      'Electric vehicle charging and smart appliances',
      'A return to the 16th Edition cable colour codes',
      'The removal of all RCD requirements from dwellings',
    ],
    correctAnswer: 1,
    explanation:
      'Amendment 2 introduced specific requirements for EV charging and smart appliance considerations.',
    category: 'EV & Renewables',
    difficulty: 'basic'
  },
  {
    id: 278,
    question: 'Building Regulations Part P requires notification for:',
    options: [
      'Like-for-like replacement of a damaged socket front',
      'Replacing a single blown lamp in a light fitting',
      'New circuits, consumer unit changes and bathroom/kitchen work',
      'Resetting a tripped circuit breaker after a fault',
    ],
    correctAnswer: 2,
    explanation:
      'Part P requires notification for new circuits, consumer unit work and installations in special locations.',
    difficulty: 'basic'
  },
  {
    id: 279,
    question:
      'The Construction (Design and Management) Regulations affect electrical contractors by:',
    options: [
      'Setting the minimum cable sizes for final circuits',
      'Specifying the test sequence for initial verification',
      'Defining the maximum earth fault loop impedance values',
      'Requiring health and safety planning and coordination',
    ],
    correctAnswer: 3,
    explanation:
      'CDM regulations require health and safety planning, coordination and competency throughout construction.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 280,
    question: 'Competent person scheme registration requires:',
    options: [
      'Demonstrated competency, insurance and quality procedures',
      'Only a one-off payment of a registration fee',
      'Membership of any single trade union',
      'A minimum of twenty years served in the trade',
    ],
    correctAnswer: 0,
    explanation:
      'Scheme registration requires demonstrated competency, appropriate insurance and quality management systems.',
  },
  {
    id: 281,
    question: 'The latest surge protection requirements in BS 7671 apply to:',
    options: [
      'Most installations, unless specifically exempted',
      'Installations supplied by an overhead distribution line',
      'Three-phase commercial and industrial installations',
      'Installations on a TT earthing arrangement',
    ],
    correctAnswer: 0,
    explanation:
      'Current regulations require surge protection for most installations with specific exemption criteria.',
    difficulty: 'intermediate'
  },
  {
    id: 282,
    question: 'Professional indemnity insurance for electrical contractors must cover:',
    options: [
      'Design liability and consequential losses',
      'Theft of tools and equipment from a locked vehicle',
      'Damage occurring to the contractor\'s own premises',
      'Replacement of test instruments that fail calibration',
    ],
    correctAnswer: 0,
    explanation:
      'Professional indemnity insurance must cover design liability and potential consequential losses from electrical work.',
    difficulty: 'intermediate'
  },
  {
    id: 283,
    question: 'Continuing professional development (CPD) for electrical engineers requires:',
    options: [
      'A one-off qualification that never needs renewing',
      'Only attending a course after a serious incident',
      'Simply holding membership of a professional body',
      'Regular updating of knowledge and skills',
    ],
    correctAnswer: 3,
    explanation:
      'CPD requires ongoing development to maintain current knowledge and competency standards.',
    difficulty: 'intermediate'
  },
  {
    id: 284,
    question: 'The latest requirements for electric vehicle charging installations include:',
    options: [
      'Enhanced protection and load management systems',
      'A standard 13A socket with no additional protection',
      'A functional earth in place of a protective conductor',
      'Removal of RCD protection to avoid nuisance tripping',
    ],
    correctAnswer: 0,
    explanation:
      'EV charging requires enhanced protection including PEN fault detection and load management.',
    category: 'EV & Renewables',
    difficulty: 'intermediate'
  },
  {
    id: 285,
    question: 'Energy efficiency regulations affect electrical installations by requiring:',
    options: [
      'Oversized cables to reduce voltage drop on every circuit',
      'Efficient lighting and control systems',
      'A second independent supply to every dwelling',
      'Higher-rated protective devices throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Current regulations promote energy efficiency through efficient lighting and intelligent control systems.',
    difficulty: 'intermediate'
  },
  {
    id: 286,
    question: 'The Product Construction Regulation (CPR) affects electrical cables by:',
    options: [
      'Setting the minimum cross-sectional area of cables',
      'Specifying the colour code of cable cores',
      'Fire performance classification and CE marking',
      'Defining the maximum current rating of cables',
    ],
    correctAnswer: 2,
    explanation:
      'CPR requires fire performance classification and CE marking for construction cables.',
    difficulty: 'advanced'
  },
  {
    id: 287,
    question: 'Smart meter installation regulations require:',
    options: [
      'A dedicated earth electrode for every smart meter',
      'Mandatory arc fault detection on the meter tails',
      'A 1000V insulation test on the supply tails',
      'Communications testing and consumer protection',
    ],
    correctAnswer: 3,
    explanation:
      'Smart meter regulations require communications verification and consumer protection measures.',
    category: 'Inspection & Testing',
    difficulty: 'intermediate'
  },
  {
    id: 288,
    question: 'The latest accessibility requirements for electrical installations include:',
    options: [
      'Accessible heights for switches and controls',
      'Larger cable sizes for every final circuit',
      'A second consumer unit in every dwelling',
      'Higher insulation resistance on all circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Accessibility regulations specify appropriate heights and positions for electrical controls.',
    category: 'Design & Selection',
    difficulty: 'basic'
  },
  {
    id: 289,
    question: 'Environmental regulations affecting electrical work include:',
    options: [
      'The minimum earth fault loop impedance permitted',
      'Waste electrical equipment disposal and energy efficiency',
      'The colour coding used for protective conductors',
      'The test sequence for initial verification',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental regulations address WEEE disposal and energy efficiency requirements.',
    category: 'Inspection & Testing',
    difficulty: 'basic'
  },
  {
    id: 290,
    question: 'Data protection regulations affect electrical contractors through:',
    options: [
      'The earthing arrangement used at the customer\'s premises',
      'The cable colour codes recorded on the certificate',
      'Customer information handling and smart device data',
      'The calibration records of the test instruments',
    ],
    correctAnswer: 2,
    explanation:
      'Data protection regulations apply to customer information and smart device data handling.',
    difficulty: 'intermediate'
  },
  {
    id: 291,
    question: 'The latest fire safety regulations affect electrical installations by:',
    options: [
      'Removing all fire barriers to ease cable installation',
      'Reducing the number of emergency luminaires required',
      'A relaxation of cable support requirements in escape routes',
      'Enhanced fire stopping and emergency lighting requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Fire safety regulations require enhanced fire stopping and comprehensive emergency lighting.',
    difficulty: 'intermediate'
  },
  {
    id: 292,
    question: 'Electromagnetic compatibility (EMC) regulations require:',
    options: [
      'Equipment not to cause or be susceptible to interference',
      'Equipment to draw the same current on every phase',
      'Equipment to be earthed through a functional earth only',
      'Equipment to be tested at 1000V insulation voltage',
    ],
    correctAnswer: 0,
    explanation:
      "EMC regulations ensure equipment doesn't cause interference and operates correctly despite interference.",
    difficulty: 'intermediate'
  },
  {
    id: 293,
    question: 'The current requirements for electrical installation certificates include:',
    options: [
      'Comprehensive testing schedules and a signed declaration',
      'A pass or fail statement without the measured values',
      'Measured values, but no signature from the tester',
      'The client\'s name and the date the work was completed',
    ],
    correctAnswer: 0,
    explanation:
      'Current certificate requirements include detailed testing schedules and digital submission capabilities.',
    category: 'Certification & Reporting',
    difficulty: 'intermediate'
  },
  {
    id: 294,
    question: 'Low voltage directive compliance requires:',
    options: [
      'A dedicated earth electrode for each appliance',
      'A 1000V insulation test before sale',
      'CE marking and declaration of conformity',
      'Registration with the local distribution operator',
    ],
    correctAnswer: 2,
    explanation: "LVD compliance requires CE marking and manufacturer's declaration of conformity.",
    difficulty: 'intermediate'
  },
  {
    id: 295,
    question: 'The latest ventilation requirements affect electrical installations by:',
    options: [
      'A reduction in the cable sizes used for fan circuits',
      'The removal of RCD protection from extract fans',
      'A higher earth fault loop impedance limit for fans',
      'Integration with mechanical ventilation and air quality systems',
    ],
    correctAnswer: 3,
    explanation:
      'Ventilation regulations require integration with mechanical systems and air quality monitoring.',
    difficulty: 'intermediate'
  },
  {
    id: 296,
    question: 'Security system regulations require electrical installations to:',
    options: [
      'Tamper detection and backup power systems',
      'A three-phase supply to every detection device',
      'A dedicated earth electrode for the control panel',
      'A 1000V insulation test on all detector wiring',
    ],
    correctAnswer: 0,
    explanation:
      'Security systems require tamper detection and reliable backup power for effectiveness.',
    difficulty: 'basic'
  },
  {
    id: 297,
    question: 'The latest requirements for temporary electrical installations include:',
    options: [
      'Exemption from RCD protection on all socket-outlets',
      'Enhanced protection and frequent inspection schedules',
      'Less protection than a permanent installation needs',
      'A single inspection at the end of the project only',
    ],
    correctAnswer: 1,
    explanation:
      'Temporary installations require enhanced protection and more frequent inspection due to their nature.',
    difficulty: 'intermediate'
  },
  {
    id: 298,
    question: 'Medical electrical equipment installation requires:',
    options: [
      'A standard TN-C-S supply with no special bonding',
      'Removal of all RCD protection from patient areas',
      'IT earthing systems and supplementary bonding',
      'A single earth electrode shared with the lighting',
    ],
    correctAnswer: 2,
    explanation:
      'Medical locations require IT earthing systems and comprehensive supplementary bonding for patient safety.',
    category: 'Earthing & Bonding',
    difficulty: 'intermediate'
  },
  {
    id: 299,
    question: 'The current renewable energy regulations require:',
    options: [
      'A standard 13A plug-in connection to the supply',
      'No notification to the distribution operator',
      'A functional earth in place of grid protection',
      'Grid code compliance and export limitation',
    ],
    correctAnswer: 3,
    explanation:
      'Renewable installations must comply with grid codes and include appropriate export limitation.',
    difficulty: 'intermediate'
  },
  {
    id: 300,
    question: 'Electrical safety management systems must include:',
    options: [
      'Risk assessment, competency management and performance monitoring',
      'A register of the test instruments in use and their calibration',
      'A single annual inspection of the fixed installation',
      'A record of the operatives attending each site',
    ],
    correctAnswer: 0,
    explanation:
      'Comprehensive safety management requires risk assessment, competency management and performance monitoring systems.',
    difficulty: 'intermediate'
  },
  {
    id: 301,
    question: 'Which amendment to BS 7671:2018 is currently in force?',
    options: [
      'Amendment 4 (A4:2026)',
      'Amendment 3 (A3:2024)',
      'Amendment 2 (A2:2022)',
      'Amendment 1 (A1:2020)',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671:2018+A4:2026 is the current standard, published 15 April 2026. The 18th Edition has had four amendments in total: A1:2020, A2:2022, A3:2024 and A4:2026. The free PDF supplement issued on 31 July 2024 was Amendment 3, which is a frequent source of confusion.',
    difficulty: 'intermediate'
  },
  {
    id: 302,
    question: 'Which table gives minimum insulation resistance values and DC test voltages?',
    options: [
      'Table 41.1',
      'Table 64',
      'Table 3A',
      'Table 54.7',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64 gives 250 V DC and 0.5 MΩ for SELV and PELV, 500 V DC and 1.0 MΩ for circuits up to and including 500 V, and 1000 V DC and 1.0 MΩ above that. Older material refers to this as Table 61 — that numbering is superseded.',
    difficulty: 'intermediate'
  },
  {
    id: 303,
    question: 'What does R2 represent in the expression R1+R2?',
    options: [
      'The resistance of the neutral conductor',
      'The resistance of the second line conductor',
      'The resistance of the circuit protective conductor',
      'The external earth fault loop impedance',
    ],
    correctAnswer: 2,
    explanation:
      'R1 is the line conductor and R2 is the circuit protective conductor. Calling R2 the neutral is the most common error in this topic — the end-to-end neutral resistance is rn. R1+R2 is added to Ze to give Zs.',
    difficulty: 'intermediate'
  },
  {
    id: 304,
    question: 'Under Amendment 4, what happened to Table 3A of Appendix 3?',
    options: [
      'It now covers Type F devices',
      'It was moved into Appendix 14',
      'It was renumbered as Table 3B',
      'It was deleted',
    ],
    correctAnswer: 3,
    explanation:
      'Table 3A, the time/current performance criteria for RCDs, has been deleted. Verification is now an alternating current test at the rated residual operating current, IΔn, whatever the RCD type — a general non-delay device must operate within 300 ms.',
    difficulty: 'intermediate'
  },
  {
    id: 305,
    question: 'Which earthing arrangement uses a combined neutral and protective conductor in the supply?',
    options: [
      'TN-C-S',
      'TT',
      'IT',
      'TN-S',
    ],
    correctAnswer: 0,
    explanation:
      'TN-C-S, commonly called PME, combines the neutral and protective functions in a PEN conductor within the distributor\'s network, separating them at the origin of the installation. TN-S has separate conductors throughout, TT relies on an installation earth electrode, and IT has no direct earth connection at the source.',
    difficulty: 'intermediate'
  },
  {
    id: 306,
    question: 'Which regulation covers protective equipotential bonding of extraneous-conductive-parts to the main earthing terminal?',
    options: [
      'Regulation 411.3.1.1',
      'Regulation 411.3.1.2',
      'Regulation 411.3.2.2',
      'Regulation 543.2.9',
    ],
    correctAnswer: 1,
    explanation:
      '411.3.1.2 covers protective equipotential bonding. Its companion 411.3.1.1 covers protective earthing of exposed-conductive-parts, and 411.3.2.2 holds the maximum disconnection times. Conductor sizing for main bonding comes from 544.1.1.',
    difficulty: 'advanced'
  },
  {
    id: 307,
    question: 'What is the maximum operating time for a general non-delay 30 mA RCD tested at IΔn?',
    options: [
      '40 ms',
      '150 ms',
      '300 ms',
      '500 ms',
    ],
    correctAnswer: 2,
    explanation:
      '300 ms is the figure BS 7671 verifies against for a general non-delay device. The 40 ms often quoted is a device characteristic at five times IΔn from BS EN 61008/61009, not a BS 7671 test criterion. A Type S device operates between 130 and 500 ms.',
    difficulty: 'advanced'
  },
  {
    id: 308,
    question: 'In which part of BS 7671 are the requirements for inspection and testing found?',
    options: [
      'Part 4',
      'Part 5',
      'Part 7',
      'Part 6',
    ],
    correctAnswer: 3,
    explanation:
      'Part 6 covers inspection and testing, including Chapter 64 on initial verification. Part 4 is protection for safety, Part 5 is selection and erection of equipment, and Part 7 covers special installations or locations.',
    difficulty: 'advanced'
  },

  // ── Part 7 special locations (added 2026-08-07) ──────────────────────────
  // The category held ONE question, below the 5-question threshold for a topic
  // landing, on the site's highest-demand exam. Every figure is read off the
  // printed BS 7671:2018+A4:2026 — 702.410.3.4.1 zone SELV limits (and the
  // 702.410.3.4.2 fountain exception), 701.415.2 bonding, 705.411.1 RCDs.
  {
    id: 309,
    question: 'In zone 0 of a swimming pool, which protective measure is permitted?',
    options: [
      'SELV at not more than 12 V AC RMS or 30 V ripple-free DC, the source being outside zones 0, 1 and 2',
      'SELV at not more than 25 V AC RMS or 60 V ripple-free DC, the source being outside zones 0 and 1',
      'Automatic disconnection of supply with a 30 mA RCD and supplementary bonding throughout',
      'Electrical separation supplied by an isolating transformer mounted within zone 2 of the pool',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 702.410.3.4.1 states that, except for fountains, in zone 0 only protection by SELV at a nominal voltage not exceeding 12 V AC RMS or 30 V ripple-free DC is permitted, with the SELV source installed outside zones 0, 1 and 2.',
    difficulty: 'intermediate',
    topic: 'Swimming Pools',
    category: 'Special Locations',
  },
  {
    id: 310,
    question: 'In zone 1 of a swimming pool, what is the maximum SELV voltage permitted?',
    options: [
      '12 V AC RMS or 30 V ripple-free DC, matching the limit that applies in zone 0',
      '50 V AC RMS or 120 V ripple-free DC, the general SELV limit for dry locations',
      '25 V AC RMS or 60 V ripple-free DC, with the source installed outside zones 0, 1 and 2',
      '230 V, provided the circuit is protected by a 30 mA residual current device',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 702.410.3.4.1 states that, except for fountains, in zone 1 only protection by SELV at a nominal voltage not exceeding 25 V AC RMS or 60 V ripple-free DC is permitted, with the source installed outside zones 0, 1 and 2.',
    difficulty: 'advanced',
    topic: 'Swimming Pools',
    category: 'Special Locations',
  },
  {
    id: 311,
    question: 'Which regulation covers fountains, as distinct from the general swimming pool zone requirements?',
    options: [
      '702.410.3.4.1, which sets the requirements for zones 0 and 1 generally',
      '702.410.3.4.2, which is the exception referred to for fountains',
      '702.55, which deals with the selection of equipment for pool areas',
      '702.410.3.4.3, which covers zone 2 and the surrounding area',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 702.410.3.4.1 sets the zone 0 and zone 1 requirements \'except for fountains as stated in Regulation 702.410.3.4.2\'. Fountains are therefore dealt with separately at 702.410.3.4.2.',
    difficulty: 'advanced',
    topic: 'Swimming Pools',
    category: 'Special Locations',
  },
  {
    id: 312,
    question: 'In a room containing a bath or shower, what must supplementary protective equipotential bonding connect together?',
    options: [
      'The protective conductor terminals of each circuit supplying Class I and Class II equipment to accessible extraneous-conductive-parts',
      'The line and neutral conductors of every circuit entering the room, back to the main earthing terminal at the origin',
      'The metallic pipework only, since circuit protective conductors are already bonded at the board',
      'Every exposed-conductive-part in the room to a local earth electrode installed immediately outside the building',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 701.415.2 requires local supplementary protective equipotential bonding connecting together the terminals of the protective conductor of each circuit supplying Class I and Class II equipment to the accessible extraneous-conductive-parts, including metallic service and waste pipes and metallic central heating and air conditioning systems.',
    difficulty: 'advanced',
    topic: 'Bathrooms',
    category: 'Special Locations',
  },
  {
    id: 313,
    question: 'In agricultural premises, what protection is required for final circuits supplying socket-outlets rated at not more than 32 A?',
    options: [
      'An RCD with a rated residual operating current not exceeding 100 mA',
      'An RCD with the characteristics specified for additional protection',
      'A residual current monitor with an alarm, whatever the earthing system',
      'Overcurrent protection alone, provided supplementary bonding is installed',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 705.411.1 requires that, whatever the type of earthing system, final circuits supplying socket-outlets with a rated current not exceeding 32 A are provided with an RCD having the characteristics specified in Regulation 415.1.1.',
    difficulty: 'intermediate',
    topic: 'Agricultural',
    category: 'Special Locations',
  },
  {
    id: 314,
    question: 'In agricultural premises, what applies to final circuits supplying socket-outlets rated at more than 32 A?',
    options: [
      'An RCD with a rated residual operating current not exceeding 100 mA',
      'An RCD with a rated residual operating current not exceeding 30 mA',
      'An RCD with a rated residual operating current not exceeding 300 mA',
      'No residual current device, provided the circuit is monitored continuously',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 705.411.1 requires that final circuits supplying socket-outlets with a rated current of more than 32 A are protected by an RCD with a rated residual operating current not exceeding 100 mA, whatever the type of earthing system.',
    difficulty: 'advanced',
    topic: 'Agricultural',
    category: 'Special Locations',
  },
  {
    id: 315,
    question: 'Which Part 7 section covers conducting locations with restricted movement?',
    options: [
      'Section 704',
      'Section 706',
      'Section 708',
      'Section 709',
    ],
    correctAnswer: 1,
    explanation:
      'Part 7 Section 706 covers conducting locations with restricted movement. Section 704 is construction and demolition sites, 708 caravan and camping parks, and 709 marinas.',
    difficulty: 'intermediate',
    topic: 'Special Locations',
    category: 'Special Locations',
  },

  // ── Part 3, assessment of general characteristics (added 2026-08-07) ─────
  // The bank carried 3 Part 3 questions out of 315 on an exam covering the
  // whole of BS 7671. Read off the printed standard: 311.1 maximum demand and
  // diversity, 314.1 to 314.3 division of the installation.
  {
    id: 316,
    question: 'Why does BS 7671 require the maximum demand of an installation to be determined?',
    options: [
      'For economic and reliable design within thermal limits and admissible voltage drop',
      'To fix the size of the distributor\'s cut-out fuse and the metering equipment used',
      'To establish the prospective fault current at the origin of the installation',
      'To decide how many final circuits the consumer unit will need to accommodate',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 311.1 requires the maximum demand to be determined for economic and reliable design of an installation within thermal limits and admissible voltage drop.',
    difficulty: 'advanced',
    topic: 'Maximum Demand',
    category: 'Design & Selection',
  },
  {
    id: 317,
    question: 'When determining the maximum demand of an installation, what does Regulation 311.1 permit?',
    options: [
      'Diversity may be taken into account',
      'Only the connected load may be used',
      'A fixed 20 per cent margin must be added',
      'The distributor\'s declared figure must be used',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 311.1 states that in determining the maximum demand of an installation or part thereof, diversity may be taken into account.',
    difficulty: 'basic',
    topic: 'Maximum Demand',
    category: 'Design & Selection',
  },
  {
    id: 318,
    question: 'Regulation 314.1 requires every installation to be divided into circuits. For what two purposes?',
    options: [
      'To balance the load evenly across the three phases and to reduce the prospective fault current at the origin',
      'To avoid danger and minimize inconvenience on a fault, and to facilitate safe inspection, testing and maintenance',
      'To allow each circuit to be metered separately and to simplify the billing arrangements for the occupier',
      'To keep every final circuit under 100 A and to limit the number of points on each one',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 314.1 requires every installation to be divided into circuits, as necessary, to avoid danger and minimize inconvenience in the event of a fault, and to facilitate safe inspection, testing and maintenance.',
    difficulty: 'intermediate',
    topic: 'Division of Installation',
    category: 'Design & Selection',
  },
  {
    id: 319,
    question: 'Under Regulation 314.2, separate circuits must be provided for parts of an installation needing separate control. In what way?',
    options: [
      'So that each part can be isolated by its own lockable main switch at the origin',
      'So that those circuits are not affected by the failure of other circuits',
      'So that each part can be metered and its consumption recorded independently',
      'So that the load on each part never exceeds half the rating of its protective device',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 314.2 requires separate circuits to be provided for parts of the installation which need to be separately controlled, in such a way that those circuits are not affected by the failure of other circuits, with due account taken of the consequences of operation of any single protective device.',
    difficulty: 'intermediate',
    topic: 'Division of Installation',
    category: 'Design & Selection',
  },
  {
    id: 320,
    question: 'What governs the number of final circuits required and the number of points supplied by each?',
    options: [
      'The floor area of the premises and the number of rooms to be served from the distribution board',
      'The rating of the distributor\'s cut-out and the size of the supply tails installed',
      'Compliance with the requirements for overcurrent protection, isolation and switching, and current-carrying capacity',
      'The manufacturer\'s stated maximum for the consumer unit and the rating of its busbar arrangement',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 314.3 requires the number of final circuits, and the number of points supplied by any final circuit, to be such as to facilitate compliance with Chapter 43 for overcurrent protection, Chapter 46 and Section 537 for isolation and switching, and Chapter 52 as regards current-carrying capacities of conductors.',
    difficulty: 'advanced',
    topic: 'Division of Installation',
    category: 'Design & Selection',
  },
  {
    id: 321,
    question: 'Regulation 314.1(b) requires division into circuits to facilitate safe inspection, testing and maintenance. Which provisions does it cross-refer to?',
    options: [
      'Chapter 41 and Section 411, dealing with automatic disconnection of supply',
      'Chapter 52 and Section 523, dealing with current-carrying capacity',
      'Chapter 46 and Section 537, dealing with isolation and switching',
      'Chapter 44 and Section 443, dealing with overvoltage protection',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 314.1(b) requires division into circuits to facilitate safe inspection, testing and maintenance, and cross-refers to Chapter 46 and Section 537, which deal with isolation and switching.',
    difficulty: 'intermediate',
    topic: 'Division of Installation',
    category: 'Design & Selection',
  },
  {
    id: 322,
    question:
      'In BS 7671:2018+A4:2026 the revised Regulation 411.3.3 applies RCD protection to socket-outlets up to which rated current?',
    options: [
      'Socket-outlets with a rated current not exceeding 32 A',
      'Socket-outlets with a rated current not exceeding 20 A',
      'Socket-outlets with a rated current not exceeding 63 A',
      'Socket-outlets with a rated current not exceeding 16 A',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 411.3.3 was revised in A4:2026 and now applies specifically to socket-outlets with a rated current not exceeding 32 A. Socket-outlets rated above 32 A fall outside its scope and must be assessed against other applicable regulations.',
    difficulty: 'advanced',
    topic: 'RCD Protection of Socket-Outlets',
    category: 'Protection & Devices',
  },
  {
    id: 323,
    question:
      'Under the revised Regulation 411.3.3, in what circumstances may RCD protection be omitted from a 13 A socket-outlet?',
    options: [
      'Where the socket-outlet in a dwelling is labelled for one appliance',
      'Where, other than in a dwelling, a documented risk assessment applies',
      'Where the circuit is supplied through a separate isolating transformer',
      'Where the socket-outlet is under the supervision of a skilled person',
    ],
    correctAnswer: 1,
    explanation:
      'The exception permits omission only where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary. The assessment must be specific to that installation and retained as a record. Supervision by a skilled person is superseded wording and never applied to dwellings.',
    difficulty: 'advanced',
    topic: 'RCD Protection of Socket-Outlets',
    category: 'Protection & Devices',
  },
  {
    id: 324,
    question:
      'What status does Regulation 421.1.7 give to arc fault detection devices (AFDDs) in AC final circuits?',
    options: [
      'They are required in all final circuits of higher risk premises',
      'They are required in every AC final circuit of a fixed installation',
      'They are recommended to mitigate the risk of fire in those circuits',
      'They are permitted where the designer records a written assessment',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 421.1.7 recommends the installation of AFDDs to mitigate the risk of fire in AC final circuits arising from the effects of arc fault currents. The wording is advisory: it recommends rather than requires, so an AFDD is not mandated by this regulation.',
    difficulty: 'intermediate',
    topic: 'Arc Fault Detection Devices',
    category: 'Protection & Devices',
  },
  {
    id: 325,
    question:
      'To which circuits is the AFDD recommendation in Regulation 421.1.7 directed?',
    options: [
      'Distribution circuits feeding a submain or subsidiary board',
      'DC circuits within a battery energy storage installation',
      'Generation circuits between an inverter and the board',
      'AC final circuits of a fixed electrical installation',
    ],
    correctAnswer: 3,
    explanation:
      'The recommendation in Regulation 421.1.7 is expressly directed at AC final circuits of a fixed installation. It does not extend to upstream distribution circuits, to generation circuits, or to DC circuits.',
    difficulty: 'intermediate',
    topic: 'Arc Fault Detection Devices',
    category: 'Protection & Devices',
  },
  {
    id: 326,
    question:
      'Which risk is an arc fault detection device intended to address under Regulation 421.1.7?',
    options: [
      'Fire caused by the effects of arc fault currents in a circuit',
      'Electric shock from direct contact with a live conductor',
      'Overvoltage reaching equipment after a lightning strike',
      'Overload heating caused by too many appliances in use',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 421.1.7 sits in Chapter 42, protection against thermal effects, and recommends AFDDs specifically to mitigate the risk of fire due to the effects of arc fault currents. Shock protection is Chapter 41, overvoltage is Chapter 44 and overload is Chapter 43.',
    difficulty: 'basic',
    topic: 'Arc Fault Detection Devices',
    category: 'Protection & Devices',
  },
  {
    id: 327,
    question: 'What does the new Chapter 57 of BS 7671:2018+A4:2026 cover?',
    options: [
      'Portable battery packs supplied with an item of equipment',
      'Stationary secondary battery installations for storage',
      'Traction batteries fitted within electric road vehicles',
      'Primary cells used to power fire detection equipment',
    ],
    correctAnswer: 1,
    explanation:
      'A new Chapter 57 was introduced by A4:2026 in Part 5, dealing with stationary secondary battery installations where the designed purpose is storage and supply of electrical installations. Batteries not designed for that purpose fall outside its intended scope.',
    difficulty: 'intermediate',
    topic: 'Stationary Secondary Batteries',
    category: 'EV & Renewables',
  },
  {
    id: 328,
    question: 'Which battery installation falls outside the scope of Chapter 57?',
    options: [
      'A lithium battery mounted outdoors beside a domestic array',
      'A lead-acid battery bank standing in a plant room cabinet',
      'A battery inside a pluggable UPS covered by its own standard',
      'A battery cabinet supplying a small commercial building',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 57 does not apply to stationary secondary batteries incorporated into products covered by product safety standards, and a pluggable UPS is given as an example. Designers of such products follow the applicable product standard instead of Chapter 57.',
    difficulty: 'advanced',
    topic: 'Stationary Secondary Batteries',
    category: 'EV & Renewables',
  },
  {
    id: 329,
    question: 'Chapter 57 does not apply to batteries within which of these systems?',
    options: [
      'Off-grid battery supplies for a remote dwelling',
      'Battery storage paired with a rooftop PV array',
      'Standby battery supplies in a data centre room',
      'Fire alarm and emergency lighting systems',
    ],
    correctAnswer: 3,
    explanation:
      'The scope exclusions in Chapter 57 cover batteries within fire and emergency lighting systems, pluggable UPS, and central safety power supply systems conforming to their appropriate standards. Storage batteries serving an installation remain within scope.',
    difficulty: 'advanced',
    topic: 'Stationary Secondary Batteries',
    category: 'EV & Renewables',
  },
  {
    id: 330,
    question: 'What does Regulation 521.10.202 give requirements for?',
    options: [
      'The methods of support used for wiring systems',
      'The bending radii permitted for armoured cables',
      'The depth at which cables in walls are buried',
      'The spacing between cables grouped in a tray',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 521.10.202 in Part 5, Chapter 52 gives requirements for the methods of support of wiring systems, covering the fixings and arrangements by which a wiring system is supported and secured within an installation.',
    difficulty: 'intermediate',
    topic: 'Support of Wiring Systems',
    category: 'Cables & Containment',
  },
  {
    id: 331,
    question:
      'On what basis may an inspector accept the supports of a wiring system as compliant?',
    options: [
      'The fixings are of metal and were installed by a competent person',
      'The supports demonstrably meet the requirements of Reg 521.10.202',
      'The cables are clipped at intervals given in the manufacturer data',
      'The containment carries a CE or UKCA mark from its manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'Acceptance rests on the method of support demonstrably meeting the requirements given in Regulation 521.10.202. Evidence can include drawings, schedules of fixings, product specifications for support fittings and site inspection confirming correct implementation.',
    difficulty: 'advanced',
    topic: 'Support of Wiring Systems',
    category: 'Cables & Containment',
  },
  {
    id: 332,
    question:
      'Regulation 110.1.2 states that the Regulations include requirements for circuits supplied at nominal voltages up to and including which values?',
    options: ['400 V AC or 600 V DC', '230 V AC or 500 V DC', '1000 V AC or 1500 V DC', '1500 V AC or 1000 V DC'],
    correctAnswer: 2,
    explanation:
      'Regulation 110.1.2 sets the voltage limits of the main body of BS 7671 at nominal voltages up to and including 1000 V AC or 1500 V DC, unless stated otherwise within the Regulations themselves.',
    difficulty: 'intermediate',
    topic: 'Scope of BS 7671',
    category: 'Design & Selection',
  },
  {
    id: 333,
    question: 'Which statement about Power over Ethernet is correct under BS 7671?',
    options: [
      'PoE is excluded because it carries data as well as power',
      'PoE is covered instead by the network cabling standards',
      'PoE falls outside scope as it is a band I ELV system',
      'PoE installations are within the scope of the Regulations',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 110.1.1 confirms that the Regulations apply to the design, erection and verification of Power over Ethernet installations. Carrying data alongside power does not remove a system from the scope of BS 7671.',
    difficulty: 'basic',
    topic: 'Scope of BS 7671',
    category: 'Design & Selection',
  },
  {
    id: 334,
    question:
      'What does Regulation 132.15.201 require to be provided for every installation and every circuit?',
    options: [
      'A device that disconnects the supply automatically on a fault',
      'Effective means, suitably placed, to cut off all voltage',
      'A warning notice stating the voltage present at the origin',
      'A lockable enclosure around every item of fixed equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 132.15.201 requires effective means, suitably placed for ready operation, so that all voltage may be cut off from every installation, from every circuit and from all equipment as necessary to prevent or remove danger.',
    difficulty: 'intermediate',
    topic: 'Isolation and Switching',
    category: 'Safe Isolation',
  },
  {
    id: 335,
    question: 'Regulation 132.15.202 requires every fixed electric motor to be provided with what?',
    options: [
      'An overload device set at the full-load current of the motor',
      'A star-delta starter to limit the current drawn on starting',
      'An efficient means of switching off, placed to prevent danger',
      'A local isolator fitted with a padlockable rotary handle',
    ],
    correctAnswer: 2,
    explanation:
      'Every fixed electric motor must have an efficient means of switching off, and that means shall be so placed as to prevent danger, for example away from moving parts or hazardous processes. A motor permanently installed as part of the installation is a fixed motor.',
    difficulty: 'intermediate',
    topic: 'Isolation and Switching',
    category: 'Design & Selection',
  },
  {
    id: 336,
    question:
      'For a low voltage supply given in accordance with the ESQCR, what value does BS 7671 give to the minimum voltage factor Cmin?',
    options: ['0.95', '0.80', '1.00', '0.90'],
    correctAnswer: 0,
    explanation:
      'Cmin is the minimum voltage factor accounting for voltage variations with time and place, transformer tap changes and similar effects. For a low voltage supply given under the ESQCR, Cmin is given the value 0.95. The 0.80 figure is the separate rule-of-thumb factor applied to measured values.',
    difficulty: 'advanced',
    topic: 'Earth Fault Loop Impedance',
    category: 'Inspection & Testing',
  },
  {
    id: 337,
    question:
      'Which expression gives the maximum earth fault loop impedance used in Regulations 411.4.4 to 411.5.4?',
    options: ['Zs = Up / (Ia * Cmin)', 'Zs = Up * Cmin / Ia', 'Zs = Up / (Ia * 0.8)', 'Zs = Up * Ia / Cmin'],
    correctAnswer: 1,
    explanation:
      'The maximum earth fault loop impedance is Zs = Up * Cmin / Ia, where Up is the nominal line-to-earth voltage, Ia is the current causing operation of the protective device within the required time and Cmin is the minimum voltage factor.',
    difficulty: 'advanced',
    topic: 'Earth Fault Loop Impedance',
    category: 'Inspection & Testing',
  },
  {
    id: 338,
    question:
      'How should a value of Zs measured at ambient temperature be compared with the requirement of Regulation 411.4.4?',
    options: [
      'It must be below Up divided by Ia with no correction used',
      'It must be below 1.2 times the tabulated maximum value',
      'It must equal the tabulated value multiplied by Cmin',
      'It must be below 0.8 times Up divided by Ia and Cmin',
    ],
    correctAnswer: 3,
    explanation:
      'The requirement is treated as met where the measured value satisfies Zs(m) < 0.8 x (Up / (Ia x Cmin)). The 0.8 factor corrects an ambient-temperature measurement for the higher conductor temperature reached under fault conditions.',
    difficulty: 'advanced',
    topic: 'Earth Fault Loop Impedance',
    category: 'Inspection & Testing',
  },
  {
    id: 339,
    question:
      'Regulation 133.1.3 has been modified so that certain usage of equipment must be:',
    options: [
      'Recorded on the appropriate electrical certification',
      'Agreed in writing with the distributor before work',
      'Marked on a label fixed inside the consumer unit',
      'Declared to the building control body on completion',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 133.1.3 now requires certain usage of equipment to be recorded on the appropriate electrical certification specified in Part 6. The duty is not blanket: it is triggered where BS 7671 identifies the particular usage as one to be recorded.',
    difficulty: 'intermediate',
    topic: 'Selection of Equipment',
    category: 'Certification & Reporting',
  },
  {
    id: 340,
    question:
      'How must the type and rating of the overcurrent protective device at the origin be established?',
    options: [
      'By assuming the standard value for the premises type',
      'By reading the rating plate on the service cut-out fuse',
      'By reference to the last certificate issued for the site',
      'By calculation, measurement, enquiry or inspection',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 312.3 requires the type and rating of the overcurrent protective device acting at the origin to be determined for each supply or source by calculation, measurement, enquiry or inspection. Supply characteristics may not simply be assumed.',
    difficulty: 'intermediate',
    topic: 'Assessment of General Characteristics',
    category: 'Design & Selection',
  },
  {
    id: 341,
    question:
      'When need a metallic service pipe entering a building not be connected to the protective equipotential bonding?',
    options: [
      'Where the pipe is supplied through a plastic underground main',
      'Where an insulating section is fitted at its point of entry',
      'Where the pipe serves no electrical equipment in the building',
      'Where the pipe is bonded to the structural steel of the frame',
    ],
    correctAnswer: 1,
    explanation:
      'Metallic pipes entering a building that have an insulating section at their point of entry need not be connected to the protective equipotential bonding. The insulating section must be at the entry point; if it is elsewhere, the condition for omitting the bond is not met.',
    difficulty: 'advanced',
    topic: 'Protective Equipotential Bonding',
    category: 'Earthing & Bonding',
  },
  {
    id: 342,
    question:
      'Currents in parallel conductors are treated as unequal when the difference between them is what?',
    options: [
      'More than 10% of the design current for each',
      'More than 5% of the design current for each',
      'More than 20% of the design current for each',
      'More than 30% of the design current for each',
    ],
    correctAnswer: 0,
    explanation:
      'The note to Regulation 433.4.2 sets the threshold at more than 10% of the design current for each conductor. Where the sharing is unequal beyond that, the simplified approach cannot be used; Appendix 10, Item 2 gives the calculation guidance.',
    difficulty: 'advanced',
    topic: 'Parallel Conductors',
    category: 'Design & Selection',
  },
  {
    id: 343,
    question: 'What does the new Chapter 46 introduced into BS 7671 deal with?',
    options: [
      'Automatic disconnection of a supply on an earth fault',
      'Protection of wiring systems against thermal effects',
      'Non-automatic local and remote isolation and switching',
      'Coordination of protective devices for selectivity',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 46 covers non-automatic local and remote isolation and switching measures for the prevention or removal of dangers associated with an installation or with electrically powered equipment. Automatic disconnection remains the subject of Chapter 41.',
    difficulty: 'intermediate',
    topic: 'Isolation and Switching',
    category: 'Safe Isolation',
  },
  {
    id: 344,
    question:
      'An installation is not covered by the specific criteria in Regulation 443.4(a) to (d). What does BS 7671 then require?',
    options: [
      'An SPD must be fitted at the origin in every case',
      'A risk assessment to decide if protection is needed',
      'A declaration by the installer that risk is tolerable',
      'A calculation of the conventional length of the line',
    ],
    correctAnswer: 1,
    explanation:
      'For all other cases, Regulation 443.4 requires a risk assessment to determine whether protection against transient overvoltage is needed. The assessment weighs the likelihood of transient overvoltages against the consequences of them occurring.',
    difficulty: 'advanced',
    topic: 'Transient Overvoltage Protection',
    category: 'Protection & Devices',
  },
  {
    id: 345,
    question:
      'An owner declares that protection against transient overvoltage is not required. What should be done with that decision?',
    options: [
      'The installer must still fit a Type 2 SPD at the board',
      'The declaration applies to a safety service as well',
      'The circuits concerned are then coded C3 on a report',
      'The declaration is recorded and kept with the records',
    ],
    correctAnswer: 3,
    explanation:
      'Where an owner declares under Regulation 443.4.1 that transient overvoltage protection is not required, the declaration should be recorded and retained with the installation documentation and certification, evidencing acceptance of the tolerable loss.',
    difficulty: 'advanced',
    topic: 'Transient Overvoltage Protection',
    category: 'Certification & Reporting',
  },
  {
    id: 346,
    question: 'Which equipment is given as likely to produce switching overvoltages?',
    options: [
      'Motors, transformers and capacitor banks',
      'Filament lamps and resistive heaters',
      'Socket-outlets serving portable tools',
      'Emergency luminaires and exit signs',
    ],
    correctAnswer: 0,
    explanation:
      'Inductive or capacitive equipment such as motors, transformers, capacitor banks, storage units, high current loads and variable speed drives is given as likely to produce switching overvoltages or disturbances exceeding rated impulse voltages.',
    difficulty: 'intermediate',
    topic: 'Transient Overvoltage Protection',
    category: 'Protection & Devices',
  },
  {
    id: 347,
    question:
      'Where are the applicable rated impulse voltage values for equipment selection and SPD coordination given?',
    options: ['Table 41.3 of Chapter 41', 'Table 443.2 of Chapter 44', 'Table 54.7 of Chapter 54', 'Table 4Ab of Appendix 4'],
    correctAnswer: 1,
    explanation:
      'Regulation 443.4.2 refers to disturbances exceeding the applicable rated impulse voltage of equipment according to Table 443.2, which is where the values for equipment selection and SPD coordination are taken from.',
    difficulty: 'intermediate',
    topic: 'Transient Overvoltage Protection',
    category: 'Protection & Devices',
  },
  {
    id: 348,
    question: 'What does the impulse discharge current Iimp of a surge protective device describe?',
    options: [
      'The current the SPD passes to earth in normal use',
      'The current at which the SPD begins to conduct fully',
      'The maximum single impulse current it can withstand',
      'The current the upstream device must clear on failure',
    ],
    correctAnswer: 2,
    explanation:
      'Iimp is the maximum single impulse current an SPD can withstand, referenced to a standard impulse waveform. It is one of the parameters to be considered when selecting an SPD.',
    difficulty: 'advanced',
    topic: 'Surge Protective Devices',
    category: 'Protection & Devices',
  },
  {
    id: 349,
    question: 'Why must the connecting conductors of an SPD be kept as short as possible?',
    options: [
      'Long conductors raise the earth fault loop impedance value',
      'Long conductors reduce the follow current the SPD passes',
      'Long conductors alter the rated impulse voltage of the SPD',
      'Each metre at 10 kA adds roughly 1000 V of voltage drop',
    ],
    correctAnswer: 3,
    explanation:
      'A note in Chapter 53 records that a 1 m length of conductor carrying a discharge current of 10 kA (8/20) adds a voltage drop of about 1000 V. That added voltage is in series with the SPD and worsens the voltage protection level seen by the equipment.',
    difficulty: 'advanced',
    topic: 'Surge Protective Devices',
    category: 'Protection & Devices',
  },
  {
    id: 350,
    question:
      'Where should a Type 2 SPD be installed to satisfy the requirement to be as close as possible to the origin?',
    options: [
      'At the origin or adjacent to the main distribution board',
      'At the final socket-outlet of each protected circuit',
      'Downstream of the first RCD in the consumer unit',
      'Within the meter cabinet on the distributor side',
    ],
    correctAnswer: 0,
    explanation:
      'The acceptance criterion is a Type 2 SPD installed at the origin or adjacent to the consumer unit or main distribution board, with evidence such as a photograph or drawing showing its location relative to the incoming supply point.',
    difficulty: 'intermediate',
    topic: 'Surge Protective Devices',
    category: 'Protection & Devices',
  },
  {
    id: 351,
    question: 'Which residual current must a Type F RCD trip for, beyond the duties of a Type A?',
    options: [
      'Alternating residual current at the rated tripping value',
      'Pulsating DC superimposed on a smooth direct current',
      'Smooth direct residual current above 6 mA in the load',
      'Residual current at frequencies below the supply value',
    ],
    correctAnswer: 1,
    explanation:
      'A Type F RCD must achieve tripping for residual pulsating direct currents superimposed on a smooth direct current. This capability sits above Type A and is intended to improve immunity where power electronic loads are supplied.',
    difficulty: 'advanced',
    topic: 'RCD Types',
    category: 'Protection & Devices',
  },
  {
    id: 352,
    question: 'How is zone 1 of a sauna defined in relation to the heater?',
    options: [
      'The volume within 0.6 m of the door and its frame',
      'The volume above the heater to the ceiling surface',
      'The volume within 0.5 m of the heater surface',
      'The volume within 1.2 m of the heater surface',
    ],
    correctAnswer: 2,
    explanation:
      'Sauna zone 1 is the volume containing the heater, limited by the floor, the cold side of the thermal insulation of the ceiling, and a vertical surface circumscribing the heater at 0.5 m from its surface.',
    difficulty: 'advanced',
    topic: 'Saunas',
    category: 'Special Locations',
  },
  {
    id: 353,
    question:
      'Which pair of protective measures may not be used in the special locations covered by Chapter 70?',
    options: [
      'Non-conducting location and earth-free bonding',
      'Automatic disconnection and supplementary bonding',
      'SELV and PELV supplied from a safety transformer',
      'Double insulation and reinforced insulation of parts',
    ],
    correctAnswer: 0,
    explanation:
      'The protective measures of non-conducting location, Regulation 418.1, and earth-free local equipotential bonding, Regulation 418.2, shall not be used in the special installations or locations of Chapter 70. An inspector who finds protection relying on non-conductive surfaces must record non-compliance.',
    difficulty: 'advanced',
    topic: 'Special Locations',
    category: 'Special Locations',
  },
  {
    id: 354,
    question:
      'In a conducting location with restricted movement, reliance on which protective measures is prohibited?',
    options: [
      'Electrical separation and the use of an isolating transformer',
      'Obstacles and placing out of reach, as given in Section 417',
      'Automatic disconnection using a 30 mA residual current device',
      'Supplementary bonding of simultaneously accessible parts',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 706.410.3.5 states that the protective measures of obstacles and placing out of reach, given in Section 417, shall not be used. Placing out of reach relies on distance or height keeping live parts inaccessible, which cannot be relied on where movement is restricted.',
    difficulty: 'intermediate',
    topic: 'Restricted Conducting Locations',
    category: 'Special Locations',
  },
  {
    id: 355,
    question:
      'Which height forms the horizontal plane at the upper limit of zones 1 and 2 at a swimming pool?',
    options: ['2.00 m', '3.00 m', '1.50 m', '2.50 m'],
    correctAnswer: 3,
    explanation:
      'Regulation 702.4 uses 2.50 m as the height of the horizontal plane forming the upper limit of the zones, measured from the floor or the surface expected to be occupied by persons.',
    difficulty: 'basic',
    topic: 'Swimming Pool Zones',
    category: 'Special Locations',
  },
  {
    id: 356,
    question: 'What must be done where a cable is installed at a water depth greater than 10 m?',
    options: [
      'The cable manufacturer shall be consulted on suitability',
      'The circuit shall be supplied at SELV not exceeding 12 V',
      'The cable shall be enclosed in a steel wire armour sheath',
      'The circuit shall be protected by a 10 mA device instead',
    ],
    correctAnswer: 0,
    explanation:
      'For depths of water greater than 10 m the cable manufacturer must be consulted about the suitability of the chosen cable and any additional requirements. The consultation is mandatory once that depth is exceeded.',
    difficulty: 'intermediate',
    topic: 'Swimming Pools and Fountains',
    category: 'Special Locations',
  },
  {
    id: 357,
    question:
      'How must a final circuit intended for fixed connection to a houseboat be protected?',
    options: [
      'By one RCD shared across the whole distribution board',
      'Individually, by an RCD with the specified characteristics',
      'By an overcurrent device selected for the mooring load',
      'By an isolating transformer at the head of the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 709.531.2 requires final circuits intended for fixed connection supplying houseboats to be protected individually by an RCD having the characteristics specified in Regulation 415.1.1. A single shared RCD does not meet the requirement.',
    difficulty: 'intermediate',
    topic: 'Marinas and Houseboats',
    category: 'Special Locations',
  },
  {
    id: 358,
    question:
      'Why may the lowest part of a socket-outlet on a caravan park be placed higher than 1.5 m?',
    options: [
      'To keep it out of reach of children on the site',
      'To allow a longer flexible cable to be used safely',
      'Because of flooding or heavy snow at the location',
      'To keep it above the level of any vehicle exhaust',
    ],
    correctAnswer: 2,
    explanation:
      'The note to Regulation 708.55.1.6 gives caravan and camping parks as examples where exceeding 1.5 m can be necessary because of flooding or heavy snow. The examples guide practice but do not limit the special cases to those two locations.',
    difficulty: 'intermediate',
    topic: 'Caravan and Camping Parks',
    category: 'Special Locations',
  },
  {
    id: 359,
    question:
      'On a construction site, which regulation is stated not to apply to a circuit supplying socket-outlets rated above 32 A?',
    options: [
      'Regulation 411.3.3 of Chapter 41',
      'Regulation 415.2 of Chapter 41',
      'Regulation 421.1.7 of Chapter 42',
      'Regulation 411.3.2.5 of Chapter 41',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 704.411.3.2.1 states expressly that for any circuit supplying one or more socket-outlets with a rated current exceeding 32 A, Regulation 411.3.2.5 is not applicable. It is an explicit exception rather than a relaxation to be judged case by case.',
    difficulty: 'advanced',
    topic: 'Construction Sites',
    category: 'Special Locations',
  },
  {
    id: 360,
    question: 'What change did A4:2026 make to Section 710 for medical locations?',
    options: [
      'Table 710 was removed from the section',
      'Group 2 locations were taken out of it',
      'The section was renumbered as 712',
      'IT systems were banned in theatres',
    ],
    correctAnswer: 0,
    explanation:
      'Among the small changes in A4:2026, Table 710 was removed from Section 710. Where that table previously carried tabulated information, the amended textual requirements of Section 710 must now be consulted instead.',
    difficulty: 'basic',
    topic: 'Medical Locations',
    category: 'Special Locations',
  },
  {
    id: 361,
    question:
      'In a livestock location where feeding and watering take place, what must the equipment enclosures suit?',
    options: [
      'Ambient temperatures above 40 degrees Celsius',
      'Wet and dirty conditions, and easy cleaning',
      'Direct sunlight and ultraviolet degradation',
      'Impact from vehicles used on the holding',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 705.513.2 requires equipment in livestock environments where feeding and watering occur to be installed in enclosures suitable for wet and dirty conditions, with ingress protection and cleanability appropriate to the environment.',
    difficulty: 'basic',
    topic: 'Agricultural Locations',
    category: 'Special Locations',
  },
  {
    id: 362,
    question:
      'What does Regulation 644.4.202 address in relation to Electrical Installation Certificates?',
    options: [
      'The minimum period for which they must be retained',
      'The qualifications required of the person signing',
      'The formats permitted and verifying authenticity',
      'The fee that may be charged for issuing a copy',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 644.4.202 deals with the formats in which certificates may be provided and the need for authenticity and integrity to be reliably verified. It is silent on how long originals or copies must be kept.',
    difficulty: 'intermediate',
    topic: 'Certification',
    category: 'Certification & Reporting',
  },
  {
    id: 363,
    question:
      'Which work removes the option of issuing a Minor Electrical Installation Works Certificate?',
    options: [
      'Adding one socket-outlet to an existing ring final',
      'Replacing a damaged accessory on a lighting circuit',
      'Adding a spur to feed an outdoor lighting bollard',
      'Replacing the consumer unit or distribution board',
    ],
    correctAnswer: 3,
    explanation:
      'The permission to use a Minor Works Certificate applies only where the work does not include replacement of a distribution board or consumer unit. That work requires a full Electrical Installation Certificate instead.',
    difficulty: 'intermediate',
    topic: 'Certification',
    category: 'Certification & Reporting',
  },
  {
    id: 364,
    question: 'Under Regulation 641.4, what must happen once inspection and testing is complete?',
    options: [
      'The instruments used must be recalibrated on site',
      'The final circuits must be left isolated overnight',
      'Temporary links and jumpers must all be removed',
      'The results must be sent to the local authority',
    ],
    correctAnswer: 2,
    explanation:
      'Precautions must avoid danger to persons and livestock and damage to property, which includes returning circuits and equipment to a safe condition and removing any temporary measures such as bridges, jumpers and isolation tags after testing.',
    difficulty: 'basic',
    topic: 'Test Precautions',
    category: 'Inspection & Testing',
  },
  {
    id: 365,
    question: 'Between which points is insulation resistance measured under Regulation 643.3.1?',
    options: [
      'Between live conductors, and live to protective conductor',
      'Between the line conductor and the earth electrode only',
      'Between each live conductor and the nearest metal pipe',
      'Between the protective conductor and the main earth bar',
    ],
    correctAnswer: 0,
    explanation:
      'Insulation resistance is measured between live conductors and between live conductors and the protective conductor. Both sets of values are recorded on the Schedule of Test Results to demonstrate compliance with the required limits.',
    difficulty: 'intermediate',
    topic: 'Insulation Resistance',
    category: 'Inspection & Testing',
  },
  {
    id: 366,
    question: 'What determines whether periodic inspection and testing has to be carried out?',
    options: [
      'The interval printed on the previous condition report',
      'The age of the installation reaching ten years of use',
      'The insurer of the premises asking for a fresh report',
      'Requirements set elsewhere in BS 7671 or in statute',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 651.1 is qualified by the words where required, so the duty is conditional on requirements set out elsewhere in BS 7671, in statutory instruments or in codes of practice, rather than arising automatically from the age of an installation.',
    difficulty: 'advanced',
    topic: 'Periodic Inspection',
    category: 'Inspection & Testing',
  },
  {
    id: 367,
    question:
      'During initial verification, what may be used as evidence that equipment complies with Section 511?',
    options: [
      'A visual check that the equipment carries a CE mark',
      'A certification furnished by the equipment maker',
      'A statement of the design current on the schedule',
      'A record of the supply characteristics at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 642.2(a) permits certification furnished by the manufacturer to be used when ascertaining compliance with Section 511 during inspection. That certification should state conformity with the relevant requirements of Section 511.',
    difficulty: 'advanced',
    topic: 'Initial Verification',
    category: 'Inspection & Testing',
  },
  {
    id: 368,
    question: 'For which conductors must the single colour green not be used?',
    options: [
      'Line conductors of a three-phase final circuit',
      'Neutral conductors within a distribution board',
      'Functional earthing and bonding conductors',
      'Bare protective conductors within an enclosure',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 514.4.5 states that the single colour green shall not be used for the identification of functional earthing and bonding conductors. Green combined with yellow remains the identification for protective conductors.',
    difficulty: 'basic',
    topic: 'Identification of Conductors',
    category: 'Cables & Containment',
  },
  {
    id: 369,
    question: 'What does the instruction notice required at an RCD tell the user to do?',
    options: [
      'Press the test button, then switch the device on',
      'Press the test button once every twelve months',
      'Call the installer before operating the device',
      'Record each test in a log kept at the premises',
    ],
    correctAnswer: 0,
    explanation:
      'The notice sets out that pressing the test button should operate the device, after which it is manually switched back on. If the device fails to operate or indicates a fault, the user is told to seek expert advice.',
    difficulty: 'basic',
    topic: 'Notices and Labelling',
    category: 'Certification & Reporting',
  },
  {
    id: 370,
    question:
      'A separable transformer supplies two machine tools using electrical separation. What does Regulation 514.13.2 require?',
    options: [
      'A residual current device in each secondary circuit',
      'An earth electrode connected to the secondary side',
      'A label giving the maximum load of the transformer',
      'A warning notice at every point of access to the room',
    ],
    correctAnswer: 3,
    explanation:
      'Where electrical separation is used to supply more than one item of equipment, a warning notice complying with Regulation 514.13.2 must be fixed in a prominent position adjacent to every point of access to the room or enclosure concerned.',
    difficulty: 'intermediate',
    topic: 'Notices and Labelling',
    category: 'Design & Selection',
  },
  {
    id: 371,
    question: 'Why must the results of testing be compared with the relevant criteria?',
    options: [
      'It sets the interval before the next inspection',
      'It confirms the instrument was within calibration',
      'It is the basis for issuing certificates and reports',
      'It fixes the code allocated to each observation',
    ],
    correctAnswer: 2,
    explanation:
      'The note to Regulation 641.3 makes the comparison of results with the relevant criteria the basis on which certificates, schedules of test results and reports are issued. Without that documented comparison, compliance cannot reliably be claimed.',
    difficulty: 'intermediate',
    topic: 'Verification',
    category: 'Inspection & Testing',
  },
];

// Enhanced function to get random questions with improved distribution
export const getRandomMockExamQuestions = (questionCount: number = 30): QuizQuestion[] => {
  const shuffled = [...mockExamQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, questionCount);
};
