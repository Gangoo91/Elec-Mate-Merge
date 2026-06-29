import { QuizQuestion } from '@/types/quiz';

export const bmsModule4Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main benefit of integrating HVAC and lighting systems through a BMS?',
    options: [
      'It removes the need for individual room thermostats and switches',
      'Combined control strategies that coordinate the systems to cut energy use',
      'It allows lighting and HVAC to share a single supply circuit',
      'It guarantees both systems can run without any maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'Integrating HVAC and lighting through a BMS lets combined control strategies share occupancy and scheduling data, coordinating the systems to reduce energy use compared with independent operation.',
  },
  {
    id: 2,
    question: 'In occupancy-based control, what happens when a space becomes unoccupied?',
    options: [
      'Lighting is dimmed but HVAC continues at the full setpoint',
      'HVAC ramps up to purge the space before shutdown',
      'Both lighting and HVAC are coordinated to reduce energy use',
      'Only the lighting responds; HVAC ignores occupancy data',
    ],
    correctAnswer: 2,
    explanation:
      'In occupancy-based control, both lighting and HVAC systems are coordinated - lights switch off and HVAC adjusts to setback temperatures.',
  },
  {
    id: 3,
    question: "What is the electrician's key role in enabling cross-system communication?",
    options: [
      'Writing the supervisory control software that runs the BMS head-end',
      'Specifying the energy-saving setpoints used by the facilities manager',
      'Commissioning the network protocol gateways between manufacturers',
      'Installing sensors, relays, and control circuits for system integration',
    ],
    correctAnswer: 3,
    explanation:
      "The electrician's key role is installing sensors, relays, and control circuits to enable cross-system logic between lighting and HVAC systems.",
  },
];
