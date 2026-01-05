import type { QuizQuestion } from '@/types/quiz';

export const rcdFundamentalsQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does an RCD detect in an electrical circuit?',
    options: [
      'Voltage fluctuations',
      'Current imbalance between live and neutral conductors',
      'Power factor variations',
      'Frequency changes'
    ],
    correctAnswer: 1,
    explanation: 'RCDs detect current imbalance between live and neutral conductors. This imbalance indicates current leaking to earth, which could be through a person or damaged insulation.'
  },
  {
    id: 2,
    question: 'Why is 30mA the standard sensitivity for personal protection RCDs?',
    options: [
      'It\'s the minimum current that can be detected',
      'It prevents ventricular fibrillation in most people',
      'It\'s the maximum current an RCD can handle',
      'It\'s required by building regulations'
    ],
    correctAnswer: 1,
    explanation: '30mA is below the level where ventricular fibrillation typically occurs (around 50mA+). This provides a safety margin accounting for individual variations and contact duration.'
  },
  {
    id: 3,
    question: 'Which BS 7671 regulation mandates RCD protection for socket outlets?',
    options: [
      'Regulation 522.6.202',
      'Regulation 411.3.3',
      'Regulation 531.3.3',
      'Regulation 314.1'
    ],
    correctAnswer: 1,
    explanation: 'Regulation 411.3.3 requires additional protection by RCD with IΔn ≤ 30mA for socket outlets not exceeding 32A, among other applications.'
  },
  {
    id: 4,
    question: 'What is the primary limitation of RCD protection?',
    options: [
      'Cannot protect against live-neutral shock',
      'Only works in dry conditions',
      'Requires external power to operate',
      'Cannot detect high-frequency faults'
    ],
    correctAnswer: 0,
    explanation: 'RCDs cannot protect against shock between live and neutral conductors because this doesn\'t create the current imbalance needed for RCD operation. They only detect earth faults.'
  },
  {
    id: 5,
    question: 'What is the maximum trip time for a 30mA RCD at its rated current?',
    options: [
      '100ms',
      '200ms',
      '300ms',
      '500ms'
    ],
    correctAnswer: 2,
    explanation: 'BS EN 61008/61009 specifies that RCDs must trip within 300ms when tested at their rated residual current (IΔn). At 5× rated current, they must trip within 40ms.'
  },
  {
    id: 6,
    question: 'Which type of current can a 100mA RCD be used to protect against?',
    options: [
      'Personal protection only',
      'Fire protection and equipment protection',
      'Overload protection',
      'Short circuit protection'
    ],
    correctAnswer: 1,
    explanation: '100mA RCDs are typically used for fire protection and equipment protection. They detect earth faults that could cause fires while providing discrimination with downstream 30mA devices.'
  },
  {
    id: 7,
    question: 'What happens in the RCD toroidal core during a normal operation?',
    options: [
      'Strong magnetic flux is created',
      'Voltage is induced in the detection coil',
      'Live and neutral magnetic fields cancel out',
      'The trip mechanism is activated'
    ],
    correctAnswer: 2,
    explanation: 'During normal operation, equal currents in live and neutral conductors create magnetic fields that cancel out in the toroidal core, resulting in no net flux and no induced voltage.'
  },
  {
    id: 8,
    question: 'According to BS 7671, which cables require 30mA RCD protection?',
    options: [
      'All cables regardless of depth',
      'Cables concealed in walls at depth ≤50mm',
      'Only outdoor cables',
      'Cables in metal conduit only'
    ],
    correctAnswer: 1,
    explanation: 'Regulation 522.6.202 requires 30mA RCD protection for cables concealed in walls at depth ≤50mm unless they have earthed metallic covering or mechanical protection.'
  },
  {
    id: 9,
    question: 'What should you do if an RCD trips repeatedly without obvious cause?',
    options: [
      'Replace it with a higher rated RCD',
      'Disconnect the test button',
      'Investigate for earth faults and insulation breakdown',
      'Reset it and ignore the problem'
    ],
    correctAnswer: 2,
    explanation: 'Persistent RCD tripping indicates potential earth faults or insulation problems that must be investigated. Simply increasing the rating or ignoring the problem creates safety risks.'
  },
  {
    id: 10,
    question: 'Which physiological effect occurs at approximately 50mA of current through the body?',
    options: [
      'Mild tingling sensation',
      'Loss of muscular control',
      'Ventricular fibrillation risk',
      'Burns and tissue damage'
    ],
    correctAnswer: 2,
    explanation: 'Around 50mA is where ventricular fibrillation (dangerous heart rhythm) becomes likely. This is why 30mA RCDs provide protection by tripping before this dangerous level is reached.'
  }
];