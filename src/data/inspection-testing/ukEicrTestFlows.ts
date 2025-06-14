
import { TestFlow } from '@/types/inspection-testing';

export const ukEicrTestFlows: TestFlow[] = [
  {
    id: 'uk-domestic-eicr',
    title: 'UK Domestic EICR',
    description: 'UK domestic EICR testing following current regulations',
    type: 'eicr',
    difficulty: 'intermediate',
    estimatedDuration: '4-6 hours',
    regulatoryStandards: [
      'BS 7671:2018+A2:2022',
      'IET Guidance Note 3'
    ],
    steps: [
      {
        id: 'uk-visual-inspection',
        title: 'UK Visual Inspection',
        description: 'Comprehensive visual inspection per UK standards',
        instructions: [
          'Check consumer unit compliance',
          'Inspect earthing arrangements',
          'Verify cable identification',
          'Check RCD provision'
        ],
        category: 'visual-inspection',
        estimatedTime: '60 minutes',
        order: '1'
      },
      {
        id: 'uk-safe-isolation',
        title: 'UK Safe Isolation',
        description: 'Safe isolation per UK procedures',
        instructions: [
          'Follow HSE GS38 requirements',
          'Use approved voltage indicators',
          'Implement lock-off procedures',
          'Apply warning notices'
        ],
        category: 'safe-isolation',
        estimatedTime: '20 minutes',
        order: '2'
      },
      {
        id: 'uk-continuity',
        title: 'UK Continuity Testing',
        description: 'Continuity testing per BS 7671',
        instructions: [
          'Test protective conductor continuity',
          'Test ring final circuit continuity',
          'Verify main earthing conductor',
          'Check supplementary bonding'
        ],
        category: 'continuity',
        estimatedTime: '90 minutes',
        acceptableLimits: {
          max: 1.67,
          unit: 'Ω'
        },
        order: '3'
      }
    ]
  }
];
