import { TestFlow } from '@/types/inspection-testing';
import { comprehensiveTestFlow } from './comprehensiveTestFlow';

export const testFlows: TestFlow[] = [
  // Add the comprehensive test flow first
  comprehensiveTestFlow,
  
  // Safe Isolation - Standalone procedure (appears first in individual tests)
  {
    id: 'safe-isolation-procedure',
    name: 'Safe Isolation Procedure',
    type: 'safe-isolation',
    description: 'Complete safe isolation procedure for electrical installations - the essential first step before any electrical work',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'isolation-planning',
        title: 'Pre-Isolation Planning and Permission',
        description: 'Essential planning and authorization before commencing isolation',
        instructions: [
          'Obtain written permission from the person in charge of the installation',
          'Notify all relevant personnel who may be affected by the isolation',
          'Identify the circuit(s) to be isolated using circuit schedules/drawings',
          'Confirm the location of isolation points (MCBs, switches, fuses)',
          'Ensure you have the correct tools and equipment for the isolation',
          'Check that isolation will not affect critical systems (fire alarms, emergency lighting)',
          'Plan the sequence of isolation if multiple circuits are involved',
          'Confirm emergency procedures are in place if needed'
        ],
        expectedResult: 'Authorization obtained and isolation plan confirmed with all stakeholders',
        safetyNotes: [
          'Never commence isolation without proper authorization',
          'Ensure all affected parties are notified in advance',
          'Have emergency contact numbers readily available',
          'Consider the impact on other building systems'
        ],
        tools: ['Circuit schedules', 'Installation drawings', 'Authorization forms', 'Communication device'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'supply-type-identification',
        title: 'Supply Type Identification',
        description: 'Identify the electrical supply type to determine appropriate isolation procedure',
        instructions: [
          'Examine the distribution board or consumer unit to identify supply type',
          'Count the number of incoming supply conductors',
          'Check the voltage markings on the main switch or incoming supply',
          'Verify if the supply is single-phase (230V L-N-E) or three-phase (400V L1-L2-L3-N-E)',
          'Note any special supply arrangements (IT systems, DC supplies, etc.)',
          'Document the supply characteristics for the isolation procedure',
          'Select the appropriate isolation method based on supply type'
        ],
        expectedResult: 'Supply type correctly identified and documented',
        safetyNotes: [
          'Never assume supply type - always verify before proceeding',
          'If in doubt about supply type, treat as three-phase for maximum safety',
          'Be aware of multiple supply sources in complex installations',
          'Check for backup supplies or UPS systems'
        ],
        tools: ['Voltage indicator', 'Circuit diagrams', 'Supply documentation'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'isolation-execution',
        title: 'Execute Isolation Procedure',
        description: 'Carry out the physical isolation of the electrical supply',
        instructions: [
          'Switch OFF the appropriate circuit breaker(s) or remove fuse(s)',
          'For three-phase supplies, ensure ALL phases are isolated',
          'Operate isolation devices in the correct sequence (load to supply)',
          'Verify the isolation device is in the OFF position',
          'Check that isolation devices are suitable for the circuit rating',
          'Ensure isolation points are clearly visible and accessible',
          'Record the position/identity of all isolation points used',
          'Take photographs of isolation points if required for documentation'
        ],
        expectedResult: 'All relevant circuits physically isolated at appropriate points',
        safetyNotes: [
          'Use only approved isolation devices suitable for the circuit',
          'Ensure isolation devices can be locked in the OFF position',
          'Never rely on switches that cannot be locked off',
          'Be prepared for arcing when operating under load'
        ],
        tools: ['Appropriate isolation tools', 'Circuit identification labels', 'Camera (if required)'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'secure-isolation',
        title: 'Secure the Isolation',
        description: 'Lock off isolation points and apply warning notices',
        instructions: [
          'Apply approved lock-off devices to all isolation points',
          'Use personal locks with unique keys - never share keys',
          'Attach danger/warning notices to all locked-off isolation points',
          'Ensure notices clearly state "DANGER - DO NOT SWITCH ON"',
          'Include contact details on warning notices for emergencies',
          'Record lock numbers and key holders in isolation log',
          'Photograph locked-off isolation points for records',
          'Brief other team members on isolation arrangements'
        ],
        expectedResult: 'All isolation points securely locked with appropriate warning notices',
        safetyNotes: [
          'Only the person who applied the lock should remove it',
          'Use robust lock-off devices suitable for the environment',
          'Ensure warning notices are weatherproof if used outdoors',
          'Never remove someone else\'s lock without proper procedures'
        ],
        tools: ['Personal safety locks', 'Lock-off devices', 'Danger notices', 'Permanent markers'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'voltage-tester-proving',
        title: 'Prove Voltage Tester Before Use',
        description: 'Test the voltage indicator on a known live source before dead testing',
        instructions: [
          'Select an approved voltage tester complying with GS 38',
          'Check the tester for any visible damage to case, leads, or probes',
          'Verify the tester is within calibration date',
          'Test the voltage indicator on a KNOWN LIVE source',
          'Confirm the tester indicates presence of voltage correctly',
          'Check both audio and visual indication systems work',
          'Test at the voltage level you expect to encounter',
          'Record the proving test in your documentation'
        ],
        expectedResult: 'Voltage tester proven to be working correctly on known live source',
        safetyNotes: [
          'NEVER proceed with dead testing unless tester is proven working',
          'Use only approved testers complying with GS 38',
          'Ensure proving source is definitely live and suitable',
          'If tester fails proving test, obtain alternative tester'
        ],
        tools: ['Approved voltage tester (GS 38)', 'Known live source', 'Testing log'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'dead-testing',
        title: 'Test Dead at Point of Work',
        description: 'Verify the circuit is dead at the actual work location',
        instructions: [
          'Go to the actual point where work will be carried out',
          'Test between Line and Neutral conductors',
          'Test between Line and Earth conductors',
          'Test between Neutral and Earth conductors',
          'For three-phase: test all phase combinations (L1-L2, L1-L3, L2-L3)',
          'For three-phase: test all phases to neutral and earth',
          'Ensure no voltage is detected on any combination',
          'Apply sustained test pressure for adequate contact'
        ],
        expectedResult: 'No voltage detected between any conductor combinations',
        safetyNotes: [
          'Test ALL possible conductor combinations systematically',
          'Maintain adequate test probe contact throughout test',
          'If ANY voltage is detected, STOP and investigate',
          'Be aware of induced voltages in long cable runs'
        ],
        tools: ['Proven voltage tester', 'GS 38 test probes', 'Testing checklist'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'voltage-tester-re-proving',
        title: 'Re-prove Voltage Tester After Dead Testing',
        description: 'Confirm the voltage tester is still working after dead testing',
        instructions: [
          'Return to the same KNOWN LIVE source used for initial proving',
          'Re-test the voltage indicator to confirm it still works correctly',
          'Verify both audio and visual indications are functioning',
          'Confirm the tester responds as expected to the live source',
          'If tester fails to indicate voltage, DO NOT proceed with work',
          'Record the re-proving test in documentation',
          'Only proceed with electrical work if re-proving is successful',
          'Store the proven tester safely for duration of work'
        ],
        expectedResult: 'Voltage tester confirmed working correctly after dead testing sequence',
        safetyNotes: [
          'This step is CRITICAL - never skip re-proving the tester',
          'If tester fails re-proving, repeat entire dead testing sequence',
          'A failed re-proving test invalidates all previous dead test results',
          'Keep the proven tester accessible throughout the work'
        ],
        tools: ['Voltage tester', 'Known live source', 'Testing documentation'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'additional-precautions',
        title: 'Apply Additional Safety Precautions',
        description: 'Implement additional safety measures before commencing work',
        instructions: [
          'Apply temporary equipotential bonding if required by risk assessment',
          'Install additional earth connections where specified',
          'Post warning notices at the point of work',
          'Set up barriers or screens to prevent accidental contact',
          'Ensure adequate lighting at the work location',
          'Brief all team members on the isolation arrangements',
          'Establish communication procedures during the work',
          'Confirm emergency procedures with all personnel'
        ],
        expectedResult: 'All additional safety precautions implemented and verified',
        safetyNotes: [
          'Additional precautions may be required by site-specific risk assessments',
          'Consider environmental factors (weather, location, etc.)',
          'Ensure all team members understand safety arrangements',
          'Maintain situational awareness throughout the work'
        ],
        tools: ['Temporary bonding leads', 'Warning notices', 'Barriers/screens', 'Communication devices'],
        isRequired: true,
        estimatedTime: 15
      }
    ],
    prerequisites: [
      'Completed safe isolation training and assessment',
      'Approved voltage tester (GS 38) calibrated within last 12 months',
      'Personal safety locks and lock-off devices available',
      'Warning notices and isolation documentation prepared',
      'Authorization to isolate obtained from responsible person',
      'Circuit identification and drawings available',
      'Emergency contact procedures established',
      'Risk assessment completed for the specific work'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 Section 514 (Isolation and Switching)',
      'HSE Guidance HSG85 (Electricity at Work - Safe Working Practices)',
      'Electricity at Work Regulations 1989',
      'GS 38 (Electrical Test Equipment for Use by Electricians)',
      'BS EN 60204-1 (Safety of machinery - Electrical equipment)',
      'IET Code of Practice for In-Service Inspection and Testing'
    ]
  },

  // ... keep existing code (continuity-test and other individual test flows)
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

  // ... keep existing code (all other test flows remain the same)
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
