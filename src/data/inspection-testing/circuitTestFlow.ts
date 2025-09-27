
import { CircuitTestFlow } from '@/types/circuit-testing';
import { allCircuitTestSteps } from './circuitTestingSteps';

export const comprehensiveCircuitTestFlow: CircuitTestFlow = {
  id: 'comprehensive-circuit-testing',
  title: 'Comprehensive Circuit Testing',
  description: 'Complete circuit testing procedure following BS 7671 requirements',
  type: 'comprehensive-circuit-testing',
  steps: allCircuitTestSteps,
  estimatedDuration: '2-3 hours',
  difficulty: 'intermediate',
  regulatoryStandards: [
    'BS 7671:2018+A3:2024',
    'IET Guidance Note 3'
  ],
  safetyRequirements: [
    'Proper PPE must be worn',
    'Safe isolation procedures must be followed',
    'Approved test equipment only'
  ]
};
