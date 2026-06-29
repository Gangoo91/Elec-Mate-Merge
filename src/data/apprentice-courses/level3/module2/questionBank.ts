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
      'To achieve a 10% reduction in CO2 emissions for new homes compared to previous standards',
      'To make solar PV mandatory on the roof of every new dwelling',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'To phase out gas boilers immediately in all existing homes',
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
      'The total volume of air contained within a building element',
      'The proportion of daylight passing through a window',
      'The structural load-bearing capacity of a wall or floor',
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
      'Linking two heating systems together so they share a common flow temperature',
      'Areas where heat transfers more easily through the building envelope due to breaks in insulation',
      'The process of transferring heat from extract air to incoming fresh air',
      'A continuous layer of insulation that wraps unbroken around the whole building',
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
      'The rate at which fresh air is mechanically supplied to occupied rooms',
      'The proportion of a room that must be openable for natural ventilation',
      'The measure of air leakage through the building fabric under pressure',
      'The minimum number of air changes per hour required in a wet room',
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
      '25 m³/(h·m²) @ 50 Pa or better',
      '15 m³/(h·m²) @ 50 Pa or better',
      '50 m³/(h·m²) @ 50 Pa or better',
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
      'Solar Array Positioning - the method for optimising panel orientation',
      'Structural Adequacy Protocol - a check on a building\'s load-bearing capacity',
      'Site Access Permit - authorisation required before starting building work',
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
      'Calculating the structural strength of steel building frames',
      'Calculating non-domestic building energy performance',
      'Calculating domestic dwelling energy performance only',
      'Calculating the lighting design levels for a workspace',
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
      'Nitrogen oxide (NOx) emissions per unit of energy',
      'Sulphur dioxide (SO2) emissions per unit of energy',
      'Particulate matter (PM2.5) emissions per unit of energy',
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
      'Installing renewable technologies first, then upgrading insulation only if budget allows',
      'Choosing the cheapest construction materials to keep the building cost down',
      'Completing all internal finishes before the structural shell is built',
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
      'An imaginary average UK home used to set the national EPC band boundaries',
      'A show home built to demonstrate the highest achievable energy standards',
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
      'The maximum air leakage rate permitted through the building fabric',
      'The actual measured CO2 emissions recorded during the first year of occupation',
      'The CO2 emission rate the building must achieve, based on the notional dwelling',
      'The minimum percentage of energy that must come from on-site renewables',
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
      'The target CO2 emission rate derived from the notional dwelling',
      'The annual energy bill in pounds for a typical occupant of the dwelling',
      'The rate of heat loss through a single building element',
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
      'Single glazing is permitted provided the frames are thermally broken',
      'Triple glazing with a U-value of 3.0 W/m²K or better is mandatory',
      'Any glazing is acceptable as long as the total window area is below 25%',
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
      'A light fitting that is dimmed automatically by an occupancy sensor',
      'Building services that must meet minimum efficiency standards when replaced',
      'A fitting that may only be installed by a registered electrician',
      'A radiator valve that controls the room temperature to a fixed setpoint',
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
      'A ten-year warranty covering all installed heating equipment',
      'A guarantee that energy bills will not exceed a stated annual figure',
      'Information about efficient operation of heating, ventilation, and hot water systems',
      'A signed contract obliging the occupant to use a specific energy supplier',
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
      'A target covering only the energy used directly within the dwelling',
      'A target for the carbon emissions of the heating system alone',
      'A target for the energy used by the most important room in the house',
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
      'Appointing the contractor who will carry out the building works',
      'Calculating the dwelling emission rate before construction begins',
      'Issuing the Energy Performance Certificate once the building is sold',
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
      'Only the architect\'s drawings and a structural calculation',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'A site waste management plan and a noise assessment only',
      'A planning permission certificate and party wall agreement',
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
      'A test of the mains water pressure supplied to the building',
      'A test of the gas supply pipework for leaks before connection',
      'A test to measure air leakage rate through the building envelope',
      'A test of the flue draught on a newly installed boiler',
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
      'Only for dwellings that are over three storeys high',
      'Only when a dwelling is being sold or re-let',
      'Only for dwellings heated by a heat pump rather than gas',
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
      'The rate of heat conducted through the glazing (its thermal transmittance)',
      'The proportion of visible light reflected back off the glass surface',
      'The acoustic insulation value of the glazing unit in decibels',
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
      'Repairs that must follow on automatically after any building defect is found',
      'Required energy efficiency upgrades when extending or renovating larger buildings',
      'Improvements recommended in an EPC report that the owner may choose to ignore',
      'Upgrades funded entirely by a government grant when a property changes hands',
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
      '25% of fixed lighting outlets must have efficient fittings (typically LED)',
      '50% of fixed lighting outlets must have efficient fittings (typically LED)',
      '75% of fixed lighting outlets must have efficient fittings (typically LED)',
      '100% of fixed lighting outlets must have efficient fittings (typically LED)',
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
      'Cost of Power - the running cost of the heat pump per kilowatt-hour',
      'Compressor Operating Pressure - the working pressure of the refrigerant circuit',
      'Continuous Output Power - the maximum heat output the unit can sustain',
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
      'They burn a renewable biofuel instead of natural gas',
      'They generate their own electricity from a built-in solar cell',
      'They extract renewable heat from the environment (air, ground, or water)',
      'They store surplus grid electricity for later release as heat',
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
      'Increasing generation at a power station to meet rising consumer demand',
      'A supplier raising its tariff in response to higher wholesale gas prices',
      'The time taken for a heating system to respond after the thermostat is changed',
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
      'A meter that automatically switches the supply off when a bill is unpaid',
      'A meter that only records peak demand for maximum demand charging',
      'A handheld device an engineer uses to take manual meter readings',
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
      'They guarantee a single fixed unit rate for the whole of the contract',
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
      'They remove the standing charge from the customer\'s electricity bill',
      'They cap the total amount a household can be charged in any month',
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
      'The ratio of voltage to current in a purely resistive circuit',
      'The multiplier used to convert kilowatts into horsepower',
      'The ratio of real power to apparent power, indicating how efficiently power is used',
      'The factor by which supply voltage must be derated for long cable runs',
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
      'Purely resistive loads such as heaters and incandescent lamps',
      'A supply voltage that is slightly higher than the nominal 230 V',
      'Long cable runs that increase the circuit resistance',
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
      'Increasing the supply voltage to reduce the current drawn',
      'Adding extra inductors in series with the inductive loads',
      'Reducing the cable cross-sectional area to raise the resistance',
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
      '1 to 10 (with 10 being most efficient)',
      'A to G (with A being most efficient)',
      'Bronze, Silver, Gold, Platinum',
      'A to G (with G being most efficient)',
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
      'Dimming lights automatically in response to available daylight',
      'Adjusting the colour temperature of lights through the day',
      'Counting how many people enter a building for fire-safety purposes',
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
      'Capturing solar energy with rooftop panels to power the lighting circuit',
      'Switching lights on automatically when a room becomes occupied',
      'Using mirrors and light pipes to channel sunlight deep into a building',
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
      'A mechanical gearbox that changes a motor\'s output speed by selecting gears',
      'An electronic device that controls motor speed by varying the frequency of power supply',
      'A soft-starter that limits inrush current but runs the motor at fixed speed',
      'A device that controls motor speed by varying the supply voltage only',
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
      'Power consumption varies directly in proportion to speed (linear relationship)',
      'They eliminate the reactive power drawn by the motor windings',
      'Power consumption varies with the cube of speed (Affinity Laws)',
      'They recover braking energy and feed it back into the supply',
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
      'A system that recovers waste heat from a boiler flue to preheat hot water',
      'A natural ventilation system relying on opening windows and trickle vents',
      'A heat pump that recovers heat from the ground to warm the building',
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
      'Around 30-40% heat recovery at best',
      'Up to 50% heat recovery in well-sealed buildings',
      'Close to 100% heat recovery with no fan energy used',
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
      'It condenses incoming mains water before heating it for greater efficiency',
      'It runs at a higher flow temperature so it heats the home more quickly',
      'It has a secondary heat exchanger that recovers latent heat by condensing water vapour from flue gases',
      'It uses an electric immersion element to top up the gas burner output',
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
      'Above about 80°C (return temperature kept well above the dew point)',
      'Exactly 70°C, the standard radiator design flow temperature',
      'Below about 35°C, matching underfloor heating flow temperatures',
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
      'The peak instantaneous efficiency measured at the warmest outdoor temperature',
      'The efficiency of a heat pump measured only on the coldest design day',
      'The combined efficiency of the heat pump and its backup immersion heater',
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
      'A sudden voltage spike that occurs when an appliance is switched on',
      'Electricity consumed by devices when switched off but still plugged in',
      'Power lost as heat in the cables between the meter and the appliance',
      'Reactive power drawn by motors that does no useful work',
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
      'A financial review of an organisation\'s annual energy spending for tax purposes',
      'A safety inspection of the electrical installation to BS 7671',
      'Systematic assessment of energy use to identify savings opportunities',
      'A check that the energy supplier has billed the customer correctly',
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
      'Providing a backup meter in case the main supplier meter fails',
      'Measuring the voltage and current quality of the incoming supply',
      'Recording exported electricity from a renewable generator for payment',
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
      'A unit of power equal to 1000 watts measured at any instant',
      'A unit of current equal to 1000 amps flowing for one hour',
      'A unit of energy equal to using 100 watts for one hour',
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
      'Energy is the rate of use (kW); power is energy over time (kWh)',
      'Power is the rate of energy use (kW); energy is power over time (kWh)',
      'They mean the same thing and are interchangeable units',
      'Energy is measured in volts; power is measured in amps',
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
      'Spreading the electrical load evenly across all three supply phases',
      'Gradually increasing load to avoid a sudden inrush at switch-on',
      'Deliberately reducing electrical load by switching off non-essential equipment during peak demand',
      'Transferring load onto a standby generator during a mains failure',
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
      'Charging the customer the highest unit rate available during peak hours',
      'A penalty charged when total annual consumption exceeds a set limit',
      'Charging based solely on the total kWh consumed in the period',
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
      'About 500-600g CO2/kWh (and rising)',
      'About 1000g CO2/kWh (roughly the same as burning coal)',
      'Effectively 0g CO2/kWh as the grid is now fully renewable',
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
      'PV heats water or air; thermal generates electricity',
      'PV generates electricity; thermal heats water or air',
      'PV works only in summer; thermal works only in winter',
      'PV is mounted on the ground; thermal is always roof-mounted',
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
      '2-5% for standard panels, up to 8% for premium',
      '40-50% for standard panels, up to 60% for premium',
      '18-22% for standard panels, up to 25%+ for premium',
      '70-80% for standard panels, up to 90% for premium',
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
      'A solar system that operates entirely off-grid using batteries only',
      'A solar system that supplies DC directly to appliances without an inverter',
      'A solar system limited to charging a single electric vehicle',
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
      'Convert AC grid electricity into DC to charge the panels at night',
      'Step the panel voltage up to grid distribution voltage for export',
      'Track the sun across the sky by tilting the panel array',
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
      'Maximum Permitted Panel Temperature - the thermal limit of the modules',
      'Maximum Power Point Tracking - optimising power extraction from panels',
      'Multi-Phase Power Transfer - balancing output across three phases',
      'Mains Protection and Power Trip - the anti-islanding safety device',
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
      'A guarantee that a PV system will export a fixed amount of energy each year',
      'A government grant covering the upfront cost of installing solar panels',
      'A scheme requiring energy suppliers to pay for exported renewable electricity',
      'A warranty guaranteeing inverter performance for 25 years',
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
      '3-5 years before they must be replaced',
      '8-10 years with rapid degradation',
      '50-60 years with no measurable degradation',
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
      'A fan unit that simply blows warm air around a room electrically',
      'A heat pump that extracts heat from the ground via buried pipes',
      'A boiler that heats air rather than water for distribution',
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
      'A heat pump that extracts heat from the outside air via a fan unit',
      'A heat pump extracting heat from the ground via buried pipes or boreholes',
      'A heat pump that draws heat from a building\'s own waste water',
      'A ground-mounted solar array that powers a conventional electric heater',
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
      'Underfloor heating requires a higher flow temperature, matching the heat pump',
      'Underfloor heating allows the heat pump to run only at night on cheap power',
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'Underfloor heating removes the need for any insulation in the building',
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
      'A scheme requiring suppliers to pay for exported renewable electricity',
      'A grant towards replacing an old gas boiler with a new gas boiler',
      'A finance scheme spreading the cost of a heat pump over 10 years',
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
      'Converting DC from the panels into AC for use in the home',
      'Increasing the voltage of the panels to allow longer cable runs',
      'Cooling the inverter to keep it operating within its temperature limits',
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
      'A large utility-scale turbine rated above 1MW for grid supply',
      'A turbine driven by water flow rather than wind in a small stream',
      'A handheld anemometer used to measure wind speed before installation',
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
      'The colour of the turbine blades and the height of the mast only',
      'Only the rated power of the turbine, regardless of the site',
      'Solely the number of daylight hours at the installation location',
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
      'A small heat pump combined with a hot water cylinder in one unit',
      'Combined Heat and Power system that generates both electricity and useful heat',
      'A compact PV inverter with integrated battery management',
      'A miniature district heating network serving a single street',
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
      'Heating using natural gas extracted from decomposing landfill waste',
      'Heating water using the metabolic heat given off by livestock',
      'Heating using organic materials like wood pellets, chips, or logs',
      'Heating using captured methane piped directly from a sewage works',
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
      'The Feed-in Tariff (FiT) for ongoing generation payments',
      'The Smart Export Guarantee (SEG) for exported electricity',
      'The Energy Company Obligation (ECO) for fuel-poor households',
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
      'The point on a route where an electric vehicle must stop to refuel',
      'A meter that records the mileage driven by an electric vehicle',
      'A roadside socket supplying compressed air to electric vehicle tyres',
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
      '50-150kW (typically rapid DC for single-phase)',
      '7-22kW (typically 7kW for single-phase)',
      '1-2kW (typically trickle charging only)',
      '230-400kW (typically ultra-rapid for domestic use)',
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
      'Part F (Ventilation) and Part L (Conservation of fuel and power)',
      'Part B (Fire safety) and Part M (Access to buildings)',
      'Part S (Infrastructure for electric vehicles) and Part P (Electrical Safety)',
      'Part A (Structure) and Part O (Overheating)',
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
      'A roadside fast-charging network connecting motorway service stations',
      'A scheme guaranteeing free grid electricity to electric vehicle owners',
      'A communication protocol letting EVs share their location with the grid',
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
      'Mono generates DC while poly generates AC directly without an inverter',
      'Mono is more efficient and black in appearance; poly is slightly less efficient and blue-ish',
      'Poly is more efficient and black in appearance; mono is less efficient and blue-ish',
      'Mono is for solar thermal heating; poly is for electricity generation',
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
      'An inverter that runs on both mains power and a backup generator',
      'An inverter combining single-phase and three-phase outputs',
      'An inverter that manages both solar PV and battery storage in one unit',
      'An inverter that switches between solar PV and wind turbine inputs',
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
      'Mounting panels on a separate frame isolated from the roof structure',
      'Splitting a large array into smaller independent strings',
      'A drop in output caused by partial shading of one panel',
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
      'Recording only the electricity exported to the grid for SEG payments',
      'Measuring the household\'s total imported electricity from the supplier',
      'Monitoring the DC string voltage to protect the inverter',
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
      'Mains Compliance Standard - a wiring test for grid-connected systems',
      'Microgeneration Certification Scheme - required for installer competence and grant eligibility',
      'Manufacturer\'s Conformity Statement - a product warranty document',
      'Metered Consumption Scheme - a tariff for measuring exported energy',
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
      'A small, uninsulated tank that stores high-temperature water briefly',
      'A pressurised gas cylinder holding the heat pump refrigerant charge',
      'A larger, well-insulated cylinder designed for lower-temperature heat pump operation',
      'A header tank that maintains pressure in the heat pump\'s sealed circuit',
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
      'A weekly boost cycle that pasteurises the hot water cylinder',
      'A summer mode that reverses the unit to provide cooling',
      'A start-up sequence that warms the compressor oil before running',
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
      'The flow temperature at which the heat pump achieves its highest COP',
      'The point at which a heat pump switches from heating to cooling mode',
      'The minimum buffer-tank volume required for stable operation',
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
      'Part F (ventilation) and the Gas Safety (Installation and Use) Regulations',
      'Part P (electrical safety), Part S (EV infrastructure), and relevant equipment standards',
      'Only the manufacturer\'s installation instructions, with no statutory regulation',
      'Part B (fire safety) and the Construction (Design and Management) Regulations',
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
      'Charging an EV at the fastest possible rate regardless of cost',
      'Charging that automatically stops once the battery reaches 80%',
      'Intelligent charging that optimises timing based on tariffs, grid demand, or renewable availability',
      'Wirelessly charging an EV without any physical cable connection',
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
      'Charging batteries only during peak periods to maximise capacity',
      'Trimming the peak voltage of the supply to protect sensitive equipment',
      'Limiting the battery charge to 80% to extend its service life',
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
      'The use of robots to carry out the physical construction of a building',
      'Pre-fabricating building components off-site for rapid assembly',
      'Automatically generating the building\'s structural design from a brief',
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
      'A facilities team responsible for cleaning and maintaining a building',
      'A centralised system for monitoring and controlling building services',
      'A software package for managing a building\'s lease and rental income',
      'A logbook recording all maintenance carried out on a building',
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
      'HTTP, FTP, and SMTP for web traffic',
      'USB, HDMI, and Bluetooth for consumer devices',
      'BACnet, Modbus, KNX, or DALI for lighting',
      'TCP/IP only, with no building-specific protocols',
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
      'A type of dimmer switch that varies the mains voltage to the lamp',
      'A wireless protocol that controls lights over a building\'s WiFi network',
      'A sensor that measures the colour temperature of natural daylight',
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
      'It removes the need for any wiring between luminaires',
      'It allows all lights to be switched only as a single group',
      'It doubles the light output of each luminaire for the same power',
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
      'A proprietary protocol used only by a single lighting manufacturer',
      'A worldwide standard for home and building automation',
      'A wireless standard limited to domestic smart speakers',
      'A type of fire-rated cable used in building automation wiring',
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
      'A mechanical bimetallic-strip thermostat with a manual dial only',
      'A wall sensor that measures humidity rather than temperature',
      'A programmable thermostat with WiFi, learning capability, and remote control',
      'A frost thermostat that only switches heating on below freezing',
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
      'Installing physical barriers around an outdoor heat pump unit',
      'Dividing a building into separate heating zones with individual stats',
      'Limiting the maximum temperature a thermostat can be set to',
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
      'A fused plug that automatically resets after a trip',
      'A travel adapter that converts foreign plug shapes to UK sockets',
      'A plug that steps down the mains voltage for low-voltage devices',
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
      'A type of cable shielding used to reduce electromagnetic interference',
      'A wireless protocol designed for smart home device communication',
      'A waveform analysis tool for diagnosing power quality issues',
      'A wired bus standard for commercial HVAC controls',
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
      'A high-bandwidth wired protocol for streaming video in buildings',
      'A cellular network standard used by smart electricity meters',
      'A low-power wireless mesh protocol for smart home and IoT devices',
      'A proprietary cloud platform for storing building sensor data',
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
      'A wireless charging standard for smart home battery devices',
      'A voice assistant developed to compete with existing platforms',
      'A type of low-voltage cabling used for smart home installations',
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
      'A method of sending mains power down standard ring final circuits',
      'A protocol for transmitting data over the mains power wiring',
      'A backup power supply that keeps a network running during outages',
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
      'From 1W to 5W maximum for all PoE standards',
      'From 15W (PoE) to 90W+ (PoE++/802.3bt)',
      'From 100W to 500W for high-power devices',
      'A fixed 12W on every PoE standard',
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
      'Lighting powered directly from a building\'s solar PV array',
      'Mains-voltage lighting controlled wirelessly over WiFi',
      'LED lighting systems powered and controlled through Ethernet cables',
      'Emergency lighting fed from a central battery inverter',
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
      'It removes the need for any data cabling in the building',
      'It allows luminaires to run at full mains voltage for higher output',
      'It eliminates the need for any lighting control software',
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
      'A live camera view of a room used to monitor lighting faults',
      'The maximum number of luminaires a single controller can address',
      'A diagram showing how all the lighting circuits are wired',
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
      'Lighting positioned at a fixed height to suit the average person',
      'Lighting designed to support human health and circadian rhythm through colour and intensity changes',
      'Lighting that switches off automatically when no people are present',
      'Lighting controlled entirely by manual switches rather than sensors',
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
      'LED lighting that can change between any colour of the rainbow (RGB)',
      'White lighting whose brightness can be dimmed but not its colour',
      'LED lighting that can adjust colour temperature from warm to cool white',
      'Lighting that automatically tunes itself to match the wall colour',
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
      'A manually-read gauge that an engineer checks during inspections',
      'A standalone alarm that sounds locally but sends no data',
      'A central server that stores all building management records',
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
      'Measuring only the indoor air temperature against the set point',
      'Checking the airtightness of the building fabric under pressure',
      'Recording the volume of fresh air supplied by the ventilation fans',
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
      '200-300ppm, with outdoor levels around 50ppm',
      '800-1000ppm, with outdoor levels around 400ppm',
      '5000-6000ppm, with outdoor levels around 2000ppm',
      '100-150ppm, with outdoor levels around 20ppm',
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
      'Ventilation that runs continuously at a fixed maximum rate',
      'Ventilation provided solely by opening windows on demand',
      'Automatic ventilation adjustment based on occupancy or air quality sensors',
      'Ventilation switched on manually by occupants when needed',
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
      'A second identical building constructed nearby as a backup',
      'A scanned PDF archive of all the building\'s paper drawings',
      'A static 3D model used only during the design stage',
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
      'Building Inspection Method - the procedure for Building Control sign-off',
      'Basic Insulation Material - the standard fabric used in new builds',
      'Building Integrity Monitor - a sensor that detects structural movement',
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
      'The smart meter itself, mounted inside the consumer unit',
      'A device showing real-time energy usage and costs from the smart meter',
      'A wall thermostat that displays the indoor temperature',
      'A control panel for switching individual appliances on and off',
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
      'Sharing the charging load equally across the three supply phases',
      'Alternating charging between the vehicle and a home battery',
      'Distributing available power across multiple charge points to prevent overload',
      'Limiting charging to overnight hours to balance the grid',
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
      'A control panel for manually switching building services on and off',
      'A sensor that measures total energy used by a single circuit',
      'A printed annual report summarising a building\'s energy bills',
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
      'Carrying out maintenance only after equipment has broken down',
      'Servicing all equipment on a fixed calendar schedule regardless of condition',
      'Replacing equipment automatically at the end of its warranty period',
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
      'A handheld instrument for tracing cable faults in an installation',
      'Automated systems that identify operational faults and their likely causes in building systems',
      'A maintenance logbook recording all faults reported by occupants',
      'A residual current device that disconnects on an earth fault',
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
      'Only when a building changes its use class',
      'Only once every ten years regardless of occupancy',
      'Only when a building is first connected to the grid',
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
      'Any qualified electrician registered with a competent person scheme',
      'The local authority Building Control officer only',
      'The estate agent marketing the property',
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
      'A legally binding list of works the owner must complete within a year',
      'Cost-effective improvements to increase the energy efficiency rating',
      'A schedule of electrical defects found during inspection',
      'The names of approved contractors who must carry out any works',
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
      'Standards setting the minimum insulation thickness for new builds',
      'Standards for the minimum efficiency of new boilers and heat pumps',
      'Regulations setting minimum EPC ratings for rental properties',
      'Standards setting the minimum lighting efficacy in commercial buildings',
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
      'Any property owned by a registered charity is automatically exempt',
      'All properties built before 1990 are permanently exempt',
      'Properties let on tenancies longer than ten years are exempt',
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
      'Automatic forfeiture of the property to the local authority',
      'A criminal record and mandatory custodial sentence',
      'A permanent ban from owning any rental property',
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
      'A certificate confirming a building\'s electrical installation is safe',
      'A certificate showing actual energy use in public buildings over 250m²',
      'A certificate showing the designed energy performance of a new home',
      'A certificate required before a building can be connected to the grid',
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
      'An EPC applies to public buildings; a DEC applies to private homes',
      'A DEC is based on design performance; an EPC shows actual measured use',
      'EPC is based on calculated/design performance; DEC shows actual measured energy use',
      'An EPC is valid for one year; a DEC is valid for ten years',
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
      'A voluntary energy audit available to any household on request',
      'An annual electrical safety inspection of commercial premises',
      'A one-off audit required only when a building is first occupied',
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
      'A voluntary scheme for households to report their energy use',
      'A simplified method of calculating a building\'s EPC rating',
      'A government grant scheme for carbon reduction projects',
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
      'A report confirming the refrigerant charge has been topped up',
      'A mandatory inspection for AC systems over 12kW, assessing efficiency and sizing',
      'A daily maintenance log kept by the building\'s facilities team',
      'A certificate confirming the AC unit meets noise emission limits',
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
      'A method for calculating a building\'s embodied carbon at design stage',
      'A testing standard for the airtightness of ductwork',
      'A framework for assessing overheating risk in dwellings',
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
      'The gap between a building\'s EPC rating and its asking price',
      'The shortfall between renewable generation and total demand',
      'The difference in temperature between adjacent heating zones',
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
      'A building that uses no electricity at all from the grid',
      'A building that produces zero net carbon emissions over a year through efficiency and renewables',
      'A building constructed entirely from carbon-free materials',
      'A building that emits zero carbon only during its construction phase',
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
      "The carbon emitted by the building's heating system during occupation",
      "The carbon stored permanently within the building's timber structure",
      "The carbon emissions from materials, construction, and eventual demolition - the building's lifecycle",
      "The carbon emitted by occupants travelling to and from the building",
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
      'A rating system for the embodied carbon of construction materials',
      'A design-stage methodology for predicting a building\'s energy use',
      'A certification scheme for renewable energy installers',
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
      'British Renewable Energy and Emissions Assessment Model - a carbon calculator',
      'Building Regulations Energy Efficiency Assessment Method - a compliance check',
      'British Register of Environmental and Energy Assessors and Managers',
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
      'A to G (with A being most efficient)',
      'Pass, Good, Very Good, Excellent, Outstanding',
      'Certified, Silver, Gold, Platinum',
      'One to five stars',
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
      'Low Emission Energy Directive - an EU rule on building emissions',
      'Lighting Energy Efficiency Database - a register of efficient luminaires',
      'Leadership in Energy and Environmental Design - an international green building rating',
      'Local Environmental and Energy Declaration - a UK planning document',
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
      'A building that generates all its energy from passive solar gain alone',
      'A building with no active heating system fitted at all',
      'A building that relies solely on natural ventilation with no mechanical systems',
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
      'A government department enforcing the Building Regulations',
      'An industry body promoting sustainable building practices and policy',
      'A local authority committee approving planning applications',
      'A certification scheme awarding EPC ratings to buildings',
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
      'Ventilation requirements in new buildings',
      'Drainage and waste disposal in dwellings',
      'Overheating mitigation in new residential buildings',
      'Electrical safety in domestic installations',
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
      'An economic model where construction firms trade only within their region',
      'A building layout designed around a central circular atrium',
      'A funding model where profits are reinvested back into the same project',
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
      'The physical land area taken up by a carbon-storage facility',
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'The amount of carbon permanently stored in a building\'s materials',
      'The annual carbon tax payable by a large organisation',
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
      "Assessing only the carbon emitted while a product is in use",
      "A maintenance schedule covering a product's expected service life",
      "Evaluating environmental impacts throughout a product's life from raw materials to disposal",
      "Estimating how many years a product will last before replacement",
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
      'Emissions from gas (1), electricity (2), and water use (3) respectively',
      'Three increasing severity bands of an organisation\'s carbon penalty',
      'Emissions measured at low (1), medium (2), and high (3) confidence levels',
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
      'Subtracting renewable generation from an organisation\'s electricity bill',
      'Capturing CO2 from a flue and storing it permanently underground',
      'Delaying emissions reductions until a future target date',
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
      'A research funding target set by government for climate science',
      'An emissions reduction target aligned with climate science to limit global warming',
      'A target number of renewable installations a contractor must complete',
      'A legally enforceable emissions cap set by the Climate Change Committee',
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
      'Negotiating international climate treaties on behalf of the UK',
      'Distributing government grants for renewable energy projects',
      'Independent body advising UK government on emissions targets and progress',
      'Enforcing carbon penalties on companies that exceed their limits',
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
      'Cleaning solar panels to maintain their generation efficiency',
      'Planting vegetation on a building\'s roof to improve insulation',
      'Reusing grey water from sinks to flush toilets in a building',
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
      'A set of UK Building Regulations covering sustainable construction',
      'Carbon reduction targets that apply only to developing countries',
      'A voluntary checklist of green features for new housing developments',
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
      'A European standard for the energy rating of buildings',
      'An international treaty on climate change limiting global warming to 1.5-2°C',
      'A UK law committing the nation to net zero by 2050',
      'A trade agreement governing the import of renewable equipment',
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
      'Energy, Sustainability, and Generation - a renewable certification',
      'Emissions Scope Grouping - a way of classifying carbon sources',
      'Environmental, Social, and Governance - criteria for assessing corporate sustainability',
      'Efficiency Standards and Guidance - rules for building services',
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
      'A lease that can only be granted on buildings rated EPC band A',
      'A short-term lease offered at a discount to encourage occupancy',
      'A lease that transfers all energy costs to the landlord',
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
      'Adding electric immersion backup to an existing gas boiler',
      'Generating electricity from waste heat in industrial processes',
      'Blending hydrogen into the gas grid to lower heating emissions',
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
      'It reduces the standing charge component of electricity bills',
      'As grid electricity becomes cleaner, electric heating produces fewer emissions than gas',
      'It allows buildings to disconnect from the grid entirely',
      'It increases the carbon intensity of gas relative to electricity',
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
      'Using a hydrogen fuel cell to power an electric heat pump',
      'Heating water by passing electricity through it (electrolysis)',
      'Using hydrogen gas (potentially blended with natural gas or 100%) for building heating',
      'Recovering heat released when hydrogen is produced industrially',
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
      'A heating system that serves only a single large building',
      'A heat pump installed in every individual dwelling on an estate',
      'Underfloor heating distributed throughout the rooms of a house',
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
      'A network of thermostats wirelessly linked across a single home',
      'The pipework connecting a heat pump to its individual radiators',
      'A data network monitoring temperatures across a building\'s rooms',
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
      'A set of updated Building Regulations for new construction',
      'Off-site manufacturing and innovative construction techniques reducing waste and time',
      'A digital modelling standard used during the design of buildings',
      'The use of low-carbon concrete in traditional on-site building',
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
      'Designing energy efficiency into a building from the outset',
      'Returning a building to its original historic condition',
      'Upgrading existing buildings with improved insulation, heating, and technologies',
      'Demolishing an old building and rebuilding it to modern standards',
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
      'A target year by which all homes must reach EPC band C',
      'A standard for the airtightness testing of new dwellings',
      'A standard setting minimum efficiency for new boilers',
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
      'When a region runs short of fuel supplies during a cold winter',
      'When a property has no mains gas connection available',
      'When a household uses more energy than the national average',
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
      'Energy Conservation Order - a legal duty to insulate rental homes',
      'Energy Company Obligation - requiring energy suppliers to fund energy efficiency improvements',
      'Environmental Compliance Obligation - a carbon reporting requirement',
      'Efficient Construction Objective - a target for new build emissions',
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
      'A standard setting minimum U-values for insulation products',
      'A manufacturer trade body certifying insulation materials',
      'A government scheme providing insulation grants to improve energy efficiency',
      'A national database recording insulation installed in every home',
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
      'Risk that a building is left empty due to a downturn in the rental market',
      'Risk that building equipment fails before the end of its warranty',
      'Risk that a building is damaged by extreme weather events',
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
      'Charging an EV directly from a home solar array only',
      'Using the home supply to preheat an EV cabin before a journey',
      'Routing an EV charger through the home consumer unit',
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
      'Charging an EV using a portable battery pack carried in the boot',
      'Inductive charging transferring power without physical cable connection',
      'Charging that is controlled remotely via a smartphone app',
      'Charging an EV from an overhead pantograph contact',
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
      'Batteries with no moving parts, switched electronically rather than mechanically',
      'Batteries fixed permanently in place rather than removable',
      'Batteries using solid electrolyte instead of liquid, offering higher energy density and safety',
      'Batteries made from a single solid block of lithium metal',
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
      'Hydrogen produced from natural gas with the carbon captured and stored',
      'Hydrogen produced from coal gasification at low cost',
      'Hydrogen dyed green so it can be distinguished in pipework',
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
      'Equipment that burns hydrogen to generate electricity and heat',
      'Equipment that compresses hydrogen gas for storage in tanks',
      'Equipment that measures the electrical conductivity of water',
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
      'A rechargeable battery cell that stores hydrogen for later use',
      'A device that generates electricity from hydrogen and oxygen through chemical reaction',
      'A tank that stores liquid fuel for a backup generator',
      'A small combustion engine that burns hydrogen to drive a generator',
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
      'Storing carbon credits in a register for future trading',
      'Capturing waste heat from industry and storing it for reuse',
      'Capturing CO2 emissions and storing them underground to prevent atmospheric release',
      'Absorbing CO2 by planting trees on degraded land',
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
      'Capturing CO2 directly from a power station flue before release',
      'Drawing fresh air directly into a building without ductwork',
      'Capturing rainwater directly from the air for reuse',
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
      'Standard PV panels mounted on a frame above a flat roof',
      'A control system linking PV output to the building management system',
      'Ground-mounted solar arrays sited next to a building',
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
      'A grid of smart meters installed in every home in a region',
      'An electricity network using digital technology to optimise generation, distribution, and consumption',
      'A localised microgrid powered entirely by on-site renewables',
      'A grid layout that uses higher voltages to reduce transmission losses',
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
      'A small home battery sized to store one day of domestic use',
      'The combined storage of many EV batteries when plugged in',
      'Large battery installations storing electricity to balance grid supply and demand',
      'Backup batteries kept at substations only for control systems',
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
      'Storing energy as pressurised water in a sealed tank',
      'Generating electricity from the flow of a tidal estuary',
      'Storing heat in a large insulated water tank for later use',
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
      'A computer simulation of a power station used for training operators',
      'A backup generator that starts automatically during a grid outage',
      'A planned power station that has not yet been built',
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
      'Wholesale trading of energy between two large generators',
      'Direct energy trading between producers and consumers without traditional utilities',
      'Switching energy supplier to get the best available tariff',
      'Selling exported electricity back to the grid under the SEG',
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
      'A physical barrier preventing power flowing back into the grid',
      'A method of grouping circuits into protected blocks within a panel',
      'Distributed ledger technology enabling transparent, secure energy transactions and trading',
      'A scheduling system that blocks charging during peak grid demand',
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
      'A rule-based timer that switches services on and off at fixed times',
      'A remote human operator monitoring the building via cameras',
      'A standardised protocol for connecting building automation devices',
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
      'Forecasting next year\'s energy bills based on past invoices alone',
      'Manually adjusting building services in response to the weather forecast',
      'Predicting when energy tariffs will change so contracts can be renewed',
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
      'Storing electricity in a battery to power an electric heater later',
      'Storing energy as heat or cold for later use in heating or cooling systems',
      'Insulating a building so it retains heat for longer',
      'Recovering heat from exhaust air to warm incoming fresh air',
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
      'A material whose colour changes with temperature to indicate heat',
      'A material that changes the phase angle of an AC supply',
      'A material that absorbs/releases heat when changing state (solid/liquid), storing thermal energy',
      'A material that converts heat directly into electricity',
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
      'Glazing with integrated PV cells that generate electricity',
      'Glazing that can be opened and closed by a motorised actuator',
      'Toughened glazing designed to withstand high impact loads',
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
      'Glass that generates a small voltage when sunlight strikes it',
      'Glass coated with a thin film that reflects all infrared heat',
      'Glass that changes tint passively in response to temperature only',
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
      'A building that consumes exactly zero net energy over a year',
      'A building that generates more energy than it consumes over a year',
      'A building powered entirely from the grid with no on-site generation',
      'A building rated EPC band A for its designed energy performance',
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
      'The broadband connection that provides internet access to occupants',
      'A cloud platform for storing a building\'s design drawings',
      'Network of connected sensors and devices enabling data collection and automated control',
      'A standardised wiring protocol for connecting building services',
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
      'Splitting an energy bill fairly between tenants of a shared building',
      'Separating renewable generation from grid import on a meter',
      'Fitting a separate sub-meter to every individual circuit',
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
      'Producing the marketing brochures used to sell a building',
      'Replacing the need for any physical sensors in the building',
      'Storing a one-off snapshot of the building at handover only',
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
      'For domestic PV the DC system is kept within the low-voltage band, conventionally up to 1000 V DC. Higher string voltages (up to 1500 V DC) are used on larger commercial/utility arrays with additional protective measures; BS 7671 Section 712 also caps the voltage to earth (Ugc) at 120 V DC.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 202,
    question: 'Under BS 7671 Reg 712.411.3.2.1.2, where the inverter does not provide simple separation, what additional protective measure is required?',
    options: [
      'A Type AC RCD on the AC side, which is always sufficient for PV inverters',
      'An additional DC isolator fitted on the AC side of the inverter',
      'A transformer providing simple separation between the AC and DC sides, OR an RCD type B on the AC side',
      'Doubling the CPC size on the DC string cabling to the array',
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
      'A Type AC RCD rated at 30 mA fitted at the origin of the final circuit',
      'A second PEN conductor run in parallel to halve the fault current',
      'A surge protection device installed adjacent to the charge point',
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
      'Type AC, which is always adequate for an EV charging point',
      'Type S (time-delayed) at the origin of the installation',
      'Type F, providing protection against high-frequency residual currents',
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
    question: 'Under BS 7671 Section 753 (Reg 753.424.201), what maximum temperature must be applied within the zone where floor or ceiling heating units are installed?',
    options: [
      '35°C, achieved by a thermostat, thermal cut-out or other temperature-limiting measure',
      '80°C, achieved by a thermostat, thermal cut-out or other temperature-limiting measure',
      '120°C, achieved by a thermostat, thermal cut-out or other temperature-limiting measure',
      '200°C, achieved by a thermostat, thermal cut-out or other temperature-limiting measure',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Reg 753.424.201 requires at least one measure (thermostat, thermal cut-out or overtemperature protection) to limit the temperature within the heating-unit zone to a maximum of 80°C. A 30 mA RCD is also required for floor and ceiling heating systems.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 206,
    question: 'For a TN-C-S (PNB) supply supplying a heat pump with an outdoor unit, what specific concern must your design address per BS 7671?',
    options: [
      'The risk of excessive volt drop on the long cable run to the outdoor unit',
      'The risk of harmonic distortion from the heat pump\'s inverter overheating the neutral',
      'PEN-conductor open-circuit risk to outdoor metalwork — apply Section 722-style measures: earth electrode, residual current detection, or use of a dedicated supplier-issued separate earth (TT outdoor)',
      'The risk that condensation from the outdoor unit corrodes the earth electrode connection',
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
      '80% of the module short-circuit current Isc, since DC cables run cooler than AC',
      'Exactly the inverter\'s rated AC output current, ignoring the DC string current',
      'Only the open-circuit voltage Voc, with current rating left to the inverter',
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
      'A single AC isolator at the consumer unit only, since the battery is extra-low voltage',
      'A lockable cover over the battery terminals, with no separate isolator required',
      'A 30 mA RCD on the DC side, which provides all necessary means of disconnection',
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
      'AFDDs are now banned on PV and battery circuits because of nuisance tripping',
      'Recommended for final circuits supplying or fed from PV/battery installations to mitigate arc-fault risk on long DC and AC runs',
      'AFDDs replace the need for any RCD protection on PV and battery circuits',
      'AFDDs are required only on the DC side and never on the AC side of an inverter',
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
      'All metallic mounting frames must always be main-bonded back to the MET regardless of the equipment class',
      'Mounting frames must be bonded with a minimum 25 mm² conductor in every installation',
      'Where metallic mounting frames are connected to exposed-conductive-parts of Class I PV equipment, they form part of that equipment\'s earthing arrangement; otherwise, fault-loop impedance and lightning protection requirements apply',
      'Mounting frames must never be earthed, to avoid creating an islanding hazard',
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
      'Any electrician registered with a competent person scheme may install PV without further certification',
      'Only the DNO is permitted to install a domestic solar PV system',
      'No formal competence is required provided the system is below the G98 threshold',
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
      'A simple rule of thumb of 100 W per square metre of floor area, regardless of fabric',
      'Sizing the heat pump to match the kW rating of the boiler it replaces',
      'Sizing based on the SAP rating taken straight from the property\'s EPC',
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
      'Any qualified electrician may break into refrigerant pipework provided they wear PPE',
      'Only F-Gas-certified personnel may install, maintain, decommission or do leak checks on equipment containing fluorinated greenhouse gas refrigerants — electricians without F-Gas certification can only do the electrical work',
      'Refrigerant work is unrestricted as long as the charge is below 5 tonnes CO₂e',
      'Only the manufacturer is permitted to carry out any work on the refrigerant circuit',
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
      '32 A per phase (≈7.36 kW single-phase, ≈22 kW three-phase) — notified after commissioning',
      '13 A per phase (≈3 kW single-phase, ≈9 kW three-phase) — notified before commissioning',
      '16 A per phase (≈3.68 kW single-phase, ≈11 kW three-phase) — installer notifies the DNO after commissioning',
      '63 A per phase (≈14.5 kW single-phase, ≈43 kW three-phase) — notified after commissioning',
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
      'Install the generator first, then notify the DNO within 28 days as for G98',
      'No application is needed; the generator may connect once it passes commissioning tests',
      'Apply to Ofgem rather than the DNO, who then arranges the connection',
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
      'COP is the seasonal average; SCOP is the single-point peak — the customer should focus on COP',
      'COP measures heating; SCOP measures cooling — both matter equally to running cost',
      'COP and SCOP are identical figures; the customer can focus on either one',
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
      '80°C maximum design flow temperature for new wet space heating systems, matching traditional boiler practice',
      '55°C maximum design flow temperature for new wet space heating systems — encouraging emitter sizing that suits low-temperature heat pumps',
      '35°C maximum design flow temperature for new wet space heating systems, requiring underfloor heating only',
      'There is no maximum; flow temperature is left entirely to the installer',
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
      'A single AC isolator at the consumer unit is sufficient; no DC isolator is needed',
      'The DC isolator may be an ordinary plug and socket rated for AC use',
      'A DC isolator must be provided at each PV array adjacent to the inverter, suitable for switching DC under load and clearly identified for rapid emergency disconnection',
      'The DC isolator must be located outside the building boundary at the meter position',
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
      'In an attached garage with adequate ventilation and a stable temperature',
      'In a detached outbuilding away from the main dwelling',
      'On an external north-facing wall shaded from direct sunlight',
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
      'EVCP loads are intermittent, so the cable can be sized at half the charge-point rating',
      'EVCP loads benefit from full diversity, so a 2.5 mm² cable is always adequate',
      'EVCP cables need no correction factors because the charger limits its own current',
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
      'It introduces a brand-new earthing arrangement that replaces the TT system',
      'TN-C-S (PNB) is the British term for what was loosely called "PME" — combined Protective Earth and Neutral conductor in the supply, separated at the cut-out — A4:2026 standardises the terminology and reinforces design rules',
      'It means the neutral and earth must now be kept separate all the way to the supply transformer',
      'It is a new label for a TN-S system where the earth is provided by a separate cable',
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
      'SAP is used directly to size the heat pump and select its kW output',
      'SAP replaces the need for any heat-loss calculation on a heat pump job',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
      'SAP determines the design flow temperature for the heat pump emitters',
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
      'The physical dimensions and pin layout of the Type 2 charging connector',
      'The maximum cable length permitted between an EVCP and the vehicle',
      'The fire-safety separation distances required around an EV charge point',
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
      'A minimum charge rate of 22 kW and a tethered Type 2 cable on every unit',
      'A built-in payment card reader and a public-facing display screen',
      'Compulsory three-phase supply and a dedicated DNO-approved meter',
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
      'EV charging circuits are now exempt from being recorded on the schedule of test results',
      'New schedule columns capture EV-specific data including PEN-fault detection method, RCD type, charge-point rating and special-location considerations — supporting accurate dutyholder records',
      'A separate certificate must be issued by the DNO rather than the installer',
      'The schedule must now record the vehicle make and model the charger will serve',
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
      'Dispose of all removed equipment in the general waste skip on site',
      'Return all old equipment to the original manufacturer, who must legally accept it',
      'Segregate WEEE from general waste, store in suitable conditions, transfer only to authorised facilities under a Waste Transfer Note, and keep records for at least 2 years',
      'Crush and bury the equipment on site to recover the scrap metal value',
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
      'Break the tubes on site to reduce their volume before disposal in general waste',
      'Treat them as ordinary WEEE; mercury content does not make them hazardous',
      'Place them straight in the recycling skip with other glass items',
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
      'Monthly leak checks regardless of charge size, carried out by any competent electrician',
      'No leak checks are required below 50 tonnes CO₂e of refrigerant charge',
      'A single leak check at installation only, with no further checks needed thereafter',
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
      'Scope 1 = the largest emissions; Scope 2 = medium; Scope 3 = smallest and easiest to measure',
      'Scope 1 = direct emissions (vans, gas heating); Scope 2 = indirect from purchased electricity; Scope 3 = value-chain (materials, subcontractors, waste, business travel) — usually the largest',
      'Scope 1 = office emissions; Scope 2 = site emissions; Scope 3 = travel emissions only',
      'Scope 1 = purchased electricity; Scope 2 = vans and fuel; Scope 3 = nothing for a small contractor',
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
      'Switch the office electricity supply to a renewable tariff',
      'Replace the firm\'s diesel vans with electric vehicles',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
      'Install a heat pump to replace the gas heating in the firm\'s offices',
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
      'A ban on all single-use plastic packaging from 2024 onwards',
      'A requirement that all packaging be made from recycled material only',
      'A duty on consumers to return packaging to the retailer for a deposit refund',
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
      'Set a net zero carbon target before assessing any of their activities',
      'Appoint an external auditor to certify the organisation immediately',
      'Purchase carbon offsets to neutralise the organisation\'s emissions',
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
      'An 80% cut in greenhouse gas emissions by 2050 against a 1990 baseline',
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'Net Zero greenhouse gas emissions by 2030 against a 2010 baseline',
      'A voluntary aim to reduce emissions with no legally binding deadline',
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
      'A permit is required by every electrical contractor before any work on a building',
      'A permit is a planning consent issued by the local authority for construction',
      'Permits are required for installations carrying out specified activities like waste treatment or large combustion plant; most electrical contractors don\'t need one but must comply with permit conditions when working at a permitted site',
      'A permit is the dutyholder\'s written authorisation to work on a live circuit',
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
      'A bund sized for 50% of the largest container, fitted with a drain valve for rainwater',
      'A single drip tray under the tap, with the tank standing on bare ground',
      'No containment is required provided the store is under cover from rain',
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
      'The refrigerant may be safely vented to atmosphere as R32 has a low GWP',
      'The whole unit can be placed in a general scrap-metal skip once isolated',
      'The refrigerant can be removed by any electrician provided the room is ventilated',
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
      'Disposal first → Recovery → Recycling → Re-use → Prevention as a last resort',
      'Prevention → Preparing for re-use → Recycling → Other recovery (including energy recovery) → Disposal as last resort',
      'Recycling → Disposal → Re-use → Prevention → Recovery in any order',
      'Segregate → Store → Transfer → Record, with no preference order applied',
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
      'Place all tubes and ballasts in the general waste skip to keep the job simple',
      'Leave the old fittings in place and simply wire the new LEDs alongside them',
      'Tubes are hazardous WEEE (mercury) — segregate, store carefully, transfer under HWCN to permitted facility; ballasts are also WEEE — separate ferrous metals where possible to maximise material recovery',
      'Crush the tubes on site to recover the glass, then bin the ballasts as scrap',
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
      'The annual sum government sets aside to fund carbon capture projects',
      'A voluntary spending limit a contractor sets on low-carbon materials',
      'The per-project carbon allowance a client grants to its main contractor',
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
      'Part S requires every parking space to have a fully installed 22 kW charge point',
      'Part S applies only to residential buildings and exempts public car parks entirely',
      'Part S requires charge points only where the supply already has spare capacity',
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
      'Around 31% lower CO₂ emissions than 2013 Part L, the same as the 2021 interim step',
      'Around 75-80% lower CO₂ emissions than 2013 Part L, achieved through low-carbon heating (typically heat pumps) and high fabric efficiency — no fossil-fuel heating in new homes',
      '100% lower CO₂ emissions, requiring every new home to be fully off-grid',
      'Around 50% lower CO₂ emissions, while still allowing gas boilers in new homes',
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
      'A private database of installer contact details with no consumer relevance',
      'A manufacturer\'s warranty register that the consumer must sign up to separately',
      'The official register of MCS-certified installations, generating the MCS Certificate that consumers need to claim Smart Export Guarantee, Boiler Upgrade Scheme grants and other incentives',
      'A government list of approved equipment, unrelated to individual installations',
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
      'Every licensed supplier must pay a fixed government-set rate for all exported energy',
      'Suppliers must install a free generation meter for any customer with solar PV',
      'Suppliers must buy back exported electricity only from customers on their own tariff',
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
      'MCS Certificate, manufacturer\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
      'Only a verbal handover demonstrating how to use the thermostat',
      'Just the manufacturer\'s instruction leaflet that came with the unit',
      'Only the electrical installation certificate for the heat pump\'s supply circuit',
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
      'Failure to wear the correct PPE when handling hazardous materials',
      'Failure to manage WEEE (mercury-containing tubes, refrigerants, batteries) — driving most environmental enforcement; followed by uncontrolled site discharges',
      'Failure to obtain planning permission before installing equipment',
      'Failure to register installations on the MCS Installation Database',
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
      'All packaging must be made entirely from recycled cardboard',
      'Packaging must be returned to the manufacturer after a single use',
      'Packaging must be minimised to satisfy required function, designed for recovery (reuse, recycling, energy or composting), and contain only restricted levels of heavy metals',
      'Packaging must be clearly labelled with the producer\'s carbon footprint',
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
      'Lithium batteries can be placed in the household recycling bin at end of life',
      'No end-of-life planning is needed as batteries last the life of the building',
      'The battery can simply be left in place and disconnected when it fails',
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
      'A target based on what a business can comfortably afford rather than climate science',
      'A government-mandated cap that every UK business must legally achieve by 2030',
      'A research funding target for universities working on climate science',
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
      'Cyber-security is the installer\'s responsibility only until handover, then it transfers entirely to the customer',
      'Default credentials must be changed, firmware kept up to date, internet-facing components segregated where possible, and data shared with third-party platforms reviewed for privacy and security implications',
      'The system should be kept permanently offline so no cyber-security measures are needed',
      'Only the inverter manufacturer is permitted to apply any security settings',
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
      'Environmental competence reduces the contractor\'s own electricity bills',
      'It is a legal requirement for every contractor regardless of the work they do',
      'Public-sector procurement, larger commercial clients and lenders increasingly require credible carbon reporting, MCS competence and waste-hierarchy compliance — without these you\'re locked out of growing markets like heat pumps, EV, PV and battery',
      'Environmental qualifications exempt the contractor from Building Regulations',
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
