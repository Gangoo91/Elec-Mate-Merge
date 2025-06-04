
import { TestFlow } from '@/types/inspection-testing';

export const testFlows: TestFlow[] = [
  {
    id: 'continuity-test',
    name: 'Continuity Testing',
    type: 'continuity',
    description: 'Test the continuity of protective conductors and bonding conductors',
    difficulty: 'beginner',
    steps: [
      {
        id: 'visual-inspection',
        title: 'Visual Inspection',
        description: 'Perform visual inspection of the circuit before testing',
        instructions: [
          'Ensure all electrical connections are secure',
          'Check for any visible damage to cables or equipment',
          'Verify protective conductor connections are intact',
          'Confirm circuit is isolated'
        ],
        expectedResult: 'All connections secure with no visible damage',
        safetyNotes: [
          'Ensure circuit is isolated before inspection',
          'Use appropriate PPE'
        ],
        tools: ['Visual inspection', 'Torch'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'continuity-measurement',
        title: 'Continuity Measurement',
        description: 'Measure the continuity of protective conductors',
        instructions: [
          'Connect test leads to the protective conductor',
          'Set multimeter to continuity/low resistance mode',
          'Take measurement between conductor ends',
          'Record the reading'
        ],
        expectedResult: 'Reading should be less than 0.05Ω for most circuits',
        safetyNotes: [
          'Ensure circuit is dead before connecting test equipment',
          'Do not exceed safe working limits'
        ],
        tools: ['Multimeter', 'Test leads'],
        isRequired: true,
        estimatedTime: 10
      }
    ],
    prerequisites: [
      'Circuit must be isolated',
      'Safe isolation procedure completed',
      'Test equipment calibrated'
    ],
    regulatoryStandards: ['BS 7671:2018', 'GN3']
  },
  {
    id: 'insulation-resistance',
    name: 'Insulation Resistance Testing',
    type: 'insulation-resistance',
    description: 'Test insulation resistance between conductors and earth',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'preparation',
        title: 'Test Preparation',
        description: 'Prepare the circuit for insulation resistance testing',
        instructions: [
          'Isolate the circuit under test',
          'Disconnect sensitive equipment',
          'Remove or bypass surge protection devices',
          'Ensure all switches are in the ON position'
        ],
        expectedResult: 'Circuit prepared and ready for testing',
        safetyNotes: [
          'Ensure all persons are clear of the circuit',
          'Warning notices should be posted'
        ],
        tools: ['Insulation resistance tester'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'insulation-test',
        title: 'Insulation Resistance Measurement',
        description: 'Perform insulation resistance test',
        instructions: [
          'Connect test leads between line and earth',
          'Set tester to appropriate voltage (250V/500V/1000V)',
          'Apply test voltage for required duration',
          'Record the insulation resistance value'
        ],
        expectedResult: 'Minimum 1MΩ for most installations',
        safetyNotes: [
          'Do not touch test leads during testing',
          'Allow capacitive discharge before disconnecting'
        ],
        tools: ['Insulation resistance tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 10
      }
    ],
    prerequisites: [
      'Circuit isolated and locked off',
      'Sensitive equipment disconnected',
      'Test voltage appropriate for installation'
    ],
    regulatoryStandards: ['BS 7671:2018', 'GN3']
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
          'Ensure installation is energised',
          'Connect test instrument to circuit',
          'Verify RCD is temporarily bypassed if required',
          'Check test instrument is functioning correctly'
        ],
        expectedResult: 'Test setup complete and safe',
        safetyNotes: [
          'Live testing - exercise extreme caution',
          'Use appropriate test equipment',
          'Ensure good earth connection'
        ],
        tools: ['Earth fault loop tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'zs-measurement',
        title: 'Zs Measurement',
        description: 'Measure the earth fault loop impedance',
        instructions: [
          'Select appropriate test current',
          'Initiate test sequence',
          'Record Zs value displayed',
          'Compare with maximum permitted values'
        ],
        expectedResult: 'Zs should be within permitted limits for protective device',
        safetyNotes: [
          'Do not exceed test duration limits',
          'Ensure stable supply during test'
        ],
        tools: ['Earth fault loop tester'],
        isRequired: true,
        estimatedTime: 5
      }
    ],
    prerequisites: [
      'Installation energised and stable',
      'Protective devices in service',
      'Test equipment calibrated'
    ],
    regulatoryStandards: ['BS 7671:2018', 'GN3']
  },
  {
    id: 'rcd-testing',
    name: 'RCD Testing',
    type: 'rcd-test',
    description: 'Test RCD operation times and trip currents',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'rcd-prep',
        title: 'RCD Test Preparation',
        description: 'Prepare for RCD testing',
        instructions: [
          'Identify RCD type and rating',
          'Ensure RCD is energised and reset',
          'Connect RCD tester correctly',
          'Verify test button operation'
        ],
        expectedResult: 'RCD ready for testing with test equipment connected',
        safetyNotes: [
          'Ensure correct polarity of test connections',
          'Do not exceed RCD ratings'
        ],
        tools: ['RCD tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'rcd-trip-test',
        title: 'RCD Trip Time Test',
        description: 'Test RCD trip times at various currents',
        instructions: [
          'Test at 50% rated current (should not trip)',
          'Test at 100% rated current (should trip in ≤300ms)',
          'Test at 500% rated current (should trip in ≤40ms)',
          'Record all trip times'
        ],
        expectedResult: 'All tests within specified time limits',
        safetyNotes: [
          'Reset RCD between tests',
          'Allow cooling time if multiple tests'
        ],
        tools: ['RCD tester'],
        isRequired: true,
        estimatedTime: 15
      }
    ],
    prerequisites: [
      'RCD in good working order',
      'Supply voltage stable',
      'Load conditions suitable for testing'
    ],
    regulatoryStandards: ['BS 7671:2018', 'BS EN 61008', 'BS EN 61009']
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
        description: 'Prepare circuit for polarity testing',
        instructions: [
          'Isolate circuit under test',
          'Identify single-pole switching devices',
          'Connect test instrument leads',
          'Ensure all switches are in OFF position'
        ],
        expectedResult: 'Circuit prepared for polarity verification',
        safetyNotes: [
          'Circuit must be isolated',
          'Verify isolation before testing'
        ],
        tools: ['Continuity tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'polarity-check',
        title: 'Polarity Verification',
        description: 'Check polarity of switches and accessories',
        instructions: [
          'Test continuity from line terminal at origin to switch contact',
          'Verify no continuity to neutral or earth',
          'Check all single-pole devices systematically',
          'Document any polarity errors found'
        ],
        expectedResult: 'Line conductor connected only to switch contacts',
        safetyNotes: [
          'Double-check isolation',
          'Mark any incorrect connections for rectification'
        ],
        tools: ['Continuity tester'],
        isRequired: true,
        estimatedTime: 15
      }
    ],
    prerequisites: [
      'Circuit safely isolated',
      'Single-pole devices identified',
      'Test equipment ready'
    ],
    regulatoryStandards: ['BS 7671:2018']
  }
];
