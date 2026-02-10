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
  "Understanding COSHH",
  "Legislation & Risk Assessment",
  "Hazardous Substances on Site",
  "Control Measures & PPE",
  "Monitoring, Surveillance & Emergencies"
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
  categories: coshhCategories
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
    question: "What does the acronym COSHH stand for?",
    options: [
      "Control of Substances Hazardous to Health",
      "Care of Substances Harmful to Humans",
      "Control of Safety and Health Hazards",
      "Containment of Substances Hazardous to Health"
    ],
    correctAnswer: 0,
    explanation: "COSHH stands for Control of Substances Hazardous to Health. It is the law that requires employers to control substances that are hazardous to health in the workplace, preventing or reducing workers' exposure to such substances.",
    section: "Module 1",
    difficulty: "basic",
    topic: "COSHH definition",
    category: "Understanding COSHH"
  },
  {
    id: 2,
    question: "Which of the following is NOT considered a hazardous substance under COSHH?",
    options: [
      "Cement dust",
      "Loud noise from machinery",
      "Solvent-based adhesives",
      "Biological agents such as bacteria"
    ],
    correctAnswer: 1,
    explanation: "Loud noise is a physical hazard, not a substance, and is therefore covered by the Control of Noise at Work Regulations 2005, not COSHH. COSHH applies to chemical substances, biological agents, dust, fumes, and similar hazardous materials.",
    section: "Module 1",
    difficulty: "basic",
    topic: "COSHH scope",
    category: "Understanding COSHH"
  },
  {
    id: 3,
    question: "COSHH regulations apply to which types of hazardous substances?",
    options: [
      "Only chemicals stored in bottles and containers",
      "Only substances with a GHS hazard pictogram on the label",
      "Any substance that can harm health, including dust, fumes, vapours, mists, gases, and biological agents",
      "Only substances classified as carcinogens"
    ],
    correctAnswer: 2,
    explanation: "COSHH covers a wide range of hazardous substances including chemicals, products containing chemicals, fumes, dusts, vapours, mists, nanotechnology, gases, biological agents, and germs that cause diseases such as leptospirosis.",
    section: "Module 1",
    difficulty: "basic",
    topic: "COSHH scope",
    category: "Understanding COSHH"
  },
  {
    id: 4,
    question: "Which of the following substances is specifically excluded from COSHH regulations?",
    options: [
      "Wood dust",
      "Lead",
      "Silica dust",
      "Welding fume"
    ],
    correctAnswer: 1,
    explanation: "Lead and asbestos are specifically excluded from COSHH because they have their own dedicated regulations — the Control of Lead at Work Regulations 2002 and the Control of Asbestos Regulations 2012 respectively. These substances require even more stringent controls.",
    section: "Module 1",
    difficulty: "basic",
    topic: "COSHH exclusions",
    category: "Understanding COSHH"
  },
  {
    id: 5,
    question: "What are the four main routes by which hazardous substances can enter the body?",
    options: [
      "Inhalation, ingestion, absorption, injection",
      "Breathing, eating, drinking, smoking",
      "Nose, mouth, ears, eyes",
      "Lungs, stomach, skin, blood"
    ],
    correctAnswer: 0,
    explanation: "The four recognised routes of entry for hazardous substances are inhalation (breathing in), ingestion (swallowing), absorption (through the skin or eyes), and injection (through cuts or puncture wounds). Inhalation is the most common route of occupational exposure.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Routes of exposure",
    category: "Understanding COSHH"
  },
  {
    id: 6,
    question: "Which route of exposure is the most common way workers are harmed by hazardous substances?",
    options: [
      "Ingestion",
      "Injection through wounds",
      "Inhalation",
      "Skin absorption"
    ],
    correctAnswer: 2,
    explanation: "Inhalation is the most common route of occupational exposure to hazardous substances. Dusts, fumes, vapours, mists, and gases can all be breathed in and cause damage to the respiratory system, from the nose and throat down to the deepest parts of the lungs.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Routes of exposure",
    category: "Understanding COSHH"
  },
  {
    id: 7,
    question: "What is the difference between an acute health effect and a chronic health effect?",
    options: [
      "Acute effects are more dangerous than chronic effects",
      "Acute effects occur rapidly after short exposure; chronic effects develop gradually after repeated or prolonged exposure",
      "Acute effects are caused by chemicals; chronic effects are caused by dust",
      "Acute effects are reversible; chronic effects are always fatal"
    ],
    correctAnswer: 1,
    explanation: "Acute effects occur rapidly, usually after a single short-term exposure (e.g., chemical burns, dizziness from solvent exposure). Chronic effects develop gradually over time from repeated or prolonged exposure (e.g., occupational asthma, silicosis). Both can be serious or fatal.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 8,
    question: "Approximately how many workers in Great Britain are estimated to die each year from occupational cancers linked to past workplace exposures?",
    options: [
      "Around 500",
      "Around 2,000",
      "Around 8,000",
      "Around 20,000"
    ],
    correctAnswer: 2,
    explanation: "HSE estimates that around 8,000 occupational cancer deaths occur each year in Great Britain linked to past workplace exposures to hazardous substances, including asbestos, silica dust, diesel engine exhaust, and various chemicals. This makes it one of the leading causes of work-related death.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Statistics",
    category: "Understanding COSHH"
  },
  {
    id: 9,
    question: "Which GHS hazard pictogram features a skull and crossbones?",
    options: [
      "GHS05 — Corrosion",
      "GHS06 — Acute Toxicity (severe)",
      "GHS07 — Harmful/Irritant",
      "GHS08 — Health Hazard (CMR)"
    ],
    correctAnswer: 1,
    explanation: "GHS06 displays the skull and crossbones pictogram and indicates acute toxicity — substances that can cause death or serious harm from a single or short-term exposure via ingestion, inhalation, or skin contact. This is one of the most critical warning symbols on chemical labels.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "GHS pictograms",
    category: "Understanding COSHH"
  },
  {
    id: 10,
    question: "What does the GHS08 'health hazard' pictogram (silhouette of a person with a starburst on the chest) indicate?",
    options: [
      "The substance is an irritant to skin",
      "The substance may cause long-term health effects such as cancer, organ damage, or respiratory sensitisation",
      "The substance is toxic if swallowed",
      "The substance is harmful to the environment"
    ],
    correctAnswer: 1,
    explanation: "GHS08 indicates serious long-term health hazards including carcinogenicity (cancer), mutagenicity, reproductive toxicity, respiratory sensitisation, specific target organ toxicity, and aspiration hazard. These substances may not cause immediate harm but can cause serious chronic health effects.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "GHS pictograms",
    category: "Understanding COSHH"
  },
  {
    id: 11,
    question: "What form of hazardous substance is created when metals are heated above their melting point and the vapour condenses in air?",
    options: [
      "Dust",
      "Mist",
      "Fume",
      "Gas"
    ],
    correctAnswer: 2,
    explanation: "Fumes are formed when a solid material, typically a metal, is heated above its melting point and the vapour condenses in air to form very fine solid particles. Welding fume is a common example in construction. Fume particles are extremely small, typically less than 1 micron, making them easily inhaled into the deepest parts of the lungs.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Substance types",
    category: "Understanding COSHH"
  },
  {
    id: 12,
    question: "What is 'respirable dust'?",
    options: [
      "Any dust that is visible in the air",
      "Dust particles small enough to penetrate deep into the lungs, beyond the body's natural defences",
      "Dust that causes immediate coughing",
      "Dust generated only by power tools"
    ],
    correctAnswer: 1,
    explanation: "Respirable dust consists of particles small enough (generally less than 10 micrometres) to pass through the nose and upper airways and penetrate deep into the gas exchange region of the lungs (alveoli). This is the most dangerous fraction of dust because the body cannot easily clear it.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Substance types",
    category: "Understanding COSHH"
  },
  {
    id: 13,
    question: "Which of the following is an example of a biological agent covered by COSHH?",
    options: [
      "Carbon monoxide from petrol engines",
      "Leptospirosis bacteria from rat urine in contaminated water",
      "Isocyanate vapour from spray paint",
      "Silica particles from cutting concrete"
    ],
    correctAnswer: 1,
    explanation: "Leptospirosis (Weil's disease) is caused by bacteria found in the urine of infected rats. Workers can be exposed through contaminated water or soil, particularly in sewers, waterways, and construction sites. It is classified as a biological agent under COSHH.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Biological agents",
    category: "Understanding COSHH"
  },
  {
    id: 14,
    question: "What is a 'sensitiser' in the context of COSHH?",
    options: [
      "A substance that causes immediate chemical burns",
      "A substance that triggers an allergic reaction after repeated exposure, meaning even tiny future exposures cause a response",
      "A substance that makes skin more sensitive to sunlight",
      "A cleaning product used to sanitise equipment"
    ],
    correctAnswer: 1,
    explanation: "A sensitiser is a substance that causes the immune system to produce an allergic response after repeated exposure. Once sensitised, even very small exposures can trigger serious reactions such as occupational asthma or dermatitis. Common sensitisers include isocyanates, epoxy resins, and some wood dusts.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 15,
    question: "Which of the following is an example of an acute health effect from hazardous substance exposure?",
    options: [
      "Occupational asthma from years of isocyanate exposure",
      "Silicosis from prolonged silica dust inhalation",
      "Dizziness and nausea from inhaling solvent vapours in a confined space",
      "Mesothelioma from historic asbestos exposure"
    ],
    correctAnswer: 2,
    explanation: "Dizziness and nausea from solvent vapour inhalation is an acute (immediate/short-term) health effect. The other options are all chronic effects that develop over months or years of repeated exposure. Acute solvent exposure at high concentrations can also cause unconsciousness and death.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 16,
    question: "What does the term 'occupational dermatitis' refer to?",
    options: [
      "A skin rash caused exclusively by latex gloves",
      "Inflammation of the skin caused or made worse by substances encountered at work",
      "A bacterial skin infection caught from contaminated tools",
      "Sunburn from working outdoors without protection"
    ],
    correctAnswer: 1,
    explanation: "Occupational dermatitis is inflammation of the skin caused by contact with substances at work. It can be irritant contact dermatitis (from direct damage by substances like cement, solvents, or detergents) or allergic contact dermatitis (an immune reaction to sensitisers like epoxy resins). It is one of the most commonly reported occupational diseases.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 17,
    question: "What type of substance is an isocyanate?",
    options: [
      "A naturally occurring mineral fibre",
      "A highly reactive chemical found in two-pack paints, foams, and adhesives that is a major cause of occupational asthma",
      "A type of heavy metal used in soldering",
      "A biological agent found in cooling towers"
    ],
    correctAnswer: 1,
    explanation: "Isocyanates are a family of highly reactive chemicals commonly found in two-pack spray paints, polyurethane foams, lacquers, and some adhesives. They are the leading cause of occupational asthma in the UK. Even very low concentrations can sensitise the respiratory system.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Substance types",
    category: "Understanding COSHH"
  },
  {
    id: 18,
    question: "Which of the following best describes a 'carcinogen'?",
    options: [
      "A substance that causes skin irritation",
      "A substance that can cause or contribute to the development of cancer",
      "A substance that reduces oxygen levels in the blood",
      "A substance that causes an immediate allergic reaction"
    ],
    correctAnswer: 1,
    explanation: "A carcinogen is any substance capable of causing or contributing to cancer. Under COSHH, carcinogens require the highest level of control. Examples of occupational carcinogens include respirable crystalline silica, benzene, some wood dusts, and certain chromium compounds.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 19,
    question: "What is the difference between 'inhalable dust' and 'respirable dust'?",
    options: [
      "Inhalable dust is only found outdoors; respirable dust is only found indoors",
      "Inhalable dust is captured by the nose and throat; respirable dust penetrates deep into the lungs",
      "They are different names for the same thing",
      "Inhalable dust is harmless; respirable dust is always toxic"
    ],
    correctAnswer: 1,
    explanation: "Inhalable dust refers to the fraction of airborne particles that enter through the nose and mouth and can deposit anywhere in the respiratory tract. Respirable dust is the finer fraction (typically under 10 micrometres) that passes beyond the body's upper airway defences and reaches the gas exchange region (alveoli) of the lungs, where it can cause the most serious damage.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Substance types",
    category: "Understanding COSHH"
  },
  {
    id: 20,
    question: "How might a worker be exposed to hazardous substances through the injection route?",
    options: [
      "By breathing in paint fumes",
      "By swallowing contaminated food on site",
      "Through a cut or puncture wound that allows a substance to enter the bloodstream directly",
      "By touching a corrosive chemical with bare hands"
    ],
    correctAnswer: 2,
    explanation: "The injection route occurs when hazardous substances enter the body through breaks in the skin such as cuts, abrasions, or puncture wounds. This bypasses the skin's protective barrier and introduces the substance directly into the bloodstream. High-pressure tools (e.g., grease guns) can also inject substances through intact skin.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Routes of exposure",
    category: "Understanding COSHH"
  },
  {
    id: 21,
    question: "Which of the following is classified as a 'mutagen'?",
    options: [
      "A substance that causes skin sensitisation",
      "A substance that can cause heritable genetic mutations in living cells",
      "A substance that irritates the respiratory tract",
      "A substance that lowers the flash point of other chemicals"
    ],
    correctAnswer: 1,
    explanation: "A mutagen is a substance that can cause permanent changes (mutations) to the DNA in living cells, and these mutations can be passed on to future generations. Mutagens are classified alongside carcinogens and reproductive toxins as CMR substances and require the strictest controls under COSHH.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 22,
    question: "What does the term 'CMR substance' stand for in occupational health?",
    options: [
      "Chemical, Mineral, Radioactive substance",
      "Carcinogenic, Mutagenic, or toxic to Reproduction substance",
      "Controlled, Monitored, Restricted substance",
      "Chronic, Moderate, Reversible substance"
    ],
    correctAnswer: 1,
    explanation: "CMR stands for Carcinogenic, Mutagenic, or toxic to Reproduction. These are the most hazardous categories of substance under COSHH. Regulation 11 requires that exposure to CMR substances be reduced to as low as is reasonably practicable, and substitution with a less hazardous alternative must always be considered first.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 23,
    question: "What type of health effect is occupational asthma?",
    options: [
      "An acute effect that resolves immediately after exposure ends",
      "A chronic respiratory condition caused by sensitisation or irritation from workplace substances",
      "A type of skin disease",
      "A viral infection caught from colleagues"
    ],
    correctAnswer: 1,
    explanation: "Occupational asthma is a chronic lung disease caused by breathing in workplace substances that sensitise or irritate the airways. Once established, it can be triggered by very low levels of the causative substance. Around 3,000 new cases are estimated in the UK each year, with isocyanates, flour dust, and wood dust being common causes.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 24,
    question: "Which GHS pictogram features a corroded surface and a corroded hand?",
    options: [
      "GHS02 — Flammable",
      "GHS05 — Corrosion",
      "GHS07 — Harmful/Irritant",
      "GHS09 — Environmental Hazard"
    ],
    correctAnswer: 1,
    explanation: "GHS05 displays the corrosion pictogram showing a substance corroding both a metal surface and human skin. It indicates that the substance can cause severe skin burns, serious eye damage, or corrode metals. Substances like concentrated acids, strong alkalis, and some solvents carry this pictogram.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "GHS pictograms",
    category: "Understanding COSHH"
  },
  {
    id: 25,
    question: "Exposure to which type of substance can cause metal fume fever?",
    options: [
      "Solvent vapours",
      "Zinc or copper fumes from welding, brazing, or galvanised steel cutting",
      "Silica dust",
      "Carbon monoxide"
    ],
    correctAnswer: 1,
    explanation: "Metal fume fever is caused by inhaling freshly formed metal oxide fumes, most commonly zinc oxide from welding or cutting galvanised (zinc-coated) steel, or copper fumes from brazing. Symptoms include flu-like illness, fever, chills, and muscle aches, typically appearing several hours after exposure.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 26,
    question: "What is the primary danger of working with solvents in a poorly ventilated area?",
    options: [
      "Solvents will corrode metal tools",
      "Solvent vapours can cause dizziness, unconsciousness, and potentially death by narcosis, and many are flammable",
      "Solvents make surfaces too slippery to work on",
      "Solvents attract biological hazards"
    ],
    correctAnswer: 1,
    explanation: "Organic solvents evaporate readily and in poorly ventilated areas the vapour concentration can quickly reach dangerous levels. Acute effects include headaches, dizziness, narcosis (drowsiness), and at high concentrations, unconsciousness and death. Chronic effects include liver and kidney damage. Many solvents are also highly flammable.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 27,
    question: "Which of the following best describes 'absorption' as a route of entry for hazardous substances?",
    options: [
      "Breathing in hazardous fumes and vapours",
      "Swallowing hazardous substances with food or drink",
      "Hazardous substances passing through the skin or mucous membranes into the bloodstream",
      "Hazardous substances entering through a puncture wound"
    ],
    correctAnswer: 2,
    explanation: "Absorption occurs when hazardous substances pass through intact skin or mucous membranes (e.g., eyes, nose lining) and enter the bloodstream. Many organic solvents, some pesticides, and certain chemicals can be readily absorbed through the skin. This is why appropriate glove selection is critical.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Routes of exposure",
    category: "Understanding COSHH"
  },
  {
    id: 28,
    question: "What is meant by the term 'Workplace Exposure Limit' (WEL)?",
    options: [
      "The maximum number of workers permitted in a hazardous area",
      "The maximum airborne concentration of a hazardous substance averaged over a reference period to which a worker may be exposed by inhalation",
      "The total amount of a substance a worker can handle per shift",
      "The distance workers must maintain from a hazardous substance source"
    ],
    correctAnswer: 1,
    explanation: "A Workplace Exposure Limit (WEL) is the maximum concentration of a hazardous substance in the air, averaged over a specified reference period (usually 8 hours or 15 minutes), to which workers may be exposed by inhalation. WELs are listed in HSE publication EH40 and are legally binding under COSHH.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Workplace exposure limits",
    category: "Understanding COSHH"
  },
  {
    id: 29,
    question: "What are the two reference periods used for Workplace Exposure Limits?",
    options: [
      "1 hour and 4 hours",
      "8-hour Time Weighted Average (TWA) and 15-minute Short-Term Exposure Limit (STEL)",
      "Morning shift and afternoon shift",
      "Daily limit and weekly limit"
    ],
    correctAnswer: 1,
    explanation: "WELs are expressed as either an 8-hour TWA (Time Weighted Average), representing the average concentration over a normal working day, or a 15-minute STEL (Short-Term Exposure Limit) to control brief peak exposures. Some substances have both an 8-hour TWA and a STEL.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Workplace exposure limits",
    category: "Understanding COSHH"
  },
  {
    id: 30,
    question: "What type of hazardous substance is 'respirable crystalline silica' (RCS)?",
    options: [
      "A biological agent",
      "A gaseous by-product of combustion",
      "A fine mineral dust generated by cutting, drilling, or grinding materials containing silica such as concrete, sandstone, and morite",
      "A synthetic chemical used in waterproofing products"
    ],
    correctAnswer: 2,
    explanation: "Respirable crystalline silica (RCS) is a fine dust produced when materials containing silica — including concrete, sandstone, mortar, brick, and granite — are cut, drilled, ground, or otherwise disturbed. Prolonged exposure causes silicosis, an incurable and progressive lung disease, and RCS is also a recognised carcinogen.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Substance types",
    category: "Understanding COSHH"
  },
  {
    id: 31,
    question: "How can hazardous substances enter the body via the ingestion route on a construction site?",
    options: [
      "Only by deliberately drinking chemicals",
      "By eating, drinking, or smoking with contaminated hands, or through hand-to-mouth contact",
      "By breathing in dust while eating lunch",
      "Ingestion is not a realistic route on construction sites"
    ],
    correctAnswer: 1,
    explanation: "Ingestion most commonly occurs when workers eat, drink, or smoke without first washing contaminated hands. Hazardous dust or residue on the hands transfers to food, cigarettes, or drinks. This is why COSHH assessments stress the importance of welfare facilities and hand-washing before breaks.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Routes of exposure",
    category: "Understanding COSHH"
  },
  {
    id: 32,
    question: "What is a 'vapour' in the context of hazardous substances?",
    options: [
      "Tiny liquid droplets suspended in air from spraying or splashing",
      "The gaseous form of a substance that is normally a liquid or solid at room temperature",
      "Solid particles generated by grinding or sanding",
      "Steam from heating water"
    ],
    correctAnswer: 1,
    explanation: "A vapour is the gaseous form of a substance that is normally a liquid or solid at room temperature and pressure. For example, solvent vapours are released when paints, adhesives, or cleaning agents evaporate. Vapour concentration increases with temperature and in poorly ventilated areas.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Substance types",
    category: "Understanding COSHH"
  },
  {
    id: 33,
    question: "What is a 'mist' in the context of hazardous substances?",
    options: [
      "A gas that is lighter than air",
      "Fine solid particles that settle quickly",
      "Tiny liquid droplets suspended in air, typically produced by spraying, splashing, or condensation",
      "Visible smoke from burning materials"
    ],
    correctAnswer: 2,
    explanation: "A mist consists of tiny liquid droplets suspended in the air, formed by spraying, splashing, condensation, or other mechanical processes. Examples include oil mist from machining operations and paint mist from spray painting. Mists can be inhaled and deposit in the respiratory system.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Substance types",
    category: "Understanding COSHH"
  },
  {
    id: 34,
    question: "Chronic obstructive pulmonary disease (COPD) can be caused by long-term exposure to which workplace hazards?",
    options: [
      "Loud noise and vibration",
      "Dusts, fumes, and chemical vapours",
      "Ultraviolet radiation only",
      "Extreme cold temperatures"
    ],
    correctAnswer: 1,
    explanation: "COPD is a group of lung diseases including chronic bronchitis and emphysema. Occupational COPD can be caused by long-term exposure to dusts (e.g., coal, silica, grain), fumes (e.g., welding fume), and chemical vapours. HSE estimates that around 4,000 COPD deaths per year in Great Britain are linked to past occupational exposures.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 35,
    question: "What is the 'synergistic effect' in relation to hazardous substance exposure?",
    options: [
      "When two substances cancel each other's harmful effects",
      "When exposure to two or more substances together produces a combined effect greater than the sum of their individual effects",
      "When a substance becomes less toxic over time",
      "When personal protective equipment neutralises a hazardous substance"
    ],
    correctAnswer: 1,
    explanation: "The synergistic effect occurs when two or more hazardous substances interact to produce a combined health effect that is greater than would be expected from simply adding their individual effects together. For example, smoking combined with asbestos exposure dramatically increases the risk of lung cancer far beyond either risk alone.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 36,
    question: "What is meant by 'total inhalable dust' in the context of workplace exposure monitoring?",
    options: [
      "Only the dust visible to the naked eye",
      "The fraction of airborne particles that is inhaled through the nose and mouth during breathing",
      "Dust generated specifically by demolition activities",
      "All dust in the atmosphere including outdoor pollution"
    ],
    correctAnswer: 1,
    explanation: "Total inhalable dust is the mass fraction of airborne particles that enters the nose and mouth during normal breathing. The current UK WEL for total inhalable dust (where no specific substance WEL applies) is 10 mg/m³ as an 8-hour TWA. This is sometimes referred to as 'nuisance dust', though this term is misleading as prolonged exposure can still cause harm.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Workplace exposure limits",
    category: "Understanding COSHH"
  },
  {
    id: 37,
    question: "What is the general Workplace Exposure Limit for respirable dust (where no substance-specific WEL applies)?",
    options: [
      "1 mg/m³ 8-hour TWA",
      "4 mg/m³ 8-hour TWA",
      "10 mg/m³ 8-hour TWA",
      "20 mg/m³ 8-hour TWA"
    ],
    correctAnswer: 1,
    explanation: "The general WEL for respirable dust (particles not otherwise specified) is 4 mg/m³ as an 8-hour TWA, as published in EH40. For total inhalable dust, the general WEL is 10 mg/m³. Many specific substances have much lower WELs — for example, respirable crystalline silica has a WEL of 0.1 mg/m³.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Workplace exposure limits",
    category: "Understanding COSHH"
  },
  {
    id: 38,
    question: "Which of the following substances is a common cause of occupational contact dermatitis on construction sites?",
    options: [
      "Nitrogen gas",
      "Wet cement (due to its alkaline pH and chromium content)",
      "Mineral wool insulation fibres",
      "Copper cable"
    ],
    correctAnswer: 1,
    explanation: "Wet cement is highly alkaline (pH 12-13) and can cause both irritant and allergic contact dermatitis. The alkalinity causes chemical burns on prolonged skin contact, while hexavalent chromium compounds in cement cause allergic sensitisation. 'Cement burns' are a significant cause of occupational skin disease in construction.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 39,
    question: "What is a 'narcotic' effect in relation to solvent exposure?",
    options: [
      "A permanent neurological condition",
      "A temporary depression of the central nervous system causing drowsiness, dizziness, confusion, and potentially unconsciousness",
      "An allergic reaction to the solvent",
      "A skin-drying effect causing cracking and dermatitis"
    ],
    correctAnswer: 1,
    explanation: "Many organic solvents have a narcotic effect, meaning they depress the central nervous system. Symptoms progress from mild headaches and dizziness through confusion and impaired coordination to unconsciousness and death at very high concentrations. This is particularly dangerous in confined or poorly ventilated spaces.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Health effects",
    category: "Understanding COSHH"
  },
  {
    id: 40,
    question: "Which body organ can be damaged by chronic exposure to organic solvents such as toluene and xylene?",
    options: [
      "The heart only",
      "The liver and kidneys",
      "The bones and joints",
      "The eyes only"
    ],
    correctAnswer: 1,
    explanation: "Chronic (long-term) exposure to many organic solvents including toluene, xylene, and trichloroethylene can cause damage to the liver and kidneys, as these organs are responsible for metabolising and excreting toxic substances from the body. Some solvents can also cause neurological damage and dermatitis.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Health effects",
    category: "Understanding COSHH"
  },

  // =======================================================================
  // LEGISLATION & RISK ASSESSMENT — 40 questions (id 41-80)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 41,
    question: "In which year were the current COSHH Regulations originally made?",
    options: [
      "1992",
      "1999",
      "2002",
      "2012"
    ],
    correctAnswer: 2,
    explanation: "The Control of Substances Hazardous to Health Regulations were made in 2002 (SI 2002/2677), replacing earlier 1988 and 1994 versions. They have been amended several times since, but the 2002 Regulations remain the current statutory instrument.",
    section: "Module 2",
    difficulty: "basic",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 42,
    question: "Under which parent Act are the COSHH Regulations made?",
    options: [
      "The Environmental Protection Act 1990",
      "The Health and Safety at Work etc. Act 1974",
      "The Factories Act 1961",
      "The Construction (Design and Management) Regulations 2015"
    ],
    correctAnswer: 1,
    explanation: "The COSHH Regulations 2002 are made under the Health and Safety at Work etc. Act 1974 (HSWA). HSWA is the primary piece of UK health and safety legislation that places general duties on employers, employees, and the self-employed. COSHH is one of many sets of regulations made under this enabling Act.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 43,
    question: "Who has the primary duty to carry out COSHH assessments under the Regulations?",
    options: [
      "Individual workers using the substances",
      "The Health and Safety Executive",
      "The employer (or self-employed person)",
      "The substance manufacturer"
    ],
    correctAnswer: 2,
    explanation: "Regulation 6 of COSHH places the duty on the employer to assess the risks to health from hazardous substances used in the workplace and to decide what controls are needed. Self-employed persons have the same duty for their own work. Employees have a duty to cooperate but not to carry out the assessment.",
    section: "Module 2",
    difficulty: "basic",
    topic: "COSHH risk assessment",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 44,
    question: "What is a Safety Data Sheet (SDS)?",
    options: [
      "A training certificate for handling chemicals",
      "A document provided by the manufacturer or supplier giving detailed information about a substance's hazards, safe handling, storage, and emergency measures",
      "An insurance document covering chemical spills",
      "A workplace risk assessment form"
    ],
    correctAnswer: 1,
    explanation: "A Safety Data Sheet (SDS) is a standardised 16-section document provided by the manufacturer or supplier of a chemical product. It contains essential information including hazard identification, composition, first-aid measures, fire-fighting measures, handling and storage, exposure controls, physical properties, and disposal considerations.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Safety Data Sheets",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 45,
    question: "How many sections does a Safety Data Sheet (SDS) contain under the REACH Regulation?",
    options: [
      "8 sections",
      "12 sections",
      "16 sections",
      "20 sections"
    ],
    correctAnswer: 2,
    explanation: "Under Annex II of the REACH Regulation (UK REACH post-Brexit), a Safety Data Sheet must contain 16 standardised sections covering identification, hazards, composition, first aid, firefighting, accidental release, handling and storage, exposure controls/PPE, physical properties, stability, toxicology, ecology, disposal, transport, regulation, and other information.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Safety Data Sheets",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 46,
    question: "Which section of a Safety Data Sheet provides information on recommended exposure controls and personal protective equipment?",
    options: [
      "Section 4 — First-aid measures",
      "Section 7 — Handling and storage",
      "Section 8 — Exposure controls/personal protection",
      "Section 11 — Toxicological information"
    ],
    correctAnswer: 2,
    explanation: "Section 8 of the SDS covers exposure controls and personal protection. It lists applicable Workplace Exposure Limits, recommended engineering controls, and specific PPE requirements including the type of gloves, eye protection, respiratory protection, and protective clothing needed when handling the substance.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Safety Data Sheets",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 47,
    question: "What is EH40?",
    options: [
      "A type of respiratory protective equipment",
      "An HSE publication listing Workplace Exposure Limits for hazardous substances",
      "A risk assessment template for COSHH",
      "A European directive on chemical labelling"
    ],
    correctAnswer: 1,
    explanation: "EH40 is the HSE publication 'Workplace Exposure Limits' that contains the table of UK WELs for hazardous substances. It is regularly updated and provides both 8-hour TWA and 15-minute STEL values. Employers must ensure that exposure to substances listed in EH40 does not exceed the stated limits.",
    section: "Module 2",
    difficulty: "basic",
    topic: "EH40",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 48,
    question: "Which COSHH Regulation number requires employers to carry out a suitable and sufficient assessment of risk?",
    options: [
      "Regulation 4",
      "Regulation 6",
      "Regulation 9",
      "Regulation 12"
    ],
    correctAnswer: 1,
    explanation: "Regulation 6 of the COSHH Regulations 2002 requires employers to make a suitable and sufficient assessment of the risk to health created by work involving hazardous substances, and the steps needed to meet the requirements of the Regulations. This assessment must be reviewed regularly.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 49,
    question: "Under COSHH, what must an employer do BEFORE any work with hazardous substances begins?",
    options: [
      "Order the cheapest available PPE",
      "Carry out a risk assessment and implement appropriate control measures",
      "Notify the HSE of every substance to be used",
      "Apply for a COSHH licence from the local authority"
    ],
    correctAnswer: 1,
    explanation: "Before any work with hazardous substances begins, the employer must carry out a COSHH risk assessment (Regulation 6) and implement appropriate control measures (Regulation 7). Work must not commence until the assessment is complete and controls are in place. No licence or prior HSE notification is required for standard COSHH activities.",
    section: "Module 2",
    difficulty: "basic",
    topic: "COSHH risk assessment",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 50,
    question: "Which of the following is NOT a step in the COSHH risk assessment process?",
    options: [
      "Identify the hazardous substances present or likely to be present",
      "Decide who might be harmed and how",
      "Calculate the cost of replacing the substance with a less hazardous alternative",
      "Evaluate the risks and decide on control measures"
    ],
    correctAnswer: 2,
    explanation: "While substitution with a less hazardous substance is a key control measure, calculating replacement costs is not a formal step in the COSHH risk assessment process. The essential steps are: identify hazards, decide who is at risk and how, evaluate the risks, record findings, implement controls, and review the assessment regularly.",
    section: "Module 2",
    difficulty: "basic",
    topic: "COSHH risk assessment",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 51,
    question: "When must a COSHH risk assessment be reviewed?",
    options: [
      "Only when a worker becomes ill",
      "Every 12 months by law, regardless of any changes",
      "When there is reason to believe it is no longer valid, or when there has been a significant change in the work",
      "Only when the HSE inspector requests it"
    ],
    correctAnswer: 2,
    explanation: "COSHH Regulation 6(3) requires the assessment to be reviewed when there is reason to suspect it is no longer valid or when there has been a significant change in the work to which it relates. This includes changes in substances used, work processes, quantities, or if health surveillance reveals problems. There is no fixed review interval in law, though annual review is good practice.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "COSHH risk assessment",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 52,
    question: "What does Regulation 7 of the COSHH Regulations require?",
    options: [
      "That all hazardous substances be banned from the workplace",
      "That employers prevent or adequately control exposure to hazardous substances",
      "That all workers wear respiratory protective equipment at all times",
      "That all substances be stored in a locked room"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 places a duty on the employer to either prevent exposure to substances hazardous to health, or where this is not reasonably practicable, to adequately control exposure. Prevention (e.g., elimination or substitution) should always be the first consideration before moving to control measures.",
    section: "Module 2",
    difficulty: "basic",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 53,
    question: "What is the hierarchy of control measures under COSHH (in order of preference)?",
    options: [
      "PPE → ventilation → substitution → elimination",
      "Elimination → substitution → engineering controls → administrative controls → PPE",
      "Training → PPE → warning signs → ventilation",
      "Risk assessment → monitoring → health surveillance → PPE"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control under COSHH follows the general hierarchy: elimination (remove the substance entirely), substitution (use a less hazardous alternative), engineering controls (LEV, enclosure), administrative controls (procedures, training, reduced exposure time), and PPE as a last resort. Higher-level controls are always preferred as they protect everyone.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Control hierarchy",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 54,
    question: "Under COSHH, which regulation deals specifically with the use of control measures?",
    options: [
      "Regulation 6 — Assessment",
      "Regulation 7 — Prevention or control of exposure",
      "Regulation 8 — Use of control measures",
      "Regulation 9 — Maintenance of control measures"
    ],
    correctAnswer: 2,
    explanation: "Regulation 8 requires that every employer ensures that control measures provided under Regulation 7 are properly used and applied. It also places a duty on employees to make proper use of the control measures, PPE, and facilities provided by the employer.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 55,
    question: "Under COSHH Regulation 9, how often must Local Exhaust Ventilation (LEV) systems be thoroughly examined and tested?",
    options: [
      "Every month",
      "Every 6 months",
      "At least every 14 months",
      "Every 2 years"
    ],
    correctAnswer: 2,
    explanation: "Regulation 9(2) requires that LEV systems be thoroughly examined and tested at least every 14 months (or more frequently if specified in the risk assessment). Records of these examinations must be kept for at least 5 years. Some processes have shorter intervals specified in COSHH-ACOP.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Control maintenance",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 56,
    question: "What does Regulation 10 of COSHH cover?",
    options: [
      "Risk assessment procedures",
      "Monitoring exposure at the workplace",
      "Health surveillance of employees",
      "Information, instruction, and training"
    ],
    correctAnswer: 1,
    explanation: "Regulation 10 requires employers to ensure that the exposure of employees to substances hazardous to health is monitored where this is necessary to maintain adequate control or to protect health. Monitoring means measuring the concentration of hazardous substances in the workplace air to check that WELs are not exceeded.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 57,
    question: "What does Regulation 11 of COSHH deal with?",
    options: [
      "Storage of hazardous substances",
      "Exposure monitoring",
      "Health surveillance",
      "Emergency planning"
    ],
    correctAnswer: 2,
    explanation: "Regulation 11 requires employers to provide appropriate health surveillance for employees where the risk assessment identifies that there is a reasonable likelihood of disease or adverse health effects occurring. This includes medical examinations, biological monitoring, and questionnaires, depending on the substances and exposures involved.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 58,
    question: "For how long must health surveillance records be kept under COSHH?",
    options: [
      "5 years",
      "10 years",
      "30 years",
      "40 years from the date of the last entry"
    ],
    correctAnswer: 3,
    explanation: "COSHH Regulation 11(4) requires that health surveillance records be kept for at least 40 years from the date of the last entry. This extended period reflects the fact that some occupational diseases, particularly cancers, may not develop until many decades after exposure occurred.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Health surveillance",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 59,
    question: "Regulation 12 of COSHH requires employers to provide workers with what?",
    options: [
      "Free health insurance",
      "Suitable and sufficient information, instruction, and training about the hazardous substances they work with",
      "Annual pay rises for working with hazardous substances",
      "Written permission from the HSE to handle chemicals"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12 requires employers to provide employees with suitable and sufficient information, instruction, and training about the hazardous substances they may be exposed to, the risks, the precautions they should take, the results of any monitoring, and the purpose and procedures for health surveillance.",
    section: "Module 2",
    difficulty: "basic",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 60,
    question: "Which regulation covers arrangements for dealing with accidents, incidents, and emergencies involving hazardous substances?",
    options: [
      "Regulation 7",
      "Regulation 9",
      "Regulation 13",
      "Regulation 15"
    ],
    correctAnswer: 2,
    explanation: "Regulation 13 requires employers to prepare procedures and set out warning and communication systems for dealing with accidents, incidents, and emergencies involving hazardous substances. This includes provision of appropriate first-aid facilities and relevant safety drills, tested at regular intervals.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "COSHH Regulations 2002",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 61,
    question: "What does the CLP Regulation stand for?",
    options: [
      "Chemical Labelling Protocol",
      "Classification, Labelling and Packaging of substances and mixtures",
      "Control of Liquid Products",
      "Certified Laboratory Procedures"
    ],
    correctAnswer: 1,
    explanation: "CLP stands for Classification, Labelling and Packaging of substances and mixtures. UK CLP (retained EU law) requires that hazardous chemicals are classified according to their hazards and labelled with standardised GHS pictograms, signal words, and hazard statements before being placed on the market.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 62,
    question: "What is the role of the REACH Regulation in relation to COSHH?",
    options: [
      "REACH replaces COSHH entirely",
      "REACH deals with the registration, evaluation, authorisation, and restriction of chemicals placed on the market, while COSHH deals with workplace exposure controls",
      "REACH only applies to pharmaceutical companies",
      "REACH provides Workplace Exposure Limits"
    ],
    correctAnswer: 1,
    explanation: "UK REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) governs the manufacture, import, and supply of chemicals. It requires manufacturers to provide Safety Data Sheets and register substances. COSHH complements REACH by requiring employers to control workplace exposure. They work together but have different purposes.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 63,
    question: "Under COSHH, what is the legal status of a Workplace Exposure Limit listed in EH40?",
    options: [
      "It is advisory guidance only",
      "It is legally enforceable — exposure must not exceed the WEL unless specific conditions are met",
      "It only applies to large companies with more than 50 employees",
      "It only applies to the chemical manufacturing industry"
    ],
    correctAnswer: 1,
    explanation: "WELs listed in EH40 are legally enforceable under COSHH Regulation 7. An employer must ensure that the exposure of employees to hazardous substances does not exceed the WEL, or where a substance has been assigned a WEL, that exposure is reduced to as low as is reasonably practicable and in any case below the WEL.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Workplace Exposure Limits",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 64,
    question: "What is an 'Approved Code of Practice' (ACOP) in relation to COSHH?",
    options: [
      "A legally binding regulation that must be followed word for word",
      "A document that gives practical advice on how to comply with the regulations — not following it means you must show an equally effective method",
      "A guide published by chemical manufacturers",
      "A training manual for HSE inspectors"
    ],
    correctAnswer: 1,
    explanation: "An ACOP provides practical guidance on how to comply with the law. Under Section 17 of the Health and Safety at Work etc. Act 1974, if you are prosecuted for a breach and it is proved that you did not follow the relevant ACOP, you must show that you complied in an equally effective way, or the court will find you at fault.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 65,
    question: "What duty does the Health and Safety at Work etc. Act 1974 Section 2 place on employers regarding hazardous substances?",
    options: [
      "No duty regarding substances — that is solely covered by COSHH",
      "A general duty to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees",
      "A duty to provide free medical treatment for any illness",
      "A duty to report all substance use to the Environment Agency"
    ],
    correctAnswer: 1,
    explanation: "Section 2 of HSWA 1974 places a general duty on every employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This overarching duty encompasses the use of hazardous substances and is the parent duty under which the specific COSHH Regulations are made.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 66,
    question: "Which of the following does an employee have a legal duty to do under COSHH?",
    options: [
      "Write the COSHH risk assessment",
      "Purchase their own PPE for handling chemicals",
      "Make proper use of control measures and PPE provided by the employer, and report defects",
      "Decide which chemicals may be used on site"
    ],
    correctAnswer: 2,
    explanation: "Under COSHH Regulation 8(2), every employee must make full and proper use of any control measure, PPE, or other provision made by the employer. Regulation 12 also requires employees to report any defects in controls or PPE. The duty to assess, provide controls, and supply PPE rests with the employer.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Employee duties",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 67,
    question: "A COSHH assessment identifies that a substance is a respiratory sensitiser. What is the highest priority action?",
    options: [
      "Issue RPE to all workers in the area",
      "Eliminate the substance from the process or substitute it with a non-sensitising alternative",
      "Reduce the exposure time for each worker",
      "Place warning signs around the work area"
    ],
    correctAnswer: 1,
    explanation: "For sensitisers, the COSHH ACOP prioritises elimination or substitution above all other measures. Once a worker becomes sensitised, even very low exposures can trigger severe reactions, making engineering controls and PPE less reliable as long-term solutions. If substitution is not reasonably practicable, a totally enclosed process or strict engineering controls must be used.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Control hierarchy",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 68,
    question: "What information must a hazardous substance label display under CLP regulations?",
    options: [
      "Only the product name and manufacturer address",
      "Product identifier, GHS hazard pictograms, signal word, hazard statements, precautionary statements, and supplier details",
      "Just a colour-coded stripe indicating the hazard type",
      "Only the emergency telephone number"
    ],
    correctAnswer: 1,
    explanation: "Under UK CLP, labels must display: the product identifier (name), relevant GHS hazard pictograms, the signal word ('Danger' or 'Warning'), hazard statements (H-codes describing hazards), precautionary statements (P-codes for prevention, response, storage, disposal), and the name, address, and telephone number of the supplier.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "CLP labelling",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 69,
    question: "What is the difference between the signal words 'Danger' and 'Warning' on a CLP label?",
    options: [
      "There is no difference; they are interchangeable",
      "'Danger' indicates more severe hazards; 'Warning' indicates less severe hazards",
      "'Danger' is used for chemicals; 'Warning' is used for biological agents",
      "'Warning' indicates higher risk than 'Danger'"
    ],
    correctAnswer: 1,
    explanation: "'Danger' is the signal word used for the more severe hazard categories (e.g., acutely toxic Category 1, flammable Category 1), while 'Warning' is used for less severe categories. A substance can only have one signal word, and if multiple hazards exist, the most severe determines which signal word is used.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "CLP labelling",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 70,
    question: "Under COSHH, what must an employer do if five or more people are employed?",
    options: [
      "Appoint a dedicated COSHH officer",
      "Record the significant findings of the COSHH assessment in writing",
      "Register with the HSE as a chemical user",
      "Install air monitoring equipment on every site"
    ],
    correctAnswer: 1,
    explanation: "Where an employer has five or more employees, the significant findings of the risk assessment must be recorded. This is a requirement under the Management of Health and Safety at Work Regulations 1999 that applies to COSHH assessments. Even with fewer than five employees, it is considered best practice to document findings.",
    section: "Module 2",
    difficulty: "basic",
    topic: "COSHH risk assessment",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 71,
    question: "What does the abbreviation 'WEL' stand for?",
    options: [
      "Worker Exposure Legislation",
      "Workplace Exposure Limit",
      "Warning Exposure Level",
      "Work Environment Legislation"
    ],
    correctAnswer: 1,
    explanation: "WEL stands for Workplace Exposure Limit. It is the maximum concentration of a hazardous substance in workplace air, averaged over a specified reference period, to which a worker may be exposed by inhalation. WELs are listed in HSE publication EH40 and are legally binding under COSHH.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Workplace Exposure Limits",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 72,
    question: "Which piece of legislation specifically governs the supply of Safety Data Sheets in the UK?",
    options: [
      "COSHH Regulations 2002",
      "UK REACH Regulation",
      "Provision and Use of Work Equipment Regulations 1998",
      "Environmental Protection Act 1990"
    ],
    correctAnswer: 1,
    explanation: "The requirement to provide Safety Data Sheets comes from UK REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals). Article 31 of UK REACH requires suppliers to provide a SDS when supplying a classified hazardous substance or mixture. COSHH requires employers to obtain and use this information for their risk assessments.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 73,
    question: "What is the WEL for respirable crystalline silica (RCS) in the UK as listed in EH40?",
    options: [
      "0.01 mg/m³ 8-hour TWA",
      "0.1 mg/m³ 8-hour TWA",
      "0.5 mg/m³ 8-hour TWA",
      "1.0 mg/m³ 8-hour TWA"
    ],
    correctAnswer: 1,
    explanation: "The UK Workplace Exposure Limit for respirable crystalline silica is 0.1 mg/m³ as an 8-hour TWA. This limit reflects the serious health risks associated with silica exposure, including silicosis and lung cancer. The HSE treats this WEL as an upper limit and employers should aim to reduce exposure well below it.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Workplace Exposure Limits",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 74,
    question: "Under COSHH, when is health surveillance legally required?",
    options: [
      "For all workers who handle any chemical",
      "Only when workers request it",
      "When the risk assessment identifies that employees are exposed to a substance linked to an identifiable disease or adverse health effect, and there is a reasonable likelihood of it occurring",
      "Only after a worker has reported symptoms"
    ],
    correctAnswer: 2,
    explanation: "Regulation 11 requires health surveillance where: (a) employees are exposed to a substance listed in Schedule 6 or linked to a particular disease or adverse health effect, (b) there is a reasonable likelihood of the disease or effect occurring under the conditions of work, and (c) valid techniques are available to detect the disease or effect.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Health surveillance",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 75,
    question: "Which of the following substances requires COSHH health surveillance under Schedule 6 of the Regulations?",
    options: [
      "General inhalable dust",
      "Water-based paint",
      "Isocyanates",
      "Ordinary Portland cement"
    ],
    correctAnswer: 2,
    explanation: "Isocyanates are listed in Schedule 6 of the COSHH Regulations, which specifies substances for which medical surveillance by an appointed doctor is required. Workers who may be significantly exposed to isocyanates must undergo health surveillance including lung function testing and medical assessment.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Health surveillance",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 76,
    question: "Under the Management of Health and Safety at Work Regulations 1999, what must employers do in addition to COSHH assessments?",
    options: [
      "Nothing — COSHH covers all requirements",
      "Carry out a general risk assessment covering all workplace risks, including those from hazardous substances",
      "Only assess risks from manual handling",
      "Submit monthly reports to the HSE"
    ],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 Regulation 3 requires employers to carry out a suitable and sufficient assessment of all risks to employees and others. COSHH assessments are specific to hazardous substance risks but must sit within this broader risk management framework.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 77,
    question: "What information from a Safety Data Sheet is most directly useful when writing a COSHH risk assessment?",
    options: [
      "The marketing description of the product",
      "Hazard identification, exposure controls, toxicological information, and first-aid measures",
      "The price per unit of the substance",
      "The date the product was last reformulated"
    ],
    correctAnswer: 1,
    explanation: "The most directly useful SDS sections for a COSHH assessment are Section 2 (hazard identification), Section 8 (exposure controls/personal protection), Section 11 (toxicological information), and Section 4 (first-aid measures). These sections provide the data needed to identify hazards, assess routes of exposure, select controls, and plan emergency response.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Safety Data Sheets",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 78,
    question: "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), which COSHH-related conditions are reportable?",
    options: [
      "Only fatal chemical injuries",
      "Occupational diseases including occupational asthma, occupational dermatitis, and certain cancers caused by workplace substance exposure",
      "Only conditions requiring more than 7 days off work",
      "Only conditions affecting more than 10 workers simultaneously"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR Schedule 2 lists specific occupational diseases that are reportable, including occupational asthma, occupational dermatitis from exposure to sensitisers or irritants, and cancers linked to occupational exposures. Additionally, any dangerous occurrence involving uncontrolled release of a hazardous substance must be reported.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Related legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 79,
    question: "What is a 'hazard statement' (H-statement) on a CLP chemical label?",
    options: [
      "A code that describes the emergency procedures for a chemical spill",
      "A standardised phrase that describes the nature and severity of the hazard posed by a substance",
      "A statement of the substance's workplace exposure limit",
      "A recommendation for appropriate storage conditions"
    ],
    correctAnswer: 1,
    explanation: "Hazard statements (H-statements) are standardised phrases assigned to each hazard class and category under CLP. They describe the nature of the hazard, for example H301 ('Toxic if swallowed'), H315 ('Causes skin irritation'), or H350 ('May cause cancer'). They are numbered and grouped: H2xx for physical hazards, H3xx for health hazards, and H4xx for environmental hazards.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CLP labelling",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 80,
    question: "What is a 'precautionary statement' (P-statement) on a CLP chemical label?",
    options: [
      "A statement confirming the substance has been tested for quality",
      "A standardised phrase describing recommended measures to minimise or prevent adverse effects from exposure, storage, or disposal",
      "A legal warning about the penalties for misuse",
      "A manufacturer's disclaimer of liability"
    ],
    correctAnswer: 1,
    explanation: "Precautionary statements (P-statements) are standardised phrases under CLP that advise on measures to minimise or prevent harmful effects. They are grouped: P1xx (general), P2xx (prevention, e.g., 'Wear protective gloves'), P3xx (response, e.g., 'IF SWALLOWED: Call a POISON CENTRE'), P4xx (storage), and P5xx (disposal).",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CLP labelling",
    category: "Legislation & Risk Assessment"
  },

  // =======================================================================
  // HAZARDOUS SUBSTANCES ON SITE — 20 questions (id 81-100)
  // ~7 basic, ~9 intermediate, ~4 advanced
  // =======================================================================
  {
    id: 81,
    question: "Which hazardous substance is most commonly encountered when chasing walls or cutting concrete on a construction site?",
    options: [
      "Carbon monoxide",
      "Respirable crystalline silica (RCS) dust",
      "Isocyanate vapour",
      "Hydrogen sulphide gas"
    ],
    correctAnswer: 1,
    explanation: "Chasing walls and cutting concrete, brick, block, or mortar releases respirable crystalline silica (RCS) dust. Silica is a major component of these materials, and the cutting/grinding process creates very fine dust particles that can penetrate deep into the lungs, causing silicosis and increasing the risk of lung cancer.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 82,
    question: "What hazardous substance is an electrician most likely exposed to when soldering copper pipe joints or cable terminations?",
    options: [
      "Asbestos fibres",
      "Lead and rosin (colophony) fumes from solder and flux",
      "Silica dust",
      "Formaldehyde vapour"
    ],
    correctAnswer: 1,
    explanation: "Soldering traditionally uses tin-lead alloy solder and rosin-based flux. This creates lead fume and rosin (colophony) fume. Lead is toxic to the nervous system, kidneys, and reproductive system. Colophony fume is a respiratory sensitiser and a known cause of occupational asthma. Lead-free solder is now preferred where possible.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 83,
    question: "What type of hazardous substance can be released when drilling into painted surfaces in buildings constructed before 1980?",
    options: [
      "Carbon dioxide",
      "Silica dust only",
      "Lead-containing paint dust",
      "Fibreglass particles"
    ],
    correctAnswer: 2,
    explanation: "Lead-based paints were widely used in UK buildings until the late 1970s. Drilling, sanding, or scraping these painted surfaces can generate lead-containing dust. Electricians frequently drill into walls and ceilings in older buildings, making lead paint dust a significant occupational hazard that requires assessment under COSHH.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 84,
    question: "Which hazardous substance might electricians encounter when working in loft spaces with older insulation materials?",
    options: [
      "Carbon monoxide",
      "Man-made mineral fibres (MMMF) from glass wool or mineral wool insulation",
      "Hydrogen cyanide",
      "Mercury vapour"
    ],
    correctAnswer: 1,
    explanation: "Loft spaces commonly contain glass wool or mineral wool insulation, which are man-made mineral fibres (MMMF). These can cause skin irritation, eye irritation, and upper respiratory tract irritation. While less hazardous than asbestos, they still require appropriate controls including gloves, eye protection, and dust masks.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 85,
    question: "What is the main COSHH concern when using PVC solvent cement (glue) to join plastic conduit?",
    options: [
      "The cement is radioactive",
      "The solvent vapours are flammable and can cause narcotic effects in poorly ventilated areas",
      "The cement generates silica dust",
      "The cement contains asbestos fibres"
    ],
    correctAnswer: 1,
    explanation: "PVC solvent cement contains volatile organic solvents such as tetrahydrofuran (THF) and cyclohexanone. These vapours are highly flammable and have narcotic effects at high concentrations. In confined or poorly ventilated spaces, vapour levels can build quickly, causing dizziness, headaches, and at extreme levels, unconsciousness.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 86,
    question: "What hazardous substance can be encountered when an electrician works near or disturbs old fluorescent light fittings?",
    options: [
      "Radon gas",
      "Mercury vapour from broken fluorescent tubes",
      "Benzene vapour",
      "Ammonia gas"
    ],
    correctAnswer: 1,
    explanation: "Fluorescent tubes contain a small amount of mercury vapour, which is released if the tube breaks. Mercury is toxic to the nervous system, kidneys, and lungs. Electricians removing or replacing old fluorescent fittings must handle tubes carefully and follow safe disposal procedures. Broken tubes should be cleaned up following HSE guidance.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 87,
    question: "What hazardous substance may be present in older electrical switchgear and transformers manufactured before the mid-1980s?",
    options: [
      "Polychlorinated biphenyls (PCBs)",
      "Silica powder",
      "Sodium hydroxide",
      "Nitrogen dioxide"
    ],
    correctAnswer: 0,
    explanation: "Polychlorinated biphenyls (PCBs) were widely used as insulating and cooling fluids in electrical transformers, capacitors, and switchgear until their production was banned in 1981. PCBs are persistent organic pollutants that are toxic, potentially carcinogenic, and bioaccumulative. Electricians working on older equipment must be aware of the risk.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 88,
    question: "What is the primary health risk from wood dust generated during first fix electrical work in timber-framed buildings?",
    options: [
      "Wood dust only causes cosmetic skin staining",
      "Hardwood dust is a recognised carcinogen (nasal cancer) and both hardwood and softwood dust can cause occupational asthma and dermatitis",
      "Wood dust only affects the eyes",
      "Wood dust is harmless if the wood is untreated"
    ],
    correctAnswer: 1,
    explanation: "Hardwood dust (e.g., oak, beech, mahogany) is classified as a Group 1 carcinogen by IARC, specifically linked to nasal adenocarcinoma. Both hardwood and softwood dusts can cause occupational asthma and dermatitis. The UK WEL for hardwood dust is 3 mg/m³ and for softwood dust is 5 mg/m³ (both 8-hour TWA).",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 89,
    question: "What biological hazard should be considered when electricians work in underground cable ducts, drains, or basements where rodents may be present?",
    options: [
      "Legionella bacteria",
      "Leptospirosis (Weil's disease) from contact with water or surfaces contaminated with rat urine",
      "Anthrax spores",
      "Hepatitis C from needle-stick injuries"
    ],
    correctAnswer: 1,
    explanation: "Leptospirosis (the severe form known as Weil's disease) is caused by Leptospira bacteria found in the urine of infected rats. Electricians working in underground ducts, basements, or cable trenches where rodents are present can be exposed through contaminated water or surfaces entering cuts, eyes, or mucous membranes.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Biological hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 90,
    question: "What hazardous substance is released when copper cables are stripped by burning off the insulation?",
    options: [
      "Only harmless water vapour",
      "Toxic fumes including hydrogen chloride, dioxins, and furans from burning PVC insulation",
      "Silica dust from the copper",
      "Carbon dioxide only"
    ],
    correctAnswer: 1,
    explanation: "Burning PVC cable insulation releases a cocktail of highly toxic substances including hydrogen chloride gas, dioxins, furans, and particulate matter. This practice is illegal under the Environmental Protection Act 1990 and extremely hazardous to health. Cable stripping must be done mechanically, never by burning.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 91,
    question: "What COSHH hazard is associated with the use of cable-pulling lubricants in confined trunking or conduit runs?",
    options: [
      "Lubricants are all water-based and completely harmless",
      "Some lubricants contain irritants or sensitisers that can cause skin reactions, and vapours can accumulate in confined spaces",
      "Lubricants only present a slip hazard, not a health hazard",
      "Lubricants are only hazardous if swallowed in large quantities"
    ],
    correctAnswer: 1,
    explanation: "Some cable-pulling lubricants contain chemical additives that can cause skin irritation, sensitisation, or eye irritation. In confined conduit runs or cable trays, vapours from solvent-based lubricants can accumulate. The SDS should always be checked before use, and appropriate gloves and ventilation should be provided.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 92,
    question: "Why is construction dust classified as a significant health hazard even when it appears to be 'ordinary' dust?",
    options: [
      "Because any dust is automatically a carcinogen",
      "Because construction dust often contains respirable crystalline silica, and even 'low-toxicity' dusts can cause lung disease at high or prolonged exposures",
      "Because dust only becomes harmful when mixed with water",
      "Because construction dust always contains asbestos"
    ],
    correctAnswer: 1,
    explanation: "Construction dust is rarely 'ordinary'. Materials like concrete, brick, mortar, and sandstone all contain crystalline silica. Even dusts without silica content can cause chronic lung disease at high exposures. The HSE estimates that construction workers are at significant risk and has specific guidance on controlling construction dust.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 93,
    question: "What hazardous substance can be released when cutting galvanised metal cable tray or trunking with a disc cutter?",
    options: [
      "Carbon monoxide",
      "Zinc oxide fume from the galvanised coating, which can cause metal fume fever",
      "Chlorine gas",
      "Hydrogen sulphide"
    ],
    correctAnswer: 1,
    explanation: "Galvanised steel is coated with zinc for corrosion protection. Cutting, grinding, or welding galvanised steel heats the zinc coating, producing zinc oxide fume. Inhaling this fume causes metal fume fever, with flu-like symptoms appearing several hours after exposure. Adequate ventilation or RPE should be used.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 94,
    question: "What is the COSHH hazard when working with two-pack epoxy resin products used for cable joints and potting compounds?",
    options: [
      "Epoxy resins are completely inert and non-hazardous once mixed",
      "The resin and hardener components can cause severe skin sensitisation (allergic contact dermatitis) and respiratory sensitisation",
      "Epoxy products only present a fire hazard",
      "Epoxy products are only harmful to the eyes"
    ],
    correctAnswer: 1,
    explanation: "Epoxy resin systems contain bisphenol A diglycidyl ether (BADGE) and amine or anhydride hardeners, which are potent skin and respiratory sensitisers. Once sensitised, a worker may react to very small exposures. Appropriate chemically resistant gloves (nitrile, not latex), eye protection, and ventilation are essential when handling epoxy products.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 95,
    question: "Which of the following biological hazards can affect electricians working on or near air-conditioning and cooling systems?",
    options: [
      "Lyme disease from tick bites",
      "Legionella bacteria causing Legionnaires' disease",
      "Tetanus from rusty metal",
      "Ringworm from contaminated surfaces"
    ],
    correctAnswer: 1,
    explanation: "Legionella bacteria thrive in warm water systems between 20-45°C, including cooling towers, evaporative condensers, and some hot water systems. Electricians working on controls, sensors, or wiring near these systems can be exposed to contaminated water droplets (aerosols). Legionnaires' disease is a severe form of pneumonia that can be fatal.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Biological hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 96,
    question: "What hazardous substance is present in SF6 (sulphur hexafluoride) gas used in high-voltage switchgear?",
    options: [
      "SF6 is non-toxic in its pure form but becomes hazardous when decomposed by electrical arcing, producing toxic by-products including sulphur dioxide",
      "SF6 is a powerful acid",
      "SF6 is a respiratory sensitiser",
      "SF6 is a carcinogen in all forms"
    ],
    correctAnswer: 0,
    explanation: "Pure SF6 is non-toxic but is an asphyxiant in high concentrations as it displaces oxygen. More importantly, when SF6 is decomposed by electrical arcing or discharge within switchgear, it produces highly toxic by-products including sulphur dioxide, hydrogen fluoride, and metal fluorides. Electricians must never open SF6-filled equipment without specialist training.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 97,
    question: "What COSHH-relevant hazard is created when using angle grinders to cut chases in brickwork for electrical cables?",
    options: [
      "Only a noise hazard — no substance hazard is created",
      "High concentrations of respirable dust including crystalline silica, requiring dust suppression or extraction",
      "Emission of carbon monoxide gas",
      "Release of biological agents from the brick"
    ],
    correctAnswer: 1,
    explanation: "Angle grinding or chasing brickwork generates extremely high concentrations of respirable dust, a significant proportion of which is respirable crystalline silica. Without controls such as on-tool extraction or water suppression, exposure can rapidly exceed the WEL of 0.1 mg/m³. This is one of the highest-risk activities for silica exposure on site.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 98,
    question: "What is the COSHH risk from mineral insulating oil found in older transformers and switchgear?",
    options: [
      "Mineral oil presents no health risk at all",
      "Mineral oil can cause skin irritation, oil acne, and dermatitis on prolonged or repeated skin contact, and oil mist can irritate the respiratory tract",
      "Mineral oil is only hazardous if it catches fire",
      "Mineral oil only damages clothing, not health"
    ],
    correctAnswer: 1,
    explanation: "Prolonged or repeated skin contact with mineral insulating oil can cause irritant contact dermatitis, folliculitis (oil acne), and in some cases, skin cancer from certain untreated or mildly treated mineral oils. Oil mist generated during maintenance can irritate the respiratory tract. Barrier cream, gloves, and good hygiene practices are essential.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Electrical trade hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 99,
    question: "Which of the following is a hazardous substance commonly used in fire-stopping and sealing around electrical penetrations?",
    options: [
      "Plain water",
      "Intumescent sealants and mastics which may contain irritants, sensitisers, or isocyanates",
      "Standard household silicone sealant with no hazards",
      "Wood filler"
    ],
    correctAnswer: 1,
    explanation: "Intumescent fire-stop sealants, mastics, and foams used to seal around cable penetrations through fire-rated walls and floors often contain chemical irritants, sensitisers, or isocyanates. Some expanding foam products release isocyanate vapour during application. The SDS must be checked and appropriate PPE worn.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },
  {
    id: 100,
    question: "What hazardous substance can electricians be exposed to when lifting floor tiles or ceiling tiles in buildings constructed between the 1950s and 1990s?",
    options: [
      "Only ordinary dust with no specific hazard",
      "Asbestos fibres from asbestos-containing tiles, adhesives, or backing materials",
      "Lead vapour from the tile glaze",
      "Formaldehyde from the tile resin"
    ],
    correctAnswer: 1,
    explanation: "Many floor tiles (particularly thermoplastic tiles), ceiling tiles, and tile adhesives used between the 1950s and late 1990s contained asbestos. While asbestos is excluded from COSHH (having its own regulations), electricians must be aware that disturbing these materials releases asbestos fibres. A refurbishment/demolition survey should identify any ACMs before work begins.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Construction hazards",
    category: "Hazardous Substances on Site"
  },

  // ===== Questions 101-200 (merged) =====
// ===== HAZARDOUS SUBSTANCES ON SITE (continued) — 20 questions (id 101-120) =====
{
  id: 101,
  question: "What is the primary health risk associated with prolonged exposure to respirable crystalline silica (RCS) dust on construction sites?",
  options: ["Contact dermatitis", "Silicosis and lung cancer", "Noise-induced hearing loss", "Vibration white finger"],
  correctAnswer: 1,
  explanation: "Prolonged inhalation of RCS dust can cause silicosis, a serious and irreversible lung disease, and is classified as a Group 1 carcinogen by IARC, meaning it can cause lung cancer. The workplace exposure limit for RCS is 0.1 mg/m³ as an 8-hour TWA.",
  category: "Hazardous Substances on Site",
  difficulty: "basic"
},
{
  id: 102,
  question: "When chasing walls or cutting concrete blocks, which type of dust extraction is considered best practice under COSHH?",
  options: ["General room ventilation only", "On-tool extraction (LEV) with H-class vacuum", "Dampening the area with a garden hose", "Wearing a disposable dust mask without extraction"],
  correctAnswer: 1,
  explanation: "On-tool extraction using an H-class vacuum is the most effective engineering control for capturing silica dust at the point of generation. H-class vacuums are designed to capture hazardous dusts with a filtration efficiency of 99.995%, preventing them from becoming airborne.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 103,
  question: "What class of biological hazard might an electrician encounter when rewiring in an old loft space contaminated with pigeon droppings?",
  options: ["Carcinogenic substances", "Biological agents including fungi and bacteria", "Radioactive materials", "Oxidising agents"],
  correctAnswer: 1,
  explanation: "Dried pigeon droppings can harbour biological agents including the fungus Cryptococcus neoformans and bacteria such as Chlamydia psittaci. Under COSHH, biological agents are classified into hazard groups 1-4, and appropriate respiratory protection and hygiene measures are required.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 104,
  question: "What is the workplace exposure limit (WEL) for inhalable dust (particles not otherwise specified) under EH40?",
  options: ["0.1 mg/m³", "4 mg/m³", "10 mg/m³", "20 mg/m³"],
  correctAnswer: 2,
  explanation: "The WEL for inhalable dust (PNOS) is 10 mg/m³ as an 8-hour TWA, while respirable dust (PNOS) has a WEL of 4 mg/m³. These are general limits that apply when no substance-specific WEL has been assigned under EH40.",
  category: "Hazardous Substances on Site",
  difficulty: "basic"
},
{
  id: 105,
  question: "An electrician is installing containment in a room where spray painting is taking place. Which type of hazard is isocyanate paint most associated with?",
  options: ["Skin burns only", "Occupational asthma (respiratory sensitiser)", "Liver damage", "Reproductive toxicity"],
  correctAnswer: 1,
  explanation: "Isocyanates are potent respiratory sensitisers and are the most common cause of occupational asthma in the UK. Once sensitised, even very low exposures can trigger severe asthma attacks. They carry the GHS hazard statement H334 (may cause allergy or asthma symptoms if inhaled).",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 106,
  question: "Under COSHH, which of the following is classified as a biological agent hazard group 3 organism?",
  options: ["E. coli (non-pathogenic strain)", "Legionella pneumophila", "Baker's yeast", "Common bread mould"],
  correctAnswer: 1,
  explanation: "Legionella pneumophila is classified as a hazard group 3 biological agent under the Approved List of Biological Agents. It can cause Legionnaires' disease, a potentially fatal form of pneumonia. Electricians may encounter Legionella risks when working near cooling towers or water systems.",
  category: "Hazardous Substances on Site",
  difficulty: "advanced"
},
{
  id: 107,
  question: "What does the GHS hazard pictogram showing a person with a starburst on their chest indicate?",
  options: ["Acute toxicity", "Serious health hazard (CMR, sensitiser, STOT)", "Corrosive to metals", "Environmental hazard"],
  correctAnswer: 1,
  explanation: "The 'health hazard' pictogram (GHS08) indicates serious longer-term health hazards including carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitisation, specific target organ toxicity, and aspiration hazard. It is distinct from the skull and crossbones which indicates acute toxicity.",
  category: "Hazardous Substances on Site",
  difficulty: "basic"
},
{
  id: 108,
  question: "When pulling cables through ceiling voids in a hospital, what type of hazardous substance might be present in old lagging around pipework?",
  options: ["Lead paint only", "Asbestos-containing materials", "Polychlorinated biphenyls only", "Carbon monoxide"],
  correctAnswer: 1,
  explanation: "Old pipe lagging in buildings constructed before 2000 may contain asbestos, particularly amosite (brown asbestos) or chrysotile (white asbestos). Under the Control of Asbestos Regulations 2012, a refurbishment/demolition asbestos survey should be carried out before invasive work in such areas.",
  category: "Hazardous Substances on Site",
  difficulty: "basic"
},
{
  id: 109,
  question: "What is the short-term exposure limit (STEL) period defined in EH40 for workplace exposure limits?",
  options: ["5 minutes", "15 minutes", "30 minutes", "1 hour"],
  correctAnswer: 1,
  explanation: "A STEL in EH40 is measured over a 15-minute reference period. It is intended to prevent acute health effects from brief high-concentration exposures. Employers must ensure that both 8-hour TWA and 15-minute STEL values are not exceeded.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 110,
  question: "Welding fume was reclassified by IARC in 2017. What is its current carcinogenicity classification?",
  options: ["Group 2B — possibly carcinogenic", "Group 2A — probably carcinogenic", "Group 1 — carcinogenic to humans", "Not classified as carcinogenic"],
  correctAnswer: 2,
  explanation: "In 2017, IARC reclassified all welding fume as Group 1 (carcinogenic to humans), upgrading it from Group 2B. This led the HSE to strengthen enforcement expectations, requiring LEV or RPE for all welding activities including mild steel welding, which was previously considered lower risk.",
  category: "Hazardous Substances on Site",
  difficulty: "advanced"
},
{
  id: 111,
  question: "What is the main route of entry for solvents such as toluene and xylene used in electrical cleaning products?",
  options: ["Ingestion only", "Injection through skin puncture", "Inhalation and skin absorption", "Through the eyes only"],
  correctAnswer: 2,
  explanation: "Solvents like toluene and xylene can enter the body through both inhalation of vapours and absorption through the skin. They carry both H332 (harmful if inhaled) and H312 (harmful in contact with skin) hazard statements. Adequate ventilation and appropriate gloves are both required as control measures.",
  category: "Hazardous Substances on Site",
  difficulty: "basic"
},
{
  id: 112,
  question: "An electrician discovers unlabelled containers of chemicals in a plant room. What should they do first?",
  options: ["Smell the contents to try to identify them", "Pour a small amount out to check the colour", "Stop work, do not handle them, and report to the supervisor", "Assume they are harmless cleaning products"],
  correctAnswer: 2,
  explanation: "Unlabelled chemical containers must never be handled, opened, or investigated by unqualified personnel. Under COSHH Regulation 7, the employer must ensure substances are properly labelled. The correct action is to stop work, avoid contact, and report to the supervisor so the substances can be properly identified.",
  category: "Hazardous Substances on Site",
  difficulty: "basic"
},
{
  id: 113,
  question: "Which of the following fumes is most likely to cause metal fume fever in an electrician working near welding operations?",
  options: ["Lead fume", "Zinc oxide fume from galvanised steel", "Cadmium fume", "Chromium VI fume"],
  correctAnswer: 1,
  explanation: "Metal fume fever is most commonly caused by inhaling zinc oxide fume, produced when welding or cutting galvanised steel. Symptoms resemble influenza and typically appear 4-8 hours after exposure. While it usually resolves within 24-48 hours, repeated exposures should be avoided through adequate LEV and RPE.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 114,
  question: "What type of health hazard does SF₆ (sulphur hexafluoride) present when used in high-voltage switchgear?",
  options: ["It is a respiratory sensitiser", "It is a simple asphyxiant that displaces oxygen", "It causes chemical burns on contact", "It is carcinogenic"],
  correctAnswer: 1,
  explanation: "SF₆ is an odourless, colourless gas used as an insulating medium in high-voltage switchgear. While non-toxic at normal temperatures, it is heavier than air and can accumulate in confined spaces, displacing oxygen and causing asphyxiation. Adequate ventilation and gas monitoring are essential when working in areas where SF₆ may leak.",
  category: "Hazardous Substances on Site",
  difficulty: "advanced"
},
{
  id: 115,
  question: "Under COSHH, what must an employer provide to employees who are exposed to substances hazardous to health?",
  options: ["A cash bonus for hazardous work", "Suitable and sufficient information, instruction and training", "Only written safety data sheets", "Verbal warnings at the start of each shift"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 12 requires employers to provide suitable and sufficient information, instruction, and training to employees who may be exposed to hazardous substances. This includes details about the risks, precautions, control measures, and the results of any monitoring or health surveillance.",
  category: "Hazardous Substances on Site",
  difficulty: "basic"
},
{
  id: 116,
  question: "What hazard do PCBs (polychlorinated biphenyls) present, which may be found in older electrical equipment such as capacitors and transformers?",
  options: ["Flammable gas risk only", "Persistent organic pollutant; probable carcinogen and endocrine disruptor", "Acute skin irritant only", "Oxygen-depleting agent"],
  correctAnswer: 1,
  explanation: "PCBs are classified as persistent organic pollutants and probable human carcinogens (IARC Group 1). They were widely used in transformer oils and capacitors until banned in the UK in 1981. Disposal of PCB-containing equipment must comply with the Environmental Permitting Regulations and specialist waste procedures.",
  category: "Hazardous Substances on Site",
  difficulty: "advanced"
},
{
  id: 117,
  question: "What is the primary health effect of nitrogen dioxide (NO₂), which can be produced by diesel-powered generators on site?",
  options: ["Hearing damage", "Respiratory irritation and pulmonary oedema at high concentrations", "Skin sensitisation", "Liver failure"],
  correctAnswer: 1,
  explanation: "Nitrogen dioxide is a respiratory irritant that can cause inflammation of the airways and, at high concentrations, pulmonary oedema (fluid in the lungs). The WEL for NO₂ is 0.96 mg/m³ (0.5 ppm) 8-hour TWA. Diesel exhaust itself was classified as carcinogenic (IARC Group 1) in 2012.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 118,
  question: "When drilling into painted surfaces in pre-1960s buildings, what hazardous substance should electricians be particularly aware of?",
  options: ["Formaldehyde", "Lead in paint", "Mercury vapour", "Hydrogen cyanide"],
  correctAnswer: 1,
  explanation: "Lead-based paint was widely used in buildings before 1960 and was not fully phased out until the 1992 ban on lead in decorative paint. Drilling or sanding lead paint generates hazardous dust. The WEL for lead is 0.15 mg/m³, and work with lead is also covered by the Control of Lead at Work Regulations 2002.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 119,
  question: "What does the term 'respirable dust fraction' refer to in occupational hygiene?",
  options: ["Dust particles visible to the naked eye", "Airborne particles small enough to reach the gas exchange region of the lungs (alveoli)", "Only fibrous dust such as asbestos", "Dust that settles on surfaces within one hour"],
  correctAnswer: 1,
  explanation: "The respirable dust fraction consists of airborne particles typically less than about 10 micrometres aerodynamic diameter that can penetrate deep into the lungs and reach the alveoli. This is where the most serious health damage occurs, including conditions like pneumoconiosis and silicosis.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
{
  id: 120,
  question: "Under COSHH, what is the legal requirement regarding safety data sheets (SDS) for hazardous substances used at work?",
  options: ["They are only required for substances classified as explosive", "The supplier must provide them and the employer must make them accessible to employees", "They are optional guidance documents with no legal standing", "Only the site safety officer needs access to them"],
  correctAnswer: 1,
  explanation: "Under REACH Regulation (Article 31) and COSHH, suppliers must provide a 16-section safety data sheet for hazardous substances. Employers must ensure these are available to employees who use the substances. The SDS provides critical information including hazard identification, first aid measures, handling, storage, and exposure controls.",
  category: "Hazardous Substances on Site",
  difficulty: "intermediate"
},
// ===== CONTROL MEASURES & PPE — 40 questions (id 121-160) =====
{
  id: 121,
  question: "What is the correct order of the hierarchy of control measures under COSHH?",
  options: ["PPE, engineering controls, elimination, substitution", "Elimination, substitution, engineering controls, administrative controls, PPE", "PPE, administrative controls, substitution, elimination", "Engineering controls, elimination, PPE, substitution"],
  correctAnswer: 1,
  explanation: "The hierarchy of control follows the principle that the most effective measures should be considered first: elimination, substitution, engineering controls (such as LEV), administrative controls (procedures, training, signage), and finally PPE as a last resort. COSHH Regulation 7 requires employers to apply this hierarchy.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 122,
  question: "What does LEV stand for in the context of COSHH control measures?",
  options: ["Low Energy Ventilation", "Local Exhaust Ventilation", "Limited Exposure Value", "Laboratory Environment Verification"],
  correctAnswer: 1,
  explanation: "Local Exhaust Ventilation (LEV) is an engineering control that captures airborne contaminants at or near the source before they can spread into the workplace air. Under COSHH Regulation 9, LEV systems must be examined and tested at least every 14 months (or 6 months for certain processes).",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 123,
  question: "How often must LEV systems be thoroughly examined and tested under COSHH Regulation 9?",
  options: ["Every 6 months for all systems", "At least every 14 months, or every 6 months for certain specified processes", "Only when a fault is reported", "Every 3 years as part of the building survey"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 9 requires LEV systems to be thoroughly examined and tested at least every 14 months. However, for certain processes listed in Schedule 4 (e.g., processes involving lead, asbestos), the interval is reduced to 6 months. Records must be kept for at least 5 years.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 124,
  question: "An FFP2 disposable respirator provides a minimum assigned protection factor (APF) of what value?",
  options: ["APF 4", "APF 10", "APF 20", "APF 40"],
  correctAnswer: 1,
  explanation: "An FFP2 disposable filtering facepiece respirator has an assigned protection factor (APF) of 10, meaning it can be used in atmospheres up to 10 times the WEL. FFP1 has APF 4, FFP2 has APF 10, and FFP3 has APF 20. These values are specified in BS EN 149.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 125,
  question: "What is the assigned protection factor (APF) of an FFP3 disposable respirator?",
  options: ["APF 4", "APF 10", "APF 20", "APF 40"],
  correctAnswer: 2,
  explanation: "An FFP3 disposable filtering facepiece has an APF of 20, meaning it provides protection in concentrations up to 20 times the WEL. FFP3 is the highest rated disposable respirator and is required for protection against substances such as asbestos fibres and silica dust.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 126,
  question: "Why must RPE (Respiratory Protective Equipment) be face-fit tested for the individual wearer?",
  options: ["To check the colour matches their overalls", "To ensure an adequate seal between the facepiece and the wearer's face", "Face-fit testing is only recommended, not required", "To measure the wearer's lung capacity"],
  correctAnswer: 1,
  explanation: "Face-fit testing is a legal requirement under COSHH to ensure that tight-fitting RPE provides an adequate seal against the wearer's face. A poor seal allows contaminated air to bypass the filter, significantly reducing protection. Both qualitative (taste test) and quantitative (instrument-based) methods are accepted.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 127,
  question: "Which of the following would prevent an adequate face seal when wearing a tight-fitting respirator?",
  options: ["Clean-shaven skin in the seal area", "Wearing safety spectacles with a full-face mask designed for them", "Facial stubble or a beard in the seal area", "Having the correct size of facepiece"],
  correctAnswer: 2,
  explanation: "Facial hair in the area where the respirator seals against the face breaks the seal and allows contaminated air to leak in. The HSE publication RPE-OC-282/28 states that tight-fitting RPE will not protect wearers who have stubble, beards, or sideburns that interfere with the face seal.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 128,
  question: "What type of RPE is suitable for a worker with facial hair who needs respiratory protection?",
  options: ["FFP3 disposable mask", "Half-face reusable respirator", "Powered air-purifying respirator with loose-fitting hood", "Any tight-fitting respirator one size larger"],
  correctAnswer: 2,
  explanation: "Workers with facial hair that prevents a face seal must use loose-fitting RPE such as a powered air-purifying respirator (PAPR) with a hood or helmet. These do not rely on a face seal but instead maintain positive pressure inside the headtop, providing an APF of typically 20-40 depending on the device.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 129,
  question: "What is the minimum APF required for RPE when working with asbestos (non-licensed work)?",
  options: ["APF 4 (FFP1)", "APF 10 (FFP2)", "APF 20 (FFP3)", "APF 40 (full-face)"],
  correctAnswer: 2,
  explanation: "For non-licensed asbestos work, a minimum of APF 20 (FFP3 disposable or equivalent) is required by HSE guidance. For licensed asbestos work, higher protection factors are typically needed depending on the type and duration of work. The RPE must also be face-fit tested for the individual wearer.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 130,
  question: "According to COSHH, when should PPE be considered as a control measure?",
  options: ["As the first line of defence", "Only when all other reasonably practicable measures are insufficient", "Only for carcinogenic substances", "Whenever the employee requests it"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 7(3) states that PPE should only be used as a control measure where other measures (elimination, substitution, engineering controls, administrative controls) are not reasonably practicable or are insufficient on their own. PPE is the last resort in the hierarchy of controls.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 131,
  question: "What type of glove material is generally recommended for handling solvent-based products containing ketones (e.g., MEK)?",
  options: ["Latex gloves", "Nitrile gloves", "Butyl rubber gloves", "Cotton gloves"],
  correctAnswer: 2,
  explanation: "Butyl rubber gloves offer the best resistance to ketone solvents such as MEK (methyl ethyl ketone). Nitrile and latex gloves have poor resistance to ketones and will degrade rapidly. The correct glove material should always be verified against the manufacturer's chemical resistance data and the safety data sheet.",
  category: "Control Measures & PPE",
  difficulty: "advanced"
},
{
  id: 132,
  question: "What does the term 'breakthrough time' mean when selecting chemical-resistant gloves?",
  options: ["The time it takes to put the gloves on", "The time taken for a chemical to permeate through the glove material", "The time before the gloves need replacing due to wear", "The maximum time gloves can be stored before expiry"],
  correctAnswer: 1,
  explanation: "Breakthrough time is the measured time it takes for a chemical to permeate through the glove material at a detectable rate under test conditions (EN 16523-1). It is critical for selecting appropriate gloves — a glove with a breakthrough time shorter than the task duration will not provide adequate protection.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 133,
  question: "What must an employer do if a COSHH assessment identifies that substitution of a hazardous substance is reasonably practicable?",
  options: ["Consider it but prioritise PPE for cost reasons", "Substitute the substance with a less hazardous alternative", "Only substitute if employees request it", "Record the option but take no action if current controls are in place"],
  correctAnswer: 1,
  explanation: "If substitution is identified as reasonably practicable, the employer must implement it under COSHH Regulation 7. Substitution sits high in the hierarchy of control (second only to elimination) and must be preferred over lower-level controls such as engineering controls or PPE wherever reasonably practicable.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 134,
  question: "What is the purpose of DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002)?",
  options: ["To regulate the transport of explosives on public roads", "To protect workers from risks of fire and explosion from dangerous substances in the workplace", "To control the sale of fireworks", "To regulate the mining industry only"],
  correctAnswer: 1,
  explanation: "DSEAR requires employers to assess and control risks from dangerous substances that could cause fire, explosion, or similar energy-releasing events in the workplace. This includes flammable gases, liquids, and dusts. DSEAR implements the EU ATEX Workplace Directive (1999/92/EC) in the UK.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 135,
  question: "Under DSEAR, what does 'ATEX zone classification' determine?",
  options: ["The temperature rating of electrical equipment", "The likelihood and duration of an explosive atmosphere occurring in an area", "The maximum number of workers allowed in an area", "The fire resistance of building materials"],
  correctAnswer: 1,
  explanation: "ATEX zone classification categorises areas based on the likelihood and duration of explosive atmospheres. Zone 0/20 indicates continuous or frequent presence, Zone 1/21 indicates occasional presence during normal operations, and Zone 2/22 indicates unlikely during normal operations. Electrical equipment must be selected to match the zone.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 136,
  question: "An electrician needs to install equipment in an ATEX Zone 1 area. What category of equipment is required?",
  options: ["Category 3 equipment", "Category 2 equipment", "Category 1 equipment", "Standard commercial equipment"],
  correctAnswer: 1,
  explanation: "ATEX Zone 1 requires Category 2 equipment, which provides a high level of protection and remains safe even with one fault condition. Category 1 is for Zone 0 (highest protection), Category 2 for Zone 1, and Category 3 for Zone 2. Equipment must be certified and marked with the Ex symbol.",
  category: "Control Measures & PPE",
  difficulty: "advanced"
},
{
  id: 137,
  question: "What is the correct method for storing incompatible chemicals in a workplace under COSHH?",
  options: ["All chemicals can be stored together in one locked cupboard", "Incompatible chemicals must be segregated, stored in separate areas or bunded containers", "Chemicals only need separating if they are different colours", "Segregation is only required for quantities over 100 litres"],
  correctAnswer: 1,
  explanation: "Incompatible chemicals (e.g., oxidisers and flammables, acids and alkalis) must be stored separately to prevent dangerous reactions in the event of leakage or spillage. Storage should follow HSG71 guidance, using separate bunded areas, appropriate ventilation, and correct temperature controls.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 138,
  question: "What does bunding or secondary containment achieve in hazardous substance storage?",
  options: ["It prevents theft of chemicals", "It contains leaks and spills to prevent environmental contamination and spread", "It keeps chemicals at the correct temperature", "It provides fire resistance only"],
  correctAnswer: 1,
  explanation: "Bunding provides secondary containment around chemical storage to capture any leaks or spills, preventing them from spreading to drains, watercourses, or other areas. UK guidance typically requires bund capacity of 110% of the largest container or 25% of the total storage capacity, whichever is greater.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 139,
  question: "What should be included in a COSHH spill kit for a workshop using solvent-based products?",
  options: ["Only paper towels and a dustpan", "Absorbent materials, PPE (gloves, goggles, apron), waste bags, and instructions", "A bucket of water and soap", "A fire extinguisher only"],
  correctAnswer: 1,
  explanation: "A COSHH spill kit should contain appropriate absorbent materials (granules or pads), chemical-resistant PPE (gloves, goggles, apron or overalls), hazardous waste bags or containers, and clear instructions for the specific substances used. Staff must be trained in its use and the kit should be checked regularly.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 140,
  question: "Why is it important to check that RPE filters are appropriate for the specific hazardous substance?",
  options: ["All filters protect against all substances equally", "Different filter types protect against different classes of substance; the wrong filter provides no protection", "Filters are only needed for dust, not gases", "The filter type only affects comfort, not protection"],
  correctAnswer: 1,
  explanation: "RPE filters are substance-specific: particle filters (P1/P2/P3) protect against dusts, fumes, and mists; gas/vapour filters (A, B, E, K types) are designed for specific chemical classes. Using the wrong filter type provides little or no protection. Filter selection must be based on the COSHH assessment and SDS information.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 141,
  question: "What colour coding is used for a Type A gas filter on a reusable respirator (designed for organic vapours with boiling point above 65°C)?",
  options: ["Grey", "Brown", "Yellow", "Green"],
  correctAnswer: 1,
  explanation: "Type A gas filters are brown and protect against certain organic gases and vapours with boiling points above 65°C. Type B (grey) is for inorganic gases, Type E (yellow) is for sulphur dioxide and hydrogen chloride, and Type K (green) is for ammonia. Multi-gas filters combine colour bands.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 142,
  question: "What is the purpose of a qualitative face-fit test using bitter or sweet aerosol?",
  options: ["To measure the exact concentration of contaminant inside the mask", "To check if the wearer can detect the test aerosol through the facepiece, indicating a leak", "To calibrate the respirator's filters", "To determine the wearer's lung capacity"],
  correctAnswer: 1,
  explanation: "A qualitative face-fit test uses a taste agent (bitter Bitrex or sweet saccharin) sprayed around a hood worn over the respirator. If the wearer can taste the aerosol, it indicates a poor face seal. This is a pass/fail test suitable for disposable and half-mask respirators but not for full-face masks.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 143,
  question: "What is the key advantage of quantitative face-fit testing over qualitative testing?",
  options: ["It is cheaper to perform", "It provides a numerical fit factor, giving a more precise and objective measure of the seal", "It does not require any equipment", "It can be performed by the wearer without supervision"],
  correctAnswer: 1,
  explanation: "Quantitative face-fit testing uses instruments such as a PortaCount to measure the actual ratio of ambient particles outside the mask to those inside, producing a numerical fit factor. This is more objective and precise than the pass/fail qualitative method and is required for full-face masks.",
  category: "Control Measures & PPE",
  difficulty: "advanced"
},
{
  id: 144,
  question: "Under COSHH, who is responsible for ensuring that control measures including PPE are properly used?",
  options: ["Only the employee", "Only the health and safety inspector", "The employer, with duties on employees to cooperate", "The PPE manufacturer"],
  correctAnswer: 2,
  explanation: "Under COSHH Regulation 8, the employer must take reasonable steps to ensure control measures are properly used, and under Regulation 8(2), employees must make full and proper use of control measures provided. Both parties have legal duties — employers to provide and maintain, employees to use and report defects.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 145,
  question: "What does 'COSHH essentials' refer to in HSE guidance?",
  options: ["A brand of PPE", "A web-based tool that helps small businesses carry out COSHH assessments and identify control measures", "The full text of the COSHH Regulations", "A training course provided by the HSE"],
  correctAnswer: 1,
  explanation: "COSHH Essentials is a free, web-based guidance tool provided by the HSE to help employers, particularly small businesses, carry out COSHH risk assessments. It uses a hazard banding approach based on the substance's hazard classification, the amount used, and how it is used to recommend appropriate control measures.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 146,
  question: "What is the correct procedure for disposing of used chemical-resistant gloves that have been in contact with hazardous substances?",
  options: ["Place in general waste", "Rinse and reuse indefinitely", "Dispose of as hazardous waste or contaminated waste as per the COSHH assessment and SDS", "Return to the manufacturer for recycling"],
  correctAnswer: 2,
  explanation: "Used PPE contaminated with hazardous substances must be treated as contaminated waste and disposed of according to the COSHH assessment, the SDS, and relevant waste regulations. In some cases, this means hazardous waste disposal with a licensed waste carrier. Simply placing them in general waste may cause environmental contamination.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 147,
  question: "What does the CE/UKCA marking on PPE indicate?",
  options: ["The PPE has been tested by the employer", "The PPE conforms to the relevant essential health and safety requirements and standards", "The PPE was manufactured in the UK", "The PPE is suitable for all hazards"],
  correctAnswer: 1,
  explanation: "The UKCA (or CE) marking on PPE indicates that the product meets the essential health and safety requirements set out in the PPE Regulation (EU 2016/425, retained in UK law). It means the product has been assessed and certified by a notified body (for Category II and III PPE) and is fit for its intended protective purpose.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 148,
  question: "An electrician is working in a confined space with potential for hydrogen sulphide (H₂S) exposure. What type of RPE is most appropriate?",
  options: ["FFP2 disposable mask", "Half-face respirator with particle filter", "Self-contained breathing apparatus (SCBA) or airline breathing apparatus", "Nuisance dust mask"],
  correctAnswer: 2,
  explanation: "In a confined space with potential H₂S exposure, which can be immediately dangerous to life (IDLH at 100 ppm), supplied-air RPE such as SCBA or airline breathing apparatus is required. Filtering facepieces and gas filter respirators are not suitable for IDLH atmospheres or oxygen-deficient environments.",
  category: "Control Measures & PPE",
  difficulty: "advanced"
},
{
  id: 149,
  question: "What PPE category under the PPE Regulation covers respiratory protective equipment designed to protect against serious or irreversible health risks?",
  options: ["Category I — minimal risks", "Category II — intermediate risks", "Category III — serious, irreversible or fatal risks", "Category IV — catastrophic risks"],
  correctAnswer: 2,
  explanation: "RPE falls under Category III of the PPE Regulation because it protects against hazards that could cause serious, irreversible, or fatal health effects. Category III PPE requires type-examination by a notified body and ongoing production quality assurance. This also includes PPE for chemical risks and electrical hazards.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 150,
  question: "What is the minimum standard that a disposable FFP respirator must meet in the UK?",
  options: ["BS EN 166", "BS EN 149:2001+A1:2009", "BS EN 388", "BS EN 374"],
  correctAnswer: 1,
  explanation: "Disposable filtering facepiece respirators (FFP1, FFP2, FFP3) must conform to BS EN 149:2001+A1:2009. This standard specifies construction requirements, filter performance, breathing resistance, and face-fit requirements. BS EN 166 covers eye protection, BS EN 388 covers protective gloves for mechanical risks.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 151,
  question: "When using a half-face respirator with combination filters (e.g., A2P3), what does the 'A2' designation indicate?",
  options: ["Particle filtration class 2", "Type A gas filter with medium capacity (class 2)", "Air flow rate of 2 litres per minute", "Assigned protection factor of 2"],
  correctAnswer: 1,
  explanation: "The 'A2' designation means it is a Type A gas filter (for organic vapours with boiling points above 65°C) with a class 2 (medium) capacity. Gas filter classes run from 1 (low capacity) to 3 (high capacity). The 'P3' indicates a class 3 particle filter providing the highest particle filtration efficiency.",
  category: "Control Measures & PPE",
  difficulty: "advanced"
},
{
  id: 152,
  question: "Why should aerosol-generating procedures (e.g., spray application of chemicals) receive special consideration in a COSHH assessment?",
  options: ["Aerosols are always non-hazardous", "Aerosol generation increases the concentration of airborne particles and the risk of inhalation exposure", "Aerosols only affect the eyes, not the lungs", "Spray application reduces the hazard of a substance"],
  correctAnswer: 1,
  explanation: "Aerosol-generating procedures create fine droplets or particles that remain airborne for longer and penetrate deeper into the respiratory system than larger droplets. This significantly increases inhalation exposure risk. COSHH assessments must account for the method of use, and spray application typically requires higher-level controls such as LEV and RPE.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 153,
  question: "What is the correct action if an employee notices their RPE filter is damaged or the facepiece is cracked?",
  options: ["Continue using it until the end of the shift", "Tape over the damage with electrical tape", "Stop using it immediately, leave the hazardous area, and obtain a replacement", "Swap it with a colleague's RPE"],
  correctAnswer: 2,
  explanation: "Damaged RPE must be taken out of service immediately as it cannot provide adequate protection. The wearer should leave the contaminated area and obtain a replacement. Under COSHH Regulation 8(2), employees must report defects in control measures. Temporary repairs are not acceptable for RPE.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 154,
  question: "What is the purpose of engineering controls such as enclosed systems or glove boxes in COSHH compliance?",
  options: ["To make processes faster", "To totally contain hazardous substances and prevent any release into the workplace atmosphere", "To reduce the cost of PPE", "To improve the appearance of the workplace"],
  correctAnswer: 1,
  explanation: "Enclosed systems and glove boxes provide total containment, preventing hazardous substances from being released into the workplace air. This is a high-level engineering control sitting above LEV in effectiveness, and is particularly important for highly toxic substances, carcinogens, and biological agents.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 155,
  question: "Under DSEAR, what are the three elements of the 'fire triangle' that must be controlled to prevent fire or explosion from dangerous substances?",
  options: ["Heat, light, and sound", "Fuel, oxygen, and a source of ignition", "Pressure, temperature, and volume", "Fuel, water, and electricity"],
  correctAnswer: 1,
  explanation: "The fire triangle requires fuel (the dangerous substance), oxygen (from air or an oxidising agent), and a source of ignition (spark, flame, hot surface). DSEAR requires employers to control these elements — typically by eliminating or reducing fuel, controlling ignition sources, and in some cases, reducing oxygen through inerting.",
  category: "Control Measures & PPE",
  difficulty: "basic"
},
{
  id: 156,
  question: "An electrician needs to use a chemical with WEL of 5 ppm. Air monitoring shows exposure at 15 ppm. What minimum APF is needed for RPE selection?",
  options: ["APF 2", "APF 3", "APF 4 (FFP1)", "APF 10 (FFP2)"],
  correctAnswer: 2,
  explanation: "The minimum APF needed is calculated by dividing the measured concentration by the WEL: 15 ÷ 5 = 3. You must then select RPE with an APF at or above this value. The next available standard APF is 4 (FFP1). However, good practice recommends selecting RPE with a higher APF to provide a safety margin, so FFP2 (APF 10) may be preferred.",
  category: "Control Measures & PPE",
  difficulty: "advanced"
},
{
  id: 157,
  question: "What is the employer's duty regarding PPE maintenance under the Personal Protective Equipment at Work Regulations 1992?",
  options: ["PPE only needs replacing when it breaks", "PPE must be maintained in an efficient state, in efficient working order, and in good repair", "Employees are solely responsible for maintaining their own PPE", "PPE maintenance is only required annually"],
  correctAnswer: 1,
  explanation: "Regulation 7 of the PPE at Work Regulations 1992 (as amended 2022) requires employers to ensure PPE is maintained in an efficient state, in efficient working order, and in good repair. This includes regular inspection, cleaning, storage in appropriate conditions, and replacement when necessary.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 158,
  question: "What type of eye protection is appropriate when handling corrosive chemicals such as battery acid?",
  options: ["Standard prescription spectacles", "Safety spectacles with side shields only", "Chemical splash goggles to EN 166 with '3' marking for liquid droplets", "Sunglasses"],
  correctAnswer: 2,
  explanation: "Chemical splash goggles conforming to EN 166 with the '3' marking (protection against liquid droplets) are required when handling corrosive chemicals. Standard safety spectacles do not provide adequate protection against splashes as they do not seal against the face. A face shield may also be needed for larger splash risks.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 159,
  question: "What is the key requirement for chemical storage areas under COSHH with respect to ventilation?",
  options: ["Natural ventilation is always sufficient", "Adequate ventilation must be provided to prevent accumulation of hazardous vapours or gases", "Ventilation is only needed if flammable substances are stored", "Sealed rooms with no ventilation are preferred to contain fumes"],
  correctAnswer: 1,
  explanation: "COSHH requires that chemical storage areas have adequate ventilation to prevent the accumulation of hazardous vapours or gases, which could create health risks or explosive atmospheres. The type and rate of ventilation should be based on the substances stored, their volatility, and the quantities involved.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
{
  id: 160,
  question: "When selecting gloves for protection against chemical hazards, what European standard should they conform to?",
  options: ["EN 388 (mechanical risks)", "EN 374 (protection against chemicals and micro-organisms)", "EN 407 (thermal risks)", "EN 511 (cold risks)"],
  correctAnswer: 1,
  explanation: "Gloves for chemical protection must conform to EN 374, which specifies requirements for protection against chemicals and micro-organisms. The standard includes penetration testing, permeation testing (breakthrough time), and degradation testing. EN 388 covers mechanical risks (abrasion, cut, tear, puncture), which is a separate standard.",
  category: "Control Measures & PPE",
  difficulty: "intermediate"
},
// ===== MONITORING, SURVEILLANCE & EMERGENCIES — 40 questions (id 161-200) =====
{
  id: 161,
  question: "Under COSHH Regulation 10, when is workplace air monitoring required?",
  options: ["Only when an employee complains about smells", "When the COSHH assessment identifies it as necessary to maintain adequate control or protect health", "Only for substances with no WEL", "Every Monday morning as routine"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 10 requires exposure monitoring where the risk assessment identifies it as necessary to ensure adequate control of exposure or to protect the health of employees. Schedule 5 of COSHH lists substances and processes where monitoring is specifically required at defined intervals.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 162,
  question: "What is the purpose of biological monitoring in the context of COSHH?",
  options: ["To count bacteria in the workplace", "To measure the level of a substance or its metabolite in a worker's body (e.g., blood, urine)", "To monitor wildlife near the workplace", "To test the biological resistance of PPE materials"],
  correctAnswer: 1,
  explanation: "Biological monitoring measures the concentration of a hazardous substance or its metabolite in biological samples (blood, urine, exhaled air) from exposed workers. It provides an indication of total uptake from all routes of exposure (inhalation, skin absorption, ingestion) and is used alongside air monitoring.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 163,
  question: "How long must employers keep records of COSHH exposure monitoring?",
  options: ["1 year", "5 years (or 40 years for personal exposure records of identifiable employees)", "10 years for all records", "Records do not need to be kept"],
  correctAnswer: 1,
  explanation: "Under COSHH Regulation 10, monitoring records must be kept for at least 5 years. However, where records are representative of the personal exposure of identifiable employees, they must be kept for at least 40 years. This extended period reflects the long latency of some occupational diseases.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 164,
  question: "Under COSHH Regulation 11, when is health surveillance required for employees?",
  options: ["For all employees regardless of exposure", "When there is an identifiable disease or adverse health effect related to the exposure, and a valid technique exists to detect it", "Only for employees over 50 years old", "Only when an employee has been off sick"],
  correctAnswer: 1,
  explanation: "Health surveillance is required under COSHH Regulation 11 where employees are exposed to substances linked to identifiable diseases or adverse health effects, there is a reasonable likelihood of the condition occurring, and valid techniques exist for detecting indications of the disease or effect.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 165,
  question: "What is spirometry used to assess in occupational health surveillance?",
  options: ["Blood pressure", "Lung function, specifically the volume and flow of air that can be inhaled and exhaled", "Hearing ability", "Skin integrity"],
  correctAnswer: 1,
  explanation: "Spirometry measures lung function by recording the volume and speed of air that a person can inhale and exhale. It is used in health surveillance for workers exposed to respiratory sensitisers, dusts, and fumes to detect early signs of conditions such as occupational asthma, COPD, or pneumoconiosis.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 166,
  question: "What does FEV₁ measure in a spirometry test?",
  options: ["The total volume of air in the lungs", "The volume of air forcibly exhaled in the first one second", "The maximum pressure the lungs can generate", "The oxygen saturation of the blood"],
  correctAnswer: 1,
  explanation: "FEV₁ (Forced Expiratory Volume in 1 second) is the volume of air that can be forcibly blown out in the first second of a forced exhalation after a full inspiration. A declining FEV₁ over time may indicate developing obstructive lung disease such as occupational asthma or COPD.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 167,
  question: "What type of health surveillance is appropriate for workers regularly exposed to substances that can cause occupational dermatitis?",
  options: ["Annual chest X-ray", "Regular skin inspections and skin condition questionnaires", "Hearing tests", "Eye examinations"],
  correctAnswer: 1,
  explanation: "Workers exposed to skin sensitisers or irritants should receive regular skin inspections, typically by a trained responsible person, supplemented by periodic examination by an occupational health professional. Early detection of skin changes allows intervention before irreversible sensitisation occurs.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 168,
  question: "How often should skin checks be carried out for workers exposed to substances that can cause dermatitis?",
  options: ["Only at pre-employment", "Before first exposure and then at regular intervals, typically every 1-6 months depending on risk", "Once every 5 years", "Only if the worker reports a problem"],
  correctAnswer: 1,
  explanation: "Skin checks should be carried out before first exposure to establish a baseline, and then at regular intervals depending on the level of risk. HSE guidance recommends monthly checks by a responsible person for higher-risk exposures, with referral to occupational health if any abnormalities are detected.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 169,
  question: "What is the Biological Monitoring Guidance Value (BMGV) used for?",
  options: ["Setting maximum room temperatures", "Providing a benchmark to help interpret biological monitoring results for groups of workers", "Determining the price of PPE", "Calculating overtime pay for hazardous work"],
  correctAnswer: 1,
  explanation: "BMGVs are published by the HSE in EH40 and provide reference values to help interpret biological monitoring results. They represent the 90th percentile of results expected in a group of workers with adequate exposure control. Results consistently above the BMGV indicate that control measures may be inadequate.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "advanced"
},
{
  id: 170,
  question: "Who is qualified to carry out statutory health surveillance under COSHH?",
  options: ["Any first aider on site", "A doctor registered with the GMC, or a nurse qualified in occupational health, as appropriate to the surveillance required", "The site manager", "Any employee with CSCS card"],
  correctAnswer: 1,
  explanation: "Health surveillance under COSHH must be carried out by a suitable qualified person. For clinical examinations and medical assessments, this must be a registered medical practitioner (ideally with occupational medicine training) or an occupational health nurse. Trained responsible persons can carry out basic skin and lung function checks.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 171,
  question: "How long must health surveillance records be kept under COSHH?",
  options: ["5 years", "10 years", "40 years from the date of the last entry", "They do not need to be kept"],
  correctAnswer: 2,
  explanation: "COSHH Regulation 11(4) requires that individual health records be kept for at least 40 years from the date of the last entry. This long retention period reflects the fact that some occupational diseases (e.g., mesothelioma, bladder cancer) may not develop until decades after exposure.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 172,
  question: "What should happen if health surveillance identifies that an employee's health has been significantly harmed by exposure to a hazardous substance?",
  options: ["The employee should be dismissed", "The employer must review the risk assessment, control measures, and consider moving the employee to non-exposed work", "Nothing, as long as the employee can still work", "Only record it in the health surveillance file"],
  correctAnswer: 1,
  explanation: "If health surveillance reveals that an employee's health has been significantly affected, the employer must review and revise the COSHH assessment, improve control measures, consider moving the affected employee to alternative work without further exposure, and ensure other similarly exposed employees are also assessed.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 173,
  question: "What is the purpose of a personal air sampling pump used in exposure monitoring?",
  options: ["To provide clean air for the wearer", "To draw a measured volume of air through a filter or sorbent tube in the wearer's breathing zone to measure exposure", "To ventilate a confined space", "To inflate emergency air bags"],
  correctAnswer: 1,
  explanation: "A personal air sampling pump draws a calibrated flow of air through a collection medium (filter cassette or sorbent tube) positioned in the worker's breathing zone. After the sampling period, the collection medium is analysed in a laboratory to determine the airborne concentration of the hazardous substance.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 174,
  question: "What does RIDDOR stand for?",
  options: ["Risk Identification and Dangerous Devices on Roads", "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", "Regulation of Industrial Dust, Debris and Organic Residues", "Regional Investigation of Dangerous Demolition Operations Report"],
  correctAnswer: 1,
  explanation: "RIDDOR is the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. Under RIDDOR, employers must report certain work-related injuries, diseases (including occupational asthma, dermatitis, and certain cancers), and dangerous occurrences to the HSE.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 175,
  question: "Which of the following occupational diseases must be reported under RIDDOR when caused by workplace exposure?",
  options: ["Common cold", "Occupational asthma caused by a known respiratory sensitiser", "Mild sunburn", "Tension headache"],
  correctAnswer: 1,
  explanation: "Occupational asthma, when caused by exposure to a known respiratory sensitiser at work and confirmed by a medical practitioner, is reportable under RIDDOR Schedule 2. Other RIDDOR-reportable diseases related to COSHH include occupational dermatitis, occupational cancer, and diseases from biological agents.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 176,
  question: "What is the correct first response if a colleague collapses after suspected exposure to a toxic gas in a confined space?",
  options: ["Rush in immediately to pull them out", "Enter the space with a wet cloth over your face", "Do not enter; raise the alarm, call emergency services, and use rescue equipment if trained", "Wait 10 minutes to see if they recover"],
  correctAnswer: 2,
  explanation: "Never enter a confined space to rescue someone without proper equipment and training, as the same atmosphere that affected the casualty will affect rescuers. The correct response is to raise the alarm, call emergency services, and only attempt rescue using pre-planned procedures with appropriate RPE and rescue equipment.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 177,
  question: "What immediate first aid action should be taken if a corrosive chemical splashes into someone's eyes?",
  options: ["Apply an eye pad and wait for the ambulance", "Irrigate the eye immediately with clean water for at least 15-20 minutes, then seek medical attention", "Rub the eye to stimulate tears", "Apply neutralising drops immediately"],
  correctAnswer: 1,
  explanation: "The immediate priority for chemical eye splashes is copious irrigation with clean water for at least 15-20 minutes, holding the eyelids open. Do not attempt to neutralise chemicals in the eye. After initial irrigation, the casualty should receive urgent medical attention. Speed of irrigation is critical to minimising damage.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 178,
  question: "What information must be provided to emergency services when reporting a chemical incident?",
  options: ["Only the company name", "The substance involved, quantity, location, number of casualties, and any SDS information available", "Just the postcode of the site", "Only the name of the person who called"],
  correctAnswer: 1,
  explanation: "Emergency services need detailed information including: the substance(s) involved and their hazards (from the SDS), approximate quantities, the nature of the incident (spill, fire, exposure), the location, number and condition of any casualties, and what actions have already been taken. Having SDS readily available is essential.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 179,
  question: "Under COSHH, what must employers have in place for dealing with accidents, incidents, and emergencies involving hazardous substances?",
  options: ["Nothing specific beyond general fire procedures", "Emergency procedures including appropriate first aid, and warning and communication systems", "Only a telephone number for the fire brigade", "A suggestion box for employees to report concerns"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 13 requires employers to establish procedures for dealing with accidents, incidents, and emergencies involving hazardous substances. This includes emergency response plans, availability of appropriate first aid, warning systems, communication arrangements, and ensuring only essential personnel enter affected areas.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 180,
  question: "What type of fire extinguisher should NOT be used on a fire involving flammable solvents in an electrical installation?",
  options: ["CO₂ extinguisher", "Dry powder extinguisher", "Water extinguisher", "Foam extinguisher rated for electrical use"],
  correctAnswer: 2,
  explanation: "Water extinguishers must not be used on flammable liquid fires as they can spread the burning liquid, and they pose an electrical shock hazard near live equipment. CO₂ or dry powder extinguishers are suitable for both flammable liquids and electrical fires. Only use extinguishers you have been trained to operate.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 181,
  question: "How should a small chemical spill of a non-volatile, non-reactive liquid be managed on site?",
  options: ["Wash it down the nearest drain", "Contain the spill, apply appropriate absorbent material from the spill kit, and dispose of waste correctly", "Cover it with newspaper and leave it", "Ignore it if it is a small amount"],
  correctAnswer: 1,
  explanation: "Small spills should be contained using barriers or absorbent materials from the spill kit, wearing appropriate PPE as specified in the COSHH assessment. The absorbed material must be placed in suitable waste containers and disposed of as hazardous waste if required. Spills must never be washed into drains without authorisation.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 182,
  question: "What is the purpose of the COSHH assessment review process?",
  options: ["To increase the workload of safety officers", "To ensure the assessment remains valid, control measures are effective, and changes in substances or processes are captured", "To generate paperwork for HSE inspections only", "Reviews are not required once the initial assessment is completed"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 6 requires assessments to be reviewed regularly and whenever there is reason to believe the assessment is no longer valid (e.g., changes in substances, processes, control measures, or new health and safety information). The review ensures ongoing adequacy of controls and compliance.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 183,
  question: "What training must be provided to employees who may be involved in spill response for hazardous substances?",
  options: ["No specific training is required", "Training in spill response procedures, use of spill kits, appropriate PPE, and waste disposal", "Only a written memo about spill procedures", "Training is only needed for managers"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 12 and Regulation 13 require that employees involved in emergency response, including spill response, receive adequate training. This must cover identification of hazards, use of spill containment equipment, selection and use of appropriate PPE, decontamination, and correct waste disposal procedures.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 184,
  question: "A direct-reading gas detector shows a reading of 80% LEL (Lower Explosive Limit) in a plant room. What action should be taken?",
  options: ["Continue working but open a window", "Evacuate the area immediately, prevent ignition sources, and ventilate before re-entry", "Take a break and recheck in 30 minutes", "The reading is below 100% so it is safe"],
  correctAnswer: 1,
  explanation: "A reading of 80% LEL means the atmosphere is dangerously close to being explosive. Immediate evacuation is required, all potential ignition sources must be eliminated, and the area must be thoroughly ventilated. Re-entry should only be permitted once gas levels have dropped to safe levels, typically below 10% LEL as a working limit.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 185,
  question: "What is the purpose of continuous air monitoring using fixed gas detectors in areas where hazardous gases may accumulate?",
  options: ["To measure room temperature", "To provide early warning of hazardous gas levels and trigger alarms before dangerous concentrations are reached", "To monitor the efficiency of heating systems", "To measure humidity levels"],
  correctAnswer: 1,
  explanation: "Fixed gas detectors provide continuous monitoring and early warning through visual and audible alarms when gas concentrations exceed preset levels. They are essential in areas where toxic or flammable gases may accumulate, such as battery charging rooms, plant rooms, and confined spaces. Alarm levels are typically set well below WELs or LELs.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 186,
  question: "What does the acronym TWA stand for in the context of workplace exposure limits?",
  options: ["Total Work Assessment", "Time-Weighted Average", "Temporary Working Area", "Toxic Waste Analysis"],
  correctAnswer: 1,
  explanation: "TWA stands for Time-Weighted Average, which is the average airborne concentration of a substance over a specified time period, typically 8 hours (the standard working shift). The 8-hour TWA WEL takes into account the variation in exposure levels throughout the working day.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 187,
  question: "What type of detector tube (Draeger tube) measurement is considered in occupational hygiene?",
  options: ["A precise laboratory analysis", "A spot or short-term measurement giving an approximate indication of gas concentration", "A biological monitoring technique", "A method for measuring noise levels"],
  correctAnswer: 1,
  explanation: "Detector tubes (such as Draeger tubes) provide a quick, approximate indication of airborne gas or vapour concentration at a specific point in time. A known volume of air is drawn through the tube and a colour change indicates the concentration. They are useful for screening but are less accurate than laboratory analysis of collected samples.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 188,
  question: "Under COSHH, what must happen if monitoring reveals that a workplace exposure limit has been exceeded?",
  options: ["No action is required if it was only exceeded briefly", "The employer must identify and implement additional control measures immediately to reduce exposure below the WEL", "Simply record the result and continue", "The employee must pay for their own RPE"],
  correctAnswer: 1,
  explanation: "If monitoring shows that a WEL has been exceeded, the employer must take immediate steps to reduce exposure below the limit. This may include improving engineering controls, changing work practices, providing additional RPE as a short-term measure, and investigating the cause of the exceedance. The situation must be re-monitored to confirm compliance.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 189,
  question: "What is occupational hygiene?",
  options: ["Workplace cleanliness and handwashing", "The science of anticipating, recognising, evaluating, and controlling workplace health hazards", "A type of health insurance", "The study of workplace nutrition"],
  correctAnswer: 1,
  explanation: "Occupational hygiene is the discipline of anticipating, recognising, evaluating, and controlling health hazards in the working environment. It encompasses exposure assessment (air monitoring, biological monitoring), risk evaluation, and recommendations for control measures to protect workers' health.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 190,
  question: "What action should an electrician take if they develop a persistent skin rash that they suspect is related to a substance used at work?",
  options: ["Apply moisturiser and ignore it", "Report it to their employer and seek occupational health assessment", "Self-diagnose and self-treat with over-the-counter creams", "Wait until it becomes severe before mentioning it"],
  correctAnswer: 1,
  explanation: "Any suspected work-related skin condition should be reported to the employer immediately so that the COSHH assessment can be reviewed and appropriate action taken. Early referral to occupational health is important because early-stage contact dermatitis may be reversible, but delayed treatment can lead to chronic sensitisation.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 191,
  question: "What is the significance of a peak flow diary in occupational asthma surveillance?",
  options: ["It measures blood pressure trends", "Serial peak flow measurements can reveal work-related patterns showing reduced lung function during work periods", "It tracks the number of sick days taken", "It measures noise exposure over time"],
  correctAnswer: 1,
  explanation: "A peak flow diary involves the worker recording peak expiratory flow readings several times daily over several weeks, both at work and away from work. A pattern of reduced readings during work periods with improvement during rest days or holidays is characteristic of occupational asthma.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "advanced"
},
{
  id: 192,
  question: "How should contaminated clothing be handled after a chemical splash incident?",
  options: ["Brush off the residue and continue wearing it", "Remove the clothing carefully, avoiding further skin contact, and follow decontamination procedures in the COSHH assessment", "Put it in the normal laundry", "Leave it on to prevent further exposure"],
  correctAnswer: 1,
  explanation: "Contaminated clothing should be carefully removed to minimise further skin contact, using gloves if necessary. The affected skin should be washed thoroughly with water and mild soap. Contaminated clothing should be handled as per the COSHH assessment and SDS — it may need to be disposed of as contaminated waste rather than laundered.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 193,
  question: "Under COSHH Regulation 13, what must be available in areas where employees may be exposed to hazardous substances?",
  options: ["A coffee machine", "Suitable first aid facilities and arrangements, including trained first aiders", "A television for distraction", "Extra overtime hours"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 13 requires employers to ensure that appropriate first aid facilities and trained personnel are available in areas where hazardous substance exposure may occur. This includes emergency eyewash stations, emergency showers where corrosive substances are used, and first aid equipment specific to the hazards present.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 194,
  question: "What is the recommended minimum flow duration for an emergency eyewash station?",
  options: ["30 seconds", "5 minutes", "At least 15 minutes of continuous flow", "1 minute"],
  correctAnswer: 2,
  explanation: "Emergency eyewash stations should be capable of providing at least 15 minutes of continuous flushing to ensure adequate decontamination of the eyes following a chemical splash. They should deliver tepid water at a controlled flow rate and must be within 10 seconds' travel distance from the hazard area.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 195,
  question: "What record-keeping is required for COSHH training provided to employees?",
  options: ["No records are needed", "Records of who was trained, what training was given, when it was delivered, and when refresher training is due", "Only a signature sheet is needed", "Records are only required for new employees"],
  correctAnswer: 1,
  explanation: "Employers must keep records of COSHH training including the names of attendees, the content and date of training, the trainer's details, and when refresher training is due. These records demonstrate compliance with COSHH Regulation 12 and are essential evidence during HSE inspections or investigations.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 196,
  question: "What is the HSE's enforcement expectation regarding COSHH training frequency?",
  options: ["Training is only required once when first employed", "Regular refresher training should be provided, with frequency based on risk level, typically annually for higher-risk activities", "Every 10 years is sufficient", "Training is only needed after an accident"],
  correctAnswer: 1,
  explanation: "While COSHH does not specify exact refresher intervals, the HSE expects training to be repeated at regular intervals appropriate to the level of risk. For higher-risk activities, annual refresher training is typically expected. Training should also be updated whenever there are significant changes to substances, processes, or control measures.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "intermediate"
},
{
  id: 197,
  question: "What must be included in a COSHH emergency plan for a site using large quantities of flammable solvents?",
  options: ["Only the fire assembly point", "Identification of foreseeable emergencies, procedures for spill containment, fire response, evacuation routes, communication systems, and roles/responsibilities", "A list of employees' phone numbers only", "Details of the nearest pub for evacuation"],
  correctAnswer: 1,
  explanation: "A COSHH emergency plan must identify foreseeable emergencies (spills, fires, explosions, toxic releases), specify response procedures for each scenario, define roles and responsibilities, establish communication and alarm systems, identify evacuation routes and assembly points, and detail the spill containment and firefighting equipment available.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "advanced"
},
{
  id: 198,
  question: "What is the role of a 'responsible person' in COSHH health surveillance for skin checks?",
  options: ["To diagnose occupational dermatitis", "To carry out routine visual skin inspections and questionnaires, and refer any concerns to occupational health", "To prescribe medication", "To carry out patch testing"],
  correctAnswer: 1,
  explanation: "A 'responsible person' in COSHH health surveillance is trained (but not necessarily medically qualified) to carry out routine skin inspections, administer simple questionnaires, and identify early signs of skin problems. They must refer any concerns to an occupational health professional for further assessment. They do not diagnose or treat conditions.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "advanced"
},
{
  id: 199,
  question: "What is the purpose of a COSHH assessment register or inventory?",
  options: ["To record employee holiday dates", "To maintain a comprehensive list of all hazardous substances used or generated in the workplace, linked to their assessments and SDSs", "To track purchase orders for office supplies", "To log visitor details"],
  correctAnswer: 1,
  explanation: "A COSHH register or inventory provides a central record of all hazardous substances present in the workplace, cross-referenced to their safety data sheets and COSHH assessments. It enables employers to maintain oversight of chemical hazards, ensure all substances are assessed, and quickly access safety information in an emergency.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
},
{
  id: 200,
  question: "Under COSHH, what is the employer's duty regarding employees who transfer to work involving exposure to a new hazardous substance?",
  options: ["No additional action is needed if they had general COSHH training previously", "Provide specific information, instruction, and training on the new substance and its controls before exposure begins", "Give them the safety data sheet to read in their own time", "Wait until the next annual training session"],
  correctAnswer: 1,
  explanation: "COSHH Regulation 12 requires that information, instruction, and training are specific to the hazardous substances employees are exposed to. When an employee transfers to work involving new substances, they must receive specific training on those substances, their risks, and the required control measures before exposure begins.",
  category: "Monitoring, Surveillance & Emergencies",
  difficulty: "basic"
}];
