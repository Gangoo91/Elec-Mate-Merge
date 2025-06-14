
import { TestFlow } from '@/types/inspection-testing';

export const testFlows: TestFlow[] = [
  {
    id: 'basic-eicr',
    title: 'Basic EICR Testing',
    description: 'Essential EICR testing procedures for domestic installations',
    type: 'eicr',
    difficulty: 'beginner',
    estimatedDuration: '2-3 hours',
    steps: [
      {
        id: 'basic-visual',
        title: 'Basic Visual Inspection',
        description: 'Initial visual inspection',
        instructions: [
          'Check main switch and consumer unit',
          'Look for obvious damage or defects',
          'Check basic labelling'
        ],
        category: 'visual-inspection',
        estimatedTime: '20 minutes',
        order: '1'
      },
      {
        id: 'basic-isolation',
        title: 'Basic Safe Isolation',
        description: 'Standard isolation procedure',
        instructions: [
          'Switch off main supply',
          'Test voltage indicator',
          'Confirm dead'
        ],
        category: 'safe-isolation',
        estimatedTime: '10 minutes',
        order: '2'
      }
    ]
  },
  {
    id: 'polarity-testing-flow',
    title: 'Polarity Testing Procedure',
    description: 'Comprehensive polarity verification testing',
    type: 'polarity',
    difficulty: 'intermediate',
    estimatedDuration: '1-2 hours',
    steps: [
      {
        id: 'polarity-visual',
        title: 'Polarity Visual Check',
        description: 'Visual verification of polarity connections',
        instructions: [
          'Check switch connections at consumer unit',
          'Verify correct conductor identification',
          'Check Edison screw lampholders'
        ],
        category: 'polarity',
        estimatedTime: '30 minutes',
        order: '1'
      },
      {
        id: 'polarity-testing',
        title: 'Polarity Testing',
        description: 'Test polarity with instruments',
        instructions: [
          'Test polarity at each outlet',
          'Verify correct connections',
          'Record any incorrect polarity'
        ],
        category: 'polarity',
        estimatedTime: '45 minutes',
        order: '2'
      }
    ]
  }
];
