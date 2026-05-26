import type { QuizQuestion } from '@/types/quiz';

export const faultCurrentQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary purpose of prospective fault current testing?',
    options: [
      'Arc flash protection due to high energy levels',
      'To verify protective device breaking capacity adequacy',
      'Prospective short-circuit current (Ipsc)',
      'It decreases due to increased resistance',
    ],
    correctAnswer: 1,
    explanation:
      'Prospective fault current testing verifies that protective devices have adequate breaking capacity to safely interrupt the maximum possible fault current at their point of installation.',
  },
  {
    id: 2,
    question: 'Which fault current is typically higher?',
    options: [
      'Prospective earth fault current (Ipef)',
      'They are always equal',
      'Prospective short-circuit current (Ipsc)',
      'It depends on the cable length',
    ],
    correctAnswer: 2,
    explanation:
      'Prospective short-circuit current (Ipsc) is typically higher because it does not include the additional resistance of the earth fault loop path that limits Ipef.',
  },
  {
    id: 3,
    question: 'What happens to fault current as conductor temperature increases?',
    options: [
      'Prospective short-circuit current (Ipsc)',
      'Arc flash protection due to high energy levels',
      'Immediate remedial action required',
      'It decreases due to increased resistance',
    ],
    correctAnswer: 3,
    explanation:
      "As conductor temperature increases, resistance increases, which reduces the fault current according to Ohm's law (I = U/R).",
  },
  {
    id: 4,
    question:
      'If a Type B MCB has a 6kA breaking capacity and the measured fault current is 8kA, what action is required?',
    options: [
      'Immediate remedial action required',
      'Ipsc = U₀ ÷ (Ze + circuit impedance)',
      'It decreases due to increased resistance',
      'Prospective short-circuit current (Ipsc)',
    ],
    correctAnswer: 0,
    explanation:
      'When fault current exceeds breaking capacity, immediate remedial action is required as the device may not safely interrupt the fault current, potentially causing explosive failure.',
  },
  {
    id: 5,
    question: 'What is the correct formula for calculating prospective short-circuit current?',
    options: [
      'Immediate remedial action required',
      'Ipsc = U₀ ÷ (Ze + circuit impedance)',
      'Arc flash protection due to high energy levels',
      'Prospective short-circuit current (Ipsc)',
    ],
    correctAnswer: 1,
    explanation:
      'Prospective short-circuit current is calculated as Ipsc = U₀ ÷ (Ze + circuit impedance), where U₀ is the nominal voltage and Ze is the supply impedance.',
  },
  {
    id: 6,
    question: 'Why must fault current testing be performed on live circuits?',
    options: [
      'Arc flash protection due to high energy levels',
      'To verify protective device breaking capacity adequacy',
      'The test requires current flow through the complete fault path',
      'At origin, distribution boards, and where device ratings change',
    ],
    correctAnswer: 2,
    explanation:
      'Fault current testing requires current to flow through the complete fault path to accurately measure impedance. Dead testing cannot replicate the actual fault current paths and transformer characteristics.',
  },
  {
    id: 7,
    question: 'What should be included in fault current test documentation?',
    options: [
      'To verify protective device breaking capacity adequacy',
      'At origin, distribution boards, and where device ratings change',
      'Arc flash protection due to high energy levels',
      'Test location, values, device ratings, and compliance status',
    ],
    correctAnswer: 3,
    explanation:
      'Complete documentation should include test location, measured values, protective device ratings, compliance status, ambient temperature, supply voltage, and any remedial actions required.',
  },
  {
    id: 8,
    question: 'Where should fault current be tested in an installation?',
    options: [
      'At origin, distribution boards, and where device ratings change',
      'To verify protective device breaking capacity adequacy',
      'The test requires current flow through the complete fault path',
      'Arc flash protection due to high energy levels',
    ],
    correctAnswer: 0,
    explanation:
      'Test at critical points including the origin (for maximum values), distribution boards, and where protective device ratings change to ensure comprehensive protection verification.',
  },
  {
    id: 9,
    question: 'What PPE consideration is specific to fault current testing?',
    options: [
      'Prospective short-circuit current (Ipsc)',
      'Arc flash protection due to high energy levels',
      'Immediate remedial action required',
      'To verify protective device breaking capacity adequacy',
    ],
    correctAnswer: 1,
    explanation:
      'Fault current testing involves high energy levels and potential arc flash hazards, requiring appropriate arc flash protection in addition to standard electrical PPE.',
  },
  {
    id: 10,
    question:
      'If fault current is insufficient to operate protective devices, what is the most appropriate backup protection?',
    options: [
      'Larger cable sizes',
      'Higher rated MCBs',
      'RCD protection',
      'Additional earthing',
    ],
    correctAnswer: 2,
    explanation:
      'When fault current is insufficient for reliable operation of overcurrent devices, RCD protection provides an effective backup by detecting earth fault currents at much lower levels.',
  },
];
