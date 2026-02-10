/**
 * Environmental & Sustainability Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced difficulty.
 *
 * Categories (5):
 *   Environmental Awareness (40) | Waste Management (40) |
 *   Energy & Resource Efficiency (40) | Pollution Prevention (40) |
 *   Biodiversity & Best Practice (40)
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
export const environmentalSustainabilityCategories = [
  "Environmental Awareness",
  "Waste Management",
  "Energy & Resource Efficiency",
  "Pollution Prevention",
  "Biodiversity & Best Practice"
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const environmentalSustainabilityMockExamConfig: MockExamConfig = {
  examId: 'environmental-sustainability',
  examTitle: 'Environmental & Sustainability Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/environmental-sustainability-module-6',
  categories: environmentalSustainabilityCategories
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomEnvironmentalSustainabilityExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(environmentalSustainabilityQuestionBank, numQuestions, environmentalSustainabilityCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — Questions 1-100 (Part 1)
// ---------------------------------------------------------------------------
export const environmentalSustainabilityQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // ENVIRONMENTAL AWARENESS — 40 questions (id 1-40)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 1,
    question: "What is the most widely accepted definition of 'sustainable development', as set out in the 1987 Brundtland Report?",
    options: [
      "Development that maximises economic growth for the current generation",
      "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs",
      "Development that eliminates all use of natural resources",
      "Development that prioritises environmental protection over all other concerns"
    ],
    correctAnswer: 1,
    explanation: "The Brundtland Report (Our Common Future, 1987) defined sustainable development as 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs'. This definition remains the cornerstone of international sustainability policy and underpins all subsequent UK environmental legislation.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Brundtland definition",
    category: "Environmental Awareness"
  },
  {
    id: 2,
    question: "Which UK Act of Parliament originally established the framework for environmental protection, including pollution control and waste management?",
    options: [
      "Climate Change Act 2008",
      "Environmental Protection Act 1990",
      "Environment Act 2021",
      "Clean Air Act 1993"
    ],
    correctAnswer: 1,
    explanation: "The Environmental Protection Act 1990 (EPA 1990) is the primary piece of UK legislation that established the framework for environmental protection. It introduced integrated pollution control (IPC), the duty of care for waste, statutory nuisance provisions, and the contaminated land regime. It remains a foundational statute for environmental regulation in the UK.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "EPA 1990",
    category: "Environmental Awareness"
  },
  {
    id: 3,
    question: "What does the acronym EIA stand for in an environmental context?",
    options: [
      "Environmental Impact Assessment",
      "Energy Improvement Analysis",
      "Ecological Investigation Audit",
      "Environmental Inspection Authority"
    ],
    correctAnswer: 0,
    explanation: "EIA stands for Environmental Impact Assessment. It is a systematic process used to identify, predict, and evaluate the environmental effects of proposed developments before planning permission is granted. EIAs are required for major construction projects under the Town and Country Planning (Environmental Impact Assessment) Regulations 2017.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "EIA",
    category: "Environmental Awareness"
  },
  {
    id: 4,
    question: "Which international agreement, signed in 2015, aims to limit global warming to well below 2°C above pre-industrial levels?",
    options: [
      "The Kyoto Protocol",
      "The Montreal Protocol",
      "The Paris Agreement",
      "The Stockholm Convention"
    ],
    correctAnswer: 2,
    explanation: "The Paris Agreement was adopted in 2015 and signed by 196 parties. It aims to limit global temperature rise to well below 2°C above pre-industrial levels, with efforts to limit the increase to 1.5°C. The UK ratified the agreement and has since enshrined a net zero target for 2050 in law through the Climate Change Act 2008 (as amended in 2019).",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Paris Agreement",
    category: "Environmental Awareness"
  },
  {
    id: 5,
    question: "What does 'net zero' mean in the context of UK climate policy?",
    options: [
      "Producing zero electricity from fossil fuels",
      "Balancing the amount of greenhouse gases emitted with the amount removed from the atmosphere, so the net contribution is zero",
      "Reducing all industrial activity to zero output",
      "Eliminating all carbon dioxide from the atmosphere completely"
    ],
    correctAnswer: 1,
    explanation: "Net zero means achieving a balance between the greenhouse gases emitted into the atmosphere and those removed from it. The UK became the first major economy to legislate for net zero greenhouse gas emissions by 2050, amending the Climate Change Act 2008 in June 2019. This does not mean zero emissions, but rather that any remaining emissions are offset by removal activities such as tree planting or carbon capture.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Net zero",
    category: "Environmental Awareness"
  },
  {
    id: 6,
    question: "How many Sustainable Development Goals (SDGs) were adopted by the United Nations in 2015?",
    options: [
      "10",
      "15",
      "17",
      "21"
    ],
    correctAnswer: 2,
    explanation: "The United Nations adopted 17 Sustainable Development Goals (SDGs) in September 2015 as part of the 2030 Agenda for Sustainable Development. The goals cover a broad range of issues including poverty, hunger, health, education, climate change, clean energy, responsible consumption, and life on land and below water. They provide the global framework that underpins national sustainability strategies.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "UN SDGs",
    category: "Environmental Awareness"
  },
  {
    id: 7,
    question: "What is a 'carbon footprint'?",
    options: [
      "The physical area of land required for carbon storage",
      "The total amount of greenhouse gases produced directly and indirectly by an activity, individual, organisation, or product, expressed as carbon dioxide equivalent (CO2e)",
      "The amount of coal burned by a power station in one year",
      "A measure of how far carbon particles travel in the atmosphere"
    ],
    correctAnswer: 1,
    explanation: "A carbon footprint is the total amount of greenhouse gases (including carbon dioxide, methane, and nitrous oxide) produced directly and indirectly by a person, organisation, event, or product. It is measured in tonnes of carbon dioxide equivalent (CO2e). Understanding carbon footprints is essential for identifying reduction opportunities on construction sites and in electrical installations.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Carbon footprint",
    category: "Environmental Awareness"
  },
  {
    id: 8,
    question: "What does 'PDCA' stand for in the context of environmental management systems?",
    options: [
      "Plan, Do, Check, Act",
      "Prevent, Detect, Control, Assess",
      "Prepare, Document, Certify, Audit",
      "Produce, Distribute, Consume, Abandon"
    ],
    correctAnswer: 0,
    explanation: "PDCA stands for Plan, Do, Check, Act — also known as the Deming Cycle. It is the continuous improvement framework at the heart of ISO 14001 Environmental Management Systems. Organisations plan their environmental objectives, implement them (Do), monitor and measure results (Check), and take corrective action to improve performance (Act).",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "PDCA cycle",
    category: "Environmental Awareness"
  },
  {
    id: 9,
    question: "Which international standard specifies requirements for an Environmental Management System (EMS)?",
    options: [
      "ISO 9001",
      "ISO 45001",
      "ISO 14001",
      "ISO 50001"
    ],
    correctAnswer: 2,
    explanation: "ISO 14001 is the international standard that specifies the requirements for an effective Environmental Management System (EMS). It provides a framework for organisations to protect the environment, respond to changing environmental conditions, and integrate environmental management into their business processes. ISO 9001 covers quality management, ISO 45001 covers occupational health and safety, and ISO 50001 covers energy management.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "ISO 14001",
    category: "Environmental Awareness"
  },
  {
    id: 10,
    question: "What is a 'circular economy'?",
    options: [
      "An economy where goods are transported in circular routes to reduce fuel consumption",
      "An economic model that aims to keep resources in use for as long as possible, extracting maximum value, then recovering and regenerating products and materials at end of life",
      "An economy based entirely on recycling centres",
      "An economic model where all products are manufactured in a single location"
    ],
    correctAnswer: 1,
    explanation: "A circular economy is an alternative to the traditional linear 'take, make, dispose' model. It aims to keep resources in use for as long as possible, extract maximum value while in use, and recover and regenerate products and materials at end of life. This principle is increasingly applied in construction and electrical work through design for disassembly, material reuse, and recycling of components like cables and fittings.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Circular economy",
    category: "Environmental Awareness"
  },
  {
    id: 11,
    question: "What key environmental principle did the Environment Act 2021 introduce regarding biodiversity in planning and development?",
    options: [
      "All developments must achieve zero biodiversity impact",
      "Biodiversity net gain of at least 10% must be delivered by most new developments",
      "Developers must create a new nature reserve for every project",
      "Biodiversity assessments are only required for developments over 100 hectares"
    ],
    correctAnswer: 1,
    explanation: "The Environment Act 2021 introduced mandatory biodiversity net gain (BNG), requiring most new developments in England to deliver at least a 10% increase in biodiversity compared to the pre-development baseline. This is measured using the Defra biodiversity metric and must be maintained for at least 30 years. The requirement became mandatory for major developments from February 2024.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Environment Act 2021",
    category: "Environmental Awareness"
  },
  {
    id: 12,
    question: "Under the Environmental Protection Act 1990, what is a 'statutory nuisance'?",
    options: [
      "Any activity that generates profit from natural resources",
      "A condition or activity that is prejudicial to health or a nuisance, as defined in Part III of the Act, including noise, dust, smoke, and fumes",
      "Any building work that takes longer than the planned schedule",
      "A formal complaint made to the Environment Agency about recycling"
    ],
    correctAnswer: 1,
    explanation: "Part III of the Environmental Protection Act 1990 defines statutory nuisances as conditions or activities that are prejudicial to health or constitute a nuisance. These include smoke, fumes, gases, dust, steam, smells, noise, accumulations or deposits, and artificial light. Local authorities have a duty to investigate complaints and can serve abatement notices on those responsible.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Statutory nuisance",
    category: "Environmental Awareness"
  },
  {
    id: 13,
    question: "What is the primary purpose of an Environmental Policy within an organisation?",
    options: [
      "To provide a marketing advantage over competitors",
      "To set out the organisation's commitment to environmental protection, compliance with legislation, and continual improvement",
      "To list all the materials used on a construction site",
      "To record the carbon emissions of every employee's commute"
    ],
    correctAnswer: 1,
    explanation: "An environmental policy is a top-level statement of an organisation's commitment to environmental protection. Under ISO 14001, the policy must include commitments to comply with legal and other requirements, prevent pollution, and continually improve the environmental management system. It should be appropriate to the organisation's activities and provide a framework for setting environmental objectives.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Environmental policy",
    category: "Environmental Awareness"
  },
  {
    id: 14,
    question: "Which body is the principal environmental regulator in England?",
    options: [
      "Health and Safety Executive (HSE)",
      "Department for Environment, Food and Rural Affairs (Defra)",
      "Environment Agency (EA)",
      "Natural England"
    ],
    correctAnswer: 2,
    explanation: "The Environment Agency (EA) is the principal environmental regulator in England, responsible for regulating major industry, waste, water quality, and flooding. Defra is the government department that sets policy, but the EA is the operational regulator that issues permits, conducts inspections, and takes enforcement action. Natural England advises on the natural environment, while the HSE covers occupational health and safety.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Environment Agency",
    category: "Environmental Awareness"
  },
  {
    id: 15,
    question: "What three pillars are commonly used to describe sustainability?",
    options: [
      "Air, water, and soil",
      "Environmental, social, and economic",
      "Reduce, reuse, and recycle",
      "Planning, construction, and demolition"
    ],
    correctAnswer: 1,
    explanation: "The three pillars of sustainability are environmental, social, and economic — sometimes referred to as 'planet, people, and profit'. True sustainable development requires a balance across all three pillars. For example, an electrical installation project should minimise environmental impact (planet), ensure safe and fair working conditions (people), and remain commercially viable (profit).",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Three pillars of sustainability",
    category: "Environmental Awareness"
  },
  {
    id: 16,
    question: "What does the term 'greenhouse effect' describe?",
    options: [
      "The process by which plants grow faster in glass greenhouses",
      "The trapping of heat in the Earth's atmosphere by greenhouse gases, which raises the planet's average temperature",
      "The cooling effect caused by cloud cover",
      "The reflection of sunlight by ice caps"
    ],
    correctAnswer: 1,
    explanation: "The greenhouse effect is the natural process by which certain gases in the Earth's atmosphere (including carbon dioxide, methane, and water vapour) trap heat radiated from the Earth's surface, keeping the planet warm enough to sustain life. Human activities such as burning fossil fuels have enhanced this effect by increasing the concentration of greenhouse gases, leading to global warming and climate change.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Greenhouse effect",
    category: "Environmental Awareness"
  },
  {
    id: 17,
    question: "What is the legal target year for the UK to achieve net zero greenhouse gas emissions?",
    options: [
      "2030",
      "2035",
      "2040",
      "2050"
    ],
    correctAnswer: 3,
    explanation: "The UK's legally binding target is to achieve net zero greenhouse gas emissions by 2050, as set out in the Climate Change Act 2008 (amended 2019). The UK was the first major economy to legislate for this target. Interim targets include a 68% reduction by 2030 and a 78% reduction by 2035, both relative to 1990 levels.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Net zero target",
    category: "Environmental Awareness"
  },
  {
    id: 18,
    question: "Under the Climate Change Act 2008, which independent body advises the UK Government on emissions targets and reports on progress?",
    options: [
      "The Environment Agency",
      "The Committee on Climate Change (CCC)",
      "The Carbon Trust",
      "The Energy Saving Trust"
    ],
    correctAnswer: 1,
    explanation: "The Climate Change Committee (CCC), originally named the Committee on Climate Change, is an independent statutory body established under the Climate Change Act 2008. It advises the UK and devolved governments on emissions targets and reports to Parliament on progress in reducing greenhouse gas emissions. Its recommendations have been instrumental in shaping UK climate policy, including the move to a net zero target.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Climate Change Committee",
    category: "Environmental Awareness"
  },
  {
    id: 19,
    question: "Which UN Sustainable Development Goal specifically addresses 'Affordable and Clean Energy'?",
    options: [
      "SDG 5",
      "SDG 7",
      "SDG 11",
      "SDG 13"
    ],
    correctAnswer: 1,
    explanation: "SDG 7 is 'Affordable and Clean Energy', which aims to ensure access to affordable, reliable, sustainable, and modern energy for all. This goal is particularly relevant to electricians, as the transition to renewable energy sources, energy-efficient installations, and smart grid technologies are all essential for achieving SDG 7. SDG 13 addresses Climate Action, SDG 11 covers Sustainable Cities and Communities, and SDG 5 relates to Gender Equality.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "UN SDGs",
    category: "Environmental Awareness"
  },
  {
    id: 20,
    question: "What is 'greenwashing'?",
    options: [
      "Cleaning equipment with environmentally friendly products",
      "The practice of making misleading or unsubstantiated claims about the environmental benefits of a product, service, or company practice",
      "Painting buildings green to improve their environmental rating",
      "Washing recycled materials before reprocessing them"
    ],
    correctAnswer: 1,
    explanation: "Greenwashing is the practice of making misleading, exaggerated, or unsubstantiated claims about the environmental credentials of a product, service, or company. The Competition and Markets Authority (CMA) published its Green Claims Code in 2021 to help businesses comply with consumer protection law when making environmental claims. The CMA has taken enforcement action against companies found to be greenwashing.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Greenwashing",
    category: "Environmental Awareness"
  },
  {
    id: 21,
    question: "What is the purpose of a Construction Environmental Management Plan (CEMP)?",
    options: [
      "To record the profit margins of a construction project",
      "To set out the environmental risks of a project and the measures to manage them throughout the construction phase",
      "To list all the employees working on a construction site",
      "To provide a schedule for delivery of construction materials"
    ],
    correctAnswer: 1,
    explanation: "A Construction Environmental Management Plan (CEMP) identifies the environmental risks associated with a construction project and sets out the management measures to mitigate them. CEMPs typically cover topics such as dust and air quality, noise and vibration, water management, waste, ecology, and traffic. They are often required as a condition of planning permission and are a key document for environmental compliance on site.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "CEMP",
    category: "Environmental Awareness"
  },
  {
    id: 22,
    question: "Under UK law, what is the 'polluter pays' principle?",
    options: [
      "The government pays for all pollution clean-up costs",
      "The person or organisation responsible for causing pollution bears the cost of managing it to prevent damage to human health or the environment",
      "Consumers pay a surcharge on all products to fund environmental clean-up",
      "Insurance companies cover all pollution-related costs"
    ],
    correctAnswer: 1,
    explanation: "The 'polluter pays' principle is a fundamental concept in UK and EU environmental law. It means that the person or organisation responsible for causing pollution should bear the costs of managing it to prevent damage to human health or the environment. This principle is embedded in the Environmental Protection Act 1990, the Environmental Damage (Prevention and Remediation) Regulations 2009, and the Environment Act 2021.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Polluter pays principle",
    category: "Environmental Awareness"
  },
  {
    id: 23,
    question: "What does 'embodied carbon' refer to in the construction industry?",
    options: [
      "The carbon dioxide absorbed by trees planted on a construction site",
      "The total greenhouse gas emissions associated with the manufacture, transport, installation, maintenance, and end-of-life disposal of building materials and components",
      "The amount of carbon stored in concrete after it has cured",
      "The carbon emitted by workers commuting to a construction site"
    ],
    correctAnswer: 1,
    explanation: "Embodied carbon refers to the total greenhouse gas emissions associated with the entire lifecycle of building materials and components — from raw material extraction, manufacturing, and transportation, through to installation, maintenance, and eventual demolition and disposal. It is distinct from operational carbon (the emissions from a building's energy use during its lifetime). Reducing embodied carbon is a major focus of sustainable construction practice.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Embodied carbon",
    category: "Environmental Awareness"
  },
  {
    id: 24,
    question: "What is a 'lifecycle assessment' (LCA)?",
    options: [
      "An assessment of how long an employee has worked for a company",
      "A systematic analysis of the environmental impacts of a product or service throughout its entire life, from raw material extraction to disposal",
      "A review of the lifespan of electrical equipment for warranty purposes",
      "An annual financial audit of a construction company"
    ],
    correctAnswer: 1,
    explanation: "A lifecycle assessment (LCA) is a systematic method for evaluating the environmental impacts of a product, process, or service throughout its entire life — from 'cradle to grave'. This includes raw material extraction, manufacturing, distribution, use, and end-of-life disposal or recycling. LCA is governed by ISO 14040 and ISO 14044 and is increasingly used in construction to compare the environmental performance of different materials and design options.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Lifecycle assessment",
    category: "Environmental Awareness"
  },
  {
    id: 25,
    question: "What is the primary greenhouse gas emitted by the burning of fossil fuels?",
    options: [
      "Methane (CH4)",
      "Nitrous oxide (N2O)",
      "Carbon dioxide (CO2)",
      "Ozone (O3)"
    ],
    correctAnswer: 2,
    explanation: "Carbon dioxide (CO2) is the primary greenhouse gas emitted from the combustion of fossil fuels such as coal, oil, and natural gas. While methane and nitrous oxide are also potent greenhouse gases, CO2 accounts for approximately 80% of UK greenhouse gas emissions. The construction sector contributes significantly through energy use, transport, and the manufacture of materials like cement and steel.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Greenhouse gases",
    category: "Environmental Awareness"
  },
  {
    id: 26,
    question: "What does the Environment Act 2021 require regarding single-use plastics?",
    options: [
      "It bans all plastic packaging",
      "It introduces powers to ban or restrict specific single-use plastic items and create extended producer responsibility schemes",
      "It requires all plastics to be biodegradable by 2025",
      "It places a 50p tax on every plastic item sold"
    ],
    correctAnswer: 1,
    explanation: "The Environment Act 2021 provides powers for the Secretary of State to ban or restrict the supply of specific single-use plastic items. It also establishes the framework for extended producer responsibility (EPR) schemes, which make producers responsible for the costs of managing their products at end of life. Bans on single-use plastic straws, stirrers, and cotton buds came into effect in England in October 2020 under related regulations.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Single-use plastics",
    category: "Environmental Awareness"
  },
  {
    id: 27,
    question: "What is 'carbon offsetting'?",
    options: [
      "Switching from one fossil fuel to another",
      "Compensating for greenhouse gas emissions by funding an equivalent carbon dioxide saving elsewhere, such as tree planting or renewable energy projects",
      "Moving carbon-producing industries to a different country",
      "Measuring the carbon content of building materials"
    ],
    correctAnswer: 1,
    explanation: "Carbon offsetting involves compensating for greenhouse gas emissions by funding projects that reduce or remove an equivalent amount of CO2 elsewhere. Examples include tree planting, renewable energy projects, and methane capture schemes. While offsetting is part of the net zero strategy, it should be used alongside — not instead of — direct emissions reductions. The UK Government's approach prioritises reducing emissions first, with offsetting for residual emissions only.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Carbon offsetting",
    category: "Environmental Awareness"
  },
  {
    id: 28,
    question: "Which environmental assessment method is most commonly used to rate the sustainability of buildings in the UK?",
    options: [
      "LEED",
      "BREEAM",
      "Passivhaus",
      "WELL"
    ],
    correctAnswer: 1,
    explanation: "BREEAM (Building Research Establishment Environmental Assessment Method) is the world's leading and most widely used sustainability assessment method for buildings, infrastructure, and communities. Developed in the UK in 1990 by BRE, it assesses buildings against categories including energy, water, health, pollution, transport, materials, waste, ecology, and management. LEED is the American equivalent, Passivhaus is a design standard, and WELL focuses on health and wellbeing.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "BREEAM",
    category: "Environmental Awareness"
  },
  {
    id: 29,
    question: "What is the purpose of Environmental Product Declarations (EPDs)?",
    options: [
      "To declare the selling price of environmentally friendly products",
      "To provide standardised, verified information about the environmental impact of a product throughout its lifecycle",
      "To certify that a product contains no plastic components",
      "To advertise products as 'green' to consumers"
    ],
    correctAnswer: 1,
    explanation: "Environmental Product Declarations (EPDs) provide standardised, independently verified data about the environmental impact of a product throughout its lifecycle, based on lifecycle assessment (LCA). They are governed by ISO 14025 and EN 15804 (for construction products). EPDs allow specifiers, designers, and contractors to compare the environmental performance of different products on a like-for-like basis, supporting sustainable procurement decisions.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "EPDs",
    category: "Environmental Awareness"
  },
  {
    id: 30,
    question: "What is a 'Scope 1' greenhouse gas emission?",
    options: [
      "Emissions from purchased electricity",
      "Direct emissions from sources owned or controlled by the organisation, such as company vehicles and on-site fuel combustion",
      "Indirect emissions from the organisation's supply chain",
      "Emissions from employee commuting"
    ],
    correctAnswer: 1,
    explanation: "Scope 1 emissions are direct greenhouse gas emissions from sources owned or controlled by the organisation. Examples include fuel combustion in company vehicles, on-site generators, gas boilers, and fugitive emissions from refrigerants. Scope 2 covers indirect emissions from purchased electricity, heat, or steam. Scope 3 covers all other indirect emissions in the value chain, including supply chain, business travel, and employee commuting. This classification follows the GHG Protocol.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Scope 1 emissions",
    category: "Environmental Awareness"
  },
  {
    id: 31,
    question: "What is the difference between 'Scope 2' and 'Scope 3' greenhouse gas emissions?",
    options: [
      "Scope 2 covers employee travel; Scope 3 covers office heating",
      "Scope 2 covers indirect emissions from purchased energy (electricity, heat, steam); Scope 3 covers all other indirect emissions in the value chain",
      "Scope 2 covers manufacturing emissions; Scope 3 covers packaging",
      "There is no difference; they are interchangeable terms"
    ],
    correctAnswer: 1,
    explanation: "Under the GHG Protocol, Scope 2 emissions are indirect emissions arising from the generation of purchased electricity, heat, or steam consumed by the organisation. Scope 3 emissions cover all other indirect emissions occurring across the organisation's value chain, both upstream (e.g., purchased materials, transport) and downstream (e.g., product use, end-of-life disposal). For construction companies, Scope 3 typically represents the largest share of total emissions.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Scope 2 and 3 emissions",
    category: "Environmental Awareness"
  },
  {
    id: 32,
    question: "What role does the 'precautionary principle' play in environmental decision-making?",
    options: [
      "It requires proof of harm before any action is taken",
      "It states that where there are threats of serious or irreversible environmental damage, lack of full scientific certainty shall not be used as a reason for postponing cost-effective measures to prevent degradation",
      "It prevents all new development until environmental studies are complete",
      "It only applies to nuclear energy projects"
    ],
    correctAnswer: 1,
    explanation: "The precautionary principle states that where there are threats of serious or irreversible environmental damage, a lack of full scientific certainty should not be used as a reason for postponing cost-effective measures to prevent environmental degradation. It is enshrined in the Environment Act 2021 and underpins UK environmental policy. It means decision-makers should err on the side of caution when potential environmental harm is identified, even if the evidence is not conclusive.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Precautionary principle",
    category: "Environmental Awareness"
  },
  {
    id: 33,
    question: "What is the primary purpose of the UK's Climate Change Levy (CCL)?",
    options: [
      "To fund local authority recycling services",
      "To encourage businesses to reduce energy consumption and greenhouse gas emissions by taxing energy supplies to business and public sector users",
      "To subsidise household energy bills",
      "To penalise companies that do not recycle"
    ],
    correctAnswer: 1,
    explanation: "The Climate Change Levy (CCL) is a tax on energy supplies (electricity, natural gas, LPG, and solid fuels) delivered to business and public sector users in the UK. Its purpose is to incentivise energy efficiency and the reduction of greenhouse gas emissions. Businesses that enter into Climate Change Agreements (CCAs) with the Environment Agency can receive a discount on the CCL in return for meeting agreed energy efficiency or carbon reduction targets.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Climate Change Levy",
    category: "Environmental Awareness"
  },
  {
    id: 34,
    question: "What does 'carbon literacy' mean?",
    options: [
      "The ability to read carbon emissions data on product labels",
      "An awareness of the carbon dioxide costs and impacts of everyday activities and the ability and motivation to reduce emissions",
      "A formal qualification in carbon trading",
      "The ability to measure CO2 levels in the atmosphere using scientific equipment"
    ],
    correctAnswer: 1,
    explanation: "Carbon literacy is defined as an awareness of the carbon dioxide costs and impacts of everyday activities, combined with the ability and motivation to reduce emissions on an individual, community, and organisational basis. The Carbon Literacy Project offers a certified training programme that helps individuals and organisations understand and reduce their carbon footprint. It is increasingly recognised in the construction industry as part of sustainability training.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Carbon literacy",
    category: "Environmental Awareness"
  },
  {
    id: 35,
    question: "What is the purpose of the UK Emissions Trading Scheme (UK ETS)?",
    options: [
      "To trade surplus building materials between construction sites",
      "To set a cap on total greenhouse gas emissions from participating sectors, allowing those who emit less to sell allowances to higher emitters",
      "To create a marketplace for recycled materials",
      "To tax individuals based on their personal carbon footprint"
    ],
    correctAnswer: 1,
    explanation: "The UK Emissions Trading Scheme (UK ETS) replaced the UK's participation in the EU ETS after Brexit. It is a cap-and-trade system that sets an overall cap on the total amount of greenhouse gases that can be emitted by participants in covered sectors (primarily energy-intensive industries, power generation, and aviation). Organisations that emit less than their allocation can sell surplus allowances to those who exceed theirs, creating a financial incentive to reduce emissions.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "UK ETS",
    category: "Environmental Awareness"
  },
  {
    id: 36,
    question: "What is 'environmental due diligence'?",
    options: [
      "Cleaning up a site after construction is complete",
      "The process of investigating and assessing the environmental risks and liabilities associated with a property, business, or transaction before proceeding",
      "Checking that all waste bins on site are correctly labelled",
      "Completing a weekly site inspection for health and safety"
    ],
    correctAnswer: 1,
    explanation: "Environmental due diligence is the process of investigating and assessing the environmental risks and liabilities associated with a property, business, or transaction. It typically involves desk-based studies, site investigations, and environmental audits to identify issues such as contaminated land, asbestos, flood risk, and regulatory compliance. It is standard practice in property transactions, mergers, and major development projects.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Environmental due diligence",
    category: "Environmental Awareness"
  },
  {
    id: 37,
    question: "What is the 'linear economy' model?",
    options: [
      "An economic model based on straight-line transport routes",
      "The traditional 'take, make, dispose' model in which resources are extracted, manufactured into products, used, and then discarded as waste",
      "An economy where products are arranged in a production line",
      "A model where economic growth follows a straight upward trend"
    ],
    correctAnswer: 1,
    explanation: "The linear economy follows a 'take, make, dispose' pattern: raw materials are extracted, manufactured into products, used by consumers, and then discarded as waste. This model is inherently unsustainable because it depletes finite resources and generates increasing volumes of waste. The circular economy is the alternative model that aims to eliminate waste and keep resources in use for as long as possible.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Linear economy",
    category: "Environmental Awareness"
  },
  {
    id: 38,
    question: "What does 'Defra' stand for?",
    options: [
      "Department for Energy, Fuels and Regulatory Affairs",
      "Department for Environment, Food and Rural Affairs",
      "Division of Environmental Frameworks and Regulations Act",
      "Department for Ecology, Forestry and Resource Allocation"
    ],
    correctAnswer: 1,
    explanation: "Defra stands for the Department for Environment, Food and Rural Affairs. It is the UK Government department responsible for environmental protection, food production and standards, agriculture, fisheries, and rural communities. Defra sets environmental policy, which is then implemented and enforced by bodies such as the Environment Agency and Natural England.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Defra",
    category: "Environmental Awareness"
  },
  {
    id: 39,
    question: "What is a 'carbon budget' in the context of UK climate legislation?",
    options: [
      "The amount of money allocated to carbon reduction projects",
      "A cap on the total amount of greenhouse gases the UK can emit over a five-year period, set under the Climate Change Act 2008",
      "The annual budget for the Carbon Trust",
      "A personal spending limit on fossil fuel products"
    ],
    correctAnswer: 1,
    explanation: "Carbon budgets are caps on the total amount of greenhouse gases that can be emitted in the UK over successive five-year periods. They are set under the Climate Change Act 2008 and act as stepping stones towards the 2050 net zero target. The UK is currently in its fourth carbon budget (2023-2027). Each budget is set at least 12 years in advance on the advice of the Climate Change Committee, giving businesses and industries time to plan their decarbonisation strategies.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Carbon budgets",
    category: "Environmental Awareness"
  },
  {
    id: 40,
    question: "What is 'operational carbon' in the context of buildings?",
    options: [
      "The carbon emitted during the demolition of a building",
      "The greenhouse gas emissions resulting from the energy used to operate a building during its lifetime, including heating, cooling, lighting, and equipment",
      "The carbon stored within the structure of the building",
      "The carbon released during the manufacturing of building materials"
    ],
    correctAnswer: 1,
    explanation: "Operational carbon refers to the greenhouse gas emissions resulting from the energy consumed to operate a building throughout its lifetime — including heating, cooling, ventilation, lighting, hot water, and the use of electrical equipment. It is distinct from embodied carbon (emissions from materials and construction). Reducing operational carbon is achieved through energy-efficient design, high-performance insulation, efficient heating systems, LED lighting, and renewable energy generation.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Operational carbon",
    category: "Environmental Awareness"
  },

  // =======================================================================
  // WASTE MANAGEMENT — 40 questions (id 41-80)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 41,
    question: "What is the correct order of the waste hierarchy, from most to least preferred?",
    options: [
      "Recycle, Reduce, Reuse, Recover, Dispose",
      "Reduce, Reuse, Recycle, Recover, Dispose",
      "Dispose, Recover, Recycle, Reuse, Reduce",
      "Reuse, Reduce, Recycle, Dispose, Recover"
    ],
    correctAnswer: 1,
    explanation: "The waste hierarchy ranks waste management options from most to least environmentally preferred: Prevention (Reduce), Reuse, Recycle, Recovery (e.g., energy from waste), and Disposal (landfill). This hierarchy is enshrined in the Waste (England and Wales) Regulations 2011 and reflects EU Waste Framework Directive principles retained in UK law. All waste producers and handlers have a legal duty to apply the waste hierarchy.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Waste hierarchy",
    category: "Waste Management"
  },
  {
    id: 42,
    question: "What is the 'duty of care' for waste under the Environmental Protection Act 1990?",
    options: [
      "A voluntary code of practice for large companies",
      "A legal obligation on anyone who produces, imports, carries, keeps, treats, or disposes of controlled waste to ensure it is managed properly and transferred only to authorised persons",
      "A requirement to donate unwanted materials to charity",
      "An obligation that only applies to waste management companies"
    ],
    correctAnswer: 1,
    explanation: "Section 34 of the Environmental Protection Act 1990 imposes a 'duty of care' on anyone who produces, imports, carries, keeps, treats, or disposes of controlled (non-agricultural, non-mining) waste. This includes ensuring waste is stored safely, transferred only to authorised persons, and accompanied by a written description (waste transfer note). Breach of the duty of care is a criminal offence carrying an unlimited fine.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Duty of care",
    category: "Waste Management"
  },
  {
    id: 43,
    question: "What document must accompany the transfer of non-hazardous waste between parties?",
    options: [
      "A consignment note",
      "A waste transfer note",
      "An environmental impact assessment",
      "A building regulations certificate"
    ],
    correctAnswer: 1,
    explanation: "A waste transfer note (WTN) must accompany every transfer of non-hazardous controlled waste. It must include a description of the waste, the quantity, the type of container, the SIC code of the producer, the waste carrier's licence number, and be signed by both parties. Waste transfer notes must be retained for at least two years. For hazardous waste, a consignment note is required instead.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Waste transfer notes",
    category: "Waste Management"
  },
  {
    id: 44,
    question: "How long must a waste transfer note be retained by both the transferor and the transferee?",
    options: [
      "6 months",
      "1 year",
      "2 years",
      "5 years"
    ],
    correctAnswer: 2,
    explanation: "Under the Environmental Protection (Duty of Care) Regulations 1991, waste transfer notes must be retained for a minimum of two years from the date of transfer. Both the person transferring the waste and the person receiving it must keep a copy. For hazardous waste consignment notes, the retention period is three years. Failure to retain these documents is a criminal offence.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Waste transfer note retention",
    category: "Waste Management"
  },
  {
    id: 45,
    question: "What type of document is required when transferring hazardous waste?",
    options: [
      "A waste transfer note",
      "A consignment note",
      "A delivery receipt",
      "A purchase order"
    ],
    correctAnswer: 1,
    explanation: "Hazardous waste must be accompanied by a consignment note when it is transferred. This is a legal requirement under the Hazardous Waste (England and Wales) Regulations 2005. The consignment note contains more detailed information than a standard waste transfer note, including the specific hazardous properties of the waste (e.g., toxic, flammable, corrosive) and its European Waste Catalogue (EWC) code. Consignment notes must be retained for at least three years.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Consignment notes",
    category: "Waste Management"
  },
  {
    id: 46,
    question: "How long must hazardous waste consignment notes be retained?",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "6 years"
    ],
    correctAnswer: 2,
    explanation: "Hazardous waste consignment notes must be retained for a minimum of three years from the date on which the waste is transferred. This is one year longer than the two-year retention period for non-hazardous waste transfer notes. The longer retention period reflects the greater environmental and health risks associated with hazardous waste and the need for a robust audit trail.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Consignment note retention",
    category: "Waste Management"
  },
  {
    id: 47,
    question: "What does 'WEEE' stand for in waste management?",
    options: [
      "Waste Electrical and Electronic Equipment",
      "Water and Energy Efficiency Evaluation",
      "Waste Elimination and Environmental Engineering",
      "Workplace Environmental and Ecological Enforcement"
    ],
    correctAnswer: 0,
    explanation: "WEEE stands for Waste Electrical and Electronic Equipment. The WEEE Regulations 2013 implement the EU WEEE Directive in the UK and place obligations on producers, distributors, and recyclers of electrical and electronic equipment to ensure proper collection, treatment, and recycling. Electricians routinely handle WEEE when removing old light fittings, consumer units, cables, and other equipment during rewires and upgrades.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "WEEE",
    category: "Waste Management"
  },
  {
    id: 48,
    question: "What is 'fly-tipping'?",
    options: [
      "Disposing of waste at an authorised recycling centre",
      "The illegal dumping of waste on land that has no licence to accept it",
      "Sorting waste into different recycling categories",
      "Transporting waste by air freight"
    ],
    correctAnswer: 1,
    explanation: "Fly-tipping is the illegal deposit of waste on land that does not have a licence or permit to accept it. It is a criminal offence under Section 33 of the Environmental Protection Act 1990, carrying penalties of up to five years' imprisonment and an unlimited fine. Local authorities and the Environment Agency can also issue fixed penalty notices of up to £50,000 for fly-tipping. Construction and demolition waste is among the most commonly fly-tipped categories.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Fly-tipping",
    category: "Waste Management"
  },
  {
    id: 49,
    question: "What is a Site Waste Management Plan (SWMP)?",
    options: [
      "A plan for locating bins on a construction site",
      "A document that sets out how waste will be managed on a construction site, including waste types, quantities, and disposal routes",
      "An insurance policy covering waste-related incidents",
      "A schedule for waste collection vehicle arrivals"
    ],
    correctAnswer: 1,
    explanation: "A Site Waste Management Plan (SWMP) is a document that details how construction waste will be managed throughout a project. Although the mandatory SWMP requirement under the Site Waste Management Plans Regulations 2008 was revoked in 2013, SWMPs remain industry best practice and are frequently required by clients, principal contractors, and under BREEAM or other sustainability schemes. A good SWMP identifies expected waste types and quantities, sets waste reduction targets, and records actual waste arisings and disposal routes.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "SWMPs",
    category: "Waste Management"
  },
  {
    id: 50,
    question: "What is 'landfill tax' designed to achieve?",
    options: [
      "Fund the construction of new landfill sites",
      "Discourage the disposal of waste to landfill by increasing costs, thereby encouraging waste reduction, reuse, and recycling",
      "Pay for the transportation of waste to landfill sites",
      "Subsidise organisations that use landfill for waste disposal"
    ],
    correctAnswer: 1,
    explanation: "Landfill tax is a UK environmental tax charged on every tonne of waste disposed of at a landfill site. Its purpose is to make landfill disposal more expensive relative to other waste management options, thereby encouraging waste prevention, reuse, recycling, and energy recovery. As of 2024, the standard rate of landfill tax is £103.70 per tonne for active waste and £3.25 per tonne for inert waste. It has been effective in driving significant reductions in the amount of waste sent to landfill.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Landfill tax",
    category: "Waste Management"
  },
  {
    id: 51,
    question: "What are European Waste Catalogue (EWC) codes used for?",
    options: [
      "Pricing waste collection services across Europe",
      "Classifying and identifying waste types using a standardised six-digit coding system",
      "Tracking the movement of goods across European borders",
      "Rating the environmental performance of waste companies"
    ],
    correctAnswer: 1,
    explanation: "European Waste Catalogue (EWC) codes are a standardised system of six-digit codes used to classify and identify different types of waste. They are used on waste transfer notes and consignment notes to describe the waste being transferred. Despite Brexit, the UK continues to use the EWC coding system. For example, EWC code 17 04 11 covers cables (construction and demolition waste containing metals), which is a common waste stream for electricians.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "EWC codes",
    category: "Waste Management"
  },
  {
    id: 52,
    question: "Which waste carrier registration is required to transport controlled waste in England?",
    options: [
      "An ISO 14001 certificate",
      "A waste carrier's licence (registration) issued by the Environment Agency",
      "A standard driving licence",
      "A Local Authority planning permit"
    ],
    correctAnswer: 1,
    explanation: "Anyone who transports controlled waste in England must be registered as a waste carrier with the Environment Agency under the Controlled Waste (Registration of Carriers and Seizure of Vehicles) Regulations 1991 (as amended). There are two tiers: upper tier (for those who transport waste as a regular part of their business) and lower tier (for those who only transport their own waste). Failure to register is a criminal offence.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Waste carrier registration",
    category: "Waste Management"
  },
  {
    id: 53,
    question: "What is a 'waste exemption'?",
    options: [
      "Permission to dump waste anywhere without restriction",
      "A registration that allows certain low-risk waste activities to be carried out without a full environmental permit",
      "An exemption from paying landfill tax",
      "A special licence for handling radioactive waste"
    ],
    correctAnswer: 1,
    explanation: "A waste exemption is a registration (not a permit) that allows certain low-risk waste operations to be carried out without the need for a full environmental permit. Examples include storing waste at the place of production, burning waste in the open, and using waste for construction. Exemptions are registered with the Environment Agency and are subject to conditions and limits. They are free to register and last for three years.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Waste exemptions",
    category: "Waste Management"
  },
  {
    id: 54,
    question: "What is the penalty for fly-tipping under Section 33 of the Environmental Protection Act 1990?",
    options: [
      "A verbal warning only",
      "A fine of up to £200",
      "Up to 5 years' imprisonment and/or an unlimited fine",
      "A one-month suspension of driving licence"
    ],
    correctAnswer: 2,
    explanation: "Fly-tipping is a criminal offence under Section 33 of the Environmental Protection Act 1990. On conviction in the Crown Court, offenders face up to five years' imprisonment, an unlimited fine, or both. Magistrates' courts can impose up to 12 months' imprisonment and/or an unlimited fine. The courts can also order the forfeiture of any vehicle used in the commission of the offence. Fixed penalty notices of up to £1,000 can be issued for small-scale fly-tipping.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Fly-tipping penalties",
    category: "Waste Management"
  },
  {
    id: 55,
    question: "What does the term 'controlled waste' mean?",
    options: [
      "Waste that is stored in locked containers",
      "Household, industrial, and commercial waste as defined by the Environmental Protection Act 1990",
      "Waste that is radioactive",
      "Any waste produced by the government"
    ],
    correctAnswer: 1,
    explanation: "Controlled waste is defined in Part II of the Environmental Protection Act 1990 as household, industrial, and commercial waste. It is the main category of waste regulated under the Act and subject to the duty of care, waste transfer note requirements, and licensed disposal. Agricultural waste, mining waste, and radioactive waste are excluded from the definition and are regulated under separate legislation.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Controlled waste",
    category: "Waste Management"
  },
  {
    id: 56,
    question: "What types of waste are commonly classified as hazardous on a construction site?",
    options: [
      "Timber off-cuts and cardboard packaging",
      "Asbestos, lead paint, used solvents, fluorescent tubes, and some adhesives",
      "Clean concrete rubble and bricks",
      "Plastic packaging and bubble wrap"
    ],
    correctAnswer: 1,
    explanation: "Common hazardous wastes encountered on construction sites include asbestos-containing materials, lead-based paints, used solvents and thinners, fluorescent tubes and discharge lamps (which contain mercury), oil and fuel contaminated materials, adhesives containing volatile organic compounds, and batteries. These wastes exhibit one or more hazardous properties (e.g., toxic, flammable, corrosive, carcinogenic) and must be segregated, stored, and disposed of separately from non-hazardous waste using consignment notes.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Hazardous waste on site",
    category: "Waste Management"
  },
  {
    id: 57,
    question: "Under the WEEE Regulations, what obligation do distributors of electrical equipment have when a customer buys a new like-for-like product?",
    options: [
      "They must charge the customer for disposal of the old equipment",
      "They must offer to take back the old equipment free of charge on a like-for-like basis",
      "They have no obligations regarding old equipment",
      "They must send the old equipment to landfill"
    ],
    correctAnswer: 1,
    explanation: "Under the WEEE Regulations 2013, distributors (retailers) of electrical and electronic equipment must offer to take back old equipment free of charge on a like-for-like basis when a customer purchases a new equivalent product. This is known as 'distributor take-back'. Alternatively, distributors can join the Distributor Takeback Scheme (DTS) and contribute to the funding of local authority WEEE collection services instead.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "WEEE distributor obligations",
    category: "Waste Management"
  },
  {
    id: 58,
    question: "What is the purpose of waste segregation on a construction site?",
    options: [
      "To make the site look tidier for inspections",
      "To separate different types of waste so they can be reused, recycled, or disposed of appropriately, maximising resource recovery and reducing landfill",
      "To reduce the number of waste bins required",
      "To comply with the Planning (Listed Buildings and Conservation Areas) Act"
    ],
    correctAnswer: 1,
    explanation: "Waste segregation involves separating different types of waste at source (e.g., metals, timber, plasterboard, plastics, hazardous waste) so that each stream can be managed in the most environmentally beneficial way. Proper segregation maximises recycling and recovery rates, reduces contamination of recyclable materials, ensures hazardous waste is handled safely, and minimises the amount of waste sent to landfill — reducing both environmental impact and disposal costs.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Waste segregation",
    category: "Waste Management"
  },
  {
    id: 59,
    question: "What is 'extended producer responsibility' (EPR)?",
    options: [
      "A warranty extension offered by manufacturers",
      "A policy principle that makes producers responsible for the environmental impact of their products throughout the product lifecycle, including end-of-life management",
      "A requirement for producers to extend their product range",
      "A tax relief scheme for small producers"
    ],
    correctAnswer: 1,
    explanation: "Extended Producer Responsibility (EPR) is a policy approach that makes producers financially and/or physically responsible for the environmental impact of their products throughout the entire lifecycle, including collection, recycling, and disposal at end of life. In the UK, EPR schemes exist for packaging, WEEE, batteries, and end-of-life vehicles. The Environment Act 2021 extends EPR powers significantly, with a new packaging EPR scheme phased in from 2024.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Extended producer responsibility",
    category: "Waste Management"
  },
  {
    id: 60,
    question: "What does the term 'duty of care' require of a construction company producing waste?",
    options: [
      "Only that they hire a skip and place waste inside it",
      "That they take all reasonable steps to prevent the unauthorised deposit, treatment, or disposal of waste; store waste safely and securely; transfer waste only to authorised persons; and provide an accurate written description of the waste",
      "That they send an annual waste report to the Environment Agency",
      "That they recycle at least 50% of all waste produced"
    ],
    correctAnswer: 1,
    explanation: "The duty of care under Section 34 of the Environmental Protection Act 1990 requires waste producers to take all reasonable steps to: prevent the escape of waste from their control; ensure waste is transferred only to an authorised person (a registered waste carrier or to a permitted/exempt facility); provide an accurate description of the waste on the waste transfer note; and keep the waste safe and secure until it is collected. These obligations continue until the waste is received by an authorised person.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Duty of care requirements",
    category: "Waste Management"
  },
  {
    id: 61,
    question: "Which regulation specifically governs the handling and disposal of hazardous waste in England and Wales?",
    options: [
      "The Control of Substances Hazardous to Health Regulations 2002",
      "The Hazardous Waste (England and Wales) Regulations 2005",
      "The Health and Safety at Work etc Act 1974",
      "The Dangerous Substances and Explosive Atmospheres Regulations 2002"
    ],
    correctAnswer: 1,
    explanation: "The Hazardous Waste (England and Wales) Regulations 2005 specifically govern the production, storage, movement, and disposal of hazardous waste. They require the use of consignment notes, registration of premises that produce more than 500kg of hazardous waste per year, and the proper classification of waste using hazardous properties (HP codes). COSHH covers substances hazardous to health in the workplace, which is a related but separate regulatory regime.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Hazardous Waste Regulations",
    category: "Waste Management"
  },
  {
    id: 62,
    question: "What is the 'waste hierarchy' a legal requirement under?",
    options: [
      "The Building Regulations 2010",
      "The Waste (England and Wales) Regulations 2011",
      "The Construction (Design and Management) Regulations 2015",
      "The Electricity at Work Regulations 1989"
    ],
    correctAnswer: 1,
    explanation: "The waste hierarchy is a legal requirement under the Waste (England and Wales) Regulations 2011, which transposed the EU Waste Framework Directive (2008/98/EC) into English and Welsh law. Regulation 12 requires anyone involved in waste management to apply the waste hierarchy — prevention, preparing for reuse, recycling, other recovery, and disposal — as a priority order. Departure from the hierarchy is permitted only where justified by lifecycle assessment or where compliance is not technically feasible.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Waste hierarchy legislation",
    category: "Waste Management"
  },
  {
    id: 63,
    question: "What is 'plasterboard' waste and why does it require special handling on construction sites?",
    options: [
      "It is a type of hazardous waste that must be incinerated",
      "It contains gypsum which, when landfilled with biodegradable waste, can produce toxic hydrogen sulphide gas, so it must be segregated and sent to specialist facilities",
      "It is classified as inert waste and can be used as general fill material",
      "It is radioactive and must be disposed of by licensed handlers only"
    ],
    correctAnswer: 1,
    explanation: "Plasterboard contains gypsum (calcium sulphate), which when landfilled with biodegradable waste in anaerobic conditions can react to produce hydrogen sulphide (H2S), a toxic and foul-smelling gas. Since 2009, plasterboard waste has been banned from disposal in non-hazardous landfill sites that also accept biodegradable waste. It must be segregated on site and sent to specialist recycling or disposal facilities. Many plasterboard manufacturers operate take-back recycling schemes.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Plasterboard waste",
    category: "Waste Management"
  },
  {
    id: 64,
    question: "What is the standard EWC code prefix for construction and demolition waste?",
    options: [
      "15",
      "16",
      "17",
      "20"
    ],
    correctAnswer: 2,
    explanation: "Chapter 17 of the European Waste Catalogue covers 'Construction and demolition wastes (including excavated soil from contaminated sites)'. EWC codes beginning with 17 include subcategories such as 17 01 (concrete, bricks, tiles), 17 02 (wood, glass, plastic), 17 03 (bituminous mixtures and tar), 17 04 (metals), 17 05 (soil and stones), 17 06 (insulation materials), 17 08 (gypsum-based materials), and 17 09 (mixed construction waste). Codes marked with an asterisk (*) indicate hazardous waste.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "EWC codes for construction waste",
    category: "Waste Management"
  },
  {
    id: 65,
    question: "What information must be included on a waste transfer note?",
    options: [
      "Only the name of the waste carrier",
      "A description of the waste, the quantity, the type of container, the date of transfer, the SIC code of the waste producer, details of both parties, and the waste carrier's registration number",
      "Only the date of transfer and the weight of waste",
      "The environmental permit number of the waste producer"
    ],
    correctAnswer: 1,
    explanation: "A waste transfer note must include: a description of the waste (including the EWC code); the quantity and type of container; the time and date of transfer; the name, address, and signature of both the transferor and transferee; the SIC (Standard Industrial Classification) code of the waste producer; the waste carrier's registration number; and the permit or exemption number of the receiving facility. All of this information is required by the Environmental Protection (Duty of Care) Regulations 1991.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Waste transfer note contents",
    category: "Waste Management"
  },
  {
    id: 66,
    question: "What is the maximum fixed penalty notice that can be issued by a local authority for fly-tipping?",
    options: [
      "£200",
      "£500",
      "£1,000",
      "£5,000"
    ],
    correctAnswer: 2,
    explanation: "Local authorities in England can issue fixed penalty notices (FPNs) of up to £1,000 for fly-tipping offences under the Unauthorised Deposit of Waste (Fixed Penalties) Regulations 2016. The minimum fixed penalty is £150, with a default of £400. FPNs are an alternative to prosecution for lower-level offences. More serious cases can be prosecuted in court, where penalties can include imprisonment and unlimited fines.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Fly-tipping fixed penalties",
    category: "Waste Management"
  },
  {
    id: 67,
    question: "What responsibility does the principal contractor have for waste management under CDM 2015?",
    options: [
      "The principal contractor has no waste management responsibilities under CDM",
      "The principal contractor must ensure that waste is managed in accordance with the waste hierarchy, that waste is properly segregated and stored on site, and that waste removal arrangements are in place",
      "The principal contractor only needs to ensure waste is placed in a skip",
      "Waste management responsibilities rest solely with the client under CDM"
    ],
    correctAnswer: 1,
    explanation: "Under the Construction (Design and Management) Regulations 2015, the principal contractor has a duty to plan, manage, and monitor the construction phase, which includes waste management. While CDM does not explicitly detail waste management requirements, the principal contractor must ensure the site complies with all relevant environmental legislation, including the waste hierarchy, duty of care, and proper waste segregation and storage. The Construction Phase Plan should address waste management arrangements.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "CDM waste responsibilities",
    category: "Waste Management"
  },
  {
    id: 68,
    question: "What is 'recovery' in the context of the waste hierarchy?",
    options: [
      "Retrieving items from a skip for personal use",
      "Any waste operation whose principal result is that waste serves a useful purpose by replacing other materials, including energy recovery through incineration",
      "Recovering money from selling scrap materials",
      "The process of finding lost waste documents"
    ],
    correctAnswer: 1,
    explanation: "In the waste hierarchy, 'recovery' refers to any operation whose principal result is that waste serves a useful purpose by replacing other materials that would otherwise have been used. The most common example is energy recovery — incinerating waste to generate electricity or heat (energy from waste, or EfW). Other examples include using waste materials as backfill or in road construction. Recovery sits above disposal (landfill) but below recycling in the hierarchy.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Waste recovery",
    category: "Waste Management"
  },
  {
    id: 69,
    question: "What is the standard UK landfill tax rate per tonne for non-inert (active) waste as of 2024?",
    options: [
      "£3.25 per tonne",
      "£50.00 per tonne",
      "£103.70 per tonne",
      "£200.00 per tonne"
    ],
    correctAnswer: 2,
    explanation: "As of April 2024, the standard rate of UK landfill tax is £103.70 per tonne for non-inert (active) waste. The lower rate for inert waste (such as clean bricks, concrete, and soil) is £3.25 per tonne. The standard rate has increased steadily since landfill tax was introduced in 1996 at £7 per tonne, reflecting the government's policy of making landfill disposal progressively more expensive to drive waste up the hierarchy towards prevention, reuse, and recycling.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Landfill tax rate",
    category: "Waste Management"
  },
  {
    id: 70,
    question: "What colour-coded waste bin is typically used for general waste (non-recyclable) on a UK construction site?",
    options: [
      "Green",
      "Blue",
      "Black",
      "Yellow"
    ],
    correctAnswer: 2,
    explanation: "On UK construction sites, black bins or containers are typically used for general (non-recyclable) waste destined for landfill or energy recovery. While there is no single mandatory colour-coding standard for construction site waste, common industry practice uses: black for general waste, blue for paper and cardboard, green for glass, yellow for metals and cans, and red or purple for hazardous waste. Clear signage with waste descriptions and pictures is essential alongside colour-coding.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Waste bin colour coding",
    category: "Waste Management"
  },
  {
    id: 71,
    question: "What is the primary risk associated with mixing hazardous and non-hazardous waste?",
    options: [
      "The skip will be too heavy to transport",
      "The entire waste load becomes classified as hazardous, increasing disposal costs and regulatory requirements, and potentially causing environmental contamination or chemical reactions",
      "The waste will take longer to decompose in landfill",
      "It makes recycling slightly more difficult"
    ],
    correctAnswer: 1,
    explanation: "Mixing hazardous waste with non-hazardous waste is prohibited under the Hazardous Waste Regulations 2005 unless authorised by an environmental permit. When hazardous waste is mixed with non-hazardous waste, the entire load is typically classified as hazardous, significantly increasing disposal costs and regulatory requirements. Mixing can also cause dangerous chemical reactions, produce toxic gases, contaminate recyclable materials, and result in environmental pollution.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Mixing hazardous waste",
    category: "Waste Management"
  },
  {
    id: 72,
    question: "What happens to fluorescent tubes at the end of their life?",
    options: [
      "They can be disposed of in general waste bins",
      "They are classified as hazardous waste because they contain mercury, and must be collected, stored, and recycled through specialist WEEE recycling channels",
      "They are incinerated at standard energy-from-waste plants",
      "They are crushed and used as road aggregate"
    ],
    correctAnswer: 1,
    explanation: "Fluorescent tubes are classified as hazardous waste (EWC code 20 01 21*) because they contain small amounts of mercury vapour. They must be handled carefully to avoid breakage, stored in designated sealed containers, and disposed of through specialist WEEE recycling channels. Specialist recyclers recover the mercury, aluminium end caps, glass, and phosphor powder for recycling. Electricians regularly handle spent fluorescent tubes during lighting upgrades and must ensure proper disposal.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Fluorescent tube disposal",
    category: "Waste Management"
  },
  {
    id: 73,
    question: "What is 'waste minimisation' and why is it the top priority in the waste hierarchy?",
    options: [
      "It means reducing the volume of waste bins on site; it saves space",
      "It means preventing waste from being produced in the first place; it is the top priority because it avoids the environmental impacts of resource extraction, manufacturing, transport, and disposal entirely",
      "It means compressing waste to take up less space in landfill; it saves landfill capacity",
      "It means burning waste to reduce its volume; it generates useful energy"
    ],
    correctAnswer: 1,
    explanation: "Waste minimisation (prevention) sits at the top of the waste hierarchy because it avoids the environmental impact of waste entirely — no resources are extracted, no energy is used in manufacturing, no transport emissions are generated, and no disposal impacts occur. On construction sites, waste minimisation measures include accurate ordering of materials, using prefabricated components, designing out waste, protecting stored materials from weather damage, and reusing formwork and temporary works.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Waste minimisation",
    category: "Waste Management"
  },
  {
    id: 74,
    question: "What is 'designing out waste' in construction?",
    options: [
      "Designing buildings without waste bins",
      "Using design decisions to reduce or eliminate waste generation during construction, including standardising dimensions, specifying reclaimed materials, and designing for disassembly",
      "Designing waste processing equipment",
      "Removing waste from design drawings"
    ],
    correctAnswer: 1,
    explanation: "Designing out waste is a principle in sustainable construction where design decisions are made to reduce or eliminate waste generation. Examples include: standardising dimensions to reduce off-cuts; specifying standard lengths of cable, conduit, and trunking; using modular or prefabricated components; designing for disassembly so materials can be reused; specifying reclaimed or recycled materials; and avoiding over-specification. WRAP (Waste and Resources Action Programme) has published guidance on designing out waste for different construction trades.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Designing out waste",
    category: "Waste Management"
  },
  {
    id: 75,
    question: "What is a 'hazardous property' code (HP code)?",
    options: [
      "A postcode identifying the location of hazardous waste storage facilities",
      "A classification code assigned to waste based on its hazardous characteristics (e.g., HP1 Explosive, HP3 Flammable, HP5 Toxic, HP14 Ecotoxic) used to determine waste handling requirements",
      "A code assigned to dangerous buildings",
      "A reference number for hazardous waste carriers"
    ],
    correctAnswer: 1,
    explanation: "Hazardous Property (HP) codes are used to classify waste based on the specific hazardous characteristics it exhibits. There are 15 HP codes: HP1 (Explosive), HP2 (Oxidising), HP3 (Flammable), HP4 (Irritant), HP5 (Specific Target Organ Toxicity/Aspiration Toxicity), HP6 (Acute Toxicity), HP7 (Carcinogenic), HP8 (Corrosive), HP9 (Infectious), HP10 (Toxic for Reproduction), HP11 (Mutagenic), HP12 (Release of Acute Toxic Gas), HP13 (Sensitising), HP14 (Ecotoxic), and HP15 (Yielding Another Substance with Hazardous Properties).",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "HP codes",
    category: "Waste Management"
  },
  {
    id: 76,
    question: "What does 'WRAP' stand for in the context of waste and resources?",
    options: [
      "Waste Reduction and Prevention",
      "Waste and Resources Action Programme",
      "Workplace Recycling Action Plan",
      "Waste Recovery and Processing"
    ],
    correctAnswer: 1,
    explanation: "WRAP stands for the Waste and Resources Action Programme. It is a UK charity that works with businesses, individuals, and communities to achieve a circular economy through waste reduction, resource efficiency, and recycling. WRAP has produced extensive guidance for the construction industry, including tools for measuring and benchmarking construction waste, and the Courtauld Commitment and Plastic Pact initiatives.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "WRAP",
    category: "Waste Management"
  },
  {
    id: 77,
    question: "What is 'inert waste' on a construction site?",
    options: [
      "Waste that is too heavy to move",
      "Waste that does not undergo any significant physical, chemical, or biological transformations, will not dissolve or burn, and does not adversely affect other materials it comes into contact with — such as clean bricks, concrete, and tiles",
      "Waste that has been treated with chemicals to make it safe",
      "Any waste that is stored in sealed containers"
    ],
    correctAnswer: 1,
    explanation: "Inert waste is waste that does not undergo any significant physical, chemical, or biological transformations. It will not dissolve, burn, or react physically or chemically, and will not adversely affect other substances it comes into contact with in a way likely to cause environmental pollution or harm to health. Common examples on construction sites include clean concrete, bricks, tiles, glass, and uncontaminated soil and stones. Inert waste attracts the lower rate of landfill tax (£3.25/tonne).",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Inert waste",
    category: "Waste Management"
  },
  {
    id: 78,
    question: "Under the Hazardous Waste Regulations 2005, what threshold triggers the requirement for premises to notify the Environment Agency as a hazardous waste producer?",
    options: [
      "Any amount of hazardous waste",
      "More than 200kg per year",
      "More than 500kg per year",
      "More than 1,000kg per year"
    ],
    correctAnswer: 2,
    explanation: "Under the Hazardous Waste (England and Wales) Regulations 2005, premises that produce or hold more than 500kg of hazardous waste in any 12-month period must notify the Environment Agency and obtain a premises notification number. This number must be included on all consignment notes. Premises producing less than 500kg per year are exempt from notification but must still comply with all other hazardous waste requirements, including the use of consignment notes.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Hazardous waste notification threshold",
    category: "Waste Management"
  },
  {
    id: 79,
    question: "What is 'waste pre-treatment' and when is it required before landfill disposal?",
    options: [
      "Wrapping waste in plastic before placing it in a skip",
      "Processing waste by sorting, recycling, or treating it before disposal to landfill, as required by the Landfill (England and Wales) Regulations 2002 to ensure only waste that cannot be recovered is landfilled",
      "Adding chemicals to waste to neutralise it",
      "Compacting waste to reduce its volume in the collection vehicle"
    ],
    correctAnswer: 1,
    explanation: "The Landfill (England and Wales) Regulations 2002 require that waste must be pre-treated before being deposited in a landfill. Pre-treatment includes physical, thermal, chemical, or biological processes that change the characteristics of the waste to reduce its volume, reduce its hazardous nature, or facilitate its handling. In practice, this means waste must be sorted and recyclable or recoverable materials removed before the residual waste can be landfilled. Simply compacting or baling unsorted waste does not constitute adequate pre-treatment.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Waste pre-treatment",
    category: "Waste Management"
  },
  {
    id: 80,
    question: "What legal obligation does a waste producer have if they suspect their waste carrier may be operating illegally?",
    options: [
      "No obligation — it is not their concern once waste leaves their premises",
      "They must take all reasonable steps to check the carrier's registration, and if they knowingly or carelessly transfer waste to an unauthorised person, they commit an offence under the duty of care",
      "They should file a report with the police within 30 days",
      "They must retrieve the waste and bring it back to site"
    ],
    correctAnswer: 1,
    explanation: "Under the duty of care (Section 34, EPA 1990), waste producers must take all reasonable steps to ensure waste is transferred only to an authorised person. This means checking the carrier's waste carrier registration on the Environment Agency's public register before handing over waste. If a waste producer knowingly or carelessly transfers waste to an unauthorised person, they commit a criminal offence and can be prosecuted. The maximum penalty is an unlimited fine. The waste producer remains responsible for their waste even after it has left their premises.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Checking waste carriers",
    category: "Waste Management"
  },

  // =======================================================================
  // ENERGY & RESOURCE EFFICIENCY — first 20 questions (id 81-100)
  // ~7 basic, ~9 intermediate, ~4 advanced
  // =======================================================================
  {
    id: 81,
    question: "What is the most significant source of energy consumption on a typical construction site?",
    options: [
      "Office lighting in the site cabin",
      "Temporary heating, lighting, and power for tools and equipment",
      "Charging personal mobile phones",
      "Running CCTV security cameras"
    ],
    correctAnswer: 1,
    explanation: "Temporary heating, lighting, and power for tools and equipment are typically the most significant sources of energy consumption on a construction site. This includes diesel generators, temporary electric heaters, site lighting towers, power tools, cranes, hoists, and concrete pumps. Reducing energy consumption on site involves using energy-efficient equipment, turning off equipment when not in use, optimising site layout to minimise transport, and connecting to mains power early to avoid reliance on diesel generators.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Energy on site",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 82,
    question: "What is a 'carbon footprint' of a construction project?",
    options: [
      "The physical mark left by construction vehicles on soft ground",
      "The total greenhouse gas emissions associated with all activities and materials used throughout the project lifecycle, measured in CO2 equivalent",
      "The amount of coal burned to generate electricity for the site",
      "The weight of carbon-containing materials used in the build"
    ],
    correctAnswer: 1,
    explanation: "The carbon footprint of a construction project is the total greenhouse gas emissions (measured in tonnes of CO2 equivalent) associated with all activities and materials across the project lifecycle. This includes embodied carbon in materials, transport emissions, on-site energy use, waste disposal, and the operational carbon of the completed building. Measuring the carbon footprint is essential for identifying reduction opportunities and demonstrating compliance with sustainability targets.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Project carbon footprint",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 83,
    question: "What is the key difference between 'embodied carbon' and 'operational carbon' in a building?",
    options: [
      "Embodied carbon is the carbon in the paint; operational carbon is the carbon in the electricity",
      "Embodied carbon relates to the emissions from manufacturing, transporting, and constructing materials; operational carbon relates to emissions from the energy used to run the building during its lifetime",
      "Embodied carbon only applies to timber-frame buildings; operational carbon applies to all buildings",
      "There is no difference; they are the same thing"
    ],
    correctAnswer: 1,
    explanation: "Embodied carbon encompasses all greenhouse gas emissions associated with the manufacture, transport, installation, maintenance, and end-of-life disposal of building materials and components. Operational carbon is the emissions from the energy consumed to operate the building throughout its lifetime — heating, cooling, lighting, hot water, and appliances. As buildings become more energy-efficient, the proportion of total lifecycle carbon attributable to embodied carbon is increasing, making material selection and construction methods increasingly important.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Embodied vs operational carbon",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 84,
    question: "Which renewable energy technology converts sunlight directly into electricity?",
    options: [
      "Solar thermal panels",
      "Photovoltaic (PV) panels",
      "Wind turbines",
      "Ground source heat pumps"
    ],
    correctAnswer: 1,
    explanation: "Photovoltaic (PV) panels convert sunlight directly into electricity using semiconductor materials (typically silicon). When photons from sunlight strike the PV cells, they knock electrons free from atoms, creating an electrical current. Solar thermal panels, by contrast, use sunlight to heat water or fluid. Wind turbines convert kinetic energy from wind into electricity, and ground source heat pumps extract heat from the ground. Electricians play a key role in installing and connecting PV systems.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Photovoltaic panels",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 85,
    question: "What does an Energy Performance Certificate (EPC) show?",
    options: [
      "The structural integrity of a building",
      "The energy efficiency rating of a building on a scale from A (most efficient) to G (least efficient), along with recommendations for improvement",
      "The total cost of a building's energy bills",
      "The fire safety rating of a building"
    ],
    correctAnswer: 1,
    explanation: "An Energy Performance Certificate (EPC) rates the energy efficiency of a building on a scale from A (most efficient) to G (least efficient). It includes information about the building's typical energy use and carbon dioxide emissions, as well as recommendations for reducing energy use and costs. EPCs are legally required when buildings are built, sold, or rented, and are valid for 10 years. The Minimum Energy Efficiency Standards (MEES) require rental properties to have a minimum EPC rating of E.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "EPC",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 86,
    question: "What is the benefit of using LED lighting instead of traditional incandescent or halogen lamps?",
    options: [
      "LEDs are cheaper to purchase but use more energy",
      "LEDs use up to 80-90% less energy than incandescent lamps, last significantly longer, and produce less waste heat",
      "LEDs produce a brighter light but have a shorter lifespan",
      "LEDs are only suitable for outdoor use"
    ],
    correctAnswer: 1,
    explanation: "LED (Light Emitting Diode) lighting is significantly more energy-efficient than traditional incandescent and halogen lamps, using up to 80-90% less energy for equivalent light output. LEDs also have a much longer operational life — typically 25,000-50,000 hours compared to 1,000-2,000 hours for incandescent lamps. They produce far less waste heat, reducing cooling loads in buildings. While LEDs have a higher initial cost, the energy savings and reduced replacement frequency make them significantly more cost-effective over their lifetime.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "LED lighting",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 87,
    question: "What is a 'heat pump' and how does it contribute to energy efficiency?",
    options: [
      "A device that pumps hot water around radiators using a conventional gas boiler",
      "A device that transfers heat from a low-temperature source (air, ground, or water) to a higher-temperature output for space heating and hot water, achieving efficiencies of 250-400%",
      "A high-powered electric fan heater used in warehouses",
      "A system that only provides cooling, not heating"
    ],
    correctAnswer: 1,
    explanation: "A heat pump is a device that transfers heat from a lower-temperature source (air, ground, or water) to a higher-temperature output for space heating and hot water. It works on the same principle as a refrigerator but in reverse. Heat pumps achieve efficiencies (Coefficient of Performance, or COP) of 250-400%, meaning they deliver 2.5-4 units of heat energy for every 1 unit of electricity consumed. They are a key technology for decarbonising heating in the UK and are central to the Government's heat pump target of 600,000 installations per year by 2028.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Heat pumps",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 88,
    question: "What is 'water conservation' on a construction site?",
    options: [
      "Storing water in tanks for use during a drought",
      "The practice of reducing water consumption on site through efficient use, recycling, and rainwater harvesting, to minimise waste and environmental impact",
      "Only using bottled water on site",
      "Diverting all site water into the nearest watercourse"
    ],
    correctAnswer: 1,
    explanation: "Water conservation on a construction site involves reducing water consumption through measures such as: using water-efficient equipment (e.g., trigger nozzles on hoses); fixing leaks promptly; recycling water where possible (e.g., wheel wash water); harvesting rainwater for dust suppression; using drip irrigation; and monitoring water usage to identify waste. Water conservation reduces both the environmental impact and the cost of water supply and wastewater disposal on site.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Water conservation",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 89,
    question: "What are 'sustainable materials' in the context of construction?",
    options: [
      "Materials that are painted green",
      "Materials that have been sourced, manufactured, and can be used and disposed of in a way that minimises environmental impact, including materials that are renewable, recycled, locally sourced, or have low embodied carbon",
      "Materials that are the cheapest available option",
      "Materials that do not need to be maintained"
    ],
    correctAnswer: 1,
    explanation: "Sustainable materials are those that minimise environmental impact throughout their lifecycle. Key characteristics include: being sourced from renewable resources (e.g., FSC-certified timber); having a high recycled content; being locally sourced to reduce transport emissions; having low embodied carbon; being durable and long-lasting; being reusable or recyclable at end of life; and being non-toxic. Examples include recycled steel, reclaimed timber, low-carbon concrete, and sustainably sourced copper cable.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Sustainable materials",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 90,
    question: "What is the purpose of Part L of the Building Regulations?",
    options: [
      "It covers structural stability of buildings",
      "It sets requirements for the conservation of fuel and power in buildings, including energy efficiency standards for heating, lighting, and insulation",
      "It governs fire safety in buildings",
      "It deals with drainage and waste disposal"
    ],
    correctAnswer: 1,
    explanation: "Part L of the Building Regulations (Conservation of Fuel and Power) sets minimum energy efficiency standards for new and existing buildings in England. It covers the thermal performance of the building fabric (insulation), heating and cooling systems, lighting efficiency, and renewable energy provision. Part L was significantly updated in June 2022, introducing a 31% reduction in carbon emissions for new homes and a 27% reduction for new non-domestic buildings compared to the previous standards.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Part L Building Regulations",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 91,
    question: "What does the acronym 'SAP' stand for in the context of building energy performance?",
    options: [
      "Standard Assessment Procedure",
      "Site Assessment Plan",
      "Structural Analysis Protocol",
      "Sustainability Action Programme"
    ],
    correctAnswer: 0,
    explanation: "SAP stands for Standard Assessment Procedure. It is the UK Government's methodology for assessing and comparing the energy and environmental performance of dwellings. SAP calculates a rating from 1 to 100+ based on a building's energy efficiency characteristics, including heating systems, insulation, ventilation, and lighting. SAP ratings are used to produce Energy Performance Certificates (EPCs) and to demonstrate compliance with Part L of the Building Regulations.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "SAP rating",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 92,
    question: "What is 'passive design' in building construction?",
    options: [
      "A design approach that relies on the building's structure being inactive during construction",
      "A design approach that uses the building's form, fabric, and orientation to reduce energy demand for heating, cooling, and lighting without relying on mechanical systems",
      "A building design that requires no planning permission",
      "A design that uses only passive electrical components"
    ],
    correctAnswer: 1,
    explanation: "Passive design is an approach to building design that uses the building's orientation, form, and fabric to reduce energy demand without relying on active mechanical systems. Key principles include: optimising orientation for solar gain; maximising natural ventilation; using high levels of insulation and airtightness; incorporating thermal mass to regulate temperature; and maximising natural daylighting. The Passivhaus standard is the most rigorous passive design certification, achieving up to 90% reduction in heating demand.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Passive design",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 93,
    question: "What is 'embodied energy'?",
    options: [
      "The energy stored in a battery",
      "The total amount of energy required to extract, process, manufacture, transport, and install a building material or product",
      "The kinetic energy of moving construction vehicles",
      "The energy produced by a building's solar panels"
    ],
    correctAnswer: 1,
    explanation: "Embodied energy is the total energy consumed throughout the lifecycle of a material or product, from raw material extraction and processing, through manufacturing and transport, to installation on site. It is closely related to embodied carbon but measured in energy units (MJ or kWh) rather than CO2e. Materials with high embodied energy include aluminium, steel, and cement. Selecting materials with lower embodied energy helps reduce the overall environmental impact of a construction project.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Embodied energy",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 94,
    question: "What is 'ISO 50001' and how does it relate to energy management?",
    options: [
      "A quality management standard",
      "An international standard that specifies requirements for establishing, implementing, and improving an energy management system, helping organisations systematically reduce energy consumption",
      "A fire safety standard for electrical equipment",
      "A standard for testing the energy output of solar panels"
    ],
    correctAnswer: 1,
    explanation: "ISO 50001 is the international standard for Energy Management Systems (EnMS). It provides a framework for organisations to develop policies for more efficient energy use, set targets and objectives, use data to make decisions about energy consumption, measure results, review effectiveness, and continually improve energy performance. Like ISO 14001 for environmental management, ISO 50001 follows the Plan-Do-Check-Act (PDCA) cycle. Certification demonstrates an organisation's commitment to energy efficiency.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "ISO 50001",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 95,
    question: "What role do 'smart meters' play in energy efficiency?",
    options: [
      "They automatically reduce a building's electricity supply during peak hours",
      "They provide real-time information on energy consumption, helping users understand and reduce their energy use, and enabling accurate billing without estimated readings",
      "They only measure gas consumption, not electricity",
      "They store surplus energy for later use"
    ],
    correctAnswer: 1,
    explanation: "Smart meters provide real-time information on energy consumption (both gas and electricity) to the consumer via an in-home display, and send accurate meter readings automatically to the energy supplier. This eliminates estimated bills and helps consumers understand when and how they use energy, enabling them to identify wasteful habits and reduce consumption. Smart meters also support the development of smart grids and time-of-use tariffs that incentivise shifting energy use to off-peak periods.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Smart meters",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 96,
    question: "What is the 'fabric first' approach to building energy efficiency?",
    options: [
      "Using only fabric-based interior finishes",
      "Prioritising improvements to the building's thermal envelope (insulation, airtightness, glazing) before adding renewable energy technologies or complex mechanical systems",
      "Covering the building exterior with textile cladding",
      "Choosing building materials based on their texture"
    ],
    correctAnswer: 1,
    explanation: "The 'fabric first' approach prioritises reducing energy demand through the building's thermal envelope — high-performance insulation, excellent airtightness, high-quality windows and doors, and minimising thermal bridging — before considering bolt-on technologies like solar panels or heat pumps. The rationale is that reducing energy demand at source is more cost-effective, durable, and reliable than generating or recovering energy to compensate for a poorly performing building fabric.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Fabric first approach",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 97,
    question: "What is 'whole-life carbon' assessment in construction?",
    options: [
      "Measuring the carbon content of the air inside a completed building",
      "A comprehensive assessment that accounts for all greenhouse gas emissions over the entire life of a building, including embodied carbon (materials and construction), operational carbon (energy in use), and end-of-life carbon (demolition and disposal)",
      "Calculating the carbon sequestered by trees on a building site",
      "An assessment only relevant to buildings over 50 years old"
    ],
    correctAnswer: 1,
    explanation: "Whole-life carbon assessment evaluates the total greenhouse gas emissions associated with a building over its entire life, from cradle to grave. This includes: embodied carbon (modules A1-A5 covering raw materials, manufacturing, transport, and construction); operational carbon (module B covering energy use, maintenance, and refurbishment); and end-of-life carbon (modules C1-C4 covering demolition, transport, waste processing, and disposal). Module D accounts for benefits beyond the building's life, such as material reuse. The RICS Professional Statement on Whole Life Carbon Assessment provides the methodology.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Whole-life carbon",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 98,
    question: "What is 'greywater recycling'?",
    options: [
      "Recycling water that has turned grey due to chemical contamination",
      "Collecting and treating wastewater from baths, showers, washbasins, and washing machines for reuse in non-potable applications such as toilet flushing and garden irrigation",
      "Filtering rainwater through grey-coloured filters",
      "Draining grey concrete wash water into the sewage system"
    ],
    correctAnswer: 1,
    explanation: "Greywater recycling involves collecting wastewater from baths, showers, washbasins, and washing machines — which is relatively lightly contaminated — and treating it for reuse in non-potable applications such as toilet flushing, garden irrigation, and washing machines. This can reduce mains water consumption by up to 30-40% in domestic buildings. Greywater systems must comply with the Water Supply (Water Fittings) Regulations 1999 and relevant building regulations to prevent cross-contamination of the potable water supply.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Greywater recycling",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 99,
    question: "What is the Minimum Energy Efficiency Standard (MEES) for rental properties in England and Wales?",
    options: [
      "All rental properties must achieve an EPC rating of A",
      "All rental properties must achieve a minimum EPC rating of E; landlords cannot grant new tenancies for properties rated F or G",
      "All rental properties must achieve a minimum EPC rating of C",
      "There is no minimum energy efficiency standard for rental properties"
    ],
    correctAnswer: 1,
    explanation: "The Minimum Energy Efficiency Standards (MEES), introduced by the Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015, require that privately rented domestic and non-domestic properties in England and Wales achieve a minimum Energy Performance Certificate (EPC) rating of E. Since April 2018 for domestic and April 2023 for non-domestic properties, landlords cannot grant new tenancies or continue existing tenancies for properties rated F or G unless a valid exemption is registered. The Government has consulted on raising the minimum to C for new tenancies.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "MEES",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 100,
    question: "What is 'demand-side response' (DSR) in energy management?",
    options: [
      "Increasing energy production to meet peak demand",
      "Adjusting the timing or level of electricity consumption in response to price signals, grid conditions, or other incentives, to reduce peak demand and support grid stability",
      "Responding to customer complaints about energy bills",
      "Building more power stations to cope with increased demand"
    ],
    correctAnswer: 1,
    explanation: "Demand-side response (DSR) involves adjusting electricity consumption patterns in response to signals from the grid operator, energy supplier, or automated systems. This can include shifting non-essential loads (such as EV charging, water heating, and HVAC) to off-peak times, reducing consumption during peak demand periods, or providing flexibility services to the National Grid. DSR helps balance supply and demand, reduces the need for expensive peaking power plants, and supports the integration of intermittent renewable energy sources. Smart meters and building energy management systems (BEMS) are key enablers of DSR.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Demand-side response",
    category: "Energy & Resource Efficiency"
  },

  {
    id: 101,
    question: "What does PAS 2080 provide a framework for managing?",
    options: [
      "Workplace health and safety",
      "Carbon in buildings and infrastructure",
      "Water usage in construction",
      "Noise pollution on construction sites"
    ],
    correctAnswer: 1,
    explanation: "PAS 2080 is a publicly available specification published by the British Standards Institution (BSI) that provides a framework for managing whole life carbon in buildings and infrastructure. It establishes principles, roles, and processes to help organisations reduce carbon across the full lifecycle of built assets.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "PAS 2080",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 102,
    question: "What is the primary purpose of an Environmental Product Declaration (EPD)?",
    options: [
      "To provide verified environmental data about a product's lifecycle impacts",
      "To certify that a product is completely carbon neutral",
      "To guarantee a product meets Building Regulations",
      "To replace the need for a construction phase plan"
    ],
    correctAnswer: 0,
    explanation: "An Environmental Product Declaration (EPD) is a standardised, third-party verified document that communicates transparent and comparable information about a product's environmental impact throughout its lifecycle. EPDs are prepared in accordance with ISO 14025 and EN 15804 and cover impacts such as global warming potential, ozone depletion, and resource depletion.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Environmental Product Declarations",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 103,
    question: "Which standard governs the preparation of Environmental Product Declarations for construction products in Europe?",
    options: [
      "ISO 9001",
      "EN 15804",
      "BS 7671",
      "PAS 2035"
    ],
    correctAnswer: 1,
    explanation: "EN 15804 is the European standard that provides core product category rules for Type III environmental declarations (EPDs) for construction products and services. It ensures that EPDs are prepared consistently and can be compared across different manufacturers and product types.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "EN 15804",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 104,
    question: "What does 'whole life carbon' refer to in the context of a building?",
    options: [
      "Only the carbon emitted during construction",
      "Only the carbon emitted during the operational phase",
      "The total carbon emissions from material extraction through to demolition and disposal",
      "Only the embodied carbon in structural elements"
    ],
    correctAnswer: 2,
    explanation: "Whole life carbon encompasses the total greenhouse gas emissions associated with a building across its entire lifecycle. This includes embodied carbon (material extraction, manufacturing, transport, construction, maintenance, and end-of-life) plus operational carbon (energy used for heating, cooling, lighting, and other services during the building's use).",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Whole life carbon",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 105,
    question: "What are the lifecycle stages A1 to A3 commonly referred to in whole life carbon assessments?",
    options: [
      "Use, maintenance, and repair",
      "Demolition, waste processing, and disposal",
      "Raw material supply, transport to factory, and manufacturing",
      "Construction, installation, and commissioning"
    ],
    correctAnswer: 2,
    explanation: "In the lifecycle modules defined by EN 15978, stages A1 to A3 cover the 'product stage': A1 is raw material supply, A2 is transport to the manufacturing facility, and A3 is the manufacturing process itself. These stages are sometimes called the 'cradle to gate' assessment and are the minimum scope reported in most EPDs.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Lifecycle stages",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 106,
    question: "What is GGBS and why is it used as a partial cement replacement?",
    options: [
      "Ground granulated blast-furnace slag — it reduces the embodied carbon of concrete",
      "Glass-graded building sand — it improves thermal insulation",
      "Green graded base stone — it enhances drainage performance",
      "Galvanised grouted binding steel — it increases tensile strength"
    ],
    correctAnswer: 0,
    explanation: "GGBS (ground granulated blast-furnace slag) is a by-product of the iron-making process. When used as a partial replacement for Portland cement in concrete, it significantly reduces the embodied carbon of the concrete mix — typically by 40-70% depending on the replacement ratio. GGBS also improves durability and resistance to sulphate attack.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "GGBS",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 107,
    question: "What does CLT stand for in sustainable construction?",
    options: [
      "Certified Low Thermal",
      "Cross-laminated timber",
      "Carbon Lifecycle Testing",
      "Concrete Lightweight Technology"
    ],
    correctAnswer: 1,
    explanation: "CLT stands for cross-laminated timber. It is an engineered wood product made by gluing layers of solid-sawn lumber together at right angles. CLT sequesters carbon during the tree's growth, has lower embodied carbon than concrete or steel alternatives, and can be used for walls, floors, and roofs in multi-storey buildings.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Cross-laminated timber",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 108,
    question: "What does FSC certification guarantee about a timber product?",
    options: [
      "That it has been fire-treated to a specified standard",
      "That it comes from responsibly managed forests meeting strict environmental and social standards",
      "That it has zero embodied carbon",
      "That it was manufactured in the United Kingdom"
    ],
    correctAnswer: 1,
    explanation: "The Forest Stewardship Council (FSC) is an international certification scheme that ensures timber and timber products come from forests managed in an environmentally appropriate, socially beneficial, and economically viable manner. FSC chain-of-custody certification tracks the product from forest to consumer.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "FSC certification",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 109,
    question: "What is the PEFC and how does it relate to FSC?",
    options: [
      "It is a fire protection standard that replaces FSC in commercial buildings",
      "It is an alternative international forest certification scheme that endorses national certification programmes",
      "It is a UK-only timber grading standard",
      "It is a carbon offsetting programme for the forestry sector"
    ],
    correctAnswer: 1,
    explanation: "The Programme for the Endorsement of Forest Certification (PEFC) is the world's largest forest certification system. Unlike FSC, which sets its own standards, PEFC works by endorsing national forest certification schemes that meet its sustainability benchmarks. Both FSC and PEFC are recognised as credible proof of sustainable sourcing.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "PEFC certification",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 110,
    question: "What is Life Cycle Assessment (LCA)?",
    options: [
      "An assessment of how long a building component will last before replacement",
      "A methodology for evaluating the environmental impacts of a product or system across its entire life",
      "A financial appraisal of maintenance costs over a building's lifespan",
      "A health and safety risk assessment for the construction phase"
    ],
    correctAnswer: 1,
    explanation: "Life Cycle Assessment (LCA) is a systematic methodology for evaluating the environmental impacts associated with all stages of a product's life — from raw material extraction, through manufacturing and use, to end-of-life disposal or recycling. It is governed by ISO 14040 and ISO 14044 and considers impacts such as global warming potential, acidification, and resource depletion.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Life Cycle Assessment",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 111,
    question: "Which ISO standard defines the principles and framework for Life Cycle Assessment?",
    options: [
      "ISO 9001",
      "ISO 14001",
      "ISO 14040",
      "ISO 45001"
    ],
    correctAnswer: 2,
    explanation: "ISO 14040 defines the principles and framework for conducting a Life Cycle Assessment. It outlines the four phases of LCA: goal and scope definition, life cycle inventory analysis, life cycle impact assessment, and interpretation. ISO 14044 provides the detailed requirements and guidelines for carrying out each phase.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "ISO 14040",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 112,
    question: "In PAS 2080, which role is responsible for setting the carbon reduction strategy at the programme level?",
    options: [
      "The site operative",
      "The asset owner or manager",
      "The subcontractor",
      "The materials supplier"
    ],
    correctAnswer: 1,
    explanation: "Under PAS 2080, the asset owner or manager is responsible for establishing the overarching carbon management strategy and setting carbon reduction targets at the programme and portfolio level. The framework emphasises that leadership from the asset owner is critical because decisions made at the earliest stages have the greatest influence on whole life carbon outcomes.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "PAS 2080 roles",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 113,
    question: "What is the difference between embodied carbon and operational carbon?",
    options: [
      "There is no difference; they are interchangeable terms",
      "Embodied carbon relates to the materials and construction; operational carbon relates to energy used during the building's life",
      "Embodied carbon relates to transport emissions only; operational carbon covers everything else",
      "Operational carbon is always higher than embodied carbon"
    ],
    correctAnswer: 1,
    explanation: "Embodied carbon refers to the greenhouse gas emissions associated with the materials and construction processes — including extraction, manufacturing, transport, installation, maintenance, and end-of-life. Operational carbon refers to the emissions from the energy consumed during the building's operational life — such as heating, cooling, lighting, and ventilation. As buildings become more energy efficient, embodied carbon represents an increasing proportion of whole life carbon.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Embodied vs operational carbon",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 114,
    question: "What lifecycle module does 'stage B6' represent in a whole life carbon assessment?",
    options: [
      "Construction and installation",
      "Operational energy use",
      "Demolition",
      "Raw material extraction"
    ],
    correctAnswer: 1,
    explanation: "In the lifecycle modules defined by EN 15978, stage B6 represents operational energy use — the energy consumed for heating, cooling, ventilation, hot water, lighting, and other building services during the use phase. Stage B7 covers operational water use. Together, B6 and B7 represent the key operational impacts of a building.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Lifecycle modules",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 115,
    question: "Which UK body publishes PAS 2080?",
    options: [
      "The Health and Safety Executive",
      "The British Standards Institution (BSI)",
      "The Environment Agency",
      "The Construction Industry Training Board"
    ],
    correctAnswer: 1,
    explanation: "PAS 2080 is published by the British Standards Institution (BSI). A PAS (Publicly Available Specification) is a fast-track standardisation document that responds to an urgent market need. PAS 2080 was developed with input from the Green Construction Board and infrastructure industry leaders to provide a consistent approach to managing carbon in infrastructure.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "PAS 2080 publisher",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 116,
    question: "What percentage of Portland cement can typically be replaced with GGBS in a standard concrete mix?",
    options: [
      "Up to 10%",
      "Up to 25%",
      "Up to 70% or more",
      "Up to 5%"
    ],
    correctAnswer: 2,
    explanation: "GGBS can replace up to 70% or more of the Portland cement in a concrete mix, depending on the application and required performance characteristics. BS 8500 permits GGBS replacement levels of up to 80% for certain exposure classes. Higher replacement levels result in greater carbon savings but may affect early-age strength gain and setting times.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "GGBS replacement levels",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 117,
    question: "Which lifecycle module covers end-of-life demolition and deconstruction in a whole life carbon assessment?",
    options: [
      "Module A5",
      "Module B4",
      "Module C1",
      "Module D"
    ],
    correctAnswer: 2,
    explanation: "Module C1 covers demolition and deconstruction in the end-of-life stage. The full end-of-life stage comprises: C1 (demolition/deconstruction), C2 (transport to waste processing), C3 (waste processing for reuse, recovery, or recycling), and C4 (disposal). Module D covers benefits and loads beyond the system boundary, such as energy recovery or recycled material credits.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "End-of-life modules",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 118,
    question: "What is 'Module D' in a whole life carbon assessment?",
    options: [
      "The demolition phase",
      "The design and planning phase",
      "Benefits and loads beyond the system boundary, such as recycling credits",
      "The operational maintenance phase"
    ],
    correctAnswer: 2,
    explanation: "Module D in EN 15978 captures the potential benefits and loads beyond the system boundary. This includes credits for material recycling, energy recovery from waste, and reuse of components after the building's end of life. Module D is reported separately because these benefits occur outside the building's own lifecycle and depend on future market conditions and technologies.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Module D",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 119,
    question: "How does cross-laminated timber (CLT) contribute to carbon reduction compared to concrete or steel framing?",
    options: [
      "CLT is always cheaper, which reduces financial carbon costs",
      "CLT sequesters carbon during tree growth and has lower embodied carbon than concrete or steel",
      "CLT has no environmental benefit; it is chosen only for aesthetic reasons",
      "CLT generates more waste, which increases recycling opportunities"
    ],
    correctAnswer: 1,
    explanation: "Trees absorb CO2 as they grow, and this carbon remains locked within the timber product for the life of the building — a process known as carbon sequestration. Additionally, manufacturing CLT requires significantly less energy than producing concrete or steel, resulting in lower embodied carbon. When sourced from sustainably managed forests (FSC or PEFC certified), CLT is considered one of the most sustainable structural materials available.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "CLT carbon benefits",
    category: "Energy & Resource Efficiency"
  },
  {
    id: 120,
    question: "What are the four phases of a Life Cycle Assessment as defined by ISO 14040?",
    options: [
      "Planning, construction, operation, and demolition",
      "Goal and scope definition, inventory analysis, impact assessment, and interpretation",
      "Design, procurement, installation, and commissioning",
      "Extraction, manufacturing, distribution, and disposal"
    ],
    correctAnswer: 1,
    explanation: "ISO 14040 defines the four phases of LCA as: (1) goal and scope definition — setting the purpose, boundaries, and functional unit; (2) life cycle inventory analysis (LCI) — quantifying inputs and outputs; (3) life cycle impact assessment (LCIA) — evaluating the significance of potential environmental impacts; and (4) interpretation — drawing conclusions and making recommendations based on the findings.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "LCA phases",
    category: "Energy & Resource Efficiency"
  },
  // =======================================================================
  // POLLUTION PREVENTION — 40 questions (id 121-160)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // Topics: air quality, dust control, PM10/PM2.5, BS 5228, Section 60/61,
  //         water pollution, GPP5, oil storage, SuDS, land contamination,
  //         Part IIA, CLEA, remediation
  // =======================================================================
  {
    id: 121,
    question: "What does PM10 refer to in the context of air quality?",
    options: [
      "Particulate matter with a diameter of 10 millimetres or less",
      "Particulate matter with a diameter of 10 micrometres or less",
      "Pollution measurement taken at 10-metre intervals",
      "A 10-point pollution monitoring scale"
    ],
    correctAnswer: 1,
    explanation: "PM10 refers to particulate matter with an aerodynamic diameter of 10 micrometres (0.01mm) or less. These fine particles can be inhaled into the lungs and are a significant concern for human health. Construction activities such as demolition, earthworks, and cutting are major sources of PM10 on development sites.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "PM10",
    category: "Pollution Prevention"
  },
  {
    id: 122,
    question: "What is the difference between PM10 and PM2.5?",
    options: [
      "PM10 is measured in milligrams; PM2.5 is measured in micrograms",
      "PM2.5 particles are smaller (2.5 micrometres or less) and can penetrate deeper into the lungs than PM10",
      "PM2.5 is only found indoors; PM10 is only found outdoors",
      "There is no practical difference; they measure the same thing"
    ],
    correctAnswer: 1,
    explanation: "PM2.5 refers to particulate matter with an aerodynamic diameter of 2.5 micrometres or less — significantly smaller than PM10. Because of their tiny size, PM2.5 particles can penetrate deep into the lungs and even enter the bloodstream, posing greater health risks including cardiovascular and respiratory disease. PM10 includes PM2.5 plus coarser particles up to 10 micrometres.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "PM10 vs PM2.5",
    category: "Pollution Prevention"
  },
  {
    id: 123,
    question: "Which British Standard provides guidance on noise and vibration control on construction and open sites?",
    options: [
      "BS 7671",
      "BS 5228",
      "BS 6399",
      "BS 8110"
    ],
    correctAnswer: 1,
    explanation: "BS 5228 'Code of practice for noise and vibration control on construction and open sites' provides guidance on methods of predicting and measuring noise and vibration from construction activities, along with recommendations for minimising impacts. Part 1 covers noise and Part 2 covers vibration.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "BS 5228",
    category: "Pollution Prevention"
  },
  {
    id: 124,
    question: "Under the Control of Pollution Act 1974, what does a Section 61 consent allow?",
    options: [
      "Permission to discharge polluted water into a watercourse",
      "Prior consent for construction works that may generate noise, agreeing methods and hours of work",
      "Approval to store hazardous chemicals on site",
      "Consent to demolish a listed building"
    ],
    correctAnswer: 1,
    explanation: "A Section 61 consent under the Control of Pollution Act 1974 allows a contractor to apply in advance for prior consent to carry out noisy construction works. The application sets out the proposed methods of working and hours of operation, and the local authority grants consent subject to conditions. Having a Section 61 consent provides the contractor with a defence against a Section 60 notice.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Section 61 consent",
    category: "Pollution Prevention"
  },
  {
    id: 125,
    question: "What power does a Section 60 notice give to a local authority?",
    options: [
      "The power to close a construction site permanently",
      "The power to impose requirements on how construction works are carried out to control noise",
      "The power to revoke planning permission",
      "The power to increase council tax for neighbouring properties"
    ],
    correctAnswer: 1,
    explanation: "A Section 60 notice under the Control of Pollution Act 1974 gives the local authority the power to impose requirements on how construction works are carried out in order to control noise. The notice can specify permitted hours of work, noise levels, types of plant and equipment, and methods of working. Non-compliance is a criminal offence.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Section 60 notice",
    category: "Pollution Prevention"
  },
  {
    id: 126,
    question: "What is the primary purpose of dust suppression measures on a construction site?",
    options: [
      "To keep the site looking clean for aesthetic purposes only",
      "To protect the health of workers and nearby residents and prevent nuisance and ecological harm",
      "To reduce the cost of cleaning machinery",
      "To comply with traffic management requirements"
    ],
    correctAnswer: 1,
    explanation: "Dust suppression on construction sites serves multiple essential purposes: protecting the respiratory health of workers and nearby residents, preventing nuisance to neighbours, avoiding ecological damage to habitats and watercourses, and complying with environmental legislation. Methods include water spraying, wheel washing, covering stockpiles, and using dust screens.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Dust suppression",
    category: "Pollution Prevention"
  },
  {
    id: 127,
    question: "Which common dust control measure prevents mud and debris being tracked onto public roads?",
    options: [
      "Acoustic barriers",
      "Wheel-washing facilities",
      "Tree planting",
      "Temporary lighting"
    ],
    correctAnswer: 1,
    explanation: "Wheel-washing facilities at site exits clean the wheels and underside of vehicles before they leave the construction site. This prevents mud, dust, and debris from being deposited on public roads, which would create dust when dried and disturbed by traffic. Many local authorities require wheel washing as a condition of planning permission or through a Construction Environmental Management Plan.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Wheel washing",
    category: "Pollution Prevention"
  },
  {
    id: 128,
    question: "What document sets out how pollution risks will be managed during construction?",
    options: [
      "A Building Control Completion Certificate",
      "A Construction Environmental Management Plan (CEMP)",
      "A Part P notification",
      "A CDM health and safety file"
    ],
    correctAnswer: 1,
    explanation: "A Construction Environmental Management Plan (CEMP) sets out the measures that will be implemented to manage environmental risks during construction, including pollution prevention, dust control, noise management, waste handling, and ecological protection. CEMPs are frequently required as a condition of planning permission.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "CEMP",
    category: "Pollution Prevention"
  },
  {
    id: 129,
    question: "What is GPP5 and who publishes it?",
    options: [
      "A fire safety guide published by the Fire Service",
      "A pollution prevention guide for works and maintenance near water, published by the Environment Agency and partners",
      "A general planning policy published by the Ministry of Housing",
      "A gas safety procedure published by the Health and Safety Executive"
    ],
    correctAnswer: 1,
    explanation: "GPP5 (Guidance for Pollution Prevention 5) is titled 'Works and maintenance in or near water' and provides practical guidance on preventing pollution when working in, near, or over watercourses. It is published jointly by the environment agencies of England, Scotland, Wales, and Northern Ireland (formerly under the NetRegs partnership).",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "GPP5",
    category: "Pollution Prevention"
  },
  {
    id: 130,
    question: "Under UK law, what is the main piece of legislation controlling pollution of controlled waters?",
    options: [
      "The Wildlife and Countryside Act 1981",
      "The Environmental Permitting (England and Wales) Regulations 2016",
      "The Building Act 1984",
      "The Highways Act 1980"
    ],
    correctAnswer: 1,
    explanation: "The Environmental Permitting (England and Wales) Regulations 2016 (EPR) consolidate and replace previous pollution control regimes. Under Regulation 12, it is an offence to cause or knowingly permit a water discharge activity or groundwater activity without an environmental permit, unless an exemption applies. This includes discharges to rivers, streams, lakes, canals, and groundwater.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Water pollution legislation",
    category: "Pollution Prevention"
  },
  {
    id: 131,
    question: "What are the minimum requirements for oil storage under the Oil Storage Regulations 2001?",
    options: [
      "Oil must be stored in a locked building at all times",
      "The storage container must be within a secondary containment system (bund) capable of holding 110% of the container's capacity",
      "Oil can be stored in any container as long as it is labelled",
      "There are no specific requirements for oil stored on construction sites"
    ],
    correctAnswer: 1,
    explanation: "The Control of Pollution (Oil Storage) (England) Regulations 2001 require that oil storage containers above 200 litres must have secondary containment (a bund) capable of holding at least 110% of the container's capacity (or 25% of the total if multiple containers share a bund). The bund must be impermeable and have no drainage valve that could allow oil to escape.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Oil storage regulations",
    category: "Pollution Prevention"
  },
  {
    id: 132,
    question: "What does SuDS stand for?",
    options: [
      "Standard Underground Drainage System",
      "Sustainable Drainage Systems",
      "Surface Utility Diversion Scheme",
      "Supervised Urban Disposal Strategy"
    ],
    correctAnswer: 1,
    explanation: "SuDS stands for Sustainable Drainage Systems. They are designed to manage surface water runoff in a way that mimics natural drainage, reducing flood risk, improving water quality, and enhancing biodiversity. Examples include permeable paving, swales, rain gardens, green roofs, retention ponds, and constructed wetlands.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "SuDS",
    category: "Pollution Prevention"
  },
  {
    id: 133,
    question: "What is the primary environmental benefit of SuDS over conventional piped drainage?",
    options: [
      "SuDS are always cheaper to install",
      "SuDS reduce surface water runoff rates, improve water quality through natural filtration, and create habitat",
      "SuDS eliminate the need for any drainage infrastructure",
      "SuDS only benefit the appearance of a development"
    ],
    correctAnswer: 1,
    explanation: "SuDS provide multiple environmental benefits compared to conventional piped drainage: they attenuate surface water runoff reducing flood risk downstream, filter pollutants through natural processes improving water quality, create and enhance wildlife habitats, and provide amenity value. The four 'pillars' of SuDS design are water quantity, water quality, amenity, and biodiversity.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "SuDS benefits",
    category: "Pollution Prevention"
  },
  {
    id: 134,
    question: "What is land contamination in the context of environmental protection?",
    options: [
      "Any land that has buildings on it",
      "Land where substances are present at concentrations that could cause harm to human health or the environment",
      "Land that has been used for agriculture",
      "Any brownfield site regardless of pollution levels"
    ],
    correctAnswer: 1,
    explanation: "Land contamination refers to the presence of substances in, on, or under the land at concentrations that could pose a risk of significant harm to human health, controlled waters, or the wider environment. Contamination can arise from historical industrial activities, waste disposal, accidental spills, or the use of substances such as heavy metals, hydrocarbons, asbestos, and solvents.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Land contamination",
    category: "Pollution Prevention"
  },
  {
    id: 135,
    question: "Which Part of the Environmental Protection Act 1990 provides the legal framework for contaminated land in England?",
    options: [
      "Part I",
      "Part IIA",
      "Part III",
      "Part IV"
    ],
    correctAnswer: 1,
    explanation: "Part IIA of the Environmental Protection Act 1990 (inserted by the Environment Act 1995) establishes the legal regime for identifying and remediating contaminated land in England. It defines contaminated land, sets out the roles of local authorities and the Environment Agency, establishes the 'polluter pays' principle, and provides the framework for determining liability for remediation.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Part IIA EPA 1990",
    category: "Pollution Prevention"
  },
  {
    id: 136,
    question: "What does CLEA stand for in contaminated land assessment?",
    options: [
      "Construction Land Environmental Audit",
      "Contaminated Land Exposure Assessment",
      "Chemical Leachate Evaluation Analysis",
      "Controlled Land Ecological Appraisal"
    ],
    correctAnswer: 1,
    explanation: "CLEA stands for Contaminated Land Exposure Assessment. It is a model developed by the Environment Agency (now maintained by Defra) that derives Soil Guideline Values (SGVs) and Generic Assessment Criteria (GAC) for assessing risks to human health from soil contamination. CLEA uses exposure pathways (ingestion, inhalation, dermal contact) to calculate safe threshold concentrations for various contaminants.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "CLEA model",
    category: "Pollution Prevention"
  },
  {
    id: 137,
    question: "What is the 'source-pathway-receptor' model used for in contaminated land risk assessment?",
    options: [
      "Calculating the structural load of a foundation",
      "Identifying whether a contamination linkage exists that could cause harm",
      "Designing the electrical installation for a building",
      "Determining the schedule of dilapidations"
    ],
    correctAnswer: 1,
    explanation: "The source-pathway-receptor model is the fundamental conceptual framework for contaminated land risk assessment. A 'contaminant linkage' exists when there is a source of contamination, a pathway by which it can reach a receptor, and a receptor (such as human health, controlled waters, or an ecosystem) that could be harmed. All three elements must be present for there to be a risk requiring action.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Source-pathway-receptor",
    category: "Pollution Prevention"
  },
  {
    id: 138,
    question: "What is 'bioremediation' in the context of contaminated land?",
    options: [
      "Removing contaminated soil and disposing of it at a landfill",
      "Using biological organisms (such as bacteria or plants) to break down or remove contaminants from soil or groundwater",
      "Covering contaminated land with a concrete cap",
      "Diluting contaminants by flooding the site with clean water"
    ],
    correctAnswer: 1,
    explanation: "Bioremediation is a remediation technique that uses living organisms — typically bacteria, fungi, or plants — to degrade, transform, or remove contaminants from soil and groundwater. It can be carried out in situ (on site) or ex situ (in a treatment facility). Bioremediation is often more sustainable and cost-effective than traditional 'dig and dump' methods, though it may take longer to achieve target concentrations.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Bioremediation",
    category: "Pollution Prevention"
  },
  {
    id: 139,
    question: "What is a 'remediation strategy' for contaminated land?",
    options: [
      "A strategy for marketing properties on former industrial sites",
      "A plan that sets out how contamination will be addressed to make the land suitable for its intended use",
      "A financial plan for insuring against future contamination",
      "A legal agreement between neighbours about boundary disputes"
    ],
    correctAnswer: 1,
    explanation: "A remediation strategy is a document that sets out the approach and methods for addressing land contamination to make the site suitable for its proposed end use. It is informed by the site investigation and risk assessment findings and typically includes remediation objectives, proposed techniques (such as excavation, in-situ treatment, or containment), verification requirements, and monitoring plans.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Remediation strategy",
    category: "Pollution Prevention"
  },
  {
    id: 140,
    question: "What is the 'polluter pays' principle in contaminated land legislation?",
    options: [
      "The current landowner always pays regardless of who caused the contamination",
      "The person or company who caused or knowingly permitted the contamination is primarily liable for remediation costs",
      "The local authority always pays for remediation from council tax",
      "Insurance companies always pay for contaminated land clean-up"
    ],
    correctAnswer: 1,
    explanation: "Under Part IIA of the Environmental Protection Act 1990, the 'polluter pays' principle establishes that the person who caused or knowingly permitted the contamination (the 'appropriate person' — Class A) bears primary liability for remediation. Only if no Class A person can be found after reasonable enquiry does liability pass to the current owner or occupier (Class B). This hierarchy ensures that those responsible for contamination bear the cost of clean-up.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Polluter pays principle",
    category: "Pollution Prevention"
  },
  {
    id: 141,
    question: "Which agency is the enforcing authority for 'special sites' under Part IIA of the Environmental Protection Act 1990?",
    options: [
      "The local planning authority",
      "The Environment Agency",
      "The Health and Safety Executive",
      "Natural England"
    ],
    correctAnswer: 1,
    explanation: "Under Part IIA, 'special sites' — such as those affecting controlled waters, MOD land, nuclear sites, or sites regulated under the Environmental Permitting Regulations — are regulated by the Environment Agency rather than the local authority. The local authority identifies the land as contaminated and refers it to the Environment Agency, which then becomes the enforcing authority responsible for ensuring remediation.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Special sites",
    category: "Pollution Prevention"
  },
  {
    id: 142,
    question: "What type of SuDS feature is a 'swale'?",
    options: [
      "An underground storage tank",
      "A shallow, vegetated channel designed to convey and filter surface water runoff",
      "A mechanical pumping station",
      "A type of oil interceptor"
    ],
    correctAnswer: 1,
    explanation: "A swale is a broad, shallow, vegetated channel designed to convey, store, and treat surface water runoff. As water flows through the vegetation, pollutants are filtered and slowed down, reducing peak flow rates and improving water quality. Swales are one of the most common SuDS features and can be incorporated into verges, parks, and open spaces on development sites.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Swales",
    category: "Pollution Prevention"
  },
  {
    id: 143,
    question: "What is an 'attenuation tank' in the context of SuDS?",
    options: [
      "A tank that heats water for construction use",
      "An underground or surface-level storage system that temporarily holds surface water runoff and releases it at a controlled rate",
      "A chemical treatment tank for contaminated water",
      "A fuel storage tank with secondary containment"
    ],
    correctAnswer: 1,
    explanation: "An attenuation tank is an underground or surface-level storage system designed to temporarily hold surface water runoff during heavy rainfall events and release it slowly at a controlled rate to the drainage network or watercourse. This reduces peak flow rates downstream, helping to prevent flooding. Attenuation tanks can be modular crate systems, concrete tanks, or oversized pipes.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Attenuation tanks",
    category: "Pollution Prevention"
  },
  {
    id: 144,
    question: "What does a 'silt fence' do on a construction site?",
    options: [
      "Provides security fencing around the site perimeter",
      "Filters sediment from surface water runoff to prevent silt entering watercourses",
      "Blocks noise from construction plant",
      "Prevents unauthorised access to excavations"
    ],
    correctAnswer: 1,
    explanation: "A silt fence is a temporary sediment control device installed on construction sites to filter sediment-laden surface water runoff before it reaches watercourses, drains, or sensitive habitats. The fence consists of a geotextile fabric supported by stakes, placed downslope of disturbed areas. Silt fences are a basic but effective pollution prevention measure and are commonly required in Construction Environmental Management Plans.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Silt fences",
    category: "Pollution Prevention"
  },
  {
    id: 145,
    question: "What is the maximum penalty for causing a water pollution offence under the Environmental Permitting Regulations 2016?",
    options: [
      "A written warning only",
      "Up to £1,000 fine",
      "Up to 12 months imprisonment and/or an unlimited fine in the magistrates' court, or up to 5 years and/or an unlimited fine in the Crown Court",
      "A £500 fixed penalty notice"
    ],
    correctAnswer: 2,
    explanation: "Causing or knowingly permitting a water discharge activity or groundwater activity without an environmental permit is a serious criminal offence under the Environmental Permitting Regulations 2016. On summary conviction in the magistrates' court, the penalty can be up to 12 months imprisonment and/or an unlimited fine. On conviction on indictment in the Crown Court, the maximum penalty is 5 years imprisonment and/or an unlimited fine.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Water pollution penalties",
    category: "Pollution Prevention"
  },
  {
    id: 146,
    question: "What is a 'spill kit' and when should one be available on a construction site?",
    options: [
      "A first aid kit specifically for chemical burns — only required in laboratories",
      "A collection of absorbent materials and containment equipment for cleaning up oil, fuel, or chemical spills — required wherever such substances are stored or used",
      "A tool kit for repairing damaged pipes — only required for plumbing contractors",
      "A drainage testing kit — only required during commissioning"
    ],
    correctAnswer: 1,
    explanation: "A spill kit contains absorbent materials (such as pads, granules, and booms), protective equipment, and disposal bags for responding to spills of oil, fuel, chemicals, or other pollutants. Spill kits should be readily available wherever potentially polluting substances are stored, handled, or used on a construction site. Workers must be trained in their use, and the kits must be appropriate for the substances present.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Spill kits",
    category: "Pollution Prevention"
  },
  {
    id: 147,
    question: "What is the purpose of an oil interceptor?",
    options: [
      "To measure the oil content of water",
      "To separate oil and other hydrocarbons from surface water runoff before it enters the drainage system or watercourse",
      "To store oil securely underground",
      "To heat oil before it is used as fuel"
    ],
    correctAnswer: 1,
    explanation: "An oil interceptor (also called an oil separator) is a device installed in drainage systems to separate and retain oil, fuel, and other light hydrocarbons from surface water runoff before it is discharged to drains, watercourses, or the ground. Interceptors are typically required for car parks, refuelling areas, vehicle maintenance areas, and sites where there is a risk of oil contamination.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Oil interceptors",
    category: "Pollution Prevention"
  },
  {
    id: 148,
    question: "Under the Oil Storage Regulations, what minimum capacity of oil triggers the requirement for secondary containment?",
    options: [
      "Any amount of oil",
      "Over 200 litres",
      "Over 1,000 litres",
      "Over 5,000 litres"
    ],
    correctAnswer: 1,
    explanation: "The Control of Pollution (Oil Storage) (England) Regulations 2001 apply to the storage of oil in containers with a capacity of more than 200 litres. Above this threshold, the regulations require secondary containment (bunding) capable of holding at least 110% of the container's capacity, along with requirements for the integrity and maintenance of both the container and the bund.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Oil storage threshold",
    category: "Pollution Prevention"
  },
  {
    id: 149,
    question: "What is 'concrete washout' and why is it a pollution risk?",
    options: [
      "The process of cleaning concrete from tools and equipment — the alkaline wash water can pollute watercourses",
      "A method of strengthening concrete by washing it with acid",
      "A type of concrete finish used on exposed surfaces",
      "A defect in concrete caused by excess water in the mix"
    ],
    correctAnswer: 0,
    explanation: "Concrete washout is the process of cleaning concrete from mixer trucks, pumps, tools, and equipment. The resulting wash water is highly alkaline (pH 11-13) and contains fine sediment, which can be lethal to aquatic life and cause significant pollution to watercourses and drains. Concrete washout must be collected in designated, lined washout areas and never allowed to enter drains, watercourses, or unprotected ground.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Concrete washout",
    category: "Pollution Prevention"
  },
  {
    id: 150,
    question: "What is the BRE 365 test used for?",
    options: [
      "Testing the compressive strength of concrete",
      "Measuring the infiltration rate of soil for SuDS design",
      "Assessing the thermal performance of insulation",
      "Determining the fire resistance of structural elements"
    ],
    correctAnswer: 1,
    explanation: "The BRE 365 soakaway design and construction test (published by the Building Research Establishment) is used to measure the infiltration rate of soil on a site. This information is essential for designing infiltration-based SuDS features such as soakaways, permeable paving, and rain gardens. The test involves excavating a pit, filling it with water, and measuring the rate at which the water level drops.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "BRE 365 test",
    category: "Pollution Prevention"
  },
  {
    id: 151,
    question: "What is the main risk of allowing cement or concrete to enter a watercourse?",
    options: [
      "It makes the water taste unpleasant",
      "The high alkalinity (pH 11-13) is toxic to aquatic organisms and can devastate freshwater ecosystems",
      "It stains rocks and riverbanks",
      "It has no significant environmental effect"
    ],
    correctAnswer: 1,
    explanation: "Cement and concrete are highly alkaline, with a pH typically between 11 and 13. If wash water or uncured concrete enters a watercourse, it can rapidly raise the pH to levels that are lethal to fish, invertebrates, and aquatic plants. Even small quantities can cause severe ecological damage. The Environment Agency treats concrete pollution as a serious incident and can bring criminal prosecution.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Cement pollution",
    category: "Pollution Prevention"
  },
  {
    id: 152,
    question: "What does 'controlled waters' mean in UK environmental law?",
    options: [
      "Only water supplied by water companies",
      "Inland freshwaters, groundwaters, and coastal waters as defined in the Water Resources Act 1991",
      "Only drinking water reservoirs",
      "Water stored in tanks on construction sites"
    ],
    correctAnswer: 1,
    explanation: "Under the Water Resources Act 1991, 'controlled waters' is defined broadly to include: inland freshwaters (rivers, streams, lakes, ponds, and reservoirs), groundwaters (water in underground strata), estuaries, and coastal waters up to three nautical miles from the baseline. It is an offence to cause or knowingly permit pollution of controlled waters without authorisation.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Controlled waters",
    category: "Pollution Prevention"
  },
  {
    id: 153,
    question: "What is a 'Desk Study' in the context of contaminated land investigation?",
    options: [
      "A study carried out by office workers about their workspace",
      "A review of historical maps, records, and environmental data to assess the potential for land contamination before any intrusive investigation",
      "A study of desk heights for ergonomic compliance",
      "A financial feasibility study for a development project"
    ],
    correctAnswer: 1,
    explanation: "A Desk Study (also called a Phase 1 Environmental Assessment or Preliminary Risk Assessment) is the first stage of contaminated land investigation. It involves reviewing historical maps, trade directories, regulatory records, geological and hydrogeological data, and other documentary evidence to identify potential sources of contamination, pathways, and receptors. The findings inform decisions about whether intrusive (Phase 2) investigation is required.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Desk study",
    category: "Pollution Prevention"
  },
  {
    id: 154,
    question: "What does 'ex situ remediation' of contaminated soil involve?",
    options: [
      "Treating the soil in its original location without excavation",
      "Excavating contaminated soil and treating it off-site or in a separate treatment area on site",
      "Covering the soil with a membrane and leaving it in place",
      "Monitoring the soil without any intervention"
    ],
    correctAnswer: 1,
    explanation: "Ex situ remediation involves excavating contaminated soil and either treating it in a designated area on site or transporting it to an off-site treatment facility. Treatment methods may include bioremediation, soil washing, thermal treatment, or stabilisation. The alternative approach is in situ remediation, where contamination is treated in place without excavation.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Ex situ remediation",
    category: "Pollution Prevention"
  },
  {
    id: 155,
    question: "What is the purpose of a 'watching brief' during earthworks on a potentially contaminated site?",
    options: [
      "To ensure workers do not steal materials",
      "To have a qualified person observe excavation works and identify unexpected contamination for appropriate action",
      "To monitor the structural stability of buildings",
      "To record the working hours of plant operators"
    ],
    correctAnswer: 1,
    explanation: "A watching brief involves having a suitably qualified environmental professional present during earthworks to observe soil conditions and identify any unexpected contamination that may be encountered — such as unusual colours, odours, textures, or buried waste. If contamination is found, the watching brief allows immediate assessment and appropriate action, such as segregating contaminated material, adjusting remediation methods, or halting work for further investigation.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Watching brief",
    category: "Pollution Prevention"
  },
  {
    id: 156,
    question: "What is the role of the Environment Agency in pollution prevention on construction sites?",
    options: [
      "It has no role on construction sites",
      "It is the regulator responsible for protecting the environment, including preventing pollution of water, land, and air, and can take enforcement action",
      "It only deals with nuclear power stations",
      "It is responsible for building control approvals"
    ],
    correctAnswer: 1,
    explanation: "The Environment Agency is the principal environmental regulator in England. On construction sites, it is responsible for preventing pollution of controlled waters, regulating waste management, protecting sensitive habitats, and ensuring compliance with environmental permits. The EA can investigate pollution incidents, issue enforcement notices, and prosecute offenders. It also provides guidance on pollution prevention through the GPP and PPG series.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Environment Agency role",
    category: "Pollution Prevention"
  },
  {
    id: 157,
    question: "What is 'dewatering' on a construction site and what environmental risk does it pose?",
    options: [
      "Switching off the water supply — risk of fire",
      "Pumping groundwater or surface water from excavations — risk of polluting watercourses with sediment or contaminants",
      "Removing moisture from concrete — risk of structural failure",
      "Draining swimming pools — risk of flooding neighbours"
    ],
    correctAnswer: 1,
    explanation: "Dewatering is the process of pumping groundwater or accumulated surface water from excavations to allow construction work to proceed. It poses environmental risks because the pumped water may contain high levels of suspended sediment, contaminants from the ground, or cement residues. Discharging this water directly to watercourses without treatment can cause pollution. An environmental permit or exemption may be required from the Environment Agency for dewatering activities.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Dewatering",
    category: "Pollution Prevention"
  },
  {
    id: 158,
    question: "What is 'permeable paving' and how does it function as a SuDS feature?",
    options: [
      "Standard tarmac that has been painted to look different",
      "A paved surface that allows rainwater to drain through the surface into a sub-base where it is stored and gradually released or infiltrated",
      "Paving that is only suitable for pedestrian areas",
      "Temporary paving made from recycled plastic"
    ],
    correctAnswer: 1,
    explanation: "Permeable paving is a SuDS feature that uses specially designed paving blocks, porous asphalt, or porous concrete to allow rainwater to drain through the surface into a granular sub-base. The sub-base acts as a reservoir, temporarily storing the water and allowing it to infiltrate into the ground or be released slowly to the drainage network. This reduces surface water runoff rates and provides natural filtration of pollutants.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Permeable paving",
    category: "Pollution Prevention"
  },
  {
    id: 159,
    question: "What minimum bund capacity is required when multiple oil containers share a single bund under the Oil Storage Regulations?",
    options: [
      "25% of the total capacity of all containers",
      "50% of the total capacity of all containers",
      "110% of the largest container or 25% of the total capacity, whichever is greater",
      "100% of the smallest container"
    ],
    correctAnswer: 2,
    explanation: "When multiple oil storage containers share a single bund, the Oil Storage Regulations require the bund capacity to be the greater of 110% of the largest container's capacity or 25% of the total aggregate storage capacity. This ensures adequate secondary containment in the event of a single container failure while also providing reasonable protection if smaller leaks occur from multiple containers.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Bund capacity",
    category: "Pollution Prevention"
  },
  {
    id: 160,
    question: "What is a 'settlement lagoon' used for on a construction site?",
    options: [
      "A lagoon where workers can relax during breaks",
      "A temporary pond where sediment-laden water is held to allow suspended solids to settle out before discharge",
      "A permanent ornamental water feature",
      "A lagoon for storing sewage from site welfare facilities"
    ],
    correctAnswer: 1,
    explanation: "A settlement lagoon (or settling pond) is a temporary water treatment feature on a construction site where sediment-laden runoff is directed and held for a period, allowing suspended solids to settle to the bottom under gravity. The cleaner water can then be discharged (subject to any permit requirements) or recirculated for dust suppression. Settlement lagoons are a key pollution prevention measure during earthworks and demolition.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Settlement lagoons",
    category: "Pollution Prevention"
  },
  // =======================================================================
  // BIODIVERSITY & BEST PRACTICE — 40 questions (id 161-200)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // Topics: protected species, WCA 1981, habitats regulations, biodiversity
  //         net gain 10%, BREEAM, CEEQUAL, ISO 14001, EMS, ecological
  //         surveys, PEA, species licensing
  // =======================================================================
  {
    id: 161,
    question: "What does the Wildlife and Countryside Act 1981 protect?",
    options: [
      "Only domestic animals",
      "Wild birds, certain wild animals and plants, and their habitats",
      "Only marine species",
      "Only trees in urban areas"
    ],
    correctAnswer: 1,
    explanation: "The Wildlife and Countryside Act 1981 (WCA) is the principal legislation protecting wildlife in Great Britain. It provides protection for wild birds (all species), specifically listed wild animals (such as bats, great crested newts, and dormice), specifically listed wild plants, and Sites of Special Scientific Interest (SSSIs). The Act makes it an offence to intentionally kill, injure, or take protected species or to damage or destroy their habitats.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Wildlife and Countryside Act 1981",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 162,
    question: "Under the Wildlife and Countryside Act 1981, what is the legal status of bats in the UK?",
    options: [
      "They have no legal protection",
      "All bat species and their roosts are fully protected — it is an offence to disturb, injure, or kill bats or damage their roosts",
      "Only fruit bats are protected",
      "Bats are only protected in national parks"
    ],
    correctAnswer: 1,
    explanation: "All 18 species of bat found in the UK are fully protected under the Wildlife and Countryside Act 1981 (Schedule 5) and the Conservation of Habitats and Species Regulations 2017. It is a criminal offence to deliberately capture, injure, or kill a bat; to intentionally or recklessly disturb bats; or to damage or destroy a bat roost (whether occupied or not). A Natural England licence is required for any works that could affect bats or their roosts.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Bat protection",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 163,
    question: "What are the Conservation of Habitats and Species Regulations 2017 commonly known as?",
    options: [
      "The Building Regulations",
      "The Habitats Regulations",
      "The Planning Regulations",
      "The Fire Safety Regulations"
    ],
    correctAnswer: 1,
    explanation: "The Conservation of Habitats and Species Regulations 2017 are commonly known as the 'Habitats Regulations'. They transpose the requirements of the EU Habitats Directive and Birds Directive into English and Welsh law. The regulations provide protection for European Protected Species (such as great crested newts, bats, and otters) and for Special Areas of Conservation (SACs) and Special Protection Areas (SPAs).",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Habitats Regulations",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 164,
    question: "What is 'biodiversity net gain' (BNG) and what percentage is required under the Environment Act 2021?",
    options: [
      "A 5% increase in habitat area — required for all developments",
      "A 10% increase in biodiversity value — required for most new developments through planning",
      "A 25% increase in tree planting — required only for commercial developments",
      "A 50% increase in green space — required only in national parks"
    ],
    correctAnswer: 1,
    explanation: "Biodiversity net gain (BNG) is a planning requirement under the Environment Act 2021 that most new developments in England must deliver a minimum 10% increase in biodiversity value compared to the pre-development baseline. Biodiversity value is measured using the Defra statutory biodiversity metric, and the gains must be maintained for at least 30 years. BNG became mandatory for most major developments from February 2024.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Biodiversity net gain",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 165,
    question: "How is biodiversity value measured under the statutory biodiversity net gain framework?",
    options: [
      "By counting the number of trees on site",
      "Using the Defra statutory biodiversity metric, which assesses habitat type, condition, distinctiveness, and area",
      "By measuring the total green space as a percentage of site area",
      "By counting the number of bird species observed on site"
    ],
    correctAnswer: 1,
    explanation: "Biodiversity value under the statutory BNG framework is measured using the Defra statutory biodiversity metric (currently version 4.0). The metric calculates 'biodiversity units' based on the habitat type (and its distinctiveness), the area or length of habitat, and its ecological condition. The pre-development baseline is compared with the post-development proposal to determine whether the minimum 10% net gain has been achieved.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Biodiversity metric",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 166,
    question: "For how long must biodiversity net gains be maintained under the Environment Act 2021?",
    options: [
      "5 years",
      "10 years",
      "30 years",
      "In perpetuity"
    ],
    correctAnswer: 2,
    explanation: "Under the Environment Act 2021, biodiversity net gains achieved as part of a planning permission must be maintained for a minimum of 30 years. This is secured through planning conditions, conservation covenants, or legal agreements (such as Section 106 agreements). The 30-year period applies whether the habitat is created on site, off site, or delivered through statutory biodiversity credits.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "BNG duration",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 167,
    question: "What is BREEAM?",
    options: [
      "A type of structural steel beam",
      "The Building Research Establishment Environmental Assessment Method — a sustainability rating scheme for buildings",
      "A brand of insulation material",
      "A government department responsible for building safety"
    ],
    correctAnswer: 1,
    explanation: "BREEAM (Building Research Establishment Environmental Assessment Method) is the world's leading sustainability assessment method for buildings, infrastructure, and communities. Developed by BRE, it evaluates buildings across categories including energy, health and wellbeing, innovation, land use, materials, management, pollution, transport, waste, and water. Ratings range from Pass to Outstanding.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "BREEAM",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 168,
    question: "What are the BREEAM rating levels, from lowest to highest?",
    options: [
      "Bronze, Silver, Gold, Platinum",
      "Pass, Good, Very Good, Excellent, Outstanding",
      "Level 1, Level 2, Level 3, Level 4, Level 5",
      "Basic, Standard, Premium, Elite"
    ],
    correctAnswer: 1,
    explanation: "BREEAM ratings are awarded based on the percentage score achieved across all assessed categories. The five rating levels from lowest to highest are: Pass (30%+), Good (45%+), Very Good (55%+), Excellent (70%+), and Outstanding (85%+). An Unclassified result is given for scores below 30%. Many public sector clients and major developers target BREEAM Excellent or Outstanding for new buildings.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "BREEAM ratings",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 169,
    question: "What is CEEQUAL?",
    options: [
      "A chemical testing standard for water quality",
      "A sustainability assessment, rating, and awards scheme for civil engineering and infrastructure projects",
      "A certification for electrical equipment",
      "A quality management standard for concrete"
    ],
    correctAnswer: 1,
    explanation: "CEEQUAL is the evidence-based sustainability assessment, rating, and awards scheme for civil engineering, infrastructure, landscaping, and public realm projects. Now part of the BRE Group (alongside BREEAM), CEEQUAL assesses the sustainability performance of projects against categories including project management, land use, landscape, ecology, water, energy, transport, waste, and community relations.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "CEEQUAL",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 170,
    question: "What is ISO 14001?",
    options: [
      "A standard for information security management",
      "The international standard for Environmental Management Systems (EMS)",
      "A standard for quality management",
      "A standard for occupational health and safety"
    ],
    correctAnswer: 1,
    explanation: "ISO 14001 is the internationally recognised standard for Environmental Management Systems (EMS). It provides a framework for organisations to manage their environmental responsibilities systematically, improve environmental performance, fulfil compliance obligations, and achieve environmental objectives. Certification to ISO 14001 demonstrates to clients, regulators, and stakeholders that an organisation has a structured approach to managing its environmental impacts.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "ISO 14001",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 171,
    question: "What is an Environmental Management System (EMS)?",
    options: [
      "A computer system for monitoring electricity meters",
      "A structured framework of policies, processes, and procedures for managing an organisation's environmental impacts",
      "An emergency medical service for environmental incidents",
      "A government department responsible for environmental enforcement"
    ],
    correctAnswer: 1,
    explanation: "An Environmental Management System (EMS) is a structured framework that helps organisations manage their environmental responsibilities in a systematic way. It typically includes an environmental policy, planning processes, implementation procedures, monitoring and measurement systems, and management review processes. The 'Plan-Do-Check-Act' cycle is central to an EMS. ISO 14001 is the most widely adopted standard for implementing an EMS.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Environmental Management System",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 172,
    question: "What is a Preliminary Ecological Appraisal (PEA)?",
    options: [
      "A financial appraisal of land values",
      "An initial ecological survey that identifies habitats, potential for protected species, and ecological constraints on a site",
      "A planning application form for ecological developments",
      "An energy performance assessment for buildings"
    ],
    correctAnswer: 1,
    explanation: "A Preliminary Ecological Appraisal (PEA) — sometimes called a Phase 1 Habitat Survey or Extended Phase 1 Survey — is an initial ecological assessment of a site. It involves a desk study of ecological records and a walkover survey to map habitats, identify features with potential to support protected or notable species, and assess ecological constraints and opportunities. The PEA determines whether further detailed species surveys are needed.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Preliminary Ecological Appraisal",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 173,
    question: "During which months are bat activity surveys typically carried out in the UK?",
    options: [
      "January to March only",
      "May to September (the active season), with surveys typically starting at dusk",
      "November to February only",
      "Any month of the year — bats are active year-round"
    ],
    correctAnswer: 1,
    explanation: "Bat activity surveys (emergence and re-entry surveys) are typically carried out between May and September, when bats are most active. Surveys are conducted starting at dusk (for emergence surveys) or before dawn (for re-entry surveys) and use a combination of visual observation and bat detectors to record echolocation calls. The Bat Conservation Trust's 'Bat Surveys for Professional Ecologists: Good Practice Guidelines' specifies the survey season, effort, and methodology required.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Bat surveys",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 174,
    question: "What is a European Protected Species (EPS) licence?",
    options: [
      "A licence to import protected species from Europe",
      "A licence granted by Natural England that allows otherwise prohibited activities affecting European Protected Species, subject to strict conditions",
      "A licence to export wildlife products to Europe",
      "A licence for zoos to keep European species"
    ],
    correctAnswer: 1,
    explanation: "A European Protected Species (EPS) licence (also called a mitigation licence) is granted by Natural England under the Conservation of Habitats and Species Regulations 2017. It authorises activities that would otherwise be illegal — such as disturbing, capturing, or relocating protected species, or damaging their breeding sites or resting places — subject to meeting three legal tests: no satisfactory alternative, imperative reasons of overriding public interest, and no detriment to the species' conservation status.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "EPS licence",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 175,
    question: "What are the three legal tests that must be satisfied to obtain an EPS licence?",
    options: [
      "Cost efficiency, public support, and environmental impact",
      "No satisfactory alternative, imperative reasons of overriding public interest, and no detriment to the species' favourable conservation status",
      "Planning permission, building control approval, and insurance",
      "Health and safety compliance, structural adequacy, and fire safety"
    ],
    correctAnswer: 1,
    explanation: "The three legal tests for an EPS licence under the Habitats Regulations are: (1) there is no satisfactory alternative to the proposed action; (2) the action is necessary for imperative reasons of overriding public interest (including social or economic reasons); and (3) the action will not be detrimental to the maintenance of the population of the species at a favourable conservation status in their natural range. All three tests must be met.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "EPS licence tests",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 176,
    question: "Which species commonly encountered on UK construction sites is a European Protected Species?",
    options: [
      "Grey squirrels",
      "Great crested newts",
      "Foxes",
      "Magpies"
    ],
    correctAnswer: 1,
    explanation: "Great crested newts (Triturus cristatus) are a European Protected Species under the Conservation of Habitats and Species Regulations 2017 and are also protected under the Wildlife and Countryside Act 1981. They are commonly encountered on construction sites, particularly where there are ponds, ditches, or other water bodies within 500 metres. An EPS licence from Natural England is required for any works that could affect great crested newts or their habitats.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Great crested newts",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 177,
    question: "What is the 'nesting bird season' in the UK, during which vegetation clearance should be avoided?",
    options: [
      "January to March",
      "March to August (inclusive)",
      "September to November",
      "October to February"
    ],
    correctAnswer: 1,
    explanation: "The main bird nesting season in the UK runs from March to August inclusive, although some species may nest earlier or later. All wild birds, their nests (when in use or being built), and their eggs are protected under the Wildlife and Countryside Act 1981. Vegetation clearance, demolition, and other works that could disturb nesting birds should be scheduled outside this period, or a pre-works check by a suitably qualified ecologist must confirm no active nests are present.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Nesting bird season",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 178,
    question: "What is the District Level Licensing (DLL) scheme for great crested newts?",
    options: [
      "A scheme that bans all development within a district where newts are present",
      "A strategic licensing approach where developers pay into a fund that delivers habitat compensation at a landscape scale, avoiding the need for individual site surveys",
      "A scheme that allows unlimited capture of newts for scientific research",
      "A local council scheme for licensing fishing in newt habitats"
    ],
    correctAnswer: 1,
    explanation: "District Level Licensing (DLL) is an alternative approach to great crested newt licensing administered by Natural England. Instead of requiring individual site-by-site surveys and mitigation, developers in participating areas pay a conservation payment that funds habitat creation and management at a landscape scale. This delivers better outcomes for great crested newt conservation while reducing delays and costs for developers. The scheme is available in an increasing number of local authority areas.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "District Level Licensing",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 179,
    question: "What legal protection do badgers have in the UK?",
    options: [
      "None — badgers are considered a pest species",
      "Badgers and their setts are protected under the Protection of Badgers Act 1992",
      "Badgers are protected only in Scotland",
      "Badgers are only protected on nature reserves"
    ],
    correctAnswer: 1,
    explanation: "Badgers and their setts (burrow systems) are protected under the Protection of Badgers Act 1992. It is an offence to wilfully kill, injure, or take a badger; to cruelly ill-treat a badger; or to interfere with a sett by damaging, destroying, obstructing, or disturbing it. A licence from Natural England is required for any construction works that would disturb a badger sett. The 'exclusion zone' around an active sett is typically 30 metres.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Badger protection",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 180,
    question: "What is a 'biodiversity action plan' (BAP)?",
    options: [
      "A business action plan for landscaping companies",
      "A strategy and action plan that identifies priorities and actions for conserving and enhancing biodiversity",
      "A plan for removing invasive species from a garden",
      "A financial plan for buying land for nature reserves"
    ],
    correctAnswer: 1,
    explanation: "A Biodiversity Action Plan (BAP) sets out the priorities, targets, and actions for conserving and enhancing biodiversity at a national, regional, or local level. The UK BAP (now succeeded by the post-2010 biodiversity framework) identified priority habitats and species and the actions needed to protect and recover them. Local BAPs help guide development planning and land management to benefit local wildlife.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Biodiversity action plan",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 181,
    question: "What is the purpose of an Ecological Impact Assessment (EcIA)?",
    options: [
      "To calculate the financial value of wildlife on a site",
      "To identify, quantify, and evaluate the potential ecological effects of a development, and to recommend avoidance, mitigation, and compensation measures",
      "To list all species observed on a site over one visit",
      "To test soil samples for nutrient content"
    ],
    correctAnswer: 1,
    explanation: "An Ecological Impact Assessment (EcIA) is a systematic process for identifying, quantifying, and evaluating the potential effects of a proposed development on ecological receptors (habitats, species, and ecosystems). It follows the CIEEM (Chartered Institute of Ecology and Environmental Management) guidelines and forms part of an Environmental Impact Assessment or planning application. The EcIA recommends measures to avoid, mitigate, and compensate for adverse ecological effects.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Ecological Impact Assessment",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 182,
    question: "What does CIEEM stand for?",
    options: [
      "Construction Industry Environmental Engineering Method",
      "Chartered Institute of Ecology and Environmental Management",
      "Central Institute of Energy and Emissions Monitoring",
      "Certified Inspectors of Electrical and Electronic Materials"
    ],
    correctAnswer: 1,
    explanation: "CIEEM stands for the Chartered Institute of Ecology and Environmental Management. It is the leading professional body for ecologists and environmental managers in the UK, Ireland, and internationally. CIEEM sets standards for professional practice, publishes guidance on ecological surveys and assessment (including the EcIA guidelines), and provides a register of qualified ecologists.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "CIEEM",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 183,
    question: "What is the mitigation hierarchy in ecological assessment?",
    options: [
      "Build, monitor, repair, demolish",
      "Avoid, mitigate, compensate — applied in that order of preference",
      "Survey, design, construct, occupy",
      "Plan, implement, check, act"
    ],
    correctAnswer: 1,
    explanation: "The mitigation hierarchy is a fundamental principle in ecological assessment and environmental management. It requires that potential ecological effects are addressed in the following order of preference: (1) avoidance — redesign or relocate to avoid impacts entirely; (2) mitigation — reduce impacts that cannot be avoided; (3) compensation — offset residual impacts through habitat creation or enhancement elsewhere. Only after applying all three steps should any residual effects be assessed for significance.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Mitigation hierarchy",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 184,
    question: "What type of ecological survey is an eDNA survey for great crested newts?",
    options: [
      "A visual survey of newt populations conducted at night",
      "A water sampling technique that detects great crested newt DNA in pond water without the need to capture animals",
      "A genetic test performed on captured newts",
      "An aerial drone survey of newt habitats"
    ],
    correctAnswer: 1,
    explanation: "An environmental DNA (eDNA) survey involves collecting water samples from ponds and analysing them in a laboratory for traces of great crested newt DNA shed through skin cells, mucus, and excrement. It is a rapid, non-invasive method of determining the presence or likely absence of great crested newts in a pond. eDNA sampling must be carried out between mid-April and the end of June, following strict protocols to avoid contamination.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "eDNA surveys",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 185,
    question: "What is a 'Site of Special Scientific Interest' (SSSI)?",
    options: [
      "A construction site that uses innovative building methods",
      "A site designated under the Wildlife and Countryside Act 1981 for its outstanding wildlife, geological, or physiographical features",
      "A brownfield site approved for scientific research",
      "A site where hazardous materials have been stored"
    ],
    correctAnswer: 1,
    explanation: "A Site of Special Scientific Interest (SSSI) is a designation under the Wildlife and Countryside Act 1981 for areas of land that are of special interest by reason of their flora, fauna, geological, or physiographical features. SSSIs are notified by Natural England (in England) and receive legal protection. Owners and occupiers must obtain consent before carrying out any operations likely to damage the special features, and public authorities must take reasonable steps to further the conservation and enhancement of SSSIs.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "SSSI",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 186,
    question: "What is a 'Habitats Regulations Assessment' (HRA)?",
    options: [
      "An assessment of housing quality standards",
      "An assessment required for any plan or project likely to have a significant effect on a European designated site (SAC or SPA)",
      "An assessment of indoor air quality in buildings",
      "An assessment of workplace ergonomics"
    ],
    correctAnswer: 1,
    explanation: "A Habitats Regulations Assessment (HRA) is required under the Conservation of Habitats and Species Regulations 2017 for any plan or project that is likely to have a significant effect on a European designated site — namely a Special Area of Conservation (SAC), Special Protection Area (SPA), or Ramsar site. The HRA process includes screening, appropriate assessment, and consideration of alternative solutions and imperative reasons of overriding public interest.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Habitats Regulations Assessment",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 187,
    question: "What is the 'Plan-Do-Check-Act' cycle in the context of ISO 14001?",
    options: [
      "A project management methodology for construction",
      "The continual improvement cycle at the core of an Environmental Management System",
      "A quality control process for manufacturing only",
      "A legislative compliance checklist"
    ],
    correctAnswer: 1,
    explanation: "The Plan-Do-Check-Act (PDCA) cycle is the continual improvement framework at the heart of ISO 14001. 'Plan' involves establishing environmental objectives and processes; 'Do' involves implementing the processes; 'Check' involves monitoring and measuring against policy, objectives, and legal requirements; and 'Act' involves taking corrective actions and making improvements. The cycle repeats continuously, driving ongoing improvement in environmental performance.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "PDCA cycle",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 188,
    question: "Which invasive non-native plant species is it an offence to cause to grow in the wild in the UK?",
    options: [
      "English ivy",
      "Japanese knotweed",
      "Common nettle",
      "Bramble"
    ],
    correctAnswer: 1,
    explanation: "Japanese knotweed (Reynoutria japonica) is listed on Schedule 9 of the Wildlife and Countryside Act 1981, making it an offence to plant or otherwise cause it to grow in the wild. Japanese knotweed is an aggressive invasive species that can damage buildings, roads, and drainage systems. Soil containing Japanese knotweed rhizome is classified as controlled waste. A management plan is essential on any development site where it is present.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Japanese knotweed",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 189,
    question: "What is a 'translocation' in ecological terms?",
    options: [
      "Translating ecological reports into different languages",
      "The deliberate, planned movement of living organisms from one location to another, typically as a conservation or mitigation measure",
      "The conversion of habitat from one type to another",
      "The transfer of land ownership for conservation purposes"
    ],
    correctAnswer: 1,
    explanation: "Translocation is the deliberate, planned movement of living organisms — including plants, animals, or entire habitats (such as turves or soil containing seed banks) — from one location to another. It is commonly used as a mitigation or compensation measure on development sites, for example relocating great crested newts to receptor habitats, moving reptiles to suitable areas, or translocating species-rich grassland. Translocation requires careful planning, appropriate licensing, and long-term monitoring.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Translocation",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 190,
    question: "What is the role of Natural England in relation to protected species?",
    options: [
      "Natural England is a charity that runs nature reserves",
      "Natural England is the government's statutory adviser on the natural environment, responsible for issuing species licences, designating protected sites, and advising on ecological matters",
      "Natural England is a private consultancy that carries out ecological surveys",
      "Natural England only operates in London"
    ],
    correctAnswer: 1,
    explanation: "Natural England is the government's statutory adviser on the natural environment in England. Its key roles include: designating and managing protected sites (SSSIs, National Nature Reserves, National Parks, AONBs); issuing European Protected Species licences and badger licences; advising on planning applications affecting the natural environment; managing agri-environment schemes; and overseeing the biodiversity net gain framework.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Natural England",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 191,
    question: "What type of ecological survey would be required before demolishing an old building that may contain bat roosts?",
    options: [
      "No survey is required — bats are not found in buildings",
      "A preliminary roost assessment followed by dusk emergence and/or dawn re-entry surveys if potential is identified",
      "A noise impact assessment",
      "A structural engineering survey only"
    ],
    correctAnswer: 1,
    explanation: "Before demolishing or significantly altering an old building, a preliminary roost assessment (PRA) should be carried out by a licensed bat ecologist. This daytime inspection assesses the building's potential to support roosting bats by looking for access points, droppings, staining, and other evidence. If the building has moderate or high potential, further surveys — typically dusk emergence and/or dawn re-entry surveys during the active season (May-September) — are required to confirm presence or likely absence of bats.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Bat roost surveys",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 192,
    question: "What is an 'Ecological Clerk of Works' (ECoW)?",
    options: [
      "A local authority officer who inspects wildlife parks",
      "A qualified ecologist appointed to monitor construction works and ensure compliance with ecological mitigation measures and licence conditions",
      "A clerk who records wildlife sightings for a nature charity",
      "A planning officer who processes ecological reports"
    ],
    correctAnswer: 1,
    explanation: "An Ecological Clerk of Works (ECoW) is a suitably qualified and experienced ecologist appointed to be present on a construction site to monitor and supervise works that could affect protected species or sensitive habitats. The ECoW ensures compliance with ecological mitigation measures, licence conditions, and planning conditions. They provide toolbox talks to site workers, oversee sensitive operations such as vegetation clearance, and advise on ecological issues as they arise.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Ecological Clerk of Works",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 193,
    question: "What is the purpose of wildlife-friendly fencing on a development site?",
    options: [
      "To prevent wildlife from entering the site permanently",
      "To maintain ecological connectivity by including features such as hedgehog gaps (13cm x 13cm) that allow small mammals to move between gardens and habitats",
      "To provide security against human intruders",
      "To reduce noise from construction plant"
    ],
    correctAnswer: 1,
    explanation: "Wildlife-friendly fencing incorporates features that maintain ecological connectivity across a development. The most common example is hedgehog gaps — small openings at the base of fencing (minimum 13cm x 13cm) that allow hedgehogs and other small mammals to move freely between gardens and habitat areas. Hedgehog populations have declined dramatically, and fragmentation of habitat by impermeable garden fencing is a significant factor. Many local planning policies now require hedgehog gaps.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Wildlife-friendly fencing",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 194,
    question: "Under BREEAM, which category assesses the ecological value and protection of a development site?",
    options: [
      "Energy",
      "Land Use and Ecology",
      "Transport",
      "Management"
    ],
    correctAnswer: 1,
    explanation: "The 'Land Use and Ecology' category in BREEAM assesses how a development protects and enhances the ecological value of a site. Credits are awarded for conducting ecological surveys, appointing a suitably qualified ecologist, protecting existing ecological features during construction, enhancing site ecology, and achieving biodiversity net gain. This category encourages developers to go beyond minimum regulatory requirements to deliver genuine ecological benefits.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "BREEAM ecology",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 195,
    question: "What is a 'conservation covenant' in the context of biodiversity net gain?",
    options: [
      "A contract between a builder and a conservation charity",
      "A legally binding agreement between a landowner and a responsible body to manage land for conservation purposes for at least 30 years",
      "A planning application for a nature reserve",
      "An insurance policy against ecological damage"
    ],
    correctAnswer: 1,
    explanation: "A conservation covenant is a legally binding agreement introduced by the Environment Act 2021 between a landowner and a designated 'responsible body' (such as a conservation charity, local authority, or government body). The landowner agrees to manage land for conservation purposes for at least 30 years. Conservation covenants are one of the mechanisms used to secure off-site biodiversity net gain, ensuring that habitat creation and management commitments are enforceable over the required period.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Conservation covenants",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 196,
    question: "What is 'habitat banking' in relation to biodiversity net gain?",
    options: [
      "Storing soil samples in a laboratory",
      "A system where habitat is created or enhanced in advance, generating biodiversity units that can be sold to developers who need to meet their BNG obligations",
      "A scheme for preserving seed collections in vaults",
      "A banking service exclusively for conservation charities"
    ],
    correctAnswer: 1,
    explanation: "Habitat banking is a market-based mechanism where landowners or conservation organisations create or enhance habitats in advance of demand, generating 'biodiversity units' that are registered and can be sold to developers who need to deliver off-site biodiversity net gain to meet their planning obligations. The biodiversity gain site must be registered with the national register, and the habitat must be maintained for at least 30 years. Habitat banking helps deliver landscape-scale conservation outcomes.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Habitat banking",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 197,
    question: "What does the 'significant environmental aspects' concept mean in ISO 14001?",
    options: [
      "Any activity that involves spending money on environmental compliance",
      "Elements of an organisation's activities, products, or services that interact with the environment and have a significant environmental impact",
      "Only activities that involve handling hazardous chemicals",
      "Only activities that require an environmental permit"
    ],
    correctAnswer: 1,
    explanation: "In ISO 14001, an 'environmental aspect' is an element of an organisation's activities, products, or services that interacts with the environment (such as emissions to air, discharges to water, waste generation, or resource consumption). A 'significant environmental aspect' is one that has or can have a significant environmental impact. Organisations must identify and evaluate their environmental aspects and determine which are significant, so they can prioritise management efforts and set objectives for improvement.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Environmental aspects",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 198,
    question: "What are 'statutory biodiversity credits' under the Environment Act 2021?",
    options: [
      "Tax credits for companies that donate to wildlife charities",
      "Credits that developers can purchase from the government as a last resort to meet their BNG obligation when on-site and off-site options have been exhausted",
      "Academic credits for studying ecology at university",
      "Carbon offset credits that count towards net zero targets"
    ],
    correctAnswer: 1,
    explanation: "Statutory biodiversity credits are a last-resort option under the Environment Act 2021 for developers who cannot achieve the required 10% biodiversity net gain through on-site or off-site habitat creation. Credits are purchased from the government (Natural England) at a deliberately high price to incentivise on-site and off-site delivery. The revenue from credit sales is ring-fenced and used by the government to invest in habitat creation and enhancement projects.",
    section: "environmental-sustainability",
    difficulty: "advanced",
    topic: "Statutory biodiversity credits",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 199,
    question: "What is a 'toolbox talk' in the context of ecological protection on a construction site?",
    options: [
      "A manufacturer's demonstration of new power tools",
      "A short briefing to site workers about specific ecological risks, protected species, and the mitigation measures they must follow",
      "A discussion about which tools to purchase for the project",
      "A formal training course lasting several days"
    ],
    correctAnswer: 1,
    explanation: "In the context of ecological protection, a toolbox talk is a short, focused briefing delivered to construction site workers — typically by the Ecological Clerk of Works or site environmental manager — about specific ecological risks on the site, protected species that may be present, legal obligations, and the mitigation measures that must be followed. Toolbox talks are an essential part of ensuring that all site personnel understand their responsibilities and can identify protected species or habitats.",
    section: "environmental-sustainability",
    difficulty: "basic",
    topic: "Ecological toolbox talks",
    category: "Biodiversity & Best Practice"
  },
  {
    id: 200,
    question: "What is the purpose of ecological monitoring after a development has been completed?",
    options: [
      "There is no need for monitoring after construction is finished",
      "To verify that ecological mitigation and compensation measures are effective, that habitats are establishing as planned, and that species populations are being maintained",
      "To count the number of residents who enjoy wildlife",
      "To determine if the buildings need structural repairs"
    ],
    correctAnswer: 1,
    explanation: "Post-construction ecological monitoring is essential to verify that mitigation, compensation, and enhancement measures are achieving their intended outcomes. This includes checking that newly created habitats are establishing and maturing, that translocated species are surviving and breeding, that wildlife features (such as bat and bird boxes) are being used, and that management prescriptions are being followed. Under biodiversity net gain, monitoring must continue for at least 30 years, with results reported to the local planning authority.",
    section: "environmental-sustainability",
    difficulty: "intermediate",
    topic: "Ecological monitoring",
    category: "Biodiversity & Best Practice"
  }
];