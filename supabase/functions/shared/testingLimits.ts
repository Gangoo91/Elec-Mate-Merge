/**
 * Electrical Testing Limits & Acceptable Values
 * Based on BS 7671:2018+A3:2024 and GS 38 guidance
 * 
 * For use in Commissioning & Testing agents
 */

export interface TestLimit {
  testType: string;
  description: string;
  minValue?: number;
  maxValue?: number;
  unit: string;
  circuitType?: string;
  voltageLevel?: string;
  regulation: string;
  notes?: string;
}

/**
 * Insulation Resistance Test Limits
 * BS 7671 Regulation 612.3
 */
export const INSULATION_RESISTANCE_LIMITS: TestLimit[] = [
  {
    testType: 'insulation_resistance',
    description: 'SELV and PELV circuits',
    minValue: 0.5,
    unit: 'MΩ',
    circuitType: 'extra_low_voltage',
    voltageLevel: 'SELV/PELV',
    regulation: 'BS 7671 Table 61',
    notes: 'Test voltage: 250V DC'
  },
  {
    testType: 'insulation_resistance',
    description: 'Circuits up to 500V (excluding SELV/PELV)',
    minValue: 1.0,
    unit: 'MΩ',
    circuitType: 'final_circuit',
    voltageLevel: 'up_to_500V',
    regulation: 'BS 7671 Table 61',
    notes: 'Test voltage: 500V DC (230V circuits)'
  },
  {
    testType: 'insulation_resistance',
    description: 'Circuits above 500V',
    minValue: 1.0,
    unit: 'MΩ',
    circuitType: 'distribution',
    voltageLevel: 'above_500V',
    regulation: 'BS 7671 Table 61',
    notes: 'Test voltage: 1000V DC'
  }
];

/**
 * Continuity Test Limits
 * BS 7671 Regulation 612.2
 */
export const CONTINUITY_TEST_LIMITS: TestLimit[] = [
  {
    testType: 'continuity',
    description: 'Ring final circuit continuity (R1+R2)',
    maxValue: 1.67,
    unit: 'Ω',
    circuitType: 'ring_final',
    regulation: 'BS 7671 612.2.2',
    notes: 'Value should be approximately 1.67 times the resistance of each leg'
  },
  {
    testType: 'continuity',
    description: 'Protective conductor continuity',
    maxValue: 0.5,
    unit: 'Ω',
    circuitType: 'all',
    regulation: 'BS 7671 612.2.1',
    notes: 'Low resistance indicates good connection'
  }
];

/**
 * Earth Fault Loop Impedance (Zs) Maximum Values
 * BS 7671 Appendix 3 Table 3A (extract - common values)
 */
export const EARTH_FAULT_LOOP_IMPEDANCE_LIMITS: TestLimit[] = [
  {
    testType: 'earth_loop_impedance',
    description: 'B6 MCB (6A)',
    maxValue: 7.66,
    unit: 'Ω',
    circuitType: 'final_circuit',
    voltageLevel: '230V',
    regulation: 'BS 7671 Appendix 3 Table 3A',
    notes: '0.4s disconnection time'
  },
  {
    testType: 'earth_loop_impedance',
    description: 'B16 MCB (16A)',
    maxValue: 2.87,
    unit: 'Ω',
    circuitType: 'final_circuit',
    voltageLevel: '230V',
    regulation: 'BS 7671 Appendix 3 Table 3A',
    notes: '0.4s disconnection time'
  },
  {
    testType: 'earth_loop_impedance',
    description: 'B32 MCB (32A)',
    maxValue: 1.44,
    unit: 'Ω',
    circuitType: 'final_circuit',
    voltageLevel: '230V',
    regulation: 'BS 7671 Appendix 3 Table 3A',
    notes: '0.4s disconnection time'
  },
  {
    testType: 'earth_loop_impedance',
    description: 'B40 MCB (40A)',
    maxValue: 1.15,
    unit: 'Ω',
    circuitType: 'shower_circuit',
    voltageLevel: '230V',
    regulation: 'BS 7671 Appendix 3 Table 3A',
    notes: '0.4s disconnection time'
  }
];

/**
 * RCD Test Limits
 * BS 7671 Regulation 612.13
 */
