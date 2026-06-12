export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const rcdTroubleshootingQuizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      'What is the first step when troubleshooting an RCD that trips immediately upon reset?',
    options: [
      'Isolate all circuits sharing neutrals together',
      'Disconnect all loads and test for earth faults',
      'Switching transients and earth leakage during starting',
      'Test equipment failure or incorrect connections',
    ],
    correctAnswer: 1,
    explanation:
      'Disconnecting all loads and testing for earth faults helps identify whether the problem is in the RCD itself or the connected circuits, ensuring safe diagnosis.',
  },
  {
    id: 2,
    question:
      'Which test voltage should be used for insulation resistance testing when locating earth faults?',
    options: ['250V DC', '1000V DC', '500V DC', '240V AC'],
    correctAnswer: 2,
    explanation:
      'BS 7671 specifies 500V DC for insulation resistance testing of low voltage installations to ensure appropriate stress testing of insulation systems.',
  },
  {
    id: 3,
    question: 'What typically causes RCD nuisance tripping during motor starting?',
    options: [
      'Disconnect all loads and test for earth faults',
      'Test equipment failure or incorrect connections',
      'Main earthing system and supply conditions',
      'Switching transients and earth leakage during starting',
    ],
    correctAnswer: 3,
    explanation:
      'Motor starting creates switching transients and temporary increases in earth leakage current, which can cause sensitive RCDs to trip unnecessarily.',
  },
  {
    id: 4,
    question:
      'If an RCD test button works but electrical testing shows no trip, what is the most likely cause?',
    options: [
      'Test equipment failure or incorrect connections',
      'Complete failure to trip at any test current',
      'Main earthing system and supply conditions',
      'Switching transients and earth leakage during starting',
    ],
    correctAnswer: 0,
    explanation:
      'If the test button works (proving the mechanical trip mechanism), but electrical testing fails, the issue is likely with the test equipment or test connections rather than the RCD.',
  },
  {
    id: 5,
    question:
      'What is the minimum acceptable insulation resistance value indicating no earth fault?',
    options: ['0.1MΩ', '0.5MΩ', '1.0MΩ', '2.0MΩ'],
    correctAnswer: 2,
    explanation:
      'Table 64 sets a minimum insulation resistance of 1.0MΩ for circuits up to and including 500V (tested at 500V DC). 0.5MΩ applies only to SELV/PELV circuits tested at 250V DC.',
  },
  {
    id: 6,
    question: 'When multiple RCDs trip simultaneously, what should be investigated first?',
    options: [
      'Switching transients and earth leakage during starting',
      'Isolate all circuits sharing neutrals together',
      'Main earthing system and supply conditions',
      'Disconnect all loads and test for earth faults',
    ],
    correctAnswer: 2,
    explanation:
      'Simultaneous tripping of multiple RCDs suggests a common cause, most likely related to the main earthing system, supply disturbances, or upstream faults.',
  },
  {
    id: 7,
    question:
      'What diagnostic tool is most effective for capturing intermittent RCD tripping events?',
    options: [
      'Digital multimeter',
      'Insulation resistance tester',
      'RCD tester',
      'Storage oscilloscope',
    ],
    correctAnswer: 3,
    explanation:
      'A storage oscilloscope can capture and store transient events that cause intermittent tripping, allowing analysis of the triggering conditions.',
  },
  {
    id: 8,
    question: 'How should borrowed neutral circuits be handled during RCD troubleshooting?',
    options: [
      'Isolate all circuits sharing neutrals together',
      'Test each circuit independently',
      'Ignore neutral arrangements',
      'Test neutrals separately from lines',
    ],
    correctAnswer: 0,
    explanation:
      'Circuits sharing neutrals must be isolated together during testing to avoid incorrect readings and ensure proper fault diagnosis.',
  },
  {
    id: 9,
    question: 'What is the primary safety consideration during RCD troubleshooting?',
    options: [
      'Document all findings',
      'Assume RCD protection is compromised',
      'Work quickly to minimise downtime',
      'Use calibrated test equipment',
    ],
    correctAnswer: 1,
    explanation:
      'During troubleshooting, RCD protection may be compromised, so additional safety measures must be implemented to protect against electric shock.',
  },
  {
    id: 10,
    question: 'Which condition requires immediate RCD replacement without further testing?',
    options: [
      'Trip time of 280ms at rated current',
      'Occasional nuisance tripping',
      'Complete failure to trip at any test current',
      'Slight discoloration of housing',
    ],
    correctAnswer: 2,
    explanation:
      'Complete failure to trip indicates total protection failure and presents immediate danger, requiring instant replacement regardless of other factors.',
  },
];
