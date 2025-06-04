
import { TestStep } from '@/types/inspection-testing';

export const enhancedSafeIsolationSteps: TestStep[] = [
  {
    id: 'safe-isolation-selection',
    title: 'Supply Type Identification and Isolation Planning',
    description: 'Identify the electrical supply type and plan the appropriate isolation procedure',
    instructions: [
      'Examine the electrical installation and identify the supply type (single-phase or three-phase)',
      'Locate the main isolation point(s) for the circuits to be tested',
      'Check for multiple supplies or alternative feeds that may require isolation',
      'Verify the isolation method is appropriate for the installation type',
      'Ensure all relevant personnel are notified before isolation begins',
      'Document the supply characteristics and planned isolation sequence'
    ],
    expectedResult: 'Supply type identified and isolation procedure planned',
    safetyNotes: [
      'Always assume live until proven otherwise',
      'Check for multiple supplies before beginning isolation',
      'Notify all affected personnel before isolation'
    ],
    tools: ['Installation drawings', 'Circuit schedules', 'Voltage indicator'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'safe-isolation-single-phase',
    title: 'Single-Phase Safe Isolation Procedure',
    description: 'Complete safe isolation procedure for single-phase electrical supply',
    instructions: [
      'Select appropriate isolation point (main switch, MCB, or fuse)',
      'Switch OFF or remove the protective device serving the circuit',
      'Lock OFF the protective device using appropriate lock-off procedure',
      'Display warning notice indicating work in progress',
      'Test voltage indicator on known live source to prove it is working',
      'Test for voltage between Line and Neutral at point of work',
      'Test for voltage between Line and Earth at point of work',
      'Test for voltage between Neutral and Earth at point of work',
      'Re-prove voltage indicator on known live source',
      'Apply additional precautions if working on stored energy equipment'
    ],
    expectedResult: 'Circuit confirmed dead and secured against re-energization',
    safetyNotes: [
      'Use only GS 38 compliant voltage indicators',
      'Always prove your tester before and after use',
      'Test all conductor combinations',
      'Maintain lock-off until work is complete'
    ],
    tools: ['GS 38 voltage indicator', 'Proving unit', 'Lock-off devices', 'Warning labels'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'safe-isolation-three-phase',
    title: 'Three-Phase Safe Isolation Procedure',
    description: 'Complete safe isolation procedure for three-phase electrical supply',
    instructions: [
      'Identify all three phases (L1, L2, L3) and neutral conductor',
      'Switch OFF the three-phase protective device or isolator',
      'Lock OFF all poles of the protective device',
      'Display warning notices on all relevant points',
      'Test voltage indicator on known live source to prove it is working',
      'Test for voltage between each phase: L1-L2, L2-L3, L3-L1',
      'Test for voltage between each phase and neutral: L1-N, L2-N, L3-N',
      'Test for voltage between each phase and earth: L1-E, L2-E, L3-E',
      'Test for voltage between neutral and earth: N-E',
      'Re-prove voltage indicator on known live source',
      'Verify no induced voltages from adjacent circuits'
    ],
    expectedResult: 'All three phases confirmed dead and secured against re-energization',
    safetyNotes: [
      'Test all phase combinations - total of 7 tests required',
      'Watch for induced voltages from parallel circuits',
      'Ensure all phases are locked off simultaneously',
      'Be aware of stored energy in capacitors and inductors'
    ],
    tools: ['GS 38 voltage indicator', 'Proving unit', 'Multi-pole lock-off devices', 'Warning labels'],
    isRequired: true,
    estimatedTime: 20
  }
];

export const enhancedContinuitySteps: TestStep[] = [
  {
    id: 'continuity-equipment-setup',
    title: 'Continuity Test Equipment Setup and Calibration',
    description: 'Prepare and calibrate low resistance ohmmeter for accurate continuity testing',
    instructions: [
      'Select appropriate continuity tester with minimum 200mA test current',
      'Check test equipment calibration certificate is current',
      'Zero the test leads by connecting them together and noting reading',
      'Verify test equipment operation with known resistance values',
      'Set up test leads with appropriate safety ratings',
      'Ensure test probes are clean and making good contact',
      'Record equipment details and calibration status'
    ],
    expectedResult: 'Test equipment calibrated and ready for accurate measurements',
    safetyNotes: [
      'Ensure circuit is isolated before connecting test equipment',
      'Use test current of at least 200mA for protective conductor testing',
      'Account for test lead resistance in final readings'
    ],
    tools: ['Low resistance ohmmeter', 'Calibrated test leads', 'Test certificates'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'protective-conductor-continuity',
    title: 'Protective Conductor Continuity Testing',
    description: 'Test continuity of all protective conductors (earth) throughout the installation',
    instructions: [
      'Connect test leads between main earthing terminal and each earth point',
      'Test earth continuity at every socket outlet, switch, and fixture',
      'Record resistance values for each protective conductor',
      'Pay special attention to connection quality at distribution boards',
      'Test earth continuity in metallic conduit and trunking systems',
      'Verify supplementary bonding connections where required',
      'Compare readings with expected values based on cable length and CSA',
      'Investigate any readings significantly higher than expected'
    ],
    expectedResult: 'All protective conductors confirmed continuous with acceptable resistance',
    safetyNotes: [
      'High resistance readings indicate poor connections',
      'Broken protective conductors create serious safety hazards',
      'Re-test any suspect connections after maintenance'
    ],
    tools: ['Low resistance ohmmeter', 'Circuit schedules', 'Cable data sheets'],
    isRequired: true,
    estimatedTime: 25
  },
  {
    id: 'ring-circuit-continuity',
    title: 'Ring Circuit Continuity Testing (R1+R2 Method)',
    description: 'Comprehensive testing of ring final circuits using the R1+R2 method',
    instructions: [
      'Identify ring circuit at distribution board - locate both ends',
      'Disconnect line, neutral, and earth conductors at distribution board',
      'Measure end-to-end resistance of line conductors (both legs)',
      'Measure end-to-end resistance of neutral conductors (both legs)',
      'Measure end-to-end resistance of earth conductors (both legs)',
      'Cross-connect line and neutral at one end of ring',
      'Test resistance between line and neutral at each socket outlet',
      'Record R1+R2 values - should be approximately same at each point',
      'Check for interconnections between rings',
      'Verify no spurious connections exist',
      'Calculate expected R1+R2 value: (R1+R2)/4',
      'Reconnect all conductors ensuring correct polarity'
    ],
    expectedResult: 'Ring circuit continuity confirmed with uniform R1+R2 values throughout',
    safetyNotes: [
      'Ensure ring is completely isolated before testing',
      'Variation in R1+R2 readings indicates ring defects',
      'Check all connections are secure before re-energizing'
    ],
    tools: ['Low resistance ohmmeter', 'Circuit identification equipment', 'Terminal blocks'],
    isRequired: true,
    estimatedTime: 30
  },
  {
    id: 'bonding-conductor-continuity',
    title: 'Main and Supplementary Bonding Continuity',
    description: 'Test continuity of main equipotential bonding and supplementary bonding conductors',
    instructions: [
      'Locate main equipotential bonding conductor at consumer unit/distribution board',
      'Test continuity between main earthing terminal and gas meter',
      'Test continuity between main earthing terminal and water service pipe',
      'Test continuity between main earthing terminal and oil service pipe (if present)',
      'Test continuity between main earthing terminal and structural steelwork',
      'In bathrooms, test supplementary bonding between metal parts',
      'Test bonding of exposed-conductive-parts to protective conductors',
      'Verify bonding conductor sizes meet BS 7671 requirements',
      'Check bonding connections are mechanically and electrically sound',
      'Record all bonding conductor resistance values'
    ],
    expectedResult: 'All bonding conductors confirmed continuous with appropriate resistance values',
    safetyNotes: [
      'Poor bonding can create dangerous potential differences',
      'Supplementary bonding may be omitted if conditions are met',
      'Gas and water companies have specific bonding requirements'
    ],
    tools: ['Low resistance ohmmeter', 'BS 7671', 'Bonding conductor charts'],
    isRequired: true,
    estimatedTime: 20
  }
];

export const enhancedInsulationSteps: TestStep[] = [
  {
    id: 'insulation-preparation',
    title: 'Equipment Preparation for Insulation Resistance Testing',
    description: 'Systematically prepare installation for safe insulation resistance testing',
    instructions: [
      'Identify and disconnect all electronic equipment and controls',
      'Remove or isolate surge protection devices (SPDs)',
      'Switch OFF all electronic switches and dimmers',
      'Disconnect or bypass any equipment with semiconductor components',
      'Remove indicator lamps and pilot lights where practical',
      'Ensure all switches in circuits are in ON position',
      'Link line and neutral conductors at distribution board if testing L+N to E',
      'Document all disconnections for later reconnection',
      'Verify test voltage (500V DC for most installations)',
      'Check insulation tester calibration and operation'
    ],
    expectedResult: 'Installation prepared for safe insulation resistance testing without equipment damage',
    safetyNotes: [
      'Electronic equipment can be damaged by test voltage',
      'SPDs will conduct during insulation testing',
      'Always document what you disconnect'
    ],
    tools: ['Insulation resistance tester', 'Circuit diagrams', 'Equipment manuals'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'insulation-resistance-testing',
    title: 'Comprehensive Insulation Resistance Testing',
    description: 'Systematic testing of insulation resistance between all conductor combinations',
    instructions: [
      'Set insulation tester to 500V DC (or 250V for SELV circuits)',
      'Test insulation resistance between Line and Neutral conductors',
      'Test insulation resistance between Line and Earth conductors',
      'Test insulation resistance between Neutral and Earth conductors',
      'For three-phase installations, test all combinations: L1-L2, L2-L3, L3-L1',
      'Test each combination for minimum 1 minute or until stable reading',
      'Record all readings ensuring they meet minimum requirements',
      'Test each circuit separately for fault location if required',
      'Pay attention to environmental conditions affecting readings',
      'Re-test any circuits showing marginal readings'
    ],
    expectedResult: 'All insulation resistance values exceed minimum requirements (≥1MΩ for most circuits)',
    safetyNotes: [
      'Minimum 1MΩ required for circuits up to 500V',
      'SELV/PELV circuits may have different requirements',
      'Moisture can significantly reduce insulation resistance'
    ],
    tools: ['500V insulation resistance tester', 'Test record sheets', 'BS 7671 Table 61'],
    isRequired: true,
    estimatedTime: 25
  },
  {
    id: 'insulation-fault-investigation',
    title: 'Insulation Fault Investigation and Resolution',
    description: 'Investigate and resolve any insulation resistance failures found during testing',
    instructions: [
      'Identify circuits with insulation resistance below minimum values',
      'Isolate each circuit individually to locate the fault',
      'Systematically disconnect sections of circuit to narrow down fault location',
      'Check for moisture ingress in external accessories and junction boxes',
      'Inspect cable runs for damage, particularly at bends and entries',
      'Examine terminations for tracking or carbonization',
      'Test individual cables if fault cannot be located',
      'Replace or repair faulty cables/equipment as necessary',
      'Re-test after repairs to confirm compliance',
      'Document all faults found and remedial action taken'
    ],
    expectedResult: 'All insulation faults located and rectified, with compliant test results achieved',
    safetyNotes: [
      'Low insulation resistance indicates potential shock hazard',
      'Faults may worsen over time if not addressed',
      'Environmental factors can cause temporary failures'
    ],
    tools: ['Insulation tester', 'Cable locator', 'Inspection tools', 'Replacement materials'],
    isRequired: true,
    estimatedTime: 30
  }
];

export const enhancedZsTestingSteps: TestStep[] = [
  {
    id: 'external-earthing-measurement',
    title: 'External Earth Fault Loop Impedance (Ze) Measurement',
    description: 'Measure the external earth fault loop impedance at the origin of the installation',
    instructions: [
      'Ensure main switch is ON and installation is energized',
      'Connect earth fault loop impedance tester between incoming line and earth',
      'Select appropriate test method (high current for non-RCD supplies)',
      'Record Ze value at main earthing terminal',
      'Compare reading with distribution company data if available',
      'Note supply type (TN-S, TN-C-S, TT) and earthing arrangement',
      'Check for parallel earth paths that might affect reading',
      'Verify earth electrode resistance for TT systems',
      'Record environmental conditions that may affect measurement',
      'Document maximum permissible Ze for each protective device type'
    ],
    expectedResult: 'Ze measurement completed and recorded for installation design verification',
    safetyNotes: [
      'High Ze values may prevent protective device operation',
      'TT systems typically have higher Ze values',
      'Parallel earth paths can give misleadingly low readings'
    ],
    tools: ['Earth fault loop impedance tester', 'Installation data', 'BS 7671 tables'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'circuit-zs-measurement',
    title: 'Circuit Earth Fault Loop Impedance Testing',
    description: 'Test earth fault loop impedance at every point in each circuit',
    instructions: [
      'Select appropriate test method based on circuit protection type',
      'For RCD-protected circuits, use no-trip test method',
      'For non-RCD circuits, use high-current test for accuracy',
      'Test Zs at the furthest point of each circuit (highest impedance)',
      'Test at every socket outlet on ring circuits',
      'Record all Zs measurements with location identification',
      'Compare results with maximum permitted values for protective device',
      'Note any readings approaching or exceeding limits',
      'Account for temperature effects on cable resistance',
      'Calculate expected Zs using Ze + (R1+R2) for verification'
    ],
    expectedResult: 'All circuit Zs values within permitted limits for protective device operation',
    safetyNotes: [
      'High Zs prevents protective device operation in fault conditions',
      'No-trip testing may give slightly higher readings',
      'Temperature correction may be required for final assessment'
    ],
    tools: ['Earth fault loop impedance tester', 'Circuit schedules', 'Protective device data'],
    isRequired: true,
    estimatedTime: 35
  },
  {
    id: 'zs-verification-calculation',
    title: 'Zs Verification by Calculation Method',
    description: 'Verify earth fault loop impedance measurements using calculation method',
    instructions: [
      'Calculate expected Zs using formula: Zs = Ze + (R1+R2)',
      'Use measured Ze value from external earth fault loop test',
      'Use measured R1+R2 values from continuity testing',
      'Compare calculated values with measured Zs readings',
      'Investigate significant discrepancies between calculated and measured values',
      'Apply temperature correction factors where necessary',
      'Consider parallel earth paths in calculation if present',
      'Verify all calculations against BS 7671 maximum values',
      'Document calculation method and results',
      'Use calculation method where direct measurement impractical'
    ],
    expectedResult: 'Calculated Zs values verify measured results and confirm protective device compliance',
    safetyNotes: [
      'Calculation method may be less accurate than measurement',
      'Parallel paths can cause discrepancies',
      'Temperature effects must be considered'
    ],
    tools: ['Calculator', 'BS 7671 tables', 'Cable data', 'Test records'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'protective-device-verification',
    title: 'Protective Device Operation Verification',
    description: 'Verify that all protective devices will operate correctly based on Zs measurements',
    instructions: [
      'Identify protective device type and rating for each circuit',
      'Look up maximum Zs values from BS 7671 for each device',
      'Compare measured/calculated Zs with maximum permitted values',
      'Consider disconnection time requirements (0.4s or 5s)',
      'Apply temperature correction factors where required',
      'Check special requirements for socket outlet circuits',
      'Verify RCD operation where earth fault protection is provided by RCD',
      'Document any circuits where Zs exceeds permitted values',
      'Recommend remedial action for non-compliant circuits',
      'Complete protective device compliance summary'
    ],
    expectedResult: 'All protective devices verified to operate within required disconnection times',
    safetyNotes: [
      'Non-compliant Zs values create serious safety hazards',
      'Socket circuits require faster disconnection (0.4s)',
      'RCDs provide backup protection but Zs must still be considered'
    ],
    tools: ['BS 7671 Appendix 3', 'Protective device data', 'Test certificates'],
    isRequired: true,
    estimatedTime: 20
  }
];

export const enhancedRCDTestingSteps: TestStep[] = [
  {
    id: 'rcd-identification-preparation',
    title: 'RCD Identification and Test Preparation',
    description: 'Identify all RCDs in the installation and prepare for comprehensive testing',
    instructions: [
      'Locate all RCDs in the installation (main and circuit level)',
      'Identify RCD type (Type AC, A, F, or B) from marking or documentation',
      'Record RCD rated residual operating current (IΔn) - typically 30mA',
      'Note rated voltage and number of poles for each RCD',
      'Check RCD is energized and reset if necessary',
      'Verify test equipment is suitable for RCD type and rating',
      'Ensure test will not cause loss of supply to essential services',
      'Select appropriate test point (usually furthest socket on protected circuit)',
      'Connect RCD tester ensuring correct polarity and phase selection',
      'Record ambient temperature and environmental conditions'
    ],
    expectedResult: 'All RCDs identified and test equipment correctly connected',
    safetyNotes: [
      'RCD testing will cause temporary loss of supply',
      'Notify occupants before testing begins',
      'Check for equipment that should not be switched off'
    ],
    tools: ['RCD tester', 'Circuit charts', 'RCD identification labels'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'rcd-operation-testing',
    title: 'RCD Electrical Operation Testing',
    description: 'Perform comprehensive electrical testing of RCD operation characteristics',
    instructions: [
      'Test at 50% of rated current (½ × IΔn) - RCD should NOT operate',
      'Test at 100% of rated current (1 × IΔn) - RCD must operate within 300ms',
      'Test at 500% of rated current (5 × IΔn) - RCD must operate within 40ms',
      'Test both positive and negative half cycles if RCD tester permits',
      'For Type A RCDs, test with pulsating DC current if equipment available',
      'Record all trip times and verify compliance with standards',
      'Test RCD mechanical test button to verify operation',
      'Reset RCD after each test and verify normal operation',
      'Repeat tests if readings are marginal or inconsistent',
      'Test ramp function if available to determine exact trip current'
    ],
    expectedResult: 'All RCD tests within acceptable limits proving correct operation',
    safetyNotes: [
      'RCD must trip within specified times for effective protection',
      'Mechanical test button only tests mechanics, not electrical operation',
      'Failed RCD tests indicate life safety hazard'
    ],
    tools: ['RCD tester with multiple test functions', 'Test record sheets', 'Stopwatch'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'rcd-discrimination-testing',
    title: 'RCD Discrimination and Selectivity Testing',
    description: 'Test RCD discrimination to ensure correct operation in installations with multiple RCDs',
    instructions: [
      'Identify upstream and downstream RCDs in the installation',
      'Test downstream RCD first at standard test currents',
      'Verify upstream RCD does not trip during downstream RCD testing',
      'Test at discrimination current level if RCDs are time-delayed type',
      'Check manufacturer specifications for discrimination requirements',
      'Test unwanted tripping under normal load conditions',
      'Verify RCD coordination with other protective devices',
      'Test for nuisance tripping from harmonic currents if applicable',
      'Document discrimination test results and any issues found',
      'Recommend changes if discrimination is not achieved'
    ],
    expectedResult: 'RCD discrimination verified ensuring selective operation',
    safetyNotes: [
      'Poor discrimination can cause unnecessary supply interruptions',
      'Time-delayed RCDs require special testing procedures',
      'Harmonic currents can cause nuisance tripping'
    ],
    tools: ['RCD tester', 'Installation schematic', 'RCD coordination charts'],
    isRequired: true,
    estimatedTime: 25
  },
  {
    id: 'rcd-functionality-verification',
    title: 'RCD Functionality and Reset Verification',
    description: 'Verify complete RCD functionality including reset capability and indication',
    instructions: [
      'Test RCD mechanical test button monthly testing reminder',
      'Verify RCD reset mechanism operates smoothly without binding',
      'Check RCD trip indication (flag or window) operates correctly',
      'Test RCD under various load conditions within protected circuits',
      'Verify RCD contacts open and close correctly with clean break',
      'Check for any signs of overheating or deterioration',
      'Test RCD operation with realistic earth fault simulation',
      'Verify protection extends to all intended circuits',
      'Check RCD labeling is clear and correct',
      'Document any maintenance requirements or recommendations'
    ],
    expectedResult: 'RCD functionality fully verified with normal operation confirmed',
    safetyNotes: [
      'RCD must be tested regularly to ensure continued protection',
      'Any signs of deterioration require immediate attention',
      'Poor contacts can cause fire risk'
    ],
    tools: ['RCD tester', 'Visual inspection tools', 'Load testing equipment'],
    isRequired: true,
    estimatedTime: 15
  }
];

export const enhancedPolaritySteps: TestStep[] = [
  {
    id: 'polarity-test-preparation',
    title: 'Polarity Test Setup and Circuit Preparation',
    description: 'Prepare installation for comprehensive polarity testing of all circuits and devices',
    instructions: [
      'Ensure all circuits are isolated and proven dead',
      'Identify all single-pole switching devices in the installation',
      'Locate all Edison screw lampholders requiring polarity verification',
      'Prepare temporary links at distribution board for polarity testing',
      'Set up continuity tester with appropriate test leads',
      'Create systematic testing plan to cover all circuits',
      'Document circuit identification and switching arrangements',
      'Verify test equipment operation before commencing tests',
      'Ensure all switches are in OFF position before testing',
      'Prepare polarity test record sheets for documentation'
    ],
    expectedResult: 'Installation prepared for systematic polarity testing',
    safetyNotes: [
      'Circuits must be isolated before polarity testing',
      'Incorrect polarity creates serious safety hazards',
      'Systematic approach prevents missing critical points'
    ],
    tools: ['Continuity tester', 'Temporary links', 'Circuit schedules', 'Test leads'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'switch-polarity-testing',
    title: 'Single-Pole Switch and Control Device Polarity Testing',
    description: 'Test polarity of all single-pole switches to ensure they break the line conductor',
    instructions: [
      'Install temporary link between line and neutral at distribution board',
      'Test continuity from temporary link to switch terminals',
      'Verify switch breaks line conductor, not neutral',
      'Test all light switches in ON and OFF positions',
      'Check polarity of single-pole MCBs and fuses',
      'Test polarity of single-pole contactors and relators',
      'Verify correct connection of electronic switches and dimmers',
      'Test emergency stop switches and isolation switches',
      'Check polarity of any single-pole protective devices',
      'Document any polarity errors found and location'
    ],
    expectedResult: 'All single-pole switches confirmed to break line conductor only',
    safetyNotes: [
      'Switches must break line conductor for safety',
      'Neutral switching can leave circuits live when switched off',
      'Electronic devices may have specific polarity requirements'
    ],
    tools: ['Continuity tester', 'Circuit diagrams', 'Switch identification charts'],
    isRequired: true,
    estimatedTime: 25
  },
  {
    id: 'socket-outlet-polarity',
    title: 'Socket Outlet and Fixed Equipment Polarity Testing',
    description: 'Verify correct polarity connections at all socket outlets and fixed equipment',
    instructions: [
      'Test polarity at every socket outlet using continuity method',
      'Verify line conductor connects to correct pin/terminal',
      'Test neutral conductor connection to designated terminal',
      'Check earth connection to earth pin/terminal',
      'Use socket tester for quick verification where appropriate',
      'Test polarity of fixed equipment connections',
      'Verify polarity of equipment with polarized plugs',
      'Check three-phase socket outlets for phase rotation',
      'Test industrial connectors and CEE form sockets',
      'Document socket outlet test results and any errors'
    ],
    expectedResult: 'All socket outlets confirmed with correct polarity connections',
    safetyNotes: [
      'Incorrect socket polarity can damage equipment',
      'Phase rotation important for three-phase equipment',
      'Some equipment may not function with reverse polarity'
    ],
    tools: ['Continuity tester', 'Socket outlet tester', 'Phase rotation meter'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'lighting-circuit-polarity',
    title: 'Lighting Circuit and Edison Screw Lampholder Polarity',
    description: 'Test polarity of lighting circuits with special attention to Edison screw lampholders',
    instructions: [
      'Test polarity of all lighting circuits at each switching point',
      'Pay special attention to Edison screw (ES) lampholders',
      'Verify line conductor connects to center contact of ES holders',
      'Test neutral connection to screw thread of ES holders',
      'Check polarity of bayonet cap (BC) holders where relevant',
      'Test two-way and intermediate switching arrangements',
      'Verify polarity of emergency lighting circuits',
      'Check polarity of external lighting installations',
      'Test polarity of any lighting control systems',
      'Document all lighting polarity test results'
    ],
    expectedResult: 'All lighting circuits confirmed with correct polarity, ES holders safe',
    safetyNotes: [
      'ES lampholders with reverse polarity create shock risk',
      'Screw thread must be connected to neutral',
      'Emergency lighting polarity critical for operation'
    ],
    tools: ['Continuity tester', 'Lampholder adapters', 'Lighting circuit diagrams'],
    isRequired: true,
    estimatedTime: 15
  }
];
