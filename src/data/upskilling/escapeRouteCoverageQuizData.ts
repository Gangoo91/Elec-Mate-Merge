import { QuizQuestion } from '@/types/quiz';

export const escapeRouteCoverageQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the minimum lux requirement for escape routes?',
    options: [
      '5 lux along the centre line',
      '1 lux along the centre line',
      '0.5 lux along the centre line',
      '2 lux along the centre line',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266 requires a minimum of 1 lux along the centre line of escape routes to ensure adequate visibility for safe navigation during evacuation.',
  },
  {
    id: 2,
    question: 'Name two specific points where luminaires must be installed along escape routes.',
    options: [
      'Storage areas and plant rooms',
      'In lifts and service areas only',
      'Above exits and at changes of direction',
      'Near windows and external walls',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266 mandates luminaires above all exit doors and at every change of direction to ensure clear guidance along escape routes.',
  },
  {
    id: 3,
    question: 'Why must fire-fighting equipment be illuminated?',
    options: [
      'To prevent theft of equipment',
      'To meet insurance requirements',
      'To comply with building aesthetics',
      'To ensure quick location during emergencies',
    ],
    correctAnswer: 3,
    explanation:
      'Fire-fighting equipment must be illuminated to ensure it can be quickly located and accessed during emergencies when visibility may be compromised.',
  },
  {
    id: 4,
    question: 'Where should luminaires be positioned in stairways?',
    options: [
      'At each flight and landing',
      'Only at the bottom of each staircase',
      'Only at the top of each staircase',
      'Every third step only',
    ],
    correctAnswer: 0,
    explanation:
      'Every flight of stairs and landing must be illuminated as stairways are critical escape routes and present significant hazards during evacuation.',
  },
  {
    id: 5,
    question: 'At what route width must escape routes also be treated as open areas?',
    options: [
      '1 metre',
      '2 metres',
      '1.5 metres',
      '3 metres',
    ],
    correctAnswer: 1,
    explanation:
      'Routes wider than 2 metres must be treated as both escape routes and open areas, requiring additional anti-panic lighting beyond standard escape route lighting.',
  },
  {
    id: 6,
    question: 'Why is it important to light the area immediately outside a final exit?',
    options: [
      'To comply with external lighting regulations',
      'To meet planning permission requirements',
      'To ensure safe dispersal away from the building',
      'To help emergency services find the building',
    ],
    correctAnswer: 2,
    explanation:
      'The immediate area outside final exits must be lit to ensure safe dispersal away from the building and prevent congregation that could impede evacuation.',
  },
  {
    id: 7,
    question: 'What is a common installation fault with directional signage?',
    options: [
      "Above exits and at changes of direction",
      "They must be integrated to provide continuous guidance",
      "To ensure quick location during emergencies",
      "Arrows that don't match the actual escape route layout",
    ],
    correctAnswer: 3,
    explanation:
      "Directional arrows that don't match the actual escape route layout are a frequent inspection fault. Signs must accurately direct people along the illuminated path.",
  },
  {
    id: 8,
    question: 'How should luminaires and signage work together in design?',
    options: [
      'They must be integrated to provide continuous guidance',
      'Signs should replace the need for luminaires',
      'They should be completely separate systems',
      'Only one system is needed per building',
    ],
    correctAnswer: 0,
    explanation:
      'Lighting and signage must work together - signs provide direction while luminaires ensure visibility along the route, creating a complete guidance system.',
  },
  {
    id: 9,
    question: 'What is the purpose of walking the escape route during the design stage?',
    options: [
      'To automatically operate equipment based on predetermined schedules',
      'To identify points requiring extra luminaires and potential obstructions',
      'Sending commands to all devices on the bus simultaneously',
      'To prove that the holder has the required training and qualifications for their occupation',
    ],
    correctAnswer: 1,
    explanation:
      'Walking the route during design helps identify hazards, obstructions, and critical points that require additional luminaires beyond basic calculations.',
  },
  {
    id: 10,
    question: 'Why can wide corridors be a compliance risk if not correctly lit?',
    options: [
      'To ensure quick location during emergencies',
      'Above exits and at changes of direction',
      'They may need both escape route and anti-panic lighting',
      'Arrows that don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t match the actual escape route layout',
    ],
    correctAnswer: 2,
    explanation:
      'Wide corridors (over 2m) require both escape route lighting for guidance and anti-panic lighting for general illumination, making them more complex to design correctly.',
  },
];
