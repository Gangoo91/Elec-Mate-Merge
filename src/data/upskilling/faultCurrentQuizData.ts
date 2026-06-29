import type { QuizQuestion } from '@/types/quiz';

export const faultCurrentQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary purpose of prospective fault current testing?',
    options: [
      'To measure the insulation resistance of the circuit',
      'To verify protective device breaking capacity adequacy',
      'To confirm the polarity of the supply conductors',
      'To establish the ambient operating temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Prospective fault current testing verifies that protective devices have adequate breaking capacity to safely interrupt the maximum possible fault current at their point of installation.',
  },
  {
    id: 2,
    question: 'At a given point, which prospective fault current is typically higher?',
    options: [
      'Prospective earth fault current (Ipef)',
      'The line-to-earth fault current via the CPC',
      'Prospective short-circuit current (Ipsc)',
      'The residual current detected by the RCD',
    ],
    correctAnswer: 2,
    explanation:
      'Prospective short-circuit current (Ipsc), measured line-to-neutral or line-to-line, is typically higher because it does not include the additional impedance of the protective conductor in the earth fault loop path that limits Ipef.',
  },
  {
    id: 3,
    question: 'What happens to fault current as conductor temperature increases?',
    options: [
      'It increases as resistance falls',
      'It remains constant regardless of temperature',
      'It rises sharply once the cable reaches 70°C',
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
      'No action; the 6kA rating provides ample margin',
      'Downrate the MCB to a lower current rating',
      'Re-test at a higher ambient temperature only',
    ],
    correctAnswer: 0,
    explanation:
      'When fault current exceeds breaking capacity, immediate remedial action is required as the device may not safely interrupt the fault current, potentially causing explosive failure.',
  },
  {
    id: 5,
    question: 'What is the correct formula for calculating prospective short-circuit current?',
    options: [
      'Ipsc = (Ze + circuit impedance) ÷ U₀',
      'Ipsc = U₀ ÷ (Ze + circuit impedance)',
      'Ipsc = U₀ × (Ze + circuit impedance)',
      'Ipsc = U₀ ÷ (Ze − circuit impedance)',
    ],
    correctAnswer: 1,
    explanation:
      'Prospective short-circuit current is calculated as Ipsc = U₀ ÷ (Ze + circuit impedance), where U₀ is the nominal voltage and Ze is the supply impedance.',
  },
  {
    id: 6,
    question: 'Why must fault current testing be performed on live circuits?',
    options: [
      'Dead testing would damage the test instrument',
      'It is a legal requirement to test everything live',
      'The test requires current flow through the complete fault path',
      'Live testing is faster and avoids isolating the supply',
    ],
    correctAnswer: 2,
    explanation:
      'Fault current testing requires current to flow through the complete fault path to accurately measure impedance. Dead testing cannot replicate the actual fault current paths and transformer characteristics.',
  },
  {
    id: 7,
    question: 'What should be included in fault current test documentation?',
    options: [
      'Only the single highest reading at the origin',
      'The make and model of the test instrument alone',
      'A photograph of the consumer unit and nothing more',
      'Test location, values, device ratings, and compliance status',
    ],
    correctAnswer: 3,
    explanation:
      'Complete documentation should include test location, measured values, protective device ratings, compliance status, ambient temperature, supply voltage, and any remedial actions required.',
  },
  {
    id: 8,
    question: 'Where should prospective fault current be tested in an installation?',
    options: [
      'At origin, distribution boards, and where device ratings change',
      'Only at the final socket-outlet on each circuit',
      'At a single midpoint of the longest cable run',
      'Only at points where an RCD is installed',
    ],
    correctAnswer: 0,
    explanation:
      'Test at critical points including the origin (for maximum values), distribution boards, and where protective device ratings change to ensure comprehensive protection verification.',
  },
  {
    id: 9,
    question: 'What PPE consideration is specific to fault current testing?',
    options: [
      'Hearing protection against instrument alarm tones',
      'Arc flash protection due to high energy levels',
      'Hi-vis clothing for working in low light',
      'A dust mask for working near old cable sheathing',
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
