import { QuizQuestion } from '@/types/quiz';

export const testProceduresQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What should be done before taking continuity readings?',
    options: [
      'Connect the leads to random terminals',
      "Null the leads using the tester's calibration function",
      'Check the circuit is energised',
      'Set the tester to insulation resistance mode',
    ],
    correctAnswer: 1,
    explanation:
      'Nulling the leads removes the resistance of the test leads themselves from the measurement, ensuring accurate readings.',
  },
  {
    id: 2,
    question: 'Which of the following CPC readings would generally be acceptable?',
    options: [
      '2.5 ohms on a 10m radial circuit',
      '1.8 ohms on a 5m radial circuit',
      '0.4 ohms on a 20m radial circuit',
      '3.0 ohms on any circuit',
    ],
    correctAnswer: 2,
    explanation:
      '0.4 ohms on a 20m radial circuit is reasonable and within expected values. The other readings are too high for their respective circuit lengths.',
  },
  {
    id: 3,
    question: "True or False: It's acceptable to just write 'pass' if continuity seems fine.",
    options: [
      'True - pass/fail is sufficient for continuity testing',
      'False - but estimates are acceptable',
      'True - but only for EICR testing',
      'False - actual values must always be recorded',
    ],
    correctAnswer: 3,
    explanation:
      "False. Actual resistance values must always be recorded for proper assessment and future comparison. 'Pass' or tick marks are not acceptable.",
  },
  {
    id: 4,
    question: 'What could cause high resistance on a CPC reading?',
    options: [
      'A loose terminal, damaged conductor, or poor connection',
      'Using a test current that is too high for the conductor',
      'Nulling the leads before taking the measurement',
      'Testing the circuit while it remains energised',
    ],
    correctAnswer: 0,
    explanation:
      'High CPC resistance typically indicates loose connections, damaged conductors, or incorrect installation. These are serious safety issues requiring investigation.',
  },
  {
    id: 5,
    question:
      'Why must continuity issues be resolved before moving to insulation resistance testing?',
    options: [
      'Because the leads must be re-nulled after each test sequence',
      'To avoid applying test voltage to an unsafe or incomplete circuit',
      'Because insulation resistance testing uses a lower test current',
      'To prevent the multifunction tester from overheating',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity failures indicate incomplete circuits that may not be safe to energise or apply test voltages to. All continuity issues must be resolved first.',
  },
  {
    id: 6,
    question: 'What is the acceptable resistance range for a 2.5mm² CPC over 30 metres?',
    options: [
      '2.0 - 3.0 ohms',
      '0.1 - 0.3 ohms',
      '0.4 - 0.8 ohms',
      '1.0 - 1.5 ohms',
    ],
    correctAnswer: 2,
    explanation:
      'For a 2.5mm² CPC over 30m, expect approximately 0.4-0.8 ohms depending on cable type and installation conditions. Values significantly higher suggest problems.',
  },
  {
    id: 7,
    question: 'What open-circuit test voltage and current does GN3 recommend for protective conductor continuity testing?',
    options: [
      'A no-load voltage of 4 to 24V and a short-circuit current of at least 200mA',
      'A no-load voltage of 500V and a current of at least 1mA',
      'A no-load voltage of 250V and a current of at least 10mA',
      'A no-load voltage of 50V and a current of at least 5A',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance Note 3 recommends a continuity test instrument with an open-circuit voltage of 4 to 24V (AC or DC) delivering a short-circuit current of not less than 200mA, ensuring adequate current to reveal high-resistance joints.',
  },
  {
    id: 8,
    question: 'What is the recommended guideline maximum resistance for a main bonding conductor connection?',
    options: [
      'Not more than 0.05 ohms',
      'Not more than 0.5 ohms',
      'Not more than 1.0 ohms',
      'Not more than 0.35 ohms',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 and the On-Site Guide indicate main and supplementary bonding conductor connections should read not more than 0.05 ohms, reflecting their critical role in equipotential bonding.',
  },
  {
    id: 9,
    question: 'What action should be taken if continuity readings are inconsistent between tests?',
    options: [
      'Record the lowest reading obtained and continue',
      'Investigate the connections and retest until consistent',
      'Average the readings and accept the mean value',
      'Increase the test current until readings stabilise',
    ],
    correctAnswer: 1,
    explanation:
      'Inconsistent readings indicate poor connections or intermittent faults that must be investigated and resolved before accepting any test results.',
  },
  {
    id: 10,
    question: 'Which factor most affects the expected resistance value for continuity testing?',
    options: [
      'The ambient lighting level in the work area',
      'The make and model of the test instrument used',
      'Conductor material, cross-sectional area, and length',
      'The time of day the measurement is taken',
    ],
    correctAnswer: 2,
    explanation:
      'Resistance is primarily determined by conductor material (copper/aluminium), cross-sectional area, and length. These factors determine the expected values for comparison.',
  },
];
