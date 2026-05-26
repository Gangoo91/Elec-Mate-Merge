import { QuizQuestion } from '@/types/quiz';

export const protectiveConductorQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does CPC continuity testing prove?',
    options: [
      'That the voltage drop is within limits',
      'That the earth conductor is complete from origin to final point',
      'That the insulation resistance is adequate',
      'That the circuit breaker will operate correctly',
    ],
    correctAnswer: 1,
    explanation:
      'CPC continuity testing proves that the earth conductor is complete from origin to final point, ensuring fault current has a complete return path.',
  },
  {
    id: 2,
    question: 'Which reading indicates a healthy CPC?',
    options: [
      'To verify end-to-end continuity of line and CPC conductors',
      'That the earth conductor is complete from origin to final point',
      'A low, consistent resistance (typically below 1 ohm)',
      'False - CPC continuity must always be tested separately',
    ],
    correctAnswer: 2,
    explanation:
      'A healthy CPC should show low, consistent resistance typically below 1 ohm, indicating a good continuous path.',
  },
  {
    id: 3,
    question:
      'True or False: You can skip CPC continuity testing if the insulation resistance passes.',
    options: [
      'True - insulation resistance testing covers everything',
      'False - but only for new installations',
      'True - only if the installation is less than 5 years old',
      'False - CPC continuity must always be tested separately',
    ],
    correctAnswer: 3,
    explanation:
      'False. CPC continuity testing is mandatory and separate from insulation resistance testing. Each test serves a different safety purpose.',
  },
  {
    id: 4,
    question: "What's the risk of not testing the bonding conductor to a gas pipe?",
    options: [
      'Loss of earth potential equalisation, increasing shock risk',
      'That the earth conductor is complete from origin to final point',
      'Investigate the connection and clean/retighten as necessary',
      'To verify end-to-end continuity of line and CPC conductors',
    ],
    correctAnswer: 0,
    explanation:
      "Without proper bonding conductor continuity, there's loss of earth potential equalisation, which significantly increases the risk of electric shock.",
  },
  {
    id: 5,
    question: 'Why must you zero your tester leads before taking readings?',
    options: [
      'Testing with the circuit isolated and loads disconnected',
      'To avoid false high readings caused by lead resistance',
      'Investigate the connection and clean/retighten as necessary',
      'That the earth conductor is complete from origin to final point',
    ],
    correctAnswer: 1,
    explanation:
      'Zeroing the leads removes the resistance of the test leads themselves from the measurement, preventing false high readings that could mask real problems.',
  },
  {
    id: 6,
    question: 'What is the maximum acceptable resistance for main bonding conductors?',
    options: [
      '2.0 ohms',
      '0.5 ohms',
      '0.05 ohms',
      '1.0 ohm',
    ],
    correctAnswer: 2,
    explanation:
      'Main bonding conductors should have resistance not exceeding 0.05 ohms to ensure effective equipotential bonding and rapid fault clearance.',
  },
  {
    id: 7,
    question: 'When testing CPC continuity, which method gives the most accurate results?',
    options: [
      'Testing with the circuit energised',
      'Using the highest test current available',
      'Testing only at the distribution board',
      'Testing with the circuit isolated and loads disconnected',
    ],
    correctAnswer: 3,
    explanation:
      'Testing with the circuit isolated and loads disconnected ensures accurate readings without interference from parallel paths or electronic equipment.',
  },
  {
    id: 8,
    question: 'What should you do if a supplementary bonding conductor shows high resistance?',
    options: [
      'Investigate the connection and clean/retighten as necessary',
      'To avoid false high readings caused by lead resistance',
      'A low, consistent resistance (typically below 1 ohm)',
      'Testing with the circuit isolated and loads disconnected',
    ],
    correctAnswer: 0,
    explanation:
      'High resistance in bonding conductors usually indicates poor connections. Investigation, cleaning, and retightening of connections is necessary.',
  },
  {
    id: 9,
    question: 'Why is the R1+R2 test important for radial circuits?',
    options: [
      'That the earth conductor is complete from origin to final point',
      'To verify end-to-end continuity of line and CPC conductors',
      'Testing with the circuit isolated and loads disconnected',
      'Stop testing and rectify the fault before proceeding',
    ],
    correctAnswer: 1,
    explanation:
      'The R1+R2 test verifies end-to-end continuity of both line and CPC conductors, ensuring a complete fault current path exists.',
  },
  {
    id: 10,
    question: 'What action is required if CPC continuity testing reveals an open circuit?',
    options: [
      'Continue with testing and note as limitation',
      'Reduce test current and retry',
      'Stop testing and rectify the fault before proceeding',
      'Use the neutral conductor as backup earth',
    ],
    correctAnswer: 2,
    explanation:
      'An open circuit CPC is extremely dangerous and must be rectified immediately before any further testing or energisation of the circuit.',
  },
];
