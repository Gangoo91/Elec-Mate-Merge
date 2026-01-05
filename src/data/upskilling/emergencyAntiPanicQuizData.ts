import { QuizQuestion } from '@/types/quiz';

export const emergencyAntiPanicQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main function of anti-panic lighting?",
    options: [
      "To provide decorative illumination during normal operation",
      "To reduce confusion and allow safe movement towards escape routes when mains lighting fails",
      "To illuminate exit signs only",
      "To provide backup power to the main lighting system"
    ],
    correctAnswer: 1,
    explanation: "Anti-panic lighting is specifically designed to reduce confusion and panic in open areas, providing sufficient illumination for safe movement towards designated escape routes when the mains lighting fails."
  },
  {
    id: 2,
    question: "What standard governs emergency lighting installations in the UK?",
    options: [
      "BS 7671",
      "BS 5839",
      "BS 5266",
      "BS 6080"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 is the British Standard that specifies the requirements for emergency lighting installations in the UK, including anti-panic lighting systems."
  },
  {
    id: 3,
    question: "State the minimum lux level required in anti-panic areas.",
    options: [
      "0.2 lux",
      "0.5 lux",
      "1.0 lux",
      "2.0 lux"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 specifies a minimum illuminance of 0.5 lux in the central core of open areas for anti-panic lighting systems."
  },
  {
    id: 4,
    question: "List two types of spaces where anti-panic lighting is mandatory.",
    options: [
      "Small offices under 30m² and storage cupboards",
      "Open plan offices over 60m² and sports halls",
      "Toilets and plant rooms",
      "External car parks and gardens"
    ],
    correctAnswer: 1,
    explanation: "Anti-panic lighting is required in large open areas such as open plan offices over 60m², sports halls, foyers, lobbies, atriums, and large retail floors where people may congregate or travel through."
  },
  {
    id: 5,
    question: "Why is uniformity important in anti-panic lighting design?",
    options: [
      "To reduce energy consumption",
      "To meet aesthetic requirements",
      "To prevent large dark patches that could cause trips, falls, or disorientation",
      "To reduce installation costs"
    ],
    correctAnswer: 2,
    explanation: "Uniformity in anti-panic lighting is crucial to prevent large dark patches or shadows that could cause people to trip, fall, or become disoriented during an emergency evacuation."
  },
  {
    id: 6,
    question: "How often should functional emergency lighting tests be carried out?",
    options: [
      "Weekly",
      "Monthly",
      "Quarterly",
      "Annually"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 requires monthly functional tests to ensure each luminaire operates correctly from its emergency supply. These tests should be brief to avoid unnecessary drain on the battery."
  },
  {
    id: 7,
    question: "How long must anti-panic lighting remain operational during a power failure?",
    options: [
      "30 minutes minimum",
      "1 hour minimum, 3 hours typical",
      "2 hours minimum",
      "6 hours minimum"
    ],
    correctAnswer: 1,
    explanation: "Anti-panic lighting must operate for at least 1 hour during a power failure, though 3 hours is standard for most commercial buildings to ensure adequate safety margins."
  },
  {
    id: 8,
    question: "What is the risk of placing luminaires only around the perimeter of a space?",
    options: [
      "Higher energy costs",
      "Increased maintenance requirements", 
      "The centre of the space is left in darkness, creating trip hazards and panic",
      "Reduced battery life"
    ],
    correctAnswer: 2,
    explanation: "Placing luminaires only around the perimeter leaves the central area in darkness, creating dangerous conditions where people can trip over furniture or become disoriented, as demonstrated in the London call centre example."
  },
  {
    id: 9,
    question: "What must be kept on-site to record all emergency lighting tests?",
    options: [
      "Installation certificates only",
      "Emergency lighting logbook",
      "Electrical test certificates only",
      "Building plans"
    ],
    correctAnswer: 1,
    explanation: "An emergency lighting logbook must be kept on-site to record all test results, maintenance activities, and remedial actions. This is essential for compliance inspections and legal requirements."
  },
  {
    id: 10,
    question: "Why should electricians use manufacturer's spacing tables when installing luminaires?",
    options: [
      "To reduce installation time",
      "To ensure accurate placement and avoid unsafe shadows or uneven coverage",
      "To meet warranty requirements only",
      "To reduce the number of luminaires needed"
    ],
    correctAnswer: 1,
    explanation: "Manufacturer's spacing tables are based on photometric testing and ensure accurate luminaire placement to achieve the required illuminance levels and uniformity, preventing unsafe shadows or uneven coverage that could compromise safety."
  }
];