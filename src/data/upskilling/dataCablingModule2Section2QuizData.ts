import { QuizQuestion } from '@/types/quiz';

export const dataCablingModule2Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main difference between UTP and FTP cables?',
    options: [
      'FTP cables support higher frequencies',
      'FTP cables include an overall foil shield around all pairs',
      'FTP cables have more wire pairs than UTP',
      'FTP cables use different connector types',
    ],
    correctAnswer: 1,
    explanation:
      'FTP (Foiled Twisted Pair) cables include an overall foil shield around all four pairs, whilst UTP (Unshielded Twisted Pair) relies only on wire twisting for interference protection.',
  },
  {
    id: 2,
    question: 'Why is proper grounding critical for shielded cables?',
    options: [
      'Previous suicide attempts, mental health conditions, substance misuse, and social isolation',
      'The real power (kW) output to increase — the grid holds the frequency constant',
      'To prevent the shield from acting as an antenna and picking up more interference',
      'Underground and overhead services such as power lines and gas mains',
    ],
    correctAnswer: 2,
    explanation:
      'Improperly grounded shields can act as antennas, actually picking up more interference than they block. Proper grounding provides a path for interference to be safely dissipated.',
  },
  {
    id: 3,
    question: 'In which environment would STP cable be most appropriate?',
    options: [
      'How we unconsciously move from observing data to making assumptions and taking action',
      'True - digital copies are acceptable with proper security',
      'RCD protection with rated residual current not exceeding 30mA',
      'Industrial facility with welding equipment and variable frequency drives',
    ],
    correctAnswer: 3,
    explanation:
      'STP (Shielded Twisted Pair) provides maximum EMI protection and is most appropriate for high-interference industrial environments with heavy electrical equipment.',
  },
  {
    id: 4,
    question: 'What is the recommended grounding method for shielded cables?',
    options: [
      'Single-point grounding, typically at the patch panel end',
      'Ground at multiple points along the cable run',
      'Ground both ends of the shield',
      'No grounding is required for modern shielded cables',
    ],
    correctAnswer: 0,
    explanation:
      'Single-point grounding (typically at the patch panel end) prevents ground loops and circulating currents whilst providing an effective path for interference dissipation.',
  },
  {
    id: 5,
    question: 'What happens when you mix shielded and unshielded components in the same channel?',
    options: [
      'Performance improves due to partial shielding',
      'The shielding benefits are negated',
      'The system works normally with reduced EMI protection',
      'Only the transmission speed is affected',
    ],
    correctAnswer: 1,
    explanation:
      'Mixing shielded and unshielded components breaks the shield continuity, negating the EMI protection benefits. All components in a shielded channel must be shielded for proper performance.',
  },
];
