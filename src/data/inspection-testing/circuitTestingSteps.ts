
import { CircuitTestStep } from '@/types/circuit-testing';

export const safeIsolationSteps: CircuitTestStep[] = [
  {
    id: 'safe-isolation-planning',
    title: 'Safe Isolation Planning',
    description: 'Plan the safe isolation procedure and identify supply arrangements',
    instructions: [
      'Identify the supply arrangements and distribution system',
      'Locate the main isolator and circuit protective devices',
      'Plan the isolation sequence to ensure complete safety',
      'Identify any emergency supplies or UPS systems',
      'Check for any interconnected supplies'
    ],
    safetyWarnings: [
      'Never assume circuits are dead until proven',
      'Always use appropriate PPE',
      'Follow company isolation procedures'
    ],
    requiredEquipment: ['Voltage indicator', 'Lock-off devices', 'Warning notices'],
    estimatedTime: '10 minutes',
    category: 'safe-isolation',
    testType: 'procedural',
    order: 1
  },
  {
    id: 'isolation-execution',
    title: 'Execute Safe Isolation',
    description: 'Perform the safe isolation procedure following established protocols',
    instructions: [
      'Switch off and isolate the supply at the main switch',
      'Secure isolation with lock-off devices',
      'Post warning notices at isolation points',
      'Test voltage indicator on known live source',
      'Test circuits to be worked on are dead'
    ],
    safetyWarnings: [
      'Test your voltage indicator before and after use',
      'Ensure isolation is secure and cannot be re-energised',
      'Maintain isolation throughout testing'
    ],
    requiredEquipment: ['Voltage indicator', 'Lock-off devices', 'Warning notices'],
    estimatedTime: '15 minutes',
    category: 'safe-isolation',
    testType: 'procedural',
    order: 2,
    prerequisites: ['safe-isolation-planning']
  }
];

export const continuityTestSteps: CircuitTestStep[] = [
  {
    id: 'continuity-cpc-radial',
    title: 'Continuity of Protective Conductors (Radial Circuits)',
    description: 'Test continuity of circuit protective conductors in radial circuits',
    instructions: [
      'Connect test leads between line and CPC at consumer unit',
      'Test at each outlet on the circuit',
      'Record R1+R2 values at each point',
      'Verify readings are within acceptable limits',
      'Check for loose connections or damaged conductors'
    ],
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    },
    requiredEquipment: ['Low resistance ohmmeter', 'Test leads', 'Test record sheets'],
    estimatedTime: '20 minutes',
    category: 'continuity',
    testType: 'measurement',
    order: 3,
    prerequisites: ['isolation-execution']
  },
  {
    id: 'continuity-ring-end-to-end',
    title: 'Ring Circuit End-to-End Continuity',
    description: 'Test end-to-end continuity of ring final circuits',
    instructions: [
      'Disconnect ring circuit conductors at consumer unit',
      'Measure resistance between L1 and L2 legs',
      'Measure resistance between N1 and N2 legs',
      'Measure resistance between E1 and E2 legs',
      'Values should be approximately equal',
      'Calculate expected R1+R2 value'
    ],
    acceptableLimits: {
      max: 0.05,
      unit: 'Ω'
    },
    requiredEquipment: ['Low resistance ohmmeter', 'Test leads'],
    estimatedTime: '15 minutes',
    category: 'continuity',
    testType: 'measurement',
    order: 4,
    prerequisites: ['continuity-cpc-radial']
  },
  {
    id: 'continuity-ring-cross-connection',
    title: 'Ring Circuit Cross-Connection Test',
    description: 'Verify ring circuit integrity using cross-connection method',
    instructions: [
      'Cross-connect L1 to N2 and L2 to N1 at consumer unit',
      'Cross-connect E1 to E2 at consumer unit',
      'Test between L and N at each socket outlet',
      'Test between L and E at each socket outlet',
      'All readings should be approximately equal',
      'Any significant deviation indicates a spur or fault'
    ],
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    },
    requiredEquipment: ['Low resistance ohmmeter', 'Test leads', 'Temporary links'],
    estimatedTime: '25 minutes',
    category: 'continuity',
    testType: 'measurement',
    order: 5,
    prerequisites: ['continuity-ring-end-to-end']
  },
  {
    id: 'continuity-ring-final-r1r2',
    title: 'Ring Circuit Final R1+R2 Test',
    description: 'Final R1+R2 measurements for ring circuits',
    instructions: [
      'Reconnect ring circuit conductors normally',
      'Link L and CPC at consumer unit',
      'Test L-E resistance at each socket outlet',
      'Record all readings on test certificate',
      'Verify all readings are within limits',
      'Check for any loose connections'
    ],
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    },
    requiredEquipment: ['Low resistance ohmmeter', 'Test leads'],
    estimatedTime: '20 minutes',
    category: 'continuity',
    testType: 'measurement',
    order: 6,
    prerequisites: ['continuity-ring-cross-connection']
  }
];

