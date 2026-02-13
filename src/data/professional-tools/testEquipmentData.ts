import type { TestInstrument, MFTFunction } from "./types";

export const testInstruments: TestInstrument[] = [
  // ─── Basic Tier (Year 1-2) ─────────────────────────────────────────────
  {
    name: "Proving Unit",
    description:
      "Generates a known voltage to confirm your voltage tester is working correctly before and after each test. This is a legal requirement under GS38 — you must prove your tester BEFORE and AFTER each test.",
    price: "£35-70",
    tier: "basic",
    brands: ["Martindale", "Fluke", "Kewtech", "Di-Log"],
    calibration: "No calibration required — replace battery as needed",
    apprenticeTip:
      "GS38 requires prove-test-prove. Prove your tester on the proving unit, test the circuit, then prove again. If your tester fails the second prove, your test result is invalid.",
  },
  {
    name: "Voltage Indicator (Two-Pole Tester)",
    description:
      "Two-pole voltage tester for confirming dead before work. Must comply with GS38 guidance — LED indication with a clear display. This is NOT a multimeter — it is purpose-built for proving dead.",
    price: "£65-200",
    tier: "basic",
    brands: ["Fluke T6", "Martindale VT28", "Kewtech KT1780", "Di-Log DL6780"],
    calibration: "Recalibrate annually or after a drop/impact",
    apprenticeTip:
      "A two-pole tester is the ONLY acceptable way to prove dead. Never use a multimeter for proving dead — they can give false readings with ghost voltages. Must comply with HSE GS38.",
  },
  {
    name: "Non-Contact Voltage Detector (Voltstick)",
    description:
      "Pen-type detector that beeps/lights near live conductors WITHOUT touching them. Useful for initial checks but NEVER as the sole method of proving dead.",
    price: "£15-40",
    tier: "basic",
    brands: ["Fluke", "Martindale", "Kewtech"],
    calibration: "No calibration — test on a known live source before each use",
    apprenticeTip:
      "A voltstick is a useful first check but can give false positives and false negatives. ALWAYS follow up with a two-pole tester. Never rely on it alone.",
  },
  {
    name: "Socket Tester",
    description:
      "Plug-in tester that checks socket wiring for correct polarity, earth connection, and common faults. Quick go/no-go test for sockets.",
    price: "£10-30",
    tier: "basic",
    brands: ["Martindale", "Kewtech", "Di-Log"],
    apprenticeTip:
      "Good for a quick visual check after installing sockets. Cannot replace proper dead testing and circuit verification with a multifunction tester.",
  },
  {
    name: "Continuity Tester / Buzzer",
    description:
      "Simple go/no-go continuity tester that beeps when a circuit is complete. Faster than an MFT for quick checks during wiring. Battery powered with test leads.",
    price: "£10-25",
    tier: "basic",
    brands: ["Martindale", "Fluke", "C.K"],
    apprenticeTip:
      "Brilliant for checking you have the right cable at the other end of a long run. Not a substitute for proper continuity testing with an MFT for certification.",
  },
  {
    name: "Basic Clamp Meter",
    description:
      "Measures current by clamping around a conductor — no need to break the circuit. Useful for measuring load current, checking for balanced phases, and fault finding.",
    price: "£30-80",
    tier: "basic",
    brands: ["Fluke", "Megger", "Kewtech"],
    calibration: "Recalibrate annually",
    apprenticeTip:
      "Clamp around a SINGLE conductor, not the whole cable. Clamping around all conductors cancels out and reads zero (unless there is an earth fault).",
  },

  // ─── Professional Tier (Year 3+) ──────────────────────────────────────
  {
    name: "Multifunction Tester (MFT)",
    description:
      "The essential professional test instrument. Performs all BS 7671 required tests: continuity, insulation resistance, loop impedance, RCD testing, and more. Required for issuing any electrical certificate.",
    price: "£450-1100",
    tier: "professional",
    functions: [
      "Continuity (R1+R2, r1, r2)",
      "Insulation Resistance (IR)",
      "Loop Impedance (Zs, Ze)",
      "RCD Trip Time",
      "RCD Ramp Test",
      "Prospective Fault Current (PFC/PSCC)",
      "Phase Rotation",
      "Earth Electrode Resistance",
    ],
    brands: ["Fluke 1664 FC", "Megger MFT1741", "Kewtech KT66DL", "Metrel"],
    calibration: "MUST be calibrated annually — uncalibrated results are invalid",
    apprenticeTip:
      "Your MFT is the most expensive tool you will buy, but also the most important. An uncalibrated MFT means invalid certificates. Keep the calibration certificate with the instrument.",
  },
  {
    name: "PAT Tester",
    description:
      "Portable Appliance Tester for testing the safety of electrical appliances. Tests earth continuity, insulation resistance, earth leakage, and lead polarity.",
    price: "£250-700",
    tier: "professional",
    brands: ["Megger", "Seaward", "Kewtech", "Metrel"],
    calibration: "Calibrate annually",
    apprenticeTip:
      "PAT testing is a good side income stream for electricians. The IET Code of Practice for In-Service Inspection and Testing is the key reference.",
  },
  {
    name: "Thermal Imaging Camera",
    description:
      "Infrared camera that shows heat patterns in electrical installations. Identifies hot spots from loose connections, overloaded circuits, and failing components before they cause fires.",
    price: "£250-900",
    tier: "professional",
    brands: ["FLIR", "Fluke", "Milwaukee"],
    apprenticeTip:
      "Hot joints (loose connections) are a leading cause of electrical fires. A thermal camera finds problems that visual inspection cannot. Take before/after images for records.",
  },
  {
    name: "Power Quality Analyser",
    description:
      "Advanced instrument for measuring voltage quality, harmonics, power factor, and transients. Used for troubleshooting complex power problems and energy audits.",
    price: "£800-3000",
    tier: "professional",
    brands: ["Fluke", "Megger", "Dranetz"],
    calibration: "Calibrate annually",
    apprenticeTip:
      "You probably will not need one of these early in your career, but understanding what they measure will set you apart. Useful for commercial and industrial fault finding.",
  },
  {
    name: "Earth Electrode Tester",
    description:
      "Specialist instrument for measuring earth electrode resistance using the fall-of-potential method. Essential for installations with earth electrodes (TT systems).",
    price: "£250-500",
    tier: "professional",
    brands: ["Megger", "Fluke", "Kewtech"],
    calibration: "Calibrate annually",
    apprenticeTip:
      "Many MFTs include an earth electrode test function, but a dedicated tester is more accurate. TT installations (common in rural areas) need earth electrode testing at every periodic inspection.",
  },
];

