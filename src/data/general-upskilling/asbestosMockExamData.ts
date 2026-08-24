/**
 * Asbestos Awareness Mock Exam Question Bank
 *
 * 200 questions covering all 5 modules with difficulty distribution
 * and category classification for balanced exam generation.
 *
 * Categories (5):
 *   Asbestos Types & Properties (40) | Legislation & Duty to Manage (40) |
 *   Identification & Surveys (40) | Safe Working & PPE (40) | Emergency Procedures (40)
 *
 * Difficulty per category: ~14 basic, ~18 intermediate, ~8 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const asbestosCategories = [
  'Asbestos Types & Properties',
  'Legislation & Duty to Manage',
  'Identification & Surveys',
  'Safe Working & PPE',
  'Emergency Procedures',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const asbestosMockExamConfig: MockExamConfig = {
  examId: 'asbestos-awareness',
  examTitle: 'Asbestos Awareness Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/asbestos-awareness-module-6',
  categories: asbestosCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomAsbestosExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(asbestosQuestionBank, numQuestions, asbestosCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const asbestosQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // ASBESTOS TYPES & PROPERTIES — 40 questions (id 1–40)
  // =======================================================================
  {
    id: 1,
    question: "What is the literal meaning of the word 'asbestos' derived from ancient Greek?",
    options: ['White mineral', 'Indestructible', 'Fireproof', 'Strong fibre'],
    correctAnswer: 1,
    explanation:
      "The word 'asbestos' comes from the ancient Greek 'asbestos' meaning 'indestructible' or 'unquenchable', reflecting the material's remarkable durability and resistance to fire.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'History of asbestos use',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 2,
    question: 'Which of the following is the most commonly used type of asbestos worldwide?',
    options: [
      'Amosite (brown asbestos)',
      'Crocidolite (blue asbestos)',
      'Chrysotile (white asbestos)',
      'Tremolite',
    ],
    correctAnswer: 2,
    explanation:
      'Chrysotile (white asbestos) accounts for approximately 90-95% of all asbestos used worldwide. It was the most widely used type due to its flexibility and resistance to heat.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Chrysotile (white asbestos)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 3,
    question:
      'Asbestos is a naturally occurring mineral. Which broad category of minerals does it belong to?',
    options: ['Calcium carbonates', 'Aluminium phosphates', 'Iron oxides', 'Silicate minerals'],
    correctAnswer: 3,
    explanation:
      'Asbestos is the name given to a group of naturally occurring silicate minerals that form as bundles of fibres. All six recognised types of asbestos are silicate minerals.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Properties of asbestos',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 4,
    question: 'Into which two mineral groups are the six types of asbestos divided?',
    options: [
      'Serpentine and amphibole groups',
      'Silicate and carbonate groups',
      'Calcium and magnesium groups',
      'Organic and inorganic groups',
    ],
    correctAnswer: 0,
    explanation:
      'The six types of asbestos are divided into two mineral groups: the serpentine group (which contains only chrysotile) and the amphibole group (which contains amosite, crocidolite, tremolite, anthophyllite, and actinolite).',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Serpentine vs amphibole',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 5,
    question: 'Which type of asbestos belongs to the serpentine mineral group?',
    options: ['Amosite', 'Chrysotile', 'Crocidolite', 'Tremolite'],
    correctAnswer: 1,
    explanation:
      'Chrysotile (white asbestos) is the only type of asbestos that belongs to the serpentine mineral group. Its fibres are curly and layered, unlike the straight, needle-like fibres of the amphibole group.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Serpentine vs amphibole',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 6,
    question: 'What shape are chrysotile (white asbestos) fibres when viewed under a microscope?',
    options: [
      'Spherical and granular',
      'Straight and needle-like',
      'Curly and serpentine',
      'Flat and plate-like',
    ],
    correctAnswer: 2,
    explanation:
      'Chrysotile fibres are curly and serpentine (wavy) in shape, which is why chrysotile belongs to the serpentine mineral group. This contrasts with the straight, needle-like fibres of amphibole asbestos types.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Chrysotile (white asbestos)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 7,
    question: 'What is the colour typically associated with amosite asbestos?',
    options: ['White', 'Blue', 'Green', 'Brown'],
    correctAnswer: 3,
    explanation:
      'Amosite is commonly known as brown asbestos due to its brownish colour. However, it is important to note that asbestos cannot be reliably identified by colour alone — laboratory analysis is required for positive identification.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Amosite (brown asbestos)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 8,
    question: "What does the name 'amosite' stand for?",
    options: [
      'Asbestos Mines of South Africa',
      'American Organisation of Silicate Engineers',
      'Associated Minerals of Southern England',
      'Amalgamated Mining Operations of South Asia',
    ],
    correctAnswer: 0,
    explanation:
      "Amosite is an acronym derived from 'Asbestos Mines of South Africa', where this type of asbestos was predominantly mined. Its mineralogical name is grunerite.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Amosite (brown asbestos)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 9,
    question:
      'Which type of asbestos is often considered the most hazardous due to its very fine, straight fibres?',
    options: [
      'Amosite (brown asbestos)',
      'Crocidolite (blue asbestos)',
      'Anthophyllite',
      'Chrysotile (white asbestos)',
    ],
    correctAnswer: 1,
    explanation:
      'Crocidolite (blue asbestos) is often considered the most hazardous type of asbestos. Its very fine, straight, needle-like fibres can penetrate deep into the lungs and are particularly difficult for the body to break down or expel.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Crocidolite (blue asbestos)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 10,
    question: 'Which of the following is NOT one of the six recognised types of asbestos?',
    options: ['Tremolite', 'Anthophyllite', 'Vermiculite', 'Actinolite'],
    correctAnswer: 2,
    explanation:
      'Vermiculite is not a type of asbestos — it is a separate mineral that can sometimes be contaminated with asbestos (particularly tremolite). The six recognised types of asbestos are chrysotile, amosite, crocidolite, tremolite, anthophyllite, and actinolite.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Contaminant minerals',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 11,
    question: 'When was the use of all asbestos finally banned in the United Kingdom?',
    options: ['1985', '2006', '1992', '1999'],
    correctAnswer: 3,
    explanation:
      'The use of all types of asbestos was banned in the UK in 1999 under the Asbestos (Prohibitions) (Amendment) Regulations 1999. Blue and brown asbestos were banned earlier in 1985, but white asbestos (chrysotile) was not banned until 1999.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'History of asbestos use',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 12,
    question:
      'In which year were crocidolite (blue) and amosite (brown) asbestos banned from import and use in the UK?',
    options: ['1985', '1970', '1992', '1999'],
    correctAnswer: 0,
    explanation:
      'The import and use of crocidolite (blue) and amosite (brown) asbestos were banned in the UK in 1985 under the Asbestos (Prohibitions) Regulations 1985. Chrysotile (white) was not banned until 1999.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'History of asbestos use',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 13,
    question: 'During which period was asbestos most heavily used in UK construction?',
    options: ['1920s to 1940s', '1950s to 1980s', '1985 to 1999', '2000 to present'],
    correctAnswer: 1,
    explanation:
      'Asbestos was most heavily used in UK construction from the 1950s to the 1980s, with peak use during the 1960s and 1970s. Any building constructed or refurbished before the year 2000 may contain asbestos-containing materials.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'History of asbestos use',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 14,
    question:
      'Which property of asbestos made it particularly attractive for use in fireproofing and insulation?',
    options: [
      'Its bright colour range',
      'Its ability to conduct electricity',
      'Its excellent thermal resistance',
      'Its high cost compared to alternatives',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos has excellent thermal resistance and can withstand temperatures up to approximately 1,000°C depending on the type. This property made it highly attractive for fireproofing, insulation, and heat-resistant applications in construction and industry.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Properties of asbestos',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 15,
    question:
      'Which of the following is NOT a key property that made asbestos commercially valuable?',
    options: [
      'Resistance to fire and high temperatures',
      'High tensile strength',
      'Resistance to chemical attack',
      'Excellent electrical conductivity',
    ],
    correctAnswer: 3,
    explanation:
      'Asbestos is actually an excellent electrical insulator, not a conductor. Its commercially valuable properties included fire resistance, high tensile strength, chemical resistance, low thermal conductivity, and the ability to be woven into fabrics.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Properties of asbestos',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 16,
    question:
      'In which of the following locations would you be LEAST likely to find asbestos in a building constructed in the 1970s?',
    options: [
      'Modern PVC window frames installed in 2020',
      'Pipe and boiler thermal insulation lagging',
      'Corrugated cement roofing sheets',
      'Textured decorative ceiling coatings',
    ],
    correctAnswer: 0,
    explanation:
      'Modern PVC window frames installed in 2020 would not contain asbestos, as all asbestos use was banned in the UK in 1999. Pipe lagging, cement roofing sheets, and textured ceiling coatings from the 1970s are all common locations for asbestos-containing materials.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Where asbestos is found in buildings',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 17,
    question:
      'Approximately how many deaths per year in the UK are attributed to asbestos-related diseases?',
    options: ['Around 10,000', 'Around 5,000', 'Around 500', 'Around 2,000'],
    correctAnswer: 1,
    explanation:
      'According to HSE statistics, approximately 5,000 people die each year in the UK from asbestos-related diseases. This makes asbestos the single greatest cause of work-related deaths in the UK.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'UK statistics',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 18,
    question: 'What is mesothelioma?',
    options: [
      'A reversible inflammation of the airways caused by short-term dust exposure',
      'A benign thickening of the skin on the hands of manual workers',
      'A cancer of the lining of the lungs or abdomen almost exclusively caused by asbestos exposure',
      'A bacterial lung infection treatable with a course of antibiotics',
    ],
    correctAnswer: 2,
    explanation:
      'Mesothelioma is a cancer of the mesothelium — the thin lining that covers the lungs (pleura) and the abdomen (peritoneum). It is almost exclusively caused by asbestos exposure and is almost always fatal, typically within 12-36 months of diagnosis.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Health effects (mesothelioma)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 19,
    question:
      'What is the typical latency period between first exposure to asbestos and the development of mesothelioma?',
    options: ['1-5 years', '5-10 years', 'Over 80 years', '15-60 years'],
    correctAnswer: 3,
    explanation:
      'The typical latency period for mesothelioma is between 15 and 60 years, with an average of around 30-40 years. This long latency means that people exposed decades ago are still being diagnosed with the disease today.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Latency periods',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 20,
    question: 'What is asbestosis?',
    options: [
      'A serious scarring and fibrosis of the lung tissue caused by heavy asbestos exposure',
      'A skin irritation caused by direct contact with raw asbestos fibres',
      'A temporary loss of voice caused by inhaling fine mineral dust',
      'An allergic reaction to the wetting agents used in asbestos removal',
    ],
    correctAnswer: 0,
    explanation:
      'Asbestosis is a serious chronic condition involving scarring (fibrosis) of the lung tissue caused by heavy exposure to asbestos fibres over a prolonged period. It reduces lung capacity and can be severely debilitating, and there is no cure.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Health effects (asbestosis)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 21,
    question:
      'Which of the following statements about asbestos exposure is correct according to HSE guidance?',
    options: [
      'Brief, low-level exposure to asbestos is completely safe',
      'There is no known safe level of exposure to asbestos',
      'Only blue asbestos is dangerous to health',
      'Asbestos is only dangerous if you can see the fibres',
    ],
    correctAnswer: 1,
    explanation:
      'According to HSE guidance, there is no known safe level of exposure to asbestos. All types of asbestos are dangerous, and even low-level or short-duration exposures can potentially lead to asbestos-related diseases, although the risk increases with higher and longer exposures.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'No safe exposure level',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 22,
    question: 'How do asbestos fibres typically enter the body and cause disease?',
    options: [
      'Through absorption via the skin',
      'Through ingestion of contaminated food only',
      'Through inhalation of airborne fibres into the lungs',
      'Through contact with the eyes',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos fibres primarily cause disease through inhalation. When asbestos-containing materials are disturbed, microscopic fibres become airborne and can be inhaled deep into the lungs where they become lodged in the lung tissue, causing inflammation, scarring, and potentially cancer.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Fibre inhalation mechanism',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 23,
    question: 'Why are asbestos fibres particularly dangerous once inhaled?',
    options: [
      'They dissolve rapidly in the bloodstream and are carried to other organs, where they cause damage',
      'They expand when they absorb moisture and physically block the smaller airways',
      'They react chemically with lung tissue to produce a toxic gas that scars the lung',
      'They are too small and durable for the body to break down or expel, causing ongoing irritation',
    ],
    correctAnswer: 3,
    explanation:
      'Asbestos fibres are extremely thin and durable. Once inhaled, they become lodged deep in the lung tissue where the body cannot effectively break them down or remove them. This causes ongoing irritation and inflammation over many years, leading to scarring, genetic damage, and potentially cancer.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Fibre inhalation mechanism',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 24,
    question:
      'Which asbestos-related condition involves thickening or calcification of the pleura (lung lining)?',
    options: [
      'Pleural disease (plaques and thickening)',
      'Asbestosis (diffuse lung fibrosis)',
      'Bronchial asthma',
      'Chronic obstructive pulmonary disease (COPD)',
    ],
    correctAnswer: 0,
    explanation:
      'Pleural disease, including pleural plaques and diffuse pleural thickening, involves changes to the pleura (the membrane lining the lungs and chest cavity). Pleural plaques are localised areas of thickening or calcification and are the most common sign of past asbestos exposure, though they do not usually cause symptoms themselves.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Health effects (pleural disease)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 25,
    question:
      'A building was constructed in 1965. Which statement is most accurate regarding asbestos?',
    options: [
      'It can be assumed asbestos-free because it predates the peak years of asbestos use',
      'It should be presumed to contain asbestos-containing materials until a survey proves otherwise',
      'It only needs checking if the original construction records have been lost',
      'It is exempt from the duty to manage because of its age',
    ],
    correctAnswer: 1,
    explanation:
      'Any building constructed or refurbished before the year 2000 should be presumed to contain asbestos-containing materials (ACMs) until a proper asbestos survey has been carried out. A 1965 building falls within the peak period of asbestos use and is highly likely to contain ACMs.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Where asbestos is found in buildings',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 26,
    question:
      'Which of the following domestic locations is a common place to find asbestos-containing materials?',
    options: [
      'Solid hardwood internal doors fitted in the 1970s and 1980s',
      'uPVC double-glazed window units installed during the 1990s',
      'Textured decorative coatings (such as Artex) applied before 2000',
      'Laminated chipboard kitchen worktops fitted before 2000',
    ],
    correctAnswer: 2,
    explanation:
      'Textured decorative coatings such as Artex applied before 2000 commonly contained chrysotile (white) asbestos. This is one of the most frequent locations for asbestos in domestic properties. Modern products manufactured after the 1999 ban do not contain asbestos.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Domestic properties',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 27,
    question:
      'What type of asbestos was commonly used in thermal insulation lagging for pipes and boilers?',
    options: ['Chrysotile only', 'Tremolite only', 'Crocidolite only', 'Amosite and chrysotile'],
    correctAnswer: 3,
    explanation:
      'Thermal insulation lagging for pipes and boilers commonly contained amosite (brown) asbestos and chrysotile (white) asbestos, often mixed together. This type of lagging is considered high risk because it is friable and easily releases fibres when disturbed.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Common locations',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 28,
    question: 'Asbestos cement products typically contain what percentage of asbestos?',
    options: ['10-15%', '1-5%', '50-60%', '90-100%'],
    correctAnswer: 0,
    explanation:
      'Asbestos cement products typically contain between 10-15% asbestos fibre mixed with cement. While the fibres are bound within the cement matrix and are less likely to be released than in friable materials, they can release fibres if cut, drilled, broken, or allowed to deteriorate.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Properties of asbestos',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 29,
    question: 'Can asbestos type be reliably identified by its colour alone?',
    options: [
      'Yes — white, brown and blue asbestos are always clearly distinguishable to the naked eye',
      'No — asbestos type cannot be reliably identified by colour and requires laboratory analysis',
      'Yes, but only by a trained surveyor carrying out a close visual inspection in good light',
      'No — but a simple on-site chemical spot test can confirm the type before work begins',
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos type cannot be reliably identified by colour alone. The colours 'white', 'brown', and 'blue' are general descriptors, but in practice asbestos fibres can appear different colours depending on contamination, ageing, and the materials they are mixed with. Positive identification requires laboratory analysis, typically polarised light microscopy (PLM).",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Properties of asbestos',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 30,
    question:
      'Which of the following asbestos types has straight, rigid, needle-like fibres characteristic of the amphibole group?',
    options: ['Chrysotile', 'Chrysotile and amosite', 'Amosite', 'Neither of these'],
    correctAnswer: 2,
    explanation:
      'Amosite belongs to the amphibole group and has straight, rigid, needle-like fibres. Chrysotile belongs to the serpentine group and has curly, flexible fibres. All amphibole asbestos types (amosite, crocidolite, tremolite, anthophyllite, actinolite) share the characteristic straight fibre structure.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Serpentine vs amphibole',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 31,
    question: 'Tremolite asbestos is most commonly encountered in the UK as what?',
    options: [
      'A primary commercial product widely sold for use in pipe lagging',
      'A modern synthetic replacement for chrysotile in brake linings',
      'The main binder used in asbestos cement roof sheeting',
      'A contaminant found in other minerals such as vermiculite and talc',
    ],
    correctAnswer: 3,
    explanation:
      'Tremolite was not widely used commercially but is commonly found as a contaminant in other minerals including vermiculite, talc, and sometimes chrysotile. Its presence as a contaminant means it can appear in unexpected materials and locations.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Contaminant minerals',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 32,
    question:
      'Exposure to asbestos can increase the risk of developing lung cancer. Which factor significantly multiplies this risk further?',
    options: [
      'Smoking tobacco',
      'Drinking alcohol',
      'Working outdoors',
      'A history of childhood asthma',
    ],
    correctAnswer: 0,
    explanation:
      'Smoking tobacco combined with asbestos exposure has a synergistic (multiplicative) effect on lung cancer risk. A person who both smokes and has been exposed to asbestos may have a risk of lung cancer up to 50-90 times greater than a person with neither exposure, according to HSE guidance.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Health effects (lung cancer)',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 33,
    question:
      'In a typical domestic property built in the 1970s, which of the following would be a common location for asbestos-containing materials?',
    options: [
      'Solid wood internal doors',
      'Garage roof sheets and soffits',
      'Copper water pipes',
      'Glazed ceramic bathroom tiles',
    ],
    correctAnswer: 1,
    explanation:
      'Asbestos cement was widely used for garage and shed roofing sheets, soffits, and fascia boards in domestic properties built from the 1950s to the 1990s. Solid wood, copper, and standard ceramic tiles do not contain asbestos.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Domestic properties',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 34,
    question: 'What was asbestos insulating board (AIB) commonly used for in buildings?',
    options: [
      'Damp-proof courses in external brickwork',
      'Load-bearing structural foundations',
      'Ceiling tiles, partition walls, and fire protection panels',
      'Glazing putty around window panes',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos insulating board (AIB) was commonly used for ceiling tiles, partition walls, fire protection panels, door panels, and column casings. AIB typically contained 15-40% asbestos and is considered a higher-risk material because it can release fibres more readily than asbestos cement.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Common locations',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 35,
    question:
      'Which of the following correctly lists the three types of asbestos most commonly found in UK buildings?',
    options: [
      'Tremolite, anthophyllite, and actinolite',
      'Amosite, actinolite, and tremolite',
      'Chrysotile, tremolite, and anthophyllite',
      'Chrysotile, amosite, and crocidolite',
    ],
    correctAnswer: 3,
    explanation:
      'The three types of asbestos most commonly found in UK buildings are chrysotile (white), amosite (brown), and crocidolite (blue). Tremolite, anthophyllite, and actinolite were not widely used commercially but may be present as contaminants.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Where asbestos is found in buildings',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 36,
    question:
      'Approximately how many commercial, public, and industrial buildings in the UK are estimated to contain asbestos?',
    options: [
      'Approximately half a million or more',
      'Approximately five thousand',
      'Approximately fifty thousand',
      'Fewer than one thousand',
    ],
    correctAnswer: 0,
    explanation:
      'It is estimated that there are approximately 500,000 or more non-domestic buildings in the UK that still contain asbestos, in addition to a very large number of domestic properties. This is why awareness training is essential for anyone who may disturb these materials.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'UK statistics',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 37,
    question:
      'Sprayed asbestos coatings (limpet spray) are considered especially dangerous because they are:',
    options: [
      'Tightly bound within a cement matrix that rarely releases fibres',
      'Highly friable and can release large quantities of fibres when disturbed',
      'Only ever found in inaccessible underground locations',
      'Manufactured exclusively from the least hazardous white asbestos',
    ],
    correctAnswer: 1,
    explanation:
      'Sprayed asbestos coatings (often called limpet spray) are considered one of the most dangerous forms of asbestos-containing material because they are highly friable — meaning they crumble easily and can release large quantities of airborne fibres when disturbed or even when they deteriorate naturally.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Common locations',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 38,
    question:
      'What is the approximate diameter of a single asbestos fibre compared to a human hair?',
    options: [
      'About the same thickness as a human hair',
      'About half the thickness of a human hair',
      'Approximately 700 times thinner than a human hair',
      'Approximately 10 times thinner than a human hair',
    ],
    correctAnswer: 2,
    explanation:
      'A single asbestos fibre can be approximately 700 times thinner than a human hair, at around 0.1 microns in diameter. This is far too small to be seen with the naked eye, which is why people can inhale asbestos fibres without being aware of it.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Fibre inhalation mechanism',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 39,
    question:
      'Which of the following tradespeople is statistically at highest risk of asbestos exposure when working in older buildings?',
    options: [
      'Painters and decorators working only on external surfaces',
      'Office cleaners and reception staff in modern buildings',
      'Landscape gardeners and groundskeeping staff',
      'Plumbers, electricians, and heating engineers who disturb building fabric',
    ],
    correctAnswer: 3,
    explanation:
      'Tradespeople such as plumbers, electricians, and heating engineers are statistically at highest risk because their work frequently involves drilling, cutting, and disturbing building fabric (walls, floors, ceilings, ducts) in older buildings where asbestos-containing materials may be present.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'UK statistics',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 40,
    question:
      'Which statement best describes the relationship between asbestos exposure dose and disease risk?',
    options: [
      'Risk increases with cumulative exposure — higher doses and longer durations increase the likelihood of disease',
      'There is a clearly defined safe dose of asbestos, below which no asbestos-related disease can develop',
      'Risk depends only on a single exposure event, regardless of how long that exposure lasted',
      'Once a person has been exposed at all, the level of disease risk is the same for everyone',
    ],
    correctAnswer: 0,
    explanation:
      'The risk of developing asbestos-related disease increases with cumulative exposure — meaning both the concentration of fibres inhaled and the duration of exposure matter. Higher doses over longer periods carry greater risk, though there is no known safe threshold, and even brief exposures can potentially cause disease.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'No safe exposure level',
    category: 'Asbestos Types & Properties',
  },
  // =======================================================================
  // LEGISLATION & DUTY TO MANAGE — 40 questions (id 41–80)
  // =======================================================================
  {
    id: 41,
    question: 'What is the full title of the primary UK regulation governing work with asbestos?',
    options: [
      'The Asbestos Safety Act 2012',
      'The Control of Asbestos Regulations 2012',
      'The Management of Asbestos at Work Regulations 2012',
      'The Control of Hazardous Substances Regulations 2012',
    ],
    correctAnswer: 1,
    explanation:
      'The Control of Asbestos Regulations 2012 (CAR 2012) is the primary UK legislation governing the management of and work with asbestos-containing materials. It consolidated and updated earlier asbestos regulations.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'CAR 2012 overview',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 42,
    question:
      'Which regulation within CAR 2012 places a duty to manage asbestos in non-domestic premises?',
    options: ['Regulation 10', 'Regulation 11', 'Regulation 4', 'Regulation 6'],
    correctAnswer: 2,
    explanation:
      'Regulation 4 of CAR 2012 places a specific duty on those who have responsibility for the maintenance or repair of non-domestic premises to manage any asbestos-containing materials found there.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Regulation 4 duties',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 43,
    question: "Who does Regulation 4 of CAR 2012 identify as the 'dutyholder'?",
    options: [
      'The HSE inspector assigned to the local enforcement area, or the environmental health officer where the local authority enforces',
      'The licensed asbestos removal contractor appointed for the site, or the analyst who carries out the clearance testing afterwards',
      'The most senior employee physically present in the building, or the appointed first aider where no manager is on site that day',
      'The person or organisation responsible for the maintenance or repair of non-domestic premises, or who has control of those premises',
    ],
    correctAnswer: 3,
    explanation:
      'Under Regulation 4, the dutyholder is the person who has, by virtue of a contract or tenancy, an obligation for the maintenance or repair of non-domestic premises, or who has control of the whole or part of those premises. This can include building owners, tenants, or managing agents.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Dutyholder identification',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 44,
    question: 'What is the workplace exposure limit (WEL) for asbestos as specified in CAR 2012?',
    options: [
      '0.1 fibres per cubic centimetre of air',
      '0.01 fibres per cubic centimetre of air',
      '0.5 fibres per cubic centimetre of air',
      '1.0 fibres per cubic centimetre of air',
    ],
    correctAnswer: 0,
    explanation:
      'The control limit for asbestos under CAR 2012 (Regulation 2) is 0.1 fibres per cubic centimetre of air (0.1 f/cm³), averaged over a continuous 4-hour period. This single control limit applies to all types of asbestos.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Control limit',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 45,
    question: 'Over what time period is the asbestos control limit of 0.1 f/cm³ averaged?',
    options: [
      'A continuous 1-hour period',
      'A continuous 4-hour period',
      'A continuous 8-hour period',
      'A continuous 15-minute period',
    ],
    correctAnswer: 1,
    explanation:
      'The asbestos control limit of 0.1 fibres per cubic centimetre of air is measured as a 4-hour time-weighted average (TWA). There is also a short-term exposure limit of 0.6 f/cm³ averaged over 10 minutes.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Control limit',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 46,
    question: 'What are the three categories of asbestos work defined under CAR 2012?',
    options: [
      'Removal, encapsulation, and management in situ',
      'High-risk, medium-risk, and negligible-risk',
      'Licensed, notifiable non-licensed (NNLW), and non-licensed',
      'Commercial, industrial, and domestic premises',
    ],
    correctAnswer: 2,
    explanation:
      'CAR 2012 defines three categories of work with asbestos: licensed work (requiring an HSE licence), notifiable non-licensed work (NNLW — must be notified to HSE), and non-licensed work. The category depends on the type of asbestos, its condition, and the nature of the work.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Three work categories',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 47,
    question: 'Which of the following types of asbestos work always requires an HSE licence?',
    options: [
      'Removal of asbestos cement sheets in good condition',
      'Encapsulating a small area of asbestos textured coating',
      'Sampling suspect materials for laboratory analysis',
      'Removal of sprayed asbestos coatings (limpet)',
    ],
    correctAnswer: 3,
    explanation:
      'Removal of sprayed asbestos coatings (limpet asbestos) is always licensed work under CAR 2012. Sprayed coatings are high-risk materials and their removal can only be carried out by an HSE-licensed contractor.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Three work categories',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 48,
    question:
      'What must a dutyholder produce as part of their duty to manage asbestos under Regulation 4?',
    options: [
      'A written plan (management plan) that sets out how the risk from asbestos is to be managed',
      'A signed waiver releasing the dutyholder from liability for asbestos',
      'A planning application submitted to the local authority before any work',
      'A certificate confirming the building is entirely free of asbestos',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4 requires the dutyholder to prepare a written management plan that sets out how the risks from asbestos-containing materials are to be managed. This plan must be kept up to date and reviewed regularly.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Management plan',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 49,
    question: 'What is an asbestos register?',
    options: [
      'A log recording the name, employer and arrival time of every worker who enters the building each day',
      'A document recording the location, type, condition, and extent of asbestos-containing materials (or presumed ACMs) in a building',
      'A record of all the maintenance and cleaning contracts held by the building owner, and the dates they fall due for renewal',
      'A list of the HSE-licensed asbestos removal contractors approved to work in the local authority area',
    ],
    correctAnswer: 1,
    explanation:
      'An asbestos register is a document maintained by the dutyholder that records the location, type, condition, and extent of known or presumed asbestos-containing materials (ACMs) in a building. It forms a key part of the management plan.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Asbestos register',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 50,
    question: 'Which HSE guidance document provides detailed advice on asbestos surveys?',
    options: [
      "HSG248 — Asbestos: The Analysts' Guide",
      'L143 — Managing and Working with Asbestos',
      'HSG264 — Asbestos: The Survey Guide',
      'INDG223 — A Short Guide to Managing Asbestos',
    ],
    correctAnswer: 2,
    explanation:
      "HSG264 'Asbestos: The Survey Guide' is the HSE's guidance document specifically covering the survey and assessment of asbestos in buildings. It describes survey types, methodology, and reporting requirements.",
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'HSG264',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 51,
    question: 'What are the two types of asbestos survey described in HSG264?',
    options: [
      'Visual survey and intrusive survey',
      'Preliminary survey and final clearance survey',
      'Domestic survey and commercial survey',
      'Management survey and refurbishment/demolition (R&D) survey',
    ],
    correctAnswer: 3,
    explanation:
      'HSG264 describes two types of survey: the management survey (the standard survey used to manage ACMs during normal occupation) and the refurbishment and demolition (R&D) survey (a more intrusive survey needed before refurbishment or demolition work).',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Management surveys vs R&D surveys',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 52,
    question: 'When is a refurbishment and demolition (R&D) survey required?',
    options: [
      'Before any refurbishment or demolition work is carried out in premises, or parts of premises',
      'Only after asbestos has already been accidentally disturbed during site work',
      'At the routine annual review of the asbestos management plan and register',
      'Whenever a building changes ownership, regardless of whether any work is planned',
    ],
    correctAnswer: 0,
    explanation:
      'An R&D survey is required before any refurbishment or demolition work takes place in a building. It is more intrusive than a management survey and aims to locate all ACMs in the area where work will be carried out, so they can be removed beforehand if necessary.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Management surveys vs R&D surveys',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 53,
    question: 'What is the purpose of a management survey?',
    options: [
      'To locate every ACM in the building by fully intrusive opening up of the structure, including sealed voids, ducts and roof spaces',
      'To locate ACMs that could be disturbed or damaged during normal occupancy, including foreseeable maintenance, and to assess their condition',
      'To measure airborne fibre concentrations throughout the building before it can be reoccupied after removal work',
      'To confirm that every ACM has been completely removed from the premises and to issue a clearance certificate',
    ],
    correctAnswer: 1,
    explanation:
      'A management survey is the standard survey for managing ACMs during the normal occupation and use of a building. Its purpose is to locate ACMs that could be damaged or disturbed during normal occupancy and routine maintenance, and to assess their condition.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Management surveys vs R&D surveys',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 54,
    question: 'What accreditation must asbestos survey organisations hold in the UK?',
    options: [
      'ISO 9001 certification',
      'BREEAM certification',
      'UKAS accreditation to ISO 17020',
      'CHAS accreditation',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos survey organisations should hold UKAS (United Kingdom Accreditation Service) accreditation to ISO 17020 (Inspection Bodies). This ensures that surveyors meet recognised standards of competence and quality.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Surveyor qualifications (UKAS)',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 55,
    question: 'What does UKAS stand for?',
    options: [
      'United Kingdom Asbestos Service',
      'Universal Knowledge and Assessment Scheme',
      'UK Asbestos Surveying',
      'United Kingdom Accreditation Service',
    ],
    correctAnswer: 3,
    explanation:
      'UKAS stands for the United Kingdom Accreditation Service. It is the sole national accreditation body recognised by the UK government to assess organisations against internationally agreed standards.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Surveyor qualifications (UKAS)',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 56,
    question:
      'Regulation 5 of CAR 2012 requires employers to carry out what before work with asbestos begins?',
    options: [
      'An identification of the type of asbestos involved',
      'A clearance air test of the surrounding area',
      'A medical examination of every worker on site',
      'A consignment note for the resulting waste',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 5 of CAR 2012 requires that asbestos-containing materials must be identified (the type of asbestos and its condition) before any work that is liable to disturb asbestos is carried out. This means no work should proceed without first determining whether asbestos is present.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Key regulations (Reg 5)',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 57,
    question:
      'What does Regulation 6 of CAR 2012 require before work with asbestos is carried out?',
    options: [
      'That all workers undergo a face-fit test on the day of the work',
      'That a suitable and sufficient assessment of the risk is carried out',
      'That the building is fully evacuated for the duration of the work',
      'That a copy of the asbestos licence is displayed at the entrance',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 6 requires employers to carry out a suitable and sufficient risk assessment before any work with asbestos is undertaken. The assessment must identify the likely exposure, the steps to prevent or reduce exposure, and the type of asbestos involved.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Key regulations (Reg 6)',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 58,
    question:
      'What does Regulation 10 of CAR 2012 require regarding information, instruction, and training?',
    options: [
      'Training need only be given to the supervisors and managers who plan the work, not to the operatives carrying it out on site',
      'Training is required once at induction and, once it has been given, never needs to be repeated during that employment',
      'Employers must give adequate information, instruction and training to employees who are or may be exposed to asbestos, and to their supervisors',
      'Training is the responsibility of the individual worker, who must arrange and pay for their own refresher courses',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 10 requires employers to ensure that adequate information, instruction, and training is provided to any employee who is liable to be exposed to asbestos, or who supervises such employees. Training must be given at regular intervals and kept up to date.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Key regulations (Reg 10)',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 59,
    question:
      'Under Regulation 11 of CAR 2012, what must an employer ensure when work with asbestos is being carried out?',
    options: [
      'That exposure is permitted up to twice the control limit provided suitable RPE is worn throughout the task',
      'That exposure is acceptable provided each period of work lasts less than four hours in any seven days',
      'That exposure may be disregarded where the workers involved have signed a written consent form beforehand',
      'That exposure is prevented or, where this is not reasonably practicable, reduced to the lowest level reasonably practicable',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 11 requires employers to prevent exposure to asbestos so far as is reasonably practicable. Where prevention is not reasonably practicable, exposure must be reduced to the lowest level that is reasonably practicable, and in any case below the control limit.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Key regulations (Reg 11)',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 60,
    question:
      'In the material assessment scoring system used for asbestos surveys, which four factors are typically considered?',
    options: [
      'Product type, extent of damage/deterioration, surface treatment, and asbestos type',
      'Building age, occupancy level, ventilation, and maintenance frequency',
      'Fibre colour, manufacturer, installation date, and replacement cost',
      'Number of occupants, foot traffic, room size, and lighting level',
    ],
    correctAnswer: 0,
    explanation:
      'The material assessment algorithm typically scores four variables: product type (or sample/material type), extent of damage or deterioration, surface treatment (e.g. sealed, painted, or exposed), and asbestos type. Each is scored numerically and the total gives the material assessment score.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Material assessment scoring',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 61,
    question: 'What is the purpose of a priority assessment in asbestos management?',
    options: [
      'To calculate the cost of removing each asbestos-containing material and to prioritise the removal budget for the year',
      'To assess how likely ACMs are to release fibres, given their location, the use made of the area and the likelihood of disturbance',
      'To identify the type of asbestos present in a sampled material and record it in the asbestos register',
      'To confirm the structural condition of the building fabric before refurbishment work is planned',
    ],
    correctAnswer: 1,
    explanation:
      'A priority assessment considers factors such as the normal activities in the area, the likelihood of disturbance, the number of occupants, the frequency of use, and the maintenance activity. It helps the dutyholder determine what management actions are needed and how urgently.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Priority assessment',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 62,
    question: 'How does a priority assessment differ from a material assessment?',
    options: [
      'They are two names for exactly the same scoring exercise',
      'The material assessment is done by the HSE, the priority one by the dutyholder',
      'The material assessment scores the condition and type of the ACM itself',
      'The priority assessment is only required for licensed asbestos work',
    ],
    correctAnswer: 2,
    explanation:
      'The material assessment evaluates the condition and properties of the ACM itself (e.g. damage, type, surface treatment). The priority assessment looks at external factors — how likely it is that the ACM will be disturbed due to its location, occupant activities, and maintenance needs. Together they inform the management plan.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Priority assessment',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 63,
    question: 'What does CAR 2012 apply to?',
    options: [
      'Only work with blue and brown asbestos; work with white asbestos falls outside its scope entirely',
      'Buildings constructed before 1999 only, when the final ban took effect',
      'Licensed asbestos removal contractors only; other trades fall under CDM 2015',
      'All work with asbestos-containing materials, and also to the duty to manage asbestos in non-domestic premises',
    ],
    correctAnswer: 3,
    explanation:
      'CAR 2012 applies to all work with asbestos-containing materials and also contains the duty to manage asbestos in non-domestic premises (Regulation 4). The duty to manage does not apply to domestic premises, but the work-related regulations apply wherever asbestos work is done.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'CAR 2012 overview',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 64,
    question: 'Regulation 4 (duty to manage) applies to which type of premises?',
    options: [
      'Non-domestic premises only (including the common areas of domestic buildings such as shared hallways and stairwells)',
      'Private dwellings only, such as houses and individual flats occupied by a single family or household',
      'Buildings owned or occupied by central government departments and local authorities, and no others',
      'New-build premises constructed after the 1999 asbestos ban, where construction records are still held',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4 applies to non-domestic premises, which includes workplaces, commercial buildings, and industrial premises. It also applies to the common areas of certain domestic premises, such as shared hallways, stairwells, and lift shafts in blocks of flats.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Regulation 4 duties',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 65,
    question: 'What is the first step a dutyholder should take under Regulation 4?',
    options: [
      'Immediately arrange for all suspect materials to be removed from the building by a licensed contractor',
      'Take reasonable steps to find out whether ACMs are present in the premises, commissioning a survey where appropriate',
      'Notify the HSE in writing that the building may contain asbestos, at least 14 days before any work',
      'Evacuate all occupants from the building until a four-stage clearance certificate has been issued',
    ],
    correctAnswer: 1,
    explanation:
      'The first step under Regulation 4 is to take reasonable steps to determine whether asbestos-containing materials are present. This typically involves checking building records, commissioning an asbestos survey, and reviewing any existing asbestos information.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Regulation 4 duties',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 66,
    question:
      'If a dutyholder cannot determine whether a material contains asbestos, what approach should they take?',
    options: [
      'Assume the material does not contain asbestos and take no further action until work is planned',
      'Wait until the material is accidentally disturbed before deciding what action to take',
      'Presume the material contains asbestos and manage it accordingly until proven otherwise',
      'Remove the material straight away using the general maintenance staff already on site',
    ],
    correctAnswer: 2,
    explanation:
      'Under Regulation 4, if a material cannot be confirmed as non-asbestos, it should be presumed to contain asbestos and managed accordingly. This precautionary approach protects workers and building occupants until the material can be sampled and analysed.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Regulation 4 duties',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 67,
    question: 'How often should an asbestos management plan be reviewed?',
    options: [
      'Only once, when the plan is first created and issued to the dutyholder',
      "Every ten years, in line with the building's structural survey cycle",
      'Whenever the building is sold or let, and at no other time',
      'At regular intervals, and whenever there is reason to believe the plan is no longer valid',
    ],
    correctAnswer: 3,
    explanation:
      'The management plan should be reviewed at regular intervals (HSE guidance suggests at least annually) and whenever circumstances change, such as after building work, damage to ACMs, or changes in building use. This ensures the plan remains current and effective.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Management plan',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 68,
    question: 'What should be included in an asbestos management plan?',
    options: [
      'The location and condition of ACMs, the monitoring arrangements, who is responsible, and how the information reaches anyone liable to disturb them',
      'The names, job titles and home addresses of everyone who occupies the building, together with a record of their working hours',
      'A complete inventory of all the electrical and mechanical plant on site, with the date each item was last serviced and tested',
      'The architectural drawings, the original planning consents and the building control approvals for the premises and any later extensions',
    ],
    correctAnswer: 0,
    explanation:
      'A management plan should include: the asbestos register, a schedule for monitoring ACM condition, clear allocation of responsibilities, procedures for passing information to workers and contractors, and an action plan for managing or removing ACMs as appropriate.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Management plan',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 69,
    question: 'Which body is responsible for enforcing the Control of Asbestos Regulations 2012?',
    options: [
      'The Environment Agency',
      'The Health and Safety Executive (HSE)',
      'The Building Safety Regulator',
      'The Care Quality Commission',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcing authority for the Control of Asbestos Regulations 2012 in most workplaces. Local authorities may enforce in certain premises such as shops, offices, and leisure facilities.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'HSE enforcement',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 70,
    question:
      'What enforcement action can the HSE take if a dutyholder fails to comply with Regulation 4?',
    options: [
      'The HSE can only issue written advice and has no formal enforcement powers',
      'The HSE can revoke the building owner’s planning permission',
      'The HSE can issue improvement notices, prohibition notices, and prosecute offenders',
      'The HSE can order the immediate demolition of the affected building',
    ],
    correctAnswer: 2,
    explanation:
      "The HSE has a range of enforcement powers including issuing improvement notices (requiring action within a set time), prohibition notices (stopping an activity immediately), and prosecution. Penalties for asbestos offences can include unlimited fines and up to two years' imprisonment.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'HSE enforcement',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 71,
    question: 'Under CAR 2012, what is notifiable non-licensed work (NNLW)?',
    options: [
      'Any asbestos work carried out by an HSE-licensed contractor, whether or not the material itself would otherwise be licensable under CAR 2012',
      'Work that requires no notification, no records and no medical surveillance, because exposure is sporadic, of low intensity and below the control limit',
      'Work that may only be carried out after a refurbishment and demolition survey has been completed and its results recorded in the register',
      'Work that does not require a licence but must be notified to the HSE, and is subject to extra requirements including medical surveillance and record-keeping',
    ],
    correctAnswer: 3,
    explanation:
      "NNLW is a category of asbestos work that falls between licensed and non-licensed work. Although a licence is not required, the work must be notified to the HSE via an online notification, and additional requirements apply including medical examinations and keeping a record of workers' exposure.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Three work categories',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 72,
    question:
      'Which of the following is an example of non-licensed asbestos work (the lowest risk category)?',
    options: [
      'Short-duration, low-disturbance work such as drilling a single hole through an asbestos cement product while using appropriate controls',
      'Removing sprayed asbestos coating (limpet) from structural steelwork inside a full enclosure under negative pressure',
      'Stripping asbestos pipe lagging from a heating system in an occupied plant room, working inside a glove bag throughout',
      'Removing large areas of asbestos insulating board from a ceiling void before the building is refurbished and reoccupied',
    ],
    correctAnswer: 0,
    explanation:
      'Non-licensed work is the lowest risk category and includes short-duration work where fibre release is minimal, such as drilling a small number of holes in asbestos cement with appropriate controls. Removal of AIB, sprayed coatings, and lagging are all licensed work.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Three work categories',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 73,
    question:
      'What is the maximum penalty for a breach of the Control of Asbestos Regulations 2012 on conviction on indictment?',
    options: [
      'A fixed penalty notice of £1,000 with no custodial option',
      "An unlimited fine and/or up to two years' imprisonment",
      'A maximum fine of £5,000 and no imprisonment',
      'A formal caution only, recorded for five years',
    ],
    correctAnswer: 1,
    explanation:
      "On conviction on indictment (Crown Court), breaches of CAR 2012 can result in an unlimited fine and/or up to two years' imprisonment. For summary conviction (Magistrates' Court), the maximum fine is also unlimited following the Legal Aid, Sentencing and Punishment of Offenders Act 2012.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Penalties',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 74,
    question:
      'How does the Construction (Design and Management) Regulations 2015 (CDM 2015) relate to asbestos management?',
    options: [
      'CDM 2015 replaces CAR 2012 entirely on notifiable construction projects, so the asbestos regulations no longer apply to that work',
      'CDM 2015 has no relevance to asbestos; it applies only to work at height, excavations and site traffic management on notifiable projects',
      'CDM 2015 requires pre-construction information, including details of any asbestos present, to be provided and the risks managed throughout the project',
      'CDM 2015 exempts construction projects from the duty to manage asbestos once a principal contractor has been formally appointed',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 overlaps with asbestos management because it requires clients to provide pre-construction information including details of known asbestos. Designers must eliminate or reduce risks, and principal contractors must manage asbestos risks on site. CAR 2012 still applies in full alongside CDM 2015.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'CDM 2015 overlap',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 75,
    question:
      'Under CDM 2015, who has a duty to provide pre-construction information including asbestos details to designers and contractors?',
    options: [
      'The insurance company',
      'The principal designer',
      'The local authority',
      'The client',
    ],
    correctAnswer: 3,
    explanation:
      'Under CDM 2015, the client has a duty to provide pre-construction information to every designer and contractor. This must include information about asbestos in the building, typically drawn from the asbestos register and management survey.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'CDM 2015 overlap',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 76,
    question:
      'What should a dutyholder do with the asbestos register when contractors are carrying out work in the building?',
    options: [
      'Make the relevant information available to anyone liable to disturb the ACMs, including contractors and maintenance workers',
      'Keep the register strictly confidential and withhold it from contractors, as it is commercially sensitive',
      'Hand the original register to the HSE for approval before any contractor is allowed to start work on site',
      'Destroy the register once the contractors have finished on site and start a fresh one for the next job',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 4, the dutyholder must ensure that information about the location and condition of ACMs is given to anyone who is liable to work on or disturb them. This includes contractors, maintenance workers, and emergency services. Proactive sharing of this information is essential.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Asbestos register',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 77,
    question: 'A material assessment gives a high score. What does this indicate?',
    options: [
      'The material is sealed, in good condition and presents a low risk of fibre release during normal occupancy of the building',
      'The material is likely to release fibres readily given its type, condition and surface treatment, and needs urgent management action',
      'The material has already been removed under a licence and the area has passed its four-stage clearance testing',
      'The material has been confirmed by a UKAS-accredited laboratory analysis to be free from any asbestos fibres',
    ],
    correctAnswer: 1,
    explanation:
      'A high material assessment score indicates that the ACM is more likely to release fibres — for example, because it is badly damaged, is a friable product type, and has no protective surface treatment. A high score triggers a need for more urgent management action such as repair, encapsulation, or removal.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Material assessment scoring',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 78,
    question:
      'Which of the following is NOT typically a factor in the priority assessment for asbestos management?',
    options: [
      'The number of occupants in the area',
      'The frequency and type of activity in the area',
      'The colour of the asbestos-containing material',
      'The likelihood of disturbance by maintenance activities',
    ],
    correctAnswer: 2,
    explanation:
      'Priority assessment considers factors such as occupant numbers, activity type and frequency, time spent in the area, and the likelihood of disturbance from maintenance. The colour of the material is not a factor in priority assessment — it relates neither to the likelihood of disturbance nor to fibre release potential.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Priority assessment',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 79,
    question:
      'If there are multiple dutyholders for a single building (e.g. a landlord and several tenants), what does Regulation 4 require?',
    options: [
      'Only the freeholder holds any duty under Regulation 4; the individual tenants are exempt from it',
      'Each party may rely entirely on the others to manage the asbestos and need take no action itself',
      'The duty automatically transfers to whichever party last carried out building work on the premises',
      'Each dutyholder must cooperate with the others so far as is necessary to enable them to comply with their duties',
    ],
    correctAnswer: 3,
    explanation:
      'Where there are multiple dutyholders (e.g. a freeholder, managing agent, and several leaseholders), Regulation 4 requires them to cooperate to ensure the duty to manage is properly discharged. This may involve agreeing responsibilities and sharing information about ACMs.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Dutyholder identification',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 80,
    question:
      'Which approved code of practice (ACoP) supports CAR 2012 and provides practical guidance on compliance?',
    options: [
      'L143 — Managing and Working with Asbestos',
      "L8 — Legionnaires' Disease: Control of Legionella",
      'L153 — Managing Health and Safety in Construction',
      'L138 — Dangerous Substances and Explosive Atmospheres',
    ],
    correctAnswer: 0,
    explanation:
      "L143 'Managing and Working with Asbestos' is the approved code of practice (ACoP) that accompanies CAR 2012. It has a special legal status — if an employer is prosecuted for a breach of CAR 2012 and has not followed the relevant provisions of L143, a court will find them at fault unless they can show they complied in an equivalent or better way.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'CAR 2012 overview',
    category: 'Legislation & Duty to Manage',
  },

  // =======================================================================
  // IDENTIFICATION & SURVEYS — 40 questions (id 81–120)
  // =======================================================================
  {
    id: 81,
    question: 'What is the typical asbestos content of Asbestos Insulating Board (AIB)?',
    options: ['10-15%', '25-40%', '1-5%', '50-70%'],
    correctAnswer: 1,
    explanation:
      'Asbestos Insulating Board (AIB) typically contains 25-40% asbestos. This relatively high asbestos content, combined with its friable nature, makes AIB one of the higher-risk asbestos-containing materials commonly found in buildings.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'AIB identification',
    category: 'Identification & Surveys',
  },
  {
    id: 82,
    question:
      'Which of the following best describes the physical characteristics of Asbestos Insulating Board (AIB)?',
    options: [
      'Hard, dense and grey in colour',
      'Transparent and flexible like plastic sheeting',
      'Soft, friable and of relatively low density',
      'Metallic in appearance with a shiny surface',
    ],
    correctAnswer: 2,
    explanation:
      'AIB is characterised by being soft, friable (easily crumbled) and of relatively low density. It can often be identified by its soft texture compared to asbestos cement, and it releases fibres more readily when disturbed.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'AIB identification',
    category: 'Identification & Surveys',
  },
  {
    id: 83,
    question: 'What is the typical asbestos content of asbestos cement (AC) products?',
    options: ['1-5%', '50-60%', '25-40%', '10-15%'],
    correctAnswer: 3,
    explanation:
      'Asbestos cement typically contains 10-15% asbestos, with the remainder being Portland cement. The lower asbestos content and the binding effect of the cement matrix mean that fibres are less readily released compared to AIB, provided the material remains in good condition.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Asbestos cement',
    category: 'Identification & Surveys',
  },
  {
    id: 84,
    question: 'Asbestos cement is classified as which type of material?',
    options: ['Non-friable', 'Semi-friable', 'Ultra-friable', 'Friable'],
    correctAnswer: 0,
    explanation:
      'Asbestos cement is classified as a non-friable material. The cement matrix binds the asbestos fibres tightly, meaning that in good condition, asbestos cement does not readily release fibres. However, if damaged, weathered, or worked upon with power tools, it can release dangerous fibres.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Asbestos cement',
    category: 'Identification & Surveys',
  },
  {
    id: 85,
    question: 'Which key difference helps distinguish AIB from asbestos cement on site?',
    options: [
      'AIB is always blue in colour whereas AC is always white',
      'AIB is softer and less dense; AC is harder and more dense',
      'There is no physical difference between AIB and AC',
      'AIB is always found outdoors; AC is always found indoors',
    ],
    correctAnswer: 1,
    explanation:
      'The primary physical distinction is that AIB is softer, lighter and less dense than asbestos cement. AC is hard, dense and feels similar to concrete. AIB can often be scored with a fingernail or indented easily, whereas AC cannot. However, positive identification always requires laboratory analysis.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'AIB vs AC differences',
    category: 'Identification & Surveys',
  },
  {
    id: 86,
    question:
      'Which type of asbestos-containing material is considered to present the highest risk when disturbed?',
    options: [
      'Asbestos cement roofing sheets',
      'Textured decorative coatings',
      'Pipe lagging',
      'Asbestos rope seals',
    ],
    correctAnswer: 2,
    explanation:
      'Pipe lagging (thermal insulation applied to pipes and boilers) is considered the highest-risk asbestos-containing material. It is highly friable, often contains amphibole asbestos types (amosite or crocidolite), and can have very high asbestos content. When disturbed, it readily releases large quantities of airborne fibres.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pipe lagging',
    category: 'Identification & Surveys',
  },
  {
    id: 87,
    question: "What is 'limpet asbestos' another name for?",
    options: [
      'Asbestos insulating board',
      'Asbestos floor tiles',
      'Asbestos cement sheeting',
      'Sprayed asbestos coatings',
    ],
    correctAnswer: 3,
    explanation:
      'Limpet asbestos is a common term for sprayed asbestos coatings. These were applied to structural steelwork, ceilings and walls for fire protection and thermal insulation. Sprayed coatings are extremely friable and represent one of the highest-risk forms of asbestos-containing material.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Sprayed coatings',
    category: 'Identification & Surveys',
  },
  {
    id: 88,
    question:
      'What type of asbestos is most commonly found in textured decorative coatings such as Artex?',
    options: [
      'Chrysotile (white asbestos)',
      'Amosite (brown asbestos)',
      'Crocidolite (blue asbestos)',
      'Tremolite',
    ],
    correctAnswer: 0,
    explanation:
      'Textured decorative coatings such as Artex typically contain chrysotile (white asbestos). The asbestos content is generally low, in the range of 1-5%, but any disturbance such as sanding or scraping can release fibres.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Textured coatings',
    category: 'Identification & Surveys',
  },
  {
    id: 89,
    question:
      'What is the typical asbestos content found in textured decorative coatings like Artex?',
    options: ['25-40%', '1-5%', '10-15%', '50-80%'],
    correctAnswer: 1,
    explanation:
      'Textured decorative coatings such as Artex typically contain 1-5% chrysotile asbestos. Although the percentage is relatively low, these coatings were applied very widely in domestic and commercial properties, and disturbance during renovation work remains a significant source of fibre release.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Textured coatings',
    category: 'Identification & Surveys',
  },
  {
    id: 90,
    question: 'Where would you most likely find asbestos rope seals and gaskets?',
    options: [
      'Under carpets and floor coverings in living areas',
      'Inside double-glazed window cavities',
      'Around boilers, flues, heating systems and pipe joints',
      'Within external rainwater downpipes and guttering',
    ],
    correctAnswer: 2,
    explanation:
      "Asbestos rope seals and gaskets were commonly used around boilers, flues, heating systems and pipe joints to provide heat-resistant sealing. They exploit asbestos's excellent thermal resistance properties and can still be found in older heating equipment and industrial plant.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Rope seals and gaskets',
    category: 'Identification & Surveys',
  },
  {
    id: 91,
    question: 'What is asbestos millboard typically used for?',
    options: [
      'Decorative wall panelling in living rooms and hallways',
      'Damp-proof membranes beneath concrete floor slabs',
      'External cladding on system-built tower blocks',
      'Fire protection linings behind heaters, boilers and in fire surrounds',
    ],
    correctAnswer: 3,
    explanation:
      'Asbestos millboard is a dense, compressed asbestos sheet material that was commonly used as a fire protection lining. It is found behind heaters, boilers, within fire surrounds, and as general fire-resistant lining material. It can contain a high percentage of asbestos.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Millboard and paper',
    category: 'Identification & Surveys',
  },
  {
    id: 92,
    question:
      'In which common domestic electrical fitting have asbestos flash guards historically been found?',
    options: [
      'Consumer units (fuse boxes)',
      'Plastic light switches',
      'Ceiling rose connectors',
      'Socket outlet faceplates',
    ],
    correctAnswer: 0,
    explanation:
      'Asbestos flash guards were commonly used inside consumer units (fuse boxes) to provide arc and fire protection. Electricians working on older consumer units should be aware that these flash guards may contain asbestos and should not be disturbed without appropriate precautions.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Flash guards in consumer units',
    category: 'Identification & Surveys',
  },
  {
    id: 93,
    question:
      "What is the 'presumption approach' under Regulation 5 of the Control of Asbestos Regulations?",
    options: [
      'Presuming that a material is asbestos-free unless a survey proves otherwise',
      'Presuming that a material contains asbestos unless there is strong evidence that it does not',
      'Presuming that only friable materials need to be treated as asbestos',
      'Presuming that materials installed after 1985 are always asbestos-free',
    ],
    correctAnswer: 1,
    explanation:
      'Under Regulation 5 of the Control of Asbestos Regulations 2012, the duty holder must presume that materials contain asbestos unless there is strong evidence that they do not. This presumption approach means that if there is any doubt, the material must be treated as if it contains asbestos until proven otherwise by analysis.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Presumption approach',
    category: 'Identification & Surveys',
  },
  {
    id: 94,
    question: 'What does PLM stand for in the context of asbestos analysis?',
    options: [
      'Preliminary Lab Method',
      'Particulate Level Monitoring',
      'Polarised Light Microscopy',
      'Positive Light Measurement',
    ],
    correctAnswer: 2,
    explanation:
      'PLM stands for Polarised Light Microscopy. It is the standard laboratory technique used to identify the type and presence of asbestos fibres in bulk material samples. PLM uses polarised light to identify the optical properties unique to different asbestos fibre types.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'PLM analysis',
    category: 'Identification & Surveys',
  },
  {
    id: 95,
    question:
      'What accreditation must a laboratory hold to carry out asbestos bulk sample analysis in the UK?',
    options: [
      'ISO 9001 certification',
      'CE marking approval',
      'BREEAM certification',
      'UKAS accreditation',
    ],
    correctAnswer: 3,
    explanation:
      'Laboratories carrying out asbestos bulk sample analysis in the UK must hold UKAS (United Kingdom Accreditation Service) accreditation. This ensures the laboratory meets the required standards for competence, impartiality and consistent operation in asbestos fibre identification.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'UKAS-accredited labs',
    category: 'Identification & Surveys',
  },
  {
    id: 96,
    question: 'What is the primary purpose of bulk sampling in asbestos surveys?',
    options: [
      'To collect a physical sample of material for laboratory identification of asbestos type and content',
      'To measure the concentration of asbestos fibres in the air surrounding the work area',
      'To estimate the age of the building from the type of construction materials used in it',
      'To confirm that an area is clean enough to be reoccupied after asbestos removal work',
    ],
    correctAnswer: 0,
    explanation:
      'Bulk sampling involves collecting a physical sample of suspect material so it can be analysed in a laboratory (typically using PLM) to determine whether asbestos is present and, if so, what type. This is distinct from air monitoring, which measures airborne fibre concentrations.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Bulk sampling vs air monitoring',
    category: 'Identification & Surveys',
  },
  {
    id: 97,
    question: 'What does air monitoring measure in relation to asbestos?',
    options: [
      'The percentage of asbestos in bulk material samples',
      'The concentration of airborne asbestos fibres in a given volume of air',
      'The type of asbestos present in a material',
      'The age of asbestos-containing materials',
    ],
    correctAnswer: 1,
    explanation:
      'Air monitoring measures the concentration of airborne asbestos fibres in a given volume of air (expressed as fibres per millilitre, f/ml). It is used during and after asbestos removal work to assess exposure levels and to verify that an area is safe for reoccupation.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Bulk sampling vs air monitoring',
    category: 'Identification & Surveys',
  },
  {
    id: 98,
    question: "What is the purpose of maintaining a 'chain of custody' for asbestos samples?",
    options: [
      'To ensure samples are delivered to the laboratory by a licensed courier service',
      'To record the financial cost of the sampling and analysis process for the client',
      'To provide an unbroken documented record of who handled the sample from collection to analysis',
      'To track how many samples have been taken from a single building in one visit',
    ],
    correctAnswer: 2,
    explanation:
      'Chain of custody provides a documented, unbroken record of everyone who handled a sample from the point of collection to laboratory analysis and reporting. This ensures the integrity and traceability of the sample, preventing mix-ups or contamination, and is essential for the validity of results.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Chain of custody',
    category: 'Identification & Surveys',
  },
  {
    id: 99,
    question:
      'Sprayed asbestos coatings were primarily applied to structural steelwork for which purpose?',
    options: [
      'Decorative finishing of exposed steel beams',
      'Waterproofing of below-ground steel foundations',
      'Improving the electrical earthing of the structure',
      'Fire protection and thermal insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Sprayed asbestos coatings (limpet asbestos) were primarily applied to structural steelwork for fire protection and thermal insulation. The coating provided fire resistance to steel structures, which lose their structural integrity at high temperatures. This is one of the most hazardous forms of asbestos-containing material due to its highly friable nature.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Sprayed coatings',
    category: 'Identification & Surveys',
  },
  {
    id: 100,
    question: 'When should sampling of a suspect material for asbestos be carried out?',
    options: [
      'When the material cannot be positively identified as non-asbestos and a presumption is not appropriate',
      'Only after asbestos fibres have already been released into the air of the work area',
      'Whenever any building work is planned, regardless of the material involved or its age',
      'Once the material has already been removed and double-bagged',
    ],
    correctAnswer: 0,
    explanation:
      'Sampling should be carried out when a suspect material cannot be positively identified as non-asbestos-containing and when simply presuming the presence of asbestos is not the most appropriate management strategy. The decision to sample must weigh the risk of fibre release during sampling against the benefits of obtaining a definitive identification.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'When to sample',
    category: 'Identification & Surveys',
  },
  {
    id: 101,
    question:
      'Which of the following is a key reason why pipe lagging is considered one of the highest-risk asbestos-containing materials?',
    options: [
      'It is always bonded within a dense cement matrix that traps the fibres securely',
      'It is highly friable and often contains amphibole asbestos types with very high asbestos content',
      'It only ever contains chrysotile, which is the least hazardous of the asbestos types',
      'It is too tough to be cut or disturbed without specialist power tools and jigs',
    ],
    correctAnswer: 1,
    explanation:
      'Pipe lagging is considered highest risk because it is highly friable (easily crumbled by hand), often contains amphibole asbestos types such as amosite or crocidolite, and can have very high asbestos content. When disturbed, it can release extremely high concentrations of airborne fibres, posing a severe inhalation risk.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Pipe lagging',
    category: 'Identification & Surveys',
  },
  {
    id: 102,
    question: 'Asbestos electrical backing boards were commonly found in which locations?',
    options: [
      'Underneath suspended timber ground floors',
      'Inside double-skinned external cavity walls',
      'Behind electrical switchboards, fuse boxes and meter cupboards',
      'Within the loft insulation of pitched roofs',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos electrical backing boards were commonly mounted behind electrical switchboards, fuse boxes and meter cupboards. They provided fire resistance and electrical insulation. These boards are often made from AIB and can release fibres if drilled, cut or broken during electrical maintenance work.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Electrical backing boards',
    category: 'Identification & Surveys',
  },
  {
    id: 103,
    question: 'Where might asbestos be found in cable trenching systems?',
    options: [
      'In the copper conductors of the cables running through the trench',
      'In the PVC insulation surrounding modern steel wire armoured cables',
      'In the plastic warning tape laid in the trench above the buried cables',
      'In the cement or composite troughing and covers used to protect underground cables',
    ],
    correctAnswer: 3,
    explanation:
      'Asbestos can be found in the cement or composite troughing and covers used to protect underground and surface-level cable runs. Asbestos cement was commonly used for cable troughing due to its durability and fire resistance. Workers excavating or modifying cable trenches must be aware of this potential hazard.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Cable trenching',
    category: 'Identification & Surveys',
  },
  {
    id: 104,
    question: 'What role did asbestos play in switchgear arc shields?',
    options: [
      'To provide protection against the intense heat generated by electrical arcing',
      'To improve the electrical conductivity of the busbars',
      'To reduce the operating noise of the switchgear mechanism',
      'To act as a decorative cosmetic finish on the enclosure',
    ],
    correctAnswer: 0,
    explanation:
      'Asbestos was used in switchgear arc shields to provide protection against the intense heat generated during electrical arcing events. The heat-resistant properties of asbestos made it ideal for this application. Electricians and maintenance workers should be aware that older switchgear may contain asbestos arc shields.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Switchgear arc shields',
    category: 'Identification & Surveys',
  },
  {
    id: 105,
    question:
      'In which household appliance component were asbestos storage bricks historically used?',
    options: [
      'Washing machine drums',
      'Night storage heaters',
      'Microwave oven linings',
      'Refrigerator shelving',
    ],
    correctAnswer: 1,
    explanation:
      'Asbestos was used in the heat storage bricks inside night storage heaters. These bricks stored heat during off-peak electricity hours and released it gradually. Older storage heaters may still contain asbestos storage bricks, and they should not be broken or dismantled without appropriate precautions and testing.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Heater storage bricks',
    category: 'Identification & Surveys',
  },
  {
    id: 106,
    question:
      'Under the presumption approach, what should a duty holder do if they are unable to confirm whether a material contains asbestos?',
    options: [
      'Remove the material immediately using in-house staff',
      'Assume it is safe if the building was built after 1990',
      'Treat the material as if it contains asbestos and manage it accordingly',
      'Seal the room permanently and prohibit all access',
    ],
    correctAnswer: 2,
    explanation:
      'Under the presumption approach required by Regulation 5 of the Control of Asbestos Regulations 2012, if a duty holder cannot confirm whether a material contains asbestos, they must treat it as if it does contain asbestos and manage it accordingly. This includes labelling, recording it in the asbestos register, and ensuring it is not disturbed.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Presumption approach',
    category: 'Identification & Surveys',
  },
  {
    id: 107,
    question:
      'Which of the following correctly describes a limitation of Polarised Light Microscopy (PLM)?',
    options: [
      'It cannot distinguish which type of asbestos fibre is present in the sample',
      'It is not recognised by UKAS as a valid method for bulk sample analysis',
      'It can only be performed on air samples, never on bulk material samples',
      'It may not detect very low concentrations of asbestos fibres in certain matrices',
    ],
    correctAnswer: 3,
    explanation:
      'A known limitation of PLM is that it may not reliably detect very low concentrations of asbestos fibres, particularly when they are finely dispersed within certain matrix materials. In such cases, additional analytical techniques may be required. However, PLM remains the standard and widely accepted method for bulk sample analysis.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'PLM analysis',
    category: 'Identification & Surveys',
  },
  {
    id: 108,
    question:
      'Why is it important that asbestos bulk samples are analysed by a UKAS-accredited laboratory?',
    options: [
      'Because UKAS accreditation ensures the laboratory meets standards for competence, quality and reliability of results',
      'Because UKAS-accredited laboratories are the cheapest option available to a dutyholder in the UK',
      'Because only UKAS-accredited laboratories are permitted to arrange disposal of the asbestos waste afterwards',
      'Because UKAS-accredited laboratories are required to provide same-day results in every case without exception',
    ],
    correctAnswer: 0,
    explanation:
      'UKAS accreditation ensures that the laboratory has been independently assessed and meets recognised standards for technical competence, quality management and reliability of analytical results. This provides confidence that the identification of asbestos (or confirmation of its absence) is accurate and defensible.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'UKAS-accredited labs',
    category: 'Identification & Surveys',
  },
  {
    id: 109,
    question:
      'A surveyor encounters a hard, dense, grey corrugated roof sheet on a building constructed in 1975. What material is this most likely to be?',
    options: [
      'Asbestos Insulating Board (AIB)',
      'Asbestos cement (AC)',
      'Sprayed asbestos coating',
      'Asbestos millboard',
    ],
    correctAnswer: 1,
    explanation:
      'A hard, dense, grey corrugated roof sheet on a building from 1975 is most likely asbestos cement (AC). Corrugated asbestos cement sheeting was one of the most widely used roofing materials from the 1950s through to the 1980s. Its hard, dense characteristics distinguish it from softer materials like AIB.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Asbestos cement',
    category: 'Identification & Surveys',
  },
  {
    id: 110,
    question: 'Which of the following statements about asbestos fuse carriers is correct?',
    options: [
      'They were made from asbestos cement and were only ever used in industrial settings',
      'They are large flat panels used as firebreaks in commercial building voids',
      'They are small moulded components that may contain asbestos and are found in older fuse boxes',
      'They contain no asbestos at all and are safe to handle without any precautions',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos fuse carriers are small moulded components found in older fuse boxes and distribution boards. They were manufactured using asbestos-containing material for its electrical insulation and heat resistance properties. Electricians must be aware of their presence when working on older electrical installations.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Fuse carriers',
    category: 'Identification & Surveys',
  },
  {
    id: 111,
    question:
      'What is the main risk associated with using power tools on asbestos cement products?',
    options: [
      'The tools become permanently contaminated and must be destroyed as asbestos waste',
      'The cement matrix sets harder as it is worked and becomes impossible to cut through',
      'The power tool will overheat and stall against the dense cement material and jam',
      'The mechanical action can break the cement matrix and release large quantities of asbestos fibres',
    ],
    correctAnswer: 3,
    explanation:
      'Although asbestos cement is classified as non-friable in good condition, using power tools such as angle grinders, drills or circular saws on it can break the cement matrix and release large quantities of asbestos fibres into the air. This is why power tools must never be used on asbestos-containing materials without appropriate controls.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Asbestos cement',
    category: 'Identification & Surveys',
  },
  {
    id: 112,
    question:
      'A surveyor encounters a textured ceiling coating in a 1982 property. The homeowner insists it was applied after the asbestos ban. Without documentary proof of the application date, what should the surveyor do?',
    options: [
      'Presume the coating contains asbestos unless sampling and UKAS-accredited laboratory analysis confirm otherwise',
      "Accept the homeowner's account and record the coating in the survey report as being asbestos-free",
      'Identify the coating as asbestos-free on the basis of its colour, texture and surface pattern',
      'Treat the coating as safe on the basis that the building post-dates the 1985 ban on amphibole asbestos',
    ],
    correctAnswer: 0,
    explanation:
      'Without documentary evidence confirming the application date falls after the prohibition of asbestos in textured coatings, the surveyor must apply the presumption approach under Regulation 5. The coating should be presumed to contain asbestos until a representative sample is analysed by a UKAS-accredited laboratory and confirmed as asbestos-free. Verbal assurances from occupants do not constitute strong evidence.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Textured coatings',
    category: 'Identification & Surveys',
  },
  {
    id: 113,
    question:
      'What is the difference between a management survey and a refurbishment/demolition survey?',
    options: [
      'A management survey is fully intrusive and destructive throughout; a refurbishment/demolition survey is a purely visual, non-intrusive walk-through of the premises',
      'A management survey locates ACMs that could be disturbed during normal occupancy; a refurbishment/demolition survey is fully intrusive to find all ACMs before major works',
      'A management survey is carried out by the HSE; a refurbishment/demolition survey is carried out by the building owner or their appointed surveyor before work starts',
      'A management survey applies only to domestic premises; a refurbishment/demolition survey applies only to non-domestic premises and to construction sites',
    ],
    correctAnswer: 1,
    explanation:
      'A management survey is a standard survey to locate asbestos-containing materials that could be disturbed during normal occupancy, routine maintenance or minor works. A refurbishment/demolition survey is a fully intrusive survey designed to locate all ACMs in the area where refurbishment or demolition work will take place, including those in hidden areas.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'When to sample',
    category: 'Identification & Surveys',
  },
  {
    id: 114,
    question: 'Asbestos paper products were commonly used as which of the following?',
    options: [
      'Decorative wallpaper hung in domestic living rooms and hallways',
      'Packaging material for transporting fragile goods by rail',
      'Linings in ductwork, electrical equipment and as fire protection layers',
      'Writing paper and headed stationery used in office buildings',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos paper was commonly used as a lining material in ductwork, inside electrical equipment, and as a fire protection layer in various applications. It is thin and can be easily torn, making it friable and potentially hazardous if disturbed. It may be found layered beneath other materials.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Millboard and paper',
    category: 'Identification & Surveys',
  },
  {
    id: 115,
    question:
      'A sample taken from a suspect material is sent to a laboratory. The chain of custody documentation should include which of the following?',
    options: [
      'The market value of the sampled material and the cost of replacing it after removal work',
      "The names and home addresses of all the building's occupants at the time of the sampling visit",
      'A photograph of every room in the building in which any of the sampling work took place that day',
      'The names and signatures of everyone who handled the sample, dates and times of transfer, and sample condition',
    ],
    correctAnswer: 3,
    explanation:
      'Chain of custody documentation must include the names and signatures of all persons who handled the sample, the dates and times of each transfer, and details of the sample condition at each stage. This comprehensive record ensures the integrity and traceability of the sample from collection through to analysis.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Chain of custody',
    category: 'Identification & Surveys',
  },
  {
    id: 116,
    question:
      'Which of the following is NOT a factor that increases the risk from an asbestos-containing material?',
    options: [
      'The material is sealed, in good condition and unlikely to be disturbed',
      'The material is in an area with high foot traffic and frequent disturbance',
      'The material is friable and in poor condition',
      'The material contains amphibole asbestos types',
    ],
    correctAnswer: 0,
    explanation:
      'A material that is sealed, in good condition and unlikely to be disturbed represents a lower risk, not a higher one. Risk factors that increase the danger include friability, poor condition, likelihood of disturbance, and the presence of amphibole asbestos types (amosite and crocidolite), which are more hazardous than chrysotile.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'AIB identification',
    category: 'Identification & Surveys',
  },
  {
    id: 117,
    question:
      'How many representative bulk samples should typically be taken from a homogeneous area of suspect material during a survey?',
    options: [
      'Exactly one sample is always sufficient for any area',
      'A minimum number depending on the size and nature of the area',
      'A sample from every square metre of the material',
      'No samples are needed if the material looks like asbestos',
    ],
    correctAnswer: 1,
    explanation:
      'HSG264 (Asbestos: The Survey Guide) provides guidance on the minimum number of samples required based on the size and nature of the homogeneous area being surveyed. Taking an adequate number of representative samples ensures that the analysis result is reliable for the entire area of material.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Bulk sampling vs air monitoring',
    category: 'Identification & Surveys',
  },
  {
    id: 118,
    question:
      'Why might a surveyor choose to presume a material contains asbestos rather than take a sample?',
    options: [
      'Because presumption is always cheaper and quicker than sending samples away for UKAS-accredited laboratory analysis',
      'Because sampling is only permitted on non-domestic premises where a management survey has already been carried out',
      'Because the act of sampling may release fibres, and if the material will be managed in situ, presumption avoids unnecessary disturbance',
      'Because the HSE prohibits the sampling of friable materials such as pipe lagging and sprayed coatings altogether',
    ],
    correctAnswer: 2,
    explanation:
      'A surveyor may choose to presume rather than sample when the act of taking a sample could release fibres unnecessarily, particularly if the material is in a location where it will be managed in situ and left undisturbed. The presumption approach avoids creating a risk where one does not need to exist, while still ensuring the material is managed as if it contains asbestos.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Presumption approach',
    category: 'Identification & Surveys',
  },
  {
    id: 119,
    question:
      'Asbestos rope seals around an old boiler are found to be deteriorating. What is the most likely consequence?',
    options: [
      'The seals become completely inert and pose no further risk once cold',
      'The asbestos converts harmlessly into ordinary cement dust as it ages',
      'The fibres bind more tightly together and can no longer be released at all',
      'Asbestos fibres may be released into the surrounding air, creating an inhalation hazard',
    ],
    correctAnswer: 3,
    explanation:
      'Deteriorating asbestos rope seals can release asbestos fibres into the surrounding air, creating a significant inhalation hazard. As the rope material breaks down due to age, heat cycling and vibration, it becomes more friable and sheds fibres more readily. Deteriorating rope seals should be assessed and managed by competent persons.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Rope seals and gaskets',
    category: 'Identification & Surveys',
  },
  {
    id: 120,
    question:
      'A competent surveyor identifies a soft, low-density board behind an old electric heater in a building constructed in 1970. The board crumbles easily when touched at the edges. Based on these characteristics, what is the most likely material and what action should follow?',
    options: [
      'It is likely AIB; it should be presumed to contain asbestos, recorded in the register, and sampled or managed accordingly',
      'It is likely asbestos cement; it can be broken out by hand and removed without any special controls in place',
      'It is plain plasterboard from the 1970s; no asbestos precautions are needed before it is removed',
      'It is likely millboard; it can be lifted out and disposed of with the general building waste from site',
    ],
    correctAnswer: 0,
    explanation:
      'A soft, low-density board that crumbles easily, found behind a heater in a 1970s building, is highly characteristic of Asbestos Insulating Board (AIB). AIB was commonly used as a fire-resistant backing board behind heaters. The material should be presumed to contain asbestos, recorded in the asbestos register, and either sampled for laboratory analysis or managed as asbestos-containing material. It must not be disturbed without appropriate controls.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'AIB identification',
    category: 'Identification & Surveys',
  },
  // =======================================================================
  // SAFE WORKING & PPE — 40 questions (id 121–160)
  // =======================================================================
  {
    id: 121,
    question:
      'What are the three categories of asbestos work defined by the Control of Asbestos Regulations 2012?',
    options: [
      'High-risk, medium-risk and low-risk work with asbestos materials',
      'Licensed work, notifiable non-licensed work (NNLW), and non-licensed work',
      'Removal work, encapsulation work and routine maintenance work',
      'Commercial premises, domestic premises and industrial premises',
    ],
    correctAnswer: 1,
    explanation:
      'The Control of Asbestos Regulations 2012 define three categories: licensed work (highest risk, requiring an HSE licence), notifiable non-licensed work (NNLW), and non-licensed work. The category depends on the type of asbestos, its condition, and the nature of the work.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Three work categories',
    category: 'Safe Working & PPE',
  },
  {
    id: 122,
    question: 'Which of the following is NOT a requirement for licensed asbestos work?',
    options: [
      'Holding an HSE-issued licence',
      'Notifying HSE at least 14 days before work begins',
      'Completing the work within 24 hours',
      'Medical surveillance of workers',
    ],
    correctAnswer: 2,
    explanation:
      'Licensed asbestos work requires an HSE licence, 14-day advance notification to HSE, and medical surveillance for workers. There is no requirement to complete the work within 24 hours — safety and thoroughness take priority over speed.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Licensed work requirements',
    category: 'Safe Working & PPE',
  },
  {
    id: 123,
    question:
      'For notifiable non-licensed work (NNLW), which form must be used to notify HSE before work begins?',
    options: ['RIDDOR', 'F10', 'ASB1', 'ASB5'],
    correctAnswer: 3,
    explanation:
      'Notifiable non-licensed work (NNLW) requires notification to HSE using form ASB5 before the work starts. ASB1 was used historically but has been replaced. F10 is for construction project notifications, and RIDDOR is for reporting injuries and dangerous occurrences.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'NNLW requirements',
    category: 'Safe Working & PPE',
  },
  {
    id: 124,
    question:
      'How long must health records for workers carrying out notifiable non-licensed work (NNLW) be kept?',
    options: ['40 years', '20 years', '5 years', '10 years'],
    correctAnswer: 0,
    explanation:
      'Health records for workers carrying out NNLW must be kept for 40 years. This extended retention period reflects the long latency of asbestos-related diseases, which can take 15 to 60 years to develop after exposure.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'NNLW requirements',
    category: 'Safe Working & PPE',
  },
  {
    id: 125,
    question:
      'What is the correct hierarchy of controls for managing asbestos risk, from most to least effective?',
    options: [
      'PPE, administrative controls, engineering controls, substitution, elimination',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Engineering controls, elimination, PPE, substitution, administrative controls',
      'Substitution, elimination, administrative controls, engineering controls, PPE',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy of controls runs from most effective to least effective: elimination (remove the hazard entirely), substitution (replace with something less hazardous), engineering controls (isolate people from the hazard), administrative controls (change the way people work), and PPE (protect the individual). PPE is always the last resort.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Hierarchy of controls',
    category: 'Safe Working & PPE',
  },
  {
    id: 126,
    question: 'What does RAMS stand for in the context of asbestos work?',
    options: [
      'Regulatory Asbestos Management System',
      'Removal of Asbestos Materials Safely',
      'Risk Assessment and Method Statement',
      'Required Asbestos Monitoring Standards',
    ],
    correctAnswer: 2,
    explanation:
      'RAMS stands for Risk Assessment and Method Statement. A risk assessment identifies the hazards and evaluates the risks, while the method statement describes the safe system of work, step by step, for carrying out the task. RAMS are essential for all asbestos work.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'RAMS for asbestos work',
    category: 'Safe Working & PPE',
  },
  {
    id: 127,
    question: 'What is the Assigned Protection Factor (APF) of an FFP3 disposable respirator?',
    options: ['APF 4', 'APF 10', 'APF 40', 'APF 20'],
    correctAnswer: 3,
    explanation:
      "An FFP3 disposable respirator has an Assigned Protection Factor (APF) of 20, meaning it reduces the wearer's exposure by a factor of 20 when correctly fitted. This is the minimum standard of RPE acceptable for asbestos work.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'RPE types',
    category: 'Safe Working & PPE',
  },
  {
    id: 128,
    question: 'What type of coveralls should be worn for asbestos work?',
    options: [
      'Type 5 disposable coveralls',
      'Type 3 chemical coveralls',
      'Standard cotton overalls',
      'High-visibility jackets',
    ],
    correctAnswer: 0,
    explanation:
      'Type 5 disposable coveralls are required for asbestos work. They are designed to protect against airborne solid particles, including asbestos fibres. Standard cotton overalls would trap fibres and cannot be safely decontaminated, while Type 3 coveralls are designed for liquid chemical protection.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'PPE',
    category: 'Safe Working & PPE',
  },
  {
    id: 129,
    question: 'Why is face-fit testing required for RPE used in asbestos work?',
    options: [
      'To test whether the filters in the respirator need replacing',
      "To ensure an adequate seal between the facepiece and the wearer's face",
      'To measure the oxygen content of the air inside the mask',
      'To check the respirator is the correct type for the work',
    ],
    correctAnswer: 1,
    explanation:
      "Face-fit testing ensures an adequate seal between the facepiece and the wearer's face. Without a proper seal, contaminated air can leak in around the edges, rendering the RPE ineffective. Every wearer must be individually face-fit tested, as face shapes vary significantly between individuals.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Face-fit testing',
    category: 'Safe Working & PPE',
  },
  {
    id: 130,
    question:
      'Which of the following tools is strictly prohibited for use on asbestos-containing materials?',
    options: [
      'Hand saw with slow cutting action',
      'Hand scraper',
      'Angle grinder',
      'Pump-action spray bottle',
    ],
    correctAnswer: 2,
    explanation:
      'Angle grinders are strictly prohibited for use on asbestos-containing materials because they generate extremely high levels of airborne fibres through high-speed abrasion. Other prohibited power tools include dry drilling equipment and compressed air. Low-speed hand tools that minimise fibre release are preferred.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Prohibited tools',
    category: 'Safe Working & PPE',
  },
  {
    id: 131,
    question: 'What is the purpose of wet working methods when dealing with asbestos?',
    options: [
      'To dissolve the asbestos fibres completely',
      'To test whether the material contains asbestos',
      'To wash the asbestos down the drain',
      'To suppress airborne fibre release by keeping the material damp',
    ],
    correctAnswer: 3,
    explanation:
      'Wet working methods suppress airborne fibre release by keeping asbestos-containing materials damp during work. Water does not dissolve asbestos fibres but prevents them from becoming airborne. A fine mist spray using water with a small amount of wetting agent is typically used.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Wet working methods',
    category: 'Safe Working & PPE',
  },
  {
    id: 132,
    question: 'What is a Class H vacuum cleaner designed for?',
    options: [
      'Filtering hazardous dusts including asbestos fibres using a HEPA filter',
      'Collecting general construction dust and rubble on site',
      'Wet-vacuuming spilled liquids and standing water',
      'Cleaning ordinary office and domestic carpets',
    ],
    correctAnswer: 0,
    explanation:
      'A Class H vacuum cleaner is specifically designed for collecting hazardous dusts, including asbestos fibres. It contains a HEPA (High Efficiency Particulate Air) filter that captures 99.995% of particles. Standard domestic or industrial vacuums must never be used for asbestos as they will blow fibres straight through their filters and into the air.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Class H HEPA vacuum',
    category: 'Safe Working & PPE',
  },
  {
    id: 133,
    question:
      'Which HSE guidance document provides task-specific information sheets for non-licensed asbestos work?',
    options: [
      "HSG248 — Asbestos: The Analysts' Guide",
      'HSG210 — Asbestos Essentials',
      'HSG264 — Asbestos: The Survey Guide',
      'L143 — Managing and Working with Asbestos',
    ],
    correctAnswer: 1,
    explanation:
      "HSG210, known as 'Asbestos Essentials', provides task-specific guidance sheets for non-licensed asbestos work. It contains equipment and method (EM) sheets that describe how to carry out common tasks safely, making it an essential reference for anyone undertaking non-licensed asbestos work.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'HSE Asbestos Essentials HSG210',
    category: 'Safe Working & PPE',
  },
  {
    id: 134,
    question: 'What is shadow vacuuming?',
    options: [
      'Vacuuming the whole of the work area with a Class H vacuum once the task has been finished',
      'Spraying water in a fine mist over the material to keep it damp throughout the work',
      'Holding the nozzle of a Class H vacuum close to the point of work to capture fibres as they are released',
      'Sweeping the floor of the enclosure with a soft brush while wearing suitable RPE and coveralls',
    ],
    correctAnswer: 2,
    explanation:
      'Shadow vacuuming involves holding the nozzle of a Class H HEPA vacuum cleaner close to the point where work is being carried out, capturing asbestos fibres at source as they are released. This technique significantly reduces airborne fibre levels in the work area.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Shadow vacuuming',
    category: 'Safe Working & PPE',
  },
  {
    id: 135,
    question:
      'A half-mask respirator fitted with a P3 filter has an Assigned Protection Factor (APF) of what value?',
    options: ['APF 10', 'APF 100', 'APF 40', 'APF 20'],
    correctAnswer: 3,
    explanation:
      "A half-mask respirator fitted with P3 filters has an APF of 20, the same as an FFP3 disposable respirator. Both reduce the wearer's exposure by a factor of 20. For higher protection, a full-face mask with P3 filters (APF 40) or powered air-purifying respirator (APF 40) would be required.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'RPE types',
    category: 'Safe Working & PPE',
  },
  {
    id: 136,
    question:
      'What is the Assigned Protection Factor (APF) of a full-face respirator fitted with a P3 filter?',
    options: ['APF 40', 'APF 20', 'APF 10', 'APF 100'],
    correctAnswer: 0,
    explanation:
      'A full-face respirator fitted with P3 filters has an APF of 40, meaning it reduces exposure by a factor of 40. This is double the protection offered by a half-mask P3 or FFP3 disposable (APF 20) and is required for higher-risk work where fibre levels may be elevated.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'RPE types',
    category: 'Safe Working & PPE',
  },
  {
    id: 137,
    question:
      'What APF does a powered air-purifying respirator (PAPR) with a P3 filter typically provide?',
    options: ['APF 10', 'APF 40', 'APF 20', 'APF 200'],
    correctAnswer: 1,
    explanation:
      'A powered air-purifying respirator (PAPR) with P3 filtration typically provides an APF of 40. PAPRs use a battery-powered fan to draw air through the filter, making breathing easier and more comfortable during extended work periods. They are particularly useful for workers who cannot achieve a good face-fit with tight-fitting masks.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'RPE types',
    category: 'Safe Working & PPE',
  },
  {
    id: 138,
    question:
      'Which of the following is the correct order for the 7-step decontamination sequence when leaving an asbestos work area?',
    options: [
      'Remove RPE, remove coveralls, wash hands, vacuum coveralls, remove boot covers, remove gloves, shower',
      'Remove coveralls, remove gloves, remove RPE, remove boot covers, shower, wash hands, dry off',
      'Vacuum coveralls, remove boot covers, remove outer gloves, remove coveralls, remove inner gloves, wash/shower, remove RPE',
      'Shower, remove RPE, remove coveralls, remove gloves, remove boot covers, vacuum down, wash hands',
    ],
    correctAnswer: 2,
    explanation:
      'The correct 7-step decontamination sequence is: (1) vacuum coveralls whilst still wearing all PPE, (2) remove boot covers, (3) remove outer gloves, (4) remove coveralls (rolling inside out), (5) remove inner gloves, (6) wash or shower, (7) remove RPE last. The RPE is always the last item removed to maintain respiratory protection throughout decontamination.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: '7-step decontamination sequence',
    category: 'Safe Working & PPE',
  },
  {
    id: 139,
    question: 'Why must RPE be the last item of PPE removed during decontamination?',
    options: [
      'Because the RPE is the most expensive item and must be protected from damage',
      'Because the RPE must be kept clean so that it can be reused on the following day’s job',
      "Because removing the RPE first would trigger the negative pressure unit's low-pressure alarm",
      "Because airborne fibres may still be present on the worker's body and clothing during decontamination",
    ],
    correctAnswer: 3,
    explanation:
      'RPE must be the last item removed because asbestos fibres may still be present in the air around the worker during the decontamination process. Removing coveralls, gloves, and boot covers can disturb fibres trapped on these items. Keeping the respirator on until last ensures continued respiratory protection throughout.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: '7-step decontamination sequence',
    category: 'Safe Working & PPE',
  },
  {
    id: 140,
    question: 'What is the glove bag technique used for?',
    options: [
      'Enclosing small-scale asbestos removal tasks such as removing lagging from pipes',
      'Collecting bulk samples of soil for contamination testing',
      'Storing contaminated clothing at the end of the working day',
      'Protecting the hands when handling sharp asbestos cement sheets',
    ],
    correctAnswer: 0,
    explanation:
      'The glove bag technique uses a specially designed polyethylene bag fitted with integral gloves to enclose small-scale asbestos removal tasks, such as removing lagging from pipes, valves, or similar fittings. It provides a sealed environment that contains fibre release, protecting both the worker and the surrounding area.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Glove bag technique',
    category: 'Safe Working & PPE',
  },
  {
    id: 141,
    question:
      'When preparing a work area for asbestos removal, which of the following measures should be taken?',
    options: [
      'Open all the windows and doors to ventilate the work area before the work starts',
      'Seal off the area with polythene sheeting and warning signs, and set up a decontamination unit',
      'Switch on the building’s air conditioning system to dilute any fibres released',
      'Leave the area open so that the other trades on site can carry on working nearby',
    ],
    correctAnswer: 1,
    explanation:
      'Work area preparation for asbestos removal involves sealing the area with polythene sheeting (typically 1000-gauge), displaying warning signs, removing movable items or covering fixed items with polythene, setting up negative pressure units where required, and establishing a decontamination facility. Opening windows would spread fibres outside the controlled area.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Work area preparation',
    category: 'Safe Working & PPE',
  },
  {
    id: 142,
    question:
      'Which of the following is a prohibited practice when working with asbestos-containing materials?',
    options: [
      'Using a pump-action spray to dampen materials',
      'Using a Class H vacuum for dust collection',
      'Using compressed air to clean dust from surfaces',
      'Using hand tools for careful removal',
    ],
    correctAnswer: 2,
    explanation:
      'Using compressed air to clean dust from surfaces is strictly prohibited when working with asbestos. Compressed air blasts fibres into the air at high velocity, creating dangerous airborne concentrations. Similarly, dry sweeping and the use of standard vacuums are prohibited. Only Class H HEPA vacuums and damp wiping should be used for cleaning.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Prohibited tools',
    category: 'Safe Working & PPE',
  },
  {
    id: 143,
    question: 'What is the primary purpose of a dynamic risk assessment during asbestos work?',
    options: [
      'To calculate the financial cost of the asbestos removal project',
      'To replace the need for a written risk assessment',
      'To determine whether the building should be demolished',
      'To continuously reassess risks as conditions change during the work',
    ],
    correctAnswer: 3,
    explanation:
      'A dynamic risk assessment is an ongoing process of identifying and responding to new hazards as they arise during the work. Conditions on site can change — for example, material may be in worse condition than expected, or unforeseen asbestos may be discovered. Workers must be trained to recognise these changes and adapt their approach accordingly.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Dynamic risk assessment',
    category: 'Safe Working & PPE',
  },
  {
    id: 144,
    question:
      'A task-specific risk assessment for asbestos work must consider which of the following?',
    options: [
      'The type of asbestos, its condition, the extent of work, and the likelihood of fibre release',
      'The market value of the building and the annual rental income it produces',
      'The names of all the previous contractors who have worked in the building',
      'The colour scheme and decorative finish of the surrounding rooms and corridors',
    ],
    correctAnswer: 0,
    explanation:
      'A task-specific risk assessment must consider multiple factors: the type of asbestos present, its condition (friable or bonded), the extent and nature of the work, the likelihood and degree of fibre release, the number of workers potentially exposed, and the control measures required. All these factors determine the appropriate precautions.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Task-specific risk assessment',
    category: 'Safe Working & PPE',
  },
  {
    id: 145,
    question: 'For non-licensed asbestos work, which of the following statements is correct?',
    options: [
      'No risk assessment, no training and no RPE are required for non-licensed asbestos work',
      'Workers must still follow safe working procedures but do not need an HSE licence or to notify HSE',
      'Non-licensed work may be carried out without any controls, training or supervision',
      'Non-licensed work always requires 14 days’ written notice to be given to the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Non-licensed work is the lowest risk category, but it still requires a risk assessment, safe working procedures, appropriate RPE and PPE, and proper waste disposal. The key difference is that workers do not need an HSE licence and do not need to notify HSE via ASB5 (which is required for NNLW). No asbestos work is exempt from basic safety precautions.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Non-licensed work requirements',
    category: 'Safe Working & PPE',
  },
  {
    id: 146,
    question: 'Which type of enclosure is used for large-scale licensed asbestos removal?',
    options: [
      'An open work area cordoned off with barrier tape and asbestos warning signs at each entrance',
      'A simple polythene dust sheet draped loosely over the work area and taped down at the edges',
      'A full enclosure constructed from polythene sheeting with an airlock entry, maintained under negative pressure',
      'A glove bag sealed over the individual section of structural steelwork being worked on at the time',
    ],
    correctAnswer: 2,
    explanation:
      'Large-scale licensed asbestos removal uses a full enclosure constructed from polythene sheeting, typically with a three-stage airlock entry system and maintained under negative pressure by air extraction units fitted with HEPA filters. This prevents fibres escaping the work area. The enclosure must pass a smoke test before work begins to confirm it is airtight.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Enclosures',
    category: 'Safe Working & PPE',
  },
  {
    id: 147,
    question: 'Why should two pairs of gloves be worn during asbestos work?',
    options: [
      'To provide extra insulation against the cold when working inside an unheated enclosure for long periods',
      'To double the chemical resistance of the gloves against the wetting agent sprayed on the material',
      'Because a single pair of disposable gloves is dissolved by contact with asbestos fibres and dust',
      'To allow the outer pair to be removed during decontamination while maintaining hand protection with the inner pair',
    ],
    correctAnswer: 3,
    explanation:
      'Two pairs of gloves are worn so that the contaminated outer pair can be removed during the decontamination sequence while the inner pair continues to protect the hands from residual contamination. The inner gloves are then removed separately before washing, maintaining a barrier between contaminated surfaces and skin throughout the process.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'PPE',
    category: 'Safe Working & PPE',
  },
  {
    id: 148,
    question: 'What must happen before any tight-fitting RPE is used for asbestos work?',
    options: [
      'The wearer must pass a qualitative or quantitative face-fit test for that specific make and model of RPE',
      'The wearer must be examined by an occupational health doctor and declared fit to wear RPE',
      'The mask must be soaked in a disinfectant solution for 24 hours before it is first used',
      'The wearer must obtain written permission from the HSE for that particular make and model',
    ],
    correctAnswer: 0,
    explanation:
      'Before using tight-fitting RPE for asbestos work, each wearer must pass a face-fit test for the specific make and model they will use. Face-fit testing can be qualitative (taste test) or quantitative (using measurement equipment). A new test is required if the wearer changes to a different make or model, or if their facial features change significantly.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Face-fit testing',
    category: 'Safe Working & PPE',
  },
  {
    id: 149,
    question: 'HSG210 Asbestos Essentials provides task sheets categorised by which system?',
    options: [
      'Numbered chapters arranged by the age of the building and its construction date',
      'Equipment and method (EM) sheets and task guidance sheets organised by material type and task',
      'Colour-coded cards arranged by the type of asbestos-related disease involved',
      'Regional sheets arranged by the local HSE enforcement office covering the site',
    ],
    correctAnswer: 1,
    explanation:
      'HSG210 Asbestos Essentials provides equipment and method (EM) sheets that describe the equipment and methods needed, along with task guidance sheets organised by the type of asbestos material and the specific task to be carried out. This practical structure helps duty holders select the right precautions for each job.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'HSE Asbestos Essentials HSG210',
    category: 'Safe Working & PPE',
  },
  {
    id: 150,
    question:
      'Which of the following actions should be taken during a face-fit check (seal check) each time RPE is put on?',
    options: [
      'Blow outward hard and check for any leaks around the edge of the face seal',
      'Spray a perfumed aerosol close to the mask and check for any odour penetration',
      'Inhale sharply while covering the filters to check the mask draws inward against the face',
      'Shake the head vigorously from side to side to see if the mask falls off',
    ],
    correctAnswer: 2,
    explanation:
      'A fit check (not to be confused with a fit test) should be performed every time RPE is donned. The wearer covers the filters and inhales sharply — if the mask draws inward against the face and holds, it indicates a good seal. This quick check helps identify obvious leaks before entering the work area, though it does not replace a formal face-fit test.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Face-fit testing',
    category: 'Safe Working & PPE',
  },
  {
    id: 151,
    question:
      'Why are standard domestic or commercial vacuum cleaners prohibited for cleaning up asbestos dust?',
    options: [
      'They are not powerful enough to lift the heavier asbestos debris from the enclosure floor',
      'They are too expensive to write off after being used on a single asbestos removal job',
      'They generate static electricity in the hose that can ignite airborne asbestos fibres',
      'Their filters cannot trap asbestos fibres, so they exhaust contaminated air back into the environment',
    ],
    correctAnswer: 3,
    explanation:
      'Standard vacuum cleaners lack HEPA filtration and cannot trap asbestos fibres, which are typically 0.1 to 10 micrometres in size. The fibres pass straight through ordinary filters and are blown back into the air, actually increasing airborne contamination. Only Class H vacuum cleaners with HEPA filters (99.995% efficiency) may be used.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Prohibited tools',
    category: 'Safe Working & PPE',
  },
  {
    id: 152,
    question:
      'Licensed asbestos work requires notification to HSE at least how many days before work commences?',
    options: ['14 days', '7 days', '21 days', '28 days'],
    correctAnswer: 0,
    explanation:
      'Licensed asbestos work requires notification to HSE at least 14 days before the work is due to start. This notification period allows HSE to review the plan of work and, if necessary, inspect the site before work begins. In some exceptional circumstances, the 14-day period may be reduced with HSE agreement.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Licensed work requirements',
    category: 'Safe Working & PPE',
  },
  {
    id: 153,
    question:
      'A worker discovers that the asbestos material they are working on is in significantly worse condition than described in the risk assessment. What should they do?',
    options: [
      'Carry on working faster so as to finish the task before conditions get any worse still',
      'Stop work immediately, leave the area, and report the situation so the risk assessment can be reviewed',
      'Quietly amend the method statement on site and carry on with the work as originally planned',
      'Note the difference in the site diary and raise it at the end of the shift',
    ],
    correctAnswer: 1,
    explanation:
      'If conditions differ from those described in the risk assessment, work must stop immediately. This is a key element of dynamic risk assessment — workers must be empowered to halt work when unexpected conditions are found. The area should be made safe, all workers should leave, and the risk assessment and method statement must be reviewed before work can resume.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Dynamic risk assessment',
    category: 'Safe Working & PPE',
  },
  {
    id: 154,
    question:
      'During a licensed asbestos removal project, the negative pressure unit fails. What is the correct immediate action?',
    options: [
      'Open the enclosure to let fresh air in and carry on working until the end of the shift, then report the fault to the supervisor',
      'Carry on working, but ask everyone inside the enclosure to fit a second respirator over the first and work faster to finish sooner',
      'Stop all work immediately, seal the enclosure, and do not resume until the NPU is repaired or replaced and negative pressure is re-established',
      'Switch the NPU off at the mains and finish the job without it, double-bagging the waste as the work proceeds to avoid delay',
    ],
    correctAnswer: 2,
    explanation:
      'If the negative pressure unit (NPU) fails, all work must stop immediately. Negative pressure prevents fibre escape from the enclosure — without it, fibres could leak into surrounding areas through any imperfections in the enclosure. The enclosure must be sealed, and work cannot resume until the NPU is repaired or replaced and negative pressure is confirmed.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Enclosures',
    category: 'Safe Working & PPE',
  },
  {
    id: 155,
    question:
      'A contractor claims their workers do not need face-fit testing because they use loose-fitting powered air-purifying respirators (PAPRs). Is this correct?',
    options: [
      'No — all powered respirators require face-fit testing, without any exception',
      'No — loose-fitting devices require face-fit testing even more frequently than tight-fitting ones',
      'Yes — but only if the wearer is also clean-shaven on each day the work is done',
      'Yes — loose-fitting PAPRs do not require face-fit testing as they do not rely on a face seal',
    ],
    correctAnswer: 3,
    explanation:
      'This is correct. Loose-fitting powered air-purifying respirators do not require face-fit testing because they do not rely on a seal against the face. They provide protection by delivering a continuous flow of filtered air across the face and maintaining positive pressure inside the headpiece. This also makes them suitable for workers with facial hair, which would compromise the seal of tight-fitting RPE.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Face-fit testing',
    category: 'Safe Working & PPE',
  },
  {
    id: 156,
    question:
      'A method statement for removing asbestos insulation board (AIB) from a ceiling specifies using a glove bag. A senior operative on site suggests it would be quicker to bring the boards down by hand with wet methods. What is the correct response?',
    options: [
      'Follow the method statement — any change to the agreed safe system of work must be reviewed and approved before it is used',
      'Adopt the senior operative’s faster method, on the basis that practical site experience overrides the paperwork in practice',
      'Let each worker choose whichever removal method they personally prefer, provided the work area is fully enclosed',
      'Switch to the faster method only if the client agrees in writing to the time and cost savings involved beforehand',
    ],
    correctAnswer: 0,
    explanation:
      'The method statement is a formally agreed safe system of work that must be followed. Any proposed change — even if suggested by an experienced operative — must go through a formal review process. The risk assessment would need to be revisited, the method statement amended, and the revised approach approved before implementation. Deviating from the method statement on site is a serious breach of procedure.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'RAMS for asbestos work',
    category: 'Safe Working & PPE',
  },
  {
    id: 157,
    question:
      'When selecting RPE for asbestos work, the exposure level is estimated to be 3 times the workplace exposure limit (WEL). Which is the minimum acceptable RPE?',
    options: [
      'FFP2 disposable mask (APF 10)',
      'FFP3 disposable mask (APF 20)',
      'Full-face mask with P3 filter (APF 40)',
      'Supplied-air breathing apparatus (APF 2000)',
    ],
    correctAnswer: 1,
    explanation:
      'When exposure is 3 times the WEL, RPE with an APF of at least 3 would mathematically suffice, but an FFP3 (APF 20) is the minimum acceptable standard for any asbestos work. The APF must exceed the estimated exposure multiple. An FFP3 with APF 20 provides a significant margin of safety. FFP2 masks are never acceptable for asbestos work.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'RPE types',
    category: 'Safe Working & PPE',
  },
  {
    id: 158,
    question:
      'During a smoke test of an asbestos removal enclosure, smoke is seen escaping from a corner joint. What must happen?',
    options: [
      'The smoke is harmless, so work can begin while the leak is monitored from outside the enclosure',
      'A small leak is acceptable provided the negative pressure unit is left running throughout the work',
      'The leak must be sealed and the smoke test repeated — the enclosure must pass before any asbestos work can begin',
      'The enclosure should be dismantled and the job carried out in the open air with wet methods instead',
    ],
    correctAnswer: 2,
    explanation:
      'A smoke test verifies the integrity of the enclosure. If smoke escapes, the enclosure has failed the test. The leak must be identified, repaired, and the smoke test repeated. The enclosure must achieve a complete pass — no visible smoke escape — before any asbestos removal work can begin. Starting work in a compromised enclosure would risk fibre escape into occupied areas.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Enclosures',
    category: 'Safe Working & PPE',
  },
  {
    id: 159,
    question:
      'A worker has been face-fit tested with a Brand X FFP3 disposable respirator. Their employer purchases Brand Y FFP3 respirators as they are cheaper. Can the worker use the Brand Y respirator based on the existing face-fit test?',
    options: [
      'Yes — both are FFP3 masks, so the existing test transfers across',
      'Yes — provided the worker performs a quick fit check before use',
      'Yes — as long as the Brand Y mask is the same size as Brand X',
      'No — face-fit testing is specific to the make and model',
    ],
    correctAnswer: 3,
    explanation:
      'Face-fit testing is specific to the exact make and model of RPE. Different manufacturers use different mould shapes, seal designs, and materials, meaning a mask that fits one worker perfectly from one brand may not seal properly from another. The worker must undergo a new face-fit test with the Brand Y respirator before using it for asbestos work.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Face-fit testing',
    category: 'Safe Working & PPE',
  },
  {
    id: 160,
    question:
      'Medical surveillance for workers undertaking licensed asbestos work must include examinations at which intervals?',
    options: [
      'An initial medical examination before first exposure',
      'A single examination on the final day of each individual project',
      'An examination only if the worker reports breathing difficulties',
      'An examination every 10 years from the date of first exposure',
    ],
    correctAnswer: 0,
    explanation:
      'Workers carrying out licensed asbestos work must have a medical examination before first exposure to asbestos and at least every 2 years thereafter. The examination is carried out by a doctor appointed by HSE (an appointed doctor) and includes a respiratory questionnaire and lung function test. A certificate of fitness is issued and must be available on site.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Licensed work requirements',
    category: 'Safe Working & PPE',
  },
  // =======================================================================
  // EMERGENCY PROCEDURES — 40 questions (id 161–200)
  // =======================================================================
  {
    id: 161,
    question: "What does the first 'S' in the 4-S emergency procedure stand for?",
    options: [
      'SEAL the affected area',
      'STOP all work immediately',
      'SIGN the area with warning notices',
      'SUMMON specialist help',
    ],
    correctAnswer: 1,
    explanation:
      'The first step of the 4-S emergency procedure is to STOP all work immediately. This prevents further disturbance of the suspected asbestos-containing material and limits fibre release into the atmosphere.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: '4-S emergency procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 162,
    question:
      'In the correct order, what are the four steps of the 4-S emergency procedure for accidental asbestos disturbance?',
    options: [
      'STOP, SIGN, SEAL, SUMMON',
      'SEAL, STOP, SIGN, SUMMON',
      'STOP, SEAL, SIGN, SUMMON',
      'SUMMON, STOP, SEAL, SIGN',
    ],
    correctAnswer: 2,
    explanation:
      'The 4-S procedure must be followed in order: STOP all work, SEAL the area to prevent fibre spread, SIGN the area with warning notices to prevent entry, and SUMMON specialist help such as a licensed asbestos contractor.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: '4-S emergency procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 163,
    question: "What constitutes an 'accidental disturbance' of asbestos?",
    options: [
      'A planned removal of asbestos carried out under an HSE licence and a plan of work',
      'A scheduled survey visit to sample suspect materials for laboratory analysis',
      'The natural weathering of asbestos cement roof sheeting left undisturbed outdoors',
      'Any unplanned activity that damages or disturbs known or suspected asbestos-containing materials',
    ],
    correctAnswer: 3,
    explanation:
      'An accidental disturbance is any unplanned activity that damages or disturbs known or suspected asbestos-containing materials. This can include drilling, cutting, sanding, or any work that breaks the surface of ACMs, regardless of scale.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Accidental disturbance definition',
    category: 'Emergency Procedures',
  },
  {
    id: 164,
    question:
      'When sealing an area after accidental asbestos disturbance, what is the primary purpose?',
    options: [
      'To prevent the spread of asbestos fibres to other areas',
      'To allow ventilation systems to clear the fibres',
      'To create a workspace for immediate repairs',
      'To hide the damage from inspectors',
    ],
    correctAnswer: 0,
    explanation:
      'Sealing the area after accidental disturbance is primarily to prevent the spread of asbestos fibres to other parts of the building. This involves closing doors and windows, shutting down ventilation systems, and using polythene sheeting if available to isolate the affected zone.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: '4-S emergency procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 165,
    question:
      'After stopping work following accidental asbestos disturbance, what should you do with any mechanical ventilation or air conditioning systems in the area?',
    options: [
      'Turn them up to maximum to dilute the fibres in the air',
      'Switch them off to prevent fibre spread through ductwork',
      'Leave them running exactly as they are and ignore them',
      'Open all the air vents to draw fresh air into the area',
    ],
    correctAnswer: 1,
    explanation:
      'Mechanical ventilation and air conditioning systems must be switched off immediately to prevent asbestos fibres being circulated through ductwork to other parts of the building. Leaving them running could contaminate a much larger area.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Immediate actions',
    category: 'Emergency Procedures',
  },
  {
    id: 166,
    question:
      'Who should be summoned as specialist help following an accidental asbestos disturbance involving licensable work materials?',
    options: [
      "The building's maintenance team",
      'The local fire brigade',
      'A licensed asbestos removal contractor',
      'An environmental health officer only',
    ],
    correctAnswer: 2,
    explanation:
      'A licensed asbestos removal contractor must be summoned for incidents involving licensable asbestos-containing materials. They have the training, equipment, and HSE licence required to safely manage the contamination and carry out remediation work.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Who to call',
    category: 'Emergency Procedures',
  },
  {
    id: 167,
    question: 'Which of the following must be recorded as part of an asbestos incident report?',
    options: [
      'The resale value of the damaged material and the cost of repair',
      'The weather forecast and outdoor temperature on the day',
      'The names of every contractor who has ever worked in the building',
      'The date, time, location, people exposed, material involved, and actions taken',
    ],
    correctAnswer: 3,
    explanation:
      'A thorough incident record must include the date and time of the disturbance, precise location, names of all people potentially exposed, type and condition of material involved, extent of damage, and all actions taken in response. This is essential for RIDDOR reporting and any future health surveillance.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Incident recording',
    category: 'Emergency Procedures',
  },
  {
    id: 168,
    question:
      'Under RIDDOR 2013, accidental release of asbestos fibres into the atmosphere is classified as what type of event?',
    options: [
      'A dangerous occurrence that must be reported to the HSE',
      'A minor incident not requiring reporting',
      'An environmental matter reported to the Environment Agency only',
      'A near miss recorded internally only',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR) 2013, the accidental release or escape of asbestos fibres into the atmosphere is classified as a dangerous occurrence. It must be reported to the HSE without delay.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'RIDDOR reporting',
    category: 'Emergency Procedures',
  },
  {
    id: 169,
    question:
      'How quickly must a RIDDOR dangerous occurrence involving asbestos release be reported to the HSE?',
    options: [
      'Within 28 days of the incident, in writing only',
      'Without delay — by the quickest practicable means',
      'Only at the next routine HSE inspection of the site',
      'Within 12 months, as part of the annual safety report',
    ],
    correctAnswer: 1,
    explanation:
      "Dangerous occurrences, including the accidental release of asbestos fibres, must be reported to the HSE without delay by the quickest practicable means. This is typically done by telephone or online via the HSE's RIDDOR reporting system, followed by a written report within 10 days.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'RIDDOR reporting',
    category: 'Emergency Procedures',
  },
  {
    id: 170,
    question:
      'What is the first step in the personal decontamination sequence after potential asbestos exposure?',
    options: [
      'Shower thoroughly',
      'Remove all clothing and place in a labelled bag',
      'Move to a clean area away from the contamination',
      'Wipe down boots and hard surfaces with damp rags',
    ],
    correctAnswer: 2,
    explanation:
      'The first step in personal decontamination is to move to a clean area away from the contamination zone. This prevents further exposure and cross-contamination before beginning the decontamination steps. You should avoid walking through other occupied areas on the way.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Personal decontamination (7-step sequence)',
    category: 'Emergency Procedures',
  },
  {
    id: 171,
    question:
      'During personal decontamination after asbestos exposure, why should contaminated clothing be dampened before removal?',
    options: [
      'To make the clothing easier to fold and pack away',
      'To cool the worker down after working in a hot enclosure',
      'To dissolve the asbestos fibres trapped in the fabric',
      'To reduce the release of fibres into the air during removal',
    ],
    correctAnswer: 3,
    explanation:
      'Dampening contaminated clothing before removal suppresses asbestos fibres, reducing the number released into the air during the removal process. Dry fibres are easily disturbed and become airborne, increasing the risk of inhalation.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Personal decontamination (7-step sequence)',
    category: 'Emergency Procedures',
  },
  {
    id: 172,
    question:
      'After removing contaminated clothing during decontamination, what should be done with it?',
    options: [
      'Place it in a clearly labelled asbestos waste bag for disposal',
      'Brush it down thoroughly and wear it again the next day',
      'Take it home and wash it with the normal household laundry',
      'Put it in the general site rubbish skip with other waste',
    ],
    correctAnswer: 0,
    explanation:
      'Contaminated clothing must be placed in a clearly labelled asbestos waste bag and disposed of as hazardous waste. It must never be taken home, brushed down, or put through normal laundry, as this would spread contamination.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Personal decontamination (7-step sequence)',
    category: 'Emergency Procedures',
  },
  {
    id: 173,
    question:
      'What is the purpose of the 4-stage clearance procedure following asbestos removal work?',
    options: [
      'To calculate the final cost of the removal project',
      'To verify the area is safe for reoccupation',
      'To test the structural integrity of the building',
      'To confirm the asbestos type that was removed',
    ],
    correctAnswer: 1,
    explanation:
      'The 4-stage clearance procedure is designed to verify that an area is safe for reoccupation after asbestos removal work. It provides a systematic and thorough check that all asbestos has been removed and fibre levels are within acceptable limits.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: '4-stage clearance procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 174,
    question: 'What is Stage 1 of the 4-stage clearance procedure?',
    options: [
      'Final dismantling of the enclosure and removal of all equipment',
      'Reassurance air monitoring to confirm fibre levels are acceptable',
      'A preliminary check of the site and a visual inspection inside the enclosure',
      'Issuing the certificate of reoccupation to the building owner',
    ],
    correctAnswer: 2,
    explanation:
      'Stage 1 is a preliminary check and visual inspection inside the enclosure by the asbestos removal supervisor. This ensures all visible asbestos debris, residues, and contamination have been removed before the independent analyst conducts their inspection.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: '4-stage clearance procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 175,
    question:
      'Who must carry out the Stage 2 visual inspection of the 4-stage clearance procedure?',
    options: [
      'The site labourer who carried out the removal work',
      'The building owner or their managing agent',
      'The HSE inspector for the local enforcement area',
      'An independent analyst holding appropriate UKAS accreditation',
    ],
    correctAnswer: 3,
    explanation:
      'Stage 2 must be carried out by an independent analyst holding appropriate UKAS accreditation. Independence is critical to ensure impartial assessment — the analyst must not be employed by or have a commercial relationship with the removal contractor.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: '4-stage clearance procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 176,
    question: 'What does Stage 3 of the 4-stage clearance procedure involve?',
    options: [
      'Air monitoring (reassurance air testing) to confirm fibre levels are below the clearance indicator',
      'A preliminary visual check by the removal supervisor before the final clean begins',
      'Bulk sampling of any remaining materials for UKAS-accredited laboratory analysis',
      'Final dismantling of the enclosure and disposal of the polythene as asbestos waste',
    ],
    correctAnswer: 0,
    explanation:
      'Stage 3 involves air monitoring (reassurance air testing) to confirm that airborne fibre concentrations have fallen below the clearance indicator level of 0.01 fibres per millilitre of air. This is performed by the independent analyst after the enclosure has passed the Stage 2 visual inspection.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: '4-stage clearance procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 177,
    question:
      'What is the clearance indicator fibre level that must be achieved before an area can be reoccupied after asbestos removal?',
    options: ['Zero fibres/ml', '0.01 fibres/ml', '0.1 fibres/ml', '0.05 fibres/ml'],
    correctAnswer: 1,
    explanation:
      'The clearance indicator is 0.01 fibres per millilitre of air (f/ml). This must be achieved during Stage 3 reassurance air testing before the area can proceed to Stage 4 (final assessment) and be deemed safe for reoccupation.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: '4-stage clearance procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 178,
    question: 'Under UK waste regulations, how is asbestos waste classified?',
    options: [
      'General commercial waste',
      'Recyclable construction waste',
      'Hazardous waste (special waste in Scotland)',
      'Controlled but non-hazardous waste',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos waste is classified as hazardous waste under the Hazardous Waste Regulations 2005 in England and Wales, and as special waste under the Special Waste Regulations 1996 in Scotland. It must be handled, transported, and disposed of accordingly.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Waste classification (hazardous waste)',
    category: 'Emergency Procedures',
  },
  {
    id: 179,
    question: 'What is the purpose of double-bagging asbestos waste?',
    options: [
      'To make the waste lighter and easier to carry off site',
      'To allow the waste to be recycled rather than sent to landfill',
      'To keep the asbestos dry during outdoor storage',
      'To provide an additional layer of containment in case the inner bag is punctured',
    ],
    correctAnswer: 3,
    explanation:
      'Double-bagging provides an additional layer of containment. If the inner bag is punctured or damaged, the outer bag prevents fibres from escaping. The inner bag is sealed inside the contaminated area and the outer bag is applied in the clean area during the bag-out procedure.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Double-bagging procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 180,
    question: 'What colour are the inner bags used for asbestos waste disposal?',
    options: [
      'Red with the asbestos warning label',
      'Yellow with a biohazard symbol',
      'Green with a recycling symbol',
      'Black with no markings',
    ],
    correctAnswer: 0,
    explanation:
      "The inner bags used for asbestos waste are red and clearly marked with the asbestos warning label (white 'a' symbol on a red background). This ensures anyone handling the waste can immediately identify it as containing asbestos.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Double-bagging procedure',
    category: 'Emergency Procedures',
  },
  {
    id: 181,
    question:
      'What document must accompany asbestos waste during transportation to a licensed disposal site?',
    options: [
      'A copy of the asbestos survey report',
      'A consignment note (hazardous waste consignment note)',
      'A clearance certificate for reoccupation',
      'A face-fit test record for the driver',
    ],
    correctAnswer: 1,
    explanation:
      'A hazardous waste consignment note must accompany asbestos waste during transportation. This document tracks the waste from its point of production to its final disposal site, creating a complete audit trail as required by the Hazardous Waste Regulations.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Consignment notes',
    category: 'Emergency Procedures',
  },
  {
    id: 182,
    question: 'How long must consignment notes for asbestos waste disposal be retained?',
    options: ['1 year', '5 years', '3 years', 'Indefinitely'],
    correctAnswer: 2,
    explanation:
      'Consignment notes for hazardous waste, including asbestos, must be retained for a minimum of 3 years. This applies to all parties involved — the waste producer, the carrier, and the disposal site operator — to maintain a full audit trail.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Consignment notes',
    category: 'Emergency Procedures',
  },
  {
    id: 183,
    question: 'Who is legally permitted to transport asbestos waste?',
    options: [
      'Any member of the public with a suitable vehicle',
      'The site labourer who removed the asbestos, in their own van',
      'Any general builders’ merchant delivering to the site',
      'A registered waste carrier holding appropriate authorisation',
    ],
    correctAnswer: 3,
    explanation:
      'Only registered waste carriers holding appropriate authorisation from the Environment Agency (or equivalent in Scotland/Wales) are legally permitted to transport asbestos waste. Using unregistered carriers is a criminal offence under the Environmental Protection Act 1990.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Licensed waste carriers',
    category: 'Emergency Procedures',
  },
  {
    id: 184,
    question:
      'What specific packaging requirement applies to asbestos-containing waste that could release fibres during handling?',
    options: [
      'It must be sealed in UN-approved packaging or double-bagged in heavy-duty polythene',
      'It may be placed loose in any ordinary builders’ rubble skip',
      'It can be wrapped in a single layer of newspaper and taped',
      'It must be left uncovered so inspectors can identify the contents',
    ],
    correctAnswer: 0,
    explanation:
      'Asbestos waste that could release fibres must be sealed in UN-approved packaging or double-bagged in heavy-duty polythene bags (minimum 1000 gauge). Larger items like asbestos cement sheets must be wrapped in heavy-duty polythene and sealed with tape.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Waste packaging requirements',
    category: 'Emergency Procedures',
  },
  {
    id: 185,
    question:
      'Under the Control of Asbestos Regulations 2012, who is responsible for arranging health surveillance for workers exposed to asbestos?',
    options: ['The workers themselves', 'The employer', 'The HSE directly', 'The local authority'],
    correctAnswer: 1,
    explanation:
      'Under Regulation 22 of the Control of Asbestos Regulations 2012, the employer is responsible for ensuring adequate health surveillance is provided for employees who are, or are liable to be, exposed to asbestos above specified levels or who carry out licensable work with asbestos.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Health surveillance requirements',
    category: 'Emergency Procedures',
  },
  {
    id: 186,
    question: 'What does a medical examination for asbestos workers typically include?',
    options: [
      'An eyesight test and a hearing assessment carried out by an occupational nurse',
      'A blood test to measure the level of asbestos fibres circulating in the body',
      'A questionnaire on respiratory symptoms, a physical examination, and lung function tests',
      'A skin allergy test for sensitivity to the wetting agents used on site',
    ],
    correctAnswer: 2,
    explanation:
      'A medical examination for asbestos workers typically includes a questionnaire covering respiratory symptoms and occupational history, a physical examination of the chest, and lung function tests (spirometry). The purpose is to establish a baseline and detect early signs of asbestos-related disease.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Medical examination content',
    category: 'Emergency Procedures',
  },
  {
    id: 187,
    question:
      'How often must workers who carry out licensable asbestos work undergo medical examinations?',
    options: ['Every 6 months', 'Every year', 'Every 5 years', 'At least every 2 years'],
    correctAnswer: 3,
    explanation:
      'Workers carrying out licensable asbestos work must undergo a medical examination before starting such work and at least every 2 years thereafter. More frequent examinations may be recommended by the appointed doctor based on individual circumstances.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Health surveillance requirements',
    category: 'Emergency Procedures',
  },
  {
    id: 188,
    question:
      'What is the purpose of lung function testing (spirometry) in asbestos health surveillance?',
    options: [
      'To establish a baseline and detect any decline in lung capacity that may indicate asbestos-related disease',
      "To measure the concentration of asbestos fibres in the air of the worker's workplace over a shift",
      'To confirm that the worker has passed the face-fit test for the RPE they have been issued',
      "To check the worker's blood pressure and resting heart rate before each asbestos removal job",
    ],
    correctAnswer: 0,
    explanation:
      'Spirometry establishes a baseline measurement of lung function and allows detection of any progressive decline in lung capacity. A reduction in lung function over time may indicate developing asbestosis or other asbestos-related conditions, enabling early intervention.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Lung function tests',
    category: 'Emergency Procedures',
  },
  {
    id: 189,
    question: 'When a worker is exposed to asbestos at work, should their GP be informed?',
    options: [
      'No, exposure is confidential and should not be shared with a GP',
      'Yes, the worker should inform their GP so it can be noted on their medical records',
      'No, the GP can only be told if the worker develops symptoms',
      'Only if the worker is over 50 years of age at the time',
    ],
    correctAnswer: 1,
    explanation:
      'Workers should inform their GP about any workplace asbestos exposure so it can be recorded on their medical records. This is important for long-term health monitoring, as asbestos-related diseases can develop 15–60 years after exposure and GPs need to be aware of the exposure history.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'GP notification',
    category: 'Emergency Procedures',
  },
  {
    id: 190,
    question:
      'For how long must employers retain health surveillance records for workers exposed to asbestos?',
    options: [
      '3 years from the date of the last entry',
      '10 years from the date of the last entry',
      '40 years from the date of the last entry',
      '5 years from the date of the last entry',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance records must be retained for at least 40 years from the date of the last entry. This extended period reflects the very long latency of asbestos-related diseases, which can take decades to develop after initial exposure.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Record keeping (40 years)',
    category: 'Emergency Procedures',
  },
  {
    id: 191,
    question: 'What is IIDB in the context of asbestos-related compensation?',
    options: [
      'Independent Inspection of Demolition Buildings — a voluntary pre-demolition survey scheme run by the HSE',
      'Internal Industry Database of Banned substances — a register of banned materials held by the HSE',
      'Initial Identification of Damaged Boards — a stage in a refurbishment and demolition survey',
      'Industrial Injuries Disablement Benefit — a government benefit for people with prescribed industrial diseases',
    ],
    correctAnswer: 3,
    explanation:
      'IIDB (Industrial Injuries Disablement Benefit) is a government benefit available to people who have a prescribed industrial disease, including asbestos-related conditions such as mesothelioma, asbestosis, and diffuse pleural thickening. It is administered by the Department for Work and Pensions.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Compensation routes (IIDB, civil claims, DMPS)',
    category: 'Emergency Procedures',
  },
  {
    id: 192,
    question: 'What is the Diffuse Mesothelioma Payment Scheme (DMPS)?',
    options: [
      'A compensation scheme for mesothelioma sufferers who cannot trace a liable employer or their insurer',
      'A government scheme that funds the removal of asbestos from privately owned homes',
      'A training scheme for workers entering the licensed asbestos removal industry in the UK',
      'A medical research scheme that develops new treatments for mesothelioma patients',
    ],
    correctAnswer: 0,
    explanation:
      "The Diffuse Mesothelioma Payment Scheme (DMPS) provides lump-sum compensation payments to people with diffuse mesothelioma who are unable to claim against a liable employer or their employer's liability insurer, for example because the employer no longer exists.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Compensation routes (IIDB, civil claims, DMPS)',
    category: 'Emergency Procedures',
  },
  {
    id: 193,
    question:
      "Under the Control of Asbestos Regulations 2012, which of the following is an employer's duty?",
    options: [
      'To require workers to purchase their own RPE and arrange their own training',
      'To provide suitable RPE, training, and health surveillance for workers exposed to asbestos',
      'To personally carry out the laboratory analysis of any samples that are taken',
      'To report directly to the HSE in writing before each individual asbestos task',
    ],
    correctAnswer: 1,
    explanation:
      'Employers have a duty to provide suitable respiratory protective equipment (RPE), adequate training, and health surveillance for workers who are or may be exposed to asbestos. They must also ensure exposure is reduced to as low as reasonably practicable and kept below the control limit.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Employer duties',
    category: 'Emergency Procedures',
  },
  {
    id: 194,
    question: "What is an employee's duty regarding asbestos safety at work?",
    options: [
      "To write the company's asbestos management plan and its risk assessments",
      'To carry out their own medical examinations and keep their own records',
      "To cooperate with their employer's safety measures and use PPE and RPE provided correctly",
      'To purchase and maintain all of the control equipment used on the site',
    ],
    correctAnswer: 2,
    explanation:
      "Employees have a duty to cooperate with their employer's safety measures, use PPE and RPE provided correctly, follow safe systems of work, report any defects in equipment, and not carry out work on materials they suspect contain asbestos without proper authorisation.",
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Employee duties',
    category: 'Emergency Procedures',
  },
  {
    id: 195,
    question:
      "Under Regulation 4 of the Control of Asbestos Regulations 2012, who is the 'dutyholder' responsible for managing asbestos in non-domestic premises?",
    options: [
      'The HSE inspector who is responsible for enforcement in the local authority area',
      'The independent analyst who carries out the four-stage clearance and air testing',
      'The licensed contractor who is appointed to remove the asbestos from the premises',
      'The person who has the duty to maintain or repair the premises, or who has control of the premises',
    ],
    correctAnswer: 3,
    explanation:
      'The dutyholder is the person who has the duty to maintain or repair non-domestic premises by virtue of a contract or tenancy, or who has control of the premises. This could be the building owner, tenant, or managing agent depending on contractual arrangements.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Dutyholder responsibilities',
    category: 'Emergency Procedures',
  },
  {
    id: 196,
    question:
      'Under CDM 2015, what duty does a client have regarding asbestos before commissioning construction work?',
    options: [
      'To provide pre-construction information including details of any known asbestos in the building',
      'To personally remove any asbestos from the building before contractors arrive',
      'To carry out the clearance air testing once the construction work is complete',
      'To obtain an HSE licence on behalf of the appointed principal contractor first',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Construction (Design and Management) Regulations 2015, the client must provide pre-construction information to designers and contractors. This includes details of any known or suspected asbestos-containing materials, informed by the asbestos register and management survey.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'CDM 2015 client duties',
    category: 'Emergency Procedures',
  },
  {
    id: 197,
    question: 'What is an HSE Improvement Notice?',
    options: [
      'A notice that immediately stops a dangerous work activity on the spot, with no time limit for compliance',
      'A formal notice requiring a dutyholder to remedy a contravention of health and safety law within a specified time',
      'A voluntary letter setting out suggested good practice, which carries no legal force at all in itself',
      'A notice that automatically prosecutes the dutyholder in the Crown Court without any hearing',
    ],
    correctAnswer: 1,
    explanation:
      'An Improvement Notice is served by an HSE inspector when they identify a contravention of health and safety legislation. It requires the dutyholder to remedy the contravention within a specified period. Failure to comply is a criminal offence.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'HSE enforcement',
    category: 'Emergency Procedures',
  },
  {
    id: 198,
    question: 'When can an HSE inspector issue a Prohibition Notice in relation to asbestos work?',
    options: [
      'Only after the work has finished and a breach of the regulations has been confirmed in writing',
      'Where minor paperwork errors have been found in the site records and the asbestos register',
      'When there is a risk of serious personal injury from the work activity, requiring it to stop immediately',
      'When the dutyholder has already been prosecuted for a similar breach on a previous site',
    ],
    correctAnswer: 2,
    explanation:
      'An HSE inspector can issue a Prohibition Notice when they believe a work activity involves, or will involve, a risk of serious personal injury. The notice can take effect immediately, stopping the activity until the matter is remedied. It applies to any asbestos-related work, not just licensed work.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'HSE enforcement',
    category: 'Emergency Procedures',
  },
  {
    id: 199,
    question:
      'Under the Public Interest Disclosure Act 1998 (PIDA), what protection is given to a worker who reports unsafe asbestos practices?',
    options: [
      'A cash reward equal to any fine that is imposed on the employer following a prosecution',
      'Automatic promotion to a supervisory health and safety role within the same organisation',
      'Exemption from any further asbestos work for that employer, without any loss of pay or status',
      'Protection from dismissal or detriment for making a qualifying disclosure about health and safety dangers',
    ],
    correctAnswer: 3,
    explanation:
      'The Public Interest Disclosure Act 1998 (PIDA) protects workers (whistleblowers) from dismissal or other detriment if they make a qualifying disclosure about health and safety dangers in the workplace. This includes reporting unsafe asbestos working practices to the employer or a prescribed body such as the HSE.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Whistleblowing rights (PIDA)',
    category: 'Emergency Procedures',
  },
  {
    id: 200,
    question:
      'How often should asbestos awareness refresher training be provided to workers who may encounter asbestos-containing materials?',
    options: [
      'At least annually, or whenever there is a significant change in working practices or legislation',
      'Once only, at induction, with no further refresher training needed after that at all',
      'Every five years, regardless of any change in working practices or in the law',
      'Only after a worker has been accidentally exposed to asbestos fibres on a job',
    ],
    correctAnswer: 0,
    explanation:
      'HSE guidance recommends that asbestos awareness refresher training should be provided at least annually, or whenever there are significant changes in working practices, legislation, or the type of work being undertaken. Annual refreshers ensure knowledge remains current and workers stay alert to asbestos risks.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Refresher training requirements',
    category: 'Emergency Procedures',
  },
  {
    id: 201,
    question:
      "Under CAR 2012, exposure is 'sporadic and of low intensity' where the airborne concentration does not exceed what?",
    options: [
      '0.6 fibres per cubic centimetre measured over ten minutes',
      '0.1 fibres per cubic centimetre measured over four hours',
      '1.0 fibres per cubic centimetre measured over one hour',
      '0.3 fibres per cubic centimetre measured over thirty minutes',
    ],
    correctAnswer: 0,
    explanation:
      'The ACOP sets this at 0.6 fibres per cubic centimetre measured over a ten-minute period. It matters because sporadic and low intensity exposure is one of the conditions that can take work outside the notification, medical surveillance and record-keeping requirements — get it wrong and the wrong regime is applied.',
    difficulty: 'advanced',
    topic: 'CAR 2012',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 202,
    question: 'Which of these is normally licensable work with asbestos?',
    options: [
      'Drilling a single hole through weathered asbestos cement sheet',
      'Removing asbestos insulating board in poor condition',
      'Collecting a sample for laboratory identification',
      'Painting over sound, undamaged asbestos cement cladding',
    ],
    correctAnswer: 1,
    explanation:
      'Asbestos insulating board is one of the higher-risk materials and work on it is generally licensable. Asbestos cement binds fibres in a matrix that prevents most from being released, so work on it is typically non-licensed. Sampling for identification is also non-licensed. The material and its condition drive the classification, not the size of the job.',
    difficulty: 'advanced',
    topic: 'Licensing',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 203,
    question: 'The duty to manage asbestos applies to which premises?',
    options: [
      'Domestic dwellings only, where built before 2000',
      'All premises constructed before 1985 without exception',
      'Non-domestic premises, including the common parts of residential blocks',
      'Only premises where an asbestos survey has already identified ACMs',
    ],
    correctAnswer: 2,
    explanation:
      'The duty falls on whoever is responsible for maintenance and repair of non-domestic premises, and it extends to the common parts of domestic blocks such as stairwells, lift shafts and boiler rooms. It is not conditional on a survey having been done — the duty is precisely what triggers finding out.',
    difficulty: 'advanced',
    topic: 'Duty to Manage',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 204,
    question:
      'An electrician drilling into a ceiling void finds a board they suspect is AIB. What is the correct action?',
    options: [
      'Continue carefully using a dust mask and damp the area down',
      'Complete the drilling then seal the hole with sealant',
      'Take a sample themselves for identification before deciding',
      'Stop work, leave the area, prevent access and report it',
    ],
    correctAnswer: 3,
    explanation:
      'Stop immediately, withdraw, prevent others entering and report. Continuing with a dust mask is not a control — a disposable mask offers no meaningful protection against asbestos fibres, and damping down does not undo fibres already released. Sampling is work for a competent person following a defined procedure.',
    difficulty: 'advanced',
    topic: 'Unplanned Disturbance',
    category: 'Emergency Procedures',
  },
  {
    id: 205,
    question:
      'Why is asbestos cement generally treated as lower risk than asbestos insulating board?',
    options: [
      'Its fibres are bound in a matrix that prevents most from being released',
      'It contains only chrysotile, which is not classed as hazardous',
      'It was manufactured after the 1985 amphibole ban',
      'It is always found externally where fibres disperse safely',
    ],
    correctAnswer: 0,
    explanation:
      'The controlling factor is fibre release. Asbestos cement binds fibres in a dense matrix so relatively few become airborne when it is worked, whereas AIB is a friable board that releases fibres readily. Chrysotile is still a hazardous material — the difference is the matrix, not the fibre type.',
    difficulty: 'advanced',
    topic: 'Material Types',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 206,
    question: 'Which survey type is required before refurbishment or demolition work?',
    options: [
      'A management survey, as it covers all accessible areas',
      'A refurbishment and demolition survey, which is fully intrusive',
      'A visual inspection recorded in the asbestos register',
      'No survey, provided the register shows no ACMs recorded',
    ],
    correctAnswer: 1,
    explanation:
      'A management survey locates ACMs that could be disturbed during normal occupancy and is not intrusive enough for construction work. A refurbishment and demolition survey is fully intrusive, reaching into the fabric where work will take place. Relying on a register compiled from a management survey is a common and dangerous shortcut.',
    difficulty: 'advanced',
    topic: 'Survey Types',
    category: 'Identification & Surveys',
  },
  {
    id: 207,
    question:
      'Which single factor is the strongest first indicator that a building may contain asbestos materials?',
    options: [
      'The age of the building, in particular pre-2000 work',
      'The number of electrical circuits in the building',
      'Whether the building has a suspended timber floor',
      'The type of heating system fitted to the building',
    ],
    correctAnswer: 0,
    explanation:
      'Any premises whose construction was completed before 2000 should be presumed to contain asbestos unless there is strong evidence that it does not. Premises built after 2000 can be presumed asbestos free, though care is needed where new build sits on older basements. Circuit count, floor construction and heating type say nothing about the materials used, so they are not screening indicators.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Where asbestos is found',
    category: 'Identification & Surveys',
  },
  {
    id: 208,
    question:
      'What is asbestos awareness training intended to enable an electrician to do?',
    options: [
      'Carry out minor removal of asbestos insulating board',
      'Take air samples and interpret fibre counts on site',
      'Recognise and avoid work that would disturb asbestos',
      'Issue a clearance certificate after a removal job',
    ],
    correctAnswer: 2,
    explanation:
      'Awareness training exists to help workers avoid carrying out work that would disturb asbestos. It is given to employees whose work could foreseeably disturb the fabric of a building. It is not a licence to remove anything: removal of insulating board, air monitoring and clearance certification all require separate task specific training and, for most board work, a licensed contractor and an independent analyst.',
    section: 'Module 6',
    difficulty: 'basic',
    topic: 'Training requirements',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 209,
    question:
      'Under regulation 4 of the Control of Asbestos Regulations 2012, which premises does the duty to manage cover?',
    options: [
      'All domestic dwellings including private family homes',
      'Non-domestic premises and common parts of domestic ones',
      'Only premises built before the year 1980 in England',
      'Any building where more than five people are employed',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 4 places the duty to manage on those responsible for non-domestic premises and for the common parts of domestic premises, such as a shared entrance hall, stairs, lift or roof space in a block of flats. The interior of a private dwelling is outside regulation 4, but note that section 3 of the Health and Safety at Work Act still applies to a landlord or contractor working there, so the risk cannot simply be ignored.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Duty to manage',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 210,
    question:
      'A tenancy agreement makes the tenant responsible for repairs and maintenance of a leased industrial unit. Who holds the duty to manage asbestos?',
    options: [
      'The tenant, because they control repair and maintenance',
      'The building owner, because ownership always decides it',
      'The electrical contractor working in the unit that week',
      'The local authority as the enforcing body for the site',
    ],
    correctAnswer: 0,
    explanation:
      'The duty falls on whoever has the main responsibility for maintenance and repair of the premises, which a tenancy agreement or contract can transfer to the tenant. Ownership is only the default: where the owner keeps repair responsibility the owner is the dutyholder, so the answer turns on the agreement, not the deeds. A visiting contractor and the enforcing authority never hold the regulation 4 duty.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Dutyholder identity',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 211,
    question:
      'While chasing a wall you break into a soft grey board you did not expect. What is the correct immediate action?',
    options: [
      'Damp the dust down and finish the chase before leaving',
      'Bag the debris in a rubble sack and place it in the skip',
      'Fit a dust mask and continue at a slower cutting speed',
      'Stop work, leave the area and report it to the dutyholder',
    ],
    correctAnswer: 3,
    explanation:
      'Where asbestos, or a material suspected of being asbestos, is found that was not identified in the initial assessment, the rule is to stop work, evacuate the area and protect the material from further damage until it has been decided how work can proceed safely. Damping down, bagging up or carrying on behind a dust mask all keep a worker in a contaminated area and spread fibres further, and none of them creates the specialist advice the situation needs.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Action on discovery',
    category: 'Emergency Procedures',
  },
  {
    id: 212,
    question:
      'No asbestos register is available for a 1975 office you are rewiring. How should the materials be treated?',
    options: [
      'Presumed to contain asbestos until evidence shows otherwise',
      'Treated as asbestos free because no register was supplied',
      'Assessed by the electrician using a hand lens on site',
      'Regarded as safe provided the materials look undamaged',
    ],
    correctAnswer: 0,
    explanation:
      'Dutyholders must presume that materials contain asbestos unless there is strong evidence that they do not, and that presumption is exactly what protects you when paperwork is missing. An absent register is not evidence of absence, it is a gap in the duty to manage that should be raised before work starts. Asbestos fibres cannot be identified by eye or hand lens, and condition tells you about risk of release, not about content.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Presumption and survey',
    category: 'Identification & Surveys',
  },
  {
    id: 213,
    question:
      'An asbestos board panel in a plant room is undamaged, painted and well out of the way. What does the guidance normally favour?',
    options: [
      'Immediate removal by a licensed contractor at high cost',
      'Leaving it in place, recording it and managing its condition',
      'Sealing it with expanding foam and closing the plant room',
      'Breaking it out carefully and double bagging the pieces',
    ],
    correctAnswer: 1,
    explanation:
      'Where material is in good condition, protected by its position or by physical protection and unlikely to be worked on or disturbed, it is usually safer to leave it in place and manage it. Removal is itself a fibre release event, so it is not automatically the safer choice. Whatever is left in place must be entered on the record of locations, kept up to date, and everyone who needs to know must be told it is there.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Manage or remove',
    category: 'Identification & Surveys',
  },
  {
    id: 214,
    question:
      'Where in an older distribution board are asbestos materials most likely to be encountered?',
    options: [
      'Inside the plastic sheathing of the final circuit cables',
      'Within the copper busbar connections and their fixings',
      'As flash guards and panel linings behind the switchgear',
      'In the moulded case of the miniature circuit breakers',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos was valued as a heat and fire resistant insulator, so in older switchgear it turns up as flash guards, arc barriers and board linings placed where an arc could otherwise strike. Cable sheathing, busbars and modern breaker cases are not where the material was used. Recognising this matters because opening an old board to add a way can disturb a brittle guard at head height in a confined enclosure.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Electrical equipment',
    category: 'Identification & Surveys',
  },
  {
    id: 215,
    question:
      'What does the control limit in the Control of Asbestos Regulations 2012 represent?',
    options: [
      'A safe level below which asbestos causes no harm at all',
      'The maximum weight of waste one van may legally carry',
      'The number of workers allowed inside an enclosure at once',
      'An airborne fibre concentration that must not be exceeded',
    ],
    correctAnswer: 3,
    explanation:
      'The control limit is defined in regulation 2 as a concentration of asbestos in the atmosphere of 0.1 fibres per cubic centimetre of air, measured by the recommended method and averaged over a continuous period. It is a legal maximum, not a threshold of safety, and exposure must still be reduced as low as reasonably practicable below it. Waste loading and enclosure occupancy are controlled by other means entirely.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Exposure limits',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 216,
    question:
      'You must fix a ceiling rose to a textured coated ceiling in a 1980s house. What is the safest approach?',
    options: [
      'Sand the texture flat first so the rose sits down neatly',
      'Check the survey information and avoid disturbing the coating',
      'Drill quickly on hammer action to reduce the working time',
      'Scrape the coating off with a filling knife while damp',
    ],
    correctAnswer: 1,
    explanation:
      'Textured coatings of that era can contain asbestos, so the first move is to establish what the material is from the survey or register and then plan the fixing so the coating is not disturbed. Sanding and scraping are abrasive methods that liberate large numbers of fibres and are exactly what the regulations aim to prevent. Hammer action drilling shatters the surface and shortening the job does not reduce the fibres released.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Textured coatings',
    category: 'Safe Working & PPE',
  },
  {
    id: 217,
    question:
      'Which of these tasks would normally require a contractor licensed by the enforcing authority?',
    options: [
      'Removing asbestos cement roof sheets from a farm building',
      'Drilling a single hole through an asbestos cement gutter',
      'Removing asbestos insulating board panels from a ceiling',
      'Lifting vinyl floor tiles with an asbestos backing paper',
    ],
    correctAnswer: 2,
    explanation:
      'Work in which asbestos insulation, asbestos coating or asbestos insulating board is removed, repaired or disturbed normally has to be done by a licensed contractor, because these materials release fibres readily. Asbestos cement and floor tiles hold their fibres firmly in a matrix, so work on them is usually non-licensed, though it still needs assessment and controls. The trap is assuming that quantity decides the licence, when it is the type and friability of the material that decides it.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Licensed work',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 218,
    question:
      'How far ahead must licensable asbestos work be notified to the enforcing authority?',
    options: [
      'At least 14 days before the work is due to start',
      'At least 28 days before the work is due to start',
      'Within 14 days of the work being completed on site',
      'On the first day that the work begins on the site',
    ],
    correctAnswer: 0,
    explanation:
      'Licensable work must be notified to the relevant enforcing authority at least 14 days before it starts, on the prescribed notification form. Notice can be given by telephone where there is doubt about which authority to notify, but it must still be confirmed in writing within that period. Notifying on the day of the work, or after it, defeats the purpose, which is to allow the authority to plan inspection before fibres are disturbed.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Notification',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 219,
    question:
      'How does notification of notifiable non-licensed work differ from notification of licensable work?',
    options: [
      'It requires the same fourteen day period of advance notice',
      'It is made to the insurer rather than to an authority',
      'It is only needed when the control limit is exceeded',
      'It must be made before work begins, using an online form',
    ],
    correctAnswer: 3,
    explanation:
      'Notifiable non-licensed work is notified using the online notification form, and the notification must be made before the work begins. That is a real difference from licensable work, which carries a fixed 14 day advance period. Both go to an enforcing authority, never to an insurer, and neither is triggered by exceeding the control limit: notifiable non-licensed work is by definition expected to stay below it.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Notifiable non-licensed work',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 220,
    question:
      'Asbestos work is planned in a high street shop. Which body is normally the enforcing authority?',
    options: [
      'The Health and Safety Executive in every commercial case',
      'The Office of Rail Regulation for all retail properties',
      'The local authority, which covers shops and offices',
      'The building control department of the county council',
    ],
    correctAnswer: 2,
    explanation:
      'Enforcement is split by premises type. Local authorities enforce in shops, offices, catering, hotels, and leisure and entertainment premises, while the Health and Safety Executive takes construction sites, factories, farms, domestic premises and similar, and the rail regulator takes railway premises. Getting this wrong means a notification lands with a body that cannot act on it. Building control has no role in asbestos enforcement.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Enforcing authority',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 221,
    question:
      'Which situation could meet the sporadic and low intensity conditions that disapply certain duties?',
    options: [
      'Stripping sprayed coating from steelwork over three days',
      'Short maintenance work handling only non-friable material',
      'Removing lagging from pipework in an occupied boiler room',
      'Cutting insulating board partitions to run new containment',
    ],
    correctAnswer: 1,
    explanation:
      'The exemption needs exposure to be sporadic and of low intensity, the risk assessment to show clearly that exposure stays below the control limit, and the work to be of a listed kind such as short non-continuous maintenance handling only non-friable materials, or sealing material in good condition. Sprayed coatings, lagging and insulating board are licensable work and cannot satisfy those conditions, whatever the duration of the job.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Non-licensed work',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 222,
    question: 'Which statement about asbestos and health is correct?',
    options: [
      'The risk of lung cancer is increased further by smoking',
      'Illness appears within a few days of any fibre exposure',
      'Only workers who handle asbestos daily can be affected',
      'Washing the skin after work removes the risk of disease',
    ],
    correctAnswer: 0,
    explanation:
      'Awareness training must cover the effects of asbestos on health, including the increased lung cancer risk for asbestos workers who smoke, because the two exposures multiply rather than simply add. Asbestos diseases develop over decades, not days, which is why there is no immediate symptom to warn a worker. The harm comes from inhaled fibres reaching the lung, so washing removes contamination from clothing and skin but does not undo an inhaled dose.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Health effects',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 223,
    question:
      'What must the dutyholder produce once asbestos locations and condition have been assessed?',
    options: [
      'A verbal briefing given to staff at the annual meeting',
      'A written record kept up to date, and a plan to manage',
      'A removal programme completed within twelve months',
      'An insurance policy covering future exposure claims',
    ],
    correctAnswer: 1,
    explanation:
      'The dutyholder must make a written record of the location and condition of asbestos and presumed asbestos, keep that record up to date, assess the risk of exposure, and prepare and implement a written management plan. The record should include an accurate drawing and describe the product type and appearance. A briefing leaves nothing for the next contractor to consult, and neither wholesale removal nor insurance is what regulation 4 asks for.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Management plan',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 224,
    question:
      'Before running cables through the ceiling void of a 1970s school, what should you obtain?',
    options: [
      'The asbestos register information covering that void',
      'A permit from the local authority licensing office',
      'A face fit test certificate for a disposable mask',
      'An air monitoring result taken in the corridor below',
    ],
    correctAnswer: 0,
    explanation:
      'The management plan and register exist so that maintenance workers and contractors can be told what is present before they open up the fabric, and ceiling voids are a classic location for insulating board, lagging and sprayed coatings. Asking for that information is the practical expression of the duty to manage. A licensing permit is not issued to cable installers, and monitoring or mask fitting addresses exposure that good planning should avoid creating.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Asbestos register',
    category: 'Safe Working & PPE',
  },
  {
    id: 225,
    question:
      'Is there a legal requirement to repeat a formal asbestos awareness course every twelve months?',
    options: [
      'Yes, a certificate expires exactly twelve months later',
      'Yes, but only for those who work in domestic premises',
      'No, though refresher awareness should be given as needed',
      'No, because awareness training is not required at all',
    ],
    correctAnswer: 2,
    explanation:
      'There is no legal requirement to repeat a formal refresher awareness course every twelve months, but some form of refresher should be given as necessary, driven by a training needs analysis rather than a calendar. The annual certificate is a commercial convention, not a regulation. It is equally wrong to conclude that awareness training is optional: it is required for anyone whose work could foreseeably disturb asbestos.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Refresher training',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 226,
    question:
      'How long must an employer keep the health record of an employee who does notifiable asbestos work?',
    options: [
      'Ten years from the date the employment came to an end',
      'Five years from the date of the medical examination',
      'Twenty years from the last recorded exposure to fibres',
      'Forty years, kept in a safe place by the employer',
    ],
    correctAnswer: 3,
    explanation:
      'Health records for employees doing work notifiable as either licensable or notifiable non-licensed work must be kept for 40 years in a safe place. The long period reflects the decades that can pass between exposure and disease, so a record destroyed at ten or twenty years would be gone before it was ever needed. The record must also be in a form that lets each employee see their own entries on request.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Health records',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 227,
    question:
      'Which method of lifting old thermoplastic floor tiles is least likely to release fibres?',
    options: [
      'Breaking them up with a hammer and a cold chisel',
      'Lifting them whole and intact without breaking them',
      'Softening the bitumen with a hot air gun and scraper',
      'Sanding the surface before prising each tile upwards',
    ],
    correctAnswer: 1,
    explanation:
      'Floor tiles hold their fibres firmly in a matrix, so the hazard comes from what you do to them rather than from their presence. Removing them whole and undamaged keeps the matrix intact and can fall within non-licensed work. Breaking, sanding and heating all degrade the material: heat softens the bitumen but can also drive off dust from the backing, and abrasive methods are the single most effective way of making a low risk material into a high one.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Floor tiles',
    category: 'Safe Working & PPE',
  },
  {
    id: 228,
    question:
      'How must waste containing asbestos be dealt with when a job is finished?',
    options: [
      'Placed in the general builders skip once it is wetted',
      'Left with the client to dispose of at their convenience',
      'Burnt on site to destroy the fibres before disposal',
      'Labelled as asbestos waste and disposed of as such',
    ],
    correctAnswer: 3,
    explanation:
      'The regulations set specific requirements for the storage, labelling and transport of asbestos waste so that it stays sealed and identified from the work area to the disposal point. Putting it in a general skip loses that chain entirely and passes the hazard to whoever handles the skip. Wetting reduces dust but does not make the waste ordinary, and burning does not destroy asbestos fibres, it disperses them.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Waste handling',
    category: 'Safe Working & PPE',
  },
  {
    id: 229,
    question:
      'Which cleaning method is acceptable where a small amount of asbestos debris has been created?',
    options: [
      'Sweeping the debris up using a stiff yard broom',
      'Blowing the area down with an airline to clear it',
      'Using a suitable filtered vacuum and damp wiping',
      'Leaving the debris in place for the next site visit',
    ],
    correctAnswer: 2,
    explanation:
      'The requirement is to prevent the spread of asbestos and to thoroughly clean the work area, which means capturing fibres rather than moving them. A suitable filtered vacuum with damp wiping does that. Dry sweeping and compressed air both re-suspend settled fibres into the breathing zone and can contaminate a far larger area than the original job. Leaving debris simply hands the exposure to the next person through the door.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Preventing spread',
    category: 'Safe Working & PPE',
  },
  {
    id: 230,
    question:
      'What makes asbestos containing materials dangerous to an electrician?',
    options: [
      'The weight of the material when it is being lifted',
      'The fibres released into the air when it is disturbed',
      'The electrical conductivity of the fibres in a board',
      'The chemical burns caused by touching the surface',
    ],
    correctAnswer: 1,
    explanation:
      'The hazard is inhalation of airborne fibres, which is why undisturbed material in good condition can often be left alone while drilling, cutting or breaking it is tightly controlled. Asbestos was used precisely because it is a good insulator, so conductivity is not the issue, and it does not burn skin on contact. Understanding that disturbance is the trigger is what makes an electrician change method rather than change gloves.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Nature of the hazard',
    category: 'Asbestos Types & Properties',
  },
  {
    id: 231,
    question:
      'Why must respiratory protective equipment for asbestos work be face fit tested?',
    options: [
      'To confirm the mask seals against the face of the wearer',
      'To prove the filters have not passed their expiry date',
      'To record how long the wearer can stay in an enclosure',
      'To show the mask is the right colour for the work type',
    ],
    correctAnswer: 0,
    explanation:
      'A tight fitting mask only achieves its rated protection if it seals to that individual face, and faces differ, so a fit test matches the wearer to the model and size. Records of fit testing must be available to the worker on request. A leaking seal lets unfiltered air bypass a perfectly good filter, which is why filter dates, wear times and colour coding are all secondary to whether the mask actually seals.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Respiratory protection',
    category: 'Safe Working & PPE',
  },
  {
    id: 232,
    question:
      'Where does respiratory protective equipment sit in the order of controls for asbestos?',
    options: [
      'It is the first control to be selected on every job',
      'It replaces the need for a written risk assessment',
      'It is used in addition to measures that reduce exposure',
      'It is only needed when the work is licensable work',
    ],
    correctAnswer: 2,
    explanation:
      'Where it is not reasonably practicable to bring exposure below the control limit by other means, the employer must provide suitable respiratory protection in addition to those measures, not instead of them. Protective equipment protects only the wearer and only while it is worn correctly, so it is the last line, never the first. It also never displaces the risk assessment, which is what determines the controls in the first place.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Hierarchy of control',
    category: 'Safe Working & PPE',
  },
  {
    id: 233,
    question:
      'Who may carry out the medical examination for a worker doing notifiable non-licensed work?',
    options: [
      'Only a doctor appointed by the enforcing authority',
      'The site supervisor holding a first aid certificate',
      'Any occupational nurse employed by the main contractor',
      'A doctor who need not be appointed, such as a local GP',
    ],
    correctAnswer: 3,
    explanation:
      'For notifiable non-licensed work the examination does not have to be done by an appointed doctor and may be carried out by a doctor such as a local general practitioner, whereas licensable work requires an appointed doctor. Either way the examination happens in normal working time and at the expense of the employer, including travel and fees. A supervisor or a nurse cannot substitute for the medical examination the regulations require.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Medical surveillance',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 234,
    question:
      'A full rewire is planned in a 1968 hospital wing. What asbestos survey information is needed?',
    options: [
      'Survey cover for every area to be disturbed by the work',
      'Survey cover limited to surfaces visible from corridors',
      'Survey cover produced after the strip out is completed',
      'Survey cover sampling only the plant and boiler rooms',
    ],
    correctAnswer: 0,
    explanation:
      'A rewire opens voids, chases walls and lifts floors, so the information must extend to every area the work will disturb, including places a routine management inspection would never look. Restricting it to visible surfaces or to plant rooms leaves the installer working blind exactly where the hazard hides. Surveying after the strip out is worthless, because the disturbance that releases fibres has already happened.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Surveys before work',
    category: 'Identification & Surveys',
  },
  {
    id: 235,
    question:
      'Who should be told about asbestos identified in a building under the management plan?',
    options: [
      'Only the directors of the company that owns the site',
      'Everyone who needs to know, including maintenance staff',
      'Nobody, to avoid causing alarm among the occupants',
      'The enforcing authority alone, by an annual return',
    ],
    correctAnswer: 1,
    explanation:
      'Everyone who needs to know about the asbestos should be told in sufficient detail, and that expressly includes maintenance workers and contractors, because they are the people whose work could disturb it. Occupants who simply use the building need informing only where necessary. Withholding the information to avoid alarm is the failure that puts a drill through a board, and there is no annual return to an authority that substitutes for telling the workforce.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Sharing information',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 236,
    question:
      'Two contractors are working with asbestos in the same building at the same time. What is required?',
    options: [
      'The larger contractor takes over all of the duties',
      'Each must ignore the other to keep lines of control clear',
      'The client assumes the duties of both contractors',
      'They must cooperate to meet their separate duties',
    ],
    correctAnswer: 3,
    explanation:
      'Where more than one employer works with asbestos at the same workplace at the same time, they must cooperate so that each meets its own duties towards its own employees, towards each other employees and towards anyone else who might be affected, and they should consult safety representatives. Duties are not transferable by size or by contract: no employer can hand its statutory obligations to a bigger firm or to the client.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Cooperation between employers',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 237,
    question:
      'Which action must come before any work that may foreseeably disturb asbestos begins?',
    options: [
      'A suitable risk assessment of the planned work',
      'A clearance certificate issued by an analyst',
      'An air monitoring survey of the whole building',
      'A licence application to the enforcing authority',
    ],
    correctAnswer: 0,
    explanation:
      'The regulations require a risk assessment before work starts, and it is that assessment which decides whether the job is licensable, notifiable or ordinary non-licensed work and what controls are needed. A clearance certificate belongs at the end of a licensed removal, not the beginning. A licence is only relevant if the assessment shows licensable material, and building wide air monitoring tells you nothing about the specific task you are about to do.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Risk assessment',
    category: 'Identification & Surveys',
  },
  {
    id: 238,
    question:
      'Which material found on structural steelwork is treated as licensable work if disturbed?',
    options: [
      'Galvanised finish applied to the steel at the works',
      'Intumescent paint applied over the primed steelwork',
      'Sprayed asbestos coating applied for fire protection',
      'Mineral wool batts fixed around the steel with wire',
    ],
    correctAnswer: 2,
    explanation:
      'Sprayed asbestos coating on beams and columns is one of the highest risk forms of the material: it is soft, poorly bonded and releases fibres very readily, so removing, repairing or disturbing it is licensable work. Electrical work is a documented cause of damage to such coatings where fixings and containment are run against steelwork. Galvanising, intumescent paint and mineral wool are not asbestos and are not licensable.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Sprayed coatings',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 239,
    question:
      'The only easy route for a new cable is across an asbestos insulating board soffit. What is the best plan?',
    options: [
      'Shot fix clips into the board at close centres',
      'Reroute the cable so the board is not drilled at all',
      'Drill the board slowly and wear a disposable mask',
      'Cut a channel in the board and bury the cable in it',
    ],
    correctAnswer: 1,
    explanation:
      'Avoiding the disturbance altogether is the only option that keeps the work outside the licensing regime and keeps fibres in the board. Insulating board is friable, so shot firing, drilling and channelling all disturb it, and disturbing insulating board is normally licensable work whatever the size of the hole. A disposable mask does not convert licensable work into something an electrician may lawfully do.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Avoiding disturbance',
    category: 'Safe Working & PPE',
  },
  {
    id: 240,
    question:
      'After stopping work on finding a suspected asbestos material, who should be told first?',
    options: [
      'The wholesaler that supplied the cable and fittings',
      'The other trades once the job has been completed',
      'Your supervisor and the dutyholder for the premises',
      'The insurance company handling the site policy',
    ],
    correctAnswer: 2,
    explanation:
      'The people who can act are your own employer or supervisor and the dutyholder, who holds the management plan and can arrange a specialist analyst to identify the material and decide how work proceeds safely. Telling other trades only after the job is finished leaves them exposed in the meantime, which is the opposite of what stopping work is for. Suppliers and insurers have no role in making the area safe.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Reporting a discovery',
    category: 'Emergency Procedures',
  },
  {
    id: 241,
    question:
      'What should happen to the area around a newly discovered asbestos material?',
    options: [
      'It should be swept clean so the extent can be seen',
      'It should be opened up further to check for more',
      'It should be used for storing tools until Monday',
      'It should be protected from further damage and access',
    ],
    correctAnswer: 3,
    explanation:
      'The material must be protected from further damage and people kept out until a decision has been made on how work can safely continue. Sweeping is an abrasive dry method that pushes settled fibres back into the air, and opening the area up to see how far it extends is doing exactly the disturbance you have just stopped. Using the area for storage guarantees repeated traffic through a contaminated space.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Securing the area',
    category: 'Emergency Procedures',
  },
  {
    id: 242,
    question:
      'You must pass a cable through an asbestos cement wall in an outbuilding. What is the best method?',
    options: [
      'A high speed abrasive disc to make the opening quickly',
      'Hand drilling slowly with the dust controlled and damped',
      'Hammer action drilling followed by a stiff brush clean',
      'Breaking the sheet out and patching the hole afterwards',
    ],
    correctAnswer: 1,
    explanation:
      'Asbestos cement is a hard material with the fibres firmly bound, so the aim is to work it gently and capture what little dust is made. Slow hand drilling with dust suppression and local capture does that. High speed abrasive discs and hammer action shatter the matrix and generate large quantities of fine dust, and brushing afterwards spreads it. Breaking the sheet out turns a small controlled task into a much larger disturbance.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Asbestos cement',
    category: 'Safe Working & PPE',
  },
  {
    id: 243,
    question:
      'Why is asbestos still a live risk for electricians despite the ban on its use?',
    options: [
      'It is still imported for use in switchgear linings',
      'It is manufactured under licence for use in fire doors',
      'It forms naturally in damp basements over many years',
      'It remains in many buildings constructed before 2000',
    ],
    correctAnswer: 3,
    explanation:
      'The ban stopped new use, it did not remove what was already installed, which is why any premises completed before 2000 should be presumed to contain asbestos unless there is strong evidence otherwise. Maintenance and refurbishment trades meet it precisely because they open up existing fabric. Asbestos is a mined mineral, not something that forms in a building, and it is not lawfully manufactured into new products.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Legacy in buildings',
    category: 'Identification & Surveys',
  },
  {
    id: 244,
    question: 'What should a non-licensed asbestos task be carried out under?',
    options: [
      'A verbal instruction given at the morning briefing',
      'A written method based on the risk assessment',
      'A licence issued by the enforcing authority',
      'A clearance certificate obtained beforehand',
    ],
    correctAnswer: 1,
    explanation:
      'Even where work does not need a licence, it still needs a risk assessment and a written method setting out the controls, the equipment, the waste route and the cleaning, so that the people doing it work the same way every time. A licence is not required for non-licensed work by definition, and a clearance certificate is issued after a licensed removal to allow reoccupation, so it cannot be obtained in advance.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Plan of work',
    category: 'Identification & Surveys',
  },
  {
    id: 245,
    question:
      'An electrician holds only asbestos awareness training. Which work may they carry out?',
    options: [
      'Work that is planned so asbestos is not disturbed',
      'Removal of small areas of insulating board',
      'Notifiable non-licensed work on pipe lagging',
      'Enclosure building for a licensed removal',
    ],
    correctAnswer: 0,
    explanation:
      'Awareness training equips a worker to recognise the material and avoid disturbing it, and nothing more. Non-licensed work, notifiable non-licensed work and licensable work each require additional task specific information, instruction and training on top of awareness. Board removal and lagging work are licensable in most circumstances, and building enclosures is practical training reserved for those working inside them.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Limits of awareness training',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 246,
    question:
      'Which older electrical item is a recognised location for asbestos containing components?',
    options: [
      'A modern plastic consumer unit fitted in 2015',
      'A recently installed LED panel light fitting',
      'An old storage heater with insulating panels',
      'A twin and earth cable run in a new dwelling',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos was used in plant as well as in building fabric, wherever heat resistance was needed, so older heating appliances and their insulating panels are a recognised location alongside flash guards and board linings. Awareness training covers the likely occurrence of asbestos in buildings and in plant for this reason. Equipment made in recent decades is outside the ban period and does not contain it.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Electrical equipment',
    category: 'Identification & Surveys',
  },
  {
    id: 247,
    question:
      'What keeps an asbestos management plan effective once it has been written?',
    options: [
      'Filing it securely so it cannot be altered by others',
      'Periodic checks that the arrangements are working',
      'Reissuing it to the enforcing authority each year',
      'Replacing it fully whenever a tenant moves out',
    ],
    correctAnswer: 1,
    explanation:
      'There should be periodic checks that the arrangements and procedures for managing asbestos are working and that people know what they should be doing, because a plan that is never tested becomes a document rather than a control. The record of locations and conditions must also be kept up to date. Locking the plan away defeats the requirement to make it available, and no annual submission to an authority is required.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Reviewing the plan',
    category: 'Identification & Surveys',
  },
  {
    id: 248,
    question:
      'Beyond employees, who else should the management plan information be given to?',
    options: [
      'The emergency services, who may attend the premises',
      'Every visitor signing in at reception each day',
      'The local newspaper covering the district council',
      'Competitor firms tendering for the maintenance',
    ],
    correctAnswer: 0,
    explanation:
      'Dutyholders should tell employees what the arrangements are and provide the emergency services with information about the premises, because firefighters and rescue crews may have to enter and disturb the structure in circumstances where no one can look the information up. Ordinary visitors need informing only where it is necessary for their safety, and publication to the press or to competitors serves no safety purpose.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Sharing information',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 249,
    question:
      'Damaged lagging is found in a riser and a sound cement sheet outside. How should priority be set?',
    options: [
      'The cement sheet first, because it is easiest to reach',
      'Both at once, because all asbestos ranks the same',
      'The damaged lagging first, because it can release fibres',
      'Neither, because both should simply be recorded only',
    ],
    correctAnswer: 2,
    explanation:
      'Priority follows the likelihood of fibre release, which depends on the type of material, its condition and whether it is likely to be disturbed. Damaged lagging in a riser is friable, deteriorating and in a route people work in, so it needs repair, protection or removal first. Sound cement sheet outside is hard, bound and undisturbed, so managing it in place is reasonable. Recording alone is not enough where material is already damaged.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Prioritising risk',
    category: 'Identification & Surveys',
  },
  {
    id: 250,
    question:
      'Air monitoring shows the control limit has unexpectedly been exceeded. What must the employer do?',
    options: [
      'Wait until the annual safety meeting to report the result',
      'Record the reading and take no further action at all',
      'Repeat the sampling until a lower result is obtained',
      'Tell employees and their representatives promptly, with reasons',
    ],
    correctAnswer: 3,
    explanation:
      'Where monitoring shows the relevant control limit has unexpectedly been exceeded, the employer should tell employees and their safety representatives as quickly as possible, with the reasons for what happened and the action taken or proposed. Delay denies the exposed workers information they need about their own health. Resampling until a convenient figure appears is falsification, not monitoring, and silent recording defeats the point of measuring.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Air monitoring',
    category: 'Safe Working & PPE',
  },
  {
    id: 251,
    question:
      'You are rewiring a privately owned 1960s house where regulation 4 does not apply. What still governs your work?',
    options: [
      'Nothing, because duties exist only in commercial premises',
      'Only the wiring standard covering the installation work',
      'A voluntary code of practice with no legal force at all',
      'Employer duties to assess and control the exposure risk',
    ],
    correctAnswer: 3,
    explanation:
      'The regulation 4 duty to manage does not reach inside a private dwelling, but the duties on employers and the self employed to identify asbestos, assess the risk and control exposure apply wherever the work is done. Section 3 of the Health and Safety at Work Act also requires that the conduct of an undertaking does not put non employees at risk, which covers the household. The wiring standard says nothing about asbestos control.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Domestic premises',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 252,
    question:
      'What is the purpose of labelling asbestos waste and products containing asbestos?',
    options: [
      'To satisfy the client that a tidy job has been done',
      'To warn anyone handling it of the hazard it holds',
      'To record the price paid for its safe disposal',
      'To identify which operative created the waste',
    ],
    correctAnswer: 1,
    explanation:
      'Labelling carries the warning with the material, so that everyone who stores, moves, sorts or receives it knows what they are handling long after the people who bagged it have left. The regulations set requirements for labelling both asbestos waste and products containing asbestos for exactly this reason. Tidiness, cost records and operative traceability are administrative matters that do not protect the next person to lift the bag.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Labelling',
    category: 'Safe Working & PPE',
  },
  {
    id: 253,
    question:
      'Following a licensed removal in an occupied office, what allows people back into the area?',
    options: [
      'The removal contractor confirming the work is complete',
      'The dutyholder deciding that the area now looks clean',
      'A certificate of reoccupation issued after clearance',
      'A period of twenty four hours with the doors shut',
    ],
    correctAnswer: 2,
    explanation:
      'Reoccupation follows clearance sampling by an independent analyst and the issue of a certificate of reoccupation, because settled and airborne fibres cannot be judged by eye. The contractor who did the removal has an obvious interest in declaring it finished, which is why the check is independent of them. Time alone does nothing, as fibres that have settled are readily disturbed again when people return to the room.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Clearance and reoccupation',
    category: 'Legislation & Duty to Manage',
  },
  {
    id: 254,
    question:
      'What is the first thing an electrician should do before starting work in an older building?',
    options: [
      'Ask for the asbestos information held for the premises',
      'Begin the first fix and watch for unusual materials',
      'Buy a box of disposable masks for the whole team',
      'Photograph the ceilings so damage can be disputed',
    ],
    correctAnswer: 0,
    explanation:
      'The dutyholder must make the record and management plan available to those who need it, so asking for it is the correct first step and the one the whole system is built around. Starting work and watching out is discovery by damage, which is precisely the sequence the regulations exist to prevent. Masks are a control chosen after an assessment, and photographs protect a commercial position rather than anyone health.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Before starting work',
    category: 'Safe Working & PPE',
  },
  {
    id: 255,
    question:
      'Why must overalls contaminated with asbestos never be taken home to be washed?',
    options: [
      'Because fibres can be carried to other family members',
      'Because domestic machines wash at a low temperature',
      'Because the overalls will shrink in a hot wash cycle',
      'Because the employer must be billed for the washing',
    ],
    correctAnswer: 0,
    explanation:
      'Decontamination procedures exist to prevent the spread of asbestos and the consequential risk of exposing others, and clothing is one of the main ways fibres leave a site. Taking contaminated overalls home exposes people who never went near the job and who have no protection at all. Wash temperature is irrelevant to a mineral fibre, and shrinkage and billing are not health and safety reasons.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Decontamination',
    category: 'Safe Working & PPE',
  },
  {
    id: 256,
    question:
      'A builder offers to rip out an asbestos board partition today to keep your rewire moving. What should you do?',
    options: [
      'Accept, provided he damps the board down thoroughly',
      'Accept if he has held awareness training this year',
      'Refuse but remove the board yourself more carefully',
      'Refuse and insist the work goes to a licensed firm',
    ],
    correctAnswer: 3,
    explanation:
      'Removing asbestos insulating board normally requires a licensed contractor, advance notification and controls such as enclosure, filtered extraction and clearance before reoccupation, none of which a same day rip out provides. Damping down and awareness training do not change the legal status of the work, and awareness training is expressly intended to stop workers doing this. Doing it yourself more carefully is the same breach with your name on it.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Licensed work',
    category: 'Legislation & Duty to Manage',
  },
];
