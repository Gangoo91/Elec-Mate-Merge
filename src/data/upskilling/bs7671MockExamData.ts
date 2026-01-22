import { StandardMockQuestion } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// BS7671 Mock Exam Question Bank - 150 Questions covering Modules 1-8
export const bs7671QuestionBank: StandardMockQuestion[] = [
  // Module 1: Introduction to BS7671 & Electrical Safety (20 questions)
  {
    id: 1,
    question: "What is the current edition of BS7671?",
    options: ["17th Edition", "18th Edition", "19th Edition", "20th Edition"],
    correctAnswer: 1,
    explanation: "BS7671 is currently in its 18th Edition, published in 2018 with amendments.",
    section: "Introduction",
    difficulty: "basic",
    topic: "Edition",
    category: "Fundamentals"
  },
  {
    id: 2,
    question: "What is the fundamental principle of electrical safety in BS7671?",
    options: ["Cost reduction", "Energy efficiency", "Protection from electric shock", "Aesthetic design"],
    correctAnswer: 2,
    explanation: "The fundamental principle is protection from electric shock, ensuring safety of persons and property.",
    section: "Introduction",
    difficulty: "basic",
    topic: "Safety Principles",
    category: "Fundamentals"
  },
  {
    id: 3,
    question: "Which Part of BS7671 covers fundamental principles?",
    options: ["Part 1", "Part 2", "Part 3", "Part 4"],
    correctAnswer: 0,
    explanation: "Part 1 covers scope, object, and fundamental principles of electrical safety.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Document Structure",
    category: "Fundamentals"
  },
  {
    id: 4,
    question: "What does 'skilled person' mean in BS7671?",
    options: ["Anyone with basic training", "Person with technical knowledge and experience", "Licensed electrician only", "Building inspector"],
    correctAnswer: 1,
    explanation: "A skilled person has sufficient technical knowledge and experience to avoid dangers which electricity may create.",
    section: "Introduction",
    difficulty: "basic",
    topic: "Definitions",
    category: "Fundamentals"
  },
  {
    id: 5,
    question: "What is the maximum voltage considered as extra-low voltage?",
    options: ["12V", "24V", "50V", "120V"],
    correctAnswer: 2,
    explanation: "Extra-low voltage (ELV) does not exceed 50V AC or 120V ripple-free DC.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Voltage Definitions",
    category: "Fundamentals"
  },
  {
    id: 6,
    question: "Which regulation covers protection against electric shock?",
    options: ["Chapter 41", "Chapter 42", "Chapter 43", "Chapter 44"],
    correctAnswer: 0,
    explanation: "Chapter 41 of BS7671 specifically covers protection against electric shock.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Regulation References",
    category: "Fundamentals"
  },
  {
    id: 7,
    question: "What does SELV stand for?",
    options: ["Safety Extra Low Voltage", "Separated Extra Low Voltage", "Standard Extra Low Voltage", "Secure Extra Low Voltage"],
    correctAnswer: 1,
    explanation: "SELV stands for Separated Extra Low Voltage, providing protection by separation.",
    section: "Introduction",
    difficulty: "basic",
    topic: "Abbreviations",
    category: "Fundamentals"
  },
  {
    id: 8,
    question: "What is the purpose of basic protection?",
    options: ["Fire prevention", "Protection against indirect contact", "Protection against direct contact", "Overload protection"],
    correctAnswer: 2,
    explanation: "Basic protection prevents direct contact with live parts under normal conditions.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Protection Types",
    category: "Protection"
  },
  {
    id: 9,
    question: "Which Part of BS7671 contains definitions?",
    options: ["Part 1", "Part 2", "Part 3", "Part 4"],
    correctAnswer: 1,
    explanation: "Part 2 contains definitions of terms used throughout BS7671.",
    section: "Introduction",
    difficulty: "basic",
    topic: "Document Structure",
    category: "Fundamentals"
  },
  {
    id: 10,
    question: "What is fault protection?",
    options: ["Protection against direct contact", "Protection against indirect contact", "Overload protection", "Fire protection"],
    correctAnswer: 1,
    explanation: "Fault protection (previously called indirect contact protection) protects against electric shock from exposed conductive parts.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Protection Types",
    category: "Protection"
  },
  {
    id: 11,
    question: "What is the standard AC frequency in the UK?",
    options: ["50Hz", "60Hz", "25Hz", "100Hz"],
    correctAnswer: 0,
    explanation: "The standard AC frequency in the UK is 50Hz as specified in BS7671.",
    section: "Introduction",
    difficulty: "basic",
    topic: "Supply Characteristics",
    category: "Fundamentals"
  },
  {
    id: 12,
    question: "Which voltage is considered low voltage in BS7671?",
    options: ["Up to 50V", "51V to 1000V AC", "1001V to 35kV", "Above 35kV"],
    correctAnswer: 1,
    explanation: "Low voltage is normally between 50V and 1000V AC or 120V and 1500V DC.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Voltage Definitions",
    category: "Fundamentals"
  },
  {
    id: 13,
    question: "What does PELV stand for?",
    options: ["Protected Extra Low Voltage", "Portable Extra Low Voltage", "Primary Extra Low Voltage", "Permanent Extra Low Voltage"],
    correctAnswer: 0,
    explanation: "PELV stands for Protected Extra Low Voltage, which is earthed for functional purposes.",
    section: "Introduction",
    difficulty: "basic",
    topic: "Abbreviations",
    category: "Fundamentals"
  },
  {
    id: 14,
    question: "Which appendix covers current-carrying capacity of cables?",
    options: ["Appendix 3", "Appendix 4", "Appendix 5", "Appendix 6"],
    correctAnswer: 1,
    explanation: "Appendix 4 provides tables for current-carrying capacity of cables and correction factors.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Document Structure",
    category: "Fundamentals"
  },
  {
    id: 15,
    question: "What is the purpose of additional protection?",
    options: ["Replace basic protection", "Supplement basic and fault protection", "Provide overcurrent protection", "Prevent fire"],
    correctAnswer: 1,
    explanation: "Additional protection supplements basic and fault protection for enhanced safety.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Protection Types",
    category: "Protection"
  },
  {
    id: 16,
    question: "Which regulation requires RCD protection for socket outlets?",
    options: ["411.3.3", "415.1.1", "531.2.4", "701.411.3.3"],
    correctAnswer: 0,
    explanation: "Regulation 411.3.3 requires RCD protection for socket outlets not exceeding 20A.",
    section: "Introduction",
    difficulty: "advanced",
    topic: "Regulation References",
    category: "Protection"
  },
  {
    id: 17,
    question: "What is the maximum earth fault loop impedance for a B6 MCB?",
    options: ["7.28Ω", "3.64Ω", "1.82Ω", "0.91Ω"],
    correctAnswer: 0,
    explanation: "For a B6 MCB, the maximum earth fault loop impedance (Zs) is 7.28Ω.",
    section: "Introduction",
    difficulty: "advanced",
    topic: "Impedance Values",
    category: "Protection"
  },
  {
    id: 18,
    question: "Which Part of BS7671 covers selection and erection of equipment?",
    options: ["Part 3", "Part 4", "Part 5", "Part 6"],
    correctAnswer: 2,
    explanation: "Part 5 covers selection and erection of electrical equipment.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Document Structure",
    category: "Fundamentals"
  },
  {
    id: 19,
    question: "What does TN-S earthing system signify?",
    options: ["Terra Neutral Separate", "Multiple earthed neutral", "Isolated neutral", "Combined neutral earth"],
    correctAnswer: 0,
    explanation: "TN-S has separate neutral and protective conductors throughout the system.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Earthing Systems",
    category: "Earthing"
  },
  {
    id: 20,
    question: "Which regulation covers isolation and switching?",
    options: ["Chapter 46", "Chapter 53", "Chapter 54", "Chapter 55"],
    correctAnswer: 1,
    explanation: "Chapter 53 covers protection, isolation, switching, control and monitoring.",
    section: "Introduction",
    difficulty: "intermediate",
    topic: "Regulation References",
    category: "Protection"
  },

  // Module 2: Earthing & Bonding Requirements (20 questions)
  {
    id: 21,
    question: "What is the purpose of main protective bonding?",
    options: ["Reduce touch voltages", "Provide fault current path", "Both reduce touch voltages and provide fault path", "Improve power quality"],
    correctAnswer: 2,
    explanation: "Main protective bonding reduces touch voltages and provides an alternative fault current path.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Bonding Purpose",
    category: "Earthing"
  },
  {
    id: 22,
    question: "What is the minimum cross-sectional area for main protective bonding conductor where the earthing conductor is 16mm²?",
    options: ["6mm²", "10mm²", "16mm²", "25mm²"],
    correctAnswer: 1,
    explanation: "Main protective bonding conductor should be at least half the earthing conductor size, minimum 6mm², so 10mm² for 16mm² earthing conductor.",
    section: "Earthing & Bonding",
    difficulty: "advanced",
    topic: "Conductor Sizing",
    category: "Earthing"
  },
  {
    id: 23,
    question: "Which services require main protective bonding?",
    options: ["Water only", "Gas only", "Water and gas", "Water, gas, oil, air conditioning and structural steelwork"],
    correctAnswer: 3,
    explanation: "All extraneous conductive parts including water, gas, oil, air conditioning and structural steelwork require main protective bonding.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Bonding Requirements",
    category: "Earthing"
  },
  {
    id: 24,
    question: "Where should main protective bonding connections be made to water pipes?",
    options: ["Before the stop tap", "After the stop tap", "At the water meter", "Anywhere on the pipe"],
    correctAnswer: 1,
    explanation: "Main protective bonding should be made within 600mm of the stop tap, after it enters the building.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Installation Requirements",
    category: "Earthing"
  },
  {
    id: 25,
    question: "What is the maximum resistance for earthing electrode?",
    options: ["1Ω", "20Ω", "200Ω", "No specific limit"],
    correctAnswer: 2,
    explanation: "The resistance area of the earthing electrode should not exceed 200Ω for TT systems.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Resistance Values",
    category: "Earthing"
  },
  {
    id: 26,
    question: "What is supplementary bonding?",
    options: ["Additional earthing", "Bonding between exposed and extraneous parts", "Secondary main bonding", "Equipment bonding"],
    correctAnswer: 1,
    explanation: "Supplementary bonding connects exposed and extraneous conductive parts together.",
    section: "Earthing & Bonding",
    difficulty: "basic",
    topic: "Bonding Types",
    category: "Earthing"
  },
  {
    id: 27,
    question: "When can supplementary bonding be omitted?",
    options: ["Never", "When RCD protection is provided", "When disconnection times are met", "Both when RCD protection and disconnection times criteria are met"],
    correctAnswer: 3,
    explanation: "Supplementary bonding can be omitted when RCD protection (≤30mA) is provided and disconnection time requirements are met.",
    section: "Earthing & Bonding",
    difficulty: "advanced",
    topic: "Bonding Requirements",
    category: "Earthing"
  },
  {
    id: 28,
    question: "What is the minimum size for supplementary bonding conductor connecting two extraneous conductive parts?",
    options: ["2.5mm²", "4mm²", "6mm²", "10mm²"],
    correctAnswer: 1,
    explanation: "Minimum 4mm² for supplementary bonding between extraneous conductive parts.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Conductor Sizing",
    category: "Earthing"
  },
  {
    id: 29,
    question: "What does TT earthing system indicate?",
    options: ["Direct connection to earth", "System with earthing electrode", "Isolated system", "Multiple earthed system"],
    correctAnswer: 1,
    explanation: "TT system has direct connection of neutral to earth and installation earthing electrode independent of supply earthing.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Earthing Systems",
    category: "Earthing"
  },
  {
    id: 30,
    question: "What is the maximum earth fault loop impedance for RCD protection in TT system?",
    options: ["50/IΔn", "50/Ia", "No limit with RCD", "200Ω"],
    correctAnswer: 0,
    explanation: "For TT systems with RCD, Zs should not exceed 50/IΔn where IΔn is RCD rating.",
    section: "Earthing & Bonding",
    difficulty: "advanced",
    topic: "Impedance Calculations",
    category: "Earthing"
  },
  {
    id: 31,
    question: "Which regulation covers earthing arrangements?",
    options: ["Chapter 54", "Chapter 41", "Chapter 53", "Chapter 52"],
    correctAnswer: 0,
    explanation: "Chapter 54 specifically covers earthing arrangements and protective conductors.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Regulation References",
    category: "Earthing"
  },
  {
    id: 32,
    question: "What is the minimum cross-sectional area for circuit protective conductor in a 2.5mm² cable?",
    options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
    correctAnswer: 0,
    explanation: "For cables up to 16mm², the cpc should be at least the same size as the live conductors, so 1.5mm² is acceptable for a 2.5mm² cable with 1.5mm² cpc.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Conductor Sizing",
    category: "Earthing"
  },
  {
    id: 33,
    question: "What colour is the protective conductor?",
    options: ["Green", "Yellow", "Green and yellow", "Blue"],
    correctAnswer: 2,
    explanation: "Protective conductors must be identified by green-and-yellow striped insulation.",
    section: "Earthing & Bonding",
    difficulty: "basic",
    topic: "Identification",
    category: "Earthing"
  },
  {
    id: 34,
    question: "When is additional protection by RCD required?",
    options: ["Always", "For socket outlets ≤20A", "For all circuits", "For lighting only"],
    correctAnswer: 1,
    explanation: "RCD protection is required for socket outlets not exceeding 20A and other specific applications.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Protection Requirements",
    category: "Protection"
  },
  {
    id: 35,
    question: "What is the purpose of functional earthing?",
    options: ["Safety", "Equipment operation", "Fault protection", "Basic protection"],
    correctAnswer: 1,
    explanation: "Functional earthing is required for proper operation of electrical equipment, not safety.",
    section: "Earthing & Bonding",
    difficulty: "basic",
    topic: "Earthing Types",
    category: "Earthing"
  },
  {
    id: 36,
    question: "What is the minimum size for earthing conductor where supply neutral is 35mm²?",
    options: ["16mm²", "25mm²", "35mm²", "50mm²"],
    correctAnswer: 0,
    explanation: "Earthing conductor should be at least half the neutral conductor size, minimum 16mm².",
    section: "Earthing & Bonding",
    difficulty: "advanced",
    topic: "Conductor Sizing",
    category: "Earthing"
  },
  {
    id: 37,
    question: "Where should the main earthing terminal be located?",
    options: ["At the meter", "Near the origin", "In the consumer unit", "Outside the building"],
    correctAnswer: 1,
    explanation: "The main earthing terminal should be located as near as practicable to the origin of the installation.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Installation Requirements",
    category: "Earthing"
  },
  {
    id: 38,
    question: "What is the maximum length for earthing conductor in domestic installation?",
    options: ["No limit", "3m", "6m", "Depends on cross-sectional area"],
    correctAnswer: 3,
    explanation: "Length depends on cross-sectional area - larger conductors can be longer.",
    section: "Earthing & Bonding",
    difficulty: "intermediate",
    topic: "Installation Requirements",
    category: "Earthing"
  },
  {
    id: 39,
    question: "What type of earthing electrode is most common for domestic TT systems?",
    options: ["Earth rod", "Earth tape", "Foundation earth", "Water pipe"],
    correctAnswer: 0,
    explanation: "Earth rods are the most common earthing electrode for domestic TT installations.",
    section: "Earthing & Bonding",
    difficulty: "basic",
    topic: "Electrode Types",
    category: "Earthing"
  },
  {
    id: 40,
    question: "What is equipotential bonding?",
    options: ["Earthing equipment", "Connecting parts to same potential", "Isolating equipment", "Protective bonding"],
    correctAnswer: 1,
    explanation: "Equipotential bonding connects parts together to ensure they are at the same potential.",
    section: "Earthing & Bonding",
    difficulty: "basic",
    topic: "Bonding Types",
    category: "Earthing"
  },

  // Module 3: Protection & Control (20 questions)
  {
    id: 41,
    question: "What are the two types of overcurrent?",
    options: ["Fault and earth fault", "Overload and short circuit", "Phase and neutral", "High and low current"],
    correctAnswer: 1,
    explanation: "Overcurrent comprises overload current and short-circuit current (fault current).",
    section: "Protection & Control",
    difficulty: "basic",
    topic: "Overcurrent Types",
    category: "Protection"
  },
  {
    id: 42,
    question: "What is the purpose of overload protection?",
    options: ["Prevent electric shock", "Protect against fire", "Protect conductors from thermal damage", "Improve power quality"],
    correctAnswer: 2,
    explanation: "Overload protection prevents thermal damage to conductors and connections.",
    section: "Protection & Control",
    difficulty: "basic",
    topic: "Protection Purpose",
    category: "Protection"
  },
  {
    id: 43,
    question: "What is the maximum disconnection time for a 230V socket outlet circuit?",
    options: ["0.1s", "0.4s", "5s", "No limit"],
    correctAnswer: 1,
    explanation: "Maximum disconnection time for socket outlets and mobile equipment is 0.4s at 230V.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "Disconnection Times",
    category: "Protection"
  },
  {
    id: 44,
    question: "What type of MCB has the lowest magnetic tripping current?",
    options: ["Type B", "Type C", "Type D", "Type K"],
    correctAnswer: 0,
    explanation: "Type B MCBs have the lowest magnetic tripping current (3-5 x In).",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "MCB Characteristics",
    category: "Protection"
  },
  {
    id: 45,
    question: "What is the magnetic tripping range for a Type C MCB?",
    options: ["3-5 x In", "5-10 x In", "10-20 x In", "20-30 x In"],
    correctAnswer: 1,
    explanation: "Type C MCBs have magnetic tripping between 5-10 times the rated current.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "MCB Characteristics",
    category: "Protection"
  },
  {
    id: 46,
    question: "What does RCD stand for?",
    options: ["Residual Current Device", "Rapid Circuit Disconnection", "Remote Control Device", "Rated Current Device"],
    correctAnswer: 0,
    explanation: "RCD stands for Residual Current Device, detecting earth leakage current.",
    section: "Protection & Control",
    difficulty: "basic",
    topic: "Abbreviations",
    category: "Protection"
  },
  {
    id: 47,
    question: "What is the standard sensitivity for RCD protecting socket outlets?",
    options: ["10mA", "30mA", "100mA", "300mA"],
    correctAnswer: 1,
    explanation: "30mA RCDs are standard for additional protection of socket outlets and personal protection.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "RCD Ratings",
    category: "Protection"
  },
  {
    id: 48,
    question: "What is the maximum tripping time for a 30mA RCD at rated current?",
    options: ["40ms", "150ms", "300ms", "500ms"],
    correctAnswer: 2,
    explanation: "A 30mA RCD must trip within 300ms at its rated sensitivity current.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "RCD Characteristics",
    category: "Protection"
  },
  {
    id: 49,
    question: "What is discrimination in protection?",
    options: ["Type of RCD", "Selective operation", "Circuit separation", "Load balancing"],
    correctAnswer: 1,
    explanation: "Discrimination ensures that only the protective device closest to the fault operates.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "Protection Coordination",
    category: "Protection"
  },
  {
    id: 50,
    question: "What is the purpose of RCBO?",
    options: ["Overload protection only", "Earth fault protection only", "Combined overload and earth fault protection", "Isolation only"],
    correctAnswer: 2,
    explanation: "RCBO (Residual Current Circuit Breaker with Overcurrent protection) provides both overload and earth fault protection.",
    section: "Protection & Control",
    difficulty: "basic",
    topic: "Device Types",
    category: "Protection"
  },
  {
    id: 51,
    question: "What is the maximum earth fault loop impedance for a B32 MCB?",
    options: ["1.44Ω", "1.37Ω", "0.72Ω", "0.68Ω"],
    correctAnswer: 1,
    explanation: "For a B32 MCB, the maximum earth fault loop impedance (Zs) is 1.37Ω.",
    section: "Protection & Control",
    difficulty: "advanced",
    topic: "Impedance Values",
    category: "Protection"
  },
  {
    id: 52,
    question: "Which protective device is suitable for motor circuits?",
    options: ["Type B MCB", "Type C MCB", "Type D MCB", "Fuse"],
    correctAnswer: 2,
    explanation: "Type D MCBs are suitable for motor circuits due to their high magnetic tripping threshold.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "Device Selection",
    category: "Protection"
  },
  {
    id: 53,
    question: "What is the formula for calculating earth fault loop impedance?",
    options: ["Ze + R1 + R2", "Ze + R1", "Ze + R2", "R1 + R2"],
    correctAnswer: 0,
    explanation: "Earth fault loop impedance Zs = Ze + R1 + R2 (external impedance + live conductor + protective conductor resistances).",
    section: "Protection & Control",
    difficulty: "advanced",
    topic: "Calculations",
    category: "Protection"
  },
  {
    id: 54,
    question: "What is the purpose of arc fault detection devices (AFDD)?",
    options: ["Detect overloads", "Detect earth faults", "Detect dangerous arcing", "Provide isolation"],
    correctAnswer: 2,
    explanation: "AFDDs detect dangerous arcing conditions that could cause fires.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "Device Types",
    category: "Protection"
  },
  {
    id: 55,
    question: "What is the maximum time delay for high-sensitivity RCD?",
    options: ["Non-delayed", "S-type", "40ms maximum", "300ms maximum"],
    correctAnswer: 0,
    explanation: "General-use RCDs are non-delayed (instantaneous) types for personal protection.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "RCD Characteristics",
    category: "Protection"
  },
  {
    id: 56,
    question: "When is an isolator required?",
    options: ["Every circuit", "Main switch only", "Where access needed for maintenance", "Distribution boards only"],
    correctAnswer: 2,
    explanation: "Isolators are required where access is needed for maintenance work on circuits.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "Isolation Requirements",
    category: "Protection"
  },
  {
    id: 57,
    question: "What is the purpose of emergency switching?",
    options: ["Normal operation", "Maintenance", "Immediate danger prevention", "Energy saving"],
    correctAnswer: 2,
    explanation: "Emergency switching provides rapid disconnection to prevent or remove immediate danger.",
    section: "Protection & Control",
    difficulty: "basic",
    topic: "Switching Types",
    category: "Protection"
  },
  {
    id: 58,
    question: "Which regulation covers overcurrent protection?",
    options: ["Chapter 43", "Chapter 42", "Chapter 44", "Chapter 45"],
    correctAnswer: 0,
    explanation: "Chapter 43 covers protection against overcurrent.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "Regulation References",
    category: "Protection"
  },
  {
    id: 59,
    question: "What is back-up protection?",
    options: ["Secondary protection", "Upstream protection", "Fault current limitation", "Load protection"],
    correctAnswer: 2,
    explanation: "Back-up protection provides fault current limitation when the normal protective device cannot handle the fault current.",
    section: "Protection & Control",
    difficulty: "advanced",
    topic: "Protection Coordination",
    category: "Protection"
  },
  {
    id: 60,
    question: "What is the operating principle of an RCD?",
    options: ["Voltage detection", "Current balance", "Temperature rise", "Frequency change"],
    correctAnswer: 1,
    explanation: "RCDs operate on the principle of current balance - detecting difference between live and neutral currents.",
    section: "Protection & Control",
    difficulty: "intermediate",
    topic: "RCD Principles",
    category: "Protection"
  },

  // Module 4: Cable Selection & Installation (18 questions)
  {
    id: 61,
    question: "What factors affect cable current-carrying capacity?",
    options: ["Temperature only", "Installation method only", "Grouping only", "Temperature, installation method, and grouping"],
    correctAnswer: 3,
    explanation: "Current-carrying capacity is affected by ambient temperature, installation method, and cable grouping.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Derating Factors",
    category: "Cables"
  },
  {
    id: 62,
    question: "What is the standard ambient temperature for cable ratings?",
    options: ["20°C", "25°C", "30°C", "35°C"],
    correctAnswer: 2,
    explanation: "Standard ambient temperature for cable current-carrying capacity tables is 30°C.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Rating Conditions",
    category: "Cables"
  },
  {
    id: 63,
    question: "What installation method gives the highest current-carrying capacity?",
    options: ["Clipped direct", "In conduit", "In trunking", "Buried direct"],
    correctAnswer: 0,
    explanation: "Clipped direct installation (Method C) generally provides the highest current-carrying capacity.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Installation Methods",
    category: "Cables"
  },
  {
    id: 64,
    question: "What is the purpose of derating factors?",
    options: ["Increase capacity", "Reduce capacity for adverse conditions", "Calculate volt drop", "Determine cable size"],
    correctAnswer: 1,
    explanation: "Derating factors reduce the current-carrying capacity to account for adverse installation conditions.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Derating Factors",
    category: "Cables"
  },
  {
    id: 65,
    question: "What is the maximum voltage drop for lighting circuits?",
    options: ["3%", "5%", "7%", "10%"],
    correctAnswer: 0,
    explanation: "Maximum voltage drop for lighting circuits is 3% of nominal voltage.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Voltage Drop",
    category: "Cables"
  },
  {
    id: 66,
    question: "What is the maximum voltage drop for power circuits?",
    options: ["3%", "5%", "7%", "10%"],
    correctAnswer: 1,
    explanation: "Maximum voltage drop for power circuits is 5% of nominal voltage.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Voltage Drop",
    category: "Cables"
  },
  {
    id: 67,
    question: "Which cable type is suitable for bathroom installations?",
    options: ["PVC/PVC", "PVC/SWA", "XLPE", "Heat resistant cable meeting installation requirements"],
    correctAnswer: 3,
    explanation: "Cables in bathrooms must meet specific requirements for the zone and be suitable for damp conditions.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Special Locations",
    category: "Cables"
  },
  {
    id: 68,
    question: "What is the minimum bending radius for PVC cables?",
    options: ["3 x diameter", "4 x diameter", "6 x diameter", "8 x diameter"],
    correctAnswer: 1,
    explanation: "Minimum bending radius for PVC cables is 4 times the overall diameter.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Installation Requirements",
    category: "Cables"
  },
  {
    id: 69,
    question: "What does SWA cable stand for?",
    options: ["Steel Wire Armoured", "Single Wire Armoured", "Standard Wire Armoured", "Screened Wire Armoured"],
    correctAnswer: 0,
    explanation: "SWA stands for Steel Wire Armoured cable, providing mechanical protection.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Cable Types",
    category: "Cables"
  },
  {
    id: 70,
    question: "When should fire-resistant cables be used?",
    options: ["All installations", "Emergency circuits", "Outdoor installations", "Industrial only"],
    correctAnswer: 1,
    explanation: "Fire-resistant cables are required for emergency lighting, fire alarms, and escape route lighting.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Cable Selection",
    category: "Cables"
  },
  {
    id: 71,
    question: "What is the purpose of cable armouring?",
    options: ["Increase capacity", "Mechanical protection", "Reduce voltage drop", "Improve insulation"],
    correctAnswer: 1,
    explanation: "Cable armouring provides mechanical protection against damage.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Cable Construction",
    category: "Cables"
  },
  {
    id: 72,
    question: "What size cable is required for a 32A ring final circuit?",
    options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
    correctAnswer: 1,
    explanation: "A 32A ring final circuit typically uses 2.5mm² cable with 1.5mm² cpc.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Cable Sizing",
    category: "Cables"
  },
  {
    id: 73,
    question: "What is the standard colour for single-phase neutral conductor?",
    options: ["Black", "Blue", "Grey", "White"],
    correctAnswer: 1,
    explanation: "Single-phase neutral conductor is identified by blue colour.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Identification",
    category: "Cables"
  },
  {
    id: 74,
    question: "What installation method requires the most derating?",
    options: ["Clipped direct", "In conduit bunched", "In trunking", "Underground"],
    correctAnswer: 1,
    explanation: "Cables bunched together in conduit require the most derating due to poor heat dissipation.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Derating Factors",
    category: "Cables"
  },
  {
    id: 75,
    question: "What is the minimum cross-sectional area for fixed wiring?",
    options: ["0.5mm²", "1.0mm²", "1.5mm²", "2.5mm²"],
    correctAnswer: 2,
    explanation: "Minimum cross-sectional area for fixed wiring is 1.5mm² for power circuits.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Cable Sizing",
    category: "Cables"
  },
  {
    id: 76,
    question: "When can aluminium conductors be used?",
    options: ["Never", "16mm² and above", "25mm² and above", "Any size"],
    correctAnswer: 1,
    explanation: "Aluminium conductors can be used for 16mm² and above in fixed installations.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Conductor Materials",
    category: "Cables"
  },
  {
    id: 77,
    question: "What is MICC cable?",
    options: ["Mineral Insulated Copper Clad", "Metal Insulated Copper Cable", "Moisture Insulated Cable", "Multiple Insulated Cable"],
    correctAnswer: 0,
    explanation: "MICC is Mineral Insulated Copper Clad cable, highly fire-resistant.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Cable Types",
    category: "Cables"
  },
  {
    id: 78,
    question: "What depth should cables be buried underground?",
    options: ["300mm", "450mm", "600mm", "750mm"],
    correctAnswer: 2,
    explanation: "Cables should be buried at least 600mm deep or with additional mechanical protection.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Installation Requirements",
    category: "Cables"
  },

  // Module 5: Inspection Procedures (16 questions)
  {
    id: 79,
    question: "What must be done before starting any inspection?",
    options: ["Test instruments", "Visual inspection", "Obtain safe isolation", "Check documentation"],
    correctAnswer: 2,
    explanation: "Safe isolation must be achieved before starting any inspection work to ensure safety.",
    section: "Inspection",
    difficulty: "basic",
    topic: "Safety Procedures",
    category: "Testing"
  },
  {
    id: 80,
    question: "What is the first step in visual inspection?",
    options: ["Check earthing", "Check segregation", "Check general condition", "Check protection"],
    correctAnswer: 2,
    explanation: "Visual inspection starts with checking the general condition and compliance with BS7671.",
    section: "Inspection",
    difficulty: "basic",
    topic: "Inspection Sequence",
    category: "Testing"
  },
  {
    id: 81,
    question: "What should be inspected at the origin of the installation?",
    options: ["Earthing and bonding only", "Main switch only", "Consumer unit only", "Earthing, bonding, main switch, and consumer unit"],
    correctAnswer: 3,
    explanation: "Inspection at origin includes earthing arrangements, main protective bonding, main switch, and consumer unit.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Inspection Scope",
    category: "Testing"
  },
  {
    id: 82,
    question: "What equipment requires inspection of IP rating?",
    options: ["All equipment", "Bathroom equipment only", "Outdoor equipment only", "Equipment in special locations"],
    correctAnswer: 3,
    explanation: "IP ratings must be checked for equipment in special locations like bathrooms and outdoor areas.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Special Locations",
    category: "Testing"
  },
  {
    id: 83,
    question: "What should be checked regarding cable installations?",
    options: ["Size only", "Type only", "Route only", "Size, type, route, and condition"],
    correctAnswer: 3,
    explanation: "Cable inspection includes checking size, type, routing, condition, and support.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Cable Inspection",
    category: "Testing"
  },
  {
    id: 84,
    question: "When should RCD functionality be tested during inspection?",
    options: ["Never during visual inspection", "Always during visual inspection", "Only if operation button present", "After dead testing"],
    correctAnswer: 2,
    explanation: "RCD test button should be operated during visual inspection if present and safe to do so.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "RCD Testing",
    category: "Testing"
  },
  {
    id: 85,
    question: "What connections should be checked for tightness?",
    options: ["Main connections only", "Accessible connections", "All connections", "Consumer unit only"],
    correctAnswer: 1,
    explanation: "All accessible connections should be checked for tightness during inspection.",
    section: "Inspection",
    difficulty: "basic",
    topic: "Connection Inspection",
    category: "Testing"
  },
  {
    id: 86,
    question: "What should be inspected regarding protective conductors?",
    options: ["Presence only", "Size only", "Connections only", "Presence, size, condition, and connections"],
    correctAnswer: 3,
    explanation: "Protective conductor inspection includes checking presence, size, condition, and connections.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Earthing Inspection",
    category: "Testing"
  },
  {
    id: 87,
    question: "How should cable supports be spaced?",
    options: ["No specific requirement", "According to manufacturer", "According to BS7671 tables", "Every 300mm"],
    correctAnswer: 2,
    explanation: "Cable supports should be spaced according to BS7671 tables based on cable type and installation method.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Installation Standards",
    category: "Testing"
  },
  {
    id: 88,
    question: "What fire precautions should be checked?",
    options: ["Sealing of holes only", "Emergency lighting only", "Fire barriers only", "Sealing, barriers, and emergency systems"],
    correctAnswer: 3,
    explanation: "Fire precautions include checking sealing of holes, fire barriers, and emergency lighting systems.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Fire Safety",
    category: "Testing"
  },
  {
    id: 89,
    question: "What should be checked regarding identification?",
    options: ["Circuit labels only", "Cable colours only", "Protective device ratings only", "All identification and labelling"],
    correctAnswer: 3,
    explanation: "All identification including circuit labels, cable colours, and protective device ratings should be checked.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Testing"
  },
  {
    id: 90,
    question: "When should warning notices be provided?",
    options: ["Always", "For high voltage only", "Where multiple supplies exist", "For industrial installations only"],
    correctAnswer: 2,
    explanation: "Warning notices are required where multiple supplies exist or other special conditions apply.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Safety Notices",
    category: "Testing"
  },
  {
    id: 91,
    question: "What should be checked about socket outlet locations?",
    options: ["Height only", "Type only", "Protection only", "Height, type, protection, and suitability for location"],
    correctAnswer: 3,
    explanation: "Socket outlet inspection includes height, type, protection, and suitability for the specific location.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Socket Inspection",
    category: "Testing"
  },
  {
    id: 92,
    question: "How should switchgear accessibility be assessed?",
    options: ["Opening access only", "Clear space around equipment", "Labelling only", "All access and operational requirements"],
    correctAnswer: 3,
    explanation: "Switchgear accessibility includes adequate space, clear access, proper labelling, and operational safety.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Switchgear Inspection",
    category: "Testing"
  },
  {
    id: 93,
    question: "What external influences should be considered?",
    options: ["Temperature only", "Moisture only", "Mechanical damage only", "All environmental factors"],
    correctAnswer: 3,
    explanation: "External influences include temperature, moisture, mechanical damage, corrosion, and other environmental factors.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Environmental Assessment",
    category: "Testing"
  },
  {
    id: 94,
    question: "When should non-standard arrangements be noted?",
    options: ["Never", "Always", "If they affect safety", "If they affect compliance"],
    correctAnswer: 3,
    explanation: "Any non-standard arrangements that affect compliance with BS7671 should be noted and assessed.",
    section: "Inspection",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Testing"
  },

  // Module 6: Testing Requirements (18 questions)
  {
    id: 95,
    question: "What is the correct sequence for initial verification tests?",
    options: ["Any order", "Continuity, insulation, polarity, RCD", "Insulation, continuity, RCD, polarity", "As per BS7671 sequence"],
    correctAnswer: 3,
    explanation: "Tests must be carried out in the sequence specified in BS7671 for safety and accuracy.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Test Sequence",
    category: "Testing"
  },
  {
    id: 96,
    question: "What is the test voltage for insulation resistance on 230V circuits?",
    options: ["250V", "500V", "1000V", "1500V"],
    correctAnswer: 1,
    explanation: "Insulation resistance test voltage for circuits up to 500V is 500V DC.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Insulation Testing",
    category: "Testing"
  },
  {
    id: 97,
    question: "What is the minimum acceptable insulation resistance?",
    options: ["0.5MΩ", "1MΩ", "2MΩ", "5MΩ"],
    correctAnswer: 1,
    explanation: "Minimum insulation resistance is 1MΩ for circuits up to 500V.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Test Values",
    category: "Testing"
  },
  {
    id: 98,
    question: "How should continuity of protective conductors be tested?",
    options: ["Visual inspection only", "Low resistance ohmmeter", "Insulation tester", "High current injection"],
    correctAnswer: 1,
    explanation: "Protective conductor continuity is tested using a low resistance ohmmeter.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Continuity Testing",
    category: "Testing"
  },
  {
    id: 99,
    question: "What should be disconnected during insulation resistance testing?",
    options: ["Nothing", "Sensitive equipment only", "All electronic equipment", "Equipment that could be damaged"],
    correctAnswer: 3,
    explanation: "All equipment that could be damaged by the test voltage should be disconnected.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Test Preparation",
    category: "Testing"
  },
  {
    id: 100,
    question: "How is earth electrode resistance measured?",
    options: ["Multimeter", "Insulation tester", "Earth electrode tester", "Continuity tester"],
    correctAnswer: 2,
    explanation: "Earth electrode resistance requires a specific earth electrode tester using the fall-of-potential method.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Earth Testing",
    category: "Testing"
  },
  {
    id: 101,
    question: "What is the test current for RCD operation time testing?",
    options: ["0.5 x IΔn", "1 x IΔn", "5 x IΔn", "All of these"],
    correctAnswer: 3,
    explanation: "RCD testing includes 0.5 x IΔn (should not trip), 1 x IΔn, and 5 x IΔn for operation times.",
    section: "Testing",
    difficulty: "advanced",
    topic: "RCD Testing",
    category: "Testing"
  },
  {
    id: 102,
    question: "What is the maximum tripping time for an RCD at 5 x IΔn?",
    options: ["40ms", "150ms", "300ms", "500ms"],
    correctAnswer: 0,
    explanation: "At 5 times rated residual current, an RCD must trip within 40ms.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "RCD Testing",
    category: "Testing"
  },
  {
    id: 103,
    question: "How should polarity be tested?",
    options: ["Visual inspection", "Low resistance ohmmeter", "Insulation tester", "Live testing only"],
    correctAnswer: 1,
    explanation: "Polarity should be tested using a low resistance ohmmeter with the supply isolated.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Polarity Testing",
    category: "Testing"
  },
  {
    id: 104,
    question: "What is measured during earth fault loop impedance testing?",
    options: ["Ze only", "R1+R2 only", "Zs", "All impedances"],
    correctAnswer: 2,
    explanation: "Earth fault loop impedance testing measures Zs, the total loop impedance including supply impedance.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Loop Impedance",
    category: "Testing"
  },
  {
    id: 105,
    question: "When should prospective fault current be measured?",
    options: ["Never", "Always", "At origin only", "At each distribution board"],
    correctAnswer: 3,
    explanation: "Prospective fault current should be measured at the origin and each distribution board.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Fault Current",
    category: "Testing"
  },
  {
    id: 106,
    question: "What type of multimeter should be used for low resistance measurements?",
    options: ["Any digital multimeter", "Analogue multimeter", "Low resistance ohmmeter", "Insulation tester"],
    correctAnswer: 2,
    explanation: "Low resistance measurements require a specific low resistance ohmmeter with adequate test current.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Testing"
  },
  {
    id: 107,
    question: "How should test results be compared?",
    options: ["With previous results", "With calculated values", "With BS7671 requirements", "All of these"],
    correctAnswer: 3,
    explanation: "Test results should be compared with design calculations, previous results, and BS7671 requirements.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Results Analysis",
    category: "Testing"
  },
  {
    id: 108,
    question: "What should be tested on a ring final circuit?",
    options: ["Continuity only", "Insulation only", "Continuity, insulation, and correct wiring", "Visual inspection only"],
    correctAnswer: 2,
    explanation: "Ring circuits require continuity testing, insulation testing, and verification of correct wiring.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Ring Circuit Testing",
    category: "Testing"
  },
  {
    id: 109,
    question: "When should functional testing be carried out?",
    options: ["Before other tests", "After all other tests", "During installation", "Never"],
    correctAnswer: 1,
    explanation: "Functional testing should be carried out after all other tests to verify proper operation.",
    section: "Testing",
    difficulty: "basic",
    topic: "Test Sequence",
    category: "Testing"
  },
  {
    id: 110,
    question: "What documentation must be provided after testing?",
    options: ["Test results only", "Certificate only", "Schedule only", "Certificate and schedules"],
    correctAnswer: 3,
    explanation: "An Electrical Installation Certificate and test result schedules must be provided.",
    section: "Testing",
    difficulty: "basic",
    topic: "Documentation",
    category: "Testing"
  },
  {
    id: 111,
    question: "How often should test instruments be calibrated?",
    options: ["Monthly", "Annually", "Every 2 years", "When accuracy is questioned"],
    correctAnswer: 1,
    explanation: "Test instruments should be calibrated annually to ensure accuracy.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Equipment Maintenance",
    category: "Testing"
  },
  {
    id: 112,
    question: "What is the purpose of phase sequence testing?",
    options: ["Check voltage levels", "Verify correct rotation", "Test insulation", "Measure current"],
    correctAnswer: 1,
    explanation: "Phase sequence testing verifies correct rotation for three-phase motor operation.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Three-Phase Testing",
    category: "Testing"
  },

  // Module 7: Special Locations (18 questions)
  {
    id: 113,
    question: "How many zones are there in a bathroom?",
    options: ["2", "3", "4", "Depends on the bathroom"],
    correctAnswer: 1,
    explanation: "Bathrooms are divided into zones 0, 1, and 2 based on likelihood of water contact.",
    section: "Special Locations",
    difficulty: "basic",
    topic: "Bathroom Zones",
    category: "Special Locations"
  },
  {
    id: 114,
    question: "What IP rating is required for equipment in bathroom zone 1?",
    options: ["IPX1", "IPX4", "IPX5", "IPX7"],
    correctAnswer: 3,
    explanation: "Equipment in bathroom zone 1 requires minimum IPX7 protection against water immersion.",
    section: "Special Locations",
    difficulty: "advanced",
    topic: "IP Ratings",
    category: "Special Locations"
  },
  {
    id: 115,
    question: "Can socket outlets be installed in bathroom zone 2?",
    options: ["Yes, any type", "No, never", "Yes, with RCD protection", "Yes, if IPX4 rated"],
    correctAnswer: 1,
    explanation: "Socket outlets are not permitted in zones 0, 1, or 2 of bathrooms (except shaver sockets in zone 2).",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Socket Restrictions",
    category: "Special Locations"
  },
  {
    id: 116,
    question: "What is the horizontal extent of bathroom zone 1?",
    options: ["0.6m from bath/shower", "1.2m from bath/shower", "2.25m from bath/shower", "Entire bathroom"],
    correctAnswer: 0,
    explanation: "Zone 1 extends 0.6m horizontally from the bath or shower basin.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Zone Dimensions",
    category: "Special Locations"
  },
  {
    id: 117,
    question: "Where can switches be located in bathrooms?",
    options: ["Anywhere", "Zone 2 only", "Outside zones or cord operated", "Zone 3 only"],
    correctAnswer: 2,
    explanation: "Switches must be outside the zones or be cord-operated (pull cord switches).",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Switch Locations",
    category: "Special Locations"
  },
  {
    id: 118,
    question: "What additional protection is required for all circuits in bathrooms?",
    options: ["MCB protection", "RCD ≤30mA", "RCBO protection", "Isolation switch"],
    correctAnswer: 1,
    explanation: "All circuits in bathrooms require additional protection by RCD not exceeding 30mA.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Protection Requirements",
    category: "Special Locations"
  },
  {
    id: 119,
    question: "When is supplementary bonding required in bathrooms?",
    options: ["Always", "Never", "When disconnection times cannot be met", "Only in zone 0"],
    correctAnswer: 2,
    explanation: "Supplementary bonding is required when automatic disconnection times cannot be achieved.",
    section: "Special Locations",
    difficulty: "advanced",
    topic: "Bonding Requirements",
    category: "Special Locations"
  },
  {
    id: 120,
    question: "What is zone 0 in a bathroom?",
    options: ["Around light switches", "Inside bath/shower tray", "0.6m from bath", "2.25m from bath"],
    correctAnswer: 1,
    explanation: "Zone 0 is the interior of the bath or shower tray where water is present.",
    section: "Special Locations",
    difficulty: "basic",
    topic: "Zone Definitions",
    category: "Special Locations"
  },
  {
    id: 121,
    question: "Can electric heating elements be installed under bathroom floors?",
    options: ["Never", "Only outside zones", "Yes, with appropriate protection", "Only in zone 3"],
    correctAnswer: 2,
    explanation: "Floor heating cables can be installed with appropriate protection and compliance with zonal requirements.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Floor Heating",
    category: "Special Locations"
  },
  {
    id: 122,
    question: "What voltage is permitted for equipment in bathroom zone 0?",
    options: ["230V", "12V", "SELV ≤12V", "No electrical equipment"],
    correctAnswer: 2,
    explanation: "Only SELV equipment not exceeding 12V is permitted in zone 0.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Voltage Requirements",
    category: "Special Locations"
  },
  {
    id: 123,
    question: "Can light fittings be installed in bathroom zone 1?",
    options: ["No", "Yes, any type", "Yes, if suitable IP rating", "Only SELV"],
    correctAnswer: 2,
    explanation: "Light fittings can be installed in zone 1 if they have appropriate IP rating and protection.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Lighting Requirements",
    category: "Special Locations"
  },
  {
    id: 124,
    question: "What is the height of bathroom zones 1 and 2?",
    options: ["2.0m", "2.25m", "2.5m", "To ceiling"],
    correctAnswer: 1,
    explanation: "Zones 1 and 2 extend to a height of 2.25m above floor level.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Zone Dimensions",
    category: "Special Locations"
  },
  {
    id: 125,
    question: "Can towel rails be connected permanently in bathrooms?",
    options: ["Never", "Only outside zones", "Yes, with appropriate protection", "Zone 2 only"],
    correctAnswer: 2,
    explanation: "Electric towel rails can be permanently connected with RCD protection and appropriate installation.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Fixed Equipment",
    category: "Special Locations"
  },
  {
    id: 126,
    question: "What special requirements apply to swimming pools?",
    options: ["Same as bathrooms", "More stringent zones", "No special requirements", "SELV only"],
    correctAnswer: 1,
    explanation: "Swimming pools have more stringent zonal requirements with zones 0, 1, and 2.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Swimming Pools",
    category: "Special Locations"
  },
  {
    id: 127,
    question: "Can ceiling-mounted equipment be installed above a bath?",
    options: ["Never", "Yes, with IPX1", "Yes, with IPX4", "Yes, if outside zones"],
    correctAnswer: 2,
    explanation: "Equipment above baths requires minimum IPX4 protection if it could be affected by water.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Equipment Location",
    category: "Special Locations"
  },
  {
    id: 128,
    question: "What is required for electrical equipment in saunas?",
    options: ["Standard installation", "Heat-resistant equipment", "No electrical equipment", "SELV only"],
    correctAnswer: 1,
    explanation: "Saunas require heat-resistant equipment suitable for high temperature operation.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Saunas",
    category: "Special Locations"
  },
  {
    id: 129,
    question: "Can extract fans be installed in bathroom zone 1?",
    options: ["No", "Yes, any type", "Yes, with appropriate IP rating", "Only low voltage"],
    correctAnswer: 2,
    explanation: "Extract fans can be installed in zone 1 with appropriate IP rating and RCD protection.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Extract Fans",
    category: "Special Locations"
  },
  {
    id: 130,
    question: "What earthing arrangements are required for bathroom equipment?",
    options: ["Standard earthing", "Enhanced earthing", "Local equipotential bonding", "No earthing required"],
    correctAnswer: 2,
    explanation: "Bathroom equipment requires connection to local equipotential bonding if installed.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Earthing Requirements",
    category: "Special Locations"
  },

  // Module 8: Periodic Inspection & Testing (20 questions)
  {
    id: 131,
    question: "What is the recommended interval for domestic periodic inspection?",
    options: ["5 years", "10 years", "15 years", "20 years"],
    correctAnswer: 1,
    explanation: "Domestic installations should be inspected every 10 years or at change of occupancy.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Inspection Intervals",
    category: "Testing"
  },
  {
    id: 132,
    question: "What document is issued after periodic inspection?",
    options: ["EIC", "EICR", "MEIWC", "Test certificate"],
    correctAnswer: 1,
    explanation: "An Electrical Installation Condition Report (EICR) is issued after periodic inspection.",
    section: "Periodic Inspection",
    difficulty: "basic",
    topic: "Documentation",
    category: "Testing"
  },
  {
    id: 133,
    question: "What are the condition codes used in EICR?",
    options: ["1, 2, 3", "A, B, C", "C1, C2, C3", "Pass, Fail"],
    correctAnswer: 2,
    explanation: "EICR uses condition codes C1 (danger), C2 (potentially dangerous), C3 (improvement recommended).",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Condition Codes",
    category: "Testing"
  },
  {
    id: 134,
    question: "What does condition code C1 indicate?",
    options: ["Satisfactory", "Improvement recommended", "Potentially dangerous", "Danger present"],
    correctAnswer: 3,
    explanation: "C1 indicates danger present requiring immediate attention.",
    section: "Periodic Inspection",
    difficulty: "basic",
    topic: "Condition Codes",
    category: "Testing"
  },
  {
    id: 135,
    question: "What does condition code C2 indicate?",
    options: ["Satisfactory", "Potentially dangerous", "Danger present", "Improvement recommended"],
    correctAnswer: 1,
    explanation: "C2 indicates potentially dangerous conditions requiring urgent attention.",
    section: "Periodic Inspection",
    difficulty: "basic",
    topic: "Condition Codes",
    category: "Testing"
  },
  {
    id: 136,
    question: "When can an EICR be classified as 'Satisfactory'?",
    options: ["No defects found", "Only C3 codes present", "No C1 or C2 codes", "All tests pass"],
    correctAnswer: 2,
    explanation: "EICR is satisfactory when no C1 or C2 condition codes are present.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Classification",
    category: "Testing"
  },
  {
    id: 137,
    question: "What percentage of circuits should be tested during periodic inspection?",
    options: ["100%", "50%", "25%", "Representative sample"],
    correctAnswer: 3,
    explanation: "A representative sample of circuits should be tested, typically 25% minimum.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Sampling",
    category: "Testing"
  },
  {
    id: 138,
    question: "Can live testing be carried out during periodic inspection?",
    options: ["Never", "Always", "When dead testing is not practicable", "With permission only"],
    correctAnswer: 2,
    explanation: "Live testing may be necessary when dead testing is not practicable, with appropriate safety measures.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Test Methods",
    category: "Testing"
  },
  {
    id: 139,
    question: "What should be checked regarding protective device ratings?",
    options: ["Current rating only", "Type only", "Discrimination only", "Suitability for circuit protection"],
    correctAnswer: 3,
    explanation: "Protective devices should be checked for suitability, rating, type, and proper discrimination.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Device Assessment",
    category: "Testing"
  },
  {
    id: 140,
    question: "How should deterioration be assessed?",
    options: ["Visual inspection only", "Testing only", "Visual inspection and testing", "Experience only"],
    correctAnswer: 2,
    explanation: "Deterioration is assessed through both visual inspection and appropriate testing.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Assessment Methods",
    category: "Testing"
  },
  {
    id: 141,
    question: "What happens if immediate danger is found during inspection?",
    options: ["Note on EICR only", "Inform client", "Isolate dangerous parts", "Continue inspection"],
    correctAnswer: 2,
    explanation: "If immediate danger is found, dangerous parts should be isolated and made safe immediately.",
    section: "Periodic Inspection",
    difficulty: "basic",
    topic: "Safety Actions",
    category: "Testing"
  },
  {
    id: 142,
    question: "Can an EICR be issued if access is denied to parts of the installation?",
    options: ["No", "Yes, with limitations noted", "Yes, with no restrictions", "Only if 75% inspected"],
    correctAnswer: 1,
    explanation: "EICR can be issued with limitations clearly noted where access is denied.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Limitations",
    category: "Testing"
  },
  {
    id: 143,
    question: "What is the purpose of periodic inspection?",
    options: ["Legal compliance", "Safety assessment", "Insurance requirements", "Condition assessment for continued safe use"],
    correctAnswer: 3,
    explanation: "Periodic inspection assesses the condition of the installation for continued safe use.",
    section: "Periodic Inspection",
    difficulty: "basic",
    topic: "Purpose",
    category: "Testing"
  },
  {
    id: 144,
    question: "Who can carry out periodic inspection?",
    options: ["Anyone", "Qualified electrician", "Competent person", "Building inspector"],
    correctAnswer: 2,
    explanation: "Periodic inspection must be carried out by a competent person with appropriate qualifications and experience.",
    section: "Periodic Inspection",
    difficulty: "basic",
    topic: "Competence",
    category: "Testing"
  },
  {
    id: 145,
    question: "What should be done with obsolete protective devices?",
    options: ["Leave unchanged", "Note as C3", "Replace immediately", "Note as C2"],
    correctAnswer: 3,
    explanation: "Obsolete protective devices should typically be noted as C2 (potentially dangerous).",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Device Assessment",
    category: "Testing"
  },
  {
    id: 146,
    question: "How should previous test results be used?",
    options: ["Ignored", "For comparison only", "To avoid retesting", "As current values"],
    correctAnswer: 1,
    explanation: "Previous test results provide valuable comparison to assess deterioration.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Results Analysis",
    category: "Testing"
  },
  {
    id: 147,
    question: "What is the recommended interval for commercial periodic inspection?",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctAnswer: 2,
    explanation: "Commercial installations should typically be inspected every 5 years.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Inspection Intervals",
    category: "Testing"
  },
  {
    id: 148,
    question: "Can sampling be used for testing identical circuits?",
    options: ["Never", "Always", "For representative assessment", "With client permission"],
    correctAnswer: 2,
    explanation: "Sampling can be used for identical circuits to provide representative assessment.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Sampling",
    category: "Testing"
  },
  {
    id: 149,
    question: "What must be provided to the client after periodic inspection?",
    options: ["EICR only", "Test results only", "EICR and schedules", "Verbal report"],
    correctAnswer: 2,
    explanation: "The client must receive the EICR and appropriate test result schedules.",
    section: "Periodic Inspection",
    difficulty: "basic",
    topic: "Documentation",
    category: "Testing"
  },
  {
    id: 150,
    question: "When should recommendations be implemented?",
    options: ["Immediately", "Within 1 month", "Before next inspection", "Depends on condition code"],
    correctAnswer: 3,
    explanation: "Implementation urgency depends on the condition code: C1 immediate, C2 urgent, C3 when convenient.",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Remedial Actions",
    category: "Testing"
  }
];

// Categories for BS7671 mock exam
export const bs7671Categories = [
  'Fundamentals',
  'Earthing',
  'Protection',
  'Cables',
  'Testing',
  'Special Locations'
];

// Configuration for BS7671 mock exam
export const bs7671MockExamConfig = {
  examId: 'bs7671',
  examTitle: 'BS7671 Mock Examination',
  totalQuestions: 30,
  timeLimit: 3600, // 60 minutes
  passThreshold: 60,
  exitPath: '/electrician/upskilling/bs7671-course',
  categories: bs7671Categories
};

// Function to get random questions for mock exam (30 questions with difficulty distribution)
export const getRandomBS7671ExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(
    bs7671QuestionBank,
    numQuestions,
    bs7671Categories,
    { basic: 0.35, intermediate: 0.45, advanced: 0.2 }
  );
};
