/**
 * Fire Safety & Fire Marshal Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced difficulty.
 *
 * Categories (5):
 *   Understanding Fire (40) | Fire Safety Legislation (40) |
 *   Fire Prevention & Detection (40) | Fire Marshal Duties & Evacuation (40) |
 *   Firefighting Equipment & Incident Response (40)
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
export const fireSafetyCategories = [
  "Understanding Fire",
  "Fire Safety Legislation",
  "Fire Prevention & Detection",
  "Fire Marshal Duties & Evacuation",
  "Firefighting Equipment & Incident Response"
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const fireSafetyMockExamConfig: MockExamConfig = {
  examId: 'fire-safety',
  examTitle: 'Fire Safety & Fire Marshal Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/fire-safety-module-6',
  categories: fireSafetyCategories
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomFireSafetyExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(fireSafetyQuestionBank, numQuestions, fireSafetyCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — Questions 1-100 (Part 1)
// ---------------------------------------------------------------------------
export const fireSafetyQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // UNDERSTANDING FIRE — 40 questions (id 1-40)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 1,
    question: "What three elements make up the fire triangle?",
    options: [
      "Heat, fuel, and oxygen",
      "Heat, water, and fuel",
      "Fuel, oxygen, and carbon dioxide",
      "Heat, electricity, and fuel"
    ],
    correctAnswer: 0,
    explanation: "The fire triangle consists of heat, fuel, and oxygen. All three elements must be present simultaneously for combustion to occur. Removing any one of the three elements will extinguish the fire, which is the fundamental principle behind all fire suppression methods.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Fire triangle",
    category: "Understanding Fire"
  },
  {
    id: 2,
    question: "What is the fourth element added to the fire triangle to form the fire tetrahedron?",
    options: [
      "Water",
      "Carbon dioxide",
      "Chemical chain reaction",
      "Smoke"
    ],
    correctAnswer: 2,
    explanation: "The fire tetrahedron adds the chemical chain reaction as the fourth element to the traditional fire triangle of heat, fuel, and oxygen. The chain reaction is the self-sustaining process of combustion where free radicals propagate the fire. Removing the chain reaction — for example, by applying a dry powder extinguisher — can suppress a fire even when heat, fuel, and oxygen remain present.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Fire tetrahedron",
    category: "Understanding Fire"
  },
  {
    id: 3,
    question: "What is the 'flash point' of a flammable liquid?",
    options: [
      "The temperature at which it spontaneously ignites without an external ignition source",
      "The lowest temperature at which the liquid gives off sufficient vapour to form an ignitable mixture with air near its surface",
      "The temperature at which the liquid boils",
      "The temperature at which it becomes a solid"
    ],
    correctAnswer: 1,
    explanation: "The flash point is the lowest temperature at which a flammable liquid gives off sufficient vapour to form an ignitable mixture with air at its surface. At the flash point, the vapour will ignite momentarily if an ignition source is applied, but sustained burning may not occur until the fire point is reached, which is typically a few degrees higher.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Flash point",
    category: "Understanding Fire"
  },
  {
    id: 4,
    question: "What is the 'auto-ignition temperature' of a substance?",
    options: [
      "The temperature at which it gives off vapour",
      "The temperature at which it melts",
      "The lowest temperature at which the substance will spontaneously ignite in air without an external ignition source",
      "The temperature at which it can be safely stored"
    ],
    correctAnswer: 2,
    explanation: "The auto-ignition temperature is the lowest temperature at which a substance will spontaneously ignite in a normal atmosphere without an external ignition source such as a flame or spark. For example, the auto-ignition temperature of petrol is approximately 280°C. This is a critical parameter in fire risk assessments, particularly for hot work and industrial processes.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Auto-ignition",
    category: "Understanding Fire"
  },
  {
    id: 5,
    question: "Which class of fire involves ordinary combustible materials such as wood, paper, and textiles?",
    options: [
      "Class B",
      "Class C",
      "Class A",
      "Class F"
    ],
    correctAnswer: 2,
    explanation: "Class A fires involve ordinary combustible solid materials such as wood, paper, textiles, cardboard, and many plastics. These materials typically form glowing embers as they burn. Class A fires are the most common type of fire in workplaces and are generally extinguished with water, which cools the fuel below its ignition temperature.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Classes of fire",
    category: "Understanding Fire"
  },
  {
    id: 6,
    question: "Which class of fire involves flammable liquids such as petrol, diesel, and solvents?",
    options: [
      "Class A",
      "Class B",
      "Class D",
      "Class F"
    ],
    correctAnswer: 1,
    explanation: "Class B fires involve flammable liquids and liquefiable solids, including petrol, diesel, oil, solvents, paints, and alcohols. These fires burn on the surface of the liquid where vapour mixes with air. They are typically extinguished using foam (which forms a blanket over the liquid surface), CO₂, or dry powder extinguishers.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Classes of fire",
    category: "Understanding Fire"
  },
  {
    id: 7,
    question: "Which class of fire involves flammable gases such as methane, propane, or butane?",
    options: [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    correctAnswer: 2,
    explanation: "Class C fires involve flammable gases including methane, propane, butane, natural gas, and hydrogen. The primary method of dealing with a Class C fire is to isolate the gas supply if it can be done safely. Extinguishing a gas fire without isolating the supply creates an explosion risk, as unburned gas will continue to accumulate and could reignite.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Classes of fire",
    category: "Understanding Fire"
  },
  {
    id: 8,
    question: "Which class of fire involves combustible metals such as magnesium, aluminium, or sodium?",
    options: [
      "Class C",
      "Class D",
      "Class F",
      "Class B"
    ],
    correctAnswer: 1,
    explanation: "Class D fires involve combustible metals such as magnesium, aluminium, titanium, sodium, lithium, and potassium. These fires burn at extremely high temperatures and react violently with water, which can cause explosions or spread the fire. Specialist dry powder extinguishers (L2 powder) or dry sand must be used. Class D fires are most common in engineering, manufacturing, and laboratory environments.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Classes of fire",
    category: "Understanding Fire"
  },
  {
    id: 9,
    question: "Which class of fire involves cooking oils and fats, typically found in commercial kitchens?",
    options: [
      "Class A",
      "Class B",
      "Class D",
      "Class F"
    ],
    correctAnswer: 3,
    explanation: "Class F fires involve cooking oils and fats, most commonly found in deep fat fryers in commercial kitchens. Cooking oils can reach temperatures above 340°C and are extremely difficult to extinguish. Water must never be used on Class F fires as it causes a violent steam explosion (boilover). Wet chemical extinguishers are specifically designed for Class F fires, creating a saponification reaction that forms a cooling soap-like layer over the oil surface.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Classes of fire",
    category: "Understanding Fire"
  },
  {
    id: 10,
    question: "Fires involving electrical equipment are not given their own class in the UK system. Why is this?",
    options: [
      "Because electrical fires never occur in the UK",
      "Because electricity is the ignition source, not the fuel — once the electrical supply is isolated, the fire is classified by the burning material",
      "Because electrical fires are always Class C",
      "Because electrical fires are covered by Class B"
    ],
    correctAnswer: 1,
    explanation: "In the UK/European classification system, electrical fires are not given a separate class because electricity is the ignition source rather than the fuel. Once the electrical supply is isolated, the fire is classified according to the material that is actually burning (e.g., Class A if plastic insulation is burning). However, before isolation, only CO₂ or dry powder extinguishers should be used, as water and foam conduct electricity and pose an electrocution risk.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Electrical fires",
    category: "Understanding Fire"
  },
  {
    id: 11,
    question: "What are the five recognised phases of fire development in a compartment fire?",
    options: [
      "Ignition, growth, flashover, fully developed, and decay",
      "Spark, smoke, flame, explosion, and burnout",
      "Pre-heating, smouldering, flaming, cooling, and re-ignition",
      "Incipient, warning, alarm, evacuation, and suppression"
    ],
    correctAnswer: 0,
    explanation: "The five phases of compartment fire development are: ignition (initial combustion begins), growth (fire increases in size and intensity, producing more heat and smoke), flashover (the critical transition point where all combustible materials in the compartment simultaneously ignite due to radiant heat), fully developed (maximum heat release rate — the fire is limited by ventilation or fuel), and decay (fuel is consumed and the fire diminishes).",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fire development phases",
    category: "Understanding Fire"
  },
  {
    id: 12,
    question: "What is 'flashover' in the context of fire development?",
    options: [
      "The moment a fire first starts",
      "The rapid transition to a state of full involvement of all combustible materials in a compartment, caused by intense radiant heat",
      "The point at which a fire is extinguished",
      "The moment smoke first becomes visible"
    ],
    correctAnswer: 1,
    explanation: "Flashover is the rapid transition from the growth phase to the fully developed phase, where radiant heat from the fire, hot smoke layer, and room surfaces heats all combustible materials in the compartment to their ignition temperature. This causes simultaneous ignition of everything in the room. Flashover typically occurs when the upper smoke layer reaches approximately 500-600°C. Survival after flashover is virtually impossible, making early detection and evacuation critical.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Flashover",
    category: "Understanding Fire"
  },
  {
    id: 13,
    question: "What is 'backdraught' (backdraft)?",
    options: [
      "A fire that burns backwards towards its source",
      "A sudden explosive event caused by the introduction of oxygen into a compartment containing superheated, oxygen-depleted fire gases",
      "The draught of air felt when a fire door closes",
      "A fire that only burns in windy conditions"
    ],
    correctAnswer: 1,
    explanation: "Backdraught occurs when a fire in a sealed or poorly ventilated compartment has consumed most of the available oxygen, producing superheated, pyrolysed but unburned gases. When an opening is made (such as a door or window being opened), fresh air rushes in and mixes with these hot, fuel-rich gases. The mixture can then ignite explosively, creating a fireball that can travel outward through the opening. Warning signs include smoke pulsing around door frames and windows that appear stained black.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Backdraught",
    category: "Understanding Fire"
  },
  {
    id: 14,
    question: "How does fire spread by conduction?",
    options: [
      "Through the movement of hot air and gases",
      "Through electromagnetic waves",
      "Through the direct transfer of heat through a solid material from a hotter region to a cooler region",
      "Through the burning of embers carried by the wind"
    ],
    correctAnswer: 2,
    explanation: "Conduction is the transfer of heat energy through a solid material without the material itself moving. Heat passes from molecule to molecule through the material from the hotter region to the cooler region. In fire safety, conduction can cause fire to spread through metal beams, pipes, and structural elements. For example, a steel beam heated by fire in one room can conduct enough heat to ignite materials in an adjacent room on the other side of a wall.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fire spread — conduction",
    category: "Understanding Fire"
  },
  {
    id: 15,
    question: "How does fire spread by convection?",
    options: [
      "Through the movement of heated air and gases rising and circulating",
      "Through direct contact with a flame",
      "Through electromagnetic radiation",
      "Through flammable liquids flowing along the ground"
    ],
    correctAnswer: 0,
    explanation: "Convection is the transfer of heat through the movement of heated fluids — primarily hot air and smoke gases in the context of fire. Hot gases rise because they are less dense than cool air, carrying heat upward and outward. Convection is the primary mechanism by which fire spreads vertically through buildings, via open stairwells, lift shafts, service risers, and other vertical openings. It is the most common cause of fire spread in multi-storey buildings.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fire spread — convection",
    category: "Understanding Fire"
  },
  {
    id: 16,
    question: "How does fire spread by radiation?",
    options: [
      "Through direct contact between burning materials",
      "Through the transfer of heat energy as electromagnetic waves (infrared radiation) that travel through air or vacuum",
      "Through the circulation of hot gases",
      "Through sparks carried by convection currents"
    ],
    correctAnswer: 1,
    explanation: "Radiation is the transfer of heat energy through electromagnetic waves (primarily infrared radiation) that travel through air or even vacuum without heating the air itself. Radiant heat can ignite combustible materials at a distance from the fire without direct contact. For example, a fully involved house fire can radiate enough heat to ignite a neighbouring property across a gap. Radiant heat is also the mechanism that causes flashover in a compartment fire.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fire spread — radiation",
    category: "Understanding Fire"
  },
  {
    id: 17,
    question: "What is 'direct flame contact' as a mechanism of fire spread?",
    options: [
      "Heat transfer through electromagnetic waves",
      "The physical touching of flames to combustible materials, igniting them",
      "Heat transfer through solid materials",
      "The spread of fire via molten metal"
    ],
    correctAnswer: 1,
    explanation: "Direct flame contact (also called direct burning) is the simplest mechanism of fire spread, where the flame physically touches adjacent combustible materials, heating them to their ignition temperature and causing them to ignite. This can occur horizontally (fire spreading along a combustible surface) or vertically (flames reaching up to ignite materials above). It is a key consideration in the design of fire separation and compartmentation.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Fire spread — direct",
    category: "Understanding Fire"
  },
  {
    id: 18,
    question: "What is the 'stack effect' in relation to fire spread in tall buildings?",
    options: [
      "The stacking of flammable materials in a store room",
      "The natural upward movement of air through a tall building due to temperature and pressure differences, which can accelerate the vertical spread of smoke and fire",
      "The effect of stacking fire extinguishers in a cupboard",
      "The collapse of a stack of building materials during a fire"
    ],
    correctAnswer: 1,
    explanation: "The stack effect (chimney effect) occurs in tall buildings where warm air inside the building rises and is replaced by cooler air entering at lower levels. This creates a natural vertical airflow through stairwells, lift shafts, and service risers. During a fire, the stack effect can rapidly draw smoke and hot gases upward through the building, spreading contamination to upper floors far from the fire origin. It is particularly significant in winter when the indoor/outdoor temperature difference is greatest.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Stack effect",
    category: "Understanding Fire"
  },
  {
    id: 19,
    question: "Which of the following is the most common cause of fire in UK workplaces?",
    options: [
      "Lightning strikes",
      "Deliberate ignition (arson)",
      "Volcanic activity",
      "Spontaneous combustion of brickwork"
    ],
    correctAnswer: 1,
    explanation: "Deliberate ignition (arson) is consistently one of the most common causes of fire in UK workplaces and commercial premises, accounting for a significant proportion of all non-dwelling fires. Electrical faults are the leading accidental cause. Effective arson prevention measures include perimeter security, CCTV, external lighting, secure waste storage (away from buildings), and removal of potential ignition materials from around the building.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Workplace fire causes — arson",
    category: "Understanding Fire"
  },
  {
    id: 20,
    question: "What is the most common accidental cause of fire in UK workplaces?",
    options: [
      "Cooking",
      "Smoking materials",
      "Electrical faults and misuse of electrical equipment",
      "Chemical reactions"
    ],
    correctAnswer: 2,
    explanation: "Electrical faults and the misuse of electrical equipment are the most common accidental cause of fire in UK workplaces. This includes overloaded sockets, damaged cables, faulty appliances, poor electrical installations, and lack of portable appliance testing (PAT). Regular inspection and maintenance of electrical installations (in accordance with BS 7671) and portable appliance testing are essential fire prevention measures.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Workplace fire causes — electrical",
    category: "Understanding Fire"
  },
  {
    id: 21,
    question: "How can poor housekeeping contribute to fire risk in the workplace?",
    options: [
      "It cannot — housekeeping has no effect on fire risk",
      "Accumulation of combustible waste, blocked escape routes, obstructed fire exits, and stored materials near heat sources all increase fire risk",
      "Poor housekeeping only affects aesthetics, not safety",
      "It only affects slip and trip hazards, not fire"
    ],
    correctAnswer: 1,
    explanation: "Poor housekeeping is a significant contributor to workplace fire risk. Accumulated waste materials (cardboard, paper, packaging) provide additional fuel for fire; blocked escape routes and obstructed fire exits impede evacuation; materials stored near heat sources or electrical equipment increase ignition risk; and dust accumulation in plant and machinery can cause overheating. Good housekeeping is one of the simplest and most effective fire prevention measures.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Workplace fire causes — housekeeping",
    category: "Understanding Fire"
  },
  {
    id: 22,
    question: "What is a 'fuel-controlled fire'?",
    options: [
      "A fire that is limited by the amount of fuel available",
      "A fire that is controlled using fuel as an extinguishing agent",
      "A fire that only burns liquid fuels",
      "A fire started deliberately using accelerants"
    ],
    correctAnswer: 0,
    explanation: "A fuel-controlled fire is one where the rate of burning is limited by the amount or type of fuel available rather than by the supply of oxygen. In a fuel-controlled fire, there is adequate ventilation to support combustion, and the fire will grow or diminish based on the fuel supply. Understanding whether a fire is fuel-controlled or ventilation-controlled is important for predicting fire behaviour and planning firefighting tactics.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fire behaviour",
    category: "Understanding Fire"
  },
  {
    id: 23,
    question: "What is a 'ventilation-controlled fire'?",
    options: [
      "A fire that is controlled by mechanical ventilation systems",
      "A fire where the rate of burning is limited by the available oxygen supply rather than by the fuel available",
      "A fire in a well-ventilated room",
      "A fire that can only occur outdoors"
    ],
    correctAnswer: 1,
    explanation: "A ventilation-controlled fire is one where the rate of burning is limited by the available oxygen supply. This typically occurs in compartment fires once the fire has consumed most of the available oxygen. If additional ventilation is introduced (e.g., a window breaks or a door is opened), the fire can intensify rapidly and may lead to a backdraught. After flashover, compartment fires are generally ventilation-controlled.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fire behaviour",
    category: "Understanding Fire"
  },
  {
    id: 24,
    question: "Why is smoke considered the greatest killer in fires rather than the flames themselves?",
    options: [
      "Because smoke is always hotter than flames",
      "Because toxic gases in smoke (primarily carbon monoxide and hydrogen cyanide) cause incapacitation and death before flames reach the victim, and thick smoke prevents evacuation by obscuring escape routes",
      "Because smoke only occurs outdoors",
      "Because flames cannot cause death"
    ],
    correctAnswer: 1,
    explanation: "Smoke is responsible for the majority of fire deaths. It contains toxic gases — primarily carbon monoxide (CO) which binds to haemoglobin 200 times more readily than oxygen, and hydrogen cyanide (HCN) which inhibits cellular respiration. Even small concentrations can cause rapid incapacitation and death. Dense smoke also obscures visibility, disorients occupants, and prevents them from finding escape routes. Hot smoke can cause thermal injury to the respiratory tract.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Smoke production",
    category: "Understanding Fire"
  },
  {
    id: 25,
    question: "What is the primary toxic gas produced in most fires that causes the majority of fire-related deaths?",
    options: [
      "Oxygen",
      "Carbon dioxide",
      "Carbon monoxide",
      "Nitrogen"
    ],
    correctAnswer: 2,
    explanation: "Carbon monoxide (CO) is the primary toxic gas produced in fires and is responsible for the majority of fire-related deaths. CO is produced by the incomplete combustion of carbon-based materials. It is colourless, odourless, and tasteless, making it undetectable without instruments. CO binds to haemoglobin approximately 200 times more readily than oxygen, forming carboxyhaemoglobin (COHb), which prevents oxygen transport in the blood.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Smoke production",
    category: "Understanding Fire"
  },
  {
    id: 26,
    question: "What are common sources of heat that can cause ignition in the workplace?",
    options: [
      "Only naked flames",
      "Electrical equipment, hot surfaces, friction, static electricity, hot work (welding/cutting), radiant heat, and naked flames",
      "Only lightning",
      "Only chemical reactions"
    ],
    correctAnswer: 1,
    explanation: "Heat sources that can cause ignition in the workplace include: electrical equipment (overloaded circuits, faulty wiring, arcing), hot surfaces (machinery, process equipment, heating systems), friction (grinding, cutting, overheated bearings), static electricity (especially around flammable vapours and dusts), hot work (welding, cutting, brazing, grinding), radiant heat (from furnaces, ovens, space heaters), and naked flames (gas burners, matches, lighters).",
    section: "Module 1",
    difficulty: "basic",
    topic: "Heat sources",
    category: "Understanding Fire"
  },
  {
    id: 27,
    question: "What is 'pyrolysis' in the context of fire science?",
    options: [
      "The process of extinguishing a fire with water",
      "The thermal decomposition of materials by heat, producing flammable gases and vapours that can then ignite",
      "The removal of oxygen from a room",
      "The process of testing fire extinguishers"
    ],
    correctAnswer: 1,
    explanation: "Pyrolysis is the thermal decomposition of solid or liquid materials by heat in the absence of, or with limited, oxygen. As a material is heated, it breaks down chemically and releases flammable gases and vapours. These pyrolysis products then mix with air above the material and can ignite if an ignition source is present or if the auto-ignition temperature is reached. Pyrolysis is a key process in the growth phase of fire and is the mechanism behind flashover, where radiant heat causes remote pyrolysis of materials across the compartment.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Fire science — pyrolysis",
    category: "Understanding Fire"
  },
  {
    id: 28,
    question: "What is the 'Lower Explosive Limit' (LEL) of a flammable gas or vapour?",
    options: [
      "The highest concentration of gas that will burn",
      "The lowest concentration of the gas or vapour in air that will support combustion when an ignition source is present",
      "The temperature at which the gas explodes",
      "The pressure at which a gas cylinder will rupture"
    ],
    correctAnswer: 1,
    explanation: "The Lower Explosive Limit (LEL), also known as the Lower Flammable Limit (LFL), is the minimum concentration of a flammable gas or vapour in air (expressed as a percentage by volume) that will support combustion when an ignition source is present. Below the LEL, the mixture is too lean to burn. For example, the LEL of methane is approximately 5% by volume in air. Gas detectors in workplaces typically alarm at 10% or 20% of the LEL to provide an early warning.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Flammable limits",
    category: "Understanding Fire"
  },
  {
    id: 29,
    question: "What is the 'Upper Explosive Limit' (UEL) of a flammable gas or vapour?",
    options: [
      "The minimum concentration that will burn",
      "The maximum concentration of the gas or vapour in air above which the mixture is too rich to support combustion",
      "The maximum safe storage temperature",
      "The highest pressure at which gas can be safely contained"
    ],
    correctAnswer: 1,
    explanation: "The Upper Explosive Limit (UEL), also known as the Upper Flammable Limit (UFL), is the maximum concentration of a flammable gas or vapour in air above which there is insufficient oxygen for combustion and the mixture is too rich to burn. Between the LEL and UEL is the flammable range. For methane, the UEL is approximately 15%. A concentration above the UEL is still extremely dangerous because any dilution with fresh air could bring the concentration back into the flammable range.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Flammable limits",
    category: "Understanding Fire"
  },
  {
    id: 30,
    question: "What happens to fire behaviour when the oxygen concentration in a compartment drops below approximately 16%?",
    options: [
      "The fire burns more intensely",
      "Flaming combustion is no longer supported, though smouldering may continue and hot, unburned pyrolysis gases accumulate",
      "The fire immediately and completely extinguishes",
      "The fire colour changes to blue"
    ],
    correctAnswer: 1,
    explanation: "When oxygen concentration drops below approximately 16%, flaming combustion can no longer be sustained. However, the fire does not necessarily go out — smouldering combustion may continue at even lower oxygen levels, and the material continues to pyrolyse, producing hot, unburned gases. These gases accumulate in the compartment and create the conditions for a potential backdraught if fresh air is suddenly introduced. This is why ventilation-controlled fires are particularly dangerous.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Fire behaviour",
    category: "Understanding Fire"
  },
  {
    id: 31,
    question: "What is meant by the 'fire load' of a building or compartment?",
    options: [
      "The weight of the fire detection system",
      "The total amount of combustible material within a space, expressed as an equivalent mass of wood per unit floor area (kg/m² or MJ/m²)",
      "The maximum number of people allowed in the building",
      "The structural load-bearing capacity of the building"
    ],
    correctAnswer: 1,
    explanation: "Fire load is a measure of the total amount of combustible material present in a given area, expressed as an equivalent mass of wood per unit floor area (kg/m²) or as energy per unit area (MJ/m²). It is a key factor in fire risk assessment and building fire safety design, as it determines the potential severity and duration of a fire. Higher fire loads require more robust fire protection measures including increased compartmentation, improved structural fire resistance, and enhanced detection and suppression systems.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fire load",
    category: "Understanding Fire"
  },
  {
    id: 32,
    question: "Hot work activities such as welding and cutting are a common cause of workplace fires. Why are they particularly hazardous?",
    options: [
      "Because they produce pleasant aromas that distract workers",
      "Because they generate extreme heat, sparks, and molten metal that can travel significant distances and ignite combustible materials",
      "Because they require electricity",
      "Because they can only be done indoors"
    ],
    correctAnswer: 1,
    explanation: "Hot work activities (welding, cutting, grinding, brazing) are a significant cause of workplace fires because they generate extreme temperatures (oxy-acetylene cutting can exceed 3,000°C), produce sparks and molten metal droplets that can travel up to 10 metres or more, and can ignite combustible materials that are not visible or easily accessible. The fire may not become apparent until hours after the hot work has finished. This is why hot work permits require a fire watch to be maintained during and for at least 60 minutes after the work.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Workplace fire causes — hot works",
    category: "Understanding Fire"
  },
  {
    id: 33,
    question: "What fire hazard is associated with the improper storage of chemicals in the workplace?",
    options: [
      "No hazard — chemicals are always safe when stored",
      "Incompatible chemicals can react and generate heat, toxic fumes, or flammable gases, and flammable liquids can release ignitable vapours",
      "Chemicals only present a hazard when being transported",
      "The only risk is label fading"
    ],
    correctAnswer: 1,
    explanation: "Improper chemical storage presents multiple fire hazards. Incompatible chemicals (such as oxidisers stored near flammable liquids) can react violently, generating heat and igniting spontaneously. Flammable liquids stored without proper ventilation can release vapours that accumulate to form ignitable concentrations. Chemicals must be stored in accordance with their Safety Data Sheet (SDS), DSEAR regulations, and the COSHH hierarchy, using appropriate fire-resistant storage cabinets with bunding.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Workplace fire causes — chemicals",
    category: "Understanding Fire"
  },
  {
    id: 34,
    question: "What is 'spontaneous combustion' and which workplace materials are susceptible to it?",
    options: [
      "Combustion caused by matches — only paper is susceptible",
      "Self-heating of a material to its ignition temperature without an external heat source, common in oily rags, linseed oil-soaked cloths, coal dust, and certain organic materials",
      "Combustion caused by sunlight through a window",
      "An explosion caused by gas leaks"
    ],
    correctAnswer: 1,
    explanation: "Spontaneous combustion occurs when a material self-heats through exothermic chemical reactions (typically oxidation) to the point where it reaches its ignition temperature without any external heat source. Materials susceptible include oily rags (particularly those soaked with drying oils such as linseed oil), coal dust, damp hay, certain metal powders, and organic waste. The risk increases when heat cannot dissipate — for example, oily rags left in a pile or a sealed container.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Spontaneous combustion",
    category: "Understanding Fire"
  },
  {
    id: 35,
    question: "What is the significance of the 'fire point' compared to the 'flash point'?",
    options: [
      "They are the same thing",
      "The fire point is the temperature at which a liquid produces enough vapour to sustain continuous combustion, typically a few degrees above the flash point",
      "The fire point is always lower than the flash point",
      "The fire point only applies to solid materials"
    ],
    correctAnswer: 1,
    explanation: "The fire point is the lowest temperature at which a flammable liquid produces sufficient vapour to sustain continuous combustion once ignited. It is typically a few degrees Celsius above the flash point. At the flash point, vapour may ignite momentarily but not sustain burning. At the fire point, the vapour production rate is high enough to support a continuous flame. The distinction is important in fire risk assessment when determining the conditions under which a spill could result in a sustained fire.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Flash point and fire point",
    category: "Understanding Fire"
  },
  {
    id: 36,
    question: "What is the effect of oxygen enrichment on fire behaviour?",
    options: [
      "It slows down combustion",
      "Materials burn more fiercely, at lower ignition temperatures, and materials that do not normally burn in air may become combustible",
      "It extinguishes the fire",
      "It has no effect on fire behaviour"
    ],
    correctAnswer: 1,
    explanation: "Oxygen enrichment (concentrations above the normal 20.9%) significantly increases fire risk. Materials burn more fiercely and at faster rates, ignition temperatures are lowered, and materials that would not normally burn in air (such as steel and some clothing fabrics) can become readily combustible. Oxygen enrichment can occur from leaking oxygen cylinders, medical oxygen equipment, and industrial processes. Even a small increase to 24% can dramatically increase fire risk.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Oxygen enrichment",
    category: "Understanding Fire"
  },
  {
    id: 37,
    question: "What is a 'dust explosion' and in what types of workplace can it occur?",
    options: [
      "An explosion caused by cleaning dust — only in offices",
      "A rapid combustion of fine combustible dust particles dispersed in air within an enclosed space, occurring in industries such as flour mills, woodworking, and grain storage",
      "An explosion caused by vacuuming — only in homes",
      "A dust explosion can only occur underground"
    ],
    correctAnswer: 1,
    explanation: "A dust explosion occurs when fine combustible dust particles suspended in air within an enclosed space are ignited. The rapid combustion of the dust cloud generates a pressure wave that can be devastating. Industries at risk include flour mills, grain storage, sugar processing, woodworking, coal handling, metal finishing (aluminium dust), pharmaceutical manufacturing, and any process generating fine organic or metallic dust. The DSEAR regulations specifically address explosive atmosphere risks from dust.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Dust explosions",
    category: "Understanding Fire"
  },
  {
    id: 38,
    question: "What role does smoking play as a cause of workplace fires?",
    options: [
      "Smoking has been completely eliminated as a fire cause in all UK workplaces",
      "Discarded smoking materials (cigarettes, matches, lighters) remain a fire cause, particularly in areas with poor housekeeping, near flammable materials, or where smoking policies are not enforced",
      "Smoking is only a fire risk outdoors",
      "Smoking causes fires only in domestic premises"
    ],
    correctAnswer: 1,
    explanation: "Despite the Smoke-free (Premises and Enforcement) Regulations 2006 banning smoking in enclosed workplaces, discarded smoking materials remain a cause of workplace fires. Fires can start in designated outdoor smoking areas if they are near combustible waste or building materials, from smoking materials disposed of improperly in bins, or from illicit smoking in prohibited areas. Effective controls include designated smoking areas away from buildings, use of fire-safe bins, and enforcement of no-smoking policies.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Workplace fire causes — smoking",
    category: "Understanding Fire"
  },
  {
    id: 39,
    question: "What is the 'flammable range' of a gas or vapour?",
    options: [
      "The distance a flammable gas can travel",
      "The range of concentrations in air between the Lower Explosive Limit (LEL) and Upper Explosive Limit (UEL) within which the gas-air mixture can be ignited",
      "The temperature range at which a gas is stored",
      "The shelf life of a flammable substance"
    ],
    correctAnswer: 1,
    explanation: "The flammable range (also known as the explosive range) is the range of concentrations of a flammable gas or vapour in air, between the LEL and UEL, within which the gas-air mixture can be ignited. For example, hydrogen has a very wide flammable range (4-75%), making it particularly hazardous, while methane has a narrower range (5-15%). Substances with wider flammable ranges present greater fire and explosion risks because a wider range of conditions can lead to ignition.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Flammable limits",
    category: "Understanding Fire"
  },
  {
    id: 40,
    question: "How does the vapour density of a flammable liquid affect fire safety in the workplace?",
    options: [
      "Vapour density has no effect on fire safety",
      "Vapours heavier than air (vapour density greater than 1) sink and accumulate at low levels such as basements, pits, and drains, where they may find ignition sources",
      "All vapours rise to the ceiling regardless of density",
      "Vapour density only affects the colour of the flame"
    ],
    correctAnswer: 1,
    explanation: "Most flammable liquid vapours are heavier than air (vapour density >1) and therefore sink to the lowest available point. This means vapours can accumulate in basements, cable trenches, inspection pits, drains, and other low-lying areas, potentially travelling considerable distances from the source to find an ignition source. For example, petrol vapour (vapour density approximately 3-4 times heavier than air) can flow along the ground like an invisible liquid. This is a critical consideration in workplace fire risk assessments, particularly for storage and dispensing areas.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Vapour density",
    category: "Understanding Fire"
  },

  // =======================================================================
  // FIRE SAFETY LEGISLATION — 40 questions (id 41-80)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 41,
    question: "What is the primary piece of fire safety legislation for non-domestic premises in England and Wales?",
    options: [
      "The Health and Safety at Work etc. Act 1974",
      "The Regulatory Reform (Fire Safety) Order 2005 (RRFSO)",
      "The Building Regulations 2010",
      "The Fire Services Act 1947"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 (RRFSO) is the primary piece of fire safety legislation covering all non-domestic premises in England and Wales. It replaced over 70 pieces of previous fire safety legislation and introduced a risk-based approach. The RRFSO places the duty for fire safety on the 'responsible person' rather than the fire authority, requiring them to carry out a fire risk assessment and implement appropriate fire safety measures.",
    section: "Module 2",
    difficulty: "basic",
    topic: "RRFSO 2005",
    category: "Fire Safety Legislation"
  },
  {
    id: 42,
    question: "Who is defined as the 'responsible person' under the RRFSO 2005?",
    options: [
      "The local fire brigade chief",
      "Any employee who works in the building",
      "The employer, or in relation to premises not connected with work, the person who has control of the premises",
      "The building insurance company"
    ],
    correctAnswer: 2,
    explanation: "Under Article 3 of the RRFSO 2005, the 'responsible person' is the employer (if the workplace is to any extent under their control), or in relation to any other premises, the person who has control of the premises in connection with carrying on a trade, business, or other undertaking. In shared premises, there may be multiple responsible persons who must cooperate and coordinate fire safety measures under Article 22.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Responsible person",
    category: "Fire Safety Legislation"
  },
  {
    id: 43,
    question: "What does Article 9 of the RRFSO 2005 require the responsible person to do?",
    options: [
      "Install sprinklers in all premises",
      "Carry out a suitable and sufficient fire risk assessment",
      "Employ a full-time fire marshal",
      "Register the premises with the local fire authority"
    ],
    correctAnswer: 1,
    explanation: "Article 9 of the RRFSO 2005 requires the responsible person to make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions they need to take. The assessment must be reviewed regularly, particularly when there is reason to suspect it is no longer valid or there has been a significant change in the matters to which it relates. Where five or more people are employed, the significant findings must be recorded.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Fire risk assessment",
    category: "Fire Safety Legislation"
  },
  {
    id: 44,
    question: "What are the five steps of a fire risk assessment as recommended by HM Government fire safety guidance?",
    options: [
      "Plan, do, check, act, review",
      "Identify fire hazards, identify people at risk, evaluate/remove/reduce/protect from risk, record/plan/inform/instruct/train, review",
      "Inspect, report, repair, test, certify",
      "Assess, design, install, commission, maintain"
    ],
    correctAnswer: 1,
    explanation: "The five-step fire risk assessment process is: (1) Identify fire hazards — sources of ignition, fuel, and oxygen; (2) Identify people at risk — employees, visitors, contractors, vulnerable persons; (3) Evaluate, remove, reduce, and protect from risk — implement fire precautions; (4) Record, plan, inform, instruct, and train — document findings and communicate them; (5) Review — keep the assessment under regular review and update as necessary.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Five-step fire risk assessment",
    category: "Fire Safety Legislation"
  },
  {
    id: 45,
    question: "Under Article 8 of the RRFSO 2005, what is the 'duty to take general fire precautions'?",
    options: [
      "Only to install fire extinguishers",
      "To take such general fire precautions as will ensure, so far as is reasonably practicable, the safety of any relevant persons",
      "To phone the fire brigade once a week",
      "To lock all doors to prevent arson"
    ],
    correctAnswer: 1,
    explanation: "Article 8 requires the responsible person to take such general fire precautions as will ensure, so far as is reasonably practicable, the safety of any of their employees, and in relation to relevant persons who are not employees, to take such general fire precautions as may reasonably be required to ensure that the premises are safe. General fire precautions include measures for prevention, detection, warning, escape, firefighting, and mitigation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 8",
    category: "Fire Safety Legislation"
  },
  {
    id: 46,
    question: "What does Article 11 of the RRFSO 2005 require regarding fire safety arrangements?",
    options: [
      "Nothing — it has been repealed",
      "The responsible person must make and give effect to appropriate fire safety arrangements for the effective planning, organisation, control, monitoring, and review of fire preventive and protective measures",
      "It requires the installation of automatic sprinkler systems",
      "It requires a full-time fire safety officer on site"
    ],
    correctAnswer: 1,
    explanation: "Article 11 requires the responsible person to make and give effect to appropriate arrangements for the effective planning, organisation, control, monitoring, and review of the preventive and protective measures. Where five or more people are employed, these arrangements must be recorded. This article establishes the management system approach to fire safety, ensuring it is not a one-off exercise but an ongoing, managed process.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 11",
    category: "Fire Safety Legislation"
  },
  {
    id: 47,
    question: "What does Article 13 of the RRFSO 2005 require regarding fire-fighting and fire detection?",
    options: [
      "Only smoke detectors in bedrooms",
      "The premises must be equipped with appropriate fire-fighting equipment and fire detectors and alarms, and any non-automatic equipment must be easily accessible and indicated by signs",
      "Only fire blankets in kitchens",
      "Fire detection is optional for small businesses"
    ],
    correctAnswer: 1,
    explanation: "Article 13 requires the responsible person to ensure that the premises are equipped to an appropriate extent with appropriate fire-fighting equipment and with fire detectors and alarms. Non-automatic fire-fighting equipment (such as extinguishers) must be easily accessible, simple to use, and indicated by signs. The equipment must be suitable for the types of fire that may occur, and persons must be nominated and trained to use it.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 13",
    category: "Fire Safety Legislation"
  },
  {
    id: 48,
    question: "What does Article 14 of the RRFSO 2005 require regarding emergency routes and exits?",
    options: [
      "Emergency routes must lead to car parks only",
      "Emergency routes and exits must lead as directly as possible to a place of safety, be kept clear at all times, be adequately lit, and be indicated by signs",
      "Only one exit per building is required",
      "Emergency routes need only be accessible during business hours"
    ],
    correctAnswer: 1,
    explanation: "Article 14 requires that routes to emergency exits and the exits themselves are kept clear at all times, lead as directly as possible to a place of safety, are adequate in number and width for the number of persons who may need to use them, have emergency lighting where needed, and are indicated by signs complying with the Health and Safety (Safety Signs and Signals) Regulations 1996. Sliding or revolving doors must not be used as emergency exits unless they can open in the direction of escape.",
    section: "Module 2",
    difficulty: "basic",
    topic: "RRFSO Article 14",
    category: "Fire Safety Legislation"
  },
  {
    id: 49,
    question: "What does Article 15 of the RRFSO 2005 require regarding procedures for serious and imminent danger?",
    options: [
      "Workers must continue working during a fire until told otherwise",
      "The responsible person must establish appropriate procedures to be followed in the event of serious and imminent danger, nominate competent persons, and ensure persons are able to stop work and go to a place of safety",
      "Only the fire brigade is responsible for evacuation procedures",
      "No procedures are required for premises with fewer than 10 workers"
    ],
    correctAnswer: 1,
    explanation: "Article 15 requires the responsible person to establish and implement appropriate procedures to be followed in the event of serious and imminent danger, including nominating a sufficient number of competent persons to implement evacuation procedures. Workers exposed to serious and imminent danger must be informed and must be able to stop work and immediately proceed to a place of safety. Workers must not be required to resume work while a serious and imminent danger persists.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 15",
    category: "Fire Safety Legislation"
  },
  {
    id: 50,
    question: "What does Article 17 of the RRFSO 2005 require regarding maintenance of fire safety measures?",
    options: [
      "Maintenance is only required for new buildings",
      "The responsible person must ensure that the premises, any facilities, equipment, and devices provided for fire safety are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order, and in good repair",
      "Maintenance records are not required",
      "Only fire extinguishers need to be maintained"
    ],
    correctAnswer: 1,
    explanation: "Article 17 requires the responsible person to ensure that the premises and any facilities, equipment, and devices provided for the purposes of fire safety (including fire alarms, emergency lighting, fire doors, fire extinguishers, sprinkler systems, and passive fire protection) are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order, and in good repair. Where the premises are covered by a licence or registration, any conditions relating to fire safety must also be observed.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 17",
    category: "Fire Safety Legislation"
  },
  {
    id: 51,
    question: "What does Article 18 of the RRFSO 2005 require regarding safety assistance?",
    options: [
      "The responsible person must rely solely on the fire brigade for advice",
      "The responsible person must appoint one or more competent persons to assist in undertaking the preventive and protective measures required by the Order",
      "Only external consultants can provide fire safety assistance",
      "No assistance is required if the premises are small"
    ],
    correctAnswer: 1,
    explanation: "Article 18 requires the responsible person to appoint one or more competent persons to assist in undertaking the preventive and protective measures required under the Order. A competent person is someone with sufficient training, experience, and knowledge to enable them to properly assist. Where possible, the responsible person should appoint from among their own employees. If external competent assistance is engaged, the responsible person must provide them with relevant information about the premises.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 18 — competent person",
    category: "Fire Safety Legislation"
  },
  {
    id: 52,
    question: "What is the role of a 'competent person' under the RRFSO 2005?",
    options: [
      "To fight fires on behalf of the fire service",
      "A person with sufficient training, experience, and knowledge or other qualities to properly assist the responsible person in undertaking fire safety measures",
      "Any person who owns a fire extinguisher",
      "A person appointed by the HSE to inspect premises"
    ],
    correctAnswer: 1,
    explanation: "A competent person under the RRFSO is someone with sufficient training, experience, and knowledge or other qualities to enable them to properly assist the responsible person in undertaking fire preventive and protective measures. The level of competence required depends on the complexity of the premises and the fire risks present. For simple premises, the responsible person may be able to carry out the fire risk assessment themselves; for more complex premises, a specialist fire risk assessor may be needed.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Competent person",
    category: "Fire Safety Legislation"
  },
  {
    id: 53,
    question: "What does Article 21 of the RRFSO 2005 require regarding the provision of information to employees?",
    options: [
      "No information needs to be provided to employees",
      "The responsible person must provide employees with comprehensible and relevant information on the risks identified by the fire risk assessment, the fire preventive and protective measures, the identity of competent persons, and the emergency procedures",
      "Only managers need to receive information",
      "Information is only required during a fire drill"
    ],
    correctAnswer: 1,
    explanation: "Article 21 requires the responsible person to provide their employees with comprehensible and relevant information on: the risks to them identified by the fire risk assessment; the preventive and protective measures taken; the procedures for serious and imminent danger; the identities of competent persons nominated for evacuation; and any special risks arising from dangerous substances. The information must be understandable — accounting for language barriers or disabilities.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 21",
    category: "Fire Safety Legislation"
  },
  {
    id: 54,
    question: "What does Article 22 of the RRFSO 2005 require when multiple responsible persons share a building?",
    options: [
      "Each responsible person only needs to concern themselves with their own area",
      "All responsible persons must cooperate and coordinate with each other to ensure fire safety duties are fulfilled across the entire premises",
      "The largest organisation takes sole responsibility",
      "The building landlord has no responsibilities"
    ],
    correctAnswer: 1,
    explanation: "Article 22 requires that where two or more responsible persons share, or have duties in respect of, the same premises, they must cooperate and coordinate with each other to enable each of them to comply with the requirements of the Order. Each must inform the others of any risks to relevant persons arising from their activities. This is particularly important in multi-tenanted buildings where fire safety measures (such as common escape routes and alarm systems) need to be coordinated.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "RRFSO Article 22",
    category: "Fire Safety Legislation"
  },
  {
    id: 55,
    question: "What enforcement powers does the fire and rescue authority have under the RRFSO 2005?",
    options: [
      "No enforcement powers — they can only advise",
      "They can issue alterations notices, enforcement notices, and prohibition notices, and can prosecute for offences",
      "They can only issue verbal warnings",
      "They can only enforce regulations in residential premises"
    ],
    correctAnswer: 1,
    explanation: "Fire and rescue authorities have significant enforcement powers under the RRFSO. They can issue: an alterations notice (requiring the responsible person to notify them before making specified changes), an enforcement notice (requiring specific actions to be taken within a specified time), or a prohibition notice (prohibiting or restricting the use of all or part of the premises if there is a serious risk to relevant persons). They can also prosecute for offences under the Order, which can result in unlimited fines and up to two years' imprisonment.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Enforcement and penalties",
    category: "Fire Safety Legislation"
  },
  {
    id: 56,
    question: "What maximum penalties can be imposed for fire safety offences under the RRFSO 2005 (as amended)?",
    options: [
      "A maximum fine of £100",
      "Unlimited fines and/or imprisonment for up to two years (summary conviction), or unlimited fines and/or imprisonment on indictment",
      "A written warning only",
      "Community service only"
    ],
    correctAnswer: 1,
    explanation: "Fire safety offences under the RRFSO can result in severe penalties. On summary conviction, the maximum penalty is an unlimited fine and/or imprisonment for up to 12 months. On conviction on indictment, the penalty can be an unlimited fine and/or imprisonment for up to two years. The Fire Safety Act 2021 further strengthened penalties, and under the Health and Safety at Work etc. Act 1974 (where applicable), penalties for fire-related health and safety offences can include unlimited fines.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Enforcement and penalties",
    category: "Fire Safety Legislation"
  },
  {
    id: 57,
    question: "What significant change did the Fire Safety Act 2021 introduce?",
    options: [
      "It replaced the RRFSO 2005 entirely",
      "It clarified that the RRFSO applies to the structure, external walls (including cladding), and flat entrance doors of multi-occupied residential buildings",
      "It removed the requirement for fire risk assessments",
      "It transferred fire safety responsibility from landlords to tenants"
    ],
    correctAnswer: 1,
    explanation: "The Fire Safety Act 2021, enacted in response to the Grenfell Tower tragedy, clarified that the RRFSO 2005 applies to the structure, external walls (including windows, balconies, and cladding systems), and individual flat entrance doors in multi-occupied residential buildings that contain two or more sets of domestic premises. This addressed the ambiguity about whether the RRFSO covered these building elements, ensuring they are included in fire risk assessments and maintenance regimes.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Fire Safety Act 2021",
    category: "Fire Safety Legislation"
  },
  {
    id: 58,
    question: "What did the Building Safety Act 2022 introduce in relation to fire safety in high-rise residential buildings?",
    options: [
      "Nothing relating to fire safety",
      "A new regulatory regime for higher-risk buildings including a Building Safety Regulator, mandatory safety case reports, and a residents' engagement strategy",
      "It only applies to commercial buildings",
      "It reduced fire safety requirements for all buildings"
    ],
    correctAnswer: 1,
    explanation: "The Building Safety Act 2022, also prompted by the Grenfell Tower tragedy, established a new regulatory regime for higher-risk buildings (residential buildings at least 18 metres tall or with at least 7 storeys, containing at least 2 residential units). It created the Building Safety Regulator (within HSE), introduced mandatory safety case reports, required a named Accountable Person, established residents' rights including a residents' engagement strategy, and created a new homes ombudsman scheme.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Building Safety Act 2022",
    category: "Fire Safety Legislation"
  },
  {
    id: 59,
    question: "How does the Health and Safety at Work etc. Act 1974 (HASAWA) relate to fire safety?",
    options: [
      "It has no relevance to fire safety",
      "It imposes general duties on employers to ensure the health, safety, and welfare of employees, which includes fire safety as far as it is part of a workplace hazard",
      "It only covers fire safety in mines",
      "It was repealed by the RRFSO 2005"
    ],
    correctAnswer: 1,
    explanation: "HASAWA 1974 imposes general duties on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees (Section 2) and a duty to non-employees (Section 3). Fire is a workplace hazard, so HASAWA applies alongside the RRFSO. HSE enforces HASAWA in relation to process fire/explosion risks (e.g., DSEAR), while fire and rescue authorities enforce the RRFSO for general fire safety. Both regulators coordinate their activities.",
    section: "Module 2",
    difficulty: "basic",
    topic: "HASAWA 1974",
    category: "Fire Safety Legislation"
  },
  {
    id: 60,
    question: "What do the Management of Health and Safety at Work Regulations 1999 require in relation to fire safety?",
    options: [
      "Nothing — they do not cover fire",
      "They require employers to carry out risk assessments (including fire risks), implement preventive and protective measures, appoint competent persons, provide information and training, and establish emergency procedures",
      "They only require fire drills once a year",
      "They only apply to factories"
    ],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 require employers to carry out suitable and sufficient risk assessments (Regulation 3), which include fire risks as part of overall workplace hazards. They also require implementation of preventive and protective measures, appointment of competent persons, provision of information and training to employees, procedures for serious and imminent danger, and cooperation between employers sharing workplaces. These requirements complement the RRFSO.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Management Regs 1999",
    category: "Fire Safety Legislation"
  },
  {
    id: 61,
    question: "What do the Building Regulations 2010 Approved Document B (Fire Safety) cover?",
    options: [
      "Only the colour of buildings",
      "The fire safety design and construction requirements for new buildings and building works, including means of escape, internal fire spread, external fire spread, and access for fire services",
      "Only the structural load-bearing capacity of buildings",
      "Only listed building conservation requirements"
    ],
    correctAnswer: 1,
    explanation: "Approved Document B of the Building Regulations 2010 provides guidance on fire safety requirements for new buildings and building works. It is divided into Volume 1 (dwelling houses) and Volume 2 (buildings other than dwelling houses) and covers: B1 — means of warning and escape; B2 — internal fire spread (linings); B3 — internal fire spread (structure including compartmentation); B4 — external fire spread; and B5 — access and facilities for the fire service. Compliance with ADB does not guarantee compliance with the RRFSO.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Building Regulations Part B",
    category: "Fire Safety Legislation"
  },
  {
    id: 62,
    question: "What is BS 5839 and what does it cover?",
    options: [
      "A standard for fire extinguisher colours",
      "The code of practice for the design, installation, commissioning, and maintenance of fire detection and fire alarm systems in buildings",
      "A standard for fire door ironmongery only",
      "A standard for fire blankets"
    ],
    correctAnswer: 1,
    explanation: "BS 5839 is the British Standard covering fire detection and fire alarm systems. Part 1 deals with non-domestic premises and Part 6 deals with domestic premises. It provides comprehensive guidance on system design (including category of system — L1 to L5 and P1/P2/M), installation, commissioning, maintenance, and management. BS 5839-1 is the key standard referenced by fire risk assessors when specifying the appropriate level of fire detection for a building.",
    section: "Module 2",
    difficulty: "basic",
    topic: "BS 5839",
    category: "Fire Safety Legislation"
  },
  {
    id: 63,
    question: "What is BS 5266 and what does it cover?",
    options: [
      "A standard for fire alarm call points",
      "The code of practice for emergency lighting design, installation, and maintenance",
      "A standard for fire sprinkler systems",
      "A standard for fire safety signage"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 is the British Standard for emergency lighting. Part 1 provides the code of practice for the emergency escape lighting of premises, covering design, installation, wiring, testing, and maintenance. Emergency lighting is essential to illuminate escape routes and fire safety equipment during a mains power failure. BS 5266 specifies minimum illumination levels (1 lux on escape routes), duration (minimum 3 hours in most cases), and testing requirements (monthly functional test and annual full-duration test).",
    section: "Module 2",
    difficulty: "basic",
    topic: "BS 5266",
    category: "Fire Safety Legislation"
  },
  {
    id: 64,
    question: "What is BS 9999 and how does it relate to fire safety?",
    options: [
      "A standard for fire marshals' uniforms",
      "A code of practice for fire safety in the design, management, and use of buildings, providing a risk-based framework as an alternative to Approved Document B",
      "A standard for fire extinguisher servicing",
      "A standard that only applies to hospitals"
    ],
    correctAnswer: 1,
    explanation: "BS 9999 is a code of practice for fire safety in the design, management, and use of buildings. It provides a more flexible, risk-based approach to fire safety design compared to the prescriptive guidance in Approved Document B. BS 9999 uses risk profiles to tailor fire safety provisions to the specific characteristics of a building and its occupants. It covers means of escape, structural fire protection, fire detection, suppression systems, and the management of fire safety.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "BS 9999",
    category: "Fire Safety Legislation"
  },
  {
    id: 65,
    question: "Under the RRFSO 2005, Article 5, who does the Order apply to (the 'relevant persons')?",
    options: [
      "Only employees",
      "Any person who is or may be lawfully on the premises, and any person in the immediate vicinity who is at risk from a fire on the premises",
      "Only firefighters attending the premises",
      "Only the building owner"
    ],
    correctAnswer: 1,
    explanation: "Article 2 of the RRFSO defines 'relevant persons' as any person who is or may be lawfully on the premises, including employees, visitors, contractors, customers, members of the public, and any person in the immediate vicinity of the premises who is at risk from fire on the premises. The responsible person's duties extend to all relevant persons, not just employees. This wide definition ensures that everyone potentially affected by a fire is protected.",
    section: "Module 2",
    difficulty: "basic",
    topic: "RRFSO scope",
    category: "Fire Safety Legislation"
  },
  {
    id: 66,
    question: "What is an 'alterations notice' under the RRFSO 2005?",
    options: [
      "A notice requiring alterations to the building structure",
      "A notice served by the fire authority requiring the responsible person to notify them before making changes to the premises or its use that could increase fire risk or affect fire safety measures",
      "A notice informing tenants of planned building works",
      "A planning permission notice"
    ],
    correctAnswer: 1,
    explanation: "An alterations notice under Article 29 of the RRFSO is served by the fire and rescue authority on premises where the fire risk is or may be high, requiring the responsible person to notify the authority before making any changes to the premises, the services or equipment in the premises, or the use of the premises, that could increase the fire risk or affect the adequacy of fire precautions. This allows the authority to review and comment on proposed changes before they are implemented.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Enforcement notices",
    category: "Fire Safety Legislation"
  },
  {
    id: 67,
    question: "What is a 'prohibition notice' under the RRFSO 2005?",
    options: [
      "A notice prohibiting smoking on the premises",
      "A notice served by the fire authority prohibiting or restricting the use of all or part of the premises because the use involves a risk of death or serious injury to relevant persons that is so serious that the use should be prohibited or restricted",
      "A notice prohibiting the sale of fire extinguishers",
      "A notice prohibiting access to the fire escape"
    ],
    correctAnswer: 1,
    explanation: "A prohibition notice under Article 31 of the RRFSO is the most serious enforcement action available to the fire authority. It is served when the fire authority considers that the use of premises involves or will involve a risk to relevant persons so serious that the use of the premises ought to be prohibited or restricted until the matter is remedied. A prohibition notice takes immediate effect. Non-compliance is a criminal offence. It may require closure of the premises entirely.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Enforcement notices",
    category: "Fire Safety Legislation"
  },
  {
    id: 68,
    question: "Under Article 19 of the RRFSO 2005, what must the responsible person provide to employees?",
    options: [
      "Free fire extinguishers for home use",
      "Adequate fire safety training at the time of recruitment and on being exposed to new or increased risks, repeated periodically, and adapted to take account of new or changed risks",
      "A copy of the Building Regulations",
      "A personal fire alarm"
    ],
    correctAnswer: 1,
    explanation: "Article 21 (often referenced alongside Article 19 for training) requires that the responsible person must ensure that employees are provided with adequate safety training at the time of their recruitment, and upon being exposed to new or increased risks. Training must be repeated periodically, adapted to take account of new or changed risks, provided during working hours, and at no cost to the employee. It should cover fire risks, fire prevention, what to do on discovering a fire, how to raise the alarm, and evacuation procedures.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Employee training",
    category: "Fire Safety Legislation"
  },
  {
    id: 69,
    question: "What are the CDM 2015 Regulations and how do they relate to fire safety?",
    options: [
      "They are regulations about CD and DVD manufacturing",
      "The Construction (Design and Management) Regulations 2015 require that fire safety is considered during the design and construction phases of building projects, including safe means of escape from construction sites",
      "They only relate to demolition works",
      "They do not have any fire safety requirements"
    ],
    correctAnswer: 1,
    explanation: "The Construction (Design and Management) Regulations 2015 (CDM 2015) require that fire safety is considered throughout the design and construction process. Designers must eliminate or reduce fire hazards in their designs; principal contractors must plan and manage fire safety on construction sites, including maintaining means of escape, providing fire detection, and preparing site-specific fire safety plans; and the principal designer must coordinate fire safety across all design disciplines. Fire on construction sites is a significant risk due to hot work, temporary electrical installations, and combustible construction materials.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CDM 2015",
    category: "Fire Safety Legislation"
  },
  {
    id: 70,
    question: "When must a fire risk assessment be reviewed under the RRFSO 2005?",
    options: [
      "Only once every 10 years",
      "When there is reason to suspect it is no longer valid, after a significant change in the matters to which it relates, or after a fire or near-miss incident",
      "Only when ordered by the fire brigade",
      "Never — once completed it is permanent"
    ],
    correctAnswer: 1,
    explanation: "Article 9(3) of the RRFSO requires the fire risk assessment to be reviewed regularly and specifically when there is reason to suspect it is no longer valid or where there has been a significant change in the matters to which it relates. Triggers for review include changes to the building layout or use, introduction of new processes or materials, changes in the number or type of occupants, after a fire or near-miss, following enforcement action, and as part of a periodic planned review (typically annually as good practice).",
    section: "Module 2",
    difficulty: "basic",
    topic: "Fire risk assessment review",
    category: "Fire Safety Legislation"
  },
  {
    id: 71,
    question: "What is the DSEAR 2002 and how does it relate to fire safety?",
    options: [
      "A regulation about data security",
      "The Dangerous Substances and Explosive Atmospheres Regulations 2002 require employers to assess and control risks from dangerous substances that could cause fire, explosion, or similar energy-releasing events",
      "A regulation about noise at work",
      "A regulation about manual handling"
    ],
    correctAnswer: 1,
    explanation: "DSEAR 2002 (Dangerous Substances and Explosive Atmospheres Regulations) requires employers to identify dangerous substances in the workplace, assess the risks from fires and explosions, and put controls in place to either eliminate or reduce those risks. It covers any substance that has the potential to create a risk from fire, explosion, or similar energy-releasing event, including flammable liquids, gases, dusts, and mists. DSEAR implements EU ATEX Directive 1999/92/EC and is enforced alongside the RRFSO.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "DSEAR 2002",
    category: "Fire Safety Legislation"
  },
  {
    id: 72,
    question: "Under the RRFSO 2005, who can carry out the fire risk assessment?",
    options: [
      "Only an employee of the local fire authority",
      "The responsible person themselves (if competent) or a competent person appointed by the responsible person",
      "Only a chartered fire engineer",
      "Only a building control officer"
    ],
    correctAnswer: 1,
    explanation: "The RRFSO does not prescribe specific qualifications for fire risk assessors. The responsible person can carry out the assessment themselves if they are competent, or they can appoint a competent person. For simple, low-risk premises, the responsible person may be sufficiently competent after appropriate training. For complex or high-risk premises, a specialist fire risk assessor with relevant qualifications and experience should be engaged. Third-party certification schemes (such as those by BAFE or IFE) provide assurance of competence.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Fire risk assessment",
    category: "Fire Safety Legislation"
  },
  {
    id: 73,
    question: "What is the difference between an 'enforcement notice' and a 'prohibition notice' under the RRFSO 2005?",
    options: [
      "There is no difference — they are the same thing",
      "An enforcement notice requires specific actions within a time limit; a prohibition notice requires immediate cessation of use due to a serious and imminent risk of death or serious injury",
      "An enforcement notice is issued by the police; a prohibition notice is issued by the fire service",
      "An enforcement notice applies to residential premises only; a prohibition notice applies to commercial premises only"
    ],
    correctAnswer: 1,
    explanation: "An enforcement notice (Article 30) is served when the fire authority is of the opinion that the responsible person has failed to comply with the RRFSO, and specifies the steps to be taken and the time period for compliance. A prohibition notice (Article 31) is served when the risk is so serious that the use of the premises should be restricted or prohibited immediately. A prohibition notice takes effect immediately (or at a specified time), whereas an enforcement notice allows a time period for compliance.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Enforcement notices",
    category: "Fire Safety Legislation"
  },
  {
    id: 74,
    question: "What is the duty of employees under Article 23 of the RRFSO 2005?",
    options: [
      "Employees have no duties under the RRFSO",
      "Employees must take reasonable care for the safety of themselves and others, cooperate with the responsible person, and inform the employer of any situation they consider a serious and immediate danger or any shortcomings in fire safety arrangements",
      "Employees are only required to attend fire drills",
      "Employees are only required to know the location of fire extinguishers"
    ],
    correctAnswer: 1,
    explanation: "Article 23 places duties on employees to take reasonable care for the safety of themselves and of other relevant persons who may be affected by their acts or omissions at work, to cooperate with the responsible person to enable them to comply with the Order, and to inform the responsible person (or any other employee with responsibility for fire safety) of any work situation that represents a serious and immediate danger, and of any shortcomings in the employer's fire safety arrangements.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Employee duties",
    category: "Fire Safety Legislation"
  },
  {
    id: 75,
    question: "What specific requirement does Article 9(6) of the RRFSO place on the fire risk assessment where dangerous substances are present?",
    options: [
      "No special requirements for dangerous substances",
      "The fire risk assessment must include consideration of the hazardous properties of the substance, how it is used, stored, and transported, the likelihood of an explosive atmosphere occurring, and the adequacy of measures to prevent ignition",
      "Dangerous substances must simply be removed from the premises",
      "Only the quantity of the substance needs to be recorded"
    ],
    correctAnswer: 1,
    explanation: "Article 9(6) requires that where a dangerous substance is or may be present in or on the premises, the fire risk assessment must include consideration of the hazardous properties of the substance, the circumstances of the work including how it is stored and handled, the likelihood of a hazardous concentration or explosive atmosphere occurring, the persons who may be at risk, and the adequacy of measures to prevent or limit the effects of fire or explosion. This aligns with DSEAR requirements and ensures that chemical fire risks are specifically addressed.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Dangerous substances in FRA",
    category: "Fire Safety Legislation"
  },
  {
    id: 76,
    question: "What record-keeping requirements exist under the RRFSO 2005?",
    options: [
      "No records are required under any circumstances",
      "Where the employer employs five or more persons, the significant findings of the fire risk assessment must be recorded, including the fire safety measures in place and any groups of persons identified as being especially at risk",
      "Records are only required for premises with over 100 employees",
      "Only fire drill records need to be kept"
    ],
    correctAnswer: 1,
    explanation: "Article 9(7) of the RRFSO requires that where the employer employs five or more persons, the significant findings of the fire risk assessment must be recorded, including the measures taken or to be taken in respect of the general fire precautions, and any group of persons identified as being especially at risk. In practice, it is good practice to record the fire risk assessment regardless of the number of employees, as it demonstrates compliance and provides a benchmark for future reviews.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Record keeping",
    category: "Fire Safety Legislation"
  },
  {
    id: 77,
    question: "How does the Equality Act 2010 relate to fire safety and evacuation?",
    options: [
      "It has no relevance to fire safety",
      "It requires that fire safety arrangements, including evacuation plans, make reasonable adjustments for disabled persons to ensure they are not placed at a substantial disadvantage",
      "It only applies to wheelchair users",
      "It exempts disabled persons from evacuation procedures"
    ],
    correctAnswer: 1,
    explanation: "The Equality Act 2010 requires that reasonable adjustments are made for disabled persons. In the context of fire safety, this means that evacuation plans must account for persons with mobility impairments, sensory impairments (visual, hearing), cognitive impairments, and temporary disabilities. Measures may include personal emergency evacuation plans (PEEPs), refuge areas, visual/vibrating fire alarm devices, evacuation chairs, and trained evacuation assistants. A blanket 'wait for the fire service' approach may not be sufficient.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Equality Act and evacuation",
    category: "Fire Safety Legislation"
  },
  {
    id: 78,
    question: "What is a Personal Emergency Evacuation Plan (PEEP)?",
    options: [
      "A fire alarm system designed for individuals",
      "A tailored plan developed for an individual who may need assistance to evacuate a building in an emergency, detailing the specific arrangements for their safe evacuation",
      "A personal insurance policy for fire damage",
      "A plan for the fire brigade to rescue specific individuals"
    ],
    correctAnswer: 1,
    explanation: "A Personal Emergency Evacuation Plan (PEEP) is a bespoke plan developed for an individual who may need assistance to evacuate safely in an emergency. It identifies the individual's specific needs, the assistance required, the person(s) responsible for providing that assistance, the evacuation route to be used, any equipment needed (such as an evacuation chair), and the refuge area to be used if applicable. PEEPs should be reviewed regularly and practised with the individual. They are required under both the RRFSO and the Equality Act.",
    section: "Module 2",
    difficulty: "basic",
    topic: "PEEP",
    category: "Fire Safety Legislation"
  },
  {
    id: 79,
    question: "What is the legal duty of the responsible person regarding fire safety training under the RRFSO 2005?",
    options: [
      "Training is optional and at the employer's discretion",
      "The responsible person must ensure employees receive adequate fire safety training when first employed, when exposed to new or increased risks, and periodically thereafter — provided during working hours and at no cost to the employee",
      "Training is only required for fire marshals",
      "Training is only required after a fire occurs"
    ],
    correctAnswer: 1,
    explanation: "Under Articles 19 and 21 of the RRFSO, the responsible person must ensure that employees receive adequate fire safety training at the time of initial employment, when exposed to new or increased risks (e.g., change of role, new hazards introduced, change in procedures), and at periodic intervals as appropriate. Training must be provided during working hours and at no cost to the employee. It must be adapted to take account of new or changed risks and must be appropriate to the role of the employee.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Training requirements",
    category: "Fire Safety Legislation"
  },
  {
    id: 80,
    question: "Under Article 5(3) of the RRFSO 2005, what hierarchy must the responsible person follow when implementing fire safety measures?",
    options: [
      "There is no hierarchy — any measures will do",
      "The principles of prevention in Schedule 1: avoid risks, evaluate unavoidable risks, combat risks at source, adapt work to the individual, adapt to technical progress, replace dangerous with non/less dangerous, develop a coherent prevention policy, give collective measures priority, and give appropriate instructions",
      "Cost must be the primary consideration",
      "The most expensive option must always be chosen"
    ],
    correctAnswer: 1,
    explanation: "Article 5(3) requires the responsible person to follow the principles of prevention set out in Schedule 1 (Part 3) of the RRFSO, which mirror the general principles of prevention from EU Directive 89/391/EEC. These include: avoiding risks, evaluating risks that cannot be avoided, combating risks at source, adapting work to the individual, adapting to technical progress, replacing the dangerous with the non-dangerous or less dangerous, developing a coherent overall prevention policy, giving priority to collective protective measures, and giving appropriate instructions to employees.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Principles of prevention",
    category: "Fire Safety Legislation"
  },

  // =======================================================================
  // FIRE PREVENTION & DETECTION — 20 questions (id 81-100, first half)
  // ~7 basic, ~9 intermediate, ~4 advanced
  // =======================================================================
  {
    id: 81,
    question: "What is the purpose of compartmentation in a building's fire safety strategy?",
    options: [
      "To create as many rooms as possible",
      "To divide a building into fire-resistant compartments that contain fire and smoke to the compartment of origin, limiting fire spread and protecting escape routes",
      "To improve the acoustics of the building",
      "To maximise natural lighting"
    ],
    correctAnswer: 1,
    explanation: "Compartmentation is the division of a building into fire-resistant compartments using fire-resisting walls, floors, and doors. Its purpose is to contain fire and smoke to the compartment of origin for a specified period, limiting fire spread, protecting means of escape, reducing the risk to occupants in other parts of the building, and reducing damage. The fire resistance period depends on the building type, height, and use — typically 30, 60, 90, or 120 minutes as specified in Approved Document B.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Compartmentation",
    category: "Fire Prevention & Detection"
  },
  {
    id: 82,
    question: "What is a fire door and what do the designations FD30 and FD60 mean?",
    options: [
      "FD30 and FD60 are door colours",
      "A fire door is a door assembly designed to resist fire for a specified period — FD30 resists fire for 30 minutes and FD60 for 60 minutes",
      "FD30 and FD60 are door width measurements",
      "FD30 means the door has 30 screws; FD60 means 60 screws"
    ],
    correctAnswer: 1,
    explanation: "A fire door is a complete assembly (door leaf, frame, intumescent seals, smoke seals, self-closer, and ironmongery) designed and tested to resist fire for a specified period. FD30 indicates 30 minutes of fire resistance, FD60 indicates 60 minutes, FD90 indicates 90 minutes, and FD120 indicates 120 minutes. The 'S' suffix (e.g., FD30S) indicates the door also provides smoke resistance. Fire doors are a critical element of compartmentation and must be maintained in good working condition with all components intact.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Fire doors",
    category: "Fire Prevention & Detection"
  },
  {
    id: 83,
    question: "What is 'fire stopping' and why is it important?",
    options: [
      "The act of stopping a fire with an extinguisher",
      "The sealing of gaps and openings in fire-resisting walls, floors, and ceilings (where services such as cables, pipes, and ducts pass through) to maintain the integrity of the fire compartment",
      "A type of fire alarm",
      "The process of closing fire doors"
    ],
    correctAnswer: 1,
    explanation: "Fire stopping is the sealing of gaps, joints, and openings in fire-resisting construction elements where building services (cables, pipes, ventilation ducts, cable trays) penetrate through fire-resisting walls, floors, and ceilings. Without proper fire stopping, these penetrations create pathways for fire and smoke to spread between compartments, potentially bypassing hours of fire resistance. Fire stopping materials include intumescent sealants, fire pillows, fire batts, and proprietary penetration seal systems, all of which must be installed and tested to the appropriate standard.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Fire stopping",
    category: "Fire Prevention & Detection"
  },
  {
    id: 84,
    question: "What is a hot work permit and when should it be used?",
    options: [
      "A permit to work in hot weather",
      "A formal documented control system used before any work involving open flames, sparks, or high temperatures (welding, cutting, grinding, brazing) to ensure fire prevention measures are in place",
      "A permit to use the oven in a workplace kitchen",
      "A permit required only in chemical plants"
    ],
    correctAnswer: 1,
    explanation: "A hot work permit is a formal documented procedure that must be completed before any hot work activity (welding, cutting, grinding, brazing, soldering, use of blowtorches) is carried out. It ensures that fire risks have been assessed, combustible materials have been removed or protected, fire extinguishers are available, a fire watch is maintained during and after the work (typically for at least 60 minutes), and the responsible person has authorised the work. Hot work is one of the leading causes of workplace fires, making the permit system essential.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Hot work permits",
    category: "Fire Prevention & Detection"
  },
  {
    id: 85,
    question: "What is the role of Portable Appliance Testing (PAT) in fire prevention?",
    options: [
      "PAT has no relationship to fire prevention",
      "PAT involves the regular inspection and testing of portable electrical appliances to identify faults (damaged cables, loose connections, insulation failure) that could cause electrical fires",
      "PAT only tests the weight of appliances",
      "PAT is only required for medical equipment"
    ],
    correctAnswer: 1,
    explanation: "Portable Appliance Testing (PAT) is a programme of regular visual inspection and electrical testing of portable electrical equipment. It identifies faults such as damaged cables, cracked plugs, loose connections, and insulation breakdown that could lead to overheating, short circuits, arcing, and electrical fires. As electrical faults are the most common accidental cause of workplace fires, PAT is a key fire prevention measure. The frequency of testing depends on the type of equipment and the environment in which it is used, guided by IET Code of Practice for In-Service Inspection and Testing.",
    section: "Module 3",
    difficulty: "basic",
    topic: "PAT testing",
    category: "Fire Prevention & Detection"
  },
  {
    id: 86,
    question: "What are Arc Fault Detection Devices (AFDDs) and how do they contribute to fire prevention?",
    options: [
      "Devices that detect lightning strikes",
      "Circuit protection devices that detect dangerous electrical arcing (series and parallel arcs) in final circuits and disconnect the supply before the arc can cause a fire",
      "Devices that detect gas leaks",
      "Devices that detect water leaks"
    ],
    correctAnswer: 1,
    explanation: "Arc Fault Detection Devices (AFDDs) detect dangerous electrical arcs — both series arcs (caused by loose connections or damaged conductors) and parallel arcs (caused by insulation failure between conductors). These arcs can generate temperatures exceeding 6,000°C, sufficient to ignite surrounding materials, but may not draw enough current to trip an MCB or RCD. AFDDs analyse the electrical waveform to distinguish dangerous arcs from normal arcing (such as motor brushes). BS 7671:2018 Amendment 2 recommends AFDDs in certain higher-risk locations.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "AFDDs",
    category: "Fire Prevention & Detection"
  },
  {
    id: 87,
    question: "What are the requirements for flammable liquid storage under DSEAR 2002?",
    options: [
      "Flammable liquids can be stored anywhere convenient",
      "Flammable liquids must be stored in suitable fire-resistant cabinets or stores with adequate ventilation, bunding to contain spills, separation from ignition sources, and appropriate signage and labelling",
      "They only need to be kept away from direct sunlight",
      "They can be stored in standard office cupboards"
    ],
    correctAnswer: 1,
    explanation: "Under DSEAR 2002, flammable liquids must be stored in purpose-built fire-resistant storage (cabinets rated to EN 14470-1 for internal storage, or purpose-built stores for larger quantities). Storage areas must have adequate ventilation to prevent accumulation of flammable vapours, bunding with capacity of at least 110% of the largest container, separation from ignition sources, hazard warning signs, and be in areas where a spill can be safely contained. Quantities kept in the workplace should be the minimum necessary for the task.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Flammable storage — DSEAR",
    category: "Fire Prevention & Detection"
  },
  {
    id: 88,
    question: "What is the difference between a conventional and an addressable fire alarm system?",
    options: [
      "There is no difference",
      "A conventional system identifies which zone is in alarm; an addressable system identifies the exact individual device (detector or call point) that has activated, providing precise location information",
      "A conventional system uses wireless detectors; an addressable system uses wired detectors",
      "A conventional system is louder than an addressable system"
    ],
    correctAnswer: 1,
    explanation: "In a conventional fire alarm system, detectors are wired in zones and the control panel identifies which zone has activated, but not which specific detector within that zone. In an addressable system, each detector and call point has a unique address, and the control panel identifies the exact device that has triggered, displaying its precise location. Addressable systems provide faster identification of the fire location, reduce false alarm investigation time, and are recommended by BS 5839-1 for larger or more complex buildings.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Conventional vs addressable systems",
    category: "Fire Prevention & Detection"
  },
  {
    id: 89,
    question: "What is an analogue-addressable fire alarm system?",
    options: [
      "A system that uses old-fashioned analogue technology",
      "An advanced system where each detector continuously reports its analogue sensor value to the control panel, allowing the panel to monitor trends, set dynamic thresholds, and make intelligent alarm decisions",
      "A system that only works with analogue telephones",
      "A system that does not use electricity"
    ],
    correctAnswer: 1,
    explanation: "An analogue-addressable fire alarm system is the most advanced type of conventional detection. Each detector continuously sends its analogue sensor reading (e.g., smoke density value, temperature reading) to the control panel, rather than just an on/off alarm signal. The panel uses algorithms to analyse trends, compensate for drift and contamination, set dynamic alarm thresholds, and distinguish between genuine fires and false alarm sources. This provides the highest level of detection performance with the lowest false alarm rate.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Analogue-addressable systems",
    category: "Fire Prevention & Detection"
  },
  {
    id: 90,
    question: "What is an optical (photoelectric) smoke detector and where is it most effective?",
    options: [
      "A camera that takes photographs of smoke",
      "A detector that uses a light source and photosensor to detect smoke particles by light scattering; most effective at detecting slow-smouldering fires that produce large visible smoke particles",
      "A detector that only works in daylight",
      "A detector that uses X-rays to see through smoke"
    ],
    correctAnswer: 1,
    explanation: "An optical (photoelectric) smoke detector contains a light-emitting diode (LED) and a photosensor arranged so that in normal conditions, the light does not reach the sensor. When smoke enters the chamber, particles scatter the light beam onto the photosensor, triggering the alarm. Optical detectors are most effective at detecting slow-smouldering fires that produce large, visible smoke particles (such as overheating electrical equipment, smouldering furniture). They are less susceptible to false alarms from cooking fumes than ionisation detectors.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Optical smoke detectors",
    category: "Fire Prevention & Detection"
  },
  {
    id: 91,
    question: "What types of heat detector are commonly used in fire alarm systems?",
    options: [
      "Only fixed-temperature detectors",
      "Fixed-temperature (static) detectors that trigger at a preset temperature, and rate-of-rise detectors that trigger when the temperature increases faster than a specified rate",
      "Detectors that measure humidity",
      "Detectors that only work in summer"
    ],
    correctAnswer: 1,
    explanation: "Heat detectors come in two main types: fixed-temperature (static) detectors, which trigger when the surrounding temperature reaches a preset threshold (typically 57°C or 90°C), and rate-of-rise detectors, which trigger when the temperature increases faster than a specified rate (typically 5-8°C per minute). Many modern heat detectors combine both functions. Heat detectors are less sensitive than smoke detectors but are suitable for environments where smoke detectors would cause false alarms, such as kitchens, garages, boiler rooms, and workshops.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Heat detectors",
    category: "Fire Prevention & Detection"
  },
  {
    id: 92,
    question: "What is a multi-sensor detector and what advantage does it provide?",
    options: [
      "A detector that monitors multiple rooms simultaneously",
      "A detector that combines two or more sensing technologies (typically optical smoke and heat) in a single unit, using algorithms to analyse combined data for improved detection accuracy and reduced false alarms",
      "A detector with multiple alarm sounds",
      "A detector that requires multiple batteries"
    ],
    correctAnswer: 1,
    explanation: "A multi-sensor detector combines two or more sensing technologies — most commonly optical smoke detection and heat detection — in a single unit. An intelligent algorithm analyses the combined sensor data to differentiate between genuine fire signatures and non-fire phenomena that might cause a single-sensor detector to false alarm. This provides faster and more accurate detection of a wider range of fire types while significantly reducing unwanted false alarms. BS 5839-1 recognises multi-sensor detectors as providing enhanced performance.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Multi-sensor detectors",
    category: "Fire Prevention & Detection"
  },
  {
    id: 93,
    question: "What is a beam detector and where is it typically used?",
    options: [
      "A detector that emits a laser beam to cut through smoke",
      "A detector that projects an infrared beam across a large open space to a receiver; when smoke obscures the beam, the alarm is triggered — used in warehouses, atriums, churches, and large open-plan areas",
      "A detector mounted on steel beams only",
      "A small handheld detector"
    ],
    correctAnswer: 1,
    explanation: "A beam detector (optical beam smoke detector) consists of a transmitter that projects an infrared beam across a protected space to a receiver (or to a reflector that returns the beam to a combined transmitter/receiver unit). When smoke passes through the beam, it reduces the signal strength, triggering the alarm. Beam detectors are ideal for protecting large open spaces with high ceilings (warehouses, atriums, churches, aircraft hangars) where point-type detectors at ceiling level would be too far from the fire to respond quickly.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Beam detectors",
    category: "Fire Prevention & Detection"
  },
  {
    id: 94,
    question: "What is an aspirating smoke detection system (such as VESDA) and when is it used?",
    options: [
      "A system that blows smoke away from the building",
      "A highly sensitive system that continuously draws air samples through a pipe network to a central laser detection chamber, providing very early warning of smoke — used in data centres, clean rooms, heritage buildings, and high-value environments",
      "A system that injects smoke into buildings for testing",
      "A basic domestic smoke alarm"
    ],
    correctAnswer: 1,
    explanation: "An aspirating smoke detection system (ASD), such as VESDA (Very Early Smoke Detection Apparatus), uses a fan to draw air continuously through a network of sampling pipes with precisely drilled holes. The sampled air is analysed in a central detection chamber using a laser-based nephelometer. ASD systems can detect smoke at concentrations far below those required to trigger a point-type detector, providing very early warning. They are used in environments requiring the highest level of protection: data centres, server rooms, clean rooms, archives, heritage buildings, and telecommunications facilities.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Aspirating detection — VESDA",
    category: "Fire Prevention & Detection"
  },
  {
    id: 95,
    question: "Under BS 5839-1, what does a Category L1 fire detection system provide?",
    options: [
      "Detection in corridors only",
      "Detection throughout all areas of the building for the purpose of protecting life — the highest category of life protection system",
      "Detection in the fire alarm control panel room only",
      "Detection outdoors only"
    ],
    correctAnswer: 1,
    explanation: "A Category L1 system under BS 5839-1 provides automatic fire detection throughout all areas of the building, including roof spaces, floor voids, and other concealed spaces. It is the highest category of life protection system and is designed to give the earliest possible warning of fire to all occupants. L1 is typically specified for sleeping risks (hotels, care homes, HMOs), high-rise buildings, or premises where the fire risk assessment identifies a need for full coverage. It does not include areas where detection would be impracticable, such as toilets.",
    section: "Module 3",
    difficulty: "basic",
    topic: "BS 5839 categories — L1",
    category: "Fire Prevention & Detection"
  },
  {
    id: 96,
    question: "What does a Category L2 fire detection system provide under BS 5839-1?",
    options: [
      "Detection in the car park only",
      "Detection in defined areas of the building — typically all escape routes and all rooms or areas that open onto escape routes, plus high fire-risk rooms",
      "Detection in external areas only",
      "Detection using a single detector for the entire building"
    ],
    correctAnswer: 1,
    explanation: "A Category L2 system provides automatic fire detection in all escape routes (corridors, stairways, lobbies) and in all rooms or areas that open onto escape routes, plus detection in specified high fire-risk areas. It provides a higher level of protection than L3 by including rooms adjacent to escape routes, ensuring that a fire in a room near an escape route is detected before it compromises the escape route. L2 is commonly specified for offices, shops, and other commercial premises with significant fire loads near escape routes.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "BS 5839 categories — L2",
    category: "Fire Prevention & Detection"
  },
  {
    id: 97,
    question: "What is the difference between BS 5839-1 Category P1 and Category P2 systems?",
    options: [
      "P1 is for car parks; P2 is for playgrounds",
      "P1 provides detection throughout all areas of the building for property protection; P2 provides detection only in defined high-risk areas for property protection",
      "P1 uses sounders; P2 uses visual alarms",
      "P1 is for permanent buildings; P2 is for temporary buildings"
    ],
    correctAnswer: 1,
    explanation: "Category P systems are designed for property protection rather than life safety. A P1 system provides automatic fire detection throughout all areas of the building (equivalent to L1 coverage but with the primary aim of protecting property and reducing property loss). A P2 system provides detection only in defined areas of high fire risk where a fire is most likely to start or where the consequences of fire would be most severe. P systems are often specified to reduce insurance premiums or to protect high-value assets.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "BS 5839 categories — P1/P2",
    category: "Fire Prevention & Detection"
  },
  {
    id: 98,
    question: "What does a Category M fire detection system consist of under BS 5839-1?",
    options: [
      "Automatic sprinkler systems only",
      "A manual fire alarm system consisting of manual call points (break glass units) without automatic fire detection, relying on occupants to discover and report fires",
      "Mobile phone alerts only",
      "A system with magnetic door holders only"
    ],
    correctAnswer: 1,
    explanation: "A Category M system is the most basic category under BS 5839-1. It consists of manual call points (break glass units) only, with no automatic fire detection. It relies entirely on occupants discovering a fire and manually operating a call point to raise the alarm. Category M is only suitable for premises with very low fire risk, low occupancy, and where occupants are alert and mobile. It is the minimum acceptable level for any premises requiring a fire alarm system and is often supplemented with at least some automatic detection.",
    section: "Module 3",
    difficulty: "basic",
    topic: "BS 5839 categories — M",
    category: "Fire Prevention & Detection"
  },
  {
    id: 99,
    question: "What are intumescent seals on a fire door and what function do they perform?",
    options: [
      "Decorative strips on the door edge",
      "Strips of material fitted around the door edge that expand rapidly when exposed to heat, sealing the gap between the door and frame to prevent the passage of fire and hot gases",
      "Magnetic strips that hold the door closed",
      "Strips that improve the acoustic performance of the door"
    ],
    correctAnswer: 1,
    explanation: "Intumescent seals are strips of material (typically graphite-based or sodium silicate-based) fitted into grooves around the edge of a fire door or into the door frame. Under normal conditions, they are dormant. When exposed to heat from a fire (typically above 200°C), they expand (intumesce) rapidly to many times their original size, sealing the gap between the door leaf and the frame. This prevents the passage of fire and hot gases through the gap. Fire doors may also have cold smoke seals (brush or rubber strips) that prevent the passage of cold smoke before the intumescent activates.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Intumescent seals",
    category: "Fire Prevention & Detection"
  },
  {
    id: 100,
    question: "What fire prevention measures should be implemented for electrical installations to reduce fire risk?",
    options: [
      "No measures are needed for electrical installations",
      "Regular inspection and testing to BS 7671 (every 5 years for commercial premises), avoiding overloaded circuits, maintaining PAT regimes, using correct fuse/MCB ratings, considering AFDDs in high-risk locations, and ensuring cable installation complies with current standards",
      "Only replacing fuses when they blow",
      "Only checking electrical installations once every 25 years"
    ],
    correctAnswer: 1,
    explanation: "Electrical fire prevention requires a comprehensive approach: fixed electrical installations must be inspected and tested in accordance with BS 7671 at intervals not exceeding 5 years for commercial premises (1 year for certain high-risk premises); portable appliances must be inspected and tested under a PAT regime; circuits must not be overloaded; correct fuse/MCB ratings must be used; AFDDs should be considered for locations where arcing faults pose a particular fire risk; and any alterations must comply with current wiring standards. As electrical faults are the leading accidental cause of workplace fires, these measures are critical.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Electrical fire prevention",
    category: "Fire Prevention & Detection"
  },

  // ===== Questions 101-200 (merged) =====
// Questions 101-200 (Fire Safety & Fire Marshal)
  {
    id: 101,
    question: "What is the primary purpose of a manual call point in a fire alarm system?",
    options: ["To automatically detect smoke", "To allow a person to manually raise a fire alarm", "To silence a false alarm", "To notify the fire brigade directly"],
    correctAnswer: 1,
    explanation: "A manual call point (MCP) allows any person who discovers a fire to manually trigger the fire alarm system by pressing or breaking the glass element. They are typically located at exit points and along escape routes as required by BS 5839 Part 1.",
    section: "Fire Alarm Systems",
    difficulty: "basic",
    topic: "Manual call points",
    category: "Fire Prevention & Detection"
  },
  {
    id: 102,
    question: "At what maximum distance apart should manual call points be positioned along escape routes according to BS 5839 Part 1?",
    options: ["25 metres", "30 metres", "45 metres", "60 metres"],
    correctAnswer: 2,
    explanation: "BS 5839 Part 1 recommends that manual call points should be positioned so that the travel distance to the nearest call point does not exceed 45 metres. They should also be sited at each exit point from a floor to a stairway.",
    section: "Fire Alarm Systems",
    difficulty: "intermediate",
    topic: "Manual call points",
    category: "Fire Prevention & Detection"
  },
  {
    id: 103,
    question: "What is the minimum sound level a fire alarm sounder must achieve in occupied areas according to BS 5839 Part 1?",
    options: ["55 dBA", "60 dBA", "65 dBA", "75 dBA"],
    correctAnswer: 2,
    explanation: "BS 5839 Part 1 requires that the fire alarm sound level should be at least 65 dBA in all accessible areas of the building. In areas where people may be sleeping, the minimum is 75 dBA at the bed-head position.",
    section: "Fire Alarm Systems",
    difficulty: "intermediate",
    topic: "Sounders",
    category: "Fire Prevention & Detection"
  },
  {
    id: 104,
    question: "What does VAD stand for in the context of fire alarm systems?",
    options: ["Voltage Activated Device", "Visual Alarm Device", "Variable Alert Display", "Verified Alarm Detector"],
    correctAnswer: 1,
    explanation: "VAD stands for Visual Alarm Device. VADs are flashing beacons used to alert people who are deaf or hard of hearing to a fire alarm activation. BS 5839 Part 1 provides guidance on their installation and coverage requirements.",
    section: "Fire Alarm Systems",
    difficulty: "basic",
    topic: "VADs",
    category: "Fire Prevention & Detection"
  },
  {
    id: 105,
    question: "What colour should a visual alarm device (VAD) flash to indicate a fire alarm?",
    options: ["Blue", "Amber", "Red or red/white", "Green"],
    correctAnswer: 2,
    explanation: "BS 5839 Part 1 specifies that VADs used for fire alarm warning should produce a red or red/white flash. This distinguishes them from other visual alert systems and ensures consistency across premises for people who rely on visual warnings.",
    section: "Fire Alarm Systems",
    difficulty: "intermediate",
    topic: "VADs",
    category: "Fire Prevention & Detection"
  },
  {
    id: 106,
    question: "What is the purpose of a voice alarm system in a building?",
    options: ["To record voice messages from fire marshals", "To provide spoken evacuation instructions instead of or alongside tonal alarms", "To allow two-way communication with the fire brigade", "To amplify the standard fire alarm tone"],
    correctAnswer: 1,
    explanation: "A voice alarm system provides pre-recorded or live spoken messages to building occupants during an emergency. This is particularly useful in large or complex buildings where specific evacuation instructions can reduce confusion and enable phased evacuation.",
    section: "Fire Alarm Systems",
    difficulty: "basic",
    topic: "Voice alarm",
    category: "Fire Prevention & Detection"
  },
  {
    id: 107,
    question: "Which British Standard specifically covers voice alarm systems?",
    options: ["BS 5839 Part 1", "BS 5839 Part 8", "BS 5266 Part 1", "BS EN 54 Part 16"],
    correctAnswer: 1,
    explanation: "BS 5839 Part 8 is the code of practice for the design, installation, commissioning and maintenance of voice alarm systems. It works alongside BS 5839 Part 1 (fire detection and alarm systems) to ensure voice alarm systems are properly integrated.",
    section: "Fire Alarm Systems",
    difficulty: "advanced",
    topic: "BS 5839 Part 8",
    category: "Fire Prevention & Detection"
  },
  {
    id: 108,
    question: "What is the role of the CIE (Control and Indicating Equipment) in a fire alarm system?",
    options: ["It detects smoke and heat", "It receives signals from detection devices and controls the alarm outputs", "It provides emergency lighting", "It automatically extinguishes fires"],
    correctAnswer: 1,
    explanation: "The CIE, commonly known as the fire alarm control panel, is the central hub of a fire alarm system. It receives signals from detectors and manual call points, processes them, and activates appropriate outputs such as sounders, VADs, and cause and effect operations.",
    section: "Fire Alarm Systems",
    difficulty: "intermediate",
    topic: "CIE/control panels",
    category: "Fire Prevention & Detection"
  },
  {
    id: 109,
    question: "What is fire alarm 'zoning' used for?",
    options: ["To create fireproof zones in a building", "To divide a building into defined areas so the location of a fire can be quickly identified", "To restrict access to certain parts of a building during a fire", "To control ventilation systems in different zones"],
    correctAnswer: 1,
    explanation: "Fire alarm zoning divides a building into distinct areas, each with its own zone indicator on the control panel. This allows responding personnel and the fire brigade to quickly identify the location of an alarm activation and direct their response accordingly.",
    section: "Fire Alarm Systems",
    difficulty: "basic",
    topic: "Zoning",
    category: "Fire Prevention & Detection"
  },
  {
    id: 110,
    question: "According to BS 5839 Part 1, what is the maximum floor area that a single fire alarm zone should cover?",
    options: ["1,000 m²", "2,000 m²", "3,000 m²", "5,000 m²"],
    correctAnswer: 1,
    explanation: "BS 5839 Part 1 recommends that the floor area of a single zone should not exceed 2,000 m². Additionally, the search distance within a zone (the distance that needs to be walked to locate an alarm) should generally not exceed 60 metres.",
    section: "Fire Alarm Systems",
    difficulty: "advanced",
    topic: "Zoning",
    category: "Fire Prevention & Detection"
  },
  {
    id: 111,
    question: "What is a 'cause and effect' strategy in fire alarm design?",
    options: ["A legal requirement to investigate every fire alarm activation", "A programmed response that triggers specific actions based on which devices are activated", "A method of determining the root cause of a fire", "A training exercise for fire marshals"],
    correctAnswer: 1,
    explanation: "Cause and effect programming links specific fire alarm activations (cause) to predetermined actions (effect) such as closing fire doors, shutting down ventilation, activating voice alarm messages, or releasing hold-open devices. This is documented in a cause and effect matrix.",
    section: "Fire Alarm Systems",
    difficulty: "intermediate",
    topic: "Cause and effect",
    category: "Fire Prevention & Detection"
  },
  {
    id: 112,
    question: "Which of the following is a common cause of false fire alarms?",
    options: ["Regular testing of the system", "Steam from cooking or shower areas affecting detectors", "Having too many manual call points", "Using addressable rather than conventional systems"],
    correctAnswer: 1,
    explanation: "Steam, cooking fumes, dust, and aerosols are common causes of unwanted fire alarms (UFAs). Good detector selection, positioning, and the use of measures such as multi-sensor detectors or detector covers in high-risk areas can significantly reduce false alarm rates.",
    section: "Fire Alarm Systems",
    difficulty: "basic",
    topic: "False alarm management",
    category: "Fire Prevention & Detection"
  },
  {
    id: 113,
    question: "What does the fire and rescue service call a fire alarm activation where no fire is found?",
    options: ["A false positive", "An unwanted fire signal (UwFS)", "A null alarm", "A phantom detection"],
    correctAnswer: 1,
    explanation: "The fire and rescue service uses the term 'unwanted fire signal' (UwFS) for alarm activations where no fire is present. Excessive UwFS can lead to the fire service implementing attendance policies that reduce or delay their response to repeat offending premises.",
    section: "Fire Alarm Systems",
    difficulty: "intermediate",
    topic: "False alarm management",
    category: "Fire Prevention & Detection"
  },
  {
    id: 114,
    question: "Which British Standard covers the design and installation of emergency lighting systems?",
    options: ["BS 5839 Part 1", "BS 5266 Part 1", "BS EN 54", "BS 7671"],
    correctAnswer: 1,
    explanation: "BS 5266 Part 1 is the code of practice for the emergency lighting of premises. It covers the design, installation, wiring, and servicing of emergency lighting systems to ensure safe evacuation during power failures or emergency situations.",
    section: "Emergency Lighting",
    difficulty: "basic",
    topic: "BS 5266 Part 1",
    category: "Fire Prevention & Detection"
  },
  {
    id: 115,
    question: "What is the difference between maintained and non-maintained emergency lighting?",
    options: ["Maintained lighting is more expensive; non-maintained is budget", "Maintained lighting operates continuously; non-maintained only operates when mains power fails", "Maintained lighting uses LEDs; non-maintained uses fluorescent tubes", "Maintained lighting is battery powered; non-maintained uses mains"],
    correctAnswer: 1,
    explanation: "Maintained emergency lighting operates at all times (both under mains power and during failure), often serving as normal room lighting. Non-maintained emergency lighting only illuminates when the normal mains supply fails, remaining dormant during normal conditions.",
    section: "Emergency Lighting",
    difficulty: "basic",
    topic: "Maintained vs non-maintained",
    category: "Fire Prevention & Detection"
  },
  {
    id: 116,
    question: "What is the minimum illuminance level required on the centre line of an escape route under emergency lighting?",
    options: ["0.2 lux", "0.5 lux", "1 lux", "5 lux"],
    correctAnswer: 2,
    explanation: "BS 5266 Part 1 requires a minimum illuminance of 1 lux at floor level along the centre line of defined escape routes. The illuminance at the centre line should not be less than 50% of the illuminance provided across the full width of the route.",
    section: "Emergency Lighting",
    difficulty: "intermediate",
    topic: "Lux levels",
    category: "Fire Prevention & Detection"
  },
  {
    id: 117,
    question: "What is the minimum illuminance level required for open area (anti-panic) emergency lighting?",
    options: ["0.2 lux", "0.5 lux", "1 lux", "2 lux"],
    correctAnswer: 1,
    explanation: "Open area anti-panic lighting requires a minimum of 0.5 lux at floor level across the core area (excluding a border of 0.5 m). This lower level is sufficient to allow occupants to orient themselves and find their way to an escape route.",
    section: "Emergency Lighting",
    difficulty: "intermediate",
    topic: "Lux levels",
    category: "Fire Prevention & Detection"
  },
  {
    id: 118,
    question: "For most premises, what is the minimum rated duration for emergency lighting batteries?",
    options: ["30 minutes", "1 hour", "2 hours", "3 hours"],
    correctAnswer: 3,
    explanation: "BS 5266 Part 1 requires a minimum rated duration of 3 hours for most premises. A 1-hour duration is only acceptable in premises that will be evacuated immediately and not re-occupied until mains power is restored, such as some cinemas or entertainment venues.",
    section: "Emergency Lighting",
    difficulty: "advanced",
    topic: "Duration (1hr/3hr)",
    category: "Fire Prevention & Detection"
  },
  {
    id: 119,
    question: "How frequently should emergency lighting systems be functionally tested by simulating a mains failure?",
    options: ["Weekly", "Monthly", "Every 6 months", "Annually"],
    correctAnswer: 1,
    explanation: "BS 5266 Part 1 requires a brief functional test of emergency lighting every month, where the mains supply is interrupted to verify that each luminaire operates correctly. A full rated duration test is required annually to confirm the batteries can sustain the required duration.",
    section: "Emergency Lighting",
    difficulty: "intermediate",
    topic: "Testing (monthly/annual)",
    category: "Fire Prevention & Detection"
  },
  {
    id: 120,
    question: "What standard governs the design of safety signs including the green 'running man' emergency exit sign?",
    options: ["BS 5499", "BS ISO 7010", "BS 5839 Part 1", "BS EN 1838"],
    correctAnswer: 1,
    explanation: "BS ISO 7010 is the international standard that specifies graphical safety signs including the green 'running man' emergency exit sign. This standard ensures consistency and universal recognition of safety signs, replacing older national variations.",
    section: "Emergency Lighting",
    difficulty: "advanced",
    topic: "Exit signs (BS ISO 7010)",
    category: "Fire Prevention & Detection"
  },
  {
    id: 121,
    question: "What is the primary role of a fire marshal in the workplace?",
    options: ["To fight fires until the fire brigade arrives", "To assist with the safe evacuation of people and carry out fire prevention duties", "To maintain and repair fire alarm systems", "To conduct formal fire risk assessments"],
    correctAnswer: 1,
    explanation: "A fire marshal's primary role is to assist with the safe and orderly evacuation of people from the building during an emergency. They also carry out routine fire prevention tasks such as checking escape routes, fire doors, and extinguisher locations.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Fire marshal role",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 122,
    question: "Who is legally responsible for appointing fire marshals under the RRFSO?",
    options: ["The local fire brigade", "The responsible person (usually the employer or building owner)", "The Health and Safety Executive", "The building's insurance company"],
    correctAnswer: 1,
    explanation: "Under the Regulatory Reform (Fire Safety) Order 2005, the 'responsible person' (typically the employer, owner, or occupier) is responsible for appointing competent persons to assist with fire safety, including fire marshals. This is covered under Article 18.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Fire marshal appointment",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 123,
    question: "What is the key difference between a fire marshal and a fire warden?",
    options: ["Fire marshals fight fires; fire wardens do not", "The terms are generally used interchangeably, though marshals may have more training", "Fire wardens are employed by the fire service; fire marshals are not", "Fire marshals work only in offices; fire wardens work on construction sites"],
    correctAnswer: 1,
    explanation: "In practice, the terms 'fire marshal' and 'fire warden' are often used interchangeably. Where a distinction exists, fire marshals may have a broader role with additional training, while fire wardens may focus specifically on a particular floor or zone during evacuation.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Fire marshal vs fire warden",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 124,
    question: "What are a fire marshal's responsibilities BEFORE an emergency?",
    options: ["Extinguishing fires and rescuing trapped persons", "Conducting routine checks of escape routes, fire doors, and extinguisher availability", "Inspecting the building's structural fire resistance", "Repairing faulty fire alarm systems"],
    correctAnswer: 1,
    explanation: "Before an emergency, fire marshals carry out routine fire prevention duties including checking escape routes are clear and unobstructed, verifying fire doors close correctly, ensuring extinguishers are in place and accessible, and reporting any fire safety concerns.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Responsibilities (before emergency)",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 125,
    question: "What are a fire marshal's responsibilities DURING an emergency?",
    options: ["Investigating the cause of the fire", "Assisting evacuation, checking their zone is clear, and reporting to the assembly point", "Shutting down all electrical systems", "Calling the insurance company"],
    correctAnswer: 1,
    explanation: "During an emergency, fire marshals guide people to the nearest exit, check their designated area or zone is clear of occupants, assist anyone with mobility difficulties, report to the assembly point, and liaise with the incident controller about the status of their zone.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Responsibilities (during emergency)",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 126,
    question: "Which article of the RRFSO requires employers to provide adequate fire safety training to employees?",
    options: ["Article 8", "Article 14", "Article 21", "Article 38"],
    correctAnswer: 2,
    explanation: "Article 21 of the Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to ensure that employees are provided with adequate fire safety training. This includes training at the time of appointment, when exposed to new or increased risks, and at regular intervals.",
    section: "Fire Marshal Duties",
    difficulty: "intermediate",
    topic: "Training requirements (RRFSO Article 21)",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 127,
    question: "What is the commonly recommended ratio of fire marshals to occupants?",
    options: ["1 fire marshal per 20 occupants", "1 fire marshal per 50 occupants", "1 fire marshal per 100 occupants", "1 fire marshal per floor regardless of occupancy"],
    correctAnswer: 1,
    explanation: "The commonly recommended ratio is at least 1 fire marshal for every 50 occupants per floor. This ratio should be increased in premises with higher-risk occupants, complex layouts, or where a significant number of people may require assistance during evacuation.",
    section: "Fire Marshal Duties",
    difficulty: "intermediate",
    topic: "Number and distribution (1:50 ratio)",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 128,
    question: "How does the fire marshal's role relate to the 'responsible person' under the RRFSO?",
    options: ["The fire marshal replaces the responsible person", "The fire marshal acts on behalf of the responsible person to assist with fire safety duties", "The fire marshal supervises the responsible person", "There is no formal relationship between the two roles"],
    correctAnswer: 1,
    explanation: "Fire marshals are appointed by and act on behalf of the responsible person. Under Article 18 of the RRFSO, the responsible person must appoint competent persons to assist in implementing fire safety measures. Fire marshals help fulfil this obligation.",
    section: "Fire Marshal Duties",
    difficulty: "intermediate",
    topic: "Relationship with responsible person",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 129,
    question: "How should fire marshals be easily identified during an emergency?",
    options: ["By wearing a specific uniform at all times", "By wearing high-visibility vests or armbands, often in a distinct colour", "By carrying a megaphone", "By standing at the fire alarm panel"],
    correctAnswer: 1,
    explanation: "Fire marshals are typically identified by high-visibility vests or armbands, often in orange or yellow with 'Fire Marshal' or 'Fire Warden' printed on them. These should be readily accessible so marshals can put them on quickly when the alarm sounds.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Equipment and identification",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 130,
    question: "What should a fire marshal check during a routine inspection of an escape route?",
    options: ["That the route has been recently redecorated", "That the route is clear of obstructions, well lit, and fire doors are operational", "That CCTV cameras are functioning along the route", "That the route has appropriate carpeting"],
    correctAnswer: 1,
    explanation: "During routine inspections, fire marshals should verify that escape routes are clear of obstructions, storage, and trip hazards; fire doors close fully and are not wedged open; emergency lighting is functional; and signage is visible and legible.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Routine inspections",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 131,
    question: "What is simultaneous evacuation?",
    options: ["Evacuating one floor at a time starting from the fire floor", "Evacuating all occupants of a building at the same time upon alarm activation", "Evacuating only the area immediately affected by fire", "Moving occupants horizontally to an adjacent compartment"],
    correctAnswer: 1,
    explanation: "Simultaneous evacuation means that when the fire alarm sounds, all occupants of the building evacuate at the same time. This is the most common strategy in smaller or simpler premises where a single alarm signal indicates immediate and complete evacuation.",
    section: "Evacuation Strategies",
    difficulty: "basic",
    topic: "Simultaneous evacuation",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 132,
    question: "What is phased evacuation and where is it typically used?",
    options: ["Evacuating in alphabetical order by surname; used in schools", "Evacuating the fire floor first then adjacent floors sequentially; used in tall buildings", "Evacuating the ground floor first; used in shopping centres", "Evacuating via lifts in phases; used in hospitals"],
    correctAnswer: 1,
    explanation: "Phased evacuation involves evacuating the fire floor and the floor immediately above first, followed by other floors in sequence. It is typically used in tall multi-storey buildings and requires a voice alarm system and compartmentation to at least 60 minutes' fire resistance.",
    section: "Evacuation Strategies",
    difficulty: "intermediate",
    topic: "Phased evacuation",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 133,
    question: "What is progressive horizontal evacuation?",
    options: ["Moving occupants upwards to the roof for helicopter rescue", "Moving occupants horizontally through fire-resisting barriers into an adjacent safe compartment", "Evacuating all occupants through the main entrance only", "Moving occupants to the basement level"],
    correctAnswer: 1,
    explanation: "Progressive horizontal evacuation involves moving occupants through fire-resisting compartment walls or floors into an adjacent safe area on the same level. It is commonly used in hospitals and care homes where vertical evacuation of immobile patients would be impractical.",
    section: "Evacuation Strategies",
    difficulty: "intermediate",
    topic: "Progressive horizontal evacuation",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 134,
    question: "What is a 'defend-in-place' strategy?",
    options: ["Using fire extinguishers to stop the fire spreading", "Occupants remain in their fire-resistant compartment unless directly threatened", "Barricading doors during an active fire", "Fire marshals defend their zone against intruders"],
    correctAnswer: 1,
    explanation: "Defend-in-place (also called 'stay put') relies on the building's compartmentation to protect occupants who remain in their flat or room. It is common in purpose-built blocks of flats where each dwelling is designed as a separate fire compartment. Evacuation occurs only if directly affected.",
    section: "Evacuation Strategies",
    difficulty: "intermediate",
    topic: "Defend-in-place",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 135,
    question: "What is the maximum travel distance in one direction to an exit in a higher-risk area according to typical UK guidance?",
    options: ["9 metres", "12 metres", "18 metres", "25 metres"],
    correctAnswer: 2,
    explanation: "In higher-risk areas where travel is possible in one direction only (a dead end), the maximum travel distance is typically 18 metres. In lower-risk areas or where alternative routes are available, greater distances may be acceptable. These figures come from Approved Document B.",
    section: "Evacuation Strategies",
    difficulty: "advanced",
    topic: "Travel distances",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 136,
    question: "Which direction must fire exit doors open?",
    options: ["Inwards towards the building", "In the direction of escape (outwards)", "Either direction, provided they are clearly marked", "Sliding doors are always acceptable"],
    correctAnswer: 1,
    explanation: "Fire exit doors must open in the direction of escape (typically outwards) to prevent crushing in the event of a crowd pressing against the door. This is a requirement under the Building Regulations Approved Document B and is essential where more than 60 persons may use the door.",
    section: "Evacuation Strategies",
    difficulty: "basic",
    topic: "Escape routes and door direction",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 137,
    question: "How often should fire drills be conducted in most workplaces?",
    options: ["Every month", "Every 6 months", "Annually", "Only when the fire risk assessment is updated"],
    correctAnswer: 1,
    explanation: "Most fire safety guidance recommends that fire drills are conducted at least every 6 months. In higher-risk premises or where there is a high turnover of staff, more frequent drills may be appropriate. All drills must be recorded in the fire log book.",
    section: "Fire Drills",
    difficulty: "basic",
    topic: "Fire drill frequency",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 138,
    question: "What information should be recorded after a fire drill?",
    options: ["Only the date and time", "Date, time, duration of evacuation, number of occupants, any issues identified, and actions taken", "Only whether the drill was successful or not", "The names of all employees who participated"],
    correctAnswer: 1,
    explanation: "A comprehensive fire drill record should include the date, time, and duration of the evacuation; the number of people evacuated; the conditions simulated; any difficulties encountered; the evacuation time achieved; and any corrective actions required.",
    section: "Fire Drills",
    difficulty: "intermediate",
    topic: "Fire drill recording",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 139,
    question: "Which articles of the RRFSO cover emergency procedures and evacuation routes?",
    options: ["Articles 8 and 9", "Articles 14 and 15", "Articles 21 and 22", "Articles 38 and 39"],
    correctAnswer: 1,
    explanation: "Article 14 of the RRFSO requires the responsible person to establish emergency procedures, including evacuation routes and assembly points. Article 15 requires procedures for serious and imminent danger, including nominating competent persons to implement evacuation.",
    section: "Evacuation Procedures",
    difficulty: "advanced",
    topic: "RRFSO Article 14/15",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 140,
    question: "What is a PEEP in fire safety?",
    options: ["Personal Emergency Evacuation Plan", "Preliminary Escape and Exit Procedure", "Protected Emergency Exit Point", "Priority Evacuation of Exposed Persons"],
    correctAnswer: 0,
    explanation: "A PEEP (Personal Emergency Evacuation Plan) is a bespoke plan developed for an individual who may need assistance to evacuate a building. It takes into account the person's specific needs and details the assistance and equipment required for their safe evacuation.",
    section: "Evacuation Procedures",
    difficulty: "intermediate",
    topic: "PEEPs",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 141,
    question: "What is a GEEP and how does it differ from a PEEP?",
    options: ["General Emergency Evacuation Plan — a plan for the entire building", "Generic Emergency Evacuation Plan — a template plan for visitors or occasional users", "Government Emergency Escape Protocol — a statutory requirement", "Group Evacuation and Exit Procedure — for evacuating groups together"],
    correctAnswer: 1,
    explanation: "A GEEP (Generic Emergency Evacuation Plan) is a standard plan used for visitors, contractors, or occasional users who may need assistance but for whom a personalised PEEP cannot be prepared in advance. It provides a generic framework adaptable to individual needs on arrival.",
    section: "Evacuation Procedures",
    difficulty: "intermediate",
    topic: "GEEPs",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 142,
    question: "Under which legislation must employers make reasonable adjustments for disabled employees during evacuation?",
    options: ["Health and Safety at Work Act 1974", "Equality Act 2010", "Building Regulations 2010", "Fire Safety Act 2021"],
    correctAnswer: 1,
    explanation: "The Equality Act 2010 requires employers to make reasonable adjustments to ensure disabled employees are not placed at a substantial disadvantage. This includes providing appropriate evacuation assistance, PEEPs, and ensuring accessible escape routes.",
    section: "Evacuation Procedures",
    difficulty: "intermediate",
    topic: "Equality Act 2010",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 143,
    question: "What is a 'buddy system' in fire evacuation?",
    options: ["Two fire marshals always working together", "Pairing a person who needs assistance with a designated colleague who will help them evacuate", "A system where employees check on each other after evacuation", "Two fire wardens sharing responsibility for the same zone"],
    correctAnswer: 1,
    explanation: "A buddy system pairs a person who requires assistance during evacuation with one or more designated colleagues who are trained and willing to provide that assistance. The buddy should be aware of the person's PEEP and rehearse the evacuation plan regularly.",
    section: "Evacuation Procedures",
    difficulty: "basic",
    topic: "Buddy systems",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 144,
    question: "What is a fire refuge and where should they be provided?",
    options: ["A room where firefighters store equipment", "A protected area within a stairway enclosure where a disabled person can wait for assisted evacuation", "An underground bunker for extreme emergencies", "A designated room with fire suppression systems"],
    correctAnswer: 1,
    explanation: "A fire refuge is a protected area, typically within or adjacent to a protected stairway, where a person who cannot use stairs can wait safely for assistance. Building Regulations Approved Document B and BS 9999 provide guidance on the size and provision of refuges.",
    section: "Evacuation Procedures",
    difficulty: "intermediate",
    topic: "Refuges",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 145,
    question: "When should an evacuation chair be used during a fire evacuation?",
    options: ["Only by trained firefighters", "By trained personnel to evacuate people who cannot use stairs independently", "Only during fire drills, never in real emergencies", "By any employee without training"],
    correctAnswer: 1,
    explanation: "Evacuation chairs should only be used by personnel who have been specifically trained in their operation. They are used to carry people who are unable to use stairs down to ground level during an evacuation, particularly from upper floors where lifts cannot be used.",
    section: "Evacuation Procedures",
    difficulty: "intermediate",
    topic: "Evacuation chairs",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 146,
    question: "What should happen at the assembly point during an evacuation?",
    options: ["Everyone should return to their workstation to collect belongings", "A roll call or headcount should be taken and reported to the incident controller", "Staff should wait for exactly 10 minutes then re-enter the building", "Fire marshals should enter the building to search for missing persons"],
    correctAnswer: 1,
    explanation: "At the assembly point, fire marshals and designated persons should conduct a roll call or headcount to account for all occupants. The results should be reported to the incident controller who liaises with the fire and rescue service about any unaccounted persons.",
    section: "Evacuation Procedures",
    difficulty: "basic",
    topic: "Assembly points and roll call",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 147,
    question: "How should visitors be accounted for during a fire evacuation?",
    options: ["Visitors do not need to be accounted for", "Through the visitor sign-in register, which should be taken to the assembly point", "By asking employees if they saw any visitors", "Visitors are the responsibility of the fire brigade"],
    correctAnswer: 1,
    explanation: "Visitors should be accounted for using the visitor sign-in/sign-out register. This register should be taken to the assembly point by a designated person (often reception staff) so that all visitors can be checked against the list during the roll call.",
    section: "Evacuation Procedures",
    difficulty: "basic",
    topic: "Visitor accounting",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 148,
    question: "What is the correct communication chain during a fire emergency?",
    options: ["Each employee calls 999 individually", "Fire marshal reports to incident controller, who liaises with fire and rescue service", "The responsible person personally contacts every occupant", "Communication is not necessary; just evacuate"],
    correctAnswer: 1,
    explanation: "The communication chain runs from fire marshals (who report zone status) to the incident controller (who coordinates the overall response and maintains contact with the fire and rescue service). This structured approach ensures accurate information flow and prevents confusion.",
    section: "Evacuation Procedures",
    difficulty: "advanced",
    topic: "Communication chains",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 149,
    question: "Why is preventing re-entry to a building after evacuation critically important?",
    options: ["To prevent theft during the emergency", "To ensure no one returns to a potentially dangerous environment before it is declared safe", "To make the roll call easier", "To allow the fire brigade unimpeded access"],
    correctAnswer: 1,
    explanation: "Preventing re-entry is critical because the building may contain hidden fire spread, structural damage, or toxic gases that are not immediately apparent. Only the fire and rescue service or the incident controller should authorise re-entry once the building has been declared safe.",
    section: "Evacuation Procedures",
    difficulty: "intermediate",
    topic: "Preventing re-entry",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 150,
    question: "What additional challenges exist for fire evacuation on a construction site compared to a finished building?",
    options: ["None; the same procedures apply", "Escape routes change frequently, fire detection may be limited, and workers may be unfamiliar with the layout", "Construction workers do not need to evacuate as they work outdoors", "Construction sites are exempt from fire safety legislation"],
    correctAnswer: 1,
    explanation: "Construction sites present unique challenges including constantly changing layouts and escape routes, limited or temporary fire detection systems, combustible materials stored on site, multiple contractors unfamiliar with the site layout, and incomplete fire protection measures.",
    section: "Evacuation Procedures",
    difficulty: "advanced",
    topic: "Construction site evacuation",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 151,
    question: "How should fire marshals be distributed across shift patterns?",
    options: ["Fire marshals are only needed on the day shift", "Sufficient fire marshals should be available on every shift, including nights and weekends", "One fire marshal is enough regardless of shift pattern", "Fire marshals are only needed during office hours"],
    correctAnswer: 1,
    explanation: "The responsible person must ensure that adequate fire marshal cover is maintained at all times the premises are occupied, including night shifts, weekends, and holiday periods. Shift rotas should be planned to ensure the recommended ratio is maintained consistently.",
    section: "Fire Marshal Duties",
    difficulty: "intermediate",
    topic: "Number and distribution",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 152,
    question: "What should a fire marshal do if they discover a fire door wedged open during a routine inspection?",
    options: ["Ignore it if the area is low risk", "Close the door immediately, remove the wedge, and report the issue", "Leave it open but make a note for the annual review", "Ask the occupants of the area for permission before closing it"],
    correctAnswer: 1,
    explanation: "A fire door found wedged open should be closed immediately and the wedge removed. The incident should be reported so that the cause can be addressed. If a door needs to be held open regularly, a hold-open device linked to the fire alarm should be installed.",
    section: "Fire Marshal Duties",
    difficulty: "intermediate",
    topic: "Routine inspections",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 153,
    question: "What is the minimum clear width typically required for an escape route serving up to 200 persons?",
    options: ["600 mm", "750 mm", "1,050 mm", "1,500 mm"],
    correctAnswer: 2,
    explanation: "Approved Document B specifies a minimum clear width of 1,050 mm for escape routes and exits serving between 110 and 220 persons. For fewer than 110 persons, 850 mm may be acceptable, while routes serving larger numbers require proportionally wider openings.",
    section: "Evacuation Strategies",
    difficulty: "advanced",
    topic: "Escape route widths",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 154,
    question: "What responsibilities does a fire marshal have AFTER an emergency has concluded?",
    options: ["No further duties once the alarm is silenced", "Assisting with the debrief, recording lessons learned, and checking the area before reoccupation", "Repairing any damage caused by the fire", "Immediately resuming normal work without further action"],
    correctAnswer: 1,
    explanation: "After an emergency, fire marshals should participate in the debrief, provide feedback on any issues encountered during the evacuation, assist with recording observations and lessons learned, and help check their zone is safe before reoccupation is authorised.",
    section: "Fire Marshal Duties",
    difficulty: "intermediate",
    topic: "Responsibilities (after emergency)",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 155,
    question: "In a phased evacuation, what alarm signal is typically used for the fire floor?",
    options: ["A slow whoop at low volume", "A continuous alarm signal", "A single short blast", "An intermittent beeping signal"],
    correctAnswer: 1,
    explanation: "In a phased evacuation system, the fire floor receives a continuous alarm signal (or a specific evacuation message via the voice alarm) indicating immediate evacuation. Other floors may receive an 'alert' signal (often an intermittent tone) advising them to prepare to evacuate if instructed.",
    section: "Evacuation Strategies",
    difficulty: "advanced",
    topic: "Phased evacuation",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 156,
    question: "How should a fire marshal assist a wheelchair user who is above the ground floor during an evacuation?",
    options: ["Carry the person down the stairs without equipment", "Guide them to a designated refuge and ensure the fire service is informed of their location", "Tell them to use the lift", "Leave them and evacuate immediately"],
    correctAnswer: 1,
    explanation: "The fire marshal should guide the wheelchair user to the nearest designated refuge area within a protected stairway. They should then ensure the person's location and details are communicated to the incident controller and the fire and rescue service for assisted evacuation.",
    section: "Evacuation Procedures",
    difficulty: "intermediate",
    topic: "Refuges and evacuation chairs",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 157,
    question: "What training frequency is recommended for fire marshals?",
    options: ["Once at the point of appointment only", "Refresher training at least annually", "Every 5 years", "Only when legislation changes"],
    correctAnswer: 1,
    explanation: "Fire marshals should receive initial training upon appointment and refresher training at least annually. Additional training should be provided when there are significant changes to the building, processes, or fire risk assessment, or when lessons from incidents or drills require it.",
    section: "Fire Marshal Duties",
    difficulty: "intermediate",
    topic: "Training requirements",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 158,
    question: "What maximum travel distance to an exit is typically acceptable where alternative escape routes are available in a normal-risk area?",
    options: ["18 metres", "25 metres", "45 metres", "60 metres"],
    correctAnswer: 2,
    explanation: "Where alternative escape routes are available in a normal-risk area, the maximum travel distance is typically 45 metres as set out in Approved Document B. This is significantly more than the 18-metre limit for dead-end situations because occupants have more than one route to safety.",
    section: "Evacuation Strategies",
    difficulty: "advanced",
    topic: "Travel distances",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 159,
    question: "What equipment should a fire marshal carry or have access to during a fire drill or emergency?",
    options: ["A fire extinguisher and first aid kit", "A high-visibility vest, torch, and a copy of the evacuation plan", "Only a mobile phone", "Full firefighting personal protective equipment"],
    correctAnswer: 1,
    explanation: "Fire marshals should have access to a high-visibility vest or armband for identification, a torch (in case of power failure), and a copy of or familiarity with the evacuation plan. Some organisations also provide whistles, two-way radios, and zone checklists.",
    section: "Fire Marshal Duties",
    difficulty: "basic",
    topic: "Equipment and identification",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 160,
    question: "What should fire marshals do if a person refuses to evacuate during an alarm?",
    options: ["Physically force them to leave", "Clearly advise them of the danger, make a note of their location, and report it to the incident controller", "Ignore them and continue evacuating others", "Call the police immediately"],
    correctAnswer: 1,
    explanation: "If a person refuses to evacuate, the fire marshal should clearly inform them of the potential danger and strongly encourage them to leave. If they still refuse, the marshal should note their location and name (if known) and immediately report this to the incident controller.",
    section: "Evacuation Procedures",
    difficulty: "advanced",
    topic: "Evacuation challenges",
    category: "Fire Marshal Duties & Evacuation"
  },
  {
    id: 161,
    question: "What are the five main classes of fire in the UK?",
    options: ["Classes 1-5", "Classes A, B, C, D, and F", "Classes X, Y, Z, W, and V", "Classes Alpha, Beta, Gamma, Delta, and Epsilon"],
    correctAnswer: 1,
    explanation: "UK fire classes are: Class A (solid combustibles like wood and paper), Class B (flammable liquids), Class C (flammable gases), Class D (metals), and Class F (cooking oils and fats). Electrical fires are not a separate class but are an additional risk to consider.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "Fire classes",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 162,
    question: "What type of fire extinguisher has a red body with a red label and is suitable for Class A fires only?",
    options: ["Foam extinguisher", "CO2 extinguisher", "Water extinguisher", "Dry powder extinguisher"],
    correctAnswer: 2,
    explanation: "Water extinguishers have an all-red body (or red label on a red body) and are suitable only for Class A fires involving solid combustibles. They must never be used on electrical fires, flammable liquid fires, or cooking oil fires as this could spread the fire or cause electrocution.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "Water extinguisher",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 163,
    question: "What colour label identifies a foam fire extinguisher under BS EN 3?",
    options: ["Black", "Blue", "Cream/buff", "Yellow"],
    correctAnswer: 2,
    explanation: "Under BS EN 3, foam extinguishers are identified by a cream or buff coloured label on a red body. Foam extinguishers are suitable for Class A (solids) and Class B (flammable liquids) fires and work by forming a film that smothers the fire and seals flammable vapours.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "BS EN 3 colour codes",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 164,
    question: "What colour label identifies a CO2 fire extinguisher?",
    options: ["Cream", "Blue", "Yellow", "Black"],
    correctAnswer: 3,
    explanation: "CO2 (carbon dioxide) extinguishers are identified by a black label on a red body. They are suitable for electrical fires and Class B fires. CO2 works by displacing oxygen around the fire. The horn should not be held during discharge as it becomes extremely cold.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "BS EN 3 colour codes",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 165,
    question: "What colour label identifies a dry powder fire extinguisher?",
    options: ["Black", "Blue", "Cream", "Yellow"],
    correctAnswer: 1,
    explanation: "Dry powder extinguishers are identified by a blue label on a red body. They are versatile and suitable for Class A, B, and C fires and can be used near electrical equipment. However, they reduce visibility significantly and are not recommended for enclosed spaces.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "BS EN 3 colour codes",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 166,
    question: "What colour label identifies a wet chemical fire extinguisher and what class of fire is it primarily designed for?",
    options: ["Blue label; Class C fires", "Black label; Class B fires", "Yellow label; Class F fires", "Cream label; Class A fires"],
    correctAnswer: 2,
    explanation: "Wet chemical extinguishers have a yellow label and are specifically designed for Class F fires involving cooking oils and fats. The wet chemical agent reacts with the oil to form a soap-like solution (saponification) that seals the surface and cools the oil below its ignition point.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Wet chemical extinguisher",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 167,
    question: "What does the PASS technique stand for when using a fire extinguisher?",
    options: ["Prepare, Activate, Spray, Secure", "Pull, Aim, Squeeze, Sweep", "Point, Activate, Spray, Stop", "Pull, Alert, Squeeze, Stop"],
    correctAnswer: 1,
    explanation: "PASS stands for Pull the pin, Aim at the base of the fire, Squeeze the handle, and Sweep from side to side. This technique ensures the extinguishing agent is directed effectively at the seat of the fire rather than at the flames above.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "PASS technique",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 168,
    question: "Why should a CO2 extinguisher NOT be used in a confined space?",
    options: ["It leaves a residue that is difficult to clean", "It displaces oxygen and can cause asphyxiation", "It is too noisy for enclosed areas", "It creates a fire risk in confined spaces"],
    correctAnswer: 1,
    explanation: "CO2 extinguishers work by displacing oxygen to smother the fire. In a confined space, this displacement can reduce the oxygen concentration to dangerous levels, risking asphyxiation of the user and any other occupants. Alternative extinguisher types should be considered.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "CO2 extinguisher hazards",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 169,
    question: "What is the maximum travel distance to a fire extinguisher from any point on a floor?",
    options: ["15 metres", "20 metres", "30 metres", "45 metres"],
    correctAnswer: 2,
    explanation: "BS 5306 Part 8 recommends that the travel distance to a fire extinguisher should not exceed 30 metres from any point on a floor. Extinguishers should be sited on escape routes near exits, at fire points, and near specific risks where appropriate.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Extinguisher placement",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 170,
    question: "How often must portable fire extinguishers be professionally serviced?",
    options: ["Every 6 months", "Annually", "Every 2 years", "Every 5 years"],
    correctAnswer: 1,
    explanation: "BS 5306 Part 3 requires that all portable fire extinguishers receive a professional service (also called a basic service or annual maintenance) at least once every 12 months by a competent person. This includes checking the condition, weight, pressure, and all components.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Annual service",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 171,
    question: "What is an 'extended service' for a fire extinguisher?",
    options: ["A longer warranty period from the manufacturer", "A more thorough overhaul carried out at intervals of 5 or 10 years depending on extinguisher type", "An additional service carried out after every use", "Extended opening hours at the service centre"],
    correctAnswer: 1,
    explanation: "An extended service is a comprehensive overhaul of the extinguisher carried out at intervals specified in BS 5306 Part 3: every 5 years for water, foam, and wet chemical types, and every 10 years for CO2 types. It includes internal examination, seal replacement, and pressure testing.",
    section: "Firefighting Equipment",
    difficulty: "advanced",
    topic: "Extended service intervals",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 172,
    question: "What is a fire blanket primarily used for?",
    options: ["Wrapping around a person whose clothing is on fire or smothering small fires", "Protecting furniture from fire damage", "Providing thermal insulation during evacuation", "Shielding fire marshals from radiant heat"],
    correctAnswer: 0,
    explanation: "Fire blankets are primarily used to smother small fires (particularly cooking oil fires) by cutting off the oxygen supply, and to wrap around a person whose clothing has caught fire. The 'stop, drop, and roll' technique should also be used in conjunction with a fire blanket.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "Fire blankets",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 173,
    question: "Which British Standard covers fire blankets?",
    options: ["BS EN 1869", "BS EN 3", "BS 5306", "BS 5852"],
    correctAnswer: 0,
    explanation: "BS EN 1869 specifies the requirements for fire blankets. It covers the material, size, and performance requirements. Fire blankets must be able to withstand temperatures of at least 500°C and are available in sizes from 1m x 1m up to 1.8m x 1.2m for domestic and commercial use.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "BS EN 1869",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 174,
    question: "What are the standard sizes of fire blankets available for commercial kitchens?",
    options: ["0.5m x 0.5m only", "1m x 1m or 1.2m x 1.2m", "1.2m x 1.8m or 1.8m x 1.8m", "2m x 3m"],
    correctAnswer: 2,
    explanation: "For commercial kitchens and higher-risk environments, larger fire blankets of 1.2m x 1.8m or 1.8m x 1.8m are recommended. Standard domestic blankets are typically 1m x 1m or 1.2m x 1.2m. The size should be appropriate to the risk and the items being protected.",
    section: "Firefighting Equipment",
    difficulty: "advanced",
    topic: "Fire blanket sizes",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 175,
    question: "Which British Standard covers the installation and maintenance of hose reels?",
    options: ["BS EN 671-1", "BS EN 3", "BS 5306 Part 1", "BS 9999"],
    correctAnswer: 0,
    explanation: "BS EN 671-1 covers fixed firefighting systems including hose reels with semi-rigid hose. It specifies requirements for design, installation, and maintenance. Hose reels provide a continuous water supply and are intended for use by building occupants trained in their operation.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Hose reels (BS EN 671-1)",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 176,
    question: "How do automatic sprinkler systems help control fires?",
    options: ["They sound an alarm but do not release water", "Individual sprinkler heads activate when heated to their threshold, releasing water directly over the fire", "All sprinkler heads activate simultaneously throughout the building", "They release foam rather than water"],
    correctAnswer: 1,
    explanation: "Automatic sprinkler systems use individually activated heads that respond to heat. When the temperature at a sprinkler head reaches its rated threshold, a heat-sensitive element (glass bulb or fusible link) breaks, releasing water. Only heads directly above or near the fire activate.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Sprinkler systems",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 177,
    question: "Which type of fire extinguisher should NEVER be used on a cooking oil fire?",
    options: ["Wet chemical", "Water", "Fire blanket", "All extinguisher types can be used"],
    correctAnswer: 1,
    explanation: "Water must never be used on a cooking oil (Class F) fire because the water instantly turns to steam on contact with the superheated oil, causing a violent eruption of burning oil known as a 'boilover'. Only wet chemical extinguishers or fire blankets should be used on Class F fires.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "Extinguisher suitability",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 178,
    question: "Which type of extinguisher is most suitable for use on an electrical fire?",
    options: ["Water extinguisher", "Foam extinguisher", "CO2 extinguisher", "Wet chemical extinguisher"],
    correctAnswer: 2,
    explanation: "CO2 extinguishers are the most suitable for electrical fires as the gas is non-conductive and leaves no residue that could damage electrical equipment. While dry powder can also be used near electrical equipment, it leaves a corrosive residue that can damage sensitive electronics.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "Extinguisher suitability",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 179,
    question: "Under RIDDOR, when must a fire in a workplace be reported to the HSE?",
    options: ["Every fire must be reported regardless of severity", "Only when the fire results in the death of any person, specified injuries, or incapacitation of a worker for more than 7 days", "Only when the fire causes more than £10,000 in damage", "Fires do not need to be reported under RIDDOR"],
    correctAnswer: 1,
    explanation: "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), a fire must be reported if it results in death, specified injuries, or over-7-day incapacitation of a worker. Dangerous occurrences involving fire may also be reportable.",
    section: "Incident Response",
    difficulty: "advanced",
    topic: "RIDDOR reporting",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 180,
    question: "What is the first priority when investigating a workplace fire incident?",
    options: ["Calculating the financial cost of damage", "Preserving the fire scene and any evidence for investigation", "Resuming business operations as quickly as possible", "Interviewing the media"],
    correctAnswer: 1,
    explanation: "The first priority in fire investigation is scene preservation. The fire scene should be cordoned off and access restricted to prevent evidence from being disturbed. This allows fire investigators, the fire service, and if applicable the police and HSE to conduct a thorough investigation.",
    section: "Incident Response",
    difficulty: "intermediate",
    topic: "Scene preservation",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 181,
    question: "What is root cause analysis in the context of fire incident investigation?",
    options: ["Determining the financial root of the loss", "A systematic process to identify the underlying causes that led to the fire occurring", "Finding out who started the fire for disciplinary action", "Analysing the root structure of burnt materials"],
    correctAnswer: 1,
    explanation: "Root cause analysis is a systematic investigation method that looks beyond the immediate cause of a fire to identify underlying factors such as system failures, inadequate procedures, insufficient maintenance, or human error that contributed to the incident occurring.",
    section: "Incident Response",
    difficulty: "intermediate",
    topic: "Root cause analysis",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 182,
    question: "What should be included in a 'lessons learned' review after a fire incident?",
    options: ["Only the financial costs incurred", "Analysis of what happened, what worked well, what failed, and recommendations for preventing recurrence", "A list of disciplinary actions taken", "Only the fire brigade's report"],
    correctAnswer: 1,
    explanation: "A lessons learned review should analyse the sequence of events, evaluate the effectiveness of the evacuation and response procedures, identify any failures in detection, alarm, or protection systems, and make recommendations for improvements to prevent similar incidents.",
    section: "Incident Response",
    difficulty: "intermediate",
    topic: "Lessons learned",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 183,
    question: "Who should the responsible person liaise with at the scene of a workplace fire?",
    options: ["Only the building's insurance company", "The fire and rescue service incident commander", "The local council planning department", "The building's architect"],
    correctAnswer: 1,
    explanation: "The responsible person (or their designated representative) should liaise with the fire and rescue service incident commander at the scene. They should provide information about the building layout, hazardous materials, any missing persons, and any other details that could assist the fire service.",
    section: "Incident Response",
    difficulty: "basic",
    topic: "Fire service liaison",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 184,
    question: "When should the building's insurer be notified of a fire?",
    options: ["Within 30 days of the incident", "As soon as reasonably practicable, typically within 24 hours", "Only if the damage exceeds the policy excess", "Only after the fire investigation is complete"],
    correctAnswer: 1,
    explanation: "The insurer should be notified as soon as reasonably practicable, typically within 24 hours of the fire. Early notification is important as the insurer may wish to appoint their own investigators, and delayed notification could potentially affect the validity of the claim.",
    section: "Incident Response",
    difficulty: "intermediate",
    topic: "Insurer notification",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 185,
    question: "What must happen to a fire risk assessment after a fire incident?",
    options: ["It can remain unchanged if it was adequate before", "It must be reviewed and updated to reflect the lessons learned from the incident", "It should be destroyed and a completely new one written", "It only needs updating if someone was injured"],
    correctAnswer: 1,
    explanation: "The RRFSO requires the fire risk assessment to be reviewed and updated following a fire or significant near-miss. The review should consider whether the existing assessment adequately addressed the risks that materialised and incorporate any lessons learned from the incident.",
    section: "Incident Response",
    difficulty: "intermediate",
    topic: "FRA review after incident",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 186,
    question: "What support should be offered to staff following a fire incident in the workplace?",
    options: ["No support is necessary as fires are expected workplace risks", "Psychological support and debriefing, recognising potential trauma", "Only medical treatment for physical injuries", "A day off work only"],
    correctAnswer: 1,
    explanation: "Employers should offer appropriate post-incident support including psychological debriefing and access to counselling services. Experiencing a fire can be traumatic, and staff may suffer from anxiety, stress, or PTSD symptoms. Early support can significantly aid recovery.",
    section: "Incident Response",
    difficulty: "basic",
    topic: "Post-incident staff support",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 187,
    question: "What electrical work may be required after a fire in a building?",
    options: ["None; electrical systems are fire resistant", "Full inspection, testing, and re-certification of the electrical installation", "Only replacing visibly damaged cables", "Switching the power back on and testing each circuit"],
    correctAnswer: 1,
    explanation: "After a fire, the electrical installation must undergo a full inspection and test by a competent electrician before being re-energised. Heat, smoke, and water damage from firefighting can compromise insulation, connections, and protective devices, creating serious electrical safety risks.",
    section: "Incident Response",
    difficulty: "advanced",
    topic: "Electrical re-certification after fire",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 188,
    question: "What is the correct technique for using a fire blanket on a pan fire?",
    options: ["Throw the blanket from a distance onto the pan", "Turn off the heat source, hold the blanket as a shield, and gently place it over the pan from front to back", "Wrap the blanket around the pan and carry it outside", "Fan the blanket over the pan to smother flames"],
    correctAnswer: 1,
    explanation: "The correct technique is to first turn off the heat source if safe to do so. Hold the blanket with hands behind it for protection, approach the fire, and gently place the blanket over the pan from front to back to avoid drawing flames towards yourself. Leave for at least 30 minutes to cool.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Fire blanket technique",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 189,
    question: "Why should powder extinguishers generally not be used indoors?",
    options: ["They are only designed for outdoor use", "The powder cloud severely reduces visibility, can cause breathing difficulties, and leaves residue", "They are less effective indoors", "They can trigger sprinkler systems"],
    correctAnswer: 1,
    explanation: "Dry powder extinguishers create a dense cloud that severely reduces visibility, making it difficult to find escape routes. The powder can also cause breathing difficulties, particularly for people with respiratory conditions. The residue is corrosive and difficult to clean from equipment.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Powder extinguisher limitations",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 190,
    question: "What should a person check before attempting to fight a fire with an extinguisher?",
    options: ["That they have permission from the fire marshal", "That they have a clear escape route behind them, the fire is small enough, and they have the right extinguisher", "That the fire alarm has been silenced", "That the fire brigade is already on the way"],
    correctAnswer: 1,
    explanation: "Before attempting to fight a fire, a person should ensure: the alarm has been raised, they have a clear escape route behind them, the fire is small and contained, they have the correct type of extinguisher, and they feel confident to do so. If in any doubt, evacuate immediately.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "Safe use of extinguishers",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 191,
    question: "What class of fire involves flammable metals such as magnesium or aluminium?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    correctAnswer: 3,
    explanation: "Class D fires involve flammable metals such as magnesium, aluminium, titanium, and sodium. These fires require specialist dry powder extinguishers (L2 powder) as water, foam, and standard extinguishers can react violently with burning metals.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Fire classes",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 192,
    question: "What is the minimum number of fire extinguishers required per floor in a building?",
    options: ["1 extinguisher per floor", "2 extinguishers per floor (Class A rated)", "1 extinguisher per 100 m²", "Depends entirely on the fire risk assessment"],
    correctAnswer: 1,
    explanation: "BS 5306 Part 8 recommends a minimum provision of 2 Class A rated extinguishers per floor, regardless of floor area. Additional extinguishers are required based on fire risk assessment, floor area, specific hazards present, and the need for specialist extinguisher types.",
    section: "Firefighting Equipment",
    difficulty: "advanced",
    topic: "Extinguisher placement",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 193,
    question: "What is the purpose of a hose reel in a building's firefighting provision?",
    options: ["To provide water for cleaning after a fire", "To provide a continuous water supply for first-aid firefighting by trained building occupants", "To supply water to the fire brigade only", "To test the building's water pressure"],
    correctAnswer: 1,
    explanation: "Hose reels provide a virtually unlimited water supply for first-aid firefighting by trained building occupants. Unlike extinguishers which have a limited discharge time, hose reels are connected to the mains water supply and can operate continuously.",
    section: "Firefighting Equipment",
    difficulty: "basic",
    topic: "Hose reels",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 194,
    question: "What dangerous occurrence involving fire or explosion is specifically reportable under RIDDOR?",
    options: ["Any fire that requires an extinguisher to be used", "An uncontrolled explosion or fire in a workplace causing a stoppage of normal work for more than 24 hours", "A fire that triggers the fire alarm", "Any fire in a commercial kitchen"],
    correctAnswer: 1,
    explanation: "Under RIDDOR Schedule 2, an uncontrolled fire or explosion at a workplace that results in the stoppage of normal work for more than 24 hours, or causes structural damage, is classified as a dangerous occurrence and must be reported to the HSE.",
    section: "Incident Response",
    difficulty: "advanced",
    topic: "RIDDOR dangerous occurrences",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 195,
    question: "What is reinstatement in the context of fire incident recovery?",
    options: ["Reinstating the fire alarm system only", "The process of restoring the building and its systems to a safe and operational condition after a fire", "Reinstating staff who were dismissed after the fire", "Re-installing sprinkler systems"],
    correctAnswer: 1,
    explanation: "Reinstatement refers to the complete process of restoring a fire-damaged building to its pre-fire condition. This includes structural repairs, replacement of damaged systems (fire detection, electrical, mechanical), redecoration, and ensuring all fire safety measures are fully operational.",
    section: "Incident Response",
    difficulty: "basic",
    topic: "Reinstatement",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 196,
    question: "At what height should portable fire extinguishers be mounted?",
    options: ["At floor level only", "With the handle approximately 1 metre to 1.1 metres from the floor", "At eye level (approximately 1.7 metres)", "At any height as long as they are visible"],
    correctAnswer: 1,
    explanation: "Fire extinguishers should be mounted with the carrying handle at approximately 1 metre to 1.1 metres from floor level. Heavier extinguishers may be placed lower with the handle at about 1 metre. They should be on brackets, stands, or in cabinets and clearly visible.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Extinguisher placement",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 197,
    question: "What information should be recorded when conducting monthly visual inspections of fire extinguishers?",
    options: ["Only whether the extinguisher is present", "Location, type, condition, pressure gauge reading (if applicable), seal integrity, and any damage or obstruction", "Only the serial number and expiry date", "Nothing; monthly checks are not required"],
    correctAnswer: 1,
    explanation: "Monthly visual inspections should record: the extinguisher's location and accessibility; type and rating; condition of the body, hose, and nozzle; pressure gauge reading (where fitted); integrity of the safety pin and tamper seal; and any obstructions preventing access.",
    section: "Firefighting Equipment",
    difficulty: "intermediate",
    topic: "Extinguisher inspections",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 198,
    question: "Why is it important to preserve the fire scene after an incident?",
    options: ["To keep the area tidy", "To allow fire investigators to determine the origin, cause, and circumstances of the fire", "To prevent the public from seeing the damage", "To wait for the building to cool down"],
    correctAnswer: 1,
    explanation: "Scene preservation is essential to allow fire investigators, and where necessary the police, to examine physical evidence, determine the fire's point of origin and cause, and establish whether the fire was accidental or deliberate. Disturbing the scene can destroy vital evidence.",
    section: "Incident Response",
    difficulty: "intermediate",
    topic: "Scene preservation",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 199,
    question: "What additional risk does a CO2 extinguisher pose to the user during discharge?",
    options: ["It produces a bright flash that can cause temporary blindness", "The horn becomes extremely cold and can cause cold burns (frostbite)", "It releases a strong chemical smell that causes nausea", "It creates a high-pitched noise that can damage hearing"],
    correctAnswer: 1,
    explanation: "During discharge, the rapid expansion of CO2 gas causes the horn (nozzle) to become extremely cold, potentially reaching -70°C. Direct skin contact with the horn can cause cold burns or frostbite. Users should hold the extinguisher by the insulated handle or grip only.",
    section: "Firefighting Equipment",
    difficulty: "advanced",
    topic: "CO2 extinguisher hazards",
    category: "Firefighting Equipment & Incident Response"
  },
  {
    id: 200,
    question: "What should be the first action taken by a fire marshal after a fire investigation is complete and the building is cleared for reoccupation?",
    options: ["Immediately resume normal operations", "Conduct a thorough check of their zone to confirm all fire safety measures are in place before staff return", "Wait for new fire extinguishers to be delivered", "Hold a company-wide meeting before allowing anyone back"],
    correctAnswer: 1,
    explanation: "Before staff return, fire marshals should conduct a thorough check of their zone to confirm that all fire safety measures are operational: escape routes are clear, fire doors are functional, fire extinguishers and emergency lighting are in place, and the fire alarm system is operational.",
    section: "Incident Response",
    difficulty: "advanced",
    topic: "Post-incident reoccupation",
    category: "Firefighting Equipment & Incident Response"
  }];
