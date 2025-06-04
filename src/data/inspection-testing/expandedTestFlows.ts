
import { TestFlow } from '@/types/inspection-testing';

export const expandedTestFlows: TestFlow[] = [
  {
    id: 'comprehensive-testing-enhanced',
    name: 'Complete Installation Testing Suite',
    type: 'all-tests',
    description: 'Comprehensive testing procedure covering all BS 7671 requirements with detailed guidance',
    difficulty: 'intermediate',
    isComprehensive: true,
    prerequisites: [
      'Valid electrical qualification',
      'Calibrated test equipment',
      'Installation drawings available',
      'Permit to work (if required)'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022',
      'GS 38 - Electrical test equipment for use by electricians',
      'IET Guidance Note 3 - Inspection & Testing'
    ],
    steps: [
      {
        id: 'pre-inspection-planning',
        title: 'Pre-Inspection Planning & Documentation Review',
        description: 'Review installation documentation and plan testing approach',
        instructions: [
          'Review electrical installation certificate or design drawings',
          'Identify circuit arrangements and protective devices',
          'Check test equipment calibration certificates',
          'Confirm permit to work requirements',
          'Plan testing sequence to minimize disruption'
        ],
        expectedResult: 'Complete understanding of installation layout and testing requirements',
        safetyNotes: [
          'Ensure all documentation is current and accurate',
          'Verify test equipment is within calibration period'
        ],
        tools: ['Installation drawings', 'Test equipment certificates', 'BS 7671 regulations'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'visual-inspection-detailed',
        title: 'Detailed Visual Inspection',
        description: 'Comprehensive visual examination of the electrical installation',
        instructions: [
          'Inspect consumer unit/distribution board condition',
          'Check cable routing and support systems',
          'Verify protective device ratings and types',
          'Examine earthing and bonding arrangements',
          'Check IP ratings and environmental protection',
          'Inspect accessory mounting and connections',
          'Verify warning labels and identification'
        ],
        expectedResult: 'All visible components comply with BS 7671 requirements',
        safetyNotes: [
          'Do not remove covers on live equipment',
          'Use appropriate PPE for inspection activities'
        ],
        tools: ['Torch/flashlight', 'Measuring tape', 'Camera (if required)'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'safe-isolation-procedure',
        title: 'Safe Isolation Procedure',
        description: 'Safely isolate circuits for dead testing',
        instructions: [
          'Identify circuit to be isolated using drawings',
          'Select appropriate isolation point',
          'Inform all affected persons of isolation',
          'Isolate circuit at distribution board',
          'Secure isolation (lock off if required)',
          'Test isolation using approved voltage indicator',
          'Prove voltage indicator on known live source'
        ],
        expectedResult: 'Circuit safely isolated and proven dead',
        safetyNotes: [
          'CRITICAL: Always prove dead before commencing work',
          'Use GS 38 compliant test equipment only',
          'Never assume isolation is effective without testing'
        ],
        tools: ['Approved voltage indicator', 'Lock-off devices', 'Proving unit'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'continuity-testing-comprehensive',
        title: 'Continuity Testing (R1+R2)',
        description: 'Test continuity of protective conductors',
        instructions: [
          'Connect test leads to line and CPC at distribution board',
          'Select appropriate test current (typically 200mA)',
          'Test each socket outlet and fixed equipment',
          'Record highest reading for each circuit',
          'Calculate R1+R2 values for comparison with Zs limits',
          'Test main equipotential bonding conductors',
          'Test supplementary bonding where installed'
        ],
        expectedResult: 'All continuity readings within acceptable limits',
        safetyNotes: [
          'Ensure circuit is isolated before testing',
          'Do not exceed maximum test current for cable size'
        ],
        tools: ['Low resistance ohmmeter', 'Test leads', 'Record sheets'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'insulation-resistance-testing',
        title: 'Insulation Resistance Testing',
        description: 'Test insulation between conductors and earth',
        instructions: [
          'Disconnect sensitive equipment and electronics',
          'Remove or bridge out surge protective devices',
          'Set test voltage (250V for SELV, 500V for up to 500V circuits)',
          'Test line to neutral, line to earth, neutral to earth',
          'Apply test voltage for minimum 1 minute',
          'Record minimum insulation resistance values',
          'Reconnect any disconnected items'
        ],
        expectedResult: 'Minimum 1MΩ for circuits up to 500V, 0.5MΩ for SELV/PELV',
        safetyNotes: [
          'Ensure all equipment that could be damaged is disconnected',
          'Warning notices should be displayed during testing'
        ],
        tools: ['Insulation resistance tester', 'Test leads', 'Warning notices'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'polarity-testing-detailed',
        title: 'Polarity Testing',
        description: 'Verify correct polarity of all circuits',
        instructions: [
          'Test at distribution board: line connected to line terminals',
          'Test at each outlet: line to switch line, neutral continuous',
          'Verify Edison screw lampholders: line to center contact',
          'Check single-pole devices break line conductor only',
          'Test socket outlets: line to correct pin (L to L)',
          'Verify RCBO and MCB connections',
          'Document any polarity errors found'
        ],
        expectedResult: 'All circuits correctly polarized throughout installation',
        safetyNotes: [
          'Test with circuit isolated',
          'Verify test results before re-energizing'
        ],
        tools: ['Continuity tester', 'Socket tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 12
      },
      {
        id: 'earth-fault-loop-impedance',
        title: 'Earth Fault Loop Impedance (Zs) Testing',
        description: 'Measure earth fault loop impedance for all circuits',
        instructions: [
          'Ensure circuit is energized and functional',
          'Connect Zs tester to circuit being tested',
          'Record Ze at origin of installation',
          'Test Zs at furthest point of each circuit',
          'Compare results with maximum values in BS 7671',
          'Consider temperature correction if required',
          'Test main equipotential bonding effectiveness'
        ],
        expectedResult: 'All Zs values within BS 7671 limits for protective device type',
        safetyNotes: [
          'Equipment under test - ensure safe working area',
          'Some testers may cause RCD operation during test'
        ],
        tools: ['Earth fault loop impedance tester', 'BS 7671 reference tables'],
        isRequired: true,
        estimatedTime: 18
      },
      {
        id: 'rcd-testing-comprehensive',
        title: 'RCD Testing (All Types)',
        description: 'Test all RCD devices for correct operation',
        instructions: [
          'Test RCD using test button - should trip',
          'Reset RCD and confirm normal operation',
          'Connect RCD tester to circuit protected by RCD',
          'Test at 50% rated current - should NOT trip',
          'Test at 100% rated current - should trip within time limit',
          'Test at 5x rated current - should trip within 40ms',
          'Record trip times and currents',
          'Test RCD effectiveness on all protected circuits'
        ],
        expectedResult: 'All RCDs operate within specified time and current limits',
        safetyNotes: [
          'Warn occupants that power will be interrupted during testing',
          'Reset any equipment that may be affected by power interruption'
        ],
        tools: ['RCD tester', 'Stopwatch', 'Test record sheets'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'functional-testing-detailed',
        title: 'Functional Testing of Installation',
        description: 'Test operation of all electrical equipment and controls',
        instructions: [
          'Test all lighting circuits and switching arrangements',
          'Verify socket outlet operation and correct wiring',
          'Test fixed equipment and controls',
          'Check emergency lighting operation and duration',
          'Test fire alarm systems if applicable',
          'Verify interlocks and safety systems',
          'Test any special installations (EV charging, etc.)'
        ],
        expectedResult: 'All equipment operates correctly and safely',
        safetyNotes: [
          'Ensure all personnel are clear of moving equipment during testing',
          'Follow manufacturer instructions for special equipment'
        ],
        tools: ['Socket tester', 'Proving unit', 'Manufacturer manuals'],
        isRequired: true,
        estimatedTime: 20
      },
      {
        id: 'documentation-completion',
        title: 'Test Documentation & Certification',
        description: 'Complete all required test documentation',
        instructions: [
          'Complete electrical installation certificate',
          'Record all test results accurately',
          'Calculate maximum Zs values where required',
          'Complete schedule of test results',
          'Provide operation and maintenance information',
          'Issue appropriate certificates to client',
          'Retain copies as required by regulations'
        ],
        expectedResult: 'Complete and accurate test documentation',
        safetyNotes: [
          'Ensure all test results are within acceptable limits before certification',
          'Do not certify work that does not comply with BS 7671'
        ],
        tools: ['Test certificates', 'Calculator', 'BS 7671 tables'],
        isRequired: true,
        estimatedTime: 15
      }
    ]
  },
  {
    id: 'safe-isolation-detailed',
    name: 'Safe Isolation Procedure (Detailed)',
    type: 'safe-isolation',
    description: 'Comprehensive safe isolation procedure following GS 38 guidance',
    difficulty: 'beginner',
    prerequisites: ['Basic electrical knowledge', 'GS 38 compliant test equipment'],
    regulatoryStandards: ['GS 38', 'BS 7671 Section 462'],
    steps: [
      {
        id: 'isolation-planning',
        title: 'Isolation Planning & Risk Assessment',
        description: 'Plan the isolation procedure and assess risks',
        instructions: [
          'Identify the exact circuit requiring isolation',
          'Locate appropriate isolation point in distribution board',
          'Assess who else may be affected by isolation',
          'Check for alternative supply routes',
          'Identify essential services that must remain live',
          'Plan communication with affected persons'
        ],
        expectedResult: 'Clear isolation plan with minimal disruption',
        safetyNotes: [
          'Never assume circuit layout matches drawings',
          'Consider emergency supplies and critical systems'
        ],
        tools: ['Circuit diagrams', 'Distribution board schedule'],
        isRequired: true,
        estimatedTime: 8
      },
      {
        id: 'isolation-notification',
        title: 'Notification & Communication',
        description: 'Inform all relevant parties of planned isolation',
        instructions: [
          'Notify building occupants of planned isolation',
          'Inform security/facilities management if applicable',
          'Check for any essential services affected',
          'Agree isolation timing with responsible person',
          'Display warning notices at isolation points',
          'Ensure emergency procedures are in place'
        ],
        expectedResult: 'All affected parties notified and agree to isolation',
        safetyNotes: [
          'Ensure life safety systems are not compromised',
          'Consider backup arrangements for critical equipment'
        ],
        tools: ['Warning notices', 'Communication devices'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'proving-unit-check',
        title: 'Test Equipment Verification',
        description: 'Verify test equipment operation before use',
        instructions: [
          'Visually inspect voltage indicator for damage',
          'Check test leads for damage or deterioration',
          'Test voltage indicator on known live source',
          'Verify display shows voltage reading clearly',
          'Check battery condition if applicable',
          'Ensure equipment complies with GS 38'
        ],
        expectedResult: 'Test equipment proven functional and safe',
        safetyNotes: [
          'Never use damaged test equipment',
          'Voltage indicators must be proven before and after use'
        ],
        tools: ['Voltage indicator', 'Proving unit', 'Known live source'],
        isRequired: true,
        estimatedTime: 3
      },
      {
        id: 'circuit-isolation',
        title: 'Circuit Isolation Procedure',
        description: 'Physically isolate the circuit at the distribution board',
        instructions: [
          'Access distribution board safely',
          'Identify correct protective device for circuit',
          'Switch OFF the protective device',
          'Apply lock-off device if required',
          'Tag the protective device with isolation notice',
          'Record time and date of isolation'
        ],
        expectedResult: 'Circuit physically isolated and secured',
        safetyNotes: [
          'Ensure correct PPE for distribution board work',
          'Verify you are isolating the correct circuit'
        ],
        tools: ['Lock-off devices', 'Isolation tags', 'PPE'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'dead-testing',
        title: 'Proving Dead Testing',
        description: 'Test circuit to prove it is dead',
        instructions: [
          'Test between line and neutral at circuit origin',
          'Test between line and earth at circuit origin',
          'Test between neutral and earth at circuit origin',
          'Test at the work location (furthest point)',
          'Test all phases if three-phase circuit',
          'Ensure NO voltage is present on any conductor'
        ],
        expectedResult: 'Zero voltage confirmed on all conductors',
        safetyNotes: [
          'CRITICAL: No work must commence until proven dead',
          'If ANY voltage is detected, do not proceed'
        ],
        tools: ['Voltage indicator', 'Test probes'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'proving-unit-recheck',
        title: 'Test Equipment Re-verification',
        description: 'Re-prove test equipment after dead testing',
        instructions: [
          'Test voltage indicator on known live source again',
          'Verify display shows voltage reading clearly',
          'Confirm equipment is still functioning correctly',
          'This proves the equipment worked throughout the test'
        ],
        expectedResult: 'Test equipment confirmed working after dead test',
        safetyNotes: [
          'Essential safety check - never omit this step',
          'If equipment fails to indicate known voltage, repeat dead test'
        ],
        tools: ['Voltage indicator', 'Proving unit'],
        isRequired: true,
        estimatedTime: 2
      },
      {
        id: 'work-authorization',
        title: 'Work Authorization & Safety Briefing',
        description: 'Authorize commencement of work on dead circuit',
        instructions: [
          'Confirm circuit is proven dead',
          'Brief all workers on safety requirements',
          'Explain emergency procedures',
          'Designate person responsible for isolation',
          'Issue permit to work if required',
          'Ensure isolation cannot be reversed without authorization'
        ],
        expectedResult: 'Safe working environment established',
        safetyNotes: [
          'Only authorized person should control isolation',
          'All workers must understand emergency procedures'
        ],
        tools: ['Permit to work forms', 'Safety briefing checklist'],
        isRequired: true,
        estimatedTime: 5
      }
    ]
  },
  {
    id: 'continuity-testing-detailed',
    name: 'Continuity Testing (R1+R2) - Complete Procedure',
    type: 'continuity',
    description: 'Detailed continuity testing procedure for protective conductors',
    difficulty: 'intermediate',
    prerequisites: ['Circuit isolation completed', 'Low resistance ohmmeter available'],
    regulatoryStandards: ['BS 7671 Section 612.2.1', 'IET Guidance Note 3'],
    steps: [
      {
        id: 'test-equipment-setup',
        title: 'Test Equipment Setup & Calibration Check',
        description: 'Prepare and verify test equipment for continuity testing',
        instructions: [
          'Check low resistance ohmmeter calibration certificate',
          'Verify test leads are in good condition',
          'Short test leads together and zero the instrument',
          'Set appropriate test current (typically 200mA)',
          'Check battery condition if applicable',
          'Record test equipment details'
        ],
        expectedResult: 'Test equipment ready and calibrated for accurate measurements',
        safetyNotes: [
          'Ensure circuit is isolated before connecting test equipment',
          'Use only calibrated test equipment'
        ],
        tools: ['Low resistance ohmmeter', 'Test leads', 'Calibration certificate'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'circuit-preparation',
        title: 'Circuit Preparation for Testing',
        description: 'Prepare circuit for continuity testing',
        instructions: [
          'Confirm circuit isolation is maintained',
          'Remove any parallel paths (link out switches if needed)',
          'Disconnect sensitive equipment if necessary',
          'Identify all outlets and equipment on circuit',
          'Plan testing route to cover all points',
          'Prepare test record sheets'
        ],
        expectedResult: 'Circuit ready for systematic continuity testing',
        safetyNotes: [
          'Maintain isolation throughout testing',
          'Record any modifications made for testing'
        ],
        tools: ['Circuit diagram', 'Test record sheet', 'Tools for disconnection'],
        isRequired: true,
        estimatedTime: 8
      },
      {
        id: 'line-cpc-testing',
        title: 'Line to CPC Continuity Testing',
        description: 'Test continuity between line and circuit protective conductor',
        instructions: [
          'Connect test leads to line and CPC at distribution board',
          'Test at each socket outlet on the circuit',
          'Test at each fixed equipment connection',
          'Record resistance reading at each point',
          'Note highest reading for comparison with Zs limits',
          'Test all switch positions if applicable'
        ],
        expectedResult: 'Continuous path confirmed between line and CPC throughout circuit',
        safetyNotes: [
          'Ensure good contact at test points',
          'Do not exceed safe test current for cable size'
        ],
        tools: ['Low resistance ohmmeter', 'Test probes', 'Record sheet'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'bonding-conductor-testing',
        title: 'Bonding Conductor Continuity',
        description: 'Test main and supplementary bonding conductors',
        instructions: [
          'Test main equipotential bonding conductors',
          'Measure from MET to each bonded service (gas, water, etc.)',
          'Test supplementary bonding in special locations',
          'Record all bonding conductor resistances',
          'Verify bonding connections are secure',
          'Check bonding conductor sizes comply with BS 7671'
        ],
        expectedResult: 'All bonding conductors provide continuous low resistance path',
        safetyNotes: [
          'Ensure bonding clamps are secure and clean',
          'Check for corrosion at connection points'
        ],
        tools: ['Low resistance ohmmeter', 'Test leads', 'Bonding schedule'],
        isRequired: true,
        estimatedTime: 12
      },
      {
        id: 'ring-circuit-testing',
        title: 'Ring Final Circuit Testing (if applicable)',
        description: 'Specific testing procedure for ring final circuits',
        instructions: [
          'Test continuity of ring line conductors (L1 to L2)',
          'Test continuity of ring neutral conductors (N1 to N2)',
          'Test continuity of ring CPC conductors (E1 to E2)',
          'Cross-connect and test (L1+N2) to (L2+N1) at each outlet',
          'Cross-connect and test (L1+E2) to (L2+E1) at each outlet',
          'Verify readings are consistent around the ring'
        ],
        expectedResult: 'Ring continuity confirmed with consistent readings',
        safetyNotes: [
          'Ring must be complete - any break indicates fault',
          'Spur circuits will show different readings'
        ],
        tools: ['Low resistance ohmmeter', 'Test leads', 'Ring circuit record'],
        isRequired: false,
        estimatedTime: 20
      },
      {
        id: 'result-analysis',
        title: 'Test Result Analysis & Documentation',
        description: 'Analyze test results and complete documentation',
        instructions: [
          'Compare all readings with expected values',
          'Calculate (R1+R2) for each circuit',
          'Verify readings will allow protective device operation',
          'Complete continuity test records',
          'Identify any circuits requiring remedial work',
          'Document any deviations or special conditions'
        ],
        expectedResult: 'All continuity tests within acceptable limits and properly documented',
        safetyNotes: [
          'High resistance readings may indicate poor connections',
          'Investigate any unexpected results before proceeding'
        ],
        tools: ['Calculator', 'BS 7671 tables', 'Test certificates'],
        isRequired: true,
        estimatedTime: 10
      }
    ]
  },
  {
    id: 'insulation-resistance-detailed',
    name: 'Insulation Resistance Testing - Complete',
    type: 'insulation-resistance',
    description: 'Comprehensive insulation resistance testing procedure',
    difficulty: 'intermediate',
    prerequisites: ['Circuit isolation', 'Insulation resistance tester', 'Equipment disconnection plan'],
    regulatoryStandards: ['BS 7671 Section 612.3', 'IET Guidance Note 3'],
    steps: [
      {
        id: 'pre-test-preparation',
        title: 'Pre-Test Equipment Preparation',
        description: 'Prepare installation for insulation resistance testing',
        instructions: [
          'Identify and disconnect sensitive electronic equipment',
          'Remove or bridge surge protective devices (SPDs)',
          'Disconnect or bridge indicator lights and pilot lights',
          'Remove electronic switches and dimmers temporarily',
          'Disconnect any equipment with capacitors',
          'Document all disconnections made'
        ],
        expectedResult: 'Installation prepared to prevent equipment damage during testing',
        safetyNotes: [
          'Label all disconnected items for reconnection',
          'Take photos if necessary to aid reconnection'
        ],
        tools: ['Tools for disconnection', 'Labels', 'Camera'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'test-voltage-selection',
        title: 'Test Voltage Selection',
        description: 'Select appropriate test voltage for circuits',
        instructions: [
          'SELV/PELV circuits (up to 50V): Use 250V DC test voltage',
          'Low voltage circuits (50-500V): Use 500V DC test voltage',
          'High voltage circuits (above 500V): Use 1000V DC test voltage',
          'Set insulation tester to correct voltage',
          'Verify test voltage with voltmeter if required',
          'Record test voltage used for each circuit'
        ],
        expectedResult: 'Correct test voltage selected for each circuit type',
        safetyNotes: [
          'Never exceed recommended test voltages',
          'Ensure no one can contact circuit during high voltage testing'
        ],
        tools: ['Insulation resistance tester', 'Circuit voltage information'],
        isRequired: true,
        estimatedTime: 5
      },
      {
        id: 'line-neutral-testing',
        title: 'Line to Neutral Insulation Testing',
        description: 'Test insulation between line and neutral conductors',
        instructions: [
          'Connect test leads to line and neutral at distribution board',
          'Ensure all switches are closed (on position)',
          'Apply test voltage for minimum 1 minute',
          'Read and record insulation resistance value',
          'Test should show >1MΩ for circuits up to 500V',
          'Test each circuit separately'
        ],
        expectedResult: 'Insulation resistance >1MΩ between line and neutral',
        safetyNotes: [
          'Warning: High voltage present during test',
          'Ensure test area is clear of personnel'
        ],
        tools: ['Insulation resistance tester', 'Test leads', 'Timer'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'line-earth-testing',
        title: 'Line to Earth Insulation Testing',
        description: 'Test insulation between line conductors and earth',
        instructions: [
          'Connect test leads to line and earth at distribution board',
          'Ensure neutral-earth link is disconnected if testing individual circuits',
          'Apply test voltage for minimum 1 minute',
          'Read and record insulation resistance value',
          'Test should show >1MΩ for circuits up to 500V',
          'Repeat for each line conductor in three-phase circuits'
        ],
        expectedResult: 'Insulation resistance >1MΩ between line and earth',
        safetyNotes: [
          'High voltage testing - maintain safe distances',
          'Restore neutral-earth links after testing'
        ],
        tools: ['Insulation resistance tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 10
      },
      {
        id: 'neutral-earth-testing',
        title: 'Neutral to Earth Insulation Testing',
        description: 'Test insulation between neutral and earth',
        instructions: [
          'Disconnect neutral-earth link at main distribution board',
          'Connect test leads to neutral and earth',
          'Apply test voltage for minimum 1 minute',
          'Read and record insulation resistance value',
          'Test should show >1MΩ for circuits up to 500V',
          'Reconnect neutral-earth link after testing'
        ],
        expectedResult: 'Insulation resistance >1MΩ between neutral and earth',
        safetyNotes: [
          'CRITICAL: Neutral-earth link must be restored after testing',
          'Installation will not be safe without neutral-earth link'
        ],
        tools: ['Insulation resistance tester', 'Test leads'],
        isRequired: true,
        estimatedTime: 8
      },
      {
        id: 'final-reconnection',
        title: 'Equipment Reconnection & Verification',
        description: 'Reconnect all disconnected equipment and verify operation',
        instructions: [
          'Reconnect all previously disconnected equipment',
          'Restore surge protective devices (SPDs)',
          'Reconnect electronic equipment and switches',
          'Verify all connections are secure',
          'Test basic operation of reconnected equipment',
          'Update test records with final configuration'
        ],
        expectedResult: 'All equipment reconnected and functioning normally',
        safetyNotes: [
          'Verify correct reconnection of all items',
          'Test equipment operation before completing certification'
        ],
        tools: ['Installation tools', 'Equipment manuals', 'Test equipment'],
        isRequired: true,
        estimatedTime: 12
      }
    ]
  }
];
