import { QuizQuestion } from '@/types/quiz';

export const escapeRouteCoverageQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the minimum lux requirement for escape routes?',
    options: [
      '5 lux across the full width',
      '1 lux across the full width',
      '0.5 lux across the full width',
      '2 lux across the full width',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 requires a minimum of 1 lux across the FULL WIDTH of an escape route. The 2013 edition required it only along the centre line; the 2024 revision extended it to the whole width, excluding borders (0.5 m each side above 2 m width, or a quarter of the width at 2 m or less).',
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
      'At the foot of each staircase',
      'At the head of each staircase',
      'On every third step',
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
      "Signs mounted slightly above standard eye-line height",
      "Signs viewed from a greater distance than recommended",
      "Internally illuminated signs used instead of externally lit ones",
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
      'To measure the exact lux level achieved at every floor point',
      'To identify points requiring extra luminaires and potential obstructions',
      'To confirm the rated duration of the emergency luminaire batteries',
      'To record the cable routes for the as-installed wiring diagram',
    ],
    correctAnswer: 1,
    explanation:
      'Walking the route during design helps identify hazards, obstructions, and critical points that require additional luminaires beyond basic calculations.',
  },
  {
    id: 10,
    question: 'Why can wide corridors be a compliance risk if not correctly lit?',
    options: [
      'They always require fire-rated cabling on every luminaire',
      'They must be fitted with maintained rather than non-maintained luminaires',
      'They may need both escape route and anti-panic lighting',
      'They demand a longer minimum battery duration than standard routes',
    ],
    correctAnswer: 2,
    explanation:
      'Wide corridors (over 2m) require both escape route lighting for guidance and anti-panic lighting for general illumination, making them more complex to design correctly.',
  },
];