export const mftFunctions: MFTFunction[] = [
  {
    test: "Continuity (R1+R2)",
    purpose: "Confirms the circuit protective conductor (CPC / earth) is continuous from the DB to the furthest point. Measures the combined resistance of the live and earth conductors.",
    acceptableRange: "Below the design value — typically 0.01Ω to 1.5Ω depending on cable size and length",
    standard: "BS 7671 Regulation 612.2",
  },
  {
    test: "Insulation Resistance (IR)",
    purpose: "Tests that the insulation between live conductors, and between live conductors and earth, is intact. Detects breakdown, moisture, or damage.",
    acceptableRange: "Minimum 1MΩ (megaohm) at 500V DC test voltage for LV circuits. Higher is better — a new installation should read >200MΩ.",
    standard: "BS 7671 Regulation 612.3",
  },
  {
    test: "Loop Impedance (Zs)",
    purpose: "Measures the earth fault loop impedance to confirm that the protective device (MCB/fuse) will disconnect within the required time in a fault condition.",
    acceptableRange: "Must be below the maximum Zs value for the protective device — refer to BS 7671 Table 41.2 to 41.6",
    standard: "BS 7671 Regulation 612.9",
  },
  {
    test: "External Loop (Ze)",
    purpose: "Measures the impedance of the supply side of the installation — from the transformer to the main earthing terminal.",
    acceptableRange: "TN-C-S: 0.35Ω max | TN-S: 0.8Ω max | TT: 21Ω max (typical, depends on electrode)",
    standard: "BS 7671 Regulation 612.9",
  },
  {
    test: "RCD Trip Time",
    purpose: "Tests that RCDs disconnect within the required time at rated residual current (IΔn). Ensures the RCD provides the expected fault protection.",
    acceptableRange: "30mA Type A/AC: ≤300ms at IΔn, ≤40ms at 5×IΔn. 30mA Type B: check manufacturer data.",
    standard: "BS 7671 Regulation 612.13",
  },
  {
    test: "Prospective Fault Current (PFC/PSCC)",
    purpose: "Measures the maximum current that would flow in a short circuit. Confirms that the protective device can safely interrupt this fault current.",
    acceptableRange: "Must not exceed the rated breaking capacity of the protective device (typically 6kA or 10kA for domestic MCBs)",
    standard: "BS 7671 Regulation 612.11",
  },
  {
    test: "Polarity",
    purpose: "Confirms that line, neutral, and earth conductors are connected to the correct terminals throughout the installation.",
    acceptableRange: "Pass/Fail — all connections must be correct",
    standard: "BS 7671 Regulation 612.6",
  },
  {
    test: "Earth Electrode Resistance (Ra)",
    purpose: "Measures the resistance of the earth electrode to general mass of earth. For TT installations only.",
    acceptableRange: "Ra × IΔn ≤ 50V (so with a 30mA RCD, Ra must be ≤1667Ω, but in practice aim for ≤200Ω)",
    standard: "BS 7671 Regulation 612.7",
  },
];

export const testEquipmentTip =
  "The testing sequence matters: (1) Continuity of protective conductors, (2) Continuity of ring final circuit conductors, (3) Insulation resistance, (4) Polarity, (5) Earth electrode resistance (TT only), (6) Prospective fault current, (7) Earth fault loop impedance, (8) RCD testing. See GN3 (Guidance Note 3) for full details.";

export const brandComparison = [
  {
    brand: "Fluke",
    strengths: "Industry gold standard, excellent build quality, advanced features (Bluetooth, cloud sync). Best for fault finding and commercial work.",
    models: "Fluke 1664 FC, Fluke 1663, Fluke T6",
    priceRange: "£££ — Premium",
  },
  {
    brand: "Megger",
    strengths: "The original insulation tester manufacturer. Robust, trusted by utilities and commercial contractors. Excellent MFTs.",
    models: "Megger MFT1741, Megger MIT485",
    priceRange: "£££ — Premium",
  },
  {
    brand: "Kewtech",
    strengths: "Best value for money. UK designed. All essential features at a lower price point. Popular with domestic electricians.",
    models: "Kewtech KT66DL, Kewtech KT1780",
    priceRange: "££ — Mid-range",
  },
  {
    brand: "Metrel",
    strengths: "Slovenian manufacturer with advanced features. Auto-sequence testing saves significant time on large installations.",
    models: "Metrel MI 3152, Metrel MI 3155",
    priceRange: "££ — Mid-range",
  },
  {
    brand: "Di-Log",
    strengths: "Budget-friendly option. Good for getting started. Adequate for domestic work.",
    models: "Di-Log DL9118, Di-Log DL6780",
    priceRange: "£ — Budget",
  },
];
