/**
 * GN3 (Guidance Note 3) Verification Checklist
 *
 * This file tracks content accuracy against the IET Guidance Note 3: Inspection & Testing.
 * Use this to verify that all testing procedures and limits in the app match the official guidance.
 *
 * Reference: IET Guidance Note 3 (BS 7671:2018+A2:2022)
 * Source file: public/data/GUIDANCE-NOTE-3.txt
 */

export interface VerificationSection {
  verified: boolean;
  lastChecked: string;
  notes: string;
  keyPoints: string[];
  acceptanceLimits?: Record<string, string>;
  references?: string[];
}

export interface GN3VerificationChecklist {
  lastVerified: string;
  gnVersion: string;
  bs7671Version: string;
  sections: {
    safeIsolation: VerificationSection;
    continuityTesting: VerificationSection;
    insulationResistance: VerificationSection;
    polarityTesting: VerificationSection;
    earthFaultLoop: VerificationSection;
    rcdTesting: VerificationSection;
    pfcTesting: VerificationSection;
    functionalTesting: VerificationSection;
  };
}

export const gn3VerificationChecklist: GN3VerificationChecklist = {
  lastVerified: "2026-01-06",
  gnVersion: "GN3:2024",
  bs7671Version: "BS 7671:2018+A2:2022",

  sections: {
    safeIsolation: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 1.1 (Safety precautions) and referenced HSE GS38/HSR25",
      keyPoints: [
        "Observe HSE Guidance Note GS38 - Electrical test equipment for use on low voltage systems",
        "Where testing does not require equipment to be live, it should be made dead and safely isolated",
        "Safe isolation procedures detailed in Electrical Safety First Best Practice Guide No.2",
        "Main switch off, secured by safety locking device",
        "All fuses removed/inserted as appropriate, circuit breakers off/on as required for test",
        "Prove installation is dead using approved 2-pole contact voltage tester",
        "Test equipment must conform to BS EN 61010 series safety specifications",
        "Check test leads comply with GS38 - adequately insulated, suitable for overvoltage category (CAT II/III/IV)",
        "Test leads must have suitable HBC fuses or other current limiting means",
        "Check test equipment is complete, not damaged, leads clean with no cracked/broken insulation",
        "Note: Lock-off or otherwise secure the point(s) of isolation before proving dead"
      ],
      acceptanceLimits: {
        "CAT II": "Equipment supplied from building wiring (plug/permanently connected)",
        "CAT III": "Equipment forming part of building wiring (socket-outlets, distribution boards)",
        "CAT IV": "Equipment at/near origin (between building entrance and primary distribution board)",
        "Test voltage safety": ">50V AC or >120V DC dry, >25V AC or >60V DC wet/damp requires extra precautions"
      },
      references: [
        "GN3 Section 1.1 - Safety precautions",
        "GN3 Table 1.1 - Installation overvoltage category (CAT) markings",
        "HSE GS38 - Electrical test equipment for use on low voltage systems",
        "HSE HSR25 - Electricity at Work Regulations 1989 Guidance on Regulations",
        "BS EN 61010 series - Safety requirements for electrical equipment",
        "Electrical Safety First Best Practice Guide No.2 - Safe isolation procedures"
      ]
    },

    continuityTesting: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 2.6.5 (Regulation 643.2.1)",
      keyPoints: [
        "Regulation 411.3.1.1 requires cpc run to and terminated at each point in wiring and at each accessory",
        "Regulation 643.2.1 requires continuity check on ALL protective conductors (earthing, cpc, main/supplementary bonding)",
        "Test Method 1: Short L-cpc at DB, test L-E at each outlet - measures (R1+R2)",
        "Test Method 2: Wandering lead from MET to cpc at outlets - measures R2 only",
        "Use low-resistance ohmmeter (see GN3 Section 4.3)",
        "Test lead resistance must be measured and deducted OR auto-nulled by instrument",
        "Be aware of parallel earth return paths (steel conduit, trunking, MICC, SWA, metal stud walls)",
        "Parallel paths cause measured R2 to tend towards zero - may be impractical to disconnect",
        "(R1+R2) when added to Ze enables Zs verification (see Sections 2.6.14 and 2.6.15)",
        "Record (R1+R2) at circuit's extremity (furthest point from distribution board)",
        "For electronic control devices (dimmers, etc.): use alternative approach measuring (Rn+R2) instead",
        "Bonding conductor test: 15m of 6.0mm² or 25m of 10.0mm² ≈ 0.05Ω resistance"
      ],
      acceptanceLimits: {
        "Continuity": "No discontinuity in protective conductors",
        "R1+R2 calculation": "Use Table B1 values - e.g., 2.5mm²/1.5mm² cable = 19.51mΩ/m at 20°C",
        "R2 only calculation": "Use Table B1 - e.g., 2.5mm² conductor = 7.41mΩ/m at 20°C",
        "Example 55m radial": "(R1+R2) ≈ 1.07Ω for 2.5mm²/1.5mm² cable",
        "Bonding conductors": "Account for termination resistance; healthy connections negligible",
        "Zs verification": "Zs = Ze + (R1+R2) must satisfy BS 7671 Table 41.2/41.3/41.4"
      },
      references: [
        "GN3 Section 2.6.5 - Continuity of protective conductors including main and supplementary bonding",
        "GN3 Section 4.3 - Low-resistance ohmmeter",
        "GN3 Figure 2.13 - Test method 1 connections",
        "GN3 Figure 2.14 - Alternative test method 1 for electronic control devices",
        "GN3 Figure 2.15 - Test method 2 connections",
        "GN3 Appendix B - Resistance data for copper conductors",
        "BS 7671 Regulation 411.3.1.1",
        "BS 7671 Regulation 643.2.1"
      ]
    },

    insulationResistance: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 2.6.7, Table 2.9 (BS 7671 Table 64)",
      keyPoints: [
        "Test voltage: 250V DC for SELV/PELV circuits (minimum IR: 0.5MΩ)",
        "Test voltage: 500V DC for circuits up to 500V (minimum IR: 1.0MΩ)",
        "Test voltage: 1000V DC for circuits above 500V (minimum IR: 1.0MΩ)",
        "New installations should yield >20MΩ (below this should be investigated)",
        "Disconnect voltage-sensitive equipment (dimmers, timers, RCDs, RCBOs)",
        "Disconnect pilot/indicator lamps and capacitors",
        "Main switch OFF, all fuses in, circuit breakers closed (ON position)",
        "Test L-N, L-E, and N-E (or L&N to E for vulnerable equipment)",
        "Protective conductor must be connected to MET during test"
      ],
      acceptanceLimits: {
        "SELV/PELV": "250V DC test → ≥0.5MΩ minimum",
        "Up to 500V (inc FELV)": "500V DC test → ≥1.0MΩ minimum",
        "Above 500V": "1000V DC test → ≥1.0MΩ minimum",
        "New installation": "≥20MΩ expected (investigate if below)",
        "Healthy installation": "≥2MΩ typical"
      },
      references: [
        "GN3 Section 2.6.7 - Insulation resistance",
        "GN3 Table 2.9 - Minimum values of insulation resistance",
        "BS 7671 Regulation 643.3",
        "BS 7671 Table 64"
      ]
    },

    polarityTesting: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 2.6.12 (Regulation 643.6)",
      keyPoints: [
        "Verify polarity of ALL circuits before connection to supply",
        "Use ohmmeter or continuity range of insulation/continuity tester",
        "All fuses and single-pole control/protective devices must be in LINE conductor",
        "Centre contact of screw-type lampholders (Edison) connected to line (except E14/E27 to BS EN 60238)",
        "Verify correct connection of non-reversible plugs and socket-outlets",
        "Polarity checks required at ALL points to detect crossed conductors at junction boxes",
        "Remove all other lamps on circuit during test (may provide conductive L-N path)",
        "Can also verify by visually checking core colours at terminations",
        "Continuity tests (2.6.5, 2.6.6) help confirm polarity"
      ],
      references: [
        "GN3 Section 2.6.12 - Polarity testing",
        "BS 7671 Regulation 643.6",
        "BS 7671 Regulation 132.14.1 (single-pole devices)",
        "BS 7671 Regulation 530.3.2"
      ]
    },

    earthFaultLoop: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 2.6.15 (Regulation 643.7.3)",
      keyPoints: [
        "Formula: Zs = Ze + (R1+R2), or Zs = Zdb + (R1+R2) for sub-boards",
        "Earth fault loop comprises: cpc, MET, earthing conductor, return path, transformer, line conductor",
        "Two verification methods: (1) Direct measurement with EFLI tester (live), (2) R1+R2 from continuity + Ze",
        "Method 2 (R1+R2 + Ze) is preferred for final circuits and distribution circuits",
        "Ze measured at origin with main switch OPEN and earthing disconnected from MET (remove parallel paths)",
        "EFLI testers may trip 6A Type B breakers and any RCDs - use no-trip testers (<15mA or DC biased)",
        "Compare measured Zs with BS 7671 Tables 41.2/41.3/41.4",
        "Apply Cmin factor (0.95) and temperature correction - see GN3 Appendix A3 for adjustment methods",
        "RECONNECT EARTH before re-energizing installation"
      ],
      acceptanceLimits: {
        "Type B 6A": "≤7.28Ω (Table 41.3, 0.4s)",
        "Type B 16A": "≤2.73Ω (Table 41.3, 0.4s)",
        "Type B 32A": "≤1.37Ω (Table 41.3, 0.4s)",
        "Type B 40A": "≤1.09Ω (Table 41.3, 0.4s)",
        "Type C 32A": "≤0.68Ω (Table 41.4, 0.4s)",
        "30mA RCD TT": "≤1667Ω (50V/0.03A)",
        "Temperature adjustment": "See GN3 Appendix A3 - multiply rule-of-thumb factor or use tables"
      },
      references: [
        "GN3 Section 2.6.15 - Earth fault loop impedance (EFLI) verification",
        "GN3 Section 2.6.14 - Protection by automatic disconnection of supply (ADS)",
        "GN3 Appendix A - Maximum permissible measured EFLI",
        "BS 7671 Regulation 643.7.3",
        "BS 7671 Tables 41.2, 41.3, 41.4"
      ]
    },

    rcdTesting: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 2.6.18 and Table 2.17 (Regulations 643.7 and 643.8)",
      keyPoints: [
        "BEFORE using test instrument: Press RCD test button first (basic functional check)",
        "ESSENTIAL: Test EFLI first before RCD tests (for safety)",
        "Test at BOTH 0° and 180° (positive and negative half-cycles) - record LONGER time",
        "½×IΔn test: RCD should NOT trip",
        "1×IΔn test: Required by BS 7671 for ADS (643.7) and additional protection (643.8)",
        "5×IΔn test: OPTIONAL per BS 7671:2018+A2:2022 (for fault-finding purposes)",
        "Configure tester for correct RCD Type (AC, A, F, B) as marked on device",
        "Longest trip time at 0°/180° recorded in column 28 of Schedule of Test Results",
        "Type A/F/B RCDs require additional pulsed DC tests"
      ],
      acceptanceLimits: {
        "½×IΔn": "RCD should NOT trip",
        "Non-delay at 1×IΔn": "≤300ms (harmonized standards)",
        "S-delay at 1×IΔn": "≤500ms (harmonized standards)",
        "Non-delay at 5×IΔn": "≤40ms (optional test)",
        "S-delay at 5×IΔn": "≤150ms (optional test)",
        "Type A pulsed DC 1×": "≤300ms",
        "Type A pulsed DC 5×": "≤40ms (non-delay), ≤150ms (S-delay)",
        "Note": "Manufacturers may use 250mA instead of 5×IΔn for 30mA RCDs"
      },
      references: [
        "GN3 Section 2.6.18 - Operation and functional testing of RCDs",
        "GN3 Table 2.17 - Tests for RCDs",
        "BS 7671 Regulation 643.7 (ADS)",
        "BS 7671 Regulation 643.8 (additional protection)",
        "BS EN 61008, BS EN 61009, BS EN 60947-2, BS 7288:2016"
      ]
    },

    pfcTesting: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 2.6.16 (Regulation 643.7.3.201)",
      keyPoints: [
        "Regulation 643.7.3.201 requires determination of Ipf under both short-circuit AND earth fault conditions",
        "Must be determined at every relevant point (where protective device operates under fault conditions)",
        "May be done by: calculation, enquiry to DNO, or direct measurement with instrument",
        "If switchgear at origin is suitably rated, downstream devices of similar rating need no further checks",
        "Ipf decreases with increasing distance downstream of origin (unless other supply source connected)",
        "Regulation 434.5.1: Breaking capacity of each protective device must not be less than Ipf at installation point",
        "Maximum Ipf = greater of prospective short-circuit current and prospective earth fault current",
        "Measurement: Connect instrument between live conductors at protective device (power ON)",
        "Use prospective fault current range of suitable EFLI tester (see GN3 Section 4.5)",
        "Three-phase: Maximum balanced PSCC ≈ 2× single-phase value (rule of thumb, errs on safe side)",
        "Alternative: Measure L-L fault current and divide by 0.87 for more accurate three-phase result",
        "ALWAYS measure downstream of a protective device rated for anticipated Ipf",
        "Fused test leads alone NOT suitable - fit temporary protective device if needed",
        "Record greater of PSCC and earth fault current on EIC/EICR and Schedule of Test Results",
        "Note: May not produce accurate reading with grid-connected or island-mode inverters (Section 2.6.24)"
      ],
      acceptanceLimits: {
        "BS 3036 S1A": "1 kA rated breaking capacity",
        "BS 3036 S2A": "2 kA rated breaking capacity",
        "BS 3036 S4A": "4 kA rated breaking capacity",
        "BS 88-2 System E": "80 kA at 400V",
        "BS 88-2 System G": "50 kA at 230V or 80 kA at 400V",
        "BS EN 60898 Icn 6": "6 kA (Ics 6.0 kA)",
        "BS EN 60898 Icn 10": "10 kA (Ics 7.5 kA)",
        "BS EN 60898 Icn 15": "15 kA (Ics 7.5 kA)",
        "BS EN 60898 Icn 20": "20 kA (Ics 10.0 kA)",
        "BS EN 60898 Icn 25": "25 kA (Ics 12.5 kA)",
        "Domestic (consumer unit)": "Up to 16 kA - no measurement needed if DNO declares ≤16kA (BS EN 61439-3)",
        "Note Icn vs Ics": "Icn = max interrupt (may alter device), Ics = max interrupt without loss of performance"
      },
      references: [
        "GN3 Section 2.6.16 - Prospective fault current (Ipf)",
        "GN3 Table 2.16 - Rated short-circuit capacities of protective devices",
        "GN3 Section 4.5 - EFLI tester (final paragraph)",
        "GN3 Appendix 14 - Further guidance on Ipf requirements",
        "BS 7671 Regulation 643.7.3.201",
        "BS 7671 Regulation 434.1",
        "BS 7671 Regulation 434.5.1",
        "BS 7671 Appendix 14",
        "BS EN 60898, BS EN 61009, BS EN 61439-3"
      ]
    },

    functionalTesting: {
      verified: true,
      lastChecked: "2026-01-06",
      notes: "Verified against GN3 Section 2.6.19 (Regulation 643.10)",
      keyPoints: [
        "Switchgear, controls and interlocks should be functionally tested (operated to confirm they work)",
        "Confirm equipment is properly installed, mounted and adjusted",
        "Check settings on all adjustable relays and controls align with designer's requirements",
        "RCD test buttons should be operated to see that the RCD trips",
        "BS 7671 Regulation 514.12.2: RCD test button recommended to be pressed at least every 6 months",
        "AFDDs (18th Edition, Regulation 532.6): Two types - with test button or automatic test facility",
        "AFDDs with test button: Functional test by pressing test button only",
        "AFDDs without test button: No means of functional testing available",
        "Circuit-breakers should NOT be used as lighting switches regularly unless manufacturer approved",
        "Functional testing of energy storage/PV management devices can be complex - check documentation",
        "For dwellings with EESS/PV: Ensure suitable commissioning records and maintenance information provided"
      ],
      acceptanceLimits: {
        "Switchgear/controls": "Must operate correctly and be properly installed/adjusted",
        "RCD test button": "RCD must trip when test button pressed",
        "AFDD test button": "AFDD must trip when test button pressed (where fitted)",
        "Adjustable devices": "Settings must match designer's requirements",
        "Circuit-breakers": "Not for regular switching duty unless manufacturer approved"
      },
      references: [
        "GN3 Section 2.6.19 - Other functional testing",
        "GN3 Section 2.6.18 - Operation and functional testing of RCDs",
        "BS 7671 Regulation 643.10",
        "BS 7671 Regulation 514.12.2 (RCD test button)",
        "BS 7671 Regulation 532.6 (AFDDs)",
        "IET Code of Practice for Electrical Energy Storage Systems",
        "IET Code of Practice for Grid-Connected Solar Photovoltaic Systems"
      ]
    }
  }
};

