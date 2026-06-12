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
  },
  {
    id: 2,
    question:
      'Which regulation requires that circuits supplying portable outdoor equipment be RCD protected?',
    options: ['Regulation 314.1', 'Regulation 643.1', 'Regulation 411.3.3', 'Regulation 521.8'],
    correctAnswer: 2,
    explanation:
      'Regulation 411.3.3 mandates RCD protection for circuits supplying portable outdoor equipment.',
  },
  {
    id: 3,
    question: 'What is the minimum acceptable insulation resistance value for a 230V circuit?',
    options: ['0.5 MΩ', '5 MΩ', '2 MΩ', '1 MΩ'],
    correctAnswer: 3,
    explanation:
      'BS 7671 requires a minimum insulation resistance of 1 MΩ for circuits up to 500V.',
  },
  {
    id: 4,
    question: 'What is the acceptable maximum disconnection time for a 30mA RCD on a TT system?',
    options: ['300 milliseconds', '200 milliseconds', '40 milliseconds', '5 seconds'],
    correctAnswer: 0,
    explanation:
      'For TT systems, the maximum disconnection time for RCDs is 300 milliseconds at rated residual current.',
  },
  {
    id: 5,
    question:
      'According to BS 7671, what is the maximum earth fault loop impedance (Zs) for a 32A Type B MCB?',
    options: ['1.10Ω', '1.37Ω', '1.44Ω', '2.19Ω'],
    correctAnswer: 1,
    explanation:
      'Table 41.3 gives a maximum Zs of 1.37Ω for a 32A Type B MCB at 230V (includes the Cmin factor of 0.95). 1.44Ω is the old pre-Cmin figure; 1.10Ω is the cold-measured site limit after applying the 0.80 rule-of-thumb factor.',
  },

  // Testing Procedures
  {
    id: 6,
    question: 'What test must be completed before applying insulation resistance testing?',
    options: [
      'EIC for new work, MEIWC for minor alterations',
      'AC and pulsating DC residual currents',
      'Continuity of protective conductors',
      'Equipment to be suitable and maintained',
    ],
    correctAnswer: 2,
    explanation:
      'Continuity testing must be completed first to ensure a complete circuit exists before insulation testing.',
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
  },
  {
    id: 8,
    question: 'What should happen when a 30mA RCD is tested at 5x IΔn?',
    options: ['Trip within 40ms', 'Trip within 300ms', 'Trip within 200ms', 'Not trip at all'],
    correctAnswer: 0,
    explanation: 'At 5 times rated current, an RCD must trip within 40 milliseconds.',
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
  },
  {
    id: 10,
    question: 'How do you verify that test instruments are functioning correctly?',
    options: [
      'C1, C2, or FI observations are found',
      'Prospective Fault Current - confirms equipment rating',
      'Use a proving unit before and after testing',
      'Supply characteristics and earthing system',
    ],
    correctAnswer: 2,
    explanation:
      'Proving units should be used before and after testing to confirm instrument functionality.',
  },

  // Inspection Sequencing
  {
    id: 11,
    question: 'During visual inspection, what should be checked first?',
    options: ['Circuit protection', 'Earthing arrangements', 'Cable routing', 'General safety'],
    correctAnswer: 3,
    explanation: 'General safety assessment should be the first priority during any inspection.',
  },
  {
    id: 12,
    question: 'When should dead testing be performed?',
    options: [
      'After visual inspection but before live testing',
      'High-frequency components and specialised detection equipment',
      'Like-for-like accessory replacement',
      'Different sensitivities and/or time delays',
    ],
    correctAnswer: 0,
    explanation:
      'Dead testing should follow visual inspection but precede any live testing for safety.',
  },
  {
    id: 13,
    question: 'What is the purpose of verifying polarity on final circuits?',
    options: [
      'Before initial energisation and periodically thereafter',
      'To ensure switches operate only on line conductor',
      'Disconnect sensitive equipment before insulation testing',
      'EIC for new work, MEIWC for minor alterations',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity verification ensures switches and protective devices are correctly connected to the line conductor.',
  },
  {
    id: 14,
    question: 'During inspection, cables should be checked for:',
    options: [
      'Protection against finger contact',
      '50% of rated residual current',
      'Damage, routing and support',
      'Before and after use',
    ],
    correctAnswer: 2,
    explanation:
      'Cables must be inspected for physical damage, correct routing, and adequate support.',
  },
  {
    id: 15,
    question: 'When inspecting a consumer unit, what should be verified first?',
    options: [
      'Dust, moisture and corrosive substances',
      'C1 or C2 observations recorded',
      'High temperature and humidity',
      'IP rating and general condition',
    ],
    correctAnswer: 3,
    explanation:
      'The general condition and IP rating establish basic safety before detailed inspection.',
  },

  // Safe Isolation
  {
    id: 16,
    question: 'Why is it important to perform testing with the installation isolated?',
    options: [
      'To prevent electric shock and equipment damage',
      'Thermal expansion causing loose connections',
      'Investigate the cause before resetting',
      'Rotation direction check and phase sequence testing',
    ],
    correctAnswer: 0,
    explanation:
      'Isolation prevents electric shock to personnel and protects test equipment from damage.',
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
  },
  {
    id: 18,
    question: 'When proving dead, the voltage indicator should be tested:',
    options: ['Once before use', 'Only if faulty', 'Before and after use', 'Once after use'],
    correctAnswer: 2,
    explanation: 'Voltage indicators must be proven on a known live source before and after use.',
  },
  {
    id: 19,
    question: 'What PPE is essential when carrying out electrical testing?',
    options: [
      'Continuity of protective conductors',
      'Detection sensitivity and alarm functionality',
      'Further Investigation required',
      'Safety glasses and insulated gloves',
    ],
    correctAnswer: 3,
    explanation:
      'Safety glasses and insulated gloves provide essential protection during electrical testing.',
  },
  {
    id: 20,
    question: 'Before commencing work, what must be established about the installation?',
    options: [
      'Supply characteristics and earthing system',
      'In failure mode to verify operation',
      'Complex or high-risk electrical work',
      'Protection against finger contact',
    ],
    correctAnswer: 0,
    explanation:
      'Understanding supply characteristics and earthing system is fundamental for safe working.',
  },

  // Fault Recognition
  {
    id: 21,
    question: 'What does a high Zs reading typically indicate?',
    options: [
      'Distribution network operators',
      'High resistance in earth path',
      'RCD and overcurrent protection',
      'Complex or high-risk electrical work',
    ],
    correctAnswer: 1,
    explanation:
      'High Zs readings indicate high resistance in the earth fault path, often due to loose connections.',
  },
  {
    id: 22,
    question: 'What might cause insulation resistance values to read abnormally low?',
    options: [
      'High voltage competency certification',
      '1-minute to 30-second reading ratio',
      'Damp conditions or connected loads not removed',
      'Load testing and autonomy time verification',
    ],
    correctAnswer: 2,
    explanation:
      'Low insulation resistance can result from damp conditions, connected equipment, or insulation breakdown.',
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
  },
  {
    id: 25,
    question: 'You discover a protective conductor is not continuous. What action should you take?',
    options: [
      'Fall of potential method using test electrodes',
      'Record C2 and inform responsible person',
      'Use a proving unit before and after testing',
      'Fails to trip at test current',
    ],
    correctAnswer: 1,
    explanation:
      'A discontinuous protective conductor is potentially dangerous and requires immediate attention.',
  },

  // Certificate Completion
  {
    id: 26,
    question: 'What certificate is required after a new consumer unit is installed?',
    options: [
      'Most installations unless specifically exempted',
      'Account for not all loads operating simultaneously',
      'Electrical Installation Certificate (EIC)',
      'Voltage variations during fault conditions',
    ],
    correctAnswer: 2,
    explanation:
      'A new consumer unit installation requires an Electrical Installation Certificate.',
  },
  {
    id: 27,
    question: 'What is the difference between an EIC and a MEIWC?',
    options: [
      'Knowledge, skills and safety understanding',
      'Regular updating of knowledge and skills',
      'High fault currents and electromagnetic interference',
      'EIC for new work, MEIWC for minor alterations',
    ],
    correctAnswer: 3,
    explanation:
      'EIC is used for new installations or major work; MEIWC is for minor alterations like adding a socket.',
  },
  {
    id: 28,
    question: 'Who is responsible for signing the inspection section of an EIC?',
    options: [
      'The person who carried out inspection and testing',
      'Electrical Installation Certificate (EIC)',
      'Reduced oxygen levels and restricted escape routes',
      'Approximately equal with slight variations',
    ],
    correctAnswer: 0,
    explanation:
      'The person who actually performed the inspection and testing must sign that section.',
  },
  {
    id: 29,
    question:
      "What information is required in the 'extent of installation covered' section of an EICR?",
    options: [
      'Alternative protection provided and risk assessment completed',
      'Specific areas or circuits inspected and tested',
      'New circuits, consumer unit changes and bathroom/kitchen work',
      'Patient safety, life support systems and infection control',
    ],
    correctAnswer: 1,
    explanation:
      'This section must specify exactly what areas or circuits were included in the inspection.',
  },
  {
    id: 30,
    question: 'In what circumstances should a Limitation be recorded on a certificate?',
    options: [
      'State limitations and their potential impact on safety',
      'Investigate the cause before resetting',
      'When areas could not be accessed as agreed with client',
      'Damp conditions or connected loads not removed',
    ],
    correctAnswer: 2,
    explanation:
      'Limitations must be recorded when agreed restrictions prevent full inspection or testing.',
  },

  // Observation Coding
  {
    id: 31,
    question: 'What coding would you give for no RCD protection on a socket in a domestic kitchen?',
    options: ['C1', 'FI', 'C3', 'C2'],
    correctAnswer: 3,
    explanation:
      'Missing RCD protection in a kitchen is potentially dangerous, warranting a C2 code.',
  },
  {
    id: 32,
    question: "What does the observation code 'FI' mean?",
    options: [
      'Further Investigation required',
      'Disconnected where practicable',
      'Equipment to be suitable and maintained',
      'Installation type, use, and condition',
    ],
    correctAnswer: 0,
    explanation:
      'FI indicates that Further Investigation is required to determine the full extent of an issue.',
  },
  {
    id: 33,
    question: 'During an EICR, you find a lighting circuit with no CPC. What code is applied?',
    options: ['C1', 'C2', 'C3', 'No code required'],
    correctAnswer: 1,
    explanation: 'A missing circuit protective conductor poses a potentially dangerous situation.',
  },
  {
    id: 34,
    question: 'What would warrant a C1 classification?',
    options: [
      'Step-by-step procedures and risk controls',
      'Reduced oxygen levels and restricted escape routes',
      'Danger present - immediate action required',
      'Additional consideration for backup power sources',
    ],
    correctAnswer: 2,
    explanation:
      'C1 indicates immediate danger requiring urgent remedial action before continued use.',
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
  },

  // Additional Questions - Testing Procedures
  {
    id: 36,
    question: 'What is the test voltage for insulation resistance testing on SELV circuits?',
    options: ['250V DC', '500V DC', '1000V DC', '1500V DC'],
    correctAnswer: 0,
    explanation:
      'SELV circuits should be tested at 250V DC to avoid damage to low voltage equipment.',
  },
  {
    id: 37,
    question: 'When testing continuity of protective conductors, the test current should be:',
    options: ['Not less than 10mA', 'Not less than 200mA', 'Exactly 1A', 'Not more than 10mA'],
    correctAnswer: 1,
    explanation:
      'The test current for protective conductor continuity must be not less than 200mA.',
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
  },
  {
    id: 40,
    question: 'How is a ring final circuit tested for continuity?',
    options: [
      'Test each conductor individually then cross-connect and test',
      'Reduced oxygen levels and restricted escape routes',
      'Improve earthing arrangements or reduce cable length',
      'Duration of the installation plus reasonable period',
    ],
    correctAnswer: 0,
    explanation:
      'Each conductor is tested individually, then cross-connected to verify ring integrity and identify spurs.',
  },

  // Advanced Regulatory Knowledge
  {
    id: 41,
    question: 'According to BS 7671, what is the maximum Zs for a 20A Type B MCB?',
    options: ['1.75Ω', '2.19Ω', '2.30Ω', '1.37Ω'],
    correctAnswer: 1,
    explanation:
      'Table 41.3 gives a maximum Zs of 2.19Ω for a 20A Type B MCB at 230V (includes the Cmin factor of 0.95). 2.30Ω is the old pre-Cmin figure.',
  },
  {
    id: 42,
    question: 'RCD protection is required for all socket outlets up to what rating?',
    options: ['13A', '32A', '20A', '16A'],
    correctAnswer: 2,
    explanation:
      'BS 7671 requires RCD protection for socket outlets not exceeding 20A in domestic installations.',
  },
  {
    id: 43,
    question:
      'The minimum cross-sectional area for a main earthing conductor in a domestic installation is:',
    options: ['4mm²', '6mm²', '16mm²', '10mm²'],
    correctAnswer: 3,
    explanation:
      'The minimum size for a main earthing conductor is typically 10mm² for domestic installations.',
  },
  {
    id: 44,
    question: 'What is the required IP rating for equipment in bathroom Zone 1?',
    options: ['IPX4', 'IPX6', 'IPX5', 'IPX7'],
    correctAnswer: 0,
    explanation: 'Equipment in bathroom Zone 1 requires a minimum IP rating of IPX4.',
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
  },

  // Testing Equipment and Calibration
  {
    id: 46,
    question: 'How often should test instruments be calibrated?',
    options: ['Every 6 months', 'Every 2 years', 'Annually', 'Monthly'],
    correctAnswer: 2,
    explanation: 'Test instruments should typically be calibrated annually to maintain accuracy.',
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
  },
  {
    id: 48,
    question: 'The accuracy class required for earth fault loop impedance testers is:',
    options: ['Class 2', 'Class 1', 'Class 3', 'Class 4'],
    correctAnswer: 0,
    explanation: 'Earth fault loop impedance testers should be accuracy Class 2 or better.',
  },
  {
    id: 49,
    question: 'When measuring insulation resistance, connected equipment should be:',
    options: [
      'Double or reinforced insulation',
      'Disconnected where practicable',
      'All circuits have RCD protection',
      'High resistance in earth path',
    ],
    correctAnswer: 1,
    explanation: 'Equipment should be disconnected where practicable to avoid false low readings.',
  },
  {
    id: 50,
    question: 'What test current is used for RCD testing at normal tripping current?',
    options: ['15mA', '30mA', '100% of IΔn', '50% of IΔn'],
    correctAnswer: 2,
    explanation:
      'RCD testing at normal tripping current uses 100% of the rated residual current (IΔn).',
  },

  // Documentation and Records
  {
    id: 51,
    question: 'What are the consequences of failing to document test results?',
    options: [
      'Earth fault loop impedance and RCD operation',
      'Allow discharge time before testing',
      'Main earthing conductor size',
      'Legal liability and non-compliance',
    ],
    correctAnswer: 3,
    explanation:
      'Failure to document results can lead to legal liability, regulatory non-compliance, and work rejection.',
  },
  {
    id: 52,
    question: 'How long should electrical certificates be retained?',
    options: ['Life of installation', '5 years', '1 year', '10 years'],
    correctAnswer: 0,
    explanation: 'Electrical certificates should be retained for the life of the installation.',
  },
  {
    id: 53,
    question: 'Who should receive copies of the Electrical Installation Certificate?',
    options: [
      'High voltage competency certification',
      'Client and relevant authorities',
      'Three-phase motor circuits',
      'Improvement recommended',
    ],
    correctAnswer: 1,
    explanation: 'Copies should be provided to the client and any relevant regulatory authorities.',
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
  },
  {
    id: 55,
    question: 'What information must be included on an EICR front page?',
    options: [
      'Record actual values with deviation noted',
      'Use a proving unit before and after testing',
      'Both overcurrent and earth leakage',
      'Overall assessment and recommendations',
    ],
    correctAnswer: 3,
    explanation:
      'The EICR front page must include the overall assessment and next inspection recommendations.',
  },

  // Specific Testing Scenarios
  {
    id: 56,
    question: 'When testing a two-way lighting circuit, what should be verified?',
    options: [
      'Correct connections at both switches and intermediate positions',
      'Equipment not to cause or be susceptible to interference',
      'Additional consideration for backup power sources',
      'Automated control sequences and emergency override function',
    ],
    correctAnswer: 0,
    explanation:
      'Two-way circuits require verification of correct switching arrangements at all positions.',
  },
  {
    id: 57,
    question: 'For testing solar PV installations, special consideration must be given to:',
    options: [
      'Resistance measurement between bonded parts',
      'DC isolation and specific safety procedures',
      'Regular check-in procedures and emergency contacts',
      'Duration of the installation plus reasonable period',
    ],
    correctAnswer: 1,
    explanation:
      'Solar PV requires special DC isolation procedures and awareness of continued generation during daylight.',
  },
  {
    id: 58,
    question: 'When testing IT systems, what additional test is required?',
    options: [
      'Consider higher rated RCDs or circuit division',
      'Regular updating of knowledge and skills',
      'Insulation monitoring device verification',
      'Approximately equal with slight variations',
    ],
    correctAnswer: 2,
    explanation:
      'IT systems require verification of the insulation monitoring device functionality.',
  },
  {
    id: 59,
    question: 'What is the purpose of functional testing?',
    options: [
      'Accumulated earth leakage from multiple sources',
      'C1 or C2 observations recorded',
      'Load testing and autonomy time verification',
      'Verify operation of switches and controls',
    ],
    correctAnswer: 3,
    explanation:
      'Functional testing verifies that all switches, isolators, and control devices operate correctly.',
  },
  {
    id: 60,
    question: 'Emergency lighting systems should be tested:',
    options: [
      'In failure mode to verify operation',
      'Test each electrode separately',
      'Further Investigation required',
      'Supply characteristics and earthing system',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting must be tested in failure mode to ensure it operates when mains supply fails.',
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
  },
  {
    id: 63,
    question: 'What could cause low insulation resistance between live conductors?',
    options: [
      'Regular updating of knowledge and skills',
      '50% of rated residual current',
      'Disconnect or short out neon indicators',
      'Moisture ingress or cable damage',
    ],
    correctAnswer: 3,
    explanation:
      'Low insulation between live conductors typically results from moisture or physical damage.',
  },
  {
    id: 64,
    question: 'A lighting circuit with high Zs readings might have:',
    options: [
      'Loose or missing CPC connections',
      'RCD protection for all socket outlets',
      'Locking off or removing fuses/links',
      'High resistance in earth path',
    ],
    correctAnswer: 0,
    explanation: 'High Zs in lighting circuits often indicates poor or missing CPC connections.',
  },
  {
    id: 65,
    question: 'What indicates a spur on a ring final circuit during testing?',
    options: [
      'Loose or missing CPC connections',
      'One socket with higher resistance reading',
      'Anti-islanding protection and grid synchronisation',
      'Legal liability and non-compliance',
    ],
    correctAnswer: 1,
    explanation: 'A spur will show higher resistance readings due to the additional cable length.',
  },

  // Additional Regulatory and Safety
  {
    id: 66,
    question: 'The purpose of main protective bonding is to:',
    options: [
      'Immediately advise the person ordering the report',
      'Client and relevant authorities',
      'Ensure metalwork is at earth potential',
      'Different sensitivities and/or time delays',
    ],
    correctAnswer: 2,
    explanation:
      'Main protective bonding ensures all exposed and extraneous metalwork is at earth potential.',
  },
  {
    id: 67,
    question: 'RCBO devices provide protection against:',
    options: [
      'Ensure all metalwork is at same potential',
      'Limit voltage to safe levels',
      'Further Investigation required',
      'Both overcurrent and earth leakage',
    ],
    correctAnswer: 3,
    explanation:
      'RCBOs combine both overcurrent protection and residual current (earth leakage) protection.',
  },
  {
    id: 68,
    question: 'The maximum length of 2.5mm² cable for a 32A ring final circuit is approximately:',
    options: ['100 metres', '70 metres', '50 metres', '120 metres'],
    correctAnswer: 0,
    explanation:
      'A 32A ring final in 2.5mm² cable should not exceed approximately 100 metres total cable length.',
  },
  {
    id: 69,
    question: 'Type B MCBs are designed to trip between:',
    options: ['1-2 times In', '3-5 times In', '5-10 times In', '10-20 times In'],
    correctAnswer: 1,
    explanation:
      'Type B MCBs are designed to trip magnetically between 3-5 times their rated current.',
  },
  {
    id: 70,
    question: 'What is meant by prospective short circuit current?',
    options: [
      'Phase rotation, starting current and defrost cycle operation',
      'AC and pulsating DC residual currents',
      'Maximum current between live conductors during fault',
      'DC isolation at multiple points and energy discharge verification',
    ],
    correctAnswer: 2,
    explanation:
      'PSCC is the maximum current that could flow during a fault between live conductors.',
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
  },
  {
    id: 72,
    question: 'What type of earthing system has the supply transformer star point earthed?',
    options: ['TN system', 'TT system', 'IT system', 'All systems'],
    correctAnswer: 0,
    explanation: 'TN systems have the supply transformer star point directly earthed.',
  },
  {
    id: 73,
    question: 'The minimum approach distance to overhead lines up to 33kV is:',
    options: ['3 metres', '6 metres', '5 metres', '9 metres'],
    correctAnswer: 1,
    explanation: 'The minimum approach distance to overhead lines up to 33kV is 6 metres.',
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
  },
  {
    id: 75,
    question: 'The colour of the neutral conductor in flexible cords should be:',
    options: ['Green/Yellow', 'Black', 'Brown', 'Blue'],
    correctAnswer: 3,
    explanation: 'The neutral conductor in flexible cords should be blue.',
  },
  {
    id: 76,
    question:
      "What is the maximum rating for a plug and socket to be considered 'portable equipment'?",
    options: ['16A', '13A', '10A', '20A'],
    correctAnswer: 0,
    explanation: 'Portable equipment is typically limited to 16A maximum rating.',
  },
  {
    id: 77,
    question: 'Fire barriers in cable routes should be provided at intervals not exceeding:',
    options: ['3m', '5m', '10m', '20m'],
    correctAnswer: 1,
    explanation:
      'Fire barriers should be provided at intervals not exceeding 5 metres in cable routes.',
  },
  {
    id: 78,
    question: 'The purpose of SELV is to:',
    options: [
      'Safety glasses and insulated gloves',
      'Both employers and employees',
      'Limit voltage to safe levels',
      'Ze + (R1 + R2) × 1.67',
    ],
    correctAnswer: 2,
    explanation:
      'SELV (Safety Extra Low Voltage) limits voltage to levels considered safe for direct contact.',
  },
  {
    id: 79,
    question: 'What test is used to check polarity at a light switch?',
    options: [
      'All incidents, near misses and safety observations',
      'Grid code compliance and export limitation',
      'Rotation direction check and phase sequence testing',
      'Continuity testing through switch to lamp',
    ],
    correctAnswer: 3,
    explanation:
      'Polarity at switches is verified by checking continuity through the switch to the controlled point.',
  },
  {
    id: 80,
    question: 'The touch voltage in accessible areas should not exceed:',
    options: ['50V', '25V', '110V', '230V'],
    correctAnswer: 0,
    explanation: 'Touch voltage should generally not exceed 50V in dry conditions for safety.',
  },
  {
    id: 81,
    question: 'Class II equipment is characterized by:',
    options: [
      'Gradual voltage increase to test voltage',
      'Double or reinforced insulation',
      'All circuits have RCD protection',
      'Safety glasses and insulated gloves',
    ],
    correctAnswer: 1,
    explanation:
      'Class II equipment has double or reinforced insulation and no accessible earthed parts.',
  },
  {
    id: 82,
    question: 'The recommended test current for testing continuity of ring final circuits is:',
    options: [
      'One socket with higher resistance reading',
      'Anti-islanding protection and grid synchronisation',
      '1.5 times the rating of protective device',
      'In failure mode to verify operation',
    ],
    correctAnswer: 2,
    explanation:
      'Ring final circuit testing should use 1.5 times the protective device rating as test current.',
  },
  {
    id: 83,
    question: 'What additional protection is required for socket outlets in commercial premises?',
    options: [
      'IT earthing systems and supplementary bonding',
      'Use a proving unit before and after testing',
      'Insulation monitoring device verification',
      'RCD protection for all socket outlets',
    ],
    correctAnswer: 3,
    explanation:
      'Commercial socket outlets generally require RCD protection for additional safety.',
  },
  {
    id: 84,
    question: 'The maximum operating temperature for PVC insulated cables is:',
    options: ['70°C', '85°C', '90°C', '60°C'],
    correctAnswer: 0,
    explanation: 'Standard PVC insulated cables have a maximum operating temperature of 70°C.',
  },
  {
    id: 85,
    question: 'What is the purpose of diversity in electrical design?',
    options: [
      'Disconnect or short out neon indicators',
      'Account for not all loads operating simultaneously',
      'Export limitation and grid protection settings verification',
      'Equipotential bonding of all conductive parts within zones',
    ],
    correctAnswer: 1,
    explanation:
      'Diversity accounts for the fact that not all electrical loads will operate simultaneously.',
  },
  {
    id: 86,
    question: 'The minimum IP rating for equipment in outdoor locations is:',
    options: ['IP54', 'IP55', 'IP65', 'IP67'],
    correctAnswer: 2,
    explanation:
      'Outdoor equipment typically requires a minimum IP rating of IP65 for weather protection.',
  },
  {
    id: 87,
    question: 'What type of cable should be used for underground installation?',
    options: [
      'High resistance in earth path',
      'Grid code compliance and export limitation',
      'Tamper detection and backup power systems',
      'Armoured cable or cable in conduit',
    ],
    correctAnswer: 3,
    explanation:
      'Underground installations require armoured cable or cable in suitable conduit for protection.',
  },
  {
    id: 88,
    question: 'The purpose of an equipotential bonding system is to:',
    options: [
      'Ensure all metalwork is at same potential',
      'Attempt to replicate the conditions during testing',
      'RCD protection or mechanical protection',
      'The person who carried out inspection and testing',
    ],
    correctAnswer: 0,
    explanation:
      'Equipotential bonding ensures all metalwork is at the same electrical potential to prevent dangerous differences.',
  },
  {
    id: 89,
    question: 'What happens to the rating of cables when grouped together?',
    options: [
      'All circuits have RCD protection',
      'Rating decreases due to heating effects',
      'Continuity testing through switch to lamp',
      'Accessible heights for switches and controls',
    ],
    correctAnswer: 1,
    explanation:
      'Cable ratings must be reduced when grouped together due to mutual heating effects.',
  },
  {
    id: 90,
    question: 'The discrimination between protective devices means:',
    options: [
      'Areas inspected, limitations, and percentage of installation sampled',
      'Natural leakage currents and electromagnetic interference',
      'Ensuring only the nearest device operates during fault',
      'To prevent electric shock and equipment damage',
    ],
    correctAnswer: 2,
    explanation:
      'Discrimination ensures only the protective device nearest to a fault operates, maintaining supply elsewhere.',
  },
  {
    id: 91,
    question:
      'What is the maximum earth fault loop impedance for a lighting circuit protected by a 6A Type B MCB?',
    options: ['15.3Ω', '7.67Ω', '11.5Ω', '7.28Ω'],
    correctAnswer: 3,
    explanation:
      'Table 41.3 gives a maximum Zs of 7.28Ω for a 6A Type B MCB at 230V (includes the Cmin factor of 0.95). 7.67Ω is the old pre-Cmin figure.',
  },
  {
    id: 92,
    question: 'The purpose of protective multiple earthing (PME) is to:',
    options: [
      'All of the above',
      'Reduce costs',
      'Reduce earth loop impedance',
      'Increase supply reliability',
    ],
    correctAnswer: 0,
    explanation:
      'PME provides multiple earth connections to reduce impedance, improve reliability, and reduce costs.',
  },
  {
    id: 93,
    question: 'What should be done if an RCBO repeatedly trips?',
    options: [
      'Moisture ingress or cable damage',
      'Investigate the cause before resetting',
      'Test while flexing the cable',
      'Both employers and employees',
    ],
    correctAnswer: 1,
    explanation:
      'Repeated tripping indicates a fault condition that must be investigated before resetting.',
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
  },
  {
    id: 95,
    question: 'What type of RCD should be used where there are electronic loads?',
    options: ['AC type', 'Any type', 'B type', 'A type'],
    correctAnswer: 3,
    explanation:
      'Type A RCDs should be used where electronic loads may produce DC components in earth fault current.',
  },
  {
    id: 96,
    question: 'The purpose of an isolation device is to:',
    options: [
      'Completely disconnect supply for maintenance',
      'Duration test and battery condition',
      'Record C2 and inform responsible person',
      '1-minute to 30-second reading ratio',
    ],
    correctAnswer: 0,
    explanation:
      'Isolation devices provide complete disconnection of supply to allow safe maintenance work.',
  },
  {
    id: 97,
    question: 'What is the maximum length of a 1.5mm² lighting circuit protected by a B10 MCB?',
    options: ['73m', '37m', '22m', '55m'],
    correctAnswer: 1,
    explanation:
      'A 1.5mm² lighting circuit with B10 MCB has a maximum length of approximately 37 metres.',
  },
  {
    id: 98,
    question: 'The frequency of supply in the UK is:',
    options: ['40Hz', '60Hz', '50Hz', '100Hz'],
    correctAnswer: 2,
    explanation: 'The UK mains supply frequency is 50Hz.',
  },
  {
    id: 99,
    question: 'What does IP2X rating indicate?',
    options: [
      'Overall assessment and recommendations',
      'IP rating and general condition',
      'High voltage competency certification',
      'Protection against finger contact',
    ],
    correctAnswer: 3,
    explanation:
      'IP2X indicates protection against finger contact (objects larger than 12mm diameter).',
  },
  {
    id: 100,
    question: 'The maximum current rating for domestic ring final circuits is:',
    options: ['32A', '25A', '30A', '20A'],
    correctAnswer: 0,
    explanation: 'Domestic ring final circuits are typically protected by 32A protective devices.',
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
  },
  {
    id: 102,
    question:
      'Which regulation in BS 7671 covers the selection and installation of devices for protection against electric shock?',
    options: ['Part 5', 'Part 7', 'Part 4', 'Part 6'],
    correctAnswer: 2,
    explanation:
      'Part 4 of BS 7671 covers protection for safety, including devices for protection against electric shock.',
  },
  {
    id: 103,
    question:
      'Under the CDM Regulations 2015, who must ensure electrical installation designs are coordinated?',
    options: ['Client', 'Principal contractor', 'CDM coordinator', 'Principal designer'],
    correctAnswer: 3,
    explanation:
      'The principal designer has the duty to coordinate design work and ensure designs are properly integrated under CDM 2015.',
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
  },
  {
    id: 105,
    question: 'What is the minimum earth electrode resistance for a TT system?',
    options: ['200Ω', 'No specific requirement', '100Ω', '20Ω'],
    correctAnswer: 1,
    explanation:
      'BS 7671 does not specify a minimum earth electrode resistance; the requirement is that RCD protection operates correctly.',
  },
  {
    id: 106,
    question:
      'According to Regulation 134.1.1, what must be selected to suit the characteristics of the circuit?',
    options: ['Cable size only', 'Accessories only', 'Protective devices', 'Installation method'],
    correctAnswer: 2,
    explanation:
      'Regulation 134.1.1 requires protective devices to be selected to suit the characteristics of the circuit they protect.',
  },
  {
    id: 107,
    question: 'The Health and Safety at Work Act 1974 places duties on:',
    options: [
      'No protective conductor connection',
      'Improvement recommended',
      'All circuits have RCD protection',
      'Both employers and employees',
    ],
    correctAnswer: 3,
    explanation:
      'HSWA 1974 places duties on both employers (to provide safe systems) and employees (to cooperate and not endanger others).',
  },
  {
    id: 108,
    question: 'What is the maximum Zs for a C16 MCB according to BS 7671?',
    options: ['2.87Ω', '2.30Ω', '1.37Ω', '1.44Ω'],
    correctAnswer: 2,
    explanation:
      'A Type C MCB trips at 10×In, so for a C16: Zs = (Cmin × Uo)/Ia = (0.95 × 230)/160 = 1.37Ω per Table 41.3.',
  },
  {
    id: 109,
    question: 'Special locations in BS 7671 are covered in which part?',
    options: ['Part 6', 'Part 7', 'Part 4', 'Part 5'],
    correctAnswer: 1,
    explanation:
      'Part 7 of BS 7671 covers special installations or locations with specific requirements.',
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
  },
  {
    id: 111,
    question: 'What is the required minimum height for overhead power lines crossing a road?',
    options: ['5.2m', '6.7m', '6.0m', '5.8m'],
    correctAnswer: 3,
    explanation:
      'ESQCR requires overhead lines crossing roads to be at least 5.8m high to ensure vehicle clearance.',
  },
  {
    id: 112,
    question: 'According to BS 7671, SELV systems must not exceed:',
    options: ['50V AC', '25V AC', '120V DC', '60V DC'],
    correctAnswer: 0,
    explanation:
      'SELV (Safety Extra Low Voltage) systems must not exceed 50V AC or 120V ripple-free DC under normal conditions.',
  },
  {
    id: 113,
    question: 'The Provision and Use of Work Equipment Regulations 1998 require:',
    options: [
      '1.5 times the rating of protective device',
      'Equipment to be suitable and maintained',
      'Disconnect or short out neon indicators',
      'Normal operation within tolerance',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER requires work equipment to be suitable for its purpose and maintained in a safe condition.',
  },
  {
    id: 114,
    question: 'What classification is given to equipment that can be moved while energised?',
    options: ['Hand-held', 'Stationary', 'Portable', 'Moveable'],
    correctAnswer: 2,
    explanation:
      'Portable equipment is defined as equipment intended to be moved while energised or connected to the supply.',
  },
  {
    id: 115,
    question: 'According to BS 7671, isolation must be secured by:',
    options: [
      'Earth fault loop impedance and RCD operation',
      'Ensure metalwork is at earth potential',
      'Continuity of protective conductors',
      'Locking off or removing fuses/links',
    ],
    correctAnswer: 3,
    explanation:
      'Effective isolation requires physical securing by locking off or removing fuses/links to prevent unauthorised re-energisation.',
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
  },
  {
    id: 117,
    question: 'The test for insulation resistance should be applied between:',
    options: [
      'Natural leakage currents and electromagnetic interference',
      'Each live conductor and earth, then between live conductors',
      'Load testing and autonomy time verification',
      'Temperature and humidity control maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance must be tested between each live conductor and earth, then between all live conductors.',
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
  },
  {
    id: 119,
    question: 'For circuits with electronic equipment, insulation resistance testing should be:',
    options: [
      'Continuity of protective conductors',
      'New circuits, consumer unit changes and bathroom/kitchen work',
      'High resistance connections or inadequate cable sizing',
      'Carried out at 250V with equipment disconnected',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic equipment should be disconnected and testing carried out at 250V to prevent damage.',
  },
  {
    id: 120,
    question: 'When measuring prospective fault current, the test should be applied:',
    options: [
      'Between live conductors and between each live conductor and earth',
      'First fault does not cause disconnection - monitoring required',
      'Most installations unless specifically exempted',
      'Hazard identification, risk assessment and control measures',
    ],
    correctAnswer: 0,
    explanation:
      'PFC must be measured between live conductors and between each live conductor and earth to determine maximum fault current.',
  },
  {
    id: 121,
    question: 'The earth electrode resistance test requires:',
    options: [
      'Correct connections at both switches and intermediate positions',
      'Specialist earth electrode tester with auxiliary electrodes',
      'Loose connections or poor earth continuity',
      'Dividing circuits to reduce cumulative leakage',
    ],
    correctAnswer: 1,
    explanation:
      'Earth electrode resistance requires a specialist tester using auxiliary current and potential electrodes.',
  },
  {
    id: 122,
    question:
      'When testing installations with photovoltaic systems, additional safety measures include:',
    options: [
      'Comprehensive testing schedules and digital submission capability',
      'Related to line conductor resistance by cross-sectional area ratio',
      'DC and AC isolation with appropriate test equipment',
      'Damp conditions or connected loads not removed',
    ],
    correctAnswer: 2,
    explanation:
      'PV systems require both DC and AC isolation and appropriate test equipment rated for DC voltages.',
  },
  {
    id: 123,
    question: 'Functional testing of safety services must include:',
    options: [
      'Before initial energisation and periodically thereafter',
      'Knowledge, training, experience, and understanding of hazards',
      'Duration of the installation plus reasonable period',
      'Operation under normal and emergency conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Safety services must be tested under both normal supply and emergency conditions to verify correct operation.',
  },
  {
    id: 124,
    question: 'When testing installations with inverters or UPS systems:',
    options: [
      'Additional consideration for backup power sources',
      'AC and pulsating DC residual currents',
      'Phase rotation, starting current and defrost cycle operation',
      'Alternative protection provided and risk assessment completed',
    ],
    correctAnswer: 0,
    explanation:
      'Inverters and UPS systems may maintain power even when mains is isolated, requiring additional safety measures.',
  },
  {
    id: 125,
    question:
      'The correct method for testing protective conductor continuity in flexible cables is:',
    options: [
      'Visual inspection only',
      'Test while flexing the cable',
      'Continuity test at each end',
      'Insulation resistance test',
    ],
    correctAnswer: 1,
    explanation:
      'Flexible cables should be tested while being flexed to identify intermittent faults in the protective conductor.',
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
  },
  {
    id: 129,
    question: 'The verification of automatic disconnection requires measurement of:',
    options: [
      'Perfect insulation is indicated',
      'Earth fault loop impedance and RCD operation',
      'Achieve discrimination with downstream RCDs',
      'Damp conditions or connected loads not removed',
    ],
    correctAnswer: 1,
    explanation:
      'Automatic disconnection verification requires measuring Zs and confirming protective device operation times.',
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
  },
  {
    id: 133,
    question: 'RCD discrimination (selectivity) is achieved by:',
    options: [
      'All incidents, near misses and safety observations',
      'Different sensitivities and/or time delays',
      'Record C2 and inform responsible person',
      'Verify operation of switches and controls',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination requires upstream RCDs to have lower sensitivity (higher trip current) and/or time delay.',
  },
  {
    id: 134,
    question: 'The cause of nuisance tripping in RCD-protected circuits is often:',
    options: [
      'Phase rotation, starting current and defrost cycle operation',
      'Carried out at 250V with equipment disconnected',
      'Natural leakage currents and electromagnetic interference',
      'Earthing arrangements, supply characteristics, and main protective devices',
    ],
    correctAnswer: 2,
    explanation:
      'Cumulative leakage currents from normal operation and EMI can cause RCDs to trip unexpectedly.',
  },
  {
    id: 135,
    question: 'When should a Type B RCD be specified?',
    options: [
      'Reduced insulation test voltage and driver protection',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'High resistance connections or inadequate cable sizing',
      'Installations with variable speed drives and switched mode power supplies',
    ],
    correctAnswer: 3,
    explanation:
      'Type B RCDs are required where smooth DC residual currents may occur, such as with VFDs and SMPS.',
  },
  {
    id: 136,
    question: 'The unwanted tripping of RCDs can be reduced by:',
    options: [
      'Dividing circuits to reduce cumulative leakage',
      'Enhanced protection and frequent inspection schedules',
      'One socket with higher resistance reading',
      'Operation under normal and emergency conditions',
    ],
    correctAnswer: 0,
    explanation:
      'Dividing circuits across multiple RCDs reduces the cumulative leakage current affecting each RCD.',
  },
  {
    id: 137,
    question: 'RCD protection may be omitted for fixed equipment if:',
    options: [
      'Enhanced protection and more frequent inspection',
      'Alternative protection provided and risk assessment completed',
      'The person who carried out inspection and testing',
      'Maximum current between live conductors during fault',
    ],
    correctAnswer: 1,
    explanation:
      'RCD protection may be omitted if alternative protection is provided and documented risk assessment justifies omission.',
  },
  {
    id: 138,
    question: 'The test button on an RCD should be operated:',
    options: [
      'Annually only',
      'Only during professional testing',
      'Monthly by the user',
      'When faults occur',
    ],
    correctAnswer: 2,
    explanation:
      'RCD test buttons should be operated monthly by users to verify mechanical operation of the device.',
  },
  {
    id: 139,
    question: 'When testing RCDs in IT systems:',
    options: [
      'After visual inspection but before live testing',
      'Maximum current between live conductors during fault',
      'To ensure switches operate only on line conductor',
      'Special test procedures required due to earthing arrangement',
    ],
    correctAnswer: 3,
    explanation:
      'IT systems require special RCD testing procedures due to the unearthed neutral and different fault current paths.',
  },
  {
    id: 140,
    question: 'An S-type (time-delayed) RCD is used to:',
    options: [
      'Achieve discrimination with downstream RCDs',
      'Functional testing of detection and alarm systems',
      'Insulated rescue hooks and first aid equipment',
      'Requiring health and safety planning and coordination',
    ],
    correctAnswer: 0,
    explanation:
      'S-type RCDs incorporate time delay to ensure downstream RCDs operate first, providing discrimination.',
  },
  {
    id: 141,
    question: 'The minimum test current for RCD operation testing is:',
    options: [
      '100% of rated residual current',
      '50% of rated residual current',
      '150% of rated residual current',
      '500% of rated residual current',
    ],
    correctAnswer: 1,
    explanation:
      'RCDs must be tested at 50% (half-rated current) where they should not trip, confirming proper sensitivity.',
  },
  {
    id: 142,
    question:
      'RCDs protecting socket outlets in domestic premises must have a rating not exceeding:',
    options: ['10mA', '100mA', '30mA', '300mA'],
    correctAnswer: 2,
    explanation:
      'Domestic socket outlets require RCD protection not exceeding 30mA for additional protection against electric shock.',
  },
  {
    id: 143,
    question: 'When installing RCDs in circuits with high leakage currents:',
    options: [
      '1.5 times the rating of protective device',
      'Operation under normal and emergency conditions',
      'Investigate the cause before resetting',
      'Consider higher rated RCDs or circuit division',
    ],
    correctAnswer: 3,
    explanation:
      'High leakage circuits may require higher rated RCDs (100mA) or division into multiple circuits for stability.',
  },
  {
    id: 144,
    question: 'The earth leakage current in a circuit protected by a 30mA RCD should not exceed:',
    options: ['9mA', '3mA', '15mA', '30mA'],
    correctAnswer: 0,
    explanation:
      'Combined earth leakage should not exceed 30% of RCD rating (9mA for 30mA RCD) to prevent nuisance tripping.',
  },
  {
    id: 145,
    question: 'RCBO devices combine the functions of:',
    options: [
      'Test while flexing the cable',
      'RCD and overcurrent protection',
      'Isolate, Test, Prove dead, Lock off',
      'RCD protection or mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      'RCBOs (Residual Current Circuit Breakers with Overcurrent protection) combine RCD and MCB functions in one device.',
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
  },
  {
    id: 147,
    question: 'The formula for calculating R1 + R2 in a ring final circuit is:',
    options: ['(r1 + r2) ÷ 2', 'r1 + r2', '(r1 × r2) ÷ (r1 + r2)', '(r1 + r2) ÷ 4'],
    correctAnswer: 3,
    explanation:
      'For a ring circuit, R1 + R2 = (r1 + r2) ÷ 4, where r1 and r2 are the resistance values of each leg of the ring.',
  },
  {
    id: 148,
    question: 'When Zs exceeds the maximum permitted value, the preferred solution is:',
    options: [
      'Improve earthing arrangements or reduce cable length',
      'Different sensitivities and/or time delays',
      'Gathering information and visual inspection',
      'Arc fault detection devices (AFDD) in certain circumstances',
    ],
    correctAnswer: 0,
    explanation:
      'High Zs should be addressed by improving the earth fault path through better earthing or shorter cable runs.',
  },
  {
    id: 149,
    question: 'The 80% rule for Zs calculations accounts for:',
    options: [
      'Record C2 and inform responsible person',
      'Voltage variations during fault conditions',
      'Identify hazards and implement control measures',
      'Thermal expansion causing loose connections',
    ],
    correctAnswer: 1,
    explanation:
      'The 0.8 factor accounts for the reduction in supply voltage during fault conditions, which affects disconnection times.',
  },
  {
    id: 150,
    question: 'In a TT system, the earth fault loop impedance comprises:',
    options: [
      'Automated control sequences and emergency override function',
      'Protective conductor continuity and earth fault path',
      'Installation earthing + electrode resistance + supply earth return',
      'Critical life support equipment that cannot be isolated',
    ],
    correctAnswer: 2,
    explanation:
      "TT system Zs includes the installation earth electrode, its resistance, and the supply authority's earth return path.",
  },
  {
    id: 151,
    question: 'The no-trip loop test method is preferred because:',
    options: [
      'Moisture ingress or cable damage',
      'Double or reinforced insulation',
      'Earth leakage or N-E fault',
      "It doesn't cause supply interruption",
    ],
    correctAnswer: 3,
    explanation:
      'No-trip testing avoids supply interruption that could affect other users or critical equipment.',
  },
  {
    id: 152,
    question: 'External earth fault loop impedance (Ze) should be measured:',
    options: [
      'At the origin of the installation',
      'Duration test and battery condition',
      'Gradual voltage increase to test voltage',
      'Regular updating of knowledge and skills',
    ],
    correctAnswer: 0,
    explanation:
      'Ze is measured at the origin (main earthing terminal) to establish the baseline earth fault loop impedance.',
  },
  {
    id: 153,
    question: "When using the 'rule of thumb' for voltage drop calculations, Zs is approximately:",
    options: ['Ze + R1', 'Ze + (R1 + R2) × 1.67', '1.67 × (R1 + R2)', 'R1 + R2'],
    correctAnswer: 1,
    explanation:
      'The rule of thumb: Zs ≈ Ze + (R1 + R2) × 1.67, where 1.67 accounts for the relationship between line and earth impedance.',
  },
  {
    id: 154,
    question: 'High earth fault loop impedance readings may indicate:',
    options: [
      'Specific areas or circuits inspected and tested',
      'Locking off or removing fuses/links',
      'Loose connections or poor earth continuity',
      'RCD protection for all socket outlets',
    ],
    correctAnswer: 2,
    explanation:
      'High Zs readings typically indicate poor connections, damaged conductors, or inadequate earthing arrangements.',
  },
  {
    id: 155,
    question: 'The earth fault loop impedance test effectively verifies:',
    options: [
      'Ensure metalwork is at earth potential',
      'DC isolation and dual energy source considerations',
      'Design liability and consequential losses',
      'Protective conductor continuity and earth fault path',
    ],
    correctAnswer: 3,
    explanation:
      'Zs testing verifies the complete earth fault current path and protective conductor continuity in one measurement.',
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
  },
  {
    id: 157,
    question: 'The test voltage for insulation resistance testing on 400V three-phase circuits is:',
    options: ['250V DC', '500V DC', '1000V DC', '1500V DC'],
    correctAnswer: 1,
    explanation: 'Circuits with nominal voltage between 50V and 500V should be tested at 500V DC.',
  },
  {
    id: 158,
    question: 'Polarisation index testing involves:',
    options: [
      'Overall assessment and recommendations',
      'Isolate, Test, Prove dead, Lock off',
      'Ratio of 10-minute to 1-minute resistance readings',
      'Different sensitivities and/or time delays',
    ],
    correctAnswer: 2,
    explanation:
      'Polarisation index is the ratio of insulation resistance at 10 minutes to that at 1 minute, indicating insulation condition.',
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
  },
  {
    id: 160,
    question: 'When testing insulation resistance between live conductors:',
    options: [
      'All switches and control devices should be closed',
      'Different sensitivities and/or time delays',
      'Operation under normal and emergency conditions',
      'Identify hazards and implement control measures',
    ],
    correctAnswer: 0,
    explanation:
      'Switches and control devices should be closed to test the complete circuit insulation, including all connected equipment.',
  },
  {
    id: 161,
    question:
      'The minimum insulation resistance for motor circuits at 500V test voltage is typically:',
    options: ['0.5 MΩ', '1 MΩ', '2 MΩ', '5 MΩ'],
    correctAnswer: 1,
    explanation:
      'Motor circuits should achieve minimum 1 MΩ insulation resistance, though manufacturer specifications may vary.',
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
  },
  {
    id: 163,
    question: 'Insulation resistance testing should be performed:',
    options: [
      'Rating decreases due to heating effects',
      'Enhanced protection and load management systems',
      'Equipment to be suitable and maintained',
      'Before initial energisation and periodically thereafter',
    ],
    correctAnswer: 3,
    explanation:
      'Insulation testing is required before initial energisation and should be repeated during periodic inspections.',
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
  },
  {
    id: 168,
    question: 'The test current for main protective bonding conductor continuity should be:',
    options: [
      'Not less than 200mA',
      'Not less than 10mA',
      'Not less than 1.5 times the design current',
      'Not less than 10A',
    ],
    correctAnswer: 0,
    explanation:
      'Main protective bonding conductors should be tested with not less than 200mA test current to ensure reliable results.',
  },
  {
    id: 169,
    question: 'Supplementary bonding effectiveness can be verified by:',
    options: [
      'Thermal expansion causing loose connections',
      'Resistance measurement between bonded parts',
      'IP rating and general condition',
      'The person who carried out inspection and testing',
    ],
    correctAnswer: 1,
    explanation:
      'Supplementary bonding should be verified by measuring resistance between simultaneously accessible exposed and extraneous conductive parts.',
  },
  {
    id: 170,
    question:
      'When testing the continuity of ring circuit protective conductors, readings should be:',
    options: [
      'Supply characteristics and earthing system',
      'Disconnected where practicable',
      'Approximately equal with slight variations',
      'Test each electrode separately',
    ],
    correctAnswer: 2,
    explanation:
      'Ring circuit CPC readings should be approximately equal with slight variations due to measurement accuracy and connections.',
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
  },
  {
    id: 174,
    question: 'The protective conductor resistance in a radial circuit should be:',
    options: [
      'Account for not all loads operating simultaneously',
      'Enhanced protection and frequent inspection schedules',
      'Related to line conductor resistance by cross-sectional area ratio',
      'Moisture and salt corrosion effects on connections',
    ],
    correctAnswer: 2,
    explanation:
      'CPC resistance relates to line conductor resistance by the ratio of their cross-sectional areas (R1/R2 = Area2/Area1).',
  },
  {
    id: 175,
    question: 'Functional earth conductors should be tested for:',
    options: [
      'IT earthing systems and supplementary bonding',
      'Moisture and salt corrosion effects on connections',
      'Knowledge, training, experience, and understanding of hazards',
      'Continuity and isolation from protective conductors',
    ],
    correctAnswer: 3,
    explanation:
      'Functional earth conductors require continuity testing and verification of isolation from protective earth systems.',
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
  },
  {
    id: 177,
    question: 'When limitations prevent full inspection, the EICR must:',
    options: [
      'Identify hazards and implement control measures',
      'State limitations and their potential impact on safety',
      'Reduced insulation test voltage and driver protection',
      'Electronic equipment protection and harmonic considerations',
    ],
    correctAnswer: 1,
    explanation:
      "Limitations must be clearly stated with explanation of their potential impact on the inspection's effectiveness.",
  },
  {
    id: 178,
    question: "The 'extent and limitations' section of an EICR should specify:",
    options: [
      'Special test procedures required due to earthing arrangement',
      'Enhanced protection and frequent inspection schedules',
      'Areas inspected, limitations, and percentage of installation sampled',
      'Communication protocols, sensor calibration and system response',
    ],
    correctAnswer: 2,
    explanation:
      'This section must detail exactly what was inspected, any limitations, and the percentage of the installation sampled.',
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
  },
  {
    id: 180,
    question: 'The person ordering an EICR should be advised when:',
    options: [
      'C1, C2, or FI observations are found',
      'Legal liability and non-compliance',
      'AC and pulsating DC residual currents',
      'Three-phase motor circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Urgent consultation is required when immediate danger (C1), potential danger (C2), or further investigation (FI) is identified.',
  },
  {
    id: 181,
    question: 'Schedule of Inspections forms part of:',
    options: ['EIC only', 'Both EIC and EICR', "Designer's records only", 'MEIWC only'],
    correctAnswer: 1,
    explanation:
      'Schedule of Inspections is required for both Electrical Installation Certificates and Electrical Installation Condition Reports.',
  },
  {
    id: 182,
    question: "The 'Summary of the Installation' section must include:",
    options: [
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Test each conductor individually then cross-connect and test',
      'Earthing arrangements, supply characteristics, and main protective devices',
      'High fault currents and electromagnetic interference',
    ],
    correctAnswer: 2,
    explanation:
      'Summary must include earthing system type, supply characteristics, and details of main protective devices.',
  },
  {
    id: 183,
    question: 'Distribution circuit details in Schedule of Test Results should show:',
    options: [
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Arc fault detection devices (AFDD) in certain circumstances',
      'Reduced oxygen levels and restricted escape routes',
      'Circuit designation, cable details, and protection characteristics',
    ],
    correctAnswer: 3,
    explanation:
      'Distribution circuits require circuit designation, cable type/size, method of protection, and protective device details.',
  },
  {
    id: 184,
    question: 'When test results fall outside acceptable limits:',
    options: [
      'Record actual values with deviation noted',
      'Gradual voltage increase to test voltage',
      'Design liability and consequential losses',
      'Use a proving unit before and after testing',
    ],
    correctAnswer: 0,
    explanation:
      'Actual measured values must be recorded with clear indication that they exceed acceptable limits.',
  },
  {
    id: 185,
    question: 'The duty holder for electrical safety in commercial premises is typically:',
    options: [
      'Disconnect or short out neon indicators',
      'The building owner or person in control',
      'Loose connections or poor earth continuity',
      'All switches and control devices should be closed',
    ],
    correctAnswer: 1,
    explanation:
      'The person in control of the premises (owner, lessee, or occupier) has the primary duty for electrical safety.',
  },
  {
    id: 186,
    question: 'Competency for inspection and testing is demonstrated by:',
    options: [
      'Earthing arrangements, supply characteristics, and main protective devices',
      'Reproducing fault conditions and systematic monitoring',
      'Knowledge, training, experience, and understanding of hazards',
      'DC isolation, thermal runaway risk and gas ventilation',
    ],
    correctAnswer: 2,
    explanation:
      'Competency requires appropriate knowledge, training, experience, and understanding of the risks involved.',
  },
  {
    id: 187,
    question: 'Records of electrical maintenance should be kept for:',
    options: [
      'Functional testing of detection and alarm systems',
      'C1, C2, or FI observations are found',
      'To prevent electric shock and equipment damage',
      'Duration of the installation plus reasonable period',
    ],
    correctAnswer: 3,
    explanation:
      "Maintenance records should be retained for the installation's life plus a reasonable period for liability purposes.",
  },
  {
    id: 188,
    question: 'When an EICR identifies immediate danger, the inspector should:',
    options: [
      'Immediately advise the person ordering the report',
      'Earth fault loop impedance and RCD operation',
      'Voltage imbalance and potential equipment damage',
      'Installation type, use, and condition',
    ],
    correctAnswer: 0,
    explanation:
      'Immediate danger requires urgent communication to allow prompt remedial action to ensure safety.',
  },
  {
    id: 189,
    question: 'The recommended interval between EICRs for commercial offices is typically:',
    options: ['3 years', '5 years', '10 years', '1 year'],
    correctAnswer: 1,
    explanation:
      'Commercial offices typically require EICR every 5 years, though this may vary based on risk assessment.',
  },
  {
    id: 190,
    question: 'An inspector must refuse to issue a certificate when:',
    options: [
      'Allow discharge time before testing',
      'Safety glasses and insulated gloves',
      'They cannot verify compliance due to limitations',
      'Regularly based on competency assessment',
    ],
    correctAnswer: 2,
    explanation:
      'Certificates cannot be issued when the inspector cannot adequately verify safety and compliance due to limitations.',
  },

  // Fault Finding and Troubleshooting (Questions 191-200)
  {
    id: 191,
    question: 'A circuit that tests satisfactory when cold but fails when loaded indicates:',
    options: [
      'Isolate, Test, Prove dead, Lock off',
      'Ensure all metalwork is at same potential',
      'Electromagnetic field limits and cookware compatibility',
      'Thermal expansion causing loose connections',
    ],
    correctAnswer: 3,
    explanation:
      'Temperature-dependent faults often indicate loose connections that separate under thermal expansion when loaded.',
  },
  {
    id: 192,
    question: 'Intermittent RCD tripping without obvious cause may be due to:',
    options: [
      'Accumulated earth leakage from multiple sources',
      'Reduced oxygen levels and restricted escape routes',
      'Requiring health and safety planning and coordination',
      'Communication protocols and electronic component protection',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple small leakage currents can accumulate to exceed RCD sensitivity, especially with deteriorating insulation.',
  },
  {
    id: 193,
    question: 'A systematic approach to fault finding should begin with:',
    options: [
      'DC isolation and specific safety procedures',
      'Gathering information and visual inspection',
      'Communication functionality and load profile accuracy',
      "It doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t cause supply interruption",
    ],
    correctAnswer: 1,
    explanation:
      'Effective fault finding starts with gathering information about symptoms and thorough visual inspection.',
  },
  {
    id: 194,
    question: 'When earth fault loop impedance tests show inconsistent results:',
    options: [
      'Circuit designation, cable details, and protection characteristics',
      'Duration of the installation plus reasonable period',
      'Investigate for variable connections or parallel paths',
      'Thermal expansion causing loose connections',
    ],
    correctAnswer: 2,
    explanation:
      'Inconsistent Zs readings suggest variable connections, parallel earth paths, or measurement issues requiring investigation.',
  },
  {
    id: 195,
    question: 'A circuit showing normal insulation resistance but operating RCD indicates:',
    options: [
      'Fire performance classification and CE marking',
      'Temperature sensing accuracy and communication protocols',
      'Electronic equipment protection and harmonic considerations',
      'Earth leakage current below test instrument sensitivity',
    ],
    correctAnswer: 3,
    explanation:
      'Small earth leakage currents may be below insulation tester sensitivity but sufficient to operate sensitive RCDs.',
  },
  {
    id: 196,
    question: 'Voltage readings that vary significantly under load suggest:',
    options: [
      'High resistance connections or inadequate cable sizing',
      'Anti-islanding protection and grid synchronisation',
      'Identify hazards and implement control measures',
      'Fall of potential method using test electrodes',
    ],
    correctAnswer: 0,
    explanation:
      'Significant voltage drop under load indicates high resistance connections or undersized conductors.',
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
  },
  {
    id: 198,
    question: 'Neutral conductor faults in three-phase systems may cause:',
    options: [
      'To ensure switches operate only on line conductor',
      'Reproducing fault conditions and systematic monitoring',
      'Voltage imbalance and potential equipment damage',
      'Safety glasses and insulated gloves',
    ],
    correctAnswer: 2,
    explanation:
      'Neutral faults in three-phase systems create voltage imbalance that can damage single-phase loads.',
  },
  {
    id: 199,
    question: 'Arc fault detection requires consideration of:',
    options: [
      'Protective conductor continuity and earth fault path',
      'Use a proving unit before and after testing',
      'Requiring health and safety planning and coordination',
      'High-frequency components and specialised detection equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Arc faults generate high-frequency signatures requiring specialised arc fault detection equipment for reliable identification.',
  },
  {
    id: 200,
    question: 'When fault symptoms appear only under specific operating conditions:',
    options: [
      'Attempt to replicate the conditions during testing',
      'High-frequency components and specialised detection equipment',
      'Operation under normal and emergency conditions',
      'Special test procedures required due to earthing arrangement',
    ],
    correctAnswer: 0,
    explanation:
      'Condition-specific faults require testing under the same conditions to accurately identify and resolve the problem.',
  },

  // Advanced Testing Scenarios (Questions 201-225)
  {
    id: 201,
    question:
      'When testing a 3-phase motor installation, what additional safety considerations apply?',
    options: [
      'Phase rotation, starting current and defrost cycle operation',
      'Rotation direction check and phase sequence testing',
      'Regularly based on competency assessment',
      'The person who carried out inspection and testing',
    ],
    correctAnswer: 1,
    explanation:
      '3-phase installations require phase sequence verification and rotation direction checks to prevent equipment damage.',
  },
  {
    id: 202,
    question:
      'In a swimming pool installation, what special earthing requirements must be verified?',
    options: [
      'Waste electrical equipment disposal and energy efficiency',
      'Comprehensive testing schedules and digital submission capability',
      'Equipotential bonding of all conductive parts within zones',
      'Reduced oxygen levels and restricted escape routes',
    ],
    correctAnswer: 2,
    explanation:
      'Pool installations require comprehensive equipotential bonding of all metallic parts within specified zones.',
  },
  {
    id: 203,
    question:
      'When testing circuits in a marina installation, what environmental factor must be considered?',
    options: [
      'Rotation direction check and phase sequence testing',
      'Attempt to replicate the conditions during testing',
      'Regular check-in procedures and emergency contacts',
      'Moisture and salt corrosion effects on connections',
    ],
    correctAnswer: 3,
    explanation:
      'Marine environments cause accelerated corrosion requiring more frequent inspection and specialised protection.',
  },
  {
    id: 204,
    question:
      'During fault finding on a complex distribution board, what systematic approach should be used?',
    options: [
      'Work from supply to load, isolating sections systematically',
      'DC isolation and dual energy source considerations',
      'Critical life support equipment that cannot be isolated',
      'Improve earthing arrangements or reduce cable length',
    ],
    correctAnswer: 0,
    explanation:
      'Systematic isolation from supply to load helps locate faults efficiently while maintaining safety.',
  },
  {
    id: 205,
    question: 'What limitation might prevent full testing of a hospital installation?',
    options: [
      'Requiring health and safety planning and coordination',
      'Critical life support equipment that cannot be isolated',
      'Ratio of 10-minute to 1-minute resistance readings',
      'Record actual values with deviation noted',
    ],
    correctAnswer: 1,
    explanation:
      'Critical medical equipment may require alternative testing methods or recorded limitations.',
  },
  {
    id: 206,
    question: 'In a fire alarm system installation, what additional testing is required?',
    options: [
      'First fault does not cause disconnection - monitoring required',
      'Rotation direction check and phase sequence testing',
      'Functional testing of detection and alarm systems',
      'Work from supply to load, isolating sections systematically',
    ],
    correctAnswer: 2,
    explanation:
      'Fire alarm systems require both electrical verification and functional testing to BS 5839 standards.',
  },
  {
    id: 207,
    question:
      'When testing an installation with electronic equipment, what precaution is essential?',
    options: [
      'Phase rotation, starting current and defrost cycle operation',
      'Testing must not compromise life safety during occupied periods',
      'Reproducing fault conditions and systematic monitoring',
      'Disconnect sensitive equipment before insulation testing',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic equipment can be damaged by high DC test voltages and must be disconnected.',
  },
  {
    id: 208,
    question: 'What is the preferred method for testing earth electrode resistance?',
    options: [
      'Fall of potential method using test electrodes',
      'Allow discharge time before testing',
      'EIC for new work, MEIWC for minor alterations',
      '1.5 times the rating of protective device',
    ],
    correctAnswer: 0,
    explanation:
      'The fall of potential method provides accurate earth electrode resistance measurement.',
  },
  {
    id: 209,
    question:
      'During testing of a theatre installation, what special consideration applies to dimmers?',
    options: [
      'Damp conditions or connected loads not removed',
      'Electronic equipment protection and harmonic considerations',
      'Protective conductor continuity and earth fault path',
      'Resistance measurement between bonded parts',
    ],
    correctAnswer: 1,
    explanation:
      'Theatre dimmers contain sensitive electronics and can generate harmonics affecting other equipment.',
  },
  {
    id: 210,
    question: 'What testing challenge is presented by smart lighting systems?',
    options: [
      'High resistance connections or inadequate cable sizing',
      'Only when dead working is not practicable and properly risk assessed',
      'Communication protocols and electronic component protection',
      'Working on live low voltage equipment with high fault current',
    ],
    correctAnswer: 2,
    explanation:
      'Smart lighting involves communication systems and sensitive electronics requiring careful testing procedures.',
  },
  {
    id: 211,
    question: 'In an agricultural installation, what environmental factor affects testing?',
    options: [
      'They cannot verify compliance due to limitations',
      'After visual inspection but before live testing',
      'Continuity testing through switch to lamp',
      'Dust, moisture and corrosive substances',
    ],
    correctAnswer: 3,
    explanation:
      'Agricultural environments present harsh conditions requiring more frequent inspection and specialised protection.',
  },
  {
    id: 212,
    question: 'When testing IT earthing systems, what key difference applies?',
    options: [
      'First fault does not cause disconnection - monitoring required',
      'Dividing circuits to reduce cumulative leakage',
      'DC isolation at multiple points and energy discharge verification',
      'To prevent electric shock and equipment damage',
    ],
    correctAnswer: 0,
    explanation:
      "IT systems use insulation monitoring as the first fault doesn't cause automatic disconnection.",
  },
  {
    id: 213,
    question: 'What is the significance of testing at different load conditions?',
    options: [
      'Achieve discrimination with downstream RCDs',
      'Temperature and voltage drop effects vary with load',
      'Installation earthing + electrode resistance + supply earth return',
      'Gradual voltage increase to test voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Different load conditions affect voltage drop, temperature and protective device operation.',
  },
  {
    id: 214,
    question: 'During testing of a lift installation, what safety protocol is essential?',
    options: [
      'DC isolation at multiple points and energy discharge verification',
      'Access restrictions and conservation requirements',
      'Coordination with lift engineer and mechanical isolation',
      'Fall of potential method using test electrodes',
    ],
    correctAnswer: 2,
    explanation:
      'Lift installations require coordination with mechanical systems and specialist engineers.',
  },
  {
    id: 215,
    question: 'What testing consideration applies to installations with solar PV systems?',
    options: [
      'Natural leakage currents and electromagnetic interference',
      'RCD protection for all socket outlets',
      'To ensure switches operate only on line conductor',
      'DC isolation and dual energy source considerations',
    ],
    correctAnswer: 3,
    explanation:
      'PV systems require DC isolation and consideration of multiple energy sources during testing.',
  },
  {
    id: 216,
    question:
      'In a computer server room, what environmental monitoring is critical during testing?',
    options: [
      'Temperature and humidity control maintenance',
      'Loose or missing CPC connections',
      'To ensure switches operate only on line conductor',
      'Pilot wire integrity and in-cable control box function',
    ],
    correctAnswer: 0,
    explanation:
      'Server rooms require maintained environmental conditions to prevent equipment damage.',
  },
  {
    id: 217,
    question: 'What is the main challenge when testing emergency lighting systems?',
    options: [
      'Specific areas or circuits inspected and tested',
      'Testing must not compromise life safety during occupied periods',
      'Comprehensive testing schedules and digital submission capability',
      'After visual inspection but before live testing',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency lighting testing must maintain life safety while verifying system operation.',
  },
  {
    id: 218,
    question: 'During testing of a welding shop installation, what hazard must be considered?',
    options: [
      'Equipment not to cause or be susceptible to interference',
      'Patient safety, life support systems and infection control',
      'High fault currents and electromagnetic interference',
      'Communications testing and consumer protection',
    ],
    correctAnswer: 2,
    explanation:
      'Welding equipment generates high currents and electromagnetic interference affecting test equipment.',
  },
  {
    id: 219,
    question: 'What limitation might apply when testing heritage buildings?',
    options: [
      'Safety sensors, obstruction detection and emergency release',
      'Additional consideration for backup power sources',
      'Duration of the installation plus reasonable period',
      'Access restrictions and conservation requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Heritage buildings may have access restrictions and require conservation-aware testing methods.',
  },
  {
    id: 220,
    question: 'In a chemical plant installation, what additional safety consideration applies?',
    options: [
      'Explosion risk and chemical compatibility of equipment',
      'Continuity testing through switch to lamp',
      'Carried out at 250V with equipment disconnected',
      'Patient safety, life support systems and infection control',
    ],
    correctAnswer: 0,
    explanation:
      'Chemical plants require explosion-proof equipment and chemical compatibility considerations.',
  },
  {
    id: 221,
    question: 'What challenge does testing flexible cables in moving machinery present?',
    options: [
      'Overall assessment and recommendations',
      'Mechanical stress and flexing damage assessment',
      'Duration of the installation plus reasonable period',
      'Safe isolation, first aid and evacuation procedures',
    ],
    correctAnswer: 1,
    explanation:
      'Flexible cables in moving machinery require assessment for mechanical stress and fatigue damage.',
  },
  {
    id: 222,
    question: 'During testing of a data centre UPS system, what coordination is required?',
    options: [
      'Account for not all loads operating simultaneously',
      'Natural leakage currents and electromagnetic interference',
      'UPS engineer present and backup power arrangements',
      'All switches and control devices should be closed',
    ],
    correctAnswer: 2,
    explanation:
      'UPS testing requires specialist coordination to maintain critical power supplies.',
  },
  {
    id: 223,
    question: 'What testing consideration applies to temporary installations?',
    options: [
      'Disconnect sensitive equipment before insulation testing',
      'Locking off or removing fuses/links',
      'Earth fault loop impedance and RCD operation',
      'Enhanced protection and more frequent inspection',
    ],
    correctAnswer: 3,
    explanation:
      'Temporary installations require enhanced protection and more frequent testing due to their nature.',
  },
  {
    id: 224,
    question: 'In a school installation, what timing consideration affects testing?',
    options: [
      'Testing scheduled to avoid disrupting education',
      'Regular breaks to maintain concentration and safety',
      'Approximately equal with slight variations',
      'Carried out at 250V with equipment disconnected',
    ],
    correctAnswer: 0,
    explanation:
      'Educational facility testing must be scheduled to minimise disruption to teaching activities.',
  },
  {
    id: 225,
    question: 'What is the key challenge when fault-finding intermittent problems?',
    options: [
      'Improve earthing arrangements or reduce cable length',
      'Reproducing fault conditions and systematic monitoring',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Ensure all metalwork is at same potential',
    ],
    correctAnswer: 1,
    explanation:
      'Intermittent faults require systematic monitoring and recreation of fault conditions for diagnosis.',
  },

  // Modern Installation Technologies (Questions 226-250)
  {
    id: 226,
    question: 'What additional testing is required for EV charging point installations?',
    options: [
      'Carried out at 250V with equipment disconnected',
      'Phase rotation, starting current and defrost cycle operation',
      'DC leakage testing and protective conductor current verification',
      'Installations with variable speed drives and switched mode power supplies',
    ],
    correctAnswer: 2,
    explanation:
      'EV charging points require DC leakage testing and verification of protective conductor current limits.',
  },
  {
    id: 227,
    question: 'When testing smart home systems, what protocol compatibility must be verified?',
    options: [
      'Coordination with lift engineer and mechanical isolation',
      'Total earth fault loop impedance - ensures disconnection times',
      'Explosion risk and chemical compatibility of equipment',
      'Communication protocols (WiFi, Zigbee, Z-Wave) and interference',
    ],
    correctAnswer: 3,
    explanation:
      'Smart home systems require verification of communication protocols and electromagnetic compatibility.',
  },
  {
    id: 228,
    question: 'What safety consideration applies to battery storage system testing?',
    options: [
      'DC isolation, thermal runaway risk and gas ventilation',
      'Account for not all loads operating simultaneously',
      'To prevent electric shock and equipment damage',
      'Cable resistance increases with temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Battery systems present DC hazards, fire risks and require proper ventilation during testing.',
  },
  {
    id: 229,
    question: 'For heat pump installations, what electrical verification is essential?',
    options: [
      'DC isolation and dual energy source considerations',
      'Phase rotation, starting current and defrost cycle operation',
      'Operation under normal and emergency conditions',
      'Carried out at 250V with equipment disconnected',
    ],
    correctAnswer: 1,
    explanation:
      'Heat pumps require phase rotation verification and defrost cycle electrical system checks.',
  },
  {
    id: 230,
    question: 'What testing consideration applies to LED lighting installations?',
    options: [
      'Arc-rated clothing and face protection',
      'Integration with mechanical ventilation and air quality systems',
      'Reduced insulation test voltage and driver protection',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
    ],
    correctAnswer: 2,
    explanation:
      'LED drivers contain sensitive electronics requiring reduced test voltages to prevent damage.',
  },
  {
    id: 231,
    question: 'When testing solar PV installations, what measurement is critical?',
    options: [
      'Armoured cable or cable in conduit',
      'Immediately advise the person ordering the report',
      'Grid code compliance and export limitation',
      'DC voltage, current and insulation resistance',
    ],
    correctAnswer: 3,
    explanation:
      'PV systems require comprehensive DC measurements and insulation testing for safety.',
  },
  {
    id: 232,
    question: 'What verification is required for smart meter installations?',
    options: [
      'Communication functionality and load profile accuracy',
      'Carried out at 250V with equipment disconnected',
      'Enhanced protection and load management systems',
      'Resistance measurement between bonded parts',
    ],
    correctAnswer: 0,
    explanation:
      'Smart meters require verification of communication systems and accurate load monitoring.',
  },
  {
    id: 233,
    question: 'For building management system (BMS) integration, what testing is needed?',
    options: [
      'Elimination, substitution, engineering controls, administrative, PPE',
      'Communication protocols, sensor calibration and system response',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Circuit designation, cable details, and protection characteristics',
    ],
    correctAnswer: 1,
    explanation:
      'BMS systems require comprehensive testing of communication, sensors and control responses.',
  },
  {
    id: 234,
    question: 'What safety feature must be verified in EV charging installations?',
    options: [
      'Electromagnetic field measurement and shielding verification',
      'Step-by-step procedures and risk controls',
      'PEN fault detection and automatic disconnection',
      'Use a proving unit before and after testing',
    ],
    correctAnswer: 2,
    explanation: 'EV charging requires PEN fault detection to prevent dangerous touch voltages.',
  },
  {
    id: 235,
    question: 'When testing energy storage systems, what isolation procedure is critical?',
    options: [
      'Temperature control accuracy and timer function verification',
      'Damp conditions or connected loads not removed',
      'When areas could not be accessed as agreed with client',
      'DC isolation at multiple points and energy discharge verification',
    ],
    correctAnswer: 3,
    explanation:
      'Energy storage requires multiple isolation points and verification of energy discharge.',
  },
  {
    id: 236,
    question: 'What testing challenge is presented by wireless charging systems?',
    options: [
      'Electromagnetic field measurement and shielding verification',
      'Ratio of 10-minute to 1-minute resistance readings',
      'EIC for new work, MEIWC for minor alterations',
      'Automated control sequences and emergency override function',
    ],
    correctAnswer: 0,
    explanation: 'Wireless charging requires EMF measurement and verification of safety shielding.',
  },
  {
    id: 237,
    question: 'For smart thermostats, what functionality verification is required?',
    options: [
      'Supply characteristics and earthing system',
      'Temperature sensing accuracy and communication protocols',
      'To ensure switches operate only on line conductor',
      '1.5 times the rating of protective device',
    ],
    correctAnswer: 1,
    explanation:
      'Smart thermostats require verification of sensing accuracy and communication functionality.',
  },
  {
    id: 238,
    question: 'What consideration applies to testing micro-generation systems?',
    options: [
      'Different sensitivities and/or time delays',
      'Continuity and isolation from protective conductors',
      'Export limitation and grid protection settings verification',
      'Pilot wire integrity and in-cable control box function',
    ],
    correctAnswer: 2,
    explanation:
      'Micro-generation requires verification of export controls and grid protection systems.',
  },
  {
    id: 239,
    question: 'When testing smart switches and dimmers, what protection is needed?',
    options: [
      'Regular updating of knowledge and skills',
      'Temperature and humidity control maintenance',
      'Functional testing of detection and alarm systems',
      'Electronic component protection and communication testing',
    ],
    correctAnswer: 3,
    explanation:
      'Smart switches contain electronics requiring protection and communication verification.',
  },
  {
    id: 240,
    question: 'What verification is required for home automation lighting systems?',
    options: [
      'Automated control sequences and emergency override function',
      'Reduced insulation test voltage and driver protection',
      'Related to line conductor resistance by cross-sectional area ratio',
      'To ensure switches operate only on line conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Automated lighting requires verification of control sequences and emergency override capability.',
  },
  {
    id: 241,
    question: 'For electric vehicle supply equipment (EVSE), what current monitoring is required?',
    options: [
      'Each live conductor and earth, then between live conductors',
      'Pilot signal integrity and protective conductor current measurement',
      'Reduced insulation test voltage and driver protection',
      'Anti-islanding protection and grid synchronisation',
    ],
    correctAnswer: 1,
    explanation:
      'EVSE requires verification of pilot signals and protective conductor current limits.',
  },
  {
    id: 242,
    question: 'What testing consideration applies to power over Ethernet (PoE) systems?',
    options: [
      'Regular check-in procedures and emergency contacts',
      'Enhanced protection and more frequent inspection',
      'Power delivery limits and equipment protection verification',
      'Communication protocols (WiFi, Zigbee, Z-Wave) and interference',
    ],
    correctAnswer: 2,
    explanation:
      'PoE systems require verification of power limits and connected equipment protection.',
  },
  {
    id: 243,
    question: 'When testing battery backup systems, what capacity verification is needed?',
    options: [
      'Fall of potential method using test electrodes',
      'Rating decreases due to heating effects',
      'Cable resistance increases with temperature',
      'Load testing and autonomy time verification',
    ],
    correctAnswer: 3,
    explanation:
      'Battery backup requires load testing to verify actual autonomy time under realistic conditions.',
  },
  {
    id: 244,
    question: 'What safety verification is required for induction hob installations?',
    options: [
      'Electromagnetic field limits and cookware compatibility',
      'Ensure all metalwork is at same potential',
      'Dividing circuits to reduce cumulative leakage',
      'When areas could not be accessed as agreed with client',
    ],
    correctAnswer: 0,
    explanation:
      'Induction hobs require EMF measurement and verification of safe cooking environment.',
  },
  {
    id: 245,
    question: 'For smart security systems, what functional testing is essential?',
    options: [
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Alarm activation sequences and communication backup systems',
      'First fault does not cause disconnection - monitoring required',
      'Investigate for variable connections or parallel paths',
    ],
    correctAnswer: 1,
    explanation:
      'Security systems require verification of alarm sequences and backup communication paths.',
  },
  {
    id: 246,
    question:
      'What consideration applies to testing electric underfloor heating with smart controls?',
    options: [
      'Customer information handling and smart device data',
      'Complete testing sequence and safety system verification',
      'Temperature sensor calibration and zone control verification',
      'Prospective Fault Current - confirms equipment rating',
    ],
    correctAnswer: 2,
    explanation:
      'Smart heating requires verification of sensor accuracy and zone control functionality.',
  },
  {
    id: 247,
    question: 'When testing renewable energy inverters, what protection verification is needed?',
    options: [
      'Clear coordination between team members and other trades',
      'DC and AC isolation with appropriate test equipment',
      'Verify operation of switches and controls',
      'Anti-islanding protection and grid synchronisation',
    ],
    correctAnswer: 3,
    explanation:
      'Inverters require verification of grid protection and anti-islanding safety systems.',
  },
  {
    id: 248,
    question: 'What testing challenge is presented by electric towel rails with smart controls?',
    options: [
      'Temperature control accuracy and timer function verification',
      'Protective conductor continuity and earth fault path',
      'New circuits, consumer unit changes and bathroom/kitchen work',
      'Ratio of 10-minute to 1-minute resistance readings',
    ],
    correctAnswer: 0,
    explanation:
      'Smart towel rails require verification of temperature control and programmable functions.',
  },
  {
    id: 249,
    question: 'For electric car charging cables, what additional testing is required?',
    options: [
      'Fire performance classification and CE marking',
      'Pilot wire integrity and in-cable control box function',
      'Enhanced protection and load management systems',
      'Design liability and consequential losses',
    ],
    correctAnswer: 1,
    explanation:
      'EV cables require verification of pilot wire signals and in-cable protection devices.',
  },
  {
    id: 250,
    question: 'What verification is needed for smart garage door systems?',
    options: [
      'All switches and control devices should be closed',
      'Attempt to replicate the conditions during testing',
      'Safety sensors, obstruction detection and emergency release',
      'Areas inspected, limitations, and percentage of installation sampled',
    ],
    correctAnswer: 2,
    explanation:
      'Smart garage doors require comprehensive safety system verification including sensors and emergency functions.',
  },

  // Advanced Safety & Risk Assessment (Questions 251-275)
  {
    id: 251,
    question: 'What is the primary purpose of a risk assessment before electrical testing?',
    options: [
      'C1, C2, or FI observations are found',
      '1.5 times the rating of protective device',
      'DC isolation and specific safety procedures',
      'Identify hazards and implement control measures',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessment identifies potential hazards and establishes appropriate control measures for safe working.',
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
  },
  {
    id: 253,
    question: 'What is the minimum safe approach distance for 11kV overhead lines?',
    options: ['1 metre', '3 metres', '2 metres', '5 metres'],
    correctAnswer: 1,
    explanation:
      'The minimum safe approach distance for 11kV overhead lines is 3 metres for unqualified persons.',
  },
  {
    id: 254,
    question: 'Arc flash risk is highest when:',
    options: [
      'Natural leakage currents and electromagnetic interference',
      'Reproducing fault conditions and systematic monitoring',
      'Working on live low voltage equipment with high fault current',
      'Comprehensive testing schedules and digital submission capability',
    ],
    correctAnswer: 2,
    explanation:
      'Arc flash risk increases with available fault current and is highest on live high-energy systems.',
  },
  {
    id: 255,
    question: 'What PPE is specifically required for arc flash protection?',
    options: [
      'Locking off or removing fuses/links',
      'Voltage imbalance and potential equipment damage',
      'Electric vehicle charging and smart appliances',
      'Arc-rated clothing and face protection',
    ],
    correctAnswer: 3,
    explanation:
      'Arc flash protection requires specifically rated clothing and face protection based on energy calculations.',
  },
  {
    id: 256,
    question: 'When must a permit to work system be used?',
    options: [
      'Complex or high-risk electrical work',
      'Duration test and battery condition',
      'At the origin of the installation',
      'Electrical Installation Certificate (EIC)',
    ],
    correctAnswer: 0,
    explanation:
      'Permit to work systems are required for complex or high-risk electrical work to ensure safety coordination.',
  },
  {
    id: 257,
    question:
      'What is the maximum recommended duration for emergency response after electric shock?',
    options: ['1 minute', '4 minutes', '30 seconds', '10 minutes'],
    correctAnswer: 1,
    explanation:
      'Brain damage from cardiac arrest begins after 4 minutes, making rapid response critical.',
  },
  {
    id: 258,
    question: 'When working alone on electrical installations, what safety measure is essential?',
    options: [
      'Continuity of protective conductors',
      'Tamper detection and backup power systems',
      'Regular check-in procedures and emergency contacts',
      'Moisture and salt corrosion effects on connections',
    ],
    correctAnswer: 2,
    explanation:
      'Lone working requires check-in procedures and emergency contact arrangements for safety.',
  },
  {
    id: 259,
    question: 'What environmental factor most increases electrical safety risk?',
    options: ['Bright sunlight', 'Windy conditions', 'High temperature', 'Wet or damp conditions'],
    correctAnswer: 3,
    explanation:
      'Moisture significantly reduces insulation effectiveness and increases shock risk.',
  },
  {
    id: 260,
    question: 'Method statements for electrical work must include:',
    options: [
      'Step-by-step procedures and risk controls',
      'C1 or C2 observations recorded',
      'Load testing and autonomy time verification',
      'Attempt to replicate the conditions during testing',
    ],
    correctAnswer: 0,
    explanation: 'Method statements detail procedures and risk controls for safe work execution.',
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
  },
  {
    id: 262,
    question: 'When is it acceptable to work live on electrical equipment?',
    options: [
      'Special test procedures required due to earthing arrangement',
      'Communication protocols and electronic component protection',
      'Only when dead working is not practicable and properly risk assessed',
      'Equipment not to cause or be susceptible to interference',
    ],
    correctAnswer: 2,
    explanation:
      'Live working is only permitted when dead working is impracticable and proper risk assessment is completed.',
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
  },
  {
    id: 264,
    question: 'Electrical safety training must be updated:',
    options: [
      'Regularly based on competency assessment',
      'High resistance in earth path',
      'Armoured cable or cable in conduit',
      'EIC for new work, MEIWC for minor alterations',
    ],
    correctAnswer: 0,
    explanation:
      'Safety training requires regular updates based on competency assessment and regulatory changes.',
  },
  {
    id: 265,
    question: 'What information must be included in electrical safety documentation?',
    options: [
      'PEN fault detection and automatic disconnection',
      'Hazard identification, risk assessment and control measures',
      'Alternative protection provided and risk assessment completed',
      'Knowledge, training, experience, and understanding of hazards',
    ],
    correctAnswer: 1,
    explanation:
      'Safety documentation must comprehensively address hazards, risks and control measures.',
  },
  {
    id: 266,
    question:
      'When working in confined spaces with electrical equipment, what additional risk applies?',
    options: [
      'Tamper detection and backup power systems',
      'Alarm activation sequences and communication backup systems',
      'Reduced oxygen levels and restricted escape routes',
      'DC isolation and dual energy source considerations',
    ],
    correctAnswer: 2,
    explanation:
      'Confined spaces present additional risks of oxygen depletion and restricted emergency egress.',
  },
  {
    id: 267,
    question: 'What is the recommended maximum working time for detailed electrical work?',
    options: [
      'One socket with higher resistance reading',
      'When areas could not be accessed as agreed with client',
      'Dividing circuits to reduce cumulative leakage',
      'Regular breaks to maintain concentration and safety',
    ],
    correctAnswer: 3,
    explanation:
      'Regular breaks are essential to maintain concentration and prevent safety-compromising fatigue.',
  },
  {
    id: 268,
    question: 'Emergency procedures for electrical incidents must include:',
    options: [
      'Safe isolation, first aid and evacuation procedures',
      'Dividing circuits to reduce cumulative leakage',
      'Ensure metalwork is at earth potential',
      'Testing scheduled to avoid disrupting education',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency procedures must address immediate safety including isolation, first aid and evacuation.',
  },
  {
    id: 269,
    question: 'What weather conditions require suspension of outdoor electrical work?',
    options: [
      'CE marking and declaration of conformity',
      'Lightning risk and heavy precipitation',
      'Test each electrode separately',
      'Loose connections or poor earth continuity',
    ],
    correctAnswer: 1,
    explanation:
      'Lightning and heavy rain significantly increase electrical safety risks requiring work suspension.',
  },
  {
    id: 270,
    question: 'Competency assessment for electrical workers must evaluate:',
    options: [
      'Distribution network operators',
      'Design liability and consequential losses',
      'Knowledge, skills and safety understanding',
      'Each line and earth separately',
    ],
    correctAnswer: 2,
    explanation:
      'Competency assessment must comprehensively evaluate knowledge, practical skills and safety awareness.',
  },
  {
    id: 271,
    question: 'What communication is essential during complex electrical testing?',
    options: [
      'Special test procedures required due to earthing arrangement',
      'Safe isolation, first aid and evacuation procedures',
      'Communication protocols and electronic component protection',
      'Clear coordination between team members and other trades',
    ],
    correctAnswer: 3,
    explanation:
      'Complex testing requires clear communication to coordinate activities and maintain safety.',
  },
  {
    id: 272,
    question: 'Incident reporting in electrical work must include:',
    options: [
      'All incidents, near misses and safety observations',
      'DC voltage, current and insulation resistance',
      'Enhanced protection and more frequent inspection',
      'Insulated rescue hooks and first aid equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Comprehensive incident reporting including near misses helps prevent future accidents.',
  },
  {
    id: 273,
    question: 'What verification is required before recommissioning electrical systems?',
    options: [
      'Special test procedures required due to earthing arrangement',
      'Complete testing sequence and safety system verification',
      'Specific areas or circuits inspected and tested',
      'State limitations and their potential impact on safety',
    ],
    correctAnswer: 1,
    explanation:
      'Recommissioning requires complete verification of all safety systems and testing sequences.',
  },
  {
    id: 274,
    question: 'Safety barriers during electrical testing must:',
    options: [
      'Improve earthing arrangements or reduce cable length',
      'Before initial energisation and periodically thereafter',
      'Prevent unauthorised access and clearly indicate hazards',
      'Supply characteristics and earthing system',
    ],
    correctAnswer: 2,
    explanation:
      'Safety barriers must effectively control access and clearly communicate hazards to others.',
  },
  {
    id: 275,
    question: 'What consideration applies to electrical work in healthcare facilities?',
    options: [
      'Verify operation of switches and controls',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Voltage variations during fault conditions',
      'Patient safety, life support systems and infection control',
    ],
    correctAnswer: 3,
    explanation:
      'Healthcare facilities require consideration of patient safety, critical systems and infection control procedures.',
  },

  // Regulatory Updates & Standards (Questions 276-300)
  {
    id: 276,
    question: 'The 18th Edition of BS 7671 introduced new requirements for:',
    options: [
      'Arc fault detection devices (AFDD) in certain circumstances',
      'Detection sensitivity and alarm functionality',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'Use a proving unit before and after testing',
    ],
    correctAnswer: 0,
    explanation:
      'The 18th Edition introduced requirements for AFDDs in specific applications like sleeping accommodation.',
  },
  {
    id: 277,
    question: 'Amendment 2 to BS 7671:2018 updated requirements for:',
    options: [
      'Waste electrical equipment disposal and energy efficiency',
      'Electric vehicle charging and smart appliances',
      'Damp conditions or connected loads not removed',
      'RCD protection or mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      'Amendment 2 introduced specific requirements for EV charging and smart appliance considerations.',
  },
  {
    id: 278,
    question: 'Building Regulations Part P requires notification for:',
    options: [
      'Correct connections at both switches and intermediate positions',
      'PEN fault detection and automatic disconnection',
      'New circuits, consumer unit changes and bathroom/kitchen work',
      'Duration of the installation plus reasonable period',
    ],
    correctAnswer: 2,
    explanation:
      'Part P requires notification for new circuits, consumer unit work and installations in special locations.',
  },
  {
    id: 279,
    question:
      'The Construction (Design and Management) Regulations affect electrical contractors by:',
    options: [
      'Functional testing of detection and alarm systems',
      'Specific areas or circuits inspected and tested',
      'Alternative protection provided and risk assessment completed',
      'Requiring health and safety planning and coordination',
    ],
    correctAnswer: 3,
    explanation:
      'CDM regulations require health and safety planning, coordination and competency throughout construction.',
  },
  {
    id: 280,
    question: 'Competent person scheme registration requires:',
    options: [
      'Demonstrated competency, insurance and quality procedures',
      'Different sensitivities and/or time delays',
      'Continuity, Insulation, Polarity, Earth loop, RCD, Functional',
      'High-frequency components and specialised detection equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Scheme registration requires demonstrated competency, appropriate insurance and quality management systems.',
  },
  {
    id: 281,
    question: 'The latest surge protection requirements in BS 7671 apply to:',
    options: [
      'Reduced oxygen levels and restricted escape routes',
      'Most installations unless specifically exempted',
      'Isolate, Test, Prove dead, Lock off',
      '1.5 times the rating of protective device',
    ],
    correctAnswer: 1,
    explanation:
      'Current regulations require surge protection for most installations with specific exemption criteria.',
  },
  {
    id: 282,
    question: 'Professional indemnity insurance for electrical contractors must cover:',
    options: [
      'High temperature and humidity',
      'Earth fault loop impedance and RCD operation',
      'Design liability and consequential losses',
      'Damp conditions or connected loads not removed',
    ],
    correctAnswer: 2,
    explanation:
      'Professional indemnity insurance must cover design liability and potential consequential losses from electrical work.',
  },
  {
    id: 283,
    question: 'Continuing professional development (CPD) for electrical engineers requires:',
    options: [
      'Reduced oxygen levels and restricted escape routes',
      'To ensure switches operate only on line conductor',
      'Test while flexing the cable',
      'Regular updating of knowledge and skills',
    ],
    correctAnswer: 3,
    explanation:
      'CPD requires ongoing development to maintain current knowledge and competency standards.',
  },
  {
    id: 284,
    question: 'The latest requirements for electric vehicle charging installations include:',
    options: [
      'Enhanced protection and load management systems',
      'Temperature sensor calibration and zone control verification',
      'When areas could not be accessed as agreed with client',
      'One socket with higher resistance reading',
    ],
    correctAnswer: 0,
    explanation:
      'EV charging requires enhanced protection including PEN fault detection and load management.',
  },
  {
    id: 285,
    question: 'Energy efficiency regulations affect electrical installations by requiring:',
    options: [
      'Loose connections or poor earth continuity',
      'Efficient lighting and control systems',
      'Consider higher rated RCDs or circuit division',
      'Design liability and consequential losses',
    ],
    correctAnswer: 1,
    explanation:
      'Current regulations promote energy efficiency through efficient lighting and intelligent control systems.',
  },
  {
    id: 286,
    question: 'The Product Construction Regulation (CPR) affects electrical cables by:',
    options: [
      'Locking off or removing fuses/links',
      'Before initial energisation and periodically thereafter',
      'Fire performance classification and CE marking',
      'Communications testing and consumer protection',
    ],
    correctAnswer: 2,
    explanation:
      'CPR requires fire performance classification and CE marking for construction cables.',
  },
  {
    id: 287,
    question: 'Smart meter installation regulations require:',
    options: [
      'Loose connections or poor earth continuity',
      'Arc fault detection devices (AFDD) in certain circumstances',
      'Record C2 and inform responsible person',
      'Communications testing and consumer protection',
    ],
    correctAnswer: 3,
    explanation:
      'Smart meter regulations require communications verification and consumer protection measures.',
  },
  {
    id: 288,
    question: 'The latest accessibility requirements for electrical installations include:',
    options: [
      'Accessible heights for switches and controls',
      'Protective conductor continuity and earth fault path',
      'When areas could not be accessed as agreed with client',
      'Ensure metalwork is at earth potential',
    ],
    correctAnswer: 0,
    explanation:
      'Accessibility regulations specify appropriate heights and positions for electrical controls.',
  },
  {
    id: 289,
    question: 'Environmental regulations affecting electrical work include:',
    options: [
      'Record actual values with deviation noted',
      'Waste electrical equipment disposal and energy efficiency',
      'Damp conditions or connected loads not removed',
      'Reduced oxygen levels and restricted escape routes',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental regulations address WEEE disposal and energy efficiency requirements.',
  },
  {
    id: 290,
    question: 'Data protection regulations affect electrical contractors through:',
    options: [
      'Pilot wire integrity and in-cable control box function',
      'Account for not all loads operating simultaneously',
      'Customer information handling and smart device data',
      'Alternative protection provided and risk assessment completed',
    ],
    correctAnswer: 2,
    explanation:
      'Data protection regulations apply to customer information and smart device data handling.',
  },
  {
    id: 291,
    question: 'The latest fire safety regulations affect electrical installations by:',
    options: [
      'Patient safety, life support systems and infection control',
      'Safety sensors, obstruction detection and emergency release',
      'Prospective Fault Current - confirms equipment rating',
      'Enhanced fire stopping and emergency lighting requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Fire safety regulations require enhanced fire stopping and comprehensive emergency lighting.',
  },
  {
    id: 292,
    question: 'Electromagnetic compatibility (EMC) regulations require:',
    options: [
      'Equipment not to cause or be susceptible to interference',
      'Damp conditions or connected loads not removed',
      'Identify hazards and implement control measures',
      'Supply characteristics and earthing system',
    ],
    correctAnswer: 0,
    explanation:
      "EMC regulations ensure equipment doesn't cause interference and operates correctly despite interference.",
  },
  {
    id: 293,
    question: 'The current requirements for electrical installation certificates include:',
    options: [
      'All switches and control devices should be closed',
      'Comprehensive testing schedules and digital submission capability',
      'Duration of the installation plus reasonable period',
      'Critical life support equipment that cannot be isolated',
    ],
    correctAnswer: 1,
    explanation:
      'Current certificate requirements include detailed testing schedules and digital submission capabilities.',
  },
  {
    id: 294,
    question: 'Low voltage directive compliance requires:',
    options: [
      'Regular check-in procedures and emergency contacts',
      'Supply characteristics and earthing system',
      'CE marking and declaration of conformity',
      'Customer information handling and smart device data',
    ],
    correctAnswer: 2,
    explanation: "LVD compliance requires CE marking and manufacturer's declaration of conformity.",
  },
  {
    id: 295,
    question: 'The latest ventilation requirements affect electrical installations by:',
    options: [
      'Moisture and salt corrosion effects on connections',
      'Communication protocols and electronic component protection',
      'Areas inspected, limitations, and percentage of installation sampled',
      'Integration with mechanical ventilation and air quality systems',
    ],
    correctAnswer: 3,
    explanation:
      'Ventilation regulations require integration with mechanical systems and air quality monitoring.',
  },
  {
    id: 296,
    question: 'Security system regulations require electrical installations to:',
    options: [
      'Tamper detection and backup power systems',
      'Complex or high-risk electrical work',
      'To prevent electric shock and equipment damage',
      'DC and AC isolation with appropriate test equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Security systems require tamper detection and reliable backup power for effectiveness.',
  },
  {
    id: 297,
    question: 'The latest requirements for temporary electrical installations include:',
    options: [
      'Electromagnetic field measurement and shielding verification',
      'Enhanced protection and frequent inspection schedules',
      'Design liability and consequential losses',
      'Reproducing fault conditions and systematic monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'Temporary installations require enhanced protection and more frequent inspection due to their nature.',
  },
  {
    id: 298,
    question: 'Medical electrical equipment installation requires:',
    options: [
      'Electromagnetic field limits and cookware compatibility',
      'Accumulated earth leakage from multiple sources',
      'IT earthing systems and supplementary bonding',
      'Temperature and voltage drop effects vary with load',
    ],
    correctAnswer: 2,
    explanation:
      'Medical locations require IT earthing systems and comprehensive supplementary bonding for patient safety.',
  },
  {
    id: 299,
    question: 'The current renewable energy regulations require:',
    options: [
      'IP rating and general condition',
      'Ensure all metalwork is at same potential',
      'Insulation monitoring device verification',
      'Grid code compliance and export limitation',
    ],
    correctAnswer: 3,
    explanation:
      'Renewable installations must comply with grid codes and include appropriate export limitation.',
  },
  {
    id: 300,
    question: 'Electrical safety management systems must include:',
    options: [
      'Risk assessment, competency management and performance monitoring',
      'Integration with mechanical ventilation and air quality systems',
      'Testing must not compromise life safety during occupied periods',
      'Alternative protection provided and risk assessment completed',
    ],
    correctAnswer: 0,
    explanation:
      'Comprehensive safety management requires risk assessment, competency management and performance monitoring systems.',
  },
];

// Enhanced function to get random questions with improved distribution
export const getRandomMockExamQuestions = (questionCount: number = 30): QuizQuestion[] => {
  const shuffled = [...mockExamQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, questionCount);
};
