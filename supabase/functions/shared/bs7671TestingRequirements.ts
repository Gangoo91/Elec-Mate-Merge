/**
 * BS 7671:2018+A3:2024 Chapter 64 - Initial Verification
 * Testing procedures, sequences, and pass/fail criteria
 */

export interface TestRequirement {
  testNumber: number;
  testName: string;
  regulation: string;
  testSequence: 'dead' | 'live';
  testVoltage?: number; // V DC for insulation tests
  minimumValue?: number;
  maximumValue?: number;
  unit: string;
  equipment: string[];
  procedure: string[];
  passFailCriteria: string;
  safetyNotes: string[];
}

/**
 * BS 7671 Regulation 643 - Complete Test Sequence
 * CRITICAL: Tests MUST be performed in this order
 */
export const BS7671_TEST_SEQUENCE: TestRequirement[] = [
  {
    testNumber: 1,
    testName: 'Continuity of Protective Conductors',
    regulation: '643.2',
    testSequence: 'dead',
    maximumValue: 0.05, // ohms for 10mm² cable example
    unit: 'Ω (ohms)',
    equipment: ['Low resistance ohmmeter', 'Test leads (<0.5Ω resistance)'],
    procedure: [
      'Disconnect supply and isolate circuit',
      'Connect test leads between earth terminal and far end of protective conductor',
      'Measure resistance - should be very low',
      'For ring final circuits: test both legs, then cross-connect to verify ring integrity',
      'Record (R1 + R2) value for later Zs calculation'
    ],
    passFailCriteria: 'Resistance should be very low (typically <0.05Ω for short runs, <1Ω for longer runs). Must be continuous path with no breaks.',
    safetyNotes: [
      'Ensure circuit is dead before testing',
      'Test lead resistance must be subtracted or leads must be nulled',
      'Check test leads for damage before use'
    ]
  },
  {
    testNumber: 2,
    testName: 'Continuity of Ring Final Circuit Conductors',
    regulation: '643.2.9',
    testSequence: 'dead',
    unit: 'Ω (ohms)',
    equipment: ['Low resistance ohmmeter'],
    procedure: [
      'Disconnect supply',
      'At consumer unit: disconnect and separate Line, Neutral, and CPC conductors',
      'Measure resistance of Line loop: r1',
      'Measure resistance of Neutral loop: rn',
      'Measure resistance of CPC loop: r2',
      'Cross-connect L to N and test at each socket: reading should be (r1+rn)/4 at midpoint',
      'Cross-connect L to CPC and test at each socket: reading should be (r1+r2)/4 at midpoint',
      'Verify no interconnections (spurring) between sockets'
    ],
    passFailCriteria: 'All three loop resistances (r1, rn, r2) should be similar (within 0.05Ω). Cross-connection test readings should follow expected pattern with minimum at midpoint. No breaks or spurring detected.',
    safetyNotes: [
      'MUST test ring integrity - broken rings are dangerous',
      'Highest reading should be at ends, lowest at middle',
      'Large variations indicate spurring or poor connections'
    ]
  },
  {
    testNumber: 3,
    testName: 'Insulation Resistance',
    regulation: '643.3',
    testSequence: 'dead',
    testVoltage: 500, // V DC for 230V circuits
    minimumValue: 1.0, // MΩ minimum, but should be >>1MΩ
    unit: 'MΩ (megohms)',
    equipment: ['Insulation resistance tester (500V DC for 230V circuits)', 'Lock-off device for isolation'],
    procedure: [
      'Isolate circuit and lock off',
      'Remove or disconnect sensitive equipment (electronics, LED lamps, surge protectors)',
      'Close all switches and circuit breakers to energize conductors',
      'Remove lamps or switch off at lamp if electronic control gear present',
      'For circuits ≤500V with SELV/PELV: test at 250V DC',
      'Test between Live and Earth with all switches closed',
      'Test between Neutral and Earth with all switches closed',
      'Test between Live and Neutral with all switches closed',
      'Record lowest reading'
    ],
    passFailCriteria: `Table 64 - Minimum values:
      - SELV/PELV: ≥0.5MΩ at 250V DC
      - Up to 500V (inc 230V): ≥1.0MΩ at 500V DC
      - Above 500V: ≥1.0MΩ at 1000V DC
      
      PRACTICALLY: Should see >>1MΩ (typically 50-200MΩ+ for good insulation). Readings <2MΩ warrant investigation.`,
    safetyNotes: [
      'CRITICAL: Remove sensitive electronics before testing',
      'High voltage DC test - can damage equipment',
      'Discharge capacitance after testing',
      'Ensure personnel clear of circuit during test',
      'Low readings (<1MΩ) indicate insulation breakdown - DO NOT ENERGIZE'
    ]
  },
  {
    testNumber: 4,
    testName: 'Polarity',
    regulation: '643.6',
    testSequence: 'dead',
    unit: 'Verification',
    equipment: ['Continuity tester or multimeter'],
    procedure: [
      'Verify all single-pole protective devices (MCBs, fuses) connected in LINE conductor only',
      'Verify Edison screw lampholders have outer screw connected to neutral',
      'Verify centre contact of Edison screw connected to line',
      'Verify socket-outlets: Line to Line, Neutral to Neutral, Earth to Earth',
      'Check switch wiring: switched conductor is line, not neutral',
      'For 3-phase: verify correct phase rotation if required'
    ],
    passFailCriteria: 'All single-pole devices in line conductors only. No reversed polarity at socket-outlets. Edison screw lampholders correctly connected. All switching on line conductor only.',
    safetyNotes: [
      'Reversed polarity is DANGEROUS - creates live exposed metalwork',
      'Common error: neutral switched instead of line',
      'Check EVERY socket-outlet - don\'t assume'
    ]
  },
  {
    testNumber: 5,
    testName: 'Earth Fault Loop Impedance (Zs)',
    regulation: '643.7.3',
    testSequence: 'live',
    unit: 'Ω (ohms)',
    equipment: ['Earth fault loop impedance tester', 'Non-trip test setting for RCD circuits'],
    procedure: [
      'Energize circuit (LIVE TEST)',
      'Test at origin to determine external impedance (Ze)',
      'Test at furthest point of each circuit to determine Zs',
      'For RCD-protected circuits: use low-current non-trip test mode',
      'Record all Zs values',
      'Verify Zs ≤ maximum permitted value for protective device type/rating'
    ],
    passFailCriteria: `Zs must be ≤ maximum value from Table 41.3 (or 41.2, 41.4, 41.6 depending on system):
      
      Examples (Table 41.3, 0.4s disconnection, 230V):
      - B6 MCB: Zs ≤ 7.67Ω
      - B16 MCB: Zs ≤ 2.87Ω
      - B32 MCB: Zs ≤ 1.44Ω
      - C16 MCB: Zs ≤ 1.44Ω
      - C32 MCB: Zs ≤ 0.72Ω
      
      Rule: Lower rating = higher max Zs. Higher type (B→C→D) = lower max Zs.`,
    safetyNotes: [
      'LIVE TEST - use caution',
      'For RCD circuits: use non-trip mode or may cause disconnection',
      'High Zs values indicate inadequate earthing - DANGEROUS',
      'Check supply voltage during test - affects reading',
      'Note: Some testers give invalid readings with inverters/solar'
    ]
  },
  {
    testNumber: 6,
    testName: 'RCD Operation Test',
    regulation: '643.8',
    testSequence: 'live',
    unit: 'ms (milliseconds)',
    equipment: ['RCD tester with variable test current', 'Stopwatch function'],
    procedure: [
      'Energize circuit (LIVE TEST)',
      'Test at rated residual operating current (IΔn): 30mA, 100mA, or 300mA',
      'Test at 50% IΔn - RCD should NOT trip (except S-type may)',
      'Test at 100% IΔn (1× IΔn) - RCD MUST trip',
      'Test at 5× IΔn - check fast disconnection time',
      'Test using on-board test button to verify mechanical function',
      'For Type AC/A RCDs: test both half-cycles (0° and 180°)',
      'Record trip times for each test'
    ],
    passFailCriteria: `Regulation 643.8 / 415.1.1:
      - At 1× IΔn: Must disconnect within 300ms (general type)
      - At 5× IΔn: Must disconnect within 40ms
      - At 50% IΔn: Should NOT trip (except S-type time-delay)
      - Test button must cause disconnection
      
      Type S (time-delay) RCDs: 130ms - 500ms at 1× IΔn, 150ms at 5× IΔn`,
    safetyNotes: [
      'LIVE TEST with high fault current injection',
      'RCD WILL trip during test - warn occupants',
      'Test button must work - if not, RCD is faulty',
      'Non-tripping RCD is LIFE-THREATENING - replace immediately',
      'Slow trip times (>300ms) indicate degraded RCD'
    ]
  },
  {
    testNumber: 7,
    testName: 'Functional Testing',
    regulation: '643.10',
    testSequence: 'live',
    unit: 'Pass/Fail',
    equipment: ['None - operational testing'],
    procedure: [
      'Test all switchgear operates correctly',
      'Verify RCD test buttons function',
      'Check AFDD test buttons (if fitted) - per manufacturer instructions',
      'Test emergency stop buttons',
      'Verify interlocks operate correctly',
      'Check control and automation systems',
      'Verify residual current monitoring devices (RCMs) if fitted',
      'Test any isolation devices'
    ],
    passFailCriteria: 'All equipment operates as designed. Safety devices function correctly. Interlocks prevent unsafe operation. RCD test buttons cause disconnection.',
    safetyNotes: [
      'Test under normal operating conditions',
      'Verify safety systems cannot be bypassed',
      'Check mechanical and electrical interlocks'
    ]
  }
];

