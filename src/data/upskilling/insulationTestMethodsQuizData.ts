import { QuizQuestion } from '@/types/quiz';

export const insulationTestMethodsQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which test combinations are standard for IR testing?',
    options: [
      'L–N and N–E only',
      'L–N, L–E, and N–E',
      'Only L–N and L–E',
      'Only L+N to E',
    ],
    correctAnswer: 1,
    explanation:
      'Standard practice requires testing L–N, L–E, and N–E separately to get complete information about insulation condition.',
  },
  {
    id: 2,
    question: "What's the standard test voltage for IR on 230V circuits?",
    options: [
      '250 V DC',
      '230 V AC',
      '500 V DC',
      '1000 V DC',
    ],
    correctAnswer: 2,
    explanation:
      '500 V DC is the standard test voltage for circuits up to 500V, including 230V domestic circuits.',
  },
  {
    id: 3,
    question: 'Why must probes stay in contact during testing?',
    options: [
      'To keep the test voltage below the safe touch limit',
      'To prevent the tester battery from discharging too quickly',
      'To avoid tripping any upstream protective devices',
      'To allow the reading to stabilise and detect leakage over time',
    ],
    correctAnswer: 3,
    explanation:
      'Probe contact must be maintained to allow capacitive effects to settle and obtain a stable, accurate reading of true insulation resistance.',
  },
  {
    id: 4,
    question: 'What should you do if IR reading is below 1 MΩ?',
    options: [
      'Investigate the cause and do not proceed until resolved',
      'Record the value and energise the circuit anyway',
      'Repeat the test at a reduced voltage to pass it',
      'Average it with the other circuits to obtain a pass',
    ],
    correctAnswer: 0,
    explanation:
      'Any reading below 1 MΩ indicates a fault that must be investigated and corrected before proceeding with further testing or energising the circuit.',
  },
  {
    id: 5,
    question: "True or False: It's acceptable to test L+N to E if loads can't be disconnected.",
    options: [
      'False - must always test separately',
      'True (but must be recorded as a limitation)',
      'True - and no special recording is needed',
      'False - loads must always be disconnected',
    ],
    correctAnswer: 1,
    explanation:
      'True, but this variation must be documented as a limitation in your test results and the reason explained in your report.',
  },
  {
    id: 6,
    question: 'When testing a three-phase installation, how many IR tests are typically required?',
    options: [
      '1 test (all phases together to earth)',
      '6 tests (all phase combinations)',
      '9 tests (all conductor combinations)',
      '3 tests (each phase to earth)',
    ],
    correctAnswer: 2,
    explanation:
      'For three-phase installations, test all combinations: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E (9 tests total for comprehensive checking).',
  },
  {
    id: 7,
    question: 'What is the correct procedure for testing circuits with electronic ballasts?',
    options: [
      'Use reduced test voltage with ballasts connected',
      'Test with ballasts connected',
      "Test ballasts separately with manufacturer's procedure",
      'Disconnect ballasts and test circuit wiring only',
    ],
    correctAnswer: 3,
    explanation:
      "Electronic ballasts must be disconnected and the circuit wiring tested separately. Ballasts should be tested according to manufacturer's specific procedures if required.",
  },
  {
    id: 8,
    question: 'How should surge protective devices (SPDs) be handled during IR testing?',
    options: [
      'Disconnect or isolate SPDs before testing',
      "Leave connected - they won't affect results",
      'Test with SPDs but use lower voltage',
      "SPDs don't need special consideration",
    ],
    correctAnswer: 0,
    explanation:
      'SPDs must be disconnected or isolated before IR testing as they can provide alternative current paths and give false low readings.',
  },
  {
    id: 9,
    question: 'If different test methods give different results, which should be recorded?',
    options: [
      'The lowest reading obtained',
      'All results with explanation of methods used',
      'The average of all readings',
      'The highest reading obtained',
    ],
    correctAnswer: 1,
    explanation:
      'All results should be recorded along with detailed explanations of the different test methods used and why variations occurred.',
  },
  {
    id: 10,
    question: 'What is the main advantage of testing conductors individually rather than L+N to E?',
    options: [
      'It completes the testing in a single combined measurement',
      'It allows a lower test voltage to be used safely',
      'It identifies which specific conductor has insulation problems',
      'It avoids the need to disconnect any connected equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Testing conductors individually (L-N, L-E, N-E) allows precise identification of which conductor has insulation problems, enabling targeted fault finding and repair.',
  },
];
