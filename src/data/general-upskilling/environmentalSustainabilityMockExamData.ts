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
      'The total amount of carbon dioxide emitted directly by an activity or product, while excluding methane, nitrous oxide and every other greenhouse gas released along the way',
      'The area of land, measured in global hectares, that would be needed to absorb all of the carbon dioxide emissions an individual or organisation produces in a year',
      'The share of the emissions of an organisation that arise from purchased electricity, expressed as a percentage of the total energy it consumes across the whole year',
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
      'An economic model built on continuous growth in which raw natural resources are extracted, used only once, and then disposed of as cheaply and as efficiently as possible',
      'A trading system in which businesses buy and sell recovered materials on a commodities market so that supply and demand for recycled content are kept in balance across the market',
      'An economic model that aims to keep resources in use for as long as possible, extracting maximum value, then recovering and regenerating products and materials at end of life',
      'A national framework requiring every manufactured product to be returned to the original producer for inspection and testing within a fixed period after the original date of sale',
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
      'All developments must achieve zero biodiversity impact on the site where they are built',
      'Biodiversity assessments are only required for developments larger than 100 hectares',
      'Developers must create and fund a new nature reserve for every project they build',
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
      'Any breach of an environmental permit condition that the Environment Agency has formally recorded on file but has not yet decided to prosecute',
      'A minor environmental incident that causes inconvenience but does not require the local authority to take any formal enforcement action at all',
      'A planning condition imposed by the local authority to restrict the hours during which noisy or dusty activities may be carried out on a construction site',
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
      'To record the detailed technical procedures that site operatives must follow when handling each individual waste stream',
      "To set out the organisation's commitment to environmental protection, compliance with legislation, and continual improvement",
      'To provide a legally binding guarantee to clients that the organisation will never cause any environmental pollution on a site',
      'To list the specific environmental fines and penalties the organisation has incurred over each of the previous reporting years',
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
      'The use of green-coloured packaging and labelling to make products appear more natural and environmentally friendly to consumers on the shelf',
      'The process of cleaning and treating contaminated water on site so that it can be safely discharged to a nearby watercourse or surface water drain',
      'A voluntary scheme in which companies pay an independent body to verify and publicly certify their environmental claims before they are published',
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
      'The principle that the cost of cleaning up pollution should be shared out equally between the polluter, the landowner, and the taxpayer',
      'The principle that the government must compensate businesses in full for the whole cost of complying with any new environmental regulations',
      'The person or organisation responsible for causing pollution bears the cost of managing it to prevent damage to human health or the environment',
      'The principle that any organisation discharging to a watercourse must pay an annual licence fee to the Environment Agency for every outfall it uses',
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
      'The greenhouse gas emissions arising from the energy used to heat, cool, ventilate and light a building throughout the whole of its operational lifetime while in use',
      'The quantity of carbon dioxide that timber, hemp and other natural building materials absorb and then lock away permanently within the fabric of a finished building for good',
      'The total greenhouse gas emissions produced by the workers, the deliveries and the site plant present on a construction site during the construction phase of the works alone',
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
      'An estimate of how many years a building material or component will last in normal service before it has to be repaired, refurbished or replaced',
      'A financial appraisal of the purchase, operating, maintenance and disposal costs of a product across the whole of its expected service life in the building',
      'An assessment of the health and safety risks posed to the workers who handle a material at each separate stage of the construction phase of the works',
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
      'Ground-level ozone (O3)',
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
      'It imposes an immediate, blanket ban on the manufacture and sale of all plastic products right across the United Kingdom',
      'It requires retailers to charge a minimum 25p deposit on every single-use plastic item sold, refundable in full when it is returned',
      'It introduces powers to ban or restrict specific single-use plastic items and create extended producer responsibility schemes',
      'It transfers responsibility for all plastic waste collection from local authorities directly to the plastic manufacturers themselves',
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
      'Cutting the emissions of an organisation right down to zero by switching entirely to renewable electricity and to an all-electric vehicle fleet across the firm',
      'Capturing carbon dioxide from the chimneys and flues of a business and storing it permanently in deep geological formations beneath the site where it was produced',
      'Trading surplus emission allowances with other participants in the UK Emissions Trading Scheme in order to recover some of the cost of compliance each year',
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
      'Scope 2 covers direct emissions from company vehicles and on-site fuel combustion; Scope 3 covers all purchased electricity, heat and steam',
      'Scope 2 covers emissions from waste disposal and water use; Scope 3 covers emissions from all the buildings and plant the organisation owns',
      'Scope 2 covers emissions arising in the upstream supply chain; Scope 3 covers direct emissions from fuel burned in vehicles owned by the organisation',
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
      'It states that no environmental protection measure should be introduced unless there is full and conclusive scientific proof, accepted by all parties, that serious and irreversible harm would otherwise occur',
      'It states that developers must always demonstrate a measurable and positive environmental benefit, verified by an independent expert, before a local planning authority may grant planning permission for any development',
      'It states that the cost of any environmental protection measure at all must always be weighed carefully against, and must never be allowed to exceed, the total economic value of the development that is being proposed',
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
      'To tax domestic households on their gas and electricity use in order to fund the national energy efficiency improvement schemes that are on offer',
      'To encourage businesses to reduce energy consumption and greenhouse gas emissions by taxing energy supplies to business and public sector users',
      'To charge businesses a levy on every tonne of carbon dioxide they emit above the annual emissions cap that has been allocated to them in each year',
      'To provide grants to businesses that install renewable energy generation on their own sites, funded by a levy charged on all fossil fuel suppliers',
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
      'The ability to read and to interpret the annual carbon accounts and emissions reporting statements of an organisation',
      'A formal qualification required by law before an individual may carry out a carbon footprint assessment of any building',
      'An awareness of the carbon dioxide costs and impacts of everyday activities and the ability and motivation to reduce emissions',
      'The measurement of the total carbon dioxide emissions produced by an individual over the course of a single calendar year in all',
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
      'To impose a fixed rate of carbon tax on every tonne of greenhouse gas emitted by every business right across the United Kingdom in each year',
      'To require every electricity supplier to source a rising minimum percentage of all the power that it sells from renewable generation each year',
      'To provide tradable grants to households and landlords who install low-carbon heating systems and other energy efficiency measures in their homes',
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
      'The legal duty to obtain an environmental permit from the Environment Agency before any construction or demolition work may lawfully begin on a site of this kind',
      'The continuous monitoring of environmental performance against the objectives and targets set out in the published environmental policy of a business or organisation',
      'The process of cleaning up contaminated land to a standard that is suitable for its intended future use before any new development can begin on the site itself',
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
      'The annual amount of money the UK Government allocates to spend on climate change mitigation and adaptation projects each year',
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
      'The greenhouse gas emissions associated with extracting, manufacturing, transporting and installing all of the materials and components of a building',
      'The greenhouse gas emissions generated by the plant, machinery and deliveries used on site while a new building or structure is being constructed on the site',
      'The greenhouse gas emissions released when a building is demolished and its materials are transported away, processed and then sent for disposal or recovery',
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
      'A legal obligation on employers to protect the health, safety and welfare of every employee who handles, carries, treats or stores controlled waste in the course of their work for the business',
      'A requirement that all controlled waste be taken to the licensed landfill site nearest to the point of production, so that the transport emissions from each load are kept as low as possible',
      'A legal obligation on anyone who produces, imports, carries, keeps, treats, or disposes of controlled waste to ensure it is managed properly and transferred only to authorised persons',
      'A duty on local authorities to provide free collection and recycling facilities for controlled waste to every household and to every business within their own local authority district area',
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
      'A risk assessment that identifies the health and safety hazards associated with handling and moving waste on a construction site',
      'A document that sets out how waste will be managed on a construction site, including waste types, quantities, and disposal routes',
      'A legal agreement between a contractor and a licensed waste carrier setting out the agreed price for each waste collection',
      'A register recording the consignment notes for all of the hazardous waste produced and transferred from a construction site each year',
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
      'Raise revenue to fund the construction of new landfill sites and new waste incineration facilities right across the whole of the UK',
      'Charge waste producers a fee for every consignment note that is issued when waste is transferred to a landfill operator',
      'Discourage the disposal of waste to landfill by increasing costs, thereby encouraging waste reduction, reuse, and recycling',
      'Compensate local communities living near landfill sites for the loss of amenity and for the increased traffic on local roads',
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
      'Pricing waste collection contracts for each load against a standardised European tariff',
      'Rating the environmental performance of all registered waste carriers, brokers and dealers',
      'Tracking the movement of goods and materials across the borders of European member states',
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
      'A release from the duty of care for waste producers who transfer their waste only to a registered waste carrier',
      'A registration that allows certain low-risk waste activities to be carried out without a full environmental permit',
      'A waiver of landfill tax granted for inert waste that cannot be recycled or recovered by any other means at all',
      'An exclusion that allows household waste to be classified as non-controlled and disposed of without any documentation',
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
      'Clean brick, concrete, timber off-cuts, and uncontaminated soil or stone',
      'Cardboard packaging, plastic sheeting, metal off-cuts, and clean plasterboard',
      'Surplus cable, copper pipe, steel reinforcement, and aluminium cable trunking',
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
      'To keep waste within designated storage areas so that it cannot create a trip hazard or obstruct any of the access and escape routes around the whole of the site',
      'To cut the overall volume of waste leaving the site by compacting mixed materials tightly together into a single large container before it is removed from site',
      'To separate different types of waste so they can be reused, recycled, or disposed of appropriately, maximising resource recovery and reducing landfill',
      'To make sure that every skip is filled to its rated capacity before it is collected, reducing the number of vehicle movements needed to clear the waste from site',
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
      'A policy principle that requires consumers to pay a refundable deposit on certain products, returned to them only when the item is handed back in for recycling',
      'A scheme that extends the warranty obligations of a manufacturer so that faulty products must always be repaired on request rather than replaced or discarded',
      'A duty on every UK retailer to accept back any product that a customer no longer wants, regardless of where or when that particular item was originally bought from them',
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
      'That they take all of their own waste to a licensed landfill site rather than transferring it to any third party; keep the waste covered while it is stored on site; and record each skip movement in the site diary at the end of each week',
      'That they obtain an environmental permit from the Environment Agency before producing any controlled waste; appoint a named waste manager for the site; and display copies of every permit that has been issued on the wall of the main site office',
      'That they reduce the total quantity of waste they produce by a fixed percentage in every year of trading; report those figures to Defra at the end of each calendar year; and publish the results within their own company environmental policy',
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
      'It is classified as hazardous waste because the gypsum within it is toxic and carcinogenic to anyone who cuts the board, so it must always be double bagged before it is removed',
      'It contains asbestos fibres that are released whenever the board is cut or broken, so it must be removed from the site by a licensed asbestos removal contractor under a permit',
      'It is far too heavy and bulky to be accepted at a standard landfill site, so it must always be crushed and broken up on site before it can be disposed of anywhere else at all',
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
      'A description of the waste and the quantity only, together with the date of transfer, with no requirement to record either of the parties or the registration number of the carrier used',
      "A description of the waste, the quantity, the type of container, the date of transfer, the SIC code of the waste producer, details of both parties, and the waste carrier's registration number",
      'The estimated landfill tax payable on the load, the name and permit number of the landfill site that will receive it, and the weighbridge ticket that is issued at the site gate on arrival',
      'The specific hazardous properties of the waste, the premises notification number of the producer, the consignment note code covering the movement, and the date and time of the collection itself',
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
      'The principal contractor must personally hold the waste carrier registration for every load of waste leaving the site, and must arrange for each and every load to be weighed at the gate before it goes',
      'The principal contractor has no waste duties at all under CDM, because responsibility for the segregation, storage and removal of waste rests solely with each individual subcontractor working on the project',
      'The principal contractor must send all site waste directly to landfill and is not permitted to reuse, recycle or recover any of the materials at all that arise from the works carried out on the project itself',
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
      'The reprocessing of waste materials into new products of the same type, such as turning waste container glass back into new glass bottles and new jars for reuse',
      'The retrieval of waste that has been fly-tipped on land so that it can then be returned to a licensed waste facility for proper treatment or for final disposal',
      'The collection and separation of different waste materials at the point of production so that each separate stream can then be managed appropriately and lawfully',
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
      'The non-hazardous part of the load becomes exempt from the waste duty of care, so it may be handed to any carrier without a written description of the waste or a waste transfer note',
      'The hazardous component is diluted and neutralised by the far larger volume of non-hazardous waste, so the whole load may then be handled and tipped as ordinary controlled waste',
      'The combined load qualifies for the lower rate of landfill tax, because mixed waste is no longer classified as active waste once it has been weighed in at the gate of the landfill site',
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
      'They are classified as inert waste and may be disposed of alongside general construction and demolition rubble in a mixed skip that is then sent away to landfill',
      'They can be crushed down on site and the broken glass then sent away for recycling along with the other clean glass waste arising from the whole project',
      'They may be placed in the general waste skip provided that each tube is carefully wrapped to stop it from breaking while it is in transit to the waste depot',
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
      'It means recycling as much of the waste stream as possible on site; it is the top priority because recycling recovers valuable materials and keeps them out of landfill sites altogether at the end of the job',
      'It means preventing waste from being produced in the first place; it is the top priority because it avoids the environmental impacts of resource extraction, manufacturing, transport, and disposal entirely',
      'It means compacting waste so that it takes up far less space in a skip; it is the top priority because it lowers the number of skip collections and the transport emissions that go along with them each time',
      'It means sending waste to energy-from-waste plants for incineration; it is the top priority because burning waste recovers useful energy and removes the need for any further landfill capacity in the future',
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
      'Removing the requirement to record materials on a Site Waste Management Plan once the design of a project has been formally signed off in writing by the client and the whole design team',
      'Setting out a dedicated waste compound on the site layout drawings so that the skips and containers are kept tidy and well clear of the main access and delivery routes on site',
      'Using design decisions to reduce or eliminate waste generation during construction, including standardising dimensions, specifying reclaimed materials, and designing for disassembly',
      'Specifying that each and every surplus material must be returned to the supplier for a credit rather than being handled on the site as construction or demolition waste of any kind',
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
      'A six-digit European Waste Catalogue code that identifies the type and origin of a waste stream and is entered on the transfer note accompanying each and every load that leaves the site gate',
      'A premises notification number issued by the Environment Agency to producers of hazardous waste, which must be quoted before any of that waste may lawfully be removed from the premises',
      'A rating that sets out how many years a hazardous waste consignment note must be retained on file by the producer of the waste before it may lawfully be destroyed or shredded and thrown away',
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
      'Waste Reduction and Prevention Agency',
      'Workplace Recycling Awareness Planning',
      'Waste Recovery and Processing Council',
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
      'Waste that decomposes naturally over time within a landfill cell without producing any harmful gases or leachate, and which therefore needs no pre-treatment at all before it is disposed of — such as timber, paper, cardboard and packaging waste',
      'Waste that does not undergo any significant physical, chemical, or biological transformations, will not dissolve or burn, and does not adversely affect other materials it comes into contact with — such as clean bricks, concrete, and tiles',
      'Waste that has been treated and rendered completely harmless, so that it no longer has to be described in writing or moved under a consignment note and may be mixed with any other load — such as treated soils and dried sewage sludge cake',
      'Waste that exhibits none of the hazardous properties listed but must still be incinerated rather than sent to landfill because it will never break down in the ground — such as plastics, rubber, foam and expanded polystyrene packaging',
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
      'Compacting and baling unsorted waste in order to reduce its volume and cut the number of vehicle movements needed, as required of every waste producer before the load is transported away to the landfill site',
      'Applying a chemical sealant and an impermeable liner to the base of a landfill cell before any waste is deposited into it, as required of the operator of the site by the conditions of their environmental permit',
      'Obtaining written confirmation from the landfill operator that they hold an environmental permit allowing them to accept the waste, and keeping that written confirmation on file before the load leaves the site',
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
      'They have no further obligation once the waste has physically left their premises, because legal responsibility for the load passes entirely to the carrier at the point of collection from the site itself',
      'They must report the carrier to the police, but they may lawfully continue to use that same carrier for further loads until the police have completed their own investigation into the matter and closed it',
      'They are liable only in cases where the waste is later found to have been fly-tipped, and they commit no offence at all if the load is eventually delivered to a licensed disposal site of any kind at all',
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
      'The total energy in kilowatt-hours consumed by the site plant, equipment and welfare cabins during the construction phase of the works on site',
      'The area of land disturbed by the works, used to calculate the biodiversity net gain that the project will be required to deliver on completion',
      'The total greenhouse gas emissions associated with all activities and materials used throughout the project lifecycle, measured in CO2 equivalent',
      'The share of the project budget that is set aside for carbon offsetting, renewable energy measures and low-carbon materials at the tender stage of a job',
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
      'Embodied carbon relates to the energy used to heat, cool and light the building in use; operational carbon relates to the emissions from manufacturing and from transporting all of its materials to the site',
      'Embodied carbon is measured in kilowatt-hours of delivered energy in every year, whereas operational carbon is measured in tonnes of carbon dioxide equivalent that are released over the same period of time',
      'Embodied carbon applies only to domestic dwellings and to any extensions built onto them, whereas operational carbon applies solely to non-domestic buildings such as offices, schools and warehouses',
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
      'Horizontal-axis wind turbines',
      'Ground source heat pump arrays',
      'Solar thermal collector panels',
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
      'A certificate confirming that the electrical installation within a building has been inspected, tested and found to be safe to use in service',
      'The energy efficiency rating of a building on a scale from A (most efficient) to G (least efficient), along with recommendations for improvement',
      'The total amount of energy that a building may use each year before the owner of it becomes liable to pay the Climate Change Levy on it',
      'A measure of the embodied carbon within the materials of a building, expressed in tonnes of carbon dioxide equivalent for the whole of the building',
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
      'A device that burns natural gas far more completely than a conventional condensing boiler, reaching seasonal efficiencies of around 90% for both space heating and for domestic hot water',
      'An electric immersion heater that stores hot water in a heavily insulated cylinder overnight so that it can then be drawn off for washing and bathing during the periods of peak demand',
      'A device that pumps warm air around a building from a single central electric heater, giving even space heating in every single room without the need for any radiators at all',
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
      'The practice of treating all of the wastewater arising on site to drinking-water standard before any of it is discharged into the nearest watercourse or ditch',
      'The practice of collecting surface water runoff in attenuation tanks so that neighbouring land and property nearby are protected from any risk of flooding',
      'The practice of pumping groundwater out of deep excavations and then discharging it directly into the nearest available public foul sewer connection on the site',
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
      'Materials that are the cheapest option available on the market at the time of ordering, on the basis that the lowest purchase price always indicates the lowest environmental impact right across the entire supply chain',
      'Materials that have been sourced, manufactured, and can be used and disposed of in a way that minimises environmental impact, including materials that are renewable, recycled, locally sourced, or have low embodied carbon',
      'Materials that are imported from overseas suppliers, on the basis that manufacturers working abroad are always held to far stricter environmental standards than any producer that is based here in the United Kingdom',
      'Materials that are guaranteed to last for the entire life of a building, meaning that they never need to be maintained, replaced, recycled or sent for disposal at any point during the whole working life of the structure itself',
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
      'It sets requirements for fire safety, including means of escape, fire detection and alarm, and the fire resistance of the structural elements of a building',
      'It sets requirements for ventilation, including the supply of fresh air to occupied rooms and the extraction of moisture and stale air from buildings in use',
      'It sets requirements for the conservation of fuel and power in buildings, including energy efficiency standards for heating, lighting, and insulation',
      'It sets requirements for drainage and waste disposal, including foul water drainage, rainwater systems and the on-site storage of any solid waste',
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
      'A design approach that relies on highly efficient mechanical heating, cooling and ventilation plant to control the internal environment of a building right through the year',
      'A design approach that generates all of the energy a building needs on site using roof-mounted solar panels, small wind turbines and ground source heat pumps installed on the site',
      'A design approach that prioritises low-cost materials and rapid construction ahead of long-term energy performance and the running costs of the finished building over its life',
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
      'The amount of energy a material can store and release as heat, helping to regulate the temperature inside a building while in use',
      'The total amount of energy required to extract, process, manufacture, transport, and install a building material or product',
      'The energy consumed to heat, cool, and light a building over the whole course of its operational lifetime while in service',
      'The energy that can be recovered by incinerating a material at the end of its useful life in the finished building itself',
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
      'An international standard that specifies requirements for establishing and improving an environmental management system, helping organisations to control all of their own environmental impacts',
      'An international standard that specifies requirements for establishing and improving a quality management system, helping organisations to meet the requirements of their customers consistently',
      'An international standard that specifies requirements for establishing, implementing, and improving an energy management system, helping organisations systematically reduce energy consumption',
      'An international standard that specifies requirements for an occupational health and safety management system, helping organisations to reduce the risk of harm to their own workers on site',
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
      'They automatically switch off appliances whenever a household exceeds the daily energy allowance that has been allocated to it by the electricity supplier',
      'They generate a small amount of electricity from the mains supply of a building in order to offset the standby power drawn by appliances left switched on',
      'They rate the energy efficiency of a building on a scale from A to G in exactly the same way as an Energy Performance Certificate does for a dwelling',
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
      'Installing renewable energy technologies such as solar panels, battery storage and heat pumps before making any improvement to the insulation of the building',
      'Specifying natural fabric insulation materials such as sheep wool, hemp and wood fibre in preference to any synthetic alternative available on the market',
      'Designing the structural frame and the external cladding of a building before giving any consideration at all to its energy performance or its services',
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
      'An assessment that accounts only for the operational carbon emissions of a building during its in-use phase, covering the energy drawn by heating, cooling, lighting and equipment, but excluding entirely the materials that it is built from',
      'A comprehensive assessment that accounts for all greenhouse gas emissions over the entire life of a building, including embodied carbon (materials and construction), operational carbon (energy in use), and end-of-life carbon (demolition and disposal)',
      'An assessment that measures only the embodied carbon within the materials of a building at the point of its construction, covering extraction, manufacture, transport and installation, but excluding all of the energy that it uses in service',
      'An assessment that calculates the carbon savings achieved by a completed building compared with a notional reference building of exactly the same size and use, expressed as a percentage improvement on that baseline reference figure alone',
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
      'Collecting rainwater from the roofs and gutters of a building and storing it for later reuse in non-potable applications such as toilet flushing and garden irrigation',
      'Collecting and treating foul wastewater from toilets to a very high standard so that it can safely be reused for drinking, cooking and washing within the home',
      'Collecting and treating wastewater from baths, showers, washbasins, and washing machines for reuse in non-potable applications such as toilet flushing and garden irrigation',
      'Collecting and treating contaminated surface water runoff from a construction site so that it can be discharged safely into a nearby watercourse or ditch',
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
      'Increasing generation at power stations and imports across the interconnectors in order to match a sudden rise in consumer demand during the evening peak each day',
      'Supplying surplus renewable electricity back to the grid from domestic solar panels and from home battery systems that were charged overnight at a low unit rate',
      'Charging every consumer a higher unit rate for the electricity they use during periods of peak national demand on the transmission and the distribution network',
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
      'To certify that a product is completely carbon neutral over its life',
      'To replace the need for a construction phase plan on a project',
      "To provide verified environmental data about a product's lifecycle impacts",
      'To guarantee that a product meets all the Building Regulations',
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
      'Green graded base stone — it enhances the drainage of the concrete',
      'Glass-graded building sand — it improves the thermal insulation of concrete',
      'Ground granulated blast-furnace slag — it reduces the embodied carbon of concrete',
      'Galvanised grouted binding steel — it increases the tensile strength of concrete',
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
      'It is the UK Government body that issues felling licences and regulates all forestry operations here',
      'It is an alternative international forest certification scheme that endorses national certification programmes',
      'It is a stricter version of FSC certification that applies only to tropical hardwood timber imports',
      'It is a UK certification scheme that has replaced FSC for all timber sold anywhere within Great Britain',
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
      'An estimate of how long a building component will remain serviceable before replacement',
      'A financial appraisal of the maintenance costs incurred over the lifespan of a building',
      'A methodology for evaluating the environmental impacts of a product or system across its entire life',
      'A health and safety risk assessment covering every stage of the construction phase',
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
      'CLT is always the cheaper option, which reduces the financial carbon costs of a build',
      'CLT generates far more waste on site, which increases the recycling opportunities',
      'CLT has no environmental benefit at all; it is chosen only for aesthetic reasons',
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
      'Design specification, procurement, installation, and final commissioning',
      'Site planning, construction, operation, refurbishment, and demolition',
      'Raw material extraction, manufacturing, distribution, use, and disposal',
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
      'To prevent the spread of fire by keeping combustible dust away from any sources of ignition on site',
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
      'Acoustic noise barriers',
      'Temporary lighting towers',
      'Tree and hedgerow planting',
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
      'A Site Waste Management Plan (SWMP) for the whole project',
      'A Construction Phase Health and Safety Plan for the site',
      'An Environmental Product Declaration (EPD) for the works',
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
      'A guide on the control of dust and air quality on construction sites, published by Defra and Natural England',
      'A guide on the safe handling and disposal of hazardous waste, published by the local authority for construction sites',
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
      'The storage container must be fitted with a drainage valve at the base of the bund so that any rainwater can be released from it',
      'The storage container must be located at least 50 metres away from any watercourse, drain, or surface water gully on the site itself',
      'The storage container must be emptied and then removed from the site whenever it is not in active daily use on the project itself',
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
      'SuDS convey surface water away from a site faster than piped drainage, cutting the risk of flooding on the site',
      'SuDS reduce surface water runoff rates, improve water quality through natural filtration, and create habitat',
      'SuDS eliminate the need for any connection to the public sewer by storing all runoff permanently on site',
      'SuDS treat foul wastewater to drinking-water standard before any of it is discharged to a watercourse',
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
      'Construction Land Environmental Auditing',
      'Chemical Leachate Evaluation Appraisal',
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
      'Calculating the structural loads carried by the foundations of a building',
      'Identifying whether a contamination linkage exists that could cause harm',
      'Designing the electrical installation for a new building on a development site',
      'Determining the schedule of dilapidations at the end of a commercial lease',
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
      'Excavating contaminated soil and transporting it to a licensed landfill site for permanent disposal off the site',
      'Sealing contaminated soil beneath an impermeable capping membrane to prevent any contact with the receptors below',
      'Using biological organisms (such as bacteria or plants) to break down or remove contaminants from soil or groundwater',
      'Heating contaminated soil to a high temperature to destroy or drive off any of the contaminants that it holds in the ground',
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
      'A plan that sets out how homes built on a former industrial site will be marketed and sold to prospective buyers',
      'A legal agreement that settles a boundary dispute between two neighbouring landowners in a local court',
      'A financial plan for insuring a business against any claims for future pollution incidents on the site itself',
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
      'The current owner of the land is always solely liable for remediation, regardless of who actually caused the contamination',
      'The local authority always bears the whole cost of remediating all contaminated land within its own administrative area',
      'The cost of remediation is shared equally between the original polluter, the current owner, and central government each time',
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
      'A chamber fitted within a drainage run that separates out and retains any oil and fuel from the surface water runoff on a site',
      'A sealed underground tank that collects and stores foul wastewater for periodic removal from the site by a road tanker',
      'A shallow vegetated channel that conveys surface water across a site while filtering out any silt and other pollutants as it goes',
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
      'A fixed penalty notice of up to £1,000 issued on the spot by the Environment Agency, with no possibility of any custodial sentence being imposed',
      "Up to 12 months imprisonment and/or an unlimited fine in the magistrates' court, or up to 5 years and/or an unlimited fine in the Crown Court",
      'A formal caution for a first offence, with prosecution reserved for those who offend repeatedly at the same site or at the same premises',
      'A maximum fine of £20,000 in the magistrates\' court, with no power to imprison the offender in any circumstances whatever, however serious it is',
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
      'A set of protective clothing and respiratory equipment issued to workers who handle hazardous substances — required at every storage point on the site where they are used',
      'A drainage system that intercepts and treats contaminated surface water runoff — required wherever any site runoff could reach a watercourse or a surface water drain nearby',
      'A collection of absorbent materials and containment equipment for cleaning up oil, fuel, or chemical spills — required wherever such substances are stored or used',
      'A bunded storage container sized to hold 110% of the capacity of the tank inside it — required wherever oil, fuel or any other chemical is kept anywhere on the site',
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
      'To filter suspended sediment out of surface water runoff before any of it is discharged to a nearby watercourse',
      'To neutralise the alkalinity of concrete washout water before any of it enters the surface water drainage system',
      'To temporarily store surface water runoff and then release it at a controlled rate in order to prevent any flooding on site',
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
      'Testing the compressive strength of concrete cube samples',
      'Determining the fire resistance of structural elements',
      'Measuring the infiltration rate of soil for SuDS design',
      'Assessing the thermal performance of insulation materials',
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
      'The high acidity (pH 2-4) burns the gills of fish and dissolves the shells of the aquatic invertebrates',
      'The cement starves the water of oxygen by encouraging the rapid growth of algae and of bacteria in it',
      'The fine cement particles release toxic heavy metals such as lead and mercury directly into the water',
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
      'An intrusive site investigation using trial pits and boreholes to sample and analyse the soil and the groundwater beneath a site in detail',
      'A review of historical maps, records, and environmental data to assess the potential for land contamination before any intrusive investigation',
      'A long-term monitoring programme carried out to confirm that completed remediation works have remained effective over a great many years',
      'A detailed strategy setting out the methods, objectives and validation criteria for cleaning up any land that is already known to be contaminated',
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
      'Treating the contaminated soil where it lies, in the ground, without any excavation at all',
      'Sealing the contaminated soil beneath an impermeable cap in order to break the pollution pathway',
      'Excavating contaminated soil and treating it off-site or in a separate treatment area on site',
      'Diluting contaminated soil with clean imported material to reduce the contaminant concentrations',
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
      'To have a security guard monitor the excavation overnight to prevent any fly-tipping of waste into the open ground',
      'To have a structural engineer check the stability of excavation sides to prevent any collapse during the works on site',
      'To have a surveyor record the exact position and depth of all excavations for the as-built record drawings of the site',
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
      'It is the government adviser on the natural environment, responsible for issuing species licences and for designating any protected sites in England',
      'It is the regulator that enforces occupational health and safety law and investigates any serious accidents that happen on construction sites',
      'It is the local authority department that grants planning permission and approves the construction phase plan for every new project in its own local area',
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
      'Spraying water on a site to suppress dust — risk of the run-off carrying silt and other contaminants into the site drains',
      'Pumping groundwater or surface water from excavations — risk of polluting watercourses with sediment or contaminants',
      'Recycling wash water from wheel-washing facilities — risk of recirculating oil and fuel residues around the site',
      'Mixing water into excavated soil to improve its handling — risk of leaching the contaminants down into the ground below',
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
      'A sealed paved surface that channels all of the rainwater falling on it to a central gully that is connected to the public foul sewer system',
      'A shallow vegetated channel laid alongside a paved surface to convey and to filter the surface water that runs off it into a nearby surface water drain',
      'A paved surface that allows rainwater to drain through the surface into a sub-base where it is stored and gradually released or infiltrated',
      'An underground tank beneath a paved surface that permanently retains every single drop of the rainwater that falls onto it, releasing none of it',
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
      'A permanent ornamental pond created on a development site to deliver biodiversity net gain and some amenity value',
      'A bunded compound where oil and fuel containers are stored to contain any spillage or leakage from them',
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
      'Farmed livestock, domesticated pets, and commercial game species',
      'Wild birds, certain wild animals and plants, and their habitats',
      'Bats, otters, and great crested newts, but no other wild species',
      'Ancient woodland, hedgerows, and trees under preservation orders',
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
      'Only rare bat species are protected; common species such as the pipistrelle may be disturbed on site without a licence at all',
      'Bats are protected only while roosting; their roosts may be destroyed once the bats have left them for the winter months each year',
      'All bat species and their roosts are fully protected — it is an offence to disturb, injure, or kill bats or damage their roosts',
      'Bats are protected only on designated sites such as SSSIs; elsewhere they have no legal protection of any kind at all on any site',
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
      'A 50% increase in green space — required only within national parks and protected landscapes',
      'A 25% increase in tree planting — required only for large commercial developments in England',
      'A 5% increase in habitat area on site — required for all developments regardless of their size',
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
      'By measuring only the total area of green space provided, regardless of the habitat type or its condition',
      'By the number of protected species recorded on the site during a preliminary ecological appraisal of the whole site',
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
      'A building regulation that sets minimum energy efficiency standards for both new and existing buildings across England',
      'An energy efficiency rating scheme that grades buildings from A to G when they are built, sold, or rented out',
      'A certification scheme that verifies the sustainability of timber and of other forest products from managed forests',
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
      'Bronze, Silver, Gold, Platinum, Diamond, Elite',
      'Level 1, Level 2, Level 3, Level 4, then Level 5',
      'Basic, Standard, Enhanced, Premium, Superior, Elite',
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
      'A sustainability rating scheme for new and existing buildings such as homes, offices, and schools alike',
      'A sustainability assessment, rating, and awards scheme for civil engineering and infrastructure projects',
      'A standard for managing the whole life carbon in buildings and infrastructure published by the BSI',
      'An energy efficiency rating scheme that grades civil engineering projects from A down to G on their completion',
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
      'A piece of software that automatically monitors and controls a building\'s heating, lighting, and ventilation systems',
      'A legal permit issued by the Environment Agency authorising an organisation to carry out polluting activities',
      'A one-off audit carried out to check whether an organisation complies with all environmental legislation that applies',
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
      'A detailed species survey carried out at night to confirm the presence or the absence of bats and of great crested newts on the site',
      'A final monitoring report confirming that ecological mitigation and habitat creation measures have been successful over a period of time',
      'A desk study reviewing historical maps and records to assess the potential for land contamination on a particular development site',
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
      'A licence issued by the Environment Agency permitting the discharge of treated wastewater into a watercourse that lies near a protected site',
      'A planning consent allowing development to proceed on a Site of Special Scientific Interest without any further ecological survey being needed',
      'A licence granted by Natural England that allows otherwise prohibited activities affecting European Protected Species, subject to strict conditions',
      'A registration allowing low-risk ecological survey work to be carried out without a full preliminary ecological appraisal of the whole development site',
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
      'A completed ecological survey, a written mitigation plan approved by the ecologist, and payment of the correct licence fee to Natural England first',
      'Planning permission already granted, a biodiversity net gain of at least 10%, and a habitat management plan lasting for at least 30 years',
      'No risk to human health, no breach of the waste duty of care, and no detriment at all to controlled waters or to the air quality in the local area',
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
      'A requirement for developers to obtain a separate great crested newt licence from every local authority district in which they carry out any works at all on a development site',
      'A scheme requiring every pond lying within 500 metres of a development to be surveyed individually before any of the works can begin anywhere on the development site itself',
      'A strategic licensing approach where developers pay into a fund that delivers habitat compensation at a landscape scale, avoiding the need for individual site surveys',
      'A blanket exemption allowing great crested newts to be moved off a development site without any licence at all within the participating local authority district areas concerned',
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
      'A legal agreement securing the management of the land for conservation purposes for at least 30 years',
      'A survey report recording the habitats and protected species present on a particular development site',
      'A calculation of the biodiversity units gained or lost as a result of a proposed new development on the site',
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
      'To calculate the number of biodiversity units that a development must deliver in order to satisfy its own net gain planning condition on final completion',
      'To identify, quantify, and evaluate the potential ecological effects of a development, and to recommend avoidance, mitigation, and compensation measures',
      'To monitor the habitats and species populations on a completed development for a period of at least thirty years after the practical completion date',
      'To assess the risk that land contamination poses to ecological receptors before any intrusive site investigation work is carried out on the site itself first',
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
      'Construction Industry Environmental Engineering Measurements',
      'Chartered Institution of Energy and Environmental Monitoring',
      'Chartered Institute of Ecology and Environmental Management',
      'Certified Inspectors of Electrical and Environmental Materials',
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
      'Compensate, mitigate, avoid — used in that order of preference',
      'Survey, licence, monitor — applied in that order of preference',
      'Mitigate, compensate, then avoid — applied in that order of preference',
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
      'A night-time torchlight survey in which newts are counted along the margins of a pond during the whole breeding season',
      'A trapping survey using bottle traps set overnight in a pond to capture and to count all the individual newts',
      'A habitat suitability index survey that scores a pond on factors such as its water quality, shade, and fish presence',
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
      'A site designated under the Habitats Regulations for the rare European habitats and the breeding species that it supports on the site',
      'A site designated under the Wildlife and Countryside Act 1981 for its outstanding wildlife, geological, or physiographical features',
      'A site where habitat is created in advance so that biodiversity units can be generated and then sold on to other developers elsewhere',
      'A privately owned nature reserve managed under a voluntary conservation covenant for a fixed minimum period of some thirty years or more',
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
      'An assessment of the habitats present on any site before a Preliminary Ecological Appraisal is carried out on the site',
      'An assessment required for any development that could affect a nearby designated Site of Special Scientific Interest (SSSI)',
      'An assessment required for any plan or project likely to have a significant effect on a European designated site (SAC or SPA)',
      'An assessment of the biodiversity net gain delivered by a development against its own pre-development baseline figure for the site',
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
      'The natural migration of animals between habitats in response to the changing seasons or to the availability of their food supply',
      'The deliberate, planned movement of living organisms from one location to another, typically as a conservation or mitigation measure',
      'The fragmentation of a habitat by development, which isolates the remaining populations of animals and plants from one another entirely',
      'The introduction of a non-native invasive species into the wild, which is an offence under the Wildlife and Countryside Act 1981 in the UK',
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
      'Natural England is the principal regulator responsible for preventing the pollution of water, land and air, and for issuing environmental permits to all site operators right across England',
      'Natural England is the professional body that sets competence standards for practising ecologists and publishes the guidelines that are used for all ecological impact assessment work in the UK',
      "Natural England is the government's statutory adviser on the natural environment, responsible for issuing species licences, designating protected sites, and advising on ecological matters",
      'Natural England is the central government department responsible for setting national policy on agriculture, fisheries, food, forestry, flooding and rural affairs right across the whole of England',
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
      'An eDNA water sample taken from each of the ponds lying within 500 metres of the site boundary in the spring',
      'A single daytime walkover survey mapping only the habitats immediately around the building to be demolished',
      'A desk study of historical biological records alone, with no inspection of the building itself at any stage at all',
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
      'A local authority officer who inspects completed developments to confirm that the required biodiversity net gain has actually been delivered',
      'A Natural England official who decides whether a European Protected Species licence should be granted for a proposed new development on a given site',
      'An ecologist who carries out the preliminary ecological appraisal of a site before any planning application at all has been submitted for the site',
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
      'To exclude all wildlife from a development site for the whole of the construction phase, preventing any disturbance at all to the protected species living on it',
      'To maintain ecological connectivity by including features such as hedgehog gaps (13cm x 13cm) that allow small mammals to move between gardens and habitats',
      'To provide a visual screen of native planting that improves the amenity value of a completed development for the residents who will be living there afterwards',
      'To stop invasive species such as Japanese knotweed from spreading between neighbouring properties along the boundary line of any neighbouring development site',
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
      'A planning condition requiring a developer to deliver at least a 10% net gain in the biodiversity value of the whole site on completion',
      'A licence granted by Natural England allowing a developer to relocate any protected species from a development site close by',
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
      'A scheme where a developer must deposit a financial bond with the local authority that is repaid once the habitat has been created on the development site',
      'A register held by Natural England that records the location of every protected habitat and species population found right across the whole of England every year',
      'A process where habitats are lifted from a development site and stored at a receptor site for later reinstatement once the works on site have all been finished',
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
      'The legal and regulatory requirements an organisation must comply with under the environmental legislation that applies to each of its own sites',
      "Elements of an organisation's activities, products, or services that interact with the environment and have a significant environmental impact",
      'The objectives and targets an organisation sets for itself in order to improve its own environmental performance year on year at each of its sites',
      'The external factors, such as climate, geology and location, that affect the environmental performance of a site or of the buildings standing on it',
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
      'Biodiversity units that a developer earns for delivering more than the 10% net gain that is required on their own site, which can then be carried forward',
      'Tradable allowances issued by the government that permit a developer to emit a fixed tonnage of greenhouse gases during the construction phase of works',
      'Credits that developers can purchase from the government as a last resort to meet their BNG obligation when on-site and off-site options have been exhausted',
      'Units that a landowner generates by creating new habitat in advance and then sells them directly to developers on the open market at an agreed price each time',
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
      'A written method statement setting out the ecological survey work to be carried out on the site before any development work begins',
      'A formal training course that qualifies site workers to handle and relocate protected species safely on the site themselves',
      'A signed agreement in which workers accept personal liability for any harm that is caused to protected species on the site at any time',
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
      'To carry out a final preliminary ecological appraisal of the whole site once the development has been completed and formally handed over to the client at the end',
      'To calculate the biodiversity net gain that the development will be required to deliver under the Environment Act 2021 before any of the works start out on site',
      'To identify the protected species present on the site so that a European Protected Species licence can be obtained before any demolition work begins on it',
    ],
    correctAnswer: 0,
    explanation:
      'Post-construction ecological monitoring is essential to verify that mitigation, compensation, and enhancement measures are achieving their intended outcomes. This includes checking that newly created habitats are establishing and maturing, that translocated species are surviving and breeding, that wildlife features (such as bat and bird boxes) are being used, and that management prescriptions are being followed. Under biodiversity net gain, monitoring must continue for at least 30 years, with results reported to the local planning authority.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Ecological monitoring',
    category: 'Biodiversity & Best Practice',
  },
  {
    id: 201,
    question:
      'When planning a rewire, which stage of the waste hierarchy should be considered before all the others?',
    options: [
      'Preventing waste by ordering only what the job needs',
      'Recycling the offcuts through a licensed contractor',
      'Recovering energy from the waste at an incinerator',
      'Disposing of the surplus in a general site skip',
    ],
    correctAnswer: 0,
    explanation:
      'The waste hierarchy runs prevention, preparing for reuse, recycling, other recovery, then disposal. Waste that is never created costs nothing to move, sort or tip, so accurate take-off and ordering sits at the top. Recycling is a good answer but it is lower down the hierarchy: it still needs transport, sorting and reprocessing, so it is only the best option once prevention and reuse have been ruled out.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Waste Hierarchy',
    category: 'Waste Management',
  },
  {
    id: 202,
    question: 'What does the abbreviation WEEE stand for in waste terms?',
    options: [
      'Wired Electrical and Engineered Equipment',
      'Wasted Energy in Electrical Enclosures',
      'Waste Electrical and Electronic Equipment',
      'Works Electrical Emissions and Effluent',
    ],
    correctAnswer: 2,
    explanation:
      'WEEE means Waste Electrical and Electronic Equipment, and it covers anything with a plug, a battery or a circuit that has reached end of life, from luminaires to consumer units to test instruments. The wasted energy option is a common mix-up because electricians meet the word energy so often, but WEEE is a waste stream, not an efficiency measure, and it exists so that materials are recovered rather than landfilled.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'WEEE',
    category: 'Waste Management',
  },
  {
    id: 203,
    question:
      'How should old fluorescent tubes removed during a lighting upgrade be handled on site?',
    options: [
      'Broken into the skip so they take up less space',
      'Kept whole and sent for separate hazardous recycling',
      'Placed loose in the general construction waste skip',
      'Left on site for the client to put in the wheelie bin',
    ],
    correctAnswer: 1,
    explanation:
      'Fluorescent tubes contain mercury and phosphor powder, so they are handled as a separate hazardous stream and are kept intact in tube boxes or coffins until a licensed recycler collects them. Breaking them into the skip is the worst choice because it releases mercury vapour and dust straight into the breathing zone of whoever is standing over the skip, and it contaminates the whole load.',
    section: 'environmental-sustainability',
    difficulty: 'basic',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 204,
    question:
      'A contractor pays a man with a van to clear strip-out waste without checking his details, and the load is later fly-tipped. What is the position of the contractor?',
    options: [
      'Responsibility ended the moment the waste left the site',
      'Responsibility remains because the carrier was not checked',
      'Responsibility passed to the driver once payment was made',
      'Responsibility sits with the landowner where it was tipped',
    ],
    correctAnswer: 1,
    explanation:
      'The waste duty of care follows the waste, not the van. The producer must check that the carrier is authorised, describe the waste accurately and keep the paperwork, and failing to do that leaves the producer answerable for where the load ended up. Believing responsibility ends at the gate is the classic error: handing waste over transfers possession, but it does not transfer the duty owed for its safe and lawful destination.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Duty of Care',
    category: 'Waste Management',
  },
  {
    id: 205,
    question:
      'Why does a skip of mixed strip-out waste usually cost more and recover less than segregated skips?',
    options: [
      'Mixed loads need sorting at the transfer station before recovery',
      'Mixed loads are always classed as hazardous waste on arrival',
      'Mixed loads are charged by volume rather than by weight only',
      'Mixed loads must be weighed twice before they can be accepted',
    ],
    correctAnswer: 0,
    explanation:
      'Once copper, steel, plastic, plasterboard and packaging are tipped together, the operator has to pay people and plant to pull them apart again, and material that has been contaminated by dust or damp gypsum may no longer be worth reprocessing. That handling cost comes back as a higher gate fee. Calling every mixed load hazardous is wrong: mixing does not automatically make waste hazardous, it simply makes it expensive to separate and easy to spoil.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Waste Segregation',
    category: 'Waste Management',
  },
  {
    id: 206,
    question:
      'During a commercial strip-out you remove LED panels that are only two years old and fully serviceable. What does the waste hierarchy point to first?',
    options: [
      'Offer them for reuse in another installation or a reuse scheme',
      'Send them straight to a WEEE recycler for material recovery',
      'Store them until the next general skip is ordered for the site',
      'Break them down on site to separate the aluminium housings',
    ],
    correctAnswer: 0,
    explanation:
      'Preparing for reuse sits above recycling, so a working luminaire that can go into another job, a charity refit or a reuse scheme keeps its full value and avoids the energy of remanufacture. Sending them to a WEEE recycler feels responsible and is far better than a skip, but it destroys a finished product to win back raw material, which is exactly the step the hierarchy asks you to avoid while the item still works.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Reuse Before Recycling',
    category: 'Waste Management',
  },
  {
    id: 207,
    question:
      'Which item removed during a domestic rewire is most likely to be classed as hazardous waste?',
    options: [
      'A length of twin and earth cable cut from the old circuits',
      'An old sealed lead acid battery from an alarm panel',
      'A plastic consumer unit enclosure with no components',
      'A cardboard box that the new accessories arrived in',
    ],
    correctAnswer: 1,
    explanation:
      'Lead acid batteries contain lead and sulphuric acid, so they are a hazardous stream and go to a battery recycler rather than a mixed skip. Old cable is the tempting answer because it looks like dirty waste, but copper with PVC insulation is one of the most valuable recyclable streams on any job and is not hazardous, which is why cable is worth stripping into its own container rather than skipping.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 208,
    question:
      'You are core drilling with water suppression in a plant room. Where should the resulting slurry go?',
    options: [
      'Into the nearest surface water drain once it has settled',
      'Collected and disposed of through the agreed waste route',
      'Hosed across the yard so that it spreads out and dries off',
      'Flushed into the foul drain because it is mostly just water',
    ],
    correctAnswer: 1,
    explanation:
      'Cutting slurry is highly alkaline and carries fine cementitious solids, so it is contained at the point of work and removed as a controlled waste. A surface water drain is the trap here because it looks like the obvious place for water, but surface water usually discharges straight to a watercourse with no treatment, so tipping slurry into it is a pollution incident even after the solids have settled.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Pollution Prevention',
    category: 'Pollution Prevention',
  },
  {
    id: 209,
    question:
      'In the current edition of BS 7671, where do energy efficiency considerations for an installation now sit?',
    options: [
      'In Appendix 17, which remains the informative energy annex',
      'In Chapter 81 within the new Part 8 on functional aspects',
      'In Chapter 82, which deals only with prosumer installations',
      'In Part 6, alongside the requirements for periodic testing',
    ],
    correctAnswer: 1,
    explanation:
      'Appendix 17 has been deleted and its subject matter now appears as Chapter 81, energy efficiency, inside Part 8 on functional aspects. Answering Appendix 17 is understandable if you learned the earlier amendment, but that appendix no longer exists, so a specification or design note that cites it is quoting a withdrawn reference. Chapter 82 in the same part covers prosumer installations, which is a different subject.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Energy Efficiency',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 210,
    question:
      'What does Chapter 81 of BS 7671 mainly do for the designer of an installation?',
    options: [
      'Sets mandatory efficiency classes for every final circuit',
      'Signposts the Building Regulations and BS HD 60364-8-1',
      'Removes the need to consider lighting controls entirely',
      'Requires a written energy audit before any work can start',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 81 is informative and points the reader to the Building Regulations for England and Wales, Scotland and Northern Ireland, and to BS HD 60364-8-1 for the detailed functional requirements on energy efficiency. Reading it as a set of mandatory efficiency classes overstates it: the enforceable efficiency duties for a building come from the Building Regulations, and Chapter 81 exists to make sure the designer goes and looks at them.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Energy Efficiency',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 211,
    question:
      'A licensed contractor has removed and bagged asbestos insulating board found behind an old distribution board. How must that waste be moved around and off the workplace?',
    options: [
      'Double bagged, then carried openly to the yard for collection',
      'Single bagged and placed with the general construction waste',
      'Sealed, labelled and moved in a totally enclosed distribution system',
      'Wrapped in polythene and left outside for the next skip run',
    ],
    correctAnswer: 2,
    explanation:
      'The asbestos regulations require that raw asbestos and asbestos waste is not stored, received, despatched or distributed within a workplace except in a totally enclosed distribution system, and it must be properly packaged and labelled. Carrying bags openly across the yard fails that test even if the bagging itself is sound, because an unenclosed route allows a split bag to release fibres across ground that other trades then walk over.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 212,
    question:
      'Why is electrical equipment kept out of the general waste stream at the end of its life?',
    options: [
      'Because it is bulkier than most other construction waste',
      'Because it is always classed as clinical waste by weight',
      'Because it cannot be transported on the public highway',
      'Because it holds recoverable metals and harmful substances',
    ],
    correctAnswer: 3,
    explanation:
      'Electrical equipment contains copper, aluminium, steel and small quantities of precious metals worth recovering, alongside substances such as mercury, lead and flame retardants that must not be landfilled loose. Bulk is not the reason: plenty of bulky waste goes into a general skip quite lawfully, so it is the material content, not the size of the item, that puts electrical equipment into its own controlled route.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'WEEE',
    category: 'Waste Management',
  },
  {
    id: 213,
    question:
      'Why does the waste duty of care require an accurate written description of waste when it is handed over?',
    options: [
      'So the next holder can handle, treat and tip it lawfully',
      'So the skip company can decide which colour skip to send',
      'So the client can be recharged the correct disposal cost',
      'So the driver knows which gate to use at the tip entrance',
    ],
    correctAnswer: 0,
    explanation:
      'Everyone in the chain relies on the description to decide whether they are permitted to accept the load, how to store it and where it can lawfully go, which is why a vague entry such as builders waste on a load containing lamps and batteries breaks the chain. Recharging the client is a real commercial benefit, but it is a by-product: the legal purpose of the description is safe and lawful onward handling.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Duty of Care',
    category: 'Waste Management',
  },
  {
    id: 214,
    question:
      'Chasing walls with water suppression produces a dust laden run-off. Aside from the breathing risk from crystalline silica, why must that run-off be contained?',
    options: [
      'Because fine solids and alkalinity harm drains and watercourses',
      'Because water used on a site must be metered before it is used',
      'Because damp dust is heavier and so becomes harder to sweep up',
      'Because the run-off would otherwise cool the chaser motor down',
    ],
    correctAnswer: 0,
    explanation:
      'Water suppression solves the health problem by wetting the dust, but it converts an airborne hazard into a liquid one: the run-off carries fine cementitious solids and is strongly alkaline, which blocks drains and kills aquatic life if it reaches a watercourse. Treating the wetted dust as merely a housekeeping nuisance is the trap, because the environmental risk starts exactly where the health control ends.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Pollution Prevention',
    category: 'Pollution Prevention',
  },
  {
    id: 215,
    question:
      'A wholesaler delivers cable on timber drums and accessories in cardboard cartons. Which handling is most environmentally sound?',
    options: [
      'Burn the cardboard on site and keep the drums for benches',
      'Skip both together to save trips back to the wholesale branch',
      'Leave the drums with the client and skip all of the cardboard',
      'Return the drums to the wholesaler and bale up the cardboard',
    ],
    correctAnswer: 3,
    explanation:
      'Cable drums are a returnable asset that the wholesaler reconditions and refills, so sending them back is reuse rather than recycling, and baled clean cardboard is a saleable recyclate instead of a skip charge. Burning cardboard on site is the answer to avoid outright: it releases smoke and particulates, risks fire spread and destroys a material that has a ready recycling route.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Materials and Packaging',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 216,
    question:
      'A strip-out yields several hundred metres of sound galvanised tray and trunking. Which action best reflects the waste hierarchy?',
    options: [
      'Cut it into short lengths so more of it fits into the skip',
      'Set aside sound lengths for reuse and scrap only the rest',
      'Send the whole lot to the scrap merchant as mixed metal',
      'Leave it in place because removal costs more than it saves',
    ],
    correctAnswer: 1,
    explanation:
      'Straight, undamaged containment is a finished product that can be refitted on the next job, so keeping it whole preserves the manufacturing energy already invested and only the bent or corroded sections drop to the scrap route. Sending everything to the scrap merchant looks responsible because the steel is recycled, but melting a usable length back to raw metal is a step down the hierarchy and loses most of its value.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Reuse Before Recycling',
    category: 'Waste Management',
  },
  {
    id: 217,
    question:
      'Which measure most directly reduces the energy that an office lighting installation consumes in use?',
    options: [
      'Increasing the cable size to cut the volt drop on the run',
      'Fitting presence detection and zonal control to the circuits',
      'Replacing the MCBs with devices of a lower rated current',
      'Moving the distribution board closer to the luminaire rows',
    ],
    correctAnswer: 1,
    explanation:
      'Presence detection and zonal control cut the hours that luminaires burn in empty or daylit areas, and that run time is what drives consumption once efficient lamps are already fitted. Upsizing the cable is the attractive distractor because it genuinely lowers conductor losses, but those losses are a very small fraction of lighting energy, so it can never match switching off lights nobody is using.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Energy Efficiency',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 218,
    question: 'Chapter 82 of Part 8 in BS 7671 is concerned with what subject?',
    options: [
      'Prosumer installations that both consume and generate energy',
      'Periodic inspection intervals for commercial installations',
      'Protective device selection for high fault level supplies',
      'Special locations such as swimming pools and sauna heaters',
    ],
    correctAnswer: 0,
    explanation:
      'Part 8 covers functional aspects, with Chapter 81 on energy efficiency and Chapter 82 on prosumer electrical installations, meaning premises that both take energy from the network and produce it locally through generation or storage. Periodic inspection is the plausible wrong answer because it sounds like an operational subject, but it belongs to Part 6 on inspection and testing, not to Part 8.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 219,
    question:
      'Before a subcontractor removes waste from your site, which check gives the strongest assurance that the duty of care is met?',
    options: [
      'That the vehicle is taxed and shows a company name on it',
      'That the price quoted is in line with other local firms',
      'That the carrier is registered and the paperwork completed',
      'That the driver has worked on the site earlier in the week',
    ],
    correctAnswer: 2,
    explanation:
      'Confirming the carrier is registered to move that waste and completing an accurate transfer record is the evidence that the duty of care was discharged, and it is the first thing an enforcement officer asks to see if the load turns up in a lane. Signage on the vehicle proves nothing at all: a name and a phone number can be a magnetic panel, and it says nothing about registration or destination.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Duty of Care',
    category: 'Waste Management',
  },
  {
    id: 220,
    question:
      'A site generator supplying temporary power leaks diesel onto hardstanding beside a gully. What is the correct immediate response?',
    options: [
      'Wash the spill down with a hose so it disperses in the rain',
      'Cover the spill with sand and sweep it into the gully later',
      'Report it at the end of the shift so work is not disrupted',
      'Stop the leak, block the gully and absorb with a spill kit',
    ],
    correctAnswer: 3,
    explanation:
      'Stopping the source, protecting the drain and soaking up the fuel in that order keeps the oil out of the water, and the used absorbent then leaves site as a contaminated waste. Hosing the spill is the instinctive reaction and the most damaging one, because water does not remove the oil, it simply carries a thin film into the drainage system where a small spill becomes a reportable pollution incident.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Pollution Prevention',
    category: 'Pollution Prevention',
  },
  {
    id: 221,
    question:
      'An emergency lighting upgrade fills several boxes with used compact fluorescent lamps. Why are these collected separately from other electrical waste?',
    options: [
      'They are lighter and so distort the weight of the load',
      'They cannot lawfully be moved by a registered waste carrier',
      'They contain mercury which is released if the glass breaks',
      'They are made of glass which no recycler is able to process',
    ],
    correctAnswer: 2,
    explanation:
      'Gas discharge lamps rely on a small mercury charge, and mercury is a neurotoxin that affects the central nervous system, so intact collection in dedicated containers keeps the vapour and phosphor powder contained until specialist treatment. The glass answer is wrong in both halves: lamp glass is readily processed once separated, and it is the mercury rather than the glass that drives the separate route.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 222,
    question: 'Which sequence sets out the waste hierarchy in the correct order?',
    options: [
      'Recycling, prevention, reuse, other recovery, then disposal',
      'Reuse, prevention, disposal, recycling, then other recovery',
      'Disposal, recovery, recycling, reuse, then prevention last',
      'Prevention, reuse, recycling, other recovery, then disposal',
    ],
    correctAnswer: 3,
    explanation:
      'The hierarchy runs prevention, preparing for reuse, recycling, other recovery such as energy from waste, and disposal as the last resort. Putting recycling at the top is the most common slip because recycling is the step people see and talk about most, but recycling still consumes energy to collect and reprocess, so it only becomes the right answer once the item cannot be avoided or reused.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Waste Hierarchy',
    category: 'Waste Management',
  },
  {
    id: 223,
    question:
      'A labourer tips one box of used lamps into an otherwise clean skip of inert waste. What is the practical consequence?',
    options: [
      'The load is unchanged because the quantity is very small',
      'The load may be rejected or reclassified and charged more',
      'The load must be weighed again before it leaves the site',
      'The load becomes exempt from the transfer note paperwork',
    ],
    correctAnswer: 1,
    explanation:
      'A hazardous item contaminates whatever it is mixed with, so a clean inert load can be turned away at the gate or re-graded to a higher charge band, and the recyclable value of the rest is lost. Assuming a small quantity is harmless is the trap, because classification follows what the load contains rather than how much of it there is, and one box is enough to change the description of the whole skip.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Waste Segregation',
    category: 'Waste Management',
  },
  {
    id: 224,
    question:
      'BS HD 60364-8-1, referenced by Chapter 81, goes beyond efficient equipment to cover which further aspect of an installation?',
    options: [
      'The colour coding used for identifying conductors on site',
      'The maximum permitted length of a final ring circuit run',
      'Local production and storage of energy within the premises',
      'The frequency of insulation resistance tests after handover',
    ],
    correctAnswer: 2,
    explanation:
      'The harmonised document sets out requirements, measures and recommendations for the design, erection, operation and verification of low voltage installations, expressly including local production and storage of energy, which is why it sits alongside the prosumer material in Part 8. Conductor identification is a tempting pick because it also concerns the whole installation, but it is a safety and identification matter dealt with elsewhere.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Energy Efficiency',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 225,
    question:
      'Which ordering decision does most to cut material waste on a large containment installation?',
    options: [
      'Ordering standard lengths and setting out to suit them',
      'Ordering extra so nobody has to wait for a further call',
      'Ordering from the branch that offers the deepest discount',
      'Ordering everything on day one to keep the site tidy later',
    ],
    correctAnswer: 0,
    explanation:
      'Designing the setting out around the lengths that are actually manufactured means fewer cuts, shorter offcuts and less scrap heading for the metal skip, which is prevention at the top of the hierarchy. Ordering extra feels like good site management and does avoid downtime, but surplus that never gets fitted usually ends up damaged, buried in a container or skipped at the end of the job.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Materials and Packaging',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 226,
    question:
      'Where should water used to wash out tools and buckets on a fit-out be emptied?',
    options: [
      'Down the nearest external gully once the solids have sunk',
      'Into a designated wash-out point or a suitable container',
      'Onto soft ground away from the building so it soaks away',
      'Into the site toilet cistern to save on the water charge',
    ],
    correctAnswer: 1,
    explanation:
      'Wash water carries cement, fillers and solvent residues, so it goes to a controlled wash-out point or a container for proper disposal rather than any drain. Soaking it into soft ground is the answer that sounds natural and is still wrong, because contaminants pass through the soil into groundwater, and an unauthorised discharge to ground is treated as seriously as one to a watercourse.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Pollution Prevention',
    category: 'Pollution Prevention',
  },
  {
    id: 227,
    question:
      'A site runs a waste segregation plan with separate skips. What is the most useful thing an electrician can do to support it?',
    options: [
      'Wait for the site manager to sort the skips at the end',
      'Use a single skip and let the operator separate it later',
      'Keep cable, cardboard and lamps in separate labelled bins',
      'Ask for a bigger skip so nothing has to be compacted down',
    ],
    correctAnswer: 2,
    explanation:
      'Segregation only works at the point where the waste is generated, so small labelled bins at the work face keep each stream clean and make the skip discipline effortless. Relying on the operator to separate the load afterwards is where segregation plans die, because once dust, damp plasterboard and packaging have mixed, the material can no longer be pulled back out at a sensible cost.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Site Waste Practice',
    category: 'Environmental Awareness',
  },
  {
    id: 228,
    question:
      'Sealed batteries removed from a central battery emergency lighting system are stacked on a pallet in the yard. What is the main environmental concern?',
    options: [
      'Damaged cells can leak electrolyte onto ground and drains',
      'The pallet will obstruct the loading area for other trades',
      'The batteries will lose their remaining charge over time',
      'The stack may exceed the safe working load of the pallet',
    ],
    correctAnswer: 0,
    explanation:
      'Batteries hold acid or alkaline electrolyte and heavy metals, so a cracked case in an open yard puts a corrosive, metal bearing liquid onto hardstanding that usually drains to a surface water gully. Obstruction and pallet loading are genuine site safety issues, but the question asks about environmental impact, and only the leak places a pollutant into the drainage system.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 229,
    question:
      'Why are the capacitors in some older fluorescent fittings treated as a separate hazardous item rather than as general electrical waste?',
    options: [
      'They may hold a residual charge that trips the skip scales',
      'They are made of aluminium which contaminates steel scrap',
      'They are sealed units that recyclers will not accept at all',
      'They may hold PCB fluid which is a persistent pollutant',
    ],
    correctAnswer: 3,
    explanation:
      'Capacitors in older luminaires can be filled with polychlorinated biphenyls, which persist in the environment, accumulate in living tissue and demand specialist destruction rather than ordinary recycling. Residual charge is a real hazard when handling capacitors and it deserves respect, but it is a shock risk to the person working on the fitting, not the reason the item leaves site by a controlled route.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 230,
    question:
      'What does it mean to say an electrician remains a waste producer with duties that continue after collection?',
    options: [
      'The producer must store the waste until it is fully recycled',
      'The producer must take reasonable steps to check where it goes',
      'The producer must transport all waste in their own vehicle',
      'The producer must obtain a permit before any work can begin',
    ],
    correctAnswer: 1,
    explanation:
      'The producer has to satisfy themselves that the waste is handed to an authorised person, described properly and bound for a lawful destination, and keep the record that shows it. The idea that everything must be moved in your own vehicle is a misreading: using a carrier is entirely normal, and the duty is about checking that the carrier is authorised rather than about doing the haulage yourself.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Duty of Care',
    category: 'Waste Management',
  },
  {
    id: 231,
    question:
      'A three phase distribution board is removed during a strip-out. What is the correct end of life route for it?',
    options: [
      'General skip because the enclosure is only painted steel',
      'Scrap metal skip after the busbars are cut out on site',
      'A WEEE route so components and metals are recovered',
      'Left with the client because it remains their property',
    ],
    correctAnswer: 2,
    explanation:
      'A distribution board is electrical equipment complete with protective devices, so it goes down the WEEE route where the devices, copper busbar and steel are separated and recovered under controlled conditions. The scrap metal skip is the plausible wrong answer because the enclosure really is recyclable steel, but stripping it on site destroys reusable devices and leaves plastics and small components going wherever the metal goes.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'WEEE',
    category: 'Waste Management',
  },
  {
    id: 232,
    question:
      'How does a prosumer installation with photovoltaic generation and battery storage reduce the impact of a building?',
    options: [
      'It removes the need for any protective devices on supply',
      'It lowers the current rating needed for every final circuit',
      'It displaces imported energy and shifts demand off peak',
      'It guarantees that the building becomes carbon neutral',
    ],
    correctAnswer: 2,
    explanation:
      'Generating on site means less energy is drawn from the network, and storage lets that energy be used when the building needs it rather than when the sun provides it, easing demand at the times when the most carbon intensive plant runs. Claiming carbon neutrality overreaches: the building still imports at times, and the panels, cells and inverter all carry an embodied impact of their own.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Prosumer Installations',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 233,
    question:
      'A ventilation fan runs at full speed all day from a fixed supply. Which change cuts its energy use the most?',
    options: [
      'Fitting a larger cable to the fan to reduce the losses',
      'Fitting a lower rated fuse in the supply to the fan unit',
      'Fitting an isolator closer to the fan for easier access',
      'Fitting a variable speed drive matched to actual demand',
    ],
    correctAnswer: 3,
    explanation:
      'A drive lets the fan run only as fast as the building needs, and because fan power falls steeply as speed drops, even a modest reduction in speed produces a large saving over a year. Fitting a lower rated fuse changes nothing about consumption at all: protective devices limit fault and overload current, they do not throttle the load, and undersizing one simply causes nuisance operation.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Energy Efficiency',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 234,
    question:
      'When estimating the annual energy use of an installation, which factor is most often overlooked?',
    options: [
      'The number of ways available in the distribution board',
      'The colour of the containment used across the ceiling',
      'The standing losses of control gear and standby loads',
      'The height at which the luminaires have been mounted',
    ],
    correctAnswer: 2,
    explanation:
      'Drivers, transformers, controls and equipment left in standby draw small amounts continuously, and continuous small loads add up to a large annual figure precisely because nobody notices them. Board way count is the tempting answer because it feels like a design number, but spare ways consume nothing, so capacity in the board has no bearing on the energy the installation actually uses.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Energy Efficiency',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 235,
    question:
      'Which practice reduces the amount of cable that ends up as unusable offcuts?',
    options: [
      'Measuring the run and cutting from the drum to suit',
      'Pulling generous loops at each end to allow for errors',
      'Cutting several standard lengths before starting work',
      'Using the shortest drum in the van whatever the run is',
    ],
    correctAnswer: 0,
    explanation:
      'Measuring first and cutting to the measured run leaves the remainder on the drum where it stays usable for the next circuit, which is prevention rather than recycling. Cutting standard lengths in advance is how short ends are created: any run that does not match the guess leaves a tail too short for the next job, and those tails are exactly what fills the scrap bin.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Materials and Packaging',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 236,
    question:
      'A job needs several wholesaler collections every week. Which change gives the biggest environmental gain?',
    options: [
      'Sending a different operative each time to share the miles',
      'Collecting at the end of the day so the roads are clearer',
      'Using a larger van so the load is never close to the limit',
      'Consolidating orders into fewer planned deliveries to site',
    ],
    correctAnswer: 3,
    explanation:
      'Fewer, fuller journeys cut fuel burn, emissions and lost labour at the same time, and planning materials a week ahead is what makes consolidation possible. A larger van is the seductive answer because payload sounds efficient, but running a bigger vehicle on the same number of trips increases fuel used per journey rather than reducing the number of journeys made.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Transport and Logistics',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 237,
    question:
      'A lithium ion power tool battery has failed on site. How should it be dealt with?',
    options: [
      'Put in the general skip once it is fully discharged first',
      'Taken to a battery collection point for proper recycling',
      'Kept in the van until it has cooled down and then binned',
      'Split open so that the cells can be checked before tipping',
    ],
    correctAnswer: 1,
    explanation:
      'Lithium cells go to a battery take back or collection point where the lithium, cobalt and copper are recovered and the fire risk is managed by people equipped for it. Discharging before skipping does not make it safe: a damaged cell can still enter thermal runaway, and crushed batteries in a skip or a refuse vehicle are a recognised cause of waste industry fires.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 238,
    question:
      'Cutting slurry has reached a surface water drain despite the controls in place. What should happen next?',
    options: [
      'Note it in the site diary and continue with the work',
      'Wash the drain through with clean water to dilute it',
      'Wait to see whether discolouration appears outside',
      'Stop work, contain what you can and report it at once',
    ],
    correctAnswer: 3,
    explanation:
      'Stopping the source, containing the spread and reporting immediately gives the site the chance to isolate or block downstream before the discharge reaches open water, and early reporting is treated very differently from a discovery made later. Flushing the drain through is the instinct to resist, because dilution does not remove the pollutant, it simply pushes more of it further along the system.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Pollution Prevention',
    category: 'Pollution Prevention',
  },
  {
    id: 239,
    question:
      'Chapter 81 sends the designer to the Building Regulations. Which subject is listed there as relevant to electrical installers?',
    options: [
      'Energy efficient lighting within the building being served',
      'The minimum size of service head for a new connection',
      'The rating of the cut-out fuse fitted by the distributor',
      'The interval between periodic inspections of the system',
    ],
    correctAnswer: 0,
    explanation:
      'Energy efficient lighting is one of the items the Building Regulations bring within the scope of the installer, covering lamp efficacy and the controls that limit run time. Service heads and cut-out fuses are the plausible distractors, but that equipment belongs to the distributor and sits on the supply side of the origin, outside both the Building Regulations duty and the installation itself.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Energy Efficiency',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 240,
    question:
      'A consumer unit change leaves the old unit, a bag of cable offcuts, packaging and two old smoke alarms. Which split applies the hierarchy properly?',
    options: [
      'Everything into one skip and let the operator sort it out',
      'Unit and alarms to WEEE, cable to metal, card to recycling',
      'Unit to scrap, offcuts to landfill, packaging burnt on site',
      'Unit stored in the van and all the rest into a general skip',
    ],
    correctAnswer: 1,
    explanation:
      'Each stream has a route that recovers value: the board and the alarms are electrical equipment for the WEEE route, ionisation alarms in particular needing specialist handling, cable is a high value metal recyclate and clean card is straightforward to recycle. One mixed skip is the worst option because it converts four clean streams into a single contaminated load that costs more and recovers least.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Waste Segregation',
    category: 'Waste Management',
  },
  {
    id: 241,
    question:
      'What must the written record that accompanies a transfer of waste to a carrier contain?',
    options: [
      'An accurate description of the waste and both parties named',
      'An estimate of the resale value of the metals in the load',
      'A photograph of the skip taken before it leaves the site',
      'A copy of the insurance certificate held by the site owner',
    ],
    correctAnswer: 0,
    explanation:
      'The transfer record identifies who handed the waste over, who took it, and exactly what it is, so that every later holder can act lawfully and the trail can be followed if the load goes astray. Resale value has no place on it: the paperwork exists to describe the material and the chain of custody, not to record the commercial worth of what is inside the container.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Duty of Care',
    category: 'Waste Management',
  },
  {
    id: 242,
    question:
      'A fit-out arrives with every accessory individually boxed and the pallets shrink wrapped. What is the best first step to cut packaging waste?',
    options: [
      'Burn the shrink wrap because it takes up skip volume',
      'Bag all the packaging together for the general skip',
      'Ask the supplier for bulk packed items and returnable crates',
      'Store the packaging in the unit until the job is finished',
    ],
    correctAnswer: 2,
    explanation:
      'Packaging is designed into the supply chain long before it reaches site, so asking the supplier for bulk packs and returnable crates prevents the waste rather than managing it, which is the top of the hierarchy. Bagging everything for the general skip is only tidying: the same volume still leaves site, and clean card and film that could have been recycled are lost inside a mixed load.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Materials and Packaging',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 243,
    question:
      'Waste that cannot be prevented, reused or recycled is sent for energy recovery rather than landfill. Where does that sit in the hierarchy?',
    options: [
      'Above recycling because energy is a more useful output',
      'At the same level as reuse since the item is consumed',
      'Outside the hierarchy because the waste is destroyed',
      'Below recycling but above disposal as other recovery',
    ],
    correctAnswer: 3,
    explanation:
      'Energy from waste counts as other recovery, ranked beneath recycling because burning a material destroys it while recycling keeps it circulating, yet ranked above landfill because at least some useful output is obtained. Placing it above recycling is the classic error made when energy sounds valuable, but combustion is a one way process and the material can never be recovered afterwards.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Waste Hierarchy',
    category: 'Waste Management',
  },
  {
    id: 244,
    question:
      'Half used cans of expanding foam and tins of cable lubricant are left at the end of a job. How should they be handled?',
    options: [
      'Emptied out on site so the containers can be recycled',
      'Left in the plant room for the next contractor to use',
      'Kept for reuse if sound, or disposed of as chemical waste',
      'Punctured to release the pressure and put in the metal skip',
    ],
    correctAnswer: 2,
    explanation:
      'Sound, labelled product goes back into stock and gets used, and anything spoiled or unlabelled leaves as a chemical waste with its hazard properly declared. Emptying the cans to recycle the tin is the trap: the container is only clean once the contents have gone somewhere, and squirting foam or lubricant onto the ground creates a ground contamination problem to save a skip charge.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 245,
    question:
      'A client asks for a like for like replacement of an ageing lighting scheme. What is the most useful contribution an electrician can make?',
    options: [
      'Fit the same equipment because that is what was asked for',
      'Quote only for the cheapest fittings available that week',
      'Refuse the work unless the client agrees to full controls',
      'Set out the running cost and options for efficient fittings',
    ],
    correctAnswer: 3,
    explanation:
      'The person on site is the one who knows what is fitted and what it costs to run, so presenting the running cost alongside an efficient alternative lets the client make an informed choice and often wins better work. Simply fitting like for like is the passive option that locks in years of unnecessary consumption, and refusing the job outright helps nobody and just sends it to someone less interested.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Reducing Impact',
    category: 'Environmental Awareness',
  },
  {
    id: 246,
    question:
      'On a repeat unit fit-out, which approach designs waste out before anyone lifts a tool?',
    options: [
      'Standardising module lengths and prefabricating assemblies',
      'Ordering ten per cent extra of every item to allow for cuts',
      'Booking a larger skip so waste can be handled in one go',
      'Allocating a labourer to sweep and clear the units daily',
    ],
    correctAnswer: 0,
    explanation:
      'Repeating identical modules means the cuts are worked out once, made in controlled conditions and repeated with almost no offcut, which prevents waste rather than collecting it. A bigger skip and a dedicated labourer both improve housekeeping, but neither reduces the quantity of material that becomes waste, and a larger skip simply raises the ceiling on how much can be thrown away.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Designing Out Waste',
    category: 'Energy & Resource Efficiency',
  },
  {
    id: 247,
    question:
      'You must cut chases in dense blockwork. Which control best protects both health and the surroundings?',
    options: [
      'Dry cutting with a dust mask and sweeping up afterwards',
      'Dry cutting outdoors so the dust blows away from the work',
      'On-tool extraction with a suitable class of vacuum unit',
      'Water suppression with the run-off left to soak into soil',
    ],
    correctAnswer: 2,
    explanation:
      'On-tool extraction captures the respirable crystalline silica at source and collects it as a dry, contained waste, so it protects the lungs without creating a slurry that has to be caught and disposed of. Water suppression is a legitimate health control and still loses here, because the option described lets the run-off soak into the ground and simply moves the problem from the air to the soil.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Pollution Prevention',
    category: 'Pollution Prevention',
  },
  {
    id: 248,
    question:
      'Fluorescent tubes are waiting for collection in a busy corridor of an occupied building. What is the correct arrangement?',
    options: [
      'Bundled and taped together against the corridor wall',
      'Left in an open bin so it can be topped up each day',
      'Stood upright in a corner behind a warning notice',
      'Boxed in a closed container in a controlled storage area',
    ],
    correctAnswer: 3,
    explanation:
      'Hazardous waste is kept in a closed, labelled container in a designated area where the public and other trades cannot knock it over, which keeps the tubes intact until the specialist collection. Bundling them against a corridor wall is the everyday habit worth breaking, because one trolley or ladder tipped into the bundle releases mercury and glass into an occupied space.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Hazardous Waste',
    category: 'Waste Management',
  },
  {
    id: 249,
    question:
      'Why does maintaining and repairing existing equipment usually beat replacing it on environmental grounds?',
    options: [
      'It keeps the embodied energy of the item in useful service',
      'It always costs the client less than fitting a new item',
      'It removes the need to test the circuit after the work',
      'It transfers the disposal duty back to the manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'Every item carries the energy and raw material used to make and transport it, and repair keeps that investment working instead of writing it off and starting again with a new product. The cost argument is attractive but not reliable: repair is sometimes dearer than replacement, and a badly worn or obsolete item may be better replaced, which is why the environmental case rests on embodied impact.',
    section: 'environmental-sustainability',
    difficulty: 'intermediate',
    topic: 'Reducing Impact',
    category: 'Environmental Awareness',
  },
  {
    id: 250,
    question:
      'Across a whole project, where does an electrician have the greatest influence on environmental impact?',
    options: [
      'In the choice of which skip company collects the waste',
      'In how neatly the finished installation has been dressed',
      'In the brand of accessories chosen from the wholesaler',
      'In design, ordering and segregation decisions made early',
    ],
    correctAnswer: 3,
    explanation:
      'What gets specified, how much is ordered and how waste is separated at the work face are all settled long before the skip is booked, and those early decisions determine how much material is consumed and how much of it can be recovered. Choosing the skip company matters at the margin, but by the time the skip arrives the quantity and the mix of the waste have already been decided.',
    section: 'environmental-sustainability',
    difficulty: 'advanced',
    topic: 'Reducing Impact',
    category: 'Environmental Awareness',
  },
];
