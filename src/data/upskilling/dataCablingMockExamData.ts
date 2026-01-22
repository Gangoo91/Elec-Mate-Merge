/**
 * Data Cabling Mock Exam Question Bank
 *
 * 150 questions covering all modules with difficulty distribution
 * and category classification for balanced exam generation.
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// Categories for Data Cabling
export const dataCablingCategories = [
  'Fundamentals & Infrastructure',
  'Cable Types & Specifications',
  'Installation Techniques',
  'Testing & Certification',
  'Network Applications & PoE',
  'Standards & Documentation'
];

// Exam configuration
export const dataCablingMockExamConfig: MockExamConfig = {
  examId: 'data-cabling',
  examTitle: 'Data Cabling Mock Examination',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes
  passThreshold: 60,
  exitPath: '/electrician/upskilling/data-cabling-course',
  categories: dataCablingCategories
};

// Data Cabling Mock Exam Question Bank - 150 Questions covering Modules 1-6
export const dataCablingQuestionBank: StandardMockQuestion[] = [
  // Module 1 - Introduction to Data Cabling (25 questions)
  {
    id: 1,
    question: "What does UTP stand for in networking cables?",
    options: ["Unshielded Twisted Pair", "Universal Transmission Protocol", "Unified Terminal Point", "Unidirectional Transfer Path"],
    correctAnswer: 0,
    explanation: "UTP stands for Unshielded Twisted Pair, which refers to cables with twisted pairs of wires without additional shielding.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Terminology",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 2,
    question: "Which is the primary advantage of twisted pair cables over straight parallel wires?",
    options: ["Lower cost", "Reduced electromagnetic interference", "Higher data rates", "Easier installation"],
    correctAnswer: 1,
    explanation: "Twisting the pairs reduces electromagnetic interference by canceling out noise through the physical geometry of the twisted conductors.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Cable Design",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 3,
    question: "What is the maximum length for a horizontal cable run according to structured cabling standards?",
    options: ["90 metres", "100 metres", "150 metres", "300 metres"],
    correctAnswer: 0,
    explanation: "The maximum horizontal cable run is 90 metres, with an additional 10 metres allowed for patch cords (5m at each end).",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 4,
    question: "Which component connects the horizontal cabling to the backbone cabling?",
    options: ["Work area outlet", "Telecommunications room", "Equipment room", "Entrance facility"],
    correctAnswer: 1,
    explanation: "The telecommunications room (TR) is where horizontal cabling terminates and connects to backbone cabling via cross-connect fields.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Infrastructure",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 5,
    question: "What is the primary purpose of a patch panel?",
    options: ["Signal amplification", "Data encryption", "Cross-connect termination", "Power distribution"],
    correctAnswer: 2,
    explanation: "Patch panels provide termination points for cables and allow for flexible cross-connections between different network segments.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Components",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 6,
    question: "Which type of connector is most commonly used for data cabling terminations?",
    options: ["BNC", "RJ45", "ST", "LC"],
    correctAnswer: 1,
    explanation: "RJ45 connectors are the standard for twisted pair data cabling terminations in structured cabling systems.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Connectors",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 7,
    question: "What does the term 'backbone cabling' refer to?",
    options: ["Horizontal cables only", "Vertical cables between floors", "Cables in conduit", "Power cables"],
    correctAnswer: 1,
    explanation: "Backbone cabling provides connectivity between telecommunications rooms, equipment rooms, and entrance facilities, typically running vertically between floors.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Terminology",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 8,
    question: "Which is a key benefit of structured cabling over point-to-point wiring?",
    options: ["Lower initial cost", "Flexibility and scalability", "Faster data rates", "Less maintenance"],
    correctAnswer: 1,
    explanation: "Structured cabling provides flexibility for moves, adds, and changes, and scalability for future technology upgrades.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Design Principles",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 9,
    question: "What is the maximum number of work area outlets typically served by one telecommunications room?",
    options: ["50", "100", "1000", "No limit"],
    correctAnswer: 2,
    explanation: "A telecommunications room typically serves up to 1000 square metres of floor area, which translates to approximately 1000 work area outlets.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Design Principles",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 10,
    question: "Which organization publishes the TIA-568 standard?",
    options: ["IEEE", "ISO", "TIA", "ITU"],
    correctAnswer: 2,
    explanation: "The Telecommunications Industry Association (TIA) publishes the TIA-568 standard for commercial building telecommunications cabling.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Standards",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 11,
    question: "What is the primary difference between shielded and unshielded twisted pair cables?",
    options: ["Number of pairs", "Conductor size", "Additional metallic shielding", "Cable jacket color"],
    correctAnswer: 2,
    explanation: "Shielded twisted pair (STP) cables have additional metallic shielding around the pairs or overall cable to reduce electromagnetic interference.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Cable Types",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 12,
    question: "Which component provides the interface between campus and building cabling?",
    options: ["Telecommunications room", "Equipment room", "Entrance facility", "Work area"],
    correctAnswer: 2,
    explanation: "The entrance facility (EF) provides the interface between outside plant and premises cabling, including service provider connections.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Infrastructure",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 13,
    question: "What is the typical impedance of twisted pair data cables?",
    options: ["50 ohms", "75 ohms", "100 ohms", "120 ohms"],
    correctAnswer: 2,
    explanation: "Standard twisted pair data cables have a characteristic impedance of 100 ohms ± 15%.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Specifications",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 14,
    question: "Which type of topology is specified for structured cabling systems?",
    options: ["Bus", "Ring", "Star", "Mesh"],
    correctAnswer: 2,
    explanation: "Structured cabling uses a star topology with each outlet connected directly to a telecommunications room.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Design Principles",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 15,
    question: "What is the maximum number of connectors allowed in a permanent link?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 0,
    explanation: "A permanent link allows a maximum of 2 connectors - one at each end of the cable run.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 16,
    question: "Which cable management practice should be avoided?",
    options: ["Using cable ties", "Maintaining bend radius", "Creating service loops", "Exceeding pulling tension limits"],
    correctAnswer: 3,
    explanation: "Exceeding pulling tension limits can damage cable pairs and degrade performance. Typical limit is 25 lbf for 4-pair cables.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Installation",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 17,
    question: "What is the purpose of a consolidation point in horizontal cabling?",
    options: ["Signal regeneration", "Power injection", "Cable management flexibility", "Security access control"],
    correctAnswer: 2,
    explanation: "Consolidation points provide flexibility for reconfiguring horizontal cabling without rewiring from the telecommunications room.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Infrastructure",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 18,
    question: "Which factor most affects the performance of twisted pair cables?",
    options: ["Cable color", "Installation temperature", "Pair twist rate", "Jacket material"],
    correctAnswer: 2,
    explanation: "The twist rate (twists per unit length) is critical for maintaining proper electrical characteristics and reducing crosstalk.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Cable Design",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 19,
    question: "What is the minimum bend radius for Category 6 cable during installation?",
    options: ["2 times cable diameter", "4 times cable diameter", "6 times cable diameter", "8 times cable diameter"],
    correctAnswer: 1,
    explanation: "During installation, the minimum bend radius is 4 times the cable diameter. After installation, it becomes 8 times the cable diameter.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Installation",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 20,
    question: "Which component is NOT part of the horizontal cabling subsystem?",
    options: ["Horizontal cable", "Telecommunications outlet", "Work area cable", "Backbone cable"],
    correctAnswer: 3,
    explanation: "Backbone cable is part of the backbone cabling subsystem, not the horizontal cabling subsystem.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Infrastructure",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 21,
    question: "What is the standard rack unit (U) height?",
    options: ["1.5 inches", "1.75 inches", "2 inches", "2.25 inches"],
    correctAnswer: 1,
    explanation: "A standard rack unit (U) is 1.75 inches (44.45 mm) high, used for measuring equipment mounting space in racks.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Components",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 22,
    question: "Which cabling subsystem provides connectivity between buildings?",
    options: ["Horizontal cabling", "Backbone cabling", "Campus backbone", "Work area cabling"],
    correctAnswer: 2,
    explanation: "Campus backbone cabling provides connectivity between buildings on a campus or between widely separated areas.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Infrastructure",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 23,
    question: "What is the primary reason for using different colored cables?",
    options: ["Performance differences", "Cost considerations", "Identification and organization", "Fire rating requirements"],
    correctAnswer: 2,
    explanation: "Different colored cables are primarily used for identification and organization of different services or circuit types.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Best Practices",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 24,
    question: "Which test parameter indicates how well a cable rejects external interference?",
    options: ["Insertion loss", "NEXT", "Return loss", "ELFEXT"],
    correctAnswer: 1,
    explanation: "Near End Crosstalk (NEXT) measures how well a cable pair rejects interference from adjacent pairs in the same cable.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Testing",
    category: "Fundamentals & Infrastructure"
  },
  {
    id: 25,
    question: "What is the maximum pulling tension for a 4-pair UTP cable?",
    options: ["15 lbf", "25 lbf", "35 lbf", "50 lbf"],
    correctAnswer: 1,
    explanation: "The maximum pulling tension for 4-pair UTP cables is 25 lbf (110 N) to prevent damage to the cable pairs.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Installation",
    category: "Fundamentals & Infrastructure"
  },

  // Module 2 - Cable Types and Specifications (25 questions)
  {
    id: 26,
    question: "What is the key difference between Category 5e and Category 6 cables?",
    options: ["Number of pairs", "Conductor material", "Frequency rating and performance", "Cable length"],
    correctAnswer: 2,
    explanation: "Category 6 cables have higher frequency rating (250 MHz vs 100 MHz) and better performance specifications than Category 5e.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Cable Categories",
    category: "Cable Types & Specifications"
  },
  {
    id: 27,
    question: "Which Category cable is required for 10GBASE-T applications over 100 metres?",
    options: ["Category 5e", "Category 6", "Category 6A", "Category 7"],
    correctAnswer: 2,
    explanation: "Category 6A is required for 10GBASE-T Ethernet over the full 100-metre channel length.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Applications",
    category: "Cable Types & Specifications"
  },
  {
    id: 28,
    question: "What does AWG stand for in cable specifications?",
    options: ["American Wire Group", "Automated Wire Guide", "American Wire Gauge", "Advanced Wire Grade"],
    correctAnswer: 2,
    explanation: "AWG stands for American Wire Gauge, a standardized system for specifying wire diameter.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Terminology",
    category: "Cable Types & Specifications"
  },
  {
    id: 29,
    question: "Which conductor gauge is typically used for Category 6A cables?",
    options: ["22 AWG", "23 AWG", "24 AWG", "26 AWG"],
    correctAnswer: 1,
    explanation: "Category 6A cables typically use 23 AWG conductors, which are larger than the 24 AWG used in Cat 5e and Cat 6.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Specifications",
    category: "Cable Types & Specifications"
  },
  {
    id: 30,
    question: "What is the maximum frequency rating for Category 6 cables?",
    options: ["100 MHz", "200 MHz", "250 MHz", "500 MHz"],
    correctAnswer: 2,
    explanation: "Category 6 cables are rated for frequencies up to 250 MHz.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Specifications",
    category: "Cable Types & Specifications"
  },
  {
    id: 31,
    question: "Which type of cable construction helps reduce alien crosstalk?",
    options: ["Larger conductors", "Additional shielding", "Different jacket materials", "Reduced pair count"],
    correctAnswer: 1,
    explanation: "Additional shielding, such as foil wrapping or braided shields, helps reduce alien crosstalk between adjacent cables.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Cable Construction",
    category: "Cable Types & Specifications"
  },
  {
    id: 32,
    question: "What is the typical capacitance specification for Category 6 cables?",
    options: ["≤ 5.6 nF/100m", "≤ 6.2 nF/100m", "≤ 4.8 nF/100m", "≤ 7.5 nF/100m"],
    correctAnswer: 0,
    explanation: "Category 6 cables typically have a capacitance specification of ≤ 5.6 nF/100m.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Specifications",
    category: "Cable Types & Specifications"
  },
  {
    id: 33,
    question: "Which cable type provides the best EMI protection?",
    options: ["UTP", "ScTP", "S/FTP", "FTP"],
    correctAnswer: 2,
    explanation: "S/FTP (Shielded/Foiled Twisted Pair) with individual pair shields and overall shield provides the best EMI protection.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Cable Types",
    category: "Cable Types & Specifications"
  },
  {
    id: 34,
    question: "What is the maximum DC resistance for Category 6 cables?",
    options: ["9.38 Ω/100m", "8.5 Ω/100m", "7.8 Ω/100m", "6.2 Ω/100m"],
    correctAnswer: 0,
    explanation: "Category 6 cables have a maximum DC resistance of 9.38 Ω/100m for 24 AWG conductors.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Specifications",
    category: "Cable Types & Specifications"
  },
  {
    id: 35,
    question: "Which insulation material is commonly used in data cables?",
    options: ["PVC", "Polyethylene", "HDPE", "All of the above"],
    correctAnswer: 3,
    explanation: "Data cables use various insulation materials including PVC, polyethylene, and HDPE, depending on the application and rating.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Materials",
    category: "Cable Types & Specifications"
  },
  {
    id: 36,
    question: "What does LSZH stand for in cable specifications?",
    options: ["Low Smoke Zero Halogen", "Limited Size Zero Height", "Low Strength Zero Hazard", "Linear Standard Zero Heat"],
    correctAnswer: 0,
    explanation: "LSZH stands for Low Smoke Zero Halogen, referring to cables that produce minimal smoke and no halogenated gases when burned.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Terminology",
    category: "Cable Types & Specifications"
  },
  {
    id: 37,
    question: "Which factor determines the minimum bend radius for installed cables?",
    options: ["Cable length", "Cable diameter", "Installation method", "Environmental temperature"],
    correctAnswer: 1,
    explanation: "The minimum bend radius for installed cables is typically 8 times the cable diameter to prevent performance degradation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Installation",
    category: "Cable Types & Specifications"
  },
  {
    id: 38,
    question: "What is the difference between solid and stranded conductors?",
    options: ["Material composition", "Physical construction", "Electrical properties", "Installation requirements"],
    correctAnswer: 1,
    explanation: "Solid conductors are single wires, while stranded conductors consist of multiple small wires twisted together, affecting flexibility and termination methods.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Cable Construction",
    category: "Cable Types & Specifications"
  },
  {
    id: 39,
    question: "Which cable category supports 1000BASE-T applications?",
    options: ["Category 5e and above", "Category 6 only", "Category 6A only", "Category 7 only"],
    correctAnswer: 0,
    explanation: "1000BASE-T (Gigabit Ethernet) can run on Category 5e cables and above.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Applications",
    category: "Cable Types & Specifications"
  },
  {
    id: 40,
    question: "What is alien crosstalk?",
    options: ["Interference between pairs in the same cable", "Interference from external sources", "Interference between adjacent cables", "Signal reflection"],
    correctAnswer: 2,
    explanation: "Alien crosstalk is interference between cables that are physically adjacent to each other, typically in cable bundles.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Performance",
    category: "Cable Types & Specifications"
  },
  {
    id: 41,
    question: "Which test parameter measures signal loss over distance?",
    options: ["NEXT", "Insertion Loss", "Return Loss", "ELFEXT"],
    correctAnswer: 1,
    explanation: "Insertion loss measures the reduction in signal strength as it travels through the cable over distance.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Testing",
    category: "Cable Types & Specifications"
  },
  {
    id: 42,
    question: "What does the drain wire in shielded cables provide?",
    options: ["Additional conductivity", "Shield termination path", "Strength member", "Identification"],
    correctAnswer: 1,
    explanation: "The drain wire provides a path for terminating the cable shield to ground, completing the EMI protection circuit.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Cable Construction",
    category: "Cable Types & Specifications"
  },
  {
    id: 43,
    question: "Which cable specification indicates resistance to flame spread?",
    options: ["CMR", "CMP", "CM", "All of the above"],
    correctAnswer: 3,
    explanation: "CMR (riser), CMP (plenum), and CM (general purpose) are all flame resistance ratings for different installation environments.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Fire Ratings",
    category: "Cable Types & Specifications"
  },
  {
    id: 44,
    question: "What is the typical twist rate for Category 6 cables?",
    options: ["Different for each pair", "Same for all pairs", "Varies by manufacturer", "Specified by length"],
    correctAnswer: 0,
    explanation: "Each pair in Category 6 cables has a different twist rate to minimize crosstalk between pairs.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Cable Construction",
    category: "Cable Types & Specifications"
  },
  {
    id: 45,
    question: "Which environmental factor most affects cable performance?",
    options: ["Humidity", "Temperature", "Altitude", "Air pressure"],
    correctAnswer: 1,
    explanation: "Temperature is the most significant environmental factor affecting cable performance, influencing resistance, capacitance, and signal propagation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Performance",
    category: "Cable Types & Specifications"
  },
  {
    id: 46,
    question: "What is the primary advantage of Category 8 cables?",
    options: ["Lower cost", "Easier installation", "Higher frequency rating", "Better flexibility"],
    correctAnswer: 2,
    explanation: "Category 8 cables support frequencies up to 2000 MHz, enabling 25GBASE-T and 40GBASE-T applications.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Cable Categories",
    category: "Cable Types & Specifications"
  },
  {
    id: 47,
    question: "Which cable component provides mechanical strength?",
    options: ["Conductors", "Insulation", "Ripcord", "Jacket"],
    correctAnswer: 3,
    explanation: "The cable jacket provides mechanical protection and strength, protecting the internal components from physical damage.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Cable Construction",
    category: "Cable Types & Specifications"
  },
  {
    id: 48,
    question: "What does the 'A' designation in Category 6A represent?",
    options: ["Advanced", "Augmented", "Approved", "Alternative"],
    correctAnswer: 1,
    explanation: "The 'A' in Category 6A stands for 'Augmented,' indicating enhanced performance specifications over the base category.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Terminology",
    category: "Cable Types & Specifications"
  },
  {
    id: 49,
    question: "Which specification determines a cable's suitability for PoE applications?",
    options: ["Frequency rating", "DC resistance", "Capacitance", "Impedance"],
    correctAnswer: 1,
    explanation: "DC resistance determines the cable's ability to carry power efficiently, making it critical for PoE applications.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "PoE",
    category: "Cable Types & Specifications"
  },
  {
    id: 50,
    question: "What is the maximum channel insertion loss for Category 6A at 500 MHz?",
    options: ["36 dB", "44 dB", "54 dB", "65 dB"],
    correctAnswer: 2,
    explanation: "Category 6A channels have a maximum insertion loss of 54 dB at 500 MHz.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Specifications",
    category: "Cable Types & Specifications"
  },

  // Module 3 - Installation Techniques and Best Practices (25 questions)
  {
    id: 51,
    question: "What is the minimum separation distance between data and power cables?",
    options: ["25mm", "50mm", "100mm", "200mm"],
    correctAnswer: 2,
    explanation: "Data cables should be separated from power cables by at least 100mm to minimize electromagnetic interference.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Installation Rules",
    category: "Installation Techniques"
  },
  {
    id: 52,
    question: "Which tool is essential for proper cable termination?",
    options: ["Wire strippers", "Punch-down tool", "Cable tester", "Tone generator"],
    correctAnswer: 1,
    explanation: "A punch-down tool is essential for properly terminating cables into punch-down blocks and patch panels with the correct tension.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Tools",
    category: "Installation Techniques"
  },
  {
    id: 53,
    question: "What is the maximum untwist length allowed when terminating Category 6 cables?",
    options: ["6mm", "13mm", "25mm", "38mm"],
    correctAnswer: 1,
    explanation: "Category 6 cables should have no more than 13mm (0.5 inches) of untwisted pairs when terminating to maintain performance.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Termination",
    category: "Installation Techniques"
  },
  {
    id: 54,
    question: "Which installation practice can cause impedance mismatches?",
    options: ["Proper cable support", "Maintaining bend radius", "Sharp cable bends", "Using cable ties"],
    correctAnswer: 2,
    explanation: "Sharp cable bends can alter the cable geometry and cause impedance mismatches, affecting signal integrity.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Troubleshooting",
    category: "Installation Techniques"
  },
  {
    id: 55,
    question: "What is the recommended maximum bundle size for Category 6A cables?",
    options: ["12 cables", "24 cables", "48 cables", "No limit"],
    correctAnswer: 1,
    explanation: "Category 6A cables are typically limited to bundles of 24 cables or less to manage alien crosstalk and heat buildup.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Cable Management",
    category: "Installation Techniques"
  },
  {
    id: 56,
    question: "Which type of support should be used for vertical cable runs?",
    options: ["Cable ties only", "J-hooks", "Velocity supports", "No support needed"],
    correctAnswer: 2,
    explanation: "Velocity supports or other appropriate cable supports should be used every 1.5 metres for vertical cable runs to prevent cable stress.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Cable Support",
    category: "Installation Techniques"
  },
  {
    id: 57,
    question: "What is the purpose of a cable pulling lubricant?",
    options: ["Improve conductivity", "Reduce friction", "Prevent corrosion", "Enhance flexibility"],
    correctAnswer: 1,
    explanation: "Cable pulling lubricants reduce friction during installation, helping prevent cable damage and reducing pulling tension.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Installation Methods",
    category: "Installation Techniques"
  },
  {
    id: 58,
    question: "Which termination standard is used in the UK?",
    options: ["T568A", "T568B", "Both A and B", "Neither A nor B"],
    correctAnswer: 2,
    explanation: "Both T568A and T568B termination standards can be used in the UK, but consistency throughout the installation is essential.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Installation Techniques"
  },
  {
    id: 59,
    question: "What is the maximum conduit fill ratio for data cables?",
    options: ["31%", "40%", "53%", "60%"],
    correctAnswer: 1,
    explanation: "The maximum conduit fill ratio for data cables is typically 40% to allow for heat dissipation and cable movement.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Installation Rules",
    category: "Installation Techniques"
  },
  {
    id: 60,
    question: "Which installation method provides the best EMI protection?",
    options: ["Surface raceway", "Conduit", "Cable tray", "Direct burial"],
    correctAnswer: 1,
    explanation: "Metal conduit provides excellent EMI protection by creating a continuous shield around the cables.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "EMI Protection",
    category: "Installation Techniques"
  },
  {
    id: 61,
    question: "What should be done with unused cable pairs?",
    options: ["Cut them off", "Leave them unterminated", "Terminate to spare contacts", "Twist them together"],
    correctAnswer: 2,
    explanation: "Unused pairs should be terminated to spare contacts on the connector to maintain proper electrical characteristics.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Termination",
    category: "Installation Techniques"
  },
  {
    id: 62,
    question: "Which factor is most critical when installing cables in plenum spaces?",
    options: ["Cable diameter", "Fire rating", "Color coding", "Bend radius"],
    correctAnswer: 1,
    explanation: "Plenum-rated cables (CMP) are required in plenum spaces due to fire safety regulations and low smoke/toxicity requirements.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Fire Safety",
    category: "Installation Techniques"
  },
  {
    id: 63,
    question: "What is the recommended spacing for cable supports in horizontal runs?",
    options: ["0.5 metres", "1.0 metres", "1.5 metres", "3.0 metres"],
    correctAnswer: 2,
    explanation: "Cable supports should be placed every 1.5 metres (5 feet) in horizontal runs to prevent cable sag and stress.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Cable Support",
    category: "Installation Techniques"
  },
  {
    id: 64,
    question: "Which practice helps maintain cable pair geometry?",
    options: ["Tight cable ties", "Loose cable bundling", "Sharp cable bends", "Maximum pulling tension"],
    correctAnswer: 1,
    explanation: "Loose cable bundling maintains the natural geometry of cable pairs, preserving electrical characteristics.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Cable Management",
    category: "Installation Techniques"
  },
  {
    id: 65,
    question: "What is the purpose of strain relief at terminations?",
    options: ["Improve appearance", "Prevent cable stress", "Enhance conductivity", "Reduce noise"],
    correctAnswer: 1,
    explanation: "Strain relief prevents mechanical stress on the cable termination, ensuring reliable long-term connections.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Termination",
    category: "Installation Techniques"
  },
  {
    id: 66,
    question: "Which tool is used to verify cable continuity during installation?",
    options: ["Cable analyzer", "Tone generator", "Wire mapper", "OTDR"],
    correctAnswer: 2,
    explanation: "A wire mapper verifies cable continuity and proper pin assignments during installation verification.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Tools",
    category: "Installation Techniques"
  },
  {
    id: 67,
    question: "What is the maximum recommended installation temperature for most data cables?",
    options: ["0°C", "10°C", "20°C", "60°C"],
    correctAnswer: 3,
    explanation: "Most data cables have a maximum installation temperature of 60°C, above which the cable may be damaged.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Environmental",
    category: "Installation Techniques"
  },
  {
    id: 68,
    question: "Which technique helps prevent cable damage during pulling?",
    options: ["High pulling speed", "Multiple cables at once", "Proper pulling grip", "Maximum tension"],
    correctAnswer: 2,
    explanation: "Using proper pulling grips distributes tension evenly and prevents damage to individual cables.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Installation Methods",
    category: "Installation Techniques"
  },
  {
    id: 69,
    question: "What should be done to cables that fail testing?",
    options: ["Leave in place", "Re-terminate only", "Replace entirely", "Use for voice only"],
    correctAnswer: 2,
    explanation: "Cables that fail testing should be replaced entirely to ensure reliable network performance.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Quality Control",
    category: "Installation Techniques"
  },
  {
    id: 70,
    question: "Which installation practice is prohibited in structured cabling?",
    options: ["Using cable ties", "Bridge taps", "Cable labeling", "Patch cords"],
    correctAnswer: 1,
    explanation: "Bridge taps (multiple connections along a cable run) are prohibited in structured cabling as they cause signal reflections.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Standards",
    category: "Installation Techniques"
  },
  {
    id: 71,
    question: "What is the recommended minimum clearance around telecommunications equipment?",
    options: ["300mm", "600mm", "900mm", "1200mm"],
    correctAnswer: 2,
    explanation: "A minimum clearance of 900mm should be maintained around telecommunications equipment for access and ventilation.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Room Design",
    category: "Installation Techniques"
  },
  {
    id: 72,
    question: "Which factor affects the number of cables that can be pulled simultaneously?",
    options: ["Cable color", "Conduit size", "Installation time", "Cable cost"],
    correctAnswer: 1,
    explanation: "Conduit size determines how many cables can be pulled simultaneously while maintaining proper fill ratios.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Installation Methods",
    category: "Installation Techniques"
  },
  {
    id: 73,
    question: "What is the purpose of fish tape in cable installation?",
    options: ["Cable support", "Cable pulling", "Cable testing", "Cable identification"],
    correctAnswer: 1,
    explanation: "Fish tape is used to pull cables through conduits, walls, and other enclosed spaces during installation.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Tools",
    category: "Installation Techniques"
  },
  {
    id: 74,
    question: "Which practice ensures proper grounding of shielded cables?",
    options: ["Connect shield at both ends", "Connect shield at one end only", "Leave shield unconnected", "Connect shield to cable pairs"],
    correctAnswer: 0,
    explanation: "Shielded cables should have their shields connected at both ends to provide effective EMI protection.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Grounding",
    category: "Installation Techniques"
  },
  {
    id: 75,
    question: "What is the recommended approach for cable management in telecommunications rooms?",
    options: ["Random placement", "Organized routing", "Tight bundling", "Maximum density"],
    correctAnswer: 1,
    explanation: "Organized cable routing with proper spacing and identification ensures maintainability and performance.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Cable Management",
    category: "Installation Techniques"
  },

  // Module 4 - Testing and Certification (25 questions)
  {
    id: 76,
    question: "What is the difference between verification and certification testing?",
    options: ["No difference", "Different test equipment", "Different test standards", "Different applications"],
    correctAnswer: 2,
    explanation: "Verification testing checks basic connectivity, while certification testing verifies compliance with specific performance standards.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Testing Types",
    category: "Testing & Certification"
  },
  {
    id: 77,
    question: "Which test parameter measures signal reflection?",
    options: ["NEXT", "ELFEXT", "Return Loss", "Insertion Loss"],
    correctAnswer: 2,
    explanation: "Return Loss measures signal reflection caused by impedance mismatches in the cable or connectors.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Parameters",
    category: "Testing & Certification"
  },
  {
    id: 78,
    question: "What does NEXT stand for?",
    options: ["Near End Cross Talk", "Network Extension Test", "Nominal Expected Transfer", "New Enhanced Testing"],
    correctAnswer: 0,
    explanation: "NEXT stands for Near End Cross Talk, measuring interference between cable pairs at the same end.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Terminology",
    category: "Testing & Certification"
  },
  {
    id: 79,
    question: "Which test is performed to verify correct pin assignments?",
    options: ["Wire map", "Length test", "NEXT test", "Return loss"],
    correctAnswer: 0,
    explanation: "Wire map testing verifies that each conductor is connected to the correct pin at both ends of the cable.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Testing Types",
    category: "Testing & Certification"
  },
  {
    id: 80,
    question: "What is the maximum channel length for Category 6A testing?",
    options: ["90 metres", "100 metres", "300 metres", "No limit"],
    correctAnswer: 1,
    explanation: "The maximum channel length for Category 6A testing is 100 metres, including patch cords.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Testing & Certification"
  },
  {
    id: 81,
    question: "Which parameter indicates the cable's ability to reject interference from adjacent pairs?",
    options: ["Insertion Loss", "ELFEXT", "Propagation Delay", "Delay Skew"],
    correctAnswer: 1,
    explanation: "ELFEXT (Equal Level Far End CrossTalk) measures the cable's ability to reject interference from adjacent pairs.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Parameters",
    category: "Testing & Certification"
  },
  {
    id: 82,
    question: "What does a negative NEXT margin indicate?",
    options: ["Excellent performance", "Marginal performance", "Test failure", "Measurement error"],
    correctAnswer: 2,
    explanation: "A negative NEXT margin indicates that the cable fails to meet the minimum performance requirements.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Results Interpretation",
    category: "Testing & Certification"
  },
  {
    id: 83,
    question: "Which test equipment is required for Category 6A certification?",
    options: ["Level II tester", "Level III tester", "Level IIe tester", "Any cable tester"],
    correctAnswer: 2,
    explanation: "Category 6A certification requires a Level IIe (Enhanced) tester capable of measuring alien crosstalk parameters.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Equipment",
    category: "Testing & Certification"
  },
  {
    id: 84,
    question: "What is the purpose of calibration in cable testing?",
    options: ["Extend battery life", "Ensure measurement accuracy", "Speed up testing", "Reduce costs"],
    correctAnswer: 1,
    explanation: "Calibration ensures that test equipment provides accurate and traceable measurements within specified tolerances.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Procedures",
    category: "Testing & Certification"
  },
  {
    id: 85,
    question: "Which test configuration measures the complete transmission path?",
    options: ["Basic link", "Permanent link", "Channel", "Patch cord"],
    correctAnswer: 2,
    explanation: "Channel testing measures the complete transmission path including all cables, connectors, and patch cords.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Testing Types",
    category: "Testing & Certification"
  },
  {
    id: 86,
    question: "What is alien crosstalk?",
    options: ["Interference within a cable", "Interference between cables", "External electromagnetic interference", "Signal attenuation"],
    correctAnswer: 1,
    explanation: "Alien crosstalk is interference between separate cables, typically measured in Category 6A installations.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Parameters",
    category: "Testing & Certification"
  },
  {
    id: 87,
    question: "Which frequency range is tested for Category 6 cables?",
    options: ["1-100 MHz", "1-250 MHz", "1-500 MHz", "1-600 MHz"],
    correctAnswer: 1,
    explanation: "Category 6 cables are tested from 1 MHz to 250 MHz across all performance parameters.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Testing & Certification"
  },
  {
    id: 88,
    question: "What does a positive return loss margin indicate?",
    options: ["Test failure", "Marginal performance", "Good performance", "Measurement error"],
    correctAnswer: 2,
    explanation: "A positive return loss margin indicates that the cable meets or exceeds the minimum performance requirements.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Results Interpretation",
    category: "Testing & Certification"
  },
  {
    id: 89,
    question: "Which test parameter is most affected by poor termination practices?",
    options: ["Length", "NEXT", "Propagation delay", "Insertion loss"],
    correctAnswer: 1,
    explanation: "NEXT (Near End CrossTalk) is most affected by poor termination practices such as excessive untwisting.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Troubleshooting",
    category: "Testing & Certification"
  },
  {
    id: 90,
    question: "What is the typical duration for auto-test on a modern cable analyzer?",
    options: ["5-10 seconds", "30-60 seconds", "2-3 minutes", "5-10 minutes"],
    correctAnswer: 0,
    explanation: "Modern cable analyzers can perform comprehensive auto-testing in 5-10 seconds per link.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Equipment",
    category: "Testing & Certification"
  },
  {
    id: 91,
    question: "Which standard defines the test limits for Category 6A cables?",
    options: ["TIA-568.2-D", "ISO/IEC 11801", "Both A and B", "Neither A nor B"],
    correctAnswer: 2,
    explanation: "Both TIA-568.2-D and ISO/IEC 11801 define test limits for Category 6A cables with similar requirements.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Testing & Certification"
  },
  {
    id: 92,
    question: "What does PSELFEXT measure?",
    options: ["Power sum equal level far end crosstalk", "Pair separation electrical frequency test", "Primary signal enhancement factor", "Propagation speed element function"],
    correctAnswer: 0,
    explanation: "PSELFEXT measures Power Sum Equal Level Far End CrossTalk, the combined far-end crosstalk from all other pairs.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Test Parameters",
    category: "Testing & Certification"
  },
  {
    id: 93,
    question: "Which test result format is preferred for documentation?",
    options: ["Pass/Fail only", "Numerical values only", "Graphical plots only", "All measurement data"],
    correctAnswer: 3,
    explanation: "Complete documentation should include all measurement data, margins, and graphical plots for future reference.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Testing & Certification"
  },
  {
    id: 94,
    question: "What is the maximum allowable difference in propagation delay between pairs?",
    options: ["25 ns", "45 ns", "55 ns", "100 ns"],
    correctAnswer: 1,
    explanation: "The maximum delay skew (difference in propagation delay between pairs) is typically 45 ns for Category 6 cables.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Test Parameters",
    category: "Testing & Certification"
  },
  {
    id: 95,
    question: "Which environmental factor affects test results?",
    options: ["Temperature", "Humidity", "Altitude", "All of the above"],
    correctAnswer: 3,
    explanation: "Temperature, humidity, and altitude all affect cable performance and should be recorded during testing.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Environmental",
    category: "Testing & Certification"
  },
  {
    id: 96,
    question: "What is the purpose of reference cord verification?",
    options: ["Equipment calibration", "Environmental compensation", "Measurement accuracy", "Speed optimization"],
    correctAnswer: 2,
    explanation: "Reference cord verification ensures that test cords do not introduce errors into the measurements.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Procedures",
    category: "Testing & Certification"
  },
  {
    id: 97,
    question: "Which test parameter indicates cable length accuracy?",
    options: ["NVP", "Propagation delay", "Length measurement", "Insertion loss"],
    correctAnswer: 0,
    explanation: "Nominal Velocity of Propagation (NVP) affects length measurement accuracy and must be set correctly for the cable type.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Test Parameters",
    category: "Testing & Certification"
  },
  {
    id: 98,
    question: "What does ACR stand for in cable testing?",
    options: ["Attenuation to Crosstalk Ratio", "Automatic Cable Recognition", "Advanced Certification Report", "Ambient Condition Reading"],
    correctAnswer: 0,
    explanation: "ACR stands for Attenuation to Crosstalk Ratio, indicating the difference between signal and noise levels.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Terminology",
    category: "Testing & Certification"
  },
  {
    id: 99,
    question: "Which test identifies opens, shorts, and miswires?",
    options: ["NEXT test", "Wire map test", "Length test", "Return loss test"],
    correctAnswer: 1,
    explanation: "Wire map testing identifies opens, shorts, crossed pairs, reversed pairs, and split pairs in the cable.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Testing Types",
    category: "Testing & Certification"
  },
  {
    id: 100,
    question: "What is the recommended re-test interval for installed cabling?",
    options: ["Annually", "Every 3 years", "Every 5 years", "Only when problems occur"],
    correctAnswer: 3,
    explanation: "Installed cabling typically only needs re-testing when problems occur or major changes are made to the system.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Procedures",
    category: "Testing & Certification"
  },

  // Module 5 - Network Applications and PoE (25 questions)
  {
    id: 101,
    question: "What does PoE stand for?",
    options: ["Power over Ethernet", "Protocol over Ethernet", "Port over Ethernet", "Point of Entry"],
    correctAnswer: 0,
    explanation: "PoE stands for Power over Ethernet, technology that delivers electrical power over Ethernet cables.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Terminology",
    category: "Network Applications & PoE"
  },
  {
    id: 102,
    question: "Which pairs carry power in standard PoE (IEEE 802.3af)?",
    options: ["Pairs 1 and 2", "Pairs 2 and 3", "Pairs 1 and 3", "All pairs"],
    correctAnswer: 2,
    explanation: "Standard PoE uses pairs 1-2 and 3-6 (pairs 1 and 3) for power delivery in Alternative A.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "PoE Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 103,
    question: "What is the maximum power delivered by PoE+ (IEEE 802.3at)?",
    options: ["15.4W", "25.5W", "30W", "60W"],
    correctAnswer: 1,
    explanation: "PoE+ (IEEE 802.3at) delivers up to 25.5W to the powered device after cable losses.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "PoE Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 104,
    question: "Which cable category is minimum requirement for PoE++ Type 4?",
    options: ["Category 5e", "Category 6", "Category 6A", "Category 7"],
    correctAnswer: 2,
    explanation: "PoE++ Type 4 (90W) requires Category 6A cables or better due to power handling and heat dissipation requirements.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "PoE Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 105,
    question: "What is 1000BASE-T?",
    options: ["100 Mbps Ethernet", "1 Gbps Ethernet", "10 Gbps Ethernet", "100 Gbps Ethernet"],
    correctAnswer: 1,
    explanation: "1000BASE-T is Gigabit Ethernet running at 1 Gbps (1000 Mbps) over twisted pair cables.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Network Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 106,
    question: "Which Ethernet standard requires Category 6A cables?",
    options: ["1000BASE-T", "2.5GBASE-T", "5GBASE-T", "10GBASE-T"],
    correctAnswer: 3,
    explanation: "10GBASE-T requires Category 6A cables to achieve 10 Gbps over the full 100-metre distance.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Network Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 107,
    question: "What is the maximum cable bundle size for PoE applications?",
    options: ["12 cables", "24 cables", "37 cables", "No limit"],
    correctAnswer: 2,
    explanation: "For PoE applications, cable bundles should be limited to 37 cables to prevent overheating.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "PoE Installation",
    category: "Network Applications & PoE"
  },
  {
    id: 108,
    question: "Which device provides power in a PoE system?",
    options: ["PSE", "PD", "PDU", "UPS"],
    correctAnswer: 0,
    explanation: "PSE (Power Sourcing Equipment) provides power in a PoE system, such as PoE switches or injectors.",
    section: "Module 5",
    difficulty: "basic",
    topic: "PoE Components",
    category: "Network Applications & PoE"
  },
  {
    id: 109,
    question: "What does PD stand for in PoE terminology?",
    options: ["Power Delivery", "Powered Device", "Port Detector", "Protocol Data"],
    correctAnswer: 1,
    explanation: "PD stands for Powered Device, the equipment that receives power over Ethernet, such as IP phones or wireless access points.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Terminology",
    category: "Network Applications & PoE"
  },
  {
    id: 110,
    question: "Which PoE standard uses all four pairs for power?",
    options: ["IEEE 802.3af", "IEEE 802.3at", "IEEE 802.3bt", "IEEE 802.3ab"],
    correctAnswer: 2,
    explanation: "IEEE 802.3bt (PoE++) uses all four pairs for power delivery to achieve higher power levels.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "PoE Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 111,
    question: "What is the detection voltage range for PoE devices?",
    options: ["12-24V", "37-57V", "44-57V", "48-56V"],
    correctAnswer: 1,
    explanation: "PoE detection uses voltages in the range of 37-57V to identify and classify powered devices.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "PoE Technical",
    category: "Network Applications & PoE"
  },
  {
    id: 112,
    question: "Which factor most affects PoE power budget calculations?",
    options: ["Cable length", "Cable category", "Installation temperature", "All of the above"],
    correctAnswer: 3,
    explanation: "Cable length, category, and installation temperature all affect DC resistance and power loss calculations.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "PoE Calculations",
    category: "Network Applications & PoE"
  },
  {
    id: 113,
    question: "What is the maximum distance for 10GBASE-T over Category 6 cables?",
    options: ["37 metres", "55 metres", "100 metres", "300 metres"],
    correctAnswer: 1,
    explanation: "10GBASE-T can run up to 55 metres over Category 6 cables before requiring Category 6A for full distance.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Network Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 114,
    question: "Which application typically requires PoE++ power levels?",
    options: ["IP phones", "Basic wireless APs", "PTZ cameras", "LED lighting"],
    correctAnswer: 2,
    explanation: "PTZ (Pan-Tilt-Zoom) cameras typically require PoE++ power levels due to motor and heating requirements.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Applications",
    category: "Network Applications & PoE"
  },
  {
    id: 115,
    question: "What does LLDP stand for in network applications?",
    options: ["Link Layer Discovery Protocol", "Low Level Data Protocol", "Local Loop Delivery Protocol", "Logical Link Data Path"],
    correctAnswer: 0,
    explanation: "LLDP stands for Link Layer Discovery Protocol, used for device discovery and PoE power negotiation.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Network Protocols",
    category: "Network Applications & PoE"
  },
  {
    id: 116,
    question: "Which conductor gauge provides better PoE performance?",
    options: ["24 AWG", "23 AWG", "22 AWG", "26 AWG"],
    correctAnswer: 1,
    explanation: "23 AWG conductors have lower resistance than 24 AWG, providing better power delivery efficiency for PoE.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "PoE Technical",
    category: "Network Applications & PoE"
  },
  {
    id: 117,
    question: "What is the typical efficiency of PoE power delivery?",
    options: ["60-70%", "70-80%", "80-90%", "90-95%"],
    correctAnswer: 2,
    explanation: "PoE power delivery typically achieves 80-90% efficiency, with losses due to cable resistance and conversion.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "PoE Technical",
    category: "Network Applications & PoE"
  },
  {
    id: 118,
    question: "Which Ethernet speed requires all four pairs?",
    options: ["100 Mbps", "1 Gbps", "10 Gbps", "All of the above"],
    correctAnswer: 1,
    explanation: "1000BASE-T (Gigabit Ethernet) is the first standard to require all four pairs for data transmission.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Network Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 119,
    question: "What is Type 1 PoE power classification?",
    options: ["0.44-3.84W", "3.84-6.49W", "6.49-12.95W", "12.95-25.5W"],
    correctAnswer: 0,
    explanation: "Type 1 PoE power classification covers devices requiring 0.44-3.84W, such as basic sensors.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "PoE Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 120,
    question: "Which factor determines the number of PoE devices per switch port?",
    options: ["Switch capacity", "Power budget", "Cable length", "All of the above"],
    correctAnswer: 3,
    explanation: "Switch port capacity, total power budget, and cable length limitations all determine PoE device deployment.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "PoE Design",
    category: "Network Applications & PoE"
  },
  {
    id: 121,
    question: "What does MDI-X stand for?",
    options: ["Medium Dependent Interface Crossover", "Multiple Data Interface Extension", "Managed Device Interface X", "Media Distribution Interface X"],
    correctAnswer: 0,
    explanation: "MDI-X stands for Medium Dependent Interface Crossover, allowing direct connection between similar devices.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Network Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 122,
    question: "Which cable parameter affects PoE power loss?",
    options: ["Capacitance", "Inductance", "DC resistance", "Impedance"],
    correctAnswer: 2,
    explanation: "DC resistance directly determines power loss (I²R losses) in PoE applications.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "PoE Technical",
    category: "Network Applications & PoE"
  },
  {
    id: 123,
    question: "What is the maximum power for PoE++ Type 3?",
    options: ["25.5W", "51W", "60W", "90W"],
    correctAnswer: 2,
    explanation: "PoE++ Type 3 (IEEE 802.3bt) delivers up to 60W to the powered device.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "PoE Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 124,
    question: "Which network speed is supported by Category 5e cables?",
    options: ["100 Mbps only", "1 Gbps only", "Both 100 Mbps and 1 Gbps", "Up to 10 Gbps"],
    correctAnswer: 2,
    explanation: "Category 5e cables support both 100 Mbps (100BASE-TX) and 1 Gbps (1000BASE-T) applications.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Network Standards",
    category: "Network Applications & PoE"
  },
  {
    id: 125,
    question: "What causes temperature rise in PoE cable bundles?",
    options: ["Data transmission", "Power transmission", "Environmental heating", "Cable resistance"],
    correctAnswer: 1,
    explanation: "Power transmission in PoE applications causes I²R heating in cable bundles, requiring derating for large bundles.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "PoE Technical",
    category: "Network Applications & PoE"
  },

  // Module 6 - International Standards and Documentation (25 questions)
  {
    id: 126,
    question: "Which organization publishes the ISO/IEC 11801 standard?",
    options: ["TIA", "IEEE", "ISO/IEC", "ANSI"],
    correctAnswer: 2,
    explanation: "ISO/IEC 11801 is published jointly by the International Organization for Standardization (ISO) and International Electrotechnical Commission (IEC).",
    section: "Module 6",
    difficulty: "basic",
    topic: "Standards Bodies",
    category: "Standards & Documentation"
  },
  {
    id: 127,
    question: "What does Class EA correspond to in TIA terminology?",
    options: ["Category 5e", "Category 6", "Category 6A", "Category 7"],
    correctAnswer: 2,
    explanation: "Class EA in ISO/IEC 11801 corresponds to Category 6A in TIA-568 standards.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Standards & Documentation"
  },
  {
    id: 128,
    question: "What is the maximum backbone cable length between floors?",
    options: ["90 metres", "100 metres", "500 metres", "800 metres"],
    correctAnswer: 3,
    explanation: "The maximum backbone cable length between intermediate cross-connects (floors) is 800 metres.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Standards & Documentation"
  },
  {
    id: 129,
    question: "Which document should contain the cable identification scheme?",
    options: ["Test reports", "As-built drawings", "Administration records", "All of the above"],
    correctAnswer: 3,
    explanation: "The cable identification scheme should be documented in test reports, as-built drawings, and administration records.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Standards & Documentation"
  },
  {
    id: 130,
    question: "What is the minimum floor loading requirement for telecommunications rooms?",
    options: ["2.4 kN/m²", "4.8 kN/m²", "7.2 kN/m²", "12.0 kN/m²"],
    correctAnswer: 1,
    explanation: "Telecommunications rooms require a minimum floor loading of 4.8 kN/m² (100 lbs/ft²) to support equipment racks.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Room Requirements",
    category: "Standards & Documentation"
  },
  {
    id: 131,
    question: "How long should test records be retained?",
    options: ["1 year", "5 years", "10 years", "Life of installation"],
    correctAnswer: 3,
    explanation: "Test records should be retained for the life of the installation to support troubleshooting and warranty claims.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Standards & Documentation"
  },
  {
    id: 132,
    question: "What does TGB stand for in grounding systems?",
    options: ["Telecommunications Ground Bar", "Telecommunications Grounding Busbar", "Terminal Ground Block", "Telecommunications Ground Bond"],
    correctAnswer: 1,
    explanation: "TGB stands for Telecommunications Grounding Busbar, the central grounding point in telecommunications rooms.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Grounding",
    category: "Standards & Documentation"
  },
  {
    id: 133,
    question: "Which pathway type provides the best EMI protection?",
    options: ["Cable tray", "J-hooks", "Metal conduit", "Plastic conduit"],
    correctAnswer: 2,
    explanation: "Metal conduit provides the best EMI protection by creating a continuous shield around the cables.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Infrastructure",
    category: "Standards & Documentation"
  },
  {
    id: 134,
    question: "What is the recommended temperature range for telecommunications rooms?",
    options: ["15-25°C", "18-24°C", "20-30°C", "22-26°C"],
    correctAnswer: 1,
    explanation: "The recommended temperature range for telecommunications rooms is 18-24°C (64-75°F).",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Room Requirements",
    category: "Standards & Documentation"
  },
  {
    id: 135,
    question: "Which fire rating is required for pathways through fire-rated walls?",
    options: ["30 minutes", "60 minutes", "90 minutes", "Same as wall assembly"],
    correctAnswer: 3,
    explanation: "Pathways must maintain the same fire rating as the wall assembly they pass through.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Fire Safety",
    category: "Standards & Documentation"
  },
  {
    id: 136,
    question: "What information must be included on cable labels?",
    options: ["Cable type only", "Destination only", "Cable ID and destination", "Installation date only"],
    correctAnswer: 2,
    explanation: "Cable labels must include both unique cable identification and destination information.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Documentation",
    category: "Standards & Documentation"
  },
  {
    id: 137,
    question: "Which standard specifies telecommunications room requirements?",
    options: ["TIA-568 only", "TIA-569 only", "Both TIA-568 and TIA-569", "ISO/IEC 14763 only"],
    correctAnswer: 2,
    explanation: "Both TIA-568 and TIA-569 specify telecommunications room requirements and design criteria.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Standards & Documentation"
  },
  {
    id: 138,
    question: "What is the maximum service area for one telecommunications room?",
    options: ["500m²", "1000m²", "1500m²", "2000m²"],
    correctAnswer: 1,
    explanation: "One telecommunications room typically serves a maximum of 1000m² of floor area.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Room Requirements",
    category: "Standards & Documentation"
  },
  {
    id: 139,
    question: "Which topology is specified for structured cabling?",
    options: ["Bus", "Ring", "Star", "Mesh"],
    correctAnswer: 2,
    explanation: "Structured cabling standards specify star topology with each outlet connected directly to a telecommunications room.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Standards",
    category: "Standards & Documentation"
  },
  {
    id: 140,
    question: "What is the minimum ceiling height for telecommunications rooms?",
    options: ["2.4m", "2.6m", "2.8m", "3.0m"],
    correctAnswer: 1,
    explanation: "Telecommunications rooms require a minimum ceiling height of 2.6m (8.5 feet).",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Room Requirements",
    category: "Standards & Documentation"
  },
  {
    id: 141,
    question: "Which documentation must be updated when changes are made?",
    options: ["Test records only", "Drawings only", "All documentation", "Labels only"],
    correctAnswer: 2,
    explanation: "All documentation including drawings, test records, and administration records must be updated when changes are made.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Documentation",
    category: "Standards & Documentation"
  },
  {
    id: 142,
    question: "What is the maximum fill ratio for cable conduits?",
    options: ["31%", "40%", "53%", "60%"],
    correctAnswer: 1,
    explanation: "Cable conduits should not exceed 40% fill ratio to allow for heat dissipation and cable management.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Installation Rules",
    category: "Standards & Documentation"
  },
  {
    id: 143,
    question: "Which component provides campus-to-building interface?",
    options: ["Telecommunications room", "Equipment room", "Entrance facility", "Main cross-connect"],
    correctAnswer: 2,
    explanation: "The entrance facility provides the interface between campus backbone and building cabling systems.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Infrastructure",
    category: "Standards & Documentation"
  },
  {
    id: 144,
    question: "What is the recommended humidity range for telecommunications rooms?",
    options: ["30-40% RH", "45-55% RH", "60-70% RH", "75-85% RH"],
    correctAnswer: 1,
    explanation: "The recommended humidity range for telecommunications rooms is 45-55% RH.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Room Requirements",
    category: "Standards & Documentation"
  },
  {
    id: 145,
    question: "Which cable support spacing is recommended for horizontal runs?",
    options: ["0.5 metres", "1.0 metres", "1.5 metres", "3.0 metres"],
    correctAnswer: 2,
    explanation: "Cable supports should be placed every 1.5 metres in horizontal runs to prevent cable sag.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Installation Rules",
    category: "Standards & Documentation"
  },
  {
    id: 146,
    question: "What must be included in installation documentation?",
    options: ["Test results only", "Cable routing only", "Complete system documentation", "Equipment lists only"],
    correctAnswer: 2,
    explanation: "Installation documentation must include complete system documentation: test results, cable routing, equipment lists, and administration records.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Documentation",
    category: "Standards & Documentation"
  },
  {
    id: 147,
    question: "Which standard defines Class F cabling performance?",
    options: ["TIA-568 only", "ISO/IEC 11801 only", "Both standards", "Neither standard"],
    correctAnswer: 1,
    explanation: "Class F cabling performance is defined in ISO/IEC 11801; TIA-568 does not have an equivalent category.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Standards",
    category: "Standards & Documentation"
  },
  {
    id: 148,
    question: "What is the maximum campus backbone distance?",
    options: ["800 metres", "1500 metres", "2000 metres", "3000 metres"],
    correctAnswer: 2,
    explanation: "The maximum campus backbone distance is 2000 metres for optical fiber applications.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Standards",
    category: "Standards & Documentation"
  },
  {
    id: 149,
    question: "Which grounding conductor size is minimum for telecommunications?",
    options: ["12 AWG", "10 AWG", "8 AWG", "6 AWG"],
    correctAnswer: 3,
    explanation: "The minimum bonding conductor size for telecommunications grounding is 6 AWG.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Grounding",
    category: "Standards & Documentation"
  },
  {
    id: 150,
    question: "What type of documentation is required for warranty support?",
    options: ["Installation certificates", "Test records", "Change documentation", "All of the above"],
    correctAnswer: 3,
    explanation: "Warranty support requires complete documentation including installation certificates, test records, and change documentation.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Documentation",
    category: "Standards & Documentation"
  }
];

/**
 * Get random questions for the Data Cabling mock exam with difficulty distribution
 */
export const getRandomDataCablingMockExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(
    dataCablingQuestionBank,
    numQuestions,
    dataCablingCategories,
    { basic: 0.35, intermediate: 0.45, advanced: 0.2 }
  );
};
