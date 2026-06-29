export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const rcdMaintenanceQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'How often does the BS 7671 RCD instruction notice tell building users to press the test button?',
    options: [
      'Annually',
      'Six-monthly',
      'Weekly',
      'Quarterly',
    ],
    correctAnswer: 1,
    explanation:
      'The RCD instruction notice required by BS 7671 Regulation 514.12.2 tells users to test the device six-monthly by pressing the test button, then manually switch it back on.',
  },
  {
    id: 2,
    question: 'What is the minimum retention period for RCD test records?',
    options: [
      '1 year',
      '2 years',
      '3 years',
      '5 years',
    ],
    correctAnswer: 2,
    explanation:
      'RCD test records should be retained for a minimum of 3 years to demonstrate ongoing compliance and maintenance history.',
  },
  {
    id: 3,
    question: 'Which maintenance activity requires a qualified electrician?',
    options: [
      'Monthly test button operation',
      'Visual inspection of RCD housing',
      'Recording test results in logbook',
      'Annual electrical testing with instruments',
    ],
    correctAnswer: 3,
    explanation:
      'Annual electrical testing requires qualified electricians with calibrated test equipment and knowledge of BS 7671 test procedures.',
  },
  {
    id: 4,
    question: 'What should be done if an RCD fails to trip during test button operation?',
    options: [
      'Contact a qualified electrician immediately',
      'Reset the RCD and try again',
      'Try pressing the button harder',
      'Wait 24 hours and test again',
    ],
    correctAnswer: 0,
    explanation:
      'Test button failure indicates the RCD may not provide protection. Immediately contact a qualified electrician and consider the protection compromised.',
  },
  {
    id: 5,
    question: 'What environmental factor most commonly affects RCD performance?',
    options: [
      'Ambient lighting levels',
      'Temperature and humidity',
      'Electromagnetic fields',
      'Air pressure variations',
    ],
    correctAnswer: 1,
    explanation:
      'Temperature and humidity significantly affect RCD performance, with extreme conditions potentially causing trip time variations and component degradation.',
  },
  {
    id: 6,
    question: 'When should an RCD be considered for replacement due to age?',
    options: [
      'After 25 years',
      'After 10 years',
      'After 15 years',
      'After 5 years',
    ],
    correctAnswer: 2,
    explanation:
      'While RCDs can last longer, consideration for replacement typically begins around 15 years due to component aging and potential reliability concerns.',
  },
  {
    id: 7,
    question: 'What is the primary purpose of RCD maintenance documentation?',
    options: [
      'To track warranty periods',
      'To satisfy insurance requirements only',
      'To plan future electrical work',
      'To demonstrate ongoing compliance and safety',
    ],
    correctAnswer: 3,
    explanation:
      'Documentation demonstrates ongoing compliance with regulations, provides evidence of due diligence, and supports safety management systems.',
  },
  {
    id: 8,
    question: 'Which condition requires immediate RCD replacement?',
    options: [
      'Complete failure to trip at any test current',
      'Trip time of 250ms at rated current',
      'Slight discolouration of housing',
      'Occasional nuisance tripping',
    ],
    correctAnswer: 0,
    explanation:
      'Complete failure to trip indicates total protection failure and requires immediate replacement as it presents a serious safety risk.',
  },
  {
    id: 9,
    question: 'How should ambient temperature and humidity be recorded during RCD maintenance?',
    options: [
      'Only when a fault is suspected',
      'As part of routine maintenance records',
      'Verbally reported but never written down',
      'Only by the manufacturer at point of sale',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental conditions should be recorded routinely as they affect RCD performance and help identify trends that may impact reliability.',
  },
  {
    id: 10,
    question: 'What training should building users receive for RCD maintenance?',
    options: [
      'Full electrical testing procedures',
      'RCD replacement techniques',
      'Test button operation and emergency procedures',
      'Complex fault diagnosis methods',
    ],
    correctAnswer: 2,
    explanation:
      'Users need training on test button operation, recognizing failure symptoms, emergency procedures, and when to contact professionals.',
  },
];
