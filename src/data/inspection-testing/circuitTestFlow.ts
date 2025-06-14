
import { CircuitTestFlow } from '@/types/circuit-testing';
import { allCircuitTestSteps } from './circuitTestingSteps';

export const comprehensiveCircuitTestFlow: CircuitTestFlow = {
  id: 'comprehensive-circuit-testing',
  title: 'Comprehensive Circuit Testing',
  description: 'Complete circuit testing sequence following BS 7671 requirements, including safe isolation, continuity, insulation resistance, earth fault loop impedance, RCD testing, polarity verification, and functional testing.',
  type: 'comprehensive-circuit-testing',
  steps: allCircuitTestSteps,
  estimatedDuration: '3-4 hours',
  difficulty: 'intermediate',
  regulatoryStandards: [
    'BS 7671:2018+A2:2022',
    'IET Guidance Note 3',
    'IET Code of Practice'
  ],
  safetyRequirements: [
    'Safe isolation procedures must be followed',
    'Appropriate PPE must be worn',
    'Test equipment must be calibrated',
    'Isolation must be maintained throughout dead testing',
    'Installation must be safely re-energised for live testing'
  ]
};
