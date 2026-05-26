// Level 3 Module 2: Environmental Technologies — Question Bank
// 250 supervisor-grade questions covering C&G 2365-03 Unit 301 (Environmental Tech),
// layered with C&G 2357 Unit 312 + Unit 602 (24 effective ACs).
// Coverage: BS 7671 Section 712 (Solar PV — verbatim regs), Section 722 (EV — Reg 722.411.4 PEN-fault detection,
// Reg 722.531.3.101 Type B RCD), Section 753 (heating systems), heat pumps + COP/SCOP + F-Gas certification boundary,
// ENA G98/G99 connection rules, MCS standards (MIS 3005 heat pump, MIS 3002 PV), Building Regs Part L 2021 / Part S
// EV-charging requirements, Future Homes Standard 2025, A4:2026 currency throughout (TN-C-S/PNB terminology, AFDD,
// new schedule columns), Climate Change Act Net Zero, GHG Protocol Scope 1/2/3, F-Gas Reg, WEEE, ISO 14001,
// Smart Charge Point Regulations 2021, ISO 15118 (V2G), Smart Export Guarantee, IET Code of Practice for EESS.
// Difficulty mix: ~40% basic, ~45% intermediate, ~15% advanced.
// Updated 2026-04-27: Schema upgraded to QuestionBank with topic field + L3 special-locations + sustainability extension (Sections 2.8, 2.9).

export interface QuestionBank {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  module?: string;
}

// Backwards-compatible alias for legacy imports (mixed/questionBank.ts uses Question)
export type Question = QuestionBank;

