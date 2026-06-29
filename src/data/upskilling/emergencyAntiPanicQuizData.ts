import { QuizQuestion } from '@/types/quiz';

export const emergencyAntiPanicQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main function of anti-panic lighting?',
    options: [
      'To clearly mark the position of fire exit doors and final exits',
      'To reduce confusion and allow safe movement towards escape routes when mains lighting fails',
      'To illuminate fire-fighting equipment and call points along escape routes',
      'To maintain normal task lighting levels until the mains supply is restored',
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
      'To reduce the total number of luminaires needed to cover the area',
      'To prevent large dark patches that could cause trips, falls, or disorientation',
      'To keep the battery drain identical across every luminaire in the circuit',
      'To allow the use of lower-output fittings throughout the space',
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
      '10 minutes minimum, 30 minutes typical',
      '30 minutes minimum, 1 hour typical',
      '2 hours minimum, 4 hours typical',
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
      'The perimeter fittings will overheat and drain their batteries too quickly',
      'The escape route signs become over-illuminated and cause glare',
      'The walls reflect too much light, raising the central illuminance above limits',
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
      'To guarantee the lowest possible installation cost for the client',
      'To make sure every luminaire draws an equal current from the battery',
      'To ensure accurate placement and avoid unsafe shadows or uneven coverage',
      'To comply with the maximum cable length permitted for the circuit',
    ],
    correctAnswer: 2,
    explanation:
      "Manufacturer's spacing tables are based on photometric testing and ensure accurate luminaire placement to achieve the required illuminance levels and uniformity, preventing unsafe shadows or uneven coverage that could compromise safety.",
  },
];
