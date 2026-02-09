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
  "Asbestos Types & Properties",
  "Legislation & Duty to Manage",
  "Identification & Surveys",
  "Safe Working & PPE",
  "Emergency Procedures"
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
  categories: asbestosCategories
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
    options: [
      "Indestructible",
      "Fireproof",
      "Strong fibre",
      "White mineral"
    ],
    correctAnswer: 0,
    explanation: "The word 'asbestos' comes from the ancient Greek 'asbestos' meaning 'indestructible' or 'unquenchable', reflecting the material's remarkable durability and resistance to fire.",
    section: "Module 1",
    difficulty: "basic",
    topic: "History of asbestos use",
    category: "Asbestos Types & Properties"
  },
  {
    id: 2,
    question: "Which of the following is the most commonly used type of asbestos worldwide?",
    options: [
      "Amosite (brown asbestos)",
      "Crocidolite (blue asbestos)",
      "Chrysotile (white asbestos)",
      "Tremolite"
    ],
    correctAnswer: 2,
    explanation: "Chrysotile (white asbestos) accounts for approximately 90-95% of all asbestos used worldwide. It was the most widely used type due to its flexibility and resistance to heat.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Chrysotile (white asbestos)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 3,
    question: "Asbestos is a naturally occurring mineral. Which broad category of minerals does it belong to?",
    options: [
      "Calcium carbonates",
      "Silicate minerals",
      "Iron oxides",
      "Aluminium phosphates"
    ],
    correctAnswer: 1,
    explanation: "Asbestos is the name given to a group of naturally occurring silicate minerals that form as bundles of fibres. All six recognised types of asbestos are silicate minerals.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Properties of asbestos",
    category: "Asbestos Types & Properties"
  },
  {
    id: 4,
    question: "Into which two mineral groups are the six types of asbestos divided?",
    options: [
      "Calcium and magnesium groups",
      "Serpentine and amphibole groups",
      "Silicate andite groups",
      "Organic and inorganic groups"
    ],
    correctAnswer: 1,
    explanation: "The six types of asbestos are divided into two mineral groups: the serpentine group (which contains only chrysotile) and the amphibole group (which contains amosite, crocidolite, tremolite, anthophyllite, and actinolite).",
    section: "Module 1",
    difficulty: "basic",
    topic: "Serpentine vs amphibole",
    category: "Asbestos Types & Properties"
  },
  {
    id: 5,
    question: "Which type of asbestos belongs to the serpentine mineral group?",
    options: [
      "Amosite",
      "Crocidolite",
      "Chrysotile",
      "Tremolite"
    ],
    correctAnswer: 2,
    explanation: "Chrysotile (white asbestos) is the only type of asbestos that belongs to the serpentine mineral group. Its fibres are curly and layered, unlike the straight, needle-like fibres of the amphibole group.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Serpentine vs amphibole",
    category: "Asbestos Types & Properties"
  },
  {
    id: 6,
    question: "What shape are chrysotile (white asbestos) fibres when viewed under a microscope?",
    options: [
      "Straight and needle-like",
      "Curly and serpentine",
      "Flat and plate-like",
      "Spherical and granular"
    ],
    correctAnswer: 1,
    explanation: "Chrysotile fibres are curly and serpentine (wavy) in shape, which is why chrysotile belongs to the serpentine mineral group. This contrasts with the straight, needle-like fibres of amphibole asbestos types.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Chrysotile (white asbestos)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 7,
    question: "What is the colour typically associated with amosite asbestos?",
    options: [
      "White",
      "Blue",
      "Brown",
      "Green"
    ],
    correctAnswer: 2,
    explanation: "Amosite is commonly known as brown asbestos due to its brownish colour. However, it is important to note that asbestos cannot be reliably identified by colour alone — laboratory analysis is required for positive identification.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Amosite (brown asbestos)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 8,
    question: "What does the name 'amosite' stand for?",
    options: [
      "American Organisation of Silicate Engineers",
      "Asbestos Mines of South Africa",
      "Associated Minerals of Southern England",
      "Amalgamated Mining Operations of South Asia"
    ],
    correctAnswer: 1,
    explanation: "Amosite is an acronym derived from 'Asbestos Mines of South Africa', where this type of asbestos was predominantly mined. Its mineralogical name is grunerite.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Amosite (brown asbestos)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 9,
    question: "Which type of asbestos is often considered the most hazardous due to its very fine, straight fibres?",
    options: [
      "Chrysotile (white asbestos)",
      "Amosite (brown asbestos)",
      "Crocidolite (blue asbestos)",
      "Anthophyllite"
    ],
    correctAnswer: 2,
    explanation: "Crocidolite (blue asbestos) is often considered the most hazardous type of asbestos. Its very fine, straight, needle-like fibres can penetrate deep into the lungs and are particularly difficult for the body to break down or expel.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Crocidolite (blue asbestos)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 10,
    question: "Which of the following is NOT one of the six recognised types of asbestos?",
    options: [
      "Tremolite",
      "Anthophyllite",
      "Vermiculite",
      "Actinolite"
    ],
    correctAnswer: 2,
    explanation: "Vermiculite is not a type of asbestos — it is a separate mineral that can sometimes be contaminated with asbestos (particularly tremolite). The six recognised types of asbestos are chrysotile, amosite, crocidolite, tremolite, anthophyllite, and actinolite.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Contaminant minerals",
    category: "Asbestos Types & Properties"
  },
  {
    id: 11,
    question: "When was the use of all asbestos finally banned in the United Kingdom?",
    options: [
      "1985",
      "1992",
      "1999",
      "2006"
    ],
    correctAnswer: 2,
    explanation: "The use of all types of asbestos was banned in the UK in 1999 under the Asbestos (Prohibitions) (Amendment) Regulations 1999. Blue and brown asbestos were banned earlier in 1985, but white asbestos (chrysotile) was not banned until 1999.",
    section: "Module 1",
    difficulty: "basic",
    topic: "History of asbestos use",
    category: "Asbestos Types & Properties"
  },
  {
    id: 12,
    question: "In which year were crocidolite (blue) and amosite (brown) asbestos banned from import and use in the UK?",
    options: [
      "1970",
      "1985",
      "1992",
      "1999"
    ],
    correctAnswer: 1,
    explanation: "The import and use of crocidolite (blue) and amosite (brown) asbestos were banned in the UK in 1985 under the Asbestos (Prohibitions) Regulations 1985. Chrysotile (white) was not banned until 1999.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "History of asbestos use",
    category: "Asbestos Types & Properties"
  },
  {
    id: 13,
    question: "During which period was asbestos most heavily used in UK construction?",
    options: [
      "1920s to 1940s",
      "1950s to 1980s",
      "1985 to 1999",
      "2000 to present"
    ],
    correctAnswer: 1,
    explanation: "Asbestos was most heavily used in UK construction from the 1950s to the 1980s, with peak use during the 1960s and 1970s. Any building constructed or refurbished before the year 2000 may contain asbestos-containing materials.",
    section: "Module 1",
    difficulty: "basic",
    topic: "History of asbestos use",
    category: "Asbestos Types & Properties"
  },
  {
    id: 14,
    question: "Which property of asbestos made it particularly attractive for use in fireproofing and insulation?",
    options: [
      "Its bright colour range",
      "Its excellent thermal resistance",
      "Its ability to conduct electricity",
      "Its high cost compared to alternatives"
    ],
    correctAnswer: 1,
    explanation: "Asbestos has excellent thermal resistance and can withstand temperatures up to approximately 1,000°C depending on the type. This property made it highly attractive for fireproofing, insulation, and heat-resistant applications in construction and industry.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Properties of asbestos",
    category: "Asbestos Types & Properties"
  },
  {
    id: 15,
    question: "Which of the following is NOT a key property that made asbestos commercially valuable?",
    options: [
      "Resistance to fire and high temperatures",
      "High tensile strength",
      "Excellent electrical conductivity",
      "Resistance to chemical attack"
    ],
    correctAnswer: 2,
    explanation: "Asbestos is actually an excellent electrical insulator, not a conductor. Its commercially valuable properties included fire resistance, high tensile strength, chemical resistance, low thermal conductivity, and the ability to be woven into fabrics.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Properties of asbestos",
    category: "Asbestos Types & Properties"
  },
  {
    id: 16,
    question: "In which of the following locations would you be LEAST likely to find asbestos in a building constructed in the 1970s?",
    options: [
      "Insulation lagging around pipework",
      "Cement roofing sheets",
      "Modern PVC window frames installed in 2020",
      "Textured ceiling coatings (Artex)"
    ],
    correctAnswer: 2,
    explanation: "Modern PVC window frames installed in 2020 would not contain asbestos, as all asbestos use was banned in the UK in 1999. Pipe lagging, cement roofing sheets, and textured ceiling coatings from the 1970s are all common locations for asbestos-containing materials.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Where asbestos is found in buildings",
    category: "Asbestos Types & Properties"
  },
  {
    id: 17,
    question: "Approximately how many deaths per year in the UK are attributed to asbestos-related diseases?",
    options: [
      "Around 500",
      "Around 2,000",
      "Around 5,000",
      "Around 10,000"
    ],
    correctAnswer: 2,
    explanation: "According to HSE statistics, approximately 5,000 people die each year in the UK from asbestos-related diseases. This makes asbestos the single greatest cause of work-related deaths in the UK.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "UK statistics",
    category: "Asbestos Types & Properties"
  },
  {
    id: 18,
    question: "What is mesothelioma?",
    options: [
      "A type of asbestos fibre",
      "A cancer of the lining of the lungs or abdomen almost exclusively caused by asbestos exposure",
      "A chronic skin condition caused by handling asbestos",
      "A respiratory condition caused by exposure to cement dust"
    ],
    correctAnswer: 1,
    explanation: "Mesothelioma is a cancer of the mesothelium — the thin lining that covers the lungs (pleura) and the abdomen (peritoneum). It is almost exclusively caused by asbestos exposure and is almost always fatal, typically within 12-36 months of diagnosis.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Health effects (mesothelioma)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 19,
    question: "What is the typical latency period between first exposure to asbestos and the development of mesothelioma?",
    options: [
      "1-5 years",
      "5-10 years",
      "15-60 years",
      "Over 80 years"
    ],
    correctAnswer: 2,
    explanation: "The typical latency period for mesothelioma is between 15 and 60 years, with an average of around 30-40 years. This long latency means that people exposed decades ago are still being diagnosed with the disease today.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Latency periods",
    category: "Asbestos Types & Properties"
  },
  {
    id: 20,
    question: "What is asbestosis?",
    options: [
      "A type of asbestos material used in construction",
      "A cancer of the lung lining caused by asbestos",
      "A serious scarring and fibrosis of the lung tissue caused by heavy asbestos exposure",
      "An allergic reaction to asbestos fibres on the skin"
    ],
    correctAnswer: 2,
    explanation: "Asbestosis is a serious chronic condition involving scarring (fibrosis) of the lung tissue caused by heavy exposure to asbestos fibres over a prolonged period. It reduces lung capacity and can be severely debilitating, and there is no cure.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Health effects (asbestosis)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 21,
    question: "Which of the following statements about asbestos exposure is correct according to HSE guidance?",
    options: [
      "Brief, low-level exposure to asbestos is completely safe",
      "Only blue asbestos is dangerous to health",
      "There is no known safe level of exposure to asbestos",
      "Asbestos is only dangerous if you can see the fibres"
    ],
    correctAnswer: 2,
    explanation: "According to HSE guidance, there is no known safe level of exposure to asbestos. All types of asbestos are dangerous, and even low-level or short-duration exposures can potentially lead to asbestos-related diseases, although the risk increases with higher and longer exposures.",
    section: "Module 1",
    difficulty: "basic",
    topic: "No safe exposure level",
    category: "Asbestos Types & Properties"
  },
  {
    id: 22,
    question: "How do asbestos fibres typically enter the body and cause disease?",
    options: [
      "Through absorption via the skin",
      "Through ingestion of contaminated food only",
      "Through inhalation of airborne fibres into the lungs",
      "Through contact with the eyes"
    ],
    correctAnswer: 2,
    explanation: "Asbestos fibres primarily cause disease through inhalation. When asbestos-containing materials are disturbed, microscopic fibres become airborne and can be inhaled deep into the lungs where they become lodged in the lung tissue, causing inflammation, scarring, and potentially cancer.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Fibre inhalation mechanism",
    category: "Asbestos Types & Properties"
  },
  {
    id: 23,
    question: "Why are asbestos fibres particularly dangerous once inhaled?",
    options: [
      "They dissolve quickly in the bloodstream and poison organs",
      "They are too small and durable for the body to break down or expel, causing ongoing irritation",
      "They immediately block the airways causing suffocation",
      "They react chemically with oxygen in the lungs"
    ],
    correctAnswer: 1,
    explanation: "Asbestos fibres are extremely thin and durable. Once inhaled, they become lodged deep in the lung tissue where the body cannot effectively break them down or remove them. This causes ongoing irritation and inflammation over many years, leading to scarring, genetic damage, and potentially cancer.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fibre inhalation mechanism",
    category: "Asbestos Types & Properties"
  },
  {
    id: 24,
    question: "Which asbestos-related condition involves thickening or calcification of the pleura (lung lining)?",
    options: [
      "Asbestosis",
      "Mesothelioma",
      "Pleural disease (plaques and thickening)",
      "Lung cancer"
    ],
    correctAnswer: 2,
    explanation: "Pleural disease, including pleural plaques and diffuse pleural thickening, involves changes to the pleura (the membrane lining the lungs and chest cavity). Pleural plaques are localised areas of thickening or calcification and are the most common sign of past asbestos exposure, though they do not usually cause symptoms themselves.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Health effects (pleural disease)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 25,
    question: "A building was constructed in 1965. Which statement is most accurate regarding asbestos?",
    options: [
      "It is guaranteed to contain asbestos throughout",
      "It is unlikely to contain any asbestos",
      "It should be presumed to contain asbestos-containing materials until a survey proves otherwise",
      "Only the roof will contain asbestos"
    ],
    correctAnswer: 2,
    explanation: "Any building constructed or refurbished before the year 2000 should be presumed to contain asbestos-containing materials (ACMs) until a proper asbestos survey has been carried out. A 1965 building falls within the peak period of asbestos use and is highly likely to contain ACMs.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Where asbestos is found in buildings",
    category: "Asbestos Types & Properties"
  },
  {
    id: 26,
    question: "Which of the following domestic locations is a common place to find asbestos-containing materials?",
    options: [
      "Modern laminate flooring installed in 2015",
      "Textured decorative coatings (such as Artex) applied before 2000",
      "Solid brick walls with no render or coating",
      "Timber roof trusses"
    ],
    correctAnswer: 1,
    explanation: "Textured decorative coatings such as Artex applied before 2000 commonly contained chrysotile (white) asbestos. This is one of the most frequent locations for asbestos in domestic properties. Modern products manufactured after the 1999 ban do not contain asbestos.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Domestic properties",
    category: "Asbestos Types & Properties"
  },
  {
    id: 27,
    question: "What type of asbestos was commonly used in thermal insulation lagging for pipes and boilers?",
    options: [
      "Chrysotile only",
      "Amosite and chrysotile",
      "Crocidolite only",
      "Tremolite only"
    ],
    correctAnswer: 1,
    explanation: "Thermal insulation lagging for pipes and boilers commonly contained amosite (brown) asbestos and chrysotile (white) asbestos, often mixed together. This type of lagging is considered high risk because it is friable and easily releases fibres when disturbed.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Common locations",
    category: "Asbestos Types & Properties"
  },
  {
    id: 28,
    question: "Asbestos cement products typically contain what percentage of asbestos?",
    options: [
      "1-5%",
      "10-15%",
      "50-60%",
      "90-100%"
    ],
    correctAnswer: 1,
    explanation: "Asbestos cement products typically contain between 10-15% asbestos fibre mixed with cement. While the fibres are bound within the cement matrix and are less likely to be released than in friable materials, they can release fibres if cut, drilled, broken, or allowed to deteriorate.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Properties of asbestos",
    category: "Asbestos Types & Properties"
  },
  {
    id: 29,
    question: "Can asbestos type be reliably identified by its colour alone?",
    options: [
      "Yes — white, brown, and blue are always clearly distinguishable",
      "Yes, but only by a trained surveyor using visual inspection",
      "No — asbestos type cannot be reliably identified by colour and requires laboratory analysis",
      "No — but a simple on-site chemical test can confirm the type"
    ],
    correctAnswer: 2,
    explanation: "Asbestos type cannot be reliably identified by colour alone. The colours 'white', 'brown', and 'blue' are general descriptors, but in practice asbestos fibres can appear different colours depending on contamination, ageing, and the materials they are mixed with. Positive identification requires laboratory analysis, typically polarised light microscopy (PLM).",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Properties of asbestos",
    category: "Asbestos Types & Properties"
  },
  {
    id: 30,
    question: "Which of the following asbestos types has straight, rigid, needle-like fibres characteristic of the amphibole group?",
    options: [
      "Chrysotile",
      "Amosite",
      "Both chrysotile and amosite",
      "Neither chrysotile nor amosite"
    ],
    correctAnswer: 1,
    explanation: "Amosite belongs to the amphibole group and has straight, rigid, needle-like fibres. Chrysotile belongs to the serpentine group and has curly, flexible fibres. All amphibole asbestos types (amosite, crocidolite, tremolite, anthophyllite, actinolite) share the characteristic straight fibre structure.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Serpentine vs amphibole",
    category: "Asbestos Types & Properties"
  },
  {
    id: 31,
    question: "Tremolite asbestos is most commonly encountered in the UK as what?",
    options: [
      "A primary commercial product widely sold",
      "A contaminant found in other minerals such as vermiculite and talc",
      "The main component of asbestos cement roofing",
      "A modern synthetic replacement for chrysotile"
    ],
    correctAnswer: 1,
    explanation: "Tremolite was not widely used commercially but is commonly found as a contaminant in other minerals including vermiculite, talc, and sometimes chrysotile. Its presence as a contaminant means it can appear in unexpected materials and locations.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Contaminant minerals",
    category: "Asbestos Types & Properties"
  },
  {
    id: 32,
    question: "Exposure to asbestos can increase the risk of developing lung cancer. Which factor significantly multiplies this risk further?",
    options: [
      "Drinking alcohol",
      "Smoking tobacco",
      "Working outdoors",
      "Having a family history of heart disease"
    ],
    correctAnswer: 1,
    explanation: "Smoking tobacco combined with asbestos exposure has a synergistic (multiplicative) effect on lung cancer risk. A person who both smokes and has been exposed to asbestos may have a risk of lung cancer up to 50-90 times greater than a person with neither exposure, according to HSE guidance.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Health effects (lung cancer)",
    category: "Asbestos Types & Properties"
  },
  {
    id: 33,
    question: "In a typical domestic property built in the 1970s, which of the following would be a common location for asbestos-containing materials?",
    options: [
      "Solid wood internal doors",
      "Copper water pipes",
      "Garage roof sheets and soffits",
      "Glazed ceramic bathroom tiles"
    ],
    correctAnswer: 2,
    explanation: "Asbestos cement was widely used for garage and shed roofing sheets, soffits, and fascia boards in domestic properties built from the 1950s to the 1990s. Solid wood, copper, and standard ceramic tiles do not contain asbestos.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Domestic properties",
    category: "Asbestos Types & Properties"
  },
  {
    id: 34,
    question: "What was asbestos insulating board (AIB) commonly used for in buildings?",
    options: [
      "External brickwork pointing",
      "Ceiling tiles, partition walls, and fire protection panels",
      "Concrete foundations",
      "Window glass manufacturing"
    ],
    correctAnswer: 1,
    explanation: "Asbestos insulating board (AIB) was commonly used for ceiling tiles, partition walls, fire protection panels, door panels, and column casings. AIB typically contained 15-40% asbestos and is considered a higher-risk material because it can release fibres more readily than asbestos cement.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Common locations",
    category: "Asbestos Types & Properties"
  },
  {
    id: 35,
    question: "Which of the following correctly lists the three types of asbestos most commonly found in UK buildings?",
    options: [
      "Tremolite, anthophyllite, and actinolite",
      "Chrysotile, amosite, and crocidolite",
      "Chrysotile, tremolite, and anthophyllite",
      "Amosite, actinolite, and tremolite"
    ],
    correctAnswer: 1,
    explanation: "The three types of asbestos most commonly found in UK buildings are chrysotile (white), amosite (brown), and crocidolite (blue). Tremolite, anthophyllite, and actinolite were not widely used commercially but may be present as contaminants.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Where asbestos is found in buildings",
    category: "Asbestos Types & Properties"
  },
  {
    id: 36,
    question: "Approximately how many commercial, public, and industrial buildings in the UK are estimated to contain asbestos?",
    options: [
      "Around 50,000",
      "Around 100,000",
      "Around 500,000",
      "Approximately half a million or more"
    ],
    correctAnswer: 3,
    explanation: "It is estimated that there are approximately 500,000 or more non-domestic buildings in the UK that still contain asbestos, in addition to a very large number of domestic properties. This is why awareness training is essential for anyone who may disturb these materials.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "UK statistics",
    category: "Asbestos Types & Properties"
  },
  {
    id: 37,
    question: "Sprayed asbestos coatings (limpet spray) are considered especially dangerous because they are:",
    options: [
      "Easily identifiable and therefore frequently disturbed",
      "Highly friable and can release large quantities of fibres when disturbed",
      "Only found in modern buildings",
      "Made entirely of crocidolite"
    ],
    correctAnswer: 1,
    explanation: "Sprayed asbestos coatings (often called limpet spray) are considered one of the most dangerous forms of asbestos-containing material because they are highly friable — meaning they crumble easily and can release large quantities of airborne fibres when disturbed or even when they deteriorate naturally.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Common locations",
    category: "Asbestos Types & Properties"
  },
  {
    id: 38,
    question: "What is the approximate diameter of a single asbestos fibre compared to a human hair?",
    options: [
      "About the same thickness as a human hair",
      "About half the thickness of a human hair",
      "Approximately 10 times thinner than a human hair",
      "Approximately 700 times thinner than a human hair"
    ],
    correctAnswer: 3,
    explanation: "A single asbestos fibre can be approximately 700 times thinner than a human hair, at around 0.1 microns in diameter. This is far too small to be seen with the naked eye, which is why people can inhale asbestos fibres without being aware of it.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Fibre inhalation mechanism",
    category: "Asbestos Types & Properties"
  },
  {
    id: 39,
    question: "Which of the following tradespeople is statistically at highest risk of asbestos exposure when working in older buildings?",
    options: [
      "Painters working only on external woodwork",
      "Plumbers, electricians, and heating engineers who disturb building fabric",
      "Landscape gardeners working in gardens",
      "IT engineers installing computer networks in new-build offices"
    ],
    correctAnswer: 1,
    explanation: "Tradespeople such as plumbers, electricians, and heating engineers are statistically at highest risk because their work frequently involves drilling, cutting, and disturbing building fabric (walls, floors, ceilings, ducts) in older buildings where asbestos-containing materials may be present.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "UK statistics",
    category: "Asbestos Types & Properties"
  },
  {
    id: 40,
    question: "Which statement best describes the relationship between asbestos exposure dose and disease risk?",
    options: [
      "Disease only occurs after a single very high exposure event",
      "Risk increases with cumulative exposure — higher doses and longer durations increase the likelihood of disease",
      "Risk is the same regardless of how much or how little exposure occurs",
      "Only continuous daily exposure over 20 years can cause disease"
    ],
    correctAnswer: 1,
    explanation: "The risk of developing asbestos-related disease increases with cumulative exposure — meaning both the concentration of fibres inhaled and the duration of exposure matter. Higher doses over longer periods carry greater risk, though there is no known safe threshold, and even brief exposures can potentially cause disease.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "No safe exposure level",
    category: "Asbestos Types & Properties"
  },
  // =======================================================================
  // LEGISLATION & DUTY TO MANAGE — 40 questions (id 41–80)
  // =======================================================================
  {
    id: 41,
    question: "What is the full title of the primary UK regulation governing work with asbestos?",
    options: [
      "The Control of Asbestos Regulations 2012",
      "The Asbestos Safety Act 2012",
      "The Management of Asbestos at Work Regulations 2012",
      "The Control of Hazardous Substances Regulations 2012"
    ],
    correctAnswer: 0,
    explanation: "The Control of Asbestos Regulations 2012 (CAR 2012) is the primary UK legislation governing the management of and work with asbestos-containing materials. It consolidated and updated earlier asbestos regulations.",
    section: "Module 2",
    difficulty: "basic",
    topic: "CAR 2012 overview",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 42,
    question: "Which regulation within CAR 2012 places a duty to manage asbestos in non-domestic premises?",
    options: [
      "Regulation 10",
      "Regulation 4",
      "Regulation 6",
      "Regulation 11"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 of CAR 2012 places a specific duty on those who have responsibility for the maintenance or repair of non-domestic premises to manage any asbestos-containing materials found there.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Regulation 4 duties",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 43,
    question: "Who does Regulation 4 of CAR 2012 identify as the 'dutyholder'?",
    options: [
      "The building's original architect",
      "Every person who enters the building",
      "The person or organisation with responsibility for maintenance or repair of non-domestic premises, or who has control of that part of the premises",
      "Only the freeholder of the building"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 4, the dutyholder is the person who has, by virtue of a contract or tenancy, an obligation for the maintenance or repair of non-domestic premises, or who has control of the whole or part of those premises. This can include building owners, tenants, or managing agents.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Dutyholder identification",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 44,
    question: "What is the workplace exposure limit (WEL) for asbestos as specified in CAR 2012?",
    options: [
      "0.5 fibres per cubic centimetre of air",
      "0.01 fibres per cubic centimetre of air",
      "0.1 fibres per cubic centimetre of air",
      "1.0 fibres per cubic centimetre of air"
    ],
    correctAnswer: 2,
    explanation: "The control limit for asbestos under CAR 2012 (Regulation 2) is 0.1 fibres per cubic centimetre of air (0.1 f/cm³), averaged over a continuous 4-hour period. This single control limit applies to all types of asbestos.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Control limit",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 45,
    question: "Over what time period is the asbestos control limit of 0.1 f/cm³ averaged?",
    options: [
      "A continuous 1-hour period",
      "A continuous 8-hour period",
      "A continuous 4-hour period",
      "A continuous 15-minute period"
    ],
    correctAnswer: 2,
    explanation: "The asbestos control limit of 0.1 fibres per cubic centimetre of air is measured as a 4-hour time-weighted average (TWA). There is also a short-term exposure limit of 0.6 f/cm³ averaged over 10 minutes.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Control limit",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 46,
    question: "What are the three categories of asbestos work defined under CAR 2012?",
    options: [
      "Simple, moderate, and complex",
      "Licensed, notifiable non-licensed (NNLW), and non-licensed",
      "Category A, Category B, and Category C",
      "Low risk, medium risk, and high risk"
    ],
    correctAnswer: 1,
    explanation: "CAR 2012 defines three categories of work with asbestos: licensed work (requiring an HSE licence), notifiable non-licensed work (NNLW — must be notified to HSE), and non-licensed work. The category depends on the type of asbestos, its condition, and the nature of the work.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Three work categories",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 47,
    question: "Which of the following types of asbestos work always requires an HSE licence?",
    options: [
      "Removal of asbestos cement sheets in good condition",
      "Encapsulating a small area of textured coating containing asbestos",
      "Removal of sprayed asbestos coatings (limpet)",
      "Sampling suspect materials for laboratory analysis"
    ],
    correctAnswer: 2,
    explanation: "Removal of sprayed asbestos coatings (limpet asbestos) is always licensed work under CAR 2012. Sprayed coatings are high-risk materials and their removal can only be carried out by an HSE-licensed contractor.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Three work categories",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 48,
    question: "What must a dutyholder produce as part of their duty to manage asbestos under Regulation 4?",
    options: [
      "A fire risk assessment only",
      "A written plan (management plan) that sets out how the risk from asbestos is to be managed",
      "A structural engineering report",
      "A planning application to the local council"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires the dutyholder to prepare a written management plan that sets out how the risks from asbestos-containing materials are to be managed. This plan must be kept up to date and reviewed regularly.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Management plan",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 49,
    question: "What is an asbestos register?",
    options: [
      "A government database listing all buildings that contain asbestos in the UK",
      "A record of all workers who have been exposed to asbestos",
      "A document recording the location, type, condition, and extent of asbestos-containing materials (or presumed ACMs) in a building",
      "A list of HSE-licensed asbestos removal contractors"
    ],
    correctAnswer: 2,
    explanation: "An asbestos register is a document maintained by the dutyholder that records the location, type, condition, and extent of known or presumed asbestos-containing materials (ACMs) in a building. It forms a key part of the management plan.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Asbestos register",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 50,
    question: "Which HSE guidance document provides detailed advice on asbestos surveys?",
    options: [
      "HSG248 — Asbestos: The Analysts' Guide",
      "HSG264 — Asbestos: The Survey Guide",
      "L143 — Managing and Working with Asbestos",
      "INDG223 — A Short Guide to Managing Asbestos"
    ],
    correctAnswer: 1,
    explanation: "HSG264 'Asbestos: The Survey Guide' is the HSE's guidance document specifically covering the survey and assessment of asbestos in buildings. It describes survey types, methodology, and reporting requirements.",
    section: "Module 2",
    difficulty: "basic",
    topic: "HSG264",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 51,
    question: "What are the two types of asbestos survey described in HSG264?",
    options: [
      "Preliminary survey and full survey",
      "Type 1 survey and Type 2 survey",
      "Management survey and refurbishment/demolition (R&D) survey",
      "Visual survey and laboratory survey"
    ],
    correctAnswer: 2,
    explanation: "HSG264 describes two types of survey: the management survey (the standard survey used to manage ACMs during normal occupation) and the refurbishment and demolition (R&D) survey (a more intrusive survey needed before refurbishment or demolition work).",
    section: "Module 2",
    difficulty: "basic",
    topic: "Management surveys vs R&D surveys",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 52,
    question: "When is a refurbishment and demolition (R&D) survey required?",
    options: [
      "When a building is being repainted externally",
      "Before any refurbishment or demolition work is carried out in premises, or parts of premises",
      "Only when the building was constructed before 1950",
      "Only when asbestos has already been confirmed in the building"
    ],
    correctAnswer: 1,
    explanation: "An R&D survey is required before any refurbishment or demolition work takes place in a building. It is more intrusive than a management survey and aims to locate all ACMs in the area where work will be carried out, so they can be removed beforehand if necessary.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Management surveys vs R&D surveys",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 53,
    question: "What is the purpose of a management survey?",
    options: [
      "To locate and remove all asbestos before demolition",
      "To locate asbestos-containing materials that could be disturbed or damaged during normal occupancy, including foreseeable maintenance, and to assess their condition",
      "To provide clearance certification after asbestos removal",
      "To test the air quality in a building after an asbestos incident"
    ],
    correctAnswer: 1,
    explanation: "A management survey is the standard survey for managing ACMs during the normal occupation and use of a building. Its purpose is to locate ACMs that could be damaged or disturbed during normal occupancy and routine maintenance, and to assess their condition.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Management surveys vs R&D surveys",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 54,
    question: "What accreditation must asbestos survey organisations hold in the UK?",
    options: [
      "ISO 9001 certification",
      "UKAS accreditation to ISO 17020",
      "BREEAM certification",
      "CHAS accreditation"
    ],
    correctAnswer: 1,
    explanation: "Asbestos survey organisations should hold UKAS (United Kingdom Accreditation Service) accreditation to ISO 17020 (Inspection Bodies). This ensures that surveyors meet recognised standards of competence and quality.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Surveyor qualifications (UKAS)",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 55,
    question: "What does UKAS stand for?",
    options: [
      "United Kingdom Asbestos Service",
      "Universal Knowledge and Assessment Scheme",
      "United Kingdom Accreditation Service",
      "UK Asbestos Surveying"
    ],
    correctAnswer: 2,
    explanation: "UKAS stands for the United Kingdom Accreditation Service. It is the sole national accreditation body recognised by the UK government to assess organisations against internationally agreed standards.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Surveyor qualifications (UKAS)",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 56,
    question: "Regulation 5 of CAR 2012 requires employers to carry out what before work with asbestos begins?",
    options: [
      "A fire safety assessment",
      "An identification of the type of asbestos involved",
      "A noise assessment of the work area",
      "A COSHH assessment for dust only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 of CAR 2012 requires that asbestos-containing materials must be identified (the type of asbestos and its condition) before any work that is liable to disturb asbestos is carried out. This means no work should proceed without first determining whether asbestos is present.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Key regulations (Reg 5)",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 57,
    question: "What does Regulation 6 of CAR 2012 require before work with asbestos is carried out?",
    options: [
      "That the building is fully evacuated",
      "That a suitable and sufficient assessment of the risk is carried out",
      "That the HSE is telephoned in advance",
      "That all workers hold a university degree in asbestos management"
    ],
    correctAnswer: 1,
    explanation: "Regulation 6 requires employers to carry out a suitable and sufficient risk assessment before any work with asbestos is undertaken. The assessment must identify the likely exposure, the steps to prevent or reduce exposure, and the type of asbestos involved.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Key regulations (Reg 6)",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 58,
    question: "What does Regulation 10 of CAR 2012 require regarding information, instruction, and training?",
    options: [
      "Training is only required for licensed contractors",
      "Every employer must ensure that adequate information, instruction, and training is given to employees who are or may be exposed to asbestos, and to their supervisors",
      "Training is only required after an asbestos exposure incident",
      "Training must be provided by the HSE directly"
    ],
    correctAnswer: 1,
    explanation: "Regulation 10 requires employers to ensure that adequate information, instruction, and training is provided to any employee who is liable to be exposed to asbestos, or who supervises such employees. Training must be given at regular intervals and kept up to date.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Key regulations (Reg 10)",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 59,
    question: "Under Regulation 11 of CAR 2012, what must an employer ensure when work with asbestos is being carried out?",
    options: [
      "That exposure to asbestos is prevented or, where this is not reasonably practicable, reduced to the lowest level reasonably practicable",
      "That all workers wear full hazmat suits regardless of the task",
      "That the building is demolished immediately after the work",
      "That only female workers are employed for the task"
    ],
    correctAnswer: 0,
    explanation: "Regulation 11 requires employers to prevent exposure to asbestos so far as is reasonably practicable. Where prevention is not reasonably practicable, exposure must be reduced to the lowest level that is reasonably practicable, and in any case below the control limit.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Key regulations (Reg 11)",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 60,
    question: "In the material assessment scoring system used for asbestos surveys, which four factors are typically considered?",
    options: [
      "Weight, colour, smell, and age",
      "Product type (orite type), extent of damage/deterioration, surface treatment, and asbestos type",
      "Location, size of building, number of occupants, and time of year",
      "Temperature, humidity, wind speed, and light level"
    ],
    correctAnswer: 1,
    explanation: "The material assessment algorithm typically scores four variables: product type (or sample/material type), extent of damage or deterioration, surface treatment (e.g. sealed, painted, or exposed), and asbestos type. Each is scored numerically and the total gives the material assessment score.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Material assessment scoring",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 61,
    question: "What is the purpose of a priority assessment in asbestos management?",
    options: [
      "To determine the cost of removal",
      "To assess the likelihood that asbestos-containing materials will release fibres because of their location, use of the area, and likelihood of disturbance",
      "To prioritise which buildings to demolish first",
      "To decide which workers should be trained first"
    ],
    correctAnswer: 1,
    explanation: "A priority assessment considers factors such as the normal activities in the area, the likelihood of disturbance, the number of occupants, the frequency of use, and the maintenance activity. It helps the dutyholder determine what management actions are needed and how urgently.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Priority assessment",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 62,
    question: "How does a priority assessment differ from a material assessment?",
    options: [
      "There is no difference; they are the same thing",
      "The material assessment scores the condition and type of the ACM itself, while the priority assessment considers the likelihood of disturbance based on location and human activity",
      "The priority assessment is done in the laboratory and the material assessment is done on site",
      "The material assessment is only for licensed work and the priority assessment is only for non-licensed work"
    ],
    correctAnswer: 1,
    explanation: "The material assessment evaluates the condition and properties of the ACM itself (e.g. damage, type, surface treatment). The priority assessment looks at external factors — how likely it is that the ACM will be disturbed due to its location, occupant activities, and maintenance needs. Together they inform the management plan.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Priority assessment",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 63,
    question: "What does CAR 2012 apply to?",
    options: [
      "Only domestic premises",
      "Only buildings constructed before 1985",
      "All work with asbestos-containing materials, and also to the duty to manage asbestos in non-domestic premises",
      "Only demolition work on commercial buildings"
    ],
    correctAnswer: 2,
    explanation: "CAR 2012 applies to all work with asbestos-containing materials and also contains the duty to manage asbestos in non-domestic premises (Regulation 4). The duty to manage does not apply to domestic premises, but the work-related regulations apply wherever asbestos work is done.",
    section: "Module 2",
    difficulty: "basic",
    topic: "CAR 2012 overview",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 64,
    question: "Regulation 4 (duty to manage) applies to which type of premises?",
    options: [
      "All premises including domestic homes",
      "Non-domestic premises only (including the common areas of domestic buildings such as shared hallways and stairwells)",
      "Only government-owned buildings",
      "Only premises built before 2000"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 applies to non-domestic premises, which includes workplaces, commercial buildings, and industrial premises. It also applies to the common areas of certain domestic premises, such as shared hallways, stairwells, and lift shafts in blocks of flats.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Regulation 4 duties",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 65,
    question: "What is the first step a dutyholder should take under Regulation 4?",
    options: [
      "Remove all asbestos immediately",
      "Take reasonable steps to find out whether asbestos-containing materials are present in the premises, including by commissioning a survey if appropriate",
      "Evacuate the building and close it permanently",
      "Hire a licensed contractor to inspect the exterior only"
    ],
    correctAnswer: 1,
    explanation: "The first step under Regulation 4 is to take reasonable steps to determine whether asbestos-containing materials are present. This typically involves checking building records, commissioning an asbestos survey, and reviewing any existing asbestos information.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Regulation 4 duties",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 66,
    question: "If a dutyholder cannot determine whether a material contains asbestos, what approach should they take?",
    options: [
      "Ignore the material and carry on with normal activities",
      "Presume the material contains asbestos and manage it accordingly until proven otherwise",
      "Remove it immediately without testing",
      "Paint over it to seal it"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 4, if a material cannot be confirmed as non-asbestos, it should be presumed to contain asbestos and managed accordingly. This precautionary approach protects workers and building occupants until the material can be sampled and analysed.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Regulation 4 duties",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 67,
    question: "How often should an asbestos management plan be reviewed?",
    options: [
      "Once every 10 years",
      "Only when the building changes ownership",
      "At regular intervals and whenever there is a reason to believe the plan is no longer valid (e.g. after building work or damage)",
      "Only when an HSE inspector requests it"
    ],
    correctAnswer: 2,
    explanation: "The management plan should be reviewed at regular intervals (HSE guidance suggests at least annually) and whenever circumstances change, such as after building work, damage to ACMs, or changes in building use. This ensures the plan remains current and effective.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Management plan",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 68,
    question: "What should be included in an asbestos management plan?",
    options: [
      "Only the date the building was constructed",
      "Details of the location and condition of ACMs, monitoring arrangements, who is responsible, and how information will be passed to anyone who may disturb the ACMs",
      "Only a list of contractors who can remove asbestos",
      "Only the results of air monitoring tests"
    ],
    correctAnswer: 1,
    explanation: "A management plan should include: the asbestos register, a schedule for monitoring ACM condition, clear allocation of responsibilities, procedures for passing information to workers and contractors, and an action plan for managing or removing ACMs as appropriate.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Management plan",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 69,
    question: "Which body is responsible for enforcing the Control of Asbestos Regulations 2012?",
    options: [
      "Local councils only",
      "The Environment Agency",
      "The Health and Safety Executive (HSE)",
      "The Department for Education"
    ],
    correctAnswer: 2,
    explanation: "The Health and Safety Executive (HSE) is the primary enforcing authority for the Control of Asbestos Regulations 2012 in most workplaces. Local authorities may enforce in certain premises such as shops, offices, and leisure facilities.",
    section: "Module 2",
    difficulty: "basic",
    topic: "HSE enforcement",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 70,
    question: "What enforcement action can the HSE take if a dutyholder fails to comply with Regulation 4?",
    options: [
      "The HSE has no enforcement powers for asbestos",
      "The HSE can only issue a verbal warning",
      "The HSE can issue improvement notices, prohibition notices, and prosecute offenders, which may result in unlimited fines and/or imprisonment",
      "The HSE can only write a letter of concern"
    ],
    correctAnswer: 2,
    explanation: "The HSE has a range of enforcement powers including issuing improvement notices (requiring action within a set time), prohibition notices (stopping an activity immediately), and prosecution. Penalties for asbestos offences can include unlimited fines and up to two years' imprisonment.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "HSE enforcement",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 71,
    question: "Under CAR 2012, what is notifiable non-licensed work (NNLW)?",
    options: [
      "Any work with asbestos that does not need to be reported to anyone",
      "Work with asbestos that does not require a licence but must be notified to the HSE, and is subject to additional requirements including medical surveillance and record-keeping",
      "Work that is licensed but does not need to be notified",
      "Work with asbestos that can only be done by the building owner"
    ],
    correctAnswer: 1,
    explanation: "NNLW is a category of asbestos work that falls between licensed and non-licensed work. Although a licence is not required, the work must be notified to the HSE via an online notification, and additional requirements apply including medical examinations and keeping a record of workers' exposure.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Three work categories",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 72,
    question: "Which of the following is an example of non-licensed asbestos work (the lowest risk category)?",
    options: [
      "Removing asbestos insulation board (AIB) ceiling tiles",
      "Stripping sprayed asbestos from steel beams",
      "Short-duration, low-disturbance work such as drilling a single hole through an asbestos cement product while using appropriate controls",
      "Removing asbestos lagging from pipes"
    ],
    correctAnswer: 2,
    explanation: "Non-licensed work is the lowest risk category and includes short-duration work where fibre release is minimal, such as drilling a small number of holes in asbestos cement with appropriate controls. Removal of AIB, sprayed coatings, and lagging are all licensed work.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Three work categories",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 73,
    question: "What is the maximum penalty for a breach of the Control of Asbestos Regulations 2012 on conviction on indictment?",
    options: [
      "A fixed penalty notice of £500",
      "A fine not exceeding £20,000",
      "An unlimited fine and/or up to two years' imprisonment",
      "A community service order only"
    ],
    correctAnswer: 2,
    explanation: "On conviction on indictment (Crown Court), breaches of CAR 2012 can result in an unlimited fine and/or up to two years' imprisonment. For summary conviction (Magistrates' Court), the maximum fine is also unlimited following the Legal Aid, Sentencing and Punishment of Offenders Act 2012.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Penalties",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 74,
    question: "How does the Construction (Design and Management) Regulations 2015 (CDM 2015) relate to asbestos management?",
    options: [
      "CDM 2015 has completely replaced CAR 2012",
      "CDM 2015 has no connection to asbestos at all",
      "CDM 2015 requires that pre-construction information — which must include details of any asbestos present — is provided, and that health and safety risks (including asbestos) are managed throughout a construction project",
      "CDM 2015 only applies to projects costing more than £1 million"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 overlaps with asbestos management because it requires clients to provide pre-construction information including details of known asbestos. Designers must eliminate or reduce risks, and principal contractors must manage asbestos risks on site. CAR 2012 still applies in full alongside CDM 2015.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CDM 2015 overlap",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 75,
    question: "Under CDM 2015, who has a duty to provide pre-construction information including asbestos details to designers and contractors?",
    options: [
      "The principal designer only",
      "The client",
      "The building's insurance company",
      "The local authority planning department"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the client has a duty to provide pre-construction information to every designer and contractor. This must include information about asbestos in the building, typically drawn from the asbestos register and management survey.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CDM 2015 overlap",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 76,
    question: "What should a dutyholder do with the asbestos register when contractors are carrying out work in the building?",
    options: [
      "Keep it locked away for data protection reasons",
      "Post it on the internet for public access",
      "Make the relevant information available to anyone who is liable to disturb the asbestos-containing materials, including contractors and maintenance workers",
      "Only share it if the contractor specifically asks for it in writing"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 4, the dutyholder must ensure that information about the location and condition of ACMs is given to anyone who is liable to work on or disturb them. This includes contractors, maintenance workers, and emergency services. Proactive sharing of this information is essential.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Asbestos register",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 77,
    question: "A material assessment gives a high score. What does this indicate?",
    options: [
      "The material is in good condition and poses minimal risk",
      "The material is likely to release fibres readily due to its type, condition, and surface treatment, and requires urgent management action",
      "The material has been safely encapsulated and needs no further attention",
      "The material is confirmed as non-asbestos"
    ],
    correctAnswer: 1,
    explanation: "A high material assessment score indicates that the ACM is more likely to release fibres — for example, because it is badly damaged, is a friable product type, and has no protective surface treatment. A high score triggers a need for more urgent management action such as repair, encapsulation, or removal.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Material assessment scoring",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 78,
    question: "Which of the following is NOT typically a factor in the priority assessment for asbestos management?",
    options: [
      "The number of occupants in the area",
      "The frequency and type of activity in the area",
      "The colour of the asbestos-containing material",
      "The likelihood of the material being disturbed by maintenance activities"
    ],
    correctAnswer: 2,
    explanation: "Priority assessment considers factors such as occupant numbers, activity type and frequency, time spent in the area, and the likelihood of disturbance from maintenance. The colour of the material is not a factor in priority assessment — it relates neither to the likelihood of disturbance nor to fibre release potential.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Priority assessment",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 79,
    question: "If there are multiple dutyholders for a single building (e.g. a landlord and several tenants), what does Regulation 4 require?",
    options: [
      "Only the landlord has any responsibility",
      "Only the tenants are responsible for their own areas",
      "Each dutyholder must cooperate with the others so far as is necessary to enable them to comply with their duties",
      "The HSE will appoint one person to be solely responsible"
    ],
    correctAnswer: 2,
    explanation: "Where there are multiple dutyholders (e.g. a freeholder, managing agent, and several leaseholders), Regulation 4 requires them to cooperate to ensure the duty to manage is properly discharged. This may involve agreeing responsibilities and sharing information about ACMs.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Dutyholder identification",
    category: "Legislation & Duty to Manage"
  },
  {
    id: 80,
    question: "Which approved code of practice (ACoP) supports CAR 2012 and provides practical guidance on compliance?",
    options: [
      "L8 — Legionnaires' Disease: The Control of Legionella Bacteria in Water Systems",
      "L143 — Managing and Working with Asbestos",
      "L153 — Managing Health and Safety in Construction",
      "L138 — Dangerous Substances and Explosive Atmospheres"
    ],
    correctAnswer: 1,
    explanation: "L143 'Managing and Working with Asbestos' is the approved code of practice (ACoP) that accompanies CAR 2012. It has a special legal status — if an employer is prosecuted for a breach of CAR 2012 and has not followed the relevant provisions of L143, a court will find them at fault unless they can show they complied in an equivalent or better way.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CAR 2012 overview",
    category: "Legislation & Duty to Manage"
  },

  // =======================================================================
  // IDENTIFICATION & SURVEYS — 40 questions (id 81–120)
  // =======================================================================
  {
    id: 81,
    question: "What is the typical asbestos content of Asbestos Insulating Board (AIB)?",
    options: [
      "25-40%",
      "10-15%",
      "1-5%",
      "50-70%"
    ],
    correctAnswer: 0,
    explanation: "Asbestos Insulating Board (AIB) typically contains 25-40% asbestos. This relatively high asbestos content, combined with its friable nature, makes AIB one of the higher-risk asbestos-containing materials commonly found in buildings.",
    section: "Module 3",
    difficulty: "basic",
    topic: "AIB identification",
    category: "Identification & Surveys"
  },
  {
    id: 82,
    question: "Which of the following best describes the physical characteristics of Asbestos Insulating Board (AIB)?",
    options: [
      "Hard, dense and grey in colour",
      "Soft, friable and of relatively low density",
      "Transparent and flexible like plastic sheeting",
      "Metallic in appearance with a shiny surface"
    ],
    correctAnswer: 1,
    explanation: "AIB is characterised by being soft, friable (easily crumbled) and of relatively low density. It can often be identified by its soft texture compared to asbestos cement, and it releases fibres more readily when disturbed.",
    section: "Module 3",
    difficulty: "basic",
    topic: "AIB identification",
    category: "Identification & Surveys"
  },
  {
    id: 83,
    question: "What is the typical asbestos content of asbestos cement (AC) products?",
    options: [
      "25-40%",
      "50-60%",
      "10-15%",
      "1-5%"
    ],
    correctAnswer: 2,
    explanation: "Asbestos cement typically contains 10-15% asbestos, with the remainder being Portland cement. The lower asbestos content and the binding effect of the cement matrix mean that fibres are less readily released compared to AIB, provided the material remains in good condition.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Asbestos cement",
    category: "Identification & Surveys"
  },
  {
    id: 84,
    question: "Asbestos cement is classified as which type of material?",
    options: [
      "Friable",
      "Non-friable",
      "Semi-friable",
      "Ultra-friable"
    ],
    correctAnswer: 1,
    explanation: "Asbestos cement is classified as a non-friable material. The cement matrix binds the asbestos fibres tightly, meaning that in good condition, asbestos cement does not readily release fibres. However, if damaged, weathered, or worked upon with power tools, it can release dangerous fibres.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Asbestos cement",
    category: "Identification & Surveys"
  },
  {
    id: 85,
    question: "Which key difference helps distinguish AIB from asbestos cement on site?",
    options: [
      "AIB is always blue in colour whereas AC is always white",
      "AIB is softer and less dense; AC is harder and more dense",
      "AIB is always found outdoors; AC is always found indoors",
      "There is no physical difference between AIB and AC"
    ],
    correctAnswer: 1,
    explanation: "The primary physical distinction is that AIB is softer, lighter and less dense than asbestos cement. AC is hard, dense and feels similar to concrete. AIB can often be scored with a fingernail or indented easily, whereas AC cannot. However, positive identification always requires laboratory analysis.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "AIB vs AC differences",
    category: "Identification & Surveys"
  },
  {
    id: 86,
    question: "Which type of asbestos-containing material is considered to present the highest risk when disturbed?",
    options: [
      "Asbestos cement roofing sheets",
      "Textured decorative coatings",
      "Pipe lagging",
      "Asbestos rope seals"
    ],
    correctAnswer: 2,
    explanation: "Pipe lagging (thermal insulation applied to pipes and boilers) is considered the highest-risk asbestos-containing material. It is highly friable, often contains amphibole asbestos types (amosite or crocidolite), and can have very high asbestos content. When disturbed, it readily releases large quantities of airborne fibres.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Pipe lagging",
    category: "Identification & Surveys"
  },
  {
    id: 87,
    question: "What is 'limpet asbestos' another name for?",
    options: [
      "Asbestos insulating board",
      "Sprayed asbestos coatings",
      "Asbestos cement sheeting",
      "Asbestos floor tiles"
    ],
    correctAnswer: 1,
    explanation: "Limpet asbestos is a common term for sprayed asbestos coatings. These were applied to structural steelwork, ceilings and walls for fire protection and thermal insulation. Sprayed coatings are extremely friable and represent one of the highest-risk forms of asbestos-containing material.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Sprayed coatings",
    category: "Identification & Surveys"
  },
  {
    id: 88,
    question: "What type of asbestos is most commonly found in textured decorative coatings such as Artex?",
    options: [
      "Crocidolite (blue asbestos)",
      "Amosite (brown asbestos)",
      "Chrysotile (white asbestos)",
      "Tremolite"
    ],
    correctAnswer: 2,
    explanation: "Textured decorative coatings such as Artex typically contain chrysotile (white asbestos). The asbestos content is generally low, in the range of 1-5%, but any disturbance such as sanding or scraping can release fibres.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Textured coatings",
    category: "Identification & Surveys"
  },
  {
    id: 89,
    question: "What is the typical asbestos content found in textured decorative coatings like Artex?",
    options: [
      "25-40%",
      "10-15%",
      "1-5%",
      "50-80%"
    ],
    correctAnswer: 2,
    explanation: "Textured decorative coatings such as Artex typically contain 1-5% chrysotile asbestos. Although the percentage is relatively low, these coatings were applied very widely in domestic and commercial properties, and disturbance during renovation work remains a significant source of fibre release.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Textured coatings",
    category: "Identification & Surveys"
  },
  {
    id: 90,
    question: "Where would you most likely find asbestos rope seals and gaskets?",
    options: [
      "In roof tiles and slates",
      "Around boilers, flues, heating systems and pipe joints",
      "In external wall cladding",
      "Inside cavity wall insulation"
    ],
    correctAnswer: 1,
    explanation: "Asbestos rope seals and gaskets were commonly used around boilers, flues, heating systems and pipe joints to provide heat-resistant sealing. They exploit asbestos's excellent thermal resistance properties and can still be found in older heating equipment and industrial plant.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Rope seals and gaskets",
    category: "Identification & Surveys"
  },
  {
    id: 91,
    question: "What is asbestos millboard typically used for?",
    options: [
      "Exterior cladding on high-rise buildings",
      "Fire protection linings behind heaters, boilers and in fire surrounds",
      "Waterproofing of flat roofs",
      "Sound insulation in recording studios"
    ],
    correctAnswer: 1,
    explanation: "Asbestos millboard is a dense, compressed asbestos sheet material that was commonly used as a fire protection lining. It is found behind heaters, boilers, within fire surrounds, and as general fire-resistant lining material. It can contain a high percentage of asbestos.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Millboard and paper",
    category: "Identification & Surveys"
  },
  {
    id: 92,
    question: "In which common domestic electrical fitting have asbestos flash guards historically been found?",
    options: [
      "Light switches",
      "Consumer units (fuse boxes)",
      "Plug sockets",
      "Doorbells"
    ],
    correctAnswer: 1,
    explanation: "Asbestos flash guards were commonly used inside consumer units (fuse boxes) to provide arc and fire protection. Electricians working on older consumer units should be aware that these flash guards may contain asbestos and should not be disturbed without appropriate precautions.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Flash guards in consumer units",
    category: "Identification & Surveys"
  },
  {
    id: 93,
    question: "What is the 'presumption approach' under Regulation 5 of the Control of Asbestos Regulations?",
    options: [
      "Presuming that no asbestos exists in buildings built after 2000",
      "Presuming that a material contains asbestos unless there is strong evidence that it does not",
      "Presuming that all asbestos has already been removed from a building",
      "Presuming that chrysotile is not dangerous"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 5 of the Control of Asbestos Regulations 2012, the duty holder must presume that materials contain asbestos unless there is strong evidence that they do not. This presumption approach means that if there is any doubt, the material must be treated as if it contains asbestos until proven otherwise by analysis.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Presumption approach",
    category: "Identification & Surveys"
  },
  {
    id: 94,
    question: "What does PLM stand for in the context of asbestos analysis?",
    options: [
      "Positive Light Measurement",
      "Polarised Light Microscopy",
      "Preliminary Lab Method",
      "Particulate Level Monitoring"
    ],
    correctAnswer: 1,
    explanation: "PLM stands for Polarised Light Microscopy. It is the standard laboratory technique used to identify the type and presence of asbestos fibres in bulk material samples. PLM uses polarised light to identify the optical properties unique to different asbestos fibre types.",
    section: "Module 3",
    difficulty: "basic",
    topic: "PLM analysis",
    category: "Identification & Surveys"
  },
  {
    id: 95,
    question: "What accreditation must a laboratory hold to carry out asbestos bulk sample analysis in the UK?",
    options: [
      "ISO 9001 certification",
      "UKAS accreditation",
      "BREEAM certification",
      "CE marking approval"
    ],
    correctAnswer: 1,
    explanation: "Laboratories carrying out asbestos bulk sample analysis in the UK must hold UKAS (United Kingdom Accreditation Service) accreditation. This ensures the laboratory meets the required standards for competence, impartiality and consistent operation in asbestos fibre identification.",
    section: "Module 3",
    difficulty: "basic",
    topic: "UKAS-accredited labs",
    category: "Identification & Surveys"
  },
  {
    id: 96,
    question: "What is the primary purpose of bulk sampling in asbestos surveys?",
    options: [
      "To measure the concentration of airborne asbestos fibres",
      "To collect a physical sample of material for laboratory identification of asbestos type and content",
      "To test the structural strength of building materials",
      "To determine the age of a building"
    ],
    correctAnswer: 1,
    explanation: "Bulk sampling involves collecting a physical sample of suspect material so it can be analysed in a laboratory (typically using PLM) to determine whether asbestos is present and, if so, what type. This is distinct from air monitoring, which measures airborne fibre concentrations.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Bulk sampling vs air monitoring",
    category: "Identification & Surveys"
  },
  {
    id: 97,
    question: "What does air monitoring measure in relation to asbestos?",
    options: [
      "The type of asbestos present in a material",
      "The concentration of airborne asbestos fibres in a given volume of air",
      "The age of asbestos-containing materials",
      "The percentage of asbestos in bulk material samples"
    ],
    correctAnswer: 1,
    explanation: "Air monitoring measures the concentration of airborne asbestos fibres in a given volume of air (expressed as fibres per millilitre, f/ml). It is used during and after asbestos removal work to assess exposure levels and to verify that an area is safe for reoccupation.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Bulk sampling vs air monitoring",
    category: "Identification & Surveys"
  },
  {
    id: 98,
    question: "What is the purpose of maintaining a 'chain of custody' for asbestos samples?",
    options: [
      "To ensure samples are delivered by a licensed courier service",
      "To provide an unbroken documented record of who handled the sample from collection to analysis",
      "To record the financial cost of the sampling process",
      "To track how many samples have been taken from a single building"
    ],
    correctAnswer: 1,
    explanation: "Chain of custody provides a documented, unbroken record of everyone who handled a sample from the point of collection to laboratory analysis and reporting. This ensures the integrity and traceability of the sample, preventing mix-ups or contamination, and is essential for the validity of results.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Chain of custody",
    category: "Identification & Surveys"
  },
  {
    id: 99,
    question: "Sprayed asbestos coatings were primarily applied to structural steelwork for which purpose?",
    options: [
      "Decorative finishing",
      "Sound absorption only",
      "Fire protection and thermal insulation",
      "Waterproofing"
    ],
    correctAnswer: 2,
    explanation: "Sprayed asbestos coatings (limpet asbestos) were primarily applied to structural steelwork for fire protection and thermal insulation. The coating provided fire resistance to steel structures, which lose their structural integrity at high temperatures. This is one of the most hazardous forms of asbestos-containing material due to its highly friable nature.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Sprayed coatings",
    category: "Identification & Surveys"
  },
  {
    id: 100,
    question: "When should sampling of a suspect material for asbestos be carried out?",
    options: [
      "Only after the material has been fully removed",
      "When the material cannot be positively identified as non-asbestos and a presumption is not appropriate",
      "Only during a demolition survey",
      "Sampling is never required if the building was constructed after 1990"
    ],
    correctAnswer: 1,
    explanation: "Sampling should be carried out when a suspect material cannot be positively identified as non-asbestos-containing and when simply presuming the presence of asbestos is not the most appropriate management strategy. The decision to sample must weigh the risk of fibre release during sampling against the benefits of obtaining a definitive identification.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "When to sample",
    category: "Identification & Surveys"
  },
  {
    id: 101,
    question: "Which of the following is a key reason why pipe lagging is considered one of the highest-risk asbestos-containing materials?",
    options: [
      "It is always visible and easy to identify",
      "It is highly friable and often contains amphibole asbestos types with very high asbestos content",
      "It is only found in domestic properties",
      "It was only manufactured using chrysotile"
    ],
    correctAnswer: 1,
    explanation: "Pipe lagging is considered highest risk because it is highly friable (easily crumbled by hand), often contains amphibole asbestos types such as amosite or crocidolite, and can have very high asbestos content. When disturbed, it can release extremely high concentrations of airborne fibres, posing a severe inhalation risk.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Pipe lagging",
    category: "Identification & Surveys"
  },
  {
    id: 102,
    question: "Asbestos electrical backing boards were commonly found in which locations?",
    options: [
      "Behind electrical switchboards, fuse boxes and meter cupboards",
      "Inside television sets",
      "Underneath carpets as underlay",
      "Inside window frames"
    ],
    correctAnswer: 0,
    explanation: "Asbestos electrical backing boards were commonly mounted behind electrical switchboards, fuse boxes and meter cupboards. They provided fire resistance and electrical insulation. These boards are often made from AIB and can release fibres if drilled, cut or broken during electrical maintenance work.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Electrical backing boards",
    category: "Identification & Surveys"
  },
  {
    id: 103,
    question: "Where might asbestos be found in cable trenching systems?",
    options: [
      "In the copper wiring itself",
      "In the cement or composite troughing and covers used to protect underground cables",
      "In the plastic cable insulation",
      "In the cable connectors"
    ],
    correctAnswer: 1,
    explanation: "Asbestos can be found in the cement or composite troughing and covers used to protect underground and surface-level cable runs. Asbestos cement was commonly used for cable troughing due to its durability and fire resistance. Workers excavating or modifying cable trenches must be aware of this potential hazard.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Cable trenching",
    category: "Identification & Surveys"
  },
  {
    id: 104,
    question: "What role did asbestos play in switchgear arc shields?",
    options: [
      "To conduct electricity more efficiently",
      "To provide protection against the intense heat generated by electrical arcing",
      "To improve the aesthetic appearance of switchgear",
      "To reduce the weight of switchgear units"
    ],
    correctAnswer: 1,
    explanation: "Asbestos was used in switchgear arc shields to provide protection against the intense heat generated during electrical arcing events. The heat-resistant properties of asbestos made it ideal for this application. Electricians and maintenance workers should be aware that older switchgear may contain asbestos arc shields.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Switchgear arc shields",
    category: "Identification & Surveys"
  },
  {
    id: 105,
    question: "In which household appliance component were asbestos storage bricks historically used?",
    options: [
      "Refrigerator shelving",
      "Night storage heaters",
      "Washing machine drums",
      "Microwave oven linings"
    ],
    correctAnswer: 1,
    explanation: "Asbestos was used in the heat storage bricks inside night storage heaters. These bricks stored heat during off-peak electricity hours and released it gradually. Older storage heaters may still contain asbestos storage bricks, and they should not be broken or dismantled without appropriate precautions and testing.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Heater storage bricks",
    category: "Identification & Surveys"
  },
  {
    id: 106,
    question: "Under the presumption approach, what should a duty holder do if they are unable to confirm whether a material contains asbestos?",
    options: [
      "Remove the material immediately using in-house staff",
      "Ignore the material as it is probably safe",
      "Treat the material as if it contains asbestos and manage it accordingly",
      "Seal the room permanently and prohibit all access"
    ],
    correctAnswer: 2,
    explanation: "Under the presumption approach required by Regulation 5 of the Control of Asbestos Regulations 2012, if a duty holder cannot confirm whether a material contains asbestos, they must treat it as if it does contain asbestos and manage it accordingly. This includes labelling, recording it in the asbestos register, and ensuring it is not disturbed.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Presumption approach",
    category: "Identification & Surveys"
  },
  {
    id: 107,
    question: "Which of the following correctly describes a limitation of Polarised Light Microscopy (PLM)?",
    options: [
      "It cannot identify the type of asbestos fibre present",
      "It may not detect very low concentrations of asbestos fibres in certain matrices",
      "It can only be performed on air samples, not bulk samples",
      "It is not recognised by UKAS as a valid analytical method"
    ],
    correctAnswer: 1,
    explanation: "A known limitation of PLM is that it may not reliably detect very low concentrations of asbestos fibres, particularly when they are finely dispersed within certain matrix materials. In such cases, additional analytical techniques may be required. However, PLM remains the standard and widely accepted method for bulk sample analysis.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "PLM analysis",
    category: "Identification & Surveys"
  },
  {
    id: 108,
    question: "Why is it important that asbestos bulk samples are analysed by a UKAS-accredited laboratory?",
    options: [
      "Because UKAS-accredited labs offer the cheapest analysis rates",
      "Because UKAS accreditation ensures the laboratory meets standards for competence, quality and reliability of results",
      "Because only UKAS-accredited labs are allowed to dispose of asbestos waste",
      "Because UKAS accreditation guarantees zero chance of false negatives"
    ],
    correctAnswer: 1,
    explanation: "UKAS accreditation ensures that the laboratory has been independently assessed and meets recognised standards for technical competence, quality management and reliability of analytical results. This provides confidence that the identification of asbestos (or confirmation of its absence) is accurate and defensible.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "UKAS-accredited labs",
    category: "Identification & Surveys"
  },
  {
    id: 109,
    question: "A surveyor encounters a hard, dense, grey corrugated roof sheet on a building constructed in 1975. What material is this most likely to be?",
    options: [
      "Asbestos Insulating Board (AIB)",
      "Sprayed asbestos coating",
      "Asbestos cement (AC)",
      "Asbestos millboard"
    ],
    correctAnswer: 2,
    explanation: "A hard, dense, grey corrugated roof sheet on a building from 1975 is most likely asbestos cement (AC). Corrugated asbestos cement sheeting was one of the most widely used roofing materials from the 1950s through to the 1980s. Its hard, dense characteristics distinguish it from softer materials like AIB.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Asbestos cement",
    category: "Identification & Surveys"
  },
  {
    id: 110,
    question: "Which of the following statements about asbestos fuse carriers is correct?",
    options: [
      "They were made from asbestos cement and used only in industrial settings",
      "They are small moulded components that may contain asbestos and are found in older fuse boxes",
      "They are large panels used as firebreaks in commercial buildings",
      "They contain no asbestos and are safe to handle without precautions"
    ],
    correctAnswer: 1,
    explanation: "Asbestos fuse carriers are small moulded components found in older fuse boxes and distribution boards. They were manufactured using asbestos-containing material for its electrical insulation and heat resistance properties. Electricians must be aware of their presence when working on older electrical installations.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Fuse carriers",
    category: "Identification & Surveys"
  },
  {
    id: 111,
    question: "What is the main risk associated with using power tools on asbestos cement products?",
    options: [
      "The tools may overheat and catch fire",
      "The mechanical action can break the cement matrix and release large quantities of asbestos fibres",
      "The asbestos will react chemically with the metal in the tool",
      "Power tools cannot cut through asbestos cement"
    ],
    correctAnswer: 1,
    explanation: "Although asbestos cement is classified as non-friable in good condition, using power tools such as angle grinders, drills or circular saws on it can break the cement matrix and release large quantities of asbestos fibres into the air. This is why power tools must never be used on asbestos-containing materials without appropriate controls.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Asbestos cement",
    category: "Identification & Surveys"
  },
  {
    id: 112,
    question: "A surveyor encounters a textured ceiling coating in a 1982 property. The homeowner insists it was applied after the asbestos ban. Without documentary proof of the application date, what should the surveyor do?",
    options: [
      "Accept the homeowner's word and record the material as asbestos-free",
      "Presume the coating contains asbestos unless sampling and UKAS-accredited laboratory analysis confirm otherwise",
      "Ignore the coating because textured coatings never contained asbestos",
      "Advise the homeowner to scrape it off themselves to check"
    ],
    correctAnswer: 1,
    explanation: "Without documentary evidence confirming the application date falls after the prohibition of asbestos in textured coatings, the surveyor must apply the presumption approach under Regulation 5. The coating should be presumed to contain asbestos until a representative sample is analysed by a UKAS-accredited laboratory and confirmed as asbestos-free. Verbal assurances from occupants do not constitute strong evidence.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Textured coatings",
    category: "Identification & Surveys"
  },
  {
    id: 113,
    question: "What is the difference between a management survey and a refurbishment/demolition survey?",
    options: [
      "A management survey is more intrusive than a refurbishment/demolition survey",
      "A management survey locates ACMs that could be disturbed during normal occupancy; a refurbishment/demolition survey is fully intrusive to find all ACMs before major works",
      "There is no difference; they are the same type of survey",
      "A refurbishment/demolition survey is only required for buildings built before 1950"
    ],
    correctAnswer: 1,
    explanation: "A management survey is a standard survey to locate asbestos-containing materials that could be disturbed during normal occupancy, routine maintenance or minor works. A refurbishment/demolition survey is a fully intrusive survey designed to locate all ACMs in the area where refurbishment or demolition work will take place, including those in hidden areas.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "When to sample",
    category: "Identification & Surveys"
  },
  {
    id: 114,
    question: "Asbestos paper products were commonly used as which of the following?",
    options: [
      "Wallpaper in living rooms",
      "Linings in ductwork, electrical equipment and as fire protection layers",
      "Wrapping paper for consumer goods",
      "Newspaper printing material"
    ],
    correctAnswer: 1,
    explanation: "Asbestos paper was commonly used as a lining material in ductwork, inside electrical equipment, and as a fire protection layer in various applications. It is thin and can be easily torn, making it friable and potentially hazardous if disturbed. It may be found layered beneath other materials.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Millboard and paper",
    category: "Identification & Surveys"
  },
  {
    id: 115,
    question: "A sample taken from a suspect material is sent to a laboratory. The chain of custody documentation should include which of the following?",
    options: [
      "Only the name of the person who collected the sample",
      "The names and signatures of everyone who handled the sample, dates and times of transfer, and sample condition",
      "Only the laboratory reference number",
      "The cost of the survey and the client's bank details"
    ],
    correctAnswer: 1,
    explanation: "Chain of custody documentation must include the names and signatures of all persons who handled the sample, the dates and times of each transfer, and details of the sample condition at each stage. This comprehensive record ensures the integrity and traceability of the sample from collection through to analysis.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Chain of custody",
    category: "Identification & Surveys"
  },
  {
    id: 116,
    question: "Which of the following is NOT a factor that increases the risk from an asbestos-containing material?",
    options: [
      "The material is friable and in poor condition",
      "The material is in an area with high foot traffic and frequent disturbance",
      "The material is sealed, in good condition and unlikely to be disturbed",
      "The material contains amphibole asbestos types"
    ],
    correctAnswer: 2,
    explanation: "A material that is sealed, in good condition and unlikely to be disturbed represents a lower risk, not a higher one. Risk factors that increase the danger include friability, poor condition, likelihood of disturbance, and the presence of amphibole asbestos types (amosite and crocidolite), which are more hazardous than chrysotile.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "AIB identification",
    category: "Identification & Surveys"
  },
  {
    id: 117,
    question: "How many representative bulk samples should typically be taken from a homogeneous area of suspect material during a survey?",
    options: [
      "One sample is always sufficient regardless of area size",
      "A minimum number depending on the size and nature of the area, as specified in HSG264 guidance",
      "Exactly ten samples from every room",
      "No samples are needed if the material looks like asbestos"
    ],
    correctAnswer: 1,
    explanation: "HSG264 (Asbestos: The Survey Guide) provides guidance on the minimum number of samples required based on the size and nature of the homogeneous area being surveyed. Taking an adequate number of representative samples ensures that the analysis result is reliable for the entire area of material.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Bulk sampling vs air monitoring",
    category: "Identification & Surveys"
  },
  {
    id: 118,
    question: "Why might a surveyor choose to presume a material contains asbestos rather than take a sample?",
    options: [
      "Because presuming is always cheaper than sampling",
      "Because the act of sampling may release fibres, and if the material will be managed in situ, presumption avoids unnecessary disturbance",
      "Because laboratory results are always unreliable",
      "Because the HSE has banned all sampling of asbestos materials"
    ],
    correctAnswer: 1,
    explanation: "A surveyor may choose to presume rather than sample when the act of taking a sample could release fibres unnecessarily, particularly if the material is in a location where it will be managed in situ and left undisturbed. The presumption approach avoids creating a risk where one does not need to exist, while still ensuring the material is managed as if it contains asbestos.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Presumption approach",
    category: "Identification & Surveys"
  },
  {
    id: 119,
    question: "Asbestos rope seals around an old boiler are found to be deteriorating. What is the most likely consequence?",
    options: [
      "The boiler will become more energy efficient",
      "Asbestos fibres may be released into the surrounding air, creating an inhalation hazard",
      "The rope will become stronger over time",
      "There is no consequence as rope seals do not contain harmful fibres"
    ],
    correctAnswer: 1,
    explanation: "Deteriorating asbestos rope seals can release asbestos fibres into the surrounding air, creating a significant inhalation hazard. As the rope material breaks down due to age, heat cycling and vibration, it becomes more friable and sheds fibres more readily. Deteriorating rope seals should be assessed and managed by competent persons.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Rope seals and gaskets",
    category: "Identification & Surveys"
  },
  {
    id: 120,
    question: "A competent surveyor identifies a soft, low-density board behind an old electric heater in a building constructed in 1970. The board crumbles easily when touched at the edges. Based on these characteristics, what is the most likely material and what action should follow?",
    options: [
      "It is plasterboard and can be disposed of as general waste",
      "It is likely AIB; it should be presumed to contain asbestos, recorded in the register, and sampled or managed accordingly",
      "It is fibreboard and is completely safe to remove",
      "It is asbestos cement and can be safely drilled to mount new fittings"
    ],
    correctAnswer: 1,
    explanation: "A soft, low-density board that crumbles easily, found behind a heater in a 1970s building, is highly characteristic of Asbestos Insulating Board (AIB). AIB was commonly used as a fire-resistant backing board behind heaters. The material should be presumed to contain asbestos, recorded in the asbestos register, and either sampled for laboratory analysis or managed as asbestos-containing material. It must not be disturbed without appropriate controls.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "AIB identification",
    category: "Identification & Surveys"
  },
  // =======================================================================
  // SAFE WORKING & PPE — 40 questions (id 121–160)
  // =======================================================================
  {
    id: 121,
    question: "What are the three categories of asbestos work defined by the Control of Asbestos Regulations 2012?",
    options: [
      "Licensed work, notifiable non-licensed work (NNLW), and non-licensed work",
      "High risk, medium risk, and low risk work",
      "Removal, encapsulation, and maintenance work",
      "Commercial, domestic, and industrial work"
    ],
    correctAnswer: 0,
    explanation: "The Control of Asbestos Regulations 2012 define three categories: licensed work (highest risk, requiring an HSE licence), notifiable non-licensed work (NNLW), and non-licensed work. The category depends on the type of asbestos, its condition, and the nature of the work.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Three work categories",
    category: "Safe Working & PPE"
  },
  {
    id: 122,
    question: "Which of the following is NOT a requirement for licensed asbestos work?",
    options: [
      "Holding an HSE-issued licence",
      "Notifying HSE at least 14 days before work begins",
      "Medical surveillance of workers",
      "Completing the work within 24 hours"
    ],
    correctAnswer: 3,
    explanation: "Licensed asbestos work requires an HSE licence, 14-day advance notification to HSE, and medical surveillance for workers. There is no requirement to complete the work within 24 hours — safety and thoroughness take priority over speed.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Licensed work requirements",
    category: "Safe Working & PPE"
  },
  {
    id: 123,
    question: "For notifiable non-licensed work (NNLW), which form must be used to notify HSE before work begins?",
    options: [
      "ASB1",
      "ASB5",
      "F10",
      "RIDDOR"
    ],
    correctAnswer: 1,
    explanation: "Notifiable non-licensed work (NNLW) requires notification to HSE using form ASB5 before the work starts. ASB1 was used historically but has been replaced. F10 is for construction project notifications, and RIDDOR is for reporting injuries and dangerous occurrences.",
    section: "Module 4",
    difficulty: "basic",
    topic: "NNLW requirements",
    category: "Safe Working & PPE"
  },
  {
    id: 124,
    question: "How long must health records for workers carrying out notifiable non-licensed work (NNLW) be kept?",
    options: [
      "5 years",
      "10 years",
      "20 years",
      "40 years"
    ],
    correctAnswer: 3,
    explanation: "Health records for workers carrying out NNLW must be kept for 40 years. This extended retention period reflects the long latency of asbestos-related diseases, which can take 15 to 60 years to develop after exposure.",
    section: "Module 4",
    difficulty: "basic",
    topic: "NNLW requirements",
    category: "Safe Working & PPE"
  },
  {
    id: 125,
    question: "What is the correct hierarchy of controls for managing asbestos risk, from most to least effective?",
    options: [
      "PPE, administrative controls, engineering controls, substitution, elimination",
      "Elimination, substitution, engineering controls, administrative controls, PPE",
      "Engineering controls, elimination, PPE, substitution, administrative controls",
      "Substitution, elimination, administrative controls, engineering controls, PPE"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of controls runs from most effective to least effective: elimination (remove the hazard entirely), substitution (replace with something less hazardous), engineering controls (isolate people from the hazard), administrative controls (change the way people work), and PPE (protect the individual). PPE is always the last resort.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Hierarchy of controls",
    category: "Safe Working & PPE"
  },
  {
    id: 126,
    question: "What does RAMS stand for in the context of asbestos work?",
    options: [
      "Risk Assessment and Method Statement",
      "Removal of Asbestos Materials Safely",
      "Regulatory Asbestos Management System",
      "Required Asbestos Monitoring Standards"
    ],
    correctAnswer: 0,
    explanation: "RAMS stands for Risk Assessment and Method Statement. A risk assessment identifies the hazards and evaluates the risks, while the method statement describes the safe system of work, step by step, for carrying out the task. RAMS are essential for all asbestos work.",
    section: "Module 4",
    difficulty: "basic",
    topic: "RAMS for asbestos work",
    category: "Safe Working & PPE"
  },
  {
    id: 127,
    question: "What is the Assigned Protection Factor (APF) of an FFP3 disposable respirator?",
    options: [
      "APF 4",
      "APF 10",
      "APF 20",
      "APF 40"
    ],
    correctAnswer: 2,
    explanation: "An FFP3 disposable respirator has an Assigned Protection Factor (APF) of 20, meaning it reduces the wearer's exposure by a factor of 20 when correctly fitted. This is the minimum standard of RPE acceptable for asbestos work.",
    section: "Module 4",
    difficulty: "basic",
    topic: "RPE types",
    category: "Safe Working & PPE"
  },
  {
    id: 128,
    question: "What type of coveralls should be worn for asbestos work?",
    options: [
      "Type 3 chemical coveralls",
      "Type 5 disposable coveralls",
      "Standard cotton overalls",
      "High-visibility jackets"
    ],
    correctAnswer: 1,
    explanation: "Type 5 disposable coveralls are required for asbestos work. They are designed to protect against airborne solid particles, including asbestos fibres. Standard cotton overalls would trap fibres and cannot be safely decontaminated, while Type 3 coveralls are designed for liquid chemical protection.",
    section: "Module 4",
    difficulty: "basic",
    topic: "PPE",
    category: "Safe Working & PPE"
  },
  {
    id: 129,
    question: "Why is face-fit testing required for RPE used in asbestos work?",
    options: [
      "To check the respirator is the correct colour",
      "To ensure an adequate seal between the facepiece and the wearer's face",
      "To test whether the filters need replacing",
      "To measure the oxygen content inside the mask"
    ],
    correctAnswer: 1,
    explanation: "Face-fit testing ensures an adequate seal between the facepiece and the wearer's face. Without a proper seal, contaminated air can leak in around the edges, rendering the RPE ineffective. Every wearer must be individually face-fit tested, as face shapes vary significantly between individuals.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Face-fit testing",
    category: "Safe Working & PPE"
  },
  {
    id: 130,
    question: "Which of the following tools is strictly prohibited for use on asbestos-containing materials?",
    options: [
      "Hand saw with slow cutting action",
      "Angle grinder",
      "Hand scraper",
      "Pump-action spray bottle"
    ],
    correctAnswer: 1,
    explanation: "Angle grinders are strictly prohibited for use on asbestos-containing materials because they generate extremely high levels of airborne fibres through high-speed abrasion. Other prohibited power tools include dry drilling equipment and compressed air. Low-speed hand tools that minimise fibre release are preferred.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Prohibited tools",
    category: "Safe Working & PPE"
  },
  {
    id: 131,
    question: "What is the purpose of wet working methods when dealing with asbestos?",
    options: [
      "To dissolve the asbestos fibres completely",
      "To suppress airborne fibre release by keeping the material damp",
      "To wash the asbestos down the drain",
      "To test whether the material contains asbestos"
    ],
    correctAnswer: 1,
    explanation: "Wet working methods suppress airborne fibre release by keeping asbestos-containing materials damp during work. Water does not dissolve asbestos fibres but prevents them from becoming airborne. A fine mist spray using water with a small amount of wetting agent is typically used.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Wet working methods",
    category: "Safe Working & PPE"
  },
  {
    id: 132,
    question: "What is a Class H vacuum cleaner designed for?",
    options: [
      "General household cleaning",
      "Collecting large debris on construction sites",
      "Filtering hazardous dusts including asbestos fibres using a HEPA filter",
      "Wet vacuuming of flooded areas"
    ],
    correctAnswer: 2,
    explanation: "A Class H vacuum cleaner is specifically designed for collecting hazardous dusts, including asbestos fibres. It contains a HEPA (High Efficiency Particulate Air) filter that captures 99.995% of particles. Standard domestic or industrial vacuums must never be used for asbestos as they will blow fibres straight through their filters and into the air.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Class H HEPA vacuum",
    category: "Safe Working & PPE"
  },
  {
    id: 133,
    question: "Which HSE guidance document provides task-specific information sheets for non-licensed asbestos work?",
    options: [
      "HSG248 — Asbestos: The Analysts' Guide",
      "HSG264 — Asbestos: The Survey Guide",
      "HSG210 — Asbestos Essentials",
      "L143 — Managing and Working with Asbestos"
    ],
    correctAnswer: 2,
    explanation: "HSG210, known as 'Asbestos Essentials', provides task-specific guidance sheets for non-licensed asbestos work. It contains equipment and method (EM) sheets that describe how to carry out common tasks safely, making it an essential reference for anyone undertaking non-licensed asbestos work.",
    section: "Module 4",
    difficulty: "basic",
    topic: "HSE Asbestos Essentials HSG210",
    category: "Safe Working & PPE"
  },
  {
    id: 134,
    question: "What is shadow vacuuming?",
    options: [
      "Vacuuming in the dark to see dust particles in torchlight",
      "Holding the nozzle of a Class H vacuum close to the point of work to capture fibres as they are released",
      "Vacuuming the shadow areas behind large objects",
      "Using two vacuum cleaners simultaneously for double filtration"
    ],
    correctAnswer: 1,
    explanation: "Shadow vacuuming involves holding the nozzle of a Class H HEPA vacuum cleaner close to the point where work is being carried out, capturing asbestos fibres at source as they are released. This technique significantly reduces airborne fibre levels in the work area.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Shadow vacuuming",
    category: "Safe Working & PPE"
  },
  {
    id: 135,
    question: "A half-mask respirator fitted with a P3 filter has an Assigned Protection Factor (APF) of what value?",
    options: [
      "APF 10",
      "APF 20",
      "APF 40",
      "APF 100"
    ],
    correctAnswer: 1,
    explanation: "A half-mask respirator fitted with P3 filters has an APF of 20, the same as an FFP3 disposable respirator. Both reduce the wearer's exposure by a factor of 20. For higher protection, a full-face mask with P3 filters (APF 40) or powered air-purifying respirator (APF 40) would be required.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "RPE types",
    category: "Safe Working & PPE"
  },
  {
    id: 136,
    question: "What is the Assigned Protection Factor (APF) of a full-face respirator fitted with a P3 filter?",
    options: [
      "APF 10",
      "APF 20",
      "APF 40",
      "APF 100"
    ],
    correctAnswer: 2,
    explanation: "A full-face respirator fitted with P3 filters has an APF of 40, meaning it reduces exposure by a factor of 40. This is double the protection offered by a half-mask P3 or FFP3 disposable (APF 20) and is required for higher-risk work where fibre levels may be elevated.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "RPE types",
    category: "Safe Working & PPE"
  },
  {
    id: 137,
    question: "What APF does a powered air-purifying respirator (PAPR) with a P3 filter typically provide?",
    options: [
      "APF 10",
      "APF 20",
      "APF 40",
      "APF 200"
    ],
    correctAnswer: 2,
    explanation: "A powered air-purifying respirator (PAPR) with P3 filtration typically provides an APF of 40. PAPRs use a battery-powered fan to draw air through the filter, making breathing easier and more comfortable during extended work periods. They are particularly useful for workers who cannot achieve a good face-fit with tight-fitting masks.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "RPE types",
    category: "Safe Working & PPE"
  },
  {
    id: 138,
    question: "Which of the following is the correct order for the 7-step decontamination sequence when leaving an asbestos work area?",
    options: [
      "Remove RPE, remove coveralls, wash hands, vacuum coveralls, remove boot covers, remove gloves, shower",
      "Vacuum coveralls, remove boot covers, remove outer gloves, remove coveralls, remove inner gloves, wash/shower, remove RPE",
      "Remove coveralls, remove gloves, remove RPE, remove boot covers, shower, wash hands, dry off",
      "Shower, remove RPE, remove coveralls, remove gloves, remove boot covers, vacuum down, wash hands"
    ],
    correctAnswer: 1,
    explanation: "The correct 7-step decontamination sequence is: (1) vacuum coveralls whilst still wearing all PPE, (2) remove boot covers, (3) remove outer gloves, (4) remove coveralls (rolling inside out), (5) remove inner gloves, (6) wash or shower, (7) remove RPE last. The RPE is always the last item removed to maintain respiratory protection throughout decontamination.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "7-step decontamination sequence",
    category: "Safe Working & PPE"
  },
  {
    id: 139,
    question: "Why must RPE be the last item of PPE removed during decontamination?",
    options: [
      "Because it is the most expensive item to replace",
      "Because the RPE strap could damage the coveralls if removed first",
      "Because airborne fibres may still be present on the worker's body and clothing during decontamination",
      "Because HSE requires a photograph of workers wearing RPE during decontamination"
    ],
    correctAnswer: 2,
    explanation: "RPE must be the last item removed because asbestos fibres may still be present in the air around the worker during the decontamination process. Removing coveralls, gloves, and boot covers can disturb fibres trapped on these items. Keeping the respirator on until last ensures continued respiratory protection throughout.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "7-step decontamination sequence",
    category: "Safe Working & PPE"
  },
  {
    id: 140,
    question: "What is the glove bag technique used for?",
    options: [
      "Storing used gloves after asbestos work",
      "Enclosing small-scale asbestos removal tasks such as removing lagging from pipes",
      "Testing the integrity of disposable gloves before use",
      "Carrying asbestos waste samples to the laboratory"
    ],
    correctAnswer: 1,
    explanation: "The glove bag technique uses a specially designed polyethylene bag fitted with integral gloves to enclose small-scale asbestos removal tasks, such as removing lagging from pipes, valves, or similar fittings. It provides a sealed environment that contains fibre release, protecting both the worker and the surrounding area.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Glove bag technique",
    category: "Safe Working & PPE"
  },
  {
    id: 141,
    question: "When preparing a work area for asbestos removal, which of the following measures should be taken?",
    options: [
      "Open all windows to maximise natural ventilation",
      "Seal off the area with polythene sheeting and warning signs, and set up a decontamination unit",
      "Paint over the asbestos to seal it before removal",
      "Cover the asbestos with newspaper and masking tape"
    ],
    correctAnswer: 1,
    explanation: "Work area preparation for asbestos removal involves sealing the area with polythene sheeting (typically 1000-gauge), displaying warning signs, removing movable items or covering fixed items with polythene, setting up negative pressure units where required, and establishing a decontamination facility. Opening windows would spread fibres outside the controlled area.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Work area preparation",
    category: "Safe Working & PPE"
  },
  {
    id: 142,
    question: "Which of the following is a prohibited practice when working with asbestos-containing materials?",
    options: [
      "Using a pump-action spray to dampen materials",
      "Using a Class H vacuum for dust collection",
      "Using compressed air to clean dust from surfaces",
      "Using hand tools for careful removal"
    ],
    correctAnswer: 2,
    explanation: "Using compressed air to clean dust from surfaces is strictly prohibited when working with asbestos. Compressed air blasts fibres into the air at high velocity, creating dangerous airborne concentrations. Similarly, dry sweeping and the use of standard vacuums are prohibited. Only Class H HEPA vacuums and damp wiping should be used for cleaning.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Prohibited tools",
    category: "Safe Working & PPE"
  },
  {
    id: 143,
    question: "What is the primary purpose of a dynamic risk assessment during asbestos work?",
    options: [
      "To replace the need for a written risk assessment",
      "To continuously reassess risks as conditions change during the work",
      "To calculate the financial cost of the asbestos removal project",
      "To determine whether the building should be demolished"
    ],
    correctAnswer: 1,
    explanation: "A dynamic risk assessment is an ongoing process of identifying and responding to new hazards as they arise during the work. Conditions on site can change — for example, material may be in worse condition than expected, or unforeseen asbestos may be discovered. Workers must be trained to recognise these changes and adapt their approach accordingly.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Dynamic risk assessment",
    category: "Safe Working & PPE"
  },
  {
    id: 144,
    question: "A task-specific risk assessment for asbestos work must consider which of the following?",
    options: [
      "Only the type of asbestos present",
      "Only the condition of the asbestos material",
      "The type of asbestos, its condition, the extent of work, and the likelihood of fibre release",
      "Only the cost of the RPE needed"
    ],
    correctAnswer: 2,
    explanation: "A task-specific risk assessment must consider multiple factors: the type of asbestos present, its condition (friable or bonded), the extent and nature of the work, the likelihood and degree of fibre release, the number of workers potentially exposed, and the control measures required. All these factors determine the appropriate precautions.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Task-specific risk assessment",
    category: "Safe Working & PPE"
  },
  {
    id: 145,
    question: "For non-licensed asbestos work, which of the following statements is correct?",
    options: [
      "No risk assessment is needed as the work is low risk",
      "Workers must still follow safe working procedures but do not need an HSE licence or to notify HSE",
      "Workers can use standard domestic vacuum cleaners",
      "No PPE or RPE is required"
    ],
    correctAnswer: 1,
    explanation: "Non-licensed work is the lowest risk category, but it still requires a risk assessment, safe working procedures, appropriate RPE and PPE, and proper waste disposal. The key difference is that workers do not need an HSE licence and do not need to notify HSE via ASB5 (which is required for NNLW). No asbestos work is exempt from basic safety precautions.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Non-licensed work requirements",
    category: "Safe Working & PPE"
  },
  {
    id: 146,
    question: "Which type of enclosure is used for large-scale licensed asbestos removal?",
    options: [
      "A cardboard enclosure taped at the seams",
      "A full enclosure constructed from polythene sheeting with an airlock entry, maintained under negative pressure",
      "A metal shipping container placed over the work area",
      "A temporary fence with warning signs"
    ],
    correctAnswer: 1,
    explanation: "Large-scale licensed asbestos removal uses a full enclosure constructed from polythene sheeting, typically with a three-stage airlock entry system and maintained under negative pressure by air extraction units fitted with HEPA filters. This prevents fibres escaping the work area. The enclosure must pass a smoke test before work begins to confirm it is airtight.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Enclosures",
    category: "Safe Working & PPE"
  },
  {
    id: 147,
    question: "Why should two pairs of gloves be worn during asbestos work?",
    options: [
      "To provide extra warmth in cold conditions",
      "To allow the outer pair to be removed during decontamination while maintaining hand protection with the inner pair",
      "Because single gloves are not available in the correct sizes",
      "To improve grip when handling heavy materials"
    ],
    correctAnswer: 1,
    explanation: "Two pairs of gloves are worn so that the contaminated outer pair can be removed during the decontamination sequence while the inner pair continues to protect the hands from residual contamination. The inner gloves are then removed separately before washing, maintaining a barrier between contaminated surfaces and skin throughout the process.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "PPE",
    category: "Safe Working & PPE"
  },
  {
    id: 148,
    question: "What must happen before any tight-fitting RPE is used for asbestos work?",
    options: [
      "The RPE must be painted white for visibility",
      "The wearer must pass a qualitative or quantitative face-fit test for that specific make and model of RPE",
      "The RPE must be soaked in water for 30 minutes",
      "The wearer must hold their breath for 60 seconds to test lung capacity"
    ],
    correctAnswer: 1,
    explanation: "Before using tight-fitting RPE for asbestos work, each wearer must pass a face-fit test for the specific make and model they will use. Face-fit testing can be qualitative (taste test) or quantitative (using measurement equipment). A new test is required if the wearer changes to a different make or model, or if their facial features change significantly.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Face-fit testing",
    category: "Safe Working & PPE"
  },
  {
    id: 149,
    question: "HSG210 Asbestos Essentials provides task sheets categorised by which system?",
    options: [
      "A colour-coded traffic light system (red, amber, green)",
      "Equipment and method (EM) sheets and task guidance sheets organised by material type and task",
      "A star rating from 1 to 5 based on danger level",
      "Alphabetical categories from A to Z"
    ],
    correctAnswer: 1,
    explanation: "HSG210 Asbestos Essentials provides equipment and method (EM) sheets that describe the equipment and methods needed, along with task guidance sheets organised by the type of asbestos material and the specific task to be carried out. This practical structure helps duty holders select the right precautions for each job.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "HSE Asbestos Essentials HSG210",
    category: "Safe Working & PPE"
  },
  {
    id: 150,
    question: "Which of the following actions should be taken during a face-fit check (seal check) each time RPE is put on?",
    options: [
      "Blow outward hard and check for leaks around the face seal",
      "Inhale sharply while covering the filters to check the mask draws inward against the face",
      "Shake the head vigorously to see if the mask falls off",
      "Spray perfume near the mask to check for odour penetration"
    ],
    correctAnswer: 1,
    explanation: "A fit check (not to be confused with a fit test) should be performed every time RPE is donned. The wearer covers the filters and inhales sharply — if the mask draws inward against the face and holds, it indicates a good seal. This quick check helps identify obvious leaks before entering the work area, though it does not replace a formal face-fit test.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Face-fit testing",
    category: "Safe Working & PPE"
  },
  {
    id: 151,
    question: "Why are standard domestic or commercial vacuum cleaners prohibited for cleaning up asbestos dust?",
    options: [
      "They are too noisy for use on construction sites",
      "Their filters cannot trap asbestos fibres, so they exhaust contaminated air back into the environment",
      "They are too heavy to carry into the work area",
      "They use too much electricity"
    ],
    correctAnswer: 1,
    explanation: "Standard vacuum cleaners lack HEPA filtration and cannot trap asbestos fibres, which are typically 0.1 to 10 micrometres in size. The fibres pass straight through ordinary filters and are blown back into the air, actually increasing airborne contamination. Only Class H vacuum cleaners with HEPA filters (99.995% efficiency) may be used.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Prohibited tools",
    category: "Safe Working & PPE"
  },
  {
    id: 152,
    question: "Licensed asbestos work requires notification to HSE at least how many days before work commences?",
    options: [
      "7 days",
      "14 days",
      "21 days",
      "28 days"
    ],
    correctAnswer: 1,
    explanation: "Licensed asbestos work requires notification to HSE at least 14 days before the work is due to start. This notification period allows HSE to review the plan of work and, if necessary, inspect the site before work begins. In some exceptional circumstances, the 14-day period may be reduced with HSE agreement.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Licensed work requirements",
    category: "Safe Working & PPE"
  },
  {
    id: 153,
    question: "A worker discovers that the asbestos material they are working on is in significantly worse condition than described in the risk assessment. What should they do?",
    options: [
      "Continue working but slightly faster to reduce exposure time",
      "Stop work immediately, leave the area, and report the situation so the risk assessment can be reviewed",
      "Remove their RPE to get a better look at the material",
      "Cover the material with paint and continue"
    ],
    correctAnswer: 1,
    explanation: "If conditions differ from those described in the risk assessment, work must stop immediately. This is a key element of dynamic risk assessment — workers must be empowered to halt work when unexpected conditions are found. The area should be made safe, all workers should leave, and the risk assessment and method statement must be reviewed before work can resume.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Dynamic risk assessment",
    category: "Safe Working & PPE"
  },
  {
    id: 154,
    question: "During a licensed asbestos removal project, the negative pressure unit fails. What is the correct immediate action?",
    options: [
      "Continue removal but open a window for ventilation",
      "Stop all work immediately, seal the enclosure, and do not resume until the NPU is repaired or replaced and negative pressure is re-established",
      "Switch to using a standard fan to maintain airflow",
      "Continue working as the polythene sheeting will contain the fibres"
    ],
    correctAnswer: 1,
    explanation: "If the negative pressure unit (NPU) fails, all work must stop immediately. Negative pressure prevents fibre escape from the enclosure — without it, fibres could leak into surrounding areas through any imperfections in the enclosure. The enclosure must be sealed, and work cannot resume until the NPU is repaired or replaced and negative pressure is confirmed.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Enclosures",
    category: "Safe Working & PPE"
  },
  {
    id: 155,
    question: "A contractor claims their workers do not need face-fit testing because they use loose-fitting powered air-purifying respirators (PAPRs). Is this correct?",
    options: [
      "No — all RPE requires face-fit testing regardless of type",
      "Yes — loose-fitting PAPRs do not require face-fit testing as they do not rely on a face seal",
      "No — PAPRs require a more stringent face-fit test than other RPE",
      "Yes — but only if the workers have beards"
    ],
    correctAnswer: 1,
    explanation: "This is correct. Loose-fitting powered air-purifying respirators do not require face-fit testing because they do not rely on a seal against the face. They provide protection by delivering a continuous flow of filtered air across the face and maintaining positive pressure inside the headpiece. This also makes them suitable for workers with facial hair, which would compromise the seal of tight-fitting RPE.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Face-fit testing",
    category: "Safe Working & PPE"
  },
  {
    id: 156,
    question: "A method statement for removing asbestos insulation board (AIB) from a ceiling specifies using a glove bag. A senior operative on site suggests it would be quicker to bring the boards down by hand with wet methods. What is the correct response?",
    options: [
      "Follow the senior operative's advice as they have more experience",
      "Compromise by using wet methods for half the boards and glove bags for the rest",
      "Follow the method statement — any change to the agreed safe system of work must be formally reviewed and approved before implementation",
      "Phone HSE to ask their opinion"
    ],
    correctAnswer: 2,
    explanation: "The method statement is a formally agreed safe system of work that must be followed. Any proposed change — even if suggested by an experienced operative — must go through a formal review process. The risk assessment would need to be revisited, the method statement amended, and the revised approach approved before implementation. Deviating from the method statement on site is a serious breach of procedure.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "RAMS for asbestos work",
    category: "Safe Working & PPE"
  },
  {
    id: 157,
    question: "When selecting RPE for asbestos work, the exposure level is estimated to be 3 times the workplace exposure limit (WEL). Which is the minimum acceptable RPE?",
    options: [
      "FFP2 disposable mask (APF 10)",
      "FFP3 disposable mask (APF 20)",
      "Full-face mask with P3 filter (APF 40)",
      "Supplied-air breathing apparatus (APF 2000)"
    ],
    correctAnswer: 1,
    explanation: "When exposure is 3 times the WEL, RPE with an APF of at least 3 would mathematically suffice, but an FFP3 (APF 20) is the minimum acceptable standard for any asbestos work. The APF must exceed the estimated exposure multiple. An FFP3 with APF 20 provides a significant margin of safety. FFP2 masks are never acceptable for asbestos work.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "RPE types",
    category: "Safe Working & PPE"
  },
  {
    id: 158,
    question: "During a smoke test of an asbestos removal enclosure, smoke is seen escaping from a corner joint. What must happen?",
    options: [
      "Work can proceed if the leak is small",
      "The leak must be sealed and the smoke test repeated — the enclosure must pass before any asbestos work can begin",
      "The smoke test is only advisory, so work can start regardless",
      "The leak should be noted in the site diary but work can proceed"
    ],
    correctAnswer: 1,
    explanation: "A smoke test verifies the integrity of the enclosure. If smoke escapes, the enclosure has failed the test. The leak must be identified, repaired, and the smoke test repeated. The enclosure must achieve a complete pass — no visible smoke escape — before any asbestos removal work can begin. Starting work in a compromised enclosure would risk fibre escape into occupied areas.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Enclosures",
    category: "Safe Working & PPE"
  },
  {
    id: 159,
    question: "A worker has been face-fit tested with a Brand X FFP3 disposable respirator. Their employer purchases Brand Y FFP3 respirators as they are cheaper. Can the worker use the Brand Y respirator based on the existing face-fit test?",
    options: [
      "Yes — all FFP3 masks are the same standard so the test carries over",
      "Yes — as long as both are the same size",
      "No — face-fit testing is specific to the make and model; a new test is required for the Brand Y respirator",
      "No — the worker needs a completely new medical examination first"
    ],
    correctAnswer: 2,
    explanation: "Face-fit testing is specific to the exact make and model of RPE. Different manufacturers use different mould shapes, seal designs, and materials, meaning a mask that fits one worker perfectly from one brand may not seal properly from another. The worker must undergo a new face-fit test with the Brand Y respirator before using it for asbestos work.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Face-fit testing",
    category: "Safe Working & PPE"
  },
  {
    id: 160,
    question: "Medical surveillance for workers undertaking licensed asbestos work must include examinations at which intervals?",
    options: [
      "Monthly examinations throughout the period of work",
      "An initial medical examination before first exposure, and then at least every 2 years",
      "Only when a worker reports symptoms",
      "A single examination at the end of the project"
    ],
    correctAnswer: 1,
    explanation: "Workers carrying out licensed asbestos work must have a medical examination before first exposure to asbestos and at least every 2 years thereafter. The examination is carried out by a doctor appointed by HSE (an appointed doctor) and includes a respiratory questionnaire and lung function test. A certificate of fitness is issued and must be available on site.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Licensed work requirements",
    category: "Safe Working & PPE"
  },
  // =======================================================================
  // EMERGENCY PROCEDURES — 40 questions (id 161–200)
  // =======================================================================
  {
    id: 161,
    question: "What does the first 'S' in the 4-S emergency procedure stand for?",
    options: [
      "STOP all work immediately",
      "SEAL the affected area",
      "SIGN the area with warning notices",
      "SUMMON specialist help"
    ],
    correctAnswer: 0,
    explanation: "The first step of the 4-S emergency procedure is to STOP all work immediately. This prevents further disturbance of the suspected asbestos-containing material and limits fibre release into the atmosphere.",
    section: "Module 5",
    difficulty: "basic",
    topic: "4-S emergency procedure",
    category: "Emergency Procedures"
  },
  {
    id: 162,
    question: "In the correct order, what are the four steps of the 4-S emergency procedure for accidental asbestos disturbance?",
    options: [
      "STOP, SEAL, SIGN, SUMMON",
      "SEAL, STOP, SIGN, SUMMON",
      "STOP, SIGN, SEAL, SUMMON",
      "SUMMON, STOP, SEAL, SIGN"
    ],
    correctAnswer: 0,
    explanation: "The 4-S procedure must be followed in order: STOP all work, SEAL the area to prevent fibre spread, SIGN the area with warning notices to prevent entry, and SUMMON specialist help such as a licensed asbestos contractor.",
    section: "Module 5",
    difficulty: "basic",
    topic: "4-S emergency procedure",
    category: "Emergency Procedures"
  },
  {
    id: 163,
    question: "What constitutes an 'accidental disturbance' of asbestos?",
    options: [
      "Only when asbestos is completely destroyed during demolition",
      "Any unplanned activity that damages or disturbs known or suspected asbestos-containing materials",
      "Only when a large quantity of asbestos is broken up",
      "Only when asbestos fibres are visible in the air"
    ],
    correctAnswer: 1,
    explanation: "An accidental disturbance is any unplanned activity that damages or disturbs known or suspected asbestos-containing materials. This can include drilling, cutting, sanding, or any work that breaks the surface of ACMs, regardless of scale.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Accidental disturbance definition",
    category: "Emergency Procedures"
  },
  {
    id: 164,
    question: "When sealing an area after accidental asbestos disturbance, what is the primary purpose?",
    options: [
      "To hide the damage from inspectors",
      "To prevent the spread of asbestos fibres to other areas",
      "To create a workspace for immediate repairs",
      "To allow ventilation systems to clear the fibres"
    ],
    correctAnswer: 1,
    explanation: "Sealing the area after accidental disturbance is primarily to prevent the spread of asbestos fibres to other parts of the building. This involves closing doors and windows, shutting down ventilation systems, and using polythene sheeting if available to isolate the affected zone.",
    section: "Module 5",
    difficulty: "basic",
    topic: "4-S emergency procedure",
    category: "Emergency Procedures"
  },
  {
    id: 165,
    question: "After stopping work following accidental asbestos disturbance, what should you do with any mechanical ventilation or air conditioning systems in the area?",
    options: [
      "Turn them to maximum to disperse fibres",
      "Leave them as they are",
      "Switch them off to prevent fibre spread through ductwork",
      "Reverse them to draw fibres outside"
    ],
    correctAnswer: 2,
    explanation: "Mechanical ventilation and air conditioning systems must be switched off immediately to prevent asbestos fibres being circulated through ductwork to other parts of the building. Leaving them running could contaminate a much larger area.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Immediate actions",
    category: "Emergency Procedures"
  },
  {
    id: 166,
    question: "Who should be summoned as specialist help following an accidental asbestos disturbance involving licensable work materials?",
    options: [
      "The building's maintenance team",
      "A licensed asbestos removal contractor",
      "The local fire brigade",
      "An environmental health officer only"
    ],
    correctAnswer: 1,
    explanation: "A licensed asbestos removal contractor must be summoned for incidents involving licensable asbestos-containing materials. They have the training, equipment, and HSE licence required to safely manage the contamination and carry out remediation work.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Who to call",
    category: "Emergency Procedures"
  },
  {
    id: 167,
    question: "Which of the following must be recorded as part of an asbestos incident report?",
    options: [
      "Only the names of those who discovered the disturbance",
      "The date, time, location, people exposed, material involved, and actions taken",
      "Only the cost of remediation",
      "Only whether anyone felt unwell at the time"
    ],
    correctAnswer: 1,
    explanation: "A thorough incident record must include the date and time of the disturbance, precise location, names of all people potentially exposed, type and condition of material involved, extent of damage, and all actions taken in response. This is essential for RIDDOR reporting and any future health surveillance.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Incident recording",
    category: "Emergency Procedures"
  },
  {
    id: 168,
    question: "Under RIDDOR 2013, accidental release of asbestos fibres into the atmosphere is classified as what type of event?",
    options: [
      "A minor incident not requiring reporting",
      "A dangerous occurrence that must be reported to the HSE",
      "An environmental matter reported to the Environment Agency only",
      "A near miss recorded internally only"
    ],
    correctAnswer: 1,
    explanation: "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR) 2013, the accidental release or escape of asbestos fibres into the atmosphere is classified as a dangerous occurrence. It must be reported to the HSE without delay.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "RIDDOR reporting",
    category: "Emergency Procedures"
  },
  {
    id: 169,
    question: "How quickly must a RIDDOR dangerous occurrence involving asbestos release be reported to the HSE?",
    options: [
      "Within 30 days",
      "Within 14 days",
      "Without delay — by the quickest practicable means",
      "At the next scheduled quarterly report"
    ],
    correctAnswer: 2,
    explanation: "Dangerous occurrences, including the accidental release of asbestos fibres, must be reported to the HSE without delay by the quickest practicable means. This is typically done by telephone or online via the HSE's RIDDOR reporting system, followed by a written report within 10 days.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "RIDDOR reporting",
    category: "Emergency Procedures"
  },
  {
    id: 170,
    question: "What is the first step in the personal decontamination sequence after potential asbestos exposure?",
    options: [
      "Remove all clothing and place in a labelled bag",
      "Shower thoroughly",
      "Move to a clean area away from the contamination",
      "Wipe down boots and hard surfaces with damp rags"
    ],
    correctAnswer: 2,
    explanation: "The first step in personal decontamination is to move to a clean area away from the contamination zone. This prevents further exposure and cross-contamination before beginning the decontamination steps. You should avoid walking through other occupied areas on the way.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Personal decontamination (7-step sequence)",
    category: "Emergency Procedures"
  },
  {
    id: 171,
    question: "During personal decontamination after asbestos exposure, why should contaminated clothing be dampened before removal?",
    options: [
      "To make the clothing easier to fold",
      "To reduce the release of fibres into the air during removal",
      "To wash out the fibres while still wearing the clothing",
      "To prevent static electricity"
    ],
    correctAnswer: 1,
    explanation: "Dampening contaminated clothing before removal suppresses asbestos fibres, reducing the number released into the air during the removal process. Dry fibres are easily disturbed and become airborne, increasing the risk of inhalation.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Personal decontamination (7-step sequence)",
    category: "Emergency Procedures"
  },
  {
    id: 172,
    question: "After removing contaminated clothing during decontamination, what should be done with it?",
    options: [
      "Put it in the normal laundry",
      "Hang it outside to air dry",
      "Place it in a clearly labelled asbestos waste bag for disposal",
      "Brush it down and store it separately"
    ],
    correctAnswer: 2,
    explanation: "Contaminated clothing must be placed in a clearly labelled asbestos waste bag and disposed of as hazardous waste. It must never be taken home, brushed down, or put through normal laundry, as this would spread contamination.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Personal decontamination (7-step sequence)",
    category: "Emergency Procedures"
  },
  {
    id: 173,
    question: "What is the purpose of the 4-stage clearance procedure following asbestos removal work?",
    options: [
      "To verify the area is safe for reoccupation",
      "To calculate the final cost of the removal project",
      "To test the structural integrity of the building",
      "To confirm the asbestos type that was removed"
    ],
    correctAnswer: 0,
    explanation: "The 4-stage clearance procedure is designed to verify that an area is safe for reoccupation after asbestos removal work. It provides a systematic and thorough check that all asbestos has been removed and fibre levels are within acceptable limits.",
    section: "Module 5",
    difficulty: "basic",
    topic: "4-stage clearance procedure",
    category: "Emergency Procedures"
  },
  {
    id: 174,
    question: "What is Stage 1 of the 4-stage clearance procedure?",
    options: [
      "Air monitoring to check fibre levels",
      "A preliminary check of the site and a visual inspection inside the enclosure",
      "Dismantling the enclosure",
      "Independent inspection by the analyst"
    ],
    correctAnswer: 1,
    explanation: "Stage 1 is a preliminary check and visual inspection inside the enclosure by the asbestos removal supervisor. This ensures all visible asbestos debris, residues, and contamination have been removed before the independent analyst conducts their inspection.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "4-stage clearance procedure",
    category: "Emergency Procedures"
  },
  {
    id: 175,
    question: "Who must carry out the Stage 2 visual inspection of the 4-stage clearance procedure?",
    options: [
      "The asbestos removal contractor's own supervisor",
      "The building owner",
      "An independent analyst holding appropriate UKAS accreditation",
      "Any competent person nominated by the client"
    ],
    correctAnswer: 2,
    explanation: "Stage 2 must be carried out by an independent analyst holding appropriate UKAS accreditation. Independence is critical to ensure impartial assessment — the analyst must not be employed by or have a commercial relationship with the removal contractor.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "4-stage clearance procedure",
    category: "Emergency Procedures"
  },
  {
    id: 176,
    question: "What does Stage 3 of the 4-stage clearance procedure involve?",
    options: [
      "A visual inspection by the removal contractor",
      "Air monitoring (reassurance air testing) to confirm fibre levels are below the clearance indicator",
      "Disposal of all waste materials",
      "Issuing the certificate of reoccupation"
    ],
    correctAnswer: 1,
    explanation: "Stage 3 involves air monitoring (reassurance air testing) to confirm that airborne fibre concentrations have fallen below the clearance indicator level of 0.01 fibres per millilitre of air. This is performed by the independent analyst after the enclosure has passed the Stage 2 visual inspection.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "4-stage clearance procedure",
    category: "Emergency Procedures"
  },
  {
    id: 177,
    question: "What is the clearance indicator fibre level that must be achieved before an area can be reoccupied after asbestos removal?",
    options: [
      "0.1 fibres/ml",
      "0.05 fibres/ml",
      "0.01 fibres/ml",
      "Zero fibres/ml"
    ],
    correctAnswer: 2,
    explanation: "The clearance indicator is 0.01 fibres per millilitre of air (f/ml). This must be achieved during Stage 3 reassurance air testing before the area can proceed to Stage 4 (final assessment) and be deemed safe for reoccupation.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "4-stage clearance procedure",
    category: "Emergency Procedures"
  },
  {
    id: 178,
    question: "Under UK waste regulations, how is asbestos waste classified?",
    options: [
      "General commercial waste",
      "Recyclable construction waste",
      "Hazardous waste (special waste in Scotland)",
      "Controlled but non-hazardous waste"
    ],
    correctAnswer: 2,
    explanation: "Asbestos waste is classified as hazardous waste under the Hazardous Waste Regulations 2005 in England and Wales, and as special waste under the Special Waste Regulations 1996 in Scotland. It must be handled, transported, and disposed of accordingly.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Waste classification (hazardous waste)",
    category: "Emergency Procedures"
  },
  {
    id: 179,
    question: "What is the purpose of double-bagging asbestos waste?",
    options: [
      "To make the bags easier to carry",
      "To colour-code different types of asbestos",
      "To provide an additional layer of containment in case the inner bag is punctured",
      "To separate wet waste from dry waste"
    ],
    correctAnswer: 2,
    explanation: "Double-bagging provides an additional layer of containment. If the inner bag is punctured or damaged, the outer bag prevents fibres from escaping. The inner bag is sealed inside the contaminated area and the outer bag is applied in the clean area during the bag-out procedure.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Double-bagging procedure",
    category: "Emergency Procedures"
  },
  {
    id: 180,
    question: "What colour are the inner bags used for asbestos waste disposal?",
    options: [
      "Black",
      "Red with white asbestos warning",
      "Clear or transparent",
      "Yellow"
    ],
    correctAnswer: 1,
    explanation: "The inner bags used for asbestos waste are red and clearly marked with the asbestos warning label (white 'a' symbol on a red background). This ensures anyone handling the waste can immediately identify it as containing asbestos.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Double-bagging procedure",
    category: "Emergency Procedures"
  },
  {
    id: 181,
    question: "What document must accompany asbestos waste during transportation to a licensed disposal site?",
    options: [
      "A building survey report",
      "A consignment note (hazardous waste consignment note)",
      "A planning permission certificate",
      "An insurance certificate"
    ],
    correctAnswer: 1,
    explanation: "A hazardous waste consignment note must accompany asbestos waste during transportation. This document tracks the waste from its point of production to its final disposal site, creating a complete audit trail as required by the Hazardous Waste Regulations.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Consignment notes",
    category: "Emergency Procedures"
  },
  {
    id: 182,
    question: "How long must consignment notes for asbestos waste disposal be retained?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "Indefinitely"
    ],
    correctAnswer: 1,
    explanation: "Consignment notes for hazardous waste, including asbestos, must be retained for a minimum of 3 years. This applies to all parties involved — the waste producer, the carrier, and the disposal site operator — to maintain a full audit trail.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Consignment notes",
    category: "Emergency Procedures"
  },
  {
    id: 183,
    question: "Who is legally permitted to transport asbestos waste?",
    options: [
      "Any person with a vehicle large enough",
      "Only the waste producer themselves",
      "A registered waste carrier holding appropriate authorisation",
      "Any skip hire company"
    ],
    correctAnswer: 2,
    explanation: "Only registered waste carriers holding appropriate authorisation from the Environment Agency (or equivalent in Scotland/Wales) are legally permitted to transport asbestos waste. Using unregistered carriers is a criminal offence under the Environmental Protection Act 1990.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Licensed waste carriers",
    category: "Emergency Procedures"
  },
  {
    id: 184,
    question: "What specific packaging requirement applies to asbestos-containing waste that could release fibres during handling?",
    options: [
      "It must be wrapped in brown paper",
      "It must be sealed in UN-approved packaging or double-bagged in heavy-duty polythene",
      "It can be placed in any container with a lid",
      "It only needs a warning label attached"
    ],
    correctAnswer: 1,
    explanation: "Asbestos waste that could release fibres must be sealed in UN-approved packaging or double-bagged in heavy-duty polythene bags (minimum 1000 gauge). Larger items like asbestos cement sheets must be wrapped in heavy-duty polythene and sealed with tape.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Waste packaging requirements",
    category: "Emergency Procedures"
  },
  {
    id: 185,
    question: "Under the Control of Asbestos Regulations 2012, who is responsible for arranging health surveillance for workers exposed to asbestos?",
    options: [
      "The workers themselves",
      "The employer",
      "The HSE directly",
      "The local authority"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 22 of the Control of Asbestos Regulations 2012, the employer is responsible for ensuring adequate health surveillance is provided for employees who are, or are liable to be, exposed to asbestos above specified levels or who carry out licensable work with asbestos.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Health surveillance requirements",
    category: "Emergency Procedures"
  },
  {
    id: 186,
    question: "What does a medical examination for asbestos workers typically include?",
    options: [
      "Blood tests and X-rays only",
      "A questionnaire on respiratory symptoms, a physical examination, and lung function tests",
      "A fitness test and hearing assessment",
      "Only a chest X-ray every five years"
    ],
    correctAnswer: 1,
    explanation: "A medical examination for asbestos workers typically includes a questionnaire covering respiratory symptoms and occupational history, a physical examination of the chest, and lung function tests (spirometry). The purpose is to establish a baseline and detect early signs of asbestos-related disease.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Medical examination content",
    category: "Emergency Procedures"
  },
  {
    id: 187,
    question: "How often must workers who carry out licensable asbestos work undergo medical examinations?",
    options: [
      "Every 6 months",
      "Every year",
      "At least every 2 years",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Workers carrying out licensable asbestos work must undergo a medical examination before starting such work and at least every 2 years thereafter. More frequent examinations may be recommended by the appointed doctor based on individual circumstances.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Health surveillance requirements",
    category: "Emergency Procedures"
  },
  {
    id: 188,
    question: "What is the purpose of lung function testing (spirometry) in asbestos health surveillance?",
    options: [
      "To measure blood oxygen levels only",
      "To establish a baseline and detect any decline in lung capacity that may indicate asbestos-related disease",
      "To determine whether the worker is physically fit for manual labour",
      "To check for lung cancer specifically"
    ],
    correctAnswer: 1,
    explanation: "Spirometry establishes a baseline measurement of lung function and allows detection of any progressive decline in lung capacity. A reduction in lung function over time may indicate developing asbestosis or other asbestos-related conditions, enabling early intervention.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Lung function tests",
    category: "Emergency Procedures"
  },
  {
    id: 189,
    question: "When a worker is exposed to asbestos at work, should their GP be informed?",
    options: [
      "No, medical information is confidential to the employer only",
      "Only if the worker develops symptoms",
      "Yes, the worker should inform their GP so it can be noted on their medical records",
      "Only if the HSE issues a formal notification"
    ],
    correctAnswer: 2,
    explanation: "Workers should inform their GP about any workplace asbestos exposure so it can be recorded on their medical records. This is important for long-term health monitoring, as asbestos-related diseases can develop 15–60 years after exposure and GPs need to be aware of the exposure history.",
    section: "Module 5",
    difficulty: "basic",
    topic: "GP notification",
    category: "Emergency Procedures"
  },
  {
    id: 190,
    question: "For how long must employers retain health surveillance records for workers exposed to asbestos?",
    options: [
      "10 years",
      "20 years",
      "40 years from the date of the last entry",
      "For the worker's lifetime only"
    ],
    correctAnswer: 2,
    explanation: "Health surveillance records must be retained for at least 40 years from the date of the last entry. This extended period reflects the very long latency of asbestos-related diseases, which can take decades to develop after initial exposure.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Record keeping (40 years)",
    category: "Emergency Procedures"
  },
  {
    id: 191,
    question: "What is IIDB in the context of asbestos-related compensation?",
    options: [
      "International Insurance for Dangerous Buildings",
      "Industrial Injuries Disablement Benefit — a government benefit for people with prescribed industrial diseases",
      "Internal Investigation of Dust-related Bronchitis",
      "Insurance Industry Dispute Board"
    ],
    correctAnswer: 1,
    explanation: "IIDB (Industrial Injuries Disablement Benefit) is a government benefit available to people who have a prescribed industrial disease, including asbestos-related conditions such as mesothelioma, asbestosis, and diffuse pleural thickening. It is administered by the Department for Work and Pensions.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Compensation routes (IIDB, civil claims, DMPS)",
    category: "Emergency Procedures"
  },
  {
    id: 192,
    question: "What is the Diffuse Mesothelioma Payment Scheme (DMPS)?",
    options: [
      "A scheme to fund asbestos removal from public buildings",
      "A compensation scheme for mesothelioma sufferers who cannot trace a liable employer or their insurer",
      "A medical treatment programme for mesothelioma patients",
      "An HSE training scheme for mesothelioma awareness"
    ],
    correctAnswer: 1,
    explanation: "The Diffuse Mesothelioma Payment Scheme (DMPS) provides lump-sum compensation payments to people with diffuse mesothelioma who are unable to claim against a liable employer or their employer's liability insurer, for example because the employer no longer exists.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Compensation routes (IIDB, civil claims, DMPS)",
    category: "Emergency Procedures"
  },
  {
    id: 193,
    question: "Under the Control of Asbestos Regulations 2012, which of the following is an employer's duty?",
    options: [
      "To provide suitable RPE, training, and health surveillance for workers exposed to asbestos",
      "To allow workers to decide their own safe working procedures",
      "To report incidents only when asked by the HSE",
      "To ensure asbestos is present in all pre-2000 buildings"
    ],
    correctAnswer: 0,
    explanation: "Employers have a duty to provide suitable respiratory protective equipment (RPE), adequate training, and health surveillance for workers who are or may be exposed to asbestos. They must also ensure exposure is reduced to as low as reasonably practicable and kept below the control limit.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Employer duties",
    category: "Emergency Procedures"
  },
  {
    id: 194,
    question: "What is an employee's duty regarding asbestos safety at work?",
    options: [
      "To carry out their own asbestos surveys",
      "To cooperate with their employer's safety measures and use PPE and RPE provided correctly",
      "To purchase their own protective equipment",
      "To decide independently which materials contain asbestos"
    ],
    correctAnswer: 1,
    explanation: "Employees have a duty to cooperate with their employer's safety measures, use PPE and RPE provided correctly, follow safe systems of work, report any defects in equipment, and not carry out work on materials they suspect contain asbestos without proper authorisation.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Employee duties",
    category: "Emergency Procedures"
  },
  {
    id: 195,
    question: "Under Regulation 4 of the Control of Asbestos Regulations 2012, who is the 'dutyholder' responsible for managing asbestos in non-domestic premises?",
    options: [
      "Only the freeholder of the building",
      "The person who has the duty to maintain or repair the premises, or who has control of the premises",
      "Only the Health and Safety Executive",
      "The local authority building control officer"
    ],
    correctAnswer: 1,
    explanation: "The dutyholder is the person who has the duty to maintain or repair non-domestic premises by virtue of a contract or tenancy, or who has control of the premises. This could be the building owner, tenant, or managing agent depending on contractual arrangements.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Dutyholder responsibilities",
    category: "Emergency Procedures"
  },
  {
    id: 196,
    question: "Under CDM 2015, what duty does a client have regarding asbestos before commissioning construction work?",
    options: [
      "No duty — this falls entirely on the contractor",
      "To provide pre-construction information including details of any known asbestos in the building",
      "To remove all asbestos before any construction begins",
      "To notify the local council only"
    ],
    correctAnswer: 1,
    explanation: "Under the Construction (Design and Management) Regulations 2015, the client must provide pre-construction information to designers and contractors. This includes details of any known or suspected asbestos-containing materials, informed by the asbestos register and management survey.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "CDM 2015 client duties",
    category: "Emergency Procedures"
  },
  {
    id: 197,
    question: "What is an HSE Improvement Notice?",
    options: [
      "A notice requiring immediate cessation of all work on site",
      "A formal notice requiring a dutyholder to remedy a contravention of health and safety law within a specified time",
      "A recommendation with no legal force",
      "An award for good safety practice"
    ],
    correctAnswer: 1,
    explanation: "An Improvement Notice is served by an HSE inspector when they identify a contravention of health and safety legislation. It requires the dutyholder to remedy the contravention within a specified period. Failure to comply is a criminal offence.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "HSE enforcement",
    category: "Emergency Procedures"
  },
  {
    id: 198,
    question: "When can an HSE inspector issue a Prohibition Notice in relation to asbestos work?",
    options: [
      "Only after a court hearing",
      "When there is a risk of serious personal injury from the work activity, requiring it to stop immediately",
      "Only when someone has already been injured",
      "Only for licensed asbestos removal work"
    ],
    correctAnswer: 1,
    explanation: "An HSE inspector can issue a Prohibition Notice when they believe a work activity involves, or will involve, a risk of serious personal injury. The notice can take effect immediately, stopping the activity until the matter is remedied. It applies to any asbestos-related work, not just licensed work.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "HSE enforcement",
    category: "Emergency Procedures"
  },
  {
    id: 199,
    question: "Under the Public Interest Disclosure Act 1998 (PIDA), what protection is given to a worker who reports unsafe asbestos practices?",
    options: [
      "No specific protection exists",
      "Protection only if the report is made anonymously",
      "Protection from dismissal or detriment for making a qualifying disclosure about health and safety dangers",
      "Protection only if the report leads to a prosecution"
    ],
    correctAnswer: 2,
    explanation: "The Public Interest Disclosure Act 1998 (PIDA) protects workers (whistleblowers) from dismissal or other detriment if they make a qualifying disclosure about health and safety dangers in the workplace. This includes reporting unsafe asbestos working practices to the employer or a prescribed body such as the HSE.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Whistleblowing rights (PIDA)",
    category: "Emergency Procedures"
  },
  {
    id: 200,
    question: "How often should asbestos awareness refresher training be provided to workers who may encounter asbestos-containing materials?",
    options: [
      "Every 5 years",
      "Every 3 years",
      "At least annually, or whenever there is a significant change in working practices or legislation",
      "Only when a worker changes employer"
    ],
    correctAnswer: 2,
    explanation: "HSE guidance recommends that asbestos awareness refresher training should be provided at least annually, or whenever there are significant changes in working practices, legislation, or the type of work being undertaken. Annual refreshers ensure knowledge remains current and workers stay alert to asbestos risks.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Refresher training requirements",
    category: "Emergency Procedures"
  },];
