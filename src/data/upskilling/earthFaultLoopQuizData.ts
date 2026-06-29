import { QuizQuestion } from '@/components/quiz/types';

export const earthFaultLoopQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does Zs represent in electrical testing?',
    options: [
      'Circuit resistance',
      'Earth fault loop impedance',
      'Earth electrode resistance',
      'Source impedance',
    ],
    correctAnswer: 1,
    explanation:
      'Zs represents the earth fault loop impedance - the total impedance of the earth fault current path from the point of fault back to the source.',
  },
  {
    id: 2,
    question: 'What does Ze represent in electrical testing?',
    options: [
      'Earth fault loop impedance',
      'Earth electrode resistance',
      'External earth fault loop impedance',
      'Equipment earth resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Ze represents the external earth fault loop impedance - the impedance of the earth fault current path external to the installation.',
  },
  {
    id: 3,
    question: 'According to BS 7671, what is the typical maximum Zs value for a 32A Type B MCB?',
    options: [
      '2.30Ω',
      '0.87Ω',
      '1.37Ω',
      '1.44Ω',
    ],
    correctAnswer: 2,
    explanation:
      'For a 32A Type B MCB, the maximum Zs is 1.37Ω per Table 41.3 (includes the Cmin factor of 0.95). 1.44Ω is the old pre-Cmin figure.',
  },
  {
    id: 4,
    question: 'What is the relationship between Zs and Ze?',
    options: [
      'Zs = Ze + R1 + R2',
      'Zs = Ze × R1 × R2',
      'Zs = Ze - R1 - R2',
      'Zs = Ze ÷ (R1 + R2)',
    ],
    correctAnswer: 0,
    explanation:
      'Zs equals Ze plus R1 plus R2, where R1 is the line conductor resistance and R2 is the protective conductor resistance.',
  },
  {
    id: 5,
    question: 'Why is earth fault loop impedance testing critical for safety?',
    options: [
      'It confirms the correct cable cross-sectional area has been installed',
      'To ensure adequate fault current for protective device operation',
      'It verifies the insulation resistance between live conductors',
      'It measures the voltage drop along the final circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Earth fault loop impedance testing ensures that sufficient fault current will flow to operate the protective device within the required disconnection time.',
  },
  {
    id: 6,
    question: 'When should Ze be measured in an installation?',
    options: [
      'After energising all final circuits at the consumer unit',
      'Only once the installation is fully loaded',
      'Before connecting the main earthing conductor',
      'Immediately after the insulation resistance test',
    ],
    correctAnswer: 2,
    explanation:
      'Ze should be measured with the main earthing conductor disconnected so the reading reflects only the impedance external to the installation.',
  },
  {
    id: 7,
    question: 'What instrument correction should be applied to Zs readings?',
    options: [
      'Add the resistance of the test leads to every reading',
      'Subtract the prospective fault current from the measured value',
      'Multiply the reading by the supply diversity factor',
      'Apply a temperature correction factor',
    ],
    correctAnswer: 3,
    explanation:
      'A temperature correction factor is applied because conductor resistance rises at the maximum operating temperature, giving a higher Zs than the cold measured value.',
  },
  {
    id: 8,
    question: 'In a TN-S system, what does the earth fault current path include?',
    options: [
      'The line conductor and a separate metallic protective conductor (PE)',
      'The line and neutral conductors combined as a single PEN conductor',
      'The line conductor returning through an earth electrode to the mass of earth',
      'The neutral conductor and an installation earth electrode in parallel',
    ],
    correctAnswer: 0,
    explanation:
      'In a TN-S system the earth fault current returns via the line conductor and a separate protective conductor (the metallic cable sheath/PE) back to the source star point.',
  },
  {
    id: 9,
    question: 'What happens if Zs is too high?',
    options: [
      'Touch voltages fall below the safe limit during a fault',
      'Protective devices may not operate within the required disconnection time',
      'The prospective fault current rises above the device breaking capacity',
      'The circuit suffers excessive voltage drop under normal load',
    ],
    correctAnswer: 1,
    explanation:
      'If Zs is too high, insufficient fault current flows, so the protective device may fail to disconnect within the required time, leaving dangerous touch voltages present.',
  },
  {
    id: 10,
    question: 'Which regulation in BS 7671 sets the maximum earth fault loop impedance (Zs) values for ADS?',
    options: [
      'Regulation 411.4.5',
      'Regulation 411.3.2',
      'Regulation 411.4.9',
      'Regulation 543.1.1',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 411.4.5 sets out the maximum earth fault loop impedance (Zs) values needed to ensure protective devices operate within the required disconnection times for TN systems.',
  },
];
