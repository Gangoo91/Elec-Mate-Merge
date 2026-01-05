
import { Question } from './types';

export const diagnosticQuestions: Question[] = [
  {
    id: 'initial',
    question: 'What is the primary symptom you are experiencing?',
    options: [
      'Complete power loss',
      'Circuit breaker/RCD tripping',
      'Electrical shock from equipment',
      'Burning smell or visible damage',
      'Intermittent electrical issues',
      'Lights flickering or dimming'
    ]
  },
  {
    id: 'power_loss',
    question: 'Is the power loss affecting the entire installation or specific circuits?',
    options: ['Entire installation', 'Specific circuits only', 'Single appliance/outlet']
  },
  {
    id: 'tripping',
    question: 'What type of protective device is tripping?',
    options: ['MCB (Circuit Breaker)', 'RCD (Residual Current Device)', 'Both MCB and RCD', 'Main switch']
  },
  {
    id: 'shock_severity',
    question: 'How severe was the electrical shock?',
    options: ['Mild tingle', 'Noticeable shock', 'Severe shock with muscle contraction'],
    criticalPath: true
  },
  {
    id: 'burning_location',
    question: 'Where is the burning smell coming from?',
    options: ['Consumer unit/distribution board', 'Socket outlets', 'Light fittings', 'Appliances', 'Cables/wiring'],
    criticalPath: true
  }
];
