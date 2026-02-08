/**
 * PASMA Towers for Users Mock Exam Question Bank
 *
 * 200 questions covering all 7 categories with difficulty distribution.
 *
 * Categories (7):
 *   Legislation (34) | Tower Types (28) | Assembly (28) | Dismantling (28) | Inspection (28) | Hazards (28) | Safety (26)
 *
 * Difficulty per category: ~40% basic, ~40% intermediate, ~20% advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const pasmaCategories = [
  "Legislation",
  "Tower Types",
  "Assembly",
  "Dismantling",
  "Inspection",
  "Hazards",
  "Safety"
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const pasmaMockExamConfig: MockExamConfig = {
  examId: 'pasma-towers',
  examTitle: 'PASMA Towers for Users Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/pasma-module-7',
  categories: pasmaCategories
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomPasmaExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(pasmaQuestionBank, numQuestions, pasmaCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const pasmaQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // LEGISLATION — 34 questions (id 1–34)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 1,
    question: "Which piece of UK legislation places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of their employees?",
    options: [
      "Work at Height Regulations 2005",
      "Health and Safety at Work etc. Act 1974",
      "Construction (Design and Management) Regulations 2015",
      "Provision and Use of Work Equipment Regulations 1998"
    ],
    correctAnswer: 1,
    explanation: "Section 2 of the Health and Safety at Work etc. Act 1974 (HSWA) places this general duty on every employer.",
    section: "Module 1",
    difficulty: "basic",
    topic: "HSWA 1974",
    category: "Legislation"
  },
  {
    id: 2,
    question: "Under the HSWA 1974, which section covers the duty of employees to take reasonable care of themselves and others?",
    options: [
      "Section 2",
      "Section 3",
      "Section 7",
      "Section 8"
    ],
    correctAnswer: 2,
    explanation: "Section 7 requires employees to take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions at work.",
    section: "Module 1",
    difficulty: "basic",
    topic: "HSWA 1974",
    category: "Legislation"
  },
  {
    id: 3,
    question: "What does the abbreviation PASMA stand for?",
    options: [
      "Prefabricated Aluminium Scaffolding Manufacturers Association",
      "Prefabricated Access Suppliers and Manufacturers Association",
      "Professional Access Safety and Management Association",
      "Platform and Scaffold Manufacturers Association"
    ],
    correctAnswer: 1,
    explanation: "PASMA stands for the Prefabricated Access Suppliers and Manufacturers Association. It is the recognised trade body for the mobile access tower industry.",
    section: "Module 1",
    difficulty: "basic",
    topic: "PASMA",
    category: "Legislation"
  },
  {
    id: 4,
    question: "How long is a PASMA Towers for Users training card valid before it must be renewed?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "The PASMA card is valid for 5 years. Operatives should renew their training before it expires to remain competent.",
    section: "Module 1",
    difficulty: "basic",
    topic: "PASMA",
    category: "Legislation"
  },
  {
    id: 5,
    question: "The Work at Height Regulations 2005 apply to work at height where there is a risk of a fall likely to cause what?",
    options: [
      "Discomfort",
      "Personal injury",
      "Damage to equipment",
      "Environmental harm"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury.",
    section: "Module 1",
    difficulty: "basic",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 6,
    question: "Under the Work at Height Regulations 2005, what is the first step in the hierarchy of control?",
    options: [
      "Use collective fall prevention measures",
      "Avoid work at height where possible",
      "Provide personal fall protection",
      "Minimise the distance and consequences of a fall"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control requires duty holders to first avoid work at height where it is reasonably practicable to do so, before considering other measures.",
    section: "Module 1",
    difficulty: "basic",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 7,
    question: "What is the primary British/European standard that covers mobile access towers made of prefabricated elements?",
    options: [
      "BS EN 12811",
      "BS EN 1004-1:2020",
      "BS 5975",
      "BS EN 131"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1004-1:2020 is the standard for mobile access and working towers made of prefabricated elements. It covers design, materials, dimensions and load classes.",
    section: "Module 1",
    difficulty: "basic",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 8,
    question: "Under the HSWA 1974, Section 3 places duties on employers in respect of whom?",
    options: [
      "Employees only",
      "Directors and shareholders",
      "Persons not in their employment (e.g. members of the public)",
      "Sub-contractors only"
    ],
    correctAnswer: 2,
    explanation: "Section 3 of the HSWA 1974 requires employers to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety.",
    section: "Module 1",
    difficulty: "basic",
    topic: "HSWA 1974",
    category: "Legislation"
  },
  {
    id: 9,
    question: "Which regulation specifically deals with the planning, organisation and management of work at height?",
    options: [
      "Management of Health and Safety at Work Regulations 1999",
      "Lifting Operations and Lifting Equipment Regulations 1998",
      "Work at Height Regulations 2005",
      "Control of Substances Hazardous to Health Regulations 2002"
    ],
    correctAnswer: 2,
    explanation: "The Work at Height Regulations 2005 specifically address the planning, organisation and management of all work carried out at height.",
    section: "Module 1",
    difficulty: "basic",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 10,
    question: "Under Section 8 of the HSWA 1974, what must employees not do?",
    options: [
      "Work without supervision",
      "Intentionally or recklessly interfere with anything provided for health and safety",
      "Refuse overtime requests",
      "Report hazards to the HSE directly"
    ],
    correctAnswer: 1,
    explanation: "Section 8 makes it an offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare.",
    section: "Module 1",
    difficulty: "basic",
    topic: "HSWA 1974",
    category: "Legislation"
  },
  {
    id: 11,
    question: "What does BS 1139-6 specifically cover?",
    options: [
      "Scaffold tube couplers",
      "Metal scaffolding — prefabricated mobile access and working towers",
      "Ladders and stepladders",
      "Fall arrest harnesses"
    ],
    correctAnswer: 1,
    explanation: "BS 1139-6 covers metal scaffolding, specifically the specification for prefabricated mobile access and working towers, providing a UK national annex to EN 1004.",
    section: "Module 1",
    difficulty: "basic",
    topic: "BS 1139-6",
    category: "Legislation"
  },
  {
    id: 12,
    question: "The PASMA Code of Practice provides guidance on which of the following?",
    options: [
      "Structural calculations for bespoke scaffolding",
      "The safe use and operation of mobile access towers",
      "Ladder inspection frequencies",
      "Crane lifting operations"
    ],
    correctAnswer: 1,
    explanation: "The PASMA Code of Practice provides comprehensive guidance on the safe assembly, use, inspection and dismantling of mobile access towers.",
    section: "Module 1",
    difficulty: "basic",
    topic: "PASMA CoP",
    category: "Legislation"
  },
  {
    id: 13,
    question: "When did EN 1004:2020 officially replace the previous EN 1004:2004 standard?",
    options: [
      "January 2020",
      "March 2021",
      "November 2021",
      "January 2022"
    ],
    correctAnswer: 2,
    explanation: "EN 1004:2020 was published in 2020 but officially replaced EN 1004:2004 in November 2021 after the coexistence period ended.",
    section: "Module 1",
    difficulty: "basic",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 14,
    question: "From what date did PASMA introduce digital training cards?",
    options: [
      "1 January 2024",
      "31 March 2025",
      "1 June 2025",
      "1 January 2026"
    ],
    correctAnswer: 1,
    explanation: "PASMA introduced digital training cards from 31 March 2025, allowing operatives to carry proof of competence on their mobile devices.",
    section: "Module 1",
    difficulty: "basic",
    topic: "PASMA",
    category: "Legislation"
  },

  // --- intermediate (13) ---
  {
    id: 15,
    question: "What is the correct order of the hierarchy of control under the Work at Height Regulations 2005?",
    options: [
      "Prevent falls, avoid work at height, mitigate consequences",
      "Avoid work at height, prevent falls, mitigate consequences",
      "Mitigate consequences, prevent falls, avoid work at height",
      "Prevent falls, mitigate consequences, avoid work at height"
    ],
    correctAnswer: 1,
    explanation: "The correct hierarchy is: (1) avoid work at height, (2) prevent falls using collective or personal protection, (3) mitigate the distance and consequences of any fall.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 16,
    question: "Under the CDM Regulations 2015, how many named duty holders are there?",
    options: [
      "3",
      "4",
      "5",
      "6"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 identifies 5 duty holders: client, principal designer, principal contractor, designer and contractor. Each has specific duties relating to health and safety on construction projects.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 17,
    question: "Schedule 5 of the Work at Height Regulations 2005 requires inspection of a mobile access tower under which of the following circumstances?",
    options: [
      "Only before first use on site",
      "Before first use, after alteration, after any adverse event, and every 7 days",
      "Weekly and after any reported incident",
      "Monthly and after relocation"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 requires inspection before first use on site, after any assembly or alteration that could affect stability, after any event likely to have affected strength or stability, and at regular intervals not exceeding 7 days.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 18,
    question: "For how long must inspection records for a mobile access tower be retained under the Work at Height Regulations 2005?",
    options: [
      "1 month",
      "3 months",
      "6 months",
      "12 months"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12(8) requires that inspection reports are kept until the next inspection under the same provision, but in any case for a minimum of 3 months after the date of the inspection.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 19,
    question: "Which of the following is NOT one of the five CDM 2015 duty holders?",
    options: [
      "Client",
      "Principal designer",
      "Site supervisor",
      "Contractor"
    ],
    correctAnswer: 2,
    explanation: "The five CDM 2015 duty holders are client, principal designer, principal contractor, designer and contractor. Site supervisor is not a named duty holder under CDM.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 20,
    question: "Under the WAHR 2005, who is classed as a 'duty holder' with responsibilities for work at height?",
    options: [
      "Only the employer",
      "Only the person carrying out the work",
      "Any person who controls the work of others, including employers, the self-employed and those who control others' work",
      "Only the health and safety manager"
    ],
    correctAnswer: 2,
    explanation: "The regulations apply to every employer, self-employed person and any person who controls the work of another to the extent of their control. This broad definition ensures accountability at all levels.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 21,
    question: "What key change did EN 1004:2020 introduce regarding tower load classification compared to the 2004 standard?",
    options: [
      "It removed all load classes",
      "It introduced Load Class 1 as a new minimum",
      "It introduced new load classes and updated stability requirements",
      "It doubled all previous load limits"
    ],
    correctAnswer: 2,
    explanation: "EN 1004:2020 introduced updated load classes (including Class 1 at 75 kg/m²) and revised stability requirements, providing clearer classification than the 2004 standard.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 22,
    question: "Under the WAHR 2005, Regulation 4 requires that work at height is properly what?",
    options: [
      "Insured and documented",
      "Planned, appropriately supervised and carried out in a safe manner",
      "Approved by the HSE before commencement",
      "Carried out by certified personnel only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires that every employer shall ensure that work at height is properly planned, appropriately supervised and carried out in a manner that is, so far as is reasonably practicable, safe.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 23,
    question: "Under PUWER 1998, what must an employer ensure about work equipment provided to employees?",
    options: [
      "It is the cheapest available option",
      "It is suitable for the intended use, maintained in a safe condition and inspected",
      "It is purchased new every 12 months",
      "It carries a CE mark only"
    ],
    correctAnswer: 1,
    explanation: "PUWER 1998 requires that work equipment is suitable for its intended use, maintained in an efficient state, in efficient working order and good repair, and inspected where appropriate.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PUWER 1998",
    category: "Legislation"
  },
  {
    id: 24,
    question: "The Management of Health and Safety at Work Regulations 1999 require employers to carry out what before any work activity?",
    options: [
      "A method statement only",
      "A suitable and sufficient risk assessment",
      "An environmental impact assessment",
      "A permit to work"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 of the Management Regulations requires every employer to carry out a suitable and sufficient assessment of risks to employees and non-employees arising from the work activity.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "MHSWR 1999",
    category: "Legislation"
  },
  {
    id: 25,
    question: "Which body is responsible for enforcing the Health and Safety at Work etc. Act 1974?",
    options: [
      "Local councils only",
      "The Health and Safety Executive (HSE)",
      "PASMA",
      "The Construction Industry Training Board (CITB)"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety Executive (HSE) is the primary enforcement body for the HSWA 1974 and its associated regulations in the workplace.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "HSWA 1974",
    category: "Legislation"
  },
  {
    id: 26,
    question: "What does the PASMA Code of Practice recommend as the minimum level of training for anyone assembling, dismantling or altering a mobile access tower?",
    options: [
      "A one-hour toolbox talk",
      "Completion of a PASMA-approved training course",
      "Reading the manufacturer's instruction manual",
      "Watching an online safety video"
    ],
    correctAnswer: 1,
    explanation: "The PASMA Code of Practice recommends that anyone who assembles, dismantles or alters a mobile access tower should have completed a PASMA-approved training course appropriate to the complexity of the tower.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PASMA CoP",
    category: "Legislation"
  },
  {
    id: 27,
    question: "Under the WAHR 2005, what must be in place before any person engages in work at height?",
    options: [
      "Written approval from the HSE",
      "A rescue plan",
      "Insurance documentation",
      "A CSCS card"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(1) requires that work at height is properly planned, which includes having emergency and rescue procedures in place before the work begins.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },

  // --- advanced (7) ---
  {
    id: 28,
    question: "Under EN 1004-1:2020, what is the maximum uniformly distributed load (UDL) for a Load Class 2 tower platform?",
    options: [
      "75 kg/m²",
      "150 kg/m²",
      "200 kg/m²",
      "300 kg/m²"
    ],
    correctAnswer: 1,
    explanation: "Load Class 2 under EN 1004-1:2020 permits a maximum uniformly distributed load of 150 kg/m² on the working platform.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 29,
    question: "What is the maximum UDL for a Load Class 3 mobile access tower under EN 1004-1:2020?",
    options: [
      "100 kg/m²",
      "150 kg/m²",
      "200 kg/m²",
      "250 kg/m²"
    ],
    correctAnswer: 2,
    explanation: "Load Class 3 permits a maximum uniformly distributed load of 200 kg/m² on the working platform, making it suitable for heavier duty work such as bricklaying.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 30,
    question: "Under CDM 2015, which duty holder must ensure that a construction phase plan is drawn up before the construction phase begins?",
    options: [
      "The client",
      "The designer",
      "The principal contractor",
      "The principal designer"
    ],
    correctAnswer: 2,
    explanation: "Regulation 12(1) of CDM 2015 requires the principal contractor to draw up the construction phase plan before the construction phase begins, or where there is only one contractor, that contractor must prepare it.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 31,
    question: "Regulation 10 of the WAHR 2005 requires the inspection of work equipment used for work at height. Which schedule contains the detailed inspection requirements?",
    options: [
      "Schedule 3",
      "Schedule 4",
      "Schedule 5",
      "Schedule 7"
    ],
    correctAnswer: 2,
    explanation: "Schedule 5 of the Work at Height Regulations 2005 sets out the requirements for the inspection of work equipment, including mobile access towers, specifying when inspections must occur and what records must be kept.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 32,
    question: "If a mobile access tower is involved in an accident causing a major injury, under which legislation must the incident be reported?",
    options: [
      "WAHR 2005 only",
      "RIDDOR 2013",
      "CDM 2015 only",
      "HSWA 1974 Section 9"
    ],
    correctAnswer: 1,
    explanation: "The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) require that certain workplace injuries, diseases and dangerous occurrences are reported to the enforcing authority.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "RIDDOR 2013",
    category: "Legislation"
  },
  {
    id: 33,
    question: "Under EN 1004-1:2020, which load class has a UDL of 75 kg/m² and is intended for inspection and light-duty work only?",
    options: [
      "Load Class 1",
      "Load Class 2",
      "Load Class 3",
      "Load Class 0"
    ],
    correctAnswer: 0,
    explanation: "Load Class 1 permits 75 kg/m² and is suitable for inspection and very light work. It is the lowest rated class and not commonly specified for general construction tasks.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 34,
    question: "Under the WAHR 2005, Regulation 6 requires duty holders to give collective protection measures priority over personal protection measures. Which of the following is an example of collective protection?",
    options: [
      "A safety harness and lanyard",
      "Guardrails and toeboards on a mobile access tower",
      "A personal fall limiter attached to an anchor",
      "A self-retracting lifeline"
    ],
    correctAnswer: 1,
    explanation: "Guardrails and toeboards are collective protection measures because they protect all persons on the platform without requiring individual action. Personal fall protection (harnesses, lanyards, lifelines) requires individual use and is lower in the hierarchy.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "WAHR 2005",
    category: "Legislation"
  },

  // =======================================================================
  // TOWER TYPES — 28 questions (id 35–62)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 35,
    question: "What is the standard width of a single-width mobile access tower?",
    options: [
      "0.65m",
      "0.74m",
      "1.00m",
      "1.35m"
    ],
    correctAnswer: 1,
    explanation: "A standard single-width (narrow) mobile access tower has a platform width of 0.74m. This makes it suitable for restricted access areas.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Tower dimensions",
    category: "Tower Types"
  },
  {
    id: 36,
    question: "What is the standard width of a double-width mobile access tower?",
    options: [
      "0.74m",
      "1.00m",
      "1.35m",
      "1.80m"
    ],
    correctAnswer: 2,
    explanation: "A standard double-width mobile access tower has a platform width of 1.35m, providing a larger working area than a single-width tower.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Tower dimensions",
    category: "Tower Types"
  },
  {
    id: 37,
    question: "What is the maximum recommended height for a freestanding mobile access tower used outdoors?",
    options: [
      "4m",
      "8m",
      "12m",
      "16m"
    ],
    correctAnswer: 1,
    explanation: "The maximum recommended height for a freestanding mobile access tower used outdoors is 8m. Beyond this height, additional stabilisation measures are required.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Height limits",
    category: "Tower Types"
  },
  {
    id: 38,
    question: "What is the maximum recommended height for a freestanding mobile access tower used indoors?",
    options: [
      "8m",
      "10m",
      "12m",
      "15m"
    ],
    correctAnswer: 2,
    explanation: "The maximum recommended height for a freestanding mobile access tower used indoors is 12m, as the sheltered environment reduces wind loading.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Height limits",
    category: "Tower Types"
  },
  {
    id: 39,
    question: "Which component of a mobile access tower allows it to be moved from one location to another?",
    options: [
      "Adjustable legs",
      "Outriggers",
      "Castors",
      "Spigot pins"
    ],
    correctAnswer: 2,
    explanation: "Castors are the wheeled components fitted to the base of a mobile access tower that allow it to be rolled to different positions on site.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 40,
    question: "What is the purpose of outriggers on a mobile access tower?",
    options: [
      "To increase the working platform area",
      "To increase the effective base dimensions and improve stability",
      "To allow the tower to be towed by a vehicle",
      "To secure materials to the tower"
    ],
    correctAnswer: 1,
    explanation: "Outriggers extend the effective base dimensions of a mobile access tower, increasing its stability. They are particularly important when greater heights are required.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 41,
    question: "What are the main structural vertical members of a mobile access tower called?",
    options: [
      "Transoms",
      "Ledgers",
      "Standards (uprights)",
      "Braces"
    ],
    correctAnswer: 2,
    explanation: "The vertical members are called standards or uprights. They form the main load-bearing vertical structure of the tower.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 42,
    question: "Horizontal members that run along the length of a mobile access tower are known as what?",
    options: [
      "Transoms",
      "Ledgers (horizontals)",
      "Braces",
      "Standards"
    ],
    correctAnswer: 1,
    explanation: "Ledgers (also called horizontals) are the horizontal members that run along the length of the tower, connecting the standards on the same side.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 43,
    question: "Horizontal members that run across the width of a mobile access tower are known as what?",
    options: [
      "Transoms",
      "Ledgers",
      "Diagonal braces",
      "Sole boards"
    ],
    correctAnswer: 0,
    explanation: "Transoms are the horizontal members that run across the width of the tower, connecting the standards on opposite sides. Platforms rest on transoms.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 44,
    question: "What is the primary purpose of diagonal bracing on a mobile access tower?",
    options: [
      "To provide a climbing route",
      "To support the platform",
      "To provide rigidity and prevent racking",
      "To carry electrical cables"
    ],
    correctAnswer: 2,
    explanation: "Diagonal braces provide rigidity to the tower frame and prevent racking (sideways distortion). Without bracing, the tower would be unstable and could collapse.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 45,
    question: "What type of mobile access tower has an internal ladder built into the frame for access?",
    options: [
      "Cantilever tower",
      "Stairway tower",
      "Tower with built-in ladder frames",
      "Podium step"
    ],
    correctAnswer: 2,
    explanation: "Some mobile access towers have built-in ladder frames where the rungs are integrated into the end frames, providing internal access without the need for a separate ladder.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Tower classifications",
    category: "Tower Types"
  },

  // --- intermediate (11) ---
  {
    id: 46,
    question: "What is the maximum height-to-base ratio for a freestanding mobile access tower used indoors?",
    options: [
      "2:1",
      "3:1",
      "3.5:1",
      "4:1"
    ],
    correctAnswer: 2,
    explanation: "For indoor use, the maximum height-to-base ratio is 3.5:1. This means for every 1 metre of base width, the tower can be up to 3.5 metres high.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 47,
    question: "What is the maximum height-to-base ratio for a freestanding mobile access tower used outdoors?",
    options: [
      "2:1",
      "3:1",
      "3.5:1",
      "4:1"
    ],
    correctAnswer: 1,
    explanation: "For outdoor use, the maximum height-to-base ratio is 3:1. The reduced ratio compared to indoor use accounts for the effects of wind loading.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 48,
    question: "What is the function of adjustable legs on a mobile access tower?",
    options: [
      "To allow the tower to be raised to a greater height",
      "To compensate for uneven ground and ensure the tower is level",
      "To replace the need for castors",
      "To provide additional bracing"
    ],
    correctAnswer: 1,
    explanation: "Adjustable legs allow the base of the tower to be levelled on uneven ground. The tower must always be plumb and level before use.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 49,
    question: "What distinguishes a 'through-the-trap' (3T) platform from a standard platform?",
    options: [
      "It is made from fibreglass instead of aluminium",
      "It has a hinged trapdoor that allows internal access while maintaining full guardrail protection",
      "It is wider than a standard platform",
      "It cannot support materials, only personnel"
    ],
    correctAnswer: 1,
    explanation: "A 3T (through-the-trap) platform has a hinged trapdoor that the user climbs through from below. Once closed, the platform provides a full working area with continuous guardrail protection at all times.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Platform types",
    category: "Tower Types"
  },
  {
    id: 50,
    question: "Which type of mobile access tower is specifically designed to provide access over an obstruction such as machinery?",
    options: [
      "A stairway tower",
      "A cantilever tower",
      "A linking tower",
      "A podium step"
    ],
    correctAnswer: 1,
    explanation: "A cantilever tower has a section that extends beyond the base, allowing the working platform to reach over an obstruction. It requires additional counterweighting or stabilisation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Tower classifications",
    category: "Tower Types"
  },
  {
    id: 51,
    question: "What is the purpose of stabilisers on a mobile access tower?",
    options: [
      "To lock the castors in position",
      "To extend the effective base and prevent overturning",
      "To connect two towers together",
      "To support the internal ladder"
    ],
    correctAnswer: 1,
    explanation: "Stabilisers (also called outriggers) extend beyond the tower base to increase the effective footprint, thereby improving stability and helping to prevent overturning.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 52,
    question: "A stairway tower differs from a standard mobile access tower in that it provides access via what?",
    options: [
      "An external ladder",
      "Internal staircases at a comfortable angle",
      "A goods hoist",
      "A vertical climbing wall"
    ],
    correctAnswer: 1,
    explanation: "Stairway towers have internal staircases rather than vertical ladders, providing a safer and more comfortable means of access, particularly for frequent use or when carrying tools.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Tower classifications",
    category: "Tower Types"
  },
  {
    id: 53,
    question: "When selecting a mobile access tower for a task, which of the following is the MOST important factor to consider first?",
    options: [
      "The colour of the tower",
      "The required working height and load capacity",
      "Whether it matches other equipment on site",
      "The brand of tower preferred by the foreman"
    ],
    correctAnswer: 1,
    explanation: "The required working height and load capacity must be determined first to ensure the correct tower is selected. Overloading or using a tower at an excessive height can lead to collapse.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Selection",
    category: "Tower Types"
  },
  {
    id: 54,
    question: "What does the term 'platform height' refer to on a mobile access tower?",
    options: [
      "The total height of the tower including guardrails",
      "The height from the ground to the top of the working platform",
      "The height from the ground to the top of the guardrail",
      "The internal clearance between platforms"
    ],
    correctAnswer: 1,
    explanation: "Platform height is the vertical distance from the ground (or base of the tower) to the top surface of the working platform where the operative stands.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Tower dimensions",
    category: "Tower Types"
  },
  {
    id: 55,
    question: "What is meant by the 'working height' of a mobile access tower?",
    options: [
      "The platform height",
      "The platform height plus approximately 2 metres (the reach of a person standing on the platform)",
      "The height of the guardrails above the platform",
      "The total height of the tower structure"
    ],
    correctAnswer: 1,
    explanation: "Working height is the platform height plus approximately 2 metres to account for the standing reach of an average person. It indicates the maximum height at which work can be carried out.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Tower dimensions",
    category: "Tower Types"
  },

  // --- advanced (6) ---
  {
    id: 56,
    question: "Under EN 1004-1:2020, what concentrated point load must a platform withstand in addition to the UDL for its load class?",
    options: [
      "0.5 kN",
      "1.0 kN",
      "1.5 kN",
      "2.0 kN"
    ],
    correctAnswer: 2,
    explanation: "EN 1004-1:2020 requires platforms to withstand a concentrated (point) load of 1.5 kN in addition to the uniformly distributed load for their respective load class.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Tower Types"
  },
  {
    id: 57,
    question: "When calculating the height-to-base ratio, the 'base' measurement uses the distance between which points?",
    options: [
      "The outer edges of the castors",
      "The centres of the castor wheels (or the outermost stabiliser positions if fitted)",
      "The outer edges of the platform",
      "The inner edges of the standards"
    ],
    correctAnswer: 1,
    explanation: "The base dimension is measured between the centres of the castor wheels or, where stabilisers are fitted, the outermost stabiliser contact points with the ground.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 58,
    question: "A mobile access tower is to be used outdoors at a platform height of 6m. The base dimension along the narrow side is 0.74m. What additional measure is required?",
    options: [
      "No additional measures are needed",
      "Outriggers or stabilisers must be fitted to extend the effective base",
      "The tower must be tied to a structure",
      "A second tower must be placed alongside for support"
    ],
    correctAnswer: 1,
    explanation: "At 6m height with a 0.74m base, the ratio is 8.1:1 — far exceeding the 3:1 outdoor maximum. Outriggers or stabilisers must be fitted to increase the effective base dimension and bring the ratio within acceptable limits.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 59,
    question: "What is a 'span frame' (or 'H-frame') in mobile access tower construction?",
    options: [
      "A diagonal brace used for wind resistance",
      "A pre-welded frame unit comprising two standards joined by transoms, forming one end of the tower",
      "A horizontal platform support beam",
      "A guardrail post assembly"
    ],
    correctAnswer: 1,
    explanation: "A span frame (H-frame) is a pre-welded unit consisting of two vertical standards joined by horizontal transoms. Two span frames positioned at opposite ends form a tower bay.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 60,
    question: "Under EN 1004-1:2020, how many load classes are defined for mobile access tower platforms?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 1,
    explanation: "EN 1004-1:2020 defines three load classes: Class 1 (75 kg/m²) for inspection and light work, Class 2 (150 kg/m²) for general construction, and Class 3 (200 kg/m²) for heavy-duty work.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Tower Types"
  },
  {
    id: 61,
    question: "Which type of mobile access tower configuration allows a platform to be extended beyond the footprint of the base on one side?",
    options: [
      "A linked tower",
      "A cantilever configuration",
      "A stairway tower",
      "A podium tower"
    ],
    correctAnswer: 1,
    explanation: "A cantilever configuration extends the working platform beyond the base footprint on one side. Special manufacturer instructions and additional counterweighting are required for safe use.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Tower classifications",
    category: "Tower Types"
  },
  {
    id: 62,
    question: "For a tower conforming to EN 1004-1:2020, what is the minimum platform length that must be provided?",
    options: [
      "0.6m",
      "1.0m",
      "1.3m",
      "Determined by the manufacturer based on the tower configuration"
    ],
    correctAnswer: 3,
    explanation: "EN 1004-1:2020 does not prescribe a single minimum platform length; it is determined by the manufacturer based on the tower configuration and design. Common lengths range from 1.8m to 2.5m.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Tower Types"
  },

  // =======================================================================
  // ASSEMBLY — 28 questions (id 63–90)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 63,
    question: "Before assembling a mobile access tower, what document should you always consult?",
    options: [
      "The company health and safety policy",
      "The manufacturer's instruction manual for the specific tower model",
      "The site induction handbook",
      "The insurance certificate"
    ],
    correctAnswer: 1,
    explanation: "The manufacturer's instruction manual contains the specific assembly sequence, configurations and safety requirements for that particular tower model. It must always be consulted before assembly.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 64,
    question: "What does '3T' stand for in the context of mobile access tower assembly?",
    options: [
      "Three-tier tower",
      "Through The Trap",
      "Triple torque tightening",
      "Three-team technique"
    ],
    correctAnswer: 1,
    explanation: "3T stands for 'Through The Trap'. It is an assembly method where the operative works through a trapdoor in the platform, ensuring they are always protected by guardrails during assembly.",
    section: "Module 3",
    difficulty: "basic",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 65,
    question: "What does 'AGR' stand for in the context of mobile access tower assembly?",
    options: [
      "Automatic Guard Release",
      "Advance Guard Rail",
      "Adjustable Ground Rail",
      "Anti-Gravity Ratchet"
    ],
    correctAnswer: 1,
    explanation: "AGR stands for 'Advance Guard Rail'. It is an assembly method where a temporary guardrail system is raised ahead of the operative, providing continuous fall protection during assembly.",
    section: "Module 3",
    difficulty: "basic",
    topic: "AGR method",
    category: "Assembly"
  },
  {
    id: 66,
    question: "What is the first thing that should be checked before assembling a mobile access tower?",
    options: [
      "The weather forecast for the following week",
      "That the ground is firm, level and capable of supporting the tower",
      "That tea-making facilities are nearby",
      "That the paint on the components is not chipped"
    ],
    correctAnswer: 1,
    explanation: "A firm, level surface capable of supporting the weight of the tower and its imposed loads is essential. Soft, uneven or sloping ground can cause the tower to become unstable or collapse.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 67,
    question: "During assembly of a mobile access tower, at what point should the castors be locked?",
    options: [
      "Only when the tower is complete",
      "Before assembly begins and whenever the tower is being worked on",
      "Only when moving the tower",
      "Castors should never be locked during assembly"
    ],
    correctAnswer: 1,
    explanation: "All castors must be locked before assembly begins and remain locked throughout the assembly process. This prevents the tower from moving while components are being fitted.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 68,
    question: "What should be done with tower components before assembly to ensure they are safe to use?",
    options: [
      "They should be painted",
      "They should be visually inspected for damage, distortion and missing parts",
      "They should be weighed",
      "They should be polished"
    ],
    correctAnswer: 1,
    explanation: "All components must be visually inspected before assembly. Any damaged, distorted, corroded or incomplete components must be rejected and not used in the tower.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 69,
    question: "When assembling a mobile access tower, components from different manufacturers should be treated in what way?",
    options: [
      "Mixed freely to create the strongest tower",
      "Never mixed — only components from the same manufacturer and system should be used together",
      "Mixed as long as they are the same colour",
      "Mixed as long as they are the same material"
    ],
    correctAnswer: 1,
    explanation: "Components from different manufacturers must never be mixed. They may appear similar but have different tolerances, locking mechanisms and structural properties. Mixing can lead to assembly failure or collapse.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 70,
    question: "What is the purpose of a base plate on a mobile access tower?",
    options: [
      "To display the manufacturer's name",
      "To spread the load of the tower over a larger area of ground",
      "To attach guardrails",
      "To store tools"
    ],
    correctAnswer: 1,
    explanation: "Base plates (or sole boards) spread the point load of the tower legs over a larger area of ground, reducing the pressure on the surface and helping to prevent the tower from sinking.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 71,
    question: "How should an operative climb the internal ladder of a mobile access tower during assembly?",
    options: [
      "Carrying all tools in both hands for efficiency",
      "Maintaining three points of contact at all times",
      "Climbing on the outside of the tower",
      "Using only their legs whilst holding components overhead"
    ],
    correctAnswer: 1,
    explanation: "The three-point contact rule requires maintaining two hands and one foot, or two feet and one hand, in contact with the ladder at all times. This minimises the risk of falling during climbing.",
    section: "Module 3",
    difficulty: "basic",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 72,
    question: "At which level should the first platform be installed during tower assembly?",
    options: [
      "At the very top of the tower",
      "At the lowest recommended level as specified by the manufacturer",
      "At the mid-point of the tower",
      "Platforms are only fitted at the end of the full assembly"
    ],
    correctAnswer: 1,
    explanation: "The first platform should be installed at the lowest level specified by the manufacturer. This provides a stable working area for assembling the next section of the tower.",
    section: "Module 3",
    difficulty: "basic",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 73,
    question: "What must be fitted at every working platform level of a mobile access tower?",
    options: [
      "A fire extinguisher",
      "Guardrails, mid-rails and toeboards",
      "A tool storage box",
      "A safety net"
    ],
    correctAnswer: 1,
    explanation: "Every working platform must be fitted with guardrails, mid-rails and toeboards to prevent falls of persons and materials from the platform edge.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Stability",
    category: "Assembly"
  },

  // --- intermediate (11) ---
  {
    id: 74,
    question: "When using the 3T (Through The Trap) assembly method, at what point is the operative protected by guardrails?",
    options: [
      "Only when standing on the top platform",
      "At all times during the assembly process, because guardrails are fitted from the level below before the operative advances",
      "Only after the entire tower is fully assembled",
      "Only when a second operative holds the guardrail in place"
    ],
    correctAnswer: 1,
    explanation: "The 3T method ensures the operative is always within the protection of guardrails. Guardrails for the next level are fitted while standing on the platform below, before the operative climbs through the trapdoor to the next level.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 75,
    question: "How does the AGR (Advance Guard Rail) method differ from the 3T method?",
    options: [
      "AGR uses no guardrails at all",
      "AGR uses a temporary guardrail system that is raised to the next level before the operative climbs up, eliminating the need for a trapdoor",
      "AGR requires a crane to lift components",
      "AGR can only be used indoors"
    ],
    correctAnswer: 1,
    explanation: "The AGR method uses a temporary advance guardrail system that is raised and locked into position at the next level from the platform below. The operative then climbs up into a fully guarded area without needing a trapdoor.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "AGR method",
    category: "Assembly"
  },
  {
    id: 76,
    question: "What is the required minimum height of a guardrail above the working platform on a mobile access tower?",
    options: [
      "750mm",
      "900mm",
      "950mm",
      "1100mm"
    ],
    correctAnswer: 2,
    explanation: "The guardrail must be at a minimum height of 950mm above the working platform surface to provide adequate fall protection for operatives.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Assembly"
  },
  {
    id: 77,
    question: "At what height should the mid-rail be fitted on a mobile access tower?",
    options: [
      "250mm above the platform",
      "470mm above the platform (approximately halfway between platform and guardrail)",
      "600mm above the platform",
      "At any convenient height"
    ],
    correctAnswer: 1,
    explanation: "The mid-rail should be fitted at approximately 470mm above the working platform, which is roughly halfway between the platform surface and the top guardrail.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Assembly"
  },
  {
    id: 78,
    question: "What is the minimum height of a toeboard on a mobile access tower working platform?",
    options: [
      "50mm",
      "100mm",
      "150mm",
      "200mm"
    ],
    correctAnswer: 2,
    explanation: "Toeboards must be a minimum of 150mm high. They prevent tools, materials and debris from sliding off the platform edge and falling onto persons below.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Assembly"
  },
  {
    id: 79,
    question: "When assembling a tower on ground that slopes slightly, what should be used to level the tower?",
    options: [
      "Bricks or blocks of wood under the castors",
      "The adjustable legs built into the tower base",
      "Packing the low side with loose materials",
      "Leaning the tower against a wall"
    ],
    correctAnswer: 1,
    explanation: "Only the adjustable legs (screw jacks) should be used to level the tower. Improvised packing such as bricks, blocks or loose materials is dangerous and must never be used.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 80,
    question: "What should be done immediately after completing the assembly of a mobile access tower?",
    options: [
      "Begin work immediately to save time",
      "Carry out a full pre-use inspection to confirm the tower is safe",
      "Take a photograph for the company records",
      "Remove the diagonal bracing to create more working space"
    ],
    correctAnswer: 1,
    explanation: "A full pre-use inspection must be carried out immediately after assembly and before anyone begins work from the tower. This confirms all components are correctly fitted and the tower is safe to use.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 81,
    question: "Why must the trapdoor be closed after climbing through it during 3T assembly?",
    options: [
      "To keep rain out",
      "To provide a full working platform area and prevent falls through the opening",
      "To reduce noise",
      "To make the tower look tidy"
    ],
    correctAnswer: 1,
    explanation: "Closing the trapdoor after climbing through creates a full, uninterrupted platform surface and eliminates the fall-through hazard of the open trap. It is a critical safety step in the 3T method.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 82,
    question: "During tower assembly, what is the maximum number of people that should be on the tower at any one time unless the manufacturer specifies otherwise?",
    options: [
      "One",
      "Two",
      "Three",
      "As stated in the manufacturer's instructions for that specific tower and configuration"
    ],
    correctAnswer: 3,
    explanation: "The number of operatives permitted on a tower during assembly depends on the manufacturer's instructions for that specific tower model and configuration. This ensures the load capacity is not exceeded.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 83,
    question: "When assembling a tower near overhead electrical cables, what is the recommended minimum safe distance from the cables?",
    options: [
      "1 metre horizontally",
      "At least the distances specified in the HSE guidance (e.g. 15m for 400kV lines)",
      "No specific distance is required if the tower is earthed",
      "Close enough to see the cables clearly"
    ],
    correctAnswer: 1,
    explanation: "Safe distances from overhead power lines are specified in HSE guidance document GS6 and depend on voltage. For example, 132kV requires 6m and 400kV requires 15m. Assembly near power lines requires careful planning and may need the supply isolated.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Pre-assembly",
    category: "Assembly"
  },
  {
    id: 84,
    question: "Diagonal braces must be fitted in which pattern during assembly?",
    options: [
      "Only on one side of the tower",
      "As specified by the manufacturer, typically alternating on each bay level",
      "Only at the base and top of the tower",
      "Randomly across any available positions"
    ],
    correctAnswer: 1,
    explanation: "Diagonal braces must be fitted exactly as specified in the manufacturer's instruction manual. The pattern and placement are designed to provide the correct structural rigidity for that specific tower configuration.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Assembly"
  },

  // --- advanced (6) ---
  {
    id: 85,
    question: "When using the 3T method, what is the correct sequence for advancing to the next platform level?",
    options: [
      "Climb up, then fit guardrails, then fit platform",
      "Fit platform at next level, climb up, fit guardrails",
      "From the level below, fit the frame and braces for the next level, fit guardrails for the next level, then climb through the trap to the guarded platform",
      "Remove the guardrails at current level, climb up, refit guardrails at new level"
    ],
    correctAnswer: 2,
    explanation: "In the 3T method, the operative works from the level below to fit the next frame section, braces and guardrails. Only after the next level is fully guarded does the operative climb through the trapdoor to the new platform.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 86,
    question: "A mobile access tower is being assembled outdoors with a required platform height of 9m. The base dimension is 1.35m (double-width). What is required to comply with the 3:1 outdoor ratio?",
    options: [
      "Nothing — the tower is within the 3:1 ratio",
      "Outriggers extending the effective base to at least 3m",
      "Ballast weights on the platform",
      "Tying the tower to the building at mid-height only"
    ],
    correctAnswer: 1,
    explanation: "At 9m height with 1.35m base, the ratio is 6.67:1, exceeding the 3:1 outdoor limit. The effective base must be extended to at least 3m (9m ÷ 3 = 3m) using outriggers or stabilisers.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Stability",
    category: "Assembly"
  },
  {
    id: 87,
    question: "During AGR assembly, what happens if the advance guardrail mechanism fails to lock into the correct position?",
    options: [
      "The operative should proceed anyway and report it later",
      "The operative must stop work, descend the tower and report the defect — the mechanism must be repaired or replaced before assembly continues",
      "A second operative should hold the guardrail manually",
      "Duct tape can be used as a temporary fix"
    ],
    correctAnswer: 1,
    explanation: "If the AGR mechanism fails to lock, work must stop immediately. The operative must descend to a safe level and report the defect. Assembly must not continue until the mechanism is properly repaired or replaced.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "AGR method",
    category: "Assembly"
  },
  {
    id: 88,
    question: "What is the significance of the 'safe zone' concept during 3T tower assembly?",
    options: [
      "It refers to the distance from the nearest fire exit",
      "It is the area within the guardrail protection where the operative is safeguarded against falls at all times during assembly",
      "It is the ground exclusion zone around the base",
      "It refers to the storage area for spare components"
    ],
    correctAnswer: 1,
    explanation: "The 'safe zone' is the working area within the guardrail protection. The 3T method ensures that the operative is always within this protected zone — they never work at height without guardrail protection around them.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 89,
    question: "When assembling a tower with both outriggers and castors, in what order should the components be set up at the base?",
    options: [
      "Fit outriggers first, then castors",
      "Fit castors to the base frame, lock them, ensure the base is level, then fit outriggers before building the tower higher than the manufacturer's specified freestanding limit",
      "Fit outriggers and castors simultaneously",
      "Castors and outriggers are never used together"
    ],
    correctAnswer: 1,
    explanation: "Castors are fitted first and locked. The base is levelled using adjustable legs. Outriggers are then fitted before the tower exceeds the freestanding height limit for that base dimension, in accordance with the manufacturer's instructions.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Stability",
    category: "Assembly"
  },
  {
    id: 90,
    question: "A tower assembly is being carried out when the wind speed increases to Beaufort Force 5. What action should be taken?",
    options: [
      "Continue assembly as normal",
      "Assembly should have already ceased at Beaufort Force 4 — secure what has been built and evacuate the tower",
      "Speed up the assembly to finish quickly",
      "Only the top section needs to be left until the wind drops"
    ],
    correctAnswer: 1,
    explanation: "Work on mobile access towers, including assembly, should cease when wind reaches Beaufort Force 4 (approximately 17 mph). At Force 5, work should already have stopped. The partially built tower should be secured and the area made safe.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Pre-assembly",
    category: "Assembly"
  },

  // =======================================================================
  // DISMANTLING — 28 questions (id 91–118)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 91,
    question: "In what order should a mobile access tower be dismantled?",
    options: [
      "From the bottom up",
      "From the top down — the reverse of the assembly sequence",
      "Starting from the middle",
      "Any order is acceptable"
    ],
    correctAnswer: 1,
    explanation: "A mobile access tower must always be dismantled from the top down, following the reverse of the assembly sequence specified by the manufacturer.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 92,
    question: "Before dismantling a mobile access tower, what must be done with all tools and materials on the platform?",
    options: [
      "Thrown down to the ground",
      "Removed safely from the platform and lowered to the ground",
      "Left on the platform for the next user",
      "Pushed to one side of the platform"
    ],
    correctAnswer: 1,
    explanation: "All tools, materials and equipment must be safely removed from the platform and lowered to the ground before dismantling begins. This reduces the risk of falling objects and lightens the tower.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 93,
    question: "Should anyone remain on the tower while it is being moved to a new location?",
    options: [
      "Yes, one person should stay on top to guide the move",
      "No — nobody should ever be on the tower while it is being moved",
      "Yes, as long as they hold on tightly",
      "Only if the distance is less than 5 metres"
    ],
    correctAnswer: 1,
    explanation: "Nobody should ever remain on a mobile access tower while it is being moved. The movement can cause the tower to become unstable, and there is a serious risk of the person falling or the tower overturning.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 94,
    question: "After a mobile access tower has been dismantled, what should be done with the components?",
    options: [
      "Left where they fall",
      "Inspected for damage, cleaned if necessary and stored safely",
      "Disposed of in a skip",
      "Immediately reassembled at the next location"
    ],
    correctAnswer: 1,
    explanation: "After dismantling, components should be inspected for any damage that may have occurred during use. They should be cleaned if necessary and stored safely to prevent damage and ensure they are ready for future use.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Storage",
    category: "Dismantling"
  },
  {
    id: 95,
    question: "What is the maximum recommended tower height for moving a mobile access tower?",
    options: [
      "2m",
      "4m",
      "8m",
      "There is no limit"
    ],
    correctAnswer: 1,
    explanation: "General guidance recommends that mobile access towers should not be moved when the platform height exceeds 4m. Above this height, the tower should be partially dismantled before moving.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 96,
    question: "Before moving a mobile access tower, what must be checked on the intended route?",
    options: [
      "That the route passes through a tea room",
      "That the route is free from obstructions, holes, slopes and overhead hazards",
      "That the route is painted with guide lines",
      "Nothing — simply push the tower to the new location"
    ],
    correctAnswer: 1,
    explanation: "The intended route must be inspected for obstructions, potholes, uneven surfaces, slopes and overhead hazards (particularly power lines) before moving the tower.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 97,
    question: "When dismantling a tower using the 3T method, where should the operative be standing?",
    options: [
      "On the ground, pulling components down with a rope",
      "On a fully guarded platform, working through the trapdoor above",
      "On an adjacent scaffold",
      "On a ladder leaning against the tower"
    ],
    correctAnswer: 1,
    explanation: "During 3T dismantling, the operative stands on a fully guarded platform and removes components from the level above by working through the open trapdoor, maintaining guardrail protection at all times.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 98,
    question: "What should be done with outriggers when preparing to move a tower?",
    options: [
      "Left extended to provide extra stability during the move",
      "Retracted or removed before the tower is moved",
      "Used as handles to push the tower",
      "Extended further to act as bumpers"
    ],
    correctAnswer: 1,
    explanation: "Outriggers must be retracted or removed before moving the tower. Extended outriggers can catch on obstructions and cause the tower to overturn during movement.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 99,
    question: "How should tower components be passed down during dismantling?",
    options: [
      "Dropped from the platform to the ground",
      "Passed hand-to-hand or lowered carefully using a suitable method",
      "Slid down the outside of the tower",
      "Thrown outwards away from the tower"
    ],
    correctAnswer: 1,
    explanation: "Components must be passed hand-to-hand between operatives or lowered carefully to the ground. Dropping or throwing components creates a serious falling-object hazard for anyone below.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 100,
    question: "Before moving a mobile access tower, what must be done with the castor brakes?",
    options: [
      "All brakes must be applied",
      "All brakes must be released",
      "Only the front brakes should be released",
      "Brakes are not relevant when moving"
    ],
    correctAnswer: 1,
    explanation: "All castor brakes must be released before moving the tower. Attempting to move a tower with brakes engaged can damage the castors and cause the tower to tip over.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 101,
    question: "After moving a mobile access tower to a new location, what is the first thing that must be done?",
    options: [
      "Begin work immediately",
      "Lock all castors and ensure the tower is level and stable before use",
      "Add extra bracing to compensate for the move",
      "Notify the HSE"
    ],
    correctAnswer: 1,
    explanation: "After moving, all castors must be locked and the tower checked for level and stability. If the ground conditions differ from the previous location, adjustable legs may need to be reset.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Moving",
    category: "Dismantling"
  },

  // --- intermediate (11) ---
  {
    id: 102,
    question: "When dismantling a tower, why must guardrails be the last components removed from each level?",
    options: [
      "Because they are the lightest components",
      "Because they provide fall protection for the operative until the last possible moment",
      "Because they are bolted on most tightly",
      "Because they are colour-coded for identification"
    ],
    correctAnswer: 1,
    explanation: "Guardrails provide fall protection and must remain in place until the operative has descended to the level below. Removing them too early exposes the operative to an unprotected fall hazard.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 103,
    question: "When moving a mobile access tower, from which position should the tower be pushed?",
    options: [
      "From the top, by a person on the platform",
      "From the base, pushing at or near the bottom of the tower",
      "From the middle, at about waist height",
      "By pulling from the front with a rope"
    ],
    correctAnswer: 1,
    explanation: "The tower must be pushed from the base to keep the centre of gravity low and reduce the risk of overturning. Pushing from high up creates a tipping moment that can cause the tower to fall over.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 104,
    question: "If a tower component is found to be damaged during dismantling, what should happen to it?",
    options: [
      "It should be straightened and reused",
      "It should be clearly marked as defective, removed from service and reported",
      "It should be hidden to avoid blame",
      "It can be used at a lower level where loads are lighter"
    ],
    correctAnswer: 1,
    explanation: "Damaged components must be clearly marked or tagged as defective, quarantined from serviceable stock, and reported to the supervisor. They must not be reused until properly assessed and repaired by a competent person.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Post-use inspection",
    category: "Dismantling"
  },
  {
    id: 105,
    question: "Why should a mobile access tower never be moved by towing it with a vehicle?",
    options: [
      "It voids the insurance",
      "The sudden forces can cause the tower to collapse or overturn, and the speed cannot be safely controlled",
      "It damages the road surface",
      "It is only prohibited on public highways"
    ],
    correctAnswer: 1,
    explanation: "Towing a tower with a vehicle creates uncontrolled forces, particularly during acceleration, braking and turning. These forces can cause the tower to collapse or overturn, putting anyone nearby at serious risk.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 106,
    question: "When partially dismantling a tower to reduce its height for moving, to what height should it be reduced?",
    options: [
      "To the platform height specified by the manufacturer for safe moving, generally no more than 4m",
      "To exactly half its original height",
      "To 2m in all cases",
      "Partial dismantling is never necessary"
    ],
    correctAnswer: 0,
    explanation: "The tower should be reduced to a height that complies with the manufacturer's instructions for safe moving, generally no more than 4m platform height. This reduces the overturning risk during movement.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 107,
    question: "How should tower components be stored to prevent damage and deterioration?",
    options: [
      "Stacked loosely in an open field",
      "In a dry, secure area, on level ground or racking, protected from weather and impact damage",
      "Buried underground for security",
      "In a heated room above 40°C to prevent rust"
    ],
    correctAnswer: 1,
    explanation: "Tower components should be stored in a dry, secure location on level ground or proper racking. They must be protected from weather, impact damage and unauthorised access to maintain their integrity for future use.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Storage",
    category: "Dismantling"
  },
  {
    id: 108,
    question: "During dismantling, what should be done if the wind speed increases to Beaufort Force 4?",
    options: [
      "Continue dismantling but work faster",
      "Cease dismantling, secure the partially dismantled tower and descend safely",
      "Only dismantle the windward side",
      "Wait five minutes to see if it drops"
    ],
    correctAnswer: 1,
    explanation: "Work on the tower must cease at Beaufort Force 4 (approximately 17 mph). The operative should secure the partially dismantled tower as far as possible, descend safely and wait for conditions to improve.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 109,
    question: "When preparing to move a tower, what should be done about any ties or braces connecting the tower to a structure?",
    options: [
      "They should be left in place for added stability during the move",
      "They must be removed before the tower is moved",
      "They should be loosened but not fully removed",
      "Ties are never used on mobile access towers"
    ],
    correctAnswer: 1,
    explanation: "Any ties or fixings connecting the tower to a structure must be fully removed before moving. Attempting to move a tied tower can damage the tower, the structure, or cause the tower to overturn.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 110,
    question: "Who should carry out the dismantling of a mobile access tower?",
    options: [
      "Anyone available on site",
      "Only persons who have received appropriate PASMA-approved training",
      "Only the person who originally assembled it",
      "The site security team"
    ],
    correctAnswer: 1,
    explanation: "Only persons who have completed appropriate PASMA-approved training should dismantle a mobile access tower. Incorrect dismantling can lead to collapse and serious injury.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 111,
    question: "When moving a tower across uneven ground, what additional precaution must be taken?",
    options: [
      "Move the tower at higher speed to maintain momentum",
      "Guide the castors carefully, watching for changes in level, and stop if the tower begins to lean",
      "Lean into the tower to counterbalance any tipping",
      "Only move it diagonally"
    ],
    correctAnswer: 1,
    explanation: "On uneven ground, the castors must be guided carefully with lookouts watching for potholes, kerbs and level changes. If the tower begins to lean, movement must stop immediately and the tower stabilised.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Moving",
    category: "Dismantling"
  },

  // --- advanced (6) ---
  {
    id: 112,
    question: "A tower has been assembled using the AGR method and now needs dismantling. What is the critical difference in the dismantling sequence compared to 3T dismantling?",
    options: [
      "There is no difference",
      "The advance guardrail system must be lowered in the correct sequence before each frame section is removed, following the manufacturer's specific AGR dismantling procedure",
      "AGR towers cannot be dismantled and must be left in place",
      "All AGR guardrails are removed first, then the frames"
    ],
    correctAnswer: 1,
    explanation: "AGR dismantling requires the advance guardrail mechanism to be lowered in the correct sequence as specified by the manufacturer. Each level's AGR system must be retracted before the frame section is removed, maintaining protection for the operative throughout.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 113,
    question: "A mobile access tower needs to be moved 50 metres across a site. The ground is firm but slopes downhill. What specific risk must be managed?",
    options: [
      "The tower may rust from contact with the soil",
      "The tower may accelerate uncontrollably on the downhill slope, making it difficult to stop and increasing the overturning risk",
      "The castors will lock automatically on a slope",
      "The platforms will slide out during the move"
    ],
    correctAnswer: 1,
    explanation: "On a downhill slope, gravity will accelerate the tower, making it increasingly difficult to control. This increases both the risk of the tower running away and the risk of overturning when trying to stop it. Additional personnel, a planned route and controlled speed are essential.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Moving",
    category: "Dismantling"
  },
  {
    id: 114,
    question: "Following a collision between a forklift and a mobile access tower, what must happen before the tower is used again?",
    options: [
      "The tower can be used immediately if it looks undamaged",
      "A competent person must carry out a thorough inspection, all suspect components must be withdrawn, and the tower must be fully re-inspected before reuse",
      "The forklift driver must sign a form",
      "The tower must be repainted"
    ],
    correctAnswer: 1,
    explanation: "An impact event such as a vehicle collision could cause hidden damage to joints, welds and locking mechanisms. A competent person must thoroughly inspect the tower, withdraw any suspect components, and confirm the tower is safe before it is returned to service.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Post-use inspection",
    category: "Dismantling"
  },
  {
    id: 115,
    question: "What is the recommended procedure if a tower must be left partially dismantled overnight?",
    options: [
      "Leave it as it is with warning signs",
      "Secure the partially dismantled tower to prevent collapse, barricade the area, display warning signs and remove access to prevent unauthorised climbing",
      "Assign a security guard to watch it",
      "Complete the dismantling regardless of the time"
    ],
    correctAnswer: 1,
    explanation: "A partially dismantled tower must be secured against collapse, the area barricaded to prevent access by unauthorised persons, and clear warning signs displayed. Access points such as ladders should be removed or blocked.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 116,
    question: "When storing aluminium tower components, what specific corrosion risk should be considered?",
    options: [
      "Aluminium does not corrode",
      "Contact with dissimilar metals (e.g. steel) in damp conditions can cause galvanic corrosion",
      "Aluminium dissolves in fresh water",
      "UV light from sunlight corrodes aluminium"
    ],
    correctAnswer: 1,
    explanation: "When aluminium is in direct contact with dissimilar metals such as steel, and moisture is present, galvanic (bimetallic) corrosion can occur. Components should be stored to avoid prolonged contact between different metals in damp conditions.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Storage",
    category: "Dismantling"
  },
  {
    id: 117,
    question: "A tower is being dismantled in a confined area where components cannot be lowered to the ground easily. What is the safest approach?",
    options: [
      "Throw the components over the hoarding",
      "Use a controlled lowering system such as a rope and gin wheel, or pass components through an access opening to a ground-level operative",
      "Stack all components on the platform until the end",
      "Disassemble the tower from the outside"
    ],
    correctAnswer: 1,
    explanation: "In confined areas, a controlled lowering method such as a rope and pulley (gin wheel) should be used, or components should be passed to an operative at ground level through an access point. This prevents falling-object hazards.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Dismantling procedure",
    category: "Dismantling"
  },
  {
    id: 118,
    question: "After dismantling a tower that has been in long-term use, what additional checks should be carried out on the castor wheels?",
    options: [
      "Only check that they roll",
      "Check for flat spots, bearing wear, brake mechanism function, axle condition and tyre/wheel integrity",
      "Replace them all automatically",
      "No checks are needed as castors are maintenance-free"
    ],
    correctAnswer: 1,
    explanation: "Long-term use can cause flat spots on wheels, bearing wear, brake mechanism deterioration and axle corrosion. All these aspects should be checked to ensure the castors are safe for future use.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Post-use inspection",
    category: "Dismantling"
  },

  // =======================================================================
  // INSPECTION — 28 questions (id 119–146)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 119,
    question: "Who should carry out a pre-use inspection of a mobile access tower?",
    options: [
      "Only the site manager",
      "A competent person, such as the trained operative who will use the tower",
      "An HSE inspector",
      "The tower manufacturer"
    ],
    correctAnswer: 1,
    explanation: "A competent person should carry out the pre-use inspection. This is typically the trained operative who will use the tower, as they have the knowledge to identify faults and unsafe conditions.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 120,
    question: "How often must a formal inspection of a mobile access tower be carried out, as a minimum, under the WAHR 2005?",
    options: [
      "Every day",
      "Every 7 days",
      "Every 14 days",
      "Every 30 days"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 of the WAHR 2005 requires that mobile access towers are formally inspected at intervals not exceeding 7 days while they remain erected on site.",
    section: "Module 5",
    difficulty: "basic",
    topic: "7-day inspections",
    category: "Inspection"
  },
  {
    id: 121,
    question: "A pre-use inspection of a mobile access tower should check that all castors are in what condition?",
    options: [
      "Clean and polished",
      "Locked and in good working order",
      "Spinning freely at all times",
      "Removed and stored separately"
    ],
    correctAnswer: 1,
    explanation: "Castors must be locked (brakes applied) and in good working order with no damage to wheels, bearings or brake mechanisms. Unlocked or damaged castors can cause the tower to move unexpectedly.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 122,
    question: "What should you check regarding the platforms during a pre-use inspection?",
    options: [
      "That they are the right colour",
      "That they are properly located, secured, free from damage and that trapdoors function correctly",
      "That they have been recently painted",
      "That they have a non-slip surface applied within the last month"
    ],
    correctAnswer: 1,
    explanation: "Platforms must be checked for correct positioning, proper securing, freedom from damage or excessive wear, and that trapdoors open and close freely without obstruction.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 123,
    question: "What is a key visual check to perform on all bracing during a tower inspection?",
    options: [
      "Check that braces are the same colour as the frames",
      "Check that all braces are fitted, correctly positioned and locked in place with no visible damage",
      "Check that braces can be removed easily",
      "Check that braces rattle when shaken"
    ],
    correctAnswer: 1,
    explanation: "All diagonal and horizontal braces must be fitted in the correct positions as specified by the manufacturer, fully locked into their connectors and free from visible damage such as bending or cracking.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 124,
    question: "During a pre-use inspection, what should you check about the guardrails?",
    options: [
      "That they are at a comfortable leaning height",
      "That they are fitted at the correct height (950mm minimum), secured and undamaged",
      "That they match the platform colour",
      "That they can be easily removed by hand"
    ],
    correctAnswer: 1,
    explanation: "Guardrails must be at a minimum height of 950mm, properly secured into their sockets, and free from damage or distortion that could reduce their effectiveness as fall protection.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 125,
    question: "What is TowerSure?",
    options: [
      "A brand of mobile access tower",
      "PASMA's recommended inspection recording system for mobile access towers",
      "A type of insurance policy",
      "A tower component testing laboratory"
    ],
    correctAnswer: 1,
    explanation: "TowerSure is PASMA's recommended inspection recording scheme. It provides a structured approach to recording tower inspections, helping to demonstrate compliance with the WAHR 2005.",
    section: "Module 5",
    difficulty: "basic",
    topic: "TowerSure",
    category: "Inspection"
  },
  {
    id: 126,
    question: "After an event such as high winds or an impact, what must be done before the tower is used again?",
    options: [
      "Nothing, unless the tower has visibly collapsed",
      "A thorough inspection must be carried out by a competent person",
      "The tower must be repainted",
      "The castors must be replaced"
    ],
    correctAnswer: 1,
    explanation: "After any event that could have affected the tower's strength or stability (high winds, impact, heavy rain), a thorough inspection by a competent person is required before the tower can be used again.",
    section: "Module 5",
    difficulty: "basic",
    topic: "7-day inspections",
    category: "Inspection"
  },
  {
    id: 127,
    question: "During a pre-use check, what should you look for on the vertical standards (uprights)?",
    options: [
      "Decorative markings",
      "Bending, denting, cracking, corrosion or missing spigot pins",
      "That they are taller than the operative",
      "That they are painted in the company colours"
    ],
    correctAnswer: 1,
    explanation: "Standards must be checked for bending, denting, cracking, corrosion or any other damage. Spigot pins and locking clips must be present and fully engaged. Damaged standards can compromise the structural integrity of the tower.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 128,
    question: "What must be checked about the tower's overall verticality (plumb) during an inspection?",
    options: [
      "That it leans slightly towards the building for support",
      "That the tower is vertical (plumb) and not leaning to any side",
      "That it sways gently in the wind",
      "Verticality is not important for mobile towers"
    ],
    correctAnswer: 1,
    explanation: "The tower must be checked to ensure it is truly vertical (plumb) and not leaning. A leaning tower has its centre of gravity shifted, reducing its stability and increasing the risk of overturning.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 129,
    question: "When should a pre-use inspection of a mobile access tower be carried out?",
    options: [
      "Once a month",
      "Before every use, at the start of each working period",
      "Only when requested by the client",
      "Only on Mondays"
    ],
    correctAnswer: 1,
    explanation: "A pre-use inspection should be carried out before every use and at the start of each working period (e.g. each shift). This ensures any changes or deterioration since the last use are identified.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },

  // --- intermediate (11) ---
  {
    id: 130,
    question: "What information should be recorded during a formal 7-day inspection of a mobile access tower?",
    options: [
      "Only the name of the inspector",
      "The tower location, date, inspector details, findings, any defects and actions taken",
      "Only the date of the inspection",
      "No written record is required"
    ],
    correctAnswer: 1,
    explanation: "A formal inspection record should include the tower's location and identification, date and time of inspection, name and signature of the competent inspector, details of findings including defects, and any corrective actions taken.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Records",
    category: "Inspection"
  },
  {
    id: 131,
    question: "For how long must formal inspection records be retained under the WAHR 2005?",
    options: [
      "1 month",
      "Until the next inspection or 3 months, whichever is greater",
      "6 months",
      "Indefinitely"
    ],
    correctAnswer: 1,
    explanation: "Inspection records must be kept until the next inspection under the same provision, but in any case for a minimum of 3 months from the date of the inspection.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Records",
    category: "Inspection"
  },
  {
    id: 132,
    question: "Under what four circumstances does Schedule 5 of the WAHR 2005 require a mobile access tower to be inspected?",
    options: [
      "Before first use, after cleaning, every 14 days, and after complaints",
      "Before first use on site, after assembly/alteration, after any event affecting stability, and every 7 days",
      "Before first use, monthly, after storms, and before dismantling",
      "After purchase, after delivery, before assembly, and after use"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 specifies four inspection triggers: (1) before first use on site, (2) after any assembly, alteration or dismantling, (3) after any event likely to have affected strength or stability, and (4) at intervals not exceeding 7 days.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "7-day inspections",
    category: "Inspection"
  },
  {
    id: 133,
    question: "What is the difference between a pre-use check and a formal inspection under the WAHR 2005?",
    options: [
      "There is no difference",
      "A pre-use check is a quick visual assessment before each use; a formal inspection is a detailed, documented inspection by a competent person at specified intervals",
      "A formal inspection is quicker than a pre-use check",
      "Pre-use checks are only required for towers over 8m"
    ],
    correctAnswer: 1,
    explanation: "A pre-use check is a quick visual assessment carried out before each use to spot obvious defects. A formal inspection is a more thorough, documented examination carried out by a competent person at the intervals specified in Schedule 5.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 134,
    question: "If a defect is found during a pre-use inspection, what should happen?",
    options: [
      "Make a note and continue working",
      "The tower must not be used until the defect is rectified by a competent person",
      "Report it at the end of the week",
      "Cover the defect with tape and continue"
    ],
    correctAnswer: 1,
    explanation: "If any defect is found that could compromise safety, the tower must be taken out of use immediately and not used until the defect has been rectified by a competent person and the tower re-inspected.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 135,
    question: "When using TowerSure to record an inspection, what should happen to the completed inspection tag?",
    options: [
      "It should be hidden inside the tower",
      "It should be displayed prominently on the tower so users can see the current inspection status",
      "It should be filed in the office only",
      "It should be given to the client"
    ],
    correctAnswer: 1,
    explanation: "The completed TowerSure tag should be displayed prominently on the tower, typically at the base. This allows anyone approaching the tower to see the current inspection status, date and any conditions of use.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "TowerSure",
    category: "Inspection"
  },
  {
    id: 136,
    question: "What should be specifically checked on locking mechanisms (clips, pins, gravity locks) during an inspection?",
    options: [
      "That they are the correct colour",
      "That they engage fully, hold securely under load and are not worn, bent or missing",
      "That they can be removed without tools",
      "That they make a clicking sound"
    ],
    correctAnswer: 1,
    explanation: "Locking mechanisms must be checked to ensure they engage fully and hold securely. Worn, bent or missing locks can cause components to detach during use, leading to structural failure.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 137,
    question: "A formal 7-day inspection is due on a Friday but the tower will not be used over the weekend. Can the inspection be delayed until Monday?",
    options: [
      "Yes, weekends do not count",
      "No — the 7-day interval must not be exceeded regardless of use patterns",
      "Yes, as long as the tower is covered",
      "Only if the site manager agrees in writing"
    ],
    correctAnswer: 1,
    explanation: "The 7-day maximum interval must not be exceeded. The inspection must be carried out on or before the 7th day, regardless of whether the tower is in use over the weekend.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "7-day inspections",
    category: "Inspection"
  },
  {
    id: 138,
    question: "What should be checked about the toeboards during an inspection?",
    options: [
      "That they are removable",
      "That they are at least 150mm high, fitted on all open sides and free from gaps that would allow materials to fall through",
      "That they match the guardrail colour",
      "That they are made of wood"
    ],
    correctAnswer: 1,
    explanation: "Toeboards must be at least 150mm high, fitted on all open sides of the working platform, and have no gaps between the toeboard and the platform surface that would allow materials or tools to slide off.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 139,
    question: "After a mobile access tower has been altered (e.g. height increased or platform repositioned), what must be done before it is used?",
    options: [
      "Nothing further is required",
      "A formal inspection must be carried out by a competent person and recorded",
      "Only a verbal check with the foreman is needed",
      "The manufacturer must be contacted for approval"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 of the WAHR 2005 requires a formal inspection after any assembly that could affect the stability or strength of the tower. Altering the height or configuration triggers this requirement.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "7-day inspections",
    category: "Inspection"
  },

  // --- advanced (6) ---
  {
    id: 140,
    question: "A tower has been left erected on site for 6 days without use. On day 7, before anyone uses it, an operative carries out a pre-use check and finds no defects. Does this satisfy the formal inspection requirement?",
    options: [
      "Yes, a pre-use check is sufficient",
      "No — a formal documented inspection by a competent person is required on or before day 7, and a pre-use check alone does not satisfy this requirement",
      "Yes, as long as the operative signs the logbook",
      "The formal inspection is only needed if defects are found"
    ],
    correctAnswer: 1,
    explanation: "A pre-use check is not the same as a formal inspection. The 7-day inspection must be a thorough, documented examination by a competent person. A pre-use check is a quick visual assessment and does not satisfy the Schedule 5 requirement.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "7-day inspections",
    category: "Inspection"
  },
  {
    id: 141,
    question: "Under the WAHR 2005, who has the legal duty to ensure that inspections of work equipment for work at height are carried out?",
    options: [
      "The operative using the tower",
      "The person on whose behalf the inspection is carried out (typically the employer or person controlling the work)",
      "PASMA",
      "The tower manufacturer"
    ],
    correctAnswer: 1,
    explanation: "The legal duty to ensure inspections are carried out falls on the person on whose behalf the work is done — typically the employer or the person who controls the work activity. They must ensure a competent person carries out the inspection.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Records",
    category: "Inspection"
  },
  {
    id: 142,
    question: "What constitutes 'competence' for the purposes of carrying out a formal tower inspection under the WAHR 2005?",
    options: [
      "Having a driving licence",
      "Sufficient training, knowledge, experience and ability to identify defects and assess their significance for safe use",
      "Being over 25 years of age",
      "Having worked on site for more than 1 year"
    ],
    correctAnswer: 1,
    explanation: "Competence for inspection purposes requires a combination of training, knowledge, experience and the practical ability to identify defects and understand their impact on the safe use of the tower. PASMA training contributes to but is not the sole determinant of competence.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "7-day inspections",
    category: "Inspection"
  },
  {
    id: 143,
    question: "An inspection reveals that a gravity lock on a horizontal brace is not fully engaging. The brace appears secure when pushed. Can the tower remain in use?",
    options: [
      "Yes, because the brace is still holding",
      "No — a malfunctioning locking mechanism is a defect that could lead to sudden component release under load, and the tower must be taken out of service until repaired",
      "Yes, as long as it is taped in place",
      "Only at heights below 4m"
    ],
    correctAnswer: 1,
    explanation: "A gravity lock that does not fully engage is a structural defect. Even if the brace appears secure, vibration, wind or accidental contact could cause it to release. The tower must be taken out of service and the defective component replaced or repaired.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 144,
    question: "What additional inspection consideration applies to towers used near the coast or in marine environments?",
    options: [
      "No additional considerations",
      "Accelerated corrosion from salt-laden air may require more frequent inspections and specific checks for pitting, white powder deposits and corroded joints",
      "The tower must be made from stainless steel",
      "Inspections can be less frequent due to cleaner air"
    ],
    correctAnswer: 1,
    explanation: "Salt-laden air in coastal and marine environments accelerates corrosion of aluminium components. More frequent inspections may be needed, with specific attention to pitting corrosion, white powder deposits (aluminium oxide) and degraded joint connections.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "7-day inspections",
    category: "Inspection"
  },
  {
    id: 145,
    question: "An inspection report identifies a bent horizontal brace that has been straightened on site. Is this acceptable?",
    options: [
      "Yes, as long as it looks straight",
      "No — site straightening of bent components can introduce hidden stress fractures and weakened areas; the component must be withdrawn from service and returned to the manufacturer for assessment",
      "Yes, if the foreman approves",
      "Only if it passes a hammer tap test"
    ],
    correctAnswer: 1,
    explanation: "Straightening bent aluminium components on site is not acceptable. The process can introduce stress fractures, work-hardened areas and hidden internal damage. The component must be withdrawn from service and assessed or replaced by the manufacturer.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 146,
    question: "On a TowerSure inspection tag, what does a 'red' status indicate?",
    options: [
      "The tower is safe to use",
      "The tower must not be used — it has failed inspection or is incomplete/unsafe",
      "The tower is due for a routine check",
      "The tower belongs to a hire company"
    ],
    correctAnswer: 1,
    explanation: "A red status on a TowerSure tag indicates that the tower must not be used. It has either failed its inspection, is incomplete, is unsafe, or has been identified as requiring attention before it can be put into service.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "TowerSure",
    category: "Inspection"
  },

  // =======================================================================
  // HAZARDS — 28 questions (id 147–174)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 147,
    question: "What is the single greatest cause of fatal accidents involving mobile access towers?",
    options: [
      "Electrocution",
      "Falls from height",
      "Falling objects",
      "Manual handling injuries"
    ],
    correctAnswer: 1,
    explanation: "Falls from height are the single greatest cause of fatal and serious injuries involving mobile access towers. This is why guardrails, correct assembly and proper training are critical.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Falls",
    category: "Hazards"
  },
  {
    id: 148,
    question: "What is the main risk to people working below a mobile access tower?",
    options: [
      "Noise from the work above",
      "Being struck by falling objects (tools, materials or components)",
      "Tripping over the outriggers",
      "Sunburn from reflected light"
    ],
    correctAnswer: 1,
    explanation: "Falling objects such as tools, materials or dislodged components pose a significant risk to people at ground level. Toeboards, enclosed platforms and exclusion zones help to mitigate this hazard.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Falling objects",
    category: "Hazards"
  },
  {
    id: 149,
    question: "What is the primary hazard when using a mobile access tower near overhead power lines?",
    options: [
      "Radio interference",
      "Electrocution — electricity can arc across gaps and does not require direct contact",
      "The power lines will melt the aluminium",
      "Magnetic forces will pull the tower towards the cables"
    ],
    correctAnswer: 1,
    explanation: "Electrocution is the primary hazard. High-voltage electricity can arc across an air gap and does not require direct contact with the conductor. Aluminium towers are excellent conductors, making this extremely dangerous.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Electrocution",
    category: "Hazards"
  },
  {
    id: 150,
    question: "What can happen if a mobile access tower is overloaded beyond its rated capacity?",
    options: [
      "Nothing — towers have large safety margins",
      "The tower can collapse or become unstable, causing falls and crushing injuries",
      "The castors will lock automatically",
      "The tower will sink into the ground evenly"
    ],
    correctAnswer: 1,
    explanation: "Overloading a tower beyond its rated capacity can cause structural failure, platform collapse or the tower overturning. The load class must be known and never exceeded.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 151,
    question: "What hazard is created by leaving tools or materials on an unguarded platform edge?",
    options: [
      "The tools may rust",
      "They can fall and strike people below, causing injury or death",
      "They will roll to the centre of the platform",
      "No hazard — tools do not fall on their own"
    ],
    correctAnswer: 1,
    explanation: "Tools and materials left near unguarded edges can be dislodged by wind, vibration or accidental contact and fall onto people below. This is why toeboards must be fitted on all open sides.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Falling objects",
    category: "Hazards"
  },
  {
    id: 152,
    question: "What is the hazard associated with not locking the castors before using a mobile access tower?",
    options: [
      "The castors may squeak",
      "The tower can roll away or move unexpectedly, causing the operative to lose balance and fall",
      "The castors will wear out faster",
      "The tower will vibrate excessively"
    ],
    correctAnswer: 1,
    explanation: "Unlocked castors allow the tower to move unpredictably. Any force applied to the tower (such as an operative reaching or the wind) can cause it to roll, leading to loss of balance and falls.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 153,
    question: "Which of the following is a common cause of mobile access tower collapse?",
    options: [
      "Using the tower indoors",
      "Missing or incorrectly fitted bracing",
      "Having too few people on the platform",
      "Using the tower on a concrete floor"
    ],
    correctAnswer: 1,
    explanation: "Missing or incorrectly fitted bracing is one of the most common causes of tower collapse. Bracing provides the rigidity that prevents the tower frame from racking and folding.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 154,
    question: "What manual handling hazard is associated with mobile access tower components?",
    options: [
      "The components are too light to cause injury",
      "Components can be heavy, awkward to carry, and pose risks of musculoskeletal injuries during assembly and dismantling",
      "Components are always delivered pre-assembled",
      "Only mechanical lifting is permitted"
    ],
    correctAnswer: 1,
    explanation: "Tower components can be heavy and awkward to handle, particularly frames and platforms. Improper manual handling during assembly, dismantling and transport can cause musculoskeletal injuries.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Manual handling",
    category: "Hazards"
  },
  {
    id: 155,
    question: "What is the risk of using a mobile access tower on soft ground without adequate base support?",
    options: [
      "The castors may get dirty",
      "The tower can sink unevenly, causing it to lean and potentially overturn",
      "The tower will be easier to move",
      "No risk — soft ground absorbs impact"
    ],
    correctAnswer: 1,
    explanation: "Soft ground can cause the tower to sink unevenly under load, leading to the tower leaning and potentially overturning. Base plates, sole boards or other load-spreading measures must be used on soft ground.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 156,
    question: "Why is it dangerous to climb on the outside of a mobile access tower?",
    options: [
      "It is not dangerous — it saves time",
      "External climbing creates outward forces that can overturn the tower and provides no fall protection if the climber slips",
      "It scratches the paintwork",
      "It is only dangerous in wet weather"
    ],
    correctAnswer: 1,
    explanation: "Climbing on the outside of a tower creates outward forces that can overturn the structure. The climber is also unprotected against falls, with no guardrails to prevent them from falling if they lose grip.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Falls",
    category: "Hazards"
  },
  {
    id: 157,
    question: "What is the risk assessment process designed to identify?",
    options: [
      "How much a project will cost",
      "The hazards present, who might be harmed and what control measures are needed",
      "Which contractor should carry out the work",
      "The nearest hospital location"
    ],
    correctAnswer: 1,
    explanation: "A risk assessment systematically identifies the hazards associated with the work activity, who might be affected, the likelihood and severity of harm, and what control measures are needed to reduce the risk to an acceptable level.",
    section: "Module 6",
    difficulty: "basic",
    topic: "Risk assessment",
    category: "Hazards"
  },

  // --- intermediate (11) ---
  {
    id: 158,
    question: "At what Beaufort scale force should all work on a mobile access tower cease?",
    options: [
      "Force 3",
      "Force 4",
      "Force 6",
      "Force 8"
    ],
    correctAnswer: 1,
    explanation: "Work on mobile access towers should cease when the wind reaches Beaufort Force 4 (approximately 13-17 mph / moderate breeze). The tower itself is typically rated to withstand Force 6 when unoccupied.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 159,
    question: "What is the approximate wind speed associated with Beaufort Force 4?",
    options: [
      "5-10 mph",
      "13-17 mph",
      "25-30 mph",
      "40-45 mph"
    ],
    correctAnswer: 1,
    explanation: "Beaufort Force 4 (moderate breeze) corresponds to wind speeds of approximately 13-17 mph (20-28 km/h). At this level, small branches move and loose paper is blown about.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 160,
    question: "An operative on a tower platform reaches out to the side to carry out work. What hazard does this create?",
    options: [
      "No hazard if the operative is experienced",
      "Side-loading that shifts the tower's centre of gravity and may cause it to overturn",
      "The risk of dropping the tool being used",
      "Noise from the work affecting people below"
    ],
    correctAnswer: 1,
    explanation: "Reaching out sideways applies a horizontal force to the tower and shifts the effective centre of gravity. This side-loading can cause the tower to overturn, especially if the operative leans against the guardrail. The tower should be repositioned instead.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 161,
    question: "What is the danger of using a ladder or stepladder on a tower platform to gain extra height?",
    options: [
      "It saves money",
      "It raises the centre of gravity, creates an unstable working position and increases fall height with no protection above the guardrails",
      "It is only dangerous on single-width towers",
      "There is no danger if the ladder is tied off"
    ],
    correctAnswer: 1,
    explanation: "Using a ladder or steps on a tower platform raises the operative above the guardrail protection, increases the fall height, raises the centre of gravity and creates an inherently unstable working position. It must never be done.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Falls",
    category: "Hazards"
  },
  {
    id: 162,
    question: "What is 'racking' in the context of mobile access tower stability?",
    options: [
      "Storing the tower on a rack",
      "The sideways distortion of the tower frame caused by horizontal forces, which can lead to collapse if bracing is missing or inadequate",
      "The process of tightening all bolts",
      "Adding extra platforms to increase load capacity"
    ],
    correctAnswer: 1,
    explanation: "Racking is the sideways distortion (parallelogram effect) of the tower frame when horizontal forces are applied. It occurs when bracing is missing, loose or incorrectly fitted, and can lead to sudden collapse.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 163,
    question: "What is the hazard of using a mobile access tower as a support for a hoist or heavy suspended load?",
    options: [
      "No hazard — towers are designed for all loads",
      "The dynamic and concentrated forces from hoisting can exceed the tower's design capacity and cause collapse or overturning",
      "It makes the tower easier to move",
      "It is only hazardous if the load exceeds 50 kg"
    ],
    correctAnswer: 1,
    explanation: "Towers are designed for uniformly distributed loads on the platform, not concentrated or dynamic loads from hoisting. The forces generated by lifting, lowering and sudden stops can dramatically exceed the tower's rated capacity, causing collapse or overturning.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 164,
    question: "What hazard is created when sheeting or banners are attached to a mobile access tower?",
    options: [
      "The tower looks untidy",
      "The sheeting acts as a sail, dramatically increasing wind loading and the risk of overturning",
      "The sheeting protects the tower from corrosion",
      "Banners reduce the tower's visibility"
    ],
    correctAnswer: 1,
    explanation: "Sheeting, banners or tarpaulins create a large surface area that catches the wind, dramatically increasing the lateral forces on the tower. This 'sail effect' can cause the tower to overturn even in relatively light winds.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 165,
    question: "What type of injury can result from the manual handling of heavy tower frames without proper technique?",
    options: [
      "Only minor bruising",
      "Musculoskeletal disorders including back injuries, hernias and joint damage",
      "Only skin irritation",
      "Manual handling of tower components never causes injury"
    ],
    correctAnswer: 1,
    explanation: "Improper manual handling of heavy tower components can cause serious musculoskeletal injuries including lower back injuries, herniated discs, shoulder injuries, hernias and repetitive strain injuries.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Manual handling",
    category: "Hazards"
  },
  {
    id: 166,
    question: "What is the minimum safe distance from underground services (e.g. buried cables) that should be considered when positioning a tower with ground-penetrating stabilisers?",
    options: [
      "No consideration is needed for underground services",
      "Underground services should be identified using cable avoidance tools and service plans before driving any ground-penetrating anchors or stabilisers",
      "1 metre in all cases",
      "Underground services only matter for towers over 10m"
    ],
    correctAnswer: 1,
    explanation: "Before installing any ground-penetrating anchors or stabilisers, underground services must be identified using cable avoidance tools (CATs) and service plans. Striking a buried electrical cable or gas main could be fatal.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Electrocution",
    category: "Hazards"
  },
  {
    id: 167,
    question: "A mobile access tower is positioned near a busy vehicle route on site. What control measure should be implemented?",
    options: [
      "No action is needed if the tower is stable",
      "Physical barriers, warning signs and traffic management measures should be put in place to prevent vehicle impact",
      "The tower should be painted in bright colours",
      "The operative should wear a high-visibility vest — no other measure is needed"
    ],
    correctAnswer: 1,
    explanation: "Vehicle impact is a serious hazard. Physical barriers (such as concrete blocks or guardrails), warning signs and traffic management measures should be implemented to prevent vehicles from striking the tower.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Risk assessment",
    category: "Hazards"
  },
  {
    id: 168,
    question: "When carrying out a risk assessment for mobile access tower work, which of the following should be considered?",
    options: [
      "Only the height of the tower",
      "Ground conditions, weather, nearby hazards, access/egress, overhead services, the task being performed and emergency procedures",
      "Only the weight of materials being carried",
      "Only the duration of the work"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive risk assessment must consider all factors: ground conditions, weather, nearby hazards (power lines, traffic, openings), means of access and egress, the nature of the task, the load on the platform and emergency/rescue procedures.",
    section: "Module 6",
    difficulty: "intermediate",
    topic: "Risk assessment",
    category: "Hazards"
  },

  // --- advanced (6) ---
  {
    id: 169,
    question: "A mobile access tower rated to Beaufort Force 6 is left erected overnight. The weather forecast predicts Force 7 winds. What action is required?",
    options: [
      "No action — the tower has a safety factor",
      "The tower should be dismantled or reduced in height, or additional stabilisation provided such as tying to a structure, before the high winds arrive",
      "Place heavy objects on the platform for ballast",
      "Lock the castors more tightly"
    ],
    correctAnswer: 1,
    explanation: "If forecast winds exceed the tower's rated capacity (typically Beaufort Force 6 / 28 mph), the tower must be dismantled, reduced in height, or provided with additional stabilisation such as tying to an adjacent structure. Simply locking castors is insufficient.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 170,
    question: "What is 'suspension trauma' and how is it relevant to mobile access tower work?",
    options: [
      "It is fear of heights",
      "It is a potentially fatal condition where a person suspended motionless in a harness can suffer blood pooling in the legs, leading to loss of consciousness and death within 5-15 minutes",
      "It is the stress of working at height for extended periods",
      "It only affects crane operators"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma (orthostatic intolerance) occurs when a person hangs motionless in a harness. Blood pools in the legs, reducing venous return to the heart. This can cause loss of consciousness and death within 5-15 minutes. Prompt rescue is critical.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Falls",
    category: "Hazards"
  },
  {
    id: 171,
    question: "An operative discovers that the tower is positioned 8 metres from an 11kV overhead power line. According to HSE guidance, what is the minimum safe clearance distance?",
    options: [
      "3 metres",
      "6 metres",
      "9 metres",
      "15 metres"
    ],
    correctAnswer: 1,
    explanation: "HSE guidance (GS6) recommends a minimum clearance of 6 metres from 11kV overhead lines. At 8 metres, there may be insufficient safety margin when accounting for tower sway and operative reach. The situation must be reviewed by a competent person.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Electrocution",
    category: "Hazards"
  },
  {
    id: 172,
    question: "A tower is erected on a suspended floor in a multi-storey building. What additional hazard must be assessed?",
    options: [
      "Only the floor colour",
      "The floor's load-bearing capacity must be verified to ensure it can support the combined weight of the tower, operatives, materials and imposed loads",
      "Whether the floor is tiled or carpeted",
      "The age of the building"
    ],
    correctAnswer: 1,
    explanation: "Suspended floors have limited load-bearing capacity. The point loads from tower castors can be significant, and the combined weight of tower, operatives and materials may exceed the floor's design capacity. A structural assessment may be required.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Collapse",
    category: "Hazards"
  },
  {
    id: 173,
    question: "What is the cumulative effect of multiple simultaneous hazards (e.g. high wind, side-loading from work, and partially missing bracing) on tower stability?",
    options: [
      "Hazards do not interact with each other",
      "Multiple hazards interact and compound each other — the combined effect can exceed the tower's safety margin even when each individual hazard alone would not",
      "Only the single greatest hazard needs to be considered",
      "Multiple hazards cancel each other out"
    ],
    correctAnswer: 1,
    explanation: "Hazards are cumulative. A tower may resist moderate wind, small side-loads or minor bracing deficiencies individually, but the combination of multiple hazards simultaneously can exceed the tower's stability margin and cause sudden failure.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Risk assessment",
    category: "Hazards"
  },
  {
    id: 174,
    question: "During a risk assessment, it is identified that the work from the tower will generate sparks near flammable materials. What control hierarchy should be applied?",
    options: [
      "Provide fire extinguishers only",
      "Eliminate the ignition source if possible; if not, remove or protect flammable materials, use fire-resistant sheeting, provide fire-watching and extinguishing equipment as a last resort",
      "Simply increase the tower height to move sparks further away",
      "Ignore the risk as towers are non-flammable"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control applies: first try to eliminate the ignition source (e.g. use a non-spark method). If not possible, remove or protect flammable materials, install fire-resistant sheeting, and provide fire-watching and extinguishing equipment as additional measures.",
    section: "Module 6",
    difficulty: "advanced",
    topic: "Risk assessment",
    category: "Hazards"
  },

  // =======================================================================
  // SAFETY — 26 questions (id 175–200)
  // =======================================================================

  // --- basic (10) ---
  {
    id: 175,
    question: "What type of PPE should be worn when assembling a mobile access tower?",
    options: [
      "No PPE is required for tower assembly",
      "As identified by the risk assessment — typically safety boots, hard hat and gloves as a minimum",
      "Only a high-visibility vest",
      "Full body armour"
    ],
    correctAnswer: 1,
    explanation: "The risk assessment determines the specific PPE required, but as a minimum, safety boots, a hard hat and gloves are typically needed during assembly to protect against falling components and manual handling injuries.",
    section: "Module 7",
    difficulty: "basic",
    topic: "PPE",
    category: "Safety"
  },
  {
    id: 176,
    question: "Why must a rescue plan be in place before anyone works from a mobile access tower?",
    options: [
      "It is just a paperwork exercise",
      "Because if an operative is injured or incapacitated at height, a pre-planned rescue procedure is essential to bring them down safely and quickly",
      "It is only needed for towers over 20m",
      "Rescue plans are optional"
    ],
    correctAnswer: 1,
    explanation: "An injured or incapacitated operative at height cannot rescue themselves. A pre-planned rescue procedure ensures that help can be provided quickly and effectively. Delay in rescue, particularly with suspension trauma, can be fatal.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Rescue",
    category: "Safety"
  },
  {
    id: 177,
    question: "What is the three-point contact rule when climbing a mobile access tower?",
    options: [
      "Always have three people on the tower",
      "Maintain contact with the ladder using two hands and one foot, or two feet and one hand, at all times",
      "Touch three rungs before starting to climb",
      "Rest for three seconds at each platform"
    ],
    correctAnswer: 1,
    explanation: "The three-point contact rule requires the climber to have at least three limbs in contact with the ladder at all times — either two hands and one foot, or two feet and one hand. This minimises the risk of losing grip and falling.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 178,
    question: "Should an operative work from a mobile access tower if they feel unwell or dizzy?",
    options: [
      "Yes, if the work is urgent",
      "No — they should report their condition to their supervisor and not work at height until they are fit to do so",
      "Yes, as long as they hold on to the guardrail",
      "Only if they are supervised"
    ],
    correctAnswer: 1,
    explanation: "An operative who is unwell, dizzy, fatigued or under the influence of medication that affects balance or alertness must not work at height. They should report their condition to the supervisor immediately.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Fitness",
    category: "Safety"
  },
  {
    id: 179,
    question: "What should be done if weather conditions deteriorate while an operative is working on a tower?",
    options: [
      "Continue working but hold on tightly",
      "Cease work, secure tools and materials, and descend the tower safely",
      "Wait for the wind to die down while remaining on the platform",
      "Move the tower to a sheltered location with the operative on board"
    ],
    correctAnswer: 1,
    explanation: "If weather conditions deteriorate (increasing wind, rain, lightning), work must cease immediately. The operative should secure tools and materials, descend the tower safely and not return until conditions improve.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Weather",
    category: "Safety"
  },
  {
    id: 180,
    question: "What is the safest way to raise tools and materials to the working platform?",
    options: [
      "Throw them up from the ground",
      "Use a tool bag, rope and pulley or other approved method — never carry items while climbing",
      "Carry everything in a rucksack while climbing",
      "Place them on the platform before assembly"
    ],
    correctAnswer: 1,
    explanation: "Tools and materials should be raised using a tool bag, rope and pulley, gin wheel or material hoist. Items should never be carried while climbing, as this prevents maintaining three-point contact and risks dropping objects.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 181,
    question: "Why should unauthorised persons be prevented from accessing a mobile access tower?",
    options: [
      "To prevent theft of the tower",
      "Because untrained persons may use the tower unsafely, risk falling, or interfere with the structure causing it to become unsafe",
      "To keep the platform clean",
      "It is not necessary to restrict access"
    ],
    correctAnswer: 1,
    explanation: "Unauthorised and untrained persons may use the tower unsafely, overload it, modify it or damage components. They could also be injured through falls or by making the tower unsafe for others.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 182,
    question: "What should an operative do if they notice a missing component on a tower that is already in use?",
    options: [
      "Ignore it if the tower seems stable",
      "Stop work immediately, report the defect and ensure the tower is not used until the missing component is replaced and the tower is re-inspected",
      "Continue working but make a note for later",
      "Replace it with a similar component from a different manufacturer"
    ],
    correctAnswer: 1,
    explanation: "A missing component can compromise the tower's structural integrity. Work must stop immediately, the defect reported, and the tower taken out of use until the missing component is replaced with the correct part and the tower re-inspected.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 183,
    question: "What is the purpose of an exclusion zone around the base of a mobile access tower?",
    options: [
      "To keep the area clean",
      "To protect people at ground level from falling objects and to prevent interference with the tower base",
      "To reserve parking spaces",
      "Exclusion zones are not required"
    ],
    correctAnswer: 1,
    explanation: "An exclusion zone prevents people from walking beneath the tower where they could be struck by falling objects. It also prevents unauthorised persons from interfering with the tower base, castors or outriggers.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 184,
    question: "Why is it important to keep the working platform of a mobile access tower clean and free from debris?",
    options: [
      "For aesthetic reasons only",
      "Debris creates trip and slip hazards and can fall from the platform edge, injuring people below",
      "It is only important for client visits",
      "It reduces the weight on the platform"
    ],
    correctAnswer: 1,
    explanation: "A dirty, cluttered platform creates trip and slip hazards for the operative and increases the risk of objects falling from the edge. Regular housekeeping is essential for safe working at height.",
    section: "Module 7",
    difficulty: "basic",
    topic: "Safe working",
    category: "Safety"
  },

  // --- intermediate (10) ---
  {
    id: 185,
    question: "What factors should be considered when assessing an operative's fitness to work at height?",
    options: [
      "Only their age",
      "Physical fitness, medical conditions (e.g. vertigo, epilepsy), medication side effects, fatigue and the influence of alcohol or drugs",
      "Only whether they have a PASMA card",
      "Their body weight only"
    ],
    correctAnswer: 1,
    explanation: "Fitness to work at height depends on physical fitness, relevant medical conditions (vertigo, epilepsy, heart conditions), medication effects (drowsiness, dizziness), fatigue levels and freedom from the influence of alcohol or drugs.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Fitness",
    category: "Safety"
  },
  {
    id: 186,
    question: "In wet weather, what additional safety precaution should be taken when working on a mobile access tower?",
    options: [
      "No additional precautions are needed",
      "Surfaces become slippery — non-slip platforms should be used, extra care taken when climbing, and the risk assessment reviewed for wet conditions",
      "Simply dry the platform with a towel",
      "Work faster to finish before it rains more"
    ],
    correctAnswer: 1,
    explanation: "Wet conditions make platforms, rungs and handholds slippery, increasing the risk of slips and falls. Non-slip platform surfaces should be used, extra care taken when climbing, and the overall risk assessment reviewed.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Weather",
    category: "Safety"
  },
  {
    id: 187,
    question: "What is the critical time window for rescuing a person who has fallen and is suspended in a harness?",
    options: [
      "Up to 1 hour",
      "5-15 minutes before suspension trauma becomes life-threatening",
      "30-60 minutes",
      "There is no time limit"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma can become life-threatening within 5-15 minutes. The rescue plan must ensure that a suspended person can be reached and lowered to the ground within this critical time window.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Rescue",
    category: "Safety"
  },
  {
    id: 188,
    question: "What should a rescue plan for tower work include as a minimum?",
    options: [
      "The nearest hospital address only",
      "The method of rescue, trained personnel, necessary equipment on site, communication method and emergency contact numbers",
      "A list of the operative's next of kin",
      "Only a first aid kit location"
    ],
    correctAnswer: 1,
    explanation: "A rescue plan must detail the method of rescue, who will carry it out (trained rescue personnel), what equipment is immediately available, how communication will be maintained and emergency contact numbers including ambulance services.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Rescue",
    category: "Safety"
  },
  {
    id: 189,
    question: "An operative needs to use a power tool on a tower platform near the edge. What additional safety measure should be considered?",
    options: [
      "No additional measures are needed if guardrails are fitted",
      "A tool lanyard or tether should be used to prevent the power tool from falling if dropped",
      "The power tool should be wrapped in padding",
      "The operative should lean over the guardrail for a better angle"
    ],
    correctAnswer: 1,
    explanation: "Tool lanyards or tethers should be used to prevent power tools from falling from the platform if dropped. A falling power tool can cause serious injury to anyone below. The operative should never lean over or work outside the guardrails.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 190,
    question: "If lightning is observed while an operative is working on a mobile access tower, what should happen?",
    options: [
      "Continue working — the tower is earthed through the castors",
      "The operative should immediately cease work and descend to ground level — metal towers attract lightning and the elevated position increases strike risk",
      "Shelter under the platform",
      "Hold on to the guardrails for stability"
    ],
    correctAnswer: 1,
    explanation: "A metal tower in an elevated position is at high risk of lightning strike. The operative must cease work immediately and descend to ground level. Aluminium is an excellent conductor, and a lightning strike through the tower would be fatal.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Weather",
    category: "Safety"
  },
  {
    id: 191,
    question: "What is the purpose of a 'method statement' for mobile access tower work?",
    options: [
      "To list the equipment costs",
      "To describe the safe system of work, step by step, for the specific tower operation including assembly, use, inspection and dismantling",
      "To record the operative's qualifications",
      "To describe the building's history"
    ],
    correctAnswer: 1,
    explanation: "A method statement is a document that describes the safe system of work, step by step, for the specific task. For tower work, it covers assembly, use, inspection, dismantling, rescue procedures and specific hazard controls.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 192,
    question: "What PPE might be required when dismantling a tower in an area with overhead working?",
    options: [
      "Sunglasses",
      "A hard hat (safety helmet) to protect against falling objects from above",
      "Ear defenders only",
      "No PPE is needed for dismantling"
    ],
    correctAnswer: 1,
    explanation: "When working in areas where there is a risk of objects falling from above (including during dismantling where components are being lowered), a hard hat must be worn to protect against head injuries.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "PPE",
    category: "Safety"
  },
  {
    id: 193,
    question: "Why should mobile access tower work not be carried out in freezing conditions without additional precautions?",
    options: [
      "The aluminium shrinks and components do not fit",
      "Ice can form on rungs, platforms and handholds creating extreme slip hazards, and cold reduces manual dexterity",
      "The tower becomes magnetic in cold weather",
      "Freezing conditions only affect steel towers"
    ],
    correctAnswer: 1,
    explanation: "Freezing conditions cause ice to form on climbing rungs, platform surfaces and handholds, creating severe slip hazards. Cold also reduces manual dexterity, making it harder to grip components and operate locking mechanisms safely.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Weather",
    category: "Safety"
  },
  {
    id: 194,
    question: "What is the recommended action if an operative on a tower witnesses a colleague collapse on the platform?",
    options: [
      "Shout down for help and leave them where they are",
      "Call for emergency assistance immediately, ensure the area is safe, provide first aid if trained, and initiate the rescue plan to bring the casualty safely to ground level",
      "Move the tower to the nearest exit",
      "Continue working and check on them later"
    ],
    correctAnswer: 1,
    explanation: "The operative should call for emergency assistance immediately, ensure the area is safe, provide first aid if trained to do so, and initiate the rescue plan. The priority is to get professional medical help and bring the casualty safely to ground level.",
    section: "Module 7",
    difficulty: "intermediate",
    topic: "Rescue",
    category: "Safety"
  },

  // --- advanced (6) ---
  {
    id: 195,
    question: "An operative has fallen from a tower and is suspended in a harness at a height of 6m. The rescue plan requires a MEWP for rescue but none is immediately available. What should be done?",
    options: [
      "Wait for the MEWP — it should arrive within the hour",
      "Implement the contingency rescue procedure immediately — the 5-15 minute critical window for suspension trauma means an alternative rescue method must be used without delay",
      "Cut the harness to bring them down",
      "Call the fire brigade only"
    ],
    correctAnswer: 1,
    explanation: "With suspension trauma potentially fatal within 5-15 minutes, the primary rescue method cannot be awaited. The contingency rescue procedure must be implemented immediately — this could include a ladder rescue, rope rescue system, or calling emergency services while keeping the person conscious and moving their legs.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Rescue",
    category: "Safety"
  },
  {
    id: 196,
    question: "An operative is taking prescription medication that lists 'may cause drowsiness' as a side effect. What is the correct course of action regarding work at height?",
    options: [
      "They can work at height if they feel fine",
      "They must not work at height until they have medical clearance confirming the medication does not impair their ability to work safely at height",
      "They can work at height with a colleague watching them",
      "They should take the medication after work instead"
    ],
    correctAnswer: 1,
    explanation: "Medication that may cause drowsiness can impair balance, concentration and reaction time — all critical for safe work at height. The operative must obtain medical clearance before working at height while taking such medication.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Fitness",
    category: "Safety"
  },
  {
    id: 197,
    question: "A site requires continuous 24-hour tower access for maintenance work. What specific safety considerations apply to night shift operations?",
    options: [
      "No additional considerations — towers work the same at night",
      "Adequate lighting of the tower and surrounding area, increased fatigue risk in night workers, reduced visibility for inspections, and the availability of rescue personnel throughout the night",
      "Simply provide torches to the operatives",
      "Restrict work to ground level during night hours"
    ],
    correctAnswer: 1,
    explanation: "Night shift tower work requires adequate artificial lighting for safe climbing, working and inspection. Night workers face increased fatigue risk affecting alertness and balance. Visibility for inspections is reduced, and rescue personnel must be available throughout the shift.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Safe working",
    category: "Safety"
  },
  {
    id: 198,
    question: "What is the 'hierarchy of rescue' that should be considered in the rescue plan for tower work?",
    options: [
      "There is no hierarchy — any method will do",
      "Self-rescue first (if the person can descend unaided), assisted rescue from the tower (colleagues help), mechanical rescue (MEWP, descent device) and emergency services as the final option",
      "Always wait for the fire brigade",
      "Lower the entire tower to the ground with the person on it"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy considers: (1) self-rescue — can the person descend unaided, (2) assisted rescue — can trained colleagues help them down, (3) mechanical rescue — using a MEWP, rope descent system or similar, and (4) emergency services — as a backup when other methods are unavailable or unsuccessful.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Rescue",
    category: "Safety"
  },
  {
    id: 199,
    question: "An operative working on a tower at 10m height in summer experiences symptoms of heat exhaustion (dizziness, nausea, excessive sweating). What is the safest response?",
    options: [
      "Continue working in the shade side of the tower",
      "The operative must stop work immediately, be assisted to descend safely while still conscious, moved to a cool shaded area, given fluids and monitored — if symptoms worsen, call emergency services",
      "Pour water over their head while they continue working",
      "Wait until the end of the shift to see a doctor"
    ],
    correctAnswer: 1,
    explanation: "Heat exhaustion can rapidly progress to heat stroke, which is life-threatening. The operative must descend while still able to do so safely, be moved to shade, cooled down and given fluids. Medical attention should be sought if symptoms do not improve quickly.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Fitness",
    category: "Safety"
  },
  {
    id: 200,
    question: "A tower is to be used for work involving the removal of materials that may contain asbestos. In addition to the standard tower safety measures, what must be in place?",
    options: [
      "No additional measures — asbestos is no longer a hazard",
      "A licensed asbestos removal contractor must carry out the work, with full RPE, decontamination procedures, air monitoring, a specific asbestos plan of work and notification to the HSE where required",
      "Simply wear a dust mask",
      "Cover the platform with plastic sheeting"
    ],
    correctAnswer: 1,
    explanation: "Asbestos removal is a specialist operation requiring licensed contractors, respiratory protective equipment (RPE), decontamination facilities, air monitoring, a detailed plan of work and HSE notification (for licensable work). The tower provides the access, but all asbestos-specific controls must also be fully implemented.",
    section: "Module 7",
    difficulty: "advanced",
    topic: "Safe working",
    category: "Safety"
  }
];
