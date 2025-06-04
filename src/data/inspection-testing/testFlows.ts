import { TestFlow } from '@/types/inspection-testing';
import { comprehensiveTestFlow } from './comprehensiveTestFlow';

export const testFlows: TestFlow[] = [
  // Add the comprehensive test flow first
  comprehensiveTestFlow,
  
  {
    id: 'continuity-test',
    name: 'Continuity Testing',
    type: 'continuity',
    description: 'Test the continuity of protective conductors and bonding conductors in accordance with BS 7671',
    difficulty: 'beginner',
    steps: [
      {
        id: 'visual-inspection',
        title: 'Visual Inspection',
        description: 'Perform thorough visual inspection before testing',
        instructions: [
          'Ensure circuit is isolated and locked off',
          'Check all electrical connections are secure and accessible',
          'Verify protective conductor connections at all points',
          'Inspect for any visible damage to cables or equipment',
          'Confirm test points are clean and accessible'
        ],
        expectedResult: 'All connections secure with no visible damage or defects',
        safetyNotes: [
          'Ensure circuit is isolated and proved dead',
          'Use appropriate PPE including safety glasses',
          'Verify isolation at all relevant points'
        ],
        tools: ['Visual inspection', 'Torch', 'PPE'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'continuity-measurement',
        title: 'Continuity Measurement',
        description: 'Measure continuity of protective conductors using low resistance ohmmeter',
        instructions: [
          'Connect test leads to protective conductor terminals',
          'Set multimeter to continuity/low resistance mode (200mΩ range)',
          'Ensure test current is between 4-24mA (BS 7671 requirement)',
          'Take measurement between conductor ends',
          'Record resistance value to 0.01Ω precision',
          'Repeat test at different points if circuit is extensive'
        ],
        expectedResult: 'Reading should comply with BS 7671 Table 62 limits',
        safetyNotes: [
          'Ensure circuit remains dead throughout testing',
          'Do not exceed safe working limits of test equipment',
          'Maintain safe clearance from live parts'
        ],
        tools: ['Low resistance ohmmeter', 'Test leads', 'BS 7671'],
        isRequired: true,
        estimatedTime: 15
      }
    ],
    prerequisites: [
      'Circuit isolated and locked off',
      'Safe isolation procedure completed and verified',
      'Test equipment calibrated within last 12 months',
      'BS 7671 reference material available'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 Section 612.2', 'GN3 Guidance Note 3']
  },
  {
    id: 'insulation-resistance',
    name: 'Insulation Resistance Testing',
    type: 'insulation-resistance',
    description: 'Test insulation resistance between conductors and earth in accordance with BS 7671',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'preparation',
        title: 'Test Preparation',
        description: 'Prepare circuit for insulation resistance testing',
        instructions: [
          'Isolate circuit and remove fuses/switch off MCBs',
          'Disconnect or protect sensitive electronic equipment',
          'Remove or short-circuit surge protection devices',
          'Ensure all switches and controls are in ON position',
          'Verify test voltage selection (250V/500V/1000V)',
          'Check ambient temperature for correction factors'
        ],
        expectedResult: 'Circuit properly prepared and isolated for testing',
        safetyNotes: [
          'Warning notices posted at all relevant locations',
          'All persons clear of circuit under test',
          'Sensitive equipment properly protected'
        ],
        tools: ['Insulation resistance tester', 'Warning notices', 'BS 7671'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'insulation-test',
        title: 'Insulation Resistance Measurement',
        description: 'Perform insulation resistance test between conductors and earth',
        instructions: [
          'Connect test leads: Line to Earth, Neutral to Earth, Line to Neutral',
          'Select appropriate test voltage per BS 7671 Table 61',
          'Apply test voltage for minimum 60 seconds',
          'Record stabilized insulation resistance value',
          'Test all conductor combinations systematically',
          'Apply temperature correction if required'
        ],
        expectedResult: 'Minimum 1MΩ for most installations (BS 7671 Table 61)',
        safetyNotes: [
          'Do not touch test leads during voltage application',
          'Allow capacitive discharge before disconnecting leads',
          'Ensure test voltage is suitable for circuit'
        ],
        tools: ['Insulation resistance tester', 'Test leads', 'Calculator'],
        isRequired: true,
        estimatedTime: 15
      }
    ],
    prerequisites: [
      'Circuit isolated and locked off',
      'Sensitive equipment identified and protected',
      'Appropriate test voltage determined',
      'Environmental conditions noted'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 Section 612.3', 'GN3 Guidance Note 3']
  },
  {
    id: 'earth-fault-loop',
    name: 'Earth Fault Loop Impedance',
    type: 'earth-fault-loop',
    description: 'Measure earth fault loop impedance to verify protective device operation',
    difficulty: 'advanced',
    steps: [
      {
        id: 'preparation-zs',
        title: 'Test Preparation',
        description: 'Prepare for earth fault loop impedance testing',
        instructions: [
          'Ensure installation is energized and stable',
          'Connect test instrument according to manufacturer instructions',
          'Verify supply voltage is within ±10% of nominal',
          'Temporarily bypass RCD if required (with care)',
          'Check test instrument calibration date',
          'Record ambient temperature for corrections'
        ],
        expectedResult: 'Test setup complete and supply conditions verified',
        safetyNotes: [
          'Live testing - exercise extreme caution',
          'Use only approved test equipment',
          'Ensure good earth connection exists',
          'Be aware of RCD operation during testing'
        ],
        tools: ['Earth fault loop tester', 'Test leads', 'Voltage indicator'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'zs-measurement',
        title: 'Zs Measurement',
        description: 'Measure earth fault loop impedance at circuit extremities',
        instructions: [
          'Select appropriate test current (typically 15-25A)',
          'Connect test leads to line, neutral and earth terminals',
          'Initiate test sequence and record Zs value',
          'Apply 80% rule for BS 7671 compliance verification',
          'Test at furthest point of circuit',
          'Compare result with maximum permitted values'
        ],
        expectedResult: 'Zs × 0.8 ≤ maximum values in BS 7671 Appendix 3',
        safetyNotes: [
          'Limit test duration to prevent overheating',
          'Ensure stable supply during measurement',
          'Be prepared for protective device operation'
        ],
        tools: ['Earth fault loop tester', 'BS 7671 Appendix 3'],
        isRequired: true,
        estimatedTime: 10
      }
    ],
    prerequisites: [
      'Installation energized with stable supply',
      'Protective devices operational',
      'Earth fault path verified as complete',
      'Test equipment calibrated and suitable'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 Section 612.9', 'GN3 Guidance Note 3']
  },
  {
    id: 'rcd-testing',
    name: 'RCD Testing',
    type: 'rcd-test',
    description: 'Test RCD operation times and sensitivity in accordance with BS 7671',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'rcd-prep',
        title: 'RCD Test Preparation',
        description: 'Prepare for comprehensive RCD testing',
        instructions: [
          'Identify RCD type, rating and number of poles',
          'Ensure RCD is energized and reset',
          'Test manual test button operation',
          'Connect RCD tester with correct polarity',
          'Verify no load current flowing',
          'Record RCD nameplate details'
        ],
        expectedResult: 'RCD functional with test equipment correctly connected',
        safetyNotes: [
          'Verify correct test lead polarity',
          'Ensure RCD rating matches test requirements',
          'Do not exceed RCD current ratings'
        ],
        tools: ['RCD tester', 'Test leads', 'RCD schedule'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'rcd-trip-test',
        title: 'RCD Operation Time Tests',
        description: 'Test RCD trip times at various test currents',
        instructions: [
          'Test at 50% rated current - RCD should NOT trip',
          'Test at 100% rated current - should trip ≤300ms',
          'Test at 150% rated current - should trip ≤300ms',
          'Test at 500% rated current - should trip ≤40ms',
          'Test both positive and negative half cycles',
          'Record all trip times and verify compliance'
        ],
        expectedResult: 'All tests within BS EN 61008/61009 time limits',
        safetyNotes: [
          'Reset RCD between each test',
          'Allow cooling time between high current tests',
          'Monitor for signs of RCD distress'
        ],
        tools: ['RCD tester', 'BS EN standards'],
        isRequired: true,
        estimatedTime: 20
      }
    ],
    prerequisites: [
      'RCD in good working order',
      'Supply voltage stable and within limits',
      'Load conditions suitable for testing',
      'Test button operation verified'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 Section 612.13', 'BS EN 61008', 'BS EN 61009']
  },
  {
    id: 'polarity-test',
    name: 'Polarity Testing',
    type: 'polarity',
    description: 'Verify correct polarity of single-pole devices and accessories',
    difficulty: 'beginner',
    steps: [
      {
        id: 'polarity-prep',
        title: 'Polarity Test Setup',
        description: 'Prepare circuit for polarity verification',
        instructions: [
          'Isolate circuit at distribution board',
          'Identify all single-pole switching devices',
          'Locate socket outlets and accessories',
          'Connect test instrument leads appropriately',
          'Ensure all switches are in OFF position',
          'Prepare polarity test schedule'
        ],
        expectedResult: 'Circuit prepared for systematic polarity checking',
        safetyNotes: [
          'Circuit must remain isolated throughout test',
          'Verify isolation before commencing testing',
          'Use proved test equipment'
        ],
        tools: ['Continuity tester', 'Test leads', 'Polarity schedule'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'polarity-check',
        title: 'Polarity Verification',
        description: 'Systematically check polarity of all single-pole devices',
        instructions: [
          'Test continuity from line at origin to switch line terminal',
          'Verify NO continuity between switch and neutral/earth',
          'Check socket outlets for correct terminal connections',
          'Test lamp holders for correct polarity',
          'Verify fuse and MCB connections to line only',
          'Document any incorrect connections found'
        ],
        expectedResult: 'Line conductor connected only to appropriate terminals',
        safetyNotes: [
          'Double-check circuit isolation',
          'Mark incorrect connections for immediate rectification',
          'Do not energize until faults corrected'
        ],
        tools: ['Continuity tester', 'Circuit diagrams'],
        isRequired: true,
        estimatedTime: 20
      }
    ],
    prerequisites: [
      'Circuit safely isolated and locked off',
      'Single-pole devices identified and accessible',
      'Circuit documentation available',
      'Test equipment verified as functional'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 Section 612.6']
  }
];
