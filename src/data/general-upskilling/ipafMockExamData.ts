/**
 * IPAF Mobile Scaffold Mock Exam Question Bank
 *
 * 200 questions covering all 5 modules with difficulty distribution
 * and category classification for balanced exam generation.
 *
 * Categories (5):
 *   Legislation (40) | Tower Types (40) | Assembly (40) | Inspection (40) | Hazards (40)
 *
 * Difficulty per category: ~14 basic, ~18 intermediate, ~8 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const ipafCategories = [
  "Legislation",
  "Tower Types",
  "Assembly",
  "Inspection",
  "Hazards"
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const ipafMockExamConfig: MockExamConfig = {
  examId: 'ipaf-scaffold',
  examTitle: 'IPAF Mobile Scaffold Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/ipaf-module-6',
  categories: ipafCategories
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomIpafExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(ipafQuestionBank, numQuestions, ipafCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const ipafQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // LEGISLATION — 40 questions (id 1–40)
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
    id: 7,
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
    id: 8,
    question: "What is the primary British/European standard that covers mobile access towers?",
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
    id: 9,
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
    id: 10,
    question: "Section 8 of the HSWA 1974 makes it an offence for any person to intentionally or recklessly do what?",
    options: [
      "Refuse to attend safety training",
      "Fail to report an accident",
      "Interfere with or misuse anything provided for health and safety",
      "Work without a valid CSCS card"
    ],
    correctAnswer: 2,
    explanation: "Section 8 states that no person shall intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare.",
    section: "Module 1",
    difficulty: "basic",
    topic: "HSWA 1974",
    category: "Legislation"
  },
  {
    id: 11,
    question: "Which body is the main enforcing authority for health and safety legislation on construction sites in the UK?",
    options: [
      "Local Authority Environmental Health",
      "Health and Safety Executive (HSE)",
      "PASMA",
      "Building Control"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety Executive (HSE) is the principal enforcing authority for health and safety on construction sites in Great Britain.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Enforcement",
    category: "Legislation"
  },
  {
    id: 12,
    question: "Under the Work at Height Regulations 2005, who has a duty to plan, supervise and carry out work at height in a safe manner?",
    options: [
      "Only the site manager",
      "Every employer and any person who controls the work of others",
      "The HSE inspector assigned to the site",
      "Only self-employed persons"
    ],
    correctAnswer: 1,
    explanation: "The Regulations place duties on employers, the self-employed, and any person who controls the work of others to plan, supervise and carry out work at height safely.",
    section: "Module 1",
    difficulty: "basic",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 13,
    question: "What does CDM stand for in CDM 2015?",
    options: [
      "Construction Development Management",
      "Construction (Design and Management)",
      "Contractor Duty Management",
      "Construction Delivery and Maintenance"
    ],
    correctAnswer: 1,
    explanation: "CDM stands for Construction (Design and Management) Regulations 2015, which set out the legal framework for managing health and safety in construction projects.",
    section: "Module 1",
    difficulty: "basic",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 14,
    question: "According to the Work at Height Regulations, Schedule 5 specifically covers which type of access equipment?",
    options: [
      "Fixed scaffolding",
      "Mobile elevating work platforms",
      "Ladders",
      "Personal fall protection systems"
    ],
    correctAnswer: 2,
    explanation: "Schedule 5 of the Work at Height Regulations 2005 provides requirements specific to the use of ladders.",
    section: "Module 1",
    difficulty: "basic",
    topic: "WAHR 2005",
    category: "Legislation"
  },

  // --- intermediate (18) ---
  {
    id: 15,
    question: "Under the CDM 2015 Regulations, which duty holder has overall responsibility for the planning, management, monitoring and coordination of the construction phase?",
    options: [
      "Client",
      "Principal Designer",
      "Principal Contractor",
      "Designer"
    ],
    correctAnswer: 2,
    explanation: "The Principal Contractor has overall responsibility for the planning, management, monitoring and coordination of health and safety during the construction phase of a project.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 16,
    question: "BS EN 1004-1:2020 defines three load classes for mobile access towers. Which load class allows the highest uniformly distributed load on the platform?",
    options: [
      "Load Class 1",
      "Load Class 2",
      "Load Class 3",
      "All classes allow the same load"
    ],
    correctAnswer: 2,
    explanation: "Load Class 3 allows the highest uniformly distributed load (2.0 kN/m2) compared with Class 2 (1.5 kN/m2) and Class 1 (0.75 kN/m2).",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 17,
    question: "Under BS EN 1004-1:2020, what is the maximum height for an indoor mobile access tower without additional stabilisation?",
    options: [
      "4 metres",
      "8 metres",
      "12 metres",
      "The standard does not set a single limit; it depends on the manufacturer's instruction manual"
    ],
    correctAnswer: 3,
    explanation: "BS EN 1004-1:2020 does not prescribe a single universal height limit. Maximum heights depend on the specific tower configuration and the manufacturer's design calculations and instruction manual.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 18,
    question: "The Work at Height Regulations 2005 require that any place used for work at height must be what?",
    options: [
      "Approved by the HSE before use",
      "Suitable and sufficient for the purpose",
      "Made of non-conductive materials",
      "Painted a visible colour"
    ],
    correctAnswer: 1,
    explanation: "The Regulations require that every place at which work is to be done at height must be suitable and sufficient for the purpose, including its condition and structural properties.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 19,
    question: "Which CDM 2015 duty holder has a duty to provide pre-construction information to designers and contractors?",
    options: [
      "Principal Contractor",
      "Client",
      "Principal Designer",
      "Worker"
    ],
    correctAnswer: 1,
    explanation: "The Client must provide pre-construction information as soon as practicable to every designer and contractor appointed, or being considered for appointment.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 20,
    question: "According to PASMA guidance, who is responsible for ensuring that only trained and competent persons assemble, alter or dismantle mobile access towers?",
    options: [
      "The tower manufacturer",
      "The site visitor coordinator",
      "The employer or person controlling the work",
      "PASMA itself"
    ],
    correctAnswer: 2,
    explanation: "The employer or person controlling the work has the duty to ensure that only trained and competent operatives assemble, alter or dismantle towers in accordance with the manufacturer's instructions.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PASMA",
    category: "Legislation"
  },
  {
    id: 21,
    question: "Under the Work at Height Regulations 2005, when must a risk assessment for work at height be reviewed?",
    options: [
      "Only when an accident occurs",
      "Every 12 months regardless of circumstances",
      "When there is reason to believe it is no longer valid or there has been a significant change",
      "Only when requested by the HSE"
    ],
    correctAnswer: 2,
    explanation: "Risk assessments must be reviewed if there is reason to suspect they are no longer valid, or if there has been a significant change in the matters to which they relate.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 22,
    question: "What type of enforcement notice can an HSE inspector issue requiring immediate cessation of an activity that involves a risk of serious personal injury?",
    options: [
      "Improvement notice",
      "Prohibition notice",
      "Compliance order",
      "Warning letter"
    ],
    correctAnswer: 1,
    explanation: "A Prohibition Notice can be issued by an HSE inspector when there is a risk of serious personal injury. It requires the activity to stop immediately or within a specified period.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Enforcement",
    category: "Legislation"
  },
  {
    id: 23,
    question: "Under HSWA 1974, what is the maximum penalty for an offence tried on indictment (Crown Court)?",
    options: [
      "A fine of up to £20,000",
      "A fine of up to £50,000",
      "An unlimited fine and/or up to 2 years imprisonment",
      "A fine of £10,000 per offence only"
    ],
    correctAnswer: 2,
    explanation: "For offences tried on indictment in the Crown Court, the penalty can be an unlimited fine and/or imprisonment for up to 2 years.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Enforcement",
    category: "Legislation"
  },
  {
    id: 24,
    question: "Which of the following is a duty holder role introduced specifically by the CDM 2015 Regulations?",
    options: [
      "Site Supervisor",
      "Principal Designer",
      "Safety Officer",
      "Scaffold Inspector"
    ],
    correctAnswer: 1,
    explanation: "The Principal Designer role was introduced by CDM 2015, replacing the previous CDM Co-ordinator role. They plan, manage and monitor health and safety in the pre-construction phase.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 25,
    question: "According to the hierarchy of control in the Work at Height Regulations, if work at height cannot be avoided, what is the next preferred measure?",
    options: [
      "Issue personal protective equipment",
      "Use work equipment or other measures to prevent falls",
      "Place warning signs around the area",
      "Ensure a first aider is present"
    ],
    correctAnswer: 1,
    explanation: "If work at height cannot be avoided, the next step in the hierarchy is to use work equipment or other measures to prevent falls, such as guardrails or mobile access towers.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 26,
    question: "Which PASMA card type is issued to persons who have completed the Towers for Users course?",
    options: [
      "Gold Card",
      "Blue Card (Operative)",
      "Red Card (Supervisor)",
      "PASMA Photo ID Card (Towers for Users)"
    ],
    correctAnswer: 3,
    explanation: "Successful completion of the PASMA Towers for Users course results in a PASMA Photo ID Card specifically endorsed for the course completed.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PASMA",
    category: "Legislation"
  },
  {
    id: 27,
    question: "Under the Provision and Use of Work Equipment Regulations 1998 (PUWER), mobile access towers are classified as what?",
    options: [
      "Personal protective equipment",
      "Lifting equipment",
      "Work equipment",
      "Temporary structures"
    ],
    correctAnswer: 2,
    explanation: "Under PUWER, a mobile access tower is classified as work equipment. PUWER requires that work equipment is suitable, maintained and used by people who have received adequate training.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PUWER",
    category: "Legislation"
  },
  {
    id: 28,
    question: "BS EN 1004-1:2020 requires that all towers meeting the standard must carry a legible label. Which of the following must the label include?",
    options: [
      "The name of the site supervisor",
      "The date of the last paint application",
      "The maximum platform height and load class",
      "The operative's PASMA card number"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1004-1:2020 requires a legible label showing key information including the maximum platform height, load class, and the standard number.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 29,
    question: "Under the Work at Height Regulations 2005, who is responsible for ensuring that work equipment used for work at height is inspected at suitable intervals?",
    options: [
      "The equipment manufacturer",
      "The person on whose behalf the inspection is carried out",
      "The insurance company",
      "PASMA"
    ],
    correctAnswer: 1,
    explanation: "The duty holder (the person on whose behalf the inspection is carried out — typically the employer or person controlling the work) must ensure equipment is inspected at suitable intervals.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 30,
    question: "What does the second step in the Work at Height Regulations hierarchy of control state, if falls cannot be prevented?",
    options: [
      "Abandon the work activity",
      "Use measures that minimise the distance and consequences of a fall",
      "Double the number of workers",
      "Carry out work only during daylight hours"
    ],
    correctAnswer: 1,
    explanation: "If falls cannot be prevented, the Regulations require the use of work equipment or other measures to minimise the distance and consequences of a fall, such as safety nets or airbags.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 31,
    question: "Under CDM 2015, what is the Client's duty regarding the construction phase plan?",
    options: [
      "The Client must write the plan personally",
      "The Client must ensure a plan is drawn up before the construction phase begins",
      "The Client has no responsibility for the plan",
      "The Client must submit the plan to the HSE for approval"
    ],
    correctAnswer: 1,
    explanation: "The Client must ensure that a construction phase plan is drawn up by the contractor or principal contractor before the construction phase begins.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 32,
    question: "Which regulation requires employers to provide adequate training and information to employees who use work equipment?",
    options: [
      "COSHH 2002",
      "LOLER 1998",
      "PUWER 1998",
      "RIDDOR 2013"
    ],
    correctAnswer: 2,
    explanation: "PUWER 1998 (Provision and Use of Work Equipment Regulations) requires employers to provide adequate training, information and instruction to persons who use work equipment.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PUWER",
    category: "Legislation"
  },

  // --- advanced (8) ---
  {
    id: 33,
    question: "BS EN 1004-1:2020 specifies three load classes. What is the uniformly distributed load for Load Class 2?",
    options: [
      "0.75 kN/m\u00B2",
      "1.5 kN/m\u00B2",
      "2.0 kN/m\u00B2",
      "3.0 kN/m\u00B2"
    ],
    correctAnswer: 1,
    explanation: "Load Class 2 permits a uniformly distributed load of 1.5 kN/m\u00B2 on the working platform. Class 1 is 0.75 kN/m\u00B2 and Class 3 is 2.0 kN/m\u00B2.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 34,
    question: "Under CDM 2015, at what point does a project become notifiable to the HSE?",
    options: [
      "When any scaffolding is used",
      "When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days",
      "When the project value exceeds £250,000",
      "When work at height over 4 metres is involved"
    ],
    correctAnswer: 1,
    explanation: "A project is notifiable under CDM 2015 when the construction work will last longer than 30 working days and have more than 20 workers simultaneously at any point, or exceed 500 person-days of construction work.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 35,
    question: "The Work at Height Regulations 2005, Regulation 12 requires that inspection reports for work equipment at height must include specific information. How long must these reports be kept?",
    options: [
      "Until the next inspection",
      "At least 3 months after the inspection",
      "Until the end of the project",
      "Until the next inspection at the place of work or, if at a construction site, for 3 months after"
    ],
    correctAnswer: 3,
    explanation: "Regulation 12 requires that inspection reports are kept until the next inspection of that equipment at that site, or on a construction site for a minimum of 3 months after the inspection date.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 36,
    question: "BS EN 1004-1:2020 replaced the previous BS EN 1004:2004. Which key change was introduced in the 2020 revision regarding base dimensions?",
    options: [
      "All towers must now be double-width only",
      "The standard now recognises a wider range of base plan dimensions rather than fixed sizes",
      "Single-width towers are no longer permitted under the standard",
      "The minimum platform width was increased to 1.0 metre"
    ],
    correctAnswer: 1,
    explanation: "The 2020 revision recognised a wider range of base plan dimensions instead of the fixed standard sizes of the 2004 version, allowing for greater design flexibility whilst maintaining structural requirements.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Legislation"
  },
  {
    id: 37,
    question: "Under CDM 2015, which duty holder must prepare a health and safety file for the project and pass it to the Client at the end of the construction phase?",
    options: [
      "Principal Contractor",
      "Principal Designer",
      "Client",
      "Every contractor on site"
    ],
    correctAnswer: 1,
    explanation: "The Principal Designer is responsible for preparing, reviewing, updating and revising the health and safety file, and must pass it to the Client at the end of the project.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "CDM 2015",
    category: "Legislation"
  },
  {
    id: 38,
    question: "The Work at Height Regulations 2005, Regulation 4 requires that work at height is properly planned. Which of the following must be included in the planning?",
    options: [
      "Selection of equipment only",
      "Planning for emergencies and rescue",
      "Weather forecasts for the next month",
      "Insurance certificates"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires that the planning of work at height includes planning for emergencies and rescue. This is a critical requirement that must be addressed before work begins.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "WAHR 2005",
    category: "Legislation"
  },
  {
    id: 39,
    question: "In terms of PASMA training, what is the difference between the 'Towers for Users' and the 'Work at Height Essentials' courses?",
    options: [
      "There is no difference; they are the same course",
      "Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)",
      "Work at Height Essentials is for managers; Towers for Users is for operatives",
      "Towers for Users is an online-only course"
    ],
    correctAnswer: 1,
    explanation: "The PASMA Towers for Users course covers the assembly, dismantling and safe use of towers. The Work at Height Essentials course is designed for those who use pre-erected towers and does not cover assembly or dismantling.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "PASMA",
    category: "Legislation"
  },
  {
    id: 40,
    question: "Under the Work at Height Regulations 2005, Regulation 6 outlines that when selecting work equipment for work at height, the duty holder must give collective protection measures priority over what?",
    options: [
      "Any other form of risk assessment",
      "Personal protection measures",
      "The manufacturer's instructions",
      "Existing site procedures"
    ],
    correctAnswer: 1,
    explanation: "Regulation 6 requires that collective protection measures (e.g. guardrails, platforms) must be given priority over personal protection measures (e.g. harnesses) when selecting equipment for work at height.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "WAHR 2005",
    category: "Legislation"
  },

  // =======================================================================
  // TOWER TYPES — 40 questions (id 41–80)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 41,
    question: "What is the most common material used to manufacture standard mobile access towers?",
    options: [
      "Steel",
      "Aluminium alloy",
      "Glass-reinforced plastic (GRP)",
      "Timber"
    ],
    correctAnswer: 1,
    explanation: "The vast majority of standard mobile access towers are manufactured from aluminium alloy due to its lightweight properties and corrosion resistance.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Tower materials",
    category: "Tower Types"
  },
  {
    id: 42,
    question: "What is the typical platform width of a single-width mobile access tower?",
    options: [
      "0.45 metres",
      "0.65 metres (approximately)",
      "1.0 metres",
      "1.35 metres"
    ],
    correctAnswer: 1,
    explanation: "A standard single-width tower has a platform width of approximately 0.65 metres (some manufacturers specify 0.7 m). This narrower width makes it suitable for restricted areas.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Tower dimensions",
    category: "Tower Types"
  },
  {
    id: 43,
    question: "What is the typical platform width of a double-width mobile access tower?",
    options: [
      "0.65 metres",
      "1.0 metres",
      "1.35 metres (approximately)",
      "2.0 metres"
    ],
    correctAnswer: 2,
    explanation: "A standard double-width tower has a platform width of approximately 1.35 metres, providing a larger and more stable working platform than single-width towers.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Tower dimensions",
    category: "Tower Types"
  },
  {
    id: 44,
    question: "What is the required minimum height for guardrails on a mobile access tower?",
    options: [
      "750 mm",
      "850 mm",
      "950 mm",
      "1100 mm"
    ],
    correctAnswer: 2,
    explanation: "Guardrails on mobile access towers must be at a minimum height of 950 mm above the working platform, in accordance with BS EN 1004-1:2020.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 45,
    question: "What is the minimum height for toeboards on a mobile access tower?",
    options: [
      "50 mm",
      "100 mm",
      "150 mm",
      "200 mm"
    ],
    correctAnswer: 2,
    explanation: "Toeboards must be at least 150 mm high to prevent tools, materials and debris from falling off the edge of the working platform.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 46,
    question: "At what approximate height should the mid-rail be positioned on a mobile access tower guardrail system?",
    options: [
      "250 mm",
      "470 mm",
      "600 mm",
      "750 mm"
    ],
    correctAnswer: 1,
    explanation: "The mid-rail should be positioned at approximately 470 mm (roughly halfway between the toeboard and the top guardrail) to reduce the gap through which a person could fall.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 47,
    question: "What is the maximum safe working load typically specified for a single platform on a standard mobile access tower?",
    options: [
      "150 kg",
      "200 kg",
      "275 kg",
      "500 kg"
    ],
    correctAnswer: 2,
    explanation: "The maximum safe working load for a single platform is typically 275 kg. This includes the weight of persons, tools and materials on the platform.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Safe working loads",
    category: "Tower Types"
  },
  {
    id: 48,
    question: "What is the typical maximum total load for a standard mobile access tower (all platforms combined)?",
    options: [
      "275 kg",
      "500 kg",
      "950 kg",
      "1500 kg"
    ],
    correctAnswer: 2,
    explanation: "The typical maximum total load for the entire tower structure (all platforms combined) is 950 kg, which must not be exceeded.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Safe working loads",
    category: "Tower Types"
  },
  {
    id: 49,
    question: "Which type of wheel is fitted to the base of a mobile access tower to allow it to be moved?",
    options: [
      "Pneumatic tyre",
      "Castor",
      "Roller bearing",
      "Track wheel"
    ],
    correctAnswer: 1,
    explanation: "Castors are fitted to the base of mobile access towers. They allow the tower to be moved and must have a locking mechanism to prevent movement during use.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Castors",
    category: "Tower Types"
  },
  {
    id: 50,
    question: "What is the primary purpose of outriggers on a mobile access tower?",
    options: [
      "To increase the platform area",
      "To increase the effective base dimension and improve stability",
      "To protect the tower from vehicle impact",
      "To provide a mounting point for safety nets"
    ],
    correctAnswer: 1,
    explanation: "Outriggers increase the effective base dimension of the tower, improving its stability and resistance to overturning, particularly at greater heights.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Stabilisers",
    category: "Tower Types"
  },
  {
    id: 51,
    question: "In which environment would a GRP (glass-reinforced plastic) tower be preferred over an aluminium tower?",
    options: [
      "On soft ground",
      "Near overhead electrical conductors or in electrically sensitive areas",
      "In extremely cold conditions",
      "On steep slopes"
    ],
    correctAnswer: 1,
    explanation: "GRP towers are non-conductive and are preferred when working near overhead electrical conductors, live electrical equipment, or in electrically sensitive environments such as substations.",
    section: "Module 2",
    difficulty: "basic",
    topic: "GRP towers",
    category: "Tower Types"
  },
  {
    id: 52,
    question: "What is the main advantage of aluminium alloy over steel for mobile access towers?",
    options: [
      "Aluminium is cheaper to produce",
      "Aluminium is significantly lighter, making towers easier to handle and transport",
      "Aluminium is stronger than steel",
      "Aluminium does not require maintenance"
    ],
    correctAnswer: 1,
    explanation: "Aluminium alloy is approximately one-third the weight of steel, making towers much lighter and easier to transport, carry and assemble on site.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Tower materials",
    category: "Tower Types"
  },
  {
    id: 53,
    question: "What is the function of a stabiliser on a mobile access tower?",
    options: [
      "To level the tower on uneven ground",
      "To prevent the tower from overturning by increasing the effective base size",
      "To lock the castors in position",
      "To act as a handrail"
    ],
    correctAnswer: 1,
    explanation: "Stabilisers are fitted to the tower to increase the effective base dimension, which increases resistance to overturning. They must be used in accordance with the manufacturer's instructions.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Stabilisers",
    category: "Tower Types"
  },
  {
    id: 54,
    question: "What component of a mobile access tower provides primary edge protection to prevent persons falling from the platform?",
    options: [
      "Bracing diagonal",
      "Guardrail system (top rail, mid-rail and toeboard)",
      "Platform trapdoor",
      "Base plate"
    ],
    correctAnswer: 1,
    explanation: "The guardrail system, comprising the top guardrail (950 mm), mid-rail (470 mm) and toeboard (150 mm), provides primary edge protection on all exposed sides of the working platform.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Components",
    category: "Tower Types"
  },

  // --- intermediate (18) ---
  {
    id: 55,
    question: "What Beaufort scale wind force should cause all work on a mobile access tower to cease?",
    options: [
      "Beaufort 3 (gentle breeze)",
      "Beaufort 4 (moderate breeze)",
      "Beaufort 5 (fresh breeze)",
      "Beaufort 6 (strong breeze)"
    ],
    correctAnswer: 1,
    explanation: "Work should cease at Beaufort Force 4 (moderate breeze, 13-18 mph). At this level, loose paper and small branches move, and wind forces on the tower and operative become significant.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Wind limits",
    category: "Tower Types"
  },
  {
    id: 56,
    question: "At what Beaufort scale force is a freestanding mobile access tower at risk of being blown over, even when unoccupied?",
    options: [
      "Beaufort 4",
      "Beaufort 5",
      "Beaufort 6",
      "Beaufort 8"
    ],
    correctAnswer: 2,
    explanation: "At Beaufort Force 6 (strong breeze, 25-31 mph), freestanding towers are at risk of overturning even when unoccupied. Towers should be dismantled or tied to the structure if strong winds are forecast.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Wind limits",
    category: "Tower Types"
  },
  {
    id: 57,
    question: "What is the purpose of diagonal bracing on a mobile access tower?",
    options: [
      "To provide additional platforms",
      "To provide rigidity and prevent the frame from racking (parallelogramming)",
      "To act as a ladder for climbing",
      "To support the guardrails"
    ],
    correctAnswer: 1,
    explanation: "Diagonal bracing provides structural rigidity to the tower and prevents the frames from racking (parallelogramming), which would compromise the tower's structural integrity.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 58,
    question: "When selecting castors for a mobile access tower, which feature is essential for safe use?",
    options: [
      "Pneumatic tyres for shock absorption",
      "A locking mechanism that can be engaged to prevent movement",
      "Castors must be painted a bright colour",
      "All castors must swivel 360 degrees at all times"
    ],
    correctAnswer: 1,
    explanation: "Castors must have a reliable locking mechanism that can be engaged to prevent movement while the tower is in use. All castors must be locked before the tower is climbed or used.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Castors",
    category: "Tower Types"
  },
  {
    id: 59,
    question: "What is the height-to-base ratio for a standard mobile access tower used outdoors?",
    options: [
      "2:1",
      "3:1",
      "3.5:1",
      "4:1"
    ],
    correctAnswer: 1,
    explanation: "For outdoor use, the maximum height-to-minimum base dimension ratio is 3:1. For indoor use (no wind loading), the ratio can be increased to 3.5:1.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 60,
    question: "What is the height-to-base ratio for a mobile access tower used indoors?",
    options: [
      "2:1",
      "3:1",
      "3.5:1",
      "4:1"
    ],
    correctAnswer: 2,
    explanation: "For indoor use where there is no wind loading, the height-to-minimum base dimension ratio can be up to 3.5:1. This allows a taller tower on the same base compared with outdoor use.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 61,
    question: "What is an AGR frame on a mobile access tower?",
    options: [
      "A type of adjustable guardrail frame that provides collective fall protection during assembly",
      "A reinforced frame for heavy-duty industrial towers",
      "A frame designed exclusively for GRP towers",
      "A frame that replaces the need for bracing"
    ],
    correctAnswer: 0,
    explanation: "An AGR (Advance Guard Rail) frame is a specially designed frame that automatically provides guardrail protection as it is raised into position, giving collective fall protection during the assembly process.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "AGR frames",
    category: "Tower Types"
  },
  {
    id: 62,
    question: "Why is it important that all components of a mobile access tower come from the same manufacturer?",
    options: [
      "It makes the tower look more uniform",
      "Components from different manufacturers may not be compatible and could compromise structural integrity",
      "It is only a recommendation, not a requirement",
      "Different manufacturers use different paint colours"
    ],
    correctAnswer: 1,
    explanation: "Mixing components from different manufacturers is dangerous because dimensions, connection methods and structural ratings may differ, potentially compromising the structural integrity of the tower.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 63,
    question: "What is the purpose of adjustable leg/castor mechanisms on a mobile access tower?",
    options: [
      "To vary the tower height",
      "To level the tower on slightly uneven ground",
      "To replace the need for outriggers",
      "To adjust the platform size"
    ],
    correctAnswer: 1,
    explanation: "Adjustable legs allow the tower to be levelled on slightly uneven ground, ensuring the tower remains plumb and stable. The adjustment range is limited and should not be used on severely sloping surfaces.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 64,
    question: "What is the purpose of a trapdoor (hatch) platform on a mobile access tower?",
    options: [
      "To provide ventilation inside the tower",
      "To allow safe internal access through the platform whilst maintaining full guardrail protection",
      "To reduce the weight of the platform",
      "To allow materials to be hoisted through the tower"
    ],
    correctAnswer: 1,
    explanation: "A trapdoor platform allows the operative to climb through the platform via an internal ladder whilst maintaining the full guardrail protection. The trap must be closed after access.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 65,
    question: "When should stabilisers or outriggers be used on a mobile access tower?",
    options: [
      "Only when the tower is over 10 metres",
      "Whenever specified in the manufacturer's instruction manual for the configuration being erected",
      "Only when working outdoors",
      "Only when more than two people are on the platform"
    ],
    correctAnswer: 1,
    explanation: "Stabilisers and outriggers must be used whenever the manufacturer's instruction manual specifies them for the particular tower configuration being erected. The requirement depends on the height and base dimensions.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Stabilisers",
    category: "Tower Types"
  },
  {
    id: 66,
    question: "A mobile access tower with a 1.35 m wide base is used outdoors. Using the 3:1 ratio, what is the maximum platform height that can be achieved without stabilisers?",
    options: [
      "2.7 metres",
      "4.05 metres",
      "4.725 metres",
      "This cannot be determined from the ratio alone; the manufacturer's manual must be consulted"
    ],
    correctAnswer: 3,
    explanation: "Whilst the 3:1 ratio gives a theoretical figure, the actual safe height depends on many factors including the specific tower design, platform length, and loading. The manufacturer's instruction manual must always be consulted.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 67,
    question: "What is the primary disadvantage of a GRP tower compared with an aluminium alloy tower?",
    options: [
      "GRP towers cannot be used outdoors",
      "GRP towers are typically heavier and more expensive",
      "GRP towers cannot have guardrails fitted",
      "GRP towers cannot exceed 4 metres in height"
    ],
    correctAnswer: 1,
    explanation: "GRP towers are typically heavier than aluminium towers and more expensive to manufacture. However, their non-conductive properties make them essential for electrical work.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "GRP towers",
    category: "Tower Types"
  },
  {
    id: 68,
    question: "What is a 'span frame' (also known as an 'end frame') on a mobile access tower?",
    options: [
      "The horizontal platform",
      "The vertical frame that connects across the width of the tower, incorporating the rungs for climbing",
      "A diagonal bracing member",
      "The outrigger attachment point"
    ],
    correctAnswer: 1,
    explanation: "A span frame (end frame) is the vertical H-shaped frame that spans the width of the tower. It includes the vertical uprights and horizontal rungs used for climbing.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 69,
    question: "What type of platform should be used on a mobile access tower where tools and materials are present?",
    options: [
      "A platform with no toeboard requirement",
      "A full-length platform with toeboards on all open sides",
      "A mesh platform only",
      "A platform with guardrails only; toeboards are optional"
    ],
    correctAnswer: 1,
    explanation: "Where tools and materials are present, the platform must have toeboards on all open sides (minimum 150 mm) to prevent items falling from the platform and striking persons below.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Components",
    category: "Tower Types"
  },
  {
    id: 70,
    question: "Approximately what wind speed range does Beaufort Force 4 (moderate breeze) correspond to?",
    options: [
      "1–5 mph",
      "8–12 mph",
      "13–18 mph",
      "25–31 mph"
    ],
    correctAnswer: 2,
    explanation: "Beaufort Force 4 (moderate breeze) corresponds to approximately 13–18 mph (20–28 km/h). At this force, dust and loose paper are raised and small branches move.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Wind limits",
    category: "Tower Types"
  },
  {
    id: 71,
    question: "What factor determines whether a single-width or double-width tower should be selected for a task?",
    options: [
      "The colour preference of the site manager",
      "The available space, nature of the work, duration, and the tools and materials to be used on the platform",
      "Single-width towers must always be used indoors",
      "Double-width towers are only for heights above 8 metres"
    ],
    correctAnswer: 1,
    explanation: "Selection depends on practical factors: available space (access restrictions), the nature and duration of the work, and the weight and volume of tools and materials required on the platform.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Tower selection",
    category: "Tower Types"
  },
  {
    id: 72,
    question: "What is the significance of the term 'platform height' versus 'working height' on a mobile access tower?",
    options: [
      "They mean the same thing",
      "Platform height is the height of the working platform; working height is typically platform height plus approximately 2 metres (average reach)",
      "Working height is always exactly double the platform height",
      "Platform height includes the guardrail height"
    ],
    correctAnswer: 1,
    explanation: "Platform height is the height of the working platform above ground. Working height is the maximum height at which work can be carried out, typically the platform height plus approximately 2 metres for average reach.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Tower dimensions",
    category: "Tower Types"
  },

  // --- advanced (8) ---
  {
    id: 73,
    question: "Under BS EN 1004-1:2020, what concentrated point load must a working platform withstand in addition to the uniformly distributed load?",
    options: [
      "0.5 kN",
      "1.0 kN",
      "1.5 kN applied over a 100 mm x 100 mm area",
      "2.5 kN"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1004-1:2020 requires working platforms to withstand a concentrated point load of 1.5 kN applied over an area of 100 mm x 100 mm, in addition to meeting the uniformly distributed load requirements.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Tower Types"
  },
  {
    id: 74,
    question: "When calculating the height-to-base ratio, which dimension is used as the 'base' measurement?",
    options: [
      "The length of the longest side",
      "The average of width and length",
      "The minimum base dimension (the shorter side)",
      "The diagonal measurement"
    ],
    correctAnswer: 2,
    explanation: "The height-to-base ratio uses the minimum base dimension (shortest side) because this is the direction most vulnerable to overturning. For example, a 1.35 m wide by 2.5 m long tower uses 1.35 m.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 75,
    question: "What effect does attaching sheeting or banners to a mobile access tower have on its stability?",
    options: [
      "No significant effect",
      "It significantly increases the wind loading on the tower, greatly increasing the risk of overturning",
      "It improves stability by adding weight",
      "It is permitted if the sheeting is below half the tower height"
    ],
    correctAnswer: 1,
    explanation: "Sheeting or banners dramatically increase the surface area exposed to wind, greatly increasing the wind loading on the tower and the risk of overturning. Sheeting should never be attached unless the manufacturer's instructions specifically allow it with appropriate additional stabilisation.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Wind limits",
    category: "Tower Types"
  },
  {
    id: 76,
    question: "For a mobile access tower used on a mezzanine floor or elevated surface, what additional risk must be considered?",
    options: [
      "The colour of the tower may clash with the decor",
      "The tower may be more visible to others",
      "A fall from the tower could result in a greater total fall distance, and edge protection at the mezzanine edge must be maintained",
      "Mezzanine floors are always unsuitable for towers"
    ],
    correctAnswer: 2,
    explanation: "When a tower is erected on an elevated surface, the total potential fall distance increases (tower height plus mezzanine height). Edge protection at the mezzanine perimeter must also be maintained to prevent falls from the elevated surface.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 77,
    question: "A tower is to be erected adjacent to an excavation. What is the minimum recommended distance from the edge of the excavation to the nearest tower support?",
    options: [
      "No minimum distance is required",
      "At least 1 metre or as specified by the site geotechnical assessment",
      "The depth of the excavation multiplied by 1.5, or as determined by a competent person",
      "500 mm"
    ],
    correctAnswer: 2,
    explanation: "The minimum safe distance from an excavation depends on the depth and soil conditions. As a general guide, the distance should be at least 1.5 times the depth, but a competent person should assess the specific conditions.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Ground conditions",
    category: "Tower Types"
  },
  {
    id: 78,
    question: "Why must castors on a mobile access tower have a minimum wheel diameter specified by the manufacturer?",
    options: [
      "For aesthetic reasons",
      "Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring",
      "Larger wheels make the tower taller",
      "It is only a suggestion, not a requirement"
    ],
    correctAnswer: 1,
    explanation: "Castor wheel diameter affects load distribution, ground pressure, and the ability to traverse minor floor imperfections. Wheels that are too small may sink, damage flooring, or fail under load.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Castors",
    category: "Tower Types"
  },
  {
    id: 79,
    question: "What is the 'overturning moment' in relation to mobile access tower stability?",
    options: [
      "The time taken for a tower to fall over",
      "The force multiplied by the distance that tends to tip the tower about its base edge",
      "The weight of the tower base",
      "The maximum permitted wind speed"
    ],
    correctAnswer: 1,
    explanation: "The overturning moment is the product of any horizontal force (such as wind) and the vertical distance from the base to the point where the force acts. It must be less than the stabilising moment (weight multiplied by base dimension) for the tower to remain upright.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Stability",
    category: "Tower Types"
  },
  {
    id: 80,
    question: "BS EN 1004-1:2020 permits what maximum castor/wheel deflection under full test load?",
    options: [
      "No deflection is permitted",
      "5 mm",
      "The standard does not specify a maximum deflection for castors; it specifies overall tower deflection limits",
      "25 mm"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1004-1:2020 specifies overall structural performance criteria for the tower, including maximum lateral deflection under load. Individual castor deflection limits are a matter for the castor manufacturer's specification, not the tower standard itself.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "BS EN 1004",
    category: "Tower Types"
  },

  // =======================================================================
  // ASSEMBLY — 40 questions (id 81–120)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 81,
    question: "What must be carried out before any mobile access tower is assembled on site?",
    options: [
      "A site survey and risk assessment",
      "A full structural engineering report",
      "Permission from the local council",
      "An environmental impact assessment"
    ],
    correctAnswer: 0,
    explanation: "A site survey and risk assessment must be carried out before assembly to identify ground conditions, overhead hazards, access restrictions, and any other risks specific to the location.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Planning",
    category: "Assembly"
  },
  {
    id: 82,
    question: "What does '3T' stand for in the 3T method of tower assembly?",
    options: [
      "Three-Tier Tower",
      "Through The Trap",
      "Three-Tool Technique",
      "Timed Tower Test"
    ],
    correctAnswer: 1,
    explanation: "3T stands for 'Through The Trap'. It is a method of assembly where the operative climbs through the trapdoor in the platform to gain access to each new level.",
    section: "Module 3",
    difficulty: "basic",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 83,
    question: "What does 'AGR' stand for in the AGR method of tower assembly?",
    options: [
      "Advance Guard Rail",
      "Automated Ground Release",
      "Adjustable Guardrail Rig",
      "Assembly Guide Reference"
    ],
    correctAnswer: 0,
    explanation: "AGR stands for 'Advance Guard Rail'. This method uses specially designed frames with built-in guardrails that rise automatically into the protective position as the frame is lifted.",
    section: "Module 3",
    difficulty: "basic",
    topic: "AGR method",
    category: "Assembly"
  },
  {
    id: 84,
    question: "What is the minimum number of persons recommended to assemble a mobile access tower?",
    options: [
      "1 person",
      "2 persons",
      "3 persons",
      "4 persons"
    ],
    correctAnswer: 1,
    explanation: "A minimum of 2 persons is recommended for the safe assembly and dismantling of a mobile access tower. One person works on the tower whilst the other passes components and assists from ground level.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Personnel",
    category: "Assembly"
  },
  {
    id: 85,
    question: "Before climbing a newly assembled mobile access tower, what must be done to all castors?",
    options: [
      "They must be removed",
      "They must be locked (brakes engaged)",
      "They must be greased",
      "They must be pointed in the same direction"
    ],
    correctAnswer: 1,
    explanation: "All castors must be locked (brakes firmly engaged) before anyone climbs or works on the tower. This prevents the tower from rolling and potentially overturning.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Safety checks",
    category: "Assembly"
  },
  {
    id: 86,
    question: "In the 3T method, from which position does the operative install the guardrails at each new level?",
    options: [
      "From the outside of the tower using a ladder",
      "From the platform below, reaching up through the open trapdoor",
      "From a cherry picker alongside the tower",
      "From the ground using ropes"
    ],
    correctAnswer: 1,
    explanation: "In the 3T method, the operative stands on the platform below and reaches up through the open trapdoor to install guardrails at the next level, maintaining protection at all times.",
    section: "Module 3",
    difficulty: "basic",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 87,
    question: "What should be checked about the ground before placing a mobile access tower?",
    options: [
      "The colour of the ground surface",
      "That it is firm, level and capable of supporting the tower and its load",
      "That it is waterproofed",
      "That it is free from vegetation"
    ],
    correctAnswer: 1,
    explanation: "The ground must be firm, level and capable of supporting the total weight of the tower, plus operatives, tools and materials. Soft, uneven or sloping ground can cause the tower to sink or overturn.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Ground assessment",
    category: "Assembly"
  },
  {
    id: 88,
    question: "In what order should a mobile access tower be dismantled?",
    options: [
      "From the bottom up",
      "From the middle outwards",
      "In the reverse order to assembly (top down)",
      "All components can be removed in any order"
    ],
    correctAnswer: 2,
    explanation: "Towers must always be dismantled in the reverse order to assembly, working from the top down. This ensures the operative always has adequate protection during the dismantling process.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Dismantling",
    category: "Assembly"
  },
  {
    id: 89,
    question: "During tower assembly, components should be passed to the operative on the tower by what method?",
    options: [
      "Thrown up to the operative",
      "Handed up by a person at ground level or the level below",
      "Hoisted by crane",
      "Carried up a separate ladder"
    ],
    correctAnswer: 1,
    explanation: "Components should be passed hand-to-hand from a person at ground level or the level below. They should never be thrown, as this risks injury and damage to components.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Safe handling",
    category: "Assembly"
  },
  {
    id: 90,
    question: "What PPE is typically required when assembling a mobile access tower?",
    options: [
      "Only high-visibility clothing",
      "Safety helmet, safety footwear, gloves and high-visibility clothing as appropriate to the site",
      "Full body harness at all times",
      "No PPE is required if using the 3T method"
    ],
    correctAnswer: 1,
    explanation: "Typical PPE includes a safety helmet, safety footwear, and gloves. High-visibility clothing is usually required on construction sites. Additional PPE may be needed depending on the site risk assessment.",
    section: "Module 3",
    difficulty: "basic",
    topic: "PPE",
    category: "Assembly"
  },
  {
    id: 91,
    question: "After assembly, what document should be available at the base of the tower?",
    options: [
      "The manufacturer's instruction manual and/or a handover certificate",
      "The site plan",
      "The tower manufacturer's annual report",
      "A photograph of the completed tower"
    ],
    correctAnswer: 0,
    explanation: "The manufacturer's instruction manual (or a copy) and/or a handover certificate should be available so that users can verify the tower has been correctly assembled and understand safe use requirements.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Documentation",
    category: "Assembly"
  },
  {
    id: 92,
    question: "Which of the following must NOT be used as a substitute for a proper tower platform?",
    options: [
      "A trapdoor platform",
      "A solid aluminium deck",
      "Loose scaffold boards or planks placed across the frame",
      "A manufacturer-supplied lightweight platform"
    ],
    correctAnswer: 2,
    explanation: "Loose scaffold boards or planks must never be used as a substitute for a proper platform. Only platforms designed and supplied by the tower manufacturer for that specific tower should be used.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Components",
    category: "Assembly"
  },
  {
    id: 93,
    question: "When assembling a mobile access tower, what is the first step after positioning the base frames and castors?",
    options: [
      "Fit the guardrails at maximum height",
      "Level the tower and lock all castors",
      "Attach stabilisers",
      "Place the top platform"
    ],
    correctAnswer: 1,
    explanation: "After positioning the base frames with castors, the first step is to ensure the tower is level (using adjustable legs if necessary) and to lock all castors firmly before adding any height.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Assembly sequence",
    category: "Assembly"
  },
  {
    id: 94,
    question: "During assembly, why must the trapdoor in the platform always be closed after climbing through?",
    options: [
      "To prevent water ingress",
      "To maintain the full platform area for working and prevent falls through the opening",
      "To reduce wind loading",
      "Closing the trap is optional"
    ],
    correctAnswer: 1,
    explanation: "The trapdoor must be closed after climbing through to maintain the full working area of the platform and to prevent anyone from accidentally falling through the open hatch.",
    section: "Module 3",
    difficulty: "basic",
    topic: "3T method",
    category: "Assembly"
  },

  // --- intermediate (18) ---
  {
    id: 95,
    question: "What is the key advantage of the AGR method over the 3T method during tower assembly?",
    options: [
      "AGR towers are cheaper",
      "The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap",
      "AGR towers can be erected by one person",
      "AGR towers do not require castors"
    ],
    correctAnswer: 1,
    explanation: "The key advantage of AGR is that the advance guardrail system provides collective fall protection at all times during assembly. The operative is always protected by guardrails, unlike the 3T method where there is a brief period of reduced protection.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "AGR method",
    category: "Assembly"
  },
  {
    id: 96,
    question: "In the 3T assembly method, at what point is the operative most at risk of a fall?",
    options: [
      "When locking the castors",
      "When climbing through the trap opening before guardrails at the new level are fully installed",
      "When attaching the base frames",
      "When fitting the diagonal bracing"
    ],
    correctAnswer: 1,
    explanation: "The operative is most at risk when climbing through the trap to the next level, as the guardrails at that new level have not yet been installed. This is why the 3T method requires the operative to remain within the trap opening until guardrails are fitted.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 97,
    question: "What is the correct sequence for the 3T method of tower assembly at each new level?",
    options: [
      "Climb through trap, fit platform, fit guardrails, fit bracing",
      "Fit guardrails from below through the trap, fit platform, climb through trap, fit bracing",
      "From the level below: fit frames, fit bracing, fit platform with trap, climb through trap, fit guardrails from inside the trap opening",
      "Fit all bracing first, then all platforms, then all guardrails"
    ],
    correctAnswer: 2,
    explanation: "The 3T sequence is: from the level below, fit the frames, add diagonal bracing, place the platform with trapdoor, climb up through the trap, and then fit the guardrails from within the trap opening before stepping onto the platform.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "3T method",
    category: "Assembly"
  },
  {
    id: 98,
    question: "When should stabilisers be fitted during the assembly of a mobile access tower?",
    options: [
      "After the tower has reached its full height",
      "At the height specified in the manufacturer's instruction manual",
      "Only if the tower wobbles",
      "Stabilisers are always optional"
    ],
    correctAnswer: 1,
    explanation: "Stabilisers must be fitted at the height specified in the manufacturer's instruction manual. Building beyond this height without stabilisers compromises the tower's stability.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Stabilisers",
    category: "Assembly"
  },
  {
    id: 99,
    question: "During assembly, an operative notices that a horizontal brace is bent. What should they do?",
    options: [
      "Straighten it on site and continue",
      "Remove it from use, tag it as defective, and use a replacement component from the same manufacturer",
      "Use it anyway as it will be hidden by the platform",
      "Cut off the bent section"
    ],
    correctAnswer: 1,
    explanation: "Damaged components must never be used. The bent brace should be removed from service, clearly tagged as defective, and replaced with a correct component from the same manufacturer.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Defect management",
    category: "Assembly"
  },
  {
    id: 100,
    question: "What should be done if the ground at the base of the tower is slightly soft?",
    options: [
      "Proceed with assembly as normal",
      "Use sole boards (spreader plates) under the castors to distribute the load over a larger area",
      "Build the tower taller to compensate",
      "Fill in the soft area with loose rubble"
    ],
    correctAnswer: 1,
    explanation: "Sole boards (spreader plates) should be placed under the castors to distribute the point load over a larger area and prevent the castors from sinking into the ground. The ground must still be assessed as adequate.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Ground assessment",
    category: "Assembly"
  },
  {
    id: 101,
    question: "During the site survey before tower assembly, which overhead hazard must be specifically assessed?",
    options: [
      "Clouds",
      "Overhead power lines, cables, beams and any other overhead obstructions",
      "Passing aircraft",
      "Satellites"
    ],
    correctAnswer: 1,
    explanation: "Overhead power lines, cables, structural beams, pipes and other obstructions must be identified during the site survey. Contact with overhead power lines can be fatal.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Site survey",
    category: "Assembly"
  },
  {
    id: 102,
    question: "What is the recommended minimum exclusion zone at the base of a tower during assembly?",
    options: [
      "No exclusion zone is needed",
      "The area directly below the working area plus a margin for falling objects, typically established with barriers and warning signs",
      "Exactly 1 metre from each side",
      "The entire building must be evacuated"
    ],
    correctAnswer: 1,
    explanation: "An exclusion zone should be established around the base of the tower during assembly and dismantling to protect persons from falling components. Barriers and warning signs should be used.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Site survey",
    category: "Assembly"
  },
  {
    id: 103,
    question: "When dismantling a tower using the 3T method, what must be done before removing the guardrails at any level?",
    options: [
      "All persons must leave the tower entirely",
      "The operative must be positioned inside the trapdoor opening (protected by the trap sides) before guardrails are removed",
      "The guardrails can be removed with the operative standing on the platform",
      "A safety net must be erected below"
    ],
    correctAnswer: 1,
    explanation: "Before removing guardrails, the operative must position themselves within the trap opening so they are protected by the sides of the trap. This is the reverse of the assembly procedure.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Dismantling",
    category: "Assembly"
  },
  {
    id: 104,
    question: "Can a mobile access tower be safely assembled on a slope?",
    options: [
      "Yes, as long as the slope is less than 45 degrees",
      "No, towers must always be erected on firm, level ground — the base must be levelled using adjustable legs within the manufacturer's specified range",
      "Yes, as long as additional bracing is used",
      "Yes, if the castors are angled"
    ],
    correctAnswer: 1,
    explanation: "Towers must be erected on firm, level ground. Minor variations can be compensated using adjustable legs within the manufacturer's specified range, but sloping or uneven ground beyond this range is unsuitable.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Ground assessment",
    category: "Assembly"
  },
  {
    id: 105,
    question: "What check must be performed on all connection points (spigots, clips, spring catches) during assembly?",
    options: [
      "They must be painted before use",
      "Each connection must be fully engaged, secure and locked in its correct position",
      "They must be lubricated",
      "Only visual checks from the ground are needed"
    ],
    correctAnswer: 1,
    explanation: "Every connection point must be checked to ensure it is fully engaged, secure and locked in the correct position. Partially engaged connections can fail under load or during use.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Assembly sequence",
    category: "Assembly"
  },
  {
    id: 106,
    question: "What should happen to all tools and materials on the platform before the tower is moved to a new location?",
    options: [
      "They should be secured with rope",
      "They must be removed from the platform entirely",
      "They can remain if they weigh less than 10 kg",
      "They should be placed in the centre of the platform"
    ],
    correctAnswer: 1,
    explanation: "All tools, materials and loose items must be removed from the platform before moving the tower. Loose items could fall during movement, and the additional weight and height of the centre of gravity could affect stability.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Moving towers",
    category: "Assembly"
  },
  {
    id: 107,
    question: "During tower assembly in a high-traffic area, what additional measure should be taken?",
    options: [
      "Assembly should be done only at night",
      "Barriers, warning signs and banksmen/spotters should be used to control pedestrian and vehicle movement near the tower",
      "No additional measures are needed",
      "The tower must be painted in a bright colour"
    ],
    correctAnswer: 1,
    explanation: "In high-traffic areas, barriers, warning signs and banksmen/spotters should be used to control pedestrian and vehicle movement and protect both the assembly team and passers-by.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Site survey",
    category: "Assembly"
  },
  {
    id: 108,
    question: "When fitting diagonal bracing to a tower during assembly, what is the primary consideration?",
    options: [
      "The bracing should match the colour of the frames",
      "The bracing must be fitted in the correct orientation and on the correct faces as specified by the manufacturer",
      "Only one diagonal per bay is needed",
      "Bracing is optional below 4 metres"
    ],
    correctAnswer: 1,
    explanation: "Diagonal bracing must be fitted exactly as specified in the manufacturer's instruction manual, including correct orientation and placement on the correct faces. Incorrect bracing compromises the tower's structural integrity.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Assembly sequence",
    category: "Assembly"
  },
  {
    id: 109,
    question: "After completing the assembly of a mobile access tower, who should carry out the first use inspection?",
    options: [
      "Any person on site",
      "The tower manufacturer",
      "A competent person",
      "The site security guard"
    ],
    correctAnswer: 2,
    explanation: "A competent person must carry out an inspection after assembly and before the tower is first used. They must verify that the tower has been assembled correctly in accordance with the manufacturer's instructions.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Safety checks",
    category: "Assembly"
  },
  {
    id: 110,
    question: "What is the correct procedure if, during assembly, the wind increases to Beaufort Force 4?",
    options: [
      "Continue assembly but work faster",
      "Cease assembly work, secure the partially built tower if possible, and do not resume until conditions improve",
      "Add extra bracing and continue",
      "Only the top section needs to be left for later"
    ],
    correctAnswer: 1,
    explanation: "Work must cease at Beaufort Force 4. The partially built tower should be secured if possible (e.g. tied to the structure), and assembly must not resume until wind conditions have improved.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Wind precautions",
    category: "Assembly"
  },
  {
    id: 111,
    question: "What is the purpose of an intermediate platform (non-working platform) within a tower?",
    options: [
      "It is purely decorative",
      "It provides additional stiffness to the tower structure and serves as a rest point during climbing",
      "It replaces the need for bracing",
      "It is only required for towers above 20 metres"
    ],
    correctAnswer: 1,
    explanation: "Intermediate platforms add structural stiffness, reduce unsupported frame lengths, and provide rest points for operatives climbing the internal ladder. They are fitted at intervals specified by the manufacturer.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Components",
    category: "Assembly"
  },
  {
    id: 112,
    question: "During dismantling, how should components be lowered from the tower?",
    options: [
      "Dropped to the ground from each level",
      "Passed hand-to-hand to a person at the level below or lowered carefully to the ground",
      "Carried down the internal ladder by the operative",
      "Left on each platform to be collected at the end"
    ],
    correctAnswer: 1,
    explanation: "Components must be passed hand-to-hand to a person at the level below or carefully lowered to the ground. They must never be dropped, as this risks injury and can damage components.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Dismantling",
    category: "Assembly"
  },

  // --- advanced (8) ---
  {
    id: 113,
    question: "When erecting a tower near a fragile roof, what additional planning is required?",
    options: [
      "No additional planning as the tower provides edge protection",
      "Barriers must prevent anyone from stepping off the tower platform onto the fragile surface, and warning signs must be displayed",
      "The tower must be at least 2 metres away from the roof",
      "The fragile roof must be covered with netting"
    ],
    correctAnswer: 1,
    explanation: "When near fragile surfaces, barriers or physical measures must prevent anyone stepping from the tower onto the fragile surface. Warning signs must be displayed, and the risk assessment must specifically address the proximity of the fragile roof.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Site survey",
    category: "Assembly"
  },
  {
    id: 114,
    question: "If a tower is to be left unattended overnight on a construction site, what precautions should be taken?",
    options: [
      "No precautions are needed",
      "Remove the lowest section of internal access (ladder/climb frames), display warning signs, and check weather forecasts for high winds",
      "Place a padlock on the top platform",
      "Cover the tower with tarpaulin"
    ],
    correctAnswer: 1,
    explanation: "Remove the lowest means of access to prevent unauthorised climbing. Display warning signs and check the weather forecast. If strong winds are expected, consider dismantling the tower or tying it to a permanent structure.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Site security",
    category: "Assembly"
  },
  {
    id: 115,
    question: "During assembly on a reinforced concrete upper floor, what must be verified about the floor before erecting the tower?",
    options: [
      "The colour of the floor",
      "That the floor has adequate load-bearing capacity for the total tower load including dynamic forces during assembly",
      "That the floor is polished",
      "That the floor has drainage"
    ],
    correctAnswer: 1,
    explanation: "The floor must have adequate load-bearing capacity for the total weight of the tower, plus operatives, tools and materials, plus dynamic forces during assembly (e.g. lifting frames). A structural assessment may be required.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Ground assessment",
    category: "Assembly"
  },
  {
    id: 116,
    question: "When assembling a linked tower system (two towers joined by a bridging platform), what additional requirement applies?",
    options: [
      "Both towers must be the same colour",
      "Both towers must be from the same manufacturer and be the same type, and must be assembled to the same height before the bridge is fitted",
      "Only one tower needs castors",
      "Linked towers do not need guardrails on the bridge"
    ],
    correctAnswer: 1,
    explanation: "Both towers must be identical (same manufacturer and type), erected to the same height, and levelled before the bridging platform is fitted. Guardrails must be provided on all exposed edges of the bridge.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Linked towers",
    category: "Assembly"
  },
  {
    id: 117,
    question: "When is it acceptable to modify a mobile access tower from the manufacturer's specified configuration?",
    options: [
      "When the site conditions require it",
      "When a qualified scaffold designer has assessed and approved the modification in writing",
      "It is never acceptable; the tower must only be built to the manufacturer's instruction manual configurations",
      "When the site manager gives verbal permission"
    ],
    correctAnswer: 2,
    explanation: "Mobile access towers must only be assembled in the configurations specified in the manufacturer's instruction manual. Any modification outside these configurations invalidates the design and may be unsafe.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Assembly sequence",
    category: "Assembly"
  },
  {
    id: 118,
    question: "During assembly of a tall tower (above 8 metres), what additional check should be performed at regular intervals as the tower grows?",
    options: [
      "The tower should be photographed",
      "The tower's verticality (plumb) should be checked at intervals using a spirit level, and adjustable legs should be readjusted if necessary",
      "The tower should be painted at each level",
      "No additional checks are needed above 8 metres"
    ],
    correctAnswer: 1,
    explanation: "As the tower grows taller, small deviations from plumb are amplified. The tower's verticality should be checked at regular intervals and adjustable legs readjusted to maintain the tower in a truly vertical position.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Assembly sequence",
    category: "Assembly"
  },
  {
    id: 119,
    question: "What special consideration applies when assembling a tower inside a building with an automatic sprinkler system?",
    options: [
      "The tower must be earthed to the sprinkler pipework",
      "The tower and any work performed must not obstruct or damage sprinkler heads, and the fire safety manager should be informed",
      "Sprinkler systems have no relevance to tower assembly",
      "The sprinkler system must be drained before work begins"
    ],
    correctAnswer: 1,
    explanation: "Sprinkler heads must not be obstructed, damaged or removed. The fire safety manager should be informed so that any necessary temporary measures can be implemented whilst the tower is in place.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Site survey",
    category: "Assembly"
  },
  {
    id: 120,
    question: "When a tower must be tied to a permanent structure for additional stability, what is the correct method of tying?",
    options: [
      "Use any available rope or cable",
      "Use ties at intervals and positions specified by the manufacturer, secured to structurally adequate anchor points, with ties capable of resisting both tension and compression",
      "A single tie at the top of the tower is sufficient",
      "Ties are only needed on windy days"
    ],
    correctAnswer: 1,
    explanation: "Ties must be fitted at the intervals and positions specified by the manufacturer's instruction manual, secured to structurally adequate anchor points. Ties must resist both tension (pull) and compression (push) forces.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Stability",
    category: "Assembly"
  },

  // =======================================================================
  // INSPECTION — 40 questions (id 121–160)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 121,
    question: "How often must a pre-use visual check be carried out on a mobile access tower?",
    options: [
      "Weekly",
      "Before each use (daily as a minimum)",
      "Monthly",
      "Only after bad weather"
    ],
    correctAnswer: 1,
    explanation: "A pre-use visual check must be carried out before each use and at the start of every working day as a minimum. This is a quick check by the user to ensure nothing obvious has changed.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 122,
    question: "Under the Work at Height Regulations 2005, how often must a formal inspection of a mobile access tower be carried out on a construction site?",
    options: [
      "Every 3 days",
      "Every 7 days",
      "Every 14 days",
      "Every 28 days"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations require a formal inspection at least every 7 days when the tower is on a construction site. The inspection must be recorded in writing.",
    section: "Module 4",
    difficulty: "basic",
    topic: "7-day inspection",
    category: "Inspection"
  },
  {
    id: 123,
    question: "A formal inspection of a mobile access tower must be carried out by whom?",
    options: [
      "Any person on site",
      "A competent person",
      "Only the tower manufacturer's representative",
      "The site cleaner"
    ],
    correctAnswer: 1,
    explanation: "Formal inspections must be carried out by a competent person — someone with sufficient training and experience or knowledge to identify defects and assess the tower's safety.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Competent person",
    category: "Inspection"
  },
  {
    id: 124,
    question: "When must a mobile access tower be inspected in addition to the regular 7-day cycle?",
    options: [
      "Only when requested by the client",
      "After initial assembly, after any event that could affect stability (e.g. strong winds, accidental impact), and after any modification",
      "Only after an accident involving the tower",
      "Once a month"
    ],
    correctAnswer: 1,
    explanation: "Inspections are required: after initial assembly before first use; after any event likely to have affected stability (strong winds, vehicle impact); and after any alteration, modification or relocation.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Inspection triggers",
    category: "Inspection"
  },
  {
    id: 125,
    question: "What is the purpose of a pre-use visual check on a mobile access tower?",
    options: [
      "To replace the formal 7-day inspection",
      "To quickly identify any obvious defects, missing components or changes since the last use",
      "To check that the tower looks presentable",
      "To measure the exact height of the tower"
    ],
    correctAnswer: 1,
    explanation: "The pre-use check is a quick visual assessment to identify any obvious defects, missing components, damage or unauthorised changes that may have occurred since the tower was last used.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 126,
    question: "What key information must be recorded in a formal tower inspection report?",
    options: [
      "Only the name of the inspector",
      "The tower location, date, details of the inspection, any defects found, actions taken, and the name of the competent person",
      "The cost of the tower",
      "The names of everyone who used the tower that week"
    ],
    correctAnswer: 1,
    explanation: "A formal inspection report must include: the location, date, tower identification, details of what was inspected, any defects found, actions taken, and the name and signature of the competent person.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Documentation",
    category: "Inspection"
  },
  {
    id: 127,
    question: "During a pre-use check, which of the following would require the tower to be taken out of use immediately?",
    options: [
      "A small scratch on the paintwork",
      "A missing guardrail or toeboard",
      "A label that is slightly faded",
      "Dust on the platform"
    ],
    correctAnswer: 1,
    explanation: "A missing guardrail or toeboard is a critical defect that removes edge protection. The tower must be taken out of use immediately and not used until the missing component is replaced.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Defect identification",
    category: "Inspection"
  },
  {
    id: 128,
    question: "Who is responsible for ensuring that tower inspections are carried out at the required intervals?",
    options: [
      "The tower manufacturer",
      "The employer or person controlling the work",
      "PASMA",
      "The local authority"
    ],
    correctAnswer: 1,
    explanation: "The employer or person controlling the work is responsible for ensuring that all required inspections (pre-use, 7-day, and event-triggered) are carried out and properly recorded.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Responsibilities",
    category: "Inspection"
  },
  {
    id: 129,
    question: "What should be checked regarding the castors during a pre-use inspection?",
    options: [
      "That they are the correct colour",
      "That all castors are present, undamaged, and that the brakes lock and release properly",
      "That they have been recently oiled",
      "That they are the largest available size"
    ],
    correctAnswer: 1,
    explanation: "During a pre-use check, verify that all castors are present, free from damage, and that the locking brakes engage and release properly. Faulty castors could allow the tower to move unexpectedly.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 130,
    question: "During an inspection, what condition of a horizontal brace would indicate it must be replaced?",
    options: [
      "Surface discolouration",
      "A visible bend, crack, dent or missing locking mechanism",
      "Manufacturer's label is worn",
      "Minor surface scratching"
    ],
    correctAnswer: 1,
    explanation: "A visible bend, crack, significant dent or missing/damaged locking mechanism indicates structural compromise. The brace must be removed from service and replaced with an undamaged component.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Defect identification",
    category: "Inspection"
  },
  {
    id: 131,
    question: "What is the definition of a 'competent person' for the purpose of tower inspections?",
    options: [
      "Anyone who has worked on a construction site",
      "A person with sufficient training, experience or knowledge to identify defects and assess the tower's fitness for continued use",
      "Only a chartered structural engineer",
      "The most senior person on site"
    ],
    correctAnswer: 1,
    explanation: "A competent person is someone with sufficient training, experience or knowledge and other qualities that allow them to properly identify defects and assess whether the tower is fit for continued use.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Competent person",
    category: "Inspection"
  },
  {
    id: 132,
    question: "What should be checked about the tower's stability during a pre-use inspection?",
    options: [
      "That the tower matches the architect's drawings",
      "That the tower is plumb, level, on firm ground, and that stabilisers/outriggers are correctly fitted and secure",
      "That the tower is painted in a visible colour",
      "That the tower is the tallest structure on site"
    ],
    correctAnswer: 1,
    explanation: "Check that the tower is plumb (vertical), the base is level, the ground is firm, and any required stabilisers or outriggers are correctly positioned, extended and secured.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 133,
    question: "What must happen if a formal 7-day inspection reveals a significant defect?",
    options: [
      "Record the defect and continue using the tower",
      "The tower must be taken out of use, the defect repaired or the component replaced, and the tower re-inspected before use resumes",
      "Notify the tower manufacturer only",
      "Apply tape to mark the defect"
    ],
    correctAnswer: 1,
    explanation: "If a significant defect is found, the tower must be immediately taken out of use. The defect must be repaired or the component replaced, and the tower must be re-inspected by a competent person before use can resume.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Defect management",
    category: "Inspection"
  },
  {
    id: 134,
    question: "During a pre-use check, you notice that one outrigger is not in contact with the ground. What should you do?",
    options: [
      "Ignore it as the other outriggers are in place",
      "Do not use the tower; report the issue so that the outrigger can be adjusted to make firm contact with the ground",
      "Place a piece of cardboard under it",
      "Remove the outrigger entirely"
    ],
    correctAnswer: 1,
    explanation: "All outriggers must be in firm contact with the ground to provide their stabilising function. An outrigger not touching the ground provides no benefit. The tower must not be used until corrected.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Pre-use checks",
    category: "Inspection"
  },

  // --- intermediate (18) ---
  {
    id: 135,
    question: "What does a Tower Inspection Record typically consist of?",
    options: [
      "A verbal agreement between the supervisor and the operative",
      "A written or electronic record covering: tower identification, location, date, configuration, defects found, actions taken, and the inspector's details",
      "A photograph only",
      "An email to the client"
    ],
    correctAnswer: 1,
    explanation: "A Tower Inspection Record is a formal written or electronic document that records all relevant details of the inspection, including identification, location, date, configuration, defects, corrective actions, and the competent person's details.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Inspection"
  },
  {
    id: 136,
    question: "How long must inspection records be retained on a construction site?",
    options: [
      "24 hours",
      "Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months",
      "Permanently",
      "Records are not required to be retained"
    ],
    correctAnswer: 1,
    explanation: "Inspection records must be kept until the next inspection at that place of work. On a construction site, they must be retained for at least 3 months after the date of the inspection.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Inspection"
  },
  {
    id: 137,
    question: "During an inspection, what aspects of the guardrail system should be specifically checked?",
    options: [
      "Colour and appearance only",
      "That top guardrails are at the correct height (950 mm), mid-rails are present, toeboards are in place, and all connections are secure",
      "That the guardrails have been recently painted",
      "That the guardrails match other towers on site"
    ],
    correctAnswer: 1,
    explanation: "Check that top guardrails are at the correct height (minimum 950 mm), mid-rails are present at approximately 470 mm, toeboards are in place (minimum 150 mm), and all fixing points are fully engaged and secure.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Guardrail checks",
    category: "Inspection"
  },
  {
    id: 138,
    question: "After strong winds overnight (Beaufort 6+), what must happen before a tower can be used the following morning?",
    options: [
      "A quick glance from the ground is sufficient",
      "A full inspection by a competent person must be carried out before the tower is used",
      "Only check the bracing",
      "No additional inspection is required if the tower looks upright"
    ],
    correctAnswer: 1,
    explanation: "After any event that could affect the tower's stability (including strong winds), a full inspection by a competent person must be carried out before the tower is used. The event triggers an additional inspection requirement.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Inspection triggers",
    category: "Inspection"
  },
  {
    id: 139,
    question: "What should be checked about the tower's bracing during a formal inspection?",
    options: [
      "That it is the correct colour",
      "That all bracing members are present, correctly positioned, undamaged, and that all clips/connections are fully engaged",
      "That the bracing is symmetrical only",
      "Bracing does not need to be inspected"
    ],
    correctAnswer: 1,
    explanation: "All diagonal and horizontal bracing must be present, correctly positioned as per the manufacturer's instructions, free from damage (bends, cracks, dents), and all clips and connections fully engaged and locked.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Structural checks",
    category: "Inspection"
  },
  {
    id: 140,
    question: "During an inspection, corrosion is found on several aluminium components. What action is appropriate?",
    options: [
      "Paint over the corrosion to prevent it spreading",
      "Assess the severity: light surface oxidation is normal for aluminium, but significant pitting or structural corrosion requires the component to be taken out of service",
      "All corroded components must be immediately scrapped",
      "Corrosion on aluminium is impossible"
    ],
    correctAnswer: 1,
    explanation: "Light surface oxidation is normal on aluminium alloy and does not affect structural integrity. However, significant pitting corrosion, particularly near connection points or welds, could weaken the component and requires it to be removed from service.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Defect identification",
    category: "Inspection"
  },
  {
    id: 141,
    question: "A tower has been relocated to a new position on site. What inspection is required?",
    options: [
      "No inspection is needed if it was moved less than 10 metres",
      "A full inspection by a competent person, as relocation is treated the same as re-erection",
      "Only the castors need to be checked",
      "A verbal confirmation from the operative is sufficient"
    ],
    correctAnswer: 1,
    explanation: "After relocation, a full inspection by a competent person is required. The move may have affected the tower's level, castor locks, brace connections, or stability, and the new ground conditions must be assessed.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Inspection triggers",
    category: "Inspection"
  },
  {
    id: 142,
    question: "What visual indicator on a tower component suggests it has been previously overloaded?",
    options: [
      "A slight colour change",
      "Permanent deformation (bend, bow or twist) in a frame member, brace or platform",
      "Surface dust",
      "A manufacturer's sticker"
    ],
    correctAnswer: 1,
    explanation: "Permanent deformation such as bends, bows or twists in structural members indicates the component has been subjected to forces beyond its design capacity. It must be removed from service.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Defect identification",
    category: "Inspection"
  },
  {
    id: 143,
    question: "During a pre-use check, you notice that the platform trapdoor does not close flush. What does this indicate?",
    options: [
      "It is a minor cosmetic issue",
      "The platform may be damaged, incorrectly seated, or an obstruction may be present — the tower should not be used until the cause is identified and resolved",
      "It is normal for trapdoors not to close fully",
      "Only the trap hinge needs oiling"
    ],
    correctAnswer: 1,
    explanation: "A trapdoor that does not close flush may indicate platform damage, incorrect seating, a bent hinge, or an obstruction. The tower should not be used until the cause is identified and corrected.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Pre-use checks",
    category: "Inspection"
  },
  {
    id: 144,
    question: "What should be specifically checked about the platforms during an inspection?",
    options: [
      "That platforms are the correct colour",
      "That platforms are correctly seated, undamaged, windlocks engaged, trapdoors functioning, and surfaces are not excessively worn or slippery",
      "That platforms have been washed",
      "Platforms do not require inspection"
    ],
    correctAnswer: 1,
    explanation: "Check that platforms are correctly seated on the frames, undamaged, windlocks are engaged (to prevent wind lifting them), trapdoors open and close properly, and surfaces are not excessively worn, damaged or slippery.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Structural checks",
    category: "Inspection"
  },
  {
    id: 145,
    question: "If an unauthorised modification is discovered during a 7-day inspection (e.g. a missing brace that someone has removed), what must happen?",
    options: [
      "Replace the brace and continue",
      "The tower must be taken out of use immediately, the modification reversed, and a full re-inspection carried out before use resumes",
      "Report it at the next site meeting",
      "The modification is acceptable if the tower seems stable"
    ],
    correctAnswer: 1,
    explanation: "Unauthorised modifications are a serious safety concern. The tower must be taken out of use, the modification reversed (component replaced), and a full inspection carried out by a competent person before the tower can be used again.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Defect management",
    category: "Inspection"
  },
  {
    id: 146,
    question: "What check should be made regarding the ground conditions during a routine inspection?",
    options: [
      "No ground checks are needed after initial assembly",
      "Verify that the ground has not deteriorated (e.g. due to rain, excavation nearby, or loading) and that sole boards are still effective",
      "Check that the ground is the same colour as before",
      "Ground checks are the responsibility of the client only"
    ],
    correctAnswer: 1,
    explanation: "Ground conditions can change over time due to weather, nearby excavation, or loading. Regular checks should verify that the ground remains firm, level and capable of supporting the tower's load.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Ground checks",
    category: "Inspection"
  },
  {
    id: 147,
    question: "What inspection is required after a vehicle has struck a mobile access tower, even if no obvious damage is visible?",
    options: [
      "No inspection is needed if there is no visible damage",
      "A full inspection by a competent person before the tower is used again",
      "Only check the point of impact",
      "Photograph the tower and continue using it"
    ],
    correctAnswer: 1,
    explanation: "Any impact, even if no obvious damage is visible, could have caused hidden structural damage, loosened connections, or affected the tower's level and stability. A full inspection by a competent person is required.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Inspection triggers",
    category: "Inspection"
  },
  {
    id: 148,
    question: "During an inspection, a spring clip on a frame connection is found to be missing. What should happen?",
    options: [
      "Use tape as a temporary replacement",
      "The tower must not be used until the clip is replaced with the correct manufacturer's component",
      "A cable tie is an acceptable substitute",
      "Missing clips are not a safety concern"
    ],
    correctAnswer: 1,
    explanation: "Spring clips are critical safety components that prevent frames from disconnecting. The tower must not be used until the correct replacement clip from the manufacturer is fitted.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Defect identification",
    category: "Inspection"
  },
  {
    id: 149,
    question: "When inspecting the access route within the tower (internal ladder/climb frames), what should be checked?",
    options: [
      "That the rungs are painted",
      "That all rungs are present, undamaged, free from grease or debris, and that the access route is clear of obstructions",
      "That the ladder extends above the top platform by 1 metre",
      "Access routes do not need inspection"
    ],
    correctAnswer: 1,
    explanation: "Check that all rungs are present, undamaged, and free from grease, ice, debris or other slip hazards. The access route through the tower must be clear of obstructions at every level.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Structural checks",
    category: "Inspection"
  },
  {
    id: 150,
    question: "What is the inspector's responsibility if they believe the tower is unsafe to use?",
    options: [
      "They should make a note but allow work to continue",
      "They must immediately prevent the tower from being used (e.g. by removing access and displaying a 'Do Not Use' notice) and report to the responsible person",
      "They should email the manufacturer",
      "They should wait for the 7-day inspection"
    ],
    correctAnswer: 1,
    explanation: "If the tower is deemed unsafe, the inspector must take immediate action to prevent its use — typically by removing the lowest means of access and displaying a prominent 'Do Not Use' notice — and report the situation to the responsible person.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Responsibilities",
    category: "Inspection"
  },
  {
    id: 151,
    question: "When multiple towers are in use on the same site, how should inspection records be managed?",
    options: [
      "A single generic record covers all towers",
      "Each tower must have its own individual inspection record, clearly identified with its unique location or reference number",
      "Only the tallest tower needs formal records",
      "Inspection records are only needed for towers over 4 metres"
    ],
    correctAnswer: 1,
    explanation: "Each tower must have its own individual inspection record clearly identifying which specific tower was inspected, including its location or unique reference number. Generic records covering 'all towers' are not sufficient.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Inspection"
  },
  {
    id: 152,
    question: "What information on the tower's product label should be verified during a formal inspection?",
    options: [
      "The label does not need to be checked",
      "That the label is present, legible, and the tower configuration matches the label's stated maximum platform height and load class",
      "Only that the label is attached",
      "That the label is the correct colour"
    ],
    correctAnswer: 1,
    explanation: "Verify that the product label is present and legible, and critically, that the tower's actual configuration (height, width, stabiliser arrangement) does not exceed the label's stated maximum platform height or load class.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Structural checks",
    category: "Inspection"
  },

  // --- advanced (8) ---
  {
    id: 153,
    question: "The Work at Height Regulations 2005, Regulation 12 specifies the content of inspection reports. Which of the following is NOT a required element?",
    options: [
      "Name and address of the person for whom the inspection was carried out",
      "Location and description of the equipment inspected",
      "The purchase price of the equipment",
      "Details of any matter identified that could give rise to a risk to health or safety"
    ],
    correctAnswer: 2,
    explanation: "Regulation 12 requires: identity of the equipment, location, date, details of the inspection, matters identified that could give rise to risk, actions taken, and details of the person carrying out the inspection. Purchase price is not required.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Documentation",
    category: "Inspection"
  },
  {
    id: 154,
    question: "What is the legal status of a tower inspection report under the Work at Height Regulations 2005?",
    options: [
      "It is a guideline document only",
      "It is a legal document that can be required for production by an HSE inspector and may be used as evidence in legal proceedings",
      "It has no legal standing",
      "It is only valid if signed by a PASMA instructor"
    ],
    correctAnswer: 1,
    explanation: "The inspection report is a legal document under the Work at Height Regulations. It can be required for production by an HSE inspector and may be used as evidence in enforcement action or legal proceedings.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Documentation",
    category: "Inspection"
  },
  {
    id: 155,
    question: "A tower on a construction site has not been used for 12 days but remains erected. How many formal inspections should have been completed in this period?",
    options: [
      "None, as the tower was not in use",
      "One (at the 7-day mark)",
      "Two (at 7 days and after any use would resume)",
      "The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use"
    ],
    correctAnswer: 3,
    explanation: "The 7-day inspection cycle applies continuously whilst the tower is erected, regardless of whether it is being used. At least one inspection at the 7-day mark is required, and a further pre-use inspection would be needed before use resumes.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "7-day inspection",
    category: "Inspection"
  },
  {
    id: 156,
    question: "When inspecting a tower that has been exposed to chemical contamination (e.g. near a chemical spill), what additional assessment is required?",
    options: [
      "Wipe the tower clean and continue",
      "Assess whether the chemicals could have caused material degradation (e.g. chemical attack on aluminium or GRP), consult the manufacturer's guidance on chemical compatibility, and decontaminate before handling",
      "Chemical contamination does not affect metal towers",
      "Paint the affected areas"
    ],
    correctAnswer: 1,
    explanation: "Certain chemicals can attack aluminium alloy or GRP. The manufacturer's guidance on chemical compatibility must be consulted, affected components assessed for material degradation, and the tower must be decontaminated before handling.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Defect identification",
    category: "Inspection"
  },
  {
    id: 157,
    question: "What is the significance of checking weld integrity during a formal inspection of aluminium tower components?",
    options: [
      "Welds are decorative features only",
      "Cracked, corroded or incomplete welds indicate potential structural failure at the joint, which is a critical defect requiring immediate removal of the component",
      "Weld integrity cannot be assessed visually",
      "Only steel towers have welded joints"
    ],
    correctAnswer: 1,
    explanation: "Aluminium alloy tower components rely on welded joints for structural integrity. Cracked, corroded, or incomplete welds could lead to joint failure under load. This is a critical defect requiring immediate removal from service.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Defect identification",
    category: "Inspection"
  },
  {
    id: 158,
    question: "If an inspection reveals that a tower exceeds the maximum configuration shown in the manufacturer's instruction manual, what is the correct course of action?",
    options: [
      "Record it as a minor issue",
      "The tower must be immediately taken out of use and reduced to a compliant configuration or dismantled entirely",
      "Add extra bracing to compensate",
      "Get verbal approval from the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "A tower erected beyond its design limits is structurally unsafe. It must be immediately taken out of use and either reduced to a configuration that complies with the manufacturer's manual or dismantled entirely.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Defect management",
    category: "Inspection"
  },
  {
    id: 159,
    question: "How should defective tower components be managed once removed from service?",
    options: [
      "Placed back in the general stock",
      "Clearly tagged/marked as defective, segregated from usable stock, and returned to the supplier or disposed of to prevent inadvertent re-use",
      "Left beside the tower for others to see",
      "Repaired on site by welding"
    ],
    correctAnswer: 1,
    explanation: "Defective components must be clearly tagged as defective, physically segregated from usable stock to prevent accidental re-use, and returned to the supplier for assessment or properly disposed of.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Defect management",
    category: "Inspection"
  },
  {
    id: 160,
    question: "A client requests a copy of the tower inspection records. Under the Work at Height Regulations, within what timeframe must a copy be provided?",
    options: [
      "Within 7 days",
      "Within 24 hours of the request",
      "Within 28 days",
      "There is no obligation to provide a copy"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 12 of the Work at Height Regulations 2005, a copy of the inspection report must be provided to any person on whose behalf the inspection was carried out within 24 hours of the request.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Documentation",
    category: "Inspection"
  },

  // =======================================================================
  // HAZARDS — 40 questions (id 161–200)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 161,
    question: "What is the most common cause of fatal accidents involving mobile access towers?",
    options: [
      "Electrical shock",
      "Falls from height (due to collapse, overturning, or falling from an unprotected platform)",
      "Being struck by the tower during transport",
      "Chemical exposure"
    ],
    correctAnswer: 1,
    explanation: "Falls from height are the most common cause of fatal accidents involving mobile access towers. These result from tower collapse, overturning, or falls from platforms without adequate edge protection.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Common accidents",
    category: "Hazards"
  },
  {
    id: 162,
    question: "What is the risk assessment '5-step process' recommended by the HSE?",
    options: [
      "Plan, Do, Check, Act, Review",
      "Identify hazards, decide who might be harmed, evaluate risks, record findings, review and update",
      "Observe, Record, Report, Amend, Close",
      "Start, Assess, Proceed, Evaluate, Finish"
    ],
    correctAnswer: 1,
    explanation: "The HSE's 5 steps to risk assessment are: (1) identify the hazards, (2) decide who might be harmed and how, (3) evaluate the risks and decide on precautions, (4) record your findings and implement them, (5) review and update.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Risk assessment",
    category: "Hazards"
  },
  {
    id: 163,
    question: "Why must no person remain on a mobile access tower while it is being moved?",
    options: [
      "It voids the insurance",
      "The tower could overturn, the person could fall, and they have no control over the direction of travel",
      "It is only advisable but not a strict rule",
      "The person adds too much weight"
    ],
    correctAnswer: 1,
    explanation: "Moving a tower with a person on it is extremely dangerous. The tower could overturn if it hits an obstruction, the person could lose balance and fall, and the elevated centre of gravity significantly increases the risk of overturning.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Moving towers",
    category: "Hazards"
  },
  {
    id: 164,
    question: "What is the main risk of overloading a mobile access tower platform?",
    options: [
      "The platform surface may scratch",
      "Structural failure of the platform or tower components, potentially causing collapse",
      "It makes the tower heavier to move",
      "Overloading has no effect on safety"
    ],
    correctAnswer: 1,
    explanation: "Overloading can cause structural failure of the platform or supporting components, potentially leading to collapse. The maximum platform load (typically 275 kg) must never be exceeded.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Common accidents",
    category: "Hazards"
  },
  {
    id: 165,
    question: "What is the primary hazard of using a mobile access tower near overhead power lines?",
    options: [
      "Radio interference",
      "Electrocution from contact with or arcing from the power lines",
      "Magnetic interference with tools",
      "Noise from the power lines"
    ],
    correctAnswer: 1,
    explanation: "Contact with overhead power lines or being within arcing distance is almost always fatal. Electricity can arc across a gap without direct contact, particularly at higher voltages.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Overhead power lines",
    category: "Hazards"
  },
  {
    id: 166,
    question: "What should you do if you see someone climbing the outside of a mobile access tower?",
    options: [
      "Nothing, as it is their choice",
      "Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted",
      "Help them by holding the tower",
      "Report it at the end of the day"
    ],
    correctAnswer: 1,
    explanation: "Climbing the outside of a tower is extremely dangerous as there is no fall protection. It must be stopped immediately. Access should only be via the internal access route (ladder through the trapdoor).",
    section: "Module 5",
    difficulty: "basic",
    topic: "Unsafe practices",
    category: "Hazards"
  },
  {
    id: 167,
    question: "What does RIDDOR stand for?",
    options: [
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Recording of Industrial Defects, Damages and Official Reports",
      "Register of Incidents, Deficiencies and Departmental Oversight Records",
      "Regulation for Identifying Dangerous and Destructive Operational Risks"
    ],
    correctAnswer: 0,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. It requires the reporting of specified workplace injuries, diseases and dangerous occurrences to the HSE.",
    section: "Module 5",
    difficulty: "basic",
    topic: "RIDDOR",
    category: "Hazards"
  },
  {
    id: 168,
    question: "Which of the following is an unsafe practice when using a mobile access tower?",
    options: [
      "Locking all castors before climbing",
      "Leaning out over the guardrail to extend reach",
      "Closing the trapdoor after climbing through",
      "Checking the weather before starting work"
    ],
    correctAnswer: 1,
    explanation: "Leaning out over the guardrail is extremely dangerous as it shifts the centre of gravity outward, increasing the risk of the tower overturning or the person falling over the guardrail.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Unsafe practices",
    category: "Hazards"
  },
  {
    id: 169,
    question: "What is the risk of leaving tools and materials unsecured on a tower platform?",
    options: [
      "They may get dirty",
      "They can fall from the platform and strike persons below, causing serious injury or death",
      "They reduce the available workspace",
      "They may rust"
    ],
    correctAnswer: 1,
    explanation: "Unsecured tools and materials can fall from the platform edge and strike persons below. Even a small tool dropped from height can cause serious or fatal injuries. Toeboards help prevent this.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Falling objects",
    category: "Hazards"
  },
  {
    id: 170,
    question: "What is suspension trauma?",
    options: [
      "Fear of heights",
      "A potentially fatal condition where blood pools in the legs of a person suspended motionless in a harness, reducing blood flow to vital organs",
      "Bruising caused by a safety harness",
      "A type of repetitive strain injury"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma (orthostatic intolerance) occurs when a person is suspended motionless in a harness. Blood pools in the legs, reducing flow to the heart and brain, which can be fatal within 15-20 minutes without rescue.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Suspension trauma",
    category: "Hazards"
  },
  {
    id: 171,
    question: "What is the correct rescue hierarchy if a person is stranded or injured on a tower?",
    options: [
      "Always call the fire brigade first",
      "Self-rescue first, then assisted rescue from the ground, then professional emergency services",
      "Professional services first, then assisted rescue",
      "Wait until the end of the shift"
    ],
    correctAnswer: 1,
    explanation: "The rescue hierarchy is: (1) self-rescue by the injured person if possible, (2) assisted rescue by trained colleagues from the ground, (3) professional emergency services (fire brigade, ambulance).",
    section: "Module 5",
    difficulty: "basic",
    topic: "Rescue",
    category: "Hazards"
  },
  {
    id: 172,
    question: "What hazard is created by failing to lock the castors before climbing a mobile access tower?",
    options: [
      "The tower will be difficult to dismantle later",
      "The tower could roll unexpectedly, causing loss of balance or overturning",
      "The castors will wear out faster",
      "No hazard is created"
    ],
    correctAnswer: 1,
    explanation: "Unlocked castors allow the tower to roll unexpectedly when force is applied (e.g. by climbing, wind, or leaning). This can cause loss of balance, falls, or tower overturning.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Common accidents",
    category: "Hazards"
  },
  {
    id: 173,
    question: "What is the main risk when a tower is erected on a surface that slopes in one direction?",
    options: [
      "The tower will be harder to climb",
      "The tower will lean to one side, reducing its stability and increasing the risk of overturning in that direction",
      "The castors will wear unevenly",
      "Paint may run off the surface"
    ],
    correctAnswer: 1,
    explanation: "A slope causes the tower to lean, shifting the centre of gravity towards the lower side and significantly reducing stability. The tower is much more likely to overturn in the direction of the slope.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Overturning",
    category: "Hazards"
  },
  {
    id: 174,
    question: "What is the risk of using a tower with missing or damaged bracing?",
    options: [
      "Reduced aesthetic appeal",
      "The tower loses structural rigidity and could collapse or rack (parallelogram) under load or wind",
      "Slightly reduced platform capacity only",
      "Missing bracing has no safety effect"
    ],
    correctAnswer: 1,
    explanation: "Missing or damaged bracing allows the tower to rack (distort into a parallelogram shape), which dramatically reduces its structural integrity and load capacity, potentially leading to collapse.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Common accidents",
    category: "Hazards"
  },

  // --- intermediate (18) ---
  {
    id: 175,
    question: "What is the minimum safe clearance distance from overhead power lines at 400 kV when positioning a mobile access tower?",
    options: [
      "3 metres",
      "6 metres",
      "9 metres minimum horizontal clearance (or as specified by the network operator)",
      "15 metres"
    ],
    correctAnswer: 2,
    explanation: "For 400 kV overhead power lines, the minimum safe clearance is 9 metres. However, you should always consult the network operator (National Grid/DNO) for site-specific guidance. For lower voltages, smaller distances may apply.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Overhead power lines",
    category: "Hazards"
  },
  {
    id: 176,
    question: "When moving a mobile access tower, what is the maximum height recommended before the tower should be reduced or dismantled?",
    options: [
      "There is no height limit for moving",
      "4 metres platform height (unless the manufacturer's instructions state otherwise)",
      "8 metres",
      "The full erected height"
    ],
    correctAnswer: 1,
    explanation: "Towers should generally be reduced to no more than 4 metres platform height before moving (unless the manufacturer's instructions permit otherwise). The higher the tower, the greater the risk of overturning during movement.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Moving towers",
    category: "Hazards"
  },
  {
    id: 177,
    question: "Before moving a mobile access tower, which of the following precautions must be taken?",
    options: [
      "Only unlock two of the four castors",
      "Ensure no persons are on the tower, remove all loose materials, check the route for obstructions and overhead hazards, and unlock all castors",
      "Just push the tower; no preparation is needed",
      "Only check for overhead hazards"
    ],
    correctAnswer: 1,
    explanation: "Before moving: ensure no one is on the tower, remove all loose materials and tools, check the route for obstructions, holes, slopes and overhead hazards, then unlock all castors.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Moving towers",
    category: "Hazards"
  },
  {
    id: 178,
    question: "What additional hazard exists when using a mobile access tower in a public area?",
    options: [
      "Public attention may slow down work",
      "Members of the public could walk into the tower, attempt to climb it, or be struck by falling objects",
      "Public areas always have overhead power lines",
      "There are no additional hazards"
    ],
    correctAnswer: 1,
    explanation: "In public areas, members of the public could walk into the tower base, attempt to climb it, or be struck by falling objects. Adequate barriers, exclusion zones and warning signs must be provided.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Public safety",
    category: "Hazards"
  },
  {
    id: 179,
    question: "A risk assessment identifies the risk of a tower being struck by a vehicle on site. What control measure should be implemented?",
    options: [
      "Hope that drivers are careful",
      "Install physical barriers (e.g. concrete blocks, road cones) around the tower base to protect it from vehicle impact",
      "Move the tower every hour",
      "Paint the tower a bright colour only"
    ],
    correctAnswer: 1,
    explanation: "Physical barriers such as concrete blocks, crash barriers or heavy-duty road cones should be placed around the tower base to prevent vehicle impact. Signage and site traffic management plans also help.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Vehicle impact",
    category: "Hazards"
  },
  {
    id: 180,
    question: "Under RIDDOR, which of the following incidents involving a mobile access tower must be reported to the HSE?",
    options: [
      "A small dent in a tower component",
      "The collapse, overturning or failure of any scaffold (including a mobile access tower) from which a person could fall more than 2 metres",
      "A castor that is difficult to lock",
      "A minor delay in completing an inspection"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013, the collapse, overturning or failure of any scaffold (including a tower) from which a person could fall more than 2 metres is a 'dangerous occurrence' that must be reported to the HSE.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "RIDDOR",
    category: "Hazards"
  },
  {
    id: 181,
    question: "What is the risk of using a mobile access tower as a support for other structures (e.g. attaching a beam hoist or a ladder to the tower)?",
    options: [
      "It saves time and is good practice",
      "Additional loads and forces not accounted for in the tower's design can cause structural failure or overturning",
      "It is permitted if the additional load is less than 50 kg",
      "There is no risk if the tower is double-width"
    ],
    correctAnswer: 1,
    explanation: "Attaching hoists, ladders or other structures to a tower imposes additional vertical and horizontal loads not accounted for in the tower's design, risking structural failure or overturning. This must not be done unless the manufacturer's instructions specifically permit it.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Overloading",
    category: "Hazards"
  },
  {
    id: 182,
    question: "What is the danger of 'side loading' a mobile access tower?",
    options: [
      "It makes the tower harder to paint",
      "Horizontal forces applied to the side of the tower (e.g. from pulling cables, using power tools against walls) can cause overturning",
      "Side loading only affects the bracing",
      "Side loading is permitted up to 100 kg"
    ],
    correctAnswer: 1,
    explanation: "Side loading creates horizontal forces that can exceed the tower's overturning resistance, particularly at height. Activities like pulling cables, drilling into walls, or using pry bars can generate significant side loads.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Overturning",
    category: "Hazards"
  },
  {
    id: 183,
    question: "What environmental hazard should be considered when using a tower near water or wet areas?",
    options: [
      "The tower may get dirty",
      "Wet surfaces increase the risk of slipping during climbing, and waterlogged ground may not support the tower adequately",
      "Water has no effect on tower safety",
      "Only GRP towers can be used near water"
    ],
    correctAnswer: 1,
    explanation: "Wet surfaces on platforms and rungs increase slip risk. Waterlogged ground may be too soft to support the tower, causing it to sink or become unstable. Additional precautions such as anti-slip measures and sole boards may be needed.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Environmental hazards",
    category: "Hazards"
  },
  {
    id: 184,
    question: "What is the hazard of erecting a tower adjacent to an open edge (e.g. building perimeter without edge protection)?",
    options: [
      "There is no additional hazard",
      "A person could fall from the tower platform or during access and continue falling beyond the open edge to a lower level",
      "The open edge only affects aesthetics",
      "Open edges are only a hazard for scaffolding"
    ],
    correctAnswer: 1,
    explanation: "Working near an open edge creates a double fall hazard: a person falling from the tower could continue falling over the open edge to a much lower level. The open edge must be protected with separate edge protection.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Falls from height",
    category: "Hazards"
  },
  {
    id: 185,
    question: "What precaution should be taken when using a tower in an area where forklift trucks operate?",
    options: [
      "No special precautions are needed",
      "Establish an exclusion zone, use physical barriers, ensure forklift drivers are informed, and consider using a banksman",
      "Only work on the tower when forklifts are not moving",
      "Attach reflectors to the tower"
    ],
    correctAnswer: 1,
    explanation: "Forklift trucks pose a significant collision risk. An exclusion zone with physical barriers should be established, forklift drivers must be informed, and a banksman may be needed to control vehicle movements near the tower.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Vehicle impact",
    category: "Hazards"
  },
  {
    id: 186,
    question: "What is the risk of using a tower in an area with an unprotected floor opening nearby?",
    options: [
      "No risk if the tower is more than 1 metre away",
      "A person falling from the tower or stepping off the platform could fall through the floor opening to a lower level",
      "Floor openings are only a tripping hazard",
      "The floor opening only needs to be covered when the tower is being moved"
    ],
    correctAnswer: 1,
    explanation: "An unprotected floor opening near a tower creates an additional fall hazard. The opening must be covered or protected with guardrails before the tower is used, as a person could fall from the tower and then through the opening.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Falls from height",
    category: "Hazards"
  },
  {
    id: 187,
    question: "What action should be taken if a rescue is required from a mobile access tower and the person is unable to self-rescue?",
    options: [
      "Wait for them to recover",
      "Implement the site emergency rescue plan: trained colleagues attempt assisted rescue, and if unsuccessful, call the emergency services immediately",
      "Dismantle the tower around them",
      "Lower the tower with the person on it"
    ],
    correctAnswer: 1,
    explanation: "Follow the pre-planned rescue procedure: trained colleagues attempt assisted rescue from the ground. If this is unsuccessful, call emergency services (999) immediately. A rescue plan must be in place before work begins.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Rescue",
    category: "Hazards"
  },
  {
    id: 188,
    question: "What is the hazard of using a mobile access tower on a surface with a drain or manhole cover?",
    options: [
      "The drain may smell",
      "The cover may not support the concentrated point load from a castor, potentially collapsing and causing the tower to become unstable",
      "Drains have no effect on tower stability",
      "Only the castor above the drain needs to be locked"
    ],
    correctAnswer: 1,
    explanation: "Manhole covers and drain grates may not be designed to support the concentrated point load from a tower castor. They could collapse, causing the tower to become unstable or overturn. Castors should never be placed directly on covers.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Ground conditions",
    category: "Hazards"
  },
  {
    id: 189,
    question: "What hazard does ice or frost create on a mobile access tower?",
    options: [
      "It makes the tower more visible",
      "Ice on platforms, rungs and frames creates severe slip hazards and can also affect locking mechanisms on castors and connections",
      "Ice strengthens the tower structure",
      "Only black ice is a hazard"
    ],
    correctAnswer: 1,
    explanation: "Ice and frost on platforms, rungs and frame connections create severe slip hazards. Frozen locking mechanisms on castors and frame connections may not engage properly. Towers should not be used until ice is fully cleared.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Environmental hazards",
    category: "Hazards"
  },
  {
    id: 190,
    question: "What is the purpose of a rescue plan before commencing work on a mobile access tower?",
    options: [
      "It is a bureaucratic formality only",
      "To ensure that a clear procedure is in place to rescue a person who is stranded or injured on the tower, minimising the time they are at risk",
      "It is only required for towers above 10 metres",
      "The emergency services always provide rescue plans"
    ],
    correctAnswer: 1,
    explanation: "A rescue plan ensures that everyone on site knows what to do if a person is stranded or injured on the tower. Rapid rescue is critical, particularly if suspension trauma is a risk. The plan must be in place before work begins.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Rescue",
    category: "Hazards"
  },
  {
    id: 191,
    question: "When working near overhead power lines, what should be done if the tower or any component makes contact with a live conductor?",
    options: [
      "Pull the tower away immediately",
      "Do NOT touch the tower; warn others to stay clear; call the network operator and emergency services; do not approach until confirmed safe",
      "Continue working as aluminium is a poor conductor",
      "Turn off the nearest light switch"
    ],
    correctAnswer: 1,
    explanation: "If contact is made with a live conductor, do NOT touch the tower as it may be live. Warn everyone to stay clear, call the network operator and emergency services, and do not approach until the supply is confirmed isolated.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Overhead power lines",
    category: "Hazards"
  },
  {
    id: 192,
    question: "What additional hazard must be considered when using a mobile access tower in a confined space?",
    options: [
      "The tower may not fit",
      "Restricted access and egress, reduced ventilation, and difficulty in carrying out a rescue in an emergency",
      "Confined spaces are always well-lit",
      "No additional hazards exist in confined spaces"
    ],
    correctAnswer: 1,
    explanation: "Confined spaces present additional hazards: restricted access/egress make assembly and rescue difficult, ventilation may be poor (risk of fume accumulation), and emergency evacuation is more complex.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Environmental hazards",
    category: "Hazards"
  },

  // --- advanced (8) ---
  {
    id: 193,
    question: "Under RIDDOR 2013, what is the time limit for reporting a dangerous occurrence (such as the collapse of a mobile access tower)?",
    options: [
      "Within 7 days",
      "Without delay and by the quickest practicable means (immediately by telephone, followed by written report within 10 days)",
      "Within 28 days",
      "Within 3 months"
    ],
    correctAnswer: 1,
    explanation: "Dangerous occurrences must be reported without delay. This typically means an immediate telephone report to the HSE followed by a completed report (Form F2508) submitted within 10 days.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "RIDDOR",
    category: "Hazards"
  },
  {
    id: 194,
    question: "When calculating the overturning risk of a tower in windy conditions, which factor has the greatest influence on the overturning moment?",
    options: [
      "The colour of the tower",
      "The height at which the wind force acts (increasing height dramatically increases the overturning moment)",
      "The weight of the castors",
      "The number of bracing members"
    ],
    correctAnswer: 1,
    explanation: "The overturning moment equals the wind force multiplied by the height at which it acts. As the tower gets taller, the wind force acts at a greater height, dramatically increasing the overturning moment whilst the stabilising base dimension remains the same.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Overturning",
    category: "Hazards"
  },
  {
    id: 195,
    question: "What is the minimum safe clearance distance from overhead power lines at 33 kV when positioning a mobile access tower (including any tools or materials being raised)?",
    options: [
      "1 metre",
      "3 metres",
      "6 metres (or as specified by the DNO)",
      "9 metres"
    ],
    correctAnswer: 2,
    explanation: "For 33 kV overhead lines, a minimum clearance of 6 metres is typically required. This includes the tower, any materials being raised, and the maximum reach of persons on the platform. Always confirm with the Distribution Network Operator (DNO).",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Overhead power lines",
    category: "Hazards"
  },
  {
    id: 196,
    question: "What physiological symptoms indicate the onset of suspension trauma in a person suspended in a harness after a fall?",
    options: [
      "Sunburn and dehydration",
      "Faintness, nausea, breathlessness, paleness, sweating, and eventually loss of consciousness",
      "Only pain at the harness contact points",
      "Increased appetite"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma symptoms include: faintness, nausea, breathlessness, paleness, excessive sweating, hot flushes, and eventually loss of consciousness. Rescue must be effected rapidly (within 15 minutes ideally).",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Suspension trauma",
    category: "Hazards"
  },
  {
    id: 197,
    question: "Following rescue from suspension in a harness, why must the rescued person NOT be laid flat immediately?",
    options: [
      "Because they might be dizzy",
      "A sudden rush of pooled, deoxygenated blood from the legs to the heart can cause cardiac arrest (rescue death/reflow syndrome)",
      "To check for broken bones first",
      "There is no reason; they should always be laid flat"
    ],
    correctAnswer: 1,
    explanation: "If a person who has been suspended is laid flat, the pooled deoxygenated blood rushes back to the heart, potentially causing cardiac arrest (reflow syndrome). The person should be placed in a W-position (sitting with knees raised) initially.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Suspension trauma",
    category: "Hazards"
  },
  {
    id: 198,
    question: "What is the dynamic amplification factor and how does it relate to tower loading?",
    options: [
      "It is the tower's paint colour code",
      "It accounts for the additional forces generated when loads are applied suddenly or during movement (e.g. a person jumping on the platform creates a force greater than their static weight)",
      "It is the number of persons allowed on the tower",
      "It is the wind speed factor"
    ],
    correctAnswer: 1,
    explanation: "The dynamic amplification factor accounts for additional forces created when loads are applied suddenly (e.g. stepping onto a platform, dropping tools). A sudden impact creates forces significantly greater than the static weight, which tower designs must accommodate.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Loading",
    category: "Hazards"
  },
  {
    id: 199,
    question: "When a tower is struck by lightning, what risks does this create even after the storm has passed?",
    options: [
      "Lightning cannot strike a mobile tower",
      "Possible structural damage to connections and welds from the electrical discharge, magnetisation of components, and a residual risk of damaged locking mechanisms — a full inspection is required",
      "Only cosmetic damage",
      "The tower becomes permanently magnetised and unusable"
    ],
    correctAnswer: 1,
    explanation: "A lightning strike can damage welded joints, weaken locking mechanisms through thermal shock, and cause micro-fractures in aluminium components. A full inspection by a competent person is required before the tower can be used again.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Environmental hazards",
    category: "Hazards"
  },
  {
    id: 200,
    question: "Under the Management of Health and Safety at Work Regulations 1999, what must an employer do if a risk assessment identifies that young persons (under 18) are to work on or near mobile access towers?",
    options: [
      "Young persons are automatically prohibited from any tower-related work",
      "The employer must carry out a specific risk assessment addressing the young person's inexperience, lack of awareness of risks, and physical/psychological immaturity, and ensure enhanced supervision",
      "Parental consent is the only requirement",
      "Young persons need no additional measures if they hold a PASMA card"
    ],
    correctAnswer: 1,
    explanation: "Regulation 19 requires a specific risk assessment for young persons, considering their inexperience, lack of awareness of existing or potential risks, and immaturity. Enhanced supervision and additional training may be required.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Risk assessment",
    category: "Hazards"
  },
];
