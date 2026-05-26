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
      'Zs should be measured at the furthest socket outlet as this represents the highest impedance point and worst-case scenario for the circuit.',
  },
  {
    id: 2,
    question: 'When testing Zs at lighting points, where is the most appropriate test location?',
    options: [
      'Test each phase to earth separately',
      'Investigate for poor connections or faults',
      'At the ceiling rose or light fitting',
      'At the furthest socket outlet',
    ],
    correctAnswer: 2,
    explanation:
      'Testing should be performed at the ceiling rose or light fitting as this is the actual point where the equipment is connected.',
  },
  {
    id: 3,
    question: 'What percentage of outlet points should be tested for Zs in a typical installation?',
    options: [
      '100% of outlets',
      '25% minimum',
      '50% minimum',
      '10% minimum',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 requires a minimum of 10% of outlet points to be tested, though testing more points provides better verification.',
  },
  {
    id: 4,
    question: 'When testing Zs at a three-phase outlet, which measurement approach is correct?',
    options: [
      'Test each phase to earth separately',
      'Test between phases only',
      'Test only one phase to earth',
      'Test neutral to earth only',
    ],
    correctAnswer: 0,
    explanation:
      'Each phase should be tested to earth separately as the impedance may vary between phases due to different cable routes or connections.',
  },
  {
    id: 5,
    question: 'What is the main reason for testing Zs at multiple points on the same circuit?',
    options: [
      'Fixed equipment with exposed metalwork',
      'To identify variations in impedance along the circuit',
      'Investigate for poor connections or faults',
      'For inaccessible points where measurement is impractical',
    ],
    correctAnswer: 1,
    explanation:
      'Testing at multiple points helps identify impedance variations that could indicate poor connections, cable damage, or installation issues.',
  },
  {
    id: 6,
    question: 'At which type of equipment should Zs always be measured?',
    options: [
      'At the furthest socket outlet',
      'At both the control unit and outlet',
      'Fixed equipment with exposed metalwork',
      'At the ceiling rose or light fitting',
    ],
    correctAnswer: 2,
    explanation:
      'Fixed equipment with exposed metalwork requires Zs measurement as it relies on the earth fault loop for protection against electric shock.',
  },
  {
    id: 7,
    question: 'When testing Zs at a cooker circuit, where should the measurement be taken?',
    options: [
      'At the cooker control unit',
      'At the cooker outlet point',
      'Only at the distribution board',
      'At both the control unit and outlet',
    ],
    correctAnswer: 3,
    explanation:
      'Both the cooker control unit and the outlet point should be tested to ensure adequate protection at all connection points.',
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
      'Significant variations in Zs readings indicate potential problems such as poor connections, damaged cables, or incorrect wiring that require investigation.',
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
      'In a radial circuit, Zs increases towards the end due to the additional resistance of the cable length between test points.',
  },
  {
    id: 10,
    question: 'When is it acceptable to use calculated Zs values instead of measured values?',
    options: [
      'Catch a falling worker and reduce the impact of the fall',
      'A low, consistent resistance (typically below 1 ohm)',
      'For inaccessible points where measurement is impractical',
      'Translating between different communication protocols',
    ],
    correctAnswer: 2,
    explanation:
      'Calculated Zs values may be used for inaccessible points, but measured values are preferred. When calculating, use worst-case assumptions and apply appropriate safety factors.',
  },
];
