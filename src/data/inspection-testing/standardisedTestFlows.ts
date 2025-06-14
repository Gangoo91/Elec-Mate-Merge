
import { TestFlow } from '@/types/inspection-testing';

export const standardisedTestFlows: TestFlow[] = [
  {
    id: 'standardised-eicr',
    title: 'Standardised EICR Testing',
    description: 'Standardised Electrical Installation Condition Report testing procedure',
    type: 'eicr',
    difficulty: 'intermediate',
    estimatedDuration: '3-4 hours',
    steps: [
      {
        id: 'std-visual-inspection',
        title: 'Visual Inspection',
        description: 'Comprehensive visual inspection of electrical installation',
        instructions: [
          'Check consumer unit condition',
          'Inspect cable routes and supports',
          'Examine accessories and equipment',
          'Verify earthing and bonding'
        ],
        category: 'visual-inspection',
        estimatedTime: '45 minutes',
        order: '1'
      },
      {
        id: 'std-safe-isolation',
        title: 'Safe Isolation',
        description: 'Safely isolate electrical installation',
        instructions: [
          'Identify supply sources',
          'Switch off and lock off',
          'Test dead with approved device',
          'Apply warning notices'
        ],
        category: 'safe-isolation',
        estimatedTime: '15 minutes',
        order: '2'
      },
      {
        id: 'std-continuity-test',
        title: 'Continuity Testing',
        description: 'Test continuity of protective conductors',
        instructions: [
          'Test main earthing conductor',
          'Test protective conductors',
          'Test ring final circuits',
          'Record all readings'
        ],
        category: 'continuity',
        estimatedTime: '60 minutes',
        acceptableLimits: {
          max: 1.67,
          unit: 'Ω'
        },
        order: '3'
      }
    ]
  }
];
