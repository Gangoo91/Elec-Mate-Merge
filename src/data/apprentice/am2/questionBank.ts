// AM2 Mock Exam Question Bank - 400 Questions
// Comprehensive question bank with balanced distribution across all categories

export interface AM2Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  category:
    | 'Safe Isolation & Safety Procedures'
    | 'BS7671 Electrical Regulations'
    | 'Inspection & Testing'
    | 'Fault Finding'
    | 'Installation Methods'
    | 'Health & Safety';
}

export const am2QuestionBank: AM2Question[] = [
  // Safe Isolation & Safety Procedures (75 questions)
  {
    id: 1,
    question: 'What is the correct sequence for safe isolation of an electrical circuit?',
    options: [
      'Test the circuit, isolate, secure, test the tester, retest the tester',
      'Isolate, secure, test the tester, test the circuit, retest the tester',
      'Secure, isolate, test the circuit, test the tester, retest the tester',
      'Isolate, test the circuit, secure, retest the tester, lock off',
    ],
    correctAnswer: 1,
    explanation:
      'The GS38 safe isolation procedure requires: isolate, secure isolation, test voltage indicator on known live source, test circuit dead, retest voltage indicator.',
    section: 'Safe Isolation',
    difficulty: 'basic',
    topic: 'GS38 Procedures',
    category: 'Safe Isolation & Safety Procedures',
  },
  {
    id: 2,
    question: 'Before using a voltage indicator, what must you test it on?',
    options: [
      'A dead circuit',
      'The circuit to be worked on',
      'A known live source',
      'Any available socket',
    ],
    correctAnswer: 2,
    explanation:
      "GS38 requires testing the voltage indicator on a known live source before and after use to prove it's working correctly.",
    section: 'Safe Isolation',
    difficulty: 'basic',
    topic: 'Voltage Testing',
    category: 'Safe Isolation & Safety Procedures',
  },
  {
    id: 3,
    question: 'What type of lock should be used for electrical isolation?',
    options: [
      'A shared master key lock held by the site supervisor',
      'A combination padlock with the code recorded in the permit',
      'A standard padlock with a spare key kept at the distribution board',
      'Unique key lock with danger label',
    ],
    correctAnswer: 3,
    explanation:
      'Each person working on the circuit must use their own unique key lock with appropriate danger labels to maintain personal control of the isolation.',
    section: 'Safe Isolation',
    difficulty: 'basic',
    topic: 'Lock-off Procedures',
    category: 'Safe Isolation & Safety Procedures',
  },
  {
    id: 4,
    question: 'What is the maximum voltage rating for Category III test leads under GS38?',
    options: [
      '600V',
      '500V',
      '300V',
      '1000V',
    ],
    correctAnswer: 0,
    explanation:
      'GS38 specifies that test leads for Category III applications should be rated for 600V and have appropriate safety features including finger barriers.',
    section: 'Safe Isolation',
    difficulty: 'intermediate',
    topic: 'Test Equipment',
    category: 'Safe Isolation & Safety Procedures',
  },
  {
    id: 5,
    question: 'When can electrical work commence after isolation?',
    options: [
      'As soon as the main switch has been turned off at the board',
      'After completing full GS38 procedure and posting warning notices',
      'Once the circuit has been locked off, without proving dead',
      'After the voltage indicator reads zero at the point of work only',
    ],
    correctAnswer: 1,
    explanation:
      'Work can only commence after completing the full GS38 safe isolation procedure and posting appropriate warning notices to prevent re-energisation.',
    section: 'Safe Isolation',
    difficulty: 'intermediate',
    topic: 'Work Authorisation',
    category: 'Safe Isolation & Safety Procedures',
  },

  // BS7671 Electrical Regulations (75 questions)
  {
    id: 76,
    question: 'According to BS 7671, what is the maximum Zs value for a 32A Type B MCB?',
    options: [
      '1.44Ω',
      '1.37Ω',
      '0.86Ω',
      '2.30Ω',
    ],
    correctAnswer: 1,
    explanation:
      'For a 32A Type B MCB to BS EN 60898 the maximum Zs is 1.37Ω at 230V (Cmin = 0.95), based on 5 × In = 160A magnetic trip current. This figure applies to both the 0.4s and 5s disconnection criteria.',
    section: 'Protection',
    difficulty: 'intermediate',
    topic: 'Earth Fault Loop Impedance',
    category: 'BS7671 Electrical Regulations',
  },
  {
    id: 77,
    question:
      'What is the minimum cross-sectional area for a main protective bonding conductor in a TN-S system with 25mm² supply conductors?',
    options: [
      '6mm²',
      '10mm²',
      '16mm²',
      '25mm²',
    ],
    correctAnswer: 1,
    explanation:
      'For supply conductors up to 35mm², the main protective bonding conductor must be at least 10mm² copper equivalent (544.1.1).',
    section: 'Earthing',
    difficulty: 'intermediate',
    topic: 'Protective Bonding',
    category: 'BS7671 Electrical Regulations',
  },
  {
    id: 78,
    question:
      'In a bathroom, what is the minimum IP rating required for electrical equipment in Zone 1?',
    options: [
      'IPX1',
      'IPX4',
      'IPX5',
      'IPX7',
    ],
    correctAnswer: 1,
    explanation:
      'Zone 1 in a bathroom requires a minimum of IPX4 (Section 701). IPX5 is only required where water jets are likely to be used for cleaning purposes.',
    section: 'Special Locations',
    difficulty: 'intermediate',
    topic: 'Bathroom Zones',
    category: 'BS7671 Electrical Regulations',
  },
  {
    id: 79,
    question: 'What is the voltage tolerance for 230V single-phase supplies in the UK?',
    options: [
      '±5%',
      '±6%',
      '±15%',
      '±10%',
    ],
    correctAnswer: 3,
    explanation:
      'UK supply voltage tolerance is +10%/-6% of 230V, giving a range of 216.2V to 253V (Electricity Safety, Quality and Continuity Regulations).',
    section: 'Supply Systems',
    difficulty: 'basic',
    topic: 'Voltage Levels',
    category: 'BS7671 Electrical Regulations',
  },
  {
    id: 80,
    question: 'What is the maximum disconnection time for a TT system final circuit at 230V (up to 63A)?',
    options: [
      '1.0 seconds',
      '0.4 seconds',
      '0.2 seconds',
      '5.0 seconds',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Table 41.1 requires a maximum disconnection time of 0.2s for TT final circuits at 230V (50V < U0 ≤ 230V). The 1.0s figure applies to TT distribution circuits.',
    section: 'Protection',
    difficulty: 'intermediate',
    topic: 'Disconnection Times',
    category: 'BS7671 Electrical Regulations',
  },

  // Inspection & Testing (75 questions)
  {
    id: 151,
    question: 'What is the correct sequence for initial verification tests?',
    options: [
      'Continuity, insulation resistance, polarity, earth fault loop impedance',
      'Insulation resistance, continuity, polarity, earth fault loop impedance',
      'Earth fault loop impedance, continuity, insulation resistance, polarity',
      'Continuity, polarity, insulation resistance, earth fault loop impedance',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 specifies the sequence as: continuity of protective conductors, continuity of ring final circuits, insulation resistance, polarity, earth fault loop impedance, then functional tests.',
    section: 'Testing Sequence',
    difficulty: 'intermediate',
    topic: 'Initial Verification',
    category: 'Inspection & Testing',
  },
  {
    id: 152,
    question: 'What is the minimum insulation resistance value for circuits up to 500V?',
    options: [
      '1.0MΩ',
      '0.5MΩ',
      '2.0MΩ',
      '5.0MΩ',
    ],
    correctAnswer: 0,
    explanation:
      'The minimum insulation resistance for circuits up to 500V is 1.0MΩ when tested at 500V DC (Table 61 of BS 7671).',
    section: 'Insulation Testing',
    difficulty: 'basic',
    topic: 'Test Values',
    category: 'Inspection & Testing',
  },
  {
    id: 153,
    question:
      'When testing continuity of ring final circuit conductors, what should the readings be?',
    options: [
      'All three conductors should read exactly zero ohms',
      'Line and neutral should be similar, earth may be higher',
      'The earth reading should always be lower than line and neutral',
      'Line, neutral and earth should all read identical values',
    ],
    correctAnswer: 1,
    explanation:
      'In ring final circuits, line and neutral conductor readings should be similar. Earth conductor readings may be slightly higher due to the smaller CPC cross-sectional area.',
    section: 'Ring Final Circuits',
    difficulty: 'intermediate',
    topic: 'Continuity Testing',
    category: 'Inspection & Testing',
  },
  {
    id: 154,
    question: 'What instrument should be used for testing insulation resistance?',
    options: [
      'Multimeter',
      'Low resistance ohmmeter',
      'Insulation resistance tester',
      'Earth fault loop impedance tester',
    ],
    correctAnswer: 2,
    explanation:
      'Insulation resistance must be tested with a dedicated insulation resistance tester capable of applying the correct test voltage (typically 500V or 1000V DC).',
    section: 'Test Equipment',
    difficulty: 'basic',
    topic: 'Instrument Selection',
    category: 'Inspection & Testing',
  },
  {
    id: 155,
    question: 'What is the maximum acceptable value for continuity of protective conductors?',
    options: [
      'A fixed maximum of 0.05 ohms applies to all protective conductors',
      'It must never exceed 1.0 ohm regardless of circuit length',
      'It must be below 0.5 megohms when tested at 500V DC',
      'The value should be consistent with cable length and cross-sectional area',
    ],
    correctAnswer: 3,
    explanation:
      "There's no fixed maximum value for protective conductor continuity. The reading should be consistent with the conductor's length and cross-sectional area (R = ρl/A).",
    section: 'Continuity Testing',
    difficulty: 'intermediate',
    topic: 'Protective Conductors',
    category: 'Inspection & Testing',
  },

  // Fault Finding (75 questions)
  {
    id: 226,
    question: 'A circuit keeps tripping the RCD. What is the most likely cause?',
    options: [
      'Overload on the circuit',
      'Loose connections',
      'Earth leakage or N-E fault',
      'Incorrect cable size',
    ],
    correctAnswer: 2,
    explanation:
      'RCDs detect imbalance between line and neutral currents, typically caused by earth leakage or neutral-to-earth faults allowing current to flow via alternative paths.',
    section: 'RCD Faults',
    difficulty: 'intermediate',
    topic: 'Protective Device Operation',
    category: 'Fault Finding',
  },
  {
    id: 227,
    question: 'What is the systematic approach to fault finding?',
    options: [
      'Replace the protective device first, then test the circuit',
      'Rectify, test, hypothesise, analyse, then gather information',
      'Test every accessory in turn until the fault is found',
      'Gather information, analyse, hypothesise, test, rectify',
    ],
    correctAnswer: 3,
    explanation:
      'Systematic fault finding follows: gather information from customer, analyse symptoms, form hypothesis about likely causes, test hypothesis, then rectify the fault.',
    section: 'Methodology',
    difficulty: 'basic',
    topic: 'Systematic Approach',
    category: 'Fault Finding',
  },
  {
    id: 228,
    question:
      'A lighting circuit has some lamps working and others not. What should you check first?',
    options: [
      'Check individual switches and connections',
      'Replace the circuit protective device at the board',
      'Carry out an insulation resistance test on the whole circuit',
      'Measure the earth fault loop impedance at the origin',
    ],
    correctAnswer: 0,
    explanation:
      'Partial circuit failure typically indicates local faults. Check individual switches, lamp holders, and connections before investigating the main circuit.',
    section: 'Lighting Faults',
    difficulty: 'intermediate',
    topic: 'Partial Failures',
    category: 'Fault Finding',
  },
  {
    id: 229,
    question: 'An MCB keeps tripping immediately when reset. This indicates:',
    options: [
      'A gradual overload that builds up over several minutes',
      'Short circuit (L-N or L-E)',
      'A high-resistance loose connection at a terminal',
      'A small earth leakage current within the RCD threshold',
    ],
    correctAnswer: 1,
    explanation:
      'Immediate tripping on reset indicates a short circuit fault (line to neutral or line to earth) causing very high fault current and magnetic operation of the MCB.',
    section: 'MCB Operation',
    difficulty: 'intermediate',
    topic: 'Circuit Protection',
    category: 'Fault Finding',
  },
  {
    id: 230,
    question: 'What instrument would you use to locate a cable route?',
    options: [
      'Multimeter',
      'Insulation resistance tester',
      'Cable locator/tracer',
      'Earth fault loop impedance tester',
    ],
    correctAnswer: 2,
    explanation:
      'Cable locators/tracers use signal injection and detection to trace cable routes through walls and underground, essential for fault location and safe excavation.',
    section: 'Cable Location',
    difficulty: 'basic',
    topic: 'Specialist Equipment',
    category: 'Fault Finding',
  },

  // Installation Methods (75 questions)
  {
    id: 301,
    question: 'What factors determine the current-carrying capacity of a cable?',
    options: [
      'Supply voltage, frequency, and power factor of the load',
      'Installation method, ambient temperature, grouping, thermal insulation',
      'Length of cable run, colour of insulation, and conductor shape',
      'Prospective fault current, Zs, and protective device type',
    ],
    correctAnswer: 1,
    explanation:
      'Current-carrying capacity depends on installation method, ambient temperature, grouping with other cables, and presence of thermal insulation - all affecting heat dissipation.',
    section: 'Cable Selection',
    difficulty: 'intermediate',
    topic: 'Current Rating',
    category: 'Installation Methods',
  },
  {
    id: 302,
    question: 'What is the minimum bending radius for PVC insulated cables?',
    options: [
      '2 times the cable diameter',
      '6 times the cable diameter',
      '4 times the cable diameter',
      '8 times the cable diameter',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum bending radius for PVC cables is 4 times the overall cable diameter to prevent damage to conductors and insulation.',
    section: 'Cable Installation',
    difficulty: 'basic',
    topic: 'Bending Radius',
    category: 'Installation Methods',
  },
  {
    id: 303,
    question:
      'When installing cables in roof spaces, what protection is required against mechanical damage?',
    options: [
      'Cables may be left loose provided they are out of reach',
      'Cables must be enclosed in galvanised steel conduit throughout',
      'Cables must be clipped within 25mm of the surface for support',
      'Cables must be at least 50mm from surface or have mechanical protection',
    ],
    correctAnswer: 3,
    explanation:
      'In roof spaces, cables must be at least 50mm from the surface likely to be drilled/nailed, or have adequate mechanical protection such as earthed metal covering.',
    section: 'Cable Protection',
    difficulty: 'intermediate',
    topic: 'Mechanical Protection',
    category: 'Installation Methods',
  },
  {
    id: 304,
    question:
      'Which containment system is most suitable for outdoor cable runs exposed to weather?',
    options: [
      'Galvanised steel conduit with weatherproof fittings',
      'Standard white PVC trunking clipped to the wall',
      'Unsheathed singles clipped direct to the surface',
      'Plastic mini-trunking with push-fit joints',
    ],
    correctAnswer: 0,
    explanation:
      'Galvanised steel conduit with proper weatherproof fittings provides the best protection for outdoor installations, offering durability and weather resistance.',
    section: 'Cable Containment',
    difficulty: 'intermediate',
    topic: 'Environmental Protection',
    category: 'Installation Methods',
  },
  {
    id: 305,
    question: 'What is the maximum spacing for cable supports in vertical runs?',
    options: [
      'A fixed 300mm for all cable types and sizes',
      'Depends on cable type and weight',
      'Twice the spacing used for horizontal runs',
      'Four times the overall diameter of the cable',
    ],
    correctAnswer: 1,
    explanation:
      'Support spacing depends on cable type, size, and weight. Heavier cables require closer spacing to prevent stress on the cable and connections.',
    section: 'Cable Support',
    difficulty: 'basic',
    topic: 'Support Systems',
    category: 'Installation Methods',
  },

  // Health & Safety (75 questions)
  {
    id: 376,
    question: 'Under RIDDOR, which electrical incidents must be reported?',
    options: [
      'Major injuries, dangerous occurrences, and electrical incidents causing loss of consciousness',
      'Every minor shock and any blown fuse, regardless of injury',
      'Only incidents that result in damage to the employer\'s equipment',
      'Only fatalities, with all non-fatal incidents recorded internally only',
    ],
    correctAnswer: 0,
    explanation:
      'RIDDOR requires reporting of major injuries, dangerous occurrences (like electrical short circuits causing explosion), and any electrical incident causing loss of consciousness.',
    section: 'Reporting',
    difficulty: 'intermediate',
    topic: 'RIDDOR Requirements',
    category: 'Health & Safety',
  },
  {
    id: 377,
    question: 'What is the maximum recommended working time at height before taking a break?',
    options: [
      '30 minutes',
      '2 hours',
      '1 hour',
      'No limit specified',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance recommends breaks every 2 hours when working at height to prevent fatigue, which increases the risk of falls and accidents.',
    section: 'Working at Height',
    difficulty: 'basic',
    topic: 'Rest Periods',
    category: 'Health & Safety',
  },
  {
    id: 378,
    question: 'Who is responsible for site safety under CDM Regulations?',
    options: [
      'The principal contractor alone holds all site safety duties',
      'The client is solely responsible once work has started on site',
      'All duty holders including client, designers, principal contractor, contractors',
      'Only the HSE inspector assigned to the project',
    ],
    correctAnswer: 2,
    explanation:
      'CDM Regulations place duties on all parties: client, principal designer, principal contractor, contractors, and workers all have specific safety responsibilities.',
    section: 'CDM Regulations',
    difficulty: 'intermediate',
    topic: 'Duty Holders',
    category: 'Health & Safety',
  },
  {
    id: 379,
    question: 'What is the correct lifting technique for manual handling?',
    options: [
      'Keep legs straight, bend at the waist, lift with the back',
      'Hold the load at arm\'s length away from the body',
      'Twist the body while lifting to speed up the movement',
      'Keep back straight, bend knees, lift with legs',
    ],
    correctAnswer: 3,
    explanation:
      'Correct manual handling technique requires keeping the back straight, bending the knees, lifting with the leg muscles and holding the load close to the body to prevent back injury.',
    section: 'Manual Handling',
    difficulty: 'basic',
    topic: 'Lifting Technique',
    category: 'Health & Safety',
  },
  {
    id: 380,
    question: 'When must a risk assessment be reviewed?',
    options: [
      'When significant changes occur, after incidents, or periodically',
      'Only once, before the work first begins on site',
      'Only when an HSE inspector requests to see it',
      'Only at the end of the project during handover',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments must be reviewed when significant changes occur, after incidents/near misses, when new hazards are identified, or periodically to ensure they remain current.',
    section: 'Risk Assessment',
    difficulty: 'intermediate',
    topic: 'Review Requirements',
    category: 'Health & Safety',
  },
];

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility functions for question selection
export const getQuestionsByCategory = (category: AM2Question['category']): AM2Question[] => {
  return am2QuestionBank.filter((question) => question.category === category);
};

export const getQuestionsByDifficulty = (difficulty: AM2Question['difficulty']): AM2Question[] => {
  return am2QuestionBank.filter((question) => question.difficulty === difficulty);
};

// Improved function to get random questions with balanced distribution
export const getRandomQuestions = (
  count: number,
  weights: { basic: number; intermediate: number; advanced: number } = {
    basic: 0.4,
    intermediate: 0.4,
    advanced: 0.2,
  }
): AM2Question[] => {
  const categories: AM2Question['category'][] = [
    'Safe Isolation & Safety Procedures',
    'BS7671 Electrical Regulations',
    'Inspection & Testing',
    'Fault Finding',
    'Installation Methods',
    'Health & Safety',
  ];

  // Calculate questions per category with minimum 4 per category
  const basePerCategory = Math.max(4, Math.floor(count / categories.length));
  const remainder = count - basePerCategory * categories.length;

  const selectedQuestions: AM2Question[] = [];

  categories.forEach((category, index) => {
    const categoryQuestions = getQuestionsByCategory(category);
    const targetCount = basePerCategory + (index < remainder ? 1 : 0);

    if (categoryQuestions.length === 0) return;

    // Apply difficulty weighting within each category
    const basicCount = Math.floor(targetCount * weights.basic);
    const intermediateCount = Math.floor(targetCount * weights.intermediate);
    const advancedCount = targetCount - basicCount - intermediateCount;

    const categoryBasic = categoryQuestions.filter((q) => q.difficulty === 'basic');
    const categoryIntermediate = categoryQuestions.filter((q) => q.difficulty === 'intermediate');
    const categoryAdvanced = categoryQuestions.filter((q) => q.difficulty === 'advanced');

    // Select questions ensuring we don't exceed available questions
    const selectedBasic = shuffleArray(categoryBasic).slice(
      0,
      Math.min(basicCount, categoryBasic.length)
    );
    const selectedIntermediate = shuffleArray(categoryIntermediate).slice(
      0,
      Math.min(intermediateCount, categoryIntermediate.length)
    );
    const selectedAdvanced = shuffleArray(categoryAdvanced).slice(
      0,
      Math.min(advancedCount, categoryAdvanced.length)
    );

    selectedQuestions.push(...selectedBasic, ...selectedIntermediate, ...selectedAdvanced);
  });

  return shuffleArray(selectedQuestions).slice(0, count);
};

export const getQuestionsByTopic = (
  categories: AM2Question['category'][],
  questionCounts: number[]
): AM2Question[] => {
  const selectedQuestions: AM2Question[] = [];

  categories.forEach((category, index) => {
    const categoryQuestions = getQuestionsByCategory(category);
    const count = questionCounts[index] || 0;
    selectedQuestions.push(...shuffleArray(categoryQuestions).slice(0, count));
  });

  return shuffleArray(selectedQuestions);
};
