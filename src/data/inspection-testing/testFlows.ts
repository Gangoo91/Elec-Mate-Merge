
import { TestFlow } from '@/types/inspection-testing';

export const testFlows: TestFlow[] = [
  {
    id: 'continuity-test',
    name: 'Continuity Testing',
    type: 'continuity',
    description: 'Test the continuity of protective conductors and ring final circuit conductors',
    difficulty: 'beginner',
    prerequisites: [
      'Installation is isolated',
      'Test instrument is calibrated',
      'Circuit is de-energized'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 - 643.3.1'],
    steps: [
      {
        id: 'cont-step-1',
        title: 'Isolation and Safety',
        description: 'Ensure the installation is safely isolated',
        instructions: [
          'Switch off main isolator',
          'Lock off and tag the isolator',
          'Test for dead using approved voltage indicator',
          'Check voltage indicator on known live source'
        ],
        safetyNotes: [
          'Always follow safe isolation procedures',
          'Use appropriate PPE',
          'Verify test equipment is functioning'
        ],
        tools: ['Voltage indicator', 'Lock-off kit', 'PPE'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'cont-step-2',
        title: 'Test Instrument Setup',
        description: 'Set up continuity test instrument',
        instructions: [
          'Select appropriate continuity test function',
          'Check test leads for damage',
          'Verify instrument calibration date',
          'Perform instrument self-test if available'
        ],
        expectedResult: 'Test current between 4mA and 24mA',
        tools: ['Continuity tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 3
      },
      {
        id: 'cont-step-3',
        title: 'Protective Conductor Test',
        description: 'Test continuity of protective conductors',
        instructions: [
          'Connect test leads between main earthing terminal and exposed-conductive-parts',
          'Record resistance value',
          'Repeat for all circuits',
          'Compare with expected values'
        ],
        expectedResult: 'Resistance should be low (typically < 0.05Ω for domestic)',
        tools: ['Continuity tester'],
        isRequired: true,
        estimatedTime: 10
      }
    ]
  },
  {
    id: 'insulation-resistance',
    name: 'Insulation Resistance Testing',
    type: 'insulation-resistance',
    description: 'Measure insulation resistance between live conductors and earth',
    difficulty: 'intermediate',
    prerequisites: [
      'Installation is isolated',
      'All electronic equipment disconnected',
      'Lamps and equipment removed or isolated'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 - 643.3.2'],
    steps: [
      {
        id: 'ir-step-1',
        title: 'Preparation',
        description: 'Prepare installation for insulation resistance testing',
        instructions: [
          'Ensure installation is isolated',
          'Remove or isolate all electronic equipment',
          'Remove lamps from lampholders',
          'Ensure all switches are in ON position'
        ],
        safetyNotes: [
          'Electronic equipment can be damaged by test voltage',
          'Ensure proper isolation before testing'
        ],
        tools: ['Insulation resistance tester'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'ir-step-2',
        title: 'Test Voltage Selection',
        description: 'Select appropriate test voltage',
        instructions: [
          'For circuits up to 50V: use 250V test voltage',
          'For circuits 50V to 500V: use 500V test voltage',
          'For circuits above 500V: use 1000V test voltage',
          'Set test duration to 60 seconds minimum'
        ],
        expectedResult: 'Minimum 1MΩ for circuits up to 500V',
        tools: ['Insulation resistance tester'],
        isRequired: true,
        estimatedTime: 2
      },
      {
        id: 'ir-step-3',
        title: 'Live to Earth Test',
        description: 'Test insulation resistance from live conductors to earth',
        instructions: [
          'Connect test leads between line conductors (joined) and earth',
          'Apply test voltage for minimum 60 seconds',
          'Record stabilized reading',
          'Repeat for neutral to earth'
        ],
        expectedResult: 'Minimum 1MΩ (domestic), 2MΩ (commercial)',
        tools: ['Insulation resistance tester'],
        isRequired: true,
        estimatedTime: 5
      }
    ]
  },
  {
    id: 'earth-fault-loop',
    name: 'Earth Fault Loop Impedance',
    type: 'earth-fault-loop',
    description: 'Measure earth fault loop impedance to verify disconnection times',
    difficulty: 'advanced',
    prerequisites: [
      'Installation is energized',
      'RCD protection may need to be temporarily bypassed',
      'Appropriate test instrument available'
    ],
    regulatoryStandards: ['BS 7671:2018+A2:2022 - 643.3.3'],
    steps: [
      {
        id: 'efl-step-1',
        title: 'Pre-test Checks',
        description: 'Verify installation readiness for EFLI testing',
        instructions: [
          'Confirm installation is energized',
          'Check test instrument calibration',
          'Identify protective device characteristics',
          'Note any RCD protection that may interfere'
        ],
        safetyNotes: [
          'Installation must be live for this test',
          'Use appropriate safety procedures',
          'Be aware of RCD tripping during test'
        ],
        tools: ['EFLI tester', 'PPE'],
        isRequired: true,
        estimatedTime: 5
      }
    ]
  }
];