/**
 * Helper function to check if all sections are verified
 */
export function areAllSectionsVerified(checklist: GN3VerificationChecklist): boolean {
  return Object.values(checklist.sections).every(section => section.verified);
}

/**
 * Helper function to get unverified sections
 */
export function getUnverifiedSections(checklist: GN3VerificationChecklist): string[] {
  return Object.entries(checklist.sections)
    .filter(([_, section]) => !section.verified)
    .map(([name, _]) => name);
}

/**
 * Testing sequence order per GN3
 * This is the recommended order for initial verification
 */
export const gn3TestingSequence = [
  {
    order: 1,
    test: "Safe Isolation",
    phase: "Before any testing",
    required: true
  },
  {
    order: 2,
    test: "Continuity of Protective Conductors",
    phase: "Dead testing",
    required: true
  },
  {
    order: 3,
    test: "Continuity of Ring Final Circuit Conductors",
    phase: "Dead testing",
    required: true
  },
  {
    order: 4,
    test: "Insulation Resistance",
    phase: "Dead testing",
    required: true
  },
  {
    order: 5,
    test: "Polarity (initial check)",
    phase: "Dead testing",
    required: true
  },
  {
    order: 6,
    test: "Earth Electrode Resistance",
    phase: "Dead testing (TT systems)",
    required: false
  },
  {
    order: 7,
    test: "Prospective Fault Current",
    phase: "Live testing",
    required: true
  },
  {
    order: 8,
    test: "Earth Fault Loop Impedance",
    phase: "Live testing",
    required: true
  },
  {
    order: 9,
    test: "RCD Operation",
    phase: "Live testing",
    required: true
  },
  {
    order: 10,
    test: "Functional Testing",
    phase: "Live testing",
    required: true
  },
  {
    order: 11,
    test: "Polarity (confirmation)",
    phase: "Live testing",
    required: true
  }
];

