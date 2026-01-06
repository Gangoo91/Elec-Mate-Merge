// Level 3 Module 2: Environmental Technologies - Question Bank
// 200 advanced questions covering all Module 2 content for Level 3 Electrical Course
// Topics: Building Regs Part L, Energy Efficiency, Renewables, Smart Systems, EPCs, Sustainability

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module2Questions: Question[] = [
  // ============================================
  // Section 2.1: Building Regulations Part L (Questions 1-30)
  // ============================================
  {
    id: 1,
    question: "What does Part L of the Building Regulations primarily address?",
    options: [
      "Fire safety in buildings",
      "Conservation of fuel and power",
      "Structural stability",
      "Ventilation requirements"
    ],
    correctAnswer: 1,
    explanation: "Part L of the Building Regulations deals with the conservation of fuel and power, setting standards for energy efficiency in buildings.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "What is the main purpose of the 2021 Part L amendments?",
    options: [
      "To reduce building costs",
      "To achieve a 31% reduction in CO2 emissions for new homes compared to previous standards",
      "To simplify building regulations",
      "To increase building heights"
    ],
    correctAnswer: 1,
    explanation: "The 2021 Part L amendments aim to achieve approximately 31% reduction in CO2 emissions for new homes as a step towards Future Homes Standard 2025.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 3,
    question: "What is the Future Homes Standard target year?",
    options: [
      "2023",
      "2025",
      "2030",
      "2035"
    ],
    correctAnswer: 1,
    explanation: "The Future Homes Standard is planned for 2025, requiring new homes to produce 75-80% less carbon emissions than current standards.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 4,
    question: "What does 'U-value' measure in building construction?",
    options: [
      "Electrical voltage",
      "Rate of heat transfer through a building element (thermal transmittance)",
      "UV light penetration",
      "Sound transmission"
    ],
    correctAnswer: 1,
    explanation: "U-value measures the rate of heat transfer through a building element. Lower U-values indicate better thermal insulation.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 5,
    question: "What is the typical U-value requirement for walls in new dwellings under Part L 2021?",
    options: [
      "0.50 W/m²K",
      "0.26 W/m²K or better",
      "1.0 W/m²K",
      "2.0 W/m²K"
    ],
    correctAnswer: 1,
    explanation: "Part L 2021 requires walls in new dwellings to achieve U-values of around 0.26 W/m²K or better to meet energy efficiency targets.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 6,
    question: "What is an EPC?",
    options: [
      "Electrical Performance Certificate",
      "Energy Performance Certificate",
      "Environmental Protection Certificate",
      "Equipment Power Classification"
    ],
    correctAnswer: 1,
    explanation: "An Energy Performance Certificate (EPC) rates a building's energy efficiency from A (most efficient) to G (least efficient).",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 7,
    question: "Which EPC rating band is the most energy efficient?",
    options: [
      "Band G",
      "Band D",
      "Band A",
      "Band E"
    ],
    correctAnswer: 2,
    explanation: "Band A is the most energy efficient rating on an EPC, with Band G being the least efficient.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 8,
    question: "What is the minimum EPC rating required for rental properties in England and Wales?",
    options: [
      "Band G",
      "Band E",
      "Band C",
      "Band A"
    ],
    correctAnswer: 1,
    explanation: "Since April 2020, rental properties must have a minimum EPC rating of E. Future regulations may increase this to C.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What does 'thermal bridging' refer to?",
    options: [
      "Connecting two heating systems",
      "Areas where heat transfers more easily through the building envelope due to breaks in insulation",
      "Bridge construction methods",
      "Heat distribution in pipes"
    ],
    correctAnswer: 1,
    explanation: "Thermal bridging occurs where insulation is bridged by materials with higher thermal conductivity, creating cold spots and heat loss.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is 'air permeability' in Part L?",
    options: [
      "Ability to breathe indoors",
      "The measure of air leakage through the building fabric under pressure",
      "Ventilation rate",
      "Air quality index"
    ],
    correctAnswer: 1,
    explanation: "Air permeability measures uncontrolled air leakage through the building fabric, typically expressed as m³/(h·m²) at 50 Pa pressure difference.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "What is the typical air permeability target for new dwellings?",
    options: [
      "20 m³/(h·m²) @ 50 Pa",
      "8 m³/(h·m²) @ 50 Pa or better",
      "50 m³/(h·m²) @ 50 Pa",
      "No requirement exists"
    ],
    correctAnswer: 1,
    explanation: "Part L typically requires air permeability of 8 m³/(h·m²) @ 50 Pa or better for new dwellings to reduce uncontrolled heat loss.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "What is SAP in relation to Part L?",
    options: [
      "Standard Assessment Practice",
      "Standard Assessment Procedure - the methodology for calculating dwelling energy performance",
      "Safety Approval Process",
      "System Analysis Program"
    ],
    correctAnswer: 1,
    explanation: "SAP (Standard Assessment Procedure) is the Government's methodology for calculating the energy performance of dwellings.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 13,
    question: "What is SBEM used for?",
    options: [
      "Calculating domestic energy performance",
      "Calculating non-domestic building energy performance",
      "Testing boilers",
      "Measuring solar radiation"
    ],
    correctAnswer: 1,
    explanation: "SBEM (Simplified Building Energy Model) is used to calculate energy performance for non-domestic buildings under Part L.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "What percentage of heat is typically lost through an uninsulated roof?",
    options: [
      "5%",
      "10%",
      "25%",
      "50%"
    ],
    correctAnswer: 2,
    explanation: "Approximately 25% of heat can be lost through an uninsulated roof, making loft insulation one of the most cost-effective energy efficiency measures.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 15,
    question: "What is the primary emission factor used in Part L calculations?",
    options: [
      "Water usage",
      "Carbon dioxide (CO2) emissions per unit of energy",
      "Noise levels",
      "Light output"
    ],
    correctAnswer: 1,
    explanation: "CO2 emission factors (kg CO2/kWh) are used to calculate the carbon dioxide emissions from different fuel types in Part L assessments.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 16,
    question: "What does 'fabric first' approach mean in Part L compliance?",
    options: [
      "Using fabric materials only",
      "Prioritising the building envelope (insulation, airtightness) before adding renewable technologies",
      "Installing curtains first",
      "Using natural materials"
    ],
    correctAnswer: 1,
    explanation: "Fabric first means prioritising high levels of insulation and airtightness in the building envelope before relying on renewables or technology.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "What is a 'notional dwelling' in SAP calculations?",
    options: [
      "An imaginary building",
      "A reference dwelling with the same shape but meeting minimum standards, used for comparison",
      "A small dwelling",
      "A temporary building"
    ],
    correctAnswer: 1,
    explanation: "A notional dwelling is a reference building with the same geometry as the actual dwelling but using minimum Part L specifications for comparison.",
    section: "2.1",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What is the Target Emission Rate (TER)?",
    options: [
      "Maximum allowed CO2 emissions",
      "The CO2 emission rate the building must achieve, based on the notional dwelling",
      "Target for renewable energy",
      "Thermal emission rating"
    ],
    correctAnswer: 1,
    explanation: "TER is the target CO2 emission rate calculated from the notional dwelling that the actual dwelling must achieve or better.",
    section: "2.1",
    difficulty: "advanced"
  },
  {
    id: 19,
    question: "What is the Dwelling Emission Rate (DER)?",
    options: [
      "Maximum emission rate",
      "The calculated annual CO2 emissions from the actual dwelling design",
      "Default emission rate",
      "District emission rate"
    ],
    correctAnswer: 1,
    explanation: "DER is the calculated annual CO2 emission rate (kg CO2/m²/year) for the actual dwelling design, which must be lower than the TER.",
    section: "2.1",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What glazing requirement typically applies under Part L?",
    options: [
      "Any type of glass",
      "Double glazing minimum with low-e coating and U-value around 1.4 W/m²K or better",
      "Single glazing is acceptable",
      "No requirements for glazing"
    ],
    correctAnswer: 1,
    explanation: "Part L typically requires double glazing with low-emissivity coating achieving U-values of around 1.4 W/m²K or better for windows.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 21,
    question: "What is controlled fitting under Part L?",
    options: [
      "Any electrical fitting",
      "Building services that must meet minimum efficiency standards when replaced",
      "Controlled substance storage",
      "Security fittings"
    ],
    correctAnswer: 1,
    explanation: "Controlled fittings include windows, doors, boilers, and other building services that must meet minimum efficiency standards when installed or replaced.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 22,
    question: "What must be provided for a new dwelling under Part L?",
    options: [
      "Free heating for one year",
      "Information about efficient operation of heating, ventilation, and hot water systems",
      "Extended warranty",
      "Free energy audit"
    ],
    correctAnswer: 1,
    explanation: "Part L requires building owners to receive information about efficient operation of fixed building services, including heating and hot water systems.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 23,
    question: "What is a Primary Energy target in Part L?",
    options: [
      "Main heating source requirement",
      "A target for total primary energy consumption including generation and distribution losses",
      "First energy assessment",
      "Principal energy measure"
    ],
    correctAnswer: 1,
    explanation: "Primary Energy targets account for total energy consumption including losses in generation and distribution, promoting efficient fuel choices.",
    section: "2.1",
    difficulty: "advanced"
  },
  {
    id: 24,
    question: "What is the role of commissioning under Part L?",
    options: [
      "Sales commission",
      "Ensuring fixed building services are installed and adjusted to operate efficiently",
      "Ordering equipment",
      "Building inspection"
    ],
    correctAnswer: 1,
    explanation: "Commissioning ensures that fixed building services are properly installed, set up, and adjusted to operate efficiently as designed.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 25,
    question: "What documentation must be provided for Part L compliance?",
    options: [
      "Only a receipt",
      "SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions",
      "Only building plans",
      "Insurance documents"
    ],
    correctAnswer: 1,
    explanation: "Part L compliance requires SAP/SBEM calculations, an EPC, commissioning certificates for building services, and information for building users.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 26,
    question: "What is an air pressure test?",
    options: [
      "Testing air compressors",
      "A test to measure air leakage rate through the building envelope",
      "Tyre pressure check",
      "HVAC system test"
    ],
    correctAnswer: 1,
    explanation: "Air pressure testing measures the air leakage rate through the building envelope, usually conducted at 50 Pascals pressure difference.",
    section: "2.1",
    difficulty: "basic"
  },
  {
    id: 27,
    question: "When is an air pressure test mandatory for dwellings?",
    options: [
      "Never",
      "For all new dwellings or where required by Building Control",
      "Only for commercial buildings",
      "Only in Scotland"
    ],
    correctAnswer: 1,
    explanation: "Air pressure testing is typically required for all new dwellings to demonstrate compliance with Part L airtightness standards.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 28,
    question: "What is 'g-value' for glazing?",
    options: [
      "Glass thickness",
      "Solar heat gain coefficient - proportion of solar radiation transmitted through glazing",
      "Green rating",
      "Glare value"
    ],
    correctAnswer: 1,
    explanation: "G-value (solar factor) indicates what proportion of solar energy passes through glazing. Lower g-values reduce solar heat gain.",
    section: "2.1",
    difficulty: "intermediate"
  },
  {
    id: 29,
    question: "What is meant by 'consequential improvements' in Part L?",
    options: [
      "Improvements that happen by accident",
      "Required energy efficiency upgrades when extending or renovating larger buildings",
      "Improvements to consequences",
      "Resulting damage"
    ],
    correctAnswer: 1,
    explanation: "Consequential improvements are additional energy efficiency upgrades required when extending or renovating buildings over a certain size.",
    section: "2.1",
    difficulty: "advanced"
  },
  {
    id: 30,
    question: "What minimum lighting efficiency is typically required under Part L?",
    options: [
      "No requirement",
      "75% of fixed lighting outlets must have efficient fittings (typically LED)",
      "50% efficient",
      "100% incandescent"
    ],
    correctAnswer: 1,
    explanation: "Part L typically requires at least 75% of fixed lighting outlets to have efficient fittings with efficacy of 45 lumens per watt or better.",
    section: "2.1",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 2.2: Energy Efficiency (Questions 31-60)
  // ============================================
  {
    id: 31,
    question: "What is the efficiency rating of a typical modern LED lamp?",
    options: [
      "10-15 lumens per watt",
      "80-150+ lumens per watt",
      "40-50 lumens per watt",
      "200-300 lumens per watt"
    ],
    correctAnswer: 1,
    explanation: "Modern LED lamps typically achieve 80-150+ lumens per watt, compared to around 10-15 for incandescent lamps.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 32,
    question: "What does 'COP' stand for in heat pump terminology?",
    options: [
      "Certificate of Performance",
      "Coefficient of Performance - ratio of heat output to electrical input",
      "Cost of Production",
      "Control of Power"
    ],
    correctAnswer: 1,
    explanation: "COP (Coefficient of Performance) is the ratio of heat output to electrical energy input. A COP of 3 means 3kW heat output for 1kW electrical input.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 33,
    question: "What typical COP can an air source heat pump achieve?",
    options: [
      "0.5-1.0",
      "2.5-4.0",
      "10-15",
      "100+"
    ],
    correctAnswer: 1,
    explanation: "Air source heat pumps typically achieve COP values of 2.5-4.0, meaning they produce 2.5-4 times more heat energy than the electrical energy consumed.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 34,
    question: "Why are heat pumps considered renewable?",
    options: [
      "They use no electricity",
      "They extract renewable heat from the environment (air, ground, or water)",
      "They are made from recycled materials",
      "They can be recycled"
    ],
    correctAnswer: 1,
    explanation: "Heat pumps extract renewable heat energy from the environment and 'pump' it to a higher temperature, using only a fraction of that energy as electricity.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 35,
    question: "What is demand-side response in energy management?",
    options: [
      "Responding to customer complaints",
      "Adjusting energy consumption patterns in response to grid signals or time-of-use tariffs",
      "Demanding more energy",
      "Customer service response"
    ],
    correctAnswer: 1,
    explanation: "Demand-side response involves shifting or reducing energy consumption in response to grid conditions, prices, or signals to help balance supply and demand.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 36,
    question: "What is a smart meter?",
    options: [
      "An intelligent person",
      "A digital meter that records energy use and communicates with the supplier remotely",
      "A high-quality meter",
      "A solar panel meter"
    ],
    correctAnswer: 1,
    explanation: "A smart meter digitally records energy consumption and communicates readings remotely to suppliers, enabling accurate billing and consumption insights.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 37,
    question: "What is the benefit of time-of-use tariffs?",
    options: [
      "Fixed pricing",
      "Lower rates during off-peak periods encourage load shifting to reduce peak demand",
      "Higher rates at all times",
      "No benefit"
    ],
    correctAnswer: 1,
    explanation: "Time-of-use tariffs offer lower rates during off-peak periods, encouraging consumers to shift flexible loads and helping balance grid demand.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 38,
    question: "What is Power Factor in electrical systems?",
    options: [
      "The power of a factor",
      "The ratio of real power to apparent power, indicating how efficiently power is used",
      "Motor power rating",
      "Solar panel factor"
    ],
    correctAnswer: 1,
    explanation: "Power Factor is the ratio of real power (kW) to apparent power (kVA). A PF of 1 indicates all power is used productively; lower values mean wasted capacity.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 39,
    question: "What causes poor power factor in electrical installations?",
    options: [
      "Too many lights",
      "Inductive loads like motors and transformers drawing reactive power",
      "Using LED lighting",
      "High voltage"
    ],
    correctAnswer: 1,
    explanation: "Inductive loads (motors, transformers, fluorescent ballasts) draw reactive power which causes current to lag voltage, reducing power factor.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 40,
    question: "How is power factor correction achieved?",
    options: [
      "Using bigger cables",
      "Installing capacitors to counteract inductive reactive power",
      "Reducing voltage",
      "Using DC instead of AC"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction typically uses capacitors to supply reactive power locally, counteracting inductive loads and improving the power factor.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 41,
    question: "What is the energy efficiency label rating scale for appliances?",
    options: [
      "1 to 10",
      "A to G (with A being most efficient)",
      "Good, Better, Best",
      "Green to Red"
    ],
    correctAnswer: 1,
    explanation: "The EU/UK energy efficiency label rates appliances from A (most efficient) to G (least efficient), with A+++, A++, A+ phased out.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 42,
    question: "What does BEMS stand for?",
    options: [
      "Building Energy Management System",
      "British Electrical Manufacturing Standard",
      "Basic Emergency Management System",
      "Building Equipment Monitoring Service"
    ],
    correctAnswer: 0,
    explanation: "BEMS (Building Energy Management System) monitors and controls building services to optimise energy use, comfort, and efficiency.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 43,
    question: "What is occupancy sensing in lighting control?",
    options: [
      "Counting occupants",
      "Automatic lighting control based on detecting presence or absence of people",
      "Security surveillance",
      "Fire detection"
    ],
    correctAnswer: 1,
    explanation: "Occupancy sensing automatically controls lighting based on detecting whether spaces are occupied, reducing energy waste in unoccupied areas.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 44,
    question: "What is daylight harvesting?",
    options: [
      "Growing plants indoors",
      "Automatically dimming artificial lighting in response to available natural light",
      "Solar panel installation",
      "Window cleaning"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting uses sensors to measure natural light levels and automatically dim artificial lighting to maintain required illuminance while saving energy.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 45,
    question: "What is a Variable Speed Drive (VSD)?",
    options: [
      "A type of vehicle",
      "An electronic device that controls motor speed by varying the frequency of power supply",
      "A manual speed control",
      "A gear system"
    ],
    correctAnswer: 1,
    explanation: "A VSD (Variable Speed Drive/Frequency Drive) controls AC motor speed by varying the supply frequency, enabling significant energy savings on fans and pumps.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 46,
    question: "Why do VSDs save energy on centrifugal fans and pumps?",
    options: [
      "They use less voltage",
      "Power consumption varies with the cube of speed (Affinity Laws)",
      "They have better motors",
      "They use DC power"
    ],
    correctAnswer: 1,
    explanation: "The Affinity Laws show that power consumption varies with the cube of speed. Reducing fan/pump speed by 20% can reduce power consumption by about 50%.",
    section: "2.2",
    difficulty: "advanced"
  },
  {
    id: 47,
    question: "What is a heat recovery ventilation system?",
    options: [
      "A heating system",
      "A ventilation system that recovers heat from exhaust air to warm incoming fresh air",
      "An air conditioning unit",
      "An extractor fan"
    ],
    correctAnswer: 1,
    explanation: "MVHR (Mechanical Ventilation with Heat Recovery) extracts stale air and recovers up to 90% of its heat to warm incoming fresh air.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 48,
    question: "What efficiency can MVHR systems achieve?",
    options: [
      "30-40%",
      "Up to 90% or higher heat recovery",
      "100% (no losses)",
      "10-20%"
    ],
    correctAnswer: 1,
    explanation: "Modern MVHR systems can recover up to 90% or more of the heat from extracted air, significantly reducing heating demand in well-sealed buildings.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 49,
    question: "What is the typical efficiency of a modern condensing gas boiler?",
    options: [
      "50-60%",
      "70-80%",
      "90-94%",
      "100%"
    ],
    correctAnswer: 2,
    explanation: "Modern condensing gas boilers achieve seasonal efficiencies of 90-94% by recovering latent heat from flue gases.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 50,
    question: "What makes a boiler 'condensing'?",
    options: [
      "It produces condensation",
      "It has a secondary heat exchanger that recovers latent heat by condensing water vapour from flue gases",
      "It uses condensed fuel",
      "It has a compact design"
    ],
    correctAnswer: 1,
    explanation: "Condensing boilers have a larger heat exchanger that cools flue gases enough to condense water vapour, recovering additional latent heat.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 51,
    question: "What is the recommended minimum flow temperature for condensing boilers to condense?",
    options: [
      "80°C or above",
      "Below about 55°C (return temperature below dew point ~54°C)",
      "Exactly 70°C",
      "Temperature doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "For efficient condensing, return water temperature should be below the dew point (about 54°C for natural gas), often achieved with flow temperatures below 55°C.",
    section: "2.2",
    difficulty: "advanced"
  },
  {
    id: 52,
    question: "What is a Seasonal Coefficient of Performance (SCOP)?",
    options: [
      "Monthly efficiency",
      "Average efficiency of a heat pump over an entire heating season",
      "Summer-only rating",
      "Sales performance"
    ],
    correctAnswer: 1,
    explanation: "SCOP measures average heat pump efficiency across a typical heating season, accounting for varying outdoor temperatures and part-load operation.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 53,
    question: "What is phantom or standby power?",
    options: [
      "Ghost energy",
      "Electricity consumed by devices when switched off but still plugged in",
      "Emergency backup power",
      "Invisible energy"
    ],
    correctAnswer: 1,
    explanation: "Phantom or standby power is electricity consumed by devices in standby mode or when switched off but still connected. It can account for 5-10% of household consumption.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 54,
    question: "What is the purpose of an energy audit?",
    options: [
      "Tax inspection",
      "Systematic assessment of energy use to identify savings opportunities",
      "Equipment inventory",
      "Staff review"
    ],
    correctAnswer: 1,
    explanation: "An energy audit systematically examines energy consumption patterns to identify waste, inefficiencies, and opportunities for cost-effective improvements.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 55,
    question: "What is sub-metering used for?",
    options: [
      "Measuring submarine power",
      "Measuring energy consumption of individual circuits, areas, or equipment for analysis",
      "Meter testing",
      "Measuring low voltages"
    ],
    correctAnswer: 1,
    explanation: "Sub-metering measures energy consumption of specific circuits, areas, or equipment, enabling detailed analysis and allocation of energy costs.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 56,
    question: "What is a kilowatt-hour (kWh)?",
    options: [
      "1000 watts",
      "A unit of energy equal to using 1000 watts for one hour",
      "A type of meter",
      "Power per hour"
    ],
    correctAnswer: 1,
    explanation: "A kilowatt-hour (kWh) is a unit of energy equal to using power at a rate of 1 kilowatt (1000 watts) for one hour.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 57,
    question: "What is the difference between energy and power?",
    options: [
      "They are the same thing",
      "Power is the rate of energy use (kW); energy is power over time (kWh)",
      "Energy is faster than power",
      "Power is measured in hours"
    ],
    correctAnswer: 1,
    explanation: "Power (measured in watts/kW) is the rate at which energy is used. Energy (kWh) is power multiplied by time - the total consumption.",
    section: "2.2",
    difficulty: "basic"
  },
  {
    id: 58,
    question: "What is load shedding in energy management?",
    options: [
      "Removing loads from vehicles",
      "Deliberately reducing electrical load by switching off non-essential equipment during peak demand",
      "Losing power accidentally",
      "Installing more equipment"
    ],
    correctAnswer: 1,
    explanation: "Load shedding deliberately switches off non-essential electrical loads during peak demand periods to reduce maximum demand charges or grid strain.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 59,
    question: "What is maximum demand charging?",
    options: [
      "Charging for the most power used in a billing period, not just total consumption",
      "Maximum price charged",
      "Demanding maximum payment",
      "Peak pricing only"
    ],
    correctAnswer: 0,
    explanation: "Maximum demand charges are based on the highest power demand (kW or kVA) recorded during a billing period, typically using half-hourly metering.",
    section: "2.2",
    difficulty: "intermediate"
  },
  {
    id: 60,
    question: "What is the typical carbon intensity of UK grid electricity (2024)?",
    options: [
      "About 500g CO2/kWh",
      "About 150-200g CO2/kWh (and falling)",
      "About 1kg CO2/kWh",
      "Zero carbon"
    ],
    correctAnswer: 1,
    explanation: "UK grid electricity carbon intensity has fallen significantly to around 150-200g CO2/kWh and continues to decrease as renewable generation increases.",
    section: "2.2",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 2.3: Renewable Technologies (Questions 61-95)
  // ============================================
  {
    id: 61,
    question: "What is the difference between solar PV and solar thermal?",
    options: [
      "They are the same",
      "PV generates electricity; thermal heats water or air",
      "PV heats water; thermal generates electricity",
      "PV is newer technology"
    ],
    correctAnswer: 1,
    explanation: "Solar PV (photovoltaic) converts sunlight directly into electricity using semiconductor cells. Solar thermal uses sunlight to heat water or air.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 62,
    question: "What is the typical efficiency of a modern solar PV panel?",
    options: [
      "5-10%",
      "18-22% for standard panels, up to 25%+ for premium",
      "50-60%",
      "90-100%"
    ],
    correctAnswer: 1,
    explanation: "Modern solar PV panels typically achieve 18-22% efficiency, with high-end panels reaching 25% or more under standard test conditions.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 63,
    question: "What is a grid-tied solar PV system?",
    options: [
      "A system tied with string",
      "A solar system connected to the mains grid, exporting excess generation",
      "An off-grid system",
      "A mobile solar unit"
    ],
    correctAnswer: 1,
    explanation: "A grid-tied system is connected to the mains electricity grid, allowing export of excess generation and import when solar production is insufficient.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 64,
    question: "What is the function of a solar inverter?",
    options: [
      "Store energy",
      "Convert DC electricity from panels to AC electricity for use or export",
      "Increase voltage",
      "Clean the panels"
    ],
    correctAnswer: 1,
    explanation: "Solar inverters convert the DC (direct current) electricity produced by PV panels into AC (alternating current) suitable for use in buildings and grid export.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 65,
    question: "What is MPPT in solar PV systems?",
    options: [
      "Maximum Power Point Tracking - optimising power extraction from panels",
      "Main Power Protection Technology",
      "Minimum Power Production Target",
      "Multi-Panel Power Transfer"
    ],
    correctAnswer: 0,
    explanation: "MPPT (Maximum Power Point Tracking) continuously adjusts the operating point to extract maximum available power from the panels under varying conditions.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 66,
    question: "What is the Smart Export Guarantee (SEG)?",
    options: [
      "A warranty scheme",
      "A scheme requiring energy suppliers to pay for exported renewable electricity",
      "An import tariff",
      "A meter type"
    ],
    correctAnswer: 1,
    explanation: "The SEG requires licensed electricity suppliers to offer payment for electricity exported to the grid from small-scale renewable generators like solar PV.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 67,
    question: "What is the typical lifespan of solar PV panels?",
    options: [
      "5-10 years",
      "25-30 years with degradation",
      "50+ years",
      "They last forever"
    ],
    correctAnswer: 1,
    explanation: "Solar PV panels typically last 25-30 years, though output degrades slowly over time (typically 0.5-1% per year).",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 68,
    question: "What is an air source heat pump (ASHP)?",
    options: [
      "A compressed air system",
      "A heat pump that extracts heat from outside air and transfers it indoors",
      "An air conditioning unit only",
      "A ventilation system"
    ],
    correctAnswer: 1,
    explanation: "An ASHP extracts heat energy from outside air (even in cold weather) and 'pumps' it to a higher temperature for space heating or hot water.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 69,
    question: "What is a ground source heat pump (GSHP)?",
    options: [
      "A pump for groundwater",
      "A heat pump extracting heat from the ground via buried pipes or boreholes",
      "A foundation pump",
      "An underground storage system"
    ],
    correctAnswer: 1,
    explanation: "A GSHP extracts heat from the ground using horizontal loops or vertical boreholes, benefiting from stable ground temperatures year-round.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 70,
    question: "Why do heat pumps work best with underfloor heating?",
    options: [
      "They don't work with radiators",
      "Underfloor heating operates at lower temperatures, improving heat pump efficiency",
      "It's cheaper to install",
      "Building regulations require it"
    ],
    correctAnswer: 1,
    explanation: "Underfloor heating operates at lower flow temperatures (35-45°C) than radiators, allowing heat pumps to operate more efficiently with higher COP values.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 71,
    question: "What is the Boiler Upgrade Scheme (BUS)?",
    options: [
      "Free boiler servicing",
      "A government grant towards installing heat pumps or biomass boilers",
      "Boiler replacement programme",
      "Bus heating upgrade"
    ],
    correctAnswer: 1,
    explanation: "The Boiler Upgrade Scheme provides grants (currently £7,500 for ASHPs) to help property owners in England and Wales install low carbon heating systems.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 72,
    question: "What is battery storage used for in renewable systems?",
    options: [
      "Only for emergencies",
      "Storing excess renewable generation for use when production is low",
      "Powering electric vehicles only",
      "Replacing the grid"
    ],
    correctAnswer: 1,
    explanation: "Battery storage allows excess solar generation to be stored during the day for use in the evening or overnight when panels aren't producing.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 73,
    question: "What type of battery is commonly used in home energy storage?",
    options: [
      "Lead acid",
      "Lithium-ion (Li-ion)",
      "Nickel-cadmium",
      "Zinc-carbon"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries are most common for home energy storage due to their high energy density, efficiency, long cycle life, and falling costs.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 74,
    question: "What is the typical round-trip efficiency of lithium-ion battery storage?",
    options: [
      "50-60%",
      "85-95%",
      "99-100%",
      "30-40%"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries typically achieve 85-95% round-trip efficiency, meaning 85-95% of stored energy is recovered when discharged.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 75,
    question: "What is a micro wind turbine?",
    options: [
      "A very small decorative turbine",
      "A small wind turbine (typically under 6kW) for domestic or small commercial use",
      "A turbine for microscopes",
      "An indoor turbine"
    ],
    correctAnswer: 1,
    explanation: "Micro wind turbines are small-scale (typically under 6kW) wind generators suitable for homes or small businesses in suitable windy locations.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 76,
    question: "What affects the viability of micro wind installations?",
    options: [
      "Only the turbine brand",
      "Wind speed, turbulence, obstacles, planning permission, and grid connection",
      "Only the cost",
      "Only the location appearance"
    ],
    correctAnswer: 1,
    explanation: "Micro wind viability depends on average wind speed, turbulence from buildings/trees, planning restrictions, and practical grid connection requirements.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "What is a micro-CHP system?",
    options: [
      "A small central heating pump",
      "Combined Heat and Power system that generates both electricity and useful heat",
      "A micro-chip system",
      "A communication hub"
    ],
    correctAnswer: 1,
    explanation: "Micro-CHP (Combined Heat and Power) generates electricity while capturing waste heat for space heating or hot water, achieving high overall efficiency.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 78,
    question: "What is biomass heating?",
    options: [
      "Heating using body mass",
      "Heating using organic materials like wood pellets, chips, or logs",
      "Heating biological laboratories",
      "Electric heating"
    ],
    correctAnswer: 1,
    explanation: "Biomass heating burns organic materials (wood pellets, chips, logs) to provide heat. It's considered low carbon as the CO2 released equals that absorbed during growth.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 79,
    question: "What is the RHI being replaced by?",
    options: [
      "Nothing",
      "The Boiler Upgrade Scheme (BUS) for upfront grants",
      "The Feed-in Tariff",
      "The Green Deal"
    ],
    correctAnswer: 1,
    explanation: "The Renewable Heat Incentive (RHI) closed to new applicants and has been replaced by the Boiler Upgrade Scheme offering upfront grants.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 80,
    question: "What is an EV charge point?",
    options: [
      "Extra voltage point",
      "Equipment for charging electric vehicle batteries from the electrical supply",
      "Emergency voltage point",
      "European voltage point"
    ],
    correctAnswer: 1,
    explanation: "An EV charge point is dedicated equipment that safely supplies electricity to charge electric vehicle batteries, ranging from 3kW to 350kW+.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 81,
    question: "What are the typical power levels for home EV chargers?",
    options: [
      "1-2kW",
      "7-22kW (typically 7kW for single-phase)",
      "50-100kW",
      "350kW+"
    ],
    correctAnswer: 1,
    explanation: "Home EV chargers are typically 7kW for single-phase supplies (adding about 30 miles range per hour) or up to 22kW for three-phase installations.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 82,
    question: "What Building Regulations apply to new EV charge point installations?",
    options: [
      "None",
      "Part S (Infrastructure for electric vehicles) and Part P (Electrical Safety)",
      "Only Part P",
      "Only Part L"
    ],
    correctAnswer: 1,
    explanation: "Part S requires EV charging infrastructure in new buildings and major renovations. Part P covers the electrical installation safety requirements.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 83,
    question: "What is V2G (Vehicle to Grid)?",
    options: [
      "Video to Grid",
      "Technology allowing EVs to discharge power back to the grid or building",
      "Virtual to Grid",
      "Voltage to Ground"
    ],
    correctAnswer: 1,
    explanation: "V2G (Vehicle to Grid) enables bi-directional charging, allowing EV batteries to supply power back to the grid or building during peak demand periods.",
    section: "2.3",
    difficulty: "advanced"
  },
  {
    id: 84,
    question: "What is solar thermal most commonly used for in the UK?",
    options: [
      "Space heating only",
      "Domestic hot water pre-heating",
      "Electricity generation",
      "Pool heating only"
    ],
    correctAnswer: 1,
    explanation: "Solar thermal in the UK is most commonly used for domestic hot water pre-heating, typically providing 50-70% of annual hot water requirements.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 85,
    question: "What is the difference between monocrystalline and polycrystalline solar panels?",
    options: [
      "No difference",
      "Mono is more efficient and black in appearance; poly is slightly less efficient and blue-ish",
      "Poly is more efficient",
      "Mono only works in summer"
    ],
    correctAnswer: 1,
    explanation: "Monocrystalline panels use single-crystal silicon, achieving higher efficiency (20%+) with uniform black appearance. Polycrystalline uses multiple crystals, slightly lower efficiency.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 86,
    question: "What is a hybrid inverter?",
    options: [
      "A petrol/electric inverter",
      "An inverter that manages both solar PV and battery storage in one unit",
      "A two-speed inverter",
      "A backup inverter"
    ],
    correctAnswer: 1,
    explanation: "A hybrid inverter combines solar PV inverter and battery charger/inverter functions, managing solar generation, battery storage, grid connection, and loads.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 87,
    question: "What is islanding in solar PV systems?",
    options: [
      "Installing on islands",
      "When a solar system continues to power a circuit that has been disconnected from the grid",
      "A wiring configuration",
      "Panel arrangement"
    ],
    correctAnswer: 1,
    explanation: "Islanding occurs when a PV system energises a circuit disconnected from the grid - dangerous for utility workers. Anti-islanding protection is mandatory.",
    section: "2.3",
    difficulty: "advanced"
  },
  {
    id: 88,
    question: "What is the purpose of a generation meter in solar PV systems?",
    options: [
      "Measuring general usage",
      "Recording total electricity generated by the PV system for payment or monitoring",
      "Measuring generator fuel",
      "Testing panels"
    ],
    correctAnswer: 1,
    explanation: "A generation meter records total electricity produced by the PV system, required for SEG payments and monitoring system performance.",
    section: "2.3",
    difficulty: "basic"
  },
  {
    id: 89,
    question: "What is MCS certification?",
    options: [
      "Motorcycle certification",
      "Microgeneration Certification Scheme - required for installer competence and grant eligibility",
      "Main circuit certification",
      "Meter certification scheme"
    ],
    correctAnswer: 1,
    explanation: "MCS (Microgeneration Certification Scheme) certifies installers and products, required for eligibility for government schemes like SEG and BUS.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 90,
    question: "What is a heat pump hot water cylinder?",
    options: [
      "Any hot water tank",
      "A larger, well-insulated cylinder designed for lower-temperature heat pump operation",
      "A small cylinder",
      "An uninsulated tank"
    ],
    correctAnswer: 1,
    explanation: "Heat pump cylinders are typically larger (200-300L) and better insulated than standard cylinders, designed for efficient operation at lower temperatures.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 91,
    question: "What is defrost cycle in air source heat pumps?",
    options: [
      "Manual defrosting",
      "Automatic reversal to remove ice build-up on the outdoor unit",
      "Cleaning cycle",
      "Test mode"
    ],
    correctAnswer: 1,
    explanation: "In cold weather, ice can form on the ASHP outdoor unit. The defrost cycle temporarily reverses operation to melt ice and maintain efficiency.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 92,
    question: "What is the bivalent point for heat pumps?",
    options: [
      "Installation point",
      "Outdoor temperature below which supplementary heating is needed",
      "Electrical connection point",
      "Two-valve point"
    ],
    correctAnswer: 1,
    explanation: "The bivalent point is the outdoor temperature below which the heat pump alone cannot meet heating demand and supplementary heating (e.g., immersion) is needed.",
    section: "2.3",
    difficulty: "advanced"
  },
  {
    id: 93,
    question: "What regulations govern EV charger installation in dwellings?",
    options: [
      "None specific",
      "Part P (electrical safety), Part S (EV infrastructure), and relevant equipment standards",
      "Only manufacturer instructions",
      "Only building control approval"
    ],
    correctAnswer: 1,
    explanation: "EV charger installation must comply with Part P (BS 7671), Part S requirements for new buildings, and equipment standards like BS EN 61851.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 94,
    question: "What is smart charging for EVs?",
    options: [
      "Charging quickly",
      "Intelligent charging that optimises timing based on tariffs, grid demand, or renewable availability",
      "Using a smartphone app",
      "Premium charging"
    ],
    correctAnswer: 1,
    explanation: "Smart charging optimises EV charging based on electricity tariffs, grid demand, solar generation availability, and user requirements.",
    section: "2.3",
    difficulty: "intermediate"
  },
  {
    id: 95,
    question: "What is peak shaving with battery storage?",
    options: [
      "Reducing battery peaks",
      "Using batteries to reduce maximum demand by discharging during peak consumption periods",
      "Charging at peak times",
      "Mountain climbing"
    ],
    correctAnswer: 1,
    explanation: "Peak shaving uses battery storage to reduce maximum demand charges by discharging batteries during peak consumption periods instead of drawing from the grid.",
    section: "2.3",
    difficulty: "advanced"
  },

  // ============================================
  // Section 2.4: Smart Building Systems (Questions 96-125)
  // ============================================
  {
    id: 96,
    question: "What is building automation?",
    options: [
      "Robot buildings",
      "Automatic control of building services like HVAC, lighting, and security",
      "Self-constructing buildings",
      "Automatic cleaning"
    ],
    correctAnswer: 1,
    explanation: "Building automation uses control systems to automatically manage building services including heating, ventilation, air conditioning, lighting, and security.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 97,
    question: "What is a BMS (Building Management System)?",
    options: [
      "Building Maintenance Schedule",
      "A centralised system for monitoring and controlling building services",
      "Business Management Software",
      "Building Materials Specification"
    ],
    correctAnswer: 1,
    explanation: "A BMS is a computer-based control system that monitors and manages building services from a central location, optimising energy use and comfort.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 98,
    question: "What protocol is commonly used for building automation?",
    options: [
      "HTTP only",
      "BACnet, Modbus, KNX, or DALI for lighting",
      "USB",
      "Bluetooth only"
    ],
    correctAnswer: 1,
    explanation: "Common building automation protocols include BACnet (widely used for HVAC), Modbus, KNX (European standard), and DALI specifically for lighting control.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 99,
    question: "What is DALI in lighting control?",
    options: [
      "Digital Art Lighting Installation",
      "Digital Addressable Lighting Interface - a protocol for digital lighting control",
      "Domestic And Light Industrial",
      "Daylight Automatic Lighting Intensity"
    ],
    correctAnswer: 1,
    explanation: "DALI (Digital Addressable Lighting Interface) is a standardised protocol for digital lighting control, allowing individual addressing and dimming of luminaires.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 100,
    question: "What is the benefit of addressable lighting control?",
    options: [
      "Cheaper installation",
      "Individual control of each luminaire for flexibility, energy savings, and tuning",
      "Brighter lights",
      "Simpler wiring"
    ],
    correctAnswer: 1,
    explanation: "Addressable control allows individual luminaires to be controlled independently, enabling flexible scene setting, occupancy-based control, and fine-tuned energy management.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 101,
    question: "What is KNX?",
    options: [
      "A lock brand",
      "A worldwide standard for home and building automation",
      "A cable type",
      "A lighting brand"
    ],
    correctAnswer: 1,
    explanation: "KNX is a worldwide standard (ISO 14543) for home and building automation, supporting lighting, HVAC, blinds, security, and energy management.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 102,
    question: "What is a smart thermostat?",
    options: [
      "A very expensive thermostat",
      "A programmable thermostat with WiFi, learning capability, and remote control",
      "A large thermostat",
      "A colourful thermostat"
    ],
    correctAnswer: 1,
    explanation: "Smart thermostats connect to WiFi for remote control, learn user preferences, and can integrate with other smart home devices for optimised heating control.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 103,
    question: "What is geofencing in smart heating control?",
    options: [
      "Installing fences",
      "Using smartphone location to automatically adjust heating when occupants leave or approach",
      "GPS for heating",
      "Outdoor temperature sensing"
    ],
    correctAnswer: 1,
    explanation: "Geofencing uses smartphone GPS to detect when occupants leave or approach home, automatically adjusting heating to save energy when away and ensuring comfort on return.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 104,
    question: "What is a smart plug?",
    options: [
      "An expensive plug",
      "A plug adapter allowing remote control and monitoring of connected devices",
      "A waterproof plug",
      "A USB plug"
    ],
    correctAnswer: 1,
    explanation: "A smart plug connects to WiFi, allowing remote on/off control, scheduling, and often energy monitoring of plugged-in devices via smartphone app.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 105,
    question: "What is Z-Wave?",
    options: [
      "A radio station",
      "A wireless protocol designed for smart home device communication",
      "A type of electrical wave",
      "A cleaning product"
    ],
    correctAnswer: 1,
    explanation: "Z-Wave is a wireless mesh networking protocol specifically designed for smart home devices, operating at sub-1GHz frequencies with low power consumption.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 106,
    question: "What is Zigbee?",
    options: [
      "A type of bee",
      "A low-power wireless mesh protocol for smart home and IoT devices",
      "A lighting brand",
      "A musical note"
    ],
    correctAnswer: 1,
    explanation: "Zigbee is a low-power wireless mesh networking protocol widely used in smart home devices, operating at 2.4GHz and supporting thousands of nodes.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 107,
    question: "What is Matter in smart home technology?",
    options: [
      "Physical substance",
      "A new interoperability standard unifying smart home ecosystems",
      "A measurement unit",
      "A smart speaker brand"
    ],
    correctAnswer: 1,
    explanation: "Matter is a new interoperability standard allowing smart home devices from different manufacturers to work together seamlessly across ecosystems.",
    section: "2.4",
    difficulty: "advanced"
  },
  {
    id: 108,
    question: "What is PoE (Power over Ethernet)?",
    options: [
      "Poetry online",
      "Technology delivering electrical power along with data on Ethernet cables",
      "Point of Entry",
      "Power outside enclosure"
    ],
    correctAnswer: 1,
    explanation: "PoE (Power over Ethernet) delivers DC power alongside data over standard Ethernet cables, eliminating separate power supplies for devices like cameras and access points.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 109,
    question: "What power levels can PoE provide?",
    options: [
      "Only 5W",
      "From 15W (PoE) to 90W+ (PoE++/802.3bt)",
      "Only 1W",
      "Unlimited power"
    ],
    correctAnswer: 1,
    explanation: "PoE standards range from 15.4W (802.3af) through 30W (802.3at/PoE+) to 90W+ (802.3bt/PoE++) for high-power devices like PTZ cameras or displays.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 110,
    question: "What is PoE lighting?",
    options: [
      "Poetry about lighting",
      "LED lighting systems powered and controlled through Ethernet cables",
      "Outdoor lighting",
      "Pathway lighting"
    ],
    correctAnswer: 1,
    explanation: "PoE lighting uses Ethernet cables to deliver both power and control data to LED luminaires, enabling individual fixture control and data collection.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 111,
    question: "What is the benefit of PoE lighting in commercial buildings?",
    options: [
      "Brighter lights",
      "Granular control, energy monitoring per fixture, and integration with building systems",
      "Cheaper cables",
      "No maintenance needed"
    ],
    correctAnswer: 1,
    explanation: "PoE lighting enables individual fixture control, real-time energy monitoring, occupancy data collection, and easy integration with BMS and IT systems.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 112,
    question: "What is a smart lighting scene?",
    options: [
      "A beautiful light display",
      "A preset combination of light levels and colours for different activities or moods",
      "A movie scene",
      "An outdoor setting"
    ],
    correctAnswer: 1,
    explanation: "A lighting scene is a preset combination of individual light settings (levels, colours, zones) that can be recalled with a single command for different activities.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 113,
    question: "What is human-centric lighting (HCL)?",
    options: [
      "Lighting only for humans",
      "Lighting designed to support human health and circadian rhythm through colour and intensity changes",
      "Manual lighting control",
      "Energy-saving lighting"
    ],
    correctAnswer: 1,
    explanation: "Human-centric lighting adjusts colour temperature and intensity throughout the day to support natural circadian rhythms and improve wellbeing and productivity.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 114,
    question: "What is tuneable white lighting?",
    options: [
      "Painting lights white",
      "LED lighting that can adjust colour temperature from warm to cool white",
      "Self-cleaning lights",
      "Automatic dimming"
    ],
    correctAnswer: 1,
    explanation: "Tuneable white lighting uses multiple LED types to adjust colour temperature, typically from warm white (2700K) to cool daylight (6500K).",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 115,
    question: "What is an IoT sensor in buildings?",
    options: [
      "An internet-connected sensor that collects and transmits data about building conditions",
      "A regular sensor",
      "An outdoor sensor",
      "A temperature sensor only"
    ],
    correctAnswer: 0,
    explanation: "IoT sensors are internet-connected devices that monitor building conditions (temperature, occupancy, air quality, etc.) and transmit data for analysis and control.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 116,
    question: "What is indoor air quality (IAQ) monitoring?",
    options: [
      "Checking for leaks",
      "Monitoring CO2, humidity, VOCs, and particulates to ensure healthy indoor environments",
      "Air conditioning servicing",
      "Opening windows"
    ],
    correctAnswer: 1,
    explanation: "IAQ monitoring uses sensors to measure CO2 levels, humidity, VOCs, and particulates, enabling ventilation control to maintain healthy indoor environments.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 117,
    question: "What CO2 level typically triggers increased ventilation?",
    options: [
      "Any CO2 present",
      "800-1000ppm, with outdoor levels around 400ppm",
      "5000ppm",
      "10,000ppm"
    ],
    correctAnswer: 1,
    explanation: "CO2 levels above 800-1000ppm typically trigger increased ventilation in demand-controlled systems. Outdoor air is around 400ppm; levels above 1500ppm indicate poor ventilation.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 118,
    question: "What is demand-controlled ventilation (DCV)?",
    options: [
      "Manual ventilation control",
      "Automatic ventilation adjustment based on occupancy or air quality sensors",
      "Maximum ventilation always",
      "No ventilation"
    ],
    correctAnswer: 1,
    explanation: "DCV automatically adjusts ventilation rates based on actual occupancy (CO2 sensors) or air quality, saving energy compared to fixed ventilation rates.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 119,
    question: "What is a building digital twin?",
    options: [
      "Two identical buildings",
      "A virtual replica of a building integrating real-time data for monitoring and simulation",
      "A backup building system",
      "Building blueprints"
    ],
    correctAnswer: 1,
    explanation: "A digital twin is a virtual model of a building that integrates real-time sensor data, enabling monitoring, analysis, simulation, and optimisation of building performance.",
    section: "2.4",
    difficulty: "advanced"
  },
  {
    id: 120,
    question: "What is BIM in building design?",
    options: [
      "Building Internet Management",
      "Building Information Modelling - digital representation with data about building elements",
      "Basic Installation Method",
      "British Installation Manual"
    ],
    correctAnswer: 1,
    explanation: "BIM (Building Information Modelling) creates intelligent 3D models containing data about building elements, used throughout design, construction, and operation.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 121,
    question: "What is a smart meter In-Home Display (IHD)?",
    options: [
      "A TV display",
      "A device showing real-time energy usage and costs from the smart meter",
      "Indoor heating display",
      "Internet home device"
    ],
    correctAnswer: 1,
    explanation: "An IHD is a portable display unit that shows real-time gas and electricity consumption and costs from the smart meter, helping users understand usage.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 122,
    question: "What is load balancing in EV charging?",
    options: [
      "Weighing vehicles",
      "Distributing available power across multiple charge points to prevent overload",
      "Balancing batteries",
      "Vehicle positioning"
    ],
    correctAnswer: 1,
    explanation: "Load balancing (or load management) distributes available electrical capacity across multiple EV chargers, preventing main supply overload while maximising charging.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 123,
    question: "What is an energy dashboard?",
    options: [
      "A vehicle dashboard",
      "A visual display presenting real-time energy consumption data and trends",
      "A control panel",
      "An energy meter"
    ],
    correctAnswer: 1,
    explanation: "An energy dashboard visualises real-time and historical energy data, showing consumption patterns, costs, and comparisons to help identify savings opportunities.",
    section: "2.4",
    difficulty: "basic"
  },
  {
    id: 124,
    question: "What is predictive maintenance in building systems?",
    options: [
      "Scheduled maintenance",
      "Using data and analytics to predict when equipment will need maintenance before failure",
      "Emergency repairs",
      "Replacing old equipment"
    ],
    correctAnswer: 1,
    explanation: "Predictive maintenance uses sensor data and analytics to predict when equipment is likely to fail, enabling maintenance before breakdown occurs.",
    section: "2.4",
    difficulty: "intermediate"
  },
  {
    id: 125,
    question: "What is fault detection and diagnostics (FDD)?",
    options: [
      "Finding building faults",
      "Automated systems that identify operational faults and their likely causes in building systems",
      "Manual inspections",
      "Fire detection"
    ],
    correctAnswer: 1,
    explanation: "FDD systems automatically analyse building data to detect operational faults, inefficiencies, and their probable causes, enabling faster resolution.",
    section: "2.4",
    difficulty: "advanced"
  },

  // ============================================
  // Section 2.5: EPCs & Compliance (Questions 126-150)
  // ============================================
  {
    id: 126,
    question: "How long is an EPC valid for?",
    options: [
      "1 year",
      "10 years",
      "5 years",
      "Indefinitely"
    ],
    correctAnswer: 1,
    explanation: "An EPC is valid for 10 years from the date of issue, unless significant changes are made to the property that affect its energy performance.",
    section: "2.5",
    difficulty: "basic"
  },
  {
    id: 127,
    question: "When must an EPC be provided?",
    options: [
      "Only when requested",
      "When a building is built, sold, or rented",
      "Every year",
      "Only for new buildings"
    ],
    correctAnswer: 1,
    explanation: "An EPC must be provided when a building is constructed, sold, or let. It must be made available to prospective buyers or tenants.",
    section: "2.5",
    difficulty: "basic"
  },
  {
    id: 128,
    question: "Who can produce an EPC?",
    options: [
      "Anyone",
      "An accredited domestic or non-domestic energy assessor",
      "Only architects",
      "Only builders"
    ],
    correctAnswer: 1,
    explanation: "EPCs must be produced by accredited energy assessors registered with an approved accreditation scheme.",
    section: "2.5",
    difficulty: "basic"
  },
  {
    id: 129,
    question: "What does the EPC recommendations report contain?",
    options: [
      "Legal requirements only",
      "Cost-effective improvements to increase the energy efficiency rating",
      "Decoration suggestions",
      "Structural recommendations"
    ],
    correctAnswer: 1,
    explanation: "The EPC recommendations report suggests cost-effective improvements that could increase the property's energy rating, with estimated costs and potential savings.",
    section: "2.5",
    difficulty: "basic"
  },
  {
    id: 130,
    question: "What is MEES (Minimum Energy Efficiency Standards)?",
    options: [
      "Maintenance standards",
      "Regulations setting minimum EPC ratings for rental properties",
      "Manufacturing standards",
      "Metering standards"
    ],
    correctAnswer: 1,
    explanation: "MEES regulations set minimum EPC ratings that rental properties must achieve. Currently Band E, with proposals to increase to C for some properties.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 131,
    question: "What exemptions exist for MEES requirements?",
    options: [
      "None",
      "If improvements are not cost-effective (payback over 7 years), wall insulation would damage property, or consent not obtained",
      "Only if property is empty",
      "Only for old buildings"
    ],
    correctAnswer: 1,
    explanation: "MEES exemptions include improvements not being cost-effective (7-year payback test), wall insulation causing damage, third-party consent not being obtainable, or recent property acquisition.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 132,
    question: "What penalty can landlords face for MEES non-compliance?",
    options: [
      "No penalty",
      "Financial penalties up to £150,000 for non-domestic properties",
      "£100 fine",
      "Only a warning"
    ],
    correctAnswer: 1,
    explanation: "MEES non-compliance can result in civil penalties. Non-domestic property penalties can reach £150,000, with domestic penalties typically up to £5,000.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 133,
    question: "What is a DEC (Display Energy Certificate)?",
    options: [
      "Decoration certificate",
      "A certificate showing actual energy use in public buildings over 250m²",
      "Design certificate",
      "Development certificate"
    ],
    correctAnswer: 1,
    explanation: "A DEC shows the actual energy performance of a public building based on metered consumption, required for buildings over 250m² frequently visited by the public.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 134,
    question: "What is the difference between an EPC and a DEC?",
    options: [
      "No difference",
      "EPC is based on calculated/design performance; DEC shows actual measured energy use",
      "DEC is for homes; EPC is for commercial",
      "EPC is annual; DEC is one-off"
    ],
    correctAnswer: 1,
    explanation: "EPCs are based on calculated/designed energy performance. DECs show actual operational energy use based on metered consumption over the past year.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 135,
    question: "What is an ESOS (Energy Savings Opportunity Scheme) audit?",
    options: [
      "Optional energy survey",
      "Mandatory energy audit for large UK organisations every 4 years",
      "Emergency survey",
      "Equipment survey"
    ],
    correctAnswer: 1,
    explanation: "ESOS requires large UK organisations (250+ employees or >€50M turnover) to conduct energy audits every 4 years, identifying energy saving opportunities.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 136,
    question: "What is SECR (Streamlined Energy and Carbon Reporting)?",
    options: [
      "Security reporting",
      "Mandatory energy and carbon reporting for qualifying large UK companies",
      "Sector reporting",
      "Sales reporting"
    ],
    correctAnswer: 1,
    explanation: "SECR requires qualifying large UK companies to report energy use and carbon emissions in their annual reports, including intensity ratios and efficiency actions.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 137,
    question: "What is an air conditioning inspection report?",
    options: [
      "A cleaning record",
      "A mandatory inspection for AC systems over 12kW, assessing efficiency and sizing",
      "Installation certificate",
      "Service record"
    ],
    correctAnswer: 1,
    explanation: "AC systems over 12kW must be inspected by an accredited assessor every 5 years, assessing efficiency and providing recommendations for improvement.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 138,
    question: "What is the Building Regulations Part F about?",
    options: [
      "Fire safety",
      "Ventilation requirements",
      "Foundations",
      "Fuel storage"
    ],
    correctAnswer: 1,
    explanation: "Part F of the Building Regulations covers ventilation requirements in buildings to maintain indoor air quality and prevent condensation.",
    section: "2.5",
    difficulty: "basic"
  },
  {
    id: 139,
    question: "What is the TM54 methodology?",
    options: [
      "Testing method",
      "CIBSE guidance for predicting actual operational energy use in buildings",
      "Temperature measurement",
      "Trade marking"
    ],
    correctAnswer: 1,
    explanation: "CIBSE TM54 provides methodology for predicting operational energy use in buildings, addressing the 'performance gap' between design and actual performance.",
    section: "2.5",
    difficulty: "advanced"
  },
  {
    id: 140,
    question: "What is the 'performance gap' in buildings?",
    options: [
      "Gap in construction",
      "The difference between designed/predicted and actual operational energy performance",
      "Gap in insulation",
      "Gap in funding"
    ],
    correctAnswer: 1,
    explanation: "The performance gap is the common discrepancy between a building's designed/predicted energy performance and its actual operational energy consumption.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 141,
    question: "What is net zero carbon in buildings?",
    options: [
      "No carbon used in construction",
      "A building that produces zero net carbon emissions over a year through efficiency and renewables",
      "Zero energy cost",
      "Zero occupancy"
    ],
    correctAnswer: 1,
    explanation: "Net zero carbon means a building's operations result in zero net carbon emissions annually, through high efficiency, on-site renewables, and/or carbon offsetting.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 142,
    question: "What is embodied carbon in buildings?",
    options: [
      "Carbon in the air",
      "The carbon emissions from materials, construction, and eventual demolition - the building's lifecycle",
      "Breathing carbon",
      "Carbon storage"
    ],
    correctAnswer: 1,
    explanation: "Embodied carbon includes emissions from extracting materials, manufacturing, transporting, constructing, maintaining, and eventually demolishing a building.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 143,
    question: "What is NABERS UK?",
    options: [
      "A naming convention",
      "A rating system for actual operational energy performance of commercial buildings",
      "A construction standard",
      "A neighbourhood scheme"
    ],
    correctAnswer: 1,
    explanation: "NABERS UK rates commercial buildings based on actual operational energy use, providing a star rating from 1-6 stars for transparency about real performance.",
    section: "2.5",
    difficulty: "advanced"
  },
  {
    id: 144,
    question: "What is BREEAM?",
    options: [
      "A lighting brand",
      "Building Research Establishment Environmental Assessment Method - a sustainability rating",
      "British Real Estate Assessment",
      "Building Regulation Extension"
    ],
    correctAnswer: 1,
    explanation: "BREEAM is a widely used sustainability assessment method for buildings, rating performance across categories including energy, water, materials, and ecology.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 145,
    question: "What BREEAM ratings are available?",
    options: [
      "A to G",
      "Pass, Good, Very Good, Excellent, Outstanding",
      "1 to 5 stars",
      "Bronze, Silver, Gold"
    ],
    correctAnswer: 1,
    explanation: "BREEAM ratings are: Unclassified, Pass, Good, Very Good, Excellent, and Outstanding, based on percentage score across various sustainability categories.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 146,
    question: "What is LEED certification?",
    options: [
      "Lead testing",
      "Leadership in Energy and Environmental Design - an international green building rating",
      "Lighting efficiency",
      "Legal environmental documentation"
    ],
    correctAnswer: 1,
    explanation: "LEED (Leadership in Energy and Environmental Design) is an internationally recognised green building certification system with levels from Certified to Platinum.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 147,
    question: "What is a Passivhaus building?",
    options: [
      "A passive investment property",
      "A building designed to ultra-low energy standards with minimal heating demand",
      "An inactive building",
      "A holiday home"
    ],
    correctAnswer: 1,
    explanation: "Passivhaus is a rigorous building standard achieving very low energy consumption through excellent insulation, airtightness, heat recovery, and solar gain management.",
    section: "2.5",
    difficulty: "intermediate"
  },
  {
    id: 148,
    question: "What maximum heating demand does Passivhaus certification require?",
    options: [
      "50 kWh/m²/year",
      "15 kWh/m²/year",
      "100 kWh/m²/year",
      "No limit"
    ],
    correctAnswer: 1,
    explanation: "Passivhaus certification requires maximum heating/cooling demand of 15 kWh/m²/year, achieved through exceptional building fabric and heat recovery ventilation.",
    section: "2.5",
    difficulty: "advanced"
  },
  {
    id: 149,
    question: "What is the Green Building Council?",
    options: [
      "A government department",
      "An industry body promoting sustainable building practices and policy",
      "A paint manufacturer",
      "A recycling company"
    ],
    correctAnswer: 1,
    explanation: "The UK Green Building Council is an industry network promoting sustainability in the built environment through policy influence, best practice guidance, and member collaboration.",
    section: "2.5",
    difficulty: "basic"
  },
  {
    id: 150,
    question: "What is the Building Regulations Part O about?",
    options: [
      "Oxygen levels",
      "Overheating mitigation in new residential buildings",
      "Outdoor spaces",
      "Occupancy limits"
    ],
    correctAnswer: 1,
    explanation: "Part O (introduced 2022) sets requirements to mitigate overheating risk in new residential buildings, addressing concerns about climate change and summer comfort.",
    section: "2.5",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 2.6: Sustainability (Questions 151-175)
  // ============================================
  {
    id: 151,
    question: "What is the UK's net zero target year?",
    options: [
      "2030",
      "2040",
      "2050",
      "2060"
    ],
    correctAnswer: 2,
    explanation: "The UK has a legally binding target to achieve net zero greenhouse gas emissions by 2050 under the Climate Change Act 2008 (as amended).",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 152,
    question: "What is the circular economy in construction?",
    options: [
      "Round buildings",
      "A system minimising waste by reusing, recycling, and regenerating materials",
      "Economic cycles",
      "Circular planning"
    ],
    correctAnswer: 1,
    explanation: "The circular economy aims to eliminate waste by designing for durability, reuse, and recycling, keeping materials in use rather than disposing of them.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 153,
    question: "What is a carbon footprint?",
    options: [
      "A physical footprint",
      "The total greenhouse gas emissions caused by an individual, organisation, or product",
      "A measurement of walking",
      "A soil test"
    ],
    correctAnswer: 1,
    explanation: "A carbon footprint measures total greenhouse gas emissions (expressed as CO2 equivalent) associated with an activity, product, organisation, or individual.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 154,
    question: "What is lifecycle assessment (LCA)?",
    options: [
      "Assessment of human life",
      "Evaluating environmental impacts throughout a product's life from raw materials to disposal",
      "Product lifespan testing",
      "Building inspection"
    ],
    correctAnswer: 1,
    explanation: "LCA evaluates environmental impacts throughout a product or building's entire lifecycle, from raw material extraction through use to end-of-life disposal or recycling.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 155,
    question: "What is scope 1, 2, and 3 emissions?",
    options: [
      "Different sizes of emissions",
      "Direct emissions (1), indirect from purchased energy (2), and value chain emissions (3)",
      "Types of pollution",
      "Emission testing levels"
    ],
    correctAnswer: 1,
    explanation: "Scope 1: direct emissions from owned/controlled sources. Scope 2: indirect from purchased energy. Scope 3: all other indirect emissions in the value chain.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 156,
    question: "What is carbon offsetting?",
    options: [
      "Carbon counting",
      "Compensating for emissions by investing in projects that reduce CO2 elsewhere",
      "Carbon trading",
      "Carbon storage"
    ],
    correctAnswer: 1,
    explanation: "Carbon offsetting compensates for emissions by investing in projects that reduce, avoid, or remove equivalent CO2 emissions elsewhere, such as reforestation.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 157,
    question: "What is a Science Based Target?",
    options: [
      "A laboratory target",
      "An emissions reduction target aligned with climate science to limit global warming",
      "A research goal",
      "A scientific experiment"
    ],
    correctAnswer: 1,
    explanation: "Science Based Targets are corporate emissions reduction targets consistent with climate science requirements to limit global warming to 1.5°C or well below 2°C.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 158,
    question: "What is the purpose of the Climate Change Committee?",
    options: [
      "Organising climate events",
      "Independent body advising UK government on emissions targets and progress",
      "Weather forecasting",
      "International negotiations"
    ],
    correctAnswer: 1,
    explanation: "The Climate Change Committee is an independent statutory body advising UK governments on emissions targets and reporting on progress towards them.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 159,
    question: "What is greenwashing?",
    options: [
      "Cleaning green products",
      "Making misleading claims about environmental benefits to appear more sustainable",
      "Painting things green",
      "Environmental cleaning"
    ],
    correctAnswer: 1,
    explanation: "Greenwashing is making false or misleading claims about environmental credentials to create an impression of sustainability without substantive action.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 160,
    question: "What are Sustainable Development Goals (SDGs)?",
    options: [
      "Local council targets",
      "17 UN global goals addressing economic, social, and environmental challenges by 2030",
      "Building targets",
      "Energy goals"
    ],
    correctAnswer: 1,
    explanation: "The SDGs are 17 interconnected global goals adopted by UN member states addressing poverty, inequality, climate, environmental degradation, peace, and justice by 2030.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 161,
    question: "What is the Paris Agreement?",
    options: [
      "A French building code",
      "An international treaty on climate change limiting global warming to 1.5-2°C",
      "A construction agreement",
      "A trade deal"
    ],
    correctAnswer: 1,
    explanation: "The Paris Agreement is a legally binding international treaty on climate change, aiming to limit global warming to well below 2°C, preferably 1.5°C, above pre-industrial levels.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 162,
    question: "What is ESG in business?",
    options: [
      "Equipment Safety Guidelines",
      "Environmental, Social, and Governance - criteria for assessing corporate sustainability",
      "Energy Saving Guidelines",
      "Emergency Services Group"
    ],
    correctAnswer: 1,
    explanation: "ESG (Environmental, Social, Governance) criteria are used by investors and stakeholders to evaluate corporate behaviour and sustainability performance.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 163,
    question: "What is a green lease?",
    options: [
      "A lease on a green building",
      "A lease including environmental commitments from landlord and tenant",
      "A short lease",
      "A cheap lease"
    ],
    correctAnswer: 1,
    explanation: "A green lease includes clauses committing both landlord and tenant to sustainable practices, energy efficiency measures, and data sharing.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 164,
    question: "What is the electrification of heat?",
    options: [
      "Electric fires",
      "Replacing fossil fuel heating with electric systems like heat pumps",
      "Electric blankets",
      "Power station heating"
    ],
    correctAnswer: 1,
    explanation: "Electrification of heat involves replacing gas boilers and other fossil fuel heating with efficient electric systems, primarily heat pumps, to decarbonise buildings.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 165,
    question: "Why is grid decarbonisation important for building emissions?",
    options: [
      "It isn't relevant",
      "As grid electricity becomes cleaner, electric heating produces fewer emissions than gas",
      "Only for renewable energy",
      "For industrial use only"
    ],
    correctAnswer: 1,
    explanation: "As the electricity grid decarbonises (more renewables, less fossil fuel), electric heating produces fewer emissions, eventually making heat pumps significantly cleaner than gas.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 166,
    question: "What is hydrogen heating?",
    options: [
      "Water heating",
      "Using hydrogen gas (potentially blended with natural gas or 100%) for building heating",
      "Chemical heating",
      "Industrial heating only"
    ],
    correctAnswer: 1,
    explanation: "Hydrogen heating proposes using hydrogen (blended or pure) in modified boilers for building heat, though its viability compared to heat pumps is debated.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 167,
    question: "What is district heating?",
    options: [
      "Heating a district office",
      "A centralised heating system distributing heat to multiple buildings from a central source",
      "Regional heating regulations",
      "Neighbourhood heating rules"
    ],
    correctAnswer: 1,
    explanation: "District heating distributes heat from a central plant (using various sources) through insulated pipes to multiple buildings, potentially achieving economies of scale.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 168,
    question: "What is a heat network?",
    options: [
      "A heating company",
      "Another term for district heating - distributing heat from central source to buildings",
      "A social network",
      "A heating design"
    ],
    correctAnswer: 1,
    explanation: "Heat networks (district heating) distribute heat generated centrally to residential and commercial buildings through a network of insulated pipes.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 169,
    question: "What is modern methods of construction (MMC)?",
    options: [
      "Current building techniques",
      "Off-site manufacturing and innovative construction techniques reducing waste and time",
      "Updated regulations",
      "New tools"
    ],
    correctAnswer: 1,
    explanation: "MMC includes off-site manufacturing, modular construction, and other innovations that can improve quality, reduce waste, speed construction, and enhance sustainability.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 170,
    question: "What is retrofit in building terms?",
    options: [
      "Installing old equipment",
      "Upgrading existing buildings with improved insulation, heating, and technologies",
      "Moving furniture",
      "Painting and decorating"
    ],
    correctAnswer: 1,
    explanation: "Retrofit means upgrading existing buildings with improved insulation, efficient heating, renewables, and smart controls to reduce energy consumption and carbon emissions.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 171,
    question: "What is the PAS 2035 standard?",
    options: [
      "A parking standard",
      "A framework for domestic retrofit projects ensuring quality and risk management",
      "A product standard",
      "A planning standard"
    ],
    correctAnswer: 1,
    explanation: "PAS 2035 is the overarching framework for domestic retrofit, requiring holistic assessment, appropriate measures, and coordination to ensure quality and avoid unintended consequences.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 172,
    question: "What is fuel poverty?",
    options: [
      "Running out of petrol",
      "When a household cannot afford to adequately heat their home",
      "Low oil prices",
      "Energy company bankruptcy"
    ],
    correctAnswer: 1,
    explanation: "Fuel poverty occurs when a household's fuel costs are above average and spending that amount would leave them below the poverty line.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 173,
    question: "What is the ECO scheme?",
    options: [
      "An ecology programme",
      "Energy Company Obligation - requiring energy suppliers to fund energy efficiency improvements",
      "An economic programme",
      "Emergency conservation order"
    ],
    correctAnswer: 1,
    explanation: "ECO (Energy Company Obligation) requires large energy suppliers to fund energy efficiency improvements in qualifying households, particularly those in fuel poverty.",
    section: "2.6",
    difficulty: "intermediate"
  },
  {
    id: 174,
    question: "What is the Great British Insulation Scheme?",
    options: [
      "A competition",
      "A government scheme providing insulation grants to improve energy efficiency",
      "An award programme",
      "A research project"
    ],
    correctAnswer: 1,
    explanation: "The Great British Insulation Scheme helps households improve insulation through grants, targeting properties in lower EPC bands and fuel poor households.",
    section: "2.6",
    difficulty: "basic"
  },
  {
    id: 175,
    question: "What is stranded assets risk in buildings?",
    options: [
      "Lost property",
      "Risk that buildings become unmarketable or devalued due to poor energy performance",
      "Abandoned buildings",
      "Asset theft"
    ],
    correctAnswer: 1,
    explanation: "Stranded asset risk means buildings with poor energy performance may become unmarketable, unlettable, or significantly devalued as standards tighten.",
    section: "2.6",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 2.7: Future Technologies (Questions 176-200)
  // ============================================
  {
    id: 176,
    question: "What is Vehicle-to-Home (V2H)?",
    options: [
      "A vehicle delivery service",
      "Using an EV battery to power home appliances, acting as a home battery",
      "Vehicle transport",
      "Home vehicle storage"
    ],
    correctAnswer: 1,
    explanation: "V2H allows electric vehicles to discharge power to supply a home, using the EV battery as energy storage for backup power or time-of-use optimization.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 177,
    question: "What is wireless EV charging?",
    options: [
      "Charging without a car",
      "Inductive charging transferring power without physical cable connection",
      "Remote charging stations",
      "Solar charging"
    ],
    correctAnswer: 1,
    explanation: "Wireless EV charging uses electromagnetic induction to transfer power from a pad in the ground to the vehicle without requiring a physical cable connection.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 178,
    question: "What is solid-state battery technology?",
    options: [
      "Frozen batteries",
      "Batteries using solid electrolyte instead of liquid, offering higher energy density and safety",
      "Hard battery cases",
      "Stationary batteries"
    ],
    correctAnswer: 1,
    explanation: "Solid-state batteries replace liquid electrolyte with solid material, potentially offering higher energy density, faster charging, longer life, and improved safety.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 179,
    question: "What is green hydrogen?",
    options: [
      "Coloured hydrogen gas",
      "Hydrogen produced using renewable electricity through electrolysis of water",
      "Natural hydrogen",
      "Hydrogen from plants"
    ],
    correctAnswer: 1,
    explanation: "Green hydrogen is produced by electrolysis of water using renewable electricity, producing hydrogen with zero carbon emissions in the production process.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 180,
    question: "What is an electrolyser?",
    options: [
      "An electrical analyzer",
      "Equipment that uses electricity to split water into hydrogen and oxygen",
      "A type of battery",
      "An electrical meter"
    ],
    correctAnswer: 1,
    explanation: "An electrolyser uses electricity to split water (H2O) into hydrogen and oxygen through electrolysis. When powered by renewables, it produces green hydrogen.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 181,
    question: "What is a fuel cell?",
    options: [
      "A fuel tank",
      "A device that generates electricity from hydrogen and oxygen through chemical reaction",
      "A battery cell",
      "A solar cell"
    ],
    correctAnswer: 1,
    explanation: "A fuel cell generates electricity through chemical reaction between hydrogen and oxygen, producing only water as a byproduct. Used in vehicles and buildings.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 182,
    question: "What is carbon capture and storage (CCS)?",
    options: [
      "Capturing carbon for sale",
      "Capturing CO2 emissions and storing them underground to prevent atmospheric release",
      "Carbon counting",
      "Carbon compression"
    ],
    correctAnswer: 1,
    explanation: "CCS captures CO2 from industrial processes or power generation and stores it permanently underground in geological formations to prevent atmospheric release.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 183,
    question: "What is direct air capture (DAC)?",
    options: [
      "Air conditioning",
      "Technology that captures CO2 directly from ambient air for storage or use",
      "Air quality monitoring",
      "Ventilation system"
    ],
    correctAnswer: 1,
    explanation: "Direct air capture extracts CO2 directly from ambient air using chemical processes, which can then be stored permanently or used in various applications.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 184,
    question: "What is building-integrated photovoltaics (BIPV)?",
    options: [
      "Built-in lights",
      "Solar cells integrated into building materials like roof tiles, facades, or windows",
      "Interior solar panels",
      "Building inspections"
    ],
    correctAnswer: 1,
    explanation: "BIPV integrates photovoltaic materials into building components like roof tiles, facades, or glazing, generating electricity while serving as construction material.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 185,
    question: "What is a smart grid?",
    options: [
      "An intelligent fence",
      "An electricity network using digital technology to optimise generation, distribution, and consumption",
      "A smart meter",
      "A grid of computers"
    ],
    correctAnswer: 1,
    explanation: "A smart grid uses digital communication and control technology to manage electricity flow, integrate renewables, enable demand response, and improve efficiency.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 186,
    question: "What is grid-scale battery storage?",
    options: [
      "Small domestic batteries",
      "Large battery installations storing electricity to balance grid supply and demand",
      "Battery warehouses",
      "Grid maintenance equipment"
    ],
    correctAnswer: 1,
    explanation: "Grid-scale battery storage involves large installations (often tens of MW) that store electricity to balance supply and demand, support renewables, and provide grid services.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 187,
    question: "What is pumped hydro storage?",
    options: [
      "Water pumping",
      "Storing energy by pumping water uphill, then releasing it through turbines when needed",
      "Hydroelectric dam",
      "Water treatment"
    ],
    correctAnswer: 1,
    explanation: "Pumped hydro stores energy by pumping water to an upper reservoir when electricity is cheap/plentiful, then releasing it through turbines to generate power when needed.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 188,
    question: "What is a virtual power plant (VPP)?",
    options: [
      "A simulated power station",
      "Aggregated distributed energy resources acting together as a single power plant",
      "Online power monitoring",
      "Digital power generation"
    ],
    correctAnswer: 1,
    explanation: "A VPP aggregates multiple distributed energy resources (batteries, EVs, solar, flexible loads) to function together as a single dispatchable resource for grid services.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 189,
    question: "What is peer-to-peer energy trading?",
    options: [
      "Trading energy companies",
      "Direct energy trading between producers and consumers without traditional utilities",
      "Stock market trading",
      "Professional energy exchange"
    ],
    correctAnswer: 1,
    explanation: "Peer-to-peer energy trading allows prosumers (producer-consumers) to sell excess energy directly to neighbours or other consumers, often enabled by blockchain.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 190,
    question: "What is blockchain in energy applications?",
    options: [
      "Energy blocking",
      "Distributed ledger technology enabling transparent, secure energy transactions and trading",
      "Power chain",
      "Block diagram"
    ],
    correctAnswer: 1,
    explanation: "Blockchain in energy enables transparent, secure recording of energy transactions, supporting peer-to-peer trading, renewable certificates, and grid management.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 191,
    question: "What is artificial intelligence (AI) in building management?",
    options: [
      "Robot buildings",
      "Using machine learning to optimise building operations, predict faults, and improve efficiency",
      "Automated cleaning",
      "Smart speakers"
    ],
    correctAnswer: 1,
    explanation: "AI in buildings uses machine learning to analyse data, predict energy consumption, optimise HVAC operation, detect faults, and continuously improve efficiency.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 192,
    question: "What is predictive energy management?",
    options: [
      "Energy forecasting",
      "Using AI and data to predict and optimise future energy consumption patterns",
      "Predicting power cuts",
      "Energy planning"
    ],
    correctAnswer: 1,
    explanation: "Predictive energy management uses AI to forecast energy demand, weather impacts, and occupancy to proactively optimise building systems for efficiency and comfort.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 193,
    question: "What is thermal energy storage (TES)?",
    options: [
      "Temperature measurement",
      "Storing energy as heat or cold for later use in heating or cooling systems",
      "Thermal insulation",
      "Heat treatment"
    ],
    correctAnswer: 1,
    explanation: "TES stores energy in the form of heat (hot water tanks, ice storage, phase change materials) for later use, enabling load shifting and renewable integration.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 194,
    question: "What is a phase change material (PCM)?",
    options: [
      "A changing material",
      "A material that absorbs/releases heat when changing state (solid/liquid), storing thermal energy",
      "A construction material",
      "A chemical compound"
    ],
    correctAnswer: 1,
    explanation: "PCMs store and release thermal energy during phase transitions (typically solid-liquid), used for temperature regulation and thermal storage in buildings.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 195,
    question: "What is dynamic glazing?",
    options: [
      "Moving windows",
      "Glass that can change its light/heat transmission properties electronically or automatically",
      "Tinted glass",
      "Double glazing"
    ],
    correctAnswer: 1,
    explanation: "Dynamic (smart) glazing can change its transparency, solar heat gain, or tint in response to electrical signals, light levels, or temperature to optimise comfort and energy.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 196,
    question: "What is electrochromic glass?",
    options: [
      "Coloured glass",
      "Glass that changes tint when voltage is applied, controlling light and heat transmission",
      "Electric glass",
      "Chrome-coated glass"
    ],
    correctAnswer: 1,
    explanation: "Electrochromic glass can be electrically switched between transparent and tinted states, enabling dynamic control of daylight, glare, and solar heat gain.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 197,
    question: "What is a positive energy building?",
    options: [
      "A happy building",
      "A building that generates more energy than it consumes over a year",
      "An electric building",
      "A powered building"
    ],
    correctAnswer: 1,
    explanation: "A positive energy building produces more energy than it consumes annually, typically through high efficiency and extensive on-site renewable generation.",
    section: "2.7",
    difficulty: "intermediate"
  },
  {
    id: 198,
    question: "What is the Internet of Things (IoT) in buildings?",
    options: [
      "Building websites",
      "Network of connected sensors and devices enabling data collection and automated control",
      "Smart TVs only",
      "Internet access in buildings"
    ],
    correctAnswer: 1,
    explanation: "IoT in buildings connects sensors, meters, and devices to networks, enabling data collection, analysis, and automated control for optimised building performance.",
    section: "2.7",
    difficulty: "basic"
  },
  {
    id: 199,
    question: "What is energy disaggregation?",
    options: [
      "Separating energy sources",
      "Using AI to identify individual appliance consumption from whole-building smart meter data",
      "Breaking down bills",
      "Energy distribution"
    ],
    correctAnswer: 1,
    explanation: "Energy disaggregation (NILM) uses machine learning to analyse total electricity consumption and identify individual appliance usage without sub-metering.",
    section: "2.7",
    difficulty: "advanced"
  },
  {
    id: 200,
    question: "What are digital twins being used for in buildings?",
    options: [
      "Creating identical buildings",
      "Real-time monitoring, simulation, optimisation, and predictive maintenance",
      "Virtual tours",
      "Architectural rendering"
    ],
    correctAnswer: 1,
    explanation: "Building digital twins integrate real-time data for monitoring, enable simulation of changes, optimise operations, and support predictive maintenance and lifecycle management.",
    section: "2.7",
    difficulty: "intermediate"
  }
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module2Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module2Questions.filter(q => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): Question[] => {
  return module2Questions.filter(q => q.difficulty === difficulty);
};

export default module2Questions;
