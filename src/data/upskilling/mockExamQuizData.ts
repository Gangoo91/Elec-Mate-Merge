import { QuizQuestion } from '@/types/quiz';

export const mockExamQuestions: QuizQuestion[] = [
  // Regulatory Knowledge (BS7671)
  {
    id: 1,
    question: "Which regulation in BS 7671 covers initial verification?",
    options: ["Regulation 643.1", "Regulation 411.3.3", "Regulation 314.1", "Regulation 521.8"],
    correctAnswer: 0,
    explanation: "Regulation 643.1 specifically covers the requirements for initial verification of electrical installations."
  },
  {
    id: 2,
    question: "Which regulation requires that circuits supplying portable outdoor equipment be RCD protected?",
    options: ["Regulation 314.1", "Regulation 411.3.3", "Regulation 643.1", "Regulation 521.8"],
    correctAnswer: 1,
    explanation: "Regulation 411.3.3 mandates RCD protection for circuits supplying portable outdoor equipment."
  },
  {
    id: 3,
    question: "What is the minimum acceptable insulation resistance value for a 230V circuit?",
    options: ["0.5 MΩ", "1 MΩ", "2 MΩ", "5 MΩ"],
    correctAnswer: 1,
    explanation: "BS 7671 requires a minimum insulation resistance of 1 MΩ for circuits up to 500V."
  },
  {
    id: 4,
    question: "What is the acceptable maximum disconnection time for a 30mA RCD on a TT system?",
    options: ["40 milliseconds", "200 milliseconds", "300 milliseconds", "5 seconds"],
    correctAnswer: 2,
    explanation: "For TT systems, the maximum disconnection time for RCDs is 300 milliseconds at rated residual current."
  },
  {
    id: 5,
    question: "According to BS 7671, what is the required earth fault loop impedance for a B32 MCB?",
    options: ["0.72Ω", "1.44Ω", "2.30Ω", "3.68Ω"],
    correctAnswer: 1,
    explanation: "For a B32 MCB, the maximum Zs value is 1.44Ω to ensure disconnection within required time."
  },

  // Testing Procedures
  {
    id: 6,
    question: "What test must be completed before applying insulation resistance testing?",
    options: ["Earth fault loop impedance", "Continuity of protective conductors", "RCD testing", "Polarity testing"],
    correctAnswer: 1,
    explanation: "Continuity testing must be completed first to ensure a complete circuit exists before insulation testing."
  },
  {
    id: 7,
    question: "List the correct order of tests during initial verification:",
    options: [
      "Continuity, Insulation, Polarity, Earth loop, RCD, Functional",
      "Insulation, Continuity, RCD, Polarity, Earth loop, Functional", 
      "Polarity, Continuity, Insulation, RCD, Earth loop, Functional",
      "RCD, Earth loop, Continuity, Insulation, Polarity, Functional"
    ],
    correctAnswer: 0,
    explanation: "The correct sequence ensures each test builds on the previous, starting with continuity verification."
  },
  {
    id: 8,
    question: "What should happen when a 30mA RCD is tested at 5x IΔn?",
    options: ["Trip within 300ms", "Trip within 40ms", "Trip within 200ms", "Not trip at all"],
    correctAnswer: 1,
    explanation: "At 5 times rated current, an RCD must trip within 40 milliseconds."
  },
  {
    id: 9,
    question: "What test instrument is used to measure earth fault loop impedance?",
    options: ["Insulation resistance tester", "Loop impedance tester", "Continuity tester", "RCD tester"],
    correctAnswer: 1,
    explanation: "A loop impedance tester or multifunction tester is specifically designed for Zs measurements."
  },
  {
    id: 10,
    question: "How do you verify that test instruments are functioning correctly?",
    options: [
      "Check battery level only",
      "Use a proving unit before and after testing",
      "Calibrate annually only",
      "Visual inspection of leads"
    ],
    correctAnswer: 1,
    explanation: "Proving units should be used before and after testing to confirm instrument functionality."
  },

  // Inspection Sequencing
  {
    id: 11,
    question: "During visual inspection, what should be checked first?",
    options: ["Circuit protection", "General safety", "Cable routing", "Earthing arrangements"],
    correctAnswer: 1,
    explanation: "General safety assessment should be the first priority during any inspection."
  },
  {
    id: 12,
    question: "When should dead testing be performed?",
    options: ["Before visual inspection", "After visual inspection but before live testing", "Only after live testing", "Simultaneously with live testing"],
    correctAnswer: 1,
    explanation: "Dead testing should follow visual inspection but precede any live testing for safety."
  },
  {
    id: 13,
    question: "What is the purpose of verifying polarity on final circuits?",
    options: [
      "To check cable colours",
      "To ensure switches operate only on line conductor",
      "To measure voltage drop",
      "To test insulation"
    ],
    correctAnswer: 1,
    explanation: "Polarity verification ensures switches and protective devices are correctly connected to the line conductor."
  },
  {
    id: 14,
    question: "During inspection, cables should be checked for:",
    options: ["Colour only", "Size only", "Damage, routing and support", "Manufacturer only"],
    correctAnswer: 2,
    explanation: "Cables must be inspected for physical damage, correct routing, and adequate support."
  },
  {
    id: 15,
    question: "When inspecting a consumer unit, what should be verified first?",
    options: ["Circuit labelling", "IP rating and general condition", "RCD operation", "Cable connections"],
    correctAnswer: 1,
    explanation: "The general condition and IP rating establish basic safety before detailed inspection."
  },

  // Safe Isolation
  {
    id: 16,
    question: "Why is it important to perform testing with the installation isolated?",
    options: [
      "To save energy",
      "To prevent electric shock and equipment damage",
      "To speed up testing",
      "To reduce costs"
    ],
    correctAnswer: 1,
    explanation: "Isolation prevents electric shock to personnel and protects test equipment from damage."
  },
  {
    id: 17,
    question: "What is the correct sequence for safe isolation?",
    options: [
      "Isolate, Test, Prove dead, Lock off",
      "Prove dead, Isolate, Test, Lock off",
      "Isolate, Lock off, Test, Prove dead",
      "Test, Isolate, Prove dead, Lock off"
    ],
    correctAnswer: 0,
    explanation: "Safe isolation requires: Isolate, Test dead, Prove tester working, then Lock off if required."
  },
  {
    id: 18,
    question: "When proving dead, the voltage indicator should be tested:",
    options: ["Once before use", "Once after use", "Before and after use", "Only if faulty"],
    correctAnswer: 2,
    explanation: "Voltage indicators must be proven on a known live source before and after use."
  },
  {
    id: 19,
    question: "What PPE is essential when carrying out electrical testing?",
    options: ["Hard hat only", "Safety boots only", "Safety glasses and insulated gloves", "High-vis vest only"],
    correctAnswer: 2,
    explanation: "Safety glasses and insulated gloves provide essential protection during electrical testing."
  },
  {
    id: 20,
    question: "Before commencing work, what must be established about the installation?",
    options: ["Age of installation", "Supply characteristics and earthing system", "Number of circuits", "Cable types used"],
    correctAnswer: 1,
    explanation: "Understanding supply characteristics and earthing system is fundamental for safe working."
  },

  // Fault Recognition
  {
    id: 21,
    question: "What does a high Zs reading typically indicate?",
    options: [
      "Good earth path",
      "High resistance in earth path",
      "Low supply voltage",
      "Correct installation"
    ],
    correctAnswer: 1,
    explanation: "High Zs readings indicate high resistance in the earth fault path, often due to loose connections."
  },
  {
    id: 22,
    question: "What might cause insulation resistance values to read abnormally low?",
    options: [
      "High temperature only",
      "Damp conditions or connected loads not removed",
      "Correct wiring",
      "Good connections"
    ],
    correctAnswer: 1,
    explanation: "Low insulation resistance can result from damp conditions, connected equipment, or insulation breakdown."
  },
  {
    id: 23,
    question: "During RCD testing, what would indicate a faulty RCD?",
    options: [
      "Trips at rated current",
      "Fails to trip at test current",
      "Trips within required time",
      "Reset button functions"
    ],
    correctAnswer: 1,
    explanation: "An RCD that fails to trip when test current is applied indicates a faulty device."
  },
  {
    id: 24,
    question: "When testing a ring final circuit, what indicates a break in the ring?",
    options: [
      "All readings are identical",
      "Infinite resistance reading",
      "Low resistance readings",
      "Normal continuity"
    ],
    correctAnswer: 1,
    explanation: "An infinite resistance reading indicates an open circuit or break in the ring."
  },
  {
    id: 25,
    question: "You discover a protective conductor is not continuous. What action should you take?",
    options: [
      "Continue testing",
      "Record C2 and inform responsible person",
      "Ignore the fault",
      "Complete certificate normally"
    ],
    correctAnswer: 1,
    explanation: "A discontinuous protective conductor is potentially dangerous and requires immediate attention."
  },

  // Certificate Completion
  {
    id: 26,
    question: "What certificate is required after a new consumer unit is installed?",
    options: [
      "Minor Works Certificate",
      "Electrical Installation Certificate (EIC)",
      "Condition Report",
      "Test Certificate only"
    ],
    correctAnswer: 1,
    explanation: "A new consumer unit installation requires an Electrical Installation Certificate."
  },
  {
    id: 27,
    question: "What is the difference between an EIC and a MEIWC?",
    options: [
      "No difference",
      "EIC for new work, MEIWC for minor alterations",
      "MEIWC for new work, EIC for alterations",
      "Both are the same"
    ],
    correctAnswer: 1,
    explanation: "EIC is used for new installations or major work; MEIWC is for minor alterations like adding a socket."
  },
  {
    id: 28,
    question: "Who is responsible for signing the inspection section of an EIC?",
    options: [
      "The client",
      "The designer",
      "The person who carried out inspection and testing",
      "The contractor"
    ],
    correctAnswer: 2,
    explanation: "The person who actually performed the inspection and testing must sign that section."
  },
  {
    id: 29,
    question: "What information is required in the 'extent of installation covered' section of an EICR?",
    options: [
      "Cable types only",
      "Specific areas or circuits inspected and tested",
      "Test results only",
      "Client details"
    ],
    correctAnswer: 1,
    explanation: "This section must specify exactly what areas or circuits were included in the inspection."
  },
  {
    id: 30,
    question: "In what circumstances should a Limitation be recorded on a certificate?",
    options: [
      "Always",
      "Never",
      "When areas could not be accessed as agreed with client",
      "Only for safety reasons"
    ],
    correctAnswer: 2,
    explanation: "Limitations must be recorded when agreed restrictions prevent full inspection or testing."
  },

  // Observation Coding
  {
    id: 31,
    question: "What coding would you give for no RCD protection on a socket in a domestic kitchen?",
    options: ["C1", "C2", "C3", "FI"],
    correctAnswer: 1,
    explanation: "Missing RCD protection in a kitchen is potentially dangerous, warranting a C2 code."
  },
  {
    id: 32,
    question: "What does the observation code 'FI' mean?",
    options: [
      "Fault Identified",
      "Further Investigation required",
      "Fire Risk",
      "Final Inspection"
    ],
    correctAnswer: 1,
    explanation: "FI indicates that Further Investigation is required to determine the full extent of an issue."
  },
  {
    id: 33,
    question: "During an EICR, you find a lighting circuit with no CPC. What code is applied?",
    options: ["C1", "C2", "C3", "No code required"],
    correctAnswer: 1,
    explanation: "A missing circuit protective conductor poses a potentially dangerous situation."
  },
  {
    id: 34,
    question: "What would warrant a C1 classification?",
    options: [
      "Minor deterioration",
      "Potentially dangerous",
      "Danger present - immediate action required",
      "Improvement recommended"
    ],
    correctAnswer: 2,
    explanation: "C1 indicates immediate danger requiring urgent remedial action before continued use."
  },
  {
    id: 35,
    question: "A C3 observation indicates:",
    options: [
      "Immediate danger",
      "Potentially dangerous",
      "Improvement recommended",
      "Satisfactory"
    ],
    correctAnswer: 2,
    explanation: "C3 observations are for improvements recommended to enhance safety or compliance."
  },

  // Additional Questions - Testing Procedures
  {
    id: 36,
    question: "What is the test voltage for insulation resistance testing on SELV circuits?",
    options: ["250V DC", "500V DC", "1000V DC", "1500V DC"],
    correctAnswer: 0,
    explanation: "SELV circuits should be tested at 250V DC to avoid damage to low voltage equipment."
  },
  {
    id: 37,
    question: "When testing continuity of protective conductors, the test current should be:",
    options: ["Not less than 10mA", "Not less than 200mA", "Exactly 1A", "Not more than 10mA"],
    correctAnswer: 1,
    explanation: "The test current for protective conductor continuity must be not less than 200mA."
  },
  {
    id: 38,
    question: "Define the term 'Zs' and explain its significance:",
    options: [
      "Source impedance - determines voltage regulation",
      "Supply impedance - affects power factor",
      "Total earth fault loop impedance - ensures disconnection times",
      "Short circuit impedance - limits fault current"
    ],
    correctAnswer: 2,
    explanation: "Zs is the total earth fault loop impedance, critical for ensuring protective device operates within required time."
  },
  {
    id: 39,
    question: "What does 'PFC' stand for and why is it measured?",
    options: [
      "Power Factor Correction - improves efficiency",
      "Protective Function Check - verifies safety",
      "Prospective Fault Current - confirms equipment rating",
      "Primary Feed Circuit - identifies supply"
    ],
    correctAnswer: 2,
    explanation: "PFC is Prospective Fault Current, measured to ensure equipment can safely interrupt fault currents."
  },
  {
    id: 40,
    question: "How is a ring final circuit tested for continuity?",
    options: [
      "Test each conductor individually then cross-connect and test",
      "Test all conductors together",
      "Test only the line conductor",
      "Visual inspection only"
    ],
    correctAnswer: 0,
    explanation: "Each conductor is tested individually, then cross-connected to verify ring integrity and identify spurs."
  },

  // Advanced Regulatory Knowledge
  {
    id: 41,
    question: "According to BS 7671, what is the maximum Zs for a B20 MCB?",
    options: ["1.15Ω", "2.30Ω", "1.44Ω", "0.86Ω"],
    correctAnswer: 1,
    explanation: "For a B20 MCB, the maximum earth fault loop impedance is 2.30Ω."
  },
  {
    id: 42,
    question: "RCD protection is required for all socket outlets up to what rating?",
    options: ["13A", "16A", "20A", "32A"],
    correctAnswer: 2,
    explanation: "BS 7671 requires RCD protection for socket outlets not exceeding 20A in domestic installations."
  },
  {
    id: 43,
    question: "The minimum cross-sectional area for a main earthing conductor in a domestic installation is:",
    options: ["4mm²", "6mm²", "10mm²", "16mm²"],
    correctAnswer: 2,
    explanation: "The minimum size for a main earthing conductor is typically 10mm² for domestic installations."
  },
  {
    id: 44,
    question: "What is the required IP rating for equipment in bathroom Zone 1?",
    options: ["IPX4", "IPX5", "IPX6", "IPX7"],
    correctAnswer: 0,
    explanation: "Equipment in bathroom Zone 1 requires a minimum IP rating of IPX4."
  },
  {
    id: 45,
    question: "Supplementary bonding may be omitted in bathrooms if:",
    options: [
      "All circuits have RCD protection",
      "Metal parts are painted",
      "Only plastic fittings are used",
      "The bathroom is small"
    ],
    correctAnswer: 0,
    explanation: "Supplementary bonding may be omitted if all circuits in the location have RCD protection."
  },

  // Testing Equipment and Calibration
  {
    id: 46,
    question: "How often should test instruments be calibrated?",
    options: ["Monthly", "Every 6 months", "Annually", "Every 2 years"],
    correctAnswer: 2,
    explanation: "Test instruments should typically be calibrated annually to maintain accuracy."
  },
  {
    id: 47,
    question: "Before using a multimeter for voltage testing, you should:",
    options: [
      "Check battery level only",
      "Test on a known live source",
      "Clean the probes",
      "Check the fuse rating"
    ],
    correctAnswer: 1,
    explanation: "Always prove the meter works on a known live source before relying on a dead reading."
  },
  {
    id: 48,
    question: "The accuracy class required for earth fault loop impedance testers is:",
    options: ["Class 1", "Class 2", "Class 3", "Class 4"],
    correctAnswer: 1,
    explanation: "Earth fault loop impedance testers should be accuracy Class 2 or better."
  },
  {
    id: 49,
    question: "When measuring insulation resistance, connected equipment should be:",
    options: [
      "Left connected",
      "Switched off only",
      "Disconnected where practicable",
      "Tested simultaneously"
    ],
    correctAnswer: 2,
    explanation: "Equipment should be disconnected where practicable to avoid false low readings."
  },
  {
    id: 50,
    question: "What test current is used for RCD testing at normal tripping current?",
    options: ["15mA", "30mA", "50% of IΔn", "100% of IΔn"],
    correctAnswer: 3,
    explanation: "RCD testing at normal tripping current uses 100% of the rated residual current (IΔn)."
  },

  // Documentation and Records
  {
    id: 51,
    question: "What are the consequences of failing to document test results?",
    options: [
      "No consequences",
      "Legal liability and non-compliance",
      "Reduced fees only",
      "Client dissatisfaction only"
    ],
    correctAnswer: 1,
    explanation: "Failure to document results can lead to legal liability, regulatory non-compliance, and work rejection."
  },
  {
    id: 52,
    question: "How long should electrical certificates be retained?",
    options: ["1 year", "5 years", "Life of installation", "10 years"],
    correctAnswer: 2,
    explanation: "Electrical certificates should be retained for the life of the installation."
  },
  {
    id: 53,
    question: "Who should receive copies of the Electrical Installation Certificate?",
    options: [
      "Client only",
      "Building control only",
      "Client and relevant authorities",
      "Insurance company only"
    ],
    correctAnswer: 2,
    explanation: "Copies should be provided to the client and any relevant regulatory authorities."
  },
  {
    id: 54,
    question: "Schedule of Test Results should include:",
    options: [
      "Pass/fail only",
      "Actual measured values",
      "Estimated values",
      "Visual observations only"
    ],
    correctAnswer: 1,
    explanation: "Schedules must include actual measured values, not just pass/fail indications."
  },
  {
    id: 55,
    question: "What information must be included on an EICR front page?",
    options: [
      "Test results only",
      "Overall assessment and recommendations",
      "Circuit details only",
      "Observations only"
    ],
    correctAnswer: 1,
    explanation: "The EICR front page must include the overall assessment and next inspection recommendations."
  },

  // Specific Testing Scenarios
  {
    id: 56,
    question: "When testing a two-way lighting circuit, what should be verified?",
    options: [
      "Switch operation only",
      "Correct connections at both switches and intermediate positions",
      "Cable continuity only",
      "Lamp functionality only"
    ],
    correctAnswer: 1,
    explanation: "Two-way circuits require verification of correct switching arrangements at all positions."
  },
  {
    id: 57,
    question: "For testing solar PV installations, special consideration must be given to:",
    options: [
      "Weather conditions only",
      "DC isolation and specific safety procedures",
      "Time of day only",
      "Equipment manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Solar PV requires special DC isolation procedures and awareness of continued generation during daylight."
  },
  {
    id: 58,
    question: "When testing IT systems, what additional test is required?",
    options: [
      "No additional tests",
      "Insulation monitoring device verification",
      "Extra earth testing",
      "Double insulation checking"
    ],
    correctAnswer: 1,
    explanation: "IT systems require verification of the insulation monitoring device functionality."
  },
  {
    id: 59,
    question: "What is the purpose of functional testing?",
    options: [
      "Check electrical values",
      "Verify operation of switches and controls",
      "Measure resistance",
      "Test insulation"
    ],
    correctAnswer: 1,
    explanation: "Functional testing verifies that all switches, isolators, and control devices operate correctly."
  },
  {
    id: 60,
    question: "Emergency lighting systems should be tested:",
    options: [
      "During normal operation only",
      "In failure mode to verify operation",
      "Never during inspection",
      "Only visually"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting must be tested in failure mode to ensure it operates when mains supply fails."
  },

  // Advanced Fault Finding
  {
    id: 61,
    question: "A socket outlet shows correct voltage but appliances won't work. The most likely cause is:",
    options: [
      "High earth loop impedance",
      "Open circuit neutral",
      "Low insulation resistance",
      "Correct wiring"
    ],
    correctAnswer: 1,
    explanation: "An open circuit neutral can show correct line to earth voltage but prevent appliance operation."
  },
  {
    id: 62,
    question: "Intermittent RCD tripping could indicate:",
    options: [
      "Correct operation",
      "Earth leakage or N-E fault",
      "High earth loop impedance",
      "Low insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "Intermittent RCD operation often indicates earth leakage or neutral-earth faults developing."
  },
  {
    id: 63,
    question: "What could cause low insulation resistance between live conductors?",
    options: [
      "Correct installation",
      "Moisture ingress or cable damage",
      "High temperature",
      "Correct terminations"
    ],
    correctAnswer: 1,
    explanation: "Low insulation between live conductors typically results from moisture or physical damage."
  },
  {
    id: 64,
    question: "A lighting circuit with high Zs readings might have:",
    options: [
      "Correct CPC connections",
      "Loose or missing CPC connections",
      "Correct earthing",
      "Adequate cable size"
    ],
    correctAnswer: 1,
    explanation: "High Zs in lighting circuits often indicates poor or missing CPC connections."
  },
  {
    id: 65,
    question: "What indicates a spur on a ring final circuit during testing?",
    options: [
      "Identical readings",
      "One socket with higher resistance reading",
      "All readings are zero",
      "Normal continuity"
    ],
    correctAnswer: 1,
    explanation: "A spur will show higher resistance readings due to the additional cable length."
  },

  // Additional Regulatory and Safety
  {
    id: 66,
    question: "The purpose of main protective bonding is to:",
    options: [
      "Improve aesthetics",
      "Ensure metalwork is at earth potential",
      "Reduce costs",
      "Simplify installation"
    ],
    correctAnswer: 1,
    explanation: "Main protective bonding ensures all exposed and extraneous metalwork is at earth potential."
  },
  {
    id: 67,
    question: "RCBO devices provide protection against:",
    options: [
      "Overcurrent only",
      "Earth leakage only",
      "Both overcurrent and earth leakage",
      "Overvoltage only"
    ],
    correctAnswer: 2,
    explanation: "RCBOs combine both overcurrent protection and residual current (earth leakage) protection."
  },
  {
    id: 68,
    question: "The maximum length of 2.5mm² cable for a 32A ring final circuit is approximately:",
    options: ["50 metres", "70 metres", "100 metres", "120 metres"],
    correctAnswer: 2,
    explanation: "A 32A ring final in 2.5mm² cable should not exceed approximately 100 metres total cable length."
  },
  {
    id: 69,
    question: "Type B MCBs are designed to trip between:",
    options: ["1-2 times In", "3-5 times In", "5-10 times In", "10-20 times In"],
    correctAnswer: 1,
    explanation: "Type B MCBs are designed to trip magnetically between 3-5 times their rated current."
  },
  {
    id: 70,
    question: "What is meant by prospective short circuit current?",
    options: [
      "Current during normal operation",
      "Earth fault current",
      "Maximum current between live conductors during fault",
      "RCD test current"
    ],
    correctAnswer: 2,
    explanation: "PSCC is the maximum current that could flow during a fault between live conductors."
  },

  // Final 30 Questions - Mixed Topics
  {
    id: 71,
    question: "The voltage drop in any circuit should not exceed what percentage of nominal voltage?",
    options: ["3%", "5%", "10%", "15%"],
    correctAnswer: 1,
    explanation: "BS 7671 limits voltage drop to 5% of nominal voltage for lighting and 3% for other circuits in some cases."
  },
  {
    id: 72,
    question: "What type of earthing system has the supply transformer star point earthed?",
    options: ["IT system", "TT system", "TN system", "All systems"],
    correctAnswer: 2,
    explanation: "TN systems have the supply transformer star point directly earthed."
  },
  {
    id: 73,
    question: "The minimum approach distance to overhead lines up to 33kV is:",
    options: ["3 metres", "5 metres", "6 metres", "9 metres"],
    correctAnswer: 2,
    explanation: "The minimum approach distance to overhead lines up to 33kV is 6 metres."
  },
  {
    id: 74,
    question: "What protection is required for cables concealed in walls at depths less than 50mm?",
    options: [
      "No special protection",
      "RCD protection or mechanical protection",
      "Earthing only",
      "Larger cable size"
    ],
    correctAnswer: 1,
    explanation: "Cables less than 50mm deep in walls require RCD protection or additional mechanical protection."
  },
  {
    id: 75,
    question: "The colour of the neutral conductor in flexible cords should be:",
    options: ["Black", "Blue", "Green/Yellow", "Brown"],
    correctAnswer: 1,
    explanation: "The neutral conductor in flexible cords should be blue."
  },
  {
    id: 76,
    question: "What is the maximum rating for a plug and socket to be considered 'portable equipment'?",
    options: ["10A", "13A", "16A", "20A"],
    correctAnswer: 2,
    explanation: "Portable equipment is typically limited to 16A maximum rating."
  },
  {
    id: 77,
    question: "Fire barriers in cable routes should be provided at intervals not exceeding:",
    options: ["3m", "5m", "10m", "20m"],
    correctAnswer: 1,
    explanation: "Fire barriers should be provided at intervals not exceeding 5 metres in cable routes."
  },
  {
    id: 78,
    question: "The purpose of SELV is to:",
    options: [
      "Reduce costs",
      "Limit voltage to safe levels",
      "Improve efficiency",
      "Simplify wiring"
    ],
    correctAnswer: 1,
    explanation: "SELV (Safety Extra Low Voltage) limits voltage to levels considered safe for direct contact."
  },
  {
    id: 79,
    question: "What test is used to check polarity at a light switch?",
    options: [
      "Insulation resistance",
      "Continuity testing through switch to lamp",
      "Earth fault loop impedance",
      "RCD testing"
    ],
    correctAnswer: 1,
    explanation: "Polarity at switches is verified by checking continuity through the switch to the controlled point."
  },
  {
    id: 80,
    question: "The touch voltage in accessible areas should not exceed:",
    options: ["25V", "50V", "110V", "230V"],
    correctAnswer: 1,
    explanation: "Touch voltage should generally not exceed 50V in dry conditions for safety."
  },
  {
    id: 81,
    question: "Class II equipment is characterized by:",
    options: [
      "Single insulation",
      "Double or reinforced insulation",
      "Earthed metal case",
      "No electrical protection"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment has double or reinforced insulation and no accessible earthed parts."
  },
  {
    id: 82,
    question: "The recommended test current for testing continuity of ring final circuits is:",
    options: ["200mA", "1.5 times the rating of protective device", "10A", "Test voltage only"],
    correctAnswer: 1,
    explanation: "Ring final circuit testing should use 1.5 times the protective device rating as test current."
  },
  {
    id: 83,
    question: "What additional protection is required for socket outlets in commercial premises?",
    options: [
      "None required",
      "RCD protection for all socket outlets",
      "Additional earthing",
      "Higher IP rating"
    ],
    correctAnswer: 1,
    explanation: "Commercial socket outlets generally require RCD protection for additional safety."
  },
  {
    id: 84,
    question: "The maximum operating temperature for PVC insulated cables is:",
    options: ["60°C", "70°C", "85°C", "90°C"],
    correctAnswer: 1,
    explanation: "Standard PVC insulated cables have a maximum operating temperature of 70°C."
  },
  {
    id: 85,
    question: "What is the purpose of diversity in electrical design?",
    options: [
      "Increase costs",
      "Account for not all loads operating simultaneously",
      "Improve appearance",
      "Reduce cable sizes"
    ],
    correctAnswer: 1,
    explanation: "Diversity accounts for the fact that not all electrical loads will operate simultaneously."
  },
  {
    id: 86,
    question: "The minimum IP rating for equipment in outdoor locations is:",
    options: ["IP54", "IP55", "IP65", "IP67"],
    correctAnswer: 2,
    explanation: "Outdoor equipment typically requires a minimum IP rating of IP65 for weather protection."
  },
  {
    id: 87,
    question: "What type of cable should be used for underground installation?",
    options: [
      "Standard PVC cable",
      "Armoured cable or cable in conduit",
      "Flexible cable",
      "Any cable type"
    ],
    correctAnswer: 1,
    explanation: "Underground installations require armoured cable or cable in suitable conduit for protection."
  },
  {
    id: 88,
    question: "The purpose of an equipotential bonding system is to:",
    options: [
      "Reduce costs",
      "Ensure all metalwork is at same potential",
      "Improve aesthetics",
      "Increase resistance"
    ],
    correctAnswer: 1,
    explanation: "Equipotential bonding ensures all metalwork is at the same electrical potential to prevent dangerous differences."
  },
  {
    id: 89,
    question: "What happens to the rating of cables when grouped together?",
    options: [
      "Rating increases",
      "Rating decreases due to heating effects",
      "No change",
      "Depends on cable colour"
    ],
    correctAnswer: 1,
    explanation: "Cable ratings must be reduced when grouped together due to mutual heating effects."
  },
  {
    id: 90,
    question: "The discrimination between protective devices means:",
    options: [
      "Using different manufacturers",
      "Ensuring only the nearest device operates during fault",
      "Random operation",
      "All devices operate together"
    ],
    correctAnswer: 1,
    explanation: "Discrimination ensures only the protective device nearest to a fault operates, maintaining supply elsewhere."
  },
  {
    id: 91,
    question: "What is the maximum earth fault loop impedance for a lighting circuit protected by a B6 MCB?",
    options: ["7.67Ω", "9.6Ω", "11.5Ω", "15.3Ω"],
    correctAnswer: 0,
    explanation: "For a B6 MCB, the maximum Zs is 7.67Ω to ensure disconnection within required time."
  },
  {
    id: 92,
    question: "The purpose of protective multiple earthing (PME) is to:",
    options: [
      "Reduce earth loop impedance",
      "Increase supply reliability",
      "Reduce costs",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "PME provides multiple earth connections to reduce impedance, improve reliability, and reduce costs."
  },
  {
    id: 93,
    question: "What should be done if an RCBO repeatedly trips?",
    options: [
      "Replace immediately",
      "Investigate the cause before resetting",
      "Bypass the device",
      "Increase the rating"
    ],
    correctAnswer: 1,
    explanation: "Repeated tripping indicates a fault condition that must be investigated before resetting."
  },
  {
    id: 94,
    question: "The minimum cross-sectional area for protective conductors up to 16mm² line conductors is:",
    options: [
      "Same as line conductor",
      "Half the line conductor",
      "1.5mm² minimum",
      "2.5mm² minimum"
    ],
    correctAnswer: 0,
    explanation: "For line conductors up to 16mm², the protective conductor should be the same size."
  },
  {
    id: 95,
    question: "What type of RCD should be used where there are electronic loads?",
    options: ["AC type", "A type", "B type", "Any type"],
    correctAnswer: 1,
    explanation: "Type A RCDs should be used where electronic loads may produce DC components in earth fault current."
  },
  {
    id: 96,
    question: "The purpose of an isolation device is to:",
    options: [
      "Provide overload protection",
      "Completely disconnect supply for maintenance",
      "Reduce voltage",
      "Improve power factor"
    ],
    correctAnswer: 1,
    explanation: "Isolation devices provide complete disconnection of supply to allow safe maintenance work."
  },
  {
    id: 97,
    question: "What is the maximum length of a 1.5mm² lighting circuit protected by a B10 MCB?",
    options: ["22m", "37m", "55m", "73m"],
    correctAnswer: 1,
    explanation: "A 1.5mm² lighting circuit with B10 MCB has a maximum length of approximately 37 metres."
  },
  {
    id: 98,
    question: "The frequency of supply in the UK is:",
    options: ["40Hz", "50Hz", "60Hz", "100Hz"],
    correctAnswer: 1,
    explanation: "The UK mains supply frequency is 50Hz."
  },
  {
    id: 99,
    question: "What does IP2X rating indicate?",
    options: [
      "Protection against water",
      "Protection against finger contact",
      "Protection against dust",
      "No protection"
    ],
    correctAnswer: 1,
    explanation: "IP2X indicates protection against finger contact (objects larger than 12mm diameter)."
  },
  {
    id: 100,
    question: "The maximum current rating for domestic ring final circuits is:",
    options: ["20A", "25A", "30A", "32A"],
    correctAnswer: 3,
    explanation: "Domestic ring final circuits are typically protected by 32A protective devices."
  },

  // Advanced Regulatory Knowledge (Questions 101-115)
  {
    id: 101,
    question: "According to BS 7671, what is the maximum disconnection time for a TN system final circuit not exceeding 32A?",
    options: ["0.2 seconds", "0.4 seconds", "5 seconds", "1 second"],
    correctAnswer: 1,
    explanation: "For TN systems, final circuits not exceeding 32A must disconnect within 0.4 seconds according to Table 41.1 of BS 7671."
  },
  {
    id: 102,
    question: "Which regulation in BS 7671 covers the selection and installation of devices for protection against electric shock?",
    options: ["Part 4", "Part 5", "Part 6", "Part 7"],
    correctAnswer: 0,
    explanation: "Part 4 of BS 7671 covers protection for safety, including devices for protection against electric shock."
  },
  {
    id: 103,
    question: "Under the CDM Regulations 2015, who must ensure electrical installation designs are coordinated?",
    options: ["Principal contractor", "CDM coordinator", "Principal designer", "Client"],
    correctAnswer: 2,
    explanation: "The principal designer has the duty to coordinate design work and ensure designs are properly integrated under CDM 2015."
  },
  {
    id: 104,
    question: "Building Regulations Part P notification is NOT required for:",
    options: [
      "New circuit installation",
      "Consumer unit replacement",
      "Like-for-like accessory replacement",
      "Bathroom electrical work"
    ],
    correctAnswer: 2,
    explanation: "Like-for-like replacement of accessories does not require Building Control notification under Part P."
  },
  {
    id: 105,
    question: "What is the minimum earth electrode resistance for a TT system?",
    options: ["20Ω", "100Ω", "200Ω", "No specific requirement"],
    correctAnswer: 3,
    explanation: "BS 7671 does not specify a minimum earth electrode resistance; the requirement is that RCD protection operates correctly."
  },
  {
    id: 106,
    question: "According to Regulation 134.1.1, what must be selected to suit the characteristics of the circuit?",
    options: ["Cable size only", "Protective devices", "Accessories only", "Installation method"],
    correctAnswer: 1,
    explanation: "Regulation 134.1.1 requires protective devices to be selected to suit the characteristics of the circuit they protect."
  },
  {
    id: 107,
    question: "The Health and Safety at Work Act 1974 places duties on:",
    options: ["Employers only", "Employees only", "Both employers and employees", "Contractors only"],
    correctAnswer: 2,
    explanation: "HSWA 1974 places duties on both employers (to provide safe systems) and employees (to cooperate and not endanger others)."
  },
  {
    id: 108,
    question: "What is the maximum Zs for a C16 MCB according to BS 7671?",
    options: ["2.87Ω", "1.44Ω", "2.30Ω", "1.15Ω"],
    correctAnswer: 0,
    explanation: "For a C16 MCB, the maximum earth fault loop impedance is 2.87Ω to ensure disconnection within 0.4 seconds."
  },
  {
    id: 109,
    question: "Special locations in BS 7671 are covered in which part?",
    options: ["Part 6", "Part 7", "Part 4", "Part 5"],
    correctAnswer: 1,
    explanation: "Part 7 of BS 7671 covers special installations or locations with specific requirements."
  },
  {
    id: 110,
    question: "The Electricity Safety, Quality and Continuity Regulations 2002 primarily govern:",
    options: [
      "Installation standards",
      "Distribution network operators",
      "Electrical contractors",
      "Testing procedures"
    ],
    correctAnswer: 1,
    explanation: "ESQCR 2002 primarily regulates the safety and quality of public electricity supply networks operated by DNOs."
  },
  {
    id: 111,
    question: "What is the required minimum height for overhead power lines crossing a road?",
    options: ["5.2m", "5.8m", "6.0m", "6.7m"],
    correctAnswer: 1,
    explanation: "ESQCR requires overhead lines crossing roads to be at least 5.8m high to ensure vehicle clearance."
  },
  {
    id: 112,
    question: "According to BS 7671, SELV systems must not exceed:",
    options: ["25V AC", "50V AC", "120V DC", "60V DC"],
    correctAnswer: 1,
    explanation: "SELV (Safety Extra Low Voltage) systems must not exceed 50V AC or 120V ripple-free DC under normal conditions."
  },
  {
    id: 113,
    question: "The Provision and Use of Work Equipment Regulations 1998 require:",
    options: [
      "Annual PAT testing",
      "Equipment to be suitable and maintained",
      "Only new equipment to be used",
      "Manufacturers' warranties"
    ],
    correctAnswer: 1,
    explanation: "PUWER requires work equipment to be suitable for its purpose and maintained in a safe condition."
  },
  {
    id: 114,
    question: "What classification is given to equipment that can be moved while energised?",
    options: ["Portable", "Moveable", "Stationary", "Hand-held"],
    correctAnswer: 0,
    explanation: "Portable equipment is defined as equipment intended to be moved while energised or connected to the supply."
  },
  {
    id: 115,
    question: "According to BS 7671, isolation must be secured by:",
    options: [
      "Warning labels only",
      "Locking off or removing fuses/links",
      "Switching off only",
      "Informing users"
    ],
    correctAnswer: 1,
    explanation: "Effective isolation requires physical securing by locking off or removing fuses/links to prevent unauthorised re-energisation."
  },

  // Advanced Testing Procedures (Questions 116-130)
  {
    id: 116,
    question: "When testing a three-phase installation, earth fault loop impedance should be measured between:",
    options: [
      "Any line and earth",
      "The line with the highest impedance and earth",
      "Each line and earth separately",
      "All lines together and earth"
    ],
    correctAnswer: 2,
    explanation: "Each line conductor must be tested separately to earth to identify any differences in impedance values."
  },
  {
    id: 117,
    question: "The test for insulation resistance should be applied between:",
    options: [
      "Live conductors only",
      "Each live conductor and earth, then between live conductors",
      "Earth and neutral only",
      "Phase conductors only"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance must be tested between each live conductor and earth, then between all live conductors."
  },
  {
    id: 118,
    question: "When testing emergency lighting circuits, what additional test is required?",
    options: [
      "Standard electrical tests only",
      "Duration test and battery condition",
      "Light output measurement",
      "Switch operation only"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting requires duration testing to verify operation time and battery condition assessment."
  },
  {
    id: 119,
    question: "For circuits with electronic equipment, insulation resistance testing should be:",
    options: [
      "Carried out at 1000V",
      "Omitted completely",
      "Carried out at 250V with equipment disconnected",
      "Done with equipment connected"
    ],
    correctAnswer: 2,
    explanation: "Electronic equipment should be disconnected and testing carried out at 250V to prevent damage."
  },
  {
    id: 120,
    question: "When measuring prospective fault current, the test should be applied:",
    options: [
      "Between live conductors only",
      "Between each live conductor and earth",
      "Between live conductors and between each live conductor and earth",
      "At the origin only"
    ],
    correctAnswer: 2,
    explanation: "PFC must be measured between live conductors and between each live conductor and earth to determine maximum fault current."
  },
  {
    id: 121,
    question: "The earth electrode resistance test requires:",
    options: [
      "Standard loop tester",
      "Specialist earth electrode tester with auxiliary electrodes",
      "Insulation resistance tester",
      "Continuity tester"
    ],
    correctAnswer: 1,
    explanation: "Earth electrode resistance requires a specialist tester using auxiliary current and potential electrodes."
  },
  {
    id: 122,
    question: "When testing installations with photovoltaic systems, additional safety measures include:",
    options: [
      "Standard isolation only",
      "DC and AC isolation with appropriate test equipment",
      "Testing during daylight only",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "PV systems require both DC and AC isolation and appropriate test equipment rated for DC voltages."
  },
  {
    id: 123,
    question: "Functional testing of safety services must include:",
    options: [
      "Electrical tests only",
      "Operation under normal and emergency conditions",
      "Visual inspection only",
      "Manufacturer's test only"
    ],
    correctAnswer: 1,
    explanation: "Safety services must be tested under both normal supply and emergency conditions to verify correct operation."
  },
  {
    id: 124,
    question: "When testing installations with inverters or UPS systems:",
    options: [
      "Standard tests apply",
      "Additional consideration for backup power sources",
      "Testing not required",
      "Manufacturer testing sufficient"
    ],
    correctAnswer: 1,
    explanation: "Inverters and UPS systems may maintain power even when mains is isolated, requiring additional safety measures."
  },
  {
    id: 125,
    question: "The correct method for testing protective conductor continuity in flexible cables is:",
    options: [
      "Visual inspection only",
      "Continuity test at each end",
      "Test while flexing the cable",
      "Insulation resistance test"
    ],
    correctAnswer: 2,
    explanation: "Flexible cables should be tested while being flexed to identify intermittent faults in the protective conductor."
  },
  {
    id: 126,
    question: "When testing circuits with surge protective devices (SPDs):",
    options: [
      "SPDs should remain connected",
      "SPDs must be disconnected before testing",
      "SPDs don't affect testing",
      "Special test equipment required"
    ],
    correctAnswer: 1,
    explanation: "SPDs must be disconnected before insulation resistance testing as they provide a path to earth."
  },
  {
    id: 127,
    question: "Phase rotation testing is required for:",
    options: [
      "Single-phase installations only",
      "Three-phase motor circuits",
      "Lighting circuits only",
      "Domestic installations"
    ],
    correctAnswer: 1,
    explanation: "Phase rotation must be verified for three-phase motor circuits to ensure correct direction of rotation."
  },
  {
    id: 128,
    question: "When testing circuits with capacitors:",
    options: [
      "Test immediately after isolation",
      "Allow discharge time before testing",
      "Capacitors don't affect testing",
      "Remove all capacitors"
    ],
    correctAnswer: 1,
    explanation: "Capacitors must be allowed to discharge safely before testing to prevent equipment damage and ensure safety."
  },
  {
    id: 129,
    question: "The verification of automatic disconnection requires measurement of:",
    options: [
      "Insulation resistance only",
      "Earth fault loop impedance and RCD operation",
      "Continuity only",
      "Voltage only"
    ],
    correctAnswer: 1,
    explanation: "Automatic disconnection verification requires measuring Zs and confirming protective device operation times."
  },
  {
    id: 130,
    question: "When testing fire alarm circuits, special consideration must be given to:",
    options: [
      "Standard electrical tests only",
      "Detection sensitivity and alarm functionality",
      "Cable colour only",
      "Voltage levels only"
    ],
    correctAnswer: 1,
    explanation: "Fire alarm systems require functional testing of detection devices and alarm functions beyond standard electrical tests."
  },

  // RCD Advanced Topics (Questions 131-145)
  {
    id: 131,
    question: "An RCD that trips at 15mA when tested at 30mA indicates:",
    options: [
      "Faulty RCD requiring replacement",
      "Normal operation within tolerance",
      "Incorrect test procedure",
      "High sensitivity setting"
    ],
    correctAnswer: 1,
    explanation: "RCDs should trip between 50% and 100% of rated current (15-30mA for a 30mA RCD), so 15mA is acceptable."
  },
  {
    id: 132,
    question: "Type A RCDs are designed to detect:",
    options: [
      "AC residual currents only",
      "AC and pulsating DC residual currents",
      "DC residual currents only",
      "High frequency currents only"
    ],
    correctAnswer: 1,
    explanation: "Type A RCDs can detect both sinusoidal AC and pulsating DC residual currents, making them suitable for electronic loads."
  },
  {
    id: 133,
    question: "RCD discrimination (selectivity) is achieved by:",
    options: [
      "Using same sensitivity and time delay",
      "Different sensitivities and/or time delays",
      "Installing identical RCDs",
      "Using only 30mA RCDs"
    ],
    correctAnswer: 1,
    explanation: "Discrimination requires upstream RCDs to have lower sensitivity (higher trip current) and/or time delay."
  },
  {
    id: 134,
    question: "The cause of nuisance tripping in RCD-protected circuits is often:",
    options: [
      "Overload conditions",
      "Natural leakage currents and electromagnetic interference",
      "Undervoltage",
      "High ambient temperature"
    ],
    correctAnswer: 1,
    explanation: "Cumulative leakage currents from normal operation and EMI can cause RCDs to trip unexpectedly."
  },
  {
    id: 135,
    question: "When should a Type B RCD be specified?",
    options: [
      "Standard domestic installations",
      "Installations with variable speed drives and switched mode power supplies",
      "Outdoor installations only",
      "Low voltage installations"
    ],
    correctAnswer: 1,
    explanation: "Type B RCDs are required where smooth DC residual currents may occur, such as with VFDs and SMPS."
  },
  {
    id: 136,
    question: "The unwanted tripping of RCDs can be reduced by:",
    options: [
      "Using lower sensitivity RCDs",
      "Dividing circuits to reduce cumulative leakage",
      "Installing more RCDs",
      "Increasing cable size"
    ],
    correctAnswer: 1,
    explanation: "Dividing circuits across multiple RCDs reduces the cumulative leakage current affecting each RCD."
  },
  {
    id: 137,
    question: "RCD protection may be omitted for fixed equipment if:",
    options: [
      "Equipment is expensive",
      "Unwanted tripping would cause greater danger",
      "Equipment is rarely used",
      "Alternative protection provided and risk assessment completed"
    ],
    correctAnswer: 3,
    explanation: "RCD protection may be omitted if alternative protection is provided and documented risk assessment justifies omission."
  },
  {
    id: 138,
    question: "The test button on an RCD should be operated:",
    options: [
      "Annually only",
      "Monthly by the user",
      "Only during professional testing",
      "When faults occur"
    ],
    correctAnswer: 1,
    explanation: "RCD test buttons should be operated monthly by users to verify mechanical operation of the device."
  },
  {
    id: 139,
    question: "When testing RCDs in IT systems:",
    options: [
      "Standard test procedures apply",
      "Special test procedures required due to earthing arrangement",
      "RCD testing not applicable",
      "Only visual inspection required"
    ],
    correctAnswer: 1,
    explanation: "IT systems require special RCD testing procedures due to the unearthed neutral and different fault current paths."
  },
  {
    id: 140,
    question: "An S-type (time-delayed) RCD is used to:",
    options: [
      "Provide faster protection",
      "Achieve discrimination with downstream RCDs",
      "Reduce sensitivity",
      "Protect against overcurrent"
    ],
    correctAnswer: 1,
    explanation: "S-type RCDs incorporate time delay to ensure downstream RCDs operate first, providing discrimination."
  },
  {
    id: 141,
    question: "The minimum test current for RCD operation testing is:",
    options: [
      "50% of rated residual current",
      "100% of rated residual current",
      "150% of rated residual current",
      "500% of rated residual current"
    ],
    correctAnswer: 0,
    explanation: "RCDs must be tested at 50% (half-rated current) where they should not trip, confirming proper sensitivity."
  },
  {
    id: 142,
    question: "RCDs protecting socket outlets in domestic premises must have a rating not exceeding:",
    options: ["10mA", "30mA", "100mA", "300mA"],
    correctAnswer: 1,
    explanation: "Domestic socket outlets require RCD protection not exceeding 30mA for additional protection against electric shock."
  },
  {
    id: 143,
    question: "When installing RCDs in circuits with high leakage currents:",
    options: [
      "Use standard 30mA RCDs",
      "Consider higher rated RCDs or circuit division",
      "Omit RCD protection",
      "Use additional earthing"
    ],
    correctAnswer: 1,
    explanation: "High leakage circuits may require higher rated RCDs (100mA) or division into multiple circuits for stability."
  },
  {
    id: 144,
    question: "The earth leakage current in a circuit protected by a 30mA RCD should not exceed:",
    options: ["3mA", "9mA", "15mA", "30mA"],
    correctAnswer: 1,
    explanation: "Combined earth leakage should not exceed 30% of RCD rating (9mA for 30mA RCD) to prevent nuisance tripping."
  },
  {
    id: 145,
    question: "RCBO devices combine the functions of:",
    options: [
      "RCD and contactor",
      "RCD and overcurrent protection",
      "Isolator and RCD",
      "Timer and RCD"
    ],
    correctAnswer: 1,
    explanation: "RCBOs (Residual Current Circuit Breakers with Overcurrent protection) combine RCD and MCB functions in one device."
  },

  // Earth Fault Loop Impedance Advanced (Questions 146-155)
  {
    id: 146,
    question: "Temperature correction factors for Zs measurements are applied because:",
    options: [
      "Test instruments are temperature sensitive",
      "Cable resistance increases with temperature",
      "Protective devices are affected by temperature",
      "Safety margins are required"
    ],
    correctAnswer: 1,
    explanation: "Cable resistance increases with temperature, so measured values at ambient temperature must be corrected to operating temperature."
  },
  {
    id: 147,
    question: "The formula for calculating R1 + R2 in a ring final circuit is:",
    options: [
      "(r1 + r2) ÷ 2",
      "(r1 + r2) ÷ 4",
      "(r1 × r2) ÷ (r1 + r2)",
      "r1 + r2"
    ],
    correctAnswer: 1,
    explanation: "For a ring circuit, R1 + R2 = (r1 + r2) ÷ 4, where r1 and r2 are the resistance values of each leg of the ring."
  },
  {
    id: 148,
    question: "When Zs exceeds the maximum permitted value, the preferred solution is:",
    options: [
      "Use higher rated protective device",
      "Improve earthing arrangements or reduce cable length",
      "Accept the higher value",
      "Install additional RCD protection only"
    ],
    correctAnswer: 1,
    explanation: "High Zs should be addressed by improving the earth fault path through better earthing or shorter cable runs."
  },
  {
    id: 149,
    question: "The 80% rule for Zs calculations accounts for:",
    options: [
      "Test instrument accuracy",
      "Voltage variations during fault conditions",
      "Temperature effects",
      "Safety margins"
    ],
    correctAnswer: 1,
    explanation: "The 0.8 factor accounts for the reduction in supply voltage during fault conditions, which affects disconnection times."
  },
  {
    id: 150,
    question: "In a TT system, the earth fault loop impedance comprises:",
    options: [
      "Ze + R1 + R2",
      "Ze + Zs external only",
      "Installation earthing + electrode resistance + supply earth return",
      "R1 + R2 only"
    ],
    correctAnswer: 2,
    explanation: "TT system Zs includes the installation earth electrode, its resistance, and the supply authority's earth return path."
  },
  {
    id: 151,
    question: "The no-trip loop test method is preferred because:",
    options: [
      "It's more accurate",
      "It doesn't cause supply interruption",
      "It's faster to perform",
      "It tests under load conditions"
    ],
    correctAnswer: 1,
    explanation: "No-trip testing avoids supply interruption that could affect other users or critical equipment."
  },
  {
    id: 152,
    question: "External earth fault loop impedance (Ze) should be measured:",
    options: [
      "At each outlet",
      "At the origin of the installation",
      "At the midpoint of circuits",
      "Only during design"
    ],
    correctAnswer: 1,
    explanation: "Ze is measured at the origin (main earthing terminal) to establish the baseline earth fault loop impedance."
  },
  {
    id: 153,
    question: "When using the 'rule of thumb' for voltage drop calculations, Zs is approximately:",
    options: [
      "R1 + R2",
      "Ze + R1",
      "Ze + (R1 + R2) × 1.67",
      "1.67 × (R1 + R2)"
    ],
    correctAnswer: 2,
    explanation: "The rule of thumb: Zs ≈ Ze + (R1 + R2) × 1.67, where 1.67 accounts for the relationship between line and earth impedance."
  },
  {
    id: 154,
    question: "High earth fault loop impedance readings may indicate:",
    options: [
      "Good earthing system",
      "Loose connections or poor earth continuity",
      "Correct installation",
      "Low supply impedance"
    ],
    correctAnswer: 1,
    explanation: "High Zs readings typically indicate poor connections, damaged conductors, or inadequate earthing arrangements."
  },
  {
    id: 155,
    question: "The earth fault loop impedance test effectively verifies:",
    options: [
      "Insulation integrity only",
      "Protective conductor continuity and earth fault path",
      "Load current capacity",
      "Voltage regulation"
    ],
    correctAnswer: 1,
    explanation: "Zs testing verifies the complete earth fault current path and protective conductor continuity in one measurement."
  },

  // Insulation Resistance Advanced (Questions 156-165)
  {
    id: 156,
    question: "When testing insulation resistance on circuits with neon indicators:",
    options: [
      "Test with indicators connected",
      "Disconnect or short out neon indicators",
      "Use lower test voltage",
      "Test indicators separately"
    ],
    correctAnswer: 1,
    explanation: "Neon indicators should be disconnected or shorted out as they can give misleading low insulation readings."
  },
  {
    id: 157,
    question: "The test voltage for insulation resistance testing on 400V three-phase circuits is:",
    options: ["250V DC", "500V DC", "1000V DC", "1500V DC"],
    correctAnswer: 1,
    explanation: "Circuits with nominal voltage between 50V and 500V should be tested at 500V DC."
  },
  {
    id: 158,
    question: "Polarisation index testing involves:",
    options: [
      "Single reading at 60 seconds",
      "Ratio of 10-minute to 1-minute resistance readings",
      "Testing at different voltages",
      "Measuring capacitance"
    ],
    correctAnswer: 1,
    explanation: "Polarisation index is the ratio of insulation resistance at 10 minutes to that at 1 minute, indicating insulation condition."
  },
  {
    id: 159,
    question: "Low insulation resistance readings may be caused by:",
    options: [
      "High temperature and humidity",
      "Good installation practices",
      "New cable installation",
      "Proper terminations"
    ],
    correctAnswer: 0,
    explanation: "High temperature and humidity reduce insulation resistance by increasing conductivity through the insulation."
  },
  {
    id: 160,
    question: "When testing insulation resistance between live conductors:",
    options: [
      "All switches must be open",
      "All switches and control devices should be closed",
      "Switch position doesn't matter",
      "Only main switch should be closed"
    ],
    correctAnswer: 1,
    explanation: "Switches and control devices should be closed to test the complete circuit insulation, including all connected equipment."
  },
  {
    id: 161,
    question: "The minimum insulation resistance for motor circuits at 500V test voltage is typically:",
    options: ["0.5 MΩ", "1 MΩ", "2 MΩ", "5 MΩ"],
    correctAnswer: 1,
    explanation: "Motor circuits should achieve minimum 1 MΩ insulation resistance, though manufacturer specifications may vary."
  },
  {
    id: 162,
    question: "Step voltage testing for cable insulation involves:",
    options: [
      "Single voltage application",
      "Gradual voltage increase to test voltage",
      "Alternating test voltages",
      "Decreasing voltage steps"
    ],
    correctAnswer: 1,
    explanation: "Step voltage testing gradually increases voltage to detect insulation weaknesses before reaching full test voltage."
  },
  {
    id: 163,
    question: "Insulation resistance testing should be performed:",
    options: [
      "Only on new installations",
      "Before initial energisation and periodically thereafter",
      "Only when faults occur",
      "Only by manufacturers"
    ],
    correctAnswer: 1,
    explanation: "Insulation testing is required before initial energisation and should be repeated during periodic inspections."
  },
  {
    id: 164,
    question: "When insulation resistance is measured as infinity (∞):",
    options: [
      "The circuit has failed",
      "Perfect insulation is indicated",
      "Test instrument is faulty",
      "Test voltage is too low"
    ],
    correctAnswer: 1,
    explanation: "An infinity reading indicates insulation resistance exceeds the instrument's measurement range, showing excellent insulation."
  },
  {
    id: 165,
    question: "The absorption ratio for insulation testing is:",
    options: [
      "1-minute to 30-second reading ratio",
      "10-minute to 1-minute reading ratio",
      "30-second to 15-second reading ratio",
      "5-minute to 30-second reading ratio"
    ],
    correctAnswer: 0,
    explanation: "Absorption ratio is the 1-minute insulation resistance reading divided by the 30-second reading."
  },

  // Protective Conductor Testing Advanced (Questions 166-175)
  {
    id: 166,
    question: "The maximum resistance value for a protective conductor in a ring final circuit is:",
    options: [
      "Same as live conductors",
      "Double the live conductor resistance",
      "Half the live conductor resistance",
      "1.67 times the live conductor resistance"
    ],
    correctAnswer: 3,
    explanation: "For reduced CPC in ring circuits, maximum resistance is 1.67 times the line conductor resistance per BS 7671."
  },
  {
    id: 167,
    question: "When testing protective conductor continuity in installations with multiple earth electrodes:",
    options: [
      "Test each electrode separately",
      "Test the combined resistance",
      "Testing not required",
      "Visual inspection only"
    ],
    correctAnswer: 0,
    explanation: "Each earth electrode should be tested separately to verify individual electrode effectiveness."
  },
  {
    id: 168,
    question: "The test current for main protective bonding conductor continuity should be:",
    options: [
      "Not less than 10mA",
      "Not less than 200mA",
      "Not less than 1.5 times the design current",
      "Not less than 10A"
    ],
    correctAnswer: 1,
    explanation: "Main protective bonding conductors should be tested with not less than 200mA test current to ensure reliable results."
  },
  {
    id: 169,
    question: "Supplementary bonding effectiveness can be verified by:",
    options: [
      "Visual inspection only",
      "Resistance measurement between bonded parts",
      "Insulation resistance testing",
      "RCD testing only"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding should be verified by measuring resistance between simultaneously accessible exposed and extraneous conductive parts."
  },
  {
    id: 170,
    question: "When testing the continuity of ring circuit protective conductors, readings should be:",
    options: [
      "Identical at all points",
      "Approximately equal with slight variations",
      "Progressively increasing",
      "Random values"
    ],
    correctAnswer: 1,
    explanation: "Ring circuit CPC readings should be approximately equal with slight variations due to measurement accuracy and connections."
  },
  {
    id: 171,
    question: "The cross-sectional area of a main protective bonding conductor is determined by:",
    options: [
      "Circuit protective conductor size",
      "Main earthing conductor size",
      "Largest circuit cable size",
      "Supply cable size"
    ],
    correctAnswer: 1,
    explanation: "Main protective bonding conductor size is based on the main earthing conductor size according to Table 54.8 in BS 7671."
  },
  {
    id: 172,
    question: "Class II equipment should have:",
    options: [
      "Protective conductor connection",
      "No protective conductor connection",
      "Double protective conductor connection",
      "Temporary protective conductor"
    ],
    correctAnswer: 1,
    explanation: "Class II (double insulated) equipment must not have a protective conductor connection as it relies on insulation for protection."
  },
  {
    id: 173,
    question: "When testing protective conductor continuity in armoured cables:",
    options: [
      "Test armour and internal CPC separately",
      "Test combined resistance only",
      "Armour testing not required",
      "Visual inspection sufficient"
    ],
    correctAnswer: 0,
    explanation: "Armoured cables require separate testing of the armour and any internal CPC to verify parallel path effectiveness."
  },
  {
    id: 174,
    question: "The protective conductor resistance in a radial circuit should be:",
    options: [
      "Equal to line conductor resistance",
      "Related to line conductor resistance by cross-sectional area ratio",
      "Always 1.67 times line resistance",
      "Independent of line conductor"
    ],
    correctAnswer: 1,
    explanation: "CPC resistance relates to line conductor resistance by the ratio of their cross-sectional areas (R1/R2 = Area2/Area1)."
  },
  {
    id: 175,
    question: "Functional earth conductors should be tested for:",
    options: [
      "Continuity only",
      "Continuity and isolation from protective conductors",
      "Insulation resistance only",
      "No testing required"
    ],
    correctAnswer: 1,
    explanation: "Functional earth conductors require continuity testing and verification of isolation from protective earth systems."
  },

  // Certification and Documentation Advanced (Questions 176-190)
  {
    id: 176,
    question: "An EICR must include a recommendation for the next inspection interval based on:",
    options: [
      "Standard 5-year period",
      "Installation type, use, and condition",
      "Client preference only",
      "Insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Next inspection interval should be determined by installation type, usage pattern, environment, and current condition."
  },
  {
    id: 177,
    question: "When limitations prevent full inspection, the EICR must:",
    options: [
      "Be marked as invalid",
      "State limitations and their potential impact on safety",
      "Be completed as normal",
      "Be postponed until limitations resolved"
    ],
    correctAnswer: 1,
    explanation: "Limitations must be clearly stated with explanation of their potential impact on the inspection's effectiveness."
  },
  {
    id: 178,
    question: "The 'extent and limitations' section of an EICR should specify:",
    options: [
      "Only areas inspected",
      "Areas inspected, limitations, and percentage of installation sampled",
      "Only limitations encountered",
      "Standard inspection scope"
    ],
    correctAnswer: 1,
    explanation: "This section must detail exactly what was inspected, any limitations, and the percentage of the installation sampled."
  },
  {
    id: 179,
    question: "An EICR classification of 'Unsatisfactory' means:",
    options: [
      "Minor defects present",
      "C1 or C2 observations recorded",
      "Documentation incomplete",
      "Testing not possible"
    ],
    correctAnswer: 1,
    explanation: "Unsatisfactory classification indicates C1 (danger present) or C2 (potentially dangerous) observations exist."
  },
  {
    id: 180,
    question: "The person ordering an EICR should be advised when:",
    options: [
      "Work is completed only",
      "C1, C2, or FI observations are found",
      "Documentation is complete",
      "Payment is due"
    ],
    correctAnswer: 1,
    explanation: "Urgent consultation is required when immediate danger (C1), potential danger (C2), or further investigation (FI) is identified."
  },
  {
    id: 181,
    question: "Schedule of Inspections forms part of:",
    options: [
      "EIC only",
      "MEIWC only",
      "Both EIC and EICR",
      "Designer's records only"
    ],
    correctAnswer: 2,
    explanation: "Schedule of Inspections is required for both Electrical Installation Certificates and Electrical Installation Condition Reports."
  },
  {
    id: 182,
    question: "The 'Summary of the Installation' section must include:",
    options: [
      "Cable types only",
      "Earthing arrangements, supply characteristics, and main protective devices",
      "Cost information",
      "Previous inspection records"
    ],
    correctAnswer: 1,
    explanation: "Summary must include earthing system type, supply characteristics, and details of main protective devices."
  },
  {
    id: 183,
    question: "Distribution circuit details in Schedule of Test Results should show:",
    options: [
      "Voltage measurements only",
      "Circuit designation, cable details, and protection characteristics",
      "Installation date only",
      "Cost per circuit"
    ],
    correctAnswer: 1,
    explanation: "Distribution circuits require circuit designation, cable type/size, method of protection, and protective device details."
  },
  {
    id: 184,
    question: "When test results fall outside acceptable limits:",
    options: [
      "Record actual values with deviation noted",
      "Adjust readings to acceptable values",
      "Omit from schedule",
      "Mark as satisfactory"
    ],
    correctAnswer: 0,
    explanation: "Actual measured values must be recorded with clear indication that they exceed acceptable limits."
  },
  {
    id: 185,
    question: "The duty holder for electrical safety in commercial premises is typically:",
    options: [
      "The electrician",
      "The building owner or person in control",
      "The local authority",
      "The insurance company"
    ],
    correctAnswer: 1,
    explanation: "The person in control of the premises (owner, lessee, or occupier) has the primary duty for electrical safety."
  },
  {
    id: 186,
    question: "Competency for inspection and testing is demonstrated by:",
    options: [
      "Formal qualifications only",
      "Knowledge, training, experience, and understanding of hazards",
      "Membership of trade associations",
      "Years of experience only"
    ],
    correctAnswer: 1,
    explanation: "Competency requires appropriate knowledge, training, experience, and understanding of the risks involved."
  },
  {
    id: 187,
    question: "Records of electrical maintenance should be kept for:",
    options: [
      "1 year minimum",
      "Duration of the installation plus reasonable period",
      "5 years only",
      "Until next inspection"
    ],
    correctAnswer: 1,
    explanation: "Maintenance records should be retained for the installation's life plus a reasonable period for liability purposes."
  },
  {
    id: 188,
    question: "When an EICR identifies immediate danger, the inspector should:",
    options: [
      "Complete all testing first",
      "Immediately advise the person ordering the report",
      "Continue with normal procedures",
      "Schedule return visit"
    ],
    correctAnswer: 1,
    explanation: "Immediate danger requires urgent communication to allow prompt remedial action to ensure safety."
  },
  {
    id: 189,
    question: "The recommended interval between EICRs for commercial offices is typically:",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctAnswer: 2,
    explanation: "Commercial offices typically require EICR every 5 years, though this may vary based on risk assessment."
  },
  {
    id: 190,
    question: "An inspector must refuse to issue a certificate when:",
    options: [
      "Minor defects are present",
      "They cannot verify compliance due to limitations",
      "Client requests modifications",
      "Testing equipment is basic"
    ],
    correctAnswer: 1,
    explanation: "Certificates cannot be issued when the inspector cannot adequately verify safety and compliance due to limitations."
  },

  // Fault Finding and Troubleshooting (Questions 191-200)
  {
    id: 191,
    question: "A circuit that tests satisfactory when cold but fails when loaded indicates:",
    options: [
      "Incorrect test procedure",
      "Thermal expansion causing loose connections",
      "Normal operation",
      "Test equipment error"
    ],
    correctAnswer: 1,
    explanation: "Temperature-dependent faults often indicate loose connections that separate under thermal expansion when loaded."
  },
  {
    id: 192,
    question: "Intermittent RCD tripping without obvious cause may be due to:",
    options: [
      "Faulty RCD only",
      "Accumulated earth leakage from multiple sources",
      "Overvoltage conditions",
      "Incorrect installation"
    ],
    correctAnswer: 1,
    explanation: "Multiple small leakage currents can accumulate to exceed RCD sensitivity, especially with deteriorating insulation."
  },
  {
    id: 193,
    question: "A systematic approach to fault finding should begin with:",
    options: [
      "Replacing components",
      "Gathering information and visual inspection",
      "Complex testing procedures",
      "Circuit modifications"
    ],
    correctAnswer: 1,
    explanation: "Effective fault finding starts with gathering information about symptoms and thorough visual inspection."
  },
  {
    id: 194,
    question: "When earth fault loop impedance tests show inconsistent results:",
    options: [
      "Accept the lowest reading",
      "Investigate for variable connections or parallel paths",
      "Use the highest reading",
      "Average all readings"
    ],
    correctAnswer: 1,
    explanation: "Inconsistent Zs readings suggest variable connections, parallel earth paths, or measurement issues requiring investigation."
  },
  {
    id: 195,
    question: "A circuit showing normal insulation resistance but operating RCD indicates:",
    options: [
      "Faulty RCD",
      "Earth leakage current below test instrument sensitivity",
      "Incorrect test procedure",
      "Circuit overload"
    ],
    correctAnswer: 1,
    explanation: "Small earth leakage currents may be below insulation tester sensitivity but sufficient to operate sensitive RCDs."
  },
  {
    id: 196,
    question: "Voltage readings that vary significantly under load suggest:",
    options: [
      "Normal operation",
      "High resistance connections or inadequate cable sizing",
      "Correct installation",
      "Low power consumption"
    ],
    correctAnswer: 1,
    explanation: "Significant voltage drop under load indicates high resistance connections or undersized conductors."
  },
  {
    id: 197,
    question: "When troubleshooting control circuits, priority should be given to:",
    options: [
      "Power circuits first",
      "Safety systems and interlocks",
      "Lighting circuits",
      "Convenience outlets"
    ],
    correctAnswer: 1,
    explanation: "Safety systems and interlocks must be prioritised to prevent dangerous conditions during troubleshooting."
  },
  {
    id: 198,
    question: "Neutral conductor faults in three-phase systems may cause:",
    options: [
      "Balanced voltages",
      "Voltage imbalance and potential equipment damage",
      "Improved efficiency",
      "No noticeable effects"
    ],
    correctAnswer: 1,
    explanation: "Neutral faults in three-phase systems create voltage imbalance that can damage single-phase loads."
  },
  {
    id: 199,
    question: "Arc fault detection requires consideration of:",
    options: [
      "Standard electrical tests only",
      "High-frequency components and specialised detection equipment",
      "Visual inspection only",
      "Standard multimeter readings"
    ],
    correctAnswer: 1,
    explanation: "Arc faults generate high-frequency signatures requiring specialised arc fault detection equipment for reliable identification."
  },
  {
    id: 200,
    question: "When fault symptoms appear only under specific operating conditions:",
    options: [
      "Ignore as temporary issue",
      "Attempt to replicate the conditions during testing",
      "Test only under normal conditions",
      "Assume equipment defect"
    ],
    correctAnswer: 1,
    explanation: "Condition-specific faults require testing under the same conditions to accurately identify and resolve the problem."
  },

  // Advanced Testing Scenarios (Questions 201-225)
  {
    id: 201,
    question: "When testing a 3-phase motor installation, what additional safety considerations apply?",
    options: [
      "Standard single-phase procedures only",
      "Rotation direction check and phase sequence testing",
      "Visual inspection only",
      "No additional considerations"
    ],
    correctAnswer: 1,
    explanation: "3-phase installations require phase sequence verification and rotation direction checks to prevent equipment damage."
  },
  {
    id: 202,
    question: "In a swimming pool installation, what special earthing requirements must be verified?",
    options: [
      "Standard earthing only",
      "Equipotential bonding of all conductive parts within zones",
      "No earthing required",
      "Plastic installations only"
    ],
    correctAnswer: 1,
    explanation: "Pool installations require comprehensive equipotential bonding of all metallic parts within specified zones."
  },
  {
    id: 203,
    question: "When testing circuits in a marina installation, what environmental factor must be considered?",
    options: [
      "Temperature only",
      "Moisture and salt corrosion effects on connections",
      "Wind speed",
      "Noise levels"
    ],
    correctAnswer: 1,
    explanation: "Marine environments cause accelerated corrosion requiring more frequent inspection and specialised protection."
  },
  {
    id: 204,
    question: "During fault finding on a complex distribution board, what systematic approach should be used?",
    options: [
      "Random testing",
      "Work from supply to load, isolating sections systematically",
      "Test all circuits simultaneously",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Systematic isolation from supply to load helps locate faults efficiently while maintaining safety."
  },
  {
    id: 205,
    question: "What limitation might prevent full testing of a hospital installation?",
    options: [
      "Cost constraints",
      "Critical life support equipment that cannot be isolated",
      "Time constraints only",
      "Access restrictions"
    ],
    correctAnswer: 1,
    explanation: "Critical medical equipment may require alternative testing methods or recorded limitations."
  },
  {
    id: 206,
    question: "In a fire alarm system installation, what additional testing is required?",
    options: [
      "Standard electrical testing only",
      "Functional testing of detection and alarm systems",
      "Visual inspection only",
      "Cable testing only"
    ],
    correctAnswer: 1,
    explanation: "Fire alarm systems require both electrical verification and functional testing to BS 5839 standards."
  },
  {
    id: 207,
    question: "When testing an installation with electronic equipment, what precaution is essential?",
    options: [
      "Use higher test voltages",
      "Disconnect sensitive equipment before insulation testing",
      "Test everything connected",
      "Use AC test voltages"
    ],
    correctAnswer: 1,
    explanation: "Electronic equipment can be damaged by high DC test voltages and must be disconnected."
  },
  {
    id: 208,
    question: "What is the preferred method for testing earth electrode resistance?",
    options: [
      "Simple resistance measurement",
      "Fall of potential method using test electrodes",
      "Visual inspection",
      "Continuity testing only"
    ],
    correctAnswer: 1,
    explanation: "The fall of potential method provides accurate earth electrode resistance measurement."
  },
  {
    id: 209,
    question: "During testing of a theatre installation, what special consideration applies to dimmers?",
    options: [
      "Standard testing procedures",
      "Electronic equipment protection and harmonic considerations",
      "Higher test voltages",
      "No special considerations"
    ],
    correctAnswer: 1,
    explanation: "Theatre dimmers contain sensitive electronics and can generate harmonics affecting other equipment."
  },
  {
    id: 210,
    question: "What testing challenge is presented by smart lighting systems?",
    options: [
      "Higher currents",
      "Communication protocols and electronic component protection",
      "Lower voltages",
      "Mechanical switches only"
    ],
    correctAnswer: 1,
    explanation: "Smart lighting involves communication systems and sensitive electronics requiring careful testing procedures."
  },
  {
    id: 211,
    question: "In an agricultural installation, what environmental factor affects testing?",
    options: [
      "Clean environment",
      "Dust, moisture and corrosive substances",
      "Low temperatures only",
      "High ceilings"
    ],
    correctAnswer: 1,
    explanation: "Agricultural environments present harsh conditions requiring more frequent inspection and specialised protection."
  },
  {
    id: 212,
    question: "When testing IT earthing systems, what key difference applies?",
    options: [
      "No difference from TN systems",
      "First fault does not cause disconnection - monitoring required",
      "Higher test voltages needed",
      "No earth required"
    ],
    correctAnswer: 1,
    explanation: "IT systems use insulation monitoring as the first fault doesn't cause automatic disconnection."
  },
  {
    id: 213,
    question: "What is the significance of testing at different load conditions?",
    options: [
      "No significance",
      "Temperature and voltage drop effects vary with load",
      "Faster testing",
      "Lower test voltages"
    ],
    correctAnswer: 1,
    explanation: "Different load conditions affect voltage drop, temperature and protective device operation."
  },
  {
    id: 214,
    question: "During testing of a lift installation, what safety protocol is essential?",
    options: [
      "Standard procedures only",
      "Coordination with lift engineer and mechanical isolation",
      "Electrical testing only",
      "No special requirements"
    ],
    correctAnswer: 1,
    explanation: "Lift installations require coordination with mechanical systems and specialist engineers."
  },
  {
    id: 215,
    question: "What testing consideration applies to installations with solar PV systems?",
    options: [
      "Standard AC testing only",
      "DC isolation and dual energy source considerations",
      "No special considerations",
      "Higher test voltages"
    ],
    correctAnswer: 1,
    explanation: "PV systems require DC isolation and consideration of multiple energy sources during testing."
  },
  {
    id: 216,
    question: "In a computer server room, what environmental monitoring is critical during testing?",
    options: [
      "Noise levels",
      "Temperature and humidity control maintenance",
      "Lighting levels",
      "Air pressure"
    ],
    correctAnswer: 1,
    explanation: "Server rooms require maintained environmental conditions to prevent equipment damage."
  },
  {
    id: 217,
    question: "What is the main challenge when testing emergency lighting systems?",
    options: [
      "Higher voltages",
      "Testing must not compromise life safety during occupied periods",
      "Complex wiring",
      "Lower currents"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting testing must maintain life safety while verifying system operation."
  },
  {
    id: 218,
    question: "During testing of a welding shop installation, what hazard must be considered?",
    options: [
      "Low currents only",
      "High fault currents and electromagnetic interference",
      "Standard hazards only",
      "No special hazards"
    ],
    correctAnswer: 1,
    explanation: "Welding equipment generates high currents and electromagnetic interference affecting test equipment."
  },
  {
    id: 219,
    question: "What limitation might apply when testing heritage buildings?",
    options: [
      "No limitations",
      "Access restrictions and conservation requirements",
      "Standard access",
      "Modern wiring only"
    ],
    correctAnswer: 1,
    explanation: "Heritage buildings may have access restrictions and require conservation-aware testing methods."
  },
  {
    id: 220,
    question: "In a chemical plant installation, what additional safety consideration applies?",
    options: [
      "Standard safety only",
      "Explosion risk and chemical compatibility of equipment",
      "High temperatures only",
      "No additional considerations"
    ],
    correctAnswer: 1,
    explanation: "Chemical plants require explosion-proof equipment and chemical compatibility considerations."
  },
  {
    id: 221,
    question: "What challenge does testing flexible cables in moving machinery present?",
    options: [
      "Standard testing sufficient",
      "Mechanical stress and flexing damage assessment",
      "Lower voltages only",
      "No special challenges"
    ],
    correctAnswer: 1,
    explanation: "Flexible cables in moving machinery require assessment for mechanical stress and fatigue damage."
  },
  {
    id: 222,
    question: "During testing of a data centre UPS system, what coordination is required?",
    options: [
      "No coordination needed",
      "UPS engineer present and backup power arrangements",
      "Standard procedures only",
      "Electrical testing only"
    ],
    correctAnswer: 1,
    explanation: "UPS testing requires specialist coordination to maintain critical power supplies."
  },
  {
    id: 223,
    question: "What testing consideration applies to temporary installations?",
    options: [
      "Reduced testing requirements",
      "Enhanced protection and more frequent inspection",
      "No testing required",
      "Standard testing only"
    ],
    correctAnswer: 1,
    explanation: "Temporary installations require enhanced protection and more frequent testing due to their nature."
  },
  {
    id: 224,
    question: "In a school installation, what timing consideration affects testing?",
    options: [
      "No timing restrictions",
      "Testing scheduled to avoid disrupting education",
      "Daytime testing only",
      "Weekend testing only"
    ],
    correctAnswer: 1,
    explanation: "Educational facility testing must be scheduled to minimise disruption to teaching activities."
  },
  {
    id: 225,
    question: "What is the key challenge when fault-finding intermittent problems?",
    options: [
      "Higher test voltages",
      "Reproducing fault conditions and systematic monitoring",
      "Standard testing adequate",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Intermittent faults require systematic monitoring and recreation of fault conditions for diagnosis."
  },

  // Modern Installation Technologies (Questions 226-250)
  {
    id: 226,
    question: "What additional testing is required for EV charging point installations?",
    options: [
      "Standard socket testing only",
      "DC leakage testing and protective conductor current verification",
      "Visual inspection only",
      "No additional testing"
    ],
    correctAnswer: 1,
    explanation: "EV charging points require DC leakage testing and verification of protective conductor current limits."
  },
  {
    id: 227,
    question: "When testing smart home systems, what protocol compatibility must be verified?",
    options: [
      "Power supply only",
      "Communication protocols (WiFi, Zigbee, Z-Wave) and interference",
      "Physical connections only",
      "Standard electrical testing"
    ],
    correctAnswer: 1,
    explanation: "Smart home systems require verification of communication protocols and electromagnetic compatibility."
  },
  {
    id: 228,
    question: "What safety consideration applies to battery storage system testing?",
    options: [
      "Standard AC testing only",
      "DC isolation, thermal runaway risk and gas ventilation",
      "Visual inspection only",
      "No special considerations"
    ],
    correctAnswer: 1,
    explanation: "Battery systems present DC hazards, fire risks and require proper ventilation during testing."
  },
  {
    id: 229,
    question: "For heat pump installations, what electrical verification is essential?",
    options: [
      "Standard motor testing",
      "Phase rotation, starting current and defrost cycle operation",
      "Visual inspection only",
      "Insulation testing only"
    ],
    correctAnswer: 1,
    explanation: "Heat pumps require phase rotation verification and defrost cycle electrical system checks."
  },
  {
    id: 230,
    question: "What testing consideration applies to LED lighting installations?",
    options: [
      "Higher test voltages",
      "Reduced insulation test voltage and driver protection",
      "Standard testing procedures",
      "No special considerations"
    ],
    correctAnswer: 1,
    explanation: "LED drivers contain sensitive electronics requiring reduced test voltages to prevent damage."
  },
  {
    id: 231,
    question: "When testing solar PV installations, what measurement is critical?",
    options: [
      "AC voltage only",
      "DC voltage, current and insulation resistance",
      "Earth resistance only",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "PV systems require comprehensive DC measurements and insulation testing for safety."
  },
  {
    id: 232,
    question: "What verification is required for smart meter installations?",
    options: [
      "Standard supply testing",
      "Communication functionality and load profile accuracy",
      "Visual inspection only",
      "Meter reading only"
    ],
    correctAnswer: 1,
    explanation: "Smart meters require verification of communication systems and accurate load monitoring."
  },
  {
    id: 233,
    question: "For building management system (BMS) integration, what testing is needed?",
    options: [
      "Power supply testing only",
      "Communication protocols, sensor calibration and system response",
      "Visual connections only",
      "Standard electrical testing"
    ],
    correctAnswer: 1,
    explanation: "BMS systems require comprehensive testing of communication, sensors and control responses."
  },
  {
    id: 234,
    question: "What safety feature must be verified in EV charging installations?",
    options: [
      "RCD protection only",
      "PEN fault detection and automatic disconnection",
      "Standard earthing only",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "EV charging requires PEN fault detection to prevent dangerous touch voltages."
  },
  {
    id: 235,
    question: "When testing energy storage systems, what isolation procedure is critical?",
    options: [
      "AC isolation only",
      "DC isolation at multiple points and energy discharge verification",
      "Standard switching only",
      "Visual isolation only"
    ],
    correctAnswer: 1,
    explanation: "Energy storage requires multiple isolation points and verification of energy discharge."
  },
  {
    id: 236,
    question: "What testing challenge is presented by wireless charging systems?",
    options: [
      "Standard testing adequate",
      "Electromagnetic field measurement and shielding verification",
      "Higher voltages only",
      "No special challenges"
    ],
    correctAnswer: 1,
    explanation: "Wireless charging requires EMF measurement and verification of safety shielding."
  },
  {
    id: 237,
    question: "For smart thermostats, what functionality verification is required?",
    options: [
      "Power supply only",
      "Temperature sensing accuracy and communication protocols",
      "Visual inspection only",
      "Standard switch testing"
    ],
    correctAnswer: 1,
    explanation: "Smart thermostats require verification of sensing accuracy and communication functionality."
  },
  {
    id: 238,
    question: "What consideration applies to testing micro-generation systems?",
    options: [
      "Standard testing only",
      "Export limitation and grid protection settings verification",
      "Visual inspection only",
      "Higher test voltages"
    ],
    correctAnswer: 1,
    explanation: "Micro-generation requires verification of export controls and grid protection systems."
  },
  {
    id: 239,
    question: "When testing smart switches and dimmers, what protection is needed?",
    options: [
      "No special protection",
      "Electronic component protection and communication testing",
      "Higher test currents",
      "Standard testing procedures"
    ],
    correctAnswer: 1,
    explanation: "Smart switches contain electronics requiring protection and communication verification."
  },
  {
    id: 240,
    question: "What verification is required for home automation lighting systems?",
    options: [
      "Manual switch testing only",
      "Automated control sequences and emergency override function",
      "Visual inspection only",
      "Standard circuit testing"
    ],
    correctAnswer: 1,
    explanation: "Automated lighting requires verification of control sequences and emergency override capability."
  },
  {
    id: 241,
    question: "For electric vehicle supply equipment (EVSE), what current monitoring is required?",
    options: [
      "Visual inspection only",
      "Pilot signal integrity and protective conductor current measurement",
      "Standard current measurement",
      "No current monitoring"
    ],
    correctAnswer: 1,
    explanation: "EVSE requires verification of pilot signals and protective conductor current limits."
  },
  {
    id: 242,
    question: "What testing consideration applies to power over Ethernet (PoE) systems?",
    options: [
      "Standard data testing",
      "Power delivery limits and equipment protection verification",
      "Visual inspection only",
      "Higher test voltages"
    ],
    correctAnswer: 1,
    explanation: "PoE systems require verification of power limits and connected equipment protection."
  },
  {
    id: 243,
    question: "When testing battery backup systems, what capacity verification is needed?",
    options: [
      "Voltage measurement only",
      "Load testing and autonomy time verification",
      "Visual inspection only",
      "Charging current only"
    ],
    correctAnswer: 1,
    explanation: "Battery backup requires load testing to verify actual autonomy time under realistic conditions."
  },
  {
    id: 244,
    question: "What safety verification is required for induction hob installations?",
    options: [
      "Standard appliance testing",
      "Electromagnetic field limits and cookware compatibility",
      "Visual inspection only",
      "Power measurement only"
    ],
    correctAnswer: 1,
    explanation: "Induction hobs require EMF measurement and verification of safe cooking environment."
  },
  {
    id: 245,
    question: "For smart security systems, what functional testing is essential?",
    options: [
      "Power supply testing only",
      "Alarm activation sequences and communication backup systems",
      "Visual inspection only",
      "Standard circuit testing"
    ],
    correctAnswer: 1,
    explanation: "Security systems require verification of alarm sequences and backup communication paths."
  },
  {
    id: 246,
    question: "What consideration applies to testing electric underfloor heating with smart controls?",
    options: [
      "Standard heating testing",
      "Temperature sensor calibration and zone control verification",
      "Visual inspection only",
      "Insulation testing only"
    ],
    correctAnswer: 1,
    explanation: "Smart heating requires verification of sensor accuracy and zone control functionality."
  },
  {
    id: 247,
    question: "When testing renewable energy inverters, what protection verification is needed?",
    options: [
      "AC output only",
      "Anti-islanding protection and grid synchronisation",
      "Visual inspection only",
      "DC input only"
    ],
    correctAnswer: 1,
    explanation: "Inverters require verification of grid protection and anti-islanding safety systems."
  },
  {
    id: 248,
    question: "What testing challenge is presented by electric towel rails with smart controls?",
    options: [
      "Standard heating element testing",
      "Temperature control accuracy and timer function verification",
      "Visual inspection only",
      "Higher test voltages"
    ],
    correctAnswer: 1,
    explanation: "Smart towel rails require verification of temperature control and programmable functions."
  },
  {
    id: 249,
    question: "For electric car charging cables, what additional testing is required?",
    options: [
      "Standard cable testing",
      "Pilot wire integrity and in-cable control box function",
      "Visual inspection only",
      "Insulation testing only"
    ],
    correctAnswer: 1,
    explanation: "EV cables require verification of pilot wire signals and in-cable protection devices."
  },
  {
    id: 250,
    question: "What verification is needed for smart garage door systems?",
    options: [
      "Motor testing only",
      "Safety sensors, obstruction detection and emergency release",
      "Visual inspection only",
      "Standard motor testing"
    ],
    correctAnswer: 1,
    explanation: "Smart garage doors require comprehensive safety system verification including sensors and emergency functions."
  },

  // Advanced Safety & Risk Assessment (Questions 251-275)
  {
    id: 251,
    question: "What is the primary purpose of a risk assessment before electrical testing?",
    options: [
      "Legal compliance only",
      "Identify hazards and implement control measures",
      "Speed up work",
      "Reduce costs"
    ],
    correctAnswer: 1,
    explanation: "Risk assessment identifies potential hazards and establishes appropriate control measures for safe working."
  },
  {
    id: 252,
    question: "When working on installations above 1kV, what additional qualification is required?",
    options: [
      "Standard electrical qualification",
      "High voltage competency certification",
      "First aid training only",
      "No additional qualification"
    ],
    correctAnswer: 1,
    explanation: "High voltage work requires specific competency certification and authorisation."
  },
  {
    id: 253,
    question: "What is the minimum safe approach distance for 11kV overhead lines?",
    options: [
      "1 metre", "2 metres", "3 metres", "5 metres"
    ],
    correctAnswer: 2,
    explanation: "The minimum safe approach distance for 11kV overhead lines is 3 metres for unqualified persons."
  },
  {
    id: 254,
    question: "Arc flash risk is highest when:",
    options: [
      "Working on de-energised equipment",
      "Working on live low voltage equipment with high fault current",
      "Working on battery systems",
      "Working outdoors only"
    ],
    correctAnswer: 1,
    explanation: "Arc flash risk increases with available fault current and is highest on live high-energy systems."
  },
  {
    id: 255,
    question: "What PPE is specifically required for arc flash protection?",
    options: [
      "Standard electrical PPE",
      "Arc-rated clothing and face protection",
      "Rubber gloves only",
      "Hard hat only"
    ],
    correctAnswer: 1,
    explanation: "Arc flash protection requires specifically rated clothing and face protection based on energy calculations."
  },
  {
    id: 256,
    question: "When must a permit to work system be used?",
    options: [
      "Never required",
      "Complex or high-risk electrical work",
      "Simple domestic work only",
      "Commercial work only"
    ],
    correctAnswer: 1,
    explanation: "Permit to work systems are required for complex or high-risk electrical work to ensure safety coordination."
  },
  {
    id: 257,
    question: "What is the maximum recommended duration for emergency response after electric shock?",
    options: [
      "10 minutes", "4 minutes", "1 minute", "30 seconds"
    ],
    correctAnswer: 1,
    explanation: "Brain damage from cardiac arrest begins after 4 minutes, making rapid response critical."
  },
  {
    id: 258,
    question: "When working alone on electrical installations, what safety measure is essential?",
    options: [
      "No special measures",
      "Regular check-in procedures and emergency contacts",
      "Faster working",
      "Reduced PPE requirements"
    ],
    correctAnswer: 1,
    explanation: "Lone working requires check-in procedures and emergency contact arrangements for safety."
  },
  {
    id: 259,
    question: "What environmental factor most increases electrical safety risk?",
    options: [
      "High temperature",
      "Wet or damp conditions",
      "Windy conditions",
      "Bright sunlight"
    ],
    correctAnswer: 1,
    explanation: "Moisture significantly reduces insulation effectiveness and increases shock risk."
  },
  {
    id: 260,
    question: "Method statements for electrical work must include:",
    options: [
      "Materials list only",
      "Step-by-step procedures and risk controls",
      "Time schedule only",
      "Cost breakdown"
    ],
    correctAnswer: 1,
    explanation: "Method statements detail procedures and risk controls for safe work execution."
  },
  {
    id: 261,
    question: "What is the hierarchy of risk control in electrical safety?",
    options: [
      "PPE first, then engineering controls",
      "Elimination, substitution, engineering controls, administrative, PPE",
      "Training first, then equipment",
      "Cost-effectiveness priority"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy prioritises elimination and substitution over PPE as the last line of defence."
  },
  {
    id: 262,
    question: "When is it acceptable to work live on electrical equipment?",
    options: [
      "To save time",
      "Only when dead working is not practicable and properly risk assessed",
      "For experienced electricians only",
      "On low voltage only"
    ],
    correctAnswer: 1,
    explanation: "Live working is only permitted when dead working is impracticable and proper risk assessment is completed."
  },
  {
    id: 263,
    question: "What rescue equipment should be readily available during electrical testing?",
    options: [
      "Toolbox only",
      "Insulated rescue hooks and first aid equipment",
      "Mobile phone only",
      "Fire extinguisher only"
    ],
    correctAnswer: 1,
    explanation: "Insulated rescue equipment and first aid supplies must be immediately available during electrical work."
  },
  {
    id: 264,
    question: "Electrical safety training must be updated:",
    options: [
      "Once only",
      "Regularly based on competency assessment",
      "Every 10 years",
      "When accidents occur"
    ],
    correctAnswer: 1,
    explanation: "Safety training requires regular updates based on competency assessment and regulatory changes."
  },
  {
    id: 265,
    question: "What information must be included in electrical safety documentation?",
    options: [
      "Equipment list only",
      "Hazard identification, risk assessment and control measures",
      "Personnel names only",
      "Work schedule only"
    ],
    correctAnswer: 1,
    explanation: "Safety documentation must comprehensively address hazards, risks and control measures."
  },
  {
    id: 266,
    question: "When working in confined spaces with electrical equipment, what additional risk applies?",
    options: [
      "No additional risk",
      "Reduced oxygen levels and restricted escape routes",
      "Higher temperatures only",
      "Noise levels only"
    ],
    correctAnswer: 1,
    explanation: "Confined spaces present additional risks of oxygen depletion and restricted emergency egress."
  },
  {
    id: 267,
    question: "What is the recommended maximum working time for detailed electrical work?",
    options: [
      "12 hours continuously",
      "Regular breaks to maintain concentration and safety",
      "Until job completion",
      "Unlimited time"
    ],
    correctAnswer: 1,
    explanation: "Regular breaks are essential to maintain concentration and prevent safety-compromising fatigue."
  },
  {
    id: 268,
    question: "Emergency procedures for electrical incidents must include:",
    options: [
      "Calling emergency services only",
      "Safe isolation, first aid and evacuation procedures",
      "Completing work first",
      "Equipment protection only"
    ],
    correctAnswer: 1,
    explanation: "Emergency procedures must address immediate safety including isolation, first aid and evacuation."
  },
  {
    id: 269,
    question: "What weather conditions require suspension of outdoor electrical work?",
    options: [
      "Never suspend work",
      "Lightning risk and heavy precipitation",
      "Slight wind only",
      "Cloudy conditions"
    ],
    correctAnswer: 1,
    explanation: "Lightning and heavy rain significantly increase electrical safety risks requiring work suspension."
  },
  {
    id: 270,
    question: "Competency assessment for electrical workers must evaluate:",
    options: [
      "Experience years only",
      "Knowledge, skills and safety understanding",
      "Qualification certificates only",
      "Speed of work"
    ],
    correctAnswer: 1,
    explanation: "Competency assessment must comprehensively evaluate knowledge, practical skills and safety awareness."
  },
  {
    id: 271,
    question: "What communication is essential during complex electrical testing?",
    options: [
      "No communication needed",
      "Clear coordination between team members and other trades",
      "Technical discussion only",
      "Minimal communication"
    ],
    correctAnswer: 1,
    explanation: "Complex testing requires clear communication to coordinate activities and maintain safety."
  },
  {
    id: 272,
    question: "Incident reporting in electrical work must include:",
    options: [
      "Major injuries only",
      "All incidents, near misses and safety observations",
      "Equipment damage only",
      "Completed work only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive incident reporting including near misses helps prevent future accidents."
  },
  {
    id: 273,
    question: "What verification is required before recommissioning electrical systems?",
    options: [
      "Visual check only",
      "Complete testing sequence and safety system verification",
      "Power-on test only",
      "Load testing only"
    ],
    correctAnswer: 1,
    explanation: "Recommissioning requires complete verification of all safety systems and testing sequences."
  },
  {
    id: 274,
    question: "Safety barriers during electrical testing must:",
    options: [
      "Be decorative only",
      "Prevent unauthorised access and clearly indicate hazards",
      "Block all access",
      "Be temporary only"
    ],
    correctAnswer: 1,
    explanation: "Safety barriers must effectively control access and clearly communicate hazards to others."
  },
  {
    id: 275,
    question: "What consideration applies to electrical work in healthcare facilities?",
    options: [
      "Standard procedures only",
      "Patient safety, life support systems and infection control",
      "Faster work required",
      "Lower safety standards"
    ],
    correctAnswer: 1,
    explanation: "Healthcare facilities require consideration of patient safety, critical systems and infection control procedures."
  },

  // Regulatory Updates & Standards (Questions 276-300)
  {
    id: 276,
    question: "The 18th Edition of BS 7671 introduced new requirements for:",
    options: [
      "No new requirements",
      "Arc fault detection devices (AFDD) in certain circumstances",
      "Lower insulation values",
      "Reduced RCD sensitivity"
    ],
    correctAnswer: 1,
    explanation: "The 18th Edition introduced requirements for AFDDs in specific applications like sleeping accommodation."
  },
  {
    id: 277,
    question: "Amendment 2 to BS 7671:2018 updated requirements for:",
    options: [
      "Standard installations only",
      "Electric vehicle charging and smart appliances",
      "Traditional lighting only",
      "Manual switches only"
    ],
    correctAnswer: 1,
    explanation: "Amendment 2 introduced specific requirements for EV charging and smart appliance considerations."
  },
  {
    id: 278,
    question: "Building Regulations Part P requires notification for:",
    options: [
      "All electrical work",
      "New circuits, consumer unit changes and bathroom/kitchen work",
      "Minor repairs only",
      "Commercial work only"
    ],
    correctAnswer: 1,
    explanation: "Part P requires notification for new circuits, consumer unit work and installations in special locations."
  },
  {
    id: 279,
    question: "The Construction (Design and Management) Regulations affect electrical contractors by:",
    options: [
      "No effect on electrical work",
      "Requiring health and safety planning and coordination",
      "Reducing safety requirements",
      "Commercial projects only"
    ],
    correctAnswer: 1,
    explanation: "CDM regulations require health and safety planning, coordination and competency throughout construction."
  },
  {
    id: 280,
    question: "Competent person scheme registration requires:",
    options: [
      "Registration fee only",
      "Demonstrated competency, insurance and quality procedures",
      "Basic qualification only",
      "Annual test only"
    ],
    correctAnswer: 1,
    explanation: "Scheme registration requires demonstrated competency, appropriate insurance and quality management systems."
  },
  {
    id: 281,
    question: "The latest surge protection requirements in BS 7671 apply to:",
    options: [
      "Industrial installations only",
      "Most installations unless specifically exempted",
      "High-risk locations only",
      "Commercial buildings only"
    ],
    correctAnswer: 1,
    explanation: "Current regulations require surge protection for most installations with specific exemption criteria."
  },
  {
    id: 282,
    question: "Professional indemnity insurance for electrical contractors must cover:",
    options: [
      "Equipment damage only",
      "Design liability and consequential losses",
      "Material costs only",
      "Third party injury only"
    ],
    correctAnswer: 1,
    explanation: "Professional indemnity insurance must cover design liability and potential consequential losses from electrical work."
  },
  {
    id: 283,
    question: "Continuing professional development (CPD) for electrical engineers requires:",
    options: [
      "No ongoing development",
      "Regular updating of knowledge and skills",
      "Initial qualification only",
      "Annual test only"
    ],
    correctAnswer: 1,
    explanation: "CPD requires ongoing development to maintain current knowledge and competency standards."
  },
  {
    id: 284,
    question: "The latest requirements for electric vehicle charging installations include:",
    options: [
      "Standard socket outlet protection",
      "Enhanced protection and load management systems",
      "No special requirements",
      "Reduced protection"
    ],
    correctAnswer: 1,
    explanation: "EV charging requires enhanced protection including PEN fault detection and load management."
  },
  {
    id: 285,
    question: "Energy efficiency regulations affect electrical installations by requiring:",
    options: [
      "No efficiency requirements",
      "Efficient lighting and control systems",
      "Higher energy consumption",
      "Basic switches only"
    ],
    correctAnswer: 1,
    explanation: "Current regulations promote energy efficiency through efficient lighting and intelligent control systems."
  },
  {
    id: 286,
    question: "The Product Construction Regulation (CPR) affects electrical cables by:",
    options: [
      "No cable requirements",
      "Fire performance classification and CE marking",
      "Colour requirements only",
      "Size requirements only"
    ],
    correctAnswer: 1,
    explanation: "CPR requires fire performance classification and CE marking for construction cables."
  },
  {
    id: 287,
    question: "Smart meter installation regulations require:",
    options: [
      "Basic electrical connection only",
      "Communications testing and consumer protection",
      "Standard meter procedures",
      "No special requirements"
    ],
    correctAnswer: 1,
    explanation: "Smart meter regulations require communications verification and consumer protection measures."
  },
  {
    id: 288,
    question: "The latest accessibility requirements for electrical installations include:",
    options: [
      "No accessibility requirements",
      "Accessible heights for switches and controls",
      "Standard positioning only",
      "Commercial buildings only"
    ],
    correctAnswer: 1,
    explanation: "Accessibility regulations specify appropriate heights and positions for electrical controls."
  },
  {
    id: 289,
    question: "Environmental regulations affecting electrical work include:",
    options: [
      "No environmental requirements",
      "Waste electrical equipment disposal and energy efficiency",
      "Colour preferences only",
      "Material costs only"
    ],
    correctAnswer: 1,
    explanation: "Environmental regulations address WEEE disposal and energy efficiency requirements."
  },
  {
    id: 290,
    question: "Data protection regulations affect electrical contractors through:",
    options: [
      "No data requirements",
      "Customer information handling and smart device data",
      "Technical data only",
      "Equipment manuals only"
    ],
    correctAnswer: 1,
    explanation: "Data protection regulations apply to customer information and smart device data handling."
  },
  {
    id: 291,
    question: "The latest fire safety regulations affect electrical installations by:",
    options: [
      "No fire safety requirements",
      "Enhanced fire stopping and emergency lighting requirements",
      "Reduced protection",
      "Commercial only"
    ],
    correctAnswer: 1,
    explanation: "Fire safety regulations require enhanced fire stopping and comprehensive emergency lighting."
  },
  {
    id: 292,
    question: "Electromagnetic compatibility (EMC) regulations require:",
    options: [
      "No EMC requirements",
      "Equipment not to cause or be susceptible to interference",
      "Higher power only",
      "Shielding not required"
    ],
    correctAnswer: 1,
    explanation: "EMC regulations ensure equipment doesn't cause interference and operates correctly despite interference."
  },
  {
    id: 293,
    question: "The current requirements for electrical installation certificates include:",
    options: [
      "Basic completion certificate",
      "Comprehensive testing schedules and digital submission capability",
      "Handwritten only",
      "No specific format"
    ],
    correctAnswer: 1,
    explanation: "Current certificate requirements include detailed testing schedules and digital submission capabilities."
  },
  {
    id: 294,
    question: "Low voltage directive compliance requires:",
    options: [
      "No voltage requirements",
      "CE marking and declaration of conformity",
      "Basic safety only",
      "National standards only"
    ],
    correctAnswer: 1,
    explanation: "LVD compliance requires CE marking and manufacturer's declaration of conformity."
  },
  {
    id: 295,
    question: "The latest ventilation requirements affect electrical installations by:",
    options: [
      "No ventilation requirements",
      "Integration with mechanical ventilation and air quality systems",
      "Natural ventilation only",
      "No electrical integration"
    ],
    correctAnswer: 1,
    explanation: "Ventilation regulations require integration with mechanical systems and air quality monitoring."
  },
  {
    id: 296,
    question: "Security system regulations require electrical installations to:",
    options: [
      "Basic power supply only",
      "Tamper detection and backup power systems",
      "Standard wiring only",
      "No special requirements"
    ],
    correctAnswer: 1,
    explanation: "Security systems require tamper detection and reliable backup power for effectiveness."
  },
  {
    id: 297,
    question: "The latest requirements for temporary electrical installations include:",
    options: [
      "Reduced safety standards",
      "Enhanced protection and frequent inspection schedules",
      "Standard procedures only",
      "No special requirements"
    ],
    correctAnswer: 1,
    explanation: "Temporary installations require enhanced protection and more frequent inspection due to their nature."
  },
  {
    id: 298,
    question: "Medical electrical equipment installation requires:",
    options: [
      "Standard electrical supply",
      "IT earthing systems and supplementary bonding",
      "TN systems only",
      "No special earthing"
    ],
    correctAnswer: 1,
    explanation: "Medical locations require IT earthing systems and comprehensive supplementary bonding for patient safety."
  },
  {
    id: 299,
    question: "The current renewable energy regulations require:",
    options: [
      "No grid connection standards",
      "Grid code compliance and export limitation",
      "Unlimited export",
      "DC systems only"
    ],
    correctAnswer: 1,
    explanation: "Renewable installations must comply with grid codes and include appropriate export limitation."
  },
  {
    id: 300,
    question: "Electrical safety management systems must include:",
    options: [
      "Basic procedures only",
      "Risk assessment, competency management and performance monitoring",
      "Equipment lists only",
      "Financial controls only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive safety management requires risk assessment, competency management and performance monitoring systems."
  }
];

// Enhanced function to get random questions with improved distribution
export const getRandomMockExamQuestions = (questionCount: number = 30): QuizQuestion[] => {
  const shuffled = [...mockExamQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, questionCount);
};