/**
 * Common test equipment requirements per GS38
 */
export const testEquipmentRequirements = {
  voltageIndicator: {
    requirement: "GS38 compliant",
    features: [
      "Shrouded probes with maximum 2mm exposed tip",
      "Finger barriers or recessed probes",
      "Fused leads for >10mA instruments",
      "Maximum 600V CAT III or CAT IV rated"
    ]
  },
  lowOhmMeter: {
    requirement: "Continuity testing",
    features: [
      "Resolution to 0.01Ω",
      "Test current between 200mA and 1A",
      "Four-terminal measurement for accuracy"
    ]
  },
  insulationTester: {
    requirement: "Insulation resistance testing",
    features: [
      "250V, 500V, 1000V DC test voltages",
      "Minimum 1mA test current",
      "Display in MΩ"
    ]
  },
  loopImpedanceTester: {
    requirement: "Earth fault loop impedance",
    features: [
      "Measures Zs and Ze",
      "Resolution to 0.01Ω",
      "No-trip capability for RCD protected circuits"
    ]
  },
  rcdTester: {
    requirement: "RCD testing",
    features: [
      "Tests at 1/2×, 1×, 5× IΔn",
      "Tests both positive and negative half-cycles",
      "Displays trip time in milliseconds",
      "0°/180° phase angle selection"
    ]
  },
  pfcMeter: {
    requirement: "Prospective fault current",
    features: [
      "Measures in kA",
      "L-N and L-E fault conditions",
      "Resolution appropriate to installation size"
    ]
  }
};