export const insulationTestSteps: CircuitTestStep[] = [
  {
    id: 'insulation-preparation',
    title: 'Insulation Test Preparation',
    description: 'Prepare circuits for insulation resistance testing',
    instructions: [
      'Ensure all circuits are isolated and secure',
      'Remove or switch off all electronic equipment',
      'Disconnect sensitive equipment that could be damaged',
      'Ensure all switches and circuit breakers are in ON position',
      'Remove any parallel paths (e.g., neon indicators)'
    ],
    safetyWarnings: [
      'High voltage present during testing',
      'Disconnect sensitive electronic equipment',
      'Ensure proper earthing of test equipment'
    ],
    requiredEquipment: ['Insulation resistance tester', 'Test leads'],
    estimatedTime: '15 minutes',
    category: 'insulation-resistance',
    testType: 'procedural',
    order: 7,
    prerequisites: ['continuity-ring-final-r1r2']
  },
  {
    id: 'insulation-line-neutral',
    title: 'Line to Neutral Insulation Test',
    description: 'Test insulation resistance between line and neutral conductors',
    instructions: [
      'Set insulation tester to 500V DC for circuits up to 500V',
      'Connect test leads between line and neutral at consumer unit',
      'Apply test voltage for minimum 1 minute',
      'Record insulation resistance reading',
      'Minimum acceptable reading is 1MΩ',
      'Investigate any readings below acceptable limits'
    ],
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    },
    requiredEquipment: ['Insulation resistance tester', 'Test leads'],
    estimatedTime: '10 minutes',
    category: 'insulation-resistance',
    testType: 'measurement',
    order: 8,
    prerequisites: ['insulation-preparation']
  },
  {
    id: 'insulation-line-earth',
    title: 'Line to Earth Insulation Test',
    description: 'Test insulation resistance between line and earth conductors',
    instructions: [
      'Connect test leads between line and earth at consumer unit',
      'Apply 500V DC test voltage',
      'Maintain test for minimum 1 minute',
      'Record insulation resistance reading',
      'Ensure reading meets minimum requirements',
      'Test each line conductor individually for 3-phase circuits'
    ],
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    },
    requiredEquipment: ['Insulation resistance tester', 'Test leads'],
    estimatedTime: '10 minutes',
    category: 'insulation-resistance',
    testType: 'measurement',
    order: 9,
    prerequisites: ['insulation-line-neutral']
  },
  {
    id: 'insulation-neutral-earth',
    title: 'Neutral to Earth Insulation Test',
    description: 'Test insulation resistance between neutral and earth conductors',
    instructions: [
      'Connect test leads between neutral and earth at consumer unit',
      'Apply 500V DC test voltage',
      'Maintain test for minimum 1 minute',
      'Record insulation resistance reading',
      'Check for any parallel paths affecting reading',
      'Ensure adequate insulation between neutral and earth'
    ],
    acceptableLimits: {
      min: 1,
      unit: 'MΩ'
    },
    requiredEquipment: ['Insulation resistance tester', 'Test leads'],
    estimatedTime: '10 minutes',
    category: 'insulation-resistance',
    testType: 'measurement',
    order: 10,
    prerequisites: ['insulation-line-earth']
  }
];

