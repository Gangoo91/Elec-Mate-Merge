
import { CircuitTestStep } from '@/types/circuit-testing';

export const safeIsolationSteps: CircuitTestStep[] = [
  {
    id: 'safe-isolation-planning',
    title: 'Safe Isolation Planning',
    description: 'Plan and prepare for safe isolation',
    instructions: [
      'Identify all supply sources',
      'Plan isolation sequence',
      'Prepare isolation equipment',
      'Notify relevant personnel'
    ],
    category: 'safe-isolation',
    testType: 'procedural',
    estimatedTime: '15 minutes',
    order: 1,
    safetyWarnings: [
      'Ensure proper PPE is worn',
      'Verify isolation equipment is functioning'
    ]
  },
  {
    id: 'supply-isolation',
    title: 'Supply Isolation',
    description: 'Isolate electrical supply safely',
    instructions: [
      'Switch off main supply',
      'Lock off isolation points',
      'Apply warning notices',
      'Test isolation is effective'
    ],
    category: 'safe-isolation',
    testType: 'procedural',
    estimatedTime: '10 minutes',
    order: 2
  }
];

export const continuityTestSteps: CircuitTestStep[] = [
  {
    id: 'continuity-cpc',
    title: 'CPC Continuity Test',
    description: 'Test continuity of circuit protective conductors',
    instructions: [
      'Connect test leads to CPC at distribution board',
      'Test continuity to each outlet',
      'Record resistance values',
      'Verify readings are within limits'
    ],
    category: 'continuity',
    testType: 'measurement',
    estimatedTime: '45 minutes',
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    },
    order: 3
  }
];

export const insulationTestSteps: CircuitTestStep[] = [
  {
    id: 'insulation-resistance',
    title: 'Insulation Resistance Testing',
    description: 'Test insulation resistance between conductors',
    instructions: [
      'Ensure all circuits are disconnected',
      'Set MFT to 500V DC',
      'Test between live and earth',
      'Test between neutral and earth',
      'Record all readings'
    ],
    category: 'insulation-resistance',
    testType: 'measurement',
    estimatedTime: '60 minutes',
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    },
    order: 4
  }
];

export const earthFaultLoopSteps: CircuitTestStep[] = [
  {
    id: 'earth-fault-loop',
    title: 'Earth Fault Loop Impedance',
    description: 'Measure earth fault loop impedance (Zs)',
    instructions: [
      'Re-energise installation safely',
      'Use appropriate Zs tester',
      'Test at origin of installation',
      'Test at furthest point of each circuit',
      'Record all Zs values'
    ],
    category: 'earth-fault-loop',
    testType: 'measurement',
    estimatedTime: '45 minutes',
    acceptableLimits: {
      max: 1.44,
      unit: 'Ω'
    },
    order: 5
  }
];

export const rcdTestSteps: CircuitTestStep[] = [
  {
    id: 'rcd-testing',
    title: 'RCD Testing',
    description: 'Test operation and timing of RCD devices',
    instructions: [
      'Test RCD operation at rated current',
      'Test RCD operation at 5x rated current',
      'Record trip times',
      'Test manual operation button'
    ],
    category: 'rcd-test',
    testType: 'measurement',
    estimatedTime: '20 minutes',
    acceptableLimits: {
      max: 300,
      unit: 'ms'
    },
    order: 6
  }
];

export const polarityTestSteps: CircuitTestStep[] = [
  {
    id: 'polarity-verification',
    title: 'Polarity Verification',
    description: 'Verify correct polarity of all circuits',
    instructions: [
      'Check polarity at distribution board',
      'Test polarity at each outlet',
      'Verify switch connections',
      'Check Edison screw lampholders'
    ],
    category: 'polarity',
    testType: 'visual',
    estimatedTime: '30 minutes',
    order: 7
  }
];

export const functionalTestSteps: CircuitTestStep[] = [
  {
    id: 'functional-testing',
    title: 'Functional Testing',
    description: 'Test proper operation of all circuits',
    instructions: [
      'Test all lighting circuits',
      'Test all socket outlets',
      'Check operation of switches',
      'Verify emergency lighting'
    ],
    category: 'functional-test',
    testType: 'procedural',
    estimatedTime: '30 minutes',
    order: 8
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
