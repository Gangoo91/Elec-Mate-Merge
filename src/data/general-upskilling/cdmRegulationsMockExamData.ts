/**
 * CDM Regulations Awareness Mock Exam Question Bank
 * 100 questions across 5 categories (questions 1–100), with 101–200 to be appended.
 * Categories: Introduction to CDM 2015 (40) | Duty Holders & Their Roles (40) |
 *   Pre-Construction & Planning (20, part 1)
 * Difficulty per 20: ~7 basic, ~9 intermediate, ~4 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const cdmRegulationsCategories = [
  "Introduction to CDM 2015",
  "Duty Holders & Their Roles",
  "Pre-Construction & Planning",
  "Design & Risk Management",
  "Construction Phase & Compliance"
];

export const cdmRegulationsMockExamConfig: MockExamConfig = {
  examId: 'cdm-regulations',
  examTitle: 'CDM Regulations Awareness Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/cdm-regulations-module-6',
  categories: cdmRegulationsCategories
};

export const getRandomCdmRegulationsExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(cdmRegulationsQuestionBank, numQuestions, cdmRegulationsCategories);
};

export const cdmRegulationsQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // CATEGORY 1 — Introduction to CDM 2015 — 40 questions (id 1–40)
  // =======================================================================

  // --- Questions 1–20 (batch 1): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 1,
    question: "What does the abbreviation CDM stand for in UK construction law?",
    options: [
      "Construction Design and Management",
      "Construction Duty and Methodology",
      "Contractor Design and Maintenance",
      "Construction Development and Monitoring"
    ],
    correctAnswer: 0,
    explanation: "CDM stands for Construction (Design and Management) Regulations. The current version, CDM 2015, came into force on 6 April 2015 and is the primary set of regulations for managing health and safety on construction projects in Great Britain.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "CDM abbreviation",
    category: "Introduction to CDM 2015"
  },
  {
    id: 2,
    question: "When did the current CDM Regulations (CDM 2015) come into force?",
    options: [
      "1 January 2014",
      "6 April 2015",
      "1 October 2016",
      "31 March 2015"
    ],
    correctAnswer: 1,
    explanation: "The Construction (Design and Management) Regulations 2015 came into force on 6 April 2015, replacing the previous CDM 2007 Regulations. They were made under the Health and Safety at Work etc. Act 1974.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "CDM 2015 commencement date",
    category: "Introduction to CDM 2015"
  },
  {
    id: 3,
    question: "Which parent Act provides the legal authority for the CDM 2015 Regulations?",
    options: [
      "The Building Act 1984",
      "The Health and Safety at Work etc. Act 1974",
      "The Factories Act 1961",
      "The Construction Act 1996"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 is a statutory instrument made under the Health and Safety at Work etc. Act 1974 (HSWA). Section 15 of HSWA gives the Secretary of State the power to make health and safety regulations such as CDM.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Parent legislation",
    category: "Introduction to CDM 2015"
  },
  {
    id: 4,
    question: "Which body is the principal enforcing authority for CDM 2015 on most construction sites?",
    options: [
      "Local Authority Environmental Health",
      "The Health and Safety Executive (HSE)",
      "The Construction Industry Training Board (CITB)",
      "The Office for Nuclear Regulation (ONR)"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety Executive (HSE) is responsible for enforcing CDM 2015 on construction sites across Great Britain. HSE inspectors can visit sites, issue improvement or prohibition notices, and prosecute for breaches of the Regulations.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Enforcement authority",
    category: "Introduction to CDM 2015"
  },
  {
    id: 5,
    question: "CDM 2015 applies to construction work carried out in which part of the United Kingdom?",
    options: [
      "England only",
      "England and Wales only",
      "Great Britain (England, Wales and Scotland)",
      "The entire United Kingdom including Northern Ireland"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 applies to construction work in Great Britain — that is England, Wales and Scotland. Northern Ireland has its own equivalent legislation: the Construction (Design and Management) Regulations (Northern Ireland) 2016.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Geographical scope",
    category: "Introduction to CDM 2015"
  },
  {
    id: 6,
    question: "Which of the following activities is classified as 'construction work' under CDM 2015 Regulation 2?",
    options: [
      "Routine office cleaning inside a completed building",
      "Installing a new electrical distribution board in an existing factory",
      "Delivering furniture to a furnished office",
      "Mowing the grass on a construction site perimeter"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 2 of CDM 2015, 'construction work' includes the installation, commissioning, maintenance, repair or removal of mechanical, electrical, gas or other services normally fixed within or to a structure. Installing a distribution board is therefore construction work.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Definition of construction work",
    category: "Introduction to CDM 2015"
  },
  {
    id: 7,
    question: "What is the definition of a 'structure' under CDM 2015?",
    options: [
      "Only permanent buildings with foundations",
      "Any building, timber or metal structure, railway line, sewer, road, earthworks, or similar, whether temporary or permanent",
      "Only structures over 10 metres in height",
      "Only structures requiring planning permission"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 of CDM 2015 defines 'structure' very broadly. It includes any building, timber, masonry, metal or reinforced concrete structure, railway line or siding, tramway line, dock, harbour, inland navigation, tunnel, shaft, bridge, viaduct, waterworks, reservoir, pipe or pipeline, cable, aqueduct, sewer, sewage works, gasholder, road, airfield, sea defence works, river works, drainage works, earthworks, lagoon, dam, wall, caisson, mast, tower, pylon, underground tank, earth retaining structure, or any structure similar to any of the foregoing — whether temporary or permanent.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Definition of structure",
    category: "Introduction to CDM 2015"
  },

  // intermediate (9)
  {
    id: 8,
    question: "Which set of regulations did CDM 2015 directly replace?",
    options: [
      "The CDM Regulations 1994 and the Construction Health Safety and Welfare Regulations 1996",
      "The CDM Regulations 2007 and the Construction (Health, Safety and Welfare) Regulations 1996",
      "The CDM Regulations 2007 only",
      "The Management of Health and Safety at Work Regulations 1999"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 replaced both the Construction (Design and Management) Regulations 2007 and the Construction (Health, Safety and Welfare) Regulations 1996 (CHSW). The welfare provisions from CHSW 1996 were incorporated into Part 4 and Schedule 2 of CDM 2015.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CDM history and revoked regulations",
    category: "Introduction to CDM 2015"
  },
  {
    id: 9,
    question: "Under CDM 2015, at what threshold must a construction project be notified to the HSE?",
    options: [
      "All projects regardless of size",
      "Projects lasting longer than 30 working days with more than 20 workers at any one time, or exceeding 500 person-days",
      "Projects lasting longer than 60 working days",
      "Projects with a contract value exceeding £250,000"
    ],
    correctAnswer: 1,
    explanation: "Regulation 6 of CDM 2015 requires notification to the HSE when a project is expected to last longer than 30 working days and have more than 20 workers working simultaneously at any point, or exceed 500 person-days of construction work. Notification is made using Form F10.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Notification thresholds",
    category: "Introduction to CDM 2015"
  },
  {
    id: 10,
    question: "What is the purpose of the F10 notification form under CDM 2015?",
    options: [
      "To apply for planning permission for a construction project",
      "To notify the HSE of a notifiable construction project before the construction phase begins",
      "To register a new contractor with the HSE",
      "To certify that a structure is safe for occupation"
    ],
    correctAnswer: 1,
    explanation: "The F10 form is used to notify the Health and Safety Executive about a notifiable construction project, as required by Regulation 6 of CDM 2015. It must be submitted as soon as practicable before the construction phase begins and must include details such as project location, client, principal designer, principal contractor and planned start date.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "F10 notification",
    category: "Introduction to CDM 2015"
  },
  {
    id: 11,
    question: "Which Regulation within CDM 2015 sets out the general principles of prevention that must be applied?",
    options: [
      "Regulation 3",
      "Regulation 5",
      "Regulation 8",
      "Regulation 9"
    ],
    correctAnswer: 3,
    explanation: "Regulation 9 of CDM 2015 requires that all duty holders apply the general principles of prevention set out in Schedule 1 when carrying out their duties. These principles originate from the European Framework Directive 89/391/EEC and include avoiding risks, evaluating unavoidable risks, combating risks at source, and giving priority to collective protective measures.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "General principles of prevention",
    category: "Introduction to CDM 2015"
  },
  {
    id: 12,
    question: "How are domestic clients treated differently under CDM 2015 compared to commercial clients?",
    options: [
      "Domestic clients are completely exempt from CDM 2015",
      "Domestic client duties automatically transfer to the contractor or, on notifiable projects, to the principal contractor unless a written agreement transfers them elsewhere",
      "Domestic clients must appoint a CDM Co-ordinator",
      "Domestic clients only need to comply with Part 4 welfare provisions"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 7 of CDM 2015, domestic clients are not exempt — CDM applies to all construction projects. However, domestic client duties are automatically transferred: on projects with only one contractor the duties pass to that contractor, and where there is a principal contractor the duties pass to the principal contractor. Alternatively, a domestic client can make a written agreement to transfer duties to the principal designer.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Domestic client provisions",
    category: "Introduction to CDM 2015"
  },
  {
    id: 13,
    question: "Which Part of CDM 2015 contains the duties relating to health, safety and welfare on construction sites?",
    options: [
      "Part 2 — Client duties",
      "Part 3 — Health and safety duties and roles",
      "Part 4 — General requirements for all construction sites",
      "Part 5 — General"
    ],
    correctAnswer: 2,
    explanation: "Part 4 of CDM 2015 (Regulations 25–33) sets out the general requirements for all construction sites relating to safety, stability, demolition, dismantling, explosives, excavations, cofferdams and caissons, reports of inspections, energy distribution installations, prevention of drowning, traffic routes, and fire detection and prevention. These provisions were carried over from the former CHSW 1996 Regulations.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Structure of CDM 2015",
    category: "Introduction to CDM 2015"
  },
  {
    id: 14,
    question: "Under CDM 2015, what does 'construction phase' mean?",
    options: [
      "The period from the first design drawing to practical completion",
      "The period of time starting when construction work in a project begins and ending when construction work in that project is completed",
      "The period from client appointment of a principal contractor to handover",
      "The period during which the construction phase plan is in force"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 of CDM 2015 defines the 'construction phase' as the period of time starting when construction work in a project begins and ending when construction work in that project is completed. This is an important definition because several duties under CDM are triggered by or relate to the construction phase.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Construction phase definition",
    category: "Introduction to CDM 2015"
  },
  {
    id: 15,
    question: "Which of the following is NOT listed as 'construction work' under CDM 2015 Regulation 2?",
    options: [
      "Site clearance and investigation (but not survey) of a site",
      "Demolition or dismantling of a structure",
      "Surveying a building with no physical intervention",
      "Painting or decorating the external surfaces of a building"
    ],
    correctAnswer: 2,
    explanation: "Regulation 2 of CDM 2015 specifically excludes 'survey' from the definition of 'site clearance, exploration and investigation'. Purely surveying a building without any physical intervention (drilling, opening up, etc.) is not construction work. However, intrusive surveys involving physical work to the structure would be covered.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Exclusions from construction work definition",
    category: "Introduction to CDM 2015"
  },
  {
    id: 16,
    question: "Under CDM 2015 Regulation 6, who has the duty to notify the HSE about a notifiable project?",
    options: [
      "The principal contractor",
      "The principal designer",
      "The client",
      "The contractor carrying out the most work"
    ],
    correctAnswer: 2,
    explanation: "Regulation 6(1) of CDM 2015 places the duty to notify the HSE squarely on the client. It is the client who must give notice in writing to the HSE as soon as is practicable before the construction phase begins. In practice the client may ask the principal designer or principal contractor to submit the F10 on their behalf, but the legal duty remains with the client.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Notification duty holder",
    category: "Introduction to CDM 2015"
  },

  // advanced (4)
  {
    id: 17,
    question: "The original CDM Regulations were introduced in 1994 to transpose which European Directive into UK law?",
    options: [
      "Council Directive 89/391/EEC — the Framework Directive",
      "Council Directive 92/57/EEC — the Temporary or Mobile Construction Sites Directive",
      "Council Directive 89/654/EEC — the Workplace Directive",
      "Council Directive 92/58/EEC — the Safety Signs Directive"
    ],
    correctAnswer: 1,
    explanation: "The CDM Regulations 1994 were introduced to transpose Council Directive 92/57/EEC (the Temporary or Mobile Construction Sites Directive) into UK law. This Directive set out minimum health and safety requirements for temporary or mobile construction sites across EU member states.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "European origins of CDM",
    category: "Introduction to CDM 2015"
  },
  {
    id: 18,
    question: "Schedule 1 of CDM 2015 lists the general principles of prevention. Which of the following correctly lists THREE of these principles in order?",
    options: [
      "Avoid risks; evaluate risks that cannot be avoided; combat risks at source",
      "Identify hazards; assess risks; record findings",
      "Eliminate; reduce; inform",
      "Plan; monitor; review"
    ],
    correctAnswer: 0,
    explanation: "Schedule 1 of CDM 2015 sets out the general principles of prevention derived from Article 6(2) of the European Framework Directive 89/391/EEC. They are: (a) avoiding risks; (b) evaluating the risks which cannot be avoided; (c) combating the risks at source; (d) adapting the work to the individual; (e) adapting to technical progress; (f) replacing the dangerous by the non-dangerous or less dangerous; (g) developing a coherent overall prevention policy; (h) giving priority to collective protective measures over individual protective measures; (i) giving appropriate instructions to employees.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Schedule 1 general principles",
    category: "Introduction to CDM 2015"
  },
  {
    id: 19,
    question: "Under Regulation 6(2), the F10 notification must contain certain particulars set out in which Schedule of CDM 2015?",
    options: [
      "Schedule 1",
      "Schedule 2",
      "Schedule 3",
      "Schedule 4"
    ],
    correctAnswer: 0,
    explanation: "This is a common misconception. Regulation 6(2) states the notice must contain the particulars specified in Schedule 1 only if it relates to projects where more than one contractor will be involved. However, more precisely, the particulars for notification are set out within Regulation 6 itself and reference Schedule 1 for multi-contractor projects. Note: CDM 2015 actually only has two schedules — Schedule 1 (particulars to be notified) and Schedule 2 (minimum welfare facilities). The correct answer is Schedule 1.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "F10 Schedule reference",
    category: "Introduction to CDM 2015"
  },
  {
    id: 20,
    question: "A key change from CDM 2007 to CDM 2015 was the replacement of the CDM Co-ordinator role. What replaced this role?",
    options: [
      "The Health and Safety Adviser",
      "The Planning Supervisor",
      "The Principal Designer",
      "The Project Supervisor"
    ],
    correctAnswer: 2,
    explanation: "One of the most significant changes in CDM 2015 was the abolition of the CDM Co-ordinator (CDMC) role, which had been introduced in CDM 2007. It was replaced by the Principal Designer role. Unlike the CDMC, the Principal Designer must be a designer (not just a co-ordinator) and carries direct design-related health and safety duties throughout the pre-construction phase.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "CDM Co-ordinator replacement",
    category: "Introduction to CDM 2015"
  },

  // --- Questions 21–40 (batch 2): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 21,
    question: "How many Parts does CDM 2015 contain?",
    options: [
      "Three",
      "Four",
      "Five",
      "Six"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 contains five Parts: Part 1 — Commencement, interpretation and application; Part 2 — Client duties; Part 3 — Health and safety duties and roles; Part 4 — General requirements for all construction sites; and Part 5 — General (transitional provisions, amendments, revocations).",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "CDM 2015 structure",
    category: "Introduction to CDM 2015"
  },
  {
    id: 22,
    question: "True or false: CDM 2015 applies to ALL construction projects, regardless of size.",
    options: [
      "True — CDM 2015 applies to every construction project",
      "False — it only applies to projects over 30 days",
      "False — it only applies to commercial projects",
      "False — it only applies to notifiable projects"
    ],
    correctAnswer: 0,
    explanation: "CDM 2015 applies to all construction projects in Great Britain, no matter how small or short in duration. There is no lower threshold for CDM to apply. What changes with project size is the level of duty — for example, only notifiable projects require an F10, and only projects with more than one contractor require a principal designer and principal contractor.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Universal application of CDM",
    category: "Introduction to CDM 2015"
  },
  {
    id: 23,
    question: "What is a 'domestic client' under CDM 2015?",
    options: [
      "Any client who is not a property developer",
      "A client for whom a construction project is being carried out which is not in the course or furtherance of a business",
      "A client who lives on the construction site",
      "A private landlord with fewer than five properties"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 of CDM 2015 defines a 'domestic client' as a client for whom a construction project is being carried out which is not done in the course or furtherance of a business of that client. This typically means a homeowner having work done on their own home where the work is not part of a business activity.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Domestic client definition",
    category: "Introduction to CDM 2015"
  },
  {
    id: 24,
    question: "Which HSE publication provides approved guidance on the CDM 2015 Regulations?",
    options: [
      "HSG65 — Managing for health and safety",
      "L144 — Managing health and safety in construction",
      "L153 — Managing health and safety in construction (CDM 2015)",
      "HSG150 — Health and safety in construction"
    ],
    correctAnswer: 2,
    explanation: "L153 'Managing health and safety in construction' is the Approved Code of Practice (ACoP) and guidance published by the HSE specifically for CDM 2015. It provides practical guidance on how to comply with each regulation, and the ACoP sections carry a special legal status — if followed, duty holders are regarded as having complied with the law.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "HSE guidance document",
    category: "Introduction to CDM 2015"
  },
  {
    id: 25,
    question: "Under CDM 2015, which of the following is NOT an example of construction work?",
    options: [
      "Erecting scaffolding for painting works",
      "Laying a new gas main underground",
      "Moving desks and computers within a finished office",
      "Demolishing an internal wall in a warehouse"
    ],
    correctAnswer: 2,
    explanation: "Moving furniture and equipment within a finished office is not construction work as defined by Regulation 2 of CDM 2015. Construction work involves the carrying out of building, civil engineering or engineering construction work and includes specific activities such as alteration, conversion, fitting out, commissioning, renovation, repair, upkeep, redecoration, maintenance, demolition, dismantling, and associated site preparation.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "What is not construction work",
    category: "Introduction to CDM 2015"
  },
  {
    id: 26,
    question: "What is the minimum number of contractors required on a project before a principal designer and principal contractor must be appointed?",
    options: [
      "One",
      "Two — more than one contractor",
      "Three",
      "Five"
    ],
    correctAnswer: 1,
    explanation: "Under Regulations 5(1)(a) and 5(1)(b) of CDM 2015, the client must appoint a principal designer and a principal contractor in writing where there will be more than one contractor working on the project. This means as soon as there are two or more contractors, these appointments become mandatory.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "PD and PC appointment trigger",
    category: "Introduction to CDM 2015"
  },
  {
    id: 27,
    question: "CDM 2015 revoked the Construction (Health, Safety and Welfare) Regulations 1996. Where are the equivalent welfare provisions now found?",
    options: [
      "In a separate set of welfare regulations published in 2015",
      "In Schedule 2 of CDM 2015",
      "In the Workplace (Health, Safety and Welfare) Regulations 1992",
      "In Part 3 of CDM 2015"
    ],
    correctAnswer: 1,
    explanation: "When CDM 2015 was introduced, the Construction (Health, Safety and Welfare) Regulations 1996 were revoked and their welfare provisions were incorporated directly into CDM 2015. Schedule 2 of CDM 2015 sets out the minimum welfare facilities that must be provided on construction sites, including sanitary conveniences, washing facilities, drinking water, changing rooms, and rest facilities.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Welfare provisions location",
    category: "Introduction to CDM 2015"
  },

  // intermediate (9)
  {
    id: 28,
    question: "Under CDM 2015, what is meant by the term 'pre-construction phase'?",
    options: [
      "The period from initial project concept to the start of detailed design",
      "Any period of time during which design or preparatory work is carried out for a project and which may continue during the construction phase",
      "The period between planning permission approval and construction phase start",
      "The first 14 days of a construction project"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 of CDM 2015 defines the 'pre-construction phase' as any period of time during which design or preparatory work is carried out for a project and which may continue during the construction phase. This is significant because it means the pre-construction phase overlaps with the construction phase — design work does not stop when building starts.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Pre-construction phase definition",
    category: "Introduction to CDM 2015"
  },
  {
    id: 29,
    question: "What is the legal status of the Approved Code of Practice (ACoP) sections within HSE publication L153?",
    options: [
      "They are legally binding in the same way as the Regulations themselves",
      "They have no legal status and are purely advisory",
      "Following them is not compulsory, but failing to follow them may be used in court as evidence of non-compliance unless equivalent or better measures can be shown",
      "They only apply to notifiable projects"
    ],
    correctAnswer: 2,
    explanation: "An Approved Code of Practice (ACoP) has a special legal status under the Health and Safety at Work etc. Act 1974. If you follow the guidance in an ACoP, you are regarded as having complied with the relevant regulation. However, you are free to take other action provided you can demonstrate it achieves an equivalent or better standard of health and safety.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "ACoP legal status",
    category: "Introduction to CDM 2015"
  },
  {
    id: 30,
    question: "Which Regulation of CDM 2015 deals with the application of the Regulations to domestic clients?",
    options: [
      "Regulation 5",
      "Regulation 6",
      "Regulation 7",
      "Regulation 8"
    ],
    correctAnswer: 2,
    explanation: "Regulation 7 of CDM 2015 specifically addresses the application of CDM to projects for domestic clients. It sets out how client duties are transferred to contractors or principal contractors, and how a domestic client may choose to transfer their duties to the principal designer by written agreement.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Domestic client regulation number",
    category: "Introduction to CDM 2015"
  },
  {
    id: 31,
    question: "In the context of CDM 2015, what does a 'person-day' mean for the purposes of notification?",
    options: [
      "Any calendar day on which a person is contracted to work",
      "A day on which one person carries out construction work — two people working on the same day count as two person-days",
      "A full 8-hour shift worked by one person",
      "Any day during the project programme, including non-working days"
    ],
    correctAnswer: 1,
    explanation: "For the purposes of Regulation 6 (notification), a person-day is any day on which one person carries out construction work. If 10 workers each work on the same day, that counts as 10 person-days. The 500 person-day threshold is therefore not 500 calendar days but the cumulative total of individual person-days of construction work.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Person-day definition",
    category: "Introduction to CDM 2015"
  },
  {
    id: 32,
    question: "Under CDM 2015, which of the following correctly describes a 'designer'?",
    options: [
      "Only a chartered architect or structural engineer",
      "Any person who in the course or furtherance of a business prepares or modifies a design, or arranges for or instructs any person under their control to do so",
      "Only someone who produces drawings for the construction work",
      "A person who holds a RIBA or ICE membership"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 of CDM 2015 defines a 'designer' broadly as any person (including a client, contractor or other person) who in the course or furtherance of a business carries out design work, prepares or modifies a design, or arranges for or instructs any person under their control to do so. This includes architects, engineers, quantity surveyors who specify materials, and even tradespeople who design elements of their own work.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Designer definition",
    category: "Introduction to CDM 2015"
  },
  {
    id: 33,
    question: "What does CDM 2015 Regulation 2 define as a 'project'?",
    options: [
      "A scheme of work awarded under a single contract",
      "A project which includes or is intended to include construction work and includes all planning, design, management or other work involved in a project until the end of the construction phase",
      "Any work that requires a principal contractor",
      "A programme of construction works lasting more than 30 days"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 defines a 'project' as a project which includes or is intended to include construction work and includes all planning, design, management or other work involved in a project until the end of the construction phase. This broad definition ensures CDM duties cover the entire lifecycle from concept through to completion of construction.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Project definition",
    category: "Introduction to CDM 2015"
  },
  {
    id: 34,
    question: "A domestic client wishes to take on CDM client duties themselves rather than have them transfer to the contractor. Is this permitted under CDM 2015?",
    options: [
      "Yes — a domestic client can choose to carry out client duties by making a written declaration to the HSE",
      "No — domestic client duties must always transfer to the contractor or principal contractor",
      "Yes — a domestic client may enter into a written agreement with the principal designer to transfer duties to the principal designer, but cannot retain them personally",
      "No — domestic clients are exempt from all CDM duties"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 7 of CDM 2015, the default position is that domestic client duties transfer to the contractor (or principal contractor on multi-contractor projects). The only alternative is for the domestic client to enter a written agreement to transfer duties to the principal designer. CDM 2015 does not provide a mechanism for a domestic client to retain and perform the duties themselves.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Domestic client duty transfer",
    category: "Introduction to CDM 2015"
  },
  {
    id: 35,
    question: "Under CDM 2015, when must the F10 notification be displayed on a construction site?",
    options: [
      "It does not need to be displayed — only submitted to the HSE",
      "It must be displayed in the site office only",
      "The notice given to the HSE must be displayed in the construction site office in a comprehensible form where it can be read by any worker on the site",
      "It only needs to be available if requested by an HSE inspector"
    ],
    correctAnswer: 2,
    explanation: "Regulation 6(3) of CDM 2015 requires the client to ensure that the notice (F10) is displayed in the construction site office so that it is readable by any worker engaged in the construction work on the site. This ensures transparency and that all site workers know who the key duty holders are.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "F10 display requirement",
    category: "Introduction to CDM 2015"
  },
  {
    id: 36,
    question: "Under CDM 2015, if a project starts with one contractor but later a second contractor is engaged, what must the client do?",
    options: [
      "Nothing — CDM appointments are only required at the start of a project",
      "Appoint a principal designer and principal contractor in writing as soon as practicable",
      "Notify the HSE regardless of project duration",
      "Appoint a CDM Co-ordinator"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 of CDM 2015 requires the client to appoint a principal designer and principal contractor in writing where it is reasonably foreseeable that more than one contractor will be working on the project. If this situation arises during the project, the client must make these appointments as soon as practicable after it becomes apparent that more than one contractor will be involved.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Late PD/PC appointment",
    category: "Introduction to CDM 2015"
  },

  // advanced (4)
  {
    id: 37,
    question: "CDM 1994 introduced the role of 'Planning Supervisor'. In which subsequent version of CDM was this role abolished and what replaced it?",
    options: [
      "CDM 2007 replaced it with the CDM Co-ordinator",
      "CDM 2007 replaced it with the Principal Designer",
      "CDM 2015 replaced it with the CDM Co-ordinator",
      "CDM 2004 replaced it with the Site Safety Supervisor"
    ],
    correctAnswer: 0,
    explanation: "The Planning Supervisor role was introduced in CDM 1994 and was abolished when CDM 2007 came into force. CDM 2007 replaced it with the CDM Co-ordinator (CDMC). Subsequently, CDM 2015 abolished the CDMC and introduced the Principal Designer. The evolution was therefore: Planning Supervisor (1994) → CDM Co-ordinator (2007) → Principal Designer (2015).",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Historical role evolution",
    category: "Introduction to CDM 2015"
  },
  {
    id: 38,
    question: "Under CDM 2015 Regulation 3(4), what happens if the client fails to make the required appointments of principal designer and principal contractor?",
    options: [
      "The project is automatically halted by the HSE",
      "The contractor with the largest share of work assumes both roles",
      "The client must fulfil the duties of any duty holder they fail to appoint",
      "The HSE will appoint suitable persons at the client's expense"
    ],
    correctAnswer: 2,
    explanation: "Regulation 5(4) of CDM 2015 (not 3(4) — this is a deliberate test of precise knowledge) states that where a client fails to appoint a principal designer or principal contractor, the client must fulfil the duties of those roles themselves. This is a significant provision because it means the client cannot escape CDM duties by simply failing to make appointments.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Client default duties",
    category: "Introduction to CDM 2015"
  },
  {
    id: 39,
    question: "Regulation 8 of CDM 2015 sets out a general duty concerning which of the following?",
    options: [
      "The duty to provide welfare facilities",
      "The general duties of workers",
      "The general duty to ensure skills, knowledge, training and experience, and organisational capability of those appointed or engaged",
      "The duty to manage fire safety on site"
    ],
    correctAnswer: 2,
    explanation: "Regulation 8 of CDM 2015 is the overarching 'competence' regulation (although CDM 2015 avoids the term 'competence' used in CDM 2007). It requires that duty holders must not appoint or engage a designer, principal designer, contractor or principal contractor unless they are satisfied that the person has the skills, knowledge, training and experience, and (for organisations) the organisational capability necessary to fulfil the role.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Regulation 8 — skills and capability",
    category: "Introduction to CDM 2015"
  },
  {
    id: 40,
    question: "Under CDM 2015, Regulation 4(1) states that where Regulations impose duties, those duties apply in relation to which specific standard?",
    options: [
      "An absolute standard — the duty must be complied with regardless of cost",
      "So far as is reasonably practicable",
      "So far as is practicable",
      "To a standard that the HSE considers acceptable"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(1) of CDM 2015 states that where a duty is placed on a person by Part 4, that duty extends only so far as is reasonably practicable. For Part 2 and Part 3 duties, the standard varies — some use 'must ensure' (effectively absolute), while others use 'so far as is reasonably practicable'. Understanding the qualification applied to each duty is critical for compliance.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Reasonably practicable standard",
    category: "Introduction to CDM 2015"
  },

  // =======================================================================
  // CATEGORY 2 — Duty Holders & Their Roles — 40 questions (id 41–80)
  // =======================================================================

  // --- Questions 41–60 (batch 1): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 41,
    question: "Under CDM 2015, how many types of duty holder are identified?",
    options: [
      "Three",
      "Four",
      "Five",
      "Six"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 identifies five types of duty holder: the client, the principal designer, the principal contractor, designers, and contractors. Workers also have duties under CDM but are not formally classified as 'duty holders' in the same way.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Number of duty holders",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 42,
    question: "Who is the 'client' under CDM 2015?",
    options: [
      "The person or organisation who directly employs the construction workers",
      "Any person for whom a construction project is carried out",
      "The person who finances the construction project",
      "The local authority that grants planning permission"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 of CDM 2015 defines the 'client' as any person for whom a construction project is carried out. This is a broad definition — it does not matter whether the client is a company, individual, public body, or other entity. The key test is whether the construction work is being done for them.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Client definition",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 43,
    question: "What is the primary role of the principal contractor under CDM 2015?",
    options: [
      "To produce all design drawings for the project",
      "To plan, manage, monitor and coordinate health and safety during the construction phase",
      "To appoint the principal designer on behalf of the client",
      "To carry out all construction work on the project"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 13 of CDM 2015, the principal contractor has the duty to plan, manage, monitor and coordinate health and safety in the construction phase of the project. This includes liaising with the principal designer, preparing the construction phase plan, organising cooperation between contractors, and ensuring suitable site inductions are provided.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Principal contractor role",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 44,
    question: "Under CDM 2015, who must the principal designer be?",
    options: [
      "A qualified architect",
      "A designer with control over the pre-construction phase of the project",
      "The most experienced designer on the project",
      "A specialist health and safety consultant"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5(1)(a) of CDM 2015 requires the client to appoint a designer with control over the pre-construction phase as the principal designer. The key requirement is that the person or organisation must be a designer (not merely an administrator) and must have the ability to coordinate and control the pre-construction phase, including design-related health and safety matters.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Principal designer requirement",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 45,
    question: "Under CDM 2015, who is a 'contractor'?",
    options: [
      "Only the main contractor on a project",
      "Any person who in the course or furtherance of a business carries out, manages or controls construction work",
      "Only companies registered with the HSE",
      "Only contractors with CSCS cards"
    ],
    correctAnswer: 1,
    explanation: "Regulation 2 of CDM 2015 defines a 'contractor' as any person who, in the course or furtherance of a business, carries out, manages or controls construction work. This is a very broad definition that includes main contractors, sub-contractors, specialist contractors, and sole traders carrying out construction work.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Contractor definition",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 46,
    question: "Under CDM 2015, are workers on a construction site considered to have any duties?",
    options: [
      "No — only duty holders have duties under CDM",
      "Yes — workers must cooperate with their employer and others, report anything that endangers health and safety, and use any protective equipment provided",
      "Workers only have duties if they hold a CSCS card",
      "Workers only have duties on notifiable projects"
    ],
    correctAnswer: 1,
    explanation: "Regulation 14(2) of CDM 2015, read alongside Part 3 and the general duties under HSWA 1974 (sections 7 and 8), means workers must cooperate with their employer and any other person to enable compliance with CDM, report dangerous conditions, and use any work equipment and protective measures provided to them properly.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Worker duties",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 47,
    question: "Under CDM 2015, must the principal designer and principal contractor be appointed in writing?",
    options: [
      "No — verbal appointments are sufficient",
      "Only written appointments are needed for notifiable projects",
      "Yes — Regulation 5(1) requires both to be appointed in writing",
      "Written appointments are recommended but not legally required"
    ],
    correctAnswer: 2,
    explanation: "Regulation 5(1) of CDM 2015 explicitly requires the client to appoint in writing a designer with control over the pre-construction phase as principal designer, and a contractor as principal contractor. The written appointment must be made as soon as practicable and in any event before the construction phase begins.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Written appointments",
    category: "Duty Holders & Their Roles"
  },

  // intermediate (9)
  {
    id: 48,
    question: "Under CDM 2015 Regulation 4(5), which duty holder must ensure that the principal designer and principal contractor comply with their duties?",
    options: [
      "The HSE",
      "The client",
      "The other duty holders collectively",
      "Each duty holder is responsible only for their own compliance"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(5) places a specific duty on the client to ensure that the principal designer and principal contractor comply with their respective duties under CDM 2015. This means the client has an overseeing role and cannot simply appoint and walk away — they must take reasonable steps to ensure those they appoint are fulfilling their obligations.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Client oversight duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 49,
    question: "Regulation 11 sets out the duties of a principal designer. Which of the following is NOT a principal designer duty?",
    options: [
      "Planning, managing, monitoring and coordinating health and safety in the pre-construction phase",
      "Ensuring all designers comply with their duties under Regulation 9",
      "Preparing the construction phase plan",
      "Liaising with the principal contractor for the duration of the principal designer's appointment"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 12(1), it is the principal contractor (not the principal designer) who must draw up the construction phase plan. The principal designer's duties under Regulation 11 include planning, managing, monitoring and coordinating health and safety in the pre-construction phase; ensuring designers comply with Regulation 9; preparing and providing pre-construction information; and liaising with the principal contractor.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Principal designer duties",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 50,
    question: "Under Regulation 12, what is the principal contractor's duty regarding the construction phase plan?",
    options: [
      "To request it from the principal designer before construction begins",
      "To draw up a construction phase plan, or make arrangements for it to be drawn up, before the construction phase begins",
      "To submit a construction phase plan to the HSE for approval",
      "To review the construction phase plan produced by the client"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12(1) of CDM 2015 requires the principal contractor to draw up a construction phase plan, or make arrangements for a construction phase plan to be drawn up, as soon as is practicable prior to setting up a construction site. The plan must set out the health and safety arrangements and site rules for the construction phase.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Construction phase plan responsibility",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 51,
    question: "Regulation 13(2) requires the principal contractor to ensure which of the following is provided to every worker on site?",
    options: [
      "A copy of the health and safety file",
      "A suitable site induction",
      "Personal protective equipment",
      "A written risk assessment for their specific trade"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13(2) of CDM 2015 requires the principal contractor to ensure that a suitable site induction is provided to every worker carrying out construction work on the site. The induction must include the health and safety arrangements for the site, welfare arrangements, and any site-specific risks.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Site induction duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 52,
    question: "Under CDM 2015, what are the client's duties regarding the provision of pre-construction information?",
    options: [
      "The client has no duties regarding pre-construction information — this is the principal designer's role",
      "The client must provide pre-construction information as soon as is practicable to every designer and contractor appointed or being considered for appointment",
      "The client must provide pre-construction information only to the principal contractor",
      "The client must produce the pre-construction information pack"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(4) of CDM 2015 requires the client to provide pre-construction information as soon as is practicable to every designer and contractor appointed, or being considered for appointment, to the project. This information is essential for designers and contractors to plan their work safely. The client does not produce the formal PCI pack — that is the principal designer's role — but the client must make relevant information available.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Client PCI duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 53,
    question: "Under Regulation 9(1), what general duty does CDM 2015 place on all designers?",
    options: [
      "To produce a risk register for every project",
      "To take into account the general principles of prevention when carrying out design work and avoid foreseeable risks so far as is reasonably practicable",
      "To carry out a site inspection before producing any design",
      "To appoint a health and safety adviser for every project"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9(1) of CDM 2015 requires all designers to take into account the general principles of prevention (set out in Schedule 1) and any pre-construction information when preparing or modifying a design. Regulation 9(2) requires designers to eliminate, so far as is reasonably practicable, foreseeable risks to any person carrying out or affected by construction work, and where this is not possible, to take steps to reduce or control risks.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "General designer duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 54,
    question: "Under CDM 2015 Regulation 15, what duty is placed on contractors regarding cooperation and consultation with workers?",
    options: [
      "Contractors must consult with workers only through trade union representatives",
      "Contractors must provide workers with appropriate directions, instructions and information, and consult them in good time on health and safety matters",
      "Contractors have no specific consultation duties — this is the principal contractor's role",
      "Contractors must hold weekly safety meetings with all workers"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15 of CDM 2015 requires every contractor to provide each worker under their control with appropriate supervision, instructions and information. Regulation 14(1) requires contractors to consult workers or their representatives in good time on matters connected with the project that may affect their health, safety or welfare, including planning, organisation and risk management.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Contractor worker consultation",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 55,
    question: "Under CDM 2015, can the client also be the principal designer or principal contractor?",
    options: [
      "No — a client cannot hold multiple CDM roles",
      "Yes — a client can fulfil these roles provided they have the necessary skills, knowledge, experience and organisational capability",
      "Only on domestic projects",
      "Only on non-notifiable projects"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 permits the same person or organisation to hold multiple duty holder roles simultaneously. A client who has the necessary skills, knowledge, training, experience and organisational capability (as required by Regulation 8) can also be the principal designer, principal contractor, or both. This commonly occurs on developer-led projects where the developer organisation has in-house design and construction capability.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Multiple CDM roles",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 56,
    question: "Under Regulation 13(4), the principal contractor must ensure which of the following regarding the health and safety file?",
    options: [
      "That the health and safety file is created and maintained",
      "That the health and safety file is provided to the HSE",
      "That the principal designer is provided with any information relevant to the health and safety file",
      "That the health and safety file is destroyed at the end of the project"
    ],
    correctAnswer: 2,
    explanation: "Regulation 13(4) of CDM 2015 requires the principal contractor to provide the principal designer with any information in the principal contractor's possession relevant to the health and safety file. The principal designer is responsible for preparing, reviewing, updating and revising the health and safety file — but the principal contractor must feed relevant information into it.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PC health and safety file duty",
    category: "Duty Holders & Their Roles"
  },

  // advanced (4)
  {
    id: 57,
    question: "Under Regulation 12(5), in what circumstances does the principal contractor's duty extend to ensuring adequate welfare facilities are provided throughout the construction phase?",
    options: [
      "Only when specifically instructed by the client",
      "Only on notifiable projects",
      "On all projects — the principal contractor must ensure that welfare facilities are provided throughout the construction phase in accordance with Schedule 2",
      "Only when the construction phase exceeds 30 working days"
    ],
    correctAnswer: 2,
    explanation: "Regulation 13(6) (welfare duties are covered through Regulation 13 and Schedule 2) requires the principal contractor to ensure welfare facilities complying with Schedule 2 are provided from the start of the construction phase and maintained throughout. This duty applies on every project where a principal contractor is appointed, regardless of project size or duration.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "PC welfare facilities duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 58,
    question: "Regulation 11(6) requires the principal designer to ensure the health and safety file is passed to the client at which point?",
    options: [
      "At the end of the pre-construction phase",
      "At the end of the principal designer's appointment on the project, and at the end of the project",
      "Only when the client requests it",
      "Within 14 days of the end of the construction phase"
    ],
    correctAnswer: 1,
    explanation: "Regulation 11(6) of CDM 2015 requires the principal designer to ensure the health and safety file is appropriately reviewed, updated and revised to take account of the work as it progresses, and passed to the principal contractor if the principal designer's appointment concludes before the end of the project. Under Regulation 12(8), the principal contractor must then pass the file to the client at the end of the project.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "H&S file handover timing",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 59,
    question: "Under CDM 2015, if the principal designer's appointment ends before the construction phase is complete, what happens to the principal designer's duties regarding the health and safety file?",
    options: [
      "The duties cease — no one is responsible for the file until a new principal designer is appointed",
      "The duties transfer to the principal contractor under Regulation 12(6)",
      "The client must immediately appoint a new principal designer",
      "The duties transfer to the client automatically"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12(6) of CDM 2015 provides that where the principal designer's appointment finishes before the end of the project, the principal contractor must ensure the health and safety file is appropriately reviewed, updated and revised, and must deliver it to the client at the end of the project. The duties regarding the file effectively transfer from the principal designer to the principal contractor.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "H&S file duty transfer",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 60,
    question: "Regulation 8(4) states that a designer or contractor must not accept an appointment unless they fulfil which condition?",
    options: [
      "They hold professional indemnity insurance",
      "They have been approved by the client's health and safety adviser",
      "They are satisfied that they have, or will obtain through the engagement, the skills, knowledge, experience and (for an organisation) the organisational capability necessary to fulfil the role",
      "They have previously worked on a similar type of project"
    ],
    correctAnswer: 2,
    explanation: "Regulation 8(4) of CDM 2015 provides a reciprocal duty: not only must the person making the appointment be satisfied about the appointee's capability (Regulation 8(1)), but the appointee themselves must not accept the appointment unless they are satisfied they fulfil, or will obtain, the necessary skills, knowledge, experience and organisational capability. This is a two-way obligation.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Reciprocal competence duty",
    category: "Duty Holders & Their Roles"
  },

  // --- Questions 61–80 (batch 2): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 61,
    question: "Under CDM 2015, which duty holder is responsible for making arrangements for managing a project so it is carried out without risks to health and safety?",
    options: [
      "The principal contractor",
      "The principal designer",
      "The client",
      "The HSE"
    ],
    correctAnswer: 2,
    explanation: "Regulation 4(1) of CDM 2015 places a duty on the client to make suitable arrangements for managing a project, including the allocation of sufficient time and other resources. The client has an overarching responsibility to ensure the project is set up and resourced so that it can be carried out without risks to the health or safety of any person affected by the project.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Client management arrangements",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 62,
    question: "A self-employed joiner working on a construction site is classified as which duty holder under CDM 2015?",
    options: [
      "A worker only",
      "A contractor",
      "A designer",
      "A domestic client"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, a self-employed person who carries out construction work in the course or furtherance of a business is classified as a contractor. The definition of contractor in Regulation 2 does not distinguish between employed and self-employed — anyone who carries out, manages or controls construction work as a business is a contractor.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Self-employed as contractor",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 63,
    question: "Under CDM 2015, what must the client do before allowing the construction phase to begin?",
    options: [
      "Obtain HSE approval for the construction phase plan",
      "Ensure a construction phase plan has been drawn up by the contractor or principal contractor",
      "Personally inspect the construction site",
      "Appoint a site safety officer"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(6) of CDM 2015 requires the client to ensure that the construction phase does not start unless a construction phase plan has been drawn up by the contractor (for single-contractor projects) or the principal contractor (for multi-contractor projects). The client does not need to approve the plan but must be satisfied it exists before construction work begins.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Client duty before construction phase",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 64,
    question: "Which Regulation of CDM 2015 sets out the duties of clients?",
    options: [
      "Regulation 4",
      "Regulation 8",
      "Regulation 11",
      "Regulation 15"
    ],
    correctAnswer: 0,
    explanation: "Regulation 4 of CDM 2015 (which falls within Part 2 — Client duties) sets out the duties of clients. It covers making suitable management arrangements, providing pre-construction information, ensuring appointments are made, ensuring the construction phase does not start without a construction phase plan, and ensuring welfare facilities are provided.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Client duties regulation number",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 65,
    question: "Under CDM 2015, who is responsible for ensuring there is cooperation between all persons working on a project?",
    options: [
      "Only the principal contractor",
      "Only the client",
      "All duty holders — Regulation 8(3) requires cooperation between all persons concerned with the project",
      "The HSE"
    ],
    correctAnswer: 2,
    explanation: "Regulation 8(3) of CDM 2015 requires every person with a duty under the Regulations to cooperate with any other person working on or in connection with the project to the extent necessary to enable any person with a duty under the Regulations to fulfil that duty. This mutual cooperation duty applies to all duty holders, not just one specific party.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Cooperation duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 66,
    question: "Under CDM 2015, a quantity surveyor who specifies particular materials or products in a bill of quantities is classified as which type of duty holder?",
    options: [
      "A contractor",
      "A client",
      "A designer",
      "They have no CDM duties"
    ],
    correctAnswer: 2,
    explanation: "Under CDM 2015, 'design' includes drawings, design details, specifications and bills of quantities. A quantity surveyor who specifies particular materials or products is making design decisions that could affect health and safety (for example, specifying a heavy cladding material that creates manual handling risks). They are therefore a 'designer' under Regulation 2 and must comply with designer duties under Regulation 9.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "QS as designer",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 67,
    question: "Under CDM 2015, which duty holder has the duty to ensure that suitable welfare facilities are provided for workers from the start of the construction phase?",
    options: [
      "The client",
      "The principal designer",
      "Each individual worker",
      "The local authority"
    ],
    correctAnswer: 0,
    explanation: "Regulation 4(7) of CDM 2015 places a duty on the client to ensure that welfare facilities which comply with Schedule 2 are provided throughout the construction phase. On projects with a principal contractor, this duty is carried out in practice by the principal contractor, but the overarching legal duty sits with the client.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Client welfare duty",
    category: "Duty Holders & Their Roles"
  },

  // intermediate (9)
  {
    id: 68,
    question: "Under Regulation 15(5), what must a contractor do if they identify that any work is being carried out that puts any person at risk of injury?",
    options: [
      "Report it to the principal contractor at the end of the working day",
      "Take appropriate steps to prevent that work or activity from continuing, including by stopping work if necessary",
      "Record it in the site diary and continue working",
      "Notify the HSE within 24 hours"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15(5) of CDM 2015 requires that where a contractor identifies that work is being carried out that puts any person in danger, they must take appropriate steps to prevent further risk, including stopping that work if necessary. This is a proactive duty — contractors cannot simply ignore unsafe activities they observe.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Contractor stop-work duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 69,
    question: "Under Regulation 15(2), what must every contractor ensure before allowing a worker to carry out construction work?",
    options: [
      "That the worker has a CSCS card",
      "That the worker holds a relevant NVQ qualification",
      "That the worker has appropriate supervision, instructions and information to carry out the work safely",
      "That the worker has at least 6 months' experience"
    ],
    correctAnswer: 2,
    explanation: "Regulation 15(2) of CDM 2015 requires every contractor to provide each worker under their control with appropriate supervision, instructions and information so that construction work can be carried out, so far as is reasonably practicable, without risks to the health and safety of any person. CDM does not mandate CSCS cards — it is the provision of adequate information, instruction, training and supervision that matters.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Contractor supervision duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 70,
    question: "Under CDM 2015 Regulation 9(3)(b), what must a designer provide with their design to assist other duty holders?",
    options: [
      "A full method statement for construction",
      "Information about risks that have not been eliminated and the design principles or assumptions behind the design",
      "A complete risk assessment approved by the HSE",
      "A detailed programme of construction work"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9(3)(b) requires designers to provide sufficient information about the design, its construction or maintenance to adequately assist clients, other designers and contractors to comply with their CDM duties. This includes information about significant risks that could not be eliminated through design, the principles behind the design, and any assumptions that affect health and safety during construction, use or maintenance.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Designer information provision",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 71,
    question: "Under Regulation 13(1), the principal contractor must consult and engage with workers and their representatives. Which specific mechanism does CDM 2015 require?",
    options: [
      "A formal trade union safety committee",
      "Weekly toolbox talks",
      "Arrangements that enable the principal contractor and workers to cooperate effectively in developing, promoting and checking health and safety measures",
      "An elected site safety representative from each trade"
    ],
    correctAnswer: 2,
    explanation: "Regulation 13(1) requires the principal contractor to make and maintain arrangements which will enable the principal contractor and workers engaged in construction work to cooperate effectively in developing, promoting and checking the effectiveness of measures to ensure the health, safety and welfare of the workers. CDM does not prescribe the specific mechanism — it could be toolbox talks, safety forums, notice boards or other appropriate methods.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PC worker engagement",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 72,
    question: "Under Regulation 15(8), what must a contractor not begin work on a construction site unless they have been provided with?",
    options: [
      "A written appointment letter from the client",
      "Access to the relevant parts of the construction phase plan",
      "A copy of the health and safety file",
      "Liability insurance certificates"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15(8) of CDM 2015 states that a contractor must not carry out construction work on a project unless satisfied that the principal contractor (or contractor for single-contractor projects) has drawn up a construction phase plan. In practice, each contractor needs access to the relevant parts of the construction phase plan that relate to their work so they can plan and execute their activities safely.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Contractor CPP access",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 73,
    question: "Under Regulation 13(3)(a), what must the principal contractor ensure regarding the boundary of a construction site?",
    options: [
      "That all boundaries are marked with red and white tape",
      "That a suitable perimeter fence is erected where reasonably practicable",
      "That the perimeter of the site or that part of the site on which construction work is carried out is identified by suitable signs and the site is so far as is reasonably practicable secured from unauthorised access",
      "That the site boundary is agreed with the local planning authority"
    ],
    correctAnswer: 2,
    explanation: "Regulation 13(3)(a) requires the principal contractor to ensure that the construction site, or any part of it where construction work is being carried out, is secured from unauthorised access so far as is reasonably practicable, and is identified by suitable signs. This is to protect members of the public and prevent unauthorised persons from entering areas where they may be at risk.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Site security duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 74,
    question: "If a design is changed during the construction phase, whose CDM duty is it to take account of health and safety implications of that change?",
    options: [
      "Only the principal designer's duty",
      "The designer who modifies the design — all designers have duties under Regulation 9 whenever they prepare or modify a design",
      "Only the principal contractor's duty",
      "It is the client's sole responsibility"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9 of CDM 2015, the duties on designers apply whenever a designer in the course of a business prepares or modifies a design. This applies throughout the project, including during the construction phase. Any designer who changes a design must consider the health and safety implications, apply the general principles of prevention, eliminate foreseeable risks so far as is reasonably practicable, and provide information about remaining risks.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Design changes during construction",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 75,
    question: "Regulation 15(9) requires every contractor to comply with which specific provisions?",
    options: [
      "The Building Regulations 2010",
      "The directions of the principal designer and relevant requirements of the construction phase plan",
      "The directions of the client's health and safety adviser",
      "The CDM ACoP recommendations only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15(9) of CDM 2015 requires every contractor to comply with the directions given by the principal designer or the principal contractor, and with the relevant parts of the construction phase plan. This chain of command ensures that the coordination and management arrangements put in place by the principal designer and principal contractor are actually followed by all contractors on site.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Contractor compliance with directions",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 76,
    question: "Under CDM 2015, an electrician who decides the route for cable containment through a building is acting as which type of duty holder when making that decision?",
    options: [
      "A contractor only",
      "A worker",
      "A designer — because choosing the cable route is a design decision that could affect health and safety",
      "They have no specific CDM role for this decision"
    ],
    correctAnswer: 2,
    explanation: "Under CDM 2015, 'design' includes specifications, drawings and details relating to the arrangement or layout of work. When an electrician decides the route for cable containment, they are making design decisions that could affect health and safety (for example, routing cables through a fire compartment wall or at height). At that point, they are acting as a designer and must comply with designer duties under Regulation 9.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Tradesperson as designer",
    category: "Duty Holders & Their Roles"
  },

  // advanced (4)
  {
    id: 77,
    question: "Under Regulation 5(3), if the client does not appoint a principal designer on a project with more than one contractor, who fulfils the principal designer duties?",
    options: [
      "The lead designer on the project",
      "The principal contractor",
      "The client must fulfil the principal designer's duties themselves",
      "No one — the duties do not apply until an appointment is made"
    ],
    correctAnswer: 2,
    explanation: "Regulation 5(4) of CDM 2015 states that where the client fails to appoint a principal designer or principal contractor as required, the client must fulfil those duties. This means an uninformed client who fails to make appointments does not escape the law — they inherit all the CDM duties of the roles they failed to appoint, which could leave them significantly exposed.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Client default PD duties",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 78,
    question: "Under CDM 2015, Regulation 10 applies to designers on projects involving only one contractor. What specific additional duty does it place on the contractor?",
    options: [
      "The contractor must appoint a CDM adviser",
      "The contractor must ensure a construction phase plan is drawn up before setting up a construction site",
      "The contractor must produce the health and safety file",
      "The contractor must notify the HSE"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15(4) (read with Regulation 10 for single-contractor projects) requires that where there is only one contractor, that contractor must ensure a construction phase plan is drawn up before the construction site is set up. On single-contractor projects there is no principal contractor, so this duty falls directly on the sole contractor.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Single-contractor CPP duty",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 79,
    question: "Under CDM 2015, Regulation 12(3) states the construction phase plan must be appropriate to the nature and size of the project and the risks involved. Which of the following does the Regulation specifically require it to set out?",
    options: [
      "A detailed cost analysis of health and safety measures",
      "The health and safety arrangements and site rules for the construction phase, and specific measures concerning work falling within Schedule 3",
      "A complete list of every possible risk on the project",
      "The names and addresses of all workers on the project"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12(3) requires the construction phase plan to set out the health and safety arrangements and site rules taking account of the industrial activities at the construction site, and where applicable, must include specific measures concerning work falling within Schedule 3. Schedule 3 lists particularly high-risk work activities (such as work at height, excavations near underground services, work with explosives, etc.).",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "CPP requirements and Schedule 3",
    category: "Duty Holders & Their Roles"
  },
  {
    id: 80,
    question: "Regulation 9(2) of CDM 2015 sets out a design hierarchy for managing risks. What is the correct order of this hierarchy?",
    options: [
      "Reduce risks → eliminate risks → provide information about remaining risks",
      "Eliminate foreseeable risks so far as is reasonably practicable → reduce risks that remain → provide information about remaining risks to assist other duty holders",
      "Assess risks → control risks → monitor risks",
      "Identify hazards → inform the client → let the client decide"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9(2) of CDM 2015 establishes the design risk hierarchy: first, a designer must eliminate foreseeable risks to the health or safety of any person so far as is reasonably practicable; where elimination is not possible, they must reduce or control those risks through design measures; and they must provide information about any significant remaining risks. This mirrors the general 'eliminate → reduce → control → inform' hierarchy used throughout health and safety management.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Design risk hierarchy",
    category: "Duty Holders & Their Roles"
  },

  // =======================================================================
  // CATEGORY 3 — Pre-Construction & Planning (part 1) — 20 questions (id 81–100)
  // =======================================================================

  // --- Questions 81–100: ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 81,
    question: "What does 'PCI' stand for in the context of CDM 2015?",
    options: [
      "Project Compliance Information",
      "Pre-Construction Information",
      "Principal Contractor Instructions",
      "Planning and Construction Index"
    ],
    correctAnswer: 1,
    explanation: "PCI stands for Pre-Construction Information. Under CDM 2015, pre-construction information is information about the project that is already known or can reasonably be obtained, and which the client must provide to designers and contractors so they can plan their work safely. It includes information about the site, existing structures, hazards, previous use, and any client requirements.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "PCI abbreviation",
    category: "Pre-Construction & Planning"
  },
  {
    id: 82,
    question: "Under CDM 2015, who has the primary duty to provide pre-construction information to designers and contractors?",
    options: [
      "The principal designer",
      "The principal contractor",
      "The client",
      "The HSE"
    ],
    correctAnswer: 2,
    explanation: "Regulation 4(4) of CDM 2015 places the duty on the client to provide pre-construction information as soon as is practicable to every designer and contractor appointed or being considered for appointment to the project. The principal designer then takes this information and coordinates it with other pre-construction information to produce a comprehensive PCI pack.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "PCI duty holder",
    category: "Pre-Construction & Planning"
  },
  {
    id: 83,
    question: "What is a Construction Phase Plan (CPP)?",
    options: [
      "A plan showing the construction programme and Gantt chart",
      "A document setting out the health and safety arrangements and site rules for the construction phase of a project",
      "A financial plan for the construction works",
      "An architectural plan showing the finished building"
    ],
    correctAnswer: 1,
    explanation: "The Construction Phase Plan (CPP) is a document that sets out the health and safety arrangements, site rules, and specific measures for managing risks during the construction phase. Under Regulation 12(1), the principal contractor (or sole contractor on single-contractor projects) must draw it up before the construction phase begins.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "CPP definition",
    category: "Pre-Construction & Planning"
  },
  {
    id: 84,
    question: "Under CDM 2015, what is the health and safety file?",
    options: [
      "A record of all accidents and incidents on the project",
      "A file containing information about the completed structure that will be needed for future construction work, including cleaning, maintenance, alteration or demolition",
      "The site diary maintained by the principal contractor",
      "A copy of all risk assessments and method statements used during the project"
    ],
    correctAnswer: 1,
    explanation: "The health and safety file is a document that contains information relating to the project which is likely to be needed during any subsequent construction work to the structure, including cleaning, maintenance, alteration, refurbishment or demolition. Under Regulation 11(5), the principal designer (or principal contractor after PD appointment ends) prepares and maintains it, and it is passed to the client at the end of the project.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "H&S file definition",
    category: "Pre-Construction & Planning"
  },
  {
    id: 85,
    question: "Under CDM 2015, when must the construction phase plan be in place?",
    options: [
      "Within the first week of construction",
      "Before the construction phase begins",
      "Before the project is notified to the HSE",
      "Within 28 days of the principal contractor's appointment"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12(1) of CDM 2015 requires the principal contractor (or contractor on single-contractor projects) to draw up a construction phase plan, or make arrangements for it to be drawn up, before the construction phase begins. Regulation 4(6) also requires the client to ensure that the construction phase does not start until a construction phase plan is in place.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "CPP timing",
    category: "Pre-Construction & Planning"
  },
  {
    id: 86,
    question: "At the end of a construction project, to whom must the health and safety file be handed over?",
    options: [
      "The HSE",
      "The principal designer",
      "The client",
      "The local building control authority"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 12(8) of CDM 2015, the principal contractor must pass the health and safety file to the client at the end of the project. If the principal designer's appointment continues to the end of the project, Regulation 11(6) requires the principal designer to pass it to the client. In either case, the client is the ultimate recipient and custodian of the file.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "H&S file handover",
    category: "Pre-Construction & Planning"
  },
  {
    id: 87,
    question: "Under CDM 2015, who is responsible for drawing up the construction phase plan on a project with more than one contractor?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "Each contractor for their own work"
    ],
    correctAnswer: 2,
    explanation: "Regulation 12(1) of CDM 2015 places the duty to draw up the construction phase plan (or make arrangements for it to be drawn up) on the principal contractor. On projects with only one contractor, Regulation 15(4) places this duty on that sole contractor. The client does not produce the CPP, but must ensure it is in place before the construction phase begins.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "CPP authorship",
    category: "Pre-Construction & Planning"
  },

  // intermediate (9)
  {
    id: 88,
    question: "Which of the following would typically be included in pre-construction information provided by the client?",
    options: [
      "The principal contractor's method statements",
      "Information about the existing site, including ground conditions, existing structures, hazardous substances (such as asbestos), and any relevant survey results",
      "The detailed construction programme",
      "The names of all workers who will be on site"
    ],
    correctAnswer: 1,
    explanation: "Pre-construction information under CDM 2015 should include details about the project such as the client's brief, existing site information (ground conditions, existing structures and services, contamination, hazardous substances such as asbestos), information from any previous health and safety file, and the client's requirements for health and safety. This information enables designers and contractors to plan their work safely.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PCI typical content",
    category: "Pre-Construction & Planning"
  },
  {
    id: 89,
    question: "Under CDM 2015, the construction phase plan must be 'proportionate to the risks involved'. What does this mean in practice?",
    options: [
      "The plan must be exactly 10 pages long for every project",
      "A small, simple project requires a simpler plan than a large, complex project with significant risks",
      "The plan only needs to cover the five highest risks on the project",
      "The plan is only needed if the HSE requests one"
    ],
    correctAnswer: 1,
    explanation: "The ACoP (L153) explains that the construction phase plan must be proportionate to the nature and size of the project and the risks involved. For a small, simple project, the plan may be a few pages covering the key arrangements. For a large, complex project involving multiple contractors and high-risk activities, a much more detailed plan will be needed. The focus should be on the specific risks and arrangements for that particular project.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CPP proportionality",
    category: "Pre-Construction & Planning"
  },
  {
    id: 90,
    question: "Which of the following is typically included in a construction phase plan?",
    options: [
      "A description of the project, management structure, site rules, arrangements for monitoring compliance, emergency procedures, and specific measures for high-risk activities",
      "Only the names and addresses of all contractors",
      "The financial budget for health and safety",
      "A copy of every contractor's insurance certificate"
    ],
    correctAnswer: 0,
    explanation: "The construction phase plan typically includes: a description of the project; the management structure and responsibilities; the health and safety aims for the project; site rules; arrangements for controlling significant site risks; the health and safety induction arrangements; welfare provision; arrangements for monitoring compliance; emergency procedures; and specific measures for activities listed in Schedule 3 (e.g. work at height, confined spaces, working near services).",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CPP typical content",
    category: "Pre-Construction & Planning"
  },
  {
    id: 91,
    question: "Under CDM 2015, what role does the principal designer play in relation to pre-construction information?",
    options: [
      "The principal designer has no role — the client handles all PCI",
      "The principal designer must plan, manage, monitor and coordinate the pre-construction phase, including ensuring PCI is compiled and provided to those who need it",
      "The principal designer must only check that the client has provided PCI",
      "The principal designer must submit PCI to the HSE"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 11(2), the principal designer must plan, manage, monitor and coordinate the pre-construction phase, including identifying, eliminating or controlling foreseeable risks. Regulation 11(4) specifically requires the principal designer to ensure that all designers are provided with pre-construction information relevant to their work. The PD takes the raw information from the client and ensures it is compiled, coordinated and distributed effectively.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PD role in PCI",
    category: "Pre-Construction & Planning"
  },
  {
    id: 92,
    question: "Under CDM 2015, the health and safety file must be kept available for inspection by which parties?",
    options: [
      "Only the HSE",
      "Anyone who may need it for future construction work on the structure, including future clients, designers and contractors",
      "Only the original principal designer",
      "Only licensed contractors"
    ],
    correctAnswer: 1,
    explanation: "Once the health and safety file is handed to the client, the client has a duty under Regulation 4(8) to keep it available for inspection by any person who may need it to comply with any legal requirement. This includes future designers, contractors, facilities managers, or any person carrying out future construction work (maintenance, refurbishment, demolition) on the structure.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "H&S file availability",
    category: "Pre-Construction & Planning"
  },
  {
    id: 93,
    question: "Under CDM 2015, must the construction phase plan be a 'living document' that is updated during the project?",
    options: [
      "No — once produced it is a fixed document",
      "Yes — Regulation 12(4) requires the construction phase plan to be reviewed, updated and revised as necessary throughout the project",
      "Only if the HSE requests an update",
      "Only at the halfway point of the project"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12(4) of CDM 2015 requires the principal contractor to ensure that the construction phase plan is appropriately reviewed, updated and revised from time to time so that it continues to be sufficient throughout the construction phase. As the project progresses, new risks may emerge, contractors may change, and the plan must be kept current and relevant.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CPP as living document",
    category: "Pre-Construction & Planning"
  },
  {
    id: 94,
    question: "Under Regulation 4(4), what specific timing is required for the provision of pre-construction information by the client?",
    options: [
      "At least 30 days before the construction phase begins",
      "As soon as is practicable to every designer and contractor appointed or being considered for appointment",
      "Within 14 days of the client appointing the principal designer",
      "Before the F10 notification is submitted"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(4) of CDM 2015 requires the client to provide pre-construction information 'as soon as is practicable' to every designer and contractor who has been, or is being considered for appointment. The emphasis on 'as soon as is practicable' means the client should not delay — early provision of information is critical to enabling safe planning and design.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PCI timing requirement",
    category: "Pre-Construction & Planning"
  },
  {
    id: 95,
    question: "Which of the following is an example of information that should be included in the health and safety file?",
    options: [
      "Copies of all workers' CSCS cards",
      "As-built drawings, details of residual hazards (such as asbestos locations), information about the structure's design, and details of utilities and services",
      "The original tender documents and contract sum",
      "Minutes of all site progress meetings"
    ],
    correctAnswer: 1,
    explanation: "The health and safety file should contain information needed for future construction work on the structure. This typically includes as-built drawings, information about the structure and its design (including loadings), details of materials used (especially hazardous materials such as asbestos), information about utilities and services, details of residual hazards, and any relevant maintenance procedures. It should not contain day-to-day project administration records.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "H&S file content",
    category: "Pre-Construction & Planning"
  },
  {
    id: 96,
    question: "Under CDM 2015, what must the client do with the health and safety file if the structure is sold or disposed of?",
    options: [
      "Destroy the file — it is no longer relevant",
      "Return the file to the principal designer",
      "Provide the file to the new owner or occupier to ensure it remains available",
      "Submit the file to the HSE"
    ],
    correctAnswer: 2,
    explanation: "Regulation 4(9) of CDM 2015 requires that if the client disposes of their interest in the structure, they must provide the health and safety file to the person who acquires the client's interest in the structure and must ensure that person is aware of the nature and purpose of the file. This ensures the file remains available for future construction work throughout the life of the structure.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "H&S file on disposal",
    category: "Pre-Construction & Planning"
  },

  // advanced (4)
  {
    id: 97,
    question: "Under CDM 2015, Schedule 3 lists work which is considered to involve particular risks. Which of the following is listed in Schedule 3?",
    options: [
      "All plumbing work",
      "Work near high-voltage power lines, work involving the risk of falling from a height, and work which puts workers at risk of burial under earthfalls",
      "All painting and decorating work",
      "All work carried out by apprentices"
    ],
    correctAnswer: 1,
    explanation: "Schedule 3 of CDM 2015 lists work involving particular risks that must be specifically addressed in the construction phase plan. It includes work with a risk of falling from height, work near high-voltage power lines, work involving risk of burial under earthfalls, work near water with risk of drowning, work involving the use of explosives, work involving the assembly or dismantling of heavy prefabricated components, and work in compressed air or diving.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Schedule 3 high-risk work",
    category: "Pre-Construction & Planning"
  },
  {
    id: 98,
    question: "Under CDM 2015, if a project involves multiple structures (for example, several new houses on a single development), how many health and safety files are required?",
    options: [
      "One single file for the entire development",
      "It depends — a separate file may be appropriate for each structure if the structures will have different owners, but a single file may suffice for a single development retained by one owner",
      "A file is only needed for the largest structure",
      "No file is required for housing developments of fewer than 10 units"
    ],
    correctAnswer: 1,
    explanation: "The ACoP (L153) advises that the number of health and safety files should be determined by the nature of the project. Where multiple structures will be sold to different owners, it is appropriate to have a separate file for each structure so it can be passed to the relevant new owner. Where the development is retained by one client, a single comprehensive file may be more practical. The key principle is that the file must be available to whoever needs it for future construction work.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Multiple H&S files",
    category: "Pre-Construction & Planning"
  },
  {
    id: 99,
    question: "Under Regulation 12(2), the principal contractor must arrange for the construction phase plan to take account of which specific information provided by the principal designer?",
    options: [
      "The principal designer's fee proposal",
      "The pre-construction information obtained under Regulation 4(4) and any information obtained from designers under Regulation 9(3)",
      "The principal designer's design risk assessment template",
      "The principal designer's professional indemnity insurance details"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12(2) of CDM 2015 requires the construction phase plan to take account of the pre-construction information provided under Regulation 4(4) and any information obtained from designers under Regulation 9(3). This ensures the CPP is informed by the pre-construction information gathered by the client and PD, and by the design risk information provided by all designers on the project.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "CPP information sources",
    category: "Pre-Construction & Planning"
  },
  {
    id: 100,
    question: "Under CDM 2015, what is the legal consequence of the client failing to provide adequate pre-construction information in accordance with Regulation 4(4)?",
    options: [
      "There is no legal consequence — PCI is advisory only",
      "The client is in breach of Regulation 4(4) and may be prosecuted by the HSE; additionally, designers and contractors may be unable to plan their work safely, leading to further foreseeable risks",
      "Only the principal designer can be prosecuted for PCI failings",
      "The project is automatically classified as non-compliant but no enforcement action can be taken"
    ],
    correctAnswer: 1,
    explanation: "Failure to provide pre-construction information as required by Regulation 4(4) is a breach of CDM 2015 by the client. The HSE can issue enforcement notices or prosecute the client for this failure. Beyond prosecution, inadequate PCI can have serious practical consequences: designers cannot properly assess risks in their designs, contractors cannot adequately plan construction work, and the overall health and safety of the project is compromised from the outset.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "PCI non-compliance consequences",
    category: "Pre-Construction & Planning"
  },

  {
    id: 101,
    question: "What is the primary purpose of the health and safety file under CDM 2015?",
    options: [
      "To record accident statistics during the construction phase",
      "To provide information needed for future construction work, maintenance, repair, or demolition",
      "To act as a legal contract between the client and principal designer",
      "To store copies of all method statements used on the project"
    ],
    correctAnswer: 1,
    explanation: "The health and safety file is a repository of information that will be needed to ensure health and safety during any subsequent work on the structure, including maintenance, cleaning, refurbishment, and demolition. It is prepared by the principal designer under Regulation 12(5).",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Health and safety file purpose",
    category: "Pre-Construction & Planning"
  },
  {
    id: 102,
    question: "Who is responsible for preparing the health and safety file under CDM 2015?",
    options: [
      "The client",
      "The principal contractor",
      "The principal designer",
      "The HSE inspector"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 12(5), the principal designer must prepare, review, update, and revise the health and safety file. This responsibility may pass to the principal contractor if the principal designer's appointment ends before the project is complete.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "H&S file responsibility",
    category: "Pre-Construction & Planning"
  },
  {
    id: 103,
    question: "An F10 notification must be sent to the HSE before construction work begins on notifiable projects. What is the minimum notice period?",
    options: [
      "7 days",
      "14 days",
      "28 days",
      "As soon as practicable before the construction phase begins"
    ],
    correctAnswer: 3,
    explanation: "Under Regulation 6, the client must give notice to the HSE as soon as is practicable before the construction phase begins. There is no fixed number of days; the requirement is to notify as soon as practicable before construction starts.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "F10 notification timing",
    category: "Pre-Construction & Planning"
  },
  {
    id: 104,
    question: "Where must the F10 notification be displayed on a construction site?",
    options: [
      "In the site manager's office only",
      "In a conspicuous position on the site accessible to any worker",
      "On the client's premises",
      "It does not need to be displayed; it only needs to be sent to the HSE"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 6(4), the notice (or a copy of it) must be displayed in a readable condition in a position where it can be read by any worker engaged in the construction work. This ensures all workers are aware the project has been notified.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Displaying F10 notification",
    category: "Pre-Construction & Planning"
  },
  {
    id: 105,
    question: "To whom must the completed health and safety file be handed over at the end of a project?",
    options: [
      "The HSE",
      "The local authority building control department",
      "The client",
      "The principal contractor"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 12(10), the principal designer (or principal contractor if the PD role has ended) must pass the health and safety file to the client at the end of the project. The client must then keep it available for anyone who needs it for future work.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "File handover to client",
    category: "Pre-Construction & Planning"
  },
  {
    id: 106,
    question: "Which of the following is a notifiable project under CDM 2015?",
    options: [
      "Any project that involves more than 3 workers at any point",
      "Any project lasting longer than 30 working days and having more than 20 workers working simultaneously at any point, or exceeding 500 person days",
      "Any project with a contract value over £250,000",
      "Any domestic project involving structural alterations"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 6, a project is notifiable if the construction work is scheduled to last longer than 30 working days and have more than 20 workers working simultaneously at any point, or exceed 500 person days of construction work.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Notifiable project thresholds",
    category: "Pre-Construction & Planning"
  },
  {
    id: 107,
    question: "What must the client do with the health and safety file once it has been handed over?",
    options: [
      "Submit it to the HSE within 28 days",
      "Destroy it after 5 years",
      "Keep it available for inspection by anyone who may need it for future construction work on the structure",
      "Archive it with the local authority planning department"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 4(7), the client must ensure the health and safety file is appropriately revised from time to time and made available for inspection by anyone who may need it to comply with any legal requirement relating to future construction work on the structure.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Client duty — retaining H&S file",
    category: "Pre-Construction & Planning"
  },

  // --- intermediate (9) ---
  {
    id: 108,
    question: "Which of the following types of information should be included in the health and safety file?",
    options: [
      "Copies of all payroll records for workers on the project",
      "Details of the structure's design, construction, materials used, and residual hazards",
      "The client's financial budget for the project",
      "Records of all toolbox talks delivered during the project"
    ],
    correctAnswer: 1,
    explanation: "The health and safety file should contain information about residual risks, key structural principles, details of materials used (especially hidden services and hazardous materials), and other information useful for future maintenance, repair, renovation, or demolition.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "H&S file content",
    category: "Pre-Construction & Planning"
  },
  {
    id: 109,
    question: "If the principal designer's appointment finishes before the end of the project, what happens to the duty to prepare and update the health and safety file?",
    options: [
      "The duty lapses and no one is responsible",
      "The client must take over the duty personally",
      "The principal contractor must take over the duty",
      "The HSE appoints a replacement to complete the file"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 12(6), if the principal designer's appointment finishes before the end of the project, the principal contractor must take on the duty to prepare, review, update, and revise the health and safety file for the remainder of the project.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PD appointment ending early",
    category: "Pre-Construction & Planning"
  },
  {
    id: 110,
    question: "When preparing the health and safety file, the principal designer must ensure it contains information relating to the project that is likely to be needed during any subsequent work. Which of the following is NOT typically included?",
    options: [
      "As-built drawings showing the location of hidden services",
      "Details of hazardous materials used in the structure",
      "Names and addresses of all sub-contractors who worked on the project",
      "Information about the removal or dismantling of specialist installations"
    ],
    correctAnswer: 2,
    explanation: "The health and safety file focuses on residual risks and information needed for safe future work — as-built drawings, hazardous materials, and specialist installation details are relevant. A list of sub-contractor names and addresses is not relevant to managing future health and safety risks.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "H&S file — what to exclude",
    category: "Pre-Construction & Planning"
  },
  {
    id: 111,
    question: "The F10 notification form requires certain details to be provided. Which of the following must be included?",
    options: [
      "Estimated total project cost and profit margin",
      "The names of the client, principal designer, and principal contractor, plus the address of the site and a brief description of the work",
      "A full copy of the construction phase plan",
      "Evidence that all workers have valid CSCS cards"
    ],
    correctAnswer: 1,
    explanation: "The F10 notification must include details such as the date of forwarding, the address of the construction site, the name and address of the client, principal designer, and principal contractor, a brief description of the project, the planned start date and duration, and the estimated maximum number of workers.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "F10 content requirements",
    category: "Pre-Construction & Planning"
  },
  {
    id: 112,
    question: "Under CDM 2015, what must happen if there is a significant change to the project after the F10 has been submitted?",
    options: [
      "A completely new F10 must be submitted",
      "The original F10 should be updated and the HSE notified of the changes as soon as practicable",
      "No further action is needed once the original F10 is filed",
      "The principal contractor must telephone the HSE to report the change verbally"
    ],
    correctAnswer: 1,
    explanation: "If there are changes to the information provided in the original notification, such as a change in principal contractor or principal designer, the client must update the notification and inform the HSE as soon as practicable.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Updating F10 notification",
    category: "Pre-Construction & Planning"
  },
  {
    id: 113,
    question: "Which of the following best describes the role of the principal designer in relation to pre-construction information?",
    options: [
      "They must produce all pre-construction information from scratch without client input",
      "They must assist the client in providing pre-construction information and ensure it is provided to every designer and contractor",
      "They need only provide pre-construction information to the principal contractor",
      "They are responsible for keeping pre-construction information confidential from designers"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 12, the principal designer must assist the client in the provision of pre-construction information and ensure it is provided in a convenient form to every designer and contractor appointed or being considered for appointment. This ensures all duty holders can plan and manage their work safely.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PD role — pre-construction information",
    category: "Pre-Construction & Planning"
  },
  {
    id: 114,
    question: "A project involves demolishing an existing building and constructing a new one. Which document must the client ensure exists before the construction phase of the new build can begin?",
    options: [
      "A completed health and safety file from the demolition phase",
      "A construction phase plan for the new build project",
      "An environmental impact assessment",
      "A structural survey of the neighbouring buildings"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 4(5)(b), the client must ensure that a construction phase plan is drawn up before the construction phase begins. This is a fundamental duty — no construction work should commence without an adequate construction phase plan in place.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CPP before construction begins",
    category: "Pre-Construction & Planning"
  },
  {
    id: 115,
    question: "The health and safety file should be proportionate to the complexity of the project. For a straightforward domestic extension, what approach is most appropriate?",
    options: [
      "The file is not required for domestic projects",
      "A simple file containing as-built drawings, details of hidden services, and any residual hazards",
      "A full file identical in scope to that required for a major commercial development",
      "A verbal briefing to the homeowner is sufficient"
    ],
    correctAnswer: 1,
    explanation: "The health and safety file must be proportionate to the risks involved. For a simple domestic extension, a concise file covering as-built drawings, locations of hidden services, and any residual hazards would be appropriate. It need not be as extensive as for a major project, but must still be prepared.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Proportionate H&S file",
    category: "Pre-Construction & Planning"
  },
  {
    id: 116,
    question: "Under CDM 2015, what is the correct way to submit an F10 notification to the HSE?",
    options: [
      "By registered post only",
      "Electronically via the HSE website or by post",
      "By hand delivery to the local HSE office",
      "By email to a dedicated HSE notification address"
    ],
    correctAnswer: 1,
    explanation: "The F10 notification can be submitted electronically through the HSE website, which is the most common method, or it can be sent by post. Electronic submission is encouraged as it is faster and provides confirmation of receipt.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "F10 submission method",
    category: "Pre-Construction & Planning"
  },

  // --- advanced (4) ---
  {
    id: 117,
    question: "A principal designer is preparing the health and safety file for a complex refurbishment of a listed building. The building contains asbestos-containing materials, concealed structural steelwork, and a legacy heating system using unusual pipework. Which approach best meets CDM 2015 requirements?",
    options: [
      "Include only the asbestos survey as it is the most dangerous hazard",
      "Compile a proportionate file including the asbestos management survey/R&D survey data, as-built structural drawings showing concealed steelwork, details of the unusual pipework and heating system, and a register of residual risks",
      "Defer preparation of the file until the project is complete to avoid premature information",
      "Delegate the entire file preparation to the principal contractor since they are on site"
    ],
    correctAnswer: 1,
    explanation: "The H&S file must capture all information relevant to future health and safety on the structure. For a complex refurbishment of a listed building, this means including asbestos data, concealed structural elements, unusual building services, and a register of residual risks. The file should be built progressively throughout the project, not deferred.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Complex H&S file preparation",
    category: "Pre-Construction & Planning"
  },
  {
    id: 118,
    question: "A client sells a property after construction is complete. What is the legal position regarding the health and safety file?",
    options: [
      "The file becomes void once the property is sold",
      "The client must pass the health and safety file to the new owner and ensure it remains available for future construction work",
      "The HSE retains a master copy so the new owner can request it",
      "The principal designer is required to provide a new copy to the new owner"
    ],
    correctAnswer: 1,
    explanation: "If the structure is sold or transferred, Regulation 4(7) requires the client to pass the health and safety file to the new owner. The file must remain available for inspection by anyone who needs it in connection with future construction work on the structure.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "H&S file transfer on sale",
    category: "Pre-Construction & Planning"
  },
  {
    id: 119,
    question: "A project originally estimated at 400 person days increases to 600 person days due to scope changes. The project was not initially notifiable. What action is required?",
    options: [
      "No action is needed because the project was not notifiable at the outset",
      "The client must now notify the HSE by submitting an F10 as the project has become notifiable, and appoint a principal designer and principal contractor if not already done",
      "The principal contractor must notify the HSE and retrospectively appoint a principal designer",
      "The project can continue without notification provided the original scope document is amended"
    ],
    correctAnswer: 1,
    explanation: "If a project becomes notifiable due to changes in scope or duration, the client must comply with the notification requirements of Regulation 6. They must submit an F10 and, if not already in place, appoint a principal designer and principal contractor as required by Regulations 5(1)(a) and 5(1)(b).",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Project becoming notifiable",
    category: "Pre-Construction & Planning"
  },
  {
    id: 120,
    question: "On a large-scale infrastructure project, the principal designer's contract ends six months before practical completion. The principal contractor takes over the H&S file duties. Which of the following represents best practice for managing this transition?",
    options: [
      "The principal contractor starts a new file from scratch",
      "The principal designer hands over the partially complete file and all source information, and the principal contractor continues to develop it, ensuring continuity and no loss of information",
      "The client should hold the file themselves until the project ends",
      "The transition does not need to be documented as long as the file is complete at the end"
    ],
    correctAnswer: 1,
    explanation: "When the principal designer's appointment ends before the project is complete, best practice under Regulation 12(6) is a formal handover of the partially complete file and all supporting information. The principal contractor then continues to develop and update the file, maintaining continuity. This handover should be documented to provide an audit trail.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "H&S file handover mid-project",
    category: "Pre-Construction & Planning"
  },

  // =======================================================================
  // SECTION 5 — Design & Risk Management — 40 questions (121–160)
  // =======================================================================

  // --- basic (7) ---
  {
    id: 121,
    question: "Under CDM 2015 Regulation 9, what is the primary duty of a designer?",
    options: [
      "To produce the cheapest possible design",
      "To ensure the design does not give rise to foreseeable risks to health and safety, and to eliminate hazards where reasonably practicable",
      "To guarantee the building will never need maintenance",
      "To produce detailed method statements for construction workers"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9 requires designers, when preparing or modifying a design, to take into account the general principles of prevention and any pre-construction information. They must eliminate, so far as is reasonably practicable, foreseeable risks to the health or safety of any person carrying out or affected by construction work.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Designer duties Reg 9",
    category: "Design & Risk Management"
  },
  {
    id: 122,
    question: "What is the correct hierarchy of risk control that designers must follow under CDM 2015?",
    options: [
      "Inform, reduce, eliminate",
      "Eliminate, reduce, inform",
      "Reduce, eliminate, inform",
      "Inform, eliminate, reduce"
    ],
    correctAnswer: 1,
    explanation: "Designers must follow the hierarchy: first eliminate the hazard through design; if that is not reasonably practicable, reduce the risk; and if a residual risk remains, inform those who need to know about it. This eliminate-reduce-inform hierarchy is fundamental to CDM 2015.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Eliminate/reduce/inform hierarchy",
    category: "Design & Risk Management"
  },
  {
    id: 123,
    question: "What does 'SFARP' stand for in the context of CDM risk management?",
    options: [
      "Safety First And Reduced Planning",
      "So Far As Reasonably Practicable",
      "Standard Framework for Assessing Risk Potential",
      "Sequential Framework for Addressing Risk Prevention"
    ],
    correctAnswer: 1,
    explanation: "SFARP stands for 'So Far As Reasonably Practicable'. It is the legal standard applied throughout CDM 2015, meaning duty holders must weigh the risk against the cost, time, and effort of measures to reduce it. If the cost is grossly disproportionate to the risk, the measure need not be implemented.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "SFARP definition",
    category: "Design & Risk Management"
  },
  {
    id: 124,
    question: "Schedule 1 of CDM 2015 sets out the general principles of prevention. Which of the following is the first principle?",
    options: [
      "Giving collective protective measures priority over individual measures",
      "Avoiding risks",
      "Adapting the work to the individual",
      "Developing a coherent overall prevention policy"
    ],
    correctAnswer: 1,
    explanation: "The first general principle of prevention listed in Schedule 1 of CDM 2015 is 'avoiding risks'. This aligns with the hierarchy of control — the best approach is to avoid or eliminate the risk entirely before considering other measures.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "General principles of prevention",
    category: "Design & Risk Management"
  },
  {
    id: 125,
    question: "Under CDM 2015, who qualifies as a 'designer'?",
    options: [
      "Only architects registered with the ARB",
      "Only chartered engineers",
      "Any person who prepares or modifies a design, or arranges for or instructs someone else to do so, in relation to a structure",
      "Only the principal designer appointed by the client"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 2(1), a designer is anyone who prepares or modifies a design, or arranges for or instructs any person under their control to do so, in relation to a structure or part of a structure. This can include architects, engineers, building services designers, interior designers, and even tradespeople who design elements of the work.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Designer definition under CDM",
    category: "Design & Risk Management"
  },
  {
    id: 126,
    question: "What is a design risk register?",
    options: [
      "A register of all construction companies involved in the project",
      "A document that records identified hazards associated with a design, the risk level, and the measures taken to eliminate or reduce those risks",
      "A list of all materials to be used in the construction project",
      "A financial register of the costs associated with risk insurance"
    ],
    correctAnswer: 1,
    explanation: "A design risk register is a tool used by designers to record the hazards identified in a design, assess the level of risk, and document what steps have been taken to eliminate or reduce those risks. It demonstrates compliance with Regulation 9 and communicates residual risks to others.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Design risk registers",
    category: "Design & Risk Management"
  },
  {
    id: 127,
    question: "Under CDM 2015 Regulation 8, what does the duty of cooperation require?",
    options: [
      "All duty holders must work together and cooperate with each other to ensure health and safety",
      "Only the client and principal contractor need to cooperate",
      "Cooperation is optional but recommended",
      "Duty holders must cooperate only when the HSE requests it"
    ],
    correctAnswer: 0,
    explanation: "Regulation 8 requires all persons working on a project who have a duty under CDM 2015 to cooperate with each other, and with any other person working on or in connection with the project at the same or an adjoining site, so far as is necessary to enable any person with a duty to fulfil that duty.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Cooperation duty Reg 8",
    category: "Design & Risk Management"
  },

  // --- intermediate (9) ---
  {
    id: 128,
    question: "A structural engineer designs a roof with a complex geometry that would require workers to operate near an unprotected edge during construction. Under CDM 2015, what should the engineer do first?",
    options: [
      "Specify edge protection in the design drawings",
      "Consider whether the design can be modified to eliminate or reduce the need for workers to be near unprotected edges",
      "Include a note on the drawings warning workers of the danger",
      "Leave the risk for the principal contractor to manage during construction"
    ],
    correctAnswer: 1,
    explanation: "Under the eliminate-reduce-inform hierarchy of Regulation 9, the designer must first consider whether the design can be changed to eliminate the hazard. For example, could the roof geometry be simplified, or could permanent edge protection be designed in? Only if elimination is not reasonably practicable should the designer move to reduction and then information.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Designer duty — eliminate first",
    category: "Design & Risk Management"
  },
  {
    id: 129,
    question: "Which of the following best describes the concept of 'buildability' in the context of CDM 2015?",
    options: [
      "The speed at which a structure can be completed",
      "The extent to which a design facilitates safe and efficient construction, minimising foreseeable risks to workers during the build process",
      "The ability of a building to withstand extreme weather",
      "The cost-effectiveness of the construction methods specified"
    ],
    correctAnswer: 1,
    explanation: "Buildability, in CDM terms, refers to how well a design considers the practical aspects of construction, particularly the health and safety of those who will build it. A design with good buildability is one where the designer has considered how the structure will actually be erected and has minimised foreseeable risks to workers.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Buildability",
    category: "Design & Risk Management"
  },
  {
    id: 130,
    question: "A designer specifies a heavy precast concrete cladding panel system. What CDM-related consideration should influence the choice of fixing method?",
    options: [
      "The aesthetic appearance of the fixings",
      "The ease and safety with which panels can be installed, including manual handling risks and the need for lifting equipment",
      "The manufacturer's marketing preferences",
      "The colour of the fixings"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9, the designer must consider the risks associated with construction. Heavy precast panels present manual handling, lifting, and working-at-height risks. The fixing method should be chosen to minimise these risks — for example, using mechanical fixings that can be installed from a safe position rather than requiring workers to lean over edges.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Design for safe installation",
    category: "Design & Risk Management"
  },
  {
    id: 131,
    question: "What does 'maintainability' mean in the context of CDM design duties?",
    options: [
      "The ability of the contractor to maintain their profit margin",
      "The extent to which a design allows the structure to be safely maintained, cleaned, and repaired throughout its life",
      "The frequency of planned maintenance inspections",
      "The availability of spare parts for building systems"
    ],
    correctAnswer: 1,
    explanation: "Maintainability requires designers to consider the health and safety of those who will maintain, clean, and repair the structure after construction. Under Regulation 9, designers must consider foreseeable risks not just during construction but during the structure's entire lifespan, including maintenance activities.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Maintainability",
    category: "Design & Risk Management"
  },
  {
    id: 132,
    question: "Modern Methods of Construction (MMC) such as off-site prefabrication can contribute to CDM compliance. Which of the following is a primary health and safety benefit?",
    options: [
      "They always cost less than traditional methods",
      "They reduce the amount of work at height and on-site hazardous activities by moving work to a controlled factory environment",
      "They eliminate the need for designers to consider health and safety",
      "They remove the requirement for a construction phase plan"
    ],
    correctAnswer: 1,
    explanation: "Off-site prefabrication and other MMC techniques reduce the volume of on-site work, particularly hazardous activities such as working at height, hot works, and manual handling. Manufacturing in a controlled factory environment is inherently safer than on a construction site, making MMC a valuable tool for CDM risk reduction.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "MMC and CDM",
    category: "Design & Risk Management"
  },
  {
    id: 133,
    question: "Under CDM 2015, when must a designer provide information about residual risks in their design?",
    options: [
      "Only if the client requests it",
      "Only after an accident has occurred",
      "When hazards cannot be eliminated or sufficiently reduced through design — the designer must provide information about remaining risks to those who need it",
      "Residual risk information is only needed for notifiable projects"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 9(3)(b), where it is not possible to eliminate or sufficiently reduce a risk through design, the designer must take all reasonable steps to provide sufficient information about each risk to every person who needs it. This forms the third tier of the eliminate-reduce-inform hierarchy.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Informing about residual risks",
    category: "Design & Risk Management"
  },
  {
    id: 134,
    question: "A designer is coordinating with other designers on a multi-disciplinary project. Under CDM 2015, what is the role of the principal designer in this coordination?",
    options: [
      "The principal designer has no coordination role — each designer works independently",
      "The principal designer must plan, manage, and monitor the pre-construction phase and coordinate matters relating to health and safety to ensure designers comply with their duties",
      "The principal designer only coordinates during the construction phase",
      "The principal designer delegates all coordination to the principal contractor"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 11, the principal designer must plan, manage, and monitor the pre-construction phase and coordinate matters relating to health and safety during the pre-construction phase. This includes ensuring cooperation between designers and that they comply with their duties under Regulation 9.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "PD coordination of designers",
    category: "Design & Risk Management"
  },
  {
    id: 135,
    question: "Schedule 1 of CDM 2015 includes the principle of 'combating risks at source'. What does this mean in a design context?",
    options: [
      "Adding more personal protective equipment for workers",
      "Addressing the hazard at its origin through design changes rather than relying on downstream measures",
      "Reporting the risk to the HSE at the earliest opportunity",
      "Increasing the frequency of safety inspections"
    ],
    correctAnswer: 1,
    explanation: "Combating risks at source means tackling the hazard at its origin. In design terms, this means changing the design itself to remove or reduce the hazard, rather than relying on protective measures during construction or maintenance. For example, designing in permanent access for maintenance rather than relying on temporary scaffolding.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Combating risks at source",
    category: "Design & Risk Management"
  },
  {
    id: 136,
    question: "An architect designs a glass atrium roof. Under CDM 2015, which of the following should the architect consider?",
    options: [
      "Only the visual impact of the glass",
      "How the glass will be safely installed, how it will be cleaned and maintained, and how it could be safely replaced in the future",
      "Only the thermal performance of the glazing",
      "Only the structural loading of the glass panels"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9, the designer must consider foreseeable risks throughout the life of the structure. For a glass atrium roof, this includes risks during installation (working at height, handling heavy glass panels), maintenance (safe access for cleaning), and future replacement. The design should incorporate safe access solutions for all these activities.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Whole-life design considerations",
    category: "Design & Risk Management"
  },

  // --- advanced (4) ---
  {
    id: 137,
    question: "A building services engineer is designing a mechanical ventilation system. The ductwork route passes through a confined space that will be extremely difficult to access for future maintenance. Applying the CDM 2015 hierarchy, which is the best course of action?",
    options: [
      "Specify maintenance procedures that require confined space entry with full rescue provisions",
      "Redesign the ductwork route to avoid the confined space entirely, or if that is not reasonably practicable, redesign to minimise the need for entry and provide information about the residual confined space risk",
      "Add a warning label at the confined space entrance",
      "Leave the routing decision to the installing contractor"
    ],
    correctAnswer: 1,
    explanation: "Following the CDM hierarchy, the designer must first try to eliminate the risk by rerouting the ductwork to avoid the confined space. If this is not reasonably practicable, the design should reduce the need for confined space entry (e.g., external access panels, remotely accessible inspection points). Any residual risk must be communicated to future maintainers via the health and safety file.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Design hierarchy — confined spaces",
    category: "Design & Risk Management"
  },
  {
    id: 138,
    question: "Two designers on a project have conflicting design solutions that each introduce different risks. The structural engineer wants to use in-situ concrete (requiring formwork at height), while the architect prefers a steel frame (requiring extensive hot works). Under CDM 2015, how should this conflict be resolved?",
    options: [
      "The most senior designer decides",
      "The principal designer should coordinate the designers to compare the risks of each approach, apply the general principles of prevention, and agree on the solution that best manages overall risk",
      "The client should decide based on cost alone",
      "Both designs should be implemented simultaneously in different sections"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 11, the principal designer must coordinate health and safety matters during the pre-construction phase. When design solutions conflict, the PD should facilitate a risk comparison using the general principles of prevention in Schedule 1, considering the overall risk profile rather than allowing each designer to work in isolation.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Design conflict resolution",
    category: "Design & Risk Management"
  },
  {
    id: 139,
    question: "A designer is applying the SFARP test to determine whether an alternative design is required. The original design presents a moderate risk of musculoskeletal injury to workers, while the alternative design eliminates this risk but costs 15% more. What is the correct legal position?",
    options: [
      "The cheaper option should always be chosen to keep the project within budget",
      "A 15% cost increase is always disproportionate and therefore the original design is acceptable",
      "The designer must adopt the safer alternative unless the cost is grossly disproportionate to the risk reduction achieved — a 15% cost increase for eliminating a moderate risk is unlikely to be grossly disproportionate",
      "The decision rests entirely with the client and the designer has no further duty"
    ],
    correctAnswer: 2,
    explanation: "The SFARP test requires the risk to be reduced unless the cost is grossly disproportionate to the benefit gained. For a moderate risk of musculoskeletal injury, a 15% cost increase to eliminate the risk entirely is unlikely to be considered grossly disproportionate. The legal test sets a high bar — 'grossly disproportionate' is more than simply 'more expensive'.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "SFARP cost-benefit analysis",
    category: "Design & Risk Management"
  },
  {
    id: 140,
    question: "A design review reveals that a proposed curtain wall system requires workers to lean out from the building to install external brackets at the 15th floor. The designer argues that a safety harness specification is sufficient. Under CDM 2015, is this approach acceptable?",
    options: [
      "Yes, specifying PPE is an acceptable design measure",
      "No — the designer has jumped to the bottom of the hierarchy by specifying PPE without first considering whether the design could eliminate or reduce the risk, such as using brackets that can be installed from inside the building or using prefabricated unitised panels",
      "Yes, provided the harness meets BS EN 361",
      "No, because curtain walls cannot be safely installed above the 10th floor"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9 and the general principles of prevention, specifying PPE (personal protective equipment) is the last resort, not the first option. The designer must first consider whether the design can be changed to eliminate the hazard — for example, brackets that install from inside, or unitised curtain wall systems that reduce external work. Only if these options are not reasonably practicable should protective measures be considered.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Design hierarchy — PPE as last resort",
    category: "Design & Risk Management"
  },
  {
    id: 141,
    question: "When a designer provides information about residual risks under Regulation 9(3)(b), in what format should this information be communicated?",
    options: [
      "It must always be in the form of a CDM designer's risk assessment template",
      "There is no prescribed format — the information must be proportionate, project-specific, and presented in a way that is clear and helpful to those who need it",
      "It must be submitted on an official HSE form",
      "It should be provided only verbally during design team meetings"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 does not prescribe a specific format for communicating residual design risks. The information must be proportionate to the risks, project-specific, and in a form that is clear and useful to those who need it — typically contractors and future maintainers. Overly generic or excessively bureaucratic risk information does not comply with the spirit of the Regulations.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Communicating residual risk information",
    category: "Design & Risk Management"
  },
  {
    id: 142,
    question: "A designer specifies a green roof system. Which CDM-related risks should be considered?",
    options: [
      "Only the weight of the growing medium on the roof structure",
      "Risks during installation (working at height, manual handling of soil and materials), risks during maintenance (safe access for planting, irrigation system servicing), and risks during any future removal or replacement",
      "Only the risk of plant roots damaging the waterproof membrane",
      "Only the aesthetic impact on the surrounding area"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9, the designer must consider foreseeable risks throughout the structure's life. For a green roof, this includes construction risks (working at height, heavy materials), maintenance risks (safe access for gardening, irrigation servicing), and end-of-life risks (future removal or replacement of the system).",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Green roof design risks",
    category: "Design & Risk Management"
  },
  {
    id: 143,
    question: "Under Schedule 1 of CDM 2015, which principle requires that technological progress be taken into account when managing risks?",
    options: [
      "Avoiding risks",
      "Adapting to technical progress",
      "Giving appropriate instructions to employees",
      "Combating risks at source"
    ],
    correctAnswer: 1,
    explanation: "Schedule 1 includes the principle of 'adapting to technical progress'. This means duty holders, including designers, should keep up to date with advances in technology, materials, and methods that could reduce risks. A design that ignores available safer alternatives may not comply with CDM 2015.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Adapting to technical progress",
    category: "Design & Risk Management"
  },
  {
    id: 144,
    question: "A designer is considering whether to specify a bolted steel connection or a welded connection for a structural joint. From a CDM perspective, which factor is most relevant?",
    options: [
      "The colour of the finished connection",
      "The comparative health and safety risks of each method — bolted connections avoid hot works and associated fire and fume risks, while welded connections may require additional fire precautions and ventilation",
      "The personal preference of the fabricator",
      "The historical convention used on previous projects by the same designer"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9, the designer must consider the foreseeable risks of construction. Bolted connections generally present fewer health and safety risks than welded connections (no hot works, no welding fumes, reduced fire risk). While there may be valid structural reasons for choosing welding, the CDM risk comparison should be part of the decision-making process.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Connection type — risk comparison",
    category: "Design & Risk Management"
  },
  {
    id: 145,
    question: "What is the purpose of a designer's risk assessment under CDM 2015?",
    options: [
      "To transfer liability from the designer to the contractor",
      "To systematically identify hazards in the design, evaluate the associated risks, and record the measures taken to eliminate, reduce, or communicate those risks",
      "To satisfy planning permission requirements",
      "To calculate the insurance premium for the project"
    ],
    correctAnswer: 1,
    explanation: "A designer's risk assessment is a systematic process for identifying hazards inherent in the design, evaluating the risks they present, and documenting the actions taken following the eliminate-reduce-inform hierarchy. It provides an audit trail of CDM compliance and communicates residual risks to those who need to manage them.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Purpose of designer risk assessment",
    category: "Design & Risk Management"
  },
  {
    id: 146,
    question: "Under CDM 2015, a designer must not commence work on a design for a project unless satisfied that the client is aware of their duties. What are the client's duties that the designer should check?",
    options: [
      "The duty to provide the cheapest possible project",
      "The duties under Regulation 4, including making suitable arrangements for managing the project, providing pre-construction information, and ensuring adequate welfare facilities",
      "The duty to personally supervise all construction work",
      "The duty to obtain planning permission before the design begins"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9(1), a designer must not commence work on a design unless satisfied the client is aware of their duties under the Regulations. Key client duties (Regulation 4) include making suitable arrangements for managing the project, providing pre-construction information, ensuring welfare facilities, and appointing a principal designer and principal contractor for projects with more than one contractor.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Designer checking client awareness",
    category: "Design & Risk Management"
  },
  {
    id: 147,
    question: "On a multi-storey office development, the architect designs floor-to-ceiling glazing with no openable sections for window cleaning access. Under CDM 2015, what is the designer's responsibility regarding future cleaning?",
    options: [
      "Window cleaning is not the architect's concern",
      "The architect must consider how the glazing will be safely cleaned throughout the building's life and, where reasonably practicable, design in safe access solutions such as permanent davit systems, walkways, or access gantries",
      "The architect need only specify that the glass should be self-cleaning",
      "The principal contractor must design the cleaning access"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9, designers must consider foreseeable risks throughout the life of the structure, including maintenance. For floor-to-ceiling glazing on a multi-storey building, the architect must consider how windows will be safely cleaned and, where reasonably practicable, design in permanent safe access solutions rather than relying on temporary measures like cradles or rope access.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Design for safe maintenance access",
    category: "Design & Risk Management"
  },
  {
    id: 148,
    question: "A designer decides to specify a proprietary raised access floor system instead of a traditional screed floor. This decision reduces the need for on-site wet trades and associated slip hazards. Under CDM 2015, how should this design decision be recorded?",
    options: [
      "It does not need to be recorded",
      "It should be noted in the design risk register as a hazard elimination or reduction measure, demonstrating compliance with Regulation 9",
      "It should only be recorded if the HSE requests it during an inspection",
      "It should be recorded in the project financial accounts"
    ],
    correctAnswer: 1,
    explanation: "Good practice under CDM 2015 is to record design decisions that eliminate or reduce risk in the design risk register. This demonstrates compliance with Regulation 9, provides an audit trail, and helps other designers and contractors understand the health and safety rationale behind design choices.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Recording design risk decisions",
    category: "Design & Risk Management"
  },
  {
    id: 149,
    question: "Under CDM 2015, what obligation does Regulation 8(4) place on a person working on a project who becomes aware of a design that does not comply with the Regulations?",
    options: [
      "They have no obligation — only the designer is responsible",
      "They must report it to the HSE immediately",
      "They must report anything they are aware of that is likely to endanger their own health or safety or that of others to the person responsible",
      "They must stop all work on the entire project"
    ],
    correctAnswer: 2,
    explanation: "Regulation 8(4) requires every person working on a project to report anything they are aware of in relation to the project that is likely to endanger their own health or safety or that of any other person. This includes awareness of non-compliant designs, and applies to all workers and duty holders, not just designers.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Reporting non-compliant designs",
    category: "Design & Risk Management"
  },
  {
    id: 150,
    question: "A mechanical engineer designs a plant room layout. Under CDM 2015, which of the following design features would best demonstrate compliance with the designer's duties?",
    options: [
      "Maximising the number of items of equipment in the smallest space to reduce building costs",
      "Providing adequate access space around all equipment for safe installation, maintenance, and replacement, with isolation points clearly accessible and sufficient headroom for working",
      "Using the cheapest available equipment regardless of access requirements",
      "Locating the plant room on the roof with ladder-only access"
    ],
    correctAnswer: 1,
    explanation: "A well-designed plant room under CDM 2015 provides adequate space for safe installation, maintenance, and future replacement of equipment. This includes clear access routes, sufficient working space around each item, accessible isolation points, adequate headroom, and appropriate lighting. These features reduce risks during both construction and the operational life of the building.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Plant room design for safety",
    category: "Design & Risk Management"
  },
  {
    id: 151,
    question: "Which of the following statements about the general principles of prevention in Schedule 1 is correct?",
    options: [
      "They only apply to the principal contractor",
      "They are advisory and not legally binding",
      "They must be taken into account by designers when preparing or modifying a design, and by all duty holders when planning and managing construction work",
      "They only apply to notifiable projects"
    ],
    correctAnswer: 2,
    explanation: "The general principles of prevention in Schedule 1 are integral to CDM 2015. They must be taken into account by designers (Regulation 9(2)), by the principal designer (Regulation 11(3)), and in the management of construction work generally. They apply to all projects, not just notifiable ones.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Application of general principles",
    category: "Design & Risk Management"
  },
  {
    id: 152,
    question: "A designer specifies a lightweight steel framing system (LGSF) instead of traditional blockwork for internal walls. From a CDM perspective, what is the primary benefit?",
    options: [
      "LGSF is always cheaper than blockwork",
      "LGSF reduces manual handling risks as components are lighter, reduces wet trade hazards, and can be assembled more quickly, reducing time spent on site",
      "LGSF eliminates the need for fire protection",
      "LGSF does not require any structural calculations"
    ],
    correctAnswer: 1,
    explanation: "From a CDM perspective, lightweight steel framing reduces several construction risks: lighter components reduce manual handling injuries, dry construction eliminates wet trade hazards (slips, dermatitis), and faster assembly reduces overall time on site and exposure to site hazards. These are valid CDM considerations when choosing construction methods.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Material selection — CDM benefits",
    category: "Design & Risk Management"
  },
  {
    id: 153,
    question: "Under CDM 2015, what is the relationship between Regulation 9 (duties of designers) and Regulation 11 (duties of the principal designer)?",
    options: [
      "Regulation 11 replaces Regulation 9 when a principal designer is appointed",
      "Regulation 9 applies to all designers individually, while Regulation 11 gives the principal designer additional coordination, planning, and management duties across the design team",
      "Regulation 9 applies only to domestic projects",
      "There is no relationship between the two regulations"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9 applies to every designer on a project — each must individually ensure their design does not give rise to foreseeable risks. Regulation 11 gives the principal designer additional overarching duties to plan, manage, and monitor the pre-construction phase and coordinate health and safety matters among all designers. Both regulations operate simultaneously.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Reg 9 vs Reg 11 relationship",
    category: "Design & Risk Management"
  },
  {
    id: 154,
    question: "A client requests a design change that the designer believes will increase construction risk. What should the designer do?",
    options: [
      "Implement the change without question as the client is paying",
      "Refuse to work on the project entirely",
      "Advise the client of the additional risks, propose alternatives that achieve the client's objectives with reduced risk, and record the discussion and outcome",
      "Report the client to the HSE immediately"
    ],
    correctAnswer: 2,
    explanation: "The designer has a duty under Regulation 9 to ensure their design does not give rise to foreseeable risks so far as is reasonably practicable. If a client's change increases risk, the designer should explain the risks, suggest safer alternatives, and document the discussion. The designer cannot simply comply with a change that would breach their CDM duties.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Managing client-requested changes",
    category: "Design & Risk Management"
  },
  {
    id: 155,
    question: "Schedule 1 of CDM 2015 lists nine general principles of prevention. Which of the following is NOT one of them?",
    options: [
      "Giving collective protective measures priority over individual protective measures",
      "Replacing the dangerous with the non-dangerous or less dangerous",
      "Maximising profit margins on construction projects",
      "Adapting the work to the individual"
    ],
    correctAnswer: 2,
    explanation: "The nine general principles of prevention in Schedule 1 are: avoiding risks, evaluating unavoidable risks, combating risks at source, adapting work to the individual, adapting to technical progress, replacing the dangerous with less dangerous, developing a coherent prevention policy, giving collective measures priority, and giving appropriate instructions. Maximising profit is not a principle of prevention.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "General principles — identification",
    category: "Design & Risk Management"
  },
  {
    id: 156,
    question: "A designer is specifying a fall arrest system for workers who will need to access a building's facade for maintenance. Under CDM 2015 and the hierarchy of control, when is it appropriate to specify a fall arrest system?",
    options: [
      "As the first option because it is the cheapest solution",
      "Only after it has been established that designing out the need for access, or providing permanent collective protection such as walkways and guardrails, is not reasonably practicable",
      "Whenever the building is more than two storeys high",
      "Only for notifiable projects"
    ],
    correctAnswer: 1,
    explanation: "Fall arrest (a form of personal protective equipment) sits near the bottom of the hierarchy of control. Under CDM 2015, the designer must first consider eliminating the need for facade access, then collective measures (permanent walkways, guardrails, gantry systems), before specifying personal fall arrest. This aligns with both Regulation 9 and the general principles of prevention.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Hierarchy of control — fall arrest",
    category: "Design & Risk Management"
  },
  {
    id: 157,
    question: "Under CDM 2015, what is meant by 'design' in relation to a structure?",
    options: [
      "Only detailed architectural drawings prepared by a qualified architect",
      "Drawings, design details, specifications, calculations, and bills of quantities relating to a structure, including any modifications",
      "Only structural engineering calculations",
      "Only the aesthetic appearance of the finished building"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 2(1), 'design' is defined broadly to include drawings, design details, specifications, calculations, and bills of quantities (including specifications of articles or substances) relating to a structure. This wide definition ensures that all aspects of design are covered by CDM duties.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Definition of design under CDM",
    category: "Design & Risk Management"
  },
  {
    id: 158,
    question: "An electrical designer specifies a cable route through an area that will later become a confined space due to other design decisions. What should the electrical designer do?",
    options: [
      "Nothing — confined spaces are the responsibility of the structural designer only",
      "Coordinate with the other designers through the principal designer to find an alternative route, or if not possible, ensure the confined space risk is recorded and communicated",
      "Specify that only qualified electricians may enter the space",
      "Add a generic health and safety warning to the cable schedule"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 9 and the cooperation duty in Regulation 8, the electrical designer must coordinate with other designers through the principal designer. The aim is to find an alternative cable route that avoids the confined space. If this is not reasonably practicable, the residual risk must be recorded in the design risk register and communicated to those who will need to work in or maintain the space.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Cross-discipline design coordination",
    category: "Design & Risk Management"
  },
  {
    id: 159,
    question: "A designer includes significant residual risks in their design that cannot be eliminated. Under CDM 2015, who must receive the information about these residual risks?",
    options: [
      "Only the client",
      "Only the HSE",
      "Every person who is or may be affected by the risk and who needs the information to manage it — this typically includes the principal designer, principal contractor, other designers, contractors, and ultimately the end users via the health and safety file",
      "Only the insurance company"
    ],
    correctAnswer: 2,
    explanation: "Regulation 9(3)(b) requires the designer to provide information about residual risks to every person who needs it. This is a broad obligation encompassing the principal designer, principal contractor, other designers, contractors who will build the design, and future users/maintainers via the health and safety file.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Who receives residual risk info",
    category: "Design & Risk Management"
  },
  {
    id: 160,
    question: "Under CDM 2015, a designer who also acts as a contractor on a project has duties under both Regulation 9 (designer) and Regulation 15 (contractor). How do these duties interact?",
    options: [
      "The design duties override the contractor duties",
      "The contractor duties override the design duties",
      "Both sets of duties apply simultaneously — the person must comply with designer duties when carrying out design work and contractor duties when carrying out construction work",
      "The person can choose which set of duties to follow"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 duties are not mutually exclusive. A person who acts as both designer and contractor must comply with both sets of duties. When carrying out or modifying a design, Regulation 9 duties apply. When carrying out construction work, Regulation 15 duties apply. There is no opt-out or override — both operate in parallel.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Dual roles — designer and contractor",
    category: "Design & Risk Management"
  },

  // =======================================================================
  // SECTION 6 — Construction Phase & Compliance — 40 questions (161–200)
  // =======================================================================

  // --- basic (7) ---
  {
    id: 161,
    question: "Under CDM 2015 Regulation 13, what must the principal contractor ensure regarding site inductions?",
    options: [
      "Only new apprentices receive a site induction",
      "Every worker on the site receives a suitable site induction, providing information on the risks and the measures in place to manage them",
      "Site inductions are only required on notifiable projects",
      "Only workers employed directly by the principal contractor need a site induction"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13(4)(a) requires the principal contractor to make and maintain arrangements that will enable the principal contractor and any workers to cooperate effectively, including providing a suitable site induction for every worker. This must cover the risks on site and the measures in place to manage them.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Site inductions Reg 13",
    category: "Construction Phase & Compliance"
  },
  {
    id: 162,
    question: "What is the construction phase plan (CPP) under CDM 2015?",
    options: [
      "A financial plan for the construction phase",
      "A document setting out the health and safety arrangements and site rules for the construction phase",
      "A project programme showing the sequence of construction activities",
      "A quality assurance plan for materials"
    ],
    correctAnswer: 1,
    explanation: "The construction phase plan (CPP) is the principal contractor's key health and safety management document. It sets out the arrangements for managing health and safety during the construction phase, including site rules, specific measures for high-risk work, and the monitoring arrangements.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "CPP definition",
    category: "Construction Phase & Compliance"
  },
  {
    id: 163,
    question: "Under CDM 2015, who has overall responsibility for managing the construction phase?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "The HSE"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 12A and 13, the principal contractor has the overall responsibility for planning, managing, monitoring, and coordinating the construction phase. This includes ensuring that the construction phase plan is followed, welfare facilities are provided, and the site is managed safely.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "PC managing construction phase",
    category: "Construction Phase & Compliance"
  },
  {
    id: 164,
    question: "What are welfare facilities under CDM 2015 Schedule 2?",
    options: [
      "Entertainment facilities for workers during breaks",
      "Sanitary conveniences, washing facilities, drinking water, changing rooms, rest facilities, and facilities for eating meals",
      "Car parking spaces for all workers",
      "Wi-Fi access for workers to contact their families"
    ],
    correctAnswer: 1,
    explanation: "Schedule 2 of CDM 2015 sets out the minimum welfare facilities that must be provided on construction sites. These include sanitary conveniences (toilets), washing facilities (including showers where needed), drinking water, changing rooms and lockers, rest facilities, and facilities for eating meals.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Welfare facilities Schedule 2",
    category: "Construction Phase & Compliance"
  },
  {
    id: 165,
    question: "What does RIDDOR stand for?",
    options: [
      "Risk Identification, Documentation, and Duty Of Reporting",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Regulation for Industrial Disease Detection and Occupational Review",
      "Required Information for Documenting Dangerous Operations and Risks"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. It requires employers and responsible persons to report certain serious workplace accidents, occupational diseases, and specified dangerous occurrences to the HSE.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "RIDDOR definition",
    category: "Construction Phase & Compliance"
  },
  {
    id: 166,
    question: "What is a prohibition notice issued by an HSE inspector?",
    options: [
      "A notice that prevents a worker from leaving the site",
      "A notice that requires the immediate cessation of an activity that the inspector believes involves a risk of serious personal injury",
      "A notice that prevents the client from selling the property",
      "A notice that bans a contractor from bidding on future projects"
    ],
    correctAnswer: 1,
    explanation: "A prohibition notice is served under Section 22 of the Health and Safety at Work etc. Act 1974. It requires the immediate cessation of an activity that the inspector believes involves, or will involve, a risk of serious personal injury. Work cannot resume until the matters specified in the notice have been remedied.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Prohibition notices",
    category: "Construction Phase & Compliance"
  },
  {
    id: 167,
    question: "What is the difference between an improvement notice and a prohibition notice?",
    options: [
      "There is no difference; they are the same thing",
      "An improvement notice gives a specified time period to remedy a contravention, while a prohibition notice requires the immediate or near-immediate cessation of an activity that poses a risk of serious personal injury",
      "An improvement notice applies only to individuals, while a prohibition notice applies only to companies",
      "An improvement notice is issued by the local authority, while a prohibition notice is issued by the HSE"
    ],
    correctAnswer: 1,
    explanation: "An improvement notice (Section 21, HSWA 1974) gives the duty holder a specified period to remedy a contravention of health and safety law. A prohibition notice (Section 22) requires the immediate or near-immediate cessation of an activity that the inspector believes poses a risk of serious personal injury. The key distinction is urgency and severity of risk.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Improvement vs prohibition notices",
    category: "Construction Phase & Compliance"
  },

  // --- intermediate (9) ---
  {
    id: 168,
    question: "The construction phase plan is often described as a 'living document'. What does this mean in practice?",
    options: [
      "It must be printed on biodegradable paper",
      "It must be continuously reviewed, updated, and revised as the project progresses and circumstances change",
      "It must be rewritten from scratch every month",
      "It must be kept in a waterproof container on site"
    ],
    correctAnswer: 1,
    explanation: "Describing the CPP as a 'living document' means it is not a static document created once and then filed away. It must be continuously reviewed and updated as the project progresses, new risks emerge, circumstances change, or new contractors join the project. The principal contractor is responsible for ensuring the CPP remains current and relevant.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CPP as living document",
    category: "Construction Phase & Compliance"
  },
  {
    id: 169,
    question: "Under CDM 2015, how should the principal contractor assess the competence of workers and sub-contractors?",
    options: [
      "By checking only that they have the cheapest quote",
      "By verifying that they have the skills, knowledge, training, experience, and organisational capability to carry out the work safely",
      "By accepting a self-declaration from the worker that they are competent",
      "CDM 2015 does not require competence assessment"
    ],
    correctAnswer: 1,
    explanation: "While CDM 2015 moved away from prescriptive 'competence' requirements in favour of the broader concept of skills, knowledge, training and experience (SKTE), the principal contractor must still satisfy themselves that workers and sub-contractors have the necessary SKTE and organisational capability to carry out their work without risk to health and safety.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Competence assessment",
    category: "Construction Phase & Compliance"
  },
  {
    id: 170,
    question: "What is a permit-to-work system on a construction site?",
    options: [
      "A system for checking workers' immigration status",
      "A formal documented procedure that authorises certain people to carry out specific high-risk work under controlled conditions",
      "A system for tracking workers' hours on site",
      "A method of allocating parking permits to site visitors"
    ],
    correctAnswer: 1,
    explanation: "A permit-to-work system is a formal management control procedure used for high-risk activities such as hot works, confined space entry, live electrical work, and excavations near services. It ensures that specific precautions are taken, that the work is properly authorised, and that a responsible person has checked conditions before work begins.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Permits to work",
    category: "Construction Phase & Compliance"
  },
  {
    id: 171,
    question: "Under CDM 2015, what must the principal contractor do regarding temporary works?",
    options: [
      "Temporary works are not covered by CDM 2015",
      "Ensure that temporary works (such as formwork, falsework, and temporary propping) are designed, erected, and dismantled safely, with appropriate checks and supervision",
      "Delegate all responsibility for temporary works to the client",
      "Only consider temporary works if they will be in place for more than 28 days"
    ],
    correctAnswer: 1,
    explanation: "Temporary works such as formwork, falsework, temporary propping, and excavation support are an integral part of the construction phase. The principal contractor must ensure these are properly designed (often by a temporary works designer), safely erected and dismantled, and subject to appropriate inspection and checking procedures.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Temporary works management",
    category: "Construction Phase & Compliance"
  },
  {
    id: 172,
    question: "Which of the following injuries must be reported to the HSE under RIDDOR?",
    options: [
      "A minor cut that requires a plaster",
      "A fracture of any bone other than a finger, thumb, or toe",
      "A headache caused by noisy construction work",
      "A bruise from bumping into a scaffold pole"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013, fractures (other than to fingers, thumbs, or toes) are classified as 'specified injuries' and must be reported to the HSE. Other specified injuries include amputations, crush injuries to the head or torso, loss of consciousness from head injury or asphyxia, and burns covering more than 10% of the body.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "RIDDOR reportable injuries",
    category: "Construction Phase & Compliance"
  },
  {
    id: 173,
    question: "An HSE inspector arrives on a construction site to carry out an inspection. What powers do they have under the Health and Safety at Work etc. Act 1974?",
    options: [
      "They can only enter the site with the principal contractor's written permission",
      "They have the power to enter premises, inspect and investigate, take samples and photographs, require information, and seize articles or substances",
      "They can only inspect during normal working hours",
      "They can only inspect if they have a court order"
    ],
    correctAnswer: 1,
    explanation: "Under Section 20 of HSWA 1974, HSE inspectors have wide-ranging powers including the right to enter premises at any reasonable time, inspect and investigate, take measurements and photographs, require the production of documents, take samples, and seize any article or substance that poses imminent danger.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "HSE enforcement powers",
    category: "Construction Phase & Compliance"
  },
  {
    id: 174,
    question: "What is the purpose of monitoring and auditing under CDM 2015?",
    options: [
      "To create paperwork for filing purposes only",
      "To check that the arrangements set out in the construction phase plan are being implemented, that risks are being controlled, and to identify areas for improvement",
      "To calculate bonus payments for workers",
      "To satisfy insurance requirements only"
    ],
    correctAnswer: 1,
    explanation: "Monitoring and auditing are essential management activities under CDM 2015. The principal contractor must monitor the implementation of the construction phase plan, check that risk controls are effective, identify non-compliance or new risks, and take corrective action. This supports the continuous improvement of health and safety performance.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Monitoring and auditing",
    category: "Construction Phase & Compliance"
  },
  {
    id: 175,
    question: "Under CDM 2015, what must the principal contractor do when a new sub-contractor arrives on site?",
    options: [
      "Nothing — sub-contractors are responsible for their own health and safety",
      "Provide them with relevant parts of the construction phase plan, ensure they receive a site induction, verify their skills, knowledge, training and experience, and coordinate their work with other contractors",
      "Only provide them with a copy of the F10 notification",
      "Ask them to sign a disclaimer accepting all risks"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor has multiple duties when new sub-contractors arrive: providing relevant CPP information, ensuring site induction, verifying SKTE, and coordinating their work with other site activities. This is part of the PC's overall duty to plan, manage, and coordinate the construction phase under Regulation 13.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Sub-contractor arrival procedures",
    category: "Construction Phase & Compliance"
  },
  {
    id: 176,
    question: "What is the principal contractor's duty regarding consultation with workers under CDM 2015?",
    options: [
      "There is no duty to consult workers",
      "The principal contractor must make and maintain arrangements that will enable the principal contractor and workers engaged in construction work to cooperate effectively, and must consult workers or their representatives on health and safety matters",
      "Consultation is only required with trade union representatives",
      "Consultation is only required before the construction phase begins"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 13(4), the principal contractor must make arrangements for cooperation with workers. Combined with the general duties under the Safety Representatives and Safety Committees Regulations 1977 and the Health and Safety (Consultation with Employees) Regulations 1996, the PC must consult workers on health and safety matters throughout the construction phase.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Worker consultation",
    category: "Construction Phase & Compliance"
  },

  // --- advanced (4) ---
  {
    id: 177,
    question: "A principal contractor discovers that a sub-contractor is repeatedly failing to follow the construction phase plan despite verbal warnings. The sub-contractor's workers are not wearing the required PPE and are ignoring exclusion zones. What steps should the principal contractor take?",
    options: [
      "Ignore the situation as the sub-contractor has their own health and safety responsibilities",
      "Issue a formal written instruction to comply, increase monitoring of the sub-contractor's activities, consider stopping their work until compliance is achieved, and if necessary remove them from site — documenting all actions taken",
      "Report the matter to the police",
      "Reduce the sub-contractor's payment as a penalty"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor has a duty under Regulation 13 to manage the construction phase. When a sub-contractor repeatedly fails to comply, the PC must take escalating action: formal written instruction, increased monitoring, work stoppage if necessary, and ultimately removal from site. All actions should be documented. The PC cannot simply ignore non-compliance as they remain responsible for site safety.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Managing non-compliant sub-contractors",
    category: "Construction Phase & Compliance"
  },
  {
    id: 178,
    question: "A construction worker suffers a serious injury and is incapacitated for more than 7 consecutive days (not counting the day of the accident). Under RIDDOR, within what timeframe must this be reported to the HSE?",
    options: [
      "Immediately by telephone",
      "Within 24 hours by telephone",
      "Within 15 days of the accident, using the appropriate online form",
      "Within 30 days by post"
    ],
    correctAnswer: 2,
    explanation: "Under RIDDOR 2013, an over-7-day incapacitation injury must be reported to the HSE within 15 days of the accident using the online reporting form. This is different from 'specified injuries' (such as fractures) which must be reported immediately or as soon as practicable, and the HSE must be notified by the quickest practicable means.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "RIDDOR over-7-day reporting",
    category: "Construction Phase & Compliance"
  },
  {
    id: 179,
    question: "On a complex multi-phase project, the principal contractor must coordinate several high-risk activities occurring simultaneously: a deep excavation, crane operations, and live electrical work. Which management approach best demonstrates CDM 2015 compliance?",
    options: [
      "Allow each sub-contractor to manage their own activity independently",
      "Implement a formal coordination system with permit-to-work procedures for each high-risk activity, task-specific risk assessments, method statements, exclusion zones, appointed supervisors, and a communication protocol to manage interfaces between the activities",
      "Postpone all activities until they can be done sequentially",
      "Delegate coordination to the least busy site supervisor"
    ],
    correctAnswer: 1,
    explanation: "Managing concurrent high-risk activities requires a comprehensive coordination approach. Under Regulation 13, the principal contractor must plan, manage, and coordinate the construction phase. For simultaneous high-risk operations, this means formal permit-to-work systems, specific risk assessments and method statements for each activity, physical separation through exclusion zones, competent supervision, and clear communication protocols at the interfaces between activities.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Coordinating concurrent high-risk activities",
    category: "Construction Phase & Compliance"
  },
  {
    id: 180,
    question: "A principal contractor wishes to implement a continuous improvement approach to health and safety on a large project. Which combination of measures would best achieve this under CDM 2015?",
    options: [
      "Conduct a single health and safety audit at the start of the project and file the results",
      "Implement regular safety inspections, formal audits of the CPP and risk controls, near-miss reporting, toolbox talks, lessons-learned reviews, worker consultation forums, trend analysis of incidents, and regular CPP updates based on findings",
      "Send a monthly email to all workers reminding them to be safe",
      "Only investigate accidents that result in lost time"
    ],
    correctAnswer: 1,
    explanation: "Continuous improvement under CDM 2015 requires a multi-faceted approach: regular proactive inspections, formal audits of the CPP and risk controls, near-miss and incident reporting, toolbox talks for frontline communication, lessons-learned reviews, worker consultation, analysis of incident trends, and ongoing updates to the CPP. This creates a feedback loop where findings drive improvements.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Continuous improvement approach",
    category: "Construction Phase & Compliance"
  },
  {
    id: 181,
    question: "Under CDM 2015, what minimum welfare provisions must be made available from the start of the construction phase?",
    options: [
      "A portaloo is sufficient for all projects",
      "Sanitary conveniences and washing facilities with hot and cold running water, drinking water, rest areas with seating and facilities for preparing hot drinks, and changing and storage facilities — all maintained in a clean and orderly condition",
      "Only drinking water and a first aid kit",
      "Welfare provisions are not required until the project has been running for 14 days"
    ],
    correctAnswer: 1,
    explanation: "Schedule 2 of CDM 2015 requires that welfare facilities be provided from the start of the construction phase. These include flushing toilets (or suitable alternatives), wash basins with hot and cold (or warm) running water, drinking water, heated rest areas with seating and facilities for preparing hot drinks, changing rooms and storage for clothing, and facilities for eating. All must be maintained in a clean, orderly condition.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Minimum welfare provisions",
    category: "Construction Phase & Compliance"
  },
  {
    id: 182,
    question: "A worker on a construction site observes what they believe is an unsafe practice by another worker. Under CDM 2015, what should they do?",
    options: [
      "Ignore it as it is not their responsibility",
      "Report the matter to the site supervisor, safety representative, or principal contractor as required by Regulation 8(4)",
      "Confront the other worker directly and demand they stop",
      "Wait until the end of the shift and mention it casually"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 8(4), every person working on a project must report anything they are aware of that is likely to endanger their own health or safety or that of any other person. Workers should use the established reporting mechanisms — typically reporting to their supervisor, safety representative, or the principal contractor's safety team.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Worker reporting duties",
    category: "Construction Phase & Compliance"
  },
  {
    id: 183,
    question: "What is the legal consequence of failing to comply with a prohibition notice?",
    options: [
      "A formal warning letter with no further consequences",
      "It is a criminal offence that can result in prosecution, an unlimited fine, and/or imprisonment",
      "A small administrative fee is payable",
      "The site must be closed for exactly 24 hours"
    ],
    correctAnswer: 1,
    explanation: "Failing to comply with a prohibition notice is a criminal offence under Section 33 of HSWA 1974. On conviction, the penalties can include an unlimited fine and/or imprisonment. Prohibition notices must be complied with immediately — the prohibited activity must not resume until the matters specified in the notice have been resolved.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Consequences of non-compliance",
    category: "Construction Phase & Compliance"
  },
  {
    id: 184,
    question: "The principal contractor must ensure that no unauthorised persons access the construction site. Under CDM 2015, how should this be achieved?",
    options: [
      "By placing a polite sign at the entrance asking people not to enter",
      "By taking reasonable steps to prevent access by unauthorised persons, including appropriate fencing, hoarding, signage, and controlled access points with sign-in procedures",
      "By relying on the client to provide security",
      "Site security is not a CDM requirement"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 13(6), the principal contractor must take reasonable steps to prevent access to the construction site by any person whose presence could create a risk to health or safety. This includes appropriate physical barriers (fencing, hoarding), signage, controlled access points, and sign-in/sign-out procedures to track who is on site.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Preventing unauthorised access",
    category: "Construction Phase & Compliance"
  },
  {
    id: 185,
    question: "Under RIDDOR, which of the following is a 'dangerous occurrence' that must be reported?",
    options: [
      "A minor spillage of cleaning fluid",
      "The collapse, overturning, or failure of load-bearing parts of lifts and lifting equipment",
      "A worker forgetting to wear their hard hat for five minutes",
      "A delivery vehicle arriving late to site"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR 2013 Schedule 2 lists dangerous occurrences that must be reported. The collapse, overturning, or failure of load-bearing parts of lifts and lifting equipment is a reportable dangerous occurrence. Other examples include scaffold collapses, explosions, building collapses, and electrical incidents causing fires or explosions.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "RIDDOR dangerous occurrences",
    category: "Construction Phase & Compliance"
  },
  {
    id: 186,
    question: "A principal contractor uses toolbox talks as part of their site safety communication. What is the purpose of toolbox talks?",
    options: [
      "To train workers in the use of power tools",
      "To provide short, focused briefings on specific health and safety topics relevant to the current work activities, reinforcing safe practices and raising awareness of specific hazards",
      "To discuss project timescales and deadlines",
      "To distribute new tools to workers"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are short, focused health and safety briefings delivered to workers on site. They address specific topics relevant to current work activities, such as working at height, manual handling, or site-specific hazards. They are a practical tool for maintaining safety awareness and reinforcing the information in the construction phase plan.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Toolbox talks",
    category: "Construction Phase & Compliance"
  },
  {
    id: 187,
    question: "Under CDM 2015, what happens if a project has only one contractor?",
    options: [
      "CDM 2015 does not apply at all",
      "The contractor must fulfil the duties of both the contractor and the principal contractor, and the client need not appoint a separate principal designer or principal contractor",
      "The client must still appoint a principal designer and principal contractor",
      "The HSE must be notified regardless of project size"
    ],
    correctAnswer: 1,
    explanation: "Where a project involves only one contractor, Regulation 5(3) provides that the contractor must fulfil the duties of the principal contractor as well. The client is not required to appoint a principal designer or principal contractor for single-contractor projects, though the project must still comply with all other relevant CDM requirements.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Single contractor projects",
    category: "Construction Phase & Compliance"
  },
  {
    id: 188,
    question: "What is the role of a temporary works coordinator (TWC) on a construction site?",
    options: [
      "To coordinate temporary staff from employment agencies",
      "To ensure that all temporary works are properly designed, checked, installed, maintained, and removed safely, acting as the focal point for temporary works management",
      "To manage temporary accommodation for site workers",
      "To coordinate temporary road closures with the local authority"
    ],
    correctAnswer: 1,
    explanation: "A temporary works coordinator (TWC) is a key role in the management of temporary works such as formwork, falsework, propping, and excavation support. The TWC ensures that temporary works are properly designed by a competent designer, checked before loading, installed correctly, regularly inspected, and safely dismantled when no longer needed. This role is described in BS 5975.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Temporary works coordinator",
    category: "Construction Phase & Compliance"
  },
  {
    id: 189,
    question: "A specified injury occurs on a construction site on a Friday afternoon. Under RIDDOR, when must the HSE be notified?",
    options: [
      "By the following Monday morning",
      "Within 15 days using the online form",
      "Without delay — the responsible person must notify the HSE by the quickest practicable means, and follow up with a written report within 10 days",
      "Within 72 hours"
    ],
    correctAnswer: 2,
    explanation: "Under RIDDOR 2013, specified injuries (such as fractures, amputations, and loss of consciousness) must be reported to the HSE without delay. The initial notification should be by the quickest practicable means (usually telephone on 0345 300 9923), and a written report must follow within 10 days. The time or day of the week does not affect this obligation.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "RIDDOR immediate reporting",
    category: "Construction Phase & Compliance"
  },
  {
    id: 190,
    question: "Under CDM 2015, what is the relationship between the construction phase plan and the pre-construction information?",
    options: [
      "They are the same document",
      "The construction phase plan should be developed using the pre-construction information as a key input, building on the hazard and risk information it contains to set out how the construction phase will be managed safely",
      "The pre-construction information replaces the need for a construction phase plan",
      "The construction phase plan must be completed before any pre-construction information is gathered"
    ],
    correctAnswer: 1,
    explanation: "The pre-construction information is a key input to the construction phase plan. The PCI provides information about hazards, existing site conditions, and design risks that the principal contractor must use to develop the CPP. The CPP then sets out how these risks will be managed during the construction phase, along with site rules, arrangements, and procedures.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CPP and PCI relationship",
    category: "Construction Phase & Compliance"
  },
  {
    id: 191,
    question: "A principal contractor identifies that a scaffolding sub-contractor's workers lack the necessary skills and training to erect a complex scaffold. What action must the principal contractor take?",
    options: [
      "Allow the work to proceed with additional supervision",
      "Prevent the workers from carrying out the scaffolding work until they have the necessary skills, knowledge, training, and experience, and ensure only suitably qualified scaffolders are deployed",
      "Report the sub-contractor to their trade association",
      "Issue the workers with additional PPE as compensation for their lack of training"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 13(2), the principal contractor must ensure that construction work is carried out, so far as is reasonably practicable, without risks to the health or safety of any person. If workers lack the necessary SKTE for a complex scaffold erection, the PC must not allow them to proceed. Only suitably qualified and experienced scaffolders should undertake the work.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Enforcing competence requirements",
    category: "Construction Phase & Compliance"
  },
  {
    id: 192,
    question: "What is a near-miss and why is near-miss reporting important under CDM 2015?",
    options: [
      "A near-miss is an accident that results in minor injury — it is only reported for insurance purposes",
      "A near-miss is an unplanned event that did not result in injury, damage, or loss but had the potential to do so — near-miss reporting is vital because it identifies hazards before they cause harm, enabling proactive risk management",
      "A near-miss is when a worker nearly arrives late to site — it is tracked for attendance records",
      "Near-miss reporting is not relevant to CDM 2015"
    ],
    correctAnswer: 1,
    explanation: "A near-miss is an event that could have resulted in injury, damage, or loss but did not. Near-miss reporting is a proactive safety tool — by identifying and investigating near-misses, the principal contractor can address hazards before they cause actual harm. This supports the continuous improvement of health and safety management required by CDM 2015.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Near-miss reporting",
    category: "Construction Phase & Compliance"
  },
  {
    id: 193,
    question: "Under CDM 2015 Regulation 13(3), what must the construction phase plan include as a minimum?",
    options: [
      "Only a list of emergency telephone numbers",
      "The arrangements for ensuring there are suitable welfare facilities, the site rules (if any), and any specific measures concerning work falling within Schedule 3 (high-risk work such as work near or over water, involving diving, in a caisson, involving explosives, etc.)",
      "A full list of every tool to be used on the project",
      "Only the names and addresses of all workers"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13(3) requires the construction phase plan to include arrangements for welfare facilities, site rules, and specific measures for work listed in Schedule 3. Schedule 3 includes work involving particular risks such as burial, drowning, exposure to chemical or biological agents, work near high-voltage lines, work involving diving, and work in caissons.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "CPP minimum content",
    category: "Construction Phase & Compliance"
  },
  {
    id: 194,
    question: "A client on a domestic project hires a single contractor to build a conservatory extension. Which CDM 2015 duties apply?",
    options: [
      "CDM 2015 does not apply to domestic projects at all",
      "Part 4 duties (general requirements for all construction sites) apply to the contractor, plus the contractor assumes the client's duties under Regulation 7, but the domestic client is not themselves a duty holder",
      "The full duties of all CDM 2015 Parts apply including the domestic client having the same duties as a commercial client",
      "Only Regulation 6 (notification) applies"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 applies to domestic projects, but with modifications. The domestic client is not themselves a duty holder (Regulation 7). Instead, their duties are transferred to the contractor (for single-contractor projects) or the principal contractor/principal designer (for multi-contractor projects). Part 4 duties and the contractor's own Regulation 15 duties apply in full.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Domestic projects — duty transfer",
    category: "Construction Phase & Compliance"
  },
  {
    id: 195,
    question: "What is the purpose of site safety inspections carried out by the principal contractor?",
    options: [
      "To take photographs for the company website",
      "To proactively identify hazards, check that risk controls are in place and effective, verify compliance with the construction phase plan and site rules, and identify areas for corrective action",
      "To check that workers are wearing the correct uniform",
      "To verify that the project is on budget"
    ],
    correctAnswer: 1,
    explanation: "Site safety inspections are a key proactive monitoring tool for the principal contractor. Their purpose is to identify hazards before they cause harm, check that the risk controls specified in the CPP are in place and working, verify compliance with site rules, and identify any areas requiring corrective action. Inspection findings should be recorded and acted upon.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "Purpose of site safety inspections",
    category: "Construction Phase & Compliance"
  },
  {
    id: 196,
    question: "Under CDM 2015, what obligation does the principal contractor have regarding emergency procedures?",
    options: [
      "Emergency procedures are the responsibility of the fire brigade only",
      "The principal contractor must establish and maintain appropriate emergency procedures, including arrangements for first aid, fire, and evacuation, and ensure they are tested and understood by all site workers",
      "Emergency procedures are only needed once the building is occupied",
      "Only notifiable projects require emergency procedures"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor must ensure appropriate emergency procedures are in place as part of managing the construction phase. This includes arrangements for first aid (complying with the Health and Safety (First-Aid) Regulations 1981), fire precautions, and evacuation procedures. These must be communicated to all workers, tested through drills, and updated as the project evolves.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Emergency procedures",
    category: "Construction Phase & Compliance"
  },
  {
    id: 197,
    question: "A principal contractor is auditing their health and safety management system on a large construction project. Which of the following would indicate an effective system?",
    options: [
      "A large volume of paperwork with no evidence of implementation on site",
      "Clear evidence that the CPP is being followed in practice, risk assessments are site-specific and regularly reviewed, workers are consulted and engaged, incidents and near-misses are investigated and acted upon, and continuous improvements are being made",
      "No reported accidents, even though near-misses are not being tracked",
      "Compliance with the minimum legal requirements only, with no proactive measures"
    ],
    correctAnswer: 1,
    explanation: "An effective health and safety management system under CDM 2015 is demonstrated by practical implementation, not just paperwork. Key indicators include the CPP being actively followed, site-specific risk assessments, worker engagement, thorough incident investigation, near-miss tracking, and evidence of continuous improvement. A system that exists only on paper does not comply with the spirit of CDM 2015.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Effective H&S management indicators",
    category: "Construction Phase & Compliance"
  },
  {
    id: 198,
    question: "Schedule 2 of CDM 2015 requires washing facilities on construction sites. What specific requirements apply?",
    options: [
      "A single cold water tap is sufficient for all sites",
      "Washing facilities must include a supply of hot and cold (or warm) running water, soap or other suitable means of cleaning, and towels or other suitable means of drying",
      "Hand sanitiser gel is an acceptable permanent replacement for washing facilities",
      "Washing facilities are only required if the site has more than 50 workers"
    ],
    correctAnswer: 1,
    explanation: "Schedule 2, paragraph 2 of CDM 2015 requires washing facilities with hot and cold (or warm) running water, soap or other cleaning agents, and towels or other means of drying. These facilities must be provided adjacent to sanitary conveniences and, where needed, adjacent to changing rooms. They must be in a clean, orderly condition and adequately ventilated and lit.",
    section: "cdm-regulations",
    difficulty: "intermediate",
    topic: "Washing facility requirements",
    category: "Construction Phase & Compliance"
  },
  {
    id: 199,
    question: "A worker appeals against a prohibition notice served by an HSE inspector. Does the appeal suspend the prohibition notice?",
    options: [
      "Yes — the prohibition notice is automatically suspended pending the appeal",
      "No — a prohibition notice remains in force during an appeal unless the tribunal specifically directs otherwise; this is different from an improvement notice which is suspended during an appeal",
      "The appeal automatically overturns the prohibition notice",
      "Appeals against prohibition notices are not permitted"
    ],
    correctAnswer: 1,
    explanation: "Under Section 24 of HSWA 1974, an appeal against a prohibition notice does NOT suspend the notice. The prohibited activity must remain stopped during the appeal unless the employment tribunal specifically directs otherwise. This is a critical distinction from improvement notices, which are suspended during an appeal. The rationale is that prohibition notices address risks of serious personal injury.",
    section: "cdm-regulations",
    difficulty: "advanced",
    topic: "Prohibition notice appeals",
    category: "Construction Phase & Compliance"
  },
  {
    id: 200,
    question: "Under CDM 2015, what is the overarching objective of the principal contractor's management of the construction phase?",
    options: [
      "To complete the project as quickly as possible regardless of safety",
      "To ensure that construction work is planned, managed, and monitored so that it is carried out without risks to the health or safety of any person, so far as is reasonably practicable",
      "To maximise the number of workers on site at any one time",
      "To minimise the client's expenditure on welfare facilities"
    ],
    correctAnswer: 1,
    explanation: "The overarching objective of the principal contractor's management under Regulations 13 and 14 is to ensure construction work is planned, managed, and monitored so that it is carried out, so far as is reasonably practicable, without risks to the health or safety of any person. This encompasses all aspects of site management including the CPP, welfare, inductions, coordination, monitoring, and emergency procedures.",
    section: "cdm-regulations",
    difficulty: "basic",
    topic: "PC overarching objective",
    category: "Construction Phase & Compliance"
  }
];
