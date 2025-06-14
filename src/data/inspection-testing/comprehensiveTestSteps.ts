
import { TestStep } from '@/types/inspection-testing';

export const comprehensiveTestSteps: TestStep[] = [
  {
    id: 'visual-inspection-general',
    title: 'General Visual Inspection',
    description: 'Conduct a comprehensive visual inspection of the electrical installation',
    instructions: [
      'Check all electrical equipment for damage',
      'Verify correct labelling of circuits',
      'Inspect condition of cables and connections',
      'Check earthing arrangements'
    ],
    category: 'visual-inspection',
    estimatedTime: '30 minutes',
    order: 1
  },
  {
    id: 'safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Safely isolate the electrical installation before testing',
    instructions: [
      'Identify supply isolation points',
      'Switch off and lock off main supply',
      'Test isolation with approved voltage tester',
      'Apply warning notices'
    ],
    category: 'safe-isolation',
    estimatedTime: '15 minutes',
    safetyWarnings: [
      'Ensure proper isolation before proceeding',
      'Use only calibrated test equipment'
    ],
    order: 2
  },
  {
    id: 'continuity-cpc',
    title: 'Continuity of CPC',
    description: 'Test continuity of Circuit Protective Conductors',
    instructions: [
      'Connect test leads to CPC at distribution board',
      'Test continuity to each outlet',
      'Record resistance values',
      'Check values are within acceptable limits'
    ],
    category: 'continuity',
    estimatedTime: '45 minutes',
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    },
    order: 3
  },
  {
    id: 'continuity-ring-final',
    title: 'Continuity of Ring Final Circuits',
    description: 'Test continuity of ring final circuit conductors',
    instructions: [
      'Disconnect ring circuit at distribution board',
      'Test continuity of live conductors',
      'Test continuity of neutral conductors',
      'Test continuity of CPC conductors',
      'Cross-connect and test end-to-end'
    ],
    category: 'continuity',
    estimatedTime: '30 minutes',
    order: 4
  },
  {
    id: 'insulation-resistance',
    title: 'Insulation Resistance Testing',
    description: 'Test insulation resistance between conductors and earth',
    instructions: [
      'Ensure all circuits are disconnected',
      'Set MFT to 500V DC for circuits up to 500V',
      'Test between live conductors and earth',
      'Test between neutral and earth',
      'Test between live and neutral',
      'Record all readings'
    ],
    category: 'insulation-resistance',
    estimatedTime: '60 minutes',
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    },
    order: 5
  },
  {
    id: 'polarity-testing',
    title: 'Polarity Testing',
    description: 'Verify correct polarity of all circuits',
    instructions: [
      'Check polarity at distribution board',
      'Test polarity at each outlet',
      'Verify switch connections',
      'Check Edison screw lampholders'
    ],
    category: 'polarity',
    estimatedTime: '30 minutes',
    order: 6
  },
  {
    id: 'earth-fault-loop-impedance',
    title: 'Earth Fault Loop Impedance',
    description: 'Measure earth fault loop impedance (Zs)',
    instructions: [
      'Reconnect installation safely',
      'Use appropriate Zs tester',
      'Test at origin of installation',
      'Test at furthest point of each circuit',
      'Record all Zs values'
    ],
    category: 'earth-fault-loop',
    estimatedTime: '45 minutes',
    acceptableLimits: {
      max: 1.44,
      unit: 'Ω'
    },
    order: 7
  },
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
    estimatedTime: '20 minutes',
    acceptableLimits: {
      max: 300,
      unit: 'ms'
    },
    order: 8
  },
  {
    id: 'functional-testing',
    title: 'Functional Testing',
    description: 'Test proper operation of all circuits and equipment',
    instructions: [
      'Test all lighting circuits',
      'Test all socket outlets',
      'Check operation of switches',
      'Verify emergency lighting where applicable'
    ],
    category: 'functional-test',
    estimatedTime: '30 minutes',
    order: 9
  }
];
