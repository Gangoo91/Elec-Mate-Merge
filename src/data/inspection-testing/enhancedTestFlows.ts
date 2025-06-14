
import { TestFlow } from '@/types/inspection-testing';
import {
  enhancedSafeIsolationSteps,
  enhancedContinuitySteps,
  enhancedInsulationSteps,
  enhancedZsTestingSteps,
  enhancedRCDTestingSteps,
  enhancedPolaritySteps,
  allEnhancedTestSteps
} from './enhancedComprehensiveTestSteps';

export const enhancedTestFlows: TestFlow[] = [
  {
    id: 'enhanced-comprehensive-testing',
    title: 'Enhanced Comprehensive Testing',
    description: 'Complete electrical testing suite with enhanced procedures and documentation following BS 7671:2018+A2:2022 requirements',
    type: 'comprehensive',
    difficulty: 'advanced',
    isComprehensive: true,
    estimatedDuration: '6-8 hours',
    prerequisites: [
      'Valid electrical qualification (18th Edition)',
      'Experience with multifunction testers',
      'Understanding of BS 7671 requirements',
      'Safe isolation procedures training'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022',
      'IET Guidance Note 3',
      'IET Code of Practice',
      'BS EN 61557 series'
    ],
    steps: allEnhancedTestSteps
  },
  {
    id: 'enhanced-earth-fault-loop',
    title: 'Enhanced Earth Fault Loop Testing',
    description: 'Detailed earth fault loop impedance testing with comprehensive documentation',
    type: 'earth-fault-loop',
    difficulty: 'intermediate',
    estimatedDuration: '1-2 hours',
    prerequisites: [
      'Understanding of earth fault loop principles',
      'Zs tester operation knowledge'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 Chapter 61',
      'IET Guidance Note 3 Section 2.7'
    ],
    steps: enhancedZsTestingSteps
  },
  {
    id: 'enhanced-insulation-resistance',
    title: 'Enhanced Insulation Resistance Testing',
    description: 'Comprehensive insulation resistance testing with detailed analysis',
    type: 'insulation-resistance',
    difficulty: 'intermediate',
    estimatedDuration: '1.5-2 hours',
    prerequisites: [
      'Insulation resistance tester operation',
      'Understanding of test voltages'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 Regulation 612.3',
      'IET Guidance Note 3 Section 2.6'
    ],
    steps: enhancedInsulationSteps
  },
  {
    id: 'enhanced-rcd-testing',
    title: 'Enhanced RCD Testing',
    description: 'Comprehensive RCD testing including timing and sensitivity analysis',
    type: 'rcd-test',
    difficulty: 'intermediate',
    estimatedDuration: '45 minutes - 1 hour',
    prerequisites: [
      'RCD tester operation knowledge',
      'Understanding of RCD principles'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 Regulation 612.13',
      'IET Guidance Note 3 Section 2.8'
    ],
    steps: enhancedRCDTestingSteps
  },
  {
    id: 'enhanced-continuity-testing',
    title: 'Enhanced Continuity Testing',
    description: 'Detailed continuity testing including ring circuits and protective conductors',
    type: 'continuity',
    difficulty: 'intermediate',
    estimatedDuration: '1-1.5 hours',
    prerequisites: [
      'Continuity tester operation',
      'Understanding of circuit arrangements'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 Regulation 612.2',
      'IET Guidance Note 3 Section 2.5'
    ],
    steps: enhancedContinuitySteps
  },
  {
    id: 'enhanced-safe-isolation',
    title: 'Enhanced Safe Isolation Procedures',
    description: 'Comprehensive safe isolation procedures with detailed safety protocols',
    type: 'safe-isolation',
    difficulty: 'beginner',
    estimatedDuration: '30-45 minutes',
    prerequisites: [
      'Basic electrical safety knowledge',
      'Approved voltage tester operation'
    ],
    regulatoryStandards: [
      'HSE GS38',
      'BS 7671:2018+A2:2022 Section 462',
      'IET Code of Practice'
    ],
    steps: enhancedSafeIsolationSteps
  }
];
