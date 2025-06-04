import { TestFlow, TestType } from '@/types/inspection-testing';

export const comprehensiveTestFlow: TestFlow = {
  id: 'comprehensive-testing',
  name: 'All Tests in One Go',
  type: 'all-tests' as TestType,
  description: 'Complete electrical installation testing sequence covering all BS 7671 requirements in a single comprehensive session',
  difficulty: 'advanced',
  isComprehensive: true,
  steps: [
    // Safe Isolation Procedure - New First Step
    {
      id: 'safe-isolation-selection',
      title: 'Safe Isolation Procedure - Supply Type Selection',
      description: 'Select the appropriate safe isolation procedure based on your electrical supply type',
      instructions: [
        'Identify whether you are working on a single-phase or three-phase electrical supply',
        'Check the supply characteristics at the distribution board or consumer unit',
        'Single-phase: Typically 230V with Line, Neutral, and Earth conductors',
        'Three-phase: Typically 400V with L1, L2, L3, Neutral, and Earth conductors',
        'Confirm supply type before proceeding with isolation',
        'Select the appropriate isolation procedure below'
      ],
      expectedResult: 'Supply type correctly identified and appropriate isolation procedure selected',
      safetyNotes: [
        'Never assume supply type - always verify before proceeding',
        'Ensure you have the correct test equipment for the supply type',
        'If in doubt, treat as three-phase for maximum safety'
      ],
      tools: ['Voltage indicator', 'BS 7671', 'Approved voltage tester'],
      isRequired: true,
      estimatedTime: 5
    },

    {
      id: 'safe-isolation-single-phase',
      title: 'Safe Isolation - Single Phase Supply',
      description: 'Complete safe isolation procedure for single-phase electrical installations',
      instructions: [
        '1. OBTAIN PERMISSION: Get authorization from person in charge and notify all affected parties',
        '2. IDENTIFY CIRCUIT: Locate and identify the circuit to be isolated at the distribution board',
        '3. ISOLATE SUPPLY: Switch off the appropriate circuit breaker or remove fuse',
        '4. SECURE ISOLATION: Lock off the isolation point and attach warning notices',
        '5. TEST VOLTAGE INDICATOR: Test your approved voltage tester on a known live source',
        '6. TEST DEAD: Test between Line-Neutral, Line-Earth, and Neutral-Earth at the work location',
        '7. RE-TEST VOLTAGE INDICATOR: Confirm your tester is still working on the known live source',
        '8. APPLY TEMPORARY BONDS: Apply temporary equipotential bonding if required',
        '9. POST NOTICES: Display appropriate warning notices at the work location',
        '10. BEGIN WORK: Safe to commence electrical work after completing all steps'
      ],
      expectedResult: 'Circuit confirmed dead and secure, ready for safe electrical work',
      safetyNotes: [
        'NEVER work on live conductors unless absolutely necessary and properly trained',
        'The voltage tester MUST be proven before and after use',
        'If any test shows unexpected results, STOP and investigate',
        'Warning notices must remain in place throughout the work'
      ],
      tools: [
        'Approved voltage tester (GS 38)',
        'Lock-off devices',
        'Warning notices',
        'Temporary bonding equipment',
        'Known live source for testing'
      ],
      isRequired: true,
      estimatedTime: 15
    },

    {
      id: 'safe-isolation-three-phase',
      title: 'Safe Isolation - Three Phase Supply',
      description: 'Complete safe isolation procedure for three-phase electrical installations',
      instructions: [
        '1. OBTAIN PERMISSION: Get authorization from person in charge and notify all affected parties',
        '2. IDENTIFY CIRCUIT: Locate and identify the three-phase circuit at the distribution board',
        '3. ISOLATE SUPPLY: Switch off all three phases and neutral if switched',
        '4. SECURE ISOLATION: Lock off all isolation points and attach warning notices',
        '5. TEST VOLTAGE INDICATOR: Test your approved voltage tester on a known live source',
        '6. TEST DEAD: Test between all phase combinations (L1-L2, L1-L3, L2-L3)',
        '7. TEST TO NEUTRAL: Test L1-N, L2-N, L3-N at the work location',
        '8. TEST TO EARTH: Test L1-E, L2-E, L3-E, N-E at the work location',
        '9. RE-TEST VOLTAGE INDICATOR: Confirm your tester is still working on the known live source',
        '10. COMPLETE ISOLATION: Apply temporary bonds, post notices, and begin work safely'
      ],
      expectedResult: 'All three phases confirmed dead and secure, ready for safe electrical work',
      safetyNotes: [
        'ALL phases must be tested - a single phase could still be live',
        'Three-phase supplies can have higher fault levels - extra caution required',
        'Ensure isolation devices are suitable for the supply voltage and current',
        'Consider mechanical interlocking where multiple isolation points exist'
      ],
      tools: [
        'Approved voltage tester (GS 38) rated for 400V+',
        'Multi-pole lock-off devices',
        'Warning notices',
        'Temporary bonding equipment',
        'Known live source for testing'
      ],
      isRequired: true,
      estimatedTime: 20
    },

    // Visual Inspection Steps
    {
      id: 'visual-inspection-general',
      title: 'General Visual Inspection',
      description: 'Comprehensive visual inspection of the electrical installation',
      instructions: [
        'Ensure all circuits are isolated and locked off',
        'Inspect consumer unit for damage, correct labelling, and appropriate protective devices',
        'Check all visible cables for damage, appropriate support, and correct routing',
        'Verify earthing arrangements are complete and secure',
        'Inspect all accessories and equipment for damage or deterioration',
        'Check IP ratings are appropriate for environmental conditions'
      ],
      expectedResult: 'All visual checks pass with no defects identified',
      safetyNotes: [
        'Ensure complete isolation before inspection',
        'Use appropriate lighting and PPE',
        'Do not energize until all defects are rectified'
      ],
      tools: ['Visual inspection checklist', 'Torch', 'PPE'],
      isRequired: true,
      estimatedTime: 20
    },
    
    // Continuity Testing Steps
    {
      id: 'continuity-cpc',
      title: 'Continuity of Protective Conductors',
      description: 'Test continuity of circuit protective conductors (CPC)',
      instructions: [
        'Connect test leads between protective conductor terminals',
        'Set ohmmeter to low resistance range (200mΩ)',
        'Apply test current between 4-24mA as per BS 7671',
        'Record resistance values for each circuit',
        'Test at distribution board and furthest point of each circuit',
        'Document all readings on test certificate'
      ],
      expectedResult: 'All CPC resistance values within BS 7671 Table 62 limits',
      safetyNotes: [
        'Circuits must remain isolated',
        'Ensure good contact at test points',
        'Verify test equipment calibration'
      ],
      tools: ['Low resistance ohmmeter', 'Test leads', 'BS 7671'],
      isRequired: true,
      estimatedTime: 25
    },

    {
      id: 'continuity-ring-final',
      title: 'Ring Final Circuit Continuity',
      description: 'Test continuity and correct wiring of ring final circuits',
      instructions: [
        'Disconnect ring circuit at consumer unit',
        'Test continuity of line conductors end-to-end',
        'Test continuity of neutral conductors end-to-end',
        'Test continuity of CPC end-to-end',
        'Cross-connect and test (R1+R2) at each socket outlet',
        'Verify readings are consistent around the ring'
      ],
      expectedResult: 'Ring circuit intact with consistent R1+R2 values',
      safetyNotes: [
        'Ensure ring circuit is fully disconnected',
        'Label all conductors clearly',
        'Do not reconnect until testing complete'
      ],
      tools: ['Low resistance ohmmeter', 'Test leads', 'Labels'],
      isRequired: true,
      estimatedTime: 30
    },

    // Insulation Resistance Testing
    {
      id: 'insulation-resistance-500v',
      title: 'Insulation Resistance Testing (500V)',
      description: 'Test insulation resistance at 500V DC between all conductors',
      instructions: [
        'Remove or protect all electronic equipment and surge arresters',
        'Ensure all switches and controls are in ON position',
        'Set insulation tester to 500V DC',
        'Test Line to Neutral for each circuit',
        'Test Line to Earth for each circuit',
        'Test Neutral to Earth for each circuit',
        'Apply test voltage for minimum 60 seconds',
        'Record stabilized readings'
      ],
      expectedResult: 'Minimum 1MΩ for circuits up to 500V (BS 7671 Table 61)',
      safetyNotes: [
        'Post warning notices during testing',
        'Ensure all personnel clear of test area',
        'Allow capacitive discharge before handling conductors'
      ],
      tools: ['Insulation resistance tester', 'Warning notices', 'Test leads'],
      isRequired: true,
      estimatedTime: 35
    },

    // Polarity Testing
    {
      id: 'polarity-verification',
      title: 'Polarity Verification',
      description: 'Verify correct polarity of all single-pole devices and accessories',
      instructions: [
        'Test all single-pole switches connected to line conductor only',
        'Verify correct polarity at all lamp holders (E14, E27, BC)',
        'Check socket outlets for correct line/neutral/earth connections',
        'Test polarity of all single-pole protective devices',
        'Verify correct connections at all accessories',
        'Document any incorrect connections found'
      ],
      expectedResult: 'All single-pole devices correctly connected to line conductor',
      safetyNotes: [
        'Maintain circuit isolation throughout testing',
        'Mark any incorrect connections for immediate rectification',
        'Do not energize until all polarity faults corrected'
      ],
      tools: ['Continuity tester', 'Test leads', 'Polarity checker'],
      isRequired: true,
      estimatedTime: 20
    },

    // Earth Fault Loop Impedance Testing
    {
      id: 'external-loop-impedance',
      title: 'External Earth Fault Loop Impedance (Ze)',
      description: 'Measure external earth fault loop impedance at origin',
      instructions: [
        'Disconnect installation earthing conductor at main earthing terminal',
        'Connect earth fault loop tester between incoming line and earth electrode',
        'Ensure supply is stable and within ±10% of nominal voltage',
        'Select appropriate test current (typically 15-25A)',
        'Record Ze value at origin of installation',
        'Reconnect earthing conductor securely'
      ],
      expectedResult: 'Ze value suitable for protective devices used in installation',
      safetyNotes: [
        'Coordinate with DNO if required',
        'Ensure temporary earthing during test',
        'Limit test duration to prevent overheating'
      ],
      tools: ['Earth fault loop tester', 'Temporary earth', 'BS 7671 Appendix 3'],
      isRequired: true,
      estimatedTime: 15
    },

    {
      id: 'circuit-loop-impedance',
      title: 'Circuit Earth Fault Loop Impedance (Zs)',
      description: 'Measure earth fault loop impedance at all circuit extremities',
      instructions: [
        'Test Zs at furthest point of each final circuit',
        'Use non-trip or low current setting if RCD protection present',
        'Record readings for comparison with maximum permitted values',
        'Apply 80% rule for compliance verification (Zs × 0.8 ≤ max value)',
        'Test at multiple points on longer circuits',
        'Consider temperature correction factors'
      ],
      expectedResult: 'All Zs values within BS 7671 Appendix 3 limits',
      safetyNotes: [
        'Be prepared for protective device operation',
        'Ensure RCD will not cause nuisance tripping',
        'Monitor supply voltage during testing'
      ],
      tools: ['Earth fault loop tester', 'BS 7671 Appendix 3', 'Calculator'],
      isRequired: true,
      estimatedTime: 40
    },

    // RCD Testing
    {
      id: 'rcd-operation-test',
      title: 'RCD Operation and Trip Time Testing',
      description: 'Comprehensive testing of all RCD protection devices',
      instructions: [
        'Identify all RCDs and their ratings (30mA, 100mA, etc.)',
        'Test manual test button operation first',
        'Test at 50% rated current - should NOT trip',
        'Test at 100% rated current - should trip ≤300ms',
        'Test at 150% rated current - should trip ≤300ms',
        'Test at 500% rated current - should trip ≤40ms',
        'Test both positive and negative half cycles',
        'Record all trip times and reset functionality'
      ],
      expectedResult: 'All RCDs operate within BS EN 61008/61009 time limits',
      safetyNotes: [
        'Reset RCD between each test',
        'Allow cooling time between high current tests',
        'Monitor for signs of RCD deterioration'
      ],
      tools: ['RCD tester', 'Test leads', 'BS EN 61008/61009'],
      isRequired: true,
      estimatedTime: 25
    },

    // Functional Testing
    {
      id: 'functional-testing',
      title: 'Functional Testing of Installation',
      description: 'Test operation of all electrical equipment and protective systems',
      instructions: [
        'Energize installation in logical sequence',
        'Test operation of all lighting circuits and controls',
        'Verify socket outlet operation and protective conductor continuity',
        'Test all protective devices for correct operation',
        'Check operation of emergency lighting systems',
        'Verify operation of fire alarm systems if present',
        'Test any special installations (heating, ventilation, etc.)',
        'Document any operational defects'
      ],
      expectedResult: 'All electrical systems operate correctly and safely',
      safetyNotes: [
        'Energize circuits progressively',
        'Monitor for any unusual operation or noises',
        'Be prepared to isolate immediately if faults occur'
      ],
      tools: ['Voltage tester', 'Socket tester', 'Functional test schedule'],
      isRequired: true,
      estimatedTime: 30
    }
  ],
  prerequisites: [
    'Full safe isolation procedure completed and verified',
    'All test equipment calibrated within last 12 months',
    'BS 7671 current edition and relevant guidance notes available',
    'Test certificates and documentation prepared',
    'Coordination with other trades if required',
    'Client notification of testing schedule',
    'Appropriate PPE and safety equipment available',
    'Lock-off devices and warning notices prepared'
  ],
  regulatoryStandards: [
    'BS 7671:2018+A2:2022 Chapter 61 (Initial Verification)',
    'BS 7671:2018+A2:2022 Chapter 62 (Periodic Inspection)',
    'BS 7671:2018+A2:2022 Section 514 (Isolation and Switching)',
    'GS 38 (Electrical Test Equipment for Use by Electricians)',
    'GN3 Guidance Note 3 (Inspection & Testing)',
    'HSE Guidance HSG85 (Electricity at Work - Safe Working Practices)',
    'BS EN 61008 (RCCBs)',
    'BS EN 61009 (RCBOs)'
  ]
};
