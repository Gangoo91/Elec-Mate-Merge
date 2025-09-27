
import { TestFlow } from '@/types/inspection-testing';
import { allVisualInspectionSteps } from './visualInspectionSteps';
import { comprehensiveTestingSequence } from './enhancedTestingSequence';

export const enhancedComprehensiveFlow: TestFlow = {
  id: 'enhanced-comprehensive-inspection-testing',
  title: 'Enhanced Comprehensive Inspection & Testing',
  description: 'Complete electrical installation inspection and testing following BS 7671:2018+A3:2024 requirements',
  type: 'comprehensive',
  steps: [
    ...allVisualInspectionSteps,
    ...comprehensiveTestingSequence
  ],
  estimatedDuration: '6-8 hours',
  difficulty: 'advanced',
  isComprehensive: true,
  prerequisites: [
    'Valid electrical qualification (18th Edition BS 7671)',
    'Experience with multifunction test equipment',
    'Understanding of safe isolation procedures',
    'Knowledge of visual inspection requirements'
  ],
  regulatoryStandards: [
    'BS 7671:2018+A3:2024',
    'IET Guidance Note 3: Inspection & Testing',
    'IET Code of Practice',
    'HSE GS38: Electrical Test Equipment for Use by Electricians'
  ],
  safetyRequirements: [
    'Appropriate PPE must be worn throughout',
    'Safe isolation procedures must be followed',
    'Test equipment must be calibrated and proved',
    'Emergency procedures must be understood'
  ]
};

export const visualInspectionOnlyFlow: TestFlow = {
  id: 'visual-inspection-only',
  title: 'Visual Inspection Only',
  description: 'Comprehensive visual inspection of electrical installation',
  type: 'all-tests',
  steps: allVisualInspectionSteps,
  estimatedDuration: '2-3 hours',
  difficulty: 'intermediate',
  prerequisites: [
    'Understanding of BS 7671 requirements',
    'Knowledge of electrical installation methods'
  ],
  regulatoryStandards: [
    'BS 7671:2018+A3:2024 Chapter 61',
    'IET Guidance Note 3 Section 3'
  ],
  safetyRequirements: [
    'No live working during visual inspection',
    'Report safety concerns immediately'
  ]
};
