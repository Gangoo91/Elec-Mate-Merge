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

import { drawWeighted } from '@/utils/apprenticeQuestionDraw';

export const module2Questions: QuestionBank[] = [
  // ============================================
  // Section 2.1: Building Regulations Part L (Questions 1-30)
  // ============================================
  {
    id: 1,
    question: 'What does Part L of the Building Regulations primarily address?',
    options: [
      'Ventilation and indoor air quality',
      'Conservation of fuel and power',
      'Fire safety and escape routes',
      'Structure and ground movement',
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
      'To achieve a 10% reduction in CO2 emissions for new homes with no change to fabric standards',
      'To require solar PV on the roof of every new dwelling regardless of orientation or shading',
      'To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards',
      'To ban the replacement of gas boilers in existing homes from the date of the amendment',
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
      'The volume of air leaking through a building element each hour (air permeability)',
      'The proportion of daylight transmitted through a window (its light transmittance)',
      'The load a building element can carry before it fails (its structural capacity)',
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
      'What is the limiting U-value for walls in new dwellings under Part L 2021?',
    options: [
      '0.026 W/m²K or better',
      '0.26 W/m²K or better',
      '1.4 W/m²K or better',
      '3.0 W/m²K or better',
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
      'Connecting two separate heating circuits so that they share a single flow temperature and one pump',
      'Areas where heat transfers more easily through the building envelope due to breaks in insulation',
      'The transfer of heat from warm extract air into the incoming fresh air across a plate heat exchanger',
      'A continuous layer of insulation wrapping unbroken around the whole outer building envelope',
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
      'Solar Array Positioning - the method used to set the optimum panel orientation and tilt angle',
      'Structural Adequacy Protocol - a check on the load-bearing capacity of a completed building frame',
      'Site Access Permit - the authorisation required before starting work on a construction site each day',
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
    question: 'Through which element of an uninsulated dwelling is the largest share of heat lost?',
    options: [
      '100%',
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
      'Installing renewable technologies (PV, heat pumps) first and upgrading the envelope only if budget allows',
      'Choosing the cheapest available materials (lowest capital cost), regardless of insulation performance, to keep the build cost down',
      'Completing internal finishes and decoration (second fix onward) before the structural shell, insulation and cladding are built',
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
      'The calculated annual CO2 emissions produced by the actual dwelling, as designed and built',
      'A reference dwelling with the same shape but meeting minimum standards, used for comparison',
      'An imaginary average UK home, used to set the boundaries between the seven national EPC bands',
      'A show home built on the site, demonstrating the highest energy standards a developer offers',
    ],
    correctAnswer: 1,
    explanation:
      'A notional dwelling is a reference building with the same geometry as the actual dwelling but using minimum Part L specifications for comparison.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 18,
    question: 'What is the Target Emission Rate (TER)?',
    options: [
      'The maximum air leakage rate permitted through the building fabric, measured at the pressure test',
      'The CO2 emissions actually recorded by metering, taken over the first year of occupation',
      'The CO2 emission rate the building must achieve, based on the notional dwelling',
      'The minimum percentage of energy that must come from on-site renewables, such as PV or a heat pump',
    ],
    correctAnswer: 2,
    explanation:
      'TER is the target CO2 emission rate calculated from the notional dwelling that the actual dwelling must achieve or better.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
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
    difficulty: 'basic',
  },
  {
    id: 20,
    question: 'What glazing requirement typically applies under Part L?',
    options: [
      'Double glazing minimum with low-e coating and U-value around 1.4 W/m²K or better',
      'Single glazing is accepted provided the frames are thermally broken and under 1.4 W/m²K',
      'Triple glazing with a U-value of 3.0 W/m²K or better is mandatory in every dwelling',
      'Any W/m²K is acceptable provided the total window area is kept below 25%',
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
      'A light fitting that is switched automatically by an occupancy sensor in a corridor',
      'Building services that must meet minimum efficiency standards when replaced',
      'A fitting that may be installed only by an electrician registered under Part P',
      'A thermostatic radiator valve that holds a room at one fixed temperature setpoint',
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
      'A ten-year manufacturer warranty on the boiler, cylinder and heating controls',
      'A written guarantee from the builder, capping the occupant\'s annual energy bills at a stated figure',
      'Information about efficient operation of heating, ventilation, and hot water systems',
      'A signed contract obliging the occupant to buy energy from one named supplier, for the first five years',
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
      'A target for the delivered energy metered at the dwelling meter, excluding all upstream losses',
      'A target for the carbon emissions of the space heating system only, excluding hot water',
      'A target limiting the energy used per occupant rather than per square metre of internal floor area',
      'A target for total primary energy consumption including generation and distribution losses',
    ],
    correctAnswer: 3,
    explanation:
      'Primary Energy targets account for total energy consumption including losses in generation and distribution, promoting efficient fuel choices.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
  },
  {
    id: 24,
    question: 'What is the role of commissioning under Part L?',
    options: [
      'Ensuring fixed building services are installed and adjusted to operate efficiently',
      'Appointing the main contractor and subcontractors who will carry out the building works',
      'Calculating the dwelling emission rate from the drawings before any construction begins',
      'Issuing the Energy Performance Certificate to the new owner once the building is sold',
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
      'Architect\'s drawings, structural/RC calculations and a party wall agreement',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'A site waste management plan, a noise assessment and Part E sound insulation/impact results',
      'Planning permission, a CDM construction phase plan and an external air/water quality report',
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
      'A test of the gas pipework for tightness before the meter is fitted',
      'A test to measure air leakage rate through the building envelope',
      'A test of the flue draught on a newly commissioned gas boiler',
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
      'For new dwellings over three storeys high, as required by Part B',
      'At the point an existing dwelling is sold or re-let to a tenant',
      'For dwellings heated by a heat pump rather than a gas boiler',
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
      'The rate of heat conducted through the glazing unit itself, known as its thermal transmittance',
      'The proportion of visible light reflected back off the outer coated surface of the glass unit',
      'The sound reduction achieved by the sealed double glazing unit, measured in decibels',
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
      'Repairs that must be carried out automatically once any structural defect is found on site',
      'Required energy efficiency upgrades when extending or renovating larger buildings',
      'Improvements listed on an EPC recommendations report that the owner is free to leave undone',
      'Upgrades paid for entirely by a government grant whenever a property changes ownership',
    ],
    correctAnswer: 1,
    explanation:
      'Consequential improvements are additional energy efficiency upgrades required when extending or renovating buildings over a certain size.',
    section: '2.1',
    topic: 'Building Regulations Part L',
    difficulty: 'basic',
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
      '1,200-1,500 lumens per watt',
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
      '0.50-1.00',
      '2.5-4.0',
      '10.0-15.0',
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
      'They burn renewable biofuel (wood pellets, chip, or logs) in place of natural gas or oil',
      'They generate all their own electricity from a solar cell (PV) built into the casing, so they draw nothing from the supply',
      'They extract renewable heat from the environment (air, ground, or water)',
      'They store surplus grid electricity overnight (off-peak, cheap-rate) and release it later as heat',
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
      'Increasing the output at gas power stations to meet rising demand from consumers',
      'A supplier raising its unit tariff in response to higher wholesale gas prices at peak times',
      'The time a heating system takes to respond after the room thermostat is turned up',
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
      'A meter that automatically disconnects the supply whenever an energy bill is left unpaid',
      'A meter that records only peak demand so the supplier can apply maximum demand charges',
      'A handheld device the meter reader carries to take manual readings at the property',
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
      'They guarantee a single fixed unit rate for the whole contract, day and night alike',
      'Lower rates during off-peak periods encourage load shifting to reduce peak demand',
      'They remove the daily standing charge from the electricity bill for the whole contract',
      'They cap the total amount a household can be charged for energy in any billing month',
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
      'The ratio of the supply voltage to the current drawn, measured in a purely resistive circuit',
      'The multiplier used to convert a motor rating from kilowatts into brake horsepower, for nameplate purposes',
      'The ratio of real power to apparent power, indicating how efficiently power is used',
      'The factor by which the supply voltage must be derated over long cable runs, such as in trunking',
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
      'Purely resistive loads such as immersion heaters and incandescent lamps',
      'A supply voltage sitting slightly above the nominal 230 V at the origin',
      'Long cable runs that increase the resistance of the final circuit',
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
    question: 'Which rating scale appears on the energy label fitted to a household appliance?',
    options: [
      '1 to 10 (with 10 being most efficient)',
      'A to G (with A being most efficient)',
      'Bronze to Platinum (with Platinum best)',
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
      'Dimming the lighting automatically in response to the daylight available in a room',
      'Adjusting the colour temperature of the lighting gradually through the working day',
      'Counting how many people enter and leave a building for fire evacuation purposes',
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
      'Switching the lighting on automatically whenever a room becomes occupied',
      'Using mirrors and light pipes to channel sunlight deep into the centre of a building',
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
      'A mechanical gearbox that changes the output speed of a motor by selecting different gears',
      'An electronic device that controls motor speed by varying the frequency of power supply',
      'A soft starter that limits the inrush current but then runs the motor at one fixed speed only',
      'A device that controls the speed of a motor by varying the supply voltage on its own',
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
      'They eliminate the reactive power (kVAr) drawn in the motor windings',
      'Power consumption varies with the cube of speed (Affinity Laws)',
      'They recover braking energy (regeneration) into the supply',
    ],
    correctAnswer: 2,
    explanation:
      'The Affinity Laws show that power consumption varies with the cube of speed. Reducing fan/pump speed by 20% can reduce power consumption by about 50%.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 47,
    question: 'What is a heat recovery ventilation system?',
    options: [
      'A system that recovers waste heat from the boiler flue gases to preheat stored hot water',
      'A natural ventilation system relying only on opening windows and background trickle vents',
      'A heat pump that recovers heat from a buried ground loop to warm the whole building fabric',
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
      '100-110%',
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
      'It condenses the incoming mains cold water before heating it, so less energy is needed to raise it to temperature',
      'It runs at a higher flow temperature of around 80°C so that the home reaches the set point more quickly',
      'It has a secondary heat exchanger that recovers latent heat by condensing water vapour from flue gases',
      'It uses an electric immersion element fitted in the flow to top up the gas burner output at peak demand',
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
      'Exactly 70°C (the standard radiator design flow temperature)',
      'Below about 35°C (matching underfloor heating flow temperatures)',
      'Below about 55°C (return temperature below dew point ~54°C)',
    ],
    correctAnswer: 3,
    explanation:
      'For efficient condensing, return water temperature should be below the dew point (about 54°C for natural gas), often achieved with flow temperatures below 55°C.',
    section: '2.2',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
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
      'A sudden voltage spike that occurs at the moment an appliance is switched on',
      'Electricity consumed by devices when switched off but still plugged in',
      'Power lost as heat in the cables running between the meter and the appliance',
      'Reactive power drawn by motors that does no useful work in the load',
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
      'Providing a standby backup meter at the origin, ready in case the supplier\'s meter fails in service',
      'Measuring the voltage quality, harmonic content and flicker of the incoming supply',
      'Recording the electricity exported from a renewable generator, so the supplier can pay for it',
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
      'They mean the same thing (both in kW); the units used are interchangeable',
      'Energy is measured in amp-hours (Ah); power is measured in volts (V)',
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
      'Balancing the connected load evenly across all three phases so that the neutral current is minimised',
      'Ramping the load up gradually at start-up so that inrush current does not trip the main breaker',
      'Deliberately reducing electrical load by switching off non-essential equipment during peak demand',
      'Transferring the whole installation onto a standby generator whenever the incoming mains supply fails',
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
      'Charging the customer the highest available unit rate, applied right through the evening peak',
      'A penalty charged whenever total annual consumption exceeds the agreed limit, set out in the supply contract',
      'Charging based only on the total number of kWh recorded, summed over the whole billing period',
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
      'About 1000g CO2/kWh (much the same as coal)',
      'Effectively 0g CO2/kWh (fully renewable)',
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
      '70-80% for standard panels, rising to 90% for premium',
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
      'A solar system that operates entirely off-grid, storing everything it makes in batteries',
      'A solar system that supplies DC directly to appliances, with no inverter fitted',
      'A solar system limited to charging a single electric vehicle, with no connection to the house circuits',
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
      'Convert AC grid electricity back into DC so the panels can charge at night',
      'Step the panel voltage up to the grid distribution voltage before export',
      'Track the sun across the sky by tilting and rotating the panel array',
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
      'Maximum Permitted Panel Temperature - the thermal limit set for the modules',
      'Maximum Power Point Tracking - optimising power extraction from panels',
      'Multi-Phase Power Transfer - balancing the output evenly across three phases',
      'Mains Protection and Power Trip - the anti-islanding device fitted at the board',
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
      'A warranty from the manufacturer covering inverter performance for a full 25 years',
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
      'A fan heater that simply blows electrically warmed air around a single room',
      'A heat pump that extracts heat from the ground through buried collector pipes',
      'A boiler that heats air rather than water for distribution round a house',
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
      'A heat pump that extracts heat from the outside air through a fan-driven unit',
      'A heat pump extracting heat from the ground via buried pipes or boreholes',
      'A heat pump that draws its heat from the waste water leaving the building drains',
      'A ground-mounted solar array that powers a conventional electric panel heater',
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
      'Underfloor heating allows the heat pump to run only at night, on cheap off-peak power',
      'Underfloor heating operates at lower temperatures, improving heat pump efficiency',
      'Underfloor heating removes the need for any insulation in the floors, walls or roof',
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
      'Sealed lead-acid (SLA)',
      'Lithium-ion (Li-ion)',
      'Nickel-cadmium (NiCd)',
      'Zinc-carbon primary (ZnC)',
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
      'A large utility-scale turbine (rated above 1MW) feeding into the transmission grid',
      'A turbine driven by flowing water (micro-hydro) in a small watercourse rather than wind',
      'A handheld anemometer (wind gauge) used to measure site wind speed before installation',
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
      'Only the colour of the turbine blades and the mast height, site conditions being irrelevant',
      'Only the rated power of the turbine, regardless of the site',
      'Solely the number of daylight hours at the site, as with a solar array',
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
      'Heating using natural gas extracted from decomposing landfill waste, piped to the boiler',
      'Heating water using metabolic heat from livestock, recovered inside the barn',
      'Heating using organic materials like wood pellets, chips, or logs',
      'Heating using methane captured at a sewage works, piped directly to the dwelling',
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
    question: 'Which scheme replaced the Renewable Heat Incentive for domestic heat pump installations?',
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
    difficulty: 'basic',
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
      'Mono generates DC; poly generates AC directly without needing an inverter',
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
      'When one shaded module drags down the output of every other module in the same string',
      'When a large array is split into several independent strings each with its own inverter',
      'When panels are mounted on a standalone frame electrically isolated from the roof structure',
      'When a solar system continues to power a circuit that has been disconnected from the grid',
    ],
    correctAnswer: 3,
    explanation:
      'Islanding occurs when a PV system energises a circuit disconnected from the grid - dangerous for utility workers. Anti-islanding protection is mandatory.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
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
      'Mains Compliance Standard - a mandatory wiring test applied to all grid-connected generation',
      'Microgeneration Certification Scheme - required for installer competence and grant eligibility',
      'Manufacturer\'s Conformity Statement - the product warranty document supplied with an inverter',
      'Metered Consumption Scheme - the export tariff paid to small generators for exported energy',
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
      'A pressurised gas cylinder holding the heat pump refrigerant charge, mounted beside the compressor',
      'A larger, well-insulated cylinder designed for lower-temperature heat pump operation',
      'A header tank that maintains pressure in the heat pump\'s sealed circuit, sited above the unit',
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
    question: 'What is meant by the bivalent point of a heat pump system?',
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
    difficulty: 'basic',
  },
  {
    id: 93,
    question: 'What regulations govern EV charger installation in dwellings?',
    options: [
      'Part F (ventilation), Part G (sanitation), and the Gas Safety Regulations',
      'Part P (electrical safety), Part S (EV infrastructure), and relevant equipment standards',
      'Only the manufacturer\'s installation instructions (no statutory regulation applies), whatever the building type',
      'Part B (fire safety), Part M (access), and the Construction (Design and Management) Regulations',
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
      'Charging at the highest rate the vehicle will accept, regardless of tariff or grid conditions',
      'Charging that automatically stops at 80% state of charge, whatever the tariff or grid conditions',
      'Intelligent charging that optimises timing based on tariffs, grid demand, or renewable availability',
      'Charging by inductive coupling through a floor pad, with no physical cable to the vehicle',
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
      'Charging the batteries only during peak periods so they reach maximum capacity',
      'Trimming the peak voltage of the incoming supply to protect sensitive equipment',
      'Limiting the battery state of charge to 80% so that its service life is extended',
      'Using batteries to reduce maximum demand by discharging during peak consumption periods',
    ],
    correctAnswer: 3,
    explanation:
      'Peak shaving uses battery storage to reduce maximum demand charges by discharging batteries during peak consumption periods instead of drawing from the grid.',
    section: '2.3',
    topic: 'Renewable Technologies',
    difficulty: 'basic',
  },

  // ============================================
  // Section 2.4: Smart Building Systems (Questions 96-125)
  // ============================================
  {
    id: 96,
    question: 'What is building automation?',
    options: [
      'Automatic control of building services like HVAC, lighting, and security',
      'The use of robots, rather than trades, to carry out the physical construction of a building',
      'Pre-fabricating building components off-site, for rapid assembly once delivered',
      'Automatically generating the building\'s structural design, working from the client\'s brief',
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
      'It removes the need for any control wiring, power and data sharing the same core',
      'It allows all the lights to be switched together, but never individually',
      'It doubles the light output of each luminaire, without increasing circuit power',
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
      'A mechanical bimetallic-strip thermostat, adjusted by a manual dial only',
      'A wall sensor that measures humidity, rather than temperature',
      'A programmable thermostat with WiFi, learning capability, and remote control',
      'A frost thermostat that switches the heating on below freezing, and at no other time',
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
      'Dividing a dwelling into separate heating zones each with its own programmable room stat',
      'Setting an upper limit on the temperature occupants are able to turn the thermostat up to',
      'Erecting a protective enclosure around an outdoor heat pump unit to reduce noise nuisance',
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
    difficulty: 'basic',
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
      'From 1W (PoE) to 5W (PoE+/PoE++)',
      'From 15W (PoE) to 90W+ (PoE++/802.3bt)',
      'From 100W (PoE) to 500W (PoE++/802.3bt)',
      'A fixed 12W (PoE/PoE+) per standard',
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
      'It removes the need for any structured data cabling, the luminaires running wirelessly',
      'It allows luminaires to run at full mains voltage, giving a higher light output',
      'It eliminates the need for lighting control software, so no commissioning is required',
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
      'A live camera view of a room used to monitor the lighting for faults',
      'The maximum number of luminaires that a single controller can address',
      'A diagram showing how all the lighting circuits in a room are wired',
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
      'Lighting mounted at a standard working-plane height to suit the average occupant\'s eye level',
      'Lighting designed to support human health and circadian rhythm through colour and intensity changes',
      'Lighting switched automatically by presence detection so it is only on when people are present',
      'Lighting selected purely for the highest luminous efficacy in lumens per circuit-watt',
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
      'White lighting whose output dims but whose colour temperature stays fixed',
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
      'A manually-read dial gauge that a maintenance engineer records during periodic inspections',
      'A local standalone detector that sounds an alarm on site but transmits no data off the site',
      'The central server that stores and archives all building management system records',
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
      'Measuring only the indoor air temperature, comparing it against the thermostat set point',
      'Checking the airtightness of the building fabric, using a blower door pressure test',
      'Recording the volume of fresh air delivered each hour, as measured at the ventilation fans',
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
    question: 'At approximately what carbon dioxide concentration, in ppm, does demand-controlled ventilation increase the ventilation rate?',
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
      'Ventilation that runs continuously at a fixed maximum rate whatever the occupancy',
      'Ventilation provided solely by opening windows when occupants feel stuffy',
      'Automatic ventilation adjustment based on occupancy or air quality sensors',
      'Ventilation switched on manually by occupants using a local wall switch',
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
      'A static 3D CAD model produced at design stage and never updated after handover',
      'A scanned archive of the paper drawings for a building, stored as PDFs for record purposes',
      'A second identical building constructed nearby to provide standby accommodation for staff',
      'A virtual replica of a building integrating real-time data for monitoring and simulation',
    ],
    correctAnswer: 3,
    explanation:
      'A digital twin is a virtual model of a building that integrates real-time sensor data, enabling monitoring, analysis, simulation, and optimisation of building performance.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
  },
  {
    id: 120,
    question: 'What is BIM in building design?',
    options: [
      'Building Information Modelling - digital representation with data about building elements',
      'Building Inspection Method - the procedure Building Control follows before granting sign-off',
      'Basic Insulation Material - the standard fabric specified for insulating all new-build homes',
      'Building Integrity Monitor - a sensor system detecting structural movement in a steel frame',
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
      'The smart meter itself, mounted inside the consumer unit by the main switch',
      'A device showing real-time energy usage and costs from the smart meter',
      'A wall thermostat displaying the indoor temperature and set point',
      'A control panel for switching the individual appliances on and off',
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
      'Sharing the charging load equally across the three phases of the supply cable',
      'Alternating charging between the vehicle and the home battery on a fixed daily timer',
      'Distributing available power across multiple charge points to prevent overload',
      'Limiting all charging to overnight hours so that national grid demand is balanced',
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
      'A control panel for manually switching the building services plant on and off',
      'A meter that records the total energy used by a single final circuit only',
      'A printed annual report summarising the energy bills paid for a building each year',
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
      'Carrying out maintenance only after a piece of equipment has already broken down',
      'Servicing every item of equipment on a fixed calendar schedule regardless of its condition',
      'Replacing every item of equipment automatically at the end of its warranty period',
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
      'A handheld test instrument used to trace short circuits and open circuits in fixed cabling',
      'Automated systems that identify operational faults and their likely causes in building systems',
      'A maintenance logbook in which building occupants record faults for the facilities team to action',
      'A residual current device that automatically disconnects the supply when an earth fault develops',
    ],
    correctAnswer: 1,
    explanation:
      'FDD systems automatically analyse building data to detect operational faults, inefficiencies, and their probable causes, enabling faster resolution.',
    section: '2.4',
    topic: 'Smart Building Systems',
    difficulty: 'basic',
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
      'Whenever a building undergoes a change of use class, even if it is never sold',
      'Once every ten years, regardless of occupancy or sale',
      'When a building is first connected to the grid supply, and never again after that',
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
      'If the property is owned by a registered charity (CIO or trust), is statutorily listed, or was acquired by the landlord in the last five years',
      'If the property was built before 1990 (pre-Part L1), is let on a tenancy longer than ten years, or is heated entirely by electricity',
      'If the tenant refuses access, the EPC is more than ten years old (expired), or the landlord lets fewer than five properties',
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
      'Automatic forfeiture of the property, transferred to the local housing authority',
      'A criminal record, plus a mandatory custodial sentence for the landlord',
      'A permanent ban from owning or letting residential property, with no right of appeal',
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
      'A certificate confirming that the electrical installation of a building is safe',
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
      'An EPC applies to public/civic buildings only; a DEC to privately owned homes',
      'A DEC is based on calculated/design performance; an EPC shows actual measured energy use',
      'EPC is based on calculated/design performance; DEC shows actual measured energy use',
      'An EPC remains valid for one year; a DEC/advisory report for a full ten years',
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
      'A voluntary energy audit available to any private household on request',
      'An annual electrical safety inspection of large commercial premises',
      'A one-off audit required when a building is first brought into use',
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
      'A voluntary scheme allowing individual households to report their energy use',
      'A simplified method of calculating the EPC rating for a building',
      'A government grant scheme funding carbon reduction work in industry',
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
      'A report confirming that the refrigerant charge has been topped up, and the system leak tested',
      'A mandatory inspection for AC systems over 12kW, assessing efficiency and sizing',
      'A daily maintenance log, kept on site by the building\'s facilities team',
      'A certificate confirming the outdoor AC unit meets the noise emission limits, issued by the manufacturer',
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
      'Fire safety and escape routes',
      'Structural stability of foundations',
      'Ventilation requirements',
      'Storage of solid fuel and oil',
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
      'A method for calculating the embodied carbon of a building at design stage',
      'A testing standard for the airtightness of ventilation ductwork systems',
      'A framework for assessing the risk of overheating in new dwellings',
      'CIBSE guidance for predicting actual operational energy use in buildings',
    ],
    correctAnswer: 3,
    explanation:
      "CIBSE TM54 provides methodology for predicting operational energy use in buildings, addressing the 'performance gap' between design and actual performance.",
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 140,
    question: "What is the 'performance gap' in buildings?",
    options: [
      'The difference between designed/predicted and actual operational energy performance',
      'The gap between a building\'s EPC/SAP rating and the asking price achieved on the open market',
      'The shortfall between on-site renewable generation and the building\'s annual heat/power demand',
      'The difference in air temperature between adjacent heating/cooling zones served by one boiler',
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
      'A building that draws no electricity at all from the grid, relying only on on-site generation',
      'A building that produces zero net carbon emissions over a year through efficiency and renewables',
      'A building constructed entirely from materials with no carbon emitted anywhere in their manufacture',
      'A building whose emissions are zero during construction, with the operational phase excluded entirely',
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
      'The carbon emitted by the heating, hot water and lighting of the building right through its occupied life',
      'The carbon permanently locked into the timber, straw and other bio-based elements of the superstructure',
      'The carbon emissions from materials, construction, and eventual demolition - the building\'s lifecycle',
      'The carbon emitted by occupants and visitors, as they travel to and from the completed building each day',
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
      'A rating system for the embodied carbon of construction materials used in a building',
      'A design-stage methodology for predicting the energy use of a new building',
      'A certification scheme for renewable energy installers and their products',
      'A rating system for actual operational energy performance of commercial buildings',
    ],
    correctAnswer: 3,
    explanation:
      'NABERS UK rates commercial buildings based on actual operational energy use, providing a star rating from 1-6 stars for transparency about real performance.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'basic',
  },
  {
    id: 144,
    question: 'What is BREEAM?',
    options: [
      'Building Research Establishment Environmental Assessment Method - a sustainability rating',
      'British Renewable Energy and Emissions Assessment Model - a whole-building carbon calculator',
      'Building Regulations Energy Efficiency Assessment Method - a Building Control compliance check',
      'British Register of Environmental and Energy Assessors - a professional trade register',
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
      'A to G bands, with band A being the most efficient',
      'Pass, Good, Very Good, Excellent, Outstanding',
      'Bronze, Silver, Gold, Platinum and Diamond awards',
      'One, two, three, four or five stars, five being best',
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
      'Low Emission Energy Directive - a European rule limiting the emissions from new buildings',
      'Lighting Energy Efficiency Database - a register of high-efficiency luminaires',
      'Leadership in Energy and Environmental Design - an international green building rating',
      'Local Environmental and Energy Declaration - a document required for planning consent',
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
      'No kWh/m² cap',
    ],
    correctAnswer: 0,
    explanation:
      'Passivhaus certification requires maximum heating/cooling demand of 15 kWh/m²/year, achieved through exceptional building fabric and heat recovery ventilation.',
    section: '2.5',
    topic: 'EPCs and Compliance',
    difficulty: 'intermediate',
  },
  {
    id: 149,
    question: 'What is the Green Building Council?',
    options: [
      'A government department responsible for enforcing the Building Regulations',
      'An industry body promoting sustainable building practices and policy',
      'A local authority committee approving planning applications for new housing',
      'A certification scheme that awards EPC ratings to all buildings',
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
      'Ventilation requirements in new and existing buildings',
      'Drainage and waste water disposal in domestic dwellings',
      'Overheating mitigation in new residential buildings',
      'Electrical safety in domestic and similar installations',
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
      'An economic model in which construction firms trade only within their own region, never outside it',
      'A building layout designed around a large central atrium, circular in plan',
      'A funding model where profits, rather than being distributed, are reinvested in the same project',
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
      'The physical land area taken up by a carbon capture and storage facility, including its plant',
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'The amount of carbon permanently stored in the materials, once a building has been constructed',
      'The annual carbon tax payable to government, charged on a large organisation\'s emissions',
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
      'Evaluating only the environmental impact that arises while the product is actually in daily service',
      'Scheduling every planned maintenance task required across the entire design life of a product',
      'Evaluating environmental impacts throughout a product\'s life from raw materials to disposal',
      'Estimating the number of years for which a product will go on functioning before it must be replaced',
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
    question: 'What are Scope 1, 2 and 3 emissions?',
    options: [
      'Emissions from burning gas (1), from purchased electricity (2), and from mains water use (3)',
      'Three increasing severity bands (1, 2 and 3) applied to an organisation\'s carbon penalty',
      'Emissions measured at low (1), medium (2), and high (3) levels of data confidence',
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
      'Subtracting on-site renewable generation from the electricity bill of a business',
      'Capturing CO2 from a flue gas stream and storing it permanently deep underground',
      'Delaying any emissions reductions until a future target date is reached',
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
      'A research funding target set by central government for climate science departments',
      'An emissions reduction target aligned with climate science to limit global warming',
      'A target number of renewable installations that a contractor must complete each year',
      'A legally enforceable emissions cap set for an organisation by the Climate Change Committee',
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
      'Negotiating international climate change treaties on behalf of the UK government',
      'Distributing government grants for renewable heat and power projects',
      'Independent body advising UK government on emissions targets and progress',
      'Enforcing carbon penalties on companies that exceed their annual limits',
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
      'Cleaning the surface of solar panels regularly to maintain their generation efficiency',
      'Planting vegetation across the roof of a building to improve its thermal insulation',
      'Reusing grey water from sinks and showers to flush the toilets in a building',
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
      'A set of UK Building Regulations covering sustainable materials, methods, and site waste',
      'Carbon reduction targets applying only to developing countries, outside the European Union',
      'A voluntary checklist of green features, used on new UK housing developments',
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
      'A European standard setting out the energy rating method used for new buildings',
      'An international treaty on climate change limiting global warming to 1.5-2°C',
      'A UK law committing the whole nation to reaching net zero carbon by 2050',
      'A trade agreement governing the import of renewable energy equipment',
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
      'Energy, Sustainability and Generation - a certification scheme for renewable energy installers',
      'Emissions Scope Grouping - the method used to classify Scope 1, 2 and 3 carbon sources',
      'Environmental, Social, and Governance - criteria for assessing corporate sustainability',
      'Efficiency Standards and Guidance - the rules governing the design, output and rating of building services',
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
      'A lease that can only be granted on buildings rated EPC band A or better',
      'A short-term lease offered at a discount rate to encourage early occupancy',
      'A lease that transfers all of the energy costs of a building to the landlord',
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
      'Adding an electric immersion heater as backup to an existing gas boiler',
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
      'It lowers the standing charge element of bills, making electric heating cheaper than gas',
      'As grid electricity becomes cleaner, electric heating produces fewer emissions than gas',
      'It allows buildings with on-site renewables to disconnect altogether, needing no import at all',
      'It raises the carbon intensity of gas, so that gas boilers are gradually priced out',
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
      'Using a hydrogen fuel cell (PEM type) on site to generate the electricity that runs a heat pump',
      'Heating stored water (electrode boiler) by passing an electric current directly through the tank',
      'Using hydrogen gas (potentially blended with natural gas or 100%) for building heating',
      'Recovering the waste heat given off when hydrogen is manufactured industrially (by electrolysis)',
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
      'A single large boiler plant serving only the various heating zones within one large building',
      'An individual air source heat pump installed in every separate dwelling on a housing estate',
      'Underfloor heating pipework distributed through every room of a single-family dwelling house',
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
      'A network of wirelessly linked thermostats and TRVs controlling the heating in one dwelling',
      'The flow and return pipework connecting a heat pump to its individual radiators',
      'A data network monitoring and logging temperatures across every room in a building',
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
      'The updated set of Building Regulations governing all new construction from 2025 onwards',
      'Off-site manufacturing and innovative construction techniques reducing waste and time',
      'A digital modelling standard used to coordinate building services during the design stage',
      'The use of low-carbon cement replacements in traditional on-site concrete pours',
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
      'Designing energy efficiency into a new building at concept stage, before construction begins',
      'Returning a listed building to its original condition, including its external appearance',
      'Upgrading existing buildings with improved insulation, heating, and technologies',
      'Demolishing an old building, then rebuilding it entirely to modern efficiency standards',
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
      'The target date by which all privately rented homes must reach EPC band C',
      'The standard governing airtightness pressure testing of newly built dwellings',
      'The standard setting minimum seasonal efficiency for replacement domestic boilers',
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
      'Energy Conservation Order - a legal duty placed on landlords to insulate rented homes',
      'Energy Company Obligation - requiring energy suppliers to fund energy efficiency improvements',
      'Environmental Compliance Obligation - annual carbon reporting duty for large businesses',
      'Efficient Construction Objective - the emissions target set for new-build developments',
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
      'Charging an EV directly from a home solar array, with no grid import at all',
      'Using the home supply to preheat the EV cabin, ready for a journey',
      'Routing an EV charger through the home consumer unit, rather than a separate enclosure',
    ],
    correctAnswer: 0,
    explanation:
      'V2H allows electric vehicles to discharge power to supply a home, using the EV battery as energy storage for backup power or time-of-use optimisation.',
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
      'Batteries fixed permanently in place, rather than being removable',
      'Batteries using solid electrolyte instead of liquid, offering higher energy density and safety',
      'Batteries made from a single solid block of lithium metal, with no separator',
    ],
    correctAnswer: 2,
    explanation:
      'Solid-state batteries replace liquid electrolyte with solid material, potentially offering higher energy density, faster charging, longer life, and improved safety.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'basic',
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
      'Holding purchased carbon credits in a registry so they can be traded at a later date',
      'Capturing waste heat from industrial processes and storing it for later reuse on site',
      'Capturing CO2 emissions and storing them underground to prevent atmospheric release',
      'Absorbing atmospheric CO2 by planting new woodland on degraded agricultural land',
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
    difficulty: 'basic',
  },
  {
    id: 184,
    question: 'What is building-integrated photovoltaics (BIPV)?',
    options: [
      'Solar cells integrated into building materials like roof tiles, facades, or windows',
      'Standard PV panels mounted on a frame, sitting above a flat roof',
      'A control system linking PV output to the building management system, for monitoring',
      'Ground-mounted solar arrays, sited next to the building they serve',
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
      'A distribution network in which every property, across the whole region, has been fitted with a smart meter',
      'An electricity network using digital technology to optimise generation, distribution, and consumption',
      'A localised microgrid powered entirely by on-site renewables, islanded from the national grid',
      'A network laid out at higher transmission voltages, specifically to reduce distribution losses',
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
      'Storing energy as water compressed under pressure, held inside a sealed accumulator vessel',
      'Generating electricity from the twice-daily tidal flow, through a barrage across an estuary',
      'Storing surplus heat in a large insulated water cylinder, for release later in the day',
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
    difficulty: 'basic',
  },
  {
    id: 189,
    question: 'What is peer-to-peer energy trading?',
    options: [
      'Wholesale trading of generation capacity between two large licensed generators',
      'Direct energy trading between producers and consumers without traditional utilities',
      'Switching supplier through a comparison service to secure the best available tariff',
      'Selling surplus exported electricity back to a licensed supplier under the SEG',
    ],
    correctAnswer: 1,
    explanation:
      'Peer-to-peer energy trading allows prosumers (producer-consumers) to sell excess energy directly to neighbours or other consumers, often enabled by blockchain.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'basic',
  },
  {
    id: 190,
    question: 'What is blockchain in energy applications?',
    options: [
      'A protective device that physically blocks power flowing back into the grid, fitted at the origin',
      'A method of grouping final circuits into blocks, each block having its own protective device',
      'Distributed ledger technology enabling transparent, secure energy transactions and trading',
      'A scheduling system that blocks EV charging at peak times, releasing it again overnight',
    ],
    correctAnswer: 2,
    explanation:
      'Blockchain in energy enables transparent, secure recording of energy transactions, supporting peer-to-peer trading, renewable certificates, and grid management.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'basic',
  },
  {
    id: 191,
    question: 'What is artificial intelligence (AI) in building management?',
    options: [
      'A rule-based time clock that switches building services on and off to a fixed schedule, set at commissioning',
      'A remote human operator monitoring the building through cameras, alarms, and panel outputs',
      'A standardised open protocol, such as BACnet, for connecting building automation devices',
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
      'A material whose colour/tint changes with temperature (thermochromic), showing surface heat',
      'A material inserted in an AC circuit to shift the voltage/current phase angle (power factor), improving efficiency',
      'A material that absorbs/releases heat when changing state (solid/liquid), storing thermal energy',
      'A material that converts a hot/cold junction difference directly into electricity (the thermoelectric, or Seebeck, effect)',
    ],
    correctAnswer: 2,
    explanation:
      'PCMs store and release thermal energy during phase transitions (typically solid-liquid), used for temperature regulation and thermal storage in buildings.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'basic',
  },
  {
    id: 195,
    question: 'What is dynamic glazing?',
    options: [
      'Glazing with thin-film/crystalline cells laminated between the panes to generate electricity',
      'Glazing opened and closed automatically by a motorised actuator linked to a BMS/BEMS',
      'Toughened/laminated glazing specified to withstand high wind loading and impact in critical areas',
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
      'Glass that generates a small photovoltaic voltage when sunlight strikes it, powering the building',
      'Glass with a low-emissivity coating, which reflects essentially all incoming infrared heat',
      'Glass that darkens passively in response to temperature alone, with no electrical control',
    ],
    correctAnswer: 0,
    explanation:
      'Electrochromic glass can be electrically switched between transparent and tinted states, enabling dynamic control of daylight, glare, and solar heat gain.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'basic',
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
      'Apportioning a single energy bill fairly between the separate tenants of a shared building',
      'Separating on-site renewable generation from imported units at the meter for SEG payment',
      'Fitting a separate sub-meter to every individual final circuit in the distribution board',
      'Using AI to identify individual appliance consumption from whole-building smart meter data',
    ],
    correctAnswer: 3,
    explanation:
      'Energy disaggregation (NILM) uses machine learning to analyse total electricity consumption and identify individual appliance usage without sub-metering.',
    section: '2.7',
    topic: 'Future Technologies',
    difficulty: 'basic',
  },
  {
    id: 200,
    question: 'What are digital twins being used for in buildings?',
    options: [
      'Real-time monitoring, simulation, optimisation, and predictive maintenance',
      'Producing the marketing brochures, renders and floor plans used to sell a building',
      'Replacing the need for any physical sensors, the model generating the data itself',
      'Storing a one-off snapshot of the building at handover, never updated afterwards',
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
    question: 'Under BS 7671 Section 712, what determines the maximum voltage a PV string may reach in service?',
    options: [
      '1500 V DC',
      '1000 V DC',
      '600 V DC',
      '230 V DC',
    ],
    correctAnswer: 1,
    explanation:
      'For domestic PV the d.c. system is kept within the low voltage band, conventionally up to 1000 V d.c. Higher string voltages, up to 1500 V d.c., are used on larger commercial and utility arrays with additional protective measures. Note that 120 V d.c. is the upper limit of Band I for SELV and PELV under Regulation 414.11(c) — it is not a Section 712 cap on voltage to earth, and the two are easily confused.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 202,
    question: 'Under BS 7671 Reg 712.411.3.2.1.2, where the inverter does not provide simple separation, what additional protective measure is required?',
    options: [
      'A Type AC 30 mA RCD on the AC side, which Section 712 accepts as sufficient for any inverter',
      'An additional DC isolator on the AC side of the inverter, adjacent to the consumer unit',
      'A transformer providing simple separation between the AC and DC sides, OR an RCD type B on the AC side',
      'A protective conductor of double the normal size, run with the DC string cabling to the array',
    ],
    correctAnswer: 2,
    explanation:
      'Section 712 requires that PV inverters either provide simple separation themselves or have a transformer or Type B RCD on the AC side, because non-isolated (transformerless) inverters can produce smooth DC fault current that defeats Type AC and A RCDs.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 203,
    question: 'Under BS 7671 Section 722 (EV charging), what does Reg 722.411.4 require for a PEN-conductor fault detection on a TN-C-S supply?',
    options: [
      'A Type AC 30 mA RCD at the origin of the final circuit, which Section 722 accepts because an open PEN produces a residual current large enough to operate it',
      'A second PEN conductor run in parallel with the first so the fault current is halved, together with continuity testing of both conductors at every periodic inspection',
      'A surge protection device adjacent to the charge point, which clamps the voltage appearing on exposed-conductive-parts if the supply PEN conductor becomes open-circuit',
      'Either an earth electrode of suitable resistance, or a device that disconnects the EVCP from the supply within 5 s of detecting a PEN open-circuit fault, or O-PEN protection',
    ],
    correctAnswer: 3,
    explanation:
      'Section 722 addresses the risk of an open PEN making the vehicle\'s exposed-conductive-parts live. Reg 722.411.4 requires an earth electrode, a 5-second disconnection device, or integrated O-PEN protection (as offered by most modern EVCPs).',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 204,
    question: 'Under BS 7671 Reg 722.531.3.101, what RCD type is required for an EV charging point unless the equipment provides equivalent protection?',
    options: [
      'Type B (or Type A combined with appropriate residual DC monitoring)',
      'Type AC (permitted for any load by Reg 531.3.3), always adequate for an EV point',
      'Type S (time-delayed) at the origin of the installation',
      'Type F (to BS EN 62423), protecting against composite residual currents',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 722.531.3.101 requires Type B RCD protection for EV charging because EV inverters can produce smooth DC residual currents that blind Type A and AC RCDs. A Type A RCD with separate DC residual monitoring (≥ 6 mA) in the EVSE is the common alternative.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
  },
  {
    id: 206,
    question: 'For a TN-C-S (PNB) supply supplying a heat pump with an outdoor unit, what specific concern must your design address per BS 7671?',
    options: [
      'Excessive volt drop on the long buried run to the outdoor unit — BS 7671 caps volt drop at 3% for a power circuit (Reg 525.202), so the cable must be uprated and the route kept under 25 metres',
      'Harmonic distortion (triplen harmonics) from the inverter-driven compressor overheating the neutral — BS 7671 requires the neutral to be uprated to twice the line conductor csa on any heat pump circuit, whatever the measured harmonic content',
      'PEN-conductor open-circuit risk to outdoor metalwork — apply Section 722-style measures: earth electrode, residual current detection, or use of a dedicated supplier-issued separate earth (TT outdoor)',
      'Condensate and defrost water corroding the earth electrode connection (rod or plate) — BS 7671 requires the electrode to be positioned at least 3 metres from any condensate discharge point, and to be re-tested annually',
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
    question: 'Compared with an a.c. circuit, what additional factor does BS 7671 require when sizing PV d.c. string cables?',
    options: [
      '80% of the module short-circuit current Isc at STC, since DC string cables run cooler than AC cables and the inverter limits current under fault conditions',
      'Exactly the rated AC output current of the inverter, since the DC string current can never exceed what the inverter is able to accept at its input terminals',
      'Only the array open-circuit voltage Voc at STC, with the current rating left entirely to the inverter and its internal string fusing arrangements',
      '125% of the module short-circuit current Isc at STC, plus voltage drop over potentially long DC runs, with cable type rated for outdoor UV exposure',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 712.433.101.1 requires Isc_max to be taken as at least 1.25 × Isc_stc where there is no information on the expected minimum site temperature or the module temperature coefficient — irradiance and low temperature can both push a string above its rated short-circuit current. The cable must also be sized for volt drop over what are often long d.c. runs, and be UV-stable and outdoor rated. Note the 1.25 figure appears twice in Section 712: here, and again where overload protection may be omitted if the cable capacity is at least 1.25 times Isc.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 208,
    question: 'For a stationary battery energy storage installation, what disconnection means must be provided?',
    options: [
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      'A single AC isolator at the consumer unit only, since the battery operates at extra-low voltage and therefore needs no separate DC isolation at the battery',
      'A lockable cover over the battery terminals plus a warning notice, with no separate isolator needed because the inverter shuts down on loss of the AC supply',
      'A 30 mA RCD on the DC side, which provides both fault protection and the required means of disconnection without any additional isolating switch being fitted',
    ],
    correctAnswer: 0,
    explanation:
      'Battery installations require a DC isolator at the battery, an AC isolator at the inverter and an accessible emergency means of disconnection. BS 7671 reinforces clear labelling and locations so first responders and electricians can isolate quickly and safely.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 209,
    question: 'Under BS 7671, what is the position on arc fault detection devices for PV and battery circuits?',
    options: [
      'Prohibited on PV/battery circuits because inverter switching noise causes persistent nuisance tripping of the arc detection electronics',
      'Recommended for final circuits supplying or fed from PV/battery installations to mitigate arc-fault risk on long DC and AC runs',
      'Accepted as a full replacement for RCD/RCBO protection on PV and battery circuits, so a single AFDD may be fitted in place of an RCBO',
      'Required on the DC side of the inverter only, with the AC side covered by the existing consumer unit MCBs/RCBOs instead',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 strengthens AFDD use across higher-risk locations (HRRBs, care homes, HMOs) and recommends them on circuits associated with PV and battery storage where arc-fault risk on extended cabling exists. Designers should justify any decision not to fit AFDDs.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 210,
    question: 'Under BS 7671 Reg 712.411.4, what is the requirement around equipotential bonding of metallic PV mounting structures?',
    options: [
      'All metallic mounting frames must be main-bonded back to the MET regardless of equipment class, because a roof-mounted array is treated as an extraneous-conductive-part; the bonding conductor must be run separately from the DC string cabling',
      'Mounting frames must be bonded with a minimum 25 mm² copper conductor in every installation, matching the size required for main protective bonding to incoming gas and water services; the conductor terminates directly at the main earthing terminal',
      'Where metallic mounting frames are connected to exposed-conductive-parts of Class I PV equipment, they form part of that equipment\'s earthing arrangement; otherwise, fault-loop impedance and lightning protection requirements apply',
      'Mounting frames must never be deliberately earthed or bonded; an earthed frame creates a return path that defeats the anti-islanding protection built into a grid-tied inverter, and can energise the roof structure during a DC insulation fault',
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
      'Any electrician registered with a Part P competent person scheme may install domestic PV without further certification, since PV is treated as an ordinary final circuit',
      'Only the local DNO is permitted to install domestic solar PV, because the array connection is made on the supply side of the meter under its distribution licence',
      'No formal competence is required provided the system stays below the G98 threshold, as MCS applies only to systems large enough to need a G99 application',
      'The installation business must hold MCS PV certification, with at least one Suitably Qualified Person trained to MIS 3002 and the underpinning electrical qualifications',
    ],
    correctAnswer: 3,
    explanation:
      'MCS MIS 3002 sets installer requirements for PV. The business must be MCS-certified for PV, employ a Suitably Qualified Person with appropriate training (typically C&G 2399 PV plus underpinning electrical qualifications), and follow the MCS installation standards.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 212,
    question: 'Under MCS MIS 3005 (heat pumps), what design output calculation must installers follow?',
    options: [
      'A heat loss calculation to BS EN 12831 (or equivalent) for the property, sized to meet the design heat load at the design external temperature, with emitter sizing for low flow temperatures',
      'A rule-of-thumb allowance of 100 W per square metre (gross internal area) applied across the whole property regardless of fabric, with the existing emitters and pipework left at the sizes now fitted',
      'Sizing the heat pump to match the kW output rating (nameplate) of the boiler it replaces, on the basis that the existing boiler was correctly sized for that particular property when it was fitted',
      'Sizing from the SAP rating (RdSAP survey) printed on the property EPC, using the published annual energy demand divided by the number of annual heating hours for the local climate region',
    ],
    correctAnswer: 0,
    explanation:
      'MIS 3005 requires a property-specific heat loss calculation to BS EN 12831, sizing the heat pump for the design heat load at the design external temperature. Emitters (radiators, UFH) are sized for low flow temperatures (typically 35-45°C) to maintain SCOP.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 213,
    question: 'Under the F-Gas Regulations, which work on a heat pump refrigerant circuit may only be carried out by certified personnel?',
    options: [
      'Any qualified electrician may break into refrigerant pipework provided they wear the correct PPE and recover the charge into an approved cylinder — the Regulation controls only the disposal of recovered refrigerant, not the work itself',
      'Only F-Gas-certified personnel may install, maintain, decommission or do leak checks on equipment containing fluorinated greenhouse gas refrigerants — electricians without F-Gas certification can only do the electrical work',
      'Refrigerant work is unrestricted where the charge is below 5 tonnes CO₂e — the Regulation bites only above that threshold, at which point certification, leak checking and record keeping become mandatory for the operator',
      'Only the equipment manufacturer or its appointed agent may carry out any work on the refrigerant circuit — independent contractors are then limited to the electrical connections, and to the hydraulic pipework outside the sealed unit',
    ],
    correctAnswer: 1,
    explanation:
      'The F-Gas Regulation restricts work on systems containing fluorinated refrigerants to F-Gas-certified personnel and companies. Electricians can do the electrical interconnection but must NOT break into refrigerant pipework — that requires F-Gas certification and a registered company.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 214,
    question: 'Under ENA EREC G98, what is the maximum capacity for a single-phase generator (e.g. small PV) connected to the public network without prior approval?',
    options: [
      '32 A per phase (≈7.36 kW single-phase, ≈22 kW three-phase) — installer notifies the DNO before any work starts',
      '13 A per phase (≈3 kW single-phase, ≈9 kW three-phase) — installer must obtain written DNO approval in advance',
      '16 A per phase (≈3.68 kW single-phase, ≈11 kW three-phase) — installer notifies the DNO after commissioning',
      '63 A per phase (≈14.5 kW single-phase, ≈43 kW three-phase) — installer notifies the DNO only if the array is extended',
    ],
    correctAnswer: 2,
    explanation:
      'G98 covers "fit and inform" — small generators up to 16 A per phase (around 3.68 kW single-phase, 11 kW three-phase) using EREC G98-listed equipment can be installed and the DNO notified within 28 days. Above this, EREC G99 prior approval is required.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 215,
    question: 'Under ENA EREC G99, what process must be followed for connecting a generator above the G98 thresholds?',
    options: [
      'Install and commission the generator first, then notify the DNO within 28 days — the same connect-and-notify route that applies to G98 installations under 16 A per phase, with the commissioning records attached',
      'No application is needed at any stage; the generator may connect as soon as it has passed its commissioning tests — a valid G99 type-test certificate from the inverter manufacturer is all that is required',
      'Apply to Ofgem rather than the DNO — Ofgem then instructs the DNO to arrange the connection, and sets the loss-of-mains protection settings on the installer\'s behalf as part of generation licensing',
      'Submit a G99 application to the DNO BEFORE installation, providing system details and protection settings — DNO assesses network impact, may require modifications, and approval must be received before energisation',
    ],
    correctAnswer: 3,
    explanation:
      'G99 is "apply and connect" — for generators above G98 limits the installer must apply to the DNO before installation. The DNO assesses network impact, defines protection settings, and may require reinforcement. The installation must not energise until approval is received.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 216,
    question: 'For a heat pump system, what does SCOP express that COP alone does not?',
    options: [
      'COP = instant ratio of heat output to electrical input at a single test point; SCOP = seasonal average across realistic operating conditions in a defined climate — SCOP is what determines real-world running cost',
      'COP is the seasonal average measured across a whole heating season; SCOP is the single-point peak measured at the standard rating condition — the customer should focus on COP because it is the figure that reflects annual use',
      'COP measures performance in heating mode while SCOP measures performance in cooling mode; both matter equally to running cost — a reversible heat pump operates in each of these modes for part of the year',
      'COP and SCOP are the same figure expressed in different units — one a plain ratio, the other a percentage efficiency; the customer may compare units using whichever value the manufacturer publishes',
    ],
    correctAnswer: 0,
    explanation:
      'COP measures performance at a single point. SCOP (Seasonal COP) per EN 14825 averages performance across a heating season in a defined climate, and is the realistic indicator of running cost. A unit with high COP but low SCOP (e.g. due to defrost cycles) will disappoint.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 217,
    question: 'Under Building Regulations Part L 2021 (England), what is the maximum permitted flow temperature for new domestic heating systems to ensure they\'re heat-pump-ready?',
    options: [
      '80°C maximum design flow temperature for new wet space heating systems — matching traditional condensing boiler practice, and existing radiator sizes',
      '55°C maximum design flow temperature for new wet space heating systems — encouraging emitter sizing that suits low-temperature heat pumps',
      '35°C maximum design flow temperature for new wet space heating systems — in practice this leaves underfloor heating as the only compliant emitter',
      'No maximum is set; flow temperature is left to the installer — an ErP energy label of class A or better is all the appliance needs',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 caps the maximum design flow temperature for new domestic wet heating systems at 55°C, ensuring oversized emitters or UFH so the system works efficiently with a heat pump now or in future. Existing systems can keep higher temperatures.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 218,
    question: 'Under BS 7671 Section 712, what specific consideration applies to PV DC isolators after A4:2026 update?',
    options: [
      'A single AC isolator at the consumer unit is now sufficient, because A4:2026 accepts that modern inverters shut down the DC side automatically when the AC supply is removed',
      'The DC isolator may be an ordinary plug and socket-outlet rated for AC use, provided it is rated at not less than 1.25 times the array open-circuit voltage measured at STC',
      'A DC isolator must be provided at each PV array adjacent to the inverter, suitable for switching DC under load and clearly identified for rapid emergency disconnection',
      'The DC isolator must be located outside the building envelope at the meter position, so that the fire service can isolate the array without needing to enter the premises',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 reinforces requirements around PV DC isolation — a load-rated DC isolator at the array side adjacent to the inverter, clearly identified, suitable for emergency disconnection. Modern systems may also include rapid-shutdown devices at module level.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 219,
    question: 'For a domestic battery storage installation, where in the property should the battery NOT be located per IET Code of Practice for Electrical Energy Storage Systems?',
    options: [
      'In an attached garage (because a parked vehicle adds fire load), or on any wall shared with a neighbouring property regardless of its construction/fire resistance rating',
      'In a detached outbuilding away from the main dwelling, because the battery is then outside the household smoke/heat detection and alarm system (BS 5839-6 Grade D)',
      'On an external north/east-facing wall shaded from direct sunlight, because condensation forming on the cool enclosure (internal dew point) is a greater risk than solar heat gain',
      'Within escape routes, under stairs in a single-staircase building, in habitable rooms (where avoidable), in roof spaces (where heat/cold extremes apply) or close to gas meters',
    ],
    correctAnswer: 3,
    explanation:
      'The IET Code of Practice for EESS lists location restrictions to manage thermal-runaway risk. Avoid escape routes, under stairs in single-staircase dwellings, habitable rooms where practicable, lofts (extreme temps) and proximity to gas meters or other risks.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 220,
    question: 'For an EV charging point on a domestic supply, what cable rating consideration must the designer apply?',
    options: [
      'EVCP loads are continuous and high-utilisation — apply appropriate Cg and Ca correction factors, consider cumulative diversity for multiple chargers, and ensure final-circuit protective device rating coordinates with both EVCP rating and DNO supply capacity',
      'EVCP loads are intermittent because vehicles are only plugged in for part of the night — BS 7671 therefore permits the cable to be sized at half the charge-point rating, and the grouping and ambient temperature correction factors to be disregarded',
      'EVCP loads attract full diversity under the standard domestic diversity allowances — a 2.5 mm² twin-and-earth final circuit is therefore always adequate for a 7 kW charge point, regardless of route length, grouping or the installation method used',
      'EVCP cables need no correction factors at all — the charge point limits its own output current electronically, so the designer need only confirm that the protective device rating matches the manufacturer\'s stated maximum charging current',
    ],
    correctAnswer: 0,
    explanation:
      'EV charging is continuous high-utilisation. Designers must apply correction factors for grouping and ambient temperature, account for cumulative diversity if multiple chargers, and check the supply capacity. Many domestic supplies need DNO upgrade for 7 kW chargers.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 221,
    question: 'Under BS 7671, what does the designation TN-C-S (PNB) describe about the supply arrangement?',
    options: [
      'It introduces an entirely new earthing arrangement (replacing TT for rural installations) — the distributor must now provide a separate consumer earth electrode at every property, alongside the combined PEN conductor',
      'PNB is a distinct TN-C-S variant, in which the neutral-earth link sits within the consumer\'s installation — so PME conditions do not apply — and A4:2026 adds a PNB figure and its requirements at Reg 312.2.1.1',
      'It means that neutral and earth (N and PE) must now be kept separate all the way back to the supply transformer — every existing PME supply must therefore be converted to TN-S before an EV charge point, or a battery storage system, may be added',
      'It is simply a new label for a TN-S system, in which the earth is provided by a separate supply cable or by the steel armouring (SWA sheath) of the service cable — open-PEN protection is therefore no longer required at a charge point',
    ],
    correctAnswer: 1,
    explanation:
      // Was: "A4:2026 consolidates terminology around TN-C-S (PNB) ... replacing
      // loose use of PME." That is wrong — PME and PNB are two DIFFERENT TN-C-S
      // variants, not two names for one thing. Corrected 2026-08-27 against
      // bs7671_facets, which carries NOTE 3(a) verbatim.
      'PME and PNB are two different TN-C-S variants, not two names for the same arrangement. NOTE 3(a) is explicit: where the source earth and the neutral-earth link are installed within the consumer\'s installation, PME conditions do not apply — that arrangement is PNB, and it is typically used for a dedicated transformer or a multiple-source supply. Both combine neutral and protective functions in a PEN conductor, separated at the origin. A4:2026 adds the PNB figure and its requirements at Reg 312.2.1.1. Open-PEN risk still drives the EV and heat-pump design rules on outdoor metalwork.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'advanced',
  },
  {
    id: 222,
    question: 'Under MCS, what is the role of the SAP (Standard Assessment Procedure) calculation in heat pump design?',
    options: [
      'SAP is used directly to size the heat pump and to select its kW output — the SAP worksheet already contains the fabric and ventilation heat-loss figures for the dwelling',
      'SAP replaces the need for any room-by-room heat-loss calculation on a heat pump job — provided the dwelling already holds a valid EPC that is less than ten years old, and unaltered since',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
      'SAP determines the design flow temperature for the emitters — the installer then uses that to select radiator sizes, with no separate room-by-room heat-loss calculation',
    ],
    correctAnswer: 2,
    explanation:
      'SAP is the energy-performance assessment methodology behind EPCs and Building Regs Part L compliance. It informs the DESIGN STAGE (e.g. whether a heat pump is appropriate) but actual SIZING for a heat pump must use a room-by-room heat-loss calc to BS EN 12831.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 223,
    question: 'For an EV charger, what does ISO 15118 (plug-and-charge) standard cover?',
    options: [
      'The mechanical standard defining the physical dimensions and pin layout of the Type 1/Type 2 connector — together with the control pilot resistance values used in Mode 3 charging installations',
      'The installation standard setting the maximum cable length permitted between an EV charge point and the vehicle inlet — together with the tethered/untethered lead arrangements',
      'The fire-safety standard setting separation distances, ventilation rates and compartmentation required around EV charge points — in enclosed, basement/underground car parks',
      'Vehicle-to-grid communication standard enabling automatic billing, smart charging, V2G/V2H bi-directional power flow, and secure identification — going beyond simple Mode 3 charging',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 15118 is the international standard for vehicle-to-grid communication. It supports plug-and-charge identification, smart-charging schedules, V2G/V2H bi-directional power, and is foundational to the future grid-services role of EVs.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'basic',
  },
  {
    id: 224,
    question: 'Under the Smart Charge Point Regulations 2021, what features must domestic and workplace EV charging points sold in GB include by default?',
    options: [
      'Smart functionality (default off-peak charging schedules), randomised delay function, demand-side response capability, security and data protection, and a privacy-respecting connection',
      'A minimum continuous charge rate of 22 kW (three-phase), a tethered Type 2 lead on every unit, and an integral MID-approved kWh meter permanently visible to the owner at the charging position',
      'A built-in contactless payment card reader (PCI-compliant), a public-facing display screen showing the live import tariff, and open-access roaming agreements with at least two national networks',
      'A dedicated three-phase supply, a DNO-approved export meter (MID Class B), and load-curtailment signalling wired back to the main distribution board over a dedicated hard-wired control cable',
    ],
    correctAnswer: 0,
    explanation:
      'The Smart Charge Point Regulations 2021 (SCPR) require domestic/workplace EVCPs sold in GB to include smart functionality, default off-peak schedules, randomised delay (to prevent grid-shock at off-peak start), DSR capability and cyber-security minima.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },
  {
    id: 225,
    question: 'Under BS 7671 A4:2026, what new requirement applies to certificate schedules for EV charging circuits?',
    options: [
      'EV charging circuits are now exempt from the schedule of test results — the charge point carries its own manufacturer commissioning record, issued directly to the customer instead',
      'New schedule columns capture EV-specific data including PEN-fault detection method, RCD type, charge-point rating and special-location considerations — supporting accurate dutyholder records',
      'A separate certificate must instead be issued by the DNO rather than by the installer — the open-PEN risk arises on the distributor network, not within the consumer\'s installation itself',
      'The schedule must now record the make and model of the vehicle the charge point will serve — with its on-board charger rating and connector type, so that future load assessments stay accurate',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 introduces additional certificate schedule columns to capture EV-specific design and protection data — PEN-fault detection method, RCD type fitted, EVCP rated current and applicable special-location data. These support competent ongoing management.',
    section: '2.8',
    topic: 'BS 7671 Special Locations',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 2.9: F-Gas, WEEE and Sustainable Working (Questions 226-250)
  // ============================================
  {
    id: 226,
    question: 'Under the WEEE Regulations 2013 (UK retained), what duties does an electrical contractor have when removing old electrical equipment?',
    options: [
      'Dispose of removed equipment in the general site waste skip, provided the contractor holds a valid waste carrier registration and the skip operator sorts the load afterwards',
      'Return all removed equipment to the original manufacturer, which is legally obliged to accept it back and arrange treatment at its own cost under producer responsibility',
      'Segregate WEEE from general waste, store in suitable conditions, transfer only to authorised facilities under a Waste Transfer Note, and keep records for at least 2 years',
      'Strip the recoverable copper and ferrous metal on site, then crush the remaining casings, keeping a record of the scrap weights sold on for at least twelve months',
    ],
    correctAnswer: 2,
    explanation:
      'WEEE Regulations 2013 require segregation, suitable storage, transfer only to authorised treatment facilities, completion of Waste Transfer Notes (or Hazardous Waste Consignment Notes for hazardous WEEE), and record-keeping for 2 years (3 for hazardous).',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 227,
    question: 'Under the Hazardous Waste Regulations 2005, what is required when removing fluorescent tubes containing mercury?',
    options: [
      'Break the tubes on site inside a sealed drum fitted with a carbon filter to reduce their volume, then dispose of the crushed glass and end caps as ordinary non-hazardous construction waste',
      'Treat them as ordinary WEEE under a standard Waste Transfer Note, since the mercury is bound within the phosphor coating and the tubes are therefore not classified as hazardous waste',
      'Place them intact in the site glass recycling skip alongside other glazing waste, provided the skip is kept covered and the operator is told that the load contains lamps and tubes',
      'Treat as hazardous waste, store in suitable rigid containers protected from breakage, transfer to a permitted facility under a Hazardous Waste Consignment Note, retain records for 3 years',
    ],
    correctAnswer: 3,
    explanation:
      'Fluorescent tubes are hazardous waste due to mercury content. They must be stored intact in rigid containers, transferred to a permitted facility under a Hazardous Waste Consignment Note (HWCN), and records retained for 3 years.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 228,
    question: 'Under the F-Gas Regulation, what leak-checking frequency applies to a heat pump containing 5 tonnes CO₂-equivalent of refrigerant?',
    options: [
      'Annual leak check by F-Gas-certified personnel where charge ≥ 5 tonnes CO₂e, or every 2 years where charge < 5 tonnes; frequencies double if a leak detection system is installed and operational',
      'Monthly leak checks are required regardless of the charge size; any competent electrician may carry them out, provided the results are entered in the equipment logbook kept on site by the user',
      'No leak checks are required at all below 50 tonnes CO₂e; above that threshold an annual check by F-Gas-certified personnel applies, halving to a six-monthly check above 500 tonnes of refrigerant',
      'A single leak check at commissioning is required; no further checks apply unless the equipment is moved, recharged, or the refrigerant type is changed at a later service visit',
    ],
    correctAnswer: 0,
    explanation:
      'F-Gas leak-check frequencies are tied to CO₂-equivalent charge size. ≥ 5 tCO₂e: annual; ≥ 50 tCO₂e: 6-monthly; ≥ 500 tCO₂e: 3-monthly. Frequencies double where a fixed leak detection system is in place. All checks must be done by F-Gas-certified personnel.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 229,
    question: 'Under the GHG Protocol, what are Scope 1, 2 and 3 emissions for an electrical contractor?',
    options: [
      'Scope 1 = the largest and most visible emissions (vans, plant); Scope 2 = medium-sized emissions; Scope 3 = the smallest and easiest to measure — the usual starting point for most contracting businesses',
      'Scope 1 = direct emissions (vans, gas heating); Scope 2 = indirect from purchased electricity; Scope 3 = value-chain (materials, subcontractors, waste, business travel) — usually the largest',
      'Scope 1 = emissions from the office and stores; Scope 2 = emissions arising on site during the works; Scope 3 = staff commuting (private cars, vans) to and from site — the smallest of the three',
      'Scope 1 = purchased electricity; Scope 2 = vans, plant and fuel burned directly; Scope 3 = materials only — not reportable at all by a small contractor (below the employee size threshold)',
    ],
    correctAnswer: 1,
    explanation:
      'The GHG Protocol classifies emissions: Scope 1 (direct from owned assets), Scope 2 (purchased electricity/heat/steam), Scope 3 (everything else in the value chain — materials, subcontractors, transport, waste, business travel). Scope 3 is usually the largest and the hardest to measure.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 230,
    question: 'For an installer aiming to reduce Scope 3 emissions on a project, what is the most effective practice?',
    options: [
      'Switch the office electricity supply to a certified renewable tariff, and buy REGO-backed green electricity for every site welfare unit and temporary builder\'s supply used during the works',
      'Replace the entire van fleet with electric vehicles, and install workplace charge points at the depot and at the stores, so that all site travel is carried out with zero tailpipe emissions',
      'Specify lower-embodied-carbon materials, prefab where possible, optimise van routes to cut transport, source materials from local merchants, and segregate waste for recycling not landfill',
      'Install an air source heat pump to replace the gas heating in the firm own offices and stores, and fit LED lighting with presence detection throughout the premises and the workshop areas',
    ],
    correctAnswer: 2,
    explanation:
      'Scope 3 reductions come from materials and logistics choices: specify lower embodied-carbon products, design for prefabrication, optimise transport routes, source locally, segregate waste for recycling and reuse. These also typically reduce cost.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 231,
    question: 'Under the Environment Act 2021, what new producer responsibility applies to packaging waste?',
    options: [
      'A phased ban on all single-use plastic packaging (SUP) from 2024 — producers must switch to fibre-based, glass or reusable alternatives for anything placed on the market in the United Kingdom',
      'A requirement that all packaging placed on the market contains at least 30% recycled content by weight (the Plastic Packaging Tax threshold) — verified and reported annually to the Environment Agency',
      'A deposit return duty (DRS) falling on consumers alone — they must take all packaging back to the original retailer to reclaim a deposit, added at the point of sale on every item purchased',
      'Extended Producer Responsibility (EPR) for packaging — producers and brand-owners pay the full net cost of managing the household packaging they place on the market, with reporting from 2024',
    ],
    correctAnswer: 3,
    explanation:
      'The Environment Act 2021 introduces Extended Producer Responsibility for packaging. Producers and brand-owners pay full net cost of managing household packaging via Defra-defined fees, with reporting from 2024 and full cost recovery rolling in over subsequent years.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 232,
    question: 'Under ISO 14001 (environmental management systems), what is the first step a contractor must take?',
    options: [
      'Identify environmental aspects and impacts of their activities, products and services, and determine which are significant under defined criteria',
      'Set a headline net zero carbon target with a published completion date before assessing any of the organisation activities, products or impacts in detail',
      'Appoint an accredited external auditor to certify the organisation immediately, so the certificate is in place before the management system is written up',
      'Purchase verified carbon offsets in advance, enough to neutralise the organisation\'s measured emissions for the whole of the current reporting year',
    ],
    correctAnswer: 0,
    explanation:
      'ISO 14001 starts with identifying environmental aspects (how the organisation interacts with the environment) and impacts (the resulting changes — positive or negative). The organisation then determines which are "significant" using defined criteria, and plans controls.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 233,
    question: 'Under the Climate Change Act 2008 (as amended 2019), what is the UK\'s legally binding emissions target?',
    options: [
      'An 80% cut in greenhouse gas emissions by 2050 (against a 1990 baseline), which remains the binding figure because the 2019 amendment was only advisory in nature',
      'Net Zero greenhouse gas emissions by 2050 (compared with 1990 baseline), with interim five-yearly carbon budgets monitored by the Climate Change Committee',
      'Net Zero greenhouse gas emissions by 2030 against a 2010 baseline, with annual carbon budgets set and monitored by the Department for Energy Security (DESNZ)',
      'A voluntary aim to cut emissions in line with the Paris Agreement (COP21), with no legally binding deadline and no statutory body appointed to monitor progress',
    ],
    correctAnswer: 1,
    explanation:
      'The Climate Change Act 2008 was amended in 2019 to commit the UK to Net Zero greenhouse gas emissions by 2050. The Climate Change Committee sets and reports against five-yearly carbon budgets — currently CB6 covers 2033-2037.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 234,
    question: 'Under the Pollution Prevention and Control regime, what is a permit and when does an electrical contractor need one?',
    options: [
      'A permit is required by every electrical contractor before starting work on any occupied building; it must be obtained from the Environment Agency at least 28 days beforehand, and has to be displayed at the site entrance throughout the works',
      'A permit is the planning consent issued by the local authority for construction work; the electrical contractor relies on the principal contractor holding it rather than applying separately for one of its own',
      'Permits are required for installations carrying out specified activities like waste treatment or large combustion plant; most electrical contractors don\'t need one but must comply with permit conditions when working at a permitted site',
      'A permit is the dutyholder written authorisation to work on or near live conductors under the Electricity at Work Regulations; it is required whenever an installation cannot be proved dead before work starts',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental Permitting Regulations require permits for specified industrial activities (waste treatment, large combustion plant, intensive farming). Electrical contractors working at permitted sites must comply with the permit\'s emission and operating conditions during their work.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 235,
    question: 'Under the Control of Pollution (Oil Storage) Regulations, what containment is required for diesel storage on site?',
    options: [
      'Secondary containment (bund) sized for 50% of the largest container — fitted with a lockable drain valve, so that accumulated rainwater can be released to the surface water drain after a visual inspection',
      'A single drip tray (no bund) beneath the delivery tap is sufficient — the tank may stand on bare ground, provided it stands more than ten metres from any watercourse, drain or soakaway',
      'No secondary containment (bund) is required at all — provided the oil store is kept under cover from rainfall, and the total volume of diesel held on site at any one time stays below 1,000 litres',
      'Secondary containment (bund) sized for 110% of the largest container or 25% of total stored, whichever is greater, with no drainage outlet — preventing spills reaching watercourses or soakaways',
    ],
    correctAnswer: 3,
    explanation:
      'COPR (Oil Storage) Regulations 2001 require secondary containment for any oil store over 200 litres on industrial premises. The bund must hold at least 110% of the largest container or 25% of the total, with no drainage outlet that bypasses containment.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 236,
    question: 'When a heat pump containing R32 refrigerant reaches end of life, what disposal route is mandatory?',
    options: [
      'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
      'The refrigerant may be vented to atmosphere before scrapping; R32 has a low GWP of 675 and therefore falls outside the recovery/recycling rules set out in the F-Gas Regulation for heat pumps',
      'The whole unit may be placed in a general scrap-metal skip once it has been electrically isolated; the scrap processor/carrier is then responsible for recovering any refrigerant that is left in the circuit',
      'The refrigerant may be removed by any electrician provided the plant room is well ventilated; the recovered gas is then handed to an authorised waste carrier/broker for destruction at a permitted site',
    ],
    correctAnswer: 0,
    explanation:
      'Both F-Gas and WEEE apply at end of life. The refrigerant MUST be recovered by an F-Gas-certified technician (venting is a criminal offence). The equipment then enters the WEEE chain — taken to an authorised treatment facility for materials recovery.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 237,
    question: 'Under the Waste (England and Wales) Regulations 2011, what is the waste hierarchy you must apply?',
    options: [
      'Disposal → Other recovery (including energy recovery) → Recycling → Preparing for re-use → Prevention as a last resort',
      'Prevention → Preparing for re-use → Recycling → Other recovery (including energy recovery) → Disposal as last resort',
      'Recycling → Disposal → Preparing for re-use → Prevention → Other recovery (in whatever order suits the site)',
      'Segregate → Store → Transfer → Record → Report (with no order of preference between the five stages)',
    ],
    correctAnswer: 1,
    explanation:
      'The waste hierarchy under the 2011 Regulations is mandatory: prevent waste first, then prepare for re-use, then recycle, then recover (e.g. energy from waste), with disposal (landfill) only as last resort. Documented justification is required to skip down.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 238,
    question: 'On a project to retrofit LED lighting, what is the right approach to the existing fluorescent tubes and ballasts?',
    options: [
      'Place tubes and ballasts together in the general waste skip; record the total weight of the load on a standard Waste Transfer Note (WTN) — a lighting retrofit is exempt from the WEEE segregation duty',
      'Leave the old fittings in position and wire the new LED luminaires alongside them; equipment left in situ is not classed as waste — no consignment note (HWCN) or waste transfer note is then needed',
      'Tubes are hazardous WEEE (mercury) — segregate, store carefully, transfer under HWCN to permitted facility; ballasts are also WEEE — separate ferrous metals where possible to maximise material recovery',
      'Crush the tubes on site to recover the glass for use as aggregate; sell the ballasts as mixed scrap metal — the weighbridge tickets (a two-year record) are then the only record of that disposal',
    ],
    correctAnswer: 2,
    explanation:
      'The retrofit creates significant WEEE/hazardous waste. Fluorescent tubes go via Hazardous Waste route (HWCN, permitted facility, 3-year records). Ballasts and luminaires are WEEE — separate ferrous and non-ferrous to maximise recovery via authorised facilities.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 239,
    question: 'Under the Climate Change Act, what is a Carbon Budget and why does it matter to a contractor bidding for public work?',
    options: [
      'The annual sum that government sets aside to fund carbon capture and low-carbon heat projects; contractors can bid into it when tendering for public sector retrofit work',
      'A voluntary spending limit that a contractor sets on low-carbon materials each year; it is disclosed in tender returns to demonstrate commitment to sustainable procurement policy',
      'The per-project carbon allowance a client grants its main contractor; it is then divided between the subcontractors in proportion to their share of the total contract value',
      'A statutory five-year cap on UK emissions; public sector procurement increasingly demands suppliers report their carbon and demonstrate reduction plans aligned to Net Zero',
    ],
    correctAnswer: 3,
    explanation:
      'Carbon Budgets (CB1 through CB6) are statutory five-year caps on UK emissions set under the Climate Change Act. Public-sector procurement (PPN 06/21 in central government) increasingly requires suppliers to report carbon and have credible reduction plans.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 240,
    question: 'For an EV charging installation in a public car park, what specific Building Regulations Part S requirement applies?',
    options: [
      'Part S (Infrastructure for charging electric vehicles) requires new non-residential buildings with 10+ parking spaces to provide 1 EV charge point and cable routes for 1 in 5 spaces',
      'Part S (Infrastructure for charging electric vehicles) requires every parking space in a new non-residential building to have a fully installed 22 kW charge point before first occupation',
      'Part S (Infrastructure for charging electric vehicles) applies only to new residential buildings and exempts public and commercial car parks, which fall under the Smart Charge Point Regulations 2021',
      'Part S (Infrastructure for charging electric vehicles) requires charge points only where the existing supply has spare capacity, so a DNO capacity check determines whether any provision is needed',
    ],
    correctAnswer: 0,
    explanation:
      'Part S (introduced June 2022) requires new non-residential buildings with more than 10 parking spaces to provide at least one EV charge point and cable routes ("ducting") for one in five spaces. Major renovations have similar requirements scaled to project size.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 242,
    question: 'Under MCS, what is the MCS Installation Database (MID) and why does it matter to the consumer?',
    options: [
      'A private trade database of installer contact details and certification expiry dates, used by MCS purely for its own auditing purposes and not accessible or relevant to the consumer at all',
      'A manufacturer warranty register, which the consumer must sign up to separately within 30 days of commissioning in order to keep the product guarantee valid for its whole term',
      'The official register of MCS-certified installations, generating the MCS Certificate that consumers need to claim Smart Export Guarantee, Boiler Upgrade Scheme grants and other incentives',
      'A government-maintained list of approved renewable products and their published performance figures, which is unrelated to any individual installation or to its handover paperwork and certification',
    ],
    correctAnswer: 2,
    explanation:
      'The MCS Installation Database (MID) is the official register. The MCS Certificate it generates is the gateway to incentives — Smart Export Guarantee for PV, Boiler Upgrade Scheme for heat pumps, ECO funding etc. Without MID registration the consumer can\'t claim.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 243,
    question: 'Under the Smart Export Guarantee (SEG), what obligation does a licensed electricity supplier have?',
    options: [
      'Every licensed supplier, regardless of size, must pay a fixed government-set rate per kWh for all exported energy, with the rate reviewed and published each year by Ofgem (for every generation type)',
      'Suppliers must install an export meter free of charge for any customer with solar PV or a wind turbine, and must then buy the exported units at the import price (unit-for-unit matching)',
      'Suppliers must buy back exported electricity only from customers who take their import supply on one of the supplier own tariffs, and only where the installed array is under 4 kW (single-phase)',
      'Suppliers with 150,000+ domestic customers must offer at least one tariff paying small generators (PV, wind, micro-CHP, hydro, AD) for exported electricity, with a positive (>0p) per-kWh rate',
    ],
    correctAnswer: 3,
    explanation:
      'The Smart Export Guarantee (introduced 2020) requires licensed suppliers with 150,000+ domestic customers to offer at least one SEG tariff to small generators (≤5MW). The rate must be positive per kWh — replacing the old Feed-in Tariff for new installations.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 244,
    question: 'Under MCS MIS 3005, what handover documentation must the customer receive after a heat pump installation?',
    options: [
      'MCS Certificate, manufacturer\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
      'A verbal handover demonstrating the thermostat and programmer, backed by a signed customer acknowledgement that the demonstration took place, plus the manufacturer warranty registration card returned within 30 days of the visit',
      'The manufacturer instruction leaflet supplied with the unit together with the refrigerant charge commissioning sheet, which between them satisfy the whole of the MCS handover requirement without any further design paperwork at all',
      'The electrical installation certificate for the heat pump supply circuit and the Part P building notification, since all the heating design paperwork is retained on file by the installer rather than issued to the customer',
    ],
    correctAnswer: 0,
    explanation:
      'MIS 3005 handover includes: MCS Certificate, commissioning records (refrigerant charge, flow temperatures, performance), heat-loss calculation, system schematic, controls programming, maintenance instructions, and Building Regs notification (e.g. via competent person scheme).',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 245,
    question: 'Which failing most often lies behind enforcement action over waste handling by an electrical contractor?',
    options: [
      'Failure to wear the correct RPE and PPE (masks, gloves) when handling mercury lamps, batteries and refrigerants — the commonest trigger for enforcement; followed by poor strip-out housekeeping on occupied commercial premises',
      'Failure to manage WEEE (mercury-containing tubes, refrigerants, batteries) — driving most environmental enforcement; followed by uncontrolled site discharges',
      'Failure to obtain planning permission or listed building consent before installing external plant (heat pumps, PV arrays, flues) — the main driver of enforcement; followed by breaches of permitted development limits',
      'Failure to register completed renewable installations on the MCS Installation Database (MID) within the required period — the top enforcement trigger; followed by late handover of commissioning records, and missing test schedules',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental enforcement against electrical contractors typically arises from WEEE failures — mixed waste at landfills, mercury contamination, vented refrigerant. Site discharges (cement, oils) into drains are the next most common cause.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 246,
    question: 'Under the Packaging (Essential Requirements) Regulations 2015, what duty applies to packaging used in the supply chain?',
    options: [
      'All transit and consumer packaging must be manufactured entirely from recycled fibre (cardboard or paper), with plastic films permitted only where no fibre alternative exists',
      'Packaging must be returned to the manufacturer after a single use, which is then obliged to reprocess it and report the tonnage recovered (by material stream) to the Environment Agency',
      'Packaging must be minimised to satisfy required function, designed for recovery (reuse, recycling, energy or composting), and contain only restricted levels of heavy metals',
      'Packaging must be clearly labelled with the producer carbon footprint per unit (kgCO₂e) and a recyclability grade, so the end user can decide which waste stream it belongs in',
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
      'Lithium batteries may be placed in the household recycling bin (kerbside/bring-bank collection) at end of life, once they are fully discharged; the design need only ensure the modules are light enough for one person to carry down safely from the installed position later',
      'No end-of-life planning is needed at all, because a domestic lithium battery is warranted for the design life of the building (60 years); the manufacturer/retailer take-back scheme covers the removal and disposal at no cost to the householder concerned',
      'The battery may simply be left in place and permanently disconnected when it fails, provided the DC/AC isolator is locked off (padlocked); a durable warning notice is then fixed to the enclosure for the benefit of any future workers on the premises',
      'Lithium batteries are hazardous waste (and class 9 dangerous goods); the design should consider take-back arrangements with the manufacturer/supplier, ease of safe removal, and clear labelling for first responders and end-of-life handlers',
    ],
    correctAnswer: 3,
    explanation:
      'Lithium batteries are hazardous waste and Class 9 dangerous goods for transport. Design-stage planning includes manufacturer take-back arrangements (under WEEE), accessibility for safe removal, clear labelling (chemistry, capacity, isolation procedure) for first responders and waste handlers.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'intermediate',
  },
  {
    id: 248,
    question: 'Under the Carbon Trust\'s Net Zero Standard, what is "Science-Based Targets" alignment?',
    options: [
      'A target to reduce emissions consistent with limiting global warming to 1.5°C, set in line with the latest climate science, validated by the Science Based Targets initiative (SBTi)',
      'A target based on what the business can comfortably afford to spend each year, benchmarked against its sector peers (SIC-code matched) rather than against any climate science trajectory',
      'A government-mandated emissions cap that every UK business must legally achieve by 2030, enforced through annual Companies House reporting (SECR returns) and penalties for non-compliance',
      'A research funding target for universities and innovation bodies (UKRI-funded) working on climate science, used to direct public grant money towards low-carbon technology development',
    ],
    correctAnswer: 0,
    explanation:
      'Science-Based Targets are emission-reduction targets aligned to the latest climate science — typically a 1.5°C trajectory. Validation by the SBTi gives credibility. Public-sector and large-business buyers increasingly require SBTi-validated targets from suppliers.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 249,
    question: 'For PV/battery installations, what cyber-security consideration is now expected per the IET Code of Practice?',
    options: [
      'Cyber-security is the installer responsibility only up to handover, after which it transfers entirely to the customer, so no configuration beyond the factory default settings is required at the commissioning stage',
      'Default credentials must be changed, firmware kept up to date, internet-facing components segregated where possible, and data shared with third-party platforms reviewed for privacy and security implications',
      'The system should be kept permanently offline and isolated from any local network, so that no cyber-security measures, firmware updates or credential management are needed after commissioning the installation',
      'Only the inverter manufacturer is permitted to apply or alter any security settings, so the installer must leave the default credentials in place and raise a support ticket for any change that is later required',
    ],
    correctAnswer: 1,
    explanation:
      'The IET Code of Practice for EESS and Smart CP Regulations both expect cyber-security minima: change default credentials, keep firmware updated, segregate internet-facing components, and review data sharing with cloud platforms for privacy and security risk.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 250,
    question: 'Which commercial reason most directly explains why a contractor gains work by holding environmental competence?',
    options: [
      'Environmental competence mainly cuts the contractor\'s own electricity and fuel bills — the saving on the office and van fleet is what pays back the cost of training, certification and the annual assessment fees charged by the schemes',
      'It is a legal requirement for every electrical contracting business, whatever the work undertaken — the Environment Act 2021 makes carbon reporting and MCS registration compulsory for any business that holds a waste carrier registration',
      'Public-sector procurement, larger commercial clients and lenders increasingly require credible carbon reporting, MCS competence and waste-hierarchy compliance — without these you\'re locked out of growing markets like heat pumps, EV, PV and battery',
      'Environmental qualifications exempt the contractor from Building Regulations notification — the firm can self-certify heat pump and PV work without belonging to a competent person scheme, or paying the associated annual membership fees',
    ],
    correctAnswer: 2,
    explanation:
      'The commercial reality: low-carbon retrofit is the fastest-growing electrical market. Public-sector procurement, large clients and lenders demand credible carbon reporting, MCS competence and waste compliance. Contractors without these are increasingly locked out of heat pump, PV, EV and battery work.',
    section: '2.9',
    topic: 'F-Gas, WEEE and Sustainable Working',
    difficulty: 'basic',
  },
  {
    id: 251,
    question: 'Which PV arrangements fall within the scope of Section 712 of BS 7671?',
    options: [
      'Only PV in parallel with the public supply, never standalone',
      'PV standalone, in parallel and as an alternative supply',
      'PV above eleven kilowatts, where fitted to a domestic roof',
      'PV mounted on a roof, but never a ground mounted array',
    ],
    correctAnswer: 1,
    explanation:
      'Section 712 states its scope as PV installations not connected to the public distribution system, PV in parallel with it, and PV used as an alternative to it, so island, grid-tied and replacement systems are all covered. Choosing the parallel-only option is the common error because grid-tied work is the most familiar case, but a standalone off-grid array is equally within Section 712 and must meet the same requirements.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'basic',
  },
  {
    id: 252,
    question: 'When does BS 7671 require overcurrent protective devices for individual PV strings?',
    options: [
      'Every string must have its own overcurrent device fitted',
      'String devices are needed only above four parallel strings',
      'One or two parallel strings need no string device',
      'String protection depends only on the inverter output rating',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 712.431 gives an explicit exception: an array of one string, or two strings in parallel, needs no string overcurrent device, because there are not enough parallel strings to drive a damaging reverse current into a faulted string. Assuming every string always needs a fuse is the attractive error, but the requirement is triggered only when the stated inequality involving the number of strings and the maximum short circuit current is met.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'intermediate',
  },
  {
    id: 253,
    question: 'A DC device with no load-breaking capacity is fitted in a PV string. What does BS 7671 require of it?',
    options: [
      'Secure it by padlocking or a lockable enclosure',
      'Fit a warning label and rely on that label alone',
      'Replace it with a plug and socket arrangement',
      'Allow operation only when the array is in daylight',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.537.2.2.104 covers measures to prevent DC on-load interruption, and requires devices without breaking capacity to be secured against inadvertent or unauthorised operation, for example by padlocking or by placing them in a lockable space or enclosure. A label alone is rejected because DC does not have a natural current zero, so pulling such a device on load draws a sustained arc regardless of any notice fixed nearby.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'intermediate',
  },
  {
    id: 254,
    question: 'What does Regulation 712.514.102 require at PV DC distribution boards and combiner boxes?',
    options: [
      'A schedule of the string open circuit test results',
      'A permanent warning notice at the DC access points',
      'A copy of the array layout drawing inside the lid',
      'A label stating the inverter manufacturer and model',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 712.514.102 mandates permanent warning notices at DC access points such as distribution boards and combiner boxes, so anyone opening the enclosure is warned that DC parts may be live. Recording test results is worth doing on the certificate, but it is a documentation habit rather than the labelling duty this regulation imposes, and a results schedule inside a box warns nobody of a live DC hazard.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'basic',
  },
  {
    id: 255,
    question: 'Where must warning notices be fixed when an installation has an additional source of supply?',
    options: [
      'At the origin and at the inverter enclosure, but nowhere else',
      'At the consumer unit, and nowhere else in the dwelling',
      'Only at the meter, and then only where it is remotely sited',
      'At the origin, the remote meter, the board and isolators',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 514.15.1 lists four locations: the origin of the installation, the meter position where the meter is remote from the origin, the consumer unit or distribution board to which the source is connected, and all points of isolation of all sources. Naming only the origin and the inverter is tempting because those are the visible parts of the generator, but it leaves the isolation points and the remote meter unmarked.',
    section: '2.6',
    topic: 'Isolation and Labelling',
    difficulty: 'intermediate',
  },
  {
    id: 256,
    question: 'Which standard does BS 7671 cite for an insulation monitoring device used on a PV installation?',
    options: [
      'BS EN 61557-8, or BS EN 62109-2 if inside an inverter',
      'BS EN 60898-1, whatever the type of monitoring device used',
      'BS EN 61008-1, where the monitoring device is a separate unit',
      'BS EN 60947-3, where the device sits inside an inverter',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.538.101 requires an insulation monitoring device to be selected to BS EN 61557-8, and where the function is integral to the inverter it may instead conform to BS EN 62109-2. The circuit breaker and RCD standards offered are attractive because they are familiar protective device standards, but they describe overcurrent and residual current devices, not a device that continuously monitors insulation to earth.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'intermediate',
  },
  {
    id: 257,
    question: 'Where blocking diodes are fitted in PV strings, what does BS 7671 require of their ratings?',
    options: [
      'Reverse voltage at least equal to the string voltage',
      'Rated current not less than half the string current',
      'Reverse voltage of twice the maximum string voltage',
      'Rated current matched to the inverter input current',
    ],
    correctAnswer: 2,
    explanation:
      'Section 712 requires blocking diodes to be connected in series with the string, with a reverse voltage rating of at least twice the maximum PV string voltage and a current rating not less than 1.1 times the maximum short circuit current. Rating the reverse voltage at only the string voltage leaves no margin for the voltage rise that cold, bright conditions produce, and the diode can fail short and defeat its own purpose.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'intermediate',
  },
  {
    id: 258,
    question: 'A domestic battery is installed alongside a PV array. Which new chapter of BS 7671 applies?',
    options: [
      'Chapter 44, covering voltage disturbance and immunity',
      'Chapter 57, covering stationary secondary batteries',
      'Chapter 46, covering isolation and functional switching',
      'Chapter 53, covering switchgear and protective devices',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 57 is new in BS 7671:2018+A4:2026 and sets requirements for stationary secondary battery installations whose designed purpose is storage and supply for electrical installations. Chapter 53 is a plausible distractor because it does govern the switchgear around the battery, but it is a general chapter and carries none of the battery specific requirements that Chapter 57 was introduced to provide.',
    section: '2.6',
    topic: 'Battery Storage',
    difficulty: 'basic',
  },
  {
    id: 259,
    question: 'Which stationary batteries are excluded from the scope of Chapter 57?',
    options: [
      'Batteries mounted outdoors within a ventilated enclosure',
      'Batteries charged from a photovoltaic array mounted on a roof',
      'Batteries in pluggable UPS and emergency lighting units',
      'Batteries with a stored capacity above ten kilowatt hours each',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 57 excludes batteries incorporated in products covered by product safety standards, including pluggable uninterruptible power supplies, fire and emergency lighting systems, and central safety power supplies that conform to their own standards. An outdoor position is a red herring, because location changes the external influences to be considered but never removes an installation from the scope of the chapter.',
    section: '2.6',
    topic: 'Battery Storage',
    difficulty: 'intermediate',
  },
  {
    id: 260,
    question: 'How does BS 7671:2018+A4:2026 now deal with energy efficiency?',
    options: [
      'Appendix 17 remains the only guidance on the subject',
      'Energy efficiency is left entirely to Building Regulations',
      'It appears in Chapter 81 within the new Part 8',
      'It is covered by a note at the front of Part 1',
    ],
    correctAnswer: 2,
    explanation:
      'The informative Appendix 17 has been deleted and replaced by Chapter 81 in the new Part 8, which points the reader to the Building Regulations for England and Wales, Scotland and Northern Ireland, and to BS HD 60364-8-1. Saying it is left entirely to Building Regulations misses the point of the change: energy efficiency now sits inside the numbered body of the standard, not in an optional appendix.',
    section: '2.5',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 261,
    question: 'What is a prosumer electrical installation as recognised by the new Chapter 82?',
    options: [
      'Any installation supplied through a meter with export registers',
      'A low voltage installation with local generation or storage',
      'An installation owned by a registered electrical business',
      'Any installation fed from more than one final circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 82 is new and gives requirements for the design, erection and verification of low voltage installations designated as prosumer electrical installations, which is where local production or storage of energy is present. The smart meter answer is attractive because export metering usually accompanies generation, but the meter is a measuring device and its presence is not what brings the installation within Chapter 82.',
    section: '2.6',
    topic: 'Prosumer Installations',
    difficulty: 'basic',
  },
  {
    id: 262,
    question: 'How does Regulation 551.7.2.1 treat a battery energy storage system?',
    options: [
      'As a fixed current using load, like any other fixed appliance',
      'As a generating set, so the generation rules apply to it',
      'As an item of switchgear, falling outside the scope of Chapter 55',
      'As a standby supply, outside the parallel supply rules',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 551.7.2.1 treats a battery energy storage system as a generating set, so the additional requirements for sources capable of parallel operation apply to it in full. Treating it as an ordinary load is the classic mistake, because a battery does not only draw current: when discharging it feeds the installation, so the isolation, labelling and parallel operation duties for a source all bite.',
    section: '2.6',
    topic: 'Battery Storage',
    difficulty: 'intermediate',
  },
  {
    id: 263,
    question: 'Why does adding an air source heat pump force a fresh maximum demand assessment?',
    options: [
      'Because a heat pump must always be given a supply of its own',
      'Because the pump adds a substantial continuous fixed load',
      'Because BS 7671 forbids diversity on any heating circuit at all',
      'Because the pump changes the earthing arrangement of the dwelling',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 31 requires the designer to establish maximum demand with diversity applied before selecting conductors and the main protective device, and a heat pump adds a substantial fixed load that can run for long periods, so the earlier assessment no longer holds. The separate supply answer is wrong because BS 7671 sets no such rule, and a dedicated circuit does nothing to reduce the total demand at the origin.',
    section: '2.4',
    topic: 'Heat Pumps',
    difficulty: 'intermediate',
  },
  {
    id: 264,
    question: 'A heat pump takes the calculated maximum demand above the capacity of the existing supply. What is the correct response?',
    options: [
      'Fit a larger main switch and leave the existing tails in place',
      'Assume that diversity keeps the actual demand lower',
      'Arrange load management or a supply upgrade with the DNO',
      'Protect the heat pump circuit with a larger device',
    ],
    correctAnswer: 2,
    explanation:
      'Where the assessed demand exceeds what the supply can carry, the designer either limits the demand by load management so loads cannot coincide, or arranges a larger supply with the distributor. Fitting a bigger protective device is the dangerous answer, since raising the rating of a device does not raise the capacity of the service cable or the cut-out fuse feeding it.',
    section: '2.4',
    topic: 'Heat Pumps',
    difficulty: 'intermediate',
  },
  {
    id: 265,
    question: 'Why is the DC side of a PV installation treated as a special hazard during maintenance?',
    options: [
      'The array stays live in daylight and cannot be switched off',
      'DC circuits are always wired in cables of a much smaller size',
      'The array voltage rises steadily as the modules become much warmer',
      'DC faults are cleared much more quickly than AC faults are',
    ],
    correctAnswer: 0,
    explanation:
      'An illuminated module generates whenever light falls on it, so opening the AC isolator leaves the array, its cables and the combiner box live, which is why warning notices are required at DC access points and why the DC devices must be secured. The warming answer is wrong in direction, because module voltage falls as cell temperature rises, and the highest string voltages occur on cold bright days.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'basic',
  },
  {
    id: 266,
    question: 'What is the purpose of the AC isolator fitted next to a PV inverter?',
    options: [
      'To disconnect the inverter from the installation wiring',
      'To disconnect the modules from the inverter input side',
      'To act as the overcurrent protection for the array cable',
      'To provide functional switching for the generation meter',
    ],
    correctAnswer: 0,
    explanation:
      'The AC isolator separates the inverter from the installation and so from the public supply, allowing safe work on the AC side of the system. It is not a substitute for DC isolation, which is why a separate DC means of isolation is provided: the modules keep generating in daylight and the AC isolator does nothing at all to make the array cabling dead.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'intermediate',
  },
  {
    id: 267,
    question: 'A small wind turbine is to run in parallel with the public supply. Which regulation group applies?',
    options: [
      'Regulation 551.7 additional requirements for parallel sources',
      'Regulation 411.3 requirements for automatic disconnection times',
      'Regulation 522.6 requirements for cables buried in walls and floors',
      'Regulation 643.7 requirements for the verification of Zs values on site',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 551.7 sets additional requirements wherever a generating set may operate in parallel with other sources, including the public distribution network, and the trigger is that parallel operation is possible rather than continuous. The disconnection requirements of Chapter 41 still apply to the installation as a whole, but they say nothing about the extra duties created by having a second source present.',
    section: '2.3',
    topic: 'Wind and Micro-Hydro',
    difficulty: 'intermediate',
  },
  {
    id: 268,
    question: 'What does Regulation 551.7.1 say about connecting a source on the load side of an RCD?',
    options: [
      'It is always required so the source gains RCD protection',
      'It is prohibited where the stated conditions are met',
      'It is permitted for any source rated below sixteen amperes',
      'It is required whenever energy flow is bidirectional',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 551.7.1 includes an explicit prohibition on connecting a source to the load side of an RCD where the stated conditions apply, because a source downstream of the device can feed current back and defeat the intended protection. Assuming the source should always sit behind an RCD is the intuitive but wrong reading, since RCDs are designed around a single direction of supply.',
    section: '2.6',
    topic: 'Isolation and Labelling',
    difficulty: 'intermediate',
  },
  {
    id: 269,
    question: 'On a typical domestic solar thermal system, which part is the electrician responsible for?',
    options: [
      'The pump, controller, sensors and immersion backup supply',
      'The collector pipework, plus the strength of the roof fixings',
      'The pressure relief valve, expansion vessel and primary loop',
      'The glycol charge, and the flushing of the primary circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Solar thermal moves heat rather than generating electricity, so the electrical scope is the circulating pump, the differential controller, its sensor wiring and the supply to any immersion heater used as backup. The pipework, relief valve and heat transfer fluid are plumbing work under the wet system installer, and touching them is outside the competence the electrical qualification covers.',
    section: '2.2',
    topic: 'Solar Thermal',
    difficulty: 'intermediate',
  },
  {
    id: 270,
    question: 'Which standard does Chapter 81 of BS 7671 point the reader to for energy efficiency?',
    options: [
      'BS EN 62305 on protection of structures against lightning',
      'BS HD 60364-8-1 on functional aspects and energy efficiency',
      'BS EN 50110 on the safe operation of electrical installations',
      'BS EN 61439 on low voltage switchgear and controlgear sets',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 81 refers the reader to the Building Regulations for the relevant part of the United Kingdom and to BS HD 60364-8-1, which covers functional aspects and energy efficiency for low voltage installations. BS EN 62305 is a plausible looking harmonised document but it deals with lightning protection risk assessment, which has no bearing on energy efficiency measures.',
    section: '2.5',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 271,
    question: 'What is the extended scope of Section 753 in BS 7671:2018+A4:2026?',
    options: [
      'Only underfloor heating mats laid in a screed or under floor tiles',
      'Electric heating cables and embedded surface heating systems',
      'All forms of space heating including wet radiator circuits',
      'Storage heaters supplied through an off peak time control',
    ],
    correctAnswer: 1,
    explanation:
      'Section 753 has been retitled and revised so that it covers heating cables and embedded electric heating systems for surface heating, indoors and outdoors, including de-icing and frost protection applications. Limiting it to floor mats is the familiar but narrow reading, and it misses the outdoor gutter, ramp and pipe trace heating that the revised section now brings within the same rules.',
    section: '2.5',
    topic: 'Heating Systems',
    difficulty: 'intermediate',
  },
  {
    id: 272,
    question: 'Which heating systems does Section 753 specifically exclude from its requirements?',
    options: [
      'Systems fed from a photovoltaic array, or from a storage battery',
      'Systems installed outdoors, where frost protection is needed',
      'Systems in dwellings, rather than in commercial buildings',
      'Systems to BS EN 60519, BS EN 62395 and BS EN 60079',
    ],
    correctAnswer: 3,
    explanation:
      'Section 753 states that industrial and commercial heating systems complying with BS EN 60519, BS EN 62395 and BS EN 60079 are not covered, because those product standards already set the relevant safety requirements. Outdoor frost protection is the opposite of an exclusion: the revised scope was widened specifically to bring de-icing and frost prevention systems within Section 753.',
    section: '2.5',
    topic: 'Heating Systems',
    difficulty: 'intermediate',
  },
  {
    id: 273,
    question: 'Regulation 753.412.1.201 restricts the use of double or reinforced insulation. How?',
    options: [
      'It bans the measure entirely for all embedded heating work',
      'It permits the measure only where an RCD is also installed',
      'It bars it as the sole measure for a wall heating system',
      'It permits it for walls but never for a floor heating unit',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 753.412.1.201 does not allow double or reinforced insulation as the sole protective measure for a wall heating system, while permitting it for floor heating units that comply with Regulation 412.2.1.1. Option four inverts the rule, and inverted answers are attractive because the candidate remembers that a distinction exists between walls and floors without recalling which way it runs.',
    section: '2.5',
    topic: 'Heating Systems',
    difficulty: 'intermediate',
  },
  {
    id: 274,
    question: 'Why does A4:2026 make Section 722 refer to prosumer electrical installations?',
    options: [
      'Because charging equipment must always be fed from a local battery',
      'Because local generation and storage affect the charging design',
      'Because export metering is now mandatory at every new dwelling built',
      'Because charge points may no longer be fitted on a PME supply',
    ],
    correctAnswer: 1,
    explanation:
      'Section 722 now requires the designer to take account of the prosumer installation, because on-site generation and storage change import and export flows and affect how protective devices coordinate with inverter behaviour. The PME answer is wrong: Section 722 continues to permit PME supplies where the recognised measures against an open PEN conductor are applied, rather than banning them.',
    section: '2.6',
    topic: 'Prosumer Installations',
    difficulty: 'intermediate',
  },
  {
    id: 275,
    question: 'When are PV string voltages at their highest, and why does that matter for design?',
    options: [
      'In hot still weather, so the cable rating must be derated',
      'At night, so the isolator must be rated for stored charge',
      'During a fault, so only the fuse rating needs to be checked',
      'In cold bright weather, so equipment voltage ratings matter',
    ],
    correctAnswer: 3,
    explanation:
      'Module open circuit voltage rises as cell temperature falls, so the worst case string voltage occurs on a cold bright day, and the inverter, isolators, cables and combiner gear must be rated for that value rather than for the standard test condition figure. The hot weather answer confuses the current and voltage behaviour: heat reduces module voltage even though it does affect cable current ratings.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'advanced',
  },
  {
    id: 276,
    question: 'What must an electrician confirm before working on the inverter of a grid connected PV system?',
    options: [
      'That both the AC and the DC sides have been made safe',
      'That the array has been covered with an opaque sheet only',
      'That the generation meter has been read and then recorded',
      'That the AC isolator has been opened and locked off only',
    ],
    correctAnswer: 0,
    explanation:
      'An inverter sits between two live sources, so safe isolation has to be proved on the AC side and on the DC side, each isolated, locked and proved dead with an approved voltage indicator. Locking the AC isolator alone is the common site shortcut and it leaves the DC terminals live, because the modules keep generating for as long as any daylight reaches them.',
    section: '2.8',
    topic: 'Safe Isolation',
    difficulty: 'intermediate',
  },
  {
    id: 277,
    question: 'What is the main electrical consideration when siting the controls for a micro-hydro scheme?',
    options: [
      'The controls should sit as close to the turbine as possible',
      'The controls need no earthing because water is a conductor',
      'The controls must suit damp conditions and be accessible',
      'The controls should be mounted outdoors to aid cooling',
    ],
    correctAnswer: 2,
    explanation:
      'Micro-hydro plant sits in a wet, sometimes flood prone location, so the external influences of moisture and corrosion drive enclosure selection, and the equipment must still be accessible for operation, isolation and maintenance. The claim that water removes the need for earthing is dangerous nonsense, since the presence of water raises shock risk and makes protective bonding and disconnection more important, not less.',
    section: '2.3',
    topic: 'Wind and Micro-Hydro',
    difficulty: 'intermediate',
  },
  {
    id: 278,
    question: 'Why must cables passing through thermal insulation be given special attention?',
    options: [
      'Insulation traps heat and lowers the current carrying capacity',
      'Insulation increases the impedance of the circuit protective wire',
      'Insulation raises the touch voltage present on exposed metalwork',
      'Insulation causes nuisance tripping of any residual current device',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal insulation prevents heat escaping from the cable, so the current carrying capacity falls and a rating factor must be applied when sizing the conductor, otherwise the cable can exceed its permitted operating temperature. The RCD answer is wrong because residual current devices respond to an imbalance between line and neutral currents, and insulation does not create such an imbalance.',
    section: '2.7',
    topic: 'Insulation and Building Regs',
    difficulty: 'intermediate',
  },
  {
    id: 279,
    question: 'What should an electrician do when a new heat pump circuit passes through a fire compartment wall?',
    options: [
      'Leave the hole open so the cable can be replaced easily',
      'Fill the hole with expanding foam of any general purpose type',
      'Reinstate the fire resistance of the element with a rated seal',
      'Record the penetration on the certificate and take no action',
    ],
    correctAnswer: 2,
    explanation:
      'Where a wiring system penetrates a floor, wall or ceiling with a specified fire resistance, that resistance must be reinstated using a suitably rated sealing system so fire and smoke cannot spread through the opening. General purpose foam is the tempting quick fix, but it is not tested or classified for the fire resistance period the building element has to achieve.',
    section: '2.7',
    topic: 'Insulation and Building Regs',
    difficulty: 'intermediate',
  },
  {
    id: 280,
    question: 'What does a solar photovoltaic module produce when light falls on it?',
    options: [
      'Alternating current at the frequency of the public supply',
      'Direct current that an inverter converts for use in the home',
      'Hot water that is stored in a cylinder for later household use',
      'Direct current that is used by socket outlets without change',
    ],
    correctAnswer: 1,
    explanation:
      'A PV module generates direct current, and an inverter converts that DC into alternating current at the correct voltage and frequency so it can be used in the installation or exported. The hot water answer describes solar thermal, which is a different technology entirely: it circulates fluid through a collector to move heat and generates no electricity at all.',
    section: '2.1',
    topic: 'Solar PV',
    difficulty: 'basic',
  },
  {
    id: 281,
    question: 'A dwelling has PV, a battery and a charge point. Which parts of BS 7671 govern each element?',
    options: [
      'Section 712 alone, covering all three items of equipment',
      'Chapter 82, which replaces the individual equipment sections',
      'Part 6 verification rules, in place of the design requirements',
      'Section 712, Chapter 57 and Section 722 each apply in turn',
    ],
    correctAnswer: 3,
    explanation:
      'A hybrid installation is assembled from several sets of requirements: Section 712 for the PV, Chapter 57 for the stationary battery, Section 722 for the charging equipment, with Chapter 82 sitting over the whole as a prosumer installation. Treating Chapter 82 as a replacement is wrong, because it adds design and verification requirements for the combined installation rather than removing the equipment specific rules.',
    section: '2.6',
    topic: 'Prosumer Installations',
    difficulty: 'intermediate',
  },
  {
    id: 282,
    question: 'Why does the presence of a generator change the isolation duties in an installation?',
    options: [
      'Because a single main switch no longer makes everything dead',
      'Because isolators must now be rated at double the load current',
      'Because the main switch must be replaced by a circuit breaker',
      'Because the supply company owns the isolation point after that',
    ],
    correctAnswer: 0,
    explanation:
      'Once a second source exists, opening the main switch leaves any circuit fed by the generator, inverter or battery live, so isolation must be provided and identified for every source, and Regulation 514.15.1 requires notices at all those isolation points. The rating answer confuses isolation with capacity: an isolator is selected for the current and voltage it must handle, not doubled as a rule.',
    section: '2.6',
    topic: 'Isolation and Labelling',
    difficulty: 'intermediate',
  },
  {
    id: 283,
    question: 'What is the practical effect of moving energy efficiency from an appendix into Chapter 81?',
    options: [
      'Designers may now ignore the Building Regulations entirely',
      'It becomes part of the numbered body of the standard itself',
      'Energy efficiency now applies only to commercial premises',
      'Efficiency measures now override protection for safety rules',
    ],
    correctAnswer: 1,
    explanation:
      'Deleting Appendix 17 and introducing Chapter 81 within Part 8 places energy efficiency in the numbered structure of BS 7671 rather than in an informative annexe at the back. It never overrides protection for safety: Parts 3, 4 and 5 continue to govern shock, fault and thermal protection, and an efficiency measure that compromised those requirements would not be acceptable.',
    section: '2.5',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 284,
    question: 'A battery inverter can charge from and discharge to the supply. What does BS 7671 call this?',
    options: [
      'A functional earth arrangement requiring separate bonding',
      'A reduced low voltage source needing a transformer supply',
      'A condition where energy flow is bidirectional at the source',
      'A temporary supply requiring inspection every three months',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 551.7.1 uses the condition that energy flow is bidirectional, meaning the source and the supply can each deliver energy to the other, and that condition triggers the additional requirements for the source. Reduced low voltage is a different concept altogether: it describes a transformer derived supply used to limit shock risk on site tools, not a two way flow of energy.',
    section: '2.6',
    topic: 'Battery Storage',
    difficulty: 'basic',
  },
  {
    id: 285,
    question: 'How should the final circuit supplying an air source heat pump normally be arranged?',
    options: [
      'Spurred from the nearest ring final circuit in the kitchen',
      'A dedicated circuit sized on the full load current of the unit',
      'Shared with the immersion heater to save a way in the board',
      'Wired in flexible cord clipped along the outside of the wall',
    ],
    correctAnswer: 1,
    explanation:
      'A heat pump is a substantial fixed load with its own control and isolation needs, so it takes a dedicated circuit sized on the manufacturer full load current with a suitable local means of isolation at the outdoor unit. Spurring from a ring is the shortcut that fails, because the ring is already loaded by sockets and the spur conductor cannot carry a continuous heating load safely.',
    section: '2.4',
    topic: 'Heat Pumps',
    difficulty: 'intermediate',
  },
  {
    id: 286,
    question: 'What do the two sensors of a solar thermal differential controller measure?',
    options: [
      'The collector temperature and the store temperature',
      'The flow rate through the pump and the header pressure',
      'The outside air temperature and the room temperature',
      'The mains voltage and the current drawn by the pump',
    ],
    correctAnswer: 0,
    explanation:
      'A differential controller compares the collector sensor with the cylinder store sensor and runs the pump only while the collector is meaningfully hotter, so useful heat is gained rather than lost. The outside air option describes weather compensation used on heating controls, which sets flow temperature from external conditions and cannot tell whether the collector has anything to give.',
    section: '2.2',
    topic: 'Solar Thermal',
    difficulty: 'intermediate',
  },
  {
    id: 287,
    question: 'What information must be left with the user after commissioning a generating installation?',
    options: [
      'The trading account details of the supplier, and nothing more',
      'Certification, operating instructions and isolation details',
      'A written estimate of the annual savings, year by year',
      'The personal number of the commissioning engineer, for call-outs',
    ],
    correctAnswer: 1,
    explanation:
      'Handover requires the certification for the work, manufacturer operating and maintenance instructions, and clear information on where and how to isolate each source, which supports the warning notices that Regulation 514.15.1 demands. A savings estimate is a sales document rather than an installation record, and it gives the user nothing that helps them operate or isolate the system safely.',
    section: '2.8',
    topic: 'Commissioning',
    difficulty: 'intermediate',
  },
  {
    id: 288,
    question: 'Which measure is a recognised way of reducing the energy used by a lighting installation?',
    options: [
      'Raising the circuit voltage to reduce the current that flows',
      'Fitting larger cables so less energy is lost in the conductors',
      'Presence detection and daylight linked control of the luminaires',
      'Removing the switching so lamps are not repeatedly restarted',
    ],
    correctAnswer: 2,
    explanation:
      'Controlling lighting by occupancy and by available daylight cuts the hours that luminaires run, which is the largest single influence on the energy a lighting installation consumes. Larger cables do reduce conductor losses slightly, and that is a genuine efficiency measure, but the saving is small compared with switching off lighting that nobody needs at that moment.',
    section: '2.5',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 289,
    question: 'Why must an inverter disconnect automatically if the public supply fails?',
    options: [
      'To keep the inverter cool during a period of high output',
      'To prevent it energising a network that others believe is dead',
      'To stop the battery from discharging into the local network',
      'To ensure the generation meter records the correct readings',
    ],
    correctAnswer: 1,
    explanation:
      'If a generator kept feeding a failed network, it could make the distribution system live and endanger anyone working on it, so grid connected inverters are required to detect loss of supply and disconnect. The metering answer confuses commercial measurement with safety: an inaccurate reading costs money, whereas an unexpected live network can kill.',
    section: '2.3',
    topic: 'Grid Connection',
    difficulty: 'basic',
  },
  {
    id: 290,
    question: 'What does an air source heat pump actually do to warm a building?',
    options: [
      'It burns a small amount of fuel to top up the electric heat',
      'It converts electrical energy directly into heat in a element',
      'It stores summer heat underground and releases it in winter',
      'It moves heat from the outside air into the heating system',
    ],
    correctAnswer: 3,
    explanation:
      'A heat pump uses a refrigeration cycle to take heat from the outside air and deliver it into the heating circuit, so the electrical input drives the transfer rather than creating all of the heat. The direct conversion option describes a resistance heater such as an immersion element, which is a different and far less efficient way of using the same electrical energy.',
    section: '2.4',
    topic: 'Heat Pumps',
    difficulty: 'basic',
  },
  {
    id: 291,
    question: 'Which external influences most affect cable selection for a roof mounted PV array?',
    options: [
      'Harmonic content, and the power factor of the load supplied',
      'Voltage drop, and the length of the final circuit conductors',
      'The number of circuits, all sharing the same containment',
      'Ultraviolet radiation, heat, moisture and mechanical damage',
    ],
    correctAnswer: 3,
    explanation:
      'Wiring systems must be selected and installed so external influences do not impair safety or function over the expected service life, and a roof array sees sunlight, wide temperature swings, rain, wind movement and possible impact. Voltage drop is a genuine design check, but it is a performance calculation about conductor size and length rather than an external influence acting on the cable.',
    section: '2.7',
    topic: 'External Influences',
    difficulty: 'basic',
  },
  {
    id: 292,
    question: 'What is the correct order of the design steps set out in Chapter 31?',
    options: [
      'Purpose, supplies, maximum demand, then conductors and earthing',
      'Earthing, conductors, maximum demand, then the purpose of the job',
      'Maximum demand, purpose, protective devices, then the supplies',
      'Supplies, conductors, purpose of the installation, then earthing',
    ],
    correctAnswer: 0,
    explanation:
      'Chapter 31 works from the purposes and structure of the installation, to the supplies available, to maximum demand with diversity applied, and only then to conductor arrangement, earthing and protective device selection. Starting from earthing is a common site habit on alteration work, but it fixes decisions before the demand is known, which is exactly how undersized tails and overloaded supplies arise.',
    section: '2.4',
    topic: 'Design and Demand',
    difficulty: 'intermediate',
  },
  {
    id: 293,
    question: 'May the manual disconnection of certain loads be taken into account when assessing maximum demand?',
    options: [
      'No, because manual actions can never be relied upon at all',
      'Yes, but only where the installation is a single dwelling',
      'No, unless the distributor has agreed the figure in writing',
      'Yes, where the arrangement is documented and procedures exist',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 722.311.201 allows manual disconnection of loads to be taken into account in determining maximum demand, provided the arrangement is genuine and supported by documentation and operating procedures, such as heating circuits isolated through the summer. Ruling it out entirely is too absolute, and it removes a legitimate design tool that reduces the need to upsize a supply unnecessarily.',
    section: '2.4',
    topic: 'Design and Demand',
    difficulty: 'intermediate',
  },
  {
    id: 294,
    question: 'What is the key precaution when testing insulation resistance on a PV DC circuit?',
    options: [
      'Follow a defined procedure that avoids opening strings on load',
      'Test only in full sunlight so the reading settles more quickly',
      'Link the array positive and negative to the earthing conductor',
      'Use an ordinary continuity range instead of the test voltage',
    ],
    correctAnswer: 0,
    explanation:
      'The array cannot be switched off, so the test must follow a defined sequence that keeps DC connections from being broken while carrying current and keeps the tester within its ratings. Linking the array conductors to earth is the dangerous option: it deliberately creates the earth fault the test is meant to look for and puts fault current through the earthing arrangement.',
    section: '2.8',
    topic: 'Inspection and Testing',
    difficulty: 'intermediate',
  },
  {
    id: 295,
    question: 'What must a notice at the consumer unit of a PV equipped dwelling tell the reader?',
    options: [
      'The date on which the array was last cleaned and inspected',
      'The expected annual generation figure for the installation',
      'The name of the electrical contractor who did the installing',
      'That more than one source supplies the installation and where',
    ],
    correctAnswer: 3,
    explanation:
      'The warning notice required by Regulation 514.15.1 must be durably marked and identify the points of isolation, so anyone opening the board knows another source is present and where to isolate it. A contractor name is useful contact information and often appears on a separate label, but on its own it warns nobody that live parts may remain after the main switch is opened.',
    section: '2.6',
    topic: 'Isolation and Labelling',
    difficulty: 'intermediate',
  },
  {
    id: 296,
    question: 'What governs the position chosen for the outdoor unit of an air source heat pump?',
    options: [
      'It must always sit on the northern side, whatever the layout',
      'It must stand at least two metres above ground level, always',
      'Airflow, access for maintenance and suitability for the weather',
      'It must sit within one metre of the consumer unit, in every case',
    ],
    correctAnswer: 2,
    explanation:
      'The unit needs unobstructed airflow to work, safe access for isolation and servicing, and equipment selected for outdoor conditions, with the electrical supply and local isolator arranged to suit that position. The fixed distance answers sound precise, and that is exactly why they attract candidates, but BS 7671 sets no such dimension for heat pump siting.',
    section: '2.4',
    topic: 'Heat Pumps',
    difficulty: 'intermediate',
  },
  {
    id: 297,
    question: 'Which arrangement helps reduce energy lost in the distribution cables of a building?',
    options: [
      'Running all circuits from one board at the far end of the site',
      'Using the smallest conductor the protective device will allow',
      'Grouping many circuits together within a single containment',
      'Siting distribution boards close to the loads that they supply',
    ],
    correctAnswer: 3,
    explanation:
      'Shorter runs between the board and the load mean less conductor resistance in circuit, so less energy is wasted as heat and voltage drop is easier to satisfy, which is why load centre positioning features in energy efficiency guidance. Choosing the smallest permitted conductor does the opposite: it maximises resistance and therefore maximises the losses over the life of the installation.',
    section: '2.5',
    topic: 'Energy Efficiency',
    difficulty: 'intermediate',
  },
  {
    id: 298,
    question: 'How should the immersion heater used as backup on a solar thermal cylinder be supplied?',
    options: [
      'By its own circuit with a local double pole means of isolation',
      'From a plug and socket so the user can unplug it in summer',
      'From the same spur that feeds the solar circulating pump unit',
      'By a lighting circuit because the element is only used rarely',
    ],
    correctAnswer: 0,
    explanation:
      'An immersion heater is a continuous heating load and needs a dedicated circuit with heat resisting flex and a local double pole switch so the element can be isolated for replacement. Sharing the pump supply is the appealing shortcut on a solar job, but the pump circuit is sized for a small motor load and cannot carry the element current.',
    section: '2.2',
    topic: 'Solar Thermal',
    difficulty: 'intermediate',
  },
  {
    id: 299,
    question: 'Why does a small wind turbine need a means of isolation on the generator side as well?',
    options: [
      'Because the generator output is at extra low voltage at all times',
      'Because the rotor can turn in wind and keep the machine live',
      'Because the distributor requires two isolators at every dwelling',
      'Because the isolator provides the overcurrent protection needed',
    ],
    correctAnswer: 1,
    explanation:
      'Wind can drive the rotor whenever the turbine is free to turn, so opening the connection to the installation does not make the machine or its cables dead, and isolation has to be provided and labelled on that side too. Confusing isolation with overcurrent protection is a persistent error: an isolator makes a circuit safe to work on but does not detect or clear a fault.',
    section: '2.3',
    topic: 'Wind and Micro-Hydro',
    difficulty: 'intermediate',
  },
  {
    id: 300,
    question: 'Which change to a lighting installation reduces the energy used for the same light output?',
    options: [
      'Fitting more luminaires so that each one can be dimmed down',
      'Increasing the size of the cable feeding the lighting circuit',
      'Adding a second switch so the lights can be operated from two points',
      'Replacing tungsten halogen lamps with LED lamps of the same output',
    ],
    correctAnswer: 3,
    explanation:
      'LED lamps produce a given light output for a fraction of the power a tungsten halogen lamp needs, because far less of the input energy is wasted as heat. Two way switching is convenient and may occasionally mean lights get turned off sooner, but the control arrangement does not change how much power each lamp draws while it is switched on.',
    section: '2.5',
    topic: 'Energy Efficiency',
    difficulty: 'basic',
  },
  {
    id: 301,
    question: 'Where does an air source heat pump obtain most of the energy it delivers as heat to a dwelling?',
    options: [
      'From heat already present in the outside air',
      'From the electricity fed to its compressor',
      'From the refrigerant sealed inside the circuit',
      'From the hot water stored in the buffer vessel',
    ],
    correctAnswer: 0,
    explanation: 'A heat pump moves low grade heat from the outside air into the heating system, which is why it can deliver more heat energy than the electrical energy it consumes. The tempting wrong answer is the compressor supply: electricity does drive the cycle, but it is the smaller part of the energy delivered, not the source of most of it.',
    section: '2.4',
    difficulty: 'basic',
    topic: 'Heat Pumps',
  },
  {
    id: 302,
    question: 'On a domestic solar thermal system, what does the collector on the roof heat directly?',
    options: [
      'Air drawn through ducts in the loft space above',
      'A fluid circulating through the collector loop',
      'The cold feed pipe serving the kitchen taps',
      'A refrigerant compressed by an outdoor unit',
    ],
    correctAnswer: 1,
    explanation: 'The collector warms a heat transfer fluid, which is pumped to a coil in the cylinder and gives its heat to the stored water. Ducted air is the tempting distractor because both are described as solar heating, but a solar thermal collector on a dwelling heats a liquid loop, not the air in the roof space.',
    section: '2.2',
    difficulty: 'basic',
    topic: 'Solar Thermal',
  },
  {
    id: 303,
    question: 'What must the warning notice fixed to a PV inverter tell the person about to service it?',
    options: [
      'To disconnect the array before the AC supply',
      'To record the string voltage before starting',
      'To isolate both the AC and DC sides first',
      'To confirm the export meter has been read',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires a notice at the inverter with words to the effect that both the AC and DC sides must be isolated before servicing. Disconnecting the array first is the tempting answer because it sounds like a sequence rule, but the notice is about isolating both sides, not about the order in which it is done.',
    section: '2.8',
    difficulty: 'basic',
    topic: 'Isolation and Labelling',
  },
  {
    id: 304,
    question: 'What does a battery energy storage system allow a household with solar PV to do?',
    options: [
      'Increase the output of the solar array itself',
      'Sell energy directly to a neighbouring house',
      'Raise the voltage of the incoming supply',
      'Use generated energy later in the day',
    ],
    correctAnswer: 3,
    explanation: 'Storage shifts self generated energy from the time it is produced to the time it is needed, cutting the amount imported in the evening. Selling to a neighbour is the tempting answer because export is real, but export goes to the network under an agreement with a supplier, not directly to another property.',
    section: '2.6',
    difficulty: 'basic',
    topic: 'Battery Storage',
  },
  {
    id: 305,
    question: 'In a small wind turbine, which component converts the rotation of the blades into electrical energy?',
    options: [
      'A generator coupled to the rotor shaft',
      'An inverter at the base of the tower',
      'A charge controller housed in the turbine hub',
      'A transformer fitted at the incoming supply',
    ],
    correctAnswer: 0,
    explanation: 'The generator is the machine that turns mechanical rotation into electrical output. The inverter is the tempting choice because it is the piece of electronics most associated with renewables, but an inverter changes DC into AC that is already electrical, it does not convert rotation.',
    section: '2.3',
    difficulty: 'basic',
    topic: 'Wind and Micro-Hydro',
  },
  {
    id: 306,
    question: 'Which component of an air source heat pump raises the temperature of the refrigerant?',
    options: [
      'The expansion valve on the return leg',
      'The compressor in the outdoor unit',
      'The circulation pump on the heating flow',
      'The condenser inside the hot water cylinder',
    ],
    correctAnswer: 1,
    explanation: 'Compressing the refrigerant vapour raises both its pressure and its temperature, so it can give up heat to the heating water. The condenser is the tempting answer because that is where heat is released, but the condenser transfers heat away from refrigerant that the compressor has already raised in temperature.',
    section: '2.4',
    difficulty: 'basic',
    topic: 'Heat Pumps',
  },
  {
    id: 307,
    question: 'Whose agreement is needed before a small generator is operated in parallel with the public supply?',
    options: [
      'The electricity meter operating agent',
      'The local building control department',
      'The distribution network operator',
      'The energy supplier\'s billing department',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 notes that parallel operation of a private source with the public network is subject to authorisation by the distribution network operator, who may require particular devices. The energy supplier is the tempting answer because that is who the customer pays and who handles export payments, but the supplier does not own or control the network being connected to.',
    section: '2.3',
    difficulty: 'basic',
    topic: 'Grid Connection',
  },
  {
    id: 308,
    question: 'What is the principal environmental benefit of generating electricity from a roof mounted solar array?',
    options: [
      'It disconnects the dwelling from the grid',
      'It removes the need for an earth rod',
      'It allows the main fuse to be reduced',
      'It displaces fossil fuel generation elsewhere',
    ],
    correctAnswer: 3,
    explanation: 'Every unit generated on the roof is a unit that does not have to be produced elsewhere, so the benefit is measured in displaced generation and the emissions that go with it. Reducing the main protective device is the tempting answer because generation does reduce imported energy, but it does not reduce the demand the installation must still be designed to carry.',
    section: '2.3',
    difficulty: 'basic',
    topic: 'Renewable Technologies',
  },
  {
    id: 309,
    question: 'Which routine maintenance task is carried out on the outdoor unit of an air source heat pump?',
    options: [
      'Clearing debris from the intake and grille',
      'Topping up refrigerant in the sealed circuit',
      'Replacing the compressor at each service visit',
      'Adjusting the flow temperature setting',
    ],
    correctAnswer: 0,
    explanation: 'Airflow across the evaporator is what the unit depends on, so keeping the intake, grille and surrounding area clear is a standard service task. Topping up refrigerant is the tempting answer because it sounds like servicing, but it is restricted work on a sealed circuit and is a repair to a leak, never a routine item.',
    section: '2.4',
    difficulty: 'basic',
    topic: 'Heat Pumps',
  },
  {
    id: 310,
    question: 'Who may break into the refrigerant circuit of a heat pump to carry out work on it?',
    options: [
      'Any electrician holding a current wiring qualification',
      'A person holding refrigerant handling certification',
      'Any operative supervised by the system designer',
      'A person registered to certify domestic wiring work',
    ],
    correctAnswer: 1,
    explanation: 'Work that breaks into a circuit containing fluorinated refrigerant is restricted to personnel holding the relevant refrigerant handling certification. Registration for domestic wiring work is the tempting answer because it is the qualification an installer is most likely to hold, but it says nothing about competence with refrigerant.',
    section: '2.9',
    difficulty: 'basic',
    topic: 'F-Gas, WEEE and Sustainable Working',
  },
  {
    id: 311,
    question: 'The AC supply to a PV inverter has been isolated and locked off. How must the DC conductors be treated?',
    options: [
      'As energised only in bright daylight conditions',
      'As dead because the inverter has been isolated',
      'As energised until proved otherwise by test',
      'As dead once the array is disconnected',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires PV DC side equipment to be considered energised, so isolation, labelling, tools and PPE must all be planned on that basis until a test proves otherwise. Treating it as dead in poor light is the tempting answer because output falls, but a string can still sit at a hazardous voltage under low irradiance.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Safe Isolation',
  },
  {
    id: 312,
    question: 'A single phase inverter with an output not exceeding 16 A per phase is to export to the public network. Which connection route applies?',
    options: [
      'An exemption granted by the local building control body',
      'A full application assessed before any work is started',
      'A licence issued by the electricity market regulator',
      'The recommendation covering units up to 16 A per phase',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 refers to the network recommendations that split small generation at 16 A per phase, with the lower threshold covered by the connect and notify route. A full assessed application is the tempting answer because larger generators do need one, but that process applies above the 16 A per phase threshold, not at or below it.',
    section: '2.3',
    difficulty: 'intermediate',
    topic: 'Grid Connection',
  },
  {
    id: 313,
    question: 'What must happen automatically to a grid connected inverter if the public supply is lost or the voltage moves outside declared limits?',
    options: [
      'It must disconnect from the supply',
      'It must reduce its output by half',
      'It must switch the load to the battery',
      'It must raise its output to hold voltage',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 requires means for automatic disconnection of a generator on loss of the public supply or on voltage or frequency deviation beyond declared values, so that an unsafe island cannot form. Holding the voltage up is the tempting answer because that is what a supply is expected to do, but a generator supporting a dead network endangers anyone working on it.',
    section: '2.3',
    difficulty: 'intermediate',
    topic: 'Grid Connection',
  },
  {
    id: 314,
    question: 'Which of these heating applications falls inside the revised scope of Section 753?',
    options: [
      'An industrial furnace built to its own product standard',
      'Outdoor de-icing and frost protection heating',
      'A gas boiler serving a wet radiator system',
      'An air source heat pump serving underfloor pipework',
    ],
    correctAnswer: 1,
    explanation: 'The revised Section 753 covers embedded and surface heating systems including de-icing and frost prevention, indoors and outdoors. The heat pump is the tempting answer because underfloor heating is mentioned in the section, but Section 753 addresses electric heating units embedded in the building fabric, not a heat pump circulating warm water.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 315,
    question: 'How must a floor heating unit be connected to its cold tails?',
    options: [
      'By a plug and socket, rated for the load',
      'By a screw terminal, inside an accessible box',
      'Inseparably, for example by a crimped joint',
      'By a connector block, set into the screed',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires the heating unit to be inseparably connected to its cold tails, a crimped connection being the example given, because a joint buried in the floor cannot be re-made. A screw terminal in an accessible box is the tempting answer because it sounds like good practice, but a termination that can be undone is exactly what the regulation excludes.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 316,
    question: 'Why must heating free areas be provided in a floor or ceiling heating installation?',
    options: [
      'So the cold tails can reach the controller',
      'So the thermostat can sense room temperature',
      'So the screed can be laid to one thickness',
      'So screws can be fixed without damaging the units',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 requires areas free of heating units so that drilling and fixing by screws and the like can be carried out later without damaging them. Routing the cold tails is the tempting answer because it also concerns clear space, but the regulation is about protecting the units from future fixings, not about cable routes.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 317,
    question: 'A fire alarm panel contains a stationary standby battery. Does the new chapter on stationary secondary batteries apply to it?',
    options: [
      'No, batteries in fire systems are excluded',
      'Yes, all stationary batteries are within scope',
      'Yes, but only where the panel is in a dwelling',
      'No, unless the battery exceeds 12 V nominal',
    ],
    correctAnswer: 0,
    explanation: 'The chapter covers batteries whose designed purpose is storage and supply for the electrical installation, and it expressly excludes batteries within fire and emergency lighting systems. Assuming all stationary batteries are in scope is the tempting error, but the exclusions also cover pluggable UPS and product standard equipment.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Battery Storage',
  },
  {
    id: 318,
    question: 'Why must inrush current be considered when a prosumer installation changes operating mode?',
    options: [
      'The export meter must be re-read at each change',
      'Local storage must be able to supply the surge',
      'The array voltage rises sharply as modes change',
      'The main earthing conductor carries the surge',
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 requires the inrush current and other capabilities of local energy storage to be considered in the design, particularly when switching between operating modes, because the store may have to supply a surge the network would otherwise absorb. Re-reading the meter is the tempting answer because metering is affected by mode changes, but that is a commercial matter and not a design consideration.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
  },
  {
    id: 319,
    question: 'What does BS 7671 say a prosumer installation should be designed for where load shedding is applicable?',
    options: [
      'The manual selection of loads at the board',
      'The reconnection of shed loads in a minute',
      'The operability of the load shedding arrangement',
      'The recording of shed loads in a log book',
    ],
    correctAnswer: 2,
    explanation: 'The requirement is that, where applicable, the installation is designed for the operability of load shedding, so the means to shed load is built in rather than improvised. Manual selection at the consumer unit is the tempting answer because it sounds like shedding load, but the design duty is about a working arrangement, not about someone switching things off by hand.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
  },
  {
    id: 320,
    question: 'When assessing maximum demand for an installation with EV charging, what may be taken into account?',
    options: [
      'The diversity figure, as quoted by the charger maker',
      'The average demand, taken over the last year',
      'The supplier\'s cut out fuse rating, and nothing else',
      'Load curtailment, whether automatic or manual',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 permits load curtailment, including reduction or disconnection either automatically or manually, to be taken into account when determining maximum demand. Using last year\'s average is the tempting answer because it is real measured data, but maximum demand is about the highest coincident load the installation must carry, not the average.',
    section: '2.4',
    difficulty: 'intermediate',
    topic: 'Design and Demand',
  },
  {
    id: 321,
    question: 'Which document does BS 7671 point to for the testing, documentation and maintenance of a grid connected PV system?',
    options: [
      'BS EN 62446-1 for grid connected systems',
      'BS EN 61557-8 for insulation monitoring devices',
      'BS EN 62109-2 for inverter safety requirements',
      'BS EN 50549-1 for generator protection settings',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 cites BS EN 62446-1, covering requirements for testing, documentation and maintenance of grid connected PV systems, in the note to its PV verification requirements. BS EN 61557-8 is the tempting answer because it is also cited in the PV section, but it applies to the selection of an insulation monitoring device, not to system documentation.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Commissioning',
  },
  {
    id: 322,
    question: 'A solar thermal differential controller stops the circulating pump. Which condition has it detected?',
    options: [
      'The store has fallen below its frost setting',
      'The collector is no longer hotter than the store',
      'The collector has reached its stagnation pressure',
      'The immersion heater backup has been switched on',
    ],
    correctAnswer: 1,
    explanation: 'The controller compares a collector sensor with a cylinder sensor and runs the pump only while the collector is the hotter of the two, otherwise it would pump heat out of the store and up to the roof. Stagnation is the tempting answer because it is a real solar thermal condition, but that is a high temperature event, not the everyday reason the pump stops.',
    section: '2.2',
    difficulty: 'intermediate',
    topic: 'Solar Thermal',
  },
  {
    id: 323,
    question: 'Why does BS 7671 require RCD operation to be verified in every intended combination of supply sources?',
    options: [
      'The RCD rating changes when a source is added',
      'Each source needs its own dedicated RCD fitted',
      'Protection must remain effective in each mode',
      'Testing on mains alone voids the certificate',
    ],
    correctAnswer: 2,
    explanation: 'Commissioning must confirm that the RCDs still operate correctly with the generating set in each mode, because the path a residual current takes can change when the source changes. Assuming each source needs its own RCD is the tempting answer, but the requirement is that protection stays effective, not that devices are duplicated.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Commissioning',
  },
  {
    id: 324,
    question: 'During commissioning of a PV array, what must the installed cable current carrying capacity be compared against?',
    options: [
      'The open circuit voltage of the longest string',
      'The inverter\'s rated AC output current',
      'The rating of the AC side protective device',
      'The calculated array maximum DC current',
    ],
    correctAnswer: 3,
    explanation: 'The check is that the installed cable capacity, after any correction factors, is greater than or equal to the calculated PV array maximum DC current, and the comparison is recorded with its evidence. The inverter AC current is the tempting answer because it is the figure on the nameplate, but it does not govern the DC cabling between array and inverter.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Commissioning',
  },
  {
    id: 325,
    question: 'Which document does IET guidance direct the inspector to for periodic inspection of a grid connected PV installation?',
    options: [
      'The code of practice for grid connected solar PV',
      'The guidance note covering shock protection',
      'The code of practice for safety management',
      'The guidance note on selection and erection',
    ],
    correctAnswer: 0,
    explanation: 'Guidance Note 3 refers the reader to the IET Code of Practice for Grid-Connected Solar Photovoltaic Installations for the PV specific isolation, inverter checks and DC circuit testing that a general inspection procedure does not cover. Selection and erection guidance is the tempting answer because it deals with equipment, but it is not the document that sets out PV inspection procedure.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Inspection and Testing',
  },
  {
    id: 326,
    question: 'Why must cables passing through thermal insulation to a new heat pump circuit be considered carefully?',
    options: [
      'Insulation raises the voltage drop along the run',
      'Insulation stops the cable losing heat to the air',
      'Insulation increases the loop impedance of the circuit',
      'Insulation reduces the fault current at the far end',
    ],
    correctAnswer: 1,
    explanation: 'A cable surrounded by insulation cannot shed the heat it generates, so its current carrying capacity falls and a larger conductor may be needed. Increased voltage drop is the tempting answer because a longer or hotter cable does drop more volts, but that is a consequence of the derating, not the reason the cable must be reassessed.',
    section: '2.7',
    difficulty: 'intermediate',
    topic: 'Insulation and Building Regs',
  },
  {
    id: 327,
    question: 'Which measure limits the temperature within the zone where floor or ceiling heating units are installed?',
    options: [
      'A permanent notice, fixed at the room controller',
      'A time switch, set to short heating cycles',
      'Design, installation or protective devices',
      'An RCD, suited to the heating circuit',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires at least one of appropriate design, appropriate installation, or protective devices, to limit the temperature in the zone containing the heating units. The RCD is the tempting answer because additional protection is required for these circuits, but an RCD responds to residual current and does nothing about surface temperature.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 328,
    question: 'What is checked when a PV module is selected for an installation being commissioned?',
    options: [
      'That its warranty period exceeds the system design life',
      'That its frame is the same metal as the mounting rail',
      'That its output matches the inverter start voltage',
      'That it conforms to the relevant equipment standard',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 requires PV modules to comply with the relevant electrical equipment standard, and modules that do not should not be accepted for energisation. Matching the inverter start voltage is the tempting answer because string design does depend on it, but that is a design calculation rather than the conformity check the standard demands.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Commissioning',
  },
  {
    id: 329,
    question: 'A householder asks what they should be given when a new generating installation is handed over. What is the correct answer?',
    options: [
      'Certification, product data and operating notes',
      'A copy of the connection agreement, and nothing else',
      'A schedule of test results, and nothing further',
      'The installer\'s insurance details, plus a service booking',
    ],
    correctAnswer: 0,
    explanation: 'The user needs the certification for the work, the manufacturer documentation for the equipment, and information on how the system is operated and isolated, because they cannot maintain what they do not understand. The schedule of test results alone is the tempting answer because it is the most technical document, but on its own it tells the user nothing about operating the system.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Commissioning',
  },
  {
    id: 330,
    question: 'Which condition must be satisfied before a DC device with no load breaking capacity is used in a PV string?',
    options: [
      'It must be rated at twice the voltage',
      'It must not be openable while carrying load',
      'It must be fitted downstream of the inverter',
      'It must be tested at each periodic inspection',
    ],
    correctAnswer: 1,
    explanation: 'A device without breaking capacity must be arranged so it cannot be opened while carrying current, because a DC arc drawn across it will not self extinguish as an AC arc would. Doubling the voltage rating is the tempting answer because ratings do matter, but a higher voltage rating does not give a device the ability to break load.',
    section: '2.1',
    difficulty: 'intermediate',
    topic: 'Solar PV',
  },
  {
    id: 331,
    question: 'Where an insulation monitoring device is a separate unit rather than part of the inverter, which standard governs its selection?',
    options: [
      'BS EN 62446-1, the PV system testing standard',
      'BS EN 62109-2, the inverter safety standard',
      'BS EN 61557-8, the standard for such devices',
      'BS EN 50549-1, the generator connection standard',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires a standalone insulation monitoring device to be selected in accordance with BS EN 61557-8, and the installer follows its thresholds, accuracy classes and operating ranges. The inverter safety standard is the tempting answer because it is cited in the same regulation, but it applies only where the monitoring function is integral to the inverter.',
    section: '2.1',
    difficulty: 'intermediate',
    topic: 'Solar PV',
  },
  {
    id: 332,
    question: 'An installer proposes to protect PV DC busbars in a plant room by placing them out of reach. Is that acceptable?',
    options: [
      'No, unless the busbars are also fully insulated',
      'Yes, provided the room is locked and signed',
      'Yes, where the height exceeds two point five metres',
      'No, that measure is prohibited in this section',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 imposes an unconditional prohibition on obstacles and placing out of reach within this part of the standard, so an installation relying on them alone is non compliant regardless of site conditions. A locked and signed room is the tempting answer because access control is genuine good practice, but it does not make a prohibited protective measure permissible.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 333,
    question: 'Why does BS 7671 require warning notices at PV DC combiner boxes and distribution boards?',
    options: [
      'Live parts may remain energised after isolation',
      'The enclosures carry a higher fault current',
      'The boards are outside periodic testing',
      'The connectors are not covered by a standard',
    ],
    correctAnswer: 0,
    explanation: 'The notice warns anyone opening a DC access point that parts inside may still be live after the installation has apparently been isolated, and its presence should be recorded on the certification. A higher fault current is the tempting answer because DC does behave differently, but the hazard the notice addresses is unexpected energisation, not fault level.',
    section: '2.1',
    difficulty: 'basic',
    topic: 'Solar PV',
  },
  {
    id: 334,
    question: 'A verifier finds a PV array with no warning notice at the combiner box. What is the correct position before energisation?',
    options: [
      'The array may be energised and labelled later',
      'The notice is a condition of acceptance',
      'The notice is needed only on outdoor arrays',
      'The notice may be replaced by a certificate entry',
    ],
    correctAnswer: 1,
    explanation: 'A permanent warning notice at each DC access point is required before energisation or commissioning of DC side equipment with access to live parts, so its absence is a reason to hold off. Recording it on the certificate is the tempting answer because the certificate does record the notice, but the record evidences the notice rather than substituting for it.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Inspection and Testing',
  },
  {
    id: 335,
    question: 'Which BS 7671 chapter sets requirements for an installation that includes local production or storage of energy?',
    options: [
      'The chapter covering energy efficiency',
      'The chapter covering stationary batteries',
      'The chapter covering prosumer installations',
      'The chapter covering generating sets',
    ],
    correctAnswer: 2,
    explanation: 'The new prosumer chapter gives additional requirements, measures and recommendations for the design, erection and verification of low voltage installations that include local production or storage. The battery chapter is the tempting answer because storage is mentioned in both, but it addresses the battery installation itself rather than the whole installation\'s behaviour as a prosumer.',
    section: '2.6',
    difficulty: 'basic',
    topic: 'Prosumer Installations',
  },
  {
    id: 336,
    question: 'Loop impedance readings in a prosumer installation are unreliable because of inverter equipment on site. What does BS 7671 require?',
    options: [
      'The circuit to be re-tested at the origin',
      'The readings to be recorded with a tolerance',
      'The inverter to be re-tested every time',
      'An alternative method of determining the values',
    ],
    correctAnswer: 3,
    explanation: 'Where the validity of readings from a loop impedance instrument may be adversely affected by power converting equipment, an alternative method of determining prospective fault current and earth fault loop impedance must be used. Testing at the origin is the tempting answer because it removes some equipment from the loop, but it does not give the value for the circuit being verified.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
  },
  {
    id: 337,
    question: 'When selectivity is assessed in a prosumer installation, which factors must the designer take into account?',
    options: [
      'Fault location, source combinations and operating modes',
      'Fault location, and the manufacturer\'s stated let through only',
      'Cable length, ambient temperature and grouping factors',
      'Ambient temperature, mode of operation and cable route',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 requires selectivity to be considered for all possible fault currents depending on the location of the fault, the combinations of supplies connected, and the operating modes in use. Cable and environment factors are the tempting answer because they do affect design, but they govern current carrying capacity rather than which device operates first.',
    section: '2.6',
    difficulty: 'advanced',
    topic: 'Prosumer Installations',
  },
  {
    id: 338,
    question: 'Why does BS 7671 raise surge protection specifically in relation to prosumer installations?',
    options: [
      'Inverters cannot withstand any transient',
      'Switching overvoltages may be more frequent',
      'Local generation always raises the voltage',
      'Storage is exempt from impulse ratings',
    ],
    correctAnswer: 1,
    explanation: 'The standard notes that switching overvoltages in such an installation may be more frequent and perhaps greater than elsewhere, so surge protective devices are to be considered for the installation and its equipment. Saying inverters withstand no transient is the tempting overstatement, but equipment does have an impulse withstand rating and the point is that it is stressed more often.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
  },
  {
    id: 339,
    question: 'In a prosumer installation, how does BS 7671 treat an electric vehicle that can export energy back to the premises?',
    options: [
      'As an item of equipment, outside the prosumer chapter',
      'As a fixed generator, wired straight to the board',
      'As a load and a local store, not permanent',
      'As a standby supply, used during an outage',
    ],
    correctAnswer: 2,
    explanation: 'The standard treats such a vehicle as a particular case of a load and a local storage unit that is not expected to be permanently connected, and requires its charging equipment to be managed by the energy management system. Treating it as a fixed generator is the tempting answer because it does export, but a vehicle comes and goes and cannot be relied on as fixed generation.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
  },
  {
    id: 340,
    question: 'A designer must set the anti islanding, voltage and frequency protection for a domestic micro generator. Which standard applies?',
    options: [
      'BS EN 62109-2 for the protection settings',
      'BS EN 62446-1 for the protection settings used',
      'BS EN 61557-8 for the protection settings',
      'BS EN 50549-1 for the protection settings',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 requires the anti islanding, voltage and frequency protection settings of a micro generator to be configured in accordance with BS EN 50549-1. BS EN 62446-1 is the tempting answer because it appears in the same PV context, but it governs testing, documentation and maintenance rather than protection settings.',
    section: '2.3',
    difficulty: 'intermediate',
    topic: 'Grid Connection',
  },
  {
    id: 341,
    question: 'Which situation triggers the requirement for a suitable protective device under the redrafted parallel operation rules?',
    options: [
      'Energy flow through the circuit is bidirectional',
      'The generator is rated above sixteen amperes',
      'The installation has more than one distribution board',
      'The source is fed from a separate earthing arrangement',
    ],
    correctAnswer: 0,
    explanation: 'The redrafted regulation adds an indent requiring a suitable protective device wherever energy flow is bidirectional, which captures export capable inverters and charging and discharging battery systems. The sixteen ampere figure is the tempting answer because it is a real threshold, but it governs the network connection route rather than the protective device requirement.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Battery Storage',
  },
  {
    id: 342,
    question: 'A battery inverter is to be connected on the load side of an existing RCD. What does BS 7671 now say?',
    options: [
      'The connection is permitted with any RCD type',
      'A prohibition applies under stated conditions',
      'The connection is always prohibited without exception',
      'The RCD must be uprated to sixty milliamperes',
    ],
    correctAnswer: 1,
    explanation: 'The redrafted regulation adds an indent prohibiting connection of a source on the load side of an RCD where the stated conditions apply, so the installer must read the conditions rather than assume either extreme. Treating it as an absolute ban is the tempting error, because the prohibition is conditional and not universal.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Isolation and Labelling',
  },
  {
    id: 343,
    question: 'Which application does the revised Section 753 expressly exclude from its requirements?',
    options: [
      'Ceiling heating units embedded above a plasterboard',
      'Outdoor pipe trace heating on an exposed roof',
      'Industrial heating to its own product standards',
      'Frost protection heating in an unheated storeroom',
    ],
    correctAnswer: 2,
    explanation: 'Industrial and commercial heating systems complying with their own product standards are outside the scope, while de-icing, frost prevention and embedded surface heating are inside it. Outdoor trace heating is the tempting answer because the equipment looks industrial, but the section applies to indoor and outdoor systems alike.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 344,
    question: 'May double or reinforced insulation be relied on as the sole protective measure for a wall heating system?',
    options: [
      'No, unless the wall is finished in plaster',
      'Yes, where the units meet the requirements',
      'Yes, provided the circuit has an RCD fitted',
      'No, that use is not permitted for wall heating',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 does not permit double or reinforced insulation as the sole protective measure for a wall heating system, although it does permit it for floor and ceiling units that meet the relevant general requirements. Assuming the general requirements rescue the wall case is the tempting error, because the wall prohibition is stated separately and absolutely.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 345,
    question: 'To what temperature must measures limit the zone containing floor or ceiling heating units?',
    options: [
      'A maximum of 80 degrees Celsius',
      'A maximum of one hundred degrees Celsius',
      'A maximum of 90 degrees Celsius',
      'A maximum of 60 degrees Celsius',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 requires design, installation or protective devices, singly or together, to limit the temperature in the zone to a maximum of 80 degrees Celsius. Seventy is the tempting answer because it is the familiar conductor operating temperature for general purpose thermoplastic cable, but that figure has nothing to do with the heating zone limit.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 346,
    question: 'Which standard does BS 7671 require a heating cable to comply with?',
    options: [
      'BS EN 60335-2-96 for heating cables',
      'IEC 60800 for heating cables',
      'BS EN 62395 for heating cables',
      'BS EN 60519 for heating cables',
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 requires heating cables to comply with IEC 60800, while flexible sheet heating elements are required to comply with BS EN 60335-2-96. Confusing the two is the tempting error, because both standards appear in the same regulation but they apply to different products.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Heating Systems',
  },
  {
    id: 347,
    question: 'Why does BS 7671 require external influences to be assessed for the wiring of a heating installation?',
    options: [
      'So the installation can be certified unseen',
      'So the cable can be uprated for the ambient',
      'So safety is not impaired over its service life',
      'So the manufacturer\'s warranty can be extended',
    ],
    correctAnswer: 2,
    explanation: 'The requirement is that wiring systems are chosen and installed so that influences such as mechanical damage, moisture, corrosion, heat, ultraviolet radiation and chemical attack do not impair safety or functioning across the expected service life. Uprating for ambient temperature is the tempting answer because it is one influence, but it is a single factor rather than the purpose of the assessment.',
    section: '2.7',
    difficulty: 'basic',
    topic: 'External Influences',
  },
  {
    id: 348,
    question: 'Which stationary battery installations does the new battery chapter of BS 7671 not apply to?',
    options: [
      'Those charged only from a photovoltaic array',
      'Those installed in a garage attached to a dwelling',
      'Those with a nominal voltage below fifty volts DC',
      'Those inside products covered by other standards',
    ],
    correctAnswer: 3,
    explanation: 'The chapter excludes batteries incorporated into products covered by product safety standards, pluggable UPS systems, fire and emergency lighting systems, and central safety power supplies to their own standards. A voltage threshold is the tempting answer because extra low voltage limits appear elsewhere in the standard, but the exclusions here are by product type, not by voltage.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Battery Storage',
  },
  {
    id: 349,
    question: 'A PME earthing facility is proposed as the means of earthing for an outdoor charge point. What does BS 7671 require?',
    options: [
      'One of the listed alternatives instead',
      'A second bond to the water service pipe',
      'A separate consumer unit fed from the same origin',
      'A notice at the origin recording the arrangement',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 states that the PME facility shall not be used as the means of earthing for the protective conductor contacts of an outdoor charging point unless one of the listed alternatives is implemented. A notice is the tempting answer because labelling duties do apply here, but a label does nothing about the open PEN hazard the regulation addresses.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 350,
    question: 'Where an earth electrode is used for a charge point, what voltage limit must it hold under an open PEN fault?',
    options: [
      '50 volts RMS between the earthing terminal and Earth',
      '70 volts RMS between the earthing terminal and Earth',
      '25 volts RMS between the earthing terminal and Earth',
      '120 volts RMS between the earthing terminal and Earth',
    ],
    correctAnswer: 1,
    explanation: 'The annex guidance supports calculating the maximum electrode resistance needed to keep the voltage between the main earthing terminal and Earth within 70 volts RMS under an open PEN fault. Fifty volts is the tempting answer because it is the familiar touch voltage limit elsewhere in the standard, but it is not the figure used for this calculation.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 351,
    question: 'Which voltage must a PEN fault detection device for a charge point measure?',
    options: [
      'Between the protective conductor and the earthing terminal',
      'Between the circuit protective conductor and neutral',
      'Between the circuit protective conductor and Earth',
      'Between the incoming line conductor and the neutral',
    ],
    correctAnswer: 2,
    explanation: 'The device must measure between the circuit protective conductor of the charging equipment and Earth, because during a PEN failure the neutral can no longer be treated as reliably connected to Earth. Measuring to neutral is the tempting answer because it looks like a supply voltage check, but the standard states that this arrangement does not give equivalent safety.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 352,
    question: 'A dwelling has a PV array, a home battery and an EV charge point. How is the installation governed?',
    options: [
      'By the EV section alone, as it is the largest',
      'Entirely by the section covering PV work',
      'Entirely by the chapter covering batteries',
      'Each by its own section and the prosumer chapter',
    ],
    correctAnswer: 3,
    explanation: 'The PV, storage and charging elements each attract their own requirements, and the installation as a whole is a prosumer installation because it produces and stores energy locally. Applying one section to everything is the tempting shortcut, but it leaves the interaction between the sources unaddressed, which is precisely what the prosumer chapter covers.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
  },
  {
    id: 353,
    question: 'Which standard is cited for a residual direct current detecting device used with mode 3 EV charging?',
    options: [
      'BS IEC 62955 for detecting devices',
      'BS EN 62423 for type F and B devices',
      'BS EN 61557-8 for monitoring devices',
      'BS EN 50549-1 for connection devices',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 links BS IEC 62955, covering residual direct current detecting devices for mode 3 charging, to the EV charging protection requirements. BS EN 62423 is the tempting answer because it is cited in the same regulation, but it covers type F and type B residual current devices rather than the detecting device itself.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 354,
    question: 'Under what condition may a live conductor on the DC side of a PV inverter be bonded?',
    options: [
      'Whenever the array frame is bonded to the same point',
      'Only where the stated separation conditions are met',
      'Whenever the inverter is rated below four kilowatts',
      'Only where the array is mounted at ground level',
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 sets conditions for functional bonding on the DC side, covering galvanic isolation, transformer windings, single point bonding, and the position of the bond relative to the disconnection and connection means. Bonding the frame is the tempting answer because it is a real requirement, but frame bonding is a protective measure and does not authorise bonding a live DC conductor.',
    section: '2.1',
    difficulty: 'intermediate',
    topic: 'Solar PV',
  },
  {
    id: 355,
    question: 'An electrician has isolated the AC supply and pulled the DC isolator at a PV inverter. Has safe isolation been achieved?',
    options: [
      'Yes, provided the array is covered while working',
      'Yes, both sides of the inverter have been isolated',
      'No, the DC side must still be proved dead by test',
      'No, unless the array frame bonding is disconnected',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 states that safe isolation is not satisfied merely by disconnecting the AC side or by disconnecting the inverter from the DC side, so the conductors must be proved dead or continue to be treated as live. Covering the array is the tempting answer because it reduces output, but it does not prove the conductors are dead.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Safe Isolation',
  },
  {
    id: 356,
    question: 'A generating installation may run in parallel with the public supply. What must be verified before it is placed in service?',
    options: [
      'The ambient temperature, measured at the generator',
      'The customer\'s export tariff, and meter registration only',
      'Insulation resistance, on the final circuits only',
      'Synchronising, protection, earthing and interconnection',
    ],
    correctAnswer: 3,
    explanation: 'Verification must confirm that the arrangements for parallel operation are installed and correctly commissioned, covering synchronisation controls, protective device settings, earthing continuity and correct interconnection. Insulation resistance is the tempting answer because it is a standard test, but on its own it says nothing about whether parallel operation is safe.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Commissioning',
  },
  {
    id: 357,
    question: 'Which harmonised document does BS 7671 refer the reader to on the functional energy efficiency of an installation?',
    options: [
      'BS HD 60364-8-1 on functional aspects',
      'BS EN 62446-1 on PV system documentation',
      'BS EN 50549-1 on generator connection',
      'BS EN 61557-8 on monitoring equipment',
    ],
    correctAnswer: 0,
    explanation: 'The energy efficiency chapter refers the reader to the Building Regulations and to BS HD 60364-8-1 on low voltage installations, functional aspects, energy efficiency. BS EN 62446-1 is the tempting answer because it also concerns performance of a generating installation, but it deals with testing and documentation of PV systems.',
    section: '2.5',
    difficulty: 'intermediate',
    topic: 'Energy Efficiency',
  },
  {
    id: 358,
    question: 'A customer asks why an installation with a battery cannot simply keep the lights on during a network outage. What is the correct explanation?',
    options: [
      'A battery cannot supply a load, unaided by the network',
      'Islanding must be designed in, or supplies trip',
      'The inverter must import first, then export',
      'The network operator switches it off, remotely',
    ],
    correctAnswer: 1,
    explanation: 'Unless the installation is designed and protected to run as an island, all local supplies must disconnect automatically when the network is dead, so the battery sits idle. Saying the operator switches it off is the tempting answer because network consent is genuinely involved, but the disconnection is an automatic function of the installation, not a remote action.',
    section: '2.6',
    difficulty: 'intermediate',
    topic: 'Prosumer Installations',
  },
  {
    id: 359,
    question: 'A heat pump is added and the calculated maximum demand now exceeds the existing supply capacity. What is the correct response?',
    options: [
      'Fit the heat pump on its own consumer unit',
      'Apply more diversity to the design current',
      'Consult the network operator about capacity',
      'Install a larger main switch in the board',
    ],
    correctAnswer: 2,
    explanation: 'If demand exceeds what the supply can carry, the supply itself is the constraint, so the network operator has to be consulted about upgrading it or about a curtailment arrangement. Fitting a larger main switch is the tempting answer because it removes an obvious bottleneck inside the installation, but it does nothing about the cut out, service cable or network capacity.',
    section: '2.4',
    difficulty: 'intermediate',
    topic: 'Design and Demand',
  },
  {
    id: 360,
    question: 'Which record should be kept from a PV commissioning visit so a later inspector can judge whether output has fallen?',
    options: [
      'The date the network operator was first notified',
      'The invoice value of the modules used',
      'The serial number of the generation meter only',
      'String test results with the irradiance',
    ],
    correctAnswer: 3,
    explanation: 'String measurements mean nothing without the conditions they were taken in, so recording irradiance alongside the readings is what makes a later comparison possible. The meter serial number is the tempting answer because it is a genuine handover record, but it identifies equipment rather than describing performance.',
    section: '2.8',
    difficulty: 'intermediate',
    topic: 'Inspection and Testing',
  },
  // ============================================
  // Section 2.8/2.6/2.5/2.3 — ADVANCED tranche, authored 2026-08-27 (ids 361-368)
  //
  // Written because a difficulty audit found this bank could defend only 5
  // genuinely advanced questions against a Level 3 draw of 15 per paper. It had
  // 133 questions and not one that asked the candidate to DO anything.
  //
  // Grounded in the unit's own ACs, which are all "describe/state/specify" —
  // 2365-03 u301 3.1 (installation and commissioning considerations), 3.2
  // (maintenance), 2.1 (Building Regs and other statutory requirements) and
  // 2357 u602 3.2 (applications and LIMITATIONS). There is no calculation
  // requirement anywhere in this unit, so demand here comes from limitations,
  // commissioning decisions and places where two requirements collide — not
  // from arithmetic, which would be off-syllabus.
  //
  // Every regulation below was read from bs7671_facets (A4:2026) before use.
  // ============================================
  {
    id: 361,
    question:
      'A PV array uses plug-and-socket d.c. connectors between the string and the inverter that are not rated to break load current. What does BS 7671 require for those connectors?',
    options: [
      'They must be secured against inadvertent or unauthorised operation, either by padlocking them or by placing them in a lockable enclosure',
      'They must be replaced with a d.c. switch-disconnector whose breaking capacity is at least the array short-circuit current, before energising',
      'They may remain as fitted, provided a durable label beside them warns that they must not be separated while the array is illuminated',
      'They must be interlocked with the a.c. switch-disconnector, so that the d.c. side cannot be opened while the inverter is synchronised',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.537.2.2.104, "Measures to prevent DC on-load interruption", applies to any device that could be used to open a d.c. circuit but has no breaking capacity. The requirement is to SECURE it — by padlocking, or by locating it in a lockable space or enclosure — so it cannot be operated inadvertently or without authority. Note what the regulation does not say: it does not require the connector to be replaced, and a warning label on its own does not satisfy it. A d.c. arc has no zero crossing to extinguish it, which is why separating a live d.c. connector is so much more dangerous than it looks.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'Solar PV',
  },
  {
    id: 362,
    question:
      'An inverter has been isolated at its a.c. switch-disconnector so a fault can be investigated. Why does BS 7671 still require a warning notice fixed to that inverter?',
    options: [
      'Because the d.c. side stays live whenever the array is illuminated, so both a.c. and d.c. must be isolated before servicing',
      'Because the a.c. switch-disconnector may not break the neutral conductor, so the inverter enclosure can rise to supply potential',
      'Because the d.c. link capacitors hold a charge after isolation, and the notice states the discharge time to wait',
      'Because the notice carries the distributor reference, issued when the generator was accepted for parallel operation',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.514.103 requires a warning notice on all inverters, with words similar to "WARNING Isolate both AC and DC sides before servicing". Isolating the a.c. side does nothing to the array: as long as there is light on the modules the string is generating, and the d.c. conductors into the inverter stay live. Capacitor discharge is a real hazard and worth respecting, but it is not what this regulation is about.',
    section: '2.6',
    difficulty: 'advanced',
    topic: 'Isolation and Labelling',
  },
  {
    id: 363,
    question:
      'A single-phase domestic PV installation is being uprated from 3.68 kW to 5.5 kW. What does that change about how it may be connected?',
    options: [
      'It rises above 16 A per phase, so it moves from ENA G98 to G99 and needs the distributor to approve the connection first',
      'It stays within G98, because the threshold is set by the export limit configured in the inverter rather than its rated output',
      'It moves from G99 to G98, because a larger installation qualifies for the simplified connect-then-notify arrangement',
      'Nothing changes, because both G98 and G99 allow connection first, with notification to the distributor afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'NOTE 1 to Section 551 points to ENA Engineering Recommendation G98 for generation up to and including 16 A per phase, and G99 above it. At 230 V, 16 A is about 3.68 kW — which is exactly why so many domestic systems are specified at that figure. Going to 5.5 kW crosses the boundary, and the practical consequence is the part that matters: G98 is connect-and-notify, whereas G99 requires the distributor to assess and approve before the connection is made. Parallel operation with the public network is subject to distributor authorisation either way.',
    section: '2.3',
    difficulty: 'advanced',
    topic: 'Grid Connection',
  },
  {
    id: 364,
    question:
      'An EV charge point is being added to a TN-C-S (PME) supply. Which protective provision against an open PEN conductor is no longer available in BS 7671:2018+A4:2026?',
    options: [
      'An earth electrode whose resistance, added to that of its protective conductor, satisfies the condition stated in the regulation',
      'Main protective bonding sized for PME conditions, relied upon on its own as the protective provision for the charging point',
      'A device that opens all live conductors when it detects a line-to-earth voltage outside the permitted range, and holds them open',
      'Supplying the charging equipment from a TT arrangement, with an earth electrode independent of the supply earth',
    ],
    correctAnswer: 1,
    explanation:
      'Indent (a) of Regulation 722.411.4.1 — the main-bonding route — has been deleted. What remains is the earth-electrode condition at indent (b), where the sum of the electrode resistance and that of its protective conductor must satisfy the stated condition, open-PEN voltage detection that disconnects all live conductors, and supplying the point as TT. A4:2026 also adds a further alternative at indent (iv), and the Annex to Part 722 has been redrafted with guidance on indent (c). This is the trap: a designer working from an older copy still reaches for main bonding, and it is no longer on the list.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 365,
    question:
      'Electric floor heating must be limited to a maximum of 80 °C. Which of these does BS 7671 accept as a means of achieving that limit?',
    options: [
      'A 30 mA RCD on the heating circuit, arranged to disconnect the supply before the floor reaches the limiting temperature',
      'Appropriate design, appropriate installation, or protective devices, applied within the zone containing the heating units',
      'A thermal cut-out mounted at the distribution board, remote from the heated zone but wired on the same final circuit',
      'A floor sensor and thermostat, which the Regulations identify as the single acceptable means of limiting the temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 753.424.201 gives three routes to the 80 °C limit and treats them as alternatives: (a) appropriate design of the heating system, (b) appropriate installation, and (c) protective devices. All three must be applied within the zone where the heating units are installed, which is what rules out a device sited back at the board. An RCD is not one of them — it responds to residual current, not to temperature, and will let a floor overheat quite happily.',
    section: '2.5',
    difficulty: 'advanced',
    topic: 'Heating Systems',
  },
  {
    id: 366,
    question:
      'A PV installation has an unearthed d.c. array and requires insulation monitoring. Which standard must the monitoring device conform to?',
    options: [
      'BS EN 61557-2, the standard covering insulation resistance measuring equipment used for periodic testing',
      'BS EN 62446-1, which sets out documentation, commissioning tests and inspection for grid-connected PV',
      'BS EN 61557-8, or BS EN 62109-2 where the monitoring function is built into the inverter itself',
      'BS EN 60364-7-712, the international standard from which BS 7671 Section 712 is derived',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 712.538.101 calls for an insulation monitoring device conforming to BS EN 61557-8. Where the inverter provides that function internally rather than a separate device doing it, the inverter function may conform to BS EN 62109-2 instead. BS EN 61557-2 is a real standard but it covers the insulation resistance tester you carry, not a permanently installed monitor, and BS EN 62446-1 covers PV commissioning documentation.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'Solar PV',
  },
  {
    id: 367,
    question:
      'A dwelling with solar PV and battery storage is having an EV charge point installed. What does A4:2026 require the designer to take into account that would not arise in a house without generation?',
    options: [
      'That the premises is a prosumer installation, so import, export and protective device coordination must be assessed together',
      'That the charge point must be supplied from a dedicated consumer unit, kept separate from the one feeding the battery inverter',
      'That the charge point must be de-rated by 20 per cent, because the battery raises the prospective fault current at the origin',
      'That the earthing arrangement must be converted to TT, because local generation is incompatible with a PME earthing facility',
    ],
    correctAnswer: 0,
    explanation:
      'A4:2026 updated Section 722 to refer to prosumer electrical installations — premises that both generate and consume. Where local generation or storage is present, the design has to account for the interaction: what the installation imports and exports, and how protective devices coordinate when the source of a fault current may be the battery or the inverter rather than the distributor. None of the other three is a BS 7671 requirement. Local generation does not by itself force a dedicated consumer unit, a de-rating, or a change of earthing arrangement.',
    section: '2.6',
    difficulty: 'advanced',
    topic: 'Prosumer Installations',
  },
  {
    id: 368,
    question:
      'On the d.c. side of a PV inverter, under what condition does BS 7671 permit a live conductor to be connected to earth?',
    options: [
      'Where there is at least simple separation between the a.c. and d.c. sides, with the connection made at a single point',
      'Where the array open-circuit voltage stays below 120 V d.c., so the system falls outside the scope of Section 712',
      'Where the inverter is transformerless, because the absence of a transformer removes any circulating current path',
      'Never, because earthing a live conductor on the d.c. side defeats the insulation monitoring the section requires',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.542.102 sets out when a live conductor of the d.c. side may be bonded, and the conditions turn on galvanic isolation — separation between the a.c. and d.c. sides provided by transformer windings — together with the bonding being made at a single point, and positioned correctly relative to the disconnection and d.c. connection means. A transformerless inverter has no such separation, which is why it is the wrong answer here rather than the right one.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'Solar PV',
  },
  // ============================================
  // Section 2.8/2.5 — ADVANCED tranche, authored 2026-08-27 (ids 369-376)
  //
  // Second pass on the same hole. Deliberately avoids the eight subjects at
  // 361-368 and everything already answered elsewhere in the bank: Chapter 57
  // scope, 551.7.1(d), the wall-heating prohibition, load curtailment, the
  // obstacles prohibition and the heating-element product standards are all
  // taken, several of them twice.
  //
  // ACs served, all "describe/state/specify" as before, so the demand comes
  // from limitations and commissioning decisions rather than arithmetic:
  // 2365-03 u301 3.1 (installation and commissioning considerations) for
  // 369-375, 3.2 (maintenance requirements) for 376, with 2357 u602 3.2
  // (applications and limitations) underneath the lot.
  //
  // Every regulation below was read from bs7671_facets (A4:2026) before use.
  // ============================================
  {
    id: 369,
    question:
      'A PV string cable is clipped along the underside of the modules and sits in direct contact with the module backing. What ambient temperature must be used to design and size that cable?',
    options: [
      'At least 70 °C',
      'The 30 °C reference ambient used by the current-carrying capacity tables',
      'The highest shade air temperature recorded for the region in the year',
      'The 90 °C rating of the thermosetting insulation the cable is made from',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.523.101 is explicit: for the design and sizing of cables subjected to direct heating of the underside of the PV module the ambient temperature shall be considered to be at least equal to 70 °C. The 30 °C answer is the tempting one because a roof feels like the most ventilated place a cable will ever run, and 30 °C is what the tables assume. But a cable pressed against the back of a module is not sitting in the air, it is sitting in the module, and sizing on 30 °C leaves it badly undersized on the hottest days of the year. The 90 °C figure is a different quantity again: it is what the insulation can withstand, not what the surroundings do to the conductor.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'Solar PV',
  },
  {
    id: 370,
    question:
      'What does BS 7671 require of the electrical equipment on the d.c. side of a PV installation up to the d.c. connection means of the inverter?',
    options: [
      'That it be Class II throughout or provide an equivalent standard of insulation',
      'That it be Class I with every exposed-conductive-part taken to the main earthing terminal',
      'That it be protected by a residual current device of Type B rated at 30 mA',
      'That it be contained within an earthed metallic enclosure of at least IP2X',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.412.101 requires the equipment on the d.c. side, as far as the d.c. connection means of the inverter, to be Class II or have equivalent insulation. Earthing everything is the instinctive answer because that is exactly what you do on the a.c. side, and it feels like the more cautious choice. It is the wrong strategy here. There is no protective device on the d.c. side that will clear an earth fault the way an MCB does downstream of the inverter, and the array is at working voltage for as long as there is light on it, so the approach is to stop a fault ever reaching a touchable part rather than to detect it and disconnect. Regulation 712.410.3.6 closes off the other obvious routes by ruling out non-conducting location and earth-free local equipotential bonding.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'Solar PV',
  },
  {
    id: 371,
    question:
      'How does Section 712 say the d.c. string cabling and any equipotential bonding conductor should be arranged in order to limit the voltages induced in a PV array by lightning?',
    options: [
      'With the loop areas kept as small as possible and the d.c. cables and the bonding conductor running side by side',
      'With the bonding conductor separated as far as possible from the d.c. cables so the two cannot couple',
      'With the positive and the negative string conductors taken apart along opposite sides of the array frame',
      'With the surplus cable coiled at the inverter end so that no slack is left within the array itself',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 712.521.102 advises that to minimise induced voltages due to lightning the area of all loops should be as small as possible, particularly for the cabling of PV strings, and that the d.c. cables and any equipotential bonding conductor should run side by side. Separating them is the confident wrong answer, borrowed from the habit of segregating power from data. The mechanism here is nothing to do with the two cables interfering with each other. It is the area of the loop the conductors enclose, because that is what a nearby strike drives a voltage into, and running them together is what makes the loop small. Splitting the positive from the negative, or coiling the slack, are the same mistake in more obvious forms.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'Solar PV',
  },
  {
    id: 372,
    question:
      'A charge point is being added in a house on a TN-C-S supply. What does BS 7671 require of the circuit supplying the charging equipment?',
    options: [
      'That the circuit supplying the charging equipment does not include a PEN conductor',
      'That it originate at a distribution board reserved for the charging equipment alone',
      'That its protective conductor go to an earth electrode rather than to the main earthing terminal',
      'That it be wired throughout in a cable having a concentric protective conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 722.312.2.1 states that in a TN system a circuit supplying charging equipment for electric vehicles shall not include a PEN conductor. In a TN-C-S installation the combined conductor ends at the supply terminal, so the charge point circuit has to be picked up where line, neutral and protective conductors are already separate. This is not the same rule as the open-PEN provisions of Regulation 722.411.4.1, and candidates who know those well are the ones most likely to assume the PEN question has already been dealt with. Those provisions address the distributor\'s PEN failing upstream. This one is about not carrying a combined conductor into the charge point circuit in the first place, which is why the concentric cable answer is wrong: a concentric protective conductor is a PEN under another name.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 373,
    question:
      'On what basis does Section 722 allow the circuit supplying EV charging equipment to be installed without an arc fault detection device?',
    options: [
      'Where the charging equipment conforms to the BS EN 61851 series and its socket-outlets or vehicle connectors conform to BS EN IEC 62196-2',
      'Where the circuit is already protected by a residual current device of Type B rated at 30 mA',
      'Where the charging equipment is mounted outdoors and an arc could not reach the fabric of the building',
      'Where the charging equipment is tethered so that no socket-outlet is exposed to the user at all',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 722.421.1.7.201 states that AFDDs are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series and incorporating socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2. Both halves have to be satisfied, so if you cannot establish conformity from the marking, the datasheet or the declaration of conformity, you do not have the exemption and should treat the AFDD as required. The RCD answer is the tempting one because a Type B device genuinely is required for EV charging, so it feels like the protection is already covered. It is not the same job. An RCD watches for current going astray to earth and an AFDD watches for the signature of an arc, and neither has ever substituted for the other. Note also that the wording is "not required" rather than "not permitted", so an installer may still choose to fit one.',
    section: '2.8',
    difficulty: 'advanced',
    topic: 'BS 7671 Special Locations',
  },
  {
    id: 374,
    question:
      'A heating unit is to be installed in a concrete floor in a dry living room. What minimum degree of ingress protection does BS 7671 require of that unit?',
    options: [
      'IPX7 as well as mechanical properties appropriate to burial in a concrete floor',
      'IPX1 which is the degree required for heating units installed in ceilings',
      'IPX4 because the room is dry and neither jets nor immersion are foreseeable',
      'None is specified because the screed over the unit already excludes water from it',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 753.512.2.5 sets two different figures. Heating units for installation in ceilings shall have a degree of protection of not less than IPX1, while heating units for installation in a floor of concrete or similar material shall be not less than IPX7 and shall have the appropriate mechanical properties. IPX7 is protection against temporary immersion, which looks extravagant for a dry living room right up to the moment you remember what a floor unit is buried in: wet screed poured over the top of it, and then every wash of the floor for the rest of its life. Reasoning from how dry the room is gets the wrong answer because the rating is set by the construction the unit sits in, not by the use of the room. The mechanical half of the requirement carries equal weight, since the unit is under a trafficked floor.',
    section: '2.5',
    difficulty: 'advanced',
    topic: 'Heating Systems',
  },
  {
    id: 375,
    question:
      'A proposed underfloor heating layout would run one heating unit across an expansion joint in the floor slab. What does BS 7671 require?',
    options: [
      'That the unit does not cross the joint at all',
      'That the unit may cross the joint where it is sleeved in flexible conduit through it',
      'That the unit may cross the joint provided the cold tail rather than the heating element spans it',
      'That the unit may cross the joint where the floor will not be subject to vehicle loading',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 753.515.101 says simply that heating units shall not cross expansion joints of the building or structure, and it attaches no conditions to that. Where heating is wanted on both sides, the answer is two separate units with the joint between them. The three conditional options are attractive because sleeving and load limits are the sort of detailing that solves most mechanical problems in a floor, and because an unqualified prohibition looks too absolute to be the exam answer. But an expansion joint exists precisely so the two slabs can move relative to each other, and nothing you wrap around the element stops that movement working on it until something fails, buried, under the finished floor.',
    section: '2.5',
    difficulty: 'advanced',
    topic: 'Heating Systems',
  },
  {
    id: 376,
    question:
      'What information must the designer or the installer of a floor heating system provide for each heating system so that the installation can be maintained afterwards?',
    options: [
      'The manufacturer and type of the units, their surface power density, and a layout giving their position and depth',
      'The insulation resistance, the earth fault loop impedance, and the RCD operating time measured on the heating circuit at handover',
      'The heat loss calculation for the room, the floor covering specified, and the running cost per hour at the current tariff',
      'The date of commissioning, the name of the person who commissioned it, and the serial number of the thermostat fitted',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 753.514.1 puts the duty on the designer or the installer to provide documentation for each heating system, sufficient to show the layout of the heating units and anything relevant to maintaining the installation. What it asks for is the manufacturer and type of unit, the surface power density, a sketch, drawing or picture of the layout, and the position and depth of the units. Test results are the tempting answer because they are the paperwork an electrician associates with handing a job over, and they do have to be recorded, but on the certificate rather than here, and they tell the next person nothing about where the elements are. Depth is the item that stops a joiner putting a fixing through a heating cable in five years\' time.',
    section: '2.5',
    difficulty: 'advanced',
    topic: 'Heating Systems',
  },
];

// ============================================================================
// Helper functions
// ============================================================================

const DEFAULT_WEIGHTS = { basic: 0.4, intermediate: 0.45, advanced: 0.15 };

/**
 * Draws a paper honouring the difficulty tags.
 *
 * The weighting here was always correct; the shuffle was not. It used
 * `sort(() => Math.random() - 0.5)`, which is not a uniform permutation — the
 * comparator is inconsistent, so some positions are systematically favoured and
 * taking the first N means some questions are quietly likelier to be examined.
 * Now delegates to the shared Fisher-Yates draw.
 * See src/utils/apprenticeQuestionDraw.ts.
 */
export const getRandomQuestions = (
  count: number = 60,
  weights: { basic: number; intermediate: number; advanced: number } = DEFAULT_WEIGHTS
): QuestionBank[] => drawWeighted(module2Questions, count, weights);

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
