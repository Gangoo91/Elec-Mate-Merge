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
  'Environmental Awareness',
  'Waste Management',
  'Energy & Resource Efficiency',
  'Pollution Prevention',
  'Biodiversity & Best Practice',
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
  categories: environmentalSustainabilityCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomEnvironmentalSustainabilityExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    environmentalSustainabilityQuestionBank,
    numQuestions,
    environmentalSustainabilityCategories
  );
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
    question:
      "What is the most widely accepted definition of 'sustainable development', as set out in the 1987 Brundtland Report?",
    options: [
      'Economic growth that prioritises present needs and leaves environmental problems for future generations to solve with better technology',
      'Development that meets the needs of the present without compromising the ability of future generations to meet their own needs',
      'Development that halts all new construction in order to protect natural resources and reduce carbon emissions to zero',
      'Maximising short-term resource extraction to fund the renewable energy and conservation projects of future generations',
    ],
    correctAnswer: 1,
    explanation:
      "The Brundtland Report (Our Common Future, 1987) defined sustainable development as 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs'. This definition remains the cornerstone of international sustainability policy and underpins all subsequent UK environmental legislation.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Brundtland definition',
    category: 'Environmental Awareness',
  },
  {
    id: 2,
    question:
      'Which UK Act of Parliament originally established the framework for environmental protection, including pollution control and waste management?',
    options: [
      'Health and Safety at Work etc Act 1974',
      'Town and Country Planning Act 1990',
      'Environmental Protection Act 1990',
      'Clean Air Act 1956',
    ],
    correctAnswer: 2,
    explanation:
      'The Environmental Protection Act 1990 (EPA 1990) is the primary piece of UK legislation that established the framework for environmental protection. It introduced integrated pollution control (IPC), the duty of care for waste, statutory nuisance provisions, and the contaminated land regime. It remains a foundational statute for environmental regulation in the UK.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'EPA 1990',
    category: 'Environmental Awareness',
  },
  {
    id: 3,
    question: 'What does the acronym EIA stand for in an environmental context?',
    options: [
      'Environmental Inspection Authority',
      'Energy Improvement Analysis',
      'Ecological Investigation Audit',
      'Environmental Impact Assessment',
    ],
    correctAnswer: 3,
    explanation:
      'EIA stands for Environmental Impact Assessment. It is a systematic process used to identify, predict, and evaluate the environmental effects of proposed developments before planning permission is granted. EIAs are required for major construction projects under the Town and Country Planning (Environmental Impact Assessment) Regulations 2017.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'EIA',
    category: 'Environmental Awareness',
  },
  {
    id: 4,
    question:
      'Which international agreement, signed in 2015, aims to limit global warming to well below 2°C above pre-industrial levels?',
    options: [
      'The Paris Agreement',
      'The Montreal Protocol',
      'The Kyoto Protocol',
      'The Stockholm Convention',
    ],
    correctAnswer: 0,
    explanation:
      'The Paris Agreement was adopted in 2015 and signed by 196 parties. It aims to limit global temperature rise to well below 2°C above pre-industrial levels, with efforts to limit the increase to 1.5°C. The UK ratified the agreement and has since enshrined a net zero target for 2050 in law through the Climate Change Act 2008 (as amended in 2019).',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Paris Agreement',
    category: 'Environmental Awareness',
  },
  {
    id: 5,
    question: "What does 'net zero' mean in the context of UK climate policy?",
    options: [
      'Stopping all greenhouse gas emissions completely, so that no carbon dioxide or other gases are released into the atmosphere at all',
      'Balancing the amount of greenhouse gases emitted with the amount removed from the atmosphere, so the net contribution is zero',
      'Generating all of the nation\'s electricity from renewable sources such as wind and solar, eliminating the need for fossil fuel power stations',
      'Reducing greenhouse gas emissions to zero in the energy sector only, while allowing other sectors to continue emitting at current levels',
    ],
    correctAnswer: 1,
    explanation:
      'Net zero means achieving a balance between the greenhouse gases emitted into the atmosphere and those removed from it. The UK became the first major economy to legislate for net zero greenhouse gas emissions by 2050, amending the Climate Change Act 2008 in June 2019. This does not mean zero emissions, but rather that any remaining emissions are offset by removal activities such as tree planting or carbon capture.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Net zero',
    category: 'Environmental Awareness',
  },
  {
    id: 6,
    question:
      'How many Sustainable Development Goals (SDGs) were adopted by the United Nations in 2015?',
    options: [
      '21',
      '15',
      '17',
      '10',
    ],
    correctAnswer: 2,
    explanation:
      'The United Nations adopted 17 Sustainable Development Goals (SDGs) in September 2015 as part of the 2030 Agenda for Sustainable Development. The goals cover a broad range of issues including poverty, hunger, health, education, climate change, clean energy, responsible consumption, and life on land and below water. They provide the global framework that underpins national sustainability strategies.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'UN SDGs',
    category: 'Environmental Awareness',
  },
  {
    id: 7,
    question: "What is a 'carbon footprint'?",
    options: [
      'The total amount of carbon dioxide emitted directly by an activity or product, excluding methane, nitrous oxide, and other greenhouse gases',
      'The physical land area required to absorb the carbon dioxide emissions produced by an individual or organisation over one year',
      'The proportion of an organisation\'s emissions that arise from electricity use, expressed as a percentage of its total energy consumption',
      'The total amount of greenhouse gases produced directly and indirectly by an activity, individual, organisation, or product, expressed as carbon dioxide equivalent (CO2e)',
    ],
    correctAnswer: 3,
    explanation:
      'A carbon footprint is the total amount of greenhouse gases (including carbon dioxide, methane, and nitrous oxide) produced directly and indirectly by a person, organisation, event, or product. It is measured in tonnes of carbon dioxide equivalent (CO2e). Understanding carbon footprints is essential for identifying reduction opportunities on construction sites and in electrical installations.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Carbon footprint',
    category: 'Environmental Awareness',
  },
  {
    id: 8,
    question: "What does 'PDCA' stand for in the context of environmental management systems?",
    options: [
      'Plan, Do, Check, Act',
      'Prevent, Detect, Control, Assess',
      'Prepare, Document, Certify, Audit',
      'Produce, Distribute, Consume, Abandon',
    ],
    correctAnswer: 0,
    explanation:
      'PDCA stands for Plan, Do, Check, Act — also known as the Deming Cycle. It is the continuous improvement framework at the heart of ISO 14001 Environmental Management Systems. Organisations plan their environmental objectives, implement them (Do), monitor and measure results (Check), and take corrective action to improve performance (Act).',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'PDCA cycle',
    category: 'Environmental Awareness',
  },
  {
    id: 9,
    question:
      'Which international standard specifies requirements for an Environmental Management System (EMS)?',
    options: [
      'ISO 45001',
      'ISO 14001',
      'ISO 50001',
      'ISO 9001',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 14001 is the international standard that specifies the requirements for an effective Environmental Management System (EMS). It provides a framework for organisations to protect the environment, respond to changing environmental conditions, and integrate environmental management into their business processes. ISO 9001 covers quality management, ISO 45001 covers occupational health and safety, and ISO 50001 covers energy management.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'ISO 14001',
    category: 'Environmental Awareness',
  },
  {
    id: 10,
    question: "What is a 'circular economy'?",
    options: [
      'An economic model based on continuous growth in which resources are extracted, used once, and then disposed of as efficiently as possible',
      'A trading system in which businesses buy and sell recycled materials on a circular commodities market to balance supply and demand',
      'An economic model that aims to keep resources in use for as long as possible, extracting maximum value, then recovering and regenerating products and materials at end of life',
      'A national framework requiring all manufactured goods to be returned to the original producer within a fixed period after sale',
    ],
    correctAnswer: 2,
    explanation:
      "A circular economy is an alternative to the traditional linear 'take, make, dispose' model. It aims to keep resources in use for as long as possible, extract maximum value while in use, and recover and regenerate products and materials at end of life. This principle is increasingly applied in construction and electrical work through design for disassembly, material reuse, and recycling of components like cables and fittings.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Circular economy',
    category: 'Environmental Awareness',
  },
  {
    id: 11,
    question:
      'What key environmental principle did the Environment Act 2021 introduce regarding biodiversity in planning and development?',
    options: [
      'All developments must achieve zero biodiversity impact',
      'Biodiversity assessments are only required for developments over 100 hectares',
      'Developers must create a new nature reserve for every project',
      'Biodiversity net gain of at least 10% must be delivered by most new developments',
    ],
    correctAnswer: 3,
    explanation:
      'The Environment Act 2021 introduced mandatory biodiversity net gain (BNG), requiring most new developments in England to deliver at least a 10% increase in biodiversity compared to the pre-development baseline. This is measured using the Defra biodiversity metric and must be maintained for at least 30 years. The requirement became mandatory for major developments from February 2024.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Environment Act 2021',
    category: 'Environmental Awareness',
  },
  {
    id: 12,
    question: "Under the Environmental Protection Act 1990, what is a 'statutory nuisance'?",
    options: [
      'A condition or activity that is prejudicial to health or a nuisance, as defined in Part III of the Act, including noise, dust, smoke, and fumes',
      'Any breach of an environmental permit condition that the Environment Agency has formally recorded but not yet prosecuted',
      'A minor environmental incident that causes inconvenience but does not require the local authority to take any formal enforcement action',
      'A planning condition imposed by the local authority to restrict the hours during which noisy activities may be carried out',
    ],
    correctAnswer: 0,
    explanation:
      'Part III of the Environmental Protection Act 1990 defines statutory nuisances as conditions or activities that are prejudicial to health or constitute a nuisance. These include smoke, fumes, gases, dust, steam, smells, noise, accumulations or deposits, and artificial light. Local authorities have a duty to investigate complaints and can serve abatement notices on those responsible.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Statutory nuisance',
    category: 'Environmental Awareness',
  },
  {
    id: 13,
    question: 'What is the primary purpose of an Environmental Policy within an organisation?',
    options: [
      "To record the detailed technical procedures that site operatives must follow when handling each individual waste stream",
      "To set out the organisation's commitment to environmental protection, compliance with legislation, and continual improvement",
      "To provide a legally binding guarantee to clients that the organisation will never cause any environmental pollution",
      "To list the specific environmental fines and penalties the organisation has incurred over the previous reporting year",
    ],
    correctAnswer: 1,
    explanation:
      "An environmental policy is a top-level statement of an organisation's commitment to environmental protection. Under ISO 14001, the policy must include commitments to comply with legal and other requirements, prevent pollution, and continually improve the environmental management system. It should be appropriate to the organisation's activities and provide a framework for setting environmental objectives.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Environmental policy',
    category: 'Environmental Awareness',
  },
  {
    id: 14,
    question: 'Which body is the principal environmental regulator in England?',
    options: [
      'Health and Safety Executive (HSE)',
      'Natural England',
      'Environment Agency (EA)',
      'Department for Environment, Food and Rural Affairs (Defra)',
    ],
    correctAnswer: 2,
    explanation:
      'The Environment Agency (EA) is the principal environmental regulator in England, responsible for regulating major industry, waste, water quality, and flooding. Defra is the government department that sets policy, but the EA is the operational regulator that issues permits, conducts inspections, and takes enforcement action. Natural England advises on the natural environment, while the HSE covers occupational health and safety.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Environment Agency',
    category: 'Environmental Awareness',
  },
  {
    id: 15,
    question: 'What three pillars are commonly used to describe sustainability?',
    options: [
      'Air, water, and soil',
      'Planning, construction, and demolition',
      'Reduce, reuse, and recycle',
      'Environmental, social, and economic',
    ],
    correctAnswer: 3,
    explanation:
      "The three pillars of sustainability are environmental, social, and economic — sometimes referred to as 'planet, people, and profit'. True sustainable development requires a balance across all three pillars. For example, an electrical installation project should minimise environmental impact (planet), ensure safe and fair working conditions (people), and remain commercially viable (profit).",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Three pillars of sustainability',
    category: 'Environmental Awareness',
  },
  {
    id: 16,
    question: "What does the term 'greenhouse effect' describe?",
    options: [
      "The trapping of heat in the Earth's atmosphere by greenhouse gases, which raises the planet's average temperature",
      "The thinning of the ozone layer caused by chlorofluorocarbons, which allows more ultraviolet radiation to reach the Earth's surface",
      "The reflection of sunlight back into space by greenhouse gases, which has a net cooling effect on the planet's surface",
      "The cooling of the upper atmosphere as greenhouse gases absorb and radiate heat away from the Earth into space",
    ],
    correctAnswer: 0,
    explanation:
      "The greenhouse effect is the natural process by which certain gases in the Earth's atmosphere (including carbon dioxide, methane, and water vapour) trap heat radiated from the Earth's surface, keeping the planet warm enough to sustain life. Human activities such as burning fossil fuels have enhanced this effect by increasing the concentration of greenhouse gases, leading to global warming and climate change.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Greenhouse effect',
    category: 'Environmental Awareness',
  },
  {
    id: 17,
    question:
      'What is the legal target year for the UK to achieve net zero greenhouse gas emissions?',
    options: [
      '2035',
      '2050',
      '2030',
      '2040',
    ],
    correctAnswer: 1,
    explanation:
      "The UK's legally binding target is to achieve net zero greenhouse gas emissions by 2050, as set out in the Climate Change Act 2008 (amended 2019). The UK was the first major economy to legislate for this target. Interim targets include a 68% reduction by 2030 and a 78% reduction by 2035, both relative to 1990 levels.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Net zero target',
    category: 'Environmental Awareness',
  },
  {
    id: 18,
    question:
      'Under the Climate Change Act 2008, which independent body advises the UK Government on emissions targets and reports on progress?',
    options: [
      'The Environment Agency (EA)',
      'The Department for Environment, Food and Rural Affairs (Defra)',
      'The Committee on Climate Change (CCC)',
      'The Office of Gas and Electricity Markets (Ofgem)',
    ],
    correctAnswer: 2,
    explanation:
      'The Climate Change Committee (CCC), originally named the Committee on Climate Change, is an independent statutory body established under the Climate Change Act 2008. It advises the UK and devolved governments on emissions targets and reports to Parliament on progress in reducing greenhouse gas emissions. Its recommendations have been instrumental in shaping UK climate policy, including the move to a net zero target.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Climate Change Committee',
    category: 'Environmental Awareness',
  },
  {
    id: 19,
    question:
      "Which UN Sustainable Development Goal specifically addresses 'Affordable and Clean Energy'?",
    options: [
      'SDG 5',
      'SDG 13',
      'SDG 11',
      'SDG 7',
    ],
    correctAnswer: 3,
    explanation:
      "SDG 7 is 'Affordable and Clean Energy', which aims to ensure access to affordable, reliable, sustainable, and modern energy for all. This goal is particularly relevant to electricians, as the transition to renewable energy sources, energy-efficient installations, and smart grid technologies are all essential for achieving SDG 7. SDG 13 addresses Climate Action, SDG 11 covers Sustainable Cities and Communities, and SDG 5 relates to Gender Equality.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'UN SDGs',
    category: 'Environmental Awareness',
  },
  {
    id: 20,
    question: "What is 'greenwashing'?",
    options: [
      'The practice of making misleading or unsubstantiated claims about the environmental benefits of a product, service, or company practice',
      'The use of green-coloured packaging and labelling to make products appear more natural and environmentally friendly to consumers',
      'The process of cleaning and treating contaminated water on site so that it can be safely discharged to a watercourse',
      'A voluntary scheme in which companies pay an independent body to verify and publicly certify their environmental claims',
    ],
    correctAnswer: 0,
    explanation:
      'Greenwashing is the practice of making misleading, exaggerated, or unsubstantiated claims about the environmental credentials of a product, service, or company. The Competition and Markets Authority (CMA) published its Green Claims Code in 2021 to help businesses comply with consumer protection law when making environmental claims. The CMA has taken enforcement action against companies found to be greenwashing.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Greenwashing',
    category: 'Environmental Awareness',
  },
  {
    id: 21,
    question: 'What is the purpose of a Construction Environmental Management Plan (CEMP)?',
    options: [
      'To record the final account of all materials purchased and waste disposal costs incurred during the construction phase',
      'To set out the environmental risks of a project and the measures to manage them throughout the construction phase',
      'To calculate the embodied and operational carbon of the completed building for the purposes of Building Regulations compliance',
      'To set out the commercial programme and sequencing of construction activities to keep the project on schedule',
    ],
    correctAnswer: 1,
    explanation:
      'A Construction Environmental Management Plan (CEMP) identifies the environmental risks associated with a construction project and sets out the management measures to mitigate them. CEMPs typically cover topics such as dust and air quality, noise and vibration, water management, waste, ecology, and traffic. They are often required as a condition of planning permission and are a key document for environmental compliance on site.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'CEMP',
    category: 'Environmental Awareness',
  },
  {
    id: 22,
    question: "Under UK law, what is the 'polluter pays' principle?",
    options: [
      'The principle that the cost of cleaning up pollution should be shared equally between the polluter, the landowner, and the taxpayer',
      'The principle that the government must compensate businesses for the cost of complying with new environmental regulations',
      'The person or organisation responsible for causing pollution bears the cost of managing it to prevent damage to human health or the environment',
      'The principle that any organisation discharging to a watercourse must pay an annual licence fee to the Environment Agency',
    ],
    correctAnswer: 2,
    explanation:
      "The 'polluter pays' principle is a fundamental concept in UK and EU environmental law. It means that the person or organisation responsible for causing pollution should bear the costs of managing it to prevent damage to human health or the environment. This principle is embedded in the Environmental Protection Act 1990, the Environmental Damage (Prevention and Remediation) Regulations 2009, and the Environment Act 2021.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Polluter pays principle',
    category: 'Environmental Awareness',
  },
  {
    id: 23,
    question: "What does 'embodied carbon' refer to in the construction industry?",
    options: [
      'The greenhouse gas emissions resulting from the energy used to heat, cool, and light a building throughout its operational lifetime',
      'The amount of carbon dioxide that timber and other natural building materials absorb and store within the structure of a building',
      'The total greenhouse gas emissions produced by the workers and machinery present on a construction site during the build phase',
      'The total greenhouse gas emissions associated with the manufacture, transport, installation, maintenance, and end-of-life disposal of building materials and components',
    ],
    correctAnswer: 3,
    explanation:
      "Embodied carbon refers to the total greenhouse gas emissions associated with the entire lifecycle of building materials and components — from raw material extraction, manufacturing, and transportation, through to installation, maintenance, and eventual demolition and disposal. It is distinct from operational carbon (the emissions from a building's energy use during its lifetime). Reducing embodied carbon is a major focus of sustainable construction practice.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Embodied carbon',
    category: 'Environmental Awareness',
  },
  {
    id: 24,
    question: "What is a 'lifecycle assessment' (LCA)?",
    options: [
      'A systematic analysis of the environmental impacts of a product or service throughout its entire life, from raw material extraction to disposal',
      'An estimate of how many years a building material or component will last before it needs to be repaired or replaced',
      'A financial appraisal of the total purchase, operating, and maintenance costs of a product over its expected service life',
      'An assessment of the health and safety risks posed to workers handling a material across the stages of construction',
    ],
    correctAnswer: 0,
    explanation:
      "A lifecycle assessment (LCA) is a systematic method for evaluating the environmental impacts of a product, process, or service throughout its entire life — from 'cradle to grave'. This includes raw material extraction, manufacturing, distribution, use, and end-of-life disposal or recycling. LCA is governed by ISO 14040 and ISO 14044 and is increasingly used in construction to compare the environmental performance of different materials and design options.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Lifecycle assessment',
    category: 'Environmental Awareness',
  },
  {
    id: 25,
    question: 'What is the primary greenhouse gas emitted by the burning of fossil fuels?',
    options: [
      'Methane (CH4)',
      'Carbon dioxide (CO2)',
      'Nitrous oxide (N2O)',
      'Ozone (O3)',
    ],
    correctAnswer: 1,
    explanation:
      'Carbon dioxide (CO2) is the primary greenhouse gas emitted from the combustion of fossil fuels such as coal, oil, and natural gas. While methane and nitrous oxide are also potent greenhouse gases, CO2 accounts for approximately 80% of UK greenhouse gas emissions. The construction sector contributes significantly through energy use, transport, and the manufacture of materials like cement and steel.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Greenhouse gases',
    category: 'Environmental Awareness',
  },
  {
    id: 26,
    question: 'What does the Environment Act 2021 require regarding single-use plastics?',
    options: [
      'It imposes an immediate, blanket ban on the manufacture and sale of all plastic products throughout the United Kingdom',
      'It requires retailers to charge a minimum 25p deposit on every single-use plastic item, refundable on return',
      'It introduces powers to ban or restrict specific single-use plastic items and create extended producer responsibility schemes',
      'It transfers responsibility for all plastic waste collection from local authorities directly to plastic manufacturers',
    ],
    correctAnswer: 2,
    explanation:
      'The Environment Act 2021 provides powers for the Secretary of State to ban or restrict the supply of specific single-use plastic items. It also establishes the framework for extended producer responsibility (EPR) schemes, which make producers responsible for the costs of managing their products at end of life. Bans on single-use plastic straws, stirrers, and cotton buds came into effect in England in October 2020 under related regulations.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Single-use plastics',
    category: 'Environmental Awareness',
  },
  {
    id: 27,
    question: "What is 'carbon offsetting'?",
    options: [
      'Reducing an organisation\'s own emissions to zero by switching entirely to renewable energy and electric vehicles',
      'Capturing carbon dioxide directly from an organisation\'s own chimneys and flues and storing it underground on site',
      'Trading surplus emission allowances with other organisations under the UK Emissions Trading Scheme to recover costs',
      'Compensating for greenhouse gas emissions by funding an equivalent carbon dioxide saving elsewhere, such as tree planting or renewable energy projects',
    ],
    correctAnswer: 3,
    explanation:
      "Carbon offsetting involves compensating for greenhouse gas emissions by funding projects that reduce or remove an equivalent amount of CO2 elsewhere. Examples include tree planting, renewable energy projects, and methane capture schemes. While offsetting is part of the net zero strategy, it should be used alongside — not instead of — direct emissions reductions. The UK Government's approach prioritises reducing emissions first, with offsetting for residual emissions only.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Carbon offsetting',
    category: 'Environmental Awareness',
  },
  {
    id: 28,
    question:
      'Which environmental assessment method is most commonly used to rate the sustainability of buildings in the UK?',
    options: [
      'BREEAM',
      'LEED',
      'Passivhaus',
      'WELL',
    ],
    correctAnswer: 0,
    explanation:
      "BREEAM (Building Research Establishment Environmental Assessment Method) is the world's leading and most widely used sustainability assessment method for buildings, infrastructure, and communities. Developed in the UK in 1990 by BRE, it assesses buildings against categories including energy, water, health, pollution, transport, materials, waste, ecology, and management. LEED is the American equivalent, Passivhaus is a design standard, and WELL focuses on health and wellbeing.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'BREEAM',
    category: 'Environmental Awareness',
  },
  {
    id: 29,
    question: 'What is the purpose of Environmental Product Declarations (EPDs)?',
    options: [
      'To certify that a product has been independently tested and guaranteed to be completely carbon neutral over its lifecycle',
      'To provide standardised, verified information about the environmental impact of a product throughout its lifecycle',
      'To confirm that a product complies with the relevant British Standard and is fit for its intended construction use',
      'To declare the recycled content of a product as a percentage so that buyers can claim recycling credits at end of life',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental Product Declarations (EPDs) provide standardised, independently verified data about the environmental impact of a product throughout its lifecycle, based on lifecycle assessment (LCA). They are governed by ISO 14025 and EN 15804 (for construction products). EPDs allow specifiers, designers, and contractors to compare the environmental performance of different products on a like-for-like basis, supporting sustainable procurement decisions.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'EPDs',
    category: 'Environmental Awareness',
  },
  {
    id: 30,
    question: "What is a 'Scope 1' greenhouse gas emission?",
    options: [
      'Indirect emissions from the generation of purchased electricity, heat, and steam consumed by the organisation',
      'Emissions arising in the organisation\'s wider value chain, such as purchased materials, business travel, and employee commuting',
      'Direct emissions from sources owned or controlled by the organisation, such as company vehicles and on-site fuel combustion',
      'Emissions from the manufacture and transport of the building materials and products the organisation purchases',
    ],
    correctAnswer: 2,
    explanation:
      'Scope 1 emissions are direct greenhouse gas emissions from sources owned or controlled by the organisation. Examples include fuel combustion in company vehicles, on-site generators, gas boilers, and fugitive emissions from refrigerants. Scope 2 covers indirect emissions from purchased electricity, heat, or steam. Scope 3 covers all other indirect emissions in the value chain, including supply chain, business travel, and employee commuting. This classification follows the GHG Protocol.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Scope 1 emissions',
    category: 'Environmental Awareness',
  },
  {
    id: 31,
    question: "What is the difference between 'Scope 2' and 'Scope 3' greenhouse gas emissions?",
    options: [
      'Scope 2 covers direct emissions from company vehicles and on-site combustion; Scope 3 covers purchased electricity and heat',
      'Scope 2 covers emissions from waste disposal; Scope 3 covers emissions from the organisation\'s own buildings and plant',
      'Scope 2 covers emissions in the upstream supply chain; Scope 3 covers emissions from the organisation\'s direct fuel use',
      'Scope 2 covers indirect emissions from purchased energy (electricity, heat, steam); Scope 3 covers all other indirect emissions in the value chain',
    ],
    correctAnswer: 3,
    explanation:
      "Under the GHG Protocol, Scope 2 emissions are indirect emissions arising from the generation of purchased electricity, heat, or steam consumed by the organisation. Scope 3 emissions cover all other indirect emissions occurring across the organisation's value chain, both upstream (e.g., purchased materials, transport) and downstream (e.g., product use, end-of-life disposal). For construction companies, Scope 3 typically represents the largest share of total emissions.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Scope 2 and 3 emissions',
    category: 'Environmental Awareness',
  },
  {
    id: 32,
    question: "What role does the 'precautionary principle' play in environmental decision-making?",
    options: [
      'It states that where there are threats of serious or irreversible environmental damage, lack of full scientific certainty shall not be used as a reason for postponing cost-effective measures to prevent degradation',
      'It states that no environmental protection measure should be taken unless there is full and conclusive scientific proof that harm will occur',
      'It states that developers must demonstrate a positive environmental benefit before any project can be granted planning permission',
      'It states that the costs of environmental protection must always be weighed against, and never exceed, the economic value of a development',
    ],
    correctAnswer: 0,
    explanation:
      'The precautionary principle states that where there are threats of serious or irreversible environmental damage, a lack of full scientific certainty should not be used as a reason for postponing cost-effective measures to prevent environmental degradation. It is enshrined in the Environment Act 2021 and underpins UK environmental policy. It means decision-makers should err on the side of caution when potential environmental harm is identified, even if the evidence is not conclusive.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Precautionary principle',
    category: 'Environmental Awareness',
  },
  {
    id: 33,
    question: "What is the primary purpose of the UK's Climate Change Levy (CCL)?",
    options: [
      'To tax domestic households on their gas and electricity use in order to fund national energy efficiency improvement schemes',
      'To encourage businesses to reduce energy consumption and greenhouse gas emissions by taxing energy supplies to business and public sector users',
      'To charge businesses a levy on every tonne of carbon dioxide they emit above their allocated annual emissions cap',
      'To provide grants to businesses that install renewable energy generation, funded by a levy on fossil fuel suppliers',
    ],
    correctAnswer: 1,
    explanation:
      'The Climate Change Levy (CCL) is a tax on energy supplies (electricity, natural gas, LPG, and solid fuels) delivered to business and public sector users in the UK. Its purpose is to incentivise energy efficiency and the reduction of greenhouse gas emissions. Businesses that enter into Climate Change Agreements (CCAs) with the Environment Agency can receive a discount on the CCL in return for meeting agreed energy efficiency or carbon reduction targets.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Climate Change Levy',
    category: 'Environmental Awareness',
  },
  {
    id: 34,
    question: "What does 'carbon literacy' mean?",
    options: [
      'The ability to read and interpret an organisation\'s annual carbon accounts and emissions reporting statements',
      'A formal qualification required by law before an individual can carry out a building\'s carbon footprint assessment',
      'An awareness of the carbon dioxide costs and impacts of everyday activities and the ability and motivation to reduce emissions',
      'The measurement of the total carbon dioxide emissions produced by an individual over the course of a single year',
    ],
    correctAnswer: 2,
    explanation:
      'Carbon literacy is defined as an awareness of the carbon dioxide costs and impacts of everyday activities, combined with the ability and motivation to reduce emissions on an individual, community, and organisational basis. The Carbon Literacy Project offers a certified training programme that helps individuals and organisations understand and reduce their carbon footprint. It is increasingly recognised in the construction industry as part of sustainability training.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Carbon literacy',
    category: 'Environmental Awareness',
  },
  {
    id: 35,
    question: 'What is the purpose of the UK Emissions Trading Scheme (UK ETS)?',
    options: [
      'To impose a fixed carbon tax on every tonne of greenhouse gas emitted by all businesses across the United Kingdom',
      'To require energy suppliers to source a minimum percentage of their electricity from renewable generation each year',
      'To provide tradable grants to households that install low-carbon heating and energy efficiency measures',
      'To set a cap on total greenhouse gas emissions from participating sectors, allowing those who emit less to sell allowances to higher emitters',
    ],
    correctAnswer: 3,
    explanation:
      "The UK Emissions Trading Scheme (UK ETS) replaced the UK's participation in the EU ETS after Brexit. It is a cap-and-trade system that sets an overall cap on the total amount of greenhouse gases that can be emitted by participants in covered sectors (primarily energy-intensive industries, power generation, and aviation). Organisations that emit less than their allocation can sell surplus allowances to those who exceed theirs, creating a financial incentive to reduce emissions.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'UK ETS',
    category: 'Environmental Awareness',
  },
  {
    id: 36,
    question: "What is 'environmental due diligence'?",
    options: [
      'The process of investigating and assessing the environmental risks and liabilities associated with a property, business, or transaction before proceeding',
      'The legal duty to obtain an environmental permit from the Environment Agency before commencing any construction works',
      'The ongoing monitoring of an organisation\'s environmental performance against the targets set in its environmental policy',
      'The process of cleaning up contaminated land to a standard suitable for its intended future use before development begins',
    ],
    correctAnswer: 0,
    explanation:
      'Environmental due diligence is the process of investigating and assessing the environmental risks and liabilities associated with a property, business, or transaction. It typically involves desk-based studies, site investigations, and environmental audits to identify issues such as contaminated land, asbestos, flood risk, and regulatory compliance. It is standard practice in property transactions, mergers, and major development projects.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Environmental due diligence',
    category: 'Environmental Awareness',
  },
  {
    id: 37,
    question: "What is the 'linear economy' model?",
    options: [
      "A methodology for evaluating the environmental impacts of a product or system across its entire life",
      "The traditional 'take, make, dispose' model in which resources are extracted, manufactured into products, used, and then discarded as waste",
      "A design approach that uses the building's form, fabric, and orientation to reduce energy demand for heating, cooling, and lighting without relying on mechanical systems",
      "An initial ecological survey that identifies habitats, potential for protected species, and ecological constraints on a site",
    ],
    correctAnswer: 1,
    explanation:
      "The linear economy follows a 'take, make, dispose' pattern: raw materials are extracted, manufactured into products, used by consumers, and then discarded as waste. This model is inherently unsustainable because it depletes finite resources and generates increasing volumes of waste. The circular economy is the alternative model that aims to eliminate waste and keep resources in use for as long as possible.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Linear economy',
    category: 'Environmental Awareness',
  },
  {
    id: 38,
    question: "What does 'Defra' stand for?",
    options: [
      'Department for Energy, Fuels and Regulatory Affairs',
      'Division of Environmental Frameworks and Regulations Act',
      'Department for Environment, Food and Rural Affairs',
      'Department for Ecology, Forestry and Resource Allocation',
    ],
    correctAnswer: 2,
    explanation:
      'Defra stands for the Department for Environment, Food and Rural Affairs. It is the UK Government department responsible for environmental protection, food production and standards, agriculture, fisheries, and rural communities. Defra sets environmental policy, which is then implemented and enforced by bodies such as the Environment Agency and Natural England.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Defra',
    category: 'Environmental Awareness',
  },
  {
    id: 39,
    question: "What is a 'carbon budget' in the context of UK climate legislation?",
    options: [
      'The annual amount of money the UK Government allocates to spend on climate change mitigation and adaptation projects',
      'The maximum amount of carbon dioxide a single organisation is permitted to emit before it must purchase emission allowances',
      'A voluntary target that individual companies set themselves for reducing their carbon footprint over a five-year period',
      'A cap on the total amount of greenhouse gases the UK can emit over a five-year period, set under the Climate Change Act 2008',
    ],
    correctAnswer: 3,
    explanation:
      'Carbon budgets are caps on the total amount of greenhouse gases that can be emitted in the UK over successive five-year periods. They are set under the Climate Change Act 2008 and act as stepping stones towards the 2050 net zero target. The UK is currently in its fourth carbon budget (2023-2027). Each budget is set at least 12 years in advance on the advice of the Climate Change Committee, giving businesses and industries time to plan their decarbonisation strategies.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Carbon budgets',
    category: 'Environmental Awareness',
  },
  {
    id: 40,
    question: "What is 'operational carbon' in the context of buildings?",
    options: [
      'The greenhouse gas emissions resulting from the energy used to operate a building during its lifetime, including heating, cooling, lighting, and equipment',
      'The greenhouse gas emissions associated with manufacturing, transporting, and installing a building\'s materials and components',
      'The greenhouse gas emissions generated by the construction plant and machinery during the building of a structure',
      'The greenhouse gas emissions released when a building is demolished and its materials are processed and disposed of',
    ],
    correctAnswer: 0,
    explanation:
      'Operational carbon refers to the greenhouse gas emissions resulting from the energy consumed to operate a building throughout its lifetime — including heating, cooling, ventilation, lighting, hot water, and the use of electrical equipment. It is distinct from embodied carbon (emissions from materials and construction). Reducing operational carbon is achieved through energy-efficient design, high-performance insulation, efficient heating systems, LED lighting, and renewable energy generation.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Operational carbon',
    category: 'Environmental Awareness',
  },

  // =======================================================================
  // WASTE MANAGEMENT — 40 questions (id 41-80)
  // ~14 basic, ~18 intermediate, ~8 advanced
  // =======================================================================
  {
    id: 41,
    question: 'What is the correct order of the waste hierarchy, from most to least preferred?',
    options: [
      'Recycle, Reduce, Reuse, Recover, Dispose',
      'Reduce, Reuse, Recycle, Recover, Dispose',
      'Dispose, Recover, Recycle, Reuse, Reduce',
      'Reuse, Reduce, Recycle, Dispose, Recover',
    ],
    correctAnswer: 1,
    explanation:
      'The waste hierarchy ranks waste management options from most to least environmentally preferred: Prevention (Reduce), Reuse, Recycle, Recovery (e.g., energy from waste), and Disposal (landfill). This hierarchy is enshrined in the Waste (England and Wales) Regulations 2011 and reflects EU Waste Framework Directive principles retained in UK law. All waste producers and handlers have a legal duty to apply the waste hierarchy.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Waste hierarchy',
    category: 'Waste Management',
  },
  {
    id: 42,
    question: "What is the 'duty of care' for waste under the Environmental Protection Act 1990?",
    options: [
      'A legal obligation on employers to protect the health and safety of their employees while they are handling waste at work',
      'A requirement that all waste must be disposed of at the nearest licensed landfill site to minimise transport emissions',
      'A legal obligation on anyone who produces, imports, carries, keeps, treats, or disposes of controlled waste to ensure it is managed properly and transferred only to authorised persons',
      'A duty on local authorities to provide free waste collection and recycling facilities to all households and businesses',
    ],
    correctAnswer: 2,
    explanation:
      "Section 34 of the Environmental Protection Act 1990 imposes a 'duty of care' on anyone who produces, imports, carries, keeps, treats, or disposes of controlled (non-agricultural, non-mining) waste. This includes ensuring waste is stored safely, transferred only to authorised persons, and accompanied by a written description (waste transfer note). Breach of the duty of care is a criminal offence carrying an unlimited fine.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Duty of care',
    category: 'Waste Management',
  },
  {
    id: 43,
    question: 'What document must accompany the transfer of non-hazardous waste between parties?',
    options: [
      'A consignment note',
      'A building regulations certificate',
      'An environmental impact assessment',
      'A waste transfer note',
    ],
    correctAnswer: 3,
    explanation:
      "A waste transfer note (WTN) must accompany every transfer of non-hazardous controlled waste. It must include a description of the waste, the quantity, the type of container, the SIC code of the producer, the waste carrier's licence number, and be signed by both parties. Waste transfer notes must be retained for at least two years. For hazardous waste, a consignment note is required instead.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Waste transfer notes',
    category: 'Waste Management',
  },
  {
    id: 44,
    question:
      'How long must a waste transfer note be retained by both the transferor and the transferee?',
    options: [
      '2 years',
      '1 year',
      '6 months',
      '5 years',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Environmental Protection (Duty of Care) Regulations 1991, waste transfer notes must be retained for a minimum of two years from the date of transfer. Both the person transferring the waste and the person receiving it must keep a copy. For hazardous waste consignment notes, the retention period is three years. Failure to retain these documents is a criminal offence.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Waste transfer note retention',
    category: 'Waste Management',
  },
  {
    id: 45,
    question: 'What type of document is required when transferring hazardous waste?',
    options: [
      'A waste transfer note',
      'A consignment note',
      'A delivery receipt',
      'A purchase order',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous waste must be accompanied by a consignment note when it is transferred. This is a legal requirement under the Hazardous Waste (England and Wales) Regulations 2005. The consignment note contains more detailed information than a standard waste transfer note, including the specific hazardous properties of the waste (e.g., toxic, flammable, corrosive) and its European Waste Catalogue (EWC) code. Consignment notes must be retained for at least three years.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Consignment notes',
    category: 'Waste Management',
  },
  {
    id: 46,
    question: 'How long must hazardous waste consignment notes be retained?',
    options: [
      '2 years',
      '6 years',
      '3 years',
      '1 year',
    ],
    correctAnswer: 2,
    explanation:
      'Hazardous waste consignment notes must be retained for a minimum of three years from the date on which the waste is transferred. This is one year longer than the two-year retention period for non-hazardous waste transfer notes. The longer retention period reflects the greater environmental and health risks associated with hazardous waste and the need for a robust audit trail.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Consignment note retention',
    category: 'Waste Management',
  },
  {
    id: 47,
    question: "What does 'WEEE' stand for in waste management?",
    options: [
      'Workplace Environmental and Ecological Enforcement',
      'Water and Energy Efficiency Evaluation',
      'Waste Elimination and Environmental Engineering',
      'Waste Electrical and Electronic Equipment',
    ],
    correctAnswer: 3,
    explanation:
      'WEEE stands for Waste Electrical and Electronic Equipment. The WEEE Regulations 2013 implement the EU WEEE Directive in the UK and place obligations on producers, distributors, and recyclers of electrical and electronic equipment to ensure proper collection, treatment, and recycling. Electricians routinely handle WEEE when removing old light fittings, consumer units, cables, and other equipment during rewires and upgrades.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'WEEE',
    category: 'Waste Management',
  },
  {
    id: 48,
    question: "What is 'fly-tipping'?",
    options: [
      'The illegal dumping of waste on land that has no licence to accept it',
      'The legal disposal of household waste at a registered household waste recycling centre',
      'The transfer of waste to a registered carrier without completing a waste transfer note',
      'The burning of waste in the open air on a construction site without an exemption',
    ],
    correctAnswer: 0,
    explanation:
      "Fly-tipping is the illegal deposit of waste on land that does not have a licence or permit to accept it. It is a criminal offence under Section 33 of the Environmental Protection Act 1990, carrying penalties of up to five years' imprisonment and an unlimited fine. Local authorities and the Environment Agency can also issue fixed penalty notices of up to £50,000 for fly-tipping. Construction and demolition waste is among the most commonly fly-tipped categories.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Fly-tipping',
    category: 'Waste Management',
  },
  {
    id: 49,
    question: 'What is a Site Waste Management Plan (SWMP)?',
    options: [
      'A risk assessment that identifies the health and safety hazards associated with handling waste on a construction site',
      'A document that sets out how waste will be managed on a construction site, including waste types, quantities, and disposal routes',
      'A legal agreement between a contractor and a licensed waste carrier setting out the price for waste collection',
      'A register recording the consignment notes for all hazardous waste produced and transferred from a construction site',
    ],
    correctAnswer: 1,
    explanation:
      'A Site Waste Management Plan (SWMP) is a document that details how construction waste will be managed throughout a project. Although the mandatory SWMP requirement under the Site Waste Management Plans Regulations 2008 was revoked in 2013, SWMPs remain industry best practice and are frequently required by clients, principal contractors, and under BREEAM or other sustainability schemes. A good SWMP identifies expected waste types and quantities, sets waste reduction targets, and records actual waste arisings and disposal routes.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'SWMPs',
    category: 'Waste Management',
  },
  {
    id: 50,
    question: "What is 'landfill tax' designed to achieve?",
    options: [
      'Raise revenue to fund the construction of new landfill sites and waste incineration facilities across the UK',
      'Charge waste producers a fee for every consignment note issued when transferring waste to a landfill operator',
      'Discourage the disposal of waste to landfill by increasing costs, thereby encouraging waste reduction, reuse, and recycling',
      'Compensate local communities living near landfill sites for the loss of amenity and increased traffic',
    ],
    correctAnswer: 2,
    explanation:
      'Landfill tax is a UK environmental tax charged on every tonne of waste disposed of at a landfill site. Its purpose is to make landfill disposal more expensive relative to other waste management options, thereby encouraging waste prevention, reuse, recycling, and energy recovery. As of 2024, the standard rate of landfill tax is £103.70 per tonne for active waste and £3.25 per tonne for inert waste. It has been effective in driving significant reductions in the amount of waste sent to landfill.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Landfill tax',
    category: 'Waste Management',
  },
  {
    id: 51,
    question: 'What are European Waste Catalogue (EWC) codes used for?',
    options: [
      'Pricing waste collection services across Europe',
      'Rating the environmental performance of waste companies',
      'Tracking the movement of goods across European borders',
      'Classifying and identifying waste types using a standardised six-digit coding system',
    ],
    correctAnswer: 3,
    explanation:
      'European Waste Catalogue (EWC) codes are a standardised system of six-digit codes used to classify and identify different types of waste. They are used on waste transfer notes and consignment notes to describe the waste being transferred. Despite Brexit, the UK continues to use the EWC coding system. For example, EWC code 17 04 11 covers cables (construction and demolition waste containing metals), which is a common waste stream for electricians.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'EWC codes',
    category: 'Waste Management',
  },
  {
    id: 52,
    question:
      'Which waste carrier registration is required to transport controlled waste in England?',
    options: [
      "A waste carrier's licence (registration) issued by the Environment Agency",
      "A hazardous waste consignment note issued for each individual load that is transported",
      "An environmental permit issued by the local authority for the vehicle used to transport waste",
      "A waste transfer note signed by the producer authorising the carrier to remove the waste",
    ],
    correctAnswer: 0,
    explanation:
      'Anyone who transports controlled waste in England must be registered as a waste carrier with the Environment Agency under the Controlled Waste (Registration of Carriers and Seizure of Vehicles) Regulations 1991 (as amended). There are two tiers: upper tier (for those who transport waste as a regular part of their business) and lower tier (for those who only transport their own waste). Failure to register is a criminal offence.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Waste carrier registration',
    category: 'Waste Management',
  },
  {
    id: 53,
    question: "What is a 'waste exemption'?",
    options: [
      'A release from the duty of care for waste producers who transfer waste only to a registered carrier',
      'A registration that allows certain low-risk waste activities to be carried out without a full environmental permit',
      'A waiver of landfill tax granted for inert waste that cannot be recycled or recovered by any other means',
      'An exclusion that allows household waste to be classified as non-controlled and disposed of without documentation',
    ],
    correctAnswer: 1,
    explanation:
      'A waste exemption is a registration (not a permit) that allows certain low-risk waste operations to be carried out without the need for a full environmental permit. Examples include storing waste at the place of production, burning waste in the open, and using waste for construction. Exemptions are registered with the Environment Agency and are subject to conditions and limits. They are free to register and last for three years.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Waste exemptions',
    category: 'Waste Management',
  },
  {
    id: 54,
    question:
      'What is the penalty for fly-tipping under Section 33 of the Environmental Protection Act 1990?',
    options: [
      "A fixed penalty notice of £80, with no possibility of imprisonment",
      "A formal written warning for a first offence, with prosecution only for repeat offenders",
      "Up to 5 years' imprisonment and/or an unlimited fine",
      "A maximum fine of £5,000 with no power for the courts to impose a custodial sentence",
    ],
    correctAnswer: 2,
    explanation:
      "Fly-tipping is a criminal offence under Section 33 of the Environmental Protection Act 1990. On conviction in the Crown Court, offenders face up to five years' imprisonment, an unlimited fine, or both. Magistrates' courts can impose up to 12 months' imprisonment and/or an unlimited fine. The courts can also order the forfeiture of any vehicle used in the commission of the offence. Fixed penalty notices of up to £1,000 can be issued for small-scale fly-tipping.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Fly-tipping penalties',
    category: 'Waste Management',
  },
  {
    id: 55,
    question: "What does the term 'controlled waste' mean?",
    options: [
      'Only hazardous waste that must be transferred under a consignment note rather than a waste transfer note',
      'Waste that may only be transported by a carrier holding an upper-tier waste carrier registration',
      'Agricultural, mining, and radioactive waste regulated separately from household and commercial waste',
      'Household, industrial, and commercial waste as defined by the Environmental Protection Act 1990',
    ],
    correctAnswer: 3,
    explanation:
      'Controlled waste is defined in Part II of the Environmental Protection Act 1990 as household, industrial, and commercial waste. It is the main category of waste regulated under the Act and subject to the duty of care, waste transfer note requirements, and licensed disposal. Agricultural waste, mining waste, and radioactive waste are excluded from the definition and are regulated under separate legislation.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Controlled waste',
    category: 'Waste Management',
  },
  {
    id: 56,
    question: 'What types of waste are commonly classified as hazardous on a construction site?',
    options: [
      'Asbestos, lead paint, used solvents, fluorescent tubes, and some adhesives',
      'Clean brick, concrete, timber off-cuts, and uncontaminated soil and stones',
      'Cardboard packaging, plastic sheeting, metal off-cuts, and plasterboard',
      'Surplus cable, copper pipe, steel reinforcement, and aluminium trunking',
    ],
    correctAnswer: 0,
    explanation:
      'Common hazardous wastes encountered on construction sites include asbestos-containing materials, lead-based paints, used solvents and thinners, fluorescent tubes and discharge lamps (which contain mercury), oil and fuel contaminated materials, adhesives containing volatile organic compounds, and batteries. These wastes exhibit one or more hazardous properties (e.g., toxic, flammable, corrosive, carcinogenic) and must be segregated, stored, and disposed of separately from non-hazardous waste using consignment notes.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Hazardous waste on site',
    category: 'Waste Management',
  },
  {
    id: 57,
    question:
      'Under the WEEE Regulations, what obligation do distributors of electrical equipment have when a customer buys a new like-for-like product?',
    options: [
      'They must charge the customer a recycling levy on the new product to fund the disposal of the old one',
      'They must offer to take back the old equipment free of charge on a like-for-like basis',
      'They must arrange for the old equipment to be collected directly from the customer\'s home within 14 days',
      'They must replace the old equipment with a refurbished unit rather than recycling it as waste',
    ],
    correctAnswer: 1,
    explanation:
      "Under the WEEE Regulations 2013, distributors (retailers) of electrical and electronic equipment must offer to take back old equipment free of charge on a like-for-like basis when a customer purchases a new equivalent product. This is known as 'distributor take-back'. Alternatively, distributors can join the Distributor Takeback Scheme (DTS) and contribute to the funding of local authority WEEE collection services instead.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'WEEE distributor obligations',
    category: 'Waste Management',
  },
  {
    id: 58,
    question: 'What is the purpose of waste segregation on a construction site?',
    options: [
      'To keep waste contained within designated areas so that it does not create a trip hazard or obstruct access routes',
      'To reduce the total volume of waste produced on site by compacting different materials together before removal',
      'To separate different types of waste so they can be reused, recycled, or disposed of appropriately, maximising resource recovery and reducing landfill',
      'To ensure each waste skip is filled to capacity before it is collected, reducing the number of collections required',
    ],
    correctAnswer: 2,
    explanation:
      'Waste segregation involves separating different types of waste at source (e.g., metals, timber, plasterboard, plastics, hazardous waste) so that each stream can be managed in the most environmentally beneficial way. Proper segregation maximises recycling and recovery rates, reduces contamination of recyclable materials, ensures hazardous waste is handled safely, and minimises the amount of waste sent to landfill — reducing both environmental impact and disposal costs.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Waste segregation',
    category: 'Waste Management',
  },
  {
    id: 59,
    question: "What is 'extended producer responsibility' (EPR)?",
    options: [
      'A policy principle that requires consumers to pay an additional deposit on products that is refunded when they are recycled',
      'A scheme that extends the manufacturer\'s warranty obligations so that products can be repaired rather than discarded',
      'A duty on retailers to take back any product a customer no longer wants, regardless of where it was purchased',
      'A policy principle that makes producers responsible for the environmental impact of their products throughout the product lifecycle, including end-of-life management',
    ],
    correctAnswer: 3,
    explanation:
      'Extended Producer Responsibility (EPR) is a policy approach that makes producers financially and/or physically responsible for the environmental impact of their products throughout the entire lifecycle, including collection, recycling, and disposal at end of life. In the UK, EPR schemes exist for packaging, WEEE, batteries, and end-of-life vehicles. The Environment Act 2021 extends EPR powers significantly, with a new packaging EPR scheme phased in from 2024.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Extended producer responsibility',
    category: 'Waste Management',
  },
  {
    id: 60,
    question:
      "What does the term 'duty of care' require of a construction company producing waste?",
    options: [
      'That they take all reasonable steps to prevent the unauthorised deposit, treatment, or disposal of waste; store waste safely and securely; transfer waste only to authorised persons; and provide an accurate written description of the waste',
      'That they dispose of all of their own waste at a licensed landfill site rather than transferring it to a third party',
      'That they obtain an environmental permit from the Environment Agency before producing any controlled waste on site',
      'That they reduce the total quantity of waste they produce by a fixed percentage each year and report the figures to Defra',
    ],
    correctAnswer: 0,
    explanation:
      'The duty of care under Section 34 of the Environmental Protection Act 1990 requires waste producers to take all reasonable steps to: prevent the escape of waste from their control; ensure waste is transferred only to an authorised person (a registered waste carrier or to a permitted/exempt facility); provide an accurate description of the waste on the waste transfer note; and keep the waste safe and secure until it is collected. These obligations continue until the waste is received by an authorised person.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Duty of care requirements',
    category: 'Waste Management',
  },
  {
    id: 61,
    question:
      'Which regulation specifically governs the handling and disposal of hazardous waste in England and Wales?',
    options: [
      'The Control of Substances Hazardous to Health Regulations 2002',
      'The Hazardous Waste (England and Wales) Regulations 2005',
      'The Health and Safety at Work etc Act 1974',
      'The Dangerous Substances and Explosive Atmospheres Regulations 2002',
    ],
    correctAnswer: 1,
    explanation:
      'The Hazardous Waste (England and Wales) Regulations 2005 specifically govern the production, storage, movement, and disposal of hazardous waste. They require the use of consignment notes, registration of premises that produce more than 500kg of hazardous waste per year, and the proper classification of waste using hazardous properties (HP codes). COSHH covers substances hazardous to health in the workplace, which is a related but separate regulatory regime.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Hazardous Waste Regulations',
    category: 'Waste Management',
  },
  {
    id: 62,
    question: "What is the 'waste hierarchy' a legal requirement under?",
    options: [
      'The Building Regulations 2010',
      'The Construction (Design and Management) Regulations 2015',
      'The Waste (England and Wales) Regulations 2011',
      'The Electricity at Work Regulations 1989',
    ],
    correctAnswer: 2,
    explanation:
      'The waste hierarchy is a legal requirement under the Waste (England and Wales) Regulations 2011, which transposed the EU Waste Framework Directive (2008/98/EC) into English and Welsh law. Regulation 12 requires anyone involved in waste management to apply the waste hierarchy — prevention, preparing for reuse, recycling, other recovery, and disposal — as a priority order. Departure from the hierarchy is permitted only where justified by lifecycle assessment or where compliance is not technically feasible.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Waste hierarchy legislation',
    category: 'Waste Management',
  },
  {
    id: 63,
    question:
      "What is 'plasterboard' waste and why does it require special handling on construction sites?",
    options: [
      'It is classified as hazardous waste because the gypsum it contains is toxic and carcinogenic to those who handle it',
      'It contains asbestos fibres that are released when the board is cut, so it must be removed by a licensed contractor',
      'It is too heavy and bulky to be accepted at standard landfill sites, so it must always be broken up before disposal',
      'It contains gypsum which, when landfilled with biodegradable waste, can produce toxic hydrogen sulphide gas, so it must be segregated and sent to specialist facilities',
    ],
    correctAnswer: 3,
    explanation:
      'Plasterboard contains gypsum (calcium sulphate), which when landfilled with biodegradable waste in anaerobic conditions can react to produce hydrogen sulphide (H2S), a toxic and foul-smelling gas. Since 2009, plasterboard waste has been banned from disposal in non-hazardous landfill sites that also accept biodegradable waste. It must be segregated on site and sent to specialist recycling or disposal facilities. Many plasterboard manufacturers operate take-back recycling schemes.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Plasterboard waste',
    category: 'Waste Management',
  },
  {
    id: 64,
    question: 'What is the standard EWC code prefix for construction and demolition waste?',
    options: [
      '17',
      '16',
      '15',
      '20',
    ],
    correctAnswer: 0,
    explanation:
      "Chapter 17 of the European Waste Catalogue covers 'Construction and demolition wastes (including excavated soil from contaminated sites)'. EWC codes beginning with 17 include subcategories such as 17 01 (concrete, bricks, tiles), 17 02 (wood, glass, plastic), 17 03 (bituminous mixtures and tar), 17 04 (metals), 17 05 (soil and stones), 17 06 (insulation materials), 17 08 (gypsum-based materials), and 17 09 (mixed construction waste). Codes marked with an asterisk (*) indicate hazardous waste.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'EWC codes for construction waste',
    category: 'Waste Management',
  },
  {
    id: 65,
    question: 'What information must be included on a waste transfer note?',
    options: [
      "Only the description and quantity of the waste, with no requirement to record the parties or the carrier's details",
      "A description of the waste, the quantity, the type of container, the date of transfer, the SIC code of the waste producer, details of both parties, and the waste carrier's registration number",
      "The estimated landfill tax payable on the waste and the name of the landfill site that will receive it",
      "The specific hazardous properties of the waste and its premises notification number issued by the Environment Agency",
    ],
    correctAnswer: 1,
    explanation:
      "A waste transfer note must include: a description of the waste (including the EWC code); the quantity and type of container; the time and date of transfer; the name, address, and signature of both the transferor and transferee; the SIC (Standard Industrial Classification) code of the waste producer; the waste carrier's registration number; and the permit or exemption number of the receiving facility. All of this information is required by the Environmental Protection (Duty of Care) Regulations 1991.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Waste transfer note contents',
    category: 'Waste Management',
  },
  {
    id: 66,
    question:
      'What is the maximum fixed penalty notice that can be issued by a local authority for fly-tipping?',
    options: [
      '£200',
      '£500',
      '£1,000',
      '£5,000',
    ],
    correctAnswer: 2,
    explanation:
      'Local authorities in England can issue fixed penalty notices (FPNs) of up to £1,000 for fly-tipping offences under the Unauthorised Deposit of Waste (Fixed Penalties) Regulations 2016. The minimum fixed penalty is £150, with a default of £400. FPNs are an alternative to prosecution for lower-level offences. More serious cases can be prosecuted in court, where penalties can include imprisonment and unlimited fines.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Fly-tipping fixed penalties',
    category: 'Waste Management',
  },
  {
    id: 67,
    question:
      'What responsibility does the principal contractor have for waste management under CDM 2015?',
    options: [
      'The principal contractor must personally hold the waste carrier registration for every load of waste leaving the site',
      'The principal contractor has no waste responsibilities under CDM, as these fall solely on the individual subcontractors',
      'The principal contractor must dispose of all site waste at landfill and is not permitted to recycle or recover any materials',
      'The principal contractor must ensure that waste is managed in accordance with the waste hierarchy, that waste is properly segregated and stored on site, and that waste removal arrangements are in place',
    ],
    correctAnswer: 3,
    explanation:
      'Under the Construction (Design and Management) Regulations 2015, the principal contractor has a duty to plan, manage, and monitor the construction phase, which includes waste management. While CDM does not explicitly detail waste management requirements, the principal contractor must ensure the site complies with all relevant environmental legislation, including the waste hierarchy, duty of care, and proper waste segregation and storage. The Construction Phase Plan should address waste management arrangements.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'CDM waste responsibilities',
    category: 'Waste Management',
  },
  {
    id: 68,
    question: "What is 'recovery' in the context of the waste hierarchy?",
    options: [
      'Any waste operation whose principal result is that waste serves a useful purpose by replacing other materials, including energy recovery through incineration',
      'The reprocessing of waste materials into new products of the same type, such as turning waste glass back into glass',
      'The retrieval of waste that has been illegally dumped so that it can be returned to a licensed disposal facility',
      'The collection and separation of different waste materials at source so that each can be managed appropriately',
    ],
    correctAnswer: 0,
    explanation:
      "In the waste hierarchy, 'recovery' refers to any operation whose principal result is that waste serves a useful purpose by replacing other materials that would otherwise have been used. The most common example is energy recovery — incinerating waste to generate electricity or heat (energy from waste, or EfW). Other examples include using waste materials as backfill or in road construction. Recovery sits above disposal (landfill) but below recycling in the hierarchy.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Waste recovery',
    category: 'Waste Management',
  },
  {
    id: 69,
    question:
      'What is the standard UK landfill tax rate per tonne for non-inert (active) waste as of 2024?',
    options: [
      '£3.25 per tonne',
      '£103.70 per tonne',
      '£50.00 per tonne',
      '£200.00 per tonne',
    ],
    correctAnswer: 1,
    explanation:
      "As of April 2024, the standard rate of UK landfill tax is £103.70 per tonne for non-inert (active) waste. The lower rate for inert waste (such as clean bricks, concrete, and soil) is £3.25 per tonne. The standard rate has increased steadily since landfill tax was introduced in 1996 at £7 per tonne, reflecting the government's policy of making landfill disposal progressively more expensive to drive waste up the hierarchy towards prevention, reuse, and recycling.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Landfill tax rate',
    category: 'Waste Management',
  },
  {
    id: 70,
    question:
      'What colour-coded waste bin is typically used for general waste (non-recyclable) on a UK construction site?',
    options: [
      'Blue',
      'Green',
      'Black',
      'Yellow',
    ],
    correctAnswer: 2,
    explanation:
      'On UK construction sites, black bins or containers are typically used for general (non-recyclable) waste destined for landfill or energy recovery. While there is no single mandatory colour-coding standard for construction site waste, common industry practice uses: black for general waste, blue for paper and cardboard, green for glass, yellow for metals and cans, and red or purple for hazardous waste. Clear signage with waste descriptions and pictures is essential alongside colour-coding.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Waste bin colour coding',
    category: 'Waste Management',
  },
  {
    id: 71,
    question: 'What is the primary risk associated with mixing hazardous and non-hazardous waste?',
    options: [
      'The non-hazardous waste becomes exempt from the duty of care, so it can be transferred without a waste transfer note',
      'The hazardous component is automatically neutralised by the larger volume of non-hazardous waste it is mixed with',
      'The combined load qualifies for the lower rate of landfill tax because it is no longer classed as active waste',
      'The entire waste load becomes classified as hazardous, increasing disposal costs and regulatory requirements, and potentially causing environmental contamination or chemical reactions',
    ],
    correctAnswer: 3,
    explanation:
      'Mixing hazardous waste with non-hazardous waste is prohibited under the Hazardous Waste Regulations 2005 unless authorised by an environmental permit. When hazardous waste is mixed with non-hazardous waste, the entire load is typically classified as hazardous, significantly increasing disposal costs and regulatory requirements. Mixing can also cause dangerous chemical reactions, produce toxic gases, contaminate recyclable materials, and result in environmental pollution.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Mixing hazardous waste',
    category: 'Waste Management',
  },
  {
    id: 72,
    question: 'What happens to fluorescent tubes at the end of their life?',
    options: [
      'They are classified as hazardous waste because they contain mercury, and must be collected, stored, and recycled through specialist WEEE recycling channels',
      'They are classified as inert waste and can be disposed of with general construction and demolition rubble',
      'They can be crushed on site and the broken glass recycled with other clean glass waste streams',
      'They may be placed in the general waste skip provided they are wrapped to prevent breakage in transit',
    ],
    correctAnswer: 0,
    explanation:
      'Fluorescent tubes are classified as hazardous waste (EWC code 20 01 21*) because they contain small amounts of mercury vapour. They must be handled carefully to avoid breakage, stored in designated sealed containers, and disposed of through specialist WEEE recycling channels. Specialist recyclers recover the mercury, aluminium end caps, glass, and phosphor powder for recycling. Electricians regularly handle spent fluorescent tubes during lighting upgrades and must ensure proper disposal.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Fluorescent tube disposal',
    category: 'Waste Management',
  },
  {
    id: 73,
    question: "What is 'waste minimisation' and why is it the top priority in the waste hierarchy?",
    options: [
      'It means recycling as much waste as possible; it is the top priority because recycling recovers valuable materials for reuse',
      'It means preventing waste from being produced in the first place; it is the top priority because it avoids the environmental impacts of resource extraction, manufacturing, transport, and disposal entirely',
      'It means compacting waste to reduce its volume; it is the top priority because it lowers the number of skip collections needed',
      'It means sending waste to energy-from-waste plants; it is the top priority because it recovers energy instead of using landfill',
    ],
    correctAnswer: 1,
    explanation:
      'Waste minimisation (prevention) sits at the top of the waste hierarchy because it avoids the environmental impact of waste entirely — no resources are extracted, no energy is used in manufacturing, no transport emissions are generated, and no disposal impacts occur. On construction sites, waste minimisation measures include accurate ordering of materials, using prefabricated components, designing out waste, protecting stored materials from weather damage, and reusing formwork and temporary works.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Waste minimisation',
    category: 'Waste Management',
  },
  {
    id: 74,
    question: "What is 'designing out waste' in construction?",
    options: [
      'Removing the requirement to record waste on a Site Waste Management Plan once a project reaches the design stage',
      'Designing a dedicated waste compound on the site layout drawings so that skips and containers are kept tidy',
      'Using design decisions to reduce or eliminate waste generation during construction, including standardising dimensions, specifying reclaimed materials, and designing for disassembly',
      'Specifying that all surplus materials be returned to the supplier rather than being treated as construction waste',
    ],
    correctAnswer: 2,
    explanation:
      'Designing out waste is a principle in sustainable construction where design decisions are made to reduce or eliminate waste generation. Examples include: standardising dimensions to reduce off-cuts; specifying standard lengths of cable, conduit, and trunking; using modular or prefabricated components; designing for disassembly so materials can be reused; specifying reclaimed or recycled materials; and avoiding over-specification. WRAP (Waste and Resources Action Programme) has published guidance on designing out waste for different construction trades.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Designing out waste',
    category: 'Waste Management',
  },
  {
    id: 75,
    question: "What is a 'hazardous property' code (HP code)?",
    options: [
      'A six-digit European Waste Catalogue code used to identify the type and origin of a waste stream',
      'A premises notification number issued by the Environment Agency to producers of hazardous waste',
      'A rating that indicates how many years a hazardous waste consignment note must be retained for audit',
      'A classification code assigned to waste based on its hazardous characteristics (e.g., HP1 Explosive, HP3 Flammable, HP5 Toxic, HP14 Ecotoxic) used to determine waste handling requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Hazardous Property (HP) codes are used to classify waste based on the specific hazardous characteristics it exhibits. There are 15 HP codes: HP1 (Explosive), HP2 (Oxidising), HP3 (Flammable), HP4 (Irritant), HP5 (Specific Target Organ Toxicity/Aspiration Toxicity), HP6 (Acute Toxicity), HP7 (Carcinogenic), HP8 (Corrosive), HP9 (Infectious), HP10 (Toxic for Reproduction), HP11 (Mutagenic), HP12 (Release of Acute Toxic Gas), HP13 (Sensitising), HP14 (Ecotoxic), and HP15 (Yielding Another Substance with Hazardous Properties).',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'HP codes',
    category: 'Waste Management',
  },
  {
    id: 76,
    question: "What does 'WRAP' stand for in the context of waste and resources?",
    options: [
      'Waste and Resources Action Programme',
      'Waste Reduction and Prevention',
      'Workplace Recycling Action Plan',
      'Waste Recovery and Processing',
    ],
    correctAnswer: 0,
    explanation:
      'WRAP stands for the Waste and Resources Action Programme. It is a UK charity that works with businesses, individuals, and communities to achieve a circular economy through waste reduction, resource efficiency, and recycling. WRAP has produced extensive guidance for the construction industry, including tools for measuring and benchmarking construction waste, and the Courtauld Commitment and Plastic Pact initiatives.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'WRAP',
    category: 'Waste Management',
  },
  {
    id: 77,
    question: "What is 'inert waste' on a construction site?",
    options: [
      'Waste that decomposes naturally over time without producing any harmful gases or leachate — such as timber, paper, and cardboard',
      'Waste that does not undergo any significant physical, chemical, or biological transformations, will not dissolve or burn, and does not adversely affect other materials it comes into contact with — such as clean bricks, concrete, and tiles',
      'Waste that has been treated and rendered harmless so that it no longer needs to be transferred under a consignment note',
      'Waste that exhibits no hazardous properties but must still be incinerated rather than sent to landfill — such as plastics and rubber',
    ],
    correctAnswer: 1,
    explanation:
      'Inert waste is waste that does not undergo any significant physical, chemical, or biological transformations. It will not dissolve, burn, or react physically or chemically, and will not adversely affect other substances it comes into contact with in a way likely to cause environmental pollution or harm to health. Common examples on construction sites include clean concrete, bricks, tiles, glass, and uncontaminated soil and stones. Inert waste attracts the lower rate of landfill tax (£3.25/tonne).',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Inert waste',
    category: 'Waste Management',
  },
  {
    id: 78,
    question:
      'Under the Hazardous Waste Regulations 2005, what threshold triggers the requirement for premises to notify the Environment Agency as a hazardous waste producer?',
    options: [
      'Any amount of hazardous waste',
      'More than 200kg per year',
      'More than 500kg per year',
      'More than 1,000kg per year',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Hazardous Waste (England and Wales) Regulations 2005, premises that produce or hold more than 500kg of hazardous waste in any 12-month period must notify the Environment Agency and obtain a premises notification number. This number must be included on all consignment notes. Premises producing less than 500kg per year are exempt from notification but must still comply with all other hazardous waste requirements, including the use of consignment notes.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Hazardous waste notification threshold',
    category: 'Waste Management',
  },
  {
    id: 79,
    question: "What is 'waste pre-treatment' and when is it required before landfill disposal?",
    options: [
      'Compacting and baling unsorted waste to reduce its volume before it is transported to the landfill site',
      'Applying a chemical sealant to the surface of a landfill cell before any waste is deposited into it',
      'Obtaining written confirmation from the landfill operator that they hold a permit to accept the waste',
      'Processing waste by sorting, recycling, or treating it before disposal to landfill, as required by the Landfill (England and Wales) Regulations 2002 to ensure only waste that cannot be recovered is landfilled',
    ],
    correctAnswer: 3,
    explanation:
      'The Landfill (England and Wales) Regulations 2002 require that waste must be pre-treated before being deposited in a landfill. Pre-treatment includes physical, thermal, chemical, or biological processes that change the characteristics of the waste to reduce its volume, reduce its hazardous nature, or facilitate its handling. In practice, this means waste must be sorted and recyclable or recoverable materials removed before the residual waste can be landfilled. Simply compacting or baling unsorted waste does not constitute adequate pre-treatment.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Waste pre-treatment',
    category: 'Waste Management',
  },
  {
    id: 80,
    question:
      'What legal obligation does a waste producer have if they suspect their waste carrier may be operating illegally?',
    options: [
      "They must take all reasonable steps to check the carrier's registration, and if they knowingly or carelessly transfer waste to an unauthorised person, they commit an offence under the duty of care",
      "They have no further obligation once the waste has physically left their premises, as responsibility passes entirely to the carrier",
      "They must report the carrier to the police but may continue to use them until the police complete their investigation",
      "They are only liable if the waste is later found to have been fly-tipped; otherwise no offence is committed",
    ],
    correctAnswer: 0,
    explanation:
      "Under the duty of care (Section 34, EPA 1990), waste producers must take all reasonable steps to ensure waste is transferred only to an authorised person. This means checking the carrier's waste carrier registration on the Environment Agency's public register before handing over waste. If a waste producer knowingly or carelessly transfers waste to an unauthorised person, they commit a criminal offence and can be prosecuted. The maximum penalty is an unlimited fine. The waste producer remains responsible for their waste even after it has left their premises.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Checking waste carriers',
    category: 'Waste Management',
  },

  // =======================================================================
  // ENERGY & RESOURCE EFFICIENCY — first 20 questions (id 81-100)
  // ~7 basic, ~9 intermediate, ~4 advanced
  // =======================================================================
  {
    id: 81,
    question:
      'What is the most significant source of energy consumption on a typical construction site?',
    options: [
      'Water used for dust suppression and wheel washing at the site entrance',
      'Temporary heating, lighting, and power for tools and equipment',
      'The manufacture of the materials delivered to site for installation',
      'The disposal of construction and demolition waste to landfill',
    ],
    correctAnswer: 1,
    explanation:
      'Temporary heating, lighting, and power for tools and equipment are typically the most significant sources of energy consumption on a construction site. This includes diesel generators, temporary electric heaters, site lighting towers, power tools, cranes, hoists, and concrete pumps. Reducing energy consumption on site involves using energy-efficient equipment, turning off equipment when not in use, optimising site layout to minimise transport, and connecting to mains power early to avoid reliance on diesel generators.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Energy on site',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 82,
    question: "What is a 'carbon footprint' of a construction project?",
    options: [
      'The total energy in kilowatt-hours consumed by site plant and equipment during the construction phase only',
      'The physical area of land disturbed by the project, used to calculate the biodiversity net gain required',
      'The total greenhouse gas emissions associated with all activities and materials used throughout the project lifecycle, measured in CO2 equivalent',
      'The proportion of the project budget allocated to carbon offsetting and renewable energy measures',
    ],
    correctAnswer: 2,
    explanation:
      'The carbon footprint of a construction project is the total greenhouse gas emissions (measured in tonnes of CO2 equivalent) associated with all activities and materials across the project lifecycle. This includes embodied carbon in materials, transport emissions, on-site energy use, waste disposal, and the operational carbon of the completed building. Measuring the carbon footprint is essential for identifying reduction opportunities and demonstrating compliance with sustainability targets.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Project carbon footprint',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 83,
    question:
      "What is the key difference between 'embodied carbon' and 'operational carbon' in a building?",
    options: [
      'Embodied carbon relates to the energy used to run the building; operational carbon relates to the emissions from manufacturing its materials',
      'Embodied carbon is measured in kilowatt-hours, whereas operational carbon is measured in tonnes of carbon dioxide equivalent',
      'Embodied carbon applies only to domestic buildings, whereas operational carbon applies only to non-domestic buildings',
      'Embodied carbon relates to the emissions from manufacturing, transporting, and constructing materials; operational carbon relates to emissions from the energy used to run the building during its lifetime',
    ],
    correctAnswer: 3,
    explanation:
      'Embodied carbon encompasses all greenhouse gas emissions associated with the manufacture, transport, installation, maintenance, and end-of-life disposal of building materials and components. Operational carbon is the emissions from the energy consumed to operate the building throughout its lifetime — heating, cooling, lighting, hot water, and appliances. As buildings become more energy-efficient, the proportion of total lifecycle carbon attributable to embodied carbon is increasing, making material selection and construction methods increasingly important.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Embodied vs operational carbon',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 84,
    question: 'Which renewable energy technology converts sunlight directly into electricity?',
    options: [
      'Photovoltaic (PV) panels',
      'Wind turbines',
      'Ground source heat pumps',
      'Solar thermal panels',
    ],
    correctAnswer: 0,
    explanation:
      'Photovoltaic (PV) panels convert sunlight directly into electricity using semiconductor materials (typically silicon). When photons from sunlight strike the PV cells, they knock electrons free from atoms, creating an electrical current. Solar thermal panels, by contrast, use sunlight to heat water or fluid. Wind turbines convert kinetic energy from wind into electricity, and ground source heat pumps extract heat from the ground. Electricians play a key role in installing and connecting PV systems.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Photovoltaic panels',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 85,
    question: 'What does an Energy Performance Certificate (EPC) show?',
    options: [
      'A certificate confirming that a building\'s electrical installation has been tested and is safe to use',
      'The energy efficiency rating of a building on a scale from A (most efficient) to G (least efficient), along with recommendations for improvement',
      'The total amount of energy a building is permitted to use each year before it must pay the Climate Change Levy',
      'A measure of the embodied carbon in a building\'s materials, expressed as tonnes of carbon dioxide equivalent',
    ],
    correctAnswer: 1,
    explanation:
      "An Energy Performance Certificate (EPC) rates the energy efficiency of a building on a scale from A (most efficient) to G (least efficient). It includes information about the building's typical energy use and carbon dioxide emissions, as well as recommendations for reducing energy use and costs. EPCs are legally required when buildings are built, sold, or rented, and are valid for 10 years. The Minimum Energy Efficiency Standards (MEES) require rental properties to have a minimum EPC rating of E.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'EPC',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 86,
    question:
      'What is the benefit of using LED lighting instead of traditional incandescent or halogen lamps?',
    options: [
      'LEDs produce a warmer, more natural light than incandescent lamps but use roughly the same amount of energy',
      'LEDs contain mercury vapour, which allows them to start instantly and run at a lower operating temperature',
      'LEDs use up to 80-90% less energy than incandescent lamps, last significantly longer, and produce less waste heat',
      'LEDs are cheaper to buy than incandescent lamps but need replacing far more frequently because of their short life',
    ],
    correctAnswer: 2,
    explanation:
      'LED (Light Emitting Diode) lighting is significantly more energy-efficient than traditional incandescent and halogen lamps, using up to 80-90% less energy for equivalent light output. LEDs also have a much longer operational life — typically 25,000-50,000 hours compared to 1,000-2,000 hours for incandescent lamps. They produce far less waste heat, reducing cooling loads in buildings. While LEDs have a higher initial cost, the energy savings and reduced replacement frequency make them significantly more cost-effective over their lifetime.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'LED lighting',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 87,
    question: "What is a 'heat pump' and how does it contribute to energy efficiency?",
    options: [
      'A device that burns natural gas more efficiently than a conventional boiler, achieving efficiencies of around 90%',
      'An electric immersion heater that stores hot water in an insulated cylinder for use during peak demand periods',
      'A device that pumps warm air around a building from a central electric heater to provide even space heating',
      'A device that transfers heat from a low-temperature source (air, ground, or water) to a higher-temperature output for space heating and hot water, achieving efficiencies of 250-400%',
    ],
    correctAnswer: 3,
    explanation:
      "A heat pump is a device that transfers heat from a lower-temperature source (air, ground, or water) to a higher-temperature output for space heating and hot water. It works on the same principle as a refrigerator but in reverse. Heat pumps achieve efficiencies (Coefficient of Performance, or COP) of 250-400%, meaning they deliver 2.5-4 units of heat energy for every 1 unit of electricity consumed. They are a key technology for decarbonising heating in the UK and are central to the Government's heat pump target of 600,000 installations per year by 2028.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Heat pumps',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 88,
    question: "What is 'water conservation' on a construction site?",
    options: [
      'The practice of reducing water consumption on site through efficient use, recycling, and rainwater harvesting, to minimise waste and environmental impact',
      'The practice of treating all wastewater on site to drinking-water standard before discharging it to a watercourse',
      'The practice of collecting surface water runoff in attenuation tanks to prevent flooding of neighbouring land',
      'The practice of pumping groundwater out of excavations and discharging it directly to the public sewer',
    ],
    correctAnswer: 0,
    explanation:
      'Water conservation on a construction site involves reducing water consumption through measures such as: using water-efficient equipment (e.g., trigger nozzles on hoses); fixing leaks promptly; recycling water where possible (e.g., wheel wash water); harvesting rainwater for dust suppression; using drip irrigation; and monitoring water usage to identify waste. Water conservation reduces both the environmental impact and the cost of water supply and wastewater disposal on site.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Water conservation',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 89,
    question: "What are 'sustainable materials' in the context of construction?",
    options: [
      'Materials that are the cheapest available option, as lower cost always indicates a lower environmental impact',
      'Materials that have been sourced, manufactured, and can be used and disposed of in a way that minimises environmental impact, including materials that are renewable, recycled, locally sourced, or have low embodied carbon',
      'Materials that are imported from overseas because they meet stricter environmental standards than UK-made products',
      'Materials that are guaranteed to last the entire life of the building and therefore never need to be recycled',
    ],
    correctAnswer: 1,
    explanation:
      'Sustainable materials are those that minimise environmental impact throughout their lifecycle. Key characteristics include: being sourced from renewable resources (e.g., FSC-certified timber); having a high recycled content; being locally sourced to reduce transport emissions; having low embodied carbon; being durable and long-lasting; being reusable or recyclable at end of life; and being non-toxic. Examples include recycled steel, reclaimed timber, low-carbon concrete, and sustainably sourced copper cable.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Sustainable materials',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 90,
    question: 'What is the purpose of Part L of the Building Regulations?',
    options: [
      'It sets requirements for fire safety, including means of escape, fire detection, and fire resistance of structural elements',
      'It sets requirements for ventilation, including the provision of fresh air and the extraction of moisture from buildings',
      'It sets requirements for the conservation of fuel and power in buildings, including energy efficiency standards for heating, lighting, and insulation',
      'It sets requirements for drainage and waste disposal, including foul water, surface water, and rainwater systems',
    ],
    correctAnswer: 2,
    explanation:
      'Part L of the Building Regulations (Conservation of Fuel and Power) sets minimum energy efficiency standards for new and existing buildings in England. It covers the thermal performance of the building fabric (insulation), heating and cooling systems, lighting efficiency, and renewable energy provision. Part L was significantly updated in June 2022, introducing a 31% reduction in carbon emissions for new homes and a 27% reduction for new non-domestic buildings compared to the previous standards.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Part L Building Regulations',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 91,
    question:
      "What does the acronym 'SAP' stand for in the context of building energy performance?",
    options: [
      'Sustainability Action Programme',
      'Site Assessment Plan',
      'Structural Analysis Protocol',
      'Standard Assessment Procedure',
    ],
    correctAnswer: 3,
    explanation:
      "SAP stands for Standard Assessment Procedure. It is the UK Government's methodology for assessing and comparing the energy and environmental performance of dwellings. SAP calculates a rating from 1 to 100+ based on a building's energy efficiency characteristics, including heating systems, insulation, ventilation, and lighting. SAP ratings are used to produce Energy Performance Certificates (EPCs) and to demonstrate compliance with Part L of the Building Regulations.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'SAP rating',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 92,
    question: "What is 'passive design' in building construction?",
    options: [
      "A design approach that uses the building's form, fabric, and orientation to reduce energy demand for heating, cooling, and lighting without relying on mechanical systems",
      "A design approach that relies on highly efficient mechanical heating, cooling, and ventilation systems to control the internal environment",
      "A design approach that generates all of a building's energy on site using solar panels, wind turbines, and heat pumps",
      "A design approach that prioritises low-cost materials and rapid construction over long-term energy performance",
    ],
    correctAnswer: 0,
    explanation:
      "Passive design is an approach to building design that uses the building's orientation, form, and fabric to reduce energy demand without relying on active mechanical systems. Key principles include: optimising orientation for solar gain; maximising natural ventilation; using high levels of insulation and airtightness; incorporating thermal mass to regulate temperature; and maximising natural daylighting. The Passivhaus standard is the most rigorous passive design certification, achieving up to 90% reduction in heating demand.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Passive design',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 93,
    question: "What is 'embodied energy'?",
    options: [
      'The amount of energy a material can store and release as heat, helping to regulate the temperature inside a building',
      'The total amount of energy required to extract, process, manufacture, transport, and install a building material or product',
      'The energy consumed to heat, cool, and light a building over the course of its operational lifetime',
      'The energy that can be recovered by incinerating a material at the end of its useful life in the building',
    ],
    correctAnswer: 1,
    explanation:
      'Embodied energy is the total energy consumed throughout the lifecycle of a material or product, from raw material extraction and processing, through manufacturing and transport, to installation on site. It is closely related to embodied carbon but measured in energy units (MJ or kWh) rather than CO2e. Materials with high embodied energy include aluminium, steel, and cement. Selecting materials with lower embodied energy helps reduce the overall environmental impact of a construction project.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Embodied energy',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 94,
    question: "What is 'ISO 50001' and how does it relate to energy management?",
    options: [
      'An international standard that specifies requirements for an environmental management system, helping organisations manage their environmental impacts',
      'An international standard that specifies requirements for a quality management system, helping organisations meet customer expectations',
      'An international standard that specifies requirements for establishing, implementing, and improving an energy management system, helping organisations systematically reduce energy consumption',
      'An international standard that specifies requirements for an occupational health and safety management system in the workplace',
    ],
    correctAnswer: 2,
    explanation:
      "ISO 50001 is the international standard for Energy Management Systems (EnMS). It provides a framework for organisations to develop policies for more efficient energy use, set targets and objectives, use data to make decisions about energy consumption, measure results, review effectiveness, and continually improve energy performance. Like ISO 14001 for environmental management, ISO 50001 follows the Plan-Do-Check-Act (PDCA) cycle. Certification demonstrates an organisation's commitment to energy efficiency.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'ISO 50001',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 95,
    question: "What role do 'smart meters' play in energy efficiency?",
    options: [
      'They automatically switch off appliances when a household exceeds its allocated daily energy allowance',
      'They generate a small amount of electricity from the building\'s mains supply to offset standby power use',
      'They rate the energy efficiency of a building on a scale from A to G in the same way as an EPC',
      'They provide real-time information on energy consumption, helping users understand and reduce their energy use, and enabling accurate billing without estimated readings',
    ],
    correctAnswer: 3,
    explanation:
      'Smart meters provide real-time information on energy consumption (both gas and electricity) to the consumer via an in-home display, and send accurate meter readings automatically to the energy supplier. This eliminates estimated bills and helps consumers understand when and how they use energy, enabling them to identify wasteful habits and reduce consumption. Smart meters also support the development of smart grids and time-of-use tariffs that incentivise shifting energy use to off-peak periods.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Smart meters',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 96,
    question: "What is the 'fabric first' approach to building energy efficiency?",
    options: [
      "Prioritising improvements to the building's thermal envelope (insulation, airtightness, glazing) before adding renewable energy technologies or complex mechanical systems",
      "Installing renewable energy technologies such as solar panels and heat pumps before improving the building's insulation",
      "Specifying natural fabric materials such as wool and hemp insulation in preference to synthetic alternatives",
      "Designing the building's structural frame and cladding before considering its energy performance or services",
    ],
    correctAnswer: 0,
    explanation:
      "The 'fabric first' approach prioritises reducing energy demand through the building's thermal envelope — high-performance insulation, excellent airtightness, high-quality windows and doors, and minimising thermal bridging — before considering bolt-on technologies like solar panels or heat pumps. The rationale is that reducing energy demand at source is more cost-effective, durable, and reliable than generating or recovering energy to compensate for a poorly performing building fabric.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Fabric first approach',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 97,
    question: "What is 'whole-life carbon' assessment in construction?",
    options: [
      'An assessment that accounts only for the operational carbon emissions of a building during its in-use phase',
      'A comprehensive assessment that accounts for all greenhouse gas emissions over the entire life of a building, including embodied carbon (materials and construction), operational carbon (energy in use), and end-of-life carbon (demolition and disposal)',
      'An assessment that measures only the embodied carbon in a building\'s materials at the point of construction',
      'An assessment that calculates the carbon savings achieved by a building compared with a notional reference building',
    ],
    correctAnswer: 1,
    explanation:
      "Whole-life carbon assessment evaluates the total greenhouse gas emissions associated with a building over its entire life, from cradle to grave. This includes: embodied carbon (modules A1-A5 covering raw materials, manufacturing, transport, and construction); operational carbon (module B covering energy use, maintenance, and refurbishment); and end-of-life carbon (modules C1-C4 covering demolition, transport, waste processing, and disposal). Module D accounts for benefits beyond the building's life, such as material reuse. The RICS Professional Statement on Whole Life Carbon Assessment provides the methodology.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Whole-life carbon',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 98,
    question: "What is 'greywater recycling'?",
    options: [
      'Collecting rainwater from roofs and gutters and storing it for reuse in toilet flushing and garden irrigation',
      'Collecting and treating foul wastewater from toilets so that it can be reused for drinking and washing',
      'Collecting and treating wastewater from baths, showers, washbasins, and washing machines for reuse in non-potable applications such as toilet flushing and garden irrigation',
      'Treating contaminated surface water runoff from a construction site before it is discharged to a watercourse',
    ],
    correctAnswer: 2,
    explanation:
      'Greywater recycling involves collecting wastewater from baths, showers, washbasins, and washing machines — which is relatively lightly contaminated — and treating it for reuse in non-potable applications such as toilet flushing, garden irrigation, and washing machines. This can reduce mains water consumption by up to 30-40% in domestic buildings. Greywater systems must comply with the Water Supply (Water Fittings) Regulations 1999 and relevant building regulations to prevent cross-contamination of the potable water supply.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Greywater recycling',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 99,
    question:
      'What is the Minimum Energy Efficiency Standard (MEES) for rental properties in England and Wales?',
    options: [
      'All new-build homes must achieve a minimum EPC rating of A; developers cannot sell properties rated B or lower',
      'All rental properties must achieve a minimum EPC rating of C; landlords cannot grant tenancies for properties rated D to G',
      'All commercial properties must achieve a minimum EPC rating of B; owners cannot occupy properties rated C or lower',
      'All rental properties must achieve a minimum EPC rating of E; landlords cannot grant new tenancies for properties rated F or G',
    ],
    correctAnswer: 3,
    explanation:
      'The Minimum Energy Efficiency Standards (MEES), introduced by the Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015, require that privately rented domestic and non-domestic properties in England and Wales achieve a minimum Energy Performance Certificate (EPC) rating of E. Since April 2018 for domestic and April 2023 for non-domestic properties, landlords cannot grant new tenancies or continue existing tenancies for properties rated F or G unless a valid exemption is registered. The Government has consulted on raising the minimum to C for new tenancies.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'MEES',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 100,
    question: "What is 'demand-side response' (DSR) in energy management?",
    options: [
      'Adjusting the timing or level of electricity consumption in response to price signals, grid conditions, or other incentives, to reduce peak demand and support grid stability',
      'Increasing electricity generation at power stations to match a sudden rise in consumer demand during peak periods',
      'Supplying surplus renewable electricity back to the grid from domestic solar panels and battery storage systems',
      'Charging consumers a higher unit rate for electricity used during periods of peak national demand on the grid',
    ],
    correctAnswer: 0,
    explanation:
      'Demand-side response (DSR) involves adjusting electricity consumption patterns in response to signals from the grid operator, energy supplier, or automated systems. This can include shifting non-essential loads (such as EV charging, water heating, and HVAC) to off-peak times, reducing consumption during peak demand periods, or providing flexibility services to the National Grid. DSR helps balance supply and demand, reduces the need for expensive peaking power plants, and supports the integration of intermittent renewable energy sources. Smart meters and building energy management systems (BEMS) are key enablers of DSR.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Demand-side response',
    category: 'Energy & Resource Efficiency',
  },

  {
    id: 101,
    question: 'What does PAS 2080 provide a framework for managing?',
    options: [
      'Workplace health and safety',
      'Carbon in buildings and infrastructure',
      'Water usage in construction',
      'Noise pollution on construction sites',
    ],
    correctAnswer: 1,
    explanation:
      'PAS 2080 is a publicly available specification published by the British Standards Institution (BSI) that provides a framework for managing whole life carbon in buildings and infrastructure. It establishes principles, roles, and processes to help organisations reduce carbon across the full lifecycle of built assets.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'PAS 2080',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 102,
    question: 'What is the primary purpose of an Environmental Product Declaration (EPD)?',
    options: [
      'To certify that a product is completely carbon neutral',
      'To replace the need for a construction phase plan',
      "To provide verified environmental data about a product's lifecycle impacts",
      'To guarantee a product meets Building Regulations',
    ],
    correctAnswer: 2,
    explanation:
      "An Environmental Product Declaration (EPD) is a standardised, third-party verified document that communicates transparent and comparable information about a product's environmental impact throughout its lifecycle. EPDs are prepared in accordance with ISO 14025 and EN 15804 and cover impacts such as global warming potential, ozone depletion, and resource depletion.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Environmental Product Declarations',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 103,
    question:
      'Which standard governs the preparation of Environmental Product Declarations for construction products in Europe?',
    options: [
      'PAS 2035',
      'ISO 9001',
      'BS 7671',
      'EN 15804',
    ],
    correctAnswer: 3,
    explanation:
      'EN 15804 is the European standard that provides core product category rules for Type III environmental declarations (EPDs) for construction products and services. It ensures that EPDs are prepared consistently and can be compared across different manufacturers and product types.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'EN 15804',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 104,
    question: "What does 'whole life carbon' refer to in the context of a building?",
    options: [
      'The total carbon emissions from material extraction through to demolition and disposal',
      'The carbon emissions from the energy used to operate the building, excluding its materials',
      'The carbon emissions associated only with the construction phase of the building',
      'The carbon emissions saved by recycling the building\'s materials at the end of its life',
    ],
    correctAnswer: 0,
    explanation:
      "Whole life carbon encompasses the total greenhouse gas emissions associated with a building across its entire lifecycle. This includes embodied carbon (material extraction, manufacturing, transport, construction, maintenance, and end-of-life) plus operational carbon (energy used for heating, cooling, lighting, and other services during the building's use).",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Whole life carbon',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 105,
    question:
      'What are the lifecycle stages A1 to A3 commonly referred to in whole life carbon assessments?',
    options: [
      'Construction site transport, installation, and commissioning of the product',
      'Raw material supply, transport to factory, and manufacturing',
      'Operational energy use, water use, and maintenance of the product',
      'Demolition, transport to waste processing, and final disposal',
    ],
    correctAnswer: 1,
    explanation:
      "In the lifecycle modules defined by EN 15978, stages A1 to A3 cover the 'product stage': A1 is raw material supply, A2 is transport to the manufacturing facility, and A3 is the manufacturing process itself. These stages are sometimes called the 'cradle to gate' assessment and are the minimum scope reported in most EPDs.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Lifecycle stages',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 106,
    question: 'What is GGBS and why is it used as a partial cement replacement?',
    options: [
      'Green graded base stone — it enhances drainage performance',
      'Glass-graded building sand — it improves thermal insulation',
      'Ground granulated blast-furnace slag — it reduces the embodied carbon of concrete',
      'Galvanised grouted binding steel — it increases tensile strength',
    ],
    correctAnswer: 2,
    explanation:
      'GGBS (ground granulated blast-furnace slag) is a by-product of the iron-making process. When used as a partial replacement for Portland cement in concrete, it significantly reduces the embodied carbon of the concrete mix — typically by 40-70% depending on the replacement ratio. GGBS also improves durability and resistance to sulphate attack.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'GGBS',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 107,
    question: 'What does CLT stand for in sustainable construction?',
    options: [
      'Certified Low Thermal',
      'Concrete Lightweight Technology',
      'Carbon Lifecycle Testing',
      'Cross-laminated timber',
    ],
    correctAnswer: 3,
    explanation:
      "CLT stands for cross-laminated timber. It is an engineered wood product made by gluing layers of solid-sawn lumber together at right angles. CLT sequesters carbon during the tree's growth, has lower embodied carbon than concrete or steel alternatives, and can be used for walls, floors, and roofs in multi-storey buildings.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Cross-laminated timber',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 108,
    question: 'What does FSC certification guarantee about a timber product?',
    options: [
      'That it comes from responsibly managed forests meeting strict environmental and social standards',
      'That it has been treated to resist rot and insect attack for the lifetime of the building',
      'That it has the lowest embodied carbon of any structural material available on the market',
      'That it has been grown within the UK to minimise the carbon emissions from transport',
    ],
    correctAnswer: 0,
    explanation:
      'The Forest Stewardship Council (FSC) is an international certification scheme that ensures timber and timber products come from forests managed in an environmentally appropriate, socially beneficial, and economically viable manner. FSC chain-of-custody certification tracks the product from forest to consumer.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'FSC certification',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 109,
    question: 'What is the PEFC and how does it relate to FSC?',
    options: [
      'It is the UK Government body that issues felling licences and regulates forestry operations',
      'It is an alternative international forest certification scheme that endorses national certification programmes',
      'It is a stricter version of FSC certification that applies only to tropical hardwood timber',
      'It is a UK certification scheme that has replaced FSC for all timber sold within Great Britain',
    ],
    correctAnswer: 1,
    explanation:
      "The Programme for the Endorsement of Forest Certification (PEFC) is the world's largest forest certification system. Unlike FSC, which sets its own standards, PEFC works by endorsing national forest certification schemes that meet its sustainability benchmarks. Both FSC and PEFC are recognised as credible proof of sustainable sourcing.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'PEFC certification',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 110,
    question: 'What is Life Cycle Assessment (LCA)?',
    options: [
      'An assessment of how long a building component will last before replacement',
      "A financial appraisal of maintenance costs over a building's lifespan",
      'A methodology for evaluating the environmental impacts of a product or system across its entire life',
      'A health and safety risk assessment for the construction phase',
    ],
    correctAnswer: 2,
    explanation:
      "Life Cycle Assessment (LCA) is a systematic methodology for evaluating the environmental impacts associated with all stages of a product's life — from raw material extraction, through manufacturing and use, to end-of-life disposal or recycling. It is governed by ISO 14040 and ISO 14044 and considers impacts such as global warming potential, acidification, and resource depletion.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Life Cycle Assessment',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 111,
    question: 'Which ISO standard defines the principles and framework for Life Cycle Assessment?',
    options: [
      'ISO 9001',
      'ISO 14001',
      'ISO 45001',
      'ISO 14040',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 14040 defines the principles and framework for conducting a Life Cycle Assessment. It outlines the four phases of LCA: goal and scope definition, life cycle inventory analysis, life cycle impact assessment, and interpretation. ISO 14044 provides the detailed requirements and guidelines for carrying out each phase.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'ISO 14040',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 112,
    question:
      'In PAS 2080, which role is responsible for setting the carbon reduction strategy at the programme level?',
    options: [
      'The asset owner or manager',
      'The site operative',
      'The subcontractor',
      'The materials supplier',
    ],
    correctAnswer: 0,
    explanation:
      'Under PAS 2080, the asset owner or manager is responsible for establishing the overarching carbon management strategy and setting carbon reduction targets at the programme and portfolio level. The framework emphasises that leadership from the asset owner is critical because decisions made at the earliest stages have the greatest influence on whole life carbon outcomes.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'PAS 2080 roles',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 113,
    question: 'What is the difference between embodied carbon and operational carbon?',
    options: [
      "Embodied carbon relates to the energy used during the building's life; operational carbon relates to the materials and construction",
      "Embodied carbon relates to the materials and construction; operational carbon relates to energy used during the building's life",
      "Embodied carbon applies only to the structural frame; operational carbon applies only to the building services",
      "Embodied carbon is offset by tree planting; operational carbon is offset by purchasing renewable electricity",
    ],
    correctAnswer: 1,
    explanation:
      "Embodied carbon refers to the greenhouse gas emissions associated with the materials and construction processes — including extraction, manufacturing, transport, installation, maintenance, and end-of-life. Operational carbon refers to the emissions from the energy consumed during the building's operational life — such as heating, cooling, lighting, and ventilation. As buildings become more energy efficient, embodied carbon represents an increasing proportion of whole life carbon.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Embodied vs operational carbon',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 114,
    question: "What lifecycle module does 'stage B6' represent in a whole life carbon assessment?",
    options: [
      'Construction and installation',
      'Demolition',
      'Operational energy use',
      'Raw material extraction',
    ],
    correctAnswer: 2,
    explanation:
      'In the lifecycle modules defined by EN 15978, stage B6 represents operational energy use — the energy consumed for heating, cooling, ventilation, hot water, lighting, and other building services during the use phase. Stage B7 covers operational water use. Together, B6 and B7 represent the key operational impacts of a building.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Lifecycle modules',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 115,
    question: 'Which UK body publishes PAS 2080?',
    options: [
      'The Health and Safety Executive',
      'The Construction Industry Training Board',
      'The Environment Agency',
      'The British Standards Institution (BSI)',
    ],
    correctAnswer: 3,
    explanation:
      'PAS 2080 is published by the British Standards Institution (BSI). A PAS (Publicly Available Specification) is a fast-track standardisation document that responds to an urgent market need. PAS 2080 was developed with input from the Green Construction Board and infrastructure industry leaders to provide a consistent approach to managing carbon in infrastructure.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'PAS 2080 publisher',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 116,
    question:
      'What percentage of Portland cement can typically be replaced with GGBS in a standard concrete mix?',
    options: [
      'Up to 70% or more',
      'Up to 25%',
      'Up to 10%',
      'Up to 5%',
    ],
    correctAnswer: 0,
    explanation:
      'GGBS can replace up to 70% or more of the Portland cement in a concrete mix, depending on the application and required performance characteristics. BS 8500 permits GGBS replacement levels of up to 80% for certain exposure classes. Higher replacement levels result in greater carbon savings but may affect early-age strength gain and setting times.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'GGBS replacement levels',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 117,
    question:
      'Which lifecycle module covers end-of-life demolition and deconstruction in a whole life carbon assessment?',
    options: [
      'Module A5',
      'Module C1',
      'Module B4',
      'Module D',
    ],
    correctAnswer: 1,
    explanation:
      'Module C1 covers demolition and deconstruction in the end-of-life stage. The full end-of-life stage comprises: C1 (demolition/deconstruction), C2 (transport to waste processing), C3 (waste processing for reuse, recovery, or recycling), and C4 (disposal). Module D covers benefits and loads beyond the system boundary, such as energy recovery or recycled material credits.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'End-of-life modules',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 118,
    question: "What is 'Module D' in a whole life carbon assessment?",
    options: [
      'The product stage, covering raw material supply, transport, and manufacturing',
      'The construction stage, covering transport to site and the installation process',
      'Benefits and loads beyond the system boundary, such as recycling credits',
      'The use stage, covering operational energy and water consumption',
    ],
    correctAnswer: 2,
    explanation:
      "Module D in EN 15978 captures the potential benefits and loads beyond the system boundary. This includes credits for material recycling, energy recovery from waste, and reuse of components after the building's end of life. Module D is reported separately because these benefits occur outside the building's own lifecycle and depend on future market conditions and technologies.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Module D',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 119,
    question:
      'How does cross-laminated timber (CLT) contribute to carbon reduction compared to concrete or steel framing?',
    options: [
      'CLT is always cheaper, which reduces financial carbon costs',
      'CLT generates more waste, which increases recycling opportunities',
      'CLT has no environmental benefit; it is chosen only for aesthetic reasons',
      'CLT sequesters carbon during tree growth and has lower embodied carbon than concrete or steel',
    ],
    correctAnswer: 3,
    explanation:
      'Trees absorb CO2 as they grow, and this carbon remains locked within the timber product for the life of the building — a process known as carbon sequestration. Additionally, manufacturing CLT requires significantly less energy than producing concrete or steel, resulting in lower embodied carbon. When sourced from sustainably managed forests (FSC or PEFC certified), CLT is considered one of the most sustainable structural materials available.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'CLT carbon benefits',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 120,
    question: 'What are the four phases of a Life Cycle Assessment as defined by ISO 14040?',
    options: [
      'Goal and scope definition, inventory analysis, impact assessment, and interpretation',
      'Design, procurement, installation, and commissioning',
      'Planning, construction, operation, and demolition',
      'Extraction, manufacturing, distribution, and disposal',
    ],
    correctAnswer: 0,
    explanation:
      'ISO 14040 defines the four phases of LCA as: (1) goal and scope definition — setting the purpose, boundaries, and functional unit; (2) life cycle inventory analysis (LCI) — quantifying inputs and outputs; (3) life cycle impact assessment (LCIA) — evaluating the significance of potential environmental impacts; and (4) interpretation — drawing conclusions and making recommendations based on the findings.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'LCA phases',
    category: 'Energy & Resource Efficiency',
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
    question: 'What does PM10 refer to in the context of air quality?',
    options: [
      'Particulate matter with a diameter of 10 millimetres or less',
      'Particulate matter with a diameter of 10 micrometres or less',
      'Pollution measurement taken at 10-metre intervals',
      'A 10-point pollution monitoring scale',
    ],
    correctAnswer: 1,
    explanation:
      'PM10 refers to particulate matter with an aerodynamic diameter of 10 micrometres (0.01mm) or less. These fine particles can be inhaled into the lungs and are a significant concern for human health. Construction activities such as demolition, earthworks, and cutting are major sources of PM10 on development sites.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'PM10',
    category: 'Pollution Prevention',
  },
  {
    id: 122,
    question: 'What is the difference between PM10 and PM2.5?',
    options: [
      'PM2.5 particles are larger than PM10 and are filtered out by the nose before reaching the lungs',
      'PM10 measures gaseous pollutants while PM2.5 measures only solid particulate matter in the air',
      'PM2.5 particles are smaller (2.5 micrometres or less) and can penetrate deeper into the lungs than PM10',
      'PM2.5 refers to indoor air pollution while PM10 refers to outdoor air pollution on construction sites',
    ],
    correctAnswer: 2,
    explanation:
      'PM2.5 refers to particulate matter with an aerodynamic diameter of 2.5 micrometres or less — significantly smaller than PM10. Because of their tiny size, PM2.5 particles can penetrate deep into the lungs and even enter the bloodstream, posing greater health risks including cardiovascular and respiratory disease. PM10 includes PM2.5 plus coarser particles up to 10 micrometres.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'PM10 vs PM2.5',
    category: 'Pollution Prevention',
  },
  {
    id: 123,
    question:
      'Which British Standard provides guidance on noise and vibration control on construction and open sites?',
    options: [
      'BS 8110',
      'BS 6399',
      'BS 7671',
      'BS 5228',
    ],
    correctAnswer: 3,
    explanation:
      "BS 5228 'Code of practice for noise and vibration control on construction and open sites' provides guidance on methods of predicting and measuring noise and vibration from construction activities, along with recommendations for minimising impacts. Part 1 covers noise and Part 2 covers vibration.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'BS 5228',
    category: 'Pollution Prevention',
  },
  {
    id: 124,
    question: 'Under the Control of Pollution Act 1974, what does a Section 61 consent allow?',
    options: [
      'Prior consent for construction works that may generate noise, agreeing methods and hours of work',
      'Consent to discharge contaminated surface water from a construction site to a public watercourse',
      'Consent to store more than 200 litres of oil on a construction site without secondary containment',
      'Consent to deposit inert construction waste on land without a full environmental permit',
    ],
    correctAnswer: 0,
    explanation:
      'A Section 61 consent under the Control of Pollution Act 1974 allows a contractor to apply in advance for prior consent to carry out noisy construction works. The application sets out the proposed methods of working and hours of operation, and the local authority grants consent subject to conditions. Having a Section 61 consent provides the contractor with a defence against a Section 60 notice.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Section 61 consent',
    category: 'Pollution Prevention',
  },
  {
    id: 125,
    question: 'What power does a Section 60 notice give to a local authority?',
    options: [
      'The power to require a contractor to remove dust and debris deposited on the public highway',
      'The power to impose requirements on how construction works are carried out to control noise',
      'The power to stop construction works immediately where there is a risk of water pollution',
      'The power to require a contractor to install secondary containment for stored oil and fuel',
    ],
    correctAnswer: 1,
    explanation:
      'A Section 60 notice under the Control of Pollution Act 1974 gives the local authority the power to impose requirements on how construction works are carried out in order to control noise. The notice can specify permitted hours of work, noise levels, types of plant and equipment, and methods of working. Non-compliance is a criminal offence.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Section 60 notice',
    category: 'Pollution Prevention',
  },
  {
    id: 126,
    question: 'What is the primary purpose of dust suppression measures on a construction site?',
    options: [
      'To reduce the noise generated by cutting, grinding, and demolition activities on the site',
      'To speed up the drying of newly poured concrete and screed during the construction phase',
      'To protect the health of workers and nearby residents and prevent nuisance and ecological harm',
      'To prevent the spread of fire by keeping combustible dust away from sources of ignition',
    ],
    correctAnswer: 2,
    explanation:
      'Dust suppression on construction sites serves multiple essential purposes: protecting the respiratory health of workers and nearby residents, preventing nuisance to neighbours, avoiding ecological damage to habitats and watercourses, and complying with environmental legislation. Methods include water spraying, wheel washing, covering stockpiles, and using dust screens.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Dust suppression',
    category: 'Pollution Prevention',
  },
  {
    id: 127,
    question:
      'Which common dust control measure prevents mud and debris being tracked onto public roads?',
    options: [
      'Acoustic barriers',
      'Temporary lighting',
      'Tree planting',
      'Wheel-washing facilities',
    ],
    correctAnswer: 3,
    explanation:
      'Wheel-washing facilities at site exits clean the wheels and underside of vehicles before they leave the construction site. This prevents mud, dust, and debris from being deposited on public roads, which would create dust when dried and disturbed by traffic. Many local authorities require wheel washing as a condition of planning permission or through a Construction Environmental Management Plan.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Wheel washing',
    category: 'Pollution Prevention',
  },
  {
    id: 128,
    question: 'What document sets out how pollution risks will be managed during construction?',
    options: [
      'A Construction Environmental Management Plan (CEMP)',
      'A Site Waste Management Plan (SWMP)',
      'A Construction Phase Health and Safety Plan',
      'An Environmental Product Declaration (EPD)',
    ],
    correctAnswer: 0,
    explanation:
      'A Construction Environmental Management Plan (CEMP) sets out the measures that will be implemented to manage environmental risks during construction, including pollution prevention, dust control, noise management, waste handling, and ecological protection. CEMPs are frequently required as a condition of planning permission.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'CEMP',
    category: 'Pollution Prevention',
  },
  {
    id: 129,
    question: 'What is GPP5 and who publishes it?',
    options: [
      'A guide on the safe storage of oil and fuel on construction sites, published by the Health and Safety Executive',
      'A pollution prevention guide for works and maintenance near water, published by the Environment Agency and partners',
      'A guide on the control of dust and air quality on construction sites, published by Defra',
      'A guide on the safe handling and disposal of hazardous waste, published by the local authority',
    ],
    correctAnswer: 1,
    explanation:
      "GPP5 (Guidance for Pollution Prevention 5) is titled 'Works and maintenance in or near water' and provides practical guidance on preventing pollution when working in, near, or over watercourses. It is published jointly by the environment agencies of England, Scotland, Wales, and Northern Ireland (formerly under the NetRegs partnership).",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'GPP5',
    category: 'Pollution Prevention',
  },
  {
    id: 130,
    question:
      'Under UK law, what is the main piece of legislation controlling pollution of controlled waters?',
    options: [
      'The Control of Pollution Act 1974',
      'The Hazardous Waste (England and Wales) Regulations 2005',
      'The Environmental Permitting (England and Wales) Regulations 2016',
      'The Land Drainage Act 1991',
    ],
    correctAnswer: 2,
    explanation:
      'The Environmental Permitting (England and Wales) Regulations 2016 (EPR) consolidate and replace previous pollution control regimes. Under Regulation 12, it is an offence to cause or knowingly permit a water discharge activity or groundwater activity without an environmental permit, unless an exemption applies. This includes discharges to rivers, streams, lakes, canals, and groundwater.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Water pollution legislation',
    category: 'Pollution Prevention',
  },
  {
    id: 131,
    question:
      'What are the minimum requirements for oil storage under the Oil Storage Regulations 2001?',
    options: [
      "The storage container must be fitted with a drainage valve at the base of the bund to release rainwater",
      "The storage container must be located at least 50 metres from any watercourse, drain, or surface water gully",
      "The storage container must be emptied and removed from site whenever it is not in active daily use",
      "The storage container must be within a secondary containment system (bund) capable of holding 110% of the container's capacity",
    ],
    correctAnswer: 3,
    explanation:
      "The Control of Pollution (Oil Storage) (England) Regulations 2001 require that oil storage containers above 200 litres must have secondary containment (a bund) capable of holding at least 110% of the container's capacity (or 25% of the total if multiple containers share a bund). The bund must be impermeable and have no drainage valve that could allow oil to escape.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Oil storage regulations',
    category: 'Pollution Prevention',
  },
  {
    id: 132,
    question: 'What does SuDS stand for?',
    options: [
      'Sustainable Drainage Systems',
      'Surface Utility Diversion Scheme',
      'Supervised Urban Disposal Strategy',
      'Standard Underground Drainage System',
    ],
    correctAnswer: 0,
    explanation:
      'SuDS stands for Sustainable Drainage Systems. They are designed to manage surface water runoff in a way that mimics natural drainage, reducing flood risk, improving water quality, and enhancing biodiversity. Examples include permeable paving, swales, rain gardens, green roofs, retention ponds, and constructed wetlands.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'SuDS',
    category: 'Pollution Prevention',
  },
  {
    id: 133,
    question: 'What is the primary environmental benefit of SuDS over conventional piped drainage?',
    options: [
      'SuDS convey surface water away from a site faster than piped drainage, reducing the risk of on-site flooding',
      'SuDS reduce surface water runoff rates, improve water quality through natural filtration, and create habitat',
      'SuDS eliminate the need for any connection to the public sewer by storing all runoff permanently on site',
      'SuDS treat foul wastewater to drinking-water standard before it is discharged to a watercourse',
    ],
    correctAnswer: 1,
    explanation:
      "SuDS provide multiple environmental benefits compared to conventional piped drainage: they attenuate surface water runoff reducing flood risk downstream, filter pollutants through natural processes improving water quality, create and enhance wildlife habitats, and provide amenity value. The four 'pillars' of SuDS design are water quantity, water quality, amenity, and biodiversity.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'SuDS benefits',
    category: 'Pollution Prevention',
  },
  {
    id: 134,
    question: 'What is land contamination in the context of environmental protection?',
    options: [
      'Land that has been built on previously and is therefore classified as brownfield for planning purposes',
      'Land that lies within a flood zone and is at risk of inundation from rivers or surface water',
      'Land where substances are present at concentrations that could cause harm to human health or the environment',
      'Land that has poor drainage and becomes waterlogged, making it unsuitable for construction without remediation',
    ],
    correctAnswer: 2,
    explanation:
      'Land contamination refers to the presence of substances in, on, or under the land at concentrations that could pose a risk of significant harm to human health, controlled waters, or the wider environment. Contamination can arise from historical industrial activities, waste disposal, accidental spills, or the use of substances such as heavy metals, hydrocarbons, asbestos, and solvents.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Land contamination',
    category: 'Pollution Prevention',
  },
  {
    id: 135,
    question:
      'Which Part of the Environmental Protection Act 1990 provides the legal framework for contaminated land in England?',
    options: [
      'Part I',
      'Part IV',
      'Part III',
      'Part IIA',
    ],
    correctAnswer: 3,
    explanation:
      "Part IIA of the Environmental Protection Act 1990 (inserted by the Environment Act 1995) establishes the legal regime for identifying and remediating contaminated land in England. It defines contaminated land, sets out the roles of local authorities and the Environment Agency, establishes the 'polluter pays' principle, and provides the framework for determining liability for remediation.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Part IIA EPA 1990',
    category: 'Pollution Prevention',
  },
  {
    id: 136,
    question: 'What does CLEA stand for in contaminated land assessment?',
    options: [
      'Contaminated Land Exposure Assessment',
      'Construction Land Environmental Audit',
      'Chemical Leachate Evaluation Analysis',
      'Controlled Land Ecological Appraisal',
    ],
    correctAnswer: 0,
    explanation:
      'CLEA stands for Contaminated Land Exposure Assessment. It is a model developed by the Environment Agency (now maintained by Defra) that derives Soil Guideline Values (SGVs) and Generic Assessment Criteria (GAC) for assessing risks to human health from soil contamination. CLEA uses exposure pathways (ingestion, inhalation, dermal contact) to calculate safe threshold concentrations for various contaminants.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'CLEA model',
    category: 'Pollution Prevention',
  },
  {
    id: 137,
    question:
      "What is the 'source-pathway-receptor' model used for in contaminated land risk assessment?",
    options: [
      'Calculating the structural load of a foundation',
      'Identifying whether a contamination linkage exists that could cause harm',
      'Designing the electrical installation for a building',
      'Determining the schedule of dilapidations',
    ],
    correctAnswer: 1,
    explanation:
      "The source-pathway-receptor model is the fundamental conceptual framework for contaminated land risk assessment. A 'contaminant linkage' exists when there is a source of contamination, a pathway by which it can reach a receptor, and a receptor (such as human health, controlled waters, or an ecosystem) that could be harmed. All three elements must be present for there to be a risk requiring action.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Source-pathway-receptor',
    category: 'Pollution Prevention',
  },
  {
    id: 138,
    question: "What is 'bioremediation' in the context of contaminated land?",
    options: [
      'Excavating contaminated soil and transporting it to a licensed landfill site for disposal',
      'Sealing contaminated soil beneath an impermeable membrane to prevent contact with receptors',
      'Using biological organisms (such as bacteria or plants) to break down or remove contaminants from soil or groundwater',
      'Heating contaminated soil to high temperatures to destroy or volatilise the contaminants',
    ],
    correctAnswer: 2,
    explanation:
      "Bioremediation is a remediation technique that uses living organisms — typically bacteria, fungi, or plants — to degrade, transform, or remove contaminants from soil and groundwater. It can be carried out in situ (on site) or ex situ (in a treatment facility). Bioremediation is often more sustainable and cost-effective than traditional 'dig and dump' methods, though it may take longer to achieve target concentrations.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Bioremediation',
    category: 'Pollution Prevention',
  },
  {
    id: 139,
    question: "What is a 'remediation strategy' for contaminated land?",
    options: [
      'A strategy for marketing properties on former industrial sites',
      'A legal agreement between neighbours about boundary disputes',
      'A financial plan for insuring against future contamination',
      'A plan that sets out how contamination will be addressed to make the land suitable for its intended use',
    ],
    correctAnswer: 3,
    explanation:
      'A remediation strategy is a document that sets out the approach and methods for addressing land contamination to make the site suitable for its proposed end use. It is informed by the site investigation and risk assessment findings and typically includes remediation objectives, proposed techniques (such as excavation, in-situ treatment, or containment), verification requirements, and monitoring plans.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Remediation strategy',
    category: 'Pollution Prevention',
  },
  {
    id: 140,
    question: "What is the 'polluter pays' principle in contaminated land legislation?",
    options: [
      'The person or company who caused or knowingly permitted the contamination is primarily liable for remediation costs',
      'The current owner of the land is always solely liable for remediation, regardless of who caused the contamination',
      'The local authority bears the cost of remediating all contaminated land within its administrative area',
      'The cost of remediation is shared equally between the original polluter, the current owner, and central government',
    ],
    correctAnswer: 0,
    explanation:
      "Under Part IIA of the Environmental Protection Act 1990, the 'polluter pays' principle establishes that the person who caused or knowingly permitted the contamination (the 'appropriate person' — Class A) bears primary liability for remediation. Only if no Class A person can be found after reasonable enquiry does liability pass to the current owner or occupier (Class B). This hierarchy ensures that those responsible for contamination bear the cost of clean-up.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Polluter pays principle',
    category: 'Pollution Prevention',
  },
  {
    id: 141,
    question:
      "Which agency is the enforcing authority for 'special sites' under Part IIA of the Environmental Protection Act 1990?",
    options: [
      'The Health and Safety Executive',
      'The Environment Agency',
      'The local planning authority',
      'Natural England',
    ],
    correctAnswer: 1,
    explanation:
      "Under Part IIA, 'special sites' — such as those affecting controlled waters, MOD land, nuclear sites, or sites regulated under the Environmental Permitting Regulations — are regulated by the Environment Agency rather than the local authority. The local authority identifies the land as contaminated and refers it to the Environment Agency, which then becomes the enforcing authority responsible for ensuring remediation.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Special sites',
    category: 'Pollution Prevention',
  },
  {
    id: 142,
    question: "What type of SuDS feature is a 'swale'?",
    options: [
      'An underground crate system that stores surface water runoff and releases it at a controlled rate',
      'A permeable paved surface that allows rainwater to drain through into a granular sub-base',
      'A shallow, vegetated channel designed to convey and filter surface water runoff',
      'A deep retention pond that permanently holds water to provide amenity and habitat',
    ],
    correctAnswer: 2,
    explanation:
      'A swale is a broad, shallow, vegetated channel designed to convey, store, and treat surface water runoff. As water flows through the vegetation, pollutants are filtered and slowed down, reducing peak flow rates and improving water quality. Swales are one of the most common SuDS features and can be incorporated into verges, parks, and open spaces on development sites.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Swales',
    category: 'Pollution Prevention',
  },
  {
    id: 143,
    question: "What is an 'attenuation tank' in the context of SuDS?",
    options: [
      'A device installed in a drainage system to separate and retain oil and fuel from surface water runoff',
      'A sealed underground tank that collects and stores foul wastewater for periodic removal by tanker',
      'A vegetated channel that conveys surface water across a site while filtering out sediment and pollutants',
      'An underground or surface-level storage system that temporarily holds surface water runoff and releases it at a controlled rate',
    ],
    correctAnswer: 3,
    explanation:
      'An attenuation tank is an underground or surface-level storage system designed to temporarily hold surface water runoff during heavy rainfall events and release it slowly at a controlled rate to the drainage network or watercourse. This reduces peak flow rates downstream, helping to prevent flooding. Attenuation tanks can be modular crate systems, concrete tanks, or oversized pipes.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Attenuation tanks',
    category: 'Pollution Prevention',
  },
  {
    id: 144,
    question: "What does a 'silt fence' do on a construction site?",
    options: [
      'Filters sediment from surface water runoff to prevent silt entering watercourses',
      'Acts as an acoustic barrier to reduce noise from construction activities reaching nearby properties',
      'Provides a physical barrier to prevent unauthorised access to a construction site after hours',
      'Suppresses dust by trapping airborne particles before they are carried off the site by the wind',
    ],
    correctAnswer: 0,
    explanation:
      'A silt fence is a temporary sediment control device installed on construction sites to filter sediment-laden surface water runoff before it reaches watercourses, drains, or sensitive habitats. The fence consists of a geotextile fabric supported by stakes, placed downslope of disturbed areas. Silt fences are a basic but effective pollution prevention measure and are commonly required in Construction Environmental Management Plans.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Silt fences',
    category: 'Pollution Prevention',
  },
  {
    id: 145,
    question:
      'What is the maximum penalty for causing a water pollution offence under the Environmental Permitting Regulations 2016?',
    options: [
      "A fixed penalty notice of up to £1,000, with no possibility of a custodial sentence",
      "Up to 12 months imprisonment and/or an unlimited fine in the magistrates' court, or up to 5 years and/or an unlimited fine in the Crown Court",
      "A formal caution for a first offence, with prosecution reserved only for repeat offenders",
      "A maximum fine of £20,000 in the magistrates' court, with no power to imprison the offender",
    ],
    correctAnswer: 1,
    explanation:
      "Causing or knowingly permitting a water discharge activity or groundwater activity without an environmental permit is a serious criminal offence under the Environmental Permitting Regulations 2016. On summary conviction in the magistrates' court, the penalty can be up to 12 months imprisonment and/or an unlimited fine. On conviction on indictment in the Crown Court, the maximum penalty is 5 years imprisonment and/or an unlimited fine.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Water pollution penalties',
    category: 'Pollution Prevention',
  },
  {
    id: 146,
    question: "What is a 'spill kit' and when should one be available on a construction site?",
    options: [
      'A set of personal protective equipment issued to workers handling hazardous substances on site',
      'A drainage system that collects and treats contaminated runoff before it reaches a watercourse',
      'A collection of absorbent materials and containment equipment for cleaning up oil, fuel, or chemical spills — required wherever such substances are stored or used',
      'A bunded storage container designed to hold 110% of the capacity of an oil or fuel tank',
    ],
    correctAnswer: 2,
    explanation:
      'A spill kit contains absorbent materials (such as pads, granules, and booms), protective equipment, and disposal bags for responding to spills of oil, fuel, chemicals, or other pollutants. Spill kits should be readily available wherever potentially polluting substances are stored, handled, or used on a construction site. Workers must be trained in their use, and the kits must be appropriate for the substances present.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Spill kits',
    category: 'Pollution Prevention',
  },
  {
    id: 147,
    question: 'What is the purpose of an oil interceptor?',
    options: [
      'To filter suspended sediment out of surface water runoff before it is discharged to a watercourse',
      'To neutralise the alkalinity of concrete washout water before it enters the drainage system',
      'To temporarily store surface water runoff and release it at a controlled rate to prevent flooding',
      'To separate oil and other hydrocarbons from surface water runoff before it enters the drainage system or watercourse',
    ],
    correctAnswer: 3,
    explanation:
      'An oil interceptor (also called an oil separator) is a device installed in drainage systems to separate and retain oil, fuel, and other light hydrocarbons from surface water runoff before it is discharged to drains, watercourses, or the ground. Interceptors are typically required for car parks, refuelling areas, vehicle maintenance areas, and sites where there is a risk of oil contamination.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Oil interceptors',
    category: 'Pollution Prevention',
  },
  {
    id: 148,
    question:
      'Under the Oil Storage Regulations, what minimum capacity of oil triggers the requirement for secondary containment?',
    options: [
      'Over 200 litres',
      'Any amount of oil',
      'Over 1,000 litres',
      'Over 5,000 litres',
    ],
    correctAnswer: 0,
    explanation:
      "The Control of Pollution (Oil Storage) (England) Regulations 2001 apply to the storage of oil in containers with a capacity of more than 200 litres. Above this threshold, the regulations require secondary containment (bunding) capable of holding at least 110% of the container's capacity, along with requirements for the integrity and maintenance of both the container and the bund.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Oil storage threshold',
    category: 'Pollution Prevention',
  },
  {
    id: 149,
    question: "What is 'concrete washout' and why is it a pollution risk?",
    options: [
      'The settling of fine particles out of concrete before it cures — the residue is harmless and can be discharged',
      'The process of cleaning concrete from tools and equipment — the alkaline wash water can pollute watercourses',
      'The removal of surplus wet concrete from a pour — it is inert waste and poses no pollution risk',
      'The bleeding of water to the surface of freshly poured concrete — the run-off is neutral and safe to drain',
    ],
    correctAnswer: 1,
    explanation:
      'Concrete washout is the process of cleaning concrete from mixer trucks, pumps, tools, and equipment. The resulting wash water is highly alkaline (pH 11-13) and contains fine sediment, which can be lethal to aquatic life and cause significant pollution to watercourses and drains. Concrete washout must be collected in designated, lined washout areas and never allowed to enter drains, watercourses, or unprotected ground.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Concrete washout',
    category: 'Pollution Prevention',
  },
  {
    id: 150,
    question: 'What is the BRE 365 test used for?',
    options: [
      'Testing the compressive strength of concrete',
      'Determining the fire resistance of structural elements',
      'Measuring the infiltration rate of soil for SuDS design',
      'Assessing the thermal performance of insulation',
    ],
    correctAnswer: 2,
    explanation:
      'The BRE 365 soakaway design and construction test (published by the Building Research Establishment) is used to measure the infiltration rate of soil on a site. This information is essential for designing infiltration-based SuDS features such as soakaways, permeable paving, and rain gardens. The test involves excavating a pit, filling it with water, and measuring the rate at which the water level drops.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'BRE 365 test',
    category: 'Pollution Prevention',
  },
  {
    id: 151,
    question: 'What is the main risk of allowing cement or concrete to enter a watercourse?',
    options: [
      'The high acidity (pH 2-4) burns the gills of fish and dissolves the shells of aquatic invertebrates',
      'The cement starves the water of oxygen by encouraging the rapid growth of algae and bacteria',
      'The fine cement particles release toxic heavy metals such as lead and mercury into the water',
      'The high alkalinity (pH 11-13) is toxic to aquatic organisms and can devastate freshwater ecosystems',
    ],
    correctAnswer: 3,
    explanation:
      'Cement and concrete are highly alkaline, with a pH typically between 11 and 13. If wash water or uncured concrete enters a watercourse, it can rapidly raise the pH to levels that are lethal to fish, invertebrates, and aquatic plants. Even small quantities can cause severe ecological damage. The Environment Agency treats concrete pollution as a serious incident and can bring criminal prosecution.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Cement pollution',
    category: 'Pollution Prevention',
  },
  {
    id: 152,
    question: "What does 'controlled waters' mean in UK environmental law?",
    options: [
      'Inland freshwaters, groundwaters, and coastal waters as defined in the Water Resources Act 1991',
      'Drinking water supplies that are abstracted, treated, and distributed by licensed water companies',
      'Surface water and foul water within the public sewer network managed by water and sewerage undertakers',
      'Privately owned ponds, lakes, and reservoirs that lie entirely within the boundary of a single property',
    ],
    correctAnswer: 0,
    explanation:
      "Under the Water Resources Act 1991, 'controlled waters' is defined broadly to include: inland freshwaters (rivers, streams, lakes, ponds, and reservoirs), groundwaters (water in underground strata), estuaries, and coastal waters up to three nautical miles from the baseline. It is an offence to cause or knowingly permit pollution of controlled waters without authorisation.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Controlled waters',
    category: 'Pollution Prevention',
  },
  {
    id: 153,
    question: "What is a 'Desk Study' in the context of contaminated land investigation?",
    options: [
      'An intrusive investigation involving trial pits and boreholes to sample and analyse soil and groundwater',
      'A review of historical maps, records, and environmental data to assess the potential for land contamination before any intrusive investigation',
      'A long-term monitoring programme to confirm that remediation works have been successful over time',
      'A detailed remediation strategy setting out the methods and objectives for cleaning up contaminated land',
    ],
    correctAnswer: 1,
    explanation:
      'A Desk Study (also called a Phase 1 Environmental Assessment or Preliminary Risk Assessment) is the first stage of contaminated land investigation. It involves reviewing historical maps, trade directories, regulatory records, geological and hydrogeological data, and other documentary evidence to identify potential sources of contamination, pathways, and receptors. The findings inform decisions about whether intrusive (Phase 2) investigation is required.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Desk study',
    category: 'Pollution Prevention',
  },
  {
    id: 154,
    question: "What does 'ex situ remediation' of contaminated soil involve?",
    options: [
      'Treating contaminated soil in place, in the ground, without any excavation',
      'Sealing contaminated soil beneath an impermeable cap to break the pollution pathway',
      'Excavating contaminated soil and treating it off-site or in a separate treatment area on site',
      'Diluting contaminated soil with clean imported material to reduce contaminant concentrations',
    ],
    correctAnswer: 2,
    explanation:
      'Ex situ remediation involves excavating contaminated soil and either treating it in a designated area on site or transporting it to an off-site treatment facility. Treatment methods may include bioremediation, soil washing, thermal treatment, or stabilisation. The alternative approach is in situ remediation, where contamination is treated in place without excavation.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Ex situ remediation',
    category: 'Pollution Prevention',
  },
  {
    id: 155,
    question:
      "What is the purpose of a 'watching brief' during earthworks on a potentially contaminated site?",
    options: [
      'To have a security guard monitor the excavation overnight to prevent fly-tipping of waste into the open ground',
      'To have a structural engineer check the stability of excavation sides to prevent collapse during the works',
      'To have a surveyor record the exact position and depth of all excavations for the as-built drawings',
      'To have a qualified person observe excavation works and identify unexpected contamination for appropriate action',
    ],
    correctAnswer: 3,
    explanation:
      'A watching brief involves having a suitably qualified environmental professional present during earthworks to observe soil conditions and identify any unexpected contamination that may be encountered — such as unusual colours, odours, textures, or buried waste. If contamination is found, the watching brief allows immediate assessment and appropriate action, such as segregating contaminated material, adjusting remediation methods, or halting work for further investigation.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Watching brief',
    category: 'Pollution Prevention',
  },
  {
    id: 156,
    question:
      'What is the role of the Environment Agency in pollution prevention on construction sites?',
    options: [
      'It is the regulator responsible for protecting the environment, including preventing pollution of water, land, and air, and can take enforcement action',
      'It is the government adviser on the natural environment, responsible for issuing protected-species licences and designating SSSIs',
      'It is the body responsible for enforcing occupational health and safety law and investigating workplace accidents on sites',
      'It is the local authority department responsible for granting planning permission and approving construction phase plans',
    ],
    correctAnswer: 0,
    explanation:
      'The Environment Agency is the principal environmental regulator in England. On construction sites, it is responsible for preventing pollution of controlled waters, regulating waste management, protecting sensitive habitats, and ensuring compliance with environmental permits. The EA can investigate pollution incidents, issue enforcement notices, and prosecute offenders. It also provides guidance on pollution prevention through the GPP and PPG series.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Environment Agency role',
    category: 'Pollution Prevention',
  },
  {
    id: 157,
    question:
      "What is 'dewatering' on a construction site and what environmental risk does it pose?",
    options: [
      'Spraying water on a site to suppress dust — risk of run-off carrying silt and contaminants to drains',
      'Pumping groundwater or surface water from excavations — risk of polluting watercourses with sediment or contaminants',
      'Recycling wash water from wheel-washing facilities — risk of recirculating oil and fuel residues around the site',
      'Mixing water into excavated soil to improve its handling — risk of leaching contaminants into the ground',
    ],
    correctAnswer: 1,
    explanation:
      'Dewatering is the process of pumping groundwater or accumulated surface water from excavations to allow construction work to proceed. It poses environmental risks because the pumped water may contain high levels of suspended sediment, contaminants from the ground, or cement residues. Discharging this water directly to watercourses without treatment can cause pollution. An environmental permit or exemption may be required from the Environment Agency for dewatering activities.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Dewatering',
    category: 'Pollution Prevention',
  },
  {
    id: 158,
    question: "What is 'permeable paving' and how does it function as a SuDS feature?",
    options: [
      'A sealed paved surface that channels all rainwater to a central gully connected to the public sewer',
      'A vegetated channel laid alongside a paved surface to convey and filter surface water runoff',
      'A paved surface that allows rainwater to drain through the surface into a sub-base where it is stored and gradually released or infiltrated',
      'An underground tank beneath a paved surface that permanently stores all of the rainwater that falls on it',
    ],
    correctAnswer: 2,
    explanation:
      'Permeable paving is a SuDS feature that uses specially designed paving blocks, porous asphalt, or porous concrete to allow rainwater to drain through the surface into a granular sub-base. The sub-base acts as a reservoir, temporarily storing the water and allowing it to infiltrate into the ground or be released slowly to the drainage network. This reduces surface water runoff rates and provides natural filtration of pollutants.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Permeable paving',
    category: 'Pollution Prevention',
  },
  {
    id: 159,
    question:
      'What minimum bund capacity is required when multiple oil containers share a single bund under the Oil Storage Regulations?',
    options: [
      '110% of the smallest container or 10% of the total capacity, whichever is greater',
      '100% of the largest container or 50% of the total capacity, whichever is smaller',
      '25% of the largest container or 110% of the total capacity, whichever is greater',
      '110% of the largest container or 25% of the total capacity, whichever is greater',
    ],
    correctAnswer: 3,
    explanation:
      "When multiple oil storage containers share a single bund, the Oil Storage Regulations require the bund capacity to be the greater of 110% of the largest container's capacity or 25% of the total aggregate storage capacity. This ensures adequate secondary containment in the event of a single container failure while also providing reasonable protection if smaller leaks occur from multiple containers.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Bund capacity',
    category: 'Pollution Prevention',
  },
  {
    id: 160,
    question: "What is a 'settlement lagoon' used for on a construction site?",
    options: [
      'A temporary pond where sediment-laden water is held to allow suspended solids to settle out before discharge',
      'A lined area where concrete is washed out from mixer trucks and tools to contain the alkaline wash water',
      'A permanent ornamental pond created on a development site to deliver biodiversity net gain and amenity value',
      'A bunded compound where oil and fuel containers are stored to contain any spillage or leakage',
    ],
    correctAnswer: 0,
    explanation:
      'A settlement lagoon (or settling pond) is a temporary water treatment feature on a construction site where sediment-laden runoff is directed and held for a period, allowing suspended solids to settle to the bottom under gravity. The cleaner water can then be discharged (subject to any permit requirements) or recirculated for dust suppression. Settlement lagoons are a key pollution prevention measure during earthworks and demolition.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Settlement lagoons',
    category: 'Pollution Prevention',
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
    question: 'What does the Wildlife and Countryside Act 1981 protect?',
    options: [
      'Only domesticated animals, farmed livestock, and commercially managed game species',
      'Wild birds, certain wild animals and plants, and their habitats',
      'Only European Protected Species such as bats, otters, and great crested newts',
      'Only ancient woodland, hedgerows, and trees protected by preservation orders',
    ],
    correctAnswer: 1,
    explanation:
      'The Wildlife and Countryside Act 1981 (WCA) is the principal legislation protecting wildlife in Great Britain. It provides protection for wild birds (all species), specifically listed wild animals (such as bats, great crested newts, and dormice), specifically listed wild plants, and Sites of Special Scientific Interest (SSSIs). The Act makes it an offence to intentionally kill, injure, or take protected species or to damage or destroy their habitats.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Wildlife and Countryside Act 1981',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 162,
    question:
      'Under the Wildlife and Countryside Act 1981, what is the legal status of bats in the UK?',
    options: [
      'Only rare bat species are protected; common species such as the pipistrelle may be disturbed without a licence',
      'Bats are protected only while roosting; their roosts may be destroyed once the bats have left for the winter',
      'All bat species and their roosts are fully protected — it is an offence to disturb, injure, or kill bats or damage their roosts',
      'Bats are protected only on designated sites such as SSSIs; elsewhere they have no legal protection',
    ],
    correctAnswer: 2,
    explanation:
      'All 18 species of bat found in the UK are fully protected under the Wildlife and Countryside Act 1981 (Schedule 5) and the Conservation of Habitats and Species Regulations 2017. It is a criminal offence to deliberately capture, injure, or kill a bat; to intentionally or recklessly disturb bats; or to damage or destroy a bat roost (whether occupied or not). A Natural England licence is required for any works that could affect bats or their roosts.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Bat protection',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 163,
    question:
      'What are the Conservation of Habitats and Species Regulations 2017 commonly known as?',
    options: [
      'The Fire Safety Regulations',
      'The Building Regulations',
      'The Planning Regulations',
      'The Habitats Regulations',
    ],
    correctAnswer: 3,
    explanation:
      "The Conservation of Habitats and Species Regulations 2017 are commonly known as the 'Habitats Regulations'. They transpose the requirements of the EU Habitats Directive and Birds Directive into English and Welsh law. The regulations provide protection for European Protected Species (such as great crested newts, bats, and otters) and for Special Areas of Conservation (SACs) and Special Protection Areas (SPAs).",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Habitats Regulations',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 164,
    question:
      "What is 'biodiversity net gain' (BNG) and what percentage is required under the Environment Act 2021?",
    options: [
      'A 10% increase in biodiversity value — required for most new developments through planning',
      'A 50% increase in green space — required only in national parks',
      'A 25% increase in tree planting — required only for commercial developments',
      'A 5% increase in habitat area — required for all developments',
    ],
    correctAnswer: 0,
    explanation:
      'Biodiversity net gain (BNG) is a planning requirement under the Environment Act 2021 that most new developments in England must deliver a minimum 10% increase in biodiversity value compared to the pre-development baseline. Biodiversity value is measured using the Defra statutory biodiversity metric, and the gains must be maintained for at least 30 years. BNG became mandatory for most major developments from February 2024.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Biodiversity net gain',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 165,
    question:
      'How is biodiversity value measured under the statutory biodiversity net gain framework?',
    options: [
      'By counting the total number of individual animals and plants present on the site before development begins',
      'Using the Defra statutory biodiversity metric, which assesses habitat type, condition, distinctiveness, and area',
      'By measuring only the total area of green space provided, regardless of habitat type or condition',
      'By the number of protected species recorded on the site during a preliminary ecological appraisal',
    ],
    correctAnswer: 1,
    explanation:
      "Biodiversity value under the statutory BNG framework is measured using the Defra statutory biodiversity metric (currently version 4.0). The metric calculates 'biodiversity units' based on the habitat type (and its distinctiveness), the area or length of habitat, and its ecological condition. The pre-development baseline is compared with the post-development proposal to determine whether the minimum 10% net gain has been achieved.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Biodiversity metric',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 166,
    question:
      'For how long must biodiversity net gains be maintained under the Environment Act 2021?',
    options: [
      '5 years',
      '10 years',
      '30 years',
      'In perpetuity',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Environment Act 2021, biodiversity net gains achieved as part of a planning permission must be maintained for a minimum of 30 years. This is secured through planning conditions, conservation covenants, or legal agreements (such as Section 106 agreements). The 30-year period applies whether the habitat is created on site, off site, or delivered through statutory biodiversity credits.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'BNG duration',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 167,
    question: 'What is BREEAM?',
    options: [
      'A building regulation that sets minimum energy efficiency standards for new and existing buildings',
      'An energy efficiency rating scheme that grades buildings from A to G when they are built, sold, or rented',
      'A certification scheme that verifies the sustainability of timber and other forest products',
      'The Building Research Establishment Environmental Assessment Method — a sustainability rating scheme for buildings',
    ],
    correctAnswer: 3,
    explanation:
      "BREEAM (Building Research Establishment Environmental Assessment Method) is the world's leading sustainability assessment method for buildings, infrastructure, and communities. Developed by BRE, it evaluates buildings across categories including energy, health and wellbeing, innovation, land use, materials, management, pollution, transport, waste, and water. Ratings range from Pass to Outstanding.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'BREEAM',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 168,
    question: 'What are the BREEAM rating levels, from lowest to highest?',
    options: [
      'Pass, Good, Very Good, Excellent, Outstanding',
      'Bronze, Silver, Gold, Platinum',
      'Level 1, Level 2, Level 3, Level 4, Level 5',
      'Basic, Standard, Premium, Elite',
    ],
    correctAnswer: 0,
    explanation:
      'BREEAM ratings are awarded based on the percentage score achieved across all assessed categories. The five rating levels from lowest to highest are: Pass (30%+), Good (45%+), Very Good (55%+), Excellent (70%+), and Outstanding (85%+). An Unclassified result is given for scores below 30%. Many public sector clients and major developers target BREEAM Excellent or Outstanding for new buildings.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'BREEAM ratings',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 169,
    question: 'What is CEEQUAL?',
    options: [
      'A sustainability rating scheme for new and existing buildings such as homes, offices, and schools',
      'A sustainability assessment, rating, and awards scheme for civil engineering and infrastructure projects',
      'A standard for managing whole life carbon in buildings and infrastructure published by the BSI',
      'An energy efficiency rating scheme that grades civil engineering projects from A to G',
    ],
    correctAnswer: 1,
    explanation:
      'CEEQUAL is the evidence-based sustainability assessment, rating, and awards scheme for civil engineering, infrastructure, landscaping, and public realm projects. Now part of the BRE Group (alongside BREEAM), CEEQUAL assesses the sustainability performance of projects against categories including project management, land use, landscape, ecology, water, energy, transport, waste, and community relations.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'CEEQUAL',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 170,
    question: 'What is ISO 14001?',
    options: [
      'The international standard for Quality Management Systems',
      'The international standard for Energy Management Systems',
      'The international standard for Environmental Management Systems (EMS)',
      'The international standard for Occupational Health and Safety Management Systems',
    ],
    correctAnswer: 2,
    explanation:
      'ISO 14001 is the internationally recognised standard for Environmental Management Systems (EMS). It provides a framework for organisations to manage their environmental responsibilities systematically, improve environmental performance, fulfil compliance obligations, and achieve environmental objectives. Certification to ISO 14001 demonstrates to clients, regulators, and stakeholders that an organisation has a structured approach to managing its environmental impacts.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'ISO 14001',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 171,
    question: 'What is an Environmental Management System (EMS)?',
    options: [
      "A piece of software that automatically monitors and controls a building's heating, lighting, and ventilation",
      "A legal permit issued by the Environment Agency authorising an organisation to carry out polluting activities",
      "A one-off audit carried out to check whether an organisation complies with environmental legislation",
      "A structured framework of policies, processes, and procedures for managing an organisation's environmental impacts",
    ],
    correctAnswer: 3,
    explanation:
      "An Environmental Management System (EMS) is a structured framework that helps organisations manage their environmental responsibilities in a systematic way. It typically includes an environmental policy, planning processes, implementation procedures, monitoring and measurement systems, and management review processes. The 'Plan-Do-Check-Act' cycle is central to an EMS. ISO 14001 is the most widely adopted standard for implementing an EMS.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Environmental Management System',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 172,
    question: 'What is a Preliminary Ecological Appraisal (PEA)?',
    options: [
      'An initial ecological survey that identifies habitats, potential for protected species, and ecological constraints on a site',
      'A detailed species survey carried out at night to confirm the presence or absence of bats and great crested newts',
      'A final monitoring report confirming that ecological mitigation and habitat creation measures have been successful',
      'A desk study reviewing historical maps and records to assess the potential for land contamination on a site',
    ],
    correctAnswer: 0,
    explanation:
      'A Preliminary Ecological Appraisal (PEA) — sometimes called a Phase 1 Habitat Survey or Extended Phase 1 Survey — is an initial ecological assessment of a site. It involves a desk study of ecological records and a walkover survey to map habitats, identify features with potential to support protected or notable species, and assess ecological constraints and opportunities. The PEA determines whether further detailed species surveys are needed.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Preliminary Ecological Appraisal',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 173,
    question: 'During which months are bat activity surveys typically carried out in the UK?',
    options: [
      'November to February (the hibernation season), with surveys typically carried out at midday',
      'May to September (the active season), with surveys typically starting at dusk',
      'All year round, with surveys typically carried out during daylight hours in the early morning',
      'March to April (the breeding season), with surveys typically carried out around midnight',
    ],
    correctAnswer: 1,
    explanation:
      "Bat activity surveys (emergence and re-entry surveys) are typically carried out between May and September, when bats are most active. Surveys are conducted starting at dusk (for emergence surveys) or before dawn (for re-entry surveys) and use a combination of visual observation and bat detectors to record echolocation calls. The Bat Conservation Trust's 'Bat Surveys for Professional Ecologists: Good Practice Guidelines' specifies the survey season, effort, and methodology required.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Bat surveys',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 174,
    question: 'What is a European Protected Species (EPS) licence?',
    options: [
      'A licence issued by the Environment Agency permitting the discharge of treated wastewater to a protected watercourse',
      'A planning consent that allows development to proceed on a Site of Special Scientific Interest without further survey',
      'A licence granted by Natural England that allows otherwise prohibited activities affecting European Protected Species, subject to strict conditions',
      'A registration that permits low-risk ecological survey activities to be carried out without a full ecological appraisal',
    ],
    correctAnswer: 2,
    explanation:
      "A European Protected Species (EPS) licence (also called a mitigation licence) is granted by Natural England under the Conservation of Habitats and Species Regulations 2017. It authorises activities that would otherwise be illegal — such as disturbing, capturing, or relocating protected species, or damaging their breeding sites or resting places — subject to meeting three legal tests: no satisfactory alternative, imperative reasons of overriding public interest, and no detriment to the species' conservation status.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'EPS licence',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 175,
    question: 'What are the three legal tests that must be satisfied to obtain an EPS licence?',
    options: [
      "Full ecological survey, an approved mitigation plan, and payment of the appropriate licence fee to Natural England",
      "Planning permission granted, a biodiversity net gain of at least 10%, and a 30-year management plan in place",
      "No risk to human health, no breach of the duty of care, and no detriment to controlled waters or air quality",
      "No satisfactory alternative, imperative reasons of overriding public interest, and no detriment to the species' favourable conservation status",
    ],
    correctAnswer: 3,
    explanation:
      'The three legal tests for an EPS licence under the Habitats Regulations are: (1) there is no satisfactory alternative to the proposed action; (2) the action is necessary for imperative reasons of overriding public interest (including social or economic reasons); and (3) the action will not be detrimental to the maintenance of the population of the species at a favourable conservation status in their natural range. All three tests must be met.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'EPS licence tests',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 176,
    question:
      'Which species commonly encountered on UK construction sites is a European Protected Species?',
    options: [
      'Great crested newts',
      'Magpies',
      'Foxes',
      'Grey squirrels',
    ],
    correctAnswer: 0,
    explanation:
      'Great crested newts (Triturus cristatus) are a European Protected Species under the Conservation of Habitats and Species Regulations 2017 and are also protected under the Wildlife and Countryside Act 1981. They are commonly encountered on construction sites, particularly where there are ponds, ditches, or other water bodies within 500 metres. An EPS licence from Natural England is required for any works that could affect great crested newts or their habitats.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Great crested newts',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 177,
    question:
      "What is the 'nesting bird season' in the UK, during which vegetation clearance should be avoided?",
    options: [
      'October to February',
      'March to August (inclusive)',
      'January to March',
      'September to November',
    ],
    correctAnswer: 1,
    explanation:
      'The main bird nesting season in the UK runs from March to August inclusive, although some species may nest earlier or later. All wild birds, their nests (when in use or being built), and their eggs are protected under the Wildlife and Countryside Act 1981. Vegetation clearance, demolition, and other works that could disturb nesting birds should be scheduled outside this period, or a pre-works check by a suitably qualified ecologist must confirm no active nests are present.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Nesting bird season',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 178,
    question: 'What is the District Level Licensing (DLL) scheme for great crested newts?',
    options: [
      'A requirement for developers to obtain a separate great crested newt licence from each local authority district they work in',
      'A scheme requiring every pond within 500 metres of a development to be surveyed individually before works begin',
      'A strategic licensing approach where developers pay into a fund that delivers habitat compensation at a landscape scale, avoiding the need for individual site surveys',
      'A blanket exemption that allows great crested newts to be relocated without any licence in participating districts',
    ],
    correctAnswer: 2,
    explanation:
      'District Level Licensing (DLL) is an alternative approach to great crested newt licensing administered by Natural England. Instead of requiring individual site-by-site surveys and mitigation, developers in participating areas pay a conservation payment that funds habitat creation and management at a landscape scale. This delivers better outcomes for great crested newt conservation while reducing delays and costs for developers. The scheme is available in an increasing number of local authority areas.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'District Level Licensing',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 179,
    question: 'What legal protection do badgers have in the UK?',
    options: [
      'Badgers are a European Protected Species and an EPS licence is required to disturb them',
      'Badgers are protected only on designated sites such as SSSIs and nature reserves',
      'Badgers are protected only during the breeding season between February and May each year',
      'Badgers and their setts are protected under the Protection of Badgers Act 1992',
    ],
    correctAnswer: 3,
    explanation:
      "Badgers and their setts (burrow systems) are protected under the Protection of Badgers Act 1992. It is an offence to wilfully kill, injure, or take a badger; to cruelly ill-treat a badger; or to interfere with a sett by damaging, destroying, obstructing, or disturbing it. A licence from Natural England is required for any construction works that would disturb a badger sett. The 'exclusion zone' around an active sett is typically 30 metres.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Badger protection',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 180,
    question: "What is a 'biodiversity action plan' (BAP)?",
    options: [
      'A strategy and action plan that identifies priorities and actions for conserving and enhancing biodiversity',
      'A legal agreement securing the management of land for conservation purposes for at least 30 years',
      'A survey report recording the habitats and protected species present on a development site',
      'A calculation of the biodiversity units gained or lost as a result of a proposed development',
    ],
    correctAnswer: 0,
    explanation:
      'A Biodiversity Action Plan (BAP) sets out the priorities, targets, and actions for conserving and enhancing biodiversity at a national, regional, or local level. The UK BAP (now succeeded by the post-2010 biodiversity framework) identified priority habitats and species and the actions needed to protect and recover them. Local BAPs help guide development planning and land management to benefit local wildlife.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Biodiversity action plan',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 181,
    question: 'What is the purpose of an Ecological Impact Assessment (EcIA)?',
    options: [
      'To calculate the biodiversity net gain required to satisfy the planning conditions for a development',
      'To identify, quantify, and evaluate the potential ecological effects of a development, and to recommend avoidance, mitigation, and compensation measures',
      'To monitor habitats and species populations for at least 30 years after a development is completed',
      'To assess the risk of land contamination to ecological receptors before any intrusive site investigation',
    ],
    correctAnswer: 1,
    explanation:
      'An Ecological Impact Assessment (EcIA) is a systematic process for identifying, quantifying, and evaluating the potential effects of a proposed development on ecological receptors (habitats, species, and ecosystems). It follows the CIEEM (Chartered Institute of Ecology and Environmental Management) guidelines and forms part of an Environmental Impact Assessment or planning application. The EcIA recommends measures to avoid, mitigate, and compensate for adverse ecological effects.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Ecological Impact Assessment',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 182,
    question: 'What does CIEEM stand for?',
    options: [
      'Construction Industry Environmental Engineering Method',
      'Central Institute of Energy and Emissions Monitoring',
      'Chartered Institute of Ecology and Environmental Management',
      'Certified Inspectors of Electrical and Electronic Materials',
    ],
    correctAnswer: 2,
    explanation:
      'CIEEM stands for the Chartered Institute of Ecology and Environmental Management. It is the leading professional body for ecologists and environmental managers in the UK, Ireland, and internationally. CIEEM sets standards for professional practice, publishes guidance on ecological surveys and assessment (including the EcIA guidelines), and provides a register of qualified ecologists.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'CIEEM',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 183,
    question: 'What is the mitigation hierarchy in ecological assessment?',
    options: [
      'Compensate, mitigate, avoid — applied in that order of preference',
      'Survey, licence, monitor — applied in that order of preference',
      'Mitigate, compensate, avoid — applied in that order of preference',
      'Avoid, mitigate, compensate — applied in that order of preference',
    ],
    correctAnswer: 3,
    explanation:
      'The mitigation hierarchy is a fundamental principle in ecological assessment and environmental management. It requires that potential ecological effects are addressed in the following order of preference: (1) avoidance — redesign or relocate to avoid impacts entirely; (2) mitigation — reduce impacts that cannot be avoided; (3) compensation — offset residual impacts through habitat creation or enhancement elsewhere. Only after applying all three steps should any residual effects be assessed for significance.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Mitigation hierarchy',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 184,
    question: 'What type of ecological survey is an eDNA survey for great crested newts?',
    options: [
      'A water sampling technique that detects great crested newt DNA in pond water without the need to capture animals',
      'A night-time torchlight survey in which newts are counted along the margins of a pond during the breeding season',
      'A trapping survey using bottle traps set overnight in a pond to capture and count individual newts',
      'A habitat suitability index survey that scores a pond on factors such as water quality, shade, and fish presence',
    ],
    correctAnswer: 0,
    explanation:
      'An environmental DNA (eDNA) survey involves collecting water samples from ponds and analysing them in a laboratory for traces of great crested newt DNA shed through skin cells, mucus, and excrement. It is a rapid, non-invasive method of determining the presence or likely absence of great crested newts in a pond. eDNA sampling must be carried out between mid-April and the end of June, following strict protocols to avoid contamination.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'eDNA surveys',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 185,
    question: "What is a 'Site of Special Scientific Interest' (SSSI)?",
    options: [
      'A European designated site protected under the Habitats Regulations for its rare habitats and species',
      'A site designated under the Wildlife and Countryside Act 1981 for its outstanding wildlife, geological, or physiographical features',
      'A site where habitat is created in advance to generate biodiversity units that developers can purchase',
      'A privately owned nature reserve managed under a voluntary conservation covenant for at least 30 years',
    ],
    correctAnswer: 1,
    explanation:
      'A Site of Special Scientific Interest (SSSI) is a designation under the Wildlife and Countryside Act 1981 for areas of land that are of special interest by reason of their flora, fauna, geological, or physiographical features. SSSIs are notified by Natural England (in England) and receive legal protection. Owners and occupiers must obtain consent before carrying out any operations likely to damage the special features, and public authorities must take reasonable steps to further the conservation and enhancement of SSSIs.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'SSSI',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 186,
    question: "What is a 'Habitats Regulations Assessment' (HRA)?",
    options: [
      'An assessment of the habitats present on any site before a Preliminary Ecological Appraisal is carried out',
      'An assessment required for any development that could affect a Site of Special Scientific Interest (SSSI)',
      'An assessment required for any plan or project likely to have a significant effect on a European designated site (SAC or SPA)',
      'An assessment of the biodiversity net gain delivered by a development against its pre-development baseline',
    ],
    correctAnswer: 2,
    explanation:
      'A Habitats Regulations Assessment (HRA) is required under the Conservation of Habitats and Species Regulations 2017 for any plan or project that is likely to have a significant effect on a European designated site — namely a Special Area of Conservation (SAC), Special Protection Area (SPA), or Ramsar site. The HRA process includes screening, appropriate assessment, and consideration of alternative solutions and imperative reasons of overriding public interest.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Habitats Regulations Assessment',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 187,
    question: "What is the 'Plan-Do-Check-Act' cycle in the context of ISO 14001?",
    options: [
      'A one-off audit cycle carried out only when an organisation first seeks ISO 14001 certification',
      'A risk assessment process used to identify environmental hazards before construction work begins',
      'A reporting framework that classifies an organisation\'s emissions into Scope 1, 2, and 3',
      'The continual improvement cycle at the core of an Environmental Management System',
    ],
    correctAnswer: 3,
    explanation:
      "The Plan-Do-Check-Act (PDCA) cycle is the continual improvement framework at the heart of ISO 14001. 'Plan' involves establishing environmental objectives and processes; 'Do' involves implementing the processes; 'Check' involves monitoring and measuring against policy, objectives, and legal requirements; and 'Act' involves taking corrective actions and making improvements. The cycle repeats continuously, driving ongoing improvement in environmental performance.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'PDCA cycle',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 188,
    question:
      'Which invasive non-native plant species is it an offence to cause to grow in the wild in the UK?',
    options: [
      'Japanese knotweed',
      'Bramble',
      'English ivy',
      'Common nettle',
    ],
    correctAnswer: 0,
    explanation:
      'Japanese knotweed (Reynoutria japonica) is listed on Schedule 9 of the Wildlife and Countryside Act 1981, making it an offence to plant or otherwise cause it to grow in the wild. Japanese knotweed is an aggressive invasive species that can damage buildings, roads, and drainage systems. Soil containing Japanese knotweed rhizome is classified as controlled waste. A management plan is essential on any development site where it is present.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Japanese knotweed',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 189,
    question: "What is a 'translocation' in ecological terms?",
    options: [
      'The natural migration of animals between habitats in response to changing seasons or food availability',
      'The deliberate, planned movement of living organisms from one location to another, typically as a conservation or mitigation measure',
      'The fragmentation of a habitat by development, which isolates populations of animals and plants',
      'The introduction of a non-native invasive species into the wild, which is an offence under the Wildlife and Countryside Act 1981',
    ],
    correctAnswer: 1,
    explanation:
      'Translocation is the deliberate, planned movement of living organisms — including plants, animals, or entire habitats (such as turves or soil containing seed banks) — from one location to another. It is commonly used as a mitigation or compensation measure on development sites, for example relocating great crested newts to receptor habitats, moving reptiles to suitable areas, or translocating species-rich grassland. Translocation requires careful planning, appropriate licensing, and long-term monitoring.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Translocation',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 190,
    question: 'What is the role of Natural England in relation to protected species?',
    options: [
      "Natural England is the principal regulator responsible for preventing pollution of water, land, and air, and issuing environmental permits",
      "Natural England is the professional body that sets standards for ecologists and publishes the EcIA guidelines",
      "Natural England is the government's statutory adviser on the natural environment, responsible for issuing species licences, designating protected sites, and advising on ecological matters",
      "Natural England is the government department that sets environmental policy on agriculture, fisheries, and rural affairs",
    ],
    correctAnswer: 2,
    explanation:
      "Natural England is the government's statutory adviser on the natural environment in England. Its key roles include: designating and managing protected sites (SSSIs, National Nature Reserves, National Parks, AONBs); issuing European Protected Species licences and badger licences; advising on planning applications affecting the natural environment; managing agri-environment schemes; and overseeing the biodiversity net gain framework.",
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Natural England',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 191,
    question:
      'What type of ecological survey would be required before demolishing an old building that may contain bat roosts?',
    options: [
      'An eDNA water sample taken from any ponds within 500 metres of the building',
      'A daytime walkover survey to map the habitats surrounding the building only',
      'A desk study of historical records with no requirement for any site inspection',
      'A preliminary roost assessment followed by dusk emergence and/or dawn re-entry surveys if potential is identified',
    ],
    correctAnswer: 3,
    explanation:
      "Before demolishing or significantly altering an old building, a preliminary roost assessment (PRA) should be carried out by a licensed bat ecologist. This daytime inspection assesses the building's potential to support roosting bats by looking for access points, droppings, staining, and other evidence. If the building has moderate or high potential, further surveys — typically dusk emergence and/or dawn re-entry surveys during the active season (May-September) — are required to confirm presence or likely absence of bats.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Bat roost surveys',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 192,
    question: "What is an 'Ecological Clerk of Works' (ECoW)?",
    options: [
      'A qualified ecologist appointed to monitor construction works and ensure compliance with ecological mitigation measures and licence conditions',
      'A local authority officer who inspects completed developments to confirm that biodiversity net gain has been delivered',
      'A Natural England official who decides whether to grant European Protected Species licences for a development',
      'An ecologist who carries out the preliminary ecological appraisal of a site before any planning application is made',
    ],
    correctAnswer: 0,
    explanation:
      'An Ecological Clerk of Works (ECoW) is a suitably qualified and experienced ecologist appointed to be present on a construction site to monitor and supervise works that could affect protected species or sensitive habitats. The ECoW ensures compliance with ecological mitigation measures, licence conditions, and planning conditions. They provide toolbox talks to site workers, oversee sensitive operations such as vegetation clearance, and advise on ecological issues as they arise.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Ecological Clerk of Works',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 193,
    question: 'What is the purpose of wildlife-friendly fencing on a development site?',
    options: [
      'To exclude all wildlife from a development site during construction to prevent disturbance to protected species',
      'To maintain ecological connectivity by including features such as hedgehog gaps (13cm x 13cm) that allow small mammals to move between gardens and habitats',
      'To provide a visual screen of native planting that improves the amenity value of a development for residents',
      'To prevent invasive species such as Japanese knotweed from spreading between neighbouring properties',
    ],
    correctAnswer: 1,
    explanation:
      'Wildlife-friendly fencing incorporates features that maintain ecological connectivity across a development. The most common example is hedgehog gaps — small openings at the base of fencing (minimum 13cm x 13cm) that allow hedgehogs and other small mammals to move freely between gardens and habitat areas. Hedgehog populations have declined dramatically, and fragmentation of habitat by impermeable garden fencing is a significant factor. Many local planning policies now require hedgehog gaps.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Wildlife-friendly fencing',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 194,
    question:
      'Under BREEAM, which category assesses the ecological value and protection of a development site?',
    options: [
      'Energy',
      'Transport',
      'Land Use and Ecology',
      'Management',
    ],
    correctAnswer: 2,
    explanation:
      "The 'Land Use and Ecology' category in BREEAM assesses how a development protects and enhances the ecological value of a site. Credits are awarded for conducting ecological surveys, appointing a suitably qualified ecologist, protecting existing ecological features during construction, enhancing site ecology, and achieving biodiversity net gain. This category encourages developers to go beyond minimum regulatory requirements to deliver genuine ecological benefits.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'BREEAM ecology',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 195,
    question: "What is a 'conservation covenant' in the context of biodiversity net gain?",
    options: [
      'A payment a developer makes to the government as a last resort when on-site and off-site biodiversity gain cannot be delivered',
      'A planning condition requiring a developer to deliver at least a 10% net gain in biodiversity value',
      'A licence granted by Natural England allowing a developer to relocate protected species from a site',
      'A legally binding agreement between a landowner and a responsible body to manage land for conservation purposes for at least 30 years',
    ],
    correctAnswer: 3,
    explanation:
      "A conservation covenant is a legally binding agreement introduced by the Environment Act 2021 between a landowner and a designated 'responsible body' (such as a conservation charity, local authority, or government body). The landowner agrees to manage land for conservation purposes for at least 30 years. Conservation covenants are one of the mechanisms used to secure off-site biodiversity net gain, ensuring that habitat creation and management commitments are enforceable over the required period.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Conservation covenants',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 196,
    question: "What is 'habitat banking' in relation to biodiversity net gain?",
    options: [
      'A system where habitat is created or enhanced in advance, generating biodiversity units that can be sold to developers who need to meet their BNG obligations',
      'A scheme where developers deposit a financial bond with the local authority that is returned once habitat is created on site',
      'A register held by Natural England recording the locations of all protected habitats and species in England',
      'A process where habitats from a development site are translocated and stored at a receptor site for future reinstatement',
    ],
    correctAnswer: 0,
    explanation:
      "Habitat banking is a market-based mechanism where landowners or conservation organisations create or enhance habitats in advance of demand, generating 'biodiversity units' that are registered and can be sold to developers who need to deliver off-site biodiversity net gain to meet their planning obligations. The biodiversity gain site must be registered with the national register, and the habitat must be maintained for at least 30 years. Habitat banking helps deliver landscape-scale conservation outcomes.",
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Habitat banking',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 197,
    question: "What does the 'significant environmental aspects' concept mean in ISO 14001?",
    options: [
      "The legal and regulatory requirements that an organisation must comply with under environmental legislation",
      "Elements of an organisation's activities, products, or services that interact with the environment and have a significant environmental impact",
      "The objectives and targets an organisation sets for improving its environmental performance over time",
      "The external factors, such as climate and location, that affect an organisation's environmental performance",
    ],
    correctAnswer: 1,
    explanation:
      "In ISO 14001, an 'environmental aspect' is an element of an organisation's activities, products, or services that interacts with the environment (such as emissions to air, discharges to water, waste generation, or resource consumption). A 'significant environmental aspect' is one that has or can have a significant environmental impact. Organisations must identify and evaluate their environmental aspects and determine which are significant, so they can prioritise management efforts and set objectives for improvement.",
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Environmental aspects',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 198,
    question: "What are 'statutory biodiversity credits' under the Environment Act 2021?",
    options: [
      'Biodiversity units that a developer earns for delivering more than the required 10% net gain on their own site',
      'Tradable allowances that permit a developer to emit a fixed amount of greenhouse gases during construction',
      'Credits that developers can purchase from the government as a last resort to meet their BNG obligation when on-site and off-site options have been exhausted',
      'Units that a landowner generates by creating habitat in advance and sells directly to developers on the open market',
    ],
    correctAnswer: 2,
    explanation:
      'Statutory biodiversity credits are a last-resort option under the Environment Act 2021 for developers who cannot achieve the required 10% biodiversity net gain through on-site or off-site habitat creation. Credits are purchased from the government (Natural England) at a deliberately high price to incentivise on-site and off-site delivery. The revenue from credit sales is ring-fenced and used by the government to invest in habitat creation and enhancement projects.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Statutory biodiversity credits',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 199,
    question:
      "What is a 'toolbox talk' in the context of ecological protection on a construction site?",
    options: [
      'A written method statement setting out the ecological survey work to be carried out before development begins',
      'A formal training course that qualifies site workers to handle and relocate protected species themselves',
      'A signed agreement in which workers accept personal liability for any harm caused to protected species on site',
      'A short briefing to site workers about specific ecological risks, protected species, and the mitigation measures they must follow',
    ],
    correctAnswer: 3,
    explanation:
      'In the context of ecological protection, a toolbox talk is a short, focused briefing delivered to construction site workers — typically by the Ecological Clerk of Works or site environmental manager — about specific ecological risks on the site, protected species that may be present, legal obligations, and the mitigation measures that must be followed. Toolbox talks are an essential part of ensuring that all site personnel understand their responsibilities and can identify protected species or habitats.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Ecological toolbox talks',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 200,
    question:
      'What is the purpose of ecological monitoring after a development has been completed?',
    options: [
      'To verify that ecological mitigation and compensation measures are effective, that habitats are establishing as planned, and that species populations are being maintained',
      'To carry out a final preliminary ecological appraisal of the site once the development has been completed',
      'To calculate the biodiversity net gain that the development will be required to deliver under the Environment Act 2021',
      'To identify any protected species present so that an EPS licence can be obtained before demolition begins',
    ],
    correctAnswer: 0,
    explanation:
      'Post-construction ecological monitoring is essential to verify that mitigation, compensation, and enhancement measures are achieving their intended outcomes. This includes checking that newly created habitats are establishing and maturing, that translocated species are surviving and breeding, that wildlife features (such as bat and bird boxes) are being used, and that management prescriptions are being followed. Under biodiversity net gain, monitoring must continue for at least 30 years, with results reported to the local planning authority.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Ecological monitoring',
    category: 'Biodiversity & Best Practice',
  },
];
