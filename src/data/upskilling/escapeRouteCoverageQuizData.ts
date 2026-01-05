import { QuizQuestion } from '@/types/quiz';

export const escapeRouteCoverageQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the minimum lux requirement for escape routes?",
    options: [
      "0.5 lux along the centre line",
      "1 lux along the centre line",
      "2 lux along the centre line",
      "5 lux along the centre line"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 requires a minimum of 1 lux along the centre line of escape routes to ensure adequate visibility for safe navigation during evacuation."
  },
  {
    id: 2,
    question: "Name two specific points where luminaires must be installed along escape routes.",
    options: [
      "Storage areas and plant rooms",
      "Above exits and at changes of direction",
      "In lifts and service areas only",
      "Near windows and external walls"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 mandates luminaires above all exit doors and at every change of direction to ensure clear guidance along escape routes."
  },
  {
    id: 3,
    question: "Why must fire-fighting equipment be illuminated?",
    options: [
      "To prevent theft of equipment",
      "To meet insurance requirements",
      "To ensure quick location during emergencies",
      "To comply with building aesthetics"
    ],
    correctAnswer: 2,
    explanation: "Fire-fighting equipment must be illuminated to ensure it can be quickly located and accessed during emergencies when visibility may be compromised."
  },
  {
    id: 4,
    question: "Where should luminaires be positioned in stairways?",
    options: [
      "Only at the top of each staircase",
      "Only at the bottom of each staircase",
      "At each flight and landing",
      "Every third step only"
    ],
    correctAnswer: 2,
    explanation: "Every flight of stairs and landing must be illuminated as stairways are critical escape routes and present significant hazards during evacuation."
  },
  {
    id: 5,
    question: "At what route width must escape routes also be treated as open areas?",
    options: [
      "1 metre",
      "1.5 metres",
      "2 metres",
      "3 metres"
    ],
    correctAnswer: 2,
    explanation: "Routes wider than 2 metres must be treated as both escape routes and open areas, requiring additional anti-panic lighting beyond standard escape route lighting."
  },
  {
    id: 6,
    question: "Why is it important to light the area immediately outside a final exit?",
    options: [
      "To meet planning permission requirements",
      "To ensure safe dispersal away from the building",
      "To help emergency services find the building",
      "To comply with external lighting regulations"
    ],
    correctAnswer: 1,
    explanation: "The immediate area outside final exits must be lit to ensure safe dispersal away from the building and prevent congregation that could impede evacuation."
  },
  {
    id: 7,
    question: "What is a common installation fault with directional signage?",
    options: [
      "Signs that are too bright",
      "Signs that are too small",
      "Arrows that don't match the actual escape route layout",
      "Signs that are too high up"
    ],
    correctAnswer: 2,
    explanation: "Directional arrows that don't match the actual escape route layout are a frequent inspection fault. Signs must accurately direct people along the illuminated path."
  },
  {
    id: 8,
    question: "How should luminaires and signage work together in design?",
    options: [
      "They should be completely separate systems",
      "Signs should replace the need for luminaires",
      "They must be integrated to provide continuous guidance",
      "Only one system is needed per building"
    ],
    correctAnswer: 2,
    explanation: "Lighting and signage must work together - signs provide direction while luminaires ensure visibility along the route, creating a complete guidance system."
  },
  {
    id: 9,
    question: "What is the purpose of walking the escape route during the design stage?",
    options: [
      "To meet health and safety requirements",
      "To identify points requiring extra luminaires and potential obstructions",
      "To measure the exact route distance",
      "To test the building's fire alarm system"
    ],
    correctAnswer: 1,
    explanation: "Walking the route during design helps identify hazards, obstructions, and critical points that require additional luminaires beyond basic calculations."
  },
  {
    id: 10,
    question: "Why can wide corridors be a compliance risk if not correctly lit?",
    options: [
      "They use more electricity",
      "They may need both escape route and anti-panic lighting",
      "They are harder to clean and maintain",
      "They require special fire doors"
    ],
    correctAnswer: 1,
    explanation: "Wide corridors (over 2m) require both escape route lighting for guidance and anti-panic lighting for general illumination, making them more complex to design correctly."
  }
];