export const RCD_TEST_LIMITS: TestLimit[] = [
  {
    testType: 'rcd_trip_time',
    description: 'RCD trip time at 1× rated current (30mA)',
    maxValue: 300,
    unit: 'ms',
    circuitType: 'rcd_protected',
    regulation: 'BS 7671 612.13',
    notes: 'General purpose RCD - should trip within 300ms'
  },
  {
    testType: 'rcd_trip_time',
    description: 'RCD trip time at 5× rated current (30mA)',
    maxValue: 40,
    unit: 'ms',
    circuitType: 'rcd_protected',
    regulation: 'BS 7671 612.13',
    notes: 'Must trip within 40ms at 5× rated residual current'
  },
  {
    testType: 'rcd_trip_time',
    description: 'Type A RCD (socket outlets)',
    maxValue: 300,
    unit: 'ms',
    circuitType: 'socket_outlet',
    regulation: 'BS 7671 531.3.3',
    notes: 'Type A RCD required for socket outlets (pulsating DC protection)'
  },
  {
    testType: 'rcd_trip_current',
    description: 'RCD rated residual current (IΔn)',
    minValue: 50,
    maxValue: 100,
    unit: '% of IΔn',
    circuitType: 'rcd_protected',
    regulation: 'BS 7671 612.13',
    notes: 'Should trip between 50% and 100% of rated current'
  }
];

/**
 * Polarity Test Requirements
 * BS 7671 Regulation 612.6
 */
export const POLARITY_TEST_REQUIREMENTS = {
  testType: 'polarity',
  description: 'All single-pole devices (switches, fuses, CBs) must be connected in line conductor only',
  regulation: 'BS 7671 612.6',
  checks: [
    'Correct polarity at origin',
    'Line conductor connected to centre contact of Edison screw lampholders',
    'Line conductor switched in all single-pole switching devices',
    'Socket outlets and similar accessories correctly connected'
  ]
};

/**
 * Test Sequence (Dead Tests → Live Tests)
 * BS 7671 Part 6
 */
export const TEST_SEQUENCE = [
  {
    order: 1,
    category: 'dead',
    test: 'Continuity of protective conductors',
    regulation: '612.2.1',
    voltage: 'Dead'
  },
  {
    order: 2,
    category: 'dead',
    test: 'Continuity of ring final circuit conductors',
    regulation: '612.2.2',
    voltage: 'Dead'
  },
  {
    order: 3,
    category: 'dead',
    test: 'Insulation resistance',
    regulation: '612.3',
    voltage: 'Dead (250V/500V/1000V DC test voltage)'
  },
  {
    order: 4,
    category: 'dead',
    test: 'Polarity',
    regulation: '612.6',
    voltage: 'Dead (can also test live)'
  },
  {
    order: 5,
    category: 'live',
    test: 'Earth fault loop impedance (Zs)',
    regulation: '612.9',
    voltage: 'Live'
  },
  {
    order: 6,
    category: 'live',
    test: 'RCD operating time and residual current',
    regulation: '612.13',
    voltage: 'Live'
  },
  {
    order: 7,
    category: 'live',
    test: 'Functional testing',
    regulation: '612.14',
    voltage: 'Live'
  }
];

/**
 * Get test limits for specific test type
 */
export function getTestLimits(testType: string): TestLimit[] {
  const allLimits = [
    ...INSULATION_RESISTANCE_LIMITS,
    ...CONTINUITY_TEST_LIMITS,
    ...EARTH_FAULT_LOOP_IMPEDANCE_LIMITS,
    ...RCD_TEST_LIMITS
  ];
  
  return allLimits.filter(limit => limit.testType === testType);
}

/**
 * Validate test result against limits
 */
export function validateTestResult(
  testType: string,
  measuredValue: number,
  circuitType?: string
): { pass: boolean; limit?: TestLimit; message: string } {
  const limits = getTestLimits(testType);
  
  const applicableLimit = circuitType
    ? limits.find(l => l.circuitType === circuitType)
    : limits[0];
  
  if (!applicableLimit) {
    return {
      pass: false,
      message: `No test limits found for ${testType}`
    };
  }
  
  const { minValue, maxValue } = applicableLimit;
  
  if (minValue !== undefined && measuredValue < minValue) {
    return {
      pass: false,
      limit: applicableLimit,
      message: `FAIL: ${measuredValue}${applicableLimit.unit} is below minimum ${minValue}${applicableLimit.unit}`
    };
  }
  
  if (maxValue !== undefined && measuredValue > maxValue) {
    return {
      pass: false,
      limit: applicableLimit,
      message: `FAIL: ${measuredValue}${applicableLimit.unit} exceeds maximum ${maxValue}${applicableLimit.unit}`
    };
  }
  
  return {
    pass: true,
    limit: applicableLimit,
    message: `PASS: ${measuredValue}${applicableLimit.unit} is within acceptable limits`
  };
}
