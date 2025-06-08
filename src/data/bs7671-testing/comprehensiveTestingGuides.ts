
export interface TestStep {
  id: string;
  title: string;
  category: 'safety' | 'preparation' | 'testing' | 'recording';
  description: string;
  instructions: string[];
  safetyWarning?: string;
  expectedResults?: string[];
  troubleshooting?: string[];
}

export interface TestLimit {
  parameter: string;
  limit: string;
  unit: string;
}

export interface EnhancedTestGuide {
  id: string;
  title: string;
  description: string;
  purpose: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  steps: TestStep[];
  testLimits: TestLimit[];
  commonIssues: string[];
  regulationReferences: string[];
}

export const comprehensiveTestingGuides: EnhancedTestGuide[] = [
  {
    id: 'continuity-testing',
    title: 'Protective Conductor Continuity Testing',
    description: 'Complete step-by-step guide for testing protective conductor continuity in accordance with BS 7671',
    purpose: 'To verify the integrity of protective conductors and ensure they provide a continuous path to earth',
    difficulty: 'Beginner',
    duration: '15-20 minutes',
    testLimits: [
      { parameter: 'Resistance', limit: '0.05', unit: 'Ω per metre' },
      { parameter: 'Test Current', limit: '200', unit: 'mA minimum' }
    ],
    commonIssues: [
      'Poor connections at terminals',
      'Damaged cables during installation',
      'Inadequate bonding of metalwork'
    ],
    regulationReferences: ['BS 7671:2018 Section 612.2.1', 'GN3 Section 10.3'],
    steps: [
      {
        id: 'step-1',
        title: 'Safety Preparation',
        category: 'safety',
        description: 'Ensure the installation is safely isolated before beginning testing',
        instructions: [
          'Confirm the circuit is isolated at the distribution board',
          'Test the isolation with an approved voltage indicator',
          'Apply warning notices and locks where appropriate',
          'Ensure all persons are aware testing is taking place'
        ],
        safetyWarning: 'Never commence testing without confirming safe isolation. Always use a proven voltage indicator.',
        expectedResults: [
          'Circuit confirmed dead',
          'Warning notices in place',
          'Test area secured'
        ]
      },
      {
        id: 'step-2',
        title: 'Test Equipment Setup',
        category: 'preparation',
        description: 'Prepare and verify test equipment is functioning correctly',
        instructions: [
          'Select appropriate low-resistance ohmmeter',
          'Verify test instrument calibration is current',
          'Check test leads for damage and continuity',
          'Perform function test on the instrument'
        ],
        expectedResults: [
          'Calibrated test instrument ready',
          'Test leads verified as good',
          'Instrument self-test passed'
        ],
        troubleshooting: [
          'If leads show high resistance, replace immediately',
          'Ensure instrument battery level is adequate'
        ]
      },
      {
        id: 'step-3',
        title: 'Circuit Preparation',
        category: 'preparation',
        description: 'Prepare the circuit for testing by disconnecting appropriate conductors',
        instructions: [
          'Disconnect protective conductors from the main earthing terminal',
          'Identify all protective conductors in the circuit',
          'Remove any parallel paths that could affect readings',
          'Document the original connection arrangement'
        ],
        expectedResults: [
          'Protective conductors isolated',
          'Circuit ready for testing',
          'Original connections documented'
        ]
      },
      {
        id: 'step-4',
        title: 'Continuity Measurement',
        category: 'testing',
        description: 'Perform the actual continuity measurements',
        instructions: [
          'Connect test leads to each end of the protective conductor',
          'Take resistance measurement using appropriate range',
          'Record the reading on the test certificate',
          'Repeat for all protective conductors in the circuit'
        ],
        expectedResults: [
          'Resistance readings within acceptable limits',
          'All measurements recorded',
          'No open circuits detected'
        ],
        troubleshooting: [
          'High readings may indicate poor connections',
          'Infinite readings suggest open circuits',
          'Check for loose connections at accessories'
        ]
      },
      {
        id: 'step-5',
        title: 'Results Analysis',
        category: 'recording',
        description: 'Analyse test results and determine compliance',
        instructions: [
          'Compare readings with design expectations',
          'Verify readings are within BS 7671 limits',
          'Identify any readings requiring investigation',
          'Document any remedial work required'
        ],
        expectedResults: [
          'All readings satisfactory',
          'Results comply with BS 7671',
          'Certificate completed accurately'
        ]
      },
      {
        id: 'step-6',
        title: 'Circuit Restoration',
        category: 'preparation',
        description: 'Restore circuit connections and prepare for next test',
        instructions: [
          'Reconnect all protective conductors securely',
          'Verify all connections are tight',
          'Remove temporary disconnections',
          'Prepare for next test sequence'
        ],
        expectedResults: [
          'All connections restored',
          'Circuit ready for next test',
          'No loose connections present'
        ]
      }
    ]
  },
  {
    id: 'insulation-resistance',
    title: 'Insulation Resistance Testing',
    description: 'Comprehensive guide for testing insulation resistance between conductors and to earth',
    purpose: 'To verify the electrical insulation integrity of the installation and detect potential faults',
    difficulty: 'Intermediate',
    duration: '20-30 minutes',
    testLimits: [
      { parameter: 'SELV/PELV circuits', limit: '0.25', unit: 'MΩ minimum' },
      { parameter: 'Circuits up to 500V', limit: '1.0', unit: 'MΩ minimum' },
      { parameter: 'Circuits over 500V', limit: '1000V per kV', unit: 'operating voltage' }
    ],
    commonIssues: [
      'Moisture in cable installations',
      'Damaged cable insulation',
      'Inadequate separation of circuits'
    ],
    regulationReferences: ['BS 7671:2018 Section 612.3', 'GN3 Section 10.4'],
    steps: [
      {
        id: 'step-1',
        title: 'Pre-test Safety',
        category: 'safety',
        description: 'Ensure safe conditions before applying test voltage',
        instructions: [
          'Confirm circuit isolation is secure',
          'Remove or disconnect electronic equipment',
          'Check for presence of voltage-sensitive devices',
          'Ensure no personnel in contact with circuit'
        ],
        safetyWarning: 'High voltage test equipment can damage electronic devices and cause injury. Always ensure safe isolation.',
        expectedResults: [
          'Circuit confirmed isolated',
          'Electronic equipment protected',
          'Area secured for testing'
        ]
      },
      {
        id: 'step-2',
        title: 'Test Voltage Selection',
        category: 'preparation',
        description: 'Select appropriate test voltage based on circuit operating voltage',
        instructions: [
          'Identify the circuit operating voltage',
          'Select test voltage according to BS 7671 Table 61',
          'Set insulation tester to correct voltage',
          'Verify test voltage stability'
        ],
        expectedResults: [
          'Correct test voltage selected',
          'Instrument configured properly',
          'Test voltage verified stable'
        ]
      },
      {
        id: 'step-3',
        title: 'Line-to-Line Testing',
        category: 'testing',
        description: 'Test insulation resistance between line conductors',
        instructions: [
          'Connect test leads between line conductors',
          'Apply test voltage for minimum 1 minute',
          'Record stabilised reading',
          'Test all line conductor combinations'
        ],
        expectedResults: [
          'Readings above minimum values',
          'Stable readings achieved',
          'All combinations tested'
        ],
        troubleshooting: [
          'Low readings may indicate moisture ingress',
          'Gradually increasing readings suggest charging current',
          'Unstable readings require investigation'
        ]
      },
      {
        id: 'step-4',
        title: 'Line-to-Earth Testing',
        category: 'testing',
        description: 'Test insulation resistance from line conductors to earth',
        instructions: [
          'Connect test leads from line conductors to earth',
          'Apply test voltage for minimum 1 minute',
          'Record stabilised reading for each line',
          'Document any low readings for investigation'
        ],
        expectedResults: [
          'All readings above minimum limits',
          'Consistent readings between phases',
          'No indication of earth faults'
        ]
      }
    ]
  },
  {
    id: 'earth-fault-loop',
    title: 'Earth Fault Loop Impedance Testing',
    description: 'Step-by-step procedure for measuring earth fault loop impedance (Zs)',
    purpose: 'To verify that protective devices will operate within required time limits during earth fault conditions',
    difficulty: 'Advanced',
    duration: '25-35 minutes',
    testLimits: [
      { parameter: 'BS EN 60898 MCB (Type B)', limit: 'Varies by rating', unit: 'See BS 7671 Appendix 3' },
      { parameter: 'BS EN 60898 MCB (Type C)', limit: 'Varies by rating', unit: 'See BS 7671 Appendix 3' },
      { parameter: 'BS 88 Fuses', limit: 'Varies by rating', unit: 'See BS 7671 Appendix 3' }
    ],
    commonIssues: [
      'High earth loop impedance readings',
      'Variable readings due to supply conditions',
      'Incorrect protective device coordination'
    ],
    regulationReferences: ['BS 7671:2018 Section 612.9', 'GN3 Section 10.7'],
    steps: [
      {
        id: 'step-1',
        title: 'Circuit Analysis',
        category: 'preparation',
        description: 'Analyse circuit design and protective device requirements',
        instructions: [
          'Identify the protective device type and rating',
          'Determine maximum permitted Zs from BS 7671',
          'Check circuit design load and cable sizes',
          'Review any special requirements'
        ],
        expectedResults: [
          'Protective device identified',
          'Maximum Zs value established',
          'Circuit parameters understood'
        ]
      },
      {
        id: 'step-2',
        title: 'Test Method Selection',
        category: 'preparation',
        description: 'Choose appropriate test method based on circuit conditions',
        instructions: [
          'Assess if live testing is safe and appropriate',
          'Consider alternative methods if live testing unsuitable',
          'Select appropriate test instrument',
          'Plan test sequence to minimise disruption'
        ],
        expectedResults: [
          'Safe test method selected',
          'Appropriate instrument chosen',
          'Test sequence planned'
        ]
      },
      {
        id: 'step-3',
        title: 'Live Earth Loop Test',
        category: 'testing',
        description: 'Perform live earth fault loop impedance measurement',
        instructions: [
          'Connect earth loop tester to live circuit',
          'Ensure all loads are disconnected if required',
          'Initiate test and record Zs reading',
          'Apply temperature correction if necessary'
        ],
        safetyWarning: 'Live testing presents electrical shock risk. Use appropriate PPE and follow safe working procedures.',
        expectedResults: [
          'Zs reading obtained',
          'Reading within acceptable limits',
          'Temperature correction applied'
        ],
        troubleshooting: [
          'High readings may indicate poor earthing',
          'Ensure parallel earth paths are not affecting readings',
          'Check supply earthing arrangement'
        ]
      }
    ]
  }
];
