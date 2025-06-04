import { TestFlow } from '@/types/inspection-testing';

export const ukEicrTestFlows: TestFlow[] = [
  {
    id: 'uk-domestic-eicr-full',
    name: 'UK Domestic EICR - Full Inspection',
    type: 'all-tests',
    description: 'Complete Electrical Installation Condition Report for domestic properties in accordance with BS 7671:2018+A2:2022',
    difficulty: 'intermediate',
    isComprehensive: true,
    prerequisites: [
      'Valid electrical qualification (City & Guilds 2391-52 or equivalent)',
      'Calibrated test equipment (PAT tester, insulation resistance tester, earth fault loop impedance tester)',
      'Access to all areas of installation',
      'Installation switched off and isolated where necessary'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 - Requirements for Electrical Installations',
      'BS 7909:2011 - Code of practice for temporary electrical systems',
      'Guidance Note 3 - Inspection & Testing'
    ],
    steps: [
      {
        id: 'uk-preliminary-assessment',
        title: 'Preliminary Assessment & Documentation',
        description: 'Initial assessment of installation and documentation review',
        instructions: [
          'Examine existing electrical certificates and documentation',
          'Identify supply characteristics (TN-S, TN-C-S, TT system)',
          'Assess extent of installation and any limitations',
          'Complete preliminary sections of EICR',
          'Identify any immediately dangerous conditions'
        ],
        expectedResult: 'Installation assessed and documentation requirements identified',
        safetyNotes: [
          'Do not energise any circuits showing signs of damage',
          'Identify and record any unsafe conditions immediately',
          'Ensure adequate lighting for inspection'
        ],
        tools: ['EICR form', 'Camera for documentation', 'Torch'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'uk-supply-intake-inspection',
        title: 'Supply Intake & Earthing System Inspection',
        description: 'Visual inspection of supply arrangements and earthing system',
        instructions: [
          'Inspect service head and tails for condition and security',
          'Verify earthing arrangements (TN-S, TN-C-S, or TT)',
          'Check main earthing conductor size and connection',
          'Inspect main protective bonding to gas, water, oil pipes',
          'Verify RCD protection where required by BS 7671'
        ],
        expectedResult: 'Supply arrangements and earthing system verified as satisfactory',
        safetyNotes: [
          'Do not remove DNO seals',
          'Only inspect - do not test live supply arrangements',
          'Report any DNO equipment concerns to supplier'
        ],
        tools: ['Visual inspection only', 'Camera', 'Measuring tape'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'uk-consumer-unit-inspection',
        title: 'Consumer Unit / Distribution Board Inspection',
        description: 'Detailed visual inspection of consumer unit and protective devices',
        instructions: [
          'Inspect consumer unit for type, age, and condition',
          'Check all protective devices are appropriate ratings',
          'Verify adequate short-circuit capacity of protective devices',
          'Inspect for signs of overheating, arcing, or damage',
          'Check labelling and identification of circuits',
          'Verify RCD protection meets current requirements'
        ],
        expectedResult: 'Consumer unit and protective devices found satisfactory',
        safetyNotes: [
          'Switch off main switch before removing consumer unit cover',
          'Be aware live terminals may still be present',
          'Use appropriate PPE'
        ],
        tools: ['Screwdrivers', 'Torch', 'Labels', 'Camera'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'uk-circuit-visual-inspection',
        title: 'Circuit Wiring Visual Inspection',
        description: 'Visual inspection of accessible circuit wiring and accessories',
        instructions: [
          'Inspect all accessible cables for damage, overheating, or inappropriate installation',
          'Check socket outlets, switches, and accessories for damage',
          'Verify cable routes comply with safe zones (BS 7671 Chapter 52)',
          'Inspect junction boxes and connections where accessible',
          'Check mechanical protection where required',
          'Identify any additions or alterations since original installation'
        ],
        expectedResult: 'Circuit wiring and accessories found in satisfactory condition',
        safetyNotes: [
          'Switch off circuits before removing socket/switch faceplates',
          'Test circuits are dead before inspection',
          'Replace any damaged accessories'
        ],
        tools: ['Screwdrivers', 'Voltage tester', 'Torch', 'Camera'],
        isRequired: true,
        estimatedTime: 30
      },
      {
        id: 'uk-safe-isolation-procedure',
        title: 'Safe Isolation Procedure (UK)',
        description: 'Systematic isolation procedure in accordance with GS38',
        instructions: [
          'Identify circuit to be tested and inform all persons',
          'Switch off and lock off circuit at consumer unit',
          'Select appropriate voltage indicator to GS38',
          'Test voltage indicator on known live source',
          'Test circuit dead at point of work',
          'Test voltage indicator again on known live source',
          'Apply warning notices and barriers as appropriate'
        ],
        expectedResult: 'Circuit safely isolated and proved dead',
        safetyNotes: [
          'Use only GS38 compliant voltage indicators',
          'Always prove indicator before and after testing',
          'Never assume circuit is dead without proper testing',
          'Lock off isolators where possible'
        ],
        tools: ['GS38 voltage indicator', 'Lock-off devices', 'Warning notices'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'uk-continuity-cpc-test',
        title: 'Continuity of Protective Conductors (CPC)',
        description: 'Test continuity of circuit protective conductors (R1 + R2)',
        instructions: [
          'Ensure circuit is isolated and proved dead',
          'Connect test leads between line and CPC at consumer unit',
          'Test at all points on circuit (sockets, switches, fixed equipment)',
          'Record highest reading as R1 + R2',
          'Compare with maximum values in BS 7671 Appendix 3',
          'Investigate any unusually high readings'
        ],
        expectedResult: 'R1 + R2 readings within acceptable limits per BS 7671',
        safetyNotes: [
          'Circuit must be isolated before testing',
          'Remove any parallel earth paths during testing',
          'Ensure good contact with test probes'
        ],
        tools: ['Low resistance ohmmeter', 'Test leads', 'Test probes'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'uk-insulation-resistance-test',
        title: 'Insulation Resistance Testing',
        description: 'Insulation resistance test between conductors and to earth',
        instructions: [
          'Ensure circuit isolated and all equipment disconnected',
          'Remove lamps and switch off electronic equipment',
          'Test between Line-Neutral, Line-Earth, Neutral-Earth',
          'Apply 500V DC for circuits up to 500V',
          'Minimum acceptable reading: 1MΩ (BS 7671 Table 61)',
          'Investigate any readings below 2MΩ'
        ],
        expectedResult: 'Insulation resistance ≥1MΩ at 500V DC',
        safetyNotes: [
          'Disconnect electronic equipment to prevent damage',
          'Warning: High test voltage present during test',
          'Discharge capacitance after testing'
        ],
        tools: ['Insulation resistance tester (500V)', 'Test leads'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'uk-polarity-verification',
        title: 'Polarity Verification',
        description: 'Verify correct polarity of single-pole devices and accessories',
        instructions: [
          'Check all single-pole switches interrupt line conductor only',
          'Verify Edison screw lampholders have line to centre contact',
          'Check socket outlets have correct line/neutral connections',
          'Test using continuity tester or low resistance ohmmeter',
          'Record any polarity faults found'
        ],
        expectedResult: 'All single-pole devices correctly connected to line conductor',
        safetyNotes: [
          'Circuit must be isolated during testing',
          'Correct any polarity faults immediately',
          'Critical safety requirement'
        ],
        tools: ['Continuity tester', 'Test leads', 'Socket tester'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'uk-earth-fault-loop-impedance',
        title: 'Earth Fault Loop Impedance (Zs)',
        description: 'Measure earth fault loop impedance and verify protection',
        instructions: [
          'Restore circuit to normal configuration',
          'Connect earth fault loop impedance tester',
          'Measure Zs at furthest point of each circuit',
          'Compare with maximum values (BS 7671 Appendix 3)',
          'Account for temperature correction factor (1.2 for 70°C)',
          'Verify automatic disconnection will occur within required time'
        ],
        expectedResult: 'Zs values within limits for protective device disconnection times',
        safetyNotes: [
          'Circuit must be live for testing',
          'Use no-trip tester where RCDs present',
          'Be aware of parallel earth paths'
        ],
        tools: ['Earth fault loop impedance tester', 'No-trip tester option'],
        isRequired: true,
        estimatedTime: 25
      },
      {
        id: 'uk-rcd-testing',
        title: 'RCD Operation Testing',
        description: 'Test RCD operation times and residual current levels',
        instructions: [
          'Test RCD mechanical test button operation',
          'Using RCD tester, test at 1× rated current (should not trip)',
          'Test at 1× rated current for 2 seconds (should trip)',
          'Test at 5× rated current (should trip within 40ms)',
          'Test all RCDs protecting socket circuits ≤32A',
          'Record trip times and verify compliance with BS 7671'
        ],
        expectedResult: 'RCD operation within required times per BS 7671 Table 41.1',
        safetyNotes: [
          'RCD testing requires live circuit',
          'Reset RCD after each test',
          'Test in correct sequence to avoid nuisance tripping'
        ],
        tools: ['RCD tester', 'Timer', 'Test buttons'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'uk-functional-testing',
        title: 'Functional Testing of Installation',
        description: 'Test operation of switches, controls, and protective devices',
        instructions: [
          'Test operation of all switches and controls',
          'Verify correct operation of two-way and intermediate switching',
          'Test emergency lighting where installed',
          'Check operation of smoke/heat detector circuits',
          'Test any special installations (e.g., bathroom zones)',
          'Verify correct operation of time delays and sequences'
        ],
        expectedResult: 'All controls and protective devices operate correctly',
        safetyNotes: [
          'Take care with emergency lighting testing',
          'Coordinate tests to minimise disruption',
          'Ensure all systems reset correctly'
        ],
        tools: ['Basic tools', 'Timer', 'Test equipment as required'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'uk-eicr-completion',
        title: 'EICR Completion & Classification',
        description: 'Complete EICR with appropriate fault classifications',
        instructions: [
          'Review all test results and observations',
          'Classify any faults found using C1, C2, C3, or FI codes',
          'C1 = Danger present (immediate action required)',
          'C2 = Potentially dangerous (urgent remedial action)',
          'C3 = Improvement recommended',
          'FI = Further investigation required',
          'Complete overall condition assessment (Satisfactory/Unsatisfactory)',
          'Recommend date for next inspection (typically 5-10 years domestic)'
        ],
        expectedResult: 'Completed EICR with appropriate recommendations',
        safetyNotes: [
          'Ensure all dangerous conditions are clearly identified',
          'Provide clear remedial recommendations',
          'Consider disconnection of dangerous circuits'
        ],
        tools: ['EICR form', 'BS 7671 reference', 'Calculator'],
        isRequired: true,
        estimatedTime: 15
      }
    ]
  },
  {
    id: 'uk-commercial-eicr-full',
    name: 'UK Commercial EICR - Full Inspection',
    type: 'all-tests',
    description: 'Comprehensive EICR for commercial/industrial installations with three-phase systems',
    difficulty: 'advanced',
    isComprehensive: true,
    prerequisites: [
      'Advanced electrical qualification',
      'Experience with commercial installations',
      'Three-phase test equipment',
      'Access to all switchgear and distribution boards'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022',
      'IET Guidance Note 3',
      'Health & Safety at Work Act 1974'
    ],
    steps: [
      {
        id: 'commercial-preliminary-assessment',
        title: 'Preliminary Assessment & Documentation',
        description: 'Initial assessment of installation and documentation review',
        instructions: [
          'Examine existing electrical certificates and documentation',
          'Identify supply characteristics (TN-S, TN-C-S, TT system)',
          'Assess extent of installation and any limitations',
          'Complete preliminary sections of EICR',
          'Identify any immediately dangerous conditions'
        ],
        expectedResult: 'Installation assessed and documentation requirements identified',
        safetyNotes: [
          'Do not energise any circuits showing signs of damage',
          'Identify and record any unsafe conditions immediately',
          'Ensure adequate lighting for inspection'
        ],
        tools: ['EICR form', 'Camera for documentation', 'Torch'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'commercial-supply-intake-inspection',
        title: 'Supply Intake & Earthing System Inspection',
        description: 'Visual inspection of supply arrangements and earthing system',
        instructions: [
          'Inspect service head and tails for condition and security',
          'Verify earthing arrangements (TN-S, TN-C-S, or TT)',
          'Check main earthing conductor size and connection',
          'Inspect main protective bonding to gas, water, oil pipes',
          'Verify RCD protection where required by BS 7671'
        ],
        expectedResult: 'Supply arrangements and earthing system verified as satisfactory',
        safetyNotes: [
          'Do not remove DNO seals',
          'Only inspect - do not test live supply arrangements',
          'Report any DNO equipment concerns to supplier'
        ],
        tools: ['Visual inspection only', 'Camera', 'Measuring tape'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'commercial-distribution-board-inspection',
        title: 'Distribution Board Inspection',
        description: 'Detailed visual inspection of distribution board and protective devices',
        instructions: [
          'Inspect distribution board for type, age, and condition',
          'Check all protective devices are appropriate ratings',
          'Verify adequate short-circuit capacity of protective devices',
          'Inspect for signs of overheating, arcing, or damage',
          'Check labelling and identification of circuits',
          'Verify RCD protection meets current requirements'
        ],
        expectedResult: 'Distribution board and protective devices found satisfactory',
        safetyNotes: [
          'Switch off main switch before removing distribution board cover',
          'Be aware live terminals may still be present',
          'Use appropriate PPE'
        ],
        tools: ['Screwdrivers', 'Torch', 'Labels', 'Camera'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'commercial-circuit-visual-inspection',
        title: 'Circuit Wiring Visual Inspection',
        description: 'Visual inspection of accessible circuit wiring and accessories',
        instructions: [
          'Inspect all accessible cables for damage, overheating, or inappropriate installation',
          'Check socket outlets, switches, and accessories for damage',
          'Verify cable routes comply with safe zones (BS 7671 Chapter 52)',
          'Inspect junction boxes and connections where accessible',
          'Check mechanical protection where required',
          'Identify any additions or alterations since original installation'
        ],
        expectedResult: 'Circuit wiring and accessories found in satisfactory condition',
        safetyNotes: [
          'Switch off circuits before removing socket/switch faceplates',
          'Test circuits are dead before inspection',
          'Replace any damaged accessories'
        ],
        tools: ['Screwdrivers', 'Voltage tester', 'Torch', 'Camera'],
        isRequired: true,
        estimatedTime: 45
      },
      {
        id: 'commercial-safe-isolation-procedure',
        title: 'Safe Isolation Procedure (Commercial)',
        description: 'Systematic isolation procedure in accordance with GS38',
        instructions: [
          'Identify circuit to be tested and inform all persons',
          'Switch off and lock off circuit at distribution board',
          'Select appropriate voltage indicator to GS38',
          'Test voltage indicator on known live source',
          'Test circuit dead at point of work',
          'Test voltage indicator again on known live source',
          'Apply warning notices and barriers as appropriate'
        ],
        expectedResult: 'Circuit safely isolated and proved dead',
        safetyNotes: [
          'Use only GS38 compliant voltage indicators',
          'Always prove indicator before and after testing',
          'Never assume circuit is dead without proper testing',
          'Lock off isolators where possible'
        ],
        tools: ['GS38 voltage indicator', 'Lock-off devices', 'Warning notices'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'commercial-continuity-cpc-test',
        title: 'Continuity of Protective Conductors (CPC)',
        description: 'Test continuity of circuit protective conductors (R1 + R2)',
        instructions: [
          'Ensure circuit is isolated and proved dead',
          'Connect test leads between line and CPC at distribution board',
          'Test at all points on circuit (sockets, switches, fixed equipment)',
          'Record highest reading as R1 + R2',
          'Compare with maximum values in BS 7671 Appendix 3',
          'Investigate any unusually high readings'
        ],
        expectedResult: 'R1 + R2 readings within acceptable limits per BS 7671',
        safetyNotes: [
          'Circuit must be isolated before testing',
          'Remove any parallel earth paths during testing',
          'Ensure good contact with test probes'
        ],
        tools: ['Low resistance ohmmeter', 'Test leads', 'Test probes'],
        isRequired: true,
        estimatedTime: 30
      },
      {
        id: 'commercial-insulation-resistance-test',
        title: 'Insulation Resistance Testing',
        description: 'Insulation resistance test between conductors and to earth',
        instructions: [
          'Ensure circuit isolated and all equipment disconnected',
          'Remove lamps and switch off electronic equipment',
          'Test between Line-Neutral, Line-Earth, Neutral-Earth',
          'Apply 500V DC for circuits up to 500V',
          'Minimum acceptable reading: 1MΩ (BS 7671 Table 61)',
          'Investigate any readings below 2MΩ'
        ],
        expectedResult: 'Insulation resistance ≥1MΩ at 500V DC',
        safetyNotes: [
          'Disconnect electronic equipment to prevent damage',
          'Warning: High test voltage present during test',
          'Discharge capacitance after testing'
        ],
        tools: ['Insulation resistance tester (500V)', 'Test leads'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'commercial-polarity-verification',
        title: 'Polarity Verification',
        description: 'Verify correct polarity of single-pole devices and accessories',
        instructions: [
          'Check all single-pole switches interrupt line conductor only',
          'Verify Edison screw lampholders have line to centre contact',
          'Check socket outlets have correct line/neutral connections',
          'Test using continuity tester or low resistance ohmmeter',
          'Record any polarity faults found'
        ],
        expectedResult: 'All single-pole devices correctly connected to line conductor',
        safetyNotes: [
          'Circuit must be isolated during testing',
          'Correct any polarity faults immediately',
          'Critical safety requirement'
        ],
        tools: ['Continuity tester', 'Test leads', 'Socket tester'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'commercial-earth-fault-loop-impedance',
        title: 'Earth Fault Loop Impedance (Zs)',
        description: 'Measure earth fault loop impedance and verify protection',
        instructions: [
          'Restore circuit to normal configuration',
          'Connect earth fault loop impedance tester',
          'Measure Zs at furthest point of each circuit',
          'Compare with maximum values (BS 7671 Appendix 3)',
          'Account for temperature correction factor (1.2 for 70°C)',
          'Verify automatic disconnection will occur within required time'
        ],
        expectedResult: 'Zs values within limits for protective device disconnection times',
        safetyNotes: [
          'Circuit must be live for testing',
          'Use no-trip tester where RCDs present',
          'Be aware of parallel earth paths'
        ],
        tools: ['Earth fault loop impedance tester', 'No-trip tester option'],
        isRequired: true,
        estimatedTime: 30
      },
      {
        id: 'commercial-rcd-testing',
        title: 'RCD Operation Testing',
        description: 'Test RCD operation times and residual current levels',
        instructions: [
          'Test RCD mechanical test button operation',
          'Using RCD tester, test at 1× rated current (should not trip)',
          'Test at 1× rated current for 2 seconds (should trip)',
          'Test at 5× rated current (should trip within 40ms)',
          'Test all RCDs protecting socket circuits ≤32A',
          'Record trip times and verify compliance with BS 7671'
        ],
        expectedResult: 'RCD operation within required times per BS 7671 Table 41.1',
        safetyNotes: [
          'RCD testing requires live circuit',
          'Reset RCD after each test',
          'Test in correct sequence to avoid nuisance tripping'
        ],
        tools: ['RCD tester', 'Timer', 'Test buttons'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'commercial-functional-testing',
        title: 'Functional Testing of Installation',
        description: 'Test operation of switches, controls, and protective devices',
        instructions: [
          'Test operation of all switches and controls',
          'Verify correct operation of two-way and intermediate switching',
          'Test emergency lighting where installed',
          'Check operation of smoke/heat detector circuits',
          'Test any special installations (e.g., bathroom zones)',
          'Verify correct operation of time delays and sequences'
        ],
        expectedResult: 'All controls and protective devices operate correctly',
        safetyNotes: [
          'Take care with emergency lighting testing',
          'Coordinate tests to minimise disruption',
          'Ensure all systems reset correctly'
        ],
        tools: ['Basic tools', 'Timer', 'Test equipment as required'],
        isRequired: true,
        estimatedTime: 30
      },
      {
        id: 'commercial-eicr-completion',
        title: 'EICR Completion & Classification',
        description: 'Complete EICR with appropriate fault classifications',
        instructions: [
          'Review all test results and observations',
          'Classify any faults found using C1, C2, C3, or FI codes',
          'C1 = Danger present (immediate action required)',
          'C2 = Potentially dangerous (urgent remedial action)',
          'C3 = Improvement recommended',
          'FI = Further investigation required',
          'Complete overall condition assessment (Satisfactory/Unsatisfactory)',
          'Recommend date for next inspection (typically 3-5 years commercial)'
        ],
        expectedResult: 'Completed EICR with appropriate recommendations',
        safetyNotes: [
          'Ensure all dangerous conditions are clearly identified',
          'Provide clear remedial recommendations',
          'Consider disconnection of dangerous circuits'
        ],
        tools: ['EICR form', 'BS 7671 reference', 'Calculator'],
        isRequired: true,
        estimatedTime: 20
      }
    ]
  }
];
