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
export const ipafCategories = ['Legislation', 'Tower Types', 'Assembly', 'Inspection', 'Hazards'];

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
  categories: ipafCategories,
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
    question:
      'Which piece of UK legislation places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of their employees?',
    options: [
      'Provision and Use of Work Equipment Regulations 1998',
      'Health and Safety at Work etc. Act 1974',
      'Work at Height Regulations 2005',
      'Construction (Design and Management) Regulations 2015',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2 of the Health and Safety at Work etc. Act 1974 (HSWA) places this general duty on every employer.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HSWA 1974',
    category: 'Legislation',
  },
  {
    id: 2,
    question:
      'Under the HSWA 1974, which section covers the duty of employees to take reasonable care of themselves and others?',
    options: [
      'Section 2',
      'Section 3',
      'Section 7',
      'Section 8',
    ],
    correctAnswer: 2,
    explanation:
      'Section 7 requires employees to take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions at work.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HSWA 1974',
    category: 'Legislation',
  },
  {
    id: 3,
    question: 'What does the abbreviation PASMA stand for?',
    options: [
      'Prefabricated Aluminium Scaffolding Manufacturers Association',
      'Platform and Scaffold Manufacturers Association',
      'Professional Access Safety and Management Association',
      'Prefabricated Access Suppliers and Manufacturers Association',
    ],
    correctAnswer: 3,
    explanation:
      'PASMA stands for the Prefabricated Access Suppliers and Manufacturers Association. It is the recognised trade body for the mobile access tower industry.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PASMA',
    category: 'Legislation',
  },
  {
    id: 4,
    question: 'How long is a PASMA Towers for Users training card valid before it must be renewed?',
    options: [
      '5 years',
      '3 years',
      '1 year',
      '10 years',
    ],
    correctAnswer: 0,
    explanation:
      'The PASMA card is valid for 5 years. Operatives should renew their training before it expires to remain competent.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PASMA',
    category: 'Legislation',
  },
  {
    id: 5,
    question:
      'The Work at Height Regulations 2005 apply to work at height where there is a risk of a fall likely to cause what?',
    options: [
      'Discomfort',
      'Personal injury',
      'Damage to equipment',
      'Environmental harm',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 6,
    question:
      'Which regulation specifically deals with the planning, organisation and management of work at height?',
    options: [
      'Control of Substances Hazardous to Health Regulations 2002',
      'Lifting Operations and Lifting Equipment Regulations 1998',
      'Work at Height Regulations 2005',
      'Management of Health and Safety at Work Regulations 1999',
    ],
    correctAnswer: 2,
    explanation:
      'The Work at Height Regulations 2005 specifically address the planning, organisation and management of all work carried out at height.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 7,
    question:
      'Under the Work at Height Regulations 2005, what is the first step in the hierarchy of control?',
    options: [
      'Provide personal fall protection',
      'Use collective fall prevention measures',
      'Minimise the distance and consequences of a fall',
      'Avoid work at height where possible',
    ],
    correctAnswer: 3,
    explanation:
      'The hierarchy of control requires duty holders to first avoid work at height where it is reasonably practicable to do so, before considering other measures.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 8,
    question: 'What is the primary British/European standard that covers mobile access towers?',
    options: [
      'BS EN 1004-1:2020',
      'BS EN 12811',
      'BS 5975',
      'BS EN 131',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1004-1:2020 is the standard for mobile access and working towers made of prefabricated elements. It covers design, materials, dimensions and load classes.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 9,
    question: 'Under the HSWA 1974, Section 3 places duties on employers in respect of whom?',
    options: [
      'To increase the effective base dimension and improve stability',
      'Persons not in their employment (e.g. members of the public)',
      'Interfere with or misuse anything provided for health and safety',
      'The manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual and/or a handover certificate',
    ],
    correctAnswer: 1,
    explanation:
      'Section 3 of the HSWA 1974 requires employers to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HSWA 1974',
    category: 'Legislation',
  },
  {
    id: 10,
    question:
      'Section 8 of the HSWA 1974 makes it an offence for any person to intentionally or recklessly do what?',
    options: [
      'Every employer and any person who controls the work of others',
      'Prefabricated Access Suppliers and Manufacturers Association',
      'Interfere with or misuse anything provided for health and safety',
      'The Client must ensure a plan is drawn up before the construction phase begins',
    ],
    correctAnswer: 2,
    explanation:
      'Section 8 states that no person shall intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HSWA 1974',
    category: 'Legislation',
  },
  {
    id: 11,
    question:
      'Which body is the main enforcing authority for health and safety legislation on construction sites in the UK?',
    options: [
      'A missing guardrail or toeboard',
      'Planning for emergencies and rescue',
      'The maximum platform height and load class',
      'Health and Safety Executive (HSE)',
    ],
    correctAnswer: 3,
    explanation:
      'The Health and Safety Executive (HSE) is the principal enforcing authority for health and safety on construction sites in Great Britain.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Enforcement',
    category: 'Legislation',
  },
  {
    id: 12,
    question:
      'Under the Work at Height Regulations 2005, who has a duty to plan, supervise and carry out work at height in a safe manner?',
    options: [
      'Every employer and any person who controls the work of others',
      'In the reverse order to assembly (top down)',
      'Guardrail system (top rail, mid-rail and toeboard)',
      'Use work equipment or other measures to prevent falls',
    ],
    correctAnswer: 0,
    explanation:
      'The Regulations place duties on employers, the self-employed, and any person who controls the work of others to plan, supervise and carry out work at height safely.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 13,
    question: 'What does CDM stand for in CDM 2015?',
    options: [
      'Construction Development Management',
      'Construction (Design and Management)',
      'Contractor Duty Management',
      'Construction Delivery and Maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'CDM stands for Construction (Design and Management) Regulations 2015, which set out the legal framework for managing health and safety in construction projects.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 14,
    question:
      'According to the Work at Height Regulations, Schedule 5 specifically covers which type of access equipment?',
    options: [
      'Fixed scaffolding',
      'Personal fall protection systems',
      'Ladders',
      'Mobile elevating work platforms',
    ],
    correctAnswer: 2,
    explanation:
      'Schedule 5 of the Work at Height Regulations 2005 provides requirements specific to the use of ladders.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },

  // --- intermediate (18) ---
  {
    id: 15,
    question:
      'Under the CDM 2015 Regulations, which duty holder has overall responsibility for the planning, management, monitoring and coordination of the construction phase?',
    options: [
      'Client',
      'Principal Designer',
      'Designer',
      'Principal Contractor',
    ],
    correctAnswer: 3,
    explanation:
      'The Principal Contractor has overall responsibility for the planning, management, monitoring and coordination of health and safety during the construction phase of a project.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 16,
    question:
      'BS EN 1004-1:2020 defines three load classes for mobile access towers. Which load class allows the highest uniformly distributed load on the platform?',
    options: [
      'Load Class 3',
      'Load Class 2',
      'Load Class 1',
      'All classes allow the same load',
    ],
    correctAnswer: 0,
    explanation:
      'Load Class 3 allows the highest uniformly distributed load (2.0 kN/m2) compared with Class 2 (1.5 kN/m2) and Class 1 (0.75 kN/m2).',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 17,
    question:
      'Under BS EN 1004-1:2020, what is the maximum height for an indoor mobile access tower without additional stabilisation?',
    options: [
      "Structural failure of the platform or tower components, potentially causing collapse",
      "The standard does not set a single limit; it depends on the manufacturer's instruction manual",
      "Overhead power lines, cables, beams and any other overhead obstructions",
      "Use sole boards (spreader plates) under the castors to distribute the load over a larger area",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 1004-1:2020 does not prescribe a single universal height limit. Maximum heights depend on the specific tower configuration and the manufacturer's design calculations and instruction manual.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 18,
    question:
      'The Work at Height Regulations 2005 require that any place used for work at height must be what?',
    options: [
      'Approved by the HSE before use',
      'Made of non-conductive materials',
      'Suitable and sufficient for the purpose',
      'Painted a visible colour',
    ],
    correctAnswer: 2,
    explanation:
      'The Regulations require that every place at which work is to be done at height must be suitable and sufficient for the purpose, including its condition and structural properties.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 19,
    question:
      'Which CDM 2015 duty holder has a duty to provide pre-construction information to designers and contractors?',
    options: [
      'Principal Contractor',
      'Worker',
      'Principal Designer',
      'Client',
    ],
    correctAnswer: 3,
    explanation:
      'The Client must provide pre-construction information as soon as practicable to every designer and contractor appointed, or being considered for appointment.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 20,
    question:
      'According to PASMA guidance, who is responsible for ensuring that only trained and competent persons assemble, alter or dismantle mobile access towers?',
    options: [
      'The employer or person controlling the work',
      'The maximum platform height and load class',
      'A full-length platform with toeboards on all open sides',
      'Leaning out over the guardrail to extend reach',
    ],
    correctAnswer: 0,
    explanation:
      "The employer or person controlling the work has the duty to ensure that only trained and competent operatives assemble, alter or dismantle towers in accordance with the manufacturer's instructions.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PASMA',
    category: 'Legislation',
  },
  {
    id: 21,
    question:
      'Under the Work at Height Regulations 2005, when must a risk assessment for work at height be reviewed?',
    options: [
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'When there is reason to believe it is no longer valid or there has been a significant change',
      'The Client must ensure a plan is drawn up before the construction phase begins',
      'To quickly identify any obvious defects, missing components or changes since the last use',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessments must be reviewed if there is reason to suspect they are no longer valid, or if there has been a significant change in the matters to which they relate.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 22,
    question:
      'What type of enforcement notice can an HSE inspector issue requiring immediate cessation of an activity that involves a risk of serious personal injury?',
    options: [
      'Improvement notice',
      'Compliance order',
      'Prohibition notice',
      'Warning letter',
    ],
    correctAnswer: 2,
    explanation:
      'A Prohibition Notice can be issued by an HSE inspector when there is a risk of serious personal injury. It requires the activity to stop immediately or within a specified period.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Enforcement',
    category: 'Legislation',
  },
  {
    id: 23,
    question:
      'Under HSWA 1974, what is the maximum penalty for an offence tried on indictment (Crown Court)?',
    options: [
      'Construction (Design and Management)',
      'Health and Safety at Work etc. Act 1974',
      'The minimum base dimension (the shorter side)',
      'An unlimited fine and/or up to 2 years imprisonment',
    ],
    correctAnswer: 3,
    explanation:
      'For offences tried on indictment in the Crown Court, the penalty can be an unlimited fine and/or imprisonment for up to 2 years.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Enforcement',
    category: 'Legislation',
  },
  {
    id: 24,
    question:
      'Which of the following is a duty holder role introduced specifically by the CDM 2015 Regulations?',
    options: [
      'Principal Designer',
      'Site Supervisor',
      'Safety Officer',
      'Scaffold Inspector',
    ],
    correctAnswer: 0,
    explanation:
      'The Principal Designer role was introduced by CDM 2015, replacing the previous CDM Co-ordinator role. They plan, manage and monitor health and safety in the pre-construction phase.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 25,
    question:
      'According to the hierarchy of control in the Work at Height Regulations, if work at height cannot be avoided, what is the next preferred measure?',
    options: [
      'Issue personal protective equipment',
      'Use work equipment or other measures to prevent falls',
      'Place warning signs around the area',
      'Ensure a first aider is present',
    ],
    correctAnswer: 1,
    explanation:
      'If work at height cannot be avoided, the next step in the hierarchy is to use work equipment or other measures to prevent falls, such as guardrails or mobile access towers.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 26,
    question:
      'Which PASMA card type is issued to persons who have completed the Towers for Users course?',
    options: [
      'Health and Safety at Work etc. Act 1974',
      'Personal protection measures',
      'PASMA Photo ID Card (Towers for Users)',
      'In the reverse order to assembly (top down)',
    ],
    correctAnswer: 2,
    explanation:
      'Successful completion of the PASMA Towers for Users course results in a PASMA Photo ID Card specifically endorsed for the course completed.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PASMA',
    category: 'Legislation',
  },
  {
    id: 27,
    question:
      'Under the Provision and Use of Work Equipment Regulations 1998 (PUWER), mobile access towers are classified as what?',
    options: [
      'Personal protective equipment',
      'Lifting equipment',
      'Temporary structures',
      'Work equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Under PUWER, a mobile access tower is classified as work equipment. PUWER requires that work equipment is suitable, maintained and used by people who have received adequate training.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PUWER',
    category: 'Legislation',
  },
  {
    id: 28,
    question:
      'BS EN 1004-1:2020 requires that all towers meeting the standard must carry a legible label. Which of the following must the label include?',
    options: [
      'The maximum platform height and load class',
      'The date of the last paint application',
      'The name of the site supervisor',
      "The operative's PASMA card number",
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1004-1:2020 requires a legible label showing key information including the maximum platform height, load class, and the standard number.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 29,
    question:
      'Under the Work at Height Regulations 2005, who is responsible for ensuring that work equipment used for work at height is inspected at suitable intervals?',
    options: [
      'To level the tower on slightly uneven ground',
      'The person on whose behalf the inspection is carried out',
      'Interfere with or misuse anything provided for health and safety',
      'Every employer and any person who controls the work of others',
    ],
    correctAnswer: 1,
    explanation:
      'The duty holder (the person on whose behalf the inspection is carried out — typically the employer or person controlling the work) must ensure equipment is inspected at suitable intervals.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 30,
    question:
      'What does the second step in the Work at Height Regulations hierarchy of control state, if falls cannot be prevented?',
    options: [
      'A locking mechanism that can be engaged to prevent movement',
      'The Client must ensure a plan is drawn up before the construction phase begins',
      'Use measures that minimise the distance and consequences of a fall',
      'The tower could roll unexpectedly, causing loss of balance or overturning',
    ],
    correctAnswer: 2,
    explanation:
      'If falls cannot be prevented, the Regulations require the use of work equipment or other measures to minimise the distance and consequences of a fall, such as safety nets or airbags.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 31,
    question: "Under CDM 2015, what is the Client's duty regarding the construction phase plan?",
    options: [
      'A locking mechanism that can be engaged to prevent movement',
      'The tower must not be used until the clip is replaced with the correct manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s component',
      'That all castors are present, undamaged, and that the brakes lock and release properly',
      'The Client must ensure a plan is drawn up before the construction phase begins',
    ],
    correctAnswer: 3,
    explanation:
      'The Client must ensure that a construction phase plan is drawn up by the contractor or principal contractor before the construction phase begins.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 32,
    question:
      'Which regulation requires employers to provide adequate training and information to employees who use work equipment?',
    options: [
      'PUWER 1998',
      'COSHH 2002',
      'RIDDOR 2013',
      'LOLER 1998',
    ],
    correctAnswer: 0,
    explanation:
      'PUWER 1998 (Provision and Use of Work Equipment Regulations) requires employers to provide adequate training, information and instruction to persons who use work equipment.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PUWER',
    category: 'Legislation',
  },

  // --- advanced (8) ---
  {
    id: 33,
    question:
      'BS EN 1004-1:2020 specifies three load classes. What is the uniformly distributed load for Load Class 2?',
    options: [
      '0.75 kN/m\\\\\\\\\\\\\\\\u00B2',
      '1.5 kN/m\\\\\\\\\\\\\\\\u00B2',
      '2.0 kN/m\\\\\\\\\\\\\\\\u00B2',
      '3.0 kN/m\\\\\\\\\\\\\\\\u00B2',
    ],
    correctAnswer: 1,
    explanation:
      'Load Class 2 permits a uniformly distributed load of 1.5 kN/m\u00B2 on the working platform. Class 1 is 0.75 kN/m\u00B2 and Class 3 is 2.0 kN/m\u00B2.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 34,
    question: 'Under CDM 2015, at what point does a project become notifiable to the HSE?',
    options: [
      'Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months',
      'Barriers must prevent anyone from stepping off the tower platform onto the fragile surface, and warning signs must be displayed',
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
      'It significantly increases the wind loading on the tower, greatly increasing the risk of overturning',
    ],
    correctAnswer: 2,
    explanation:
      'A project is notifiable under CDM 2015 when the construction work will last longer than 30 working days and have more than 20 workers simultaneously at any point, or exceed 500 person-days of construction work.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 35,
    question:
      'The Work at Height Regulations 2005, Regulation 12 requires that inspection reports for work equipment at height must include specific information. How long must these reports be kept?',
    options: [
      'The tower must be immediately taken out of use and reduced to a compliant configuration or dismantled entirely',
      'Self-rescue first, then assisted rescue from the ground, then professional emergency services',
      'Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted',
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12 requires that inspection reports are kept until the next inspection of that equipment at that site, or on a construction site for a minimum of 3 months after the inspection date.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 36,
    question:
      'BS EN 1004-1:2020 replaced the previous BS EN 1004:2004. Which key change was introduced in the 2020 revision regarding base dimensions?',
    options: [
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'That the floor has adequate load-bearing capacity for the total tower load including dynamic forces during assembly',
      'When climbing through the trap opening before guardrails at the new level are fully installed',
      'Overhead power lines, cables, beams and any other overhead obstructions',
    ],
    correctAnswer: 0,
    explanation:
      'The 2020 revision recognised a wider range of base plan dimensions instead of the fixed standard sizes of the 2004 version, allowing for greater design flexibility whilst maintaining structural requirements.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 37,
    question:
      'Under CDM 2015, which duty holder must prepare a health and safety file for the project and pass it to the Client at the end of the construction phase?',
    options: [
      'Principal Contractor',
      'Principal Designer',
      'Client',
      'Every contractor on site',
    ],
    correctAnswer: 1,
    explanation:
      'The Principal Designer is responsible for preparing, reviewing, updating and revising the health and safety file, and must pass it to the Client at the end of the project.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 38,
    question:
      'The Work at Height Regulations 2005, Regulation 4 requires that work at height is properly planned. Which of the following must be included in the planning?',
    options: [
      'Selection of equipment only',
      'Weather forecasts for the next month',
      'Planning for emergencies and rescue',
      'Insurance certificates',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 4 requires that the planning of work at height includes planning for emergencies and rescue. This is a critical requirement that must be addressed before work begins.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 39,
    question:
      "In terms of PASMA training, what is the difference between the 'Towers for Users' and the 'Work at Height Essentials' courses?",
    options: [
      'Platform height is the height of the working platform; working height is typically platform height plus approximately 2 metres (average reach)',
      'Verify that the ground has not deteriorated (e.g. due to rain, excavation nearby, or loading) and that sole boards are still effective',
      'After initial assembly, after any event that could affect stability (e.g. strong winds, accidental impact), and after any modification',
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
    ],
    correctAnswer: 3,
    explanation:
      'The PASMA Towers for Users course covers the assembly, dismantling and safe use of towers. The Work at Height Essentials course is designed for those who use pre-erected towers and does not cover assembly or dismantling.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'PASMA',
    category: 'Legislation',
  },
  {
    id: 40,
    question:
      'Under the Work at Height Regulations 2005, Regulation 6 outlines that when selecting work equipment for work at height, the duty holder must give collective protection measures priority over what?',
    options: [
      'Personal protection measures',
      'Any other form of risk assessment',
      "The manufacturer's instructions",
      'Existing site procedures',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 6 requires that collective protection measures (e.g. guardrails, platforms) must be given priority over personal protection measures (e.g. harnesses) when selecting equipment for work at height.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },

  // =======================================================================
  // TOWER TYPES — 40 questions (id 41–80)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 41,
    question: 'What is the most common material used to manufacture standard mobile access towers?',
    options: [
      'Steel',
      'Aluminium alloy',
      'Glass-reinforced plastic (GRP)',
      'Timber',
    ],
    correctAnswer: 1,
    explanation:
      'The vast majority of standard mobile access towers are manufactured from aluminium alloy due to its lightweight properties and corrosion resistance.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Tower materials',
    category: 'Tower Types',
  },
  {
    id: 42,
    question: 'What is the typical platform width of a single-width mobile access tower?',
    options: [
      'Work at Height Regulations 2005',
      'Planning for emergencies and rescue',
      '0.65 metres (approximately)',
      'A site survey and risk assessment',
    ],
    correctAnswer: 2,
    explanation:
      'A standard single-width tower has a platform width of approximately 0.65 metres (some manufacturers specify 0.7 m). This narrower width makes it suitable for restricted areas.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Tower dimensions',
    category: 'Tower Types',
  },
  {
    id: 43,
    question: 'What is the typical platform width of a double-width mobile access tower?',
    options: [
      'Avoid work at height where possible',
      'Health and Safety Executive (HSE)',
      'Planning for emergencies and rescue',
      '1.35 metres (approximately)',
    ],
    correctAnswer: 3,
    explanation:
      'A standard double-width tower has a platform width of approximately 1.35 metres, providing a larger and more stable working platform than single-width towers.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Tower dimensions',
    category: 'Tower Types',
  },
  {
    id: 44,
    question: 'What is the required minimum height for guardrails on a mobile access tower?',
    options: [
      '950 mm',
      '850 mm',
      '750 mm',
      '1100 mm',
    ],
    correctAnswer: 0,
    explanation:
      'Guardrails on mobile access towers must be at a minimum height of 950 mm above the working platform, in accordance with BS EN 1004-1:2020.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 45,
    question: 'What is the minimum height for toeboards on a mobile access tower?',
    options: [
      '50 mm',
      '150 mm',
      '100 mm',
      '200 mm',
    ],
    correctAnswer: 1,
    explanation:
      'Toeboards must be at least 150 mm high to prevent tools, materials and debris from falling off the edge of the working platform.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 46,
    question:
      'At what approximate height should the mid-rail be positioned on a mobile access tower guardrail system?',
    options: [
      '600 mm',
      '750 mm',
      '470 mm',
      '250 mm',
    ],
    correctAnswer: 2,
    explanation:
      'The mid-rail should be positioned at approximately 470 mm (roughly halfway between the toeboard and the top guardrail) to reduce the gap through which a person could fall.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 47,
    question:
      'What is the maximum safe working load typically specified for a single platform on a standard mobile access tower?',
    options: [
      '150 kg',
      '200 kg',
      '500 kg',
      '275 kg',
    ],
    correctAnswer: 3,
    explanation:
      'The maximum safe working load for a single platform is typically 275 kg. This includes the weight of persons, tools and materials on the platform.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Safe working loads',
    category: 'Tower Types',
  },
  {
    id: 48,
    question:
      'What is the typical maximum total load for a standard mobile access tower (all platforms combined)?',
    options: [
      '950 kg',
      '275 kg',
      '500 kg',
      '1500 kg',
    ],
    correctAnswer: 0,
    explanation:
      'The typical maximum total load for the entire tower structure (all platforms combined) is 950 kg, which must not be exceeded.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Safe working loads',
    category: 'Tower Types',
  },
  {
    id: 49,
    question:
      'Which type of wheel is fitted to the base of a mobile access tower to allow it to be moved?',
    options: [
      'Pneumatic tyre',
      'Castor',
      'Track wheel',
      'Roller bearing',
    ],
    correctAnswer: 1,
    explanation:
      'Castors are fitted to the base of mobile access towers. They allow the tower to be moved and must have a locking mechanism to prevent movement during use.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Castors',
    category: 'Tower Types',
  },
  {
    id: 50,
    question: 'What is the primary purpose of outriggers on a mobile access tower?',
    options: [
      'Persons not in their employment (e.g. members of the public)',
      'A full-length platform with toeboards on all open sides',
      'To increase the effective base dimension and improve stability',
      'They must be removed from the platform entirely',
    ],
    correctAnswer: 2,
    explanation:
      'Outriggers increase the effective base dimension of the tower, improving its stability and resistance to overturning, particularly at greater heights.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Stabilisers',
    category: 'Tower Types',
  },
  {
    id: 51,
    question:
      'In which environment would a GRP (glass-reinforced plastic) tower be preferred over an aluminium tower?',
    options: [
      'From the platform below, reaching up through the open trapdoor',
      'The person on whose behalf the inspection is carried out',
      'Use work equipment or other measures to prevent falls',
      'Near overhead electrical conductors or in electrically sensitive areas',
    ],
    correctAnswer: 3,
    explanation:
      'GRP towers are non-conductive and are preferred when working near overhead electrical conductors, live electrical equipment, or in electrically sensitive environments such as substations.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'GRP towers',
    category: 'Tower Types',
  },
  {
    id: 52,
    question: 'What is the main advantage of aluminium alloy over steel for mobile access towers?',
    options: [
      'Aluminium is significantly lighter, making towers easier to handle and transport',
      'When climbing through the trap opening before guardrails at the new level are fully installed',
      'From the platform below, reaching up through the open trapdoor',
      'To maintain the full platform area for working and prevent falls through the opening',
    ],
    correctAnswer: 0,
    explanation:
      'Aluminium alloy is approximately one-third the weight of steel, making towers much lighter and easier to transport, carry and assemble on site.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Tower materials',
    category: 'Tower Types',
  },
  {
    id: 53,
    question: 'What is the function of a stabiliser on a mobile access tower?',
    options: [
      'Electrocution from contact with or arcing from the power lines',
      'To prevent the tower from overturning by increasing the effective base size',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'When there is reason to believe it is no longer valid or there has been a significant change',
    ],
    correctAnswer: 1,
    explanation:
      "Stabilisers are fitted to the tower to increase the effective base dimension, which increases resistance to overturning. They must be used in accordance with the manufacturer's instructions.",
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Stabilisers',
    category: 'Tower Types',
  },
  {
    id: 54,
    question:
      'What component of a mobile access tower provides primary edge protection to prevent persons falling from the platform?',
    options: [
      'Before each use (daily as a minimum)',
      'From the platform below, reaching up through the open trapdoor',
      'Guardrail system (top rail, mid-rail and toeboard)',
      'The purchase price of the equipment',
    ],
    correctAnswer: 2,
    explanation:
      'The guardrail system, comprising the top guardrail (950 mm), mid-rail (470 mm) and toeboard (150 mm), provides primary edge protection on all exposed sides of the working platform.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Tower Types',
  },

  // --- intermediate (18) ---
  {
    id: 55,
    question:
      'What Beaufort scale wind force should cause all work on a mobile access tower to cease?',
    options: [
      'Beaufort 3 (gentle breeze)',
      'Beaufort 6 (strong breeze)',
      'Beaufort 5 (fresh breeze)',
      'Beaufort 4 (moderate breeze)',
    ],
    correctAnswer: 3,
    explanation:
      'Work should cease at Beaufort Force 4 (moderate breeze, 13-18 mph). At this level, loose paper and small branches move, and wind forces on the tower and operative become significant.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Wind limits',
    category: 'Tower Types',
  },
  {
    id: 56,
    question:
      'At what Beaufort scale force is a freestanding mobile access tower at risk of being blown over, even when unoccupied?',
    options: [
      'Beaufort 6',
      'Beaufort 5',
      'Beaufort 4',
      'Beaufort 8',
    ],
    correctAnswer: 0,
    explanation:
      'At Beaufort Force 6 (strong breeze, 25-31 mph), freestanding towers are at risk of overturning even when unoccupied. Towers should be dismantled or tied to the structure if strong winds are forecast.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Wind limits',
    category: 'Tower Types',
  },
  {
    id: 57,
    question: 'What is the purpose of diagonal bracing on a mobile access tower?',
    options: [
      'A type of adjustable guardrail frame that provides collective fall protection during assembly',
      'To provide rigidity and prevent the frame from racking (parallelogramming)',
      'Prefabricated Access Suppliers and Manufacturers Association',
      'Every employer and any person who controls the work of others',
    ],
    correctAnswer: 1,
    explanation:
      "Diagonal bracing provides structural rigidity to the tower and prevents the frames from racking (parallelogramming), which would compromise the tower's structural integrity.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 58,
    question:
      'When selecting castors for a mobile access tower, which feature is essential for safe use?',
    options: [
      'Pneumatic tyres for shock absorption',
      'Castors must be painted a bright colour',
      'A locking mechanism that can be engaged to prevent movement',
      'All castors must swivel 360 degrees at all times',
    ],
    correctAnswer: 2,
    explanation:
      'Castors must have a reliable locking mechanism that can be engaged to prevent movement while the tower is in use. All castors must be locked before the tower is climbed or used.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Castors',
    category: 'Tower Types',
  },
  {
    id: 59,
    question: 'What is the height-to-base ratio for a standard mobile access tower used outdoors?',
    options: [
      '2:1',
      '4:1',
      '3.5:1',
      '3:1',
    ],
    correctAnswer: 3,
    explanation:
      'For outdoor use, the maximum height-to-minimum base dimension ratio is 3:1. For indoor use (no wind loading), the ratio can be increased to 3.5:1.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 60,
    question: 'What is the height-to-base ratio for a mobile access tower used indoors?',
    options: [
      '3.5:1',
      '3:1',
      '2:1',
      '4:1',
    ],
    correctAnswer: 0,
    explanation:
      'For indoor use where there is no wind loading, the height-to-minimum base dimension ratio can be up to 3.5:1. This allows a taller tower on the same base compared with outdoor use.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 61,
    question: 'What is an AGR frame on a mobile access tower?',
    options: [
      '4 metres platform height (unless the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instructions state otherwise)',
      'A type of adjustable guardrail frame that provides collective fall protection during assembly',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'Passed hand-to-hand to a person at the level below or lowered carefully to the ground',
    ],
    correctAnswer: 1,
    explanation:
      'An AGR (Advance Guard Rail) frame is a specially designed frame that automatically provides guardrail protection as it is raised into position, giving collective fall protection during the assembly process.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'AGR frames',
    category: 'Tower Types',
  },
  {
    id: 62,
    question:
      'Why is it important that all components of a mobile access tower come from the same manufacturer?',
    options: [
      'When climbing through the trap opening before guardrails at the new level are fully installed',
      'The tower location, date, details of the inspection, any defects found, actions taken, and the name of the competent person',
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
    ],
    correctAnswer: 2,
    explanation:
      'Mixing components from different manufacturers is dangerous because dimensions, connection methods and structural ratings may differ, potentially compromising the structural integrity of the tower.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 63,
    question: 'What is the purpose of adjustable leg/castor mechanisms on a mobile access tower?',
    options: [
      'A missing guardrail or toeboard',
      'Use work equipment or other measures to prevent falls',
      'Construction (Design and Management)',
      'To level the tower on slightly uneven ground',
    ],
    correctAnswer: 3,
    explanation:
      'Adjustable legs allow the tower to be levelled on slightly uneven ground, ensuring the tower remains plumb and stable. The adjustment range is limited and should not be used on severely sloping surfaces.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 64,
    question: 'What is the purpose of a trapdoor (hatch) platform on a mobile access tower?',
    options: [
      'To allow safe internal access through the platform whilst maintaining full guardrail protection',
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
      'Each tower must have its own individual inspection record, clearly identified with its unique location or reference number',
      'The Client must ensure a plan is drawn up before the construction phase begins',
    ],
    correctAnswer: 0,
    explanation:
      'A trapdoor platform allows the operative to climb through the platform via an internal ladder whilst maintaining the full guardrail protection. The trap must be closed after access.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 65,
    question: 'When should stabilisers or outriggers be used on a mobile access tower?',
    options: [
      "The available space, nature of the work, duration, and the tools and materials to be used on the platform",
      "Whenever specified in the manufacturer's instruction manual for the configuration being erected",
      "Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring",
      "It provides additional stiffness to the tower structure and serves as a rest point during climbing",
    ],
    correctAnswer: 1,
    explanation:
      "Stabilisers and outriggers must be used whenever the manufacturer's instruction manual specifies them for the particular tower configuration being erected. The requirement depends on the height and base dimensions.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Stabilisers',
    category: 'Tower Types',
  },
  {
    id: 66,
    question:
      'A mobile access tower with a 1.35 m wide base is used outdoors. Using the 3:1 ratio, what is the maximum platform height that can be achieved without stabilisers?',
    options: [
      "Structural failure of the platform or tower components, potentially causing collapse",
      "Safety helmet, safety footwear, gloves and high-visibility clothing as appropriate to the site",
      "This cannot be determined from the ratio alone; the manufacturer's manual must be consulted",
      "Whenever specified in the manufacturer's instruction manual for the configuration being erected",
    ],
    correctAnswer: 2,
    explanation:
      "Whilst the 3:1 ratio gives a theoretical figure, the actual safe height depends on many factors including the specific tower design, platform length, and loading. The manufacturer's instruction manual must always be consulted.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 67,
    question:
      'What is the primary disadvantage of a GRP tower compared with an aluminium alloy tower?',
    options: [
      'GRP towers cannot be used outdoors',
      'GRP towers cannot exceed 4 metres in height',
      'GRP towers cannot have guardrails fitted',
      'GRP towers are typically heavier and more expensive',
    ],
    correctAnswer: 3,
    explanation:
      'GRP towers are typically heavier than aluminium towers and more expensive to manufacture. However, their non-conductive properties make them essential for electrical work.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'GRP towers',
    category: 'Tower Types',
  },
  {
    id: 68,
    question: "What is a 'span frame' (also known as an 'end frame') on a mobile access tower?",
    options: [
      'The vertical frame that connects across the width of the tower, incorporating the rungs for climbing',
      'To prevent the tower from overturning by increasing the effective base size',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
    ],
    correctAnswer: 0,
    explanation:
      'A span frame (end frame) is the vertical H-shaped frame that spans the width of the tower. It includes the vertical uprights and horizontal rungs used for climbing.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 69,
    question:
      'What type of platform should be used on a mobile access tower where tools and materials are present?',
    options: [
      'Near overhead electrical conductors or in electrically sensitive areas',
      'A full-length platform with toeboards on all open sides',
      'They must be removed from the platform entirely',
      'Interfere with or misuse anything provided for health and safety',
    ],
    correctAnswer: 1,
    explanation:
      'Where tools and materials are present, the platform must have toeboards on all open sides (minimum 150 mm) to prevent items falling from the platform and striking persons below.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 70,
    question:
      'Approximately what wind speed range does Beaufort Force 4 (moderate breeze) correspond to?',
    options: [
      '8–12 mph',
      '1–5 mph',
      '13–18 mph',
      '25–31 mph',
    ],
    correctAnswer: 2,
    explanation:
      'Beaufort Force 4 (moderate breeze) corresponds to approximately 13–18 mph (20–28 km/h). At this force, dust and loose paper are raised and small branches move.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Wind limits',
    category: 'Tower Types',
  },
  {
    id: 71,
    question:
      'What factor determines whether a single-width or double-width tower should be selected for a task?',
    options: [
      'Aluminium is significantly lighter, making towers easier to handle and transport',
      'Verify that the ground has not deteriorated (e.g. due to rain, excavation nearby, or loading) and that sole boards are still effective',
      'Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted',
      'The available space, nature of the work, duration, and the tools and materials to be used on the platform',
    ],
    correctAnswer: 3,
    explanation:
      'Selection depends on practical factors: available space (access restrictions), the nature and duration of the work, and the weight and volume of tools and materials required on the platform.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Tower selection',
    category: 'Tower Types',
  },
  {
    id: 72,
    question:
      "What is the significance of the term 'platform height' versus 'working height' on a mobile access tower?",
    options: [
      'Platform height is the height of the working platform; working height is typically platform height plus approximately 2 metres (average reach)',
      'Assess the severity: light surface oxidation is normal for aluminium, but significant pitting or structural corrosion requires the component to be taken out of service',
      'Establish an exclusion zone, use physical barriers, ensure forklift drivers are informed, and consider using a banksman',
      'Additional loads and forces not accounted for in the tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s design can cause structural failure or overturning',
    ],
    correctAnswer: 0,
    explanation:
      'Platform height is the height of the working platform above ground. Working height is the maximum height at which work can be carried out, typically the platform height plus approximately 2 metres for average reach.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Tower dimensions',
    category: 'Tower Types',
  },

  // --- advanced (8) ---
  {
    id: 73,
    question:
      'Under BS EN 1004-1:2020, what concentrated point load must a working platform withstand in addition to the uniformly distributed load?',
    options: [
      'Avoid work at height where possible',
      '1.5 kN applied over a 100 mm x 100 mm area',
      'Before each use (daily as a minimum)',
      '6 metres (or as specified by the DNO)',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1004-1:2020 requires working platforms to withstand a concentrated point load of 1.5 kN applied over an area of 100 mm x 100 mm, in addition to meeting the uniformly distributed load requirements.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Tower Types',
  },
  {
    id: 74,
    question:
      "When calculating the height-to-base ratio, which dimension is used as the 'base' measurement?",
    options: [
      'They must be locked (brakes engaged)',
      'Construction (Design and Management)',
      'The minimum base dimension (the shorter side)',
      'Health and Safety Executive (HSE)',
    ],
    correctAnswer: 2,
    explanation:
      'The height-to-base ratio uses the minimum base dimension (shortest side) because this is the direction most vulnerable to overturning. For example, a 1.35 m wide by 2.5 m long tower uses 1.35 m.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 75,
    question:
      'What effect does attaching sheeting or banners to a mobile access tower have on its stability?',
    options: [
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'That the floor has adequate load-bearing capacity for the total tower load including dynamic forces during assembly',
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
      'It significantly increases the wind loading on the tower, greatly increasing the risk of overturning',
    ],
    correctAnswer: 3,
    explanation:
      "Sheeting or banners dramatically increase the surface area exposed to wind, greatly increasing the wind loading on the tower and the risk of overturning. Sheeting should never be attached unless the manufacturer's instructions specifically allow it with appropriate additional stabilisation.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Wind limits',
    category: 'Tower Types',
  },
  {
    id: 76,
    question:
      'For a mobile access tower used on a mezzanine floor or elevated surface, what additional risk must be considered?',
    options: [
      'A fall from the tower could result in a greater total fall distance, and edge protection at the mezzanine edge must be maintained',
      'Barriers, warning signs and banksmen/spotters should be used to control pedestrian and vehicle movement near the tower',
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
      'The tower must be immediately taken out of use and reduced to a compliant configuration or dismantled entirely',
    ],
    correctAnswer: 0,
    explanation:
      'When a tower is erected on an elevated surface, the total potential fall distance increases (tower height plus mezzanine height). Edge protection at the mezzanine perimeter must also be maintained to prevent falls from the elevated surface.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 77,
    question:
      'A tower is to be erected adjacent to an excavation. What is the minimum recommended distance from the edge of the excavation to the nearest tower support?',
    options: [
      'Prefabricated Access Suppliers and Manufacturers Association',
      'The depth of the excavation multiplied by 1.5, or as determined by a competent person',
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'Near overhead electrical conductors or in electrically sensitive areas',
    ],
    correctAnswer: 1,
    explanation:
      'The minimum safe distance from an excavation depends on the depth and soil conditions. As a general guide, the distance should be at least 1.5 times the depth, but a competent person should assess the specific conditions.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Ground conditions',
    category: 'Tower Types',
  },
  {
    id: 78,
    question:
      'Why must castors on a mobile access tower have a minimum wheel diameter specified by the manufacturer?',
    options: [
      'A full inspection by a competent person, as relocation is treated the same as re-erection',
      'The tower must be taken out of use immediately, the modification reversed, and a full re-inspection carried out before use resumes',
      'Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
    ],
    correctAnswer: 2,
    explanation:
      'Castor wheel diameter affects load distribution, ground pressure, and the ability to traverse minor floor imperfections. Wheels that are too small may sink, damage flooring, or fail under load.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Castors',
    category: 'Tower Types',
  },
  {
    id: 79,
    question: "What is the 'overturning moment' in relation to mobile access tower stability?",
    options: [
      'Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted',
      'A locking mechanism that can be engaged to prevent movement',
      'The depth of the excavation multiplied by 1.5, or as determined by a competent person',
      'The force multiplied by the distance that tends to tip the tower about its base edge',
    ],
    correctAnswer: 3,
    explanation:
      'The overturning moment is the product of any horizontal force (such as wind) and the vertical distance from the base to the point where the force acts. It must be less than the stabilising moment (weight multiplied by base dimension) for the tower to remain upright.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 80,
    question:
      'BS EN 1004-1:2020 permits what maximum castor/wheel deflection under full test load?',
    options: [
      'The standard does not specify a maximum deflection for castors; it specifies overall tower deflection limits',
      'Self-rescue first, then assisted rescue from the ground, then professional emergency services',
      'The vertical frame that connects across the width of the tower, incorporating the rungs for climbing',
      'A type of adjustable guardrail frame that provides collective fall protection during assembly',
    ],
    correctAnswer: 0,
    explanation:
      "BS EN 1004-1:2020 specifies overall structural performance criteria for the tower, including maximum lateral deflection under load. Individual castor deflection limits are a matter for the castor manufacturer's specification, not the tower standard itself.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Tower Types',
  },

  // =======================================================================
  // ASSEMBLY — 40 questions (id 81–120)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 81,
    question: 'What must be carried out before any mobile access tower is assembled on site?',
    options: [
      'A full structural engineering report',
      'A site survey and risk assessment',
      'Permission from the local council',
      'An environmental impact assessment',
    ],
    correctAnswer: 1,
    explanation:
      'A site survey and risk assessment must be carried out before assembly to identify ground conditions, overhead hazards, access restrictions, and any other risks specific to the location.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Planning',
    category: 'Assembly',
  },
  {
    id: 82,
    question: "What does '3T' stand for in the 3T method of tower assembly?",
    options: [
      'Three-Tier Tower',
      'Three-Tool Technique',
      'Through The Trap',
      'Timed Tower Test',
    ],
    correctAnswer: 2,
    explanation:
      "3T stands for 'Through The Trap'. It is a method of assembly where the operative climbs through the trapdoor in the platform to gain access to each new level.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 83,
    question: "What does 'AGR' stand for in the AGR method of tower assembly?",
    options: [
      'Assembly Guide Reference',
      'Automated Ground Release',
      'Adjustable Guardrail Rig',
      'Advance Guard Rail',
    ],
    correctAnswer: 3,
    explanation:
      "AGR stands for 'Advance Guard Rail'. This method uses specially designed frames with built-in guardrails that rise automatically into the protective position as the frame is lifted.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'AGR method',
    category: 'Assembly',
  },
  {
    id: 84,
    question:
      'What is the minimum number of persons recommended to assemble a mobile access tower?',
    options: [
      '2 persons',
      '3 persons',
      '4 persons',
      '1 person',
    ],
    correctAnswer: 0,
    explanation:
      'A minimum of 2 persons is recommended for the safe assembly and dismantling of a mobile access tower. One person works on the tower whilst the other passes components and assists from ground level.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Personnel',
    category: 'Assembly',
  },
  {
    id: 85,
    question:
      'Before climbing a newly assembled mobile access tower, what must be done to all castors?',
    options: [
      'They must be removed',
      'They must be locked (brakes engaged)',
      'They must be pointed in the same direction',
      'They must be greased',
    ],
    correctAnswer: 1,
    explanation:
      'All castors must be locked (brakes firmly engaged) before anyone climbs or works on the tower. This prevents the tower from rolling and potentially overturning.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Safety checks',
    category: 'Assembly',
  },
  {
    id: 86,
    question:
      'In the 3T method, from which position does the operative install the guardrails at each new level?',
    options: [
      'Every employer and any person who controls the work of others',
      'Use measures that minimise the distance and consequences of a fall',
      'From the platform below, reaching up through the open trapdoor',
      'To provide rigidity and prevent the frame from racking (parallelogramming)',
    ],
    correctAnswer: 2,
    explanation:
      'In the 3T method, the operative stands on the platform below and reaches up through the open trapdoor to install guardrails at the next level, maintaining protection at all times.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 87,
    question: 'What should be checked about the ground before placing a mobile access tower?',
    options: [
      'The person on whose behalf the inspection is carried out',
      'Overhead power lines, cables, beams and any other overhead obstructions',
      'Prefabricated Access Suppliers and Manufacturers Association',
      'That it is firm, level and capable of supporting the tower and its load',
    ],
    correctAnswer: 3,
    explanation:
      'The ground must be firm, level and capable of supporting the total weight of the tower, plus operatives, tools and materials. Soft, uneven or sloping ground can cause the tower to sink or overturn.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Ground assessment',
    category: 'Assembly',
  },
  {
    id: 88,
    question: 'In what order should a mobile access tower be dismantled?',
    options: [
      'In the reverse order to assembly (top down)',
      'PASMA Photo ID Card (Towers for Users)',
      'A missing guardrail or toeboard',
      'An unlimited fine and/or up to 2 years imprisonment',
    ],
    correctAnswer: 0,
    explanation:
      'Towers must always be dismantled in the reverse order to assembly, working from the top down. This ensures the operative always has adequate protection during the dismantling process.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Dismantling',
    category: 'Assembly',
  },
  {
    id: 89,
    question:
      'During tower assembly, components should be passed to the operative on the tower by what method?',
    options: [
      'The person on whose behalf the inspection is carried out',
      'Handed up by a person at ground level or the level below',
      'A locking mechanism that can be engaged to prevent movement',
      'The manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual and/or a handover certificate',
    ],
    correctAnswer: 1,
    explanation:
      'Components should be passed hand-to-hand from a person at ground level or the level below. They should never be thrown, as this risks injury and damage to components.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Safe handling',
    category: 'Assembly',
  },
  {
    id: 90,
    question: 'What PPE is typically required when assembling a mobile access tower?',
    options: [
      'The tower will lean to one side, reducing its stability and increasing the risk of overturning in that direction',
      'The height at which the wind force acts (increasing height dramatically increases the overturning moment)',
      'Safety helmet, safety footwear, gloves and high-visibility clothing as appropriate to the site',
      'To provide rigidity and prevent the frame from racking (parallelogramming)',
    ],
    correctAnswer: 2,
    explanation:
      'Typical PPE includes a safety helmet, safety footwear, and gloves. High-visibility clothing is usually required on construction sites. Additional PPE may be needed depending on the site risk assessment.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'PPE',
    category: 'Assembly',
  },
  {
    id: 91,
    question: 'After assembly, what document should be available at the base of the tower?',
    options: [
      "Every employer and any person who controls the work of others",
      "A full inspection by a competent person must be carried out before the tower is used",
      "Electrocution from contact with or arcing from the power lines",
      "The manufacturer's instruction manual and/or a handover certificate",
    ],
    correctAnswer: 3,
    explanation:
      "The manufacturer's instruction manual (or a copy) and/or a handover certificate should be available so that users can verify the tower has been correctly assembled and understand safe use requirements.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Documentation',
    category: 'Assembly',
  },
  {
    id: 92,
    question:
      'Which of the following must NOT be used as a substitute for a proper tower platform?',
    options: [
      'Loose scaffold boards or planks placed across the frame',
      'Health and Safety at Work etc. Act 1974',
      'Guardrail system (top rail, mid-rail and toeboard)',
      'The minimum base dimension (the shorter side)',
    ],
    correctAnswer: 0,
    explanation:
      'Loose scaffold boards or planks must never be used as a substitute for a proper platform. Only platforms designed and supplied by the tower manufacturer for that specific tower should be used.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Assembly',
  },
  {
    id: 93,
    question:
      'When assembling a mobile access tower, what is the first step after positioning the base frames and castors?',
    options: [
      'PASMA Photo ID Card (Towers for Users)',
      'Level the tower and lock all castors',
      'In the reverse order to assembly (top down)',
      'They must be locked (brakes engaged)',
    ],
    correctAnswer: 1,
    explanation:
      'After positioning the base frames with castors, the first step is to ensure the tower is level (using adjustable legs if necessary) and to lock all castors firmly before adding any height.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Assembly sequence',
    category: 'Assembly',
  },
  {
    id: 94,
    question:
      'During assembly, why must the trapdoor in the platform always be closed after climbing through?',
    options: [
      'Structural failure of the platform or tower components, potentially causing collapse',
      'To provide rigidity and prevent the frame from racking (parallelogramming)',
      'To maintain the full platform area for working and prevent falls through the opening',
      'Interfere with or misuse anything provided for health and safety',
    ],
    correctAnswer: 2,
    explanation:
      'The trapdoor must be closed after climbing through to maintain the full working area of the platform and to prevent anyone from accidentally falling through the open hatch.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: '3T method',
    category: 'Assembly',
  },

  // --- intermediate (18) ---
  {
    id: 95,
    question:
      'What is the key advantage of the AGR method over the 3T method during tower assembly?',
    options: [
      'They must immediately prevent the tower from being used (e.g. by removing access and displaying a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'Do Not Use\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' notice) and report to the responsible person',
      'The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use',
      'The tower loses structural rigidity and could collapse or rack (parallelogram) under load or wind',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
    ],
    correctAnswer: 3,
    explanation:
      'The key advantage of AGR is that the advance guardrail system provides collective fall protection at all times during assembly. The operative is always protected by guardrails, unlike the 3T method where there is a brief period of reduced protection.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'AGR method',
    category: 'Assembly',
  },
  {
    id: 96,
    question: 'In the 3T assembly method, at what point is the operative most at risk of a fall?',
    options: [
      'When climbing through the trap opening before guardrails at the new level are fully installed',
      'It is never acceptable; the tower must only be built to the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual configurations',
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'To quickly identify any obvious defects, missing components or changes since the last use',
    ],
    correctAnswer: 0,
    explanation:
      'The operative is most at risk when climbing through the trap to the next level, as the guardrails at that new level have not yet been installed. This is why the 3T method requires the operative to remain within the trap opening until guardrails are fitted.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 97,
    question: 'What is the correct sequence for the 3T method of tower assembly at each new level?',
    options: [
      'Assess the severity: light surface oxidation is normal for aluminium, but significant pitting or structural corrosion requires the component to be taken out of service',
      'From the level below: fit frames, fit bracing, fit platform with trap, climb through trap, fit guardrails from inside the trap opening',
      'Restricted access and egress, reduced ventilation, and difficulty in carrying out a rescue in an emergency',
      'Install physical barriers (e.g. concrete blocks, road cones) around the tower base to protect it from vehicle impact',
    ],
    correctAnswer: 1,
    explanation:
      'The 3T sequence is: from the level below, fit the frames, add diagonal bracing, place the platform with trapdoor, climb up through the trap, and then fit the guardrails from within the trap opening before stepping onto the platform.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 98,
    question: 'When should stabilisers be fitted during the assembly of a mobile access tower?',
    options: [
      "Persons not in their employment (e.g. members of the public)",
      "A locking mechanism that can be engaged to prevent movement",
      "At the height specified in the manufacturer's instruction manual",
      "Prefabricated Access Suppliers and Manufacturers Association",
    ],
    correctAnswer: 2,
    explanation:
      "Stabilisers must be fitted at the height specified in the manufacturer's instruction manual. Building beyond this height without stabilisers compromises the tower's stability.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Stabilisers',
    category: 'Assembly',
  },
  {
    id: 99,
    question:
      'During assembly, an operative notices that a horizontal brace is bent. What should they do?',
    options: [
      'They can fall from the platform and strike persons below, causing serious injury or death',
      'Establish an exclusion zone, use physical barriers, ensure forklift drivers are informed, and consider using a banksman',
      'Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months',
      'Remove it from use, tag it as defective, and use a replacement component from the same manufacturer',
    ],
    correctAnswer: 3,
    explanation:
      'Damaged components must never be used. The bent brace should be removed from service, clearly tagged as defective, and replaced with a correct component from the same manufacturer.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Defect management',
    category: 'Assembly',
  },
  {
    id: 100,
    question: 'What should be done if the ground at the base of the tower is slightly soft?',
    options: [
      'Use sole boards (spreader plates) under the castors to distribute the load over a larger area',
      'The height at which the wind force acts (increasing height dramatically increases the overturning moment)',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'To maintain the full platform area for working and prevent falls through the opening',
    ],
    correctAnswer: 0,
    explanation:
      'Sole boards (spreader plates) should be placed under the castors to distribute the point load over a larger area and prevent the castors from sinking into the ground. The ground must still be assessed as adequate.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Ground assessment',
    category: 'Assembly',
  },
  {
    id: 101,
    question:
      'During the site survey before tower assembly, which overhead hazard must be specifically assessed?',
    options: [
      'An unlimited fine and/or up to 2 years imprisonment',
      'Overhead power lines, cables, beams and any other overhead obstructions',
      'Prefabricated Access Suppliers and Manufacturers Association',
      'To increase the effective base dimension and improve stability',
    ],
    correctAnswer: 1,
    explanation:
      'Overhead power lines, cables, structural beams, pipes and other obstructions must be identified during the site survey. Contact with overhead power lines can be fatal.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Site survey',
    category: 'Assembly',
  },
  {
    id: 102,
    question:
      'What is the recommended minimum exclusion zone at the base of a tower during assembly?',
    options: [
      'The tower loses structural rigidity and could collapse or rack (parallelogram) under load or wind',
      'The platform may be damaged, incorrectly seated, or an obstruction may be present — the tower should not be used until the cause is identified and resolved',
      'The area directly below the working area plus a margin for falling objects, typically established with barriers and warning signs',
      'Install physical barriers (e.g. concrete blocks, road cones) around the tower base to protect it from vehicle impact',
    ],
    correctAnswer: 2,
    explanation:
      'An exclusion zone should be established around the base of the tower during assembly and dismantling to protect persons from falling components. Barriers and warning signs should be used.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Site survey',
    category: 'Assembly',
  },
  {
    id: 103,
    question:
      'When dismantling a tower using the 3T method, what must be done before removing the guardrails at any level?',
    options: [
      'The tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s verticality (plumb) should be checked at intervals using a spirit level, and adjustable legs should be readjusted if necessary',
      'Horizontal forces applied to the side of the tower (e.g. from pulling cables, using power tools against walls) can cause overturning',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'The operative must be positioned inside the trapdoor opening (protected by the trap sides) before guardrails are removed',
    ],
    correctAnswer: 3,
    explanation:
      'Before removing guardrails, the operative must position themselves within the trap opening so they are protected by the sides of the trap. This is the reverse of the assembly procedure.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Dismantling',
    category: 'Assembly',
  },
  {
    id: 104,
    question: 'Can a mobile access tower be safely assembled on a slope?',
    options: [
      "No, towers must always be erected on firm, level ground — the base must be levelled using adjustable legs within the manufacturer's specified range",
      "To ensure that a clear procedure is in place to rescue a person who is stranded or injured on the tower, minimising the time they are at risk",
      "After initial assembly, after any event that could affect stability (e.g. strong winds, accidental impact), and after any modification",
      "That the floor has adequate load-bearing capacity for the total tower load including dynamic forces during assembly",
    ],
    correctAnswer: 0,
    explanation:
      "Towers must be erected on firm, level ground. Minor variations can be compensated using adjustable legs within the manufacturer's specified range, but sloping or uneven ground beyond this range is unsuitable.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Ground assessment',
    category: 'Assembly',
  },
  {
    id: 105,
    question:
      'What check must be performed on all connection points (spigots, clips, spring catches) during assembly?',
    options: [
      'The person on whose behalf the inspection is carried out',
      'Each connection must be fully engaged, secure and locked in its correct position',
      'Prefabricated Access Suppliers and Manufacturers Association',
      'To prevent the tower from overturning by increasing the effective base size',
    ],
    correctAnswer: 1,
    explanation:
      'Every connection point must be checked to ensure it is fully engaged, secure and locked in the correct position. Partially engaged connections can fail under load or during use.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Assembly sequence',
    category: 'Assembly',
  },
  {
    id: 106,
    question:
      'What should happen to all tools and materials on the platform before the tower is moved to a new location?',
    options: [
      'They should be secured with rope',
      'They can remain if they weigh less than 10 kg',
      'They must be removed from the platform entirely',
      'They should be placed in the centre of the platform',
    ],
    correctAnswer: 2,
    explanation:
      'All tools, materials and loose items must be removed from the platform before moving the tower. Loose items could fall during movement, and the additional weight and height of the centre of gravity could affect stability.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Moving towers',
    category: 'Assembly',
  },
  {
    id: 107,
    question:
      'During tower assembly in a high-traffic area, what additional measure should be taken?',
    options: [
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
      'Passed hand-to-hand to a person at the level below or lowered carefully to the ground',
      'That the label is present, legible, and the tower configuration matches the label\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s stated maximum platform height and load class',
      'Barriers, warning signs and banksmen/spotters should be used to control pedestrian and vehicle movement near the tower',
    ],
    correctAnswer: 3,
    explanation:
      'In high-traffic areas, barriers, warning signs and banksmen/spotters should be used to control pedestrian and vehicle movement and protect both the assembly team and passers-by.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Site survey',
    category: 'Assembly',
  },
  {
    id: 108,
    question:
      'When fitting diagonal bracing to a tower during assembly, what is the primary consideration?',
    options: [
      'The bracing must be fitted in the correct orientation and on the correct faces as specified by the manufacturer',
      'Structural failure of the platform or tower components, potentially causing collapse',
      'The tower and any work performed must not obstruct or damage sprinkler heads, and the fire safety manager should be informed',
      'Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring',
    ],
    correctAnswer: 0,
    explanation:
      "Diagonal bracing must be fitted exactly as specified in the manufacturer's instruction manual, including correct orientation and placement on the correct faces. Incorrect bracing compromises the tower's structural integrity.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Assembly sequence',
    category: 'Assembly',
  },
  {
    id: 109,
    question:
      'After completing the assembly of a mobile access tower, who should carry out the first use inspection?',
    options: [
      'Any person on site',
      'A competent person',
      'The tower manufacturer',
      'The site security guard',
    ],
    correctAnswer: 1,
    explanation:
      "A competent person must carry out an inspection after assembly and before the tower is first used. They must verify that the tower has been assembled correctly in accordance with the manufacturer's instructions.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Safety checks',
    category: 'Assembly',
  },
  {
    id: 110,
    question:
      'What is the correct procedure if, during assembly, the wind increases to Beaufort Force 4?',
    options: [
      'The tower location, date, details of the inspection, any defects found, actions taken, and the name of the competent person',
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
      'Cease assembly work, secure the partially built tower if possible, and do not resume until conditions improve',
      'Remove it from use, tag it as defective, and use a replacement component from the same manufacturer',
    ],
    correctAnswer: 2,
    explanation:
      'Work must cease at Beaufort Force 4. The partially built tower should be secured if possible (e.g. tied to the structure), and assembly must not resume until wind conditions have improved.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Wind precautions',
    category: 'Assembly',
  },
  {
    id: 111,
    question:
      'What is the purpose of an intermediate platform (non-working platform) within a tower?',
    options: [
      'The Client must ensure a plan is drawn up before the construction phase begins',
      'The tower and any work performed must not obstruct or damage sprinkler heads, and the fire safety manager should be informed',
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
      'It provides additional stiffness to the tower structure and serves as a rest point during climbing',
    ],
    correctAnswer: 3,
    explanation:
      'Intermediate platforms add structural stiffness, reduce unsupported frame lengths, and provide rest points for operatives climbing the internal ladder. They are fitted at intervals specified by the manufacturer.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Assembly',
  },
  {
    id: 112,
    question: 'During dismantling, how should components be lowered from the tower?',
    options: [
      'Passed hand-to-hand to a person at the level below or lowered carefully to the ground',
      'Members of the public could walk into the tower, attempt to climb it, or be struck by falling objects',
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
      'Aluminium is significantly lighter, making towers easier to handle and transport',
    ],
    correctAnswer: 0,
    explanation:
      'Components must be passed hand-to-hand to a person at the level below or carefully lowered to the ground. They must never be dropped, as this risks injury and can damage components.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Dismantling',
    category: 'Assembly',
  },

  // --- advanced (8) ---
  {
    id: 113,
    question: 'When erecting a tower near a fragile roof, what additional planning is required?',
    options: [
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
      'Barriers must prevent anyone from stepping off the tower platform onto the fragile surface, and warning signs must be displayed',
      'The collapse, overturning or failure of any scaffold (including a mobile access tower) from which a person could fall more than 2 metres',
      'A full inspection by a competent person, as relocation is treated the same as re-erection',
    ],
    correctAnswer: 1,
    explanation:
      'When near fragile surfaces, barriers or physical measures must prevent anyone stepping from the tower onto the fragile surface. Warning signs must be displayed, and the risk assessment must specifically address the proximity of the fragile roof.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Site survey',
    category: 'Assembly',
  },
  {
    id: 114,
    question:
      'If a tower is to be left unattended overnight on a construction site, what precautions should be taken?',
    options: [
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
      'The platform may be damaged, incorrectly seated, or an obstruction may be present — the tower should not be used until the cause is identified and resolved',
      'Remove the lowest section of internal access (ladder/climb frames), display warning signs, and check weather forecasts for high winds',
      'They must immediately prevent the tower from being used (e.g. by removing access and displaying a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'Do Not Use\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' notice) and report to the responsible person',
    ],
    correctAnswer: 2,
    explanation:
      'Remove the lowest means of access to prevent unauthorised climbing. Display warning signs and check the weather forecast. If strong winds are expected, consider dismantling the tower or tying it to a permanent structure.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Site security',
    category: 'Assembly',
  },
  {
    id: 115,
    question:
      'During assembly on a reinforced concrete upper floor, what must be verified about the floor before erecting the tower?',
    options: [
      'To quickly identify any obvious defects, missing components or changes since the last use',
      'When there is reason to believe it is no longer valid or there has been a significant change',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
      'That the floor has adequate load-bearing capacity for the total tower load including dynamic forces during assembly',
    ],
    correctAnswer: 3,
    explanation:
      'The floor must have adequate load-bearing capacity for the total weight of the tower, plus operatives, tools and materials, plus dynamic forces during assembly (e.g. lifting frames). A structural assessment may be required.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Ground assessment',
    category: 'Assembly',
  },
  {
    id: 116,
    question:
      'When assembling a linked tower system (two towers joined by a bridging platform), what additional requirement applies?',
    options: [
      'Both towers must be from the same manufacturer and be the same type, and must be assembled to the same height before the bridge is fitted',
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
      'The tower location, date, details of the inspection, any defects found, actions taken, and the name of the competent person',
    ],
    correctAnswer: 0,
    explanation:
      'Both towers must be identical (same manufacturer and type), erected to the same height, and levelled before the bridging platform is fitted. Guardrails must be provided on all exposed edges of the bridge.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Linked towers',
    category: 'Assembly',
  },
  {
    id: 117,
    question:
      "When is it acceptable to modify a mobile access tower from the manufacturer's specified configuration?",
    options: [
      "Verify that the ground has not deteriorated (e.g. due to rain, excavation nearby, or loading) and that sole boards are still effective",
      "It is never acceptable; the tower must only be built to the manufacturer's instruction manual configurations",
      "A person falling from the tower or stepping off the platform could fall through the floor opening to a lower level",
      "Safety helmet, safety footwear, gloves and high-visibility clothing as appropriate to the site",
    ],
    correctAnswer: 1,
    explanation:
      "Mobile access towers must only be assembled in the configurations specified in the manufacturer's instruction manual. Any modification outside these configurations invalidates the design and may be unsafe.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Assembly sequence',
    category: 'Assembly',
  },
  {
    id: 118,
    question:
      'During assembly of a tall tower (above 8 metres), what additional check should be performed at regular intervals as the tower grows?',
    options: [
      "When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days",
      "Members of the public could walk into the tower, attempt to climb it, or be struck by falling objects",
      "The tower's verticality (plumb) should be checked at intervals using a spirit level, and adjustable legs should be readjusted if necessary",
      "Do NOT touch the tower; warn others to stay clear; call the network operator and emergency services; do not approach until confirmed safe",
    ],
    correctAnswer: 2,
    explanation:
      "As the tower grows taller, small deviations from plumb are amplified. The tower's verticality should be checked at regular intervals and adjustable legs readjusted to maintain the tower in a truly vertical position.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Assembly sequence',
    category: 'Assembly',
  },
  {
    id: 119,
    question:
      'What special consideration applies when assembling a tower inside a building with an automatic sprinkler system?',
    options: [
      'Remove it from use, tag it as defective, and use a replacement component from the same manufacturer',
      'Establish an exclusion zone, use physical barriers, ensure forklift drivers are informed, and consider using a banksman',
      'Additional loads and forces not accounted for in the tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s design can cause structural failure or overturning',
      'The tower and any work performed must not obstruct or damage sprinkler heads, and the fire safety manager should be informed',
    ],
    correctAnswer: 3,
    explanation:
      'Sprinkler heads must not be obstructed, damaged or removed. The fire safety manager should be informed so that any necessary temporary measures can be implemented whilst the tower is in place.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Site survey',
    category: 'Assembly',
  },
  {
    id: 120,
    question:
      'When a tower must be tied to a permanent structure for additional stability, what is the correct method of tying?',
    options: [
      'Use ties at intervals and positions specified by the manufacturer, secured to structurally adequate anchor points, with ties capable of resisting both tension and compression',
      'A sudden rush of pooled, deoxygenated blood from the legs to the heart can cause cardiac arrest (rescue death/reflow syndrome)',
      'Assess whether the chemicals could have caused material degradation (e.g. chemical attack on aluminium or GRP), consult the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s guidance on chemical compatibility, and decontaminate before handling',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
    ],
    correctAnswer: 0,
    explanation:
      "Ties must be fitted at the intervals and positions specified by the manufacturer's instruction manual, secured to structurally adequate anchor points. Ties must resist both tension (pull) and compression (push) forces.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Assembly',
  },

  // =======================================================================
  // INSPECTION — 40 questions (id 121–160)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 121,
    question: 'How often must a pre-use visual check be carried out on a mobile access tower?',
    options: [
      'A site survey and risk assessment',
      'Before each use (daily as a minimum)',
      'Within 24 hours of the request',
      'Health and Safety Executive (HSE)',
    ],
    correctAnswer: 1,
    explanation:
      'A pre-use visual check must be carried out before each use and at the start of every working day as a minimum. This is a quick check by the user to ensure nothing obvious has changed.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 122,
    question:
      'Under the Work at Height Regulations 2005, how often must a formal inspection of a mobile access tower be carried out on a construction site?',
    options: [
      'Every 3 days',
      'Every 28 days',
      'Every 7 days',
      'Every 14 days',
    ],
    correctAnswer: 2,
    explanation:
      'The Work at Height Regulations require a formal inspection at least every 7 days when the tower is on a construction site. The inspection must be recorded in writing.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: '7-day inspection',
    category: 'Inspection',
  },
  {
    id: 123,
    question: 'A formal inspection of a mobile access tower must be carried out by whom?',
    options: [
      'The site cleaner',
      "Only the tower manufacturer's representative",
      'Any person on site',
      'A competent person',
    ],
    correctAnswer: 3,
    explanation:
      "Formal inspections must be carried out by a competent person — someone with sufficient training and experience or knowledge to identify defects and assess the tower's safety.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Competent person',
    category: 'Inspection',
  },
  {
    id: 124,
    question:
      'When must a mobile access tower be inspected in addition to the regular 7-day cycle?',
    options: [
      'After initial assembly, after any event that could affect stability (e.g. strong winds, accidental impact), and after any modification',
      'From the level below: fit frames, fit bracing, fit platform with trap, climb through trap, fit guardrails from inside the trap opening',
      'Horizontal forces applied to the side of the tower (e.g. from pulling cables, using power tools against walls) can cause overturning',
      'Cease assembly work, secure the partially built tower if possible, and do not resume until conditions improve',
    ],
    correctAnswer: 0,
    explanation:
      'Inspections are required: after initial assembly before first use; after any event likely to have affected stability (strong winds, vehicle impact); and after any alteration, modification or relocation.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Inspection triggers',
    category: 'Inspection',
  },
  {
    id: 125,
    question: 'What is the purpose of a pre-use visual check on a mobile access tower?',
    options: [
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
      'To quickly identify any obvious defects, missing components or changes since the last use',
      'This cannot be determined from the ratio alone; the manufacturer\'s manual must be consulted',
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
    ],
    correctAnswer: 1,
    explanation:
      'The pre-use check is a quick visual assessment to identify any obvious defects, missing components, damage or unauthorised changes that may have occurred since the tower was last used.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 126,
    question: 'What key information must be recorded in a formal tower inspection report?',
    options: [
      'The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use',
      'The bracing must be fitted in the correct orientation and on the correct faces as specified by the manufacturer',
      'The tower location, date, details of the inspection, any defects found, actions taken, and the name of the competent person',
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
    ],
    correctAnswer: 2,
    explanation:
      'A formal inspection report must include: the location, date, tower identification, details of what was inspected, any defects found, actions taken, and the name and signature of the competent person.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Documentation',
    category: 'Inspection',
  },
  {
    id: 127,
    question:
      'During a pre-use check, which of the following would require the tower to be taken out of use immediately?',
    options: [
      'A small scratch on the paintwork',
      'Dust on the platform',
      'A label that is slightly faded',
      'A missing guardrail or toeboard',
    ],
    correctAnswer: 3,
    explanation:
      'A missing guardrail or toeboard is a critical defect that removes edge protection. The tower must be taken out of use immediately and not used until the missing component is replaced.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Defect identification',
    category: 'Inspection',
  },
  {
    id: 128,
    question:
      'Who is responsible for ensuring that tower inspections are carried out at the required intervals?',
    options: [
      'The employer or person controlling the work',
      'Before each use (daily as a minimum)',
      'A full-length platform with toeboards on all open sides',
      'Health and Safety Executive (HSE)',
    ],
    correctAnswer: 0,
    explanation:
      'The employer or person controlling the work is responsible for ensuring that all required inspections (pre-use, 7-day, and event-triggered) are carried out and properly recorded.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Responsibilities',
    category: 'Inspection',
  },
  {
    id: 129,
    question: 'What should be checked regarding the castors during a pre-use inspection?',
    options: [
      'The bracing must be fitted in the correct orientation and on the correct faces as specified by the manufacturer',
      'That all castors are present, undamaged, and that the brakes lock and release properly',
      'Self-rescue first, then assisted rescue from the ground, then professional emergency services',
      'The height at which the wind force acts (increasing height dramatically increases the overturning moment)',
    ],
    correctAnswer: 1,
    explanation:
      'During a pre-use check, verify that all castors are present, free from damage, and that the locking brakes engage and release properly. Faulty castors could allow the tower to move unexpectedly.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 130,
    question:
      'During an inspection, what condition of a horizontal brace would indicate it must be replaced?',
    options: [
      'The person on whose behalf the inspection is carried out',
      'Prefabricated Access Suppliers and Manufacturers Association',
      'A visible bend, crack, dent or missing locking mechanism',
      'To level the tower on slightly uneven ground',
    ],
    correctAnswer: 2,
    explanation:
      'A visible bend, crack, significant dent or missing/damaged locking mechanism indicates structural compromise. The brace must be removed from service and replaced with an undamaged component.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Defect identification',
    category: 'Inspection',
  },
  {
    id: 131,
    question:
      "What is the definition of a 'competent person' for the purpose of tower inspections?",
    options: [
      "The tower must be taken out of use, the defect repaired or the component replaced, and the tower re-inspected before use resumes",
      "They can fall from the platform and strike persons below, causing serious injury or death",
      "Install physical barriers (e.g. concrete blocks, road cones) around the tower base to protect it from vehicle impact",
      "A person with sufficient training, experience or knowledge to identify defects and assess the tower's fitness for continued use",
    ],
    correctAnswer: 3,
    explanation:
      'A competent person is someone with sufficient training, experience or knowledge and other qualities that allow them to properly identify defects and assess whether the tower is fit for continued use.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Competent person',
    category: 'Inspection',
  },
  {
    id: 132,
    question: "What should be checked about the tower's stability during a pre-use inspection?",
    options: [
      'That the tower is plumb, level, on firm ground, and that stabilisers/outriggers are correctly fitted and secure',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
      'It significantly increases the wind loading on the tower, greatly increasing the risk of overturning',
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
    ],
    correctAnswer: 0,
    explanation:
      'Check that the tower is plumb (vertical), the base is level, the ground is firm, and any required stabilisers or outriggers are correctly positioned, extended and secured.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 133,
    question: 'What must happen if a formal 7-day inspection reveals a significant defect?',
    options: [
      'Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring',
      'The tower must be taken out of use, the defect repaired or the component replaced, and the tower re-inspected before use resumes',
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
      'A written or electronic record covering: tower identification, location, date, configuration, defects found, actions taken, and the inspector\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s details',
    ],
    correctAnswer: 1,
    explanation:
      'If a significant defect is found, the tower must be immediately taken out of use. The defect must be repaired or the component replaced, and the tower must be re-inspected by a competent person before use can resume.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Defect management',
    category: 'Inspection',
  },
  {
    id: 134,
    question:
      'During a pre-use check, you notice that one outrigger is not in contact with the ground. What should you do?',
    options: [
      'To allow safe internal access through the platform whilst maintaining full guardrail protection',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'Do not use the tower; report the issue so that the outrigger can be adjusted to make firm contact with the ground',
      'This cannot be determined from the ratio alone; the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s manual must be consulted',
    ],
    correctAnswer: 2,
    explanation:
      'All outriggers must be in firm contact with the ground to provide their stabilising function. An outrigger not touching the ground provides no benefit. The tower must not be used until corrected.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },

  // --- intermediate (18) ---
  {
    id: 135,
    question: 'What does a Tower Inspection Record typically consist of?',
    options: [
      "Barriers, warning signs and banksmen/spotters should be used to control pedestrian and vehicle movement near the tower",
      "It is never acceptable; the tower must only be built to the manufacturer's instruction manual configurations",
      "Verify that the ground has not deteriorated (e.g. due to rain, excavation nearby, or loading) and that sole boards are still effective",
      "A written or electronic record covering: tower identification, location, date, configuration, defects found, actions taken, and the inspector's details",
    ],
    correctAnswer: 3,
    explanation:
      "A Tower Inspection Record is a formal written or electronic document that records all relevant details of the inspection, including identification, location, date, configuration, defects, corrective actions, and the competent person's details.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Documentation',
    category: 'Inspection',
  },
  {
    id: 136,
    question: 'How long must inspection records be retained on a construction site?',
    options: [
      'Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months',
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
      'After initial assembly, after any event that could affect stability (e.g. strong winds, accidental impact), and after any modification',
      'From the level below: fit frames, fit bracing, fit platform with trap, climb through trap, fit guardrails from inside the trap opening',
    ],
    correctAnswer: 0,
    explanation:
      'Inspection records must be kept until the next inspection at that place of work. On a construction site, they must be retained for at least 3 months after the date of the inspection.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Documentation',
    category: 'Inspection',
  },
  {
    id: 137,
    question:
      'During an inspection, what aspects of the guardrail system should be specifically checked?',
    options: [
      'The tower and any work performed must not obstruct or damage sprinkler heads, and the fire safety manager should be informed',
      'That top guardrails are at the correct height (950 mm), mid-rails are present, toeboards are in place, and all connections are secure',
      'The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use',
      'Wet surfaces increase the risk of slipping during climbing, and waterlogged ground may not support the tower adequately',
    ],
    correctAnswer: 1,
    explanation:
      'Check that top guardrails are at the correct height (minimum 950 mm), mid-rails are present at approximately 470 mm, toeboards are in place (minimum 150 mm), and all fixing points are fully engaged and secure.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Guardrail checks',
    category: 'Inspection',
  },
  {
    id: 138,
    question:
      'After strong winds overnight (Beaufort 6+), what must happen before a tower can be used the following morning?',
    options: [
      'To prevent the tower from overturning by increasing the effective base size',
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
      'A full inspection by a competent person must be carried out before the tower is used',
      'Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted',
    ],
    correctAnswer: 2,
    explanation:
      "After any event that could affect the tower's stability (including strong winds), a full inspection by a competent person must be carried out before the tower is used. The event triggers an additional inspection requirement.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Inspection triggers',
    category: 'Inspection',
  },
  {
    id: 139,
    question: "What should be checked about the tower's bracing during a formal inspection?",
    options: [
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
      'Passed hand-to-hand to a person at the level below or lowered carefully to the ground',
      'To allow safe internal access through the platform whilst maintaining full guardrail protection',
      'That all bracing members are present, correctly positioned, undamaged, and that all clips/connections are fully engaged',
    ],
    correctAnswer: 3,
    explanation:
      "All diagonal and horizontal bracing must be present, correctly positioned as per the manufacturer's instructions, free from damage (bends, cracks, dents), and all clips and connections fully engaged and locked.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Structural checks',
    category: 'Inspection',
  },
  {
    id: 140,
    question:
      'During an inspection, corrosion is found on several aluminium components. What action is appropriate?',
    options: [
      'Assess the severity: light surface oxidation is normal for aluminium, but significant pitting or structural corrosion requires the component to be taken out of service',
      'The tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s verticality (plumb) should be checked at intervals using a spirit level, and adjustable legs should be readjusted if necessary',
      'It is a legal document that can be required for production by an HSE inspector and may be used as evidence in legal proceedings',
      'Platform height is the height of the working platform; working height is typically platform height plus approximately 2 metres (average reach)',
    ],
    correctAnswer: 0,
    explanation:
      'Light surface oxidation is normal on aluminium alloy and does not affect structural integrity. However, significant pitting corrosion, particularly near connection points or welds, could weaken the component and requires it to be removed from service.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Defect identification',
    category: 'Inspection',
  },
  {
    id: 141,
    question: 'A tower has been relocated to a new position on site. What inspection is required?',
    options: [
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
      'A full inspection by a competent person, as relocation is treated the same as re-erection',
      'Falls from height (due to collapse, overturning, or falling from an unprotected platform)',
      'The tower could overturn, the person could fall, and they have no control over the direction of travel',
    ],
    correctAnswer: 1,
    explanation:
      "After relocation, a full inspection by a competent person is required. The move may have affected the tower's level, castor locks, brace connections, or stability, and the new ground conditions must be assessed.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Inspection triggers',
    category: 'Inspection',
  },
  {
    id: 142,
    question:
      'What visual indicator on a tower component suggests it has been previously overloaded?',
    options: [
      'It significantly increases the wind loading on the tower, greatly increasing the risk of overturning',
      'The manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual and/or a handover certificate',
      'Permanent deformation (bend, bow or twist) in a frame member, brace or platform',
      'To increase the effective base dimension and improve stability',
    ],
    correctAnswer: 2,
    explanation:
      'Permanent deformation such as bends, bows or twists in structural members indicates the component has been subjected to forces beyond its design capacity. It must be removed from service.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Defect identification',
    category: 'Inspection',
  },
  {
    id: 143,
    question:
      'During a pre-use check, you notice that the platform trapdoor does not close flush. What does this indicate?',
    options: [
      'Use ties at intervals and positions specified by the manufacturer, secured to structurally adequate anchor points, with ties capable of resisting both tension and compression',
      'Towers for Users covers assembly and dismantling; Work at Height Essentials covers safe use only (no assembly)',
      'The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use',
      'The platform may be damaged, incorrectly seated, or an obstruction may be present — the tower should not be used until the cause is identified and resolved',
    ],
    correctAnswer: 3,
    explanation:
      'A trapdoor that does not close flush may indicate platform damage, incorrect seating, a bent hinge, or an obstruction. The tower should not be used until the cause is identified and corrected.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 144,
    question: 'What should be specifically checked about the platforms during an inspection?',
    options: [
      'That platforms are correctly seated, undamaged, windlocks engaged, trapdoors functioning, and surfaces are not excessively worn or slippery',
      'Verify that the ground has not deteriorated (e.g. due to rain, excavation nearby, or loading) and that sole boards are still effective',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
    ],
    correctAnswer: 0,
    explanation:
      'Check that platforms are correctly seated on the frames, undamaged, windlocks are engaged (to prevent wind lifting them), trapdoors open and close properly, and surfaces are not excessively worn, damaged or slippery.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Structural checks',
    category: 'Inspection',
  },
  {
    id: 145,
    question:
      'If an unauthorised modification is discovered during a 7-day inspection (e.g. a missing brace that someone has removed), what must happen?',
    options: [
      'It is a legal document that can be required for production by an HSE inspector and may be used as evidence in legal proceedings',
      'The tower must be taken out of use immediately, the modification reversed, and a full re-inspection carried out before use resumes',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'Self-rescue first, then assisted rescue from the ground, then professional emergency services',
    ],
    correctAnswer: 1,
    explanation:
      'Unauthorised modifications are a serious safety concern. The tower must be taken out of use, the modification reversed (component replaced), and a full inspection carried out by a competent person before the tower can be used again.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Defect management',
    category: 'Inspection',
  },
  {
    id: 146,
    question:
      'What check should be made regarding the ground conditions during a routine inspection?',
    options: [
      'That all rungs are present, undamaged, free from grease or debris, and that the access route is clear of obstructions',
      'The collapse, overturning or failure of any scaffold (including a mobile access tower) from which a person could fall more than 2 metres',
      'Verify that the ground has not deteriorated (e.g. due to rain, excavation nearby, or loading) and that sole boards are still effective',
      'The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use',
    ],
    correctAnswer: 2,
    explanation:
      "Ground conditions can change over time due to weather, nearby excavation, or loading. Regular checks should verify that the ground remains firm, level and capable of supporting the tower's load.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Ground checks',
    category: 'Inspection',
  },
  {
    id: 147,
    question:
      'What inspection is required after a vehicle has struck a mobile access tower, even if no obvious damage is visible?',
    options: [
      'Each connection must be fully engaged, secure and locked in its correct position',
      'A visible bend, crack, dent or missing locking mechanism',
      'The manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual and/or a handover certificate',
      'A full inspection by a competent person before the tower is used again',
    ],
    correctAnswer: 3,
    explanation:
      "Any impact, even if no obvious damage is visible, could have caused hidden structural damage, loosened connections, or affected the tower's level and stability. A full inspection by a competent person is required.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Inspection triggers',
    category: 'Inspection',
  },
  {
    id: 148,
    question:
      'During an inspection, a spring clip on a frame connection is found to be missing. What should happen?',
    options: [
      "The tower must not be used until the clip is replaced with the correct manufacturer's component",
      "This cannot be determined from the ratio alone; the manufacturer's manual must be consulted",
      "When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days",
      "The depth of the excavation multiplied by 1.5, or as determined by a competent person",
    ],
    correctAnswer: 0,
    explanation:
      'Spring clips are critical safety components that prevent frames from disconnecting. The tower must not be used until the correct replacement clip from the manufacturer is fitted.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Defect identification',
    category: 'Inspection',
  },
  {
    id: 149,
    question:
      'When inspecting the access route within the tower (internal ladder/climb frames), what should be checked?',
    options: [
      'The operative must be positioned inside the trapdoor opening (protected by the trap sides) before guardrails are removed',
      'That all rungs are present, undamaged, free from grease or debris, and that the access route is clear of obstructions',
      'This cannot be determined from the ratio alone; the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s manual must be consulted',
      'Remove it from use, tag it as defective, and use a replacement component from the same manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'Check that all rungs are present, undamaged, and free from grease, ice, debris or other slip hazards. The access route through the tower must be clear of obstructions at every level.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Structural checks',
    category: 'Inspection',
  },
  {
    id: 150,
    question: "What is the inspector's responsibility if they believe the tower is unsafe to use?",
    options: [
      "Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months",
      "No, towers must always be erected on firm, level ground — the base must be levelled using adjustable legs within the manufacturer's specified range",
      "They must immediately prevent the tower from being used (e.g. by removing access and displaying a 'Do Not Use' notice) and report to the responsible person",
      "The tower location, date, details of the inspection, any defects found, actions taken, and the name of the competent person",
    ],
    correctAnswer: 2,
    explanation:
      "If the tower is deemed unsafe, the inspector must take immediate action to prevent its use — typically by removing the lowest means of access and displaying a prominent 'Do Not Use' notice — and report the situation to the responsible person.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Responsibilities',
    category: 'Inspection',
  },
  {
    id: 151,
    question:
      'When multiple towers are in use on the same site, how should inspection records be managed?',
    options: [
      'The tower must be immediately taken out of use and reduced to a compliant configuration or dismantled entirely',
      'From the level below: fit frames, fit bracing, fit platform with trap, climb through trap, fit guardrails from inside the trap opening',
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'Each tower must have its own individual inspection record, clearly identified with its unique location or reference number',
    ],
    correctAnswer: 3,
    explanation:
      "Each tower must have its own individual inspection record clearly identifying which specific tower was inspected, including its location or unique reference number. Generic records covering 'all towers' are not sufficient.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Documentation',
    category: 'Inspection',
  },
  {
    id: 152,
    question:
      "What information on the tower's product label should be verified during a formal inspection?",
    options: [
      "That the label is present, legible, and the tower configuration matches the label's stated maximum platform height and load class",
      "The bracing must be fitted in the correct orientation and on the correct faces as specified by the manufacturer",
      "The vertical frame that connects across the width of the tower, incorporating the rungs for climbing",
      "To allow safe internal access through the platform whilst maintaining full guardrail protection",
    ],
    correctAnswer: 0,
    explanation:
      "Verify that the product label is present and legible, and critically, that the tower's actual configuration (height, width, stabiliser arrangement) does not exceed the label's stated maximum platform height or load class.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Structural checks',
    category: 'Inspection',
  },

  // --- advanced (8) ---
  {
    id: 153,
    question:
      'The Work at Height Regulations 2005, Regulation 12 specifies the content of inspection reports. Which of the following is NOT a required element?',
    options: [
      'Location and description of the equipment inspected',
      'The purchase price of the equipment',
      'Details of any matter identified that could give rise to a risk to health or safety',
      'Name and address of the person for whom the inspection was carried out',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 12 requires: identity of the equipment, location, date, details of the inspection, matters identified that could give rise to risk, actions taken, and details of the person carrying out the inspection. Purchase price is not required.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Documentation',
    category: 'Inspection',
  },
  {
    id: 154,
    question:
      'What is the legal status of a tower inspection report under the Work at Height Regulations 2005?',
    options: [
      'A written or electronic record covering: tower identification, location, date, configuration, defects found, actions taken, and the inspector\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s details',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'It is a legal document that can be required for production by an HSE inspector and may be used as evidence in legal proceedings',
      'That top guardrails are at the correct height (950 mm), mid-rails are present, toeboards are in place, and all connections are secure',
    ],
    correctAnswer: 2,
    explanation:
      'The inspection report is a legal document under the Work at Height Regulations. It can be required for production by an HSE inspector and may be used as evidence in enforcement action or legal proceedings.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Documentation',
    category: 'Inspection',
  },
  {
    id: 155,
    question:
      'A tower on a construction site has not been used for 12 days but remains erected. How many formal inspections should have been completed in this period?',
    options: [
      'That platforms are correctly seated, undamaged, windlocks engaged, trapdoors functioning, and surfaces are not excessively worn or slippery',
      'Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring',
      'The operative must be positioned inside the trapdoor opening (protected by the trap sides) before guardrails are removed',
      'The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use',
    ],
    correctAnswer: 3,
    explanation:
      'The 7-day inspection cycle applies continuously whilst the tower is erected, regardless of whether it is being used. At least one inspection at the 7-day mark is required, and a further pre-use inspection would be needed before use resumes.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: '7-day inspection',
    category: 'Inspection',
  },
  {
    id: 156,
    question:
      'When inspecting a tower that has been exposed to chemical contamination (e.g. near a chemical spill), what additional assessment is required?',
    options: [
      "Assess whether the chemicals could have caused material degradation (e.g. chemical attack on aluminium or GRP), consult the manufacturer's guidance on chemical compatibility, and decontaminate before handling",
      "No, towers must always be erected on firm, level ground — the base must be levelled using adjustable legs within the manufacturer's specified range",
      "Use ties at intervals and positions specified by the manufacturer, secured to structurally adequate anchor points, with ties capable of resisting both tension and compression",
      "Cracked, corroded or incomplete welds indicate potential structural failure at the joint, which is a critical defect requiring immediate removal of the component",
    ],
    correctAnswer: 0,
    explanation:
      "Certain chemicals can attack aluminium alloy or GRP. The manufacturer's guidance on chemical compatibility must be consulted, affected components assessed for material degradation, and the tower must be decontaminated before handling.",
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Defect identification',
    category: 'Inspection',
  },
  {
    id: 157,
    question:
      'What is the significance of checking weld integrity during a formal inspection of aluminium tower components?',
    options: [
      'Assess the severity: light surface oxidation is normal for aluminium, but significant pitting or structural corrosion requires the component to be taken out of service',
      'Cracked, corroded or incomplete welds indicate potential structural failure at the joint, which is a critical defect requiring immediate removal of the component',
      'From the level below: fit frames, fit bracing, fit platform with trap, climb through trap, fit guardrails from inside the trap opening',
      'A potentially fatal condition where blood pools in the legs of a person suspended motionless in a harness, reducing blood flow to vital organs',
    ],
    correctAnswer: 1,
    explanation:
      'Aluminium alloy tower components rely on welded joints for structural integrity. Cracked, corroded, or incomplete welds could lead to joint failure under load. This is a critical defect requiring immediate removal from service.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Defect identification',
    category: 'Inspection',
  },
  {
    id: 158,
    question:
      "If an inspection reveals that a tower exceeds the maximum configuration shown in the manufacturer's instruction manual, what is the correct course of action?",
    options: [
      'Safety helmet, safety footwear, gloves and high-visibility clothing as appropriate to the site',
      'Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring',
      'The tower must be immediately taken out of use and reduced to a compliant configuration or dismantled entirely',
      'The bracing must be fitted in the correct orientation and on the correct faces as specified by the manufacturer',
    ],
    correctAnswer: 2,
    explanation:
      "A tower erected beyond its design limits is structurally unsafe. It must be immediately taken out of use and either reduced to a configuration that complies with the manufacturer's manual or dismantled entirely.",
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Defect management',
    category: 'Inspection',
  },
  {
    id: 159,
    question: 'How should defective tower components be managed once removed from service?',
    options: [
      'That platforms are correctly seated, undamaged, windlocks engaged, trapdoors functioning, and surfaces are not excessively worn or slippery',
      'Each tower must have its own individual inspection record, clearly identified with its unique location or reference number',
      'The platform may be damaged, incorrectly seated, or an obstruction may be present — the tower should not be used until the cause is identified and resolved',
      'Clearly tagged/marked as defective, segregated from usable stock, and returned to the supplier or disposed of to prevent inadvertent re-use',
    ],
    correctAnswer: 3,
    explanation:
      'Defective components must be clearly tagged as defective, physically segregated from usable stock to prevent accidental re-use, and returned to the supplier for assessment or properly disposed of.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Defect management',
    category: 'Inspection',
  },
  {
    id: 160,
    question:
      'A client requests a copy of the tower inspection records. Under the Work at Height Regulations, within what timeframe must a copy be provided?',
    options: [
      'Within 24 hours of the request',
      'Within 7 days',
      'Within 28 days',
      'There is no obligation to provide a copy',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 12 of the Work at Height Regulations 2005, a copy of the inspection report must be provided to any person on whose behalf the inspection was carried out within 24 hours of the request.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Documentation',
    category: 'Inspection',
  },

  // =======================================================================
  // HAZARDS — 40 questions (id 161–200)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 161,
    question: 'What is the most common cause of fatal accidents involving mobile access towers?',
    options: [
      'The tower will lean to one side, reducing its stability and increasing the risk of overturning in that direction',
      'Falls from height (due to collapse, overturning, or falling from an unprotected platform)',
      'Permanent deformation (bend, bow or twist) in a frame member, brace or platform',
      'The height at which the wind force acts (increasing height dramatically increases the overturning moment)',
    ],
    correctAnswer: 1,
    explanation:
      'Falls from height are the most common cause of fatal accidents involving mobile access towers. These result from tower collapse, overturning, or falls from platforms without adequate edge protection.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Common accidents',
    category: 'Hazards',
  },
  {
    id: 162,
    question: "What is the risk assessment '5-step process' recommended by the HSE?",
    options: [
      'Wet surfaces increase the risk of slipping during climbing, and waterlogged ground may not support the tower adequately',
      'The standard does not set a single limit; it depends on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review and update',
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
    ],
    correctAnswer: 2,
    explanation:
      "The HSE's 5 steps to risk assessment are: (1) identify the hazards, (2) decide who might be harmed and how, (3) evaluate the risks and decide on precautions, (4) record your findings and implement them, (5) review and update.",
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Risk assessment',
    category: 'Hazards',
  },
  {
    id: 163,
    question: 'Why must no person remain on a mobile access tower while it is being moved?',
    options: [
      'Wet surfaces increase the risk of slipping during climbing, and waterlogged ground may not support the tower adequately',
      'It is never acceptable; the tower must only be built to the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual configurations',
      'This cannot be determined from the ratio alone; the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s manual must be consulted',
      'The tower could overturn, the person could fall, and they have no control over the direction of travel',
    ],
    correctAnswer: 3,
    explanation:
      'Moving a tower with a person on it is extremely dangerous. The tower could overturn if it hits an obstruction, the person could lose balance and fall, and the elevated centre of gravity significantly increases the risk of overturning.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Moving towers',
    category: 'Hazards',
  },
  {
    id: 164,
    question: 'What is the main risk of overloading a mobile access tower platform?',
    options: [
      'Structural failure of the platform or tower components, potentially causing collapse',
      'To quickly identify any obvious defects, missing components or changes since the last use',
      'The tower must not be used until the clip is replaced with the correct manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s component',
      'A full inspection by a competent person, as relocation is treated the same as re-erection',
    ],
    correctAnswer: 0,
    explanation:
      'Overloading can cause structural failure of the platform or supporting components, potentially leading to collapse. The maximum platform load (typically 275 kg) must never be exceeded.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Common accidents',
    category: 'Hazards',
  },
  {
    id: 165,
    question:
      'What is the primary hazard of using a mobile access tower near overhead power lines?',
    options: [
      'Guardrail system (top rail, mid-rail and toeboard)',
      'Electrocution from contact with or arcing from the power lines',
      'Every employer and any person who controls the work of others',
      'Aluminium is significantly lighter, making towers easier to handle and transport',
    ],
    correctAnswer: 1,
    explanation:
      'Contact with overhead power lines or being within arcing distance is almost always fatal. Electricity can arc across a gap without direct contact, particularly at higher voltages.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Overhead power lines',
    category: 'Hazards',
  },
  {
    id: 166,
    question:
      'What should you do if you see someone climbing the outside of a mobile access tower?',
    options: [
      'A type of adjustable guardrail frame that provides collective fall protection during assembly',
      'To prevent the tower from overturning by increasing the effective base size',
      'Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted',
      'When climbing through the trap opening before guardrails at the new level are fully installed',
    ],
    correctAnswer: 2,
    explanation:
      'Climbing the outside of a tower is extremely dangerous as there is no fall protection. It must be stopped immediately. Access should only be via the internal access route (ladder through the trapdoor).',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Unsafe practices',
    category: 'Hazards',
  },
  {
    id: 167,
    question: 'What does RIDDOR stand for?',
    options: [
      'Regulation for Identifying Dangerous and Destructive Operational Risks',
      'Recording of Industrial Defects, Damages and Official Reports',
      'Register of Incidents, Deficiencies and Departmental Oversight Records',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
    ],
    correctAnswer: 3,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. It requires the reporting of specified workplace injuries, diseases and dangerous occurrences to the HSE.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'RIDDOR',
    category: 'Hazards',
  },
  {
    id: 168,
    question: 'Which of the following is an unsafe practice when using a mobile access tower?',
    options: [
      'Leaning out over the guardrail to extend reach',
      'Locking all castors before climbing',
      'Closing the trapdoor after climbing through',
      'Checking the weather before starting work',
    ],
    correctAnswer: 0,
    explanation:
      'Leaning out over the guardrail is extremely dangerous as it shifts the centre of gravity outward, increasing the risk of the tower overturning or the person falling over the guardrail.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Unsafe practices',
    category: 'Hazards',
  },
  {
    id: 169,
    question: 'What is the risk of leaving tools and materials unsecured on a tower platform?',
    options: [
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'They can fall from the platform and strike persons below, causing serious injury or death',
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
      'A type of adjustable guardrail frame that provides collective fall protection during assembly',
    ],
    correctAnswer: 1,
    explanation:
      'Unsecured tools and materials can fall from the platform edge and strike persons below. Even a small tool dropped from height can cause serious or fatal injuries. Toeboards help prevent this.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Falling objects',
    category: 'Hazards',
  },
  {
    id: 170,
    question: 'What is suspension trauma?',
    options: [
      'The area directly below the working area plus a margin for falling objects, typically established with barriers and warning signs',
      'A written or electronic record covering: tower identification, location, date, configuration, defects found, actions taken, and the inspector\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s details',
      'A potentially fatal condition where blood pools in the legs of a person suspended motionless in a harness, reducing blood flow to vital organs',
      'The standard does not specify a maximum deflection for castors; it specifies overall tower deflection limits',
    ],
    correctAnswer: 2,
    explanation:
      'Suspension trauma (orthostatic intolerance) occurs when a person is suspended motionless in a harness. Blood pools in the legs, reducing flow to the heart and brain, which can be fatal within 15-20 minutes without rescue.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Suspension trauma',
    category: 'Hazards',
  },
  {
    id: 171,
    question: 'What is the correct rescue hierarchy if a person is stranded or injured on a tower?',
    options: [
      'A full inspection by a competent person before the tower is used again',
      'To prevent the tower from overturning by increasing the effective base size',
      'Passed hand-to-hand to a person at the level below or lowered carefully to the ground',
      'Self-rescue first, then assisted rescue from the ground, then professional emergency services',
    ],
    correctAnswer: 3,
    explanation:
      'The rescue hierarchy is: (1) self-rescue by the injured person if possible, (2) assisted rescue by trained colleagues from the ground, (3) professional emergency services (fire brigade, ambulance).',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Rescue',
    category: 'Hazards',
  },
  {
    id: 172,
    question:
      'What hazard is created by failing to lock the castors before climbing a mobile access tower?',
    options: [
      'The tower could roll unexpectedly, causing loss of balance or overturning',
      'Passed hand-to-hand to a person at the level below or lowered carefully to the ground',
      'That all castors are present, undamaged, and that the brakes lock and release properly',
      'The force multiplied by the distance that tends to tip the tower about its base edge',
    ],
    correctAnswer: 0,
    explanation:
      'Unlocked castors allow the tower to roll unexpectedly when force is applied (e.g. by climbing, wind, or leaning). This can cause loss of balance, falls, or tower overturning.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Common accidents',
    category: 'Hazards',
  },
  {
    id: 173,
    question:
      'What is the main risk when a tower is erected on a surface that slopes in one direction?',
    options: [
      'A full inspection by a competent person must be carried out before the tower is used',
      'The tower will lean to one side, reducing its stability and increasing the risk of overturning in that direction',
      'The height at which the wind force acts (increasing height dramatically increases the overturning moment)',
      'Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted',
    ],
    correctAnswer: 1,
    explanation:
      'A slope causes the tower to lean, shifting the centre of gravity towards the lower side and significantly reducing stability. The tower is much more likely to overturn in the direction of the slope.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Overturning',
    category: 'Hazards',
  },
  {
    id: 174,
    question: 'What is the risk of using a tower with missing or damaged bracing?',
    options: [
      'A person falling from the tower or stepping off the platform could fall through the floor opening to a lower level',
      'The available space, nature of the work, duration, and the tools and materials to be used on the platform',
      'The tower loses structural rigidity and could collapse or rack (parallelogram) under load or wind',
      'When there is reason to believe it is no longer valid or there has been a significant change',
    ],
    correctAnswer: 2,
    explanation:
      'Missing or damaged bracing allows the tower to rack (distort into a parallelogram shape), which dramatically reduces its structural integrity and load capacity, potentially leading to collapse.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Common accidents',
    category: 'Hazards',
  },

  // --- intermediate (18) ---
  {
    id: 175,
    question:
      'What is the minimum safe clearance distance from overhead power lines at 400 kV when positioning a mobile access tower?',
    options: [
      'That it is firm, level and capable of supporting the tower and its load',
      'Faintness, nausea, breathlessness, paleness, sweating, and eventually loss of consciousness',
      'A full inspection by a competent person before the tower is used again',
      '9 metres minimum horizontal clearance (or as specified by the network operator)',
    ],
    correctAnswer: 3,
    explanation:
      'For 400 kV overhead power lines, the minimum safe clearance is 9 metres. However, you should always consult the network operator (National Grid/DNO) for site-specific guidance. For lower voltages, smaller distances may apply.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Overhead power lines',
    category: 'Hazards',
  },
  {
    id: 176,
    question:
      'When moving a mobile access tower, what is the maximum height recommended before the tower should be reduced or dismantled?',
    options: [
      "4 metres platform height (unless the manufacturer's instructions state otherwise)",
      "The Client must ensure a plan is drawn up before the construction phase begins",
      "Identify hazards, decide who might be harmed, evaluate risks, record findings, review and update",
      "The standard does not set a single limit; it depends on the manufacturer's instruction manual",
    ],
    correctAnswer: 0,
    explanation:
      "Towers should generally be reduced to no more than 4 metres platform height before moving (unless the manufacturer's instructions permit otherwise). The higher the tower, the greater the risk of overturning during movement.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Moving towers',
    category: 'Hazards',
  },
  {
    id: 177,
    question:
      'Before moving a mobile access tower, which of the following precautions must be taken?',
    options: [
      'The standard does not specify a maximum deflection for castors; it specifies overall tower deflection limits',
      'Ensure no persons are on the tower, remove all loose materials, check the route for obstructions and overhead hazards, and unlock all castors',
      'Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months',
      'The operative must be positioned inside the trapdoor opening (protected by the trap sides) before guardrails are removed',
    ],
    correctAnswer: 1,
    explanation:
      'Before moving: ensure no one is on the tower, remove all loose materials and tools, check the route for obstructions, holes, slopes and overhead hazards, then unlock all castors.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Moving towers',
    category: 'Hazards',
  },
  {
    id: 178,
    question: 'What additional hazard exists when using a mobile access tower in a public area?',
    options: [
      'The standard now recognises a wider range of base plan dimensions rather than fixed sizes',
      'The tower must not be used until the clip is replaced with the correct manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s component',
      'Members of the public could walk into the tower, attempt to climb it, or be struck by falling objects',
      'A person with sufficient training, experience or knowledge to identify defects and assess the tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s fitness for continued use',
    ],
    correctAnswer: 2,
    explanation:
      'In public areas, members of the public could walk into the tower base, attempt to climb it, or be struck by falling objects. Adequate barriers, exclusion zones and warning signs must be provided.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Public safety',
    category: 'Hazards',
  },
  {
    id: 179,
    question:
      'A risk assessment identifies the risk of a tower being struck by a vehicle on site. What control measure should be implemented?',
    options: [
      'The standard does not specify a maximum deflection for castors; it specifies overall tower deflection limits',
      'When climbing through the trap opening before guardrails at the new level are fully installed',
      'Establish an exclusion zone, use physical barriers, ensure forklift drivers are informed, and consider using a banksman',
      'Install physical barriers (e.g. concrete blocks, road cones) around the tower base to protect it from vehicle impact',
    ],
    correctAnswer: 3,
    explanation:
      'Physical barriers such as concrete blocks, crash barriers or heavy-duty road cones should be placed around the tower base to prevent vehicle impact. Signage and site traffic management plans also help.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Vehicle impact',
    category: 'Hazards',
  },
  {
    id: 180,
    question:
      'Under RIDDOR, which of the following incidents involving a mobile access tower must be reported to the HSE?',
    options: [
      'The collapse, overturning or failure of any scaffold (including a mobile access tower) from which a person could fall more than 2 metres',
      'A person with sufficient training, experience or knowledge to identify defects and assess the tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s fitness for continued use',
      'Cracked, corroded or incomplete welds indicate potential structural failure at the joint, which is a critical defect requiring immediate removal of the component',
      'The tower must be taken out of use immediately, the modification reversed, and a full re-inspection carried out before use resumes',
    ],
    correctAnswer: 0,
    explanation:
      "Under RIDDOR 2013, the collapse, overturning or failure of any scaffold (including a tower) from which a person could fall more than 2 metres is a 'dangerous occurrence' that must be reported to the HSE.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'RIDDOR',
    category: 'Hazards',
  },
  {
    id: 181,
    question:
      'What is the risk of using a mobile access tower as a support for other structures (e.g. attaching a beam hoist or a ladder to the tower)?',
    options: [
      "It is a legal document that can be required for production by an HSE inspector and may be used as evidence in legal proceedings",
      "Additional loads and forces not accounted for in the tower's design can cause structural failure or overturning",
      "The available space, nature of the work, duration, and the tools and materials to be used on the platform",
      "Aluminium is significantly lighter, making towers easier to handle and transport",
    ],
    correctAnswer: 1,
    explanation:
      "Attaching hoists, ladders or other structures to a tower imposes additional vertical and horizontal loads not accounted for in the tower's design, risking structural failure or overturning. This must not be done unless the manufacturer's instructions specifically permit it.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Overloading',
    category: 'Hazards',
  },
  {
    id: 182,
    question: "What is the danger of 'side loading' a mobile access tower?",
    options: [
      'A person could fall from the tower platform or during access and continue falling beyond the open edge to a lower level',
      'The area directly below the working area plus a margin for falling objects, typically established with barriers and warning signs',
      'Horizontal forces applied to the side of the tower (e.g. from pulling cables, using power tools against walls) can cause overturning',
      'To allow safe internal access through the platform whilst maintaining full guardrail protection',
    ],
    correctAnswer: 2,
    explanation:
      "Side loading creates horizontal forces that can exceed the tower's overturning resistance, particularly at height. Activities like pulling cables, drilling into walls, or using pry bars can generate significant side loads.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Overturning',
    category: 'Hazards',
  },
  {
    id: 183,
    question:
      'What environmental hazard should be considered when using a tower near water or wet areas?',
    options: [
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
      'Members of the public could walk into the tower, attempt to climb it, or be struck by falling objects',
      'It is a legal document that can be required for production by an HSE inspector and may be used as evidence in legal proceedings',
      'Wet surfaces increase the risk of slipping during climbing, and waterlogged ground may not support the tower adequately',
    ],
    correctAnswer: 3,
    explanation:
      'Wet surfaces on platforms and rungs increase slip risk. Waterlogged ground may be too soft to support the tower, causing it to sink or become unstable. Additional precautions such as anti-slip measures and sole boards may be needed.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Environmental hazards',
    category: 'Hazards',
  },
  {
    id: 184,
    question:
      'What is the hazard of erecting a tower adjacent to an open edge (e.g. building perimeter without edge protection)?',
    options: [
      'A person could fall from the tower platform or during access and continue falling beyond the open edge to a lower level',
      'Do not use the tower; report the issue so that the outrigger can be adjusted to make firm contact with the ground',
      'Faintness, nausea, breathlessness, paleness, sweating, and eventually loss of consciousness',
      'Each tower must have its own individual inspection record, clearly identified with its unique location or reference number',
    ],
    correctAnswer: 0,
    explanation:
      'Working near an open edge creates a double fall hazard: a person falling from the tower could continue falling over the open edge to a much lower level. The open edge must be protected with separate edge protection.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Falls from height',
    category: 'Hazards',
  },
  {
    id: 185,
    question:
      'What precaution should be taken when using a tower in an area where forklift trucks operate?',
    options: [
      'This cannot be determined from the ratio alone; the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s manual must be consulted',
      'Establish an exclusion zone, use physical barriers, ensure forklift drivers are informed, and consider using a banksman',
      'Stop them immediately — climbing the outside of a tower is extremely dangerous and is not permitted',
      'That all rungs are present, undamaged, free from grease or debris, and that the access route is clear of obstructions',
    ],
    correctAnswer: 1,
    explanation:
      'Forklift trucks pose a significant collision risk. An exclusion zone with physical barriers should be established, forklift drivers must be informed, and a banksman may be needed to control vehicle movements near the tower.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Vehicle impact',
    category: 'Hazards',
  },
  {
    id: 186,
    question:
      'What is the risk of using a tower in an area with an unprotected floor opening nearby?',
    options: [
      'To allow safe internal access through the platform whilst maintaining full guardrail protection',
      'It is never acceptable; the tower must only be built to the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s instruction manual configurations',
      'A person falling from the tower or stepping off the platform could fall through the floor opening to a lower level',
      'Barriers, warning signs and banksmen/spotters should be used to control pedestrian and vehicle movement near the tower',
    ],
    correctAnswer: 2,
    explanation:
      'An unprotected floor opening near a tower creates an additional fall hazard. The opening must be covered or protected with guardrails before the tower is used, as a person could fall from the tower and then through the opening.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Falls from height',
    category: 'Hazards',
  },
  {
    id: 187,
    question:
      'What action should be taken if a rescue is required from a mobile access tower and the person is unable to self-rescue?',
    options: [
      'Assess the severity: light surface oxidation is normal for aluminium, but significant pitting or structural corrosion requires the component to be taken out of service',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
      'Platform height is the height of the working platform; working height is typically platform height plus approximately 2 metres (average reach)',
      'Implement the site emergency rescue plan: trained colleagues attempt assisted rescue, and if unsuccessful, call the emergency services immediately',
    ],
    correctAnswer: 3,
    explanation:
      'Follow the pre-planned rescue procedure: trained colleagues attempt assisted rescue from the ground. If this is unsuccessful, call emergency services (999) immediately. A rescue plan must be in place before work begins.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Rescue',
    category: 'Hazards',
  },
  {
    id: 188,
    question:
      'What is the hazard of using a mobile access tower on a surface with a drain or manhole cover?',
    options: [
      'The cover may not support the concentrated point load from a castor, potentially collapsing and causing the tower to become unstable',
      'A fall from the tower could result in a greater total fall distance, and edge protection at the mezzanine edge must be maintained',
      'Cease assembly work, secure the partially built tower if possible, and do not resume until conditions improve',
      'Remove it from use, tag it as defective, and use a replacement component from the same manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'Manhole covers and drain grates may not be designed to support the concentrated point load from a tower castor. They could collapse, causing the tower to become unstable or overturn. Castors should never be placed directly on covers.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Ground conditions',
    category: 'Hazards',
  },
  {
    id: 189,
    question: 'What hazard does ice or frost create on a mobile access tower?',
    options: [
      'Both towers must be from the same manufacturer and be the same type, and must be assembled to the same height before the bridge is fitted',
      'Ice on platforms, rungs and frames creates severe slip hazards and can also affect locking mechanisms on castors and connections',
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
      'Additional loads and forces not accounted for in the tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s design can cause structural failure or overturning',
    ],
    correctAnswer: 1,
    explanation:
      'Ice and frost on platforms, rungs and frame connections create severe slip hazards. Frozen locking mechanisms on castors and frame connections may not engage properly. Towers should not be used until ice is fully cleared.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Environmental hazards',
    category: 'Hazards',
  },
  {
    id: 190,
    question:
      'What is the purpose of a rescue plan before commencing work on a mobile access tower?',
    options: [
      'Without delay and by the quickest practicable means (immediately by telephone, followed by written report within 10 days)',
      'Smaller wheels may not distribute the load adequately and could sink into soft ground or damage flooring',
      'To ensure that a clear procedure is in place to rescue a person who is stranded or injured on the tower, minimising the time they are at risk',
      'A potentially fatal condition where blood pools in the legs of a person suspended motionless in a harness, reducing blood flow to vital organs',
    ],
    correctAnswer: 2,
    explanation:
      'A rescue plan ensures that everyone on site knows what to do if a person is stranded or injured on the tower. Rapid rescue is critical, particularly if suspension trauma is a risk. The plan must be in place before work begins.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Rescue',
    category: 'Hazards',
  },
  {
    id: 191,
    question:
      'When working near overhead power lines, what should be done if the tower or any component makes contact with a live conductor?',
    options: [
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
      'The operative has collective fall protection (guardrails) at all times during assembly, without needing to reach through a trap',
      'Wet surfaces increase the risk of slipping during climbing, and waterlogged ground may not support the tower adequately',
      'Do NOT touch the tower; warn others to stay clear; call the network operator and emergency services; do not approach until confirmed safe',
    ],
    correctAnswer: 3,
    explanation:
      'If contact is made with a live conductor, do NOT touch the tower as it may be live. Warn everyone to stay clear, call the network operator and emergency services, and do not approach until the supply is confirmed isolated.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Overhead power lines',
    category: 'Hazards',
  },
  {
    id: 192,
    question:
      'What additional hazard must be considered when using a mobile access tower in a confined space?',
    options: [
      'Restricted access and egress, reduced ventilation, and difficulty in carrying out a rescue in an emergency',
      'A full inspection by a competent person must be carried out before the tower is used',
      'The operative must be positioned inside the trapdoor opening (protected by the trap sides) before guardrails are removed',
      'Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months',
    ],
    correctAnswer: 0,
    explanation:
      'Confined spaces present additional hazards: restricted access/egress make assembly and rescue difficult, ventilation may be poor (risk of fume accumulation), and emergency evacuation is more complex.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Environmental hazards',
    category: 'Hazards',
  },

  // --- advanced (8) ---
  {
    id: 193,
    question:
      'Under RIDDOR 2013, what is the time limit for reporting a dangerous occurrence (such as the collapse of a mobile access tower)?',
    options: [
      'Components from different manufacturers may not be compatible and could compromise structural integrity',
      'Without delay and by the quickest practicable means (immediately by telephone, followed by written report within 10 days)',
      'Both towers must be from the same manufacturer and be the same type, and must be assembled to the same height before the bridge is fitted',
      'The tower could overturn, the person could fall, and they have no control over the direction of travel',
    ],
    correctAnswer: 1,
    explanation:
      'Dangerous occurrences must be reported without delay. This typically means an immediate telephone report to the HSE followed by a completed report (Form F2508) submitted within 10 days.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'RIDDOR',
    category: 'Hazards',
  },
  {
    id: 194,
    question:
      'When calculating the overturning risk of a tower in windy conditions, which factor has the greatest influence on the overturning moment?',
    options: [
      'A full inspection by a competent person, as relocation is treated the same as re-erection',
      'Until the next inspection at the place of work or, if at a construction site, for 3 months after',
      'The height at which the wind force acts (increasing height dramatically increases the overturning moment)',
      'Each connection must be fully engaged, secure and locked in its correct position',
    ],
    correctAnswer: 2,
    explanation:
      'The overturning moment equals the wind force multiplied by the height at which it acts. As the tower gets taller, the wind force acts at a greater height, dramatically increasing the overturning moment whilst the stabilising base dimension remains the same.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Overturning',
    category: 'Hazards',
  },
  {
    id: 195,
    question:
      'What is the minimum safe clearance distance from overhead power lines at 33 kV when positioning a mobile access tower (including any tools or materials being raised)?',
    options: [
      'They must be removed from the platform entirely',
      'The minimum base dimension (the shorter side)',
      'To level the tower on slightly uneven ground',
      '6 metres (or as specified by the DNO)',
    ],
    correctAnswer: 3,
    explanation:
      'For 33 kV overhead lines, a minimum clearance of 6 metres is typically required. This includes the tower, any materials being raised, and the maximum reach of persons on the platform. Always confirm with the Distribution Network Operator (DNO).',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Overhead power lines',
    category: 'Hazards',
  },
  {
    id: 196,
    question:
      'What physiological symptoms indicate the onset of suspension trauma in a person suspended in a harness after a fall?',
    options: [
      'Faintness, nausea, breathlessness, paleness, sweating, and eventually loss of consciousness',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'To prevent the tower from overturning by increasing the effective base size',
      'The standard does not specify a maximum deflection for castors; it specifies overall tower deflection limits',
    ],
    correctAnswer: 0,
    explanation:
      'Suspension trauma symptoms include: faintness, nausea, breathlessness, paleness, excessive sweating, hot flushes, and eventually loss of consciousness. Rescue must be effected rapidly (within 15 minutes ideally).',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Suspension trauma',
    category: 'Hazards',
  },
  {
    id: 197,
    question:
      'Following rescue from suspension in a harness, why must the rescued person NOT be laid flat immediately?',
    options: [
      'Until the next inspection or until the tower is dismantled, whichever is later; on construction sites at least 3 months',
      'A sudden rush of pooled, deoxygenated blood from the legs to the heart can cause cardiac arrest (rescue death/reflow syndrome)',
      'Install physical barriers (e.g. concrete blocks, road cones) around the tower base to protect it from vehicle impact',
      'Cease assembly work, secure the partially built tower if possible, and do not resume until conditions improve',
    ],
    correctAnswer: 1,
    explanation:
      'If a person who has been suspended is laid flat, the pooled deoxygenated blood rushes back to the heart, potentially causing cardiac arrest (reflow syndrome). The person should be placed in a W-position (sitting with knees raised) initially.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Suspension trauma',
    category: 'Hazards',
  },
  {
    id: 198,
    question: 'What is the dynamic amplification factor and how does it relate to tower loading?',
    options: [
      'No, towers must always be erected on firm, level ground — the base must be levelled using adjustable legs within the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s specified range',
      'A potentially fatal condition where blood pools in the legs of a person suspended motionless in a harness, reducing blood flow to vital organs',
      'It accounts for the additional forces generated when loads are applied suddenly or during movement (e.g. a person jumping on the platform creates a force greater than their static weight)',
      'The 7-day inspection cycle continues regardless of use; at least one inspection at the 7-day point, and another before any resumed use',
    ],
    correctAnswer: 2,
    explanation:
      'The dynamic amplification factor accounts for additional forces created when loads are applied suddenly (e.g. stepping onto a platform, dropping tools). A sudden impact creates forces significantly greater than the static weight, which tower designs must accommodate.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Loading',
    category: 'Hazards',
  },
  {
    id: 199,
    question:
      'When a tower is struck by lightning, what risks does this create even after the storm has passed?',
    options: [
      'Cracked, corroded or incomplete welds indicate potential structural failure at the joint, which is a critical defect requiring immediate removal of the component',
      'The platform may be damaged, incorrectly seated, or an obstruction may be present — the tower should not be used until the cause is identified and resolved',
      'Ensure no persons are on the tower, remove all loose materials, check the route for obstructions and overhead hazards, and unlock all castors',
      'Possible structural damage to connections and welds from the electrical discharge, magnetisation of components, and a residual risk of damaged locking mechanisms — a full inspection is required',
    ],
    correctAnswer: 3,
    explanation:
      'A lightning strike can damage welded joints, weaken locking mechanisms through thermal shock, and cause micro-fractures in aluminium components. A full inspection by a competent person is required before the tower can be used again.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Environmental hazards',
    category: 'Hazards',
  },
  {
    id: 200,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, what must an employer do if a risk assessment identifies that young persons (under 18) are to work on or near mobile access towers?',
    options: [
      "The employer must carry out a specific risk assessment addressing the young person's inexperience, lack of awareness of risks, and physical/psychological immaturity, and ensure enhanced supervision",
      "A potentially fatal condition where blood pools in the legs of a person suspended motionless in a harness, reducing blood flow to vital organs",
      "Platform height is the height of the working platform; working height is typically platform height plus approximately 2 metres (average reach)",
      "That platforms are correctly seated, undamaged, windlocks engaged, trapdoors functioning, and surfaces are not excessively worn or slippery",
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 19 requires a specific risk assessment for young persons, considering their inexperience, lack of awareness of existing or potential risks, and immaturity. Enhanced supervision and additional training may be required.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Risk assessment',
    category: 'Hazards',
  },
];
