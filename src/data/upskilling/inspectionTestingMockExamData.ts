// Inspection & Testing Mock Exam Question Bank
// 300 questions covering all 8 modules

export interface MockExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  module: number;
}

const allQuestions: MockExamQuestion[] = [
  // MODULE 1: Introduction to Inspection & Testing (Questions 1-38)
  {
    id: 1,
    question: "What is the primary purpose of periodic inspection and testing?",
    options: [
      "To increase energy efficiency",
      "To verify the installation remains safe for continued use",
      "To reduce electricity bills",
      "To upgrade the installation"
    ],
    correctAnswer: 1,
    explanation: "Periodic inspection and testing verifies that an electrical installation remains safe for continued use and identifies any deterioration or defects.",
    module: 1
  },
  {
    id: 2,
    question: "Which British Standard covers requirements for initial verification and periodic inspection?",
    options: [
      "BS 7430",
      "BS 7671",
      "BS 5839",
      "BS 6004"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 (IET Wiring Regulations) covers requirements for initial verification and periodic inspection and testing of electrical installations.",
    module: 1
  },
  {
    id: 3,
    question: "What does EICR stand for?",
    options: [
      "Electrical Installation Condition Report",
      "Electrical Inspection Certificate Report",
      "Energy Installation Compliance Report",
      "Electrical Industry Certification Requirements"
    ],
    correctAnswer: 0,
    explanation: "EICR stands for Electrical Installation Condition Report, which documents the condition of an existing electrical installation.",
    module: 1
  },
  {
    id: 4,
    question: "Who is legally qualified to carry out electrical inspection and testing?",
    options: [
      "Any electrician",
      "Only the installation owner",
      "A competent person with appropriate knowledge and experience",
      "Only government inspectors"
    ],
    correctAnswer: 2,
    explanation: "Inspection and testing must be carried out by a competent person with the appropriate knowledge, skills, and experience.",
    module: 1
  },
  {
    id: 5,
    question: "What is the recommended maximum interval for periodic inspection of a domestic installation?",
    options: [
      "1 year",
      "5 years",
      "10 years",
      "15 years"
    ],
    correctAnswer: 2,
    explanation: "The recommended maximum interval for periodic inspection of domestic installations is 10 years, or at change of occupancy.",
    module: 1
  },
  {
    id: 6,
    question: "What classification code indicates a potentially dangerous condition requiring immediate action?",
    options: [
      "C1",
      "C2",
      "C3",
      "FI"
    ],
    correctAnswer: 0,
    explanation: "C1 indicates 'Danger present' - a dangerous condition requiring immediate remedial action.",
    module: 1
  },
  {
    id: 7,
    question: "What does a C2 classification indicate?",
    options: [
      "No danger present",
      "Further investigation required",
      "Potentially dangerous - urgent remedial action required",
      "Improvement recommended"
    ],
    correctAnswer: 2,
    explanation: "C2 indicates 'Potentially dangerous' - requiring urgent remedial action.",
    module: 1
  },
  {
    id: 8,
    question: "What does a C3 classification indicate?",
    options: [
      "Danger present",
      "Potentially dangerous",
      "Improvement recommended",
      "Further investigation required"
    ],
    correctAnswer: 2,
    explanation: "C3 indicates 'Improvement recommended' - the installation does not comply with current standards but is not dangerous.",
    module: 1
  },
  {
    id: 9,
    question: "What does FI stand for in inspection reporting?",
    options: [
      "Final Inspection",
      "Further Investigation",
      "Fault Identified",
      "Full Installation"
    ],
    correctAnswer: 1,
    explanation: "FI stands for 'Further Investigation' required to determine the nature and extent of a defect.",
    module: 1
  },
  {
    id: 10,
    question: "What is the recommended inspection interval for industrial installations?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 1,
    explanation: "Industrial installations typically require inspection every 3 years due to the more demanding environment.",
    module: 1
  },
  {
    id: 11,
    question: "Which document must be provided after completing an initial verification?",
    options: [
      "EICR only",
      "Electrical Installation Certificate",
      "Minor Works Certificate",
      "Building control notification only"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate must be provided after completing initial verification of a new installation.",
    module: 1
  },
  {
    id: 12,
    question: "What is the correct sequence for inspection and testing?",
    options: [
      "Testing, visual inspection, documentation",
      "Visual inspection, testing, documentation",
      "Documentation, visual inspection, testing",
      "Testing, documentation, visual inspection"
    ],
    correctAnswer: 1,
    explanation: "The correct sequence is visual inspection first, then testing, followed by documentation of results.",
    module: 1
  },
  {
    id: 13,
    question: "What percentage of an installation should typically be inspected during periodic inspection?",
    options: [
      "10%",
      "25%",
      "40%",
      "100%"
    ],
    correctAnswer: 3,
    explanation: "Periodic inspection should cover 100% of the installation where reasonably practicable.",
    module: 1
  },
  {
    id: 14,
    question: "Who should receive a copy of the EICR?",
    options: [
      "Only the inspector",
      "Only the landlord",
      "The person ordering the work and the installation owner/occupier",
      "Only building control"
    ],
    correctAnswer: 2,
    explanation: "The person ordering the work and the owner or occupier should receive copies of the EICR.",
    module: 1
  },
  {
    id: 15,
    question: "What is the recommended inspection interval for swimming pools?",
    options: [
      "6 months",
      "1 year",
      "3 years",
      "5 years"
    ],
    correctAnswer: 1,
    explanation: "Swimming pools and other special locations typically require annual inspection due to increased risks.",
    module: 1
  },
  {
    id: 16,
    question: "Which regulation introduced mandatory electrical safety checks for private rented properties in England?",
    options: [
      "Building Regulations 2010",
      "Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020",
      "Health and Safety at Work Act 1974",
      "Consumer Rights Act 2015"
    ],
    correctAnswer: 1,
    explanation: "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 made 5-yearly EICRs mandatory for private landlords.",
    module: 1
  },
  {
    id: 17,
    question: "What does the term 'initial verification' refer to?",
    options: [
      "The first check of an existing installation",
      "Inspection and testing of a new installation before energisation",
      "Annual maintenance check",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Initial verification is the inspection and testing of a new installation or addition before being put into service.",
    module: 1
  },
  {
    id: 18,
    question: "What is the main difference between an EIC and an EICR?",
    options: [
      "There is no difference",
      "EIC is for new installations, EICR is for existing installations",
      "EIC is more detailed",
      "EICR requires more tests"
    ],
    correctAnswer: 1,
    explanation: "An EIC (Electrical Installation Certificate) is for new installations, while an EICR is for assessing the condition of existing installations.",
    module: 1
  },
  {
    id: 19,
    question: "Which part of BS 7671 specifically covers inspection and testing?",
    options: [
      "Part 4",
      "Part 5",
      "Part 6",
      "Part 7"
    ],
    correctAnswer: 2,
    explanation: "Part 6 of BS 7671 covers inspection and testing requirements.",
    module: 1
  },
  {
    id: 20,
    question: "What should be done if access to part of an installation is not possible during inspection?",
    options: [
      "Assume it is satisfactory",
      "Fail the entire installation",
      "Record the limitation in the report",
      "Arrange to return another day"
    ],
    correctAnswer: 2,
    explanation: "Any limitations or areas that could not be inspected must be recorded in the report.",
    module: 1
  },
  {
    id: 21,
    question: "What is the purpose of sampling during periodic inspection?",
    options: [
      "To reduce testing time",
      "To assess the overall condition when full inspection is impractical",
      "To save money",
      "To avoid disruption"
    ],
    correctAnswer: 1,
    explanation: "Sampling may be used to assess overall condition when full inspection is impractical, but must be representative.",
    module: 1
  },
  {
    id: 22,
    question: "Who is responsible for ensuring electrical installations in rented properties are safe?",
    options: [
      "The tenant",
      "The local council",
      "The landlord",
      "The electricity supplier"
    ],
    correctAnswer: 2,
    explanation: "The landlord is legally responsible for ensuring electrical installations in rented properties are safe.",
    module: 1
  },
  {
    id: 23,
    question: "What minimum information must be recorded during inspection?",
    options: [
      "Only test results",
      "Only defects found",
      "Method of protection, earthing arrangements, and test results",
      "Just the date of inspection"
    ],
    correctAnswer: 2,
    explanation: "Records must include method of protection against electric shock, earthing arrangements, and all test results.",
    module: 1
  },
  {
    id: 24,
    question: "What action should be taken if a dangerous condition is found during inspection?",
    options: [
      "Complete the full inspection first",
      "Make safe immediately and inform the person in control",
      "Document it and leave",
      "Wait for authorisation to act"
    ],
    correctAnswer: 1,
    explanation: "Dangerous conditions must be made safe immediately and the person responsible for the installation informed.",
    module: 1
  },
  {
    id: 25,
    question: "What is the recommended inspection interval for hotels?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "Hotels typically require inspection every 5 years.",
    module: 1
  },
  // MODULE 2: Safe Isolation Procedures (Questions 26-63)
  {
    id: 26,
    question: "What is the first step in safe isolation procedure?",
    options: [
      "Lock off the supply",
      "Test that equipment is dead",
      "Identify the source of supply",
      "Post warning notices"
    ],
    correctAnswer: 2,
    explanation: "The first step is to identify all sources of supply to the circuit or equipment being worked on.",
    module: 2
  },
  {
    id: 27,
    question: "What device should be used to verify isolation?",
    options: [
      "Multimeter only",
      "Approved voltage indicator (AVI)",
      "Non-contact voltage detector only",
      "Test lamp only"
    ],
    correctAnswer: 1,
    explanation: "An approved voltage indicator (AVI) complying with GS38 should be used to verify isolation.",
    module: 2
  },
  {
    id: 28,
    question: "What is the proving unit used for?",
    options: [
      "To test continuity",
      "To prove the voltage indicator is working correctly",
      "To measure insulation resistance",
      "To test RCDs"
    ],
    correctAnswer: 1,
    explanation: "A proving unit is used to prove that the voltage indicator is working correctly before and after testing.",
    module: 2
  },
  {
    id: 29,
    question: "What is the correct sequence for proving dead?",
    options: [
      "Test dead, prove tester, test dead",
      "Prove tester, test dead, prove tester",
      "Test dead, test dead, prove tester",
      "Prove tester only"
    ],
    correctAnswer: 1,
    explanation: "The correct sequence is: prove the tester works, test the circuit is dead, then prove the tester still works.",
    module: 2
  },
  {
    id: 30,
    question: "What does GS38 relate to?",
    options: [
      "Earthing requirements",
      "Electrical test equipment used by electricians",
      "Cable sizing calculations",
      "RCD testing procedures"
    ],
    correctAnswer: 1,
    explanation: "GS38 is HSE guidance on electrical test equipment used by electricians, covering safe use and probe requirements.",
    module: 2
  },
  {
    id: 31,
    question: "What is the maximum exposed probe tip length permitted by GS38?",
    options: [
      "2mm",
      "4mm",
      "6mm",
      "10mm"
    ],
    correctAnswer: 1,
    explanation: "GS38 recommends probe tips are shrouded with a maximum of 4mm exposed or retractable.",
    module: 2
  },
  {
    id: 32,
    question: "What colour should warning notices for isolation be?",
    options: [
      "Green",
      "Blue",
      "Yellow/black or red/white",
      "Orange"
    ],
    correctAnswer: 2,
    explanation: "Warning notices should be yellow/black for caution or red/white for danger/prohibition.",
    module: 2
  },
  {
    id: 33,
    question: "What type of lock should be used for safe isolation?",
    options: [
      "Any padlock",
      "A unique key lock personal to the worker",
      "A combination lock",
      "A master key lock"
    ],
    correctAnswer: 1,
    explanation: "A unique key lock personal to the worker should be used so only they can remove it.",
    module: 2
  },
  {
    id: 34,
    question: "When should an isolation be tested?",
    options: [
      "Only at the beginning of work",
      "At the beginning and at intervals during work",
      "Only at the end of work",
      "Never, if properly locked off"
    ],
    correctAnswer: 1,
    explanation: "Isolation should be tested at the beginning and at reasonable intervals during work, especially after breaks.",
    module: 2
  },
  {
    id: 35,
    question: "What is a 'safe working area'?",
    options: [
      "Any area away from electricity",
      "An area made safe from electrical and other hazards during work",
      "An office area",
      "A designated break room"
    ],
    correctAnswer: 1,
    explanation: "A safe working area is an area made safe from electrical hazards and other dangers during work activities.",
    module: 2
  },
  {
    id: 36,
    question: "What should you check regarding backup supplies before isolation?",
    options: [
      "Backup supplies can be ignored",
      "Whether generators, UPS, or other backup supplies feed the circuit",
      "Only mains supply matters",
      "Backup supplies automatically disconnect"
    ],
    correctAnswer: 1,
    explanation: "All sources of supply including generators, UPS systems, and emergency supplies must be identified and isolated.",
    module: 2
  },
  {
    id: 37,
    question: "What is the purpose of using barriers during isolation?",
    options: [
      "To keep the work area tidy",
      "To prevent unauthorised access to the work area",
      "To store tools",
      "To display certificates"
    ],
    correctAnswer: 1,
    explanation: "Barriers prevent unauthorised persons from entering the work area and potentially being harmed or restoring supply.",
    module: 2
  },
  {
    id: 38,
    question: "What action should be taken if someone else's lock is on an isolator you need to use?",
    options: [
      "Cut the lock off",
      "Find the person and discuss coordination",
      "Work anyway as it's already isolated",
      "Use bolt cutters"
    ],
    correctAnswer: 1,
    explanation: "Never remove someone else's lock. Find the person to coordinate safe working arrangements.",
    module: 2
  },
  {
    id: 39,
    question: "What is 'dead working'?",
    options: [
      "Working on night shift",
      "Working on de-energised equipment",
      "Working in dangerous conditions",
      "Working underground"
    ],
    correctAnswer: 1,
    explanation: "Dead working means working on electrical equipment that has been properly isolated and proved dead.",
    module: 2
  },
  {
    id: 40,
    question: "When is live working permitted?",
    options: [
      "Never",
      "When convenient",
      "Only when dead working is unreasonable and suitable precautions are taken",
      "Always, with care"
    ],
    correctAnswer: 2,
    explanation: "Live working is only permitted when dead working is unreasonable and adequate precautions are in place.",
    module: 2
  },
  {
    id: 41,
    question: "What voltage level requires formal safe isolation procedures?",
    options: [
      "Above 1000V only",
      "Above 230V only",
      "Any voltage that could cause injury",
      "Above 50V AC only"
    ],
    correctAnswer: 2,
    explanation: "Safe isolation procedures should be used for any voltage that could cause injury, typically above 50V AC.",
    module: 2
  },
  {
    id: 42,
    question: "What is a permit to work system used for?",
    options: [
      "To speed up work",
      "To formally control high-risk work activities",
      "To avoid paperwork",
      "To allow anyone to work on electrical systems"
    ],
    correctAnswer: 1,
    explanation: "A permit to work is a formal system to control high-risk work, ensuring proper isolation and safety measures.",
    module: 2
  },
  {
    id: 43,
    question: "What should be done with stored energy after isolation?",
    options: [
      "Leave it to dissipate naturally",
      "Discharge capacitors and release mechanical energy safely",
      "Ignore it",
      "Wait 24 hours"
    ],
    correctAnswer: 1,
    explanation: "Stored energy in capacitors and mechanical systems must be safely discharged before work begins.",
    module: 2
  },
  {
    id: 44,
    question: "What is the recommended minimum CAT rating for test equipment used on LV installations?",
    options: [
      "CAT I",
      "CAT II",
      "CAT III",
      "CAT IV"
    ],
    correctAnswer: 2,
    explanation: "CAT III rated equipment should be used for LV distribution installations; CAT IV for origin of supply.",
    module: 2
  },
  {
    id: 45,
    question: "What should you do if there are multiple sources of supply?",
    options: [
      "Isolate only the main supply",
      "Isolate and lock off all sources of supply",
      "Isolate alternating sources",
      "Only the largest supply needs isolation"
    ],
    correctAnswer: 1,
    explanation: "All sources of supply must be identified, isolated, and locked off before work begins.",
    module: 2
  },
  {
    id: 46,
    question: "Why should non-contact voltage detectors not be solely relied upon?",
    options: [
      "They are too accurate",
      "They may give false readings and cannot verify absence of voltage",
      "They are too expensive",
      "They take too long to use"
    ],
    correctAnswer: 1,
    explanation: "Non-contact detectors may give false readings and cannot definitively verify absence of voltage. Always confirm with an AVI.",
    module: 2
  },
  {
    id: 47,
    question: "What should test leads comply with?",
    options: [
      "Any industrial standard",
      "GS38 requirements",
      "Manufacturer preferences only",
      "No specific requirements"
    ],
    correctAnswer: 1,
    explanation: "Test leads should comply with GS38 requirements including finger guards, shrouded probes, and fused leads.",
    module: 2
  },
  {
    id: 48,
    question: "When working near exposed live conductors, what minimum distance should be maintained?",
    options: [
      "No specific distance",
      "As close as needed",
      "A safe distance where accidental contact is not possible",
      "1 meter minimum"
    ],
    correctAnswer: 2,
    explanation: "A safe distance must be maintained where accidental contact with live parts is not possible.",
    module: 2
  },
  {
    id: 49,
    question: "What is the purpose of an isolation certificate?",
    options: [
      "To prove competence",
      "To formally record that equipment has been isolated and is safe to work on",
      "To invoice for work",
      "To record test results"
    ],
    correctAnswer: 1,
    explanation: "An isolation certificate formally records that equipment has been isolated and is safe to work on.",
    module: 2
  },
  {
    id: 50,
    question: "What should be verified before starting work after isolation?",
    options: [
      "Just that the isolator is off",
      "That all points of isolation are secure and the circuit is dead",
      "That someone else has checked it",
      "That the time is convenient"
    ],
    correctAnswer: 1,
    explanation: "Verify all isolation points are secure and prove the circuit is dead before starting any work.",
    module: 2
  },
  // MODULE 3: Continuity Testing (Questions 51-88)
  {
    id: 51,
    question: "What is the purpose of a protective conductor continuity test?",
    options: [
      "To measure cable length",
      "To verify the integrity of the protective conductor",
      "To test insulation",
      "To check voltage"
    ],
    correctAnswer: 1,
    explanation: "Protective conductor continuity testing verifies that the protective conductor provides a continuous low resistance path.",
    module: 3
  },
  {
    id: 52,
    question: "What is the maximum permissible resistance for the R1+R2 measurement on a ring final circuit?",
    options: [
      "There is no maximum",
      "The calculated design value",
      "1 ohm",
      "0.5 ohm"
    ],
    correctAnswer: 1,
    explanation: "R1+R2 should not exceed the calculated design value based on cable length and CSA.",
    module: 3
  },
  {
    id: 53,
    question: "What test current is typically used for continuity testing?",
    options: [
      "At least 200mA",
      "Less than 10mA",
      "Exactly 1A",
      "Any current"
    ],
    correctAnswer: 0,
    explanation: "Continuity testing should use a test current of at least 200mA to ensure good contact and accurate readings.",
    module: 3
  },
  {
    id: 54,
    question: "What is the purpose of the ring final circuit test?",
    options: [
      "To test socket outlets only",
      "To verify continuity and identify breaks or interconnections in the ring",
      "To measure voltage",
      "To test RCDs"
    ],
    correctAnswer: 1,
    explanation: "Ring final circuit testing verifies continuity of all conductors and identifies breaks or interconnections.",
    module: 3
  },
  {
    id: 55,
    question: "In a correctly wired ring circuit, what should be the relationship between end-to-end readings of L, N, and CPC?",
    options: [
      "All should be identical",
      "L and N should be similar, CPC may differ if different CSA",
      "CPC should always be highest",
      "L should be lowest"
    ],
    correctAnswer: 1,
    explanation: "L and N readings should be similar (same CSA), while CPC may differ if it has a different cross-sectional area.",
    module: 3
  },
  {
    id: 56,
    question: "After cross-connecting conductors at the consumer unit, what reading should be obtained at each socket?",
    options: [
      "Zero ohms",
      "Infinity",
      "Approximately 25% of the end-to-end reading",
      "Approximately 50% of the end-to-end reading"
    ],
    correctAnswer: 2,
    explanation: "After cross-connection, readings at each socket should be approximately 25% of the end-to-end reading.",
    module: 3
  },
  {
    id: 57,
    question: "What indicates a break in a ring final circuit?",
    options: [
      "All readings are the same",
      "Readings increase progressively around the ring then drop",
      "No readings are possible",
      "Readings are all very low"
    ],
    correctAnswer: 1,
    explanation: "A break causes readings to increase progressively up to the break point, then suddenly drop on the other side.",
    module: 3
  },
  {
    id: 58,
    question: "What is the purpose of testing main bonding conductor continuity?",
    options: [
      "To measure cable length",
      "To verify low resistance connection between MET and extraneous-conductive-parts",
      "To test insulation",
      "To verify phase sequence"
    ],
    correctAnswer: 1,
    explanation: "Main bonding continuity testing verifies a low resistance connection between the MET and extraneous-conductive-parts.",
    module: 3
  },
  {
    id: 59,
    question: "What is the typical maximum acceptable resistance for main bonding conductors?",
    options: [
      "10 ohms",
      "1 ohm",
      "0.05 ohms or less",
      "5 ohms"
    ],
    correctAnswer: 2,
    explanation: "Main bonding conductors should have very low resistance, typically 0.05 ohms or less.",
    module: 3
  },
  {
    id: 60,
    question: "What does R1 represent in R1+R2?",
    options: [
      "The resistance of the neutral conductor",
      "The resistance of the phase conductor",
      "The resistance of the earth conductor",
      "The total circuit resistance"
    ],
    correctAnswer: 1,
    explanation: "R1 represents the resistance of the phase conductor from the origin to the point of measurement.",
    module: 3
  },
  {
    id: 61,
    question: "What does R2 represent in R1+R2?",
    options: [
      "The resistance of the neutral conductor",
      "The resistance of the phase conductor",
      "The resistance of the circuit protective conductor",
      "The total circuit resistance"
    ],
    correctAnswer: 2,
    explanation: "R2 represents the resistance of the circuit protective conductor (CPC) from the point to the origin.",
    module: 3
  },
  {
    id: 62,
    question: "Why should test lead resistance be measured and subtracted from readings?",
    options: [
      "To make readings easier to record",
      "To ensure accurate results not affected by lead resistance",
      "To test the instrument",
      "It's optional"
    ],
    correctAnswer: 1,
    explanation: "Test lead resistance must be measured and nulled or subtracted to ensure accurate circuit readings.",
    module: 3
  },
  {
    id: 63,
    question: "What is the 'wandering lead' method used for?",
    options: [
      "Testing insulation resistance",
      "Testing continuity of protective conductors at multiple points",
      "Measuring voltage",
      "Testing RCDs"
    ],
    correctAnswer: 1,
    explanation: "The wandering lead method uses a long lead to test protective conductor continuity at multiple points from one location.",
    module: 3
  },
  {
    id: 64,
    question: "What might cause an unexpectedly high R1+R2 reading?",
    options: [
      "Good connections",
      "Short cable run",
      "Poor connections, damaged conductors, or incorrect cable",
      "New installation"
    ],
    correctAnswer: 2,
    explanation: "High readings may indicate poor connections, damaged conductors, or incorrect cable size/type.",
    module: 3
  },
  {
    id: 65,
    question: "How should continuity of supplementary bonding be tested?",
    options: [
      "With a voltage tester",
      "With a low resistance ohmmeter between simultaneously accessible parts",
      "With an insulation tester",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding continuity is tested with a low resistance ohmmeter between simultaneously accessible parts.",
    module: 3
  },
  {
    id: 66,
    question: "What is the purpose of testing the continuity of radial circuits?",
    options: [
      "To verify ring configuration",
      "To verify protective conductor continuity from origin to each point",
      "To test socket outlets",
      "To measure cable length"
    ],
    correctAnswer: 1,
    explanation: "Radial circuit continuity testing verifies the protective conductor path from origin to each point served.",
    module: 3
  },
  {
    id: 67,
    question: "What should be done if a ring circuit shows significantly different readings on one leg?",
    options: [
      "Accept it as normal",
      "Investigate for possible interconnection, spur, or different cable",
      "Ignore it if the circuit works",
      "Only check if there are faults"
    ],
    correctAnswer: 1,
    explanation: "Significantly different readings on one leg indicate possible interconnection, spurs, or different cable types.",
    module: 3
  },
  {
    id: 68,
    question: "What is the standard test voltage for continuity testing?",
    options: [
      "230V AC",
      "500V DC",
      "4-24V DC typically",
      "1000V DC"
    ],
    correctAnswer: 2,
    explanation: "Continuity testing typically uses a low DC voltage between 4-24V.",
    module: 3
  },
  {
    id: 69,
    question: "When testing a ring circuit, if L-N end-to-end is 0.8Ω and L-CPC is 1.2Ω, what does this indicate?",
    options: [
      "A fault in the ring",
      "The CPC has a smaller CSA than the live conductors",
      "A break in the neutral",
      "Normal readings only"
    ],
    correctAnswer: 1,
    explanation: "Higher L-CPC reading indicates the CPC has a smaller cross-sectional area (higher resistance per metre).",
    module: 3
  },
  {
    id: 70,
    question: "What should be checked if continuity readings are inconsistent?",
    options: [
      "The weather",
      "Test lead connections and instrument battery",
      "The circuit breaker",
      "The voltage"
    ],
    correctAnswer: 1,
    explanation: "Inconsistent readings may be caused by poor test lead connections or low instrument battery.",
    module: 3
  },
  {
    id: 71,
    question: "How can you identify which socket is at the electrical midpoint of a ring?",
    options: [
      "It's always the middle physical socket",
      "It shows the highest reading during cross-connected test",
      "It shows the lowest reading during cross-connected test",
      "It's marked by the installer"
    ],
    correctAnswer: 1,
    explanation: "The electrical midpoint shows the highest reading during the cross-connected test (approximately 25% of end-to-end).",
    module: 3
  },
  {
    id: 72,
    question: "What does a reading of 0.00Ω on a continuity test typically indicate?",
    options: [
      "A perfect circuit",
      "Possible short circuit or test leads touching",
      "Good installation",
      "Normal operation"
    ],
    correctAnswer: 1,
    explanation: "A 0.00Ω reading often indicates test leads touching or a short circuit, as all conductors have some resistance.",
    module: 3
  },
  // MODULE 4: Insulation Resistance Testing (Questions 73-110)
  {
    id: 73,
    question: "What is the standard test voltage for insulation resistance testing on a 230V circuit?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "230V AC"
    ],
    correctAnswer: 1,
    explanation: "500V DC is the standard test voltage for insulation resistance testing on circuits up to and including 500V.",
    module: 4
  },
  {
    id: 74,
    question: "What is the minimum acceptable insulation resistance for a 230V installation?",
    options: [
      "0.5 MΩ",
      "1.0 MΩ",
      "2.0 MΩ",
      "0.1 MΩ"
    ],
    correctAnswer: 1,
    explanation: "The minimum acceptable insulation resistance for a 230V installation is 1.0 MΩ (1 megohm).",
    module: 4
  },
  {
    id: 75,
    question: "What should be done with electronic equipment before insulation resistance testing?",
    options: [
      "Leave it connected",
      "Disconnect or bypass it to prevent damage",
      "Test it first",
      "Increase test voltage"
    ],
    correctAnswer: 1,
    explanation: "Electronic equipment must be disconnected or bypassed as the 500V test voltage can damage sensitive components.",
    module: 4
  },
  {
    id: 76,
    question: "What does insulation resistance testing verify?",
    options: [
      "Conductor continuity",
      "The quality of insulation between conductors and earth",
      "Cable length",
      "Phase sequence"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testing verifies the quality of insulation between live conductors and between live conductors and earth.",
    module: 4
  },
  {
    id: 77,
    question: "What should the minimum insulation resistance be for SELV circuits?",
    options: [
      "0.25 MΩ",
      "0.5 MΩ",
      "1.0 MΩ",
      "2.0 MΩ"
    ],
    correctAnswer: 0,
    explanation: "SELV and PELV circuits with voltage not exceeding 50V AC have a minimum insulation resistance of 0.25 MΩ.",
    module: 4
  },
  {
    id: 78,
    question: "Which two tests are performed during insulation resistance testing?",
    options: [
      "Continuity and voltage",
      "Live to earth and live to neutral",
      "Polarity and RCD",
      "Loop impedance and Zs"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance is tested between live conductors (L-N) and between live conductors and earth.",
    module: 4
  },
  {
    id: 79,
    question: "Why should all switches be in the 'on' position during insulation testing?",
    options: [
      "To protect equipment",
      "To test all insulation and wiring in the circuit",
      "To speed up testing",
      "To save battery"
    ],
    correctAnswer: 1,
    explanation: "Switches in the 'on' position ensures all wiring and insulation in the circuit is included in the test.",
    module: 4
  },
  {
    id: 80,
    question: "What could cause a low insulation resistance reading?",
    options: [
      "New wiring",
      "Moisture, damaged insulation, or contamination",
      "Correct installation",
      "Low ambient temperature"
    ],
    correctAnswer: 1,
    explanation: "Low insulation resistance can be caused by moisture ingress, damaged insulation, or contamination.",
    module: 4
  },
  {
    id: 81,
    question: "What is the test voltage for circuits rated above 500V up to 1000V?",
    options: [
      "500V DC",
      "1000V DC",
      "250V DC",
      "2500V DC"
    ],
    correctAnswer: 1,
    explanation: "Circuits rated above 500V up to and including 1000V should be tested at 1000V DC.",
    module: 4
  },
  {
    id: 82,
    question: "What precautions should be taken after insulation resistance testing?",
    options: [
      "None required",
      "Allow capacitive discharge before touching conductors",
      "Immediately reconnect everything",
      "Test again with higher voltage"
    ],
    correctAnswer: 1,
    explanation: "Allow time for capacitive discharge after testing, as cables and equipment can retain charge.",
    module: 4
  },
  {
    id: 83,
    question: "What effect does cable length have on insulation resistance?",
    options: [
      "No effect",
      "Longer cables typically show lower insulation resistance",
      "Longer cables show higher resistance",
      "Only affects new cables"
    ],
    correctAnswer: 1,
    explanation: "Longer cables typically show lower insulation resistance due to the greater surface area of insulation being tested.",
    module: 4
  },
  {
    id: 84,
    question: "What should be done if insulation resistance is below the minimum acceptable value?",
    options: [
      "Accept it if the circuit works",
      "Investigate and rectify the cause before energising",
      "Increase the test voltage",
      "Test again later"
    ],
    correctAnswer: 1,
    explanation: "Low insulation resistance must be investigated and the cause rectified before the circuit can be energised.",
    module: 4
  },
  {
    id: 85,
    question: "What items should be disconnected before testing insulation resistance?",
    options: [
      "Nothing needs disconnecting",
      "Electronic equipment, capacitors, indicating devices, and surge protectors",
      "Only fuses",
      "Only circuit breakers"
    ],
    correctAnswer: 1,
    explanation: "Electronic equipment, capacitors, indicator lamps, and surge protectors should be disconnected before testing.",
    module: 4
  },
  {
    id: 86,
    question: "What is the minimum insulation resistance for circuits rated above 50V but not exceeding 500V?",
    options: [
      "0.5 MΩ",
      "1.0 MΩ",
      "2.0 MΩ",
      "0.25 MΩ"
    ],
    correctAnswer: 1,
    explanation: "Circuits rated above 50V but not exceeding 500V require minimum insulation resistance of 1.0 MΩ.",
    module: 4
  },
  {
    id: 87,
    question: "Why is DC voltage used for insulation resistance testing?",
    options: [
      "It's cheaper to generate",
      "DC provides a steady stress on insulation without capacitive current",
      "AC is not available",
      "DC is more dangerous"
    ],
    correctAnswer: 1,
    explanation: "DC voltage provides steady stress on insulation and avoids the capacitive current that would flow with AC.",
    module: 4
  },
  {
    id: 88,
    question: "What might cause an insulation resistance reading to gradually increase during testing?",
    options: [
      "A fault in the tester",
      "Absorption of current by the insulation (polarisation)",
      "Temperature changes",
      "Loose connections"
    ],
    correctAnswer: 1,
    explanation: "The insulation absorbs current initially (polarisation), causing resistance to gradually increase during testing.",
    module: 4
  },
  {
    id: 89,
    question: "What should be done with pilot lights during insulation resistance testing?",
    options: [
      "Leave them connected",
      "Remove or bypass them",
      "Switch them off only",
      "Test them separately first"
    ],
    correctAnswer: 1,
    explanation: "Pilot lights should be removed or bypassed as they provide a parallel path affecting readings.",
    module: 4
  },
  {
    id: 90,
    question: "When testing a complete installation, what is the likely reading if all circuits pass individually?",
    options: [
      "The sum of all individual readings",
      "Lower than individual readings due to parallel paths",
      "Exactly 1 MΩ",
      "Infinite"
    ],
    correctAnswer: 1,
    explanation: "When circuits are tested together, the parallel paths result in a lower combined reading than individual tests.",
    module: 4
  },
  {
    id: 91,
    question: "What effect does temperature have on insulation resistance readings?",
    options: [
      "No effect",
      "Higher temperatures typically result in lower readings",
      "Higher temperatures increase readings",
      "Only affects DC testing"
    ],
    correctAnswer: 1,
    explanation: "Higher temperatures typically result in lower insulation resistance readings.",
    module: 4
  },
  {
    id: 92,
    question: "What is a megohmmeter?",
    options: [
      "A device for measuring cable length",
      "An instrument for measuring insulation resistance in megohms",
      "A current measuring device",
      "A voltage detector"
    ],
    correctAnswer: 1,
    explanation: "A megohmmeter (megger) is an instrument specifically designed for measuring insulation resistance in megohms.",
    module: 4
  },
  {
    id: 93,
    question: "What should lamps be during L-E insulation resistance testing?",
    options: [
      "Switched on",
      "Removed from holders or switches left off",
      "Left as normal",
      "Replaced with LEDs"
    ],
    correctAnswer: 1,
    explanation: "Lamps should be removed or switches left off to prevent them affecting the L-E reading.",
    module: 4
  },
  {
    id: 94,
    question: "What is the purpose of testing L-N insulation resistance?",
    options: [
      "To find earth faults",
      "To verify insulation between live conductors",
      "To test continuity",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "L-N testing verifies insulation between live conductors, detecting any breakdown between phases.",
    module: 4
  },
  {
    id: 95,
    question: "If insulation resistance of a circuit is found to be 0.9 MΩ, what action is required?",
    options: [
      "Pass the circuit as acceptable",
      "Investigate the cause as it's below minimum",
      "Increase test voltage and retest",
      "Record and move on"
    ],
    correctAnswer: 1,
    explanation: "0.9 MΩ is below the minimum 1.0 MΩ requirement and must be investigated.",
    module: 4
  },
  // MODULE 5: Earth Fault Loop Impedance (Questions 96-133)
  {
    id: 96,
    question: "What does Zs represent?",
    options: [
      "The external earth fault loop impedance",
      "The total earth fault loop impedance at the furthest point",
      "The internal installation impedance",
      "The transformer impedance"
    ],
    correctAnswer: 1,
    explanation: "Zs represents the total earth fault loop impedance measured at the furthest point of a circuit.",
    module: 5
  },
  {
    id: 97,
    question: "What does Ze represent?",
    options: [
      "The circuit protective conductor resistance",
      "The external earth fault loop impedance",
      "The total earth fault loop impedance",
      "The phase conductor impedance"
    ],
    correctAnswer: 1,
    explanation: "Ze is the external earth fault loop impedance, measured at the origin of the installation.",
    module: 5
  },
  {
    id: 98,
    question: "What is the relationship between Zs, Ze, and R1+R2?",
    options: [
      "Zs = Ze - R1+R2",
      "Zs = Ze + R1+R2",
      "Zs = Ze x R1+R2",
      "Zs = Ze / R1+R2"
    ],
    correctAnswer: 1,
    explanation: "Zs = Ze + (R1+R2), where R1+R2 is the resistance of the circuit phase and CPC conductors.",
    module: 5
  },
  {
    id: 99,
    question: "Why is earth fault loop impedance testing important?",
    options: [
      "To verify voltage levels",
      "To ensure protective devices disconnect quickly enough under fault conditions",
      "To test insulation quality",
      "To measure power consumption"
    ],
    correctAnswer: 1,
    explanation: "Zs testing ensures the impedance is low enough for protective devices to disconnect within required times.",
    module: 5
  },
  {
    id: 100,
    question: "What is the maximum permitted Zs for a 32A Type B MCB on a TN system?",
    options: [
      "1.44Ω",
      "2.30Ω",
      "0.72Ω",
      "4.60Ω"
    ],
    correctAnswer: 0,
    explanation: "For a 32A Type B MCB, maximum Zs is 1.44Ω to ensure disconnection within 0.4 seconds.",
    module: 5
  },
  {
    id: 101,
    question: "What is the maximum disconnection time for a 230V TN system final circuit?",
    options: [
      "0.2 seconds",
      "0.4 seconds",
      "1 second",
      "5 seconds"
    ],
    correctAnswer: 1,
    explanation: "Final circuits on TN systems up to 32A require disconnection within 0.4 seconds.",
    module: 5
  },
  {
    id: 102,
    question: "What is the maximum disconnection time for distribution circuits on a TN system?",
    options: [
      "0.4 seconds",
      "1 second",
      "5 seconds",
      "10 seconds"
    ],
    correctAnswer: 2,
    explanation: "Distribution circuits on TN systems may have a disconnection time of up to 5 seconds.",
    module: 5
  },
  {
    id: 103,
    question: "What causes the difference between measured Zs and calculated Zs values?",
    options: [
      "Faulty test equipment",
      "Temperature - conductors are cooler when tested",
      "Incorrect calibration",
      "Time of day"
    ],
    correctAnswer: 1,
    explanation: "Measured Zs is typically lower than calculated because conductors are cooler during testing than at operating temperature.",
    module: 5
  },
  {
    id: 104,
    question: "What correction factor should be applied to measured Zs values?",
    options: [
      "Multiply by 0.8",
      "Multiply by 1.2 for thermoplastic, 1.04 for thermosetting",
      "No correction needed",
      "Divide by 2"
    ],
    correctAnswer: 1,
    explanation: "Apply a correction factor of 1.2 for thermoplastic cables or 1.04 for thermosetting to account for operating temperature.",
    module: 5
  },
  {
    id: 105,
    question: "What type of instrument is used to measure earth fault loop impedance?",
    options: [
      "Multimeter",
      "Loop impedance tester",
      "Insulation resistance tester",
      "Clamp meter"
    ],
    correctAnswer: 1,
    explanation: "A loop impedance tester is specifically designed to measure earth fault loop impedance.",
    module: 5
  },
  {
    id: 106,
    question: "What does a high Zs reading indicate?",
    options: [
      "Good installation",
      "Protective device may not operate quickly enough",
      "Low resistance earth path",
      "New installation"
    ],
    correctAnswer: 1,
    explanation: "High Zs indicates the protective device may not operate quickly enough to disconnect the supply safely.",
    module: 5
  },
  {
    id: 107,
    question: "What is the typical maximum Ze for a TN-C-S system?",
    options: [
      "0.8Ω",
      "0.35Ω",
      "21Ω",
      "1.0Ω"
    ],
    correctAnswer: 1,
    explanation: "The typical maximum Ze for a TN-C-S (PME) system is 0.35Ω.",
    module: 5
  },
  {
    id: 108,
    question: "What is the typical maximum Ze for a TN-S system?",
    options: [
      "0.35Ω",
      "0.8Ω",
      "21Ω",
      "1.44Ω"
    ],
    correctAnswer: 1,
    explanation: "The typical maximum Ze for a TN-S system is 0.8Ω.",
    module: 5
  },
  {
    id: 109,
    question: "What is the typical maximum Ze for a TT system?",
    options: [
      "0.35Ω",
      "0.8Ω",
      "21Ω",
      "200Ω"
    ],
    correctAnswer: 2,
    explanation: "The typical maximum Ze for a TT system is 21Ω, but RCDs are typically required.",
    module: 5
  },
  {
    id: 110,
    question: "How does a loop impedance tester work?",
    options: [
      "It measures voltage only",
      "It creates a brief high current and measures voltage drop",
      "It measures resistance directly",
      "It uses ultrasound"
    ],
    correctAnswer: 1,
    explanation: "Loop testers create a brief high current and measure the resulting voltage drop to calculate impedance.",
    module: 5
  },
  {
    id: 111,
    question: "Why might RCDs trip during loop impedance testing?",
    options: [
      "The tester is faulty",
      "The test current passes through earth causing imbalance",
      "The voltage is too high",
      "The RCD is faulty"
    ],
    correctAnswer: 1,
    explanation: "The test current passes through the earth path, creating an imbalance that can trip RCDs.",
    module: 5
  },
  {
    id: 112,
    question: "What is a 'no-trip' loop tester?",
    options: [
      "A tester that doesn't work",
      "A tester designed to test without tripping RCDs",
      "A tester for circuits without RCDs",
      "An outdated tester"
    ],
    correctAnswer: 1,
    explanation: "No-trip testers use lower test currents to measure Zs without tripping RCDs.",
    module: 5
  },
  {
    id: 113,
    question: "What is prospective fault current (PFC)?",
    options: [
      "Normal operating current",
      "The maximum current that could flow during a fault",
      "The current at which fuses blow",
      "The test current"
    ],
    correctAnswer: 1,
    explanation: "Prospective fault current is the maximum current that could flow during a short circuit or earth fault.",
    module: 5
  },
  {
    id: 114,
    question: "How is prospective fault current calculated?",
    options: [
      "PFC = Voltage x Impedance",
      "PFC = Voltage / Impedance",
      "PFC = Voltage + Impedance",
      "PFC = Voltage - Impedance"
    ],
    correctAnswer: 1,
    explanation: "PFC = Uo/Zs where Uo is nominal voltage and Zs is loop impedance (Ohm's law).",
    module: 5
  },
  {
    id: 115,
    question: "What must a protective device's breaking capacity exceed?",
    options: [
      "Normal operating current",
      "The prospective fault current at its location",
      "The circuit design current",
      "The cable rating"
    ],
    correctAnswer: 1,
    explanation: "A protective device's breaking capacity must exceed the prospective fault current at its installation point.",
    module: 5
  },
  // MODULE 6: RCD Testing (Questions 116-153)
  {
    id: 116,
    question: "What does RCD stand for?",
    options: [
      "Residual Circuit Detector",
      "Residual Current Device",
      "Remote Circuit Disconnector",
      "Rapid Current Detector"
    ],
    correctAnswer: 1,
    explanation: "RCD stands for Residual Current Device.",
    module: 6
  },
  {
    id: 117,
    question: "How does an RCD detect a fault?",
    options: [
      "By measuring voltage",
      "By detecting imbalance between live and neutral currents",
      "By measuring temperature",
      "By detecting overcurrent"
    ],
    correctAnswer: 1,
    explanation: "An RCD detects imbalance between the current flowing in the live and neutral conductors.",
    module: 6
  },
  {
    id: 118,
    question: "What is the maximum disconnection time for a 30mA RCD at rated residual current?",
    options: [
      "40ms",
      "200ms",
      "300ms",
      "1 second"
    ],
    correctAnswer: 2,
    explanation: "A general type RCD must disconnect within 300ms at its rated residual current (IΔn).",
    module: 6
  },
  {
    id: 119,
    question: "What is the maximum disconnection time for a 30mA RCD at 5 times rated residual current (150mA)?",
    options: [
      "40ms",
      "150ms",
      "300ms",
      "1 second"
    ],
    correctAnswer: 0,
    explanation: "At 5 times rated current, an RCD must disconnect within 40ms.",
    module: 6
  },
  {
    id: 120,
    question: "What current rating provides additional protection against electric shock?",
    options: [
      "100mA",
      "300mA",
      "30mA or less",
      "500mA"
    ],
    correctAnswer: 2,
    explanation: "RCDs rated 30mA or less provide additional protection against electric shock.",
    module: 6
  },
  {
    id: 121,
    question: "What is the purpose of RCD testing?",
    options: [
      "To verify the RCD trips within the required time",
      "To test cable insulation",
      "To measure loop impedance",
      "To check polarity"
    ],
    correctAnswer: 0,
    explanation: "RCD testing verifies the device trips within the required time at specific test currents.",
    module: 6
  },
  {
    id: 122,
    question: "At what percentage of rated residual current must an RCD NOT trip?",
    options: [
      "25%",
      "50%",
      "75%",
      "100%"
    ],
    correctAnswer: 1,
    explanation: "An RCD must not trip at 50% of its rated residual current (non-trip test).",
    module: 6
  },
  {
    id: 123,
    question: "What is a Type AC RCD designed to detect?",
    options: [
      "DC residual current only",
      "AC sinusoidal residual currents",
      "Pulsating DC only",
      "All types of residual current"
    ],
    correctAnswer: 1,
    explanation: "Type AC RCDs detect AC sinusoidal residual currents only.",
    module: 6
  },
  {
    id: 124,
    question: "What is a Type A RCD designed to detect?",
    options: [
      "AC sinusoidal only",
      "AC sinusoidal and pulsating DC residual currents",
      "Smooth DC only",
      "High frequency currents only"
    ],
    correctAnswer: 1,
    explanation: "Type A RCDs detect AC sinusoidal and pulsating DC residual currents.",
    module: 6
  },
  {
    id: 125,
    question: "What type of RCD should be used with EV chargers?",
    options: [
      "Type AC",
      "Type A or Type B",
      "Any type",
      "Type AC is sufficient"
    ],
    correctAnswer: 1,
    explanation: "EV chargers typically require Type A or Type B RCDs due to DC components in the charging current.",
    module: 6
  },
  {
    id: 126,
    question: "What is the test button on an RCD used for?",
    options: [
      "To replace proper testing",
      "For user functional testing between proper inspections",
      "To reset the RCD",
      "For installation testing only"
    ],
    correctAnswer: 1,
    explanation: "The test button allows users to functionally test the RCD between proper inspections; it tests the mechanism, not trip time.",
    module: 6
  },
  {
    id: 127,
    question: "Why is an instrument test preferred over the test button?",
    options: [
      "It's cheaper",
      "It measures actual trip time and current, not just mechanism function",
      "It's faster",
      "It doesn't trip the RCD"
    ],
    correctAnswer: 1,
    explanation: "Instrument testing measures actual trip time at specific currents; the test button only verifies mechanism function.",
    module: 6
  },
  {
    id: 128,
    question: "What is an RCBO?",
    options: [
      "A type of cable",
      "A combined RCD and circuit breaker in one device",
      "A testing instrument",
      "A type of earthing arrangement"
    ],
    correctAnswer: 1,
    explanation: "An RCBO combines the functions of an RCD and an MCB in a single device.",
    module: 6
  },
  {
    id: 129,
    question: "What is the advantage of using RCBOs over a single RCD?",
    options: [
      "Lower cost",
      "Individual circuit protection - one fault doesn't affect other circuits",
      "Faster installation",
      "Less space required"
    ],
    correctAnswer: 1,
    explanation: "RCBOs provide individual circuit protection, so a fault on one circuit doesn't trip other circuits.",
    module: 6
  },
  {
    id: 130,
    question: "What is an S-type or time-delayed RCD used for?",
    options: [
      "Faster protection",
      "To provide discrimination with downstream RCDs",
      "Higher current circuits only",
      "Outdoor use only"
    ],
    correctAnswer: 1,
    explanation: "S-type (selective/time-delayed) RCDs allow discrimination with downstream RCDs.",
    module: 6
  },
  {
    id: 131,
    question: "What is the minimum delay time for an S-type RCD at rated residual current?",
    options: [
      "10ms",
      "40ms",
      "130ms",
      "300ms"
    ],
    correctAnswer: 2,
    explanation: "S-type RCDs have a minimum delay of 130ms at rated residual current to allow downstream RCDs to operate first.",
    module: 6
  },
  {
    id: 132,
    question: "What causes nuisance tripping of RCDs?",
    options: [
      "Too many circuits",
      "Cumulative earth leakage from multiple circuits or equipment",
      "Incorrect cable size",
      "High voltage"
    ],
    correctAnswer: 1,
    explanation: "Nuisance tripping is often caused by cumulative earth leakage current from multiple circuits or equipment.",
    module: 6
  },
  {
    id: 133,
    question: "What is the maximum permissible standing earth leakage for a circuit protected by a 30mA RCD?",
    options: [
      "30mA",
      "15mA",
      "10mA (one-third of rating)",
      "5mA"
    ],
    correctAnswer: 2,
    explanation: "Standing leakage should not exceed one-third of the RCD rating to avoid nuisance tripping.",
    module: 6
  },
  {
    id: 134,
    question: "How should an RCD tester be connected?",
    options: [
      "Line to earth only",
      "Between line, neutral and earth at the point of test",
      "Between line and neutral only",
      "To the RCD terminals directly"
    ],
    correctAnswer: 1,
    explanation: "RCD testers connect between line, neutral and earth at a socket or other test point.",
    module: 6
  },
  {
    id: 135,
    question: "What should be done if an RCD fails to trip during testing?",
    options: [
      "Test again later",
      "Replace the RCD immediately",
      "Check connections first, then replace if still faulty",
      "Ignore if circuit works normally"
    ],
    correctAnswer: 2,
    explanation: "Check connections and wiring first; if still faulty, the RCD must be replaced.",
    module: 6
  },
  // MODULE 7: Polarity and Functional Testing (Questions 136-173)
  {
    id: 136,
    question: "What is polarity testing?",
    options: [
      "Testing for magnetic fields",
      "Verifying correct connection of phase, neutral and earth conductors",
      "Testing battery condition",
      "Measuring voltage levels"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing verifies that phase, neutral and earth conductors are correctly connected throughout the installation.",
    module: 7
  },
  {
    id: 137,
    question: "Why is correct polarity important for single-pole switches?",
    options: [
      "For aesthetic reasons",
      "To ensure the switch breaks the phase conductor",
      "To reduce cable length",
      "For easier identification"
    ],
    correctAnswer: 1,
    explanation: "Single-pole switches must be in the phase conductor to isolate the load when switched off.",
    module: 7
  },
  {
    id: 138,
    question: "What could happen if polarity is reversed at a socket outlet?",
    options: [
      "Nothing, it will work normally",
      "Risk of shock when maintaining equipment that appears off",
      "The socket won't work",
      "Higher electricity bills"
    ],
    correctAnswer: 1,
    explanation: "Reversed polarity means the neutral is switched, leaving equipment live even when switched off.",
    module: 7
  },
  {
    id: 139,
    question: "How is polarity tested during dead testing?",
    options: [
      "Using a voltage tester",
      "Using a continuity tester between specific conductors",
      "By visual inspection only",
      "Using an RCD tester"
    ],
    correctAnswer: 1,
    explanation: "During dead testing, continuity tests between specific conductors verify correct polarity.",
    module: 7
  },
  {
    id: 140,
    question: "Where should the centre contact of an Edison screw lampholder be connected?",
    options: [
      "To neutral",
      "To earth",
      "To the phase (line) conductor",
      "Either conductor is acceptable"
    ],
    correctAnswer: 2,
    explanation: "The centre contact must be connected to phase for safety, as it's less accessible than the outer contact.",
    module: 7
  },
  {
    id: 141,
    question: "What is a functional test?",
    options: [
      "A dead test only",
      "A test to verify equipment operates as intended when energised",
      "A continuity test",
      "An insulation test"
    ],
    correctAnswer: 1,
    explanation: "Functional testing verifies that equipment and systems operate correctly when energised.",
    module: 7
  },
  {
    id: 142,
    question: "What should be functionally tested on a lighting circuit?",
    options: [
      "Just that lights come on",
      "Switching, dimming (if applicable), and correct operation of controls",
      "Cable colour only",
      "Socket outlets"
    ],
    correctAnswer: 1,
    explanation: "Functional testing includes verifying switches operate correctly, dimmers function, and controls work as intended.",
    module: 7
  },
  {
    id: 143,
    question: "What is the purpose of testing interlocks?",
    options: [
      "To verify door security",
      "To confirm safety interlocks prevent dangerous situations",
      "To test padlocks",
      "To verify continuity"
    ],
    correctAnswer: 1,
    explanation: "Interlock testing confirms safety devices prevent operation under dangerous conditions.",
    module: 7
  },
  {
    id: 144,
    question: "What should be verified when testing a switched fused connection unit?",
    options: [
      "Only that power flows",
      "Correct polarity, fuse rating, and that the switch breaks the phase",
      "Cable colour only",
      "Just the fuse size"
    ],
    correctAnswer: 1,
    explanation: "Check correct polarity, appropriate fuse rating, and that the switch is in the phase conductor.",
    module: 7
  },
  {
    id: 145,
    question: "How is polarity verified in a live installation?",
    options: [
      "Using an ohmmeter",
      "Using a voltage indicator or socket tester",
      "By smell",
      "Using an insulation tester"
    ],
    correctAnswer: 1,
    explanation: "A voltage indicator or socket tester can verify polarity in an energised installation.",
    module: 7
  },
  {
    id: 146,
    question: "What does a socket tester indicate about polarity?",
    options: [
      "Detailed measurements",
      "Whether phase, neutral and earth are correctly connected using LED indicators",
      "The voltage level",
      "Current flow"
    ],
    correctAnswer: 1,
    explanation: "Socket testers use LEDs to indicate correct or incorrect polarity and earth connection.",
    module: 7
  },
  {
    id: 147,
    question: "Why should polarity be verified at the origin of the installation?",
    options: [
      "It's not necessary",
      "To confirm the supply has correct phase and neutral identification",
      "To measure voltage",
      "To test the meter"
    ],
    correctAnswer: 1,
    explanation: "Verifying polarity at the origin ensures the incoming supply is correctly identified.",
    module: 7
  },
  {
    id: 148,
    question: "What is checked during functional testing of an isolator?",
    options: [
      "Just that it switches",
      "That it isolates all poles and auxiliary contacts operate correctly",
      "Cable size only",
      "Earth connection"
    ],
    correctAnswer: 1,
    explanation: "Verify the isolator disconnects all intended poles and any auxiliary contacts function correctly.",
    module: 7
  },
  {
    id: 149,
    question: "What must be verified for a correctly wired 13A socket outlet?",
    options: [
      "Only that appliances work",
      "Earth is top, neutral left, phase right when viewed face-on",
      "Any configuration is acceptable",
      "Just the earth connection"
    ],
    correctAnswer: 1,
    explanation: "Correct polarity is earth at top, neutral on left, line on right when viewing the socket face-on.",
    module: 7
  },
  {
    id: 150,
    question: "What should be tested on emergency lighting systems?",
    options: [
      "Just that lights work on mains",
      "Changeover to battery, duration under load, and charging",
      "Colour of lights only",
      "Switch operation"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting must be tested for changeover operation, battery duration, and proper charging.",
    module: 7
  },
  {
    id: 151,
    question: "What is the purpose of phase rotation testing?",
    options: [
      "To check single phase supplies",
      "To verify correct phase sequence in three-phase installations",
      "To measure frequency",
      "To test earth connection"
    ],
    correctAnswer: 1,
    explanation: "Phase rotation testing verifies the correct sequence of phases in three-phase installations.",
    module: 7
  },
  {
    id: 152,
    question: "Why is correct phase rotation important for motors?",
    options: [
      "It doesn't matter for motors",
      "Incorrect rotation causes motors to run backwards",
      "It affects motor colour",
      "It changes motor speed"
    ],
    correctAnswer: 1,
    explanation: "Incorrect phase rotation causes three-phase motors to run in the opposite direction.",
    module: 7
  },
  {
    id: 153,
    question: "What instrument is used to check phase rotation?",
    options: [
      "Multimeter",
      "Phase rotation indicator or meter",
      "Insulation tester",
      "RCD tester"
    ],
    correctAnswer: 1,
    explanation: "A phase rotation indicator or meter is used to check the sequence of phases.",
    module: 7
  },
  {
    id: 154,
    question: "What should be verified when testing a cooker control unit?",
    options: [
      "Colour only",
      "Correct polarity, switch in phase conductor, and socket polarity if fitted",
      "Just that it gets hot",
      "Cable size"
    ],
    correctAnswer: 1,
    explanation: "Verify correct polarity, switch in phase conductor, and if a socket is fitted, its polarity too.",
    module: 7
  },
  {
    id: 155,
    question: "What does functional testing of fire alarm interfaces include?",
    options: [
      "Just checking detector operation",
      "Verifying cause and effect relationships with other systems",
      "Painting detection equipment",
      "Measuring cable resistance"
    ],
    correctAnswer: 1,
    explanation: "Testing fire alarm interfaces includes verifying cause and effect with linked systems like door holders and fans.",
    module: 7
  },
  // MODULE 8: Visual Inspection & Documentation (Questions 156-193)
  {
    id: 156,
    question: "When should visual inspection be carried out?",
    options: [
      "Only after testing",
      "Before testing, with the installation isolated",
      "Only during energised conditions",
      "At any convenient time"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection should be carried out before testing, with the installation safely isolated.",
    module: 8
  },
  {
    id: 157,
    question: "What does visual inspection verify?",
    options: [
      "Test results only",
      "Compliance with standards, correct installation, and absence of damage",
      "Cable lengths",
      "Energy efficiency"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection verifies compliance with standards, correct installation methods, and absence of visible damage.",
    module: 8
  },
  {
    id: 158,
    question: "What should be checked regarding cable selection during visual inspection?",
    options: [
      "Colour preferences",
      "Correct type, current-carrying capacity, and suitability for the environment",
      "Cost",
      "Manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Check cables are correct type for the application, have adequate current-carrying capacity, and suit the environment.",
    module: 8
  },
  {
    id: 159,
    question: "What is checked regarding connection of conductors?",
    options: [
      "Just that cables are present",
      "Correct termination, tightness, and protection of connections",
      "Cable colour",
      "Cable cost"
    ],
    correctAnswer: 1,
    explanation: "Check conductors are correctly terminated, connections are tight, and terminations are protected.",
    module: 8
  },
  {
    id: 160,
    question: "What identification should conductors have?",
    options: [
      "Any colour is acceptable",
      "Correct colour coding or marking as per BS 7671",
      "No identification needed",
      "Only earth needs marking"
    ],
    correctAnswer: 1,
    explanation: "Conductors must be correctly identified using standard colour coding or marking as required by BS 7671.",
    module: 8
  },
  {
    id: 161,
    question: "What protective measures should be verified during visual inspection?",
    options: [
      "Just fuse sizes",
      "Basic protection, fault protection, and additional protection",
      "Only earth bonding",
      "Cable clips"
    ],
    correctAnswer: 1,
    explanation: "Verify all protective measures including basic protection, fault protection, and additional protection methods.",
    module: 8
  },
  {
    id: 162,
    question: "What should be checked for consumer units and distribution boards?",
    options: [
      "Just the label",
      "Correct rating, secure fixing, circuit identification, and protection from damage",
      "Colour only",
      "Age of equipment"
    ],
    correctAnswer: 1,
    explanation: "Check ratings are adequate, fixing is secure, circuits are identified, and there's protection from damage.",
    module: 8
  },
  {
    id: 163,
    question: "What condition of accessories should be noted?",
    options: [
      "Only the colour",
      "Signs of damage, deterioration, overheating, or unsafe conditions",
      "Brand names",
      "Installation date"
    ],
    correctAnswer: 1,
    explanation: "Note any damage, signs of overheating, deterioration, or conditions that make accessories unsafe.",
    module: 8
  },
  {
    id: 164,
    question: "What is the purpose of circuit diagrams and schedules?",
    options: [
      "To decorate the consumer unit",
      "To provide clear information for future work and maintenance",
      "To satisfy building regulations only",
      "Optional documentation"
    ],
    correctAnswer: 1,
    explanation: "Circuit diagrams and schedules provide essential information for future work, maintenance, and fault finding.",
    module: 8
  },
  {
    id: 165,
    question: "What should be checked regarding basic protection (protection against direct contact)?",
    options: [
      "Only insulation colour",
      "Insulation, barriers, enclosures, and obstacles are adequate",
      "Cable length",
      "Manufacturer details"
    ],
    correctAnswer: 1,
    explanation: "Verify insulation, barriers, enclosures, and obstacles provide adequate protection against direct contact.",
    module: 8
  },
  {
    id: 166,
    question: "What IP rating information should be verified during visual inspection?",
    options: [
      "IP rating is not important",
      "Enclosure IP rating is suitable for the location and environment",
      "Only for bathrooms",
      "Only the first digit"
    ],
    correctAnswer: 1,
    explanation: "Verify enclosure IP rating is suitable for the location, considering water, dust, and impact protection needs.",
    module: 8
  },
  {
    id: 167,
    question: "What should be checked for cables passing through walls or floors?",
    options: [
      "Nothing special",
      "Protection against mechanical damage and fire stopping where required",
      "Just cable colour",
      "Only in commercial premises"
    ],
    correctAnswer: 1,
    explanation: "Check cables are protected against mechanical damage and fire stopping is provided where penetrating fire barriers.",
    module: 8
  },
  {
    id: 168,
    question: "What documentation should be available at the installation?",
    options: [
      "None required",
      "Previous certificates, circuit schedules, and instructions for operation",
      "Only the original invoice",
      "Just the user manual"
    ],
    correctAnswer: 1,
    explanation: "Previous certificates, up-to-date circuit schedules, and operating instructions should be available.",
    module: 8
  },
  {
    id: 169,
    question: "What must an EICR include?",
    options: [
      "Just a pass/fail statement",
      "Observations, classification codes, recommendations, and test results",
      "Only test results",
      "Only the inspector's name"
    ],
    correctAnswer: 1,
    explanation: "An EICR must include observations with classification codes, recommendations, and schedule of test results.",
    module: 8
  },
  {
    id: 170,
    question: "What does the term 'extent and limitations' refer to in an EICR?",
    options: [
      "The cost of the inspection",
      "The parts of the installation inspected and any areas not accessible",
      "The time spent",
      "The inspector's qualifications"
    ],
    correctAnswer: 1,
    explanation: "Extent and limitations describes what was inspected and any parts that couldn't be accessed or tested.",
    module: 8
  },
  {
    id: 171,
    question: "What Schedule is used to record test results on an EICR?",
    options: [
      "Schedule A",
      "Schedule of Inspections and Schedule of Test Results",
      "Schedule C",
      "Results Summary"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections and Schedule of Test Results record inspection items and test measurements.",
    module: 8
  },
  {
    id: 172,
    question: "Who should sign the EICR?",
    options: [
      "Anyone present",
      "The competent person who carried out the inspection and testing",
      "Only the building owner",
      "The electrician's employer only"
    ],
    correctAnswer: 1,
    explanation: "The competent person who carried out the inspection and testing must sign the EICR.",
    module: 8
  },
  {
    id: 173,
    question: "What is the recommended date for next inspection on an EICR?",
    options: [
      "Always 10 years",
      "Based on installation type, use, and condition found",
      "Always 5 years",
      "Not required"
    ],
    correctAnswer: 1,
    explanation: "The recommended date is based on installation type, use, environment, and condition found during inspection.",
    module: 8
  },
  {
    id: 174,
    question: "What should be done with old documentation when issuing a new EICR?",
    options: [
      "Destroy it",
      "Review it to understand the installation history",
      "Ignore it",
      "Return it to the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Previous documentation should be reviewed to understand installation history and previous issues.",
    module: 8
  },
  {
    id: 175,
    question: "How should sampling be recorded on an EICR?",
    options: [
      "Sampling doesn't need recording",
      "The extent and method of sampling must be clearly stated",
      "Just note 'sampled'",
      "Only if defects found"
    ],
    correctAnswer: 1,
    explanation: "Where sampling is used, the extent and method must be clearly stated in the limitations.",
    module: 8
  },
  // Additional Module 1 Questions (176-195)
  {
    id: 176,
    question: "What does the term 'competent person' mean in the context of inspection and testing?",
    options: [
      "Anyone who is an electrician",
      "A person with relevant knowledge, skills, and experience",
      "Only a certified inspector",
      "The building owner"
    ],
    correctAnswer: 1,
    explanation: "A competent person has the necessary knowledge, skills, and experience for the work being undertaken.",
    module: 1
  },
  {
    id: 177,
    question: "What is the recommended inspection interval for agricultural installations?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 1,
    explanation: "Agricultural installations typically require inspection every 3 years due to harsh environmental conditions.",
    module: 1
  },
  {
    id: 178,
    question: "What is the purpose of an Electrical Installation Certificate (EIC)?",
    options: [
      "To prove the electrician is qualified",
      "To certify that a new installation complies with BS 7671",
      "To record annual maintenance",
      "To provide insurance"
    ],
    correctAnswer: 1,
    explanation: "An EIC certifies that a new installation or addition has been designed, constructed, inspected, and tested in accordance with BS 7671.",
    module: 1
  },
  {
    id: 179,
    question: "When should a Minor Electrical Installation Works Certificate be issued?",
    options: [
      "For any electrical work",
      "For minor additions not involving a new circuit",
      "Only for new installations",
      "Only for testing"
    ],
    correctAnswer: 1,
    explanation: "A Minor Works Certificate is for additions to existing circuits that do not require an EIC.",
    module: 1
  },
  {
    id: 180,
    question: "What is Part P of the Building Regulations concerned with?",
    options: [
      "Structural safety",
      "Electrical safety in dwellings",
      "Fire alarms only",
      "Energy efficiency"
    ],
    correctAnswer: 1,
    explanation: "Part P of the Building Regulations covers electrical safety in dwellings in England.",
    module: 1
  },
  {
    id: 181,
    question: "What is the significance of the 18th Edition wiring regulations?",
    options: [
      "It's outdated",
      "It's the current edition of BS 7671 requirements",
      "It only applies to industrial premises",
      "It's voluntary guidance"
    ],
    correctAnswer: 1,
    explanation: "The 18th Edition is the current edition of BS 7671, setting requirements for electrical installations.",
    module: 1
  },
  {
    id: 182,
    question: "What role does the IET play in electrical standards?",
    options: [
      "Only training",
      "Publisher of the Wiring Regulations and supporting guidance",
      "Enforcement only",
      "Insurance provider"
    ],
    correctAnswer: 1,
    explanation: "The IET publishes BS 7671 and supporting guidance including Guidance Notes and On-Site Guide.",
    module: 1
  },
  // Additional Module 2 Questions (183-195)
  {
    id: 183,
    question: "What voltage is considered 'extra-low voltage' (ELV)?",
    options: [
      "Below 230V",
      "Not exceeding 50V AC or 120V DC",
      "Below 12V only",
      "Below 400V"
    ],
    correctAnswer: 1,
    explanation: "Extra-low voltage is defined as not exceeding 50V AC or 120V DC between conductors or to earth.",
    module: 2
  },
  {
    id: 184,
    question: "What is the purpose of an isolation procedure?",
    options: [
      "To save energy",
      "To prevent unexpected energisation during work",
      "To test equipment",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "Isolation procedures prevent unexpected energisation while work is being carried out.",
    module: 2
  },
  {
    id: 185,
    question: "What does 'proving dead' mean?",
    options: [
      "Checking the circuit is old",
      "Verifying the absence of voltage at the work location",
      "Testing insulation",
      "Checking continuity"
    ],
    correctAnswer: 1,
    explanation: "Proving dead means verifying the complete absence of dangerous voltage at the work location.",
    module: 2
  },
  {
    id: 186,
    question: "What should be done if a proving unit battery is low?",
    options: [
      "Use the tester anyway",
      "Replace the battery before testing",
      "Prove dead with a different method",
      "Skip the proving step"
    ],
    correctAnswer: 1,
    explanation: "The proving unit battery must be replaced to ensure reliable verification of the tester.",
    module: 2
  },
  {
    id: 187,
    question: "What is the danger of 'bridging out' an isolator?",
    options: [
      "It's a safe practice",
      "It bypasses the isolation, energising the circuit",
      "It only affects the neutral",
      "It saves time"
    ],
    correctAnswer: 1,
    explanation: "Bridging out bypasses the isolation completely, creating an extremely dangerous situation.",
    module: 2
  },
  {
    id: 188,
    question: "When should isolation be re-verified?",
    options: [
      "Only at the start of work",
      "After any interruption, break, or change of personnel",
      "Only at the end of work",
      "Never, if properly locked off"
    ],
    correctAnswer: 1,
    explanation: "Re-verify isolation after breaks, personnel changes, or any interruption to the work.",
    module: 2
  },
  {
    id: 189,
    question: "What PPE might be required for safe isolation?",
    options: [
      "None is required",
      "Insulated gloves, safety glasses, and appropriate clothing",
      "Only a hard hat",
      "Steel-toed boots only"
    ],
    correctAnswer: 1,
    explanation: "Appropriate PPE including insulated gloves and safety glasses may be required depending on the risk.",
    module: 2
  },
  {
    id: 190,
    question: "What should be done before isolating equipment that serves critical systems?",
    options: [
      "Just isolate it",
      "Coordinate with those responsible and establish safe alternative arrangements",
      "Ignore the critical systems",
      "Wait for the system to fail"
    ],
    correctAnswer: 1,
    explanation: "Coordinate with responsible parties and ensure safe alternative arrangements before isolating critical systems.",
    module: 2
  },
  // Additional Module 3 Questions (191-200)
  {
    id: 191,
    question: "What is the minimum test current for continuity testing as per BS 7671?",
    options: [
      "100mA",
      "200mA",
      "500mA",
      "1A"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 specifies a minimum test current of 200mA for continuity testing.",
    module: 3
  },
  {
    id: 192,
    question: "What might a reading of OL (overload) on a continuity tester indicate?",
    options: [
      "Good continuity",
      "An open circuit or break in the conductor",
      "Low resistance",
      "Normal operation"
    ],
    correctAnswer: 1,
    explanation: "OL indicates the resistance is too high to measure, suggesting an open circuit or break.",
    module: 3
  },
  {
    id: 193,
    question: "Why is it important to null test leads before continuity testing?",
    options: [
      "To charge the battery",
      "To subtract lead resistance from measurements",
      "To test the instrument",
      "It's not important"
    ],
    correctAnswer: 1,
    explanation: "Nulling test leads subtracts their resistance to ensure accurate circuit measurements.",
    module: 3
  },
  {
    id: 194,
    question: "What would cause variable readings during continuity testing?",
    options: [
      "Good connections",
      "Loose connections or oxidised terminals",
      "New cables",
      "Correct wiring"
    ],
    correctAnswer: 1,
    explanation: "Variable or fluctuating readings indicate loose connections, oxidised terminals, or poor contact.",
    module: 3
  },
  {
    id: 195,
    question: "How should the CPC of a ring circuit be tested?",
    options: [
      "Only at one end",
      "End-to-end and at each socket after cross-connection",
      "Visual inspection only",
      "With an RCD tester"
    ],
    correctAnswer: 1,
    explanation: "Test CPC end-to-end, then at each socket after cross-connection to verify complete ring continuity.",
    module: 3
  },
  {
    id: 196,
    question: "What is the typical resistance per metre of 2.5mm² copper conductor?",
    options: [
      "18.1mΩ/m",
      "7.41mΩ/m",
      "4.61mΩ/m",
      "1.83mΩ/m"
    ],
    correctAnswer: 1,
    explanation: "2.5mm² copper conductor has a resistance of approximately 7.41mΩ per metre at 20°C.",
    module: 3
  },
  {
    id: 197,
    question: "What is the typical resistance per metre of 1.5mm² copper conductor?",
    options: [
      "18.1mΩ/m",
      "12.1mΩ/m",
      "7.41mΩ/m",
      "4.61mΩ/m"
    ],
    correctAnswer: 1,
    explanation: "1.5mm² copper conductor has a resistance of approximately 12.1mΩ per metre at 20°C.",
    module: 3
  },
  {
    id: 198,
    question: "What is the purpose of measuring R1+R2 on a radial circuit?",
    options: [
      "To verify ring continuity",
      "To determine Zs when combined with Ze",
      "To test insulation",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "R1+R2 measurement allows calculation of Zs when combined with Ze: Zs = Ze + R1+R2.",
    module: 3
  },
  {
    id: 199,
    question: "What might cause different R1 and R2 readings on a radial circuit?",
    options: [
      "Normal operation",
      "Different conductor sizes for phase and CPC",
      "Correct installation",
      "New cables"
    ],
    correctAnswer: 1,
    explanation: "Different R1 and R2 readings typically indicate different cross-sectional areas for phase and CPC.",
    module: 3
  },
  {
    id: 200,
    question: "How is the resistance of a parallel ring calculated?",
    options: [
      "Add both values",
      "Divide the single conductor resistance by 4",
      "Multiply by 2",
      "Same as single conductor"
    ],
    correctAnswer: 1,
    explanation: "A correctly connected ring has resistance equal to one quarter of the single conductor end-to-end measurement.",
    module: 3
  },
  // Additional Module 4 Questions (201-225)
  {
    id: 201,
    question: "What test voltage should be used for SELV circuits not exceeding 25V AC?",
    options: [
      "500V DC",
      "250V DC",
      "1000V DC",
      "100V DC"
    ],
    correctAnswer: 1,
    explanation: "SELV circuits not exceeding 25V AC should be tested at 250V DC.",
    module: 4
  },
  {
    id: 202,
    question: "What effect does humidity have on insulation resistance?",
    options: [
      "No effect",
      "High humidity typically reduces insulation resistance",
      "Humidity increases resistance",
      "Only affects AC circuits"
    ],
    correctAnswer: 1,
    explanation: "High humidity can reduce insulation resistance due to moisture absorption by insulation materials.",
    module: 4
  },
  {
    id: 203,
    question: "Why should SPDs be disconnected before insulation testing?",
    options: [
      "They don't need disconnecting",
      "The test voltage could damage them or give false readings",
      "To save time",
      "For convenience only"
    ],
    correctAnswer: 1,
    explanation: "SPDs may conduct or be damaged at the 500V test voltage, and would give false low readings.",
    module: 4
  },
  {
    id: 204,
    question: "What is the purpose of testing insulation between phases on a three-phase system?",
    options: [
      "To find earth faults",
      "To verify insulation integrity between phase conductors",
      "To test continuity",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "Testing between phases verifies insulation integrity between phase conductors.",
    module: 4
  },
  {
    id: 205,
    question: "What should be done with neon indicators during insulation testing?",
    options: [
      "Leave them in circuit",
      "Disconnect or they will cause low readings",
      "Replace them",
      "Test them separately"
    ],
    correctAnswer: 1,
    explanation: "Neon indicators provide a parallel path and should be disconnected to avoid false low readings.",
    module: 4
  },
  {
    id: 206,
    question: "What is the minimum insulation resistance for a circuit rated above 500V?",
    options: [
      "0.5 MΩ",
      "1.0 MΩ",
      "2.0 MΩ",
      "5.0 MΩ"
    ],
    correctAnswer: 1,
    explanation: "Circuits rated above 500V up to 1000V require a minimum insulation resistance of 1.0 MΩ when tested at 1000V DC.",
    module: 4
  },
  {
    id: 207,
    question: "What does a steadily decreasing insulation resistance during testing suggest?",
    options: [
      "Good insulation",
      "Moisture present in the insulation",
      "Normal operation",
      "New installation"
    ],
    correctAnswer: 1,
    explanation: "Decreasing resistance during testing often indicates moisture present in the insulation.",
    module: 4
  },
  {
    id: 208,
    question: "Why might insulation resistance be tested circuit by circuit?",
    options: [
      "It's not necessary",
      "To identify exactly which circuit has a problem",
      "To save time",
      "It's never done"
    ],
    correctAnswer: 1,
    explanation: "Testing circuit by circuit allows identification of exactly which circuit has insulation problems.",
    module: 4
  },
  {
    id: 209,
    question: "What could a very high insulation resistance reading indicate?",
    options: [
      "A fault",
      "Good insulation or an open circuit",
      "Low resistance earth",
      "Moisture present"
    ],
    correctAnswer: 1,
    explanation: "Very high readings indicate good insulation, but check there isn't an open circuit preventing a true test.",
    module: 4
  },
  {
    id: 210,
    question: "What is the recommended minimum insulation resistance for a healthy installation?",
    options: [
      "Exactly 1 MΩ",
      "At least 2 MΩ per circuit, ideally much higher",
      "Any value above 0.5 MΩ",
      "There is no recommended value"
    ],
    correctAnswer: 1,
    explanation: "While 1 MΩ is the minimum, healthy installations typically show readings of 2 MΩ or much higher per circuit.",
    module: 4
  },
  // Additional Module 5 Questions (211-235)
  {
    id: 211,
    question: "What is the formula for calculating prospective earth fault current?",
    options: [
      "PEFC = Uo × Zs",
      "PEFC = Uo / Zs",
      "PEFC = Zs / Uo",
      "PEFC = Uo + Zs"
    ],
    correctAnswer: 1,
    explanation: "Prospective Earth Fault Current = Uo (nominal voltage) divided by Zs (earth fault loop impedance).",
    module: 5
  },
  {
    id: 212,
    question: "Why is temperature correction applied to Zs measurements?",
    options: [
      "To adjust for season",
      "Conductors have higher resistance at operating temperature than when cold",
      "For billing purposes",
      "It's not necessary"
    ],
    correctAnswer: 1,
    explanation: "Conductor resistance increases with temperature, so cold measurements must be corrected for operating conditions.",
    module: 5
  },
  {
    id: 213,
    question: "What is the maximum Zs for a 6A Type B MCB?",
    options: [
      "7.67Ω",
      "3.83Ω",
      "1.92Ω",
      "0.96Ω"
    ],
    correctAnswer: 0,
    explanation: "For a 6A Type B MCB, maximum Zs is 7.67Ω to achieve 0.4 second disconnection.",
    module: 5
  },
  {
    id: 214,
    question: "What is the maximum Zs for a 20A Type B MCB?",
    options: [
      "2.30Ω",
      "1.15Ω",
      "4.60Ω",
      "0.58Ω"
    ],
    correctAnswer: 0,
    explanation: "For a 20A Type B MCB, maximum Zs is 2.30Ω to achieve 0.4 second disconnection.",
    module: 5
  },
  {
    id: 215,
    question: "How does Zs affect protective device operation?",
    options: [
      "It has no effect",
      "Higher Zs means lower fault current and slower disconnection",
      "Higher Zs means faster disconnection",
      "Zs only affects voltage"
    ],
    correctAnswer: 1,
    explanation: "Higher Zs reduces fault current, which may prevent the protective device from operating quickly enough.",
    module: 5
  },
  {
    id: 216,
    question: "What is the relationship between fault current and Zs?",
    options: [
      "They are directly proportional",
      "They are inversely proportional",
      "There is no relationship",
      "They are equal"
    ],
    correctAnswer: 1,
    explanation: "Fault current and Zs are inversely proportional: If = Uo/Zs (Ohm's law).",
    module: 5
  },
  {
    id: 217,
    question: "What is the purpose of recording Ze at the origin?",
    options: [
      "For billing",
      "To calculate expected Zs values and verify supply characteristics",
      "It's optional",
      "For the DNO only"
    ],
    correctAnswer: 1,
    explanation: "Recording Ze allows calculation of expected Zs values and verification of supply earthing characteristics.",
    module: 5
  },
  {
    id: 218,
    question: "What might cause Zs to be higher than calculated?",
    options: [
      "New cables",
      "Poor connections, undersized cables, or long cable runs",
      "Correct installation",
      "Low ambient temperature"
    ],
    correctAnswer: 1,
    explanation: "Higher than expected Zs may indicate poor connections, undersized cables, or excessive cable lengths.",
    module: 5
  },
  {
    id: 219,
    question: "How is Ze typically measured?",
    options: [
      "With an RCD tester",
      "At the origin with the main earthing terminal disconnected from installation earth",
      "At any socket",
      "With a continuity tester"
    ],
    correctAnswer: 1,
    explanation: "Ze is measured at the origin with the installation earth disconnected from the MET.",
    module: 5
  },
  {
    id: 220,
    question: "What maximum Zs applies to a circuit protected by a 30mA RCD?",
    options: [
      "0.35Ω",
      "1667Ω (based on 50V touch voltage)",
      "1.44Ω",
      "21Ω"
    ],
    correctAnswer: 1,
    explanation: "For RCD-protected circuits, Zs ≤ 50V/0.03A = 1667Ω, though lower values improve safety.",
    module: 5
  },
  // Additional Module 6 Questions (221-245)
  {
    id: 221,
    question: "What is the tripping characteristic of a Type B RCD?",
    options: [
      "Trips on DC current only",
      "Trips on AC sinusoidal and pulsating DC",
      "Trips on smooth DC",
      "Delayed trip"
    ],
    correctAnswer: 1,
    explanation: "Type B RCDs trip on AC sinusoidal, pulsating DC, and smooth DC residual currents.",
    module: 6
  },
  {
    id: 222,
    question: "What test current is used for the non-trip test of a 30mA RCD?",
    options: [
      "30mA",
      "15mA (50% of rating)",
      "45mA",
      "150mA"
    ],
    correctAnswer: 1,
    explanation: "The non-trip test uses 50% of rated current (15mA for a 30mA RCD) to verify it doesn't trip prematurely.",
    module: 6
  },
  {
    id: 223,
    question: "What is the maximum trip time for a 30mA RCD at 30mA test current?",
    options: [
      "40ms",
      "150ms",
      "300ms",
      "1 second"
    ],
    correctAnswer: 2,
    explanation: "At rated residual current (30mA), a general RCD must trip within 300ms.",
    module: 6
  },
  {
    id: 224,
    question: "Why might an RCD fail to trip at all?",
    options: [
      "Normal operation",
      "Faulty tripping mechanism or no earth return path",
      "Too much load",
      "High voltage"
    ],
    correctAnswer: 1,
    explanation: "Failure to trip may indicate a faulty mechanism or no earth return path for the test current.",
    module: 6
  },
  {
    id: 225,
    question: "What is meant by RCD 'discrimination'?",
    options: [
      "Choosing RCD brands",
      "Ensuring the RCD closest to the fault trips first",
      "Testing RCDs",
      "Installing RCDs"
    ],
    correctAnswer: 1,
    explanation: "Discrimination ensures the RCD closest to a fault trips first, maintaining supply to unaffected circuits.",
    module: 6
  },
  {
    id: 226,
    question: "How is discrimination achieved between RCDs?",
    options: [
      "Using different brands",
      "Using time-delayed (S-type) upstream and faster downstream",
      "Using different colours",
      "Using the same rating"
    ],
    correctAnswer: 1,
    explanation: "Use S-type (time-delayed) RCDs upstream with faster RCDs downstream.",
    module: 6
  },
  {
    id: 227,
    question: "What is the maximum trip time for an S-type RCD at 5×IΔn?",
    options: [
      "40ms",
      "50ms",
      "150ms",
      "200ms"
    ],
    correctAnswer: 1,
    explanation: "S-type RCDs must trip within 50ms at 5 times rated residual current.",
    module: 6
  },
  {
    id: 228,
    question: "What happens if you test an RCD at 5×IΔn without an adequate earth path?",
    options: [
      "Accurate reading",
      "The tester will show an error or give unreliable results",
      "Normal operation",
      "Faster trip times"
    ],
    correctAnswer: 1,
    explanation: "Without an adequate earth path, the test current cannot flow and results will be unreliable.",
    module: 6
  },
  {
    id: 229,
    question: "What is the purpose of the 0° and 180° test on an RCD?",
    options: [
      "To test different brands",
      "To test on both halves of the AC waveform",
      "To test at different times",
      "Not required"
    ],
    correctAnswer: 1,
    explanation: "Testing at 0° and 180° ensures the RCD operates correctly on both halves of the AC waveform.",
    module: 6
  },
  {
    id: 230,
    question: "Why might an RCD trip intermittently?",
    options: [
      "Normal operation",
      "Intermittent earth fault or cumulative leakage near trip threshold",
      "Too few circuits",
      "New installation"
    ],
    correctAnswer: 1,
    explanation: "Intermittent tripping suggests an occasional fault or cumulative leakage approaching the trip threshold.",
    module: 6
  },
  // Additional Module 7 Questions (231-255)
  {
    id: 231,
    question: "What is the correct polarity connection for a BC lampholder?",
    options: [
      "Either terminal is acceptable",
      "Centre contact to phase, outer to neutral",
      "Centre to neutral, outer to phase",
      "Both to phase"
    ],
    correctAnswer: 1,
    explanation: "Centre contact connects to phase, outer contact to neutral for safety.",
    module: 7
  },
  {
    id: 232,
    question: "How can reversed polarity be detected at a socket outlet?",
    options: [
      "The socket won't work",
      "Using a socket tester with neon indicators",
      "Visual inspection only",
      "By the socket colour"
    ],
    correctAnswer: 1,
    explanation: "Socket testers with neon indicators show different patterns for correct and reversed polarity.",
    module: 7
  },
  {
    id: 233,
    question: "What is the danger of a cross-polarity fault?",
    options: [
      "Higher electricity bills",
      "Equipment may remain live when switched off",
      "Lower voltage",
      "Faster operation"
    ],
    correctAnswer: 1,
    explanation: "Cross-polarity means the neutral is switched instead of phase, leaving equipment live when 'off'.",
    module: 7
  },
  {
    id: 234,
    question: "What should be verified during functional testing of a consumer unit?",
    options: [
      "Only that it looks correct",
      "All MCBs/RCBOs operate mechanically and trip on fault",
      "The colour of devices",
      "The age of the unit"
    ],
    correctAnswer: 1,
    explanation: "Verify all protective devices operate mechanically and provide proper protection.",
    module: 7
  },
  {
    id: 235,
    question: "What is checked during functional testing of heating controls?",
    options: [
      "Boiler colour",
      "Thermostats, programmers, and zone valves operate correctly",
      "Pipe colour",
      "Radiator size"
    ],
    correctAnswer: 1,
    explanation: "Check thermostats respond to temperature, programmers time correctly, and zone valves operate.",
    module: 7
  },
  {
    id: 236,
    question: "What is the purpose of verifying two-way switching operation?",
    options: [
      "To test cable length",
      "To confirm the light can be controlled from either switch",
      "To measure voltage",
      "To test insulation"
    ],
    correctAnswer: 1,
    explanation: "Two-way switching should allow the light to be controlled from either switch position.",
    module: 7
  },
  {
    id: 237,
    question: "How is the operation of a door interlock verified?",
    options: [
      "Visual inspection only",
      "Confirm equipment stops when door is opened",
      "Check door colour",
      "Measure door resistance"
    ],
    correctAnswer: 1,
    explanation: "Verify that equipment stops or cannot start when the safety interlock door is opened.",
    module: 7
  },
  {
    id: 238,
    question: "What should be tested on an electric shower installation?",
    options: [
      "Water temperature only",
      "Polarity, isolation, and correct operation of safety devices",
      "Shower head colour",
      "Tile pattern"
    ],
    correctAnswer: 1,
    explanation: "Verify correct polarity, isolation capability, and that all safety devices function correctly.",
    module: 7
  },
  {
    id: 239,
    question: "What is phase sequence testing used for?",
    options: [
      "Single-phase circuits only",
      "Verifying correct rotation direction for three-phase motors",
      "Testing phase colour",
      "Measuring phase voltage"
    ],
    correctAnswer: 1,
    explanation: "Phase sequence testing verifies correct phase rotation for three-phase motor installations.",
    module: 7
  },
  {
    id: 240,
    question: "What might indicate incorrect phase sequence?",
    options: [
      "Normal motor operation",
      "Motor running backwards or phase rotation indicator showing reverse",
      "Higher voltage",
      "Lower current"
    ],
    correctAnswer: 1,
    explanation: "Incorrect phase sequence causes motors to run backwards; rotation indicators show reverse sequence.",
    module: 7
  },
  // Additional Module 8 Questions (241-265)
  {
    id: 241,
    question: "What should be checked regarding cable routes during visual inspection?",
    options: [
      "Only cable colour",
      "Cables follow safe zones and are protected from damage",
      "Cable cost",
      "Cable manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Verify cables follow safe zones where applicable and are protected against mechanical damage.",
    module: 8
  },
  {
    id: 242,
    question: "What is checked regarding earthing and bonding during visual inspection?",
    options: [
      "Only that labels exist",
      "Correct size, connection, labelling, and condition of conductors",
      "Earth colour only",
      "Bond length"
    ],
    correctAnswer: 1,
    explanation: "Check earthing and bonding conductors are correctly sized, connected, labelled, and in good condition.",
    module: 8
  },
  {
    id: 243,
    question: "What should circuit charts at distribution boards show?",
    options: [
      "Nothing specific",
      "Circuit purpose, rating, cable size, and protective device details",
      "Only circuit numbers",
      "Just the electrician's name"
    ],
    correctAnswer: 1,
    explanation: "Circuit charts should show circuit purpose, current rating, cable details, and protective device information.",
    module: 8
  },
  {
    id: 244,
    question: "What evidence of overheating should be looked for?",
    options: [
      "Cable colours",
      "Discolouration, melting, burning smells, or heat damage",
      "Cable length",
      "Installation date"
    ],
    correctAnswer: 1,
    explanation: "Look for discolouration, melting, burning smells, or any signs of heat damage to components.",
    module: 8
  },
  {
    id: 245,
    question: "What should be verified about fire barriers and sealing?",
    options: [
      "Only colour",
      "Penetrations are properly sealed to maintain fire integrity",
      "Not important",
      "Only in commercial premises"
    ],
    correctAnswer: 1,
    explanation: "Verify cable penetrations through fire barriers are properly sealed to maintain fire compartmentation.",
    module: 8
  },
  {
    id: 246,
    question: "What documentation should accompany an EIC?",
    options: [
      "Just the certificate",
      "Schedule of inspections, schedule of test results, and circuit details",
      "Only a signature",
      "A photo only"
    ],
    correctAnswer: 1,
    explanation: "An EIC must include schedules of inspections and test results plus circuit details and diagrams.",
    module: 8
  },
  {
    id: 247,
    question: "What is the purpose of the Schedule of Inspections?",
    options: [
      "To list test results",
      "To record visual inspection findings",
      "To list tools used",
      "To record time spent"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections records the findings of all visual inspection items.",
    module: 8
  },
  {
    id: 248,
    question: "What must be included on a Minor Electrical Installation Works Certificate?",
    options: [
      "Full test results for entire installation",
      "Description of work, essential test results, and declaration of compliance",
      "Just a signature",
      "Only the price"
    ],
    correctAnswer: 1,
    explanation: "The MEIWC must describe the work, include essential test results, and declare BS 7671 compliance.",
    module: 8
  },
  {
    id: 249,
    question: "How should departures from BS 7671 be documented?",
    options: [
      "They don't need documenting",
      "Recorded on the certificate with reasons and compensating measures",
      "Ignored",
      "Reported to police"
    ],
    correctAnswer: 1,
    explanation: "Any departures from BS 7671 must be documented with reasons and any compensating protective measures.",
    module: 8
  },
  {
    id: 250,
    question: "What is the purpose of recording previous inspection dates?",
    options: [
      "For billing",
      "To track installation history and maintenance patterns",
      "To identify installers",
      "Not required"
    ],
    correctAnswer: 1,
    explanation: "Previous inspection dates help understand installation history and identify recurring issues.",
    module: 8
  },
  // Final Questions covering all modules (251-300)
  {
    id: 251,
    question: "What is the purpose of an electrical installation risk assessment?",
    options: [
      "To set prices",
      "To identify hazards and determine inspection/testing scope",
      "To choose colours",
      "To count circuits"
    ],
    correctAnswer: 1,
    explanation: "Risk assessment identifies hazards and helps determine appropriate inspection and testing scope.",
    module: 1
  },
  {
    id: 252,
    question: "What is the maximum Ze for safe isolation testing purposes?",
    options: [
      "0.35Ω",
      "No maximum for isolation purposes",
      "1.0Ω",
      "200Ω"
    ],
    correctAnswer: 1,
    explanation: "Ze values define supply characteristics but don't limit isolation procedures which depend on proper technique.",
    module: 2
  },
  {
    id: 253,
    question: "What is the formula for calculating circuit resistance from conductor data?",
    options: [
      "R = length × CSA",
      "R = (mΩ/m × length) / 1000",
      "R = CSA / length",
      "R = voltage / current"
    ],
    correctAnswer: 1,
    explanation: "Circuit resistance = (resistance per metre in mΩ × length in metres) / 1000 to convert to ohms.",
    module: 3
  },
  {
    id: 254,
    question: "What does PI stand for in insulation testing?",
    options: [
      "Power Index",
      "Polarisation Index",
      "Parallel Impedance",
      "Primary Insulation"
    ],
    correctAnswer: 1,
    explanation: "Polarisation Index is the ratio of insulation resistance at 10 minutes to that at 1 minute.",
    module: 4
  },
  {
    id: 255,
    question: "What is the typical fault current that triggers a Type B MCB?",
    options: [
      "1-2 times In",
      "3-5 times In",
      "10-20 times In",
      "50 times In"
    ],
    correctAnswer: 1,
    explanation: "Type B MCBs trip magnetically at 3-5 times their rated current (In).",
    module: 5
  },
  {
    id: 256,
    question: "What is the typical fault current that triggers a Type C MCB?",
    options: [
      "3-5 times In",
      "5-10 times In",
      "10-20 times In",
      "1-2 times In"
    ],
    correctAnswer: 1,
    explanation: "Type C MCBs trip magnetically at 5-10 times their rated current (In).",
    module: 5
  },
  {
    id: 257,
    question: "What is the typical fault current that triggers a Type D MCB?",
    options: [
      "3-5 times In",
      "5-10 times In",
      "10-20 times In",
      "1-2 times In"
    ],
    correctAnswer: 2,
    explanation: "Type D MCBs trip magnetically at 10-20 times their rated current (In).",
    module: 5
  },
  {
    id: 258,
    question: "What is an AFDD and what does it protect against?",
    options: [
      "Automatic Fault Detection Device - voltage surges",
      "Arc Fault Detection Device - electrical arcing that could cause fires",
      "Alternating Frequency Detection Device - harmonics",
      "Automatic Frequency Distribution Device - power quality"
    ],
    correctAnswer: 1,
    explanation: "An AFDD (Arc Fault Detection Device) detects dangerous arc faults that could cause electrical fires.",
    module: 6
  },
  {
    id: 259,
    question: "What is the test procedure for verifying main switch operation?",
    options: [
      "Visual check only",
      "Operate the switch and verify all poles disconnect",
      "Check the colour",
      "Measure resistance"
    ],
    correctAnswer: 1,
    explanation: "Operate the main switch and verify all poles disconnect properly from the supply.",
    module: 7
  },
  {
    id: 260,
    question: "What should be checked on flexible cables during visual inspection?",
    options: [
      "Only length",
      "Condition, termination, strain relief, and suitability for environment",
      "Colour only",
      "Cost"
    ],
    correctAnswer: 1,
    explanation: "Check flexible cables for condition, proper termination, adequate strain relief, and environmental suitability.",
    module: 8
  },
  {
    id: 261,
    question: "What is the significance of a 'satisfactory' overall assessment on an EICR?",
    options: [
      "Work is complete",
      "No C1 or C2 codes exist and the installation is safe for continued use",
      "No further action needed ever",
      "The certificate is valid forever"
    ],
    correctAnswer: 1,
    explanation: "Satisfactory means no C1 or C2 codes exist and the installation is safe for continued use.",
    module: 1
  },
  {
    id: 262,
    question: "What is the significance of an 'unsatisfactory' overall assessment on an EICR?",
    options: [
      "Minor issues exist",
      "C1 or C2 codes exist requiring urgent remedial action",
      "The installation is new",
      "Just recommendations exist"
    ],
    correctAnswer: 1,
    explanation: "Unsatisfactory indicates C1 or C2 observations exist requiring urgent remedial work.",
    module: 1
  },
  {
    id: 263,
    question: "What should be done with test instruments before use?",
    options: [
      "Nothing special",
      "Check calibration date, battery, leads, and prove operation",
      "Clean the case",
      "Check the colour"
    ],
    correctAnswer: 1,
    explanation: "Verify calibration is current, battery is adequate, leads are good, and prove correct operation.",
    module: 2
  },
  {
    id: 264,
    question: "What information should be on instrument calibration certificates?",
    options: [
      "Just the date",
      "Date of calibration, standards used, and next due date",
      "Instrument colour",
      "Purchase price"
    ],
    correctAnswer: 1,
    explanation: "Calibration certificates should show calibration date, standards used, and when recalibration is due.",
    module: 2
  },
  {
    id: 265,
    question: "How often should test instruments be calibrated?",
    options: [
      "Never",
      "Typically annually, or as specified by manufacturer",
      "Only when broken",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Test instruments should typically be calibrated annually or as specified by the manufacturer.",
    module: 2
  },
  {
    id: 266,
    question: "What is the purpose of testing continuity of equipotential bonding?",
    options: [
      "To measure cable length",
      "To verify low resistance connections creating equipotential zone",
      "To test insulation",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "Testing verifies low resistance connections that create an equipotential zone reducing touch voltage.",
    module: 3
  },
  {
    id: 267,
    question: "What test verifies that a ring circuit has not been cross-connected (figure-of-eight)?",
    options: [
      "Insulation test",
      "The ring circuit continuity test showing correct readings at each socket",
      "RCD test",
      "Loop impedance test"
    ],
    correctAnswer: 1,
    explanation: "Correct ring circuit testing reveals cross-connections through inconsistent socket readings.",
    module: 3
  },
  {
    id: 268,
    question: "What might cause insulation resistance to improve after the cable is heated?",
    options: [
      "Cable damage",
      "Evaporation of moisture from the insulation",
      "Lower temperature",
      "Higher voltage"
    ],
    correctAnswer: 1,
    explanation: "Heating cables can evaporate moisture, improving insulation resistance readings.",
    module: 4
  },
  {
    id: 269,
    question: "What is the minimum PFC (prospective fault current) that should be recorded?",
    options: [
      "Not required",
      "At the origin and at any point where PFC is significantly different",
      "Only at sockets",
      "Only at the consumer unit"
    ],
    correctAnswer: 1,
    explanation: "Record PFC at the origin and anywhere it differs significantly, such as at sub-distribution boards.",
    module: 5
  },
  {
    id: 270,
    question: "What does it mean if Zs measured is lower than Ze + (R1+R2)?",
    options: [
      "Normal - measurement tolerance",
      "Possible parallel earth path reducing measured impedance",
      "Instrument fault",
      "Incorrect R1+R2 measurement"
    ],
    correctAnswer: 1,
    explanation: "Lower measured Zs may indicate a parallel earth path, such as bonding or metalwork providing return path.",
    module: 5
  },
  {
    id: 271,
    question: "How does an RCD tester apply the test current?",
    options: [
      "Between phase and neutral",
      "Between phase and earth to simulate earth leakage",
      "Between neutral and earth",
      "Through the RCD test button"
    ],
    correctAnswer: 1,
    explanation: "RCD testers apply current between phase and earth to simulate an earth leakage fault.",
    module: 6
  },
  {
    id: 272,
    question: "What might prevent an RCD tester from working correctly?",
    options: [
      "Normal wiring",
      "Missing or high impedance earth, reversed polarity, or open neutral",
      "New installation",
      "Low voltage"
    ],
    correctAnswer: 1,
    explanation: "Missing earth, high impedance earth, reversed polarity, or open neutral prevent proper test current flow.",
    module: 6
  },
  {
    id: 273,
    question: "What functional test should be performed on smoke detectors?",
    options: [
      "Visual inspection only",
      "Activation using test aerosol or test button, verifying alarm response",
      "Colour check",
      "Size measurement"
    ],
    correctAnswer: 1,
    explanation: "Test smoke detectors using appropriate test aerosol or test button and verify the alarm system responds.",
    module: 7
  },
  {
    id: 274,
    question: "What should be verified when testing extract fan operation?",
    options: [
      "Fan colour",
      "Correct operation, switching, overrun timer if fitted",
      "Fan size only",
      "Installation date"
    ],
    correctAnswer: 1,
    explanation: "Verify fan operates correctly, responds to switches/humidistat, and overrun timer works if fitted.",
    module: 7
  },
  {
    id: 275,
    question: "What is the purpose of inspecting enclosure integrity?",
    options: [
      "Aesthetic purposes",
      "To verify protection against ingress and contact with live parts",
      "To check colours",
      "To measure size"
    ],
    correctAnswer: 1,
    explanation: "Enclosure integrity inspection verifies protection against ingress of foreign objects and contact with live parts.",
    module: 8
  },
  {
    id: 276,
    question: "What should be checked regarding labels and warning notices?",
    options: [
      "Only that they exist",
      "Correct information, legibility, and durability",
      "Colour preferences",
      "Size only"
    ],
    correctAnswer: 1,
    explanation: "Check labels contain correct information, are legible, and are durable for the environment.",
    module: 8
  },
  {
    id: 277,
    question: "When might a partial inspection and test be appropriate?",
    options: [
      "Never",
      "After modifications, additions, or where full inspection is impractical",
      "Always",
      "Only on new installations"
    ],
    correctAnswer: 1,
    explanation: "Partial inspection may be appropriate after modifications or where full access is impractical.",
    module: 1
  },
  {
    id: 278,
    question: "What is the purpose of the pre-inspection risk assessment?",
    options: [
      "To set prices",
      "To identify hazards and plan safe working methods",
      "To count circuits",
      "To choose test equipment"
    ],
    correctAnswer: 1,
    explanation: "Pre-inspection risk assessment identifies hazards and helps plan safe working methods.",
    module: 2
  },
  {
    id: 279,
    question: "What factors affect the resistance of a conductor?",
    options: [
      "Only length",
      "Material, cross-sectional area, length, and temperature",
      "Only temperature",
      "Only the colour"
    ],
    correctAnswer: 1,
    explanation: "Conductor resistance depends on material resistivity, cross-sectional area, length, and temperature.",
    module: 3
  },
  {
    id: 280,
    question: "What does DAR stand for in insulation testing?",
    options: [
      "Direct AC Resistance",
      "Dielectric Absorption Ratio",
      "Digital Accuracy Reading",
      "Distribution Area Rating"
    ],
    correctAnswer: 1,
    explanation: "DAR (Dielectric Absorption Ratio) is the ratio of IR at 60 seconds to IR at 30 seconds.",
    module: 4
  },
  {
    id: 281,
    question: "What is the purpose of measuring external loop impedance (Ze)?",
    options: [
      "To test insulation",
      "To determine the supply characteristics and calculate expected Zs",
      "To test RCDs",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "Ze measurement determines supply characteristics and allows calculation of expected circuit Zs values.",
    module: 5
  },
  {
    id: 282,
    question: "What is the minimum operating current for a 100mA RCD?",
    options: [
      "100mA",
      "50mA",
      "150mA",
      "30mA"
    ],
    correctAnswer: 1,
    explanation: "RCDs must operate between 50% and 100% of rated current, so 100mA RCD operates between 50-100mA.",
    module: 6
  },
  {
    id: 283,
    question: "What is the maximum trip time for a 300mA RCD at rated current?",
    options: [
      "40ms",
      "150ms",
      "300ms",
      "1 second"
    ],
    correctAnswer: 2,
    explanation: "All general RCDs must trip within 300ms at their rated residual current.",
    module: 6
  },
  {
    id: 284,
    question: "What is the correct polarity for a shaver supply unit?",
    options: [
      "Any polarity acceptable",
      "Phase to phase terminal, neutral to neutral, earth to earth",
      "Reversed is safer",
      "Only earth connection matters"
    ],
    correctAnswer: 1,
    explanation: "Shaver units must have correct polarity with phase to phase terminal for isolation transformer operation.",
    module: 7
  },
  {
    id: 285,
    question: "What should be verified when testing outdoor lighting?",
    options: [
      "Only that lights work",
      "IP rating, correct cable entry, weatherproofing, and correct operation",
      "Colour temperature",
      "Brightness only"
    ],
    correctAnswer: 1,
    explanation: "Verify adequate IP rating, weatherproof cable entries, correct sealing, and proper operation.",
    module: 7
  },
  {
    id: 286,
    question: "What should be recorded for each circuit in the Schedule of Test Results?",
    options: [
      "Just pass/fail",
      "Circuit details, conductor CSA, test results, and protective device details",
      "Only cable colour",
      "Installation date"
    ],
    correctAnswer: 1,
    explanation: "Record circuit details, conductor sizes, all test measurements, and protective device specifications.",
    module: 8
  },
  {
    id: 287,
    question: "What is the recommended action when test results are marginal?",
    options: [
      "Accept if close enough",
      "Investigate further and consider replacement or repair",
      "Ignore",
      "Test again later"
    ],
    correctAnswer: 1,
    explanation: "Marginal results warrant further investigation and consideration of preventive maintenance or repair.",
    module: 1
  },
  {
    id: 288,
    question: "What test proves that all protective conductors are continuous to the MET?",
    options: [
      "Insulation resistance test",
      "Protective conductor continuity test from MET to each point",
      "Loop impedance test",
      "RCD test"
    ],
    correctAnswer: 1,
    explanation: "Testing from the MET to each point verifies complete continuity of protective conductors.",
    module: 3
  },
  {
    id: 289,
    question: "Why is it important to test insulation resistance between phases on three-phase systems?",
    options: [
      "Not important",
      "To detect phase-to-phase insulation breakdown",
      "Only for motors",
      "Only on new installations"
    ],
    correctAnswer: 1,
    explanation: "Phase-to-phase testing detects insulation breakdown between different phases.",
    module: 4
  },
  {
    id: 290,
    question: "What is the purpose of PSCC (Prospective Short Circuit Current) measurement?",
    options: [
      "To test insulation",
      "To verify protective devices have adequate breaking capacity",
      "To test continuity",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "PSCC measurement ensures protective devices can safely interrupt the maximum possible fault current.",
    module: 5
  },
  {
    id: 291,
    question: "What type of fault does an RCD protect against?",
    options: [
      "Overcurrent",
      "Earth fault leakage current",
      "Short circuit",
      "Overvoltage"
    ],
    correctAnswer: 1,
    explanation: "RCDs protect against earth fault leakage current by detecting imbalance between L and N.",
    module: 6
  },
  {
    id: 292,
    question: "What should be tested on an EV charging installation?",
    options: [
      "Only that it charges",
      "Earth continuity, RCD operation, polarity, and all safety features",
      "Cable colour",
      "Charging speed only"
    ],
    correctAnswer: 1,
    explanation: "Test all aspects including earthing, RCD protection, polarity, and safety interlocks.",
    module: 7
  },
  {
    id: 293,
    question: "What is the significance of the IP rating on enclosures?",
    options: [
      "Colour coding",
      "Indicates protection level against solid objects and water",
      "Installation method",
      "Manufacturer code"
    ],
    correctAnswer: 1,
    explanation: "IP rating indicates the degree of protection against solid objects (first digit) and water (second digit).",
    module: 8
  },
  {
    id: 294,
    question: "What does IP44 mean?",
    options: [
      "Dustproof and waterproof",
      "Protected against objects >1mm and water splashes",
      "No protection",
      "Protected against immersion"
    ],
    correctAnswer: 1,
    explanation: "IP44 means protected against objects >1mm diameter and water splashing from any direction.",
    module: 8
  },
  {
    id: 295,
    question: "What is the minimum IP rating for a bathroom Zone 1?",
    options: [
      "IP20",
      "IPX4",
      "IPX7",
      "IP68"
    ],
    correctAnswer: 1,
    explanation: "Bathroom Zone 1 requires minimum IPX4 (protected against water splashes).",
    module: 8
  },
  {
    id: 296,
    question: "What should be checked regarding cable support and fixings?",
    options: [
      "Only appearance",
      "Adequate support, correct spacing, and suitable for cable type/weight",
      "Colour only",
      "Brand of clips"
    ],
    correctAnswer: 1,
    explanation: "Check cables are adequately supported at correct intervals with fixings suitable for cable type and weight.",
    module: 8
  },
  {
    id: 297,
    question: "What is the purpose of testing voltage drop?",
    options: [
      "To measure battery",
      "To verify voltage at load is within acceptable limits",
      "To test insulation",
      "To test continuity"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop testing ensures voltage at the load terminals is within acceptable limits for equipment operation.",
    module: 5
  },
  {
    id: 298,
    question: "What is the maximum voltage drop permitted for lighting circuits?",
    options: [
      "1%",
      "3%",
      "5%",
      "10%"
    ],
    correctAnswer: 1,
    explanation: "The maximum permitted voltage drop for lighting circuits is typically 3% of nominal voltage.",
    module: 5
  },
  {
    id: 299,
    question: "What is the maximum voltage drop permitted for other circuits?",
    options: [
      "3%",
      "5%",
      "10%",
      "15%"
    ],
    correctAnswer: 1,
    explanation: "The maximum permitted voltage drop for other circuits is typically 5% of nominal voltage.",
    module: 5
  },
  {
    id: 300,
    question: "What final checks should be made before re-energising after testing?",
    options: [
      "None needed",
      "All connections secure, covers replaced, no tools left, all tests complete",
      "Just visual check",
      "Only verify main switch"
    ],
    correctAnswer: 1,
    explanation: "Verify all connections are secure, covers replaced, no tools left behind, and all testing is complete and documented.",
    module: 1
  }
];

export function getRandomInspectionTestingExamQuestions(numQuestions: number = 30): MockExamQuestion[] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numQuestions);
}

export function getInspectionTestingQuestionsByModule(module: number): MockExamQuestion[] {
  return allQuestions.filter(q => q.module === module);
}

export const totalQuestionCount = allQuestions.length;

export default allQuestions;
