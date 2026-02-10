import { FlashcardData } from "./types";

export const testInstruments: FlashcardData[] = [
  // ── Preserved cards ti1–ti22 ──────────────────────────────────────────

  {
    id: "ti1",
    question: "What does a multifunction tester (MFT) measure?",
    answer:
      "Insulation resistance, continuity, earth fault loop impedance, RCD operation, and more.",
    category: "Test Instruments",
    difficulty: "easy",
  },
  {
    id: "ti2",
    question:
      "What voltage does an insulation resistance test use for a 230V circuit?",
    answer: "500V DC minimum.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti3",
    question: "What is the minimum acceptable insulation resistance reading?",
    answer: "1 MΩ (megohm) for circuits up to 500V.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti4",
    question: "What does a low reading on a continuity test indicate?",
    answer:
      "A good connection - lower resistance means better continuity.",
    category: "Test Instruments",
    difficulty: "easy",
  },
  {
    id: "ti5",
    question: "What is the purpose of an earth loop impedance test?",
    answer:
      "To verify the circuit can clear a fault quickly by checking the total impedance of the earth fault path.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti6",
    question: "What unit is earth loop impedance measured in?",
    answer: "Ohms (Ω).",
    category: "Test Instruments",
    difficulty: "easy",
  },
  {
    id: "ti7",
    question: "What does an RCD tester check?",
    answer:
      "That the RCD trips within the required time at various test currents.",
    category: "Test Instruments",
    difficulty: "easy",
  },
  {
    id: "ti8",
    question:
      "What is the maximum trip time for a 30mA RCD at rated current?",
    answer: "300ms (0.3 seconds).",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti9",
    question:
      "What is the maximum trip time for a 30mA RCD at 5x rated current (150mA)?",
    answer: "40ms (0.04 seconds).",
    category: "Test Instruments",
    difficulty: "hard",
  },
  {
    id: "ti10",
    question:
      "What does a clamp meter measure without breaking the circuit?",
    answer:
      "Current flow (by measuring the magnetic field around a conductor).",
    category: "Test Instruments",
    difficulty: "easy",
  },
  {
    id: "ti11",
    question: "What is a 'two-wire' test used for?",
    answer: "Testing continuity of protective conductors (R1+R2).",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti12",
    question: "What is the purpose of calibrating test instruments?",
    answer:
      "To ensure accurate readings - instruments should be calibrated annually.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti13",
    question: "What does CAT III rating mean on a meter?",
    answer:
      "Suitable for use on distribution level circuits (e.g., consumer units).",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti14",
    question: "What does CAT IV rating mean on a meter?",
    answer:
      "Suitable for use on origin of supply and utility connections.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti15",
    question: "What is a phase rotation meter used for?",
    answer:
      "To verify the correct sequence of phases in a three-phase supply.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti16",
    question: "What is 'prospective fault current' (PFC)?",
    answer:
      "The maximum current that would flow if a short circuit occurred.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti17",
    question: "Why must test leads comply with GS38?",
    answer:
      "For safety - fused, insulated, and with limited exposed probe tips.",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti18",
    question: "What does a PAT tester check?",
    answer:
      "Portable appliance safety - earth continuity, insulation, and leakage current.",
    category: "Test Instruments",
    difficulty: "easy",
  },
  {
    id: "ti19",
    question: "What is the difference between Zs and Ze?",
    answer:
      "Ze is external loop impedance (supply), Zs is total loop impedance (Ze + R1 + R2).",
    category: "Test Instruments",
    difficulty: "hard",
  },
  {
    id: "ti20",
    question:
      "What test current does a low-resistance ohmmeter use for continuity?",
    answer:
      "Minimum 200mA to check for high-resistance joints.",
    category: "Test Instruments",
    difficulty: "hard",
  },
  {
    id: "ti21",
    question: "What is a 'dead test' vs a 'live test'?",
    answer:
      "Dead tests are done with supply off (continuity, insulation). Live tests need supply on (loop impedance, RCD).",
    category: "Test Instruments",
    difficulty: "medium",
  },
  {
    id: "ti22",
    question:
      "What must you do before conducting insulation resistance tests?",
    answer:
      "Disconnect or isolate sensitive electronic equipment that could be damaged by 500V DC.",
    category: "Test Instruments",
    difficulty: "medium",
  },

  // ── New cards ti23–ti30 ───────────────────────────────────────────────

  {
    id: "ti23",
    question:
      "What test voltage is used for insulation resistance testing on SELV and PELV circuits?",
    answer:
      "250V DC. SELV and PELV circuits operate at extra-low voltage, so BS 7671 requires a reduced IR test voltage of 250V DC (rather than 500V DC used for 230V circuits). The minimum acceptable reading remains 0.5 MΩ for these circuits.",
    category: "Insulation Testing",
    difficulty: "medium",
  },
  {
    id: "ti24",
    question:
      "Describe the three-step method for testing a ring final circuit and explain why cross-connection readings are taken.",
    answer:
      "Step 1: Measure end-to-end resistance of line conductors (r1) and of CPCs (r2) separately by linking each pair at the consumer unit. Step 2: Cross-connect line to CPC at one end, then measure from each socket — readings should be consistent and approximately (r1 + r2) / 4 at the midpoint. Step 3: Compare all readings to identify breaks, spurs, or interconnections. Cross-connection readings confirm the ring is continuous and has no unintended breaks or bridges.",
    category: "Continuity Testing",
    difficulty: "hard",
  },
  {
    id: "ti25",
    question:
      "Where should prospective fault current (PFC) be measured, and why must the result be compared with the protective device rating?",
    answer:
      "PFC must be measured at the origin of the installation and at every distribution board. The highest PFC reading must not exceed the rated short-circuit capacity (kA rating) of the protective devices installed. If PFC exceeds the device rating, the device cannot safely interrupt the fault, risking fire or explosion. Both line-to-neutral and line-to-earth PFC should be recorded; the higher value is the one that matters.",
    category: "Loop Impedance",
    difficulty: "hard",
  },
  {
    id: "ti26",
    question:
      "You arrive on site to test a three-phase motor installation. What phase-related tests should you carry out before energising, and what instruments do you need?",
    answer:
      "Before energising: (1) Insulation resistance between each phase and earth, and between phases, using an MFT at 500V DC. (2) Continuity of all protective conductors. After energising: (3) Phase rotation using a phase rotation meter to confirm L1-L2-L3 sequence (incorrect rotation can cause the motor to run backwards). (4) Voltage between each phase pair (should be approximately 400V) and each phase to neutral (approximately 230V) using a suitable CAT III/IV rated voltmeter.",
    category: "Three-Phase Testing",
    difficulty: "hard",
  },
  {
    id: "ti27",
    question:
      "When selecting a multifunction tester, what key features and specifications should you look for according to BS 7671 and GS38?",
    answer:
      "Key features: (1) CAT III or CAT IV rated to match the installation type. (2) Insulation resistance testing at 250V, 500V, and 1000V DC. (3) Low-resistance ohmmeter with a minimum 200mA test current for continuity. (4) Earth loop impedance (both standard and no-trip modes). (5) RCD testing at ×1, ×5, and ramp modes for various RCD ratings. (6) PFC measurement capability. (7) GS38-compliant test leads with fused probes and shrouded connectors. (8) Current calibration certificate. (9) Rechargeable battery with sufficient capacity for a full day of testing.",
    category: "Test Instruments",
    difficulty: "easy",
  },
  {
    id: "ti28",
    question:
      "What is no-trip loop impedance testing, and when should it be used instead of a standard loop impedance test?",
    answer:
      "No-trip (or non-trip) loop impedance testing uses a very low test current (typically 15mA) that is below the trip threshold of an RCD. It is used on RCD-protected circuits where a standard high-current loop impedance test would cause the RCD to trip, disrupting the supply. The trade-off is slightly reduced accuracy, so the reading should be compared against BS 7671 maximum Zs values with an appropriate margin. It is essential for testing circuits downstream of 30mA RCDs without removing protection.",
    category: "Loop Impedance",
    difficulty: "medium",
  },
  {
    id: "ti29",
    question:
      "Explain the three-terminal (fall of potential) method for measuring earth electrode resistance, including electrode placement.",
    answer:
      "The three-terminal method uses the earth electrode under test (E), a current spike (C), and a potential spike (P). The current spike is driven into the ground at least 10 times the length of the electrode away. The potential spike is placed at 62% of the distance between E and C (the '62% rule'). The tester passes a current between E and C, and measures the voltage between E and P to calculate resistance. Three readings should be taken with P moved either side of the 62% point to confirm the result is on the resistance plateau. This method is required for TT system earth electrodes to verify the value of RA.",
    category: "Continuity Testing",
    difficulty: "hard",
  },
  {
    id: "ti30",
    question:
      "You are carrying out a periodic inspection on a commercial premises. The insulation resistance test on a lighting circuit reads 0.8 MΩ. What action should you take?",
    answer:
      "0.8 MΩ is below the minimum acceptable value of 1 MΩ for a 230V circuit (BS 7671 requires a minimum of 1 MΩ at 500V DC). You should: (1) Record the reading and code it as C2 (potentially dangerous) or C3 (improvement recommended) depending on the circumstances. (2) Isolate the circuit into sections to identify the faulty portion — disconnect lamps, drivers, and accessories systematically. (3) Re-test each section to pinpoint the fault (often caused by moisture ingress, damaged cable, or faulty accessories). (4) Advise the duty holder in writing that remedial work is required, explaining the risk of electric shock or fire from degraded insulation.",
    category: "Insulation Testing",
    difficulty: "easy",
  },
];
