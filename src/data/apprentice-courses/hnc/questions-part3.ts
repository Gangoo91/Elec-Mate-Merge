export const questionsPart3 = [
  // Design Principles (Questions 251-312)
  {
    id: 251,
    question: "What is the primary purpose of a design current (Ib) calculation?",
    options: [
      "To determine the maximum current the circuit will carry under normal conditions",
      "To calculate the voltage drop in the circuit",
      "To select the appropriate RCD rating",
      "To determine the earth fault loop impedance"
    ],
    correctAnswer: 0,
    explanation: "The design current (Ib) is the current intended to be carried by the circuit under normal operating conditions. It forms the basis for selecting cable sizes and protective devices.",
    section: "Circuit Design Fundamentals",
    difficulty: "basic",
    topic: "Load Calculations",
    category: "Design Principles"
  },
  {
    id: 252,
    question: "According to BS 7671, what relationship must exist between Ib, In, and Iz?",
    options: [
      "Ib ≤ In ≤ Iz",
      "In ≤ Ib ≤ Iz",
      "Iz ≤ In ≤ Ib",
      "Ib ≤ Iz ≤ In"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires that the design current (Ib) must be less than or equal to the nominal rating of the protective device (In), which must be less than or equal to the current-carrying capacity of the cable (Iz).",
    section: "Circuit Design Fundamentals",
    difficulty: "basic",
    topic: "Protection Coordination",
    category: "Design Principles"
  },
  {
    id: 253,
    question: "What correction factor is applied when cables are grouped together?",
    options: [
      "Cg - grouping factor",
      "Ca - ambient temperature factor",
      "Ci - thermal insulation factor",
      "Cd - depth of burial factor"
    ],
    correctAnswer: 0,
    explanation: "The grouping factor (Cg) is applied when cables are installed in close proximity to each other, as mutual heating reduces their current-carrying capacity.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Correction Factors",
    category: "Design Principles"
  },
  {
    id: 254,
    question: "A single-phase circuit supplies a 3kW resistive load at 230V. What is the design current?",
    options: [
      "13.04A",
      "10.87A",
      "15.65A",
      "11.54A"
    ],
    correctAnswer: 0,
    explanation: "For a resistive load: Ib = P/V = 3000/230 = 13.04A. As the load is purely resistive, there is no power factor to consider.",
    section: "Load Calculations",
    difficulty: "basic",
    topic: "Single-Phase Calculations",
    category: "Design Principles"
  },
  {
    id: 255,
    question: "What is the standard voltage drop limit for lighting circuits in installations supplied from the public network?",
    options: [
      "3% of nominal voltage",
      "5% of nominal voltage",
      "4% of nominal voltage",
      "2% of nominal voltage"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 recommends a maximum voltage drop of 3% for lighting circuits in installations supplied from the public supply network to ensure proper lamp operation.",
    section: "Voltage Drop",
    difficulty: "basic",
    topic: "BS 7671 Requirements",
    category: "Design Principles"
  },
  {
    id: 256,
    question: "When designing a circuit, what does the symbol 'It' represent?",
    options: [
      "Tabulated current-carrying capacity of a cable",
      "Total current in the circuit",
      "Test current for the protective device",
      "Thermal current rating"
    ],
    correctAnswer: 0,
    explanation: "It represents the tabulated current-carrying capacity of a cable as found in the tables in BS 7671 Appendix 4, before any correction factors are applied.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Cable Selection",
    category: "Design Principles"
  },
  {
    id: 257,
    question: "What is the purpose of applying a Ca factor in cable sizing calculations?",
    options: [
      "To account for ambient temperatures different from 30°C",
      "To account for conductor material",
      "To account for circuit arrangement",
      "To account for cable armour"
    ],
    correctAnswer: 0,
    explanation: "The Ca factor corrects for ambient temperatures different from the reference temperature of 30°C for which cable ratings are tabulated. Higher temperatures reduce current-carrying capacity.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Correction Factors",
    category: "Design Principles"
  },
  {
    id: 258,
    question: "A three-phase balanced load draws 50A per phase. What is the neutral current?",
    options: [
      "0A",
      "50A",
      "150A",
      "86.6A"
    ],
    correctAnswer: 0,
    explanation: "In a perfectly balanced three-phase system, the neutral current is zero because the three phase currents are equal in magnitude and 120° apart, causing them to cancel out.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Load Calculations",
    category: "Design Principles"
  },
  {
    id: 259,
    question: "What is discrimination in electrical protection systems?",
    options: [
      "The ability of protective devices to operate in sequence to isolate only the faulty circuit",
      "The selection of different types of protective devices",
      "The testing of protective devices",
      "The coordination of voltage levels"
    ],
    correctAnswer: 0,
    explanation: "Discrimination (or selectivity) ensures that only the protective device nearest to a fault operates, leaving the rest of the installation energised and minimising disruption.",
    section: "Protection Coordination",
    difficulty: "basic",
    topic: "Discrimination",
    category: "Design Principles"
  },
  {
    id: 260,
    question: "What is the formula for calculating voltage drop in a single-phase circuit?",
    options: [
      "Vd = (mV/A/m × Ib × L) / 1000",
      "Vd = Ib × R × L",
      "Vd = P × L / V",
      "Vd = I²R × L"
    ],
    correctAnswer: 0,
    explanation: "Voltage drop is calculated using Vd = (mV/A/m × Ib × L) / 1000, where mV/A/m is the tabulated voltage drop value, Ib is the design current, and L is the cable length in metres.",
    section: "Voltage Drop",
    difficulty: "intermediate",
    topic: "Circuit Design",
    category: "Design Principles"
  },
  {
    id: 261,
    question: "A circuit is protected by a 32A Type B MCB. What is the maximum prospective fault current it can safely interrupt?",
    options: [
      "Depends on the MCB breaking capacity rating (Icn)",
      "320A",
      "3200A",
      "160A"
    ],
    correctAnswer: 0,
    explanation: "The maximum fault current an MCB can safely interrupt depends on its rated breaking capacity (Icn), which is typically 6kA, 10kA, or higher for domestic/commercial MCBs.",
    section: "Protection Devices",
    difficulty: "intermediate",
    topic: "MCB Selection",
    category: "Design Principles"
  },
  {
    id: 262,
    question: "When calculating cable size for a motor circuit, what factor should be applied to the full load current?",
    options: [
      "1.25 (125%)",
      "1.0 (100%)",
      "1.5 (150%)",
      "0.8 (80%)"
    ],
    correctAnswer: 0,
    explanation: "Motor circuits should be designed for 125% of the motor full load current to account for starting currents and ensure the cable can handle continuous motor operation without overheating.",
    section: "Motor Circuits",
    difficulty: "intermediate",
    topic: "Motor Protection",
    category: "Design Principles"
  },
  {
    id: 263,
    question: "What does 'back-up protection' mean in circuit design?",
    options: [
      "A downstream device is protected by an upstream device with higher breaking capacity",
      "A secondary power supply",
      "Duplicate protective devices in parallel",
      "Emergency lighting circuits"
    ],
    correctAnswer: 0,
    explanation: "Back-up protection allows a device with lower breaking capacity to be used when protected by an upstream device with adequate breaking capacity to handle faults exceeding the downstream device's rating.",
    section: "Protection Coordination",
    difficulty: "intermediate",
    topic: "Protection Systems",
    category: "Design Principles"
  },
  {
    id: 264,
    question: "A 6mm² twin and earth cable has a tabulated current rating of 47A (Reference Method C). If the ambient temperature is 40°C, what is the corrected current rating?",
    options: [
      "40.42A",
      "47A",
      "54.05A",
      "35.25A"
    ],
    correctAnswer: 0,
    explanation: "At 40°C ambient, the Ca factor for PVC cables is 0.86. Corrected rating = 47 × 0.86 = 40.42A. Higher temperatures reduce current-carrying capacity.",
    section: "Cable Sizing",
    difficulty: "intermediate",
    topic: "Correction Factors",
    category: "Design Principles"
  },
  {
    id: 265,
    question: "What is the maximum disconnection time for a 230V final circuit not exceeding 32A according to BS 7671?",
    options: [
      "0.4 seconds",
      "0.2 seconds",
      "5 seconds",
      "1 second"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires a maximum disconnection time of 0.4 seconds for final circuits not exceeding 32A in TN systems to ensure safety from electric shock.",
    section: "Fault Protection",
    difficulty: "intermediate",
    topic: "Disconnection Times",
    category: "Design Principles"
  },
  {
    id: 266,
    question: "A three-phase motor has a rating of 15kW at 400V with a power factor of 0.85. What is the line current?",
    options: [
      "25.5A",
      "21.7A",
      "37.5A",
      "30.6A"
    ],
    correctAnswer: 0,
    explanation: "For three-phase: I = P / (√3 × V × pf) = 15000 / (1.732 × 400 × 0.85) = 15000 / 588.88 = 25.5A.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Motor Calculations",
    category: "Design Principles"
  },
  {
    id: 267,
    question: "What is the purpose of the Ci factor in cable sizing?",
    options: [
      "To account for cables surrounded by thermal insulation",
      "To account for cables in conduit",
      "To account for cables in concrete",
      "To account for cables in cold environments"
    ],
    correctAnswer: 0,
    explanation: "The Ci factor accounts for cables that are surrounded by thermal insulation, which severely reduces their ability to dissipate heat and therefore their current-carrying capacity.",
    section: "Cable Sizing",
    difficulty: "intermediate",
    topic: "Correction Factors",
    category: "Design Principles"
  },
  {
    id: 268,
    question: "What is the voltage drop limit for power circuits in installations supplied from the public network?",
    options: [
      "5% of nominal voltage",
      "3% of nominal voltage",
      "4% of nominal voltage",
      "6% of nominal voltage"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 recommends a maximum voltage drop of 5% for power circuits (other than lighting) in installations supplied from the public supply network.",
    section: "Voltage Drop",
    difficulty: "intermediate",
    topic: "BS 7671 Requirements",
    category: "Design Principles"
  },
  {
    id: 269,
    question: "When designing a ring final circuit, what is the maximum floor area that can be served?",
    options: [
      "100m²",
      "50m²",
      "150m²",
      "75m²"
    ],
    correctAnswer: 0,
    explanation: "The conventional design for a ring final circuit limits it to serve a maximum floor area of 100m² to ensure adequate current-carrying capacity for the expected load.",
    section: "Circuit Design",
    difficulty: "intermediate",
    topic: "Ring Circuits",
    category: "Design Principles"
  },
  {
    id: 270,
    question: "What is the adiabatic equation used for in circuit design?",
    options: [
      "To verify that the protective conductor can withstand fault currents",
      "To calculate voltage drop",
      "To determine cable insulation type",
      "To select fuse ratings"
    ],
    correctAnswer: 0,
    explanation: "The adiabatic equation (S = √(I²t)/k) verifies that the cross-sectional area of the protective conductor is adequate to withstand the thermal effects of fault current for the disconnection time.",
    section: "Fault Protection",
    difficulty: "intermediate",
    topic: "CPC Sizing",
    category: "Design Principles"
  },
  {
    id: 271,
    question: "A radial circuit is wired in 2.5mm² cable and protected by a 20A MCB. What is the maximum number of socket outlets permitted?",
    options: [
      "No specific limit, but should be appropriate for the load",
      "6 socket outlets",
      "10 socket outlets",
      "12 socket outlets"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 does not specify a maximum number of socket outlets for radial circuits. The designer must ensure the circuit is appropriate for the anticipated load and floor area served.",
    section: "Circuit Design",
    difficulty: "intermediate",
    topic: "Radial Circuits",
    category: "Design Principles"
  },
  {
    id: 272,
    question: "What is the I2t characteristic used for in protection coordination?",
    options: [
      "To compare energy let-through of protective devices for discrimination",
      "To calculate power consumption",
      "To measure insulation resistance",
      "To determine cable impedance"
    ],
    correctAnswer: 0,
    explanation: "The I²t (energy let-through) characteristic is used to ensure that the downstream device will operate before the upstream device trips, achieving discrimination between protective devices.",
    section: "Protection Coordination",
    difficulty: "intermediate",
    topic: "Discrimination",
    category: "Design Principles"
  },
  {
    id: 273,
    question: "What is the minimum cross-sectional area for a main protective bonding conductor in a TN-S system with a 25mm² line conductor?",
    options: [
      "10mm²",
      "6mm²",
      "16mm²",
      "25mm²"
    ],
    correctAnswer: 0,
    explanation: "According to BS 7671, the main protective bonding conductor should be at least half the CSA of the supply neutral, with a minimum of 6mm² and maximum of 25mm². For a 25mm² line conductor, 10mm² is typically adequate.",
    section: "Earthing",
    difficulty: "intermediate",
    topic: "Bonding Conductors",
    category: "Design Principles"
  },
  {
    id: 274,
    question: "When designing for diversity, what typical demand factor is applied to domestic socket outlets?",
    options: [
      "First 10A at 100%, remainder at 50%",
      "100% for all outlets",
      "50% for all outlets",
      "75% for all outlets"
    ],
    correctAnswer: 0,
    explanation: "For domestic socket outlets, diversity is typically applied as 100% of the first 10A plus 50% of the remainder, recognising that not all outlets will be loaded simultaneously.",
    section: "Load Calculations",
    difficulty: "intermediate",
    topic: "Diversity",
    category: "Design Principles"
  },
  {
    id: 275,
    question: "What is the purpose of a Type 2 surge protective device (SPD)?",
    options: [
      "To protect against transient overvoltages at the distribution board level",
      "To protect against direct lightning strikes",
      "To protect individual equipment",
      "To provide backup power during outages"
    ],
    correctAnswer: 0,
    explanation: "Type 2 SPDs are designed to protect against transient overvoltages and are typically installed at the main distribution board to protect the downstream installation.",
    section: "Protection Devices",
    difficulty: "intermediate",
    topic: "Surge Protection",
    category: "Design Principles"
  },
  {
    id: 276,
    question: "A cable run of 35m supplies a 7.2kW shower at 230V. Using 10mm² cable with mV/A/m of 4.4, what is the voltage drop?",
    options: [
      "4.82V (2.1%)",
      "11.0V (4.8%)",
      "5.39V (2.3%)",
      "7.70V (3.3%)"
    ],
    correctAnswer: 0,
    explanation: "Ib = 7200/230 = 31.3A. Vd = (4.4 × 31.3 × 35)/1000 = 4.82V, which is 4.82/230 × 100 = 2.1% of nominal voltage.",
    section: "Voltage Drop",
    difficulty: "advanced",
    topic: "Circuit Design",
    category: "Design Principles"
  },
  {
    id: 277,
    question: "In a TN-C-S system, what is the maximum earth fault loop impedance for a 32A Type B MCB to achieve 0.4s disconnection?",
    options: [
      "1.44Ω",
      "2.30Ω",
      "0.72Ω",
      "1.15Ω"
    ],
    correctAnswer: 0,
    explanation: "For a Type B MCB, the instantaneous trip current is 5 × In = 160A. Zs = Uo/Ia = 230/160 = 1.44Ω maximum to ensure 0.4s disconnection.",
    section: "Fault Protection",
    difficulty: "advanced",
    topic: "Earth Fault Loop Impedance",
    category: "Design Principles"
  },
  {
    id: 278,
    question: "What is the formula for calculating prospective fault current at a point in an installation?",
    options: [
      "IPFC = Uo / Zs",
      "IPFC = Uo × Zs",
      "IPFC = Uo / (R1 + R2)",
      "IPFC = In × Zs"
    ],
    correctAnswer: 0,
    explanation: "Prospective fault current is calculated as IPFC = Uo/Zs, where Uo is the nominal voltage to earth and Zs is the earth fault loop impedance at the fault location.",
    section: "Fault Protection",
    difficulty: "advanced",
    topic: "Fault Calculations",
    category: "Design Principles"
  },
  {
    id: 279,
    question: "When designing a busbar trunking system, what must be verified regarding fault withstand capability?",
    options: [
      "That the busbar can withstand prospective fault current for the disconnection time",
      "Only the voltage rating",
      "Only the continuous current rating",
      "Only the physical dimensions"
    ],
    correctAnswer: 0,
    explanation: "Busbar systems must be rated to withstand both the thermal and electromagnetic effects of the prospective fault current at the point of installation for the time taken by protective devices to operate.",
    section: "Distribution Systems",
    difficulty: "advanced",
    topic: "Busbar Systems",
    category: "Design Principles"
  },
  {
    id: 280,
    question: "A 50m cable run in conduit (method B) uses 6mm² copper conductors. The ambient temperature is 35°C and 6 circuits are grouped. Calculate the minimum required It value for a 32A circuit.",
    options: [
      "43.4A",
      "32A",
      "38.1A",
      "52.5A"
    ],
    correctAnswer: 0,
    explanation: "Ca (35°C) = 0.94, Cg (6 circuits) = 0.57. It = In / (Ca × Cg) = 32 / (0.94 × 0.57) = 32 / 0.536 = 59.7A minimum. Checking: 6mm² method B = 36A which is insufficient.",
    section: "Cable Sizing",
    difficulty: "advanced",
    topic: "Combined Factors",
    category: "Design Principles"
  },
  {
    id: 281,
    question: "What is the significance of the 'k' value in the adiabatic equation?",
    options: [
      "It represents the conductor material and insulation type constant",
      "It represents the cable length",
      "It represents the fault current",
      "It represents the voltage"
    ],
    correctAnswer: 0,
    explanation: "The 'k' value is a constant that accounts for the conductor material (copper or aluminium), the initial and final temperatures, and the insulation type. Higher k values allow smaller conductors.",
    section: "Fault Protection",
    difficulty: "advanced",
    topic: "CPC Sizing",
    category: "Design Principles"
  },
  {
    id: 282,
    question: "For time-graded discrimination between fuses, what is the typical current ratio required?",
    options: [
      "Upstream fuse rated at least 1.6 times the downstream fuse",
      "Upstream fuse rated at least 1.2 times the downstream fuse",
      "Upstream fuse rated at least 2.0 times the downstream fuse",
      "Upstream fuse rated at least 1.4 times the downstream fuse"
    ],
    correctAnswer: 0,
    explanation: "For BS 88 fuses, a ratio of approximately 1.6:1 between upstream and downstream devices typically ensures discrimination throughout the current range.",
    section: "Protection Coordination",
    difficulty: "advanced",
    topic: "Discrimination",
    category: "Design Principles"
  },
  {
    id: 283,
    question: "What is the external earth fault loop impedance (Ze) typically assumed for a TN-S supply?",
    options: [
      "0.8Ω",
      "0.35Ω",
      "0.2Ω",
      "1.0Ω"
    ],
    correctAnswer: 0,
    explanation: "For design purposes, BS 7671 suggests a typical Ze value of 0.8Ω for TN-S systems. The actual value should be obtained from the DNO or measured during installation.",
    section: "Earthing",
    difficulty: "advanced",
    topic: "Earth Fault Loop Impedance",
    category: "Design Principles"
  },
  {
    id: 284,
    question: "A three-phase unbalanced load has phase currents of 40A, 35A, and 25A. What is the approximate neutral current?",
    options: [
      "13.2A",
      "100A",
      "33.3A",
      "0A"
    ],
    correctAnswer: 0,
    explanation: "For unbalanced loads, the neutral current can be calculated using vector addition. Using the formula with 120° phase displacement gives approximately 13.2A neutral current.",
    section: "Three-Phase Systems",
    difficulty: "advanced",
    topic: "Unbalanced Loads",
    category: "Design Principles"
  },
  {
    id: 285,
    question: "When designing emergency lighting circuits, what is the minimum maintained illuminance on escape routes?",
    options: [
      "1 lux along the centre line",
      "5 lux across the full width",
      "15 lux at all points",
      "50 lux at exits only"
    ],
    correctAnswer: 0,
    explanation: "BS 5266 requires a minimum of 1 lux along the centre line of escape routes up to 2m wide. Higher illuminance is required for wider routes and specific areas.",
    section: "Emergency Systems",
    difficulty: "advanced",
    topic: "Emergency Lighting",
    category: "Design Principles"
  },
  {
    id: 286,
    question: "What factor affects the selection between radial and ring circuit arrangements?",
    options: [
      "All of the listed factors",
      "Load distribution and diversity",
      "Cable cost and installation method",
      "Floor area served"
    ],
    correctAnswer: 0,
    explanation: "Circuit arrangement selection depends on multiple factors including load distribution, diversity, cable costs, installation methods, floor area, and the need for continuity of supply.",
    section: "Circuit Design",
    difficulty: "intermediate",
    topic: "Circuit Arrangements",
    category: "Design Principles"
  },
  {
    id: 287,
    question: "What is the purpose of a shunt trip in circuit design?",
    options: [
      "To allow remote tripping of a circuit breaker",
      "To increase the breaking capacity",
      "To reduce voltage drop",
      "To improve power factor"
    ],
    correctAnswer: 0,
    explanation: "A shunt trip is an accessory that allows a circuit breaker to be tripped remotely by applying a voltage to the trip coil, useful for emergency shutdown systems.",
    section: "Protection Devices",
    difficulty: "intermediate",
    topic: "Circuit Breaker Accessories",
    category: "Design Principles"
  },
  {
    id: 288,
    question: "When designing power factor correction, where is it most effective to install capacitors?",
    options: [
      "As close as possible to the inductive load",
      "At the main distribution board only",
      "At the utility meter",
      "In a central plant room"
    ],
    correctAnswer: 0,
    explanation: "Installing PFC capacitors close to the inductive load reduces reactive current in the maximum amount of cable, providing the greatest reduction in losses and voltage drop.",
    section: "Power Factor Correction",
    difficulty: "advanced",
    topic: "PFC Design",
    category: "Design Principles"
  },
  {
    id: 289,
    question: "What is the design consideration for cables installed in direct sunlight?",
    options: [
      "Apply correction factor for higher ambient temperature",
      "No special consideration required",
      "Only use armoured cables",
      "Increase voltage drop allowance"
    ],
    correctAnswer: 0,
    explanation: "Cables in direct sunlight may experience temperatures significantly above ambient. A correction factor must be applied, or UV-resistant cables with appropriate ratings should be used.",
    section: "Cable Sizing",
    difficulty: "intermediate",
    topic: "External Installations",
    category: "Design Principles"
  },
  {
    id: 290,
    question: "What is the maximum Zs value for a 6A Type B MCB at 0.4s disconnection?",
    options: [
      "7.67Ω",
      "4.60Ω",
      "2.30Ω",
      "11.5Ω"
    ],
    correctAnswer: 0,
    explanation: "For a Type B MCB, Ia = 5 × In = 30A. Zs = Uo/Ia = 230/30 = 7.67Ω maximum. This relatively high value makes Type B MCBs suitable for long cable runs.",
    section: "Fault Protection",
    difficulty: "intermediate",
    topic: "Earth Fault Loop Impedance",
    category: "Design Principles"
  },
  {
    id: 291,
    question: "In harmonic-rich environments, why might the neutral conductor need to be oversized?",
    options: [
      "Triple-N harmonics add in the neutral rather than cancelling",
      "To reduce voltage drop",
      "To improve power factor",
      "For better discrimination"
    ],
    correctAnswer: 0,
    explanation: "Third-order harmonics (and other triple-N harmonics) are in phase in all three phases and therefore add in the neutral rather than cancelling, potentially causing neutral current to exceed phase current.",
    section: "Power Quality",
    difficulty: "advanced",
    topic: "Harmonics",
    category: "Design Principles"
  },
  {
    id: 292,
    question: "What is the purpose of RCBO devices in circuit design?",
    options: [
      "To combine overcurrent and residual current protection in one device",
      "To provide higher breaking capacity",
      "To reduce nuisance tripping",
      "To improve power factor"
    ],
    correctAnswer: 0,
    explanation: "RCBOs combine the functions of an MCB (overcurrent protection) and RCD (earth fault protection) in a single device, useful for individual circuit protection.",
    section: "Protection Devices",
    difficulty: "basic",
    topic: "RCBO Selection",
    category: "Design Principles"
  },
  {
    id: 293,
    question: "When designing for EMC compliance, what cable type is preferred for sensitive circuits?",
    options: [
      "Screened/shielded cable with proper earthing",
      "Standard PVC twin and earth",
      "Unarmoured flex",
      "Large CSA single-core cables"
    ],
    correctAnswer: 0,
    explanation: "Screened cables with the screen properly earthed at appropriate points help reduce electromagnetic interference both emitted by and coupled into sensitive circuits.",
    section: "EMC Compliance",
    difficulty: "advanced",
    topic: "Cable Selection",
    category: "Design Principles"
  },
  {
    id: 294,
    question: "What is the minimum IP rating required for socket outlets in bathrooms Zone 2?",
    options: [
      "IPX4",
      "IPX7",
      "IPX1",
      "IP20"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires a minimum rating of IPX4 (protected against water splashing) for equipment installed in bathroom Zone 2, unless the zone is subject to water jets (IPX5).",
    section: "Special Locations",
    difficulty: "intermediate",
    topic: "Bathroom Installations",
    category: "Design Principles"
  },
  {
    id: 295,
    question: "What is the purpose of a discrimination study?",
    options: [
      "To ensure only the protective device nearest the fault operates",
      "To select the cheapest protective devices",
      "To reduce cable sizes",
      "To improve power factor"
    ],
    correctAnswer: 0,
    explanation: "A discrimination study analyses the time-current characteristics of all protective devices in a system to ensure proper coordination, with only the device nearest the fault operating.",
    section: "Protection Coordination",
    difficulty: "intermediate",
    topic: "Discrimination Studies",
    category: "Design Principles"
  },
  {
    id: 296,
    question: "When designing submain cables, what additional factor must be considered beyond final circuit design?",
    options: [
      "Prospective fault current at the origin and the need for fault withstand capability",
      "Only the connected load",
      "Only the cable length",
      "Only the voltage drop"
    ],
    correctAnswer: 0,
    explanation: "Submain design must account for higher prospective fault currents typically present nearer the supply, ensuring cables and protective devices can withstand fault energy.",
    section: "Distribution Systems",
    difficulty: "advanced",
    topic: "Submain Design",
    category: "Design Principles"
  },
  {
    id: 297,
    question: "What is the conventional load assumed for a 13A socket outlet in diversity calculations?",
    options: [
      "500W to 1kW per outlet for general assessment",
      "3kW per outlet",
      "100W per outlet",
      "13A (3kW) for every outlet"
    ],
    correctAnswer: 0,
    explanation: "For general diversity assessment, socket outlets are often assumed to have a demand of 500W to 1kW each, recognising that full load on all outlets simultaneously is unlikely.",
    section: "Load Calculations",
    difficulty: "intermediate",
    topic: "Diversity",
    category: "Design Principles"
  },
  {
    id: 298,
    question: "What type of device provides protection against arc faults?",
    options: [
      "Arc Fault Detection Device (AFDD)",
      "Residual Current Device (RCD)",
      "Miniature Circuit Breaker (MCB)",
      "Surge Protective Device (SPD)"
    ],
    correctAnswer: 0,
    explanation: "AFDDs detect the characteristic high-frequency signatures of dangerous arcing faults and disconnect the circuit to prevent fires, complementing other protective devices.",
    section: "Protection Devices",
    difficulty: "intermediate",
    topic: "Arc Fault Protection",
    category: "Design Principles"
  },
  {
    id: 299,
    question: "What is the maximum permitted touch voltage in normal dry conditions?",
    options: [
      "50V AC",
      "25V AC",
      "120V DC",
      "230V AC"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 specifies 50V AC as the maximum permitted touch voltage in normal dry conditions. Lower values apply in more hazardous situations such as construction sites.",
    section: "Protection Against Electric Shock",
    difficulty: "basic",
    topic: "Touch Voltage",
    category: "Design Principles"
  },
  {
    id: 300,
    question: "When designing a three-phase distribution board, what determines the arrangement of circuits across phases?",
    options: [
      "Achieving the most balanced load distribution possible",
      "Alphabetical order of circuit names",
      "Physical cable entry positions",
      "Cost of protective devices"
    ],
    correctAnswer: 0,
    explanation: "Circuits should be arranged across the three phases to achieve the most balanced load distribution, minimising neutral current and ensuring even loading of supply transformers.",
    section: "Distribution Systems",
    difficulty: "intermediate",
    topic: "Load Balancing",
    category: "Design Principles"
  },
  {
    id: 301,
    question: "A Type C MCB operates at how many times its rated current for instantaneous tripping?",
    options: [
      "5 to 10 times In",
      "3 to 5 times In",
      "10 to 20 times In",
      "2 to 3 times In"
    ],
    correctAnswer: 0,
    explanation: "Type C MCBs have an instantaneous trip range of 5 to 10 times their rated current, making them suitable for circuits with moderate inrush currents such as small motors.",
    section: "Protection Devices",
    difficulty: "basic",
    topic: "MCB Characteristics",
    category: "Design Principles"
  },
  {
    id: 302,
    question: "What is the purpose of protective equipotential bonding?",
    options: [
      "To reduce touch voltage between simultaneously accessible conductive parts",
      "To carry fault current to earth",
      "To provide the return path for normal current",
      "To protect against overvoltage"
    ],
    correctAnswer: 0,
    explanation: "Protective equipotential bonding connects extraneous conductive parts to the main earthing terminal, reducing potential differences that could cause electric shock.",
    section: "Earthing and Bonding",
    difficulty: "intermediate",
    topic: "Bonding Systems",
    category: "Design Principles"
  },
  {
    id: 303,
    question: "What cable installation reference method applies to cables clipped direct to a non-metallic surface?",
    options: [
      "Reference Method C",
      "Reference Method A",
      "Reference Method B",
      "Reference Method D"
    ],
    correctAnswer: 0,
    explanation: "Reference Method C applies to single-core or multicore cables clipped directly to walls, ceilings, or other non-metallic surfaces where heat can dissipate freely.",
    section: "Cable Installation",
    difficulty: "basic",
    topic: "Reference Methods",
    category: "Design Principles"
  },
  {
    id: 304,
    question: "When is it necessary to consider fault current limiting in design?",
    options: [
      "When prospective fault current exceeds the breaking capacity of downstream devices",
      "Only in domestic installations",
      "Only when using RCDs",
      "Never, as all devices have adequate ratings"
    ],
    correctAnswer: 0,
    explanation: "Current limiting devices are needed when the prospective fault current at a point exceeds the breaking capacity of downstream protective devices, allowing their use through back-up protection.",
    section: "Protection Coordination",
    difficulty: "advanced",
    topic: "Current Limiting",
    category: "Design Principles"
  },
  {
    id: 305,
    question: "What design consideration applies to cables in vertical runs exceeding 5m?",
    options: [
      "Adequate support to prevent mechanical damage from cable weight",
      "Increased voltage drop allowance",
      "Larger conductor size",
      "Additional RCD protection"
    ],
    correctAnswer: 0,
    explanation: "Long vertical cable runs must be adequately supported to prevent the weight of the cable causing damage to insulation or terminations. Support intervals depend on cable type.",
    section: "Cable Installation",
    difficulty: "intermediate",
    topic: "Cable Support",
    category: "Design Principles"
  },
  {
    id: 306,
    question: "What is the significance of 'breaking capacity' when selecting a circuit breaker?",
    options: [
      "The maximum fault current the device can safely interrupt",
      "The normal operating current",
      "The minimum operating current",
      "The leakage current threshold"
    ],
    correctAnswer: 0,
    explanation: "Breaking capacity (Icn or Icu) is the maximum prospective fault current the device can safely interrupt without damage or danger, and must exceed the prospective fault current at the installation point.",
    section: "Protection Devices",
    difficulty: "basic",
    topic: "Circuit Breaker Selection",
    category: "Design Principles"
  },
  {
    id: 307,
    question: "What standard covers the design requirements for fire alarm systems?",
    options: [
      "BS 5839",
      "BS 7671",
      "BS 5266",
      "BS 7430"
    ],
    correctAnswer: 0,
    explanation: "BS 5839 covers fire detection and alarm systems for buildings. Part 1 covers systems in non-domestic premises, while Part 6 covers domestic dwellings.",
    section: "Fire Safety Systems",
    difficulty: "basic",
    topic: "Fire Alarms",
    category: "Design Principles"
  },
  {
    id: 308,
    question: "In circuit design, what does 'derating' refer to?",
    options: [
      "Reducing the current-carrying capacity due to installation conditions",
      "Reducing the voltage rating",
      "Reducing the protection level",
      "Reducing the cable length"
    ],
    correctAnswer: 0,
    explanation: "Derating means reducing the rated current-carrying capacity of a cable or device due to factors such as high ambient temperature, grouping, or thermal insulation that affect heat dissipation.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Derating",
    category: "Design Principles"
  },
  {
    id: 309,
    question: "What additional protection is required for socket outlets with a rated current not exceeding 32A for use by ordinary persons?",
    options: [
      "RCD protection with rated residual current not exceeding 30mA",
      "Overcurrent protection only",
      "Surge protection",
      "No additional protection required"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires RCD protection with a rated residual operating current not exceeding 30mA for socket outlets up to 32A intended for use by ordinary persons.",
    section: "Protection Requirements",
    difficulty: "basic",
    topic: "RCD Protection",
    category: "Design Principles"
  },
  {
    id: 310,
    question: "When designing for selective tripping, what characteristic curves should be compared?",
    options: [
      "Time-current characteristics of upstream and downstream devices",
      "Only the current ratings",
      "Only the voltage ratings",
      "Physical size of devices"
    ],
    correctAnswer: 0,
    explanation: "To achieve discrimination, the time-current characteristics of protective devices must be compared to ensure the downstream device operates faster than the upstream device at all fault levels.",
    section: "Protection Coordination",
    difficulty: "intermediate",
    topic: "Selective Tripping",
    category: "Design Principles"
  },
  {
    id: 311,
    question: "What is the maximum permitted length for a flexible cord supplying a portable appliance?",
    options: [
      "No fixed maximum, but must be appropriate for the application",
      "2 metres",
      "5 metres",
      "10 metres"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 does not specify a maximum flexible cord length. The length should be appropriate for the application, considering voltage drop, mechanical damage risk, and user safety.",
    section: "Flexible Connections",
    difficulty: "intermediate",
    topic: "Flexible Cords",
    category: "Design Principles"
  },
  {
    id: 312,
    question: "What design verification should be performed before energising a new installation?",
    options: [
      "All of the listed verifications",
      "Visual inspection of all components",
      "Verification of correct circuit arrangement",
      "Confirmation of protection coordination"
    ],
    correctAnswer: 0,
    explanation: "Before energising, the designer should verify visual inspection completion, correct circuit arrangement, protection coordination, voltage drop compliance, and earth fault loop impedances.",
    section: "Design Verification",
    difficulty: "intermediate",
    topic: "Pre-Commissioning",
    category: "Design Principles"
  },

  // Project Management (Questions 313-375)
  {
    id: 313,
    question: "What is the primary purpose of a Gantt chart in project management?",
    options: [
      "To display project schedule showing tasks, durations, and dependencies",
      "To calculate project costs",
      "To show organisational structure",
      "To track material deliveries"
    ],
    correctAnswer: 0,
    explanation: "A Gantt chart is a bar chart that illustrates the project schedule, showing tasks as horizontal bars against a timeline, their durations, and the relationships between tasks.",
    section: "Planning and Scheduling",
    difficulty: "basic",
    topic: "Gantt Charts",
    category: "Project Management"
  },
  {
    id: 314,
    question: "What does 'critical path' mean in project scheduling?",
    options: [
      "The longest sequence of dependent tasks determining minimum project duration",
      "The most expensive sequence of tasks",
      "The tasks with the highest risk",
      "The tasks requiring the most resources"
    ],
    correctAnswer: 0,
    explanation: "The critical path is the longest sequence of dependent activities that determines the minimum time required to complete the project. Any delay on critical tasks delays the entire project.",
    section: "Planning and Scheduling",
    difficulty: "basic",
    topic: "Critical Path Method",
    category: "Project Management"
  },
  {
    id: 315,
    question: "Under CDM 2015, who has duties when a project is notifiable?",
    options: [
      "Client, principal designer, principal contractor, designers, and contractors",
      "Only the client",
      "Only the principal contractor",
      "Only the HSE inspector"
    ],
    correctAnswer: 0,
    explanation: "CDM 2015 places duties on all parties involved: clients, principal designers, designers, principal contractors, and contractors. Each has specific health and safety responsibilities.",
    section: "CDM Regulations",
    difficulty: "basic",
    topic: "CDM Duties",
    category: "Project Management"
  },
  {
    id: 316,
    question: "When does a project become 'notifiable' under CDM 2015?",
    options: [
      "When it lasts more than 30 working days with more than 20 workers, or exceeds 500 person days",
      "All construction projects are notifiable",
      "Only projects over £500,000",
      "Only commercial projects"
    ],
    correctAnswer: 0,
    explanation: "A project is notifiable to HSE if it will last more than 30 working days and have more than 20 workers at any point, or if it will exceed 500 person days of construction work.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "CDM Notification",
    category: "Project Management"
  },
  {
    id: 317,
    question: "What is the purpose of a method statement?",
    options: [
      "To describe how a task will be carried out safely",
      "To list all materials required",
      "To calculate project costs",
      "To schedule deliveries"
    ],
    correctAnswer: 0,
    explanation: "A method statement describes the sequence of work activities and the methods to be used, identifying hazards and controls to ensure work is carried out safely.",
    section: "Health and Safety Planning",
    difficulty: "basic",
    topic: "Method Statements",
    category: "Project Management"
  },
  {
    id: 318,
    question: "What is 'float' or 'slack' in project scheduling?",
    options: [
      "The amount of time a task can be delayed without affecting the project end date",
      "The project contingency budget",
      "The number of spare workers",
      "Additional material allowance"
    ],
    correctAnswer: 0,
    explanation: "Float (or slack) is the amount of time a non-critical task can be delayed or extended without delaying subsequent tasks or the project completion date.",
    section: "Planning and Scheduling",
    difficulty: "intermediate",
    topic: "Float Analysis",
    category: "Project Management"
  },
  {
    id: 319,
    question: "What procurement method involves selecting a contractor based on their submitted price for defined work?",
    options: [
      "Competitive tendering",
      "Negotiated contract",
      "Cost-plus contract",
      "Framework agreement"
    ],
    correctAnswer: 0,
    explanation: "Competitive tendering involves inviting multiple contractors to submit prices for defined work, with selection typically based on the most economically advantageous tender.",
    section: "Procurement",
    difficulty: "basic",
    topic: "Procurement Methods",
    category: "Project Management"
  },
  {
    id: 320,
    question: "What is the purpose of a pre-construction phase plan under CDM 2015?",
    options: [
      "To set out how health and safety will be managed during pre-construction",
      "To list all subcontractors",
      "To schedule material deliveries",
      "To calculate final costs"
    ],
    correctAnswer: 0,
    explanation: "The pre-construction phase plan sets out how health and safety risks will be managed during the design and planning stages before construction work begins.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "CDM Documentation",
    category: "Project Management"
  },
  {
    id: 321,
    question: "What is a 'deliverable' in project management terms?",
    options: [
      "A tangible or intangible output produced as a result of project work",
      "A delivery of materials to site",
      "A payment milestone",
      "A project meeting"
    ],
    correctAnswer: 0,
    explanation: "A deliverable is any unique and verifiable product, result, or capability produced to complete a process, phase, or project, such as drawings, installations, or documentation.",
    section: "Project Fundamentals",
    difficulty: "basic",
    topic: "Project Terminology",
    category: "Project Management"
  },
  {
    id: 322,
    question: "What type of contract involves payment based on actual costs plus an agreed fee?",
    options: [
      "Cost-plus contract",
      "Lump sum contract",
      "Fixed price contract",
      "Measurement contract"
    ],
    correctAnswer: 0,
    explanation: "A cost-plus (or cost reimbursable) contract involves the client paying actual costs incurred plus an agreed fee or percentage for profit and overheads.",
    section: "Contracts",
    difficulty: "intermediate",
    topic: "Contract Types",
    category: "Project Management"
  },
  {
    id: 323,
    question: "What is the purpose of a project risk register?",
    options: [
      "To record identified risks, their likelihood, impact, and mitigation measures",
      "To list all project team members",
      "To track material costs",
      "To schedule project meetings"
    ],
    correctAnswer: 0,
    explanation: "A risk register is a document that records all identified risks, assesses their likelihood and impact, and documents the planned responses and mitigation measures.",
    section: "Risk Management",
    difficulty: "basic",
    topic: "Risk Register",
    category: "Project Management"
  },
  {
    id: 324,
    question: "What does the acronym RACI stand for in project management?",
    options: [
      "Responsible, Accountable, Consulted, Informed",
      "Risk, Analysis, Control, Implementation",
      "Resource, Allocation, Cost, Integration",
      "Review, Approve, Complete, Implement"
    ],
    correctAnswer: 0,
    explanation: "RACI is a responsibility assignment matrix showing who is Responsible for tasks, Accountable for decisions, Consulted for input, and Informed of progress.",
    section: "Project Organisation",
    difficulty: "intermediate",
    topic: "Responsibility Matrix",
    category: "Project Management"
  },
  {
    id: 325,
    question: "Under CDM 2015, what is the principal designer responsible for?",
    options: [
      "Planning, managing, and coordinating health and safety during pre-construction phase",
      "Only producing electrical drawings",
      "Managing the construction budget",
      "Employing all subcontractors"
    ],
    correctAnswer: 0,
    explanation: "The principal designer is responsible for planning, managing, monitoring, and coordinating health and safety during the pre-construction phase, including identifying and eliminating or controlling risks.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "Principal Designer Duties",
    category: "Project Management"
  },
  {
    id: 326,
    question: "What is 'earned value' in project cost management?",
    options: [
      "The value of work actually completed expressed in terms of the budget",
      "The total project profit",
      "The amount invoiced to the client",
      "The cost of materials purchased"
    ],
    correctAnswer: 0,
    explanation: "Earned value represents the budgeted cost of work actually performed, allowing comparison with planned value and actual costs to assess project performance.",
    section: "Cost Control",
    difficulty: "advanced",
    topic: "Earned Value Management",
    category: "Project Management"
  },
  {
    id: 327,
    question: "What is the difference between a milestone and an activity?",
    options: [
      "A milestone marks a significant point with zero duration; an activity has duration",
      "They are the same thing",
      "A milestone takes longer than an activity",
      "An activity marks completion; a milestone is ongoing work"
    ],
    correctAnswer: 0,
    explanation: "A milestone is a significant point or event in the project with zero duration (e.g., 'design approved'), while an activity is a task with a defined duration and resource requirement.",
    section: "Planning and Scheduling",
    difficulty: "basic",
    topic: "Project Terminology",
    category: "Project Management"
  },
  {
    id: 328,
    question: "What procurement approach uses pre-agreed contractors for repeat work?",
    options: [
      "Framework agreement",
      "Single-stage tendering",
      "Design and build",
      "Novation"
    ],
    correctAnswer: 0,
    explanation: "A framework agreement establishes terms with approved contractors for a defined period, allowing call-off contracts for repeat work without full tendering each time.",
    section: "Procurement",
    difficulty: "intermediate",
    topic: "Framework Agreements",
    category: "Project Management"
  },
  {
    id: 329,
    question: "What is a 'work breakdown structure' (WBS)?",
    options: [
      "A hierarchical decomposition of project scope into manageable work packages",
      "A list of workers and their responsibilities",
      "A breakdown of material costs",
      "A schedule of working hours"
    ],
    correctAnswer: 0,
    explanation: "A WBS is a hierarchical decomposition of the total project scope into smaller, manageable components called work packages, forming the basis for planning and control.",
    section: "Planning",
    difficulty: "intermediate",
    topic: "Work Breakdown Structure",
    category: "Project Management"
  },
  {
    id: 330,
    question: "What is the purpose of a project quality plan?",
    options: [
      "To define quality standards, procedures, and responsibilities for the project",
      "To list the qualifications of workers",
      "To schedule quality audits only",
      "To calculate quality-related costs"
    ],
    correctAnswer: 0,
    explanation: "A project quality plan defines the quality standards to be achieved, the procedures to be followed, resources required, and responsibilities for quality management throughout the project.",
    section: "Quality Management",
    difficulty: "intermediate",
    topic: "Quality Planning",
    category: "Project Management"
  },
  {
    id: 331,
    question: "What is 'scope creep' in project management?",
    options: [
      "Uncontrolled expansion of project scope without corresponding adjustments",
      "Reducing the project scope",
      "Moving the project location",
      "Changing the project team"
    ],
    correctAnswer: 0,
    explanation: "Scope creep refers to uncontrolled changes or continuous growth in project scope after the project starts, without adjustments to time, cost, and resources.",
    section: "Scope Management",
    difficulty: "basic",
    topic: "Scope Control",
    category: "Project Management"
  },
  {
    id: 332,
    question: "Under JCT contracts, what is the role of the contract administrator?",
    options: [
      "To administer the contract fairly between employer and contractor",
      "To represent only the contractor",
      "To provide funding",
      "To carry out the construction work"
    ],
    correctAnswer: 0,
    explanation: "The contract administrator (often an architect or engineer) acts impartially to administer the JCT contract, issuing instructions, certifying payments, and managing variations.",
    section: "Contracts",
    difficulty: "intermediate",
    topic: "JCT Contracts",
    category: "Project Management"
  },
  {
    id: 333,
    question: "What is the purpose of a construction phase plan under CDM 2015?",
    options: [
      "To set out how health and safety will be managed during the construction phase",
      "To schedule all construction activities",
      "To list all workers on site",
      "To calculate construction costs"
    ],
    correctAnswer: 0,
    explanation: "The construction phase plan sets out the health and safety arrangements for managing the construction phase, including site rules, emergency procedures, and specific risk controls.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "CDM Documentation",
    category: "Project Management"
  },
  {
    id: 334,
    question: "What does CPI (Cost Performance Index) measure in earned value analysis?",
    options: [
      "The efficiency of cost utilisation on the project",
      "The consumer price index",
      "The cost of professional indemnity",
      "The contract payment intervals"
    ],
    correctAnswer: 0,
    explanation: "CPI = Earned Value / Actual Cost. A CPI of 1.0 means the project is on budget; less than 1.0 indicates over budget; greater than 1.0 indicates under budget.",
    section: "Cost Control",
    difficulty: "advanced",
    topic: "Earned Value Analysis",
    category: "Project Management"
  },
  {
    id: 335,
    question: "What is 'lead time' in procurement?",
    options: [
      "The time between placing an order and receiving the goods",
      "The time to complete the first task",
      "The project duration",
      "The warranty period"
    ],
    correctAnswer: 0,
    explanation: "Lead time is the total time from initiating a purchase order to receiving the goods or services, including manufacturing, shipping, and delivery.",
    section: "Procurement",
    difficulty: "basic",
    topic: "Procurement Planning",
    category: "Project Management"
  },
  {
    id: 336,
    question: "What is the purpose of a project communication plan?",
    options: [
      "To define what information is communicated, to whom, how, and when",
      "To install communication systems",
      "To train workers in communication skills",
      "To select telephone providers"
    ],
    correctAnswer: 0,
    explanation: "A communication plan identifies stakeholder information needs and defines the communication approach, including methods, frequency, formats, and responsibilities.",
    section: "Communication Management",
    difficulty: "intermediate",
    topic: "Communication Planning",
    category: "Project Management"
  },
  {
    id: 337,
    question: "What is a 'variation order' in construction contracts?",
    options: [
      "A formal instruction to change the scope, specification, or timing of works",
      "A change in project personnel",
      "A variation in payment terms",
      "A change in working hours"
    ],
    correctAnswer: 0,
    explanation: "A variation order (or change order) is a formal instruction from the client or contract administrator to alter the scope, quality, or timing of the contracted works.",
    section: "Contract Administration",
    difficulty: "basic",
    topic: "Variations",
    category: "Project Management"
  },
  {
    id: 338,
    question: "What is resource levelling in project scheduling?",
    options: [
      "Adjusting the schedule to address resource constraints or over-allocation",
      "Equalising worker pay rates",
      "Distributing materials evenly across sites",
      "Standardising equipment specifications"
    ],
    correctAnswer: 0,
    explanation: "Resource levelling adjusts task start and finish dates to resolve resource conflicts, smooth demand, and work within resource constraints, often extending the project duration.",
    section: "Resource Management",
    difficulty: "intermediate",
    topic: "Resource Planning",
    category: "Project Management"
  },
  {
    id: 339,
    question: "Under CDM 2015, what is the health and safety file?",
    options: [
      "A document containing information for future maintenance and construction work",
      "A record of all accidents on site",
      "A file of worker health records",
      "A list of PPE issued"
    ],
    correctAnswer: 0,
    explanation: "The health and safety file contains information about the completed building that will be needed for future maintenance, repair, construction, or demolition work.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "CDM Documentation",
    category: "Project Management"
  },
  {
    id: 340,
    question: "What is the difference between predecessor and successor activities?",
    options: [
      "A predecessor must complete before its successor can start (with FS relationship)",
      "They are activities in different projects",
      "A successor must complete before the predecessor",
      "They refer to past and future projects"
    ],
    correctAnswer: 0,
    explanation: "In a finish-to-start (FS) dependency, the predecessor activity must be completed before the successor can begin. Other relationships include SS, FF, and SF.",
    section: "Planning and Scheduling",
    difficulty: "intermediate",
    topic: "Activity Dependencies",
    category: "Project Management"
  },
  {
    id: 341,
    question: "What is 'retention' in construction contracts?",
    options: [
      "Money withheld from payments as security for defect correction",
      "Keeping workers employed after project completion",
      "Storing materials on site",
      "Maintaining project records"
    ],
    correctAnswer: 0,
    explanation: "Retention is a percentage of each payment (typically 3-5%) withheld by the client as security for the contractor to complete the works and correct any defects during the defects period.",
    section: "Contract Administration",
    difficulty: "intermediate",
    topic: "Payment Terms",
    category: "Project Management"
  },
  {
    id: 342,
    question: "What is the purpose of a project progress report?",
    options: [
      "To communicate project status, achievements, issues, and forecasts to stakeholders",
      "To report only problems",
      "To request additional funding",
      "To assign blame for delays"
    ],
    correctAnswer: 0,
    explanation: "Progress reports provide stakeholders with regular updates on project status, work completed, upcoming activities, issues, risks, and forecasts for completion.",
    section: "Project Monitoring",
    difficulty: "basic",
    topic: "Progress Reporting",
    category: "Project Management"
  },
  {
    id: 343,
    question: "What is the NEC4 Engineering and Construction Contract known for?",
    options: [
      "Collaborative approach with clear plain English and proactive risk management",
      "Adversarial approach to contracts",
      "Only suitable for civil engineering works",
      "Only used in the public sector"
    ],
    correctAnswer: 0,
    explanation: "NEC4 is known for its collaborative, project management-focused approach, clear language, flexibility across different procurement methods, and emphasis on risk management.",
    section: "Contracts",
    difficulty: "intermediate",
    topic: "NEC Contracts",
    category: "Project Management"
  },
  {
    id: 344,
    question: "What is a 'snagging list' used for?",
    options: [
      "To record defects or incomplete items requiring correction before handover",
      "To list fishing equipment",
      "To schedule material deliveries",
      "To record worker attendance"
    ],
    correctAnswer: 0,
    explanation: "A snagging list (or defects list) records items of work that are incomplete, defective, or not meeting specification, requiring correction before practical completion.",
    section: "Project Completion",
    difficulty: "basic",
    topic: "Defects Management",
    category: "Project Management"
  },
  {
    id: 345,
    question: "What is 'practical completion' in construction contracts?",
    options: [
      "When the works are substantially complete and ready for the client to occupy",
      "When all work is 100% finished",
      "When the contract is signed",
      "When the final payment is made"
    ],
    correctAnswer: 0,
    explanation: "Practical completion is when the works are complete for all practical purposes, allowing the client to take possession, even though minor defects may remain to be corrected.",
    section: "Contract Administration",
    difficulty: "intermediate",
    topic: "Contract Milestones",
    category: "Project Management"
  },
  {
    id: 346,
    question: "What is the purpose of a pre-start meeting?",
    options: [
      "To ensure all parties understand requirements before work commences",
      "To negotiate contract prices",
      "To select subcontractors",
      "To finalise designs"
    ],
    correctAnswer: 0,
    explanation: "A pre-start meeting brings together all parties before work begins to review the scope, programme, health and safety requirements, communication procedures, and responsibilities.",
    section: "Project Coordination",
    difficulty: "basic",
    topic: "Project Meetings",
    category: "Project Management"
  },
  {
    id: 347,
    question: "What does SPI (Schedule Performance Index) indicate?",
    options: [
      "The efficiency of time utilisation on the project",
      "Safety performance indicators",
      "Subcontractor payment index",
      "Site productivity index"
    ],
    correctAnswer: 0,
    explanation: "SPI = Earned Value / Planned Value. An SPI of 1.0 means the project is on schedule; less than 1.0 indicates behind schedule; greater than 1.0 indicates ahead of schedule.",
    section: "Schedule Control",
    difficulty: "advanced",
    topic: "Earned Value Analysis",
    category: "Project Management"
  },
  {
    id: 348,
    question: "What is 'liquidated damages' in a construction contract?",
    options: [
      "Pre-agreed damages payable for late completion",
      "Payment for materials damaged on site",
      "Insurance claim payments",
      "Water damage costs"
    ],
    correctAnswer: 0,
    explanation: "Liquidated damages (LADs) are a pre-agreed sum payable by the contractor for each day or week the project completion is delayed beyond the contractual date.",
    section: "Contracts",
    difficulty: "intermediate",
    topic: "Contract Terms",
    category: "Project Management"
  },
  {
    id: 349,
    question: "What is the role of the principal contractor under CDM 2015?",
    options: [
      "To plan, manage, and coordinate health and safety during the construction phase",
      "To design the building",
      "To provide project funding",
      "To prepare planning applications"
    ],
    correctAnswer: 0,
    explanation: "The principal contractor is responsible for planning, managing, monitoring, and coordinating health and safety during the construction phase, including managing multiple contractors.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "Principal Contractor Duties",
    category: "Project Management"
  },
  {
    id: 350,
    question: "What is a 'bill of quantities' (BOQ)?",
    options: [
      "A document listing all items of work with quantities for pricing",
      "A list of quantities ordered",
      "An invoice for materials",
      "A quality control checklist"
    ],
    correctAnswer: 0,
    explanation: "A bill of quantities is a tender document listing all items of work with measured quantities, allowing contractors to price each item and sum to a total tender price.",
    section: "Procurement",
    difficulty: "basic",
    topic: "Tender Documents",
    category: "Project Management"
  },
  {
    id: 351,
    question: "What is the purpose of a project baseline?",
    options: [
      "To provide an approved reference point for measuring project performance",
      "To mark the lowest point of excavation",
      "To define the ground level",
      "To set the electrical supply point"
    ],
    correctAnswer: 0,
    explanation: "A project baseline is the approved version of the schedule, cost, and scope against which actual performance is measured and variances are identified.",
    section: "Project Control",
    difficulty: "intermediate",
    topic: "Baseline Management",
    category: "Project Management"
  },
  {
    id: 352,
    question: "What is the 'defects liability period' or 'rectification period'?",
    options: [
      "A period after completion when the contractor must correct defects",
      "The time allowed for initial construction",
      "The design development period",
      "The insurance coverage period"
    ],
    correctAnswer: 0,
    explanation: "The defects liability (or rectification) period is typically 12 months after practical completion, during which the contractor must return to correct any defects that appear.",
    section: "Contract Administration",
    difficulty: "intermediate",
    topic: "Defects Period",
    category: "Project Management"
  },
  {
    id: 353,
    question: "What is a fast-track project approach?",
    options: [
      "Overlapping design and construction phases to reduce total duration",
      "Using the fastest workers",
      "Working only during daytime hours",
      "Completing the project under budget"
    ],
    correctAnswer: 0,
    explanation: "Fast-tracking involves overlapping project phases (such as starting construction before design is complete) to compress the overall schedule, often increasing risk and cost.",
    section: "Schedule Management",
    difficulty: "intermediate",
    topic: "Schedule Compression",
    category: "Project Management"
  },
  {
    id: 354,
    question: "What documentation must a contractor provide for electrical installation work?",
    options: [
      "Electrical Installation Certificate and test results",
      "Only an invoice",
      "A verbal confirmation",
      "A simple completion note"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires an Electrical Installation Certificate (or Minor Works Certificate for small jobs) with full test results and schedules to be provided upon completion.",
    section: "Project Documentation",
    difficulty: "basic",
    topic: "Certification",
    category: "Project Management"
  },
  {
    id: 355,
    question: "What is 'crashing' in project schedule management?",
    options: [
      "Adding resources to critical tasks to reduce duration at increased cost",
      "A project failure",
      "Overlapping phases",
      "Reducing project scope"
    ],
    correctAnswer: 0,
    explanation: "Crashing involves adding resources (overtime, additional workers, equipment) to critical path activities to reduce task duration, typically at additional cost.",
    section: "Schedule Management",
    difficulty: "advanced",
    topic: "Schedule Compression",
    category: "Project Management"
  },
  {
    id: 356,
    question: "What is a punch list?",
    options: [
      "A list of items to be completed or corrected before final acceptance",
      "A list of workers to be dismissed",
      "A record of punch clock times",
      "A schedule of boxing matches"
    ],
    correctAnswer: 0,
    explanation: "A punch list (US term, equivalent to snagging list in UK) is a document listing incomplete or substandard items that must be addressed before final project acceptance.",
    section: "Project Completion",
    difficulty: "basic",
    topic: "Completion Documentation",
    category: "Project Management"
  },
  {
    id: 357,
    question: "What is the purpose of commissioning in electrical projects?",
    options: [
      "To verify the installation functions correctly and meets design requirements",
      "To design the system",
      "To order materials",
      "To recruit workers"
    ],
    correctAnswer: 0,
    explanation: "Commissioning is the systematic process of verifying and documenting that the installed systems perform according to design intent and meet client requirements.",
    section: "Project Completion",
    difficulty: "intermediate",
    topic: "Commissioning",
    category: "Project Management"
  },
  {
    id: 358,
    question: "What is 'design and build' procurement?",
    options: [
      "A single contractor responsible for both design and construction",
      "Separate contracts for design and construction",
      "The client designs and contractors build",
      "Building without any design"
    ],
    correctAnswer: 0,
    explanation: "Design and build is a procurement method where one contractor takes responsibility for both design and construction, providing single-point responsibility for the client.",
    section: "Procurement",
    difficulty: "intermediate",
    topic: "Procurement Routes",
    category: "Project Management"
  },
  {
    id: 359,
    question: "What is the purpose of a risk assessment matrix?",
    options: [
      "To evaluate risks by likelihood and impact to prioritise responses",
      "To list all project documents",
      "To calculate material quantities",
      "To schedule deliveries"
    ],
    correctAnswer: 0,
    explanation: "A risk assessment matrix plots identified risks according to their likelihood of occurrence and potential impact, helping to prioritise which risks need most attention.",
    section: "Risk Management",
    difficulty: "intermediate",
    topic: "Risk Assessment",
    category: "Project Management"
  },
  {
    id: 360,
    question: "What is an extension of time (EOT) in construction contracts?",
    options: [
      "Additional time granted to the contractor due to qualifying delays",
      "Working overtime",
      "Extended warranty period",
      "Longer working hours"
    ],
    correctAnswer: 0,
    explanation: "An extension of time is additional time added to the contract completion date when delays occur for reasons that are the client's responsibility or neutral events.",
    section: "Contract Administration",
    difficulty: "intermediate",
    topic: "Time Extensions",
    category: "Project Management"
  },
  {
    id: 361,
    question: "What is the purpose of a project closure report?",
    options: [
      "To document final status, lessons learned, and formally close the project",
      "To plan the next project",
      "To distribute final payments",
      "To schedule maintenance"
    ],
    correctAnswer: 0,
    explanation: "A project closure report documents the final project status, compares performance against baselines, captures lessons learned, and provides formal closure documentation.",
    section: "Project Completion",
    difficulty: "intermediate",
    topic: "Project Closure",
    category: "Project Management"
  },
  {
    id: 362,
    question: "What is the client's main duty under CDM 2015?",
    options: [
      "To make suitable arrangements for managing the project to ensure health and safety",
      "To carry out all construction work personally",
      "To employ only domestic workers",
      "To avoid involvement in health and safety"
    ],
    correctAnswer: 0,
    explanation: "The client must make suitable arrangements for managing the project to ensure health and safety, including appointing principal designer and principal contractor when required.",
    section: "CDM Regulations",
    difficulty: "intermediate",
    topic: "Client Duties",
    category: "Project Management"
  },
  {
    id: 363,
    question: "What is value engineering?",
    options: [
      "A systematic method to improve value by examining function versus cost",
      "Engineering for free",
      "Reducing all material specifications",
      "Using cheaper workers"
    ],
    correctAnswer: 0,
    explanation: "Value engineering systematically examines functions and costs to find ways to achieve required functions at lower cost or improved function at acceptable cost.",
    section: "Cost Management",
    difficulty: "advanced",
    topic: "Value Engineering",
    category: "Project Management"
  },
  {
    id: 364,
    question: "What is a 'take-off' in estimating?",
    options: [
      "The process of measuring quantities from drawings for pricing",
      "A project cancellation",
      "Starting site work",
      "Removing waste from site"
    ],
    correctAnswer: 0,
    explanation: "Take-off is the process of measuring and listing quantities of materials and work items from drawings and specifications to enable pricing and ordering.",
    section: "Cost Estimating",
    difficulty: "basic",
    topic: "Quantity Take-Off",
    category: "Project Management"
  },
  {
    id: 365,
    question: "What is the purpose of a project kick-off meeting?",
    options: [
      "To formally start the project and align the team on objectives and approach",
      "To play football",
      "To end the project",
      "To dismiss workers"
    ],
    correctAnswer: 0,
    explanation: "A kick-off meeting formally starts the project, bringing together stakeholders to align on objectives, scope, roles, communication, and expectations.",
    section: "Project Coordination",
    difficulty: "basic",
    topic: "Project Meetings",
    category: "Project Management"
  },
  {
    id: 366,
    question: "What is interim valuation in construction contracts?",
    options: [
      "Regular assessment of work completed for interim payment certification",
      "The initial project valuation",
      "Final account preparation",
      "Insurance valuation"
    ],
    correctAnswer: 0,
    explanation: "Interim valuations assess the value of work completed during each payment period, forming the basis for interim payment certificates and contractor payments.",
    section: "Contract Administration",
    difficulty: "intermediate",
    topic: "Payment Valuations",
    category: "Project Management"
  },
  {
    id: 367,
    question: "What is the difference between direct costs and indirect costs?",
    options: [
      "Direct costs relate specifically to project work; indirect costs support the project generally",
      "Direct costs are paid first; indirect costs are paid later",
      "Direct costs are always higher",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Direct costs (labour, materials, equipment) can be attributed directly to specific project work. Indirect costs (overheads, supervision, offices) support the project generally.",
    section: "Cost Management",
    difficulty: "intermediate",
    topic: "Cost Classification",
    category: "Project Management"
  },
  {
    id: 368,
    question: "What is the purpose of a tool-box talk?",
    options: [
      "To provide brief on-site safety briefings on specific topics",
      "To discuss tool requirements",
      "To distribute tools",
      "To plan tool purchases"
    ],
    correctAnswer: 0,
    explanation: "Tool-box talks are short, focused safety briefings delivered on-site to raise awareness of specific hazards or safe working practices relevant to current work.",
    section: "Health and Safety",
    difficulty: "basic",
    topic: "Safety Communication",
    category: "Project Management"
  },
  {
    id: 369,
    question: "What is a request for information (RFI) used for?",
    options: [
      "To seek clarification on drawings, specifications, or contract documents",
      "To request final payment",
      "To order materials",
      "To report accidents"
    ],
    correctAnswer: 0,
    explanation: "An RFI is a formal document used by contractors to request clarification or additional information about contract documents when there are ambiguities or missing information.",
    section: "Project Communication",
    difficulty: "basic",
    topic: "Document Management",
    category: "Project Management"
  },
  {
    id: 370,
    question: "What is programme compression?",
    options: [
      "Reducing project duration through crashing or fast-tracking",
      "Compressing files for storage",
      "Reducing the project budget",
      "Limiting the workforce"
    ],
    correctAnswer: 0,
    explanation: "Programme compression uses techniques like crashing (adding resources) or fast-tracking (overlapping activities) to reduce the overall project duration.",
    section: "Schedule Management",
    difficulty: "advanced",
    topic: "Schedule Compression",
    category: "Project Management"
  },
  {
    id: 371,
    question: "What is the purpose of a project organisation chart?",
    options: [
      "To show the project team structure and reporting relationships",
      "To list all project activities",
      "To show material storage locations",
      "To display financial information"
    ],
    correctAnswer: 0,
    explanation: "A project organisation chart displays the hierarchical structure of the project team, showing roles, responsibilities, and reporting relationships between team members.",
    section: "Project Organisation",
    difficulty: "basic",
    topic: "Team Structure",
    category: "Project Management"
  },
  {
    id: 372,
    question: "What is a day work sheet used for?",
    options: [
      "To record labour, materials, and plant for work done outside the contract scope",
      "To record daily attendance",
      "To plan each day's work",
      "To calculate daily costs"
    ],
    correctAnswer: 0,
    explanation: "Day work sheets record labour time, materials used, and plant deployed for work that cannot be valued using contract rates, typically variations done on a cost basis.",
    section: "Contract Administration",
    difficulty: "intermediate",
    topic: "Daywork Records",
    category: "Project Management"
  },
  {
    id: 373,
    question: "What is the purpose of a lessons learned register?",
    options: [
      "To capture knowledge from project experiences for future benefit",
      "To record training attendance",
      "To list educational qualifications",
      "To schedule learning activities"
    ],
    correctAnswer: 0,
    explanation: "A lessons learned register captures successes, challenges, and recommendations from project experiences so that future projects can benefit from this knowledge.",
    section: "Knowledge Management",
    difficulty: "intermediate",
    topic: "Lessons Learned",
    category: "Project Management"
  },
  {
    id: 374,
    question: "What is the final account in construction contracts?",
    options: [
      "The agreed final value of the contract including all variations and adjustments",
      "The contractor's bank account",
      "The first payment",
      "A preliminary estimate"
    ],
    correctAnswer: 0,
    explanation: "The final account is the agreed total value of the completed works, including the original contract sum, all variations, claims, and adjustments, determining the final payment.",
    section: "Contract Administration",
    difficulty: "advanced",
    topic: "Final Accounts",
    category: "Project Management"
  },
  {
    id: 375,
    question: "What is the purpose of a handover meeting?",
    options: [
      "To formally transfer the completed installation to the client with documentation",
      "To pass work to another contractor",
      "To exchange workers between projects",
      "To discuss future projects"
    ],
    correctAnswer: 0,
    explanation: "A handover meeting formally transfers the completed works to the client, including provision of O&M manuals, as-built drawings, certificates, and training on systems.",
    section: "Project Completion",
    difficulty: "basic",
    topic: "Project Handover",
    category: "Project Management"
  }
];
