
import { TestFlow } from '@/types/inspection-testing';

export const comprehensiveTestFlow: TestFlow = {
  id: 'comprehensive-test-flow',
  name: 'Comprehensive Electrical Installation Testing',
  type: 'all-tests',
  description: 'Complete BS 7671 compliant testing sequence from safe isolation through all required tests',
  difficulty: 'advanced',
  isComprehensive: true,
  steps: [
    // Safe Isolation Selection Step
    {
      id: 'safe-isolation-selection',
      title: 'Supply Type Identification',
      description: 'Identify the electrical supply type to determine appropriate isolation procedure',
      instructions: [
        'Examine the distribution board or consumer unit to identify supply type',
        'Count the number of incoming supply conductors',
        'Check the voltage markings on the main switch or incoming supply',
        'Verify if the supply is single-phase (230V L-N-E) or three-phase (400V L1-L2-L3-N-E)',
        'Note any special supply arrangements (IT systems, DC supplies, etc.)',
        'Document the supply characteristics for the isolation procedure'
      ],
      expectedResult: 'Supply type correctly identified and documented',
      safetyNotes: [
        'Never assume supply type - always verify before proceeding',
        'If in doubt about supply type, treat as three-phase for maximum safety',
        'Be aware of multiple supply sources in complex installations'
      ],
      tools: ['Voltage indicator', 'Circuit diagrams', 'Supply documentation'],
      isRequired: true,
      estimatedTime: 5
    },

    // Single Phase Safe Isolation
    {
      id: 'safe-isolation-single-phase',
      title: 'Safe Isolation Procedure (Single Phase)',
      description: 'Complete safe isolation procedure for single-phase electrical installations',
      instructions: [
        'Obtain written permission from the person in charge',
        'Notify all relevant personnel affected by the isolation',
        'Identify the circuit to be isolated using circuit schedules',
        'Switch OFF the appropriate MCB or remove fuse',
        'Apply approved lock-off device with personal safety lock',
        'Attach danger/warning notices to locked-off isolation point',
        'Prove voltage tester on known live source',
        'Test dead between Line-Neutral, Line-Earth, and Neutral-Earth',
        'Re-prove voltage tester on known live source',
        'Apply additional safety precautions as required'
      ],
      expectedResult: 'Circuit safely isolated and proved dead with all safety measures in place',
      safetyNotes: [
        'NEVER proceed without proper authorization',
        'Only the person who applied the lock should remove it',
        'If tester fails proving test, obtain alternative tester',
        'CRITICAL: Re-proving the tester is mandatory'
      ],
      tools: ['Personal safety locks', 'Lock-off devices', 'Danger notices', 'Approved voltage tester (GS 38)', 'Known live source'],
      isRequired: true,
      estimatedTime: 25
    },

    // Three Phase Safe Isolation
    {
      id: 'safe-isolation-three-phase',
      title: 'Safe Isolation Procedure (Three Phase)',
      description: 'Complete safe isolation procedure for three-phase electrical installations',
      instructions: [
        'Obtain written permission from the person in charge',
        'Notify all relevant personnel affected by the isolation',
        'Identify all circuits to be isolated using circuit schedules',
        'Switch OFF all three-phase MCBs or remove all fuses',
        'Ensure ALL phases are isolated (L1, L2, L3, N, E)',
        'Apply approved lock-off devices to all isolation points',
        'Attach danger/warning notices to all locked-off points',
        'Prove voltage tester on known live source',
        'Test dead between all phase combinations (L1-L2, L1-L3, L2-L3)',
        'Test all phases to neutral and earth (L1-N, L2-N, L3-N, L1-E, L2-E, L3-E)',
        'Test between Neutral and Earth',
        'Re-prove voltage tester on known live source',
        'Apply additional safety precautions as required'
      ],
      expectedResult: 'All phases safely isolated and proved dead with comprehensive safety measures',
      safetyNotes: [
        'NEVER proceed without proper authorization',
        'ALL phases must be isolated - missing one phase can be fatal',
        'Test ALL possible conductor combinations systematically',
        'CRITICAL: Re-proving the tester is mandatory after all tests'
      ],
      tools: ['Personal safety locks', 'Lock-off devices', 'Danger notices', 'Approved voltage tester (GS 38)', 'Known live source'],
      isRequired: true,
      estimatedTime: 35
    },

    // Visual Inspection
    {
      id: 'visual-inspection-comprehensive',
      title: 'Visual Inspection of Installation',
      description: 'Thorough visual inspection of the electrical installation in accordance with BS 7671',
      instructions: [
        'Check all electrical connections are secure and properly terminated',
        'Verify cable routes and support methods comply with regulations',
        'Inspect for any visible damage to cables, accessories, or equipment',
        'Check IP ratings of equipment match environmental conditions',
        'Verify correct identification and labeling of circuits',
        'Confirm protective devices are correctly rated for circuits',
        'Check earthing and bonding arrangements are complete',
        'Inspect accessibility of equipment for operation and maintenance',
        'Verify compliance with special location requirements if applicable',
        'Document any defects or non-compliances found'
      ],
      expectedResult: 'Installation visually complies with BS 7671 requirements with no safety defects',
      safetyNotes: [
        'Circuit must remain isolated throughout inspection',
        'Do not energize any circuits until all defects are rectified',
        'Mark any dangerous defects for immediate attention'
      ],
      tools: ['Torch/inspection light', 'BS 7671', 'Inspection checklist', 'Camera for documentation'],
      isRequired: true,
      estimatedTime: 30
    },

    // Continuity Testing
    {
      id: 'continuity-testing-comprehensive',
      title: 'Continuity of Protective Conductors',
      description: 'Test continuity of circuit protective conductors, main and supplementary bonding',
      instructions: [
        'Select appropriate low resistance ohmmeter (4-24mA test current)',
        'Temporarily link Line and CPC at consumer unit',
        'Test between linked conductors and CPC at each outlet',
        'Record R1+R2 values at each point',
        'Test main equipotential bonding conductors',
        'Test supplementary bonding conductors where installed',
        'Calculate expected values and compare with measured results',
        'Apply temperature correction factors if necessary'
      ],
      expectedResult: 'All protective conductor continuity within BS 7671 limits',
      safetyNotes: [
        'Circuit must remain isolated and locked off',
        'Remove link after testing before energizing',
        'Ensure test current does not exceed equipment ratings'
      ],
      tools: ['Low resistance ohmmeter', 'Test leads', 'Temporary links', 'BS 7671 Table 62'],
      isRequired: true,
      estimatedTime: 20
    },

    // Insulation Resistance
    {
      id: 'insulation-resistance-comprehensive',
      title: 'Insulation Resistance Testing',
      description: 'Test insulation resistance between conductors and earth',
      instructions: [
        'Disconnect or protect all electronic equipment and surge arresters',
        'Ensure all switches and controls are in ON position',
        'Select appropriate test voltage (250V, 500V, or 1000V)',
        'Test between Line conductors and Earth',
        'Test between Neutral conductor and Earth',
        'Test between Line and Neutral conductors',
        'Apply test voltage for minimum 60 seconds',
        'Record stabilized insulation resistance values',
        'Apply temperature correction if ambient temperature outside 10-35°C'
      ],
      expectedResult: 'Minimum 1MΩ insulation resistance (or as specified in BS 7671 Table 61)',
      safetyNotes: [
        'Protect sensitive electronic equipment before testing',
        'Allow capacitive discharge before disconnecting test leads',
        'Ensure test voltage is suitable for circuit voltage'
      ],
      tools: ['Insulation resistance tester', 'Test leads', 'Warning notices', 'BS 7671 Table 61'],
      isRequired: true,
      estimatedTime: 25
    },

    // Polarity Testing
    {
      id: 'polarity-testing-comprehensive',
      title: 'Polarity Verification',
      description: 'Verify correct polarity of single-pole devices and accessories',
      instructions: [
        'Ensure circuit remains isolated throughout testing',
        'Test continuity from Line at origin to switch Line terminals',
        'Verify NO continuity between switches and Neutral/Earth',
        'Check socket outlets for correct terminal connections',
        'Test lamp holders and ceiling roses for correct polarity',
        'Verify fuse and MCB connections to Line conductor only',
        'Check two-way and intermediate switching arrangements',
        'Document any incorrect connections for rectification'
      ],
      expectedResult: 'All single-pole devices connected to Line conductor only',
      safetyNotes: [
        'Circuit must remain isolated during testing',
        'Correct any polarity faults before energizing',
        'Pay particular attention to bathroom and special locations'
      ],
      tools: ['Continuity tester', 'Test leads', 'Circuit diagrams', 'Polarity test schedule'],
      isRequired: true,
      estimatedTime: 15
    },

    // Re-energization
    {
      id: 're-energization',
      title: 'Circuit Re-energization',
      description: 'Safely restore power to tested circuits',
      instructions: [
        'Verify all test equipment has been disconnected',
        'Ensure all temporary links have been removed',
        'Check all connections are secure and properly terminated',
        'Verify all covers and barriers are replaced',
        'Remove personal locks and lock-off devices',
        'Remove warning notices from isolation points',
        'Restore circuit breakers or replace fuses',
        'Verify supply is restored at all outlets',
        'Check operation of any RCDs or other protective devices'
      ],
      expectedResult: 'Circuits safely re-energized and fully operational',
      safetyNotes: [
        'Only remove your own personal locks',
        'Ensure all personnel are clear before re-energizing',
        'Be prepared for protective device operation on energizing'
      ],
      tools: ['Voltage tester', 'Socket tester', 'RCD test button'],
      isRequired: true,
      estimatedTime: 10
    },

    // Earth Fault Loop Impedance
    {
      id: 'earth-fault-loop-comprehensive',
      title: 'Earth Fault Loop Impedance (Zs)',
      description: 'Measure earth fault loop impedance at circuit extremities',
      instructions: [
        'Ensure installation is energized and stable',
        'Connect earth fault loop tester at furthest point of circuit',
        'Verify supply voltage is within ±10% of nominal',
        'Select appropriate test current for circuit',
        'Temporarily bypass RCD if required (with extreme care)',
        'Record Zs measurement and supply voltage',
        'Compare result with maximum values in BS 7671 Appendix 3',
        'Apply 0.8 correction factor for compliance verification',
        'Apply temperature correction if conductor temperature differs from 70°C'
      ],
      expectedResult: 'Zs × 0.8 ≤ maximum permitted values for protective device',
      safetyNotes: [
        'Live testing - exercise extreme caution',
        'Ensure good earth connection exists before testing',
        'Be aware of RCD operation during testing',
        'Limit test duration to prevent conductor heating'
      ],
      tools: ['Earth fault loop tester', 'Test leads', 'BS 7671 Appendix 3', 'Voltage indicator'],
      isRequired: true,
      estimatedTime: 15
    },

    // RCD Testing
    {
      id: 'rcd-testing-comprehensive',
      title: 'RCD Operation Testing',
      description: 'Test RCD operation times and sensitivity',
      instructions: [
        'Identify RCD type, rating, and number of poles',
        'Test manual test button operation first',
        'Connect RCD tester with correct polarity',
        'Test at 50% rated current - RCD should NOT trip',
        'Test at 100% rated current - should trip ≤300ms',
        'Test at 150% rated current - should trip ≤300ms',
        'Test at 500% rated current - should trip ≤40ms',
        'Test both positive and negative half cycles',
        'Record all trip times and verify compliance',
        'Reset RCD and verify normal operation'
      ],
      expectedResult: 'All RCD tests within BS EN 61008/61009 time limits',
      safetyNotes: [
        'Reset RCD between each test',
        'Allow cooling time between high current tests',
        'Monitor RCD for signs of distress or overheating',
        'Verify correct test lead polarity'
      ],
      tools: ['RCD tester', 'Test leads', 'BS EN 61008/61009 standards', 'Timer'],
      isRequired: true,
      estimatedTime: 20
    },

    // Functional Testing
    {
      id: 'functional-testing-comprehensive',
      title: 'Functional Testing',
      description: 'Test operation of all electrical equipment and accessories',
      instructions: [
        'Test operation of all switches and controls',
        'Verify correct operation of lighting circuits',
        'Check socket outlets using socket tester',
        'Test emergency lighting systems if installed',
        'Verify fire alarm system operation if present',
        'Test any special equipment or controls',
        'Check interlocks and safety systems',
        'Verify correct operation of any programmable devices',
        'Test communication systems if installed',
        'Document any functional defects found'
      ],
      expectedResult: 'All electrical equipment functions correctly as designed',
      safetyNotes: [
        'Be aware of consequences of operating equipment',
        'Coordinate with building occupants for testing',
        'Follow manufacturer instructions for specialized equipment'
      ],
      tools: ['Socket tester', 'Multimeter', 'Various test equipment as required'],
      isRequired: true,
      estimatedTime: 25
    }
  ],
  prerequisites: [
    'Completed electrical testing training and competency assessment',
    'All required test equipment calibrated within last 12 months',
    'Personal safety equipment and lock-off devices available',
    'Written authorization obtained from responsible person',
    'Risk assessment completed for the testing work',
    'Circuit identification and installation drawings available',
    'Emergency procedures established and communicated'
  ],
  regulatoryStandards: [
    'BS 7671:2018+A2:2022 (Requirements for Electrical Installations)',
    'GS 38 (Electrical Test Equipment for Use by Electricians)',
    'Electricity at Work Regulations 1989',
    'IET Guidance Note 3 (Inspection & Testing)',
    'BS EN 61557 series (Electrical safety in low voltage distribution systems)',
    'HSE Guidance HSG85 (Electricity at Work - Safe Working Practices)'
  ]
};