export const module2Questions: QuestionBank[] = [
  // ============================================
  // Section 2.1: Building Regulations Part L (Questions 1-30)
  // ============================================
  {
    id: 1,
    question: 'What does Part L of the Building Regulations primarily address?',
    options: [
      'Ventilation requirements',
      'Conservation of fuel and power',
      'Fire safety in buildings',
      'Structural stability',
    ],
    correctAnswer: 1,
    explanation:
      'Part L of the Building Regulations deals with the conservation of fuel and power, setting standards for energy efficiency in buildings.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: 'What is the main purpose of the 2021 Part L amendments?',
    options: [
      'A centralised heating system distributing heat to multiple buildings from a central source',
      'Adjusting energy consumption patterns in response to grid signals or time-of-use tariffs',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'The calculated annual CO2 emissions from the actual dwelling design',
    ],
    correctAnswer: 2,
    explanation:
      'The 2021 Part L amendments aim to achieve approximately 31% reduction in CO2 emissions for new homes as a step towards Future Homes Standard 2025.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 3,
    question: 'What is the Future Homes Standard target year?',
    options: [
      '2023',
      '2035',
      '2030',
      '2025',
    ],
    correctAnswer: 3,
    explanation:
      'The Future Homes Standard is planned for 2025, requiring new homes to produce 75-80% less carbon emissions than current standards.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 4,
    question: "What does 'U-value' measure in building construction?",
    options: [
      'Rate of heat transfer through a building element (thermal transmittance)',
      'A small wind turbine (typically under 6kW) for domestic or small commercial use',
      'An emissions reduction target aligned with climate science to limit global warming',
      'Coefficient of Performance - ratio of heat output to electrical input',
    ],
    correctAnswer: 0,
    explanation:
      'U-value measures the rate of heat transfer through a building element. Lower U-values indicate better thermal insulation.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 5,
    question:
      'What is the typical U-value requirement for walls in new dwellings under Part L 2021?',
    options: [
      '0.50 W/m²K',
      '0.26 W/m²K or better',
      '1.0 W/m²K',
      '2.0 W/m²K',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 requires walls in new dwellings to achieve U-values of around 0.26 W/m²K or better to meet energy efficiency targets.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 6,
    question: 'What is an EPC?',
    options: [
      'Equipment Power Classification',
      'Electrical Performance Certificate',
      'Energy Performance Certificate',
      'Environmental Protection Certificate',
    ],
    correctAnswer: 2,
    explanation:
      "An Energy Performance Certificate (EPC) rates a building's energy efficiency from A (most efficient) to G (least efficient).",
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 7,
    question: 'Which EPC rating band is the most energy efficient?',
    options: [
      'Band G',
      'Band D',
      'Band E',
      'Band A',
    ],
    correctAnswer: 3,
    explanation:
      'Band A is the most energy efficient rating on an EPC, with Band G being the least efficient.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 8,
    question: 'What is the minimum EPC rating required for rental properties in England and Wales?',
    options: [
      'Band E',
      'Band G',
      'Band C',
      'Band A',
    ],
    correctAnswer: 0,
    explanation:
      'Since April 2020, rental properties must have a minimum EPC rating of E. Future regulations may increase this to C.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 9,
    question: "What does 'thermal bridging' refer to?",
    options: [
      'Using AI to identify individual appliance consumption from whole-building smart meter data',
      'Areas where heat transfers more easily through the building envelope due to breaks in insulation',
      'Charging for the most power used in a billing period, not just total consumption',
      'A framework for domestic retrofit projects ensuring quality and risk management',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal bridging occurs where insulation is bridged by materials with higher thermal conductivity, creating cold spots and heat loss.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 10,
    question: "What is 'air permeability' in Part L?",
    options: [
      'Equipment for charging electric vehicle batteries from the electrical supply',
      'Automatic ventilation adjustment based on occupancy or air quality sensors',
      'The measure of air leakage through the building fabric under pressure',
      'Using data and analytics to predict when equipment will need maintenance before failure',
    ],
    correctAnswer: 2,
    explanation:
      'Air permeability measures uncontrolled air leakage through the building fabric, typically expressed as m³/(h·m²) at 50 Pa pressure difference.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'What is the typical air permeability target for new dwellings?',
    options: [
      'Up to 90% or higher heat recovery',
      'Energy Performance Certificate',
      'Conservation of fuel and power',
      '8 m³/(h·m²) @ 50 Pa or better',
    ],
    correctAnswer: 3,
    explanation:
      'Part L typically requires air permeability of 8 m³/(h·m²) @ 50 Pa or better for new dwellings to reduce uncontrolled heat loss.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 12,
    question: 'What is SAP in relation to Part L?',
    options: [
      'Standard Assessment Procedure - the methodology for calculating dwelling energy performance',
      'Real-time monitoring, simulation, optimisation, and predictive maintenance',
      'Mono is more efficient and black in appearance; poly is slightly less efficient and blue-ish',
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
    ],
    correctAnswer: 0,
    explanation:
      "SAP (Standard Assessment Procedure) is the Government's methodology for calculating the energy performance of dwellings.",
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 13,
    question: 'What is SBEM used for?',
    options: [
      'Outdoor temperature below which supplementary heating is needed',
      'Calculating non-domestic building energy performance',
      'Financial penalties up to £150,000 for non-domestic properties',
      'A worldwide standard for home and building automation',
    ],
    correctAnswer: 1,
    explanation:
      'SBEM (Simplified Building Energy Model) is used to calculate energy performance for non-domestic buildings under Part L.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 14,
    question: 'What percentage of heat is typically lost through an uninsulated roof?',
    options: [
      '5%',
      '50%',
      '25%',
      '10%',
    ],
    correctAnswer: 2,
    explanation:
      'Approximately 25% of heat can be lost through an uninsulated roof, making loft insulation one of the most cost-effective energy efficiency measures.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 15,
    question: 'What is the primary emission factor used in Part L calculations?',
    options: [
      'Calculating non-domestic building energy performance',
      'When a building is built, sold, or rented',
      'BACnet, Modbus, KNX, or DALI for lighting',
      'Carbon dioxide (CO2) emissions per unit of energy',
    ],
    correctAnswer: 3,
    explanation:
      'CO2 emission factors (kg CO2/kWh) are used to calculate the carbon dioxide emissions from different fuel types in Part L assessments.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: "What does 'fabric first' approach mean in Part L compliance?",
    options: [
      'Prioritising the building envelope (insulation, airtightness) before adding renewable technologies',
      'Using an EV battery to power home appliances, acting as a home battery',
      'Part S (Infrastructure for electric vehicles) and Part P (Electrical Safety)',
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
    ],
    correctAnswer: 0,
    explanation:
      'Fabric first means prioritising high levels of insulation and airtightness in the building envelope before relying on renewables or technology.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: "What is a 'notional dwelling' in SAP calculations?",
    options: [
      'The calculated annual CO2 emissions from the actual dwelling design',
      'A reference dwelling with the same shape but meeting minimum standards, used for comparison',
      'Automatic control of building services like HVAC, lighting, and security',
      'Solar cells integrated into building materials like roof tiles, facades, or windows',
    ],
    correctAnswer: 1,
    explanation:
      'A notional dwelling is a reference building with the same geometry as the actual dwelling but using minimum Part L specifications for comparison.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'advanced',
  },
  {
    id: 18,
    question: 'What is the Target Emission Rate (TER)?',
    options: [
      'The measure of air leakage through the building fabric under pressure',
      'Recording total electricity generated by the PV system for payment or monitoring',
      'The CO2 emission rate the building must achieve, based on the notional dwelling',
      'Technology that captures CO2 directly from ambient air for storage or use',
    ],
    correctAnswer: 2,
    explanation:
      'TER is the target CO2 emission rate calculated from the notional dwelling that the actual dwelling must achieve or better.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'advanced',
  },
  {
    id: 19,
    question: 'What is the Dwelling Emission Rate (DER)?',
    options: [
      'A building that generates more energy than it consumes over a year',
      'The measure of air leakage through the building fabric under pressure',
      'Rate of heat transfer through a building element (thermal transmittance)',
      'The calculated annual CO2 emissions from the actual dwelling design',
    ],
    correctAnswer: 3,
    explanation:
      'DER is the calculated annual CO2 emission rate (kg CO2/m²/year) for the actual dwelling design, which must be lower than the TER.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'advanced',
  },
  {
    id: 20,
    question: 'What glazing requirement typically applies under Part L?',
    options: [
      'Double glazing minimum with low-e coating and U-value around 1.4 W/m²K or better',
      'Replacing fossil fuel heating with electric systems like heat pumps',
      'A solar system connected to the mains grid, exporting excess generation',
      'Inductive loads like motors and transformers drawing reactive power',
    ],
    correctAnswer: 0,
    explanation:
      'Part L typically requires double glazing with low-emissivity coating achieving U-values of around 1.4 W/m²K or better for windows.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question: 'What is controlled fitting under Part L?',
    options: [
      'Charging for the most power used in a billing period, not just total consumption',
      'Building services that must meet minimum efficiency standards when replaced',
      'Inductive charging transferring power without physical cable connection',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
    ],
    correctAnswer: 1,
    explanation:
      'Controlled fittings include windows, doors, boilers, and other building services that must meet minimum efficiency standards when installed or replaced.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 22,
    question: 'What must be provided for a new dwelling under Part L?',
    options: [
      'An electricity network using digital technology to optimise generation, distribution, and consumption',
      'A rating system for actual operational energy performance of commercial buildings',
      'Information about efficient operation of heating, ventilation, and hot water systems',
      'Leadership in Energy and Environmental Design - an international green building rating',
    ],
    correctAnswer: 2,
    explanation:
      'Part L requires building owners to receive information about efficient operation of fixed building services, including heating and hot water systems.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 23,
    question: 'What is a Primary Energy target in Part L?',
    options: [
      'Mono is more efficient and black in appearance; poly is slightly less efficient and blue-ish',
      'Automatic lighting control based on detecting presence or absence of people',
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'A target for total primary energy consumption including generation and distribution losses',
    ],
    correctAnswer: 3,
    explanation:
      'Primary Energy targets account for total energy consumption including losses in generation and distribution, promoting efficient fuel choices.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'advanced',
  },
  {
    id: 24,
    question: 'What is the role of commissioning under Part L?',
    options: [
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
      'Aggregated distributed energy resources acting together as a single power plant',
      'A solar system connected to the mains grid, exporting excess generation',
      'A heat pump that extracts heat from outside air and transfers it indoors',
    ],
    correctAnswer: 0,
    explanation:
      'Commissioning ensures that fixed building services are properly installed, set up, and adjusted to operate efficiently as designed.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: 'What documentation must be provided for Part L compliance?',
    options: [
      'Replacing fossil fuel heating with electric systems like heat pumps',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'Adjusting energy consumption patterns in response to grid signals or time-of-use tariffs',
      'Power consumption varies with the cube of speed (Affinity Laws)',
    ],
    correctAnswer: 1,
    explanation:
      'Part L compliance requires SAP/SBEM calculations, an EPC, commissioning certificates for building services, and information for building users.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 26,
    question: 'What is an air pressure test?',
    options: [
      'Replacing fossil fuel heating with electric systems like heat pumps',
      '800-1000ppm, with outdoor levels around 400ppm',
      'A test to measure air leakage rate through the building envelope',
      'LED lighting systems powered and controlled through Ethernet cables',
    ],
    correctAnswer: 2,
    explanation:
      'Air pressure testing measures the air leakage rate through the building envelope, usually conducted at 50 Pascals pressure difference.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 27,
    question: 'When is an air pressure test mandatory for dwellings?',
    options: [
      'A heat pump that extracts heat from outside air and transfers it indoors',
      'Automatic reversal to remove ice build-up on the outdoor unit',
      'Regulations setting minimum EPC ratings for rental properties',
      'For all new dwellings or where required by Building Control',
    ],
    correctAnswer: 3,
    explanation:
      'Air pressure testing is typically required for all new dwellings to demonstrate compliance with Part L airtightness standards.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 28,
    question: "What is 'g-value' for glazing?",
    options: [
      'Solar heat gain coefficient - proportion of solar radiation transmitted through glazing',
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
      'Storing excess renewable generation for use when production is low',
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
    ],
    correctAnswer: 0,
    explanation:
      'G-value (solar factor) indicates what proportion of solar energy passes through glazing. Lower g-values reduce solar heat gain.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },
  {
    id: 29,
    question: "What is meant by 'consequential improvements' in Part L?",
    options: [
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'Required energy efficiency upgrades when extending or renovating larger buildings',
      'A ventilation system that recovers heat from exhaust air to warm incoming fresh air',
      'Coefficient of Performance - ratio of heat output to electrical input',
    ],
    correctAnswer: 1,
    explanation:
      'Consequential improvements are additional energy efficiency upgrades required when extending or renovating buildings over a certain size.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'advanced',
  },
  {
    id: 30,
    question: 'What minimum lighting efficiency is typically required under Part L?',
    options: [
      'Convert DC electricity from panels to AC electricity for use or export',
      'Direct energy trading between producers and consumers without traditional utilities',
      '75% of fixed lighting outlets must have efficient fittings (typically LED)',
      'Installing capacitors to counteract inductive reactive power',
    ],
    correctAnswer: 2,
    explanation:
      'Part L typically requires at least 75% of fixed lighting outlets to have efficient fittings with efficacy of 45 lumens per watt or better.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 2.2: Energy Efficiency (Questions 31-60)
  // ============================================
  {
    id: 31,
    question: 'What is the efficiency rating of a typical modern LED lamp?',
    options: [
      '10-15 lumens per watt',
      '200-300 lumens per watt',
      '40-50 lumens per watt',
      '80-150+ lumens per watt',
    ],
    correctAnswer: 3,
    explanation:
      'Modern LED lamps typically achieve 80-150+ lumens per watt, compared to around 10-15 for incandescent lamps.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 32,
    question: "What does 'COP' stand for in heat pump terminology?",
    options: [
      'Coefficient of Performance - ratio of heat output to electrical input',
      'Large battery installations storing electricity to balance grid supply and demand',
      'A ventilation system that recovers heat from exhaust air to warm incoming fresh air',
      'Individual control of each luminaire for flexibility, energy savings, and tuning',
    ],
    correctAnswer: 0,
    explanation:
      'COP (Coefficient of Performance) is the ratio of heat output to electrical energy input. A COP of 3 means 3kW heat output for 1kW electrical input.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 33,
    question: 'What typical COP can an air source heat pump achieve?',
    options: [
      '0.5-1.0',
      '2.5-4.0',
      '10-15',
      '100+',
    ],
    correctAnswer: 1,
    explanation:
      'Air source heat pumps typically achieve COP values of 2.5-4.0, meaning they produce 2.5-4 times more heat energy than the electrical energy consumed.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 34,
    question: 'Why are heat pumps considered renewable?',
    options: [
      'Measuring energy consumption of individual circuits, areas, or equipment for analysis',
      'A test to measure air leakage rate through the building envelope',
      'They extract renewable heat from the environment (air, ground, or water)',
      'A target for total primary energy consumption including generation and distribution losses',
    ],
    correctAnswer: 2,
    explanation:
      "Heat pumps extract renewable heat energy from the environment and 'pump' it to a higher temperature, using only a fraction of that energy as electricity.",
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 35,
    question: 'What is demand-side response in energy management?',
    options: [
      'Risk that buildings become unmarketable or devalued due to poor energy performance',
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
      'Rate of heat transfer through a building element (thermal transmittance)',
      'Adjusting energy consumption patterns in response to grid signals or time-of-use tariffs',
    ],
    correctAnswer: 3,
    explanation:
      'Demand-side response involves shifting or reducing energy consumption in response to grid conditions, prices, or signals to help balance supply and demand.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 36,
    question: 'What is a smart meter?',
    options: [
      'A digital meter that records energy use and communicates with the supplier remotely',
      'Regulations setting minimum EPC ratings for rental properties',
      'Another term for district heating - distributing heat from central source to buildings',
      'An industry body promoting sustainable building practices and policy',
    ],
    correctAnswer: 0,
    explanation:
      'A smart meter digitally records energy consumption and communicates readings remotely to suppliers, enabling accurate billing and consumption insights.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 37,
    question: 'What is the benefit of time-of-use tariffs?',
    options: [
      'An inverter that manages both solar PV and battery storage in one unit',
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
      'Technology that captures CO2 directly from ambient air for storage or use',
      'A virtual replica of a building integrating real-time data for monitoring and simulation',
    ],
    correctAnswer: 1,
    explanation:
      'Time-of-use tariffs offer lower rates during off-peak periods, encouraging consumers to shift flexible loads and helping balance grid demand.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 38,
    question: 'What is Power Factor in electrical systems?',
    options: [
      'Aggregated distributed energy resources acting together as a single power plant',
      'Using hydrogen gas (potentially blended with natural gas or 100%) for building heating',
      'The ratio of real power to apparent power, indicating how efficiently power is used',
      'Inductive charging transferring power without physical cable connection',
    ],
    correctAnswer: 2,
    explanation:
      'Power Factor is the ratio of real power (kW) to apparent power (kVA). A PF of 1 indicates all power is used productively; lower values mean wasted capacity.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 39,
    question: 'What causes poor power factor in electrical installations?',
    options: [
      'Below about 55°C (return temperature below dew point ~54°C)',
      'Monitoring CO2, humidity, VOCs, and particulates to ensure healthy indoor environments',
      'A new interoperability standard unifying smart home ecosystems',
      'Inductive loads like motors and transformers drawing reactive power',
    ],
    correctAnswer: 3,
    explanation:
      'Inductive loads (motors, transformers, fluorescent ballasts) draw reactive power which causes current to lag voltage, reducing power factor.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'How is power factor correction achieved?',
    options: [
      'Installing capacitors to counteract inductive reactive power',
      'Building services that must meet minimum efficiency standards when replaced',
      'PV generates electricity; thermal heats water or air',
      'Maximum Power Point Tracking - optimising power extraction from panels',
    ],
    correctAnswer: 0,
    explanation:
      'Power factor correction typically uses capacitors to supply reactive power locally, counteracting inductive loads and improving the power factor.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question: 'What is the energy efficiency label rating scale for appliances?',
    options: [
      'Pass, Good, Very Good, Excellent, Outstanding',
      'A to G (with A being most efficient)',
      '8 m³/(h·m²) @ 50 Pa or better',
      'Building Energy Management System',
    ],
    correctAnswer: 1,
    explanation:
      'The EU/UK energy efficiency label rates appliances from A (most efficient) to G (least efficient), with A+++, A++, A+ phased out.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 42,
    question: 'What does BEMS stand for?',
    options: [
      'British Electrical Manufacturing Standard',
      'Building Equipment Monitoring Service',
      'Building Energy Management System',
      'Basic Emergency Management System',
    ],
    correctAnswer: 2,
    explanation:
      'BEMS (Building Energy Management System) monitors and controls building services to optimise energy use, comfort, and efficiency.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 43,
    question: 'What is occupancy sensing in lighting control?',
    options: [
      'Inductive charging transferring power without physical cable connection',
      'A mandatory inspection for AC systems over 12kW, assessing efficiency and sizing',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'Automatic lighting control based on detecting presence or absence of people',
    ],
    correctAnswer: 3,
    explanation:
      'Occupancy sensing automatically controls lighting based on detecting whether spaces are occupied, reducing energy waste in unoccupied areas.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 44,
    question: 'What is daylight harvesting?',
    options: [
      'Automatically dimming artificial lighting in response to available natural light',
      'Using AI and data to predict and optimise future energy consumption patterns',
      'A preset combination of light levels and colours for different activities or moods',
      'It has a secondary heat exchanger that recovers latent heat by condensing water vapour from flue gases',
    ],
    correctAnswer: 0,
    explanation:
      'Daylight harvesting uses sensors to measure natural light levels and automatically dim artificial lighting to maintain required illuminance while saving energy.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 45,
    question: 'What is a Variable Speed Drive (VSD)?',
    options: [
      'A programmable thermostat with WiFi, learning capability, and remote control',
      'An electronic device that controls motor speed by varying the frequency of power supply',
      'An electricity network using digital technology to optimise generation, distribution, and consumption',
      'An international treaty on climate change limiting global warming to 1.5-2°C',
    ],
    correctAnswer: 1,
    explanation:
      'A VSD (Variable Speed Drive/Frequency Drive) controls AC motor speed by varying the supply frequency, enabling significant energy savings on fans and pumps.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 46,
    question: 'Why do VSDs save energy on centrifugal fans and pumps?',
    options: [
      'Systematic assessment of energy use to identify savings opportunities',
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
      'Power consumption varies with the cube of speed (Affinity Laws)',
      'Equipment that uses electricity to split water into hydrogen and oxygen',
    ],
    correctAnswer: 2,
    explanation:
      'The Affinity Laws show that power consumption varies with the cube of speed. Reducing fan/pump speed by 20% can reduce power consumption by about 50%.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'advanced',
  },
  {
    id: 47,
    question: 'What is a heat recovery ventilation system?',
    options: [
      'Charging for the most power used in a billing period, not just total consumption',
      'Automatically dimming artificial lighting in response to available natural light',
      'When a solar system continues to power a circuit that has been disconnected from the grid',
      'A ventilation system that recovers heat from exhaust air to warm incoming fresh air',
    ],
    correctAnswer: 3,
    explanation:
      'MVHR (Mechanical Ventilation with Heat Recovery) extracts stale air and recovers up to 90% of its heat to warm incoming fresh air.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: 'What efficiency can MVHR systems achieve?',
    options: [
      'Up to 90% or higher heat recovery',
      'Building Energy Management System',
      'About 150-200g CO2/kWh (and falling)',
      'From 15W (PoE) to 90W+ (PoE++/802.3bt)',
    ],
    correctAnswer: 0,
    explanation:
      'Modern MVHR systems can recover up to 90% or more of the heat from extracted air, significantly reducing heating demand in well-sealed buildings.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'What is the typical efficiency of a modern condensing gas boiler?',
    options: [
      '50-60%',
      '90-94%',
      '100%',
      '70-80%',
    ],
    correctAnswer: 1,
    explanation:
      'Modern condensing gas boilers achieve seasonal efficiencies of 90-94% by recovering latent heat from flue gases.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 50,
    question: "What makes a boiler 'condensing'?",
    options: [
      'Automated systems that identify operational faults and their likely causes in building systems',
      'An electronic device that controls motor speed by varying the frequency of power supply',
      'It has a secondary heat exchanger that recovers latent heat by condensing water vapour from flue gases',
      'Intelligent charging that optimises timing based on tariffs, grid demand, or renewable availability',
    ],
    correctAnswer: 2,
    explanation:
      'Condensing boilers have a larger heat exchanger that cools flue gases enough to condense water vapour, recovering additional latent heat.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 51,
    question:
      'What is the recommended minimum flow temperature for condensing boilers to condense?',
    options: [
      'CIBSE guidance for predicting actual operational energy use in buildings',
      'Heating using organic materials like wood pellets, chips, or logs',
      'Calculating non-domestic building energy performance',
      'Below about 55°C (return temperature below dew point ~54°C)',
    ],
    correctAnswer: 3,
    explanation:
      'For efficient condensing, return water temperature should be below the dew point (about 54°C for natural gas), often achieved with flow temperatures below 55°C.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'advanced',
  },
  {
    id: 52,
    question: 'What is a Seasonal Coefficient of Performance (SCOP)?',
    options: [
      'Average efficiency of a heat pump over an entire heating season',
      'A plug adapter allowing remote control and monitoring of connected devices',
      'Building services that must meet minimum efficiency standards when replaced',
      'Required energy efficiency upgrades when extending or renovating larger buildings',
    ],
    correctAnswer: 0,
    explanation:
      'SCOP measures average heat pump efficiency across a typical heating season, accounting for varying outdoor temperatures and part-load operation.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 53,
    question: 'What is phantom or standby power?',
    options: [
      'A new interoperability standard unifying smart home ecosystems',
      'Electricity consumed by devices when switched off but still plugged in',
      'A ventilation system that recovers heat from exhaust air to warm incoming fresh air',
      'CIBSE guidance for predicting actual operational energy use in buildings',
    ],
    correctAnswer: 1,
    explanation:
      'Phantom or standby power is electricity consumed by devices in standby mode or when switched off but still connected. It can account for 5-10% of household consumption.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 54,
    question: 'What is the purpose of an energy audit?',
    options: [
      'Using hydrogen gas (potentially blended with natural gas or 100%) for building heating',
      'Another term for district heating - distributing heat from central source to buildings',
      'Systematic assessment of energy use to identify savings opportunities',
      'Cost-effective improvements to increase the energy efficiency rating',
    ],
    correctAnswer: 2,
    explanation:
      'An energy audit systematically examines energy consumption patterns to identify waste, inefficiencies, and opportunities for cost-effective improvements.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 55,
    question: 'What is sub-metering used for?',
    options: [
      'Storing energy as heat or cold for later use in heating or cooling systems',
      '17 UN global goals addressing economic, social, and environmental challenges by 2030',
      'A lease including environmental commitments from landlord and tenant',
      'Measuring energy consumption of individual circuits, areas, or equipment for analysis',
    ],
    correctAnswer: 3,
    explanation:
      'Sub-metering measures energy consumption of specific circuits, areas, or equipment, enabling detailed analysis and allocation of energy costs.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 56,
    question: 'What is a kilowatt-hour (kWh)?',
    options: [
      'A unit of energy equal to using 1000 watts for one hour',
      'PV generates electricity; thermal heats water or air',
      'A government grant towards installing heat pumps or biomass boilers',
      'A device showing real-time energy usage and costs from the smart meter',
    ],
    correctAnswer: 0,
    explanation:
      'A kilowatt-hour (kWh) is a unit of energy equal to using power at a rate of 1 kilowatt (1000 watts) for one hour.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 57,
    question: 'What is the difference between energy and power?',
    options: [
      'Risk that buildings become unmarketable or devalued due to poor energy performance',
      'Power is the rate of energy use (kW); energy is power over time (kWh)',
      'Direct energy trading between producers and consumers without traditional utilities',
      'Double glazing minimum with low-e coating and U-value around 1.4 W/m²K or better',
    ],
    correctAnswer: 1,
    explanation:
      'Power (measured in watts/kW) is the rate at which energy is used. Energy (kWh) is power multiplied by time - the total consumption.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 58,
    question: 'What is load shedding in energy management?',
    options: [
      'Standard Assessment Procedure - the methodology for calculating dwelling energy performance',
      'Network of connected sensors and devices enabling data collection and automated control',
      'Deliberately reducing electrical load by switching off non-essential equipment during peak demand',
      'Recording total electricity generated by the PV system for payment or monitoring',
    ],
    correctAnswer: 2,
    explanation:
      'Load shedding deliberately switches off non-essential electrical loads during peak demand periods to reduce maximum demand charges or grid strain.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 59,
    question: 'What is maximum demand charging?',
    options: [
      '75% of fixed lighting outlets must have efficient fittings (typically LED)',
      'A reference dwelling with the same shape but meeting minimum standards, used for comparison',
      'Capturing CO2 emissions and storing them underground to prevent atmospheric release',
      'Charging for the most power used in a billing period, not just total consumption',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum demand charges are based on the highest power demand (kW or kVA) recorded during a billing period, typically using half-hourly metering.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question: 'What is the typical carbon intensity of UK grid electricity (2024)?',
    options: [
      'About 150-200g CO2/kWh (and falling)',
      'Conservation of fuel and power',
      'BACnet, Modbus, KNX, or DALI for lighting',
      'Building Energy Management System',
    ],
    correctAnswer: 0,
    explanation:
      'UK grid electricity carbon intensity has fallen significantly to around 150-200g CO2/kWh and continues to decrease as renewable generation increases.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 2.3: Renewable Technologies (Questions 61-95)
  // ============================================
  {
    id: 61,
    question: 'What is the difference between solar PV and solar thermal?',
    options: [
      'A building that generates more energy than it consumes over a year',
      'PV generates electricity; thermal heats water or air',
      'For all new dwellings or where required by Building Control',
      'A wireless protocol designed for smart home device communication',
    ],
    correctAnswer: 1,
    explanation:
      'Solar PV (photovoltaic) converts sunlight directly into electricity using semiconductor cells. Solar thermal uses sunlight to heat water or air.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 62,
    question: 'What is the typical efficiency of a modern solar PV panel?',
    options: [
      'PV generates electricity; thermal heats water or air',
      'About 150-200g CO2/kWh (and falling)',
      '18-22% for standard panels, up to 25%+ for premium',
      'When a building is built, sold, or rented',
    ],
    correctAnswer: 2,
    explanation:
      'Modern solar PV panels typically achieve 18-22% efficiency, with high-end panels reaching 25% or more under standard test conditions.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 63,
    question: 'What is a grid-tied solar PV system?',
    options: [
      'A device showing real-time energy usage and costs from the smart meter',
      'Calculating non-domestic building energy performance',
      'A small wind turbine (typically under 6kW) for domestic or small commercial use',
      'A solar system connected to the mains grid, exporting excess generation',
    ],
    correctAnswer: 3,
    explanation:
      'A grid-tied system is connected to the mains electricity grid, allowing export of excess generation and import when solar production is insufficient.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 64,
    question: 'What is the function of a solar inverter?',
    options: [
      'Convert DC electricity from panels to AC electricity for use or export',
      '17 UN global goals addressing economic, social, and environmental challenges by 2030',
      'An inverter that manages both solar PV and battery storage in one unit',
      'Using smartphone location to automatically adjust heating when occupants leave or approach',
    ],
    correctAnswer: 0,
    explanation:
      'Solar inverters convert the DC (direct current) electricity produced by PV panels into AC (alternating current) suitable for use in buildings and grid export.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 65,
    question: 'What is MPPT in solar PV systems?',
    options: [
      'Distributing available power across multiple charge points to prevent overload',
      'Maximum Power Point Tracking - optimising power extraction from panels',
      'Technology delivering electrical power along with data on Ethernet cables',
      'Hydrogen produced using renewable electricity through electrolysis of water',
    ],
    correctAnswer: 1,
    explanation:
      'MPPT (Maximum Power Point Tracking) continuously adjusts the operating point to extract maximum available power from the panels under varying conditions.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 66,
    question: 'What is the Smart Export Guarantee (SEG)?',
    options: [
      'A rating system for actual operational energy performance of commercial buildings',
      'Storing energy by pumping water uphill, then releasing it through turbines when needed',
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
      'Cost-effective improvements to increase the energy efficiency rating',
    ],
    correctAnswer: 2,
    explanation:
      'The SEG requires licensed electricity suppliers to offer payment for electricity exported to the grid from small-scale renewable generators like solar PV.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 67,
    question: 'What is the typical lifespan of solar PV panels?',
    options: [
      'Up to 90% or higher heat recovery',
      '80-150+ lumens per watt',
      '0.26 W/m²K or better',
      '25-30 years with degradation',
    ],
    correctAnswer: 3,
    explanation:
      'Solar PV panels typically last 25-30 years, though output degrades slowly over time (typically 0.5-1% per year).',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 68,
    question: 'What is an air source heat pump (ASHP)?',
    options: [
      'A heat pump that extracts heat from outside air and transfers it indoors',
      'Technology that captures CO2 directly from ambient air for storage or use',
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'Cost-effective improvements to increase the energy efficiency rating',
    ],
    correctAnswer: 0,
    explanation:
      "An ASHP extracts heat energy from outside air (even in cold weather) and 'pumps' it to a higher temperature for space heating or hot water.",
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 69,
    question: 'What is a ground source heat pump (GSHP)?',
    options: [
      '17 UN global goals addressing economic, social, and environmental challenges by 2030',
      'A heat pump extracting heat from the ground via buried pipes or boreholes',
      'Technology allowing EVs to discharge power back to the grid or building',
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'A GSHP extracts heat from the ground using horizontal loops or vertical boreholes, benefiting from stable ground temperatures year-round.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 70,
    question: 'Why do heat pumps work best with underfloor heating?',
    options: [
      'Outdoor temperature below which supplementary heating is needed',
      'Installing capacitors to counteract inductive reactive power',
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'Measuring energy consumption of individual circuits, areas, or equipment for analysis',
    ],
    correctAnswer: 2,
    explanation:
      'Underfloor heating operates at lower flow temperatures (35-45°C) than radiators, allowing heat pumps to operate more efficiently with higher COP values.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 71,
    question: 'What is the Boiler Upgrade Scheme (BUS)?',
    options: [
      'Power is the rate of energy use (kW); energy is power over time (kWh)',
      'Financial penalties up to £150,000 for non-domestic properties',
      'A new interoperability standard unifying smart home ecosystems',
      'A government grant towards installing heat pumps or biomass boilers',
    ],
    correctAnswer: 3,
    explanation:
      'The Boiler Upgrade Scheme provides grants (currently £7,500 for ASHPs) to help property owners in England and Wales install low carbon heating systems.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 72,
    question: 'What is battery storage used for in renewable systems?',
    options: [
      'Storing excess renewable generation for use when production is low',
      'Real-time monitoring, simulation, optimisation, and predictive maintenance',
      'Equipment that uses electricity to split water into hydrogen and oxygen',
      'Upgrading existing buildings with improved insulation, heating, and technologies',
    ],
    correctAnswer: 0,
    explanation:
      "Battery storage allows excess solar generation to be stored during the day for use in the evening or overnight when panels aren't producing.",
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 73,
    question: 'What type of battery is commonly used in home energy storage?',
    options: [
      'Lead acid',
      'Lithium-ion (Li-ion)',
      'Nickel-cadmium',
      'Zinc-carbon',
    ],
    correctAnswer: 1,
    explanation:
      'Lithium-ion batteries are most common for home energy storage due to their high energy density, efficiency, long cycle life, and falling costs.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 74,
    question: 'What is the typical round-trip efficiency of lithium-ion battery storage?',
    options: [
      '50-60%',
      '99-100%',
      '85-95%',
      '30-40%',
    ],
    correctAnswer: 2,
    explanation:
      'Lithium-ion batteries typically achieve 85-95% round-trip efficiency, meaning 85-95% of stored energy is recovered when discharged.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'What is a micro wind turbine?',
    options: [
      'Standard Assessment Procedure - the methodology for calculating dwelling energy performance',
      'Hydrogen produced using renewable electricity through electrolysis of water',
      'Intelligent charging that optimises timing based on tariffs, grid demand, or renewable availability',
      'A small wind turbine (typically under 6kW) for domestic or small commercial use',
    ],
    correctAnswer: 3,
    explanation:
      'Micro wind turbines are small-scale (typically under 6kW) wind generators suitable for homes or small businesses in suitable windy locations.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 76,
    question: 'What affects the viability of micro wind installations?',
    options: [
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
      'A rating system for actual operational energy performance of commercial buildings',
      'Rate of heat transfer through a building element (thermal transmittance)',
      'Using batteries to reduce maximum demand by discharging during peak consumption periods',
    ],
    correctAnswer: 0,
    explanation:
      'Micro wind viability depends on average wind speed, turbulence from buildings/trees, planning restrictions, and practical grid connection requirements.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'What is a micro-CHP system?',
    options: [
      'A programmable thermostat with WiFi, learning capability, and remote control',
      'Combined Heat and Power system that generates both electricity and useful heat',
      'Charging for the most power used in a billing period, not just total consumption',
      'Equipment that uses electricity to split water into hydrogen and oxygen',
    ],
    correctAnswer: 1,
    explanation:
      'Micro-CHP (Combined Heat and Power) generates electricity while capturing waste heat for space heating or hot water, achieving high overall efficiency.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 78,
    question: 'What is biomass heating?',
    options: [
      'Automatic ventilation adjustment based on occupancy or air quality sensors',
      'A small wind turbine (typically under 6kW) for domestic or small commercial use',
      'Heating using organic materials like wood pellets, chips, or logs',
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
    ],
    correctAnswer: 2,
    explanation:
      "Biomass heating burns organic materials (wood pellets, chips, logs) to provide heat. It's considered low carbon as the CO2 released equals that absorbed during growth.",
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 79,
    question: 'What is the RHI being replaced by?',
    options: [
      'Installing capacitors to counteract inductive reactive power',
      'Heating using organic materials like wood pellets, chips, or logs',
      'A to G (with A being most efficient)',
      'The Boiler Upgrade Scheme (BUS) for upfront grants',
    ],
    correctAnswer: 3,
    explanation:
      'The Renewable Heat Incentive (RHI) closed to new applicants and has been replaced by the Boiler Upgrade Scheme offering upfront grants.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 80,
    question: 'What is an EV charge point?',
    options: [
      'Equipment for charging electric vehicle batteries from the electrical supply',
      'Charging for the most power used in a billing period, not just total consumption',
      'A lease including environmental commitments from landlord and tenant',
      'Leadership in Energy and Environmental Design - an international green building rating',
    ],
    correctAnswer: 0,
    explanation:
      'An EV charge point is dedicated equipment that safely supplies electricity to charge electric vehicle batteries, ranging from 3kW to 350kW+.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 81,
    question: 'What are the typical power levels for home EV chargers?',
    options: [
      'A to G (with A being most efficient)',
      '7-22kW (typically 7kW for single-phase)',
      'Building Energy Management System',
      'Conservation of fuel and power',
    ],
    correctAnswer: 1,
    explanation:
      'Home EV chargers are typically 7kW for single-phase supplies (adding about 30 miles range per hour) or up to 22kW for three-phase installations.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 82,
    question: 'What Building Regulations apply to new EV charge point installations?',
    options: [
      'Energy Company Obligation - requiring energy suppliers to fund energy efficiency improvements',
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
      'Part S (Infrastructure for electric vehicles) and Part P (Electrical Safety)',
      'The measure of air leakage through the building fabric under pressure',
    ],
    correctAnswer: 2,
    explanation:
      'Part S requires EV charging infrastructure in new buildings and major renovations. Part P covers the electrical installation safety requirements.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'What is V2G (Vehicle to Grid)?',
    options: [
      'Automatic lighting control based on detecting presence or absence of people',
      'LED lighting that can adjust colour temperature from warm to cool white',
      'Glass that changes tint when voltage is applied, controlling light and heat transmission',
      'Technology allowing EVs to discharge power back to the grid or building',
    ],
    correctAnswer: 3,
    explanation:
      'V2G (Vehicle to Grid) enables bi-directional charging, allowing EV batteries to supply power back to the grid or building during peak demand periods.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'advanced',
  },
  {
    id: 84,
    question: 'What is solar thermal most commonly used for in the UK?',
    options: [
      'Domestic hot water pre-heating',
      'Electricity generation',
      'Pool heating only',
      'Space heating only',
    ],
    correctAnswer: 0,
    explanation:
      'Solar thermal in the UK is most commonly used for domestic hot water pre-heating, typically providing 50-70% of annual hot water requirements.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 85,
    question: 'What is the difference between monocrystalline and polycrystalline solar panels?',
    options: [
      'A centralised heating system distributing heat to multiple buildings from a central source',
      'Mono is more efficient and black in appearance; poly is slightly less efficient and blue-ish',
      'Areas where heat transfers more easily through the building envelope due to breaks in insulation',
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
    ],
    correctAnswer: 1,
    explanation:
      'Monocrystalline panels use single-crystal silicon, achieving higher efficiency (20%+) with uniform black appearance. Polycrystalline uses multiple crystals, slightly lower efficiency.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question: 'What is a hybrid inverter?',
    options: [
      'Using AI and data to predict and optimise future energy consumption patterns',
      'Upgrading existing buildings with improved insulation, heating, and technologies',
      'An inverter that manages both solar PV and battery storage in one unit',
      'Storing energy as heat or cold for later use in heating or cooling systems',
    ],
    correctAnswer: 2,
    explanation:
      'A hybrid inverter combines solar PV inverter and battery charger/inverter functions, managing solar generation, battery storage, grid connection, and loads.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 87,
    question: 'What is islanding in solar PV systems?',
    options: [
      'Maximum Power Point Tracking - optimising power extraction from panels',
      'A heat pump that extracts heat from outside air and transfers it indoors',
      'Mandatory energy audit for large UK organisations every 4 years',
      'When a solar system continues to power a circuit that has been disconnected from the grid',
    ],
    correctAnswer: 3,
    explanation:
      'Islanding occurs when a PV system energises a circuit disconnected from the grid - dangerous for utility workers. Anti-islanding protection is mandatory.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'advanced',
  },
  {
    id: 88,
    question: 'What is the purpose of a generation meter in solar PV systems?',
    options: [
      'Recording total electricity generated by the PV system for payment or monitoring',
      'Building Research Establishment Environmental Assessment Method - a sustainability rating',
      'A framework for domestic retrofit projects ensuring quality and risk management',
      'Lighting designed to support human health and circadian rhythm through colour and intensity changes',
    ],
    correctAnswer: 0,
    explanation:
      'A generation meter records total electricity produced by the PV system, required for SEG payments and monitoring system performance.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },
  {
    id: 89,
    question: 'What is MCS certification?',
    options: [
      'Technology that captures CO2 directly from ambient air for storage or use',
      'Microgeneration Certification Scheme - required for installer competence and grant eligibility',
      'A transformer providing simple separation between the AC and DC sides, OR an RCD type B on the AC side',
      'Prevention → Preparing for re-use → Recycling → Other recovery (including energy recovery) → Disposal as last resort',
    ],
    correctAnswer: 1,
    explanation:
      'MCS (Microgeneration Certification Scheme) certifies installers and products, required for eligibility for government schemes like SEG and BUS.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question: 'What is a heat pump hot water cylinder?',
    options: [
      'Power consumption varies with the cube of speed (Affinity Laws)',
      'A framework for domestic retrofit projects ensuring quality and risk management',
      'A larger, well-insulated cylinder designed for lower-temperature heat pump operation',
      'Distributing available power across multiple charge points to prevent overload',
    ],
    correctAnswer: 2,
    explanation:
      'Heat pump cylinders are typically larger (200-300L) and better insulated than standard cylinders, designed for efficient operation at lower temperatures.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'What is defrost cycle in air source heat pumps?',
    options: [
      'A framework for domestic retrofit projects ensuring quality and risk management',
      'A small wind turbine (typically under 6kW) for domestic or small commercial use',
      'Calculating non-domestic building energy performance',
      'Automatic reversal to remove ice build-up on the outdoor unit',
    ],
    correctAnswer: 3,
    explanation:
      'In cold weather, ice can form on the ASHP outdoor unit. The defrost cycle temporarily reverses operation to melt ice and maintain efficiency.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 92,
    question: 'What is the bivalent point for heat pumps?',
    options: [
      'Outdoor temperature below which supplementary heating is needed',
      'Mandatory energy and carbon reporting for qualifying large UK companies',
      'Making misleading claims about environmental benefits to appear more sustainable',
      'Technology delivering electrical power along with data on Ethernet cables',
    ],
    correctAnswer: 0,
    explanation:
      'The bivalent point is the outdoor temperature below which the heat pump alone cannot meet heating demand and supplementary heating (e.g., immersion) is needed.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'advanced',
  },
  {
    id: 93,
    question: 'What regulations govern EV charger installation in dwellings?',
    options: [
      'Maximum Power Point Tracking - optimising power extraction from panels',
      'Part P (electrical safety), Part S (EV infrastructure), and relevant equipment standards',
      'Using data and analytics to predict when equipment will need maintenance before failure',
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
    ],
    correctAnswer: 1,
    explanation:
      'EV charger installation must comply with Part P (BS 7671), Part S requirements for new buildings, and equipment standards like BS EN 61851.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 94,
    question: 'What is smart charging for EVs?',
    options: [
      'Using an EV battery to power home appliances, acting as a home battery',
      'Part P (electrical safety), Part S (EV infrastructure), and relevant equipment standards',
      'Intelligent charging that optimises timing based on tariffs, grid demand, or renewable availability',
      'Measuring energy consumption of individual circuits, areas, or equipment for analysis',
    ],
    correctAnswer: 2,
    explanation:
      'Smart charging optimises EV charging based on electricity tariffs, grid demand, solar generation availability, and user requirements.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 95,
    question: 'What is peak shaving with battery storage?',
    options: [
      'Evaluating environmental impacts throughout a product\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s life from raw materials to disposal',
      'CIBSE guidance for predicting actual operational energy use in buildings',
      'Technology that captures CO2 directly from ambient air for storage or use',
      'Using batteries to reduce maximum demand by discharging during peak consumption periods',
    ],
    correctAnswer: 3,
    explanation:
      'Peak shaving uses battery storage to reduce maximum demand charges by discharging batteries during peak consumption periods instead of drawing from the grid.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 2.4: Smart Building Systems (Questions 96-125)
  // ============================================
  {
    id: 96,
    question: 'What is building automation?',
    options: [
      'Automatic control of building services like HVAC, lighting, and security',
      'Storing energy by pumping water uphill, then releasing it through turbines when needed',
      'A virtual replica of a building integrating real-time data for monitoring and simulation',
      'Financial penalties up to £150,000 for non-domestic properties',
    ],
    correctAnswer: 0,
    explanation:
      'Building automation uses control systems to automatically manage building services including heating, ventilation, air conditioning, lighting, and security.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 97,
    question: 'What is a BMS (Building Management System)?',
    options: [
      'A plug adapter allowing remote control and monitoring of connected devices',
      'A centralised system for monitoring and controlling building services',
      'A heat pump extracting heat from the ground via buried pipes or boreholes',
      'Using batteries to reduce maximum demand by discharging during peak consumption periods',
    ],
    correctAnswer: 1,
    explanation:
      'A BMS is a computer-based control system that monitors and manages building services from a central location, optimising energy use and comfort.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 98,
    question: 'What protocol is commonly used for building automation?',
    options: [
      'Conservation of fuel and power',
      'PV generates electricity; thermal heats water or air',
      'BACnet, Modbus, KNX, or DALI for lighting',
      'Energy Performance Certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Common building automation protocols include BACnet (widely used for HVAC), Modbus, KNX (European standard), and DALI specifically for lighting control.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 99,
    question: 'What is DALI in lighting control?',
    options: [
      'Automatically dimming artificial lighting in response to available natural light',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'Inductive charging transferring power without physical cable connection',
      'Digital Addressable Lighting Interface - a protocol for digital lighting control',
    ],
    correctAnswer: 3,
    explanation:
      'DALI (Digital Addressable Lighting Interface) is a standardised protocol for digital lighting control, allowing individual addressing and dimming of luminaires.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'What is the benefit of addressable lighting control?',
    options: [
      'Individual control of each luminaire for flexibility, energy savings, and tuning',
      'A virtual replica of a building integrating real-time data for monitoring and simulation',
      'Direct emissions (1), indirect from purchased energy (2), and value chain emissions (3)',
      'A rating system for actual operational energy performance of commercial buildings',
    ],
    correctAnswer: 0,
    explanation:
      'Addressable control allows individual luminaires to be controlled independently, enabling flexible scene setting, occupancy-based control, and fine-tuned energy management.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 101,
    question: 'What is KNX?',
    options: [
      'Heating using organic materials like wood pellets, chips, or logs',
      'A worldwide standard for home and building automation',
      '800-1000ppm, with outdoor levels around 400ppm',
      'Financial penalties up to £150,000 for non-domestic properties',
    ],
    correctAnswer: 1,
    explanation:
      'KNX is a worldwide standard (ISO 14543) for home and building automation, supporting lighting, HVAC, blinds, security, and energy management.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 102,
    question: 'What is a smart thermostat?',
    options: [
      'Storing energy as heat or cold for later use in heating or cooling systems',
      'Technology that captures CO2 directly from ambient air for storage or use',
      'A programmable thermostat with WiFi, learning capability, and remote control',
      'A centralised heating system distributing heat to multiple buildings from a central source',
    ],
    correctAnswer: 2,
    explanation:
      'Smart thermostats connect to WiFi for remote control, learn user preferences, and can integrate with other smart home devices for optimised heating control.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 103,
    question: 'What is geofencing in smart heating control?',
    options: [
      'A centralised heating system distributing heat to multiple buildings from a central source',
      'An inverter that manages both solar PV and battery storage in one unit',
      'Compensating for emissions by investing in projects that reduce CO2 elsewhere',
      'Using smartphone location to automatically adjust heating when occupants leave or approach',
    ],
    correctAnswer: 3,
    explanation:
      'Geofencing uses smartphone GPS to detect when occupants leave or approach home, automatically adjusting heating to save energy when away and ensuring comfort on return.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'What is a smart plug?',
    options: [
      'A plug adapter allowing remote control and monitoring of connected devices',
      'Individual control of each luminaire for flexibility, energy savings, and tuning',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'Technology allowing EVs to discharge power back to the grid or building',
    ],
    correctAnswer: 0,
    explanation:
      'A smart plug connects to WiFi, allowing remote on/off control, scheduling, and often energy monitoring of plugged-in devices via smartphone app.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 105,
    question: 'What is Z-Wave?',
    options: [
      'Making misleading claims about environmental benefits to appear more sustainable',
      'A wireless protocol designed for smart home device communication',
      'Risk that buildings become unmarketable or devalued due to poor energy performance',
      'Cost-effective improvements to increase the energy efficiency rating',
    ],
    correctAnswer: 1,
    explanation:
      'Z-Wave is a wireless mesh networking protocol specifically designed for smart home devices, operating at sub-1GHz frequencies with low power consumption.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 106,
    question: 'What is Zigbee?',
    options: [
      'Heating using organic materials like wood pellets, chips, or logs',
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'A low-power wireless mesh protocol for smart home and IoT devices',
      '75% of fixed lighting outlets must have efficient fittings (typically LED)',
    ],
    correctAnswer: 2,
    explanation:
      'Zigbee is a low-power wireless mesh networking protocol widely used in smart home devices, operating at 2.4GHz and supporting thousands of nodes.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 107,
    question: 'What is Matter in smart home technology?',
    options: [
      'Inductive charging transferring power without physical cable connection',
      'An inverter that manages both solar PV and battery storage in one unit',
      'A heat pump extracting heat from the ground via buried pipes or boreholes',
      'A new interoperability standard unifying smart home ecosystems',
    ],
    correctAnswer: 3,
    explanation:
      'Matter is a new interoperability standard allowing smart home devices from different manufacturers to work together seamlessly across ecosystems.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'advanced',
  },
  {
    id: 108,
    question: 'What is PoE (Power over Ethernet)?',
    options: [
      'Technology delivering electrical power along with data on Ethernet cables',
      'A small wind turbine (typically under 6kW) for domestic or small commercial use',
      'A system minimising waste by reusing, recycling, and regenerating materials',
      'PV generates electricity; thermal heats water or air',
    ],
    correctAnswer: 0,
    explanation:
      'PoE (Power over Ethernet) delivers DC power alongside data over standard Ethernet cables, eliminating separate power supplies for devices like cameras and access points.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question: 'What power levels can PoE provide?',
    options: [
      'When a building is built, sold, or rented',
      'From 15W (PoE) to 90W+ (PoE++/802.3bt)',
      '800-1000ppm, with outdoor levels around 400ppm',
      'Conservation of fuel and power',
    ],
    correctAnswer: 1,
    explanation:
      'PoE standards range from 15.4W (802.3af) through 30W (802.3at/PoE+) to 90W+ (802.3bt/PoE++) for high-power devices like PTZ cameras or displays.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question: 'What is PoE lighting?',
    options: [
      'Technology delivering electrical power along with data on Ethernet cables',
      'A lease including environmental commitments from landlord and tenant',
      'LED lighting systems powered and controlled through Ethernet cables',
      'Equipment that uses electricity to split water into hydrogen and oxygen',
    ],
    correctAnswer: 2,
    explanation:
      'PoE lighting uses Ethernet cables to deliver both power and control data to LED luminaires, enabling individual fixture control and data collection.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question: 'What is the benefit of PoE lighting in commercial buildings?',
    options: [
      'A reference dwelling with the same shape but meeting minimum standards, used for comparison',
      'Automatic lighting control based on detecting presence or absence of people',
      'Digital Addressable Lighting Interface - a protocol for digital lighting control',
      'Granular control, energy monitoring per fixture, and integration with building systems',
    ],
    correctAnswer: 3,
    explanation:
      'PoE lighting enables individual fixture control, real-time energy monitoring, occupancy data collection, and easy integration with BMS and IT systems.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question: 'What is a smart lighting scene?',
    options: [
      'A preset combination of light levels and colours for different activities or moods',
      'Distributed ledger technology enabling transparent, secure energy transactions and trading',
      'Deliberately reducing electrical load by switching off non-essential equipment during peak demand',
      'The ratio of real power to apparent power, indicating how efficiently power is used',
    ],
    correctAnswer: 0,
    explanation:
      'A lighting scene is a preset combination of individual light settings (levels, colours, zones) that can be recalled with a single command for different activities.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 113,
    question: 'What is human-centric lighting (HCL)?',
    options: [
      'Microgeneration Certification Scheme - required for installer competence and grant eligibility',
      'Lighting designed to support human health and circadian rhythm through colour and intensity changes',
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'A preset combination of light levels and colours for different activities or moods',
    ],
    correctAnswer: 1,
    explanation:
      'Human-centric lighting adjusts colour temperature and intensity throughout the day to support natural circadian rhythms and improve wellbeing and productivity.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 114,
    question: 'What is tuneable white lighting?',
    options: [
      'Standard Assessment Procedure - the methodology for calculating dwelling energy performance',
      'An inverter that manages both solar PV and battery storage in one unit',
      'LED lighting that can adjust colour temperature from warm to cool white',
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
    ],
    correctAnswer: 2,
    explanation:
      'Tuneable white lighting uses multiple LED types to adjust colour temperature, typically from warm white (2700K) to cool daylight (6500K).',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'What is an IoT sensor in buildings?',
    options: [
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'Using AI to identify individual appliance consumption from whole-building smart meter data',
      'A low-power wireless mesh protocol for smart home and IoT devices',
      'An internet-connected sensor that collects and transmits data about building conditions',
    ],
    correctAnswer: 3,
    explanation:
      'IoT sensors are internet-connected devices that monitor building conditions (temperature, occupancy, air quality, etc.) and transmit data for analysis and control.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 116,
    question: 'What is indoor air quality (IAQ) monitoring?',
    options: [
      'Monitoring CO2, humidity, VOCs, and particulates to ensure healthy indoor environments',
      'A solar system connected to the mains grid, exporting excess generation',
      'An electronic device that controls motor speed by varying the frequency of power supply',
      'A small wind turbine (typically under 6kW) for domestic or small commercial use',
    ],
    correctAnswer: 0,
    explanation:
      'IAQ monitoring uses sensors to measure CO2 levels, humidity, VOCs, and particulates, enabling ventilation control to maintain healthy indoor environments.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'What CO2 level typically triggers increased ventilation?',
    options: [
      '18-22% for standard panels, up to 25%+ for premium',
      '800-1000ppm, with outdoor levels around 400ppm',
      'Pass, Good, Very Good, Excellent, Outstanding',
      'Below about 55°C (return temperature below dew point ~54°C)',
    ],
    correctAnswer: 1,
    explanation:
      'CO2 levels above 800-1000ppm typically trigger increased ventilation in demand-controlled systems. Outdoor air is around 400ppm; levels above 1500ppm indicate poor ventilation.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question: 'What is demand-controlled ventilation (DCV)?',
    options: [
      'A target for total primary energy consumption including generation and distribution losses',
      'A system minimising waste by reusing, recycling, and regenerating materials',
      'Automatic ventilation adjustment based on occupancy or air quality sensors',
      'Granular control, energy monitoring per fixture, and integration with building systems',
    ],
    correctAnswer: 2,
    explanation:
      'DCV automatically adjusts ventilation rates based on actual occupancy (CO2 sensors) or air quality, saving energy compared to fixed ventilation rates.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'What is a building digital twin?',
    options: [
      'A heat pump that extracts heat from outside air and transfers it indoors',
      'As grid electricity becomes cleaner, electric heating produces fewer emissions than gas',
      'Building Information Modelling - digital representation with data about building elements',
      'A virtual replica of a building integrating real-time data for monitoring and simulation',
    ],
    correctAnswer: 3,
    explanation:
      'A digital twin is a virtual model of a building that integrates real-time sensor data, enabling monitoring, analysis, simulation, and optimisation of building performance.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'advanced',
  },
  {
    id: 120,
    question: 'What is BIM in building design?',
    options: [
      'Building Information Modelling - digital representation with data about building elements',
      'Technology that captures CO2 directly from ambient air for storage or use',
      'Storing excess renewable generation for use when production is low',
      'A government grant towards installing heat pumps or biomass boilers',
    ],
    correctAnswer: 0,
    explanation:
      'BIM (Building Information Modelling) creates intelligent 3D models containing data about building elements, used throughout design, construction, and operation.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 121,
    question: 'What is a smart meter In-Home Display (IHD)?',
    options: [
      'CIBSE guidance for predicting actual operational energy use in buildings',
      'A device showing real-time energy usage and costs from the smart meter',
      'For all new dwellings or where required by Building Control',
      'Solar cells integrated into building materials like roof tiles, facades, or windows',
    ],
    correctAnswer: 1,
    explanation:
      'An IHD is a portable display unit that shows real-time gas and electricity consumption and costs from the smart meter, helping users understand usage.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 122,
    question: 'What is load balancing in EV charging?',
    options: [
      'Power is the rate of energy use (kW); energy is power over time (kWh)',
      'Using data and analytics to predict when equipment will need maintenance before failure',
      'Distributing available power across multiple charge points to prevent overload',
      'A centralised heating system distributing heat to multiple buildings from a central source',
    ],
    correctAnswer: 2,
    explanation:
      'Load balancing (or load management) distributes available electrical capacity across multiple EV chargers, preventing main supply overload while maximising charging.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 123,
    question: 'What is an energy dashboard?',
    options: [
      'Information about efficient operation of heating, ventilation, and hot water systems',
      'An internet-connected sensor that collects and transmits data about building conditions',
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
      'A visual display presenting real-time energy consumption data and trends',
    ],
    correctAnswer: 3,
    explanation:
      'An energy dashboard visualises real-time and historical energy data, showing consumption patterns, costs, and comparisons to help identify savings opportunities.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 124,
    question: 'What is predictive maintenance in building systems?',
    options: [
      'Using data and analytics to predict when equipment will need maintenance before failure',
      'Financial penalties up to £150,000 for non-domestic properties',
      'Technology that captures CO2 directly from ambient air for storage or use',
      'LED lighting that can adjust colour temperature from warm to cool white',
    ],
    correctAnswer: 0,
    explanation:
      'Predictive maintenance uses sensor data and analytics to predict when equipment is likely to fail, enabling maintenance before breakdown occurs.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: 'What is fault detection and diagnostics (FDD)?',
    options: [
      'A mandatory inspection for AC systems over 12kW, assessing efficiency and sizing',
      'Automated systems that identify operational faults and their likely causes in building systems',
      'Electricity consumed by devices when switched off but still plugged in',
      'An electronic device that controls motor speed by varying the frequency of power supply',
    ],
    correctAnswer: 1,
    explanation:
      'FDD systems automatically analyse building data to detect operational faults, inefficiencies, and their probable causes, enabling faster resolution.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 2.5: EPCs & Compliance (Questions 126-150)
  // ============================================
  {
    id: 126,
    question: 'How long is an EPC valid for?',
    options: [
      '1 year',
      '5 years',
      '10 years',
      'Indefinitely',
    ],
    correctAnswer: 2,
    explanation:
      'An EPC is valid for 10 years from the date of issue, unless significant changes are made to the property that affect its energy performance.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 127,
    question: 'When must an EPC be provided?',
    options: [
      '7-22kW (typically 7kW for single-phase)',
      'PV generates electricity; thermal heats water or air',
      'A worldwide standard for home and building automation',
      'When a building is built, sold, or rented',
    ],
    correctAnswer: 3,
    explanation:
      'An EPC must be provided when a building is constructed, sold, or let. It must be made available to prospective buyers or tenants.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 128,
    question: 'Who can produce an EPC?',
    options: [
      'An accredited domestic or non-domestic energy assessor',
      'Coefficient of Performance - ratio of heat output to electrical input',
      'Systematic assessment of energy use to identify savings opportunities',
      'Convert DC electricity from panels to AC electricity for use or export',
    ],
    correctAnswer: 0,
    explanation:
      'EPCs must be produced by accredited energy assessors registered with an approved accreditation scheme.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 129,
    question: 'What does the EPC recommendations report contain?',
    options: [
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'Cost-effective improvements to increase the energy efficiency rating',
      'Average efficiency of a heat pump over an entire heating season',
      'Rate of heat transfer through a building element (thermal transmittance)',
    ],
    correctAnswer: 1,
    explanation:
      "The EPC recommendations report suggests cost-effective improvements that could increase the property's energy rating, with estimated costs and potential savings.",
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 130,
    question: 'What is MEES (Minimum Energy Efficiency Standards)?',
    options: [
      'A government grant towards installing heat pumps or biomass boilers',
      'For all new dwellings or where required by Building Control',
      'Regulations setting minimum EPC ratings for rental properties',
      'The Boiler Upgrade Scheme (BUS) for upfront grants',
    ],
    correctAnswer: 2,
    explanation:
      'MEES regulations set minimum EPC ratings that rental properties must achieve. Currently Band E, with proposals to increase to C for some properties.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 131,
    question: 'What exemptions exist for MEES requirements?',
    options: [
      'A virtual replica of a building integrating real-time data for monitoring and simulation',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'A target for total primary energy consumption including generation and distribution losses',
      'If improvements are not cost-effective (payback over 7 years), wall insulation would damage property, or consent not obtained',
    ],
    correctAnswer: 3,
    explanation:
      'MEES exemptions include improvements not being cost-effective (7-year payback test), wall insulation causing damage, third-party consent not being obtainable, or recent property acquisition.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question: 'What penalty can landlords face for MEES non-compliance?',
    options: [
      'Financial penalties up to £150,000 for non-domestic properties',
      'An international treaty on climate change limiting global warming to 1.5-2°C',
      'Electricity consumed by devices when switched off but still plugged in',
      'A programmable thermostat with WiFi, learning capability, and remote control',
    ],
    correctAnswer: 0,
    explanation:
      'MEES non-compliance can result in civil penalties. Non-domestic property penalties can reach £150,000, with domestic penalties typically up to £5,000.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question: 'What is a DEC (Display Energy Certificate)?',
    options: [
      'Power is the rate of energy use (kW); energy is power over time (kWh)',
      'A certificate showing actual energy use in public buildings over 250m²',
      'Large battery installations storing electricity to balance grid supply and demand',
      'Technology that captures CO2 directly from ambient air for storage or use',
    ],
    correctAnswer: 1,
    explanation:
      'A DEC shows the actual energy performance of a public building based on metered consumption, required for buildings over 250m² frequently visited by the public.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 134,
    question: 'What is the difference between an EPC and a DEC?',
    options: [
      'Replacing fossil fuel heating with electric systems like heat pumps',
      'Automatically dimming artificial lighting in response to available natural light',
      'EPC is based on calculated/design performance; DEC shows actual measured energy use',
      'Monitoring CO2, humidity, VOCs, and particulates to ensure healthy indoor environments',
    ],
    correctAnswer: 2,
    explanation:
      'EPCs are based on calculated/designed energy performance. DECs show actual operational energy use based on metered consumption over the past year.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question: 'What is an ESOS (Energy Savings Opportunity Scheme) audit?',
    options: [
      'Technology delivering electrical power along with data on Ethernet cables',
      'Building services that must meet minimum efficiency standards when replaced',
      'When a household cannot afford to adequately heat their home',
      'Mandatory energy audit for large UK organisations every 4 years',
    ],
    correctAnswer: 3,
    explanation:
      'ESOS requires large UK organisations (250+ employees or >€50M turnover) to conduct energy audits every 4 years, identifying energy saving opportunities.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 136,
    question: 'What is SECR (Streamlined Energy and Carbon Reporting)?',
    options: [
      'Mandatory energy and carbon reporting for qualifying large UK companies',
      'Making misleading claims about environmental benefits to appear more sustainable',
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
      'Rate of heat transfer through a building element (thermal transmittance)',
    ],
    correctAnswer: 0,
    explanation:
      'SECR requires qualifying large UK companies to report energy use and carbon emissions in their annual reports, including intensity ratios and efficiency actions.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 137,
    question: 'What is an air conditioning inspection report?',
    options: [
      'Regulations setting minimum EPC ratings for rental properties',
      'A mandatory inspection for AC systems over 12kW, assessing efficiency and sizing',
      'A device that generates electricity from hydrogen and oxygen through chemical reaction',
      'A government scheme providing insulation grants to improve energy efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'AC systems over 12kW must be inspected by an accredited assessor every 5 years, assessing efficiency and providing recommendations for improvement.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'What is the Building Regulations Part F about?',
    options: [
      'Fire safety',
      'Foundations',
      'Ventilation requirements',
      'Fuel storage',
    ],
    correctAnswer: 2,
    explanation:
      'Part F of the Building Regulations covers ventilation requirements in buildings to maintain indoor air quality and prevent condensation.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 139,
    question: 'What is the TM54 methodology?',
    options: [
      'Using data and analytics to predict when equipment will need maintenance before failure',
      'Automatic reversal to remove ice build-up on the outdoor unit',
      'A framework for domestic retrofit projects ensuring quality and risk management',
      'CIBSE guidance for predicting actual operational energy use in buildings',
    ],
    correctAnswer: 3,
    explanation:
      "CIBSE TM54 provides methodology for predicting operational energy use in buildings, addressing the 'performance gap' between design and actual performance.",
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'advanced',
  },
  {
    id: 140,
    question: "What is the 'performance gap' in buildings?",
    options: [
      'The difference between designed/predicted and actual operational energy performance',
      'A test to measure air leakage rate through the building envelope',
      'Hydrogen produced using renewable electricity through electrolysis of water',
      'A lease including environmental commitments from landlord and tenant',
    ],
    correctAnswer: 0,
    explanation:
      "The performance gap is the common discrepancy between a building's designed/predicted energy performance and its actual operational energy consumption.",
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 141,
    question: 'What is net zero carbon in buildings?',
    options: [
      'When a solar system continues to power a circuit that has been disconnected from the grid',
      'A building that produces zero net carbon emissions over a year through efficiency and renewables',
      'Independent body advising UK government on emissions targets and progress',
      'Charging for the most power used in a billing period, not just total consumption',
    ],
    correctAnswer: 1,
    explanation:
      "Net zero carbon means a building's operations result in zero net carbon emissions annually, through high efficiency, on-site renewables, and/or carbon offsetting.",
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 142,
    question: 'What is embodied carbon in buildings?',
    options: [
      "A building designed to ultra-low energy standards with minimal heating demand",
      "The difference between designed/predicted and actual operational energy performance",
      "The carbon emissions from materials, construction, and eventual demolition - the building's lifecycle",
      "Direct energy trading between producers and consumers without traditional utilities",
    ],
    correctAnswer: 2,
    explanation:
      'Embodied carbon includes emissions from extracting materials, manufacturing, transporting, constructing, maintaining, and eventually demolishing a building.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question: 'What is NABERS UK?',
    options: [
      'Type B (or Type A combined with appropriate residual DC monitoring)',
      'Digital Addressable Lighting Interface - a protocol for digital lighting control',
      'Charging for the most power used in a billing period, not just total consumption',
      'A rating system for actual operational energy performance of commercial buildings',
    ],
    correctAnswer: 3,
    explanation:
      'NABERS UK rates commercial buildings based on actual operational energy use, providing a star rating from 1-6 stars for transparency about real performance.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'advanced',
  },
  {
    id: 144,
    question: 'What is BREEAM?',
    options: [
      'Building Research Establishment Environmental Assessment Method - a sustainability rating',
      'Charging for the most power used in a billing period, not just total consumption',
      'Glass that changes tint when voltage is applied, controlling light and heat transmission',
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
    ],
    correctAnswer: 0,
    explanation:
      'BREEAM is a widely used sustainability assessment method for buildings, rating performance across categories including energy, water, materials, and ecology.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'What BREEAM ratings are available?',
    options: [
      'Carbon dioxide (CO2) emissions per unit of energy',
      'Pass, Good, Very Good, Excellent, Outstanding',
      'From 15W (PoE) to 90W+ (PoE++/802.3bt)',
      'BACnet, Modbus, KNX, or DALI for lighting',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM ratings are: Unclassified, Pass, Good, Very Good, Excellent, and Outstanding, based on percentage score across various sustainability categories.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'What is LEED certification?',
    options: [
      'Financial penalties up to £150,000 for non-domestic properties',
      'Measuring energy consumption of individual circuits, areas, or equipment for analysis',
      'Leadership in Energy and Environmental Design - an international green building rating',
      'An electronic device that controls motor speed by varying the frequency of power supply',
    ],
    correctAnswer: 2,
    explanation:
      'LEED (Leadership in Energy and Environmental Design) is an internationally recognised green building certification system with levels from Certified to Platinum.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 147,
    question: 'What is a Passivhaus building?',
    options: [
      'A unit of energy equal to using 1000 watts for one hour',
      'Making misleading claims about environmental benefits to appear more sustainable',
      'Off-site manufacturing and innovative construction techniques reducing waste and time',
      'A building designed to ultra-low energy standards with minimal heating demand',
    ],
    correctAnswer: 3,
    explanation:
      'Passivhaus is a rigorous building standard achieving very low energy consumption through excellent insulation, airtightness, heat recovery, and solar gain management.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 148,
    question: 'What maximum heating demand does Passivhaus certification require?',
    options: [
      '15 kWh/m²/year',
      '50 kWh/m²/year',
      '100 kWh/m²/year',
      'No limit',
    ],
    correctAnswer: 0,
    explanation:
      'Passivhaus certification requires maximum heating/cooling demand of 15 kWh/m²/year, achieved through exceptional building fabric and heat recovery ventilation.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'advanced',
  },
  {
    id: 149,
    question: 'What is the Green Building Council?',
    options: [
      'The ratio of real power to apparent power, indicating how efficiently power is used',
      'An industry body promoting sustainable building practices and policy',
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
      'Building services that must meet minimum efficiency standards when replaced',
    ],
    correctAnswer: 1,
    explanation:
      'The UK Green Building Council is an industry network promoting sustainability in the built environment through policy influence, best practice guidance, and member collaboration.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 150,
    question: 'What is the Building Regulations Part O about?',
    options: [
      'A to G (with A being most efficient)',
      'A low-power wireless mesh protocol for smart home and IoT devices',
      'Overheating mitigation in new residential buildings',
      'For all new dwellings or where required by Building Control',
    ],
    correctAnswer: 2,
    explanation:
      'Part O (introduced 2022) sets requirements to mitigate overheating risk in new residential buildings, addressing concerns about climate change and summer comfort.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 2.6: Sustainability (Questions 151-175)
  // ============================================
  {
    id: 151,
    question: "What is the UK's net zero target year?",
    options: [
      '2030',
      '2040',
      '2060',
      '2050',
    ],
    correctAnswer: 3,
    explanation:
      'The UK has a legally binding target to achieve net zero greenhouse gas emissions by 2050 under the Climate Change Act 2008 (as amended).',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 152,
    question: 'What is the circular economy in construction?',
    options: [
      'A system minimising waste by reusing, recycling, and regenerating materials',
      'A heat pump that extracts heat from outside air and transfers it indoors',
      'Systematic assessment of energy use to identify savings opportunities',
      'Information about efficient operation of heating, ventilation, and hot water systems',
    ],
    correctAnswer: 0,
    explanation:
      'The circular economy aims to eliminate waste by designing for durability, reuse, and recycling, keeping materials in use rather than disposing of them.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question: 'What is a carbon footprint?',
    options: [
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'A system minimising waste by reusing, recycling, and regenerating materials',
      'A framework for domestic retrofit projects ensuring quality and risk management',
    ],
    correctAnswer: 1,
    explanation:
      'A carbon footprint measures total greenhouse gas emissions (expressed as CO2 equivalent) associated with an activity, product, organisation, or individual.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 154,
    question: 'What is lifecycle assessment (LCA)?',
    options: [
      "Using an EV battery to power home appliances, acting as a home battery",
      "An emissions reduction target aligned with climate science to limit global warming",
      "Evaluating environmental impacts throughout a product's life from raw materials to disposal",
      "The ratio of real power to apparent power, indicating how efficiently power is used",
    ],
    correctAnswer: 2,
    explanation:
      "LCA evaluates environmental impacts throughout a product or building's entire lifecycle, from raw material extraction through use to end-of-life disposal or recycling.",
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 155,
    question: 'What is scope 1, 2, and 3 emissions?',
    options: [
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
      'Adjusting energy consumption patterns in response to grid signals or time-of-use tariffs',
      'Using smartphone location to automatically adjust heating when occupants leave or approach',
      'Direct emissions (1), indirect from purchased energy (2), and value chain emissions (3)',
    ],
    correctAnswer: 3,
    explanation:
      'Scope 1: direct emissions from owned/controlled sources. Scope 2: indirect from purchased energy. Scope 3: all other indirect emissions in the value chain.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'What is carbon offsetting?',
    options: [
      'Compensating for emissions by investing in projects that reduce CO2 elsewhere',
      'A preset combination of light levels and colours for different activities or moods',
      'Intelligent charging that optimises timing based on tariffs, grid demand, or renewable availability',
      'A heat pump extracting heat from the ground via buried pipes or boreholes',
    ],
    correctAnswer: 0,
    explanation:
      'Carbon offsetting compensates for emissions by investing in projects that reduce, avoid, or remove equivalent CO2 emissions elsewhere, such as reforestation.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 157,
    question: 'What is a Science Based Target?',
    options: [
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'An emissions reduction target aligned with climate science to limit global warming',
      'A digital meter that records energy use and communicates with the supplier remotely',
      'The CO2 emission rate the building must achieve, based on the notional dwelling',
    ],
    correctAnswer: 1,
    explanation:
      'Science Based Targets are corporate emissions reduction targets consistent with climate science requirements to limit global warming to 1.5°C or well below 2°C.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 158,
    question: 'What is the purpose of the Climate Change Committee?',
    options: [
      'Using machine learning to optimise building operations, predict faults, and improve efficiency',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'Independent body advising UK government on emissions targets and progress',
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
    ],
    correctAnswer: 2,
    explanation:
      'The Climate Change Committee is an independent statutory body advising UK governments on emissions targets and reporting on progress towards them.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 159,
    question: 'What is greenwashing?',
    options: [
      'Direct energy trading between producers and consumers without traditional utilities',
      'Automatic ventilation adjustment based on occupancy or air quality sensors',
      'Mandatory energy and carbon reporting for qualifying large UK companies',
      'Making misleading claims about environmental benefits to appear more sustainable',
    ],
    correctAnswer: 3,
    explanation:
      'Greenwashing is making false or misleading claims about environmental credentials to create an impression of sustainability without substantive action.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 160,
    question: 'What are Sustainable Development Goals (SDGs)?',
    options: [
      '17 UN global goals addressing economic, social, and environmental challenges by 2030',
      'Regulations setting minimum EPC ratings for rental properties',
      'Maximum Power Point Tracking - optimising power extraction from panels',
      'Information about efficient operation of heating, ventilation, and hot water systems',
    ],
    correctAnswer: 0,
    explanation:
      'The SDGs are 17 interconnected global goals adopted by UN member states addressing poverty, inequality, climate, environmental degradation, peace, and justice by 2030.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 161,
    question: 'What is the Paris Agreement?',
    options: [
      'An industry body promoting sustainable building practices and policy',
      'An international treaty on climate change limiting global warming to 1.5-2°C',
      'The CO2 emission rate the building must achieve, based on the notional dwelling',
      'Coefficient of Performance - ratio of heat output to electrical input',
    ],
    correctAnswer: 1,
    explanation:
      'The Paris Agreement is a legally binding international treaty on climate change, aiming to limit global warming to well below 2°C, preferably 1.5°C, above pre-industrial levels.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 162,
    question: 'What is ESG in business?',
    options: [
      'Automatic reversal to remove ice build-up on the outdoor unit',
      'An industry body promoting sustainable building practices and policy',
      'Environmental, Social, and Governance - criteria for assessing corporate sustainability',
      'A building that generates more energy than it consumes over a year',
    ],
    correctAnswer: 2,
    explanation:
      'ESG (Environmental, Social, Governance) criteria are used by investors and stakeholders to evaluate corporate behaviour and sustainability performance.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 163,
    question: 'What is a green lease?',
    options: [
      'Using hydrogen gas (potentially blended with natural gas or 100%) for building heating',
      'Individual control of each luminaire for flexibility, energy savings, and tuning',
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
      'A lease including environmental commitments from landlord and tenant',
    ],
    correctAnswer: 3,
    explanation:
      'A green lease includes clauses committing both landlord and tenant to sustainable practices, energy efficiency measures, and data sharing.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 164,
    question: 'What is the electrification of heat?',
    options: [
      'Replacing fossil fuel heating with electric systems like heat pumps',
      'Capturing CO2 emissions and storing them underground to prevent atmospheric release',
      'Carbon dioxide (CO2) emissions per unit of energy',
      'Heating using organic materials like wood pellets, chips, or logs',
    ],
    correctAnswer: 0,
    explanation:
      'Electrification of heat involves replacing gas boilers and other fossil fuel heating with efficient electric systems, primarily heat pumps, to decarbonise buildings.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 165,
    question: 'Why is grid decarbonisation important for building emissions?',
    options: [
      'A ventilation system that recovers heat from exhaust air to warm incoming fresh air',
      'As grid electricity becomes cleaner, electric heating produces fewer emissions than gas',
      'Compensating for emissions by investing in projects that reduce CO2 elsewhere',
      'An internet-connected sensor that collects and transmits data about building conditions',
    ],
    correctAnswer: 1,
    explanation:
      'As the electricity grid decarbonises (more renewables, less fossil fuel), electric heating produces fewer emissions, eventually making heat pumps significantly cleaner than gas.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question: 'What is hydrogen heating?',
    options: [
      'Automated systems that identify operational faults and their likely causes in building systems',
      'Measuring energy consumption of individual circuits, areas, or equipment for analysis',
      'Using hydrogen gas (potentially blended with natural gas or 100%) for building heating',
      'Heating using organic materials like wood pellets, chips, or logs',
    ],
    correctAnswer: 2,
    explanation:
      'Hydrogen heating proposes using hydrogen (blended or pure) in modified boilers for building heat, though its viability compared to heat pumps is debated.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'What is district heating?',
    options: [
      'Storing excess renewable generation for use when production is low',
      'Using machine learning to optimise building operations, predict faults, and improve efficiency',
      'Aggregated distributed energy resources acting together as a single power plant',
      'A centralised heating system distributing heat to multiple buildings from a central source',
    ],
    correctAnswer: 3,
    explanation:
      'District heating distributes heat from a central plant (using various sources) through insulated pipes to multiple buildings, potentially achieving economies of scale.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 168,
    question: 'What is a heat network?',
    options: [
      'Another term for district heating - distributing heat from central source to buildings',
      'A new interoperability standard unifying smart home ecosystems',
      'A low-power wireless mesh protocol for smart home and IoT devices',
      'Environmental, Social, and Governance - criteria for assessing corporate sustainability',
    ],
    correctAnswer: 0,
    explanation:
      'Heat networks (district heating) distribute heat generated centrally to residential and commercial buildings through a network of insulated pipes.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 169,
    question: 'What is modern methods of construction (MMC)?',
    options: [
      'Outdoor temperature below which supplementary heating is needed',
      'Off-site manufacturing and innovative construction techniques reducing waste and time',
      'Automated systems that identify operational faults and their likely causes in building systems',
      'Coefficient of Performance - ratio of heat output to electrical input',
    ],
    correctAnswer: 1,
    explanation:
      'MMC includes off-site manufacturing, modular construction, and other innovations that can improve quality, reduce waste, speed construction, and enhance sustainability.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question: 'What is retrofit in building terms?',
    options: [
      'Automatic ventilation adjustment based on occupancy or air quality sensors',
      'Required energy efficiency upgrades when extending or renovating larger buildings',
      'Upgrading existing buildings with improved insulation, heating, and technologies',
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
    ],
    correctAnswer: 2,
    explanation:
      'Retrofit means upgrading existing buildings with improved insulation, efficient heating, renewables, and smart controls to reduce energy consumption and carbon emissions.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 171,
    question: 'What is the PAS 2035 standard?',
    options: [
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'The measure of air leakage through the building fabric under pressure',
      'Cost-effective improvements to increase the energy efficiency rating',
      'A framework for domestic retrofit projects ensuring quality and risk management',
    ],
    correctAnswer: 3,
    explanation:
      'PAS 2035 is the overarching framework for domestic retrofit, requiring holistic assessment, appropriate measures, and coordination to ensure quality and avoid unintended consequences.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 172,
    question: 'What is fuel poverty?',
    options: [
      'When a household cannot afford to adequately heat their home',
      'A unit of energy equal to using 1000 watts for one hour',
      'Installing capacitors to counteract inductive reactive power',
      'Independent body advising UK government on emissions targets and progress',
    ],
    correctAnswer: 0,
    explanation:
      "Fuel poverty occurs when a household's fuel costs are above average and spending that amount would leave them below the poverty line.",
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 173,
    question: 'What is the ECO scheme?',
    options: [
      'Required energy efficiency upgrades when extending or renovating larger buildings',
      'Energy Company Obligation - requiring energy suppliers to fund energy efficiency improvements',
      'Digital Addressable Lighting Interface - a protocol for digital lighting control',
      'A building designed to ultra-low energy standards with minimal heating demand',
    ],
    correctAnswer: 1,
    explanation:
      'ECO (Energy Company Obligation) requires large energy suppliers to fund energy efficiency improvements in qualifying households, particularly those in fuel poverty.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'What is the Great British Insulation Scheme?',
    options: [
      'Coefficient of Performance - ratio of heat output to electrical input',
      'The measure of air leakage through the building fabric under pressure',
      'A government scheme providing insulation grants to improve energy efficiency',
      'Direct emissions (1), indirect from purchased energy (2), and value chain emissions (3)',
    ],
    correctAnswer: 2,
    explanation:
      'The Great British Insulation Scheme helps households improve insulation through grants, targeting properties in lower EPC bands and fuel poor households.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 175,
    question: 'What is stranded assets risk in buildings?',
    options: [
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
      'Adjusting energy consumption patterns in response to grid signals or time-of-use tariffs',
      'Below about 55°C (return temperature below dew point ~54°C)',
      'Risk that buildings become unmarketable or devalued due to poor energy performance',
    ],
    correctAnswer: 3,
    explanation:
      'Stranded asset risk means buildings with poor energy performance may become unmarketable, unlettable, or significantly devalued as standards tighten.',
    section: '2.6',
    topic: 'Sustainability and Sustainable Working',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 2.7: Future Technologies (Questions 176-200)
  // ============================================
  {
    id: 176,
    question: 'What is Vehicle-to-Home (V2H)?',
    options: [
      'Using an EV battery to power home appliances, acting as a home battery',
      'A test to measure air leakage rate through the building envelope',
      'A visual display presenting real-time energy consumption data and trends',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
    ],
    correctAnswer: 0,
    explanation:
      'V2H allows electric vehicles to discharge power to supply a home, using the EV battery as energy storage for backup power or time-of-use optimization.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question: 'What is wireless EV charging?',
    options: [
      'Coefficient of Performance - ratio of heat output to electrical input',
      'Inductive charging transferring power without physical cable connection',
      'A reference dwelling with the same shape but meeting minimum standards, used for comparison',
      'Part P (electrical safety), Part S (EV infrastructure), and relevant equipment standards',
    ],
    correctAnswer: 1,
    explanation:
      'Wireless EV charging uses electromagnetic induction to transfer power from a pad in the ground to the vehicle without requiring a physical cable connection.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question: 'What is solid-state battery technology?',
    options: [
      'A building designed to ultra-low energy standards with minimal heating demand',
      'Using batteries to reduce maximum demand by discharging during peak consumption periods',
      'Batteries using solid electrolyte instead of liquid, offering higher energy density and safety',
      'A reference dwelling with the same shape but meeting minimum standards, used for comparison',
    ],
    correctAnswer: 2,
    explanation:
      'Solid-state batteries replace liquid electrolyte with solid material, potentially offering higher energy density, faster charging, longer life, and improved safety.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 179,
    question: 'What is green hydrogen?',
    options: [
      'Granular control, energy monitoring per fixture, and integration with building systems',
      'A device that generates electricity from hydrogen and oxygen through chemical reaction',
      'Technology that captures CO2 directly from ambient air for storage or use',
      'Hydrogen produced using renewable electricity through electrolysis of water',
    ],
    correctAnswer: 3,
    explanation:
      'Green hydrogen is produced by electrolysis of water using renewable electricity, producing hydrogen with zero carbon emissions in the production process.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 180,
    question: 'What is an electrolyser?',
    options: [
      'Equipment that uses electricity to split water into hydrogen and oxygen',
      'Convert DC electricity from panels to AC electricity for use or export',
      'Technology delivering electrical power along with data on Ethernet cables',
      'PV generates electricity; thermal heats water or air',
    ],
    correctAnswer: 0,
    explanation:
      'An electrolyser uses electricity to split water (H2O) into hydrogen and oxygen through electrolysis. When powered by renewables, it produces green hydrogen.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 181,
    question: 'What is a fuel cell?',
    options: [
      'Average efficiency of a heat pump over an entire heating season',
      'A device that generates electricity from hydrogen and oxygen through chemical reaction',
      'Microgeneration Certification Scheme - required for installer competence and grant eligibility',
      'A building designed to ultra-low energy standards with minimal heating demand',
    ],
    correctAnswer: 1,
    explanation:
      'A fuel cell generates electricity through chemical reaction between hydrogen and oxygen, producing only water as a byproduct. Used in vehicles and buildings.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 182,
    question: 'What is carbon capture and storage (CCS)?',
    options: [
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'Maximum Power Point Tracking - optimising power extraction from panels',
      'Capturing CO2 emissions and storing them underground to prevent atmospheric release',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
    ],
    correctAnswer: 2,
    explanation:
      'CCS captures CO2 from industrial processes or power generation and stores it permanently underground in geological formations to prevent atmospheric release.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question: 'What is direct air capture (DAC)?',
    options: [
      'Charging for the most power used in a billing period, not just total consumption',
      'Evaluating environmental impacts throughout a product\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s life from raw materials to disposal',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'Technology that captures CO2 directly from ambient air for storage or use',
    ],
    correctAnswer: 3,
    explanation:
      'Direct air capture extracts CO2 directly from ambient air using chemical processes, which can then be stored permanently or used in various applications.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 184,
    question: 'What is building-integrated photovoltaics (BIPV)?',
    options: [
      'Solar cells integrated into building materials like roof tiles, facades, or windows',
      'A low-power wireless mesh protocol for smart home and IoT devices',
      'Granular control, energy monitoring per fixture, and integration with building systems',
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
    ],
    correctAnswer: 0,
    explanation:
      'BIPV integrates photovoltaic materials into building components like roof tiles, facades, or glazing, generating electricity while serving as construction material.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'What is a smart grid?',
    options: [
      'An internet-connected sensor that collects and transmits data about building conditions',
      'An electricity network using digital technology to optimise generation, distribution, and consumption',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      '75% of fixed lighting outlets must have efficient fittings (typically LED)',
    ],
    correctAnswer: 1,
    explanation:
      'A smart grid uses digital communication and control technology to manage electricity flow, integrate renewables, enable demand response, and improve efficiency.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 186,
    question: 'What is grid-scale battery storage?',
    options: [
      'EPC is based on calculated/design performance; DEC shows actual measured energy use',
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'Large battery installations storing electricity to balance grid supply and demand',
      'LED lighting that can adjust colour temperature from warm to cool white',
    ],
    correctAnswer: 2,
    explanation:
      'Grid-scale battery storage involves large installations (often tens of MW) that store electricity to balance supply and demand, support renewables, and provide grid services.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 187,
    question: 'What is pumped hydro storage?',
    options: [
      'The calculated annual CO2 emissions from the actual dwelling design',
      'Automatically dimming artificial lighting in response to available natural light',
      'Electricity consumed by devices when switched off but still plugged in',
      'Storing energy by pumping water uphill, then releasing it through turbines when needed',
    ],
    correctAnswer: 3,
    explanation:
      'Pumped hydro stores energy by pumping water to an upper reservoir when electricity is cheap/plentiful, then releasing it through turbines to generate power when needed.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 188,
    question: 'What is a virtual power plant (VPP)?',
    options: [
      'Aggregated distributed energy resources acting together as a single power plant',
      'Financial penalties up to £150,000 for non-domestic properties',
      'Risk that buildings become unmarketable or devalued due to poor energy performance',
      'A rating system for actual operational energy performance of commercial buildings',
    ],
    correctAnswer: 0,
    explanation:
      'A VPP aggregates multiple distributed energy resources (batteries, EVs, solar, flexible loads) to function together as a single dispatchable resource for grid services.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 189,
    question: 'What is peer-to-peer energy trading?',
    options: [
      'A device that generates electricity from hydrogen and oxygen through chemical reaction',
      'Direct energy trading between producers and consumers without traditional utilities',
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'Mono is more efficient and black in appearance; poly is slightly less efficient and blue-ish',
    ],
    correctAnswer: 1,
    explanation:
      'Peer-to-peer energy trading allows prosumers (producer-consumers) to sell excess energy directly to neighbours or other consumers, often enabled by blockchain.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 190,
    question: 'What is blockchain in energy applications?',
    options: [
      'The CO2 emission rate the building must achieve, based on the notional dwelling',
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
      'Distributed ledger technology enabling transparent, secure energy transactions and trading',
      'Areas where heat transfers more easily through the building envelope due to breaks in insulation',
    ],
    correctAnswer: 2,
    explanation:
      'Blockchain in energy enables transparent, secure recording of energy transactions, supporting peer-to-peer trading, renewable certificates, and grid management.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 191,
    question: 'What is artificial intelligence (AI) in building management?',
    options: [
      'Automated systems that identify operational faults and their likely causes in building systems',
      'A heat pump extracting heat from the ground via buried pipes or boreholes',
      'Equipment for charging electric vehicle batteries from the electrical supply',
      'Using machine learning to optimise building operations, predict faults, and improve efficiency',
    ],
    correctAnswer: 3,
    explanation:
      'AI in buildings uses machine learning to analyse data, predict energy consumption, optimise HVAC operation, detect faults, and continuously improve efficiency.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: 'What is predictive energy management?',
    options: [
      'Using AI and data to predict and optimise future energy consumption patterns',
      '17 UN global goals addressing economic, social, and environmental challenges by 2030',
      'Mandatory energy audit for large UK organisations every 4 years',
      'Monitoring CO2, humidity, VOCs, and particulates to ensure healthy indoor environments',
    ],
    correctAnswer: 0,
    explanation:
      'Predictive energy management uses AI to forecast energy demand, weather impacts, and occupancy to proactively optimise building systems for efficiency and comfort.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'What is thermal energy storage (TES)?',
    options: [
      'Direct emissions (1), indirect from purchased energy (2), and value chain emissions (3)',
      'Storing energy as heat or cold for later use in heating or cooling systems',
      'Combined Heat and Power system that generates both electricity and useful heat',
      'A preset combination of light levels and colours for different activities or moods',
    ],
    correctAnswer: 1,
    explanation:
      'TES stores energy in the form of heat (hot water tanks, ice storage, phase change materials) for later use, enabling load shifting and renewable integration.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 194,
    question: 'What is a phase change material (PCM)?',
    options: [
      'Systematic assessment of energy use to identify savings opportunities',
      'A device showing real-time energy usage and costs from the smart meter',
      'A material that absorbs/releases heat when changing state (solid/liquid), storing thermal energy',
      'A preset combination of light levels and colours for different activities or moods',
    ],
    correctAnswer: 2,
    explanation:
      'PCMs store and release thermal energy during phase transitions (typically solid-liquid), used for temperature regulation and thermal storage in buildings.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 195,
    question: 'What is dynamic glazing?',
    options: [
      'When a solar system continues to power a circuit that has been disconnected from the grid',
      'A transformer providing simple separation between the AC and DC sides, OR an RCD type B on the AC side',
      'Systematic assessment of energy use to identify savings opportunities',
      'Glass that can change its light/heat transmission properties electronically or automatically',
    ],
    correctAnswer: 3,
    explanation:
      'Dynamic (smart) glazing can change its transparency, solar heat gain, or tint in response to electrical signals, light levels, or temperature to optimise comfort and energy.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: 'What is electrochromic glass?',
    options: [
      'Glass that changes tint when voltage is applied, controlling light and heat transmission',
      'EPC is based on calculated/design performance; DEC shows actual measured energy use',
      'Storing energy as heat or cold for later use in heating or cooling systems',
      'A building designed to ultra-low energy standards with minimal heating demand',
    ],
    correctAnswer: 0,
    explanation:
      'Electrochromic glass can be electrically switched between transparent and tinted states, enabling dynamic control of daylight, glare, and solar heat gain.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 197,
    question: 'What is a positive energy building?',
    options: [
      'Automatic control of building services like HVAC, lighting, and security',
      'A building that generates more energy than it consumes over a year',
      'Convert DC electricity from panels to AC electricity for use or export',
      'Aggregated distributed energy resources acting together as a single power plant',
    ],
    correctAnswer: 1,
    explanation:
      'A positive energy building produces more energy than it consumes annually, typically through high efficiency and extensive on-site renewable generation.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },
  {
    id: 198,
    question: 'What is the Internet of Things (IoT) in buildings?',
    options: [
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'Cost-effective improvements to increase the energy efficiency rating',
      'Network of connected sensors and devices enabling data collection and automated control',
      'Building Information Modelling - digital representation with data about building elements',
    ],
    correctAnswer: 2,
    explanation:
      'IoT in buildings connects sensors, meters, and devices to networks, enabling data collection, analysis, and automated control for optimised building performance.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'basic',
  },
  {
    id: 199,
    question: 'What is energy disaggregation?',
    options: [
      'Off-site manufacturing and innovative construction techniques reducing waste and time',
      'Charging for the most power used in a billing period, not just total consumption',
      'The measure of air leakage through the building fabric under pressure',
      'Using AI to identify individual appliance consumption from whole-building smart meter data',
    ],
    correctAnswer: 3,
    explanation:
      'Energy disaggregation (NILM) uses machine learning to analyse total electricity consumption and identify individual appliance usage without sub-metering.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'advanced',
  },
  {
    id: 200,
    question: 'What are digital twins being used for in buildings?',
    options: [
      'Real-time monitoring, simulation, optimisation, and predictive maintenance',
      'Making misleading claims about environmental benefits to appear more sustainable',
      'The measure of air leakage through the building fabric under pressure',
      'A heat pump that extracts heat from outside air and transfers it indoors',
    ],
    correctAnswer: 0,
    explanation:
      'Building digital twins integrate real-time data for monitoring, enable simulation of changes, optimise operations, and support predictive maintenance and lifecycle management.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 2.8: BS 7671 Special Locations (Questions 201-225)
  // ============================================
  {
    id: 201,
    question: 'Under BS 7671 Section 712, what is the maximum DC string voltage permitted for domestic PV systems?',
    options: [
      '1500 V DC',
      '1000 V DC',
      '600 V DC',
      '230 V DC',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 712 (Solar PV) limits DC voltage to 1000 V DC for residential applications. Higher voltage strings (up to 1500 V) are permitted only in commercial installations subject to additional protective measures.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 202,
    question: 'Under BS 7671 Reg 712.411.3.2.1.2, where the inverter does not provide simple separation, what additional protective measure is required?',
    options: [
      'Charging for the most power used in a billing period, not just total consumption',
      'Monitoring CO2, humidity, VOCs, and particulates to ensure healthy indoor environments',
      'A transformer providing simple separation between the AC and DC sides, OR an RCD type B on the AC side',
      'Distributing available power across multiple charge points to prevent overload',
    ],
    correctAnswer: 2,
    explanation:
      'Section 712 requires that PV inverters either provide simple separation themselves or have a transformer or Type B RCD on the AC side, because non-isolated (transformerless) inverters can produce smooth DC fault current that defeats Type AC and A RCDs.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 203,
    question: 'Under BS 7671 Section 722 (EV charging), what does Reg 722.411.4 require for a PEN-conductor fault detection on a TN-C-S supply?',
    options: [
      'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
      'COP = instant ratio of heat output to electrical input at a single test point; SCOP = seasonal average across realistic operating conditions in a defined climate — SCOP is what determines real-world running cost',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
    ],
    correctAnswer: 3,
    explanation:
      'Section 722 addresses the risk of an open PEN making the vehicle\'s exposed-conductive-parts live. Reg 722.411.4 requires an earth electrode, a 5-second disconnection device, or integrated O-PEN protection (as offered by most modern EVCPs).',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 204,
    question: 'Under BS 7671 Reg 722.531.3.101, what RCD type is required for an EV charging point unless the equipment provides equivalent protection?',
    options: [
      'Type B (or Type A combined with appropriate residual DC monitoring)',
      '75% of fixed lighting outlets must have efficient fittings (typically LED)',
      'A framework for domestic retrofit projects ensuring quality and risk management',
      'A system minimising waste by reusing, recycling, and regenerating materials',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 722.531.3.101 requires Type B RCD protection for EV charging because EV inverters can produce smooth DC residual currents that blind Type A and AC RCDs. A Type A RCD with separate DC residual monitoring (≥ 6 mA) in the EVSE is the common alternative.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 205,
    question: 'BS 7671 Section 753 covers heating cables and embedded heating systems. What is the maximum permitted touch temperature for accessible surfaces of an underfloor heating system?',
    options: [
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
      '35°C generally for floors regularly walked on barefoot (warmer permitted in border zones)',
      'Capturing CO2 emissions and storing them underground to prevent atmospheric release',
      'Areas where heat transfers more easily through the building envelope due to breaks in insulation',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 753 with EN 60335-2-96 limits accessible floor surface temperature to about 35°C in occupied zones to prevent burns and discomfort. Border zones near walls may exceed this. RCD protection 30 mA is also required.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 206,
    question: 'For a TN-C-S (PNB) supply supplying a heat pump with an outdoor unit, what specific concern must your design address per BS 7671?',
    options: [
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'Tubes are hazardous WEEE (mercury) — segregate, store carefully, transfer under HWCN to permitted facility; ballasts are also WEEE — separate ferrous metals where possible to maximise material recovery',
      'PEN-conductor open-circuit risk to outdoor metalwork — apply Section 722-style measures: earth electrode, residual current detection, or use of a dedicated supplier-issued separate earth (TT outdoor)',
      'TN-C-S (PNB) is the British term for what was loosely called "PME" — combined Protective Earth and Neutral conductor in the supply, separated at the cut-out — A4:2026 standardises the terminology and reinforces design rules',
    ],
    correctAnswer: 2,
    explanation:
      'Outdoor heat pump units share the EV concern: an open PEN can place the casing at supply voltage. Designs typically include an earth electrode of suitable Ra, a 5-second residual disconnection device, or treat the outdoor section as TT — same logic as Reg 722.411.4.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 207,
    question: 'BS 7671 Reg 712.521.1 requires PV DC cables to be sized considering what additional factor compared with normal AC cables?',
    options: [
      'Recommended for final circuits supplying or fed from PV/battery installations to mitigate arc-fault risk on long DC and AC runs',
      'Smart functionality (default off-peak charging schedules), randomised delay function, demand-side response capability, security and data protection, and a privacy-respecting connection',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
      '125% of the module short-circuit current Isc at STC, plus voltage drop over potentially long DC runs, with cable type rated for outdoor UV exposure',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Section 712 requires DC cables to be rated for at least 1.25 × Isc to allow for irradiance overshoot and ageing, sized for voltage drop over often long DC runs, and use UV-stable, outdoor-rated double-insulated cable suitable for the environment.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 208,
    question: 'For a battery storage system (Section 8 of BS 7671), what disconnection means must be provided?',
    options: [
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      'Prevention → Preparing for re-use → Recycling → Other recovery (including energy recovery) → Disposal as last resort',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
      'Identify environmental aspects and impacts of their activities, products and services, and determine which are significant under defined criteria',
    ],
    correctAnswer: 0,
    explanation:
      'Battery installations require a DC isolator at the battery, an AC isolator at the inverter and an accessible emergency means of disconnection. BS 7671 reinforces clear labelling and locations so first responders and electricians can isolate quickly and safely.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 209,
    question: 'Under BS 7671 A4:2026, what is the new requirement around AFDDs for solar PV / battery storage circuits?',
    options: [
      'Using machine learning to optimise building operations, predict faults, and improve efficiency',
      'Recommended for final circuits supplying or fed from PV/battery installations to mitigate arc-fault risk on long DC and AC runs',
      'Building Information Modelling - digital representation with data about building elements',
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 strengthens AFDD use across higher-risk locations (HRRBs, care homes, HMOs) and recommends them on circuits associated with PV and battery storage where arc-fault risk on extended cabling exists. Designers should justify any decision not to fit AFDDs.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 210,
    question: 'Under BS 7671 Reg 712.411.4, what is the requirement around equipotential bonding of metallic PV mounting structures?',
    options: [
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
      'EVCP loads are continuous and high-utilisation — apply appropriate Cg and Ca correction factors, consider cumulative diversity for multiple chargers, and ensure final-circuit protective device rating coordinates with both EVCP rating and DNO supply capacity',
      'Where metallic mounting frames are connected to exposed-conductive-parts of Class I PV equipment, they form part of that equipment\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s earthing arrangement; otherwise, fault-loop impedance and lightning protection requirements apply',
      'Permits are required for installations carrying out specified activities like waste treatment or large combustion plant; most electrical contractors don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need one but must comply with permit conditions when working at a permitted site',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 712.411.4 and IET Solar PV Code of Practice cover earthing/bonding. Metallic frames connected to Class I equipment form part of the earthing system. Where lightning protection (BS EN 62305) is in place, equipotential bonding requirements expand.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 211,
    question: 'Under MCS MIS 3002 (PV), what minimum competence is required for the installer of a domestic solar PV system?',
    options: [
      'Within escape routes, under stairs in a single-staircase building, in habitable rooms (where avoidable), in roof spaces (where heat/cold extremes apply) or close to gas meters',
      'Extended Producer Responsibility (EPR) for packaging — producers and brand-owners pay the full net cost of managing the household packaging they place on the market, with reporting from 2024',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
      'The installation business must hold MCS PV certification, with at least one Suitably Qualified Person trained to MIS 3002 and the underpinning electrical qualifications',
    ],
    correctAnswer: 3,
    explanation:
      'MCS MIS 3002 sets installer requirements for PV. The business must be MCS-certified for PV, employ a Suitably Qualified Person with appropriate training (typically C&G 2399 PV plus underpinning electrical qualifications), and follow the MCS installation standards.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 212,
    question: 'Under MCS MIS 3005 (heat pumps), what design output calculation must installers follow?',
    options: [
      'A heat loss calculation to BS EN 12831 (or equivalent) for the property, sized to meet the design heat load at the design external temperature, with emitter sizing for low flow temperatures',
      '125% of the module short-circuit current Isc at STC, plus voltage drop over potentially long DC runs, with cable type rated for outdoor UV exposure',
      'New schedule columns capture EV-specific data including PEN-fault detection method, RCD type, charge-point rating and special-location considerations — supporting accurate dutyholder records',
      'The installation business must hold MCS PV certification, with at least one Suitably Qualified Person trained to MIS 3002 and the underpinning electrical qualifications',
    ],
    correctAnswer: 0,
    explanation:
      'MIS 3005 requires a property-specific heat loss calculation to BS EN 12831, sizing the heat pump for the design heat load at the design external temperature. Emitters (radiators, UFH) are sized for low flow temperatures (typically 35-45°C) to maintain SCOP.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 213,
    question: 'F-Gas Regulation (EU/UK 517/2014 retained) restricts who can do what work on heat pump refrigerant circuits?',
    options: [
      'The official register of MCS-certified installations, generating the MCS Certificate that consumers need to claim Smart Export Guarantee, Boiler Upgrade Scheme grants and other incentives',
      'Only F-Gas-certified personnel may install, maintain, decommission or do leak checks on equipment containing fluorinated greenhouse gas refrigerants — electricians without F-Gas certification can only do the electrical work',
      'Permits are required for installations carrying out specified activities like waste treatment or large combustion plant; most electrical contractors don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need one but must comply with permit conditions when working at a permitted site',
      'The installation business must hold MCS PV certification, with at least one Suitably Qualified Person trained to MIS 3002 and the underpinning electrical qualifications',
    ],
    correctAnswer: 1,
    explanation:
      'The F-Gas Regulation restricts work on systems containing fluorinated refrigerants to F-Gas-certified personnel and companies. Electricians can do the electrical interconnection but must NOT break into refrigerant pipework — that requires F-Gas certification and a registered company.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 214,
    question: 'Under ENA EREC G98, what is the maximum capacity for a single-phase generator (e.g. small PV) connected to the public network without prior approval?',
    options: [
      'Risk that buildings become unmarketable or devalued due to poor energy performance',
      'Wind speed, turbulence, obstacles, planning permission, and grid connection',
      '16 A per phase (≈3.68 kW single-phase, ≈11 kW three-phase) — installer notifies the DNO after commissioning',
      'A building that produces zero net carbon emissions over a year through efficiency and renewables',
    ],
    correctAnswer: 2,
    explanation:
      'G98 covers "fit and inform" — small generators up to 16 A per phase (around 3.68 kW single-phase, 11 kW three-phase) using EREC G98-listed equipment can be installed and the DNO notified within 28 days. Above this, EREC G99 prior approval is required.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 215,
    question: 'Under ENA EREC G99, what process must be followed for connecting a generator above the G98 thresholds?',
    options: [
      'Segregate WEEE from general waste, store in suitable conditions, transfer only to authorised facilities under a Waste Transfer Note, and keep records for at least 2 years',
      'A DC isolator must be provided at each PV array adjacent to the inverter, suitable for switching DC under load and clearly identified for rapid emergency disconnection',
      'Smart functionality (default off-peak charging schedules), randomised delay function, demand-side response capability, security and data protection, and a privacy-respecting connection',
      'Submit a G99 application to the DNO BEFORE installation, providing system details and protection settings — DNO assesses network impact, may require modifications, and approval must be received before energisation',
    ],
    correctAnswer: 3,
    explanation:
      'G99 is "apply and connect" — for generators above G98 limits the installer must apply to the DNO before installation. The DNO assesses network impact, defines protection settings, and may require reinforcement. The installation must not energise until approval is received.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 216,
    question: 'For a heat pump system, what is the difference between COP and SCOP and which should the customer focus on?',
    options: [
      'COP = instant ratio of heat output to electrical input at a single test point; SCOP = seasonal average across realistic operating conditions in a defined climate — SCOP is what determines real-world running cost',
      'Only F-Gas-certified personnel may install, maintain, decommission or do leak checks on equipment containing fluorinated greenhouse gas refrigerants — electricians without F-Gas certification can only do the electrical work',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'Failure to manage WEEE (mercury-containing tubes, refrigerants, batteries) — driving most environmental enforcement; followed by uncontrolled site discharges',
    ],
    correctAnswer: 0,
    explanation:
      'COP measures performance at a single point. SCOP (Seasonal COP) per EN 14825 averages performance across a heating season in a defined climate, and is the realistic indicator of running cost. A unit with high COP but low SCOP (e.g. due to defrost cycles) will disappoint.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 217,
    question: 'Under Building Regulations Part L 2021 (England), what is the maximum permitted flow temperature for new domestic heating systems to ensure they\'re heat-pump-ready?',
    options: [
      'A statutory five-year cap on UK emissions; public sector procurement increasingly demands suppliers report their carbon and demonstrate reduction plans aligned to Net Zero',
      '55°C maximum design flow temperature for new wet space heating systems — encouraging emitter sizing that suits low-temperature heat pumps',
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      '125% of the module short-circuit current Isc at STC, plus voltage drop over potentially long DC runs, with cable type rated for outdoor UV exposure',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 caps the maximum design flow temperature for new domestic wet heating systems at 55°C, ensuring oversized emitters or UFH so the system works efficiently with a heat pump now or in future. Existing systems can keep higher temperatures.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 218,
    question: 'Under BS 7671 Section 712, what specific consideration applies to PV DC isolators after A4:2026 update?',
    options: [
      'Scope 1 = direct emissions (vans, gas heating); Scope 2 = indirect from purchased electricity; Scope 3 = value-chain (materials, subcontractors, waste, business travel) — usually the largest',
      '125% of the module short-circuit current Isc at STC, plus voltage drop over potentially long DC runs, with cable type rated for outdoor UV exposure',
      'A DC isolator must be provided at each PV array adjacent to the inverter, suitable for switching DC under load and clearly identified for rapid emergency disconnection',
      'Part S (Infrastructure for charging electric vehicles) requires new non-residential buildings with 10+ parking spaces to provide 1 EV charge point and cable routes for 1 in 5 spaces',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 reinforces requirements around PV DC isolation — a load-rated DC isolator at the array side adjacent to the inverter, clearly identified, suitable for emergency disconnection. Modern systems may also include rapid-shutdown devices at module level.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 219,
    question: 'For a domestic battery storage installation, where in the property should the battery NOT be located per IET Code of Practice for Electrical Energy Storage Systems?',
    options: [
      'A target to reduce emissions consistent with limiting global warming to 1.5°C, set in line with the latest climate science, validated by the Science Based Targets initiative (SBTi)',
      'COP = instant ratio of heat output to electrical input at a single test point; SCOP = seasonal average across realistic operating conditions in a defined climate — SCOP is what determines real-world running cost',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
      'Within escape routes, under stairs in a single-staircase building, in habitable rooms (where avoidable), in roof spaces (where heat/cold extremes apply) or close to gas meters',
    ],
    correctAnswer: 3,
    explanation:
      'The IET Code of Practice for EESS lists location restrictions to manage thermal-runaway risk. Avoid escape routes, under stairs in single-staircase dwellings, habitable rooms where practicable, lofts (extreme temps) and proximity to gas meters or other risks.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 220,
    question: 'For an EV charging point on a domestic supply, what cable rating consideration must the designer apply?',
    options: [
      'EVCP loads are continuous and high-utilisation — apply appropriate Cg and Ca correction factors, consider cumulative diversity for multiple chargers, and ensure final-circuit protective device rating coordinates with both EVCP rating and DNO supply capacity',
      'A heat loss calculation to BS EN 12831 (or equivalent) for the property, sized to meet the design heat load at the design external temperature, with emitter sizing for low flow temperatures',
      'New schedule columns capture EV-specific data including PEN-fault detection method, RCD type, charge-point rating and special-location considerations — supporting accurate dutyholder records',
      'COP = instant ratio of heat output to electrical input at a single test point; SCOP = seasonal average across realistic operating conditions in a defined climate — SCOP is what determines real-world running cost',
    ],
    correctAnswer: 0,
    explanation:
      'EV charging is continuous high-utilisation. Designers must apply correction factors for grouping and ambient temperature, account for cumulative diversity if multiple chargers, and check the supply capacity. Many domestic supplies need DNO upgrade for 7 kW chargers.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 221,
    question: 'Under BS 7671 A4:2026, what does the introduction of TN-C-S (PNB) terminology mean?',
    options: [
      'Failure to manage WEEE (mercury-containing tubes, refrigerants, batteries) — driving most environmental enforcement; followed by uncontrolled site discharges',
      'TN-C-S (PNB) is the British term for what was loosely called "PME" — combined Protective Earth and Neutral conductor in the supply, separated at the cut-out — A4:2026 standardises the terminology and reinforces design rules',
      'Suppliers with 150,000+ domestic customers must offer at least one tariff paying small generators (PV, wind, micro-CHP, hydro, AD) for exported electricity, with a positive (>0p) per-kWh rate',
      'Within escape routes, under stairs in a single-staircase building, in habitable rooms (where avoidable), in roof spaces (where heat/cold extremes apply) or close to gas meters',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 consolidates terminology around TN-C-S (PNB) — Protective Neutral Bonding — replacing loose use of "PME". The PEN conductor is the combined neutral/earth in the supply, separated at the cut-out. Design considerations particularly affect EV/HP outdoor metalwork (open-PEN risk).',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 222,
    question: 'Under MCS, what is the role of the SAP (Standard Assessment Procedure) calculation in heat pump design?',
    options: [
      'If improvements are not cost-effective (payback over 7 years), wall insulation would damage property, or consent not obtained',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
      'PEN-conductor open-circuit risk to outdoor metalwork — apply Section 722-style measures: earth electrode, residual current detection, or use of a dedicated supplier-issued separate earth (TT outdoor)',
    ],
    correctAnswer: 2,
    explanation:
      'SAP is the energy-performance assessment methodology behind EPCs and Building Regs Part L compliance. It informs the DESIGN STAGE (e.g. whether a heat pump is appropriate) but actual SIZING for a heat pump must use a room-by-room heat-loss calc to BS EN 12831.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 223,
    question: 'For an EV charger, what does ISO 15118 (plug-and-charge) standard cover?',
    options: [
      'Around 75-80% lower CO₂ emissions than 2013 Part L, achieved through low-carbon heating (typically heat pumps) and high fabric efficiency — no fossil-fuel heating in new homes',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'Part S (Infrastructure for charging electric vehicles) requires new non-residential buildings with 10+ parking spaces to provide 1 EV charge point and cable routes for 1 in 5 spaces',
      'Vehicle-to-grid communication standard enabling automatic billing, smart charging, V2G/V2H bi-directional power flow, and secure identification — going beyond simple Mode 3 charging',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 15118 is the international standard for vehicle-to-grid communication. It supports plug-and-charge identification, smart-charging schedules, V2G/V2H bi-directional power, and is foundational to the future grid-services role of EVs.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 224,
    question: 'Under the Smart Charge Point Regulations 2021, what features must domestic and workplace EV charging points sold in GB include by default?',
    options: [
      'Smart functionality (default off-peak charging schedules), randomised delay function, demand-side response capability, security and data protection, and a privacy-respecting connection',
      'TN-C-S (PNB) is the British term for what was loosely called "PME" — combined Protective Earth and Neutral conductor in the supply, separated at the cut-out — A4:2026 standardises the terminology and reinforces design rules',
      'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
    ],
    correctAnswer: 0,
    explanation:
      'The Smart Charge Point Regulations 2021 (SCPR) require domestic/workplace EVCPs sold in GB to include smart functionality, default off-peak schedules, randomised delay (to prevent grid-shock at off-peak start), DSR capability and cyber-security minima.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 225,
    question: 'Under BS 7671 A4:2026, what new requirement applies to certificate schedules for EV charging circuits?',
    options: [
      'The official register of MCS-certified installations, generating the MCS Certificate that consumers need to claim Smart Export Guarantee, Boiler Upgrade Scheme grants and other incentives',
      'New schedule columns capture EV-specific data including PEN-fault detection method, RCD type, charge-point rating and special-location considerations — supporting accurate dutyholder records',
      'Only F-Gas-certified personnel may install, maintain, decommission or do leak checks on equipment containing fluorinated greenhouse gas refrigerants — electricians without F-Gas certification can only do the electrical work',
      'Within escape routes, under stairs in a single-staircase building, in habitable rooms (where avoidable), in roof spaces (where heat/cold extremes apply) or close to gas meters',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 introduces additional certificate schedule columns to capture EV-specific design and protection data — PEN-fault detection method, RCD type fitted, EVCP rated current and applicable special-location data. These support competent ongoing management.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 2.9: F-Gas, WEEE and Sustainable Working (Questions 226-250)
  // ============================================
  {
    id: 226,
    question: 'Under the WEEE Regulations 2013 (UK retained), what duties does an electrical contractor have when removing old electrical equipment?',
    options: [
      'Failure to manage WEEE (mercury-containing tubes, refrigerants, batteries) — driving most environmental enforcement; followed by uncontrolled site discharges',
      '125% of the module short-circuit current Isc at STC, plus voltage drop over potentially long DC runs, with cable type rated for outdoor UV exposure',
      'Segregate WEEE from general waste, store in suitable conditions, transfer only to authorised facilities under a Waste Transfer Note, and keep records for at least 2 years',
      'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
    ],
    correctAnswer: 2,
    explanation:
      'WEEE Regulations 2013 require segregation, suitable storage, transfer only to authorised treatment facilities, completion of Waste Transfer Notes (or Hazardous Waste Consignment Notes for hazardous WEEE), and record-keeping for 2 years (3 for hazardous).',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 227,
    question: 'Under the Hazardous Waste Regulations 2005, what is required when removing fluorescent tubes containing mercury?',
    options: [
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'Identify environmental aspects and impacts of their activities, products and services, and determine which are significant under defined criteria',
      'Tubes are hazardous WEEE (mercury) — segregate, store carefully, transfer under HWCN to permitted facility; ballasts are also WEEE — separate ferrous metals where possible to maximise material recovery',
      'Treat as hazardous waste, store in suitable rigid containers protected from breakage, transfer to a permitted facility under a Hazardous Waste Consignment Note, retain records for 3 years',
    ],
    correctAnswer: 3,
    explanation:
      'Fluorescent tubes are hazardous waste due to mercury content. They must be stored intact in rigid containers, transferred to a permitted facility under a Hazardous Waste Consignment Note (HWCN), and records retained for 3 years.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 228,
    question: 'Under the F-Gas Regulation, what leak-checking frequency applies to a heat pump containing 5 tonnes CO₂-equivalent of refrigerant?',
    options: [
      'Annual leak check by F-Gas-certified personnel where charge ≥ 5 tonnes CO₂e, or every 2 years where charge < 5 tonnes; frequencies double if a leak detection system is installed and operational',
      'COP = instant ratio of heat output to electrical input at a single test point; SCOP = seasonal average across realistic operating conditions in a defined climate — SCOP is what determines real-world running cost',
      'Segregate WEEE from general waste, store in suitable conditions, transfer only to authorised facilities under a Waste Transfer Note, and keep records for at least 2 years',
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
    ],
    correctAnswer: 0,
    explanation:
      'F-Gas leak-check frequencies are tied to CO₂-equivalent charge size. ≥ 5 tCO₂e: annual; ≥ 50 tCO₂e: 6-monthly; ≥ 500 tCO₂e: 3-monthly. Frequencies double where a fixed leak detection system is in place. All checks must be done by F-Gas-certified personnel.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 229,
    question: 'Under the GHG Protocol, what are Scope 1, 2 and 3 emissions for an electrical contractor?',
    options: [
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'Scope 1 = direct emissions (vans, gas heating); Scope 2 = indirect from purchased electricity; Scope 3 = value-chain (materials, subcontractors, waste, business travel) — usually the largest',
      '55°C maximum design flow temperature for new wet space heating systems — encouraging emitter sizing that suits low-temperature heat pumps',
      'Lithium batteries are hazardous waste (and class 9 dangerous goods); the design should consider take-back arrangements with the manufacturer/supplier, ease of safe removal, and clear labelling for first responders and end-of-life handlers',
    ],
    correctAnswer: 1,
    explanation:
      'The GHG Protocol classifies emissions: Scope 1 (direct from owned assets), Scope 2 (purchased electricity/heat/steam), Scope 3 (everything else in the value chain — materials, subcontractors, transport, waste, business travel). Scope 3 is usually the largest and the hardest to measure.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 230,
    question: 'For an installer aiming to reduce Scope 3 emissions on a project, what is the most effective practice?',
    options: [
      'Treat as hazardous waste, store in suitable rigid containers protected from breakage, transfer to a permitted facility under a Hazardous Waste Consignment Note, retain records for 3 years',
      'Vehicle-to-grid communication standard enabling automatic billing, smart charging, V2G/V2H bi-directional power flow, and secure identification — going beyond simple Mode 3 charging',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Scope 3 reductions come from materials and logistics choices: specify lower embodied-carbon products, design for prefabrication, optimise transport routes, source locally, segregate waste for recycling and reuse. These also typically reduce cost.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 231,
    question: 'Under the Environment Act 2021, what new producer responsibility applies to packaging waste?',
    options: [
      'A target to reduce emissions consistent with limiting global warming to 1.5°C, set in line with the latest climate science, validated by the Science Based Targets initiative (SBTi)',
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      'Extended Producer Responsibility (EPR) for packaging — producers and brand-owners pay the full net cost of managing the household packaging they place on the market, with reporting from 2024',
    ],
    correctAnswer: 3,
    explanation:
      'The Environment Act 2021 introduces Extended Producer Responsibility for packaging. Producers and brand-owners pay full net cost of managing household packaging via Defra-defined fees, with reporting from 2024 and full cost recovery rolling in over subsequent years.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 232,
    question: 'Under ISO 14001 (environmental management systems), what is the first step a contractor must take?',
    options: [
      'Identify environmental aspects and impacts of their activities, products and services, and determine which are significant under defined criteria',
      'Packaging must be minimised to satisfy required function, designed for recovery (reuse, recycling, energy or composting), and contain only restricted levels of heavy metals',
      'Smart functionality (default off-peak charging schedules), randomised delay function, demand-side response capability, security and data protection, and a privacy-respecting connection',
      'If improvements are not cost-effective (payback over 7 years), wall insulation would damage property, or consent not obtained',
    ],
    correctAnswer: 0,
    explanation:
      'ISO 14001 starts with identifying environmental aspects (how the organisation interacts with the environment) and impacts (the resulting changes — positive or negative). The organisation then determines which are "significant" using defined criteria, and plans controls.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 233,
    question: 'Under the Climate Change Act 2008 (as amended 2019), what is the UK\'s legally binding emissions target?',
    options: [
      'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'New schedule columns capture EV-specific data including PEN-fault detection method, RCD type, charge-point rating and special-location considerations — supporting accurate dutyholder records',
      '125% of the module short-circuit current Isc at STC, plus voltage drop over potentially long DC runs, with cable type rated for outdoor UV exposure',
    ],
    correctAnswer: 1,
    explanation:
      'The Climate Change Act 2008 was amended in 2019 to commit the UK to Net Zero greenhouse gas emissions by 2050. The Climate Change Committee sets and reports against five-yearly carbon budgets — currently CB6 covers 2033-2037.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 234,
    question: 'Under the Pollution Prevention and Control regime, what is a permit and when does an electrical contractor need one?',
    options: [
      'Where metallic mounting frames are connected to exposed-conductive-parts of Class I PV equipment, they form part of that equipment\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s earthing arrangement; otherwise, fault-loop impedance and lightning protection requirements apply',
      'EVCP loads are continuous and high-utilisation — apply appropriate Cg and Ca correction factors, consider cumulative diversity for multiple chargers, and ensure final-circuit protective device rating coordinates with both EVCP rating and DNO supply capacity',
      'Permits are required for installations carrying out specified activities like waste treatment or large combustion plant; most electrical contractors don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need one but must comply with permit conditions when working at a permitted site',
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental Permitting Regulations require permits for specified industrial activities (waste treatment, large combustion plant, intensive farming). Electrical contractors working at permitted sites must comply with the permit\'s emission and operating conditions during their work.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 235,
    question: 'Under the Control of Pollution (Oil Storage) Regulations, what containment is required for diesel storage on site?',
    options: [
      'A DC isolator must be provided at each PV array adjacent to the inverter, suitable for switching DC under load and clearly identified for rapid emergency disconnection',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'Secondary containment (bund) sized for 110% of the largest container or 25% of total stored, whichever is greater, with no drainage outlet — preventing spills reaching watercourses or soakaways',
    ],
    correctAnswer: 3,
    explanation:
      'COPR (Oil Storage) Regulations 2001 require secondary containment for any oil store over 200 litres on industrial premises. The bund must hold at least 110% of the largest container or 25% of the total, with no drainage outlet that bypasses containment.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 236,
    question: 'When a heat pump containing R32 refrigerant reaches end of life, what disposal route is mandatory?',
    options: [
      'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'Identify environmental aspects and impacts of their activities, products and services, and determine which are significant under defined criteria',
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
    ],
    correctAnswer: 0,
    explanation:
      'Both F-Gas and WEEE apply at end of life. The refrigerant MUST be recovered by an F-Gas-certified technician (venting is a criminal offence). The equipment then enters the WEEE chain — taken to an authorised treatment facility for materials recovery.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 237,
    question: 'Under the Waste (England and Wales) Regulations 2011, what is the waste hierarchy you must apply?',
    options: [
      'Standard Assessment Procedure - the methodology for calculating dwelling energy performance',
      'Prevention → Preparing for re-use → Recycling → Other recovery (including energy recovery) → Disposal as last resort',
      'Network of connected sensors and devices enabling data collection and automated control',
      'Evaluating environmental impacts throughout a product\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s life from raw materials to disposal',
    ],
    correctAnswer: 1,
    explanation:
      'The waste hierarchy under the 2011 Regulations is mandatory: prevent waste first, then prepare for re-use, then recycle, then recover (e.g. energy from waste), with disposal (landfill) only as last resort. Documented justification is required to skip down.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 238,
    question: 'On a project to retrofit LED lighting, what is the right approach to the existing fluorescent tubes and ballasts?',
    options: [
      'A heat loss calculation to BS EN 12831 (or equivalent) for the property, sized to meet the design heat load at the design external temperature, with emitter sizing for low flow temperatures',
      'TN-C-S (PNB) is the British term for what was loosely called "PME" — combined Protective Earth and Neutral conductor in the supply, separated at the cut-out — A4:2026 standardises the terminology and reinforces design rules',
      'Tubes are hazardous WEEE (mercury) — segregate, store carefully, transfer under HWCN to permitted facility; ballasts are also WEEE — separate ferrous metals where possible to maximise material recovery',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
    ],
    correctAnswer: 2,
    explanation:
      'The retrofit creates significant WEEE/hazardous waste. Fluorescent tubes go via Hazardous Waste route (HWCN, permitted facility, 3-year records). Ballasts and luminaires are WEEE — separate ferrous and non-ferrous to maximise recovery via authorised facilities.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 239,
    question: 'Under the Climate Change Act, what is a Carbon Budget and why does it matter to a contractor bidding for public work?',
    options: [
      'The installation business must hold MCS PV certification, with at least one Suitably Qualified Person trained to MIS 3002 and the underpinning electrical qualifications',
      'Recommended for final circuits supplying or fed from PV/battery installations to mitigate arc-fault risk on long DC and AC runs',
      'Segregate WEEE from general waste, store in suitable conditions, transfer only to authorised facilities under a Waste Transfer Note, and keep records for at least 2 years',
      'A statutory five-year cap on UK emissions; public sector procurement increasingly demands suppliers report their carbon and demonstrate reduction plans aligned to Net Zero',
    ],
    correctAnswer: 3,
    explanation:
      'Carbon Budgets (CB1 through CB6) are statutory five-year caps on UK emissions set under the Climate Change Act. Public-sector procurement (PPN 06/21 in central government) increasingly requires suppliers to report carbon and have credible reduction plans.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 240,
    question: 'For an EV charging installation in a public car park, what specific Building Regulations Part S requirement applies?',
    options: [
      'Part S (Infrastructure for charging electric vehicles) requires new non-residential buildings with 10+ parking spaces to provide 1 EV charge point and cable routes for 1 in 5 spaces',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
    ],
    correctAnswer: 0,
    explanation:
      'Part S (introduced June 2022) requires new non-residential buildings with more than 10 parking spaces to provide at least one EV charge point and cable routes ("ducting") for one in five spaces. Major renovations have similar requirements scaled to project size.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 241,
    question: 'Under Building Regulations Part L 2021 (England), what is the Future Homes Standard target for new homes from 2025?',
    options: [
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
      'Around 75-80% lower CO₂ emissions than 2013 Part L, achieved through low-carbon heating (typically heat pumps) and high fabric efficiency — no fossil-fuel heating in new homes',
      'Annual leak check by F-Gas-certified personnel where charge ≥ 5 tonnes CO₂e, or every 2 years where charge < 5 tonnes; frequencies double if a leak detection system is installed and operational',
      'Secondary containment (bund) sized for 110% of the largest container or 25% of total stored, whichever is greater, with no drainage outlet — preventing spills reaching watercourses or soakaways',
    ],
    correctAnswer: 1,
    explanation:
      'The Future Homes Standard (from 2025) targets approximately 75-80% lower CO₂ emissions than 2013 Part L, primarily through low-carbon heating (heat pumps), high fabric efficiency, and zero direct fossil-fuel heating in new homes. The 2021 amendment is the interim step.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 242,
    question: 'Under MCS, what is the MCS Installation Database (MID) and why does it matter to the consumer?',
    options: [
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      'Extended Producer Responsibility (EPR) for packaging — producers and brand-owners pay the full net cost of managing the household packaging they place on the market, with reporting from 2024',
      'The official register of MCS-certified installations, generating the MCS Certificate that consumers need to claim Smart Export Guarantee, Boiler Upgrade Scheme grants and other incentives',
      'Treat as hazardous waste, store in suitable rigid containers protected from breakage, transfer to a permitted facility under a Hazardous Waste Consignment Note, retain records for 3 years',
    ],
    correctAnswer: 2,
    explanation:
      'The MCS Installation Database (MID) is the official register. The MCS Certificate it generates is the gateway to incentives — Smart Export Guarantee for PV, Boiler Upgrade Scheme for heat pumps, ECO funding etc. Without MID registration the consumer can\'t claim.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 243,
    question: 'Under the Smart Export Guarantee (SEG), what obligation does a licensed electricity supplier have?',
    options: [
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
      'Suppliers with 150,000+ domestic customers must offer at least one tariff paying small generators (PV, wind, micro-CHP, hydro, AD) for exported electricity, with a positive (>0p) per-kWh rate',
    ],
    correctAnswer: 3,
    explanation:
      'The Smart Export Guarantee (introduced 2020) requires licensed suppliers with 150,000+ domestic customers to offer at least one SEG tariff to small generators (≤5MW). The rate must be positive per kWh — replacing the old Feed-in Tariff for new installations.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 244,
    question: 'Under MCS MIS 3005, what handover documentation must the customer receive after a heat pump installation?',
    options: [
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
      'Where metallic mounting frames are connected to exposed-conductive-parts of Class I PV equipment, they form part of that equipment\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s earthing arrangement; otherwise, fault-loop impedance and lightning protection requirements apply',
      'Public-sector procurement, larger commercial clients and lenders increasingly require credible carbon reporting, MCS competence and waste-hierarchy compliance — without these you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re locked out of growing markets like heat pumps, EV, PV and battery',
      'EVCP loads are continuous and high-utilisation — apply appropriate Cg and Ca correction factors, consider cumulative diversity for multiple chargers, and ensure final-circuit protective device rating coordinates with both EVCP rating and DNO supply capacity',
    ],
    correctAnswer: 0,
    explanation:
      'MIS 3005 handover includes: MCS Certificate, commissioning records (refrigerant charge, flow temperatures, performance), heat-loss calculation, system schematic, controls programming, maintenance instructions, and Building Regs notification (e.g. via competent person scheme).',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 245,
    question: 'The HSE prosecution statistics consistently show what root cause behind environmental enforcement against electrical contractors?',
    options: [
      'Recommended for final circuits supplying or fed from PV/battery installations to mitigate arc-fault risk on long DC and AC runs',
      'Failure to manage WEEE (mercury-containing tubes, refrigerants, batteries) — driving most environmental enforcement; followed by uncontrolled site discharges',
      'If improvements are not cost-effective (payback over 7 years), wall insulation would damage property, or consent not obtained',
      'A statutory five-year cap on UK emissions; public sector procurement increasingly demands suppliers report their carbon and demonstrate reduction plans aligned to Net Zero',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental enforcement against electrical contractors typically arises from WEEE failures — mixed waste at landfills, mercury contamination, vented refrigerant. Site discharges (cement, oils) into drains are the next most common cause.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 246,
    question: 'Under the Packaging (Essential Requirements) Regulations 2015, what duty applies to packaging used in the supply chain?',
    options: [
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      'Secondary containment (bund) sized for 110% of the largest container or 25% of total stored, whichever is greater, with no drainage outlet — preventing spills reaching watercourses or soakaways',
      'Packaging must be minimised to satisfy required function, designed for recovery (reuse, recycling, energy or composting), and contain only restricted levels of heavy metals',
      'Tubes are hazardous WEEE (mercury) — segregate, store carefully, transfer under HWCN to permitted facility; ballasts are also WEEE — separate ferrous metals where possible to maximise material recovery',
    ],
    correctAnswer: 2,
    explanation:
      'The Packaging Regulations 2015 require packaging be minimised to needed function, designed for recovery (reuse, recycling, energy recovery, composting), and respect heavy metals limits. Producers above thresholds also fall under producer responsibility for recovery and recycling.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 247,
    question: 'For a contractor installing a battery storage system, what end-of-life consideration must be discussed at design stage?',
    options: [
      'The official register of MCS-certified installations, generating the MCS Certificate that consumers need to claim Smart Export Guarantee, Boiler Upgrade Scheme grants and other incentives',
      'A statutory five-year cap on UK emissions; public sector procurement increasingly demands suppliers report their carbon and demonstrate reduction plans aligned to Net Zero',
      'COP = instant ratio of heat output to electrical input at a single test point; SCOP = seasonal average across realistic operating conditions in a defined climate — SCOP is what determines real-world running cost',
      'Lithium batteries are hazardous waste (and class 9 dangerous goods); the design should consider take-back arrangements with the manufacturer/supplier, ease of safe removal, and clear labelling for first responders and end-of-life handlers',
    ],
    correctAnswer: 3,
    explanation:
      'Lithium batteries are hazardous waste and Class 9 dangerous goods for transport. Design-stage planning includes manufacturer take-back arrangements (under WEEE), accessibility for safe removal, clear labelling (chemistry, capacity, isolation procedure) for first responders and waste handlers.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 248,
    question: 'Under the Carbon Trust\'s Net Zero Standard, what is "Science-Based Targets" alignment?',
    options: [
      'A target to reduce emissions consistent with limiting global warming to 1.5°C, set in line with the latest climate science, validated by the Science Based Targets initiative (SBTi)',
      'Where metallic mounting frames are connected to exposed-conductive-parts of Class I PV equipment, they form part of that equipment\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s earthing arrangement; otherwise, fault-loop impedance and lightning protection requirements apply',
      'Recommended for final circuits supplying or fed from PV/battery installations to mitigate arc-fault risk on long DC and AC runs',
      'Only F-Gas-certified personnel may install, maintain, decommission or do leak checks on equipment containing fluorinated greenhouse gas refrigerants — electricians without F-Gas certification can only do the electrical work',
    ],
    correctAnswer: 0,
    explanation:
      'Science-Based Targets are emission-reduction targets aligned to the latest climate science — typically a 1.5°C trajectory. Validation by the SBTi gives credibility. Public-sector and large-business buyers increasingly require SBTi-validated targets from suppliers.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 249,
    question: 'For PV/battery installations, what cyber-security consideration is now expected per the IET Code of Practice?',
    options: [
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'Default credentials must be changed, firmware kept up to date, internet-facing components segregated where possible, and data shared with third-party platforms reviewed for privacy and security implications',
      'PEN-conductor open-circuit risk to outdoor metalwork — apply Section 722-style measures: earth electrode, residual current detection, or use of a dedicated supplier-issued separate earth (TT outdoor)',
      'Suppliers with 150,000+ domestic customers must offer at least one tariff paying small generators (PV, wind, micro-CHP, hydro, AD) for exported electricity, with a positive (>0p) per-kWh rate',
    ],
    correctAnswer: 1,
    explanation:
      'The IET Code of Practice for EESS and Smart CP Regulations both expect cyber-security minima: change default credentials, keep firmware updated, segregate internet-facing components, and review data sharing with cloud platforms for privacy and security risk.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
  {
    id: 250,
    question: 'Looking ahead, what is the main commercial driver for a small electrical contractor to invest in environmental and sustainability competence?',
    options: [
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
      'Permits are required for installations carrying out specified activities like waste treatment or large combustion plant; most electrical contractors don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need one but must comply with permit conditions when working at a permitted site',
      'Public-sector procurement, larger commercial clients and lenders increasingly require credible carbon reporting, MCS competence and waste-hierarchy compliance — without these you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re locked out of growing markets like heat pumps, EV, PV and battery',
      'Where metallic mounting frames are connected to exposed-conductive-parts of Class I PV equipment, they form part of that equipment\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s earthing arrangement; otherwise, fault-loop impedance and lightning protection requirements apply',
    ],
    correctAnswer: 2,
    explanation:
      'The commercial reality: low-carbon retrofit is the fastest-growing electrical market. Public-sector procurement, large clients and lenders demand credible carbon reporting, MCS competence and waste compliance. Contractors without these are increasingly locked out of heat pump, PV, EV and battery work.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'advanced',
  },
];

// ============================================================================
// Helper functions
// ============================================================================

const DEFAULT_WEIGHTS = { basic: 0.4, intermediate: 0.45, advanced: 0.15 };

/**
 * Get random questions weighted by difficulty.
 * Default weights: 40% basic, 45% intermediate, 15% advanced.
 */
export const getRandomQuestions = (
  count: number = 60,
  weights: { basic: number; intermediate: number; advanced: number } = DEFAULT_WEIGHTS
): QuestionBank[] => {
  const basic = module2Questions.filter((q) => q.difficulty === 'basic');
  const intermediate = module2Questions.filter((q) => q.difficulty === 'intermediate');
  const advanced = module2Questions.filter((q) => q.difficulty === 'advanced');

  const targetBasic = Math.round(count * weights.basic);
  const targetInter = Math.round(count * weights.intermediate);
  const targetAdvanced = count - targetBasic - targetInter;

  const pickFrom = (pool: QuestionBank[], n: number): QuestionBank[] => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, shuffled.length));
  };

  const selected = [
    ...pickFrom(basic, targetBasic),
    ...pickFrom(intermediate, targetInter),
    ...pickFrom(advanced, targetAdvanced),
  ];

  // If we couldn't fill (e.g. pool too small), top up from any difficulty
  if (selected.length < count) {
    const remaining = module2Questions.filter((q) => !selected.includes(q));
    const topUp = pickFrom(remaining, count - selected.length);
    selected.push(...topUp);
  }

  // Final shuffle so difficulty isn't grouped
  return selected.sort(() => Math.random() - 0.5);
};

/** Filter questions by section code (e.g. '1.1', '2.3'). */
export const getQuestionsBySection = (section: string): QuestionBank[] => {
  return module2Questions.filter((q) => q.section === section);
};

/** Filter questions by difficulty band. */
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): QuestionBank[] => {
  return module2Questions.filter((q) => q.difficulty === difficulty);
};

/** Filter questions by topic name. */
export const getQuestionsByTopic = (topic: string): QuestionBank[] => {
  return module2Questions.filter((q) => q.topic === topic);
};

/**
 * Validate the question bank for structural integrity.
 * Returns { isValid, errors[] } — used by tests/spot-checks.
 */
export const validateQuestionBank = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const seenIds = new Set<number>();

  module2Questions.forEach((q, idx) => {
    if (typeof q.id !== 'number') errors.push(`Q[${idx}]: id must be a number`);
    if (seenIds.has(q.id)) errors.push(`Q[${idx}]: duplicate id ${q.id}`);
    seenIds.add(q.id);
    if (!q.question || typeof q.question !== 'string') errors.push(`Q${q.id}: question text missing`);
    if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`Q${q.id}: options must have at least 2 entries`);
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= (q.options?.length || 0))
      errors.push(`Q${q.id}: correctAnswer index out of range`);
    if (!q.explanation || typeof q.explanation !== 'string') errors.push(`Q${q.id}: explanation missing`);
    if (!q.section || typeof q.section !== 'string') errors.push(`Q${q.id}: section missing`);
    if (!q.topic || typeof q.topic !== 'string') errors.push(`Q${q.id}: topic missing`);
    if (!['basic', 'intermediate', 'advanced'].includes(q.difficulty as string))
      errors.push(`Q${q.id}: difficulty invalid`);
  });

  return { isValid: errors.length === 0, errors };
};

export default module2Questions;
