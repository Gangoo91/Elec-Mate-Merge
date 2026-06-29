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
  'Understanding Confined Spaces',
  'Legislation & Risk Assessment',
  'Hazards & Atmospheric Monitoring',
  'Safe Entry & Working Procedures',
  'Emergency & Rescue Procedures',
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
  categories: confinedSpacesCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomConfinedSpacesExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    confinedSpacesQuestionBank,
    numQuestions,
    confinedSpacesCategories
  );
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
    question: 'What is the legal definition of a confined space under UK regulations?',
    options: [
      'Any space that is fully sealed and located below ground level with no natural ventilation',
      'Any enclosed space where there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions',
      'Any work area smaller than 2 metres in height where a person cannot stand fully upright',
      'Any room without a permanent means of mechanical ventilation or air conditioning',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Confined Spaces Regulations 1997, a confined space is defined as any place which is substantially (though not always entirely) enclosed, and where serious injury can occur from hazardous substances or conditions within the space, or nearby. It is the risk, not just the size, that defines a confined space.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Definition of confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 2,
    question: 'Which of the following is a key characteristic of a confined space?',
    options: [
      'It must be completely sealed with no openings to the outside atmosphere',
      'It must be smaller than the minimum dimensions specified in the regulations',
      'It must be substantially enclosed and have a reasonably foreseeable risk of serious injury',
      'It must be situated underground or below the surrounding ground level',
    ],
    correctAnswer: 2,
    explanation:
      'A confined space has two key characteristics: it is substantially (though not always entirely) enclosed, and there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions. A space does not need to be underground, sealed, or unlit to be classified as confined.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Characteristics of confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 3,
    question: 'Which of the following is an example of a confined space?',
    options: [
      'A workshop fitted with extract ventilation and multiple windows',
      'An office with permanent mechanical ventilation and two exits',
      'An open-top skip in a well-ventilated yard',
      'A storage tank that previously held chemicals',
    ],
    correctAnswer: 3,
    explanation:
      'A storage tank that previously held chemicals is a classic example of a confined space. It is substantially enclosed, has limited access and egress, and there is a foreseeable risk of serious injury from residual hazardous substances, oxygen depletion, or a build-up of flammable vapours.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Examples of confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 4,
    question: 'Which of the following would NOT typically be classified as a confined space?',
    options: [
      'An open-top skip in a well-ventilated yard',
      'A sewer accessed through a manhole cover',
      "A ship's hold being unloaded of bulk cargo",
      'An underground service duct with restricted access',
    ],
    correctAnswer: 0,
    explanation:
      "An open-top skip in a well-ventilated yard would not typically meet the definition of a confined space because it is not substantially enclosed and does not normally present a foreseeable risk of serious injury from hazardous substances or conditions. Sewers, ship's holds, and ducts are all classic confined space examples.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Identifying confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 5,
    question:
      'A room with poor ventilation that is used for spray painting could be classified as a confined space. Why?',
    options: [
      'Because any room used for industrial coating work is automatically classed as a confined space by law',
      'Because the build-up of flammable vapours or toxic fumes in a substantially enclosed space creates a foreseeable risk of serious injury',
      'Because spray painting always requires the use of self-contained breathing apparatus regardless of the room',
      'Because the room is too small for two workers to occupy it at the same time',
    ],
    correctAnswer: 1,
    explanation:
      'A poorly ventilated room used for spray painting can become a confined space because the build-up of flammable vapours and toxic fumes in a substantially enclosed area creates a foreseeable risk of serious injury. The classification depends on the risk, not just the physical dimensions of the space.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Dynamic classification',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 6,
    question: 'True or false: A confined space must always be small or cramped.',
    options: [
      'False — only spaces below 2 metres in height count as confined',
      'True — confined spaces are always physically restrictive',
      'False — a confined space can be any size; it is the risk and enclosure that define it',
      'True — if you can stand up fully, it is not a confined space',
    ],
    correctAnswer: 2,
    explanation:
      "A confined space does not have to be small or cramped. Large spaces such as silos, ship's holds, or large tanks can be confined spaces. The defining factors are that the space is substantially enclosed and that there is a foreseeable risk of serious injury from hazardous substances or conditions.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Common misconceptions',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 7,
    question:
      'Which of the following best describes why manholes and inspection chambers can be confined spaces?',
    options: [
      'They are always located on the public highway, which automatically brings them within the regulations',
      'They are fitted with a removable cover, and any space with a removable lid counts as confined',
      'They are inspected only occasionally, so atmospheric conditions are never tested before entry',
      'They are substantially enclosed with limited access, and may contain hazardous atmospheres from decomposing material or leaked services',
    ],
    correctAnswer: 3,
    explanation:
      'Manholes and inspection chambers are substantially enclosed with restricted access and egress. They may contain hazardous atmospheres due to decomposing organic matter producing gases such as hydrogen sulphide or methane, or from leaking gas or water services. This creates a foreseeable risk of serious injury.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Underground confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 8,
    question: 'What is the primary reason electrical workers may encounter confined spaces?',
    options: [
      'Cable pulling, jointing, and maintenance often take place in ducts, chambers, risers, and plant rooms with restricted access',
      'Electrical regulations require all fixed wiring to be installed within sealed, enclosed voids',
      'Electricians are legally obliged to test the atmosphere of every room before working in it',
      'Electrical equipment can only be safely operated in spaces with restricted natural ventilation',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical workers frequently encounter confined spaces when carrying out cable pulling, jointing, testing, and maintenance in underground ducts, cable chambers, risers, transformer enclosures, and plant rooms. These spaces can have restricted access, poor ventilation, and potential exposure to hazardous atmospheres.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Confined spaces in electrical work',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 9,
    question: 'Which two factors together define a confined space under UK law?',
    options: [
      'Located below ground level and accessed by a single entry point',
      'Substantially enclosed and a foreseeable risk of serious injury',
      'Poor lighting and a temperature higher than the surrounding area',
      'Small physical dimensions and the absence of mechanical ventilation',
    ],
    correctAnswer: 1,
    explanation:
      'The Confined Spaces Regulations 1997 define a confined space by two factors: the space must be substantially (though not always entirely) enclosed, and there must be a reasonably foreseeable risk of serious injury from hazardous substances or conditions within the space or nearby.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Legal definition',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 10,
    question:
      'A vat that was recently emptied of a solvent-based product is being prepared for maintenance. What makes it a confined space?',
    options: [
      'Once it has been drained, it no longer presents any hazard and can be entered freely',
      'It only becomes a confined space once the maintenance work has actually started inside it',
      'It is substantially enclosed and residual vapours create a foreseeable risk of serious injury from flammable or toxic atmospheres',
      'It is large enough for a person to stand inside, which automatically classifies it as confined',
    ],
    correctAnswer: 2,
    explanation:
      'Even after draining, residual solvent can produce flammable or toxic vapours within the substantially enclosed vat. This creates a foreseeable risk of serious injury from fire, explosion, or poisoning, classifying the vat as a confined space requiring appropriate controls before entry.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Residual hazards',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 11,
    question: 'Why might a large open-topped water tank still be considered a confined space?',
    options: [
      'Because any vessel that holds more than a set volume of water is automatically classed as confined',
      'Because an open top means natural ventilation can never reach a safe level inside the tank',
      'Because water always gives off oxygen-depleting vapours regardless of how the tank is treated',
      'Because the depth and limited access could trap a person, and biological or chemical hazards may be present',
    ],
    correctAnswer: 3,
    explanation:
      'A large open-topped tank can still be a confined space if the depth and restricted access create a risk of entrapment, drowning, or exposure to hazardous atmospheres from biological growth or chemical treatment. The risk assessment must consider all potential hazards, not just whether the space has a roof.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Unusual confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 12,
    question:
      'Which of the following scenarios describes a space that could become a confined space due to the work activity?',
    options: [
      'A basement room where solvent-based coatings are being applied, causing a build-up of vapours',
      'An outdoor car park where cable trenches are being excavated in the open air',
      'A well-ventilated workshop where bench testing of equipment is taking place',
      'A naturally ventilated corridor where light fittings are being replaced from a stepladder',
    ],
    correctAnswer: 0,
    explanation:
      "A space does not have to be permanently classified as confined. If a work activity such as applying solvent-based coatings in a substantially enclosed room causes a build-up of flammable or toxic vapours, the space can become a confined space for the duration of that work. This is sometimes called a 'transient' confined space.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Dynamic classification',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 13,
    question: "In the context of confined spaces, what does 'substantially enclosed' mean?",
    options: [
      'The space must be completely sealed on all sides with no openings whatsoever',
      'The space is mostly enclosed by walls, floor, or ceiling, though it may have openings for entry or ventilation',
      'The space contains a substantial quantity of hazardous material or stored energy',
      'The space is enclosed by a structure that is substantial enough to support a person climbing on it',
    ],
    correctAnswer: 1,
    explanation:
      "'Substantially enclosed' means the space is mostly surrounded by walls, floor, and/or ceiling, even though it may have openings such as entry points, manholes, or ventilation apertures. It does not need to be completely sealed — the enclosure restricts natural air movement and can allow hazardous atmospheres to accumulate.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Enclosure definition',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 14,
    question:
      'A cable duct runs beneath a factory floor and is accessed via a hatch. Why is this a confined space?',
    options: [
      'Because it carries electrical cables, and any space containing cables is classed as confined',
      'Because it is below a factory floor, and all sub-floor voids are confined spaces by definition',
      'Because it is substantially enclosed with limited access, and could contain hazardous atmospheres, flooding, or cable faults',
      'Because the hatch can be locked, and any lockable space is treated as a confined space',
    ],
    correctAnswer: 2,
    explanation:
      'An underground cable duct is substantially enclosed with restricted entry and exit through a hatch. Hazards can include oxygen depletion, accumulation of gases from the surrounding ground, flooding, and electrical faults from the cables. These foreseeable risks classify it as a confined space.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Cable ducts',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 15,
    question: 'Which of the following is NOT a reason a space may be classified as confined?',
    options: [
      'Risk of oxygen depletion',
      'Risk of flooding or engulfment',
      'Risk of exposure to toxic gases',
      'Risk of getting a mobile phone signal',
    ],
    correctAnswer: 3,
    explanation:
      "Poor mobile phone signal is an inconvenience but is not a 'serious injury' risk that would classify a space as confined. The foreseeable risks that contribute to confined space classification include oxygen depletion, toxic or flammable atmospheres, flooding, engulfment by free-flowing solids, and excessive heat.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Classification criteria',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 16,
    question: 'What role does ventilation play in determining whether a space is confined?',
    options: [
      'Limited natural ventilation can allow hazardous atmospheres to accumulate, contributing to the foreseeable risk that defines a confined space',
      'Ventilation has no bearing on classification, which depends solely on the physical size of the space',
      'A space is only confined if it has no ventilation openings of any kind at all',
      'Good mechanical ventilation always removes a space from the scope of the regulations entirely',
    ],
    correctAnswer: 0,
    explanation:
      'Limited natural ventilation means that hazardous gases, vapours, or fumes may not disperse naturally, leading to dangerous concentrations. This accumulation contributes to the foreseeable risk of serious injury from hazardous atmospheres, which is a key factor in classifying a space as confined.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Ventilation and classification',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 17,
    question:
      'A transformer chamber in the basement of a building has a single access door and no windows. Which confined space hazards are most likely?',
    options: [
      'Engulfment by free-flowing solids and a high risk of drowning from water ingress',
      'Oxygen depletion from SF₆ gas leaks, electrical arc flash, and restricted egress',
      'Hydrogen sulphide build-up and methane accumulation from decomposing organic matter',
      'Excessive noise, vibration, and dust generated by the transformer cooling fans',
    ],
    correctAnswer: 1,
    explanation:
      'Transformer chambers can contain sulphur hexafluoride (SF₆) gas-insulated switchgear. SF₆ is denser than air and displaces oxygen if it leaks. Combined with the risk of electrical arc flash and the restricted single-door egress, this creates a foreseeable risk of serious injury in a substantially enclosed space.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Electrical confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 18,
    question:
      'Which of the following is a common confined space encountered during electrical installations on construction sites?',
    options: [
      'An open scaffold platform used for installing external lighting',
      'A site welfare cabin with mechanical ventilation and windows',
      'A deep trench with shoring, used for laying underground cables',
      'An open-sided car park deck where containment is being installed',
    ],
    correctAnswer: 2,
    explanation:
      'Deep trenches with shoring used for laying underground cables can be confined spaces. They are substantially enclosed by the trench walls and shoring, with limited access. Hazards include collapse, accumulation of heavier-than-air gases, and flooding, creating a foreseeable risk of serious injury.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Construction confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 19,
    question: "What is meant by the term 'specified risk' in relation to confined spaces?",
    options: [
      'A risk that has been formally written into the entry permit and signed off by the issuing authority',
      'Any minor risk that is specific to the particular trade carrying out the work in the space',
      'A risk identified only after an incident has occurred and been investigated by the HSE',
      'A serious risk of injury arising from conditions in or associated with a confined space, such as flammable atmospheres, toxic gases, or engulfment',
    ],
    correctAnswer: 3,
    explanation:
      "A 'specified risk' under the Confined Spaces Regulations 1997 refers to a risk of serious injury arising from fire, explosion, loss of consciousness, drowning, or asphyxiation due to conditions within or associated with the confined space. These are the risks that trigger the requirement for safe systems of work.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Specified risks',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 20,
    question:
      'Which of the following correctly lists examples of confined spaces an electrician might work in?',
    options: [
      'Cable ducts, distribution board cupboards in basements, underground chambers, and switch rooms with restricted ventilation',
      'Open rooftops, external scaffold lifts, exposed cable trays, and naturally ventilated plant yards',
      'Domestic living rooms, retail shop floors, open-plan offices, and ground-floor reception areas',
      'Car park ramps, loading bays, external service yards, and covered walkways open at both ends',
    ],
    correctAnswer: 0,
    explanation:
      'Electricians frequently work in cable ducts, underground chambers, basement distribution board cupboards, and switch rooms with restricted ventilation. These spaces can be substantially enclosed with limited access and may contain hazardous atmospheres from cable insulation off-gassing, SF₆ leaks, or poor air circulation.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Electrical confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 21,
    question: 'Can a space that is not normally classified as confined become one temporarily?',
    options: [
      'No — a space is permanently classified once and that classification can never change',
      'Yes — work activities or changing conditions can introduce foreseeable risks that temporarily make a space confined',
      'No — only spaces that are below ground level can ever be classed as confined',
      'Yes — but only if the space is physically altered by building works to reduce its size',
    ],
    correctAnswer: 1,
    explanation:
      'A space can become a confined space temporarily due to the nature of work being carried out (e.g. using solvents in a poorly ventilated room) or changing conditions (e.g. a leak introducing gases). This is why risk assessments must be dynamic and reviewed whenever conditions change.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Transient confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 22,
    question:
      'A silo containing grain is an example of a confined space. What specific risks does it present?',
    options: [
      'Electric shock from buried cables, arc flash, and excessive ambient noise',
      'Flooding from water mains, leptospirosis from rats, and exposure to raw sewage',
      'Engulfment by free-flowing grain, oxygen depletion from grain respiration, and dust explosion risk',
      'Oxygen enrichment from leaking cylinders, chemical burns, and exposure to solvent vapours',
    ],
    correctAnswer: 2,
    explanation:
      'Grain silos present multiple confined space hazards: engulfment by the free-flowing grain (which can behave like quicksand), oxygen depletion as grain respires and consumes oxygen, toxic gas production from mouldy grain, and the risk of dust explosion from fine grain particles in the correct concentration with an ignition source.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Engulfment hazards',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 23,
    question:
      "What is the significance of 'limited means of access or egress' when identifying a confined space?",
    options: [
      'It means the space can only be entered by one worker at a time under any circumstances',
      'It indicates the space is too small to require atmospheric monitoring before entry',
      'It shows that the space is unlikely to contain hazardous substances or conditions',
      'Restricted entry and exit points make it harder to escape in an emergency and harder for rescuers to reach a casualty, increasing the severity of any incident',
    ],
    correctAnswer: 3,
    explanation:
      'Limited access and egress are significant because they increase the consequences of any incident. If a person is overcome by a hazardous atmosphere or injured, restricted entry and exit points make self-rescue difficult, delay emergency rescue, and complicate the removal of a casualty. This is a key factor in confined space risk assessment.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Access and egress',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 24,
    question:
      "Which document provides the HSE's Approved Code of Practice and guidance for the Confined Spaces Regulations 1997?",
    options: [
      'L101 — Safe Work in Confined Spaces',
      'L153 — Managing and Working with Asbestos',
      'L144 — Managing Health and Safety in Construction',
      "L8 — Legionnaires' Disease",
    ],
    correctAnswer: 0,
    explanation:
      "L101 'Safe Work in Confined Spaces' is the HSE's Approved Code of Practice (ACoP) and guidance document for the Confined Spaces Regulations 1997. It provides detailed practical guidance on identifying confined spaces, assessing risks, safe systems of work, and emergency arrangements.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'HSE guidance',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 25,
    question:
      'According to L101, which of the following is NOT listed as a typical confined space?',
    options: [
      'Storage tanks and silos',
      'Open-plan retail floors',
      'Sewers and drains',
      'Unventilated or poorly ventilated rooms',
    ],
    correctAnswer: 1,
    explanation:
      'Open-plan retail floors are not typically classified as confined spaces because they are not substantially enclosed in the regulatory sense, have adequate natural ventilation, and do not normally present a foreseeable risk of serious injury from hazardous conditions. L101 lists tanks, silos, sewers, drains, and poorly ventilated rooms as typical examples.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'L101 examples',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 26,
    question: "What does the term 'engulfment' mean in the context of confined spaces?",
    options: [
      'Being surrounded by colleagues in a small room',
      'Having too much personal protective equipment on',
      'Being trapped or buried by a free-flowing substance such as grain, sand, or liquid',
      'Being unable to hear instructions due to noise',
    ],
    correctAnswer: 2,
    explanation:
      'Engulfment occurs when a person is partially or fully submerged in a free-flowing substance such as grain, sand, slurry, or liquid within a confined space. This can lead to suffocation, drowning, or crushing. Engulfment is one of the specified risks under the Confined Spaces Regulations 1997.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Engulfment',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 27,
    question: 'Why are sewers particularly hazardous confined spaces?',
    options: [
      'Because they are always brightly lit, which masks the presence of hazardous atmospheres',
      'Because they are wide and open, making it easy for gases to accumulate undetected',
      'Because they are constructed from non-conductive materials that increase the risk of static',
      'Because they contain decomposing organic matter producing toxic gases such as hydrogen sulphide, methane, and carbon dioxide, with oxygen depletion and risk of sudden flooding',
    ],
    correctAnswer: 3,
    explanation:
      "Sewers are particularly hazardous because decomposing organic matter produces toxic gases including hydrogen sulphide (H₂S), methane (CH₄), and carbon dioxide (CO₂). Oxygen can be depleted by biological processes. Additionally, sudden rainfall can cause rapid flooding, and there may be biological hazards from Weil's disease (leptospirosis).",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Sewer hazards',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 28,
    question:
      'How does a risk assessment determine whether a space should be treated as a confined space?',
    options: [
      'By evaluating whether the space is substantially enclosed and whether there is a foreseeable risk of serious injury from hazardous conditions',
      'By measuring whether the floor area of the space falls below the threshold set in the regulations',
      'By checking only whether the space has more than one means of access and egress',
      'By confirming whether the space has ever been the subject of a previous reportable incident',
    ],
    correctAnswer: 0,
    explanation:
      'A risk assessment determines confined space status by evaluating two criteria: whether the space is substantially enclosed, and whether there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions. This requires considering the nature of the space, its contents, and the work to be carried out.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Risk assessment approach',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 29,
    question:
      'Which of the following scenarios demonstrates why confined space awareness is critical for electrical workers?',
    options: [
      'An electrician replacing a ceiling light in a well-ventilated open-plan office',
      'An electrician entering a below-ground cable chamber that has accumulated heavier-than-air gases from a nearby gas main leak',
      'An electrician terminating cables at a distribution board in an open plant room with windows',
      'An electrician fitting external floodlights from a scaffold tower in the open air',
    ],
    correctAnswer: 1,
    explanation:
      'Below-ground cable chambers can accumulate heavier-than-air gases such as natural gas from nearby leaking mains. An electrician entering without atmospheric testing could be overcome by toxic or oxygen-depleted atmospheres. This scenario demonstrates why confined space awareness is essential for electrical workers.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Electrical worker scenarios',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 30,
    question: "What is the difference between a 'confined space' and a 'restricted space'?",
    options: [
      'A confined space is always underground, while a restricted space is always above ground level',
      'A confined space requires a permit to work, while a restricted space requires only a verbal briefing',
      'A confined space has foreseeable risks of serious injury from hazardous conditions, while a restricted space simply has limited physical room to work but no such risks',
      'A confined space is one that is locked, while a restricted space is one with controlled access by pass',
    ],
    correctAnswer: 2,
    explanation:
      'A confined space must have both substantial enclosure AND a foreseeable risk of serious injury from hazardous conditions. A restricted space may be physically difficult to work in due to limited room, but does not have the associated hazardous conditions. The distinction is important because different control measures apply.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Confined vs restricted',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 31,
    question:
      'In multi-service utility tunnels, what confined space hazards might combine to create an especially dangerous environment?',
    options: [
      'Bright lighting, dry conditions, and abundant fresh air making hazards easy to detect',
      'Grain engulfment, dust explosion, and oxygen depletion from stored agricultural material',
      'Static build-up from plastic surfaces and the risk of slips on smooth painted floors',
      'Gas leaks from gas mains, oxygen depletion, flooding from water mains, electrical hazards from HV/LV cables, and limited egress points',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-service utility tunnels combine multiple confined space hazards: gas leaks from adjacent gas mains creating toxic or explosive atmospheres, oxygen depletion, flooding from water main failures, electrical hazards from high and low voltage cables, heat from steam pipes, and very limited egress points. This combination creates an extremely hazardous environment.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Multi-hazard environments',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 32,
    question: "What is meant by 'foreseeable risk' in the confined spaces definition?",
    options: [
      'A risk that a reasonable, competent person could anticipate might occur given the nature of the space and the work to be done',
      'A risk that has already caused at least one reportable incident in that particular space',
      'A risk that only becomes relevant once atmospheric monitoring has confirmed its presence',
      'A risk that is so severe that entry to the space must be prohibited under all circumstances',
    ],
    correctAnswer: 0,
    explanation:
      "'Foreseeable risk' means a risk that a reasonable, competent person could anticipate based on the nature of the space, its contents, the work being done, and the surrounding environment. It does not require the risk to have caused a previous incident — only that it could reasonably be predicted.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Foreseeable risk',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 33,
    question:
      'Why is it important to consider adjacent spaces and activities when assessing whether a space is confined?',
    options: [
      'Because adjacent spaces must always be evacuated before any entry into the assessed space',
      'Because hazards from nearby processes, storage, or services can migrate into the space being assessed through walls, pipes, or the ground',
      'Because the regulations require every adjacent room to hold its own separate entry permit',
      'Because adjacent activities determine how many rescue personnel must be on standby',
    ],
    correctAnswer: 1,
    explanation:
      'Hazards from adjacent areas can migrate into the space being assessed. For example, gases from nearby chemical storage can seep through cracks, fumes from adjacent processes can enter via shared ventilation, and substances can flow through connecting pipes. The risk assessment must consider the wider environment, not just the space in isolation.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Adjacent hazards',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 34,
    question: 'Which of the following is true about confined spaces in domestic settings?',
    options: [
      'Confined spaces cannot exist in domestic settings because the regulations apply only to industrial premises',
      'Any room in a domestic dwelling automatically counts as a confined space when work is carried out',
      'Domestic loft spaces and cellars can be confined spaces if they are substantially enclosed with foreseeable risks such as poor ventilation and gas accumulation',
      'Domestic confined spaces are exempt from the regulations provided the homeowner gives permission',
    ],
    correctAnswer: 2,
    explanation:
      'Confined spaces can exist in domestic settings. Loft spaces, cellars, and under-floor voids can be substantially enclosed with poor ventilation. If gas from a leaking supply or biological decomposition has accumulated, these spaces present a foreseeable risk of serious injury and must be treated as confined spaces.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Domestic confined spaces',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 35,
    question: 'What makes a void above a false ceiling a potential confined space?',
    options: [
      'Any void above head height is automatically classed as a confined space under the regulations',
      'The void contains lighting cables, and the presence of cables alone defines a confined space',
      'The void can only be reached using a ladder, and ladder access always indicates a confined space',
      'The void is substantially enclosed, may have poor ventilation, and could contain accumulations of gases from building services or materials',
    ],
    correctAnswer: 3,
    explanation:
      'Voids above false ceilings can be confined spaces because they are substantially enclosed with limited access. They may contain gas pipes, refrigerant lines, or other services that could leak, creating hazardous atmospheres. Poor ventilation means gases can accumulate. Electrical workers often need to access these voids for cable routing.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Ceiling voids',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 36,
    question:
      'An excavation that is 1.2 metres deep with steep sides is being assessed. Under what circumstances might it be treated as a confined space?',
    options: [
      'If heavier-than-air gases accumulate at the bottom, or if the work introduces fumes (e.g. solvent jointing), or if there is a risk of side collapse creating engulfment',
      'Only if it exceeds the 1.5 metre depth threshold below which excavations are never confined',
      'Only if it is left open and unattended overnight without protective barriers in place',
      'Only if it is dug in clay rather than in sand or other free-draining ground material',
    ],
    correctAnswer: 0,
    explanation:
      'Even a relatively shallow excavation can become a confined space if conditions create a foreseeable risk of serious injury. Heavier-than-air gases (such as CO₂ or propane) can pool at the bottom, work activities can introduce hazardous fumes, and unstable sides can create engulfment risk. There is no minimum depth threshold.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Excavation assessment',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 37,
    question:
      "Which category of risk specifically defines a space as 'confined' rather than simply 'enclosed'?",
    options: [
      'The risk of the space being too small for a person to move around freely inside it',
      'The risk of serious injury from hazardous substances or conditions within the space',
      'The risk of the space being located below the surrounding ground level',
      'The risk of the space having only a single point of access and egress',
    ],
    correctAnswer: 1,
    explanation:
      "Many spaces are enclosed, but what makes a space 'confined' under the regulations is the additional presence of a foreseeable risk of serious injury from hazardous substances or conditions. Without this risk element, an enclosed space is simply an enclosed space, not a confined space in the regulatory sense.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Classification criteria',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 38,
    question:
      "What is the HSE's recommended first step when work in a confined space is being considered?",
    options: [
      'Order the most expensive breathing apparatus available',
      'Send in the most junior member of the team first',
      'Avoid entry entirely if the work can be done from outside the space',
      'Open all the access points and wait 24 hours',
    ],
    correctAnswer: 2,
    explanation:
      "The HSE's hierarchy of control for confined spaces places avoidance of entry as the first and most important step (Regulation 3 of the CSR 1997). If the work objective can be achieved without entering the confined space — for example by using remote tools, cameras, or long-reach equipment — then entry should be avoided altogether.",
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Hierarchy of control',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 39,
    question: 'Why might a cold store or freezer room be classified as a confined space?',
    options: [
      'Because low temperatures alone are sufficient to classify any room as a confined space',
      'Because food storage rooms are always treated as confined spaces under hygiene regulations',
      'Because the room is kept locked for security, and any locked room counts as confined',
      'Because the refrigeration system may leak gases that displace oxygen, the insulated room is substantially enclosed, and there may be risk of entrapment if the door locks',
    ],
    correctAnswer: 3,
    explanation:
      'Cold stores and freezer rooms can be confined spaces because they are heavily insulated and substantially enclosed, with refrigerant gases (such as ammonia or CO₂) that can leak and displace oxygen. The risk of becoming trapped if the door mechanism fails, combined with extreme cold, creates a foreseeable risk of serious injury.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Cold store hazards',
    category: 'Understanding Confined Spaces',
  },
  {
    id: 40,
    question: 'Which of the following statements about confined spaces is correct?',
    options: [
      'The classification of a space can change depending on the work being done, the contents of the space, and environmental conditions',
      'A space must be physically small and cramped before it can be classified as confined',
      'A space is only confined if it is permanently sealed and never opened to the atmosphere',
      'A space loses its confined classification permanently once it has been ventilated even once',
    ],
    correctAnswer: 0,
    explanation:
      'Confined space classification is not permanent or fixed. A space can become confined due to changing work activities (e.g. introducing solvents), changing contents (e.g. a tank refilled with a different substance), or changing environmental conditions (e.g. a gas leak from nearby services). This is why ongoing risk assessment is essential.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Dynamic classification',
    category: 'Understanding Confined Spaces',
  },

  // =======================================================================
  // LEGISLATION & RISK ASSESSMENT — 40 questions (id 41-80)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 41,
    question: 'Which UK regulation specifically governs work in confined spaces?',
    options: [
      'The Manual Handling Operations Regulations 1992',
      'The Confined Spaces Regulations 1997',
      'The Electricity at Work Regulations 1989',
      'The Control of Substances Hazardous to Health Regulations 2002',
    ],
    correctAnswer: 1,
    explanation:
      'The Confined Spaces Regulations 1997 (CSR 1997) are the principal UK regulations governing work in confined spaces. They place duties on employers to assess risks, avoid entry where possible, implement safe systems of work where entry is necessary, and arrange emergency procedures.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Primary legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 42,
    question: 'How many regulations are contained within the Confined Spaces Regulations 1997?',
    options: [
      '3',
      '15',
      '5',
      '10',
    ],
    correctAnswer: 2,
    explanation:
      'The Confined Spaces Regulations 1997 contain 5 regulations: Regulation 1 (Citation and commencement), Regulation 2 (Interpretation), Regulation 3 (Duties — avoidance of entry), Regulation 4 (Safe system of work), and Regulation 5 (Emergency arrangements). Despite being brief, they impose significant duties.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Regulation structure',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 43,
    question: 'What does Regulation 3 of the Confined Spaces Regulations 1997 require?',
    options: [
      'That every confined space entry must be notified to the HSE at least 24 hours beforehand',
      'That at least two trained rescuers must be present for any confined space entry',
      'That breathing apparatus must be worn for all confined space entries without exception',
      'That no person at work shall enter a confined space to carry out work unless entry is unavoidable',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 3 states that no person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry. This establishes avoidance of entry as the primary control measure — entry should only occur when there is no other practicable way to complete the work.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Regulation 3 — Avoidance',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 44,
    question:
      'What does Regulation 4 of the Confined Spaces Regulations 1997 require when entry is necessary?',
    options: [
      'That a safe system of work must be established before entry',
      'That the space must be heated to at least 15°C',
      'That work must be completed within 30 minutes',
      'That a doctor must be present on site',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4 requires that where entry to a confined space is unavoidable, a safe system of work shall be established. This must be followed for all work in the confined space and must include adequate arrangements for the rescue of persons in the event of an emergency.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Regulation 4 — Safe system',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 45,
    question: 'What does Regulation 5 of the Confined Spaces Regulations 1997 require?',
    options: [
      'That a risk assessment must be carried out for every confined space before entry is allowed',
      'That suitable and sufficient emergency arrangements must be in place before anyone enters a confined space',
      'That a permit to work must be issued and signed before any confined space entry takes place',
      'That continuous atmospheric monitoring must be maintained throughout the duration of the work',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 5 requires that suitable and sufficient arrangements for the rescue of persons in the event of an emergency shall be put in place before any person enters or works in a confined space. This includes trained rescue personnel, rescue equipment, and resuscitation equipment as appropriate.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Regulation 5 — Emergency',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 46,
    question: 'Under which overarching legislation do the Confined Spaces Regulations 1997 sit?',
    options: [
      'The Factories Act 1961',
      'The Building Act 1984',
      'The Health and Safety at Work etc. Act 1974',
      'The Environmental Protection Act 1990',
    ],
    correctAnswer: 2,
    explanation:
      'The Confined Spaces Regulations 1997 were made under the Health and Safety at Work etc. Act 1974 (HASAWA). HASAWA provides the overarching legal framework for workplace health and safety in Great Britain, and the CSR 1997 are secondary legislation (statutory instruments) made under its powers.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Overarching legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 47,
    question:
      'Which regulation requires employers to carry out a risk assessment for work activities, including confined space work?',
    options: [
      'The Provision and Use of Work Equipment Regulations 1998',
      'The Workplace (Health, Safety and Welfare) Regulations 1992',
      'The Personal Protective Equipment at Work Regulations 2022',
      'The Management of Health and Safety at Work Regulations 1999',
    ],
    correctAnswer: 3,
    explanation:
      'The Management of Health and Safety at Work Regulations 1999 (Regulation 3) require employers to make a suitable and sufficient assessment of risks to their employees. This general duty applies to all work activities, including confined space work, and complements the specific requirements of the Confined Spaces Regulations 1997.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Risk assessment duty',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 48,
    question: 'What is the purpose of L101 in relation to confined space work?',
    options: [
      "It is the HSE's Approved Code of Practice and guidance that helps duty holders comply with the Confined Spaces Regulations 1997",
      "It is the legally binding statutory instrument that created the Confined Spaces Regulations 1997",
      "It is a British Standard that specifies the design requirements for confined space rescue equipment",
      "It is an HSE enforcement notice template used to prohibit unsafe confined space entry",
    ],
    correctAnswer: 0,
    explanation:
      "L101 'Safe Work in Confined Spaces' is the Approved Code of Practice (ACoP) published by the HSE. It provides practical guidance to help employers and duty holders comply with the Confined Spaces Regulations 1997. While not law itself, following the ACoP is normally sufficient to comply with the regulations.",
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'L101 purpose',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 49,
    question: 'What legal status does an Approved Code of Practice (ACoP) such as L101 have?',
    options: [
      'It is fully binding law, and any deviation from it is automatically a criminal offence',
      'It has a special legal status — failure to follow it is not an offence in itself, but it can be used as evidence of failing to comply with the regulations',
      'It is purely advisory guidance with no legal weight that can be ignored entirely',
      'It is an international treaty obligation enforced by the courts rather than the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'An ACoP has a special legal status. If a duty holder is prosecuted for a breach of the regulations and it is proved that they did not follow the relevant provisions of the ACoP, a court may find them at fault unless they can show that they complied with the regulation in some other equally effective way.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'ACoP legal status',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 50,
    question: 'Who has duties under the Confined Spaces Regulations 1997?',
    options: [
      'Only the HSE and local authority enforcing inspectors',
      'Only the individual workers who physically enter the confined space',
      'Employers, the self-employed, and anyone who has control of the premises to any extent',
      'Only large organisations employing more than five people on the site',
    ],
    correctAnswer: 2,
    explanation:
      'The Confined Spaces Regulations 1997 place duties on employers (for their employees), the self-employed (for themselves and others affected by their work), and anyone who controls premises to any extent (e.g. building owners, landlords). This broad scope ensures that responsibility is shared among all those who can influence safety.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Duty holders',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 51,
    question:
      "A contractor is hired to carry out electrical work in a confined space on someone else's premises. Who is responsible for safety?",
    options: [
      'Only the premises owner, because they have ultimate control of the site',
      'Only the contractor, because they are carrying out the actual work',
      'Neither party, provided a written contract transfers all liability to a third party',
      'Both the premises owner/controller and the contractor have overlapping duties',
    ],
    correctAnswer: 3,
    explanation:
      "When contractors work in confined spaces on another party's premises, duties overlap. The premises controller must provide information about known hazards and ensure the space is safe for the contractor to work in. The contractor must carry out risk assessments, implement safe systems of work, and ensure their employees are competent. Co-operation between both parties is essential.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Contractor duties',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 52,
    question: 'What is the first step in a confined space risk assessment?',
    options: [
      'Identifying whether the space meets the definition of a confined space',
      'Issuing the permit to work so that entry can begin without delay',
      'Selecting and fitting the breathing apparatus for the entrants',
      'Setting up the rescue tripod and winch over the entry point',
    ],
    correctAnswer: 0,
    explanation:
      'The first step is to identify whether the space is actually a confined space — i.e. whether it is substantially enclosed and has a foreseeable risk of serious injury from hazardous conditions. If it is not a confined space, the specific requirements of the CSR 1997 do not apply (though general health and safety duties still do).',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Risk assessment steps',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 53,
    question:
      'Once a space has been confirmed as confined, what must the risk assessment evaluate?',
    options: [
      'Only the physical dimensions of the space and the number of access points',
      'The specific hazards present, who might be harmed, the likelihood and severity of harm, and what control measures are needed',
      'Only the cost of the equipment needed and the time the work will take to complete',
      'Only whether the emergency services can attend the site within their target response time',
    ],
    correctAnswer: 1,
    explanation:
      'The risk assessment for a confirmed confined space must evaluate all specific hazards (atmospheric, physical, biological), who might be harmed (entrants, standby persons, nearby workers), the likelihood and potential severity of harm, and what control measures are needed to eliminate or reduce the risk to an acceptable level.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Risk assessment scope',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 54,
    question: 'What is a permit-to-work system in the context of confined spaces?',
    options: [
      'A verbal agreement between the worker and supervisor that entry may go ahead',
      'A licence issued by the HSE granting permission to operate confined space equipment',
      'A formal, documented system that authorises certain people to carry out specific work in a confined space under controlled conditions',
      'A certificate of competence confirming that a worker has completed confined space training',
    ],
    correctAnswer: 2,
    explanation:
      'A permit-to-work (PTW) is a formal documented procedure that forms part of a safe system of work. It authorises named individuals to carry out specific work in a confined space at a specific time, subject to specified precautions being in place. It acts as a checklist, communication tool, and record of the controls applied.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Permit to work',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 55,
    question: 'Is a permit to work always required for confined space entry?',
    options: [
      'Yes — a permit to work is a strict legal requirement for every single confined space entry',
      'Yes — but only for entries that are expected to last longer than one working shift',
      'No — permits are never used for confined space work as a risk assessment is sufficient on its own',
      'No — the regulations require a safe system of work, which may or may not include a permit to work depending on the risk assessment',
    ],
    correctAnswer: 3,
    explanation:
      'The Confined Spaces Regulations 1997 require a safe system of work (Regulation 4) but do not specifically mandate a permit to work for every entry. However, L101 strongly recommends permits for most confined space entries as they provide a structured, documented approach. The risk assessment should determine whether a permit is appropriate.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Permit requirements',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 56,
    question: 'What information should a confined space permit to work typically contain?',
    options: [
      'The work to be done, hazards identified, precautions required, gas test results, emergency procedures, time limits, and authorisation signatures',
      'Only the name of the worker entering and the date of the entry',
      'Only the manufacturer and serial numbers of the gas detection equipment used',
      'Only the postal address of the site and the contact number for the emergency services',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive permit to work should include: description and location of the space; the work to be done; hazards identified; precautions required (isolation, ventilation, PPE); atmospheric test results; emergency and rescue arrangements; time limits for the work; names of authorised persons; and signatures for issue, acceptance, and cancellation.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Permit content',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 57,
    question: "What does the term 'competent person' mean in the context of confined space work?",
    options: [
      'The most senior manager on site, regardless of their confined space knowledge',
      'A person who has the necessary training, experience, and knowledge to carry out the specific task safely',
      'Any worker who holds a current first aid at work certificate',
      'The oldest and most experienced member of the work crew by default',
    ],
    correctAnswer: 1,
    explanation:
      'A competent person is someone who has sufficient training, experience, knowledge, and other qualities to carry out the specific task safely and to recognise their own limitations. For confined space work, this includes understanding the hazards, knowing how to use equipment correctly, and being able to follow and implement the safe system of work.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Competence',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 58,
    question:
      'Which of the following is a key element of a safe system of work for confined space entry?',
    options: [
      'Allowing the work to proceed as quickly as possible to minimise time spent inside',
      'Relying on the entrant to detect hazards by smell and report them to the top person',
      'Ensuring the space is adequately isolated from all connected services, pipelines, and energy sources before entry',
      'Limiting the number of breaks taken by entrants to maintain continuous productivity',
    ],
    correctAnswer: 2,
    explanation:
      'Isolation is a critical element of a safe system of work for confined space entry. All connected pipes, ducts, and services must be physically isolated (locked off, blanked, disconnected) to prevent the ingress of hazardous substances, the release of stored energy, or the introduction of services during the work.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Safe system elements',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 59,
    question: 'What is the legal hierarchy of control measures for confined space work?',
    options: [
      'Issue a permit → provide breathing apparatus → notify the emergency services before entry',
      'Test the atmosphere → enter the space → carry out rescue if anyone is overcome',
      'Train the workers → buy the equipment → record the work in a logbook afterwards',
      'Avoid entry if reasonably practicable → if entry is unavoidable, follow a safe system of work → have emergency arrangements in place',
    ],
    correctAnswer: 3,
    explanation:
      'The CSR 1997 establishes a clear hierarchy: first, avoid entry to the confined space if the work can be done another way (Regulation 3); second, if entry is unavoidable, establish and follow a safe system of work (Regulation 4); third, have suitable and sufficient emergency and rescue arrangements in place before entry (Regulation 5).',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Hierarchy of control',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 60,
    question: 'Which other UK regulations may also apply when working in a confined space?',
    options: [
      'The Electricity at Work Regulations 1989, COSHH 2002, PUWER 1998, and the CDM Regulations 2015 may all be relevant depending on the work',
      'No other regulations apply, as the Confined Spaces Regulations 1997 fully cover all confined space work',
      'Only the Working Time Regulations 1998 and the National Minimum Wage Act 1998 apply',
      'Only the Data Protection Act 2018 and the Equality Act 2010 are relevant to the work',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple regulations can apply simultaneously. The Electricity at Work Regulations 1989 apply to electrical work within the space; COSHH 2002 applies to hazardous substances; PUWER 1998 applies to work equipment used; CDM 2015 applies on construction sites. The duty holder must comply with all applicable legislation.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Overlapping legislation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 61,
    question: 'What penalties can be imposed for breaching the Confined Spaces Regulations 1997?',
    options: [
      'A fixed penalty notice of £100 with no possibility of further action',
      'Unlimited fines and/or imprisonment for individuals; unlimited fines for organisations, with additional sentencing guidelines for fatalities',
      'A written warning only, as the regulations carry no criminal sanctions',
      'A maximum fine of £5,000 for organisations and no penalties for individuals',
    ],
    correctAnswer: 1,
    explanation:
      'Breaches of the Confined Spaces Regulations can result in prosecution under HASAWA 1974. For organisations, fines are unlimited. For individuals, penalties can include unlimited fines and/or imprisonment (up to 2 years for certain offences). Where fatalities occur, the Corporate Manslaughter and Corporate Homicide Act 2007 may also apply.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Penalties',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 62,
    question: 'What role does the HSE play in enforcing confined space regulations?',
    options: [
      'The HSE only publishes guidance and has no power to enter workplaces or take legal action',
      'The HSE is responsible for designing confined space rescue equipment to a national standard',
      'The HSE is the primary enforcing authority; its inspectors can issue improvement notices, prohibition notices, and prosecute offenders',
      'The HSE provides the breathing apparatus and rescue teams for all confined space entries',
    ],
    correctAnswer: 2,
    explanation:
      'The HSE (Health and Safety Executive) is the primary enforcing authority for the Confined Spaces Regulations 1997. HSE inspectors can visit workplaces, investigate incidents, issue improvement notices (requiring compliance within a set time), issue prohibition notices (stopping dangerous work immediately), and prosecute duty holders who breach the regulations.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'HSE enforcement',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 63,
    question: 'What is an improvement notice issued by the HSE?',
    options: [
      'A notice that immediately stops all work on a site until a fine has been paid',
      'A voluntary suggestion that a duty holder may choose to act on at their discretion',
      'A notice confirming that a workplace has passed an HSE inspection successfully',
      'A formal notice requiring a duty holder to remedy a contravention within a specified time period',
    ],
    correctAnswer: 3,
    explanation:
      'An improvement notice is served by an HSE inspector when they identify a contravention of health and safety legislation. It requires the duty holder to remedy the contravention within a specified time period (usually at least 21 days). Failure to comply with an improvement notice is a criminal offence.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Improvement notices',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 64,
    question: 'What is a prohibition notice?',
    options: [
      'A notice that immediately stops a dangerous work activity until the risk is adequately controlled',
      'A notice giving a duty holder a fixed period to correct a minor contravention',
      'A notice confirming that a confined space has been certified safe for entry',
      'A notice requiring a company to register its confined spaces with the HSE',
    ],
    correctAnswer: 0,
    explanation:
      'A prohibition notice directs that an activity shall not be carried on (or shall not be carried on unless certain conditions are met) because the inspector believes there is a risk of serious personal injury. It takes immediate effect if the risk is imminent. For confined space work, this might be used to stop entry where no safe system of work is in place.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Prohibition notices',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 65,
    question: 'When should a confined space risk assessment be reviewed?',
    options: [
      'Only once every five years, regardless of any changes to the work or the space',
      'Whenever there is a significant change in conditions, work activities, or personnel, or when the assessment is no longer valid',
      'Only after a fatality has occurred and the HSE has completed its investigation',
      'Never — once an assessment is completed it remains valid for the life of the space',
    ],
    correctAnswer: 1,
    explanation:
      'A confined space risk assessment must be reviewed whenever there are significant changes in the work activity, the conditions within or around the space, or the personnel involved. It should also be reviewed if there is reason to believe it is no longer valid, after incidents or near misses, and at regular intervals as good practice.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Review of assessments',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 66,
    question:
      "What is the role of a 'responsible person' or 'authorised person' in a permit-to-work system?",
    options: [
      'To physically enter the confined space first and check the conditions for the team',
      'To carry out the actual work inside the space while others remain on standby',
      'To assess the hazards, define the precautions, issue the permit, and ensure the safe system of work is followed',
      'To drive the casualty to hospital in the event of a confined space emergency',
    ],
    correctAnswer: 2,
    explanation:
      'The responsible/authorised person is a competent individual who assesses the hazards, defines the required precautions, issues the permit, monitors compliance, and ensures the safe system of work is followed throughout the entry. They must have the authority to stop work if conditions change and the knowledge to make informed safety decisions.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Authorised persons',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 67,
    question:
      'What should happen to a confined space permit to work at the end of the work period?',
    options: [
      'It should be left open in case the same space needs to be entered again the next day',
      'It should be destroyed immediately so it cannot be reused by anyone else',
      'It should be handed to the entrant to keep as a personal record of the work done',
      'It should be formally cancelled, with confirmation that all persons have exited, the space is secure, and it should be retained as a record',
    ],
    correctAnswer: 3,
    explanation:
      'At the end of the work period, the permit must be formally cancelled by the responsible person. This involves confirming all persons have exited the space, tools and equipment have been removed, the space has been made safe, and any isolations can be reinstated. The cancelled permit should be retained as a record for future reference.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Permit cancellation',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 68,
    question: 'Under RIDDOR, what confined space incidents must be reported to the HSE?',
    options: [
      'Deaths, specified injuries, dangerous occurrences (including loss of consciousness due to asphyxiation in a confined space), and work-related diseases',
      'Only incidents where property damage exceeds a set financial threshold',
      'Only incidents that occur during the hours of darkness or outside normal working hours',
      'Only incidents involving members of the public rather than employees',
    ],
    correctAnswer: 0,
    explanation:
      'Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), confined space incidents that must be reported include deaths, specified injuries, dangerous occurrences (such as loss of consciousness due to lack of oxygen in a confined space), and over-7-day incapacitations. Loss of consciousness in a confined space is specifically listed as a dangerous occurrence.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'RIDDOR reporting',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 69,
    question:
      'How does the Construction (Design and Management) Regulations 2015 relate to confined space work on construction sites?',
    options: [
      'CDM 2015 replaces the Confined Spaces Regulations 1997 on all construction sites',
      'CDM 2015 requires designers to eliminate or reduce risks (including confined space risks) at the design stage, and principal contractors to plan and manage confined space work',
      'CDM 2015 applies only to confined space work carried out on completed buildings, not during construction',
      'CDM 2015 has no relevance to confined space work and applies only to working at height',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 complements the CSR 1997 on construction sites. Designers have a duty to eliminate hazards (including confined space entry where possible) at the design stage. Principal contractors must plan, manage, and coordinate confined space work. The pre-construction information and construction phase plan should address confined space risks.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'CDM integration',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 70,
    question: "What is a 'dynamic risk assessment' in the context of confined spaces?",
    options: [
      'A risk assessment that is completed only once and never reviewed again',
      'A risk assessment carried out by a computer rather than a competent person',
      'An ongoing, real-time assessment of changing conditions within and around the confined space during the work activity',
      'A risk assessment that covers only the most dynamic or fast-moving hazards in the space',
    ],
    correctAnswer: 2,
    explanation:
      'A dynamic risk assessment is the continuous process of monitoring and re-evaluating risks as conditions change during the work. In confined spaces, conditions can change rapidly — gas levels may fluctuate, weather may affect ventilation, or new hazards may emerge. Workers must be trained to recognise changing conditions and respond appropriately, including stopping work and evacuating if necessary.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Dynamic assessment',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 71,
    question: "What does the term 'isolation' mean in a confined space safe system of work?",
    options: [
      'Keeping the confined space physically separate from other work areas on the site',
      'Ensuring only one worker enters the confined space at any one time',
      'Sealing the space so that no fresh air can enter during the work',
      'Physically disconnecting, blanking, or locking off all pipelines, services, and energy sources that could introduce hazards into the confined space',
    ],
    correctAnswer: 3,
    explanation:
      'Isolation in confined space work means physically disconnecting, blanking off, or locking out all pipelines (liquid, gas, or solid), electrical supplies, mechanical drives, and other energy sources that could introduce hazardous substances or energy into the space. Simple valve closure alone is not sufficient — positive isolation methods must be used.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Isolation procedures',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 72,
    question: "Why is a 'lock-out/tag-out' (LOTO) procedure important for confined space work?",
    options: [
      'It prevents the inadvertent re-energisation of isolated systems, which could introduce hazardous substances, energy, or mechanical movement into the space',
      'It speeds up the work by allowing equipment to be restarted quickly when needed',
      'It records the names of everyone who has been trained to enter the confined space',
      'It provides a backup air supply to entrants if the primary ventilation fails',
    ],
    correctAnswer: 0,
    explanation:
      'Lock-out/tag-out (LOTO) prevents isolated systems from being inadvertently re-energised or reconnected while people are inside the confined space. Personal locks ensure that only the person who applied the lock can remove it. Tags provide visible warnings. Without LOTO, someone unaware of the confined space entry could re-start equipment or open valves, with potentially fatal consequences.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'LOTO procedures',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 73,
    question: 'What training must workers receive before entering a confined space?',
    options: [
      'A short verbal briefing on the day, with no formal training required beforehand',
      'Training appropriate to the level of risk, covering hazard awareness, use of equipment, safe working procedures, and emergency actions',
      'Only general manual handling training, as confined space work involves lifting equipment',
      'A first aid at work certificate is the only training legally required before entry',
    ],
    correctAnswer: 1,
    explanation:
      'Workers must receive training appropriate to the risks they will face. This should cover: recognition of confined space hazards; use of gas detection equipment; use of PPE and RPE; understanding the safe system of work and permit; communication procedures; and emergency and rescue procedures. Training must be refreshed regularly and supplemented with site-specific briefings.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Training requirements',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 74,
    question:
      "What is the legal significance of an employer's failure to carry out a risk assessment before confined space entry?",
    options: [
      'It is acceptable provided the work is completed quickly and no one is injured',
      'It is a civil matter only and cannot result in any criminal proceedings',
      'It constitutes a breach of both the Management Regulations 1999 and the Confined Spaces Regulations 1997, potentially leading to prosecution',
      'It is permitted for low-risk entries where the workers are experienced',
    ],
    correctAnswer: 2,
    explanation:
      'Failure to carry out a risk assessment before confined space entry breaches Regulation 3 of the Management of Health and Safety at Work Regulations 1999 (general risk assessment duty) and the duty under the CSR 1997 to determine whether the work can be done without entry. This double breach can lead to prosecution, fines, and imprisonment.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Legal consequences',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 75,
    question:
      'How should the risk assessment address the risk of multiple persons being affected in a confined space incident?',
    options: [
      "The assessment only needs to consider the single worker most likely to be injured first",
      "The assessment can disregard rescuers, as they are always assumed to be fully protected",
      "The assessment should maximise the number of entrants so help is always close at hand",
      "The assessment must consider the 'cascade effect' where a hazardous atmosphere can overcome multiple people, and must limit the number of entrants and ensure rescue can handle multiple casualties",
    ],
    correctAnswer: 3,
    explanation:
      "The risk assessment must address the 'cascade effect' — if one person is overcome, others rushing to help without proper precautions may also be overcome. Historically, many confined space fatalities involve would-be rescuers. The assessment should limit entrants to the minimum necessary and ensure rescue arrangements can handle multiple casualties.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Cascade effect',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 76,
    question: "What is the purpose of a 'method statement' for confined space work?",
    options: [
      'It is a detailed document describing the step-by-step procedure for carrying out the work safely, including all required precautions',
      'It is a list of the hazards present in the space with no detail on how the work is carried out',
      'It is a certificate confirming the atmosphere was tested and found safe at the time of entry',
      'It is the formal notice that authorises named individuals to enter the confined space',
    ],
    correctAnswer: 0,
    explanation:
      'A method statement (also called a safe method of work or SSOW) is a detailed document that describes, step by step, how the work will be carried out safely. For confined spaces, it should include the sequence of operations, precautions at each stage, equipment to be used, responsibilities, and what to do if conditions change.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Method statements',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 77,
    question: "Under the CSR 1997, what is meant by 'so far as is reasonably practicable'?",
    options: [
      'That the duty holder must take every conceivable measure regardless of cost or difficulty',
      'That the duty holder must balance the risk against the time, trouble, cost, and difficulty of taking measures to avoid it — unless the risk is grossly disproportionate to the cost',
      'That the duty holder only needs to act on risks that have already caused an injury',
      'That the duty holder may choose whichever control is cheapest, irrespective of the risk',
    ],
    correctAnswer: 1,
    explanation:
      "'So far as is reasonably practicable' means that the duty holder must weigh the risk against the sacrifice (time, trouble, cost, difficulty) needed to avert it. If the risk is significant, substantial measures are required. The test is whether a reasonable person would judge it right to take the measures to reduce the risk. In practice, for the serious risks in confined spaces, avoidance and extensive precautions are almost always deemed practicable.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Reasonably practicable',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 78,
    question: 'What documentation should be kept following confined space work?',
    options: [
      'Only the timesheets recording how many hours each worker spent on the job',
      'Only a photograph of the completed work taken at the end of the entry',
      'Risk assessments, permits to work, gas test records, training records, and any incident reports should be retained',
      'No documentation needs to be kept once the work has been completed safely',
    ],
    correctAnswer: 2,
    explanation:
      'Comprehensive documentation should be retained following confined space work, including: the risk assessment, the permit to work (issued and cancelled), atmospheric monitoring records, training and competence records of those involved, any incident or near-miss reports, and equipment inspection certificates. These records support legal compliance, learning, and future risk assessments.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Record keeping',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 79,
    question:
      'How does the Provision and Use of Work Equipment Regulations 1998 (PUWER) apply to confined space work?',
    options: [
      'PUWER applies only to fixed machinery and does not cover portable confined space equipment',
      'PUWER requires that every piece of equipment used be brand new for each confined space entry',
      'PUWER applies only to equipment used on construction sites, not in other workplaces',
      'PUWER requires that all equipment used in confined spaces (including gas detectors, ventilation fans, breathing apparatus, and communication systems) is suitable, maintained, and used by trained persons',
    ],
    correctAnswer: 3,
    explanation:
      'PUWER applies to all work equipment used in confined spaces. This includes gas detection instruments, ventilation equipment, breathing apparatus, harnesses, winches, lighting, power tools, and communication systems. All such equipment must be suitable for the task, properly maintained, inspected, and used only by persons who have received adequate training.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'PUWER application',
    category: 'Legislation & Risk Assessment',
  },
  {
    id: 80,
    question:
      'A principal contractor on a construction site receives a risk assessment from a subcontractor for confined space work. What should the principal contractor do?',
    options: [
      "Review the assessment for adequacy, ensure it aligns with the construction phase plan, verify the subcontractor's competence, and monitor compliance during the work",
      "File the assessment without reading it, as the subcontractor is solely responsible for its content",
      "Reject all subcontractor assessments and insist on writing every assessment in-house",
      "Forward the assessment directly to the HSE for approval before any work can begin",
    ],
    correctAnswer: 0,
    explanation:
      "Under CDM 2015 and the CSR 1997, the principal contractor must actively review the subcontractor's risk assessment to ensure it is suitable and sufficient, that it aligns with the overall construction phase plan, that the subcontractor is competent, and that the proposed safe system of work is adequate. The principal contractor should also monitor the work to ensure compliance.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Principal contractor duties',
    category: 'Legislation & Risk Assessment',
  },

  // =======================================================================
  // HAZARDS & ATMOSPHERIC MONITORING — 20 questions (id 81-100)
  // ~7 basic, ~9 intermediate, ~4 advanced
  // (Remaining 20 questions for this category will be in Part 2)
  // =======================================================================
  {
    id: 81,
    question: 'What is the normal oxygen concentration in the atmosphere?',
    options: [
      '19.5%',
      '20.9%',
      '16%',
      '23.5%',
    ],
    correctAnswer: 1,
    explanation:
      'Normal atmospheric oxygen concentration is approximately 20.9% by volume. In confined spaces, this can be reduced (oxygen depletion) by chemical reactions, biological processes, or displacement by other gases. Entry should not take place if oxygen levels fall below 19.5% without appropriate respiratory protective equipment.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Normal oxygen levels',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 82,
    question:
      'Below what oxygen concentration is a confined space atmosphere considered oxygen-deficient and dangerous?',
    options: ['Below 23%', 'Below 20.9%', 'Below 19.5%', 'Below 16%'],
    correctAnswer: 2,
    explanation:
      'An atmosphere is considered oxygen-deficient when the oxygen concentration falls below 19.5%. At this level, breathing becomes impaired and cognitive function is affected. Below 16%, there is a risk of loss of consciousness. Below 6%, death can occur within minutes. Continuous monitoring is essential in confined spaces to detect oxygen depletion.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Oxygen deficiency threshold',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 83,
    question: "What does 'LEL' stand for in atmospheric monitoring?",
    options: [
      'Lower Emission Limit',
      'Least Effective Limit',
      'Low Energy Level',
      'Lower Explosive Limit',
    ],
    correctAnswer: 3,
    explanation:
      'LEL stands for Lower Explosive Limit (also called the Lower Flammable Limit, LFL). It is the minimum concentration of a flammable gas or vapour in air that can ignite and sustain combustion. Below the LEL, the mixture is too lean to burn. In confined spaces, gas concentrations should be maintained well below 10% of the LEL for safe working.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'LEL definition',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 84,
    question: 'At what percentage of the LEL should a confined space be evacuated?',
    options: [
      '10% LEL',
      '25% LEL',
      '50% LEL',
      '5% LEL',
    ],
    correctAnswer: 0,
    explanation:
      'As a general rule, if flammable gas or vapour concentrations reach 10% of the LEL, the confined space should be evacuated and the source investigated. Some organisations set even more conservative alarm levels (e.g. 5% LEL for the first warning alarm). Working should not take place above 10% LEL without exceptional controls and justification.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'LEL action levels',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 85,
    question: 'What is hydrogen sulphide (H₂S) and why is it a significant confined space hazard?',
    options: [
      "An inert, non-toxic gas that is completely harmless and presents no hazard in confined spaces",
      "A toxic, flammable gas with a characteristic 'rotten eggs' smell at low concentrations, but it deadens the sense of smell at higher concentrations, making it extremely dangerous",
      "A heavier-than-air gas that is only hazardous because it can cause clothing to catch fire",
      "A colourless, odourless gas whose only danger is that it displaces oxygen without warning",
    ],
    correctAnswer: 1,
    explanation:
      "Hydrogen sulphide (H₂S) is a highly toxic, flammable gas commonly found in sewers, manholes, and anywhere organic matter decomposes. It has a distinctive 'rotten eggs' smell at low concentrations, but at around 100 ppm it paralyses the olfactory nerve, eliminating the ability to smell it — just as concentrations reach immediately dangerous levels. The UK Workplace Exposure Limit (WEL) is 5 ppm (8-hour TWA) and 10 ppm (15-minute STEL).",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Hydrogen sulphide',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 86,
    question: 'What is the Workplace Exposure Limit (WEL) for carbon monoxide (CO)?',
    options: [
      '5 ppm (8-hour TWA)',
      '100 ppm (8-hour TWA)',
      '20 ppm (8-hour TWA)',
      '500 ppm (8-hour TWA)',
    ],
    correctAnswer: 2,
    explanation:
      'The UK Workplace Exposure Limit for carbon monoxide is 20 ppm as an 8-hour Time-Weighted Average (TWA), with a 15-minute Short-Term Exposure Limit (STEL) of 100 ppm. Carbon monoxide is colourless and odourless, binding to haemoglobin 200-250 times more readily than oxygen, making it an extremely dangerous confined space hazard.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Carbon monoxide WEL',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 87,
    question:
      'What type of gas detector is most commonly used for pre-entry and continuous monitoring of confined spaces?',
    options: [
      'A single-gas oxygen-only detector worn on the lapel',
      'A colorimetric stain tube used for one-off spot checks',
      'A fixed wall-mounted smoke detector positioned at the entry point',
      'A multi-gas detector (typically measuring O₂, LEL, CO, and H₂S simultaneously)',
    ],
    correctAnswer: 3,
    explanation:
      'A 4-gas (or multi-gas) portable detector is the standard instrument for confined space atmospheric monitoring. It typically measures oxygen (O₂), flammable gases (as % LEL), carbon monoxide (CO), and hydrogen sulphide (H₂S) simultaneously. Some units have additional sensor slots for specific gases relevant to the work environment.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Gas detection equipment',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 88,
    question:
      'Why must atmospheric monitoring in a confined space be carried out at different levels (top, middle, and bottom)?',
    options: [
      'Because different gases have different densities — lighter gases rise to the top and heavier gases sink to the bottom, so a single-level reading may miss dangerous concentrations',
      'Because the detector needs to be moved around to allow its sensors to warm up properly',
      'Because taking more readings makes the permit appear more thorough to an inspector',
      'Because gases are always evenly distributed, so several readings simply confirm the same result',
    ],
    correctAnswer: 0,
    explanation:
      'Gases have different densities relative to air. Methane (lighter) rises and concentrates near the top. Carbon dioxide and hydrogen sulphide (heavier) sink and concentrate at the bottom. A single-level reading could indicate safe conditions while dangerous concentrations exist at another level. Testing at top, middle, and bottom ensures comprehensive coverage.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Multi-level monitoring',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 89,
    question: "What does 'purging' a confined space mean?",
    options: [
      'Draining all liquids and sludge from the bottom of the space before entry',
      'Flushing the space with clean air or an inert gas to remove hazardous atmospheres before entry',
      'Sealing the space completely to stop any further gas from entering it',
      'Heating the space to evaporate any residual moisture from the walls',
    ],
    correctAnswer: 1,
    explanation:
      'Purging means displacing the existing atmosphere within a confined space by introducing clean air (or sometimes an inert gas before subsequent air replacement). This is done using mechanical ventilation to remove hazardous gases, vapours, or fumes and establish a safe breathing atmosphere before entry. Continuous ventilation is often maintained during work.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Purging',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 90,
    question: 'What is the danger of oxygen enrichment in a confined space?',
    options: [
      'Extra oxygen makes breathing easier, so an enriched atmosphere is entirely beneficial',
      'Oxygen enrichment causes immediate asphyxiation by displacing nitrogen from the lungs',
      'Oxygen-enriched atmospheres (above 23.5%) greatly increase the risk of fire and explosion, as materials that would not normally burn in normal air can ignite readily',
      'Oxygen enrichment is only a concern because it interferes with the gas detector readings',
    ],
    correctAnswer: 2,
    explanation:
      'Oxygen-enriched atmospheres (above approximately 23.5%) are extremely dangerous because they dramatically increase the flammability of materials. Clothing, hair, and materials that would not normally burn in air can ignite readily and burn fiercely. Oxygen enrichment can occur from leaking oxygen lines, cylinders, or certain chemical reactions within the space.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Oxygen enrichment',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 91,
    question: "How often should a portable gas detector be 'bump tested'?",
    options: [
      "Once a year, at the same time as the full annual calibration",
      "Only when the detector has been dropped or visibly damaged",
      "Once at the point of purchase, after which no further checks are needed",
      "Before each day's use, or in accordance with the manufacturer's instructions",
    ],
    correctAnswer: 3,
    explanation:
      "A bump test (functional check) should be performed before each day's use. This involves briefly exposing the sensors to a known concentration of test gas to verify they respond correctly. This is separate from full calibration (which is typically done at manufacturer-specified intervals). A detector that fails a bump test must not be used until recalibrated.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Bump testing',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 92,
    question:
      "What is the difference between a 'bump test' and a 'calibration' for a gas detector?",
    options: [
      'A bump test verifies that the sensors respond to gas, while a calibration adjusts the sensor readings to match known reference concentrations',
      'A bump test recharges the battery, while a calibration cleans the sensor membranes',
      'A bump test is carried out by the user, while a calibration can only be done by the HSE',
      'A bump test and a calibration are simply two names for exactly the same procedure',
    ],
    correctAnswer: 0,
    explanation:
      'A bump test is a quick functional check that exposes the sensors to a known gas to confirm they respond and alarm correctly. It verifies the detector is working but does not adjust readings. A calibration is a more thorough process that adjusts the sensor readings to accurately match known reference gas concentrations, ensuring measurement accuracy.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Bump test vs calibration',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 93,
    question: 'What is the primary hazard of methane (CH₄) in a confined space?',
    options: [
      'It is a highly toxic gas that poisons the body even at very low concentrations',
      'It is a simple asphyxiant (displaces oxygen) and is highly flammable, creating an explosion risk when concentrations reach between 5% and 15% in air',
      'It is heavier than air and pools at the bottom of the space, causing drowning',
      'It corrodes metal surfaces, weakening the structure of the confined space',
    ],
    correctAnswer: 1,
    explanation:
      "Methane is a simple asphyxiant — it is not toxic in itself but displaces oxygen, leading to suffocation. Its primary hazard in a confined space is its flammability. Methane's flammable range is approximately 5% to 15% in air, meaning concentrations within this range can ignite explosively. It is lighter than air and tends to accumulate near the top of enclosed spaces.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Methane hazards',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 94,
    question: 'What physical hazards, other than atmospheric, can be present in a confined space?',
    options: [
      'Only the risk of breathing in toxic gases such as hydrogen sulphide and carbon monoxide',
      'Only the risk of an oxygen-deficient atmosphere caused by rusting and decomposition',
      'Flooding/drowning, engulfment, electrical hazards, mechanical hazards from moving parts, excessive heat or cold, noise, and radiation',
      'Only the risk of a flammable atmosphere igniting from a spark or naked flame',
    ],
    correctAnswer: 2,
    explanation:
      'Confined spaces present multiple physical hazards beyond atmospheric risks: flooding or drowning from water ingress; engulfment by free-flowing solids; electrical hazards from cables or equipment; mechanical hazards from agitators, conveyors, or other moving parts; excessive heat or cold; high noise levels amplified by the enclosed space; and potential radiation from stored materials.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Physical hazards',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 95,
    question: 'Why is carbon dioxide (CO₂) particularly dangerous in confined spaces?',
    options: [
      'It is lighter than air, so it rises and escapes quickly, posing no real danger at low level',
      'It is highly flammable and forms an explosive mixture at concentrations above 5% in air',
      'It is completely harmless and is only monitored to confirm that ventilation is working',
      'It is denser than air and accumulates at low levels, is an asphyxiant that displaces oxygen, and at higher concentrations acts as a direct toxin affecting the central nervous system',
    ],
    correctAnswer: 3,
    explanation:
      'Carbon dioxide is approximately 1.5 times denser than air, so it sinks and accumulates at the bottom of confined spaces. As an asphyxiant, it displaces oxygen. Additionally, CO₂ is directly toxic at higher concentrations — above 4% it affects the central nervous system, causing headaches and dizziness; above 10% it can cause unconsciousness within minutes and death. The WEL is 5,000 ppm (0.5%) 8-hour TWA.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Carbon dioxide hazards',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 96,
    question: 'What causes oxygen depletion in a confined space?',
    options: [
      'Rusting of steel surfaces, biological decomposition, displacement by other gases, combustion processes, and chemical reactions that consume oxygen',
      'Opening the access hatch and allowing fresh air to circulate through the space',
      'Running mechanical ventilation that draws clean air in from outside the space',
      'Lowering the temperature of the space below the surrounding ambient level',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple processes can deplete oxygen in a confined space: rusting (oxidation) of steel surfaces; biological decomposition of organic matter; displacement by other gases (nitrogen, carbon dioxide, argon); combustion processes (including hot work); chemical reactions between substances; and respiration by people or microorganisms. Some of these processes can reduce oxygen dangerously within hours or even minutes.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Oxygen depletion causes',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 97,
    question: 'What is a photoionisation detector (PID) used for in confined space monitoring?',
    options: [
      'To measure the oxygen concentration more accurately than an electrochemical cell',
      'To detect and measure a wide range of volatile organic compounds (VOCs) and other ionisable gases at very low concentrations',
      'To detect the presence of ionising radiation from stored radioactive sources',
      'To measure the noise level inside the space to confirm it is safe for hearing',
    ],
    correctAnswer: 1,
    explanation:
      'A PID uses ultraviolet light to ionise gas molecules and measure the resulting current, providing a reading of total volatile organic compound (VOC) concentration. PIDs can detect many gases at parts-per-billion levels, making them useful for identifying the presence of toxic organic vapours that standard 4-gas detectors may not measure. However, they do not identify specific gases.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'PID detectors',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 98,
    question:
      "What is 'cross-sensitivity' in gas detection and why does it matter in confined spaces?",
    options: [
      'It means the detector must be moved across the space to take readings at every point',
      'It means two detectors must be used together to cross-check each other for accuracy',
      'It means a sensor designed to detect one gas may also respond to other gases, potentially giving false readings — this must be understood when interpreting results in environments with multiple gases',
      'It means the sensor becomes less sensitive each time it is exposed to its target gas',
    ],
    correctAnswer: 2,
    explanation:
      "Cross-sensitivity occurs when a sensor responds to gases other than its target gas. For example, an H₂S sensor may also respond to SO₂, or a CO sensor may respond to hydrogen. In confined spaces where multiple gases may be present, cross-sensitivity can cause misleading readings — either false alarms or, more dangerously, suppressed readings. Operators must understand their detector's cross-sensitivity characteristics.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Cross-sensitivity',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 99,
    question:
      'When using mechanical ventilation in a confined space, what important factor must be considered regarding the air supply?',
    options: [
      'The fan must be powerful enough to raise the pressure in the space well above atmospheric',
      'The ducting must be coloured red so that it is clearly visible to other workers',
      'The fan must be switched off periodically to allow the atmosphere to settle before testing',
      'The fresh air intake must be positioned in an area free from contamination, away from exhausts, generators, or other sources of hazardous gases',
    ],
    correctAnswer: 3,
    explanation:
      'The position of the fresh air intake is critical. If it is located near vehicle exhausts, generator emissions, or other sources of contamination, it will draw hazardous gases into the confined space rather than supplying clean air. The intake must be positioned upwind and away from all potential sources of contamination. The volume and direction of airflow must also be sufficient to maintain safe atmospheric conditions throughout the space.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Ventilation air supply',
    category: 'Hazards & Atmospheric Monitoring',
  },
  {
    id: 100,
    question:
      'What is the purpose of continuous atmospheric monitoring during confined space work, as opposed to pre-entry testing alone?',
    options: [
      'Atmospheric conditions can change rapidly during work — continuous monitoring provides real-time warning of deteriorating conditions so workers can evacuate before reaching dangerous levels',
      'It is only needed to satisfy the paperwork requirements of the permit to work',
      'Pre-entry testing is unreliable, so continuous monitoring is used to replace it entirely',
      'It allows the gas detector to recalibrate itself automatically while the work proceeds',
    ],
    correctAnswer: 0,
    explanation:
      'Pre-entry testing only captures a snapshot of conditions at one moment. During work, conditions can change rapidly due to: disturbing sediment or residues, work activities generating fumes, changes in external conditions (e.g. tidal flows in sewers), or delayed release of trapped gases. Continuous monitoring with audible and visual alarms provides real-time warning, allowing workers to evacuate before conditions become immediately dangerous.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Continuous monitoring',
    category: 'Hazards & Atmospheric Monitoring',
  },

  // ===== Questions 101-200 (merged) =====
  // TEMPORARY FILE — Part 2 of Confined Spaces Awareness mock exam (IDs 101-200)
  // No imports/exports/array brackets — just comma-separated question objects

  // ─── HAZARDS & ATMOSPHERIC MONITORING (continued) — IDs 101-120 ───

  {
    id: 101,
    question:
      'What is the 15-minute Short-Term Exposure Limit (STEL) for carbon monoxide under EH40?',
    options: [
      '50 ppm',
      '100 ppm',
      '200 ppm',
      '300 ppm',
    ],
    correctAnswer: 1,
    explanation:
      'The 15-minute STEL for carbon monoxide is 100 ppm under EH40/2005 (following the 2020 amendment that adopted the EU indicative limit). The corresponding 8-hour TWA is 20 ppm. Both were reduced from the earlier values of 200 ppm STEL and 30 ppm TWA.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 102,
    question:
      'A multi-gas detector alarms for hydrogen sulphide at 5 ppm. What does this alarm level represent?',
    options: [
      'The STEL value',
      'The lower explosive limit',
      'The TWA alarm setpoint',
      'The IDLH threshold',
    ],
    correctAnswer: 2,
    explanation:
      'The TWA alarm setpoint for hydrogen sulphide on most multi-gas detectors is set at 5 ppm, which corresponds to the 8-hour TWA Workplace Exposure Limit under EH40. The STEL alarm is typically set at 10 ppm, and the IDLH value for H₂S is 100 ppm.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 103,
    question:
      'When performing atmospheric monitoring in a confined space, at what minimum number of levels should readings be taken?',
    options: [
      'Four levels — each corner of the space',
      'One level — at the breathing zone only',
      'Two levels — top and bottom',
      'Three levels — top, middle, and bottom',
    ],
    correctAnswer: 3,
    explanation:
      'Atmospheric monitoring should be taken at a minimum of three levels: top, middle, and bottom of the confined space. Different gases have different vapour densities — heavier-than-air gases (such as CO₂ and H₂S) will accumulate at the bottom, while lighter-than-air gases (such as methane) will rise to the top.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'basic',
  },
  {
    id: 104,
    question:
      'What vapour density characteristic makes methane particularly hazardous at the top of a confined space?',
    options: [
      'It is lighter than air with a vapour density of approximately 0.55',
      'It is heavier than air with a vapour density of approximately 1.5',
      'It has the same density as air and disperses evenly throughout the space',
      'It is only hazardous at floor level because it dissolves readily in standing water',
    ],
    correctAnswer: 0,
    explanation:
      'Methane has a vapour density of approximately 0.55 relative to air, making it significantly lighter than air. It will therefore accumulate at the top of a confined space, which is why atmospheric monitoring must include readings at the upper level of the space.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question:
      'A confined space contains an atmosphere with 19.0% oxygen. What action should be taken?',
    options: [
      'Entry is permitted but continuous monitoring is required',
      'Entry should not proceed without respiratory protective equipment',
      'The space must be purged with nitrogen before entry',
      'Entry may proceed with no additional precautions',
    ],
    correctAnswer: 1,
    explanation:
      'Normal atmospheric oxygen is 20.9%. An oxygen level of 19.0% is below the safe working minimum of 19.5% and indicates oxygen depletion. Entry should not proceed without appropriate respiratory protective equipment (RPE) such as breathing apparatus, or the space must be ventilated to restore safe oxygen levels before entry.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'basic',
  },
  {
    id: 106,
    question: "What does the term 'IDLH' stand for in the context of atmospheric hazards?",
    options: [
      'Indicated Danger Level for Humans',
      'Initial Detection of Lethal Hazards',
      'Immediately Dangerous to Life and Health',
      'Instantaneous Dosage of Lethal Hydrocarbons',
    ],
    correctAnswer: 2,
    explanation:
      "IDLH stands for 'Immediately Dangerous to Life and Health'. It represents the maximum airborne concentration of a substance from which a person could escape within 30 minutes without experiencing any escape-impairing symptoms or irreversible health effects. At or above IDLH concentrations, only self-contained breathing apparatus (SCBA) should be used.",
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'basic',
  },
  {
    id: 107,
    question:
      'Which gas detection technology uses an electrochemical cell to measure toxic gas concentrations?',
    options: [
      'Catalytic bead sensor',
      'Infrared absorption sensor',
      'Photoionisation detector',
      'Electrochemical sensor',
    ],
    correctAnswer: 3,
    explanation:
      'Electrochemical sensors use a chemical reaction between the target gas and an electrolyte within the sensor cell to generate a measurable electrical current proportional to the gas concentration. They are the standard technology for detecting toxic gases such as CO, H₂S, SO₂, and NO₂ in multi-gas detectors.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 108,
    question:
      'A catalytic bead (pellistor) sensor in a multi-gas detector will NOT provide reliable LEL readings when oxygen levels fall below which approximate percentage?',
    options: [
      '16%',
      '20.9%',
      '10%',
      '19.5%',
    ],
    correctAnswer: 0,
    explanation:
      'Catalytic bead (pellistor) sensors rely on the combustion of flammable gases on a heated catalyst to produce a reading. When oxygen concentrations fall below approximately 16%, there is insufficient oxygen to support this catalytic combustion, and the sensor will give unreliable or falsely low LEL readings. This is a critical limitation that must be understood by those monitoring confined spaces.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'advanced',
  },
  {
    id: 109,
    question:
      'What is the primary purpose of bump testing a gas detector before use in a confined space?',
    options: [
      'To fully calibrate the instrument to traceable gas standards',
      'To verify the sensors respond to a known concentration of test gas',
      'To charge the battery to full capacity',
      'To reset the alarm setpoints to factory defaults',
    ],
    correctAnswer: 1,
    explanation:
      "A bump test (also known as a functional test) verifies that the sensors respond to a known concentration of test gas and that the alarms activate correctly. It is not the same as a full calibration but is a quick confidence check that the detector is functioning properly. Bump testing should be carried out before each day's use as per manufacturer guidance.",
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'basic',
  },
  {
    id: 110,
    question:
      'Which of the following biological hazards might be encountered in a sewer or drainage confined space?',
    options: [
      "Carbon monoxide poisoning from exhaust fumes",
      "Silicosis from inhaling fine mineral dust",
      "Leptospirosis (Weil's disease)",
      "Hearing damage from prolonged exposure to noise",
    ],
    correctAnswer: 2,
    explanation:
      "Leptospirosis (Weil's disease) is a bacterial infection carried in rat urine that is a significant biological hazard in sewers, drains, and waterways. Workers entering such confined spaces must be aware of this risk. Cuts and abrasions must be covered, and appropriate PPE including gloves and eye protection must be worn. Workers should also be informed of the symptoms and the need for early medical attention.",
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question:
      'An oxygen-enriched atmosphere exists when the oxygen level exceeds which percentage?',
    options: [
      '20.9%',
      '21.5%',
      '23%',
      '23.5%',
    ],
    correctAnswer: 3,
    explanation:
      'An oxygen-enriched atmosphere is generally defined as one where the oxygen concentration exceeds 23.5%. In an oxygen-enriched atmosphere, materials that would not normally burn in a normal atmosphere may ignite readily, clothing can catch fire easily, and fires burn more intensely. This can occur from leaking oxygen cylinders, oxygen hoses, or certain chemical reactions.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question:
      'What is the primary purpose of a photoionisation detector (PID) in confined space atmospheric monitoring?',
    options: [
      'To detect and measure volatile organic compounds (VOCs)',
      'To measure oxygen concentration precisely',
      'To measure carbon dioxide levels',
      'To detect radioactive contamination',
    ],
    correctAnswer: 0,
    explanation:
      'A photoionisation detector (PID) uses ultraviolet light to ionise gas molecules and is primarily used to detect and measure volatile organic compounds (VOCs) at very low concentrations (parts per billion to parts per million). PIDs are particularly useful in confined spaces where solvent vapours, fuel vapours, or other organic compounds may be present.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question:
      'Which physical hazard is most commonly associated with engulfment in a confined space?',
    options: [
      'Electric shock from contact with live cables inside the space',
      'Drowning or suffocation in free-flowing solid materials such as grain or sand',
      'Burns from contact with hot surfaces such as steam pipes',
      'Falls from height when climbing internal ladders or platforms',
    ],
    correctAnswer: 1,
    explanation:
      'Engulfment occurs when a person is surrounded and trapped by a free-flowing solid material such as grain, sand, coal dust, or sewage sludge. This can lead to suffocation as the material compresses the chest and prevents breathing. Engulfment is particularly hazardous in silos, hoppers, and storage vessels, and can occur extremely rapidly with little or no warning.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'basic',
  },
  {
    id: 114,
    question:
      'What is the Workplace Exposure Limit (WEL) for hydrogen sulphide as a 15-minute STEL under EH40?',
    options: [
      '5 ppm',
      '15 ppm',
      '10 ppm',
      '20 ppm',
    ],
    correctAnswer: 2,
    explanation:
      "The 15-minute Short-Term Exposure Limit (STEL) for hydrogen sulphide under EH40/2005 is 10 ppm. The 8-hour TWA is 5 ppm. H₂S is particularly dangerous because at concentrations above approximately 100 ppm it causes olfactory fatigue, meaning the characteristic 'rotten eggs' smell can no longer be detected, giving a false sense of safety.",
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question:
      'Which of the following processes could cause oxygen depletion inside a confined space?',
    options: [
      'Operating a battery-powered hand torch inside the space',
      'Supplying mechanical ventilation drawn from clean outside air',
      'Opening a second access hatch to improve cross-ventilation',
      'Running a petrol-powered generator inside the space',
    ],
    correctAnswer: 3,
    explanation:
      'Running a petrol-powered (or any internal combustion) engine inside a confined space will rapidly consume oxygen through combustion and produce carbon monoxide and carbon dioxide. Internal combustion engines must never be operated inside or near the entrance to a confined space. Other oxygen-depleting processes include rusting of metal surfaces, bacterial action, and displacement by other gases.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'basic',
  },
  {
    id: 116,
    question:
      'At what percentage of the Lower Explosive Limit (LEL) should a multi-gas detector typically trigger its first (low) alarm for flammable gases?',
    options: [
      '10% LEL',
      '5% LEL',
      '20% LEL',
      '50% LEL',
    ],
    correctAnswer: 0,
    explanation:
      'Most multi-gas detectors are configured with a low alarm at 10% LEL (representing 10% of the way to the Lower Explosive Limit) and a high alarm at 20% LEL. These conservative setpoints provide an early warning well before the atmosphere reaches a concentration that could support combustion, allowing time for evacuation and remedial action.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'What hazard does nitrogen gas pose when used to purge a confined space?',
    options: [
      'It is flammable and may cause an explosion',
      'It displaces oxygen and can cause rapid asphyxiation without warning',
      'It is toxic and causes chemical burns to the lungs',
      'It reacts with moisture to form a corrosive acid',
    ],
    correctAnswer: 1,
    explanation:
      'Nitrogen is an odourless, colourless, non-toxic gas, but it displaces oxygen. In a confined space purged with nitrogen, the oxygen level can drop to near zero. A person entering such a space can lose consciousness within seconds and die within minutes. Because nitrogen gives no warning signs (no smell, no irritation), it is an extremely dangerous asphyxiant. Thorough ventilation and atmospheric testing must be completed before entry after nitrogen purging.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question:
      'Which set of readings from a 4-gas monitor would indicate it is safe to enter a confined space without respiratory protective equipment?',
    options: [
      'O₂ at 20.9%, LEL at 15%, CO at 0 ppm, H₂S at 0 ppm',
      'O₂ at 18.5%, LEL at 0%, CO at 0 ppm, H₂S at 0 ppm',
      'O₂ at 20.8%, LEL at 0%, CO at 0 ppm, H₂S at 0 ppm',
      'O₂ at 23.8%, LEL at 0%, CO at 0 ppm, H₂S at 0 ppm',
    ],
    correctAnswer: 2,
    explanation:
      'Safe entry without RPE requires all readings within limits: the reading of O₂ at 20.8% (within the safe range of 19.5% to 23.5%), LEL at 0% (no flammable gases), CO at 0 ppm (below the WEL of 20 ppm), and H₂S at 0 ppm (below the WEL of 5 ppm) is the only safe set. The other readings show, respectively, an elevated LEL, oxygen depletion below 19.5%, and an oxygen-enriched atmosphere above 23.5%.',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'basic',
  },
  {
    id: 119,
    question:
      "What is 'olfactory fatigue' and why is it particularly dangerous in relation to hydrogen sulphide?",
    options: [
      'The build-up of fluid in the lungs that develops several hours after gas exposure',
      'The tiredness and muscle weakness caused by working in a hot confined space',
      'The failure of a gas sensor to respond after prolonged exposure to high concentrations',
      'The progressive loss of the ability to smell a gas after prolonged or high-concentration exposure',
    ],
    correctAnswer: 3,
    explanation:
      "Olfactory fatigue is the progressive desensitisation of the sense of smell after exposure to a gas. It is especially dangerous with hydrogen sulphide because H₂S has a strong 'rotten eggs' odour at low concentrations (0.1-1 ppm), but at concentrations above approximately 100 ppm, it paralyses the olfactory nerve, making the gas undetectable by smell. This gives a false sense that the gas has dissipated when in fact concentrations may have increased to lethal levels.",
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'advanced',
  },
  {
    id: 120,
    question:
      'A confined space entry is planned in a tank that previously contained toluene. Which additional monitoring instrument should be considered beyond a standard 4-gas detector?',
    options: [
      'A photoionisation detector (PID)',
      'A thermal imaging camera',
      'A sound level meter',
      'A Geiger-Muller counter',
    ],
    correctAnswer: 0,
    explanation:
      'Toluene is a volatile organic compound (VOC) that a standard 4-gas detector (O₂, LEL, CO, H₂S) may not specifically identify or accurately measure at low concentrations. A photoionisation detector (PID) should be used as it can detect and measure VOCs including toluene at parts-per-billion levels, providing a more accurate assessment of the residual solvent vapour hazard. The WEL for toluene is 50 ppm (8-hour TWA).',
    category: 'Hazards & Atmospheric Monitoring',
    difficulty: 'advanced',
  },

  // ─── SAFE ENTRY & WORKING PROCEDURES — IDs 121-160 ───

  {
    id: 121,
    question:
      'Under the Confined Spaces Regulations 1997, what must an employer do BEFORE considering entry into a confined space?',
    options: [
      'Provide breathing apparatus to all workers',
      'Avoid entry to the confined space so far as is reasonably practicable',
      'Ensure at least three rescue personnel are on standby',
      'Notify the HSE of the planned entry 48 hours in advance',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 4(1) of the Confined Spaces Regulations 1997 requires that no person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry. The hierarchy is: first avoid entry, then if entry is unavoidable, establish a safe system of work and have emergency arrangements in place.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 122,
    question: 'What is the primary purpose of a confined space entry permit?',
    options: [
      'To record the names of workers for payroll and timekeeping purposes',
      'To transfer all legal liability for the work onto the individual entrant',
      'To provide a formal check that all elements of a safe system of work are in place before entry',
      'To replace the need for a separate risk assessment of the confined space',
    ],
    correctAnswer: 2,
    explanation:
      'A confined space entry permit (permit to work) is a formal documented procedure that ensures all elements of the safe system of work have been addressed before entry is authorised. It covers hazard identification, atmospheric testing results, isolation and lock-off confirmation, PPE/RPE requirements, emergency arrangements, communication methods, and time limitations. It does not replace a risk assessment — it works alongside one.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 123,
    question:
      "Who is the 'competent person' responsible for issuing a confined space entry permit?",
    options: [
      'Whoever happens to be the most senior person present on the site that day',
      'Any worker who has been issued with the correct personal protective equipment',
      'An external HSE inspector who must attend to authorise each individual entry',
      'A person with sufficient training, knowledge, and experience to understand the hazards and necessary precautions',
    ],
    correctAnswer: 3,
    explanation:
      'A competent person for issuing a confined space entry permit must have sufficient training, knowledge, and experience to understand the specific hazards of the confined space, the precautions needed, and the emergency arrangements required. Competence is not determined solely by seniority or job title but by demonstrable knowledge and understanding of confined space working.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 124,
    question: 'What does LOTO stand for in the context of confined space isolation procedures?',
    options: [
      'Lock Out, Tag Out',
      'Log Off, Turn Off',
      'Look Out, Take Over',
      'Lift Out, Twist Off',
    ],
    correctAnswer: 0,
    explanation:
      'LOTO stands for Lock Out, Tag Out. It is an isolation procedure used to ensure that energy sources (electrical, mechanical, hydraulic, pneumatic, chemical, thermal) feeding into a confined space are physically locked in the off/safe position and tagged with information identifying who applied the lock and why. This prevents accidental energisation while workers are inside the space.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 125,
    question:
      'When isolating a pipeline feeding into a confined space, which method provides the most positive form of isolation?',
    options: [
      'Closing a single isolation valve on the pipeline',
      'Physically disconnecting the pipe or inserting a spectacle blind (spade)',
      'Hanging a warning sign on the pipeline near the confined space',
      'Reducing the flow rate through the pipeline to a minimum',
    ],
    correctAnswer: 1,
    explanation:
      'Physical disconnection or the insertion of a spectacle blind (spade plate) provides the most positive form of pipeline isolation because it creates a physical barrier that cannot be defeated by a valve leaking or being accidentally opened. Simply closing a valve — even with LOTO applied — does not guarantee zero leakage. Spectacle blinds are rated to the pipeline pressure and provide a visible confirmation of isolation.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 126,
    question: "What is the purpose of a 'top person' (attendant) during a confined space entry?",
    options: [
      'To enter the space first and confirm it is safe before the others follow',
      'To carry out the manual work inside the space alongside the entrants',
      'To remain at the entry point, maintain communication with entrants, and initiate emergency procedures if needed',
      'To drive to the nearest hospital and wait there in case of an emergency',
    ],
    correctAnswer: 2,
    explanation:
      'The top person (also called the attendant or standby person) must remain at or near the entry point at all times during the confined space entry. Their duties include maintaining continuous communication with entrants, monitoring conditions, controlling entry and exit, keeping a log of who is in the space, and initiating the emergency rescue plan if an incident occurs. They must never enter the confined space.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 127,
    question:
      'How often should atmospheric monitoring typically continue once workers have entered a confined space?',
    options: [
      'Once at the start of the entry and again only at the very end of the work',
      'Every hour, on the hour, regardless of the activity being carried out',
      'Only if a worker reports feeling unwell or notices an unusual smell',
      'Continuously throughout the duration of the work',
    ],
    correctAnswer: 3,
    explanation:
      'Atmospheric monitoring should be continuous throughout the duration of work in a confined space. Conditions can change rapidly due to the work being carried out, chemical reactions, temperature changes, or ingress of contaminants. Continuous monitoring with audible and visual alarms provides immediate warning if the atmosphere deteriorates, allowing prompt evacuation.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 128,
    question:
      'What is the recommended minimum pre-entry ventilation period for a confined space before taking atmospheric readings?',
    options: [
      'There is no set minimum — readings should be taken to confirm the atmosphere is safe',
      'A fixed 5 minutes, which is always sufficient for any size of confined space',
      'Exactly 30 minutes, as specified in the Confined Spaces Regulations 1997',
      'A minimum of 24 hours before any atmospheric testing can begin',
    ],
    correctAnswer: 0,
    explanation:
      'There is no universal fixed minimum ventilation period. The ventilation time required depends on the size of the space, the nature and concentration of contaminants, the ventilation rate, and the number of air changes achieved. The key requirement is that atmospheric monitoring must confirm the atmosphere is within safe parameters before entry is permitted. Ventilation should continue and readings should be taken until consistently safe results are achieved.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 129,
    question:
      'When using mechanical ventilation in a confined space, where should the fresh air intake be positioned?',
    options: [
      'As close as possible to the generator powering the ventilation fan',
      'In an area of clean, uncontaminated air, away from exhaust fumes and other contaminant sources',
      'Directly above the vehicle exhausts so the warm air rises into the space',
      'Inside the confined space itself to recirculate the existing atmosphere',
    ],
    correctAnswer: 1,
    explanation:
      'The fresh air intake for mechanical ventilation must be positioned in an area of clean, uncontaminated air, well away from vehicle exhausts, generator fumes, process emissions, or any other source of contamination. If contaminated air is drawn in by the ventilation system, it will introduce hazardous substances into the confined space rather than providing safe fresh air.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 130,
    question:
      'Which type of respiratory protective equipment provides the highest level of protection for confined space entry into an IDLH atmosphere?',
    options: [
      'A half-face filtering facepiece (FFP3)',
      'A full-face powered air-purifying respirator (PAPR)',
      'Self-contained breathing apparatus (SCBA) in positive pressure mode',
      'A half-face respirator with organic vapour cartridges',
    ],
    correctAnswer: 2,
    explanation:
      'Self-contained breathing apparatus (SCBA) operated in positive pressure (demand) mode provides the highest level of respiratory protection. It supplies clean breathing air from a cylinder carried by the wearer and maintains positive pressure inside the facepiece to prevent inward leakage. In IDLH atmospheres, only SCBA or airline BA with escape cylinder should be used — filtering respirators cannot be used as they rely on the ambient atmosphere.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 131,
    question:
      "What is a 'safe atmosphere' in the context of confined space entry as typically defined?",
    options: [
      'An atmosphere that has no detectable smell when the entry hatch is first opened',
      'An atmosphere with oxygen above 16% and any flammable gas below 50% LEL',
      'Any atmosphere in which a worker can breathe without immediately feeling unwell',
      'O₂ between 19.5% and 23.5%, flammable gases below 10% LEL, toxic gases below their respective WELs',
    ],
    correctAnswer: 3,
    explanation:
      'A safe atmosphere for confined space entry is generally defined as: oxygen between 19.5% and 23.5%, flammable gases below 10% of their LEL (some standards permit up to 10% LEL for entry with continuous monitoring), and all toxic gases below their respective Workplace Exposure Limits. Relying on smell alone is never acceptable as many hazardous gases are odourless or cause olfactory fatigue.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question:
      'Before entering a confined space, what must be done with all mechanical equipment (such as agitators and mixers) inside the space?',
    options: [
      'They must be isolated, locked out, tagged out, and proved dead',
      'They only need to be switched off at the local control panel',
      'They should be put into standby mode',
      'They should be left running at low speed',
    ],
    correctAnswer: 0,
    explanation:
      'All mechanical equipment inside or connected to the confined space must be fully isolated from its energy source, locked out and tagged out (LOTO), and proved dead (tested to confirm zero energy) before entry. Simply switching off at a control panel is insufficient as equipment could be accidentally re-energised. Proving dead typically involves attempting to start the equipment after isolation to confirm it cannot operate.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question: 'What information must be displayed on a LOTO tag?',
    options: [
      'The manufacturer and serial number of the equipment being isolated',
      'The name of the person who applied the lock, the date, the reason for isolation, and contact details',
      'The atmospheric test results recorded at the time the lock was fitted',
      'A list of all the tools that will be used during the confined space work',
    ],
    correctAnswer: 1,
    explanation:
      "A LOTO tag must clearly display: the name of the person who applied the lock, the date and time of application, the reason for the isolation (e.g., 'confined space entry in progress'), and contact details. Each person working in or on the equipment should apply their own personal lock. Tags must never be removed by anyone other than the person who applied them, except through a formal management override procedure.",
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 134,
    question:
      "What is the purpose of a 'try test' (proving dead test) after applying LOTO isolation?",
    options: [
      'To check if the equipment still works despite the isolation',
      'To test the LOTO lock for structural integrity',
      'To confirm that the isolation is effective and no residual energy remains',
      'To calibrate the equipment ready for return to service',
    ],
    correctAnswer: 2,
    explanation:
      'A try test (proving dead test) is carried out after isolation and LOTO to confirm that the isolation is effective. This involves attempting to start or energise the equipment using normal controls to verify it cannot operate, and testing for residual energy (electrical, hydraulic, pneumatic, stored mechanical energy). Only once the try test confirms zero energy can the space be considered safe from that energy source.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question: 'When is hot work inside a confined space permitted?',
    options: [
      'At any time, provided the worker wears flame-retardant overalls',
      'Only during daylight hours when the space can be naturally lit',
      'Whenever the entry permit is in date, with no additional controls needed',
      'Only when a specific hot work permit has been issued in addition to the confined space entry permit, and the atmosphere has been confirmed as safe',
    ],
    correctAnswer: 3,
    explanation:
      'Hot work (welding, cutting, grinding, brazing) inside a confined space requires a specific hot work permit in addition to the confined space entry permit. The atmosphere must be confirmed free of flammable gases and vapours (below 1% LEL for hot work), continuous atmospheric monitoring must be maintained, fire-fighting equipment must be immediately available, and a fire watch must be maintained during and for a period after the hot work.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 136,
    question:
      'What is the maximum recommended safe working voltage for portable electrical equipment used inside a confined space with conductive surroundings?',
    options: [
      '25V from a suitable transformer or extra-low voltage (ELV) equipment',
      '110V from a centre-tapped reduced low voltage transformer',
      '230V provided a 30 mA RCD is fitted at the supply point',
      '400V three-phase supplied directly from the site distribution board',
    ],
    correctAnswer: 0,
    explanation:
      'In confined spaces with conductive surroundings (such as metal tanks, vessels, or pipework), BS 7671 and HSE guidance recommend that portable equipment should operate at extra-low voltage — no more than 25V AC (or 60V DC) supplied from a safety isolating transformer. The risk of electric shock is significantly increased in confined spaces due to restricted movement, damp conditions, and conductive surroundings reducing body resistance.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'advanced',
  },
  {
    id: 137,
    question:
      'What type of lighting is most appropriate for use inside a confined space where a flammable atmosphere may develop?',
    options: [
      'Standard mains-powered halogen floodlights on a tripod stand',
      'Intrinsically safe (Ex-rated) lighting equipment',
      'An ordinary battery torch held by the entrant',
      'A petrol-powered portable lighting generator placed inside the space',
    ],
    correctAnswer: 1,
    explanation:
      'In confined spaces where a flammable atmosphere may develop, all electrical equipment including lighting must be intrinsically safe (Ex-rated) or flameproof to the appropriate zone classification. Intrinsically safe equipment is designed so that any sparking or thermal effects are incapable of igniting a flammable atmosphere. Standard electrical equipment, even battery-powered torches, could provide a source of ignition.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: "What does a confined space entry permit's 'duration' or 'validity period' specify?",
    options: [
      'The length of time the worker has been trained to work in confined spaces',
      'The time taken for the emergency services to reach the site if called',
      'The maximum period during which the permit authorises entry, after which it must be reviewed and reissued',
      'The number of years the permit document must be retained as a record',
    ],
    correctAnswer: 2,
    explanation:
      'The duration or validity period on a confined space entry permit specifies the maximum time for which the permit authorises entry. This is typically limited to a single shift or a specific number of hours. If work extends beyond this period, the permit must be formally closed and a new one issued, with fresh atmospheric monitoring and a review of all conditions. This prevents complacency and ensures conditions are regularly re-evaluated.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 139,
    question:
      'A worker needs to enter a confined space to inspect a valve. No hazardous atmosphere is present, but the space has a vertical access point 3 metres deep. What fall protection is required?',
    options: [
      'A waist belt with a single attachment point at the front',
      'No fall protection is required because the atmosphere is safe',
      'A hard hat and high-visibility vest worn by the entrant',
      'A full-body harness with a short lanyard attached to a suitable anchor point',
    ],
    correctAnswer: 3,
    explanation:
      'A 3-metre vertical access into a confined space presents a significant fall hazard. A full-body harness with an appropriate lanyard attached to a suitable anchor point at the access point is required. The harness also serves a dual purpose — it can be used for rescue retrieval if the worker becomes incapacitated. A tripod and winch system at the access point would typically be used for both fall arrest and rescue capability.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question:
      "What is the role of a 'rescue team' as part of confined space emergency arrangements?",
    options: [
      'To be trained, equipped, and immediately available to effect rescue of any person who becomes incapacitated in the confined space',
      'To carry out the planned work inside the space so the entrants can rest',
      'To remain off site and attend only if the emergency services request assistance',
      'To issue the permit to work and authorise the entry before work begins',
    ],
    correctAnswer: 0,
    explanation:
      'Under Regulation 5 of the Confined Spaces Regulations 1997, suitable and sufficient emergency arrangements must be in place before any person enters a confined space. The rescue team must be trained in confined space rescue, equipped with appropriate rescue equipment (including breathing apparatus if needed), and immediately available to respond without delay. The team must have practised the rescue plan and be familiar with the specific space.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 141,
    question:
      'During a confined space entry, continuous ventilation is being provided by a fan and ducting. The fan fails. What should happen?',
    options: [
      'Only evacuate if someone smells something unusual',
      'All entrants must immediately evacuate the confined space',
      'Continue working — there was enough fresh air before the fan started',
      'Wait 15 minutes and then evacuate if the fan is not repaired',
    ],
    correctAnswer: 1,
    explanation:
      'If mechanical ventilation fails during a confined space entry, all entrants must immediately evacuate the space. Ventilation is a critical control measure — without it, oxygen levels can drop, and toxic or flammable gases can accumulate rapidly. Re-entry must not occur until the ventilation is restored and atmospheric monitoring has confirmed the atmosphere is safe again.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 142,
    question:
      'What is the maximum number of people a single top person (attendant) should normally be responsible for monitoring?',
    options: [
      'Exactly ten entrants per attendant, as fixed by the regulations',
      'An unlimited number, provided each entrant carries a personal gas detector',
      'No more than can be effectively monitored and communicated with at all times — typically one to three depending on conditions',
      'Only one entrant ever, as a top person can never watch more than one person',
    ],
    correctAnswer: 2,
    explanation:
      'There is no fixed number in the Regulations, but good practice dictates that a single top person should only be responsible for monitoring as many entrants as they can effectively communicate with and account for at all times — typically one to three, depending on the complexity of the space, the nature of the work, and visibility. If the top person cannot maintain effective oversight, additional attendants must be deployed.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question:
      'Which of the following communication methods is MOST reliable for maintaining contact between entrants and the top person in a noisy confined space?',
    options: [
      'Shouting loudly between the entrant and the top person',
      'Pre-agreed hand signals visible from the entry point',
      'Sending text messages on a standard mobile phone',
      'A hard-wired communication system or intrinsically safe radio',
    ],
    correctAnswer: 3,
    explanation:
      'A hard-wired (tethered) communication system or intrinsically safe two-way radio provides the most reliable communication in noisy confined spaces. Shouting may be ineffective due to noise and reverberations, hand signals require line of sight which may not be available, and mobile phones may not have signal in enclosed metal structures and may not be intrinsically safe for flammable atmospheres.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 144,
    question: 'What must be included in a confined space risk assessment?',
    options: [
      'All foreseeable hazards including atmospheric, physical, biological, and those introduced by the work activity, along with the control measures required',
      'Only the atmospheric hazards, as physical and biological hazards are covered separately',
      'Only a list of the workers who will be entering and the time of their entry',
      'Only the cost of the work and the equipment that will be hired to complete it',
    ],
    correctAnswer: 0,
    explanation:
      'A confined space risk assessment must identify all foreseeable hazards. This includes atmospheric hazards (toxic gases, oxygen depletion/enrichment, flammable atmospheres), physical hazards (engulfment, entrapment, falls, temperature extremes, noise), biological hazards (bacteria, viruses), and hazards introduced by the work itself (welding fumes, dust, electrical risks). For each hazard, appropriate control measures must be identified and implemented.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question:
      'What should happen to a confined space entry permit if the scope of work changes during the entry?',
    options: [
      'The change can be noted verbally and the work can continue under the existing permit',
      'The existing permit must be cancelled and a new permit issued to cover the revised scope of work',
      'The supervisor can amend the existing permit by hand without stopping the work',
      'The change can be recorded in the site diary and addressed at the end of the shift',
    ],
    correctAnswer: 1,
    explanation:
      'If the scope of work changes during a confined space entry, the existing permit must be cancelled and work stopped. A new risk assessment must be carried out for the revised scope, and a new permit must be issued covering the changed conditions. Changes in work activity may introduce new hazards (e.g., changing from inspection to hot work) that require different or additional control measures.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'When selecting PPE for confined space entry, which factor is LEAST relevant?',
    options: [
      'The identified atmospheric hazards',
      'The physical constraints and access dimensions of the space',
      'The colour preference of the worker',
      'The compatibility of different items of PPE when worn together',
    ],
    correctAnswer: 2,
    explanation:
      'PPE selection for confined space entry must be based on the identified hazards, the physical constraints of the space (some spaces are too small for SCBA), and the compatibility of different PPE items (e.g., a harness must be compatible with breathing apparatus, a hard hat must fit with a full-face mask). The colour preference of the worker has no bearing on the protective capability of the equipment.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 147,
    question:
      'What is the purpose of purging a confined space with an inert gas such as nitrogen before introducing air?',
    options: [
      'To raise the oxygen level so that workers can breathe more easily inside',
      'To cool the space down before workers enter to carry out hot work',
      'To pressurise the space so that no outside contaminants can enter it',
      'To displace flammable or toxic gases before ventilating with fresh air',
    ],
    correctAnswer: 3,
    explanation:
      'Purging with an inert gas such as nitrogen is used to displace flammable or toxic gases from a confined space to create a safe condition before introducing air. This is common in process vessels and pipework that have contained flammable substances. After nitrogen purging, the space must then be thoroughly ventilated with fresh air to restore a breathable atmosphere before entry, as the nitrogen itself creates an IDLH oxygen-deficient environment.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'advanced',
  },
  {
    id: 148,
    question:
      'A confined space entry involves working on live 230V electrical equipment inside a vessel. What voltage reduction measures are required?',
    options: [
      'The equipment must be made dead and isolated wherever possible; if live work is unavoidable, a specific risk assessment and method statement for live working must be produced',
      'Live work at 230V is acceptable in a confined space provided rubber gloves are worn',
      'No voltage reduction is needed because the equipment is already at standard mains voltage',
      'The supply voltage must be increased to overcome the resistance of the conductive surroundings',
    ],
    correctAnswer: 0,
    explanation:
      'Working on live electrical equipment inside a confined space is extremely hazardous due to the increased risk of electric shock from conductive surroundings, damp conditions, and restricted movement. The equipment must be made dead and isolated wherever possible. If live work is genuinely unavoidable, a specific risk assessment, method statement, and live working permit must be produced in compliance with the Electricity at Work Regulations 1989, Regulation 14.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'advanced',
  },
  {
    id: 149,
    question:
      "What is the function of a 'gas-free certificate' in relation to confined space entry?",
    options: [
      'A certificate confirming the space will remain gas-free for the entire duration of the work',
      'A formal document confirming that atmospheric testing has shown the space to be free from hazardous gases at the time of testing',
      'A licence permitting the use of gas-powered equipment inside the confined space',
      'A record of the gas detector calibration dates for the instruments used on site',
    ],
    correctAnswer: 1,
    explanation:
      'A gas-free certificate is a formal document issued by a competent person confirming that atmospheric testing has been carried out and the space was found to be free from hazardous gases and had adequate oxygen at the time of testing. It is commonly used in marine, petrochemical, and process industries. It is important to note that this certificate is valid only at the time of testing — conditions can change, so continuous monitoring during entry remains essential.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question:
      'Which BS EN standard covers the requirements for full-body harnesses used in confined space work?',
    options: [
      'BS EN 166 — Personal eye protection',
      'BS EN 60903 — Electrical insulating gloves',
      'BS EN 361 — Full body harnesses',
      'BS EN 397 — Industrial safety helmets',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 361 specifies the requirements for full-body harnesses used in fall arrest systems and for confined space rescue. A full-body harness for confined space rescue should have a front or rear attachment point (D-ring) suitable for connection to a rescue retrieval system. The harness must be inspected before each use and formally examined at intervals not exceeding 6 months by a competent person.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question:
      'What precautions must be taken when using airline breathing apparatus (ALBA) in a confined space?',
    options: [
      'The airline can be supplied from any nearby compressed air outlet without filtration',
      'No escape cylinder is needed because the airline provides a continuous supply',
      'The hose length is unlimited so the wearer can travel anywhere in the space',
      'The air supply must be from a suitable compressor with filtration providing Grade D breathing air, the airline must be protected from damage, and an emergency escape cylinder must be carried',
    ],
    correctAnswer: 3,
    explanation:
      'Airline breathing apparatus (ALBA) requires: a suitable breathing air compressor or cylinder bank providing Grade D breathing air (as per BS EN 12021); the airline hose must be protected from crushing, kinking, or chemical damage; the maximum hose length must not be exceeded; and the wearer must carry an emergency escape cylinder (typically 10-15 minutes duration) in case the primary air supply fails. The air intake for the compressor must be in an uncontaminated area.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'advanced',
  },
  {
    id: 152,
    question:
      'What is the recommended pre-entry atmospheric testing sequence when using a multi-gas detector?',
    options: [
      'Test for oxygen first, then flammable gases, then toxic gases',
      'Test for toxic gases first, then flammable gases, then oxygen',
      'Test for flammable gases first, then oxygen, then toxic gases',
      'The order does not matter',
    ],
    correctAnswer: 0,
    explanation:
      'The recommended sequence is oxygen first, then flammable gases, then toxic gases. Oxygen must be tested first because the catalytic bead sensor used for flammable gas detection requires adequate oxygen (above approximately 16%) to function correctly. If oxygen is deficient, the LEL reading may be unreliable. Additionally, knowing the oxygen level first helps assess whether the space has been adequately ventilated before proceeding with further testing.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'advanced',
  },
  {
    id: 153,
    question:
      'During a confined space entry, a worker develops a headache and nausea. What should be the FIRST action?',
    options: [
      'Ask the worker to rest inside the space for 10 minutes',
      'Immediately evacuate all personnel from the confined space',
      'Open a window in the confined space',
      'Give the worker paracetamol and continue working',
    ],
    correctAnswer: 1,
    explanation:
      'Headache and nausea are early symptoms of carbon monoxide poisoning or oxygen depletion. The immediate action must be to evacuate all personnel from the confined space — not just the affected worker, as the atmosphere may have deteriorated for everyone. Once evacuated, check atmospheric monitoring readings, provide first aid, seek medical attention for the affected worker, and do not re-enter until the cause has been identified and resolved.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 154,
    question: "What does the term 'permit to work' hierarchy mean in confined space operations?",
    options: [
      'The ranking of workers by seniority to decide who issues the permit',
      'The order in which permits expire, from the shortest duration to the longest',
      'The system of authorisation where a master permit may require additional subsidiary permits (e.g., hot work, electrical isolation) to be in place simultaneously',
      'The sequence of signatures required from junior to senior management on a single permit',
    ],
    correctAnswer: 2,
    explanation:
      'Permit to work hierarchy refers to the system where a master confined space entry permit may require one or more subsidiary or linked permits to be in place simultaneously. For example, if hot work is to be carried out inside a confined space, both a confined space entry permit and a hot work permit must be issued. If electrical isolation is needed, an electrical isolation certificate may also be required. All linked permits must be cross-referenced.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'advanced',
  },
  {
    id: 155,
    question:
      "A top person observes that the entrant's personal gas detector has gone into alarm. The entrant appears unresponsive to radio calls. What should the top person do?",
    options: [
      'Enter the space immediately to drag the entrant out before the gas spreads',
      'Wait a few minutes to see whether the entrant responds before raising the alarm',
      'Climb partway into the space to get a closer look at the entrant',
      'Activate the emergency rescue plan and summon the rescue team — DO NOT enter the space',
    ],
    correctAnswer: 3,
    explanation:
      'The top person must NEVER enter the confined space — doing so has historically resulted in multiple fatalities where would-be rescuers become additional casualties. The correct action is to immediately activate the emergency rescue plan, summon the trained and equipped rescue team, alert the emergency services, and attempt to communicate with the entrant. If a retrieval line is attached, the top person may attempt to retrieve the entrant using the winch system without entering the space.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 156,
    question: "What is 'residual hazard' in the context of confined space isolation?",
    options: [
      'A hazard that remains despite isolation measures, such as sludge containing toxic substances or residual energy in a system',
      'A hazard that exists only outside the confined space and never affects the entrant',
      'A hazard that is fully removed as soon as the isolation has been applied',
      'A hazard that only arises if the worker fails to wear the correct PPE',
    ],
    correctAnswer: 0,
    explanation:
      'Residual hazards are those that remain even after isolation measures have been applied. Examples include toxic sludge or residue on the walls and floor of a tank, trapped pockets of gas in baffles or dead legs, stored energy in pressurised systems, and heat retained in vessel walls. These residual hazards must be identified in the risk assessment and appropriate additional control measures implemented.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question:
      'When is it acceptable for the top person to leave their post at the confined space entry point?',
    options: [
      'Whenever the entrants confirm by radio that they feel safe inside the space',
      'Never — they must not leave until all entrants have exited and the permit has been closed, unless a competent replacement takes over',
      'During quiet periods of the work when no activity is taking place inside',
      'At any time, provided the entrants are wearing breathing apparatus',
    ],
    correctAnswer: 1,
    explanation:
      'The top person must never leave the entry point unattended while entrants are inside the confined space. If the top person needs to leave for any reason, a competent replacement must first take over the role and be fully briefed on the entry details, the number of people inside, the communication arrangements, and the emergency plan. Abandoning the post puts the entrants at serious risk as there would be no one to raise the alarm in an emergency.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'basic',
  },
  {
    id: 158,
    question:
      'In addition to atmospheric hazards, what physical hazard assessment must be carried out before confined space entry involving work at height inside the space?',
    options: [
      'An assessment of whether the entrants can hear instructions clearly inside the space',
      'An assessment of the colour of the PPE to ensure the workers are visible in the space',
      'An assessment of the structural integrity of internal fixtures, the suitability of anchor points, and the risk of falls from internal platforms or ladders',
      'An assessment of the breathing apparatus duration to confirm it lasts the whole shift',
    ],
    correctAnswer: 2,
    explanation:
      'Work at height inside a confined space requires assessment of internal structural integrity (corroded platforms, weakened ladders), the identification and testing of suitable anchor points for fall arrest equipment, the risk of falls from internal platforms, ladders, or staging, and the rescue plan for retrieving a fallen or suspended worker from inside the space. The confined and restricted nature of the space makes falls particularly dangerous as rescue is more complex.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 159,
    question:
      'What should be done with a confined space entry permit at the end of the work or at the end of the permitted duration?',
    options: [
      'It should be left active so the space can be re-entered later without a new permit',
      'It should be passed to the next shift so they can continue under the same authorisation',
      'It should be discarded immediately once the workers have climbed out of the space',
      'It should be formally cancelled by the issuing authority, confirming all personnel have exited, all equipment removed, and the space returned to a safe condition',
    ],
    correctAnswer: 3,
    explanation:
      'At the end of the work or the expiry of the permitted duration, the confined space entry permit must be formally cancelled by the issuing authority (or designated person). This involves confirming that all personnel have exited the space, all tools and equipment have been removed, a headcount matches the entry log, the space has been returned to a safe condition, and any isolations can be safely removed. The cancelled permit should be retained as a record.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question:
      'Under BS 7671 (IET Wiring Regulations), what additional protection measure is recommended for socket outlets supplying portable equipment inside a confined space with conductive location?',
    options: [
      'Electrical separation using an isolating transformer supplying only one item of equipment, or SELV/PELV not exceeding 25V AC',
      'A 13A fused plug fitted to each item of portable equipment used in the space',
      'A standard 230V socket protected only by the main circuit breaker of the building',
      'Doubling the cross-sectional area of the protective earthing conductor',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671, Section 706, covers electrical installations in restrictive conductive locations (which includes many confined spaces). The recommended protection measures include SELV (Safety Extra-Low Voltage) or PELV (Protective Extra-Low Voltage) not exceeding 25V AC (or 60V DC), or electrical separation using an isolating transformer supplying only one item of current-using equipment. A 30 mA RCD alone at 230V is not considered sufficient in conductive confined spaces due to the reduced body impedance.',
    category: 'Safe Entry & Working Procedures',
    difficulty: 'advanced',
  },

  // ─── EMERGENCY & RESCUE PROCEDURES — IDs 161-200 ───

  {
    id: 161,
    question:
      'Under the Confined Spaces Regulations 1997, Regulation 5, when must emergency arrangements be in place?',
    options: [
      'Only when the risk assessment identifies a high likelihood of an incident',
      'Before any person enters or works in a confined space',
      'Within 24 hours of the entry commencing',
      "Only when working in confined spaces classified as 'high risk'",
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 5 of the Confined Spaces Regulations 1997 is clear that suitable and sufficient arrangements for the rescue of persons in the event of an emergency must be in place BEFORE any person enters or works in a confined space. This applies to all confined space entries, regardless of the perceived level of risk. Emergency arrangements must be proportionate to the identified risks and must be practised.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 162,
    question: "What is 'non-entry rescue' in the context of confined space emergency procedures?",
    options: [
      'A rescue method where two rescuers enter the space together to extract the casualty',
      'A rescue method where the casualty is left in place until the emergency services arrive',
      'A rescue method where the casualty is retrieved from the confined space without the rescuer entering, typically using a retrieval line and winch system',
      'A rescue method where the space is flooded with water to float the casualty to the surface',
    ],
    correctAnswer: 2,
    explanation:
      'Non-entry rescue is the preferred primary rescue method. The entrant wears a full-body harness with an attached retrieval line connected to a mechanical retrieval device (winch) mounted on a tripod or davit at the entry point. If the entrant becomes incapacitated, the top person or rescue team can winch them out without anyone entering the space. This eliminates the risk of rescuers becoming additional casualties.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: 'What is the primary advantage of non-entry rescue over entry rescue?',
    options: [
      'It is faster to set up because no equipment is needed at the entry point',
      'It allows more rescuers to enter the space at the same time',
      'It removes the need for atmospheric monitoring during the rescue',
      'It eliminates the risk of the rescuer becoming a casualty in the hazardous atmosphere',
    ],
    correctAnswer: 3,
    explanation:
      'The primary advantage of non-entry rescue is that it eliminates the risk of the rescuer becoming an additional casualty. Historically, a significant proportion of confined space fatalities are would-be rescuers who enter a hazardous atmosphere unprepared. Non-entry rescue allows the casualty to be retrieved mechanically while the rescuer remains in safe air outside the space. It should always be the preferred method where the geometry of the space permits it.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 164,
    question:
      'A rescue tripod is set up over a vertical confined space access point. What is the typical safe working load (SWL) of a standard confined space rescue tripod?',
    options: [
      '140-200 kg (depending on manufacturer and model)',
      '20-40 kg (depending on manufacturer and model)',
      '500-750 kg (depending on manufacturer and model)',
      '1,000-1,500 kg (depending on manufacturer and model)',
    ],
    correctAnswer: 0,
    explanation:
      'A standard confined space rescue tripod typically has a safe working load of between 140 kg and 200 kg, depending on the manufacturer and model. This SWL must be sufficient to support the weight of the heaviest expected entrant plus their equipment. The SWL must be clearly marked on the equipment, and it must not be exceeded. Tripods must be inspected before each use and formally examined by a competent person at regular intervals.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question:
      'What equipment should be attached to a rescue tripod to enable mechanical retrieval of a casualty?',
    options: [
      'A standard goods-lifting hoist not rated for carrying persons',
      'A man-riding winch with an integrated fall arrest function',
      'A simple rope and pulley operated by hand from the surface',
      'A hydraulic vehicle jack positioned beneath the access point',
    ],
    correctAnswer: 1,
    explanation:
      'A man-riding winch with an integrated fall arrest function should be attached to the rescue tripod. This winch serves a dual purpose: it controls the descent and ascent of the entrant during normal entry and exit, and it provides a mechanical retrieval capability in an emergency. The integrated fall arrest function automatically locks if a fall is detected, preventing the entrant from free-falling. The winch must be rated for man-riding and comply with relevant standards.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question: "What is a 'davit' in the context of confined space rescue equipment?",
    options: [
      'A portable gas detector that samples the atmosphere from the surface before entry',
      'A flexible stretcher used to extract a casualty through a narrow opening',
      'A fixed or portable arm-and-base system that provides an anchor point above a confined space entry, functioning similarly to a tripod but suited to spaces where a tripod cannot be positioned',
      'A self-contained breathing apparatus set worn by rescue team members',
    ],
    correctAnswer: 2,
    explanation:
      'A davit is a fixed or portable arm-and-base system that extends over a confined space entry point to provide an anchor and lifting point for man-riding winches and retrieval systems. Davits are used where a tripod cannot be practically positioned, such as at the side of a vessel, on a wall-mounted manway, or at a hatch opening. The base is typically permanently fixed, and the davit arm can be inserted when needed.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question:
      'When planning confined space emergency arrangements, what should the assumed response time for the fire and rescue service be?',
    options: [
      'A guaranteed 8 minutes, which removes the need for any on-site rescue arrangements',
      'A fixed 30 minutes, which is always fast enough for a confined space casualty',
      'Whatever time the site manager judges to be acceptable on the day',
      'Response times cannot be guaranteed — on-site rescue capability must be provided for immediate response',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency services response times cannot be guaranteed, especially to remote or industrial locations. Therefore, the Approved Code of Practice (L101) emphasises that on-site rescue capability must be immediately available. Reliance solely on the emergency services is not acceptable. However, the emergency services should always be notified as part of the emergency plan, as they may be needed for additional support, medical care, or complex rescue situations.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 168,
    question:
      'What type of breathing apparatus should rescue team members use when entering a confined space with an IDLH atmosphere to perform entry rescue?',
    options: [
      'Self-contained breathing apparatus (SCBA) in positive pressure mode',
      'A half-face filtering facepiece (FFP3) dust mask',
      'A full-face respirator with combined gas and particulate filters',
      'A powered air-purifying respirator drawing from the ambient atmosphere',
    ],
    correctAnswer: 0,
    explanation:
      'Rescue team members entering a confined space with an IDLH (Immediately Dangerous to Life and Health) atmosphere must use self-contained breathing apparatus (SCBA) in positive pressure mode. SCBA provides an independent air supply unaffected by the ambient atmosphere. Positive pressure mode ensures that any facepiece leakage results in clean air flowing outward rather than contaminated air leaking in. Filtering respirators are not suitable in IDLH conditions.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 169,
    question:
      'How long does a standard 6-litre, 300-bar SCBA cylinder typically provide breathing air to a rescuer under moderate work rate?',
    options: [
      'Approximately 10 minutes',
      'Approximately 30-40 minutes',
      'Approximately 2 hours',
      'Approximately 4 hours',
    ],
    correctAnswer: 1,
    explanation:
      'A standard 6-litre, 300-bar SCBA cylinder contains approximately 1,800 litres of free air. At a moderate work rate, a person breathes approximately 40-50 litres per minute, giving an approximate duration of 30-40 minutes. However, under the stress and physical exertion of a rescue, the actual duration may be significantly shorter. Rescuers must monitor their cylinder pressure gauge and adhere to turnaround pressures (typically when the low-pressure warning whistle activates at around 55 bar).',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question:
      "What is 'suspension trauma' (harness hang syndrome) and why is it relevant to confined space rescue?",
    options: [
      'A muscle strain caused by lifting a casualty incorrectly during a rescue',
      'The bruising left on the body by the straps of a poorly fitted harness',
      'A potentially fatal condition caused by prolonged suspension in a harness, where blood pools in the legs and reduces cardiac output',
      'The disorientation a worker feels after spending a long period in a dark confined space',
    ],
    correctAnswer: 2,
    explanation:
      'Suspension trauma (harness hang syndrome) is a potentially life-threatening condition that occurs when a person is suspended motionless in a harness. Blood pools in the legs due to the harness straps compressing veins, reducing venous return to the heart and lowering cardiac output. This can lead to unconsciousness within minutes and death within 15-30 minutes. In confined space rescue, prompt retrieval of a suspended casualty is critical, and rescuers should be trained to recognise and manage suspension trauma.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 171,
    question:
      'Once a casualty suffering from suspension trauma has been rescued, what position should they be placed in?',
    options: [
      'Laid completely flat on their back immediately to restore circulation',
      'Placed in the standard recovery position on their side straight away',
      'Stood upright and encouraged to walk to keep the blood moving',
      'In a semi-seated or W-position (knees raised towards chest) initially, NOT laid flat immediately',
    ],
    correctAnswer: 3,
    explanation:
      "A casualty suffering from suspension trauma must NOT be laid flat immediately after rescue. The sudden return of pooled, deoxygenated blood from the legs to the heart can cause 'rescue death' — a fatal cardiac overload. Instead, the casualty should be placed in a semi-seated or W-position with knees raised towards the chest for at least 30-40 minutes, allowing gradual redistribution of blood. This is a critical consideration in confined space rescue first aid training.",
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 172,
    question:
      'What type of stretcher is specifically designed for extracting a casualty through narrow confined space access points?',
    options: [
      'A basket (Stokes) stretcher or a confined space rescue stretcher (such as a SKED or roll-up stretcher)',
      'A standard rigid spinal board used by ambulance crews',
      'An inflatable air mattress designed for transporting patients on level ground',
      'A folding wheeled trolley stretcher used in hospital corridors',
    ],
    correctAnswer: 0,
    explanation:
      'Confined space rescue stretchers such as the SKED (a flexible, roll-up plastic stretcher) or a Stokes basket stretcher are specifically designed for extracting casualties through narrow openings and confined spaces. The SKED stretcher wraps around the casualty and can be narrowed to fit through restricted access points, while the Stokes basket provides rigid protection. These stretchers have multiple lifting and hauling points for vertical and horizontal extraction.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question:
      'What is the minimum number of trained personnel typically required for a confined space entry rescue team to perform an effective entry rescue?',
    options: [
      'A single trained rescuer who enters the space alone',
      'A minimum of three to four persons, depending on the rescue plan',
      'At least ten persons, regardless of the size of the space',
      'No dedicated team — the top person carries out the rescue alone',
    ],
    correctAnswer: 1,
    explanation:
      'An effective entry rescue team typically requires a minimum of three to four trained persons: at least two rescuers to enter the space (buddy system), one person to manage the entry point and winch/retrieval equipment, and ideally a team leader to coordinate the rescue and communicate with emergency services. The exact number depends on the rescue plan, the complexity of the space, and the nature of the emergency. All team members must have practised the rescue drill.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'What does the emergency rescue plan for a confined space entry MUST include?',
    options: [
      'Only the contact telephone number for the local fire and rescue service',
      'Only the names of the workers who are authorised to enter the space',
      'Rescue equipment, trained rescue personnel, communication methods, first aid arrangements, and procedures for raising the alarm and coordinating with emergency services',
      'Only the atmospheric test results recorded immediately before entry',
    ],
    correctAnswer: 2,
    explanation:
      'A comprehensive emergency rescue plan must include: specified rescue equipment and its location; trained and equipped rescue personnel who are immediately available; communication methods between the space, the top person, and the rescue team; first aid provisions including oxygen therapy equipment; procedures for raising the alarm; contact details for emergency services; hospital details and route; and the procedures for non-entry and entry rescue. The plan must be practised regularly.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 175,
    question:
      'During a confined space rescue drill, the rescue team takes 12 minutes to retrieve the dummy casualty from a 5-metre deep vessel. Is this acceptable?',
    options: [
      'Yes — there is no time limit at all, so any retrieval time is acceptable',
      'Yes — 12 minutes is well within the regulatory maximum of 30 minutes',
      'No — the regulations specify a strict legal limit of exactly 3 minutes for all rescues',
      'It depends on the specific risk assessment; however, best practice target for initial casualty retrieval from a vertical space is typically within 5 minutes',
    ],
    correctAnswer: 3,
    explanation:
      'While there is no single regulatory time limit, best practice for non-entry retrieval from a vertical space targets initial casualty retrieval within approximately 5 minutes. This is based on the understanding that a person in a toxic atmosphere or suffering cardiac arrest has very limited survival time. A 12-minute retrieval time would warrant a review of the rescue plan, equipment, team positioning, and procedures to identify improvements. The specific target should be set based on the risk assessment.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 176,
    question:
      'What RIDDOR reporting obligation applies if a worker loses consciousness inside a confined space due to exposure to a toxic atmosphere?',
    options: [
      'It must be reported as a dangerous occurrence under RIDDOR, and if the worker is taken to hospital for treatment, it is also reportable as a specified injury/over-7-day injury as applicable',
      'It does not need to be reported provided the worker recovers fully within an hour',
      'It only needs to be recorded in the accident book, with no report to the HSE',
      'It is reportable only if the worker is off work for more than 28 consecutive days',
    ],
    correctAnswer: 0,
    explanation:
      'Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), loss of consciousness caused by exposure to a substance is a reportable dangerous occurrence. If the worker is taken to hospital, it may also be reportable as a specified injury or over-7-day injury depending on the outcome. The responsible person must report to the HSE without delay (immediately for specified injuries, within 10 days for over-7-day injuries, and immediately for dangerous occurrences).',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question:
      'Which of the following is a reportable dangerous occurrence under RIDDOR related to confined spaces?',
    options: [
      'A worker arriving late for a confined space entry shift',
      'The unintentional release of a substance that could reasonably have caused death or specified injury',
      'A gas detector failing its routine annual calibration check',
      'A permit to work being filled in with incorrect spelling',
    ],
    correctAnswer: 1,
    explanation:
      'Under Schedule 2 of RIDDOR 2013, the unintentional release of any substance that could reasonably have resulted in death or a specified injury is a reportable dangerous occurrence. In a confined space context, this could include an unexpected release of toxic gas, an uncontrolled ingress of water or other material, or failure of containment leading to atmospheric contamination. Planned, controlled releases (such as nitrogen purging) are not reportable as they are part of the safe system of work.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question:
      'After a confined space incident requiring rescue, what investigation should be carried out?',
    options: [
      'A brief note in the site diary identifying who was at fault',
      'No investigation, as the incident is a matter for the emergency services',
      'A thorough investigation to establish root causes, contributing factors, and lessons learned, with corrective actions implemented to prevent recurrence',
      'An investigation limited to checking whether the correct paperwork was completed',
    ],
    correctAnswer: 2,
    explanation:
      'A thorough investigation must be carried out after any confined space incident, regardless of the severity of the outcome. The investigation should identify root causes (not just immediate causes), contributing factors (organisational, human, technical), and lessons learned. Corrective actions must be identified, implemented, and verified. The findings should be shared across the organisation and used to update risk assessments, safe systems of work, and training. Near misses should also be investigated.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 179,
    question:
      "What is the purpose of a 'near-miss' reporting culture in relation to confined space safety?",
    options: [
      'To identify which workers should be disciplined for causing unsafe situations',
      'To reduce the amount of paperwork required after an actual injury occurs',
      'To demonstrate to the HSE that the workplace has had no reportable accidents',
      'To identify and learn from incidents that could have resulted in injury or death, enabling proactive prevention of future incidents',
    ],
    correctAnswer: 3,
    explanation:
      'A near-miss reporting culture encourages workers to report incidents and unsafe conditions that did not result in injury but had the potential to do so. In confined space work, near misses (such as a gas alarm activation, a ventilation failure, or a communication breakdown) provide invaluable learning opportunities to identify weaknesses in the safe system of work before a serious incident occurs. A blame-free reporting culture is essential to encourage open and honest reporting.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 180,
    question:
      'What first aid equipment should be immediately available at a confined space entry point?',
    options: [
      'A first aid kit, oxygen resuscitation equipment, automated external defibrillator (AED), and blankets as a minimum — with additional items based on the specific risk assessment',
      'Only a basic plaster and bandage kit, as serious cases go straight to hospital',
      'No first aid equipment is needed because the rescue team handle all casualties',
      'Only a fire extinguisher, as fire is the main risk in a confined space',
    ],
    correctAnswer: 0,
    explanation:
      'First aid provision for confined space work should include as a minimum: a suitably stocked first aid kit, oxygen resuscitation equipment (for treating casualties exposed to toxic atmospheres or oxygen-deficient environments), an automated external defibrillator (AED) for cardiac emergencies, and blankets for treating shock and hypothermia. Additional items may be required based on the specific risk assessment — for example, burns kits for hot work or eye wash stations for chemical hazards.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 181,
    question: 'What should happen to the confined space atmosphere during a rescue operation?',
    options: [
      'Ventilation should be switched off so the casualty is not disturbed by airflow',
      'Forced ventilation should be maintained or increased to improve the atmosphere for both the casualty and the rescue team',
      'The space should be sealed to prevent any further gas from entering during the rescue',
      'The space should be purged with nitrogen to remove the toxic gas quickly',
    ],
    correctAnswer: 1,
    explanation:
      'During a rescue operation, forced ventilation should be maintained and, if possible, increased to improve the atmosphere within the space. This benefits both the casualty (who may be without respiratory protection) and the rescue team. However, ventilation alone may not make the atmosphere safe, so rescue team members must still wear appropriate RPE (typically SCBA) until the atmosphere is confirmed safe by monitoring.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 182,
    question:
      "A confined space rescue plan specifies 'entry rescue' as the primary method. What does this mean?",
    options: [
      'The casualty is winched out using a retrieval line without anyone entering the space',
      'The casualty is left in place until the fire and rescue service arrive on scene',
      'Trained rescuers wearing appropriate PPE and RPE will physically enter the confined space to reach, stabilise, and extract the casualty',
      'The top person enters the space briefly to pass a rope to the casualty',
    ],
    correctAnswer: 2,
    explanation:
      'Entry rescue means that trained rescue team members, wearing appropriate PPE and RPE (typically SCBA for IDLH atmospheres), physically enter the confined space to reach the casualty, provide initial medical treatment if needed, package the casualty (e.g., in a rescue stretcher), and extract them from the space. Entry rescue is used when non-entry rescue is not feasible — for example, in large, complex spaces where the casualty cannot be reached by a retrieval line.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 183,
    question: 'Why is it critical to practise confined space rescue drills regularly?',
    options: [
      'Because the regulations require drills to be filmed and submitted to the HSE',
      'Because drills are only needed to justify the cost of buying rescue equipment',
      'Because drills replace the need to carry out a written risk assessment',
      'To ensure the rescue team can perform an effective rescue under stress, identify any deficiencies in equipment or procedures, and maintain competence',
    ],
    correctAnswer: 3,
    explanation:
      "Regular rescue drills are critical because: they ensure the rescue team can perform under the stress of a real emergency; they reveal deficiencies in equipment, procedures, or training before a real incident occurs; they maintain the rescue team's competence and muscle memory; they verify that the rescue plan is workable for the specific confined space; and they build team coordination and communication. Drills should be carried out at realistic frequency and should simulate realistic scenarios.",
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 184,
    question: "What is the 'buddy system' in the context of confined space entry rescue?",
    options: [
      'A system where rescue team members always enter the space in pairs so they can monitor each other and provide mutual assistance',
      'A system where each rescuer is paired with a member of the emergency services',
      'A system where a rescuer is paired with the casualty they are sent in to retrieve',
      'A system where rescuers take turns entering the space one at a time to conserve air',
    ],
    correctAnswer: 0,
    explanation:
      'The buddy system requires rescue team members to always enter a confined space in pairs (minimum). Each member monitors the other for signs of distress, equipment malfunction, or deterioration. If one rescuer experiences a problem, their buddy can assist and raise the alarm. A lone rescuer inside a confined space would have no one to call for help if they became incapacitated, creating the very situation they were sent in to resolve.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 185,
    question:
      'During an emergency evacuation from a confined space, what should the top person record?',
    options: [
      'The serial numbers of the breathing apparatus sets used during the entry',
      'The names and times of all personnel exiting the space to confirm a complete headcount and identify anyone still inside',
      'The atmospheric readings taken at the start of the shift only',
      'The make and model of the rescue tripod set up over the entry point',
    ],
    correctAnswer: 1,
    explanation:
      "The top person must record or confirm the names and exit times of all personnel leaving the space to ensure a complete headcount. This is critical for identifying anyone who may still be inside and requiring rescue. The top person should have been maintaining an entry/exit log throughout the operation. In an emergency, confirming that all entrants are accounted for is one of the top person's most important responsibilities.",
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 186,
    question:
      'What is the purpose of an emergency escape breathing device (EEBD) carried by a confined space entrant?',
    options: [
      'It provides a continuous air supply for the entire duration of the planned work',
      'It filters the surrounding air to remove toxic gases before the wearer breathes it',
      'It provides a short-duration air supply (typically 10-15 minutes) to enable self-rescue escape from a contaminated atmosphere',
      'It supplies oxygen to a casualty who has already been removed from the space',
    ],
    correctAnswer: 2,
    explanation:
      'An emergency escape breathing device (EEBD) is a small, self-contained air supply carried by the entrant that provides approximately 10-15 minutes of breathing air. It is designed solely for emergency self-rescue — allowing the wearer to escape from a suddenly contaminated atmosphere. It is NOT a substitute for primary RPE in known hazardous atmospheres and does NOT replace the need for atmospheric monitoring or proper ventilation.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 187,
    question:
      'A confined space rescue involves a casualty located 8 metres below ground level in a vertical shaft. Which extraction method would be most appropriate?',
    options: [
      'Two rescuers carrying the casualty up the access ladder by hand',
      'Lowering a single rope for the casualty to climb out unaided',
      'Waiting for the water table to rise and float the casualty to the surface',
      'A tripod or davit with man-riding winch system, with the casualty secured in a rescue harness or stretcher',
    ],
    correctAnswer: 3,
    explanation:
      'Vertical extraction over 8 metres requires a mechanical advantage system. A tripod or davit positioned over the access point, equipped with a man-riding winch, is the most appropriate method. The casualty should be secured in either a full-body rescue harness (if conscious and able to be supported) or a confined space rescue stretcher (if unconscious or injured). Manual lifting by workers is not practicable over this distance and poses significant risk of dropping the casualty or causing injury to rescuers.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 188,
    question:
      'What is the role of the emergency services (fire and rescue) in a confined space rescue plan?',
    options: [
      'They provide additional support, specialist rescue capability, medical assistance, and resources to supplement the on-site rescue team',
      'They replace the on-site rescue team entirely, so no site arrangements are needed',
      'They issue the confined space entry permit before any work can begin',
      'They carry out the atmospheric monitoring on behalf of the employer during the work',
    ],
    correctAnswer: 0,
    explanation:
      'The emergency services supplement the on-site rescue capability — they do not replace it. On-site rescue arrangements must be in place for immediate response. However, the fire and rescue service should be pre-notified of high-risk confined space operations where possible, and always called as part of the emergency response. They can provide specialist rescue technicians, advanced medical care (paramedics), additional breathing apparatus and rescue equipment, and coordination of larger-scale incidents.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question:
      'What should a rescue team do FIRST upon arriving at a confined space where the entrant has become unresponsive?',
    options: [
      'Rush straight into the space to pull the entrant out as fast as possible',
      'Assess the situation: check atmospheric monitoring readings, attempt communication, attempt non-entry retrieval, and determine if entry rescue is needed',
      'Wait for the fire and rescue service to arrive before taking any action',
      'Begin filling in the RIDDOR report form before attempting any rescue',
    ],
    correctAnswer: 1,
    explanation:
      'The rescue team must first assess the situation before acting. This includes: checking the atmospheric monitoring readings to understand what hazard may be present; attempting to communicate with the casualty; attempting non-entry retrieval using the winch/retrieval system if a line is attached; and determining whether entry rescue is necessary. Rushing into the space without assessment puts rescuers at risk. If entry rescue is required, the team must don appropriate RPE and follow the rehearsed rescue plan.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 190,
    question:
      'An entrant in a confined space suffers a cardiac arrest. After extraction, what equipment should be used as part of the initial emergency response?',
    options: [
      'A photoionisation detector to check the casualty for residual gas',
      'A rescue tripod and winch to lift the casualty clear of the ground',
      'An automated external defibrillator (AED) alongside CPR',
      'An emergency escape breathing device fitted to the casualty',
    ],
    correctAnswer: 2,
    explanation:
      'In the event of cardiac arrest, an automated external defibrillator (AED) should be used as quickly as possible alongside CPR (cardiopulmonary resuscitation). Early defibrillation significantly increases the chances of survival — survival rates decrease by approximately 10% for every minute that defibrillation is delayed. An AED should be part of the standard first aid equipment available at every confined space entry point.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 191,
    question:
      'Under RIDDOR 2013, within what timeframe must a death resulting from a confined space incident be reported to the enforcing authority?',
    options: [
      'Within 10 days, using the online F2508 form only',
      'Within 28 days of the death occurring on site',
      'Within 3 months, once the internal investigation is complete',
      'Without delay — by the quickest practicable means (usually telephone)',
    ],
    correctAnswer: 3,
    explanation:
      'Under RIDDOR 2013, a death arising from a work-related accident must be reported to the enforcing authority (HSE or local authority) without delay — by the quickest practicable means. This is usually by telephone to the HSE Incident Contact Centre. A written report (F2508) must follow within 10 days. The site and any evidence must be preserved pending investigation unless doing so would cause danger.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: "What is 'rescue death' and how can it be prevented?",
    options: [
      'Death that occurs after rescue from suspension, caused by the sudden redistribution of pooled blood overwhelming the heart — prevented by adopting a semi-seated recovery position rather than laying the casualty flat',
      'Death of a rescuer who enters a toxic atmosphere without breathing apparatus — prevented by always using non-entry rescue methods',
      'Death caused by a casualty being dropped during winching — prevented by using a secondary backup line on the retrieval system',
      'Death from delayed pulmonary oedema after gas exposure — prevented by giving the casualty oxygen at the scene',
    ],
    correctAnswer: 0,
    explanation:
      'Rescue death (also called reflow syndrome) occurs when a casualty who has been suspended in a harness is suddenly laid flat after rescue. The pooled, deoxygenated blood from the legs rushes back to the heart, potentially causing fatal cardiac overload. It is prevented by placing the rescued casualty in a semi-seated or W-position (knees raised) for 30-40 minutes after rescue, allowing gradual blood redistribution. All confined space rescue personnel must be trained to recognise and manage this condition.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 193,
    question:
      'What factors should be considered when selecting between SCBA and airline BA for confined space rescue?',
    options: [
      'The colour of the apparatus and the preference of the individual rescuer',
      'Duration of air supply, the distance the rescuer needs to travel, the size of the access, the potential for hose snag or damage, and the need for mobility',
      'The cost of the apparatus and which supplier offers the quickest delivery',
      'The brand name printed on the equipment and its year of manufacture',
    ],
    correctAnswer: 1,
    explanation:
      'Selection factors include: duration of air supply (SCBA is limited by cylinder size; airline BA offers longer duration but adds a hose); travel distance (airline has hose length limits); access size (SCBA cylinders may not fit through restricted openings — in such cases, the cylinder may need to be passed through separately or airline BA used); hose snag risk (airline hoses can become tangled or damaged in complex spaces); and mobility requirements (SCBA offers greater freedom of movement as there is no hose).',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 194,
    question:
      "What is the purpose of a 'turnaround pressure' when using SCBA during a confined space rescue?",
    options: [
      'The pressure at which the cylinder must be refilled before the next entry',
      'The maximum pressure the cylinder can safely be charged to before use',
      'The minimum cylinder pressure at which the rescuer must begin their return journey to ensure they exit the space before the air supply is exhausted',
      'The pressure inside the facepiece that keeps contaminated air from leaking in',
    ],
    correctAnswer: 2,
    explanation:
      'The turnaround pressure is the calculated minimum cylinder pressure at which the SCBA wearer must begin their return journey to the exit. It accounts for the air consumed during the journey in, the air needed for the return journey (typically the same or more due to exertion and potential complications), plus a safety margin. The low-pressure warning whistle (typically at 55 bar) provides an audible alert but should not be relied upon as the sole turnaround indicator — the turnaround pressure should be pre-calculated and monitored.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 195,
    question:
      'After a confined space incident, what documentation should be preserved for the investigation?',
    options: [
      'Only the permit to work, as all other records are unnecessary for the investigation',
      'Only the timesheets showing how long the work took to complete',
      'Only a verbal account from the supervisor given after the incident',
      'All permits, risk assessments, atmospheric monitoring records, training records, equipment inspection records, CCTV footage, witness statements, and the scene itself',
    ],
    correctAnswer: 3,
    explanation:
      'A comprehensive investigation requires preservation of all relevant documentation including: the confined space entry permit and any linked permits; the risk assessment and method statement; atmospheric monitoring data logs; gas detector calibration and bump test records; training and competency records for all involved personnel; equipment inspection and maintenance records; CCTV or body camera footage; witness statements; and the physical scene itself (which must not be disturbed except to prevent further danger).',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: "What is the HSE's recommended approach to investigating confined space incidents?",
    options: [
      'A systematic approach examining immediate causes, underlying causes, and root causes — including organisational and management factors',
      'A quick check to confirm the correct paperwork was completed, with no further analysis',
      'An approach focused solely on identifying which worker was to blame for the incident',
      'An approach that only considers the equipment and ignores human and organisational factors',
    ],
    correctAnswer: 0,
    explanation:
      "The HSE recommends a systematic investigation approach (as outlined in HSG245 'Investigating accidents and incidents') that looks beyond the immediate causes to identify underlying causes and root causes. This includes examining organisational factors (safety culture, management systems, resource allocation), human factors (competence, fatigue, communication), and technical factors (equipment reliability, design). The aim is to learn and prevent recurrence, not simply to assign blame.",
    category: 'Emergency & Rescue Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question:
      'A worker is rescued from a confined space after inhaling hydrogen sulphide. They appear to have recovered and want to return to work. What should happen?',
    options: [
      'They may return to work immediately, as a full recovery means no further risk remains',
      'They must receive medical assessment and clearance before returning to work, as H₂S can cause delayed pulmonary oedema and other latent effects',
      'They should rest on site for an hour and then resume work if they still feel well',
      'They may return to work once they have signed a disclaimer accepting the risk',
    ],
    correctAnswer: 1,
    explanation:
      'Hydrogen sulphide exposure can cause delayed medical effects including pulmonary oedema (fluid in the lungs) that may develop hours after apparent recovery. Any worker exposed to H₂S in a confined space incident must receive a full medical assessment and must not return to work until cleared by a medical professional. The medical professional should be informed of the specific substance involved and the estimated exposure level and duration.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 198,
    question:
      "What is a 'cascade system' in the context of confined space rescue breathing apparatus?",
    options: [
      'The chain reaction in which one overcome worker leads to several more becoming casualties',
      'A single small escape cylinder carried by each entrant for self-rescue',
      'A bank of interconnected high-pressure air cylinders that provide an extended, continuous supply of breathing air to airline BA users',
      'A sequence of permits that must be issued one after another before entry',
    ],
    correctAnswer: 2,
    explanation:
      'A cascade system consists of a bank of large, interconnected high-pressure air cylinders that are manifolded together to provide a high-volume, extended, continuous supply of Grade D breathing air. They are used to supply airline breathing apparatus during prolonged confined space operations and rescue scenarios where single-cylinder SCBA duration would be insufficient. The system automatically switches between cylinders as they deplete, ensuring uninterrupted air supply to the user.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'advanced',
  },
  {
    id: 199,
    question:
      'What information should be communicated to the emergency services when calling 999 for a confined space incident?',
    options: [
      'Only the name of the company and the number of years it has traded',
      'Only the make and model of the gas detector being used on site',
      'Only the qualifications held by the workers who were in the space',
      'The exact location and type of confined space, the nature of the emergency, number of casualties, suspected hazards (gas type if known), what rescue measures are in progress, and any access difficulties',
    ],
    correctAnswer: 3,
    explanation:
      'When calling 999 for a confined space incident, the following information should be communicated: the exact location including site address and specific location of the confined space; the type of confined space (tank, sewer, vessel, etc.); the nature of the emergency (collapse, gas exposure, engulfment, etc.); the number of casualties and their suspected condition; the suspected hazard (gas type and concentration if known); what rescue measures are already in progress; access difficulties for emergency vehicles; and a contact name and phone number for the person meeting the emergency services at the site entrance.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
  {
    id: 200,
    question:
      'After a confined space near-miss event is reported and investigated, what is the MOST important final step?',
    options: [
      'Implementing corrective actions, updating the risk assessment and safe system of work, and sharing the lessons learned across the organisation',
      'Filing the investigation report away and taking no further action',
      'Identifying and disciplining the worker who was involved in the near miss',
      'Waiting to see whether a similar near miss happens again before acting',
    ],
    correctAnswer: 0,
    explanation:
      'The most important final step after investigating a near miss is to implement the identified corrective actions, update the risk assessment and safe system of work to reflect the lessons learned, and share the findings across the organisation so that all relevant personnel can benefit from the experience. Near misses are valuable opportunities for organisational learning. Without implementing corrective actions and sharing lessons, the investigation adds no value and the same near miss — or worse, an actual incident — is likely to recur.',
    category: 'Emergency & Rescue Procedures',
    difficulty: 'basic',
  },
];
