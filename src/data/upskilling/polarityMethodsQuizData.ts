import { QuizQuestion } from '@/types/quiz';

export const polarityMethodsQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What setting do you use to test polarity on a dead circuit?',
    options: [
      'Loop impedance',
      'Continuity',
      'Insulation resistance',
      'Voltage measurement',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity testing is performed on dead circuits using the continuity setting on your MFT or dedicated continuity tester.',
  },
  {
    id: 2,
    question: 'What risk is posed by a switch connected in the neutral conductor?',
    options: [
      'The protective device will nuisance trip on every operation',
      'The earth fault loop impedance will read artificially high',
      'The circuit remains live at the load even when switched off',
      'The line and neutral will appear reversed at the socket',
    ],
    correctAnswer: 2,
    explanation:
      "When a switch is connected to the neutral conductor, the circuit remains live at full voltage even when the switch is in the 'off' position, creating a serious shock hazard.",
  },
  {
    id: 3,
    question: 'Which part of a lampholder should be connected to the live conductor?',
    options: [
      'The screw thread',
      'The metal shell',
      'Both parts equally',
      'The centre contact',
    ],
    correctAnswer: 3,
    explanation:
      'The centre contact of an Edison screw lampholder must be connected to the line conductor. This ensures the more accessible screw thread is at neutral potential.',
  },
  {
    id: 4,
    question: 'What reference point is typically used for polarity testing?',
    options: [
      "The distribution board's outgoing line terminal",
      "The main earthing terminal at the intake",
      "The neutral bar in the consumer unit",
      "The earth electrode connection point",
    ],
    correctAnswer: 0,
    explanation:
      "The distribution board's outgoing line terminal is used as the reference point for polarity testing, allowing verification of correct connections throughout the circuit.",
  },
  {
    id: 5,
    question: 'When testing socket outlets for polarity, what should you verify?',
    options: [
      'Only that the socket works',
      'Line and neutral are not reversed',
      'The earth connection only',
      'The socket face plate is secure',
    ],
    correctAnswer: 1,
    explanation:
      'When testing socket outlets, you must verify that line and neutral conductors are connected to the correct terminals and not reversed.',
  },
  {
    id: 6,
    question: 'A low-reading ohmmeter used for polarity and continuity testing should deliver a short-circuit current of at least what value?',
    options: [
      '25 milliamps',
      '100 milliamps',
      '200 milliamps',
      '500 milliamps',
    ],
    correctAnswer: 2,
    explanation:
      'A continuity/polarity test instrument should be derived from a 4–24 V no-load source with a short-circuit current of not less than 200 mA, in line with BS EN 61557-4. This ensures reliable measurement of low resistances.',
  },
  {
    id: 7,
    question: 'How should you test polarity on a two-way switching circuit?',
    options: [
      'Test only with both switches in the up position',
      'Energise the circuit and use a voltage indicator at the load',
      'Disconnect the strappers and test each switch in isolation',
      'Test with switches in various positions to verify all paths',
    ],
    correctAnswer: 3,
    explanation:
      'Two-way switching requires testing with switches in various positions to ensure all switching combinations provide correct polarity paths to the load.',
  },
  {
    id: 8,
    question:
      'What reading indicates correct polarity between DB line terminal and socket line terminal?',
    options: [
      'Low resistance (typically <0.5Ω)',
      'Exactly 0 ohms',
      'Infinite resistance (open circuit)',
      'High resistance (>1000Ω)',
    ],
    correctAnswer: 0,
    explanation:
      'Correct polarity is indicated by a low resistance reading (typically less than 0.5Ω), confirming continuity through the correct conductor path.',
  },
  {
    id: 9,
    question: 'When would you get an unexpected continuity reading during polarity testing?',
    options: [
      'When the circuit breaker is on',
      'When line and neutral conductors are cross-connected',
      'When the test leads are working properly',
      'When the circuit is correctly wired',
    ],
    correctAnswer: 1,
    explanation:
      'Unexpected continuity readings typically indicate that line and neutral conductors have been cross-connected somewhere in the circuit.',
  },
  {
    id: 10,
    question: 'What should you do if polarity testing reveals incorrect connections?',
    options: [
      'Energise the circuit anyway as it will still work',
      'Make a note on the certificate but proceed',
      'Correct the wiring error and retest before energisation',
      'Only fix it if the client specifically requests it',
    ],
    correctAnswer: 2,
    explanation:
      'Any polarity errors must be corrected immediately, and the circuit must be retested to confirm correct polarity before energisation. This is a safety requirement, not optional.',
  },
];
