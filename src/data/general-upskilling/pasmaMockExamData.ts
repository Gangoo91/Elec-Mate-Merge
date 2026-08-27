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
  'Legislation',
  'Tower Types',
  'Assembly',
  'Dismantling',
  'Inspection',
  'Hazards',
  'Safety',
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
  categories: pasmaCategories,
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
    options: ['Section 2', 'Section 3', 'Section 7', 'Section 8'],
    correctAnswer: 2,
    explanation:
      'Section 7 requires employees to take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions at work.',
    section: 'Module 1',
    difficulty: 'advanced',
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
    difficulty: 'intermediate',
    topic: 'PASMA',
    category: 'Legislation',
  },
  {
    id: 4,
    question: 'How long is a PASMA Towers for Users training card valid before it must be renewed?',
    options: ['5 years', '3 years', '1 year', '10 years'],
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
    options: ['Discomfort', 'Personal injury', 'Damage to equipment', 'Environmental harm'],
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
      'Under the Work at Height Regulations 2005, what is the first step in the hierarchy of control?',
    options: [
      'Minimise the distance and consequences of a fall',
      'Use collective fall prevention measures',
      'Avoid work at height where possible',
      'Provide personal fall protection',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy of control requires duty holders to first avoid work at height where it is reasonably practicable to do so, before considering other measures.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 7,
    question:
      'What is the primary British/European standard that covers mobile access towers made of prefabricated elements?',
    options: ['BS 5975', 'BS EN 12811', 'BS EN 131', 'BS EN 1004-1:2020'],
    correctAnswer: 3,
    explanation:
      'BS EN 1004-1:2020 is the standard for mobile access and working towers made of prefabricated elements. It covers design, materials, dimensions and load classes.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 8,
    question: 'Under the HSWA 1974, Section 3 places duties on employers in respect of whom?',
    options: [
      'Persons not in their employment (e.g. members of the public)',
      'Only the directors and senior managers of the employing company',
      'Employees of other employers working on the same site only',
      'Self-employed contractors engaged under a written contract',
    ],
    correctAnswer: 0,
    explanation:
      'Section 3 of the HSWA 1974 requires employers to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'HSWA 1974',
    category: 'Legislation',
  },
  {
    id: 9,
    question:
      'Which regulation specifically deals with the planning, organisation and management of work at height?',
    options: [
      'Lifting Operations Regulations 1998',
      'Work at Height Regulations 2005',
      'First Aid Regulations 1981',
      'Management Regulations 1999',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 specifically address the planning, organisation and management of all work carried out at height.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 10,
    question: 'Under Section 8 of the HSWA 1974, what must employees not do?',
    options: [
      'Refuse to attend any health and safety training that their employer arranges for them',
      'Report a defect in any item of work equipment to their immediate supervisor straight away',
      'Intentionally or recklessly interfere with anything provided for health and safety',
      'Work paid overtime without first obtaining written agreement from their employer',
    ],
    correctAnswer: 2,
    explanation:
      'Section 8 makes it an offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'HSWA 1974',
    category: 'Legislation',
  },
  {
    id: 11,
    question: 'What does BS 1139-6 specifically cover?',
    options: [
      'Tube and fitting tubular scaffolding for general building and civil work',
      'Couplers and special fittings used in tube-and-fitting scaffold systems',
      'Personal fall protection equipment and permanent structural anchorage devices',
      'Metal scaffolding — prefabricated mobile access and working towers',
    ],
    correctAnswer: 3,
    explanation:
      'BS 1139-6 covers metal scaffolding, specifically the specification for prefabricated mobile access and working towers, providing a UK national annex to EN 1004.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'BS 1139-6',
    category: 'Legislation',
  },
  {
    id: 12,
    question: 'The PASMA Code of Practice provides guidance on which of the following?',
    options: [
      'The safe use and operation of mobile access towers',
      'The structural design calculations for manufacturing new towers',
      'The minimum wage rates payable to trained tower operatives',
      'The licensing of companies that hire out mobile access towers',
    ],
    correctAnswer: 0,
    explanation:
      'The PASMA Code of Practice provides comprehensive guidance on the safe assembly, use, inspection and dismantling of mobile access towers.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PASMA CoP',
    category: 'Legislation',
  },
  {
    id: 13,
    question: 'When did EN 1004:2020 officially replace the previous EN 1004:2004 standard?',
    options: ['January 2020', 'November 2021', 'March 2021', 'January 2022'],
    correctAnswer: 1,
    explanation:
      'EN 1004:2020 was published in 2020 but officially replaced EN 1004:2004 in November 2021 after the coexistence period ended.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 14,
    question: 'From what date did PASMA introduce digital training cards?',
    options: ['1 January 2024', '1 June 2025', '31 March 2025', '1 January 2026'],
    correctAnswer: 2,
    explanation:
      'PASMA introduced digital training cards from 31 March 2025, allowing operatives to carry proof of competence on their mobile devices.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'PASMA',
    category: 'Legislation',
  },

  // --- intermediate (13) ---
  {
    id: 15,
    question:
      'What is the correct order of the hierarchy of control under the Work at Height Regulations 2005?',
    options: [
      'Prevent falls, avoid work at height, mitigate consequences',
      'Prevent falls, mitigate consequences, avoid work at height',
      'Mitigate consequences, prevent falls, avoid work at height',
      'Avoid work at height, prevent falls, mitigate consequences',
    ],
    correctAnswer: 3,
    explanation:
      'The correct hierarchy is: (1) avoid work at height, (2) prevent falls using collective or personal protection, (3) mitigate the distance and consequences of any fall.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 16,
    question: 'Under the CDM Regulations 2015, how many named duty holders are there?',
    options: ['5', '4', '3', '6'],
    correctAnswer: 0,
    explanation:
      'CDM 2015 identifies 5 duty holders: client, principal designer, principal contractor, designer and contractor. Each has specific duties relating to health and safety on construction projects.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 17,
    question:
      'Schedule 5 of the Work at Height Regulations 2005 requires inspection of a mobile access tower under which of the following circumstances?',
    options: [
      'It is suitable for the intended use, maintained in a safe condition and inspected',
      'Before first use, after alteration, after any adverse event, and every 7 days',
      'No — the 7-day interval must not be exceeded regardless of use patterns',
      'Because they provide fall protection for the operative until the last possible moment',
    ],
    correctAnswer: 1,
    explanation:
      'Schedule 5 requires inspection before first use on site, after any assembly or alteration that could affect stability, after any event likely to have affected strength or stability, and at regular intervals not exceeding 7 days.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 18,
    question:
      'For how long must inspection records for a mobile access tower be retained under the Work at Height Regulations 2005?',
    options: ['1 month', '6 months', '3 months', '12 months'],
    correctAnswer: 2,
    explanation:
      'Regulation 12(8) requires that inspection reports are kept until the next inspection under the same provision, but in any case for a minimum of 3 months after the date of the inspection.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 19,
    question: 'Which of the following is NOT one of the five CDM 2015 duty holders?',
    options: ['Client', 'Principal designer', 'Contractor', 'Site supervisor'],
    correctAnswer: 3,
    explanation:
      'The five CDM 2015 duty holders are client, principal designer, principal contractor, designer and contractor. Site supervisor is not a named duty holder under CDM.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 20,
    question:
      "Under the WAHR 2005, who is classed as a 'duty holder' with responsibilities for work at height?",
    options: [
      "Any person who controls the work of others, including employers, the self-employed and those who control others' work",
      'The main contractor named in the construction phase plan, who alone holds the duty for all work at height on that site',
      'Employers only — the self-employed and those who merely control the work of others fall outside the regulations',
      "The site's appointed health and safety officer, who holds the duty on behalf of everyone working at height",
    ],
    correctAnswer: 0,
    explanation:
      'The regulations apply to every employer, self-employed person and any person who controls the work of another to the extent of their control. This broad definition ensures accountability at all levels.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 21,
    question:
      'What key change did EN 1004:2020 introduce regarding tower load classification compared to the 2004 standard?',
    options: [
      'It abolished load classes entirely in favour of a single duty rating',
      'It introduced new load classes and updated stability requirements',
      'It lowered the maximum platform load to 50 kg/m² for every class',
      'It removed the requirement for guardrails on light-duty towers',
    ],
    correctAnswer: 1,
    explanation:
      'EN 1004:2020 introduced updated load classes (including Class 1 at 75 kg/m²) and revised stability requirements, providing clearer classification than the 2004 standard.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 22,
    question: 'Under the WAHR 2005, Regulation 4 requires that work at height is properly what?',
    options: [
      'Insured, formally certified and witnessed by an independent third party',
      'Notified to the Health and Safety Executive 14 days before work begins',
      'Planned, appropriately supervised and carried out in a safe manner',
      'Recorded in a logbook and countersigned by the site first-aider',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 4 requires that every employer shall ensure that work at height is properly planned, appropriately supervised and carried out in a manner that is, so far as is reasonably practicable, safe.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 23,
    question:
      'Under PUWER 1998, what must an employer ensure about work equipment provided to employees?',
    options: [
      'It is replaced with brand new equipment at least once every five years of site service',
      'It carries a current portable appliance test label, whatever the type of equipment involved',
      'It is owned outright by the employer and is never hired in from a plant hire company',
      'It is suitable for the intended use, maintained in a safe condition and inspected',
    ],
    correctAnswer: 3,
    explanation:
      'PUWER 1998 requires that work equipment is suitable for its intended use, maintained in an efficient state, in efficient working order and good repair, and inspected where appropriate.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PUWER 1998',
    category: 'Legislation',
  },
  {
    id: 24,
    question:
      'The Management of Health and Safety at Work Regulations 1999 require employers to carry out what before any work activity?',
    options: [
      'A suitable and sufficient risk assessment',
      'A formal application for an HSE work-at-height permit',
      'A medical examination of every employee on the project',
      'An environmental impact assessment for the work area',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 3 of the Management Regulations requires every employer to carry out a suitable and sufficient assessment of risks to employees and non-employees arising from the work activity.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'MHSWR 1999',
    category: 'Legislation',
  },
  {
    id: 25,
    question:
      'Which body is responsible for enforcing the Health and Safety at Work etc. Act 1974?',
    options: [
      'The Environment Agency (EA)',
      'The Health and Safety Executive (HSE)',
      'The Construction Industry Training Board (CITB)',
      'The British Standards Institution (BSI)',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcement body for the HSWA 1974 and its associated regulations in the workplace.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HSWA 1974',
    category: 'Legislation',
  },
  {
    id: 26,
    question:
      'What does the PASMA Code of Practice recommend as the minimum level of training for anyone assembling, dismantling or altering a mobile access tower?',
    options: [
      'Attendance at a one-hour site toolbox talk on towers',
      'Reading the manufacturer\'s instruction manual',
      'Completion of a PASMA-approved training course',
      'Watching a manufacturer\'s online safety video',
    ],
    correctAnswer: 2,
    explanation:
      'The PASMA Code of Practice recommends that anyone who assembles, dismantles or alters a mobile access tower should have completed a PASMA-approved training course appropriate to the complexity of the tower.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PASMA CoP',
    category: 'Legislation',
  },
  {
    id: 27,
    question:
      'Under the WAHR 2005, what must be in place before any person engages in work at height?',
    options: [
      'Written approval from the HSE',
      'A CSCS card',
      'Insurance documentation',
      'A rescue plan',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4(1) requires that work at height is properly planned, which includes having emergency and rescue procedures in place before the work begins.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },

  // --- advanced (7) ---
  {
    id: 28,
    question:
      'Under EN 1004-1:2020, what is the maximum uniformly distributed load (UDL) for a Load Class 2 tower platform?',
    options: ['150 kg/m²', '75 kg/m²', '200 kg/m²', '300 kg/m²'],
    correctAnswer: 0,
    explanation:
      'Load Class 2 under EN 1004-1:2020 permits a maximum uniformly distributed load of 150 kg/m² on the working platform.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 29,
    question:
      'What is the maximum UDL for a Load Class 3 mobile access tower under EN 1004-1:2020?',
    options: ['100 kg/m²', '200 kg/m²', '150 kg/m²', '250 kg/m²'],
    correctAnswer: 1,
    explanation:
      'Load Class 3 permits a maximum uniformly distributed load of 200 kg/m² on the working platform, making it suitable for heavier duty work such as bricklaying.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 30,
    question:
      'Under CDM 2015, which duty holder must ensure that a construction phase plan is drawn up before the construction phase begins?',
    options: ['The client', 'The designer', 'The principal contractor', 'The principal designer'],
    correctAnswer: 2,
    explanation:
      'Regulation 12(1) of CDM 2015 requires the principal contractor to draw up the construction phase plan before the construction phase begins, or where there is only one contractor, that contractor must prepare it.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Legislation',
  },
  {
    id: 31,
    question:
      'Regulation 10 of the WAHR 2005 requires the inspection of work equipment used for work at height. Which schedule contains the detailed inspection requirements?',
    options: ['Schedule 3', 'Schedule 4', 'Schedule 7', 'Schedule 5'],
    correctAnswer: 3,
    explanation:
      'Schedule 5 of the Work at Height Regulations 2005 sets out the requirements for the inspection of work equipment, including mobile access towers, specifying when inspections must occur and what records must be kept.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },
  {
    id: 32,
    question:
      'If a mobile access tower is involved in an accident causing a major injury, under which legislation must the incident be reported?',
    options: ['RIDDOR 2013', 'WAHR 2005 only', 'CDM 2015 only', 'HSWA 1974 Section 9'],
    correctAnswer: 0,
    explanation:
      'The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) require that certain workplace injuries, diseases and dangerous occurrences are reported to the enforcing authority.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'RIDDOR 2013',
    category: 'Legislation',
  },
  {
    id: 33,
    question:
      'Under EN 1004-1:2020, which load class has a UDL of 75 kg/m² and is intended for inspection and light-duty work only?',
    options: ['Load Class 2', 'Load Class 1', 'Load Class 3', 'Load Class 0'],
    correctAnswer: 1,
    explanation:
      'Load Class 1 permits 75 kg/m² and is suitable for inspection and very light work. It is the lowest rated class and not commonly specified for general construction tasks.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Legislation',
  },
  {
    id: 34,
    question:
      'Under the WAHR 2005, Regulation 6 requires duty holders to give collective protection measures priority over personal protection measures. Which of the following is an example of collective protection?',
    options: [
      'A safety harness and lanyard attached to an anchor point',
      'A personal fall-arrest block worn by each operative',
      'Guardrails and toeboards on a mobile access tower',
      'An individual work-restraint lanyard clipped to the platform',
    ],
    correctAnswer: 2,
    explanation:
      'Guardrails and toeboards are collective protection measures because they protect all persons on the platform without requiring individual action. Personal fall protection (harnesses, lanyards, lifelines) requires individual use and is lower in the hierarchy.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation',
  },

  // =======================================================================
  // TOWER TYPES — 28 questions (id 35–62)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 35,
    question: 'What is the standard width of a single-width mobile access tower?',
    options: ['0.65m', '1.35m', '1.00m', '0.74m'],
    correctAnswer: 3,
    explanation:
      'A standard single-width (narrow) mobile access tower has a platform width of 0.74m. This makes it suitable for restricted access areas.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Tower dimensions',
    category: 'Tower Types',
  },
  {
    id: 36,
    question: 'What is the standard width of a double-width mobile access tower?',
    options: ['1.35m', '1.00m', '0.74m', '1.80m'],
    correctAnswer: 0,
    explanation:
      'A standard double-width mobile access tower has a platform width of 1.35m, providing a larger working area than a single-width tower.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Tower dimensions',
    category: 'Tower Types',
  },
  {
    id: 37,
    question:
      'What is the maximum recommended height for a freestanding mobile access tower used outdoors?',
    options: ['4m', '8m', '12m', '16m'],
    correctAnswer: 1,
    explanation:
      'The maximum recommended height for a freestanding mobile access tower used outdoors is 8m. Beyond this height, additional stabilisation measures are required.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Height limits',
    category: 'Tower Types',
  },
  {
    id: 38,
    question:
      'What is the maximum recommended height for a freestanding mobile access tower used indoors?',
    options: ['8m', '10m', '12m', '15m'],
    correctAnswer: 2,
    explanation:
      'The maximum recommended height for a freestanding mobile access tower used indoors is 12m, as the sheltered environment reduces wind loading.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Height limits',
    category: 'Tower Types',
  },
  {
    id: 39,
    question:
      'Which component of a mobile access tower allows it to be moved from one location to another?',
    options: ['Adjustable legs', 'Outriggers', 'Spigot pins', 'Castors'],
    correctAnswer: 3,
    explanation:
      'Castors are the wheeled components fitted to the base of a mobile access tower that allow it to be rolled to different positions on site.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 40,
    question: 'What is the purpose of outriggers on a mobile access tower?',
    options: [
      'To increase the effective base dimensions and improve stability',
      'To provide the fixing points for the guardrails at platform level',
      'To act as the designated climbing route up the inside of the tower frame',
      'To lock the castor wheels in position while the work is done',
    ],
    correctAnswer: 0,
    explanation:
      'Outriggers extend the effective base dimensions of a mobile access tower, increasing its stability. They are particularly important when greater heights are required.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 41,
    question: 'What are the main structural vertical members of a mobile access tower called?',
    options: ['Transoms (cross members)', 'Standards (uprights)', 'Ledgers (horizontal rails)', 'Braces (diagonal stiffeners)'],
    correctAnswer: 1,
    explanation:
      'The vertical members are called standards or uprights. They form the main load-bearing vertical structure of the tower.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 42,
    question:
      'Horizontal members that run along the length of a mobile access tower are known as what?',
    options: ['Transoms (end cross members)', 'Standards (posts)', 'Ledgers (horizontals)', 'Braces (diagonals)'],
    correctAnswer: 2,
    explanation:
      'Ledgers (also called horizontals) are the horizontal members that run along the length of the tower, connecting the standards on the same side.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 43,
    question:
      'Horizontal members that run across the width of a mobile access tower are known as what?',
    options: ['Sole boards', 'Ledgers', 'Diagonal braces', 'Transoms'],
    correctAnswer: 3,
    explanation:
      'Transoms are the horizontal members that run across the width of the tower, connecting the standards on opposite sides. Platforms rest on transoms.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 44,
    question: 'What is the primary purpose of diagonal bracing on a mobile access tower?',
    options: [
      'To provide rigidity and prevent racking',
      'To support the working platform decking above',
      'To provide the internal climbing route to the top',
      'To carry site electrical cables safely',
    ],
    correctAnswer: 0,
    explanation:
      'Diagonal braces provide rigidity to the tower frame and prevent racking (sideways distortion). Without bracing, the tower would be unstable and could collapse.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 45,
    question:
      'What type of mobile access tower has an internal ladder built into the frame for access?',
    options: [
      'A tower accessed by a separate leaning ladder',
      'A tower with built-in ladder frames',
      'A tower with externally clipped step brackets',
      'A tower accessed only via an adjacent stairway',
    ],
    correctAnswer: 1,
    explanation:
      'Some mobile access towers have built-in ladder frames where the rungs are integrated into the end frames, providing internal access without the need for a separate ladder.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Tower classifications',
    category: 'Tower Types',
  },

  // --- intermediate (11) ---
  {
    id: 46,
    question:
      'What is the maximum height-to-base ratio for a freestanding mobile access tower used indoors?',
    options: ['3:1', '4:1', '3.5:1', '2:1'],
    correctAnswer: 2,
    explanation:
      'For indoor use, the maximum height-to-base ratio is 3.5:1. This means for every 1 metre of base width, the tower can be up to 3.5 metres high.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 47,
    question:
      'What is the maximum height-to-base ratio for a freestanding mobile access tower used outdoors?',
    options: ['2:1', '4:1', '3.5:1', '3:1'],
    correctAnswer: 3,
    explanation:
      'For outdoor use, the maximum height-to-base ratio is 3:1. The reduced ratio compared to indoor use accounts for the effects of wind loading.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 48,
    question: 'What is the function of adjustable legs on a mobile access tower?',
    options: [
      'To compensate for uneven ground and ensure the tower is level',
      'To extend the effective base width and prevent the tower overturning',
      'To allow the tower to be steered while it is being moved along a route',
      'To act as a fixed counterweight at the base of the tower frames',
    ],
    correctAnswer: 0,
    explanation:
      'Adjustable legs allow the base of the tower to be levelled on uneven ground. The tower must always be plumb and level before use.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 49,
    question: "What distinguishes a 'through-the-trap' (3T) platform from a standard platform?",
    options: [
      'It is made from timber decking rather than aluminium so that it can be cut to fit around obstructions',
      'It has a hinged trapdoor that allows internal access while maintaining full guardrail protection',
      'It can only be reached by a separate ladder leant against the outside of the tower at platform level',
      'It is rated to a higher load class than a standard platform and may carry twice the distributed load',
    ],
    correctAnswer: 1,
    explanation:
      'A 3T (through-the-trap) platform has a hinged trapdoor that the user climbs through from below. Once closed, the platform provides a full working area with continuous guardrail protection at all times.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Platform types',
    category: 'Tower Types',
  },
  {
    id: 50,
    question:
      'Which type of mobile access tower is specifically designed to provide access over an obstruction such as machinery?',
    options: ['A stairway access tower', 'A linking tower', 'A cantilever tower', 'A podium step'],
    correctAnswer: 2,
    explanation:
      'A cantilever tower has a section that extends beyond the base, allowing the working platform to reach over an obstruction. It requires additional counterweighting or stabilisation.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Tower classifications',
    category: 'Tower Types',
  },
  {
    id: 51,
    question: 'What is the purpose of stabilisers on a mobile access tower?',
    options: [
      'To level the tower base where the site ground slopes away',
      'To act as the climbing route up the outside of the tower frames',
      'To spread the platform load over a wider deck area',
      'To extend the effective base and prevent overturning',
    ],
    correctAnswer: 3,
    explanation:
      'Stabilisers (also called outriggers) extend beyond the tower base to increase the effective footprint, thereby improving stability and helping to prevent overturning.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 52,
    question:
      'A stairway tower differs from a standard mobile access tower in that it provides access via what?',
    options: [
      'Internal staircases at a comfortable angle',
      'A powered lift platform built into the end frame',
      'An external ramp running up one side of the tower',
      'A series of footholds clipped to the outside standards',
    ],
    correctAnswer: 0,
    explanation:
      'Stairway towers have internal staircases rather than vertical ladders, providing a safer and more comfortable means of access, particularly for frequent use or when carrying tools.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Tower classifications',
    category: 'Tower Types',
  },
  {
    id: 53,
    question:
      'When selecting a mobile access tower for a task, which of the following is the MOST important factor to consider first?',
    options: [
      'The brand of tower preferred by the site foreman',
      'The required working height and load capacity',
      'Whether it matches the other access equipment on site',
      'The colour of the tower frames and the platform decking',
    ],
    correctAnswer: 1,
    explanation:
      'The required working height and load capacity must be determined first to ensure the correct tower is selected. Overloading or using a tower at an excessive height can lead to collapse.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Selection',
    category: 'Tower Types',
  },
  {
    id: 54,
    question: "What does the term 'platform height' refer to on a mobile access tower?",
    options: [
      'The total height of the tower including its guardrails and toeboards',
      'The height from the ground up to the top of the guardrail',
      'The height from the ground to the top of the working platform',
      'The vertical clearance between two adjacent platform levels',
    ],
    correctAnswer: 2,
    explanation:
      'Platform height is the vertical distance from the ground (or base of the tower) to the top surface of the working platform where the operative stands.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Tower dimensions',
    category: 'Tower Types',
  },
  {
    id: 55,
    question: "What is meant by the 'working height' of a mobile access tower?",
    options: [
      'The height measured from the ground to the top guardrail, roughly 1 metre above the platform deck',
      'The overall height of the tower measured from the foot of the adjustable legs up to the top guardrail',
      'The platform height less the 150mm taken up by the toeboards fitted at the platform edge',
      'The platform height plus approximately 2 metres (the reach of a person standing on the platform)',
    ],
    correctAnswer: 3,
    explanation:
      'Working height is the platform height plus approximately 2 metres to account for the standing reach of an average person. It indicates the maximum height at which work can be carried out.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Tower dimensions',
    category: 'Tower Types',
  },

  // --- advanced (6) ---
  {
    id: 56,
    question:
      'Under EN 1004-1:2020, what concentrated point load must a platform withstand in addition to the UDL for its load class?',
    options: ['1.5 kN', '1.0 kN', '0.5 kN', '2.0 kN'],
    correctAnswer: 0,
    explanation:
      'EN 1004-1:2020 requires platforms to withstand a concentrated (point) load of 1.5 kN in addition to the uniformly distributed load for their respective load class.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Tower Types',
  },
  {
    id: 57,
    question:
      "When calculating the height-to-base ratio, the 'base' measurement uses the distance between which points?",
    options: [
      'The inner faces of the two end frames, measured at the level of the working platform',
      'The centres of the castor wheels (or the outermost stabiliser positions if fitted)',
      'The midpoints of the diagonal braces where they cross on each side of the tower frame',
      'The outer edges of the working platform decking measured at the highest lift of the tower',
    ],
    correctAnswer: 1,
    explanation:
      'The base dimension is measured between the centres of the castor wheels or, where stabilisers are fitted, the outermost stabiliser contact points with the ground.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 58,
    question:
      'A mobile access tower is to be used outdoors at a platform height of 6m. The base dimension along the narrow side is 0.74m. What additional measure is required?',
    options: [
      'A safety harness must be worn by everyone standing on the platform',
      'The working platform must be cut down to a single board width',
      'Outriggers or stabilisers must be fitted to extend the effective base',
      'Additional guardrails must be fitted at every platform level on the tower',
    ],
    correctAnswer: 2,
    explanation:
      'At 6m height with a 0.74m base, the ratio is 8.1:1 — far exceeding the 3:1 outdoor maximum. Outriggers or stabilisers must be fitted to increase the effective base dimension and bring the ratio within acceptable limits.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Stability',
    category: 'Tower Types',
  },
  {
    id: 59,
    question: "What is a 'span frame' (or 'H-frame') in mobile access tower construction?",
    options: [
      'A diagonal brace fitted across the full width of the tower base to resist racking forces',
      'A removable section of guardrail that is lifted into place from the level below during 3T assembly',
      'A hinged platform unit incorporating a built-in trapdoor for internal access between platform lifts',
      'A pre-welded frame unit comprising two standards joined by transoms, forming one end of the tower',
    ],
    correctAnswer: 3,
    explanation:
      'A span frame (H-frame) is a pre-welded unit consisting of two vertical standards joined by horizontal transoms. Two span frames positioned at opposite ends form a tower bay.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Tower Types',
  },
  {
    id: 60,
    question:
      'Under EN 1004-1:2020, how many load classes are defined for mobile access tower platforms?',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    explanation:
      'EN 1004-1:2020 defines three load classes: Class 1 (75 kg/m²) for inspection and light work, Class 2 (150 kg/m²) for general construction, and Class 3 (200 kg/m²) for heavy-duty work.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Tower Types',
  },
  {
    id: 61,
    question:
      'Which type of mobile access tower configuration allows a platform to be extended beyond the footprint of the base on one side?',
    options: [
      'A single-width configuration',
      'A cantilever configuration',
      'A stairway configuration',
      'A double-width configuration',
    ],
    correctAnswer: 1,
    explanation:
      'A cantilever configuration extends the working platform beyond the base footprint on one side. Special manufacturer instructions and additional counterweighting are required for safe use.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Tower classifications',
    category: 'Tower Types',
  },
  {
    id: 62,
    question:
      'For a tower conforming to EN 1004-1:2020, what is the minimum platform length that must be provided?',
    options: [
      'A fixed minimum of 1.5m, whatever the tower configuration in use',
      'A fixed minimum of 3.0m on every double-width tower configuration',
      'Determined by the manufacturer based on the tower configuration',
      'A fixed minimum of 0.5m, matching the width of the platform trapdoor',
    ],
    correctAnswer: 2,
    explanation:
      'EN 1004-1:2020 does not prescribe a single minimum platform length; it is determined by the manufacturer based on the tower configuration and design. Common lengths range from 1.8m to 2.5m.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'BS EN 1004',
    category: 'Tower Types',
  },

  // =======================================================================
  // ASSEMBLY — 28 questions (id 63–90)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 63,
    question: 'Before assembling a mobile access tower, what document should you always consult?',
    options: [
      'The site\'s general construction phase plan and nothing further',
      'The previous tower\'s inspection record from an earlier site job',
      'A generic scaffolding handbook covering all types of access system used',
      "The manufacturer's instruction manual for the specific tower model",
    ],
    correctAnswer: 3,
    explanation:
      "The manufacturer's instruction manual contains the specific assembly sequence, configurations and safety requirements for that particular tower model. It must always be consulted before assembly.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 64,
    question: "What does '3T' stand for in the context of mobile access tower assembly?",
    options: [
      'Through The Trap',
      'Three-tier tower',
      'Triple torque tightening',
      'Three-team technique',
    ],
    correctAnswer: 0,
    explanation:
      "3T stands for 'Through The Trap'. It is an assembly method where the operative works through a trapdoor in the platform, ensuring they are always protected by guardrails during assembly.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 65,
    question: "What does 'AGR' stand for in the context of mobile access tower assembly?",
    options: [
      'Automatic Guard Release',
      'Advance Guard Rail',
      'Adjustable Ground Rail',
      'Anti-Gravity Ratchet',
    ],
    correctAnswer: 1,
    explanation:
      "AGR stands for 'Advance Guard Rail'. It is an assembly method where a temporary guardrail system is raised ahead of the operative, providing continuous fall protection during assembly.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'AGR method',
    category: 'Assembly',
  },
  {
    id: 66,
    question:
      'What is the first thing that should be checked before assembling a mobile access tower?',
    options: [
      'That the weather forecast for the whole of the following week is dry',
      'That tea-making facilities are available within easy reach of the tower',
      'That the ground is firm, level and capable of supporting the tower',
      'That the paint on the tower components has not been chipped',
    ],
    correctAnswer: 2,
    explanation:
      'A firm, level surface capable of supporting the weight of the tower and its imposed loads is essential. Soft, uneven or sloping ground can cause the tower to become unstable or collapse.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 67,
    question:
      'During assembly of a mobile access tower, at what point should the castors be locked?',
    options: [
      'Only once the tower has reached its full working height for the job',
      'When the operative is standing on the top working platform of the tower',
      'Immediately before the tower is moved across to a new position on site',
      'Before assembly begins and whenever the tower is being worked on',
    ],
    correctAnswer: 3,
    explanation:
      'All castors must be locked before assembly begins and remain locked throughout the assembly process. This prevents the tower from moving while components are being fitted.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 68,
    question:
      'What should be done with tower components before assembly to ensure they are safe to use?',
    options: [
      'They should be visually inspected for damage, distortion and missing parts',
      'They should be repainted to cover over any scratches, marks or dents',
      'They should each be load-tested on site to twice their rated safe working load',
      'They should be lubricated at every joint before they are fitted together',
    ],
    correctAnswer: 0,
    explanation:
      'All components must be visually inspected before assembly. Any damaged, distorted, corroded or incomplete components must be rejected and not used in the tower.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 69,
    question:
      'When assembling a mobile access tower, components from different manufacturers should be treated in what way?',
    options: [
      'Mixed freely provided the components are the same size, width and load class rating',
      'Never mixed — only components from the same manufacturer and system should be used together',
      'Mixed only where the components were bought in the same year and share the same locking system',
      'Mixed provided a competent person inspects and signs off the combination before it is first used',
    ],
    correctAnswer: 1,
    explanation:
      'Components from different manufacturers must never be mixed. They may appear similar but have different tolerances, locking mechanisms and structural properties. Mixing can lead to assembly failure or collapse.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 70,
    question: 'What is the purpose of a base plate on a mobile access tower?',
    options: [
      'To allow the tower to be rolled across to a new working position',
      'To lock the diagonal braces into the sockets on the two end frames',
      'To spread the load of the tower over a larger area of ground',
      'To raise the working height of the tower by one additional bay',
    ],
    correctAnswer: 2,
    explanation:
      'Base plates (or sole boards) spread the point load of the tower legs over a larger area of ground, reducing the pressure on the surface and helping to prevent the tower from sinking.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 71,
    question:
      'How should an operative climb the internal ladder of a mobile access tower during assembly?',
    options: [
      'Carrying all tools in both hands for efficiency',
      'Using only their legs whilst holding components overhead',
      'Climbing on the outside of the tower',
      'Maintaining three points of contact at all times',
    ],
    correctAnswer: 3,
    explanation:
      'The three-point contact rule requires maintaining two hands and one foot, or two feet and one hand, in contact with the ladder at all times. This minimises the risk of falling during climbing.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 72,
    question: 'At which level should the first platform be installed during tower assembly?',
    options: [
      'At the lowest recommended level as specified by the manufacturer',
      'At the very top lift of the fully completed tower structure',
      'At exactly 2 metres above ground level on any size of tower',
      'At whichever level the operative building the tower finds convenient',
    ],
    correctAnswer: 0,
    explanation:
      'The first platform should be installed at the lowest level specified by the manufacturer. This provides a stable working area for assembling the next section of the tower.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 73,
    question: 'What must be fitted at every working platform level of a mobile access tower?',
    options: [
      'A single top guardrail only',
      'Guardrails, mid-rails and toeboards',
      'A safety net slung beneath the platform',
      'Diagonal bracing on the platform surface',
    ],
    correctAnswer: 1,
    explanation:
      'Every working platform must be fitted with guardrails, mid-rails and toeboards to prevent falls of persons and materials from the platform edge.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Stability',
    category: 'Assembly',
  },

  // --- intermediate (11) ---
  {
    id: 74,
    question:
      'When using the 3T (Through The Trap) assembly method, at what point is the operative protected by guardrails?',
    options: [
      'Only once the operative reaches the top working platform',
      'While the operative is descending the internal ladder',
      'At all times during the assembly process',
      'After the trapdoor has been removed from the platform',
    ],
    correctAnswer: 2,
    explanation:
      'The 3T method ensures the operative is always within the protection of guardrails. Guardrails for the next level are fitted while standing on the platform below, before the operative climbs through the trapdoor to the next level.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 75,
    question: 'How does the AGR (Advance Guard Rail) method differ from the 3T method?',
    options: [
      'AGR may only be used on towers that are erected indoors, whereas 3T is the method required for any tower that is erected outdoors on site',
      'AGR requires a safety harness clipped to the tower frame throughout the build, whereas 3T relies on the guardrails alone for fall protection',
      'AGR is used only for dismantling a tower from the top downwards, whereas 3T may be used only during the assembly of a new tower on a construction site',
      'AGR uses a temporary guardrail system that is raised to the next level before the operative climbs up, eliminating the need for a trapdoor',
    ],
    correctAnswer: 3,
    explanation:
      'The AGR method uses a temporary advance guardrail system that is raised and locked into position at the next level from the platform below. The operative then climbs up into a fully guarded area without needing a trapdoor.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'AGR method',
    category: 'Assembly',
  },
  {
    id: 76,
    question:
      'What is the required minimum height of a guardrail above the working platform on a mobile access tower?',
    options: ['950mm', '900mm', '750mm', '1100mm'],
    correctAnswer: 0,
    explanation:
      'The guardrail must be at a minimum height of 950mm above the working platform surface to provide adequate fall protection for operatives.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Assembly',
  },
  {
    id: 77,
    question: 'At what height should the mid-rail be fitted on a mobile access tower?',
    options: [
      '150mm above the platform, level with the top edge of the toeboard on each open side',
      '470mm above the platform (approximately halfway between platform and guardrail)',
      '950mm above the platform, level with the top guardrail fitted on every open side',
      '1200mm above the platform, above the top guardrail on each open side of the deck',
    ],
    correctAnswer: 1,
    explanation:
      'The mid-rail should be fitted at approximately 470mm above the working platform, which is roughly halfway between the platform surface and the top guardrail.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Stability',
    category: 'Assembly',
  },
  {
    id: 78,
    question: 'What is the minimum height of a toeboard on a mobile access tower working platform?',
    options: ['50mm', '100mm', '150mm', '200mm'],
    correctAnswer: 2,
    explanation:
      'Toeboards must be a minimum of 150mm high. They prevent tools, materials and debris from sliding off the platform edge and falling onto persons below.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Stability',
    category: 'Assembly',
  },
  {
    id: 79,
    question:
      'When assembling a tower on ground that slopes slightly, what should be used to level the tower?',
    options: [
      'Bricks or blocks of timber placed under the castors',
      'Leaning the tower against the nearest wall',
      'Packing the low side with loose materials',
      'The adjustable legs built into the tower base',
    ],
    correctAnswer: 3,
    explanation:
      'Only the adjustable legs (screw jacks) should be used to level the tower. Improvised packing such as bricks, blocks or loose materials is dangerous and must never be used.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 80,
    question:
      'What should be done immediately after completing the assembly of a mobile access tower?',
    options: [
      'Carry out a full pre-use inspection to confirm the tower is safe',
      'Immediately begin work from the top platform without any further delay',
      'Release all of the castor brakes ready for the tower to be moved again',
      'Remove the guardrails to allow easier access to the platform',
    ],
    correctAnswer: 0,
    explanation:
      'A full pre-use inspection must be carried out immediately after assembly and before anyone begins work from the tower. This confirms all components are correctly fitted and the tower is safe to use.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 81,
    question: 'Why must the trapdoor be closed after climbing through it during 3T assembly?',
    options: [
      'To stop rainwater from collecting on the platform decking at the level below it',
      'To provide a full working platform area and prevent falls through the opening',
      'To lock the platform down onto the transoms so that it cannot lift in the wind',
      'To allow the guardrails to be removed from the level immediately below the platform',
    ],
    correctAnswer: 1,
    explanation:
      'Closing the trapdoor after climbing through creates a full, uninterrupted platform surface and eliminates the fall-through hazard of the open trap. It is a critical safety step in the 3T method.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 82,
    question:
      'During tower assembly, what is the maximum number of people that should be on the tower at any one time unless the manufacturer specifies otherwise?',
    options: [
      'Exactly one operative, whatever the size or configuration of the tower being built',
      'Exactly four operatives on every tower, regardless of its load class or configuration',
      "As stated in the manufacturer's instructions for that specific tower and configuration",
      'As many as are needed, provided that every one of them holds a current PASMA training card',
    ],
    correctAnswer: 2,
    explanation:
      "The number of operatives permitted on a tower during assembly depends on the manufacturer's instructions for that specific tower model and configuration. This ensures the load capacity is not exceeded.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 83,
    question:
      'When assembling a tower near overhead electrical cables, what is the recommended minimum safe distance from the cables?',
    options: [
      'A fixed clearance of 1 metre from every power line, whatever the voltage carried',
      'A fixed clearance of 2 metres from every power line, whatever the voltage it carries',
      'No minimum distance at all, provided that the supply has been switched off',
      'At least the distances specified in the HSE guidance (e.g. 15m for 400kV lines)',
    ],
    correctAnswer: 3,
    explanation:
      'Safe distances from overhead power lines are specified in HSE guidance document GS6 and depend on voltage. For example, 132kV requires 6m and 400kV requires 15m. Assembly near power lines requires careful planning and may need the supply isolated.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },
  {
    id: 84,
    question: 'Diagonal braces must be fitted in which pattern during assembly?',
    options: [
      'As specified by the manufacturer, typically alternating on each bay level',
      'All on the same face of the tower, running from the top down to the bottom',
      'Only on the top bay of the tower, with all of the lower bays left unbraced',
      'In whatever pattern the operative building the tower finds quickest and easiest',
    ],
    correctAnswer: 0,
    explanation:
      "Diagonal braces must be fitted exactly as specified in the manufacturer's instruction manual. The pattern and placement are designed to provide the correct structural rigidity for that specific tower configuration.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Stability',
    category: 'Assembly',
  },

  // --- advanced (6) ---
  {
    id: 85,
    question:
      'When using the 3T method, what is the correct sequence for advancing to the next platform level?',
    options: [
      'From the level below, fit the frame and braces for the next level, then the guardrails, before climbing up',
      'Climb to the new level first, then have the frame, braces and guardrails passed up from the level below',
      'Fit the platform and the guardrails at ground level, then lift the whole assembled section up into place',
      'Build the full height in frames first, then add all of the guardrails once the whole tower structure is complete',
    ],
    correctAnswer: 0,
    explanation:
      'In the 3T method, the operative works from the level below to fit the next frame section, braces and guardrails. Only after the next level is fully guarded does the operative climb through the trapdoor to the new platform.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 86,
    question:
      'A mobile access tower is being assembled outdoors with a required platform height of 9m. The base dimension is 1.35m (double-width). What is required to comply with the 3:1 outdoor ratio?',
    options: [
      'Nothing — the tower is already within the 3:1 ratio',
      'Ballast weights placed on the corners of the working platform',
      'Outriggers extending the effective base to at least 3m',
      'Tying the tower to the building at mid-height only, on one side',
    ],
    correctAnswer: 2,
    explanation:
      'At 9m height with 1.35m base, the ratio is 6.67:1, exceeding the 3:1 outdoor limit. The effective base must be extended to at least 3m (9m ÷ 3 = 3m) using outriggers or stabilisers.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Stability',
    category: 'Assembly',
  },
  {
    id: 87,
    question:
      'During AGR assembly, what happens if the advance guardrail mechanism fails to lock into the correct position?',
    options: [
      'Continue the assembly carefully, holding the guardrail in position by hand until the next platform level has been reached and the trapdoor closed',
      'Tape or tie the guardrail temporarily into position, carry on with the build and report the fault to the supervisor at the end of the working shift',
      'Switch to climbing on the outside of the tower so that the level can be completed quickly and the jammed mechanism then freed off by hand later',
      'The operative must stop work, descend the tower and report the defect — the mechanism must be repaired or replaced before assembly continues',
    ],
    correctAnswer: 3,
    explanation:
      'If the AGR mechanism fails to lock, work must stop immediately. The operative must descend to a safe level and report the defect. Assembly must not continue until the mechanism is properly repaired or replaced.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'AGR method',
    category: 'Assembly',
  },
  {
    id: 88,
    question: "What is the significance of the 'safe zone' concept during 3T tower assembly?",
    options: [
      'It is the area within the guardrail protection where the operative is safeguarded against falls at all times during assembly',
      'It is the exclusion zone marked out on the ground beneath the tower to keep other people clear of any falling objects',
      'It is the designated area at ground level where the unused tower components are laid out in sequence during the build',
      'It is the minimum clearance that must be kept between the tower and any overhead power line crossing the site or the work area',
    ],
    correctAnswer: 0,
    explanation:
      "The 'safe zone' is the working area within the guardrail protection. The 3T method ensures that the operative is always within this protected zone — they never work at height without guardrail protection around them.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: '3T method',
    category: 'Assembly',
  },
  {
    id: 89,
    question:
      'When assembling a tower with both outriggers and castors, in what order should the components be set up at the base?',
    options: [
      'Fit castors to the base frame, lock them, ensure the base is level, then fit outriggers before building up',
      'Build the first lift complete, then jack it up and fit the castors and outriggers once it is standing',
      'Fit outriggers to the base frame first, then add the castors and level the whole tower up on its castor brakes',
      'Fit the castors unlocked so that the tower can be positioned, then lock them once the working height is reached',
    ],
    correctAnswer: 0,
    explanation:
      "Castors are fitted first and locked. The base is levelled using adjustable legs. Outriggers are then fitted before the tower exceeds the freestanding height limit for that base dimension, in accordance with the manufacturer's instructions.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Stability',
    category: 'Assembly',
  },
  {
    id: 90,
    question:
      'A tower assembly is being carried out when the wind speed increases to Beaufort Force 5. What action should be taken?',
    options: [
      'Continue the assembly but fit additional diagonal braces at each lift to help the tower resist the rising wind',
      'Carry on working provided that everyone on the tower clips a harness lanyard to the nearest frame member above them',
      'Assembly should have already ceased at Beaufort Force 4 — secure what has been built and evacuate the tower',
      'Speed up the assembly so that the tower is complete and tied off before the site conditions worsen any further',
    ],
    correctAnswer: 2,
    explanation:
      'Work on mobile access towers, including assembly, should cease when wind reaches Beaufort Force 4 (approximately 17 mph). At Force 5, work should already have stopped. The partially built tower should be secured and the area made safe.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-assembly',
    category: 'Assembly',
  },

  // =======================================================================
  // DISMANTLING — 28 questions (id 91–118)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 91,
    question: 'In what order should a mobile access tower be dismantled?',
    options: [
      'From the bottom up, removing the base components first',
      'Starting with the middle bay and then working outwards',
      'In any order, provided that all the guardrails come off first',
      'From the top down — the reverse of the assembly sequence',
    ],
    correctAnswer: 3,
    explanation:
      'A mobile access tower must always be dismantled from the top down, following the reverse of the assembly sequence specified by the manufacturer.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 92,
    question:
      'Before dismantling a mobile access tower, what must be done with all tools and materials on the platform?',
    options: [
      'Removed safely from the platform and lowered to the ground',
      'Left on the platform to be dropped down with the components',
      'Tied to the guardrails so they descend with the tower',
      'Stacked against the toeboards to act as a counterweight',
    ],
    correctAnswer: 0,
    explanation:
      'All tools, materials and equipment must be safely removed from the platform and lowered to the ground before dismantling begins. This reduces the risk of falling objects and lightens the tower.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 93,
    question: 'Should anyone remain on the tower while it is being moved to a new location?',
    options: [
      'Yes — one person should stay on the platform to steady the tower',
      'No — nobody should ever be on the tower while it is being moved',
      'Yes — provided they are clipped on with a safety harness',
      'Yes — but only if the platform is below 4 metres in height',
    ],
    correctAnswer: 1,
    explanation:
      'Nobody should ever remain on a mobile access tower while it is being moved. The movement can cause the tower to become unstable, and there is a serious risk of the person falling or the tower overturning.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 94,
    question:
      'After a mobile access tower has been dismantled, what should be done with the components?',
    options: [
      'Left in the open on site, ready for the next day\'s work',
      'Repainted before they are returned to the site storage compound',
      'Inspected for damage, cleaned if necessary and stored safely',
      'Stacked loosely in the back of the van without being strapped down',
    ],
    correctAnswer: 2,
    explanation:
      'After dismantling, components should be inspected for any damage that may have occurred during use. They should be cleaned if necessary and stored safely to prevent damage and ensure they are ready for future use.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Storage',
    category: 'Dismantling',
  },
  {
    id: 95,
    question: 'What is the maximum recommended tower height for moving a mobile access tower?',
    options: ['2m', 'There is no limit', '8m', '4m'],
    correctAnswer: 3,
    explanation:
      'General guidance recommends that mobile access towers should not be moved when the platform height exceeds 4m. Above this height, the tower should be partially dismantled before moving.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 96,
    question: 'Before moving a mobile access tower, what must be checked on the intended route?',
    options: [
      'That the route is free from obstructions, holes, slopes and overhead hazards',
      'That the route is no longer than 50 metres in total across the whole of the site',
      'That the route has been swept completely clean and then freshly tarmacked over',
      'That the route runs in a straight line the whole way, with no corners to turn',
    ],
    correctAnswer: 0,
    explanation:
      'The intended route must be inspected for obstructions, potholes, uneven surfaces, slopes and overhead hazards (particularly power lines) before moving the tower.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 97,
    question:
      'When dismantling a tower using the 3T method, where should the operative be standing?',
    options: [
      'On the topmost unguarded level, removing the components below',
      'On a fully guarded platform, working through the trapdoor above',
      'On the internal ladder, reaching out to remove the frames',
      'On the ground below, reaching up to remove the lowest components',
    ],
    correctAnswer: 1,
    explanation:
      'During 3T dismantling, the operative stands on a fully guarded platform and removes components from the level above by working through the open trapdoor, maintaining guardrail protection at all times.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 98,
    question: 'What should be done with outriggers when preparing to move a tower?',
    options: [
      'Left extended to provide extra stability during the move',
      'Used as handles to push the tower',
      'Retracted or removed before the tower is moved',
      'Extended further to act as bumpers',
    ],
    correctAnswer: 2,
    explanation:
      'Outriggers must be retracted or removed before moving the tower. Extended outriggers can catch on obstructions and cause the tower to overturn during movement.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 99,
    question: 'How should tower components be passed down during dismantling?',
    options: [
      'Dropped to the ground to save time, as the area below is clear',
      'Thrown down to a colleague waiting at the side of the tower base below',
      'Slid down the internal ladder frames one component at a time to the ground',
      'Passed hand-to-hand or lowered carefully using a suitable method',
    ],
    correctAnswer: 3,
    explanation:
      'Components must be passed hand-to-hand between operatives or lowered carefully to the ground. Dropping or throwing components creates a serious falling-object hazard for anyone below.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 100,
    question: 'Before moving a mobile access tower, what must be done with the castor brakes?',
    options: [
      'All brakes must be released',
      'Only the front brakes should be released',
      'Brakes are not relevant when moving',
      'All brakes must be applied',
    ],
    correctAnswer: 0,
    explanation:
      'All castor brakes must be released before moving the tower. Attempting to move a tower with brakes engaged can damage the castors and cause the tower to tip over.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 101,
    question:
      'After moving a mobile access tower to a new location, what is the first thing that must be done?',
    options: [
      'Climb straight up and begin work from the top platform of the tower again',
      'Lock all castors and ensure the tower is level and stable before use',
      'Remove the guardrails ready to extend the tower to a greater working height',
      'Release the castor brakes ready for the next move across the site later',
    ],
    correctAnswer: 1,
    explanation:
      'After moving, all castors must be locked and the tower checked for level and stability. If the ground conditions differ from the previous location, adjustable legs may need to be reset.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving',
    category: 'Dismantling',
  },

  // --- intermediate (11) ---
  {
    id: 102,
    question:
      'When dismantling a tower, why must guardrails be the last components removed from each level?',
    options: [
      'Because they are the heaviest components on the tower and are easiest to lift off',
      'Because they hold the platform decking in place and must not be disturbed too early',
      'Because they provide fall protection for the operative until the last possible moment',
      'Because they are needed to brace the whole tower structure against the wind loading on it',
    ],
    correctAnswer: 2,
    explanation:
      'Guardrails provide fall protection and must remain in place until the operative has descended to the level below. Removing them too early exposes the operative to an unprotected fall hazard.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 103,
    question: 'When moving a mobile access tower, from which position should the tower be pushed?',
    options: [
      'By pulling from the front with a rope tied to the base',
      'From the top, by a person standing on the top working platform',
      'From the middle of the tower, at about waist height on the frame',
      'From the base, pushing at or near the bottom of the tower',
    ],
    correctAnswer: 3,
    explanation:
      'The tower must be pushed from the base to keep the centre of gravity low and reduce the risk of overturning. Pushing from high up creates a tipping moment that can cause the tower to fall over.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 104,
    question:
      'If a tower component is found to be damaged during dismantling, what should happen to it?',
    options: [
      'It should be clearly marked as defective, removed from service and reported',
      'It should be returned to stock and used until it finally fails completely in service',
      'It should be straightened on site and then refitted to the tower straight away',
      'It should be used only on the lower bays of the tower where the loads are smaller',
    ],
    correctAnswer: 0,
    explanation:
      'Damaged components must be clearly marked or tagged as defective, quarantined from serviceable stock, and reported to the supervisor. They must not be reused until properly assessed and repaired by a competent person.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Post-use inspection',
    category: 'Dismantling',
  },
  {
    id: 105,
    question: 'Why should a mobile access tower never be moved by towing it with a vehicle?',
    options: [
      'The sudden forces can cause the tower to collapse or overturn, and the speed cannot be safely controlled',
      'The castors are not rated for towing and their bearings will shear off under the sideways loading',
      'It would invalidate the manufacturer\'s warranty and void the tower\'s most recent inspection record',
      'The tower would need a fresh formal inspection by a competent person before it could be used again on site',
    ],
    correctAnswer: 0,
    explanation:
      'Towing a tower with a vehicle creates uncontrolled forces, particularly during acceleration, braking and turning. These forces can cause the tower to collapse or overturn, putting anyone nearby at serious risk.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 106,
    question:
      'When partially dismantling a tower to reduce its height for moving, to what height should it be reduced?',
    options: [
      'To exactly half of its current working height, whatever the base dimensions or the ground conditions',
      'To the height of the lowest guardrail, which is around 1 metre above the ground level below',
      'To the platform height specified by the manufacturer for safe moving, generally no more than 4m',
      'To no more than 8 metres, which is the freestanding height limit for any tower that is used outdoors',
    ],
    correctAnswer: 2,
    explanation:
      "The tower should be reduced to a height that complies with the manufacturer's instructions for safe moving, generally no more than 4m platform height. This reduces the overturning risk during movement.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 107,
    question: 'How should tower components be stored to prevent damage and deterioration?',
    options: [
      'Outdoors on level ground and uncovered, so that rainwater drains away freely between separate jobs',
      'Stacked vertically against a wall in the site compound, without any racking or any restraint',
      'Left standing as a complete assembled tower in the yard so that it is ready for the next job on site',
      'In a dry, secure area, on level ground or racking, protected from weather and impact damage',
    ],
    correctAnswer: 3,
    explanation:
      'Tower components should be stored in a dry, secure location on level ground or proper racking. They must be protected from weather, impact damage and unauthorised access to maintain their integrity for future use.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Storage',
    category: 'Dismantling',
  },
  {
    id: 108,
    question:
      'During dismantling, what should be done if the wind speed increases to Beaufort Force 4?',
    options: [
      'Cease dismantling, secure the partially dismantled tower and descend safely',
      'Speed up the dismantling to finish it before the wind worsens further',
      'Continue dismantling but have a colleague hold the tower base steady',
      'Add extra diagonal braces to the tower to help it resist the rising wind loads',
    ],
    correctAnswer: 0,
    explanation:
      'Work on the tower must cease at Beaufort Force 4 (approximately 17 mph). The operative should secure the partially dismantled tower as far as possible, descend safely and wait for conditions to improve.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 109,
    question:
      'When preparing to move a tower, what should be done about any ties or braces connecting the tower to a structure?',
    options: [
      'They should be left in place for added stability during the move',
      'They must be removed before the tower is moved',
      'They should be loosened but not fully removed',
      'Ties are never used on mobile access towers',
    ],
    correctAnswer: 1,
    explanation:
      'Any ties or fixings connecting the tower to a structure must be fully removed before moving. Attempting to move a tied tower can damage the tower, the structure, or cause the tower to overturn.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 110,
    question: 'Who should carry out the dismantling of a mobile access tower?',
    options: [
      'Any general labourer who happens to be free on the site that day',
      'The site first-aider, as they are already trained to deal with emergencies',
      'Only persons who have received appropriate PASMA-approved training',
      'Whoever delivered the tower components to the site earlier in the day',
    ],
    correctAnswer: 2,
    explanation:
      'Only persons who have completed appropriate PASMA-approved training should dismantle a mobile access tower. Incorrect dismantling can lead to collapse and serious injury.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 111,
    question: 'When moving a tower across uneven ground, what additional precaution must be taken?',
    options: [
      'Guide the castors carefully, watching for changes in level, and stop if the tower begins to lean',
      'Move the tower at walking pace with one person stationed at each corner to spread the load evenly',
      'Push from the top guardrail so that the tower is steered rather than simply dragged along the ground',
      'Keep the outriggers fully deployed while moving so that stability is maintained throughout the move',
    ],
    correctAnswer: 0,
    explanation:
      'On uneven ground, the castors must be guided carefully with lookouts watching for potholes, kerbs and level changes. If the tower begins to lean, movement must stop immediately and the tower stabilised.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving',
    category: 'Dismantling',
  },

  // --- advanced (6) ---
  {
    id: 112,
    question:
      'A tower has been assembled using the AGR method and now needs dismantling. What is the critical difference in the dismantling sequence compared to 3T dismantling?',
    options: [
      'The advance guardrail system must be lowered in the correct sequence before each frame section is removed',
      'AGR towers must be dismantled from the bottom upwards, which is the reverse of the 3T top-down sequence',
      'The operative must wear a harness clipped to the tower frame throughout AGR dismantling, unlike 3T',
      'The trapdoor platform must be removed first on an AGR tower, before any guardrails at that level are taken off',
    ],
    correctAnswer: 0,
    explanation:
      "AGR dismantling requires the advance guardrail mechanism to be lowered in the correct sequence as specified by the manufacturer. Each level's AGR system must be retracted before the frame section is removed, maintaining protection for the operative throughout.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 113,
    question:
      'A mobile access tower needs to be moved 50 metres across a site. The ground is firm but slopes downhill. What specific risk must be managed?',
    options: [
      'The castors will wear unevenly on the gradient and their bearings may seize part-way through the move across the whole site',
      'The tower may accelerate uncontrollably on the downhill slope, making it difficult to stop and increasing the overturning risk',
      'The adjustable legs will gradually unscrew as the tower travels downhill, letting the whole tower settle right out of level on the way',
      'The platform will collect surface water on the downhill slope and become slippery underfoot for whoever has to use the tower next',
    ],
    correctAnswer: 1,
    explanation:
      'On a downhill slope, gravity will accelerate the tower, making it increasingly difficult to control. This increases both the risk of the tower running away and the risk of overturning when trying to stop it. Additional personnel, a planned route and controlled speed are essential.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Moving',
    category: 'Dismantling',
  },
  {
    id: 114,
    question:
      'Following a collision between a forklift and a mobile access tower, what must happen before the tower is used again?',
    options: [
      'Nothing further, provided that no damage is visible to the naked eye when the tower is viewed from the ground below',
      'Only those components dented on the side of the impact need to be replaced before the work carries on there again',
      'A competent person must carry out a thorough inspection and withdraw all suspect components before the tower is used again',
      'The tower simply needs to be re-levelled and the castor brakes re-applied before any further work continues there',
    ],
    correctAnswer: 2,
    explanation:
      'An impact event such as a vehicle collision could cause hidden damage to joints, welds and locking mechanisms. A competent person must thoroughly inspect the tower, withdraw any suspect components, and confirm the tower is safe before it is returned to service.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Post-use inspection',
    category: 'Dismantling',
  },
  {
    id: 115,
    question:
      'What is the recommended procedure if a tower must be left partially dismantled overnight?',
    options: [
      'Leave it exactly as it is and tell the following shift — a partially dismantled tower is too unstable for anyone at all to attempt to climb it',
      'Lower the platform to ground level and leave the frame standing freely, so that the wind can pass straight through it overnight without loading it',
      'Cover the tower with sheeting to protect the components from the weather and tape a warning notice to the base frame for the following shift',
      'Secure the partially dismantled tower to prevent collapse, barricade the area, display warning signs and remove access to prevent unauthorised climbing',
    ],
    correctAnswer: 3,
    explanation:
      'A partially dismantled tower must be secured against collapse, the area barricaded to prevent access by unauthorised persons, and clear warning signs displayed. Access points such as ladders should be removed or blocked.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 116,
    question:
      'When storing aluminium tower components, what specific corrosion risk should be considered?',
    options: [
      'Contact with dissimilar metals (e.g. steel) in damp conditions can cause galvanic corrosion',
      'Aluminium rusts rapidly in storage and must be wire-brushed and repainted before every use',
      'Aluminium becomes brittle below freezing and cracks if it is stored outdoors in winter',
      'Aluminium dissolves on prolonged contact with rainwater, so components must be kept fully dry',
    ],
    correctAnswer: 0,
    explanation:
      'When aluminium is in direct contact with dissimilar metals such as steel, and moisture is present, galvanic (bimetallic) corrosion can occur. Components should be stored to avoid prolonged contact between different metals in damp conditions.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Storage',
    category: 'Dismantling',
  },
  {
    id: 117,
    question:
      'A tower is being dismantled in a confined area where components cannot be lowered to the ground easily. What is the safest approach?',
    options: [
      'Drop the components straight down inside the tower footprint, since the confined area already keeps all other people well clear',
      'Use a controlled lowering system such as a rope and gin wheel, or pass components through an access opening to a ground-level operative',
      'Throw each component clear of the tower to a colleague who is standing well back from the base of the tower down at ground level',
      'Leave the components stacked on the platform and lay the whole tower on its side to recover them all at ground level afterwards',
    ],
    correctAnswer: 1,
    explanation:
      'In confined areas, a controlled lowering method such as a rope and pulley (gin wheel) should be used, or components should be passed to an operative at ground level through an access point. This prevents falling-object hazards.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Dismantling procedure',
    category: 'Dismantling',
  },
  {
    id: 118,
    question:
      'After dismantling a tower that has been in long-term use, what additional checks should be carried out on the castor wheels?',
    options: [
      'Check that the wheels are painted the correct colour for the tower system and hire company',
      "Check that the wheel diameter and stem size match the manufacturer's current catalogue",
      'Check for flat spots, bearing wear, brake mechanism function, axle condition and tyre/wheel integrity',
      'Check that the castors carry the same brand marking as the end frames they are fitted to',
    ],
    correctAnswer: 2,
    explanation:
      'Long-term use can cause flat spots on wheels, bearing wear, brake mechanism deterioration and axle corrosion. All these aspects should be checked to ensure the castors are safe for future use.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Post-use inspection',
    category: 'Dismantling',
  },

  // =======================================================================
  // INSPECTION — 28 questions (id 119–146)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 119,
    question: 'Who should carry out a pre-use inspection of a mobile access tower?',
    options: [
      'Any member of the public who happens to be passing the tower on site',
      'The tower manufacturer, at their own premises before delivery',
      'An HSE inspector appointed to that particular construction site',
      'A competent person, such as the trained operative who will use the tower',
    ],
    correctAnswer: 3,
    explanation:
      'A competent person should carry out the pre-use inspection. This is typically the trained operative who will use the tower, as they have the knowledge to identify faults and unsafe conditions.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 120,
    question:
      'How often must a formal inspection of a mobile access tower be carried out, as a minimum, under the WAHR 2005?',
    options: ['Every 7 days', 'Every 14 days', 'Every day', 'Every 30 days'],
    correctAnswer: 0,
    explanation:
      'Schedule 5 of the WAHR 2005 requires that mobile access towers are formally inspected at intervals not exceeding 7 days while they remain erected on site.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: '7-day inspections',
    category: 'Inspection',
  },
  {
    id: 121,
    question:
      'A pre-use inspection of a mobile access tower should check that all castors are in what condition?',
    options: [
      'Clean and polished',
      'Locked and in good working order',
      'Spinning freely at all times',
      'Removed and stored separately',
    ],
    correctAnswer: 1,
    explanation:
      'Castors must be locked (brakes applied) and in good working order with no damage to wheels, bearings or brake mechanisms. Unlocked or damaged castors can cause the tower to move unexpectedly.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 122,
    question: 'What should you check regarding the platforms during a pre-use inspection?',
    options: [
      "That they are painted the manufacturer's standard colour and free from scratches",
      "That they are stamped with the current year of manufacture and the hire company's mark",
      'That they are properly located, secured, free from damage and that trapdoors function correctly',
      'That they are rated to at least twice the load class marked on the tower',
    ],
    correctAnswer: 2,
    explanation:
      'Platforms must be checked for correct positioning, proper securing, freedom from damage or excessive wear, and that trapdoors open and close freely without obstruction.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 123,
    question: 'What is a key visual check to perform on all bracing during a tower inspection?',
    options: [
      "Check that every brace is stamped with the load class and the manufacturer's part number",
      'Check that the diagonal braces are the same length as the guardrails fitted at that level',
      'Check that the brace end connectors have been greased so that they release easily',
      'Check that all braces are fitted, correctly positioned and locked in place with no visible damage',
    ],
    correctAnswer: 3,
    explanation:
      'All diagonal and horizontal braces must be fitted in the correct positions as specified by the manufacturer, fully locked into their connectors and free from visible damage such as bending or cracking.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 124,
    question: 'During a pre-use inspection, what should you check about the guardrails?',
    options: [
      'That they are fitted at the correct height (950mm minimum), secured and undamaged',
      'That they are fitted at exactly 470mm above the working platform decking',
      'That they are painted bright yellow to improve their visibility on site',
      'That they have been removed to allow easier access onto the platform deck',
    ],
    correctAnswer: 0,
    explanation:
      'Guardrails must be at a minimum height of 950mm, properly secured into their sockets, and free from damage or distortion that could reduce their effectiveness as fall protection.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 125,
    question: 'What is TowerSure?',
    options: [
      'A type of mobile access tower designed for use on stairways',
      "PASMA's recommended inspection recording system for mobile access towers",
      'A British Standard covering the manufacture of tower castors',
      'An insurance scheme covering damage to hired access towers',
    ],
    correctAnswer: 1,
    explanation:
      "TowerSure is PASMA's recommended inspection recording scheme. It provides a structured approach to recording tower inspections, helping to demonstrate compliance with the WAHR 2005.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'TowerSure',
    category: 'Inspection',
  },
  {
    id: 126,
    question:
      'After an event such as high winds or an impact, what must be done before the tower is used again?',
    options: [
      'Nothing, provided the tower is still standing upright',
      'Only the guardrails need to be checked before reuse',
      'A thorough inspection must be carried out by a competent person',
      'The tower can be used straight away once the wind drops',
    ],
    correctAnswer: 2,
    explanation:
      "After any event that could have affected the tower's strength or stability (high winds, impact, heavy rain), a thorough inspection by a competent person is required before the tower can be used again.",
    section: 'Module 5',
    difficulty: 'basic',
    topic: '7-day inspections',
    category: 'Inspection',
  },
  {
    id: 127,
    question:
      'During a pre-use check, what should you look for on the vertical standards (uprights)?',
    options: [
      'The correct paint colour and a clean, polished finish',
      'The presence of a current PAT test label on each standard',
      'That they are the same height as the diagonal braces',
      'Bending, denting, cracking, corrosion or missing spigot pins',
    ],
    correctAnswer: 3,
    explanation:
      'Standards must be checked for bending, denting, cracking, corrosion or any other damage. Spigot pins and locking clips must be present and fully engaged. Damaged standards can compromise the structural integrity of the tower.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 128,
    question:
      "What must be checked about the tower's overall verticality (plumb) during an inspection?",
    options: [
      'That the tower is vertical (plumb) and not leaning to any side',
      'That it leans slightly towards the building for support',
      'That it sways gently in the wind',
      'Verticality is not important for mobile towers',
    ],
    correctAnswer: 0,
    explanation:
      'The tower must be checked to ensure it is truly vertical (plumb) and not leaning. A leaning tower has its centre of gravity shifted, reducing its stability and increasing the risk of overturning.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 129,
    question: 'When should a pre-use inspection of a mobile access tower be carried out?',
    options: [
      'Only once a week, on the same day as the formal inspection',
      'Before every use, at the start of each working period',
      'When the tower is first delivered to the site',
      "Monthly, by the tower's hire company",
    ],
    correctAnswer: 1,
    explanation:
      'A pre-use inspection should be carried out before every use and at the start of each working period (e.g. each shift). This ensures any changes or deterioration since the last use are identified.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },

  // --- intermediate (11) ---
  {
    id: 130,
    question:
      'What information should be recorded during a formal 7-day inspection of a mobile access tower?',
    options: [
      'The date of the inspection and the initials of the person who carried it out',
      'The names of everyone expected to use the tower during that working week',
      'The tower location, date, inspector details, findings, any defects and actions taken',
      'The purchase price, supplier and delivery date of the tower components',
    ],
    correctAnswer: 2,
    explanation:
      "A formal inspection record should include the tower's location and identification, date and time of inspection, name and signature of the competent inspector, details of findings including defects, and any corrective actions taken.",
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Records',
    category: 'Inspection',
  },
  {
    id: 131,
    question: 'For how long must formal inspection records be retained under the WAHR 2005?',
    options: [
      'For exactly 7 days, then they may be destroyed',
      'For 5 years from the date of the inspection',
      'They do not need to be retained once the tower is dismantled',
      'Until the next inspection or 3 months, whichever is greater',
    ],
    correctAnswer: 3,
    explanation:
      'Inspection records must be kept until the next inspection under the same provision, but in any case for a minimum of 3 months from the date of the inspection.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Records',
    category: 'Inspection',
  },
  {
    id: 132,
    question:
      'Under what four circumstances does Schedule 5 of the WAHR 2005 require a mobile access tower to be inspected?',
    options: [
      'Before first use on site, after assembly or alteration, after any event affecting stability, and every 7 days',
      'Before first use on site, then weekly by the user and monthly by a competent person from the hire company',
      'After assembly and alteration only, since a tower that is not altered cannot become unsafe while in use',
      'Every 14 days in normal use, reducing to every 7 days for towers with a platform height above 8 metres',
    ],
    correctAnswer: 0,
    explanation:
      'Schedule 5 specifies four inspection triggers: (1) before first use on site, (2) after any assembly, alteration or dismantling, (3) after any event likely to have affected strength or stability, and (4) at intervals not exceeding 7 days.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: '7-day inspections',
    category: 'Inspection',
  },
  {
    id: 133,
    question:
      'What is the difference between a pre-use check and a formal inspection under the WAHR 2005?',
    options: [
      'A pre-use check is a documented record signed by the user; a formal inspection is an informal look over the tower before the work starts, and both are done daily',
      'A pre-use check is a quick visual assessment before each use; a formal inspection is a detailed, documented inspection by a competent person at specified intervals',
      'A pre-use check is carried out by an HSE inspector at random intervals; a formal inspection is carried out by the operative before each period of use on site',
      'There is no real difference between the two — both are documented examinations carried out by a competent person, and either one satisfies the seven-day requirement',
    ],
    correctAnswer: 1,
    explanation:
      'A pre-use check is a quick visual assessment carried out before each use to spot obvious defects. A formal inspection is a more thorough, documented examination carried out by a competent person at the intervals specified in Schedule 5.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 134,
    question: 'If a defect is found during a pre-use inspection, what should happen?',
    options: [
      'The tower may be used carefully until the end of the current working day',
      'The defect should be noted and then reviewed at the next formal 7-day inspection',
      'The tower must not be used until the defect is rectified by a competent person',
      'The defective component may be used on a lower bay of the tower where loads are less',
    ],
    correctAnswer: 2,
    explanation:
      'If any defect is found that could compromise safety, the tower must be taken out of use immediately and not used until the defect has been rectified by a competent person and the tower re-inspected.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 135,
    question:
      'When using TowerSure to record an inspection, what should happen to the completed inspection tag?',
    options: [
      'It should be filed in the site office with the other inspection records and never displayed on the tower',
      'It should be posted off to PASMA so that it can be held on their central record system for the site',
      'It should be attached to the operative\'s PASMA training card as proof that the inspection was done',
      'It should be displayed prominently on the tower so users can see the current inspection status',
    ],
    correctAnswer: 3,
    explanation:
      'The completed TowerSure tag should be displayed prominently on the tower, typically at the base. This allows anyone approaching the tower to see the current inspection status, date and any conditions of use.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'TowerSure',
    category: 'Inspection',
  },
  {
    id: 136,
    question:
      'What should be specifically checked on locking mechanisms (clips, pins, gravity locks) during an inspection?',
    options: [
      'That they engage fully, hold securely under load and are not worn, bent or missing',
      'That they are the correct colour for the tower system and are all clearly marked',
      'That they have been oiled and greased at the start of each working day on site',
      'That they carry a stamp showing the year in which the component was originally manufactured',
    ],
    correctAnswer: 0,
    explanation:
      'Locking mechanisms must be checked to ensure they engage fully and hold securely. Worn, bent or missing locks can cause components to detach during use, leading to structural failure.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 137,
    question:
      'A formal 7-day inspection is due on a Friday but the tower will not be used over the weekend. Can the inspection be delayed until Monday?',
    options: [
      'Yes — the interval only counts days when the tower is actually in use',
      'No — the 7-day interval must not be exceeded regardless of use patterns',
      'Yes — provided that a pre-use check is carried out on the Monday morning first',
      'Yes — the interval may be extended to 14 days whenever the tower is left idle',
    ],
    correctAnswer: 1,
    explanation:
      'The 7-day maximum interval must not be exceeded. The inspection must be carried out on or before the 7th day, regardless of whether the tower is in use over the weekend.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: '7-day inspections',
    category: 'Inspection',
  },
  {
    id: 138,
    question: 'What should be checked about the toeboards during an inspection?',
    options: [
      'That they are at least 950mm high so that they line up with the top guardrail on each of the open sides of the working platform',
      'That they are fitted on the access side of the platform only, so that components can be passed up freely at the other sides',
      'That they are at least 150mm high, fitted on all open sides and free from gaps that would allow materials to fall through',
      'That they are painted or taped with reflective material so that they can be seen clearly from ground level below the tower',
    ],
    correctAnswer: 2,
    explanation:
      'Toeboards must be at least 150mm high, fitted on all open sides of the working platform, and have no gaps between the toeboard and the platform surface that would allow materials or tools to slide off.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 139,
    question:
      'After a mobile access tower has been altered (e.g. height increased or platform repositioned), what must be done before it is used?',
    options: [
      'Nothing further is required if the tower passed its last 7-day inspection',
      'Only a quick visual pre-use check by the operative is needed first',
      'The alteration must be reported to PASMA before the tower is put back into use',
      'A formal inspection must be carried out by a competent person and recorded',
    ],
    correctAnswer: 3,
    explanation:
      'Schedule 5 of the WAHR 2005 requires a formal inspection after any assembly that could affect the stability or strength of the tower. Altering the height or configuration triggers this requirement.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: '7-day inspections',
    category: 'Inspection',
  },

  // --- advanced (6) ---
  {
    id: 140,
    question:
      'A tower has been left erected on site for 6 days without use. On day 7, before anyone uses it, an operative carries out a pre-use check and finds no defects. Does this satisfy the formal inspection requirement?',
    options: [
      'No — a formal documented inspection by a competent person is required on or before day 7',
      'Yes — a defect-free pre-use check counts in place of the formal seven-day inspection on site',
      'Yes — provided that the operative records the pre-use check in the site diary on the same day',
      'Yes — because the tower was not used at all during the six days that are in question',
    ],
    correctAnswer: 0,
    explanation:
      'A pre-use check is not the same as a formal inspection. The 7-day inspection must be a thorough, documented examination by a competent person. A pre-use check is a quick visual assessment and does not satisfy the Schedule 5 requirement.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: '7-day inspections',
    category: 'Inspection',
  },
  {
    id: 141,
    question:
      'Under the WAHR 2005, who has the legal duty to ensure that inspections of work equipment for work at height are carried out?',
    options: [
      'The Health and Safety Executive inspector responsible for that particular region and that type of construction work',
      'The person on whose behalf the inspection is carried out (typically the employer or person controlling the work)',
      'The manufacturer who originally supplied the tower components, through its own technical support department on site',
      'The PASMA trade association, through the training scheme under which the operative\'s card was originally issued to them',
    ],
    correctAnswer: 1,
    explanation:
      'The legal duty to ensure inspections are carried out falls on the person on whose behalf the work is done — typically the employer or the person who controls the work activity. They must ensure a competent person carries out the inspection.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Records',
    category: 'Inspection',
  },
  {
    id: 142,
    question:
      "What constitutes 'competence' for the purposes of carrying out a formal tower inspection under the WAHR 2005?",
    options: [
      'Holding any current PASMA training card, regardless of the type of tower involved or the experience held by them',
      'Being the most senior manager who happens to be present on the site on the day that the inspection falls due',
      'Sufficient training, knowledge, experience and ability to identify defects and assess their significance for safe use',
      'Having attended a one-hour toolbox talk on general tower safety at some point during the previous twelve months on site',
    ],
    correctAnswer: 2,
    explanation:
      'Competence for inspection purposes requires a combination of training, knowledge, experience and the practical ability to identify defects and understand their impact on the safe use of the tower. PASMA training contributes to but is not the sole determinant of competence.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: '7-day inspections',
    category: 'Inspection',
  },
  {
    id: 143,
    question:
      'An inspection reveals that a gravity lock on a horizontal brace is not fully engaging. The brace appears secure when pushed. Can the tower remain in use?',
    options: [
      'Yes — provided that the brace is taped firmly into position as a temporary measure until the next inspection falls due',
      'Yes — the brace is still secure when it is pushed by hand, so the locking clip cannot be carrying any of the load on it',
      'Yes — as long as the tower is not used in windy conditions or moved to any other position on the site that shift',
      'No — a malfunctioning locking mechanism is a defect and the tower must be taken out of service until it is repaired',
    ],
    correctAnswer: 3,
    explanation:
      'A gravity lock that does not fully engage is a structural defect. Even if the brace appears secure, vibration, wind or accidental contact could cause it to release. The tower must be taken out of service and the defective component replaced or repaired.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 144,
    question:
      'What additional inspection consideration applies to towers used near the coast or in marine environments?',
    options: [
      'Accelerated corrosion from salt-laden air may require more frequent inspections and specific checks for pitting, white powder deposits and corroded joints',
      'The tower must be rinsed down with fresh water at the end of each shift, but no additional inspection is needed beyond the normal seven-day interval on the site',
      'Coastal towers are exempt from the seven-day inspection interval because they are washed completely clean by the rain and by the spray coming off the sea each day',
      'Salt air forms a protective oxide layer on the aluminium, so coastal towers may be inspected far less frequently than towers that are used on sites further inland',
    ],
    correctAnswer: 0,
    explanation:
      'Salt-laden air in coastal and marine environments accelerates corrosion of aluminium components. More frequent inspections may be needed, with specific attention to pitting corrosion, white powder deposits (aluminium oxide) and degraded joint connections.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: '7-day inspections',
    category: 'Inspection',
  },
  {
    id: 145,
    question:
      'An inspection report identifies a bent horizontal brace that has been straightened on site. Is this acceptable?',
    options: [
      'Yes — provided that the straightening work was carried out by a PASMA card holder and then fully recorded',
      'No — site straightening can introduce hidden stress fractures; the component must be withdrawn from service',
      'Yes — as long as the brace is now perfectly straight, refits correctly and locks fully into place again',
      'Yes — provided that the brace is used only on the lower bays of the tower, where the loads are smaller and lighter',
    ],
    correctAnswer: 1,
    explanation:
      'Straightening bent aluminium components on site is not acceptable. The process can introduce stress fractures, work-hardened areas and hidden internal damage. The component must be withdrawn from service and assessed or replaced by the manufacturer.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pre-use checks',
    category: 'Inspection',
  },
  {
    id: 146,
    question: "On a TowerSure inspection tag, what does a 'red' status indicate?",
    options: [
      'The tower has passed its last inspection and is safe for general use on the site',
      'The tower is still awaiting its very first formal inspection on this site',
      'The tower must not be used — it has failed inspection or is incomplete/unsafe',
      'The tower is approved for light-duty inspection work by only one person at a time',
    ],
    correctAnswer: 2,
    explanation:
      'A red status on a TowerSure tag indicates that the tower must not be used. It has either failed its inspection, is incomplete, is unsafe, or has been identified as requiring attention before it can be put into service.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'TowerSure',
    category: 'Inspection',
  },

  // =======================================================================
  // HAZARDS — 28 questions (id 147–174)
  // =======================================================================

  // --- basic (11) ---
  {
    id: 147,
    question:
      'What is the single greatest cause of fatal accidents involving mobile access towers?',
    options: ['Electrocution', 'Manual handling injuries', 'Falling objects', 'Falls from height'],
    correctAnswer: 3,
    explanation:
      'Falls from height are the single greatest cause of fatal and serious injuries involving mobile access towers. This is why guardrails, correct assembly and proper training are critical.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Falls',
    category: 'Hazards',
  },
  {
    id: 148,
    question: 'What is the main risk to people working below a mobile access tower?',
    options: [
      'Being struck by falling objects (tools, materials or components)',
      'Suffering hearing damage from the noise of the work going on above',
      'Tripping over the castors and the outriggers at the base of the tower',
      'Exposure to fumes that are generated by the work being done on the platform',
    ],
    correctAnswer: 0,
    explanation:
      'Falling objects such as tools, materials or dislodged components pose a significant risk to people at ground level. Toeboards, enclosed platforms and exclusion zones help to mitigate this hazard.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Falling objects',
    category: 'Hazards',
  },
  {
    id: 149,
    question:
      'What is the primary hazard when using a mobile access tower near overhead power lines?',
    options: [
      'The cables can fall from above and strike the tower\'s working platform below',
      'Electrocution — electricity can arc across gaps and does not require direct contact',
      'The radio interference from the cables can disorientate the operative at height',
      'The magnetic field around the cables can demagnetise the operative\'s hand tools at height',
    ],
    correctAnswer: 1,
    explanation:
      'Electrocution is the primary hazard. High-voltage electricity can arc across an air gap and does not require direct contact with the conductor. Aluminium towers are excellent conductors, making this extremely dangerous.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Electrocution',
    category: 'Hazards',
  },
  {
    id: 150,
    question: 'What can happen if a mobile access tower is overloaded beyond its rated capacity?',
    options: [
      'The castor brakes will release themselves and the tower will roll clean away',
      'Nothing at all happens until the applied load is more than double the rated figure',
      'The tower can collapse or become unstable, causing falls and crushing injuries',
      'The adjustable legs will retract automatically in order to compensate for the extra load',
    ],
    correctAnswer: 2,
    explanation:
      'Overloading a tower beyond its rated capacity can cause structural failure, platform collapse or the tower overturning. The load class must be known and never exceeded.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 151,
    question: 'What hazard is created by leaving tools or materials on an unguarded platform edge?',
    options: [
      'They will overload the platform and exceed its load class',
      'They will corrode the platform surface if left out in the rain',
      'They will block the trapdoor and prevent the operative descending',
      'They can fall and strike people below, causing injury or death',
    ],
    correctAnswer: 3,
    explanation:
      'Tools and materials left near unguarded edges can be dislodged by wind, vibration or accidental contact and fall onto people below. This is why toeboards must be fitted on all open sides.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Falling objects',
    category: 'Hazards',
  },
  {
    id: 152,
    question:
      'What is the hazard associated with not locking the castors before using a mobile access tower?',
    options: [
      'The tower can roll away or move unexpectedly, causing the operative to lose balance and fall',
      'The castor bearings overheat and seize, so the tower cannot be moved at the end of the job on site',
      'The tower sinks into the ground under the operative\'s weight, putting the platform out of level',
      'The guardrails work loose from their sockets as the tower frame flexes and moves about during use on site',
    ],
    correctAnswer: 0,
    explanation:
      'Unlocked castors allow the tower to move unpredictably. Any force applied to the tower (such as an operative reaching or the wind) can cause it to roll, leading to loss of balance and falls.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 153,
    question: 'Which of the following is a common cause of mobile access tower collapse?',
    options: [
      'Using the tower on a concrete slab',
      'Missing or incorrectly fitted bracing',
      'Having too few people up on deck',
      'Using the tower indoors on a level floor',
    ],
    correctAnswer: 1,
    explanation:
      'Missing or incorrectly fitted bracing is one of the most common causes of tower collapse. Bracing provides the rigidity that prevents the tower frame from racking and folding.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 154,
    question: 'What manual handling hazard is associated with mobile access tower components?',
    options: [
      'Components are too light to be handled safely and can be blown clean out of the operative\'s hands in a light breeze',
      'Components release a toxic aluminium dust whenever they are lifted and carried by hand across the site to the tower position',
      'Components can be heavy, awkward to carry, and pose risks of musculoskeletal injuries during assembly and dismantling',
      'Components build up a static charge as they are carried across the site, giving the operative a shock at every joint they touch',
    ],
    correctAnswer: 2,
    explanation:
      'Tower components can be heavy and awkward to handle, particularly frames and platforms. Improper manual handling during assembly, dismantling and transport can cause musculoskeletal injuries.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Manual handling',
    category: 'Hazards',
  },
  {
    id: 155,
    question:
      'What is the risk of using a mobile access tower on soft ground without adequate base support?',
    options: [
      'The castors will spin freely so that the tower cannot be steered at all on site',
      'The aluminium frame will corrode wherever it touches the damp soil underneath it',
      'The adjustable legs will extend automatically down into the soft ground below them',
      'The tower can sink unevenly, causing it to lean and potentially overturn',
    ],
    correctAnswer: 3,
    explanation:
      'Soft ground can cause the tower to sink unevenly under load, leading to the tower leaning and potentially overturning. Base plates, sole boards or other load-spreading measures must be used on soft ground.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 156,
    question: 'Why is it dangerous to climb on the outside of a mobile access tower?',
    options: [
      'External climbing creates outward forces that can overturn the tower and provides no fall protection if the climber slips',
      'External climbing badly scratches the paintwork and damages the anti-slip finish on the outside of the tower end frame',
      'External climbing is much slower than using the internal ladder route and delays the whole rest of the assembly work',
      'External climbing wears the castor brakes out much more quickly because of the constantly shifting load on the tower base frames',
    ],
    correctAnswer: 0,
    explanation:
      'Climbing on the outside of a tower creates outward forces that can overturn the structure. The climber is also unprotected against falls, with no guardrails to prevent them from falling if they lose grip.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Falls',
    category: 'Hazards',
  },
  {
    id: 157,
    question: 'What is the risk assessment process designed to identify?',
    options: [
      'The cheapest available method of carrying out the work activity on site',
      'The hazards present, who might be harmed and what control measures are needed',
      'The number of operatives that will be needed to finish the entire task on time',
      'The make, model and serial number of every hand tool that is used on the project',
    ],
    correctAnswer: 1,
    explanation:
      'A risk assessment systematically identifies the hazards associated with the work activity, who might be affected, the likelihood and severity of harm, and what control measures are needed to reduce the risk to an acceptable level.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Risk assessment',
    category: 'Hazards',
  },

  // --- intermediate (11) ---
  {
    id: 158,
    question: 'At what Beaufort scale force should all work on a mobile access tower cease?',
    options: ['Force 6', 'Force 8', 'Force 4', 'Force 3'],
    correctAnswer: 2,
    explanation:
      'Work on mobile access towers should cease when the wind reaches Beaufort Force 4 (approximately 13-17 mph / moderate breeze). The tower itself is typically rated to withstand Force 6 when unoccupied.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 159,
    question: 'What is the approximate wind speed associated with Beaufort Force 4?',
    options: ['5-10 mph', '40-45 mph', '25-30 mph', '13-17 mph'],
    correctAnswer: 3,
    explanation:
      'Beaufort Force 4 (moderate breeze) corresponds to wind speeds of approximately 13-17 mph (20-28 km/h). At this level, small branches move and loose paper is blown about.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 160,
    question:
      'An operative on a tower platform reaches out to the side to carry out work. What hazard does this create?',
    options: [
      "Side-loading that shifts the tower's centre of gravity and may cause it to overturn",
      'It releases the castor brakes and allows the whole tower to roll away underneath the operative',
      'It causes the adjustable legs on the opposite side of the tower base to retract fully',
      'It overloads the working platform well beyond the rated load class marked on the tower',
    ],
    correctAnswer: 0,
    explanation:
      'Reaching out sideways applies a horizontal force to the tower and shifts the effective centre of gravity. This side-loading can cause the tower to overturn, especially if the operative leans against the guardrail. The tower should be repositioned instead.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 161,
    question:
      'What is the danger of using a ladder or stepladder on a tower platform to gain extra height?',
    options: [
      'It scratches the platform decking and damages the non-slip coating that stops the operative from slipping over on it while working',
      'It raises the centre of gravity, creates an unstable working position and increases fall height with no protection above the guardrails',
      'It overloads the platform because the concentrated point load from the ladder feet exceeds the tower\'s rated load class marked on it',
      'It blocks the trapdoor at the level below and prevents the operative from descending quickly enough if an emergency occurs on the site below',
    ],
    correctAnswer: 1,
    explanation:
      'Using a ladder or steps on a tower platform raises the operative above the guardrail protection, increases the fall height, raises the centre of gravity and creates an inherently unstable working position. It must never be done.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Falls',
    category: 'Hazards',
  },
  {
    id: 162,
    question: "What is 'racking' in the context of mobile access tower stability?",
    options: [
      'The purpose-built storage racking on which the tower components are kept safely between jobs when the tower is not erected on site',
      'The vertical sinking of one side of the tower base into soft ground as the working platform above is progressively loaded up with materials',
      'The sideways distortion of the tower frame caused by horizontal forces, which can lead to collapse if bracing is missing or inadequate',
      'The proprietary shelving fitted to the working platform for holding hand tools and small materials safely while work is carried out at height',
    ],
    correctAnswer: 2,
    explanation:
      'Racking is the sideways distortion (parallelogram effect) of the tower frame when horizontal forces are applied. It occurs when bracing is missing, loose or incorrectly fitted, and can lead to sudden collapse.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 163,
    question:
      'What is the hazard of using a mobile access tower as a support for a hoist or heavy suspended load?',
    options: [
      'The hoist motor overheats the aluminium frame at its mounting point and weakens the tower standards over a long period of time',
      'The hoist cables chafe against the platform decking and gradually damage the non-slip coating on the whole of the deck surface',
      'The hoist obstructs the trapdoor opening and prevents the operative from descending quickly enough in an emergency on the site',
      "The dynamic and concentrated forces from hoisting can exceed the tower's design capacity and cause collapse or overturning",
    ],
    correctAnswer: 3,
    explanation:
      "Towers are designed for uniformly distributed loads on the platform, not concentrated or dynamic loads from hoisting. The forces generated by lifting, lowering and sudden stops can dramatically exceed the tower's rated capacity, causing collapse or overturning.",
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 164,
    question:
      'What hazard is created when sheeting or banners are attached to a mobile access tower?',
    options: [
      'The sheeting acts as a sail, dramatically increasing wind loading and the risk of overturning',
      'The sheeting blocks the operative\'s view of the trapdoor and of the platform level below',
      'The sheeting adds enough extra weight to take the platform over its rated load class',
      'The sheeting traps heat and causes the aluminium frame members to expand and then distort badly',
    ],
    correctAnswer: 0,
    explanation:
      "Sheeting, banners or tarpaulins create a large surface area that catches the wind, dramatically increasing the lateral forces on the tower. This 'sail effect' can cause the tower to overturn even in relatively light winds.",
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 165,
    question:
      'What type of injury can result from the manual handling of heavy tower frames without proper technique?',
    options: [
      'Hearing loss caused by the noise of the tower components being moved',
      'Musculoskeletal disorders including back injuries, hernias and joint damage',
      'Respiratory illness from the dust released by the tower components used on site',
      'Electric shock from the static charge that builds up in the tower frames on site',
    ],
    correctAnswer: 1,
    explanation:
      'Improper manual handling of heavy tower components can cause serious musculoskeletal injuries including lower back injuries, herniated discs, shoulder injuries, hernias and repetitive strain injuries.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Manual handling',
    category: 'Hazards',
  },
  {
    id: 166,
    question:
      'What is the minimum safe distance from underground services (e.g. buried cables) that should be considered when positioning a tower with ground-penetrating stabilisers?',
    options: [
      'A fixed clearance of 1 metre from any buried service is always sufficient, whatever the service happens to be or however deep it happens to lie beneath',
      'Underground services do not need to be considered at all, because the stabiliser feet bear only on the ground surface and never penetrate it at any point',
      'Underground services should be identified using cable avoidance tools and service plans before driving any ground-penetrating anchors or stabilisers',
      'A fixed clearance of 5 metres is always required from any buried service on the site, whatever the depth or the type of service that is buried down there',
    ],
    correctAnswer: 2,
    explanation:
      'Before installing any ground-penetrating anchors or stabilisers, underground services must be identified using cable avoidance tools (CATs) and service plans. Striking a buried electrical cable or gas main could be fatal.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Electrocution',
    category: 'Hazards',
  },
  {
    id: 167,
    question:
      'A mobile access tower is positioned near a busy vehicle route on site. What control measure should be implemented?',
    options: [
      'The tower should be repainted or wrapped in a high-visibility colour so that passing drivers can see it',
      'A banksman should be posted to shout a warning up to the operative whenever a site vehicle approaches',
      'The tower should be moved right clear of the route each time that a vehicle needs to pass by the work area on site',
      'Physical barriers, warning signs and traffic management measures should be put in place to prevent vehicle impact',
    ],
    correctAnswer: 3,
    explanation:
      'Vehicle impact is a serious hazard. Physical barriers (such as concrete blocks or guardrails), warning signs and traffic management measures should be implemented to prevent vehicles from striking the tower.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Risk assessment',
    category: 'Hazards',
  },
  {
    id: 168,
    question:
      'When carrying out a risk assessment for mobile access tower work, which of the following should be considered?',
    options: [
      'Ground conditions, weather, nearby hazards, access/egress, overhead services, the task being performed and emergency procedures',
      'The wind speed forecast for the day of the work, since the wind is the only variable that ever changes on a construction site',
      'The experience of the operative and the load class of the tower, which between them together cover the whole of the risk involved',
      'The make and model of the tower alone, so that the correct manufacturer\'s instruction manual can be issued to the user on the site',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive risk assessment must consider all factors: ground conditions, weather, nearby hazards (power lines, traffic, openings), means of access and egress, the nature of the task, the load on the platform and emergency/rescue procedures.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Risk assessment',
    category: 'Hazards',
  },

  // --- advanced (6) ---
  {
    id: 169,
    question:
      'A mobile access tower rated to Beaufort Force 6 is left erected overnight. The weather forecast predicts Force 7 winds. What action is required?',
    options: [
      'Nothing further is needed, provided that all four castor brakes are applied and the outriggers are left fully extended',
      'The tower should be dismantled, reduced in height, or given additional stabilisation such as tying to a structure',
      'A safety harness and lanyard should be left clipped from the top platform down to the ground as an overnight anchor',
      'The tower should be covered over with sheeting so that the wind passes over the outside rather than through the frame',
    ],
    correctAnswer: 1,
    explanation:
      "If forecast winds exceed the tower's rated capacity (typically Beaufort Force 6 / 28 mph), the tower must be dismantled, reduced in height, or provided with additional stabilisation such as tying to an adjacent structure. Simply locking castors is insufficient.",
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 170,
    question: "What is 'suspension trauma' and how is it relevant to mobile access tower work?",
    options: [
      'It is the structural fatigue that develops in a tower frame after a load has been suspended from it for a long period of time',
      'It is the disorientation and nausea that an operative can feel the first few times that they work at height on a mobile tower',
      'It is blood pooling in the legs of a person hanging motionless in a harness, causing unconsciousness and death within 5-15 minutes',
      'It is the sway set up in a tall tower by sheeting or by a suspended load moving in the wind, which unsettles the operative on the platform',
    ],
    correctAnswer: 2,
    explanation:
      'Suspension trauma (orthostatic intolerance) occurs when a person hangs motionless in a harness. Blood pools in the legs, reducing venous return to the heart. This can cause loss of consciousness and death within 5-15 minutes. Prompt rescue is critical.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Falls',
    category: 'Hazards',
  },
  {
    id: 171,
    question:
      'An operative discovers that the tower is positioned 8 metres from an 11kV overhead power line. According to HSE guidance, what is the minimum safe clearance distance?',
    options: ['3 metres', '15 metres', '9 metres', '6 metres'],
    correctAnswer: 3,
    explanation:
      'HSE guidance (GS6) recommends a minimum clearance of 6 metres from 11kV overhead lines. At 8 metres, there may be insufficient safety margin when accounting for tower sway and operative reach. The situation must be reviewed by a competent person.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Electrocution',
    category: 'Hazards',
  },
  {
    id: 172,
    question:
      'A tower is erected on a suspended floor in a multi-storey building. What additional hazard must be assessed?',
    options: [
      "The floor's load-bearing capacity must be verified against the combined weight of the tower, operatives and materials",
      'Whether the floor covering is hard-wearing enough that the castors will not mark or scuff it during the work itself',
      'Whether the floor has been swept clean and the intended castor tracks marked out clearly before the tower is built up on it',
      'Whether the floor level is more than 8 metres above the ground outside, which is the freestanding outdoor height limit',
    ],
    correctAnswer: 0,
    explanation:
      "Suspended floors have limited load-bearing capacity. The point loads from tower castors can be significant, and the combined weight of tower, operatives and materials may exceed the floor's design capacity. A structural assessment may be required.",
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Collapse',
    category: 'Hazards',
  },
  {
    id: 173,
    question:
      'What is the cumulative effect of multiple simultaneous hazards (e.g. high wind, side-loading from work, and partially missing bracing) on tower stability?',
    options: [
      'The hazards tend to cancel each other out, so a tower that is exposed to several of them at once is no less safe than one that is exposed to only a single hazard',
      "Multiple hazards interact and compound each other — the combined effect can exceed the tower's safety margin even when each individual hazard alone would not",
      'Only the single largest hazard needs to be controlled; the smaller ones can be discounted because they act in different directions at different times on the site',
      'The combined effect on the tower is always smaller than the effect of any one of the individual hazards acting on the tower structure entirely on its own at the time',
    ],
    correctAnswer: 1,
    explanation:
      "Hazards are cumulative. A tower may resist moderate wind, small side-loads or minor bracing deficiencies individually, but the combination of multiple hazards simultaneously can exceed the tower's stability margin and cause sudden failure.",
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Risk assessment',
    category: 'Hazards',
  },
  {
    id: 174,
    question:
      'During a risk assessment, it is identified that the work from the tower will generate sparks near flammable materials. What control hierarchy should be applied?',
    options: [
      'Provide a fire extinguisher and continue as planned',
      'Carry on, as sparks rarely ignite building materials',
      'Eliminate the ignition source if possible',
      'Move the flammable materials onto the tower platform',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy of control applies: first try to eliminate the ignition source (e.g. use a non-spark method). If not possible, remove or protect flammable materials, install fire-resistant sheeting, and provide fire-watching and extinguishing equipment as additional measures.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Risk assessment',
    category: 'Hazards',
  },

  // =======================================================================
  // SAFETY — 26 questions (id 175–200)
  // =======================================================================

  // --- basic (10) ---
  {
    id: 175,
    question: 'What type of PPE should be worn when assembling a mobile access tower?',
    options: [
      'A high-visibility vest is the only item of PPE that is required for the tower assembly work',
      'No PPE at all is needed, as the tower\'s guardrails provide all the protection required here',
      'Ear defenders and safety glasses, to protect against the noise and the dust of the tower assembly work',
      'As identified by the risk assessment — typically safety boots, hard hat and gloves as a minimum',
    ],
    correctAnswer: 3,
    explanation:
      'The risk assessment determines the specific PPE required, but as a minimum, safety boots, a hard hat and gloves are typically needed during assembly to protect against falling components and manual handling injuries.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'PPE',
    category: 'Safety',
  },
  {
    id: 176,
    question: 'Why must a rescue plan be in place before anyone works from a mobile access tower?',
    options: [
      'Because an operative who is injured or incapacitated at height cannot rescue themselves, and delay in rescue can be fatal',
      'Because the employer\'s liability insurance will not pay out on a claim unless a rescue plan was in place beforehand',
      'Because the tower manufacturer requires a rescue plan to be held on site in order to validate the warranty on tower components',
      'Because the rescue plan doubles as the method statement for the assembly, the use and the dismantling of the tower on site',
    ],
    correctAnswer: 0,
    explanation:
      'An injured or incapacitated operative at height cannot rescue themselves. A pre-planned rescue procedure ensures that help can be provided quickly and effectively. Delay in rescue, particularly with suspension trauma, can be fatal.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Rescue',
    category: 'Safety',
  },
  {
    id: 177,
    question: 'What is the three-point contact rule when climbing a mobile access tower?',
    options: [
      'Keep three operatives on the tower during climbing, one at the base and two up on the working platform',
      'Maintain contact with the ladder using two hands and one foot, or two feet and one hand, at all times',
      'Check the tower at three points — the base, the mid-height and the top — before starting to climb up it',
      'Climb no more than three rungs at a time, pausing to rest on each platform level on the way up the tower',
    ],
    correctAnswer: 1,
    explanation:
      'The three-point contact rule requires the climber to have at least three limbs in contact with the ladder at all times — either two hands and one foot, or two feet and one hand. This minimises the risk of losing grip and falling.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 178,
    question: 'Should an operative work from a mobile access tower if they feel unwell or dizzy?',
    options: [
      'Yes — provided that they take a short break at ground level and drink some water before climbing back up',
      'Yes — as long as a colleague stays on the platform with them for the whole duration of the task in hand',
      'No — they should report their condition to their supervisor and not work at height until they are fit to do so',
      'Yes — provided that they clip a harness lanyard to the tower frame while they are working up there on the platform',
    ],
    correctAnswer: 2,
    explanation:
      'An operative who is unwell, dizzy, fatigued or under the influence of medication that affects balance or alertness must not work at height. They should report their condition to the supervisor immediately.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Fitness',
    category: 'Safety',
  },
  {
    id: 179,
    question:
      'What should be done if weather conditions deteriorate while an operative is working on a tower?',
    options: [
      'Continue working on the platform but hold tightly to the guardrail',
      'Move the tower to a more sheltered location with the operative on board',
      'Wait for the wind to die down again while remaining up on the platform',
      'Cease work, secure tools and materials, and descend the tower safely',
    ],
    correctAnswer: 3,
    explanation:
      'If weather conditions deteriorate (increasing wind, rain, lightning), work must cease immediately. The operative should secure tools and materials, descend the tower safely and not return until conditions improve.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Weather',
    category: 'Safety',
  },
  {
    id: 180,
    question: 'What is the safest way to raise tools and materials to the working platform?',
    options: [
      'Use a tool bag, rope and pulley or other approved method — never carry items while climbing',
      'Carry them up the internal ladder in both hands so that the whole job is done in a single trip',
      'Throw them up one at a time to a colleague who is waiting on the working platform up above you',
      'Balance them on the top guardrails and slide them up the outside of the tower frames to the platform',
    ],
    correctAnswer: 0,
    explanation:
      'Tools and materials should be raised using a tool bag, rope and pulley, gin wheel or material hoist. Items should never be carried while climbing, as this prevents maintaining three-point contact and risks dropping objects.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 181,
    question: 'Why should unauthorised persons be prevented from accessing a mobile access tower?',
    options: [
      'Because unauthorised persons may scratch the paintwork and damage components that the hire company will charge for later',
      'Because untrained persons may use the tower unsafely, risk falling, or interfere with the structure causing it to become unsafe',
      'Because they may move the tower to a position closer to the overhead power lines without realising the danger involved',
      'Because their presence on the tower could invalidate the hire agreement covering the tower equipment used on the site on that day',
    ],
    correctAnswer: 1,
    explanation:
      'Unauthorised and untrained persons may use the tower unsafely, overload it, modify it or damage components. They could also be injured through falls or by making the tower unsafe for others.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 182,
    question:
      'What should an operative do if they notice a missing component on a tower that is already in use?',
    options: [
      'Carry on working, but keep off the part of the platform nearest the affected area until the end of the shift',
      'Fit any spare part that is roughly the right size as a temporary measure and report it at the next formal inspection',
      'Stop work immediately and keep the tower out of use until the missing component is replaced and it is re-inspected',
      'Make a note for the supervisor so that the component can be replaced at the next formal seven-day inspection of the tower',
    ],
    correctAnswer: 2,
    explanation:
      "A missing component can compromise the tower's structural integrity. Work must stop immediately, the defect reported, and the tower taken out of use until the missing component is replaced with the correct part and the tower re-inspected.",
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 183,
    question: 'What is the purpose of an exclusion zone around the base of a mobile access tower?',
    options: [
      'To mark out the area where the tower components are laid out and stored before the assembly work begins',
      'To show the area within which the tower may be moved without needing a further formal inspection to be done',
      'To reserve the space that is needed for the vehicle delivering and collecting the tower components on the site',
      'To protect people at ground level from falling objects and to prevent interference with the tower base',
    ],
    correctAnswer: 3,
    explanation:
      'An exclusion zone prevents people from walking beneath the tower where they could be struck by falling objects. It also prevents unauthorised persons from interfering with the tower base, castors or outriggers.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 184,
    question:
      'Why is it important to keep the working platform of a mobile access tower clean and free from debris?',
    options: [
      'Debris creates trip and slip hazards and can fall from the platform edge, injuring people below',
      'Debris adds weight that takes the platform over its rated load class and unbalances the tower',
      'Debris corrodes the aluminium platform surface if it is left there for more than a shift',
      'Debris falls into the castor brakes and prevents the tower from being moved at the end of the job',
    ],
    correctAnswer: 0,
    explanation:
      'A dirty, cluttered platform creates trip and slip hazards for the operative and increases the risk of objects falling from the edge. Regular housekeeping is essential for safe working at height.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },

  // --- intermediate (10) ---
  {
    id: 185,
    question:
      "What factors should be considered when assessing an operative's fitness to work at height?",
    options: [
      'The operative\'s physical height and weight, relative to the rated load class of the tower that they will be working from that day',
      'Physical fitness, medical conditions (e.g. vertigo, epilepsy), medication side effects, fatigue and the influence of alcohol or drugs',
      'Whether the operative holds a current PASMA training card that covers that particular type and size of mobile access tower that is being used',
      'The number of years that the operative has worked at height and whether they have ever had an accident or a near miss while doing so on site',
    ],
    correctAnswer: 1,
    explanation:
      'Fitness to work at height depends on physical fitness, relevant medical conditions (vertigo, epilepsy, heart conditions), medication effects (drowsiness, dizziness), fatigue levels and freedom from the influence of alcohol or drugs.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Fitness',
    category: 'Safety',
  },
  {
    id: 186,
    question:
      'In wet weather, what additional safety precaution should be taken when working on a mobile access tower?',
    options: [
      'The castor brakes should all be released so that the tower can be rolled clear of the standing water and then allowed to drain freely',
      'No extra precautions at all are needed, as the rain has no effect at all on an aluminium tower or on its platform surfaces in use',
      'Surfaces become slippery — non-slip platforms should be used, extra care taken when climbing, and the risk assessment reviewed',
      'The guardrails and toeboards should be removed at the end of each lift so that any rainwater can run off the platform decking freely',
    ],
    correctAnswer: 2,
    explanation:
      'Wet conditions make platforms, rungs and handholds slippery, increasing the risk of slips and falls. Non-slip platform surfaces should be used, extra care taken when climbing, and the overall risk assessment reviewed.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Weather',
    category: 'Safety',
  },
  {
    id: 187,
    question:
      'What is the critical time window for rescuing a person who has fallen and is suspended in a harness?',
    options: [
      '1-2 hours before suspension trauma becomes life-threatening',
      '30-45 minutes before suspension trauma becomes life-threatening',
      'There is no time limit as long as the harness holds the person',
      '5-15 minutes before suspension trauma becomes life-threatening',
    ],
    correctAnswer: 3,
    explanation:
      'Suspension trauma can become life-threatening within 5-15 minutes. The rescue plan must ensure that a suspended person can be reached and lowered to the ground within this critical time window.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Rescue',
    category: 'Safety',
  },
  {
    id: 188,
    question: 'What should a rescue plan for tower work include as a minimum?',
    options: [
      'The method of rescue, trained personnel, necessary equipment on site, communication method and emergency contact numbers',
      'The telephone number of the nearest accident and emergency department and the site first-aider\'s own mobile number',
      'The name of the operative who assembled the tower and the date on which the assembly work was actually fully completed',
      'The date on which the plan was written, the date on which it was last reviewed and the name of the person who last reviewed it',
    ],
    correctAnswer: 0,
    explanation:
      'A rescue plan must detail the method of rescue, who will carry it out (trained rescue personnel), what equipment is immediately available, how communication will be maintained and emergency contact numbers including ambulance services.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Rescue',
    category: 'Safety',
  },
  {
    id: 189,
    question:
      'An operative needs to use a power tool on a tower platform near the edge. What additional safety measure should be considered?',
    options: [
      'The top guardrail should be removed on that side to give the operative more room to work',
      'A tool lanyard or tether should be used to prevent the power tool from falling if dropped',
      'The operative should lean out over the guardrail so that the tool stays clear of the platform',
      'The power tool should be passed up to the operative by a colleague standing on the internal ladder',
    ],
    correctAnswer: 1,
    explanation:
      'Tool lanyards or tethers should be used to prevent power tools from falling from the platform if dropped. A falling power tool can cause serious injury to anyone below. The operative should never lean over or work outside the guardrails.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 190,
    question:
      'If lightning is observed while an operative is working on a mobile access tower, what should happen?',
    options: [
      'The operative should crouch down low on the platform, away from the guardrails, until the storm has passed over the site',
      'The operative should carry on working, as the aluminium does not conduct electricity in the same way that steel frames do',
      'The operative should cease work immediately and descend to ground level, as a metal tower at height attracts lightning',
      'The operative should clip a harness lanyard onto the tower frame and carry on working until the rain actually starts to fall',
    ],
    correctAnswer: 2,
    explanation:
      'A metal tower in an elevated position is at high risk of lightning strike. The operative must cease work immediately and descend to ground level. Aluminium is an excellent conductor, and a lightning strike through the tower would be fatal.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Weather',
    category: 'Safety',
  },
  {
    id: 191,
    question: "What is the purpose of a 'method statement' for mobile access tower work?",
    options: [
      'To record the names, PASMA card numbers and card expiry dates of everyone who will work on the tower while it is on site',
      'To list the make, model and serial number of every component that is used in building the tower for the hire company\'s record',
      'To set out the price, the hire period and the delivery schedule that were agreed with the company hiring out the tower to the site',
      'To describe, step by step, the safe system of work for the tower operation, covering assembly, use, inspection and dismantling',
    ],
    correctAnswer: 3,
    explanation:
      'A method statement is a document that describes the safe system of work, step by step, for the specific task. For tower work, it covers assembly, use, inspection, dismantling, rescue procedures and specific hazard controls.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 192,
    question:
      'What PPE might be required when dismantling a tower in an area with overhead working?',
    options: [
      'A hard hat (safety helmet) to protect against falling objects from above',
      'Ear defenders to protect against the noise of the work going on above',
      'A dust mask to protect against the falling debris from the work going on above',
      'Safety glasses are the only item of PPE that is needed for overhead working',
    ],
    correctAnswer: 0,
    explanation:
      'When working in areas where there is a risk of objects falling from above (including during dismantling where components are being lowered), a hard hat must be worn to protect against head injuries.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'PPE',
    category: 'Safety',
  },
  {
    id: 193,
    question:
      'Why should mobile access tower work not be carried out in freezing conditions without additional precautions?',
    options: [
      'Aluminium becomes brittle at sub-zero temperatures and the components can crack under load without any warning at all',
      'Ice can form on rungs, platforms and handholds creating extreme slip hazards, and cold reduces manual dexterity',
      'The castor brakes freeze on hard, so the tower cannot be repositioned at all during the whole of the working day on site',
      'Freezing weather affects only the ground conditions, so no further precautions at all are needed for the work at height',
    ],
    correctAnswer: 1,
    explanation:
      'Freezing conditions cause ice to form on climbing rungs, platform surfaces and handholds, creating severe slip hazards. Cold also reduces manual dexterity, making it harder to grip components and operate locking mechanisms safely.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Weather',
    category: 'Safety',
  },
  {
    id: 194,
    question:
      'What is the recommended action if an operative on a tower witnesses a colleague collapse on the platform?',
    options: [
      'Leave the casualty where they are and carry on working, checking on them again at the end of the working shift',
      'Lower the casualty down from the platform onto some soft material laid out on the ground below the tower base',
      'Call for emergency assistance immediately, make the area safe, give first aid if trained, and initiate the rescue plan',
      'Climb down alone to fetch help and then wait at ground level for the casualty to come round on their own up there again',
    ],
    correctAnswer: 2,
    explanation:
      'The operative should call for emergency assistance immediately, ensure the area is safe, provide first aid if trained to do so, and initiate the rescue plan. The priority is to get professional medical help and bring the casualty safely to ground level.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Rescue',
    category: 'Safety',
  },

  // --- advanced (6) ---
  {
    id: 195,
    question:
      'An operative has fallen from a tower and is suspended in a harness at a height of 6m. The rescue plan requires a MEWP for rescue but none is immediately available. What should be done?',
    options: [
      'Wait for the MEWP to arrive, however long that takes, as it is the method set out in the site rescue plan',
      'Lower the casualty down quickly by cutting through the harness lanyard from the ground level below them with a knife',
      'Leave the casualty suspended in the harness and monitor them from the ground until help finally arrives on the site',
      'Implement the contingency rescue procedure immediately — suspension trauma can be fatal within 5-15 minutes',
    ],
    correctAnswer: 3,
    explanation:
      'With suspension trauma potentially fatal within 5-15 minutes, the primary rescue method cannot be awaited. The contingency rescue procedure must be implemented immediately — this could include a ladder rescue, rope rescue system, or calling emergency services while keeping the person conscious and moving their legs.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Rescue',
    category: 'Safety',
  },
  {
    id: 196,
    question:
      "An operative is taking prescription medication that lists 'may cause drowsiness' as a side effect. What is the correct course of action regarding work at height?",
    options: [
      'They must not work at height until medical clearance confirms the medication does not impair their ability',
      'They may work at height provided that they take the medication at the end of the shift rather than before it',
      'They may work at height as long as a colleague stays on the platform with them throughout the whole of the task',
      'They may work at height provided that they drink plenty of water and take regular breaks during the working day',
    ],
    correctAnswer: 0,
    explanation:
      'Medication that may cause drowsiness can impair balance, concentration and reaction time — all critical for safe work at height. The operative must obtain medical clearance before working at height while taking such medication.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Fitness',
    category: 'Safety',
  },
  {
    id: 197,
    question:
      'A site requires continuous 24-hour tower access for maintenance work. What specific safety considerations apply to night shift operations?',
    options: [
      'Night work needs no special considerations beyond the daytime controls, since the tower and the task remain entirely unchanged',
      'Adequate lighting, increased fatigue in night workers, reduced visibility for inspections, and rescue personnel available all night',
      'The freestanding height limits may be increased at night because the wind speeds are generally much lower after dark on site',
      'The seven-day inspection interval may be extended to fourteen days where the tower is used only on the night shift and not by day at all',
    ],
    correctAnswer: 1,
    explanation:
      'Night shift tower work requires adequate artificial lighting for safe climbing, working and inspection. Night workers face increased fatigue risk affecting alertness and balance. Visibility for inspections is reduced, and rescue personnel must be available throughout the shift.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 198,
    question:
      "What is the 'hierarchy of rescue' that should be considered in the rescue plan for tower work?",
    options: [
      'Always call the emergency services first and take no other action until they arrive, since untrained rescue attempts create a second casualty',
      'Mechanical rescue by MEWP first, then the emergency services, with no role for colleagues on the tower because of the risk to them',
      'Self-rescue first, then assisted rescue by colleagues from the tower, then mechanical rescue such as a MEWP, with emergency services as the final option',
      'Emergency services first, then mechanical rescue by MEWP, with self-rescue kept as a last resort once help is on its way',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy considers: (1) self-rescue — can the person descend unaided, (2) assisted rescue — can trained colleagues help them down, (3) mechanical rescue — using a MEWP, rope descent system or similar, and (4) emergency services — as a backup when other methods are unavailable or unsuccessful.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Rescue',
    category: 'Safety',
  },
  {
    id: 199,
    question:
      'An operative working on a tower at 10m height in summer experiences symptoms of heat exhaustion (dizziness, nausea, excessive sweating). What is the safest response?',
    options: [
      'The operative should sit down on the platform in the shade of the guardrails and rest there until the symptoms have passed',
      'The operative should carry on working at a slower pace and drink water more frequently through the rest of the afternoon',
      'The operative should remove their hard hat and PPE on the platform to cool down before carrying on with the rest of the work',
      'The operative must stop work and be assisted to descend while still conscious, then be moved to a cool shaded area and given fluids',
    ],
    correctAnswer: 3,
    explanation:
      'Heat exhaustion can rapidly progress to heat stroke, which is life-threatening. The operative must descend while still able to do so safely, be moved to shade, cooled down and given fluids. Medical attention should be sought if symptoms do not improve quickly.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Fitness',
    category: 'Safety',
  },
  {
    id: 200,
    question:
      'A tower is to be used for work involving the removal of materials that may contain asbestos. In addition to the standard tower safety measures, what must be in place?',
    options: [
      'A licensed asbestos removal contractor must carry out the work, with RPE, decontamination, air monitoring, a plan of work and HSE notification',
      'A standard disposable dust mask and a damp cloth are quite sufficient for the operative to remove the material safely by hand alone',
      'The operative may remove the material provided that they hold a current PASMA card and wear a disposable dust mask while doing so',
      'No further controls are needed beyond the standard tower measures, provided that the material is removed whole rather than broken up',
    ],
    correctAnswer: 0,
    explanation:
      'Asbestos removal is a specialist operation requiring licensed contractors, respiratory protective equipment (RPE), decontamination facilities, air monitoring, a detailed plan of work and HSE notification (for licensable work). The tower provides the access, but all asbestos-specific controls must also be fully implemented.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe working',
    category: 'Safety',
  },
  {
    id: 201,
    question: 'A mobile tower is to be used outdoors. What is the correct approach to wind?',
    options: [
      'Work should cease and the tower be considered for dismantling as wind rises',
      "Towers may be used in any wind up to the machine's stated maximum height",
      'Sheeting the tower reduces wind loading and permits work to continue',
      'Wind only matters where the tower exceeds 6 metres platform height',
    ],
    correctAnswer: 0,
    explanation:
      'Rising wind increases both the overturning moment and the risk to the operative. Work should stop and the tower be lowered or dismantled as conditions deteriorate. Sheeting makes matters worse, not better — it turns the tower into a sail and substantially increases wind loading.',
    difficulty: 'advanced',
    topic: 'Wind',
    category: 'Hazards',
  },
  {
    id: 202,
    question: 'Why must a tower never be moved with a person on the platform?',
    options: [
      'Because the castors are not rated for the additional load',
      'Because the raised centre of gravity and sudden forces can overturn it',
      'Because it invalidates the 7-day inspection record',
      'Because the outriggers cannot be deployed while moving',
    ],
    correctAnswer: 1,
    explanation:
      'A person on the platform raises the centre of gravity and any jolt — a kerb, a drain cover, a change in level — can be enough to overturn the tower. The forces involved cannot be controlled from the ground, which is why the platform must be clear before the tower is moved.',
    difficulty: 'basic',
    topic: 'Moving Towers',
    category: 'Safety',
  },
  {
    id: 203,
    question: 'What does the 3T (Through the Trap) method achieve?',
    options: [
      'It allows a tower to be built without guardrails at any level',
      'It removes the need for a competent person to inspect the tower',
      'It keeps the operative protected while fitting guardrails for the next level',
      'It permits a single person to erect a tower of any height',
    ],
    correctAnswer: 2,
    explanation:
      'Working through the trapdoor, the operative stays within the protection of the level below while positioning the guardrails for the level above, so they are never on an unguarded platform. It is a method of maintaining protection during assembly, not a way of dispensing with it.',
    difficulty: 'advanced',
    topic: '3T Method',
    category: 'Assembly',
  },
  {
    id: 204,
    question: 'A tower is found with a bent horizontal brace. What is the correct action?',
    options: [
      'Straighten it on site and refit it if it appears true',
      'Use it provided the tower height is reduced by one lift',
      'Refit it in a lower bay where loads are lower',
      'Quarantine the component and replace it with an undamaged one',
    ],
    correctAnswer: 3,
    explanation:
      'A bent component has been overloaded and straightening it on site can leave hidden stress fractures that are not visible. It should be taken out of use and replaced. Relegating it to a lower bay does not help — lower components carry the greatest load.',
    difficulty: 'basic',
    topic: 'Damaged Components',
    category: 'Inspection',
  },
  {
    id: 205,
    question: 'Who may inspect a mobile access tower and record the result?',
    options: [
      'A competent person with knowledge appropriate to the tower type',
      'Any operative who has assembled a tower previously',
      "Only the manufacturer's technical representative",
      "The site's appointed first aider, as part of daily checks",
    ],
    correctAnswer: 0,
    explanation:
      'Inspection must be by a competent person — someone with the practical and theoretical knowledge to identify defects and assess their significance for that type of tower. Having built one before is not the same as being competent to judge whether one is safe.',
    difficulty: 'basic',
    topic: 'Competence',
    category: 'Inspection',
  },
  {
    id: 206,
    question: 'What is the primary reason stabilisers or outriggers are fitted to a tower?',
    options: [
      'To allow the tower to be moved more easily on uneven ground',
      'To increase the effective base dimensions and resist overturning',
      'To provide additional anchor points for fall arrest lanyards',
      'To spread the load so castors can be locked more securely',
    ],
    correctAnswer: 1,
    explanation:
      'Stability is governed by the relationship between height and base dimensions. Stabilisers widen the effective base so the tower resists the overturning moment at its working height. They are a stability measure, not a handling aid or an anchor point.',
    difficulty: 'basic',
    topic: 'Stability',
    category: 'Assembly',
  },
  {
    id: 207,
    question:
      'What is the first step in the hierarchy for managing work at height?',
    options: [
      'Provide a harness to everyone working above ground level',
      'Select the tallest tower available for the whole project',
      'Avoid the work at height where it can be done from the ground',
      'Issue a permit to work before access equipment is used',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy runs avoid, then prevent, then minimise. If the task can be done from ground level the risk is removed altogether, so that is always considered first. Issuing a harness is a minimise measure that only limits the consequences of a fall, so reaching for it first skips the two more effective steps above it.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Hierarchy of Control',
    category: 'Legislation',
  },
  {
    id: 208,
    question:
      'Why is a tower scaffold described as a form of collective protection?',
    options: [
      'It protects every person on the platform without individual kit',
      'It is assembled by a team rather than by a single operative',
      'It is owned by the employer instead of the individual worker',
      'It can be shared between several trades on the same site',
    ],
    correctAnswer: 0,
    explanation:
      'Collective protection guards everyone in the danger zone at once, and a guarded tower platform does exactly that with no action needed from the user. Being shared between trades is about site logistics, not protection, so it does not make a measure collective.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Access Equipment Selection',
    category: 'Legislation',
  },
  {
    id: 209,
    question:
      'A short cable pull runs 40 m along a factory ceiling over a flat, firm floor. What supports choosing a mobile tower here?',
    options: [
      'A tower is always cheaper to hire than any powered platform',
      'The work is repositioned often along a level, unobstructed route',
      'A tower removes the need to assess the task before starting',
      'Towers may be used by anyone on site without any instruction',
    ],
    correctAnswer: 1,
    explanation:
      'Equipment choice turns on the nature, frequency and duration of the work and on the conditions, and a level, clear route suits a tower that is moved repeatedly along a long run. Cost alone is never a valid basis for selection, because the duty is to provide the most suitable equipment for the work.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Access Equipment Selection',
    category: 'Legislation',
  },
  {
    id: 210,
    question:
      'An operative has used towers for years but holds no training record. What is the correct position on competence?',
    options: [
      'Long experience on site is accepted in place of any training',
      'Competence needs training and knowledge of the specific risks',
      'Only the site manager needs to be trained to assemble a tower',
      'A verbal briefing on the day removes the need for any training',
    ],
    correctAnswer: 1,
    explanation:
      'The person who assembles, alters or dismantles a tower must be competent, and competence combines training with an understanding of the particular risks of that equipment. Years on the job can embed bad practice rather than correct it, so unrecorded experience does not by itself demonstrate competence.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Competence and Training',
    category: 'Legislation',
  },
  {
    id: 211,
    question:
      'Which document must be followed when a mobile access tower is assembled?',
    options: [
      'The generic site induction handout issued at the main gate',
      'A written method statement produced for a different tower',
      'The assembly instructions supplied for that particular tower',
      'The hire company delivery note listing the parts supplied',
    ],
    correctAnswer: 2,
    explanation:
      'A tower is only safe in the configuration its supplier designed and tested, so the instruction manual for that model governs the build sequence and component list. A delivery note only records what arrived on site and says nothing about how the parts go together.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Assembly Procedure',
    category: 'Assembly',
  },
  {
    id: 212,
    question:
      'A tower is built with two horizontal braces left out because the box was short. What is the real hazard?',
    options: [
      'The structure loses strength and the whole tower may collapse',
      'The platform will sit slightly lower than the planned height',
      'The tower will rock a little but remains structurally sound',
      'Only the appearance of the finished tower is affected by this',
    ],
    correctAnswer: 0,
    explanation:
      'A tower relies on every component being in place to develop its designed strength, and omitting bracing can lead to collapse rather than a minor wobble. Treating missing braces as cosmetic is the exact reasoning behind many tower accidents, so any shortfall of parts stops the build.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Assembly Procedure',
    category: 'Assembly',
  },
  {
    id: 213,
    question:
      'One castor of a tower sits over a shallow dip in the yard surface. What is the correct action?',
    options: [
      'Pack the low castor with bricks to bring the base back level',
      'Extend that leg fully and leave the other three legs as set',
      'Accept the lean provided the platform still feels firm to walk on',
      'Reposition or level the base so all four castors bear properly',
    ],
    correctAnswer: 3,
    explanation:
      'A tower must stand on firm, level ground with every wheel or foot properly supported, so the base is moved or the ground made good. Bricks or building blocks must never carry any part of a tower because they can crush or shift under load and put the tower out of plumb.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Ground Conditions',
    category: 'Assembly',
  },
  {
    id: 214,
    question:
      'Outriggers are fitted to two corners on one side of a tower only. Why is this unacceptable?',
    options: [
      'The tower will be harder to move along the working route later',
      'Stability is only improved in one direction, not around the base',
      'The outriggers will obstruct access to the internal ladder',
      'The tower would then exceed the load it is rated to carry',
    ],
    correctAnswer: 1,
    explanation:
      'Outriggers work by enlarging the effective base area, so they must be fitted diagonally across all four corners rather than to one side. Fitting them to a single side leaves the tower just as easy to tip in the unprotected direction, which is where the overturning usually happens.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Tower Stability',
    category: 'Assembly',
  },
  {
    id: 215,
    question:
      'A tower is to be used outside in an exposed yard. What limits the working platform height?',
    options: [
      'The height is fixed by the number of frames carried on the van',
      'Any height is acceptable once the castor brakes are applied',
      'Platform height should not exceed three times the smallest base',
      'The height is set purely by the reach the operative needs',
    ],
    correctAnswer: 2,
    explanation:
      'HSE guidance gives a working platform height of no more than three times the minimum base dimension where a tower is used outside or in exposed conditions. Brakes stop the tower rolling but do nothing to resist overturning, so locking the castors does not license extra height.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Tower Stability',
    category: 'Assembly',
  },
  {
    id: 216,
    question:
      'A tower with a 2 m by 3 m base is used inside on firm, level ground. What guide height applies?',
    options: [
      'Around 7 m, using the ratio of three and a half times 2 m',
      'Around 10 m, using three and a half times the longer side',
      'Around 6 m, because indoor use follows the outdoor guidance',
      'Around 4 m, because the ratio applies to half the base width',
    ],
    correctAnswer: 0,
    explanation:
      'Indoors on firm, level ground the guide ratio may be extended to three and a half times the minimum base dimension, and the minimum here is 2 m, giving about 7 m. Using the 3 m side instead of the smallest dimension inflates the answer and removes the stability margin the ratio exists to provide.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Tower Stability',
    category: 'Assembly',
  },
  {
    id: 217,
    question:
      'A tower must be moved 15 m along a corridor. Where should the pushing force be applied?',
    options: [
      'At the guardrail level so the mover can see the route ahead',
      'At any convenient height as long as two people share the load',
      'At the base of the tower, pushing or pulling from ground level',
      'At the mid height frame to keep the tower balanced while moving',
    ],
    correctAnswer: 2,
    explanation:
      'A tower is moved by pushing or pulling at the base, because force applied high up creates a turning moment that can topple a light aluminium structure. Sharing the push between two people at guardrail height doubles that toppling force rather than controlling it.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving a Tower',
    category: 'Safety',
  },
  {
    id: 218,
    question:
      'An operative offers to stay on the platform while the tower is wheeled to the next bay. What is the correct response?',
    options: [
      'Allow it if the operative holds the guardrail throughout the move',
      'Refuse it, as nobody may remain on a tower while it is moved',
      'Allow it if the move is under five metres on a smooth floor',
      'Refuse it unless a second person steadies the tower while moving',
    ],
    correctAnswer: 1,
    explanation:
      'A tower is never moved with people or materials on the upper platforms, because a snagged castor can stop the base while the mass above keeps travelling. Holding the guardrail gives no protection at all if the tower overturns, and the distance moved does not change that.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Moving a Tower',
    category: 'Safety',
  },
  {
    id: 219,
    question:
      'What overhead check must be made along the route before a tower is moved?',
    options: [
      'That the ceiling finish will not be marked by the tower frames',
      'That lighting levels along the route are adequate for the work',
      'That no power lines or other overhead obstructions are in the way',
      'That the route is clear of parked vehicles and stacked materials',
    ],
    correctAnswer: 2,
    explanation:
      'Before moving a tower the route is checked for power lines and other overhead obstructions, because an aluminium tower contacting a live conductor can be fatal. Clearing parked vehicles matters for the ground route but does nothing about the hazard directly above the tower.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Moving a Tower',
    category: 'Safety',
  },
  {
    id: 220,
    question:
      'Wind is gusting strongly across an open site. What does this mean for repositioning a tower?',
    options: [
      'The tower may be moved if the platform is stripped of materials',
      'The tower may be moved provided outriggers stay fitted throughout',
      'The tower must not be moved while windy conditions persist',
      'The tower may be moved if extra people steady it during the move',
    ],
    correctAnswer: 2,
    explanation:
      'A tower must never be moved in windy conditions, because wind loading on a tall lightweight structure can overturn it even when the platform is empty. Adding people to steady it simply places more of them inside the danger zone if it does go over.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Weather Conditions',
    category: 'Safety',
  },
  {
    id: 221,
    question:
      'A tower is left standing overnight on an exposed site. What is the main concern before use resumes?',
    options: [
      'Wind and interference may have altered or damaged the structure',
      'The aluminium frames may have corroded during the hours of darkness',
      'The castor brakes will have released themselves during the night',
      'The platform boards will have absorbed enough water to fail',
    ],
    correctAnswer: 0,
    explanation:
      'A tower left unattended can be climbed on, have parts removed or be shifted by the weather, so its condition is confirmed before anyone uses it again. Overnight corrosion of aluminium frames is not a realistic failure mechanism over a single shift.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Weather Conditions',
    category: 'Safety',
  },
  {
    id: 222,
    question:
      'A tower is erected on a shop floor open to customers. Which extra precaution is most relevant?',
    options: [
      'Painting the tower frames a high visibility colour before the job',
      'Restricting the work to hours when the store is fully staffed',
      'Cordoning the area and keeping stored materials to a minimum',
      'Fitting a second guardrail on the platform to reassure the public',
    ],
    correctAnswer: 2,
    explanation:
      'Where towers are used in public places extra precautions are needed, including keeping stored materials on the tower to a minimum and preventing the public from straying beneath. Extra guardrails protect the operative on the platform, not the people passing below.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Public Areas',
    category: 'Safety',
  },
  {
    id: 223,
    question:
      'Which item is a genuine pre-use check on a mobile access tower?',
    options: [
      'That the hire invoice for the tower has been approved for payment',
      'That the castors are locked and the platform is fully boarded',
      'That the operative has eaten before starting work at height',
      'That the tower colour matches the rest of the site equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Pre-use checks confirm the physical state of the tower, such as brakes applied, components complete and the platform properly boarded and guarded. Commercial paperwork like the hire invoice has no bearing on whether the structure is safe to climb.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Pre-use Checks',
    category: 'Inspection',
  },
  {
    id: 224,
    question:
      'Who is responsible for the pre-use check of a tower at the start of a shift?',
    options: [
      'The hire company representative who delivered it to the site',
      'The principal contractor safety adviser on their weekly round',
      'The competent user, before the tower is climbed and worked from',
      'The designer of the building the tower is being used against',
    ],
    correctAnswer: 2,
    explanation:
      'The pre-use check belongs to the competent person about to work from the tower, because conditions change between shifts and only they can confirm its state now. A weekly visit by a safety adviser cannot detect a component removed since the last visit.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pre-use Checks',
    category: 'Inspection',
  },
  {
    id: 225,
    question:
      'Under the Work at Height Regulations, which equipment attracts a duty to inspect?',
    options: [
      'Fixed scaffolds erected around the outside of a building alone',
      'Equipment that has already been involved in a reportable fall',
      'Equipment hired in rather than owned outright by the employer',
      'Guard rails, working platforms including tower scaffolds, and ladders',
    ],
    correctAnswer: 3,
    explanation:
      'The inspection duty in the Work at Height Regulations covers collective protection such as guard rails and toe boards, fixed and mobile working platforms including tower scaffolds, and ladders. Ownership is irrelevant, so hiring a tower does not transfer the duty away from the user.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Inspection Duties',
    category: 'Legislation',
  },
  {
    id: 226,
    question:
      'A tower is dismantled and rebuilt at a new position on the same site. What follows?',
    options: [
      'Nothing further, because the same components were used again',
      'It is a new assembly and must be checked before it is used',
      'A fresh risk assessment replaces the need for any inspection',
      'The original inspection record simply carries over to the new spot',
    ],
    correctAnswer: 1,
    explanation:
      'Safety depends on how the tower has been assembled in its present location, so a rebuild creates a new structure on new ground that has to be checked before use. A record made for the previous position says nothing about the ground or the build in front of you now.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Inspection Duties',
    category: 'Inspection',
  },
  {
    id: 227,
    question:
      'An inspection finds a cracked platform trapdoor hinge. What should happen next?',
    options: [
      'Note it on the record and allow use until the job is finished',
      'Take the tower out of use and report the defect for repair',
      'Tape over the crack and continue using the trapdoor carefully',
      'Reduce the platform height so the trapdoor carries less weight',
    ],
    correctAnswer: 1,
    explanation:
      'A defect that could affect safety takes the tower out of service until it is put right, because a hinge that fails under a climber gives no warning. Recording the fault and carrying on leaves the same person exposed to the same failure for the rest of the job.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Defect Reporting',
    category: 'Inspection',
  },
  {
    id: 228,
    question:
      'Why should the result of a tower inspection be recorded rather than simply remembered?',
    options: [
      'Because recording it transfers the legal duty to the hire company',
      'Because the record replaces the need for any pre-use checking',
      'Because a record proves the check was done and flags faults found',
      'Because insurers require a record before a tower may be hired',
    ],
    correctAnswer: 2,
    explanation:
      'A record shows that a competent person examined the tower, what they found and what was put right, so the next user and the employer can rely on it. It never displaces the pre-use check, which covers changes that have happened since the inspection was made.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Records',
    category: 'Inspection',
  },
  {
    id: 229,
    question:
      'What is the underlying principle of a through the trapdoor assembly method?',
    options: [
      'The builder works from inside the platform below the level being built',
      'The builder stands on the top frame while fitting the next section',
      'The builder assembles the tower fully at ground level and lifts it',
      'The builder wears a harness clipped to the frame while climbing',
    ],
    correctAnswer: 0,
    explanation:
      'In the trapdoor method the person building the tower stays seated in the trapdoor of the platform below, so they are never on an unguarded platform while fitting the next lift. Standing on the top frame to add components is the unprotected practice the method exists to eliminate.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Assembly Methods',
    category: 'Assembly',
  },
  {
    id: 230,
    question:
      'What distinguishes an advance guardrail method from the trapdoor method?',
    options: [
      'The guardrails are fitted after the operative reaches the new level',
      'The guardrails are fitted from below before the level is occupied',
      'The guardrails are replaced entirely by a personal fall arrest system',
      'The guardrails are omitted because the platform stays below head height',
    ],
    correctAnswer: 1,
    explanation:
      'With advance guardrails the protection is positioned from the safe level beneath, so the operative steps onto a platform that is already guarded. Fitting guardrails after arriving at the level leaves a period of unprotected exposure, which is exactly what the method removes.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Assembly Methods',
    category: 'Assembly',
  },
  {
    id: 231,
    question:
      'A supervisor says either assembly method is acceptable if used correctly. Is that right?',
    options: [
      'No, because only one recognised method may ever be used on a site',
      'No, because both methods require a personal fall arrest system too',
      'Yes, provided the method matches the tower and the trained user',
      'Yes, because the choice of method is left entirely to the operative',
    ],
    correctAnswer: 2,
    explanation:
      'Both recognised methods protect the builder, but each depends on the tower being designed for it and the user being trained in that specific technique. Leaving the choice to individual preference ignores that a tower supplied for one method may lack the components the other needs.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Assembly Methods',
    category: 'Assembly',
  },
  {
    id: 232,
    question:
      'How should an operative reach the working platform of a mobile tower?',
    options: [
      'By climbing the internal ladder built into the tower frames',
      'By climbing the outside of the end frames using the horizontals',
      'By leaning a separate ladder against the side of the tower',
      'By being lifted to the platform on a telehandler forks basket',
    ],
    correctAnswer: 0,
    explanation:
      'Access is made by the internal ladder or stairway provided within the tower, keeping the climber inside the structure and the load close to the centre. Climbing the outside applies an overturning force to a light tower and is a recognised cause of collapse.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Safe Access',
    category: 'Safety',
  },
  {
    id: 233,
    question:
      'Why must the platform trapdoor be closed once the operative is on the platform?',
    options: [
      'To keep dust and debris from falling into the tower structure',
      'To stop the platform boards from lifting in a gust of wind',
      'To close the opening so nobody can step or fall through it',
      'To hold the tower frames square while the work is carried out',
    ],
    correctAnswer: 2,
    explanation:
      'An open trapdoor is a hole in the working platform, and a person concentrating on the task above them can step straight into it. The trapdoor is not a structural component, so leaving it open does not affect how square the frames sit.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Safe Access',
    category: 'Safety',
  },
  {
    id: 234,
    question:
      'What is the purpose of a toe board around a tower working platform?',
    options: [
      'To provide a foothold when the operative reaches out sideways',
      'To stop tools and materials being kicked off the platform edge',
      'To take the weight of materials stacked against the guardrail',
      'To mark the boundary of the platform for people working below',
    ],
    correctAnswer: 1,
    explanation:
      'A toe board is an edge barrier that keeps tools and loose materials from being kicked over the side onto people beneath. It is not a structural shelf, so stacking materials against it misuses a component intended only to stop things rolling off.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Guardrails and Toe Boards',
    category: 'Safety',
  },
  {
    id: 235,
    question:
      'Materials are needed on a tower platform. What is the safest way to get them up?',
    options: [
      'Climb the internal ladder carrying the load in one free hand',
      'Throw the smaller items up to a colleague on the platform',
      'Raise them by a hand line or hoist so both hands stay free',
      'Rest them on the guardrail and slide them along to the work',
    ],
    correctAnswer: 2,
    explanation:
      'Loads are raised by a hand line or similar so the climber keeps both hands on the ladder, which is where most control on a tower comes from. Throwing items up creates a falling object hazard and offers no control if the catch is missed.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Falling Objects',
    category: 'Safety',
  },
  {
    id: 236,
    question:
      'Two operatives plan to work from a tower platform with a bundle of trunking. What must be checked?',
    options: [
      'That the combined weight stays within the rated platform loading',
      'That both operatives are of similar build and body weight',
      'That the trunking is stacked centrally and reaching guardrail height',
      'That one operative remains at ground level to steady the tower',
    ],
    correctAnswer: 0,
    explanation:
      'The platform has a safe working load covering people, tools and materials together, so the total on the deck is what matters. Stacking material up to guardrail height also defeats the edge protection, so it makes the situation worse rather than better.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Platform Loading',
    category: 'Safety',
  },
  {
    id: 237,
    question:
      'A tower is used in a remote plant room by a lone operative. What must the plan cover?',
    options: [
      'The route the tower will take between the plant room doors',
      'The tools the operative expects to need during that shift',
      'The time by which the operative is booked to finish the work',
      'How the operative is reached and recovered if injured up there',
    ],
    correctAnswer: 3,
    explanation:
      'Planning work at height includes arranging emergency and rescue procedures rather than relying entirely on the emergency services to reach a casualty. Knowing the finish time tells nobody how to get an injured person down from a platform in a locked plant room.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Emergency Planning',
    category: 'Legislation',
  },
  {
    id: 238,
    question:
      'Why is use of a tower restricted to people trained in that equipment?',
    options: [
      'Because it carries specific risks that training and knowledge address',
      'Because the hire agreement names the individuals who may use it',
      'Because untrained users invalidate the site insurance arrangements',
      'Because the tower manufacturer runs the only recognised courses',
    ],
    correctAnswer: 0,
    explanation:
      'Where equipment involves a specific risk its use is restricted to those trained in that equipment and in the risks it presents, which is a safety duty rather than a paperwork one. Insurance and hire terms may follow from that, but they are not the reason the restriction exists.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Competence and Training',
    category: 'Legislation',
  },
  {
    id: 239,
    question:
      'You arrive to find a tower with one guardrail removed and a scaffold board bridging to a mezzanine. What do you do?',
    options: [
      'Use it briefly because the board makes the crossing much quicker',
      'Replace the missing guardrail and leave the bridging board in place',
      'Use it only while a second person holds the board steady at one end',
      'Stop, remove the board and have the tower put right before any use',
    ],
    correctAnswer: 3,
    explanation:
      'A tower is only safe in its designed configuration, so improvised bridging and missing edge protection make it unusable until a competent person reinstates it. Refitting the guardrail alone still leaves an unplanned load path through a board the tower was never designed to carry.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Unsafe Towers',
    category: 'Safety',
  },
  {
    id: 240,
    question:
      'When would tying a tower to an adjacent structure normally be considered?',
    options: [
      'Whenever the tower is going to be used for more than one shift',
      'Where stability cannot be achieved by the base and outriggers alone',
      'Whenever the tower is erected within a building rather than outside',
      'Where the operative would prefer the platform to feel more solid',
    ],
    correctAnswer: 1,
    explanation:
      'Tying in is a stability measure used where the base dimensions, ballast and outriggers cannot give the tower adequate resistance to overturning at the height needed. How long the tower stands does not by itself determine whether it is stable at that height.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Tower Stability',
    category: 'Assembly',
  },
  {
    id: 241,
    question:
      'An operative proposes cantilevering a platform out from the tower to reach over a machine. What is the concern?',
    options: [
      'The extra platform will make the tower slower to move afterwards',
      'The cantilever will use up the spare boards needed at the next level',
      'The reach saves time but the platform edge will need extra marking',
      'It shifts load outside the base and can overturn the whole tower',
    ],
    correctAnswer: 3,
    explanation:
      'Any arrangement that puts weight outside the footprint moves the line of action of the load towards the edge of the base and can tip the tower. Unless the supplier specifically designs and details such a configuration, the reach is achieved by moving the tower instead.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Tower Stability',
    category: 'Assembly',
  },
  {
    id: 242,
    question:
      'Two towers from different makers are on site and one is short of a brace. What is the position?',
    options: [
      'Components may be swapped if the tube diameters look much the same',
      'Components may be swapped provided the build is checked afterwards',
      'Components must not be mixed unless the supplier states they suit',
      'Components may be swapped because all aluminium towers are similar',
    ],
    correctAnswer: 2,
    explanation:
      'A tower is designed and tested as a matched system, so parts from another maker are only used where the supplier confirms compatibility. Matching tube diameters by eye tells you nothing about the locking claws, wall thickness or the loads the frame was proved against.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Components',
    category: 'Assembly',
  },
  {
    id: 243,
    question:
      'A tower is to stand with one castor over a plastic drain cover in a yard. What should be done?',
    options: [
      'Set the castor down gently so the cover is not shock loaded at all',
      'Lay a scaffold board over the cover and set the castor on the board',
      'Leave the castor there but keep the platform to half its usual height',
      'Reposition the tower so every castor bears on sound, firm ground',
    ],
    correctAnswer: 3,
    explanation:
      'Every wheel or foot must be properly supported on ground capable of taking the load, and a light cover can give way suddenly under a point load. Spreading the load over a board still relies on the cover beneath it, so the safe answer is to move the tower onto sound ground.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Ground Conditions',
    category: 'Assembly',
  },
  {
    id: 244,
    question:
      'Why should an operative avoid overreaching from a tower platform?',
    options: [
      'It shifts weight to the edge and can destabilise the whole tower',
      'It makes the finished electrical work harder to inspect afterwards',
      'It uses more time than repositioning the tower would have taken',
      'It puts strain on the shoulders and can cause a longer term injury',
    ],
    correctAnswer: 0,
    explanation:
      'Leaning out beyond the guardrails moves the load towards the edge of the base and can overturn a light tower as well as risking a fall. Musculoskeletal strain is a genuine issue but it is not the reason overreaching is prohibited on access towers.',
    section: 'Module 7',
    difficulty: 'basic',
    topic: 'Safe Working Practice',
    category: 'Safety',
  },
  {
    id: 245,
    question:
      'An operative sets a stepladder on the tower platform to gain the last half metre of reach. What is wrong?',
    options: [
      'The stepladder will damage the platform boards under the feet',
      'The stepladder must be tied to the guardrail before being used',
      'The stepladder should be replaced with a taller pair of trestles',
      'It raises the person above the guardrails on an unstable base',
    ],
    correctAnswer: 3,
    explanation:
      'Standing on anything placed on the platform lifts the operative above the edge protection and puts a small, unstable base on a structure already at height. Tying the stepladder to the guardrail does not restore any protection, because the fall risk is now above the rail.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Unsafe Towers',
    category: 'Safety',
  },
  {
    id: 246,
    question:
      'A tower must be positioned close to an overhead busbar in a factory. What should happen first?',
    options: [
      'Fit insulating sleeves to the top guardrails before erecting the tower',
      'Arrange isolation of the busbar or a safe exclusion distance from it',
      'Erect the tower quickly so exposure to the busbar is kept brief',
      'Mark the busbar with hazard tape and brief the operative on it',
    ],
    correctAnswer: 1,
    explanation:
      'An aluminium tower is a good conductor, so the hazard is controlled at source by isolating the supply or keeping the structure a safe distance away. Tape and briefings only inform people about a live conductor that remains fully capable of causing a fatality.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Overhead Hazards',
    category: 'Safety',
  },
  {
    id: 247,
    question:
      'A tower is being dismantled at the end of a job. Which approach is correct?',
    options: [
      'Drop components to a colleague below to speed the strip down',
      'Remove all the guardrails first so the frames come apart easily',
      'Leave the top platform in place and lower the tower on its side',
      'Work down in reverse of the build, handing components down safely',
    ],
    correctAnswer: 3,
    explanation:
      'Dismantling reverses the assembly sequence so the person is protected at every stage and components are passed rather than dropped. Stripping the guardrails first removes the edge protection while the operative is still working at the highest level.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Dismantling',
    category: 'Assembly',
  },
  {
    id: 248,
    question:
      'A frame with a bent horizontal is found while loading the van. What should be done with it?',
    options: [
      'Load it separately and straighten the tube back at the depot',
      'Quarantine it as unusable and report it so it is not rebuilt in',
      'Return it to stock because a small bend has little real effect',
      'Mark it with tape and use it only in the lowest tower section',
    ],
    correctAnswer: 1,
    explanation:
      'A distorted member no longer carries the load it was proved to carry, so it is segregated and reported rather than returned to the pool. Using it low in the tower is worse rather than safer, because the bottom sections carry the load of everything above them.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Defect Reporting',
    category: 'Inspection',
  },
  {
    id: 249,
    question:
      'A tower is needed on a gently sloping car park. What is the correct approach?',
    options: [
      'Build the tower square and accept the lean the slope produces',
      'Chock the downhill castors with timber offcuts to take up the fall',
      'Reduce the platform height by one lift and ignore the slope itself',
      'Use adjustable legs to bring the base level and check it is plumb',
    ],
    correctAnswer: 3,
    explanation:
      'The base must be brought level within the adjustment the tower provides, and the structure checked for plumb, so the load runs down through the legs as designed. Chocking with loose offcuts relies on material that can shift or split and leaves the tower out of plumb.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Ground Conditions',
    category: 'Assembly',
  },
  {
    id: 250,
    question:
      'What must be done with the castor brakes before anyone climbs the tower?',
    options: [
      'Every brake must be applied so the tower cannot roll during use',
      'Two diagonal brakes are applied and the others left free to swivel',
      'The brakes are left off so the tower can be nudged into position',
      'The brakes are applied only where the floor surface is not level',
    ],
    correctAnswer: 0,
    explanation:
      'All castor brakes are locked before the tower is climbed, because a single free wheel lets the base creep away under the person above. Leaving brakes off for fine positioning is how towers move unexpectedly while someone is already on the platform.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Pre-use Checks',
    category: 'Safety',
  },
  {
    id: 251,
    question:
      'How do stabilisers and ballast differ in the way they resist overturning?',
    options: [
      'Stabilisers add weight low down and ballast widens the base area',
      'Both work by adding weight, so the two are entirely interchangeable',
      'Stabilisers widen the effective base and ballast adds weight low down',
      'Both widen the base, so either may be fitted to one side of a tower',
    ],
    correctAnswer: 2,
    explanation:
      'Stabilisers and outriggers resist tipping by enlarging the effective base, while ballast resists it by adding mass at the bottom of the structure. They are not interchangeable, and whichever is specified must be fitted as the supplier details it rather than to one side only.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Tower Stability',
    category: 'Assembly',
  },
  {
    id: 252,
    question:
      'A tower is required in a stairwell where a standard rectangular base will not fit. What is correct?',
    options: [
      'Build the standard tower and let one pair of castors hang clear',
      'Cut down a set of frames on site so the base fits the stairwell',
      'Use a ladder instead, since no tower can ever suit a stairwell',
      'Use a configuration the supplier provides and details for stairs',
    ],
    correctAnswer: 3,
    explanation:
      'Stair configurations exist as designed arrangements with the components and instructions to match, so the answer is to obtain the right tower rather than improvise. Modifying frames on site destroys the tested strength of the system and leaves the build with no valid instructions.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Special Configurations',
    category: 'Assembly',
  },
  {
    id: 253,
    question:
      'An apprentice who has not been trained on towers asks to help with the build. What should happen?',
    options: [
      'Let them build the first lift only, as it is closest to the ground',
      'They may observe or pass components but not assemble the tower',
      'Let them assemble it while a trained person watches from the ground',
      'Let them assemble it if they have watched the build once before',
    ],
    correctAnswer: 1,
    explanation:
      'Assembly is restricted to people trained in that equipment and its specific risks, so an untrained apprentice can watch and hand up parts but not build. Supervision does not create competence, and the lowest lift is where the errors that fail the whole tower begin.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Competence and Training',
    category: 'Legislation',
  },
  {
    id: 254,
    question:
      'A spanner falls from a tower platform into an empty cordoned area. What is the right response?',
    options: [
      'Retrieve it quietly, as the cordon meant nobody was ever at risk',
      'Log it at the end of the week if a similar event happens again',
      'Report it so the cause is examined and the controls are improved',
      'Fit a wider toe board and treat the matter as closed at that point',
    ],
    correctAnswer: 2,
    explanation:
      'A dropped tool is a near miss that reveals a failure in how tools were secured, and reporting it lets the cause be fixed before someone is standing there. Deciding it does not count because the cordon held treats good luck as if it were a control measure.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Falling Objects',
    category: 'Safety',
  },
  {
    id: 255,
    question:
      'Which use of a mobile access tower is not acceptable?',
    options: [
      'Using it as a support point for lifting or hauling a heavy load',
      'Using it to install a long run of lighting in a factory unit',
      'Using it as a working platform for second fix cabling work',
      'Using it to gain access to a high level distribution board',
    ],
    correctAnswer: 0,
    explanation:
      'A tower is designed as a working platform, not as a lifting anchor, and hauling against it applies forces the structure was never proved against. Long lighting runs and high level boards are exactly the repetitive access tasks towers are suited to.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Safe Working Practice',
    category: 'Safety',
  },
  {
    id: 256,
    question:
      'What should be in place before a tower is erected for a job on a construction site?',
    options: [
      'A copy of the training certificate displayed on the tower frame',
      'A signed acceptance of the hire terms from the equipment supplier',
      'A risk assessment and method covering the erection and the work',
      'A record of the previous inspection carried out at the last site',
    ],
    correctAnswer: 2,
    explanation:
      'Work at height is planned before it starts, so the hazards of erecting, using, moving and dismantling the tower are assessed and the method agreed. A record from a previous site describes a different structure on different ground and cannot serve as that plan.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Planning',
    category: 'Legislation',
  },
];
