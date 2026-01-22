import { StandardMockQuestion } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// Categories based on the 8 course modules
export const inspectionTestingCategories = [
  'Introduction & Fundamentals',
  'Safe Isolation',
  'Continuity Testing',
  'Insulation Resistance',
  'Earth Fault Loop Impedance',
  'RCD Testing',
  'Polarity & Functional Testing',
  'Visual Inspection & Documentation'
];

// Configuration for Inspection & Testing mock exam
export const inspectionTestingMockExamConfig = {
  examId: 'inspection-testing',
  examTitle: 'Inspection & Testing Mock Examination',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes
  passThreshold: 60,
  exitPath: '/electrician/upskilling/inspection-testing',
  categories: inspectionTestingCategories
};

// Inspection & Testing Mock Exam Question Bank - 300 questions covering all 8 modules
export const inspectionTestingQuestionBank: StandardMockQuestion[] = [
  // MODULE 1: Introduction to Inspection & Testing (Questions 1-25 + additional)
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Purpose of Testing",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Standards",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Documentation",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Competence",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Inspection Intervals",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Classification Codes",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Classification Codes",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Classification Codes",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Classification Codes",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Inspection Intervals",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Documentation",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Testing Sequence",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Inspection Scope",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Documentation",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Inspection Intervals",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "advanced",
    topic: "Regulations",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Definitions",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Documentation",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Inspection Scope",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Inspection Scope",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Responsibilities",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "basic",
    topic: "Safety Actions",
    category: "Introduction & Fundamentals"
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
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Inspection Intervals",
    category: "Introduction & Fundamentals"
  },
  // MODULE 2: Safe Isolation Procedures (Questions 26-50)
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Isolation Procedure",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Test Equipment",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Test Equipment",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Isolation Procedure",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Safety Notices",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Locking Off",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Isolation Procedure",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Safety",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Isolation Procedure",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Safety",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Locking Off",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Definitions",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Live Working",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Voltage Levels",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Permit Systems",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Stored Energy",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "advanced",
    topic: "Test Equipment",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Isolation Procedure",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Safety",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Safe Isolation"
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
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Isolation Procedure",
    category: "Safe Isolation"
  },
  // MODULE 3: Continuity Testing (Questions 51-75)
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Purpose",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Acceptance Criteria",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Test Parameters",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Ring Circuit Testing",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Ring Circuit Testing",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "advanced",
    topic: "Ring Circuit Testing",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "advanced",
    topic: "Fault Finding",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Bonding",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Acceptance Criteria",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Definitions",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Definitions",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Test Procedure",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Test Methods",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Fault Finding",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Bonding",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Radial Circuits",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "advanced",
    topic: "Fault Finding",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "basic",
    topic: "Test Parameters",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "advanced",
    topic: "Ring Circuit Testing",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Troubleshooting",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "advanced",
    topic: "Ring Circuit Testing",
    category: "Continuity Testing"
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
    section: "Continuity Testing",
    difficulty: "intermediate",
    topic: "Interpreting Results",
    category: "Continuity Testing"
  },
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Test Parameters",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Acceptance Criteria",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Test Procedure",
    category: "Insulation Resistance"
  },
  // MODULE 4: Insulation Resistance Testing (Questions 76-100)
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Purpose",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Acceptance Criteria",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Test Procedure",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Test Procedure",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Fault Finding",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Test Parameters",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Safety",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "advanced",
    topic: "Interpreting Results",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Actions",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Test Procedure",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Acceptance Criteria",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "advanced",
    topic: "Theory",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "advanced",
    topic: "Theory",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Test Procedure",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "advanced",
    topic: "Interpreting Results",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Environmental Factors",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Test Equipment",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Test Procedure",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "intermediate",
    topic: "Purpose",
    category: "Insulation Resistance"
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
    section: "Insulation Resistance",
    difficulty: "basic",
    topic: "Actions",
    category: "Insulation Resistance"
  },
  // MODULE 5: Earth Fault Loop Impedance (Questions 96-120)
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
    section: "Earth Fault Loop Impedance",
    difficulty: "basic",
    topic: "Definitions",
    category: "Earth Fault Loop Impedance"
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
    section: "Earth Fault Loop Impedance",
    difficulty: "basic",
    topic: "Definitions",
    category: "Earth Fault Loop Impedance"
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
    section: "Earth Fault Loop Impedance",
    difficulty: "intermediate",
    topic: "Calculations",
    category: "Earth Fault Loop Impedance"
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
    section: "Earth Fault Loop Impedance",
    difficulty: "basic",
    topic: "Purpose",
    category: "Earth Fault Loop Impedance"
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
    section: "Earth Fault Loop Impedance",
    difficulty: "advanced",
    topic: "Maximum Values",
    category: "Earth Fault Loop Impedance"
  },
  // Questions 101-120: More Earth Fault Loop Impedance
  { id: 101, question: "What is the maximum disconnection time for a 230V TN system final circuit?", options: ["0.2 seconds", "0.4 seconds", "1 second", "5 seconds"], correctAnswer: 1, explanation: "Final circuits on TN systems up to 32A require disconnection within 0.4 seconds.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Disconnection Times", category: "Earth Fault Loop Impedance" },
  { id: 102, question: "What is the maximum disconnection time for distribution circuits on a TN system?", options: ["0.4 seconds", "1 second", "5 seconds", "10 seconds"], correctAnswer: 2, explanation: "Distribution circuits on TN systems may have a disconnection time of up to 5 seconds.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Disconnection Times", category: "Earth Fault Loop Impedance" },
  { id: 103, question: "What causes the difference between measured Zs and calculated Zs values?", options: ["Faulty test equipment", "Temperature - conductors are cooler when tested", "Incorrect calibration", "Time of day"], correctAnswer: 1, explanation: "Measured Zs is typically lower than calculated because conductors are cooler during testing than at operating temperature.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "Temperature Effects", category: "Earth Fault Loop Impedance" },
  { id: 104, question: "What correction factor should be applied to measured Zs values?", options: ["Multiply by 0.8", "Multiply by 1.2 for thermoplastic, 1.04 for thermosetting", "No correction needed", "Divide by 2"], correctAnswer: 1, explanation: "Apply a correction factor of 1.2 for thermoplastic cables or 1.04 for thermosetting to account for operating temperature.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "Temperature Correction", category: "Earth Fault Loop Impedance" },
  { id: 105, question: "What type of instrument is used to measure earth fault loop impedance?", options: ["Multimeter", "Loop impedance tester", "Insulation resistance tester", "Clamp meter"], correctAnswer: 1, explanation: "A loop impedance tester is specifically designed to measure earth fault loop impedance.", section: "Earth Fault Loop Impedance", difficulty: "basic", topic: "Test Equipment", category: "Earth Fault Loop Impedance" },
  { id: 106, question: "What does a high Zs reading indicate?", options: ["Good installation", "Protective device may not operate quickly enough", "Low resistance earth path", "New installation"], correctAnswer: 1, explanation: "High Zs indicates the protective device may not operate quickly enough to disconnect the supply safely.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Interpreting Results", category: "Earth Fault Loop Impedance" },
  { id: 107, question: "What is the typical maximum Ze for a TN-C-S system?", options: ["0.8Ω", "0.35Ω", "21Ω", "1.0Ω"], correctAnswer: 1, explanation: "The typical maximum Ze for a TN-C-S (PME) system is 0.35Ω.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "System Values", category: "Earth Fault Loop Impedance" },
  { id: 108, question: "What is the typical maximum Ze for a TN-S system?", options: ["0.35Ω", "0.8Ω", "21Ω", "1.44Ω"], correctAnswer: 1, explanation: "The typical maximum Ze for a TN-S system is 0.8Ω.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "System Values", category: "Earth Fault Loop Impedance" },
  { id: 109, question: "What is the typical maximum Ze for a TT system?", options: ["0.35Ω", "0.8Ω", "21Ω", "200Ω"], correctAnswer: 2, explanation: "The typical maximum Ze for a TT system is 21Ω, but RCDs are typically required.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "System Values", category: "Earth Fault Loop Impedance" },
  { id: 110, question: "How does a loop impedance tester work?", options: ["It measures voltage only", "It creates a brief high current and measures voltage drop", "It measures resistance directly", "It uses ultrasound"], correctAnswer: 1, explanation: "Loop testers create a brief high current and measure the resulting voltage drop to calculate impedance.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Test Equipment", category: "Earth Fault Loop Impedance" },
  { id: 111, question: "Why might RCDs trip during loop impedance testing?", options: ["The tester is faulty", "The test current passes through earth causing imbalance", "The voltage is too high", "The RCD is faulty"], correctAnswer: 1, explanation: "The test current passes through the earth path, creating an imbalance that can trip RCDs.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "RCD Interaction", category: "Earth Fault Loop Impedance" },
  { id: 112, question: "What is a 'no-trip' loop tester?", options: ["A tester that doesn't work", "A tester designed to test without tripping RCDs", "A tester for circuits without RCDs", "An outdated tester"], correctAnswer: 1, explanation: "No-trip testers use lower test currents to measure Zs without tripping RCDs.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Test Equipment", category: "Earth Fault Loop Impedance" },
  { id: 113, question: "What is prospective fault current (PFC)?", options: ["Normal operating current", "The maximum current that could flow during a fault", "The current at which fuses blow", "The test current"], correctAnswer: 1, explanation: "Prospective fault current is the maximum current that could flow during a short circuit or earth fault.", section: "Earth Fault Loop Impedance", difficulty: "basic", topic: "Definitions", category: "Earth Fault Loop Impedance" },
  { id: 114, question: "How is prospective fault current calculated?", options: ["PFC = Voltage x Impedance", "PFC = Voltage / Impedance", "PFC = Voltage + Impedance", "PFC = Voltage - Impedance"], correctAnswer: 1, explanation: "PFC = Uo/Zs where Uo is nominal voltage and Zs is loop impedance (Ohm's law).", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Calculations", category: "Earth Fault Loop Impedance" },
  { id: 115, question: "What must a protective device's breaking capacity exceed?", options: ["Normal operating current", "The prospective fault current at its location", "The circuit design current", "The cable rating"], correctAnswer: 1, explanation: "A protective device's breaking capacity must exceed the prospective fault current at its installation point.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Breaking Capacity", category: "Earth Fault Loop Impedance" },
  // Questions 116-140: RCD Testing
  { id: 116, question: "What does RCD stand for?", options: ["Residual Circuit Detector", "Residual Current Device", "Remote Circuit Disconnector", "Rapid Current Detector"], correctAnswer: 1, explanation: "RCD stands for Residual Current Device.", section: "RCD Testing", difficulty: "basic", topic: "Definitions", category: "RCD Testing" },
  { id: 117, question: "How does an RCD detect a fault?", options: ["By measuring voltage", "By detecting imbalance between live and neutral currents", "By measuring temperature", "By detecting overcurrent"], correctAnswer: 1, explanation: "An RCD detects imbalance between the current flowing in the live and neutral conductors.", section: "RCD Testing", difficulty: "basic", topic: "Operation", category: "RCD Testing" },
  { id: 118, question: "What is the maximum disconnection time for a 30mA RCD at rated residual current?", options: ["40ms", "200ms", "300ms", "1 second"], correctAnswer: 2, explanation: "A general type RCD must disconnect within 300ms at its rated residual current (IΔn).", section: "RCD Testing", difficulty: "intermediate", topic: "Trip Times", category: "RCD Testing" },
  { id: 119, question: "What is the maximum disconnection time for a 30mA RCD at 5 times rated residual current?", options: ["40ms", "150ms", "300ms", "1 second"], correctAnswer: 0, explanation: "At 5 times rated current, an RCD must disconnect within 40ms.", section: "RCD Testing", difficulty: "intermediate", topic: "Trip Times", category: "RCD Testing" },
  { id: 120, question: "What current rating provides additional protection against electric shock?", options: ["100mA", "300mA", "30mA or less", "500mA"], correctAnswer: 2, explanation: "RCDs rated 30mA or less provide additional protection against electric shock.", section: "RCD Testing", difficulty: "basic", topic: "Ratings", category: "RCD Testing" },
  { id: 121, question: "What is the purpose of RCD testing?", options: ["To verify the RCD trips within the required time", "To test cable insulation", "To measure loop impedance", "To check polarity"], correctAnswer: 0, explanation: "RCD testing verifies the device trips within the required time at specific test currents.", section: "RCD Testing", difficulty: "basic", topic: "Purpose", category: "RCD Testing" },
  { id: 122, question: "At what percentage of rated residual current must an RCD NOT trip?", options: ["25%", "50%", "75%", "100%"], correctAnswer: 1, explanation: "An RCD must not trip at 50% of its rated residual current (non-trip test).", section: "RCD Testing", difficulty: "intermediate", topic: "Test Parameters", category: "RCD Testing" },
  { id: 123, question: "What is a Type AC RCD designed to detect?", options: ["DC residual current only", "AC sinusoidal residual currents", "Pulsating DC only", "All types of residual current"], correctAnswer: 1, explanation: "Type AC RCDs detect AC sinusoidal residual currents only.", section: "RCD Testing", difficulty: "intermediate", topic: "RCD Types", category: "RCD Testing" },
  { id: 124, question: "What is a Type A RCD designed to detect?", options: ["AC sinusoidal only", "AC sinusoidal and pulsating DC residual currents", "Smooth DC only", "High frequency currents only"], correctAnswer: 1, explanation: "Type A RCDs detect AC sinusoidal and pulsating DC residual currents.", section: "RCD Testing", difficulty: "intermediate", topic: "RCD Types", category: "RCD Testing" },
  { id: 125, question: "What type of RCD should be used with EV chargers?", options: ["Type AC", "Type A or Type B", "Any type", "Type AC is sufficient"], correctAnswer: 1, explanation: "EV chargers typically require Type A or Type B RCDs due to DC components in the charging current.", section: "RCD Testing", difficulty: "advanced", topic: "RCD Types", category: "RCD Testing" },
  { id: 126, question: "What is the test button on an RCD used for?", options: ["To replace proper testing", "For user functional testing between proper inspections", "To reset the RCD", "For installation testing only"], correctAnswer: 1, explanation: "The test button allows users to functionally test the RCD between proper inspections.", section: "RCD Testing", difficulty: "basic", topic: "Test Button", category: "RCD Testing" },
  { id: 127, question: "Why is an instrument test preferred over the test button?", options: ["It's cheaper", "It measures actual trip time and current, not just mechanism function", "It's faster", "It doesn't trip the RCD"], correctAnswer: 1, explanation: "Instrument testing measures actual trip time at specific currents.", section: "RCD Testing", difficulty: "intermediate", topic: "Test Methods", category: "RCD Testing" },
  { id: 128, question: "What is an RCBO?", options: ["A type of cable", "A combined RCD and circuit breaker in one device", "A testing instrument", "A type of earthing arrangement"], correctAnswer: 1, explanation: "An RCBO combines the functions of an RCD and an MCB in a single device.", section: "RCD Testing", difficulty: "basic", topic: "Device Types", category: "RCD Testing" },
  { id: 129, question: "What is the advantage of using RCBOs over a single RCD?", options: ["Lower cost", "Individual circuit protection - one fault doesn't affect other circuits", "Faster installation", "Less space required"], correctAnswer: 1, explanation: "RCBOs provide individual circuit protection.", section: "RCD Testing", difficulty: "intermediate", topic: "Device Types", category: "RCD Testing" },
  { id: 130, question: "What is an S-type or time-delayed RCD used for?", options: ["Faster protection", "To provide discrimination with downstream RCDs", "Higher current circuits only", "Outdoor use only"], correctAnswer: 1, explanation: "S-type RCDs allow discrimination with downstream RCDs.", section: "RCD Testing", difficulty: "intermediate", topic: "RCD Types", category: "RCD Testing" },
  { id: 131, question: "What is the minimum delay time for an S-type RCD at rated residual current?", options: ["10ms", "40ms", "130ms", "300ms"], correctAnswer: 2, explanation: "S-type RCDs have a minimum delay of 130ms at rated residual current.", section: "RCD Testing", difficulty: "advanced", topic: "S-Type RCDs", category: "RCD Testing" },
  { id: 132, question: "What causes nuisance tripping of RCDs?", options: ["Too many circuits", "Cumulative earth leakage from multiple circuits or equipment", "Incorrect cable size", "High voltage"], correctAnswer: 1, explanation: "Nuisance tripping is often caused by cumulative earth leakage current.", section: "RCD Testing", difficulty: "intermediate", topic: "Troubleshooting", category: "RCD Testing" },
  { id: 133, question: "What is the maximum permissible standing earth leakage for a 30mA RCD protected circuit?", options: ["30mA", "15mA", "10mA (one-third of rating)", "5mA"], correctAnswer: 2, explanation: "Standing leakage should not exceed one-third of the RCD rating.", section: "RCD Testing", difficulty: "advanced", topic: "Earth Leakage", category: "RCD Testing" },
  { id: 134, question: "How should an RCD tester be connected?", options: ["Line to earth only", "Between line, neutral and earth at the point of test", "Between line and neutral only", "To the RCD terminals directly"], correctAnswer: 1, explanation: "RCD testers connect between line, neutral and earth at a socket or other test point.", section: "RCD Testing", difficulty: "basic", topic: "Test Procedure", category: "RCD Testing" },
  { id: 135, question: "What should be done if an RCD fails to trip during testing?", options: ["Test again later", "Replace the RCD immediately", "Check connections first, then replace if still faulty", "Ignore if circuit works normally"], correctAnswer: 2, explanation: "Check connections and wiring first; if still faulty, the RCD must be replaced.", section: "RCD Testing", difficulty: "basic", topic: "Actions", category: "RCD Testing" },
  // Questions 136-160: Polarity & Functional Testing
  { id: 136, question: "What is polarity testing?", options: ["Testing for magnetic fields", "Verifying correct connection of phase, neutral and earth conductors", "Testing battery condition", "Measuring voltage levels"], correctAnswer: 1, explanation: "Polarity testing verifies that phase, neutral and earth conductors are correctly connected.", section: "Polarity & Functional Testing", difficulty: "basic", topic: "Definitions", category: "Polarity & Functional Testing" },
  { id: 137, question: "Why is correct polarity important for single-pole switches?", options: ["For aesthetic reasons", "To ensure the switch breaks the phase conductor", "To reduce cable length", "For easier identification"], correctAnswer: 1, explanation: "Single-pole switches must be in the phase conductor to isolate the load when switched off.", section: "Polarity & Functional Testing", difficulty: "basic", topic: "Switch Polarity", category: "Polarity & Functional Testing" },
  { id: 138, question: "What could happen if polarity is reversed at a socket outlet?", options: ["Nothing, it will work normally", "Risk of shock when maintaining equipment that appears off", "The socket won't work", "Higher electricity bills"], correctAnswer: 1, explanation: "Reversed polarity means the neutral is switched, leaving equipment live even when switched off.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Safety", category: "Polarity & Functional Testing" },
  { id: 139, question: "How is polarity tested during dead testing?", options: ["Using a voltage tester", "Using a continuity tester between specific conductors", "By visual inspection only", "Using an RCD tester"], correctAnswer: 1, explanation: "During dead testing, continuity tests between specific conductors verify correct polarity.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Test Methods", category: "Polarity & Functional Testing" },
  { id: 140, question: "Where should the centre contact of an Edison screw lampholder be connected?", options: ["To neutral", "To earth", "To the phase (line) conductor", "Either conductor is acceptable"], correctAnswer: 2, explanation: "The centre contact must be connected to phase for safety.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Lampholder Polarity", category: "Polarity & Functional Testing" },
  { id: 141, question: "What is a functional test?", options: ["A dead test only", "A test to verify equipment operates as intended when energised", "A continuity test", "An insulation test"], correctAnswer: 1, explanation: "Functional testing verifies that equipment and systems operate correctly when energised.", section: "Polarity & Functional Testing", difficulty: "basic", topic: "Definitions", category: "Polarity & Functional Testing" },
  { id: 142, question: "What should be functionally tested on a lighting circuit?", options: ["Just that lights come on", "Switching, dimming (if applicable), and correct operation of controls", "Cable colour only", "Socket outlets"], correctAnswer: 1, explanation: "Functional testing includes verifying switches operate correctly and dimmers function.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Lighting Circuits", category: "Polarity & Functional Testing" },
  { id: 143, question: "What is the purpose of testing interlocks?", options: ["To verify door security", "To confirm safety interlocks prevent dangerous situations", "To test padlocks", "To verify continuity"], correctAnswer: 1, explanation: "Interlock testing confirms safety devices prevent operation under dangerous conditions.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Interlocks", category: "Polarity & Functional Testing" },
  { id: 144, question: "What should be verified when testing a switched fused connection unit?", options: ["Only that power flows", "Correct polarity, fuse rating, and that the switch breaks the phase", "Cable colour only", "Just the fuse size"], correctAnswer: 1, explanation: "Check correct polarity, appropriate fuse rating, and that the switch is in the phase conductor.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "FCUs", category: "Polarity & Functional Testing" },
  { id: 145, question: "How is polarity verified in a live installation?", options: ["Using an ohmmeter", "Using a voltage indicator or socket tester", "By smell", "Using an insulation tester"], correctAnswer: 1, explanation: "A voltage indicator or socket tester can verify polarity in an energised installation.", section: "Polarity & Functional Testing", difficulty: "basic", topic: "Live Testing", category: "Polarity & Functional Testing" },
  { id: 146, question: "What does a socket tester indicate about polarity?", options: ["Detailed measurements", "Whether phase, neutral and earth are correctly connected using LED indicators", "The voltage level", "Current flow"], correctAnswer: 1, explanation: "Socket testers use LEDs to indicate correct or incorrect polarity and earth connection.", section: "Polarity & Functional Testing", difficulty: "basic", topic: "Test Equipment", category: "Polarity & Functional Testing" },
  { id: 147, question: "Why should polarity be verified at the origin of the installation?", options: ["It's not necessary", "To confirm the supply has correct phase and neutral identification", "To measure voltage", "To test the meter"], correctAnswer: 1, explanation: "Verifying polarity at the origin ensures the incoming supply is correctly identified.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Origin Polarity", category: "Polarity & Functional Testing" },
  { id: 148, question: "What is checked during functional testing of an isolator?", options: ["Just that it switches", "That it isolates all poles and auxiliary contacts operate correctly", "Cable size only", "Earth connection"], correctAnswer: 1, explanation: "Verify the isolator disconnects all intended poles and any auxiliary contacts function correctly.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Isolators", category: "Polarity & Functional Testing" },
  { id: 149, question: "What must be verified for a correctly wired 13A socket outlet?", options: ["Only that appliances work", "Earth is top, neutral left, phase right when viewed face-on", "Any configuration is acceptable", "Just the earth connection"], correctAnswer: 1, explanation: "Correct polarity is earth at top, neutral on left, line on right when viewing the socket face-on.", section: "Polarity & Functional Testing", difficulty: "basic", topic: "Socket Polarity", category: "Polarity & Functional Testing" },
  { id: 150, question: "What should be tested on emergency lighting systems?", options: ["Just that lights work on mains", "Changeover to battery, duration under load, and charging", "Colour of lights only", "Switch operation"], correctAnswer: 1, explanation: "Emergency lighting must be tested for changeover operation, battery duration, and proper charging.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Emergency Lighting", category: "Polarity & Functional Testing" },
  { id: 151, question: "What is the purpose of phase rotation testing?", options: ["To check single phase supplies", "To verify correct phase sequence in three-phase installations", "To measure frequency", "To test earth connection"], correctAnswer: 1, explanation: "Phase rotation testing verifies the correct sequence of phases in three-phase installations.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Three-Phase", category: "Polarity & Functional Testing" },
  { id: 152, question: "Why is correct phase rotation important for motors?", options: ["It doesn't matter for motors", "Incorrect rotation causes motors to run backwards", "It affects motor colour", "It changes motor speed"], correctAnswer: 1, explanation: "Incorrect phase rotation causes three-phase motors to run in the opposite direction.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Motors", category: "Polarity & Functional Testing" },
  { id: 153, question: "What instrument is used to check phase rotation?", options: ["Multimeter", "Phase rotation indicator or meter", "Insulation tester", "RCD tester"], correctAnswer: 1, explanation: "A phase rotation indicator or meter is used to check the sequence of phases.", section: "Polarity & Functional Testing", difficulty: "basic", topic: "Test Equipment", category: "Polarity & Functional Testing" },
  { id: 154, question: "What should be verified when testing a cooker control unit?", options: ["Colour only", "Correct polarity, switch in phase conductor, and socket polarity if fitted", "Just that it gets hot", "Cable size"], correctAnswer: 1, explanation: "Verify correct polarity, switch in phase conductor, and if a socket is fitted, its polarity too.", section: "Polarity & Functional Testing", difficulty: "intermediate", topic: "Cooker Controls", category: "Polarity & Functional Testing" },
  { id: 155, question: "What does functional testing of fire alarm interfaces include?", options: ["Just checking detector operation", "Verifying cause and effect relationships with other systems", "Painting detection equipment", "Measuring cable resistance"], correctAnswer: 1, explanation: "Testing fire alarm interfaces includes verifying cause and effect with linked systems.", section: "Polarity & Functional Testing", difficulty: "advanced", topic: "Fire Alarms", category: "Polarity & Functional Testing" },
  // Questions 156-175: Visual Inspection & Documentation
  { id: 156, question: "When should visual inspection be carried out?", options: ["Only after testing", "Before testing, with the installation isolated", "Only during energised conditions", "At any convenient time"], correctAnswer: 1, explanation: "Visual inspection should be carried out before testing, with the installation safely isolated.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Sequence", category: "Visual Inspection & Documentation" },
  { id: 157, question: "What does visual inspection verify?", options: ["Test results only", "Compliance with standards, correct installation, and absence of damage", "Cable lengths", "Energy efficiency"], correctAnswer: 1, explanation: "Visual inspection verifies compliance with standards, correct installation methods, and absence of visible damage.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Purpose", category: "Visual Inspection & Documentation" },
  { id: 158, question: "What should be checked regarding cable selection during visual inspection?", options: ["Colour preferences", "Correct type, current-carrying capacity, and suitability for the environment", "Cost", "Manufacturer"], correctAnswer: 1, explanation: "Check cables are correct type for the application, have adequate current-carrying capacity, and suit the environment.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Selection", category: "Visual Inspection & Documentation" },
  { id: 159, question: "What is checked regarding connection of conductors?", options: ["Just that cables are present", "Correct termination, tightness, and protection of connections", "Cable colour", "Cable cost"], correctAnswer: 1, explanation: "Check conductors are correctly terminated, connections are tight, and terminations are protected.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Connections", category: "Visual Inspection & Documentation" },
  { id: 160, question: "What identification should conductors have?", options: ["Any colour is acceptable", "Correct colour coding or marking as per BS 7671", "No identification needed", "Only earth needs marking"], correctAnswer: 1, explanation: "Conductors must be correctly identified using standard colour coding or marking as required by BS 7671.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Identification", category: "Visual Inspection & Documentation" },
  { id: 161, question: "What protective measures should be verified during visual inspection?", options: ["Just fuse sizes", "Basic protection, fault protection, and additional protection", "Only earth bonding", "Cable clips"], correctAnswer: 1, explanation: "Verify all protective measures including basic protection, fault protection, and additional protection methods.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Protection", category: "Visual Inspection & Documentation" },
  { id: 162, question: "What should be checked for consumer units and distribution boards?", options: ["Just the label", "Correct rating, secure fixing, circuit identification, and protection from damage", "Colour only", "Age of equipment"], correctAnswer: 1, explanation: "Check ratings are adequate, fixing is secure, circuits are identified, and there's protection from damage.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Distribution Equipment", category: "Visual Inspection & Documentation" },
  { id: 163, question: "What condition of accessories should be noted?", options: ["Only the colour", "Signs of damage, deterioration, overheating, or unsafe conditions", "Brand names", "Installation date"], correctAnswer: 1, explanation: "Note any damage, signs of overheating, deterioration, or conditions that make accessories unsafe.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Accessories", category: "Visual Inspection & Documentation" },
  { id: 164, question: "What is the purpose of circuit diagrams and schedules?", options: ["To decorate the consumer unit", "To provide clear information for future work and maintenance", "To satisfy building regulations only", "Optional documentation"], correctAnswer: 1, explanation: "Circuit diagrams and schedules provide essential information for future work, maintenance, and fault finding.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Documentation", category: "Visual Inspection & Documentation" },
  { id: 165, question: "What should be checked regarding basic protection?", options: ["Only insulation colour", "Insulation, barriers, enclosures, and obstacles are adequate", "Cable length", "Manufacturer details"], correctAnswer: 1, explanation: "Verify insulation, barriers, enclosures, and obstacles provide adequate protection against direct contact.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Basic Protection", category: "Visual Inspection & Documentation" },
  { id: 166, question: "What IP rating information should be verified during visual inspection?", options: ["IP rating is not important", "Enclosure IP rating is suitable for the location and environment", "Only for bathrooms", "Only the first digit"], correctAnswer: 1, explanation: "Verify enclosure IP rating is suitable for the location, considering water, dust, and impact protection needs.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "IP Ratings", category: "Visual Inspection & Documentation" },
  { id: 167, question: "What should be checked for cables passing through walls or floors?", options: ["Nothing special", "Protection against mechanical damage and fire stopping where required", "Just cable colour", "Only in commercial premises"], correctAnswer: 1, explanation: "Check cables are protected against mechanical damage and fire stopping is provided where penetrating fire barriers.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Protection", category: "Visual Inspection & Documentation" },
  { id: 168, question: "What documentation should be available at the installation?", options: ["None required", "Previous certificates, circuit schedules, and instructions for operation", "Only the original invoice", "Just the user manual"], correctAnswer: 1, explanation: "Previous certificates, up-to-date circuit schedules, and operating instructions should be available.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Documentation", category: "Visual Inspection & Documentation" },
  { id: 169, question: "What must an EICR include?", options: ["Just a pass/fail statement", "Observations, classification codes, recommendations, and test results", "Only test results", "Only the inspector's name"], correctAnswer: 1, explanation: "An EICR must include observations with classification codes, recommendations, and schedule of test results.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "EICR Content", category: "Visual Inspection & Documentation" },
  { id: 170, question: "What does the term 'extent and limitations' refer to in an EICR?", options: ["The cost of the inspection", "The parts of the installation inspected and any areas not accessible", "The time spent", "The inspector's qualifications"], correctAnswer: 1, explanation: "Extent and limitations describes what was inspected and any parts that couldn't be accessed or tested.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "EICR Content", category: "Visual Inspection & Documentation" },
  { id: 171, question: "What Schedule is used to record test results on an EICR?", options: ["Schedule A", "Schedule of Inspections and Schedule of Test Results", "Schedule C", "Results Summary"], correctAnswer: 1, explanation: "The Schedule of Inspections and Schedule of Test Results record inspection items and test measurements.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "EICR Schedules", category: "Visual Inspection & Documentation" },
  { id: 172, question: "Who should sign the EICR?", options: ["Anyone present", "The competent person who carried out the inspection and testing", "Only the building owner", "The electrician's employer only"], correctAnswer: 1, explanation: "The competent person who carried out the inspection and testing must sign the EICR.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "EICR Signing", category: "Visual Inspection & Documentation" },
  { id: 173, question: "What is the recommended date for next inspection on an EICR?", options: ["Always 10 years", "Based on installation type, use, and condition found", "Always 5 years", "Not required"], correctAnswer: 1, explanation: "The recommended date is based on installation type, use, environment, and condition found during inspection.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Next Inspection", category: "Visual Inspection & Documentation" },
  { id: 174, question: "What should be done with old documentation when issuing a new EICR?", options: ["Destroy it", "Review it to understand the installation history", "Ignore it", "Return it to the manufacturer"], correctAnswer: 1, explanation: "Previous documentation should be reviewed to understand installation history and previous issues.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Previous Documentation", category: "Visual Inspection & Documentation" },
  { id: 175, question: "How should sampling be recorded on an EICR?", options: ["Sampling doesn't need recording", "The extent and method of sampling must be clearly stated", "Just note 'sampled'", "Only if defects found"], correctAnswer: 1, explanation: "Where sampling is used, the extent and method must be clearly stated in the limitations.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Sampling", category: "Visual Inspection & Documentation" },
  // Questions 176-200: Additional spread across categories
  { id: 176, question: "What does the term 'competent person' mean in inspection and testing?", options: ["Anyone who is an electrician", "A person with relevant knowledge, skills, and experience", "Only a certified inspector", "The building owner"], correctAnswer: 1, explanation: "A competent person has the necessary knowledge, skills, and experience for the work being undertaken.", section: "Introduction", difficulty: "basic", topic: "Competence", category: "Introduction & Fundamentals" },
  { id: 177, question: "What is the recommended inspection interval for agricultural installations?", options: ["1 year", "3 years", "5 years", "10 years"], correctAnswer: 1, explanation: "Agricultural installations typically require inspection every 3 years due to harsh environmental conditions.", section: "Introduction", difficulty: "intermediate", topic: "Inspection Intervals", category: "Introduction & Fundamentals" },
  { id: 178, question: "What is the purpose of an Electrical Installation Certificate (EIC)?", options: ["To prove the electrician is qualified", "To certify that a new installation complies with BS 7671", "To record annual maintenance", "To provide insurance"], correctAnswer: 1, explanation: "An EIC certifies that a new installation or addition has been designed, constructed, inspected, and tested in accordance with BS 7671.", section: "Introduction", difficulty: "basic", topic: "Certification", category: "Introduction & Fundamentals" },
  { id: 179, question: "When should a Minor Electrical Installation Works Certificate be issued?", options: ["For any electrical work", "For minor additions not involving a new circuit", "Only for new installations", "Only for testing"], correctAnswer: 1, explanation: "A Minor Works Certificate is for additions to existing circuits that do not require an EIC.", section: "Introduction", difficulty: "intermediate", topic: "Certification", category: "Introduction & Fundamentals" },
  { id: 180, question: "What is Part P of the Building Regulations concerned with?", options: ["Structural safety", "Electrical safety in dwellings", "Fire alarms only", "Energy efficiency"], correctAnswer: 1, explanation: "Part P of the Building Regulations covers electrical safety in dwellings in England.", section: "Introduction", difficulty: "intermediate", topic: "Regulations", category: "Introduction & Fundamentals" },
  { id: 181, question: "What voltage is considered 'extra-low voltage' (ELV)?", options: ["Below 230V", "Not exceeding 50V AC or 120V DC", "Below 12V only", "Below 400V"], correctAnswer: 1, explanation: "Extra-low voltage is defined as not exceeding 50V AC or 120V DC between conductors or to earth.", section: "Safe Isolation", difficulty: "intermediate", topic: "Voltage Definitions", category: "Safe Isolation" },
  { id: 182, question: "What is the purpose of an isolation procedure?", options: ["To save energy", "To prevent unexpected energisation during work", "To test equipment", "To measure voltage"], correctAnswer: 1, explanation: "Isolation procedures prevent unexpected energisation while work is being carried out.", section: "Safe Isolation", difficulty: "basic", topic: "Purpose", category: "Safe Isolation" },
  { id: 183, question: "What does 'proving dead' mean?", options: ["Checking the circuit is old", "Verifying the absence of voltage at the work location", "Testing insulation", "Checking continuity"], correctAnswer: 1, explanation: "Proving dead means verifying the complete absence of dangerous voltage at the work location.", section: "Safe Isolation", difficulty: "basic", topic: "Definitions", category: "Safe Isolation" },
  { id: 184, question: "What is the minimum test current for continuity testing as per BS 7671?", options: ["100mA", "200mA", "500mA", "1A"], correctAnswer: 1, explanation: "BS 7671 specifies a minimum test current of 200mA for continuity testing.", section: "Continuity Testing", difficulty: "intermediate", topic: "Test Parameters", category: "Continuity Testing" },
  { id: 185, question: "What might a reading of OL (overload) on a continuity tester indicate?", options: ["Good continuity", "An open circuit or break in the conductor", "Low resistance", "Normal operation"], correctAnswer: 1, explanation: "OL indicates the resistance is too high to measure, suggesting an open circuit or break.", section: "Continuity Testing", difficulty: "intermediate", topic: "Interpreting Results", category: "Continuity Testing" },
  { id: 186, question: "Why is it important to null test leads before continuity testing?", options: ["To charge the battery", "To subtract lead resistance from measurements", "To test the instrument", "It's not important"], correctAnswer: 1, explanation: "Nulling test leads subtracts their resistance to ensure accurate circuit measurements.", section: "Continuity Testing", difficulty: "basic", topic: "Test Procedure", category: "Continuity Testing" },
  { id: 187, question: "What test voltage should be used for SELV circuits not exceeding 25V AC?", options: ["500V DC", "250V DC", "1000V DC", "100V DC"], correctAnswer: 1, explanation: "SELV circuits not exceeding 25V AC should be tested at 250V DC.", section: "Insulation Resistance", difficulty: "advanced", topic: "Test Parameters", category: "Insulation Resistance" },
  { id: 188, question: "What effect does humidity have on insulation resistance?", options: ["No effect", "High humidity typically reduces insulation resistance", "Humidity increases resistance", "Only affects AC circuits"], correctAnswer: 1, explanation: "High humidity can reduce insulation resistance due to moisture absorption by insulation materials.", section: "Insulation Resistance", difficulty: "intermediate", topic: "Environmental Factors", category: "Insulation Resistance" },
  { id: 189, question: "Why should SPDs be disconnected before insulation testing?", options: ["They don't need disconnecting", "The test voltage could damage them or give false readings", "To save time", "For convenience only"], correctAnswer: 1, explanation: "SPDs may conduct or be damaged at the 500V test voltage, and would give false low readings.", section: "Insulation Resistance", difficulty: "intermediate", topic: "Test Procedure", category: "Insulation Resistance" },
  { id: 190, question: "What is the formula for calculating prospective earth fault current?", options: ["PEFC = Uo × Zs", "PEFC = Uo / Zs", "PEFC = Zs / Uo", "PEFC = Uo + Zs"], correctAnswer: 1, explanation: "Prospective Earth Fault Current = Uo (nominal voltage) divided by Zs (earth fault loop impedance).", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Calculations", category: "Earth Fault Loop Impedance" },
  { id: 191, question: "Why is temperature correction applied to Zs measurements?", options: ["To adjust for season", "Conductors have higher resistance at operating temperature than when cold", "For billing purposes", "It's not necessary"], correctAnswer: 1, explanation: "Conductor resistance increases with temperature, so cold measurements must be corrected for operating conditions.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "Temperature Correction", category: "Earth Fault Loop Impedance" },
  { id: 192, question: "What is the maximum Zs for a 6A Type B MCB?", options: ["7.67Ω", "3.83Ω", "1.92Ω", "0.96Ω"], correctAnswer: 0, explanation: "For a 6A Type B MCB, maximum Zs is 7.67Ω to achieve 0.4 second disconnection.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "Maximum Values", category: "Earth Fault Loop Impedance" },
  { id: 193, question: "What is the tripping characteristic of a Type B RCD?", options: ["Trips on DC current only", "Trips on AC sinusoidal, pulsating DC and smooth DC", "Trips on smooth DC only", "Delayed trip"], correctAnswer: 1, explanation: "Type B RCDs trip on AC sinusoidal, pulsating DC, and smooth DC residual currents.", section: "RCD Testing", difficulty: "advanced", topic: "RCD Types", category: "RCD Testing" },
  { id: 194, question: "What test current is used for the non-trip test of a 30mA RCD?", options: ["30mA", "15mA (50% of rating)", "45mA", "150mA"], correctAnswer: 1, explanation: "The non-trip test uses 50% of rated current (15mA for a 30mA RCD).", section: "RCD Testing", difficulty: "intermediate", topic: "Test Parameters", category: "RCD Testing" },
  { id: 195, question: "What is the purpose of the 0° and 180° test on an RCD?", options: ["To test different brands", "To test on both halves of the AC waveform", "To test at different times", "Not required"], correctAnswer: 1, explanation: "Testing at 0° and 180° verifies the RCD trips correctly on both positive and negative halves of the AC waveform.", section: "RCD Testing", difficulty: "advanced", topic: "Test Methods", category: "RCD Testing" },
  { id: 196, question: "What does IP44 rating indicate?", options: ["No protection", "Protected against objects >1mm and water splashes", "Waterproof", "Protected against immersion"], correctAnswer: 1, explanation: "IP44 means protected against objects >1mm diameter and water splashing from any direction.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "IP Ratings", category: "Visual Inspection & Documentation" },
  { id: 197, question: "What is the minimum IP rating for a bathroom Zone 1?", options: ["IP20", "IPX4", "IPX7", "IP68"], correctAnswer: 1, explanation: "Bathroom Zone 1 requires minimum IPX4 (protected against water splashes).", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "IP Ratings", category: "Visual Inspection & Documentation" },
  { id: 198, question: "What should be checked regarding cable support and fixings?", options: ["Only appearance", "Adequate support, correct spacing, and suitable for cable type/weight", "Colour only", "Brand of clips"], correctAnswer: 1, explanation: "Check cables are adequately supported at correct intervals with fixings suitable for cable type and weight.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 199, question: "What is the purpose of testing voltage drop?", options: ["To measure battery", "To verify voltage at load is within acceptable limits", "To test insulation", "To test continuity"], correctAnswer: 1, explanation: "Voltage drop testing ensures voltage at the load terminals is within acceptable limits for equipment operation.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Voltage Drop", category: "Earth Fault Loop Impedance" },
  { id: 200, question: "What final checks should be made before re-energising after testing?", options: ["None needed", "All connections secure, covers replaced, no tools left, all tests complete", "Just visual check", "Only verify main switch"], correctAnswer: 1, explanation: "Verify all connections are secure, covers replaced, no tools left behind, and all testing is complete and documented.", section: "Introduction", difficulty: "basic", topic: "Final Checks", category: "Introduction & Fundamentals" },
  // Questions 201-250: More variety
  { id: 201, question: "What is the IET Guidance Note 3 primarily about?", options: ["Cable sizing", "Inspection and testing", "Earthing", "Protection"], correctAnswer: 1, explanation: "IET Guidance Note 3 provides detailed guidance on inspection and testing procedures.", section: "Introduction", difficulty: "intermediate", topic: "Guidance Documents", category: "Introduction & Fundamentals" },
  { id: 202, question: "What should be done before using any test instrument?", options: ["Nothing special", "Check calibration date, condition, and battery level", "Just switch it on", "Read the manual only"], correctAnswer: 1, explanation: "Check the instrument is within calibration, in good condition, and has adequate battery before use.", section: "Safe Isolation", difficulty: "basic", topic: "Test Equipment", category: "Safe Isolation" },
  { id: 203, question: "What is the purpose of the R1+R2 measurement?", options: ["To verify polarity", "To calculate Zs when added to Ze", "To test insulation", "To verify RCD operation"], correctAnswer: 1, explanation: "R1+R2 measurement is used to calculate expected Zs values: Zs = Ze + R1+R2.", section: "Continuity Testing", difficulty: "intermediate", topic: "Purpose", category: "Continuity Testing" },
  { id: 204, question: "What is the difference between live testing and dead testing?", options: ["No difference", "Dead testing is done with power off, live testing with power on", "Live testing is faster", "Dead testing is more accurate"], correctAnswer: 1, explanation: "Dead testing is performed with the circuit de-energised; live testing is performed with the circuit energised.", section: "Introduction", difficulty: "basic", topic: "Testing Types", category: "Introduction & Fundamentals" },
  { id: 205, question: "What should be recorded if a circuit cannot be tested?", options: ["Nothing", "The reason and limitation in the report", "Just skip it", "Mark as passed"], correctAnswer: 1, explanation: "Any circuits that cannot be tested must have the reason and limitation clearly recorded in the report.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Limitations", category: "Visual Inspection & Documentation" },
  { id: 206, question: "What is the maximum Zs for a 40A Type B MCB?", options: ["1.15Ω", "0.72Ω", "2.30Ω", "0.57Ω"], correctAnswer: 0, explanation: "For a 40A Type B MCB, maximum Zs is 1.15Ω to achieve 0.4 second disconnection.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "Maximum Values", category: "Earth Fault Loop Impedance" },
  { id: 207, question: "How often should RCDs be tested by the user using the test button?", options: ["Annually", "Monthly", "Quarterly", "Weekly"], correctAnswer: 2, explanation: "Users should test RCDs using the test button at least quarterly (every 3 months).", section: "RCD Testing", difficulty: "basic", topic: "User Testing", category: "RCD Testing" },
  { id: 208, question: "What is the significance of the 18th Edition wiring regulations?", options: ["It's outdated", "It's the current edition of BS 7671 requirements", "It only applies to industrial premises", "It's voluntary guidance"], correctAnswer: 1, explanation: "The 18th Edition is the current edition of BS 7671, setting requirements for electrical installations.", section: "Introduction", difficulty: "basic", topic: "Standards", category: "Introduction & Fundamentals" },
  { id: 209, question: "What is the maximum trip time for a general RCD at 5 times rated current?", options: ["40ms", "100ms", "200ms", "300ms"], correctAnswer: 0, explanation: "At 5 times rated current, maximum trip time is 40ms.", section: "RCD Testing", difficulty: "intermediate", topic: "Trip Times", category: "RCD Testing" },
  { id: 210, question: "What should be verified about protective device ratings during inspection?", options: ["Just that they're present", "Rating is appropriate for the circuit and cable", "Brand name", "Colour"], correctAnswer: 1, explanation: "Verify protective device ratings are appropriate for the circuit design current and cable current-carrying capacity.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Protective Devices", category: "Visual Inspection & Documentation" },
  { id: 211, question: "What is the typical resistance per metre of 2.5mm² copper conductor?", options: ["18.1mΩ/m", "7.41mΩ/m", "4.61mΩ/m", "1.83mΩ/m"], correctAnswer: 1, explanation: "2.5mm² copper conductor has a resistance of approximately 7.41mΩ per metre at 20°C.", section: "Continuity Testing", difficulty: "advanced", topic: "Cable Resistance", category: "Continuity Testing" },
  { id: 212, question: "What is the purpose of testing earth electrode resistance?", options: ["To verify cable size", "To verify the earth electrode provides adequate earthing", "To test insulation", "To test RCDs"], correctAnswer: 1, explanation: "Earth electrode resistance testing verifies the electrode provides an adequate connection to earth for TT systems.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Earth Electrodes", category: "Earth Fault Loop Impedance" },
  { id: 213, question: "What is the maximum earth electrode resistance typically acceptable for a TT system with 30mA RCD?", options: ["1667Ω", "200Ω", "21Ω", "0.8Ω"], correctAnswer: 0, explanation: "For a 30mA RCD providing fault protection, maximum electrode resistance is 50V/0.03A = 1667Ω.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "Earth Electrodes", category: "Earth Fault Loop Impedance" },
  { id: 214, question: "What is discrimination between protective devices?", options: ["Choosing brands", "Ensuring only the device nearest the fault operates", "Testing devices", "Installing devices"], correctAnswer: 1, explanation: "Discrimination ensures the protective device nearest the fault operates first.", section: "Introduction", difficulty: "intermediate", topic: "Discrimination", category: "Introduction & Fundamentals" },
  { id: 215, question: "What should be checked about cable routes during visual inspection?", options: ["Nothing special", "Protection from damage, correct zones, and separation from other services", "Colour only", "Length only"], correctAnswer: 1, explanation: "Check cables are protected from damage, installed in correct zones, and properly separated from other services.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Routes", category: "Visual Inspection & Documentation" },
  { id: 216, question: "What is the purpose of labelling at the consumer unit?", options: ["Decoration", "To identify circuits for safe isolation and future work", "Legal requirement only", "Optional"], correctAnswer: 1, explanation: "Circuit labelling allows safe identification for isolation and future maintenance or modification work.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Labelling", category: "Visual Inspection & Documentation" },
  { id: 217, question: "What is the purpose of periodic testing compared to initial verification?", options: ["The same purpose", "To assess deterioration and continued safety of an existing installation", "Less thorough", "More thorough"], correctAnswer: 1, explanation: "Periodic inspection assesses deterioration and verifies continued safe operation of an existing installation.", section: "Introduction", difficulty: "intermediate", topic: "Testing Types", category: "Introduction & Fundamentals" },
  { id: 218, question: "What should be done if unsafe conditions are found that cannot be immediately rectified?", options: ["Ignore them", "Isolate the affected circuit and clearly inform the client", "Complete testing first", "Document and leave"], correctAnswer: 1, explanation: "Unsafe conditions that cannot be immediately rectified should be isolated and the client clearly informed.", section: "Introduction", difficulty: "basic", topic: "Safety Actions", category: "Introduction & Fundamentals" },
  { id: 219, question: "What is the difference between bonding and earthing?", options: ["No difference", "Earthing connects to earth, bonding connects conductive parts together", "Bonding is for lightning", "They are the same"], correctAnswer: 1, explanation: "Earthing provides a connection to the general mass of earth; bonding connects conductive parts to maintain equipotential.", section: "Continuity Testing", difficulty: "intermediate", topic: "Definitions", category: "Continuity Testing" },
  { id: 220, question: "What is an extraneous-conductive-part?", options: ["Any metal part", "A conductive part not forming part of the installation but liable to introduce a potential", "Cable armouring", "Equipment earth"], correctAnswer: 1, explanation: "An extraneous-conductive-part is not part of the electrical installation but could introduce a potential.", section: "Continuity Testing", difficulty: "intermediate", topic: "Definitions", category: "Continuity Testing" },
  { id: 221, question: "What is an exposed-conductive-part?", options: ["Any bare conductor", "A conductive part of equipment that can be touched and may become live under fault", "Cable sheath", "Conduit only"], correctAnswer: 1, explanation: "An exposed-conductive-part is part of equipment that can be touched and could become live under fault conditions.", section: "Continuity Testing", difficulty: "intermediate", topic: "Definitions", category: "Continuity Testing" },
  { id: 222, question: "What does AFDD stand for?", options: ["Automatic Fault Detection Device", "Arc Fault Detection Device", "Automatic Fire Detection Device", "Arc Fire Detection Device"], correctAnswer: 1, explanation: "AFDD stands for Arc Fault Detection Device, which detects dangerous arcing faults.", section: "Introduction", difficulty: "intermediate", topic: "Devices", category: "Introduction & Fundamentals" },
  { id: 223, question: "What is the function of an SPD (Surge Protection Device)?", options: ["Overcurrent protection", "Protection against transient overvoltages", "RCD function", "Insulation testing"], correctAnswer: 1, explanation: "SPDs protect against transient overvoltages caused by lightning strikes or switching surges.", section: "Introduction", difficulty: "intermediate", topic: "SPD", category: "Introduction & Fundamentals" },
  { id: 224, question: "What is the recommended inspection interval for construction sites?", options: ["1 year", "3 months", "6 months", "2 years"], correctAnswer: 1, explanation: "Construction sites typically require inspection every 3 months due to the harsh and changing environment.", section: "Introduction", difficulty: "intermediate", topic: "Inspection Intervals", category: "Introduction & Fundamentals" },
  { id: 225, question: "What does ADS stand for in protective device terms?", options: ["Automatic Detection System", "Automatic Disconnection of Supply", "Alternative Distribution System", "Automatic Device Selection"], correctAnswer: 1, explanation: "ADS stands for Automatic Disconnection of Supply, a protective measure against electric shock.", section: "Introduction", difficulty: "basic", topic: "Abbreviations", category: "Introduction & Fundamentals" },
  // Questions 226-275
  { id: 226, question: "What is meant by touch voltage?", options: ["Mains voltage", "Voltage between simultaneously accessible parts during a fault", "Test voltage", "Battery voltage"], correctAnswer: 1, explanation: "Touch voltage is the voltage appearing between simultaneously accessible parts during a fault.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Touch Voltage", category: "Earth Fault Loop Impedance" },
  { id: 227, question: "What is the maximum permissible touch voltage in normal dry conditions?", options: ["12V", "25V", "50V AC", "120V"], correctAnswer: 2, explanation: "The maximum permissible touch voltage in normal conditions is 50V AC or 120V ripple-free DC.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Touch Voltage", category: "Earth Fault Loop Impedance" },
  { id: 228, question: "What is the purpose of Class II (double insulated) equipment?", options: ["Better appearance", "Protection by double or reinforced insulation without earthing", "Higher power rating", "Lower cost"], correctAnswer: 1, explanation: "Class II equipment provides protection through double or reinforced insulation, not relying on earthing.", section: "Introduction", difficulty: "intermediate", topic: "Equipment Classes", category: "Introduction & Fundamentals" },
  { id: 229, question: "What symbol indicates Class II equipment?", options: ["Earth symbol", "Double square symbol", "Triangle", "Circle"], correctAnswer: 1, explanation: "Class II equipment is marked with a double square symbol (square within a square).", section: "Introduction", difficulty: "basic", topic: "Equipment Classes", category: "Introduction & Fundamentals" },
  { id: 230, question: "What is a TN-S earthing system?", options: ["Combined earth and neutral", "Separate earth conductor from the supply transformer", "Local earth electrode", "Isolated system"], correctAnswer: 1, explanation: "TN-S has a separate earth conductor provided from the supply transformer or substation.", section: "Introduction", difficulty: "intermediate", topic: "Earthing Systems", category: "Introduction & Fundamentals" },
  { id: 231, question: "What is a TN-C-S (PME) earthing system?", options: ["Fully separate system", "Combined PEN in supply, separated in installation", "Local earth electrode only", "No earth provided"], correctAnswer: 1, explanation: "TN-C-S (PME) has combined neutral/earth in the supply network, separated at the origin of the installation.", section: "Introduction", difficulty: "intermediate", topic: "Earthing Systems", category: "Introduction & Fundamentals" },
  { id: 232, question: "What is a TT earthing system?", options: ["Supply provides earth", "Installation has its own earth electrode", "No earth required", "Combined system"], correctAnswer: 1, explanation: "TT systems use a local earth electrode at the installation as the supply does not provide an earth.", section: "Introduction", difficulty: "intermediate", topic: "Earthing Systems", category: "Introduction & Fundamentals" },
  { id: 233, question: "Why do TT systems typically require RCD protection?", options: ["For convenience", "Because Ze is typically too high for overcurrent devices alone", "To save money", "They don't require RCDs"], correctAnswer: 1, explanation: "TT systems have high Ze values, so RCDs are needed as overcurrent devices cannot disconnect quickly enough.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "TT Systems", category: "Earth Fault Loop Impedance" },
  { id: 234, question: "What is the purpose of the main earthing terminal (MET)?", options: ["Decoration", "Central point connecting all earthing and bonding conductors", "Power distribution", "Neutral connection"], correctAnswer: 1, explanation: "The MET is the central point where earthing conductor, bonding conductors, and CPCs are connected together.", section: "Continuity Testing", difficulty: "basic", topic: "MET", category: "Continuity Testing" },
  { id: 235, question: "What should be checked when inspecting the MET?", options: ["Nothing special", "Secure connections, adequate size, accessibility, and correct labelling", "Colour only", "Position only"], correctAnswer: 1, explanation: "Check MET connections are secure, conductors are adequate size, it's accessible, and correctly labelled.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "MET", category: "Visual Inspection & Documentation" },
  { id: 236, question: "What is the minimum CSA for main bonding conductors in domestic installations with 25mm² tails?", options: ["4mm²", "6mm²", "10mm²", "16mm²"], correctAnswer: 2, explanation: "For installations with 25mm² tails, main bonding conductors should be minimum 10mm².", section: "Continuity Testing", difficulty: "advanced", topic: "Bonding", category: "Continuity Testing" },
  { id: 237, question: "What is the purpose of equipotential bonding?", options: ["Power distribution", "To maintain all conductive parts at the same potential", "Cable sizing", "Circuit protection"], correctAnswer: 1, explanation: "Equipotential bonding maintains all accessible conductive parts at the same potential to prevent shock.", section: "Continuity Testing", difficulty: "intermediate", topic: "Bonding", category: "Continuity Testing" },
  { id: 238, question: "What services typically require main bonding?", options: ["Nothing", "Gas, water, oil, and structural steel", "Only gas", "Only water"], correctAnswer: 1, explanation: "Main bonding is typically required for incoming gas, water, oil pipes, and structural steel if extraneous.", section: "Continuity Testing", difficulty: "intermediate", topic: "Bonding", category: "Continuity Testing" },
  { id: 239, question: "Where should main bonding connections be made on metallic service pipes?", options: ["Anywhere", "Within 600mm of the meter or point of entry", "At the meter only", "Outside the building"], correctAnswer: 1, explanation: "Main bonding should be connected within 600mm of the meter position or point of entry to the building.", section: "Continuity Testing", difficulty: "intermediate", topic: "Bonding", category: "Continuity Testing" },
  { id: 240, question: "What is the requirement for consumer unit enclosures in domestic installations?", options: ["Any material", "Non-combustible material or metal enclosure", "Wood is acceptable", "Plastic preferred"], correctAnswer: 1, explanation: "Consumer unit enclosures in domestic premises must be non-combustible (e.g., metal or fire-resistant material).", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Consumer Units", category: "Visual Inspection & Documentation" },
  { id: 241, question: "What does IP2X or IPXXB mean regarding consumer units?", options: ["Waterproof", "Protection against finger contact when cover is removed", "Dust proof", "Impact resistance"], correctAnswer: 1, explanation: "IP2X or IPXXB rating means internal parts are protected against finger contact when the cover is removed.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "IP Ratings", category: "Visual Inspection & Documentation" },
  { id: 242, question: "What is the purpose of cable glands?", options: ["Appearance", "To provide strain relief, earth continuity, and environmental sealing", "Colour coding", "Measurement"], correctAnswer: 1, explanation: "Cable glands provide strain relief, maintain earth continuity (for SWA), and environmental sealing.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 243, question: "What does SWA stand for?", options: ["Single Wire Armoured", "Steel Wire Armoured", "Standard Wire Application", "Secure Wire Arrangement"], correctAnswer: 1, explanation: "SWA stands for Steel Wire Armoured, a type of cable with steel wire armouring for mechanical protection.", section: "Introduction", difficulty: "basic", topic: "Cable Types", category: "Introduction & Fundamentals" },
  { id: 244, question: "Can SWA cable armouring be used as a CPC?", options: ["Never", "Yes, if correctly terminated with appropriate glands", "Only for lighting", "Only for sockets"], correctAnswer: 1, explanation: "SWA armouring can be used as a CPC if correctly terminated using appropriate glands that maintain continuity.", section: "Continuity Testing", difficulty: "intermediate", topic: "SWA Cables", category: "Continuity Testing" },
  { id: 245, question: "What is the purpose of conduit?", options: ["Decoration", "Mechanical protection and sometimes a CPC path for cables", "Identification", "Measurement"], correctAnswer: 1, explanation: "Conduit provides mechanical protection for cables and, if metallic, may provide a CPC path.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 246, question: "Can steel conduit be used as a CPC?", options: ["Never", "Yes, if properly installed with correct fittings maintaining continuity", "Only for lighting", "Only outdoors"], correctAnswer: 1, explanation: "Steel conduit can serve as a CPC if properly installed with fittings that maintain electrical continuity.", section: "Continuity Testing", difficulty: "intermediate", topic: "Conduit", category: "Continuity Testing" },
  { id: 247, question: "What is the purpose of trunking?", options: ["Appearance", "To contain and protect cables and wiring", "Cooling", "Heating"], correctAnswer: 1, explanation: "Trunking contains and protects cables while allowing easy access for installation and maintenance.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 248, question: "What is the purpose of segregation in trunking?", options: ["Appearance", "To separate circuits of different categories to prevent interference", "Cost saving", "Easier installation"], correctAnswer: 1, explanation: "Segregation separates circuits of different categories (e.g., power from data) to prevent interference.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 249, question: "What is the purpose of fire stopping?", options: ["Appearance", "To prevent fire spreading through cable penetrations", "Cable support", "Identification"], correctAnswer: 1, explanation: "Fire stopping prevents fire and smoke spreading through penetrations in fire-resistant walls and floors.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Fire Safety", category: "Visual Inspection & Documentation" },
  { id: 250, question: "What type of cable is typically used in fire alarm systems?", options: ["Standard PVC", "Fire-resistant cable (e.g., MICC, FP cables)", "Any cable", "Rubber insulated"], correctAnswer: 1, explanation: "Fire alarm cables must be fire-resistant (e.g., MICC, FP200) to maintain circuit integrity during a fire.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Fire Safety", category: "Visual Inspection & Documentation" },
  // Questions 251-300
  { id: 251, question: "What does MICC stand for?", options: ["Metal Insulated Cable Conductor", "Mineral Insulated Copper Clad", "Multiple Insulated Copper Core", "Metal Integrated Circuit Cable"], correctAnswer: 1, explanation: "MICC stands for Mineral Insulated Copper Clad cable, commonly known as 'pyro' cable.", section: "Introduction", difficulty: "basic", topic: "Cable Types", category: "Introduction & Fundamentals" },
  { id: 252, question: "What precaution is needed with MICC cable terminations?", options: ["None", "Must be sealed to prevent moisture ingress into the hygroscopic insulation", "Only outdoors", "Only for RCDs"], correctAnswer: 1, explanation: "MICC terminations must be properly sealed as the mineral insulation is hygroscopic (absorbs moisture).", section: "Visual Inspection & Documentation", difficulty: "advanced", topic: "MICC", category: "Visual Inspection & Documentation" },
  { id: 253, question: "What is EMC in electrical terms?", options: ["Emergency Mains Connection", "Electromagnetic Compatibility", "Earth Metal Conductor", "Electrical Meter Connection"], correctAnswer: 1, explanation: "EMC stands for Electromagnetic Compatibility - ensuring equipment operates without causing or being affected by interference.", section: "Introduction", difficulty: "intermediate", topic: "EMC", category: "Introduction & Fundamentals" },
  { id: 254, question: "What is the purpose of a residual current monitor?", options: ["Replace RCDs", "Monitor earth leakage current without disconnecting supply", "Test RCDs", "Measure voltage"], correctAnswer: 1, explanation: "Residual current monitors measure and display earth leakage current without automatically disconnecting supply.", section: "RCD Testing", difficulty: "advanced", topic: "RCM", category: "RCD Testing" },
  { id: 255, question: "What is the difference between an RCD and an RCM?", options: ["No difference", "RCD disconnects supply, RCM only monitors and alarms", "RCM is faster", "RCD is cheaper"], correctAnswer: 1, explanation: "An RCD automatically disconnects supply; an RCM monitors current and provides an alarm but doesn't disconnect.", section: "RCD Testing", difficulty: "advanced", topic: "RCM", category: "RCD Testing" },
  { id: 256, question: "What is an IT earthing system?", options: ["Computer network", "Isolated system with no intentional connection to earth", "Standard domestic system", "Industrial TN system"], correctAnswer: 1, explanation: "IT systems have no intentional connection to earth (or high-impedance connection), used in critical systems.", section: "Introduction", difficulty: "advanced", topic: "Earthing Systems", category: "Introduction & Fundamentals" },
  { id: 257, question: "Where are IT earthing systems commonly used?", options: ["Domestic", "Critical systems like operating theatres where first fault must not cause shutdown", "Standard commercial", "Construction sites"], correctAnswer: 1, explanation: "IT systems are used where a first earth fault must not cause supply disconnection, such as hospital operating theatres.", section: "Introduction", difficulty: "advanced", topic: "Earthing Systems", category: "Introduction & Fundamentals" },
  { id: 258, question: "What is the advantage of multifunction test instruments?", options: ["Lower accuracy", "Multiple tests with one instrument reducing equipment and time", "Only one test possible", "More expensive"], correctAnswer: 1, explanation: "Multifunction instruments can perform multiple test types, reducing equipment needed and saving time.", section: "Introduction", difficulty: "basic", topic: "Test Equipment", category: "Introduction & Fundamentals" },
  { id: 259, question: "How often should test instruments be calibrated?", options: ["Never", "As per manufacturer recommendations, typically annually", "Every 5 years", "Only when faulty"], correctAnswer: 1, explanation: "Test instruments should be calibrated as per manufacturer recommendations, typically annually.", section: "Introduction", difficulty: "intermediate", topic: "Test Equipment", category: "Introduction & Fundamentals" },
  { id: 260, question: "What is the purpose of keeping calibration certificates?", options: ["Decoration", "To demonstrate instruments are accurate and traceable to national standards", "Legal requirement only", "For warranty"], correctAnswer: 1, explanation: "Calibration certificates demonstrate instrument accuracy and measurement traceability to national standards.", section: "Introduction", difficulty: "intermediate", topic: "Test Equipment", category: "Introduction & Fundamentals" },
  { id: 261, question: "What should be done before testing an installation with a generator as backup supply?", options: ["Ignore the generator", "Verify the generator is isolated and cannot start automatically", "Test with generator running", "Only test mains"], correctAnswer: 1, explanation: "Ensure backup generators are isolated and cannot automatically start during testing to prevent shock hazards.", section: "Safe Isolation", difficulty: "intermediate", topic: "Backup Supplies", category: "Safe Isolation" },
  { id: 262, question: "What special consideration applies to PV (solar) installations during testing?", options: ["None", "PV arrays generate DC voltage whenever light is present", "Only test at night", "No isolation needed"], correctAnswer: 1, explanation: "PV arrays generate DC voltage whenever light is present, so special isolation procedures are required.", section: "Safe Isolation", difficulty: "advanced", topic: "Renewables", category: "Safe Isolation" },
  { id: 263, question: "What is the purpose of the schedule of items inspected on an EICR?", options: ["Decoration", "To record what was visually inspected and the outcome", "Legal requirement only", "Optional"], correctAnswer: 1, explanation: "The schedule of items inspected records what aspects were visually checked and the outcome of each.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "EICR Schedules", category: "Visual Inspection & Documentation" },
  { id: 264, question: "What should be done if previous test results are unavailable during periodic inspection?", options: ["Abandon inspection", "Carry out full initial verification style testing", "Estimate results", "Skip testing"], correctAnswer: 1, explanation: "Without previous results, full testing similar to initial verification should be carried out for comparison.", section: "Introduction", difficulty: "intermediate", topic: "Periodic Inspection", category: "Introduction & Fundamentals" },
  { id: 265, question: "Which tests are performed as 'dead tests'?", options: ["RCD testing only", "Continuity, insulation resistance, and polarity", "Loop impedance only", "Functional tests"], correctAnswer: 1, explanation: "Dead tests include continuity, insulation resistance, and polarity verification before energising.", section: "Introduction", difficulty: "intermediate", topic: "Testing Types", category: "Introduction & Fundamentals" },
  { id: 266, question: "Which tests are performed as 'live tests'?", options: ["Continuity only", "Earth fault loop impedance, RCD testing, and functional tests", "Insulation only", "Polarity only"], correctAnswer: 1, explanation: "Live tests include earth fault loop impedance, RCD testing, polarity verification, and functional tests.", section: "Introduction", difficulty: "intermediate", topic: "Testing Types", category: "Introduction & Fundamentals" },
  { id: 267, question: "What is the correct order of testing during initial verification?", options: ["Any order", "Continuity, insulation, polarity (dead), then Zs, RCD (live)", "Live tests first", "Only dead tests"], correctAnswer: 1, explanation: "Dead tests (continuity, insulation, polarity) are performed first, then live tests (Zs, RCD, functional).", section: "Introduction", difficulty: "intermediate", topic: "Testing Sequence", category: "Introduction & Fundamentals" },
  { id: 268, question: "What is the maximum voltage drop permitted for lighting circuits?", options: ["1%", "3%", "5%", "10%"], correctAnswer: 1, explanation: "The maximum permitted voltage drop for lighting circuits is typically 3% of nominal voltage.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Voltage Drop", category: "Earth Fault Loop Impedance" },
  { id: 269, question: "What is the maximum voltage drop permitted for other circuits?", options: ["3%", "5%", "10%", "15%"], correctAnswer: 1, explanation: "The maximum permitted voltage drop for other circuits is typically 5% of nominal voltage.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Voltage Drop", category: "Earth Fault Loop Impedance" },
  { id: 270, question: "What is the recommended inspection interval for cinemas?", options: ["1 year", "3 years", "5 years", "10 years"], correctAnswer: 0, explanation: "Cinemas and other entertainment venues typically require annual inspection.", section: "Introduction", difficulty: "intermediate", topic: "Inspection Intervals", category: "Introduction & Fundamentals" },
  { id: 271, question: "What warning label is required for dual supply installations?", options: ["No label required", "Warning of presence of more than one supply", "Just circuit numbers", "Manufacturer details"], correctAnswer: 1, explanation: "Installations with more than one source of supply must have a warning label indicating this.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Labelling", category: "Visual Inspection & Documentation" },
  { id: 272, question: "What should the RCD test button be labelled with?", options: ["Nothing", "Test quarterly or recommended test frequency", "Manufacturer name", "Date of installation"], correctAnswer: 1, explanation: "RCDs should have a label indicating the recommended test frequency (typically quarterly).", section: "RCD Testing", difficulty: "basic", topic: "Labelling", category: "RCD Testing" },
  { id: 273, question: "What information should be on a danger notice for isolated equipment?", options: ["Just 'Danger'", "Nature of danger, who isolated it, and contact details", "Date only", "Name only"], correctAnswer: 1, explanation: "Danger notices should indicate the nature of danger, who performed the isolation, and contact details.", section: "Safe Isolation", difficulty: "intermediate", topic: "Safety Notices", category: "Safe Isolation" },
  { id: 274, question: "What does the On-Site Guide provide?", options: ["Only cable sizing tables", "Practical guidance for day-to-day installation work", "Legal requirements only", "Pricing information"], correctAnswer: 1, explanation: "The On-Site Guide provides practical guidance for electricians on day-to-day installation and testing work.", section: "Introduction", difficulty: "basic", topic: "Guidance Documents", category: "Introduction & Fundamentals" },
  { id: 275, question: "When is AFDD protection recommended?", options: ["Never", "In locations with sleeping accommodation and high fire risk locations", "Only commercial", "Only industrial"], correctAnswer: 1, explanation: "AFDDs are recommended in locations with sleeping accommodation and premises with particular fire risks.", section: "Introduction", difficulty: "advanced", topic: "AFDD", category: "Introduction & Fundamentals" },
  { id: 276, question: "What visual check should be made on SPDs?", options: ["Nothing special", "Check status indicator shows device is functional", "Colour only", "Size only"], correctAnswer: 1, explanation: "Check the SPD status indicator to verify the device is functional and has not been damaged by a surge.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "SPD", category: "Visual Inspection & Documentation" },
  { id: 277, question: "What action should be taken if an MCB trips during testing?", options: ["Reset and continue", "Investigate the cause before continuing", "Ignore it", "Replace the MCB"], correctAnswer: 1, explanation: "If an MCB trips during testing, investigate the cause before resetting and continuing.", section: "Introduction", difficulty: "intermediate", topic: "Troubleshooting", category: "Introduction & Fundamentals" },
  { id: 278, question: "What is measured during a PFC (Prospective Fault Current) test?", options: ["Normal current", "Maximum current that could flow during a short circuit", "Leakage current", "Operating current"], correctAnswer: 1, explanation: "PFC testing measures the maximum current that could flow during a short circuit or earth fault.", section: "Earth Fault Loop Impedance", difficulty: "basic", topic: "PFC Testing", category: "Earth Fault Loop Impedance" },
  { id: 279, question: "Why must PFC not exceed the breaking capacity of protective devices?", options: ["For efficiency", "To ensure the device can safely interrupt the fault", "To save money", "For convenience"], correctAnswer: 1, explanation: "If PFC exceeds breaking capacity, the protective device cannot safely interrupt the fault.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Breaking Capacity", category: "Earth Fault Loop Impedance" },
  { id: 280, question: "What does a very low PFC reading at a remote point indicate?", options: ["Good installation", "High circuit impedance that may affect device operation", "New cables", "Correct protection"], correctAnswer: 1, explanation: "Low PFC (high impedance) at remote points may mean protective devices won't operate quickly enough.", section: "Earth Fault Loop Impedance", difficulty: "intermediate", topic: "Interpreting Results", category: "Earth Fault Loop Impedance" },
  { id: 281, question: "What is the main purpose of ADS?", options: ["Energy saving", "To disconnect supply automatically under fault conditions before shock becomes dangerous", "Power quality", "Surge protection"], correctAnswer: 1, explanation: "ADS ensures automatic disconnection of supply under earth fault conditions before shock duration becomes dangerous.", section: "Introduction", difficulty: "intermediate", topic: "ADS", category: "Introduction & Fundamentals" },
  { id: 282, question: "In special locations, what is the reduced touch voltage limit?", options: ["50V", "25V AC", "12V", "5V"], correctAnswer: 1, explanation: "In special locations (e.g., bathrooms, swimming pools), touch voltage is limited to 25V AC.", section: "Earth Fault Loop Impedance", difficulty: "advanced", topic: "Touch Voltage", category: "Earth Fault Loop Impedance" },
  { id: 283, question: "How should Class II equipment be earthed?", options: ["With a separate earth", "It should not be earthed", "Through the socket", "Via bonding"], correctAnswer: 1, explanation: "Class II equipment must not be earthed as it relies on double insulation for protection.", section: "Introduction", difficulty: "intermediate", topic: "Equipment Classes", category: "Introduction & Fundamentals" },
  { id: 284, question: "What circuits require segregation from power circuits?", options: ["None", "Fire alarm, emergency lighting, and data/telecommunications", "Only data", "Only telephone"], correctAnswer: 1, explanation: "Fire alarm, emergency lighting, and data/telecommunications circuits require segregation from power circuits.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Segregation", category: "Visual Inspection & Documentation" },
  { id: 285, question: "Where should fire stopping be provided?", options: ["Everywhere", "Where cables penetrate fire-resistant construction", "Only at the origin", "Only outdoors"], correctAnswer: 1, explanation: "Fire stopping must be provided wherever cables or trunking penetrate fire-resistant walls, floors, or ceilings.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Fire Safety", category: "Visual Inspection & Documentation" },
  { id: 286, question: "What is the purpose of a functional earth?", options: ["Safety earth", "Earth for correct equipment operation, not primarily for safety", "Protective earth", "Lightning earth"], correctAnswer: 1, explanation: "A functional earth is for correct equipment operation (e.g., EMC) rather than primarily for safety.", section: "Introduction", difficulty: "advanced", topic: "Earthing Types", category: "Introduction & Fundamentals" },
  { id: 287, question: "What should be verified about trunking lids during inspection?", options: ["Colour", "All lids are in place and secured", "Brand", "Age"], correctAnswer: 1, explanation: "Verify all trunking lids are in place and properly secured to maintain mechanical protection.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 288, question: "What should be checked about cable glands during inspection?", options: ["Colour", "Correct type, properly tightened, and providing earth continuity where required", "Brand", "Age"], correctAnswer: 1, explanation: "Check glands are correct type for the cable, properly tightened, and provide earth continuity where required.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 289, question: "What test verifies SWA armouring continuity?", options: ["Insulation test", "Continuity test from armouring to MET", "RCD test", "Loop test"], correctAnswer: 1, explanation: "A continuity test from the cable armouring to the MET verifies the armouring provides an adequate earth path.", section: "Continuity Testing", difficulty: "intermediate", topic: "SWA Cables", category: "Continuity Testing" },
  { id: 290, question: "What is a clean earth or technical earth used for?", options: ["Safety", "Sensitive electronic equipment requiring low-noise earth reference", "Lighting circuits", "Power circuits"], correctAnswer: 1, explanation: "Clean or technical earths provide a low-noise earth reference for sensitive electronic equipment.", section: "Introduction", difficulty: "advanced", topic: "Earthing Types", category: "Introduction & Fundamentals" },
  { id: 291, question: "What is the purpose of insulation monitoring devices?", options: ["Replace insulation testing", "Continuously monitor insulation resistance of IT systems", "RCD replacement", "Voltage monitoring"], correctAnswer: 1, explanation: "Insulation monitoring devices continuously monitor insulation resistance in unearthed IT systems.", section: "Insulation Resistance", difficulty: "advanced", topic: "Monitoring Devices", category: "Insulation Resistance" },
  { id: 292, question: "What is MICC cable particularly used for?", options: ["Low voltage lighting", "Fire alarm systems and emergency circuits requiring fire resistance", "Data cabling", "Temporary installations"], correctAnswer: 1, explanation: "MICC is used for fire alarm and emergency systems where the cable must survive fire conditions.", section: "Introduction", difficulty: "intermediate", topic: "Cable Types", category: "Introduction & Fundamentals" },
  { id: 293, question: "What type of installation requires the most frequent inspection?", options: ["Domestic", "Commercial office", "Construction site or caravan park", "Industrial"], correctAnswer: 2, explanation: "Construction sites and caravan parks require 3-monthly inspection due to harsh conditions and public access.", section: "Introduction", difficulty: "intermediate", topic: "Inspection Intervals", category: "Introduction & Fundamentals" },
  { id: 294, question: "What might indicate a cross-connected ring circuit?", options: ["All readings equal", "Readings that don't follow the expected pattern around the ring", "Very low readings", "Very high readings"], correctAnswer: 1, explanation: "A cross-connected ring shows unexpected readings that don't follow the progressive pattern of a correctly wired ring.", section: "Continuity Testing", difficulty: "advanced", topic: "Fault Finding", category: "Continuity Testing" },
  { id: 295, question: "What is the typical resistance per metre of 1.5mm² copper conductor?", options: ["18.1mΩ/m", "12.1mΩ/m", "7.41mΩ/m", "4.61mΩ/m"], correctAnswer: 1, explanation: "1.5mm² copper conductor has a resistance of approximately 12.1mΩ per metre at 20°C.", section: "Continuity Testing", difficulty: "advanced", topic: "Cable Resistance", category: "Continuity Testing" },
  { id: 296, question: "What is the minimum CSA for supplementary bonding conductors?", options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"], correctAnswer: 2, explanation: "Supplementary bonding conductors connecting exposed-conductive-parts should be minimum 4mm² if mechanically protected.", section: "Continuity Testing", difficulty: "advanced", topic: "Bonding", category: "Continuity Testing" },
  { id: 297, question: "What is the purpose of the 17th Edition consumer unit with metal enclosure?", options: ["Appearance", "To contain fire in the event of a fault within the unit", "Lower cost", "Better cooling"], correctAnswer: 1, explanation: "Metal or non-combustible enclosures help contain fire in the event of a fault within the consumer unit.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Consumer Units", category: "Visual Inspection & Documentation" },
  { id: 298, question: "What is the purpose of cable tray and ladder?", options: ["Appearance", "Support and protection for cables", "Decoration", "Identification"], correctAnswer: 1, explanation: "Cable tray and ladder provide support and some protection for cables in industrial and commercial installations.", section: "Visual Inspection & Documentation", difficulty: "basic", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 299, question: "What should be checked about cable tray during inspection?", options: ["Colour", "Secure fixing, adequate support, and bonding if required", "Brand", "Age"], correctAnswer: 1, explanation: "Check cable tray is securely fixed, provides adequate support for cables, and is bonded if metallic.", section: "Visual Inspection & Documentation", difficulty: "intermediate", topic: "Cable Installation", category: "Visual Inspection & Documentation" },
  { id: 300, question: "What is the recommended inspection interval for swimming pools?", options: ["6 months", "1 year", "3 years", "5 years"], correctAnswer: 1, explanation: "Swimming pools and other special locations typically require annual inspection due to increased risks.", section: "Introduction", difficulty: "intermediate", topic: "Inspection Intervals", category: "Introduction & Fundamentals" }
];

// Function to get random questions for mock exam (30 questions with difficulty distribution)
export const getRandomInspectionTestingMockExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(
    inspectionTestingQuestionBank,
    numQuestions,
    inspectionTestingCategories,
    { basic: 0.35, intermediate: 0.45, advanced: 0.2 }
  );
};
