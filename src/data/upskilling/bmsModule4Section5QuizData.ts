import { QuizQuestion } from '@/types/quiz';

export const bmsModule4Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main benefit of integrating HVAC and lighting systems through a BMS?',
    options: [
      'Earthing connection for the armour',
      'Combined control achieving 30-50% energy savings',
      'Area.Line.Device format (e.g., 1.1.12)',
      'To record what was visually inspected and the outcome',
    ],
    correctAnswer: 1,
    explanation:
      'Integrating HVAC and lighting systems through combined control strategies can achieve energy savings of 30-50% compared to independent system operation.',
  },
  {
    id: 2,
    question: 'In occupancy-based control, what happens when a space becomes unoccupied?',
    options: [
      'Balance the risk against the cost and effort of reducing it',
      'Adequate terminal size and heat dissipation',
      'Both lighting and HVAC are coordinated to reduce energy use',
      'Raw material extraction to end of life disposal (A-C)',
    ],
    correctAnswer: 2,
    explanation:
      'In occupancy-based control, both lighting and HVAC systems are coordinated - lights switch off and HVAC adjusts to setback temperatures.',
  },
  {
    id: 3,
    question: "What is the electrician's key role in enabling cross-system communication?",
    options: [
      'The domestic client, but their duties pass to other duty holders as specified',
      'The sideways distortion of the scaffold frame caused by horizontal forces',
      'Creating technical drawings and designs using computer software',
      'Installing sensors, relays, and control circuits for system integration',
    ],
    correctAnswer: 3,
    explanation:
      "The electrician's key role is installing sensors, relays, and control circuits to enable cross-system logic between lighting and HVAC systems.",
  },
];
