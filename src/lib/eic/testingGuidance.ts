// Testing Guidance Generator
// BS 7671:2018+A3:2024 - Inspection and Testing

import { EICCircuitData } from '@/types/eic-integration';

export interface TestingGuidanceStep {
  test: string;
  regulation: string;
  procedure: string;
  acceptanceCriteria: string;
  equipment: string[];
  safetyNotes: string[];
}

export function generateTestingGuidance(
  circuit: EICCircuitData
): TestingGuidanceStep[] {
  const guidance: TestingGuidanceStep[] = [];

  // Test 1: Continuity of Protective Conductors (R1+R2)
  guidance.push({
    test: 'Continuity of Protective Conductors (R1+R2)',
    regulation: 'BS 7671 Reg 612.2',
    procedure: `1. Isolate circuit at consumer unit
2. Disconnect circuit protective conductor (CPC) at the consumer unit
3. Connect one test lead to the line conductor at the consumer unit
4. Connect other test lead to the CPC at the furthest point on the circuit
5. Link line and CPC together at the furthest point
6. Measure resistance - this is R1+R2
7. Expected value: ${circuit.r1r2}
8. Record result on EIC Schedule`,
    acceptanceCriteria: `R1+R2 ≤ ${circuit.r1r2}`,
    equipment: [
      'Low resistance ohmmeter',
      'Test leads (long enough to reach circuit end)',
      'Temporary link (for connecting L-CPC at furthest point)'
    ],
    safetyNotes: [
      '⚠️ Ensure circuit is isolated before testing',
      '⚠️ Check test leads for continuity before use',
      '⚠️ Remove any parallel paths that may affect readings'
    ]
  });

  // Test 2: Insulation Resistance
  guidance.push({
    test: 'Insulation Resistance',
    regulation: 'BS 7671 Reg 612.3',
    procedure: `1. Ensure all equipment is disconnected or switched off
2. Remove lamps and link switches to ON position
3. Test 1: Link Line and Neutral together, test between L+N and Earth
   - Apply ${circuit.insulationTestVoltage}
   - Minimum: ${circuit.insulationResistance}
4. Test 2: Test between Line and Neutral
   - Apply ${circuit.insulationTestVoltage}
   - Minimum: ${circuit.insulationResistance}
5. Record both readings on EIC Schedule`,
    acceptanceCriteria: circuit.insulationResistance,
    equipment: [
      'Insulation resistance tester (500V DC)',
      'Test leads',
      'Warning notices for equipment'
    ],
    safetyNotes: [
      '⚠️ Disconnect or protect all electronic equipment',
      '⚠️ Ensure circuit is isolated',
      '⚠️ Discharge capacitance after testing',
      '⚠️ Do not exceed 500V for SELV/PELV circuits'
    ]
  });

  // Test 3: Polarity
  guidance.push({
    test: 'Polarity',
    regulation: 'BS 7671 Reg 612.6',
    procedure: `1. Visual inspection at consumer unit:
   - Check line conductor connected to MCB
   - Check neutral connected to neutral bar
   - Check CPC connected to earth bar
2. Test at load end:
   - For socket circuits: Use socket tester or continuity tester
   - For lighting: Check line to center contact of lampholders
   - For switches: Check switching is in line conductor only
3. Verify ${circuit.polarity}
4. Record result on EIC Schedule`,
    acceptanceCriteria: 'Correct polarity throughout - line conductor to switching contacts and center contacts',
    equipment: [
      'Socket tester (for socket circuits)',
      'Continuity tester',
      'Multimeter'
    ],
    safetyNotes: [
      '⚠️ Can be tested live or dead',
      '⚠️ If testing live, use appropriate PPE',
      '⚠️ Incorrect polarity is a dangerous fault - must be corrected'
    ]
  });

  // Test 4: Earth Fault Loop Impedance (Zs)
  guidance.push({
    test: 'Earth Fault Loop Impedance (Zs)',
    regulation: 'BS 7671 Reg 612.9',
    procedure: `1. Ensure circuit is energized
2. Test at the furthest point on the circuit
3. Measure Zs using earth loop impedance tester
4. Compare measured value with maximum permitted: ${circuit.maxZs}Ω
5. Expected measured value: approximately ${circuit.zs}Ω
6. Ensure measured Zs ≤ maximum permitted
7. Record result on EIC Schedule`,
    acceptanceCriteria: `Zs ≤ ${circuit.maxZs}Ω (Maximum permitted for ${circuit.protectiveDeviceCurve}${circuit.protectiveDeviceRating} ${circuit.protectiveDeviceType})`,
    equipment: [
      'Earth fault loop impedance tester',
      'Test leads',
      'Socket adapter (if testing socket circuit)'
    ],
    safetyNotes: [
      '⚠️ Circuit must be live for this test',
      '⚠️ Use appropriate PPE',
      '⚠️ Test may briefly disconnect RCDs - warn occupants',
      '⚠️ High Zs readings indicate dangerous fault - isolate and investigate'
    ]
  });

  // Test 5: RCD Operation (if applicable)
  if (circuit.rcdRating) {
    guidance.push({
      test: 'RCD Operation',
      regulation: 'BS 7671 Reg 612.13',
      procedure: `1. Test at 1× IΔn (${circuit.rcdRating}):
   - RCD must trip
   - Record trip time: ${circuit.rcdOneX || '< 300ms'}
   - Reset RCD
2. Test at 5× IΔn (${parseInt(circuit.rcdRating) * 5}mA):
   - RCD must trip
   - Record trip time: < 40ms
   - Reset RCD
3. Test RCD test button:
   - Press test button
   - RCD must trip
   - Result: ${circuit.rcdTestButton || 'To be tested'}
4. Record all results on EIC Schedule`,
      acceptanceCriteria: `1× IΔn: ${circuit.rcdOneX || '< 300ms'}\n5× IΔn: < 40ms\nTest button: Must trip`,
      equipment: [
        'RCD tester',
        'Test leads',
        'Socket adapter (if applicable)'
      ],
      safetyNotes: [
        '⚠️ Circuit must be live for this test',
        '⚠️ Test will cause temporary disconnection',
        '⚠️ Warn occupants before testing',
        '⚠️ RCD that fails to trip is a dangerous fault'
      ]
    });
  }

  // Test 6: AFDD Testing (if applicable)
  if (circuit.afddTest) {
    guidance.push({
      test: 'Arc Fault Detection Device (AFDD) Testing',
      regulation: 'BS 7671 Reg 421.1.7',
      procedure: `1. Verify AFDD is correctly installed and powered
2. Press AFDD test button
3. AFDD must trip and disconnect circuit
4. Reset AFDD
5. Verify indicator lights show normal operation
6. Record result: ${circuit.afddTest}`,
      acceptanceCriteria: 'AFDD trips on test button operation',
      equipment: [
        'None required (built-in test function)'
      ],
      safetyNotes: [
        '⚠️ Test button only verifies internal circuitry',
        '⚠️ Does not test arc detection capability',
        '⚠️ For full testing, specialist equipment required'
      ]
    });
  }

  // Test 7: Functional Testing
  guidance.push({
    test: 'Functional Testing',
    regulation: 'BS 7671 Reg 612.13.2',
    procedure: `1. Test all switches and controls operate correctly
2. Verify all loads function as intended
3. Check operation of any control equipment (timers, sensors, etc.)
4. Verify proper operation under full load
5. Confirm correct operation of protection devices
6. Record any defects or observations
7. Result: ${circuit.functionalTesting || 'To be completed'}`,
    acceptanceCriteria: 'All equipment operates correctly and safely',
    equipment: [
      'Visual inspection',
      'Load testing equipment (if applicable)'
    ],
    safetyNotes: [
      '⚠️ Observe equipment during initial energization',
      '⚠️ Check for abnormal sounds, smells, or heat',
      '⚠️ Verify correct rotation for three-phase motors'
    ]
  });

  return guidance;
}

/**
 * Generate testing sequence order
 * Tests should be performed in this order for safety and efficiency
 */
export function getTestingSequence(): {
  order: number;
  testName: string;
  circuitState: 'isolated' | 'energized';
  priority: 'critical' | 'essential' | 'functional';
}[] {
  return [
    {
      order: 1,
      testName: 'Continuity of Protective Conductors (R1+R2)',
      circuitState: 'isolated',
      priority: 'critical'
    },
    {
      order: 2,
      testName: 'Insulation Resistance',
      circuitState: 'isolated',
      priority: 'critical'
    },
    {
      order: 3,
      testName: 'Polarity',
      circuitState: 'isolated',
      priority: 'critical'
    },
    {
      order: 4,
      testName: 'Earth Fault Loop Impedance (Zs)',
      circuitState: 'energized',
      priority: 'critical'
    },
    {
      order: 5,
      testName: 'RCD Operation',
      circuitState: 'energized',
      priority: 'essential'
    },
    {
      order: 6,
      testName: 'AFDD Testing',
      circuitState: 'energized',
      priority: 'essential'
    },
    {
      order: 7,
      testName: 'Functional Testing',
      circuitState: 'energized',
      priority: 'functional'
    }
  ];
}
