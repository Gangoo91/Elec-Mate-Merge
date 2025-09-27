
import { TestFlow } from '@/types/inspection-testing';
import { comprehensiveTestSteps } from './comprehensiveTestSteps';

export const comprehensiveTestFlow: TestFlow = {
  id: 'comprehensive-testing',
  title: 'Comprehensive Electrical Testing',
  description: 'Complete electrical installation testing following BS 7671 requirements',
  type: 'comprehensive',
  steps: comprehensiveTestSteps,
  estimatedDuration: '4-6 hours',
  difficulty: 'intermediate',
  isComprehensive: true,
  regulatoryStandards: [
    'BS 7671:2018+A3:2024',
    'IET Guidance Note 3',
    'IET Code of Practice'
  ],
  safetyRequirements: [
    'Safe isolation procedures must be followed',
    'Appropriate PPE must be worn',
    'Test equipment must be calibrated',
    'Installation must be safely re-energised'
  ]
};
