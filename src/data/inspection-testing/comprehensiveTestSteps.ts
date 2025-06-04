
import { TestStep } from '@/types/inspection-testing';

export const enhancedSafeIsolationSteps: TestStep[] = [
  {
    id: 'safe-isolation-selection',
    title: 'Supply Type Identification & Selection',
    description: 'Identify the electrical supply type and select appropriate isolation procedure',
    instructions: [
      'Examine the electrical installation to determine supply type',
      'Check distribution board labels and circuit breakers',
      'Identify if supply is single-phase (230V) or three-phase (400V)',
      'Note the earthing system type (TN-S, TN-C-S, TT, IT)',
      'Select appropriate isolation procedure based on supply type',
      'Document supply characteristics for test records'
    ],
    expectedResult: 'Supply type correctly identified and appropriate isolation procedure selected',
    safetyNotes: [
      'Never assume supply type - always verify',
      'Check for multiple supply sources',
      'Identify any backup or emergency supplies'
    ],
    tools: ['Distribution board schedule', 'Supply documentation', 'Visual inspection'],
    isRequired: true,
    estimatedTime: 5
  },
  {
    id: 'safe-isolation-single-phase',
    title: 'Single-Phase Safe Isolation Procedure',
    description: 'Complete safe isolation procedure for single-phase electrical supply',
    instructions: [
      'Locate and identify the correct single-phase circuit breaker',
      'Inform all affected persons of planned isolation',
      'Switch OFF the protective device at the distribution board',
      'Apply lock-off device and isolation tag if required',
      'Test for voltage between Line and Neutral using approved indicator',
      'Test for voltage between Line and Earth using approved indicator',
      'Test for voltage between Neutral and Earth using approved indicator',
      'Prove voltage indicator on known live source after testing',
      'Issue permit to work if required by site procedures'
    ],
    expectedResult: 'Single-phase circuit safely isolated and proven dead on all conductors',
    safetyNotes: [
      'CRITICAL: Prove dead on ALL conductors',
      'Always prove voltage indicator before AND after use',
      'Ensure correct PPE for voltage level being tested'
    ],
    tools: ['Approved voltage indicator', 'Lock-off devices', 'Proving unit', 'PPE'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'safe-isolation-three-phase',
    title: 'Three-Phase Safe Isolation Procedure',
    description: 'Complete safe isolation procedure for three-phase electrical supply',
    instructions: [
      'Locate and identify the correct three-phase circuit breaker or isolator',
      'Inform all affected persons and coordinate isolation timing',
      'Switch OFF all three phases simultaneously at isolation point',
      'Apply lock-off devices to all phases and isolation tag',
      'Test for voltage L1 to L2, L2 to L3, L3 to L1 (phase to phase)',
      'Test for voltage L1 to N, L2 to N, L3 to N (phase to neutral)',
      'Test for voltage L1 to E, L2 to E, L3 to E (phase to earth)',
      'Test for voltage between Neutral and Earth',
      'Prove voltage indicator on known live source after testing',
      'Document isolation on permit to work system'
    ],
    expectedResult: 'Three-phase circuit safely isolated and proven dead on all phases',
    safetyNotes: [
      'CRITICAL: Test ALL phase combinations for complete isolation',
      'Ensure proper phase rotation understanding',
      'Check for neutral supplies and control circuits'
    ],
    tools: ['Approved voltage indicator', 'Lock-off devices', 'Proving unit', 'Phase rotation meter'],
    isRequired: true,
    estimatedTime: 12
  }
];

export const enhancedContinuitySteps: TestStep[] = [
  {
    id: 'continuity-preparation',
    title: 'Continuity Test Preparation',
    description: 'Prepare circuits and equipment for comprehensive continuity testing',
    instructions: [
      'Confirm circuit isolation is maintained throughout testing',
      'Gather and inspect low resistance ohmmeter and test leads',
      'Zero the instrument by shorting test leads together',
      'Set appropriate test current (typically 200mA for most circuits)',
      'Identify all outlet points and equipment on the circuit',
      'Prepare test record sheets with circuit details',
      'Plan testing sequence to minimize disruption'
    ],
    expectedResult: 'All equipment ready and circuit prepared for systematic continuity testing',
    safetyNotes: [
      'Maintain electrical isolation throughout testing',
      'Use only calibrated test equipment',
      'Ensure test current is appropriate for cable size'
    ],
    tools: ['Low resistance ohmmeter', 'Test leads', 'Circuit diagrams', 'Test record sheets'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'r1-r2-measurement',
    title: 'R1+R2 Continuity Measurement',
    description: 'Measure line to CPC resistance (R1+R2) throughout the circuit',
    instructions: [
      'Connect test leads to Line and CPC terminals at distribution board',
      'Test at each socket outlet on the circuit in sequence',
      'Record resistance reading at each test point',
      'Test at each fixed equipment connection point',
      'Note the highest reading obtained for each circuit',
      'Test all switch positions where applicable',
      'Compare readings with expected values for cable type and length',
      'Investigate any unusually high or inconsistent readings'
    ],
    expectedResult: 'Complete R1+R2 values recorded for all points on circuit',
    safetyNotes: [
      'Ensure good electrical contact at all test points',
      'Be aware of parallel paths that may affect readings',
      'Check connections are secure before energizing'
    ],
    tools: ['Low resistance ohmmeter', 'Test probes', 'Socket adapters', 'Record sheets'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'ring-circuit-continuity',
    title: 'Ring Final Circuit Continuity Testing',
    description: 'Specialized testing procedure for ring final circuits to verify integrity',
    instructions: [
      'Disconnect ring circuit at distribution board (L1, L2, N1, N2, E1, E2)',
      'Measure resistance between L1 and L2 (should be circuit resistance)',
      'Measure resistance between N1 and N2 (should be similar to line)',
      'Measure resistance between E1 and E2 (should be similar to line)',
      'Cross-connect: join L1 to N2 and N1 to L2 at distribution board',
      'Test between Line and Neutral at each socket - readings should be similar',
      'Cross-connect: join L1 to E2 and E1 to L2 at distribution board',
      'Test between Line and Earth at each socket - readings should be similar',
      'Verify no interconnection between Line and Neutral conductors'
    ],
    expectedResult: 'Ring circuit integrity confirmed with consistent readings around the ring',
    safetyNotes: [
      'Any break in ring will show as infinite resistance',
      'Interconnections between conductors indicate serious fault',
      'Spur circuits will show different resistance values'
    ],
    tools: ['Low resistance ohmmeter', 'Test leads', 'Socket tester'],
    isRequired: false,
    estimatedTime: 25
  },
  {
    id: 'bonding-conductor-continuity',
    title: 'Equipotential Bonding Continuity',
    description: 'Test continuity of main and supplementary bonding conductors',
    instructions: [
      'Test main equipotential bonding from MET to gas service pipe',
      'Test main equipotential bonding from MET to water service pipe',
      'Test main equipotential bonding to structural steelwork if applicable',
      'Test supplementary bonding in bathrooms and special locations',
      'Measure bonding conductor resistance - should be very low',
      'Check bonding connections are mechanically secure',
      'Verify bonding conductor sizes comply with BS 7671 requirements',
      'Test continuity to exposed metalwork in special locations'
    ],
    expectedResult: 'All bonding conductors provide low resistance path to main earthing terminal',
    safetyNotes: [
      'Ensure bonding clamps are clean and tight',
      'Check for corrosion at connection points',
      'Verify services are actually conductive before testing'
    ],
    tools: ['Low resistance ohmmeter', 'Test leads', 'BS 7671 tables'],
    isRequired: true,
    estimatedTime: 12
  }
];

export const enhancedInsulationSteps: TestStep[] = [
  {
    id: 'insulation-preparation',
    title: 'Insulation Resistance Test Preparation',
    description: 'Prepare installation for safe insulation resistance testing',
    instructions: [
      'Identify and list all electronic equipment and sensitive devices',
      'Disconnect or isolate electronic equipment, computers, and LED lights',
      'Remove or bridge surge protective devices (SPDs) temporarily',
      'Disconnect electronic switches, dimmers, and timer controls',
      'Remove pilot lights and indicator lamps',
      'Ensure all switches and circuit breakers are in ON position',
      'Document all disconnections for reconnection after testing',
      'Verify test voltage selection based on circuit nominal voltage'
    ],
    expectedResult: 'Installation prepared to prevent equipment damage during high voltage testing',
    safetyNotes: [
      'Label all disconnected items clearly for reconnection',
      'Take photographs if necessary to aid correct reconnection',
      'Warn occupants about temporary equipment disconnection'
    ],
    tools: ['Tools for disconnection', 'Labels', 'Camera', 'Warning notices'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'insulation-line-neutral',
    title: 'Line to Neutral Insulation Testing',
    description: 'Test insulation resistance between line and neutral conductors',
    instructions: [
      'Set insulation tester to 500V DC for circuits up to 500V nominal',
      'Connect test leads to Line and Neutral at distribution board',
      'Ensure all switches in circuit are closed (ON position)',
      'Apply test voltage and maintain for minimum 1 minute',
      'Read and record insulation resistance value in MΩ',
      'Test should show minimum 1MΩ for new installations',
      'Investigate any readings below 1MΩ before proceeding',
      'Test each circuit separately for accurate results'
    ],
    expectedResult: 'Insulation resistance ≥1MΩ between line and neutral conductors',
    safetyNotes: [
      'HIGH VOLTAGE WARNING: 500V DC test voltage present',
      'Ensure test area is clear of personnel during testing',
      'Do not touch conductors during or immediately after testing'
    ],
    tools: ['Insulation resistance tester', 'Test leads', 'Timer', 'Warning signs'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'insulation-line-earth',
    title: 'Line to Earth Insulation Testing',
    description: 'Test insulation resistance between line conductors and earth',
    instructions: [
      'Maintain 500V DC test voltage setting for standard circuits',
      'Connect test leads to Line and Earth terminals',
      'For comprehensive testing, disconnect neutral-earth link temporarily',
      'Apply test voltage and maintain for minimum 1 minute',
      'Read and record insulation resistance value in MΩ',
      'For three-phase circuits, test each line conductor separately',
      'Minimum acceptable value is 1MΩ for installations up to 500V',
      'Restore neutral-earth link immediately after testing'
    ],
    expectedResult: 'Insulation resistance ≥1MΩ between line conductors and earth',
    safetyNotes: [
      'CRITICAL: Restore neutral-earth link after testing',
      'Installation is unsafe without proper neutral-earth connection',
      'Test each phase separately in three-phase systems'
    ],
    tools: ['Insulation resistance tester', 'Test leads', 'Isolation tools'],
    isRequired: true,
    estimatedTime: 12
  },
  {
    id: 'insulation-neutral-earth',
    title: 'Neutral to Earth Insulation Testing',
    description: 'Test insulation resistance between neutral and earth conductors',
    instructions: [
      'Disconnect neutral-earth link at main distribution board',
      'Connect test leads to Neutral and Earth terminals',
      'Apply 500V DC test voltage for minimum 1 minute',
      'Read and record insulation resistance value in MΩ',
      'Minimum acceptable value is 1MΩ for standard installations',
      'This test verifies neutral conductor insulation integrity',
      'IMMEDIATELY reconnect neutral-earth link after testing',
      'Verify neutral-earth link connection is secure'
    ],
    expectedResult: 'Insulation resistance ≥1MΩ between neutral and earth, neutral-earth link restored',
    safetyNotes: [
      'CRITICAL SAFETY: Neutral-earth link MUST be restored',
      'Installation will not be safe without neutral-earth connection',
      'Double-check link is properly reconnected before re-energizing'
    ],
    tools: ['Insulation resistance tester', 'Test leads', 'Connection tools'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'equipment-reconnection',
    title: 'Equipment Reconnection and Verification',
    description: 'Systematically reconnect all equipment and verify correct operation',
    instructions: [
      'Reconnect all surge protective devices (SPDs) first',
      'Restore electronic switches and dimmer controls',
      'Reconnect electronic equipment and computers',
      'Reinstall pilot lights and indicator lamps',
      'Restore LED lighting and electronic ballasts',
      'Check all connections are secure and correct',
      'Test basic operation of reconnected equipment',
      'Update test documentation with final installation configuration'
    ],
    expectedResult: 'All equipment correctly reconnected and operating normally',
    safetyNotes: [
      'Verify correct reconnection using photos/labels if needed',
      'Test equipment operation before completing certification',
      'Report any equipment damage that may have occurred'
    ],
    tools: ['Installation tools', 'Equipment manuals', 'Test equipment', 'Documentation'],
    isRequired: true,
    estimatedTime: 15
  }
];

export const enhancedZsTestingSteps: TestStep[] = [
  {
    id: 'zs-preparation',
    title: 'Earth Fault Loop Impedance Test Preparation',
    description: 'Prepare for accurate Zs testing with proper equipment setup',
    instructions: [
      'Ensure circuits are energized and operating normally',
      'Check earth fault loop impedance tester calibration',
      'Verify tester is suitable for installation earthing system',
      'Identify protective device types and ratings for each circuit',
      'Note any RCD protection that may trip during testing',
      'Prepare comparison tables from BS 7671 for maximum Zs values',
      'Plan testing sequence starting from distribution board outwards',
      'Set up "no-trip" testing mode if RCDs are present'
    ],
    expectedResult: 'Test equipment ready and testing strategy planned for accurate Zs measurements',
    safetyNotes: [
      'Live testing - maintain appropriate safety distances',
      'Warn occupants that brief power interruptions may occur',
      'Ensure RCD testing won\'t affect life safety systems'
    ],
    tools: ['Earth fault loop impedance tester', 'BS 7671 tables', 'Circuit schedules'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'ze-measurement',
    title: 'External Earth Fault Loop Impedance (Ze) Measurement',
    description: 'Measure Ze at the origin of the electrical installation',
    instructions: [
      'Test at the main distribution board incoming terminals',
      'Disconnect installation earthing conductor temporarily if required',
      'Connect Zs tester between incoming line and earth terminal',
      'Take measurement with all final circuits disconnected',
      'Record Ze value - this is the external earth fault loop impedance',
      'For TN-S systems, typical Ze values are 0.35Ω or less',
      'For TN-C-S systems, typical Ze values are 0.35Ω or less',
      'Compare result with declared value from electricity supplier'
    ],
    expectedResult: 'Ze measured and recorded - forms basis for all circuit Zs calculations',
    safetyNotes: [
      'Restore earth connections immediately after testing',
      'High Ze values may indicate supply earth fault',
      'Contact electricity supplier if Ze exceeds declared value'
    ],
    tools: ['Earth fault loop impedance tester', 'Test leads', 'Supply documentation'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'circuit-zs-measurement',
    title: 'Circuit Earth Fault Loop Impedance Testing',
    description: 'Measure Zs at the furthest point of each final circuit',
    instructions: [
      'Test at the furthest socket outlet on each final circuit',
      'Connect Zs tester between line and earth terminals',
      'Use "no-trip" mode if RCD protection is present',
      'Take measurement and record Zs value in ohms',
      'Compare with maximum permissible Zs for protective device',
      'Consider temperature correction factors if required',
      'Test both sockets on double socket outlets',
      'Investigate any values approaching or exceeding limits'
    ],
    expectedResult: 'All circuit Zs values within BS 7671 limits for installed protective devices',
    safetyNotes: [
      'Some testers may cause RCD operation despite "no-trip" mode',
      'Reset any RCDs that operate during testing',
      'High Zs readings indicate poor earth fault path'
    ],
    tools: ['Earth fault loop impedance tester', 'Socket adaptors', 'BS 7671 maximum Zs tables'],
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'zs-verification',
    title: 'Zs Results Analysis and Verification',
    description: 'Analyze Zs test results and verify compliance with BS 7671',
    instructions: [
      'Calculate expected Zs from Ze + (R1+R2) measurements',
      'Compare calculated values with measured Zs results',
      'Check all measured values against BS 7671 maximum limits',
      'Apply temperature correction factors where necessary',
      'Investigate significant discrepancies between calculated and measured values',
      'Verify protective device characteristics match installation requirements',
      'Document any circuits requiring remedial work',
      'Confirm compliance with automatic disconnection requirements'
    ],
    expectedResult: 'All Zs measurements verified compliant with BS 7671 disconnection times',
    safetyNotes: [
      'High Zs values compromise automatic disconnection of supply',
      'Non-compliant circuits must be made safe before use',
      'Consider RCD protection for circuits with high Zs values'
    ],
    tools: ['Calculator', 'BS 7671 tables', 'Temperature correction tables'],
    isRequired: true,
    estimatedTime: 15
  }
];

export const enhancedRCDTestingSteps: TestStep[] = [
  {
    id: 'rcd-identification',
    title: 'RCD Identification and Test Planning',
    description: 'Identify all RCD devices and plan comprehensive testing sequence',
    instructions: [
      'Locate all RCD devices in the installation (main switch, RCBOs, socket RCDs)',
      'Identify RCD ratings (30mA, 100mA, 300mA) and types (AC, A, B)',
      'Check RCD test button operation - should trip when pressed',
      'Reset RCD and verify normal operation resumes',
      'Plan testing sequence to minimize disruption to occupants',
      'Identify circuits protected by each RCD device',
      'Check for any equipment sensitive to power interruption',
      'Prepare test record sheets for each RCD device'
    ],
    expectedResult: 'All RCD devices identified with ratings and types recorded for systematic testing',
    safetyNotes: [
      'Test button only checks mechanical operation, not electrical sensitivity',
      'Warn occupants of temporary power interruptions during testing',
      'Consider backup arrangements for critical equipment'
    ],
    tools: ['RCD tester', 'Circuit identification equipment', 'Test record sheets'],
    isRequired: true,
    estimatedTime: 12
  },
  {
    id: 'rcd-sensitivity-testing',
    title: 'RCD Electrical Sensitivity Testing',
    description: 'Test RCD electrical operation at various current levels',
    instructions: [
      'Connect RCD tester to a socket on RCD-protected circuit',
      'Test at 50% of rated tripping current (15mA for 30mA RCD)',
      'RCD should NOT trip at 50% rated current',
      'Test at 100% of rated tripping current (30mA for 30mA RCD)',
      'RCD MUST trip within 300ms at rated current',
      'Test at 150% of rated current - should trip faster',
      'Record actual tripping current and time for each test',
      'Repeat test after RCD has been reset and allowed to settle'
    ],
    expectedResult: 'RCD operates correctly: no trip at 50%, trip within 300ms at 100% rated current',
    safetyNotes: [
      'RCD protects against earth leakage and electrocution',
      'Non-operation or slow operation compromises safety',
      'Replace RCDs that fail to meet performance requirements'
    ],
    tools: ['RCD tester', 'Stopwatch', 'Test adaptors'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'rcd-fast-trip-testing',
    title: 'RCD Fast Trip Testing (5x Rated Current)',
    description: 'Test RCD operation at high fault current for fast disconnection',
    instructions: [
      'Set RCD tester to 5x rated current (150mA for 30mA RCD)',
      'Apply test current and measure trip time',
      'RCD MUST trip within 40ms at 5x rated current',
      'This simulates a serious earth fault requiring immediate disconnection',
      'Record actual trip time achieved',
      'Reset RCD and verify normal operation',
      'Test both positive and negative half-cycles where applicable',
      'Document any RCDs with trip times exceeding 40ms'
    ],
    expectedResult: 'RCD trips within 40ms at 5x rated current, providing fast fault clearance',
    safetyNotes: [
      'Fast trip ensures safety in high earth fault current conditions',
      'Slow operation at high currents indicates RCD deterioration',
      'Consider replacement if trip times consistently exceed limits'
    ],
    tools: ['RCD tester', 'High-resolution timer', 'Test record sheets'],
    isRequired: true,
    estimatedTime: 10
  },
  {
    id: 'rcd-ramp-testing',
    title: 'RCD Ramp Testing (Advanced)',
    description: 'Perform ramp test to determine exact RCD tripping current',
    instructions: [
      'Set RCD tester to ramp test mode',
      'Gradually increase test current from zero',
      'Record the exact current at which RCD trips',
      'Tripping current should be between 50% and 100% of rated value',
      'For 30mA RCD, trip current should be 15-30mA',
      'Reset RCD and repeat test for consistency',
      'Document actual tripping current for maintenance records',
      'Compare results with manufacturer specifications'
    ],
    expectedResult: 'RCD trips consistently within 50-100% of rated current range',
    safetyNotes: [
      'Ramp testing provides detailed RCD performance data',
      'Consistent results indicate reliable RCD operation',
      'Variable trip currents may indicate RCD deterioration'
    ],
    tools: ['Advanced RCD tester with ramp function', 'Test record sheets'],
    isRequired: false,
    estimatedTime: 8
  }
];

export const enhancedPolaritySteps: TestStep[] = [
  {
    id: 'polarity-planning',
    title: 'Polarity Test Planning and Preparation',
    description: 'Plan systematic polarity testing to verify correct conductor connections',
    instructions: [
      'Identify all single-pole protective devices and switches',
      'Locate all Edison screw lampholders in the installation',
      'Plan to test all socket outlets for correct polarity',
      'Prepare continuity tester and socket testing equipment',
      'Ensure circuits are isolated before testing connections',
      'Review installation drawings for switch arrangements',
      'Identify any special circuits requiring polarity verification',
      'Prepare polarity test record sheets'
    ],
    expectedResult: 'Comprehensive polarity testing plan covering all critical connection points',
    safetyNotes: [
      'Test with circuits isolated for safety',
      'Incorrect polarity can cause shock even when switched off',
      'Pay special attention to bathroom and outdoor circuits'
    ],
    tools: ['Continuity tester', 'Socket tester', 'Test leads', 'Circuit diagrams'],
    isRequired: true,
    estimatedTime: 8
  },
  {
    id: 'distribution-board-polarity',
    title: 'Distribution Board Polarity Verification',
    description: 'Verify correct polarity connections at distribution board level',
    instructions: [
      'Test that line conductor connects to line terminals of MCBs/RCBOs',
      'Verify neutral conductor connects to neutral terminal block',
      'Check earth conductor connects to earth terminal block',
      'Test that single-pole devices break line conductor only',
      'Verify RCD and RCBO line connections are correct',
      'Check main switch connects to line side of installation',
      'Test continuity from incoming supply to outgoing circuits',
      'Document any incorrect connections requiring remedial work'
    ],
    expectedResult: 'All distribution board connections correctly polarized according to BS 7671',
    safetyNotes: [
      'Incorrect connections at distribution board affect entire installation',
      'Verify isolation before working on distribution board',
      'Double-check all connections before re-energizing'
    ],
    tools: ['Continuity tester', 'Test leads', 'Distribution board schedule'],
    isRequired: true,
    estimatedTime: 12
  },
  {
    id: 'socket-outlet-polarity',
    title: 'Socket Outlet Polarity Testing',
    description: 'Test polarity of all socket outlets in the installation',
    instructions: [
      'Test each socket outlet using socket polarity tester',
      'Verify line connects to line pin, neutral to neutral pin',
      'Check earth connection is present and correct',
      'Test both sockets on double socket outlets',
      'Use continuity method if socket tester not available',
      'Test with circuit isolated: line terminal to line pin continuity',
      'Verify switch line connections where sockets are switched',
      'Record any sockets with incorrect polarity for correction'
    ],
    expectedResult: 'All socket outlets correctly wired with proper line, neutral, and earth connections',
    safetyNotes: [
      'Reversed polarity can cause equipment damage',
      'Incorrect earth connections compromise safety',
      'Test method depends on whether circuits are energized'
    ],
    tools: ['Socket polarity tester', 'Continuity tester', 'Test adaptors'],
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'lighting-polarity',
    title: 'Lighting Circuit Polarity Testing',
    description: 'Test polarity of lighting circuits and switch connections',
    instructions: [
      'Test that switches break line conductor, not neutral',
      'Verify Edison screw lampholders: line to center contact',
      'Test bayonet cap holders for correct connections',
      'Check pendant and fixed light fittings for proper polarity',
      'Test two-way and intermediate switch connections',
      'Verify emergency lighting polarity if present',
      'Test that neutral conductor is continuous to all light points',
      'Check any dimmer switch connections for correct polarity'
    ],
    expectedResult: 'All lighting circuits correctly polarized with switches on line conductor',
    safetyNotes: [
      'Incorrect polarity in lampholders can cause shock',
      'Switches must break line conductor for safety',
      'Check both live and neutral at light fittings'
    ],
    tools: ['Continuity tester', 'Test leads', 'Lamp adaptors'],
    isRequired: true,
    estimatedTime: 18
  }
];