/**
 * Table 64 - Minimum Insulation Resistance Values
 */
export interface InsulationResistanceLimit {
  circuitVoltage: string;
  minimumResistance: number; // MΩ
  testVoltage: number; // V DC
  regulation: string;
}

export const INSULATION_RESISTANCE_LIMITS: InsulationResistanceLimit[] = [
  {
    circuitVoltage: 'SELV and PELV',
    minimumResistance: 0.5,
    testVoltage: 250,
    regulation: 'Table 64'
  },
  {
    circuitVoltage: 'Up to 500V (inc. 230V single-phase, 400V 3-phase)',
    minimumResistance: 1.0,
    testVoltage: 500,
    regulation: 'Table 64'
  },
  {
    circuitVoltage: 'Above 500V up to 1000V',
    minimumResistance: 1.0,
    testVoltage: 1000,
    regulation: 'Table 64'
  }
];

/**
 * Get test sequence in correct order
 */
export function getTestSequence(): TestRequirement[] {
  return BS7671_TEST_SEQUENCE.sort((a, b) => a.testNumber - b.testNumber);
}

/**
 * Get specific test by name
 */
export function getTest(testName: string): TestRequirement | null {
  const query = testName.toLowerCase();
  return BS7671_TEST_SEQUENCE.find(t => 
    t.testName.toLowerCase().includes(query) ||
    t.regulation.toLowerCase().includes(query)
  ) || null;
}

