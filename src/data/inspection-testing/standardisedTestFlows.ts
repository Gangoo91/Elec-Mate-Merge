
import { TestFlow } from '@/types/inspection-testing';
import { 
  enhancedSafeIsolationSteps, 
  enhancedContinuitySteps, 
  enhancedInsulationSteps,
  enhancedZsTestingSteps,
  enhancedRCDTestingSteps,
  enhancedPolaritySteps
} from './enhancedComprehensiveTestSteps';

export const standardisedTestFlows: TestFlow[] = [
  {
    id: 'comprehensive-testing-professional-enhanced',
    name: 'Professional Installation Testing Suite (BS 7671:2018+A2:2022)',
    type: 'all-tests',
    description: 'Complete BS 7671 compliant testing procedure with detailed step-by-step guidance for professional electricians and advanced apprentices. Includes all required tests with standardised time estimates.',
    difficulty: 'advanced',
    isComprehensive: true,
    prerequisites: [
      '18th Edition qualification (BS 7671:2018+A2:2022) or equivalent',
      'Calibrated multifunction test equipment with current certification',
      'Current installation drawings, certificates, and design calculations',
      'GS 38 compliant test probes, leads, and proving units',
      'Comprehensive understanding of BS 7671 testing requirements and procedures'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 Chapter 61 (Initial verification) & Chapter 62 (Periodic inspection)',
      'IET Guidance Note 3 - Inspection & Testing (8th Edition)',
      'GS 38 - Electrical test equipment for use by electricians',
      'BS 7909 - Code of practice for temporary electrical systems for entertainment and related purposes'
    ],
    steps: [
      {
        id: 'documentation-review-enhanced',
        title: 'Pre-Testing Documentation Review and Risk Assessment',
        description: 'Comprehensive review of installation documentation, previous test results, and identification of testing requirements and potential hazards',
        instructions: [
          'Review electrical installation certificate (EIC) and design calculations for compliance verification',
          'Study circuit schedules, protective device ratings, and discrimination requirements',
          'Check previous test results, inspection reports, and any remedial work certificates',
          'Verify test equipment calibration certificates are current and equipment is suitable',
          'Confirm scope of testing required for full BS 7671 compliance verification',
          'Identify any special circuits, equipment, or installations requiring specific attention',
          'Plan testing sequence to minimise disruption and ensure systematic coverage',
          'Conduct risk assessment for testing activities and identify required safety measures',
          'Identify and document any limitations or restrictions affecting the testing scope',
          'Prepare testing documentation and record sheets for systematic data collection'
        ],
        expectedResult: 'Complete understanding of installation, testing requirements, and safety considerations established with documented testing plan',
        safetyNotes: [
          'Outdated or inaccurate documentation may not reflect current installation condition',
          'Always verify actual installation matches drawings and certificates before proceeding',
          'Risk assessment must consider all potential hazards during testing activities'
        ],
        tools: ['Installation certificates', 'Circuit schedules', 'BS 7671:2018+A2:2022', 'Test equipment certificates', 'Risk assessment forms'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'visual-inspection-comprehensive-enhanced',
        title: 'Detailed Visual Inspection (BS 7671 Section 611)',
        description: 'Systematic visual inspection covering all aspects required by BS 7671 with enhanced attention to current regulatory requirements',
        instructions: [
          'Inspect consumer unit/distribution board for BS EN 61439 compliance and general condition',
          'Check cable installation methods, support systems, and compliance with current regulations',
          'Verify IP ratings are appropriate for environmental conditions and meet current standards',
          'Examine earthing and bonding arrangements throughout installation for compliance',
          'Check warning labels, charts, schedules, and identification are present and legible',
          'Inspect accessory mounting, fixing compliance, and general workmanship standards',
          'Verify protective device ratings match design requirements and provide adequate protection',
          'Check for unauthorised modifications, non-compliant work, or potential safety hazards',
          'Inspect cable routes for mechanical protection and compliance with installation methods',
          'Verify special locations comply with relevant sections of BS 7671 (e.g., bathrooms, outdoor installations)',
          'Check RCD and RCBO markings for type identification and suitability',
          'Document any defects, non-compliances, or items requiring further investigation'
        ],
        expectedResult: 'Visual inspection confirms installation generally complies with BS 7671 requirements with any defects documented',
        safetyNotes: [
          'Do not remove covers from live equipment during visual inspection',
          'Report any immediately dangerous conditions or C1/C2 defects found',
          'Some defects may only become apparent during subsequent testing'
        ],
        tools: ['Torch/inspection light', 'Measuring equipment', 'BS 7671:2018+A2:2022', 'Digital camera', 'Inspection checklist'],
        isRequired: true,
        estimatedTime: 30
      },
      ...enhancedSafeIsolationSteps,
      ...enhancedContinuitySteps,
      ...enhancedInsulationSteps,
      ...enhancedPolaritySteps,
      ...enhancedZsTestingSteps,
      ...enhancedRCDTestingSteps,
      {
        id: 'functional-testing-comprehensive-enhanced',
        title: 'Comprehensive Functional Testing and Operation Verification',
        description: 'Test operation of all electrical equipment, protective systems, and special installations to ensure correct and safe operation',
        instructions: [
          'Test all lighting circuits and switching arrangements systematically including emergency lighting',
          'Verify correct operation of all socket outlets using appropriate socket testers',
          'Test fixed equipment connections and verify correct operation where safely possible',
          'Check operation of emergency lighting systems and verify minimum duration compliance',
          'Test fire alarm systems if within scope of electrical work and suitably qualified',
          'Verify operation of any special installations (EV charging points, garden equipment, etc.)',
          'Test interlocks, safety systems, and emergency stop arrangements for correct operation',
          'Check operation of automatic systems (heating controls, programmers, time switches)',
          'Test RCD test buttons for mechanical operation and compare with electronic test results',
          'Verify correct operation of any renewable energy systems or battery storage',
          'Document any equipment not operating correctly or requiring attention',
          'Test any smart home systems or home automation equipment for basic functionality'
        ],
        expectedResult: 'All electrical equipment and systems demonstrated to operate correctly and safely',
        safetyNotes: [
          'Ensure personnel safety when testing moving equipment or machinery',
          'Follow manufacturer instructions for specialised equipment testing',
          'Report any safety system malfunctions or operational defects immediately'
        ],
        tools: ['Socket tester', 'Proving unit', 'Equipment operation manuals', 'Test record sheets', 'Digital camera'],
        isRequired: true,
        estimatedTime: 35
      },
      {
        id: 'test-results-analysis-enhanced',
        title: 'Test Results Analysis and BS 7671 Compliance Verification',
        description: 'Comprehensive analysis of all test results against BS 7671 requirements with compliance determination and certification',
        instructions: [
          'Compile all test results and compare systematically with BS 7671 maximum/minimum limits',
          'Calculate maximum permissible Zs values for each circuit and verify compliance',
          'Check insulation resistance values meet minimum requirements for installation voltage',
          'Verify RCD operation times comply with BS 7671 requirements for all test conditions',
          'Analyse continuity test results for circuit integrity and connection quality',
          'Apply temperature correction factors where necessary for final compliance assessment',
          'Identify any results requiring investigation, remedial work, or further testing',
          'Prepare detailed recommendations for any non-compliances or improvement opportunities',
          'Complete appropriate electrical installation certificate or test certificate',
          'Prepare summary report with key findings and compliance status',
          'Calculate overall installation condition and provide appropriate certification',
          'Prepare any necessary improvement notices or recommendations for client consideration'
        ],
        expectedResult: 'Complete test results analysis with definitive compliance status and appropriate certification issued',
        safetyNotes: [
          'Do not certify installation if any C1 or C2 defects exist',
          'Ensure all test results are within acceptable limits before certification',
          'Client must be informed of any safety-critical issues requiring immediate attention'
        ],
        tools: ['Scientific calculator', 'BS 7671 tables and appendices', 'Certificate templates', 'Analysis software'],
        isRequired: true,
        estimatedTime: 25
      }
    ]
  },
  {
    id: 'domestic-installation-testing',
    name: 'Domestic Installation Testing (Standard Procedure)',
    type: 'all-tests',
    description: 'Streamlined testing procedure for typical domestic installations with focus on common circuits and safety requirements',
    difficulty: 'intermediate',
    prerequisites: [
      '18th Edition qualification or supervised competent person',
      'Calibrated domestic testing equipment',
      'Understanding of domestic installation requirements'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 - Domestic installations',
      'IET Guidance Note 3 - Domestic testing procedures'
    ],
    steps: [
      {
        id: 'domestic-visual-inspection',
        title: 'Domestic Installation Visual Inspection',
        description: 'Visual inspection focused on common domestic installation requirements and safety concerns',
        instructions: [
          'Inspect consumer unit for appropriate type and condition',
          'Check main switch operation and RCD functionality',
          'Verify circuit labelling is clear and accurate',
          'Check socket outlets for damage and correct mounting',
          'Inspect light fittings and switches for safety and condition',
          'Verify earthing and bonding to gas and water services',
          'Check bathroom installations for zone compliance',
          'Inspect outdoor installations and garden equipment connections'
        ],
        expectedResult: 'Domestic installation visually inspected with any defects identified',
        safetyNotes: [
          'Pay special attention to DIY modifications',
          'Check for use of inappropriate equipment in domestic settings'
        ],
        tools: ['Inspection torch', 'Basic measuring tools', 'BS 7671'],
        isRequired: true,
        estimatedTime: 20
      }
      // Additional domestic-specific steps would be added here
    ]
  },
  {
    id: 'commercial-installation-testing',
    name: 'Commercial Installation Testing (Professional Procedure)',
    type: 'all-tests',
    description: 'Comprehensive testing procedure for commercial installations including three-phase systems and specialist equipment',
    difficulty: 'advanced',
    prerequisites: [
      '18th Edition qualification with commercial experience',
      'Three-phase testing equipment capability',
      'Understanding of commercial installation requirements'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 - Commercial installations',
      'BS 7909 - Temporary electrical systems',
      'Various British Standards for specialist equipment'
    ],
    steps: [
      {
        id: 'commercial-documentation-review',
        title: 'Commercial Installation Documentation Review',
        description: 'Review complex commercial installation documentation and testing requirements',
        instructions: [
          'Review detailed electrical drawings and specifications',
          'Check equipment schedules and technical data sheets',
          'Verify compliance with building regulations and standards',
          'Check fire alarm and emergency lighting certificates',
          'Review any specialist system documentation',
          'Identify testing limitations and access restrictions'
        ],
        expectedResult: 'Commercial installation requirements fully understood with testing plan established',
        safetyNotes: [
          'Consider business continuity requirements during testing',
          'Identify any critical systems requiring special consideration'
        ],
        tools: ['Complex installation drawings', 'Equipment manuals', 'Multiple standards'],
        isRequired: true,
        estimatedTime: 25
      }
      // Additional commercial-specific steps would be added here
    ]
  }
];
