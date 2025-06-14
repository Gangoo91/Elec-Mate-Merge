
import { CircuitTestStep } from '@/types/circuit-testing';

export const safeIsolationSteps: CircuitTestStep[] = [
  {
    id: 'isolation-planning',
    title: 'Isolation Planning',
    description: 'Plan the safe isolation procedure',
    instructions: [
      'Identify all supply sources',
      'Plan isolation sequence',
      'Prepare isolation equipment'
    ],
    category: 'safe-isolation',
    testType: 'procedural',
    order: 1,
    estimatedTime: '10 minutes'
  }
];

export const continuityTestSteps: CircuitTestStep[] = [
  {
    id: 'continuity-cpc',
    title: 'CPC Continuity Test',
    description: 'Test continuity of circuit protective conductors',
    instructions: [
      'Connect test leads to CPC',
      'Test to each outlet',
      'Record resistance values'
    ],
    category: 'continuity',
    testType: 'measurement',
    order: 2,
    estimatedTime: '30 minutes',
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    }
  }
];

export const insulationTestSteps: CircuitTestStep[] = [
  {
    id: 'insulation-resistance',
    title: 'Insulation Resistance Test',
    description: 'Test insulation resistance between conductors',
    instructions: [
      'Set tester to 500V DC',
      'Test between live and neutral',
      'Test between live and earth',
      'Record all readings'
    ],
    category: 'insulation-resistance',
    testType: 'measurement',
    order: 3,
    estimatedTime: '45 minutes',
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    }
  }
];

export const earthFaultLoopSteps: CircuitTestStep[] = [
  {
    id: 'earth-fault-loop',
    title: 'Earth Fault Loop Impedance',
    description: 'Measure Zs values at circuit outlets',
    instructions: [
      'Energise circuit safely',
      'Test at distribution board',
      'Test at furthest point',
      'Record Zs values'
    ],
    category: 'earth-fault-loop',
    testType: 'measurement',
    order: 4,
    estimatedTime: '30 minutes',
    acceptableLimits: {
      max: 1.44,
      unit: 'Ω'
    }
  }
];

export const rcdTestSteps: CircuitTestStep[] = [
  {
    id: 'rcd-testing',
    title: 'RCD Operation Test',
    description: 'Test RCD operation and timing',
    instructions: [
      'Test at rated current',
      'Test at 5x rated current',
      'Record trip times',
      'Test manual operation'
    ],
    category: 'rcd-test',
    testType: 'measurement',
    order: 5,
    estimatedTime: '15 minutes',
    acceptableLimits: {
      max: 300,
      unit: 'ms'
    }
  }
];

export const polarityTestSteps: CircuitTestStep[] = [
  {
    id: 'polarity-check',
    title: 'Polarity Verification',
    description: 'Verify correct polarity connections',
    instructions: [
      'Check polarity at DB',
      'Test at each outlet',
      'Verify switch connections'
    ],
    category: 'polarity',
    testType: 'measurement',
    order: 6,
    estimatedTime: '20 minutes'
  }
];

export const functionalTestSteps: CircuitTestStep[] = [
  {
    id: 'functional-testing',
    title: 'Functional Testing',
    description: 'Test circuit operation and functionality',
    instructions: [
      'Test all outlets',
      'Check switching operation',
      'Verify correct operation'
    ],
    category: 'functional-test',
    testType: 'procedural',
    order: 7,
    estimatedTime: '25 minutes'
  }
];

export const allCircuitTestSteps: CircuitTestStep[] = [
  ...safeIsolationSteps,
  ...continuityTestSteps,
  ...insulationTestSteps,
  ...earthFaultLoopSteps,
  ...rcdTestSteps,
  ...polarityTestSteps,
  ...functionalTestSteps
];
