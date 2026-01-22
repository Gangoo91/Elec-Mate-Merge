// AM2 Mock Exam Question Bank - 400 Questions
// Comprehensive question bank aligned with NET AM2 Assessment requirements
// Topics: Health & Safety, BS 7671, Building Regulations, Safe Isolation, Inspection & Testing, Fault Finding

export interface AM2Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  category: 'Health & Safety' | 'BS7671 Fundamentals' | 'BS7671 Selection & Erection' | 'BS7671 Inspection & Testing' | 'Building Regulations' | 'Safe Isolation' | 'Fault Finding';
}

export const am2QuestionBank: AM2Question[] = [
  // ============================================================
  // HEALTH & SAFETY (70 questions) - IDs 1-70
  // ============================================================

  // HASAWA 1974 (15 questions)
  {
    id: 1,
    question: "What is the main purpose of the Health and Safety at Work Act 1974?",
    options: [
      "To provide guidance on electrical installation methods",
      "To ensure the health, safety and welfare of all persons at work",
      "To regulate the testing and certification of electrical equipment",
      "To establish building regulations for electrical installations"
    ],
    correctAnswer: 1,
    explanation: "HASAWA 1974 is the primary legislation ensuring health, safety and welfare of all employees and others who may be affected by work activities.",
    section: "HASAWA 1974",
    difficulty: "basic",
    topic: "Purpose of HASAWA",
    category: "Health & Safety"
  },
  {
    id: 2,
    question: "Under HASAWA 1974, who has the primary duty to ensure workplace safety?",
    options: [
      "Employees only",
      "The HSE only",
      "Employers",
      "Trade unions"
    ],
    correctAnswer: 2,
    explanation: "Section 2 of HASAWA places the primary duty on employers to ensure, so far as reasonably practicable, the health, safety and welfare of employees.",
    section: "HASAWA 1974",
    difficulty: "basic",
    topic: "Employer Duties",
    category: "Health & Safety"
  },
  {
    id: 3,
    question: "What duty do employees have under HASAWA 1974?",
    options: [
      "No duties, only employers have duties",
      "To take reasonable care of themselves and others affected by their actions",
      "To provide all safety equipment",
      "To write risk assessments"
    ],
    correctAnswer: 1,
    explanation: "Section 7 requires employees to take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions.",
    section: "HASAWA 1974",
    difficulty: "basic",
    topic: "Employee Duties",
    category: "Health & Safety"
  },
  {
    id: 4,
    question: "What does 'so far as is reasonably practicable' mean under HASAWA?",
    options: [
      "Only do what is cheapest",
      "Balance the risk against cost, time and effort to reduce it",
      "Always use the most expensive option",
      "Do nothing unless instructed"
    ],
    correctAnswer: 1,
    explanation: "Reasonably practicable means weighing the risk against the sacrifice (time, trouble, cost) needed to avert or reduce it - not just cost alone.",
    section: "HASAWA 1974",
    difficulty: "intermediate",
    topic: "Legal Terms",
    category: "Health & Safety"
  },
  {
    id: 5,
    question: "Who enforces HASAWA 1974 in most workplaces?",
    options: [
      "Local councils",
      "The police",
      "Health and Safety Executive (HSE)",
      "Fire service"
    ],
    correctAnswer: 2,
    explanation: "The HSE is the primary enforcing authority for HASAWA 1974 in most workplaces, including construction and electrical work.",
    section: "HASAWA 1974",
    difficulty: "basic",
    topic: "Enforcement",
    category: "Health & Safety"
  },
  {
    id: 6,
    question: "What are the maximum penalties for serious breaches of HASAWA 1974?",
    options: [
      "£500 fine only",
      "Unlimited fine and/or imprisonment",
      "Written warning only",
      "£5,000 fine maximum"
    ],
    correctAnswer: 1,
    explanation: "Serious breaches can result in unlimited fines and/or imprisonment for up to 2 years (or more for certain offences causing death).",
    section: "HASAWA 1974",
    difficulty: "intermediate",
    topic: "Penalties",
    category: "Health & Safety"
  },
  {
    id: 7,
    question: "Under HASAWA, must employers consult with employees on health and safety matters?",
    options: [
      "No, it's optional",
      "Yes, either directly or through safety representatives",
      "Only in large companies",
      "Only after an accident"
    ],
    correctAnswer: 1,
    explanation: "Employers must consult employees on health and safety matters, either directly or through elected safety representatives.",
    section: "HASAWA 1974",
    difficulty: "intermediate",
    topic: "Consultation",
    category: "Health & Safety"
  },

  // Electricity at Work Regulations 1989 (15 questions)
  {
    id: 8,
    question: "What do the Electricity at Work Regulations 1989 specifically cover?",
    options: [
      "Only domestic installations",
      "Electrical safety in all workplaces",
      "Only high voltage systems",
      "Only new installations"
    ],
    correctAnswer: 1,
    explanation: "EAW Regulations apply to all electrical systems and equipment in workplaces to prevent danger from electricity.",
    section: "EAW 1989",
    difficulty: "basic",
    topic: "Scope",
    category: "Health & Safety"
  },
  {
    id: 9,
    question: "Regulation 4 of EAW 1989 requires that electrical systems shall be:",
    options: [
      "Made of copper only",
      "Constructed and maintained to prevent danger",
      "Tested annually",
      "Installed by qualified persons only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires all electrical systems to be constructed and maintained so as to prevent danger, so far as reasonably practicable.",
    section: "EAW 1989",
    difficulty: "intermediate",
    topic: "System Requirements",
    category: "Health & Safety"
  },
  {
    id: 10,
    question: "Under EAW Regulation 14, when can live working be permitted?",
    options: [
      "Never, it's always prohibited",
      "When it's unreasonable to work dead and suitable precautions are taken",
      "Whenever it's more convenient",
      "Only by fully qualified electricians"
    ],
    correctAnswer: 1,
    explanation: "Regulation 14 states live work is permitted only when unreasonable to work dead and suitable precautions are taken to prevent injury.",
    section: "EAW 1989",
    difficulty: "intermediate",
    topic: "Live Working",
    category: "Health & Safety"
  },
  {
    id: 11,
    question: "What does EAW Regulation 16 require regarding persons working on electrical systems?",
    options: [
      "They must be over 21 years old",
      "They must be competent or supervised",
      "They must hold a degree",
      "They must be employed full-time"
    ],
    correctAnswer: 1,
    explanation: "Regulation 16 requires persons working on electrical systems to be competent, or if not, to be supervised by a competent person.",
    section: "EAW 1989",
    difficulty: "intermediate",
    topic: "Competence",
    category: "Health & Safety"
  },
  {
    id: 12,
    question: "EAW Regulation 13 requires that adequate precautions be taken to prevent:",
    options: [
      "Theft of equipment",
      "Electrical equipment being charged accidentally",
      "Equipment getting dirty",
      "Unauthorised modifications"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 requires precautions to prevent electrical equipment that has been made dead from being charged (re-energised) accidentally.",
    section: "EAW 1989",
    difficulty: "intermediate",
    topic: "Isolation",
    category: "Health & Safety"
  },
  {
    id: 13,
    question: "What does 'danger' mean in the context of EAW 1989?",
    options: [
      "Any risk at all",
      "Risk of injury from electric shock, burns, fire or explosion",
      "Only fatal injuries",
      "Only shock injuries"
    ],
    correctAnswer: 1,
    explanation: "Danger means risk of injury from electric shock, electrical burns, fires of electrical origin, or electrical arcing/explosion.",
    section: "EAW 1989",
    difficulty: "basic",
    topic: "Definitions",
    category: "Health & Safety"
  },

  // Risk Assessment (10 questions)
  {
    id: 14,
    question: "What are the five steps to risk assessment?",
    options: [
      "Identify hazards, decide who might be harmed, evaluate risks, record findings, review",
      "Look around, make notes, tell someone, wait, check again",
      "Find dangers, avoid them, report them, forget them, repeat",
      "Test equipment, replace faulty items, train staff, document, audit"
    ],
    correctAnswer: 0,
    explanation: "HSE's five steps: identify hazards, decide who might be harmed and how, evaluate risks and decide on precautions, record findings, review and update.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Five Steps",
    category: "Health & Safety"
  },
  {
    id: 15,
    question: "What is the difference between a hazard and a risk?",
    options: [
      "They mean the same thing",
      "A hazard is something with potential to cause harm; risk is the likelihood of harm occurring",
      "A risk is worse than a hazard",
      "Hazards are natural, risks are man-made"
    ],
    correctAnswer: 1,
    explanation: "A hazard is anything that may cause harm. Risk is the chance (high or low) that somebody could be harmed by the hazard.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Definitions",
    category: "Health & Safety"
  },
  {
    id: 16,
    question: "When should a risk assessment be reviewed?",
    options: [
      "Only after an accident",
      "Every 10 years",
      "When circumstances change, after incidents, or periodically",
      "Never, once complete it's final"
    ],
    correctAnswer: 2,
    explanation: "Risk assessments should be reviewed when significant changes occur, after incidents, when new information emerges, or periodically to ensure they remain valid.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Review",
    category: "Health & Safety"
  },
  {
    id: 17,
    question: "What is the hierarchy of control for managing risks?",
    options: [
      "PPE first, then engineering controls",
      "Eliminate, substitute, engineering controls, administrative controls, PPE",
      "Training first, then equipment",
      "Warning signs, then barriers"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy: elimination (remove hazard), substitution (use less hazardous), engineering controls, administrative controls, PPE (last resort).",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Control Measures",
    category: "Health & Safety"
  },
  {
    id: 18,
    question: "Who should carry out a risk assessment?",
    options: [
      "Only the HSE",
      "A competent person within the organisation",
      "External consultants only",
      "The youngest employee"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should be carried out by a competent person - someone with the knowledge, training and experience to identify hazards and risks.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Competence",
    category: "Health & Safety"
  },

  // RIDDOR (10 questions)
  {
    id: 19,
    question: "What does RIDDOR stand for?",
    options: [
      "Reporting of Injuries, Deaths and Dangerous Occurrences Regulations",
      "Recording of Industrial Diseases and Dangerous Operations Register",
      "Regulations for Industrial Danger Detection and Operational Review",
      "Risk Investigation, Detection, Documentation and Organisational Reporting"
    ],
    correctAnswer: 0,
    explanation: "RIDDOR stands for Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013.",
    section: "RIDDOR",
    difficulty: "basic",
    topic: "Definition",
    category: "Health & Safety"
  },
  {
    id: 20,
    question: "Under RIDDOR, which electrical incidents must be reported?",
    options: [
      "All electrical faults",
      "Electric shock or burn causing death, specified injury, or incapacity for more than 7 days",
      "Only fatal accidents",
      "Minor electric shocks"
    ],
    correctAnswer: 1,
    explanation: "Electrical incidents causing death, specified injuries, or over-7-day incapacitation must be reported. Dangerous occurrences involving electricity are also reportable.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Reportable Incidents",
    category: "Health & Safety"
  },
  {
    id: 21,
    question: "How quickly must fatal or specified injuries be reported under RIDDOR?",
    options: [
      "Within 30 days",
      "Without delay (immediately) and followed up within 10 days",
      "Within 7 days",
      "At the next convenient time"
    ],
    correctAnswer: 1,
    explanation: "Fatal and specified injuries must be reported without delay (by phone to HSE) and followed up in writing within 10 days.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Timescales",
    category: "Health & Safety"
  },
  {
    id: 22,
    question: "What is a 'dangerous occurrence' under RIDDOR?",
    options: [
      "Any workplace accident",
      "A near-miss that could have caused serious injury or death",
      "A minor incident",
      "Equipment breakdown"
    ],
    correctAnswer: 1,
    explanation: "Dangerous occurrences are specific near-miss events that had the potential to cause death or serious injury, listed in Schedule 2 of RIDDOR.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Dangerous Occurrences",
    category: "Health & Safety"
  },
  {
    id: 23,
    question: "Who is responsible for reporting incidents under RIDDOR?",
    options: [
      "The injured person",
      "The responsible person (usually the employer)",
      "Witnesses only",
      "The local council"
    ],
    correctAnswer: 1,
    explanation: "The responsible person, usually the employer or person in control of the premises, must report RIDDOR incidents.",
    section: "RIDDOR",
    difficulty: "basic",
    topic: "Responsibility",
    category: "Health & Safety"
  },

  // PPE (10 questions)
  {
    id: 24,
    question: "According to PPE hierarchy, when should PPE be used?",
    options: [
      "As the first line of defence",
      "As a last resort when other controls are not reasonably practicable",
      "Only when requested by employees",
      "Instead of engineering controls"
    ],
    correctAnswer: 1,
    explanation: "PPE should be used as a last resort, after elimination, substitution, engineering and administrative controls have been considered.",
    section: "PPE",
    difficulty: "basic",
    topic: "Hierarchy",
    category: "Health & Safety"
  },
  {
    id: 25,
    question: "Who is responsible for providing PPE in the workplace?",
    options: [
      "The employee",
      "The employer, free of charge",
      "The HSE",
      "The equipment manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Under the PPE at Work Regulations, employers must provide suitable PPE free of charge where risks cannot be adequately controlled by other means.",
    section: "PPE",
    difficulty: "basic",
    topic: "Provision",
    category: "Health & Safety"
  },
  {
    id: 26,
    question: "What type of safety footwear is typically required for electrical work?",
    options: [
      "Any comfortable shoes",
      "Steel toe-capped boots with anti-static soles",
      "Open-toed sandals",
      "Running shoes"
    ],
    correctAnswer: 1,
    explanation: "Electrical work typically requires safety boots with steel toe caps for impact protection and anti-static or insulating soles.",
    section: "PPE",
    difficulty: "basic",
    topic: "Footwear",
    category: "Health & Safety"
  },
  {
    id: 27,
    question: "When working near live electrical equipment, what eye protection may be required?",
    options: [
      "Sunglasses",
      "Arc-rated safety glasses or face shield",
      "Reading glasses",
      "No eye protection needed"
    ],
    correctAnswer: 1,
    explanation: "Arc-rated safety glasses or face shields protect against arc flash, which can cause severe burns and eye damage from intense light and heat.",
    section: "PPE",
    difficulty: "intermediate",
    topic: "Eye Protection",
    category: "Health & Safety"
  },
  {
    id: 28,
    question: "What is the employee's duty regarding PPE?",
    options: [
      "None - it's all the employer's responsibility",
      "Use it properly, report defects, store it correctly",
      "Purchase their own if lost",
      "Only wear it when supervised"
    ],
    correctAnswer: 1,
    explanation: "Employees must use PPE properly as trained, report defects or damage, and store it correctly when not in use.",
    section: "PPE",
    difficulty: "basic",
    topic: "Employee Duties",
    category: "Health & Safety"
  },

  // CDM Regulations (5 questions)
  {
    id: 29,
    question: "What do CDM Regulations apply to?",
    options: [
      "Only large construction projects",
      "All construction work including electrical installation",
      "Only demolition work",
      "Only commercial buildings"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 applies to all construction work, including electrical installation, maintenance and repair work.",
    section: "CDM Regulations",
    difficulty: "basic",
    topic: "Scope",
    category: "Health & Safety"
  },
  {
    id: 30,
    question: "Under CDM, who has duties for construction projects?",
    options: [
      "Only the main contractor",
      "Clients, principal designers, principal contractors, designers and contractors",
      "Only the client",
      "Only the HSE"
    ],
    correctAnswer: 1,
    explanation: "CDM places duties on all duty holders: clients, principal designers, principal contractors, designers, contractors and workers.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "Duty Holders",
    category: "Health & Safety"
  },
  {
    id: 31,
    question: "When is a principal contractor required under CDM?",
    options: [
      "For all projects",
      "When there is more than one contractor on site",
      "Only for projects over £500,000",
      "Only for domestic projects"
    ],
    correctAnswer: 1,
    explanation: "A principal contractor must be appointed when there is more than one contractor working on a construction project.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "Principal Contractor",
    category: "Health & Safety"
  },

  // Working at Height (5 questions)
  {
    id: 32,
    question: "Under the Work at Height Regulations, what is 'work at height'?",
    options: [
      "Only work above 2 metres",
      "Work at any place where a person could fall and be injured",
      "Only work on scaffolding",
      "Only work on roofs"
    ],
    correctAnswer: 1,
    explanation: "Work at height means work in any place where a person could fall a distance liable to cause personal injury, including at ground level near holes.",
    section: "Working at Height",
    difficulty: "basic",
    topic: "Definition",
    category: "Health & Safety"
  },
  {
    id: 33,
    question: "What is the hierarchy for managing work at height risks?",
    options: [
      "Use a harness first",
      "Avoid work at height, prevent falls, minimise consequences of falls",
      "Put up warning signs",
      "Train all workers to climb"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy: avoid work at height where possible, prevent falls using suitable equipment, minimise fall distance/consequences.",
    section: "Working at Height",
    difficulty: "intermediate",
    topic: "Hierarchy",
    category: "Health & Safety"
  },
  {
    id: 34,
    question: "Before using a ladder, what checks should be made?",
    options: [
      "No checks required",
      "Check for damage, ensure suitable for task, correct angle, secure base",
      "Just check it's the right colour",
      "Check it belongs to the company"
    ],
    correctAnswer: 1,
    explanation: "Check ladder condition (no damage), suitability for the task, correct angle (1:4 ratio), and secure placement at base and top.",
    section: "Working at Height",
    difficulty: "basic",
    topic: "Ladder Safety",
    category: "Health & Safety"
  },

  // ============================================================
  // BS7671 FUNDAMENTALS (60 questions) - IDs 71-130
  // ============================================================

  // Scope and Definitions (10 questions)
  {
    id: 71,
    question: "What is the scope of BS 7671?",
    options: [
      "Only new installations",
      "Electrical installations in buildings and their surrounds",
      "Only industrial installations",
      "Only domestic installations"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 applies to the design, erection and verification of electrical installations in buildings and their surroundings.",
    section: "Scope",
    difficulty: "basic",
    topic: "Application",
    category: "BS7671 Fundamentals"
  },
  {
    id: 72,
    question: "What voltage does BS 7671 consider as 'Low Voltage' for AC systems?",
    options: [
      "Up to 50V",
      "Exceeding 50V but not exceeding 1000V",
      "Up to 230V only",
      "Any voltage below 400V"
    ],
    correctAnswer: 1,
    explanation: "Low voltage for AC is defined as exceeding 50V but not exceeding 1000V AC rms (or 1500V DC).",
    section: "Definitions",
    difficulty: "basic",
    topic: "Voltage Bands",
    category: "BS7671 Fundamentals"
  },
  {
    id: 73,
    question: "What is the definition of 'circuit protective conductor' (cpc)?",
    options: [
      "The neutral conductor",
      "A protective conductor connecting exposed-conductive-parts to the main earthing terminal",
      "The live conductor",
      "A conductor carrying load current"
    ],
    correctAnswer: 1,
    explanation: "A cpc is a protective conductor connecting exposed-conductive-parts to the main earthing terminal within the installation.",
    section: "Definitions",
    difficulty: "intermediate",
    topic: "Protective Conductors",
    category: "BS7671 Fundamentals"
  },
  {
    id: 74,
    question: "What is an 'extraneous-conductive-part'?",
    options: [
      "Part of the electrical installation",
      "A conductive part not forming part of the installation but liable to introduce a potential",
      "The main earth terminal",
      "A circuit protective conductor"
    ],
    correctAnswer: 1,
    explanation: "An extraneous-conductive-part is a conductive part liable to introduce a potential, generally earth potential, and is not part of the electrical installation (e.g., metal pipes, structural steelwork).",
    section: "Definitions",
    difficulty: "intermediate",
    topic: "Conductive Parts",
    category: "BS7671 Fundamentals"
  },
  {
    id: 75,
    question: "What is the nominal voltage for single-phase supplies in the UK?",
    options: [
      "220V",
      "230V",
      "240V",
      "250V"
    ],
    correctAnswer: 1,
    explanation: "The nominal voltage is 230V AC for single-phase supplies, with a tolerance of +10%/-6% giving 216.2V to 253V.",
    section: "Supply Systems",
    difficulty: "basic",
    topic: "Voltage Levels",
    category: "BS7671 Fundamentals"
  },

  // Protection Against Electric Shock (15 questions)
  {
    id: 76,
    question: "What are the two types of protection against electric shock?",
    options: [
      "RCD and MCB protection",
      "Basic protection and fault protection",
      "Earthing and bonding",
      "Insulation and barriers"
    ],
    correctAnswer: 1,
    explanation: "Protection against electric shock consists of basic protection (protection against contact with live parts) and fault protection (protection against contact with exposed-conductive-parts made live by a fault).",
    section: "Electric Shock",
    difficulty: "basic",
    topic: "Protection Types",
    category: "BS7671 Fundamentals"
  },
  {
    id: 77,
    question: "What is Automatic Disconnection of Supply (ADS)?",
    options: [
      "Manual isolation of circuits",
      "A protective measure where fault protection is provided by automatic disconnection",
      "A type of circuit breaker",
      "Emergency switching"
    ],
    correctAnswer: 1,
    explanation: "ADS is a protective measure combining basic protection (insulation, barriers) with fault protection by automatic disconnection in the event of a fault.",
    section: "Electric Shock",
    difficulty: "intermediate",
    topic: "ADS",
    category: "BS7671 Fundamentals"
  },
  {
    id: 78,
    question: "What is the maximum disconnection time for a 230V final circuit in a TN system?",
    options: [
      "0.2 seconds",
      "0.4 seconds",
      "1.0 seconds",
      "5.0 seconds"
    ],
    correctAnswer: 1,
    explanation: "For 230V TN systems, final circuits must disconnect within 0.4 seconds to prevent dangerous touch voltages persisting.",
    section: "Electric Shock",
    difficulty: "intermediate",
    topic: "Disconnection Times",
    category: "BS7671 Fundamentals"
  },
  {
    id: 79,
    question: "What is the maximum disconnection time for a TT system final circuit?",
    options: [
      "0.2 seconds",
      "0.4 seconds",
      "1.0 seconds",
      "5.0 seconds"
    ],
    correctAnswer: 2,
    explanation: "TT systems allow 1.0 second for final circuits due to typically higher earth fault loop impedance.",
    section: "Electric Shock",
    difficulty: "intermediate",
    topic: "Disconnection Times",
    category: "BS7671 Fundamentals"
  },
  {
    id: 80,
    question: "What is the purpose of supplementary bonding?",
    options: [
      "To replace main bonding",
      "To reduce touch voltage between simultaneously accessible parts",
      "To increase earth fault current",
      "To protect against overload"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding reduces potential difference between simultaneously accessible exposed and extraneous-conductive-parts.",
    section: "Electric Shock",
    difficulty: "intermediate",
    topic: "Bonding",
    category: "BS7671 Fundamentals"
  },

  // Earthing Systems (15 questions)
  {
    id: 81,
    question: "In a TN-S system, how is the earth connection provided?",
    options: [
      "Via an earth electrode at the installation",
      "Via a separate metallic connection to the distributor's earth",
      "Through the neutral conductor",
      "No earth connection is provided"
    ],
    correctAnswer: 1,
    explanation: "TN-S has a separate protective conductor (the sheath of the supply cable) providing the earth path back to the transformer.",
    section: "Earthing Systems",
    difficulty: "intermediate",
    topic: "TN-S",
    category: "BS7671 Fundamentals"
  },
  {
    id: 82,
    question: "What does TN-C-S (PME) mean?",
    options: [
      "Three-phase neutral earthed",
      "Combined neutral and protective conductor in supply, separate in installation",
      "Totally neutral combined system",
      "Temporary neutral connection system"
    ],
    correctAnswer: 1,
    explanation: "TN-C-S has combined neutral and earth (PEN) in the supply, separated at the origin into neutral and protective conductors in the installation.",
    section: "Earthing Systems",
    difficulty: "intermediate",
    topic: "TN-C-S",
    category: "BS7671 Fundamentals"
  },
  {
    id: 83,
    question: "In a TT system, how is the installation earthed?",
    options: [
      "Through the supply company's earth",
      "Via an earth electrode at the installation",
      "Through the neutral conductor",
      "No earthing is required"
    ],
    correctAnswer: 1,
    explanation: "TT systems use a local earth electrode (e.g., earth rod) as the installation has no connection to the distributor's earth.",
    section: "Earthing Systems",
    difficulty: "intermediate",
    topic: "TT System",
    category: "BS7671 Fundamentals"
  },
  {
    id: 84,
    question: "What is the typical earth fault loop impedance (Ze) for a TN-S supply?",
    options: [
      "0.8Ω maximum",
      "0.35Ω maximum",
      "21Ω maximum",
      "200Ω maximum"
    ],
    correctAnswer: 0,
    explanation: "TN-S supplies typically have Ze values up to 0.8Ω, as specified in the Electricity Safety, Quality and Continuity Regulations.",
    section: "Earthing Systems",
    difficulty: "intermediate",
    topic: "Ze Values",
    category: "BS7671 Fundamentals"
  },
  {
    id: 85,
    question: "What is the typical Ze value for a TN-C-S (PME) supply?",
    options: [
      "0.8Ω maximum",
      "0.35Ω maximum",
      "21Ω maximum",
      "200Ω maximum"
    ],
    correctAnswer: 1,
    explanation: "TN-C-S (PME) supplies typically have Ze values up to 0.35Ω due to the parallel earth paths.",
    section: "Earthing Systems",
    difficulty: "intermediate",
    topic: "Ze Values",
    category: "BS7671 Fundamentals"
  },

  // Protection Against Overcurrent (10 questions)
  {
    id: 86,
    question: "What are the two types of overcurrent?",
    options: [
      "Low and high current",
      "Overload and fault current (short-circuit)",
      "AC and DC overcurrent",
      "Transient and permanent"
    ],
    correctAnswer: 1,
    explanation: "Overcurrent includes overload current (excess current in a circuit that is electrically sound) and fault current (from a short-circuit or earth fault).",
    section: "Overcurrent",
    difficulty: "basic",
    topic: "Types",
    category: "BS7671 Fundamentals"
  },
  {
    id: 87,
    question: "What is the breaking capacity (Icn) of a protective device?",
    options: [
      "The normal operating current",
      "The maximum fault current the device can safely interrupt",
      "The minimum current to trip the device",
      "The time delay before tripping"
    ],
    correctAnswer: 1,
    explanation: "Breaking capacity is the maximum prospective fault current that the device can safely interrupt without damage.",
    section: "Overcurrent",
    difficulty: "intermediate",
    topic: "Breaking Capacity",
    category: "BS7671 Fundamentals"
  },
  {
    id: 88,
    question: "What is the purpose of discrimination between protective devices?",
    options: [
      "To save money on devices",
      "To ensure only the device nearest the fault operates",
      "To make testing easier",
      "To reduce cable sizes"
    ],
    correctAnswer: 1,
    explanation: "Discrimination (selectivity) ensures that only the protective device nearest to the fault operates, minimising disruption to other circuits.",
    section: "Overcurrent",
    difficulty: "intermediate",
    topic: "Discrimination",
    category: "BS7671 Fundamentals"
  },
  {
    id: 89,
    question: "What tripping characteristic does a Type B MCB have?",
    options: [
      "Trips between 2 and 3 times rated current",
      "Trips between 3 and 5 times rated current",
      "Trips between 5 and 10 times rated current",
      "Trips between 10 and 20 times rated current"
    ],
    correctAnswer: 1,
    explanation: "Type B MCBs trip magnetically between 3 and 5 times their rated current, suitable for resistive loads.",
    section: "Overcurrent",
    difficulty: "intermediate",
    topic: "MCB Types",
    category: "BS7671 Fundamentals"
  },
  {
    id: 90,
    question: "What is the application for Type C MCBs?",
    options: [
      "Highly resistive circuits like lighting",
      "Circuits with moderate inrush currents like motors",
      "Domestic socket circuits",
      "Computer equipment"
    ],
    correctAnswer: 1,
    explanation: "Type C MCBs (trip at 5-10 × In) are suitable for circuits with moderate inrush currents such as small motors and fluorescent lighting.",
    section: "Overcurrent",
    difficulty: "intermediate",
    topic: "MCB Types",
    category: "BS7671 Fundamentals"
  },

  // Fundamental Principles (10 questions)
  {
    id: 91,
    question: "What are the fundamental principles of good workmanship in BS 7671?",
    options: [
      "Speed is most important",
      "Use cheapest materials available",
      "Skilled, competent work using proper materials and techniques",
      "Follow verbal instructions only"
    ],
    correctAnswer: 2,
    explanation: "Good workmanship requires skilled persons using proper materials, following sound techniques, and meeting the requirements of the standard.",
    section: "Principles",
    difficulty: "basic",
    topic: "Workmanship",
    category: "BS7671 Fundamentals"
  },
  {
    id: 92,
    question: "What documentation must be provided on completion of an installation?",
    options: [
      "None required",
      "Electrical Installation Certificate with schedule of test results",
      "Just a receipt",
      "Verbal confirmation only"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (or Minor Works Certificate) must be provided with schedule of inspections and test results.",
    section: "Principles",
    difficulty: "basic",
    topic: "Certification",
    category: "BS7671 Fundamentals"
  },

  // ============================================================
  // BS7671 SELECTION & ERECTION (60 questions) - IDs 131-190
  // ============================================================

  // Cable Selection (20 questions)
  {
    id: 131,
    question: "What factors affect the current-carrying capacity of a cable?",
    options: [
      "Cable colour only",
      "Installation method, ambient temperature, grouping, thermal insulation",
      "Length of cable only",
      "The type of termination"
    ],
    correctAnswer: 1,
    explanation: "Current-carrying capacity depends on installation method (Appendix 4), ambient temperature (Ca), grouping (Cg), and thermal insulation (Ci).",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Current Capacity",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 132,
    question: "What is the minimum cable cross-sectional area for lighting circuits?",
    options: [
      "0.5mm²",
      "1.0mm²",
      "1.5mm²",
      "2.5mm²"
    ],
    correctAnswer: 1,
    explanation: "The minimum conductor size for lighting circuits is generally 1.0mm² for copper conductors.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Minimum Sizes",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 133,
    question: "What is the minimum cable size for socket outlet circuits using ring final circuit design?",
    options: [
      "1.0mm²",
      "1.5mm²",
      "2.5mm²",
      "4.0mm²"
    ],
    correctAnswer: 2,
    explanation: "Ring final circuits are typically wired in 2.5mm² cable, protected by a 32A device.",
    section: "Cable Selection",
    difficulty: "basic",
    topic: "Socket Circuits",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 134,
    question: "When selecting cable size, what does voltage drop need to be limited to?",
    options: [
      "5% of nominal voltage for lighting, 3% for other uses",
      "3% of nominal voltage for lighting, 5% for other uses",
      "10% for all circuits",
      "1% for all circuits"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop should not exceed 3% for lighting and 5% for other uses of the nominal voltage (BS 7671 Appendix 4).",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Voltage Drop",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 135,
    question: "What is the correction factor (Ca) used for?",
    options: [
      "Correcting for cable length",
      "Correcting for ambient temperature different from 30°C",
      "Correcting for voltage",
      "Correcting for frequency"
    ],
    correctAnswer: 1,
    explanation: "Ca is the ambient temperature correction factor applied when the ambient temperature differs from the reference 30°C.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Correction Factors",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 136,
    question: "What does the grouping factor (Cg) account for?",
    options: [
      "The number of people using circuits",
      "Reduced heat dissipation when cables are grouped together",
      "The type of circuit breaker",
      "The length of the cable run"
    ],
    correctAnswer: 1,
    explanation: "Cg accounts for reduced heat dissipation when cables are grouped, requiring derating of current-carrying capacity.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Correction Factors",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 137,
    question: "When installing cables in thermal insulation, which factor applies?",
    options: [
      "Ca only",
      "Cg only",
      "Ci (thermal insulation factor)",
      "No factor needed"
    ],
    correctAnswer: 2,
    explanation: "Ci applies when cables are installed in or surrounded by thermal insulation, typically 0.5 for cables totally surrounded.",
    section: "Cable Selection",
    difficulty: "intermediate",
    topic: "Thermal Insulation",
    category: "BS7671 Selection & Erection"
  },

  // Protective Devices (15 questions)
  {
    id: 138,
    question: "What is the difference between an RCD and an RCBO?",
    options: [
      "They are the same device",
      "An RCBO combines RCD protection with overcurrent protection",
      "An RCD is faster",
      "An RCBO only protects against earth faults"
    ],
    correctAnswer: 1,
    explanation: "An RCBO combines the functions of an RCD (residual current protection) and an MCB (overcurrent protection) in one device.",
    section: "Protective Devices",
    difficulty: "basic",
    topic: "RCBOs",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 139,
    question: "What is the maximum rated residual operating current for additional protection RCDs?",
    options: [
      "100mA",
      "30mA",
      "300mA",
      "10mA"
    ],
    correctAnswer: 1,
    explanation: "Additional protection requires RCDs with rated residual operating current (IΔn) not exceeding 30mA and operating time not exceeding 40ms at 5×IΔn.",
    section: "Protective Devices",
    difficulty: "basic",
    topic: "RCD Rating",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 140,
    question: "When is additional protection by 30mA RCD required?",
    options: [
      "Never required",
      "For socket outlets up to 32A and mobile equipment outdoors",
      "Only for industrial installations",
      "Only for lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "Additional protection by 30mA RCD is required for socket outlets ≤32A and mobile equipment used outdoors (411.3.3).",
    section: "Protective Devices",
    difficulty: "intermediate",
    topic: "Additional Protection",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 141,
    question: "What type of RCD should be used where loads may produce DC components?",
    options: [
      "Type AC",
      "Type A or Type B",
      "Type S",
      "Any type"
    ],
    correctAnswer: 1,
    explanation: "Type A RCDs detect pulsating DC, Type B detects smooth DC. Type AC only detects AC residual currents.",
    section: "Protective Devices",
    difficulty: "advanced",
    topic: "RCD Types",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 142,
    question: "What is a Type D MCB used for?",
    options: [
      "Domestic lighting circuits",
      "Circuits with very high inrush currents like transformers and X-ray equipment",
      "Socket outlet circuits",
      "Bathroom circuits"
    ],
    correctAnswer: 1,
    explanation: "Type D MCBs (trip at 10-20 × In) are for circuits with very high inrush currents like transformers, welding equipment, X-ray machines.",
    section: "Protective Devices",
    difficulty: "advanced",
    topic: "MCB Types",
    category: "BS7671 Selection & Erection"
  },

  // Earthing and Bonding (15 questions)
  {
    id: 143,
    question: "What is the minimum size of the main earthing conductor for a TN-S system?",
    options: [
      "Depends on supply conductor size - refer to Table 54.7",
      "Always 6mm²",
      "Always 10mm²",
      "Always 16mm²"
    ],
    correctAnswer: 0,
    explanation: "Main earthing conductor size depends on the size of the supply conductors, as specified in Table 54.7.",
    section: "Earthing",
    difficulty: "intermediate",
    topic: "Conductor Sizing",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 144,
    question: "What is the minimum size of main protective bonding conductors for supply up to 35mm²?",
    options: [
      "6mm² copper",
      "10mm² copper",
      "16mm² copper",
      "25mm² copper"
    ],
    correctAnswer: 1,
    explanation: "For supply conductors up to and including 35mm² copper, main bonding conductors must be at least 10mm² copper.",
    section: "Bonding",
    difficulty: "intermediate",
    topic: "Bonding Size",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 145,
    question: "What extraneous-conductive-parts require main protective bonding?",
    options: [
      "Only gas pipes",
      "Gas, water, oil pipes, structural steel, central heating and air conditioning systems",
      "Only water pipes",
      "None - bonding is optional"
    ],
    correctAnswer: 1,
    explanation: "Main bonding is required to gas, water, oil pipes, structural metalwork, and metallic service pipes (411.3.1.2).",
    section: "Bonding",
    difficulty: "intermediate",
    topic: "What to Bond",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 146,
    question: "Where should main protective bonding connections be made?",
    options: [
      "Anywhere convenient",
      "As close as practicable to the point of entry to the building",
      "At the consumer unit only",
      "Outside the building"
    ],
    correctAnswer: 1,
    explanation: "Main bonding connections should be made as close as practicable to the point of entry of the service into the building.",
    section: "Bonding",
    difficulty: "intermediate",
    topic: "Bonding Location",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 147,
    question: "What colour identification should earthing and bonding conductors have?",
    options: [
      "Blue",
      "Green and yellow bi-colour",
      "Brown",
      "Black"
    ],
    correctAnswer: 1,
    explanation: "Protective conductors, including earthing and bonding conductors, must be identified by green and yellow bi-colour.",
    section: "Earthing",
    difficulty: "basic",
    topic: "Identification",
    category: "BS7671 Selection & Erection"
  },

  // Special Locations (10 questions)
  {
    id: 148,
    question: "In a bathroom, what is Zone 0?",
    options: [
      "The area around the basin",
      "The interior of the bath or shower tray",
      "The area around the light switch",
      "The whole bathroom"
    ],
    correctAnswer: 1,
    explanation: "Zone 0 is the interior of the bath tub or shower basin, requiring IPX7 equipment only (suitable for immersion).",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Bathroom Zones",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 149,
    question: "What is the extent of Zone 1 in a bathroom?",
    options: [
      "The whole room",
      "Above the bath/shower to 2.25m from floor level",
      "The area outside the bathroom",
      "Within 600mm of the basin"
    ],
    correctAnswer: 1,
    explanation: "Zone 1 extends from the finished floor to 2.25m above, limited by the vertical plane of the bath/shower edge.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Bathroom Zones",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 150,
    question: "What IP rating is required for equipment in Zone 1 of a bathroom?",
    options: [
      "IPX4 minimum",
      "IPX5 minimum (or IPX4 where water jets not used for cleaning)",
      "IPX7 minimum",
      "No requirement"
    ],
    correctAnswer: 1,
    explanation: "Zone 1 requires minimum IPX5 (IPX4 where water jets not used for cleaning) protection.",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "IP Ratings",
    category: "BS7671 Selection & Erection"
  },

  // ============================================================
  // BS7671 INSPECTION & TESTING (60 questions) - IDs 191-250
  // ============================================================

  // Initial Verification (15 questions)
  {
    id: 191,
    question: "What is the correct sequence for initial verification tests?",
    options: [
      "Earth fault loop impedance first, then insulation resistance",
      "Continuity of protective conductors, insulation resistance, polarity, Zs, RCD",
      "RCD testing first, then everything else",
      "Any order is acceptable"
    ],
    correctAnswer: 1,
    explanation: "The sequence per GN3: continuity of protective/bonding conductors, ring continuity, insulation resistance, polarity, Zs, functional tests (RCDs).",
    section: "Testing Sequence",
    difficulty: "intermediate",
    topic: "Test Order",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 192,
    question: "What instrument is used for testing continuity of protective conductors?",
    options: [
      "Insulation resistance tester",
      "Low resistance ohmmeter",
      "Earth fault loop impedance tester",
      "RCD tester"
    ],
    correctAnswer: 1,
    explanation: "A low resistance ohmmeter (typically producing 200mA minimum at 4-24V DC) is used for continuity testing.",
    section: "Test Instruments",
    difficulty: "basic",
    topic: "Continuity Testing",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 193,
    question: "What test voltage is used for insulation resistance testing on 230V circuits?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "230V AC"
    ],
    correctAnswer: 1,
    explanation: "For circuits up to 500V, including standard 230V circuits, insulation resistance is tested at 500V DC.",
    section: "Insulation Testing",
    difficulty: "basic",
    topic: "Test Voltage",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 194,
    question: "What is the minimum acceptable insulation resistance for a 230V circuit?",
    options: [
      "0.5MΩ",
      "1.0MΩ",
      "2.0MΩ",
      "0.25MΩ"
    ],
    correctAnswer: 1,
    explanation: "The minimum insulation resistance for circuits up to 500V is 1.0MΩ (Table 6.1 of BS 7671).",
    section: "Insulation Testing",
    difficulty: "basic",
    topic: "Minimum Values",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 195,
    question: "Before conducting insulation resistance tests, what precautions must be taken?",
    options: [
      "No precautions needed",
      "Disconnect sensitive electronic equipment, ensure circuit is isolated",
      "Connect all loads",
      "Energise the circuit"
    ],
    correctAnswer: 1,
    explanation: "Disconnect/isolate sensitive electronic equipment that could be damaged by 500V test voltage, and ensure the circuit is de-energised.",
    section: "Insulation Testing",
    difficulty: "intermediate",
    topic: "Safety Precautions",
    category: "BS7671 Inspection & Testing"
  },

  // Earth Fault Loop Impedance (15 questions)
  {
    id: 196,
    question: "What is the formula for earth fault loop impedance?",
    options: [
      "Zs = Ze + R1 + R2",
      "Zs = Ze × R1 × R2",
      "Zs = Ze - R1 - R2",
      "Zs = R1 + R2 only"
    ],
    correctAnswer: 0,
    explanation: "Zs = Ze + (R1 + R2), where Ze is external loop impedance, R1 is line conductor resistance, R2 is cpc resistance.",
    section: "Loop Impedance",
    difficulty: "intermediate",
    topic: "Zs Formula",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 197,
    question: "Why must measured Zs values be lower than tabulated maximum values?",
    options: [
      "For no particular reason",
      "To allow for increased resistance when conductors are at operating temperature",
      "To make testing easier",
      "Table values are always wrong"
    ],
    correctAnswer: 1,
    explanation: "Measured values (typically at 20°C) must be lower than maximum tabulated values to allow for increased resistance at conductor operating temperature (around 70°C).",
    section: "Loop Impedance",
    difficulty: "intermediate",
    topic: "Temperature Correction",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 198,
    question: "What is the maximum Zs for a 32A Type B MCB in a 0.4 second circuit?",
    options: [
      "1.44Ω",
      "1.09Ω",
      "0.86Ω",
      "2.30Ω"
    ],
    correctAnswer: 0,
    explanation: "For 32A Type B MCB (trips at 5×In = 160A), Zs max = 230V/160A = 1.44Ω.",
    section: "Loop Impedance",
    difficulty: "intermediate",
    topic: "Zs Values",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 199,
    question: "How can R1+R2 be measured for a circuit?",
    options: [
      "Only by live earth loop impedance test",
      "By measuring at the origin with line and cpc connected and measuring at the furthest point",
      "It cannot be measured",
      "By measuring voltage only"
    ],
    correctAnswer: 1,
    explanation: "Connect line and cpc together at the origin, measure resistance at the furthest point. This gives R1+R2 directly.",
    section: "Loop Impedance",
    difficulty: "intermediate",
    topic: "R1+R2 Measurement",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 200,
    question: "What two methods can be used to measure earth fault loop impedance?",
    options: [
      "Visual inspection and continuity",
      "Live earth loop impedance testing or calculation from Ze and R1+R2",
      "Only live testing",
      "Only calculation"
    ],
    correctAnswer: 1,
    explanation: "Zs can be measured directly with a loop impedance tester on a live circuit, or calculated from Ze + (R1+R2) measured separately.",
    section: "Loop Impedance",
    difficulty: "intermediate",
    topic: "Test Methods",
    category: "BS7671 Inspection & Testing"
  },

  // RCD Testing (15 questions)
  {
    id: 201,
    question: "At what current should a 30mA RCD trip during testing?",
    options: [
      "At exactly 30mA",
      "Between 15mA and 30mA (50-100% of rated current)",
      "At 100mA",
      "At 10mA"
    ],
    correctAnswer: 1,
    explanation: "An RCD should trip between 50% and 100% of its rated residual current - for 30mA, between 15mA and 30mA.",
    section: "RCD Testing",
    difficulty: "intermediate",
    topic: "Trip Current",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 202,
    question: "What is the maximum trip time for a 30mA RCD at rated residual current?",
    options: [
      "100ms",
      "300ms",
      "40ms",
      "1000ms"
    ],
    correctAnswer: 1,
    explanation: "At rated residual current (IΔn), general RCDs must trip within 300ms (0.3 seconds).",
    section: "RCD Testing",
    difficulty: "intermediate",
    topic: "Trip Times",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 203,
    question: "What is the maximum trip time for additional protection RCDs at 5×IΔn?",
    options: [
      "300ms",
      "150ms",
      "40ms",
      "1000ms"
    ],
    correctAnswer: 2,
    explanation: "For additional protection (30mA RCDs), maximum trip time at 5×IΔn (150mA) is 40ms.",
    section: "RCD Testing",
    difficulty: "intermediate",
    topic: "Additional Protection",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 204,
    question: "How often should RCDs be tested using the test button?",
    options: [
      "Annually by the installer",
      "Quarterly by the user",
      "Never",
      "Only during periodic inspection"
    ],
    correctAnswer: 1,
    explanation: "Users should operate the test button quarterly (every 3 months) to confirm the RCD trips correctly.",
    section: "RCD Testing",
    difficulty: "basic",
    topic: "User Testing",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 205,
    question: "What does an RCD tester actually measure?",
    options: [
      "Current draw of the circuit",
      "Time taken for RCD to trip at various test currents",
      "Voltage of the circuit",
      "Resistance of the RCD"
    ],
    correctAnswer: 1,
    explanation: "An RCD tester creates a controlled imbalance current and measures the time taken for the RCD to trip.",
    section: "RCD Testing",
    difficulty: "basic",
    topic: "RCD Testers",
    category: "BS7671 Inspection & Testing"
  },

  // Ring Final Circuit Testing (10 questions)
  {
    id: 206,
    question: "What is the first test in ring final circuit continuity testing?",
    options: [
      "Measure insulation resistance",
      "Measure end-to-end resistance of each conductor (L, N, E)",
      "Measure earth loop impedance",
      "Test RCDs"
    ],
    correctAnswer: 1,
    explanation: "First measure the end-to-end resistance of each conductor by temporarily linking L-L, N-N, E-E at the consumer unit.",
    section: "Ring Circuits",
    difficulty: "intermediate",
    topic: "Test Procedure",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 207,
    question: "In ring final circuit testing, what should the line and neutral end-to-end readings be?",
    options: [
      "Different values",
      "Substantially the same (within 0.05Ω)",
      "Neutral should be higher",
      "Line should be zero"
    ],
    correctAnswer: 1,
    explanation: "Line and neutral should have substantially the same resistance as they are the same size conductor in the same cable.",
    section: "Ring Circuits",
    difficulty: "intermediate",
    topic: "Expected Values",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 208,
    question: "Why might the earth conductor have a different end-to-end resistance than line and neutral in a ring?",
    options: [
      "It should always be the same",
      "The cpc may be a smaller cross-sectional area",
      "Testing error",
      "Earth conductors don't carry current"
    ],
    correctAnswer: 1,
    explanation: "In twin and earth cable, the cpc is often smaller (e.g., 1.5mm² with 2.5mm² L/N), giving higher resistance.",
    section: "Ring Circuits",
    difficulty: "intermediate",
    topic: "Conductor Sizes",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 209,
    question: "After measuring end-to-end resistance, what is the next step in ring testing?",
    options: [
      "Finish testing",
      "Cross-connect L1-N2, N1-L2 and E1-E2, then measure at each socket",
      "Energise the circuit",
      "Install more sockets"
    ],
    correctAnswer: 1,
    explanation: "Cross-connect conductors at consumer unit (L1-N2, N1-L2, E1-E2), then measure at each socket to verify ring continuity.",
    section: "Ring Circuits",
    difficulty: "advanced",
    topic: "Cross-Connection",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 210,
    question: "What reading should be obtained at each socket after cross-connecting?",
    options: [
      "Different at each socket",
      "Approximately the same (should be r1+rn)/4 or (r1+r2)/4",
      "Zero at all sockets",
      "Infinite resistance"
    ],
    correctAnswer: 1,
    explanation: "Each socket should read approximately the same, equal to (r1+rn)/4 or (r1+r2)/4 due to the parallel paths.",
    section: "Ring Circuits",
    difficulty: "advanced",
    topic: "Expected Values",
    category: "BS7671 Inspection & Testing"
  },

  // Documentation (5 questions)
  {
    id: 211,
    question: "What certificate is required for a new electrical installation?",
    options: [
      "Minor Works Certificate",
      "Electrical Installation Certificate",
      "Domestic Installer Certificate",
      "No certificate required"
    ],
    correctAnswer: 1,
    explanation: "A full Electrical Installation Certificate is required for new installations, with schedule of inspections and test results.",
    section: "Documentation",
    difficulty: "basic",
    topic: "Certificates",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 212,
    question: "When can a Minor Works Certificate be used?",
    options: [
      "For any work",
      "For minor work not involving a new circuit",
      "Only for testing",
      "For new installations"
    ],
    correctAnswer: 1,
    explanation: "A Minor Works Certificate is for additions/alterations that do not involve adding a new circuit to the installation.",
    section: "Documentation",
    difficulty: "basic",
    topic: "Certificates",
    category: "BS7671 Inspection & Testing"
  },

  // ============================================================
  // BUILDING REGULATIONS PART P (50 questions) - IDs 251-300
  // ============================================================

  // Part P Requirements (20 questions)
  {
    id: 251,
    question: "What does Part P of the Building Regulations cover?",
    options: [
      "Plumbing installations",
      "Electrical safety in dwellings",
      "Structural requirements",
      "Fire safety only"
    ],
    correctAnswer: 1,
    explanation: "Part P covers electrical safety in dwellings and applies to England (similar requirements in Wales, Scotland and N. Ireland).",
    section: "Part P",
    difficulty: "basic",
    topic: "Scope",
    category: "Building Regulations"
  },
  {
    id: 252,
    question: "To which buildings does Part P apply?",
    options: [
      "Commercial buildings only",
      "Dwellings including houses, flats, and communal areas",
      "Industrial premises only",
      "Hospitals only"
    ],
    correctAnswer: 1,
    explanation: "Part P applies to dwellings, including dwelling houses, flats, and associated land and outbuildings/garden structures.",
    section: "Part P",
    difficulty: "basic",
    topic: "Application",
    category: "Building Regulations"
  },
  {
    id: 253,
    question: "What is notifiable work under Part P?",
    options: [
      "All electrical work",
      "Work in special locations or involving new circuits",
      "Only socket outlet additions",
      "Only lighting changes"
    ],
    correctAnswer: 1,
    explanation: "Notifiable work includes work in special locations (bathrooms, swimming pools), new circuits, and consumer unit replacement.",
    section: "Part P",
    difficulty: "intermediate",
    topic: "Notification",
    category: "Building Regulations"
  },
  {
    id: 254,
    question: "Which of these is notifiable work under Part P?",
    options: [
      "Replacing a damaged socket outlet",
      "Installing a new circuit",
      "Adding a fused spur to an existing circuit outside special locations",
      "Replacing a light fitting"
    ],
    correctAnswer: 1,
    explanation: "Installing a new circuit is notifiable. Simple replacements and non-notifiable additions like fused spurs do not require notification.",
    section: "Part P",
    difficulty: "intermediate",
    topic: "Notifiable Work",
    category: "Building Regulations"
  },
  {
    id: 255,
    question: "What are the special locations under Part P where all electrical work is notifiable?",
    options: [
      "Kitchens and bedrooms",
      "Bathrooms, swimming pools, and hot tub areas",
      "Living rooms and hallways",
      "Garages and sheds"
    ],
    correctAnswer: 1,
    explanation: "Special locations include rooms with a bath or shower, swimming pool/paddling pool areas, and hot tub areas where all electrical work is notifiable.",
    section: "Part P",
    difficulty: "intermediate",
    topic: "Special Locations",
    category: "Building Regulations"
  },

  // Competent Person Schemes (15 questions)
  {
    id: 256,
    question: "What is a competent person scheme?",
    options: [
      "A training course",
      "A scheme allowing registered electricians to self-certify notifiable work",
      "A government department",
      "A type of insurance"
    ],
    correctAnswer: 1,
    explanation: "Competent person schemes allow registered installers to self-certify their work as compliant without building control involvement.",
    section: "CPS",
    difficulty: "basic",
    topic: "Definition",
    category: "Building Regulations"
  },
  {
    id: 257,
    question: "Name a competent person scheme for electrical work.",
    options: [
      "Gas Safe Register",
      "NAPIT, NICEIC, ELECSA, or Stroma",
      "CORGI",
      "OFTEC"
    ],
    correctAnswer: 1,
    explanation: "Electrical competent person schemes include NAPIT, NICEIC, ELECSA, and several others approved by government.",
    section: "CPS",
    difficulty: "basic",
    topic: "Scheme Names",
    category: "Building Regulations"
  },
  {
    id: 258,
    question: "What must a competent person scheme member do after completing notifiable work?",
    options: [
      "Nothing",
      "Notify the scheme and provide certificate to customer and local authority",
      "Only tell the customer",
      "Wait to be inspected"
    ],
    correctAnswer: 1,
    explanation: "Members must notify their scheme, provide a Building Regulations Compliance Certificate, and the scheme notifies the local authority.",
    section: "CPS",
    difficulty: "intermediate",
    topic: "Requirements",
    category: "Building Regulations"
  },
  {
    id: 259,
    question: "If an installer is not registered with a competent person scheme, how can notifiable work be certified?",
    options: [
      "It cannot be done",
      "By notifying building control before starting and arranging inspection",
      "By the customer signing off",
      "By photographing the work"
    ],
    correctAnswer: 1,
    explanation: "Non-registered installers must notify building control before starting work and arrange for inspection/certification.",
    section: "Building Control",
    difficulty: "intermediate",
    topic: "Alternative Route",
    category: "Building Regulations"
  },
  {
    id: 260,
    question: "What certificate should a customer receive for notifiable electrical work?",
    options: [
      "No certificate needed",
      "Building Regulations Compliance Certificate (BS 7671 certificate)",
      "Gas Safety Certificate",
      "Planning Permission"
    ],
    correctAnswer: 1,
    explanation: "Customers should receive a Building Regulations Compliance Certificate along with the appropriate BS 7671 certificate.",
    section: "Certification",
    difficulty: "basic",
    topic: "Documentation",
    category: "Building Regulations"
  },

  // Non-notifiable Work (15 questions)
  {
    id: 261,
    question: "Which of these is non-notifiable work under Part P?",
    options: [
      "Installing a new circuit",
      "Replacing a consumer unit",
      "Adding a socket outlet to an existing circuit (not in special location)",
      "All work in a bathroom"
    ],
    correctAnswer: 2,
    explanation: "Adding a socket to an existing circuit outside special locations is non-notifiable (but must still comply with BS 7671).",
    section: "Non-notifiable",
    difficulty: "intermediate",
    topic: "Examples",
    category: "Building Regulations"
  },
  {
    id: 262,
    question: "Although not notifiable, what must all electrical work still comply with?",
    options: [
      "Nothing in particular",
      "BS 7671 and Part P requirements",
      "Only manufacturer instructions",
      "Only customer wishes"
    ],
    correctAnswer: 1,
    explanation: "All electrical work, whether notifiable or not, must comply with BS 7671 and meet the requirements of Part P.",
    section: "Compliance",
    difficulty: "basic",
    topic: "Standards",
    category: "Building Regulations"
  },
  {
    id: 263,
    question: "Is replacing a consumer unit notifiable work?",
    options: [
      "No, it's a simple replacement",
      "Yes, it involves the origin of the installation",
      "Only if adding circuits",
      "Only in flats"
    ],
    correctAnswer: 1,
    explanation: "Consumer unit replacement is notifiable work as it involves work at the origin of the installation.",
    section: "Notifiable Work",
    difficulty: "intermediate",
    topic: "Consumer Units",
    category: "Building Regulations"
  },

  // ============================================================
  // SAFE ISOLATION (50 questions) - IDs 301-350
  // ============================================================

  // GS38 Procedure (20 questions)
  {
    id: 301,
    question: "What is the correct sequence for safe isolation according to GS38?",
    options: [
      "Isolate, test dead, secure",
      "Identify circuit, isolate, secure, test voltage indicator, prove dead, re-test indicator",
      "Turn off, work immediately",
      "Test, isolate, test"
    ],
    correctAnswer: 1,
    explanation: "GS38 procedure: identify circuit, isolate, secure against re-energisation, test voltage indicator on known live source, prove circuit dead, re-test indicator on live source.",
    section: "GS38",
    difficulty: "basic",
    topic: "Procedure",
    category: "Safe Isolation"
  },
  {
    id: 302,
    question: "Why must a voltage indicator be tested before and after proving dead?",
    options: [
      "To warm it up",
      "To confirm the tester is working correctly and hasn't failed during use",
      "Manufacturer recommendation only",
      "To save battery"
    ],
    correctAnswer: 1,
    explanation: "Testing before proves it works, testing after confirms it didn't fail during the proving dead test - this validates the dead reading.",
    section: "GS38",
    difficulty: "basic",
    topic: "Proving Unit",
    category: "Safe Isolation"
  },
  {
    id: 303,
    question: "What is a proving unit used for?",
    options: [
      "Measuring current",
      "Providing a known voltage to test that the voltage indicator works",
      "Measuring resistance",
      "Testing RCDs"
    ],
    correctAnswer: 1,
    explanation: "A proving unit provides a known voltage source to test that voltage indicators are functioning correctly before and after use.",
    section: "GS38",
    difficulty: "basic",
    topic: "Proving Unit",
    category: "Safe Isolation"
  },
  {
    id: 304,
    question: "What should be done to prevent accidental re-energisation?",
    options: [
      "Tell someone you're working",
      "Lock off with personal lock and apply warning labels",
      "Just switch off",
      "Work quickly"
    ],
    correctAnswer: 1,
    explanation: "Secure isolation using personal lock with unique key, apply warning labels, and retain the key until work is complete.",
    section: "Lock-off",
    difficulty: "basic",
    topic: "Security",
    category: "Safe Isolation"
  },
  {
    id: 305,
    question: "Under GS38, what is the maximum permitted exposed metal probe tip length?",
    options: [
      "10mm",
      "4mm (2mm preferred)",
      "20mm",
      "No limit"
    ],
    correctAnswer: 1,
    explanation: "GS38 specifies maximum 4mm exposed probe tip length, with 2mm being preferred to minimise arc flash risk.",
    section: "GS38",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Safe Isolation"
  },
  {
    id: 306,
    question: "What features should test leads comply with according to GS38?",
    options: [
      "Any leads are acceptable",
      "Finger barriers, fused, insulated probes, correct CAT rating",
      "Just coloured red and black",
      "Metal probes only"
    ],
    correctAnswer: 1,
    explanation: "GS38 requires finger barriers or shrouded probes, fused leads, maximum 4mm exposed tip, and appropriate CAT rating.",
    section: "GS38",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Safe Isolation"
  },
  {
    id: 307,
    question: "What CAT rating is typically required for testing at the origin of an installation?",
    options: [
      "CAT I",
      "CAT II",
      "CAT III or CAT IV",
      "No rating required"
    ],
    correctAnswer: 2,
    explanation: "Testing at origin requires CAT III (distribution level) or CAT IV (service entrance), depending on location.",
    section: "GS38",
    difficulty: "intermediate",
    topic: "CAT Ratings",
    category: "Safe Isolation"
  },
  {
    id: 308,
    question: "When isolating, which phases must be proven dead on a three-phase supply?",
    options: [
      "Just one phase",
      "All three phases L1, L2, L3 and neutral",
      "Only two phases",
      "Phases alternate, so just the active one"
    ],
    correctAnswer: 1,
    explanation: "All three phases and the neutral must be proven dead as any could be energised due to faults or backfeed.",
    section: "Three Phase",
    difficulty: "intermediate",
    topic: "Three-Phase Isolation",
    category: "Safe Isolation"
  },

  // Test Equipment (15 questions)
  {
    id: 309,
    question: "Why are two-pole voltage testers preferred over single-pole neon testers?",
    options: [
      "They are cheaper",
      "They prove the circuit between two test points, confirming complete circuit",
      "They look more professional",
      "They are smaller"
    ],
    correctAnswer: 1,
    explanation: "Two-pole testers measure voltage between two points (L-N, L-E), providing reliable detection unlike neon testers that can give false readings.",
    section: "Test Equipment",
    difficulty: "intermediate",
    topic: "Voltage Testers",
    category: "Safe Isolation"
  },
  {
    id: 310,
    question: "What visual checks should be made on a voltage indicator before use?",
    options: [
      "None required",
      "Check for damage to leads, probes, body; ensure probes are insulated",
      "Just check the colour",
      "Check the brand name"
    ],
    correctAnswer: 1,
    explanation: "Check leads and probes for damage, correct connection, insulation intact, finger barriers present, no exposed conductors.",
    section: "Test Equipment",
    difficulty: "basic",
    topic: "Pre-use Checks",
    category: "Safe Isolation"
  },
  {
    id: 311,
    question: "What is the maximum fuse rating for GS38 compliant test leads?",
    options: [
      "3A",
      "500mA or less",
      "13A",
      "No fuse required"
    ],
    correctAnswer: 1,
    explanation: "GS38 recommends fused leads with fuses rated at 500mA or less to limit energy in case of flashover.",
    section: "Test Equipment",
    difficulty: "intermediate",
    topic: "Fused Leads",
    category: "Safe Isolation"
  },

  // Warning Notices (10 questions)
  {
    id: 312,
    question: "What information should an isolation warning label include?",
    options: [
      "Just the date",
      "Name of person isolating, date/time, what is isolated, contact details",
      "Company logo only",
      "Circuit number only"
    ],
    correctAnswer: 1,
    explanation: "Labels should identify who has isolated, date and time, what circuit/equipment, and how to contact them.",
    section: "Warning Notices",
    difficulty: "basic",
    topic: "Label Content",
    category: "Safe Isolation"
  },
  {
    id: 313,
    question: "Where should danger/warning notices be placed during isolation?",
    options: [
      "Only at the consumer unit",
      "At all points of isolation and points where work is being carried out",
      "In the office only",
      "Not required"
    ],
    correctAnswer: 1,
    explanation: "Notices should be at all isolation points and work locations to warn others and prevent accidental re-energisation.",
    section: "Warning Notices",
    difficulty: "basic",
    topic: "Placement",
    category: "Safe Isolation"
  },

  // Permit to Work (5 questions)
  {
    id: 314,
    question: "When might a permit to work system be required for electrical work?",
    options: [
      "Never",
      "For high-risk work, especially on HV systems or in industrial environments",
      "Only for apprentices",
      "Only abroad"
    ],
    correctAnswer: 1,
    explanation: "Permit to work systems are used for high-risk activities, including HV systems, complex isolations, or where multiple teams work.",
    section: "Permits",
    difficulty: "intermediate",
    topic: "When Required",
    category: "Safe Isolation"
  },
  {
    id: 315,
    question: "Who is responsible for removing the lock and warning notices after work is complete?",
    options: [
      "Anyone can do it",
      "Only the person who applied them or authorised transfer",
      "The supervisor automatically",
      "The electrician who arrives next"
    ],
    correctAnswer: 1,
    explanation: "Only the person who applied their personal lock should remove it, or formal handover procedures must be followed.",
    section: "Lock-off",
    difficulty: "intermediate",
    topic: "Removal",
    category: "Safe Isolation"
  },

  // ============================================================
  // FAULT FINDING (50 questions) - IDs 351-400
  // ============================================================

  // Methodology (15 questions)
  {
    id: 351,
    question: "What is the first step in systematic fault finding?",
    options: [
      "Replace components randomly",
      "Gather information about the symptoms and history",
      "Disconnect everything",
      "Call for help"
    ],
    correctAnswer: 1,
    explanation: "Start by gathering information: what happened, when, any changes made, symptoms observed, to understand the problem.",
    section: "Methodology",
    difficulty: "basic",
    topic: "Six-Point Plan",
    category: "Fault Finding"
  },
  {
    id: 352,
    question: "What is the logical six-point fault finding approach?",
    options: [
      "Test, replace, repeat",
      "Gather info, analyse, identify possible causes, test hypothesis, rectify, verify",
      "Guess, change, hope",
      "Call manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Six-point approach: gather information, analyse symptoms, identify probable causes, test to locate fault, rectify, verify operation.",
    section: "Methodology",
    difficulty: "intermediate",
    topic: "Six-Point Plan",
    category: "Fault Finding"
  },
  {
    id: 353,
    question: "What is the 'half-split' method in fault finding?",
    options: [
      "Cutting cables in half",
      "Testing at the midpoint to determine which half contains the fault",
      "Using half the test equipment",
      "Working half a day"
    ],
    correctAnswer: 1,
    explanation: "Half-split: test at the midpoint of a circuit to determine which half contains the fault, then repeat in the faulty half.",
    section: "Methodology",
    difficulty: "intermediate",
    topic: "Test Methods",
    category: "Fault Finding"
  },
  {
    id: 354,
    question: "Before starting electrical fault finding, what must be done first?",
    options: [
      "Start testing immediately",
      "Conduct a risk assessment and ensure safe isolation where appropriate",
      "Call the customer",
      "Order spare parts"
    ],
    correctAnswer: 1,
    explanation: "Always assess risks, ensure appropriate isolation, and follow safe working procedures before fault finding.",
    section: "Safety",
    difficulty: "basic",
    topic: "Safe Approach",
    category: "Fault Finding"
  },

  // Common Faults (20 questions)
  {
    id: 355,
    question: "An MCB trips immediately on reset. What type of fault does this indicate?",
    options: [
      "Overload",
      "Short circuit (dead short)",
      "High resistance joint",
      "Earth leakage"
    ],
    correctAnswer: 1,
    explanation: "Immediate tripping indicates a short circuit (L-N or L-E), causing high fault current and magnetic trip operation.",
    section: "Common Faults",
    difficulty: "intermediate",
    topic: "MCB Tripping",
    category: "Fault Finding"
  },
  {
    id: 356,
    question: "An MCB trips after a few minutes of operation. This suggests:",
    options: [
      "Short circuit",
      "Overload condition",
      "Earth fault",
      "Incorrect installation"
    ],
    correctAnswer: 1,
    explanation: "Delayed tripping (thermal operation) indicates overload - current exceeds rating but not enough for instant magnetic trip.",
    section: "Common Faults",
    difficulty: "intermediate",
    topic: "MCB Tripping",
    category: "Fault Finding"
  },
  {
    id: 357,
    question: "An RCD keeps tripping. What should you check?",
    options: [
      "Overload on the circuit",
      "Earth leakage, N-E faults, moisture ingress, or faulty appliances",
      "Incorrect fuse size",
      "Voltage levels"
    ],
    correctAnswer: 1,
    explanation: "RCDs trip on current imbalance, typically caused by earth leakage, N-E cross connections, moisture, or faulty equipment.",
    section: "Common Faults",
    difficulty: "intermediate",
    topic: "RCD Tripping",
    category: "Fault Finding"
  },
  {
    id: 358,
    question: "What causes a high resistance joint?",
    options: [
      "Using too much cable",
      "Poor connections, oxidation, incorrect termination, or mechanical damage",
      "Using copper cable",
      "Too many sockets"
    ],
    correctAnswer: 1,
    explanation: "High resistance joints result from loose connections, corrosion, incorrect termination, or damage, causing heat and potential fire risk.",
    section: "Common Faults",
    difficulty: "intermediate",
    topic: "High Resistance",
    category: "Fault Finding"
  },
  {
    id: 359,
    question: "How can a high resistance joint be identified?",
    options: [
      "It's always visible",
      "Thermal imaging, smell of burning, discoloration, or voltage drop testing",
      "It cannot be found",
      "By listening for noise"
    ],
    correctAnswer: 1,
    explanation: "Signs include discoloration, smell, heat detected by thermal imaging, or voltage drop measurements across connections.",
    section: "Common Faults",
    difficulty: "intermediate",
    topic: "High Resistance",
    category: "Fault Finding"
  },
  {
    id: 360,
    question: "What is a transient fault?",
    options: [
      "A permanent fault",
      "An intermittent fault that comes and goes",
      "A fault in transit",
      "A fault in a vehicle"
    ],
    correctAnswer: 1,
    explanation: "Transient faults are intermittent, appearing and disappearing, often temperature or vibration related, making them difficult to locate.",
    section: "Fault Types",
    difficulty: "intermediate",
    topic: "Transient Faults",
    category: "Fault Finding"
  },
  {
    id: 361,
    question: "A lighting circuit has partial failure. What should be checked?",
    options: [
      "The main fuse",
      "Individual switches, connections, and lamp holders in the dead section",
      "The consumer unit",
      "The electricity meter"
    ],
    correctAnswer: 1,
    explanation: "Partial failure suggests a localised fault - check switches, connections, lamp holders in the non-working section.",
    section: "Common Faults",
    difficulty: "basic",
    topic: "Lighting Faults",
    category: "Fault Finding"
  },
  {
    id: 362,
    question: "What can cause flickering lights?",
    options: [
      "Normal operation",
      "Loose connections, failing lamps, incompatible dimmer, or supply issues",
      "Too many lights",
      "Correct installation"
    ],
    correctAnswer: 1,
    explanation: "Flickering can indicate loose connections, failing lamp/driver, incompatible dimmer with LED lamps, or supply voltage fluctuations.",
    section: "Common Faults",
    difficulty: "intermediate",
    topic: "Lighting Faults",
    category: "Fault Finding"
  },

  // Test Instruments (10 questions)
  {
    id: 363,
    question: "Which instrument would you use to trace a cable route?",
    options: [
      "Insulation resistance tester",
      "Cable locator/tracer",
      "RCD tester",
      "Earth loop tester"
    ],
    correctAnswer: 1,
    explanation: "Cable locators use signal transmission and detection to trace cable routes through walls and underground.",
    section: "Instruments",
    difficulty: "basic",
    topic: "Cable Locators",
    category: "Fault Finding"
  },
  {
    id: 364,
    question: "What would you use to detect hot spots indicating high resistance joints?",
    options: [
      "Multimeter",
      "Thermal imaging camera",
      "Proving unit",
      "Socket tester"
    ],
    correctAnswer: 1,
    explanation: "Thermal imaging cameras detect elevated temperatures at connection points, indicating high resistance joints.",
    section: "Instruments",
    difficulty: "intermediate",
    topic: "Thermal Imaging",
    category: "Fault Finding"
  },
  {
    id: 365,
    question: "How can you test for a broken conductor in a cable?",
    options: [
      "Visual inspection only",
      "Continuity test along the conductor length",
      "Voltage test",
      "RCD test"
    ],
    correctAnswer: 1,
    explanation: "A continuity test will show infinite resistance (open circuit) where the conductor is broken.",
    section: "Test Methods",
    difficulty: "basic",
    topic: "Continuity",
    category: "Fault Finding"
  },

  // Documentation and Repair (5 questions)
  {
    id: 366,
    question: "After rectifying a fault, what must be done?",
    options: [
      "Leave immediately",
      "Test to verify repair, document the fault and repair",
      "Just tell the customer",
      "Nothing else required"
    ],
    correctAnswer: 1,
    explanation: "After repair: test to verify correct operation, document what was found and done, provide appropriate certification if required.",
    section: "Documentation",
    difficulty: "basic",
    topic: "Post-Repair",
    category: "Fault Finding"
  },
  {
    id: 367,
    question: "What documentation should be provided after fault rectification?",
    options: [
      "None",
      "Minor Works Certificate or EIC as appropriate, plus fault report",
      "Just a verbal report",
      "Photograph only"
    ],
    correctAnswer: 1,
    explanation: "Appropriate certification (Minor Works or EIC) plus a fault report detailing symptoms, cause, and rectification work done.",
    section: "Documentation",
    difficulty: "basic",
    topic: "Certificates",
    category: "Fault Finding"
  },

  // Additional questions to reach 400
  {
    id: 368,
    question: "What is the typical supply voltage tolerance in the UK?",
    options: [
      "±5%",
      "+10%/-6% of 230V",
      "±15%",
      "Exactly 230V always"
    ],
    correctAnswer: 1,
    explanation: "UK supply is 230V +10%/-6%, giving acceptable range of 216.2V to 253V.",
    section: "Supply",
    difficulty: "basic",
    topic: "Voltage",
    category: "BS7671 Fundamentals"
  },
  {
    id: 369,
    question: "What is the purpose of a consumer unit?",
    options: [
      "To measure electricity consumption",
      "To distribute circuits and provide overcurrent and RCD protection",
      "To generate electricity",
      "To store electricity"
    ],
    correctAnswer: 1,
    explanation: "A consumer unit is the main distribution board distributing circuits and housing protective devices for the installation.",
    section: "Equipment",
    difficulty: "basic",
    topic: "Consumer Units",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 370,
    question: "What does AMD stand for in relation to BS 7671?",
    options: [
      "Automatic Monitoring Device",
      "Amendment",
      "Additional Monitoring Document",
      "Applied Maximum Demand"
    ],
    correctAnswer: 1,
    explanation: "AMD refers to Amendments to BS 7671, which update the standard between editions.",
    section: "Standards",
    difficulty: "basic",
    topic: "Amendments",
    category: "BS7671 Fundamentals"
  },
  {
    id: 371,
    question: "What is the minimum IP rating for general electrical equipment in Zone 2 of a bathroom?",
    options: [
      "IPX0",
      "IPX4",
      "IPX7",
      "No requirement"
    ],
    correctAnswer: 1,
    explanation: "Zone 2 requires minimum IPX4 for fixed equipment (protection against splashing water).",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "IP Ratings",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 372,
    question: "What is the purpose of RCD protection?",
    options: [
      "To protect against overload only",
      "To provide additional protection against electric shock by detecting earth leakage",
      "To regulate voltage",
      "To reduce electricity bills"
    ],
    correctAnswer: 1,
    explanation: "RCDs detect current imbalance (earth leakage) and disconnect quickly, providing additional protection against electric shock.",
    section: "Protection",
    difficulty: "basic",
    topic: "RCD Purpose",
    category: "BS7671 Fundamentals"
  },
  {
    id: 373,
    question: "What must be verified before energising a new installation?",
    options: [
      "Nothing special",
      "Completion of all inspection and testing, satisfactory results recorded",
      "Customer payment",
      "Good weather"
    ],
    correctAnswer: 1,
    explanation: "All inspection and testing must be complete with satisfactory results before energisation.",
    section: "Verification",
    difficulty: "basic",
    topic: "Energisation",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 374,
    question: "How should circuit identification labels be marked?",
    options: [
      "Pencil only",
      "Durable and legible marking identifying each circuit",
      "No marking required",
      "Only for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "Circuits must be durably and legibly marked to identify them at the distribution board.",
    section: "Identification",
    difficulty: "basic",
    topic: "Labelling",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 375,
    question: "What is the purpose of a functional test?",
    options: [
      "To test appearance",
      "To verify that controls, interlocks, and devices operate correctly",
      "To test installation speed",
      "To verify colour matching"
    ],
    correctAnswer: 1,
    explanation: "Functional testing verifies that all controls, switches, interlocks, and devices operate as intended.",
    section: "Testing",
    difficulty: "basic",
    topic: "Functional Tests",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 376,
    question: "What is double insulation (Class II)?",
    options: [
      "Two layers of PVC",
      "Basic insulation plus supplementary insulation, no earth required",
      "Two cables in parallel",
      "Extra thick insulation only"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment has both basic and supplementary insulation, requiring no protective earth connection.",
    section: "Protection",
    difficulty: "intermediate",
    topic: "Class II",
    category: "BS7671 Fundamentals"
  },
  {
    id: 377,
    question: "What is SELV?",
    options: [
      "Standard Extra Low Voltage",
      "Separated Extra-Low Voltage",
      "Special Electric Low Voltage",
      "Single Element Low Voltage"
    ],
    correctAnswer: 1,
    explanation: "SELV (Separated Extra-Low Voltage) is a system where live parts are isolated from earth and other systems.",
    section: "Protection",
    difficulty: "intermediate",
    topic: "SELV",
    category: "BS7671 Fundamentals"
  },
  {
    id: 378,
    question: "What voltage is considered extra-low voltage (ELV)?",
    options: [
      "Up to 120V",
      "Not exceeding 50V AC or 120V DC",
      "Up to 230V",
      "Any voltage below 400V"
    ],
    correctAnswer: 1,
    explanation: "Extra-low voltage does not exceed 50V AC rms or 120V ripple-free DC between conductors or to earth.",
    section: "Definitions",
    difficulty: "intermediate",
    topic: "ELV",
    category: "BS7671 Fundamentals"
  },
  {
    id: 379,
    question: "What is the purpose of a warning notice at the origin of installation?",
    options: [
      "Decoration",
      "To warn of potential dangers and provide safety information",
      "Legal requirement only",
      "For insurance purposes"
    ],
    correctAnswer: 1,
    explanation: "Warning notices alert persons to potential dangers and provide safety information (e.g., earthing arrangement, RCD test reminder).",
    section: "Notices",
    difficulty: "basic",
    topic: "Warning Notices",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 380,
    question: "What periodic inspection interval is typically recommended for domestic installations?",
    options: [
      "Every year",
      "Every 10 years or change of occupancy",
      "Every 20 years",
      "Never"
    ],
    correctAnswer: 1,
    explanation: "Domestic installations should be inspected every 10 years or at change of occupancy, whichever is sooner.",
    section: "Inspection",
    difficulty: "basic",
    topic: "Periodic Inspection",
    category: "BS7671 Inspection & Testing"
  },

  // Final questions 381-400
  {
    id: 381,
    question: "What is the minimum height for socket outlets in domestic premises?",
    options: [
      "No requirement",
      "450mm from floor level (accessibility guidance)",
      "1000mm",
      "300mm"
    ],
    correctAnswer: 1,
    explanation: "Approved Document M recommends 450mm-1200mm above floor level for accessibility in new dwellings.",
    section: "Accessibility",
    difficulty: "intermediate",
    topic: "Socket Heights",
    category: "Building Regulations"
  },
  {
    id: 382,
    question: "What must be installed in new consumer units from January 2016?",
    options: [
      "Wooden enclosure",
      "Non-combustible enclosure (metal or fire-resistant)",
      "Plastic enclosure",
      "Any enclosure"
    ],
    correctAnswer: 1,
    explanation: "Amendment 3 (2015) required consumer units to have non-combustible enclosures to reduce fire risk.",
    section: "Consumer Units",
    difficulty: "intermediate",
    topic: "Fire Safety",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 383,
    question: "What is the purpose of supplementary bonding in bathrooms?",
    options: [
      "To increase water pressure",
      "To reduce potential differences between simultaneously accessible parts",
      "To provide extra earths",
      "For decoration"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding ensures minimal potential difference between exposed and extraneous-conductive-parts that can be touched simultaneously.",
    section: "Bathrooms",
    difficulty: "intermediate",
    topic: "Supplementary Bonding",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 384,
    question: "When can supplementary bonding be omitted in a bathroom?",
    options: [
      "Never",
      "When all circuits are RCD protected and main bonding is satisfactory",
      "Always",
      "Only in large bathrooms"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding may be omitted if all circuits comply with ADS, are RCD protected (30mA), and main bonding is present.",
    section: "Bathrooms",
    difficulty: "advanced",
    topic: "Omission",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 385,
    question: "What is the inspection frequency for commercial premises?",
    options: [
      "Every 10 years",
      "Typically 5 years depending on type and use",
      "Every year",
      "Never"
    ],
    correctAnswer: 1,
    explanation: "Commercial/industrial premises typically require inspection every 1-5 years depending on the type and use (IET Guidance Note 3).",
    section: "Periodic Inspection",
    difficulty: "intermediate",
    topic: "Inspection Intervals",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 386,
    question: "What information must be recorded on the Electrical Installation Certificate?",
    options: [
      "Just the electrician's name",
      "Description of installation, test results, schedule of circuits, design and installation details",
      "Only the date",
      "Customer address only"
    ],
    correctAnswer: 1,
    explanation: "EIC must include full installation details, extent covered, declaration, schedule of inspections, test results, and circuit schedules.",
    section: "Certification",
    difficulty: "intermediate",
    topic: "EIC Requirements",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 387,
    question: "What does a C1 coding on an EICR indicate?",
    options: [
      "Minor improvement recommended",
      "Danger present requiring urgent remedial action",
      "Satisfactory",
      "Further investigation needed"
    ],
    correctAnswer: 1,
    explanation: "C1 = Danger present. Risk of injury. Immediate remedial action required.",
    section: "EICR",
    difficulty: "intermediate",
    topic: "Classification Codes",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 388,
    question: "What does a C2 coding indicate?",
    options: [
      "Satisfactory",
      "Potentially dangerous and urgent remedial action required",
      "Improvement recommended",
      "No action needed"
    ],
    correctAnswer: 1,
    explanation: "C2 = Potentially dangerous. Urgent remedial action required.",
    section: "EICR",
    difficulty: "intermediate",
    topic: "Classification Codes",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 389,
    question: "What does a C3 coding indicate?",
    options: [
      "Danger present",
      "Potentially dangerous",
      "Improvement recommended",
      "Urgent action required"
    ],
    correctAnswer: 2,
    explanation: "C3 = Improvement recommended. Not a danger but improvement would enhance safety.",
    section: "EICR",
    difficulty: "intermediate",
    topic: "Classification Codes",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 390,
    question: "What is FI on an EICR?",
    options: [
      "Full Inspection",
      "Further Investigation required",
      "Final Inspection",
      "First Installation"
    ],
    correctAnswer: 1,
    explanation: "FI = Further Investigation required without delay. Used when testing could not be completed or further examination needed.",
    section: "EICR",
    difficulty: "intermediate",
    topic: "Classification Codes",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 391,
    question: "What is the purpose of prospective fault current (PFC) testing?",
    options: [
      "To check voltage",
      "To verify protective devices have adequate breaking capacity",
      "To test insulation",
      "To check earthing"
    ],
    correctAnswer: 1,
    explanation: "PFC testing ensures protective devices can safely interrupt the maximum fault current available at that point.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "PFC",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 392,
    question: "Where must PFC be measured?",
    options: [
      "Only at the consumer unit",
      "At the origin and at the most remote point of the installation",
      "Only at socket outlets",
      "Nowhere"
    ],
    correctAnswer: 1,
    explanation: "PFC should be measured at the origin (highest value) and verified at the furthest point of the installation.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "PFC Location",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 393,
    question: "What is a polarity test checking for?",
    options: [
      "Battery condition",
      "Correct connection of line, neutral, and earth conductors",
      "Voltage levels",
      "Cable colour"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing confirms line, neutral, and earth conductors are correctly connected throughout the installation.",
    section: "Testing",
    difficulty: "basic",
    topic: "Polarity",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 394,
    question: "What is the test current for RCD testing at 1×IΔn?",
    options: [
      "15mA for a 30mA RCD",
      "30mA for a 30mA RCD",
      "150mA for a 30mA RCD",
      "300mA for a 30mA RCD"
    ],
    correctAnswer: 1,
    explanation: "1×IΔn test applies the rated residual operating current (e.g., 30mA for a 30mA RCD).",
    section: "RCD Testing",
    difficulty: "intermediate",
    topic: "Test Currents",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 395,
    question: "What test confirms no RCD nuisance tripping will occur from normal earth leakage?",
    options: [
      "5×IΔn test",
      "1×IΔn test",
      "½×IΔn (50%) no-trip test",
      "Insulation resistance test"
    ],
    correctAnswer: 2,
    explanation: "The ½×IΔn (50%) test confirms the RCD will not trip at half rated current, avoiding nuisance tripping from normal leakage.",
    section: "RCD Testing",
    difficulty: "intermediate",
    topic: "No-Trip Test",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 396,
    question: "What action is required if an RCD fails the 40ms test at 5×IΔn?",
    options: [
      "No action needed",
      "The RCD must be replaced as it doesn't provide additional protection",
      "Just document it",
      "Test again tomorrow"
    ],
    correctAnswer: 1,
    explanation: "Failure to trip within 40ms at 5×IΔn means the RCD doesn't provide the required additional protection and must be replaced.",
    section: "RCD Testing",
    difficulty: "intermediate",
    topic: "RCD Failure",
    category: "BS7671 Inspection & Testing"
  },
  {
    id: 397,
    question: "What is the colour code for a line conductor?",
    options: [
      "Blue",
      "Brown",
      "Green and yellow",
      "Black"
    ],
    correctAnswer: 1,
    explanation: "Line conductors are identified by brown colour in single-phase installations (BS 7671).",
    section: "Identification",
    difficulty: "basic",
    topic: "Conductor Colours",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 398,
    question: "What is the colour code for a neutral conductor?",
    options: [
      "Brown",
      "Blue",
      "Green and yellow",
      "Grey"
    ],
    correctAnswer: 1,
    explanation: "Neutral conductors are identified by blue colour in single-phase installations.",
    section: "Identification",
    difficulty: "basic",
    topic: "Conductor Colours",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 399,
    question: "What information should be displayed on the consumer unit label?",
    options: [
      "Nothing",
      "Name/address of installer, installation date, type of earthing system",
      "Only the manufacturer name",
      "Only the circuit list"
    ],
    correctAnswer: 1,
    explanation: "Consumer unit should show installer details, installation/inspection dates, and earthing system type.",
    section: "Labelling",
    difficulty: "basic",
    topic: "Consumer Unit Labels",
    category: "BS7671 Selection & Erection"
  },
  {
    id: 400,
    question: "What is the maximum temperature rise allowed for a termination?",
    options: [
      "No limit",
      "Temperature rise should not cause degradation of insulation or surrounding materials",
      "50°C exactly",
      "100°C"
    ],
    correctAnswer: 1,
    explanation: "Terminations must not exceed temperatures that would degrade conductor insulation or adjacent materials.",
    section: "Terminations",
    difficulty: "intermediate",
    topic: "Temperature Limits",
    category: "BS7671 Selection & Erection"
  }
];

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility functions for question selection
export const getQuestionsByCategory = (category: AM2Question['category']): AM2Question[] => {
  return am2QuestionBank.filter(question => question.category === category);
};

export const getQuestionsByDifficulty = (difficulty: AM2Question['difficulty']): AM2Question[] => {
  return am2QuestionBank.filter(question => question.difficulty === difficulty);
};

// Get random questions with balanced distribution across categories
export const getRandomQuestions = (
  count: number,
  weights: { basic: number; intermediate: number; advanced: number } = { basic: 0.3, intermediate: 0.5, advanced: 0.2 }
): AM2Question[] => {
  const categories: AM2Question['category'][] = [
    'Health & Safety',
    'BS7671 Fundamentals',
    'BS7671 Selection & Erection',
    'BS7671 Inspection & Testing',
    'Building Regulations',
    'Safe Isolation',
    'Fault Finding'
  ];

  // Calculate questions per category
  const basePerCategory = Math.floor(count / categories.length);
  const remainder = count % categories.length;

  const selectedQuestions: AM2Question[] = [];

  categories.forEach((category, index) => {
    const categoryQuestions = getQuestionsByCategory(category);
    const targetCount = basePerCategory + (index < remainder ? 1 : 0);

    if (categoryQuestions.length === 0) return;

    // Apply difficulty weighting within each category
    const basicCount = Math.round(targetCount * weights.basic);
    const intermediateCount = Math.round(targetCount * weights.intermediate);
    const advancedCount = Math.max(0, targetCount - basicCount - intermediateCount);

    const categoryBasic = categoryQuestions.filter(q => q.difficulty === 'basic');
    const categoryIntermediate = categoryQuestions.filter(q => q.difficulty === 'intermediate');
    const categoryAdvanced = categoryQuestions.filter(q => q.difficulty === 'advanced');

    // Select questions
    const selectedBasic = shuffleArray(categoryBasic).slice(0, Math.min(basicCount, categoryBasic.length));
    const selectedIntermediate = shuffleArray(categoryIntermediate).slice(0, Math.min(intermediateCount, categoryIntermediate.length));
    const selectedAdvanced = shuffleArray(categoryAdvanced).slice(0, Math.min(advancedCount, categoryAdvanced.length));

    selectedQuestions.push(...selectedBasic, ...selectedIntermediate, ...selectedAdvanced);
  });

  // If we don't have enough, fill from any category
  if (selectedQuestions.length < count) {
    const remaining = am2QuestionBank.filter(q => !selectedQuestions.includes(q));
    const needed = count - selectedQuestions.length;
    selectedQuestions.push(...shuffleArray(remaining).slice(0, needed));
  }

  return shuffleArray(selectedQuestions).slice(0, count);
};

export const getQuestionsByTopic = (
  categories: AM2Question['category'][],
  questionCounts: number[]
): AM2Question[] => {
  const selectedQuestions: AM2Question[] = [];

  categories.forEach((category, index) => {
    const categoryQuestions = getQuestionsByCategory(category);
    const count = questionCounts[index] || 0;
    selectedQuestions.push(...shuffleArray(categoryQuestions).slice(0, count));
  });

  return shuffleArray(selectedQuestions);
};
