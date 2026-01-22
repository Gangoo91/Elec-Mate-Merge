import { StandardMockQuestion } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// Categories based on the 8 course modules
export const industrialElectricalCategories = [
  'Distribution Systems',
  'Motors & Control',
  'Panel Assembly',
  'PLC & Automation',
  'Fault Finding',
  'Cables & Containment',
  'Power Quality',
  'Safety & Isolation'
];

// Configuration for Industrial Electrical mock exam
export const industrialElectricalMockExamConfig = {
  examId: 'industrial-electrical',
  examTitle: 'Industrial Electrical Systems Mock Examination',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes
  passThreshold: 60,
  exitPath: '/electrician/upskilling/industrial-electrical-course',
  categories: industrialElectricalCategories
};

// Industrial Electrical Mock Exam Question Bank - 120 Questions covering Modules 1-8
export const industrialElectricalQuestionBank: StandardMockQuestion[] = [
  // Module 1: Overview of Industrial Electrical Distribution (15 questions)
  {
    id: 1,
    question: "What is the standard three-phase voltage in UK industrial installations?",
    options: ["230V", "400V", "415V", "440V"],
    correctAnswer: 1,
    explanation: "UK three-phase industrial voltage is 400V line-to-line (230V line-to-neutral) since harmonisation.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Voltage Standards",
    category: "Distribution Systems"
  },
  {
    id: 2,
    question: "What does HV (High Voltage) typically refer to in UK industrial settings?",
    options: ["Above 230V", "Above 1000V AC", "Above 400V", "Above 11kV"],
    correctAnswer: 1,
    explanation: "High Voltage in the UK is defined as exceeding 1000V AC or 1500V DC.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Voltage Classification",
    category: "Distribution Systems"
  },
  {
    id: 3,
    question: "What is the purpose of a main LV switchboard in an industrial installation?",
    options: ["Only metering", "Distribution of power to sub-circuits", "Emergency lighting only", "Motor control only"],
    correctAnswer: 1,
    explanation: "The main LV switchboard receives incoming supply and distributes power to various sub-circuits throughout the facility.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Switchboards",
    category: "Distribution Systems"
  },
  {
    id: 4,
    question: "What is the typical incoming supply voltage for large industrial premises from the DNO?",
    options: ["400V", "3.3kV", "11kV", "33kV"],
    correctAnswer: 2,
    explanation: "Large industrial premises typically receive 11kV supply which is stepped down via transformers.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Supply Voltage",
    category: "Distribution Systems"
  },
  {
    id: 5,
    question: "What is the function of a ring main unit (RMU)?",
    options: ["Motor starting", "HV distribution switching", "Power factor correction", "Earthing"],
    correctAnswer: 1,
    explanation: "Ring Main Units provide switching and protection for HV ring distribution systems.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "HV Equipment",
    category: "Distribution Systems"
  },
  {
    id: 6,
    question: "What type of earthing system is most common in UK industrial installations?",
    options: ["TT", "TN-S", "TN-C-S", "IT"],
    correctAnswer: 2,
    explanation: "TN-C-S (PME) is the most common earthing system for industrial installations in the UK.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Earthing Systems",
    category: "Distribution Systems"
  },
  {
    id: 7,
    question: "What is busbar trunking primarily used for in industrial settings?",
    options: ["Lighting circuits only", "High current distribution", "Data cabling", "Emergency systems"],
    correctAnswer: 1,
    explanation: "Busbar trunking provides efficient high current distribution with flexibility for tap-off points.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Distribution Methods",
    category: "Distribution Systems"
  },
  {
    id: 8,
    question: "What is the purpose of discrimination in industrial protection systems?",
    options: ["Reduce costs", "Ensure only the device nearest the fault operates", "Improve power factor", "Reduce harmonics"],
    correctAnswer: 1,
    explanation: "Discrimination ensures the protective device closest to the fault operates, minimising disruption to the rest of the system.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Protection",
    category: "Distribution Systems"
  },
  {
    id: 9,
    question: "What does kVA stand for in electrical distribution?",
    options: ["Kilovolt Ampere", "Kilowatt Ampere", "Kilovolt Actual", "Kilowatt Average"],
    correctAnswer: 0,
    explanation: "kVA stands for Kilovolt Ampere, representing apparent power in AC systems.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Power Measurement",
    category: "Distribution Systems"
  },
  {
    id: 10,
    question: "Why are capacitor banks installed in industrial distribution systems?",
    options: ["Voltage regulation", "Power factor correction", "Harmonic filtering", "All of the above"],
    correctAnswer: 3,
    explanation: "Capacitor banks can provide voltage support, power factor correction, and some harmonic filtering.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Power Quality",
    category: "Distribution Systems"
  },
  {
    id: 11,
    question: "What is the typical oil used in industrial transformers?",
    options: ["Motor oil", "Mineral oil", "Vegetable oil", "Synthetic oil only"],
    correctAnswer: 1,
    explanation: "Mineral oil is traditionally used for cooling and insulation in transformers.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Transformers",
    category: "Distribution Systems"
  },
  {
    id: 12,
    question: "What is the purpose of Buchholz relay on a transformer?",
    options: ["Voltage regulation", "Gas and oil fault protection", "Temperature monitoring", "Current limiting"],
    correctAnswer: 1,
    explanation: "Buchholz relay detects gas accumulation from internal faults and oil flow from tank ruptures.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Transformer Protection",
    category: "Distribution Systems"
  },
  {
    id: 13,
    question: "What is the maximum demand in an industrial installation?",
    options: ["Peak load expected", "Average daily load", "Minimum load", "Standby load"],
    correctAnswer: 0,
    explanation: "Maximum demand is the highest load expected to occur at any time, used for sizing incoming supply.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Load Assessment",
    category: "Distribution Systems"
  },
  {
    id: 14,
    question: "What is diversity factor in industrial load calculations?",
    options: ["Total connected load", "Ratio allowing for non-simultaneous operation", "Power factor", "Efficiency rating"],
    correctAnswer: 1,
    explanation: "Diversity factor accounts for the fact that not all loads operate simultaneously at full capacity.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Load Calculations",
    category: "Distribution Systems"
  },
  {
    id: 15,
    question: "What protection is typically provided for industrial feeders?",
    options: ["Fuses only", "MCBs only", "MCCBs or ACBs", "No protection needed"],
    correctAnswer: 2,
    explanation: "Industrial feeders typically use MCCBs or ACBs for adjustable overcurrent and short-circuit protection.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Protection Devices",
    category: "Distribution Systems"
  },

  // Module 2: Motors, Starters, and Control Gear (15 questions)
  {
    id: 16,
    question: "What is the most common type of industrial motor?",
    options: ["DC motor", "Single-phase induction", "Three-phase induction", "Synchronous motor"],
    correctAnswer: 2,
    explanation: "Three-phase induction motors are the workhorses of industry due to reliability and efficiency.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Motor Types",
    category: "Motors & Control"
  },
  {
    id: 17,
    question: "What is the purpose of a DOL (Direct On Line) starter?",
    options: ["Variable speed control", "Full voltage starting", "Soft starting", "Regenerative braking"],
    correctAnswer: 1,
    explanation: "DOL starters connect motors directly to full supply voltage for simple, economical starting.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Motor Starting",
    category: "Motors & Control"
  },
  {
    id: 18,
    question: "Why is star-delta starting used for motors?",
    options: ["Increase torque", "Reduce starting current", "Increase speed", "Reverse rotation"],
    correctAnswer: 1,
    explanation: "Star-delta starting reduces starting current to approximately 1/3 of DOL current.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Starting",
    category: "Motors & Control"
  },
  {
    id: 19,
    question: "What is the typical starting current of a DOL motor?",
    options: ["1-2 times FLC", "3-4 times FLC", "6-8 times FLC", "10-12 times FLC"],
    correctAnswer: 2,
    explanation: "DOL starting current is typically 6-8 times the full load current (FLC).",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Starting",
    category: "Motors & Control"
  },
  {
    id: 20,
    question: "What does VSD/VFD stand for?",
    options: ["Voltage Supply Device", "Variable Speed Drive/Variable Frequency Drive", "Voltage Switching Device", "Variable Switching Drive"],
    correctAnswer: 1,
    explanation: "VSD/VFD (Variable Speed Drive/Variable Frequency Drive) controls motor speed by varying frequency.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Speed Control",
    category: "Motors & Control"
  },
  {
    id: 21,
    question: "What is the purpose of a contactor in motor control?",
    options: ["Speed control", "Switching power to the motor", "Power factor correction", "Harmonic filtering"],
    correctAnswer: 1,
    explanation: "Contactors are electromechanical switches used to connect and disconnect power to motors.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Control Components",
    category: "Motors & Control"
  },
  {
    id: 22,
    question: "What protection does an overload relay provide?",
    options: ["Short circuit", "Earth fault", "Thermal overload", "Undervoltage"],
    correctAnswer: 2,
    explanation: "Overload relays protect motors from damage due to excessive current over time (thermal protection).",
    section: "Module 2",
    difficulty: "basic",
    topic: "Motor Protection",
    category: "Motors & Control"
  },
  {
    id: 23,
    question: "What is the function of a soft starter?",
    options: ["Instant full voltage", "Gradual voltage ramp-up", "Frequency control", "Power factor correction"],
    correctAnswer: 1,
    explanation: "Soft starters gradually increase voltage to reduce starting current and mechanical stress.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Starting",
    category: "Motors & Control"
  },
  {
    id: 24,
    question: "What does slip mean in an induction motor?",
    options: ["Mechanical wear", "Difference between synchronous and rotor speed", "Voltage drop", "Current imbalance"],
    correctAnswer: 1,
    explanation: "Slip is the percentage difference between synchronous speed and actual rotor speed.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Principles",
    category: "Motors & Control"
  },
  {
    id: 25,
    question: "How is motor rotation reversed in a three-phase motor?",
    options: ["Reverse all three phases", "Swap any two phases", "Change frequency", "Adjust voltage"],
    correctAnswer: 1,
    explanation: "Swapping any two of the three phase connections reverses the rotating magnetic field direction.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Motor Control",
    category: "Motors & Control"
  },
  {
    id: 26,
    question: "What is the IP rating for motors in dusty industrial environments?",
    options: ["IP20", "IP44", "IP55 or higher", "IP65 only"],
    correctAnswer: 2,
    explanation: "IP55 or higher provides dust protection and water jet resistance suitable for industrial environments.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Selection",
    category: "Motors & Control"
  },
  {
    id: 27,
    question: "What causes motor single-phasing?",
    options: ["Overload", "Loss of one phase supply", "High voltage", "Low frequency"],
    correctAnswer: 1,
    explanation: "Single-phasing occurs when one phase is lost, causing increased current in remaining phases.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Faults",
    category: "Motors & Control"
  },
  {
    id: 28,
    question: "What is the purpose of thermistors in motor windings?",
    options: ["Speed sensing", "Temperature monitoring", "Current measurement", "Voltage regulation"],
    correctAnswer: 1,
    explanation: "Thermistors monitor winding temperature to prevent thermal damage from overheating.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Protection",
    category: "Motors & Control"
  },
  {
    id: 29,
    question: "What is regenerative braking in motor control?",
    options: ["Mechanical brakes", "Motor acts as generator returning energy", "Friction braking", "Plugging"],
    correctAnswer: 1,
    explanation: "Regenerative braking converts kinetic energy back to electrical energy, often returned to supply.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Motor Braking",
    category: "Motors & Control"
  },
  {
    id: 30,
    question: "What is motor duty cycle S1?",
    options: ["Intermittent duty", "Continuous duty", "Short-time duty", "Periodic duty"],
    correctAnswer: 1,
    explanation: "S1 rating indicates continuous duty - the motor can run at full load indefinitely.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Motor Ratings",
    category: "Motors & Control"
  },

  // Module 3: Industrial Panel Assembly and Layout (15 questions)
  {
    id: 31,
    question: "What is the minimum working clearance in front of an industrial switchboard?",
    options: ["500mm", "700mm", "900mm", "1200mm"],
    correctAnswer: 1,
    explanation: "BS 7671 requires minimum 700mm working space in front of switchgear for safe operation.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Panel Layout",
    category: "Panel Assembly"
  },
  {
    id: 32,
    question: "What is the purpose of cable glands on industrial panels?",
    options: ["Appearance only", "Strain relief and ingress protection", "Current rating", "Voltage isolation"],
    correctAnswer: 1,
    explanation: "Cable glands provide mechanical strain relief and maintain the IP rating of enclosures.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Panel Components",
    category: "Panel Assembly"
  },
  {
    id: 33,
    question: "What colour is the protective earth terminal marked?",
    options: ["Blue", "Brown", "Green/Yellow", "Grey"],
    correctAnswer: 2,
    explanation: "Earth terminals are marked green/yellow as per international standards.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Terminal Marking",
    category: "Panel Assembly"
  },
  {
    id: 34,
    question: "What is DIN rail used for in control panels?",
    options: ["Mounting components", "Cable routing", "Earthing", "Ventilation"],
    correctAnswer: 0,
    explanation: "DIN rail provides standardised mounting for modular components like MCBs, relays, and terminals.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Panel Components",
    category: "Panel Assembly"
  },
  {
    id: 35,
    question: "What is the purpose of cable segregation in panels?",
    options: ["Appearance", "EMC and safety", "Cost saving", "Space saving"],
    correctAnswer: 1,
    explanation: "Cable segregation prevents electromagnetic interference and separates different voltage levels for safety.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Panel Wiring",
    category: "Panel Assembly"
  },
  {
    id: 36,
    question: "What is form of separation in switchgear?",
    options: ["Component quality", "Degree of internal segregation", "External rating", "Ventilation type"],
    correctAnswer: 1,
    explanation: "Form of separation (1-4) defines the degree of internal barriers between functional units.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Switchgear Standards",
    category: "Panel Assembly"
  },
  {
    id: 37,
    question: "What is the purpose of anti-condensation heaters in panels?",
    options: ["Increase temperature", "Prevent moisture damage", "Improve efficiency", "Reduce costs"],
    correctAnswer: 1,
    explanation: "Anti-condensation heaters prevent moisture buildup that could cause insulation breakdown.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Panel Protection",
    category: "Panel Assembly"
  },
  {
    id: 38,
    question: "What does IP65 rating indicate for an enclosure?",
    options: ["Basic protection", "Dust-tight and water jet protected", "Submersible", "Indoor use only"],
    correctAnswer: 1,
    explanation: "IP65 means complete dust protection (6) and protection against water jets (5).",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "IP Ratings",
    category: "Panel Assembly"
  },
  {
    id: 39,
    question: "What is ferrule labelling used for?",
    options: ["Decoration", "Cable and terminal identification", "Current rating", "Voltage marking"],
    correctAnswer: 1,
    explanation: "Ferrules provide clear identification of cables at termination points for maintenance and troubleshooting.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Panel Wiring",
    category: "Panel Assembly"
  },
  {
    id: 40,
    question: "What is the standard control circuit voltage in UK industrial panels?",
    options: ["230V AC", "110V AC", "24V DC", "All commonly used"],
    correctAnswer: 3,
    explanation: "Control circuits use various voltages - 230V AC, 110V AC (site work), and 24V DC are all common.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Control Voltages",
    category: "Panel Assembly"
  },
  {
    id: 41,
    question: "What is arc flash hazard in industrial panels?",
    options: ["Electrical noise", "Explosive release of energy from arc fault", "Static discharge", "Voltage spike"],
    correctAnswer: 1,
    explanation: "Arc flash is a dangerous explosive release of energy that can cause severe burns and injuries.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Safety",
    category: "Panel Assembly"
  },
  {
    id: 42,
    question: "What standard governs low-voltage switchgear assemblies?",
    options: ["BS 7671", "BS EN 61439", "BS 5839", "BS 7430"],
    correctAnswer: 1,
    explanation: "BS EN 61439 specifies requirements for low-voltage switchgear and controlgear assemblies.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Panel Assembly"
  },
  {
    id: 43,
    question: "What is the purpose of surge protection devices in industrial panels?",
    options: ["Metering", "Protection from voltage transients", "Power factor correction", "Harmonic filtering"],
    correctAnswer: 1,
    explanation: "SPDs protect sensitive equipment from voltage spikes caused by lightning or switching.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Panel Protection",
    category: "Panel Assembly"
  },
  {
    id: 44,
    question: "Why are copper busbars tinned or silver-plated?",
    options: ["Appearance", "Reduce contact resistance and prevent oxidation", "Increase current rating", "Reduce weight"],
    correctAnswer: 1,
    explanation: "Plating prevents oxidation and reduces contact resistance at connection points.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Busbars",
    category: "Panel Assembly"
  },
  {
    id: 45,
    question: "What is the purpose of panel earthing studs?",
    options: ["Mounting", "Connection point for protective conductors", "Ventilation", "Labelling"],
    correctAnswer: 1,
    explanation: "Earthing studs provide connection points for bonding metal enclosure parts to earth.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Panel Earthing",
    category: "Panel Assembly"
  },

  // Module 4: PLC Basics and System Integration (15 questions)
  {
    id: 46,
    question: "What does PLC stand for?",
    options: ["Power Line Controller", "Programmable Logic Controller", "Process Level Computer", "Primary Load Controller"],
    correctAnswer: 1,
    explanation: "PLC stands for Programmable Logic Controller, used for industrial automation.",
    section: "Module 4",
    difficulty: "basic",
    topic: "PLC Basics",
    category: "PLC & Automation"
  },
  {
    id: 47,
    question: "What is the most common PLC programming language for electricians?",
    options: ["Python", "Ladder Logic", "C++", "JavaScript"],
    correctAnswer: 1,
    explanation: "Ladder Logic resembles electrical relay diagrams, making it intuitive for electricians.",
    section: "Module 4",
    difficulty: "basic",
    topic: "PLC Programming",
    category: "PLC & Automation"
  },
  {
    id: 48,
    question: "What is a digital input on a PLC?",
    options: ["Analogue signal", "On/Off signal", "Variable voltage", "Current signal"],
    correctAnswer: 1,
    explanation: "Digital inputs read discrete on/off signals from switches, sensors, and contacts.",
    section: "Module 4",
    difficulty: "basic",
    topic: "PLC I/O",
    category: "PLC & Automation"
  },
  {
    id: 49,
    question: "What voltage is typical for PLC digital inputs?",
    options: ["5V DC", "24V DC", "110V AC", "230V AC"],
    correctAnswer: 1,
    explanation: "24V DC is the most common voltage for industrial PLC digital inputs and outputs.",
    section: "Module 4",
    difficulty: "basic",
    topic: "PLC I/O",
    category: "PLC & Automation"
  },
  {
    id: 50,
    question: "What is an analogue input signal range?",
    options: ["On/Off", "0-10V or 4-20mA typically", "0-230V", "Digital only"],
    correctAnswer: 1,
    explanation: "Common analogue ranges are 0-10V DC or 4-20mA for proportional measurements.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Analogue Signals",
    category: "PLC & Automation"
  },
  {
    id: 51,
    question: "Why is 4-20mA preferred over 0-20mA?",
    options: ["Higher accuracy", "4mA baseline allows fault detection", "Lower cost", "Faster response"],
    correctAnswer: 1,
    explanation: "4mA baseline allows distinguishing between zero signal and wire break (0mA fault).",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Analogue Signals",
    category: "PLC & Automation"
  },
  {
    id: 52,
    question: "What is a PLC scan cycle?",
    options: ["Power cycle", "Input-Process-Output sequence", "Programming cycle", "Maintenance interval"],
    correctAnswer: 1,
    explanation: "The scan cycle reads inputs, executes program logic, and updates outputs continuously.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "PLC Operation",
    category: "PLC & Automation"
  },
  {
    id: 53,
    question: "What is an HMI in industrial automation?",
    options: ["High Motor Interface", "Human Machine Interface", "Harmonic Monitoring Interface", "Heavy Machinery Integration"],
    correctAnswer: 1,
    explanation: "HMI (Human Machine Interface) provides operator interaction with the control system.",
    section: "Module 4",
    difficulty: "basic",
    topic: "System Integration",
    category: "PLC & Automation"
  },
  {
    id: 54,
    question: "What communication protocol is commonly used for industrial PLCs?",
    options: ["WiFi only", "Modbus", "Bluetooth", "USB"],
    correctAnswer: 1,
    explanation: "Modbus (RTU and TCP/IP) is a widely used industrial communication protocol.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Communications",
    category: "PLC & Automation"
  },
  {
    id: 55,
    question: "What is the purpose of a watchdog timer in a PLC?",
    options: ["Timekeeping", "Detect program faults and reset", "Motor timing", "Communication timing"],
    correctAnswer: 1,
    explanation: "Watchdog timers detect if the program stops executing and trigger a safe state.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "PLC Safety",
    category: "PLC & Automation"
  },
  {
    id: 56,
    question: "What is a safety PLC (or safety relay)?",
    options: ["Standard PLC with password", "PLC designed for safety-critical functions", "PLC for security systems", "Backup PLC"],
    correctAnswer: 1,
    explanation: "Safety PLCs meet SIL (Safety Integrity Level) requirements for safety-critical applications.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Safety Systems",
    category: "PLC & Automation"
  },
  {
    id: 57,
    question: "What does SCADA stand for?",
    options: ["System Control And Data Access", "Supervisory Control And Data Acquisition", "Standard Control And Data Analysis", "System Communication And Data Archive"],
    correctAnswer: 1,
    explanation: "SCADA systems provide supervisory monitoring and control of industrial processes.",
    section: "Module 4",
    difficulty: "basic",
    topic: "System Integration",
    category: "PLC & Automation"
  },
  {
    id: 58,
    question: "What is the function of a relay output on a PLC?",
    options: ["Digital input", "Isolated switching of external circuits", "Analogue output", "Communication"],
    correctAnswer: 1,
    explanation: "Relay outputs provide isolated switching for various AC/DC loads.",
    section: "Module 4",
    difficulty: "basic",
    topic: "PLC I/O",
    category: "PLC & Automation"
  },
  {
    id: 59,
    question: "What is Ethernet/IP in industrial automation?",
    options: ["Internet Protocol", "Industrial Protocol over Ethernet", "Internal Programming", "Interface Programming"],
    correctAnswer: 1,
    explanation: "Ethernet/IP is an industrial communication protocol running over standard Ethernet.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Communications",
    category: "PLC & Automation"
  },
  {
    id: 60,
    question: "What is a proximity sensor typically connected to on a PLC?",
    options: ["Analogue input", "Digital input", "Relay output", "Communication port"],
    correctAnswer: 1,
    explanation: "Proximity sensors typically provide digital (on/off) signals to PLC digital inputs.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Sensors",
    category: "PLC & Automation"
  },

  // Module 5: Industrial Fault Finding and Troubleshooting (15 questions)
  {
    id: 61,
    question: "What is the first step in industrial electrical fault finding?",
    options: ["Start testing", "Gather information and symptoms", "Replace components", "Check power"],
    correctAnswer: 1,
    explanation: "Systematic fault finding starts with gathering information about symptoms and conditions.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Fault Finding Method",
    category: "Fault Finding"
  },
  {
    id: 62,
    question: "What instrument is essential for industrial fault finding?",
    options: ["Oscilloscope only", "Multimeter", "Power analyser only", "Thermal camera only"],
    correctAnswer: 1,
    explanation: "A quality multimeter is the essential tool for most electrical fault finding.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Test Equipment",
    category: "Fault Finding"
  },
  {
    id: 63,
    question: "What does a megger test measure?",
    options: ["Continuity", "Insulation resistance", "Earth resistance", "Current"],
    correctAnswer: 1,
    explanation: "Megger (insulation resistance tester) measures the resistance of insulation.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Testing",
    category: "Fault Finding"
  },
  {
    id: 64,
    question: "What causes nuisance tripping of circuit breakers?",
    options: ["Correct operation", "Overload, earth fault, or incorrect sizing", "Normal wear", "Good installation"],
    correctAnswer: 1,
    explanation: "Nuisance tripping can be caused by overloads, earth faults, or incorrectly rated devices.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Common Faults",
    category: "Fault Finding"
  },
  {
    id: 65,
    question: "What does thermal imaging detect in electrical systems?",
    options: ["Voltage", "Current", "Hot spots indicating problems", "Insulation resistance"],
    correctAnswer: 2,
    explanation: "Thermal imaging identifies hot spots from loose connections, overloads, or failing components.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Fault Finding"
  },
  {
    id: 66,
    question: "What is half-split fault finding technique?",
    options: ["Cutting cables", "Testing at midpoint to halve search area", "Using half voltage", "Testing half the circuit"],
    correctAnswer: 1,
    explanation: "Half-split tests at midpoints to systematically narrow down fault location.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Fault Finding Method",
    category: "Fault Finding"
  },
  {
    id: 67,
    question: "What indicates a short circuit in a motor?",
    options: ["High insulation resistance", "Very low resistance between windings", "Normal running", "High impedance"],
    correctAnswer: 1,
    explanation: "Short circuits show as very low or zero resistance between windings or to earth.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Motor Faults",
    category: "Fault Finding"
  },
  {
    id: 68,
    question: "What is the symptom of an open circuit?",
    options: ["Excessive current", "No current flow", "Overheating", "Tripped breaker"],
    correctAnswer: 1,
    explanation: "Open circuits prevent current flow, showing infinite resistance and no operation.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Common Faults",
    category: "Fault Finding"
  },
  {
    id: 69,
    question: "What can cause intermittent faults?",
    options: ["New installation", "Loose connections, thermal expansion, vibration", "Good maintenance", "Correct sizing"],
    correctAnswer: 1,
    explanation: "Intermittent faults often result from loose connections affected by heat or vibration.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Common Faults",
    category: "Fault Finding"
  },
  {
    id: 70,
    question: "How do you test a contactor coil?",
    options: ["Voltage only", "Measure coil resistance with power off", "Visual inspection only", "Current measurement only"],
    correctAnswer: 1,
    explanation: "Measure coil resistance with power isolated - compare to specifications.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Component Testing",
    category: "Fault Finding"
  },
  {
    id: 71,
    question: "What does voltage drop testing identify?",
    options: ["Open circuits", "High resistance connections", "Short circuits", "Earth faults"],
    correctAnswer: 1,
    explanation: "Excessive voltage drop across connections indicates high resistance joints.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Testing",
    category: "Fault Finding"
  },
  {
    id: 72,
    question: "What is the purpose of a clamp meter in fault finding?",
    options: ["Voltage measurement only", "Non-invasive current measurement", "Resistance only", "Frequency only"],
    correctAnswer: 1,
    explanation: "Clamp meters measure current without breaking the circuit - essential for live fault finding.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Test Equipment",
    category: "Fault Finding"
  },
  {
    id: 73,
    question: "What indicates earth leakage in a circuit?",
    options: ["Equal phase currents", "Imbalance detected by RCD/RCBO", "High voltage", "Low power factor"],
    correctAnswer: 1,
    explanation: "Earth leakage causes current imbalance detected by RCDs as residual current.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Earth Faults",
    category: "Fault Finding"
  },
  {
    id: 74,
    question: "What should be checked if a motor won't start?",
    options: ["Power supply, control circuit, motor windings, mechanical binding", "Nothing specific", "Replace motor immediately", "Call manufacturer only"],
    correctAnswer: 0,
    explanation: "Systematic checks: supply presence, control circuit operation, winding condition, mechanical freedom.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Motor Faults",
    category: "Fault Finding"
  },
  {
    id: 75,
    question: "What is the purpose of documentation in fault finding?",
    options: ["Legal requirement only", "Record findings, aid future maintenance, track recurring issues", "Not necessary", "Only for major faults"],
    correctAnswer: 1,
    explanation: "Documentation helps identify patterns, aids future troubleshooting, and tracks system health.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Best Practice",
    category: "Fault Finding"
  },

  // Module 6: Cable Types, Containment, and Routing (15 questions)
  {
    id: 76,
    question: "What does SWA cable stand for?",
    options: ["Standard Wire Armour", "Steel Wire Armoured", "Single Wire Armoured", "Stranded Wire Armoured"],
    correctAnswer: 1,
    explanation: "SWA (Steel Wire Armoured) cable has steel wire armour for mechanical protection.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Cable Types",
    category: "Cables & Containment"
  },
  {
    id: 77,
    question: "What is MICC cable used for?",
    options: ["Data only", "Fire-resistant applications", "Low voltage only", "Temporary installations"],
    correctAnswer: 1,
    explanation: "MICC (Mineral Insulated Copper Clad) cable maintains circuit integrity in fire conditions.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Cable Types",
    category: "Cables & Containment"
  },
  {
    id: 78,
    question: "What is the minimum bending radius for SWA cable?",
    options: ["3 x diameter", "6 x diameter", "8 x diameter", "12 x diameter"],
    correctAnswer: 1,
    explanation: "SWA cable minimum bending radius is typically 6 times the overall cable diameter.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Cable Installation",
    category: "Cables & Containment"
  },
  {
    id: 79,
    question: "What is the purpose of cable tray in industrial installations?",
    options: ["Decoration", "Support and protection of cables", "Earthing only", "Insulation"],
    correctAnswer: 1,
    explanation: "Cable tray provides mechanical support and allows heat dissipation for grouped cables.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Containment",
    category: "Cables & Containment"
  },
  {
    id: 80,
    question: "What factor affects cable current rating in trunking?",
    options: ["Colour", "Grouping factor", "Length only", "Age"],
    correctAnswer: 1,
    explanation: "Grouping factor reduces current rating due to mutual heating of grouped cables.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Cable Rating",
    category: "Cables & Containment"
  },
  {
    id: 81,
    question: "What is LSF cable?",
    options: ["Low Smoke and Fume cable", "Long Service Factor cable", "Light Steel Flexible cable", "Low Strength Flexible cable"],
    correctAnswer: 0,
    explanation: "LSF (Low Smoke and Fume) cables reduce toxic emissions in fire conditions.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Cable Types",
    category: "Cables & Containment"
  },
  {
    id: 82,
    question: "Why must SWA armour be earthed?",
    options: ["Appearance", "Fault current path and touch protection", "Signal screening", "Corrosion protection"],
    correctAnswer: 1,
    explanation: "The armour must be earthed to provide fault current path and equipotential bonding.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Cable Earthing",
    category: "Cables & Containment"
  },
  {
    id: 83,
    question: "What is conduit fill factor?",
    options: ["Conduit strength", "Maximum cable occupancy percentage", "Conduit length", "Wall thickness"],
    correctAnswer: 1,
    explanation: "Fill factor limits cable occupancy (typically 40%) to allow heat dissipation and cable pulling.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Containment",
    category: "Cables & Containment"
  },
  {
    id: 84,
    question: "What is the advantage of cable ladder over tray?",
    options: ["Cheaper", "Better for heavy cables and heat dissipation", "Smaller size", "Easier to install"],
    correctAnswer: 1,
    explanation: "Cable ladder supports heavier cables and allows better air circulation for cooling.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Containment",
    category: "Cables & Containment"
  },
  {
    id: 85,
    question: "What marking should be on cables in industrial installations?",
    options: ["None required", "Circuit identification", "Manufacturer only", "Date only"],
    correctAnswer: 1,
    explanation: "Cables should be identified with circuit references for maintenance and safety.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Cable Marking",
    category: "Cables & Containment"
  },
  {
    id: 86,
    question: "What is EMC cable separation?",
    options: ["Physical appearance", "Separating power and data cables to prevent interference", "Cable colouring", "Voltage separation only"],
    correctAnswer: 1,
    explanation: "EMC separation prevents electromagnetic interference between power and signal cables.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Cable Routing",
    category: "Cables & Containment"
  },
  {
    id: 87,
    question: "What is flexible conduit used for?",
    options: ["Main distribution", "Final connection to vibrating equipment", "Underground only", "High voltage"],
    correctAnswer: 1,
    explanation: "Flexible conduit accommodates vibration and movement at final connections to equipment.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Containment",
    category: "Cables & Containment"
  },
  {
    id: 88,
    question: "What temperature rating is required for cables near hot processes?",
    options: ["Standard PVC", "Heat resistant (90°C or higher)", "Any cable", "Room temperature only"],
    correctAnswer: 1,
    explanation: "Heat resistant cables with appropriate temperature ratings must be used near heat sources.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Cable Selection",
    category: "Cables & Containment"
  },
  {
    id: 89,
    question: "What is fire barrier cable transit?",
    options: ["Cable type", "Sealing where cables pass through fire barriers", "Fire alarm cable", "Emergency cable"],
    correctAnswer: 1,
    explanation: "Fire barriers must be sealed where cables pass through to maintain fire compartmentation.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Fire Safety",
    category: "Cables & Containment"
  },
  {
    id: 90,
    question: "What must be considered for underground cable routes?",
    options: ["Colour only", "Depth, protection, marking, and route recording", "Length only", "Nothing special"],
    correctAnswer: 1,
    explanation: "Underground cables need specified burial depth, protection, warning tape, and route documentation.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Cable Routing",
    category: "Cables & Containment"
  },

  // Module 7: Power Factor Correction and Harmonics (15 questions)
  {
    id: 91,
    question: "What is power factor?",
    options: ["Voltage ratio", "Ratio of real power to apparent power", "Current ratio", "Resistance ratio"],
    correctAnswer: 1,
    explanation: "Power factor is the ratio of real power (kW) to apparent power (kVA).",
    section: "Module 7",
    difficulty: "basic",
    topic: "Power Factor",
    category: "Power Quality"
  },
  {
    id: 92,
    question: "What causes low power factor in industrial installations?",
    options: ["Resistive loads", "Inductive loads like motors", "Pure lighting", "Heating only"],
    correctAnswer: 1,
    explanation: "Inductive loads (motors, transformers) draw reactive current causing lagging power factor.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Power Factor",
    category: "Power Quality"
  },
  {
    id: 93,
    question: "Why is low power factor problematic?",
    options: ["No issues", "Increased losses, reduced capacity, potential charges", "Better efficiency", "Lower bills"],
    correctAnswer: 1,
    explanation: "Low PF increases losses, reduces system capacity, and may incur utility penalty charges.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Power Factor",
    category: "Power Quality"
  },
  {
    id: 94,
    question: "How do capacitors correct power factor?",
    options: ["Store energy", "Supply leading reactive current to offset lagging current", "Reduce voltage", "Increase resistance"],
    correctAnswer: 1,
    explanation: "Capacitors provide leading reactive current that cancels the lagging current from inductors.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "PF Correction",
    category: "Power Quality"
  },
  {
    id: 95,
    question: "What is the target power factor for most industrial installations?",
    options: ["0.7", "0.85", "0.95 or higher", "1.0 exactly"],
    correctAnswer: 2,
    explanation: "Target PF is typically 0.95 or higher to minimise losses and avoid penalty charges.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "PF Correction",
    category: "Power Quality"
  },
  {
    id: 96,
    question: "What are harmonics in electrical systems?",
    options: ["Musical tones", "Multiples of fundamental frequency causing distortion", "Normal operation", "Voltage regulation"],
    correctAnswer: 1,
    explanation: "Harmonics are currents/voltages at multiples of 50Hz that distort the waveform.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Harmonics",
    category: "Power Quality"
  },
  {
    id: 97,
    question: "What commonly generates harmonics?",
    options: ["Resistive heaters", "Variable speed drives and electronic loads", "Incandescent lamps", "Simple motors"],
    correctAnswer: 1,
    explanation: "Non-linear loads like VSDs, rectifiers, and electronic equipment generate harmonics.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Harmonics",
    category: "Power Quality"
  },
  {
    id: 98,
    question: "What problems do harmonics cause?",
    options: ["No problems", "Overheating, interference, equipment malfunction", "Better efficiency", "Lower costs"],
    correctAnswer: 1,
    explanation: "Harmonics cause overheating (especially neutral), interference, and premature equipment failure.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Harmonics",
    category: "Power Quality"
  },
  {
    id: 99,
    question: "What is Total Harmonic Distortion (THD)?",
    options: ["Power factor", "Measure of harmonic content as percentage of fundamental", "Voltage level", "Current rating"],
    correctAnswer: 1,
    explanation: "THD quantifies the total harmonic content relative to the fundamental frequency.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Harmonics",
    category: "Power Quality"
  },
  {
    id: 100,
    question: "What is an active harmonic filter?",
    options: ["Passive capacitor", "Electronic device that injects cancelling currents", "Simple inductor", "Resistor network"],
    correctAnswer: 1,
    explanation: "Active filters electronically generate currents that cancel harmonic currents in real-time.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Harmonic Mitigation",
    category: "Power Quality"
  },
  {
    id: 101,
    question: "Why is neutral conductor sizing important with harmonics?",
    options: ["Not important", "Triple-N harmonics add in neutral", "Appearance", "Cost only"],
    correctAnswer: 1,
    explanation: "Third harmonics (and multiples) add rather than cancel in neutral, requiring larger neutral sizing.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Harmonics",
    category: "Power Quality"
  },
  {
    id: 102,
    question: "What is automatic power factor correction?",
    options: ["Manual switching", "Automatic capacitor switching based on load", "Fixed capacitors", "No correction"],
    correctAnswer: 1,
    explanation: "APFC systems automatically switch capacitor stages to match varying reactive power demand.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "PF Correction",
    category: "Power Quality"
  },
  {
    id: 103,
    question: "What can happen if capacitors resonate with system inductance?",
    options: ["Better PF", "Harmonic amplification", "Lower costs", "Nothing"],
    correctAnswer: 1,
    explanation: "Resonance can amplify harmonics causing severe overheating and equipment damage.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "PF Correction",
    category: "Power Quality"
  },
  {
    id: 104,
    question: "What is a detuned capacitor bank?",
    options: ["Faulty bank", "Bank with reactors to prevent resonance", "Undersized bank", "Old equipment"],
    correctAnswer: 1,
    explanation: "Detuned banks include series reactors to shift resonant frequency away from harmonic frequencies.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "PF Correction",
    category: "Power Quality"
  },
  {
    id: 105,
    question: "What instrument measures power quality?",
    options: ["Multimeter only", "Power quality analyser", "Simple ammeter", "Voltmeter only"],
    correctAnswer: 1,
    explanation: "Power quality analysers measure voltage, current, power factor, harmonics, and transients.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Measurement",
    category: "Power Quality"
  },

  // Module 8: Industrial Safety, Isolation, and Lock-off (15 questions)
  {
    id: 106,
    question: "What is safe isolation?",
    options: ["Switching off", "Complete procedure to ensure circuit cannot be re-energised", "Unplugging", "Turning off lights"],
    correctAnswer: 1,
    explanation: "Safe isolation is a formal procedure ensuring circuits are de-energised and cannot be re-energised.",
    section: "Module 8",
    difficulty: "basic",
    topic: "Safe Isolation",
    category: "Safety & Isolation"
  },
  {
    id: 107,
    question: "What is LOTO in industrial safety?",
    options: ["Lighting Only Turn Off", "Lock Out Tag Out", "Low Output Turn On", "Local Operation Test Order"],
    correctAnswer: 1,
    explanation: "LOTO (Lock Out Tag Out) is a safety procedure to ensure dangerous machines are properly isolated.",
    section: "Module 8",
    difficulty: "basic",
    topic: "Lock Out Tag Out",
    category: "Safety & Isolation"
  },
  {
    id: 108,
    question: "What must be done before working on isolated equipment?",
    options: ["Nothing", "Prove dead with approved voltage indicator", "Visual check only", "Ask someone"],
    correctAnswer: 1,
    explanation: "Always prove dead using an approved voltage indicator tested before and after on known live source.",
    section: "Module 8",
    difficulty: "basic",
    topic: "Safe Isolation",
    category: "Safety & Isolation"
  },
  {
    id: 109,
    question: "What is a permit to work system?",
    options: ["Work visa", "Formal written system for controlling hazardous work", "Employment contract", "Training certificate"],
    correctAnswer: 1,
    explanation: "Permit to work systems formally control high-risk work with documented authorisation and precautions.",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Safety Systems",
    category: "Safety & Isolation"
  },
  {
    id: 110,
    question: "What is the purpose of a danger tag during isolation?",
    options: ["Decoration", "Warning that equipment is being worked on", "Equipment identification", "Serial number"],
    correctAnswer: 1,
    explanation: "Danger tags warn others that equipment is isolated and being worked on - do not energise.",
    section: "Module 8",
    difficulty: "basic",
    topic: "Lock Out Tag Out",
    category: "Safety & Isolation"
  },
  {
    id: 111,
    question: "Who can remove a personal lock during LOTO?",
    options: ["Anyone", "Only the person who applied it", "Supervisor only", "Safety officer only"],
    correctAnswer: 1,
    explanation: "Personal locks should only be removed by the person who applied them (with limited exceptions).",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Lock Out Tag Out",
    category: "Safety & Isolation"
  },
  {
    id: 112,
    question: "What is stored energy in machinery?",
    options: ["Electricity only", "Energy remaining after isolation (springs, pressure, gravity)", "No hazard", "Battery power"],
    correctAnswer: 1,
    explanation: "Stored energy (pneumatic, hydraulic, spring, gravity) can cause injury even after electrical isolation.",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Hazard Awareness",
    category: "Safety & Isolation"
  },
  {
    id: 113,
    question: "What does GS38 specify?",
    options: ["Cable colours", "Requirements for test probes and leads", "Motor ratings", "Switchgear standards"],
    correctAnswer: 1,
    explanation: "GS38 specifies safety requirements for electrical test equipment including probe dimensions.",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Safety & Isolation"
  },
  {
    id: 114,
    question: "What is the purpose of proving units for voltage indicators?",
    options: ["Battery check", "Verify the tester works correctly", "Calibration", "Storage"],
    correctAnswer: 1,
    explanation: "Proving units verify voltage indicators function correctly before and after testing.",
    section: "Module 8",
    difficulty: "basic",
    topic: "Test Equipment",
    category: "Safety & Isolation"
  },
  {
    id: 115,
    question: "What is arc flash PPE?",
    options: ["Standard workwear", "Protective equipment rated for arc flash energy levels", "Hard hat only", "Safety glasses only"],
    correctAnswer: 1,
    explanation: "Arc flash PPE is rated to protect against specific arc flash incident energy levels (cal/cm²).",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "PPE",
    category: "Safety & Isolation"
  },
  {
    id: 116,
    question: "What must be verified before re-energising after maintenance?",
    options: ["Nothing", "All personnel clear, guards replaced, system ready", "Just remove locks", "Visual check only"],
    correctAnswer: 1,
    explanation: "Before re-energising: ensure all clear, guards replaced, tools removed, system ready for operation.",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Safe Systems",
    category: "Safety & Isolation"
  },
  {
    id: 117,
    question: "What is the hierarchy of risk control?",
    options: ["PPE first", "Eliminate, substitute, engineer, admin, PPE", "Any order", "Admin controls first"],
    correctAnswer: 1,
    explanation: "Control hierarchy: elimination, substitution, engineering controls, admin controls, PPE (last resort).",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Risk Control",
    category: "Safety & Isolation"
  },
  {
    id: 118,
    question: "What legislation governs electrical safety at work in the UK?",
    options: ["Building Regulations", "Electricity at Work Regulations 1989", "BS 7671 only", "Health Act only"],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations 1989 are the primary legislation for workplace electrical safety.",
    section: "Module 8",
    difficulty: "basic",
    topic: "Legislation",
    category: "Safety & Isolation"
  },
  {
    id: 119,
    question: "What is a risk assessment for electrical work?",
    options: ["Insurance form", "Systematic evaluation of hazards and control measures", "Test result", "Cost estimate"],
    correctAnswer: 1,
    explanation: "Risk assessment identifies hazards, evaluates risks, and determines control measures needed.",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Risk Assessment",
    category: "Safety & Isolation"
  },
  {
    id: 120,
    question: "What is the purpose of an isolation log?",
    options: ["Equipment inventory", "Record of all isolations and their status", "Attendance record", "Training log"],
    correctAnswer: 1,
    explanation: "Isolation logs track all active isolations, who applied them, and their current status.",
    section: "Module 8",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Safety & Isolation"
  }
];

// Function to get random questions for mock exam (30 questions with difficulty distribution)
export const getRandomIndustrialElectricalMockExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(
    industrialElectricalQuestionBank,
    numQuestions,
    industrialElectricalCategories,
    { basic: 0.35, intermediate: 0.45, advanced: 0.2 }
  );
};
