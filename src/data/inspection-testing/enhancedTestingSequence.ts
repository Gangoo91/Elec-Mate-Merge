
import { TestStep } from '@/types/inspection-testing';

export const safeIsolationSequence: TestStep[] = [
  {
    id: 'safe-isolation-planning',
    title: 'Safe Isolation Planning',
    description: 'Plan and prepare for safe isolation of electrical systems',
    instructions: [
      'Identify all supply sources and isolation points',
      'Plan isolation sequence to maintain safety',
      'Prepare necessary isolation equipment and PPE',
      'Notify relevant personnel of planned isolation',
      'Ensure emergency procedures are understood'
    ],
    category: 'safe-isolation',
    estimatedTime: '15 minutes',
    order: '7',
    safetyWarnings: [
      'Ensure proper PPE is worn throughout procedure',
      'Verify isolation equipment is functioning correctly',
      'Have emergency contact details readily available'
    ]
  },
  {
    id: 'supply-isolation-execution',
    title: 'Supply Isolation Execution',
    description: 'Execute safe isolation of electrical supply',
    instructions: [
      'Switch off main supply at appropriate isolation point',
      'Lock off isolation points with appropriate locks',
      'Apply warning notices at all isolation points',
      'Test isolation is effective using approved voltage tester',
      'Re-test voltage tester on known supply to prove operation'
    ],
    category: 'safe-isolation',
    estimatedTime: '10 minutes',
    order: '8',
    safetyWarnings: [
      'Use only approved voltage testers to HSE GS38',
      'Prove tester before and after isolation testing'
    ]
  }
];

export const deadTestingSequence: TestStep[] = [
  {
    id: 'continuity-protective-conductors',
    title: 'Continuity of Protective Conductors',
    description: 'Test continuity of circuit protective conductors (CPC)',
    instructions: [
      'Connect test leads to CPC at distribution board',
      'Test continuity to each outlet on circuit',
      'Record resistance values for each test point',
      'Verify readings are within acceptable limits for cable size',
      'Check for high resistance joints or connections'
    ],
    category: 'continuity',
    estimatedTime: '45 minutes',
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    },
    order: '9'
  },
  {
    id: 'continuity-ring-final-circuits',
    title: 'Continuity of Ring Final Circuits',
    description: 'Test continuity of ring final circuit conductors',
    instructions: [
      'Disconnect ring circuit conductors at distribution board',
      'Test and record end-to-end resistance of live conductors',
      'Test and record end-to-end resistance of neutral conductors',
      'Test and record end-to-end resistance of CPC',
      'Cross-connect and test (r1 + r2) at each socket outlet',
      'Verify readings confirm ring circuit integrity'
    ],
    category: 'continuity',
    estimatedTime: '30 minutes',
    order: '10'
  },
  {
    id: 'insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description: 'Test insulation resistance between conductors and earth',
    instructions: [
      'Ensure all circuits are properly disconnected and isolated',
      'Set insulation resistance tester to appropriate test voltage',
      'Test between live conductors and earth',
      'Test between neutral conductor and earth',
      'Test between live and neutral conductors',
      'Record all readings and verify compliance with minimum values'
    ],
    category: 'insulation-resistance',
    estimatedTime: '60 minutes',
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    },
    order: '11'
  },
  {
    id: 'polarity-verification',
    title: 'Polarity Verification',
    description: 'Verify correct polarity of all circuits and equipment',
    instructions: [
      'Check polarity at distribution board connections',
      'Test polarity at each socket outlet using continuity tester',
      'Verify switch connections interrupt live conductors only',
      'Check Edison screw lampholders for correct polarity',
      'Test centre contact of ES lampholders connected to live'
    ],
    category: 'polarity',
    estimatedTime: '30 minutes',
    order: '12'
  }
];

export const liveTestingSequence: TestStep[] = [
  {
    id: 'safe-re-energisation',
    title: 'Safe Re-energisation',
    description: 'Safely restore electrical supply for live testing',
    instructions: [
      'Ensure all dead testing is complete and circuits reconnected',
      'Remove locks and warning notices from isolation points',
      'Restore electrical supply in planned sequence',
      'Verify supply is present using approved voltage tester',
      'Check phase sequence where applicable'
    ],
    category: 'live-testing-prep',
    estimatedTime: '10 minutes',
    order: '13',
    safetyWarnings: [
      'Ensure all personnel are clear of equipment during re-energisation',
      'Use appropriate PPE for live working'
    ]
  },
  {
    id: 'earth-fault-loop-impedance',
    title: 'Earth Fault Loop Impedance Testing',
    description: 'Measure earth fault loop impedance (Zs) at multiple points',
    instructions: [
      'Use calibrated earth fault loop impedance tester',
      'Test at origin of installation (Ze + R1 + R2)',
      'Test at furthest point of each circuit',
      'Test at additional points where circuit length varies significantly',
      'Record all Zs values and verify compliance with maximum permitted values'
    ],
    category: 'earth-fault-loop',
    estimatedTime: '45 minutes',
    acceptableLimits: {
      max: 1.44,
      unit: 'Ω'
    },
    order: '14'
  },
  {
    id: 'rcd-operation-testing',
    title: 'RCD Operation and Timing Testing',
    description: 'Test RCD operation times and sensitivity',
    instructions: [
      'Test RCD operation at rated residual current (IΔn)',
      'Test RCD operation at 5 times rated residual current',
      'Record trip times for each test',
      'Test manual test button operation',
      'Verify RCD resets correctly after each test',
      'Test at different phase angles for Type AC RCDs'
    ],
    category: 'rcd-test',
    estimatedTime: '25 minutes',
    acceptableLimits: {
      max: 300,
      unit: 'ms'
    },
    order: '15'
  },
  {
    id: 'functional-testing',
    title: 'Functional Testing',
    description: 'Test proper operation of all circuits and equipment',
    instructions: [
      'Test all lighting circuits for correct operation',
      'Test all socket outlets using socket tester',
      'Check operation of all switches and controls',
      'Test emergency lighting where installed',
      'Verify correct operation of any special equipment'
    ],
    category: 'functional-test',
    estimatedTime: '30 minutes',
    order: '16'
  }
];

export const comprehensiveTestingSequence: TestStep[] = [
  ...safeIsolationSequence,
  ...deadTestingSequence,
  ...liveTestingSequence
];
