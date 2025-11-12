/**
 * Emergency Fallback Testing Procedures
 * GN3-compliant templates when RAG data is insufficient
 */

export const ESSENTIAL_TESTING_PROCEDURES = {
  continuity: {
    testName: "R1+R2 Continuity Test",
    regulation: "BS 7671:2018+A3:2024 643.2.1",
    testSequence: 1,
    instrumentSetup: "Set Megger MFT1741 to Continuity mode (Ω symbol on rotary switch). Zero test leads first by shorting red and black probes together - display should read ≤0.05Ω. If reading is higher than 0.05Ω, clean probe tips with fine abrasive paper or replace test leads. Verify battery indicator shows sufficient charge (≥7V for accurate readings).",
    leadPlacement: "At Consumer Unit (origin): Connect RED lead to Line terminal of circuit breaker under test, BLACK lead to CPC (earth) terminal of same circuit on earth bar. At far end (e.g., socket outlet, shower isolator, furthest point): Use a SHORT test lead (≤300mm) to create a temporary link between the Line terminal and Earth terminal.",
    procedure: [
      "Step 1: Verify circuit is fully isolated and locked off with permit to work. Test for dead using voltage indicator.",
      "Step 2: Remove all loads from the circuit (unplug appliances, remove lamps from light fittings)",
      "Step 3: At the furthest point on the circuit, use a short test lead to link Line and CPC terminals together",
      "Step 4: At the consumer unit, connect test leads: Red to Line terminal, Black to CPC terminal",
      "Step 5: Press TEST button on MFT and hold for 2 seconds until reading stabilizes on display",
      "Step 6: Read the stable value displayed - this is your R1+R2 measurement in Ohms",
      "Step 7: Record result on Schedule of Test Results form (BS 7671 Appendix 6)"
    ],
    expectedResult: {
      calculated: "Depends on cable length and size. Example: 45m of 16mm² T&E = 0.88Ω (45m × 19.5mΩ/m × 2 for line + cpc)",
      tolerance: "±10% of calculated value is acceptable",
      maximumPermitted: "Must be low enough that Zs = Ze + R1+R2 complies with Table 41.3 for disconnection times",
      passCriteria: "Reading should be within 10% of calculated value and enable Zs compliance"
    },
    troubleshooting: [
      "If reading is HIGH (>expected by 20%): Check ALL termination tightness at BOTH ends using calibrated torque screwdriver (2.5Nm for 16mm², 1.2Nm for 10mm², 0.8Nm for 6mm²). Inspect for damaged conductor strands (broken during stripping/termination).",
      "If reading is VERY HIGH (>5Ω): Possible cable break or poor connection. Systematically test from CU to each junction box to isolate fault location. Check for loose terminal screws.",
      "If reading is LOWER than expected: Verify you haven't accidentally bridged Line-Neutral. Re-test with leads reversed. Check test lead zero reading is correct."
    ],
    safetyNotes: [
      "Circuit MUST be isolated and locked off before starting",
      "Use voltage proving device to confirm dead (not just rely on isolation)",
      "Do NOT touch exposed conductors during test",
      "Ensure no one can re-energize circuit (lock-off device + warning notices)"
    ]
  },
  
  insulation: {
    testName: "Insulation Resistance Test",
    regulation: "BS 7671:2018+A3:2024 643.3",
    testSequence: 2,
    instrumentSetup: "Set Megger MFT1741 to Insulation Resistance mode. Select 500V DC test voltage (for 230V circuits). For voltage selection: 250V DC for SELV/ELV circuits, 500V DC for LV circuits up to 500V, 1000V DC for circuits above 500V. Zero display and verify high-voltage warning LED illuminates during test.",
    leadPlacement: "Test between: (1) Line and Earth (L-E), (2) Neutral and Earth (N-E), (3) Line and Neutral (L-N). At consumer unit: Connect RED lead to Line, BLACK lead to Earth bar. For L-N test: RED to Line, BLACK to Neutral bar. Test at CU or at furthest point - either location is acceptable.",
    procedure: [
      "Step 1: REMOVE all equipment (unplug appliances, remove lamps, isolate surge protectors)",
      "Step 2: REMOVE any electronic equipment that could be damaged by 500V DC (e.g., LED drivers, smart switches)",
      "Step 3: Position all switches in ON position to test the complete circuit",
      "Step 4: Connect test leads for L-E test first (Red to Line, Black to Earth)",
      "Step 5: Press and HOLD TEST button continuously for minimum 60 seconds (display will climb)",
      "Step 6: Read final stabilized value after 60 seconds - this is your insulation resistance in MΩ",
      "Step 7: Repeat for N-E and L-N tests",
      "Step 8: Record all three readings on test schedule"
    ],
    expectedResult: {
      minimumPermitted: "≥1.0 MΩ for all tests (BS 7671 Table 61)",
      typical: "New installations typically achieve >200 MΩ. Older installations may show 10-50 MΩ (still acceptable if >1.0 MΩ)",
      measured: "Example: L-E = 350 MΩ, N-E = 380 MΩ, L-N = 400 MΩ",
      result: "PASS if all readings ≥1.0 MΩ"
    },
    troubleshooting: [
      "If reading is LOW (<1.0 MΩ): First, verify ALL equipment removed (appliances, lamps, electronic devices). Check for moisture ingress in outdoor/damp locations. Inspect cable damage (rodent chewing, mechanical damage during installation).",
      "If reading SLOWLY CLIMBS but doesn't stabilize: Indicates capacitance in long cable runs - normal behavior. Wait longer (up to 120 seconds) for final reading.",
      "If reading is ZERO or <0.01 MΩ: Direct short circuit present. Inspect recent work, junction boxes, and accessories for conductor strands bridging terminals. Use process of elimination - disconnect sections systematically."
    ],
    safetyNotes: [
      "⚠️ 500V DC output is DANGEROUS - can cause electric shock",
      "Ensure ALL personnel aware testing in progress",
      "Remove ALL equipment to prevent damage to electronics",
      "After test, DISCHARGE cable capacitance by briefly shorting L-N-E together"
    ]
  },
  
  earthFaultLoop: {
    testName: "Earth Fault Loop Impedance (Zs) Test",
    regulation: "BS 7671:2018+A3:2024 643.7.1",
    testSequence: 5,
    prerequisite: "Circuit MUST be energised (live test). Complete all dead tests first. If RCD present, lock out RCD or use no-trip mode on MFT.",
    instrumentSetup: "Set Megger MFT1741 to Earth Fault Loop Impedance (Zs) mode. If RCD is present on circuit, select NO-TRIP mode (typically <15mA test current). For non-RCD circuits, use standard mode. Verify 230V supply present before testing.",
    leadPlacement: "Test at the FURTHEST POINT on the circuit (e.g., final socket outlet, shower isolator switch). Use 3-pin test adapter: Insert RED probe into Live socket, BLACK probe into Neutral socket, YELLOW/GREEN probe into Earth socket. Ensure good contact - wiggle adapter to verify firm connection.",
    calculation: {
      formula: "Zs = Ze + (R1+R2)",
      Ze: "External earth fault loop impedance at origin (measure at consumer unit first) - typically 0.35Ω for TN-S, 0.8Ω for TN-C-S",
      R1R2: "Line-CPC loop resistance from dead test (e.g., 0.85Ω measured earlier)",
      expectedZs: "Example: 0.35Ω + 0.85Ω = 1.20Ω"
    },
    procedure: [
      "Step 1: Measure Ze (external loop impedance) at consumer unit first for comparison",
      "Step 2: Verify 230V present at test location using voltage indicator",
      "Step 3: If RCD present, either lock out RCD temporarily OR use no-trip mode on tester",
      "Step 4: Insert 3-pin test adapter firmly into socket outlet at furthest point",
      "Step 5: Connect test probes to adapter: Red→Live, Black→Neutral, Green/Yellow→Earth",
      "Step 6: Press TEST button (no-trip test takes ~2 seconds)",
      "Step 7: Read Zs value from display - typically 0.5Ω to 2.5Ω for domestic circuits",
      "Step 8: Compare measured Zs against maximum permitted value from BS 7671 Table 41.3"
    ],
    expectedResult: {
      calculated: "1.20Ω (Ze 0.35Ω + R1+R2 0.85Ω)",
      measured: "Example: 1.18Ω",
      maximumPermitted: "Depends on protective device - e.g., 1.44Ω for 63A Type B MCB (Table 41.3). Must achieve <0.4s disconnection per Reg 411.3.2",
      marginOfSafety: "Example: 1.44Ω max - 1.18Ω measured = 0.26Ω margin (18%)",
      result: "PASS if measured Zs < maximum permitted value"
    },
    interpretation: "Zs confirms earth fault protection operates within required disconnection time. Lower Zs = faster disconnection = better protection. Regulation 411.3.2 requires <0.4 seconds for socket circuits, <5 seconds for fixed equipment.",
    troubleshooting: [
      "If Zs is HIGH (approaching maximum): Check ALL earthing connections tight (main earth terminal, earth bar, CPC continuity). Verify parallel earth paths not relied upon. Consider upgrading earthing conductor or reducing cable length.",
      "If Zs is HIGHER than (Ze + R1+R2): Indicates poor earth connection. Tighten main earth terminal at consumer unit. Check MET (Main Earth Terminal) connection to supplier earth. Inspect earth rod if TT system.",
      "If tester trips RCD during test: Use no-trip mode. If already in no-trip mode, RCD may be faulty (nuisance tripping at <15mA) - investigate RCD separately per 643.10."
    ],
    safetyNotes: [
      "⚠️ LIVE CIRCUIT - competent person only",
      "Erect barriers around test area",
      "Verify voltage present before starting test",
      "Warning notices: 'TESTING IN PROGRESS'",
      "Ensure no one touches exposed conductors during test"
    ]
  },
  
  rcdTesting: {
    testName: "RCD Testing (30mA Type AC)",
    regulation: "BS 7671:2018+A3:2024 643.10",
    testSequence: 6,
    prerequisite: "Circuit must be live and RCD energised. Complete earth fault loop test first. Identify RCD type (AC, A, B, F) and rating (typically 30mA for socket circuits).",
    instrumentSetup: "Set Megger MFT1741 to RCD Test mode. Select RCD rating: 30mA for socket circuits, 100mA for fire protection, 300mA for equipment. Select RCD Type: AC (standard), A (if electronics present), B (if DC present). Perform tests at ×0.5, ×1, and ×5 rated current.",
    leadPlacement: "Test at a socket outlet on the LOAD SIDE of the RCD (not between RCD and consumer unit). Insert RCD test adapter into socket outlet. Connect RED probe to Live socket, BLACK to Neutral, GREEN/YELLOW to Earth. Verify RCD is reset and holding before starting tests.",
    procedure: [
      "Step 1: Verify RCD is functional - press TEST button on RCD unit itself (should trip immediately). Reset RCD.",
      "Step 2: Insert RCD test adapter into socket outlet downstream of RCD",
      "Step 3: Connect test leads to adapter: Red→L, Black→N, Green→E",
      "Step 4: Test 1 - Half current test (×0.5 = 15mA): Press ×0.5 button. RCD should NOT trip. Record 'OK' or 'TRIPPED'.",
      "Step 5: Reset RCD if it tripped (indicates over-sensitive RCD - investigate)",
      "Step 6: Test 2 - Rated current test (×1 = 30mA): Press ×1 button. RCD MUST trip within 300ms. Record trip time.",
      "Step 7: Reset RCD. Test 3 - Five times current (×5 = 150mA): Press ×5 button. RCD MUST trip within 40ms. Record trip time.",
      "Step 8: Repeat ×1 and ×5 tests with opposite polarity (reverse L-N connection or use tester polarity switch)",
      "Step 9: Record all results on Schedule of Test Results"
    ],
    expectedResult: {
      halfRatedCurrent: "Should NOT trip at 15mA (×0.5). If trips, RCD is over-sensitive.",
      ratedCurrent: "MUST trip within 300ms at 30mA (×1). Typical: 20-40ms",
      fiveTimesRated: "MUST trip within 40ms at 150mA (×5). Typical: 10-20ms",
      mechanicalTest: "RCD internal TEST button must trip RCD (proves mechanical operation)",
      result: "PASS if all criteria met and trip times within limits"
    },
    troubleshooting: [
      "If RCD DOES NOT TRIP at ×1 or ×5: RCD is FAULTY - replace immediately. This is a CRITICAL safety failure. Circuit must not be put into service.",
      "If RCD TRIPS at ×0.5 (half rated current): RCD is over-sensitive. This may cause nuisance tripping. Consider replacing with higher rated RCD (e.g., 100mA) if regulations permit, or investigate leakage current on circuit.",
      "If trip time is SLOW (>300ms at ×1): RCD is degraded. Replace RCD. Slow trip times may not provide adequate shock protection (<40ms for human safety).",
      "If mechanical TEST button does not trip RCD: Internal mechanism fault. Replace RCD immediately."
    ],
    safetyNotes: [
      "⚠️ Live testing - barriers and warning notices required",
      "Inform building occupants RCD will trip repeatedly",
      "Test during low-demand period to minimize disruption",
      "Verify RCD resets successfully between tests",
      "If RCD fails any test, circuit must remain isolated until RCD replaced"
    ]
  },
  
  polarity: {
    testName: "Polarity Verification",
    regulation: "BS 7671:2018+A3:2024 643.4",
    testSequence: 3,
    instrumentSetup: "Can be performed DEAD (using continuity tester linked to Line at origin) or LIVE (using voltage indicator or socket tester). DEAD method preferred during initial testing. Set MFT to Continuity mode. Create temporary link at consumer unit: Line terminal to Neutral terminal using test lead.",
    leadPlacement: "DEAD method: At consumer unit, temporarily link Line and Neutral terminals together. At each accessory (socket, switch, light fitting), test between Line terminal and Neutral terminal - should show continuity. LIVE method: Use socket polarity tester or voltage indicator to verify Line on correct terminal.",
    procedure: [
      "Step 1: DEAD POLARITY TEST - Temporarily link Line and Neutral at consumer unit",
      "Step 2: At each socket outlet, test between Line and Neutral terminals - should show continuity (<2Ω)",
      "Step 3: At each light switch, verify Line connected to switch terminal (not neutral)",
      "Step 4: At Edison Screw (ES) lampholders, verify Line to center pin, Neutral to thread",
      "Step 5: Verify NO polarity reversal (Line and Neutral swapped)",
      "Step 6: Remove temporary link at consumer unit",
      "Step 7: LIVE CONFIRMATION (after energisation): Use socket polarity tester at each outlet to verify correct polarity",
      "Step 8: Record results: 'Correct' or 'REVERSED' for each point"
    ],
    expectedResult: {
      sockets: "Line on RIGHT terminal (facing socket), Neutral on LEFT, Earth on TOP (UK standard BS 1363)",
      switches: "Line MUST be switched, never neutral. Double-pole switches break both L and N.",
      lightFittings: "Edison Screw (ES): Line to center pin, Neutral to thread. Bayonet Cap (BC): verify supply polarity correct",
      result: "PASS if all accessories show correct polarity"
    },
    troubleshooting: [
      "If polarity REVERSED at socket: Immediately rectify - DANGER of exposed live parts. Swap Line and Neutral at socket terminal.",
      "If neutral switched instead of line: Rewire to switch Line conductor. Neutral switching leaves equipment live when 'off' - safety hazard.",
      "If multiple sockets show reversed polarity: Check consumer unit terminations - Line and Neutral may be swapped at MCB/RCBO."
    ],
    safetyNotes: [
      "Polarity errors can make 'dead' equipment LIVE",
      "Edison Screw thread must be Neutral (not Live) to prevent shock when changing lamps",
      "Always verify polarity before declaring circuit safe for use"
    ]
  }
};

export function getEmergencyTestingProcedure(testType: string) {
  const normalized = testType.toLowerCase();
  
  if (normalized.includes('continuity') || normalized.includes('r1') || normalized.includes('r2')) {
    return ESSENTIAL_TESTING_PROCEDURES.continuity;
  }
  
  if (normalized.includes('insulation') || normalized.includes('ir') || normalized.includes('megger')) {
    return ESSENTIAL_TESTING_PROCEDURES.insulation;
  }
  
  if (normalized.includes('earth') || normalized.includes('loop') || normalized.includes('zs')) {
    return ESSENTIAL_TESTING_PROCEDURES.earthFaultLoop;
  }
  
  if (normalized.includes('rcd') || normalized.includes('residual')) {
    return ESSENTIAL_TESTING_PROCEDURES.rcdTesting;
  }
  
  if (normalized.includes('polarity')) {
    return ESSENTIAL_TESTING_PROCEDURES.polarity;
  }
  
  // Default to continuity as most fundamental test
  return ESSENTIAL_TESTING_PROCEDURES.continuity;
}
