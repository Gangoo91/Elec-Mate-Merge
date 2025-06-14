
import { TestStep } from '@/types/inspection-testing';

export const enhancedSafeIsolationSteps: TestStep[] = [
  {
    id: 'safe-isolation-planning',
    title: 'Safe Isolation Planning',
    description: 'Plan and prepare for safe isolation of electrical systems',
    instructions: [
      'Identify all supply sources',
      'Plan isolation sequence',
      'Prepare necessary isolation equipment',
      'Notify relevant personnel'
    ],
    category: 'safe-isolation',
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
    estimatedTime: '10 minutes',
    order: 2
  }
];

export const enhancedContinuitySteps: TestStep[] = [
  {
    id: 'continuity-cpc-enhanced',
    title: 'Enhanced CPC Continuity Test',
    description: 'Comprehensive test of circuit protective conductor continuity',
    instructions: [
      'Connect test leads to CPC at distribution board',
      'Test continuity to each outlet systematically',
      'Record resistance values for each circuit',
      'Verify readings are within acceptable limits'
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
    id: 'continuity-ring-enhanced',
    title: 'Enhanced Ring Circuit Continuity',
    description: 'Detailed ring final circuit continuity testing',
    instructions: [
      'Disconnect ring circuit at distribution board',
      'Test and record live conductor continuity',
      'Test and record neutral conductor continuity',
      'Test and record CPC continuity',
      'Perform cross-connection tests'
    ],
    category: 'continuity',
    estimatedTime: '35 minutes',
    order: 4
  }
];

export const enhancedInsulationSteps: TestStep[] = [
  {
    id: 'insulation-resistance-enhanced',
    title: 'Enhanced Insulation Resistance Testing',
    description: 'Comprehensive insulation resistance measurements',
    instructions: [
      'Ensure all circuits are properly disconnected',
      'Set MFT to appropriate test voltage (500V for circuits up to 500V)',
      'Test between live conductors and earth',
      'Test between neutral and earth',
      'Test between live and neutral conductors',
      'Record all readings systematically'
    ],
    category: 'insulation-resistance',
    estimatedTime: '60 minutes',
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    },
    order: 5
  }
];

export const enhancedZsTestingSteps: TestStep[] = [
  {
    id: 'zs-testing-enhanced',
    title: 'Enhanced Earth Fault Loop Impedance Testing',
    description: 'Detailed Zs measurements at multiple points',
    instructions: [
      'Safely re-energise installation for live testing',
      'Use calibrated Zs tester',
      'Test at origin of installation',
      'Test at furthest point of each circuit',
      'Test at intermediate points where required',
      'Record all Zs values with location details'
    ],
    category: 'earth-fault-loop',
    estimatedTime: '50 minutes',
    acceptableLimits: {
      max: 1.44,
      unit: 'Ω'
    },
    order: 6
  }
];

export const enhancedRCDTestingSteps: TestStep[] = [
  {
    id: 'rcd-testing-enhanced',
    title: 'Enhanced RCD Operation Testing',
    description: 'Comprehensive RCD testing including timing and sensitivity',
    instructions: [
      'Test RCD operation at rated current (IΔn)',
      'Test RCD operation at 5x rated current',
      'Record trip times for each test',
      'Test manual operation button',
      'Verify RCD resets correctly',
      'Test at different phase angles where applicable'
    ],
    category: 'rcd-test',
    estimatedTime: '25 minutes',
    acceptableLimits: {
      max: 300,
      unit: 'ms'
    },
    order: 7
  }
];

export const enhancedPolaritySteps: TestStep[] = [
  {
    id: 'polarity-verification-enhanced',
    title: 'Enhanced Polarity Verification',
    description: 'Comprehensive polarity testing of all circuits',
    instructions: [
      'Check polarity at distribution board',
      'Test polarity at each outlet systematically',
      'Verify switch connections are correct',
      'Check Edison screw lampholders for correct polarity',
      'Verify two-way and intermediate switching',
      'Document any polarity issues found'
    ],
    category: 'polarity',
    estimatedTime: '35 minutes',
    order: 8
  }
];

// Comprehensive collection of all enhanced test steps
export const allEnhancedTestSteps: TestStep[] = [
  ...enhancedSafeIsolationSteps,
  ...enhancedContinuitySteps,
  ...enhancedInsulationSteps,
  ...enhancedZsTestingSteps,
  ...enhancedRCDTestingSteps,
  ...enhancedPolaritySteps
];
