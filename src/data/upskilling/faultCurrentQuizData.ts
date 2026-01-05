import type { QuizQuestion } from '@/types/quiz';

export const faultCurrentQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary purpose of prospective fault current testing?',
    options: [
      'To measure circuit resistance',
      'To verify protective device breaking capacity adequacy',
      'To check voltage levels',
      'To test RCD operation'
    ],
    correctAnswer: 1,
    explanation: 'Prospective fault current testing verifies that protective devices have adequate breaking capacity to safely interrupt the maximum possible fault current at their point of installation.'
  },
  {
    id: 2,
    question: 'Which fault current is typically higher?',
    options: [
      'Prospective earth fault current (Ipef)',
      'Prospective short-circuit current (Ipsc)',
      'They are always equal',
      'It depends on the cable length'
    ],
    correctAnswer: 1,
    explanation: 'Prospective short-circuit current (Ipsc) is typically higher because it does not include the additional resistance of the earth fault loop path that limits Ipef.'
  },
  {
    id: 3,
    question: 'What happens to fault current as conductor temperature increases?',
    options: [
      'It increases proportionally',
      'It remains constant',
      'It decreases due to increased resistance',
      'It fluctuates randomly'
    ],
    correctAnswer: 2,
    explanation: 'As conductor temperature increases, resistance increases, which reduces the fault current according to Ohm\'s law (I = U/R).'
  },
  {
    id: 4,
    question: 'If a Type B MCB has a 6kA breaking capacity and the measured fault current is 8kA, what action is required?',
    options: [
      'No action needed',
      'Monitor the situation',
      'Immediate remedial action required',
      'Test again to confirm'
    ],
    correctAnswer: 2,
    explanation: 'When fault current exceeds breaking capacity, immediate remedial action is required as the device may not safely interrupt the fault current, potentially causing explosive failure.'
  },
  {
    id: 5,
    question: 'What is the correct formula for calculating prospective short-circuit current?',
    options: [
      'Ipsc = U₀ × (Ze + Zs)',
      'Ipsc = U₀ ÷ Ze',
      'Ipsc = U₀ ÷ (Ze + circuit impedance)',
      'Ipsc = U₀ ÷ Zs'
    ],
    correctAnswer: 2,
    explanation: 'Prospective short-circuit current is calculated as Ipsc = U₀ ÷ (Ze + circuit impedance), where U₀ is the nominal voltage and Ze is the supply impedance.'
  },
  {
    id: 6,
    question: 'Why must fault current testing be performed on live circuits?',
    options: [
      'It\'s easier to connect test leads',
      'Dead circuits give inaccurate readings',
      'The test requires current flow through the complete fault path',
      'To avoid disconnecting loads'
    ],
    correctAnswer: 2,
    explanation: 'Fault current testing requires current to flow through the complete fault path to accurately measure impedance. Dead testing cannot replicate the actual fault current paths and transformer characteristics.'
  },
  {
    id: 7,
    question: 'What should be included in fault current test documentation?',
    options: [
      'Only the final current value',
      'Test location, values, device ratings, and compliance status',
      'Just the protective device type',
      'The weather conditions'
    ],
    correctAnswer: 1,
    explanation: 'Complete documentation should include test location, measured values, protective device ratings, compliance status, ambient temperature, supply voltage, and any remedial actions required.'
  },
  {
    id: 8,
    question: 'Where should fault current be tested in an installation?',
    options: [
      'Only at the origin',
      'At every socket outlet',
      'At origin, distribution boards, and where device ratings change',
      'Only where problems are suspected'
    ],
    correctAnswer: 2,
    explanation: 'Test at critical points including the origin (for maximum values), distribution boards, and where protective device ratings change to ensure comprehensive protection verification.'
  },
  {
    id: 9,
    question: 'What PPE consideration is specific to fault current testing?',
    options: [
      'Safety boots only',
      'Standard electrical PPE is sufficient',
      'Arc flash protection due to high energy levels',
      'No special PPE required'
    ],
    correctAnswer: 2,
    explanation: 'Fault current testing involves high energy levels and potential arc flash hazards, requiring appropriate arc flash protection in addition to standard electrical PPE.'
  },
  {
    id: 10,
    question: 'If fault current is insufficient to operate protective devices, what is the most appropriate backup protection?',
    options: [
      'Larger cable sizes',
      'RCD protection',
      'Higher rated MCBs',
      'Additional earthing'
    ],
    correctAnswer: 1,
    explanation: 'When fault current is insufficient for reliable operation of overcurrent devices, RCD protection provides an effective backup by detecting earth fault currents at much lower levels.'
  }
];