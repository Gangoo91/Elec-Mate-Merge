/**
 * Confined Spaces Awareness Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced difficulty.
 *
 * Categories (5):
 *   Understanding Confined Spaces (40) | Legislation & Risk Assessment (40) |
 *   Hazards & Atmospheric Monitoring (40) | Safe Entry & Working Procedures (40) |
 *   Emergency & Rescue Procedures (40)
 *
 * Difficulty per 40-question category: ~14 basic, ~18 intermediate, ~8 advanced
 * Difficulty per 20-question block:   ~7 basic, ~9 intermediate, ~4 advanced
 *
 * THIS FILE: Questions 1-100 (Part 1 of 2)
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const confinedSpacesCategories = [
  "Understanding Confined Spaces",
  "Legislation & Risk Assessment",
  "Hazards & Atmospheric Monitoring",
  "Safe Entry & Working Procedures",
  "Emergency & Rescue Procedures"
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const confinedSpacesMockExamConfig: MockExamConfig = {
  examId: 'confined-spaces',
  examTitle: 'Confined Spaces Awareness Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/confined-spaces-module-6',
  categories: confinedSpacesCategories
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomConfinedSpacesExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(confinedSpacesQuestionBank, numQuestions, confinedSpacesCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — Questions 1-100 (Part 1)
// ---------------------------------------------------------------------------
export const confinedSpacesQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // UNDERSTANDING CONFINED SPACES — 40 questions (id 1-40)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 1,
    question: "What is the legal definition of a confined space under UK regulations?",
    options: [
      "Any space that is small enough to restrict movement",
      "Any enclosed space where there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions",
      "Any space that requires a ladder to access",
      "Any underground room or chamber used for storage"
    ],
    correctAnswer: 1,
    explanation: "Under the Confined Spaces Regulations 1997, a confined space is defined as any place which is substantially (though not always entirely) enclosed, and where serious injury can occur from hazardous substances or conditions within the space, or nearby. It is the risk, not just the size, that defines a confined space.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Definition of confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 2,
    question: "Which of the following is a key characteristic of a confined space?",
    options: [
      "It must be completely sealed from the atmosphere",
      "It must be substantially enclosed and have a reasonably foreseeable risk of serious injury",
      "It must be located underground",
      "It must have no lighting installed"
    ],
    correctAnswer: 1,
    explanation: "A confined space has two key characteristics: it is substantially (though not always entirely) enclosed, and there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions. A space does not need to be underground, sealed, or unlit to be classified as confined.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Characteristics of confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 3,
    question: "Which of the following is an example of a confined space?",
    options: [
      "An open-plan office",
      "A well-ventilated warehouse",
      "A storage tank that previously held chemicals",
      "A car park with natural ventilation"
    ],
    correctAnswer: 2,
    explanation: "A storage tank that previously held chemicals is a classic example of a confined space. It is substantially enclosed, has limited access and egress, and there is a foreseeable risk of serious injury from residual hazardous substances, oxygen depletion, or a build-up of flammable vapours.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Examples of confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 4,
    question: "Which of the following would NOT typically be classified as a confined space?",
    options: [
      "A sewer",
      "An open-top skip in a well-ventilated yard",
      "A ship's hold",
      "A duct or culvert"
    ],
    correctAnswer: 1,
    explanation: "An open-top skip in a well-ventilated yard would not typically meet the definition of a confined space because it is not substantially enclosed and does not normally present a foreseeable risk of serious injury from hazardous substances or conditions. Sewers, ship's holds, and ducts are all classic confined space examples.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Identifying confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 5,
    question: "A room with poor ventilation that is used for spray painting could be classified as a confined space. Why?",
    options: [
      "Because spray paint is always toxic",
      "Because any room used for industrial work is automatically a confined space",
      "Because the build-up of flammable vapours or toxic fumes in a substantially enclosed space creates a foreseeable risk of serious injury",
      "Because the room has a door that can be locked"
    ],
    correctAnswer: 2,
    explanation: "A poorly ventilated room used for spray painting can become a confined space because the build-up of flammable vapours and toxic fumes in a substantially enclosed area creates a foreseeable risk of serious injury. The classification depends on the risk, not just the physical dimensions of the space.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Dynamic classification",
    category: "Understanding Confined Spaces"
  },
  {
    id: 6,
    question: "True or false: A confined space must always be small or cramped.",
    options: [
      "True — confined spaces are always physically restrictive",
      "False — a confined space can be any size; it is the risk and enclosure that define it",
      "True — if you can stand up fully, it is not a confined space",
      "False — only spaces below 2 metres in height count as confined"
    ],
    correctAnswer: 1,
    explanation: "A confined space does not have to be small or cramped. Large spaces such as silos, ship's holds, or large tanks can be confined spaces. The defining factors are that the space is substantially enclosed and that there is a foreseeable risk of serious injury from hazardous substances or conditions.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Common misconceptions",
    category: "Understanding Confined Spaces"
  },
  {
    id: 7,
    question: "Which of the following best describes why manholes and inspection chambers can be confined spaces?",
    options: [
      "They are always filled with water",
      "They are substantially enclosed with limited access, and may contain hazardous atmospheres from decomposing material or leaked services",
      "They are painted with hazardous coatings",
      "They are always located near roads"
    ],
    correctAnswer: 1,
    explanation: "Manholes and inspection chambers are substantially enclosed with restricted access and egress. They may contain hazardous atmospheres due to decomposing organic matter producing gases such as hydrogen sulphide or methane, or from leaking gas or water services. This creates a foreseeable risk of serious injury.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Underground confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 8,
    question: "What is the primary reason electrical workers may encounter confined spaces?",
    options: [
      "Electrical work is always done in basements",
      "Cable pulling, jointing, and maintenance often take place in ducts, chambers, risers, and plant rooms with restricted access",
      "All switchgear is located in confined spaces",
      "Electricians must always work alone in enclosed rooms"
    ],
    correctAnswer: 1,
    explanation: "Electrical workers frequently encounter confined spaces when carrying out cable pulling, jointing, testing, and maintenance in underground ducts, cable chambers, risers, transformer enclosures, and plant rooms. These spaces can have restricted access, poor ventilation, and potential exposure to hazardous atmospheres.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Confined spaces in electrical work",
    category: "Understanding Confined Spaces"
  },
  {
    id: 9,
    question: "Which two factors together define a confined space under UK law?",
    options: [
      "Small size and darkness",
      "Substantially enclosed and a foreseeable risk of serious injury",
      "Underground location and restricted movement",
      "Lack of oxygen and presence of water"
    ],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 define a confined space by two factors: the space must be substantially (though not always entirely) enclosed, and there must be a reasonably foreseeable risk of serious injury from hazardous substances or conditions within the space or nearby.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Legal definition",
    category: "Understanding Confined Spaces"
  },
  {
    id: 10,
    question: "A vat that was recently emptied of a solvent-based product is being prepared for maintenance. What makes it a confined space?",
    options: [
      "It is made of metal",
      "It has a lid",
      "It is substantially enclosed and residual vapours create a foreseeable risk of serious injury from flammable or toxic atmospheres",
      "It was manufactured before 1997"
    ],
    correctAnswer: 2,
    explanation: "Even after draining, residual solvent can produce flammable or toxic vapours within the substantially enclosed vat. This creates a foreseeable risk of serious injury from fire, explosion, or poisoning, classifying the vat as a confined space requiring appropriate controls before entry.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Residual hazards",
    category: "Understanding Confined Spaces"
  },
  {
    id: 11,
    question: "Why might a large open-topped water tank still be considered a confined space?",
    options: [
      "Because all tanks are confined spaces regardless of design",
      "Because the depth and limited access could trap a person, and biological or chemical hazards may be present",
      "Because water is always hazardous",
      "Because it is made from concrete"
    ],
    correctAnswer: 1,
    explanation: "A large open-topped tank can still be a confined space if the depth and restricted access create a risk of entrapment, drowning, or exposure to hazardous atmospheres from biological growth or chemical treatment. The risk assessment must consider all potential hazards, not just whether the space has a roof.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Unusual confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 12,
    question: "Which of the following scenarios describes a space that could become a confined space due to the work activity?",
    options: [
      "A well-ventilated room where someone is reading documents",
      "A garage with the door wide open on a breezy day",
      "A basement room where solvent-based coatings are being applied, causing a build-up of vapours",
      "An outdoor car park during the daytime"
    ],
    correctAnswer: 2,
    explanation: "A space does not have to be permanently classified as confined. If a work activity such as applying solvent-based coatings in a substantially enclosed room causes a build-up of flammable or toxic vapours, the space can become a confined space for the duration of that work. This is sometimes called a 'transient' confined space.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Dynamic classification",
    category: "Understanding Confined Spaces"
  },
  {
    id: 13,
    question: "In the context of confined spaces, what does 'substantially enclosed' mean?",
    options: [
      "The space must be 100% sealed with no openings",
      "The space has walls, a floor, and a ceiling with no windows",
      "The space is mostly enclosed by walls, floor, or ceiling, though it may have openings for entry or ventilation",
      "The space must be underground"
    ],
    correctAnswer: 2,
    explanation: "'Substantially enclosed' means the space is mostly surrounded by walls, floor, and/or ceiling, even though it may have openings such as entry points, manholes, or ventilation apertures. It does not need to be completely sealed — the enclosure restricts natural air movement and can allow hazardous atmospheres to accumulate.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Enclosure definition",
    category: "Understanding Confined Spaces"
  },
  {
    id: 14,
    question: "A cable duct runs beneath a factory floor and is accessed via a hatch. Why is this a confined space?",
    options: [
      "Because it is dark inside",
      "Because cables are always dangerous",
      "Because it is substantially enclosed with limited access, and could contain hazardous atmospheres, flooding, or cable faults",
      "Because the hatch is heavy"
    ],
    correctAnswer: 2,
    explanation: "An underground cable duct is substantially enclosed with restricted entry and exit through a hatch. Hazards can include oxygen depletion, accumulation of gases from the surrounding ground, flooding, and electrical faults from the cables. These foreseeable risks classify it as a confined space.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Cable ducts",
    category: "Understanding Confined Spaces"
  },
  {
    id: 15,
    question: "Which of the following is NOT a reason a space may be classified as confined?",
    options: [
      "Risk of oxygen depletion",
      "Risk of flooding or engulfment",
      "Risk of getting a mobile phone signal",
      "Risk of exposure to toxic gases"
    ],
    correctAnswer: 2,
    explanation: "Poor mobile phone signal is an inconvenience but is not a 'serious injury' risk that would classify a space as confined. The foreseeable risks that contribute to confined space classification include oxygen depletion, toxic or flammable atmospheres, flooding, engulfment by free-flowing solids, and excessive heat.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Classification criteria",
    category: "Understanding Confined Spaces"
  },
  {
    id: 16,
    question: "What role does ventilation play in determining whether a space is confined?",
    options: [
      "Ventilation has no bearing on the classification",
      "Any space with mechanical ventilation cannot be a confined space",
      "Limited natural ventilation can allow hazardous atmospheres to accumulate, contributing to the foreseeable risk that defines a confined space",
      "A space is only confined if it has zero ventilation"
    ],
    correctAnswer: 2,
    explanation: "Limited natural ventilation means that hazardous gases, vapours, or fumes may not disperse naturally, leading to dangerous concentrations. This accumulation contributes to the foreseeable risk of serious injury from hazardous atmospheres, which is a key factor in classifying a space as confined.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Ventilation and classification",
    category: "Understanding Confined Spaces"
  },
  {
    id: 17,
    question: "A transformer chamber in the basement of a building has a single access door and no windows. Which confined space hazards are most likely?",
    options: [
      "Ultraviolet radiation and sunburn",
      "Oxygen depletion from SF₆ gas leaks, electrical arc flash, and restricted egress",
      "Noise from traffic outside",
      "Dust from concrete cutting"
    ],
    correctAnswer: 1,
    explanation: "Transformer chambers can contain sulphur hexafluoride (SF₆) gas-insulated switchgear. SF₆ is denser than air and displaces oxygen if it leaks. Combined with the risk of electrical arc flash and the restricted single-door egress, this creates a foreseeable risk of serious injury in a substantially enclosed space.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Electrical confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 18,
    question: "Which of the following is a common confined space encountered during electrical installations on construction sites?",
    options: [
      "The site canteen",
      "A large open excavation with gentle sloping sides",
      "A deep trench with shoring, used for laying underground cables",
      "A scaffold platform at height"
    ],
    correctAnswer: 2,
    explanation: "Deep trenches with shoring used for laying underground cables can be confined spaces. They are substantially enclosed by the trench walls and shoring, with limited access. Hazards include collapse, accumulation of heavier-than-air gases, and flooding, creating a foreseeable risk of serious injury.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Construction confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 19,
    question: "What is meant by the term 'specified risk' in relation to confined spaces?",
    options: [
      "A risk that has been formally written down in a logbook",
      "A serious risk of injury arising from conditions in or associated with a confined space, such as flammable atmospheres, toxic gases, or engulfment",
      "A risk that only applies to spaces specified in a building's plans",
      "A financial risk associated with working in difficult conditions"
    ],
    correctAnswer: 1,
    explanation: "A 'specified risk' under the Confined Spaces Regulations 1997 refers to a risk of serious injury arising from fire, explosion, loss of consciousness, drowning, or asphyxiation due to conditions within or associated with the confined space. These are the risks that trigger the requirement for safe systems of work.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Specified risks",
    category: "Understanding Confined Spaces"
  },
  {
    id: 20,
    question: "Which of the following correctly lists examples of confined spaces an electrician might work in?",
    options: [
      "Open-plan offices, car parks, and warehouses",
      "Cable ducts, distribution board cupboards in basements, underground chambers, and switch rooms with restricted ventilation",
      "Rooftop solar arrays, overhead cable runs, and scaffold towers",
      "Site welfare cabins, tool stores, and drying rooms"
    ],
    correctAnswer: 1,
    explanation: "Electricians frequently work in cable ducts, underground chambers, basement distribution board cupboards, and switch rooms with restricted ventilation. These spaces can be substantially enclosed with limited access and may contain hazardous atmospheres from cable insulation off-gassing, SF₆ leaks, or poor air circulation.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Electrical confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 21,
    question: "Can a space that is not normally classified as confined become one temporarily?",
    options: [
      "No — a confined space is always a confined space",
      "Yes — work activities or changing conditions can introduce foreseeable risks that temporarily make a space confined",
      "No — only spaces on the building's original plans can be classified",
      "Yes — but only if the temperature exceeds 30°C"
    ],
    correctAnswer: 1,
    explanation: "A space can become a confined space temporarily due to the nature of work being carried out (e.g. using solvents in a poorly ventilated room) or changing conditions (e.g. a leak introducing gases). This is why risk assessments must be dynamic and reviewed whenever conditions change.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Transient confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 22,
    question: "A silo containing grain is an example of a confined space. What specific risks does it present?",
    options: [
      "Only the risk of getting dusty clothing",
      "Engulfment by free-flowing grain, oxygen depletion from grain respiration, and dust explosion risk",
      "Risk of slipping on a smooth floor",
      "Risk of sunburn through the roof panels"
    ],
    correctAnswer: 1,
    explanation: "Grain silos present multiple confined space hazards: engulfment by the free-flowing grain (which can behave like quicksand), oxygen depletion as grain respires and consumes oxygen, toxic gas production from mouldy grain, and the risk of dust explosion from fine grain particles in the correct concentration with an ignition source.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Engulfment hazards",
    category: "Understanding Confined Spaces"
  },
  {
    id: 23,
    question: "What is the significance of 'limited means of access or egress' when identifying a confined space?",
    options: [
      "It means the space has a revolving door",
      "Restricted entry and exit points make it harder to escape in an emergency and harder for rescuers to reach a casualty, increasing the severity of any incident",
      "It only matters if the space is used by more than five people",
      "It relates to wheelchair accessibility requirements"
    ],
    correctAnswer: 1,
    explanation: "Limited access and egress are significant because they increase the consequences of any incident. If a person is overcome by a hazardous atmosphere or injured, restricted entry and exit points make self-rescue difficult, delay emergency rescue, and complicate the removal of a casualty. This is a key factor in confined space risk assessment.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Access and egress",
    category: "Understanding Confined Spaces"
  },
  {
    id: 24,
    question: "Which document provides the HSE's Approved Code of Practice and guidance for the Confined Spaces Regulations 1997?",
    options: [
      "L101 — Safe Work in Confined Spaces",
      "L8 — Legionnaires' Disease",
      "L144 — Managing Health and Safety in Construction",
      "L153 — Managing and Working with Asbestos"
    ],
    correctAnswer: 0,
    explanation: "L101 'Safe Work in Confined Spaces' is the HSE's Approved Code of Practice (ACoP) and guidance document for the Confined Spaces Regulations 1997. It provides detailed practical guidance on identifying confined spaces, assessing risks, safe systems of work, and emergency arrangements.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "HSE guidance",
    category: "Understanding Confined Spaces"
  },
  {
    id: 25,
    question: "According to L101, which of the following is NOT listed as a typical confined space?",
    options: [
      "Storage tanks and silos",
      "Open-plan retail floors",
      "Sewers and drains",
      "Unventilated or poorly ventilated rooms"
    ],
    correctAnswer: 1,
    explanation: "Open-plan retail floors are not typically classified as confined spaces because they are not substantially enclosed in the regulatory sense, have adequate natural ventilation, and do not normally present a foreseeable risk of serious injury from hazardous conditions. L101 lists tanks, silos, sewers, drains, and poorly ventilated rooms as typical examples.",
    section: "Module 1",
    difficulty: "basic",
    topic: "L101 examples",
    category: "Understanding Confined Spaces"
  },
  {
    id: 26,
    question: "What does the term 'engulfment' mean in the context of confined spaces?",
    options: [
      "Being surrounded by colleagues in a small room",
      "Being trapped or buried by a free-flowing substance such as grain, sand, or liquid",
      "Having too much personal protective equipment on",
      "Being unable to hear instructions due to noise"
    ],
    correctAnswer: 1,
    explanation: "Engulfment occurs when a person is partially or fully submerged in a free-flowing substance such as grain, sand, slurry, or liquid within a confined space. This can lead to suffocation, drowning, or crushing. Engulfment is one of the specified risks under the Confined Spaces Regulations 1997.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Engulfment",
    category: "Understanding Confined Spaces"
  },
  {
    id: 27,
    question: "Why are sewers particularly hazardous confined spaces?",
    options: [
      "Because they are always flooded to the ceiling",
      "Because they contain decomposing organic matter producing toxic gases such as hydrogen sulphide, methane, and carbon dioxide, with oxygen depletion and risk of sudden flooding",
      "Because they are always made of asbestos cement",
      "Because sewers are never mapped or recorded"
    ],
    correctAnswer: 1,
    explanation: "Sewers are particularly hazardous because decomposing organic matter produces toxic gases including hydrogen sulphide (H₂S), methane (CH₄), and carbon dioxide (CO₂). Oxygen can be depleted by biological processes. Additionally, sudden rainfall can cause rapid flooding, and there may be biological hazards from Weil's disease (leptospirosis).",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Sewer hazards",
    category: "Understanding Confined Spaces"
  },
  {
    id: 28,
    question: "How does a risk assessment determine whether a space should be treated as a confined space?",
    options: [
      "By measuring the dimensions of the space only",
      "By checking whether the space has a 'confined space' sign on the door",
      "By evaluating whether the space is substantially enclosed and whether there is a foreseeable risk of serious injury from hazardous conditions",
      "By asking workers if they feel claustrophobic"
    ],
    correctAnswer: 2,
    explanation: "A risk assessment determines confined space status by evaluating two criteria: whether the space is substantially enclosed, and whether there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions. This requires considering the nature of the space, its contents, and the work to be carried out.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Risk assessment approach",
    category: "Understanding Confined Spaces"
  },
  {
    id: 29,
    question: "Which of the following scenarios demonstrates why confined space awareness is critical for electrical workers?",
    options: [
      "An electrician working in an open-plan office",
      "An electrician entering a below-ground cable chamber that has accumulated heavier-than-air gases from a nearby gas main leak",
      "An electrician replacing a light fitting in a well-ventilated corridor",
      "An electrician testing a socket outlet in a domestic kitchen"
    ],
    correctAnswer: 1,
    explanation: "Below-ground cable chambers can accumulate heavier-than-air gases such as natural gas from nearby leaking mains. An electrician entering without atmospheric testing could be overcome by toxic or oxygen-depleted atmospheres. This scenario demonstrates why confined space awareness is essential for electrical workers.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Electrical worker scenarios",
    category: "Understanding Confined Spaces"
  },
  {
    id: 30,
    question: "What is the difference between a 'confined space' and a 'restricted space'?",
    options: [
      "There is no difference; the terms are interchangeable",
      "A confined space has foreseeable risks of serious injury from hazardous conditions, while a restricted space simply has limited physical room to work but no such risks",
      "A restricted space is always smaller than a confined space",
      "A restricted space requires a permit but a confined space does not"
    ],
    correctAnswer: 1,
    explanation: "A confined space must have both substantial enclosure AND a foreseeable risk of serious injury from hazardous conditions. A restricted space may be physically difficult to work in due to limited room, but does not have the associated hazardous conditions. The distinction is important because different control measures apply.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Confined vs restricted",
    category: "Understanding Confined Spaces"
  },
  {
    id: 31,
    question: "In multi-service utility tunnels, what confined space hazards might combine to create an especially dangerous environment?",
    options: [
      "Only the risk of bumping your head",
      "Gas leaks from gas mains, oxygen depletion, flooding from water mains, electrical hazards from HV/LV cables, and limited egress points",
      "The risk of getting lost only",
      "Paint fumes from recently decorated walls"
    ],
    correctAnswer: 1,
    explanation: "Multi-service utility tunnels combine multiple confined space hazards: gas leaks from adjacent gas mains creating toxic or explosive atmospheres, oxygen depletion, flooding from water main failures, electrical hazards from high and low voltage cables, heat from steam pipes, and very limited egress points. This combination creates an extremely hazardous environment.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Multi-hazard environments",
    category: "Understanding Confined Spaces"
  },
  {
    id: 32,
    question: "What is meant by 'foreseeable risk' in the confined spaces definition?",
    options: [
      "A risk that has already caused an accident",
      "A risk that a reasonable, competent person could anticipate might occur given the nature of the space and the work to be done",
      "A risk that has been predicted by a fortune teller",
      "A risk that only exists during winter months"
    ],
    correctAnswer: 1,
    explanation: "'Foreseeable risk' means a risk that a reasonable, competent person could anticipate based on the nature of the space, its contents, the work being done, and the surrounding environment. It does not require the risk to have caused a previous incident — only that it could reasonably be predicted.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Foreseeable risk",
    category: "Understanding Confined Spaces"
  },
  {
    id: 33,
    question: "Why is it important to consider adjacent spaces and activities when assessing whether a space is confined?",
    options: [
      "Because adjacent spaces might have nicer decor",
      "Because hazards from nearby processes, storage, or services can migrate into the space being assessed through walls, pipes, or the ground",
      "Because building regulations require all adjacent rooms to be inspected annually",
      "Because insurance policies cover adjacent spaces differently"
    ],
    correctAnswer: 1,
    explanation: "Hazards from adjacent areas can migrate into the space being assessed. For example, gases from nearby chemical storage can seep through cracks, fumes from adjacent processes can enter via shared ventilation, and substances can flow through connecting pipes. The risk assessment must consider the wider environment, not just the space in isolation.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Adjacent hazards",
    category: "Understanding Confined Spaces"
  },
  {
    id: 34,
    question: "Which of the following is true about confined spaces in domestic settings?",
    options: [
      "Confined spaces never exist in domestic properties",
      "Domestic loft spaces and cellars can be confined spaces if they are substantially enclosed with foreseeable risks such as poor ventilation and gas accumulation",
      "Only industrial premises can contain confined spaces",
      "Domestic kitchens are always classified as confined spaces"
    ],
    correctAnswer: 1,
    explanation: "Confined spaces can exist in domestic settings. Loft spaces, cellars, and under-floor voids can be substantially enclosed with poor ventilation. If gas from a leaking supply or biological decomposition has accumulated, these spaces present a foreseeable risk of serious injury and must be treated as confined spaces.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Domestic confined spaces",
    category: "Understanding Confined Spaces"
  },
  {
    id: 35,
    question: "What makes a void above a false ceiling a potential confined space?",
    options: [
      "False ceilings are always made from hazardous materials",
      "The void is substantially enclosed, may have poor ventilation, and could contain accumulations of gases from building services or materials",
      "False ceilings are always in confined space zones",
      "The void is always below ground level"
    ],
    correctAnswer: 1,
    explanation: "Voids above false ceilings can be confined spaces because they are substantially enclosed with limited access. They may contain gas pipes, refrigerant lines, or other services that could leak, creating hazardous atmospheres. Poor ventilation means gases can accumulate. Electrical workers often need to access these voids for cable routing.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Ceiling voids",
    category: "Understanding Confined Spaces"
  },
  {
    id: 36,
    question: "An excavation that is 1.2 metres deep with steep sides is being assessed. Under what circumstances might it be treated as a confined space?",
    options: [
      "It can never be a confined space because it is open at the top",
      "Only if it rains",
      "If heavier-than-air gases accumulate at the bottom, or if the work introduces fumes (e.g. solvent jointing), or if there is a risk of side collapse creating engulfment",
      "Only if it is deeper than 3 metres"
    ],
    correctAnswer: 2,
    explanation: "Even a relatively shallow excavation can become a confined space if conditions create a foreseeable risk of serious injury. Heavier-than-air gases (such as CO₂ or propane) can pool at the bottom, work activities can introduce hazardous fumes, and unstable sides can create engulfment risk. There is no minimum depth threshold.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Excavation assessment",
    category: "Understanding Confined Spaces"
  },
  {
    id: 37,
    question: "Which category of risk specifically defines a space as 'confined' rather than simply 'enclosed'?",
    options: [
      "The risk of dropping tools",
      "The risk of serious injury from hazardous substances or conditions within the space",
      "The risk of getting dirty or wet",
      "The risk of feeling claustrophobic"
    ],
    correctAnswer: 1,
    explanation: "Many spaces are enclosed, but what makes a space 'confined' under the regulations is the additional presence of a foreseeable risk of serious injury from hazardous substances or conditions. Without this risk element, an enclosed space is simply an enclosed space, not a confined space in the regulatory sense.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Classification criteria",
    category: "Understanding Confined Spaces"
  },
  {
    id: 38,
    question: "What is the HSE's recommended first step when work in a confined space is being considered?",
    options: [
      "Order the most expensive breathing apparatus available",
      "Avoid entry entirely if the work can be done from outside the space",
      "Send in the most junior member of the team first",
      "Open all the access points and wait 24 hours"
    ],
    correctAnswer: 1,
    explanation: "The HSE's hierarchy of control for confined spaces places avoidance of entry as the first and most important step (Regulation 3 of the CSR 1997). If the work objective can be achieved without entering the confined space — for example by using remote tools, cameras, or long-reach equipment — then entry should be avoided altogether.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Hierarchy of control",
    category: "Understanding Confined Spaces"
  },
  {
    id: 39,
    question: "Why might a cold store or freezer room be classified as a confined space?",
    options: [
      "Because the cold temperature itself is always fatal",
      "Because the refrigeration system may leak gases that displace oxygen, the insulated room is substantially enclosed, and there may be risk of entrapment if the door locks",
      "Because frozen food is always hazardous",
      "Because cold stores are always underground"
    ],
    correctAnswer: 1,
    explanation: "Cold stores and freezer rooms can be confined spaces because they are heavily insulated and substantially enclosed, with refrigerant gases (such as ammonia or CO₂) that can leak and displace oxygen. The risk of becoming trapped if the door mechanism fails, combined with extreme cold, creates a foreseeable risk of serious injury.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Cold store hazards",
    category: "Understanding Confined Spaces"
  },
  {
    id: 40,
    question: "Which of the following statements about confined spaces is correct?",
    options: [
      "A space that has been safe to enter for years can never become a confined space",
      "Only qualified engineers can identify a confined space",
      "The classification of a space can change depending on the work being done, the contents of the space, and environmental conditions",
      "Confined spaces are only found in the petrochemical industry"
    ],
    correctAnswer: 2,
    explanation: "Confined space classification is not permanent or fixed. A space can become confined due to changing work activities (e.g. introducing solvents), changing contents (e.g. a tank refilled with a different substance), or changing environmental conditions (e.g. a gas leak from nearby services). This is why ongoing risk assessment is essential.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Dynamic classification",
    category: "Understanding Confined Spaces"
  },

  // =======================================================================
  // LEGISLATION & RISK ASSESSMENT — 40 questions (id 41-80)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 41,
    question: "Which UK regulation specifically governs work in confined spaces?",
    options: [
      "The Manual Handling Operations Regulations 1992",
      "The Confined Spaces Regulations 1997",
      "The Electricity at Work Regulations 1989",
      "The Control of Substances Hazardous to Health Regulations 2002"
    ],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 (CSR 1997) are the principal UK regulations governing work in confined spaces. They place duties on employers to assess risks, avoid entry where possible, implement safe systems of work where entry is necessary, and arrange emergency procedures.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Primary legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 42,
    question: "How many regulations are contained within the Confined Spaces Regulations 1997?",
    options: [
      "3",
      "5",
      "10",
      "15"
    ],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 contain 5 regulations: Regulation 1 (Citation and commencement), Regulation 2 (Interpretation), Regulation 3 (Duties — avoidance of entry), Regulation 4 (Safe system of work), and Regulation 5 (Emergency arrangements). Despite being brief, they impose significant duties.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Regulation structure",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 43,
    question: "What does Regulation 3 of the Confined Spaces Regulations 1997 require?",
    options: [
      "That all confined spaces must be permanently sealed",
      "That no person at work shall enter a confined space to carry out work unless entry is unavoidable",
      "That confined spaces must be painted yellow as a warning",
      "That only managers are allowed to enter confined spaces"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 states that no person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry. This establishes avoidance of entry as the primary control measure — entry should only occur when there is no other practicable way to complete the work.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Regulation 3 — Avoidance",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 44,
    question: "What does Regulation 4 of the Confined Spaces Regulations 1997 require when entry is necessary?",
    options: [
      "That work must be completed within 30 minutes",
      "That a safe system of work must be established before entry",
      "That the space must be heated to at least 15°C",
      "That a doctor must be present on site"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires that where entry to a confined space is unavoidable, a safe system of work shall be established. This must be followed for all work in the confined space and must include adequate arrangements for the rescue of persons in the event of an emergency.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Regulation 4 — Safe system",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 45,
    question: "What does Regulation 5 of the Confined Spaces Regulations 1997 require?",
    options: [
      "That the fire brigade must be notified before every confined space entry",
      "That suitable and sufficient emergency arrangements must be in place before anyone enters a confined space",
      "That the space must be ventilated for 24 hours before entry",
      "That every worker must hold a NEBOSH qualification"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 requires that suitable and sufficient arrangements for the rescue of persons in the event of an emergency shall be put in place before any person enters or works in a confined space. This includes trained rescue personnel, rescue equipment, and resuscitation equipment as appropriate.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Regulation 5 — Emergency",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 46,
    question: "Under which overarching legislation do the Confined Spaces Regulations 1997 sit?",
    options: [
      "The Factories Act 1961",
      "The Health and Safety at Work etc. Act 1974",
      "The Fire Safety Order 2005",
      "The Building Regulations 2010"
    ],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 were made under the Health and Safety at Work etc. Act 1974 (HASAWA). HASAWA provides the overarching legal framework for workplace health and safety in Great Britain, and the CSR 1997 are secondary legislation (statutory instruments) made under its powers.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Overarching legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 47,
    question: "Which regulation requires employers to carry out a risk assessment for work activities, including confined space work?",
    options: [
      "The Provision and Use of Work Equipment Regulations 1998",
      "The Management of Health and Safety at Work Regulations 1999",
      "The Personal Protective Equipment at Work Regulations 2022",
      "The Workplace (Health, Safety and Welfare) Regulations 1992"
    ],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 (Regulation 3) require employers to make a suitable and sufficient assessment of risks to their employees. This general duty applies to all work activities, including confined space work, and complements the specific requirements of the Confined Spaces Regulations 1997.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Risk assessment duty",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 48,
    question: "What is the purpose of L101 in relation to confined space work?",
    options: [
      "It is a training certificate for confined space workers",
      "It is the HSE's Approved Code of Practice and guidance that helps duty holders comply with the Confined Spaces Regulations 1997",
      "It is a manufacturer's instruction manual for breathing apparatus",
      "It is a European standard for confined space ventilation"
    ],
    correctAnswer: 1,
    explanation: "L101 'Safe Work in Confined Spaces' is the Approved Code of Practice (ACoP) published by the HSE. It provides practical guidance to help employers and duty holders comply with the Confined Spaces Regulations 1997. While not law itself, following the ACoP is normally sufficient to comply with the regulations.",
    section: "Module 2",
    difficulty: "basic",
    topic: "L101 purpose",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 49,
    question: "What legal status does an Approved Code of Practice (ACoP) such as L101 have?",
    options: [
      "It has no legal standing whatsoever",
      "It has the same force as an Act of Parliament",
      "It has a special legal status — failure to follow it is not an offence in itself, but it can be used as evidence of failing to comply with the regulations",
      "It is legally binding only on government buildings"
    ],
    correctAnswer: 2,
    explanation: "An ACoP has a special legal status. If a duty holder is prosecuted for a breach of the regulations and it is proved that they did not follow the relevant provisions of the ACoP, a court may find them at fault unless they can show that they complied with the regulation in some other equally effective way.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "ACoP legal status",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 50,
    question: "Who has duties under the Confined Spaces Regulations 1997?",
    options: [
      "Only the site manager",
      "Only the person entering the confined space",
      "Employers, the self-employed, and anyone who has control of the premises to any extent",
      "Only the health and safety officer"
    ],
    correctAnswer: 2,
    explanation: "The Confined Spaces Regulations 1997 place duties on employers (for their employees), the self-employed (for themselves and others affected by their work), and anyone who controls premises to any extent (e.g. building owners, landlords). This broad scope ensures that responsibility is shared among all those who can influence safety.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Duty holders",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 51,
    question: "A contractor is hired to carry out electrical work in a confined space on someone else's premises. Who is responsible for safety?",
    options: [
      "Only the premises owner",
      "Only the contractor",
      "Both the premises owner/controller and the contractor have overlapping duties",
      "Neither — the regulations do not apply to contractors"
    ],
    correctAnswer: 2,
    explanation: "When contractors work in confined spaces on another party's premises, duties overlap. The premises controller must provide information about known hazards and ensure the space is safe for the contractor to work in. The contractor must carry out risk assessments, implement safe systems of work, and ensure their employees are competent. Co-operation between both parties is essential.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Contractor duties",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 52,
    question: "What is the first step in a confined space risk assessment?",
    options: [
      "Ordering breathing apparatus",
      "Identifying whether the space meets the definition of a confined space",
      "Writing the permit to work",
      "Selecting the rescue team"
    ],
    correctAnswer: 1,
    explanation: "The first step is to identify whether the space is actually a confined space — i.e. whether it is substantially enclosed and has a foreseeable risk of serious injury from hazardous conditions. If it is not a confined space, the specific requirements of the CSR 1997 do not apply (though general health and safety duties still do).",
    section: "Module 2",
    difficulty: "basic",
    topic: "Risk assessment steps",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 53,
    question: "Once a space has been confirmed as confined, what must the risk assessment evaluate?",
    options: [
      "Only the cost of the work",
      "The specific hazards present, who might be harmed, the likelihood and severity of harm, and what control measures are needed",
      "Only whether PPE is available",
      "Only the size of the access opening"
    ],
    correctAnswer: 1,
    explanation: "The risk assessment for a confirmed confined space must evaluate all specific hazards (atmospheric, physical, biological), who might be harmed (entrants, standby persons, nearby workers), the likelihood and potential severity of harm, and what control measures are needed to eliminate or reduce the risk to an acceptable level.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Risk assessment scope",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 54,
    question: "What is a permit-to-work system in the context of confined spaces?",
    options: [
      "A planning permission document from the local council",
      "A formal, documented system that authorises certain people to carry out specific work in a confined space under controlled conditions",
      "A driving licence required to operate vehicles near confined spaces",
      "A verbal agreement between the site manager and the worker"
    ],
    correctAnswer: 1,
    explanation: "A permit-to-work (PTW) is a formal documented procedure that forms part of a safe system of work. It authorises named individuals to carry out specific work in a confined space at a specific time, subject to specified precautions being in place. It acts as a checklist, communication tool, and record of the controls applied.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Permit to work",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 55,
    question: "Is a permit to work always required for confined space entry?",
    options: [
      "Yes — it is a legal requirement for every confined space entry",
      "No — the regulations require a safe system of work, which may or may not include a permit to work depending on the risk assessment",
      "Only if the confined space is underground",
      "Only if more than three people are entering"
    ],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 require a safe system of work (Regulation 4) but do not specifically mandate a permit to work for every entry. However, L101 strongly recommends permits for most confined space entries as they provide a structured, documented approach. The risk assessment should determine whether a permit is appropriate.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Permit requirements",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 56,
    question: "What information should a confined space permit to work typically contain?",
    options: [
      "Only the names of the workers and the date",
      "The work to be done, hazards identified, precautions required, gas test results, emergency procedures, time limits, and authorisation signatures",
      "Only the company's insurance policy number",
      "Only the dimensions of the confined space"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive permit to work should include: description and location of the space; the work to be done; hazards identified; precautions required (isolation, ventilation, PPE); atmospheric test results; emergency and rescue arrangements; time limits for the work; names of authorised persons; and signatures for issue, acceptance, and cancellation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Permit content",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 57,
    question: "What does the term 'competent person' mean in the context of confined space work?",
    options: [
      "Any person who has worked on site for more than one year",
      "A person who has the necessary training, experience, and knowledge to carry out the specific task safely",
      "A person who holds a university degree in engineering",
      "Any person over the age of 25"
    ],
    correctAnswer: 1,
    explanation: "A competent person is someone who has sufficient training, experience, knowledge, and other qualities to carry out the specific task safely and to recognise their own limitations. For confined space work, this includes understanding the hazards, knowing how to use equipment correctly, and being able to follow and implement the safe system of work.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Competence",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 58,
    question: "Which of the following is a key element of a safe system of work for confined space entry?",
    options: [
      "Having a vending machine near the entry point",
      "Ensuring the space is adequately isolated from all connected services, pipelines, and energy sources before entry",
      "Painting the entry hatch a bright colour",
      "Playing music to keep workers calm"
    ],
    correctAnswer: 1,
    explanation: "Isolation is a critical element of a safe system of work for confined space entry. All connected pipes, ducts, and services must be physically isolated (locked off, blanked, disconnected) to prevent the ingress of hazardous substances, the release of stored energy, or the introduction of services during the work.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Safe system elements",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 59,
    question: "What is the legal hierarchy of control measures for confined space work?",
    options: [
      "Enter first, assess risks later",
      "Avoid entry if reasonably practicable → if entry is unavoidable, follow a safe system of work → have emergency arrangements in place",
      "Provide PPE → carry out a risk assessment → enter the space",
      "Notify the HSE → wait for approval → enter"
    ],
    correctAnswer: 1,
    explanation: "The CSR 1997 establishes a clear hierarchy: first, avoid entry to the confined space if the work can be done another way (Regulation 3); second, if entry is unavoidable, establish and follow a safe system of work (Regulation 4); third, have suitable and sufficient emergency and rescue arrangements in place before entry (Regulation 5).",
    section: "Module 2",
    difficulty: "basic",
    topic: "Hierarchy of control",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 60,
    question: "Which other UK regulations may also apply when working in a confined space?",
    options: [
      "Only the Confined Spaces Regulations 1997 apply — no other legislation is relevant",
      "The Electricity at Work Regulations 1989, COSHH 2002, PUWER 1998, and the CDM Regulations 2015 may all be relevant depending on the work",
      "Only the Fire Safety Order 2005",
      "Only the Highways Act 1980"
    ],
    correctAnswer: 1,
    explanation: "Multiple regulations can apply simultaneously. The Electricity at Work Regulations 1989 apply to electrical work within the space; COSHH 2002 applies to hazardous substances; PUWER 1998 applies to work equipment used; CDM 2015 applies on construction sites. The duty holder must comply with all applicable legislation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Overlapping legislation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 61,
    question: "What penalties can be imposed for breaching the Confined Spaces Regulations 1997?",
    options: [
      "No penalties — the regulations are advisory only",
      "A verbal warning from the HSE with no further action",
      "Unlimited fines and/or imprisonment for individuals; unlimited fines for organisations, with additional sentencing guidelines for fatalities",
      "A maximum fine of £100"
    ],
    correctAnswer: 2,
    explanation: "Breaches of the Confined Spaces Regulations can result in prosecution under HASAWA 1974. For organisations, fines are unlimited. For individuals, penalties can include unlimited fines and/or imprisonment (up to 2 years for certain offences). Where fatalities occur, the Corporate Manslaughter and Corporate Homicide Act 2007 may also apply.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Penalties",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 62,
    question: "What role does the HSE play in enforcing confined space regulations?",
    options: [
      "The HSE only writes guidance — it cannot enforce anything",
      "The HSE is the primary enforcing authority; its inspectors can issue improvement notices, prohibition notices, and prosecute offenders",
      "The HSE only enforces regulations in Scotland",
      "The HSE delegates all enforcement to local councils"
    ],
    correctAnswer: 1,
    explanation: "The HSE (Health and Safety Executive) is the primary enforcing authority for the Confined Spaces Regulations 1997. HSE inspectors can visit workplaces, investigate incidents, issue improvement notices (requiring compliance within a set time), issue prohibition notices (stopping dangerous work immediately), and prosecute duty holders who breach the regulations.",
    section: "Module 2",
    difficulty: "basic",
    topic: "HSE enforcement",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 63,
    question: "What is an improvement notice issued by the HSE?",
    options: [
      "A letter of congratulation for good practice",
      "A formal notice requiring a duty holder to remedy a contravention within a specified time period",
      "A request for a donation to the HSE",
      "An invitation to attend an HSE training course"
    ],
    correctAnswer: 1,
    explanation: "An improvement notice is served by an HSE inspector when they identify a contravention of health and safety legislation. It requires the duty holder to remedy the contravention within a specified time period (usually at least 21 days). Failure to comply with an improvement notice is a criminal offence.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Improvement notices",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 64,
    question: "What is a prohibition notice?",
    options: [
      "A notice that prohibits workers from taking breaks",
      "A notice that immediately stops a dangerous work activity until the risk is adequately controlled",
      "A notice that prohibits the use of mobile phones on site",
      "A notice that prevents the HSE from visiting a site"
    ],
    correctAnswer: 1,
    explanation: "A prohibition notice directs that an activity shall not be carried on (or shall not be carried on unless certain conditions are met) because the inspector believes there is a risk of serious personal injury. It takes immediate effect if the risk is imminent. For confined space work, this might be used to stop entry where no safe system of work is in place.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Prohibition notices",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 65,
    question: "When should a confined space risk assessment be reviewed?",
    options: [
      "Only once every five years",
      "Only after an accident has occurred",
      "Whenever there is a significant change in conditions, work activities, or personnel, or when the assessment is no longer valid",
      "Never — once written, a risk assessment is permanent"
    ],
    correctAnswer: 2,
    explanation: "A confined space risk assessment must be reviewed whenever there are significant changes in the work activity, the conditions within or around the space, or the personnel involved. It should also be reviewed if there is reason to believe it is no longer valid, after incidents or near misses, and at regular intervals as good practice.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Review of assessments",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 66,
    question: "What is the role of a 'responsible person' or 'authorised person' in a permit-to-work system?",
    options: [
      "To carry out the physical work inside the confined space",
      "To assess the hazards, define the precautions, issue the permit, and ensure the safe system of work is followed",
      "To provide lunch for the work team",
      "To keep the office records up to date"
    ],
    correctAnswer: 1,
    explanation: "The responsible/authorised person is a competent individual who assesses the hazards, defines the required precautions, issues the permit, monitors compliance, and ensures the safe system of work is followed throughout the entry. They must have the authority to stop work if conditions change and the knowledge to make informed safety decisions.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Authorised persons",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 67,
    question: "What should happen to a confined space permit to work at the end of the work period?",
    options: [
      "It should be thrown away immediately",
      "It should be formally cancelled, with confirmation that all persons have exited, the space is secure, and it should be retained as a record",
      "It should be left inside the confined space",
      "It should be given to the local council"
    ],
    correctAnswer: 1,
    explanation: "At the end of the work period, the permit must be formally cancelled by the responsible person. This involves confirming all persons have exited the space, tools and equipment have been removed, the space has been made safe, and any isolations can be reinstated. The cancelled permit should be retained as a record for future reference.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Permit cancellation",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 68,
    question: "Under RIDDOR, what confined space incidents must be reported to the HSE?",
    options: [
      "Only incidents where someone dies",
      "Deaths, specified injuries, dangerous occurrences (including loss of consciousness due to asphyxiation in a confined space), and work-related diseases",
      "Only incidents that result in civil lawsuits",
      "Only incidents in the petrochemical industry"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), confined space incidents that must be reported include deaths, specified injuries, dangerous occurrences (such as loss of consciousness due to lack of oxygen in a confined space), and over-7-day incapacitations. Loss of consciousness in a confined space is specifically listed as a dangerous occurrence.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RIDDOR reporting",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 69,
    question: "How does the Construction (Design and Management) Regulations 2015 relate to confined space work on construction sites?",
    options: [
      "CDM 2015 replaces the Confined Spaces Regulations entirely on construction sites",
      "CDM 2015 requires designers to eliminate or reduce risks (including confined space risks) at the design stage, and principal contractors to plan and manage confined space work",
      "CDM 2015 only applies to buildings over 4 storeys tall",
      "CDM 2015 exempts construction sites from confined space regulations"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 complements the CSR 1997 on construction sites. Designers have a duty to eliminate hazards (including confined space entry where possible) at the design stage. Principal contractors must plan, manage, and coordinate confined space work. The pre-construction information and construction phase plan should address confined space risks.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CDM integration",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 70,
    question: "What is a 'dynamic risk assessment' in the context of confined spaces?",
    options: [
      "A risk assessment that is only done while running",
      "An ongoing, real-time assessment of changing conditions within and around the confined space during the work activity",
      "A risk assessment conducted by two people at the same time",
      "A risk assessment that uses computer software"
    ],
    correctAnswer: 1,
    explanation: "A dynamic risk assessment is the continuous process of monitoring and re-evaluating risks as conditions change during the work. In confined spaces, conditions can change rapidly — gas levels may fluctuate, weather may affect ventilation, or new hazards may emerge. Workers must be trained to recognise changing conditions and respond appropriately, including stopping work and evacuating if necessary.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Dynamic assessment",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 71,
    question: "What does the term 'isolation' mean in a confined space safe system of work?",
    options: [
      "Keeping the person in the confined space away from their colleagues",
      "Physically disconnecting, blanking, or locking off all pipelines, services, and energy sources that could introduce hazards into the confined space",
      "Closing the door of the confined space",
      "Placing warning signs around the entry point"
    ],
    correctAnswer: 1,
    explanation: "Isolation in confined space work means physically disconnecting, blanking off, or locking out all pipelines (liquid, gas, or solid), electrical supplies, mechanical drives, and other energy sources that could introduce hazardous substances or energy into the space. Simple valve closure alone is not sufficient — positive isolation methods must be used.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Isolation procedures",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 72,
    question: "Why is a 'lock-out/tag-out' (LOTO) procedure important for confined space work?",
    options: [
      "It ensures the confined space looks tidy",
      "It prevents the inadvertent re-energisation of isolated systems, which could introduce hazardous substances, energy, or mechanical movement into the space",
      "It is only required for working on vehicles",
      "It ensures workers have their own locker"
    ],
    correctAnswer: 1,
    explanation: "Lock-out/tag-out (LOTO) prevents isolated systems from being inadvertently re-energised or reconnected while people are inside the confined space. Personal locks ensure that only the person who applied the lock can remove it. Tags provide visible warnings. Without LOTO, someone unaware of the confined space entry could re-start equipment or open valves, with potentially fatal consequences.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "LOTO procedures",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 73,
    question: "What training must workers receive before entering a confined space?",
    options: [
      "No specific training is required",
      "Training appropriate to the level of risk, covering hazard awareness, use of equipment, safe working procedures, and emergency actions",
      "Only a 10-minute toolbox talk is sufficient for all confined space work",
      "Training is only needed for supervisors, not workers"
    ],
    correctAnswer: 1,
    explanation: "Workers must receive training appropriate to the risks they will face. This should cover: recognition of confined space hazards; use of gas detection equipment; use of PPE and RPE; understanding the safe system of work and permit; communication procedures; and emergency and rescue procedures. Training must be refreshed regularly and supplemented with site-specific briefings.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Training requirements",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 74,
    question: "What is the legal significance of an employer's failure to carry out a risk assessment before confined space entry?",
    options: [
      "It is merely a recommendation, not a legal requirement",
      "It constitutes a breach of both the Management Regulations 1999 and the Confined Spaces Regulations 1997, potentially leading to prosecution",
      "It only matters if an accident occurs",
      "It is only relevant for government buildings"
    ],
    correctAnswer: 1,
    explanation: "Failure to carry out a risk assessment before confined space entry breaches Regulation 3 of the Management of Health and Safety at Work Regulations 1999 (general risk assessment duty) and the duty under the CSR 1997 to determine whether the work can be done without entry. This double breach can lead to prosecution, fines, and imprisonment.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Legal consequences",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 75,
    question: "How should the risk assessment address the risk of multiple persons being affected in a confined space incident?",
    options: [
      "Multiple persons in a confined space reduce the risk because they can help each other",
      "The assessment must consider the 'cascade effect' where a hazardous atmosphere can overcome multiple people, and must limit the number of entrants and ensure rescue can handle multiple casualties",
      "There is no need to consider multiple casualties",
      "The risk is the same regardless of how many people enter"
    ],
    correctAnswer: 1,
    explanation: "The risk assessment must address the 'cascade effect' — if one person is overcome, others rushing to help without proper precautions may also be overcome. Historically, many confined space fatalities involve would-be rescuers. The assessment should limit entrants to the minimum necessary and ensure rescue arrangements can handle multiple casualties.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Cascade effect",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 76,
    question: "What is the purpose of a 'method statement' for confined space work?",
    options: [
      "It is a marketing document for the company",
      "It is a detailed document describing the step-by-step procedure for carrying out the work safely, including all required precautions",
      "It is a statement of the costs involved",
      "It is a legal contract between the employer and the HSE"
    ],
    correctAnswer: 1,
    explanation: "A method statement (also called a safe method of work or SSOW) is a detailed document that describes, step by step, how the work will be carried out safely. For confined spaces, it should include the sequence of operations, precautions at each stage, equipment to be used, responsibilities, and what to do if conditions change.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Method statements",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 77,
    question: "Under the CSR 1997, what is meant by 'so far as is reasonably practicable'?",
    options: [
      "That duties only apply when it is convenient for the employer",
      "That the duty holder must balance the risk against the time, trouble, cost, and difficulty of taking measures to avoid it — unless the risk is grossly disproportionate to the cost",
      "That the duty holder can ignore the regulations if they are too expensive to follow",
      "That the HSE will decide what is practical on a case-by-case basis before work begins"
    ],
    correctAnswer: 1,
    explanation: "'So far as is reasonably practicable' means that the duty holder must weigh the risk against the sacrifice (time, trouble, cost, difficulty) needed to avert it. If the risk is significant, substantial measures are required. The test is whether a reasonable person would judge it right to take the measures to reduce the risk. In practice, for the serious risks in confined spaces, avoidance and extensive precautions are almost always deemed practicable.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Reasonably practicable",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 78,
    question: "What documentation should be kept following confined space work?",
    options: [
      "No documentation is needed once the work is complete",
      "Risk assessments, permits to work, gas test records, training records, and any incident reports should be retained",
      "Only the invoice for the work",
      "Only a photograph of the completed work"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation should be retained following confined space work, including: the risk assessment, the permit to work (issued and cancelled), atmospheric monitoring records, training and competence records of those involved, any incident or near-miss reports, and equipment inspection certificates. These records support legal compliance, learning, and future risk assessments.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Record keeping",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 79,
    question: "How does the Provision and Use of Work Equipment Regulations 1998 (PUWER) apply to confined space work?",
    options: [
      "PUWER does not apply to confined spaces",
      "PUWER requires that all equipment used in confined spaces (including gas detectors, ventilation fans, breathing apparatus, and communication systems) is suitable, maintained, and used by trained persons",
      "PUWER only applies to power tools",
      "PUWER requires all equipment to be brand new"
    ],
    correctAnswer: 1,
    explanation: "PUWER applies to all work equipment used in confined spaces. This includes gas detection instruments, ventilation equipment, breathing apparatus, harnesses, winches, lighting, power tools, and communication systems. All such equipment must be suitable for the task, properly maintained, inspected, and used only by persons who have received adequate training.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "PUWER application",
    category: "Legislation & Risk Assessment"
  },
  {
    id: 80,
    question: "A principal contractor on a construction site receives a risk assessment from a subcontractor for confined space work. What should the principal contractor do?",
    options: [
      "File it away without reading it",
      "Review the assessment for adequacy, ensure it aligns with the construction phase plan, verify the subcontractor's competence, and monitor compliance during the work",
      "Simply sign it and return it",
      "Pass it to the client for their records"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015 and the CSR 1997, the principal contractor must actively review the subcontractor's risk assessment to ensure it is suitable and sufficient, that it aligns with the overall construction phase plan, that the subcontractor is competent, and that the proposed safe system of work is adequate. The principal contractor should also monitor the work to ensure compliance.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Principal contractor duties",
    category: "Legislation & Risk Assessment"
  },

  // =======================================================================
  // HAZARDS & ATMOSPHERIC MONITORING — 20 questions (id 81-100)
  // ~7 basic, ~9 intermediate, ~4 advanced
  // (Remaining 20 questions for this category will be in Part 2)
  // =======================================================================
  {
    id: 81,
    question: "What is the normal oxygen concentration in the atmosphere?",
    options: [
      "16%",
      "19.5%",
      "20.9%",
      "23.5%"
    ],
    correctAnswer: 2,
    explanation: "Normal atmospheric oxygen concentration is approximately 20.9% by volume. In confined spaces, this can be reduced (oxygen depletion) by chemical reactions, biological processes, or displacement by other gases. Entry should not take place if oxygen levels fall below 19.5% without appropriate respiratory protective equipment.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Normal oxygen levels",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 82,
    question: "Below what oxygen concentration is a confined space atmosphere considered oxygen-deficient and dangerous?",
    options: [
      "Below 23%",
      "Below 20.9%",
      "Below 19.5%",
      "Below 16%"
    ],
    correctAnswer: 2,
    explanation: "An atmosphere is considered oxygen-deficient when the oxygen concentration falls below 19.5%. At this level, breathing becomes impaired and cognitive function is affected. Below 16%, there is a risk of loss of consciousness. Below 6%, death can occur within minutes. Continuous monitoring is essential in confined spaces to detect oxygen depletion.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Oxygen deficiency threshold",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 83,
    question: "What does 'LEL' stand for in atmospheric monitoring?",
    options: [
      "Low Energy Level",
      "Lower Explosive Limit",
      "Least Effective Limit",
      "Lower Emission Limit"
    ],
    correctAnswer: 1,
    explanation: "LEL stands for Lower Explosive Limit (also called the Lower Flammable Limit, LFL). It is the minimum concentration of a flammable gas or vapour in air that can ignite and sustain combustion. Below the LEL, the mixture is too lean to burn. In confined spaces, gas concentrations should be maintained well below 10% of the LEL for safe working.",
    section: "Module 3",
    difficulty: "basic",
    topic: "LEL definition",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 84,
    question: "At what percentage of the LEL should a confined space be evacuated?",
    options: [
      "5% LEL",
      "10% LEL",
      "25% LEL",
      "50% LEL"
    ],
    correctAnswer: 1,
    explanation: "As a general rule, if flammable gas or vapour concentrations reach 10% of the LEL, the confined space should be evacuated and the source investigated. Some organisations set even more conservative alarm levels (e.g. 5% LEL for the first warning alarm). Working should not take place above 10% LEL without exceptional controls and justification.",
    section: "Module 3",
    difficulty: "basic",
    topic: "LEL action levels",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 85,
    question: "What is hydrogen sulphide (H₂S) and why is it a significant confined space hazard?",
    options: [
      "A harmless gas with no smell",
      "A toxic, flammable gas with a characteristic 'rotten eggs' smell at low concentrations, but it deadens the sense of smell at higher concentrations, making it extremely dangerous",
      "A gas that only exists in laboratories",
      "A non-toxic gas used in fire extinguishers"
    ],
    correctAnswer: 1,
    explanation: "Hydrogen sulphide (H₂S) is a highly toxic, flammable gas commonly found in sewers, manholes, and anywhere organic matter decomposes. It has a distinctive 'rotten eggs' smell at low concentrations, but at around 100 ppm it paralyses the olfactory nerve, eliminating the ability to smell it — just as concentrations reach immediately dangerous levels. The UK Workplace Exposure Limit (WEL) is 5 ppm (8-hour TWA) and 10 ppm (15-minute STEL).",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Hydrogen sulphide",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 86,
    question: "What is the Workplace Exposure Limit (WEL) for carbon monoxide (CO)?",
    options: [
      "5 ppm (8-hour TWA)",
      "20 ppm (8-hour TWA)",
      "100 ppm (8-hour TWA)",
      "500 ppm (8-hour TWA)"
    ],
    correctAnswer: 1,
    explanation: "The UK Workplace Exposure Limit for carbon monoxide is 20 ppm as an 8-hour Time-Weighted Average (TWA), with a 15-minute Short-Term Exposure Limit (STEL) of 100 ppm. Carbon monoxide is colourless and odourless, binding to haemoglobin 200-250 times more readily than oxygen, making it an extremely dangerous confined space hazard.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Carbon monoxide WEL",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 87,
    question: "What type of gas detector is most commonly used for pre-entry and continuous monitoring of confined spaces?",
    options: [
      "A single-gas carbon dioxide detector",
      "A multi-gas detector (typically measuring O₂, LEL, CO, and H₂S simultaneously)",
      "A smoke detector from a domestic fire alarm",
      "A breathalyser"
    ],
    correctAnswer: 1,
    explanation: "A 4-gas (or multi-gas) portable detector is the standard instrument for confined space atmospheric monitoring. It typically measures oxygen (O₂), flammable gases (as % LEL), carbon monoxide (CO), and hydrogen sulphide (H₂S) simultaneously. Some units have additional sensor slots for specific gases relevant to the work environment.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Gas detection equipment",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 88,
    question: "Why must atmospheric monitoring in a confined space be carried out at different levels (top, middle, and bottom)?",
    options: [
      "Because health and safety law requires three readings for legal compliance",
      "Because different gases have different densities — lighter gases rise to the top and heavier gases sink to the bottom, so a single-level reading may miss dangerous concentrations",
      "Because the gas detector needs to be calibrated at each level",
      "Because workers may be standing, sitting, or lying down at any time"
    ],
    correctAnswer: 1,
    explanation: "Gases have different densities relative to air. Methane (lighter) rises and concentrates near the top. Carbon dioxide and hydrogen sulphide (heavier) sink and concentrate at the bottom. A single-level reading could indicate safe conditions while dangerous concentrations exist at another level. Testing at top, middle, and bottom ensures comprehensive coverage.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Multi-level monitoring",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 89,
    question: "What does 'purging' a confined space mean?",
    options: [
      "Emptying the space of all tools and equipment",
      "Flushing the space with clean air or an inert gas to remove hazardous atmospheres before entry",
      "Painting the interior walls of the space",
      "Removing all standing water from the space"
    ],
    correctAnswer: 1,
    explanation: "Purging means displacing the existing atmosphere within a confined space by introducing clean air (or sometimes an inert gas before subsequent air replacement). This is done using mechanical ventilation to remove hazardous gases, vapours, or fumes and establish a safe breathing atmosphere before entry. Continuous ventilation is often maintained during work.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Purging",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 90,
    question: "What is the danger of oxygen enrichment in a confined space?",
    options: [
      "There is no danger — more oxygen is always better",
      "Oxygen-enriched atmospheres (above 23.5%) greatly increase the risk of fire and explosion, as materials that would not normally burn in normal air can ignite readily",
      "Oxygen enrichment only affects plants, not humans",
      "Oxygen enrichment makes the air smell bad"
    ],
    correctAnswer: 1,
    explanation: "Oxygen-enriched atmospheres (above approximately 23.5%) are extremely dangerous because they dramatically increase the flammability of materials. Clothing, hair, and materials that would not normally burn in air can ignite readily and burn fiercely. Oxygen enrichment can occur from leaking oxygen lines, cylinders, or certain chemical reactions within the space.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Oxygen enrichment",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 91,
    question: "How often should a portable gas detector be 'bump tested'?",
    options: [
      "Once a year",
      "Before each day's use, or in accordance with the manufacturer's instructions",
      "Only when it is first purchased",
      "Only after it has been dropped"
    ],
    correctAnswer: 1,
    explanation: "A bump test (functional check) should be performed before each day's use. This involves briefly exposing the sensors to a known concentration of test gas to verify they respond correctly. This is separate from full calibration (which is typically done at manufacturer-specified intervals). A detector that fails a bump test must not be used until recalibrated.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Bump testing",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 92,
    question: "What is the difference between a 'bump test' and a 'calibration' for a gas detector?",
    options: [
      "There is no difference — the terms are interchangeable",
      "A bump test verifies that the sensors respond to gas, while a calibration adjusts the sensor readings to match known reference concentrations",
      "A bump test is done with clean air, while a calibration is done with dirty air",
      "A bump test is for oxygen sensors only, while calibration is for all sensors"
    ],
    correctAnswer: 1,
    explanation: "A bump test is a quick functional check that exposes the sensors to a known gas to confirm they respond and alarm correctly. It verifies the detector is working but does not adjust readings. A calibration is a more thorough process that adjusts the sensor readings to accurately match known reference gas concentrations, ensuring measurement accuracy.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Bump test vs calibration",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 93,
    question: "What is the primary hazard of methane (CH₄) in a confined space?",
    options: [
      "It is extremely toxic at low concentrations",
      "It is a simple asphyxiant (displaces oxygen) and is highly flammable, creating an explosion risk when concentrations reach between 5% and 15% in air",
      "It causes skin burns on contact",
      "It turns the air bright yellow"
    ],
    correctAnswer: 1,
    explanation: "Methane is a simple asphyxiant — it is not toxic in itself but displaces oxygen, leading to suffocation. Its primary hazard in a confined space is its flammability. Methane's flammable range is approximately 5% to 15% in air, meaning concentrations within this range can ignite explosively. It is lighter than air and tends to accumulate near the top of enclosed spaces.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Methane hazards",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 94,
    question: "What physical hazards, other than atmospheric, can be present in a confined space?",
    options: [
      "Only atmospheric hazards are relevant in confined spaces",
      "Flooding/drowning, engulfment, electrical hazards, mechanical hazards from moving parts, excessive heat or cold, noise, and radiation",
      "Only the risk of falling from height",
      "Only the risk of manual handling injuries"
    ],
    correctAnswer: 1,
    explanation: "Confined spaces present multiple physical hazards beyond atmospheric risks: flooding or drowning from water ingress; engulfment by free-flowing solids; electrical hazards from cables or equipment; mechanical hazards from agitators, conveyors, or other moving parts; excessive heat or cold; high noise levels amplified by the enclosed space; and potential radiation from stored materials.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Physical hazards",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 95,
    question: "Why is carbon dioxide (CO₂) particularly dangerous in confined spaces?",
    options: [
      "It has a strong, easily detectable odour",
      "It is denser than air and accumulates at low levels, is an asphyxiant that displaces oxygen, and at higher concentrations acts as a direct toxin affecting the central nervous system",
      "It is only dangerous when mixed with water",
      "It is only found in breweries"
    ],
    correctAnswer: 1,
    explanation: "Carbon dioxide is approximately 1.5 times denser than air, so it sinks and accumulates at the bottom of confined spaces. As an asphyxiant, it displaces oxygen. Additionally, CO₂ is directly toxic at higher concentrations — above 4% it affects the central nervous system, causing headaches and dizziness; above 10% it can cause unconsciousness within minutes and death. The WEL is 5,000 ppm (0.5%) 8-hour TWA.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Carbon dioxide hazards",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 96,
    question: "What causes oxygen depletion in a confined space?",
    options: [
      "Only leaking gas cylinders",
      "Rusting of steel surfaces, biological decomposition, displacement by other gases, combustion processes, and chemical reactions that consume oxygen",
      "Only poor ventilation design",
      "Only the presence of workers breathing"
    ],
    correctAnswer: 1,
    explanation: "Multiple processes can deplete oxygen in a confined space: rusting (oxidation) of steel surfaces; biological decomposition of organic matter; displacement by other gases (nitrogen, carbon dioxide, argon); combustion processes (including hot work); chemical reactions between substances; and respiration by people or microorganisms. Some of these processes can reduce oxygen dangerously within hours or even minutes.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Oxygen depletion causes",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 97,
    question: "What is a photoionisation detector (PID) used for in confined space monitoring?",
    options: [
      "To measure light levels inside the confined space",
      "To detect and measure a wide range of volatile organic compounds (VOCs) and other ionisable gases at very low concentrations",
      "To take photographs of the confined space interior",
      "To measure humidity levels"
    ],
    correctAnswer: 1,
    explanation: "A PID uses ultraviolet light to ionise gas molecules and measure the resulting current, providing a reading of total volatile organic compound (VOC) concentration. PIDs can detect many gases at parts-per-billion levels, making them useful for identifying the presence of toxic organic vapours that standard 4-gas detectors may not measure. However, they do not identify specific gases.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "PID detectors",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 98,
    question: "What is 'cross-sensitivity' in gas detection and why does it matter in confined spaces?",
    options: [
      "It means the detector is sensitive to temperature changes only",
      "It means a sensor designed to detect one gas may also respond to other gases, potentially giving false readings — this must be understood when interpreting results in environments with multiple gases",
      "It means the detector can only be used in one type of confined space",
      "It means two detectors must always be used together"
    ],
    correctAnswer: 1,
    explanation: "Cross-sensitivity occurs when a sensor responds to gases other than its target gas. For example, an H₂S sensor may also respond to SO₂, or a CO sensor may respond to hydrogen. In confined spaces where multiple gases may be present, cross-sensitivity can cause misleading readings — either false alarms or, more dangerously, suppressed readings. Operators must understand their detector's cross-sensitivity characteristics.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Cross-sensitivity",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 99,
    question: "When using mechanical ventilation in a confined space, what important factor must be considered regarding the air supply?",
    options: [
      "The fan must be painted a bright colour",
      "The fresh air intake must be positioned in an area free from contamination, away from exhausts, generators, or other sources of hazardous gases",
      "The ventilation must be noisy enough for workers to hear it",
      "The ventilation equipment must be the most expensive option available"
    ],
    correctAnswer: 1,
    explanation: "The position of the fresh air intake is critical. If it is located near vehicle exhausts, generator emissions, or other sources of contamination, it will draw hazardous gases into the confined space rather than supplying clean air. The intake must be positioned upwind and away from all potential sources of contamination. The volume and direction of airflow must also be sufficient to maintain safe atmospheric conditions throughout the space.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Ventilation air supply",
    category: "Hazards & Atmospheric Monitoring"
  },
  {
    id: 100,
    question: "What is the purpose of continuous atmospheric monitoring during confined space work, as opposed to pre-entry testing alone?",
    options: [
      "Continuous monitoring is not necessary if pre-entry testing was clear",
      "Atmospheric conditions can change rapidly during work — continuous monitoring provides real-time warning of deteriorating conditions so workers can evacuate before reaching dangerous levels",
      "Continuous monitoring is only needed in the petrochemical industry",
      "Continuous monitoring is done for insurance purposes only"
    ],
    correctAnswer: 1,
    explanation: "Pre-entry testing only captures a snapshot of conditions at one moment. During work, conditions can change rapidly due to: disturbing sediment or residues, work activities generating fumes, changes in external conditions (e.g. tidal flows in sewers), or delayed release of trapped gases. Continuous monitoring with audible and visual alarms provides real-time warning, allowing workers to evacuate before conditions become immediately dangerous.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Continuous monitoring",
    category: "Hazards & Atmospheric Monitoring"
  },

  // ===== Questions 101-200 (merged) =====
// TEMPORARY FILE — Part 2 of Confined Spaces Awareness mock exam (IDs 101-200)
// No imports/exports/array brackets — just comma-separated question objects

// ─── HAZARDS & ATMOSPHERIC MONITORING (continued) — IDs 101-120 ───

{
  id: 101,
  question: "What is the Workplace Exposure Limit (WEL) for carbon monoxide as an 8-hour TWA under EH40?",
  options: [
    "20 ppm",
    "30 ppm",
    "50 ppm",
    "100 ppm"
  ],
  correctAnswer: 1,
  explanation: "The 8-hour TWA Workplace Exposure Limit for carbon monoxide is 30 ppm as specified in EH40/2005 (Fourth Edition). The short-term exposure limit (STEL) is 200 ppm over a 15-minute reference period.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 102,
  question: "A multi-gas detector alarms for hydrogen sulphide at 5 ppm. What does this alarm level represent?",
  options: [
    "The STEL value",
    "The TWA alarm setpoint",
    "The IDLH threshold",
    "The lower explosive limit"
  ],
  correctAnswer: 1,
  explanation: "The TWA alarm setpoint for hydrogen sulphide on most multi-gas detectors is set at 5 ppm, which corresponds to the 8-hour TWA Workplace Exposure Limit under EH40. The STEL alarm is typically set at 10 ppm, and the IDLH value for H₂S is 50 ppm.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 103,
  question: "When performing atmospheric monitoring in a confined space, at what minimum number of levels should readings be taken?",
  options: [
    "One level — at the breathing zone only",
    "Two levels — top and bottom",
    "Three levels — top, middle, and bottom",
    "Four levels — each corner of the space"
  ],
  correctAnswer: 2,
  explanation: "Atmospheric monitoring should be taken at a minimum of three levels: top, middle, and bottom of the confined space. Different gases have different vapour densities — heavier-than-air gases (such as CO₂ and H₂S) will accumulate at the bottom, while lighter-than-air gases (such as methane) will rise to the top.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "basic"
},
{
  id: 104,
  question: "What vapour density characteristic makes methane particularly hazardous at the top of a confined space?",
  options: [
    "It is heavier than air with a vapour density of 1.5",
    "It is lighter than air with a vapour density of approximately 0.55",
    "It has the same density as air",
    "Its density changes depending on temperature"
  ],
  correctAnswer: 1,
  explanation: "Methane has a vapour density of approximately 0.55 relative to air, making it significantly lighter than air. It will therefore accumulate at the top of a confined space, which is why atmospheric monitoring must include readings at the upper level of the space.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 105,
  question: "A confined space contains an atmosphere with 19.0% oxygen. What action should be taken?",
  options: [
    "Entry may proceed with no additional precautions",
    "Entry is permitted but continuous monitoring is required",
    "Entry should not proceed without respiratory protective equipment",
    "The space must be purged with nitrogen before entry"
  ],
  correctAnswer: 2,
  explanation: "Normal atmospheric oxygen is 20.9%. An oxygen level of 19.0% is below the safe working minimum of 19.5% and indicates oxygen depletion. Entry should not proceed without appropriate respiratory protective equipment (RPE) such as breathing apparatus, or the space must be ventilated to restore safe oxygen levels before entry.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "basic"
},
{
  id: 106,
  question: "What does the term 'IDLH' stand for in the context of atmospheric hazards?",
  options: [
    "Immediately Dangerous to Life and Health",
    "Initial Detection of Lethal Hazards",
    "Indicated Danger Level for Humans",
    "Instantaneous Dosage of Lethal Hydrocarbons"
  ],
  correctAnswer: 0,
  explanation: "IDLH stands for 'Immediately Dangerous to Life and Health'. It represents the maximum airborne concentration of a substance from which a person could escape within 30 minutes without experiencing any escape-impairing symptoms or irreversible health effects. At or above IDLH concentrations, only self-contained breathing apparatus (SCBA) should be used.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "basic"
},
{
  id: 107,
  question: "Which gas detection technology uses an electrochemical cell to measure toxic gas concentrations?",
  options: [
    "Catalytic bead sensor",
    "Infrared absorption sensor",
    "Electrochemical sensor",
    "Photoionisation detector"
  ],
  correctAnswer: 2,
  explanation: "Electrochemical sensors use a chemical reaction between the target gas and an electrolyte within the sensor cell to generate a measurable electrical current proportional to the gas concentration. They are the standard technology for detecting toxic gases such as CO, H₂S, SO₂, and NO₂ in multi-gas detectors.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 108,
  question: "A catalytic bead (pellistor) sensor in a multi-gas detector will NOT provide reliable LEL readings when oxygen levels fall below which approximate percentage?",
  options: [
    "20.9%",
    "19.5%",
    "16%",
    "10%"
  ],
  correctAnswer: 2,
  explanation: "Catalytic bead (pellistor) sensors rely on the combustion of flammable gases on a heated catalyst to produce a reading. When oxygen concentrations fall below approximately 16%, there is insufficient oxygen to support this catalytic combustion, and the sensor will give unreliable or falsely low LEL readings. This is a critical limitation that must be understood by those monitoring confined spaces.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "advanced"
},
{
  id: 109,
  question: "What is the primary purpose of bump testing a gas detector before use in a confined space?",
  options: [
    "To fully calibrate the instrument to traceable gas standards",
    "To verify the sensors respond to a known concentration of test gas",
    "To charge the battery to full capacity",
    "To reset the alarm setpoints to factory defaults"
  ],
  correctAnswer: 1,
  explanation: "A bump test (also known as a functional test) verifies that the sensors respond to a known concentration of test gas and that the alarms activate correctly. It is not the same as a full calibration but is a quick confidence check that the detector is functioning properly. Bump testing should be carried out before each day's use as per manufacturer guidance.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "basic"
},
{
  id: 110,
  question: "Which of the following biological hazards might be encountered in a sewer or drainage confined space?",
  options: [
    "Leptospirosis (Weil's disease)",
    "Legionnaires' disease only",
    "Asbestosis",
    "Hand-arm vibration syndrome"
  ],
  correctAnswer: 0,
  explanation: "Leptospirosis (Weil's disease) is a bacterial infection carried in rat urine that is a significant biological hazard in sewers, drains, and waterways. Workers entering such confined spaces must be aware of this risk. Cuts and abrasions must be covered, and appropriate PPE including gloves and eye protection must be worn. Workers should also be informed of the symptoms and the need for early medical attention.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 111,
  question: "An oxygen-enriched atmosphere exists when the oxygen level exceeds which percentage?",
  options: [
    "20.9%",
    "21.5%",
    "23%",
    "23.5%"
  ],
  correctAnswer: 3,
  explanation: "An oxygen-enriched atmosphere is generally defined as one where the oxygen concentration exceeds 23.5%. In an oxygen-enriched atmosphere, materials that would not normally burn in a normal atmosphere may ignite readily, clothing can catch fire easily, and fires burn more intensely. This can occur from leaking oxygen cylinders, oxygen hoses, or certain chemical reactions.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 112,
  question: "What is the primary purpose of a photoionisation detector (PID) in confined space atmospheric monitoring?",
  options: [
    "To measure oxygen concentration precisely",
    "To detect and measure volatile organic compounds (VOCs)",
    "To measure carbon dioxide levels",
    "To detect radioactive contamination"
  ],
  correctAnswer: 1,
  explanation: "A photoionisation detector (PID) uses ultraviolet light to ionise gas molecules and is primarily used to detect and measure volatile organic compounds (VOCs) at very low concentrations (parts per billion to parts per million). PIDs are particularly useful in confined spaces where solvent vapours, fuel vapours, or other organic compounds may be present.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 113,
  question: "Which physical hazard is most commonly associated with engulfment in a confined space?",
  options: [
    "Electrocution from exposed wiring",
    "Drowning or suffocation in free-flowing solid materials such as grain or sand",
    "Burns from steam pipes",
    "Noise-induced hearing loss"
  ],
  correctAnswer: 1,
  explanation: "Engulfment occurs when a person is surrounded and trapped by a free-flowing solid material such as grain, sand, coal dust, or sewage sludge. This can lead to suffocation as the material compresses the chest and prevents breathing. Engulfment is particularly hazardous in silos, hoppers, and storage vessels, and can occur extremely rapidly with little or no warning.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "basic"
},
{
  id: 114,
  question: "What is the Workplace Exposure Limit (WEL) for hydrogen sulphide as a 15-minute STEL under EH40?",
  options: [
    "5 ppm",
    "10 ppm",
    "15 ppm",
    "20 ppm"
  ],
  correctAnswer: 1,
  explanation: "The 15-minute Short-Term Exposure Limit (STEL) for hydrogen sulphide under EH40/2005 is 10 ppm. The 8-hour TWA is 5 ppm. H₂S is particularly dangerous because at concentrations above approximately 100 ppm it causes olfactory fatigue, meaning the characteristic 'rotten eggs' smell can no longer be detected, giving a false sense of safety.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 115,
  question: "Which of the following processes could cause oxygen depletion inside a confined space?",
  options: [
    "Running a petrol-powered generator inside the space",
    "Using battery-powered LED lighting only",
    "Wearing cotton overalls",
    "Using a plastic hard hat"
  ],
  correctAnswer: 0,
  explanation: "Running a petrol-powered (or any internal combustion) engine inside a confined space will rapidly consume oxygen through combustion and produce carbon monoxide and carbon dioxide. Internal combustion engines must never be operated inside or near the entrance to a confined space. Other oxygen-depleting processes include rusting of metal surfaces, bacterial action, and displacement by other gases.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "basic"
},
{
  id: 116,
  question: "At what percentage of the Lower Explosive Limit (LEL) should a multi-gas detector typically trigger its first (low) alarm for flammable gases?",
  options: [
    "5% LEL",
    "10% LEL",
    "20% LEL",
    "50% LEL"
  ],
  correctAnswer: 1,
  explanation: "Most multi-gas detectors are configured with a low alarm at 10% LEL (representing 10% of the way to the Lower Explosive Limit) and a high alarm at 20% LEL. These conservative setpoints provide an early warning well before the atmosphere reaches a concentration that could support combustion, allowing time for evacuation and remedial action.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 117,
  question: "What hazard does nitrogen gas pose when used to purge a confined space?",
  options: [
    "It is flammable and may cause an explosion",
    "It is toxic and causes chemical burns to the lungs",
    "It displaces oxygen and can cause rapid asphyxiation without warning",
    "It reacts with moisture to form a corrosive acid"
  ],
  correctAnswer: 2,
  explanation: "Nitrogen is an odourless, colourless, non-toxic gas, but it displaces oxygen. In a confined space purged with nitrogen, the oxygen level can drop to near zero. A person entering such a space can lose consciousness within seconds and die within minutes. Because nitrogen gives no warning signs (no smell, no irritation), it is an extremely dangerous asphyxiant. Thorough ventilation and atmospheric testing must be completed before entry after nitrogen purging.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "intermediate"
},
{
  id: 118,
  question: "Which TWO readings from a 4-gas monitor would indicate it is safe to enter a confined space without respiratory protective equipment?",
  options: [
    "O₂ at 20.8%, LEL at 0%, CO at 0 ppm, H₂S at 0 ppm",
    "O₂ at 18.5%, LEL at 0%, CO at 0 ppm, H₂S at 0 ppm",
    "O₂ at 20.9%, LEL at 15%, CO at 0 ppm, H₂S at 0 ppm",
    "O₂ at 23.8%, LEL at 0%, CO at 0 ppm, H₂S at 0 ppm"
  ],
  correctAnswer: 0,
  explanation: "Option A shows all readings within safe limits: oxygen at 20.8% (within the safe range of 19.5% to 23.5%), LEL at 0% (no flammable gases), CO at 0 ppm (below the WEL of 30 ppm), and H₂S at 0 ppm (below the WEL of 5 ppm). Option B has low oxygen, option C has an elevated LEL reading, and option D indicates an oxygen-enriched atmosphere.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "basic"
},
{
  id: 119,
  question: "What is 'olfactory fatigue' and why is it particularly dangerous in relation to hydrogen sulphide?",
  options: [
    "A condition where the nose becomes physically blocked by dust particles",
    "The progressive loss of the ability to smell a gas after prolonged or high-concentration exposure",
    "A type of respiratory illness caused by breathing contaminated air",
    "An allergic reaction to chemical fumes"
  ],
  correctAnswer: 1,
  explanation: "Olfactory fatigue is the progressive desensitisation of the sense of smell after exposure to a gas. It is especially dangerous with hydrogen sulphide because H₂S has a strong 'rotten eggs' odour at low concentrations (0.1-1 ppm), but at concentrations above approximately 100 ppm, it paralyses the olfactory nerve, making the gas undetectable by smell. This gives a false sense that the gas has dissipated when in fact concentrations may have increased to lethal levels.",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "advanced"
},
{
  id: 120,
  question: "A confined space entry is planned in a tank that previously contained toluene. Which additional monitoring instrument should be considered beyond a standard 4-gas detector?",
  options: [
    "A sound level meter",
    "A photoionisation detector (PID)",
    "A thermal imaging camera",
    "A Geiger-Muller counter"
  ],
  correctAnswer: 1,
  explanation: "Toluene is a volatile organic compound (VOC) that a standard 4-gas detector (O₂, LEL, CO, H₂S) may not specifically identify or accurately measure at low concentrations. A photoionisation detector (PID) should be used as it can detect and measure VOCs including toluene at parts-per-billion levels, providing a more accurate assessment of the residual solvent vapour hazard. The WEL for toluene is 50 ppm (8-hour TWA).",
  category: "Hazards & Atmospheric Monitoring",
  difficulty: "advanced"
},

// ─── SAFE ENTRY & WORKING PROCEDURES — IDs 121-160 ───

{
  id: 121,
  question: "Under the Confined Spaces Regulations 1997, what must an employer do BEFORE considering entry into a confined space?",
  options: [
    "Provide breathing apparatus to all workers",
    "Avoid entry to the confined space so far as is reasonably practicable",
    "Ensure at least three rescue personnel are on standby",
    "Notify the HSE of the planned entry 48 hours in advance"
  ],
  correctAnswer: 1,
  explanation: "Regulation 4(1) of the Confined Spaces Regulations 1997 requires that no person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry. The hierarchy is: first avoid entry, then if entry is unavoidable, establish a safe system of work and have emergency arrangements in place.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 122,
  question: "What is the primary purpose of a confined space entry permit?",
  options: [
    "To satisfy insurance requirements",
    "To provide a formal check that all elements of a safe system of work are in place before entry",
    "To record the names of workers for payroll purposes",
    "To replace the need for a risk assessment"
  ],
  correctAnswer: 1,
  explanation: "A confined space entry permit (permit to work) is a formal documented procedure that ensures all elements of the safe system of work have been addressed before entry is authorised. It covers hazard identification, atmospheric testing results, isolation and lock-off confirmation, PPE/RPE requirements, emergency arrangements, communication methods, and time limitations. It does not replace a risk assessment — it works alongside one.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 123,
  question: "Who is the 'competent person' responsible for issuing a confined space entry permit?",
  options: [
    "Any worker who volunteers for the role",
    "A person with sufficient training, knowledge, and experience to understand the hazards and necessary precautions",
    "Only an HSE inspector",
    "The most senior person on site regardless of their training"
  ],
  correctAnswer: 1,
  explanation: "A competent person for issuing a confined space entry permit must have sufficient training, knowledge, and experience to understand the specific hazards of the confined space, the precautions needed, and the emergency arrangements required. Competence is not determined solely by seniority or job title but by demonstrable knowledge and understanding of confined space working.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 124,
  question: "What does LOTO stand for in the context of confined space isolation procedures?",
  options: [
    "Look Out, Take Over",
    "Lock Out, Tag Out",
    "Log Off, Turn Off",
    "Lift Out, Twist Off"
  ],
  correctAnswer: 1,
  explanation: "LOTO stands for Lock Out, Tag Out. It is an isolation procedure used to ensure that energy sources (electrical, mechanical, hydraulic, pneumatic, chemical, thermal) feeding into a confined space are physically locked in the off/safe position and tagged with information identifying who applied the lock and why. This prevents accidental energisation while workers are inside the space.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 125,
  question: "When isolating a pipeline feeding into a confined space, which method provides the most positive form of isolation?",
  options: [
    "Closing a valve and tagging it",
    "Removing a fuse from the pump motor",
    "Physically disconnecting the pipe or inserting a spectacle blind (spade)",
    "Placing a warning sign at the valve"
  ],
  correctAnswer: 2,
  explanation: "Physical disconnection or the insertion of a spectacle blind (spade plate) provides the most positive form of pipeline isolation because it creates a physical barrier that cannot be defeated by a valve leaking or being accidentally opened. Simply closing a valve — even with LOTO applied — does not guarantee zero leakage. Spectacle blinds are rated to the pipeline pressure and provide a visible confirmation of isolation.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 126,
  question: "What is the purpose of a 'top person' (attendant) during a confined space entry?",
  options: [
    "To perform the work inside the confined space",
    "To remain at the entry point, maintain communication with entrants, and initiate emergency procedures if needed",
    "To complete the paperwork at the site office",
    "To operate the ventilation fan from inside the space"
  ],
  correctAnswer: 1,
  explanation: "The top person (also called the attendant or standby person) must remain at or near the entry point at all times during the confined space entry. Their duties include maintaining continuous communication with entrants, monitoring conditions, controlling entry and exit, keeping a log of who is in the space, and initiating the emergency rescue plan if an incident occurs. They must never enter the confined space.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 127,
  question: "How often should atmospheric monitoring typically continue once workers have entered a confined space?",
  options: [
    "Only at the point of initial entry",
    "Every four hours",
    "Continuously throughout the duration of the work",
    "Only when workers report feeling unwell"
  ],
  correctAnswer: 2,
  explanation: "Atmospheric monitoring should be continuous throughout the duration of work in a confined space. Conditions can change rapidly due to the work being carried out, chemical reactions, temperature changes, or ingress of contaminants. Continuous monitoring with audible and visual alarms provides immediate warning if the atmosphere deteriorates, allowing prompt evacuation.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 128,
  question: "What is the recommended minimum pre-entry ventilation period for a confined space before taking atmospheric readings?",
  options: [
    "There is no set minimum — readings should be taken to confirm the atmosphere is safe",
    "Exactly 15 minutes regardless of the space",
    "Exactly 30 minutes regardless of the space",
    "24 hours before any readings are taken"
  ],
  correctAnswer: 0,
  explanation: "There is no universal fixed minimum ventilation period. The ventilation time required depends on the size of the space, the nature and concentration of contaminants, the ventilation rate, and the number of air changes achieved. The key requirement is that atmospheric monitoring must confirm the atmosphere is within safe parameters before entry is permitted. Ventilation should continue and readings should be taken until consistently safe results are achieved.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 129,
  question: "When using mechanical ventilation in a confined space, where should the fresh air intake be positioned?",
  options: [
    "As close to the exhaust of nearby vehicles as possible for maximum airflow",
    "In an area of clean, uncontaminated air, away from exhaust fumes and other contaminant sources",
    "Inside the confined space to recirculate the existing air",
    "At the lowest point of the confined space"
  ],
  correctAnswer: 1,
  explanation: "The fresh air intake for mechanical ventilation must be positioned in an area of clean, uncontaminated air, well away from vehicle exhausts, generator fumes, process emissions, or any other source of contamination. If contaminated air is drawn in by the ventilation system, it will introduce hazardous substances into the confined space rather than providing safe fresh air.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 130,
  question: "Which type of respiratory protective equipment provides the highest level of protection for confined space entry into an IDLH atmosphere?",
  options: [
    "A half-face filtering facepiece (FFP3)",
    "A full-face powered air-purifying respirator (PAPR)",
    "Self-contained breathing apparatus (SCBA) in positive pressure mode",
    "A half-face respirator with organic vapour cartridges"
  ],
  correctAnswer: 2,
  explanation: "Self-contained breathing apparatus (SCBA) operated in positive pressure (demand) mode provides the highest level of respiratory protection. It supplies clean breathing air from a cylinder carried by the wearer and maintains positive pressure inside the facepiece to prevent inward leakage. In IDLH atmospheres, only SCBA or airline BA with escape cylinder should be used — filtering respirators cannot be used as they rely on the ambient atmosphere.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 131,
  question: "What is a 'safe atmosphere' in the context of confined space entry as typically defined?",
  options: [
    "O₂ between 19.5% and 23.5%, flammable gases below 10% LEL, toxic gases below their respective WELs",
    "O₂ above 16%, flammable gases below 50% LEL, no toxic gases detected",
    "O₂ at exactly 20.9%, zero flammable gases, zero toxic gases",
    "Any atmosphere where workers cannot smell any unusual odours"
  ],
  correctAnswer: 0,
  explanation: "A safe atmosphere for confined space entry is generally defined as: oxygen between 19.5% and 23.5%, flammable gases below 10% of their LEL (some standards permit up to 10% LEL for entry with continuous monitoring), and all toxic gases below their respective Workplace Exposure Limits. Relying on smell alone is never acceptable as many hazardous gases are odourless or cause olfactory fatigue.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 132,
  question: "Before entering a confined space, what must be done with all mechanical equipment (such as agitators and mixers) inside the space?",
  options: [
    "They should be left running at low speed",
    "They must be isolated, locked out, tagged out, and proved dead",
    "They only need to be switched off at the local control panel",
    "They should be put into standby mode"
  ],
  correctAnswer: 1,
  explanation: "All mechanical equipment inside or connected to the confined space must be fully isolated from its energy source, locked out and tagged out (LOTO), and proved dead (tested to confirm zero energy) before entry. Simply switching off at a control panel is insufficient as equipment could be accidentally re-energised. Proving dead typically involves attempting to start the equipment after isolation to confirm it cannot operate.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 133,
  question: "What information must be displayed on a LOTO tag?",
  options: [
    "The manufacturer's warranty details",
    "The name of the person who applied the lock, the date, the reason for isolation, and contact details",
    "Only the word 'DANGER' in red letters",
    "The equipment serial number and maintenance schedule"
  ],
  correctAnswer: 1,
  explanation: "A LOTO tag must clearly display: the name of the person who applied the lock, the date and time of application, the reason for the isolation (e.g., 'confined space entry in progress'), and contact details. Each person working in or on the equipment should apply their own personal lock. Tags must never be removed by anyone other than the person who applied them, except through a formal management override procedure.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 134,
  question: "What is the purpose of a 'try test' (proving dead test) after applying LOTO isolation?",
  options: [
    "To check if the equipment still works despite the isolation",
    "To confirm that the isolation is effective and no residual energy remains",
    "To test the LOTO lock for structural integrity",
    "To calibrate the equipment ready for return to service"
  ],
  correctAnswer: 1,
  explanation: "A try test (proving dead test) is carried out after isolation and LOTO to confirm that the isolation is effective. This involves attempting to start or energise the equipment using normal controls to verify it cannot operate, and testing for residual energy (electrical, hydraulic, pneumatic, stored mechanical energy). Only once the try test confirms zero energy can the space be considered safe from that energy source.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 135,
  question: "When is hot work inside a confined space permitted?",
  options: [
    "At any time, provided the worker has a welding qualification",
    "Only when a specific hot work permit has been issued in addition to the confined space entry permit, and the atmosphere has been confirmed as safe",
    "Only during daylight hours",
    "When the temperature inside the space is below 30°C"
  ],
  correctAnswer: 1,
  explanation: "Hot work (welding, cutting, grinding, brazing) inside a confined space requires a specific hot work permit in addition to the confined space entry permit. The atmosphere must be confirmed free of flammable gases and vapours (below 1% LEL for hot work), continuous atmospheric monitoring must be maintained, fire-fighting equipment must be immediately available, and a fire watch must be maintained during and for a period after the hot work.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 136,
  question: "What is the maximum recommended safe working voltage for portable electrical equipment used inside a confined space with conductive surroundings?",
  options: [
    "230V with an RCD",
    "110V from a centre-tapped earth transformer",
    "25V from a suitable transformer or extra-low voltage (ELV) equipment",
    "400V three-phase supply"
  ],
  correctAnswer: 2,
  explanation: "In confined spaces with conductive surroundings (such as metal tanks, vessels, or pipework), BS 7671 and HSE guidance recommend that portable equipment should operate at extra-low voltage — no more than 25V AC (or 60V DC) supplied from a safety isolating transformer. The risk of electric shock is significantly increased in confined spaces due to restricted movement, damp conditions, and conductive surroundings reducing body resistance.",
  category: "Safe Entry & Working Procedures",
  difficulty: "advanced"
},
{
  id: 137,
  question: "What type of lighting is most appropriate for use inside a confined space where a flammable atmosphere may develop?",
  options: [
    "Standard 230V LED floodlights",
    "Intrinsically safe (Ex-rated) lighting equipment",
    "Candles or oil lamps",
    "Standard battery-powered torches"
  ],
  correctAnswer: 1,
  explanation: "In confined spaces where a flammable atmosphere may develop, all electrical equipment including lighting must be intrinsically safe (Ex-rated) or flameproof to the appropriate zone classification. Intrinsically safe equipment is designed so that any sparking or thermal effects are incapable of igniting a flammable atmosphere. Standard electrical equipment, even battery-powered torches, could provide a source of ignition.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 138,
  question: "What does a confined space entry permit's 'duration' or 'validity period' specify?",
  options: [
    "The total number of hours the project will take to complete",
    "The maximum period during which the permit authorises entry, after which it must be reviewed and reissued",
    "The shelf life of the gas detection equipment",
    "The length of time workers are contractually employed"
  ],
  correctAnswer: 1,
  explanation: "The duration or validity period on a confined space entry permit specifies the maximum time for which the permit authorises entry. This is typically limited to a single shift or a specific number of hours. If work extends beyond this period, the permit must be formally closed and a new one issued, with fresh atmospheric monitoring and a review of all conditions. This prevents complacency and ensures conditions are regularly re-evaluated.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 139,
  question: "A worker needs to enter a confined space to inspect a valve. No hazardous atmosphere is present, but the space has a vertical access point 3 metres deep. What fall protection is required?",
  options: [
    "No fall protection is needed as the depth is less than 5 metres",
    "A full-body harness with a short lanyard attached to a suitable anchor point",
    "A safety helmet is sufficient",
    "Edge protection around the opening only"
  ],
  correctAnswer: 1,
  explanation: "A 3-metre vertical access into a confined space presents a significant fall hazard. A full-body harness with an appropriate lanyard attached to a suitable anchor point at the access point is required. The harness also serves a dual purpose — it can be used for rescue retrieval if the worker becomes incapacitated. A tripod and winch system at the access point would typically be used for both fall arrest and rescue capability.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 140,
  question: "What is the role of a 'rescue team' as part of confined space emergency arrangements?",
  options: [
    "To carry out the planned work inside the confined space",
    "To be trained, equipped, and immediately available to effect rescue of any person who becomes incapacitated in the confined space",
    "To write the risk assessment for the confined space entry",
    "To inspect the confined space after work is complete"
  ],
  correctAnswer: 1,
  explanation: "Under Regulation 5 of the Confined Spaces Regulations 1997, suitable and sufficient emergency arrangements must be in place before any person enters a confined space. The rescue team must be trained in confined space rescue, equipped with appropriate rescue equipment (including breathing apparatus if needed), and immediately available to respond without delay. The team must have practised the rescue plan and be familiar with the specific space.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 141,
  question: "During a confined space entry, continuous ventilation is being provided by a fan and ducting. The fan fails. What should happen?",
  options: [
    "Continue working — there was enough fresh air before the fan started",
    "All entrants must immediately evacuate the confined space",
    "Only evacuate if someone smells something unusual",
    "Wait 15 minutes and then evacuate if the fan is not repaired"
  ],
  correctAnswer: 1,
  explanation: "If mechanical ventilation fails during a confined space entry, all entrants must immediately evacuate the space. Ventilation is a critical control measure — without it, oxygen levels can drop, and toxic or flammable gases can accumulate rapidly. Re-entry must not occur until the ventilation is restored and atmospheric monitoring has confirmed the atmosphere is safe again.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 142,
  question: "What is the maximum number of people a single top person (attendant) should normally be responsible for monitoring?",
  options: [
    "As many as the confined space can hold",
    "No more than can be effectively monitored and communicated with at all times — typically one to three depending on conditions",
    "Exactly ten workers",
    "There is no limit under the Regulations"
  ],
  correctAnswer: 1,
  explanation: "There is no fixed number in the Regulations, but good practice dictates that a single top person should only be responsible for monitoring as many entrants as they can effectively communicate with and account for at all times — typically one to three, depending on the complexity of the space, the nature of the work, and visibility. If the top person cannot maintain effective oversight, additional attendants must be deployed.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 143,
  question: "Which of the following communication methods is MOST reliable for maintaining contact between entrants and the top person in a noisy confined space?",
  options: [
    "Shouting loudly",
    "Hand signals only",
    "A hard-wired communication system or intrinsically safe radio",
    "Mobile phone text messages"
  ],
  correctAnswer: 2,
  explanation: "A hard-wired (tethered) communication system or intrinsically safe two-way radio provides the most reliable communication in noisy confined spaces. Shouting may be ineffective due to noise and reverberations, hand signals require line of sight which may not be available, and mobile phones may not have signal in enclosed metal structures and may not be intrinsically safe for flammable atmospheres.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 144,
  question: "What must be included in a confined space risk assessment?",
  options: [
    "Only the atmospheric hazards",
    "All foreseeable hazards including atmospheric, physical, biological, and those introduced by the work activity, along with the control measures required",
    "Only the emergency rescue plan",
    "The names and addresses of all workers"
  ],
  correctAnswer: 1,
  explanation: "A confined space risk assessment must identify all foreseeable hazards. This includes atmospheric hazards (toxic gases, oxygen depletion/enrichment, flammable atmospheres), physical hazards (engulfment, entrapment, falls, temperature extremes, noise), biological hazards (bacteria, viruses), and hazards introduced by the work itself (welding fumes, dust, electrical risks). For each hazard, appropriate control measures must be identified and implemented.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 145,
  question: "What should happen to a confined space entry permit if the scope of work changes during the entry?",
  options: [
    "The original permit continues to cover any additional work",
    "A verbal agreement with the supervisor is sufficient",
    "The existing permit must be cancelled and a new permit issued to cover the revised scope of work",
    "The change can be noted on the back of the permit in pencil"
  ],
  correctAnswer: 2,
  explanation: "If the scope of work changes during a confined space entry, the existing permit must be cancelled and work stopped. A new risk assessment must be carried out for the revised scope, and a new permit must be issued covering the changed conditions. Changes in work activity may introduce new hazards (e.g., changing from inspection to hot work) that require different or additional control measures.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 146,
  question: "When selecting PPE for confined space entry, which factor is LEAST relevant?",
  options: [
    "The identified atmospheric hazards",
    "The physical constraints and access dimensions of the space",
    "The colour preference of the worker",
    "The compatibility of different items of PPE when worn together"
  ],
  correctAnswer: 2,
  explanation: "PPE selection for confined space entry must be based on the identified hazards, the physical constraints of the space (some spaces are too small for SCBA), and the compatibility of different PPE items (e.g., a harness must be compatible with breathing apparatus, a hard hat must fit with a full-face mask). The colour preference of the worker has no bearing on the protective capability of the equipment.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 147,
  question: "What is the purpose of purging a confined space with an inert gas such as nitrogen before introducing air?",
  options: [
    "To increase the oxygen level for workers",
    "To displace flammable or toxic gases before ventilating with fresh air",
    "To cool down the space",
    "To sterilise the space against biological hazards"
  ],
  correctAnswer: 1,
  explanation: "Purging with an inert gas such as nitrogen is used to displace flammable or toxic gases from a confined space to create a safe condition before introducing air. This is common in process vessels and pipework that have contained flammable substances. After nitrogen purging, the space must then be thoroughly ventilated with fresh air to restore a breathable atmosphere before entry, as the nitrogen itself creates an IDLH oxygen-deficient environment.",
  category: "Safe Entry & Working Procedures",
  difficulty: "advanced"
},
{
  id: 148,
  question: "A confined space entry involves working on live 230V electrical equipment inside a vessel. What voltage reduction measures are required?",
  options: [
    "None — 230V is acceptable with an RCD",
    "110V from a centre-tapped earth transformer is sufficient",
    "The equipment must be made dead and isolated wherever possible; if live work is unavoidable, a specific risk assessment and method statement for live working must be produced",
    "Simply wearing rubber gloves is sufficient"
  ],
  correctAnswer: 2,
  explanation: "Working on live electrical equipment inside a confined space is extremely hazardous due to the increased risk of electric shock from conductive surroundings, damp conditions, and restricted movement. The equipment must be made dead and isolated wherever possible. If live work is genuinely unavoidable, a specific risk assessment, method statement, and live working permit must be produced in compliance with the Electricity at Work Regulations 1989, Regulation 14.",
  category: "Safe Entry & Working Procedures",
  difficulty: "advanced"
},
{
  id: 149,
  question: "What is the function of a 'gas-free certificate' in relation to confined space entry?",
  options: [
    "A certificate confirming the worker has passed a gas safety examination",
    "A formal document confirming that atmospheric testing has shown the space to be free from hazardous gases at the time of testing",
    "An insurance document covering gas-related incidents",
    "A manufacturer's certificate for the gas detection equipment"
  ],
  correctAnswer: 1,
  explanation: "A gas-free certificate is a formal document issued by a competent person confirming that atmospheric testing has been carried out and the space was found to be free from hazardous gases and had adequate oxygen at the time of testing. It is commonly used in marine, petrochemical, and process industries. It is important to note that this certificate is valid only at the time of testing — conditions can change, so continuous monitoring during entry remains essential.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 150,
  question: "Which BS EN standard covers the requirements for full-body harnesses used in confined space work?",
  options: [
    "BS EN 166 — Personal eye protection",
    "BS EN 361 — Full body harnesses",
    "BS EN 397 — Industrial safety helmets",
    "BS EN 60903 — Electrical insulating gloves"
  ],
  correctAnswer: 1,
  explanation: "BS EN 361 specifies the requirements for full-body harnesses used in fall arrest systems and for confined space rescue. A full-body harness for confined space rescue should have a front or rear attachment point (D-ring) suitable for connection to a rescue retrieval system. The harness must be inspected before each use and formally examined at intervals not exceeding 6 months by a competent person.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 151,
  question: "What precautions must be taken when using airline breathing apparatus (ALBA) in a confined space?",
  options: [
    "No special precautions — airline BA can be used without restriction",
    "The air supply must be from a suitable compressor with filtration providing Grade D breathing air, the airline must be protected from damage, and an emergency escape cylinder must be carried",
    "The worker must hold their breath between air supply pulses",
    "Airline BA can only be used for a maximum of 5 minutes"
  ],
  correctAnswer: 1,
  explanation: "Airline breathing apparatus (ALBA) requires: a suitable breathing air compressor or cylinder bank providing Grade D breathing air (as per BS EN 12021); the airline hose must be protected from crushing, kinking, or chemical damage; the maximum hose length must not be exceeded; and the wearer must carry an emergency escape cylinder (typically 10-15 minutes duration) in case the primary air supply fails. The air intake for the compressor must be in an uncontaminated area.",
  category: "Safe Entry & Working Procedures",
  difficulty: "advanced"
},
{
  id: 152,
  question: "What is the recommended pre-entry atmospheric testing sequence when using a multi-gas detector?",
  options: [
    "Test for toxic gases first, then flammable gases, then oxygen",
    "Test for oxygen first, then flammable gases, then toxic gases",
    "Test for flammable gases first, then oxygen, then toxic gases",
    "The order does not matter"
  ],
  correctAnswer: 1,
  explanation: "The recommended sequence is oxygen first, then flammable gases, then toxic gases. Oxygen must be tested first because the catalytic bead sensor used for flammable gas detection requires adequate oxygen (above approximately 16%) to function correctly. If oxygen is deficient, the LEL reading may be unreliable. Additionally, knowing the oxygen level first helps assess whether the space has been adequately ventilated before proceeding with further testing.",
  category: "Safe Entry & Working Procedures",
  difficulty: "advanced"
},
{
  id: 153,
  question: "During a confined space entry, a worker develops a headache and nausea. What should be the FIRST action?",
  options: [
    "Give the worker paracetamol and continue working",
    "Immediately evacuate all personnel from the confined space",
    "Open a window in the confined space",
    "Ask the worker to rest inside the space for 10 minutes"
  ],
  correctAnswer: 1,
  explanation: "Headache and nausea are early symptoms of carbon monoxide poisoning or oxygen depletion. The immediate action must be to evacuate all personnel from the confined space — not just the affected worker, as the atmosphere may have deteriorated for everyone. Once evacuated, check atmospheric monitoring readings, provide first aid, seek medical attention for the affected worker, and do not re-enter until the cause has been identified and resolved.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 154,
  question: "What does the term 'permit to work' hierarchy mean in confined space operations?",
  options: [
    "The order in which workers enter the space based on seniority",
    "The system of authorisation where a master permit may require additional subsidiary permits (e.g., hot work, electrical isolation) to be in place simultaneously",
    "A ranking of which permits are more important than others",
    "The sequence in which permits are filed in the office"
  ],
  correctAnswer: 1,
  explanation: "Permit to work hierarchy refers to the system where a master confined space entry permit may require one or more subsidiary or linked permits to be in place simultaneously. For example, if hot work is to be carried out inside a confined space, both a confined space entry permit and a hot work permit must be issued. If electrical isolation is needed, an electrical isolation certificate may also be required. All linked permits must be cross-referenced.",
  category: "Safe Entry & Working Procedures",
  difficulty: "advanced"
},
{
  id: 155,
  question: "A top person observes that the entrant's personal gas detector has gone into alarm. The entrant appears unresponsive to radio calls. What should the top person do?",
  options: [
    "Enter the space immediately to assist",
    "Activate the emergency rescue plan and summon the rescue team — DO NOT enter the space",
    "Wait 5 minutes to see if the entrant responds",
    "Turn off the alarm to avoid causing panic"
  ],
  correctAnswer: 1,
  explanation: "The top person must NEVER enter the confined space — doing so has historically resulted in multiple fatalities where would-be rescuers become additional casualties. The correct action is to immediately activate the emergency rescue plan, summon the trained and equipped rescue team, alert the emergency services, and attempt to communicate with the entrant. If a retrieval line is attached, the top person may attempt to retrieve the entrant using the winch system without entering the space.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 156,
  question: "What is 'residual hazard' in the context of confined space isolation?",
  options: [
    "A hazard that has been completely eliminated",
    "A hazard that remains despite isolation measures, such as sludge containing toxic substances or residual energy in a system",
    "A hazard that only exists outside the confined space",
    "A minor hazard that can be safely ignored"
  ],
  correctAnswer: 1,
  explanation: "Residual hazards are those that remain even after isolation measures have been applied. Examples include toxic sludge or residue on the walls and floor of a tank, trapped pockets of gas in baffles or dead legs, stored energy in pressurised systems, and heat retained in vessel walls. These residual hazards must be identified in the risk assessment and appropriate additional control measures implemented.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 157,
  question: "When is it acceptable for the top person to leave their post at the confined space entry point?",
  options: [
    "When they need a toilet break",
    "When the entrants have been inside for more than one hour without incident",
    "Never — they must not leave until all entrants have exited and the permit has been closed, unless a competent replacement takes over",
    "When the supervisor asks them to help with another task"
  ],
  correctAnswer: 2,
  explanation: "The top person must never leave the entry point unattended while entrants are inside the confined space. If the top person needs to leave for any reason, a competent replacement must first take over the role and be fully briefed on the entry details, the number of people inside, the communication arrangements, and the emergency plan. Abandoning the post puts the entrants at serious risk as there would be no one to raise the alarm in an emergency.",
  category: "Safe Entry & Working Procedures",
  difficulty: "basic"
},
{
  id: 158,
  question: "In addition to atmospheric hazards, what physical hazard assessment must be carried out before confined space entry involving work at height inside the space?",
  options: [
    "A noise assessment only",
    "An assessment of the structural integrity of internal fixtures, the suitability of anchor points, and the risk of falls from internal platforms or ladders",
    "A vibration assessment only",
    "An assessment of the external weather conditions only"
  ],
  correctAnswer: 1,
  explanation: "Work at height inside a confined space requires assessment of internal structural integrity (corroded platforms, weakened ladders), the identification and testing of suitable anchor points for fall arrest equipment, the risk of falls from internal platforms, ladders, or staging, and the rescue plan for retrieving a fallen or suspended worker from inside the space. The confined and restricted nature of the space makes falls particularly dangerous as rescue is more complex.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 159,
  question: "What should be done with a confined space entry permit at the end of the work or at the end of the permitted duration?",
  options: [
    "It should be discarded",
    "It should be formally cancelled by the issuing authority, confirming all personnel have exited, all equipment removed, and the space returned to a safe condition",
    "It should be given to the workers as a souvenir",
    "It automatically expires and no further action is needed"
  ],
  correctAnswer: 1,
  explanation: "At the end of the work or the expiry of the permitted duration, the confined space entry permit must be formally cancelled by the issuing authority (or designated person). This involves confirming that all personnel have exited the space, all tools and equipment have been removed, a headcount matches the entry log, the space has been returned to a safe condition, and any isolations can be safely removed. The cancelled permit should be retained as a record.",
  category: "Safe Entry & Working Procedures",
  difficulty: "intermediate"
},
{
  id: 160,
  question: "Under BS 7671 (IET Wiring Regulations), what additional protection measure is recommended for socket outlets supplying portable equipment inside a confined space with conductive location?",
  options: [
    "A 30 mA RCD is sufficient on its own at 230V",
    "Electrical separation using an isolating transformer supplying only one item of equipment, or SELV/PELV not exceeding 25V AC",
    "A standard 13A fused plug",
    "An isolating switch at the distribution board"
  ],
  correctAnswer: 1,
  explanation: "BS 7671, Section 706, covers electrical installations in restrictive conductive locations (which includes many confined spaces). The recommended protection measures include SELV (Safety Extra-Low Voltage) or PELV (Protective Extra-Low Voltage) not exceeding 25V AC (or 60V DC), or electrical separation using an isolating transformer supplying only one item of current-using equipment. A 30 mA RCD alone at 230V is not considered sufficient in conductive confined spaces due to the reduced body impedance.",
  category: "Safe Entry & Working Procedures",
  difficulty: "advanced"
},

// ─── EMERGENCY & RESCUE PROCEDURES — IDs 161-200 ───

{
  id: 161,
  question: "Under the Confined Spaces Regulations 1997, Regulation 5, when must emergency arrangements be in place?",
  options: [
    "Only when the risk assessment identifies a high likelihood of an incident",
    "Before any person enters or works in a confined space",
    "Within 24 hours of the entry commencing",
    "Only when working in confined spaces classified as 'high risk'"
  ],
  correctAnswer: 1,
  explanation: "Regulation 5 of the Confined Spaces Regulations 1997 is clear that suitable and sufficient arrangements for the rescue of persons in the event of an emergency must be in place BEFORE any person enters or works in a confined space. This applies to all confined space entries, regardless of the perceived level of risk. Emergency arrangements must be proportionate to the identified risks and must be practised.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 162,
  question: "What is 'non-entry rescue' in the context of confined space emergency procedures?",
  options: [
    "Rescue that takes place outside the confined space perimeter",
    "A rescue method where the casualty is retrieved from the confined space without the rescuer entering, typically using a retrieval line and winch system",
    "A method where the confined space is demolished to access the casualty",
    "Rescue that is performed by the emergency services only"
  ],
  correctAnswer: 1,
  explanation: "Non-entry rescue is the preferred primary rescue method. The entrant wears a full-body harness with an attached retrieval line connected to a mechanical retrieval device (winch) mounted on a tripod or davit at the entry point. If the entrant becomes incapacitated, the top person or rescue team can winch them out without anyone entering the space. This eliminates the risk of rescuers becoming additional casualties.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 163,
  question: "What is the primary advantage of non-entry rescue over entry rescue?",
  options: [
    "It is cheaper to set up",
    "It eliminates the risk of the rescuer becoming a casualty in the hazardous atmosphere",
    "It is always faster than entry rescue",
    "It does not require any equipment"
  ],
  correctAnswer: 1,
  explanation: "The primary advantage of non-entry rescue is that it eliminates the risk of the rescuer becoming an additional casualty. Historically, a significant proportion of confined space fatalities are would-be rescuers who enter a hazardous atmosphere unprepared. Non-entry rescue allows the casualty to be retrieved mechanically while the rescuer remains in safe air outside the space. It should always be the preferred method where the geometry of the space permits it.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 164,
  question: "A rescue tripod is set up over a vertical confined space access point. What is the typical safe working load (SWL) of a standard confined space rescue tripod?",
  options: [
    "50 kg",
    "140-200 kg (depending on manufacturer and model)",
    "500 kg",
    "1,000 kg"
  ],
  correctAnswer: 1,
  explanation: "A standard confined space rescue tripod typically has a safe working load of between 140 kg and 200 kg, depending on the manufacturer and model. This SWL must be sufficient to support the weight of the heaviest expected entrant plus their equipment. The SWL must be clearly marked on the equipment, and it must not be exceeded. Tripods must be inspected before each use and formally examined by a competent person at regular intervals.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 165,
  question: "What equipment should be attached to a rescue tripod to enable mechanical retrieval of a casualty?",
  options: [
    "A standard rope and pulley",
    "A man-riding winch with an integrated fall arrest function",
    "A chain block and sling",
    "A bungee cord"
  ],
  correctAnswer: 1,
  explanation: "A man-riding winch with an integrated fall arrest function should be attached to the rescue tripod. This winch serves a dual purpose: it controls the descent and ascent of the entrant during normal entry and exit, and it provides a mechanical retrieval capability in an emergency. The integrated fall arrest function automatically locks if a fall is detected, preventing the entrant from free-falling. The winch must be rated for man-riding and comply with relevant standards.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 166,
  question: "What is a 'davit' in the context of confined space rescue equipment?",
  options: [
    "A type of breathing apparatus",
    "A fixed or portable arm-and-base system that provides an anchor point above a confined space entry, functioning similarly to a tripod but suited to spaces where a tripod cannot be positioned",
    "A type of gas detector",
    "A stretcher designed for confined spaces"
  ],
  correctAnswer: 1,
  explanation: "A davit is a fixed or portable arm-and-base system that extends over a confined space entry point to provide an anchor and lifting point for man-riding winches and retrieval systems. Davits are used where a tripod cannot be practically positioned, such as at the side of a vessel, on a wall-mounted manway, or at a hatch opening. The base is typically permanently fixed, and the davit arm can be inserted when needed.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 167,
  question: "When planning confined space emergency arrangements, what should the assumed response time for the fire and rescue service be?",
  options: [
    "Under 5 minutes",
    "Under 10 minutes",
    "Response times cannot be guaranteed — on-site rescue capability must be provided for immediate response",
    "Exactly 15 minutes as per their service level agreement"
  ],
  correctAnswer: 2,
  explanation: "Emergency services response times cannot be guaranteed, especially to remote or industrial locations. Therefore, the Approved Code of Practice (L101) emphasises that on-site rescue capability must be immediately available. Reliance solely on the emergency services is not acceptable. However, the emergency services should always be notified as part of the emergency plan, as they may be needed for additional support, medical care, or complex rescue situations.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 168,
  question: "What type of breathing apparatus should rescue team members use when entering a confined space with an IDLH atmosphere to perform entry rescue?",
  options: [
    "A filtering half-mask respirator (FFP3)",
    "Self-contained breathing apparatus (SCBA) in positive pressure mode",
    "A dust mask",
    "No breathing apparatus — they should hold their breath"
  ],
  correctAnswer: 1,
  explanation: "Rescue team members entering a confined space with an IDLH (Immediately Dangerous to Life and Health) atmosphere must use self-contained breathing apparatus (SCBA) in positive pressure mode. SCBA provides an independent air supply unaffected by the ambient atmosphere. Positive pressure mode ensures that any facepiece leakage results in clean air flowing outward rather than contaminated air leaking in. Filtering respirators are not suitable in IDLH conditions.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 169,
  question: "How long does a standard 6-litre, 300-bar SCBA cylinder typically provide breathing air to a rescuer under moderate work rate?",
  options: [
    "Approximately 10 minutes",
    "Approximately 30-40 minutes",
    "Approximately 2 hours",
    "Approximately 4 hours"
  ],
  correctAnswer: 1,
  explanation: "A standard 6-litre, 300-bar SCBA cylinder contains approximately 1,800 litres of free air. At a moderate work rate, a person breathes approximately 40-50 litres per minute, giving an approximate duration of 30-40 minutes. However, under the stress and physical exertion of a rescue, the actual duration may be significantly shorter. Rescuers must monitor their cylinder pressure gauge and adhere to turnaround pressures (typically when the low-pressure warning whistle activates at around 55 bar).",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 170,
  question: "What is 'suspension trauma' (harness hang syndrome) and why is it relevant to confined space rescue?",
  options: [
    "A psychological condition caused by fear of heights",
    "A potentially fatal condition caused by prolonged suspension in a harness, where blood pools in the legs and reduces cardiac output",
    "Bruising caused by an ill-fitting harness",
    "Muscle fatigue from climbing a ladder"
  ],
  correctAnswer: 1,
  explanation: "Suspension trauma (harness hang syndrome) is a potentially life-threatening condition that occurs when a person is suspended motionless in a harness. Blood pools in the legs due to the harness straps compressing veins, reducing venous return to the heart and lowering cardiac output. This can lead to unconsciousness within minutes and death within 15-30 minutes. In confined space rescue, prompt retrieval of a suspended casualty is critical, and rescuers should be trained to recognise and manage suspension trauma.",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 171,
  question: "Once a casualty suffering from suspension trauma has been rescued, what position should they be placed in?",
  options: [
    "Standing upright immediately",
    "Flat on their back with legs elevated",
    "In a semi-seated or W-position (knees raised towards chest) initially, NOT laid flat immediately",
    "Hanging upside down"
  ],
  correctAnswer: 2,
  explanation: "A casualty suffering from suspension trauma must NOT be laid flat immediately after rescue. The sudden return of pooled, deoxygenated blood from the legs to the heart can cause 'rescue death' — a fatal cardiac overload. Instead, the casualty should be placed in a semi-seated or W-position with knees raised towards the chest for at least 30-40 minutes, allowing gradual redistribution of blood. This is a critical consideration in confined space rescue first aid training.",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 172,
  question: "What type of stretcher is specifically designed for extracting a casualty through narrow confined space access points?",
  options: [
    "A standard NHS ambulance stretcher",
    "A basket (Stokes) stretcher or a confined space rescue stretcher (such as a SKED or roll-up stretcher)",
    "A wheelchair",
    "A standard camp bed"
  ],
  correctAnswer: 1,
  explanation: "Confined space rescue stretchers such as the SKED (a flexible, roll-up plastic stretcher) or a Stokes basket stretcher are specifically designed for extracting casualties through narrow openings and confined spaces. The SKED stretcher wraps around the casualty and can be narrowed to fit through restricted access points, while the Stokes basket provides rigid protection. These stretchers have multiple lifting and hauling points for vertical and horizontal extraction.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 173,
  question: "What is the minimum number of trained personnel typically required for a confined space entry rescue team to perform an effective entry rescue?",
  options: [
    "One person",
    "Two persons",
    "A minimum of three to four persons, depending on the rescue plan",
    "Ten persons"
  ],
  correctAnswer: 2,
  explanation: "An effective entry rescue team typically requires a minimum of three to four trained persons: at least two rescuers to enter the space (buddy system), one person to manage the entry point and winch/retrieval equipment, and ideally a team leader to coordinate the rescue and communicate with emergency services. The exact number depends on the rescue plan, the complexity of the space, and the nature of the emergency. All team members must have practised the rescue drill.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 174,
  question: "What does the emergency rescue plan for a confined space entry MUST include?",
  options: [
    "Only the telephone number for the emergency services",
    "Rescue equipment, trained rescue personnel, communication methods, first aid arrangements, and procedures for raising the alarm and coordinating with emergency services",
    "Only a list of nearby hospitals",
    "The cost estimate for rescue operations"
  ],
  correctAnswer: 1,
  explanation: "A comprehensive emergency rescue plan must include: specified rescue equipment and its location; trained and equipped rescue personnel who are immediately available; communication methods between the space, the top person, and the rescue team; first aid provisions including oxygen therapy equipment; procedures for raising the alarm; contact details for emergency services; hospital details and route; and the procedures for non-entry and entry rescue. The plan must be practised regularly.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 175,
  question: "During a confined space rescue drill, the rescue team takes 12 minutes to retrieve the dummy casualty from a 5-metre deep vessel. Is this acceptable?",
  options: [
    "Yes — any time under 15 minutes is acceptable",
    "It depends on the specific risk assessment; however, best practice target for initial casualty retrieval from a vertical space is typically within 5 minutes",
    "No — rescue must always be completed in under 1 minute",
    "Time is irrelevant — only technique matters"
  ],
  correctAnswer: 1,
  explanation: "While there is no single regulatory time limit, best practice for non-entry retrieval from a vertical space targets initial casualty retrieval within approximately 5 minutes. This is based on the understanding that a person in a toxic atmosphere or suffering cardiac arrest has very limited survival time. A 12-minute retrieval time would warrant a review of the rescue plan, equipment, team positioning, and procedures to identify improvements. The specific target should be set based on the risk assessment.",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 176,
  question: "What RIDDOR reporting obligation applies if a worker loses consciousness inside a confined space due to exposure to a toxic atmosphere?",
  options: [
    "No reporting is required if the worker recovers",
    "It must be reported as a dangerous occurrence under RIDDOR, and if the worker is taken to hospital for treatment, it is also reportable as a specified injury/over-7-day injury as applicable",
    "It only needs to be recorded in the site accident book",
    "It should be reported to the HSE only if the worker is permanently disabled"
  ],
  correctAnswer: 1,
  explanation: "Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), loss of consciousness caused by exposure to a substance is a reportable dangerous occurrence. If the worker is taken to hospital, it may also be reportable as a specified injury or over-7-day injury depending on the outcome. The responsible person must report to the HSE without delay (immediately for specified injuries, within 10 days for over-7-day injuries, and immediately for dangerous occurrences).",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 177,
  question: "Which of the following is a reportable dangerous occurrence under RIDDOR related to confined spaces?",
  options: [
    "A worker getting a minor scratch while entering a confined space",
    "The unintentional release of a substance that could reasonably have caused death or specified injury",
    "A worker forgetting to bring their packed lunch",
    "A planned release of nitrogen during a purging operation"
  ],
  correctAnswer: 1,
  explanation: "Under Schedule 2 of RIDDOR 2013, the unintentional release of any substance that could reasonably have resulted in death or a specified injury is a reportable dangerous occurrence. In a confined space context, this could include an unexpected release of toxic gas, an uncontrolled ingress of water or other material, or failure of containment leading to atmospheric contamination. Planned, controlled releases (such as nitrogen purging) are not reportable as they are part of the safe system of work.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 178,
  question: "After a confined space incident requiring rescue, what investigation should be carried out?",
  options: [
    "No investigation is needed if the worker survives",
    "A thorough investigation to establish root causes, contributing factors, and lessons learned, with corrective actions implemented to prevent recurrence",
    "A quick verbal discussion at the next team meeting",
    "The investigation should be carried out only by the worker involved"
  ],
  correctAnswer: 1,
  explanation: "A thorough investigation must be carried out after any confined space incident, regardless of the severity of the outcome. The investigation should identify root causes (not just immediate causes), contributing factors (organisational, human, technical), and lessons learned. Corrective actions must be identified, implemented, and verified. The findings should be shared across the organisation and used to update risk assessments, safe systems of work, and training. Near misses should also be investigated.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 179,
  question: "What is the purpose of a 'near-miss' reporting culture in relation to confined space safety?",
  options: [
    "To assign blame to workers who make mistakes",
    "To identify and learn from incidents that could have resulted in injury or death, enabling proactive prevention of future incidents",
    "To increase paperwork for the safety department",
    "To reduce the number of accident claims"
  ],
  correctAnswer: 1,
  explanation: "A near-miss reporting culture encourages workers to report incidents and unsafe conditions that did not result in injury but had the potential to do so. In confined space work, near misses (such as a gas alarm activation, a ventilation failure, or a communication breakdown) provide invaluable learning opportunities to identify weaknesses in the safe system of work before a serious incident occurs. A blame-free reporting culture is essential to encourage open and honest reporting.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 180,
  question: "What first aid equipment should be immediately available at a confined space entry point?",
  options: [
    "A standard workplace first aid kit only",
    "A first aid kit, oxygen resuscitation equipment, automated external defibrillator (AED), and blankets as a minimum — with additional items based on the specific risk assessment",
    "Just a mobile phone to call 999",
    "A bottle of water and some plasters"
  ],
  correctAnswer: 1,
  explanation: "First aid provision for confined space work should include as a minimum: a suitably stocked first aid kit, oxygen resuscitation equipment (for treating casualties exposed to toxic atmospheres or oxygen-deficient environments), an automated external defibrillator (AED) for cardiac emergencies, and blankets for treating shock and hypothermia. Additional items may be required based on the specific risk assessment — for example, burns kits for hot work or eye wash stations for chemical hazards.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 181,
  question: "What should happen to the confined space atmosphere during a rescue operation?",
  options: [
    "Ventilation should be turned off to conserve energy",
    "Forced ventilation should be maintained or increased to improve the atmosphere for both the casualty and the rescue team",
    "The atmosphere should be left as it is",
    "The space should be sealed to prevent further contamination"
  ],
  correctAnswer: 1,
  explanation: "During a rescue operation, forced ventilation should be maintained and, if possible, increased to improve the atmosphere within the space. This benefits both the casualty (who may be without respiratory protection) and the rescue team. However, ventilation alone may not make the atmosphere safe, so rescue team members must still wear appropriate RPE (typically SCBA) until the atmosphere is confirmed safe by monitoring.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 182,
  question: "A confined space rescue plan specifies 'entry rescue' as the primary method. What does this mean?",
  options: [
    "The casualty will be retrieved without anyone entering the space",
    "Trained rescuers wearing appropriate PPE and RPE will physically enter the confined space to reach, stabilise, and extract the casualty",
    "The confined space will be cut open to access the casualty",
    "The casualty will be asked to self-rescue"
  ],
  correctAnswer: 1,
  explanation: "Entry rescue means that trained rescue team members, wearing appropriate PPE and RPE (typically SCBA for IDLH atmospheres), physically enter the confined space to reach the casualty, provide initial medical treatment if needed, package the casualty (e.g., in a rescue stretcher), and extract them from the space. Entry rescue is used when non-entry rescue is not feasible — for example, in large, complex spaces where the casualty cannot be reached by a retrieval line.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 183,
  question: "Why is it critical to practise confined space rescue drills regularly?",
  options: [
    "To satisfy insurance company requirements only",
    "To ensure the rescue team can perform an effective rescue under stress, identify any deficiencies in equipment or procedures, and maintain competence",
    "To provide entertainment for the workers",
    "To wear out old equipment so new equipment can be purchased"
  ],
  correctAnswer: 1,
  explanation: "Regular rescue drills are critical because: they ensure the rescue team can perform under the stress of a real emergency; they reveal deficiencies in equipment, procedures, or training before a real incident occurs; they maintain the rescue team's competence and muscle memory; they verify that the rescue plan is workable for the specific confined space; and they build team coordination and communication. Drills should be carried out at realistic frequency and should simulate realistic scenarios.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 184,
  question: "What is the 'buddy system' in the context of confined space entry rescue?",
  options: [
    "A system where workers choose their friends to work with",
    "A system where rescue team members always enter the space in pairs so they can monitor each other and provide mutual assistance",
    "A mentoring programme for new workers",
    "A social club for confined space workers"
  ],
  correctAnswer: 1,
  explanation: "The buddy system requires rescue team members to always enter a confined space in pairs (minimum). Each member monitors the other for signs of distress, equipment malfunction, or deterioration. If one rescuer experiences a problem, their buddy can assist and raise the alarm. A lone rescuer inside a confined space would have no one to call for help if they became incapacitated, creating the very situation they were sent in to resolve.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 185,
  question: "During an emergency evacuation from a confined space, what should the top person record?",
  options: [
    "Nothing — there is no time for records during an emergency",
    "The names and times of all personnel exiting the space to confirm a complete headcount and identify anyone still inside",
    "The weather conditions at the time of evacuation",
    "The cost of equipment left inside"
  ],
  correctAnswer: 1,
  explanation: "The top person must record or confirm the names and exit times of all personnel leaving the space to ensure a complete headcount. This is critical for identifying anyone who may still be inside and requiring rescue. The top person should have been maintaining an entry/exit log throughout the operation. In an emergency, confirming that all entrants are accounted for is one of the top person's most important responsibilities.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 186,
  question: "What is the purpose of an emergency escape breathing device (EEBD) carried by a confined space entrant?",
  options: [
    "It replaces the need for atmospheric monitoring",
    "It provides a short-duration air supply (typically 10-15 minutes) to enable self-rescue escape from a contaminated atmosphere",
    "It provides 8 hours of breathing air for normal work",
    "It is used to ventilate the confined space"
  ],
  correctAnswer: 1,
  explanation: "An emergency escape breathing device (EEBD) is a small, self-contained air supply carried by the entrant that provides approximately 10-15 minutes of breathing air. It is designed solely for emergency self-rescue — allowing the wearer to escape from a suddenly contaminated atmosphere. It is NOT a substitute for primary RPE in known hazardous atmospheres and does NOT replace the need for atmospheric monitoring or proper ventilation.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 187,
  question: "A confined space rescue involves a casualty located 8 metres below ground level in a vertical shaft. Which extraction method would be most appropriate?",
  options: [
    "Two workers lifting the casualty by their arms",
    "A tripod or davit with man-riding winch system, with the casualty secured in a rescue harness or stretcher",
    "Asking the casualty to climb a ladder",
    "Lowering a rope and asking the casualty to hold on"
  ],
  correctAnswer: 1,
  explanation: "Vertical extraction over 8 metres requires a mechanical advantage system. A tripod or davit positioned over the access point, equipped with a man-riding winch, is the most appropriate method. The casualty should be secured in either a full-body rescue harness (if conscious and able to be supported) or a confined space rescue stretcher (if unconscious or injured). Manual lifting by workers is not practicable over this distance and poses significant risk of dropping the casualty or causing injury to rescuers.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 188,
  question: "What is the role of the emergency services (fire and rescue) in a confined space rescue plan?",
  options: [
    "They are solely responsible for all confined space rescue — no on-site provision is needed",
    "They provide additional support, specialist rescue capability, medical assistance, and resources to supplement the on-site rescue team",
    "They only attend to write reports after the incident",
    "They provide catering for the rescue team"
  ],
  correctAnswer: 1,
  explanation: "The emergency services supplement the on-site rescue capability — they do not replace it. On-site rescue arrangements must be in place for immediate response. However, the fire and rescue service should be pre-notified of high-risk confined space operations where possible, and always called as part of the emergency response. They can provide specialist rescue technicians, advanced medical care (paramedics), additional breathing apparatus and rescue equipment, and coordination of larger-scale incidents.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 189,
  question: "What should a rescue team do FIRST upon arriving at a confined space where the entrant has become unresponsive?",
  options: [
    "Immediately enter the space",
    "Assess the situation: check atmospheric monitoring readings, attempt communication, attempt non-entry retrieval, and determine if entry rescue is needed",
    "Call the next of kin",
    "Start filling in the accident report form"
  ],
  correctAnswer: 1,
  explanation: "The rescue team must first assess the situation before acting. This includes: checking the atmospheric monitoring readings to understand what hazard may be present; attempting to communicate with the casualty; attempting non-entry retrieval using the winch/retrieval system if a line is attached; and determining whether entry rescue is necessary. Rushing into the space without assessment puts rescuers at risk. If entry rescue is required, the team must don appropriate RPE and follow the rehearsed rescue plan.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 190,
  question: "An entrant in a confined space suffers a cardiac arrest. After extraction, what equipment should be used as part of the initial emergency response?",
  options: [
    "A splint and bandage",
    "An automated external defibrillator (AED) alongside CPR",
    "Oxygen therapy alone without CPR",
    "A cold compress on the forehead"
  ],
  correctAnswer: 1,
  explanation: "In the event of cardiac arrest, an automated external defibrillator (AED) should be used as quickly as possible alongside CPR (cardiopulmonary resuscitation). Early defibrillation significantly increases the chances of survival — survival rates decrease by approximately 10% for every minute that defibrillation is delayed. An AED should be part of the standard first aid equipment available at every confined space entry point.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 191,
  question: "Under RIDDOR 2013, within what timeframe must a death resulting from a confined space incident be reported to the enforcing authority?",
  options: [
    "Within 24 hours",
    "Without delay — by the quickest practicable means (usually telephone)",
    "Within 10 working days",
    "Within one calendar month"
  ],
  correctAnswer: 1,
  explanation: "Under RIDDOR 2013, a death arising from a work-related accident must be reported to the enforcing authority (HSE or local authority) without delay — by the quickest practicable means. This is usually by telephone to the HSE Incident Contact Centre. A written report (F2508) must follow within 10 days. The site and any evidence must be preserved pending investigation unless doing so would cause danger.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 192,
  question: "What is 'rescue death' and how can it be prevented?",
  options: [
    "Death caused by the rescue equipment failing",
    "Death that occurs after rescue from suspension, caused by the sudden redistribution of pooled blood overwhelming the heart — prevented by adopting a semi-seated recovery position rather than laying the casualty flat",
    "Death of a rescuer who enters without breathing apparatus",
    "A term for casualties who cannot be saved"
  ],
  correctAnswer: 1,
  explanation: "Rescue death (also called reflow syndrome) occurs when a casualty who has been suspended in a harness is suddenly laid flat after rescue. The pooled, deoxygenated blood from the legs rushes back to the heart, potentially causing fatal cardiac overload. It is prevented by placing the rescued casualty in a semi-seated or W-position (knees raised) for 30-40 minutes after rescue, allowing gradual blood redistribution. All confined space rescue personnel must be trained to recognise and manage this condition.",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 193,
  question: "What factors should be considered when selecting between SCBA and airline BA for confined space rescue?",
  options: [
    "Only the cost of the equipment",
    "Duration of air supply, the distance the rescuer needs to travel, the size of the access, the potential for hose snag or damage, and the need for mobility",
    "The colour of the equipment",
    "Whether the rescuer prefers one over the other"
  ],
  correctAnswer: 1,
  explanation: "Selection factors include: duration of air supply (SCBA is limited by cylinder size; airline BA offers longer duration but adds a hose); travel distance (airline has hose length limits); access size (SCBA cylinders may not fit through restricted openings — in such cases, the cylinder may need to be passed through separately or airline BA used); hose snag risk (airline hoses can become tangled or damaged in complex spaces); and mobility requirements (SCBA offers greater freedom of movement as there is no hose).",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 194,
  question: "What is the purpose of a 'turnaround pressure' when using SCBA during a confined space rescue?",
  options: [
    "The pressure at which the cylinder should be refilled",
    "The minimum cylinder pressure at which the rescuer must begin their return journey to ensure they exit the space before the air supply is exhausted",
    "The pressure needed to inflate a rescue stretcher",
    "The atmospheric pressure inside the confined space"
  ],
  correctAnswer: 1,
  explanation: "The turnaround pressure is the calculated minimum cylinder pressure at which the SCBA wearer must begin their return journey to the exit. It accounts for the air consumed during the journey in, the air needed for the return journey (typically the same or more due to exertion and potential complications), plus a safety margin. The low-pressure warning whistle (typically at 55 bar) provides an audible alert but should not be relied upon as the sole turnaround indicator — the turnaround pressure should be pre-calculated and monitored.",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 195,
  question: "After a confined space incident, what documentation should be preserved for the investigation?",
  options: [
    "Only photographs of the scene",
    "All permits, risk assessments, atmospheric monitoring records, training records, equipment inspection records, CCTV footage, witness statements, and the scene itself",
    "Only the entry permit",
    "Only the injured worker's medical records"
  ],
  correctAnswer: 1,
  explanation: "A comprehensive investigation requires preservation of all relevant documentation including: the confined space entry permit and any linked permits; the risk assessment and method statement; atmospheric monitoring data logs; gas detector calibration and bump test records; training and competency records for all involved personnel; equipment inspection and maintenance records; CCTV or body camera footage; witness statements; and the physical scene itself (which must not be disturbed except to prevent further danger).",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 196,
  question: "What is the HSE's recommended approach to investigating confined space incidents?",
  options: [
    "Focus only on blaming the individual worker",
    "A systematic approach examining immediate causes, underlying causes, and root causes — including organisational and management factors",
    "Accept the incident as unavoidable and move on",
    "Only investigate if a prosecution is anticipated"
  ],
  correctAnswer: 1,
  explanation: "The HSE recommends a systematic investigation approach (as outlined in HSG245 'Investigating accidents and incidents') that looks beyond the immediate causes to identify underlying causes and root causes. This includes examining organisational factors (safety culture, management systems, resource allocation), human factors (competence, fatigue, communication), and technical factors (equipment reliability, design). The aim is to learn and prevent recurrence, not simply to assign blame.",
  category: "Emergency & Rescue Procedures",
  difficulty: "intermediate"
},
{
  id: 197,
  question: "A worker is rescued from a confined space after inhaling hydrogen sulphide. They appear to have recovered and want to return to work. What should happen?",
  options: [
    "They can return to work immediately if they feel fine",
    "They must receive medical assessment and clearance before returning to work, as H₂S can cause delayed pulmonary oedema and other latent effects",
    "They should rest for 10 minutes and then return to work",
    "They should take an aspirin and continue"
  ],
  correctAnswer: 1,
  explanation: "Hydrogen sulphide exposure can cause delayed medical effects including pulmonary oedema (fluid in the lungs) that may develop hours after apparent recovery. Any worker exposed to H₂S in a confined space incident must receive a full medical assessment and must not return to work until cleared by a medical professional. The medical professional should be informed of the specific substance involved and the estimated exposure level and duration.",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 198,
  question: "What is a 'cascade system' in the context of confined space rescue breathing apparatus?",
  options: [
    "A series of waterfalls used to cool the space",
    "A bank of interconnected high-pressure air cylinders that provide an extended, continuous supply of breathing air to airline BA users",
    "A management hierarchy for approving rescue operations",
    "A sequence of increasingly difficult rescue techniques"
  ],
  correctAnswer: 1,
  explanation: "A cascade system consists of a bank of large, interconnected high-pressure air cylinders that are manifolded together to provide a high-volume, extended, continuous supply of Grade D breathing air. They are used to supply airline breathing apparatus during prolonged confined space operations and rescue scenarios where single-cylinder SCBA duration would be insufficient. The system automatically switches between cylinders as they deplete, ensuring uninterrupted air supply to the user.",
  category: "Emergency & Rescue Procedures",
  difficulty: "advanced"
},
{
  id: 199,
  question: "What information should be communicated to the emergency services when calling 999 for a confined space incident?",
  options: [
    "Just the address of the site",
    "The exact location and type of confined space, the nature of the emergency, number of casualties, suspected hazards (gas type if known), what rescue measures are in progress, and any access difficulties",
    "Only the name of the company",
    "The worker's next of kin details only"
  ],
  correctAnswer: 1,
  explanation: "When calling 999 for a confined space incident, the following information should be communicated: the exact location including site address and specific location of the confined space; the type of confined space (tank, sewer, vessel, etc.); the nature of the emergency (collapse, gas exposure, engulfment, etc.); the number of casualties and their suspected condition; the suspected hazard (gas type and concentration if known); what rescue measures are already in progress; access difficulties for emergency vehicles; and a contact name and phone number for the person meeting the emergency services at the site entrance.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
},
{
  id: 200,
  question: "After a confined space near-miss event is reported and investigated, what is the MOST important final step?",
  options: [
    "Filing the report and forgetting about it",
    "Disciplining the workers involved",
    "Implementing corrective actions, updating the risk assessment and safe system of work, and sharing the lessons learned across the organisation",
    "Reducing the frequency of future confined space entries to zero"
  ],
  correctAnswer: 2,
  explanation: "The most important final step after investigating a near miss is to implement the identified corrective actions, update the risk assessment and safe system of work to reflect the lessons learned, and share the findings across the organisation so that all relevant personnel can benefit from the experience. Near misses are valuable opportunities for organisational learning. Without implementing corrective actions and sharing lessons, the investigation adds no value and the same near miss — or worse, an actual incident — is likely to recur.",
  category: "Emergency & Rescue Procedures",
  difficulty: "basic"
}
];
