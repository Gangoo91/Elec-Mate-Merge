import { QuizQuestion } from '@/types/quiz';

export const polarityPurposeQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why is polarity testing essential before energising a circuit?',
    options: [
      'To confirm the measured earth fault loop impedance is within limits',
      'To ensure switches and protective devices operate on the line conductor',
      'To verify the insulation resistance exceeds the minimum value',
      'To prove continuity of the circuit protective conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity testing ensures switches and protective devices are correctly connected to the line conductor, preventing dangerous situations where circuits remain live when switched off.',
  },
  {
    id: 2,
    question: 'What happens if a switch is incorrectly wired to the neutral conductor?',
    options: [
      'The circuit will not energise at all',
      'The protective device will nuisance trip',
      'The circuit remains live when switched off',
      'The line conductor becomes safely isolated',
    ],
    correctAnswer: 2,
    explanation:
      "If a switch breaks the neutral instead of the line, the circuit remains live at full voltage even when the switch is in the 'off' position, creating a serious shock hazard.",
  },
  {
    id: 3,
    question: 'Which part of an Edison screw lampholder should be connected to the line conductor?',
    options: [
      'The screw thread',
      'The outer metal shell',
      'Either part is acceptable',
      'The centre contact',
    ],
    correctAnswer: 3,
    explanation:
      'The centre contact must be connected to the line conductor. If the screw thread is live, users risk electric shock when changing bulbs.',
  },
  {
    id: 4,
    question: 'When must polarity testing be carried out?',
    options: [
      'Before energising any new installation or circuit',
      'After the installation has been in use for a month',
      'Only if there are problems with the installation',
      'Only on commercial installations',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 requires polarity testing before initial energisation of any new installation or circuit to ensure safety and compliance.',
  },
  {
    id: 5,
    question: 'What is the main safety risk of incorrect polarity?',
    options: [
      'Higher electricity bills',
      'Shock hazards from normally safe parts',
      'Equipment running inefficiently',
      'Lights being dimmer than expected',
    ],
    correctAnswer: 1,
    explanation:
      "Incorrect polarity can make normally safe parts become live, creating serious shock hazards even when switches appear to be in the 'off' position.",
  },
  {
    id: 6,
    question: 'According to BS 7671, which conductors must polarity testing verify?',
    options: [
      'All conductors including earth',
      'Only protective conductors',
      'Line and neutral conductors',
      'Only the line conductor',
    ],
    correctAnswer: 2,
    explanation:
      'Polarity testing must verify that both line and neutral conductors are correctly connected to their designated terminals throughout the installation.',
  },
  {
    id: 7,
    question: 'What type of current is used for polarity testing?',
    options: [
      'Alternating current at mains frequency',
      'High current to simulate normal operation',
      'No current - visual inspection only',
      'Low test current from a continuity tester',
    ],
    correctAnswer: 3,
    explanation:
      'Polarity is verified on a dead, isolated circuit using the low-resistance continuity range of a multifunction or insulation/continuity tester before energisation.',
  },
  {
    id: 8,
    question: 'Why is polarity particularly critical for protective devices?',
    options: [
      'They must operate on the line conductor to provide proper protection',
      'They are rated only for connection to the neutral conductor',
      'They depend on correct polarity to measure earth fault loop impedance',
      'They will not reset unless wired to the protective conductor',
    ],
    correctAnswer: 0,
    explanation:
      "Protective devices must operate on the line conductor to properly disconnect the supply. If connected to neutral, they won't provide adequate protection.",
  },
  {
    id: 9,
    question:
      'In a domestic installation, what is the most common consequence of reversed polarity at a socket outlet?',
    options: [
      'The socket outlet will refuse to accept a plug',
      'Electrical equipment may have live cases when switched off',
      'The ring final circuit continuity reading will be too high',
      'The RCD protecting the circuit will fail to trip on a fault',
    ],
    correctAnswer: 1,
    explanation:
      'Reversed polarity can cause equipment cases to become live even when switched off, as internal switches may be controlling the neutral instead of the line.',
  },
  {
    id: 10,
    question: 'Which regulation in BS 7671 specifically requires polarity testing?',
    options: [
      'Regulation 643.3 - Insulation resistance',
      'Regulation 643.2 - Continuity of conductors',
      'Regulation 643.6 - Polarity',
      'Regulation 643.7 - Earth fault loop impedance',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 643.6 of BS 7671 requires polarity to be verified before energisation, confirming single-pole devices are in the line conductor and that line, neutral and earth are correctly connected.',
  },
];
