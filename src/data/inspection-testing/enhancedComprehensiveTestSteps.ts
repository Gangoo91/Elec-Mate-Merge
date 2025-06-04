
import { TestStep } from '@/types/inspection-testing';

export const enhancedSafeIsolationSteps: TestStep[] = [
  {
    id: 'safe-isolation-selection',
    title: 'Supply Type Identification and Isolation Planning',
    description: 'Identify the electrical supply type and plan the appropriate isolation procedure in accordance with GS 38',
    instructions: [
      'Examine the electrical installation and identify the supply type (single-phase or three-phase)',
      'Locate the main isolation point(s) for the circuits to be tested',
      'Check for multiple supplies or alternative feeds that may require isolation',
      'Verify the isolation method is appropriate for the installation type',
      'Ensure all relevant personnel are notified before isolation begins',
      'Document the supply characteristics and planned isolation sequence'
    ],
    expectedResult: 'Supply type identified and isolation procedure planned in accordance with safety requirements',
    safetyNotes: [
      'Always assume live until proven otherwise',
      'Check for multiple supplies before beginning isolation',
      'Notify all affected personnel before isolation'
    ],
    tools: ['Installation drawings', 'Circuit schedules', 'GS 38 voltage indicator'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'safe-isolation-single-phase',
    title: 'Single-Phase Safe Isolation Procedure (GS 38 Compliant)',
    description: 'Complete safe isolation procedure for single-phase electrical supply in accordance with GS 38 requirements',
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
    expectedResult: 'Circuit confirmed dead and secured against re-energisation',
    safetyNotes: [
      'Use only GS 38 compliant voltage indicators',
      'Always prove your tester before and after use',
      'Test all conductor combinations',
      'Maintain lock-off until work is complete'
    ],
    tools: ['GS 38 voltage indicator', 'Proving unit', 'Lock-off devices', 'Warning labels'],
    isRequired: true,
    estimatedTime: 12
  },
  {
    id: 'safe-isolation-three-phase',
    title: 'Three-Phase Safe Isolation Procedure (GS 38 Compliant)',
    description: 'Complete safe isolation procedure for three-phase electrical supply in accordance with GS 38 requirements',
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
    expectedResult: 'All three phases confirmed dead and secured against re-energisation',
    safetyNotes: [
      'Test all phase combinations - total of 7 tests required',
      'Watch for induced voltages from parallel circuits',
      'Ensure all phases are locked off simultaneously',
      'Be aware of stored energy in capacitors and inductors'
    ],
    tools: ['GS 38 voltage indicator', 'Proving unit', 'Multi-pole lock-off devices', 'Warning labels'],
    isRequired: true,
    estimatedTime: 18
  }
];

export const enhancedContinuitySteps: TestStep[] = [
  {
    id: 'continuity-equipment-setup',
    title: 'Continuity Test Equipment Setup and Calibration',
    description: 'Prepare and calibrate low resistance ohmmeter for accurate continuity testing in accordance with BS 7671',
    instructions: [
      'Select appropriate continuity tester with minimum 200mA test current capability',
      'Check test equipment calibration certificate is current and valid',
      'Zero the test leads by connecting them together and noting the reading',
      'Verify test equipment operation with known resistance values',
      'Set up test leads with appropriate safety ratings for the installation',
      'Ensure test probes are clean and making good electrical contact',
      'Record equipment details, serial numbers, and calibration status'
    ],
    expectedResult: 'Test equipment calibrated and ready for accurate resistance measurements',
    safetyNotes: [
      'Ensure circuit is isolated before connecting test equipment',
      'Use test current of at least 200mA for protective conductor testing',
      'Account for test lead resistance in final readings'
    ],
    tools: ['Low resistance ohmmeter', 'Calibrated test leads', 'Calibration certificates'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'protective-conductor-continuity',
    title: 'Protective Conductor Continuity Testing (CPC)',
    description: 'Test continuity of all protective conductors (earth) throughout the installation as required by BS 7671 Section 612.2',
    instructions: [
      'Connect test leads between main earthing terminal and each earth point',
      'Test earth continuity at every socket outlet, switch, and fixture systematically',
      'Record resistance values for each protective conductor with location reference',
      'Pay special attention to connection quality at distribution boards',
      'Test earth continuity in metallic conduit and trunking systems',
      'Verify supplementary bonding connections where required',
      'Compare readings with expected values based on cable length and CSA',
      'Investigate any readings significantly higher than expected values'
    ],
    expectedResult: 'All protective conductors confirmed continuous with acceptable resistance values',
    safetyNotes: [
      'High resistance readings indicate poor connections',
      'Broken protective conductors create serious safety hazards',
      'Re-test any suspect connections after maintenance'
    ],
    tools: ['Low resistance ohmmeter', 'Circuit schedules', 'Cable data sheets', 'BS 7671'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'ring-circuit-continuity',
    title: 'Ring Circuit Continuity Testing (R1+R2 Method)',
    description: 'Comprehensive testing of ring final circuits using the R1+R2 method as specified in BS 7671',
    instructions: [
      'Identify ring circuit at distribution board - locate both circuit ends',
      'Disconnect line, neutral, and earth conductors at distribution board',
      'Measure end-to-end resistance of line conductors (both legs of ring)',
      'Measure end-to-end resistance of neutral conductors (both legs of ring)',
      'Measure end-to-end resistance of earth conductors (both legs of ring)',
      'Cross-connect line and neutral at one end of the ring circuit',
      'Test resistance between line and neutral at each socket outlet on the ring',
      'Record R1+R2 values - should be approximately the same at each point',
      'Check for interconnections between different ring circuits',
      'Verify no spurious connections exist between circuits',
      'Calculate expected R1+R2 value using formula: (R1+R2)/4',
      'Reconnect all conductors ensuring correct polarity before re-energisation'
    ],
    expectedResult: 'Ring circuit continuity confirmed with uniform R1+R2 values throughout the ring',
    safetyNotes: [
      'Ensure ring circuit is completely isolated before testing',
      'Variation in R1+R2 readings indicates ring circuit defects',
      'Check all connections are secure before re-energising'
    ],
    tools: ['Low resistance ohmmeter', 'Circuit identification equipment', 'Terminal blocks'],
    isRequired: true,
    estimatedTime: 25
  },
  {
    id: 'bonding-conductor-continuity',
    title: 'Main and Supplementary Bonding Continuity',
    description: 'Test continuity of main equipotential bonding and supplementary bonding conductors as required by BS 7671',
    instructions: [
      'Locate main equipotential bonding conductor at consumer unit/distribution board',
      'Test continuity between main earthing terminal and incoming gas service pipe',
      'Test continuity between main earthing terminal and incoming water service pipe',
      'Test continuity between main earthing terminal and oil service pipe (where present)',
      'Test continuity between main earthing terminal and structural steelwork',
      'In special locations (e.g., bathrooms), test supplementary bonding between metal parts',
      'Test bonding of exposed-conductive-parts to protective conductors',
      'Verify bonding conductor sizes meet BS 7671 minimum requirements',
      'Check bonding connections are mechanically and electrically sound',
      'Record all bonding conductor resistance values with location details'
    ],
    expectedResult: 'All bonding conductors confirmed continuous with appropriate resistance values per BS 7671',
    safetyNotes: [
      'Poor bonding can create dangerous potential differences',
      'Supplementary bonding may be omitted if specific conditions are met',
      'Gas and water companies have specific bonding requirements'
    ],
    tools: ['Low resistance ohmmeter', 'BS 7671', 'Bonding conductor sizing charts'],
    isRequired: true,
    estimatedTime: 15
  }
];

export const enhancedInsulationSteps: TestStep[] = [
  {
    id: 'insulation-preparation',
    title: 'Equipment Preparation for Insulation Resistance Testing',
    description: 'Systematically prepare installation for safe insulation resistance testing to prevent equipment damage',
    instructions: [
      'Identify and disconnect all electronic equipment and electronic controls',
      'Remove or isolate surge protection devices (SPDs) from circuits under test',
      'Switch OFF all electronic switches, dimmer controls, and timer switches',
      'Disconnect or bypass any equipment containing semiconductor components',
      'Remove indicator lamps, pilot lights, and neon indicators where practical',
      'Ensure all switches in circuits under test are in the ON position',
      'Link line and neutral conductors at distribution board when testing L+N to E',
      'Document all disconnections made for subsequent reconnection',
      'Verify appropriate test voltage selection (500V DC for most installations)',
      'Check insulation tester calibration certificate and operational status'
    ],
    expectedResult: 'Installation prepared for safe insulation resistance testing without risk of equipment damage',
    safetyNotes: [
      'Electronic equipment can be permanently damaged by test voltage',
      'SPDs will conduct during insulation testing if not disconnected',
      'Always document disconnections to ensure proper reconnection'
    ],
    tools: ['Insulation resistance tester', 'Circuit diagrams', 'Equipment manuals', 'Labels'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'insulation-resistance-testing',
    title: 'Comprehensive Insulation Resistance Testing (BS 7671 Section 612.3)',
    description: 'Systematic testing of insulation resistance between all conductor combinations as required by BS 7671',
    instructions: [
      'Set insulation tester to 500V DC (or 250V for SELV/PELV circuits)',
      'Test insulation resistance between Line and Neutral conductors',
      'Test insulation resistance between Line and Earth conductors',
      'Test insulation resistance between Neutral and Earth conductors',
      'For three-phase installations, test all phase combinations: L1-L2, L2-L3, L3-L1',
      'Apply test voltage for minimum 1 minute or until stable reading achieved',
      'Record all readings ensuring they meet minimum requirements per BS 7671',
      'Test each circuit separately for fault location if overall readings are low',
      'Consider environmental conditions (temperature, humidity) affecting readings',
      'Re-test any circuits showing marginal or borderline readings'
    ],
    expectedResult: 'All insulation resistance values exceed minimum requirements (≥1MΩ for most circuits)',
    safetyNotes: [
      'Minimum 1MΩ required for circuits up to 500V nominal voltage',
      'SELV/PELV circuits may have lower minimum requirements (≥0.5MΩ)',
      'Moisture ingress can significantly reduce insulation resistance values'
    ],
    tools: ['500V insulation resistance tester', 'Test record sheets', 'BS 7671 Table 61'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'insulation-fault-investigation',
    title: 'Insulation Fault Investigation and Resolution',
    description: 'Investigate and resolve any insulation resistance failures found during testing',
    instructions: [
      'Identify circuits with insulation resistance below minimum acceptable values',
      'Isolate each circuit individually to locate the source of the fault',
      'Systematically disconnect sections of circuit to narrow down fault location',
      'Check for moisture ingress in external accessories and junction boxes',
      'Inspect cable runs for physical damage, particularly at bends and cable entries',
      'Examine terminations for tracking, carbonisation, or contamination',
      'Test individual cables if fault location cannot be determined',
      'Replace or repair faulty cables/equipment as necessary for compliance',
      'Re-test installation after repairs to confirm BS 7671 compliance',
      'Document all faults found and remedial action taken for records'
    ],
    expectedResult: 'All insulation faults located and rectified, with compliant test results achieved',
    safetyNotes: [
      'Low insulation resistance indicates potential electric shock hazard',
      'Insulation faults may worsen over time if not properly addressed',
      'Environmental factors can cause temporary insulation failures'
    ],
    tools: ['Insulation tester', 'Cable fault locator', 'Inspection tools', 'Replacement materials'],
    isRequired: true,
    estimatedTime: 30
  }
];

export const enhancedZsTestingSteps: TestStep[] = [
  {
    id: 'external-earthing-measurement',
    title: 'External Earth Fault Loop Impedance (Ze) Measurement',
    description: 'Measure the external earth fault loop impedance at the origin of the installation as required by BS 7671',
    instructions: [
      'Ensure main switch is ON and installation is properly energised',
      'Connect earth fault loop impedance tester between incoming line and main earth terminal',
      'Select appropriate test method (high current for non-RCD supplies)',
      'Record Ze value at the main earthing terminal of the installation',
      'Compare reading with distribution network operator data if available',
      'Note supply earthing system type (TN-S, TN-C-S, TT) and arrangement',
      'Check for parallel earth paths that might affect the reading',
      'For TT systems, verify earth electrode resistance separately',
      'Record environmental conditions that may affect the measurement',
      'Document maximum permissible Ze values for each protective device type used'
    ],
    expectedResult: 'Ze measurement completed and recorded for installation design verification purposes',
    safetyNotes: [
      'High Ze values may prevent protective device operation during fault conditions',
      'TT earthing systems typically exhibit higher Ze values than TN systems',
      'Parallel earth paths can give misleadingly low Ze readings'
    ],
    tools: ['Earth fault loop impedance tester', 'Installation data', 'BS 7671 Appendix 3'],
    isRequired: true,
    estimatedTime: 12
  },
  {
    id: 'circuit-zs-measurement',
    title: 'Circuit Earth Fault Loop Impedance Testing',
    description: 'Test earth fault loop impedance at every point in each circuit as required by BS 7671 Section 612.7',
    instructions: [
      'Select appropriate test method based on circuit protection type (RCD or non-RCD)',
      'For RCD-protected circuits, use no-trip test method to prevent nuisance operation',
      'For non-RCD circuits, use high-current test method for maximum accuracy',
      'Test Zs at the furthest point of each radial circuit (highest impedance point)',
      'Test Zs at every socket outlet on ring final circuits',
      'Record all Zs measurements with clear location identification',
      'Compare results with maximum permitted values for the protective device installed',
      'Note any readings approaching or exceeding regulatory limits',
      'Account for temperature effects on cable resistance where necessary',
      'Calculate expected Zs using Ze + (R1+R2) formula for verification purposes'
    ],
    expectedResult: 'All circuit Zs values confirmed within permitted limits for protective device operation',
    safetyNotes: [
      'High Zs values prevent protective device operation during fault conditions',
      'No-trip testing may give slightly higher readings than high-current testing',
      'Temperature correction factors may be required for final compliance assessment'
    ],
    tools: ['Earth fault loop impedance tester', 'Circuit schedules', 'Protective device data sheets'],
    isRequired: true,
    estimatedTime: 30
  },
  {
    id: 'zs-verification-calculation',
    title: 'Zs Verification by Calculation Method',
    description: 'Verify earth fault loop impedance measurements using calculation method as permitted by BS 7671',
    instructions: [
      'Calculate expected Zs values using the formula: Zs = Ze + (R1+R2)',
      'Use measured Ze value from external earth fault loop impedance test',
      'Use measured R1+R2 values obtained from continuity testing',
      'Compare calculated values with measured Zs readings for verification',
      'Investigate significant discrepancies between calculated and measured values',
      'Apply temperature correction factors where ambient conditions require it',
      'Consider the effect of parallel earth paths in calculations if present',
      'Verify all calculated values against BS 7671 maximum permissible values',
      'Document calculation methodology and results for compliance records',
      'Use calculation method where direct measurement is impractical'
    ],
    expectedResult: 'Calculated Zs values verify measured results and confirm protective device compliance',
    safetyNotes: [
      'Calculation method may be less accurate than direct measurement',
      'Parallel earth paths can cause significant discrepancies in calculations',
      'Temperature effects on conductor resistance must be properly considered'
    ],
    tools: ['Scientific calculator', 'BS 7671 tables', 'Cable technical data', 'Test record sheets'],
    isRequired: true,
    estimatedTime: 12
  },
  {
    id: 'protective-device-verification',
    title: 'Protective Device Operation Verification',
    description: 'Verify that all protective devices will operate correctly based on Zs measurements',
    instructions: [
      'Identify protective device type, rating, and characteristics for each circuit',
      'Look up maximum Zs values from BS 7671 Appendix 3 for each device',
      'Compare measured/calculated Zs values with maximum permitted values',
      'Consider disconnection time requirements (0.4s for socket circuits, 5s for others)',
      'Apply temperature correction factors where installation conditions require it',
      'Check special requirements for socket outlet circuits (0.4s disconnection)',
      'Verify RCD operation provides additional protection where earth fault protection relies on RCD',
      'Document any circuits where Zs values exceed permitted limits',
      'Recommend appropriate remedial action for any non-compliant circuits',
      'Complete comprehensive protective device compliance summary report'
    ],
    expectedResult: 'All protective devices verified to operate within required disconnection times per BS 7671',
    safetyNotes: [
      'Non-compliant Zs values create serious electric shock hazards',
      'Socket outlet circuits require faster disconnection times (0.4s maximum)',
      'RCDs provide additional protection but Zs compliance remains essential'
    ],
    tools: ['BS 7671 Appendix 3', 'Protective device technical data', 'Test certificates', 'Calculator'],
    isRequired: true,
    estimatedTime: 15
  }
];

export const enhancedRCDTestingSteps: TestStep[] = [
  {
    id: 'rcd-identification-preparation',
    title: 'RCD Identification and Test Preparation',
    description: 'Identify all RCDs in the installation and prepare for comprehensive testing as required by BS 7671',
    instructions: [
      'Locate all RCDs in the installation (main incoming and individual circuit RCDs)',
      'Identify RCD type (Type AC, A, F, or B) from device markings or technical documentation',
      'Record RCD rated residual operating current (IΔn) - typically 30mA for most applications',
      'Note rated voltage, number of poles, and manufacturer details for each RCD',
      'Check RCD is properly energised and reset the device if necessary',
      'Verify test equipment is suitable for the RCD type and rating being tested',
      'Ensure testing will not cause loss of supply to essential services or equipment',
      'Select appropriate test point (usually furthest socket outlet on protected circuit)',
      'Notify relevant personnel that RCD testing will cause temporary supply interruption',
      'Document RCD installation details and testing requirements for compliance records'
    ],
    expectedResult: 'All RCDs identified and prepared for systematic testing in accordance with BS 7671',
    safetyNotes: [
      'RCD testing will cause supply interruption to protected circuits',
      'Ensure critical equipment is not affected by temporary supply loss',
      'Some RCD types require specific test equipment and procedures'
    ],
    tools: ['RCD tester', 'Circuit identification equipment', 'Installation drawings', 'BS 7671'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'rcd-sensitivity-testing',
    title: 'RCD Sensitivity Testing (50% and 100% Tests)',
    description: 'Test RCD sensitivity at 50% and 100% of rated tripping current as required by BS 7671',
    instructions: [
      'Connect RCD tester to appropriate test point on the protected circuit',
      'Set tester to RCD rating (typically 30mA) and appropriate test angle',
      'Perform 50% rated current test - RCD should NOT trip within test period',
      'If RCD trips at 50%, investigate potential sensitivity issues or equipment faults',
      'Perform 100% rated current test - RCD MUST trip within 300ms (BS 7671 requirement)',
      'Record actual trip time for 100% test - should be significantly less than 300ms',
      'Repeat tests at different phase angles (0° and 180°) for comprehensive assessment',
      'Test both positive and negative half-cycles where equipment permits',
      'Manually reset RCD after each test and verify correct operation',
      'Document all test results with RCD location and circuit identification'
    ],
    expectedResult: 'RCD demonstrated correct sensitivity - no trip at 50%, reliable trip at 100% within time limits',
    safetyNotes: [
      'RCD that trips at 50% may cause nuisance operation',
      'RCD that fails to trip at 100% provides inadequate protection',
      'Always reset RCD manually after each test operation'
    ],
    tools: ['Calibrated RCD tester', 'Test record sheets', 'Stopwatch', 'BS 7671'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'rcd-time-testing',
    title: 'RCD Time Testing (5x Rated Current)',
    description: 'Test RCD operation time at 5 times rated current for fast fault clearance verification',
    instructions: [
      'Set RCD tester to 5 times the RCD rated current (typically 150mA for 30mA RCD)',
      'Ensure test equipment is capable of delivering required test current safely',
      'Perform 5x test - RCD MUST trip within 40ms as required by BS 7671',
      'Record actual trip time - should be well within the 40ms limit',
      'Test at different phase angles to ensure consistent performance',
      'Verify RCD mechanical operation is smooth and positive',
      'Check RCD contacts make and break cleanly without arcing',
      'Test RCD manual test button operation for mechanical integrity',
      'Compare test button operation with electronic test results',
      'Reset RCD and verify normal operation is restored'
    ],
    expectedResult: 'RCD demonstrates fast operation at 5x current within 40ms time limit',
    safetyNotes: [
      'Fast RCD operation is essential for minimising shock duration',
      'RCD test button only checks mechanical operation, not electrical sensitivity',
      'High test currents may stress older RCD mechanisms'
    ],
    tools: ['Calibrated RCD tester', 'High-resolution timer', 'Test record sheets'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'rcd-functionality-verification',
    title: 'RCD Functionality and Reset Verification',
    description: 'Verify complete RCD functionality including reset capability and ongoing protection',
    instructions: [
      'Test RCD manual test button to verify mechanical operation',
      'Ensure RCD trips reliably when test button is pressed',
      'Verify RCD cannot be reset while test button is held',
      'Check RCD resets positively and restores supply when released',
      'Test that RCD provides protection immediately after reset',
      'Verify RCD trip indication is clear and visible',
      'Check all protected circuits are restored after RCD reset',
      'Test RCD discrimination where multiple RCDs are installed',
      'Ensure upstream RCDs do not trip during downstream RCD testing',
      'Document RCD performance and any operational issues identified'
    ],
    expectedResult: 'RCD functionality verified with reliable operation, reset capability, and ongoing protection',
    safetyNotes: [
      'RCD must reset reliably to restore protection',
      'Poor RCD discrimination can cause unwanted supply interruption',
      'Regular RCD testing is essential for ongoing safety'
    ],
    tools: ['RCD tester', 'Circuit identification equipment', 'Test record sheets'],
    isRequired: true,
    estimatedTime: 10
  }
];

export const enhancedPolaritySteps: TestStep[] = [
  {
    id: 'polarity-planning',
    title: 'Polarity Testing Planning and Preparation',
    description: 'Plan systematic polarity testing to ensure all single-pole devices are correctly connected',
    instructions: [
      'Identify all single-pole protective devices, switches, and control equipment',
      'Locate all Edison screw lampholders requiring polarity verification',
      'Identify socket outlets requiring polarity verification',
      'Plan testing sequence to minimise circuit disruption',
      'Prepare temporary links for distribution board connections if required',
      'Ensure continuity tester or socket tester is available and calibrated',
      'Review circuit drawings to understand switching arrangements',
      'Document all points requiring polarity verification for systematic testing'
    ],
    expectedResult: 'Comprehensive polarity testing plan prepared covering all required verification points',
    safetyNotes: [
      'Incorrect polarity can leave equipment live when switched off',
      'Edison screw lampholders with incorrect polarity present shock hazard',
      'Ensure circuits remain isolated during polarity testing'
    ],
    tools: ['Circuit diagrams', 'Continuity tester', 'Socket outlet tester', 'Temporary links'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'switch-polarity-testing',
    title: 'Switch and Control Device Polarity Testing',
    description: 'Test polarity of all switches and single-pole control devices as required by BS 7671',
    instructions: [
      'Test that all single-pole switches are connected in the line conductor only',
      'Verify switches do not break the neutral conductor under any circumstances',
      'Use continuity tester between phase at origin and switched line at each outlet',
      'Check polarity of single-pole MCBs and fuses in distribution boards',
      'Test polarity of isolation switches and local control switches',
      'Verify correct connection of two-way and intermediate switching',
      'Check polarity of timer switches, photoelectric switches, and automatic controls',
      'Test polarity of emergency stop switches and safety interlocks',
      'Ensure all protective devices are connected in line conductors only',
      'Document any polarity errors found and arrange for correction'
    ],
    expectedResult: 'All switches and single-pole devices confirmed connected in line conductor only',
    safetyNotes: [
      'Switches in neutral conductor leave circuits live when switched off',
      'Incorrect polarity creates serious electric shock hazards',
      'All single-pole devices must break line conductor only'
    ],
    tools: ['Continuity tester', 'Temporary links', 'Circuit identification equipment'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'socket-polarity-testing',
    title: 'Socket Outlet Polarity Testing',
    description: 'Test polarity of all socket outlets to ensure correct pin connections',
    instructions: [
      'Test polarity of all 13A socket outlets using socket outlet tester',
      'Verify line, neutral, and earth connections are correctly positioned',
      'Check that line conductor connects to correct pin (right-hand when viewed from front)',
      'Verify neutral conductor connects to correct pin (left-hand when viewed from front)',
      'Ensure earth pin connection is correct and secure',
      'Test polarity of industrial socket outlets and CEE form connectors',
      'Check polarity of any special-purpose socket outlets',
      'Verify polarity of socket outlets on ring final circuits',
      'Test polarity of socket outlets protected by RCDs',
      'Document socket outlet polarity test results with location details'
    ],
    expectedResult: 'All socket outlets confirmed with correct polarity connections per BS 1363',
    safetyNotes: [
      'Incorrect socket polarity can damage connected equipment',
      'Reversed polarity affects equipment safety and operation',
      'Earth connection polarity is critical for safety'
    ],
    tools: ['Socket outlet tester', 'Plug-in polarity tester', 'Test record sheets'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'lampolder-polarity-testing',
    title: 'Edison Screw Lampholder Polarity Testing',
    description: 'Test polarity of Edison screw lampholders to ensure centre contact is connected to line',
    instructions: [
      'Identify all Edison screw (ES) lampholders in the installation',
      'Remove lamps from lampholders to access contacts safely',
      'Test continuity between line conductor at origin and centre contact of lampholder',
      'Verify that centre contact is connected to line conductor (switched live)',
      'Check that threaded contact is connected to neutral conductor',
      'Test polarity with lamp control switch in both ON and OFF positions',
      'Ensure line conductor is switched and neutral remains permanently connected',
      'Check polarity of lampholders in multi-lamp fittings',
      'Test polarity of lampholders with dimmer control',
      'Replace lamps after testing and verify correct operation'
    ],
    expectedResult: 'All Edison screw lampholders confirmed with centre contact connected to line conductor',
    safetyNotes: [
      'Incorrect lampholder polarity creates shock hazard during lamp changing',
      'Centre contact must be connected to switched line for safety',
      'Threaded contact connected to line creates serious shock risk'
    ],
    tools: ['Continuity tester', 'Temporary links', 'Insulated tools', 'Replacement lamps'],
    isRequired: true,
    estimatedTime: 12
  }
];