export const earthFaultLoopSteps: CircuitTestStep[] = [
  {
    id: 'zs-preparation',
    title: 'Earth Fault Loop Impedance Test Preparation',
    description: 'Prepare for earth fault loop impedance testing',
    instructions: [
      'Ensure installation is energised and RCDs are operational',
      'Connect earth fault loop impedance tester',
      'Select appropriate test method (high current or no-trip)',
      'Verify test equipment calibration',
      'Ensure safe working conditions'
    ],
    safetyWarnings: [
      'Installation must be live for this test',
      'RCDs may trip during testing',
      'Use appropriate test settings to prevent unwanted tripping'
    ],
    requiredEquipment: ['Earth fault loop impedance tester', 'Test leads'],
    estimatedTime: '10 minutes',
    category: 'earth-fault-loop',
    testType: 'procedural',
    order: 11,
    prerequisites: ['insulation-neutral-earth']
  },
  {
    id: 'zs-measurement',
    title: 'Zs Measurement at Distribution Board',
    description: 'Measure earth fault loop impedance at the distribution board',
    instructions: [
      'Connect tester between line and earth at main switch',
      'Select appropriate test current setting',
      'Perform earth fault loop impedance test',
      'Record Zs reading at distribution board',
      'Compare with maximum permitted values',
      'Document results on test certificate'
    ],
    acceptableLimits: {
      max: 1.15,
      unit: 'Ω'
    },
    requiredEquipment: ['Earth fault loop impedance tester', 'Test leads'],
    estimatedTime: '5 minutes',
    category: 'earth-fault-loop',
    testType: 'measurement',
    order: 12,
    prerequisites: ['zs-preparation']
  },
  {
    id: 'zs-circuit-testing',
    title: 'Circuit Earth Fault Loop Impedance Testing',
    description: 'Test earth fault loop impedance at circuit outlets',
    instructions: [
      'Test Zs at the furthest point of each circuit',
      'Use appropriate test setting to prevent RCD tripping',
      'Record readings for each circuit tested',
      'Compare readings with maximum permitted Zs values',
      'Investigate any readings exceeding limits',
      'Test additional points if required'
    ],
    acceptableLimits: {
      max: 1.67,
      unit: 'Ω'
    },
    requiredEquipment: ['Earth fault loop impedance tester', 'Test leads'],
    estimatedTime: '30 minutes',
    category: 'earth-fault-loop',
    testType: 'measurement',
    order: 13,
    prerequisites: ['zs-measurement']
  }
];

export const rcdTestSteps: CircuitTestStep[] = [
  {
    id: 'rcd-preparation',
    title: 'RCD Test Preparation',
    description: 'Prepare for RCD operation and timing tests',
    instructions: [
      'Identify all RCDs in the installation',
      'Check RCD ratings and types (30mA, 100mA, etc.)',
      'Ensure RCD test equipment is calibrated',
      'Test RCD test button operation first',
      'Record RCD details on test certificate'
    ],
    requiredEquipment: ['RCD tester', 'Test leads', 'Test certificate'],
    estimatedTime: '10 minutes',
    category: 'rcd-test',
    testType: 'procedural',
    order: 14,
    prerequisites: ['zs-circuit-testing']
  },
  {
    id: 'rcd-trip-test',
    title: 'RCD Trip Time Testing',
    description: 'Test RCD operation times at various test currents',
    instructions: [
      'Connect RCD tester to appropriate test point',
      'Test at ½ × IΔn (should not trip)',
      'Test at 1 × IΔn (should trip within 300ms)',
      'Test at 5 × IΔn (should trip within 40ms)',
      'Record all trip times',
      'Test both positive and negative half cycles'
    ],
    acceptableLimits: {
      max: 300,
      unit: 'ms'
    },
    requiredEquipment: ['RCD tester', 'Test leads'],
    estimatedTime: '15 minutes',
    category: 'rcd-test',
    testType: 'measurement',
    order: 15,
    prerequisites: ['rcd-preparation']
  }
];

export const polarityTestSteps: CircuitTestStep[] = [
  {
    id: 'polarity-testing',
    title: 'Polarity Verification',
    description: 'Verify correct polarity of all circuits and connections',
    instructions: [
      'Check polarity at consumer unit connections',
      'Verify switch connections interrupt line conductors only',
      'Check socket outlet polarity (line to right when viewed from front)',
      'Test Edison screw lampholders (line to centre contact)',
      'Verify single-pole devices are connected in line conductor',
      'Check polarity of all fixed equipment connections'
    ],
    requiredEquipment: ['Low resistance ohmmeter', 'Socket tester', 'Test leads'],
    estimatedTime: '20 minutes',
    category: 'polarity',
    testType: 'measurement',
    order: 16,
    prerequisites: ['rcd-trip-test']
  }
];

export const functionalTestSteps: CircuitTestStep[] = [
  {
    id: 'functional-testing',
    title: 'Functional Testing',
    description: 'Test operation of all installed equipment and systems',
    instructions: [
      'Test operation of all switches and controls',
      'Verify correct operation of lighting circuits',
      'Check socket outlets using appropriate testers',
      'Test any installed protective systems',
      'Verify operation of any special installations',
      'Test emergency lighting if installed'
    ],
    requiredEquipment: ['Socket tester', 'Voltage indicator', 'Test lamp'],
    estimatedTime: '25 minutes',
    category: 'functional-test',
    testType: 'procedural',
    order: 17,
    prerequisites: ['polarity-testing']
  }
];

export const allCircuitTestSteps = [
  ...safeIsolationSteps,
  ...continuityTestSteps,
  ...insulationTestSteps,
  ...earthFaultLoopSteps,
  ...rcdTestSteps,
  ...polarityTestSteps,
  ...functionalTestSteps
];
