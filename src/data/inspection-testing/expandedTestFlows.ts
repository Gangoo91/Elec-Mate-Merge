
import { TestFlow } from '@/types/inspection-testing';
import { comprehensiveTestSteps } from './comprehensiveTestSteps';

export const expandedTestFlows: TestFlow[] = [
  {
    id: 'eicr-comprehensive',
    title: 'EICR Comprehensive Testing',
    description: 'Complete EICR testing procedure including all required tests and inspections',
    type: 'eicr',
    difficulty: 'advanced',
    isComprehensive: true,
    estimatedDuration: '4-6 hours',
    regulatoryStandards: [
      'BS 7671:2018+A2:2022',
      'IET Guidance Note 3'
    ],
    steps: [
      {
        id: 'visual-inspection-comprehensive',
        title: 'Comprehensive Visual Inspection',
        description: 'Detailed visual inspection of electrical installation',
        instructions: [
          'Inspect consumer unit/distribution board condition',
          'Check cable routing and support',
          'Verify earthing and bonding arrangements',
          'Inspect accessories and equipment'
        ],
        category: 'visual-inspection',
        estimatedTime: '45 minutes',
        order: 1
      },
      {
        id: 'safe-isolation-comprehensive',
        title: 'Safe Isolation for Testing',
        description: 'Complete safe isolation procedure for comprehensive testing',
        instructions: [
          'Identify and isolate all sources',
          'Lock off and tag isolation points',
          'Test dead with approved device',
          'Apply warning notices'
        ],
        category: 'safe-isolation',
        estimatedTime: '20 minutes',
        order: 2
      },
      {
        id: 'continuity-comprehensive',
        title: 'Comprehensive Continuity Testing',
        description: 'Full continuity testing of all protective conductors',
        instructions: [
          'Test main earthing conductor',
          'Test supplementary bonding',
          'Test circuit protective conductors',
          'Test ring final circuits'
        ],
        category: 'continuity',
        estimatedTime: '60 minutes',
        order: 3
      },
      {
        id: 'insulation-comprehensive',
        title: 'Comprehensive Insulation Testing',
        description: 'Complete insulation resistance testing',
        instructions: [
          'Test at 500V between live conductors',
          'Test between live and neutral',
          'Test between live and earth',
          'Test between neutral and earth'
        ],
        category: 'insulation-resistance',
        estimatedTime: '45 minutes',
        order: 4
      }
    ]
  },
  {
    id: 'eic-new-installation',
    title: 'EIC New Installation Testing',
    description: 'Electrical Installation Certificate testing for new installations',
    type: 'eic',
    difficulty: 'intermediate',
    estimatedDuration: '3-5 hours',
    regulatoryStandards: [
      'BS 7671:2018+A2:2022',
      'IET Guidance Note 3'
    ],
    steps: [
      {
        id: 'design-verification',
        title: 'Design Verification',
        description: 'Verify installation design compliance',
        instructions: [
          'Check design calculations',
          'Verify cable sizing',
          'Check protective device ratings',
          'Confirm earthing arrangements'
        ],
        category: 'verification',
        estimatedTime: '30 minutes',
        order: 1
      }
    ]
  },
  {
    id: 'minor-works-testing',
    title: 'Minor Works Testing',
    description: 'Testing procedures for minor electrical works',
    type: 'minor-works',
    difficulty: 'intermediate',
    estimatedDuration: '1-2 hours',
    regulatoryStandards: [
      'BS 7671:2018+A2:2022'
    ],
    steps: [
      {
        id: 'minor-works-inspection',
        title: 'Minor Works Inspection',
        description: 'Visual inspection of minor works',
        instructions: [
          'Inspect new work completed',
          'Check connections are secure',
          'Verify cable routing',
          'Check labelling'
        ],
        category: 'visual-inspection',
        estimatedTime: '15 minutes',
        order: 1
      }
    ]
  }
];
