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
  'Introduction to CDM 2015',
  'Duty Holders & Their Roles',
  'Pre-Construction & Planning',
  'Design & Risk Management',
  'Construction Phase & Compliance',
];

export const cdmRegulationsMockExamConfig: MockExamConfig = {
  examId: 'cdm-regulations',
  examTitle: 'CDM Regulations Awareness Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/cdm-regulations-module-6',
  categories: cdmRegulationsCategories,
};

export const getRandomCdmRegulationsExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    cdmRegulationsQuestionBank,
    numQuestions,
    cdmRegulationsCategories
  );
};

export const cdmRegulationsQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // CATEGORY 1 — Introduction to CDM 2015 — 40 questions (id 1–40)
  // =======================================================================

  // --- Questions 1–20 (batch 1): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 1,
    question: 'What does the abbreviation CDM stand for in UK construction law?',
    options: [
      'Construction Development and Monitoring',
      'Construction Design and Management',
      'Construction Duty and Methodology',
      'Contractor Design and Maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'CDM stands for Construction (Design and Management) Regulations. The current version, CDM 2015, came into force on 6 April 2015 and is the primary set of regulations for managing health and safety on construction projects in Great Britain.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'CDM abbreviation',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 2,
    question: 'When did the current CDM Regulations (CDM 2015) come into force?',
    options: [
      '1 January 2014',
      '1 October 2016',
      '6 April 2015',
      '31 March 2015',
    ],
    correctAnswer: 2,
    explanation:
      'The Construction (Design and Management) Regulations 2015 came into force on 6 April 2015, replacing the previous CDM 2007 Regulations. They were made under the Health and Safety at Work etc. Act 1974.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'CDM 2015 commencement date',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 3,
    question: 'Which parent Act provides the legal authority for the CDM 2015 Regulations?',
    options: [
      'The Building Act 1984',
      'The Management of Health and Safety at Work Regulations 1999',
      'The Construction Act 1996 (Housing Grants, Construction and Regeneration Act)',
      'The Health and Safety at Work etc. Act 1974',
    ],
    correctAnswer: 3,
    explanation:
      'CDM 2015 is a statutory instrument made under the Health and Safety at Work etc. Act 1974 (HSWA). Section 15 of HSWA gives the Secretary of State the power to make health and safety regulations such as CDM.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Parent legislation',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 4,
    question:
      'Which body is the principal enforcing authority for CDM 2015 on most construction sites?',
    options: [
      'The Health and Safety Executive (HSE)',
      'The Construction Industry Training Board (CITB)',
      'Local Authority Environmental Health',
      'The Office for Nuclear Regulation (ONR)',
    ],
    correctAnswer: 0,
    explanation:
      'The Health and Safety Executive (HSE) is responsible for enforcing CDM 2015 on construction sites across Great Britain. HSE inspectors can visit sites, issue improvement or prohibition notices, and prosecute for breaches of the Regulations.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Enforcement authority',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 5,
    question:
      'CDM 2015 applies to construction work carried out in which part of the United Kingdom?',
    options: [
      'England and Wales only',
      'Great Britain (England, Wales and Scotland)',
      'The whole of the United Kingdom including Northern Ireland',
      'England, Wales, Scotland and the Channel Islands',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 applies to construction work in Great Britain — that is England, Wales and Scotland. Northern Ireland has its own equivalent legislation: the Construction (Design and Management) Regulations (Northern Ireland) 2016.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Geographical scope',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 6,
    question:
      "Which of the following activities is classified as 'construction work' under CDM 2015 Regulation 2?",
    options: [
      'Mowing the grass on a construction site perimeter',
      'Routine office cleaning inside a completed building',
      'Installing a new electrical distribution board in an existing factory',
      'Delivering furniture to a furnished office',
    ],
    correctAnswer: 2,
    explanation:
      "Under Regulation 2 of CDM 2015, 'construction work' includes the installation, commissioning, maintenance, repair or removal of mechanical, electrical, gas or other services normally fixed within or to a structure. Installing a distribution board is therefore construction work.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Definition of construction work',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 7,
    question: "What is the definition of a 'structure' under CDM 2015?",
    options: [
      'Only a permanent building that has received building control approval',
      'Any load-bearing element of a completed and occupied building',
      'A building under construction, but excluding civil engineering works such as roads or sewers',
      'Any building, railway, road, earthworks, pipe, sewer or similar work, whether temporary or permanent',
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 2 of CDM 2015 defines 'structure' very broadly. It includes any building, timber, masonry, metal or reinforced concrete structure, railway line or siding, tramway line, dock, harbour, inland navigation, tunnel, shaft, bridge, viaduct, waterworks, reservoir, pipe or pipeline, cable, aqueduct, sewer, sewage works, gasholder, road, airfield, sea defence works, river works, drainage works, earthworks, lagoon, dam, wall, caisson, mast, tower, pylon, underground tank, earth retaining structure, or any structure similar to any of the foregoing — whether temporary or permanent.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Definition of structure',
    category: 'Introduction to CDM 2015',
  },

  // intermediate (9)
  {
    id: 8,
    question: 'Which set of regulations did CDM 2015 directly replace?',
    options: [
      'The CDM Regulations 2007 and the Construction (Health, Safety and Welfare) Regulations 1996',
      'The CDM Regulations 1994 and the Work at Height Regulations 2005 in their entirety',
      'The Construction (General Provisions) Regulations 1961 and the Factories Act 1961',
      'The Management of Health and Safety at Work Regulations 1999 and the HSW Act 1974',
    ],
    correctAnswer: 0,
    explanation:
      'CDM 2015 replaced both the Construction (Design and Management) Regulations 2007 and the Construction (Health, Safety and Welfare) Regulations 1996 (CHSW). The welfare provisions from CHSW 1996 were incorporated into Part 4 and Schedule 2 of CDM 2015.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CDM history and revoked regulations',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 9,
    question:
      'Under CDM 2015, at what threshold must a construction project be notified to the HSE?',
    options: [
      'Longer than 15 working days, regardless of the number of workers on site',
      'Longer than 30 working days with more than 20 workers at once, or over 500 person-days',
      'Any project with a construction value exceeding £100,000, regardless of duration',
      'Longer than 60 working days, or with more than 50 workers at any one time',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 6 of CDM 2015 requires notification to the HSE when a project is expected to last longer than 30 working days and have more than 20 workers working simultaneously at any point, or exceed 500 person-days of construction work. Notification is made using Form F10.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Notification thresholds',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 10,
    question: 'What is the purpose of the F10 notification form under CDM 2015?',
    options: [
      'To apply for building control approval before construction work starts',
      'To register the principal contractor with the Construction Industry Training Board',
      'To notify the HSE of a notifiable construction project before work begins',
      'To record the construction phase plan and lodge it with the local authority',
    ],
    correctAnswer: 2,
    explanation:
      'The F10 form is used to notify the Health and Safety Executive about a notifiable construction project, as required by Regulation 6 of CDM 2015. It must be submitted as soon as practicable before the construction phase begins and must include details such as project location, client, principal designer, principal contractor and planned start date.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'F10 notification',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 11,
    question:
      'Which Regulation within CDM 2015 sets out the general principles of prevention that must be applied?',
    options: [
      'Regulation 3',
      'Regulation 8',
      'Regulation 5',
      'Regulation 9',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 9 of CDM 2015 requires that all duty holders apply the general principles of prevention set out in Schedule 1 when carrying out their duties. These principles originate from the European Framework Directive 89/391/EEC and include avoiding risks, evaluating unavoidable risks, combating risks at source, and giving priority to collective protective measures.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'General principles of prevention',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 12,
    question:
      'How are domestic clients treated differently under CDM 2015 compared to commercial clients?',
    options: [
      'Their duties transfer to the contractor, or the principal contractor on multi-contractor projects',
      'They are completely exempt from CDM 2015 and carry no client duties of any kind',
      'They retain all client duties personally but are given a longer period in which to comply',
      'Their duties transfer only to the principal designer and never to a contractor',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 7 of CDM 2015, domestic clients are not exempt — CDM applies to all construction projects. However, domestic client duties are automatically transferred: on projects with only one contractor the duties pass to that contractor, and where there is a principal contractor the duties pass to the principal contractor. Alternatively, a domestic client can make a written agreement to transfer duties to the principal designer.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Domestic client provisions',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 13,
    question:
      'Which Part of CDM 2015 contains the duties relating to health, safety and welfare on construction sites?',
    options: [
      'Part 1 — Commencement, interpretation and application',
      'Part 4 — General requirements for all construction sites',
      'Part 2 — Client duties',
      'Part 3 — Health and safety duties and roles',
    ],
    correctAnswer: 1,
    explanation:
      'Part 4 of CDM 2015 (Regulations 16–35) sets out the general requirements for all construction sites relating to safety, stability, demolition, dismantling, explosives, excavations, cofferdams and caissons, reports of inspections, energy distribution installations, prevention of drowning, traffic routes, and fire detection and prevention. These provisions were carried over from the former CHSW 1996 Regulations.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Structure of CDM 2015',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 14,
    question: "Under CDM 2015, what does 'construction phase' mean?",
    options: [
      'The period from the client first appointing a designer until planning permission is granted',
      'The period during which the construction phase plan is drafted, before any work starts on site',
      'The period starting when construction work begins and ending when it is completed',
      'The period from practical completion until the health and safety file is handed to the client',
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 2 of CDM 2015 defines the 'construction phase' as the period of time starting when construction work in a project begins and ending when construction work in that project is completed. This is an important definition because several duties under CDM are triggered by or relate to the construction phase.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Construction phase definition',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 15,
    question:
      "Which of the following is NOT listed as 'construction work' under CDM 2015 Regulation 2?",
    options: [
      'Site clearance and investigation (but not survey) of a site',
      'Demolition or dismantling of a structure',
      'Painting or decorating the external surfaces of a building',
      'Surveying a building with no physical intervention',
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 2 of CDM 2015 specifically excludes 'survey' from the definition of 'site clearance, exploration and investigation'. Purely surveying a building without any physical intervention (drilling, opening up, etc.) is not construction work. However, intrusive surveys involving physical work to the structure would be covered.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Exclusions from construction work definition',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 16,
    question:
      'Under CDM 2015 Regulation 6, who has the duty to notify the HSE about a notifiable project?',
    options: [
      'The client',
      'The principal designer',
      'The principal contractor',
      'The contractor carrying out the most work',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 6(1) of CDM 2015 places the duty to notify the HSE squarely on the client. It is the client who must give notice in writing to the HSE as soon as is practicable before the construction phase begins. In practice the client may ask the principal designer or principal contractor to submit the F10 on their behalf, but the legal duty remains with the client.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Notification duty holder',
    category: 'Introduction to CDM 2015',
  },

  // advanced (4)
  {
    id: 17,
    question:
      'The original CDM Regulations were introduced in 1994 to transpose which European Directive into UK law?',
    options: [
      'Council Directive 92/58/EEC — the Minimum Requirements for Safety Signs Directive',
      'Council Directive 92/57/EEC — the Temporary or Mobile Construction Sites Directive',
      'Council Directive 89/391/EEC — the Framework Directive on Health and Safety at Work',
      'Council Directive 89/654/EEC — the Minimum Requirements for Workplaces Directive',
    ],
    correctAnswer: 1,
    explanation:
      'The CDM Regulations 1994 were introduced to transpose Council Directive 92/57/EEC (the Temporary or Mobile Construction Sites Directive) into UK law. This Directive set out minimum health and safety requirements for temporary or mobile construction sites across EU member states.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'European origins of CDM',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 18,
    question:
      'Schedule 1 of CDM 2015 lists the general principles of prevention. Which of the following correctly lists THREE of these principles in order?',
    options: [
      'Provide personal protective equipment; supervise the workforce; record all incidents',
      'Identify the hazard; transfer the risk; accept the residual risk',
      'Avoid risks; evaluate risks that cannot be avoided; combat risks at source',
      'Assess the cost; weigh the benefit; proceed if affordable',
    ],
    correctAnswer: 2,
    explanation:
      'Schedule 1 of CDM 2015 sets out the general principles of prevention derived from Article 6(2) of the European Framework Directive 89/391/EEC. They are: (a) avoiding risks; (b) evaluating the risks which cannot be avoided; (c) combating the risks at source; (d) adapting the work to the individual; (e) adapting to technical progress; (f) replacing the dangerous by the non-dangerous or less dangerous; (g) developing a coherent overall prevention policy; (h) giving priority to collective protective measures over individual protective measures; (i) giving appropriate instructions to employees.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Schedule 1 general principles',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 19,
    question:
      'Under Regulation 6, the F10 notification must contain the particulars set out in which Schedule of CDM 2015?',
    options: [
      'Schedule 4',
      'Schedule 2',
      'Schedule 3',
      'Schedule 1',
    ],
    correctAnswer: 3,
    explanation:
      'Schedule 1 of CDM 2015 is titled "Particulars to be notified under regulation 6" and lists the information the F10 must contain. CDM 2015 has five schedules in total: Schedule 1 (notification particulars), Schedule 2 (minimum welfare facilities), Schedule 3 (work involving particular risks), Schedule 4 (transitional and saving provisions) and Schedule 5 (amendments).',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'F10 Schedule reference',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 20,
    question:
      'A key change from CDM 2007 to CDM 2015 was the replacement of the CDM Co-ordinator role. What replaced this role?',
    options: [
      'The Principal Designer',
      'The Planning Supervisor',
      'The Health and Safety Adviser',
      'The Project Supervisor',
    ],
    correctAnswer: 0,
    explanation:
      'One of the most significant changes in CDM 2015 was the abolition of the CDM Co-ordinator (CDMC) role, which had been introduced in CDM 2007. It was replaced by the Principal Designer role. Unlike the CDMC, the Principal Designer must be a designer (not just a co-ordinator) and carries direct design-related health and safety duties throughout the pre-construction phase.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'CDM Co-ordinator replacement',
    category: 'Introduction to CDM 2015',
  },

  // --- Questions 21–40 (batch 2): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 21,
    question: 'How many Parts does CDM 2015 contain?',
    options: [
      'Three',
      'Five',
      'Four',
      'Six',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 contains five Parts: Part 1 — Commencement, interpretation and application; Part 2 — Client duties; Part 3 — Health and safety duties and roles; Part 4 — General requirements for all construction sites; and Part 5 — General (transitional provisions, amendments, revocations).',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'CDM 2015 structure',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 22,
    question: 'True or false: CDM 2015 applies to ALL construction projects, regardless of size.',
    options: [
      'False — it only applies to commercial projects',
      'False — it only applies to projects over 30 days',
      'True — CDM 2015 applies to every construction project',
      'False — it only applies to notifiable projects',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 applies to all construction projects in Great Britain, no matter how small or short in duration. There is no lower threshold for CDM to apply. What changes with project size is the level of duty — for example, only notifiable projects require an F10, and only projects with more than one contractor require a principal designer and principal contractor.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Universal application of CDM',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 23,
    question: "What is a 'domestic client' under CDM 2015?",
    options: [
      'A client whose project is carried out on a private dwelling and is not notifiable to the HSE under Regulation 6',
      'A client for whom construction work is carried out by a single contractor with no principal designer appointed',
      'A small business that carries out construction work only on premises it owns and occupies itself, not for profit',
      'A client for whom a construction project is being carried out which is not in the course or furtherance of a business',
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 2 of CDM 2015 defines a 'domestic client' as a client for whom a construction project is being carried out which is not done in the course or furtherance of a business of that client. This typically means a homeowner having work done on their own home where the work is not part of a business activity.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Domestic client definition',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 24,
    question: 'Which HSE publication provides approved guidance on the CDM 2015 Regulations?',
    options: [
      'L153 — Managing health and safety in construction (CDM 2015)',
      'HSG65 — Managing for health and safety',
      'HSG150 — Health and safety in construction',
      'L144 — Managing health and safety in construction',
    ],
    correctAnswer: 0,
    explanation:
      "L153 'Managing health and safety in construction' is the Approved Code of Practice (ACoP) and guidance published by the HSE specifically for CDM 2015. It provides practical guidance on how to comply with each regulation, and the ACoP sections carry a special legal status — if followed, duty holders are regarded as having complied with the law.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'HSE guidance document',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 25,
    question: 'Under CDM 2015, which of the following is NOT an example of construction work?',
    options: [
      'Erecting scaffolding for painting works',
      'Moving desks and computers within a finished office',
      'Laying a new gas main underground',
      'Demolishing an internal wall in a warehouse',
    ],
    correctAnswer: 1,
    explanation:
      'Moving furniture and equipment within a finished office is not construction work as defined by Regulation 2 of CDM 2015. Construction work involves the carrying out of building, civil engineering or engineering construction work and includes specific activities such as alteration, conversion, fitting out, commissioning, renovation, repair, upkeep, redecoration, maintenance, demolition, dismantling, and associated site preparation.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'What is not construction work',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 26,
    question:
      'What is the minimum number of contractors required on a project before a principal designer and principal contractor must be appointed?',
    options: [
      'Five — five or more contractors',
      'Three — three or more contractors',
      'Two — more than one contractor',
      'It is only required once the project becomes notifiable to the HSE',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulations 5(1)(a) and 5(1)(b) of CDM 2015, the client must appoint a principal designer and a principal contractor in writing where there will be more than one contractor working on the project. This means as soon as there are two or more contractors, these appointments become mandatory.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'PD and PC appointment trigger',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 27,
    question:
      'CDM 2015 revoked the Construction (Health, Safety and Welfare) Regulations 1996. Where are the equivalent welfare provisions now found?',
    options: [
      'In a separate set of welfare regulations published in 2015',
      'In Part 3 of CDM 2015',
      'In the Workplace (Health, Safety and Welfare) Regulations 1992',
      'In Schedule 2 of CDM 2015',
    ],
    correctAnswer: 3,
    explanation:
      'When CDM 2015 was introduced, the Construction (Health, Safety and Welfare) Regulations 1996 were revoked and their welfare provisions were incorporated directly into CDM 2015. Schedule 2 of CDM 2015 sets out the minimum welfare facilities that must be provided on construction sites, including sanitary conveniences, washing facilities, drinking water, changing rooms, and rest facilities.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Welfare provisions location',
    category: 'Introduction to CDM 2015',
  },

  // intermediate (9)
  {
    id: 28,
    question: "Under CDM 2015, what is meant by the term 'pre-construction phase'?",
    options: [
      'Any period during which design or preparatory work is carried out, which may continue into the construction phase',
      'The period that ends the moment any physical work begins on the construction site, whatever design work remains',
      'The period running from the client\'s first appointment of a designer up to the submission of the F10 notice',
      'The period during which planning permission and building control approval are obtained, before design begins',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 2 of CDM 2015 defines the 'pre-construction phase' as any period of time during which design or preparatory work is carried out for a project and which may continue during the construction phase. This is significant because it means the pre-construction phase overlaps with the construction phase — design work does not stop when building starts.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Pre-construction phase definition',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 29,
    question:
      'What is the legal status of the Approved Code of Practice (ACoP) sections within HSE publication L153?',
    options: [
      'They are legally binding in full, and any deviation from them is automatically a criminal offence',
      'Not compulsory, but a deviation can be used in court unless an equivalent standard is shown',
      'They are purely advisory and carry no weight whatsoever in any legal proceedings',
      'They apply only to notifiable projects and have no status at all on smaller projects',
    ],
    correctAnswer: 1,
    explanation:
      'An Approved Code of Practice (ACoP) has a special legal status under the Health and Safety at Work etc. Act 1974. If you follow the guidance in an ACoP, you are regarded as having complied with the relevant regulation. However, you are free to take other action provided you can demonstrate it achieves an equivalent or better standard of health and safety.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'ACoP legal status',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 30,
    question:
      'Which Regulation of CDM 2015 deals with the application of the Regulations to domestic clients?',
    options: [
      'Regulation 5',
      'Regulation 6',
      'Regulation 7',
      'Regulation 8',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 7 of CDM 2015 specifically addresses the application of CDM to projects for domestic clients. It sets out how client duties are transferred to contractors or principal contractors, and how a domestic client may choose to transfer their duties to the principal designer by written agreement.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Domestic client regulation number',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 31,
    question:
      "In the context of CDM 2015, what does a 'person-day' mean for the purposes of notification?",
    options: [
      'A calendar day on which any construction work takes place, however many workers are present',
      'An eight-hour working shift completed by any individual member of the construction workforce',
      'A day on which the whole workforce happens to be present on the site at the same time',
      'One day of work by one person, so ten workers on one day count as ten person-days',
    ],
    correctAnswer: 3,
    explanation:
      'For the purposes of Regulation 6 (notification), a person-day is any day on which one person carries out construction work. If 10 workers each work on the same day, that counts as 10 person-days. The 500 person-day threshold is therefore not 500 calendar days but the cumulative total of individual person-days of construction work.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Person-day definition',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 32,
    question: "Under CDM 2015, which of the following correctly describes a 'designer'?",
    options: [
      'Any person who, in the course of business, prepares or modifies a design, or instructs others to',
      'Only a registered architect or chartered engineer formally appointed to the project',
      'Any person who physically draws the construction drawings, but not those who specify materials',
      'The principal designer alone, with no other party on the project classed as a designer',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 2 of CDM 2015 defines a 'designer' broadly as any person (including a client, contractor or other person) who in the course or furtherance of a business carries out design work, prepares or modifies a design, or arranges for or instructs any person under their control to do so. This includes architects, engineers, quantity surveyors who specify materials, and even tradespeople who design elements of their own work.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Designer definition',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 33,
    question: "What does CDM 2015 Regulation 2 define as a 'project'?",
    options: [
      'Work that consists of the physical construction activity itself, excluding all planning, design and management',
      'Work that includes construction work plus all related planning, design and management to the end of the construction phase',
      'Work that has been notified to the HSE on Form F10 and for which a construction phase plan has been drawn up',
      'Work that involves more than one contractor, so that a principal designer and a principal contractor are appointed',
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 2 defines a 'project' as a project which includes or is intended to include construction work and includes all planning, design, management or other work involved in a project until the end of the construction phase. This broad definition ensures CDM duties cover the entire lifecycle from concept through to completion of construction.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Project definition',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 34,
    question:
      'A domestic client wishes to take on CDM client duties themselves rather than have them transfer to the contractor. Is this permitted under CDM 2015?',
    options: [
      'Yes — a domestic client can choose to carry out client duties by making a written declaration to the HSE',
      'Yes — a domestic client may enter into a written agreement with the principal designer to transfer duties to the principal designer, but cannot retain them personally',
      'No — domestic client duties must always transfer to the contractor or principal contractor',
      'No — domestic clients are exempt from all CDM duties',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 7 of CDM 2015, the default position is that domestic client duties transfer to the contractor (or principal contractor on multi-contractor projects). The only alternative is for the domestic client to enter a written agreement to transfer duties to the principal designer. CDM 2015 does not provide a mechanism for a domestic client to retain and perform the duties themselves.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Domestic client duty transfer',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 35,
    question: 'Under CDM 2015, when must the F10 notification be displayed on a construction site?',
    options: [
      'Posted to every worker at their home address before they first start work on site',
      'Submitted to the local authority, with a copy retained in the client head office',
      'Kept on file by the principal designer and produced only when requested by the HSE',
      'Displayed in the site office in a form readable by any worker on the construction site',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 6(3) of CDM 2015 requires the client to ensure that the notice (F10) is displayed in the construction site office so that it is readable by any worker engaged in the construction work on the site. This ensures transparency and that all site workers know who the key duty holders are.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'F10 display requirement',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 36,
    question:
      'Under CDM 2015, if a project starts with one contractor but later a second contractor is engaged, what must the client do?',
    options: [
      'Appoint a principal designer and principal contractor in writing as soon as practicable',
      'Nothing — the original single-contractor arrangements continue to apply unchanged',
      'Submit a fresh F10 notification but leave the existing appointments as they are',
      'Wait until the project becomes notifiable before making any new appointments',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 5 of CDM 2015 requires the client to appoint a principal designer and principal contractor in writing where it is reasonably foreseeable that more than one contractor will be working on the project. If this situation arises during the project, the client must make these appointments as soon as practicable after it becomes apparent that more than one contractor will be involved.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Late PD/PC appointment',
    category: 'Introduction to CDM 2015',
  },

  // advanced (4)
  {
    id: 37,
    question:
      "CDM 1994 introduced the role of 'Planning Supervisor'. In which subsequent version of CDM was this role abolished and what replaced it?",
    options: [
      'CDM 2007 replaced it with the Principal Designer',
      'CDM 2007 replaced it with the CDM Co-ordinator',
      'CDM 2015 replaced it with the CDM Co-ordinator',
      'CDM 2004 replaced it with the Site Safety Supervisor',
    ],
    correctAnswer: 1,
    explanation:
      'The Planning Supervisor role was introduced in CDM 1994 and was abolished when CDM 2007 came into force. CDM 2007 replaced it with the CDM Co-ordinator (CDMC). Subsequently, CDM 2015 abolished the CDMC and introduced the Principal Designer. The evolution was therefore: Planning Supervisor (1994) → CDM Co-ordinator (2007) → Principal Designer (2015).',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Historical role evolution',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 38,
    question:
      'Under CDM 2015 Regulation 5(4), what happens if the client fails to make the required appointments of principal designer and principal contractor?',
    options: [
      'The project is automatically halted by the HSE',
      'The contractor with the largest share of work assumes both roles',
      'The client must fulfil the duties of any duty holder they fail to appoint',
      "The HSE will appoint suitable persons at the client's expense",
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 5(4) of CDM 2015 states that where a client fails to appoint a principal designer or principal contractor, the client must fulfil the duties of those roles themselves. This is a significant provision because it means the client cannot escape CDM duties by simply failing to make appointments.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Client default duties',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 39,
    question: 'Regulation 8 of CDM 2015 sets out a general duty concerning which of the following?',
    options: [
      'The thresholds at which a project becomes notifiable to the HSE and the F10 notice must be submitted',
      'The minimum welfare facilities that must be provided on every construction site throughout the works',
      'The way in which client duties pass to the contractor or principal contractor on a domestic client project',
      'The general duty to ensure the skills, knowledge, experience and organisational capability of those engaged',
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 8 of CDM 2015 is the overarching 'competence' regulation (although CDM 2015 avoids the term 'competence' used in CDM 2007). It requires that duty holders must not appoint or engage a designer, principal designer, contractor or principal contractor unless they are satisfied that the person has the skills, knowledge, training and experience, and (for organisations) the organisational capability necessary to fulfil the role.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Regulation 8 — skills and capability',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 40,
    question:
      'Under CDM 2015, Regulation 4(1) states that where Regulations impose duties, those duties apply in relation to which specific standard?',
    options: [
      'So far as is reasonably practicable',
      'An absolute standard — the duty must be complied with regardless of cost',
      'So far as is practicable',
      'To a standard that the HSE considers acceptable',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 4(1) of CDM 2015 states that where a duty is placed on a person by Part 4, that duty extends only so far as is reasonably practicable. For Part 2 and Part 3 duties, the standard varies — some use 'must ensure' (effectively absolute), while others use 'so far as is reasonably practicable'. Understanding the qualification applied to each duty is critical for compliance.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Reasonably practicable standard',
    category: 'Introduction to CDM 2015',
  },

  // =======================================================================
  // CATEGORY 2 — Duty Holders & Their Roles — 40 questions (id 41–80)
  // =======================================================================

  // --- Questions 41–60 (batch 1): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 41,
    question: 'Under CDM 2015, how many types of duty holder are identified?',
    options: [
      'Three',
      'Five',
      'Four',
      'Six',
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 identifies five types of duty holder: the client, the principal designer, the principal contractor, designers, and contractors. Workers also have duties under CDM but are not formally classified as 'duty holders' in the same way.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Number of duty holders',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 42,
    question: "Who is the 'client' under CDM 2015?",
    options: [
      'The person or organisation who directly employs the construction workers',
      'The local authority that grants planning permission',
      'Any person for whom a construction project is carried out',
      'The person who finances the construction project',
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 2 of CDM 2015 defines the 'client' as any person for whom a construction project is carried out. This is a broad definition — it does not matter whether the client is a company, individual, public body, or other entity. The key test is whether the construction work is being done for them.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Client definition',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 43,
    question: 'What is the primary role of the principal contractor under CDM 2015?',
    options: [
      'To prepare the pre-construction information and coordinate the project design team',
      'To notify the project to the HSE and obtain building control approval before work',
      'To prepare and maintain the health and safety file throughout the whole project',
      'To plan, manage, monitor and coordinate health and safety in the construction phase',
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 13 of CDM 2015, the principal contractor has the duty to plan, manage, monitor and coordinate health and safety in the construction phase of the project. This includes liaising with the principal designer, preparing the construction phase plan, organising cooperation between contractors, and ensuring suitable site inductions are provided.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Principal contractor role',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 44,
    question: 'Under CDM 2015, who must the principal designer be?',
    options: [
      'A designer with control over the pre-construction phase of the project',
      'Any contractor who holds a current CSCS card and relevant insurance',
      'An independent health and safety consultant with no design involvement',
      'The quantity surveyor responsible for the bill of quantities',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 5(1)(a) of CDM 2015 requires the client to appoint a designer with control over the pre-construction phase as the principal designer. The key requirement is that the person or organisation must be a designer (not merely an administrator) and must have the ability to coordinate and control the pre-construction phase, including design-related health and safety matters.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Principal designer requirement',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 45,
    question: "Under CDM 2015, who is a 'contractor'?",
    options: [
      'A main contractor holding the head construction contract directly with the client',
      'Any person who, as a business, carries out, manages or controls construction work',
      'Only a business that directly employs five or more construction workers itself',
      'Any person who supplies plant and materials to a site but does no physical work',
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 2 of CDM 2015 defines a 'contractor' as any person who, in the course or furtherance of a business, carries out, manages or controls construction work. This is a very broad definition that includes main contractors, sub-contractors, specialist contractors, and sole traders carrying out construction work.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Contractor definition',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 46,
    question: 'Under CDM 2015, are workers on a construction site considered to have any duties?',
    options: [
      'No — only duty holders such as the client and contractors carry duties, not workers',
      'Yes — but only those workers who hold a recognised CSCS card carry any duties',
      'Yes — they must cooperate, report dangers and use any protective measures provided',
      'No — workers are protected by CDM but the Regulations place no duties upon them',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 14(2) of CDM 2015, read alongside Part 3 and the general duties under HSWA 1974 (sections 7 and 8), means workers must cooperate with their employer and any other person to enable compliance with CDM, report dangerous conditions, and use any work equipment and protective measures provided to them properly.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Worker duties',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 47,
    question:
      'Under CDM 2015, must the principal designer and principal contractor be appointed in writing?',
    options: [
      'No — verbal appointments are sufficient',
      'Only written appointments are needed for notifiable projects',
      'Written appointments are recommended but not legally required',
      'Yes — Regulation 5(1) requires both to be appointed in writing',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 5(1) of CDM 2015 explicitly requires the client to appoint in writing a designer with control over the pre-construction phase as principal designer, and a contractor as principal contractor. The written appointment must be made as soon as practicable and in any event before the construction phase begins.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Written appointments',
    category: 'Duty Holders & Their Roles',
  },

  // intermediate (9)
  {
    id: 48,
    question:
      'Under CDM 2015 Regulation 4(5), which duty holder must ensure that the principal designer and principal contractor comply with their duties?',
    options: [
      'The client',
      'The HSE',
      'The other duty holders collectively',
      'Each duty holder is responsible only for their own compliance',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4(5) places a specific duty on the client to ensure that the principal designer and principal contractor comply with their respective duties under CDM 2015. This means the client has an overseeing role and cannot simply appoint and walk away — they must take reasonable steps to ensure those they appoint are fulfilling their obligations.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Client oversight duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 49,
    question:
      'Regulation 11 sets out the duties of a principal designer. Which of the following is NOT a principal designer duty?',
    options: [
      'Planning, managing, monitoring and coordinating health and safety in the pre-construction phase',
      'Preparing the construction phase plan',
      "Liaising with the principal contractor for the duration of the principal designer's appointment",
      'Ensuring all designers comply with their duties under Regulation 9',
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 12(1), it is the principal contractor (not the principal designer) who must draw up the construction phase plan. The principal designer's duties under Regulation 11 include planning, managing, monitoring and coordinating health and safety in the pre-construction phase; ensuring designers comply with Regulation 9; preparing and providing pre-construction information; and liaising with the principal contractor.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Principal designer duties',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 50,
    question:
      "Under Regulation 12, what is the principal contractor's duty regarding the construction phase plan?",
    options: [
      'To approve a construction phase plan drawn up by the principal designer before work starts',
      'To submit the construction phase plan to the HSE for formal sign-off before work begins',
      'To draw up the construction phase plan, or arrange for it, before the construction phase begins',
      'To pass the construction phase plan to the client for them to finalise and then issue',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 12(1) of CDM 2015 requires the principal contractor to draw up a construction phase plan, or make arrangements for a construction phase plan to be drawn up, as soon as is practicable prior to setting up a construction site. The plan must set out the health and safety arrangements and site rules for the construction phase.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Construction phase plan responsibility',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 51,
    question:
      'Regulation 13(2) requires the principal contractor to ensure which of the following is provided to every worker on site?',
    options: [
      'A copy of the health and safety file',
      'A written risk assessment for their specific trade',
      'Personal protective equipment',
      'A suitable site induction',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 13(2) of CDM 2015 requires the principal contractor to ensure that a suitable site induction is provided to every worker carrying out construction work on the site. The induction must include the health and safety arrangements for the site, welfare arrangements, and any site-specific risks.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Site induction duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 52,
    question:
      "Under CDM 2015, what are the client's duties regarding the provision of pre-construction information?",
    options: [
      'It must be provided as soon as practicable to every designer and contractor being considered',
      'It need only be provided to the principal contractor once work has started on the site',
      'The client has no duty regarding it, as this rests solely with the principal designer',
      'It must be provided only on projects that are notifiable to the HSE under Regulation 6',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 4(4) of CDM 2015 requires the client to provide pre-construction information as soon as is practicable to every designer and contractor appointed, or being considered for appointment, to the project. This information is essential for designers and contractors to plan their work safely. The client does not produce the formal PCI pack — that is the principal designer's role — but the client must make relevant information available.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Client PCI duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 53,
    question: 'Under Regulation 9(1), what general duty does CDM 2015 place on all designers?',
    options: [
      'To draw up the construction phase plan and the site rules before work begins and keep them under review as the construction phase progresses',
      'To take into account the general principles of prevention when carrying out design work and avoid foreseeable risks so far as is reasonably practicable',
      'To supervise construction work on site, enforce the use of protective equipment and stop any activity that puts a worker at risk of injury',
      'To notify the project to the HSE on Form F10, display the notice on site and update it whenever any of the project particulars change',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 9(1) of CDM 2015 requires all designers to take into account the general principles of prevention (set out in Schedule 1) and any pre-construction information when preparing or modifying a design. Regulation 9(2) requires designers to eliminate, so far as is reasonably practicable, foreseeable risks to any person carrying out or affected by construction work, and where this is not possible, to take steps to reduce or control risks.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'General designer duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 54,
    question:
      'Under CDM 2015 Regulation 15, what duty is placed on contractors regarding cooperation and consultation with workers?',
    options: [
      'Contractors must provide every worker with personal protective equipment and a written method statement, but need not consult them at all',
      'Contractors must consult only those workers who belong to a recognised trade union, through representatives appointed by that union alone',
      'Contractors must provide workers with appropriate directions, instructions and information, and consult them in good time on health and safety matters',
      'Contractors need only pass information to the principal contractor, who carries the whole consultation duty for everyone working on the site',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 15 of CDM 2015 requires every contractor to provide each worker under their control with appropriate supervision, instructions and information. Regulation 14(1) requires contractors to consult workers or their representatives in good time on matters connected with the project that may affect their health, safety or welfare, including planning, organisation and risk management.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Contractor worker consultation',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 55,
    question:
      'Under CDM 2015, can the client also be the principal designer or principal contractor?',
    options: [
      'No — the client must always appoint an independent principal designer and principal contractor in writing before work starts',
      'Yes — but only on projects that are not notifiable to the HSE and where a single contractor carries out all the work',
      'No — a single organisation may never hold more than one CDM duty holder role on the same construction project at any time',
      'Yes — a client can fulfil these roles provided they have the necessary skills, knowledge, experience and organisational capability',
    ],
    correctAnswer: 3,
    explanation:
      'CDM 2015 permits the same person or organisation to hold multiple duty holder roles simultaneously. A client who has the necessary skills, knowledge, training, experience and organisational capability (as required by Regulation 8) can also be the principal designer, principal contractor, or both. This commonly occurs on developer-led projects where the developer organisation has in-house design and construction capability.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Multiple CDM roles',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 56,
    question:
      'Under Regulation 13(4), the principal contractor must ensure which of the following regarding the health and safety file?',
    options: [
      'That the principal designer is provided with any information relevant to the health and safety file',
      'That the health and safety file is submitted to the HSE at the end of the project',
      'That the client approves the contents of the health and safety file before handover',
      'That the health and safety file is destroyed once the structure is occupied',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 12(7) of CDM 2015 requires the principal contractor to provide the principal designer with any information in the principal contractor's possession relevant to the health and safety file. The principal designer is responsible for preparing, reviewing, updating and revising the health and safety file — but the principal contractor must feed relevant information into it.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PC health and safety file duty',
    category: 'Duty Holders & Their Roles',
  },

  // advanced (4)
  {
    id: 57,
    question:
      "Under Regulation 13, in what circumstances does the principal contractor's duty extend to ensuring adequate welfare facilities are provided throughout the construction phase?",
    options: [
      'Only on notifiable projects, where the F10 notice has been sent to the HSE before work begins',
      'On every project — welfare facilities must be provided throughout in line with Schedule 2',
      'On projects where the construction phase is expected to last longer than 30 working days',
      'On sites where more than 20 workers will be present at any one time during the works',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 13(4)(c) requires the principal contractor to ensure welfare facilities complying with Schedule 2 are provided from the start of the construction phase and maintained throughout. This duty applies on every project where a principal contractor is appointed, regardless of project size or duration.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'PC welfare facilities duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 58,
    question:
      'Under Regulation 12, the principal designer must hand over the health and safety file. To whom, and at what points, must the file be passed?',
    options: [
      'To the HSE as soon as the construction phase begins, and again to the client once the structure is handed over for use',
      'To the principal contractor at the start of the construction phase, and never directly to the client at any stage of the project',
      "To the principal contractor if the principal designer's appointment ends early, and otherwise to the client at the end of the project",
      'To the local authority building control department at completion, and to the client only if they request a copy in writing',
    ],
    correctAnswer: 2,
    explanation:
      "Under Regulation 12(8), if the principal designer's appointment concludes before the end of the project, they must pass the health and safety file to the principal contractor, who then maintains it (12(9)). Under Regulation 12(10), at the end of the project the principal designer (or the principal contractor where there is no principal designer) must pass the file to the client.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'H&S file handover timing',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 59,
    question:
      "Under CDM 2015, if the principal designer's appointment ends before the project is complete, what happens to the duties regarding the health and safety file?",
    options: [
      'The duties cease — no one is responsible for the file until a new principal designer is appointed',
      'The duties transfer to the client automatically',
      'The client must immediately appoint a new principal designer',
      'The duties transfer to the principal contractor under Regulation 12',
    ],
    correctAnswer: 3,
    explanation:
      "Under Regulations 12(8) and 12(9) of CDM 2015, where the principal designer's appointment finishes before the end of the project, the file is passed to the principal contractor, who must then ensure the health and safety file is appropriately reviewed, updated and revised, and deliver it to the client at the end of the project. The duties regarding the file effectively transfer from the principal designer to the principal contractor.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'H&S file duty transfer',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 60,
    question:
      'Regulation 8(4) states that a designer or contractor must not accept an appointment unless they fulfil which condition?',
    options: [
      'They are satisfied they have, or will obtain, the skills, knowledge, experience and capability for the role',
      'They have obtained professional indemnity insurance to the value specified by the client',
      'They have been formally vetted and approved in advance by the Health and Safety Executive',
      'They hold a current CSCS card and are registered with a recognised industry trade body',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 8(4) of CDM 2015 provides a reciprocal duty: not only must the person making the appointment be satisfied about the appointee's capability (Regulation 8(1)), but the appointee themselves must not accept the appointment unless they are satisfied they fulfil, or will obtain, the necessary skills, knowledge, experience and organisational capability. This is a two-way obligation.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Reciprocal competence duty',
    category: 'Duty Holders & Their Roles',
  },

  // --- Questions 61–80 (batch 2): ~7 basic, ~9 intermediate, ~4 advanced ---

  // basic (7)
  {
    id: 61,
    question:
      'Under CDM 2015, which duty holder is responsible for making arrangements for managing a project so it is carried out without risks to health and safety?',
    options: [
      'The principal contractor',
      'The client',
      'The principal designer',
      'The HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 4(1) of CDM 2015 places a duty on the client to make suitable arrangements for managing a project, including the allocation of sufficient time and other resources. The client has an overarching responsibility to ensure the project is set up and resourced so that it can be carried out without risks to the health or safety of any person affected by the project.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Client management arrangements',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 62,
    question:
      'A self-employed joiner working on a construction site is classified as which duty holder under CDM 2015?',
    options: [
      'A worker only',
      'A designer',
      'A contractor',
      'A domestic client',
    ],
    correctAnswer: 2,
    explanation:
      'Under CDM 2015, a self-employed person who carries out construction work in the course or furtherance of a business is classified as a contractor. The definition of contractor in Regulation 2 does not distinguish between employed and self-employed — anyone who carries out, manages or controls construction work as a business is a contractor.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Self-employed as contractor',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 63,
    question:
      'Under CDM 2015, what must the client do before allowing the construction phase to begin?',
    options: [
      'Personally write the construction phase plan and issue it to the appointed contractor',
      'Obtain written confirmation from the HSE that the construction project may proceed',
      'Complete and sign off the health and safety file in advance of any work starting',
      'Ensure a construction phase plan has been drawn up by the contractor or principal contractor',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4(6) of CDM 2015 requires the client to ensure that the construction phase does not start unless a construction phase plan has been drawn up by the contractor (for single-contractor projects) or the principal contractor (for multi-contractor projects). The client does not need to approve the plan but must be satisfied it exists before construction work begins.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Client duty before construction phase',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 64,
    question: 'Which Regulation of CDM 2015 sets out the duties of clients?',
    options: [
      'Regulation 4',
      'Regulation 8',
      'Regulation 11',
      'Regulation 15',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4 of CDM 2015 (which falls within Part 2 — Client duties) sets out the duties of clients. It covers making suitable management arrangements, providing pre-construction information, ensuring appointments are made, ensuring the construction phase does not start without a construction phase plan, and ensuring welfare facilities are provided.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Client duties regulation number',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 65,
    question:
      'Under CDM 2015, who is responsible for ensuring there is cooperation between all persons working on a project?',
    options: [
      'The principal contractor alone, as the only party present during the construction phase',
      'All duty holders, who must cooperate with everyone concerned with the project',
      'The client alone, who must direct all the other parties on the project to cooperate',
      'The HSE, which coordinates cooperation between the duty holders on each project',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 8(3) of CDM 2015 requires every person with a duty under the Regulations to cooperate with any other person working on or in connection with the project to the extent necessary to enable any person with a duty under the Regulations to fulfil that duty. This mutual cooperation duty applies to all duty holders, not just one specific party.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Cooperation duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 66,
    question:
      'Under CDM 2015, a quantity surveyor who specifies particular materials or products in a bill of quantities is classified as which type of duty holder?',
    options: [
      'A contractor',
      'A client',
      'A designer',
      'They have no CDM duties',
    ],
    correctAnswer: 2,
    explanation:
      "Under CDM 2015, 'design' includes drawings, design details, specifications and bills of quantities. A quantity surveyor who specifies particular materials or products is making design decisions that could affect health and safety (for example, specifying a heavy cladding material that creates manual handling risks). They are therefore a 'designer' under Regulation 2 and must comply with designer duties under Regulation 9.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'QS as designer',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 67,
    question:
      'Under CDM 2015, which duty holder has the duty to ensure that suitable welfare facilities are provided for workers from the start of the construction phase?',
    options: [
      'The local authority',
      'The principal designer',
      'Each individual worker',
      'The client',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4(7) of CDM 2015 places a duty on the client to ensure that welfare facilities which comply with Schedule 2 are provided throughout the construction phase. On projects with a principal contractor, this duty is carried out in practice by the principal contractor, but the overarching legal duty sits with the client.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Client welfare duty',
    category: 'Duty Holders & Their Roles',
  },

  // intermediate (9)
  {
    id: 68,
    question:
      'Under Regulation 15(5), what must a contractor do if they identify that any work is being carried out that puts any person at risk of injury?',
    options: [
      'Take appropriate steps to prevent that work or activity from continuing, including by stopping work if necessary',
      'Record the matter in the site diary and raise it at the next scheduled progress meeting with the client',
      'Report the matter to the HSE on Form F10 and wait for their instruction before taking any action on site',
      'Continue the work but issue additional personal protective equipment to everyone exposed to the risk',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 15(5) of CDM 2015 requires that where a contractor identifies that work is being carried out that puts any person in danger, they must take appropriate steps to prevent further risk, including stopping that work if necessary. This is a proactive duty — contractors cannot simply ignore unsafe activities they observe.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Contractor stop-work duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 69,
    question:
      'Under Regulation 15(2), what must every contractor ensure before allowing a worker to carry out construction work?',
    options: [
      'That the worker holds a current and valid CSCS card for their trade and has signed the site rules',
      'That the worker has appropriate supervision, instructions and information to carry out the work safely',
      'That the worker has read and signed a copy of the construction phase plan for the project',
      'That the worker is directly employed by the contractor rather than working as self-employed',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 15(2) of CDM 2015 requires every contractor to provide each worker under their control with appropriate supervision, instructions and information so that construction work can be carried out, so far as is reasonably practicable, without risks to the health and safety of any person. CDM does not mandate CSCS cards — it is the provision of adequate information, instruction, training and supervision that matters.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Contractor supervision duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 70,
    question:
      'Under CDM 2015 Regulation 9(3)(b), what must a designer provide with their design to assist other duty holders?',
    options: [
      'A fully priced bill of quantities for every element of the structure, broken down by trade package',
      'Written confirmation that the design has been approved by building control and the planning authority',
      'Information about risks that have not been eliminated and the design principles or assumptions behind the design',
      'A signed statement confirming that the design leaves no residual health and safety risks on site',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 9(3)(b) requires designers to provide sufficient information about the design, its construction or maintenance to adequately assist clients, other designers and contractors to comply with their CDM duties. This includes information about significant risks that could not be eliminated through design, the principles behind the design, and any assumptions that affect health and safety during construction, use or maintenance.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Designer information provision',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 71,
    question:
      'Under Regulation 14, the principal contractor must consult and engage with workers and their representatives. Which specific mechanism does CDM 2015 require?',
    options: [
      'A statutory works council elected by secret ballot of the whole workforce, meeting monthly to approve the construction phase plan',
      'A weekly written report from every worker confirming compliance with the site rules and with any changes made to the construction phase plan',
      'A trade union safety representative appointed for every ten workers on site, who alone may raise health and safety concerns with the contractor',
      'Arrangements that enable the principal contractor and workers to cooperate effectively in developing, promoting and checking health and safety measures',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 14 requires the principal contractor to make and maintain arrangements which will enable the principal contractor and workers engaged in construction work to cooperate effectively in developing, promoting and checking the effectiveness of measures to ensure the health, safety and welfare of the workers. CDM does not prescribe the specific mechanism — it could be toolbox talks, safety forums, notice boards or other appropriate methods.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PC worker engagement',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 72,
    question:
      'Under Regulation 15(8), what must a contractor not begin work on a construction site unless they have been provided with?',
    options: [
      'Access to the relevant parts of the construction phase plan',
      'A copy of the completed health and safety file for the project',
      'Written confirmation from the HSE that the project has been notified',
      'A signed copy of the client contract for the works',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 15(8) of CDM 2015 states that a contractor must not carry out construction work on a project unless satisfied that the principal contractor (or contractor for single-contractor projects) has drawn up a construction phase plan. In practice, each contractor needs access to the relevant parts of the construction phase plan that relate to their work so they can plan and execute their activities safely.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Contractor CPP access',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 73,
    question:
      'Under Regulation 13(3)(a), what must the principal contractor ensure regarding the boundary of a construction site?',
    options: [
      'That the perimeter is left open so emergency services can gain rapid access at all times',
      'That the perimeter is identified by suitable signs and secured from unauthorised access',
      'That the boundary is marked only by temporary tape, removed at the end of each working day',
      'That a security guard is stationed at the perimeter on every project, regardless of size',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 13(3)(a) requires the principal contractor to ensure that the construction site, or any part of it where construction work is being carried out, is secured from unauthorised access so far as is reasonably practicable, and is identified by suitable signs. This is to protect members of the public and prevent unauthorised persons from entering areas where they may be at risk.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Site security duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 74,
    question:
      'If a design is changed during the construction phase, whose CDM duty is it to take account of health and safety implications of that change?',
    options: [
      'The principal contractor alone, because the change occurs during the construction phase',
      'The client, because they instructed the change and ultimately own the project',
      'The designer who modifies it, as Regulation 9 applies whenever a design is changed',
      'No one, because designer duties cease once the construction phase has started',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 9 of CDM 2015, the duties on designers apply whenever a designer in the course of a business prepares or modifies a design. This applies throughout the project, including during the construction phase. Any designer who changes a design must consider the health and safety implications, apply the general principles of prevention, eliminate foreseeable risks so far as is reasonably practicable, and provide information about remaining risks.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Design changes during construction',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 75,
    question:
      'Regulation 15(9) requires every contractor to comply with which specific provisions?',
    options: [
      'The instructions of the client and the relevant requirements of the signed building contract',
      'The terms of the F10 notification submitted to the HSE and the site rules set by the client',
      'The recommendations made in the most recent HSE inspection report and the client\'s brief',
      'The directions of the principal designer and relevant requirements of the construction phase plan',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 15(9) of CDM 2015 requires every contractor to comply with the directions given by the principal designer or the principal contractor, and with the relevant parts of the construction phase plan. This chain of command ensures that the coordination and management arrangements put in place by the principal designer and principal contractor are actually followed by all contractors on site.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Contractor compliance with directions',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 76,
    question:
      'Under CDM 2015, an electrician who decides the route for cable containment through a building is acting as which type of duty holder when making that decision?',
    options: [
      'A designer, because choosing the cable route is a design decision affecting health and safety',
      'A worker only, because routing decisions made on site never count as design under CDM',
      'A principal contractor, because the routing decision is made during the construction phase',
      'Neither a designer nor a contractor, as installation choices fall outside CDM entirely',
    ],
    correctAnswer: 0,
    explanation:
      "Under CDM 2015, 'design' includes specifications, drawings and details relating to the arrangement or layout of work. When an electrician decides the route for cable containment, they are making design decisions that could affect health and safety (for example, routing cables through a fire compartment wall or at height). At that point, they are acting as a designer and must comply with designer duties under Regulation 9.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Tradesperson as designer',
    category: 'Duty Holders & Their Roles',
  },

  // advanced (4)
  {
    id: 77,
    question:
      'Under Regulation 5(3), if the client does not appoint a principal designer on a project with more than one contractor, who fulfils the principal designer duties?',
    options: [
      "The HSE appoints a principal designer at the client's expense",
      "The client must fulfil the principal designer's duties themselves",
      "The principal contractor automatically assumes the principal designer role",
      "The project must be halted until a principal designer is appointed",
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 5(4) of CDM 2015 states that where the client fails to appoint a principal designer or principal contractor as required, the client must fulfil those duties. This means an uninformed client who fails to make appointments does not escape the law — they inherit all the CDM duties of the roles they failed to appoint, which could leave them significantly exposed.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Client default PD duties',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 78,
    question:
      'Under CDM 2015, Regulation 10 applies to designers on projects involving only one contractor. What specific additional duty does it place on the contractor?',
    options: [
      'The contractor must notify the project to the HSE before any design work on it is carried out',
      'The contractor must appoint a principal designer in writing before the design work starts',
      'The contractor must ensure a construction phase plan is drawn up before setting up a construction site',
      'The contractor must obtain the client\'s written approval for every design decision taken',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 15(4) (read with Regulation 10 for single-contractor projects) requires that where there is only one contractor, that contractor must ensure a construction phase plan is drawn up before the construction site is set up. On single-contractor projects there is no principal contractor, so this duty falls directly on the sole contractor.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Single-contractor CPP duty',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 79,
    question:
      'Under CDM 2015, Regulation 12(3) states the construction phase plan must be appropriate to the nature and size of the project and the risks involved. Which of the following does the Regulation specifically require it to set out?',
    options: [
      'A complete list of every worker and sub-contractor expected on the project',
      'A priced bill of quantities together with the full project programme of works',
      'Copies of all designers risk assessments and the full pre-construction information',
      'The health and safety arrangements, site rules, and specific measures for Schedule 3 work',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12(3) requires the construction phase plan to set out the health and safety arrangements and site rules taking account of the industrial activities at the construction site, and where applicable, must include specific measures concerning work falling within Schedule 3. Schedule 3 lists particularly high-risk work activities (such as work at height, excavations near underground services, work with explosives, etc.).',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'CPP requirements and Schedule 3',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 80,
    question:
      'Regulation 9(2) of CDM 2015 sets out a design hierarchy for managing risks. What is the correct order of this hierarchy?',
    options: [
      'Eliminate foreseeable risks where practicable → reduce those that remain → inform others',
      'Provide information about the risks → reduce the risks → eliminate them where practicable',
      'Transfer the risk to the contractor → insure against the risk → accept the residual risk',
      'Assess the risk → record the risk → review the risk at the very end of the project',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 9(2) of CDM 2015 establishes the design risk hierarchy: first, a designer must eliminate foreseeable risks to the health or safety of any person so far as is reasonably practicable; where elimination is not possible, they must reduce or control those risks through design measures; and they must provide information about any significant remaining risks. This mirrors the general 'eliminate → reduce → control → inform' hierarchy used throughout health and safety management.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Design risk hierarchy',
    category: 'Duty Holders & Their Roles',
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
      'Principal Contractor Instructions',
      'Pre-Construction Information',
      'Project Compliance Information',
      'Planning and Construction Index',
    ],
    correctAnswer: 1,
    explanation:
      'PCI stands for Pre-Construction Information. Under CDM 2015, pre-construction information is information about the project that is already known or can reasonably be obtained, and which the client must provide to designers and contractors so they can plan their work safely. It includes information about the site, existing structures, hazards, previous use, and any client requirements.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'PCI abbreviation',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 82,
    question:
      'Under CDM 2015, who has the primary duty to provide pre-construction information to designers and contractors?',
    options: ['The principal designer', 'The principal contractor', 'The client', 'The HSE'],
    correctAnswer: 2,
    explanation:
      'Regulation 4(4) of CDM 2015 places the duty on the client to provide pre-construction information as soon as is practicable to every designer and contractor appointed or being considered for appointment to the project. The principal designer then takes this information and coordinates it with other pre-construction information to produce a comprehensive PCI pack.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'PCI duty holder',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 83,
    question: 'What is a Construction Phase Plan (CPP)?',
    options: [
      'A record of all accidents and near-misses that occur during the construction phase',
      'The information needed for future maintenance and demolition of the completed structure',
      'A schedule of the prices and quantities for each element of the construction work',
      'A document setting out the health and safety arrangements and site rules for the build',
    ],
    correctAnswer: 3,
    explanation:
      'The Construction Phase Plan (CPP) is a document that sets out the health and safety arrangements, site rules, and specific measures for managing risks during the construction phase. Under Regulation 12(1), the principal contractor (or sole contractor on single-contractor projects) must draw it up before the construction phase begins.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'CPP definition',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 84,
    question: 'Under CDM 2015, what is the health and safety file?',
    options: [
      'A file of information needed for future work on the structure, such as maintenance or demolition',
      'A file containing the daily site records, timesheets and delivery notes for the construction phase',
      'A file holding all the risk assessments and method statements used during the build',
      'A file recording every health and safety training certificate held by the workforce',
    ],
    correctAnswer: 0,
    explanation:
      'The health and safety file is a document that contains information relating to the project which is likely to be needed during any subsequent construction work to the structure, including cleaning, maintenance, alteration, refurbishment or demolition. Under Regulation 11(5), the principal designer (or principal contractor after PD appointment ends) prepares and maintains it, and it is passed to the client at the end of the project.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'H&S file definition',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 85,
    question: 'Under CDM 2015, when must the construction phase plan be in place?',
    options: [
      'Within the first week of construction',
      'Before the construction phase begins',
      "Within 28 days of the principal contractor's appointment",
      'Before the project is notified to the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 12(1) of CDM 2015 requires the principal contractor (or contractor on single-contractor projects) to draw up a construction phase plan, or make arrangements for it to be drawn up, before the construction phase begins. Regulation 4(6) also requires the client to ensure that the construction phase does not start until a construction phase plan is in place.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'CPP timing',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 86,
    question:
      'At the end of a construction project, to whom must the health and safety file be handed over?',
    options: [
      'The HSE',
      'The principal designer',
      'The client',
      'The local building control authority',
    ],
    correctAnswer: 2,
    explanation:
      "Under Regulation 12(8) of CDM 2015, the principal contractor must pass the health and safety file to the client at the end of the project. If the principal designer's appointment continues to the end of the project, Regulation 11(6) requires the principal designer to pass it to the client. In either case, the client is the ultimate recipient and custodian of the file.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'H&S file handover',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 87,
    question:
      'Under CDM 2015, who is responsible for drawing up the construction phase plan on a project with more than one contractor?',
    options: [
      'The client',
      'The principal designer',
      'Each contractor for their own work',
      'The principal contractor',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12(1) of CDM 2015 places the duty to draw up the construction phase plan (or make arrangements for it to be drawn up) on the principal contractor. On projects with only one contractor, Regulation 15(4) places this duty on that sole contractor. The client does not produce the CPP, but must ensure it is in place before the construction phase begins.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'CPP authorship',
    category: 'Pre-Construction & Planning',
  },

  // intermediate (9)
  {
    id: 88,
    question:
      'Which of the following would typically be included in pre-construction information provided by the client?',
    options: [
      'Existing site information such as ground conditions, structures, asbestos and survey results',
      'A complete record of all accidents and near-misses from the contractor previous projects',
      'The detailed construction phase plan and the method statements for each individual trade',
      'The names and qualifications of every worker expected to attend the construction site',
    ],
    correctAnswer: 0,
    explanation:
      "Pre-construction information under CDM 2015 should include details about the project such as the client's brief, existing site information (ground conditions, existing structures and services, contamination, hazardous substances such as asbestos), information from any previous health and safety file, and the client's requirements for health and safety. This information enables designers and contractors to plan their work safely.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PCI typical content',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 89,
    question:
      "Under CDM 2015, the construction phase plan must be 'proportionate to the risks involved'. What does this mean in practice?",
    options: [
      'Every plan must follow the same standard template, whatever the size or risk of the project',
      'A small, simple project requires a simpler plan than a large, complex project with significant risks',
      'A plan must run to at least fifty pages before it can be treated as adequate for a site',
      'The level of detail is fixed by the HSE according to the value of the construction contract',
    ],
    correctAnswer: 1,
    explanation:
      'The ACoP (L153) explains that the construction phase plan must be proportionate to the nature and size of the project and the risks involved. For a small, simple project, the plan may be a few pages covering the key arrangements. For a large, complex project involving multiple contractors and high-risk activities, a much more detailed plan will be needed. The focus should be on the specific risks and arrangements for that particular project.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CPP proportionality',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 90,
    question: 'Which of the following is typically included in a construction phase plan?',
    options: [
      'As-built drawings, details of hidden services, and a register of residual hazards for future work',
      'A priced tender, the building contract, and the programme of payments to the contractor',
      'Project description, management structure, site rules, monitoring and emergency procedures',
      'The maintenance manuals, warranties, and operating instructions for installed equipment',
    ],
    correctAnswer: 2,
    explanation:
      'The construction phase plan typically includes: a description of the project; the management structure and responsibilities; the health and safety aims for the project; site rules; arrangements for controlling significant site risks; the health and safety induction arrangements; welfare provision; arrangements for monitoring compliance; emergency procedures; and specific measures for activities listed in Schedule 3 (e.g. work at height, confined spaces, working near services).',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CPP typical content',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 91,
    question:
      'Under CDM 2015, what role does the principal designer play in relation to pre-construction information?',
    options: [
      'They have no role in pre-construction information, as it is solely a duty of the client',
      'They must keep the pre-construction information confidential from all the contractors',
      'They simply forward the pre-construction information on to the principal contractor',
      'They manage the pre-construction phase and ensure PCI is compiled and provided to those who need it',
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 11(2), the principal designer must plan, manage, monitor and coordinate the pre-construction phase, including identifying, eliminating or controlling foreseeable risks. Regulation 11(4) specifically requires the principal designer to ensure that all designers are provided with pre-construction information relevant to their work. The PD takes the raw information from the client and ensures it is compiled, coordinated and distributed effectively.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PD role in PCI',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 92,
    question:
      'Under CDM 2015, the health and safety file must be kept available for inspection by which parties?',
    options: [
      'Anyone who may need it for future work on the structure, including later designers and contractors',
      'Only the principal designer who prepared the file, who keeps it once the project ends',
      'The HSE alone, which retains the file as a statutory record once the project is complete',
      'The original client alone, who must not release it to any future owner of the structure',
    ],
    correctAnswer: 0,
    explanation:
      'Once the health and safety file is handed to the client, the client has a duty under Regulation 4(8) to keep it available for inspection by any person who may need it to comply with any legal requirement. This includes future designers, contractors, facilities managers, or any person carrying out future construction work (maintenance, refurbishment, demolition) on the structure.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'H&S file availability',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 93,
    question:
      "Under CDM 2015, must the construction phase plan be a 'living document' that is updated during the project?",
    options: [
      'No — once it is approved before the construction phase, the plan must not be altered',
      'Yes — it must be reviewed, updated and revised as necessary throughout the project',
      'No — the plan is fixed by the client and only the HSE may authorise any changes',
      'Yes — but only if a serious accident occurs that requires the plan to be rewritten',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 12(4) of CDM 2015 requires the principal contractor to ensure that the construction phase plan is appropriately reviewed, updated and revised from time to time so that it continues to be sufficient throughout the construction phase. As the project progresses, new risks may emerge, contractors may change, and the plan must be kept current and relevant.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CPP as living document',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 94,
    question:
      'Under Regulation 4(4), what specific timing is required for the provision of pre-construction information by the client?',
    options: [
      'Within 28 days of the construction phase beginning, to the principal contractor and principal designer',
      'After the principal contractor has been appointed in writing, and then to that contractor alone',
      'As soon as is practicable to every designer and contractor appointed or being considered for appointment',
      'No later than the date the F10 notification is submitted to the HSE, and to designers alone',
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 4(4) of CDM 2015 requires the client to provide pre-construction information 'as soon as is practicable' to every designer and contractor who has been, or is being considered for appointment. The emphasis on 'as soon as is practicable' means the client should not delay — early provision of information is critical to enabling safe planning and design.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PCI timing requirement',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 95,
    question:
      'Which of the following is an example of information that should be included in the health and safety file?',
    options: [
      "Daily timesheets and the attendance records for every worker on the project",
      "The signed building contract together with the agreed schedule of payments",
      "Toolbox talk attendance sheets and copies of all the site inductions delivered",
      "As-built drawings, residual hazards such as asbestos, and details of services and utilities",
    ],
    correctAnswer: 3,
    explanation:
      'The health and safety file should contain information needed for future construction work on the structure. This typically includes as-built drawings, information about the structure and its design (including loadings), details of materials used (especially hazardous materials such as asbestos), information about utilities and services, details of residual hazards, and any relevant maintenance procedures. It should not contain day-to-day project administration records.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'H&S file content',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 96,
    question:
      'Under CDM 2015, what must the client do with the health and safety file if the structure is sold or disposed of?',
    options: [
      'Provide the file to the new owner or occupier to ensure it remains available',
      'Destroy the file, since it relates only to the completed project',
      'Return the file to the principal designer for safekeeping',
      'Lodge the file with the HSE before completing the sale',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 4(9) of CDM 2015 requires that if the client disposes of their interest in the structure, they must provide the health and safety file to the person who acquires the client's interest in the structure and must ensure that person is aware of the nature and purpose of the file. This ensures the file remains available for future construction work throughout the life of the structure.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'H&S file on disposal',
    category: 'Pre-Construction & Planning',
  },

  // advanced (4)
  {
    id: 97,
    question:
      'Under CDM 2015, Schedule 3 lists work which is considered to involve particular risks. Which of the following is listed in Schedule 3?',
    options: [
      'Routine painting and decorating of the internal walls in an occupied building',
      'Work near high-voltage lines, work at height, and work risking burial under earthfalls',
      'General site clearance and the removal of non-hazardous waste materials from site',
      'The installation of standard domestic electrical sockets and light fittings throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Schedule 3 of CDM 2015 lists work involving particular risks that must be specifically addressed in the construction phase plan. It includes work with a risk of falling from height, work near high-voltage power lines, work involving risk of burial under earthfalls, work near water with risk of drowning, work involving the use of explosives, work involving the assembly or dismantling of heavy prefabricated components, and work in compressed air or diving.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Schedule 3 high-risk work',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 98,
    question:
      'Under CDM 2015, if a project involves multiple structures (for example, several new houses on a single development), how many health and safety files are required?',
    options: [
      'Exactly one file per project, regardless of how many separate structures it contains',
      'One file per contractor engaged on the project, held individually by each contractor',
      'It depends — a separate file may suit structures with different owners, or one file for a single owner',
      'No file is required at all where a development consists of more than one structure',
    ],
    correctAnswer: 2,
    explanation:
      'The ACoP (L153) advises that the number of health and safety files should be determined by the nature of the project. Where multiple structures will be sold to different owners, it is appropriate to have a separate file for each structure so it can be passed to the relevant new owner. Where the development is retained by one client, a single comprehensive file may be more practical. The key principle is that the file must be available to whoever needs it for future construction work.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Multiple H&S files',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 99,
    question:
      'Under Regulation 12(2), the principal contractor must arrange for the construction phase plan to take account of which specific information provided by the principal designer?',
    options: [
      'The agreed contract price and the full programme of payments to each contractor',
      'The completed health and safety file from the previous owner of the project site',
      'The minutes of every site progress meeting held throughout the whole project',
      'The pre-construction information and any design risk information from the designers',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12(2) of CDM 2015 requires the construction phase plan to take account of the pre-construction information provided under Regulation 4(4) and any information obtained from designers under Regulation 9(3). This ensures the CPP is informed by the pre-construction information gathered by the client and PD, and by the design risk information provided by all designers on the project.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'CPP information sources',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 100,
    question:
      'Under CDM 2015, what is the legal consequence of the client failing to provide adequate pre-construction information in accordance with Regulation 4(4)?',
    options: [
      'The client breaches Regulation 4(4) and may be prosecuted, and others cannot plan work safely',
      'There is no consequence, as providing pre-construction information is optional for the client',
      'Only the principal designer can be prosecuted, since they compile the information pack',
      'The project simply cannot be notified to the HSE until the information has been provided',
    ],
    correctAnswer: 0,
    explanation:
      'Failure to provide pre-construction information as required by Regulation 4(4) is a breach of CDM 2015 by the client. The HSE can issue enforcement notices or prosecute the client for this failure. Beyond prosecution, inadequate PCI can have serious practical consequences: designers cannot properly assess risks in their designs, contractors cannot adequately plan construction work, and the overall health and safety of the project is compromised from the outset.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'PCI non-compliance consequences',
    category: 'Pre-Construction & Planning',
  },

  {
    id: 101,
    question: 'What is the primary purpose of the health and safety file under CDM 2015?',
    options: [
      'To record accident statistics and near misses arising during the construction phase',
      'To provide information needed for future construction work, maintenance, repair, or demolition',
      'To act as the legal contract between the client and the principal designer for the works',
      'To store copies of every method statement and risk assessment used on the project',
    ],
    correctAnswer: 1,
    explanation:
      'The health and safety file is a repository of information that will be needed to ensure health and safety during any subsequent work on the structure, including maintenance, cleaning, refurbishment, and demolition. It is prepared by the principal designer under Regulation 12(5).',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Health and safety file purpose',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 102,
    question: 'Who is responsible for preparing the health and safety file under CDM 2015?',
    options: [
      'The client',
      'The HSE inspector',
      'The principal designer',
      'The principal contractor',
    ],
    correctAnswer: 2,
    explanation:
      "Under Regulation 12(5), the principal designer must prepare, review, update, and revise the health and safety file. This responsibility may pass to the principal contractor if the principal designer's appointment ends before the project is complete.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'H&S file responsibility',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 103,
    question:
      'An F10 notification must be sent to the HSE before construction work begins on notifiable projects. What is the minimum notice period?',
    options: [
      'At least 28 days before the construction phase begins',
      'At least 14 days before the construction phase begins',
      'Within 7 days of the construction phase beginning',
      'As soon as practicable before the construction phase begins',
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 6, the client must give notice to the HSE as soon as is practicable before the construction phase begins. There is no fixed number of days; the requirement is to notify as soon as practicable before construction starts.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'F10 notification timing',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 104,
    question: 'Where must the F10 notification be displayed on a construction site?',
    options: [
      'In a conspicuous position on the site accessible to any worker',
      'In the offices of the local authority building control department',
      'On the HSE public register of notified projects only',
      'In a sealed file kept by the principal contractor for inspection on request',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 6(4), the notice (or a copy of it) must be displayed in a readable condition in a position where it can be read by any worker engaged in the construction work. This ensures all workers are aware the project has been notified.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Displaying F10 notification',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 105,
    question:
      'To whom must the completed health and safety file be handed over at the end of a project?',
    options: [
      'The local authority building control department',
      'The client',
      'The principal contractor',
      'The HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Under Regulation 12(10), the principal designer (or principal contractor if the PD role has ended) must pass the health and safety file to the client at the end of the project. The client must then keep it available for anyone who needs it for future work.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'File handover to client',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 106,
    question: 'Which of the following is a notifiable project under CDM 2015?',
    options: [
      'Any project where more than one contractor is engaged, regardless of its duration',
      'Any project with a total construction value above £150,000, regardless of duration',
      'One over 30 working days with more than 20 workers at once, or over 500 person-days',
      'Any project involving work at height or work near to underground buried services',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 6, a project is notifiable if the construction work is scheduled to last longer than 30 working days and have more than 20 workers working simultaneously at any point, or exceed 500 person days of construction work.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Notifiable project thresholds',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 107,
    question:
      'What must the client do with the health and safety file once it has been handed over?',
    options: [
      'Forward it to the HSE to be held as a permanent statutory record of the project',
      'Archive it and then destroy it after a fixed retention period of three years',
      'Return it to the principal designer once the completed structure is occupied',
      'Keep it available for inspection by anyone needing it for future work on the structure',
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 4(7), the client must ensure the health and safety file is appropriately revised from time to time and made available for inspection by anyone who may need it to comply with any legal requirement relating to future construction work on the structure.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Client duty — retaining H&S file',
    category: 'Pre-Construction & Planning',
  },

  // --- intermediate (9) ---
  {
    id: 108,
    question:
      'Which of the following types of information should be included in the health and safety file?',
    options: [
      "Details of the structure's design, construction, materials used, and residual hazards",
      "The daily site diary and the attendance register for every worker",
      "The priced bill of quantities and the final account for the works",
      "Copies of every method statement and permit-to-work issued on site",
    ],
    correctAnswer: 0,
    explanation:
      'The health and safety file should contain information about residual risks, key structural principles, details of materials used (especially hidden services and hazardous materials), and other information useful for future maintenance, repair, renovation, or demolition.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'H&S file content',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 109,
    question:
      "If the principal designer's appointment finishes before the end of the project, what happens to the duty to prepare and update the health and safety file?",
    options: [
      'The duty lapses and no one is responsible',
      'The principal contractor must take over the duty',
      'The client must take over the duty personally',
      'The HSE appoints a replacement to complete the file',
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 12(6), if the principal designer's appointment finishes before the end of the project, the principal contractor must take on the duty to prepare, review, update, and revise the health and safety file for the remainder of the project.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PD appointment ending early',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 110,
    question:
      'When preparing the health and safety file, the principal designer must ensure it contains information relating to the project that is likely to be needed during any subsequent work. Which of the following is NOT typically included?',
    options: [
      'As-built drawings showing the location of hidden services',
      'Details of hazardous materials used in the structure',
      'Names and addresses of all sub-contractors who worked on the project',
      'Information about the removal or dismantling of specialist installations',
    ],
    correctAnswer: 2,
    explanation:
      'The health and safety file focuses on residual risks and information needed for safe future work — as-built drawings, hazardous materials, and specialist installation details are relevant. A list of sub-contractor names and addresses is not relevant to managing future health and safety risks.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'H&S file — what to exclude',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 111,
    question:
      'The F10 notification form requires certain details to be provided. Which of the following must be included?',
    options: [
      'A full copy of the construction phase plan and all the project method statements',
      'The completed health and safety file for the structure being constructed',
      'A detailed written risk assessment for every trade working on the whole project',
      'The names of the client, principal designer and contractor, the site address and a brief description',
    ],
    correctAnswer: 3,
    explanation:
      'The F10 notification must include details such as the date of forwarding, the address of the construction site, the name and address of the client, principal designer, and principal contractor, a brief description of the project, the planned start date and duration, and the estimated maximum number of workers.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'F10 content requirements',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 112,
    question:
      'Under CDM 2015, what must happen if there is a significant change to the project after the F10 has been submitted?',
    options: [
      'The original F10 should be updated and the HSE notified of the changes as soon as practicable',
      'A completely new project must be registered and the original F10 cancelled',
      'No action is needed once the original F10 has been submitted',
      'The change must be reported to the local authority building control rather than the HSE',
    ],
    correctAnswer: 0,
    explanation:
      'If there are changes to the information provided in the original notification, such as a change in principal contractor or principal designer, the client must update the notification and inform the HSE as soon as practicable.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Updating F10 notification',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 113,
    question:
      'Which of the following best describes the role of the principal designer in relation to pre-construction information?',
    options: [
      'They must produce all pre-construction information from scratch without any client input',
      'They assist the client with the PCI and ensure it reaches every designer and contractor',
      'They need only provide the pre-construction information on to the principal contractor',
      'They are responsible for keeping the pre-construction information confidential from designers',
    ],
    correctAnswer: 1,
    explanation:
      'Under Regulation 12, the principal designer must assist the client in the provision of pre-construction information and ensure it is provided in a convenient form to every designer and contractor appointed or being considered for appointment. This ensures all duty holders can plan and manage their work safely.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PD role — pre-construction information',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 114,
    question:
      'A project involves demolishing an existing building and constructing a new one. Which document must the client ensure exists before the construction phase of the new build can begin?',
    options: [
      'A completed health and safety file from the demolition phase',
      'An environmental impact assessment',
      'A construction phase plan for the new build project',
      'A structural survey of the neighbouring buildings',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 4(5)(b), the client must ensure that a construction phase plan is drawn up before the construction phase begins. This is a fundamental duty — no construction work should commence without an adequate construction phase plan in place.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CPP before construction begins',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 115,
    question:
      'The health and safety file should be proportionate to the complexity of the project. For a straightforward domestic extension, what approach is most appropriate?',
    options: [
      'The same comprehensive file format that is used for a major infrastructure project',
      'No file at all, since domestic extensions are wholly exempt from CDM 2015 duties',
      'A file consisting solely of the contractor public liability insurance certificate',
      'A simple file with as-built drawings, hidden services, and any residual hazards',
    ],
    correctAnswer: 3,
    explanation:
      'The health and safety file must be proportionate to the risks involved. Where a file is needed, a simple domestic extension would warrant only a concise one covering as-built drawings, locations of hidden services and any residual hazards, rather than the comprehensive format used on a major project. Note that under CDM 2015 Regulation 12(5) (HSE L153, para 45) a health and safety file is only required for projects involving more than one contractor; on a genuine single-contractor job a file may not be strictly required, though preparing a concise one remains good practice.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Proportionate H&S file',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 116,
    question: 'Under CDM 2015, what is the correct way to submit an F10 notification to the HSE?',
    options: [
      'Electronically via the HSE website or by post',
      'By registered post only',
      'By hand delivery to the local HSE office',
      'By email to a dedicated HSE notification address',
    ],
    correctAnswer: 0,
    explanation:
      'The F10 notification can be submitted electronically through the HSE website, which is the most common method, or it can be sent by post. Electronic submission is encouraged as it is faster and provides confirmation of receipt.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'F10 submission method',
    category: 'Pre-Construction & Planning',
  },

  // --- advanced (4) ---
  {
    id: 117,
    question:
      'A principal designer is preparing the health and safety file for a complex refurbishment of a listed building. The building contains asbestos-containing materials, concealed structural steelwork, and a legacy heating system using unusual pipework. Which approach best meets CDM 2015 requirements?',
    options: [
      'Omit the asbestos and concealed steelwork details to keep the file concise and easy to read',
      'Compile a proportionate file covering the asbestos data, concealed steelwork, pipework and residual risks',
      'Defer compiling the file until the very end of the project and rely on memory for the detail',
      'Include only the original architect drawings, since residual hazards are the contractor concern',
    ],
    correctAnswer: 1,
    explanation:
      'The H&S file must capture all information relevant to future health and safety on the structure. For a complex refurbishment of a listed building, this means including asbestos data, concealed structural elements, unusual building services, and a register of residual risks. The file should be built progressively throughout the project, not deferred.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Complex H&S file preparation',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 118,
    question:
      'A client sells a property after construction is complete. What is the legal position regarding the health and safety file?',
    options: [
      'The client may retain the file and is not required to share it with the new owner at all',
      'The file must be surrendered to the HSE before the sale of the structure can complete',
      'The client must pass the file to the new owner and keep it available for future work',
      'The file is no longer required at all once the structure changes hands to a new owner',
    ],
    correctAnswer: 2,
    explanation:
      'If the structure is sold or transferred, Regulation 4(7) requires the client to pass the health and safety file to the new owner. The file must remain available for inspection by anyone who needs it in connection with future construction work on the structure.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'H&S file transfer on sale',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 119,
    question:
      'A project originally estimated at 400 person days increases to 600 person days due to scope changes. The project was not initially notifiable. What action is required?',
    options: [
      'No action is needed, because notifiability is fixed at the original project estimate',
      'The project must be stopped and then re-tendered as a new and separate project',
      'Only the construction phase plan needs updating, and the HSE need not be told at all',
      'The client must now submit an F10 and appoint a principal designer and contractor if not already done',
    ],
    correctAnswer: 3,
    explanation:
      'If a project becomes notifiable due to changes in scope or duration, the client must comply with the notification requirements of Regulation 6. They must submit an F10 and, if not already in place, appoint a principal designer and principal contractor as required by Regulations 5(1)(a) and 5(1)(b).',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Project becoming notifiable',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 120,
    question:
      "On a large-scale infrastructure project, the principal designer's contract ends six months before practical completion. The principal contractor takes over the H&S file duties. Which of the following represents best practice for managing this transition?",
    options: [
      'A documented handover of the partial file and sources, which the PC then continues to develop',
      'The principal designer destroys the partial file so the principal contractor can start afresh',
      'The principal contractor waits until the end of the project before starting the file from scratch',
      'The client takes over the file personally and prevents the principal contractor from amending it',
    ],
    correctAnswer: 0,
    explanation:
      "When the principal designer's appointment ends before the project is complete, best practice under Regulation 12(6) is a formal handover of the partially complete file and all supporting information. The principal contractor then continues to develop and update the file, maintaining continuity. This handover should be documented to provide an audit trail.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'H&S file handover mid-project',
    category: 'Pre-Construction & Planning',
  },

  // =======================================================================
  // SECTION 5 — Design & Risk Management — 40 questions (121–160)
  // =======================================================================

  // --- basic (7) ---
  {
    id: 121,
    question: 'Under CDM 2015 Regulation 9, what is the primary duty of a designer?',
    options: [
      'To draw up and then maintain the construction phase plan for the whole project',
      'To eliminate foreseeable design risks to health and safety where reasonably practicable',
      'To supervise the construction work on site and enforce the site rules on the workforce',
      'To notify the project to the HSE and provide the welfare facilities for the site',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 9 requires designers, when preparing or modifying a design, to take into account the general principles of prevention and any pre-construction information. They must eliminate, so far as is reasonably practicable, foreseeable risks to the health or safety of any person carrying out or affected by construction work.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Designer duties Reg 9',
    category: 'Design & Risk Management',
  },
  {
    id: 122,
    question:
      'What is the correct hierarchy of risk control that designers must follow under CDM 2015?',
    options: [
      'Inform, reduce, eliminate',
      'Inform, eliminate, reduce',
      'Eliminate, reduce, inform',
      'Reduce, eliminate, inform',
    ],
    correctAnswer: 2,
    explanation:
      'Designers must follow the hierarchy: first eliminate the hazard through design; if that is not reasonably practicable, reduce the risk; and if a residual risk remains, inform those who need to know about it. This eliminate-reduce-inform hierarchy is fundamental to CDM 2015.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Eliminate/reduce/inform hierarchy',
    category: 'Design & Risk Management',
  },
  {
    id: 123,
    question: "What does 'SFARP' stand for in the context of CDM risk management?",
    options: [
      'Sequential Framework for Addressing Risk Prevention',
      'Standard Framework for Assessing Risk Potential',
      'Safety First And Reduced Planning',
      'So Far As Reasonably Practicable',
    ],
    correctAnswer: 3,
    explanation:
      "SFARP stands for 'So Far As Reasonably Practicable'. It is the legal standard applied throughout CDM 2015, meaning duty holders must weigh the risk against the cost, time, and effort of measures to reduce it. If the cost is grossly disproportionate to the risk, the measure need not be implemented.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'SFARP definition',
    category: 'Design & Risk Management',
  },
  {
    id: 124,
    question:
      'Schedule 1 of CDM 2015 sets out the general principles of prevention. Which of the following is the first principle?',
    options: [
      'Avoiding risks',
      'Adapting the work to the individual',
      'Giving collective protective measures priority over individual measures',
      'Developing a coherent overall prevention policy',
    ],
    correctAnswer: 0,
    explanation:
      "The first general principle of prevention listed in Schedule 1 of CDM 2015 is 'avoiding risks'. This aligns with the hierarchy of control — the best approach is to avoid or eliminate the risk entirely before considering other measures.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'General principles of prevention',
    category: 'Design & Risk Management',
  },
  {
    id: 125,
    question: "Under CDM 2015, who qualifies as a 'designer'?",
    options: [
      'The architect formally engaged as lead consultant for the whole project',
      'Any person who prepares or modifies a design, or instructs someone else to do so',
      'Only a person holding a recognised design qualification and membership',
      'Any person who builds a structure to another person\'s drawings on site',
    ],
    correctAnswer: 1,
    explanation:
      'Under Regulation 2(1), a designer is anyone who prepares or modifies a design, or arranges for or instructs any person under their control to do so, in relation to a structure or part of a structure. This can include architects, engineers, building services designers, interior designers, and even tradespeople who design elements of the work.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Designer definition under CDM',
    category: 'Design & Risk Management',
  },
  {
    id: 126,
    question: 'What is a design risk register?',
    options: [
      'A document listing the qualifications of every designer working on the project',
      'A schedule of the design fees and the payment milestones for the design team',
      'A record of design hazards, their risk level, and measures to eliminate or reduce them',
      'A record of design revisions and the dates on which each drawing was issued',
    ],
    correctAnswer: 2,
    explanation:
      'A design risk register is a tool used by designers to record the hazards identified in a design, assess the level of risk, and document what steps have been taken to eliminate or reduce those risks. It demonstrates compliance with Regulation 9 and communicates residual risks to others.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Design risk registers',
    category: 'Design & Risk Management',
  },
  {
    id: 127,
    question: 'Under CDM 2015 Regulation 8, what does the duty of cooperation require?',
    options: [
      'Only the client and the principal contractor are required to cooperate with each other',
      'Cooperation is required only on projects that have been notified to the HSE',
      'Each duty holder works independently and cooperation is encouraged but not required',
      'All duty holders must work together and cooperate with each other to ensure health and safety',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 8 requires all persons working on a project who have a duty under CDM 2015 to cooperate with each other, and with any other person working on or in connection with the project at the same or an adjoining site, so far as is necessary to enable any person with a duty to fulfil that duty.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Cooperation duty Reg 8',
    category: 'Design & Risk Management',
  },

  // --- intermediate (9) ---
  {
    id: 128,
    question:
      'A structural engineer designs a roof with a complex geometry that would require workers to operate near an unprotected edge during construction. Under CDM 2015, what should the engineer do first?',
    options: [
      'Consider whether the design can be modified to eliminate or reduce the need for workers to be near unprotected edges',
      'Specify that workers must wear a safety harness at the edge and leave the roof design entirely unchanged',
      'Note the hazard in the health and safety file and issue the original design for construction unchanged',
      'Leave the matter to the principal contractor to manage with edge protection during the construction works',
    ],
    correctAnswer: 0,
    explanation:
      'Under the eliminate-reduce-inform hierarchy of Regulation 9, the designer must first consider whether the design can be changed to eliminate the hazard. For example, could the roof geometry be simplified, or could permanent edge protection be designed in? Only if elimination is not reasonably practicable should the designer move to reduction and then information.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Designer duty — eliminate first',
    category: 'Design & Risk Management',
  },
  {
    id: 129,
    question:
      "Which of the following best describes the concept of 'buildability' in the context of CDM 2015?",
    options: [
      'The extent to which a design keeps the construction costs within the client budget',
      'The extent to which a design enables safe, efficient construction with fewer risks to workers',
      'The extent to which a design meets the aesthetic preferences of the paying client',
      'The extent to which a design complies with the latest planning policy guidance',
    ],
    correctAnswer: 1,
    explanation:
      'Buildability, in CDM terms, refers to how well a design considers the practical aspects of construction, particularly the health and safety of those who will build it. A design with good buildability is one where the designer has considered how the structure will actually be erected and has minimised foreseeable risks to workers.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Buildability',
    category: 'Design & Risk Management',
  },
  {
    id: 130,
    question:
      'A designer specifies a heavy precast concrete cladding panel system. What CDM-related consideration should influence the choice of fixing method?',
    options: [
      'The cheapest fixing available, since cost is the primary CDM consideration here',
      'The fixing that the client happens to have specified in the building contract',
      'The ease and safety of installing the panels, including handling and lifting needs',
      'The fixing giving fastest installation, regardless of the working position required',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 9, the designer must consider the risks associated with construction. Heavy precast panels present manual handling, lifting, and working-at-height risks. The fixing method should be chosen to minimise these risks — for example, using mechanical fixings that can be installed from a safe position rather than requiring workers to lean over edges.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Design for safe installation',
    category: 'Design & Risk Management',
  },
  {
    id: 131,
    question: "What does 'maintainability' mean in the context of CDM design duties?",
    options: [
      'The extent to which a design can be completed within the agreed construction programme',
      'The extent to which a design uses materials that are readily available from suppliers',
      'The extent to which a design reduces the overall capital cost of the finished structure',
      'The extent to which a design lets the structure be safely maintained throughout its life',
    ],
    correctAnswer: 3,
    explanation:
      "Maintainability requires designers to consider the health and safety of those who will maintain, clean, and repair the structure after construction. Under Regulation 9, designers must consider foreseeable risks not just during construction but during the structure's entire lifespan, including maintenance activities.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Maintainability',
    category: 'Design & Risk Management',
  },
  {
    id: 132,
    question:
      'Modern Methods of Construction (MMC) such as off-site prefabrication can contribute to CDM compliance. Which of the following is a primary health and safety benefit?',
    options: [
      'They cut work at height and on-site hazards by moving work into a controlled factory',
      'They remove the need for the project to be notified to the HSE under Regulation 6',
      'They eliminate the requirement to appoint a principal designer for the whole project',
      'They transfer all the CDM duties from the designer to the off-site manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'Off-site prefabrication and other MMC techniques reduce the volume of on-site work, particularly hazardous activities such as working at height, hot works, and manual handling. Manufacturing in a controlled factory environment is inherently safer than on a construction site, making MMC a valuable tool for CDM risk reduction.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'MMC and CDM',
    category: 'Design & Risk Management',
  },
  {
    id: 133,
    question:
      'Under CDM 2015, when must a designer provide information about residual risks in their design?',
    options: [
      'At the very end of the project, once the structure has been completed',
      'When risks cannot be designed out — they must inform those who need to know',
      'Only when the principal contractor requests the information in writing',
      'When the project is notifiable and an F10 has been sent to the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Under Regulation 9(3)(b), where it is not possible to eliminate or sufficiently reduce a risk through design, the designer must take all reasonable steps to provide sufficient information about each risk to every person who needs it. This forms the third tier of the eliminate-reduce-inform hierarchy.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Informing about residual risks',
    category: 'Design & Risk Management',
  },
  {
    id: 134,
    question:
      'A designer is coordinating with other designers on a multi-disciplinary project. Under CDM 2015, what is the role of the principal designer in this coordination?',
    options: [
      'They have no coordination role at all, as each designer works entirely independently',
      'They only coordinate the designers once the construction phase has actually begun',
      'They manage the pre-construction phase and coordinate health and safety across designers',
      'They simply collect the designers drawings and then forward them on to the contractor',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 11, the principal designer must plan, manage, and monitor the pre-construction phase and coordinate matters relating to health and safety during the pre-construction phase. This includes ensuring cooperation between designers and that they comply with their duties under Regulation 9.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'PD coordination of designers',
    category: 'Design & Risk Management',
  },
  {
    id: 135,
    question:
      "Schedule 1 of CDM 2015 includes the principle of 'combating risks at source'. What does this mean in a design context?",
    options: [
      'Providing personal protective equipment to each worker exposed to the hazard during the works',
      'Passing responsibility for the hazard to the principal contractor through the phase plan',
      'Recording the hazard in the design so that workers can be warned about it at site induction',
      'Addressing the hazard at its origin through design changes rather than relying on downstream measures',
    ],
    correctAnswer: 3,
    explanation:
      'Combating risks at source means tackling the hazard at its origin. In design terms, this means changing the design itself to remove or reduce the hazard, rather than relying on protective measures during construction or maintenance. For example, designing in permanent access for maintenance rather than relying on temporary scaffolding.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Combating risks at source',
    category: 'Design & Risk Management',
  },
  {
    id: 136,
    question:
      'An architect designs a glass atrium roof. Under CDM 2015, which of the following should the architect consider?',
    options: [
      'How the glass will be safely installed, cleaned, maintained and replaced in future',
      'Only how the atrium looks and how well it meets the client\'s design brief',
      'How the glass is loaded structurally, leaving safety in use to the building owner',
      'How much the glazing costs and how quickly it can be delivered to the site',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 9, the designer must consider foreseeable risks throughout the life of the structure. For a glass atrium roof, this includes risks during installation (working at height, handling heavy glass panels), maintenance (safe access for cleaning), and future replacement. The design should incorporate safe access solutions for all these activities.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Whole-life design considerations',
    category: 'Design & Risk Management',
  },

  // --- advanced (4) ---
  {
    id: 137,
    question:
      'A building services engineer is designing a mechanical ventilation system. The ductwork route passes through a confined space that will be extremely difficult to access for future maintenance. Applying the CDM 2015 hierarchy, which is the best course of action?',
    options: [
      'Leave the route unchanged and rely on a permit-to-work system during future maintenance',
      'Reroute to avoid the confined space, or if not practicable, minimise entry and inform of the risk',
      'Specify breathing apparatus for the maintenance workers and make no change to the design',
      'Note the confined space in the health and safety file and proceed with the original route',
    ],
    correctAnswer: 1,
    explanation:
      'Following the CDM hierarchy, the designer must first try to eliminate the risk by rerouting the ductwork to avoid the confined space. If this is not reasonably practicable, the design should reduce the need for confined space entry (e.g., external access panels, remotely accessible inspection points). Any residual risk must be communicated to future maintainers via the health and safety file.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Design hierarchy — confined spaces',
    category: 'Design & Risk Management',
  },
  {
    id: 138,
    question:
      'Two designers on a project have conflicting design solutions that each introduce different risks. The structural engineer wants to use in-situ concrete (requiring formwork at height), while the architect prefers a steel frame (requiring extensive hot works). Under CDM 2015, how should this conflict be resolved?',
    options: [
      'The cheaper of the two design solutions should always be chosen to control project cost',
      'Each designer should proceed with their own preferred solution and resolve the clash on site',
      'The principal designer coordinates a risk comparison and agrees the solution managing overall risk best',
      'The principal contractor should decide between the two solutions during the construction phase',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 11, the principal designer must coordinate health and safety matters during the pre-construction phase. When design solutions conflict, the PD should facilitate a risk comparison using the general principles of prevention in Schedule 1, considering the overall risk profile rather than allowing each designer to work in isolation.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Design conflict resolution',
    category: 'Design & Risk Management',
  },
  {
    id: 139,
    question:
      'A designer is applying the SFARP test to determine whether an alternative design is required. The original design presents a moderate risk of musculoskeletal injury to workers, while the alternative design eliminates this risk but costs 15% more. What is the correct legal position?',
    options: [
      'The designer may keep the original design, as any cost increase justifies retaining the risk',
      'The designer must always choose the cheapest option, regardless of the risk involved',
      'The designer must adopt the alternative only if the client agrees to fund the extra cost',
      'The designer must adopt it, as a 15% rise is unlikely to be grossly disproportionate',
    ],
    correctAnswer: 3,
    explanation:
      "The SFARP test requires the risk to be reduced unless the cost is grossly disproportionate to the benefit gained. For a moderate risk of musculoskeletal injury, a 15% cost increase to eliminate the risk entirely is unlikely to be considered grossly disproportionate. The legal test sets a high bar — 'grossly disproportionate' is more than simply 'more expensive'.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'SFARP cost-benefit analysis',
    category: 'Design & Risk Management',
  },
  {
    id: 140,
    question:
      'A design review reveals that a proposed curtain wall system requires workers to lean out from the building to install external brackets at the 15th floor. The designer argues that a safety harness specification is sufficient. Under CDM 2015, is this approach acceptable?',
    options: [
      'No — PPE is the last resort; the design should first try to eliminate or reduce the risk',
      'Yes — specifying a safety harness fully discharges the designer duties under Regulation 9',
      'Yes — the risk passes to the principal contractor once the design is issued for construction',
      'Yes — provided the harness specification is recorded in the project health and safety file',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 9 and the general principles of prevention, specifying PPE (personal protective equipment) is the last resort, not the first option. The designer must first consider whether the design can be changed to eliminate the hazard — for example, brackets that install from inside, or unitised curtain wall systems that reduce external work. Only if these options are not reasonably practicable should protective measures be considered.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Design hierarchy — PPE as last resort',
    category: 'Design & Risk Management',
  },
  {
    id: 141,
    question:
      'When a designer provides information about residual risks under Regulation 9(3)(b), in what format should this information be communicated?',
    options: [
      'It must always be presented on the official HSE residual-risk template document',
      'There is no set format — it must be proportionate, project-specific and clear to users',
      'It must be recorded only as a note on the construction drawings, and nowhere else',
      'It must be set out in a legally worded disclaimer signed by the appointed contractor',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 does not prescribe a specific format for communicating residual design risks. The information must be proportionate to the risks, project-specific, and in a form that is clear and useful to those who need it — typically contractors and future maintainers. Overly generic or excessively bureaucratic risk information does not comply with the spirit of the Regulations.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Communicating residual risk information',
    category: 'Design & Risk Management',
  },
  {
    id: 142,
    question:
      'A designer specifies a green roof system. Which CDM-related risks should be considered?',
    options: [
      'Drainage performance alone, since safety on the roof is the installer\'s own concern',
      'Planting costs alone, together with the long-term irrigation system running costs',
      'Risks during installation, maintenance access, and any future removal or replacement',
      'Only the visual appearance of the roof as seen from neighbouring buildings',
    ],
    correctAnswer: 2,
    explanation:
      "Under Regulation 9, the designer must consider foreseeable risks throughout the structure's life. For a green roof, this includes construction risks (working at height, heavy materials), maintenance risks (safe access for gardening, irrigation servicing), and end-of-life risks (future removal or replacement of the system).",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Green roof design risks',
    category: 'Design & Risk Management',
  },
  {
    id: 143,
    question:
      'Under Schedule 1 of CDM 2015, which principle requires that technological progress be taken into account when managing risks?',
    options: [
      'Giving appropriate instructions to employees',
      'Avoiding risks',
      'Combating risks at source',
      'Adapting to technical progress',
    ],
    correctAnswer: 3,
    explanation:
      "Schedule 1 includes the principle of 'adapting to technical progress'. This means duty holders, including designers, should keep up to date with advances in technology, materials, and methods that could reduce risks. A design that ignores available safer alternatives may not comply with CDM 2015.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Adapting to technical progress',
    category: 'Design & Risk Management',
  },
  {
    id: 144,
    question:
      'A designer is considering whether to specify a bolted steel connection or a welded connection for a structural joint. From a CDM perspective, which factor is most relevant?',
    options: [
      'The relative risks of each method — bolting avoids hot works, fire and welding fume risks',
      'The material cost of each method, since welded joints use less steel than bolted ones',
      'The delivery programme, since the steelwork supplier can weld the joints off site',
      'Only the appearance of the finished joint once the structure is clad and complete',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 9, the designer must consider the foreseeable risks of construction. Bolted connections generally present fewer health and safety risks than welded connections (no hot works, no welding fumes, reduced fire risk). While there may be valid structural reasons for choosing welding, the CDM risk comparison should be part of the decision-making process.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Connection type — risk comparison',
    category: 'Design & Risk Management',
  },
  {
    id: 145,
    question: "What is the purpose of a designer's risk assessment under CDM 2015?",
    options: [
      'To transfer all the design-related risks to the principal contractor for the build phase',
      'To identify design hazards, evaluate the risks, and record how they are managed',
      'To provide the client with an estimate of the cost of managing the project risks',
      'To list the qualifications and experience of each member of the design team',
    ],
    correctAnswer: 1,
    explanation:
      "A designer's risk assessment is a systematic process for identifying hazards inherent in the design, evaluating the risks they present, and documenting the actions taken following the eliminate-reduce-inform hierarchy. It provides an audit trail of CDM compliance and communicates residual risks to those who need to manage them.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Purpose of designer risk assessment',
    category: 'Design & Risk Management',
  },
  {
    id: 146,
    question:
      "Under CDM 2015, a designer must not commence work on a design for a project unless satisfied that the client is aware of their duties. What are the client's duties that the designer should check?",
    options: [
      'To draw up the construction phase plan and the site rules before work begins on site',
      'To prepare the health and safety file and then pass it on to all future owners',
      'The Regulation 4 duties — managing the project, providing PCI and ensuring welfare',
      'To supervise the construction work on site and enforce the use of protective equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 9(1), a designer must not commence work on a design unless satisfied the client is aware of their duties under the Regulations. Key client duties (Regulation 4) include making suitable arrangements for managing the project, providing pre-construction information, ensuring welfare facilities, and appointing a principal designer and principal contractor for projects with more than one contractor.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Designer checking client awareness',
    category: 'Design & Risk Management',
  },
  {
    id: 147,
    question:
      "On a multi-storey office development, the architect designs floor-to-ceiling glazing with no openable sections for window cleaning access. Under CDM 2015, what is the designer's responsibility regarding future cleaning?",
    options: [
      "The architect has no cleaning duty at all, as this is solely the building owner concern",
      "The architect need only note in the design drawings that the windows cannot be opened",
      "The architect should leave all the access arrangements for the contractor to resolve on site",
      "The architect must design in safe cleaning access, such as davits, walkways or gantries",
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 9, designers must consider foreseeable risks throughout the life of the structure, including maintenance. For floor-to-ceiling glazing on a multi-storey building, the architect must consider how windows will be safely cleaned and, where reasonably practicable, design in permanent safe access solutions rather than relying on temporary measures like cradles or rope access.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Design for safe maintenance access',
    category: 'Design & Risk Management',
  },
  {
    id: 148,
    question:
      'A designer decides to specify a proprietary raised access floor system instead of a traditional screed floor. This decision reduces the need for on-site wet trades and associated slip hazards. Under CDM 2015, how should this design decision be recorded?',
    options: [
      'It should be noted in the design risk register as a risk-reduction measure under Regulation 9',
      'It need not be recorded at all, as choosing a floor system is a routine commercial decision',
      'It should be recorded only in the building contract as a variation to the specification',
      'It should be kept confidential from the contractors to avoid disputes over the change',
    ],
    correctAnswer: 0,
    explanation:
      'Good practice under CDM 2015 is to record design decisions that eliminate or reduce risk in the design risk register. This demonstrates compliance with Regulation 9, provides an audit trail, and helps other designers and contractors understand the health and safety rationale behind design choices.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Recording design risk decisions',
    category: 'Design & Risk Management',
  },
  {
    id: 149,
    question:
      'Under CDM 2015, what obligation does Regulation 8(4) place on a person working on a project who becomes aware of a design that does not comply with the Regulations?',
    options: [
      'They may raise a concern about a design only if they are a qualified designer who has been formally engaged on that project',
      'They must report anything they are aware of that is likely to endanger their own health or safety or that of others to the person responsible',
      'They have no duty to act at all, because compliance of any design rests solely with the principal designer appointed for the project',
      'They must report the matter directly to the HSE in writing before raising it with the designer or anyone else on the project',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 8(4) requires every person working on a project to report anything they are aware of in relation to the project that is likely to endanger their own health or safety or that of any other person. This includes awareness of non-compliant designs, and applies to all workers and duty holders, not just designers.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Reporting non-compliant designs',
    category: 'Design & Risk Management',
  },
  {
    id: 150,
    question:
      "A mechanical engineer designs a plant room layout. Under CDM 2015, which of the following design features would best demonstrate compliance with the designer's duties?",
    options: [
      'Packing the equipment as tightly as possible to minimise the plant room floor area',
      'Locating all the isolation points in a single locked cabinet accessible only to the client',
      'Providing safe access space, accessible isolation points and adequate working headroom',
      'Specifying the lowest-cost equipment available to keep the plant room within budget',
    ],
    correctAnswer: 2,
    explanation:
      'A well-designed plant room under CDM 2015 provides adequate space for safe installation, maintenance, and future replacement of equipment. This includes clear access routes, sufficient working space around each item, accessible isolation points, adequate headroom, and appropriate lighting. These features reduce risks during both construction and the operational life of the building.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Plant room design for safety',
    category: 'Design & Risk Management',
  },
  {
    id: 151,
    question:
      'Which of the following statements about the general principles of prevention in Schedule 1 is correct?',
    options: [
      'They must be taken into account by the principal designer when preparing a design, and by no other duty holder at any point in the project',
      'They must be taken into account only on projects notifiable to the HSE, and only from the date the F10 notification is submitted',
      'They are advisory guidance that duty holders may take into account when convenient, and may disregard entirely on smaller projects',
      'They must be taken into account by designers when preparing or modifying a design, and by all duty holders when planning and managing construction work',
    ],
    correctAnswer: 3,
    explanation:
      'The general principles of prevention in Schedule 1 are integral to CDM 2015. They must be taken into account by designers (Regulation 9(2)), by the principal designer (Regulation 11(3)), and in the management of construction work generally. They apply to all projects, not just notifiable ones.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Application of general principles',
    category: 'Design & Risk Management',
  },
  {
    id: 152,
    question:
      'A designer specifies a lightweight steel framing system (LGSF) instead of traditional blockwork for internal walls. From a CDM perspective, what is the primary benefit?',
    options: [
      'Lighter components cut handling and wet-trade risks and speed up assembly on site',
      'It removes the need to appoint a principal designer for the whole project at all',
      'It means the construction project no longer has to be notified to the HSE at all',
      'It transfers all the designer CDM duties across to the steel-frame manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'From a CDM perspective, lightweight steel framing reduces several construction risks: lighter components reduce manual handling injuries, dry construction eliminates wet trade hazards (slips, dermatitis), and faster assembly reduces overall time on site and exposure to site hazards. These are valid CDM considerations when choosing construction methods.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Material selection — CDM benefits',
    category: 'Design & Risk Management',
  },
  {
    id: 153,
    question:
      'Under CDM 2015, what is the relationship between Regulation 9 (duties of designers) and Regulation 11 (duties of the principal designer)?',
    options: [
      'Regulation 11 replaces Regulation 9 for any designer who is appointed principal designer',
      'Reg 9 applies to every designer; Reg 11 adds coordination duties for the principal designer',
      'Regulation 9 applies only in the pre-construction phase and Regulation 11 only in construction',
      'Regulation 11 applies to every designer while Regulation 9 applies only to the principal designer',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 9 applies to every designer on a project — each must individually ensure their design does not give rise to foreseeable risks. Regulation 11 gives the principal designer additional overarching duties to plan, manage, and monitor the pre-construction phase and coordinate health and safety matters among all designers. Both regulations operate simultaneously.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Reg 9 vs Reg 11 relationship',
    category: 'Design & Risk Management',
  },
  {
    id: 154,
    question:
      'A client requests a design change that the designer believes will increase construction risk. What should the designer do?',
    options: [
      "Implement the change exactly as instructed, as the client has the final say on the design",
      "Refuse the change outright and then resign from the project without further discussion",
      "Advise the client of the risks, propose safer alternatives, and record the discussion",
      "Make the change but pass responsibility for the added risk to the principal contractor",
    ],
    correctAnswer: 2,
    explanation:
      "The designer has a duty under Regulation 9 to ensure their design does not give rise to foreseeable risks so far as is reasonably practicable. If a client's change increases risk, the designer should explain the risks, suggest safer alternatives, and document the discussion. The designer cannot simply comply with a change that would breach their CDM duties.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Managing client-requested changes',
    category: 'Design & Risk Management',
  },
  {
    id: 155,
    question:
      'Schedule 1 of CDM 2015 lists nine general principles of prevention. Which of the following is NOT one of them?',
    options: [
      'Giving collective protective measures priority over individual protective measures',
      'Replacing the dangerous with the non-dangerous or less dangerous',
      'Adapting the work to the individual',
      'Maximising profit margins on construction projects',
    ],
    correctAnswer: 3,
    explanation:
      'The nine general principles of prevention in Schedule 1 are: avoiding risks, evaluating unavoidable risks, combating risks at source, adapting work to the individual, adapting to technical progress, replacing the dangerous with less dangerous, developing a coherent prevention policy, giving collective measures priority, and giving appropriate instructions. Maximising profit is not a principle of prevention.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'General principles — identification',
    category: 'Design & Risk Management',
  },
  {
    id: 156,
    question:
      "A designer is specifying a fall arrest system for workers who will need to access a building's facade for maintenance. Under CDM 2015 and the hierarchy of control, when is it appropriate to specify a fall arrest system?",
    options: [
      'Only once designing out access, or permanent collective protection, is not practicable',
      'As the very first choice, because fall arrest is the most reliable protection available',
      'Whenever the facade is above two storeys, regardless of the other available measures',
      'Only if the client specifically requests a fall arrest system within the project brief',
    ],
    correctAnswer: 0,
    explanation:
      'Fall arrest (a form of personal protective equipment) sits near the bottom of the hierarchy of control. Under CDM 2015, the designer must first consider eliminating the need for facade access, then collective measures (permanent walkways, guardrails, gantry systems), before specifying personal fall arrest. This aligns with both Regulation 9 and the general principles of prevention.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Hierarchy of control — fall arrest',
    category: 'Design & Risk Management',
  },
  {
    id: 157,
    question: "Under CDM 2015, what is meant by 'design' in relation to a structure?",
    options: [
      'Architect\'s drawings and details alone, excluding specifications, calculations and bills',
      'Drawings, details, specifications, calculations and bills of quantities, plus any changes',
      'Issued-for-construction drawings alone, excluding earlier versions and later changes',
      'Structural and architectural drawings alone, excluding all building services design',
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 2(1), 'design' is defined broadly to include drawings, design details, specifications, calculations, and bills of quantities (including specifications of articles or substances) relating to a structure. This wide definition ensures that all aspects of design are covered by CDM duties.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Definition of design under CDM',
    category: 'Design & Risk Management',
  },
  {
    id: 158,
    question:
      'An electrical designer specifies a cable route through an area that will later become a confined space due to other design decisions. What should the electrical designer do?',
    options: [
      'Proceed with the original route, as the confined space is created by other designers, not the cable',
      'Specify breathing apparatus for future maintenance and leave the cable route unchanged',
      'Coordinate via the principal designer for an alternative route, or record and communicate the risk',
      'Leave the issue entirely to the principal contractor to resolve during the installation',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 9 and the cooperation duty in Regulation 8, the electrical designer must coordinate with other designers through the principal designer. The aim is to find an alternative cable route that avoids the confined space. If this is not reasonably practicable, the residual risk must be recorded in the design risk register and communicated to those who will need to work in or maintain the space.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Cross-discipline design coordination',
    category: 'Design & Risk Management',
  },
  {
    id: 159,
    question:
      'A designer includes significant residual risks in their design that cannot be eliminated. Under CDM 2015, who must receive the information about these residual risks?',
    options: [
      'Only the principal designer, who then decides whether to pass it on to other duty holders',
      'The client alone, who then carries responsibility for managing every risk on the project',
      'The HSE alone, which records residual design risks on a central register of projects',
      'Everyone who needs it to manage the risk — designers, contractors and future users via the file',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 9(3)(b) requires the designer to provide information about residual risks to every person who needs it. This is a broad obligation encompassing the principal designer, principal contractor, other designers, contractors who will build the design, and future users/maintainers via the health and safety file.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Who receives residual risk info',
    category: 'Design & Risk Management',
  },
  {
    id: 160,
    question:
      'Under CDM 2015, a designer who also acts as a contractor on a project has duties under both Regulation 9 (designer) and Regulation 15 (contractor). How do these duties interact?',
    options: [
      'Both apply at once — designer duties when designing, contractor duties when building',
      'Contractor duties displace designer duties once construction work begins on site',
      'Designer duties displace contractor duties, as the design is carried out first',
      'Either set may be chosen, provided one of them is applied across the project',
    ],
    correctAnswer: 0,
    explanation:
      'CDM 2015 duties are not mutually exclusive. A person who acts as both designer and contractor must comply with both sets of duties. When carrying out or modifying a design, Regulation 9 duties apply. When carrying out construction work, Regulation 15 duties apply. There is no opt-out or override — both operate in parallel.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Dual roles — designer and contractor',
    category: 'Design & Risk Management',
  },

  // =======================================================================
  // SECTION 6 — Construction Phase & Compliance — 40 questions (161–200)
  // =======================================================================

  // --- basic (7) ---
  {
    id: 161,
    question:
      'Under CDM 2015 Regulation 13, what must the principal contractor ensure regarding site inductions?',
    options: [
      'Only visitors and members of the public need an induction, as workers are briefed by their own employer before they arrive',
      'Every worker on the site receives a suitable site induction, providing information on the risks and the measures in place to manage them',
      'Workers without a CSCS card receive an induction, as card holders have already been trained in the site risks and controls',
      'An induction is required only on notifiable projects, where the F10 notice has been sent to the HSE before work starts',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 13(4)(a) requires the principal contractor to make and maintain arrangements that will enable the principal contractor and any workers to cooperate effectively, including providing a suitable site induction for every worker. This must cover the risks on site and the measures in place to manage them.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Site inductions Reg 13',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 162,
    question: 'What is the construction phase plan (CPP) under CDM 2015?',
    options: [
      'A record of the information needed for future maintenance and demolition of the structure',
      'A priced programme showing the sequence and duration of the construction works',
      'A document setting out the health and safety arrangements and site rules for the construction phase',
      'A register of all accidents and near-misses occurring during the construction phase',
    ],
    correctAnswer: 2,
    explanation:
      "The construction phase plan (CPP) is the principal contractor's key health and safety management document. It sets out the arrangements for managing health and safety during the construction phase, including site rules, specific measures for high-risk work, and the monitoring arrangements.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'CPP definition',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 163,
    question: 'Under CDM 2015, who has overall responsibility for managing the construction phase?',
    options: [
      'The HSE',
      'The client',
      'The principal designer',
      'The principal contractor',
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 13, the principal contractor has the overall responsibility for planning, managing, monitoring, and coordinating the construction phase. This includes ensuring that the construction phase plan is followed, welfare facilities are provided, and the site is managed safely.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'PC managing construction phase',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 164,
    question: 'What are welfare facilities under CDM 2015 Schedule 2?',
    options: [
      'Toilets, washing facilities, drinking water, changing rooms, rest and eating facilities',
      'Personal protective equipment, hand tools and access equipment for every worker',
      'First-aid kits, defibrillators and a fully staffed on-site medical treatment centre',
      'Secure storage for plant and materials, plus a fitted-out site office for the contractor',
    ],
    correctAnswer: 0,
    explanation:
      'Schedule 2 of CDM 2015 sets out the minimum welfare facilities that must be provided on construction sites. These include sanitary conveniences (toilets), washing facilities (including showers where needed), drinking water, changing rooms and lockers, rest facilities, and facilities for eating meals.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Welfare facilities Schedule 2',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 165,
    question: 'What does RIDDOR stand for?',
    options: [
      'Risk Identification, Documentation, and Duty Of Reporting',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Regulation for Industrial Disease Detection and Occupational Review',
      'Required Information for Documenting Dangerous Operations and Risks',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. It requires employers and responsible persons to report certain serious workplace accidents, occupational diseases, and specified dangerous occurrences to the HSE.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'RIDDOR definition',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 166,
    question: 'What is a prohibition notice issued by an HSE inspector?',
    options: [
      'A notice giving the duty holder a fixed period to remedy a breach of health and safety law',
      'A notice requiring the project to be notified to the HSE within a set number of days',
      'A notice requiring an activity to stop where it risks serious personal injury',
      'A formal warning that no further action will be taken if site conditions improve',
    ],
    correctAnswer: 2,
    explanation:
      'A prohibition notice is served under Section 22 of the Health and Safety at Work etc. Act 1974. It requires the immediate cessation of an activity that the inspector believes involves, or will involve, a risk of serious personal injury. Work cannot resume until the matters specified in the notice have been remedied.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Prohibition notices',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 167,
    question: 'What is the difference between an improvement notice and a prohibition notice?',
    options: [
      'An improvement notice stops work at once, while a prohibition notice gives time to remedy',
      'Both notices stop work immediately, and the only difference is which inspector issues them',
      'An improvement notice applies to designers, while a prohibition notice applies to contractors',
      'An improvement notice gives time to remedy, while a prohibition notice stops serious-risk work',
    ],
    correctAnswer: 3,
    explanation:
      'An improvement notice (Section 21, HSWA 1974) gives the duty holder a specified period to remedy a contravention of health and safety law. A prohibition notice (Section 22) requires the immediate or near-immediate cessation of an activity that the inspector believes poses a risk of serious personal injury. The key distinction is urgency and severity of risk.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Improvement vs prohibition notices',
    category: 'Construction Phase & Compliance',
  },

  // --- intermediate (9) ---
  {
    id: 168,
    question:
      "The construction phase plan is often described as a 'living document'. What does this mean in practice?",
    options: [
      'It must be continuously reviewed, updated, and revised as the project progresses and circumstances change',
      'It must be rewritten in full at the start of each week of the construction phase and reissued to every contractor',
      'It must be displayed on the site notice board and cannot be amended once the works have started on site',
      'It must be signed by every worker at induction and by the client before it takes effect on the site',
    ],
    correctAnswer: 0,
    explanation:
      "Describing the CPP as a 'living document' means it is not a static document created once and then filed away. It must be continuously reviewed and updated as the project progresses, new risks emerge, circumstances change, or new contractors join the project. The principal contractor is responsible for ensuring the CPP remains current and relevant.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CPP as living document',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 169,
    question:
      'Under CDM 2015, how should the principal contractor assess the competence of workers and sub-contractors?',
    options: [
      'By checking only that each worker holds valid public liability insurance cover',
      'By verifying their skills, knowledge, training, experience and organisational capability',
      'By relying solely on the lowest tender price as the evidence of their capability',
      'By assuming all the workers are competent unless an accident later proves otherwise',
    ],
    correctAnswer: 1,
    explanation:
      "While CDM 2015 moved away from prescriptive 'competence' requirements in favour of the broader concept of skills, knowledge, training and experience (SKTE), the principal contractor must still satisfy themselves that workers and sub-contractors have the necessary SKTE and organisational capability to carry out their work without risk to health and safety.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Competence assessment',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 170,
    question: 'What is a permit-to-work system on a construction site?',
    options: [
      'A permit issued by the local authority allowing construction work to start on the site',
      'A document recording the number of hours each worker is permitted to work each week',
      'A formal documented procedure authorising specific high-risk work under controls',
      'A licence allowing a contractor to operate plant and machinery on the public highway',
    ],
    correctAnswer: 2,
    explanation:
      'A permit-to-work system is a formal management control procedure used for high-risk activities such as hot works, confined space entry, live electrical work, and excavations near services. It ensures that specific precautions are taken, that the work is properly authorised, and that a responsible person has checked conditions before work begins.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Permits to work',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 171,
    question: 'Under CDM 2015, what must the principal contractor do regarding temporary works?',
    options: [
      'Leave temporary works entirely to each sub-contractor, with no central oversight at all',
      'Treat all temporary works as permanent and include them in the health and safety file',
      'Remove all of the temporary works before any permanent work begins on the site',
      'Ensure formwork, falsework and propping are designed, erected and dismantled safely',
    ],
    correctAnswer: 3,
    explanation:
      'Temporary works such as formwork, falsework, temporary propping, and excavation support are an integral part of the construction phase. The principal contractor must ensure these are properly designed (often by a temporary works designer), safely erected and dismantled, and subject to appropriate inspection and checking procedures.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Temporary works management',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 172,
    question: 'Which of the following injuries must be reported to the HSE under RIDDOR?',
    options: [
      'A fracture of any bone other than a finger, thumb, or toe',
      'A headache caused by noisy construction work',
      'A bruise from bumping into a scaffold pole',
      'A minor cut that requires a plaster',
    ],
    correctAnswer: 0,
    explanation:
      "Under RIDDOR 2013, fractures (other than to fingers, thumbs, or toes) are classified as 'specified injuries' and must be reported to the HSE. Other specified injuries include amputations, crush injuries to the head or torso, loss of consciousness from head injury or asphyxia, and burns covering more than 10% of the body.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'RIDDOR reportable injuries',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 173,
    question:
      'An HSE inspector arrives on a construction site to carry out an inspection. What powers do they have under the Health and Safety at Work etc. Act 1974?',
    options: [
      'They may only observe the site and must request permission for any action they take',
      'They may enter and investigate, take samples and photographs, and seize articles',
      'They may issue advice but have no power to enter the site without a court order first',
      'They may inspect documents only and cannot enter the working areas of the actual site',
    ],
    correctAnswer: 1,
    explanation:
      'Under Section 20 of HSWA 1974, HSE inspectors have wide-ranging powers including the right to enter premises at any reasonable time, inspect and investigate, take measurements and photographs, require the production of documents, take samples, and seize any article or substance that poses imminent danger.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'HSE enforcement powers',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 174,
    question: 'What is the purpose of monitoring and auditing under CDM 2015?',
    options: [
      'To allocate blame to individual workers following any accident occurring on site',
      'To verify the project will be completed within the agreed programme and budget',
      'To check the construction phase plan is being followed and risks are controlled',
      'To satisfy the client that the appointed contractor is providing good value for money',
    ],
    correctAnswer: 2,
    explanation:
      'Monitoring and auditing are essential management activities under CDM 2015. The principal contractor must monitor the implementation of the construction phase plan, check that risk controls are effective, identify non-compliance or new risks, and take corrective action. This supports the continuous improvement of health and safety performance.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Monitoring and auditing',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 175,
    question:
      'Under CDM 2015, what must the principal contractor do when a new sub-contractor arrives on site?',
    options: [
      'Allow them to start work immediately and induct them only if an accident later occurs',
      'Require them to sign a waiver accepting full responsibility for their own site safety',
      'Leave the sub-contractor to brief their own workers, with no principal contractor involvement',
      'Give them the relevant plan, induct them, verify their SKTE, and coordinate their work',
    ],
    correctAnswer: 3,
    explanation:
      "The principal contractor has multiple duties when new sub-contractors arrive: providing relevant CPP information, ensuring site induction, verifying SKTE, and coordinating their work with other site activities. This is part of the PC's overall duty to plan, manage, and coordinate the construction phase under Regulation 13.",
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Sub-contractor arrival procedures',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 176,
    question:
      "What is the principal contractor's duty regarding consultation with workers under CDM 2015?",
    options: [
      'They must enable effective cooperation with workers and consult them on health and safety',
      'They need only consult the sub-contractor managers, and not the workers themselves',
      'They have no consultation duty at all, as this rests entirely with each worker own employer',
      'They must consult the workers only after an accident has actually occurred on the site',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 14, the principal contractor must make arrangements for cooperation with workers. Combined with the general duties under the Safety Representatives and Safety Committees Regulations 1977 and the Health and Safety (Consultation with Employees) Regulations 1996, the PC must consult workers on health and safety matters throughout the construction phase.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Worker consultation',
    category: 'Construction Phase & Compliance',
  },

  // --- advanced (4) ---
  {
    id: 177,
    question:
      "A principal contractor discovers that a sub-contractor is repeatedly failing to follow the construction phase plan despite verbal warnings. The sub-contractor's workers are not wearing the required PPE and are ignoring exclusion zones. What steps should the principal contractor take?",
    options: [
      'Amend the construction phase plan to allow the working method the sub-contractor prefers',
      "Instruct compliance in writing, increase monitoring, stop the work and if needed remove them",
      'Report the sub-contractor to the HSE and let the work continue until inspectors attend',
      'Deduct money from the sub-contractor\'s next payment and let the work carry on as it is',
    ],
    correctAnswer: 1,
    explanation:
      'The principal contractor has a duty under Regulation 13 to manage the construction phase. When a sub-contractor repeatedly fails to comply, the PC must take escalating action: formal written instruction, increased monitoring, work stoppage if necessary, and ultimately removal from site. All actions should be documented. The PC cannot simply ignore non-compliance as they remain responsible for site safety.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Managing non-compliant sub-contractors',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 178,
    question:
      'A construction worker suffers a serious injury and is incapacitated for more than 7 consecutive days (not counting the day of the accident). Under RIDDOR, within what timeframe must this be reported to the HSE?',
    options: [
      'Within 10 days of the accident, by the quickest practicable means',
      'Within 24 hours of the accident, by telephone to the HSE',
      'Within 15 days of the accident, using the appropriate online form',
      'Within 28 days of the accident, using the appropriate online form',
    ],
    correctAnswer: 2,
    explanation:
      "Under RIDDOR 2013, an over-7-day incapacitation injury must be reported to the HSE within 15 days of the accident using the online reporting form. This is different from 'specified injuries' (such as fractures) which must be reported immediately or as soon as practicable, and the HSE must be notified by the quickest practicable means.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'RIDDOR over-7-day reporting',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 179,
    question:
      'On a complex multi-phase project, the principal contractor must coordinate several high-risk activities occurring simultaneously: a deep excavation, crane operations, and live electrical work. Which management approach best demonstrates CDM 2015 compliance?',
    options: [
      'Carry out the three activities one after another so they never overlap, even if it doubles time',
      'Allow each activity to run independently and rely on workers to keep clear of one another',
      'Brief the workforce verbally each morning, but keep no written coordination records at all',
      'Use permits, task risk assessments, exclusion zones, supervisors and interface communication',
    ],
    correctAnswer: 3,
    explanation:
      'Managing concurrent high-risk activities requires a comprehensive coordination approach. Under Regulation 13, the principal contractor must plan, manage, and coordinate the construction phase. For simultaneous high-risk operations, this means formal permit-to-work systems, specific risk assessments and method statements for each activity, physical separation through exclusion zones, competent supervision, and clear communication protocols at the interfaces between activities.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Coordinating concurrent high-risk activities',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 180,
    question:
      'A principal contractor wishes to implement a continuous improvement approach to health and safety on a large project. Which combination of measures would best achieve this under CDM 2015?',
    options: [
      'Use inspections, audits, near-miss reporting, toolbox talks, consultation and CPP updates',
      'Rely solely on the annual HSE inspection visit to identify any improvements needed',
      'Update the construction phase plan only when a reportable accident occurs on the site',
      'Record incidents but take no further action, as the plan was approved at the very outset',
    ],
    correctAnswer: 0,
    explanation:
      'Continuous improvement under CDM 2015 requires a multi-faceted approach: regular proactive inspections, formal audits of the CPP and risk controls, near-miss and incident reporting, toolbox talks for frontline communication, lessons-learned reviews, worker consultation, analysis of incident trends, and ongoing updates to the CPP. This creates a feedback loop where findings drive improvements.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Continuous improvement approach',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 181,
    question:
      'Under CDM 2015, what minimum welfare provisions must be made available from the start of the construction phase?',
    options: [
      'Toilets only — washing and rest facilities may be added later once the site is established',
      'Toilets, washing with running water, drinking water, heated rest areas and changing facilities',
      'A first-aid room, a canteen serving hot meals, and a fully fitted site office for the workforce',
      'Drinking water only — other welfare facilities are required solely on notifiable projects',
    ],
    correctAnswer: 1,
    explanation:
      'Schedule 2 of CDM 2015 requires that welfare facilities be provided from the start of the construction phase. These include flushing toilets (or suitable alternatives), wash basins with hot and cold (or warm) running water, drinking water, heated rest areas with seating and facilities for preparing hot drinks, changing rooms and storage for clothing, and facilities for eating. All must be maintained in a clean, orderly condition.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Minimum welfare provisions',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 182,
    question:
      'A worker on a construction site observes what they believe is an unsafe practice by another worker. Under CDM 2015, what should they do?',
    options: [
      'Correct the other worker\'s method personally and say nothing about it to any supervisor or manager on the site',
      'Wait until the end of the project and raise the practice at the lessons-learned review held with the client',
      'Report the matter to the site supervisor, safety representative, or principal contractor as required by Regulation 8(4)',
      'Report the practice directly to the HSE on Form F10 before mentioning it to anyone else working on the site',
    ],
    correctAnswer: 2,
    explanation:
      "Under Regulation 8(4), every person working on a project must report anything they are aware of that is likely to endanger their own health or safety or that of any other person. Workers should use the established reporting mechanisms — typically reporting to their supervisor, safety representative, or the principal contractor's safety team.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Worker reporting duties',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 183,
    question: 'What is the legal consequence of failing to comply with a prohibition notice?',
    options: [
      'A fixed penalty notice of £100, after which the prohibited activity may resume',
      'A written warning only, with no further consequence on a first occasion at all',
      'A requirement to retrain the whole workforce before the activity may continue',
      'A criminal offence carrying prosecution, an unlimited fine and/or imprisonment',
    ],
    correctAnswer: 3,
    explanation:
      'Failing to comply with a prohibition notice is a criminal offence under Section 33 of HSWA 1974. On conviction, the penalties can include an unlimited fine and/or imprisonment. Prohibition notices must be complied with immediately — the prohibited activity must not resume until the matters specified in the notice have been resolved.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Consequences of non-compliance',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 184,
    question:
      'The principal contractor must ensure that no unauthorised persons access the construction site. Under CDM 2015, how should this be achieved?',
    options: [
      'By using reasonable steps such as fencing, hoarding, signage and controlled access points',
      'By relying on a single warning sign at the site entrance, with no physical barriers at all',
      'By posting a security guard only during nights and weekends when the work has stopped',
      'By taking out insurance against injury to any members of the public who enter the site',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 13(6), the principal contractor must take reasonable steps to prevent access to the construction site by any person whose presence could create a risk to health or safety. This includes appropriate physical barriers (fencing, hoarding), signage, controlled access points, and sign-in/sign-out procedures to track who is on site.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Preventing unauthorised access',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 185,
    question:
      "Under RIDDOR, which of the following is a 'dangerous occurrence' that must be reported?",
    options: [
      'A worker taking one day off after a minor sprain, returning to normal duties the next day',
      'The collapse, overturning, or failure of load-bearing parts of lifts and lifting equipment',
      'A delivery vehicle arriving late at the gate and delaying the day\'s work programme',
      'A worker receiving a verbal warning for not wearing a hard hat in a marked area',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR 2013 Schedule 2 lists dangerous occurrences that must be reported. The collapse, overturning, or failure of load-bearing parts of lifts and lifting equipment is a reportable dangerous occurrence. Other examples include scaffold collapses, explosions, building collapses, and electrical incidents causing fires or explosions.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'RIDDOR dangerous occurrences',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 186,
    question:
      'A principal contractor uses toolbox talks as part of their site safety communication. What is the purpose of toolbox talks?',
    options: [
      'To record the tools and equipment issued to each worker at the start of the shift',
      'To deliver formal classroom training leading to a nationally recognised qualification',
      'To give short, focused safety briefings on hazards relevant to the current work',
      'To brief the client on the commercial progress of the construction works to date',
    ],
    correctAnswer: 2,
    explanation:
      'Toolbox talks are short, focused health and safety briefings delivered to workers on site. They address specific topics relevant to current work activities, such as working at height, manual handling, or site-specific hazards. They are a practical tool for maintaining safety awareness and reinforcing the information in the construction phase plan.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Toolbox talks',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 187,
    question: 'Under CDM 2015, what happens if a project has only one contractor?',
    options: [
      'CDM 2015 does not apply at all to construction projects with only one contractor',
      'The client must still formally appoint a principal designer and principal contractor in writing',
      'The HSE appoints a principal contractor on the client behalf for single-contractor projects',
      'The contractor fulfils the principal contractor duties, with no separate appointments needed',
    ],
    correctAnswer: 3,
    explanation:
      'Where a project involves only one contractor, Regulation 5(3) provides that the contractor must fulfil the duties of the principal contractor as well. The client is not required to appoint a principal designer or principal contractor for single-contractor projects, though the project must still comply with all other relevant CDM requirements.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Single contractor projects',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 188,
    question: 'What is the role of a temporary works coordinator (TWC) on a construction site?',
    options: [
      'To act as the focal point ensuring temporary works are designed, checked and removed safely',
      'To coordinate the welfare facilities and the site canteen provision for the workforce',
      'To manage the temporary electrical and water supplies serving the project site offices',
      'To schedule the temporary employment of agency labour during the site peak periods',
    ],
    correctAnswer: 0,
    explanation:
      'A temporary works coordinator (TWC) is a key role in the management of temporary works such as formwork, falsework, propping, and excavation support. The TWC ensures that temporary works are properly designed by a competent designer, checked before loading, installed correctly, regularly inspected, and safely dismantled when no longer needed. This role is described in BS 5975.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Temporary works coordinator',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 189,
    question:
      'A specified injury occurs on a construction site on a Friday afternoon. Under RIDDOR, when must the HSE be notified?',
    options: [
      'Only on the next working day, once the weekend has passed and the office reopens',
      'Without delay by the quickest means, with a written report following within 10 days',
      'Within 15 days of the accident, using the online reporting form and nothing sooner',
      'Within 28 days of the accident, with no requirement for any immediate notification',
    ],
    correctAnswer: 1,
    explanation:
      'Under RIDDOR 2013, specified injuries (such as fractures, amputations, and loss of consciousness) must be reported to the HSE without delay. The initial notification should be by the quickest practicable means (usually telephone on 0345 300 9923), and a written report must follow within 10 days. The time or day of the week does not affect this obligation.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'RIDDOR immediate reporting',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 190,
    question:
      'Under CDM 2015, what is the relationship between the construction phase plan and the pre-construction information?',
    options: [
      'The two documents are unrelated and serve entirely separate purposes on the project',
      'The pre-construction information is written after the construction phase plan is finalised',
      'The plan is built using the PCI as a key input on how to manage the phase safely',
      'The construction phase plan replaces the pre-construction information once work starts',
    ],
    correctAnswer: 2,
    explanation:
      'The pre-construction information is a key input to the construction phase plan. The PCI provides information about hazards, existing site conditions, and design risks that the principal contractor must use to develop the CPP. The CPP then sets out how these risks will be managed during the construction phase, along with site rules, arrangements, and procedures.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CPP and PCI relationship',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 191,
    question:
      "A principal contractor identifies that a scaffolding sub-contractor's workers lack the necessary skills and training to erect a complex scaffold. What action must the principal contractor take?",
    options: [
      'Allow the work to proceed but increase the level of supervision during the erection',
      'Permit the work, provided the sub-contractor signs a disclaimer accepting the risk',
      'Allow the erection to continue and arrange training for the workers afterwards',
      'Stop the work until they have the required SKTE and only deploy qualified scaffolders',
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 13(2), the principal contractor must ensure that construction work is carried out, so far as is reasonably practicable, without risks to the health or safety of any person. If workers lack the necessary SKTE for a complex scaffold erection, the PC must not allow them to proceed. Only suitably qualified and experienced scaffolders should undertake the work.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Enforcing competence requirements',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 192,
    question: 'What is a near-miss and why is near-miss reporting important under CDM 2015?',
    options: [
      'An event causing no harm but with the potential to, reported to catch hazards early',
      'Any minor injury treated on site with a plaster, recorded but not reported to the HSE',
      'A delay to the construction programme caused by adverse weather conditions on site',
      'A worker arriving late for their shift, which must be logged in the site daily diary',
    ],
    correctAnswer: 0,
    explanation:
      'A near-miss is an event that could have resulted in injury, damage, or loss but did not. Near-miss reporting is a proactive safety tool — by identifying and investigating near-misses, the principal contractor can address hazards before they cause actual harm. This supports the continuous improvement of health and safety management required by CDM 2015.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Near-miss reporting',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 193,
    question:
      'Under CDM 2015 Regulation 13(3), what must the construction phase plan include as a minimum?',
    options: [
      'The priced bill of quantities and the agreed programme of payments to the contractors',
      'The welfare arrangements, the site rules, and any specific measures for Schedule 3 work',
      'The names and qualifications of every single worker expected to attend the site',
      'The as-built drawings and the information needed for future maintenance of the structure',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 13(3) requires the construction phase plan to include arrangements for welfare facilities, site rules, and specific measures for work listed in Schedule 3. Schedule 3 includes work involving particular risks such as burial, drowning, exposure to chemical or biological agents, work near high-voltage lines, work involving diving, and work in caissons.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'CPP minimum content',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 194,
    question:
      'A client on a domestic project hires a single contractor to build a conservatory extension. Which CDM 2015 duties apply?',
    options: [
      "CDM 2015 does not apply at all here, because the work is for a private homeowner",
      "The domestic client must personally fulfil every single client duty under Regulation 4",
      "Part 4 applies and the contractor takes the client duties; the client is not a duty holder",
      "Only the welfare provisions of Schedule 2 apply, and no other CDM duties are engaged",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 applies to domestic projects, but with modifications. The domestic client is not themselves a duty holder (Regulation 7). Instead, their duties are transferred to the contractor (for single-contractor projects) or the principal contractor/principal designer (for multi-contractor projects). Part 4 duties and the contractor's own Regulation 15 duties apply in full.",
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Domestic projects — duty transfer',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 195,
    question:
      'What is the purpose of site safety inspections carried out by the principal contractor?',
    options: [
      'To measure the progress of the works against the agreed construction programme',
      'To check that the materials on site match the quantities in the bill of quantities',
      'To allocate blame to individual workers after an accident has occurred on the site',
      'To find hazards, check controls work, verify CPP compliance and identify corrective action',
    ],
    correctAnswer: 3,
    explanation:
      'Site safety inspections are a key proactive monitoring tool for the principal contractor. Their purpose is to identify hazards before they cause harm, check that the risk controls specified in the CPP are in place and working, verify compliance with site rules, and identify any areas requiring corrective action. Inspection findings should be recorded and acted upon.',
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'Purpose of site safety inspections',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 196,
    question:
      'Under CDM 2015, what obligation does the principal contractor have regarding emergency procedures?',
    options: [
      'They must maintain first-aid, fire and evacuation procedures, tested and understood by all',
      'They need only display the local emergency telephone numbers on the site notice board',
      'They may leave the emergency arrangements to each sub-contractor for its own workers',
      'They must produce emergency procedures only on projects notifiable to the HSE',
    ],
    correctAnswer: 0,
    explanation:
      'The principal contractor must ensure appropriate emergency procedures are in place as part of managing the construction phase. This includes arrangements for first aid (complying with the Health and Safety (First-Aid) Regulations 1981), fire precautions, and evacuation procedures. These must be communicated to all workers, tested through drills, and updated as the project evolves.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Emergency procedures',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 197,
    question:
      'A principal contractor is auditing their health and safety management system on a large construction project. Which of the following would indicate an effective system?',
    options: [
      'A construction phase plan that is fully written up and filed, even if not followed on site',
      'Evidence the CPP is followed, risk assessments are reviewed, and incidents drive improvement',
      'A complete absence of reported incidents, regardless of whether near-misses are logged',
      'A single generic risk assessment used for every project the contractor ever undertakes',
    ],
    correctAnswer: 1,
    explanation:
      'An effective health and safety management system under CDM 2015 is demonstrated by practical implementation, not just paperwork. Key indicators include the CPP being actively followed, site-specific risk assessments, worker engagement, thorough incident investigation, near-miss tracking, and evidence of continuous improvement. A system that exists only on paper does not comply with the spirit of CDM 2015.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Effective H&S management indicators',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 198,
    question:
      'Schedule 2 of CDM 2015 requires washing facilities on construction sites. What specific requirements apply?',
    options: [
      'Cold running water only is required; hot water is needed solely where chemicals are handled',
      'A single shared bucket of water is acceptable, provided it is refreshed at least each day',
      'Hot and cold (or warm) running water, soap or cleaning agents, and means of drying',
      'Hand sanitiser gel alone is sufficient, and running water need not be provided at all',
    ],
    correctAnswer: 2,
    explanation:
      'Schedule 2, paragraph 2 of CDM 2015 requires washing facilities with hot and cold (or warm) running water, soap or other cleaning agents, and towels or other means of drying. These facilities must be provided adjacent to sanitary conveniences and, where needed, adjacent to changing rooms. They must be in a clean, orderly condition and adequately ventilated and lit.',
    section: 'cdm-regulations',
    difficulty: 'intermediate',
    topic: 'Washing facility requirements',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 199,
    question:
      'A worker appeals against a prohibition notice served by an HSE inspector. Does the appeal suspend the prohibition notice?',
    options: [
      'Yes — lodging an appeal automatically suspends the notice until the tribunal decides',
      'Yes — the activity may resume as soon as the appeal paperwork has been submitted',
      'Yes — but only if the employer pays a bond to cover the whole period of the appeal',
      'No — it stays in force during appeal unless the tribunal directs otherwise',
    ],
    correctAnswer: 3,
    explanation:
      'Under Section 24 of HSWA 1974, an appeal against a prohibition notice does NOT suspend the notice. The prohibited activity must remain stopped during the appeal unless the employment tribunal specifically directs otherwise. This is a critical distinction from improvement notices, which are suspended during an appeal. The rationale is that prohibition notices address risks of serious personal injury.',
    section: 'cdm-regulations',
    difficulty: 'advanced',
    topic: 'Prohibition notice appeals',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 200,
    question:
      "Under CDM 2015, what is the overarching objective of the principal contractor's management of the construction phase?",
    options: [
      'To plan, manage and monitor construction work so it is done without risk, where practicable',
      'To deliver the construction works within the client agreed programme and budget',
      'To maximise productivity on site so that the project finishes ahead of schedule',
      'To minimise the volume of paperwork generated during the construction phase',
    ],
    correctAnswer: 0,
    explanation:
      "The overarching objective of the principal contractor's management under Regulations 13 and 14 is to ensure construction work is planned, managed, and monitored so that it is carried out, so far as is reasonably practicable, without risks to the health or safety of any person. This encompasses all aspects of site management including the CPP, welfare, inductions, coordination, monitoring, and emergency procedures.",
    section: 'cdm-regulations',
    difficulty: 'basic',
    topic: 'PC overarching objective',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 201,
    question: 'Under CDM 2015, which of these people is a domestic client?',
    options: [
      'A landlord having a rented flat rewired as part of a letting business',
      'A homeowner having their own house rewired for their own private use',
      'A housing association having a rewire done across its rented stock',
      'A cafe owner having the trading area rewired above their own flat',
    ],
    correctAnswer: 1,
    explanation:
      'A domestic client is someone who has construction work done on their own home, or the home of a family member, which is not done in connection with a business. The landlord is the tempting wrong answer because the property is a house, but CDM looks at the purpose of the work, not the type of building: landlords, housing associations, charities and other businesses own domestic property yet act as commercial clients, and work tied to a business attached to a home is also commercial.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Domestic Client',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 202,
    question: 'On a domestic project where only one contractor is engaged, who normally carries out the client duties?',
    options: [
      'The domestic client keeps every client duty in the Regulations',
      'The local authority building control body holds the client duties',
      'The contractor carrying out the work takes on the client duties',
      'Nobody holds the client duties because the client is domestic',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 7 does not remove the client duties, it moves them. On a single contractor project they pass to that contractor, who then carries the client duties as well as their own contractor duties. The idea that the duties simply vanish is the common misreading: domestic clients remain in scope of CDM 2015, and building control has no role at all in the transfer.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Domestic Client',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 203,
    question: 'A worker on site notices a damaged temporary supply lead. What does CDM 2015 require of that worker?',
    options: [
      'Record the defect in a personal diary and raise it at the next review',
      'Repair the lead immediately whatever their training or competence',
      'Wait for the site inspection so the defect is picked up formally',
      'Report it to the person controlling the work as soon as they can',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 8(5) says a person working on a project under the control of another must report anything they are aware of which is likely to endanger their own health or safety or that of others. Waiting for a scheduled inspection is attractive because it feels procedural, but it leaves a live hazard in place; reporting is immediate and unconditional, and a repair is only appropriate if the worker is competent and authorised to do it.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Worker Duties',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 204,
    question: 'A self-employed electrician is the only contractor on a full rewire for a homeowner. Who carries the client duties?',
    options: [
      'The electrician, who takes on the client duties alongside their own',
      'The principal contractor appointed by the homeowner in writing',
      'The homeowner, because domestic clients keep all their own duties',
      'The principal designer, by default, on any single contractor job',
    ],
    correctAnswer: 0,
    explanation:
      'With one contractor and a domestic client, regulation 7(1)(a) passes the client duties to that contractor. The principal contractor answer is the trap: a principal contractor only exists where more than one contractor is involved, so on a one-electrician rewire there is no principal contractor and no principal designer to inherit anything. The electrician wears both hats and must also draw up the construction phase plan.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Domestic Client',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 205,
    question: 'What triggers the duty on a client to appoint a principal designer and a principal contractor?',
    options: [
      'The project being notifiable to the relevant enforcing authority',
      'More than one contractor working, or foreseeably working, on it',
      'The construction phase lasting longer than a single working week',
      'Any design work being carried out before the site is set up',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 5(1) bites where there is more than one contractor, or where it is reasonably foreseeable that more than one contractor will be working on the project at any time. Notification is the classic confusion: notification and appointment are separate tests, and a small non-notifiable job with a builder and an electrician still needs both appointments made in writing.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Duty Holders',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 206,
    question: 'A homeowner engages an architect and a builder but makes no written appointments at all. What is the effect of regulation 7?',
    options: [
      'No principal designer or principal contractor exists for the project',
      'The homeowner is treated as both principal designer and contractor',
      'The designer and contractor in control of each phase fill the roles',
      'The enforcing authority appoints suitable dutyholders on request',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 7(2) supplies an automatic default: the designer in control of the pre-construction phase is the principal designer, and the contractor in control of the construction phase is the principal contractor. Assuming the roles simply do not exist is the common error and is dangerous, because the person who has quietly become principal contractor still owes every regulation 12 to 14 duty whether they realise it or not.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Domestic Client',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 207,
    question: 'How can a domestic client pass the client duties to the principal designer rather than the principal contractor?',
    options: [
      'By naming the principal designer on the notification sent to the HSE',
      'By instructing the principal contractor to hand the duties over',
      'By appointing the principal designer before the contractor starts',
      'By making a written agreement with the principal designer to do so',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 7(1)(c) allows the client duties to sit with the principal designer only where there is a written agreement to that effect. Appointing the principal designer early is the plausible-sounding wrong answer, but the order of appointment changes nothing: without the written agreement the duties transfer to the principal contractor automatically, and the principal contractor cannot pass them on by instruction.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Domestic Client',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 208,
    question: 'When is a health and safety file required under CDM 2015?',
    options: [
      'On any project that involves more than one contractor working',
      'On every project, including single contractor domestic work',
      'On notifiable projects where a notification has been submitted',
      'On projects where the client already holds an older file',
    ],
    correctAnswer: 0,
    explanation:
      'The health and safety file is required for projects involving more than one contractor, and the principal designer prepares it. Tying it to notification is the frequent mistake: notification is about size, the file is about how many contractors are involved, so a large notifiable job with a single contractor needs no file while a modest two-trade job does.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Health and Safety File',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 209,
    question: 'Which of these should be kept OUT of the health and safety file?',
    options: [
      'The nature and location of significant concealed live services',
      'The construction phase plan and detailed safety method statements',
      'Hazards not eliminated by design and how they were addressed',
      'As-built drawings of the building plant and equipment installed',
    ],
    correctAnswer: 1,
    explanation:
      'L153 is explicit that the file should not include pre-construction information, the construction phase plan, contractual documents or method statements, because they clog the file with material of no use when planning future work. The construction phase plan is the tempting answer to keep, since it is a genuine safety document, but it describes how this build was run, not what a future electrician needs to know about the finished building.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Health and Safety File',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 210,
    question: 'Under regulation 6, which duration and workforce combination makes a project notifiable?',
    options: [
      'More than 30 working days duration on its own, whatever the workforce',
      'More than 20 workers on site at once on its own, whatever the duration',
      'More than 30 working days AND more than 20 workers at the same time',
      'More than 500 workers engaged across the whole life of the project',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 6(1)(a) requires both limbs together: scheduled to last longer than 30 working days and to have more than 20 workers working simultaneously at any point. There is a separate alternative trigger where the work is scheduled to exceed 500 person days. Reading the 500 figure as a headcount is the classic slip, and either single limb of the first test on its own is not enough.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Notification',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 211,
    question: 'When counting the 30 working days in regulation 6, what counts as a working day?',
    options: [
      'Any day on which construction work takes place on the project',
      'Any calendar day between the start and the end of the build',
      'Any weekday excluding recognised public and bank holidays',
      'Any day on which at least twenty workers are on the site',
    ],
    correctAnswer: 0,
    explanation:
      'CDM 2015 defines a working day as any day on which construction work takes place. Counting calendar days is the intuitive wrong answer and inflates the total, because a shutdown week or a run of days with nobody on site adds nothing to the count. The definition is about activity, not about the calendar or the size of the gang on any given day.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Notification',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 212,
    question: 'On a commercial project, who must give written notice of a notifiable project to the enforcing authority?',
    options: [
      'The principal contractor, as the dutyholder running the site',
      'The client, who may ask someone else to submit it for them',
      'The principal designer, as part of pre-construction planning',
      'Each contractor separately, before starting their own work',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 6(2) puts the duty to notify on the client, as soon as practicable before the construction phase begins. In practice the client often asks the principal contractor to submit it, and that is allowed, but the legal duty stays with the client. Assuming the principal contractor owns the duty is the common error and is exactly how notifications get missed on projects where the client is inexperienced.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Notification',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 213,
    question: 'What must happen to the notification once a notifiable project is under way?',
    options: [
      'It is filed with the health and safety file at project handover',
      'It is sent to every contractor bidding for work on the project',
      'It is displayed in the site office where any worker can read it',
      'It is retained by the enforcing authority and not shown on site',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 6(3) requires the notice to be clearly displayed in the construction site office in a comprehensible form, and to be updated periodically if it changes. Filing it with the health and safety file sounds tidy but defeats the purpose: the point of display is that any worker on site can see who the dutyholders are while the work is live, not after handover.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Notification',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 214,
    question: 'A domestic rewire is plainly not notifiable. What does that mean for the CDM 2015 duties on the job?',
    options: [
      'The Regulations still apply in full to the project as a whole',
      'Only the Part 4 site requirements apply to work of that size',
      'The Regulations do not apply until a second trade is engaged',
      'The Regulations apply only once the client asks for them to',
    ],
    correctAnswer: 0,
    explanation:
      'L153 states plainly that the requirements of CDM 2015 apply whether or not the project is notifiable. Notification is a reporting threshold, nothing more. Treating a small job as exempt is the single most common misunderstanding among domestic electricians, and it is why so many sole traders do not realise they are holding the client duties on a rewire.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Notification',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 215,
    question: 'Who holds the main duty for providing pre-construction information to designers and contractors?',
    options: [
      'The principal designer, who gathers and issues it to the team',
      'The client, helped by the principal designer on larger jobs',
      'The principal contractor, through the construction phase plan',
      'Each designer, for the parts of the design they produced',
    ],
    correctAnswer: 1,
    explanation:
      'The client has the main duty to provide pre-construction information as soon as practicable to each designer and contractor bidding for or appointed to the work. On projects with more than one contractor the principal designer assists in pulling it together, which is why the first option is so tempting, but assisting is not owning. On a single contractor project the responsibility is the client alone.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Pre-Construction Information',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 216,
    question: 'An electrician is asked to price a refurbishment and receives no pre-construction information at all. What is the right response?',
    options: [
      'Price on assumptions and raise any issues once work has begun',
      'Decline all refurbishment work where no information is issued',
      'Ask the client or principal designer for the information needed',
      'Rely on the health and safety file being produced at handover',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 8(4) requires dutyholders to co-operate to the extent necessary for others to fulfil their duties, and pre-construction information exists precisely so bidders can price and plan the work safely. Pricing on assumptions is the commercially tempting choice, but it means committing to a programme without knowing about asbestos, buried services or structural constraints, and the file is produced at the end so it cannot help you now.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Pre-Construction Information',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 217,
    question: 'Which of these is pre-construction information an electrician should expect to be given?',
    options: [
      'An asbestos survey and any existing health and safety file',
      'The finished test results from the completed installation',
      'The commercial tender comparison used to select the trades',
      'The site diary kept by the supervisor during the build',
    ],
    correctAnswer: 0,
    explanation:
      'Pre-construction information is information already held by the client or reasonably obtainable, including existing surveys, structural drawings and any health and safety file from earlier work. Test results from the completed installation are the wrong direction in time: they are an output of the job, whereas pre-construction information is what you need before you start in order to plan and price safely.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Pre-Construction Information',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 218,
    question: 'Who must draw up the construction phase plan, and by what point?',
    options: [
      'The principal designer, once the design work has been signed off',
      'The client, before any contractor is invited to price the work',
      'The principal contractor, or the sole contractor on a one trade job',
      'The principal contractor only where the project is notifiable',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 12(1) puts the plan on the principal contractor during the pre-construction phase and before the site is set up; regulation 15(5) puts the same duty on the contractor where there is only one. The principal designer answer is attractive because they hold the information, but their role is to assist by passing that information over, not to write the plan.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Construction Phase Plan',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 219,
    question: 'Which material does the guidance say should be kept out of the construction phase plan?',
    options: [
      'Site rules and the arrangements for co-operation between trades',
      'Generic risk assessments and records of how decisions were made',
      'Arrangements for site induction, welfare and emergency procedures',
      'Specific measures for the particular risks listed in Schedule 3',
    ],
    correctAnswer: 1,
    explanation:
      'The plan must be easy to understand and proportionate, so generic risk assessments, records of how decisions were reached and detailed method statements are to be left out. Bundling in generic assessments feels safe and thorough, which is why it is so common, but it buries the arrangements that people on site actually need to read and act on.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Construction Phase Plan',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 220,
    question: 'What must happen to the construction phase plan as the job progresses?',
    options: [
      'It is reviewed, updated and revised so it stays fit for purpose',
      'It is frozen at the start so the agreed method is not altered',
      'It is replaced by the health and safety file at first fix stage',
      'It is reissued only when the enforcing authority asks to see it',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 12(4) requires the principal contractor to ensure the plan is reviewed, updated and revised so it continues to control the risks. Freezing the plan sounds like good discipline but is wrong in law and in practice: discovering an unexpected supply, a change of sequence or a new trade on site all change the risk picture, and the plan has to follow.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Construction Phase Plan',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 221,
    question: 'Before starting construction work, what must a contractor satisfy themselves about under regulation 15(1)?',
    options: [
      'That the design has been checked by a competent third party',
      'That a written contract has been signed by all the parties',
      'That the enforcing authority has accepted the notification',
      'That the client is aware of the client duties under CDM 2015',
    ],
    correctAnswer: 3,
    explanation:
      'A contractor must not carry out construction work unless satisfied the client is aware of the duties owed by the client under CDM 2015. This is a real duty on the electrician, not a courtesy. The signed contract answer is attractive because it feels like the normal commercial gate, but a contract says nothing about whether a homeowner understands they are now carrying client duties.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Subcontracting',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 222,
    question: 'A subcontracting electrician joins a site alongside several other trades. What does regulation 15(3) require of them?',
    options: [
      'To write their own construction phase plan for their part',
      'To take over co-ordination of the trades working nearby',
      'To notify the enforcing authority of their own arrival',
      'To follow directions given and the relevant parts of the plan',
    ],
    correctAnswer: 3,
    explanation:
      'Where more than one contractor is working, a contractor must comply with directions from the principal designer or principal contractor and with the parts of the construction phase plan relevant to their own work. Writing your own plan is the seductive wrong answer because it feels responsible, but that duty only falls to a contractor who is the only contractor on the project.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Subcontracting',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 223,
    question: 'An electrician is offered a role on a project they are not equipped to carry out. What does regulation 8 require?',
    options: [
      'They may accept it if they arrange supervision after starting',
      'They must not accept the appointment unless they are equipped',
      'They may accept it once the client has been told in writing',
      'They must accept it and report shortfalls to the enforcing body',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 8(2) prohibits a designer or contractor from accepting an appointment unless they have the skills, knowledge and experience, and the organisational capability if they are a business, to fulfil the role safely. Arranging supervision afterwards is the practical-sounding answer, but the test applies at the point of accepting the work, not once you are already committed to the programme.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Duty Holders',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 224,
    question: 'An electrician engages a self-employed mate to help on a site. What must the electrician do before appointing them?',
    options: [
      'Notify the principal designer that a new worker is starting',
      'Obtain written confirmation from the client of the engagement',
      'Add the mate to the health and safety file for the project',
      'Take reasonable steps to check their skills and experience',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 8(3) puts a duty on anyone appointing a designer or contractor to take reasonable steps to satisfy themselves the appointee has the necessary skills, knowledge and experience. Adding names to the health and safety file is the misconceived option: the file records information about the finished building for future work, not who worked on it.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Subcontracting',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 225,
    question: 'Regulation 8(4) requires dutyholders to co-operate with one another. How far does that duty reach?',
    options: [
      'Only to those directly employed by the same contractor on site',
      'To dutyholders named in the written appointment documents alone',
      'To others working on the project or on an adjoining site too',
      'To the client alone, since the client manages the whole project',
    ],
    correctAnswer: 2,
    explanation:
      'The duty to co-operate extends to any other person working on or in relation to a project at the same or an adjoining construction site, to the extent necessary for them to fulfil their duties. Limiting it to your own employer is the natural assumption, but hazards do not respect the hoarding line: an isolation you carry out can put the neighbouring site at risk, and the duty follows the risk.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Co-operation',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 226,
    question: 'On a project with several contractors, who must ensure suitable and sufficient welfare facilities are provided?',
    options: [
      'The principal contractor, throughout the whole construction phase',
      'The client, who pays for the site set-up and its running costs',
      'The principal designer, as part of planning the site layout',
      'Each worker, who must arrange facilities for their own use',
    ],
    correctAnswer: 0,
    explanation:
      'The principal contractor must ensure suitable and sufficient welfare facilities are provided and maintained throughout the construction phase, liaising with the other contractors so the provision matches the workforce. The client answer is half right and therefore dangerous: the client must make sure welfare is provided as part of the management arrangements, but the operational duty on site sits with the principal contractor.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Welfare',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 227,
    question: 'By when must welfare facilities be available on a construction site?',
    options: [
      'By the end of the first week that work is under way on site',
      'Before any construction work starts, and kept until the end',
      'Once the workforce on site exceeds five people at any time',
      'Only when the project has been notified to the authority',
    ],
    correctAnswer: 1,
    explanation:
      'Facilities must be made available before any construction work starts and maintained until the end of the project. Waiting until the site is up and running is the usual practice on rushed jobs and it is wrong: the first days of a job, when enabling work and strip-out happen, are exactly when people need washing facilities and somewhere to take a break.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Welfare',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 228,
    question: 'A lone electrician is the only contractor on a domestic job. Who must ensure welfare facilities are available?',
    options: [
      'The homeowner, as the occupier of the premises being worked on',
      'The electrician, who must ensure suitable facilities are there',
      'Nobody, because welfare rules apply to notifiable sites only',
      'The principal contractor appointed to manage the domestic job',
    ],
    correctAnswer: 1,
    explanation:
      'On projects involving only one contractor, that contractor must ensure suitable welfare facilities are available, meeting the minimum requirements of Schedule 2 so far as is reasonably practicable. Pointing at the homeowner is the instinctive answer, but the duty follows control of the work, and in any case the client duties on this job have already transferred to the electrician.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Welfare',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 229,
    question: 'Who must ensure every worker on a multi-contractor site is given a suitable site induction?',
    options: [
      'The client, as part of maintaining the management arrangements',
      'The principal designer, before the construction phase begins',
      'The principal contractor, for every worker coming onto site',
      'The enforcing authority inspector on the first site visit',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 13 requires the principal contractor to ensure every site worker receives a suitable, site-specific induction covering the particular risks and controls. There is a backstop worth knowing: under regulation 15(9)(a) a contractor must give their own workers an induction where the principal contractor has not already done so, so an electrician cannot simply assume it has been handled.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Principal Contractor',
    category: 'Construction Phase & Compliance',
  },
  {
    id: 230,
    question: 'What does regulation 14 add to the duties a principal contractor already owes on consulting workers?',
    options: [
      'Consulting and engaging workers on the project, beyond employer duties',
      'Replacing the separate employer duty to consult with employees',
      'Consulting only workers directly employed by that principal contractor',
      'Consulting the client before any change to the agreed site rules',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 14 duties sit on top of the separate legal duty an employer owes to consult its own employees, and they reach all workers engaged in the construction work, not just direct employees. Reading regulation 14 as a replacement is the error: a subcontracted electrician is consulted by the principal contractor on project matters and by their own employer on employment matters.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Principal Contractor',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 231,
    question: 'On site an electrician alters the specified cable route and containment to suit the building. What does that make them under CDM 2015?',
    options: [
      'A designer, with designer duties for the change they have made',
      'A principal designer for that element of the installation work',
      'A worker only, since the change was made during the build',
      'A client, because they have altered what was originally asked for',
    ],
    correctAnswer: 0,
    explanation:
      'A designer is anyone who prepares or modifies a design, and design includes drawings, specifications and calculations. Specialist contractors who specify or alter a design take on designer duties for what they change. The tempting answer is that the change happened during construction so it is just work: the timing is irrelevant, the act of modifying the design is what pulls in the duty to eliminate or control the risks it creates.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Designer Duties',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 232,
    question: 'What is the core duty of a principal designer under regulation 11?',
    options: [
      'To approve the designs produced by every other designer engaged',
      'To plan, manage, monitor and co-ordinate the pre-construction phase',
      'To supervise the trades carrying out the work on the finished site',
      'To prepare the construction phase plan on behalf of the contractor',
    ],
    correctAnswer: 1,
    explanation:
      'The principal designer plans, manages and monitors the pre-construction phase and co-ordinates health and safety matters during it, identifying and eliminating or controlling foreseeable risks and making sure designers do their jobs. Approving other designs is the plausible distractor, but the role is co-ordination and risk elimination, not sign-off, and the construction phase plan belongs to the principal contractor.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Principal Designer',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 233,
    question: 'The principal designer leaves a project before it finishes. What happens to the health and safety file?',
    options: [
      'It is sent to the client immediately in whatever state it is in',
      'It is abandoned and a fresh file is started at practical completion',
      'It passes to the principal contractor, who updates and completes it',
      'It passes to the designer with the largest remaining design package',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 12(8) requires the principal designer to pass the file to the principal contractor if their appointment concludes early, and the principal contractor then reviews, updates and revises it before handing it to the client at the end. Sending a half-finished file straight to the client is the tempting shortcut, but it leaves nobody responsible for the information generated during the rest of the build.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Health and Safety File',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 234,
    question: 'Once a project finishes, what must the client do with the health and safety file?',
    options: [
      'Send it to the enforcing authority to be kept on the public record',
      'Destroy it once the installation certificates have been handed over',
      'Keep it only until the defects liability period has expired in full',
      'Retain it and keep it available to anyone who needs it, for years',
    ],
    correctAnswer: 3,
    explanation:
      'The client must retain the file and keep it available to anyone who needs it to comply with health and safety law for as long as it stays relevant, normally the lifetime of the building. It can be held electronically, on paper, on film or any other durable form. Tying its life to the defects period is the attractive wrong answer, but the file exists for the next project, which may be decades away.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Health and Safety File',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 235,
    question: 'A client sells the building partway through its life. What must happen to the health and safety file?',
    options: [
      'It is given to the buyer, who is made aware of what it is for',
      'It is retained by the seller as a record of the earlier works',
      'It is lodged with the local authority as part of the sale process',
      'It is returned to the principal designer who originally wrote it',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4(7) is satisfied by providing the file to the person acquiring the interest and ensuring they are aware of its nature and purpose. Simply handing over a folder is not enough, since a buyer who does not know what it is will never consult it. Keeping it as a personal record is the natural instinct but strands the safety information away from the building it describes.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Health and Safety File',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 236,
    question: 'A commercial client fails to appoint a principal designer or a principal contractor. What is the consequence?',
    options: [
      'The project cannot lawfully start until the appointments are made',
      'The client must carry out those duties themselves for the project',
      'The largest contractor is deemed to hold both of the two roles',
      'The duties fall away until the client chooses to make them',
    ],
    correctAnswer: 1,
    explanation:
      'Where a commercial client does not make the appointments, the client must carry out the principal designer and principal contractor duties themselves. This is deliberately different from the domestic route: regulation 5(3) and (4) do not apply to a domestic client, and instead regulation 7(2) automatically installs the designer and contractor in control of each phase, so the duties never sit with the homeowner.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Duty Holders',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 237,
    question: 'A homeowner carries out a rewire on their own house entirely themselves, engaging nobody. How does CDM 2015 apply?',
    options: [
      'It applies in full, with the homeowner holding the client duties',
      'It applies only to the parts of the work involving live testing',
      'It does not apply at all, because the work is classed as DIY',
      'It applies once the work is notified to the enforcing authority',
    ],
    correctAnswer: 2,
    explanation:
      'The Appendix 6 flow chart is clear that where the work is not being carried out by someone on behalf of the client it is DIY and CDM 2015 does not apply. Note carefully what changes the answer: the moment the homeowner engages anyone to do the work for them they become a domestic client and the transfer provisions in regulation 7 take effect. Other law, such as the Building Regulations, still applies either way.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Domestic Client',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 238,
    question: 'Can one business hold more than one dutyholder role on the same project?',
    options: [
      'No, CDM 2015 requires the roles to be held by separate parties',
      'No, unless the enforcing authority has agreed to it in writing',
      'Yes, but only where the project is not notifiable to the HSE',
      'Yes, where it has the skills, knowledge and capability for each',
    ],
    correctAnswer: 3,
    explanation:
      'L153 states that organisations or individuals can carry out the role of more than one dutyholder, provided they have the skills, knowledge, experience and organisational capability to do each in a way that secures health and safety. This matters to a design-and-install electrical firm, which may be designer, principal designer and principal contractor at once. Insisting on separate parties is a common misconception with no basis in the Regulations.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Duty Holders',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 239,
    question: 'How does the principal designer role compare with the CDM co-ordinator role it replaced?',
    options: [
      'It is a different role, with a different range of duties to carry out',
      'It is the same role under a new name introduced by CDM 2015',
      'It is the co-ordinator role transferred to the principal contractor',
      'It is an advisory role with no duties of its own under the rules',
    ],
    correctAnswer: 0,
    explanation:
      'L153 warns explicitly that principal designers are not a direct replacement for CDM co-ordinators and that the range of duties they carry out is different. The rename assumption is the trap and it has practical bite: a principal designer must be a designer with control over the pre-construction phase, so a bolt-on adviser with no design control cannot properly fill the role.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Principal Designer',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 240,
    question: 'What do the general principles of prevention require a dutyholder to do first?',
    options: [
      'Issue personal protective equipment to everyone entering the site',
      'Avoid the risk where possible before evaluating what is left',
      'Record the residual risk in the health and safety file for later',
      'Brief the workforce so they can accept the risk knowingly',
    ],
    correctAnswer: 1,
    explanation:
      'The principles run in order: avoid risks where possible, evaluate those that cannot be avoided, then put proportionate measures in place to control them at source. Reaching for personal protective equipment first inverts the hierarchy, since it protects one person at the end of the chain rather than removing the hazard for everyone. Designers, principal designers, principal contractors and contractors must all take these principles into account.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Risk Management',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 241,
    question: 'What must the principal designer give the principal contractor to help prepare the construction phase plan?',
    options: [
      'A completed health and safety file covering the finished works',
      'Approval of the site rules chosen by the principal contractor',
      'A programme setting out the sequence the trades must follow',
      'The pre-construction information and design risk information held',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12(3) requires the principal designer to pass over all information they hold that is relevant to the plan, including pre-construction information from the client and the risk information designers provide about what they could not eliminate. Handing over a finished file is impossible at that stage, because the file is built up as the project runs and is completed at the end.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Construction Phase Plan',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 242,
    question: 'Even though a contractor writes it, what duty does the client have over the construction phase plan?',
    options: [
      'To sign the plan off as technically correct before work starts',
      'To issue the plan to each contractor bidding for the work',
      'To ensure it is drawn up before the construction phase begins',
      'To hold the plan on file until the building is finally sold',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 4(5)(a) makes the client ensure a plan is drawn up before the construction phase begins, and the client must also see that it genuinely addresses the risks and is kept under review. Signing it off as technically correct is the overreach: the client is not required to have that expertise, only to make sure a proper plan exists and is used.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Construction Phase Plan',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 243,
    question: 'A domestic job started with one electrician now needs a plasterer as well. What changes under CDM 2015?',
    options: [
      'Nothing changes, as the electrician started as sole contractor',
      'The homeowner takes back the client duties from that point on',
      'The plasterer becomes principal contractor as the later trade',
      'A principal designer and principal contractor are now needed',
    ],
    correctAnswer: 3,
    explanation:
      'Once more than one contractor is involved, or that becomes reasonably foreseeable, the project needs both appointments, a health and safety file becomes required, and the client duties now pass to the principal contractor rather than the sole contractor. Assuming nothing changes is the real-world failure mode, because the electrician who brought the plasterer in is usually the one in control of the construction phase and so becomes principal contractor by default.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Domestic Client',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 244,
    question: 'Which of these belongs in the health and safety file for a completed installation?',
    options: [
      'The daily site attendance sheets kept during the works',
      'The signed order and variation account for the electrical works',
      'The nature, location and marking of significant buried services',
      'The generic risk assessment used for the cable pulling work',
    ],
    correctAnswer: 2,
    explanation:
      'The file should cover the nature, location and markings of significant services, including underground cables and gas supply equipment, along with as-built drawings and residual hazards. Contractual paperwork is specifically excluded, and so are generic risk assessments: the test is whether the information will help someone plan future work safely, not whether it documents how this job was run.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Health and Safety File',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 245,
    question: 'What specific co-ordination duty does regulation 13 place on the principal contractor?',
    options: [
      'To hold the certificates of every trade working on the site',
      'To organise co-operation between contractors, including later ones',
      'To carry out the risk assessments on behalf of each contractor',
      'To employ the contractors directly rather than through others',
    ],
    correctAnswer: 1,
    explanation:
      'The principal contractor must organise co-operation between contractors, expressly including successive contractors on the same site, so a trade arriving later receives the information and instruction it needs. Taking over other contractors risk assessments is the overstep: each contractor keeps its own duty to plan, manage and monitor its work, and the principal contractor co-ordinates rather than absorbs that duty.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Co-operation',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 246,
    question: 'On a domestic project a written agreement gives the client duties to the principal designer. Who does the principal contractor work to as client?',
    options: [
      'The homeowner, who remains the client for all purposes',
      'The enforcing authority, until the agreement is registered',
      'Nobody, because the client duties have been extinguished',
      'The principal designer, who now holds the client duties too',
    ],
    correctAnswer: 3,
    explanation:
      'Where the domestic client agrees in writing with the principal designer, that principal designer fulfils the client duties as well as their own, and the principal contractor works to them as the client for the project. Continuing to treat the homeowner as the client is the natural but wrong instinct, and it leaves the principal contractor chasing decisions from someone who no longer carries those duties.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Domestic Client',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 247,
    question: 'A project has several clients. What does CDM 2015 allow them to do?',
    options: [
      'Agree in writing that one or more of them is treated as the client',
      'Divide the duties equally between them without any paperwork',
      'Pass all of the client duties to the principal contractor by default',
      'Nominate the principal designer to act as the client for them',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4(8) lets one or more clients agree in writing to be treated as the only client, after which the others are relieved of most client duties. Two duties still bind every client: co-operating under regulation 8(4), and providing information they hold. Informally dividing duties without writing anything down leaves each client fully liable and is exactly the gap that leads to nobody providing pre-construction information.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Client Duties',
    category: 'Duty Holders & Their Roles',
  },
  {
    id: 248,
    question: 'A domestic client controls the way some of the construction work on their own home is carried out. What follows from that?',
    options: [
      'They become a commercial client for the whole of the project',
      'They must appoint a principal designer for the work concerned',
      'They must comply with Part 4 so far as it is within their control',
      'They must notify the enforcing authority before the work starts',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 16(3) requires a domestic client who controls how construction work is carried out to comply with the Part 4 site requirements so far as they relate to matters within their control. Becoming a commercial client is the overreaction: the status test still turns on whether the work is in connection with a business, and it is control over the work, not ownership of the house, that pulls in the Part 4 duties.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Domestic Client',
    category: 'Introduction to CDM 2015',
  },
  {
    id: 249,
    question: 'How must information or instruction required by CDM 2015 be provided?',
    options: [
      'In a formal written report signed by the person providing it',
      'Through the health and safety file at the end of the project',
      'Only in English, so it can be read by the enforcing authority',
      'In a form that is comprehensible, and as soon as practicable',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 8(6) requires information and instruction to be comprehensible and provided as soon as practicable. Comprehensible is doing real work in that sentence: a document nobody on site can read, whether because of language or because it is buried in jargon, has not been provided in law. Insisting on a signed written report adds formality without addressing whether the message actually landed.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Co-operation',
    category: 'Pre-Construction & Planning',
  },
  {
    id: 250,
    question: 'What is the core duty regulation 15(2) places on every contractor, including a sole trader?',
    options: [
      'To supervise the other trades working alongside them on site',
      'To plan, manage and monitor the work under their own control',
      'To prepare a health and safety file for their own package',
      'To approve the construction phase plan before starting work',
    ],
    correctAnswer: 1,
    explanation:
      'A contractor must plan, manage and monitor construction work carried out by them or by workers under their control so that, so far as is reasonably practicable, it is done without risks to health and safety. Supervising other trades is the classic confusion with the principal contractor role: your duty runs to your own work and your own people, and co-ordination with the rest of the site happens through the principal contractor.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Subcontracting',
    category: 'Duty Holders & Their Roles',
  },
];
