import { QuizQuestion } from '@/types/quiz';

export const bmsModule4Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main benefit of integrating HVAC and lighting systems through a BMS?",
    options: [
      "Reduced installation costs",
      "Combined control achieving 30-50% energy savings",
      "Simpler wiring requirements",
      "Lower maintenance needs"
    ],
    correctAnswer: 1,
    explanation: "Integrating HVAC and lighting systems through combined control strategies can achieve energy savings of 30-50% compared to independent system operation."
  },
  {
    id: 2,
    question: "In occupancy-based control, what happens when a space becomes unoccupied?",
    options: [
      "Only lights are switched off",
      "Only HVAC is adjusted", 
      "Both lighting and HVAC are coordinated to reduce energy use",
      "Systems continue running normally"
    ],
    correctAnswer: 2,
    explanation: "In occupancy-based control, both lighting and HVAC systems are coordinated - lights switch off and HVAC adjusts to setback temperatures."
  },
  {
    id: 3,
    question: "What is the electrician's key role in enabling cross-system communication?",
    options: [
      "Programming the BMS software",
      "Installing sensors, relays, and control circuits for system integration", 
      "Designing the building layout",
      "Training building occupants"
    ],
    correctAnswer: 1,
    explanation: "The electrician's key role is installing sensors, relays, and control circuits to enable cross-system logic between lighting and HVAC systems."
  }
];