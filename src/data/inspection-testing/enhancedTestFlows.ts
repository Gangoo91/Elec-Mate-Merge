
import { TestFlow } from '@/types/inspection-testing';
import { 
  enhancedSafeIsolationSteps, 
  enhancedContinuitySteps, 
  enhancedInsulationSteps,
  enhancedZsTestingSteps,
  enhancedRCDTestingSteps,
  enhancedPolaritySteps
} from './comprehensiveTestSteps';

export const enhancedTestFlows: TestFlow[] = [
  {
    id: 'comprehensive-testing-professional',
    name: 'Professional Installation Testing Suite (BS 7671:2018)',
    type: 'all-tests',
    description: 'Complete BS 7671 compliant testing procedure with detailed step-by-step guidance for professional electricians and advanced apprentices',
    difficulty: 'advanced',
    isComprehensive: true,
    prerequisites: [
      '18th Edition qualification or equivalent',
      'Calibrated multifunction test equipment',
      'Current installation drawings and certificates',
      'GS 38 compliant test probes and leads',
      'Understanding of BS 7671 test requirements'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 Chapter 61 & 62',
      'IET Guidance Note 3 - Inspection & Testing',
      'GS 38 - Electrical test equipment for use by electricians',
      'BS 7909 - Code of practice for temporary electrical systems'
    ],
    steps: [
      {
        id: 'documentation-review',
        title: 'Pre-Testing Documentation Review',
        description: 'Comprehensive review of installation documentation and testing requirements',
        instructions: [
          'Review electrical installation certificate and design calculations',
          'Study circuit schedules and protective device ratings',
          'Check previous test results and inspection reports',
          'Verify test equipment calibration certificates are current',
          'Confirm scope of testing required for compliance',
          'Identify any special circuits or equipment requiring attention',
          'Plan testing sequence to minimize disruption and ensure safety'
        ],
        expectedResult: 'Complete understanding of installation and testing requirements established',
        safetyNotes: [
          'Outdated documentation may not reflect current installation',
          'Verify actual installation matches drawings before testing'
        ],
        tools: ['Installation certificates', 'Circuit schedules', 'BS 7671', 'Test equipment certificates'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'visual-inspection-comprehensive',
        title: 'Detailed Visual Inspection (BS 7671 Section 611)',
        description: 'Systematic visual inspection covering all aspects required by BS 7671',
        instructions: [
          'Inspect consumer unit/distribution board for compliance and condition',
          'Check cable installation methods and support systems',
          'Verify IP ratings appropriate for environmental conditions',
          'Examine earthing and bonding arrangements throughout installation',
          'Check warning labels, charts, and identification are present',
          'Inspect accessory mounting and fixing compliance',
          'Verify protective device ratings match design requirements',
          'Check for unauthorized modifications or non-compliant work'
        ],
        expectedResult: 'Visual inspection confirms installation complies with BS 7671 requirements',
        safetyNotes: [
          'Do not remove covers on live equipment during inspection',
          'Report any immediately dangerous conditions found'
        ],
        tools: ['Torch', 'Measuring equipment', 'BS 7671', 'Inspection checklist'],
        isRequired: true,
        estimatedTime: 25
      },
      ...enhancedSafeIsolationSteps,
      ...enhancedContinuitySteps,
      ...enhancedInsulationSteps,
      ...enhancedPolaritySteps,
      ...enhancedZsTestingSteps,
      ...enhancedRCDTestingSteps,
      {
        id: 'functional-testing-comprehensive',
        title: 'Comprehensive Functional Testing',
        description: 'Test operation of all electrical equipment and protective systems',
        instructions: [
          'Test all lighting circuits and switching arrangements systematically',
          'Verify correct operation of all socket outlets',
          'Test fixed equipment and appliance connections',
          'Check operation of emergency lighting systems and duration',
          'Test fire alarm systems if within scope of electrical work',
          'Verify operation of any special installations (EV charging, etc.)',
          'Test interlocks and safety systems for correct operation',
          'Document any equipment not operating correctly'
        ],
        expectedResult: 'All electrical equipment and systems operating correctly and safely',
        safetyNotes: [
          'Ensure personnel safety when testing moving equipment',
          'Follow manufacturer instructions for specialized equipment',
          'Report any safety system malfunctions immediately'
        ],
        tools: ['Socket tester', 'Proving unit', 'Equipment manuals', 'Test record sheets'],
        isRequired: true,
        estimatedTime: 30
      },
      {
        id: 'test-results-analysis',
        title: 'Test Results Analysis and Compliance Verification',
        description: 'Comprehensive analysis of all test results against BS 7671 requirements',
        instructions: [
          'Compile all test results and compare with BS 7671 limits',
          'Calculate maximum Zs values and verify compliance',
          'Check insulation resistance values meet minimum requirements',
          'Verify RCD operation times comply with BS 7671',
          'Analyze continuity test results for circuit integrity',
          'Identify any results requiring investigation or remedial work',
          'Prepare recommendations for any non-compliances found',
          'Complete electrical installation certificate or test certificate'
        ],
        expectedResult: 'Complete test results analysis with compliance status determined',
        safetyNotes: [
          'Do not certify installation if any critical non-compliance exists',
          'Ensure all test results are within acceptable limits'
        ],
        tools: ['Calculator', 'BS 7671 tables', 'Test certificates', 'Analysis software'],
        isRequired: true,
        estimatedTime: 20
      }
    ]
  },
  {
    id: 'zs-testing-detailed',
    name: 'Earth Fault Loop Impedance (Zs) Testing - Complete Procedure',
    type: 'earth-fault-loop',
    description: 'Comprehensive Zs testing procedure covering Ze measurement, circuit testing, and compliance verification',
    difficulty: 'intermediate',
    prerequisites: [
      'Understanding of earthing systems (TN-S, TN-C-S, TT)',
      'Calibrated earth fault loop impedance tester',
      'Knowledge of BS 7671 maximum Zs values',
      'Circuit schedules and protective device data'
    ],
    regulatoryStandards: [
      'BS 7671:2018 Section 612.7',
      'BS 7671 Appendix 3 - Maximum Zs values',
      'IET Guidance Note 3 - Inspection & Testing'
    ],
    steps: enhancedZsTestingSteps
  },
  {
    id: 'insulation-resistance-advanced',
    name: 'Advanced Insulation Resistance Testing',
    type: 'insulation-resistance',
    description: 'Detailed insulation resistance testing with equipment preparation and systematic testing approach',
    difficulty: 'intermediate',
    prerequisites: [
      'Insulation resistance tester (500V/1000V capability)',
      'Knowledge of equipment disconnection requirements',
      'Understanding of minimum insulation values'
    ],
    regulatoryStandards: [
      'BS 7671:2018 Section 612.3',
      'BS 7671 Table 61 - Minimum insulation resistance values'
    ],
    steps: enhancedInsulationSteps
  },
  {
    id: 'rcd-testing-complete',
    name: 'Comprehensive RCD Testing Procedure',
    type: 'rcd-test',
    description: 'Complete RCD testing including sensitivity, trip time, and ramp testing',
    difficulty: 'intermediate',
    prerequisites: [
      'RCD tester with multiple test functions',
      'Understanding of RCD types and ratings',
      'Knowledge of BS 7671 RCD requirements'
    ],
    regulatoryStandards: [
      'BS 7671:2018 Section 612.8',
      'BS EN 61008/BS EN 61009 - RCD standards'
    ],
    steps: enhancedRCDTestingSteps
  },
  {
    id: 'continuity-testing-advanced',
    name: 'Advanced Continuity Testing (Including Ring Circuits)',
    type: 'continuity',
    description: 'Comprehensive continuity testing covering protective conductors, bonding, and ring circuit verification',
    difficulty: 'intermediate',
    prerequisites: [
      'Low resistance ohmmeter',
      'Understanding of R1+R2 calculations',
      'Knowledge of ring circuit testing methods'
    ],
    regulatoryStandards: [
      'BS 7671:2018 Section 612.2',
      'IET Guidance Note 3 - Ring circuit testing'
    ],
    steps: enhancedContinuitySteps
  },
  {
    id: 'polarity-testing-complete',
    name: 'Complete Polarity Testing Procedure',
    type: 'polarity',
    description: 'Systematic polarity testing for all circuits, switches, and accessories',
    difficulty: 'beginner',
    prerequisites: [
      'Continuity tester or socket tester',
      'Understanding of correct polarity requirements',
      'Knowledge of single-pole device operation'
    ],
    regulatoryStandards: [
      'BS 7671:2018 Section 612.6',
      'BS 7671 Section 132.14 - Single-pole devices'
    ],
    steps: enhancedPolaritySteps
  },
  {
    id: 'safe-isolation-enhanced',
    name: 'Enhanced Safe Isolation Procedure (GS 38 Compliant)',
    type: 'safe-isolation',
    description: 'Comprehensive safe isolation covering single-phase, three-phase, and complex installations',
    difficulty: 'beginner',
    prerequisites: [
      'GS 38 compliant voltage indicator',
      'Proving unit for test equipment verification',
      'Lock-off devices and isolation procedures'
    ],
    regulatoryStandards: [
      'GS 38 - Electrical test equipment for use by electricians',
      'BS 7671:2018 Section 462 - Isolation and switching'
    ],
    steps: enhancedSafeIsolationSteps
  }
];
