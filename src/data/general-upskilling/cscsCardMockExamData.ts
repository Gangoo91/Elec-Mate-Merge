/**
 * CSCS Card Preparation Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced difficulty.
 *
 * Categories (5):
 *   Introduction to CSCS & the HS&E Test (40) | General Health & Safety (40) |
 *   Working at Height & Manual Handling (40) | Hazardous Substances & Environmental (40) |
 *   Specialist Knowledge & Site Safety (40)
 *
 * Difficulty per 40-question category: ~14 basic, ~18 intermediate, ~8 advanced
 * Difficulty per 20-question block:   ~7 basic, ~9 intermediate, ~4 advanced
 *
 * THIS FILE: Questions 1-200 (merged)
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const cscsCardCategories = [
  "Introduction to CSCS & the HS&E Test",
  "General Health & Safety",
  "Working at Height & Manual Handling",
  "Hazardous Substances & Environmental",
  "Specialist Knowledge & Site Safety"
];

export const cscsCardMockExamConfig: MockExamConfig = {
  examId: 'cscs-card',
  examTitle: 'CSCS Card Preparation Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/cscs-card-module-6',
  categories: cscsCardCategories
};

export const getRandomCscsCardExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(cscsCardQuestionBank, numQuestions, cscsCardCategories);
};

export const cscsCardQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // INTRODUCTION TO CSCS & THE HS&E TEST — 40 questions (id 1-40)
  // =======================================================================
  {
    id: 1,
    question: "What does CSCS stand for?",
    options: [
      "Construction Skills Certification Scheme",
      "Construction Safety Card System",
      "Certified Site Competence Scheme",
      "Construction Sector Card Scheme"
    ],
    correctAnswer: 0,
    explanation: "CSCS stands for the Construction Skills Certification Scheme. It is the UK's leading card scheme for the construction industry, established in 1995 to verify that workers have the appropriate training and qualifications for their role on construction sites.",
    section: "The CSCS Scheme",
    difficulty: "basic",
    topic: "CSCS overview",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 2,
    question: "In what year was the CSCS scheme established?",
    options: [
      "1990",
      "1995",
      "2000",
      "2003"
    ],
    correctAnswer: 1,
    explanation: "The CSCS scheme was established in 1995 as a means of registering the competence and qualifications of construction workers across the UK. It has since become the most widely recognised card scheme in the industry.",
    section: "The CSCS Scheme",
    difficulty: "basic",
    topic: "CSCS overview",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 3,
    question: "What is the primary purpose of the CSCS card?",
    options: [
      "To provide public liability insurance",
      "To prove that the holder has the required training and qualifications for their occupation",
      "To replace the need for site inductions",
      "To guarantee employment on construction sites"
    ],
    correctAnswer: 1,
    explanation: "The primary purpose of a CSCS card is to prove that the holder has the appropriate training and qualifications for the type of work they carry out on construction sites. It does not replace inductions, guarantee employment, or provide insurance.",
    section: "The CSCS Scheme",
    difficulty: "basic",
    topic: "CSCS overview",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 4,
    question: "What colour is the CSCS Labourer card?",
    options: [
      "Blue",
      "Green",
      "Red",
      "Gold"
    ],
    correctAnswer: 2,
    explanation: "The CSCS Labourer card is red. It is issued to workers who have achieved a Level 1 qualification in their construction-related occupation and have passed the Operatives HS&E test.",
    section: "Card Types",
    difficulty: "basic",
    topic: "Card types and colour codes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 5,
    question: "Which CSCS card colour is issued to skilled workers who hold an NVQ/SVQ Level 2?",
    options: [
      "Red",
      "Blue",
      "Green",
      "Gold"
    ],
    correctAnswer: 1,
    explanation: "The blue Skilled Worker card is issued to those who hold a recognised Level 2 NVQ/SVQ or equivalent qualification in a construction-related occupation. This is one of the most commonly held card types.",
    section: "Card Types",
    difficulty: "basic",
    topic: "Card types and colour codes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 6,
    question: "What does the gold CSCS card signify?",
    options: [
      "A construction labourer",
      "An advanced craft or supervisory worker with NVQ/SVQ Level 3",
      "A site manager with NVQ/SVQ Level 6",
      "A trainee on an apprenticeship"
    ],
    correctAnswer: 1,
    explanation: "The gold Advanced Craft card is issued to workers who hold a Level 3 NVQ/SVQ or equivalent qualification. It is also used as the Supervisory card. This indicates a higher level of skill and competence than the blue card.",
    section: "Card Types",
    difficulty: "basic",
    topic: "Card types and colour codes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 7,
    question: "What colour is the CSCS card issued to construction managers holding NVQ Level 6 or 7?",
    options: [
      "Gold",
      "White",
      "Black",
      "Green"
    ],
    correctAnswer: 2,
    explanation: "The black Manager card is issued to construction professionals and managers who hold a Level 6 or Level 7 NVQ/SVQ or an equivalent recognised qualification such as a degree, HNC, or HND in a construction-related discipline.",
    section: "Card Types",
    difficulty: "intermediate",
    topic: "Card types and colour codes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 8,
    question: "Which CSCS card is white and issued to professionally qualified persons?",
    options: [
      "The Visitor card",
      "The Academically Qualified Person (AQP) card",
      "The Labourer card",
      "The Trainee card"
    ],
    correctAnswer: 1,
    explanation: "The white Academically Qualified Person (AQP) card is issued to those who hold a recognised construction-related qualification at degree level or above but do not yet have the NVQ/SVQ required for the black Manager card.",
    section: "Card Types",
    difficulty: "intermediate",
    topic: "Card types and colour codes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 9,
    question: "What is the standard validity period of a CSCS card?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "Most CSCS cards are valid for five years from the date of issue. Card holders must renew their card before it expires and may need to retake the HS&E test if it was passed more than two years before the renewal application.",
    section: "Card Validity",
    difficulty: "basic",
    topic: "Card validity",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 10,
    question: "What does HS&E stand for in the context of the CSCS test?",
    options: [
      "Hazardous Substances & Environment",
      "Health, Safety & Environment",
      "High Standards & Excellence",
      "Health & Safety Executive"
    ],
    correctAnswer: 1,
    explanation: "HS&E stands for Health, Safety & Environment. The HS&E test is a mandatory requirement for obtaining a CSCS card and covers topics related to health, safety, and environmental awareness on construction sites.",
    section: "The HS&E Test",
    difficulty: "basic",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 11,
    question: "How many questions are there in the Operatives HS&E test?",
    options: [
      "30",
      "45",
      "50",
      "60"
    ],
    correctAnswer: 2,
    explanation: "The Operatives HS&E test consists of 50 questions that must be answered within 45 minutes. Candidates need to achieve a score of approximately 90% (around 45 out of 50) to pass.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 12,
    question: "Approximately what pass mark is required for the HS&E Operatives test?",
    options: [
      "70%",
      "80%",
      "90%",
      "100%"
    ],
    correctAnswer: 2,
    explanation: "Candidates must achieve approximately 90% (around 45 out of 50 correct answers) to pass the Operatives HS&E test. This high pass mark reflects the critical importance of health and safety knowledge on construction sites.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "Pass marks",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 13,
    question: "Where is the HS&E test taken?",
    options: [
      "Online at home",
      "At a Pearson VUE test centre",
      "At the CITB head office only",
      "On the construction site"
    ],
    correctAnswer: 1,
    explanation: "The HS&E test is taken at a Pearson VUE test centre. There are hundreds of test centres across the UK. Candidates must book their test in advance and bring valid photo identification on the day.",
    section: "The HS&E Test",
    difficulty: "basic",
    topic: "Test booking at Pearson VUE",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 14,
    question: "How long is the HS&E test result valid for when applying for a CSCS card?",
    options: [
      "6 months",
      "1 year",
      "2 years",
      "5 years"
    ],
    correctAnswer: 2,
    explanation: "The HS&E test result is valid for two years from the date it was passed. If a CSCS card application is not made within this period, the candidate will need to retake and pass the HS&E test again.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "Test validity",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 15,
    question: "What are the two main types of question used in the HS&E test?",
    options: [
      "True/false and essay",
      "Knowledge questions and behavioural case studies",
      "Practical demonstrations and oral questions",
      "Written calculations and diagrams"
    ],
    correctAnswer: 1,
    explanation: "The HS&E test uses two main question types: knowledge questions that test factual understanding, and behavioural case study questions that present realistic workplace scenarios and require the candidate to identify the most appropriate action.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "Question types",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 16,
    question: "Which organisation administers the HS&E test on behalf of CSCS?",
    options: [
      "HSE (Health and Safety Executive)",
      "CITB (Construction Industry Training Board)",
      "UKAS",
      "CHAS"
    ],
    correctAnswer: 1,
    explanation: "The HS&E test is administered by the CITB (Construction Industry Training Board). CITB develops and maintains the question bank and works with Pearson VUE to deliver the test at centres across the UK.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 17,
    question: "A worker holds a CPCS card for operating a 360-degree excavator. Does this mean they also need a CSCS card to work on a construction site?",
    options: [
      "Yes, they must always hold both cards separately",
      "No, CPCS is a partner scheme that is accepted in place of a CSCS card for plant operations",
      "No, but only if the CPCS card has not expired",
      "Yes, unless they hold a site manager's qualification"
    ],
    correctAnswer: 1,
    explanation: "CPCS (Construction Plant Competence Scheme) is a CSCS partner scheme. Cards issued under recognised partner schemes such as CPCS, CISRS, and ECS/JIB are accepted on site in the same way as a CSCS card for the relevant occupation. A separate CSCS card is not needed.",
    section: "Partner Schemes",
    difficulty: "intermediate",
    topic: "Partner schemes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 18,
    question: "Which partner card scheme covers scaffolders?",
    options: [
      "CPCS",
      "CISRS",
      "ECS/JIB",
      "IPAF"
    ],
    correctAnswer: 1,
    explanation: "CISRS (Construction Industry Scaffolders Record Scheme) is the partner card scheme that covers scaffolders. It is recognised by CSCS and confirms that the holder is competent and qualified to carry out scaffolding work.",
    section: "Partner Schemes",
    difficulty: "intermediate",
    topic: "Partner schemes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 19,
    question: "The ECS (Electrotechnical Certification Scheme) card is managed jointly by which bodies?",
    options: [
      "NICEIC and NAPIT",
      "JIB and SELECT",
      "IET and BSI",
      "CITB and HSE"
    ],
    correctAnswer: 1,
    explanation: "The ECS card scheme is managed jointly by the JIB (Joint Industry Board for the Electrical Contracting Industry) in England and Wales, and SELECT (the trade association for the electrical, electronics, and communications industry) in Scotland.",
    section: "Partner Schemes",
    difficulty: "advanced",
    topic: "Partner schemes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 20,
    question: "A worker passed their HS&E test 18 months ago but has not yet applied for a CSCS card. What is the status of their test result?",
    options: [
      "It has expired and they must retake the test",
      "It is still valid and they can apply for a card",
      "It is valid but they must apply within the next month",
      "They need to request an extension from CITB"
    ],
    correctAnswer: 1,
    explanation: "The HS&E test result is valid for two years. Since only 18 months have passed, the result is still within the validity window and the worker can apply for a CSCS card without needing to retake the test.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "Test validity",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 21,
    question: "Which version of the HS&E test must a site manager take?",
    options: [
      "The Operatives test",
      "The Specialists test",
      "The Managers and Professionals test",
      "There is no separate test for managers"
    ],
    correctAnswer: 2,
    explanation: "Site managers must take the Managers and Professionals version of the HS&E test, which contains additional questions on management responsibilities, CDM regulations, and supervisory health and safety duties beyond those in the Operatives test.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 22,
    question: "How many versions of the HS&E test are available?",
    options: [
      "One — the same test for everyone",
      "Two — Operatives and Managers",
      "Three — Operatives, Specialists, and Managers & Professionals",
      "Four — Labourer, Operative, Specialist, and Manager"
    ],
    correctAnswer: 2,
    explanation: "There are three versions of the HS&E test: the Operatives test (most common), the Specialists test (for occupations such as demolition, highway works, and tunnelling), and the Managers & Professionals test (for supervisory and management roles).",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 23,
    question: "What must a candidate bring with them to the Pearson VUE test centre on the day of their HS&E test?",
    options: [
      "Their employer's letter of recommendation",
      "Valid photo identification",
      "A printed copy of the HS&E revision guide",
      "Their existing CSCS card"
    ],
    correctAnswer: 1,
    explanation: "Candidates must bring valid photo identification (such as a passport or photocard driving licence) to the Pearson VUE test centre. Without acceptable ID, the candidate will not be allowed to sit the test and the fee may be forfeited.",
    section: "The HS&E Test",
    difficulty: "basic",
    topic: "Test booking at Pearson VUE",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 24,
    question: "What is the 'Experienced Worker' route to obtaining a CSCS card?",
    options: [
      "A fast-track route that waives the HS&E test for workers over 60",
      "A route allowing experienced workers to obtain an NVQ through on-site assessment without attending college",
      "A scheme that gives automatic gold cards to workers with 20+ years of experience",
      "A government programme providing free training to older workers"
    ],
    correctAnswer: 1,
    explanation: "The Experienced Worker route (sometimes called the Experienced Worker Practical Assessment) allows workers with significant industry experience to achieve an NVQ/SVQ through on-site assessment and portfolio evidence, rather than attending a college course. They must still pass the HS&E test.",
    section: "Application Process",
    difficulty: "advanced",
    topic: "Experienced worker route",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 25,
    question: "Which of the following is NOT a requirement for applying for a CSCS card?",
    options: [
      "Passing the relevant HS&E test",
      "Holding a recognised construction qualification",
      "Being employed by a CSCS-registered company",
      "Providing proof of identity"
    ],
    correctAnswer: 2,
    explanation: "Applicants do not need to be employed by a CSCS-registered company. CSCS cards are held by individuals, not companies. The requirements are: passing the relevant HS&E test, holding a recognised qualification for the card type applied for, and providing proof of identity.",
    section: "Application Process",
    difficulty: "intermediate",
    topic: "Application process",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 26,
    question: "A behavioural case study question in the HS&E test typically asks you to:",
    options: [
      "Recite a piece of legislation from memory",
      "Identify what a worker should or should not do in a described workplace scenario",
      "Complete a mathematical calculation related to safe loads",
      "Draw a diagram of the correct safety arrangement"
    ],
    correctAnswer: 1,
    explanation: "Behavioural case study questions present a realistic workplace scenario and ask the candidate to identify the most appropriate course of action, or to spot unsafe behaviour. They test practical judgement rather than factual recall.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "Question types",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 27,
    question: "Which of the following green CSCS cards is issued to someone registered on a recognised construction apprenticeship?",
    options: [
      "The Provisional card",
      "The Trainee card",
      "The Construction Site Operative card",
      "The Apprentice card"
    ],
    correctAnswer: 3,
    explanation: "The green Apprentice card is issued to individuals who are registered on a recognised construction apprenticeship programme. It is valid for the duration of the apprenticeship plus six months, giving time to apply for the appropriate qualified card.",
    section: "Card Types",
    difficulty: "intermediate",
    topic: "Card types and colour codes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 28,
    question: "What is the green CSCS Provisional card intended for?",
    options: [
      "Workers who have passed the HS&E test but not yet achieved their full qualification",
      "Workers who have a qualification but have not yet passed the HS&E test",
      "Workers on their first day on site before any training",
      "Self-employed workers who do not need qualifications"
    ],
    correctAnswer: 0,
    explanation: "The green Provisional card is a temporary card for workers who have passed the HS&E test and are working towards achieving a recognised qualification. It is valid for a limited period (typically up to five years) to allow the worker to complete their qualification.",
    section: "Card Types",
    difficulty: "intermediate",
    topic: "Card types and colour codes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 29,
    question: "A demolition operative needs to take which version of the HS&E test?",
    options: [
      "The Operatives test",
      "The Specialists test",
      "The Managers and Professionals test",
      "Any version — they are all the same difficulty"
    ],
    correctAnswer: 1,
    explanation: "Demolition operatives must take the Specialists version of the HS&E test, which includes additional questions specific to specialist activities such as demolition, highway works, and tunnelling operations.",
    section: "The HS&E Test",
    difficulty: "advanced",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 30,
    question: "A worker's CSCS card is due to expire in three months. They passed their HS&E test four years ago. What must they do to renew?",
    options: [
      "Simply reapply — the original HS&E test result is still valid",
      "Retake and pass the HS&E test before applying for renewal",
      "Request an automatic renewal online without any test",
      "Ask their employer to validate the renewal"
    ],
    correctAnswer: 1,
    explanation: "Because the HS&E test result is only valid for two years and it was passed four years ago, the worker must retake and pass the HS&E test before they can apply for a renewal card. They will also need to demonstrate that their qualification remains current.",
    section: "Card Validity",
    difficulty: "advanced",
    topic: "Renewal",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 31,
    question: "What does CITB stand for?",
    options: [
      "Construction Industry Testing Bureau",
      "Construction Industry Training Board",
      "Certification of Industry Trade Bodies",
      "Central Inspection and Testing Board"
    ],
    correctAnswer: 1,
    explanation: "CITB stands for the Construction Industry Training Board. It is the industry training board for the construction sector in England, Scotland, and Wales, and is responsible for developing and administering the HS&E test.",
    section: "The CSCS Scheme",
    difficulty: "basic",
    topic: "CSCS overview",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 32,
    question: "An employer on a major construction project insists that all workers carry a valid CSCS card. Is this a legal requirement?",
    options: [
      "Yes, it is a legal requirement under CDM 2015",
      "Yes, it is required by the Health and Safety at Work Act",
      "No, it is not a legal requirement but is widely accepted as best practice and required by most principal contractors",
      "No, and employers cannot make it a condition of entry"
    ],
    correctAnswer: 2,
    explanation: "Holding a CSCS card is not a legal requirement in the UK. However, it is widely accepted as industry best practice and many principal contractors and clients require all workers to hold a valid card before being allowed on site. Build UK's Common Assessment Standard reinforces this expectation.",
    section: "The CSCS Scheme",
    difficulty: "advanced",
    topic: "CSCS overview",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 33,
    question: "How can a CSCS card be verified on site?",
    options: [
      "Only by contacting the CSCS head office by telephone",
      "By using the CSCS Smart Check app to scan the card's QR code",
      "Only by checking the expiry date printed on the card",
      "Cards cannot be verified — they must be taken at face value"
    ],
    correctAnswer: 1,
    explanation: "CSCS cards can be verified on site using the CSCS Smart Check app, which reads the card's QR code and confirms whether it is valid and current. This allows site managers and gatekeepers to quickly check that a card is genuine and has not expired or been revoked.",
    section: "The CSCS Scheme",
    difficulty: "intermediate",
    topic: "CSCS overview",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 34,
    question: "A worker completed an NVQ Level 2 in Bricklaying three years ago but has never held a CSCS card. Which HS&E test must they pass?",
    options: [
      "The Managers and Professionals test",
      "The Specialists test",
      "The Operatives test",
      "They do not need to take a test because they already have a qualification"
    ],
    correctAnswer: 2,
    explanation: "A bricklayer with an NVQ Level 2 is classed as a skilled operative and must pass the Operatives HS&E test. Having a qualification alone is not sufficient — the HS&E test must also be passed before a CSCS card can be issued.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 35,
    question: "Which of the following best describes a 'knowledge' question in the HS&E test?",
    options: [
      "A question that asks what action you would take in a scenario",
      "A question that tests factual recall, such as identifying PPE or safety signs",
      "A question that requires practical demonstration",
      "A question about management theory"
    ],
    correctAnswer: 1,
    explanation: "A knowledge question tests factual recall and understanding, such as identifying the correct PPE for a task, recognising a safety sign, or stating a legal requirement. This contrasts with behavioural questions, which test decision-making in scenarios.",
    section: "The HS&E Test",
    difficulty: "basic",
    topic: "Question types",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 36,
    question: "A new entrant to the construction industry wants to obtain a Labourer card. They have passed the HS&E Operatives test but have no qualifications. Can they apply?",
    options: [
      "No, they need at least an NVQ Level 2 to get any CSCS card",
      "Yes, but only if they have a letter from an employer",
      "Yes, the red Labourer card requires Level 1 or the CSCS Health and Safety Awareness course",
      "No, they must hold a full apprenticeship qualification"
    ],
    correctAnswer: 2,
    explanation: "The red Labourer card requires the holder to have passed the HS&E test and completed a Level 1 Award in Health and Safety in a Construction Environment (or equivalent such as the CSCS Health and Safety Awareness course, formerly known as the one-day Site Safety Plus course).",
    section: "Application Process",
    difficulty: "advanced",
    topic: "Application process",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 37,
    question: "How long is the time limit for completing the Operatives HS&E test?",
    options: [
      "30 minutes",
      "45 minutes",
      "60 minutes",
      "90 minutes"
    ],
    correctAnswer: 1,
    explanation: "The Operatives HS&E test allows 45 minutes to answer 50 questions. This averages to approximately 54 seconds per question, so candidates need to read each question carefully but work efficiently.",
    section: "The HS&E Test",
    difficulty: "intermediate",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 38,
    question: "A worker holds a valid CISRS scaffolding card. Which of the following is true?",
    options: [
      "They must also hold a CSCS card to work on any construction site",
      "Their CISRS card is recognised as a CSCS partner card and is accepted on site in the same way",
      "They can only work on scaffolding-specific sites, not general construction sites",
      "Their CISRS card must be endorsed by CSCS before it is accepted"
    ],
    correctAnswer: 1,
    explanation: "CISRS is a recognised CSCS partner scheme. A valid CISRS card is accepted on construction sites in the same way as a CSCS card for the holder's scaffolding occupation. There is no requirement to hold an additional CSCS card.",
    section: "Partner Schemes",
    difficulty: "advanced",
    topic: "Partner schemes",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 39,
    question: "What happens if you fail the HS&E test?",
    options: [
      "You are banned from retaking it for 12 months",
      "You can rebook and retake the test after a waiting period of at least 24 hours",
      "You must complete a mandatory training course before retaking it",
      "You automatically receive a Provisional card while you prepare to retake it"
    ],
    correctAnswer: 1,
    explanation: "If a candidate fails the HS&E test, they must wait at least 24 hours before rebooking. There is no limit on the number of attempts, but each attempt requires a separate booking and fee. No mandatory training course is required between attempts, though revision is strongly recommended.",
    section: "The HS&E Test",
    difficulty: "advanced",
    topic: "HS&E test format",
    category: "Introduction to CSCS & the HS&E Test"
  },
  {
    id: 40,
    question: "A qualified electrician working on a construction site would typically hold a card from which scheme?",
    options: [
      "CPCS",
      "CISRS",
      "ECS/JIB",
      "IPAF"
    ],
    correctAnswer: 2,
    explanation: "A qualified electrician working on a construction site would typically hold an ECS (Electrotechnical Certification Scheme) card, managed through the JIB. ECS is a CSCS partner scheme that covers electrical workers in the construction industry.",
    section: "Partner Schemes",
    difficulty: "advanced",
    topic: "Partner schemes",
    category: "Introduction to CSCS & the HS&E Test"
  },

  // =======================================================================
  // GENERAL HEALTH & SAFETY — 40 questions (id 41-80)
  // =======================================================================
  {
    id: 41,
    question: "What does HASAWA stand for?",
    options: [
      "Health and Safety at Work Act",
      "Hazardous Substances and Waste Act",
      "Health and Safety Awareness for Workers Act",
      "Handling and Storage at Work Act"
    ],
    correctAnswer: 0,
    explanation: "HASAWA stands for the Health and Safety at Work etc. Act 1974. It is the primary piece of health and safety legislation in the UK and places duties on employers, employees, and the self-employed to ensure health, safety, and welfare at work.",
    section: "Legislation",
    difficulty: "basic",
    topic: "HASAWA 1974",
    category: "General Health & Safety"
  },
  {
    id: 42,
    question: "In what year was the Health and Safety at Work Act introduced?",
    options: [
      "1961",
      "1974",
      "1989",
      "1999"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety at Work etc. Act was introduced in 1974. It remains the overarching piece of legislation governing workplace health and safety in the UK and has been supplemented by many sets of regulations since.",
    section: "Legislation",
    difficulty: "basic",
    topic: "HASAWA 1974",
    category: "General Health & Safety"
  },
  {
    id: 43,
    question: "Under HASAWA 1974, which of the following is an employer's duty?",
    options: [
      "To provide a safe working environment, so far as is reasonably practicable",
      "To guarantee that no accidents will ever occur",
      "To provide unlimited PPE of the worker's choice",
      "To complete all risk assessments personally without delegation"
    ],
    correctAnswer: 0,
    explanation: "Under Section 2 of HASAWA 1974, employers must ensure, so far as is reasonably practicable, the health, safety, and welfare of all their employees. This includes providing safe plant and systems of work, safe use of substances, information, instruction, training, and supervision.",
    section: "Legislation",
    difficulty: "intermediate",
    topic: "HASAWA 1974",
    category: "General Health & Safety"
  },
  {
    id: 44,
    question: "Under HASAWA 1974, employees have a duty to:",
    options: [
      "Write risk assessments for their employer",
      "Provide their own PPE",
      "Take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions",
      "Inspect all equipment before the employer uses it"
    ],
    correctAnswer: 2,
    explanation: "Under Section 7 of HASAWA 1974, every employee must take reasonable care of their own health and safety and that of other persons who may be affected by their acts or omissions at work. They must also cooperate with their employer on health and safety matters.",
    section: "Legislation",
    difficulty: "intermediate",
    topic: "HASAWA 1974",
    category: "General Health & Safety"
  },
  {
    id: 45,
    question: "How many steps are there in the HSE's recommended risk assessment process?",
    options: [
      "3",
      "4",
      "5",
      "7"
    ],
    correctAnswer: 2,
    explanation: "The HSE recommends a 5-step risk assessment process: (1) Identify the hazards, (2) Decide who might be harmed and how, (3) Evaluate the risks and decide on precautions, (4) Record your findings and implement them, (5) Review and update the assessment.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Risk assessment 5-step process",
    category: "General Health & Safety"
  },
  {
    id: 46,
    question: "What is the first step in the 5-step risk assessment process?",
    options: [
      "Decide on precautions",
      "Record your findings",
      "Identify the hazards",
      "Review the assessment"
    ],
    correctAnswer: 2,
    explanation: "The first step in the 5-step risk assessment process is to identify the hazards. A hazard is anything that has the potential to cause harm, such as chemicals, electricity, working from height, or moving machinery.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Risk assessment 5-step process",
    category: "General Health & Safety"
  },
  {
    id: 47,
    question: "What is the difference between a hazard and a risk?",
    options: [
      "They are the same thing",
      "A hazard is something that can cause harm; a risk is the likelihood that harm will occur and the severity of that harm",
      "A risk is the source of danger; a hazard is the control measure",
      "A hazard only applies to chemicals; a risk applies to physical dangers"
    ],
    correctAnswer: 1,
    explanation: "A hazard is anything with the potential to cause harm (e.g., a wet floor). A risk is the likelihood that someone will be harmed by the hazard and the severity of that harm (e.g., someone slipping and breaking a bone). Understanding this distinction is fundamental to risk assessment.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Risk assessment 5-step process",
    category: "General Health & Safety"
  },
  {
    id: 48,
    question: "In the hierarchy of controls, which measure should be considered first?",
    options: [
      "Personal Protective Equipment",
      "Administrative controls",
      "Elimination of the hazard",
      "Engineering controls"
    ],
    correctAnswer: 2,
    explanation: "The hierarchy of controls places elimination at the top as the most effective measure. The full hierarchy is: Elimination, Substitution, Engineering controls, Administrative controls, and PPE (last resort). PPE should only be used when higher-level controls cannot adequately reduce the risk.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Hierarchy of controls",
    category: "General Health & Safety"
  },
  {
    id: 49,
    question: "What does PPE stand for?",
    options: [
      "Personal Protection for Employees",
      "Personal Protective Equipment",
      "Physical Plant and Equipment",
      "Protective Procedures for Employers"
    ],
    correctAnswer: 1,
    explanation: "PPE stands for Personal Protective Equipment. It includes items such as hard hats, safety boots, high-visibility clothing, gloves, eye protection, and hearing protection. PPE is the last line of defence in the hierarchy of controls.",
    section: "PPE",
    difficulty: "basic",
    topic: "PPE types and selection",
    category: "General Health & Safety"
  },
  {
    id: 50,
    question: "Which of the following is NOT considered PPE?",
    options: [
      "Safety boots with steel toecaps",
      "A guard rail around an open edge",
      "Safety goggles",
      "Hearing defenders"
    ],
    correctAnswer: 1,
    explanation: "A guard rail is an engineering control, not PPE. PPE is equipment worn or held by an individual to protect them from risks. Guard rails, barriers, and machine guards are collective protective measures that protect everyone in the area without requiring individual action.",
    section: "PPE",
    difficulty: "intermediate",
    topic: "PPE types and selection",
    category: "General Health & Safety"
  },
  {
    id: 51,
    question: "What does RAMS stand for?",
    options: [
      "Risk Assessment and Management Standards",
      "Risk Assessment and Method Statement",
      "Reporting Accidents and Managing Safety",
      "Regulatory Assessment and Monitoring System"
    ],
    correctAnswer: 1,
    explanation: "RAMS stands for Risk Assessment and Method Statement. A risk assessment identifies the hazards and evaluates the risks, while the method statement describes the safe system of work — the step-by-step procedure for carrying out the task safely.",
    section: "Safe Systems of Work",
    difficulty: "basic",
    topic: "Method statements/RAMS",
    category: "General Health & Safety"
  },
  {
    id: 52,
    question: "What is the purpose of a method statement?",
    options: [
      "To list all the workers and their qualifications",
      "To describe the step-by-step safe procedure for carrying out a specific task",
      "To record all accidents that have occurred on site",
      "To provide a financial breakdown of the project costs"
    ],
    correctAnswer: 1,
    explanation: "A method statement (also called a safe system of work or SSOW) describes the step-by-step procedure for carrying out a task safely. It identifies the sequence of work, the hazards at each stage, and the control measures to be implemented.",
    section: "Safe Systems of Work",
    difficulty: "basic",
    topic: "Method statements/RAMS",
    category: "General Health & Safety"
  },
  {
    id: 53,
    question: "There are five types of safety sign used on construction sites. Which of the following is a mandatory sign?",
    options: [
      "A red circular sign with a diagonal line",
      "A blue circular sign (e.g., 'Hard hats must be worn')",
      "A yellow triangular sign",
      "A green rectangular sign"
    ],
    correctAnswer: 1,
    explanation: "Mandatory signs are blue circles with a white symbol or text. They instruct people to take a specific action, such as 'Hard hats must be worn' or 'Eye protection must be worn'. Prohibition signs are red circles, warning signs are yellow triangles, and safe condition signs are green rectangles.",
    section: "Safety Signs",
    difficulty: "intermediate",
    topic: "Safety signs",
    category: "General Health & Safety"
  },
  {
    id: 54,
    question: "What does a yellow triangular safety sign indicate?",
    options: [
      "A mandatory action that must be followed",
      "A prohibition — something you must not do",
      "A warning of a potential hazard",
      "A safe condition such as an emergency exit"
    ],
    correctAnswer: 2,
    explanation: "A yellow (or amber) triangle with a black border and symbol is a warning sign. It alerts people to a potential hazard, such as 'Danger: electricity', 'Caution: slippery floor', or 'Warning: overhead loads'. It does not instruct a specific action but raises awareness.",
    section: "Safety Signs",
    difficulty: "intermediate",
    topic: "Safety signs",
    category: "General Health & Safety"
  },
  {
    id: 55,
    question: "What does RIDDOR stand for?",
    options: [
      "Regulations for Investigating Dangerous Diseases and Occupational Risks",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Recording and Investigating Dangerous and Damaging Operations Report",
      "Register of Industrial Diseases, Disorders and Operational Risks"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. It requires employers to report certain workplace injuries, diseases, and dangerous occurrences to the HSE.",
    section: "Reporting",
    difficulty: "intermediate",
    topic: "RIDDOR reporting",
    category: "General Health & Safety"
  },
  {
    id: 56,
    question: "Under RIDDOR, which of the following must be reported to the HSE?",
    options: [
      "All minor cuts and bruises",
      "A worker being off work for more than 7 consecutive days due to a workplace injury",
      "Any near miss, regardless of severity",
      "A worker who feels unwell but continues working"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013, an over-7-day incapacitation must be reported — that is, when a worker is unable to carry out their normal duties for more than seven consecutive days (not counting the day of the accident) as a result of a workplace injury. Deaths, specified injuries, and dangerous occurrences must also be reported.",
    section: "Reporting",
    difficulty: "intermediate",
    topic: "RIDDOR reporting",
    category: "General Health & Safety"
  },
  {
    id: 57,
    question: "What is the purpose of an accident book on a construction site?",
    options: [
      "To record only RIDDOR-reportable incidents",
      "To record all workplace accidents, injuries, and incidents, however minor",
      "To record disciplinary actions taken against workers",
      "To record daily weather conditions"
    ],
    correctAnswer: 1,
    explanation: "The accident book (form BI 510) is used to record all workplace accidents, injuries, and incidents, including minor ones. It provides a contemporaneous record that can be used as evidence, for trend analysis, and to support RIDDOR reporting and insurance claims.",
    section: "Reporting",
    difficulty: "basic",
    topic: "Accident books",
    category: "General Health & Safety"
  },
  {
    id: 58,
    question: "What is a near miss?",
    options: [
      "An accident that caused only minor injury",
      "An event that had the potential to cause injury or damage but did not",
      "A situation where a worker arrived late to a safety briefing",
      "A failed inspection of equipment"
    ],
    correctAnswer: 1,
    explanation: "A near miss is an unplanned event that had the potential to cause injury, ill health, or damage but did not actually do so on that occasion. Reporting near misses is important because they highlight hazards that could lead to serious incidents in the future.",
    section: "Reporting",
    difficulty: "basic",
    topic: "Near-miss reporting",
    category: "General Health & Safety"
  },
  {
    id: 59,
    question: "Why is it important to report near misses on a construction site?",
    options: [
      "Because it is a legal requirement to report every near miss to the HSE",
      "Because near misses indicate hazards that could lead to a serious incident if not addressed",
      "Because workers who report near misses receive a financial bonus",
      "Because near misses must be recorded for insurance purposes only"
    ],
    correctAnswer: 1,
    explanation: "Reporting near misses is important because they act as warning signs — they highlight existing hazards and control failures that could result in a serious injury or fatality in the future. Investigating and addressing near misses is a proactive safety measure.",
    section: "Reporting",
    difficulty: "intermediate",
    topic: "Near-miss reporting",
    category: "General Health & Safety"
  },
  {
    id: 60,
    question: "What is the purpose of a site induction?",
    options: [
      "To teach workers a new trade skill",
      "To inform workers about site-specific hazards, rules, emergency procedures, and welfare facilities before they begin work",
      "To test workers' HS&E knowledge",
      "To issue PPE to workers"
    ],
    correctAnswer: 1,
    explanation: "A site induction is carried out before a worker begins work on a new site. It covers site-specific hazards, safety rules, emergency procedures (including assembly points), welfare arrangements, key personnel, and any particular risks associated with that project.",
    section: "Site Management",
    difficulty: "basic",
    topic: "Site inductions",
    category: "General Health & Safety"
  },
  {
    id: 61,
    question: "What is a toolbox talk?",
    options: [
      "A formal examination of workers' knowledge",
      "A short, informal safety briefing on a specific topic delivered on site",
      "A meeting to discuss the budget for purchasing new tools",
      "An annual safety review held at head office"
    ],
    correctAnswer: 1,
    explanation: "A toolbox talk is a short (typically 10-15 minute), informal safety briefing delivered on site, usually before work starts or at the beginning of a shift. It focuses on a specific topic relevant to the work being carried out that day, such as working at height, manual handling, or electrical safety.",
    section: "Site Management",
    difficulty: "basic",
    topic: "Toolbox talks",
    category: "General Health & Safety"
  },
  {
    id: 62,
    question: "Under CDM 2015, Schedule 2 requires the provision of which of the following welfare facilities?",
    options: [
      "A recreational room with television",
      "Sanitary conveniences, washing facilities, drinking water, changing rooms, and rest areas",
      "A gymnasium and canteen",
      "Individual offices for each worker"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 Schedule 2 sets out minimum welfare requirements for construction sites, including: sanitary conveniences (toilets), washing facilities (with hot and cold water), drinking water, changing rooms and lockers, and facilities for rest and eating meals.",
    section: "Welfare",
    difficulty: "intermediate",
    topic: "Workplace welfare",
    category: "General Health & Safety"
  },
  {
    id: 63,
    question: "What does CDM stand for?",
    options: [
      "Construction Design and Management",
      "Construction Demolition and Maintenance",
      "Contractual Duties and Methods",
      "Controlled Delivery of Materials"
    ],
    correctAnswer: 0,
    explanation: "CDM stands for the Construction (Design and Management) Regulations 2015. These regulations set out the framework for managing health, safety, and welfare on construction projects, defining duties for clients, designers, principal designers, principal contractors, and contractors.",
    section: "Legislation",
    difficulty: "basic",
    topic: "CDM 2015",
    category: "General Health & Safety"
  },
  {
    id: 64,
    question: "A red circular sign with a white background and red border featuring a crossed-out symbol indicates which type of safety sign?",
    options: [
      "Warning",
      "Mandatory",
      "Prohibition",
      "Safe condition"
    ],
    correctAnswer: 2,
    explanation: "A red circle with a diagonal line through a symbol on a white background is a prohibition sign. It tells you something you must NOT do, such as 'No smoking', 'No entry', or 'Do not use mobile phones'.",
    section: "Safety Signs",
    difficulty: "intermediate",
    topic: "Safety signs",
    category: "General Health & Safety"
  },
  {
    id: 65,
    question: "What colour and shape are safe condition signs, such as those indicating fire exits and first-aid points?",
    options: [
      "Yellow triangle",
      "Blue circle",
      "Green rectangle or square",
      "Red circle"
    ],
    correctAnswer: 2,
    explanation: "Safe condition signs are green rectangles or squares with white symbols or text. They provide information about safe routes, exits, first-aid facilities, and emergency equipment. Examples include fire exit signs and first-aid point indicators.",
    section: "Safety Signs",
    difficulty: "intermediate",
    topic: "Safety signs",
    category: "General Health & Safety"
  },
  {
    id: 66,
    question: "In the hierarchy of controls, where does 'substitution' sit?",
    options: [
      "First — it is the most effective control",
      "Second — after elimination",
      "Third — after engineering controls",
      "Last — it is the least effective control"
    ],
    correctAnswer: 1,
    explanation: "Substitution is the second level in the hierarchy of controls, after elimination. It involves replacing a hazardous substance, process, or piece of equipment with a less hazardous alternative. For example, replacing a solvent-based paint with a water-based one.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Hierarchy of controls",
    category: "General Health & Safety"
  },
  {
    id: 67,
    question: "A construction worker notices a large puddle of oil on a site walkway. No one has been injured. What should they do FIRST?",
    options: [
      "Ignore it — it is the site manager's responsibility",
      "Take immediate action to warn others (e.g., barrier the area) and then report it to their supervisor",
      "Continue working and report it at the end of the shift",
      "Clean it up themselves even if they do not have the correct materials"
    ],
    correctAnswer: 1,
    explanation: "The worker should first take immediate steps to prevent harm to others, such as placing barriers or warning signs around the spill. They should then report it to their supervisor or the responsible person so that it can be properly cleaned up. Under HASAWA 1974, employees have a duty not to endanger others.",
    section: "Site Management",
    difficulty: "intermediate",
    topic: "Near-miss reporting",
    category: "General Health & Safety"
  },
  {
    id: 68,
    question: "An employer must carry out a risk assessment. When should it be reviewed?",
    options: [
      "Only when an accident occurs",
      "At least every 10 years",
      "Regularly, and whenever there is a significant change in the work activity, equipment, or following an incident",
      "Only when a new employee starts"
    ],
    correctAnswer: 2,
    explanation: "Risk assessments must be reviewed regularly and updated whenever there is a significant change — for example, new equipment, new substances, a change of work method, after an incident or near miss, or when new information about risks becomes available. There is no fixed time interval prescribed, but they should not be left to become outdated.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Risk assessment 5-step process",
    category: "General Health & Safety"
  },
  {
    id: 69,
    question: "Who is responsible for providing PPE on a construction site?",
    options: [
      "The worker must buy their own PPE",
      "The employer must provide PPE free of charge",
      "The local authority provides PPE",
      "The HSE issues PPE to workers"
    ],
    correctAnswer: 1,
    explanation: "Under the Personal Protective Equipment at Work Regulations 1992 (as amended 2022), the employer must provide suitable PPE free of charge where risks cannot be adequately controlled by other means. Workers must use the PPE provided and report any defects.",
    section: "PPE",
    difficulty: "intermediate",
    topic: "PPE types and selection",
    category: "General Health & Safety"
  },
  {
    id: 70,
    question: "Which of the following is an example of an 'engineering control' in the hierarchy of controls?",
    options: [
      "Wearing ear defenders",
      "Installing a local exhaust ventilation system to capture dust at source",
      "Displaying a safety sign",
      "Rotating workers between tasks to limit exposure time"
    ],
    correctAnswer: 1,
    explanation: "A local exhaust ventilation (LEV) system is an engineering control — a physical measure designed to reduce exposure to a hazard. Engineering controls are the third level in the hierarchy after elimination and substitution, and are preferred over administrative controls and PPE because they do not rely on human behaviour.",
    section: "Risk Assessment",
    difficulty: "advanced",
    topic: "Hierarchy of controls",
    category: "General Health & Safety"
  },
  {
    id: 71,
    question: "What is the main purpose of traffic management on a construction site?",
    options: [
      "To reduce fuel costs for site vehicles",
      "To separate pedestrians from vehicles and ensure safe movement of people and plant",
      "To ensure vehicles are kept clean",
      "To comply with road tax requirements"
    ],
    correctAnswer: 1,
    explanation: "The main purpose of traffic management on a construction site is to separate pedestrians from vehicles and ensure the safe movement of both people and plant. Vehicle-pedestrian collisions are one of the leading causes of fatal accidents on construction sites.",
    section: "Site Management",
    difficulty: "intermediate",
    topic: "Traffic management",
    category: "General Health & Safety"
  },
  {
    id: 72,
    question: "A worker on site develops a persistent cough and breathing difficulties that their GP links to occupational dust exposure. Under RIDDOR, does this need to be reported?",
    options: [
      "No, only injuries need to be reported",
      "Yes, certain occupational diseases including those linked to dust exposure must be reported under RIDDOR",
      "Only if the worker is off work for more than 7 days",
      "No, the GP handles the reporting"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013, certain occupational diseases must be reported to the HSE when a doctor diagnoses them and the worker's occupation involves a specified activity. Occupational lung diseases linked to dust exposure (such as occupational asthma or pneumoconiosis) fall within the reportable categories.",
    section: "Reporting",
    difficulty: "advanced",
    topic: "RIDDOR reporting",
    category: "General Health & Safety"
  },
  {
    id: 73,
    question: "Which of the following describes an 'administrative control' in the hierarchy of controls?",
    options: [
      "Removing a hazardous substance from the workplace entirely",
      "Installing machine guards",
      "Implementing permit-to-work systems, job rotation, or safe work procedures",
      "Wearing safety goggles"
    ],
    correctAnswer: 2,
    explanation: "Administrative controls are management-led measures such as permit-to-work systems, job rotation to limit exposure, training, safe work procedures, and signage. They sit below engineering controls in the hierarchy because they rely on people following rules and procedures.",
    section: "Risk Assessment",
    difficulty: "advanced",
    topic: "Hierarchy of controls",
    category: "General Health & Safety"
  },
  {
    id: 74,
    question: "On a construction site, a banksman's primary role is to:",
    options: [
      "Manage the site finances",
      "Guide the safe movement of vehicles, especially when reversing",
      "Inspect scaffolding",
      "Operate the site crane"
    ],
    correctAnswer: 1,
    explanation: "A banksman (or signaller) guides the safe movement of vehicles on a construction site, particularly during reversing operations. They use standardised hand signals or radio communication to direct drivers and ensure pedestrians are kept clear.",
    section: "Site Management",
    difficulty: "intermediate",
    topic: "Traffic management",
    category: "General Health & Safety"
  },
  {
    id: 75,
    question: "What is occupational health in the context of construction?",
    options: [
      "The provision of on-site gym facilities",
      "The branch of health care concerned with preventing and managing work-related ill health, disease, and injury",
      "Free private healthcare provided to all construction workers",
      "A voluntary fitness programme run by CSCS"
    ],
    correctAnswer: 1,
    explanation: "Occupational health in construction focuses on preventing and managing ill health caused or worsened by work. Common issues include noise-induced hearing loss, hand-arm vibration syndrome (HAVS), respiratory diseases from dust and fumes, musculoskeletal disorders, and work-related stress.",
    section: "Occupational Health",
    difficulty: "intermediate",
    topic: "Occupational health",
    category: "General Health & Safety"
  },
  {
    id: 76,
    question: "Which type of safety sign has a red circle with a diagonal bar across a symbol?",
    options: [
      "Mandatory sign",
      "Warning sign",
      "Prohibition sign",
      "Fire equipment sign"
    ],
    correctAnswer: 2,
    explanation: "A prohibition sign features a red circle with a diagonal bar across a black symbol on a white background. It tells people what they must NOT do. Examples include 'No smoking', 'No unauthorised access', and 'No photography'.",
    section: "Safety Signs",
    difficulty: "basic",
    topic: "Safety signs",
    category: "General Health & Safety"
  },
  {
    id: 77,
    question: "A project involves excavation near buried services, working at height, and hot works. A risk assessment identifies high-risk activities. What document should be produced alongside the risk assessment to describe how the work will be carried out safely?",
    options: [
      "A purchase order",
      "A method statement",
      "An insurance certificate",
      "A building regulation application"
    ],
    correctAnswer: 1,
    explanation: "A method statement should be produced alongside the risk assessment to describe the step-by-step safe procedure for carrying out the high-risk work. Together, the risk assessment and method statement form the RAMS package, which is reviewed and agreed upon before work starts.",
    section: "Safe Systems of Work",
    difficulty: "advanced",
    topic: "Method statements/RAMS",
    category: "General Health & Safety"
  },
  {
    id: 78,
    question: "What type of fire extinguisher has a blue label and is suitable for use on electrical fires?",
    options: [
      "Water extinguisher",
      "Foam extinguisher",
      "Dry powder extinguisher",
      "Wet chemical extinguisher"
    ],
    correctAnswer: 2,
    explanation: "A dry powder extinguisher has a blue label and is suitable for Class A (solid), Class B (liquid), and Class C (gas) fires, as well as electrical fires. However, it should be used with caution in enclosed spaces as the powder can impair visibility and breathing.",
    section: "Fire Safety",
    difficulty: "advanced",
    topic: "PPE types and selection",
    category: "General Health & Safety"
  },
  {
    id: 79,
    question: "Under HASAWA 1974, Section 8, it is an offence for any person to:",
    options: [
      "Refuse to work overtime",
      "Intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare",
      "Take a break during the working day",
      "Report a safety concern to the HSE"
    ],
    correctAnswer: 1,
    explanation: "Section 8 of HASAWA 1974 states that no person shall intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare. This includes tampering with safety equipment, disabling guards on machinery, or misusing fire extinguishers.",
    section: "Legislation",
    difficulty: "advanced",
    topic: "HASAWA 1974",
    category: "General Health & Safety"
  },
  {
    id: 80,
    question: "How quickly must a fatal accident on a construction site be reported to the HSE under RIDDOR?",
    options: [
      "Within 24 hours by written report",
      "Immediately by the quickest practicable means (usually telephone), followed by written notification within 10 days",
      "Within 7 days by email",
      "Within 15 days by post"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013, a death arising from a work-related accident must be reported to the HSE immediately by the quickest practicable means, which is usually by telephone. This must be followed up with a written notification (using the online F2508 form) within 10 days of the incident.",
    section: "Reporting",
    difficulty: "advanced",
    topic: "RIDDOR reporting",
    category: "General Health & Safety"
  },

  // =======================================================================
  // WORKING AT HEIGHT & MANUAL HANDLING (Part 1) — 20 questions (id 81-100)
  // =======================================================================
  {
    id: 81,
    question: "What do the Work at Height Regulations 2005 define as 'work at height'?",
    options: [
      "Any work carried out above 2 metres",
      "Any work where a person could fall a distance liable to cause personal injury, regardless of height",
      "Only work carried out from scaffolding or ladders",
      "Work above 3 metres from ground level"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 define work at height as any work where a person could fall a distance liable to cause personal injury. This includes work at any height — even at ground level if there is a risk of falling into an opening or below ground level. There is no minimum height threshold.",
    section: "Work at Height",
    difficulty: "basic",
    topic: "Work at Height Regulations 2005",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 82,
    question: "What is the first priority in the work at height hierarchy?",
    options: [
      "Use fall-arrest equipment",
      "Use collective protection (e.g., guard rails)",
      "Avoid working at height altogether where possible",
      "Provide safety nets"
    ],
    correctAnswer: 2,
    explanation: "The first priority in the work at height hierarchy is to avoid working at height wherever reasonably practicable. If it cannot be avoided, the second step is to prevent falls using collective protection such as guard rails. If falls cannot be prevented, the third step is to mitigate the consequences using equipment such as safety nets or harnesses.",
    section: "Work at Height",
    difficulty: "basic",
    topic: "Hierarchy (avoid/prevent/mitigate)",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 83,
    question: "What is the correct angle for setting a leaning ladder against a wall?",
    options: [
      "1 unit out for every 2 units up (1:2 ratio)",
      "1 unit out for every 3 units up (1:3 ratio)",
      "1 unit out for every 4 units up (1:4 ratio)",
      "1 unit out for every 5 units up (1:5 ratio)"
    ],
    correctAnswer: 2,
    explanation: "The correct ratio for a leaning ladder is 1:4 — for every 4 units of height, the base of the ladder should be 1 unit away from the wall. This gives an angle of approximately 75 degrees, which provides the best balance between stability and usability.",
    section: "Work at Height",
    difficulty: "basic",
    topic: "Ladders",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 84,
    question: "When using a ladder, how many points of contact should a worker maintain at all times?",
    options: [
      "1 point of contact",
      "2 points of contact",
      "3 points of contact",
      "4 points of contact"
    ],
    correctAnswer: 2,
    explanation: "A worker must maintain three points of contact when climbing or descending a ladder — either two hands and one foot, or two feet and one hand. This ensures stability and reduces the risk of falling.",
    section: "Work at Height",
    difficulty: "basic",
    topic: "Ladders",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 85,
    question: "How often must scaffolding be formally inspected under the Work at Height Regulations?",
    options: [
      "Daily by the scaffold user",
      "At least every 7 days by a competent person, and after any event likely to have affected its stability",
      "Monthly by the site manager",
      "Only before first use and then annually"
    ],
    correctAnswer: 1,
    explanation: "Under the Work at Height Regulations 2005, scaffolding must be inspected by a competent person at least every 7 days, and after any event that could have affected its stability (such as high winds or an impact). The results must be recorded in writing.",
    section: "Work at Height",
    difficulty: "intermediate",
    topic: "Scaffolding",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 86,
    question: "What does a green tag on scaffolding indicate?",
    options: [
      "The scaffold is incomplete and must not be used",
      "The scaffold has been inspected, is complete, and is safe to use",
      "The scaffold is for loading materials only",
      "The scaffold requires modification before use"
    ],
    correctAnswer: 1,
    explanation: "A green scaffold tag (typically part of the scafftag system) indicates that the scaffold has been inspected by a competent person, is complete, and is safe for use. A red tag means the scaffold is incomplete, under modification, or must not be used.",
    section: "Work at Height",
    difficulty: "intermediate",
    topic: "Scaffolding tags",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 87,
    question: "What is the minimum height for a top guard rail on edge protection?",
    options: [
      "750 mm",
      "850 mm",
      "950 mm",
      "1100 mm"
    ],
    correctAnswer: 2,
    explanation: "The minimum height for a top guard rail on edge protection is 950 mm (approximately waist height). A mid-rail must be positioned so that the gap between any guard rail and the working platform, or between guard rails, does not exceed 470 mm. A toe board of at least 150 mm height must also be provided.",
    section: "Work at Height",
    difficulty: "intermediate",
    topic: "Edge protection",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 88,
    question: "What does MEWP stand for?",
    options: [
      "Mobile Elevated Work Platform",
      "Mechanical Equipment for Working at Peaks",
      "Modular Extension Work Platform",
      "Motorised Elevated Working Position"
    ],
    correctAnswer: 0,
    explanation: "MEWP stands for Mobile Elevated Work Platform. MEWPs include cherry pickers (boom lifts) and scissor lifts. Operators must be trained and certified — IPAF (International Powered Access Federation) certification is the recognised standard.",
    section: "Work at Height",
    difficulty: "basic",
    topic: "MEWPs",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 89,
    question: "Which organisation provides the recognised training and certification for MEWP operators?",
    options: [
      "CITB",
      "IPAF",
      "PASMA",
      "HSE"
    ],
    correctAnswer: 1,
    explanation: "IPAF (International Powered Access Federation) provides the recognised training and certification for MEWP operators. An IPAF PAL (Powered Access Licence) card confirms that the holder has been trained and assessed as competent to operate specific categories of MEWP.",
    section: "Work at Height",
    difficulty: "intermediate",
    topic: "MEWPs (IPAF)",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 90,
    question: "What does the Manual Handling Operations Regulations 1992 require employers to do as a first priority?",
    options: [
      "Provide manual handling training to all employees",
      "Avoid the need for hazardous manual handling operations so far as is reasonably practicable",
      "Issue back supports to all workers",
      "Limit all loads to 10 kg maximum"
    ],
    correctAnswer: 1,
    explanation: "The Manual Handling Operations Regulations 1992 require employers to, as a first priority, avoid the need for hazardous manual handling so far as is reasonably practicable. Where it cannot be avoided, the employer must assess the risk and reduce it to the lowest reasonably practicable level.",
    section: "Manual Handling",
    difficulty: "intermediate",
    topic: "Manual Handling Operations Regulations 1992",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 91,
    question: "What does the acronym TILEO stand for in manual handling risk assessment?",
    options: [
      "Task, Individual, Load, Equipment, Organisation",
      "Training, Instruction, Lifting, Evaluation, Observation",
      "Task, Individual, Load, Environment, Other factors",
      "Time, Intensity, Lifting, Effort, Output"
    ],
    correctAnswer: 2,
    explanation: "TILEO stands for Task, Individual, Load, Environment, and Other factors. It is a framework used to assess manual handling risks by considering the nature of the task, the capability of the individual, the characteristics of the load, the working environment, and any other relevant factors.",
    section: "Manual Handling",
    difficulty: "intermediate",
    topic: "TILEO factors",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 92,
    question: "When lifting a heavy object from the ground, what is the correct starting position?",
    options: [
      "Bend at the waist with straight legs",
      "Kneel on one knee with the back arched",
      "Stand with feet apart, bend at the knees and hips, keep the back straight, and grip the load firmly",
      "Stand with feet together and lean forward to reach the load"
    ],
    correctAnswer: 2,
    explanation: "The correct technique is to stand with feet shoulder-width apart for a stable base, bend at the knees and hips (not the waist), keep the back straight and look ahead, get a firm grip on the load, and lift smoothly using the legs. The load should be kept close to the body throughout the lift.",
    section: "Manual Handling",
    difficulty: "basic",
    topic: "Safe lifting technique",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 93,
    question: "A worker needs to move a heavy radiator across a site. Which mechanical aid would be most appropriate?",
    options: [
      "A ladder",
      "A sack trolley or platform trolley",
      "A wheelbarrow",
      "A rope and pulley"
    ],
    correctAnswer: 1,
    explanation: "A sack trolley or platform trolley is the most appropriate mechanical aid for moving a heavy radiator across a site. Mechanical aids such as trolleys, pallet trucks, and hoists reduce the physical demand of manual handling and the associated risk of musculoskeletal injury.",
    section: "Manual Handling",
    difficulty: "intermediate",
    topic: "Mechanical aids",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 94,
    question: "A scaffold has a red tag attached. What does this mean?",
    options: [
      "The scaffold is safe to use but requires care",
      "The scaffold is for materials only, not personnel",
      "The scaffold is incomplete or unsafe and must NOT be used",
      "The scaffold is reserved for a specific contractor"
    ],
    correctAnswer: 2,
    explanation: "A red scaffold tag means the scaffold is incomplete, under modification, or has been deemed unsafe following inspection. It must NOT be used by anyone until the issues have been resolved and the tag has been changed to green by a competent person.",
    section: "Work at Height",
    difficulty: "intermediate",
    topic: "Scaffolding tags",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 95,
    question: "When using a ladder as a means of access to a working platform, how far should the ladder extend above the landing point?",
    options: [
      "At least 0.5 metres (approximately 2 rungs)",
      "At least 1 metre (approximately 3 rungs)",
      "At least 1.5 metres (approximately 5 rungs)",
      "It does not need to extend above the landing point"
    ],
    correctAnswer: 1,
    explanation: "When a ladder is used as a means of access, it should extend at least 1 metre (approximately 3 rungs) above the landing point. This provides a secure handhold for the person stepping on and off the ladder at the top.",
    section: "Work at Height",
    difficulty: "intermediate",
    topic: "Ladders",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 96,
    question: "A construction worker is asked to carry a 30 kg bag of cement up a flight of stairs. They have a history of back problems. Using the TILEO framework, which factor is most significant in this scenario?",
    options: [
      "The Task — because it involves carrying up stairs",
      "The Individual — because of the pre-existing back condition",
      "The Load — because 30 kg is too heavy for any person to carry",
      "The Environment — because stairs are always unsafe"
    ],
    correctAnswer: 1,
    explanation: "While multiple TILEO factors are relevant (the task involves stairs, the load is 30 kg), the most significant factor here is the Individual — their pre-existing back condition substantially increases the risk of injury. Risk assessments must consider individual capabilities, including pre-existing medical conditions.",
    section: "Manual Handling",
    difficulty: "advanced",
    topic: "TILEO factors",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 97,
    question: "Under the Work at Height Regulations 2005, who is responsible for planning and organising work at height?",
    options: [
      "Only the individual worker carrying out the task",
      "The HSE inspector for the area",
      "Every employer and any person who controls the work of others must plan, organise, and supervise work at height",
      "Only the principal contractor on a CDM project"
    ],
    correctAnswer: 2,
    explanation: "The Work at Height Regulations 2005 place duties on every employer and any person who controls the work of others. They must ensure that work at height is properly planned, appropriately supervised, and carried out safely by competent persons. This applies to all duty holders, not just the principal contractor.",
    section: "Work at Height",
    difficulty: "advanced",
    topic: "Work at Height Regulations 2005",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 98,
    question: "A worker is using a mobile tower scaffold. Before moving the tower, what must they ensure?",
    options: [
      "That the tower is fully loaded with materials to improve stability",
      "That all persons and loose materials have been removed from the platform, and the tower height does not exceed the safe height-to-base ratio",
      "That at least two people are standing on the platform to counterbalance",
      "That the outriggers are removed to allow free movement"
    ],
    correctAnswer: 1,
    explanation: "Before moving a mobile tower scaffold, all persons must descend, all loose materials and tools must be removed from the platform, outriggers must be in place (or stored correctly depending on manufacturer instructions), and the tower height must not exceed the manufacturer's specified height-to-base ratio for mobile use.",
    section: "Work at Height",
    difficulty: "advanced",
    topic: "Scaffolding",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 99,
    question: "What is the second step in the work at height hierarchy, to be considered when working at height cannot be avoided?",
    options: [
      "Mitigate the distance and consequences of a fall",
      "Prevent falls by using collective protection such as guard rails and working platforms",
      "Provide additional training to workers",
      "Issue a permit to work"
    ],
    correctAnswer: 1,
    explanation: "The second step in the work at height hierarchy is to prevent falls. Where working at height cannot be avoided, employers should use measures that prevent falls, such as guard rails, working platforms with edge protection, and scaffolding. This comes before mitigation measures such as nets and harnesses.",
    section: "Work at Height",
    difficulty: "advanced",
    topic: "Hierarchy (avoid/prevent/mitigate)",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 100,
    question: "What is the HSE guideline weight for a man lifting a load close to his body at waist height under ideal conditions?",
    options: [
      "10 kg",
      "15 kg",
      "20 kg",
      "25 kg"
    ],
    correctAnswer: 3,
    explanation: "The HSE guideline figure for a man lifting a load at waist height close to the body under ideal conditions is 25 kg. For women, the guideline figure in the same zone is approximately 16 kg. These are guidelines, not legal limits — the actual safe weight depends on the TILEO factors specific to each situation.",
    section: "Manual Handling",
    difficulty: "intermediate",
    topic: "Safe lifting technique",
    category: "Working at Height & Manual Handling"
  },

  // ===== Questions 101-200 (merged) =====
// Questions 101-200 (CSCS Card Preparation)
  {
    id: 101,
    question: "What is the main advantage of a self-retracting lifeline (SRL) over a standard shock-absorbing lanyard?",
    options: ["It is cheaper to purchase", "It automatically takes up slack, reducing free-fall distance", "It does not require an anchor point", "It can be shared between multiple workers simultaneously"],
    correctAnswer: 1,
    explanation: "A self-retracting lifeline (SRL) automatically pays out and retracts cable or webbing as the user moves, keeping minimal slack in the system at all times. This significantly reduces the free-fall distance compared to a standard lanyard, resulting in lower arrest forces and reduced clearance distance requirements.",
    section: "Fall Protection Equipment",
    difficulty: "intermediate",
    topic: "Self-retracting lifelines",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 102,
    question: "What is the recommended maximum free-fall distance when using a personal fall arrest system?",
    options: ["1 metre", "2 metres", "4 metres", "6 metres"],
    correctAnswer: 1,
    explanation: "The recommended maximum free-fall distance when using a personal fall arrest system is 2 metres. This limit helps to keep the arrest forces within safe levels (below 6 kN) and reduces the risk of injury during a fall arrest event.",
    section: "Fall Protection Equipment",
    difficulty: "basic",
    topic: "Fall arrest distances",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 103,
    question: "What is 'suspension trauma' and why is it a serious risk after a fall arrest?",
    options: ["It is the fear of heights that develops after a fall", "It is bruising caused by harness straps during a fall", "It is a potentially fatal condition where blood pools in the legs due to harness suspension, restricting return flow to vital organs", "It is the psychological impact of witnessing a colleague fall"],
    correctAnswer: 2,
    explanation: "Suspension trauma (also called harness hang syndrome) occurs when a person is left suspended motionless in a harness after a fall. The harness straps compress the leg veins, causing blood to pool in the lower extremities. This reduces venous return to the heart, potentially leading to unconsciousness and death within 30 minutes if rescue is not carried out promptly.",
    section: "Fall Protection Equipment",
    difficulty: "intermediate",
    topic: "Suspension trauma",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 104,
    question: "Under LOLER 1998, how often must lifting equipment used for lifting persons undergo a thorough examination?",
    options: ["Every 3 months", "Every 6 months", "Every 12 months", "Every 24 months"],
    correctAnswer: 1,
    explanation: "Under the Lifting Operations and Lifting Equipment Regulations (LOLER) 1998, lifting equipment used to lift persons must undergo a thorough examination by a competent person at least every 6 months. For equipment not used to lift persons, the interval is at least every 12 months.",
    section: "Lifting Equipment Regulations",
    difficulty: "basic",
    topic: "LOLER thorough examinations",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 105,
    question: "Which type of fall protection is considered 'collective protection'?",
    options: ["A safety harness and lanyard", "Guard rails and safety nets", "A self-retracting lifeline", "A personal fall limiter"],
    correctAnswer: 1,
    explanation: "Collective protection measures such as guard rails and safety nets protect all workers in an area without requiring individual action or equipment. The Work at Height Regulations 2005 require that collective protection is always considered before personal protection (such as harnesses) because it protects everyone and does not rely on correct individual use.",
    section: "Fall Protection Hierarchy",
    difficulty: "basic",
    topic: "Collective vs personal protection",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 106,
    question: "A fragile roof surface is identified at a work site. What is the correct approach?",
    options: ["Only walk on the roof purlins and avoid the sheeting", "Install crawling boards or stagings spread across the roof structure and use fall arrest equipment", "Test the surface by applying weight gradually before walking on it", "Only access the roof during dry weather conditions"],
    correctAnswer: 1,
    explanation: "Fragile surfaces such as fibre cement sheets, rooflights, and corroded metal sheeting cannot be relied upon to bear a person's weight. The correct approach is to use crawling boards or stagings that spread the load across the underlying structure, combined with fall arrest equipment. Warning signs and edge protection must also be in place.",
    section: "Working on Fragile Surfaces",
    difficulty: "intermediate",
    topic: "Fragile surfaces",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 107,
    question: "What must be in place before any work at height begins?",
    options: ["A rescue plan for retrieving a fallen worker", "A written quote from the client", "Permission from the local authority", "A weather forecast for the next 48 hours"],
    correctAnswer: 0,
    explanation: "Regulation 4 of the Work at Height Regulations 2005 requires that emergency and rescue procedures are in place before any work at height commences. A rescue plan must detail how a fallen or stranded worker will be retrieved promptly to prevent suspension trauma or further injury.",
    section: "Rescue Planning",
    difficulty: "basic",
    topic: "Rescue planning",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 108,
    question: "When installing safety nets on a construction site, what is the maximum permitted vertical distance between the working level and the net?",
    options: ["1 metre", "2 metres", "6 metres", "10 metres"],
    correctAnswer: 2,
    explanation: "Safety nets should be rigged as close as practicable to the working level, and the maximum vertical distance between the working position and the net should not exceed 6 metres. The closer the net is to the working level, the lower the fall distance and impact force on the worker.",
    section: "Safety Nets",
    difficulty: "advanced",
    topic: "Safety nets",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 109,
    question: "What is the key principle of ergonomic manual handling?",
    options: ["Always lift with your back straight and legs bent", "Avoid manual handling altogether wherever possible", "Use gloves to improve grip when lifting", "Ensure the load is always carried close to the ground"],
    correctAnswer: 1,
    explanation: "The Manual Handling Operations Regulations 1992 establish a clear hierarchy: first, avoid hazardous manual handling operations so far as is reasonably practicable. If they cannot be avoided, assess the risk and reduce it as far as possible using mechanical aids, lighter loads, or team lifts.",
    section: "Manual Handling Principles",
    difficulty: "basic",
    topic: "Reducing manual handling risks",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 110,
    question: "When a team lift is necessary, what is the most important factor?",
    options: ["Having the strongest person at the heaviest end", "Ensuring all team members lift and lower on a coordinated signal", "Using at least four people regardless of load weight", "Wearing matching PPE to identify the team"],
    correctAnswer: 1,
    explanation: "The most important factor in a team lift is coordination. One person should act as the team leader and give clear instructions so that all members lift, carry, and lower the load simultaneously. Uncoordinated movement can cause the load to shift unexpectedly, increasing the risk of musculoskeletal injury.",
    section: "Team Lifting",
    difficulty: "basic",
    topic: "Team lifting",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 111,
    question: "What type of mechanical aid is most suitable for moving heavy materials horizontally across a flat site?",
    options: ["A gin wheel", "A pallet truck or trolley", "A cherry picker", "A scaffold hoist"],
    correctAnswer: 1,
    explanation: "A pallet truck or trolley is the most suitable mechanical aid for moving heavy materials horizontally across a flat surface. Gin wheels and scaffold hoists are designed for vertical lifting, while cherry pickers (MEWPs) are for accessing work at height, not for transporting materials.",
    section: "Mechanical Aids",
    difficulty: "basic",
    topic: "Mechanical aids",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 112,
    question: "A full-body harness has visible signs of UV degradation and frayed webbing. What action should be taken?",
    options: ["Tag it for repair by the manufacturer", "Continue using it if the metal components are undamaged", "Remove it from service immediately and arrange for disposal or return to manufacturer", "Reduce the maximum working load by 50%"],
    correctAnswer: 2,
    explanation: "Any fall protection equipment showing signs of damage, degradation, or wear must be immediately removed from service. UV degradation weakens the synthetic fibres, and frayed webbing significantly reduces the load-bearing capacity. The equipment should be quarantined, clearly labelled as defective, and either destroyed or returned to the manufacturer.",
    section: "Equipment Inspection",
    difficulty: "intermediate",
    topic: "Fall protection systems",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 113,
    question: "What is the minimum anchor point strength required for a single-person fall arrest system?",
    options: ["6 kN", "10 kN", "12 kN", "15 kN"],
    correctAnswer: 2,
    explanation: "The minimum anchor point strength for a single-person fall arrest system is 12 kN (approximately 1,200 kg). This provides an adequate safety margin above the maximum arrest force of 6 kN that a shock absorber is designed to limit. Using an anchor point below this strength risks the anchor failing during a fall arrest.",
    section: "Anchor Points",
    difficulty: "advanced",
    topic: "Fall protection systems",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 114,
    question: "Which of the following best describes 'clearance distance' in fall protection?",
    options: ["The distance between two adjacent anchor points", "The total vertical distance required below the worker to ensure they do not hit a lower level during a fall arrest", "The horizontal distance a worker can travel while attached to a lanyard", "The distance between the harness attachment point and the worker's feet"],
    correctAnswer: 1,
    explanation: "Clearance distance is the total vertical space required below a worker's feet to ensure they do not strike a lower level during a fall arrest. It includes the lanyard length, shock absorber deployment, harness stretch, the worker's height below the attachment point, and a safety margin. Insufficient clearance renders a fall arrest system ineffective.",
    section: "Fall Protection Planning",
    difficulty: "advanced",
    topic: "Fall protection systems",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 115,
    question: "Under LOLER 1998, who is permitted to carry out a thorough examination of lifting equipment?",
    options: ["Any trained operative on site", "The equipment owner", "A competent person with appropriate knowledge and experience", "Only the original equipment manufacturer"],
    correctAnswer: 2,
    explanation: "LOLER 1998 requires that thorough examinations are carried out by a competent person. This means someone with sufficient practical and theoretical knowledge and experience of the equipment to detect defects and assess their significance. This is often an engineer from an insurance company or an independent inspection body.",
    section: "Lifting Equipment Regulations",
    difficulty: "intermediate",
    topic: "LOLER 1998 thorough examinations",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 116,
    question: "What is the guideline maximum weight for a single person to lift under ideal conditions according to HSE guidance?",
    options: ["15 kg", "20 kg", "25 kg", "30 kg"],
    correctAnswer: 2,
    explanation: "HSE guidance suggests that under ideal conditions (load held close to the body, at waist height, with good grip), the guideline maximum weight for a male is approximately 25 kg. However, this is not a safe limit — it is a threshold above which a detailed risk assessment is strongly recommended. The actual safe weight depends on the individual, posture, frequency, and environment.",
    section: "Manual Handling Assessment",
    difficulty: "intermediate",
    topic: "Reducing manual handling risks",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 117,
    question: "What does the acronym TILE stand for in manual handling risk assessment?",
    options: ["Task, Individual, Load, Equipment", "Task, Individual, Load, Environment", "Training, Information, Lifting, Equipment", "Technique, Instruction, Load, Ergonomics"],
    correctAnswer: 1,
    explanation: "TILE stands for Task, Individual, Load, and Environment. These are the four key factors to assess when carrying out a manual handling risk assessment. The Task considers what movements are involved; the Individual considers the handler's capability; the Load considers weight, shape, and grip; the Environment considers space, flooring, and temperature.",
    section: "Manual Handling Assessment",
    difficulty: "intermediate",
    topic: "Reducing manual handling risks",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 118,
    question: "When should edge protection be provided on a flat roof?",
    options: ["Only if the roof is more than 3 metres high", "Only when work is being carried out within 2 metres of the edge", "Whenever there is a risk of a person falling from the edge, regardless of height", "Only during wet or windy weather conditions"],
    correctAnswer: 2,
    explanation: "Edge protection must be provided whenever there is a risk of a person falling from the edge of a flat roof. The Work at Height Regulations 2005 do not specify a minimum height threshold — the requirement is based on risk. Even a fall from a low height can cause serious injury, so edge protection should be provided as a default measure.",
    section: "Edge Protection",
    difficulty: "intermediate",
    topic: "Fall protection systems",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 119,
    question: "What is the primary purpose of a work restraint system?",
    options: ["To arrest a worker's fall and limit impact forces", "To prevent the worker from reaching a position where a fall could occur", "To provide a safe means of descent after a fall", "To support the worker's weight during rope access operations"],
    correctAnswer: 1,
    explanation: "A work restraint system is designed to prevent a worker from reaching an edge or position where a fall could occur. Unlike fall arrest systems which stop a fall after it has started, work restraint limits the worker's travel so they physically cannot reach the fall hazard. This is a higher-order control measure than fall arrest.",
    section: "Fall Protection Hierarchy",
    difficulty: "intermediate",
    topic: "Fall protection systems",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 120,
    question: "A worker needs to lift a 30 kg bag of cement from ground level to waist height repeatedly throughout the day. What is the best course of action?",
    options: ["Train the worker in correct lifting technique and allow them to continue", "Provide a mechanical lifting aid such as a vacuum lifter or pallet to workbench height conveyor", "Ask two workers to share the lifting throughout the day", "Reduce the number of lifts to fewer than 10 per hour"],
    correctAnswer: 1,
    explanation: "At 30 kg with repetitive lifting, the risk of musculoskeletal injury is significant. The hierarchy of controls requires eliminating the manual handling first — in this case by providing a mechanical lifting aid. While team lifting and training can reduce risk, they do not eliminate it. A mechanical aid such as a conveyor, vacuum lifter, or adjustable platform is the most effective control.",
    section: "Manual Handling Controls",
    difficulty: "advanced",
    topic: "Reducing manual handling risks",
    category: "Working at Height & Manual Handling"
  },
  {
    id: 121,
    question: "What do the COSHH Regulations 2002 require employers to do?",
    options: ["Ban all hazardous substances from the workplace", "Assess and control exposure to hazardous substances to prevent ill health", "Provide gas masks to all employees", "Report all chemical purchases to the HSE"],
    correctAnswer: 1,
    explanation: "The Control of Substances Hazardous to Health (COSHH) Regulations 2002 require employers to assess the risks from hazardous substances in the workplace and implement appropriate control measures to prevent or adequately control exposure. This includes identifying substances, assessing exposure routes, and applying the hierarchy of controls.",
    section: "COSHH Regulations",
    difficulty: "basic",
    topic: "COSHH Regulations 2002",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 122,
    question: "What information does a Safety Data Sheet (SDS) provide?",
    options: ["Only the price and supplier details of the chemical", "Hazard identification, first aid measures, handling and storage, exposure controls, and disposal information", "A list of alternative products that could be used instead", "The date the substance was manufactured and its expiry date only"],
    correctAnswer: 1,
    explanation: "A Safety Data Sheet (SDS) is a standardised 16-section document that provides comprehensive information about a chemical product. It includes hazard identification, composition, first aid measures, fire-fighting measures, accidental release measures, handling and storage, exposure controls and PPE, physical and chemical properties, toxicological information, and disposal considerations.",
    section: "Safety Data Sheets",
    difficulty: "basic",
    topic: "Safety data sheets",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 123,
    question: "Which GHS pictogram indicates a substance is toxic (acute toxicity)?",
    options: ["A flame symbol", "A skull and crossbones", "An exclamation mark", "A gas cylinder"],
    correctAnswer: 1,
    explanation: "The skull and crossbones pictogram (GHS06) indicates that a substance has acute toxicity and can cause death or serious harm through a single or short-term exposure via ingestion, inhalation, or skin contact. The flame indicates flammability, the exclamation mark indicates less severe hazards such as skin irritation, and the gas cylinder indicates gases under pressure.",
    section: "GHS Pictograms",
    difficulty: "basic",
    topic: "GHS pictograms",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 124,
    question: "What does a GHS pictogram showing a person with a starburst on their chest indicate?",
    options: ["The substance can cause skin irritation", "The substance is a serious health hazard such as a carcinogen or respiratory sensitiser", "The substance is radioactive", "The substance is harmful to the ozone layer"],
    correctAnswer: 1,
    explanation: "The health hazard pictogram (GHS08) showing a silhouette with a starburst on the chest indicates serious long-term health hazards. These include carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitisation, specific target organ toxicity, and aspiration hazard. This is more severe than the exclamation mark pictogram.",
    section: "GHS Pictograms",
    difficulty: "intermediate",
    topic: "GHS pictograms",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 125,
    question: "What is a Workplace Exposure Limit (WEL)?",
    options: ["The maximum number of hours a worker can be exposed to any hazard", "The maximum airborne concentration of a hazardous substance averaged over a reference period that a worker may be exposed to", "The minimum ventilation rate required in an enclosed workspace", "The legal limit on the number of hazardous substances that may be stored on site"],
    correctAnswer: 1,
    explanation: "A Workplace Exposure Limit (WEL) is the maximum concentration of a hazardous substance in the air, averaged over a reference period (typically 8 hours TWA or 15-minute STEL), to which workers may be exposed by inhalation. WELs are listed in EH40 and are legally binding limits under COSHH.",
    section: "Exposure Controls",
    difficulty: "intermediate",
    topic: "WELs",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 126,
    question: "What is the purpose of Local Exhaust Ventilation (LEV)?",
    options: ["To provide fresh air for workers in a confined space", "To capture airborne contaminants at or near the source before they spread into the workplace", "To cool down hot work areas during summer months", "To remove odours from welfare facilities"],
    correctAnswer: 1,
    explanation: "Local Exhaust Ventilation (LEV) is an engineering control that captures dusts, fumes, vapours, and other airborne contaminants at or near the point of generation before they can be inhaled by workers. LEV systems must be thoroughly examined and tested at least every 14 months under COSHH Regulation 9.",
    section: "Exposure Controls",
    difficulty: "intermediate",
    topic: "LEV",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 127,
    question: "Which of the following is the most common type of asbestos found in buildings in the UK?",
    options: ["Amosite (brown asbestos)", "Crocidolite (blue asbestos)", "Chrysotile (white asbestos)", "Tremolite"],
    correctAnswer: 2,
    explanation: "Chrysotile (white asbestos) is the most commonly found type of asbestos in UK buildings, accounting for approximately 90% of asbestos used commercially. It was widely used in cement products, textiles, brake linings, and roof sheets. However, all types of asbestos are dangerous and can cause fatal diseases.",
    section: "Asbestos Types",
    difficulty: "basic",
    topic: "Asbestos types",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 128,
    question: "Which type of asbestos is generally considered the most dangerous?",
    options: ["Chrysotile (white asbestos)", "Amosite (brown asbestos)", "Crocidolite (blue asbestos)", "All types are equally dangerous"],
    correctAnswer: 2,
    explanation: "Crocidolite (blue asbestos) is generally considered the most dangerous type of asbestos because its very fine, sharp fibres are easily inhaled deep into the lungs and are extremely resistant to the body's defence mechanisms. However, it is essential to understand that all types of asbestos can cause fatal diseases including mesothelioma, and none should be considered safe.",
    section: "Asbestos Types",
    difficulty: "intermediate",
    topic: "Asbestos types",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 129,
    question: "In which of the following locations is asbestos LEAST likely to be found?",
    options: ["Ceiling tiles in a 1970s office building", "Pipe lagging in a pre-2000 boiler room", "Timber floorboards in a Victorian house", "Textured coatings (Artex) applied before 2000"],
    correctAnswer: 2,
    explanation: "Timber floorboards are a natural wood product and do not contain asbestos. Asbestos is most commonly found in man-made building materials produced before 2000, including ceiling tiles, pipe lagging, insulating boards, floor tiles, textured coatings, cement roofing sheets, and gaskets. Any building constructed or refurbished before 2000 may contain asbestos-containing materials.",
    section: "Asbestos Locations",
    difficulty: "basic",
    topic: "Where asbestos is found",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 130,
    question: "What is mesothelioma?",
    options: ["A skin condition caused by contact with asbestos fibres", "A cancer of the lining of the lungs or abdomen almost exclusively caused by asbestos exposure", "A respiratory infection common among construction workers", "An allergic reaction to asbestos dust"],
    correctAnswer: 1,
    explanation: "Mesothelioma is a cancer of the mesothelium — the thin lining that covers the lungs (pleura) and the abdominal cavity (peritoneum). It is almost exclusively caused by exposure to asbestos fibres and is always fatal. There is a long latency period, typically 15-60 years between exposure and diagnosis. Around 2,500 people die from mesothelioma in the UK each year.",
    section: "Asbestos Health Effects",
    difficulty: "intermediate",
    topic: "Mesothelioma and asbestosis",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 131,
    question: "What is asbestosis?",
    options: ["A type of lung cancer", "A scarring of the lung tissue caused by prolonged exposure to asbestos fibres, leading to breathing difficulties", "An infection of the lungs caused by inhaling asbestos", "A temporary irritation of the airways that resolves after exposure stops"],
    correctAnswer: 1,
    explanation: "Asbestosis is a chronic, progressive fibrosis (scarring) of the lung tissue caused by inhaling asbestos fibres over a prolonged period. The scarring makes the lungs stiff and reduces their ability to exchange gases, causing increasing breathlessness. It typically requires significant cumulative exposure and develops over many years. There is no cure.",
    section: "Asbestos Health Effects",
    difficulty: "intermediate",
    topic: "Mesothelioma and asbestosis",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 132,
    question: "Under Regulation 4 of the Control of Asbestos Regulations (CAR) 2012, who has the 'duty to manage' asbestos in non-domestic premises?",
    options: ["The building contractor", "The HSE inspector", "The person who has the maintenance or repair obligation for the premises (the dutyholder)", "The local fire authority"],
    correctAnswer: 2,
    explanation: "Regulation 4 of CAR 2012 places the duty to manage asbestos on the person who has the maintenance or repair obligation for non-domestic premises, or who has control of them. This 'dutyholder' must find out whether asbestos is present, assess its condition, prepare a management plan, and provide information to anyone who might disturb it.",
    section: "Asbestos Management",
    difficulty: "intermediate",
    topic: "Duty to manage asbestos",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 133,
    question: "Which type of asbestos work always requires a licensed contractor?",
    options: ["Removing asbestos cement roof sheets", "Encapsulating asbestos insulating board in good condition", "Removing asbestos insulation (lagging) from pipes", "Collecting and disposing of small amounts of loose asbestos debris"],
    correctAnswer: 2,
    explanation: "The removal of asbestos insulation (lagging), asbestos coatings such as sprayed coatings, and asbestos insulating board (AIB) in poor condition are licensable works that must only be carried out by a licensed contractor holding an HSE asbestos licence. Asbestos cement removal is generally non-licensed or notifiable non-licensed work, depending on condition.",
    section: "Asbestos Licensing",
    difficulty: "advanced",
    topic: "Licensed vs non-licensed work",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 134,
    question: "What should you do if you accidentally disturb material that you suspect contains asbestos?",
    options: ["Try to clean it up quickly using a dustpan and brush", "Stop work immediately, warn others, evacuate the area, and report to your supervisor", "Wet the material down and place it in a black bin bag", "Continue working but put on a dust mask"],
    correctAnswer: 1,
    explanation: "If you accidentally disturb suspected asbestos-containing material, you must stop work immediately, prevent anyone else from entering the area, warn those nearby, leave the area without disturbing the material further, and report it to your supervisor. The area must be sealed off and only a competent person should assess and manage the situation. A standard dust mask provides no protection against asbestos fibres.",
    section: "Asbestos Emergency Procedures",
    difficulty: "basic",
    topic: "Asbestos types",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 135,
    question: "At what daily personal noise exposure level must an employer provide hearing protection to workers who request it?",
    options: ["70 dB(A)", "80 dB(A)", "85 dB(A)", "87 dB(A)"],
    correctAnswer: 1,
    explanation: "Under the Control of Noise at Work Regulations 2005, the lower exposure action value is a daily personal noise exposure of 80 dB(A). At this level, employers must make hearing protection available to workers who request it and provide information and training about noise risks. At 85 dB(A), the upper action value, hearing protection becomes mandatory.",
    section: "Noise Exposure Levels",
    difficulty: "basic",
    topic: "Noise exposure levels",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 136,
    question: "At what daily personal noise exposure level must hearing protection be worn as a mandatory requirement?",
    options: ["75 dB(A)", "80 dB(A)", "85 dB(A)", "87 dB(A)"],
    correctAnswer: 2,
    explanation: "At the upper exposure action value of 85 dB(A), the Control of Noise at Work Regulations 2005 require employers to designate hearing protection zones, ensure hearing protection is worn by everyone entering those zones, and take steps to reduce noise exposure through engineering or organisational controls.",
    section: "Noise Exposure Levels",
    difficulty: "basic",
    topic: "Hearing protection",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 137,
    question: "What is the exposure limit value for daily personal noise exposure that must never be exceeded?",
    options: ["80 dB(A)", "85 dB(A)", "87 dB(A)", "90 dB(A)"],
    correctAnswer: 2,
    explanation: "The exposure limit value under the Control of Noise at Work Regulations 2005 is 87 dB(A) daily personal noise exposure, taking into account the effect of hearing protection worn. This absolute limit must never be exceeded. If a worker's exposure reaches 87 dB(A) even with hearing protection, immediate action must be taken to reduce exposure.",
    section: "Noise Exposure Levels",
    difficulty: "intermediate",
    topic: "Noise exposure levels",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 138,
    question: "A doubling of sound energy increases the noise level by how many decibels?",
    options: ["1 dB", "3 dB", "6 dB", "10 dB"],
    correctAnswer: 1,
    explanation: "The decibel scale is logarithmic, so a doubling of sound energy corresponds to an increase of approximately 3 dB. This means that two identical machines running together produce a noise level 3 dB higher than one machine alone. A 10 dB increase is perceived as roughly a doubling of loudness to the human ear.",
    section: "Noise Fundamentals",
    difficulty: "advanced",
    topic: "Noise exposure levels",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 139,
    question: "What does HAV stand for in relation to occupational health?",
    options: ["Hazardous Air Ventilation", "Hand-Arm Vibration", "High Altitude Vertigo", "Heat Affected Volume"],
    correctAnswer: 1,
    explanation: "HAV stands for Hand-Arm Vibration. It is caused by using hand-held vibrating tools such as hammer drills, breakers, grinders, and chainsaws. Prolonged exposure can lead to Hand-Arm Vibration Syndrome (HAVS), which includes vascular, neurological, and musculoskeletal symptoms such as white finger, numbness, and reduced grip strength.",
    section: "Vibration Exposure",
    difficulty: "basic",
    topic: "HAV and WBV",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 140,
    question: "What is the daily exposure action value (EAV) for hand-arm vibration?",
    options: ["1.0 m/s\u00b2 A(8)", "2.5 m/s\u00b2 A(8)", "5.0 m/s\u00b2 A(8)", "10.0 m/s\u00b2 A(8)"],
    correctAnswer: 1,
    explanation: "The daily exposure action value (EAV) for hand-arm vibration is 2.5 m/s\u00b2 A(8) under the Control of Vibration at Work Regulations 2005. At this level, employers must introduce a programme of controls to reduce exposure. The daily exposure limit value (ELV) is 5.0 m/s\u00b2 A(8), which must not be exceeded.",
    section: "Vibration Exposure",
    difficulty: "advanced",
    topic: "Vibration exposure values",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 141,
    question: "What condition can result from prolonged exposure to whole-body vibration (WBV)?",
    options: ["Hearing loss", "Lower back pain and spinal disorders", "White finger syndrome", "Skin dermatitis"],
    correctAnswer: 1,
    explanation: "Whole-body vibration (WBV) is transmitted through the seat or feet of operators of mobile machinery, vehicles, and equipment. Prolonged exposure can cause lower back pain, early degeneration of the spine, and damage to the intervertebral discs. Common sources include driving dumpers, excavators, fork-lift trucks, and quad bikes over rough terrain.",
    section: "Vibration Exposure",
    difficulty: "intermediate",
    topic: "HAV and WBV",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 142,
    question: "What is the correct order of the waste hierarchy from most preferred to least preferred?",
    options: ["Recycle, Reduce, Reuse, Recover, Dispose", "Dispose, Recover, Recycle, Reuse, Reduce", "Reduce, Reuse, Recycle, Recover, Dispose", "Reuse, Reduce, Recover, Recycle, Dispose"],
    correctAnswer: 2,
    explanation: "The waste hierarchy, as established in the Waste (England and Wales) Regulations 2011, ranks waste management options from most to least preferred: Prevention (Reduce), Preparing for Reuse, Recycling, Other Recovery (such as energy recovery), and Disposal (landfill). Following this hierarchy minimises environmental impact and resource depletion.",
    section: "Waste Management",
    difficulty: "basic",
    topic: "Waste hierarchy",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 143,
    question: "What document must accompany the transfer of hazardous waste from a construction site?",
    options: ["A COSHH assessment", "A hazardous waste consignment note", "A building regulations certificate", "A planning permission document"],
    correctAnswer: 1,
    explanation: "A hazardous waste consignment note must accompany hazardous waste whenever it is moved from a site. This legal document tracks the waste from its point of production to its final destination, ensuring that hazardous materials are properly identified, transported, and disposed of in compliance with the Hazardous Waste Regulations.",
    section: "Waste Management",
    difficulty: "intermediate",
    topic: "Waste hierarchy",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 144,
    question: "What is the main purpose of a dust suppression system on a construction site?",
    options: ["To keep the site looking tidy for client visits", "To reduce airborne dust levels and protect workers from respiratory diseases such as silicosis", "To prevent dust from damaging machinery", "To comply with planning permission conditions only"],
    correctAnswer: 1,
    explanation: "Dust suppression systems (such as water sprays, misting units, and on-tool extraction) are used primarily to reduce airborne respirable dust levels and protect workers from serious respiratory diseases. Construction dust, particularly respirable crystalline silica (RCS), can cause silicosis, lung cancer, and COPD. Controlling dust at source is a legal requirement under COSHH.",
    section: "Dust Control",
    difficulty: "basic",
    topic: "Dust control",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 145,
    question: "Which of the following materials generates the most hazardous dust when cut or drilled?",
    options: ["Timber", "Concrete and sandstone (containing silica)", "Plasterboard", "Plastic drainage pipe"],
    correctAnswer: 1,
    explanation: "Concrete, sandstone, and other silica-containing materials generate respirable crystalline silica (RCS) dust when cut, drilled, or ground. RCS is classified as a carcinogen and can cause silicosis (an incurable lung disease), lung cancer, and COPD. The workplace exposure limit for RCS is 0.1 mg/m\u00b3, requiring strict dust controls including on-tool extraction and water suppression.",
    section: "Dust Control",
    difficulty: "intermediate",
    topic: "Dust control",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 146,
    question: "What is the primary environmental risk of allowing cement-contaminated water to enter a watercourse?",
    options: ["It will cause flooding downstream", "It is highly alkaline and toxic to aquatic life, and can block fish gills", "It will increase the water temperature", "It will improve the water clarity by settling out particles"],
    correctAnswer: 1,
    explanation: "Cement-contaminated water is highly alkaline (pH 11-13) and is extremely toxic to aquatic life. It can kill fish and invertebrates, destroy aquatic habitats, and block fish gills. Allowing cement washwater or slurry to enter surface water drains, ditches, or watercourses is an offence under the Environmental Permitting Regulations and can result in prosecution and significant fines.",
    section: "Water Pollution Prevention",
    difficulty: "intermediate",
    topic: "Water pollution prevention",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 147,
    question: "What is the correct method for storing diesel fuel on a construction site to prevent water pollution?",
    options: ["In a single-skinned tank on bare ground near the watercourse for easy access", "In a double-skinned (bunded) tank with a capacity of 110% of the stored volume, sited away from drains and watercourses", "In open-top drums covered with tarpaulin", "In underground tanks that do not require any secondary containment"],
    correctAnswer: 1,
    explanation: "Diesel and other oils must be stored in double-skinned (bunded) tanks or within a secondary containment bund with a capacity of at least 110% of the largest container. The storage area should be sited away from drains and watercourses, on an impervious surface, and inspected regularly for leaks. This is required under the Oil Storage Regulations.",
    section: "Water Pollution Prevention",
    difficulty: "intermediate",
    topic: "Water pollution prevention",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 148,
    question: "Under the COSHH hierarchy of control, what should be attempted first to manage exposure to a hazardous substance?",
    options: ["Issue RPE (respiratory protective equipment) to all workers", "Substitute the substance with a less hazardous alternative", "Eliminate the need for the hazardous substance entirely", "Introduce health surveillance for exposed workers"],
    correctAnswer: 2,
    explanation: "The COSHH hierarchy of control prioritises elimination first — removing the need for the hazardous substance altogether. If elimination is not reasonably practicable, the next step is substitution with a less hazardous alternative. Only when these higher-order controls are not feasible should engineering controls, administrative controls, and finally PPE be considered.",
    section: "COSHH Hierarchy of Control",
    difficulty: "intermediate",
    topic: "COSHH Regulations 2002",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 149,
    question: "What is an environmental permit required for?",
    options: ["Employing more than 10 workers on a construction site", "Activities that may pollute the environment, such as waste operations, water discharges, or certain industrial processes", "Any work within 50 metres of a residential property", "Using power tools after 6 pm on weekdays"],
    correctAnswer: 1,
    explanation: "Environmental permits are required under the Environmental Permitting Regulations for activities that could pollute the environment, including waste management operations, water discharge activities, industrial installations, mining waste operations, and radioactive substance activities. Operating without the required permit is a criminal offence.",
    section: "Environmental Permits",
    difficulty: "intermediate",
    topic: "Environmental permits",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 150,
    question: "What action must a construction site take if a protected species such as great crested newts or nesting birds is discovered during works?",
    options: ["Relocate the species to the nearest park", "Stop work in the affected area immediately and seek advice from a qualified ecologist", "Continue working but avoid the area for 24 hours", "Report the discovery to the local council and continue work"],
    correctAnswer: 1,
    explanation: "All wild birds, their nests, and eggs are protected under the Wildlife and Countryside Act 1981, and great crested newts are additionally protected under the Conservation of Habitats and Species Regulations 2017. If protected species are discovered, work must stop in the affected area immediately and a qualified ecologist must be consulted before work can resume. Disturbing or harming protected species is a criminal offence.",
    section: "Protected Species",
    difficulty: "intermediate",
    topic: "Protected species",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 151,
    question: "How often must LEV systems be thoroughly examined and tested under COSHH?",
    options: ["Every 6 months", "At least every 14 months", "Every 2 years", "Only when a fault is reported"],
    correctAnswer: 1,
    explanation: "Under COSHH Regulation 9, LEV systems must be thoroughly examined and tested by a competent person at least every 14 months. Records of these examinations must be kept for at least 5 years. Regular maintenance and visual checks should also be carried out between thorough examinations to ensure the system continues to function effectively.",
    section: "LEV Maintenance",
    difficulty: "advanced",
    topic: "LEV",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 152,
    question: "Which of the following is a symptom of Hand-Arm Vibration Syndrome (HAVS)?",
    options: ["Hearing loss in one ear", "Fingers turning white and losing sensation, especially in cold conditions", "Persistent headaches after using vibrating tools", "Swelling of the ankles and feet"],
    correctAnswer: 1,
    explanation: "A characteristic symptom of HAVS is 'vibration white finger', where the fingers blanch (turn white), become numb, and lose sensation, especially when triggered by cold conditions. Other symptoms include tingling, pain, and reduced grip strength. The condition is caused by damage to the blood vessels and nerves in the hand and arm from prolonged vibration exposure.",
    section: "Vibration Health Effects",
    difficulty: "basic",
    topic: "HAV and WBV",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 153,
    question: "What type of RPE filter is required for protection against organic vapours such as solvent fumes?",
    options: ["P3 particulate filter", "A-type (brown) gas filter", "K-type (green) gas filter", "E-type (yellow) gas filter"],
    correctAnswer: 1,
    explanation: "An A-type (brown-coded) gas filter is designed to protect against organic vapours with a boiling point above 65\u00b0C, such as solvent fumes. P3 filters protect against particulates only, not gases. K-type (green) filters are for ammonia, and E-type (yellow) filters are for sulphur dioxide and acid gases. The correct filter type must be selected based on the specific hazard.",
    section: "RPE Selection",
    difficulty: "advanced",
    topic: "Exposure controls",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 154,
    question: "What is the key requirement for RPE to be effective?",
    options: ["It must be the most expensive option available", "It must be face-fit tested to the individual wearer and properly maintained", "It must be a full-face mask regardless of the hazard", "It must be replaced every week"],
    correctAnswer: 1,
    explanation: "For RPE to provide effective protection, it must be face-fit tested to the individual wearer to ensure a proper seal. A poorly fitting mask will allow contaminated air to bypass the filter. Face-fit testing must be carried out by a competent person using either qualitative or quantitative methods. RPE must also be properly maintained, stored, and inspected before each use.",
    section: "RPE Requirements",
    difficulty: "intermediate",
    topic: "Exposure controls",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 155,
    question: "Under COSHH, how long must health surveillance records be kept for workers exposed to hazardous substances?",
    options: ["5 years", "10 years", "40 years from the date of the last entry", "Indefinitely"],
    correctAnswer: 2,
    explanation: "COSHH Regulation 11 requires that individual health surveillance records are kept for at least 40 years from the date of the last entry. This long retention period reflects the fact that many occupational diseases caused by hazardous substances have very long latency periods — for example, mesothelioma can develop 15-60 years after asbestos exposure.",
    section: "Health Surveillance",
    difficulty: "advanced",
    topic: "COSHH Regulations 2002",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 156,
    question: "What is the Workplace Exposure Limit (WEL) for respirable crystalline silica (RCS)?",
    options: ["0.01 mg/m\u00b3", "0.1 mg/m\u00b3", "0.5 mg/m\u00b3", "1.0 mg/m\u00b3"],
    correctAnswer: 1,
    explanation: "The Workplace Exposure Limit for respirable crystalline silica (RCS) is 0.1 mg/m\u00b3 as an 8-hour time-weighted average (TWA), as listed in EH40. RCS is a carcinogen and strict controls are required to keep exposure as far below the WEL as possible. Activities such as cutting, drilling, or grinding concrete, sandstone, or mortar can generate significant RCS dust.",
    section: "Exposure Limits",
    difficulty: "advanced",
    topic: "WELs",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 157,
    question: "Which of the following is NOT a route of exposure for hazardous substances?",
    options: ["Inhalation (breathing in)", "Ingestion (swallowing)", "Absorption through the skin", "Exposure through electromagnetic radiation"],
    correctAnswer: 3,
    explanation: "The three main routes of exposure for hazardous substances are inhalation (breathing in dusts, fumes, vapours, or gases), ingestion (swallowing through contaminated food, drink, or hand-to-mouth contact), and skin absorption (substances passing through the skin into the bloodstream). Electromagnetic radiation is a separate physical hazard, not a route of chemical exposure.",
    section: "Routes of Exposure",
    difficulty: "basic",
    topic: "COSHH Regulations 2002",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 158,
    question: "What colour-coded label identifies hazardous waste containers for asbestos on a construction site?",
    options: ["Yellow and black", "Red with a white 'a' on blue background", "Green with a white cross", "Orange with a black skull symbol"],
    correctAnswer: 1,
    explanation: "Asbestos waste must be double-bagged in clearly labelled bags or wrapped and placed in suitable containers. The labelling must include the recognised asbestos warning label — a white lowercase 'a' on a blue background with a red border — as required by the Asbestos (Licensing) Regulations and the Carriage of Dangerous Goods Regulations.",
    section: "Asbestos Waste Disposal",
    difficulty: "intermediate",
    topic: "Asbestos types",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 159,
    question: "What is the purpose of an asbestos register in a building?",
    options: ["To record the names of workers who have been exposed to asbestos", "To document the location, type, and condition of known or presumed asbestos-containing materials in the building", "To list all licensed asbestos removal contractors", "To record the dates of annual asbestos air monitoring tests"],
    correctAnswer: 1,
    explanation: "An asbestos register is a key part of the asbestos management plan required under Regulation 4 of CAR 2012. It documents the location, type, condition, and extent of known or presumed asbestos-containing materials (ACMs) in a building. This information must be made available to anyone who might disturb ACMs during maintenance, refurbishment, or demolition work.",
    section: "Asbestos Management",
    difficulty: "intermediate",
    topic: "Duty to manage asbestos",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 160,
    question: "What is the main purpose of a COSHH assessment?",
    options: ["To calculate the cost of purchasing hazardous substances", "To identify hazardous substances, assess the risks of exposure, and determine the control measures needed to protect workers' health", "To decide which workers should be assigned to work with chemicals", "To comply with fire safety regulations for chemical storage"],
    correctAnswer: 1,
    explanation: "A COSHH assessment identifies all hazardous substances present or produced in the workplace, evaluates the risks arising from exposure (considering routes of exposure, duration, and frequency), and determines the control measures needed to prevent or adequately control exposure. It must be reviewed regularly and updated whenever there is a significant change in work practices or substances used.",
    section: "COSHH Assessment",
    difficulty: "basic",
    topic: "COSHH Regulations 2002",
    category: "Hazardous Substances & Environmental"
  },
  {
    id: 161,
    question: "According to HSG47, what is the first step before any excavation work begins?",
    options: ["Ordering trench sheets and props", "Identifying the location of underground services using plans, a CAT scanner, and trial holes", "Hiring a banksman to direct excavation machinery", "Applying for a road closure permit"],
    correctAnswer: 1,
    explanation: "HSG47 (Avoiding Danger from Underground Services) requires that the location of underground services is identified before any excavation begins. This involves checking utility plans, using a Cable Avoidance Tool (CAT) and signal generator (Genny) to locate buried cables and pipes, and digging trial holes by hand near identified services. Striking a live service can be fatal.",
    section: "Excavation Safety",
    difficulty: "basic",
    topic: "Underground services",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 162,
    question: "What is the purpose of a Cable Avoidance Tool (CAT)?",
    options: ["To cut through underground cables safely", "To detect the presence and approximate position of underground cables and pipes", "To measure the voltage of buried electrical cables", "To provide a physical barrier over underground services"],
    correctAnswer: 1,
    explanation: "A Cable Avoidance Tool (CAT) is a hand-held device that detects electromagnetic signals emitted by or induced onto buried metallic services such as power cables, telecoms cables, and metal pipes. It is used to locate their approximate position and depth before excavation. A CAT should always be used together with a signal generator (Genny) for best results.",
    section: "Underground Services",
    difficulty: "basic",
    topic: "CAT and Genny",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 163,
    question: "What does a signal generator (Genny) do when used alongside a CAT?",
    options: ["It powers the CAT scanner's batteries", "It applies a detectable signal to a specific service, making it easier for the CAT to locate", "It automatically maps all underground services in the area", "It neutralises electrical current in buried cables to make them safe"],
    correctAnswer: 1,
    explanation: "A signal generator (Genny) applies a known signal to a specific underground service, either by direct connection or induction. The CAT can then detect this distinct signal, allowing the operator to trace the route of that particular service more accurately. Using a CAT and Genny together provides much more reliable detection than using a CAT alone.",
    section: "Underground Services",
    difficulty: "intermediate",
    topic: "CAT and Genny",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 164,
    question: "What is the minimum safe distance that a person should maintain from an overhead power line rated at 275 kV or above?",
    options: ["3 metres", "6 metres", "9 metres", "15 metres"],
    correctAnswer: 3,
    explanation: "For overhead power lines rated at 275 kV and above, the minimum safe clearance distance is 15 metres from the nearest conductor for persons, plant, or materials. For lines rated up to 33 kV, the minimum is 6 metres. These distances account for cable sag, wind sway, and the risk of electrical flashover. The energy supplier must be consulted before any work near overhead lines.",
    section: "Overhead Power Lines",
    difficulty: "advanced",
    topic: "Overhead power lines",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 165,
    question: "What physical method can be used to prevent vehicles and plant from encroaching beneath overhead power lines?",
    options: ["Posting a banksman at each end of the overhead line", "Installing goal posts (barrier gates) with a visible height restriction to prevent tall plant from passing underneath", "Painting a line on the ground beneath the cables", "Issuing a written warning to all drivers"],
    correctAnswer: 1,
    explanation: "Goal posts (also called barrier gates or goalposts) are rigid structures placed at each side of the route beneath overhead power lines. They have a crossbar set at the safe passage height to physically prevent vehicles and plant that are too tall from passing underneath and coming dangerously close to the conductors. This is a passive, reliable safeguard recommended by HSE guidance GS6.",
    section: "Overhead Power Lines",
    difficulty: "intermediate",
    topic: "Overhead power lines",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 166,
    question: "What are the three main methods of supporting the sides of an excavation to prevent collapse?",
    options: ["Fencing, signage, and lighting", "Battering (sloping), shoring (propping), and trench boxes (shielding)", "Dewatering, compaction, and grouting", "Concreting, piling, and sheet stacking"],
    correctAnswer: 1,
    explanation: "The three main methods of supporting excavation sides are: battering (cutting the sides back to a safe angle of repose), shoring (using timber or hydraulic props to support the excavation walls), and trench boxes or shields (prefabricated steel structures placed inside the trench to protect workers). The method chosen depends on soil type, depth, space, and duration of work.",
    section: "Excavation Support",
    difficulty: "intermediate",
    topic: "Supporting excavations",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 167,
    question: "Who must inspect an excavation under CDM 2015 and HSG47?",
    options: ["Any worker entering the excavation", "A competent person, at the start of each shift and after any event likely to have affected stability", "The site manager once per week", "The client's health and safety adviser at monthly intervals"],
    correctAnswer: 1,
    explanation: "Under CDM 2015 and HSG47, excavations must be inspected by a competent person at the start of each shift before work begins, after any event likely to have affected stability (such as a fall of material, heavy rain, or significant vibration), and after any accidental fall of rock, earth, or material. Written reports of inspections must be made and kept on site.",
    section: "Excavation Inspections",
    difficulty: "intermediate",
    topic: "Excavation hazards",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 168,
    question: "What is a confined space as defined by the Confined Spaces Regulations 1997?",
    options: ["Any room smaller than 10 square metres", "Any enclosed or partially enclosed space where there is a reasonably foreseeable risk of serious injury from hazardous conditions", "Any space that requires a ladder to access", "Any underground chamber regardless of ventilation"],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 define a confined space as any place that is substantially (though not always entirely) enclosed, and where serious injury can occur from hazardous substances or conditions within the space or nearby. Examples include tanks, vessels, silos, chambers, manholes, sewers, excavations, and even some rooms with poor ventilation.",
    section: "Confined Spaces",
    difficulty: "intermediate",
    topic: "Confined spaces",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 169,
    question: "What is the normal oxygen concentration in air?",
    options: ["16%", "19.5%", "20.9%", "23.5%"],
    correctAnswer: 2,
    explanation: "Normal atmospheric air contains approximately 20.9% oxygen. In confined spaces, the oxygen level may be depleted by chemical reactions (such as rusting), biological processes (such as decomposition), displacement by other gases, or absorption by materials. An oxygen level below 19.5% is considered oxygen-deficient and dangerous. Levels below 16% can cause impaired judgement and unconsciousness.",
    section: "Atmospheric Monitoring",
    difficulty: "basic",
    topic: "Atmospheric monitoring",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 170,
    question: "Before entering a confined space, what atmospheric monitoring must be carried out?",
    options: ["Only oxygen levels need to be checked", "Oxygen, flammable gases, and toxic gases must all be tested using a calibrated multi-gas detector", "A visual inspection of the air quality is sufficient", "Monitoring is only needed if the space has been sealed for more than 24 hours"],
    correctAnswer: 1,
    explanation: "Before entry into a confined space, the atmosphere must be tested for oxygen levels (both deficiency and enrichment), flammable gases and vapours (to assess explosion risk), and toxic gases (such as carbon monoxide, hydrogen sulphide, and carbon dioxide) using a calibrated multi-gas detector. Continuous monitoring during work is also required as conditions can change rapidly.",
    section: "Atmospheric Monitoring",
    difficulty: "intermediate",
    topic: "Atmospheric monitoring",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 171,
    question: "What are the three elements of the fire triangle?",
    options: ["Smoke, flame, and ash", "Heat, fuel, and oxygen", "Ignition, combustion, and explosion", "Radiation, convection, and conduction"],
    correctAnswer: 1,
    explanation: "The fire triangle consists of three elements that must all be present for a fire to start and sustain: heat (an ignition source), fuel (a combustible material), and oxygen (the oxidising agent). Removing any one of these elements will extinguish the fire. Fire prevention strategies focus on separating these three elements.",
    section: "Fire Safety Fundamentals",
    difficulty: "basic",
    topic: "Fire triangle",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 172,
    question: "What colour band identifies a CO2 (carbon dioxide) fire extinguisher?",
    options: ["Red", "Cream", "Blue", "Black"],
    correctAnswer: 3,
    explanation: "A CO2 fire extinguisher has a black colour band on a red body. CO2 extinguishers work by displacing oxygen around the fire and are suitable for electrical fires and Class B (flammable liquid) fires. They should not be used in confined spaces due to the risk of asphyxiation, and they are not effective on Class A (solid material) fires.",
    section: "Fire Extinguisher Types",
    difficulty: "basic",
    topic: "Fire extinguisher types and colour codes",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 173,
    question: "What colour band identifies a dry powder fire extinguisher?",
    options: ["Red", "Cream", "Blue", "Black"],
    correctAnswer: 2,
    explanation: "A dry powder fire extinguisher has a blue colour band on a red body. Dry powder extinguishers are versatile and can be used on Class A (solids), Class B (flammable liquids), Class C (flammable gases), and electrical fires. However, they create a cloud that can impair visibility and breathing, so they are not recommended for use in enclosed spaces.",
    section: "Fire Extinguisher Types",
    difficulty: "basic",
    topic: "Fire extinguisher types and colour codes",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 174,
    question: "What colour band identifies a foam fire extinguisher?",
    options: ["Red", "Cream", "Blue", "Black"],
    correctAnswer: 1,
    explanation: "A foam fire extinguisher has a cream colour band on a red body. Foam extinguishers are suitable for Class A (solids) and Class B (flammable liquid) fires. The foam forms a blanket over the burning liquid, sealing the surface and preventing flammable vapours from being released. They must not be used on electrical fires or cooking oil fires.",
    section: "Fire Extinguisher Types",
    difficulty: "basic",
    topic: "Fire extinguisher types and colour codes",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 175,
    question: "What should you do first upon discovering a fire on a construction site?",
    options: ["Attempt to extinguish the fire using the nearest fire extinguisher", "Raise the alarm and ensure all persons in the area are alerted", "Call the fire brigade before doing anything else", "Locate the fire extinguisher colour chart to select the right type"],
    correctAnswer: 1,
    explanation: "The first action upon discovering a fire is to raise the alarm to ensure all persons in the area are alerted and can begin evacuation. The priority is always life safety. Only once the alarm has been raised and you are not putting yourself at risk should you consider tackling the fire, and only if it is small and you have been trained and have the correct extinguisher.",
    section: "Fire Evacuation",
    difficulty: "basic",
    topic: "Fire evacuation",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 176,
    question: "What is the standard voltage used on construction sites through a Centre Tapped to Earth (CTE) transformer system?",
    options: ["12 V", "55 V", "110 V", "230 V"],
    correctAnswer: 2,
    explanation: "110 V supplied through a Centre Tapped to Earth (CTE) transformer is the standard reduced voltage used for portable electrical equipment on UK construction sites. Because the transformer secondary winding has its centre point earthed, the maximum voltage to earth in a fault condition is only 55 V, which significantly reduces the risk of a fatal electric shock.",
    section: "Electrical Safety",
    difficulty: "basic",
    topic: "110V CTE system",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 177,
    question: "Why is 110 V CTE safer than 230 V for portable tools on construction sites?",
    options: ["110 V tools are lighter and easier to handle", "In a fault condition, the maximum voltage to earth is only 55 V, reducing the risk of fatal electric shock", "110 V tools cannot produce sparks", "110 V cables are waterproof"],
    correctAnswer: 1,
    explanation: "The key safety advantage of the 110 V CTE system is that the transformer's centre-tapped earthing arrangement means the maximum voltage between any conductor and earth is only 55 V in a fault condition. This is below the threshold generally considered lethal, significantly reducing the risk of fatal electrocution. On construction sites, wet and harsh conditions increase the risk of electrical contact.",
    section: "Electrical Safety",
    difficulty: "intermediate",
    topic: "110V CTE system",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 178,
    question: "What do the Electricity at Work Regulations 1989 require?",
    options: ["That all electrical work is carried out by a qualified electrician", "That all electrical systems are constructed, maintained, and used to prevent danger, so far as is reasonably practicable", "That all workplaces switch to 110 V supply", "That electrical equipment is replaced every 5 years"],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations 1989 place a duty on employers and employees to ensure that all electrical systems (including equipment, conductors, and installations) are constructed, maintained, and used in a manner that prevents danger, so far as is reasonably practicable. This covers all voltages and all workplaces, not just construction sites.",
    section: "Electrical Regulations",
    difficulty: "intermediate",
    topic: "Electricity at Work Regs 1989",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 179,
    question: "What does PAT testing stand for?",
    options: ["Power Acceptance Testing", "Portable Appliance Testing", "Pre-Assembly Testing", "Periodic Amp Testing"],
    correctAnswer: 1,
    explanation: "PAT stands for Portable Appliance Testing. It involves a visual inspection and, where appropriate, electrical testing of portable electrical equipment to ensure it is safe to use. While there is no legal requirement for 'PAT testing' by name, the Electricity at Work Regulations 1989 require that electrical equipment is maintained to prevent danger, and PAT testing is a widely accepted method of demonstrating compliance.",
    section: "Electrical Safety",
    difficulty: "basic",
    topic: "PAT testing",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 180,
    question: "What colour are the plugs and sockets used for 110 V equipment on construction sites?",
    options: ["Blue", "Yellow", "Red", "White"],
    correctAnswer: 1,
    explanation: "110 V plugs and sockets on UK construction sites are coloured yellow for easy identification. This colour coding follows BS EN 60309 and allows workers to quickly distinguish between different voltage supplies: yellow for 110 V, blue for 230 V single-phase, and red for 400 V three-phase. Using the wrong voltage equipment can damage tools or create safety hazards.",
    section: "Electrical Identification",
    difficulty: "basic",
    topic: "110V CTE system",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 181,
    question: "What British Standard covers the planning and execution of demolition work?",
    options: ["BS 5975", "BS 6187", "BS 7671", "BS 8110"],
    correctAnswer: 1,
    explanation: "BS 6187 (Demolition - Code of Practice) provides guidance on the planning and execution of demolition work. It covers pre-demolition surveys, method statements, structural considerations, asbestos surveys, the selection of demolition methods, and safety precautions. All demolition work must be planned and supervised by a competent person, and a written demolition plan is required.",
    section: "Demolition Planning",
    difficulty: "advanced",
    topic: "Demolition planning",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 182,
    question: "Before demolition work begins, which survey must be completed first?",
    options: ["A topographical survey", "A refurbishment and demolition asbestos survey (R&D survey)", "A measured building survey", "A boundary survey"],
    correctAnswer: 1,
    explanation: "Before any demolition or major refurbishment work, a refurbishment and demolition (R&D) asbestos survey must be carried out. This is more intrusive than a management survey and aims to locate all asbestos-containing materials in the areas affected by the work. All identified asbestos must be removed by appropriate means before demolition begins.",
    section: "Demolition Planning",
    difficulty: "intermediate",
    topic: "Demolition planning",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 183,
    question: "Under RIDDOR 2013, which of the following must be reported to the HSE?",
    options: ["A minor cut that requires only a plaster", "A worker taking 2 days off work due to a workplace injury", "A fracture of any bone (other than fingers, thumbs, or toes) caused by a workplace accident", "A near miss that did not result in any injury"],
    correctAnswer: 2,
    explanation: "Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations) 2013, specified injuries must be reported to the HSE. These include fractures (other than to fingers, thumbs, or toes), amputations, loss of sight, crush injuries, burns requiring hospital treatment, scalping, loss of consciousness, and hypothermia or heat illness requiring hospital treatment.",
    section: "RIDDOR Reporting",
    difficulty: "intermediate",
    topic: "RIDDOR dangerous occurrences",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 184,
    question: "Which of the following is a RIDDOR 'dangerous occurrence' that must be reported?",
    options: ["A worker slipping on a wet floor but not being injured", "The collapse or partial collapse of a scaffold over 5 metres in height", "A delivery lorry arriving late to site", "A worker receiving a verbal warning for not wearing PPE"],
    correctAnswer: 1,
    explanation: "The collapse or partial collapse of a scaffold over 5 metres in height is classified as a dangerous occurrence under RIDDOR 2013 and must be reported to the HSE regardless of whether anyone was injured. Other dangerous occurrences include the collapse of a building, the failure of a load-bearing part of lifting equipment, electrical incidents causing fire or explosion, and the unintentional release of substances.",
    section: "RIDDOR Dangerous Occurrences",
    difficulty: "intermediate",
    topic: "RIDDOR dangerous occurrences",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 185,
    question: "How soon must a fatal or specified injury be reported to the HSE under RIDDOR?",
    options: ["Within 24 hours", "Without delay — by the quickest practicable means (usually telephone)", "Within 5 working days", "Within 10 working days"],
    correctAnswer: 1,
    explanation: "Fatal accidents and specified injuries must be reported to the HSE without delay by the quickest practicable means, which is normally by telephone to the HSE Incident Contact Centre on 0345 300 9923. A written report (F2508) must then follow within 10 days confirming the details. Over-7-day incapacitation injuries must be reported within 15 days.",
    section: "RIDDOR Reporting Timescales",
    difficulty: "intermediate",
    topic: "RIDDOR dangerous occurrences",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 186,
    question: "What is the minimum number of first aiders required on a higher-risk construction site with 60 workers?",
    options: ["At least 1 first aider", "At least 1 first aider for every 50 workers (so at least 2)", "At least 1 first aider for every 25 workers (so at least 3)", "At least 1 first aider for every 10 workers (so at least 6)"],
    correctAnswer: 1,
    explanation: "HSE guidance recommends that higher-risk workplaces such as construction sites should have at least one first aider for every 50 workers. With 60 workers, at least 2 trained first aiders should be present. The actual provision should be determined by a first aid needs assessment considering the nature of the hazards, site size, shift patterns, and distance from emergency services.",
    section: "First Aid Requirements",
    difficulty: "intermediate",
    topic: "First aid requirements",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 187,
    question: "What is the correct procedure if someone receives an electric shock from a live conductor?",
    options: ["Grab them and pull them away from the source immediately", "Isolate the electrical supply if possible, or use a non-conductive object to separate the person from the source, then call emergency services and begin first aid", "Pour water on the person to break the electrical circuit", "Wait for the electricity to trip out automatically before approaching"],
    correctAnswer: 1,
    explanation: "If someone receives an electric shock, you must first ensure your own safety by isolating the supply if possible. If you cannot isolate the supply, use a dry, non-conductive object (such as a wooden broom handle) to push the person away from the source. Never touch them directly while they are still in contact with the live conductor. Call emergency services immediately and begin CPR if they are not breathing.",
    section: "Emergency Procedures",
    difficulty: "intermediate",
    topic: "Emergency procedures",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 188,
    question: "Which regulation governs the safety requirements for work in confined spaces?",
    options: ["The Work at Height Regulations 2005", "The Confined Spaces Regulations 1997", "The Construction (Head Protection) Regulations 1989", "The Personal Protective Equipment at Work Regulations 1992"],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 govern work in confined spaces. They require employers to avoid entry to confined spaces where possible, follow a safe system of work (permit to work) if entry is necessary, and have adequate emergency arrangements in place before work begins. The associated approved code of practice provides detailed guidance on compliance.",
    section: "Confined Spaces Legislation",
    difficulty: "basic",
    topic: "Confined spaces",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 189,
    question: "What type of fire extinguisher should NEVER be used on an electrical fire?",
    options: ["CO2 (carbon dioxide)", "Dry powder", "Water", "All of the above can be used on electrical fires"],
    correctAnswer: 2,
    explanation: "Water fire extinguishers (colour code: all red) must never be used on electrical fires because water is an excellent conductor of electricity. Using a water extinguisher on a live electrical fire could result in the user receiving a fatal electric shock. CO2 and dry powder extinguishers are both safe to use on electrical fires.",
    section: "Fire Extinguisher Safety",
    difficulty: "basic",
    topic: "Fire extinguisher types and colour codes",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 190,
    question: "What is the safe exclusion zone distance from overhead power lines rated up to 33 kV for construction plant?",
    options: ["3 metres", "6 metres", "9 metres", "15 metres"],
    correctAnswer: 1,
    explanation: "For overhead power lines rated up to 33 kV, the minimum safe clearance distance for construction plant is 6 metres from the nearest conductor, as recommended in HSE guidance note GS6. This accounts for cable sag, wind movement, and the reach of plant equipment. For higher voltages (132 kV and above), greater distances apply.",
    section: "Overhead Power Lines",
    difficulty: "intermediate",
    topic: "Overhead power lines",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 191,
    question: "What are the main hazards associated with excavation work?",
    options: ["Noise and vibration only", "Collapse of the sides, contact with underground services, flooding, falling into the excavation, and hazardous atmospheres", "Sunburn and dehydration", "Traffic congestion and public complaints"],
    correctAnswer: 1,
    explanation: "Excavation work carries multiple serious hazards: collapse of the sides burying workers; contact with underground utilities (electricity, gas, water, telecoms); flooding from groundwater or burst mains; people, vehicles, or materials falling into the excavation; and hazardous atmospheres (especially in deeper excavations or near contaminated ground). All these risks must be assessed and controlled.",
    section: "Excavation Hazards",
    difficulty: "basic",
    topic: "Excavation hazards",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 192,
    question: "A confined space is found to have an oxygen level of 17%. What action should be taken?",
    options: ["Entry is safe as the minimum acceptable level is 16%", "Entry is prohibited — the space must be ventilated and retested before entry is considered", "Entry is permitted but workers must take regular breaks outside the space", "Entry is safe provided workers carry an emergency breathing apparatus"],
    correctAnswer: 1,
    explanation: "An oxygen level of 17% is below the safe minimum of 19.5% and is considered oxygen-deficient. Entry must be prohibited at this level as it can cause impaired judgement, coordination problems, and rapid fatigue. The space must be ventilated using forced air ventilation, retested with a calibrated multi-gas monitor, and only entered when oxygen levels are between 19.5% and 23.5%.",
    section: "Atmospheric Hazards",
    difficulty: "intermediate",
    topic: "Atmospheric monitoring",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 193,
    question: "What is the purpose of a permit to work system for confined space entry?",
    options: ["To record who has entered the space for payroll purposes", "To ensure that a formal, documented check has been carried out confirming all safety precautions are in place before entry is authorised", "To allow workers to enter the space without a supervisor present", "To waive the requirement for atmospheric monitoring"],
    correctAnswer: 1,
    explanation: "A permit to work is a formal, documented procedure that ensures all identified hazards have been assessed and all necessary precautions are in place before entry into a confined space is authorised. It specifies the work to be done, the hazards present, the precautions required, emergency arrangements, the duration of the permit, and the names of authorised persons.",
    section: "Permit to Work",
    difficulty: "intermediate",
    topic: "Confined spaces",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 194,
    question: "What is a 'top person' or 'attendant' in confined space entry?",
    options: ["The most senior manager on the construction site", "A trained person stationed outside the confined space to maintain communication, monitor conditions, and initiate rescue if needed", "The first person to enter the confined space to check it is safe", "The person who signs the permit to work"],
    correctAnswer: 1,
    explanation: "A top person (attendant) is a trained individual who remains outside the confined space at all times during the entry. Their role is to maintain continuous communication with those inside, monitor atmospheric conditions, keep a record of who is in the space, control access, and initiate emergency rescue procedures if required. They must never enter the space to attempt a rescue.",
    section: "Confined Space Roles",
    difficulty: "intermediate",
    topic: "Confined spaces",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 195,
    question: "What is the purpose of a fire assembly point on a construction site?",
    options: ["A location where fire extinguishers are stored", "A predetermined safe location where all personnel gather after evacuation so that a roll call can confirm everyone is accounted for", "A point where the fire brigade will set up their command post", "A secure area where flammable materials are stored"],
    correctAnswer: 1,
    explanation: "A fire assembly point is a predetermined safe location, well away from the building and any fire risks, where all site personnel gather after an evacuation. A roll call or headcount is then carried out to confirm that everyone is accounted for. The assembly point must be clearly signed, well known to all workers, and included in the site induction.",
    section: "Fire Evacuation",
    difficulty: "basic",
    topic: "Fire evacuation",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 196,
    question: "Under the Electricity at Work Regulations 1989, what does 'dead working' mean?",
    options: ["Working on electrical equipment that has been isolated, locked off, proved dead, and earthed where necessary", "Working on electrical equipment that is faulty but still connected to the supply", "Working overnight when electrical demand is lowest", "Removing equipment that has reached the end of its service life"],
    correctAnswer: 0,
    explanation: "Dead working means working on electrical equipment or systems that have been made safe by following a safe isolation procedure: switching off, isolating from all sources of supply, locking off with personal padlocks, proving dead at the point of work using an approved voltage indicator, and earthing where necessary. Dead working is always preferred over live working.",
    section: "Safe Isolation",
    difficulty: "advanced",
    topic: "Electricity at Work Regs 1989",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 197,
    question: "Which type of fire extinguisher is specifically designed for use on cooking oil and fat fires (Class F)?",
    options: ["Dry powder", "CO2", "Wet chemical", "Foam"],
    correctAnswer: 2,
    explanation: "A wet chemical fire extinguisher (colour band: yellow/canary) is specifically designed for Class F fires involving cooking oils and fats. It works by creating a soapy film (saponification) on the surface of the burning oil, sealing it from oxygen and cooling it below its auto-ignition temperature. Water, foam, and CO2 extinguishers are dangerous or ineffective on cooking oil fires.",
    section: "Fire Extinguisher Types",
    difficulty: "intermediate",
    topic: "Fire extinguisher types and colour codes",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 198,
    question: "What is 'battering' in the context of excavation support?",
    options: ["Using a mechanical hammer to drive sheet piles into the ground", "Cutting the sides of an excavation back to a safe angle to prevent collapse", "Compacting the bottom of the excavation with a plate compactor", "Breaking up hard ground with a hydraulic breaker before excavation"],
    correctAnswer: 1,
    explanation: "Battering (also called sloping or benching) involves cutting the sides of an excavation back to a safe angle of repose so that the soil is self-supporting and will not collapse inwards. The required angle depends on the soil type — sandy soils require a shallower angle than clay. Battering requires more space than shoring or trench boxes but avoids the need for temporary support structures.",
    section: "Excavation Support Methods",
    difficulty: "intermediate",
    topic: "Supporting excavations",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 199,
    question: "According to HSG47, what method must be used to excavate within 500 mm of a known underground service?",
    options: ["A mini excavator with a toothed bucket", "Hand digging using non-metallic tools (hand tools or vacuum excavation)", "A mechanical excavator with a flat-bladed bucket", "A road saw to cut a trench through the surface"],
    correctAnswer: 1,
    explanation: "HSG47 requires that within 500 mm of a known underground service, excavation must be carried out by hand using hand tools or vacuum excavation techniques. Mechanical excavators must not be used this close to services as the force of the bucket could easily damage a cable or pipe, potentially causing an explosion, fire, electrocution, or flooding.",
    section: "Safe Excavation Near Services",
    difficulty: "advanced",
    topic: "Underground services",
    category: "Specialist Knowledge & Site Safety"
  },
  {
    id: 200,
    question: "What information must be displayed on the site fire safety notice board?",
    options: ["Only the name and telephone number of the fire brigade", "The fire evacuation procedure, assembly point location, fire warden names, emergency contact numbers, and the location of firefighting equipment", "Only the date of the last fire drill", "The site manager's home telephone number and a map of the nearest fire station"],
    correctAnswer: 1,
    explanation: "The fire safety notice board must display comprehensive emergency information including: the fire evacuation procedure and escape routes, the location of the fire assembly point, the names of fire wardens and first aiders, emergency contact numbers (fire brigade, ambulance, site manager), the location of firefighting equipment and first aid kits, and any site-specific fire risks or procedures. This information must be communicated during site induction.",
    section: "Fire Safety Information",
    difficulty: "intermediate",
    topic: "Fire evacuation",
    category: "Specialist Knowledge & Site Safety"
  }];
