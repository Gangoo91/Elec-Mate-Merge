import { QuizQuestion } from '@/types/quiz';

export const insulationResistanceQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does insulation resistance testing check for?',
    options: [
      'Isolate, lock off, test dead, and disconnect sensitive equipment',
      'That there is no breakdown between conductors or to earth',
      'False - IR testing is required regardless of installation age',
      'High voltage can damage sensitive equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance testing checks that there is no breakdown between conductors or to earth, ensuring the insulation is intact and safe.',
  },
  {
    id: 2,
    question: 'Which fault is insulation testing most likely to detect?',
    options: [
      'Open circuit in a ring final',
      'Incorrect polarity connections',
      'Damaged or degraded insulation',
      'High earth fault loop impedance',
    ],
    correctAnswer: 2,
    explanation:
      'Insulation resistance testing is specifically designed to detect damaged or degraded insulation that could cause leakage currents or breakdown.',
  },
  {
    id: 3,
    question: 'What is the minimum acceptable insulation resistance for a 230V circuit?',
    options: [
      '0.5 MΩ',
      '5 MΩ',
      '2 MΩ',
      '1 MΩ',
    ],
    correctAnswer: 3,
    explanation:
      'For circuits ≤500V (including 230V), the minimum acceptable insulation resistance is 1 MΩ according to BS7671.',
  },
  {
    id: 4,
    question: 'Why is it important to disconnect electronic devices before IR testing?',
    options: [
      'High voltage can damage sensitive equipment',
      "It's not necessary to disconnect them",
      'To get more accurate readings',
      'To prevent false readings from device leakage',
    ],
    correctAnswer: 0,
    explanation:
      'Electronic devices must be disconnected because the high test voltage (500V DC) can damage sensitive electronic components.',
  },
  {
    id: 5,
    question: 'What test voltage should be used for SELV circuits (≤50V)?',
    options: [
      '50V DC',
      '250V DC',
      '500V DC',
      '1000V DC',
    ],
    correctAnswer: 1,
    explanation:
      'For SELV circuits (≤50V), the test voltage should be 250V DC to avoid damaging low-voltage equipment while providing adequate test sensitivity.',
  },
  {
    id: 6,
    question: 'How long should the test voltage be maintained during IR testing?',
    options: [
      '5 minutes minimum',
      '30 seconds minimum',
      '1 minute minimum',
      '5 seconds minimum',
    ],
    correctAnswer: 2,
    explanation:
      'The test voltage should be maintained for a minimum of 1 minute to allow for stabilisation and accurate measurement of true insulation resistance.',
  },
  {
    id: 7,
    question: 'What environmental factor most significantly affects IR test results?',
    options: [
      'Electromagnetic interference',
      'Air pressure',
      'Altitude',
      'Humidity and moisture',
    ],
    correctAnswer: 3,
    explanation:
      'Humidity and moisture significantly reduce insulation resistance readings by providing conductive paths across insulator surfaces.',
  },
  {
    id: 8,
    question: 'True or False: You can skip IR testing if the installation is brand new.',
    options: [
      'False - IR testing is required regardless of installation age',
      "True - new installations don't need IR testing",
      'True - but only for domestic installations',
      'False - but only if the installation looks damaged',
    ],
    correctAnswer: 0,
    explanation:
      'False. IR testing is required regardless of installation age. Even new installations can have manufacturing defects or installation damage.',
  },
  {
    id: 9,
    question: 'What should you do before conducting IR tests on a circuit?',
    options: [
      'False - IR testing is required regardless of installation age',
      'Isolate, lock off, test dead, and disconnect sensitive equipment',
      'Investigate the cause as it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s below the minimum requirement',
      'That there is no breakdown between conductors or to earth',
    ],
    correctAnswer: 1,
    explanation:
      "Before IR testing, you must isolate the circuit, lock off the supply, test to confirm it's dead, and disconnect all sensitive electronic equipment that could be damaged.",
  },
  {
    id: 10,
    question: 'If an IR reading is 0.8 MΩ on a 230V circuit, what action should be taken?',
    options: [
      "Accept it as satisfactory since it's close to 1 MΩ",
      'Increase the test voltage to 1000V',
      "Investigate the cause as it's below the minimum requirement",
      'Record it and energise the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Any reading below 1 MΩ on a 230V circuit is unsatisfactory and indicates a fault that must be investigated and corrected before the circuit can be energised.',
  },
];
