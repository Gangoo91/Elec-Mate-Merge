import { QuizQuestion } from '@/types/quiz';

export const emergencyAntiPanicQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main function of anti-panic lighting?',
    options: [
      'To ensure accurate placement and avoid unsafe shadows or uneven coverage',
      'To reduce confusion and allow safe movement towards escape routes when mains lighting fails',
      'To prevent large dark patches that could cause trips, falls, or disorientation',
      'The centre of the space is left in darkness, creating trip hazards and panic',
    ],
    correctAnswer: 1,
    explanation:
      'Anti-panic lighting is specifically designed to reduce confusion and panic in open areas, providing sufficient illumination for safe movement towards designated escape routes when the mains lighting fails.',
  },
  {
    id: 2,
    question: 'What standard governs emergency lighting installations in the UK?',
    options: [
      'BS 7671',
      'BS 5839',
      'BS 5266',
      'BS 6080',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1 is the British Standard that specifies the requirements for emergency lighting installations in the UK, including anti-panic lighting systems.',
  },
  {
    id: 3,
    question: 'State the minimum lux level required in anti-panic areas.',
    options: [
      '0.2 lux',
      '2.0 lux',
      '1.0 lux',
      '0.5 lux',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266 specifies a minimum illuminance of 0.5 lux in the central core of open areas for anti-panic lighting systems.',
  },
  {
    id: 4,
    question: 'List two types of spaces where anti-panic lighting is mandatory.',
    options: [
      'Open plan offices over 60m² and sports halls',
      'Toilets and plant rooms',
      'Small offices under 30m² and storage cupboards',
      'External car parks and gardens',
    ],
    correctAnswer: 0,
    explanation:
      'Anti-panic lighting is required in large open areas such as open plan offices over 60m², sports halls, foyers, lobbies, atriums, and large retail floors where people may congregate or travel through.',
  },
  {
    id: 5,
    question: 'Why is uniformity important in anti-panic lighting design?',
    options: [
      'To reduce confusion and allow safe movement towards escape routes when mains lighting fails',
      'To prevent large dark patches that could cause trips, falls, or disorientation',
      'To ensure accurate placement and avoid unsafe shadows or uneven coverage',
      'The centre of the space is left in darkness, creating trip hazards and panic',
    ],
    correctAnswer: 1,
    explanation:
      'Uniformity in anti-panic lighting is crucial to prevent large dark patches or shadows that could cause people to trip, fall, or become disoriented during an emergency evacuation.',
  },
  {
    id: 6,
    question: 'How often should functional emergency lighting tests be carried out?',
    options: [
      'Annually',
      'Weekly',
      'Monthly',
      'Quarterly',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266 requires monthly functional tests to ensure each luminaire operates correctly from its emergency supply. These tests should be brief to avoid unnecessary drain on the battery.',
  },
  {
    id: 7,
    question: 'How long must anti-panic lighting remain operational during a power failure?',
    options: [
      'Regulation 526.1 and 526.5',
      'Approximately half a million or more',
      'Brushes wear, sparking, RFI emission',
      '1 hour minimum, 3 hours typical',
    ],
    correctAnswer: 3,
    explanation:
      'Anti-panic lighting must operate for at least 1 hour during a power failure, though 3 hours is standard for most commercial buildings to ensure adequate safety margins.',
  },
  {
    id: 8,
    question: 'What is the risk of placing luminaires only around the perimeter of a space?',
    options: [
      'The centre of the space is left in darkness, creating trip hazards and panic',
      'To prevent large dark patches that could cause trips, falls, or disorientation',
      'To reduce confusion and allow safe movement towards escape routes when mains lighting fails',
      'To ensure accurate placement and avoid unsafe shadows or uneven coverage',
    ],
    correctAnswer: 0,
    explanation:
      'Placing luminaires only around the perimeter leaves the central area in darkness, creating dangerous conditions where people can trip over furniture or become disoriented, as demonstrated in the London call centre example.',
  },
  {
    id: 9,
    question: 'What must be kept on-site to record all emergency lighting tests?',
    options: [
      'Building plans',
      'Emergency lighting logbook',
      'Electrical test certificates only',
      'Installation certificates only',
    ],
    correctAnswer: 1,
    explanation:
      'An emergency lighting logbook must be kept on-site to record all test results, maintenance activities, and remedial actions. This is essential for compliance inspections and legal requirements.',
  },
  {
    id: 10,
    question:
      "Why should electricians use manufacturer's spacing tables when installing luminaires?",
    options: [
      'The centre of the space is left in darkness, creating trip hazards and panic',
      'To reduce confusion and allow safe movement towards escape routes when mains lighting fails',
      'To ensure accurate placement and avoid unsafe shadows or uneven coverage',
      'To prevent large dark patches that could cause trips, falls, or disorientation',
    ],
    correctAnswer: 2,
    explanation:
      "Manufacturer's spacing tables are based on photometric testing and ensure accurate luminaire placement to achieve the required illuminance levels and uniformity, preventing unsafe shadows or uneven coverage that could compromise safety.",
  },
];