/**
 * Verify insulation resistance reading
 */
export function verifyInsulationResistance(
  circuitVoltage: number,
  measuredResistance: number // MΩ
): {
  compliant: boolean;
  requiredMinimum: number;
  testVoltageUsed: number;
  assessment: string;
} {
  let limit: InsulationResistanceLimit;
  
  if (circuitVoltage <= 50) {
    limit = INSULATION_RESISTANCE_LIMITS[0]; // SELV/PELV
  } else if (circuitVoltage <= 500) {
    limit = INSULATION_RESISTANCE_LIMITS[1]; // 230V/400V
  } else {
    limit = INSULATION_RESISTANCE_LIMITS[2]; // >500V
  }
  
  const compliant = measuredResistance >= limit.minimumResistance;
  
  let assessment = '';
  if (measuredResistance >= 50) {
    assessment = 'EXCELLENT - Very high insulation resistance';
  } else if (measuredResistance >= 10) {
    assessment = 'GOOD - Well above minimum requirement';
  } else if (measuredResistance >= 2) {
    assessment = 'ACCEPTABLE - Above minimum but consider investigating';
  } else if (measuredResistance >= limit.minimumResistance) {
    assessment = 'MARGINAL - Just meets minimum, investigate cause';
  } else {
    assessment = 'FAIL - Below minimum requirement, DO NOT ENERGIZE. Insulation breakdown present.';
  }
  
  return {
    compliant,
    requiredMinimum: limit.minimumResistance,
    testVoltageUsed: limit.testVoltage,
    assessment
  };
}
