import { QuizQuestion } from '@/components/quiz/types';

export const zsTestingQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'At which point should Zs be measured for socket outlet circuits?',
    options: [
      'Only at the first socket',
      'At the furthest socket outlet',
      'At the distribution board only',
      'At any convenient socket',
    ],
    correctAnswer: 1,
    explanation:
      'Zs should be measured at the furthest point of the circuit, as this represents the highest impedance and the worst case for ensuring disconnection within the required time.',
  },
  {
    id: 2,
    question: 'When testing Zs at lighting points, where is the most appropriate test location?',
    options: [
      'At the lighting circuit MCB',
      'At the nearest switch on the circuit',
      'At the ceiling rose or light fitting',
      'At the consumer unit main switch',
    ],
    correctAnswer: 2,
    explanation:
      'Testing at the ceiling rose or light fitting checks the loop impedance at the actual point of connection, giving a true worst-case reading for the circuit.',
  },
  {
    id: 3,
    question: 'What is the minimum proportion of similar points that should be tested for Zs in an installation?',
    options: [
      '100% of points',
      '25% minimum',
      '50% minimum',
      '10% minimum',
    ],
    correctAnswer: 3,
    explanation:
      'Common practice is to test at least 10% of similar points, including the furthest point, though testing more points provides better verification of the circuit.',
  },
  {
    id: 4,
    question: 'When testing Zs at a three-phase outlet, which measurement approach is correct?',
    options: [
      'Test each line conductor to earth separately',
      'Test between line conductors only',
      'Test only one line conductor to earth',
      'Test neutral to earth only',
    ],
    correctAnswer: 0,
    explanation:
      'Each line conductor should be tested to earth separately, as the loop impedance can vary between phases due to different cable routes, terminations or connections.',
  },
  {
    id: 5,
    question: 'What is the main reason for testing Zs at multiple points on the same circuit?',
    options: [
      'To confirm the circuit voltage is balanced',
      'To identify variations in impedance along the circuit',
      'To measure the prospective fault current at each point',
      'To check the insulation resistance of the cable',
    ],
    correctAnswer: 1,
    explanation:
      'Testing at multiple points helps identify impedance variations that could indicate poor connections, cable damage or other installation issues along the circuit.',
  },
  {
    id: 6,
    question: 'At which type of equipment should Zs always be measured?',
    options: [
      'Double-insulated (Class II) equipment',
      'SELV-supplied equipment',
      'Fixed equipment with exposed-conductive-parts',
      'Battery-powered portable equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Fixed equipment with exposed-conductive-parts relies on the earth fault loop for protection by automatic disconnection, so Zs must be verified at that point.',
  },
  {
    id: 7,
    question: 'When testing Zs at a cooker circuit, where should the measurement be taken?',
    options: [
      'At the cooker control unit only',
      'At the cooker outlet point only',
      'Only at the distribution board',
      'At both the control unit and the connection point',
    ],
    correctAnswer: 3,
    explanation:
      'Testing at both the cooker control switch/unit and the appliance connection point confirms adequate loop impedance at all connection points on the circuit.',
  },
  {
    id: 8,
    question:
      'What should be done if Zs readings vary significantly between test points on the same circuit?',
    options: [
      'Investigate for poor connections or faults',
      'Take an average of all readings',
      'Record the lowest reading',
      'Use the highest reading only',
    ],
    correctAnswer: 0,
    explanation:
      'Significant variations in Zs readings indicate potential problems such as poor connections, damaged cables or incorrect wiring that must be investigated before energising.',
  },
  {
    id: 9,
    question: 'In a radial circuit, how does Zs typically change from the origin to the end?',
    options: [
      'Decreases towards the end',
      'Increases towards the end',
      'Varies randomly',
      'Remains constant',
    ],
    correctAnswer: 1,
    explanation:
      'In a radial circuit, Zs increases towards the end because the loop includes the additional resistance of the cable length between the origin and the test point.',
  },
  {
    id: 10,
    question: 'When is it acceptable to use calculated Zs values instead of measured values?',
    options: [
      'Whenever measurement would take too long',
      'On any circuit protected by an RCD',
      'For inaccessible points where measurement is impractical',
      'Only on three-phase circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Calculated Zs values (Zs = Ze + R1 + R2) may be used for genuinely inaccessible points, but measured values are preferred; calculations should use worst-case assumptions.',
  },
];
