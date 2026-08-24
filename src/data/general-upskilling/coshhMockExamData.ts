/**
 * COSHH Awareness Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced difficulty.
 *
 * Categories (5):
 *   Understanding COSHH (40) | Legislation & Risk Assessment (40) |
 *   Hazardous Substances on Site (40) | Control Measures & PPE (40) |
 *   Monitoring, Surveillance & Emergencies (40)
 *
 * Difficulty per 40-question category: ~14 basic, ~18 intermediate, ~8 advanced
 *
 * THIS FILE: Questions 1-100 (Part 1 of 2)
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const coshhCategories = [
  'Understanding COSHH',
  'Legislation & Risk Assessment',
  'Hazardous Substances on Site',
  'Control Measures & PPE',
  'Monitoring, Surveillance & Emergencies',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const coshhMockExamConfig: MockExamConfig = {
  examId: 'coshh-awareness',
  examTitle: 'COSHH Awareness Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/coshh-awareness-module-6',
  categories: coshhCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomCoshhExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(coshhQuestionBank, numQuestions, coshhCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — Questions 1-100 (Part 1)
// ---------------------------------------------------------------------------
export const coshhQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // UNDERSTANDING COSHH — 40 questions (id 1-40)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 1,
    question: 'What does the acronym COSHH stand for?',
    options: [
      'Containment of Substances Hazardous to Health',
      'Control of Substances Hazardous to Health',
      'Care of Substances Harmful to Humans',
      'Control of Safety and Health Hazards',
    ],
    correctAnswer: 1,
    explanation:
      "COSHH stands for Control of Substances Hazardous to Health. It is the law that requires employers to control substances that are hazardous to health in the workplace, preventing or reducing workers' exposure to such substances.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'COSHH definition',
    category: 'Understanding COSHH',
  },
  {
    id: 2,
    question: 'Which of the following is NOT considered a hazardous substance under COSHH?',
    options: [
      'Cement dust',
      'Solvent-based adhesives',
      'Loud noise from machinery',
      'Biological agents such as bacteria',
    ],
    correctAnswer: 2,
    explanation:
      'Loud noise is a physical hazard, not a substance, and is therefore covered by the Control of Noise at Work Regulations 2005, not COSHH. COSHH applies to chemical substances, biological agents, dust, fumes, and similar hazardous materials.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'COSHH scope',
    category: 'Understanding COSHH',
  },
  {
    id: 3,
    question: 'COSHH regulations apply to which types of hazardous substances?',
    options: [
      'Manufactured chemicals supplied with a safety data sheet, but not dusts or fumes created by the work itself',
      'Substances classified as flammable, explosive or corrosive, where the hazard is immediate rather than long-term',
      'Solid materials that release dust when cut or ground, together with any liquid chemical kept in an open container',
      'Any substance that can harm health, including dust, fumes, vapours, mists, gases, and biological agents',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH covers a wide range of hazardous substances including chemicals, products containing chemicals, fumes, dusts, vapours, mists, nanotechnology, gases, biological agents, and germs that cause diseases such as leptospirosis.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'COSHH scope',
    category: 'Understanding COSHH',
  },
  {
    id: 4,
    question: 'Which of the following substances is specifically excluded from COSHH regulations?',
    options: [
      'Lead',
      'Silica dust',
      'Wood dust',
      'Welding fume',
    ],
    correctAnswer: 0,
    explanation:
      'Lead and asbestos are specifically excluded from COSHH because they have their own dedicated regulations — the Control of Lead at Work Regulations 2002 and the Control of Asbestos Regulations 2012 respectively. These substances require even more stringent controls.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'COSHH exclusions',
    category: 'Understanding COSHH',
  },
  {
    id: 5,
    question: 'What are the four main routes by which hazardous substances can enter the body?',
    options: [
      'Inhalation, ingestion, radiation, vibration',
      'Inhalation, ingestion, absorption, injection',
      'Contact, combustion, evaporation, condensation',
      'Inhalation, conduction, convection, ingestion',
    ],
    correctAnswer: 1,
    explanation:
      'The four recognised routes of entry for hazardous substances are inhalation (breathing in), ingestion (swallowing), absorption (through the skin or eyes), and injection (through cuts or puncture wounds). Inhalation is the most common route of occupational exposure.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Routes of exposure',
    category: 'Understanding COSHH',
  },
  {
    id: 6,
    question:
      'Which route of exposure is the most common way workers are harmed by hazardous substances?',
    options: [
      'Skin absorption',
      'Injection through wounds',
      'Inhalation',
      'Ingestion',
    ],
    correctAnswer: 2,
    explanation:
      'Inhalation is the most common route of occupational exposure to hazardous substances. Dusts, fumes, vapours, mists, and gases can all be breathed in and cause damage to the respiratory system, from the nose and throat down to the deepest parts of the lungs.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Routes of exposure',
    category: 'Understanding COSHH',
  },
  {
    id: 7,
    question: 'What is the difference between an acute health effect and a chronic health effect?',
    options: [
      'Acute effects are always permanent and untreatable; chronic effects are temporary and clear up once exposure stops',
      'Acute effects are confined to the skin and eyes; chronic effects are confined to the lungs and the airways',
      'Acute effects are caused by chemical substances; chronic effects are caused only by biological agents such as bacteria',
      'Acute effects occur rapidly after short exposure; chronic effects develop gradually after repeated or prolonged exposure',
    ],
    correctAnswer: 3,
    explanation:
      'Acute effects occur rapidly, usually after a single short-term exposure (e.g., chemical burns, dizziness from solvent exposure). Chronic effects develop gradually over time from repeated or prolonged exposure (e.g., occupational asthma, silicosis). Both can be serious or fatal.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 8,
    question:
      'Approximately how many workers in Great Britain are estimated to die each year from occupational cancers linked to past workplace exposures?',
    options: [
      'Around 8,000',
      'Around 2,000',
      'Around 500',
      'Around 20,000',
    ],
    correctAnswer: 0,
    explanation:
      'HSE estimates that around 8,000 occupational cancer deaths occur each year in Great Britain linked to past workplace exposures to hazardous substances, including asbestos, silica dust, diesel engine exhaust, and various chemicals. This makes it one of the leading causes of work-related death.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Statistics',
    category: 'Understanding COSHH',
  },
  {
    id: 9,
    question: 'Which GHS hazard pictogram features a skull and crossbones?',
    options: [
      'GHS08 — Health Hazard (CMR)',
      'GHS06 — Acute Toxicity (severe)',
      'GHS07 — Harmful/Irritant',
      'GHS05 — Corrosion',
    ],
    correctAnswer: 1,
    explanation:
      'GHS06 displays the skull and crossbones pictogram and indicates acute toxicity — substances that can cause death or serious harm from a single or short-term exposure via ingestion, inhalation, or skin contact. This is one of the most critical warning symbols on chemical labels.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'GHS pictograms',
    category: 'Understanding COSHH',
  },
  {
    id: 10,
    question:
      "What does the GHS08 'health hazard' pictogram (silhouette of a person with a starburst on the chest) indicate?",
    options: [
      'The substance is corrosive and will cause immediate, irreversible burns to the skin and eyes on any contact',
      'The substance is acutely toxic and a single short exposure may be enough to cause death or serious injury',
      'The substance may cause long-term health effects such as cancer, organ damage, or respiratory sensitisation',
      'The substance is flammable and presents a fire or explosion risk if exposed to heat, sparks or naked flame',
    ],
    correctAnswer: 2,
    explanation:
      'GHS08 indicates serious long-term health hazards including carcinogenicity (cancer), mutagenicity, reproductive toxicity, respiratory sensitisation, specific target organ toxicity, and aspiration hazard. These substances may not cause immediate harm but can cause serious chronic health effects.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'GHS pictograms',
    category: 'Understanding COSHH',
  },
  {
    id: 11,
    question:
      'What form of hazardous substance is created when metals are heated above their melting point and the vapour condenses in air?',
    options: [
      'Dust',
      'Gas',
      'Mist',
      'Fume',
    ],
    correctAnswer: 3,
    explanation:
      'Fumes are formed when a solid material, typically a metal, is heated above its melting point and the vapour condenses in air to form very fine solid particles. Welding fume is a common example in construction. Fume particles are extremely small, typically less than 1 micron, making them easily inhaled into the deepest parts of the lungs.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Substance types',
    category: 'Understanding COSHH',
  },
  {
    id: 12,
    question: "What is 'respirable dust'?",
    options: [
      'Dust particles small enough to penetrate deep into the lungs, beyond the body\'s natural defences',
      'Visible dust that settles quickly and is trapped in the nose and throat before it can reach the lungs',
      'Any dust that has a workplace exposure limit assigned to it in EH40, whatever the size of its particles',
      'Dust released by cutting materials that contain crystalline silica, such as concrete, stone and brick',
    ],
    correctAnswer: 0,
    explanation:
      'Respirable dust consists of particles small enough (generally less than 10 micrometres) to pass through the nose and upper airways and penetrate deep into the gas exchange region of the lungs (alveoli). This is the most dangerous fraction of dust because the body cannot easily clear it.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Substance types',
    category: 'Understanding COSHH',
  },
  {
    id: 13,
    question: 'Which of the following is an example of a biological agent covered by COSHH?',
    options: [
      'Carbon monoxide given off by petrol-driven generators',
      'Leptospirosis bacteria from rat urine in contaminated water',
      'Isocyanate vapour released by two-pack spray paint',
      'Respirable silica dust from cutting concrete blocks',
    ],
    correctAnswer: 1,
    explanation:
      "Leptospirosis (Weil's disease) is caused by bacteria found in the urine of infected rats. Workers can be exposed through contaminated water or soil, particularly in sewers, waterways, and construction sites. It is classified as a biological agent under COSHH.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Biological agents',
    category: 'Understanding COSHH',
  },
  {
    id: 14,
    question: "What is a 'sensitiser' in the context of COSHH?",
    options: [
      'A substance that increases the flammability or reactivity of other chemicals it is mixed or stored with',
      'A substance that is harmless at room temperature but becomes harmful once it is heated above its boiling point',
      'A substance that triggers an allergic reaction after repeated exposure, meaning even tiny future exposures cause a response',
      'A substance whose hazardous properties are used up by a single exposure, so that later contact is harmless',
    ],
    correctAnswer: 2,
    explanation:
      'A sensitiser is a substance that causes the immune system to produce an allergic response after repeated exposure. Once sensitised, even very small exposures can trigger serious reactions such as occupational asthma or dermatitis. Common sensitisers include isocyanates, epoxy resins, and some wood dusts.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 15,
    question:
      'Which of the following is an example of an acute health effect from hazardous substance exposure?',
    options: [
      'Occupational asthma from years of isocyanate exposure',
      'Silicosis from prolonged silica dust inhalation',
      'Mesothelioma from historic asbestos exposure',
      'Dizziness and nausea from inhaling solvent vapours in a confined space',
    ],
    correctAnswer: 3,
    explanation:
      'Dizziness and nausea from solvent vapour inhalation is an acute (immediate/short-term) health effect. The other options are all chronic effects that develop over months or years of repeated exposure. Acute solvent exposure at high concentrations can also cause unconsciousness and death.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 16,
    question: "What does the term 'occupational dermatitis' refer to?",
    options: [
      'Inflammation of the skin caused or made worse by substances encountered at work',
      'Sunburn caused by working outdoors for long periods without skin protection',
      'A skin rash that is caused exclusively by wearing latex disposable gloves',
      'A bacterial skin infection picked up from contaminated hand tools',
    ],
    correctAnswer: 0,
    explanation:
      'Occupational dermatitis is inflammation of the skin caused by contact with substances at work. It can be irritant contact dermatitis (from direct damage by substances like cement, solvents, or detergents) or allergic contact dermatitis (an immune reaction to sensitisers like epoxy resins). It is one of the most commonly reported occupational diseases.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 17,
    question: 'What type of substance is an isocyanate?',
    options: [
      'A naturally occurring mineral fibre once used in insulation, fireproofing and asbestos cement sheeting',
      'A highly reactive chemical found in two-pack paints, foams, and adhesives that is a major cause of occupational asthma',
      'A heavy metal that accumulates in the body over years and damages the nervous system, kidneys and blood',
      'A solvent vapour that causes narcosis at high concentrations and is highly flammable in confined spaces',
    ],
    correctAnswer: 1,
    explanation:
      'Isocyanates are a family of highly reactive chemicals commonly found in two-pack spray paints, polyurethane foams, lacquers, and some adhesives. They are the leading cause of occupational asthma in the UK. Even very low concentrations can sensitise the respiratory system.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Substance types',
    category: 'Understanding COSHH',
  },
  {
    id: 18,
    question: "Which of the following best describes a 'carcinogen'?",
    options: [
      'A substance that causes skin irritation',
      'A substance that reduces oxygen levels in the blood',
      'A substance that can cause or contribute to the development of cancer',
      'A substance that causes an immediate allergic reaction',
    ],
    correctAnswer: 2,
    explanation:
      'A carcinogen is any substance capable of causing or contributing to cancer. Under COSHH, carcinogens require the highest level of control. Examples of occupational carcinogens include respirable crystalline silica, benzene, some wood dusts, and certain chromium compounds.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 19,
    question: "What is the difference between 'inhalable dust' and 'respirable dust'?",
    options: [
      'Inhalable dust is hazardous, while respirable dust is harmless nuisance dust',
      'Inhalable dust is measured over 8 hours, while respirable dust is measured over 15 minutes',
      'Inhalable dust comes from wood, while respirable dust comes from stone',
      'Inhalable dust is captured by the nose and throat; respirable dust penetrates deep into the lungs',
    ],
    correctAnswer: 3,
    explanation:
      "Inhalable dust refers to the fraction of airborne particles that enter through the nose and mouth and can deposit anywhere in the respiratory tract. Respirable dust is the finer fraction (typically under 10 micrometres) that passes beyond the body's upper airway defences and reaches the gas exchange region (alveoli) of the lungs, where it can cause the most serious damage.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Substance types',
    category: 'Understanding COSHH',
  },
  {
    id: 20,
    question: 'How might a worker be exposed to hazardous substances through the injection route?',
    options: [
      'Through a cut or puncture wound that allows a substance to enter the bloodstream directly',
      'By breathing in airborne dust, fume, or vapour through the nose and mouth',
      'By swallowing a substance transferred from contaminated hands to food',
      'By a substance soaking through intact skin into the bloodstream',
    ],
    correctAnswer: 0,
    explanation:
      "The injection route occurs when hazardous substances enter the body through breaks in the skin such as cuts, abrasions, or puncture wounds. This bypasses the skin's protective barrier and introduces the substance directly into the bloodstream. High-pressure tools (e.g., grease guns) can also inject substances through intact skin.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Routes of exposure',
    category: 'Understanding COSHH',
  },
  {
    id: 21,
    question: "Which of the following is classified as a 'mutagen'?",
    options: [
      'A substance that causes skin sensitisation',
      'A substance that can cause heritable genetic mutations in living cells',
      'A substance that irritates the respiratory tract',
      'A substance that lowers the flash point of other chemicals',
    ],
    correctAnswer: 1,
    explanation:
      'A mutagen is a substance that can cause permanent changes (mutations) to the DNA in living cells, and these mutations can be passed on to future generations. Mutagens are classified alongside carcinogens and reproductive toxins as CMR substances and require the strictest controls under COSHH.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 22,
    question: "What does the term 'CMR substance' stand for in occupational health?",
    options: [
      'Chemical, Mineral, Radioactive substance',
      'Controlled, Monitored, Restricted substance',
      'Carcinogenic, Mutagenic, or toxic to Reproduction substance',
      'Chronic, Moderate, Reversible substance',
    ],
    correctAnswer: 2,
    explanation:
      'CMR stands for Carcinogenic, Mutagenic, or toxic to Reproduction. These are the most hazardous categories of substance under COSHH. Regulation 11 requires that exposure to CMR substances be reduced to as low as is reasonably practicable, and substitution with a less hazardous alternative must always be considered first.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 23,
    question: 'What type of health effect is occupational asthma?',
    options: [
      'An acute effect that appears immediately on first exposure and clears within minutes of leaving the area',
      'A skin condition caused only by direct contact with corrosive substances',
      'A short-term narcotic effect caused by inhaling high concentrations of solvent vapour',
      'A chronic respiratory condition caused by sensitisation or irritation from workplace substances',
    ],
    correctAnswer: 3,
    explanation:
      'Occupational asthma is a chronic lung disease caused by breathing in workplace substances that sensitise or irritate the airways. Once established, it can be triggered by very low levels of the causative substance. Around 3,000 new cases are estimated in the UK each year, with isocyanates, flour dust, and wood dust being common causes.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 24,
    question: 'Which GHS pictogram features a corroded surface and a corroded hand?',
    options: [
      'GHS05 — Corrosion',
      'GHS02 — Flammable',
      'GHS07 — Harmful/Irritant',
      'GHS09 — Environmental Hazard',
    ],
    correctAnswer: 0,
    explanation:
      'GHS05 displays the corrosion pictogram showing a substance corroding both a metal surface and human skin. It indicates that the substance can cause severe skin burns, serious eye damage, or corrode metals. Substances like concentrated acids, strong alkalis, and some solvents carry this pictogram.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'GHS pictograms',
    category: 'Understanding COSHH',
  },
  {
    id: 25,
    question: 'Exposure to which type of substance can cause metal fume fever?',
    options: [
      'Lead fumes from soldering and stripping old painted surfaces',
      'Zinc or copper fumes from welding, brazing, or galvanised steel cutting',
      'Silica dust from cutting concrete, brick, and mortar',
      'Solvent vapours from paints, adhesives, and cleaning agents',
    ],
    correctAnswer: 1,
    explanation:
      'Metal fume fever is caused by inhaling freshly formed metal oxide fumes, most commonly zinc oxide from welding or cutting galvanised (zinc-coated) steel, or copper fumes from brazing. Symptoms include flu-like illness, fever, chills, and muscle aches, typically appearing several hours after exposure.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 26,
    question: 'What is the primary danger of working with solvents in a poorly ventilated area?',
    options: [
      'The vapours condense on cold surfaces and cause short circuits in nearby electrical equipment',
      'The solvents react with oxygen in still air and release toxic carbon monoxide gas as they evaporate',
      'Solvent vapours can cause dizziness, unconsciousness, and potentially death by narcosis, and many are flammable',
      'The solvents corrode metal hand tools and degrade cable insulation over a period of months',
    ],
    correctAnswer: 2,
    explanation:
      'Organic solvents evaporate readily and in poorly ventilated areas the vapour concentration can quickly reach dangerous levels. Acute effects include headaches, dizziness, narcosis (drowsiness), and at high concentrations, unconsciousness and death. Chronic effects include liver and kidney damage. Many solvents are also highly flammable.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 27,
    question:
      "Which of the following best describes 'absorption' as a route of entry for hazardous substances?",
    options: [
      'Breathing airborne fumes, vapours or dust into the lungs while working',
      'Swallowing a substance transferred from contaminated hands to food or drink',
      'A substance entering the body through a cut, graze or puncture wound',
      'Hazardous substances passing through the skin or mucous membranes into the bloodstream',
    ],
    correctAnswer: 3,
    explanation:
      'Absorption occurs when hazardous substances pass through intact skin or mucous membranes (e.g., eyes, nose lining) and enter the bloodstream. Many organic solvents, some pesticides, and certain chemicals can be readily absorbed through the skin. This is why appropriate glove selection is critical.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Routes of exposure',
    category: 'Understanding COSHH',
  },
  {
    id: 28,
    question: "What is meant by the term 'Workplace Exposure Limit' (WEL)?",
    options: [
      'The maximum airborne concentration of a hazardous substance averaged over a reference period to which a worker may be exposed by inhalation',
      'The total quantity of a hazardous substance that an employer is permitted to keep in store on a single site at any one time',
      'The maximum dose of a substance that a worker can safely absorb through unbroken skin during a single working shift',
      'The airborne concentration of a substance below which it is regarded as completely non-hazardous to everyone',
    ],
    correctAnswer: 0,
    explanation:
      'A Workplace Exposure Limit (WEL) is the maximum concentration of a hazardous substance in the air, averaged over a specified reference period (usually 8 hours or 15 minutes), to which workers may be exposed by inhalation. WELs are listed in HSE publication EH40 and are legally binding under COSHH.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Workplace exposure limits',
    category: 'Understanding COSHH',
  },
  {
    id: 29,
    question: 'What are the two reference periods used for Workplace Exposure Limits?',
    options: [
      '1-hour Time Weighted Average (TWA) and 24-hour cumulative average',
      '8-hour Time Weighted Average (TWA) and 15-minute Short-Term Exposure Limit (STEL)',
      '30-minute Short-Term Exposure Limit (STEL) and weekly cumulative limit',
      '4-hour shift Time Weighted Average and 10-minute ceiling limit',
    ],
    correctAnswer: 1,
    explanation:
      'WELs are expressed as either an 8-hour TWA (Time Weighted Average), representing the average concentration over a normal working day, or a 15-minute STEL (Short-Term Exposure Limit) to control brief peak exposures. Some substances have both an 8-hour TWA and a STEL.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Workplace exposure limits',
    category: 'Understanding COSHH',
  },
  {
    id: 30,
    question: "What type of hazardous substance is 'respirable crystalline silica' (RCS)?",
    options: [
      'A condensed metal vapour fume given off when welding or flame-cutting galvanised steel and other coated metals',
      'A gaseous solvent vapour released as paints, adhesives and cleaning products evaporate in a warm, unventilated room',
      'A fine mineral dust generated by cutting, drilling, or grinding materials containing silica such as concrete, sandstone, and granite',
      'Tiny liquid droplets suspended in the air, typically produced by spraying, splashing or condensation',
    ],
    correctAnswer: 2,
    explanation:
      'Respirable crystalline silica (RCS) is a fine dust produced when materials containing silica — including concrete, sandstone, mortar, brick, and granite — are cut, drilled, ground, or otherwise disturbed. Prolonged exposure causes silicosis, an incurable and progressive lung disease, and RCS is also a recognised carcinogen.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Substance types',
    category: 'Understanding COSHH',
  },
  {
    id: 31,
    question:
      'How can hazardous substances enter the body via the ingestion route on a construction site?',
    options: [
      'By breathing in airborne dust and welding fume while working in a poorly ventilated area',
      'By a substance soaking through unbroken skin and passing into the bloodstream',
      'By a substance entering the body through a cut, graze or puncture wound',
      'By eating, drinking, or smoking with contaminated hands, or through hand-to-mouth contact',
    ],
    correctAnswer: 3,
    explanation:
      'Ingestion most commonly occurs when workers eat, drink, or smoke without first washing contaminated hands. Hazardous dust or residue on the hands transfers to food, cigarettes, or drinks. This is why COSHH assessments stress the importance of welfare facilities and hand-washing before breaks.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Routes of exposure',
    category: 'Understanding COSHH',
  },
  {
    id: 32,
    question: "What is a 'vapour' in the context of hazardous substances?",
    options: [
      'The gaseous form of a substance that is normally a liquid or solid at room temperature',
      'Tiny solid particles formed when a metal is heated and its vapour condenses in air',
      'Fine liquid droplets suspended in air, produced by spraying or splashing',
      'Solid particles produced by cutting, grinding, or sanding a material',
    ],
    correctAnswer: 0,
    explanation:
      'A vapour is the gaseous form of a substance that is normally a liquid or solid at room temperature and pressure. For example, solvent vapours are released when paints, adhesives, or cleaning agents evaporate. Vapour concentration increases with temperature and in poorly ventilated areas.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Substance types',
    category: 'Understanding COSHH',
  },
  {
    id: 33,
    question: "What is a 'mist' in the context of hazardous substances?",
    options: [
      'The gaseous form of a substance that is normally a liquid at room temperature and pressure',
      'Tiny liquid droplets suspended in air, typically produced by spraying, splashing, or condensation',
      'Very fine solid particles formed when a heated metal vapour condenses in the surrounding air',
      'Solid particles thrown into the air by cutting, drilling or grinding a solid material',
    ],
    correctAnswer: 1,
    explanation:
      'A mist consists of tiny liquid droplets suspended in the air, formed by spraying, splashing, condensation, or other mechanical processes. Examples include oil mist from machining operations and paint mist from spray painting. Mists can be inhaled and deposit in the respiratory system.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Substance types',
    category: 'Understanding COSHH',
  },
  {
    id: 34,
    question:
      'Chronic obstructive pulmonary disease (COPD) can be caused by long-term exposure to which workplace hazards?',
    options: [
      'Loud noise and vibration',
      'Ultraviolet radiation only',
      'Dusts, fumes, and chemical vapours',
      'Extreme cold temperatures',
    ],
    correctAnswer: 2,
    explanation:
      'COPD is a group of lung diseases including chronic bronchitis and emphysema. Occupational COPD can be caused by long-term exposure to dusts (e.g., coal, silica, grain), fumes (e.g., welding fume), and chemical vapours. HSE estimates that around 4,000 COPD deaths per year in Great Britain are linked to past occupational exposures.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 35,
    question: "What is the 'synergistic effect' in relation to hazardous substance exposure?",
    options: [
      'When a substance becomes less harmful because it has been diluted by another substance present in the same air',
      'When the body gradually builds up a tolerance to a substance after repeated low-level exposure to it',
      'When one substance produces markedly different effects in different workers exposed to the same amount',
      'When exposure to two or more substances together produces a combined effect greater than the sum of their individual effects',
    ],
    correctAnswer: 3,
    explanation:
      'The synergistic effect occurs when two or more hazardous substances interact to produce a combined health effect that is greater than would be expected from simply adding their individual effects together. For example, smoking combined with asbestos exposure dramatically increases the risk of lung cancer far beyond either risk alone.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 36,
    question:
      "What is meant by 'total inhalable dust' in the context of workplace exposure monitoring?",
    options: [
      'The fraction of airborne particles that is inhaled through the nose and mouth during breathing',
      'Only the finest particles that reach the deepest alveolar region of the lungs',
      'The total weight of all dust that settles on surfaces in a work area',
      'Dust that has been chemically analysed and found to contain crystalline silica',
    ],
    correctAnswer: 0,
    explanation:
      "Total inhalable dust is the mass fraction of airborne particles that enters the nose and mouth during normal breathing. The current UK WEL for total inhalable dust (where no specific substance WEL applies) is 10 mg/m³ as an 8-hour TWA. This is sometimes referred to as 'nuisance dust', though this term is misleading as prolonged exposure can still cause harm.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Workplace exposure limits',
    category: 'Understanding COSHH',
  },
  {
    id: 37,
    question:
      'What is the general Workplace Exposure Limit for respirable dust (where no substance-specific WEL applies)?',
    options: [
      '1 mg/m³ 8-hour TWA',
      '4 mg/m³ 8-hour TWA',
      '10 mg/m³ 8-hour TWA',
      '20 mg/m³ 8-hour TWA',
    ],
    correctAnswer: 1,
    explanation:
      'The general WEL for respirable dust (particles not otherwise specified) is 4 mg/m³ as an 8-hour TWA, as published in EH40. For total inhalable dust, the general WEL is 10 mg/m³. Many specific substances have much lower WELs — for example, respirable crystalline silica has a WEL of 0.1 mg/m³.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Workplace exposure limits',
    category: 'Understanding COSHH',
  },
  {
    id: 38,
    question:
      'Which of the following substances is a common cause of occupational contact dermatitis on construction sites?',
    options: [
      'Dry timber sawdust from cutting softwood battens',
      'Clean water used for mixing and dust suppression',
      'Wet cement (due to its alkaline pH and chromium content)',
      'PVC cable insulation handled during installation',
    ],
    correctAnswer: 2,
    explanation:
      "Wet cement is highly alkaline (pH 12-13) and can cause both irritant and allergic contact dermatitis. The alkalinity causes chemical burns on prolonged skin contact, while hexavalent chromium compounds in cement cause allergic sensitisation. 'Cement burns' are a significant cause of occupational skin disease in construction.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 39,
    question: "What is a 'narcotic' effect in relation to solvent exposure?",
    options: [
      'A permanent allergic sensitisation of the airways, so that even a small later exposure triggers an asthma attack',
      'A burning sensation and blistering of the skin caused by direct contact with the liquid chemical',
      'A long-term scarring of the lung tissue caused by inhaling fine mineral dust over many years',
      'A temporary depression of the central nervous system causing drowsiness, dizziness, confusion, and potentially unconsciousness',
    ],
    correctAnswer: 3,
    explanation:
      'Many organic solvents have a narcotic effect, meaning they depress the central nervous system. Symptoms progress from mild headaches and dizziness through confusion and impaired coordination to unconsciousness and death at very high concentrations. This is particularly dangerous in confined or poorly ventilated spaces.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },
  {
    id: 40,
    question:
      'Which body organ can be damaged by chronic exposure to organic solvents such as toluene and xylene?',
    options: [
      'The liver and kidneys',
      'The heart only',
      'The bones and joints',
      'The eyes only',
    ],
    correctAnswer: 0,
    explanation:
      'Chronic (long-term) exposure to many organic solvents including toluene, xylene, and trichloroethylene can cause damage to the liver and kidneys, as these organs are responsible for metabolising and excreting toxic substances from the body. Some solvents can also cause neurological damage and dermatitis.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Health effects',
    category: 'Understanding COSHH',
  },

  // =======================================================================
  // LEGISLATION & RISK ASSESSMENT — 40 questions (id 41-80)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 41,
    question: 'In which year were the current COSHH Regulations originally made?',
    options: [
      '1992',
      '2002',
      '1999',
      '2012',
    ],
    correctAnswer: 1,
    explanation:
      'The Control of Substances Hazardous to Health Regulations were made in 2002 (SI 2002/2677), replacing earlier 1988 and 1994 versions. They have been amended several times since, but the 2002 Regulations remain the current statutory instrument.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 42,
    question: 'Under which parent Act are the COSHH Regulations made?',
    options: [
      'The Environmental Protection Act 1990',
      'The Construction (Design and Management) Regulations 2015',
      'The Health and Safety at Work etc. Act 1974',
      'The Factories Act 1961',
    ],
    correctAnswer: 2,
    explanation:
      'The COSHH Regulations 2002 are made under the Health and Safety at Work etc. Act 1974 (HSWA). HSWA is the primary piece of UK health and safety legislation that places general duties on employers, employees, and the self-employed. COSHH is one of many sets of regulations made under this enabling Act.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 43,
    question: 'Who has the primary duty to carry out COSHH assessments under the Regulations?',
    options: [
      'Individual workers using the substances',
      'The Health and Safety Executive',
      'The substance manufacturer',
      'The employer (or self-employed person)',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 6 of COSHH places the duty on the employer to assess the risks to health from hazardous substances used in the workplace and to decide what controls are needed. Self-employed persons have the same duty for their own work. Employees have a duty to cooperate but not to carry out the assessment.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'COSHH risk assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 44,
    question: 'What is a Safety Data Sheet (SDS)?',
    options: [
      'A document provided by the manufacturer or supplier giving detailed information about a substance\'s hazards, safe handling, storage, and emergency measures',
      'A certificate issued by the HSE after testing, confirming that a substance is safe to use at work provided the label instructions are followed',
      'A record kept by the employer of every worker who has used a particular substance and the quantity each of them used',
      'A label applied to the container by the supplier showing the product name, the supplier address and the batch number',
    ],
    correctAnswer: 0,
    explanation:
      'A Safety Data Sheet (SDS) is a standardised 16-section document provided by the manufacturer or supplier of a chemical product. It contains essential information including hazard identification, composition, first-aid measures, fire-fighting measures, handling and storage, exposure controls, physical properties, and disposal considerations.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Safety Data Sheets',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 45,
    question:
      'How many sections does a Safety Data Sheet (SDS) contain under the REACH Regulation?',
    options: [
      '8 sections',
      '16 sections',
      '12 sections',
      '20 sections',
    ],
    correctAnswer: 1,
    explanation:
      'Under Annex II of the REACH Regulation (UK REACH post-Brexit), a Safety Data Sheet must contain 16 standardised sections covering identification, hazards, composition, first aid, firefighting, accidental release, handling and storage, exposure controls/PPE, physical properties, stability, toxicology, ecology, disposal, transport, regulation, and other information.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Safety Data Sheets',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 46,
    question:
      'Which section of a Safety Data Sheet provides information on recommended exposure controls and personal protective equipment?',
    options: [
      'Section 7 — Handling and storage',
      'Section 11 — Toxicological information',
      'Section 8 — Exposure controls/personal protection',
      'Section 4 — First-aid measures',
    ],
    correctAnswer: 2,
    explanation:
      'Section 8 of the SDS covers exposure controls and personal protection. It lists applicable Workplace Exposure Limits, recommended engineering controls, and specific PPE requirements including the type of gloves, eye protection, respiratory protection, and protective clothing needed when handling the substance.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Safety Data Sheets',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 47,
    question: 'What is EH40?',
    options: [
      'A COSHH Approved Code of Practice giving guidance on risk assessments',
      'A British Standard specifying the design of local exhaust ventilation systems',
      'An HSE form used to report occupational diseases to enforcing authorities',
      'An HSE publication listing Workplace Exposure Limits for hazardous substances',
    ],
    correctAnswer: 3,
    explanation:
      "EH40 is the HSE publication 'Workplace Exposure Limits' that contains the table of UK WELs for hazardous substances. It is regularly updated and provides both 8-hour TWA and 15-minute STEL values. Employers must ensure that exposure to substances listed in EH40 does not exceed the stated limits.",
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'EH40',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 48,
    question:
      'Which COSHH Regulation number requires employers to carry out a suitable and sufficient assessment of risk?',
    options: [
      'Regulation 6',
      'Regulation 4',
      'Regulation 9',
      'Regulation 12',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 6 of the COSHH Regulations 2002 requires employers to make a suitable and sufficient assessment of the risk to health created by work involving hazardous substances, and the steps needed to meet the requirements of the Regulations. This assessment must be reviewed regularly.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 49,
    question:
      'Under COSHH, what must an employer do BEFORE any work with hazardous substances begins?',
    options: [
      'Obtain a licence from the Health and Safety Executive for the work',
      'Carry out a risk assessment and implement appropriate control measures',
      'Notify the local authority of the substances being used on site',
      'Arrange health surveillance for every employee on the site',
    ],
    correctAnswer: 1,
    explanation:
      'Before any work with hazardous substances begins, the employer must carry out a COSHH risk assessment (Regulation 6) and implement appropriate control measures (Regulation 7). Work must not commence until the assessment is complete and controls are in place. No licence or prior HSE notification is required for standard COSHH activities.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'COSHH risk assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 50,
    question: 'Which of the following is NOT a step in the COSHH risk assessment process?',
    options: [
      'Identify the hazardous substances present and who might be exposed',
      'Evaluate the level, type, and duration of exposure to decide on controls',
      'Calculate the cost of replacing the substance with a less hazardous alternative',
      'Record the significant findings and review the assessment regularly',
    ],
    correctAnswer: 2,
    explanation:
      'While substitution with a less hazardous substance is a key control measure, calculating replacement costs is not a formal step in the COSHH risk assessment process. The essential steps are: identify hazards, decide who is at risk and how, evaluate the risks, record findings, implement controls, and review the assessment regularly.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'COSHH risk assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 51,
    question: 'When must a COSHH risk assessment be reviewed?',
    options: [
      'At fixed five-yearly intervals, regardless of whether the substances or the way the work is done have changed',
      'After an employee has already suffered a work-related illness linked to one of the substances in use',
      'When an HSE inspector requests it during an audit, or when the supplier issues a revised safety data sheet',
      'When there is reason to believe it is no longer valid, or when there has been a significant change in the work',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH Regulation 6(3) requires the assessment to be reviewed when there is reason to suspect it is no longer valid or when there has been a significant change in the work to which it relates. This includes changes in substances used, work processes, quantities, or if health surveillance reveals problems. There is no fixed review interval in law, though annual review is good practice.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'COSHH risk assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 52,
    question: 'What does Regulation 7 of the COSHH Regulations require?',
    options: [
      'That employers prevent or adequately control exposure to hazardous substances',
      'That all hazardous substances be banned from the workplace',
      'That all workers wear respiratory protective equipment at all times',
      'That all substances be stored in a locked room',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 7 places a duty on the employer to either prevent exposure to substances hazardous to health, or where this is not reasonably practicable, to adequately control exposure. Prevention (e.g., elimination or substitution) should always be the first consideration before moving to control measures.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 53,
    question: 'What is the hierarchy of control measures under COSHH (in order of preference)?',
    options: [
      'PPE → administrative controls → engineering controls → substitution → elimination',
      'Elimination → substitution → engineering controls → administrative controls → PPE',
      'Engineering controls → PPE → substitution → elimination → administrative controls',
      'Substitution → PPE → elimination → engineering controls → administrative controls',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy of control under COSHH follows the general hierarchy: elimination (remove the substance entirely), substitution (use a less hazardous alternative), engineering controls (LEV, enclosure), administrative controls (procedures, training, reduced exposure time), and PPE as a last resort. Higher-level controls are always preferred as they protect everyone.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Control hierarchy',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 54,
    question: 'Under COSHH, which regulation deals specifically with the use of control measures?',
    options: [
      'Regulation 6 — Assessment',
      'Regulation 7 — Prevention or control of exposure',
      'Regulation 8 — Use of control measures',
      'Regulation 9 — Maintenance of control measures',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 8 requires that every employer ensures that control measures provided under Regulation 7 are properly used and applied. It also places a duty on employees to make proper use of the control measures, PPE, and facilities provided by the employer.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 55,
    question:
      'Under COSHH Regulation 9, how often must Local Exhaust Ventilation (LEV) systems be thoroughly examined and tested?',
    options: [
      'Every month',
      'Every 6 months',
      'Every 2 years',
      'At least every 14 months',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 9(2) requires that LEV systems be thoroughly examined and tested at least every 14 months (or more frequently if specified in the risk assessment). Records of these examinations must be kept for at least 5 years. Some processes have shorter intervals specified in COSHH-ACOP.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Control maintenance',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 56,
    question: 'What does Regulation 10 of COSHH cover?',
    options: [
      'Monitoring exposure at the workplace',
      'Risk assessment procedures',
      'Health surveillance of employees',
      'Information, instruction, and training',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 10 requires employers to ensure that the exposure of employees to substances hazardous to health is monitored where this is necessary to maintain adequate control or to protect health. Monitoring means measuring the concentration of hazardous substances in the workplace air to check that WELs are not exceeded.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 57,
    question: 'What does Regulation 11 of COSHH deal with?',
    options: [
      'Storage of hazardous substances',
      'Health surveillance',
      'Exposure monitoring',
      'Emergency planning',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 11 requires employers to provide appropriate health surveillance for employees where the risk assessment identifies that there is a reasonable likelihood of disease or adverse health effects occurring. This includes medical examinations, biological monitoring, and questionnaires, depending on the substances and exposures involved.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 58,
    question: 'For how long must health surveillance records be kept under COSHH?',
    options: [
      '5 years from the date of the last entry',
      '10 years from the date of the last entry',
      '40 years from the date of the last entry',
      '3 years from the date of the last entry',
    ],
    correctAnswer: 2,
    explanation:
      'COSHH Regulation 11(4) requires that health surveillance records be kept for at least 40 years from the date of the last entry. This extended period reflects the fact that some occupational diseases, particularly cancers, may not develop until many decades after exposure occurred.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Health surveillance',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 59,
    question: 'Regulation 12 of COSHH requires employers to provide workers with what?',
    options: [
      'A personal supply of respiratory protective equipment purchased at the employee\'s own expense',
      'Free annual medical examinations regardless of the substances they are exposed to',
      'Written permission from the HSE before any hazardous substance may be used',
      'Suitable and sufficient information, instruction, and training about the hazardous substances they work with',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12 requires employers to provide employees with suitable and sufficient information, instruction, and training about the hazardous substances they may be exposed to, the risks, the precautions they should take, the results of any monitoring, and the purpose and procedures for health surveillance.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 60,
    question:
      'Which regulation covers arrangements for dealing with accidents, incidents, and emergencies involving hazardous substances?',
    options: [
      'Regulation 13',
      'Regulation 9',
      'Regulation 7',
      'Regulation 15',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 13 requires employers to prepare procedures and set out warning and communication systems for dealing with accidents, incidents, and emergencies involving hazardous substances. This includes provision of appropriate first-aid facilities and relevant safety drills, tested at regular intervals.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'COSHH Regulations 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 61,
    question: 'What does the CLP Regulation stand for?',
    options: [
      'Control, Labelling and Prevention of hazardous substances',
      'Classification, Labelling and Packaging of substances and mixtures',
      'Chemical Limits and Protection in the workplace',
      'Categorisation, Listing and Permitting of dangerous goods',
    ],
    correctAnswer: 1,
    explanation:
      'CLP stands for Classification, Labelling and Packaging of substances and mixtures. UK CLP (retained EU law) requires that hazardous chemicals are classified according to their hazards and labelled with standardised GHS pictograms, signal words, and hazard statements before being placed on the market.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 62,
    question: 'What is the role of the REACH Regulation in relation to COSHH?',
    options: [
      'REACH sets the legal Workplace Exposure Limits published in EH40, which COSHH then requires employers to enforce through workplace air monitoring',
      'REACH replaced COSHH as the main UK law controlling workplace exposure when it was carried across into domestic law after EU exit',
      'REACH deals with the registration, evaluation, authorisation, and restriction of chemicals placed on the market, while COSHH deals with workplace exposure controls',
      'REACH applies to chemicals imported into Great Britain, while COSHH applies to chemicals manufactured and supplied within the UK',
    ],
    correctAnswer: 2,
    explanation:
      'UK REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) governs the manufacture, import, and supply of chemicals. It requires manufacturers to provide Safety Data Sheets and register substances. COSHH complements REACH by requiring employers to control workplace exposure. They work together but have different purposes.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 63,
    question: 'Under COSHH, what is the legal status of a Workplace Exposure Limit listed in EH40?',
    options: [
      'It is advisory guidance published by the HSE and carries no legal force of its own',
      'It is a voluntary target figure that individual employers may choose to adopt or ignore',
      'It is legally binding, but only for substances classified as carcinogens or mutagens',
      'It is legally enforceable — exposure must not exceed the WEL unless specific conditions are met',
    ],
    correctAnswer: 3,
    explanation:
      'WELs listed in EH40 are legally enforceable under COSHH Regulation 7. An employer must ensure that the exposure of employees to hazardous substances does not exceed the WEL, or where a substance has been assigned a WEL, that exposure is reduced to as low as is reasonably practicable and in any case below the WEL.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Workplace Exposure Limits',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 64,
    question: "What is an 'Approved Code of Practice' (ACOP) in relation to COSHH?",
    options: [
      'A document that gives practical advice on how to comply with the regulations — not following it means you must show an equally effective method',
      'A legally binding limit on the airborne concentration of a substance, which must never be exceeded under any circumstances at work',
      'A mandatory list of substances that are prohibited from use in all workplaces under the COSHH Regulations',
      'A supplier-issued document setting out a single product\'s hazards, handling precautions and first-aid measures',
    ],
    correctAnswer: 0,
    explanation:
      'An ACOP provides practical guidance on how to comply with the law. Under Section 17 of the Health and Safety at Work etc. Act 1974, if you are prosecuted for a breach and it is proved that you did not follow the relevant ACOP, you must show that you complied in an equally effective way, or the court will find you at fault.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 65,
    question:
      'What duty does the Health and Safety at Work etc. Act 1974 Section 2 place on employers regarding hazardous substances?',
    options: [
      'A duty to provide personal protective equipment free of charge to every employee and to replace it on request',
      'A general duty to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees',
      'A duty to report all use of hazardous substances to the Health and Safety Executive before the work begins',
      'A duty to arrange health surveillance for every employee at intervals of no more than six months',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2 of HSWA 1974 places a general duty on every employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This overarching duty encompasses the use of hazardous substances and is the parent duty under which the specific COSHH Regulations are made.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 66,
    question: 'Which of the following does an employee have a legal duty to do under COSHH?',
    options: [
      'Carry out their own COSHH risk assessment before starting work',
      'Purchase their own respiratory protective equipment and gloves',
      'Make proper use of control measures and PPE provided by the employer, and report defects',
      'Arrange their own health surveillance with an occupational health provider',
    ],
    correctAnswer: 2,
    explanation:
      'Under COSHH Regulation 8(2), every employee must make full and proper use of any control measure, PPE, or other provision made by the employer. Regulation 12 also requires employees to report any defects in controls or PPE. The duty to assess, provide controls, and supply PPE rests with the employer.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Employee duties',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 67,
    question:
      'A COSHH assessment identifies that a substance is a respiratory sensitiser. What is the highest priority action?',
    options: [
      'Issue all exposed workers with disposable FFP3 respirators and face-fit test them',
      'Improve general room ventilation so that the substance is diluted below its exposure limit',
      'Put warning signage in the area and restrict access to trained, authorised workers',
      'Eliminate the substance from the process or substitute it with a non-sensitising alternative',
    ],
    correctAnswer: 3,
    explanation:
      'For sensitisers, the COSHH ACOP prioritises elimination or substitution above all other measures. Once a worker becomes sensitised, even very low exposures can trigger severe reactions, making engineering controls and PPE less reliable as long-term solutions. If substitution is not reasonably practicable, a totally enclosed process or strict engineering controls must be used.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Control hierarchy',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 68,
    question: 'What information must a hazardous substance label display under CLP regulations?',
    options: [
      'Product identifier, GHS hazard pictograms, signal word, hazard statements, precautionary statements, and supplier details',
      'The chemical formula, the batch number, the date of manufacture and the recommended shelf life of the product',
      'The Workplace Exposure Limit for the substance and the result of the most recent workplace air monitoring',
      'The name of the employee responsible for storing the substance and the date it was first issued to site',
    ],
    correctAnswer: 0,
    explanation:
      "Under UK CLP, labels must display: the product identifier (name), relevant GHS hazard pictograms, the signal word ('Danger' or 'Warning'), hazard statements (H-codes describing hazards), precautionary statements (P-codes for prevention, response, storage, disposal), and the name, address, and telephone number of the supplier.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'CLP labelling',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 69,
    question:
      "What is the difference between the signal words 'Danger' and 'Warning' on a CLP label?",
    options: [
      'There is no difference; they are interchangeable',
      "'Danger' indicates more severe hazards; 'Warning' indicates less severe hazards",
      "'Danger' is used for chemicals; 'Warning' is used for biological agents",
      "'Warning' indicates higher risk than 'Danger'",
    ],
    correctAnswer: 1,
    explanation:
      "'Danger' is the signal word used for the more severe hazard categories (e.g., acutely toxic Category 1, flammable Category 1), while 'Warning' is used for less severe categories. A substance can only have one signal word, and if multiple hazards exist, the most severe determines which signal word is used.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'CLP labelling',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 70,
    question: 'Under COSHH, what must an employer do if five or more people are employed?',
    options: [
      'Appoint a full-time health and safety officer to oversee COSHH',
      'Provide health surveillance for every employee on the payroll',
      'Record the significant findings of the COSHH assessment in writing',
      'Notify the Health and Safety Executive before any work begins',
    ],
    correctAnswer: 2,
    explanation:
      'Where an employer has five or more employees, the significant findings of the risk assessment must be recorded. This is a requirement under the Management of Health and Safety at Work Regulations 1999 that applies to COSHH assessments. Even with fewer than five employees, it is considered best practice to document findings.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'COSHH risk assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 71,
    question: "What does the abbreviation 'WEL' stand for?",
    options: [
      'Worker Exposure Legislation',
      'Work Environment Legislation',
      'Warning Exposure Level',
      'Workplace Exposure Limit',
    ],
    correctAnswer: 3,
    explanation:
      'WEL stands for Workplace Exposure Limit. It is the maximum concentration of a hazardous substance in workplace air, averaged over a specified reference period, to which a worker may be exposed by inhalation. WELs are listed in HSE publication EH40 and are legally binding under COSHH.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Workplace Exposure Limits',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 72,
    question:
      'Which piece of legislation specifically governs the supply of Safety Data Sheets in the UK?',
    options: [
      'UK REACH Regulation',
      'COSHH Regulations 2002',
      'CLP Regulation 2008',
      'Environmental Protection Act 1990',
    ],
    correctAnswer: 0,
    explanation:
      'The requirement to provide Safety Data Sheets comes from UK REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals). Article 31 of UK REACH requires suppliers to provide a SDS when supplying a classified hazardous substance or mixture. COSHH requires employers to obtain and use this information for their risk assessments.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 73,
    question:
      'What is the WEL for respirable crystalline silica (RCS) in the UK as listed in EH40?',
    options: [
      '0.01 mg/m³ 8-hour TWA',
      '0.1 mg/m³ 8-hour TWA',
      '0.5 mg/m³ 8-hour TWA',
      '1.0 mg/m³ 8-hour TWA',
    ],
    correctAnswer: 1,
    explanation:
      'The UK Workplace Exposure Limit for respirable crystalline silica is 0.1 mg/m³ as an 8-hour TWA. This limit reflects the serious health risks associated with silica exposure, including silicosis and lung cancer. The HSE treats this WEL as an upper limit and employers should aim to reduce exposure well below it.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Workplace Exposure Limits',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 74,
    question: 'Under COSHH, when is health surveillance legally required?',
    options: [
      'Whenever any hazardous substance carrying a safety data sheet is in use on site, because the supply of a data sheet itself creates a duty to monitor the health of everyone handling it',
      'After an employee has reported symptoms of ill health, so that the employer can establish whether the condition was caused by their work rather than by something outside it',
      'When the risk assessment identifies that employees are exposed to a substance linked to an identifiable disease or adverse health effect, and there is a reasonable likelihood of it occurring',
      'For employees who have worked with hazardous substances for more than five years, and for any employee over the age of fifty whatever the substances used',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 11 requires health surveillance where: (a) employees are exposed to a substance listed in Schedule 6 or linked to a particular disease or adverse health effect, (b) there is a reasonable likelihood of the disease or effect occurring under the conditions of work, and (c) valid techniques are available to detect the disease or effect.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Health surveillance',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 75,
    question:
      'Which of the following substances requires COSHH health surveillance under Schedule 6 of the Regulations?',
    options: [
      'General inhalable dust',
      'Water-based paint',
      'Ordinary Portland cement',
      'Isocyanates',
    ],
    correctAnswer: 3,
    explanation:
      'Isocyanates are listed in Schedule 6 of the COSHH Regulations, which specifies substances for which medical surveillance by an appointed doctor is required. Workers who may be significantly exposed to isocyanates must undergo health surveillance including lung function testing and medical assessment.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Health surveillance',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 76,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, what must employers do in addition to COSHH assessments?',
    options: [
      'Carry out a general risk assessment covering all workplace risks, including those from hazardous substances',
      'Provide every employee with a personal printed copy of each safety data sheet held on site',
      'Test all local exhaust ventilation systems at intervals of no more than six months, whatever the type of plant',
      'Keep records of all hazardous substance use for a minimum of forty years from first use',
    ],
    correctAnswer: 0,
    explanation:
      'The Management of Health and Safety at Work Regulations 1999 Regulation 3 requires employers to carry out a suitable and sufficient assessment of all risks to employees and others. COSHH assessments are specific to hazardous substance risks but must sit within this broader risk management framework.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 77,
    question:
      'What information from a Safety Data Sheet is most directly useful when writing a COSHH risk assessment?',
    options: [
      'The product price, the batch number, the pack size and the date it was manufactured',
      'Hazard identification, exposure controls, toxicological information, and first-aid measures',
      'The transport classification, the UN number and the outer packaging dimensions',
      'The supplier\'s logo, marketing claims, warranty terms and returns policy',
    ],
    correctAnswer: 1,
    explanation:
      'The most directly useful SDS sections for a COSHH assessment are Section 2 (hazard identification), Section 8 (exposure controls/personal protection), Section 11 (toxicological information), and Section 4 (first-aid measures). These sections provide the data needed to identify hazards, assess routes of exposure, select controls, and plan emergency response.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Safety Data Sheets',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 78,
    question:
      'Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), which COSHH-related conditions are reportable?',
    options: [
      'Minor skin irritation that clears up within a single shift, provided the affected worker reports it to their supervisor',
      'Temporary headaches and dizziness caused by short-term solvent exposure in a poorly ventilated room',
      'Occupational diseases including occupational asthma, occupational dermatitis, and certain cancers caused by workplace substance exposure',
      'Eye irritation and watering caused by working near dust without eye protection, if it lasts more than a day',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR Schedule 2 lists specific occupational diseases that are reportable, including occupational asthma, occupational dermatitis from exposure to sensitisers or irritants, and cancers linked to occupational exposures. Additionally, any dangerous occurrence involving uncontrolled release of a hazardous substance must be reported.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Related legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 79,
    question: "What is a 'hazard statement' (H-statement) on a CLP chemical label?",
    options: [
      'A phrase advising how the substance should be stored, handled and disposed of safely',
      'A code showing which items of personal protective equipment must be worn when using it',
      'A number giving the Workplace Exposure Limit that applies to the substance in EH40',
      'A standardised phrase that describes the nature and severity of the hazard posed by a substance',
    ],
    correctAnswer: 3,
    explanation:
      "Hazard statements (H-statements) are standardised phrases assigned to each hazard class and category under CLP. They describe the nature of the hazard, for example H301 ('Toxic if swallowed'), H315 ('Causes skin irritation'), or H350 ('May cause cancer'). They are numbered and grouped: H2xx for physical hazards, H3xx for health hazards, and H4xx for environmental hazards.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'CLP labelling',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 80,
    question: "What is a 'precautionary statement' (P-statement) on a CLP chemical label?",
    options: [
      'A standardised phrase describing recommended measures to minimise or prevent adverse effects from exposure, storage, or disposal',
      'A standardised phrase describing the nature and the severity of the hazard the substance itself presents to health',
      'A code identifying which of the nine GHS pictograms must be printed on the container label',
      'A number giving the legal Workplace Exposure Limit that applies to the substance under EH40',
    ],
    correctAnswer: 0,
    explanation:
      "Precautionary statements (P-statements) are standardised phrases under CLP that advise on measures to minimise or prevent harmful effects. They are grouped: P1xx (general), P2xx (prevention, e.g., 'Wear protective gloves'), P3xx (response, e.g., 'IF SWALLOWED: Call a POISON CENTRE'), P4xx (storage), and P5xx (disposal).",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'CLP labelling',
    category: 'Legislation & Risk Assessment',
  },

  // =======================================================================
  // HAZARDOUS SUBSTANCES ON SITE — 20 questions (id 81-100)
  // ~7 basic, ~9 intermediate, ~4 advanced
  // =======================================================================
  {
    id: 81,
    question:
      'Which hazardous substance is most commonly encountered when chasing walls or cutting concrete on a construction site?',
    options: [
      'Polychlorinated biphenyls (PCBs)',
      'Respirable crystalline silica (RCS) dust',
      'Mercury vapour',
      'Carbon monoxide gas',
    ],
    correctAnswer: 1,
    explanation:
      'Chasing walls and cutting concrete, brick, block, or mortar releases respirable crystalline silica (RCS) dust. Silica is a major component of these materials, and the cutting/grinding process creates very fine dust particles that can penetrate deep into the lungs, causing silicosis and increasing the risk of lung cancer.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 82,
    question:
      'What hazardous substance is an electrician most likely exposed to when soldering copper pipe joints or cable terminations?',
    options: [
      'Silica dust from the soldered joint',
      'Asbestos fibres from the cable insulation',
      'Lead and rosin (colophony) fumes from solder and flux',
      'Isocyanate vapour from the flux',
    ],
    correctAnswer: 2,
    explanation:
      'Soldering traditionally uses tin-lead alloy solder and rosin-based flux. This creates lead fume and rosin (colophony) fume. Lead is toxic to the nervous system, kidneys, and reproductive system. Colophony fume is a respiratory sensitiser and a known cause of occupational asthma. Lead-free solder is now preferred where possible.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 83,
    question:
      'What type of hazardous substance can be released when drilling into painted surfaces in buildings constructed before 1980?',
    options: [
      'Asbestos fibres from the paint binder',
      'Mercury vapour from the pigment',
      'Carbon monoxide from the drill motor',
      'Lead-containing paint dust',
    ],
    correctAnswer: 3,
    explanation:
      'Lead-based paints were widely used in UK buildings until the late 1970s. Drilling, sanding, or scraping these painted surfaces can generate lead-containing dust. Electricians frequently drill into walls and ceilings in older buildings, making lead paint dust a significant occupational hazard that requires assessment under COSHH.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 84,
    question:
      'Which hazardous substance might electricians encounter when working in loft spaces with older insulation materials?',
    options: [
      'Man-made mineral fibres (MMMF) from glass wool or mineral wool insulation',
      'Isocyanate vapour given off by spray-applied foam insulation',
      'Zinc oxide fume released from galvanised loft fixings',
      'Chlorine gas released from preservative-treated roof timber',
    ],
    correctAnswer: 0,
    explanation:
      'Loft spaces commonly contain glass wool or mineral wool insulation, which are man-made mineral fibres (MMMF). These can cause skin irritation, eye irritation, and upper respiratory tract irritation. While less hazardous than asbestos, they still require appropriate controls including gloves, eye protection, and dust masks.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 85,
    question:
      'What is the main COSHH concern when using PVC solvent cement (glue) to join plastic conduit?',
    options: [
      'The cement releases respirable crystalline silica dust from its filler as it cures',
      'The solvent vapours are flammable and can cause narcotic effects in poorly ventilated areas',
      'The wet cement is corrosive and will cause chemical burns to unprotected skin',
      'The cement releases chlorine gas as the PVC surface is softened by the solvent',
    ],
    correctAnswer: 1,
    explanation:
      'PVC solvent cement contains volatile organic solvents such as tetrahydrofuran (THF) and cyclohexanone. These vapours are highly flammable and have narcotic effects at high concentrations. In confined or poorly ventilated spaces, vapour levels can build quickly, causing dizziness, headaches, and at extreme levels, unconsciousness.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 86,
    question:
      'What hazardous substance can be encountered when an electrician works near or disturbs old fluorescent light fittings?',
    options: [
      'Zinc oxide fume from galvanised steel',
      'Respirable crystalline silica from the glass',
      'Mercury vapour from broken fluorescent tubes',
      'Isocyanate vapour from the tube coating',
    ],
    correctAnswer: 2,
    explanation:
      'Fluorescent tubes contain a small amount of mercury vapour, which is released if the tube breaks. Mercury is toxic to the nervous system, kidneys, and lungs. Electricians removing or replacing old fluorescent fittings must handle tubes carefully and follow safe disposal procedures. Broken tubes should be cleaned up following HSE guidance.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 87,
    question:
      'What hazardous substance may be present in older electrical switchgear and transformers manufactured before the mid-1980s?',
    options: [
      'Respirable crystalline silica',
      'Man-made mineral fibres',
      'Zinc oxide fume',
      'Polychlorinated biphenyls (PCBs)',
    ],
    correctAnswer: 3,
    explanation:
      'Polychlorinated biphenyls (PCBs) were widely used as insulating and cooling fluids in electrical transformers, capacitors, and switchgear until their production was banned in 1981. PCBs are persistent organic pollutants that are toxic, potentially carcinogenic, and bioaccumulative. Electricians working on older equipment must be aware of the risk.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 88,
    question:
      'What is the primary health risk from wood dust generated during first fix electrical work in timber-framed buildings?',
    options: [
      'Hardwood dust is a recognised carcinogen (nasal cancer) and both hardwood and softwood dust can cause occupational asthma and dermatitis',
      'Wood dust is a natural material, so the health effects are limited to short-lived irritation of the eyes and nose',
      'Hardwood dust carries a nasal cancer risk, but softwood dust is outside COSHH because of its lower resin content',
      'Wood dust is hazardous mainly because fine dust suspended in air can form an explosive atmosphere in an enclosed space',
    ],
    correctAnswer: 0,
    explanation:
      'Hardwood dust (e.g., oak, beech, mahogany) is classified as a Group 1 carcinogen by IARC, specifically linked to nasal adenocarcinoma. Both hardwood and softwood dusts can cause occupational asthma and dermatitis. The UK WEL for hardwood dust is 3 mg/m³ and for softwood dust is 5 mg/m³ (both 8-hour TWA).',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 89,
    question:
      'What biological hazard should be considered when electricians work in underground cable ducts, drains, or basements where rodents may be present?',
    options: [
      'Metal fume fever caused by the zinc coating on cable support systems in the duct',
      'Leptospirosis (Weil\'s disease) from contact with water or surfaces contaminated with rat urine',
      'Silicosis caused by disturbing dried concrete and mortar dust inside the duct',
      'Occupational dermatitis caused by prolonged contact with cable-pulling lubricant',
    ],
    correctAnswer: 1,
    explanation:
      "Leptospirosis (the severe form known as Weil's disease) is caused by Leptospira bacteria found in the urine of infected rats. Electricians working in underground ducts, basements, or cable trenches where rodents are present can be exposed through contaminated water or surfaces entering cuts, eyes, or mucous membranes.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Biological hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 90,
    question:
      'What hazardous substance is released when copper cables are stripped by burning off the insulation?',
    options: [
      'Water vapour and carbon dioxide, which are given off harmlessly as the insulation melts',
      'Respirable crystalline silica dust released from the mineral filler in the insulation',
      'Toxic fumes including hydrogen chloride, dioxins, and furans from burning PVC insulation',
      'Zinc oxide fume given off by the tinned coating on the copper conductor',
    ],
    correctAnswer: 2,
    explanation:
      'Burning PVC cable insulation releases a cocktail of highly toxic substances including hydrogen chloride gas, dioxins, furans, and particulate matter. This practice is illegal under the Environmental Protection Act 1990 and extremely hazardous to health. Cable stripping must be done mechanically, never by burning.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 91,
    question:
      'What COSHH hazard is associated with the use of cable-pulling lubricants in confined trunking or conduit runs?',
    options: [
      'The lubricant dries to a fine powder that releases respirable crystalline silica when it is later disturbed',
      'The lubricant attacks PVC cable insulation over time, so the hazard is degradation of the cable rather than exposure',
      'The lubricant is highly flammable and its vapour can be ignited by arcing at a loose cable termination',
      'Some lubricants contain irritants or sensitisers that can cause skin reactions, and vapours can accumulate in confined spaces',
    ],
    correctAnswer: 3,
    explanation:
      'Some cable-pulling lubricants contain chemical additives that can cause skin irritation, sensitisation, or eye irritation. In confined conduit runs or cable trays, vapours from solvent-based lubricants can accumulate. The SDS should always be checked before use, and appropriate gloves and ventilation should be provided.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 92,
    question:
      "Why is construction dust classified as a significant health hazard even when it appears to be 'ordinary' dust?",
    options: [
      'Because construction dust often contains respirable crystalline silica, and even \'low-toxicity\' dusts can cause lung disease at high or prolonged exposures',
      'Because all construction dust is classified as a biological agent under COSHH, whatever material it came from, and biological agents are always treated as high risk',
      'Because construction dust suspended in the air is always flammable and presents an explosion risk in enclosed spaces',
      'Because construction dust is corrosive and damages the skin and eyes on contact, even in very small quantities',
    ],
    correctAnswer: 0,
    explanation:
      "Construction dust is rarely 'ordinary'. Materials like concrete, brick, mortar, and sandstone all contain crystalline silica. Even dusts without silica content can cause chronic lung disease at high exposures. The HSE estimates that construction workers are at significant risk and has specific guidance on controlling construction dust.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 93,
    question:
      'What hazardous substance can be released when cutting galvanised metal cable tray or trunking with a disc cutter?',
    options: [
      'Respirable crystalline silica dust from the metal',
      'Zinc oxide fume from the galvanised coating, which can cause metal fume fever',
      'Asbestos fibres released from the corrosion-protection layer',
      'Mercury vapour released from the cutting disc',
    ],
    correctAnswer: 1,
    explanation:
      'Galvanised steel is coated with zinc for corrosion protection. Cutting, grinding, or welding galvanised steel heats the zinc coating, producing zinc oxide fume. Inhaling this fume causes metal fume fever, with flu-like symptoms appearing several hours after exposure. Adequate ventilation or RPE should be used.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 94,
    question:
      'What is the COSHH hazard when working with two-pack epoxy resin products used for cable joints and potting compounds?',
    options: [
      'The product releases respirable crystalline silica dust from its mineral filler as the joint cures and hardens in place',
      'The mixed product gives off lead fume once the completed cable joint is energised and begins to warm up',
      'The resin and hardener components can cause severe skin sensitisation (allergic contact dermatitis) and respiratory sensitisation',
      'The product gives off carbon monoxide as the exothermic curing reaction heats the joint',
    ],
    correctAnswer: 2,
    explanation:
      'Epoxy resin systems contain bisphenol A diglycidyl ether (BADGE) and amine or anhydride hardeners, which are potent skin and respiratory sensitisers. Once sensitised, a worker may react to very small exposures. Appropriate chemically resistant gloves (nitrile, not latex), eye protection, and ventilation are essential when handling epoxy products.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 95,
    question:
      'Which of the following biological hazards can affect electricians working on or near air-conditioning and cooling systems?',
    options: [
      "Leptospirosis from rodent urine in the plant room",
      "Anthrax spores from contaminated ductwork insulation",
      "Tetanus from rusty metal in the cooling unit",
      "Legionella bacteria causing Legionnaires' disease",
    ],
    correctAnswer: 3,
    explanation:
      "Legionella bacteria thrive in warm water systems between 20-45°C, including cooling towers, evaporative condensers, and some hot water systems. Electricians working on controls, sensors, or wiring near these systems can be exposed to contaminated water droplets (aerosols). Legionnaires' disease is a severe form of pneumonia that can be fatal.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Biological hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 96,
    question:
      'What hazardous substance is present in SF6 (sulphur hexafluoride) gas used in high-voltage switchgear?',
    options: [
      'SF6 is non-toxic in its pure form but becomes hazardous when decomposed by electrical arcing, producing toxic by-products including sulphur dioxide',
      'SF6 is a respiratory sensitiser that causes occupational asthma at very low airborne concentrations, so any release is a sensitisation risk',
      'SF6 is a recognised carcinogen that causes nasal cancer after long-term low-level exposure in switchrooms',
      'SF6 is highly flammable and presents a serious fire risk if it is released into an energised switchroom',
    ],
    correctAnswer: 0,
    explanation:
      'Pure SF6 is non-toxic but is an asphyxiant in high concentrations as it displaces oxygen. More importantly, when SF6 is decomposed by electrical arcing or discharge within switchgear, it produces highly toxic by-products including sulphur dioxide, hydrogen fluoride, and metal fluorides. Electricians must never open SF6-filled equipment without specialist training.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 97,
    question:
      'What COSHH-relevant hazard is created when using angle grinders to cut chases in brickwork for electrical cables?',
    options: [
      'Lead fume released from the old mortar joints as friction from the cutting disc heats the brickwork',
      'High concentrations of respirable dust including crystalline silica, requiring dust suppression or extraction',
      'Asbestos fibres released from the cement-based mortar used in older brickwork walls',
      'Solvent vapours from the disc bonding resin that build up along the length of the chase',
    ],
    correctAnswer: 1,
    explanation:
      'Angle grinding or chasing brickwork generates extremely high concentrations of respirable dust, a significant proportion of which is respirable crystalline silica. Without controls such as on-tool extraction or water suppression, exposure can rapidly exceed the WEL of 0.1 mg/m³. This is one of the highest-risk activities for silica exposure on site.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 98,
    question:
      'What is the COSHH risk from mineral insulating oil found in older transformers and switchgear?',
    options: [
      'The oil releases respirable crystalline silica dust from its mineral additives whenever the transformer is drained down for maintenance',
      'The oil gives off zinc oxide fume when it is heated by the windings during normal operation of the unit',
      'Mineral oil can cause skin irritation, oil acne, and dermatitis on prolonged or repeated skin contact, and oil mist can irritate the respiratory tract',
      'The oil breaks down as it ages and releases asbestos fibres from the transformer\'s internal insulation',
    ],
    correctAnswer: 2,
    explanation:
      'Prolonged or repeated skin contact with mineral insulating oil can cause irritant contact dermatitis, folliculitis (oil acne), and in some cases, skin cancer from certain untreated or mildly treated mineral oils. Oil mist generated during maintenance can irritate the respiratory tract. Barrier cream, gloves, and good hygiene practices are essential.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Electrical trade hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 99,
    question:
      'Which of the following is a hazardous substance commonly used in fire-stopping and sealing around electrical penetrations?',
    options: [
      'Galvanised steel fixing brackets used to support the cable tray through the wall',
      'Bare copper earthing conductors bonded across the penetration',
      'Mineral wool cavity insulation packed loosely around the cables',
      'Intumescent sealants and mastics which may contain irritants, sensitisers, or isocyanates',
    ],
    correctAnswer: 3,
    explanation:
      'Intumescent fire-stop sealants, mastics, and foams used to seal around cable penetrations through fire-rated walls and floors often contain chemical irritants, sensitisers, or isocyanates. Some expanding foam products release isocyanate vapour during application. The SDS must be checked and appropriate PPE worn.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 100,
    question:
      'What hazardous substance can electricians be exposed to when lifting floor tiles or ceiling tiles in buildings constructed between the 1950s and 1990s?',
    options: [
      'Asbestos fibres from asbestos-containing tiles, adhesives, or backing materials',
      'Zinc oxide fume given off by the galvanised tile fixing clips',
      'Respirable crystalline silica released from the tile bedding grout',
      'Mercury vapour released by the bitumen-based tile adhesive',
    ],
    correctAnswer: 0,
    explanation:
      'Many floor tiles (particularly thermoplastic tiles), ceiling tiles, and tile adhesives used between the 1950s and late 1990s contained asbestos. While asbestos is excluded from COSHH (having its own regulations), electricians must be aware that disturbing these materials releases asbestos fibres. A refurbishment/demolition survey should identify any ACMs before work begins.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Construction hazards',
    category: 'Hazardous Substances on Site',
  },

  // ===== Questions 101-200 (merged) =====
  // ===== HAZARDOUS SUBSTANCES ON SITE (continued) — 20 questions (id 101-120) =====
  {
    id: 101,
    question:
      'What is the primary health risk associated with prolonged exposure to respirable crystalline silica (RCS) dust on construction sites?',
    options: [
      'Contact dermatitis',
      'Silicosis and lung cancer',
      'Noise-induced hearing loss',
      'Vibration white finger',
    ],
    correctAnswer: 1,
    explanation:
      'Prolonged inhalation of RCS dust can cause silicosis, a serious and irreversible lung disease, and is classified as a Group 1 carcinogen by IARC, meaning it can cause lung cancer. The workplace exposure limit for RCS is 0.1 mg/m³ as an 8-hour TWA.',
    category: 'Hazardous Substances on Site',
    difficulty: 'basic',
  },
  {
    id: 102,
    question:
      'When chasing walls or cutting concrete blocks, which type of dust extraction is considered best practice under COSHH?',
    options: [
      'General room ventilation only',
      'Wearing a disposable dust mask without extraction',
      'On-tool extraction (LEV) with H-class vacuum',
      'Dampening the area with a garden hose',
    ],
    correctAnswer: 2,
    explanation:
      'On-tool extraction using an H-class vacuum is the most effective engineering control for capturing silica dust at the point of generation. H-class vacuums are designed to capture hazardous dusts with a filtration efficiency of 99.995%, preventing them from becoming airborne.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 103,
    question:
      'What class of biological hazard might an electrician encounter when rewiring in an old loft space contaminated with pigeon droppings?',
    options: [
      'Respirable crystalline silica dust',
      'Lead-containing paint particles',
      'Man-made mineral fibres',
      'Biological agents including fungi and bacteria',
    ],
    correctAnswer: 3,
    explanation:
      'Dried pigeon droppings can harbour biological agents including the fungus Cryptococcus neoformans and bacteria such as Chlamydia psittaci. Under COSHH, biological agents are classified into hazard groups 1-4, and appropriate respiratory protection and hygiene measures are required.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question:
      'What is the workplace exposure limit (WEL) for inhalable dust (particles not otherwise specified) under EH40?',
    options: [
      '10 mg/m³',
      '4 mg/m³',
      '0.1 mg/m³',
      '20 mg/m³',
    ],
    correctAnswer: 0,
    explanation:
      'The WEL for inhalable dust (PNOS) is 10 mg/m³ as an 8-hour TWA, while respirable dust (PNOS) has a WEL of 4 mg/m³. These are general limits that apply when no substance-specific WEL has been assigned under EH40.',
    category: 'Hazardous Substances on Site',
    difficulty: 'basic',
  },
  {
    id: 105,
    question:
      'An electrician is installing containment in a room where spray painting is taking place. Which type of hazard is isocyanate paint most associated with?',
    options: [
      'Skin corrosion and chemical burns on contact',
      'Occupational asthma (respiratory sensitiser)',
      'Silicosis from inhaled mineral dust',
      'Metal fume fever from inhaled fume',
    ],
    correctAnswer: 1,
    explanation:
      'Isocyanates are potent respiratory sensitisers and are the most common cause of occupational asthma in the UK. Once sensitised, even very low exposures can trigger severe asthma attacks. They carry the GHS hazard statement H334 (may cause allergy or asthma symptoms if inhaled).',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 106,
    question:
      'Under COSHH, which of the following is classified as a biological agent hazard group 3 organism?',
    options: [
      'E. coli (non-pathogenic strain)',
      "Baker's yeast",
      'Legionella pneumophila',
      'Common bread mould',
    ],
    correctAnswer: 2,
    explanation:
      "Legionella pneumophila is classified as a hazard group 3 biological agent under the Approved List of Biological Agents. It can cause Legionnaires' disease, a potentially fatal form of pneumonia. Electricians may encounter Legionella risks when working near cooling towers or water systems.",
    category: 'Hazardous Substances on Site',
    difficulty: 'advanced',
  },
  {
    id: 107,
    question:
      'What does the GHS hazard pictogram showing a person with a starburst on their chest indicate?',
    options: [
      'Acute toxicity that may cause death from a single dose',
      'Corrosive damage to skin, eyes, and metals',
      'A flammable substance that presents a fire risk',
      'Serious health hazard (CMR, sensitiser, STOT)',
    ],
    correctAnswer: 3,
    explanation:
      "The 'health hazard' pictogram (GHS08) indicates serious longer-term health hazards including carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitisation, specific target organ toxicity, and aspiration hazard. It is distinct from the skull and crossbones which indicates acute toxicity.",
    category: 'Hazardous Substances on Site',
    difficulty: 'basic',
  },
  {
    id: 108,
    question:
      'When pulling cables through ceiling voids in a hospital, what type of hazardous substance might be present in old lagging around pipework?',
    options: [
      'Asbestos-containing materials',
      'Respirable crystalline silica dust',
      'Man-made mineral fibre insulation',
      'Lead-containing paint flakes',
    ],
    correctAnswer: 0,
    explanation:
      'Old pipe lagging in buildings constructed before 2000 may contain asbestos, particularly amosite (brown asbestos) or chrysotile (white asbestos). Under the Control of Asbestos Regulations 2012, a refurbishment/demolition asbestos survey should be carried out before invasive work in such areas.',
    category: 'Hazardous Substances on Site',
    difficulty: 'basic',
  },
  {
    id: 109,
    question:
      'What is the short-term exposure limit (STEL) period defined in EH40 for workplace exposure limits?',
    options: ['5 minutes', '15 minutes', '30 minutes', '1 hour'],
    correctAnswer: 1,
    explanation:
      'A STEL in EH40 is measured over a 15-minute reference period. It is intended to prevent acute health effects from brief high-concentration exposures. Employers must ensure that both 8-hour TWA and 15-minute STEL values are not exceeded.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question:
      'Welding fume was reclassified by IARC in 2017. What is its current carcinogenicity classification?',
    options: [
      'Group 2B — possibly carcinogenic',
      'Group 2A — probably carcinogenic',
      'Group 1 — carcinogenic to humans',
      'Not classified as carcinogenic',
    ],
    correctAnswer: 2,
    explanation:
      'In 2017, IARC reclassified all welding fume as Group 1 (carcinogenic to humans), upgrading it from Group 2B. This led the HSE to strengthen enforcement expectations, requiring LEV or RPE for all welding activities including mild steel welding, which was previously considered lower risk.',
    category: 'Hazardous Substances on Site',
    difficulty: 'advanced',
  },
  {
    id: 111,
    question:
      'What is the main route of entry for solvents such as toluene and xylene used in electrical cleaning products?',
    options: [
      'Ingestion only',
      'Injection through skin puncture',
      'Through the eyes only',
      'Inhalation and skin absorption',
    ],
    correctAnswer: 3,
    explanation:
      'Solvents like toluene and xylene can enter the body through both inhalation of vapours and absorption through the skin. They carry both H332 (harmful if inhaled) and H312 (harmful in contact with skin) hazard statements. Adequate ventilation and appropriate gloves are both required as control measures.',
    category: 'Hazardous Substances on Site',
    difficulty: 'basic',
  },
  {
    id: 112,
    question:
      'An electrician discovers unlabelled containers of chemicals in a plant room. What should they do first?',
    options: [
      'Stop work, do not handle them, and report to the supervisor',
      'Pour a small amount out to check the colour',
      'Smell the contents to try to identify them',
      'Assume they are harmless cleaning products',
    ],
    correctAnswer: 0,
    explanation:
      'Unlabelled chemical containers must never be handled, opened, or investigated by unqualified personnel. Under COSHH Regulation 7, the employer must ensure substances are properly labelled. The correct action is to stop work, avoid contact, and report to the supervisor so the substances can be properly identified.',
    category: 'Hazardous Substances on Site',
    difficulty: 'basic',
  },
  {
    id: 113,
    question:
      'Which of the following fumes is most likely to cause metal fume fever in an electrician working near welding operations?',
    options: [
      'Lead fume from soldering operations',
      'Zinc oxide fume from galvanised steel',
      'Silica dust from concrete cutting',
      'Solvent vapour from degreasing agents',
    ],
    correctAnswer: 1,
    explanation:
      'Metal fume fever is most commonly caused by inhaling zinc oxide fume, produced when welding or cutting galvanised steel. Symptoms resemble influenza and typically appear 4-8 hours after exposure. While it usually resolves within 24-48 hours, repeated exposures should be avoided through adequate LEV and RPE.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 114,
    question:
      'What type of health hazard does SF₆ (sulphur hexafluoride) present when used in high-voltage switchgear?',
    options: [
      'It is a respiratory sensitiser causing occupational asthma',
      'It is a recognised carcinogen causing lung cancer',
      'It is a simple asphyxiant that displaces oxygen',
      'It is corrosive and causes severe skin and eye burns',
    ],
    correctAnswer: 2,
    explanation:
      'SF₆ is an odourless, colourless gas used as an insulating medium in high-voltage switchgear. While non-toxic at normal temperatures, it is heavier than air and can accumulate in confined spaces, displacing oxygen and causing asphyxiation. Adequate ventilation and gas monitoring are essential when working in areas where SF₆ may leak.',
    category: 'Hazardous Substances on Site',
    difficulty: 'advanced',
  },
  {
    id: 115,
    question:
      'Under COSHH, what must an employer provide to employees who are exposed to substances hazardous to health?',
    options: [
      'A cash allowance to buy their own protective equipment',
      'A signed waiver releasing the employer from liability',
      'A guarantee of alternative work away from all hazardous substances',
      'Suitable and sufficient information, instruction and training',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH Regulation 12 requires employers to provide suitable and sufficient information, instruction, and training to employees who may be exposed to hazardous substances. This includes details about the risks, precautions, control measures, and the results of any monitoring or health surveillance.',
    category: 'Hazardous Substances on Site',
    difficulty: 'basic',
  },
  {
    id: 116,
    question:
      'What hazard do PCBs (polychlorinated biphenyls) present, which may be found in older electrical equipment such as capacitors and transformers?',
    options: [
      'Persistent organic pollutant; probable carcinogen and endocrine disruptor',
      'A simple asphyxiant that displaces oxygen in confined spaces',
      'A respiratory sensitiser that is a leading cause of occupational asthma',
      'A corrosive liquid that causes immediate skin and eye burns',
    ],
    correctAnswer: 0,
    explanation:
      'PCBs are classified as persistent organic pollutants and probable human carcinogens (IARC Group 1). They were widely used in transformer oils and capacitors until banned in the UK in 1981. Disposal of PCB-containing equipment must comply with the Environmental Permitting Regulations and specialist waste procedures.',
    category: 'Hazardous Substances on Site',
    difficulty: 'advanced',
  },
  {
    id: 117,
    question:
      'What is the primary health effect of nitrogen dioxide (NO₂), which can be produced by diesel-powered generators on site?',
    options: [
      'Skin sensitisation and allergic contact dermatitis',
      'Respiratory irritation and pulmonary oedema at high concentrations',
      'Narcosis and central nervous system depression',
      'Metal fume fever with delayed flu-like symptoms',
    ],
    correctAnswer: 1,
    explanation:
      'Nitrogen dioxide is a respiratory irritant that can cause inflammation of the airways and, at high concentrations, pulmonary oedema (fluid in the lungs). The WEL for NO₂ is 0.96 mg/m³ (0.5 ppm) 8-hour TWA. Diesel exhaust itself was classified as carcinogenic (IARC Group 1) in 2012.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question:
      'When drilling into painted surfaces in pre-1960s buildings, what hazardous substance should electricians be particularly aware of?',
    options: [
      'Formaldehyde',
      'Mercury vapour',
      'Lead in paint',
      'Hydrogen cyanide',
    ],
    correctAnswer: 2,
    explanation:
      'Lead-based paint was widely used in buildings before 1960 and was not fully phased out until the 1992 ban on lead in decorative paint. Drilling or sanding lead paint generates hazardous dust. The WEL for lead is 0.15 mg/m³, and work with lead is also covered by the Control of Lead at Work Regulations 2002.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: "What does the term 'respirable dust fraction' refer to in occupational hygiene?",
    options: [
      'Large particles that settle out of the air quickly and are visible to the naked eye',
      'Particles trapped in the nose and throat before they can reach the lower airways',
      'Any particle from a substance that has a workplace exposure limit listed in EH40',
      'Airborne particles small enough to reach the gas exchange region of the lungs (alveoli)',
    ],
    correctAnswer: 3,
    explanation:
      'The respirable dust fraction consists of airborne particles typically less than about 10 micrometres aerodynamic diameter that can penetrate deep into the lungs and reach the alveoli. This is where the most serious health damage occurs, including conditions like pneumoconiosis and silicosis.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question:
      'Under COSHH, what is the legal requirement regarding safety data sheets (SDS) for hazardous substances used at work?',
    options: [
      'The supplier must provide them and the employer must make them accessible to employees',
      'The employee must write their own data sheet before using a substance',
      'The HSE must issue a data sheet for every chemical sold in the UK',
      'A data sheet is only required for substances classified as carcinogens',
    ],
    correctAnswer: 0,
    explanation:
      'Under REACH Regulation (Article 31) and COSHH, suppliers must provide a 16-section safety data sheet for hazardous substances. Employers must ensure these are available to employees who use the substances. The SDS provides critical information including hazard identification, first aid measures, handling, storage, and exposure controls.',
    category: 'Hazardous Substances on Site',
    difficulty: 'intermediate',
  },
  // ===== CONTROL MEASURES & PPE — 40 questions (id 121-160) =====
  {
    id: 121,
    question: 'What is the correct order of the hierarchy of control measures under COSHH?',
    options: [
      'PPE, engineering controls, substitution, then elimination as a last resort',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'PPE, administrative controls, substitution, engineering controls, elimination',
      'Engineering controls, elimination, PPE, substitution, administrative controls',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy of control follows the principle that the most effective measures should be considered first: elimination, substitution, engineering controls (such as LEV), administrative controls (procedures, training, signage), and finally PPE as a last resort. COSHH Regulation 7 requires employers to apply this hierarchy.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 122,
    question: 'What does LEV stand for in the context of COSHH control measures?',
    options: [
      'Low Energy Ventilation',
      'Laboratory Environment Verification',
      'Local Exhaust Ventilation',
      'Limited Exposure Value',
    ],
    correctAnswer: 2,
    explanation:
      'Local Exhaust Ventilation (LEV) is an engineering control that captures airborne contaminants at or near the source before they can spread into the workplace air. Under COSHH Regulation 9, LEV systems must be examined and tested at least every 14 months (or 6 months for certain processes).',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 123,
    question:
      'How often must LEV systems be thoroughly examined and tested under COSHH Regulation 9?',
    options: [
      'Once a week, before the system is first switched on for the shift',
      'Whenever the system appears to be working poorly or the extraction seems weak',
      'At least once every five years from the date the system was installed',
      'At least every 14 months, or every 6 months for certain specified processes',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH Regulation 9 requires LEV systems to be thoroughly examined and tested at least every 14 months. However, for certain processes listed in Schedule 4 (e.g., processes involving lead, asbestos), the interval is reduced to 6 months. Records must be kept for at least 5 years.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 124,
    question:
      'An FFP2 disposable respirator provides a minimum assigned protection factor (APF) of what value?',
    options: [
      'APF 10',
      'APF 20',
      'APF 4',
      'APF 40',
    ],
    correctAnswer: 0,
    explanation:
      'An FFP2 disposable filtering facepiece respirator has an assigned protection factor (APF) of 10, meaning it can be used in atmospheres up to 10 times the WEL. FFP1 has APF 4, FFP2 has APF 10, and FFP3 has APF 20. These values are specified in BS EN 149.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: 'What is the assigned protection factor (APF) of an FFP3 disposable respirator?',
    options: [
      'APF 4',
      'APF 20',
      'APF 10',
      'APF 40',
    ],
    correctAnswer: 1,
    explanation:
      'An FFP3 disposable filtering facepiece has an APF of 20, meaning it provides protection in concentrations up to 20 times the WEL. FFP3 is the highest rated disposable respirator and is required for protection against substances such as asbestos fibres and silica dust.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 126,
    question:
      'Why must RPE (Respiratory Protective Equipment) be face-fit tested for the individual wearer?',
    options: [
      "To confirm the filter has not passed its expiry date",
      "To measure how long the wearer can work before taking a break",
      "To ensure an adequate seal between the facepiece and the wearer's face",
      "To check that the respirator is comfortable to wear for long periods",
    ],
    correctAnswer: 2,
    explanation:
      "Face-fit testing is a legal requirement under COSHH to ensure that tight-fitting RPE provides an adequate seal against the wearer's face. A poor seal allows contaminated air to bypass the filter, significantly reducing protection. Both qualitative (taste test) and quantitative (instrument-based) methods are accepted.",
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 127,
    question:
      'Which of the following would prevent an adequate face seal when wearing a tight-fitting respirator?',
    options: [
      'Clean-shaven skin in the seal area',
      'Wearing spectacles with a full-face mask designed to take them',
      'Having the correct size of facepiece',
      'Facial stubble or a beard in the seal area',
    ],
    correctAnswer: 3,
    explanation:
      'Facial hair in the area where the respirator seals against the face breaks the seal and allows contaminated air to leak in. The HSE publication RPE-OC-282/28 states that tight-fitting RPE will not protect wearers who have stubble, beards, or sideburns that interfere with the face seal.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 128,
    question:
      'What type of RPE is suitable for a worker with facial hair who needs respiratory protection?',
    options: [
      'Powered air-purifying respirator with loose-fitting hood',
      'A tight-fitting FFP3 disposable respirator',
      'A tight-fitting half-mask with A2P3 filters',
      'A tight-fitting full-face respirator',
    ],
    correctAnswer: 0,
    explanation:
      'Workers with facial hair that prevents a face seal must use loose-fitting RPE such as a powered air-purifying respirator (PAPR) with a hood or helmet. These do not rely on a face seal but instead maintain positive pressure inside the headtop, providing an APF of typically 20-40 depending on the device.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 129,
    question:
      'What is the minimum APF required for RPE when working with asbestos (non-licensed work)?',
    options: [
      'APF 10 (FFP2)',
      'APF 20 (FFP3)',
      'APF 40 (full-face)',
      'APF 4 (FFP1)',
    ],
    correctAnswer: 1,
    explanation:
      'For non-licensed asbestos work, a minimum of APF 20 (FFP3 disposable or equivalent) is required by HSE guidance. For licensed asbestos work, higher protection factors are typically needed depending on the type and duration of work. The RPE must also be face-fit tested for the individual wearer.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 130,
    question: 'According to COSHH, when should PPE be considered as a control measure?',
    options: [
      'As the first and cheapest control measure to apply',
      'Before any risk assessment has been carried out',
      'Only when all other reasonably practicable measures are insufficient',
      'Whenever a substance has any safety data sheet at all',
    ],
    correctAnswer: 2,
    explanation:
      'COSHH Regulation 7(3) states that PPE should only be used as a control measure where other measures (elimination, substitution, engineering controls, administrative controls) are not reasonably practicable or are insufficient on their own. PPE is the last resort in the hierarchy of controls.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 131,
    question:
      'What type of glove material is generally recommended for handling solvent-based products containing ketones (e.g., MEK)?',
    options: [
      'Nitrile gloves',
      'Cotton gloves',
      'Latex gloves',
      'Butyl rubber gloves',
    ],
    correctAnswer: 3,
    explanation:
      "Butyl rubber gloves offer the best resistance to ketone solvents such as MEK (methyl ethyl ketone). Nitrile and latex gloves have poor resistance to ketones and will degrade rapidly. The correct glove material should always be verified against the manufacturer's chemical resistance data and the safety data sheet.",
    category: 'Control Measures & PPE',
    difficulty: 'advanced',
  },
  {
    id: 132,
    question:
      "What does the term 'breakthrough time' mean when selecting chemical-resistant gloves?",
    options: [
      'The time taken for a chemical to permeate through the glove material',
      'The time before the gloves need replacing due to wear',
      'The maximum time gloves can be stored before expiry',
      'The time it takes to put the gloves on',
    ],
    correctAnswer: 0,
    explanation:
      'Breakthrough time is the measured time it takes for a chemical to permeate through the glove material at a detectable rate under test conditions (EN 16523-1). It is critical for selecting appropriate gloves — a glove with a breakthrough time shorter than the task duration will not provide adequate protection.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question:
      'What must an employer do if a COSHH assessment identifies that substitution of a hazardous substance is reasonably practicable?',
    options: [
      'Consider it but prioritise PPE for cost reasons',
      'Substitute the substance with a less hazardous alternative',
      'Only substitute if employees request it',
      'Record the option but take no action if current controls are in place',
    ],
    correctAnswer: 1,
    explanation:
      'If substitution is identified as reasonably practicable, the employer must implement it under COSHH Regulation 7. Substitution sits high in the hierarchy of control (second only to elimination) and must be preferred over lower-level controls such as engineering controls or PPE wherever reasonably practicable.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 134,
    question:
      'What is the purpose of DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002)?',
    options: [
      'To control exposure to substances that cause long-term lung disease such as silicosis',
      'To set the Workplace Exposure Limits that apply to toxic gases and vapours at work',
      'To protect workers from risks of fire and explosion from dangerous substances in the workplace',
      'To require health surveillance for workers exposed to carcinogens and mutagens',
    ],
    correctAnswer: 2,
    explanation:
      'DSEAR requires employers to assess and control risks from dangerous substances that could cause fire, explosion, or similar energy-releasing events in the workplace. This includes flammable gases, liquids, and dusts. DSEAR implements the EU ATEX Workplace Directive (1999/92/EC) in the UK.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 135,
    question: "Under DSEAR, what does 'ATEX zone classification' determine?",
    options: [
      'The maximum airborne concentration of a toxic substance permitted',
      'The level of respiratory protection required for workers in the area',
      'The fire resistance rating of the building structure in the area',
      'The likelihood and duration of an explosive atmosphere occurring in an area',
    ],
    correctAnswer: 3,
    explanation:
      'ATEX zone classification categorises areas based on the likelihood and duration of explosive atmospheres. Zone 0/20 indicates continuous or frequent presence, Zone 1/21 indicates occasional presence during normal operations, and Zone 2/22 indicates unlikely during normal operations. Electrical equipment must be selected to match the zone.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 136,
    question:
      'An electrician needs to install equipment in an ATEX Zone 1 area. What category of equipment is required?',
    options: [
      'Category 2 equipment',
      'Category 3 equipment',
      'Category 1 equipment',
      'Standard commercial equipment',
    ],
    correctAnswer: 0,
    explanation:
      'ATEX Zone 1 requires Category 2 equipment, which provides a high level of protection and remains safe even with one fault condition. Category 1 is for Zone 0 (highest protection), Category 2 for Zone 1, and Category 3 for Zone 2. Equipment must be certified and marked with the Ex symbol.',
    category: 'Control Measures & PPE',
    difficulty: 'advanced',
  },
  {
    id: 137,
    question:
      'What is the correct method for storing incompatible chemicals in a workplace under COSHH?',
    options: [
      'All chemicals may be stored together provided the cupboard is locked and signed',
      'Incompatible chemicals must be segregated, stored in separate areas or bunded containers',
      'Chemicals need separating only where the safety data sheet gives a storage temperature',
      'Segregation is required only for quantities above 100 litres held on site',
    ],
    correctAnswer: 1,
    explanation:
      'Incompatible chemicals (e.g., oxidisers and flammables, acids and alkalis) must be stored separately to prevent dangerous reactions in the event of leakage or spillage. Storage should follow HSG71 guidance, using separate bunded areas, appropriate ventilation, and correct temperature controls.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'What does bunding or secondary containment achieve in hazardous substance storage?',
    options: [
      'It keeps stored chemicals at a constant safe temperature',
      'It prevents incompatible chemicals from reacting on the shelf',
      'It contains leaks and spills to prevent environmental contamination and spread',
      'It removes hazardous vapours from the storage area by ventilation',
    ],
    correctAnswer: 2,
    explanation:
      'Bunding provides secondary containment around chemical storage to capture any leaks or spills, preventing them from spreading to drains, watercourses, or other areas. UK guidance typically requires bund capacity of 110% of the largest container or 25% of the total storage capacity, whichever is greater.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 139,
    question:
      'What should be included in a COSHH spill kit for a workshop using solvent-based products?',
    options: [
      'A fire blanket, a bucket of dry sand and a battery smoke detector',
      'Spare RPE filters, a face-fit test kit and a spare half-mask respirator',
      'A first aid box, an eyewash bottle and a sterile burns dressing',
      'Absorbent materials, PPE (gloves, goggles, apron), waste bags, and instructions',
    ],
    correctAnswer: 3,
    explanation:
      'A COSHH spill kit should contain appropriate absorbent materials (granules or pads), chemical-resistant PPE (gloves, goggles, apron or overalls), hazardous waste bags or containers, and clear instructions for the specific substances used. Staff must be trained in its use and the kit should be checked regularly.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 140,
    question:
      'Why is it important to check that RPE filters are appropriate for the specific hazardous substance?',
    options: [
      'Different filter types protect against different classes of substance; the wrong filter provides no protection',
      'All particle filters are made to the same standard, so any filter will work with any substance',
      'The colour coding on a filter indicates only its size and the comfort of the wearer',
      'Filter choice matters for disposable respirators, but reusable half masks accept any cartridge',
    ],
    correctAnswer: 0,
    explanation:
      'RPE filters are substance-specific: particle filters (P1/P2/P3) protect against dusts, fumes, and mists; gas/vapour filters (A, B, E, K types) are designed for specific chemical classes. Using the wrong filter type provides little or no protection. Filter selection must be based on the COSHH assessment and SDS information.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 141,
    question:
      'What colour coding is used for a Type A gas filter on a reusable respirator (designed for organic vapours with boiling point above 65°C)?',
    options: [
      'Yellow',
      'Brown',
      'Grey',
      'Green',
    ],
    correctAnswer: 1,
    explanation:
      'Type A gas filters are brown and protect against certain organic gases and vapours with boiling points above 65°C. Type B (grey) is for inorganic gases, Type E (yellow) is for sulphur dioxide and hydrogen chloride, and Type K (green) is for ammonia. Multi-gas filters combine colour bands.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 142,
    question: 'What is the purpose of a qualitative face-fit test using bitter or sweet aerosol?',
    options: [
      'To measure the exact concentration of dust present inside the facepiece',
      'To confirm that the filter fitted is rated for the chemical being used',
      'To check if the wearer can detect the test aerosol through the facepiece, indicating a leak',
      'To establish how long the respirator filter will last before replacement',
    ],
    correctAnswer: 2,
    explanation:
      'A qualitative face-fit test uses a taste agent (bitter Bitrex or sweet saccharin) sprayed around a hood worn over the respirator. If the wearer can taste the aerosol, it indicates a poor face seal. This is a pass/fail test suitable for disposable and half-mask respirators but not for full-face masks.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question:
      'What is the key advantage of quantitative face-fit testing over qualitative testing?',
    options: [
      'It is quicker and cheaper to carry out than a bitter aerosol taste test',
      'It does not require the wearer to be present while the test is carried out',
      'It gives a valid result for wearers with beards and other facial hair',
      'It provides a numerical fit factor, giving a more precise and objective measure of the seal',
    ],
    correctAnswer: 3,
    explanation:
      'Quantitative face-fit testing uses instruments such as a PortaCount to measure the actual ratio of ambient particles outside the mask to those inside, producing a numerical fit factor. This is more objective and precise than the pass/fail qualitative method and is required for full-face masks.',
    category: 'Control Measures & PPE',
    difficulty: 'advanced',
  },
  {
    id: 144,
    question:
      'Under COSHH, who is responsible for ensuring that control measures including PPE are properly used?',
    options: [
      'The employer, with duties on employees to cooperate',
      'The Health and Safety Executive inspector for the area',
      'The manufacturer who supplied the hazardous substance',
      'Each individual employee, acting entirely on their own',
    ],
    correctAnswer: 0,
    explanation:
      'Under COSHH Regulation 8, the employer must take reasonable steps to ensure control measures are properly used, and under Regulation 8(2), employees must make full and proper use of control measures provided. Both parties have legal duties — employers to provide and maintain, employees to use and report defects.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 145,
    question: "What does 'COSHH essentials' refer to in HSE guidance?",
    options: [
      'A legally binding list of prohibited substances that the HSE publishes and updates each year',
      'A web-based tool that helps small businesses carry out COSHH assessments and identify control measures',
      'A British Standard governing the design and testing of respiratory protective equipment',
      'A mandatory training certificate that must be held before handling any chemical at work',
    ],
    correctAnswer: 1,
    explanation:
      "COSHH Essentials is a free, web-based guidance tool provided by the HSE to help employers, particularly small businesses, carry out COSHH risk assessments. It uses a hazard banding approach based on the substance's hazard classification, the amount used, and how it is used to recommend appropriate control measures.",
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 146,
    question:
      'What is the correct procedure for disposing of used chemical-resistant gloves that have been in contact with hazardous substances?',
    options: [
      'Rinse them under a running tap, dry them off and reuse them on the next job',
      'Place them in the general site waste bin along with all other rubbish',
      'Dispose of as hazardous waste or contaminated waste as per the COSHH assessment and SDS',
      'Burn them on site so that any residual chemical is destroyed by the heat',
    ],
    correctAnswer: 2,
    explanation:
      'Used PPE contaminated with hazardous substances must be treated as contaminated waste and disposed of according to the COSHH assessment, the SDS, and relevant waste regulations. In some cases, this means hazardous waste disposal with a licensed waste carrier. Simply placing them in general waste may cause environmental contamination.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 147,
    question: 'What does the CE/UKCA marking on PPE indicate?',
    options: [
      'The PPE has been face-fit tested to the individual wearer by the supplier',
      'The PPE was manufactured within the United Kingdom rather than imported',
      'The PPE is the lowest-cost option that meets the employer\'s minimum needs',
      'The PPE conforms to the relevant essential health and safety requirements and standards',
    ],
    correctAnswer: 3,
    explanation:
      'The UKCA (or CE) marking on PPE indicates that the product meets the essential health and safety requirements set out in the PPE Regulation (EU 2016/425, retained in UK law). It means the product has been assessed and certified by a notified body (for Category II and III PPE) and is fit for its intended protective purpose.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 148,
    question:
      'An electrician is working in a confined space with potential for hydrogen sulphide (H₂S) exposure. What type of RPE is most appropriate?',
    options: [
      'Self-contained breathing apparatus (SCBA) or airline breathing apparatus',
      'An FFP3 disposable filtering facepiece respirator',
      'A half-mask respirator with a Type B gas filter',
      'A powered air-purifying respirator with a particle filter',
    ],
    correctAnswer: 0,
    explanation:
      'In a confined space with potential H₂S exposure, which can be immediately dangerous to life (IDLH at 100 ppm), supplied-air RPE such as SCBA or airline breathing apparatus is required. Filtering facepieces and gas filter respirators are not suitable for IDLH atmospheres or oxygen-deficient environments.',
    category: 'Control Measures & PPE',
    difficulty: 'advanced',
  },
  {
    id: 149,
    question:
      'What PPE category under the PPE Regulation covers respiratory protective equipment designed to protect against serious or irreversible health risks?',
    options: [
      'Category I — minimal risks such as superficial injury',
      'Category III — serious, irreversible or fatal risks',
      'Category II — intermediate risks not in Category I or III',
      'Category 0 — no notified body assessment required',
    ],
    correctAnswer: 1,
    explanation:
      'RPE falls under Category III of the PPE Regulation because it protects against hazards that could cause serious, irreversible, or fatal health effects. Category III PPE requires type-examination by a notified body and ongoing production quality assurance. This also includes PPE for chemical risks and electrical hazards.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question: 'What is the minimum standard that a disposable FFP respirator must meet in the UK?',
    options: [
      'BS EN 166',
      'BS EN 374',
      'BS EN 149:2001+A1:2009',
      'BS EN 388',
    ],
    correctAnswer: 2,
    explanation:
      'Disposable filtering facepiece respirators (FFP1, FFP2, FFP3) must conform to BS EN 149:2001+A1:2009. This standard specifies construction requirements, filter performance, breathing resistance, and face-fit requirements. BS EN 166 covers eye protection, BS EN 388 covers protective gloves for mechanical risks.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question:
      "When using a half-face respirator with combination filters (e.g., A2P3), what does the 'A2' designation indicate?",
    options: [
      'Particle filtration class 2',
      'Assigned protection factor of 2',
      'Air flow rate of 2 litres per minute',
      'Type A gas filter with medium capacity (class 2)',
    ],
    correctAnswer: 3,
    explanation:
      "The 'A2' designation means it is a Type A gas filter (for organic vapours with boiling points above 65°C) with a class 2 (medium) capacity. Gas filter classes run from 1 (low capacity) to 3 (high capacity). The 'P3' indicates a class 3 particle filter providing the highest particle filtration efficiency.",
    category: 'Control Measures & PPE',
    difficulty: 'advanced',
  },
  {
    id: 152,
    question:
      'Why should aerosol-generating procedures (e.g., spray application of chemicals) receive special consideration in a COSHH assessment?',
    options: [
      'Aerosol generation increases the concentration of airborne particles and the risk of inhalation exposure',
      'Aerosol droplets are too large to be inhaled, so spray application presents no health risk',
      'Spray application uses less of the substance overall and so reduces exposure for everyone',
      'Aerosols can enter the body only through the skin, so gloves and overalls are sufficient',
    ],
    correctAnswer: 0,
    explanation:
      'Aerosol-generating procedures create fine droplets or particles that remain airborne for longer and penetrate deeper into the respiratory system than larger droplets. This significantly increases inhalation exposure risk. COSHH assessments must account for the method of use, and spray application typically requires higher-level controls such as LEV and RPE.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question:
      'What is the correct action if an employee notices their RPE filter is damaged or the facepiece is cracked?',
    options: [
      'Carry on using it until the end of the current task, then report it',
      'Stop using it immediately, leave the hazardous area, and obtain a replacement',
      'Apply tape over the crack and continue working in the same area',
      'Swap to a lower-rated filter so that the job can be finished',
    ],
    correctAnswer: 1,
    explanation:
      'Damaged RPE must be taken out of service immediately as it cannot provide adequate protection. The wearer should leave the contaminated area and obtain a replacement. Under COSHH Regulation 8(2), employees must report defects in control measures. Temporary repairs are not acceptable for RPE.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 154,
    question:
      'What is the purpose of engineering controls such as enclosed systems or glove boxes in COSHH compliance?',
    options: [
      'To make the substance easier and quicker to apply by hand',
      'To remove the need for any risk assessment of the substance',
      'To totally contain hazardous substances and prevent any release into the workplace atmosphere',
      'To allow the substance to be used without any further controls or PPE in any situation',
    ],
    correctAnswer: 2,
    explanation:
      'Enclosed systems and glove boxes provide total containment, preventing hazardous substances from being released into the workplace air. This is a high-level engineering control sitting above LEV in effectiveness, and is particularly important for highly toxic substances, carcinogens, and biological agents.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 155,
    question:
      "Under DSEAR, what are the three elements of the 'fire triangle' that must be controlled to prevent fire or explosion from dangerous substances?",
    options: [
      'Heat, light, and sound',
      'Fuel, water, and electricity',
      'Pressure, temperature, and volume',
      'Fuel, oxygen, and a source of ignition',
    ],
    correctAnswer: 3,
    explanation:
      'The fire triangle requires fuel (the dangerous substance), oxygen (from air or an oxidising agent), and a source of ignition (spark, flame, hot surface). DSEAR requires employers to control these elements — typically by eliminating or reducing fuel, controlling ignition sources, and in some cases, reducing oxygen through inerting.',
    category: 'Control Measures & PPE',
    difficulty: 'basic',
  },
  {
    id: 156,
    question:
      'An electrician needs to use a chemical with WEL of 5 ppm. Air monitoring shows exposure at 15 ppm. What minimum APF is needed for RPE selection?',
    options: [
      'APF 4 (FFP1)',
      'APF 3',
      'APF 2',
      'APF 10 (FFP2)',
    ],
    correctAnswer: 0,
    explanation:
      'The minimum APF needed is calculated by dividing the measured concentration by the WEL: 15 ÷ 5 = 3. You must then select RPE with an APF at or above this value. The next available standard APF is 4 (FFP1). However, good practice recommends selecting RPE with a higher APF to provide a safety margin, so FFP2 (APF 10) may be preferred.',
    category: 'Control Measures & PPE',
    difficulty: 'advanced',
  },
  {
    id: 157,
    question:
      "What is the employer's duty regarding PPE maintenance under the Personal Protective Equipment at Work Regulations 1992?",
    options: [
      'PPE only needs replacing once it has completely failed in use',
      'PPE must be maintained in an efficient state, in efficient working order, and in good repair',
      'PPE maintenance is the responsibility of each individual worker, not the employer',
      'PPE may be shared between workers without cleaning between uses',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 7 of the PPE at Work Regulations 1992 (as amended 2022) requires employers to ensure PPE is maintained in an efficient state, in efficient working order, and in good repair. This includes regular inspection, cleaning, storage in appropriate conditions, and replacement when necessary.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 158,
    question:
      'What type of eye protection is appropriate when handling corrosive chemicals such as battery acid?',
    options: [
      'Open-sided safety spectacles to EN 166 with side shields',
      'A tinted welding visor to EN 169 at shade 5 or above',
      'Chemical splash goggles to EN 166 with \'3\' marking for liquid droplets',
      'A face shield to EN 166 worn over ordinary prescription glasses',
    ],
    correctAnswer: 2,
    explanation:
      "Chemical splash goggles conforming to EN 166 with the '3' marking (protection against liquid droplets) are required when handling corrosive chemicals. Standard safety spectacles do not provide adequate protection against splashes as they do not seal against the face. A face shield may also be needed for larger splash risks.",
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 159,
    question:
      'What is the key requirement for chemical storage areas under COSHH with respect to ventilation?',
    options: [
      'The store must be kept completely sealed and airtight so that vapours cannot escape',
      'The store must be heated so that all chemicals are kept above freezing point',
      'No ventilation is needed provided every container is kept tightly closed',
      'Adequate ventilation must be provided to prevent accumulation of hazardous vapours or gases',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH requires that chemical storage areas have adequate ventilation to prevent the accumulation of hazardous vapours or gases, which could create health risks or explosive atmospheres. The type and rate of ventilation should be based on the substances stored, their volatility, and the quantities involved.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question:
      'When selecting gloves for protection against chemical hazards, what European standard should they conform to?',
    options: [
      'EN 374 (protection against chemicals and micro-organisms)',
      'EN 388 (protection against mechanical risks)',
      'EN 166 (personal eye protection)',
      'EN 149 (filtering facepiece respirators)',
    ],
    correctAnswer: 0,
    explanation:
      'Gloves for chemical protection must conform to EN 374, which specifies requirements for protection against chemicals and micro-organisms. The standard includes penetration testing, permeation testing (breakthrough time), and degradation testing. EN 388 covers mechanical risks (abrasion, cut, tear, puncture), which is a separate standard.',
    category: 'Control Measures & PPE',
    difficulty: 'intermediate',
  },
  // ===== MONITORING, SURVEILLANCE & EMERGENCIES — 40 questions (id 161-200) =====
  {
    id: 161,
    question: 'Under COSHH Regulation 10, when is workplace air monitoring required?',
    options: [
      'On every site, daily, whatever substances are in use and however small the quantity',
      'When the COSHH assessment identifies it as necessary to maintain adequate control or protect health',
      'After an employee has reported feeling unwell following work with a substance',
      'When an HSE inspector requests it, or when the supplier\'s data sheet recommends it',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH Regulation 10 requires exposure monitoring where the risk assessment identifies it as necessary to ensure adequate control of exposure or to protect the health of employees. Schedule 5 of COSHH lists substances and processes where monitoring is specifically required at defined intervals.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 162,
    question: 'What is the purpose of biological monitoring in the context of COSHH?',
    options: [
      'To measure the concentration of a substance in the workplace air over a shift',
      'To test how well a respirator facepiece seals against an individual\'s face',
      'To measure the level of a substance or its metabolite in a worker\'s body (e.g., blood, urine)',
      'To monitor the temperature and relative humidity of the working environment',
    ],
    correctAnswer: 2,
    explanation:
      'Biological monitoring measures the concentration of a hazardous substance or its metabolite in biological samples (blood, urine, exhaled air) from exposed workers. It provides an indication of total uptake from all routes of exposure (inhalation, skin absorption, ingestion) and is used alongside air monitoring.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 163,
    question: 'How long must employers keep records of COSHH exposure monitoring?',
    options: [
      '6 months from the date on which the monitoring was carried out',
      '1 year, after which they may be securely destroyed by the employer',
      '3 years for all monitoring records, whoever they relate to',
      '5 years (or 40 years for personal exposure records of identifiable employees)',
    ],
    correctAnswer: 3,
    explanation:
      'Under COSHH Regulation 10, monitoring records must be kept for at least 5 years. However, where records are representative of the personal exposure of identifiable employees, they must be kept for at least 40 years. This extended period reflects the long latency of some occupational diseases.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 164,
    question: 'Under COSHH Regulation 11, when is health surveillance required for employees?',
    options: [
      'When there is an identifiable disease or adverse health effect related to the exposure, and a valid technique exists to detect it',
      'For every employee on the site, whatever substances they are exposed to and whatever the level of that exposure',
      'For employees who have already developed a work-related illness, so that its progress can be tracked',
      'When an HSE inspector orders it during a site visit, or when the employee asks for it in writing',
    ],
    correctAnswer: 0,
    explanation:
      'Health surveillance is required under COSHH Regulation 11 where employees are exposed to substances linked to identifiable diseases or adverse health effects, there is a reasonable likelihood of the condition occurring, and valid techniques exist for detecting indications of the disease or effect.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'What is spirometry used to assess in occupational health surveillance?',
    options: [
      'The condition of the skin on the hands, wrists and forearms of the worker',
      'Lung function, specifically the volume and flow of air that can be inhaled and exhaled',
      'The level of a substance or its metabolite in a blood or urine sample',
      'The worker\'s hearing threshold across a range of sound frequencies',
    ],
    correctAnswer: 1,
    explanation:
      'Spirometry measures lung function by recording the volume and speed of air that a person can inhale and exhale. It is used in health surveillance for workers exposed to respiratory sensitisers, dusts, and fumes to detect early signs of conditions such as occupational asthma, COPD, or pneumoconiosis.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 166,
    question: 'What does FEV₁ measure in a spirometry test?',
    options: [
      'The total volume of air in the lungs',
      'The maximum pressure the lungs can generate',
      'The volume of air forcibly exhaled in the first one second',
      'The oxygen saturation of the blood',
    ],
    correctAnswer: 2,
    explanation:
      'FEV₁ (Forced Expiratory Volume in 1 second) is the volume of air that can be forcibly blown out in the first second of a forced exhalation after a full inspiration. A declining FEV₁ over time may indicate developing obstructive lung disease such as occupational asthma or COPD.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question:
      'What type of health surveillance is appropriate for workers regularly exposed to substances that can cause occupational dermatitis?',
    options: [
      'Spirometry and lung function testing',
      'Blood and urine biological monitoring',
      'Audiometry and hearing threshold testing',
      'Regular skin inspections and skin condition questionnaires',
    ],
    correctAnswer: 3,
    explanation:
      'Workers exposed to skin sensitisers or irritants should receive regular skin inspections, typically by a trained responsible person, supplemented by periodic examination by an occupational health professional. Early detection of skin changes allows intervention before irreversible sensitisation occurs.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 168,
    question:
      'How often should skin checks be carried out for workers exposed to substances that can cause dermatitis?',
    options: [
      'Before first exposure and then at regular intervals, typically every 1-6 months depending on risk',
      'Once at the start, when the worker first joins the company and is issued with gloves',
      'After the worker has already developed a skin complaint, and then monthly',
      'Once every ten years, in line with the general health check interval',
    ],
    correctAnswer: 0,
    explanation:
      'Skin checks should be carried out before first exposure to establish a baseline, and then at regular intervals depending on the level of risk. HSE guidance recommends monthly checks by a responsible person for higher-risk exposures, with referral to occupational health if any abnormalities are detected.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 169,
    question: 'What is the Biological Monitoring Guidance Value (BMGV) used for?',
    options: [
      'Setting the legal airborne concentration limit for a substance',
      'Providing a benchmark to help interpret biological monitoring results for groups of workers',
      'Defining the maximum quantity of a substance that may be stored on site',
      'Specifying the minimum protection factor required for respiratory equipment',
    ],
    correctAnswer: 1,
    explanation:
      'BMGVs are published by the HSE in EH40 and provide reference values to help interpret biological monitoring results. They represent the 90th percentile of results expected in a group of workers with adequate exposure control. Results consistently above the BMGV indicate that control measures may be inadequate.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'advanced',
  },
  {
    id: 170,
    question: 'Who is qualified to carry out statutory health surveillance under COSHH?',
    options: [
      'Any supervisor who has read the relevant safety data sheets and has completed COSHH awareness training',
      'The worker themselves, using a self-assessment questionnaire issued by the employer each year',
      'A doctor registered with the GMC, or a nurse qualified in occupational health, as appropriate to the surveillance required',
      'The substance supplier\'s technical representative during a routine site visit',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance under COSHH must be carried out by a suitable qualified person. For clinical examinations and medical assessments, this must be a registered medical practitioner (ideally with occupational medicine training) or an occupational health nurse. Trained responsible persons can carry out basic skin and lung function checks.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 171,
    question: 'How long must health surveillance records be kept under COSHH?',
    options: [
      '1 year from the date of the last entry',
      '5 years from the date of the last entry',
      '10 years from the date of the last entry',
      '40 years from the date of the last entry',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH Regulation 11(4) requires that individual health records be kept for at least 40 years from the date of the last entry. This long retention period reflects the fact that some occupational diseases (e.g., mesothelioma, bladder cancer) may not develop until decades after exposure.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 172,
    question:
      "What should happen if health surveillance identifies that an employee's health has been significantly harmed by exposure to a hazardous substance?",
    options: [
      'The employer must review the risk assessment, control measures, and consider moving the employee to non-exposed work',
      'The employer should keep the result confidential and take no further action beyond filing the record',
      'The employee should be signed off sick until the symptoms clear and then return to the same work',
      'The employer should issue higher-specification PPE and continue the work exactly as before',
    ],
    correctAnswer: 0,
    explanation:
      "If health surveillance reveals that an employee's health has been significantly affected, the employer must review and revise the COSHH assessment, improve control measures, consider moving the affected employee to alternative work without further exposure, and ensure other similarly exposed employees are also assessed.",
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question: 'What is the purpose of a personal air sampling pump used in exposure monitoring?',
    options: [
      'To pump fresh air into a confined space so that a safe breathing atmosphere is maintained during work',
      'To draw a measured volume of air through a filter or sorbent tube in the wearer\'s breathing zone to measure exposure',
      'To supply filtered air continuously to a powered respirator worn by the worker',
      'To extract contaminated air at source through a local exhaust ventilation hood',
    ],
    correctAnswer: 1,
    explanation:
      "A personal air sampling pump draws a calibrated flow of air through a collection medium (filter cassette or sorbent tube) positioned in the worker's breathing zone. After the sampling period, the collection medium is analysed in a laboratory to determine the airborne concentration of the hazardous substance.",
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'What does RIDDOR stand for?',
    options: [
      'Risk Identification and Dangerous Devices on Roads',
      'Regulation of Industrial Dust, Debris and Organic Residues',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Regional Investigation of Dangerous Demolition Operations Report',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR is the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. Under RIDDOR, employers must report certain work-related injuries, diseases (including occupational asthma, dermatitis, and certain cancers), and dangerous occurrences to the HSE.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 175,
    question:
      'Which of the following occupational diseases must be reported under RIDDOR when caused by workplace exposure?',
    options: [
      'A one-off headache from short-term solvent exposure',
      'Mild eye watering from working near airborne dust',
      'Temporary nausea after entering a poorly ventilated room',
      'Occupational asthma caused by a known respiratory sensitiser',
    ],
    correctAnswer: 3,
    explanation:
      'Occupational asthma, when caused by exposure to a known respiratory sensitiser at work and confirmed by a medical practitioner, is reportable under RIDDOR Schedule 2. Other RIDDOR-reportable diseases related to COSHH include occupational dermatitis, occupational cancer, and diseases from biological agents.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 176,
    question:
      'What is the correct first response if a colleague collapses after suspected exposure to a toxic gas in a confined space?',
    options: [
      'Do not enter; raise the alarm, call emergency services, and use rescue equipment if trained',
      'Enter immediately and drag the casualty out into fresh air as fast as possible',
      'Hold your breath, enter quickly and check the casualty\'s airway and breathing',
      'Wait outside until the casualty recovers before calling for assistance',
    ],
    correctAnswer: 0,
    explanation:
      'Never enter a confined space to rescue someone without proper equipment and training, as the same atmosphere that affected the casualty will affect rescuers. The correct response is to raise the alarm, call emergency services, and only attempt rescue using pre-planned procedures with appropriate RPE and rescue equipment.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 177,
    question:
      "What immediate first aid action should be taken if a corrosive chemical splashes into someone's eyes?",
    options: [
      'Rub the eye firmly to work the chemical out, then cover it with a sterile eye dressing',
      'Irrigate the eye immediately with clean water for at least 15-20 minutes, then seek medical attention',
      'Apply a neutralising chemical from the spill kit directly into the affected eye',
      'Keep the eye tightly shut and wait for the stinging to pass before working on',
    ],
    correctAnswer: 1,
    explanation:
      'The immediate priority for chemical eye splashes is copious irrigation with clean water for at least 15-20 minutes, holding the eyelids open. Do not attempt to neutralise chemicals in the eye. After initial irrigation, the casualty should receive urgent medical attention. Speed of irrigation is critical to minimising damage.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 178,
    question:
      'What information must be provided to emergency services when reporting a chemical incident?',
    options: [
      'The name and contact number of the person reporting and the company they work for',
      'The purchase cost of the substances spilled and the value of the stock lost',
      'The substance involved, quantity, location, number of casualties, and any SDS information available',
      'The time the incident was first noticed and the name of the site supervisor',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency services need detailed information including: the substance(s) involved and their hazards (from the SDS), approximate quantities, the nature of the incident (spill, fire, exposure), the location, number and condition of any casualties, and what actions have already been taken. Having SDS readily available is essential.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 179,
    question:
      'Under COSHH, what must employers have in place for dealing with accidents, incidents, and emergencies involving hazardous substances?',
    options: [
      'A signed waiver from each worker accepting the risks of the substances used',
      'A daily record of how much of each substance has been used on the site',
      'A list of every supplier from which the substances were purchased',
      'Emergency procedures including appropriate first aid, and warning and communication systems',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH Regulation 13 requires employers to establish procedures for dealing with accidents, incidents, and emergencies involving hazardous substances. This includes emergency response plans, availability of appropriate first aid, warning systems, communication arrangements, and ensuring only essential personnel enter affected areas.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 180,
    question:
      'What type of fire extinguisher should NOT be used on a fire involving flammable solvents in an electrical installation?',
    options: [
      'Water extinguisher',
      'Dry powder extinguisher',
      'CO₂ extinguisher',
      'Dielectric-tested foam extinguisher',
    ],
    correctAnswer: 0,
    explanation:
      'Water extinguishers must not be used on flammable liquid fires as they can spread the burning liquid, and they pose an electrical shock hazard near live equipment. CO₂ or dry powder extinguishers are suitable for both flammable liquids and electrical fires. Only use extinguishers you have been trained to operate.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 181,
    question:
      'How should a small chemical spill of a non-volatile, non-reactive liquid be managed on site?',
    options: [
      'Flush it down the nearest surface water drain using plenty of clean water from a hose',
      'Contain the spill, apply appropriate absorbent material from the spill kit, and dispose of waste correctly',
      'Leave it to evaporate naturally and carry on working in the same area',
      'Sweep it up dry with a stiff brush and put the sweepings into the general site waste bin',
    ],
    correctAnswer: 1,
    explanation:
      'Small spills should be contained using barriers or absorbent materials from the spill kit, wearing appropriate PPE as specified in the COSHH assessment. The absorbed material must be placed in suitable waste containers and disposed of as hazardous waste if required. Spills must never be washed into drains without authorisation.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 182,
    question: 'What is the purpose of the COSHH assessment review process?',
    options: [
      'To calculate the cost of replacing each hazardous substance on site with a safer alternative product each year',
      'To record which employees have used each substance, on what date and for how long',
      'To ensure the assessment remains valid, control measures are effective, and changes in substances or processes are captured',
      'To decide which suppliers should be used for future chemical purchases on the site',
    ],
    correctAnswer: 2,
    explanation:
      'COSHH Regulation 6 requires assessments to be reviewed regularly and whenever there is reason to believe the assessment is no longer valid (e.g., changes in substances, processes, control measures, or new health and safety information). The review ensures ongoing adequacy of controls and compliance.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question:
      'What training must be provided to employees who may be involved in spill response for hazardous substances?',
    options: [
      'Training in manual handling and safe lifting techniques for drums and kegs',
      'Training in fire warden duties, alarm raising and evacuation procedures',
      'Training in first aid resuscitation and the treatment of chemical burns',
      'Training in spill response procedures, use of spill kits, appropriate PPE, and waste disposal',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH Regulation 12 and Regulation 13 require that employees involved in emergency response, including spill response, receive adequate training. This must cover identification of hazards, use of spill containment equipment, selection and use of appropriate PPE, decontamination, and correct waste disposal procedures.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 184,
    question:
      'A direct-reading gas detector shows a reading of 80% LEL (Lower Explosive Limit) in a plant room. What action should be taken?',
    options: [
      'Evacuate the area immediately, prevent ignition sources, and ventilate before re-entry',
      'Continue working but silence the detector alarm until the task is complete',
      'Carry on working, since the evacuation threshold is 100% LEL rather than 80%',
      'Ventilate the room with a portable electric fan while the work continues',
    ],
    correctAnswer: 0,
    explanation:
      'A reading of 80% LEL means the atmosphere is dangerously close to being explosive. Immediate evacuation is required, all potential ignition sources must be eliminated, and the area must be thoroughly ventilated. Re-entry should only be permitted once gas levels have dropped to safe levels, typically below 10% LEL as a working limit.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question:
      'What is the purpose of continuous air monitoring using fixed gas detectors in areas where hazardous gases may accumulate?',
    options: [
      'To keep an automatic record of the names and entry times of everyone entering the monitored area',
      'To provide early warning of hazardous gas levels and trigger alarms before dangerous concentrations are reached',
      'To measure the temperature and relative humidity of the working environment',
      'To extract contaminated air from the area at source and discharge it outside',
    ],
    correctAnswer: 1,
    explanation:
      'Fixed gas detectors provide continuous monitoring and early warning through visual and audible alarms when gas concentrations exceed preset levels. They are essential in areas where toxic or flammable gases may accumulate, such as battery charging rooms, plant rooms, and confined spaces. Alarm levels are typically set well below WELs or LELs.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 186,
    question: 'What does the acronym TWA stand for in the context of workplace exposure limits?',
    options: [
      'Total Work Assessment',
      'Toxic Waste Analysis',
      'Time-Weighted Average',
      'Temporary Working Area',
    ],
    correctAnswer: 2,
    explanation:
      'TWA stands for Time-Weighted Average, which is the average airborne concentration of a substance over a specified time period, typically 8 hours (the standard working shift). The 8-hour TWA WEL takes into account the variation in exposure levels throughout the working day.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 187,
    question:
      'What type of detector tube (Draeger tube) measurement is considered in occupational hygiene?',
    options: [
      'A continuous 8-hour time weighted average measurement of airborne dust',
      'A laboratory analysis of a blood or urine sample taken from the worker',
      'A long-term fixed measurement that triggers an automatic alarm on rising',
      'A spot or short-term measurement giving an approximate indication of gas concentration',
    ],
    correctAnswer: 3,
    explanation:
      'Detector tubes (such as Draeger tubes) provide a quick, approximate indication of airborne gas or vapour concentration at a specific point in time. A known volume of air is drawn through the tube and a colour change indicates the concentration. They are useful for screening but are less accurate than laboratory analysis of collected samples.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 188,
    question:
      'Under COSHH, what must happen if monitoring reveals that a workplace exposure limit has been exceeded?',
    options: [
      'The employer must identify and implement additional control measures immediately to reduce exposure below the WEL',
      'The employer may continue the work unchanged, as a WEL is an advisory figure rather than a limit',
      'The employer should repeat the monitoring on a quieter day until a lower reading is obtained',
      'The employer must stop all work across the whole site and report to the HSE within 12 months',
    ],
    correctAnswer: 0,
    explanation:
      'If monitoring shows that a WEL has been exceeded, the employer must take immediate steps to reduce exposure below the limit. This may include improving engineering controls, changing work practices, providing additional RPE as a short-term measure, and investigating the cause of the exceedance. The situation must be re-monitored to confirm compliance.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'What is occupational hygiene?',
    options: [
      'The legal duty on employers to provide protective equipment free of charge',
      'The science of anticipating, recognising, evaluating, and controlling workplace health hazards',
      'The branch of medicine that treats injuries caused by electric shock at work',
      'The system of cleaning and sterilising hand tools between jobs on site',
    ],
    correctAnswer: 1,
    explanation:
      "Occupational hygiene is the discipline of anticipating, recognising, evaluating, and controlling health hazards in the working environment. It encompasses exposure assessment (air monitoring, biological monitoring), risk evaluation, and recommendations for control measures to protect workers' health.",
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 190,
    question:
      'What action should an electrician take if they develop a persistent skin rash that they suspect is related to a substance used at work?',
    options: [
      'Carry on working and see whether it clears up over the next few weeks',
      'Apply a stronger hand cleaner to strip the residue off the skin',
      'Report it to their employer and seek occupational health assessment',
      'Switch to a different brand of the same substance without reporting it',
    ],
    correctAnswer: 2,
    explanation:
      'Any suspected work-related skin condition should be reported to the employer immediately so that the COSHH assessment can be reviewed and appropriate action taken. Early referral to occupational health is important because early-stage contact dermatitis may be reversible, but delayed treatment can lead to chronic sensitisation.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 191,
    question: 'What is the significance of a peak flow diary in occupational asthma surveillance?',
    options: [
      'It records the concentration of respirable dust measured in the workplace air at the start of each shift',
      'It logs which respirator filters the worker has fitted and changed on each shift',
      'It measures the worker\'s body temperature and pulse before and after each shift',
      'Serial peak flow measurements can reveal work-related patterns showing reduced lung function during work periods',
    ],
    correctAnswer: 3,
    explanation:
      'A peak flow diary involves the worker recording peak expiratory flow readings several times daily over several weeks, both at work and away from work. A pattern of reduced readings during work periods with improvement during rest days or holidays is characteristic of occupational asthma.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'advanced',
  },
  {
    id: 192,
    question: 'How should contaminated clothing be handled after a chemical splash incident?',
    options: [
      'Remove the clothing carefully, avoiding further skin contact, and follow decontamination procedures in the COSHH assessment',
      'Leave the contaminated clothing on but cover the affected area with a disposable coverall until the shift ends',
      'Brush the contamination off the clothing where you stand and carry on working',
      'Take the clothing home at the end of the shift and wash it with the normal family laundry',
    ],
    correctAnswer: 0,
    explanation:
      'Contaminated clothing should be carefully removed to minimise further skin contact, using gloves if necessary. The affected skin should be washed thoroughly with water and mild soap. Contaminated clothing should be handled as per the COSHH assessment and SDS — it may need to be disposed of as contaminated waste rather than laundered.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question:
      'Under COSHH Regulation 13, what must be available in areas where employees may be exposed to hazardous substances?',
    options: [
      'A copy of every employee\'s personal exposure monitoring record',
      'Suitable first aid facilities and arrangements, including trained first aiders',
      'A daily log of the quantity of each substance used',
      'A notice listing the price and supplier of each chemical',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH Regulation 13 requires employers to ensure that appropriate first aid facilities and trained personnel are available in areas where hazardous substance exposure may occur. This includes emergency eyewash stations, emergency showers where corrosive substances are used, and first aid equipment specific to the hazards present.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 194,
    question: 'What is the recommended minimum flow duration for an emergency eyewash station?',
    options: [
      'At least 30 seconds of continuous flow',
      'At least 2 minutes of continuous flow',
      'At least 15 minutes of continuous flow',
      'At least 60 minutes of continuous flow',
    ],
    correctAnswer: 2,
    explanation:
      "Emergency eyewash stations should be capable of providing at least 15 minutes of continuous flushing to ensure adequate decontamination of the eyes following a chemical splash. They should deliver tepid water at a controlled flow rate and must be within 10 seconds' travel distance from the hazard area.",
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 195,
    question: 'What record-keeping is required for COSHH training provided to employees?',
    options: [
      'A record of the total number of staff employed at the site and the job title held by each of them',
      'The cost of delivering each training course and the invoice from the provider',
      'No formal records are needed, as toolbox talks count as informal training',
      'Records of who was trained, what training was given, when it was delivered, and when refresher training is due',
    ],
    correctAnswer: 3,
    explanation:
      "Employers must keep records of COSHH training including the names of attendees, the content and date of training, the trainer's details, and when refresher training is due. These records demonstrate compliance with COSHH Regulation 12 and are essential evidence during HSE inspections or investigations.",
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: "What is the HSE's enforcement expectation regarding COSHH training frequency?",
    options: [
      'Regular refresher training should be provided, with frequency based on risk level, typically annually for higher-risk activities',
      'Training is a one-off event delivered at induction, which never needs to be repeated during a worker\'s employment',
      'Refresher training is needed only once every twenty years, in line with record retention',
      'Refresher training is required only after an accident or a case of ill health has occurred',
    ],
    correctAnswer: 0,
    explanation:
      'While COSHH does not specify exact refresher intervals, the HSE expects training to be repeated at regular intervals appropriate to the level of risk. For higher-risk activities, annual refresher training is typically expected. Training should also be updated whenever there are significant changes to substances, processes, or control measures.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question:
      'What must be included in a COSHH emergency plan for a site using large quantities of flammable solvents?',
    options: [
      'A full inventory of every solvent held on site, showing its price, supplier, delivery date and the storage location of each individual container',
      'Identification of foreseeable emergencies, procedures for spill containment, fire response, evacuation routes, communication systems, and roles/responsibilities',
      'A record of every worker\'s home address, next of kin details and personal telephone number, kept at the site office',
      'A schedule showing when each solvent container was last refilled, by whom, and the quantity added',
    ],
    correctAnswer: 1,
    explanation:
      'A COSHH emergency plan must identify foreseeable emergencies (spills, fires, explosions, toxic releases), specify response procedures for each scenario, define roles and responsibilities, establish communication and alarm systems, identify evacuation routes and assembly points, and detail the spill containment and firefighting equipment available.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'advanced',
  },
  {
    id: 198,
    question:
      "What is the role of a 'responsible person' in COSHH health surveillance for skin checks?",
    options: [
      'To diagnose skin diseases and prescribe the medical treatment needed by the affected workers',
      'To carry out detailed clinical examinations and arrange biological monitoring samples',
      'To carry out routine visual skin inspections and questionnaires, and refer any concerns to occupational health',
      'To approve which substances may be brought on to site and used in the workplace',
    ],
    correctAnswer: 2,
    explanation:
      "A 'responsible person' in COSHH health surveillance is trained (but not necessarily medically qualified) to carry out routine skin inspections, administer simple questionnaires, and identify early signs of skin problems. They must refer any concerns to an occupational health professional for further assessment. They do not diagnose or treat conditions.",
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'advanced',
  },
  {
    id: 199,
    question: 'What is the purpose of a COSHH assessment register or inventory?',
    options: [
      'To record the names of every worker who has attended COSHH training, the date they attended and when refreshers fall due',
      'To list the prices and suppliers of all the chemicals bought for use on the site',
      'To log the daily air monitoring results recorded for each separate work area',
      'To maintain a comprehensive list of all hazardous substances used or generated in the workplace, linked to their assessments and SDSs',
    ],
    correctAnswer: 3,
    explanation:
      'A COSHH register or inventory provides a central record of all hazardous substances present in the workplace, cross-referenced to their safety data sheets and COSHH assessments. It enables employers to maintain oversight of chemical hazards, ensure all substances are assessed, and quickly access safety information in an emergency.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 200,
    question:
      "Under COSHH, what is the employer's duty regarding employees who transfer to work involving exposure to a new hazardous substance?",
    options: [
      'Provide specific information, instruction, and training on the new substance and its controls before exposure begins',
      'Allow the employee to start the new work and provide the training within their first month on the job',
      'Assume the existing general COSHH training already covers all new substances',
      'Issue the safety data sheet for the new substance and give no further instruction',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH Regulation 12 requires that information, instruction, and training are specific to the hazardous substances employees are exposed to. When an employee transfers to work involving new substances, they must receive specific training on those substances, their risks, and the required control measures before exposure begins.',
    category: 'Monitoring, Surveillance & Emergencies',
    difficulty: 'basic',
  },
  {
    id: 201,
    question: 'What do the COSHH Regulations 2002 require an employer to do about hazardous substances at work?',
    options: [
      'Prevent exposure, or where that is not reasonably practicable, control it adequately',
      'Issue every worker with a dust mask before any work with substances begins',
      'Remove all substances carrying a danger label from the workplace completely',
      'Record the substances in a register and review that register once a year',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH places the duty in two stages: prevent exposure first, and only where prevention is not reasonably practicable, control it adequately. Handing out masks is the attractive wrong answer because it feels like action, but respiratory protection sits at the bottom of the control order and does nothing to prevent the substance being released in the first place.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'COSHH 2002',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 202,
    question: 'A COSHH assessment must take account of all routes of exposure. Which set lists the recognised routes?',
    options: [
      'Inhalation and swallowing, because intact skin blocks substances',
      'Skin contact and the eyes, because the lungs filter out any dust',
      'Inhalation, skin contact, swallowing, the eyes and skin puncture',
      'Swallowing and skin puncture, the two routes named in the rules',
    ],
    correctAnswer: 2,
    explanation:
      'HSE guidance lists breathing in, contact with the skin, swallowing, contact with the eyes and skin puncture. The first option is the tempting one because inhalation really is the commonest route on site, but skin is not a barrier: some substances damage the skin and others pass straight through it and harm organs elsewhere in the body.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Routes of Exposure',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 203,
    question: 'On a rewire in an old house, which everyday activity is most likely to create a COSHH exposure?',
    options: [
      'Coiling cable off a drum onto the floor of the room being wired',
      'Chasing and drilling masonry walls, which releases a fine dust',
      'Tightening terminals in the consumer unit with a screwdriver',
      'Labelling the circuits at the board once the wiring is finished',
    ],
    correctAnswer: 1,
    explanation:
      'Stone and concrete dust can cause lung disease such as silicosis, and crystalline silica is often present in minerals that would otherwise present little hazard. Chasing and drilling is therefore the exposure most electricians actually meet. The other tasks are physically demanding or fiddly, but none of them puts an airborne contaminant into your breathing zone.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Dust Control',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 204,
    question: 'HSE guidance says which parts of a safety data sheet tell you what the dangers of a product are?',
    options: [
      'Sections 2 and 16 of the sheet',
      'Sections 4 to 8 of the sheet',
      'Sections 9 and 10 of the sheet',
      'Sections 12 to 15 of the sheet',
    ],
    correctAnswer: 0,
    explanation:
      'HSE advice on reading a data sheet is to concentrate on Sections 2 and 16, which set out what the dangers are. Sections 4 to 8 are the attractive wrong answer because they are genuinely useful, but they deal with emergencies, storage and handling rather than telling you what harm the product can do.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Safety Data Sheets',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 205,
    question: 'A tin of jointing compound arrives on site carrying a danger label but with no safety data sheet. What should you do?',
    options: [
      'Use it carefully outdoors, because a danger label is warning enough',
      'Ask the supplier for the sheet, which they must provide by law',
      'Bin the product and buy the same thing from a different merchant',
      'Write your own sheet from the label wording and file it on site',
    ],
    correctAnswer: 1,
    explanation:
      'Where a product is dangerous for supply the supplier must by law provide a safety data sheet, so the sheet is yours to demand rather than something to work around. Using it outdoors is the attractive wrong answer because ventilation is a real control, but you cannot decide whether outdoor use is enough until you know the hazards and the handling advice the sheet carries.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Safety Data Sheets',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 206,
    question: 'Compared with the older European hazard symbols, what must you do to read the current international symbols correctly?',
    options: [
      'Read the hazard statement on the packaging, as no single word is given',
      'Count the symbols, because more symbols always means a greater risk',
      'Check the colour of the border, which grades the hazard by severity',
      'Match the symbol shape to a code held in Section 1 of the data sheet',
    ],
    correctAnswer: 0,
    explanation:
      'The international symbols that replaced the European ones look similar in places, but they carry no single word describing the hazard, so you must read the hazard statement on the packaging and the supplier data sheet. Counting symbols is the plausible trap: the number of symbols reflects how many different hazards apply, not how severe any of them is.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Hazard Labelling',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 207,
    question: 'An electrician says COSHH does not apply to their work because they buy no chemicals. Why is that wrong?',
    options: [
      'COSHH applies to all trades regardless of what substances are used',
      'Substances are also generated by the work, such as dust and fume',
      'COSHH covers electric shock as well as substances used in the work',
      'An employer must assess every trade whether substances exist or not',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous substances include those generated during work activities, such as fume from soldering and welding and dust from cutting, not just products bought in a tin. The first option is the near miss: COSHH is not triggered simply by being a trade, it is triggered by the presence of a substance hazardous to health, however that substance arises.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Hazardous Substances',
    category: 'Hazardous Substances on Site',
  },
  {
    id: 208,
    question: 'COSHH sets out protection measures in an order of priority where exposure cannot be prevented. What is that order?',
    options: [
      'Protective equipment first, then control at source, then redesign',
      'Control at source, then protective equipment, then process redesign',
      'Process and engineering controls, then control at source, then kit',
      'Training, then supervision, then engineering controls, then masks',
    ],
    correctAnswer: 2,
    explanation:
      'The regulation lists the design and use of appropriate work processes, systems and engineering controls first, then control of exposure at source including ventilation and organisational measures, and only then personal protective equipment. Putting control at source first is the near miss: extraction is powerful, but a process designed to release less in the first place beats capturing it afterwards.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Control Hierarchy',
    category: 'Control Measures & PPE',
  },
  {
    id: 209,
    question: 'Under COSHH, when may personal protective equipment be relied on as part of the control of exposure?',
    options: [
      'When other measures cannot achieve adequate control, and then as well as them',
      'When the workers involved would rather wear it than change how they work',
      'When the job is short enough that engineering controls are not worthwhile',
      'When the substance has no workplace exposure limit approved for it by HSE',
    ],
    correctAnswer: 0,
    explanation:
      'Protective equipment is permitted where adequate control cannot reasonably be achieved by other measures alone, and then only in addition to those measures, never instead of them. The short job argument is the seductive one: duration affects how much exposure occurs, but it does not turn protective equipment into a substitute for controlling the source.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Control Hierarchy',
    category: 'Control Measures & PPE',
  },
  {
    id: 210,
    question: 'COSHH requires prevention of exposure to be attempted first. Which action does it name as the preferred way to prevent it?',
    options: [
      'Fitting extraction at the point where the substance is released',
      'Substituting a substance or process that removes or cuts the risk',
      'Reducing the number of people present while the substance is used',
      'Issuing respirators to everyone who works in the affected area',
    ],
    correctAnswer: 1,
    explanation:
      'Substitution is named as the preferred route to prevention: replace the substance or the process with one that, in the conditions of its use, eliminates or reduces the risk. Extraction is the attractive wrong answer because it is highly effective, but it is a control measure applied once you have accepted that the substance will still be released.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Substitution',
    category: 'Control Measures & PPE',
  },
  {
    id: 211,
    question: 'A principle of good practice requires exposure to be controlled by measures that are proportionate. Proportionate to what?',
    options: [
      'To the cost of the job and the margin left in the price agreed',
      'To the number of workers who happen to be on site that morning',
      'To the time the task takes compared with the rest of the work',
      'To the health risk the substance and the task actually present',
    ],
    correctAnswer: 3,
    explanation:
      'The principles of good practice require control by measures proportionate to the health risk, so a light task with a mild substance does not need the controls a heavy task with a harmful one demands. Headcount is the plausible distractor: reducing the number of people exposed is a separate requirement, but it is not the yardstick against which the strength of a control is judged.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Control Hierarchy',
    category: 'Control Measures & PPE',
  },
  {
    id: 212,
    question: 'Extraction is proposed for a task in a cramped riser, but the ducting would block the only escape route. What do the principles require?',
    options: [
      'Fit the extraction anyway, because COSHH duties override escape',
      'Choose a control that does not raise the overall risk to safety',
      'Fit it and post a person at the riser entry to warn of any fire',
      'Drop all controls here and record the task as a short duration',
    ],
    correctAnswer: 1,
    explanation:
      'One of the principles of good practice is that the introduction of control measures must not increase the overall risk to health and safety, so a control that seals an escape route has to be redesigned or replaced. Posting a watcher is the tempting answer because it feels like mitigation, but it leaves the blocked route in place and adds a person who must also get out.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Control Hierarchy',
    category: 'Control Measures & PPE',
  },
  {
    id: 213,
    question: 'When must a COSHH risk assessment be recorded in writing?',
    options: [
      'Where the employer has five or more employees on the books',
      'Where any substance carries a hazard symbol on its packaging',
      'Where the work will last for more than one full working day',
      'Where the client has asked to see the paperwork in advance',
    ],
    correctAnswer: 0,
    explanation:
      'The duty to record the assessment bites at five or more employees, although HSE advises smaller firms to write down the steps taken anyway. The hazard symbol option is the trap: a danger label is what tells you an assessment is needed at all, but it has nothing to do with whether that assessment must be written down.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 214,
    question: 'HSE says a COSHH assessment is not a paper exercise. What must you establish before deciding whether to reduce exposure?',
    options: [
      'The purchase price of each product and the size of the containers',
      'How the workers are exposed and how much they are exposed to',
      'Whether the client has any objection to the controls being used',
      'The number of similar jobs the firm has completed without harm',
    ],
    correctAnswer: 1,
    explanation:
      'You need to know how workers are exposed and to how much before you can judge whether anything must change, which is why the assessment starts with the task rather than the form. Past jobs without harm is the attractive distractor, but some diseases take years to appear, so an unblemished history is no evidence that current exposure is acceptable.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 215,
    question: 'Why can clean up and disposal carry a higher risk than the task that used the substance?',
    options: [
      'Because the substance is handled openly and can be breathed or touched',
      'Because the substance becomes chemically more toxic once it is waste',
      'Because clean up is usually given to an apprentice rather than a mate',
      'Because waste falls outside COSHH and needs no assessment of its own',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance points out that a task using a small, well contained quantity can be low risk while the clean up and disposal that follows is higher, because the material is then handled in the open where it can be breathed in or land on skin. Increased toxicity is the plausible trap: the substance has not changed, only the way it is being handled.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 216,
    question: 'When assessing risk for electricians doing maintenance work, what extra factor does the guidance say must be taken into account?',
    options: [
      'The average length of service of the maintenance team involved',
      'The rate at which the client replaces the substances being used',
      'Foreseeable deterioration or failure of any control measure fitted',
      'The proportion of the work done inside rather than outside hours',
    ],
    correctAnswer: 2,
    explanation:
      'Maintenance workers can be exposed more than production workers, so the assessment must allow for the type of work and for any reasonably foreseeable deterioration or failure of the controls provided. Length of service is the attractive answer because experience does affect behaviour, but a seasoned electrician breathes the same contaminant when an extraction system quietly stops working.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 217,
    question: 'A COSHH assessment must consider groups who may be at increased risk. Which group does the guidance specifically name?',
    options: [
      'Electricians who have worked with the substance for many years',
      'Inexperienced trainees and young people under eighteen years old',
      'Operatives employed through an agency rather than taken on direct',
      'Anyone who works alone for part of the day on the same premises',
    ],
    correctAnswer: 1,
    explanation:
      'The guidance names inexperienced trainees and young people under eighteen, alongside pregnant workers and disabled workers, as groups needing particular protection. Agency workers is the near miss: they are certainly owed protection, but their vulnerability comes from unfamiliarity with the site rather than from being listed as an at risk group.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 218,
    question: 'Can a COSHH assessment be combined with the general risk assessment a firm already carries out?',
    options: [
      'Yes, provided each assessment remains suitable and sufficient',
      'No, COSHH assessments must always be kept as separate documents',
      'Yes, but only for substances that carry no hazard symbol at all',
      'No, unless the enforcing authority has agreed to it in writing',
    ],
    correctAnswer: 0,
    explanation:
      'A COSHH assessment may be made as part of the general risk assessment duty, and may also be combined with a dangerous substances assessment, so long as every assessment is still suitable and sufficient for its own regulations. Insisting on separate documents is the common misconception; the law cares about the quality of the assessment, not the number of files.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 219,
    question: 'A task exposes an electrician to a solvent cleaner and to masonry dust in the same shift. What does COSHH require of the assessment?',
    options: [
      'Assess only the substance judged to present the greater hazard',
      'Consider the enhanced effects of combined or sequential exposure',
      'Split the shift so each substance is met in a separate half day',
      'Apply the controls listed on whichever data sheet is the newer',
    ],
    correctAnswer: 1,
    explanation:
      'Where an activity exposes people to more than one hazardous substance the employer must consider the possible enhanced effects of combined or sequential exposure, since two agents together can do more harm than either alone. Assessing only the worse substance is the shortcut that misses this, because the interaction is a property of the pair, not of the stronger one.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 220,
    question: 'What does the guidance say about employees when new control measures are planned as a result of a COSHH assessment?',
    options: [
      'They should be told the outcome only once the measures are in place',
      'They must be consulted on measures that affect their health and safety',
      'They may be consulted where the employer has more than five employees',
      'They should be asked to sign the assessment to confirm they accept it',
    ],
    correctAnswer: 1,
    explanation:
      'Employees or their safety representatives must be consulted on measures that may substantially affect their health and safety, and involving them also produces controls that fit how the work is really done. Signing the assessment is the attractive wrong answer: a signature records that someone read a document, whereas consultation means their views can still change the plan.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'COSHH Assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 221,
    question: 'How often must local exhaust ventilation used to control exposure be thoroughly examined and tested?',
    options: [
      'At least once every six months by the person who operates it',
      'At least once every twelve months by an insurance inspector',
      'At least once every two years by the installing contractor',
      'At least once every fourteen months by a competent person',
    ],
    correctAnswer: 3,
    explanation:
      'Extraction used to control exposure must be thoroughly examined and tested at least once every fourteen months, and more often for certain processes listed in COSHH, by someone competent to do it. The twelve month answer is the near miss because so many other statutory checks run annually, but the interval set for extraction is fourteen months, not twelve.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Local Exhaust Ventilation',
    category: 'Control Measures & PPE',
  },
  {
    id: 222,
    question: 'What sort of check does guidance expect the operator or supervisor to make on an extraction system each day?',
    options: [
      'A full airflow measurement at every hood using calibrated gear',
      'That it is switched on and the airflow indicator reads correctly',
      'A strip down of the fan casing to look for dust on the blades',
      'A written report to the enforcing authority on its performance',
    ],
    correctAnswer: 1,
    explanation:
      'The user manual for control equipment should set out simple daily checks, typically that the system is running and the airflow indicator gives the right reading, with deeper checks weekly or monthly. A full calibrated airflow survey is the attractive answer because it is more rigorous, but a check nobody can do quickly is a check that will not get done.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Local Exhaust Ventilation',
    category: 'Control Measures & PPE',
  },
  {
    id: 223,
    question: 'Dust is settling on surfaces where it never used to. Which set of causes should be suspected in the extraction system?',
    options: [
      'Blocked filters, damaged ducting or unauthorised alterations to it',
      'A rise in the room temperature caused by the fan motor running',
      'A change in the brand of the substance being used at the bench',
      'The operators standing further from the hood than they used to',
    ],
    correctAnswer: 0,
    explanation:
      'Dust appearing where it is not expected is a classic sign of a failing extraction system, and the usual causes are blocked filters, damaged ducting, poor fan performance or someone extending the system without authority. Operator position is the plausible distractor: it does affect capture, but it would not normally cause dust to spread to areas that were previously clean.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Local Exhaust Ventilation',
    category: 'Control Measures & PPE',
  },
  {
    id: 224,
    question: 'Respiratory protective equipment must be matched to four things before it is issued. Which list is correct?',
    options: [
      'The job, the shift pattern, the employer policy and the price paid',
      'The job, the environment, the maximum exposure and the wearer',
      'The substance, the season, the site rules and the training given',
      'The task, the client, the supplier contract and the storage space',
    ],
    correctAnswer: 1,
    explanation:
      'Guidance requires respiratory protection to be matched to the job, the environment, the anticipated maximum exposure and the wearer, allowing for facial hair and spectacles. Training appears in the third option and is genuinely required, but training is something you add after selection; it cannot make a wrongly chosen mask protect the person wearing it.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'RPE',
    category: 'Control Measures & PPE',
  },
  {
    id: 225,
    question: 'Which respiratory protective equipment must be face fit tested before it is relied on to control exposure?',
    options: [
      'Every type of respirator, including powered hoods and visors',
      'Only equipment used for more than one hour at a time on site',
      'Tight fitting facepieces such as disposable, half and full masks',
      'Any respirator issued to an operative who has worn one before',
    ],
    correctAnswer: 2,
    explanation:
      'Tight fitting facepieces, which includes disposable masks as well as half and full masks, rely on a seal against the skin and so must be fit tested by a competent person. Loose fitting powered hoods and visors are the trap in the first option: they still have to fit observably close to the face, but they are not fit tested.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Face Fit Testing',
    category: 'Control Measures & PPE',
  },
  {
    id: 226,
    question: 'An electrician passed a face fit test two years ago and has since lost a lot of weight. What does the guidance require?',
    options: [
      'Nothing, because a fit test result stays valid for the same person',
      'A repeat fit test, as facial changes can destroy the seal achieved',
      'A move to a larger facepiece chosen by eye from the same range',
      'A doctor to confirm the person is still fit to wear a respirator',
    ],
    correctAnswer: 1,
    explanation:
      'Fit testing must be repeated when the model or size of facepiece changes, or when the facial characteristics of the wearer change significantly, for example through weight loss, weight gain or dental work. Choosing a bigger mask by eye is the tempting practical fix, but a fit test exists precisely because a seal cannot be judged by looking at it.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Face Fit Testing',
    category: 'Control Measures & PPE',
  },
  {
    id: 227,
    question: 'Why does the guidance require wearers of tight fitting masks to be clean shaven in the area of the face seal?',
    options: [
      'Because stubble breaks the seal so contaminated air leaks inward',
      'Because facial hair makes the filter media clog far more quickly',
      'Because a beard prevents the straps being tightened far enough',
      'Because hair traps the substance and carries it home on clothing',
    ],
    correctAnswer: 0,
    explanation:
      'A tight fitting mask works only if it seals to skin, so hair across the seal lets contaminated air bypass the filter and reach the lungs. Clogging the filter is the plausible sounding alternative, but a clogged filter makes breathing harder and is obvious to the wearer, whereas a broken seal gives no warning at all.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'RPE',
    category: 'Control Measures & PPE',
  },
  {
    id: 228,
    question: 'A supervisor says the dust problem is solved because everyone on the job now has a mask. What is the correct response?',
    options: [
      'Agree, provided the masks carry the right marking and are worn',
      'Agree, as long as a fit test has been recorded for each wearer',
      'Ask for a written procedure covering how masks are stored on site',
      'Control the source first, after which masks may not be needed',
    ],
    correctAnswer: 3,
    explanation:
      'HSE deals with this belief directly: handing out masks does not solve the problem, because controlling the source of exposure may remove the need for masks altogether. Requiring fit tests is the strongest distractor, since fit testing is a real duty, but it only improves how well the last line of defence performs and leaves the dust being made.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Control Hierarchy',
    category: 'Control Measures & PPE',
  },
  {
    id: 229,
    question: 'Why does COSHH treat washing facilities as part of the control of exposure rather than a welfare extra?',
    options: [
      'They reduce ingestion and stop contamination spreading further',
      'They allow a supervisor to check that hands have been inspected',
      'They let the substance be diluted before it is poured to a drain',
      'They remove the need to wear gloves for short handling tasks',
    ],
    correctAnswer: 0,
    explanation:
      'Hygiene measures are listed as control measures because people transfer substances from hands to mouth when they eat or smoke, and contamination spreads from skin to surfaces and clothing. Dilution to drain is the trap: washing facilities are for people, and using them as a disposal route creates a fresh environmental problem.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Hygiene',
    category: 'Control Measures & PPE',
  },
  {
    id: 230,
    question: 'An electrician finds that the extraction unit provided for a task is damaged. What does COSHH require of the employee?',
    options: [
      'Repair it if competent, otherwise carry on using a mask instead',
      'Report the defect to the employer without delay and use controls',
      'Record it in the site diary and raise it at the next toolbox talk',
      'Stop all work on the site until a written report has been issued',
    ],
    correctAnswer: 1,
    explanation:
      'Employees must make full and proper use of the control measures provided and report any defect they discover to the employer straight away, so the fault has to be raised now rather than logged for later. Waiting for a toolbox talk is the plausible answer because it does create a record, but it leaves people exposed in the meantime.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Employee Duties',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 231,
    question: 'What is the status of a workplace exposure limit approved for a substance under COSHH?',
    options: [
      'It is a target that should be met where it is convenient to do so',
      'It is a level below which no health surveillance is ever needed',
      'It must not be exceeded for control to be treated as adequate',
      'It applies to substances used indoors in enclosed spaces alone',
    ],
    correctAnswer: 2,
    explanation:
      'Control of exposure is only treated as adequate if the principles of good practice are applied and any approved workplace exposure limit is not exceeded, so the limit is a ceiling rather than an aspiration. The health surveillance option is the trap: surveillance is triggered by the nature of the substance and the availability of a valid test, not by sitting under a limit.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Exposure Monitoring',
    category: 'Control Measures & PPE',
  },
  {
    id: 232,
    question: 'A firm wants to start air monitoring before any control measures are fitted. Why is that poor practice?',
    options: [
      'Because monitoring results are only valid if a doctor supervises',
      'Because air sampling is not recognised as monitoring under COSHH',
      'Because the results cannot be recorded until controls are working',
      'Because monitoring before controls exist wastes time and money',
    ],
    correctAnswer: 3,
    explanation:
      'HSE describes monitoring before any controls are in place as wasteful, because you already know the exposure is uncontrolled and the number will not change what you do next, which is to fit controls. The recording answer is the plausible one, but there is nothing stopping a result being recorded; the problem is that the result has no use.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Exposure Monitoring',
    category: 'Control Measures & PPE',
  },
  {
    id: 233,
    question: 'Under COSHH, what determines whether exposure at the workplace must be monitored?',
    options: [
      'The size of the employer, measured by the number of employees',
      'Whether any of the substances in use carry a hazard pictogram',
      'Whether the risk assessment indicates that monitoring is needed',
      'Whether the enforcing authority has served an improvement notice',
    ],
    correctAnswer: 2,
    explanation:
      'Monitoring is required where the risk assessment shows it is needed to maintain adequate control or is otherwise needed to protect health, so the assessment is what triggers it. The hazard pictogram answer is attractive because a symbol does force you to assess, but plenty of labelled products are used in ways that never call for air sampling.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Exposure Monitoring',
    category: 'Control Measures & PPE',
  },
  {
    id: 234,
    question: 'A health record is made for an employee placed under health surveillance. How long must that record be kept?',
    options: [
      'For at least five years from the date of the last entry made',
      'For at least ten years from the date of the last entry made',
      'For at least twenty years from the date of the last entry',
      'For at least forty years from the date of the last entry',
    ],
    correctAnswer: 3,
    explanation:
      'Health records must be kept available in a suitable form for at least forty years from the date of the last entry, because occupational disease can appear decades after the exposure that caused it. Five years is the tempting answer since several other health and safety records run to about that period, but it is far too short to be any use in a disease claim.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Records',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 235,
    question: 'Apart from the listed substances and processes, when is health surveillance treated as appropriate under COSHH?',
    options: [
      'When the employee asks for it and the employer agrees to fund it',
      'When the exposure has continued for more than five years in total',
      'When a disease may be linked, is likely, and can be validly detected',
      'When the substance has no workplace exposure limit published for it',
    ],
    correctAnswer: 2,
    explanation:
      'Surveillance is appropriate where an identifiable disease or adverse health effect may be related to the exposure, is reasonably likely under the conditions of the work, and there is a valid low risk technique for detecting it. All three limbs must hold, which is why length of exposure alone, the seductive answer, does not by itself trigger surveillance.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Health Surveillance',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 236,
    question: 'Where an employee is exposed to a substance and process listed in the COSHH medical surveillance schedule, how often must that surveillance take place?',
    options: [
      'At intervals set by the employer following the risk assessment',
      'At intervals of not more than three years unless symptoms show',
      'At intervals agreed between the employee and the safety adviser',
      'At intervals of not more than twelve months, or shorter if needed',
    ],
    correctAnswer: 3,
    explanation:
      'For the scheduled substances and processes, health surveillance must include medical surveillance under a relevant doctor at intervals of not more than twelve months, or shorter intervals if that doctor requires it. Leaving the interval to the risk assessment is the plausible answer, but for these listed cases the interval is fixed by the regulation, not by the employer.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Health Surveillance',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 237,
    question: 'What does the COSHH definition of health surveillance include as well as assessing the state of health of the employee?',
    options: [
      'A review of the accident book covering the previous twelve months',
      'A measurement of the airborne concentration in the breathing zone',
      'Biological monitoring, such as testing a sample of breath or urine',
      'A record of how many hours the person wore protective equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance is defined as assessment of the state of health of an employee as related to exposure to hazardous substances, and it expressly includes biological monitoring. Air sampling in the breathing zone is the strong distractor because it is also called monitoring, but it measures the workplace rather than the person.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Health Surveillance',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 238,
    question: 'Which conditions does HSE identify as the ones that health checks under COSHH are most commonly provided for?',
    options: [
      'Hearing loss and hand arm vibration in the users of power tools',
      'Back injury and joint damage from repeated manual handling work',
      'Eye damage and hearing loss arising from long term site exposure',
      'Respiratory disease such as asthma, together with skin disease',
    ],
    correctAnswer: 3,
    explanation:
      'The most common health checks under COSHH are for respiratory disease such as asthma and for skin disease, which is why solvents, dusts and resins matter so much to an electrician. Hearing loss and vibration are the tempting answers because they are genuine construction health issues, but they are physical agents dealt with by their own regulations.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Health Surveillance',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 239,
    question: 'What right does an employee have over the health record kept about them under COSHH?',
    options: [
      'Access to their own personal record on giving reasonable notice',
      'Access to the records of everyone doing the same kind of work',
      'A right to have the record destroyed when they leave the firm',
      'A right to refuse the record being made in the first instance',
    ],
    correctAnswer: 0,
    explanation:
      'On reasonable notice being given, an employee must be allowed access to their own personal health record, and the employer must also produce copies to the enforcing authority on request. Access to colleagues records is the wrong extension of that right: the entitlement is personal, because the record contains that individual health information.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Records',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 240,
    question: 'A contractor offers to design, install and test dust extraction for a workshop. What must be established about them first?',
    options: [
      'That they hold the lowest price of the quotations obtained',
      'That they carry insurance covering the value of the contract',
      'That they are competent, with the skills, knowledge and experience',
      'That they are based within a reasonable travelling distance',
    ],
    correctAnswer: 2,
    explanation:
      'Whoever designs, installs, maintains and tests control measures must be competent, meaning they have the necessary skills, knowledge and experience, including why controls fail in practice. Insurance is the attractive answer because it protects you commercially, but a policy pays out after harm has occurred whereas competence prevents it.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Local Exhaust Ventilation',
    category: 'Control Measures & PPE',
  },
  {
    id: 241,
    question: 'What must arrangements for accidents and emergencies involving hazardous substances include under COSHH?',
    options: [
      'A list of substances lodged with the local fire and rescue service',
      'First aid facilities and safety drills that are tested at intervals',
      'A named first aider present on site whenever any substance is used',
      'An annual medical examination for everyone who handles substances',
    ],
    correctAnswer: 1,
    explanation:
      'The regulation requires procedures that include appropriate first aid facilities and relevant safety drills, and those drills must be tested at regular intervals rather than simply written down. Lodging a list with the fire service is the plausible answer, but the duty is to make emergency information available to the services, not to file an inventory with them.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Spills and Emergencies',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 242,
    question: 'A small quantity of cleaning solvent is knocked over in a plant room. How should the response to it be decided?',
    options: [
      'Evacuate the building at once, as every spill is an emergency',
      'Continue working and clear it up at the end of the working day',
      'Judge the scale and the substance, and respond proportionately',
      'Call the fire service before anyone assesses what has been spilt',
    ],
    correctAnswer: 2,
    explanation:
      'Whether a leak or spillage counts as an emergency depends on its scale and on the substance and its properties, and the response must be proportionate, so not every incident triggers evacuation. Automatic evacuation is the over cautious trap: it looks safe, but crying emergency for routine spills devalues the drill when a genuine release happens.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Spills and Emergencies',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 243,
    question: 'When does HSE say practice drills for cleaning up spills safely should be carried out?',
    options: [
      'After the first spill, so the drill can be based on real events',
      'Once a year, on the anniversary of the risk assessment review',
      'Only where the substance is corrosive or flammable in nature',
      'Before any spillage happens, so people already know what to do',
    ],
    correctAnswer: 3,
    explanation:
      'HSE is explicit that spill drills should be run before any spillage happens, so the response is already known when one occurs. Learning from the first real spill is the seductive answer because experience does teach, but the first spill is exactly the occasion when people improvise and get contaminated.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Spills and Emergencies',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 244,
    question: 'After a significant release of a hazardous substance, who may enter the affected area and on what basis?',
    options: [
      'Any trained operative, provided they wear a disposable dust mask',
      'Anyone from the contractor holding the risk assessment on site',
      'The site manager alone, until the enforcing authority attends',
      'Only those essential to the work, with the right equipment issued',
    ],
    correctAnswer: 3,
    explanation:
      'Only people essential to carrying out repairs and other necessary work may be in the affected area, and they must be given appropriate protective equipment and any specialised equipment, used until things are back to normal. A disposable mask is the dangerous shortcut, since it is chosen for nuisance dust rather than for an uncontrolled release.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Spills and Emergencies',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 245,
    question: 'What does COSHH require to be done with the information on emergency arrangements for hazardous substances?',
    options: [
      'Made available to the relevant emergency services, and displayed if apt',
      'Filed at head office and produced if an inspector asks to see it',
      'Sent to the supplier of each substance held anywhere on the site',
      'Kept confidential so that the substances held are not advertised',
    ],
    correctAnswer: 0,
    explanation:
      'The information must be made available to relevant accident and emergency services so they can prepare their own response, and displayed at the workplace where that is appropriate. Filing it at head office is the tempting administrative answer, but a document nobody at the scene can reach is useless in the minutes that matter.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Spills and Emergencies',
    category: 'Monitoring, Surveillance & Emergencies',
  },
  {
    id: 246,
    question: 'COSHH requires certain things to be reduced to the minimum required for the work concerned. Which set is it?',
    options: [
      'The number exposed, the level and duration, and the quantity held',
      'The cost, the waste produced and the number of suppliers used',
      'The number of tools used, the noise made and the hours worked',
      'The number of deliveries, the storage area and the stock value',
    ],
    correctAnswer: 0,
    explanation:
      'The measures must reduce, to the minimum required for the work, the number of employees exposed, the level and duration of exposure, and the quantity of hazardous substance present at the workplace. Waste is the near miss: safe handling of waste is a separate requirement in the same regulation, but it is not one of the three things to be minimised.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Exposure Control',
    category: 'Control Measures & PPE',
  },
  {
    id: 247,
    question: 'Does the duty to keep the quantity of hazardous substances at the workplace to a minimum prevent buying in bulk?',
    options: [
      'Yes, bulk purchase of any labelled substance is prohibited outright',
      'Yes, unless the enforcing authority has agreed the quantity held',
      'No, the aim is to limit what could be released into the work area',
      'No, because quantity has no bearing on the risk to health at all',
    ],
    correctAnswer: 2,
    explanation:
      'Guidance makes clear the requirement is not intended to stop employers buying in bulk to reduce cost; it is aimed at reducing the amount potentially released into the working area at any one time. The last option is the opposite error, because how much is present in the work area plainly affects how much can escape.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Exposure Control',
    category: 'Control Measures & PPE',
  },
  {
    id: 248,
    question: 'An electrician is sent to work in a factory run by another company. What must the occupier of those premises provide?',
    options: [
      'A copy of the health records held for the factory own employees',
      'Respiratory protection for every visiting worker who attends site',
      'A written permit signed by the safety adviser before work begins',
      'Information on hazardous substances used or produced on the site',
    ],
    correctAnswer: 3,
    explanation:
      'The employer occupying the premises should give the visiting employer enough information about substances used or produced there for the visitor to instruct their own people properly. Supplying respiratory protection is the plausible answer, but selecting and fit testing that equipment belongs to the employer of the person wearing it.',
    section: 'Module 7',
    difficulty: 'intermediate',
    topic: 'Site Practice',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 249,
    question: 'Why is handing an operative a printed information sheet not sufficient training under COSHH?',
    options: [
      'Because the sheet must be countersigned by a competent person',
      'Because training records must be typed rather than handwritten',
      'Because they must be shown how to use and check the controls',
      'Because information sheets are not admissible as legal evidence',
    ],
    correctAnswer: 2,
    explanation:
      'HSE calls it poor practice simply to hand over a page of written information; workers must be shown how to use the control measures properly and how to check that they are still working. Countersigning is the attractive answer because it produces a record, but a signature proves receipt of paper rather than any ability to use a control.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Information and Training',
    category: 'Control Measures & PPE',
  },
  {
    id: 250,
    question: 'Chasing a long run of masonry raises heavy dust. Which choice best reflects the COSHH order of control?',
    options: [
      'Issue disposable masks and open a window in the room being worked',
      'Damp the wall down and sweep the debris up at the end of the shift',
      'Rotate the operatives so no one person spends too long in the dust',
      'Use on tool extraction at the cut, with a mask only if still needed',
    ],
    correctAnswer: 3,
    explanation:
      'Capturing the dust at the point it is made is control at source, which outranks anything applied to the worker, and a mask is then added only if adequate control has still not been achieved. Rotation is the sophisticated looking trap: guidance classes limiting time through worker rotation as a worker specific control, so it shares the low ranking of protective equipment rather than solving the release.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Dust Control',
    category: 'Control Measures & PPE',
  },
];
