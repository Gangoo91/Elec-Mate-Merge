import { QuizQuestion } from '@/components/quiz/types';

export const eicrQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      'What is the typical maximum recommended interval between EICRs for a domestic installation?',
    options: [
      '10 years',
      '5 years',
      '2 years',
      '1 year',
    ],
    correctAnswer: 1,
    explanation:
      'For most domestic installations the recommended maximum interval is 5 years (or change of occupancy); higher-risk premises such as swimming pools, caravan parks and commercial properties require more frequent inspection.',
  },
  {
    id: 2,
    question: "Which observation code indicates 'Danger present - immediate action required'?",
    options: [
      'C3',
      'C2',
      'C1',
      'FI',
    ],
    correctAnswer: 2,
    explanation:
      'C1 code indicates danger is present and immediate action is required to make the installation or part safe immediately.',
  },
  {
    id: 3,
    question:
      'What is the minimum insulation resistance value for a circuit rated up to 500V (tested at 500V DC)?',
    options: [
      '0.25MΩ',
      '0.5MΩ',
      '1.0MΩ',
      '2.0MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Table 61 requires a minimum insulation resistance of 1.0MΩ for circuits up to 500V, tested at 500V DC (SELV/PELV at 250V DC require 0.5MΩ).',
  },
  {
    id: 4,
    question: 'How frequently must EICRs be conducted in private rental properties in England?',
    options: [
      'At least every 5 years, or sooner if specified on the report',
      'Only once at the start of the very first tenancy',
      'Every 12 months without exception',
      'Only when a tenant reports an electrical fault',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must have the installation inspected and tested at least every 5 years (or sooner if the report specifies) by a qualified person.',
  },
  {
    id: 5,
    question:
      'Which test is normally performed FIRST in the sequence of dead tests during an EICR?',
    options: [
      'Earth fault loop impedance (Zs)',
      'Continuity of protective conductors',
      'RCD operation at 5×IΔn',
      'Polarity at the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity of protective conductors is the first dead test, confirming the earthing and bonding are sound before insulation resistance, polarity and the subsequent live tests are carried out.',
  },
  {
    id: 6,
    question: "What does observation code 'FI' indicate on an EICR?",
    options: [
      'Final inspection complete',
      'Fire risk identified',
      'Further investigation required',
      'Functional improvement needed',
    ],
    correctAnswer: 2,
    explanation:
      'FI code indicates that further investigation is required to determine the safety of the installation or specific part that could not be fully assessed during the inspection.',
  },
  {
    id: 7,
    question: 'What is the maximum RCD operating time at 1×IΔn for socket outlet circuits?',
    options: [
      '40ms',
      '200ms',
      '500ms',
      '300ms',
    ],
    correctAnswer: 3,
    explanation:
      'RCD operating time at 1×IΔn must be ≤300ms. At 5×IΔn for socket circuits, the maximum is 40ms.',
  },
  {
    id: 8,
    question:
      'Which of these premises typically requires a more frequent (e.g. annual) periodic inspection interval?',
    options: [
      'Caravan parks and swimming pool installations',
      'An owner-occupied detached house',
      'A general office let on a 5-year lease',
      'A domestic garage with a single circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Higher-risk locations such as caravan parks (1 year) and swimming pools (1 year) are given shorter recommended intervals in BS 7671 Table 3.2 of the IET guidance than ordinary domestic premises.',
  },
  {
    id: 9,
    question: 'What must be clearly documented if parts of an installation cannot be inspected?',
    options: [
      'Estimated condition of uninspected areas',
      'Limitations and extent of inspection performed',
      'A disclaimer releasing liability',
      'Nothing - just complete what can be inspected',
    ],
    correctAnswer: 1,
    explanation:
      'All EICR limitations must be clearly documented, including areas not inspected and the extent of inspection performed, to ensure report users understand the scope.',
  },
  {
    id: 10,
    question: "Which observation code is used for 'Improvement recommended' findings?",
    options: [
      'C1',
      'C2',
      'C3',
      'FI',
    ],
    correctAnswer: 2,
    explanation:
      "C3 code is used for 'Improvement recommended' - items that would improve safety but are not immediately dangerous or urgently requiring action.",
  },
];
