
import { TestFlow } from '@/types/inspection-testing';
import { allVisualInspectionSteps } from './visualInspectionSteps';
import { comprehensiveTestingSequence } from './enhancedTestingSequence';

export const eicrTestFlow: TestFlow = {
  id: 'eicr-complete-process',
  title: 'EICR Complete Process',
  description: 'Complete Electrical Installation Condition Report process following BS 7671:2018+A2:2022',
  type: 'eicr',
  steps: [
    ...allVisualInspectionSteps,
    ...comprehensiveTestingSequence
  ],
  estimatedDuration: '4-6 hours',
  difficulty: 'advanced',
  isComprehensive: true,
  prerequisites: [
    'Valid electrical qualification (18th Edition BS 7671)',
    'Experience with EICR procedures',
    'Multifunction test equipment',
    'Understanding of fault classification (C1, C2, C3, FI)'
  ],
  regulatoryStandards: [
    'BS 7671:2018+A2:2022',
    'IET Guidance Note 3: Inspection & Testing',
    'IET Code of Practice for In-service Inspection & Testing',
    'HSE GS38: Electrical Test Equipment'
  ],
  safetyRequirements: [
    'Appropriate PPE must be worn',
    'Safe isolation procedures mandatory',
    'Calibrated test equipment required',
    'Emergency contact details available'
  ]
};

export const eicrVisualInspectionFlow: TestFlow = {
  id: 'eicr-visual-inspection',
  title: 'EICR Visual Inspection',
  description: 'Visual inspection component of EICR process',
  type: 'eicr',
  steps: allVisualInspectionSteps,
  estimatedDuration: '2-3 hours',
  difficulty: 'intermediate',
  prerequisites: [
    'Understanding of BS 7671 visual inspection requirements',
    'Knowledge of fault classification'
  ],
  regulatoryStandards: [
    'BS 7671:2018+A2:2022 Chapter 61'
  ],
  safetyRequirements: [
    'No live working during visual inspection'
  ]
};

export const eicrTestingOnlyFlow: TestFlow = {
  id: 'eicr-testing-only',
  title: 'EICR Testing Procedures',
  description: 'Testing and measurement procedures for EICR',
  type: 'eicr',
  steps: comprehensiveTestingSequence,
  estimatedDuration: '3-4 hours',
  difficulty: 'advanced',
  prerequisites: [
    'Completed visual inspection',
    'Multifunction test equipment',
    'Safe isolation completed'
  ],
  regulatoryStandards: [
    'BS 7671:2018+A2:2022 Chapter 64'
  ],
  safetyRequirements: [
    'Safe isolation verified',
    'Calibrated test equipment'
  ]
};
